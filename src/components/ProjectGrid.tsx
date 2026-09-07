import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CASE_STUDIES } from '../data/projects';
import { CaseStudy } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Layers, Sparkles, Filter, Database, Shield, Cpu } from 'lucide-react';

const springTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

export const ProjectGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Local-First Systems', 'Local AI & Real-Time 3D', 'Client-Side PWA', 'Generative Evaluation'];

  const filteredProjects = activeFilter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter((p) => p.category === activeFilter);

  return (
    <section 
      id="projects" 
      aria-label="Anthea Solve Projects Grid"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={springTransition}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#00f0ff] mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>CASE STUDIES &amp; ARCHITECTURES</span>
        </div>

        <h2 
          id="project-grid-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Architectural Case Studies
        </h2>

        <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          Every project authored by Anthea Solve embodies a strict philosophy: eliminate arbitrary cloud dependencies,
          prioritize local hardware autonomy, and construct uncompromised software systems.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00f0ff]/20 to-[#ff007f]/20 border border-[#00f0ff]/50 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-[#121217] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Staggered whileInView Scroll Reveal Grid */}
      <motion.div
        id="projects-container-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
      >
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={(proj) => setSelectedProject(proj)}
          />
        ))}
      </motion.div>

      {/* Interactive Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
