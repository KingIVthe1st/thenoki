"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// CHARACTER REVEAL - Premium 3D Text Animation
// ============================================
// Award-winning character-by-character reveal with:
// - 3D rotateX entrance (slot machine / waterfall effect)
// - Motion blur simulation via filter
// - Critically damped spring (no bounce, just weight)
// - Mask reveal (text emerges from inside container)
//
// PHYSICS: High damping (40) + High stiffness (250)
// = Fast acceleration, no overshoot = feels expensive

interface CharacterRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerSpeed?: "slow" | "normal" | "fast";
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

// Container variants - orchestrates stagger timing
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Cinematic sweet spot
      delayChildren: 0,
    },
  },
};

// Slow stagger for dramatic effect
const containerVariantsSlow: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

// Fast stagger for snappy feel
const containerVariantsFast: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

// Character variants - the 3D reveal magic
// NOTE: Removed filter:blur() - Chrome can't GPU-accelerate filter animations,
// causing jank. The 3D rotateX + opacity combo is smooth enough.
const characterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%", // Push below the masking container
    rotateX: 80, // Rotate back for slot machine effect
  },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 40, // High damping = no bounce, smooth stop
      stiffness: 250, // High stiffness = fast initial movement
      mass: 1,
    },
  },
};

export function CharacterReveal({
  children,
  className = "",
  delay = 0,
  staggerSpeed = "normal",
  as: Component = "span",
  once = true,
}: CharacterRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  // Select stagger variant based on speed
  const getContainerVariants = () => {
    switch (staggerSpeed) {
      case "slow":
        return containerVariantsSlow;
      case "fast":
        return containerVariantsFast;
      default:
        return containerVariants;
    }
  };

  // Split text into words
  const words = children.split(" ");

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={getContainerVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      aria-label={children}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap overflow-hidden pb-[0.15em]"
          style={{ perspective: "1000px" }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={characterVariants}
              className="inline-block will-change-transform"
              style={{
                transformOrigin: "bottom center", // Crucial for 3D flip
                transformStyle: "preserve-3d",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {/* Add space after each word except the last */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block w-[0.3em]">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

// ============================================
// WORD REVEAL - Faster word-by-word animation
// ============================================
// For taglines and secondary text where character
// animation would be too slow

interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
}

const wordContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

// NOTE: Removed filter:blur() - Chrome can't GPU-accelerate it
const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 200,
    },
  },
};

export function WordReveal({
  children,
  className = "",
  delay = 0,
  as: Component = "span",
  once = true,
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  const words = children.split(" ");

  if (reducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden flex flex-wrap gap-x-[0.3em] ${className}`}
      variants={wordContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{ perspective: "800px" }}
        >
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
            style={{ transformOrigin: "bottom center" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// ============================================
// LINE REVEAL - Elegant line-by-line animation
// ============================================
// For multi-line headings where each line animates
// as a single unit

interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  once?: boolean;
}

const lineContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
};

// NOTE: Removed filter:blur() - Chrome can't GPU-accelerate it
const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      type: "spring",
      damping: 35,
      stiffness: 200,
    },
  },
};

export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  once = true,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={lineContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
    >
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            variants={lineVariants}
            className={`will-change-transform ${lineClassName}`}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

export default CharacterReveal;
