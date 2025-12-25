"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// CLOUDSCAPE - Pure CSS Gradient Cloud System
// ============================================
// PERFORMANCE FIX: Uses CSS radial gradients instead of images
// - True transparency (no JPEG artifacts)
// - No image loading required
// - GPU-accelerated compositing
// - Smooth CSS animations on compositor thread

interface CloudConfig {
  // Position
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  // Size
  width: string;
  height: string;
  // Appearance
  colors: string[]; // Gradient color stops
  blur: number;
  opacity: number;
  // Animation
  animation: string;
  duration: number;
  delay: number;
}

// 12 CSS gradient clouds for rich atmospheric depth
const CLOUD_CONFIGS: CloudConfig[] = [
  // ═══════════════════════════════════════════
  // DISTANT LAYER (z: 3) - Very soft, low opacity
  // ═══════════════════════════════════════════
  {
    top: "-10%",
    left: "-5%",
    width: "80%",
    height: "50%",
    colors: ["rgba(255,255,255,0.4)", "rgba(251,207,232,0.2)", "transparent"],
    blur: 80,
    opacity: 0.6,
    animation: "cloud-drift-slow",
    duration: 90,
    delay: -20,
  },
  {
    top: "5%",
    right: "-10%",
    width: "70%",
    height: "45%",
    colors: ["rgba(221,214,254,0.35)", "rgba(196,181,253,0.15)", "transparent"],
    blur: 70,
    opacity: 0.55,
    animation: "cloud-float-organic",
    duration: 80,
    delay: -35,
  },
  // ═══════════════════════════════════════════
  // MID-DISTANT LAYER (z: 4) - Building depth
  // ═══════════════════════════════════════════
  {
    top: "15%",
    left: "10%",
    width: "65%",
    height: "40%",
    colors: ["rgba(255,255,255,0.5)", "rgba(252,231,243,0.25)", "transparent"],
    blur: 60,
    opacity: 0.65,
    animation: "cloud-breathe",
    duration: 70,
    delay: -10,
  },
  {
    top: "20%",
    right: "5%",
    width: "55%",
    height: "35%",
    colors: ["rgba(251,207,232,0.45)", "rgba(244,114,182,0.2)", "transparent"],
    blur: 55,
    opacity: 0.6,
    animation: "cloud-drift-slow",
    duration: 65,
    delay: -25,
  },
  // ═══════════════════════════════════════════
  // MID-FIELD LAYER (z: 5) - Main cloud presence
  // ═══════════════════════════════════════════
  {
    top: "30%",
    left: "-5%",
    width: "60%",
    height: "45%",
    colors: ["rgba(255,255,255,0.6)", "rgba(255,255,255,0.3)", "transparent"],
    blur: 45,
    opacity: 0.75,
    animation: "cloud-float-organic",
    duration: 55,
    delay: -15,
  },
  {
    top: "35%",
    right: "-10%",
    width: "70%",
    height: "50%",
    colors: ["rgba(252,231,243,0.55)", "rgba(251,207,232,0.25)", "transparent"],
    blur: 50,
    opacity: 0.7,
    animation: "cloud-breathe",
    duration: 60,
    delay: -30,
  },
  {
    top: "25%",
    left: "30%",
    width: "50%",
    height: "35%",
    colors: ["rgba(221,214,254,0.5)", "rgba(196,181,253,0.2)", "transparent"],
    blur: 40,
    opacity: 0.65,
    animation: "cloud-drift-slow",
    duration: 50,
    delay: -5,
  },
  // ═══════════════════════════════════════════
  // NEAR LAYER (z: 6) - Prominent, sharper
  // ═══════════════════════════════════════════
  {
    bottom: "10%",
    left: "-15%",
    width: "80%",
    height: "55%",
    colors: [
      "rgba(255,255,255,0.7)",
      "rgba(252,231,243,0.4)",
      "rgba(251,207,232,0.15)",
      "transparent",
    ],
    blur: 35,
    opacity: 0.85,
    animation: "cloud-float-organic",
    duration: 45,
    delay: -20,
  },
  {
    bottom: "15%",
    right: "-10%",
    width: "75%",
    height: "50%",
    colors: ["rgba(251,207,232,0.65)", "rgba(244,114,182,0.3)", "transparent"],
    blur: 40,
    opacity: 0.8,
    animation: "cloud-breathe",
    duration: 50,
    delay: -10,
  },
  // ═══════════════════════════════════════════
  // FOREGROUND WISPS (z: 7) - Ethereal detail
  // ═══════════════════════════════════════════
  {
    bottom: "5%",
    left: "20%",
    width: "60%",
    height: "40%",
    colors: ["rgba(255,255,255,0.55)", "rgba(255,255,255,0.2)", "transparent"],
    blur: 30,
    opacity: 0.75,
    animation: "cloud-drift-slow",
    duration: 40,
    delay: -25,
  },
  {
    bottom: "0%",
    right: "15%",
    width: "50%",
    height: "35%",
    colors: ["rgba(252,231,243,0.5)", "rgba(251,207,232,0.2)", "transparent"],
    blur: 25,
    opacity: 0.7,
    animation: "cloud-float-organic",
    duration: 35,
    delay: -15,
  },
  // ═══════════════════════════════════════════
  // ACCENT GLOW - Magical atmosphere
  // ═══════════════════════════════════════════
  {
    top: "40%",
    left: "35%",
    width: "40%",
    height: "30%",
    colors: ["rgba(56,189,248,0.25)", "rgba(139,92,246,0.1)", "transparent"],
    blur: 50,
    opacity: 0.5,
    animation: "cloud-breathe",
    duration: 30,
    delay: -8,
  },
];

