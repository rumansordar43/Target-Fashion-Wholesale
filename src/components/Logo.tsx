import React from 'react';

export const LogoIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 500 500" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#F4D03F" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
      <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1E3A8A" />
        <stop offset="100%" stopColor="#172554" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
        <feOffset dx="5" dy="5" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#shadow)">
      {/* Outer Circle */}
      <circle cx="250" cy="250" r="230" stroke="url(#goldGrad)" strokeWidth="8" fill="#1A1A1A" />
      <circle cx="250" cy="250" r="215" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* Stylized P */}
      <path 
        d="M180 150 L 180 350 M 180 150 C 250 150, 250 230, 180 230" 
        stroke="url(#goldGrad)" 
        strokeWidth="20" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Stylized K */}
      <path 
        d="M280 150 L 280 350 M 280 250 L 380 150 M 280 250 L 380 350" 
        stroke="url(#goldGrad)" 
        strokeWidth="20" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Needle through the PK */}
      <path 
        d="M400 100 L 150 400" 
        stroke="url(#goldGrad)" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <circle cx="400" cy="100" r="12" fill="url(#goldGrad)" />
      <path d="M394 94 L 406 106 M 406 94 L 394 106" stroke="#1A1A1A" strokeWidth="2" />
      
      {/* Decorative Swirls */}
      <path 
        d="M120 250 Q 150 200, 180 250" 
        stroke="url(#goldGrad)" 
        strokeWidth="3" 
        fill="none"
        opacity="0.6"
      />
      <path 
        d="M320 250 Q 350 300, 380 250" 
        stroke="url(#goldGrad)" 
        strokeWidth="3" 
        fill="none"
        opacity="0.6"
      />
    </g>
  </svg>
);

export const LogoName = ({ className }: { className?: string }) => (
  <div className={`flex flex-col items-center justify-center leading-none ${className}`}>
    <img 
      src="https://lh3.googleusercontent.com/d/1ETwGBvoI2RpftqIewqgxuL0o5_pL7FhH" 
      alt="Prism Kicks" 
      className="w-full h-auto max-h-[40px] object-contain" 
      referrerPolicy="no-referrer"
    />
  </div>
);
