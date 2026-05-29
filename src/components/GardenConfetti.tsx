import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number; // percentage horizontal starting position
  y: number; // percentage vertical starting position
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
  angle: number;
  scale: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

const COLORS = [
  '#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', 
  '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4', '#14b8a6', 
  '#10b981', '#22c55e', '#84cc16', '#eab308', '#f97316', 
  '#ef4444'
];

const SHAPES: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];

interface GardenConfettiProps {
  active: boolean;
  onComplete: () => void;
}

export const GardenConfetti: React.FC<GardenConfettiProps> = ({ active, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    // Generate burst particles at bottom or center coordinates
    const nextParticles: Particle[] = Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      return {
        id: i,
        x: 30 + Math.random() * 40, // centered on bottom half
        y: 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        angle: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.8,
        velocityX: Math.cos(angle) * speed,
        velocityY: -Math.random() * 12 - 4, // strong upward thrust
        rotationSpeed: (Math.random() - 0.5) * 10
      };
    });

    setParticles(nextParticles);

    // Fade out and cleanup animation
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => {
          return (
            <motion.div
              key={p.id}
              initial={{ 
                x: `${p.x}%`, 
                y: `${p.y}%`, 
                scale: 0, 
                rotate: 0, 
                opacity: 0.85 
              }}
              animate={{
                x: [
                  `${p.x}%`,
                  `${p.x + p.velocityX * 1.5}%`,
                  `${p.x + p.velocityX * 3}%`
                ],
                y: [
                  `${p.y}%`,
                  `${p.y + p.velocityY * 1.5}%`,
                  `${p.y + p.velocityY * 3 + 20}%` // gravity accelerates downward
                ],
                rotate: p.angle + p.rotationSpeed * 100,
                scale: p.scale * 1.1,
                opacity: [0.95, 0.95, 0]
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.2,
                ease: "easeOut"
              }}
              className="absolute pointer-events-none"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.shape !== 'triangle' && p.shape !== 'star' ? p.color : undefined,
                borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : undefined,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              {p.shape === 'triangle' && (
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: p.color }}>
                  <polygon points="50,15 90,85 10,85" />
                </svg>
              )}
              {p.shape === 'star' && (
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: p.color }}>
                  <polygon points="50,10 63,38 93,38 69,56 78,86 50,68 22,86 31,56 7,38 37,38" />
                </svg>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
