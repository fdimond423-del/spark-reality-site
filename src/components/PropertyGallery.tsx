import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export const PropertyGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth + 140;

      // Pinned Horizontal Gallery Scroll-Scrub
      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-navy text-white overflow-hidden flex flex-col justify-center"
      aria-label="Architectural Property Gallery"
    >
      {/* Intro Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full mb-8 lg:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-olive-light font-mono text-xs tracking-[0.2em] uppercase font-semibold mb-2">
              <span>CURATED VISUAL PERSPECTIVES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight uppercase font-display">
              Architectural Horizons
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md font-sans">
            A photographic exploration of residential sanctuaries, monolithic corporate facades, and landscaped spaces.
          </p>
        </div>
      </div>

      {/* Horizontal Track Scrolled by Vertical Scroll */}
      <div className="w-full overflow-hidden px-6 sm:px-8 lg:px-12">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 w-max will-change-transform"
        >
          {siteConfig.gallery.map((item, index) => (
            <div
              key={item.id}
              className="relative w-[300px] sm:w-[380px] lg:w-[460px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-navy-surface shrink-0 group border border-white/10"
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Architectural Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

              {/* Number Index Badge */}
              <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[0.7rem] font-mono tracking-widest text-olive-light">
                0{index + 1}
              </div>

              {/* Captions */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-olive-light font-mono block mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
