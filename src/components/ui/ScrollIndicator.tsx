"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// SCROLL INDICATOR - Modern "Track & Pill" Design
// ============================================
// Premium scroll cue that doesn't feel dated:
// - Track with moving pill (not bouncing arrow)
// - Subtle fade in/out animation
// - Responsive positioning
//
// The current trend is the "Track & Pill" or "Infinite Line"
// rather than the old bouncing arrow

interface ScrollIndicatorProps {
  className?: string;
  variant?: "pill" | "line" | "mouse";
  color?: "light" | "dark" | "purple";
}

export function ScrollIndicator({
  className = "",
  variant = "pill",
  color = "purple",
}: ScrollIndicatorProps) {
  const reducedMotion = useReducedMotion();

  // Color schemes
  const colors = {
    light: {
      text: "text-white/50",
      border: "border-white/20",
      bg: "bg-white",
      track: "bg-white/10",
    },
    dark: {
      text: "text-[#2D1B4E]/60",
      border: "border-[#2D1B4E]/20",
      bg: "bg-[#2D1B4E]",
      track: "bg-[#2D1B4E]/10",
    },
    purple: {
      text: "text-[#4A2C7A]/60",
      border: "border-[#4A2C7A]/30",
      bg: "bg-gradient-to-b from-purple-500 to-pink-500",
      track: "bg-purple-500/10",
    },
  };

  const colorScheme = colors[color];

  if (variant === "pill") {
    return (
      <motion.div
        className={`flex flex-col items-center gap-3 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {/* Label */}
        <span
          className={`text-[10px] uppercase tracking-[0.25em] font-semibold ${colorScheme.text}`}
        >
          Scroll
        </span>

        {/* The Track */}
        <div
          className={`h-[44px] w-[26px] rounded-full border ${colorScheme.border} flex justify-center pt-2 ${colorScheme.track}`}
        >
          {/* The Moving Pill */}
          <motion.div
            className={`h-2 w-1.5 rounded-full ${colorScheme.bg}`}
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, 18, 0],
                    opacity: [0.4, 1, 0.4],
                    scale: [0.8, 1, 0.8],
                  }
            }
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    );
  }

  if (variant === "line") {
    return (
      <motion.div
        className={`flex flex-col items-center gap-3 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {/* Label */}
        <span
          className={`text-[10px] uppercase tracking-[0.25em] font-semibold ${colorScheme.text}`}
        >
          Explore
        </span>

        {/* Animated Line */}
        <div className="h-[60px] w-[1px] bg-gradient-to-b from-transparent via-purple-400/50 to-transparent overflow-hidden">
          <motion.div
            className="h-[20px] w-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"
            animate={
              reducedMotion
                ? {}
                : {
                    y: [-20, 60, -20],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    );
  }

  // Mouse variant
  return (
    <motion.div
      className={`flex flex-col items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      {/* Mouse shape */}
      <div
        className={`relative h-[42px] w-[26px] rounded-full border-2 ${colorScheme.border}`}
      >
        {/* Scroll wheel */}
        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 top-2 h-2 w-1 rounded-full ${colorScheme.bg}`}
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 8, 0],
                  opacity: [1, 0.3, 1],
                }
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Bouncing arrow */}
      <motion.svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className={colorScheme.text}
        animate={
          reducedMotion
            ? {}
            : {
                y: [0, 4, 0],
              }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M1 4L6 9L11 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

// ============================================
// SCROLL ARROW - Simple animated arrow
// ============================================
// Minimal scroll indicator for when you need
// just a subtle arrow without the track

interface ScrollArrowProps {
  className?: string;
  color?: string;
}

export function ScrollArrow({
  className = "",
  color = "rgba(74, 44, 122, 0.6)",
}: ScrollArrowProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        animate={
          reducedMotion
            ? {}
            : {
                y: [0, 8, 0],
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default ScrollIndicator;
