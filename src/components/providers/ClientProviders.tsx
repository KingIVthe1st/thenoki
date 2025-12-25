"use client";

import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { AudioProvider } from "@/components/audio/AudioEngine";
import { GyroscopeProvider } from "@/components/effects/GyroscopeParallax";
import { ForegroundWisps } from "@/components/background/ForegroundWisps";
import { NoiseOverlay } from "@/components/background/NoiseOverlay";

// ============================================
// CLIENT PROVIDERS - Level 20 Dreamscape
// ============================================
// Wraps all client-side providers and effects
// This is needed because layout.tsx is a Server Component
// and can't use dynamic() with ssr: false
//
// LAYER ARCHITECTURE:
// - BackgroundSystem (z: 0-13) → Gradient, rays, clouds, sparkles
// - Page Content (z: 15-20) → Interactive UI elements
// - ForegroundWisps (z: 25) → "Fog Sandwich" effect
// - Header (z: 50+) → Navigation
// - NoiseOverlay (z: 100) → Premium film grain

// Dynamic import for CustomCursor (client-only, no SSR)
const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor"),
  { ssr: false },
);

// Dynamic import for PixieDustTrail (client-only, no SSR)
const PixieDustTrail = dynamic(
  () => import("@/components/effects/PixieDustTrail"),
  { ssr: false },
);

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AudioProvider>
      <GyroscopeProvider maxOffset={25}>
        <SmoothScrollProvider>
          {/* Custom cursor - desktop only, dynamically loaded */}
          <CustomCursor />
          {/* Pixie dust trail - magical sparkles following cursor */}
          <PixieDustTrail />
          {children}
          {/* LEVEL 20 DREAMSCAPE: Foreground effects */}
          {/* "Fog Sandwich" - wisps IN FRONT of content for volumetric depth */}
          <ForegroundWisps />
          {/* Premium film grain - that "expensive camera" feel */}
          <NoiseOverlay />
        </SmoothScrollProvider>
      </GyroscopeProvider>
    </AudioProvider>
  );
}

export default ClientProviders;
