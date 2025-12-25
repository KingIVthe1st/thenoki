"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// LIVING AIR - Animated Noise Overlay
// ============================================
// Creates organic "breathing" atmosphere
// Uses CSS animation steps for film grain effect
// Very low opacity (0.03) - subtle but impactful
// PERFORMANCE: Uses background-position animation (GPU)

export function LivingAir() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 50,
        mixBlendMode: "overlay",
        opacity: 0.035,
      }}
    >
      {/* Noise layer with stepped animation */}
      <div
        className="absolute"
        style={{
          // Oversized to allow movement without edges showing
          width: "200%",
          height: "200%",
          top: "-50%",
          left: "-50%",
          // SVG noise pattern inline for consistency
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          // CSS animation for grain movement
          animation: "noise-pan 0.15s steps(8) infinite",
        }}
      />
    </div>
  );
}

// ============================================
// AMBIENT DUST - Floating Particles
// ============================================
// Tiny floating dust motes for depth and atmosphere
// Uses CSS animation for performance

export function AmbientDust() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  // 20 dust particles with varied properties
  const dustParticles = Array.from({ length: 20 }, (_, i) => {
    const seed = i * 17 + 7;
    const rand1 = Math.sin(seed * 9999) * 10000;
    const rand2 = Math.sin((seed + 100) * 9999) * 10000;
    const rand3 = Math.sin((seed + 200) * 9999) * 10000;

    return {
      id: `dust-${i}`,
      left: `${(rand1 - Math.floor(rand1)) * 100}%`,
      top: `${(rand2 - Math.floor(rand2)) * 100}%`,
      size: 1 + (rand3 - Math.floor(rand3)) * 3, // 1-4px
      opacity: 0.2 + (rand1 - Math.floor(rand1)) * 0.3,
      duration: 15 + (rand2 - Math.floor(rand2)) * 20, // 15-35s
      delay: -(rand3 - Math.floor(rand3)) * 15,
    };
  });

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 15 }}
    >
      {dustParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            opacity: particle.opacity,
            filter: `blur(${particle.size * 0.3}px)`,
            animation: `dust-float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default LivingAir;
