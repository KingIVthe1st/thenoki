"use client";

import { useRef, useEffect, useCallback } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

// ============================================
// USE MAGNETIC HOOK
// ============================================
// Makes any element have magnetic attraction to cursor
// Returns motion values for x/y transforms
//
// Usage:
// const { ref, x, y } = useMagnetic({ strength: 0.3 });
// <motion.button ref={ref} style={{ x, y }}>Click me</motion.button>

interface UseMagneticOptions {
  strength?: number; // How strong the magnetic pull (0-1)
  radius?: number; // How close cursor must be to trigger (px)
  damping?: number; // Spring damping
  stiffness?: number; // Spring stiffness
}

interface UseMagneticReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  isHovered: boolean;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.3,
  radius = 100,
  damping = 20,
  stiffness = 300,
}: UseMagneticOptions = {}): UseMagneticReturn<T> {
  const ref = useRef<T>(null);

  // Motion values for transform
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smoothed values with spring physics
  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });

  // Track hover state
  const isHoveredRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from cursor to center
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Only apply effect within radius
      if (distance < radius) {
        isHoveredRef.current = true;
        // Move element toward cursor
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else if (isHoveredRef.current) {
        // Reset when leaving radius
        isHoveredRef.current = false;
        x.set(0);
        y.set(0);
      }
    },
    [strength, radius, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add listeners to document for smooth tracking
    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return {
    ref,
    x: springX,
    y: springY,
    isHovered: isHoveredRef.current,
  };
}

export default useMagnetic;
