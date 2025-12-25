"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// MOUSE LANTERN - Interactive Volumetric Light
// ============================================
// Creates a light source that follows the mouse behind clouds
// The clouds occlude the light, creating pseudo-3D volumetric depth
// Uses mix-blend-mode: screen for light-like behavior
// Smooth spring physics for dreamy, floating feel

export function MouseLantern() {
  const reducedMotion = useReducedMotion();

  // Raw mouse position
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  );

  // Smooth spring physics for dreamy, floating feel
  const smoothX = useSpring(mouseX, {
    stiffness: 30, // Low stiffness = slow follow
    damping: 25, // Moderate damping = smooth settle
    mass: 1.5, // Higher mass = more inertia
  });
  const smoothY = useSpring(mouseY, {
    stiffness: 30,
    damping: 25,
    mass: 1.5,
  });

  // Create subtle glow intensity based on movement speed
  const glowIntensity = useTransform([smoothX, smoothY], ([x, y]: number[]) => {
    // Base intensity with slight variation based on position
    return 0.4 + Math.sin((x + y) * 0.001) * 0.1;
  });

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, reducedMotion]);

  if (reducedMotion) {
    // Static centered glow for reduced motion
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: `radial-gradient(
            ellipse 80% 60% at 50% 40%,
            rgba(147, 197, 253, 0.25) 0%,
            rgba(167, 139, 250, 0.15) 30%,
            transparent 70%
          )`,
          mixBlendMode: "screen",
        }}
      />
    );
  }

  // CHROME FLICKER FIX: No blur on moving elements
  // Instead of filter:blur() which requires re-rasterization every frame,
  // use pre-softened radial gradients with many color stops
  // The gradients create the same soft glow effect without GPU blur overhead

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {/* Primary lantern - follows mouse */}
      {/* CHROME FIX: Removed filter:blur - using soft gradients instead */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          opacity: glowIntensity,
          // GPU layer hints
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="absolute w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        {/* Outer diffuse glow - NO BLUR, uses soft gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(147, 197, 253, 0.25) 0%,
              rgba(147, 197, 253, 0.2) 10%,
              rgba(167, 139, 250, 0.15) 20%,
              rgba(167, 139, 250, 0.1) 30%,
              rgba(236, 72, 153, 0.08) 40%,
              rgba(236, 72, 153, 0.04) 50%,
              rgba(236, 72, 153, 0.02) 60%,
              transparent 70%
            )`,
            mixBlendMode: "screen",
          }}
        />

        {/* Inner bright core - NO BLUR */}
        <div
          className="absolute inset-[20%] rounded-full"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.2) 0%,
              rgba(255, 255, 255, 0.12) 20%,
              rgba(251, 207, 232, 0.1) 40%,
              rgba(251, 207, 232, 0.05) 55%,
              transparent 70%
            )`,
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* Secondary ambient glow - slower follow for depth */}
      {/* CHROME FIX: Removed filter:blur - using soft gradients instead */}
      <motion.div
        style={{
          // Offset and delayed follow creates depth
          left: useSpring(mouseX, { stiffness: 15, damping: 30 }),
          top: useSpring(mouseY, { stiffness: 15, damping: 30 }),
          // GPU layer hints
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        className="absolute w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(
              ellipse 60% 50% at center,
              rgba(139, 92, 246, 0.12) 0%,
              rgba(139, 92, 246, 0.08) 15%,
              rgba(168, 85, 247, 0.05) 30%,
              rgba(168, 85, 247, 0.02) 45%,
              transparent 60%
            )`,
            mixBlendMode: "soft-light",
          }}
        />
      </motion.div>
    </div>
  );
}

export default MouseLantern;
