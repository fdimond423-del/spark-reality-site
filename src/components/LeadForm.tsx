import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { submitLead, INDIAN_PHONE_REGEX, LeadSubmissionPayload } from '../services/leadService';
import { CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export const LeadForm: React.FC = () => {
  const { heading, supportingText, submitButton, cityOptions, privacyNotice } = siteConfig.leadForm;

  const [formData, setFormData] = useState<LeadSubmissionPayload>({
    fullName: '',
    mobileNumber: '',
    city: 'Ahmedabad',
  });

  const [errors, setErrors] = useState<{ [K in keyof LeadSubmissionPayload]?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{
    message: string;
    leadId?: string;
    whatsappHandoffUrl?: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateField = (name: keyof LeadSubmissionPayload, value: string) => {
    let errorMsg = '';
    if (name === 'fullName') {
      if (!value.trim()) {
        errorMsg = 'Full name is required.';
      } else if (value.trim().length < 2) {
        errorMsg = 'Name must be at least 2 characters.';
      }
    } else if (name === 'mobileNumber') {
      const clean = value.replace(/\s+/g, '').replace(/-/g, '');
      if (!clean) {
        errorMsg = 'Mobile number is required.';
      } else if (!INDIAN_PHONE_REGEX.test(clean)) {
        errorMsg = 'Enter a valid 10-digit Indian mobile number.';
      }
    } else if (name === 'city') {
      if (!value || (value !== 'Ahmedabad' && value !== 'Gandhinagar')) {
        errorMsg = 'Please select either Ahmedabad or Gandhinagar.';
      }
    }
    return errorMsg;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time inline validation check
    const errorMsg = validateField(name as keyof LeadSubmissionPayload, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields
    const nameErr = validateField('fullName', formData.fullName);
    const mobileErr = validateField('mobileNumber', formData.mobileNumber);
    const cityErr = validateField('city', formData.city);

    if (nameErr || mobileErr || cityErr) {
      setErrors({
        fullName: nameErr,
        mobileNumber: mobileErr,
        city: cityErr,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitLead(formData);
      setSuccessResponse(response);
      setFormData({
        fullName: '',
        mobileNumber: '',
        city: 'Ahmedabad',
      });
      setErrors({});
    } catch (err: any) {
      setServerError(err?.message || 'Unable to submit enquiry. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="enquire"
      className="relative w-full py-24 sm:py-32 bg-white text-navy border-t border-gray-200"
      aria-label="Lead Generation Form"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Card Container */}
        <div className="bg-spark-lightGrey rounded-3xl p-8 sm:p-12 lg:p-16 border border-gray-200 shadow-xl relative overflow-hidden">
          {/* Subtle Decorative Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy via-olive to-navy" />

          {/* Heading */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            <span className="text-[0.72rem] font-mono tracking-widest text-olive uppercase font-bold block mb-2">
              CONFIDENTIAL ENQUIRY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight uppercase font-display text-navy">
              {heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-mutedText">
              {supportingText}
            </p>
          </div>

          {/* Success State */}
          {successResponse ? (
            <div
              className="bg-white rounded-2xl p-8 text-center border border-olive/30 shadow-sm animate-fadeIn"
              role="status"
            >
              <div className="w-14 h-14 rounded-full bg-olive-tint text-olive flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy uppercase font-display">
                Enquiry Received
              </h3>
              <p className="mt-2 text-sm text-darkText leading-relaxed">
                {successResponse.message}
              </p>
              {successResponse.leadId && (
                <div className="inline-block mt-3 px-3 py-1 bg-spark-lightGrey rounded-full text-xs font-mono text-mutedText">
                  Reference: {successResponse.leadId}
                </div>
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                {successResponse.whatsappHandoffUrl && (
                  <a
                    href={successResponse.whatsappHandoffUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-full transition-colors"
                  >
                    <span>Instant WhatsApp Connect</span>
                    <ArrowRight size={14} />
                  </a>
                )}
                <button
                  onClick={() => setSuccessResponse(null)}
                  className="text-xs uppercase tracking-wider text-mutedText hover:text-navy underline underline-offset-4 px-4 py-2"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            /* Lead Form with EXACTLY THREE FIELDS */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Server-level error if any */}
              {serverError && (
                <div
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5"
                  role="alert"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Field 1: Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2 font-display"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Yash Patel"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white border text-navy placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-gray-300 focus:border-navy focus:ring-navy/10'
                  }`}
                  required
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Field 2: Mobile Number */}
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2 font-display"
                >
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 text-xs font-mono">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    disabled={isSubmitting}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border text-navy placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.mobileNumber
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-navy focus:ring-navy/10'
                    }`}
                    required
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Field 3: City (Dropdown with Ahmedabad, Gandhinagar) */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold uppercase tracking-wider text-navy mb-2 font-display"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white border text-navy text-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.city
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-gray-300 focus:border-navy focus:ring-navy/10'
                  }`}
                  required
                >
                  {cityOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.city}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-navy hover:bg-navy-light text-white font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2.5 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-white" />
                      <span>PROCESSING ENQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>{submitButton}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Notice */}
              <p className="text-[0.72rem] text-mutedText text-center leading-normal pt-2">
                {privacyNotice}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
