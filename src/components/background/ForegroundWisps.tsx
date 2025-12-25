"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// FOREGROUND WISPS - The "Fog Sandwich" Layer
// ============================================
// This is the SECRET to Level 20 dreamscape:
// Clouds render BEHIND content + CONTENT + Wisps IN FRONT
// = You're floating INSIDE the cloud, not looking AT it
//
// These wisps render at z-index 25 (above content at z:15-20)
// but below the header (z:50+) and interactive elements

interface WispConfig {
  id: string;
  // Position
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  // Size
  width: string;
  height: string;
  // Visual
  gradients: Array<{
    cx: string;
    cy: string;
    rx: string;
    ry: string;
    color: string;
  }>;
  blur: number;
  opacity: number;
  // Animation
  animation: string;
  duration: number;
  delay: number;
}

// 12 ethereal wisps that float in front of content
const FOREGROUND_WISPS: WispConfig[] = [
  // Top wisps - floating above the fold
  {
    id: "wisp-top-1",
    top: "-5%",
    left: "10%",
    width: "60%",
    height: "25%",
    gradients: [
      {
        cx: "40%",
        cy: "70%",
        rx: "45%",
        ry: "40%",
        color: "rgba(255,255,255,0.35)",
      },
      {
        cx: "70%",
        cy: "50%",
        rx: "35%",
        ry: "30%",
        color: "rgba(252,231,243,0.25)",
      },
    ],
    blur: 45,
    opacity: 0.55,
    animation: "wisp-drift",
    duration: 40,
    delay: 0,
  },
  {
    id: "wisp-top-2",
    top: "0%",
    right: "5%",
    width: "50%",
    height: "22%",
    gradients: [
      {
        cx: "55%",
        cy: "65%",
        rx: "40%",
        ry: "35%",
        color: "rgba(221,214,254,0.32)",
      },
      {
        cx: "30%",
        cy: "50%",
        rx: "30%",
        ry: "28%",
        color: "rgba(255,255,255,0.28)",
      },
    ],
    blur: 42,
    opacity: 0.5,
    animation: "wisp-breathe",
    duration: 35,
    delay: -15,
  },

  // Side wisps - create depth at edges
  {
    id: "wisp-left-1",
    top: "25%",
    left: "-8%",
    width: "35%",
    height: "40%",
    gradients: [
      {
        cx: "70%",
        cy: "50%",
        rx: "50%",
        ry: "45%",
        color: "rgba(255,255,255,0.38)",
      },
      {
        cx: "50%",
        cy: "40%",
        rx: "35%",
        ry: "30%",
        color: "rgba(251,207,232,0.28)",
      },
    ],
    blur: 50,
    opacity: 0.52,
    animation: "wisp-drift",
    duration: 45,
    delay: -8,
  },
  {
    id: "wisp-right-1",
    top: "30%",
    right: "-10%",
    width: "38%",
    height: "35%",
    gradients: [
      {
        cx: "30%",
        cy: "50%",
        rx: "48%",
        ry: "42%",
        color: "rgba(221,214,254,0.35)",
      },
      {
        cx: "50%",
        cy: "60%",
        rx: "32%",
        ry: "28%",
        color: "rgba(255,255,255,0.25)",
      },
    ],
    blur: 48,
    opacity: 0.48,
    animation: "wisp-breathe",
    duration: 42,
    delay: -20,
  },

  // Mid-section wisps - subtle overlay on main content
  {
    id: "wisp-mid-1",
    top: "40%",
    left: "20%",
    width: "45%",
    height: "28%",
    gradients: [
      {
        cx: "50%",
        cy: "50%",
        rx: "42%",
        ry: "38%",
        color: "rgba(255,255,255,0.25)",
      },
    ],
    blur: 55,
    opacity: 0.35,
    animation: "wisp-drift",
    duration: 50,
    delay: -12,
  },
  {
    id: "wisp-mid-2",
    top: "45%",
    right: "15%",
    width: "40%",
    height: "25%",
    gradients: [
      {
        cx: "45%",
        cy: "55%",
        rx: "38%",
        ry: "34%",
        color: "rgba(252,231,243,0.22)",
      },
    ],
    blur: 52,
    opacity: 0.32,
    animation: "wisp-breathe",
    duration: 48,
    delay: -25,
  },

  // Bottom wisps - ground fog effect
  {
    id: "wisp-bottom-1",
    bottom: "-8%",
    left: "-5%",
    width: "70%",
    height: "35%",
    gradients: [
      {
        cx: "45%",
        cy: "30%",
        rx: "50%",
        ry: "45%",
        color: "rgba(255,255,255,0.42)",
      },
      {
        cx: "70%",
        cy: "40%",
        rx: "38%",
        ry: "32%",
        color: "rgba(251,207,232,0.32)",
      },
      {
        cx: "25%",
        cy: "35%",
        rx: "32%",
        ry: "28%",
        color: "rgba(221,214,254,0.25)",
      },
    ],
    blur: 55,
    opacity: 0.58,
    animation: "wisp-drift",
    duration: 38,
    delay: -5,
  },
  {
    id: "wisp-bottom-2",
    bottom: "-10%",
    right: "0%",
    width: "65%",
    height: "32%",
    gradients: [
      {
        cx: "35%",
        cy: "35%",
        rx: "48%",
        ry: "42%",
        color: "rgba(252,231,243,0.38)",
      },
      {
        cx: "60%",
        cy: "28%",
        rx: "35%",
        ry: "30%",
        color: "rgba(255,255,255,0.3)",
      },
    ],
    blur: 52,
    opacity: 0.55,
    animation: "wisp-breathe",
    duration: 36,
    delay: -18,
  },
  {
    id: "wisp-bottom-3",
    bottom: "-5%",
    left: "30%",
    width: "50%",
    height: "28%",
    gradients: [
      {
        cx: "50%",
        cy: "40%",
        rx: "42%",
        ry: "36%",
        color: "rgba(221,214,254,0.35)",
      },
    ],
    blur: 48,
    opacity: 0.5,
    animation: "wisp-drift",
    duration: 42,
    delay: -28,
  },

  // Corner accents - extra depth
  {
    id: "wisp-corner-1",
    top: "15%",
    left: "60%",
    width: "30%",
    height: "20%",
    gradients: [
      {
        cx: "50%",
        cy: "50%",
        rx: "38%",
        ry: "34%",
        color: "rgba(167,139,250,0.22)",
      },
    ],
    blur: 45,
    opacity: 0.38,
    animation: "wisp-breathe",
    duration: 32,
    delay: -10,
  },
  {
    id: "wisp-corner-2",
    bottom: "20%",
    left: "5%",
    width: "28%",
    height: "22%",
    gradients: [
      {
        cx: "55%",
        cy: "45%",
        rx: "35%",
        ry: "30%",
        color: "rgba(56,189,248,0.18)",
      },
    ],
    blur: 42,
    opacity: 0.35,
    animation: "wisp-drift",
    duration: 30,
    delay: -22,
  },
];

