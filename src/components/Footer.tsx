import React from 'react';
import { SparkLogo } from './SparkLogo';
import { siteConfig } from '../config/siteConfig';
import { Phone, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { brand } = siteConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-navy text-white pt-16 pb-12 border-t border-white/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SparkLogo variant="light" showTagline />
              <p className="mt-5 text-sm text-gray-300 max-w-sm leading-relaxed">
                Advising clients on premier residential residences, corporate towers, and strategic real estate investments across Ahmedabad and Gandhinagar.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
              <span className="text-xs text-gray-300 font-mono tracking-wider uppercase">
                Advisory Desk Active: Makarba, Ahmedabad
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-olive-light mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300 font-sans">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Ahmedabad Showcase
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Gandhinagar Showcase
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Approach
                </a>
              </li>
              <li>
                <a href="#enquire" className="hover:text-white transition-colors">
                  Submit Enquiry
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Office Location
                </a>
              </li>
            </ul>
          </div>

          {/* Service Hubs & Contact (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-olive-light mb-4">
              Locations & Contact
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-olive-light shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {brand.address.line1}, {brand.address.line2}, {brand.address.city} – {brand.address.pincode}.
                </address>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone size={15} className="text-olive-light shrink-0" />
                <a href={`tel:${brand.phoneRaw}`} className="hover:text-white font-semibold">
                  {brand.phone}
                </a>
              </div>

              <div className="pt-2 text-xs text-gray-400">
                Primary Corridors: SG Highway • Makarba • GIFT City • Bodakdev • Kudasan
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#enquire" className="hover:text-gray-200 transition-colors">
              Privacy & Disclaimers
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
