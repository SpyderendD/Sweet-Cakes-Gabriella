import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  type: 'circle' | 'star' | 'heart' | 'sparkle';
}

const colors = ["#ffd1dc", "#fffdd0", "#e6e6fa", "#89cff0", "#ffb6c1", "#f0e68c", "#dda0dd"];

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const count = isMobile ? 20 : 60;
      for (let i = 0; i < count; i++) {
        const typeRand = Math.random();
        let type: Particle['type'] = 'circle';
        if (typeRand > 0.9) type = 'sparkle';
        else if (typeRand > 0.8) type = 'heart';
        else if (typeRand > 0.7) type = 'star';

        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (isMobile ? 6 : 8) + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * (isMobile ? 15 : 25) + 15,
          delay: Math.random() * 10,
          type,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute opacity-30 flex items-center justify-center will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", "-110vh"],
            x: ["0vw", `${Math.random() * 40 - 20}vw`],
            rotate: [0, 360, -360],
            scale: [1, 1.8, 1],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        >
          {p.type === 'circle' && (
            <div className="w-full h-full rounded-full" style={{ backgroundColor: p.color }} />
          )}
          {p.type === 'star' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow-sm">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          )}
          {p.type === 'heart' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow-sm">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.type === 'sparkle' && (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full drop-shadow-lg animate-pulse">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}