export function ForegroundWisps() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 25 }}
    >
      {FOREGROUND_WISPS.map((wisp) => {
        // Build compound radial gradients with pre-softened edges (no filter blur needed)
        // Technique: Extend gradient to 150% size and use softer color stops
        const gradientBg = wisp.gradients
          .map((g) => {
            // Parse color and create softer gradient stops
            return `radial-gradient(ellipse ${g.rx} ${g.ry} at ${g.cx} ${g.cy}, ${g.color} 0%, ${g.color.replace(/[\d.]+\)$/, "0.5)")} 30%, ${g.color.replace(/[\d.]+\)$/, "0.1)")} 70%, transparent 100%)`;
          })
          .join(", ");

        return (
          <div
            key={wisp.id}
            className="absolute"
            style={{
              top: wisp.top,
              bottom: wisp.bottom,
              left: wisp.left,
              right: wisp.right,
              // Scale up to compensate for no blur (was blur: 45-55px)
              width: `calc(${wisp.width} * 1.5)`,
              height: `calc(${wisp.height} * 1.5)`,
              background: gradientBg,
              // NO filter: blur() - GPU thrashing fix!
              opacity: wisp.opacity * 0.8, // Slightly reduce since gradients are softer
              // GPU optimization - only transform + opacity animate
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              // Mix blend for light interaction
              mixBlendMode: "screen",
              // Animation (only transform + opacity = GPU composited)
              animation: `${wisp.animation} ${wisp.duration}s ease-in-out infinite`,
              animationDelay: `${wisp.delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default ForegroundWisps;
