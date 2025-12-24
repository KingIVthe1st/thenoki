// Premium Spring Physics Configurations
// These create that "alive" feeling in animations

export const springs = {
  // Snappy, responsive feel - good for buttons
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 1,
  },

  // Smooth, elegant feel - good for page transitions
  smooth: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 0.8,
  },

  // Bouncy, playful feel - perfect for Noki's whimsical brand
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 12,
    mass: 0.5,
  },

  // Gentle, dreamy feel - for floating elements
  gentle: {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 1.2,
  },

  // Very soft, cloud-like - for background elements
  cloudy: {
    type: "spring" as const,
    stiffness: 50,
    damping: 25,
    mass: 1.5,
  },

  // Magnetic cursor follow
  magnetic: {
    type: "spring" as const,
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },

  // Quick response for micro-interactions
  quick: {
    type: "spring" as const,
    stiffness: 500,
    damping: 35,
    mass: 0.8,
  },

  // Heavy, luxurious feel
  heavy: {
    type: "spring" as const,
    stiffness: 80,
    damping: 30,
    mass: 2,
  },
};

// Transition presets combining spring with other options
export const transitions = {
  // Default smooth transition
  default: {
    ...springs.smooth,
  },

  // Button interactions
  button: {
    ...springs.snappy,
  },

  // Card hover effects
  card: {
    ...springs.bouncy,
  },

  // Page/section reveals
  reveal: {
    duration: 0.8,
    ease: [0.19, 1, 0.22, 1],
  },

  // Stagger children
  stagger: {
    staggerChildren: 0.1,
    delayChildren: 0.1,
  },

  // Floating animations
  float: {
    ...springs.gentle,
    repeat: Infinity,
    repeatType: "reverse" as const,
  },

  // Cloud movement
  cloud: {
    ...springs.cloudy,
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

// Glow effect configurations
export const glowEffects = {
  // Purple brand glow
  purple: {
    default:
      "0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.15)",
    hover:
      "0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.25), 0 0 90px rgba(168, 85, 247, 0.1)",
    intense:
      "0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(168, 85, 247, 0.35), 0 0 120px rgba(168, 85, 247, 0.15)",
  },

  // Pink accent glow
  pink: {
    default:
      "0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(236, 72, 153, 0.15)",
    hover:
      "0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.25)",
    intense:
      "0 0 40px rgba(236, 72, 153, 0.6), 0 0 80px rgba(236, 72, 153, 0.35)",
  },

  // Cyan eye glow
  cyan: {
    default:
      "0 0 15px rgba(91, 255, 247, 0.5), 0 0 30px rgba(91, 255, 247, 0.3)",
    hover:
      "0 0 25px rgba(91, 255, 247, 0.7), 0 0 50px rgba(91, 255, 247, 0.4), 0 0 80px rgba(91, 255, 247, 0.2)",
    intense:
      "0 0 35px rgba(91, 255, 247, 0.8), 0 0 70px rgba(91, 255, 247, 0.5), 0 0 100px rgba(91, 255, 247, 0.25)",
  },

  // White/soft glow
  white: {
    default:
      "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.15)",
    hover:
      "0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.25)",
  },
};

// Shadow configurations for depth
export const shadows = {
  // Subtle elevation
  sm: "0 2px 8px rgba(45, 27, 78, 0.08), 0 1px 3px rgba(45, 27, 78, 0.06)",

  // Medium elevation
  md: "0 4px 16px rgba(45, 27, 78, 0.1), 0 2px 6px rgba(45, 27, 78, 0.08)",

  // Large elevation
  lg: "0 8px 32px rgba(45, 27, 78, 0.12), 0 4px 12px rgba(45, 27, 78, 0.08)",

  // Extra large - for hero cards
  xl: "0 16px 48px rgba(45, 27, 78, 0.15), 0 8px 24px rgba(45, 27, 78, 0.1)",

  // Floating effect
  float:
    "0 20px 60px rgba(45, 27, 78, 0.18), 0 10px 30px rgba(45, 27, 78, 0.12)",

  // Glass card inner shadow
  glassInner:
    "inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(255, 255, 255, 0.2)",

  // Premium multi-layer shadow
  premium: `
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 2px 4px rgba(45, 27, 78, 0.04),
    0 4px 8px rgba(45, 27, 78, 0.06),
    0 8px 16px rgba(45, 27, 78, 0.08),
    0 16px 32px rgba(45, 27, 78, 0.1)
  `,
};
