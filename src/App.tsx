import React from 'react';
import { Header } from './components/Header';
import { NeuralBackground } from './components/NeuralBackground';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { Footer } from './components/Footer';

export default function App() {
  const handleScrollToProjects = () => {
    const section = document.getElementById('projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-[#f3f4f6] selection:bg-[#00f0ff]/20 selection:text-[#00f0ff] overflow-x-hidden font-sans">
      {/* Dynamic Background Effect (Neural Canvas + Ambient CSS Mesh Flow) */}
      <NeuralBackground />

      {/* Persistent Glass Navigation */}
      <Header />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* Hero Component */}
        <Hero onExploreClick={handleScrollToProjects} />

        {/* Architecture / Projects Grid */}
        <ProjectGrid />
      </main>

      {/* Minimalist Footer with Magnetic Mailto Link */}
      <Footer />
    </div>
  );
}
