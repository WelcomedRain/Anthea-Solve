import React from 'react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';
import { 
  ShieldCheck, 
  Cpu, 
  Crop, 
  Workflow, 
  CheckCircle2, 
  Layers, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ProjectCardProps {
  project: CaseStudy;
  index: number;
  onSelect: (project: CaseStudy) => void;
}

const springPhysics = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  // Map accent colors to corresponding styling
  const accentStyles = {
    blue: {
      borderHover: 'group-hover:border-[#00f0ff]/50',
      glow: 'from-[#00f0ff]/20 via-[#0066ff]/10 to-transparent',
      textAccent: 'text-[#00f0ff]',
      bgBadge: 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20',
      bulletIcon: 'text-[#00f0ff]',
      cardGlow: 'group-hover:shadow-[0_0_35px_rgba(0,240,255,0.18)]',
    },
    pink: {
      borderHover: 'group-hover:border-[#ff007f]/50',
      glow: 'from-[#ff007f]/20 via-[#9333ea]/10 to-transparent',
      textAccent: 'text-[#ff007f]',
      bgBadge: 'bg-[#ff007f]/10 text-[#ff007f] border-[#ff007f]/20',
      bulletIcon: 'text-[#ff007f]',
      cardGlow: 'group-hover:shadow-[0_0_35px_rgba(255,0,127,0.18)]',
    },
    amber: {
      borderHover: 'group-hover:border-[#fbbf24]/50',
      glow: 'from-[#fbbf24]/20 via-[#ea580c]/10 to-transparent',
      textAccent: 'text-[#fbbf24]',
      bgBadge: 'bg-[#fbbf24]/10 text-[#fbbf24] border-[#fbbf24]/20',
      bulletIcon: 'text-[#fbbf24]',
      cardGlow: 'group-hover:shadow-[0_0_35px_rgba(251,191,36,0.18)]',
    },
    cyan: {
      borderHover: 'group-hover:border-[#00f0ff]/50',
      glow: 'from-[#00f0ff]/20 via-[#0284c7]/10 to-transparent',
      textAccent: 'text-[#00f0ff]',
      bgBadge: 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/20',
      bulletIcon: 'text-[#00f0ff]',
      cardGlow: 'group-hover:shadow-[0_0_35px_rgba(0,240,255,0.18)]',
    },
  }[project.accentColor];

  const getIcon = () => {
    switch (project.iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Crop':
        return <Crop className="w-5 h-5" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <motion.article
      id={`project-card-${project.id}`}
      variants={{
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={springPhysics}
      whileHover={{ y: -6, scale: 1.015 }}
      className={`group relative rounded-2xl bg-[#0f0f14]/90 border border-white/10 ${accentStyles.borderHover} ${accentStyles.cardGlow} transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl`}
    >
      {/* Glowing Gradient Border Reveal on Hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${accentStyles.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} 
      />

      {/* Decorative Filament Line at Top */}
      <div className={`h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 group-hover:via-current ${accentStyles.textAccent} to-transparent transition-all duration-500`} />

      <div className="p-6 sm:p-8 relative z-10 flex-1 flex flex-col">
        {/* Card Header: Meta Badges & Icon */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-white/[0.04] border border-white/10 ${accentStyles.textAccent} shadow-inner`}>
              {getIcon()}
            </div>
            <div>
              <h3 
                id={`title-${project.id}`}
                className="text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.title}
              </h3>
              <p className="text-xs text-gray-400 font-mono tracking-wide">{project.category}</p>
            </div>
          </div>

          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono border ${accentStyles.bgBadge}`}>
            {project.statusBadge}
          </span>
        </div>

        {/* SECTION 1: Distinct Description */}
        <div 
          id={`desc-section-${project.id}`}
          className="mb-6 pb-6 border-b border-white/[0.08]"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/50 mb-2.5">
            <FileText className="w-3.5 h-3.5 text-white/40" />
            <span>Overview &amp; Case Study</span>
          </div>
          <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* SECTION 2: Distinct Core Architecture */}
        <div 
          id={`arch-section-${project.id}`}
          className="flex-1 flex flex-col justify-start"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/50">
              <Layers className={`w-3.5 h-3.5 ${accentStyles.textAccent}`} />
              <span className="text-white/80 font-medium">Core Architecture</span>
            </div>
            <span className="text-[10px] font-mono text-white/40">Verified Spec</span>
          </div>

          {/* Core Architecture Bullet Points */}
          <ul className="space-y-2.5 mb-6">
            {project.architecture.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${accentStyles.bulletIcon}`} />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="pt-4 border-t border-white/[0.08]">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span 
                key={tech} 
                className="px-2 py-0.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono text-gray-300 tracking-tight transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Card Footer: Metrics & Interactive Inspector Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
              {project.metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="text-white/40">{m.label}:</span>
                  <span className="text-white font-medium">{m.value}</span>
                </div>
              ))}
            </div>

            <button
              id={`inspect-btn-${project.id}`}
              onClick={() => onSelect(project)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium ${accentStyles.textAccent} hover:underline transition-colors cursor-pointer group/btn`}
            >
              <span>Inspect Architecture</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
