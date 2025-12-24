"use client";

import { motion, HTMLMotionProps, useAnimationControls } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { useMagneticEffect } from "@/hooks/useMousePosition";
import { useAudioOptional } from "@/components/audio/AudioEngine";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// JELLY BUTTON - Premium Squish Physics
// ============================================
// Button with satisfying jelly-like deformation:
// - Hover: subtle horizontal stretch
// - Press: vertical squish compression
// - Release: spring overshoot bounce
// - Magnetic pull toward cursor

type JellyVariant = "primary" | "secondary" | "pink" | "ghost" | "cyan";

interface JellyButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: JellyVariant;
  magneticStrength?: number;
  jellyIntensity?: number; // 0-1, how much squish
  children: React.ReactNode;
}

// Variant styles - Enhanced with premium multi-layer shadows
const variantStyles: Record<JellyVariant, string> = {
  primary: `
    bg-gradient-to-r from-violet-600 to-purple-700
    text-white font-semibold
    shadow-[0_4px_12px_rgba(139,92,246,0.4),0_8px_24px_rgba(139,92,246,0.25),0_16px_48px_rgba(139,92,246,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
  `,
  secondary: `
    bg-white/90 text-purple-900
    border-2 border-purple-200/80
    shadow-[0_4px_12px_rgba(139,92,246,0.1),0_8px_24px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]
    backdrop-blur-sm
  `,
  pink: `
    bg-gradient-to-r from-pink-500 to-rose-500
    text-white font-semibold
    shadow-[0_4px_12px_rgba(236,72,153,0.4),0_8px_24px_rgba(236,72,153,0.25),0_16px_48px_rgba(236,72,153,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
  `,
  ghost: `
    bg-white/40 backdrop-blur-md
    text-purple-900 font-medium
    border border-white/60
    shadow-[0_4px_12px_rgba(255,255,255,0.1),0_8px_16px_rgba(139,92,246,0.05),inset_0_1px_0_rgba(255,255,255,0.8)]
  `,
  cyan: `
    bg-gradient-to-r from-cyan-400 to-teal-500
    text-white font-semibold
    shadow-[0_4px_12px_rgba(0,245,255,0.4),0_8px_24px_rgba(0,245,255,0.25),0_16px_48px_rgba(0,245,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
  `,
};

// Glow colors for hover
const glowColors: Record<JellyVariant, string> = {
  primary: "rgba(139, 92, 246, 0.5)",
  secondary: "rgba(139, 92, 246, 0.2)",
  pink: "rgba(236, 72, 153, 0.5)",
  ghost: "rgba(255, 255, 255, 0.4)",
  cyan: "rgba(0, 245, 255, 0.5)",
};

// Spring configs for jelly physics
const jellySpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 15, // Low damping = more bounce
  mass: 0.8,
};

const settleSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export function JellyButton({
  variant = "primary",
  magneticStrength = 0.3,
  jellyIntensity = 1,
  children,
  className = "",
  onClick,
  ...props
}: JellyButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const controls = useAnimationControls();
  const [isPressed, setIsPressed] = useState(false);
  const reducedMotion = useReducedMotion();
  const magneticOffset = useMagneticEffect(
    ref,
    reducedMotion ? 0 : magneticStrength,
  );
  const audio = useAudioOptional();

  // Calculate squish values based on intensity
  const hoverSquish = {
    scaleX: 1 + 0.03 * jellyIntensity,
    scaleY: 1 - 0.02 * jellyIntensity,
  };

  const pressSquish = {
    scaleX: 1 + 0.1 * jellyIntensity,
    scaleY: 1 - 0.15 * jellyIntensity,
  };

  // Handle press animation
  const handlePointerDown = useCallback(() => {
    setIsPressed(true);
    audio?.playClick();
    // Skip complex animations for reduced motion
    if (reducedMotion) return;
    controls.start({
      scaleX: pressSquish.scaleX,
      scaleY: pressSquish.scaleY,
      transition: { type: "spring", stiffness: 600, damping: 20 },
    });
  }, [controls, pressSquish.scaleX, pressSquish.scaleY, audio, reducedMotion]);

  // Handle release with overshoot bounce
  const handlePointerUp = useCallback(() => {
    setIsPressed(false);
    // Skip complex animations for reduced motion
    if (reducedMotion) return;
    // First overshoot
    controls
      .start({
        scaleX: 0.95,
        scaleY: 1.08,
        transition: { type: "spring", stiffness: 500, damping: 10 },
      })
      .then(() => {
        // Then settle back
        controls.start({
          scaleX: 1,
          scaleY: 1,
          transition: settleSpring,
        });
      });
  }, [controls, reducedMotion]);

  // Handle hover states
  const handleHoverStart = useCallback(() => {
    if (!isPressed) {
      audio?.playHover();
      // Skip complex animations for reduced motion
      if (reducedMotion) return;
      controls.start({
        scaleX: hoverSquish.scaleX,
        scaleY: hoverSquish.scaleY,
        transition: jellySpring,
      });
    }
  }, [
    controls,
    isPressed,
    hoverSquish.scaleX,
    hoverSquish.scaleY,
    audio,
    reducedMotion,
  ]);

  const handleHoverEnd = useCallback(() => {
    if (!isPressed) {
      // Skip complex animations for reduced motion
      if (reducedMotion) return;
      controls.start({
        scaleX: 1,
        scaleY: 1,
        transition: settleSpring,
      });
    }
  }, [controls, isPressed, reducedMotion]);

  // Combine click handler
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    },
    [onClick],
  );

  return (
    <motion.button
      ref={ref}
      className={`
        relative px-8 py-4 rounded-2xl
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
        cursor-pointer
        ${variantStyles[variant]}
        ${className}
      `}
      animate={controls}
      style={{
        x: magneticOffset.x,
        y: magneticOffset.y,
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => {
        if (isPressed) handlePointerUp();
        handleHoverEnd();
      }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={handleClick}
      whileHover={
        reducedMotion
          ? undefined
          : {
              boxShadow: `0 0 30px ${glowColors[variant]}, 0 0 60px ${glowColors[variant]}40`,
            }
      }
      {...props}
    >
      {/* Ripple effect on press - hidden for reduced motion */}
      {!reducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          initial={false}
        >
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={
              isPressed ? { scale: 2.5, opacity: 0 } : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.5 }}
            style={{ borderRadius: "50%", transformOrigin: "center" }}
          />
        </motion.span>
      )}

      {/* Shimmer effect - hidden for reduced motion */}
      {!reducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          initial={false}
        >
          <motion.span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
              transform: "translateX(-100%)",
            }}
            whileHover={{
              transform: "translateX(100%)",
              transition: { duration: 0.7, ease: "easeInOut" },
            }}
          />
        </motion.span>
      )}

      {/* Button content with subtle squish compensation */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        animate={isPressed && !reducedMotion ? { y: 2 } : { y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0.1 }
            : { type: "spring", stiffness: 400, damping: 20 }
        }
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

// Small variant for inline use
export function JellyButtonSmall({
  variant = "primary",
  jellyIntensity = 0.7,
  children,
  className = "",
  ...props
}: Omit<JellyButtonProps, "magneticStrength">) {
  return (
    <JellyButton
      variant={variant}
      jellyIntensity={jellyIntensity}
      magneticStrength={0.2}
      className={`!px-5 !py-2.5 !rounded-xl text-sm ${className}`}
      {...props}
    >
      {children}
    </JellyButton>
  );
}

// Icon variant
export function JellyIconButton({
  variant = "ghost",
  jellyIntensity = 0.8,
  children,
  className = "",
  ...props
}: Omit<JellyButtonProps, "magneticStrength">) {
  return (
    <JellyButton
      variant={variant}
      jellyIntensity={jellyIntensity}
      magneticStrength={0.4}
      className={`!p-3 !rounded-full ${className}`}
      {...props}
    >
      {children}
    </JellyButton>
  );
}

export default JellyButton;
