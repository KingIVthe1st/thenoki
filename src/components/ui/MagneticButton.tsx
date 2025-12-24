"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { useMagneticEffect } from "@/hooks/useMousePosition";
import { springs } from "@/lib/spring-configs";

type ButtonVariant = "primary" | "secondary" | "pink" | "ghost";

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  magneticStrength?: number;
  glowOnHover?: boolean;
  children: React.ReactNode;
}

const buttonStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-violet-600 to-purple-700
    text-white font-semibold
    shadow-[0_4px_12px_rgba(139,92,246,0.4),0_8px_24px_rgba(139,92,246,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]
    hover:shadow-[0_6px_16px_rgba(139,92,246,0.5),0_12px_32px_rgba(139,92,246,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
  `,
  secondary: `
    bg-white/90 text-purple-900
    border-2 border-purple-200
    hover:bg-white hover:border-purple-300
    shadow-[0_4px_12px_rgba(139,92,246,0.1),0_8px_24px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]
  `,
  pink: `
    bg-gradient-to-r from-pink-500 to-rose-500
    text-white font-semibold
    shadow-[0_4px_12px_rgba(236,72,153,0.4),0_8px_24px_rgba(236,72,153,0.25),inset_0_1px_0_rgba(255,255,255,0.2)]
    hover:shadow-[0_6px_16px_rgba(236,72,153,0.5),0_12px_32px_rgba(236,72,153,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]
  `,
  ghost: `
    bg-white/30 backdrop-blur-sm
    text-purple-900 font-medium
    border border-white/50
    hover:bg-white/50
    shadow-[0_4px_12px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]
  `,
};

const glowStyles: Record<ButtonVariant, string> = {
  primary:
    "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.25)",
  secondary:
    "0 0 20px rgba(139, 92, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.1)",
  pink: "0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.25)",
  ghost:
    "0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.15)",
};

export function MagneticButton({
  variant = "primary",
  magneticStrength = 0.35,
  glowOnHover = true,
  children,
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const magneticOffset = useMagneticEffect(ref, magneticStrength);

  return (
    <motion.button
      ref={ref}
      className={`
        relative px-7 py-3.5 rounded-full
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
        ${buttonStyles[variant]}
        ${className}
      `}
      animate={{
        x: magneticOffset.x,
        y: magneticOffset.y,
      }}
      transition={springs.magnetic}
      whileHover={{
        scale: 1.05,
        boxShadow: glowOnHover ? glowStyles[variant] : undefined,
      }}
      whileTap={{
        scale: 0.97,
      }}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={false}
      >
        <motion.span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
            transform: "translateX(-100%)",
          }}
          whileHover={{
            transform: "translateX(100%)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        />
      </motion.span>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

// Icon button variant
interface MagneticIconButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "ref"
> {
  magneticStrength?: number;
  children: React.ReactNode;
}

export function MagneticIconButton({
  magneticStrength = 0.4,
  children,
  className = "",
  ...props
}: MagneticIconButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const magneticOffset = useMagneticEffect(ref, magneticStrength);

  return (
    <motion.button
      ref={ref}
      className={`
        w-12 h-12 rounded-full
        bg-white/40 backdrop-blur-sm
        flex items-center justify-center
        text-purple-800
        border border-white/50
        hover:bg-white/60
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-400
        shadow-[0_4px_12px_rgba(139,92,246,0.1),0_8px_20px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]
        ${className}
      `}
      animate={{
        x: magneticOffset.x,
        y: magneticOffset.y,
      }}
      transition={springs.magnetic}
      whileHover={{
        scale: 1.15,
        boxShadow:
          "0 0 20px rgba(255, 255, 255, 0.5), 0 8px 24px rgba(139, 92, 246, 0.2)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default MagneticButton;
