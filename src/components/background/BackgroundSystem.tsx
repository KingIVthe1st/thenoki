"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useGyroscopeParallax } from "@/components/effects/GyroscopeParallax";

// ============================================
// BACKGROUND SYSTEM - SINGLE CONTAINER ARCHITECTURE
// ============================================
// CRITICAL: All layers inside ONE fixed container so z-index works predictably
// This fixes the stacking context issue that caused the gradient to not render

export function BackgroundSystem() {
  return (
    <div
      id="background-system"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* z: 0 - Base gradient sky */}
      <GradientSky />

      {/* z: 1 - Subtle light rays */}
      <LightRays />

      {/* z: 2 - Animated aurora gradient mesh (ENHANCED) */}
      <AuroraMesh />

      {/* z: 2.5 - Extra dreamy mist layer */}
      <DreamyMist />

      {/* z: 3-7 - ENHANCED Cloud layers with more density */}
      {/* Deep background clouds - very soft */}
      <CloudLayer
        src="/images/clouds/cloud-distant.png"
        depth={1}
        opacity={0.85}
        zIndex={3}
      />
      {/* Extra distant layer for depth */}
      <CloudLayer
        src="/images/clouds/cloud-main.png"
        depth={1}
        opacity={0.5}
        zIndex={3}
        offsetX={200}
        scale={1.3}
      />

      {/* Mid-layer clouds - primary detail */}
      <CloudLayer
        src="/images/clouds/cloud-main.png"
        depth={2}
        opacity={0.9}
        zIndex={4}
      />
      {/* Extra mid layer offset */}
      <CloudLayer
        src="/images/clouds/cloud-distant.png"
        depth={2}
        opacity={0.6}
        zIndex={4}
        offsetX={-150}
        scale={1.2}
      />

      {/* Foreground wisps - most movement */}
      <CloudLayer
        src="/images/clouds/cloud-wisps.png"
        depth={3}
        opacity={0.75}
        zIndex={5}
      />
      {/* Extra wispy layer */}
      <CloudLayer
        src="/images/clouds/cloud-wisps.png"
        depth={3}
        opacity={0.45}
        zIndex={6}
        offsetX={100}
        scale={1.15}
      />

      {/* z: 7 - Ethereal mist bands */}
      <MistBands />

      {/* z: 8 - ENHANCED Floating particles - MORE of them */}
      <ParticleField particleCount={35} />

      {/* z: 9 - ENHANCED Floating light orbs - MORE bokeh */}
      <FloatingLights lightCount={20} />

      {/* z: 10 - Soft fog overlay */}
      <FogOverlay />

      {/* z: 11 - Cinematic vignette */}
      <VignetteOverlay />

      {/* z: 12 - Premium noise texture */}
      <NoiseOverlay />
    </div>
  );
}

// ============================================
// GRADIENT SKY - Base layer
// ============================================
function GradientSky() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 0,
        background: `linear-gradient(
          165deg,
          #7C3AED 0%,
          #8B5CF6 5%,
          #A78BFA 12%,
          #C4B5FD 22%,
          #DDD6FE 35%,
          #EDE9FE 48%,
          #F5F3FF 58%,
          #FDF4FF 68%,
          #FDF2F8 78%,
          #FCE7F3 88%,
          #FBCFE8 100%
        )`,
      }}
    />
  );
}

