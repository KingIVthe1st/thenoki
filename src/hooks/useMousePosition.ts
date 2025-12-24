"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // 0-1 range
  normalizedY: number; // 0-1 range
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: e.clientX / window.innerWidth,
        normalizedY: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

// Hook for element-relative mouse position (for 3D tilt effects)
export function useElementMousePosition(ref: RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({
    x: 0.5,
    y: 0.5,
    isInside: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setPosition({
        x: Math.max(0, Math.min(1, x)),
        y: Math.max(0, Math.min(1, y)),
        isInside: true,
      });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0.5, y: 0.5, isInside: false });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return position;
}

// Hook for magnetic button effect
export function useMagneticEffect(
  ref: RefObject<HTMLElement | null>,
  strength = 0.3,
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - centerX) * strength;
      const distanceY = (e.clientY - centerY) * strength;

      setOffset({ x: distanceX, y: distanceY });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);

  return offset;
}
