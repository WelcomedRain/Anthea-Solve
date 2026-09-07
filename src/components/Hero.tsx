import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { Terminal, Shield, ArrowDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section 
      id="hero-section"
      aria-label="Anthea Solve Hero Section"
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 z-10"
    >
      {/* Studio Status Filament Pill */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.1 }}
        className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10 backdrop-blur-md text-xs font-mono text-white/80 shadow-[0_0_15px_rgba(0,240,255,0.08)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
        </span>
        <span className="tracking-wide">INDEPENDENT SOFTWARE STUDIO</span>
        <span className="text-white/20">•</span>
        <span className="text-[#00f0ff]/90 font-medium">LOCAL-FIRST & AIR-GAPPED</span>
      </motion.div>

      {/* 150px Logo Placeholder with Physics Entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.2 }}
        className="mb-8"
      >
        <Logo size={150} />
      </motion.div>

      {/* Main Architectural H1 Header */}
      <motion.h1
        id="hero-main-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.3 }}
        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Anthea <span className="bg-gradient-to-r from-[#00f0ff] via-[#d946ef] to-[#fbbf24] bg-clip-text text-transparent">Solve</span>
      </motion.h1>

      {/* H2 Header */}
      <motion.h2
        id="hero-subtitle"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.4 }}
        className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 max-w-2xl mx-auto mb-6 tracking-normal"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Intelligent solutions for a changing world.
      </motion.h2>

      {/* Sub-header: Founder & Developer */}
      <motion.div
        id="hero-founder"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.5 }}
        className="text-base sm:text-lg font-medium text-white/70 mb-10 flex items-center justify-center gap-2"
      >
        <span className="text-white font-semibold tracking-wide">Gene Bernardin</span>
        <span className="text-[#ff007f] font-mono">|</span>
        <span className="text-white/60">Founder &amp; Developer</span>
      </motion.div>

      {/* Philosophy Brief / Value Proposition */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.6 }}
        className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-light"
      >
        Architecting sovereign digital tools that operate entirely on your hardware. 
        Zero cloud reliance, local-first persistence, and real-time offline neural models.
      </motion.p>

      {/* Action Buttons with Spring Response */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.7 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          id="hero-btn-explore"
          onClick={onExploreClick}
          className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-[#00f0ff]/10 via-[#ff007f]/10 to-[#fbbf24]/10 border border-[#00f0ff]/40 text-white font-medium text-sm flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:border-[#00f0ff] transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#00f0ff] group-hover:rotate-12 transition-transform duration-300" />
          <span>Explore Case Studies</span>
          <ArrowDown className="w-4 h-4 text-white/60 group-hover:translate-y-0.5 transition-transform duration-300" />
        </button>

        <a
          id="hero-btn-contact"
          href="mailto:gene@antheasolve.com"
          className="px-6 py-3 rounded-xl bg-[#121217]/80 hover:bg-[#1a1a22] border border-white/10 hover:border-white/25 text-white/80 hover:text-white font-medium text-sm flex items-center gap-2 transition-all duration-300 cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-[#ff007f]" />
          <span>Direct Transmission</span>
        </a>
      </motion.div>

      {/* Bottom telemetry indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springTransition, delay: 0.85 }}
        className="mt-16 grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-white/5 max-w-lg mx-auto text-center"
      >
        <div>
          <div className="text-xl sm:text-2xl font-mono font-semibold text-white">0 KB</div>
          <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">Cloud Egress</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-mono font-semibold text-[#00f0ff]">100%</div>
          <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">Local-First</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-mono font-semibold text-[#ff007f]">Air-Gap</div>
          <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">Inference</div>
        </div>
      </motion.div>
    </section>
  );
};
