import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { Mail, Shield, Layers, Terminal } from 'lucide-react';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      id="main-navigation-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0c]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Lockup */}
        <a 
          href="#hero-section" 
          className="flex items-center gap-3 group select-none"
        >
          <Logo size={36} interactive={false} />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#00f0ff] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
              Anthea <span className="text-white/60 font-medium">Solve</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
              Software Studio
            </span>
          </div>
        </a>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="#projects"
            className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors hidden sm:inline-block"
          >
            Case Studies
          </a>

          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span>Local-First</span>
          </div>

          <a
            id="nav-contact-link"
            href="mailto:gene@antheasolve.com"
            className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#00f0ff]/40 text-white text-xs font-mono flex items-center gap-2 transition-all duration-300"
          >
            <Mail className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span className="hidden sm:inline">gene@antheasolve.com</span>
            <span className="sm:hidden">Contact</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
};
