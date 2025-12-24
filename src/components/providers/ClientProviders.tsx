"use client";

import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { AudioProvider } from "@/components/audio/AudioEngine";
import { GyroscopeProvider } from "@/components/effects/GyroscopeParallax";

// ============================================
// CLIENT PROVIDERS
// ============================================
// Wraps all client-side providers and effects
// This is needed because layout.tsx is a Server Component
// and can't use dynamic() with ssr: false

// Dynamic import for CustomCursor (client-only, no SSR)
const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor"),
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
          {children}
        </SmoothScrollProvider>
      </GyroscopeProvider>
    </AudioProvider>
  );
}

export default ClientProviders;
