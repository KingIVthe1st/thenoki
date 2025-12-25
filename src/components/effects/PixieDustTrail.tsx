"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// PIXIE DUST TRAIL - Disney-style cursor particles
// ============================================
// Spawns magical sparkles that trail behind cursor movement
// with velocity inheritance and natural decay physics

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number; // Velocity inherited from cursor movement
  vy: number;
  size: number;
  color: string;
  rotation: number;
  type: "sparkle" | "star" | "circle" | "heart";
  lifetime: number;
}

const PARTICLE_COLORS = [
  "#ffffff",
  "#fef3c7", // Warm white
  "#fbcfe8", // Pink
  "#c4b5fd", // Lavender
  "#ec4899", // Hot pink
  "#a78bfa", // Purple
  "#00f5ff", // Cyan (Noki eye color)
  "#f472b6", // Light pink
];

const PARTICLE_TYPES = ["sparkle", "star", "circle", "heart"] as const;

export function PixieDustTrail() {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const particleId = useRef(0);
  const frameRef = useRef<number | null>(null);

  // Handle client-side only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Spawn particle at cursor position
  const spawnParticle = useCallback(
    (x: number, y: number, vx: number, vy: number) => {
      const newParticle: Particle = {
        id: particleId.current++,
        x,
        y,
        vx: vx * 0.3 + (Math.random() - 0.5) * 2, // Inherit some velocity + randomness
        vy: vy * 0.3 + (Math.random() - 0.5) * 2 - 1, // Slight upward bias
        size: 4 + Math.random() * 8,
        color:
          PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        rotation: Math.random() * 360,
        type: PARTICLE_TYPES[Math.floor(Math.random() * PARTICLE_TYPES.length)],
        lifetime: 800 + Math.random() * 400, // 0.8-1.2 seconds
      };

      setParticles((prev) => [...prev.slice(-30), newParticle]); // Keep max 30 particles

      // Remove particle after lifetime
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, newParticle.lifetime);
    },
    [],
  );

  // Handle mouse movement
  useEffect(() => {
    if (reducedMotion || !isClient) return;

    let spawnCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime.current;

      // Calculate velocity
      const vx = (e.clientX - lastPosition.current.x) / Math.max(dt, 1);
      const vy = (e.clientY - lastPosition.current.y) / Math.max(dt, 1);

      // Only spawn particles if moving fast enough
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed > 0.1) {
        spawnCounter++;
        // Spawn every 3rd frame for performance, more often when moving fast
        if (spawnCounter % (speed > 0.5 ? 2 : 3) === 0) {
          spawnParticle(e.clientX, e.clientY, vx, vy);
        }
      }

      lastPosition.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
    };

    // Also spawn particles on click for extra magic
    const handleClick = (e: MouseEvent) => {
      // Burst of particles on click
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const speed = 3 + Math.random() * 2;
        setTimeout(() => {
          spawnParticle(
            e.clientX,
            e.clientY,
            Math.cos(angle) * speed,
            Math.sin(angle) * speed,
          );
        }, i * 30);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [reducedMotion, isClient, spawnParticle]);

  // Animate particles with physics
  useEffect(() => {
    if (reducedMotion || particles.length === 0) return;

    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.98, // Friction
          vy: p.vy * 0.98 - 0.1, // Friction + gravity (upward because we want sparkles to float up)
          rotation: p.rotation + (p.vx > 0 ? 3 : -3), // Rotate based on direction
        })),
      );

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion, particles.length > 0]);

  if (!isClient || reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            }}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PixieParticle
              type={particle.type}
              size={particle.size}
              color={particle.color}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual particle component
function PixieParticle({
  type,
  size,
  color,
}: {
  type: Particle["type"];
  size: number;
  color: string;
}) {
  const glowStyle = {
    filter: `drop-shadow(0 0 ${size / 2}px ${color})`,
  };

  if (type === "sparkle") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={glowStyle}
      >
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
      </svg>
    );
  }

  if (type === "star") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={glowStyle}
      >
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        style={glowStyle}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }

  // Circle
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
    />
  );
}

export default PixieDustTrail;
