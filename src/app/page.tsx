"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Premium Components - NEW Single Container Background System
import { BackgroundSystem } from "@/components/background/BackgroundSystem";
import { GlassCard } from "@/components/effects/GlassCard";
import {
  MagneticButton,
  MagneticIconButton,
} from "@/components/ui/MagneticButton";
import { JellyButton, JellyButtonSmall } from "@/components/ui/JellyButton";
import { AudioToggle } from "@/components/audio/AudioEngine";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
  TextReveal,
} from "@/components/animations/AnimatedSection";
import { EyeTrackingNoki } from "@/components/characters/EyeTrackingNoki";

// Icons
const HeartIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const GiftIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <rect x="5" y="12" width="14" height="9" rx="1" />
    <path d="M12 8v13" />
    <path d="M7.5 8a2.5 2.5 0 1 1 0-5C9 3 12 6 12 8" />
    <path d="M16.5 8a2.5 2.5 0 1 0 0-5C15 3 12 6 12 8" />
  </svg>
);

const ChatIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const InstagramIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const SparkleIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
  </svg>
);

// Navigation Component with Glass Effect
function Navigation() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
    >
      <GlassCard variant="frosted" className="mx-4 mt-4 lg:mx-8 !rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="font-script text-2xl lg:text-3xl text-[#1a0d2e] drop-shadow-sm">
                The Noki Ai
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <HeartIcon className="w-4 h-4 lg:w-5 lg:h-5 text-pink-500" />
              </motion.div>
            </motion.div>

            {/* Nav Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {["Features", "How It Works", "Characters", "About"].map(
                (item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[#2D1B4E] hover:text-[#1a0d2e] font-semibold transition-colors relative group"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
                  </motion.a>
                ),
              )}
            </div>

            {/* Audio Toggle + CTA Button */}
            <div className="flex items-center gap-3">
              <AudioToggle />
              <JellyButtonSmall variant="primary">
                Join Waitlist
              </JellyButtonSmall>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-24 lg:pt-32 pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left mb-12 lg:mb-0">
            {/* Logo Title */}
            <AnimatedSection animation="up" delay={0.1}>
              <h1 className="logo-text leading-[0.9] mb-4">
                <span className="text-[2.8rem] lg:text-[4rem] xl:text-[5rem] block">
                  The
                </span>
                <span className="text-[3.5rem] lg:text-[5rem] xl:text-[6.5rem] block -mt-2">
                  Noki Ai
                </span>
              </h1>
            </AnimatedSection>

            {/* Tagline */}
            <AnimatedSection animation="up" delay={0.2}>
              <p className="flex items-center justify-center lg:justify-start gap-2 text-[#4A2C7A] text-lg lg:text-xl font-semibold italic mb-6 drop-shadow-sm">
                <span className="font-script">
                  Introducing The Noki By Anoki Win
                </span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <HeartIcon className="w-5 h-5 text-pink-500" />
                </motion.span>
              </p>
            </AnimatedSection>

            {/* Coming Soon Badge */}
            <AnimatedSection animation="scale" delay={0.3}>
              <div className="flex justify-center lg:justify-start mb-8">
                <motion.span
                  className="coming-soon-badge text-xs lg:text-sm tracking-wider px-8 py-3"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 4px 15px rgba(255, 107, 157, 0.4)",
                      "0 8px 30px rgba(255, 107, 157, 0.6)",
                      "0 4px 15px rgba(255, 107, 157, 0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  COMING SOON
                </motion.span>
              </div>
            </AnimatedSection>

            {/* Value Proposition */}
            <AnimatedSection animation="up" delay={0.4}>
              <h2 className="heading-display text-3xl lg:text-5xl xl:text-6xl text-[#1a0d2e] mb-4">
                A Friend Who Truly Listens
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="up" delay={0.5}>
              <p className="text-[#2D1B4E] text-lg lg:text-xl leading-relaxed lg:max-w-lg mb-8 font-medium text-readable">
                Imagine a cuddly companion who remembers your child&apos;s
                favorite stories, grows alongside them, and turns every bedtime
                into an adventure. Noki isn&apos;t just a toy—it&apos;s a
                magical friendship.
              </p>
            </AnimatedSection>

            {/* CTA Buttons - JellyButton for primary, MagneticButton for secondary */}
            <AnimatedSection animation="up" delay={0.6}>
              <div className="flex gap-4 justify-center lg:justify-start mb-8">
                <JellyButton variant="primary" jellyIntensity={1.2}>
                  Join the Waitlist
                  <SparkleIcon className="w-4 h-4 ml-2" />
                </JellyButton>
                <JellyButton variant="secondary" jellyIntensity={0.8}>
                  See How It Works
                </JellyButton>
              </div>
            </AnimatedSection>

            {/* Feature Pills */}
            <StaggerContainer className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6">
              {[
                { icon: GiftIcon, text: "Surprise Character in Every Box" },
                { icon: ChatIcon, text: "Remembers & Learns Over Time" },
                { icon: PhoneIcon, text: "Safe Parent Dashboard" },
              ].map(({ icon: Icon, text }) => (
                <StaggerItem key={text}>
                  <motion.div
                    className="feature-pill"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{text}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column - Interactive Noki Character */}
          <div className="relative">
            <FloatingElement yOffset={15} duration={5}>
              <AnimatedSection animation="scale" delay={0.3}>
                <div className="relative w-full aspect-square max-w-[450px] xl:max-w-[500px] mx-auto">
                  {/* Decorative glow behind character */}
                  <motion.div
                    className="absolute -inset-12 rounded-full -z-10"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(0, 245, 255, 0.25) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(236, 72, 153, 0.15) 50%, transparent 70%)",
                      filter: "blur(50px)",
                    }}
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Eye-Tracking Interactive Noki */}
                  <EyeTrackingNoki
                    src="/images/noki-hero.png"
                    alt="The Noki AI - adorable lavender plush with glowing cyan eyes"
                    className="w-full h-full"
                    eyeMaxOffset={10}
                  />

                  {/* Sparkle decorations around character */}
                  <motion.div
                    className="absolute -top-4 -right-4 text-cyan-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <SparkleIcon className="w-6 h-6" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-8 -left-6 text-pink-400"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.9, 0.5],
                      rotate: [0, -180, -360],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  >
                    <SparkleIcon className="w-5 h-5" />
                  </motion.div>
                  <motion.div
                    className="absolute top-1/3 -right-8 text-purple-400"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <HeartIcon className="w-4 h-4" />
                  </motion.div>
                </div>
              </AnimatedSection>
            </FloatingElement>
          </div>
        </div>
      </div>
    </section>
  );
}

