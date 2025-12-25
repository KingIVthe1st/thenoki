"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";

// ============================================
// EYE TRACKING NOKI COMPONENT
// ============================================
// Premium interactive character with eyes that follow cursor
// The cyan button eyes smoothly track user's mouse position
// with spring physics for organic, lifelike movement

interface EyeTrackingNokiProps {
  src: string;
  alt: string;
  className?: string;
  eyeSize?: number; // Size of eye tracking overlay
  eyeMaxOffset?: number; // Max pixels eyes can move
}

// Eye positions relative to image center (normalized -1 to 1)
// These values are tuned for the noki-hero.png image
const EYE_POSITIONS = {
  left: { x: -0.12, y: -0.15 },
  right: { x: 0.12, y: -0.15 },
};

interface EyeProps {
  baseX: number;
  baseY: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement>;
  maxOffset: number;
  side: "left" | "right";
}

function TrackingEye({
  baseX,
  baseY,
  mouseX,
  mouseY,
  containerRef,
  maxOffset,
  side,
}: EyeProps) {
  // Eye offset motion values
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  // Smooth springs for natural movement
  const springX = useSpring(offsetX, { damping: 30, stiffness: 200 });
  const springY = useSpring(offsetY, { damping: 30, stiffness: 200 });

  // Subscribe to mouse movement and update eye position
  useEffect(() => {
    const updateEyePosition = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerCenterX = rect.left + rect.width / 2;
      const containerCenterY = rect.top + rect.height / 2;

      // Eye center position
      const eyeCenterX = containerCenterX + baseX * rect.width;
      const eyeCenterY = containerCenterY + baseY * rect.height;

      // Vector from eye to cursor
      const dx = mouseX.get() - eyeCenterX;
      const dy = mouseY.get() - eyeCenterY;

      // Distance and angle
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Scale movement based on distance (closer = more movement)
      // Max offset when cursor is within 200px
      const intensity = Math.min(distance / 300, 1);

      // Calculate offset with easing
      const newOffsetX = Math.cos(angle) * maxOffset * intensity;
      const newOffsetY = Math.sin(angle) * maxOffset * intensity * 0.7; // Less vertical movement

      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    };

    // Subscribe to motion value changes
    const unsubX = mouseX.on("change", updateEyePosition);
    const unsubY = mouseY.on("change", updateEyePosition);

    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, baseX, baseY, maxOffset, offsetX, offsetY, containerRef]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${50 + baseX * 100}%`,
        top: `${50 + baseY * 100}%`,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Pupil/Iris - the moving part */}
      <motion.div
        className="relative"
        style={{
          width: 18,
          height: 18,
        }}
      >
        {/* CHROME FLICKER FIX: Separated glow architecture */}
        {/* Base eye: static gradient + static shadow (no animation) */}
        {/* Glow overlay: static intense shadow + animated OPACITY only */}

        {/* Base glowing cyan dot - STATIC (no animation) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #00f5ff 0%, #00c8d4 50%, #00a0b0 100%)",
            boxShadow:
              "0 0 15px 3px rgba(0, 245, 255, 0.6), inset 0 0 8px rgba(255, 255, 255, 0.4)",
            // Force GPU layer
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
        />

        {/* Animated glow overlay - NO filter blur, uses soft gradient instead */}
        <motion.div
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{
            // Ultra-soft radial gradient replaces filter: blur(4px)
            background:
              "radial-gradient(circle, rgba(0, 245, 255, 0.35) 0%, rgba(0, 245, 255, 0.15) 30%, rgba(0, 245, 255, 0.05) 60%, transparent 85%)",
            // NO filter: blur() - GPU thrashing fix!
            // Force GPU layer
            backfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Highlight sparkle */}
        <motion.div
          className="absolute rounded-full bg-white"
          style={{
            width: 5,
            height: 5,
            left: "25%",
            top: "20%",
          }}
          animate={{
            opacity: [0.8, 1, 0.8],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export function EyeTrackingNoki({
  src,
  alt,
  className = "",
  eyeSize = 24,
  eyeMaxOffset = 12,
}: EyeTrackingNokiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Occasional blink animation
  const blinkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        if (blinkRef.current) {
          blinkRef.current.style.opacity = "1";
          setTimeout(() => {
            if (blinkRef.current) {
              blinkRef.current.style.opacity = "0";
            }
          }, 150);
        }
      },
      4000 + Math.random() * 3000,
    ); // Random blink interval 4-7 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        // GPU isolation to prevent flicker from other element animations
        isolation: "isolate",
        contain: "layout paint",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      {/* Base Noki Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority
        style={{
          // Force image into its own compositing layer
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      />

      {/* Eye Tracking Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Eye */}
        <TrackingEye
          baseX={EYE_POSITIONS.left.x}
          baseY={EYE_POSITIONS.left.y}
          mouseX={mouseX}
          mouseY={mouseY}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          maxOffset={eyeMaxOffset}
          side="left"
        />

        {/* Right Eye */}
        <TrackingEye
          baseX={EYE_POSITIONS.right.x}
          baseY={EYE_POSITIONS.right.y}
          mouseX={mouseX}
          mouseY={mouseY}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          maxOffset={eyeMaxOffset}
          side="right"
        />

        {/* Blink Overlay */}
        <div
          ref={blinkRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-75"
          style={{
            background: "transparent",
          }}
        >
          {/* Left eyelid */}
          <div
            className="absolute bg-purple-200/90 rounded-full"
            style={{
              left: `${50 + EYE_POSITIONS.left.x * 100}%`,
              top: `${50 + EYE_POSITIONS.left.y * 100}%`,
              width: 22,
              height: 22,
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* Right eyelid */}
          <div
            className="absolute bg-purple-200/90 rounded-full"
            style={{
              left: `${50 + EYE_POSITIONS.right.x * 100}%`,
              top: `${50 + EYE_POSITIONS.right.y * 100}%`,
              width: 22,
              height: 22,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EyeTrackingNoki;
