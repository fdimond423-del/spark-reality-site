import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FinalCTAProps {
  onStartJourneyClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartJourneyClick }) => {
  const { headline, supportingText, buttonLabel } = siteConfig.finalCta;
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bgImage = bgImageRef.current;
    if (!section || !bgImage) return;

    let ctx = gsap.context(() => {
      gsap.to(bgImage, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 sm:py-44 lg:py-52 bg-navy text-white overflow-hidden flex items-center justify-center text-center"
      aria-label="Final Invitation"
    >
      {/* Background Architectural Image with Parallax */}
      <img
        ref={bgImageRef}
        src="/images/residential-exterior.jpg"
        alt="Architectural structure in Ahmedabad"
        className="absolute inset-0 w-full h-[125%] object-cover -top-[12%] opacity-35 pointer-events-none scale-105"
        loading="lazy"
      />

      {/* Deep Navy Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/70 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 flex flex-col items-center">
        <div className="w-16 h-[2px] bg-olive mb-8 sm:mb-10 rounded-full" />

        <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight uppercase leading-[1.08] sm:leading-[1.1] font-display whitespace-pre-line">
          {headline}
        </h2>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed">
          {supportingText}
        </p>

        <div className="mt-10 sm:mt-12">
          <button
            onClick={onStartJourneyClick}
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-navy font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase px-8 sm:px-10 py-4 sm:py-5 rounded-full transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
          >
            <span>{buttonLabel}</span>
            <ArrowRight size={16} className="text-navy group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
