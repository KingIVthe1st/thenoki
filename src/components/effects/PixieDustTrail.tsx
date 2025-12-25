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
// NOTE: No filter effects - uses SVG gradients for glow to avoid GPU thrashing
function PixieParticle({
  type,
  size,
  color,
}: {
  type: Particle["type"];
  size: number;
  color: string;
}) {
  // Generate unique ID for SVG gradient definitions
  const gradientId = `glow-${type}-${size}`;

  if (type === "sparkle") {
    return (
      <svg
        width={size * 1.5}
        height={size * 1.5}
        viewBox="0 0 36 36"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="60%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Glow circle behind */}
        <circle cx="18" cy="18" r="12" fill={`url(#${gradientId})`} />
        {/* Sparkle shape */}
        <path
          d="M18 6L20 16L30 18L20 20L18 30L16 20L6 18L16 16L18 6Z"
          fill={color}
        />
      </svg>
    );
  }

  if (type === "star") {
    return (
      <svg
        width={size * 1.5}
        height={size * 1.5}
        viewBox="0 0 36 36"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="60%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Glow circle behind */}
        <circle cx="18" cy="18" r="12" fill={`url(#${gradientId})`} />
        {/* Star shape */}
        <path
          d="M18 8L20.5 15.5L28 18L20.5 20.5L18 28L15.5 20.5L8 18L15.5 15.5L18 8Z"
          fill={color}
        />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg
        width={size * 1.5}
        height={size * 1.5}
        viewBox="0 0 36 36"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="60%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Glow circle behind */}
        <circle cx="18" cy="18" r="12" fill={`url(#${gradientId})`} />
        {/* Heart shape - scaled and centered */}
        <path
          d="M18 27.35l-1.09-0.99C12.06 22.02 9 19.21 9 15.75 9 13.07 11.07 11 13.75 11c1.31 0 2.56.61 3.38 1.57C18.07 11.61 19.32 11 20.62 11 23.31 11 25.37 13.07 25.37 15.75c0 2.84-2.55 5.15-6.41 8.66L18 27.35z"
          fill={color}
        />
      </svg>
    );
  }

  // Circle - use radial gradient instead of boxShadow
  return (
    <svg
      width={size * 2}
      height={size * 2}
      viewBox="0 0 24 24"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="40%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill={`url(#${gradientId})`} />
    </svg>
  );
}

export default PixieDustTrail;
