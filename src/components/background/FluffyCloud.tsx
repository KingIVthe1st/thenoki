"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

// ============================================
// FLUFFY CLOUD v4.0 - PERFORMANCE OPTIMIZED
// ============================================
// 28 CURATED CLOUDS (from 55) - 50% reduction
// TECHNIQUE: Group animation - 3 parallax containers
// Only containers have willChange - individual clouds are static
// CHROME FIX: No filter animations, blur applied statically

// SVG Noise Filter - adds organic turbulent texture to clouds
export function CloudNoiseFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Subtle turbulence for soft cloud edges */}
        <filter
          id="cloud-noise-soft"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="4"
            seed="1"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Medium turbulence for mid-layer clouds */}
        <filter
          id="cloud-noise-medium"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            seed="42"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Hero cloud filter - extra soft and majestic */}
        <filter
          id="cloud-noise-hero"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="6"
            seed="77"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

// ============================================
// CLOUD LAYER TYPES
// ============================================
interface CloudConfig {
  id: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  width: string;
  height: string;
  blur: number;
  opacity: number;
  gradients: Array<{
    cx: string;
    cy: string;
    rx: string;
    ry: string;
    colors: string[];
  }>;
  shadowBlobs?: string;
}

// ============================================
// CURATED CLOUDS - 28 total (was 55)
// ============================================

// HERO CLOUDS - 3 massive statement pieces
const HERO_CLOUDS: CloudConfig[] = [
  {
    id: "hero-1",
    top: "-25%",
    left: "-20%",
    width: "120%",
    height: "80%",
    blur: 100,
    opacity: 0.65,
    gradients: [
      {
        cx: "40%",
        cy: "45%",
        rx: "55%",
        ry: "50%",
        colors: [
          "rgba(255,255,255,0.45)",
          "rgba(221,214,254,0.25)",
          "transparent",
        ],
      },
      {
        cx: "70%",
        cy: "55%",
        rx: "45%",
        ry: "40%",
        colors: [
          "rgba(251,207,232,0.35)",
          "rgba(196,181,253,0.18)",
          "transparent",
        ],
      },
      {
        cx: "25%",
        cy: "60%",
        rx: "40%",
        ry: "35%",
        colors: ["rgba(255,255,255,0.4)", "transparent"],
      },
    ],
    shadowBlobs:
      "-150px 80px 200px 120px rgba(255,255,255,0.2), 200px -60px 180px 100px rgba(251,207,232,0.18)",
  },
  {
    id: "hero-2",
    top: "-15%",
    right: "-25%",
    width: "110%",
    height: "75%",
    blur: 100,
    opacity: 0.6,
    gradients: [
      {
        cx: "55%",
        cy: "50%",
        rx: "50%",
        ry: "45%",
        colors: [
          "rgba(221,214,254,0.4)",
          "rgba(196,181,253,0.2)",
          "transparent",
        ],
      },
      {
        cx: "30%",
        cy: "55%",
        rx: "40%",
        ry: "35%",
        colors: ["rgba(255,255,255,0.35)", "transparent"],
      },
    ],
  },
  {
    id: "hero-3",
    bottom: "-20%",
    left: "-15%",
    width: "100%",
    height: "70%",
    blur: 100,
    opacity: 0.55,
    gradients: [
      {
        cx: "45%",
        cy: "60%",
        rx: "50%",
        ry: "45%",
        colors: [
          "rgba(251,207,232,0.4)",
          "rgba(244,114,182,0.2)",
          "transparent",
        ],
      },
      {
        cx: "65%",
        cy: "45%",
        rx: "35%",
        ry: "30%",
        colors: ["rgba(255,255,255,0.38)", "transparent"],
      },
    ],
  },
];

