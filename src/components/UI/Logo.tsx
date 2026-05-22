import React, { forwardRef } from 'react';

interface LogoProps {
  className?: string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ className = '' }, ref) => {
  return (
    <div ref={ref} className={`flex flex-col items-center justify-center select-none ${className}`}>
      <h1 
        className="font-primary font-bold tracking-[0.3em] text-brand-primary" 
        style={{ 
          textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 10px rgba(255,255,255,0.6)', 
          fontSize: '1em', 
          lineHeight: 1,
          marginLeft: '0.3em' // offset tracking to center visually
        }}
      >
        VENECIA
      </h1>
      <h2 
        className="font-primary tracking-[0.6em] font-medium text-gray-100" 
        style={{ 
          textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)', 
          fontSize: '0.25em', 
          marginTop: '0.5em',
          marginLeft: '0.6em' // offset tracking to center visually
        }}
      >
        PUEBLO LIBRE
      </h2>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
