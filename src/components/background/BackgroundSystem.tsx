"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FluffyCloudscape } from "./FluffyCloud";
import { AmbientMist } from "./CloudScape";
import { SparkleField } from "./SparkleField";
import { BokehLights } from "./BokehLights";
import { MouseLantern } from "./MouseLantern";
import { GodRays } from "./GodRays";
import { LivingAir, AmbientDust } from "./LivingAir";

// ============================================
// BACKGROUND SYSTEM v4.0 - PREMIUM DREAMSCAPE
// ============================================
// ARCHITECTURE: Pure CSS + Framer Motion for GPU-composited, flicker-free animations
//
// PREMIUM FEATURES:
// - Mouse-following "Lantern" volumetric light (interactive)
// - Rotating God Rays (conic gradient, GPU-only)
// - Living Air noise grain (organic atmosphere)
// - Ambient dust particles (depth & atmosphere)
// - 28 layered fluffy clouds with HERO statement pieces
// - 12 cinematic bokeh lights for depth-of-field
// - 36 magical sparkle particles (hearts, stars, diamonds)
// - Enhanced light rays with cinematic glow
// - Depth-based atmospheric perspective
//
// LAYER STACK (z-index order):
// z:0  - Gradient Sky (static)
// z:1  - Light Rays (CSS animation)
// z:2  - Mouse Lantern (Framer Motion, BEHIND clouds for occlusion)
// z:3  - Aurora Mesh (CSS animation)
// z:4-6- Fluffy Clouds (CSS animation)
// z:7  - God Rays (rotating conic gradient)
// z:8  - Ambient Mist (CSS animation)
// z:9  - Sparkle Field (CSS animation)
// z:10 - Bokeh Lights (CSS animation)
// z:11 - Bloom Effects (CSS animation)
// z:12 - Fog Overlay (static)
// z:13 - Vignette (static)
// z:15 - Ambient Dust (CSS animation)
// z:50 - Living Air noise (CSS animation, mix-blend-mode)

export function BackgroundSystem() {
  return (
    <div
      id="background-system"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        // FALLBACK: Solid color in case layers fail to render
        backgroundColor: "#A78BFA",
        // GPU optimization for container
        isolation: "isolate",
        contain: "paint layout",
      }}
    >
      {/* z: 0 - Base gradient sky (STATIC - no animation needed) */}
      <GradientSky />

      {/* z: 1 - Enhanced light rays (CSS-only animation) */}
      <LightRays />

      {/* z: 2 - PREMIUM: Mouse-following "Lantern" volumetric light */}
      {/* BEHIND clouds for occlusion effect - creates pseudo-3D depth */}
      <MouseLantern />

      {/* z: 3 - Aurora gradient mesh (CSS-only animation) */}
      <AuroraMesh />

      {/* z: 4-6 - DREAMSCAPE: 28 layered fluffy clouds */}
      <FluffyCloudscape />

      {/* z: 8 - PREMIUM: Rotating God Rays (GPU-only conic gradient) */}
      <GodRays />

      {/* z: 9 - Ambient mist (CSS-only) */}
      <AmbientMist />

      {/* z: 10 - Magical sparkle particles */}
      <SparkleField />

      {/* z: 11 - Cinematic bokeh lights (depth-of-field) */}
      <BokehLights />

      {/* z: 11 - Bloom glow effects (CSS-only) */}
      <BloomEffects />

      {/* z: 12 - Soft fog overlay (STATIC) */}
      <FogOverlay />

      {/* z: 13 - Cinematic vignette (STATIC) */}
      <VignetteOverlay />

      {/* z: 15 - PREMIUM: Ambient dust particles */}
      <AmbientDust />

      {/* z: 50 - PREMIUM: Living Air noise overlay */}
      {/* Very subtle (3.5% opacity) but adds organic "breathing" feel */}
      <LivingAir />
    </div>
  );
}

// ============================================
// GRADIENT SKY - Base layer (STATIC)
// ============================================
function GradientSky() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 0,
        minWidth: "100vw",
        minHeight: "100vh",
        background: `linear-gradient(
          165deg,
          #7C3AED 0%,
          #8B5CF6 5%,
          #A78BFA 12%,
          #C4B5FD 22%,
          #DDD6FE 35%,
          #EDE9FE 48%,
          #F5F3FF 58%,
          #FDF4FF 68%,
          #FDF2F8 78%,
          #FCE7F3 88%,
          #FBCFE8 100%
        )`,
        // GPU optimization
        willChange: "auto",
        backfaceVisibility: "hidden",
      }}
    />
  );
}

