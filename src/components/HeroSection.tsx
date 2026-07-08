"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Compact, premium header bar for the PrismaX Banner Editor workspace.
 */
export default function HeroSection() {
  return (
    <header className="editor-header-bar glass-strong">
      {/* Brand logo & name */}
      <div className="flex items-center gap-4">
        <Image
          src="/prismax-logo-white.jpg"
          alt="PrismaX Logo"
          width={130}
          height={35}
          className="h-7 w-auto object-contain"
          priority
        />
        <div className="header-divider" />
        <h1 className="header-title uppercase tracking-wider text-prismax-text font-bold">
          Banner Creator Studio
        </h1>
      </div>

      {/* Dynamic Status / Actions Info */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-prismax-gold/10 border border-prismax-gold/20 text-[10px] text-prismax-gold font-semibold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-prismax-gold animate-pulse" />
          Interactive Canvas Mode
        </div>
        <div className="text-xs text-prismax-muted">
          Drag, resize, rotate, and layer any element.
        </div>
      </div>
    </header>
  );
}