// FAR LAYER - 5 clouds (was 8)
const FAR_CLOUDS: CloudConfig[] = [
  {
    id: "far-1",
    top: "-10%",
    left: "-8%",
    width: "85%",
    height: "55%",
    blur: 90,
    opacity: 0.5,
    gradients: [
      {
        cx: "30%",
        cy: "40%",
        rx: "45%",
        ry: "40%",
        colors: [
          "rgba(255,255,255,0.5)",
          "rgba(221,214,254,0.3)",
          "transparent",
        ],
      },
      {
        cx: "70%",
        cy: "50%",
        rx: "40%",
        ry: "35%",
        colors: [
          "rgba(251,207,232,0.4)",
          "rgba(196,181,253,0.2)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "far-2",
    top: "0%",
    right: "-12%",
    width: "80%",
    height: "52%",
    blur: 90,
    opacity: 0.48,
    gradients: [
      {
        cx: "60%",
        cy: "45%",
        rx: "50%",
        ry: "45%",
        colors: [
          "rgba(221,214,254,0.45)",
          "rgba(196,181,253,0.25)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "far-3",
    top: "15%",
    left: "25%",
    width: "60%",
    height: "45%",
    blur: 85,
    opacity: 0.45,
    gradients: [
      {
        cx: "50%",
        cy: "50%",
        rx: "40%",
        ry: "35%",
        colors: [
          "rgba(255,255,255,0.42)",
          "rgba(252,231,243,0.22)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "far-4",
    bottom: "25%",
    left: "-5%",
    width: "50%",
    height: "35%",
    blur: 88,
    opacity: 0.46,
    gradients: [
      {
        cx: "40%",
        cy: "50%",
        rx: "35%",
        ry: "30%",
        colors: ["rgba(221,214,254,0.4)", "transparent"],
      },
    ],
  },
  {
    id: "far-5",
    bottom: "15%",
    right: "0%",
    width: "55%",
    height: "38%",
    blur: 90,
    opacity: 0.44,
    gradients: [
      {
        cx: "50%",
        cy: "50%",
        rx: "40%",
        ry: "35%",
        colors: [
          "rgba(252,231,243,0.38)",
          "rgba(251,207,232,0.18)",
          "transparent",
        ],
      },
    ],
  },
];

// MID LAYER - 8 clouds (was 18 mid+mid-far+mid-near)
const MID_CLOUDS: CloudConfig[] = [
  {
    id: "mid-1",
    top: "22%",
    left: "-6%",
    width: "62%",
    height: "48%",
    blur: 55,
    opacity: 0.72,
    gradients: [
      {
        cx: "35%",
        cy: "45%",
        rx: "40%",
        ry: "38%",
        colors: [
          "rgba(255,255,255,0.65)",
          "rgba(255,255,255,0.35)",
          "transparent",
        ],
      },
      {
        cx: "60%",
        cy: "55%",
        rx: "32%",
        ry: "28%",
        colors: [
          "rgba(252,231,243,0.55)",
          "rgba(251,207,232,0.25)",
          "transparent",
        ],
      },
    ],
    shadowBlobs:
      "-80px 40px 100px 60px rgba(255,255,255,0.3), 120px -30px 80px 50px rgba(251,207,232,0.25)",
  },
  {
    id: "mid-2",
    top: "28%",
    right: "-8%",
    width: "68%",
    height: "52%",
    blur: 55,
    opacity: 0.7,
    gradients: [
      {
        cx: "55%",
        cy: "50%",
        rx: "42%",
        ry: "38%",
        colors: [
          "rgba(251,207,232,0.6)",
          "rgba(244,114,182,0.3)",
          "transparent",
        ],
      },
      {
        cx: "30%",
        cy: "45%",
        rx: "30%",
        ry: "26%",
        colors: ["rgba(255,255,255,0.55)", "transparent"],
      },
    ],
  },
  {
    id: "mid-3",
    top: "38%",
    left: "-2%",
    width: "58%",
    height: "48%",
    blur: 45,
    opacity: 0.75,
    gradients: [
      {
        cx: "40%",
        cy: "50%",
        rx: "38%",
        ry: "35%",
        colors: [
          "rgba(255,255,255,0.7)",
          "rgba(255,255,255,0.4)",
          "transparent",
        ],
      },
      {
        cx: "65%",
        cy: "45%",
        rx: "28%",
        ry: "25%",
        colors: [
          "rgba(252,231,243,0.6)",
          "rgba(251,207,232,0.3)",
          "transparent",
        ],
      },
    ],
    shadowBlobs: "-60px 30px 70px 45px rgba(255,255,255,0.35)",
  },
  {
    id: "mid-4",
    bottom: "35%",
    left: "-4%",
    width: "55%",
    height: "44%",
    blur: 50,
    opacity: 0.68,
    gradients: [
      {
        cx: "42%",
        cy: "52%",
        rx: "36%",
        ry: "32%",
        colors: [
          "rgba(255,255,255,0.62)",
          "rgba(251,207,232,0.3)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "mid-5",
    bottom: "32%",
    right: "-5%",
    width: "58%",
    height: "45%",
    blur: 52,
    opacity: 0.66,
    gradients: [
      {
        cx: "55%",
        cy: "50%",
        rx: "40%",
        ry: "36%",
        colors: [
          "rgba(251,207,232,0.58)",
          "rgba(244,114,182,0.28)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "mid-6",
    top: "45%",
    right: "10%",
    width: "48%",
    height: "38%",
    blur: 48,
    opacity: 0.7,
    gradients: [
      {
        cx: "52%",
        cy: "48%",
        rx: "36%",
        ry: "32%",
        colors: [
          "rgba(255,255,255,0.68)",
          "rgba(251,207,232,0.35)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "mid-7",
    top: "42%",
    left: "22%",
    width: "38%",
    height: "28%",
    blur: 60,
    opacity: 0.55,
    gradients: [
      {
        cx: "50%",
        cy: "50%",
        rx: "35%",
        ry: "30%",
        colors: [
          "rgba(56,189,248,0.35)",
          "rgba(139,92,246,0.15)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "mid-8",
    bottom: "22%",
    right: "28%",
    width: "32%",
    height: "24%",
    blur: 55,
    opacity: 0.5,
    gradients: [
      {
        cx: "50%",
        cy: "50%",
        rx: "32%",
        ry: "28%",
        colors: [
          "rgba(167,139,250,0.4)",
          "rgba(139,92,246,0.2)",
          "transparent",
        ],
      },
    ],
  },
];

// NEAR LAYER - 7 clouds (was 15 near+foreground)
const NEAR_CLOUDS: CloudConfig[] = [
  {
    id: "near-1",
    bottom: "3%",
    left: "-12%",
    width: "72%",
    height: "52%",
    blur: 28,
    opacity: 0.85,
    gradients: [
      {
        cx: "35%",
        cy: "55%",
        rx: "40%",
        ry: "38%",
        colors: [
          "rgba(255,255,255,0.8)",
          "rgba(255,255,255,0.5)",
          "rgba(252,231,243,0.2)",
          "transparent",
        ],
      },
      {
        cx: "60%",
        cy: "45%",
        rx: "32%",
        ry: "28%",
        colors: [
          "rgba(252,231,243,0.7)",
          "rgba(251,207,232,0.4)",
          "transparent",
        ],
      },
    ],
    shadowBlobs:
      "-100px 50px 90px 60px rgba(255,255,255,0.4), 150px -40px 70px 50px rgba(251,207,232,0.35)",
  },
  {
    id: "near-2",
    bottom: "8%",
    right: "-8%",
    width: "68%",
    height: "48%",
    blur: 28,
    opacity: 0.82,
    gradients: [
      {
        cx: "55%",
        cy: "50%",
        rx: "42%",
        ry: "38%",
        colors: [
          "rgba(251,207,232,0.75)",
          "rgba(244,114,182,0.4)",
          "transparent",
        ],
      },
      {
        cx: "30%",
        cy: "55%",
        rx: "30%",
        ry: "26%",
        colors: ["rgba(255,255,255,0.7)", "transparent"],
      },
    ],
    shadowBlobs: "-80px 40px 70px 50px rgba(255,255,255,0.35)",
  },
  {
    id: "near-3",
    bottom: "12%",
    left: "25%",
    width: "50%",
    height: "40%",
    blur: 25,
    opacity: 0.78,
    gradients: [
      {
        cx: "48%",
        cy: "52%",
        rx: "36%",
        ry: "32%",
        colors: [
          "rgba(255,255,255,0.78)",
          "rgba(221,214,254,0.4)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "near-4",
    bottom: "-2%",
    left: "8%",
    width: "58%",
    height: "38%",
    blur: 20,
    opacity: 0.9,
    gradients: [
      {
        cx: "40%",
        cy: "60%",
        rx: "35%",
        ry: "32%",
        colors: [
          "rgba(255,255,255,0.7)",
          "rgba(255,255,255,0.4)",
          "transparent",
        ],
      },
      {
        cx: "65%",
        cy: "50%",
        rx: "28%",
        ry: "24%",
        colors: ["rgba(252,231,243,0.6)", "transparent"],
      },
    ],
  },
  {
    id: "near-5",
    bottom: "-6%",
    right: "18%",
    width: "48%",
    height: "33%",
    blur: 20,
    opacity: 0.88,
    gradients: [
      {
        cx: "50%",
        cy: "55%",
        rx: "38%",
        ry: "34%",
        colors: [
          "rgba(251,207,232,0.65)",
          "rgba(244,114,182,0.3)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "near-6",
    bottom: "0%",
    left: "-5%",
    width: "45%",
    height: "30%",
    blur: 18,
    opacity: 0.92,
    gradients: [
      {
        cx: "55%",
        cy: "60%",
        rx: "34%",
        ry: "30%",
        colors: [
          "rgba(255,255,255,0.68)",
          "rgba(252,231,243,0.32)",
          "transparent",
        ],
      },
    ],
  },
  {
    id: "near-7",
    bottom: "-4%",
    right: "-2%",
    width: "50%",
    height: "32%",
    blur: 18,
    opacity: 0.9,
    gradients: [
      {
        cx: "45%",
        cy: "55%",
        rx: "36%",
        ry: "32%",
        colors: [
          "rgba(251,207,232,0.62)",
          "rgba(255,255,255,0.28)",
          "transparent",
        ],
      },
    ],
  },
];

// ============================================
// FLUFFY CLOUDSCAPE - OPTIMIZED ARCHITECTURE
// ============================================
// 3 parallax containers (willChange only on containers)
// Individual clouds are static within their container

export function FluffyCloudscape() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 3,
        // Enable 3D context for better layer compositing
        perspective: "1000px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* SVG Filters - invisible but critical for organic edges */}
      <CloudNoiseFilter />

      {/* HERO CLOUDS CONTAINER - z: 6 */}
      <CloudContainer
        clouds={HERO_CLOUDS}
        zIndex={6}
        animation="cloud-breathe-deep"
        duration={140}
        reducedMotion={reducedMotion}
        parallaxClass="parallax-mid"
      />

      {/* FAR LAYER CONTAINER - z: 3 */}
      <CloudContainer
        clouds={FAR_CLOUDS}
        zIndex={3}
        animation="cloud-drift-majestic"
        duration={120}
        reducedMotion={reducedMotion}
        parallaxClass="parallax-far"
        delay={-30}
      />

      {/* MID LAYER CONTAINER - z: 4 */}
      <CloudContainer
        clouds={MID_CLOUDS}
        zIndex={4}
        animation="cloud-float-organic"
        duration={80}
        reducedMotion={reducedMotion}
        parallaxClass="parallax-mid"
        delay={-15}
      />

      {/* NEAR LAYER CONTAINER - z: 5 */}
      <CloudContainer
        clouds={NEAR_CLOUDS}
        zIndex={5}
        animation="cloud-float-gentle"
        duration={45}
        reducedMotion={reducedMotion}
        parallaxClass="parallax-near"
        delay={-8}
      />

      {/* Dreamy ambient glow overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 7,
          background: `radial-gradient(
            ellipse 140% 100% at 50% 55%,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(251, 207, 232, 0.22) 25%,
            rgba(221, 214, 254, 0.15) 50%,
            transparent 70%
          )`,
          mixBlendMode: "soft-light",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ============================================
// CLOUD CONTAINER - Animated Group
// ============================================
// Only the container has willChange - not individual clouds
// This dramatically reduces compositor layer count

function CloudContainer({
  clouds,
  zIndex,
  animation,
  duration,
  reducedMotion,
  parallaxClass,
  delay = 0,
}: {
  clouds: CloudConfig[];
  zIndex: number;
  animation: string;
  duration: number;
  reducedMotion: boolean;
  parallaxClass: string;
  delay?: number;
}) {
  return (
    <div
      className={
        reducedMotion ? "absolute inset-0" : `absolute inset-0 ${parallaxClass}`
      }
      style={{
        zIndex,
        // PERFORMANCE: willChange only on container
        willChange: reducedMotion ? "auto" : "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        // Chrome sub-pixel fix
        transform: "translateZ(0) rotate(0.01deg)",
        // Container animation
        animation: reducedMotion
          ? "none"
          : `${animation} ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      {clouds.map((cloud) => (
        <StaticCloud key={cloud.id} config={cloud} />
      ))}
    </div>
  );
}

// ============================================
// STATIC CLOUD - No animation, no willChange
// ============================================
// Clouds are purely static divs with gradients
// Animation happens at container level

function StaticCloud({ config }: { config: CloudConfig }) {
  // Build compound radial gradients
  const compoundGradient = config.gradients
    .map((g) => {
      const colorStops = g.colors
        .map((color, i) => {
          const percent = (i / (g.colors.length - 1)) * 100;
          return `${color} ${percent}%`;
        })
        .join(", ");
      return `radial-gradient(ellipse ${g.rx} ${g.ry} at ${g.cx} ${g.cy}, ${colorStops})`;
    })
    .join(", ");

  return (
    <div
      className="absolute"
      style={{
        top: config.top,
        left: config.left,
        bottom: config.bottom,
        right: config.right,
        width: config.width,
        height: config.height,
        opacity: config.opacity,
        background: compoundGradient,
        // STATIC blur - never animated
        filter: `blur(${config.blur}px)`,
        boxShadow: config.shadowBlobs || "none",
        // NO willChange on individual clouds
        pointerEvents: "none",
      }}
    />
  );
}

export default FluffyCloudscape;
