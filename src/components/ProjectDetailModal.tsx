import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy } from '../types';
import { X, Shield, Terminal, Zap, CheckCircle, ArrowRight, Cpu, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: CaseStudy | null;
  onClose: () => void;
}

const springConfig = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const accentColorMap = {
    blue: {
      text: 'text-[#00f0ff]',
      border: 'border-[#00f0ff]/30',
      badge: 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30',
      glow: 'shadow-[0_0_40px_rgba(0,240,255,0.15)]',
    },
    pink: {
      text: 'text-[#ff007f]',
      border: 'border-[#ff007f]/30',
      badge: 'bg-[#ff007f]/10 text-[#ff007f] border-[#ff007f]/30',
      glow: 'shadow-[0_0_40px_rgba(255,0,127,0.15)]',
    },
    amber: {
      text: 'text-[#fbbf24]',
      border: 'border-[#fbbf24]/30',
      badge: 'bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/30',
      glow: 'shadow-[0_0_40px_rgba(251,191,36,0.15)]',
    },
    cyan: {
      text: 'text-[#00f0ff]',
      border: 'border-[#00f0ff]/30',
      badge: 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30',
      glow: 'shadow-[0_0_40px_rgba(0,240,255,0.15)]',
    },
  }[project.accentColor];

  return (
    <AnimatePresence>
      <div 
        id="project-detail-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="project-detail-dialog"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={springConfig}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-3xl rounded-2xl bg-[#0e0e13] border border-white/15 ${accentColorMap.glow} p-6 sm:p-8 text-left shadow-2xl overflow-hidden my-8`}
        >
          {/* Top Filament Border Glow */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current ${accentColorMap.text} to-transparent`} />

          {/* Close Button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            aria-label="Close Architecture Inspector"
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="pr-12 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${accentColorMap.badge}`}>
                {project.statusBadge}
              </span>
              <span className="text-xs font-mono text-gray-400">{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              {project.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1 font-mono">
              {project.headline}
            </p>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/5 mb-6">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="text-[11px] font-mono text-white/40 uppercase">{m.label}</div>
                <div className="text-sm sm:text-base font-mono font-semibold text-white mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
            {/* Architectural Summary */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2 flex items-center gap-1.5">
                <Terminal className={`w-3.5 h-3.5 ${accentColorMap.text}`} />
                <span>Deep Architectural Topology</span>
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                {project.deepArchitecture.summary}
              </p>
            </div>

            {/* Execution Pipeline Flow */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2.5 flex items-center gap-1.5">
                <Zap className={`w-3.5 h-3.5 ${accentColorMap.text}`} />
                <span>Client Execution Pipeline</span>
              </h4>
              <div className="space-y-2">
                {project.deepArchitecture.executionFlow.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-gray-300">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 font-mono text-[10px] text-white shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="mt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sovereign Privacy & Data Guarantees */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/50 mb-2.5 flex items-center gap-1.5">
                <Shield className={`w-3.5 h-3.5 ${accentColorMap.text}`} />
                <span>Sovereignty &amp; Privacy Guarantees</span>
              </h4>
              <ul className="grid sm:grid-cols-2 gap-2">
                {project.deepArchitecture.privacyGuarantees.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-gray-300">
                    <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accentColorMap.text}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benchmark Spec */}
            {project.deepArchitecture.benchmarkOrSpec && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-xs flex items-center justify-between gap-2">
                <span className="text-white/40">Benchmark Output:</span>
                <span className={`${accentColorMap.text} font-medium`}>{project.deepArchitecture.benchmarkOrSpec}</span>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 rounded bg-white/[0.05] text-[10px] font-mono text-gray-400">
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Done Inspecting
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
