"use client";

// ============================================
// NOISE OVERLAY - Premium Film Grain Texture
// ============================================
// This subtle noise texture is the SECRET to premium feel.
// It creates visual coherence, reduces banding in gradients,
// and adds that "expensive camera" film grain aesthetic.
//
// Technique: CSS-only using SVG filters - no image required!
// The filter generates fractal noise at runtime.

export function NoiseOverlay() {
  return (
    <>
      {/* SVG Filter Definition - Creates the noise pattern */}
      <svg
        className="absolute w-0 h-0"
        aria-hidden="true"
        style={{ visibility: "hidden" }}
      >
        <defs>
          <filter id="noise-filter" x="0%" y="0%" width="100%" height="100%">
            {/* Generate fractal noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              seed="1"
              stitchTiles="stitch"
              result="noise"
            />
            {/* Convert to grayscale */}
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="graynoise"
            />
            {/* Blend with very low opacity */}
            <feComponentTransfer in="graynoise" result="finalnoise">
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      {/* Noise Layer - Covers entire viewport */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 100,
          // Apply the SVG noise filter
          filter: "url(#noise-filter)",
          // Full coverage
          width: "100vw",
          height: "100vh",
          // Slight opacity for subtlety
          opacity: 0.4,
          // Blend mode for natural integration
          mixBlendMode: "overlay",
          // Ensure it doesn't block interactions
          pointerEvents: "none",
          // Prevent any scrolling issues
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />

      {/* Secondary noise layer for extra depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 101,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

export default NoiseOverlay;