// ============================================
// LIGHT RAYS / GOD RAYS
// ============================================
function LightRays() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute"
      style={{
        zIndex: 1,
        top: "-20%",
        left: "10%",
        width: "80%",
        height: "100%",
        background: `
          conic-gradient(
            from 180deg at 50% 0%,
            transparent 0deg,
            rgba(255, 255, 255, 0.04) 15deg,
            transparent 30deg,
            transparent 60deg,
            rgba(255, 255, 255, 0.03) 75deg,
            transparent 90deg,
            transparent 120deg,
            rgba(255, 255, 255, 0.035) 135deg,
            transparent 150deg,
            transparent 180deg,
            rgba(255, 255, 255, 0.03) 195deg,
            transparent 210deg,
            transparent 240deg,
            rgba(255, 255, 255, 0.04) 255deg,
            transparent 270deg,
            transparent 300deg,
            rgba(255, 255, 255, 0.03) 315deg,
            transparent 330deg,
            transparent 360deg
          )
        `,
        filter: "blur(2px)",
      }}
      animate={
        reducedMotion
          ? {}
          : {
              rotate: [0, 5, -3, 0],
              opacity: [0.5, 0.8, 0.6, 0.5],
            }
      }
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ============================================
// AURORA GRADIENT MESH
// ============================================
function AuroraMesh() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0" style={{ zIndex: 2 }}>
      {/* Primary purple aurora - top */}
      <motion.div
        className="absolute"
        style={{
          top: "-20%",
          left: "-10%",
          width: "70%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, 50, -30, 20, 0],
                y: [0, 30, -20, 10, 0],
                scale: [1, 1.1, 0.95, 1.05, 1],
              }
        }
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary pink aurora - bottom right */}
      <motion.div
        className="absolute"
        style={{
          bottom: "-10%",
          right: "-15%",
          width: "60%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.35) 0%, rgba(244, 114, 182, 0.15) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, -40, 30, -20, 0],
                y: [0, -30, 20, -10, 0],
                scale: [1, 1.15, 0.9, 1.08, 1],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Cyan accent - center left */}
      <motion.div
        className="absolute"
        style={{
          top: "30%",
          left: "-5%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.2) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* Lavender mist - center */}
      <motion.div
        className="absolute"
        style={{
          top: "40%",
          left: "30%",
          width: "50%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, rgba(196, 181, 253, 0.25) 0%, rgba(221, 214, 254, 0.1) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, 20, -15, 0],
                scale: [1, 1.05, 0.98, 1],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Warm peach glow - bottom center */}
      <motion.div
        className="absolute"
        style={{
          bottom: "0%",
          left: "20%",
          width: "60%",
          height: "35%",
          background:
            "radial-gradient(ellipse at bottom, rgba(251, 207, 232, 0.4) 0%, rgba(252, 231, 243, 0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                opacity: [0.7, 1, 0.7],
              }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ============================================
// DREAMY MIST - Extra ethereal atmosphere
// ============================================
function DreamyMist() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0" style={{ zIndex: 2 }}>
      {/* Soft pink mist - left side */}
      <motion.div
        className="absolute"
        style={{
          top: "20%",
          left: "-20%",
          width: "80%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(251, 207, 232, 0.5) 0%, rgba(252, 231, 243, 0.25) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, 40, -20, 30, 0],
                y: [0, 20, -15, 10, 0],
                opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
              }
        }
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft lavender mist - right side */}
      <motion.div
        className="absolute"
        style={{
          top: "40%",
          right: "-15%",
          width: "70%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(221, 214, 254, 0.45) 0%, rgba(237, 233, 254, 0.2) 50%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [0, -30, 20, -15, 0],
                opacity: [0.5, 0.7, 0.4, 0.65, 0.5],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Ethereal white mist - center floating */}
      <motion.div
        className="absolute"
        style={{
          top: "10%",
          left: "30%",
          width: "60%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 75%)",
          filter: "blur(50px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                y: [0, -25, 10, -15, 0],
                scale: [1, 1.1, 0.95, 1.05, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />
    </div>
  );
}

// ============================================
// MIST BANDS - Horizontal ethereal streaks
// ============================================
function MistBands() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0" style={{ zIndex: 7 }}>
      {/* Top mist band */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: "15%",
          height: "12%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.25) 80%, transparent 100%)",
          filter: "blur(30px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [-50, 50, -30, 40, -50],
                opacity: [0.4, 0.6, 0.35, 0.55, 0.4],
              }
        }
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Middle mist band */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: "50%",
          height: "15%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(251,207,232,0.2) 30%, rgba(221,214,254,0.25) 70%, transparent 100%)",
          filter: "blur(40px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [30, -40, 20, -30, 30],
                opacity: [0.35, 0.5, 0.3, 0.45, 0.35],
              }
        }
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Bottom mist band */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          bottom: "20%",
          height: "10%",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 25%, rgba(196,181,253,0.2) 50%, rgba(255,255,255,0.3) 75%, transparent 100%)",
          filter: "blur(25px)",
        }}
        animate={
          reducedMotion
            ? {}
            : {
                x: [-30, 60, -20, 40, -30],
                opacity: [0.3, 0.5, 0.25, 0.4, 0.3],
              }
        }
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 15,
        }}
      />
    </div>
  );
}

