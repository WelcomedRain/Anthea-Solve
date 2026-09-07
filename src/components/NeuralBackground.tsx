import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
}

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      { fill: '#00f0ff', glow: 'rgba(0, 240, 255, 0.4)' }, // Electric Blue / Cyan
      { fill: '#ff007f', glow: 'rgba(255, 0, 127, 0.4)' }, // Neon Pink
      { fill: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)' }, // Deep Blue
      { fill: '#fbbf24', glow: 'rgba(251, 191, 36, 0.3)' }, // Warm Amber
    ];

    let particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const scheme = colors[Math.floor(Math.random() * colors.length)];
        const baseAlpha = 0.25 + Math.random() * 0.45;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: 1.5 + Math.random() * 2,
          color: scheme.fill,
          glowColor: scheme.glow,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    initParticles();

    // Mouse pointer interaction
    const pointer = { x: -1000, y: -1000, active: false };
    const handlePointerMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);

    const maxConnectionDistance = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw filament connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Update position
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off bounds
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Pointer influence
        if (pointer.active) {
          const dx = pointer.x - p1.x;
          const dy = pointer.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p1.x += (dx / dist) * force * 0.8;
            p1.y += (dy / dist) * force * 0.8;
            p1.alpha = Math.min(1, p1.baseAlpha + force * 0.5);
          } else {
            p1.alpha = p1.baseAlpha;
          }
        }

        // Connect to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxConnectionDistance) {
            const opacity = (1 - distance / maxConnectionDistance) * 0.28;
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, p1.glowColor.replace('0.4', `${opacity}`));
            gradient.addColorStop(1, p2.glowColor.replace('0.4', `${opacity}`));

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.save();
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.shadowColor = p1.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Slow-moving CSS Mesh Gradient Background */}
      <div className="absolute -top-[25%] -left-[15%] w-[130vw] h-[130vh] opacity-35 filter blur-[100px] animate-mesh-flow">
        {/* Electric Blue Orb */}
        <div className="absolute top-[20%] left-[25%] w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-[#00f0ff]/30 to-[#0055ff]/15 mix-blend-screen" />
        {/* Vibrant Neon Pink Orb */}
        <div className="absolute top-[45%] right-[20%] w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-[#ff007f]/25 to-[#9333ea]/15 mix-blend-screen" />
        {/* Warm Amber Accent Filament Orb */}
        <div className="absolute bottom-[20%] left-[40%] w-[380px] h-[380px] rounded-full bg-gradient-to-r from-[#f59e0b]/15 to-[#ff007f]/15 mix-blend-screen" />
      </div>

      {/* Grid Overlay Texture for Architectural Depth */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0c_90%)]" />

      {/* Particle & Filament Network Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
