import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 150, className = '', interactive = true }) => {
  return (
    <motion.div
      id="anthea-solve-logo"
      className={`relative flex items-center justify-center select-none group ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      whileHover={interactive ? { scale: 1.05 } : undefined}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {/* Dynamic Energy Filament Glow Backdrop */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#00f0ff]/20 via-[#ff007f]/20 to-[#fbbf24]/10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Outer Geometric Frame / Boundary */}
      <div className="relative w-full h-full rounded-2xl border border-white/10 bg-[#0d0d12]/80 backdrop-blur-md p-3.5 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.12)] group-hover:border-[#00f0ff]/40 group-hover:shadow-[0_0_35px_rgba(255,0,127,0.22)] transition-all duration-500 overflow-hidden">
        {/* Subtle internal grid lines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #ff007f 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Vector Filament Neural Glyph */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full relative z-10 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="filamentGradientA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ff007f" />
            </linearGradient>

            <linearGradient id="filamentGradientB" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff007f" />
              <stop offset="60%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagonal / Diamond Architectural Boundary */}
          <polygon
            points="60,12 104,36 104,84 60,108 16,84 16,36"
            stroke="url(#filamentGradientA)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-40 animate-pulse-glow"
          />

          {/* Energy Filaments - Stylized 'A' & 'S' Intertwined Neural Paths */}
          {/* Main 'A' Apex and descending vectors */}
          <path
            d="M60 22 L86 86 M60 22 L34 86"
            stroke="url(#filamentGradientA)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* 'S' Curve woven through the neural nodes */}
          <path
            d="M80 44 C80 34, 40 34, 40 54 C40 76, 80 66, 80 84 C80 96, 42 96, 40 88"
            stroke="url(#filamentGradientB)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-90"
          />

          {/* Core horizontal bridge with pulse */}
          <line
            x1="44"
            y1="64"
            x2="76"
            y2="64"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Glowing Neural Intersection Nodes */}
          <circle cx="60" cy="22" r="4.5" fill="#00f0ff" className="animate-pulse" />
          <circle cx="34" cy="86" r="3.5" fill="#ff007f" />
          <circle cx="86" cy="86" r="3.5" fill="#fbbf24" />
          <circle cx="60" cy="64" r="3" fill="#ffffff" />
          <circle cx="80" cy="44" r="2.5" fill="#00f0ff" />
          <circle cx="40" cy="88" r="2.5" fill="#ff007f" />
        </svg>

        {/* Studio Sub-label Badge */}
        <div className="absolute bottom-1.5 flex items-center gap-1 text-[8px] font-mono tracking-widest text-white/50 uppercase">
          <span className="w-1 h-1 rounded-full bg-[#00f0ff] animate-ping" />
          <span>ANTHEA SOLVE</span>
        </div>
      </div>
    </motion.div>
  );
};
