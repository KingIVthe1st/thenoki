"use client";

import { useEffect, useRef, ReactNode, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useGyroscope } from "@/hooks/useGyroscope";

// ============================================
// GYROSCOPE PARALLAX - Mobile Tilt Magic
// ============================================
// Creates immersive parallax by responding to device tilt:
// - Tilting phone moves background layers at different speeds
// - Creates depth illusion like looking through a window
// - Automatically detects mobile and requests permission

interface GyroscopeContextType {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  isActive: boolean;
  enable: () => Promise<boolean>;
}

const GyroscopeContext = createContext<GyroscopeContextType | null>(null);

export function useGyroscopeParallax() {
  return useContext(GyroscopeContext);
}

interface GyroscopeProviderProps {
  children: ReactNode;
  maxOffset?: number; // Max pixels to move (default 30)
}

export function GyroscopeProvider({
  children,
  maxOffset = 30,
}: GyroscopeProviderProps) {
  const { beta, gamma, isSupported, isPermissionGranted, requestPermission } =
    useGyroscope();

  // Raw motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Smooth springs for natural movement
  const x = useSpring(rawX, { damping: 30, stiffness: 100 });
  const y = useSpring(rawY, { damping: 30, stiffness: 100 });

  // Update motion values when gyroscope data changes
  useEffect(() => {
    if (!isPermissionGranted) return;

    // gamma controls left-right (x axis)
    // beta controls up-down (y axis)
    rawX.set(gamma * maxOffset);
    rawY.set(beta * maxOffset);
  }, [beta, gamma, maxOffset, rawX, rawY, isPermissionGranted]);

  const isActive = isSupported && isPermissionGranted;

  return (
    <GyroscopeContext.Provider
      value={{ x, y, isActive, enable: requestPermission }}
    >
      {children}
    </GyroscopeContext.Provider>
  );
}

// Parallax layer component - applies tilt-based transform
interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number; // 0-1, higher = more movement
  className?: string;
}

export function ParallaxLayer({
  children,
  depth = 0.5,
  className = "",
}: ParallaxLayerProps) {
  const context = useGyroscopeParallax();

  if (!context || !context.isActive) {
    // No gyroscope available, render children without parallax
    return <div className={className}>{children}</div>;
  }

  const { x, y } = context;

  return (
    <motion.div
      className={className}
      style={{
        x: x.get() * depth,
        y: y.get() * depth,
      }}
    >
      {children}
    </motion.div>
  );
}

// Button to enable gyroscope (for iOS permission request)
export function GyroscopeEnableButton({
  className = "",
}: {
  className?: string;
}) {
  const context = useGyroscopeParallax();
  const { isSupported, isPermissionGranted, requestPermission } =
    useGyroscope();

  if (!isSupported || isPermissionGranted) {
    return null; // Don't show if not supported or already enabled
  }

  const handleEnable = async () => {
    await requestPermission();
  };

  return (
    <motion.button
      onClick={handleEnable}
      className={`
        px-4 py-2 rounded-xl
        bg-white/60 backdrop-blur-md
        border border-white/80
        text-purple-700 font-medium text-sm
        hover:bg-white/80 transition-all
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center gap-2">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <circle cx="12" cy="18" r="1" />
        </svg>
        Enable Tilt Effects
      </span>
    </motion.button>
  );
}

// Hook for use in custom components
export function useParallaxOffset(depth: number = 0.5) {
  const context = useGyroscopeParallax();

  if (!context || !context.isActive) {
    return { x: 0, y: 0, isActive: false };
  }

  return {
    x: context.x.get() * depth,
    y: context.y.get() * depth,
    isActive: true,
  };
}

export default GyroscopeProvider;
