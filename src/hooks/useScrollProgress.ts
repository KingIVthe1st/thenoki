"use client";

import { useState, useEffect, RefObject } from "react";

// Global scroll progress (0-1)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

// Element visibility progress (0-1 as element enters viewport)
export function useElementScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far into the viewport the element is
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // Element is in view when top is below viewport bottom and bottom is above viewport top
      const inView = elementTop < windowHeight && elementBottom > 0;
      setIsInView(inView);

      if (inView) {
        // Progress: 0 when element top enters, 1 when element top reaches viewport center
        const progress = 1 - elementTop / windowHeight;
        setProgress(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return { progress, isInView };
}

// Parallax transform based on scroll
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return offset;
}
