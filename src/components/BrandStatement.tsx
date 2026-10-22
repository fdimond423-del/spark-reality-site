import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export const BrandStatement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const lineAccentRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none', // Stays permanently visible once played
        }
      });

      tl.fromTo(
        lineAccentRef.current,
        { scaleX: 0, transformOrigin: 'center center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(
        [line1Ref.current, line2Ref.current],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.25, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="brand-statement"
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-navy text-white overflow-hidden flex items-center justify-center border-t border-b border-white/10"
      aria-label="Brand Philosophy"
    >
      {/* Background subtle architectural ambient depth */}
      <div className="absolute inset-0 bg-radial-gradient from-navy-light/40 via-transparent to-transparent opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Thin Olive-Green Accent Line */}
        <div
          ref={lineAccentRef}
          className="w-16 sm:w-24 h-[2px] bg-olive mb-10 sm:mb-14 rounded-full"
        />

        {/* Oversized Editorial Typography */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight uppercase leading-[1.1] sm:leading-[1.12] font-display">
          <span ref={line1Ref} className="block overflow-hidden">
            FIND YOUR SPACE.
          </span>
          <span ref={line2Ref} className="block text-gray-300 font-light mt-1 sm:mt-2 overflow-hidden">
            DEFINE YOUR FUTURE.
          </span>
        </h2>

        {/* Supporting Text */}
        <p
          ref={subtextRef}
          className="mt-8 sm:mt-10 text-base sm:text-lg lg:text-xl text-gray-300/90 font-normal max-w-xl leading-relaxed"
        >
          {siteConfig.brandStatement.supportingText}
        </p>
      </div>
    </section>
  );
};
