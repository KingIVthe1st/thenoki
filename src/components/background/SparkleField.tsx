"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMemo } from "react";

// ============================================
// SPARKLE FIELD v2.0 - Level 20 Dreamscape
// ============================================
// 85 CSS-only particles (hearts, stars, sparkles, diamonds)
// ENHANCED with statement sparkles and micro particles
// Zero JavaScript animation overhead - runs on GPU compositor

interface SparkleConfig {
  id: string;
  type: "star" | "sparkle" | "heart" | "diamond" | "starburst";
  // Size category
  category: "micro" | "small" | "medium" | "large" | "statement";
  // Position (viewport %)
  left: number;
  top: number;
  // Size
  size: number;
  // Animation
  animation: string;
  duration: number;
  delay: number;
  // Appearance
  color: string;
  opacity: number;
  glow: number;
}

// Seeded pseudo-random for deterministic positioning
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Generate deterministic sparkle positions - ENHANCED to 85
function generateSparkles(): SparkleConfig[] {
  const sparkles: SparkleConfig[] = [];

  // Sparkle types distribution
  const types: Array<"star" | "sparkle" | "heart" | "diamond" | "starburst"> = [
    "star",
    "star",
    "star",
    "star",
    "sparkle",
    "sparkle",
    "sparkle",
    "heart",
    "heart",
    "diamond",
    "starburst",
  ];

  // Size categories: 20% micro, 35% small, 25% medium, 15% large, 5% statement
  const categories: Array<
    "micro" | "small" | "medium" | "large" | "statement"
  > = [
    "micro",
    "micro",
    "micro",
    "micro",
    "small",
    "small",
    "small",
    "small",
    "small",
    "small",
    "small",
    "medium",
    "medium",
    "medium",
    "medium",
    "medium",
    "large",
    "large",
    "large",
    "statement",
  ];

  // Colors - expanded magical palette
  const colors = [
    "rgba(255, 255, 255, 0.95)", // Pure white
    "rgba(255, 255, 255, 0.9)", // White
    "rgba(251, 207, 232, 0.92)", // Pink
    "rgba(252, 231, 243, 0.9)", // Light pink
    "rgba(221, 214, 254, 0.9)", // Lavender
    "rgba(196, 181, 253, 0.88)", // Purple
    "rgba(167, 139, 250, 0.85)", // Violet
    "rgba(139, 92, 246, 0.82)", // Deep violet
    "rgba(56, 189, 248, 0.88)", // Cyan (magical accent)
    "rgba(147, 197, 253, 0.85)", // Light blue
  ];

  // Animation types with varied behaviors
  const animations = [
    "sparkle-twinkle",
    "sparkle-pulse",
    "star-spin",
    "sparkle-float-up",
    "sparkle-shimmer",
  ];

  // PERFORMANCE OPTIMIZED: 36 sparkles (was 85)
  // Reduced by 58% while keeping visual impact
  for (let i = 0; i < 36; i++) {
    // Seeded random for deterministic but natural-looking distribution
    const seed = i * 17 + 7;
    const rand1 = seededRandom(seed);
    const rand2 = seededRandom(seed + 100);
    const rand3 = seededRandom(seed + 200);

    // Position with clustering tendency (more sparkles near clouds)
    // Use curved distribution for natural clustering
    let left = rand1 * 100;
    let top = rand2 * 100;

    // Bias some sparkles toward edges and corners for depth
    if (i % 5 === 0) {
      left = rand1 < 0.5 ? rand1 * 30 : 70 + rand1 * 30;
    }
    if (i % 7 === 0) {
      top = rand2 < 0.5 ? rand2 * 25 : 75 + rand2 * 25;
    }

    const type = types[i % types.length];
    const category = categories[i % categories.length];
    const color = colors[Math.floor(rand3 * colors.length)];
    const animation = animations[i % animations.length];

    // Size varies by category
    let baseSize: number;
    let glowMultiplier: number;
    switch (category) {
      case "micro":
        baseSize = 3 + rand1 * 3; // 3-6px
        glowMultiplier = 0.5;
        break;
      case "small":
        baseSize = 6 + rand1 * 4; // 6-10px
        glowMultiplier = 0.7;
        break;
      case "medium":
        baseSize = 10 + rand1 * 6; // 10-16px
        glowMultiplier = 1.0;
        break;
      case "large":
        baseSize = 16 + rand1 * 8; // 16-24px
        glowMultiplier = 1.3;
        break;
      case "statement":
        baseSize = 24 + rand1 * 12; // 24-36px
        glowMultiplier = 1.8;
        break;
    }

    // Adjust size for type
    if (type === "heart") baseSize *= 0.8;
    if (type === "starburst") baseSize *= 1.2;

    // Duration based on category (larger = slower, more majestic)
    const baseDuration =
      category === "statement" ? 8 : category === "large" ? 6 : 3;
    const duration = baseDuration + rand2 * 3;

    // Opacity based on category
    const baseOpacity =
      category === "micro" ? 0.5 : category === "statement" ? 0.9 : 0.7;
    const opacityVariation = rand3 * 0.2;

    sparkles.push({
      id: `sparkle-${i}`,
      type,
      category,
      left,
      top,
      size: baseSize,
      animation,
      duration,
      delay: -(rand1 * 10), // Random start phase
      color,
      opacity: baseOpacity + opacityVariation,
      glow: baseSize * glowMultiplier,
    });
  }

  return sparkles;
}