export function CloudScape() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 3 }}
    >
      {CLOUD_CONFIGS.map((cloud, index) => (
        <CSSCloud
          key={index}
          config={cloud}
          zIndex={3 + Math.floor(index / 3) * 0.5}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Extra ambient glow layer for ethereal feel */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 120% 80% at 50% 60%,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(251, 207, 232, 0.15) 30%,
            transparent 60%
          )`,
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}

// Individual CSS gradient cloud
function CSSCloud({
  config,
  zIndex,
  reducedMotion,
}: {
  config: CloudConfig;
  zIndex: number;
  reducedMotion: boolean;
}) {
  // Build radial gradient from color stops
  const gradientStops = config.colors
    .map((color, i) => {
      const percent = (i / (config.colors.length - 1)) * 100;
      return `${color} ${percent}%`;
    })
    .join(", ");

  return (
    <div
      className="absolute"
      style={{
        top: config.top,
        left: config.left,
        bottom: config.bottom,
        right: config.right,
        width: config.width,
        height: config.height,
        zIndex,
        opacity: config.opacity,
        // Radial gradient creates the cloud shape
        background: `radial-gradient(ellipse at center, ${gradientStops})`,
        filter: `blur(${config.blur}px)`,
        // GPU optimization
        willChange: reducedMotion ? "auto" : "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
        // CSS animation
        animation: reducedMotion
          ? "none"
          : `${config.animation} ${config.duration}s ease-in-out infinite`,
        animationDelay: `${config.delay}s`,
        animationFillMode: "both",
      }}
    />
  );
}

// ============================================
// AMBIENT MIST - Soft rolling mist (CSS-only)
// ============================================
export function AmbientMist() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 6 }}>
      {/* Bottom mist layer */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          right: "-10%",
          height: "50%",
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 40%,
            rgba(251, 207, 232, 0.2) 70%,
            rgba(255, 255, 255, 0.25) 100%
          )`,
          filter: "blur(40px)",
          borderRadius: "50% 50% 0 0",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          animation: "mist-pulse 60s ease-in-out infinite",
          animationDelay: "-15s",
        }}
      />

      {/* Upper ethereal mist */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "-5%",
          right: "-5%",
          height: "35%",
          background: `linear-gradient(
            90deg,
            transparent 0%,
            rgba(221, 214, 254, 0.12) 30%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(221, 214, 254, 0.12) 70%,
            transparent 100%
          )`,
          filter: "blur(50px)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          animation: "mist-drift 70s ease-in-out infinite",
          animationDelay: "-25s",
        }}
      />
    </div>
  );
}

export default CloudScape;
