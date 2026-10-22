import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Map, UserCheck, Building2, Compass } from 'lucide-react';

export const WhySparkReality: React.FC = () => {
  const { heading, pillars } = siteConfig.whySpark;

  const pillarIcons = [
    <Map className="w-6 h-6 text-olive" />,
    <UserCheck className="w-6 h-6 text-olive" />,
    <Building2 className="w-6 h-6 text-olive" />,
    <Compass className="w-6 h-6 text-olive" />
  ];

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 lg:py-40 bg-spark-lightGrey text-navy border-t border-b border-gray-200"
      aria-label="Why Spark Reality"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-olive font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold mb-3">
            <span>OUR APPROACH</span>
            <span className="w-8 h-[1px] bg-olive/40" />
            <span>THOUGHTFUL GUIDANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-tight font-display whitespace-pre-line">
            {heading}
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-mutedText leading-relaxed">
            Finding property should be an informed, transparent, and measured decision. We provide local perspective grounded in actual market realities.
          </p>
        </div>

        {/* Four Concise Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-spark-lightGrey flex items-center justify-center mb-6">
                  {pillarIcons[idx]}
                </div>

                <div className="text-[0.68rem] font-mono tracking-widest text-olive uppercase font-bold mb-2">
                  0{idx + 1} / VALUE
                </div>

                <h3 className="text-base sm:text-lg font-bold text-navy uppercase tracking-tight leading-snug font-display mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-mutedText leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[0.7rem] font-mono text-gray-400 uppercase">
                <span>Spark Advisory</span>
                <span>Gujarat, IN</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
