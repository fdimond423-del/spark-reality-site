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
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    const text = textRef.current;
    const overlay = overlayRef.current;

    if (!container || !text) return;

    // Ensure video is playing smoothly
    if (video) {
      video.play().catch(() => {
        // Autoplay may be restricted until interaction in some browsers
      });
    }

    let ctx = gsap.context(() => {
      // 1. Entrance animation: Smoothly reveal text and clear all inline styles
      // so it can NEVER get stuck at low opacity or transform.
      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1,
          clearProps: 'all' // Strips inline styles so text is 100% visible and uncorrupted
        }
      );

      // 2. Parallax background on video: Silky smooth 60 FPS GPU motion
      if (video) {
        gsap.to(video, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

      // 3. Graceful fade-out as user scrolls DOWN into Brand Statement
      // Starts only after 35% of the hero has scrolled, and resets to 100% on scroll up!
      gsap.to(text, {
        opacity: 0,
        y: -60,
        scale: 0.96,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: container,
          start: '35% top',
          end: 'bottom top',
          scrub: 0.5,
          onLeaveBack: () => {
            // When user scrolls back up into hero, force 100% visible
            gsap.set(text, { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
          },
          onEnterBack: () => {
            // Re-entering hero from below
            gsap.set(text, { opacity: 1, y: 0, scale: 1, clearProps: 'all' });
          }
        }
      });

      if (overlay) {
        gsap.to(overlay, {
          backgroundColor: 'rgba(11, 31, 48, 0.88)',
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

    // 4. Native scroll safety: If user is anywhere near the top of the page,
    // ensure text is 100% visible and never stuck in a faded state.
    const handleScroll = () => {
      if (window.scrollY < 60 && text) {
        if (text.style.opacity && text.style.opacity !== '1') {
          text.style.opacity = '1';
          text.style.transform = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[580px] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-navy"
      aria-label="Spark Reality Hero"
    >
      {/* Background Architectural Video - Continuous 60 FPS Ambient Motion */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-[125%] -top-[12%] object-cover pointer-events-none scale-105"
        playsInline
        muted
        preload="auto"
        poster={siteConfig.hero.posterPath}
        autoPlay
        loop
      >
        <source src={siteConfig.hero.videoPath} type="video/mp4" />
      </video>

      {/* Atmospheric Navy Gradient Overlay - Rich contrast for 100% readability */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/50 transition-colors pointer-events-none"
      />

      {/* Ambient Radial Vignette behind text to guarantee crystal clear contrast */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(11,31,48,0.75)_0%,_rgba(11,31,48,0.35)_60%,_transparent_100%)] pointer-events-none"
      />

      {/* Content Container - Always crystal clear, perfectly legible */}
      <div
        ref={textRef}
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center mt-6 sm:mt-12 transition-opacity duration-200"
      >
        {/* Subtle Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-navy/90 border border-white/30 backdrop-blur-md mb-5 sm:mb-8 text-white text-[0.72rem] sm:text-xs tracking-[0.2em] uppercase font-sans shadow-xl">
          <span className="w-2 h-2 rounded-full bg-olive animate-pulse shadow-[0_0_10px_#657F49]" />
          <span className="font-semibold text-white">AHMEDABAD & GANDHINAGAR PROPERTY ADVISORY</span>
        </div>

        {/* Main Architectural Headline - High Contrast Pure White with Luxurious Shadows */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase leading-[1.08] max-w-4xl font-display drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          MORE THAN A PROPERTY.
          <span className="block text-white/95 font-light mt-2 sm:mt-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            A FUTURE TAKING SHAPE.
          </span>
        </h1>

        {/* Supporting Copy - High Contrast */}
        <p className="mt-5 sm:mt-8 text-base sm:text-lg md:text-xl text-white/95 font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {siteConfig.hero.supportingText}
        </p>

        {/* Dual CTAs - Vibrant, Crisp & Solid */}
        <div className="mt-7 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-olive text-navy hover:text-white font-bold text-xs sm:text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_0_25px_rgba(101,127,73,0.6)] hover:-translate-y-0.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-olive cursor-pointer"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onEnquireClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy-light/95 hover:bg-white hover:text-navy text-white font-bold text-xs sm:text-sm tracking-[0.16em] uppercase px-8 py-4 rounded-full border-2 border-white/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-xl hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <span>{siteConfig.hero.secondaryCta}</span>
          </button>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <a
        href="#brand-statement"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 sm:gap-2 text-white/90 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll to brand statement"
      >
        <span className="text-[0.65rem] sm:text-[0.7rem] tracking-[0.25em] uppercase font-sans text-gray-200 group-hover:text-white drop-shadow-md">
          SCROLL
        </span>
        <ChevronDown size={18} className="animate-bounce text-olive drop-shadow-md" />
      </a>
    </section>
  );
};
