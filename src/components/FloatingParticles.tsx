import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const generated: Particle[] = Array.from({ length: isMobile ? 12 : 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1, // 1 to 4px
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1, // 0.1 to 0.6 opacity
    }));
    setParticles(generated);
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
      {/* Subtle Dark Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Glows - static, GPU composited */}
      <div
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] mix-blend-screen"
        style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
      />
      
      <div
        className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-yellow-600/10 blur-[100px] mix-blend-screen"
        style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0], // subtle horizontal drift
            opacity: [0, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
