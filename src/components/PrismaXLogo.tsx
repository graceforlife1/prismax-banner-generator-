"use client";

import { motion } from "framer-motion";

/**
 * PrismaX Logo SVG Component
 * A geometric prism/crystal mark with gold gradient effects
 */
export default function PrismaXLogo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="prismGoldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0D078" />
            <stop offset="50%" stopColor="#D4A843" />
            <stop offset="100%" stopColor="#A07830" />
          </linearGradient>
          <linearGradient id="prismGoldGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B6840" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0.9" />
          </linearGradient>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main prism shape */}
        <g filter="url(#goldGlow)">
          {/* Left face */}
          <path
            d="M32 4 L8 52 L32 44 Z"
            fill="url(#prismGoldGrad1)"
            opacity="0.9"
          />
          {/* Right face */}
          <path
            d="M32 4 L56 52 L32 44 Z"
            fill="url(#prismGoldGrad2)"
            opacity="0.8"
          />
          {/* Bottom face */}
          <path
            d="M8 52 L32 44 L56 52 L32 60 Z"
            fill="#8B6840"
            opacity="0.5"
          />
          {/* Light refraction line */}
          <path
            d="M32 4 L32 44"
            stroke="rgba(240, 208, 120, 0.4)"
            strokeWidth="0.5"
          />
          {/* Highlight edge */}
          <path
            d="M32 4 L8 52"
            stroke="rgba(240, 208, 120, 0.2)"
            strokeWidth="0.5"
          />
        </g>
      </svg>
    </motion.div>
  );
}
