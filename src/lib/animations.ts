// Premium Animation Variants - Agency-Level Motion Design
// Using expo easing for that "Apple-like" premium feel

import { Variants, Transition } from "framer-motion";

// === PREMIUM EASING CURVES ===
export const easings = {
  // Luxury expo ease - starts fast, lands incredibly soft
  luxury: [0.19, 1, 0.22, 1] as const,
  // Smooth cubic
  smooth: [0.4, 0, 0.2, 1] as const,
  // Dramatic entrance
  entrance: [0.0, 0.0, 0.2, 1] as const,
  // Quick snap with overshoot
  snap: [0.68, -0.55, 0.265, 1.55] as const,
  // Gentle deceleration
  gentle: [0.22, 1, 0.36, 1] as const,
};

// === REVEAL ANIMATIONS ===

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    },
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -40,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easings.luxury,
    },
  },
};

export const fadeInScale: Variants = {
  initial: {
    opacity: 0,
    scale: 0.85,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: easings.luxury,
    },
  },
};

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -100,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 100,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    },
  },
};

// === STAGGER ANIMATIONS ===

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easings.luxury,
    },
  },
};

// === TEXT REVEAL ANIMATIONS ===

export const letterReveal: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: easings.luxury,
    },
  }),
};

export const wordReveal: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    rotateX: -45,
    filter: "blur(4px)",
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: easings.luxury,
    },
  }),
};

// === CONTINUOUS ANIMATIONS ===

export const float: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const floatGentle: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const floatRotate: Variants = {
  animate: {
    y: [0, -15, 0],
    rotate: [-3, 3, -3],
    transition: {
      duration: 7,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const breathe: Variants = {
  animate: {
    scale: [1, 1.03, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const sparkle: Variants = {
  animate: {
    scale: [0.8, 1.3, 0.8],
    opacity: [0.3, 1, 0.3],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const twinkle: Variants = {
  animate: {
    opacity: [0.2, 1, 0.2],
    scale: [0.9, 1.1, 0.9],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// === CLOUD ANIMATIONS ===

export const cloudDrift: Variants = {
  animate: {
    x: [0, 30, -20, 10, 0],
    y: [0, -15, -8, -20, 0],
    scale: [1, 1.02, 0.98, 1.01, 1],
    transition: {
      duration: 45,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const cloudDriftSlow: Variants = {
  animate: {
    x: [0, 20, -15, 5, 0],
    y: [0, -10, -5, -12, 0],
    transition: {
      duration: 60,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

export const cloudDriftFast: Variants = {
  animate: {
    x: [0, 40, -30, 15, 0],
    y: [0, -20, -10, -25, 0],
    scale: [1, 1.03, 0.97, 1.02, 1],
    transition: {
      duration: 30,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// === HOVER ANIMATIONS ===

export const buttonHover = {
  scale: 1.05,
  y: -4,
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

export const buttonTap = {
  scale: 0.97,
  y: 0,
};

export const cardHover = {
  y: -12,
  scale: 1.02,
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export const cardHover3D = {
  y: -10,
  scale: 1.02,
  rotateX: 5,
  rotateY: -5,
  transition: { type: "spring", stiffness: 200, damping: 20 },
};

export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2), 0 0 60px rgba(168, 85, 247, 0.1)",
      "0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.3), 0 0 90px rgba(168, 85, 247, 0.15)",
      "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2), 0 0 60px rgba(168, 85, 247, 0.1)",
    ],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// === SCROLL TRIGGERED ===

export const scrollReveal: Variants = {
  offscreen: {
    y: 80,
    opacity: 0,
    filter: "blur(12px)",
  },
  onscreen: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    },
  },
};

export const scrollRevealLeft: Variants = {
  offscreen: {
    x: -80,
    opacity: 0,
    filter: "blur(8px)",
  },
  onscreen: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    },
  },
};

export const scrollRevealRight: Variants = {
  offscreen: {
    x: 80,
    opacity: 0,
    filter: "blur(8px)",
  },
  onscreen: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.luxury,
    },
  },
};

export const scrollRevealScale: Variants = {
  offscreen: {
    scale: 0.8,
    opacity: 0,
    filter: "blur(15px)",
  },
  onscreen: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: easings.luxury,
    },
  },
};

// === UTILITY FUNCTIONS ===

export const createStaggerDelay = (index: number, baseDelay = 0.1) => ({
  transition: {
    delay: index * baseDelay,
    duration: 0.6,
    ease: easings.luxury,
  },
});

export const createParallaxTransform = (scrollY: number, speed: number) => ({
  y: scrollY * speed,
});
