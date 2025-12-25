"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  scrollReveal,
  scrollRevealLeft,
  scrollRevealRight,
  scrollRevealScale,
} from "@/lib/animations";

type AnimationType = "up" | "left" | "right" | "scale" | "fade";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const animationVariants: Record<AnimationType, Variants> = {
  up: scrollReveal,
  left: scrollRevealLeft,
  right: scrollRevealRight,
  scale: scrollRevealScale,
  fade: {
    offscreen: { opacity: 0 },
    onscreen: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    },
  },
};

export function AnimatedSection({
  children,
  animation = "up",
  delay = 0,
  className = "",
  once = true,
  threshold = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="offscreen"
      animate={isInView ? "onscreen" : "offscreen"}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for child animations
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // NOTE: Removed filter:blur() - Chrome can't GPU-accelerate filter animations
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating element with continuous animation
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className = "",
  yOffset = 20,
  duration = 6,
  delay = 0,
}: FloatingElementProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation (word by word)
interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export function TextReveal({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return <div className={className}>{text}</div>;
  }

  return (
    <motion.div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.25em] ${wordClassName}`}
          initial={{ opacity: 0, y: 30, rotateX: -45 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, rotateX: 0 }
              : { opacity: 0, y: 30, rotateX: -45 }
          }
          transition={{
            duration: 0.7,
            delay: delay + i * 0.08,
            ease: [0.19, 1, 0.22, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedSection;