// Characters Section
function CharactersSection() {
  const characters = [
    {
      name: "Ami Noki",
      tagline: "The Gentle Heart",
      description: "Loves bedtime stories & warm hugs",
      color: "pink",
      image: "/images/ami-noki.png",
      glowColor: "rgba(236, 72, 153, 0.3)",
    },
    {
      name: "Luna Noki",
      tagline: "The Dream Keeper",
      description: "Whispers lullabies under starlight",
      color: "blue",
      image: "/images/luna-noki.png",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      name: "Kumo Noki",
      tagline: "The Wonder Seeker",
      description: "Always ready for the next adventure",
      color: "purple",
      image: "/images/kumo-noki.png",
      glowColor: "rgba(168, 85, 247, 0.3)",
    },
  ];

  return (
    <section id="characters" className="py-20 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <AnimatedSection animation="up" className="text-center mb-16">
          <p className="font-script text-xl lg:text-3xl text-[#4A2C7A] mb-3 flex items-center justify-center gap-2 font-semibold drop-shadow-sm">
            Meet The Family
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HeartIcon className="w-6 h-6 text-pink-500" />
            </motion.span>
          </p>
          <h3 className="heading-section text-3xl lg:text-5xl text-[#1a0d2e] mb-4">
            Every Noki Has a Story to Tell
          </h3>
          <p className="text-[#2D1B4E] text-lg max-w-2xl mx-auto text-readable">
            Each character brings their own personality, voice, and magic. Which
            one will choose your child?
          </p>
        </AnimatedSection>

        {/* Character Cards */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.15}
        >
          {characters.map((character) => (
            <StaggerItem key={character.name}>
              <GlassCard
                variant="default"
                hover3D
                glowOnHover
                className="p-6 lg:p-8 text-center cursor-pointer group"
              >
                {/* Character Image */}
                <div className="w-full aspect-square rounded-2xl mb-4 overflow-hidden relative">
                  {/* Glow effect behind character */}
                  <motion.div
                    className="absolute inset-4 rounded-full -z-10"
                    style={{
                      background: `radial-gradient(circle, ${character.glowColor} 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <motion.div
                    className="w-full h-full relative"
                    whileHover={{ scale: 1.08, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image
                      src={character.image}
                      alt={`${character.name} - adorable AI plush companion`}
                      fill
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Eye glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 35%, rgba(0, 245, 255, 0.15) 0%, transparent 30%)",
                    }}
                  />
                </div>

                {/* Character Name */}
                <h4 className="heading-card text-xl lg:text-2xl text-[#1a0d2e] mb-2">
                  {character.name}
                </h4>

                {/* Character Badge */}
                <motion.span
                  className={`character-badge ${character.color} text-sm px-5 py-2 mb-3`}
                  whileHover={{ scale: 1.05 }}
                >
                  {character.tagline}
                </motion.span>

                {/* Character Description */}
                <p className="text-[#4A2C7A] text-sm font-medium mt-3">
                  {character.description}
                </p>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA - JellyButton with pink variant for playful feel */}
        <AnimatedSection
          animation="up"
          delay={0.5}
          className="text-center mt-12"
        >
          <JellyButton variant="pink" jellyIntensity={1.1}>
            Discover Their Personalities
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </JellyButton>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative z-10 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <GlassCard variant="solid" className="p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <AnimatedSection
              animation="up"
              delay={0.1}
              className="lg:col-span-1"
            >
              <span className="font-script text-3xl text-[#2D1B4E] block mb-4 drop-shadow-sm">
                The Noki Ai
              </span>
              <p className="text-[#2D1B4E] text-sm leading-relaxed mb-6 font-medium">
                We believe every child deserves a friend who&apos;s always
                there— one who listens, learns, and grows with them through
                every chapter of childhood.
              </p>
              <div className="flex gap-3">
                {[InstagramIcon, FacebookIcon, YoutubeIcon].map((Icon, i) => (
                  <MagneticIconButton key={i}>
                    <Icon className="w-5 h-5" />
                  </MagneticIconButton>
                ))}
              </div>
            </AnimatedSection>

            {/* Links Columns */}
            {[
              {
                title: "Product",
                links: ["Features", "How It Works", "Characters", "Pricing"],
              },
              {
                title: "Company",
                links: ["About Us", "Blog", "Careers", "Contact"],
              },
            ].map((column, colIndex) => (
              <AnimatedSection
                key={column.title}
                animation="up"
                delay={0.2 + colIndex * 0.1}
              >
                <h5 className="heading-card text-[#1a0d2e] mb-4">
                  {column.title}
                </h5>
                <ul className="space-y-3 text-[#2D1B4E] text-sm font-medium text-readable">
                  {column.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="hover:text-[#1a0d2e] transition-colors inline-block"
                        whileHover={{ x: 4 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}

            {/* Newsletter Column */}
            <AnimatedSection animation="up" delay={0.4}>
              <h5 className="heading-card text-[#1a0d2e] mb-4">
                Be First to Know
              </h5>
              <p className="text-[#2D1B4E] text-sm mb-4 font-medium text-readable">
                Join 2,000+ families waiting for Noki. Early supporters get
                exclusive launch pricing.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/60 border border-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
                <MagneticButton variant="primary" className="px-6 py-3">
                  Join
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>

          {/* Copyright */}
          <motion.div
            className="text-center text-[#2D1B4E] text-sm font-semibold mt-12 pt-8 border-t border-purple-300/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 The Noki AI by Anoki Win. All rights reserved.</p>
          </motion.div>
        </GlassCard>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Premium Background System - Single container for all background layers */}
      <BackgroundSystem />

      {/* Main Content - Above background (z-10) */}
      <main className="relative z-10">
        <Navigation />
        <HeroSection />
        <CharactersSection />
        <Footer />
      </main>
    </div>
  );
}