export function SparkleField() {
  const reducedMotion = useReducedMotion();

  // Memoize sparkle configs - they never change
  const sparkles = useMemo(() => generateSparkles(), []);

  if (reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} config={sparkle} />
      ))}
    </div>
  );
}

// Individual sparkle component
function Sparkle({ config }: { config: SparkleConfig }) {
  const shapeStyles = getShapeStyles(
    config.type,
    config.size,
    config.color,
    config.glow,
  );

  return (
    <div
      className="absolute"
      style={{
        left: `${config.left}%`,
        top: `${config.top}%`,
        opacity: config.opacity,
        // PERFORMANCE: Removed willChange from individual sparkles
        // Chrome sub-pixel fix for smooth animation
        backfaceVisibility: "hidden",
        transform: "translateZ(0) rotate(0.01deg)",
        // CSS animation
        animation: `${config.animation} ${config.duration}s ease-in-out infinite`,
        animationDelay: `${config.delay}s`,
        ...shapeStyles,
      }}
    />
  );
}

// Generate CSS styles for each sparkle type
// CHROME FLICKER FIX: Removed filter:drop-shadow from all sparkles
// drop-shadow forces each sparkle into its own compositor layer
// With 36 sparkles, this creates layer explosion and texture thrashing
// Instead, we use brighter colors and rely on the natural glow of the shapes
function getShapeStyles(
  type: "star" | "sparkle" | "heart" | "diamond" | "starburst",
  size: number,
  color: string,
  _glow: number, // Kept for API compatibility but not used
): React.CSSProperties {
  // Extract RGBA values and boost brightness for glow effect without filter
  const boostedColor = color.replace(/[\d.]+\)$/, (match) => {
    const opacity = parseFloat(match);
    return `${Math.min(opacity * 1.3, 1)})`; // Boost opacity
  });

  switch (type) {
    case "star":
      // 5-point star using CSS clip-path
      return {
        width: size,
        height: size,
        background: boostedColor,
        clipPath: `polygon(
          50% 0%,
          61% 35%,
          98% 35%,
          68% 57%,
          79% 91%,
          50% 70%,
          21% 91%,
          32% 57%,
          2% 35%,
          39% 35%
        )`,
        // NO filter - reduces compositor layers
      };

    case "sparkle":
      // Simple diamond sparkle
      return {
        width: size,
        height: size,
        background: boostedColor,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      };

    case "heart":
      // CSS heart shape - simplified without filter
      return {
        width: size,
        height: size,
        position: "relative" as const,
        background: boostedColor,
        borderRadius: "50% 50% 0 0",
        transform: `rotate(-45deg)`,
      };

    case "diamond":
      // Elongated diamond
      return {
        width: size * 0.7,
        height: size,
        background: boostedColor,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      };

    case "starburst":
      // 8-point starburst - extra magical
      return {
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${boostedColor} 0%, transparent 60%)`,
        clipPath: `polygon(
          50% 0%, 55% 35%, 85% 15%, 65% 45%,
          100% 50%, 65% 55%, 85% 85%, 55% 65%,
          50% 100%, 45% 65%, 15% 85%, 35% 55%,
          0% 50%, 35% 45%, 15% 15%, 45% 35%
        )`,
      };

    default:
      return {
        width: size,
        height: size,
        background: boostedColor,
        borderRadius: "50%",
      };
  }
}

export default SparkleField;
