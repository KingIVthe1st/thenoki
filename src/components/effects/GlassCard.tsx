"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { useElementMousePosition } from "@/hooks/useMousePosition";
import { springs } from "@/lib/spring-configs";

type GlassVariant = "default" | "frosted" | "crystal" | "aurora" | "solid";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: GlassVariant;
  hover3D?: boolean;
  glowOnHover?: boolean;
  children: React.ReactNode;
}

// ============================================
// CHROME FLICKER FIX: Separated glass styles
// ============================================
// backdrop-filter is now applied to a SEPARATE static layer
// The animated 3D transform is on the outer container only
// This prevents Chromium's texture rasterization desync

const glassBackgrounds: Record<GlassVariant, React.CSSProperties> = {
  default: {
    background: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  },
  frosted: {
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  },
  crystal: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  },
  aurora: {
    background: `linear-gradient(
      135deg,
      rgba(168, 85, 247, 0.15) 0%,
      rgba(236, 72, 153, 0.1) 50%,
      rgba(139, 92, 246, 0.15) 100%
    )`,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  },
  solid: {
    background: "rgba(255, 255, 255, 0.9)",
  },
};

const glassBorders: Record<GlassVariant, React.CSSProperties> = {
  default: {
    border: "1px solid rgba(255, 255, 255, 0.7)",
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 4px 6px -1px rgba(45, 27, 78, 0.05),
      0 10px 15px -3px rgba(45, 27, 78, 0.08),
      0 20px 40px -10px rgba(45, 27, 78, 0.1)
    `,
  },
  frosted: {
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow: `
      0 8px 32px rgba(45, 27, 78, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.5)
    `,
  },
  crystal: {
    border: "1px solid rgba(255, 255, 255, 0.6)",
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 20px 40px rgba(45, 27, 78, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8),
      inset 0 -1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
  aurora: {
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 20px 60px rgba(168, 85, 247, 0.15)",
  },
  solid: {
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: `
      0 4px 6px -1px rgba(45, 27, 78, 0.05),
      0 10px 15px -3px rgba(45, 27, 78, 0.08)
    `,
  },
};

export function GlassCard({
  variant = "default",
  hover3D = false,
  glowOnHover = false,
  children,
  className = "",
  style,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mousePosition = useElementMousePosition(ref);

  // Calculate 3D transform based on mouse position
  const rotateX =
    hover3D && mousePosition.isInside ? (mousePosition.y - 0.5) * 12 : 0;
  const rotateY =
    hover3D && mousePosition.isInside ? (mousePosition.x - 0.5) * -12 : 0;

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-3xl overflow-hidden ${className}`}
      style={{
        // CHROME FIX: Only borders/shadows on animated container - NO backdrop-filter
        ...glassBorders[variant],
        ...style,
        transformStyle: hover3D ? "preserve-3d" : undefined,
        perspective: hover3D ? 1000 : undefined,
        // GPU optimization for the animated container
        isolation: "isolate",
        contain: "layout paint style",
        willChange: hover3D ? "transform" : "auto",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        // Sub-pixel rendering fix for Chrome
        transform: "translateZ(0)",
        WebkitFontSmoothing: "subpixel-antialiased",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={springs.smooth}
      {...props}
    >
      {/* CHROME FIX: Separate static layer for backdrop-filter */}
      {/* This layer does NOT animate - it's purely for the glass effect */}
      <div
        className="absolute inset-0 rounded-3xl -z-10"
        style={{
          ...glassBackgrounds[variant],
          // Force this layer to be stable - moves 1px closer to camera
          // to prevent z-fighting with background
          transform: "translateZ(1px)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />

      {/* Inner shine gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)",
          borderRadius: "inherit",
        }}
      />

      {/* Glow effect layer - uses opacity animation instead of boxShadow */}
      {glowOnHover && (
        <div
          className="absolute -inset-2 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25) 0%, transparent 70%)",
            filter: "blur(20px)",
            zIndex: -2,
          }}
        />
      )}

      {/* Shine effect on hover */}
      {hover3D && mousePosition.isInside && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
              rgba(255, 255, 255, 0.25) 0%,
              transparent 50%
            )`,
            borderRadius: "inherit",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default GlassCard;
