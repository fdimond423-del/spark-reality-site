import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Phone, MapPin, Clock, Mail, Navigation, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { heading } = siteConfig.contact;
  const { brand } = siteConfig;

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 bg-spark-lightGrey text-navy border-t border-gray-200"
      aria-label="Contact Spark Reality"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-olive font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            <span>GET IN TOUCH</span>
            <span className="w-8 h-[1px] bg-olive/40" />
            <span>ADVISORY DESK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-tight font-display">
            {heading}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-mutedText leading-relaxed">
            Reach out to our local team in Makarba, Ahmedabad to arrange a confidential discussion or a private site tour.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Phone Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-spark-lightGrey flex items-center justify-center text-olive mb-6">
                <Phone size={22} />
              </div>
              <span className="text-[0.7rem] uppercase tracking-widest text-mutedText font-mono block mb-1">
                Direct Telephone
              </span>
              <h3 className="text-xl font-bold text-navy font-display mb-2">
                {brand.phone}
              </h3>
              <p className="text-xs text-mutedText">
                Available during business hours for immediate property consultation.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={`tel:${brand.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white text-xs font-semibold uppercase tracking-wider py-3 px-5 rounded-full transition-colors"
              >
                <Phone size={14} />
                <span>Call Directly</span>
              </a>
              <a
                href={brand.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider py-3 px-5 rounded-full transition-colors"
              >
                <MessageSquare size={14} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Physical Office Address */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-spark-lightGrey flex items-center justify-center text-olive mb-6">
                <MapPin size={22} />
              </div>
              <span className="text-[0.7rem] uppercase tracking-widest text-mutedText font-mono block mb-1">
                Office Location
              </span>
              <h3 className="text-xl font-bold text-navy font-display mb-2">
                {brand.name}
              </h3>
              <address className="not-italic text-sm text-darkText leading-relaxed">
                {brand.address.line1},<br />
                {brand.address.line2},<br />
                {brand.address.city} – {brand.address.pincode}, {brand.address.state}, {brand.address.country}.
              </address>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href={brand.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-spark-lightGrey hover:bg-gray-200 text-navy text-xs font-semibold uppercase tracking-wider py-3 px-5 rounded-full border border-gray-300 w-full transition-colors"
              >
                <Navigation size={14} className="text-olive" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </div>

          {/* Hours & Email (Configurable) */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-spark-lightGrey flex items-center justify-center text-olive mb-6">
                <Clock size={22} />
              </div>
              <span className="text-[0.7rem] uppercase tracking-widest text-mutedText font-mono block mb-1">
                Operating Schedule
              </span>
              <h3 className="text-xl font-bold text-navy font-display mb-2">
                Office Hours
              </h3>
              <p className="text-sm text-darkText leading-relaxed">
                {brand.officeHours}
              </p>
              <p className="text-xs text-mutedText mt-1">
                Sunday consultations available by prior appointment.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <span className="text-[0.7rem] uppercase tracking-widest text-mutedText font-mono block mb-1">
                Official Email
              </span>
              <a
                href={`mailto:${brand.email}`}
                className="text-sm font-semibold text-olive hover:underline flex items-center gap-1.5 break-all"
              >
                <Mail size={14} />
                <span>{brand.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