// ============================================
// LIGHT RAYS - Pure CSS animation
// ============================================
function LightRays() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0" style={{ zIndex: 1 }}>
      {/* Primary golden rays - NO filter blur, soft gradients built-in */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "5%",
          width: "90%",
          height: "130%",
          background: `
            conic-gradient(
              from 180deg at 50% 0%,
              transparent 0deg,
              rgba(255, 250, 230, 0.1) 8deg,
              rgba(255, 250, 230, 0.12) 10deg,
              rgba(255, 215, 157, 0.08) 20deg,
              rgba(255, 215, 157, 0.04) 28deg,
              transparent 35deg,
              transparent 55deg,
              rgba(255, 255, 255, 0.05) 62deg,
              rgba(255, 255, 255, 0.1) 70deg,
              rgba(255, 240, 220, 0.06) 85deg,
              rgba(255, 240, 220, 0.02) 95deg,
              transparent 100deg,
              transparent 115deg,
              rgba(255, 250, 240, 0.05) 122deg,
              rgba(255, 250, 240, 0.09) 130deg,
              rgba(255, 250, 240, 0.04) 140deg,
              transparent 145deg,
              transparent 180deg,
              rgba(255, 245, 235, 0.04) 188deg,
              rgba(255, 245, 235, 0.08) 195deg,
              rgba(255, 245, 235, 0.03) 205deg,
              transparent 210deg,
              transparent 230deg,
              rgba(255, 255, 255, 0.06) 238deg,
              rgba(255, 255, 255, 0.11) 245deg,
              rgba(255, 220, 180, 0.07) 260deg,
              rgba(255, 220, 180, 0.03) 272deg,
              transparent 280deg,
              transparent 300deg,
              rgba(255, 250, 230, 0.05) 307deg,
              rgba(255, 250, 230, 0.1) 315deg,
              rgba(255, 250, 230, 0.04) 328deg,
              transparent 335deg,
              transparent 360deg
            )
          `,
          // NO filter: blur() - GPU thrashing fix! Extra gradient stops create softness
          opacity: 0.7,
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "rays-pulse 25s ease-in-out infinite",
        }}
      />

      {/* Secondary pink rays - NO filter blur */}
      <div
        style={{
          position: "absolute",
          top: "-25%",
          left: "0%",
          width: "100%",
          height: "120%",
          background: `
            conic-gradient(
              from 200deg at 60% 10%,
              transparent 0deg,
              rgba(251, 207, 232, 0.04) 18deg,
              rgba(251, 207, 232, 0.08) 25deg,
              rgba(251, 207, 232, 0.04) 35deg,
              transparent 50deg,
              transparent 80deg,
              rgba(244, 114, 182, 0.03) 90deg,
              rgba(244, 114, 182, 0.06) 100deg,
              rgba(244, 114, 182, 0.03) 112deg,
              transparent 125deg,
              transparent 160deg,
              rgba(236, 72, 153, 0.02) 170deg,
              rgba(236, 72, 153, 0.05) 180deg,
              rgba(236, 72, 153, 0.02) 192deg,
              transparent 205deg,
              transparent 240deg,
              rgba(251, 207, 232, 0.03) 250deg,
              rgba(251, 207, 232, 0.07) 260deg,
              rgba(251, 207, 232, 0.03) 275deg,
              transparent 290deg,
              transparent 320deg,
              rgba(244, 114, 182, 0.03) 330deg,
              rgba(244, 114, 182, 0.06) 340deg,
              rgba(244, 114, 182, 0.03) 352deg,
              transparent 360deg
            )
          `,
          // NO filter: blur() - GPU thrashing fix!
          opacity: 0.6,
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "rays-pulse 30s ease-in-out infinite",
          animationDelay: "-10s",
        }}
      />

      {/* Central glow burst - NO filter blur, larger with softer gradient */}
      <div
        style={{
          position: "absolute",
          top: "-15%", // Extended
          left: "15%", // Extended
          width: "70%", // Larger
          height: "55%", // Larger
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 250, 240, 0.08) 20%, rgba(255, 250, 240, 0.04) 40%, transparent 60%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "glow-breathe 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ============================================
// AURORA MESH - Pure CSS animation
// ============================================
function AuroraMesh() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0" style={{ zIndex: 2 }}>
      {/* Primary purple aurora - top - NO filter blur, larger with softer gradient */}
      <div
        style={{
          position: "absolute",
          top: "-40%", // Extended for softness
          left: "-30%",
          width: "110%", // Much larger
          height: "100%",
          background:
            "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.12) 25%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "aurora-drift 35s ease-in-out infinite",
        }}
      />

      {/* Secondary pink aurora - bottom right - NO filter blur */}
      <div
        style={{
          position: "absolute",
          bottom: "-30%", // Extended
          right: "-35%",
          width: "100%", // Much larger
          height: "90%",
          background:
            "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.22) 0%, rgba(244, 114, 182, 0.1) 30%, rgba(244, 114, 182, 0.04) 55%, transparent 75%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "aurora-drift 40s ease-in-out infinite",
          animationDelay: "-15s",
        }}
      />

      {/* Cyan accent - center left - NO filter blur */}
      <div
        style={{
          position: "absolute",
          top: "15%", // Extended
          left: "-25%",
          width: "70%", // Larger
          height: "70%",
          background:
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0.05) 35%, transparent 60%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "glow-breathe 25s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      />

      {/* Lavender mist - center - NO filter blur */}
      <div
        style={{
          position: "absolute",
          top: "25%", // Extended
          left: "15%",
          width: "80%", // Larger
          height: "65%",
          background:
            "radial-gradient(ellipse at center, rgba(196, 181, 253, 0.15) 0%, rgba(221, 214, 254, 0.07) 35%, rgba(221, 214, 254, 0.02) 55%, transparent 70%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "aurora-drift 30s ease-in-out infinite",
          animationDelay: "-20s",
        }}
      />

      {/* Warm peach glow - bottom center - NO filter blur */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%", // Extended
          left: "5%",
          width: "90%", // Larger
          height: "55%",
          background:
            "radial-gradient(ellipse at bottom, rgba(251, 207, 232, 0.25) 0%, rgba(252, 231, 243, 0.12) 30%, rgba(252, 231, 243, 0.04) 55%, transparent 75%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: reducedMotion
            ? "none"
            : "glow-breathe 20s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />
    </div>
  );
}

// ============================================
// BLOOM EFFECTS - Pure CSS animation
// ============================================
function BloomEffects() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 11 }}
    >
      {/* Large pink bloom - bottom right - NO filter blur */}
      <div
        style={{
          position: "absolute",
          bottom: "0%", // Extended
          right: "5%",
          width: "45vw", // Larger
          height: "45vw",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.08) 25%, rgba(236,72,153,0.03) 50%, transparent 70%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: "bloom-pulse 18s ease-in-out infinite",
        }}
      />

      {/* Large purple bloom - top left - NO filter blur */}
      <div
        style={{
          position: "absolute",
          top: "-5%", // Extended
          left: "0%",
          width: "50vw", // Larger
          height: "50vw",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0.1) 25%, rgba(139,92,246,0.04) 50%, transparent 70%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: "bloom-pulse 22s ease-in-out infinite",
          animationDelay: "-8s",
        }}
      />

      {/* Medium cyan bloom - center - NO filter blur */}
      <div
        style={{
          position: "absolute",
          top: "30%", // Extended
          left: "35%",
          width: "40vw", // Larger
          height: "40vw",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0.05) 35%, transparent 60%)",
          // NO filter: blur() - GPU thrashing fix!
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
          animation: "bloom-pulse 20s ease-in-out infinite",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}

// ============================================
// FOG OVERLAY - Static atmospheric haze
// ============================================
function FogOverlay() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 12,
        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.12) 0%,
            transparent 20%,
            transparent 60%,
            rgba(251,207,232,0.08) 80%,
            rgba(221,214,254,0.1) 100%
          )
        `,
        pointerEvents: "none",
      }}
    />
  );
}

// ============================================
// VIGNETTE OVERLAY - Static cinematic depth
// ============================================
function VignetteOverlay() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 13,
        background: `radial-gradient(
          ellipse 80% 80% at 50% 50%,
          transparent 0%,
          transparent 50%,
          rgba(124, 58, 237, 0.08) 80%,
          rgba(91, 33, 182, 0.15) 100%
        )`,
      }}
    />
  );
}

export default BackgroundSystem;
