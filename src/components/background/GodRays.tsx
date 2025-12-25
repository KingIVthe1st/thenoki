"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// GOD RAYS - Volumetric Light Beams
// ============================================
// Premium technique: Rotating conic gradient
// ONLY uses transform: rotate (GPU accelerated)
// No filter animations = Chrome-safe
// mix-blend-mode: overlay creates light-like effect

export function GodRays() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 8,
        mixBlendMode: "overlay",
      }}
    >
      {/* Primary god rays - slow majestic rotation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 180, // 3 minutes per full rotation
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute will-change-transform"
        style={{
          top: "-80%",
          left: "-80%",
          width: "260%",
          height: "260%",
          // Conic gradient creates the "rays" effect
          background: `conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            rgba(255, 255, 255, 0.04) 8deg,
            transparent 16deg,
            rgba(251, 207, 232, 0.03) 32deg,
            transparent 48deg,
            rgba(255, 255, 255, 0.035) 64deg,
            transparent 80deg,
            rgba(221, 214, 254, 0.03) 96deg,
            transparent 112deg,
            rgba(255, 255, 255, 0.04) 128deg,
            transparent 144deg,
            rgba(167, 139, 250, 0.025) 160deg,
            transparent 176deg,
            rgba(255, 255, 255, 0.03) 192deg,
            transparent 208deg,
            rgba(251, 207, 232, 0.035) 224deg,
            transparent 240deg,
            rgba(255, 255, 255, 0.04) 256deg,
            transparent 272deg,
            rgba(221, 214, 254, 0.03) 288deg,
            transparent 304deg,
            rgba(255, 255, 255, 0.03) 320deg,
            transparent 336deg,
            rgba(147, 197, 253, 0.025) 352deg,
            transparent 360deg
          )`,
          // Chrome sub-pixel fix
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Secondary rays - opposite rotation for depth */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 240, // 4 minutes - slower for subtle layering
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute will-change-transform"
        style={{
          top: "-60%",
          left: "-60%",
          width: "220%",
          height: "220%",
          background: `conic-gradient(
            from 45deg at 50% 50%,
            transparent 0deg,
            rgba(255, 255, 255, 0.02) 15deg,
            transparent 30deg,
            rgba(251, 207, 232, 0.018) 60deg,
            transparent 90deg,
            rgba(255, 255, 255, 0.022) 120deg,
            transparent 150deg,
            rgba(221, 214, 254, 0.018) 180deg,
            transparent 210deg,
            rgba(255, 255, 255, 0.02) 240deg,
            transparent 270deg,
            rgba(167, 139, 250, 0.015) 300deg,
            transparent 330deg,
            rgba(255, 255, 255, 0.018) 360deg
          )`,
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Radial mask to fade rays toward edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 100% 80% at 50% 30%,
            transparent 0%,
            transparent 30%,
            rgba(10, 10, 30, 0.5) 70%,
            rgba(10, 10, 30, 0.9) 100%
          )`,
        }}
      />
    </div>
  );
}

export default GodRays;
