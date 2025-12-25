"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// BOKEH LIGHTS - Cinematic Depth-of-Field Effect
// ============================================
// 18 large soft glowing circles create the dreamy
// out-of-focus lights you see in premium photography.
// This adds the "expensive camera" feel to the dreamscape.

interface BokehConfig {
  id: string;
  // Position (viewport %)
  left: number;
  top: number;
  // Size (larger = more prominent)
  size: number;
  // Visual properties
  color: string;
  opacity: number;
  blur: number;
  // Animation
  animation: string;
  duration: number;
  delay: number;
}

// PERFORMANCE OPTIMIZED: 12 bokeh lights (was 18)
// Reduced by 33% - bokeh is subtle, viewers won't notice fewer lights
// Kept the most impactful positions for visual balance
const BOKEH_LIGHTS: BokehConfig[] = [
  // Large statement bokeh - these anchor the effect
  {
    id: "bokeh-1",
    left: 15,
    top: 20,
    size: 180,
    color: "rgba(255, 255, 255, 0.18)",
    opacity: 0.8,
    blur: 60,
    animation: "bokeh-float",
    duration: 25,
    delay: 0,
  },
  {
    id: "bokeh-2",
    left: 78,
    top: 35,
    size: 200,
    color: "rgba(251, 207, 232, 0.22)",
    opacity: 0.75,
    blur: 70,
    animation: "bokeh-pulse",
    duration: 30,
    delay: -10,
  },
  {
    id: "bokeh-3",
    left: 45,
    top: 65,
    size: 160,
    color: "rgba(221, 214, 254, 0.2)",
    opacity: 0.7,
    blur: 55,
    animation: "bokeh-float",
    duration: 28,
    delay: -5,
  },

  // Medium bokeh - fills in the gaps
  {
    id: "bokeh-4",
    left: 8,
    top: 55,
    size: 120,
    color: "rgba(196, 181, 253, 0.18)",
    opacity: 0.65,
    blur: 45,
    animation: "bokeh-pulse",
    duration: 22,
    delay: -8,
  },
  {
    id: "bokeh-5",
    left: 88,
    top: 15,
    size: 140,
    color: "rgba(255, 255, 255, 0.16)",
    opacity: 0.7,
    blur: 50,
    animation: "bokeh-float",
    duration: 26,
    delay: -12,
  },
  {
    id: "bokeh-6",
    left: 55,
    top: 25,
    size: 130,
    color: "rgba(252, 231, 243, 0.18)",
    opacity: 0.68,
    blur: 48,
    animation: "bokeh-pulse",
    duration: 24,
    delay: -3,
  },
  {
    id: "bokeh-7",
    left: 25,
    top: 75,
    size: 150,
    color: "rgba(167, 139, 250, 0.15)",
    opacity: 0.62,
    blur: 52,
    animation: "bokeh-float",
    duration: 27,
    delay: -15,
  },
  {
    id: "bokeh-8",
    left: 70,
    top: 80,
    size: 110,
    color: "rgba(255, 255, 255, 0.2)",
    opacity: 0.72,
    blur: 42,
    animation: "bokeh-pulse",
    duration: 20,
    delay: -7,
  },

  // Small accent bokeh - subtle sparkle points (reduced set)
  {
    id: "bokeh-9",
    left: 35,
    top: 40,
    size: 80,
    color: "rgba(56, 189, 248, 0.15)",
    opacity: 0.55,
    blur: 35,
    animation: "bokeh-float",
    duration: 18,
    delay: -2,
  },
  {
    id: "bokeh-10",
    left: 5,
    top: 30,
    size: 100,
    color: "rgba(221, 214, 254, 0.16)",
    opacity: 0.6,
    blur: 40,
    animation: "bokeh-float",
    duration: 21,
    delay: -14,
  },
  {
    id: "bokeh-11",
    left: 62,
    top: 50,
    size: 85,
    color: "rgba(255, 255, 255, 0.17)",
    opacity: 0.56,
    blur: 36,
    animation: "bokeh-pulse",
    duration: 17,
    delay: -6,
  },
  {
    id: "bokeh-12",
    left: 50,
    top: 92,
    size: 105,
    color: "rgba(255, 255, 255, 0.18)",
    opacity: 0.62,
    blur: 42,
    animation: "bokeh-pulse",
    duration: 20,
    delay: -13,
  },
];

export function BokehLights() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 11,
        // PERFORMANCE: Single willChange on container, not individual elements
        willChange: "transform",
        // Chrome sub-pixel rendering fix
        transform: "translateZ(0) rotate(0.01deg)",
        backfaceVisibility: "hidden",
      }}
    >
      {BOKEH_LIGHTS.map((bokeh) => {
        // Scale up size to compensate for no blur (was blur: 35-70px)
        // Larger element with softer gradient = same visual effect without GPU filter
        const scaledSize = bokeh.size + bokeh.blur * 2;

        return (
          <div
            key={bokeh.id}
            className="absolute rounded-full"
            style={{
              left: `${bokeh.left}%`,
              top: `${bokeh.top}%`,
              width: scaledSize,
              height: scaledSize,
              // Ultra-soft multi-layered radial gradient (no filter blur needed)
              background: `radial-gradient(
                circle at center,
                ${bokeh.color} 0%,
                ${bokeh.color.replace(/[\d.]+\)$/, "0.12)")} 25%,
                ${bokeh.color.replace(/[\d.]+\)$/, "0.05)")} 50%,
                ${bokeh.color.replace(/[\d.]+\)$/, "0.02)")} 70%,
                transparent 85%
              )`,
              // NO filter: blur() - GPU thrashing fix!
              opacity: bokeh.opacity,
              // Center the element + Chrome sub-pixel fix
              transform: "translate(-50%, -50%) translateZ(0)",
              backfaceVisibility: "hidden",
              // Animation (only transform + opacity = GPU composited)
              animation: `${bokeh.animation} ${bokeh.duration}s ease-in-out infinite`,
              animationDelay: `${bokeh.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default BokehLights;
