import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Mail, ArrowUpRight, Copy, Check, Terminal, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const mailRef = useRef<HTMLAnchorElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Magnetic Physics for the mailto link
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const magneticX = useSpring(mouseX, springConfig);
  const magneticY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!mailRef.current) return;
    const rect = mailRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Magnetic pull factor
    mouseX.set((e.clientX - centerX) * 0.35);
    mouseY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('gene@antheasolve.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer 
      id="footer-section"
      aria-label="Anthea Solve Footer"
      className="relative z-10 border-t border-white/[0.08] bg-[#08080b] pt-16 pb-12 overflow-hidden"
    >
      {/* Background Energy Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-gradient-to-b from-[#00f0ff]/5 to-transparent blur-xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Sub-label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-gray-400 mb-6">
            <Terminal className="w-3.5 h-3.5 text-[#ff007f]" />
            <span>DIRECT INQUIRIES &amp; COLLABORATION</span>
          </div>

          <h3 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Initiate Architecture Dialogue
          </h3>

          <p className="text-sm text-gray-400 max-w-md mx-auto mb-10 font-light">
            Have a project requiring privacy-preserving architecture, local model deployment, or custom offline systems?
          </p>

          {/* Magnetic Mailto Link Container */}
          <div className="relative mb-14">
            <motion.a
              ref={mailRef}
              id="magnetic-email-link"
              href="mailto:gene@antheasolve.com"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: magneticX, y: magneticY }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#111116] border border-white/15 text-white shadow-[0_0_25px_rgba(0,240,255,0.12)] hover:border-[#00f0ff]/70 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] transition-colors duration-300 cursor-pointer"
            >
              {/* Internal subtle gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00f0ff]/10 via-[#ff007f]/10 to-[#fbbf24]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#00f0ff] group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </div>

              <span className="text-base sm:text-lg font-mono font-medium tracking-tight text-white group-hover:text-[#00f0ff] transition-colors">
                gene@antheasolve.com
              </span>

              <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>

            {/* Quick Copy Button */}
            <div className="mt-3">
              <button
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00f0ff]" />
                    <span className="text-[#00f0ff]">Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy email address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Minimalist Divider */}
          <div className="w-full max-w-xl h-px bg-white/[0.06] mb-8" />

          {/* Minimalist Copyright Line */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl text-xs text-gray-500 font-mono gap-4">
            <p id="footer-copyright">
              &copy; {new Date().getFullYear()} Anthea Solve. All rights reserved.
            </p>
            <p className="text-gray-400">
              Gene Bernardin <span className="text-[#ff007f]">/</span> Founder &amp; Developer
            </p>
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
              <span>Strict Zero-Cloud Philosophy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
