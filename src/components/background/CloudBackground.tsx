"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useState } from "react";
import Image from "next/image";

// ============================================
// NOISE TEXTURE OVERLAY - The secret to premium
// ============================================
const NoiseOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none"
    style={{
      zIndex: 1000,
      opacity: 0.06,
      mixBlendMode: "overlay",
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

// ============================================
// VIGNETTE OVERLAY - Cinematic depth
// ============================================
const VignetteOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none"
    style={{
      zIndex: 999,
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

// ============================================
// ANIMATED AURORA GRADIENT MESH
// ============================================
const AuroraMesh = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }} // Above light rays (1)
    >
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
};

// ============================================
// PARALLAX CLOUD LAYER WITH REAL IMAGES
// ============================================
interface CloudImageLayerProps {
  src: string;
  depth: number; // 1 = far (slow), 3 = near (fast)
  opacity?: number;
  blendMode?: string;
  additionalStyle?: React.CSSProperties;
}

const CloudImageLayer = ({
  src,
  depth,
  opacity = 0.8,
  blendMode = "normal",
  additionalStyle = {},
}: CloudImageLayerProps) => {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  // Parallax intensity based on depth
  const parallaxMultiplier = depth === 1 ? 80 : depth === 2 ? 160 : 280;
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -parallaxMultiplier]);
  const y = useSpring(rawY, { stiffness: 50, damping: 20 });

  // Horizontal drift animation
  const [driftX, setDriftX] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const driftSpeed = depth === 1 ? 0.3 : depth === 2 ? 0.5 : 0.8;
    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const drift = Math.sin(elapsed * driftSpeed * 0.1) * (20 / depth);
      setDriftX(drift);
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [depth, reducedMotion]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{
        y: reducedMotion ? 0 : y,
        x: driftX,
        zIndex: depth + 2, // depth 1=3, depth 2=4, depth 3=5 (above aurora at 2)
        opacity,
        mixBlendMode: blendMode as any,
        ...additionalStyle,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        style={{
          objectPosition: "center",
          transform: `scale(${1.1 + (3 - depth) * 0.05})`,
        }}
        priority={depth === 2}
      />
    </motion.div>
  );
};

// ============================================
// FLOATING LIGHT PARTICLES
// ============================================
const FloatingLights = () => {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reducedMotion) return null;

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 6,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 10,
  }));

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 8 }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.5)`,
          }}
          animate={{
            y: [0, -50, -100, -50, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.3, 0.8, 0.5, 0.9, 0.3],
            scale: [1, 1.3, 0.9, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// GRADIENT SKY BASE - Absolute lowest layer
// Using z-index: 0 (positive) to avoid stacking context issues
// ============================================
const GradientSky = () => (
  <div
    className="fixed inset-0"
    style={{
      zIndex: 0,
      width: "100vw",
      height: "100vh",
      background: `linear-gradient(165deg, #7C3AED 0%, #8B5CF6 5%, #A78BFA 12%, #C4B5FD 22%, #DDD6FE 35%, #EDE9FE 48%, #F5F3FF 58%, #FDF4FF 68%, #FDF2F8 78%, #FCE7F3 88%, #FBCFE8 100%)`,
    }}
  />
);

// ============================================
// LIGHT RAYS / GOD RAYS EFFECT
// ============================================
const LightRays = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }} // Above gradient (0)
    >
      <motion.div
        className="absolute"
        style={{
          top: "-20%",
          left: "10%",
          width: "80%",
          height: "100%",
          background: `
            conic-gradient(
              from 180deg at 50% 0%,
              transparent 0deg,
              rgba(255, 255, 255, 0.03) 15deg,
              transparent 30deg,
              transparent 60deg,
              rgba(255, 255, 255, 0.02) 75deg,
              transparent 90deg,
              transparent 120deg,
              rgba(255, 255, 255, 0.025) 135deg,
              transparent 150deg,
              transparent 180deg,
              rgba(255, 255, 255, 0.02) 195deg,
              transparent 210deg,
              transparent 240deg,
              rgba(255, 255, 255, 0.03) 255deg,
              transparent 270deg,
              transparent 300deg,
              rgba(255, 255, 255, 0.02) 315deg,
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
    </div>
  );
};

// ============================================
// MAIN CLOUD BACKGROUND COMPONENT
// ============================================
export function CloudBackground() {
  return (
    <>
      {/* Base gradient sky */}
      <GradientSky />

      {/* Subtle light rays */}
      <LightRays />

      {/* Animated aurora gradient mesh */}
      <AuroraMesh />

      {/* Real cloud image layers with parallax */}
      <CloudImageLayer
        src="/images/clouds/cloud-distant.png"
        depth={1}
        opacity={0.7}
        blendMode="normal"
      />
      <CloudImageLayer
        src="/images/clouds/cloud-main.png"
        depth={2}
        opacity={0.85}
        blendMode="normal"
      />
      <CloudImageLayer
        src="/images/clouds/cloud-wisps.png"
        depth={3}
        opacity={0.6}
        blendMode="normal"
      />

      {/* Floating light particles */}
      <FloatingLights />

      {/* Vignette for cinematic depth */}
      <VignetteOverlay />

      {/* Premium noise texture overlay */}
      <NoiseOverlay />
    </>
  );
}

export default CloudBackground;
