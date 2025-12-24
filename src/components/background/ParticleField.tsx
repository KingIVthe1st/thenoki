"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Particle types
type ParticleType = "heart" | "sparkle" | "star" | "circle";

interface Particle {
  id: string;
  type: ParticleType;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

// Heart SVG
const HeartIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// 4-point Star SVG
const StarIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
  </svg>
);

// Sparkle/diamond shape
const SparkleIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
  </svg>
);

// Circle/dot
const CircleIcon = ({ size, color }: { size: number; color: string }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
    }}
  />
);

const ParticleIcon = ({
  type,
  size,
  color,
}: {
  type: ParticleType;
  size: number;
  color: string;
}) => {
  switch (type) {
    case "heart":
      return <HeartIcon size={size} color={color} />;
    case "star":
      return <StarIcon size={size} color={color} />;
    case "sparkle":
      return <SparkleIcon size={size} color={color} />;
    case "circle":
      return <CircleIcon size={size} color={color} />;
  }
};

// Animation variants for different particle types
const particleAnimations = {
  heart: {
    animate: {
      y: [0, -30, 0],
      x: [0, 10, -5, 0],
      scale: [1, 1.1, 0.95, 1],
      rotate: [-5, 5, -5],
    },
    duration: 6,
  },
  sparkle: {
    animate: {
      scale: [0.8, 1.3, 0.8],
      opacity: [0.4, 1, 0.4],
      rotate: [0, 180, 360],
    },
    duration: 3,
  },
  star: {
    animate: {
      scale: [0.9, 1.15, 0.9],
      opacity: [0.5, 1, 0.5],
      rotate: [0, 15, 0],
    },
    duration: 4,
  },
  circle: {
    animate: {
      y: [0, -15, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
    },
    duration: 5,
  },
};

// Generate random particles
function generateParticles(count: number): Particle[] {
  const colors = {
    heart: ["#ff69b4", "#ff6b9d", "#ec4899", "#f472b6"],
    sparkle: ["#ffffff", "#fef3c7", "#ddd6fe", "#c4b5fd"],
    star: ["#fff", "#fef3c7", "#fbcfe8", "#ddd6fe"],
    circle: [
      "rgba(255,255,255,0.6)",
      "rgba(196,181,253,0.5)",
      "rgba(251,207,232,0.5)",
    ],
  };

  const types: ParticleType[] = ["heart", "sparkle", "star", "circle"];

  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const typeColors = colors[type];

    return {
      id: `particle-${i}`,
      type,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: type === "heart" ? 10 + Math.random() * 10 : 6 + Math.random() * 8,
      delay: Math.random() * 5,
      duration: particleAnimations[type].duration + Math.random() * 2,
      color: typeColors[Math.floor(Math.random() * typeColors.length)],
    };
  });
}

interface ParticleFieldProps {
  particleCount?: number;
}

export function ParticleField({ particleCount = 25 }: ParticleFieldProps) {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Generate particles only on the client to avoid hydration mismatch
  useEffect(() => {
    setParticles(generateParticles(particleCount));
    setMounted(true);
  }, [particleCount]);

  // Don't render anything during SSR to avoid hydration issues
  if (!mounted) {
    return null;
  }

  if (reducedMotion) {
    // Show static particles for reduced motion preference
    return (
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 6 }}>
        {particles.slice(0, 10).map((particle) => (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.5,
            }}
          >
            <ParticleIcon
              type={particle.type}
              size={particle.size}
              color={particle.color}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 6 }}
    >
      {particles.map((particle) => {
        const animation = particleAnimations[particle.type];

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={animation.animate}
            transition={{
              duration: particle.duration,
              ease: "easeInOut",
              repeat: Infinity,
              delay: particle.delay,
            }}
          >
            <ParticleIcon
              type={particle.type}
              size={particle.size}
              color={particle.color}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default ParticleField;
