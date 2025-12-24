"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// CUSTOM CURSOR - Magnetic + Morphing + Trail
// ============================================
// Premium cursor that:
// - Follows mouse with smooth spring physics
// - Morphs shape based on hovered element
// - Has magnetic pull toward interactive elements
// - Creates beautiful trailing effect

// Cursor states for different interactions
type CursorState = "default" | "link" | "text" | "button" | "hidden";

// Magnetic element data
interface MagneticTarget {
  element: HTMLElement;
  rect: DOMRect;
  strength: number;
}

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const magneticRef = useRef<MagneticTarget | null>(null);

  // Raw mouse position (updates instantly)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed cursor position (spring physics)
  // For reduced motion: higher damping = less spring bounce
  const cursorSpring = reducedMotion
    ? { damping: 50, stiffness: 600 }
    : { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, cursorSpring);
  const cursorY = useSpring(mouseY, cursorSpring);

  // Trail dots - progressively slower springs for trailing effect
  // (Hidden for reduced motion users)
  const trail1X = useSpring(mouseX, { damping: 30, stiffness: 250 });
  const trail1Y = useSpring(mouseY, { damping: 30, stiffness: 250 });
  const trail2X = useSpring(mouseX, { damping: 35, stiffness: 180 });
  const trail2Y = useSpring(mouseY, { damping: 35, stiffness: 180 });
  const trail3X = useSpring(mouseX, { damping: 40, stiffness: 120 });
  const trail3Y = useSpring(mouseY, { damping: 40, stiffness: 120 });

  // Check if device supports hover (desktop)
  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) {
      setIsVisible(false);
      return;
    }

    // Show cursor when mouse enters viewport
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial visibility
    setIsVisible(true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Apply magnetic pull if near a magnetic element
      if (magneticRef.current) {
        const { rect, strength } = magneticRef.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance to center
        const deltaX = centerX - e.clientX;
        const deltaY = centerY - e.clientY;

        // Apply magnetic attraction
        targetX += deltaX * strength;
        targetY += deltaY * strength;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);
    },
    [mouseX, mouseY],
  );

  // Handle element interactions
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for data-cursor attribute
      const cursorType = target
        .closest("[data-cursor]")
        ?.getAttribute("data-cursor");
      const cursorLabel = target
        .closest("[data-cursor-text]")
        ?.getAttribute("data-cursor-text");

      if (cursorLabel) {
        setCursorText(cursorLabel);
      } else {
        setCursorText("");
      }

      if (cursorType === "hidden") {
        setCursorState("hidden");
        return;
      }

      if (cursorType === "text") {
        setCursorState("text");
        return;
      }

      if (cursorType === "button") {
        setCursorState("button");
        // Set up magnetic pull
        const el = target.closest("[data-cursor]") as HTMLElement;
        if (el) {
          magneticRef.current = {
            element: el,
            rect: el.getBoundingClientRect(),
            strength: 0.3, // 30% pull strength
          };
        }
        return;
      }

      // Check for interactive elements
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select",
      );
      if (interactive || cursorType === "link") {
        setCursorState("link");
        // Set up magnetic pull for links/buttons
        const el = (interactive ||
          target.closest("[data-cursor]")) as HTMLElement;
        if (el) {
          magneticRef.current = {
            element: el,
            rect: el.getBoundingClientRect(),
            strength: 0.2, // 20% pull strength
          };
        }
        return;
      }

      setCursorState("default");
      magneticRef.current = null;
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;

      // Only reset if leaving interactive element
      if (target.closest("[data-cursor], a, button")) {
        if (!relatedTarget?.closest("[data-cursor], a, button")) {
          setCursorState("default");
          setCursorText("");
          magneticRef.current = null;
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleMouseMove]);

  // Hide on touch devices
  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover)").matches
  ) {
    return null;
  }

  // Cursor size based on state
  const getCursorSize = () => {
    switch (cursorState) {
      case "link":
        return 60;
      case "button":
        return 80;
      case "text":
        return 4;
      case "hidden":
        return 0;
      default:
        return 20;
    }
  };

  const cursorSize = getCursorSize();

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail dots - hidden for reduced motion users */}
      {!reducedMotion && (
        <>
          {/* Trail dots - furthest back first */}
          <motion.div
            className="pointer-events-none fixed z-[9997] rounded-full bg-pink-400/20"
            style={{
              x: trail3X,
              y: trail3Y,
              width: 8,
              height: 8,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: isVisible && cursorState !== "hidden" ? 0.3 : 0,
            }}
          />

          <motion.div
            className="pointer-events-none fixed z-[9998] rounded-full bg-pink-400/30"
            style={{
              x: trail2X,
              y: trail2Y,
              width: 6,
              height: 6,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: isVisible && cursorState !== "hidden" ? 0.5 : 0,
            }}
          />

          <motion.div
            className="pointer-events-none fixed z-[9999] rounded-full bg-pink-400/50"
            style={{
              x: trail1X,
              y: trail1Y,
              width: 4,
              height: 4,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: isVisible && cursorState !== "hidden" ? 0.7 : 0,
            }}
          />
        </>
      )}

      {/* Main cursor */}
      <motion.div
        className="pointer-events-none fixed z-[10000] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          opacity: isVisible ? 1 : 0,
        }}
        transition={
          reducedMotion
            ? { duration: 0.1 }
            : {
                width: { type: "spring", damping: 20, stiffness: 300 },
                height: { type: "spring", damping: 20, stiffness: 300 },
                opacity: { duration: 0.2 },
              }
        }
      >
        {/* Cursor ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          animate={{
            borderColor:
              cursorState === "link" || cursorState === "button"
                ? "rgba(168, 85, 247, 0.8)"
                : "rgba(45, 27, 78, 0.6)",
            backgroundColor:
              cursorState === "button"
                ? "rgba(168, 85, 247, 0.1)"
                : cursorState === "link"
                  ? "rgba(168, 85, 247, 0.05)"
                  : "rgba(0, 0, 0, 0)",
            scale: cursorState === "text" ? 0.3 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />

        {/* Cursor dot */}
        <motion.div
          className="absolute rounded-full bg-purple-600"
          animate={{
            width: cursorState === "text" ? 2 : 4,
            height: cursorState === "text" ? 16 : 4,
            borderRadius: cursorState === "text" ? 1 : 4,
            opacity: cursorState === "hidden" ? 0 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />

        {/* Cursor text label */}
        <AnimatePresence>
          {cursorText && cursorState === "button" && (
            <motion.span
              className="absolute whitespace-nowrap text-xs font-medium text-purple-900"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default CustomCursor;