// ============================================
// FOG OVERLAY - Soft atmospheric haze
// ============================================
function FogOverlay() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 10,
        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0.12) 0%,
            transparent 20%,
            transparent 60%,
            rgba(251,207,232,0.08) 80%,
            rgba(221,214,254,0.1) 100%
          )
        `,
        pointerEvents: "none",
      }}
    />
  );
}

// ============================================
// CLOUD LAYER - Parallax with AI-generated images
// ============================================
interface CloudLayerProps {
  src: string;
  depth: number; // 1 = far (slow), 3 = near (fast)
  opacity?: number;
  zIndex: number;
  offsetX?: number; // Horizontal offset for variety
  scale?: number; // Scale multiplier for variety
}

function CloudLayer({
  src,
  depth,
  opacity = 0.8,
  zIndex,
  offsetX = 0,
  scale = 1,
}: CloudLayerProps) {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const gyroscope = useGyroscopeParallax();

  // Parallax intensity based on depth
  const parallaxMultiplier = depth === 1 ? 80 : depth === 2 ? 160 : 280;
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -parallaxMultiplier]);
  const y = useSpring(rawY, { stiffness: 50, damping: 20 });

  // Horizontal drift animation
  const [driftX, setDriftX] = useState(0);

  // Gyroscope offset (mobile tilt parallax)
  const gyroMultiplier = depth === 1 ? 0.3 : depth === 2 ? 0.6 : 1;
  const [gyroOffset, setGyroOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!gyroscope?.isActive) return;

    const updateGyro = () => {
      setGyroOffset({
        x: (gyroscope.x?.get() ?? 0) * gyroMultiplier,
        y: (gyroscope.y?.get() ?? 0) * gyroMultiplier,
      });
    };

    // Subscribe to gyroscope changes
    const unsubX = gyroscope.x?.on("change", updateGyro);
    const unsubY = gyroscope.y?.on("change", updateGyro);

    return () => {
      unsubX?.();
      unsubY?.();
    };
  }, [gyroscope, gyroMultiplier]);

  useEffect(() => {
    if (reducedMotion) return;

    const driftSpeed = depth === 1 ? 0.3 : depth === 2 ? 0.5 : 0.8;
    let animationId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const drift = Math.sin(elapsed * driftSpeed * 0.1) * (20 / depth);
      setDriftX(drift);
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [depth, reducedMotion]);

  // Use blend mode to let gradient show through
  // "soft-light" creates a dreamy blend, "screen" brightens, "overlay" adds contrast
  const blendMode =
    depth === 1 ? "soft-light" : depth === 2 ? "overlay" : "soft-light";

  // Combine drift + gyroscope offset + custom offset
  const totalOffsetX = driftX + gyroOffset.x + offsetX;
  const totalOffsetY = gyroOffset.y;

  // Calculate final scale
  const finalScale = (1.1 + (3 - depth) * 0.05) * scale;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        zIndex,
        y: reducedMotion ? totalOffsetY : y,
        x: totalOffsetX,
        opacity,
        mixBlendMode: blendMode,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{
          objectPosition: "center",
          transform: `scale(${finalScale}) translateY(${totalOffsetY}px)`,
        }}
        priority={depth === 2}
      />
    </motion.div>
  );
}

// ============================================
// PARTICLE FIELD - Hearts, stars, sparkles
// ============================================
interface ParticleFieldProps {
  particleCount?: number;
}

function ParticleField({ particleCount = 20 }: ParticleFieldProps) {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      type: "heart" | "star" | "sparkle" | "circle";
      delay: number;
      duration: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    const types = ["heart", "star", "sparkle", "circle"] as const;
    // Updated colors using new magenta palette
    const colors = {
      heart: ["#ec4899", "#f472b6", "#db2777"], // Modern magenta hearts
      star: ["#ffffff", "#fef3c7", "#ddd6fe"],
      sparkle: ["#ffffff", "#c4b5fd", "#fbcfe8"],
      circle: [
        "rgba(255,255,255,0.6)",
        "rgba(196,181,253,0.5)",
        "rgba(236,72,153,0.3)",
      ],
    };

    const generated = Array.from({ length: particleCount }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size:
          type === "heart" ? 12 + Math.random() * 10 : 6 + Math.random() * 8,
        type,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 18,
        color: colors[type][Math.floor(Math.random() * colors[type].length)],
      };
    });
    setParticles(generated);
  }, []);

  if (reducedMotion || particles.length === 0) return null;

  return (
    <div className="absolute inset-0" style={{ zIndex: 6 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, -80, -40, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.4, 0.9, 0.6, 0.8, 0.4],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <ParticleIcon type={p.type} size={p.size} color={p.color} />
        </motion.div>
      ))}
    </div>
  );
}

// Particle icons
function ParticleIcon({
  type,
  size,
  color,
}: {
  type: string;
  size: number;
  color: string;
}) {
  if (type === "heart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  if (type === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    );
  }
  if (type === "sparkle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
      </svg>
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
    />
  );
}

// ============================================
// FLOATING LIGHTS - Bokeh effect (ENHANCED)
// ============================================
interface FloatingLightsProps {
  lightCount?: number;
}

function FloatingLights({ lightCount = 12 }: FloatingLightsProps) {
  const reducedMotion = useReducedMotion();
  const [lights, setLights] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    // Variety of dreamy light colors
    const lightColors = [
      "rgba(255,255,255,0.9)",
      "rgba(255,255,255,0.7)",
      "rgba(251,207,232,0.6)", // Pink tint
      "rgba(221,214,254,0.6)", // Lavender tint
      "rgba(196,181,253,0.5)", // Purple tint
    ];

    const generated = Array.from({ length: lightCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 10,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 10,
      color: lightColors[Math.floor(Math.random() * lightColors.length)],
    }));
    setLights(generated);
  }, [lightCount]);

  if (reducedMotion || lights.length === 0) return null;

  return (
    <div className="absolute inset-0" style={{ zIndex: 7 }}>
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute rounded-full"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: light.size,
            height: light.size,
            background: `radial-gradient(circle, ${light.color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${light.size * 3}px ${light.color.replace(/[\d.]+\)$/, "0.5)")}`,
          }}
          animate={{
            y: [0, -60, -120, -60, 0],
            opacity: [0.3, 0.8, 0.5, 0.9, 0.3],
            scale: [1, 1.4, 0.8, 1.2, 1],
          }}
          transition={{
            duration: light.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: light.delay,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// VIGNETTE OVERLAY - Cinematic depth
// ============================================
function VignetteOverlay() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 8,
        background: `radial-gradient(
          ellipse 80% 80% at 50% 50%,
          transparent 0%,
          transparent 50%,
          rgba(124, 58, 237, 0.08) 80%,
          rgba(91, 33, 182, 0.15) 100%
        )`,
      }}
    />
  );
}

// ============================================
// NOISE OVERLAY - Premium texture
// ============================================
function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 9,
        opacity: 0.06,
        mixBlendMode: "overlay",
        backgroundImage: `url("/images/textures/noise-grain.png")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

export default BackgroundSystem;
