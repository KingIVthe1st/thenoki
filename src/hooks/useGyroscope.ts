"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ============================================
// GYROSCOPE HOOK - Mobile Parallax Magic
// ============================================
// Accesses device orientation for tilt-based parallax:
// - beta: front-back tilt (-180 to 180, 0 = flat)
// - gamma: left-right tilt (-90 to 90, 0 = flat)
// - iOS 13+ requires explicit permission request

interface GyroscopeData {
  beta: number; // Front-back tilt (-180 to 180)
  gamma: number; // Left-right tilt (-90 to 90)
  isSupported: boolean;
  isPermissionGranted: boolean;
  requestPermission: () => Promise<boolean>;
}

// Normalize values to -1 to 1 range
function normalizeAngle(value: number, max: number): number {
  return Math.max(-1, Math.min(1, value / max));
}

export function useGyroscope(): GyroscopeData {
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const smoothBetaRef = useRef(0);
  const smoothGammaRef = useRef(0);

  // Check if device orientation is supported
  useEffect(() => {
    const supported =
      typeof window !== "undefined" && "DeviceOrientationEvent" in window;
    setIsSupported(supported);

    // On Android, permission is usually auto-granted
    if (
      supported &&
      typeof (DeviceOrientationEvent as any).requestPermission !== "function"
    ) {
      setIsPermissionGranted(true);
    }
  }, []);

  // Handle orientation changes with smoothing
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    const rawBeta = event.beta ?? 0;
    const rawGamma = event.gamma ?? 0;

    // Smooth the values for less jittery movement
    const smoothFactor = 0.15;
    smoothBetaRef.current += (rawBeta - smoothBetaRef.current) * smoothFactor;
    smoothGammaRef.current +=
      (rawGamma - smoothGammaRef.current) * smoothFactor;

    // Normalize to -1 to 1 range
    // Beta: use 45 degrees as max tilt (phone tilted forward/back)
    // Gamma: use 30 degrees as max tilt (phone tilted left/right)
    setBeta(normalizeAngle(smoothBetaRef.current - 45, 45)); // Subtract 45 to center at "holding phone" angle
    setGamma(normalizeAngle(smoothGammaRef.current, 30));
  }, []);

  // Request permission (required on iOS 13+)
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    // Check if requestPermission exists (iOS 13+)
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permission === "granted") {
          setIsPermissionGranted(true);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }

    // Android or older iOS - permission is auto-granted
    setIsPermissionGranted(true);
    return true;
  }, [isSupported]);

  // Add event listener when permission is granted
  useEffect(() => {
    if (!isSupported || !isPermissionGranted) return;

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [isSupported, isPermissionGranted, handleOrientation]);

  return {
    beta,
    gamma,
    isSupported,
    isPermissionGranted,
    requestPermission,
  };
}

export default useGyroscope;
