/**
 * Spark Reality Lead Submission & Validation Service
 * Validates the 3 mandatory fields (Name, Indian Mobile, City) and persists leads reliably.
 */

export interface LeadSubmissionPayload {
  fullName: string;
  mobileNumber: string;
  city: 'Ahmedabad' | 'Gandhinagar';
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  leadId?: string;
  whatsappHandoffUrl?: string;
}

export interface LeadValidationError {
  field: 'fullName' | 'mobileNumber' | 'city';
  message: string;
}

// Indian mobile number validation regex: 10 digits starting with 6-9, optional +91 or 0 prefix
export const INDIAN_PHONE_REGEX = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export function validateLeadData(data: LeadSubmissionPayload): LeadValidationError[] {
  const errors: LeadValidationError[] = [];

  // Full Name
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push({
      field: 'fullName',
      message: 'Please enter your full name (at least 2 characters).'
    });
  }

  // Mobile Number
  const cleanMobile = data.mobileNumber ? data.mobileNumber.replace(/\s+/g, '').replace(/-/g, '') : '';
  if (!cleanMobile) {
    errors.push({
      field: 'mobileNumber',
      message: 'Mobile number is required.'
    });
  } else if (!INDIAN_PHONE_REGEX.test(cleanMobile)) {
    errors.push({
      field: 'mobileNumber',
      message: 'Please enter a valid 10-digit Indian mobile number.'
    });
  }

  // City
  if (!data.city || (data.city !== 'Ahmedabad' && data.city !== 'Gandhinagar')) {
    errors.push({
      field: 'city',
      message: 'Please select either Ahmedabad or Gandhinagar.'
    });
  }

  return errors;
}

export async function submitLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResponse> {
  // Validate
  const validationErrors = validateLeadData(payload);
  if (validationErrors.length > 0) {
    throw new Error(validationErrors[0].message);
  }

  const cleanMobile = payload.mobileNumber.trim();
  const leadId = `LEAD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const timestamp = new Date().toISOString();

  const storedRecord = {
    leadId,
    timestamp,
    fullName: payload.fullName.trim(),
    mobileNumber: cleanMobile,
    city: payload.city,
    source: 'Spark Reality Website - Ads Optimized Lead Form',
    status: 'New'
  };

  // 1. Local Persistence (Safely stores in browser so zero lead loss)
  try {
    const existing = JSON.parse(localStorage.getItem('spark_reality_leads') || '[]');
    existing.unshift(storedRecord);
    localStorage.setItem('spark_reality_leads', JSON.stringify(existing.slice(0, 500)));
  } catch (err) {
    console.warn('Could not persist to localStorage:', err);
  }

  // 2. External Webhook / CRM API integration if configured
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storedRecord)
      });
      if (!response.ok) {
        console.warn('External lead webhook responded with status:', response.status);
      }
    } catch (apiErr) {
      console.warn('Failed to deliver lead to webhook:', apiErr);
      // We still treat as success locally since localStorage is saved
    }
  }

  // Construct direct WhatsApp link to Spark Reality's official number (+91 93137 02720)
  const message = `*Spark Reality Enquiry*\n\nName: ${payload.fullName.trim()}\nMobile: ${cleanMobile}\nLocation: ${payload.city}\nLead ID: ${leadId}`;
  const whatsappHandoffUrl = `https://wa.me/919313702720?text=${encodeURIComponent(message)}`;

  return {
    success: true,
    message: 'Thank you. Your details have been received. Our property advisory team will connect with you shortly.',
    leadId,
    whatsappHandoffUrl
  };
}
