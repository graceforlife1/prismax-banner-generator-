"use client";

import { motion } from "framer-motion";
import PrismaXLogo from "./PrismaXLogo";
import Image from "next/image";

/**
 * Hero section with PrismaX branding, the reference banner image,
 * and description copy. Gold & brown luxury theme.
 */
export default function HeroSection() {
  return (
    <section className="text-center max-w-5xl mx-auto px-4 pt-12 pb-10 md:pt-20 md:pb-14">
      {/* Top Centered Logo */}
      <motion.div
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/prismax-logo-white.jpg"
          alt="PrismaX Logo"
          width={320}
          height={86}
          className="h-auto object-contain"
          priority
        />
      </motion.div>

      {/* Hero Banner Image */}
      <motion.div
        className="hero-banner-container mb-10"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <Image
          src="/prismax-hero-banner.jpg"
          alt="PrismaX Banner Generator — Premium Gold Banner with Robot Mascot"
          width={1500}
          height={500}
          className="w-full h-auto object-cover"
          priority
          style={{ display: "block" }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <span className="gradient-text-hero">PrismaX</span>{" "}
        <span className="text-prismax-text">Banner Generator</span>
      </motion.h1>

      {/* Description */}
      <motion.div
        className="space-y-4 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-prismax-muted">
          A banner is more than an image — it represents{" "}
          <span className="text-prismax-gold font-semibold">verified quality</span>,
          dedication, and belief in real-world behavior powered by advanced models and robotics.
        </p>
        <p className="text-prismax-muted">
          As a member of the PrismaX community, your journey deserves recognition.
          Generate a personalized PrismaX banner and proudly showcase your support for the ecosystem.
        </p>
        <p className="text-prismax-text font-medium">
          Enter your Discord username below to create your custom banner in seconds.
        </p>
      </motion.div>

      {/* Feature Pills */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        {[
          { icon: "🤖", label: "Robotics Inspired" },
          { icon: "✦", label: "Verified Quality" },
          { icon: "⚡", label: "One-Click Download" },
          { icon: "🔒", label: "Premium Design" },
        ].map((pill) => (
          <div
            key={pill.label}
            className="glass rounded-full px-4 py-2 text-xs font-medium text-prismax-muted flex items-center gap-2 hover:border-prismax-gold/30 transition-colors"
          >
            <span>{pill.icon}</span>
            <span className="tracking-wide uppercase">{pill.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
