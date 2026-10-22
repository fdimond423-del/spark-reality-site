import React from 'react';

interface SparkLogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SparkLogo: React.FC<SparkLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
}) => {
  const isLight = variant === 'light';

  // Sizing optimized for mobile screens (<640px) and desktop
  const heightClasses = {
    sm: 'h-7 sm:h-9',
    md: 'h-8 sm:h-11',
    lg: 'h-12 sm:h-18',
  }[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      {/* Official Spark Reality Logo - perfectly responsive on mobile */}
      <img
        src={isLight ? '/images/spark-reality-logo-darkmode.png' : '/images/spark-reality-logo-transparent.png'}
        alt="Spark Reality - Spaces for a Brighter Tomorrow"
        className={`${heightClasses} w-auto max-w-[160px] sm:max-w-none object-contain transition-transform duration-300 hover:scale-[1.02]`}
        style={{
          filter: isLight ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' : 'none',
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
