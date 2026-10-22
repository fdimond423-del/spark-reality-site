import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, ProjectRecord } from '../config/siteConfig';
import { ArrowRight, MapPin, Building, CheckCircle2, Maximize2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AhmedabadShowcaseProps {
  onSelectProject: (project: ProjectRecord) => void;
  onEnquireClick: () => void;
}

export const AhmedabadShowcase: React.FC<AhmedabadShowcaseProps> = ({
  onSelectProject,
  onEnquireClick,
}) => {
  const showcase = siteConfig.ahmedabadShowcase;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentProject = showcase.projects[selectedIdx] || showcase.projects[0];

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imgFrame = imageFrameRef.current;
    if (!section || !imgFrame) return;

    let ctx = gsap.context(() => {
      // Parallax and clip reveal
      gsap.fromTo(
        imgFrame,
        { clipPath: 'inset(10% 5% 10% 5%)', scale: 1.08 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );

      // Subtle parallax on scroll
      gsap.to(imgFrame.querySelector('img'), {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 lg:py-40 bg-white text-navy overflow-hidden"
      aria-label="Ahmedabad Property Showcase"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-olive font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            <span>{showcase.sectionNumber}</span>
            <span className="w-8 h-[1px] bg-olive/40" />
            <span>PRIME PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-tight font-display">
            {showcase.headline}
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-mutedText leading-relaxed">
            {showcase.description}
          </p>

          {/* Project Switcher Tabs */}
          {showcase.projects.length > 1 && (
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-8">
              {showcase.projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-200 border ${
                    selectedIdx === idx
                      ? 'bg-navy text-white border-navy shadow-sm'
                      : 'bg-spark-lightGrey text-mutedText border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {proj.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dominant Architectural Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Dominant Image Frame (7 cols) */}
          <div className="lg:col-span-7">
            <div
              ref={imageFrameRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl bg-navy cursor-pointer group will-change-transform"
              onClick={() => onSelectProject(currentProject)}
            >
              <img
                src={currentProject.mainImage}
                alt={currentProject.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Locality Tag Overlay */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-semibold tracking-wider uppercase text-navy flex items-center gap-1.5 shadow-sm">
                <MapPin size={12} className="text-olive" />
                <span>{currentProject.localityBadge}</span>
              </div>

              {/* Expand Hint */}
              <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-navy/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Maximize2 size={16} />
              </div>

              {/* Caption on mobile */}
              <div className="absolute bottom-5 left-5 text-white pr-16 sm:hidden">
                <h4 className="text-lg font-bold">{currentProject.name}</h4>
                <p className="text-xs text-gray-300">{currentProject.location}</p>
              </div>
            </div>
          </div>

          {/* Configurable Details Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-olive font-semibold text-xs tracking-wider uppercase mb-2">
                <Building size={14} />
                <span>{currentProject.propertyType}</span>
                {currentProject.isVerified && (
                  <span className="flex items-center gap-1 text-[0.7rem] bg-olive-tint text-olive px-2 py-0.5 rounded-full font-mono">
                    <CheckCircle2 size={11} /> Verified
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy uppercase leading-snug font-display">
                {currentProject.name}
              </h3>

              <div className="flex items-center gap-1.5 text-mutedText text-sm mt-2">
                <MapPin size={14} className="text-olive shrink-0" />
                <span>{currentProject.location}</span>
              </div>

              <p className="mt-5 text-sm sm:text-base text-darkText leading-relaxed">
                {currentProject.description}
              </p>

              {/* Key Architectural Specifications */}
              <div className="grid grid-cols-2 gap-4 my-6 sm:my-8 py-5 border-t border-b border-gray-200">
                <div>
                  <span className="text-[0.7rem] uppercase tracking-wider text-mutedText font-mono block">
                    Configuration
                  </span>
                  <span className="text-sm font-semibold text-navy mt-1 block">
                    {currentProject.configuration}
                  </span>
                </div>
                <div>
                  <span className="text-[0.7rem] uppercase tracking-wider text-mutedText font-mono block">
                    Starting Price
                  </span>
                  <span className="text-sm font-bold text-olive mt-1 block">
                    {currentProject.startingPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => onSelectProject(currentProject)}
                className="inline-flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold text-xs tracking-[0.15em] uppercase px-6 py-3.5 rounded-full transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
              >
                <span>{showcase.cta}</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={onEnquireClick}
                className="inline-flex items-center justify-center gap-2 bg-spark-lightGrey hover:bg-gray-200 text-navy font-semibold text-xs tracking-[0.15em] uppercase px-6 py-3.5 rounded-full border border-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                <span>ENQUIRE NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
