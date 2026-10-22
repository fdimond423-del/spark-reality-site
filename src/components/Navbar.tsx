import React, { useState, useEffect } from 'react';
import { SparkLogo } from './SparkLogo';
import { siteConfig } from '../config/siteConfig';
import { Menu, X, Phone, MessageSquare, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onEnquireClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnquireClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Apply solid high-contrast navy background whenever scrolled past 25px
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy/98 backdrop-blur-md py-2.5 sm:py-3.5 shadow-2xl border-b border-white/10'
            : 'bg-gradient-to-b from-navy/90 via-navy/50 to-transparent py-3.5 sm:py-6'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo - Responsive on Mobile & Desktop */}
          <a
            href="#hero"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-md flex items-center shrink-0"
            aria-label="Spark Reality Home"
          >
            <SparkLogo variant="light" size="md" />
          </a>

          {/* Desktop Navigation Links (hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wider uppercase text-gray-200 hover:text-white transition-colors duration-200 relative py-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-olive"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Direct Call Button (Compact on mobile) */}
            <a
              href={`tel:${siteConfig.brand.phoneRaw}`}
              className="text-xs font-medium tracking-wider text-gray-200 hover:text-white flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-white/20 bg-white/5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-olive"
              aria-label={`Call Spark Reality at ${siteConfig.brand.phone}`}
            >
              <Phone size={12} className="text-olive-light shrink-0" />
              <span className="hidden sm:inline">{siteConfig.brand.phone}</span>
              <span className="sm:hidden text-[0.68rem] font-bold tracking-widest font-mono">CALL</span>
            </a>

            {/* Quick Enquire Button (Always visible on mobile & desktop) */}
            <button
              onClick={onEnquireClick}
              className="bg-navy-light sm:bg-navy-light hover:bg-olive text-white text-[0.68rem] sm:text-xs font-semibold uppercase tracking-[0.14em] px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-olive/50 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              ENQUIRE
            </button>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg border border-white/15 bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Modal */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy/98 backdrop-blur-2xl md:hidden flex flex-col justify-between px-6 py-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Drawer Top Header with Logo & Close Button */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <SparkLogo variant="light" size="md" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex flex-col space-y-5 pt-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold tracking-wider uppercase text-white hover:text-olive-light transition-colors flex items-center justify-between py-2 border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} className="text-olive-light" />
                </a>
              ))}
            </div>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="flex flex-col space-y-3 pt-6 border-t border-white/10">
            {/* Direct Phone Call */}
            <a
              href={`tel:${siteConfig.brand.phoneRaw}`}
              className="text-xs font-semibold uppercase tracking-wider text-white flex items-center justify-center gap-2 py-3 rounded-full border border-white/20 bg-white/5"
            >
              <Phone size={14} className="text-olive-light" />
              <span>Call: {siteConfig.brand.phone}</span>
            </a>

            {/* WhatsApp Direct Chat */}
            <a
              href={siteConfig.brand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-white flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366]"
            >
              <MessageSquare size={14} />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Enquire Now CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnquireClick();
              }}
              className="w-full bg-olive text-white py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg"
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      )}
    </>
  );
};
