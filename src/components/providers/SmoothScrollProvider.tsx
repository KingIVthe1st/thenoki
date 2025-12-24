"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// ============================================
// SMOOTH SCROLL PROVIDER
// ============================================
// Uses Lenis for butter-smooth scrolling
// lerp: 0.08 gives that premium cinematic feel
// The lower the lerp, the smoother (but slower) the scroll

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Skip smooth scroll for users who prefer reduced motion
      return;
    }

    // Initialize Lenis with premium settings
    const lenis = new Lenis({
      lerp: 0.08, // Smoothness factor (0.08 = very smooth, cinematic)
      duration: 1.2, // Duration of scroll animation
      smoothWheel: true, // Smooth mousewheel scrolling
      wheelMultiplier: 1, // Wheel scroll speed multiplier
      touchMultiplier: 2, // Touch scroll speed multiplier
      infinite: false, // No infinite scroll
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for other components to use
    // @ts-expect-error - Adding to window for global access
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      // @ts-expect-error - Cleanup global
      window.lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

// Hook to access Lenis instance
export function useLenis() {
  // @ts-expect-error - Accessing from window
  return typeof window !== "undefined" ? window.lenis : null;
}

export default SmoothScrollProvider;
