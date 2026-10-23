import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';
import { ChevronDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
  onEnquireClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onEnquireClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Autoplay video smoothly
    if (video) {
      video.play().catch(() => {});
    }

    let ctx = gsap.context(() => {
      // Clean entrance animation on initial page load only
      // clearProps: 'all' ensures NO inline style remains, text stays 100% visible forever!
      gsap.fromTo(
        text,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1,
          clearProps: 'all'
        }
      );

      // Smooth background parallax on video ONLY - text is NEVER faded or hidden on scroll!
      if (video) {
        gsap.to(video, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden bg-navy"
      aria-label="Spark Reality Hero"
    >
      {/* Background Architectural Video - Autoplay with continuous ambient motion */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover pointer-events-none scale-105"
        playsInline
        muted
        preload="auto"
        poster={siteConfig.hero.posterPath}
        autoPlay
        loop
      >
        <source src={siteConfig.hero.videoPath} type="video/mp4" />
      </video>

      {/* Atmospheric Navy Gradient Overlay - Guarantees contrast so text is always clear */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/65 to-navy/45 pointer-events-none"
      />

      {/* Content Container - Always 100% visible, never disappears when scrolling up or down */}
      <div
        ref={textRef}
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center mt-6 sm:mt-16"
      >
        {/* Subtle Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-navy/80 border border-white/20 backdrop-blur-md mb-4 sm:mb-8 text-gray-200 text-[0.68rem] sm:text-xs tracking-[0.18em] uppercase font-sans shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
          <span>AHMEDABAD & GANDHINAGAR PROPERTY ADVISORY</span>
        </div>

        {/* Main Architectural Headline - Original Typography & Proportions */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white uppercase leading-[1.12] sm:leading-[1.1] max-w-4xl font-display drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          MORE THAN A PROPERTY.
          <span className="block text-gray-200 font-light mt-1 sm:mt-2">
            A FUTURE TAKING SHAPE.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-4 sm:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-normal max-w-2xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
          {siteConfig.hero.supportingText}
        </p>

        {/* Dual CTAs - Tap friendly on mobile */}
        <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-100 text-navy font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase px-7 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-olive cursor-pointer"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowRight size={15} className="text-navy group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onEnquireClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-light/80 hover:bg-olive text-white font-medium text-xs sm:text-sm tracking-[0.16em] uppercase px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-white/25 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <span>{siteConfig.hero.secondaryCta}</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#brand-statement"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll to brand statement"
      >
        <span className="text-[0.62rem] sm:text-[0.65rem] tracking-[0.25em] uppercase font-sans text-gray-400 group-hover:text-gray-200">
          SCROLL
        </span>
        <ChevronDown size={16} className="animate-bounce text-olive-light" />
      </a>
    </section>
  );
};
