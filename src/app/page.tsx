"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import UsernameForm from "@/components/UsernameForm";
import BannerPreview from "@/components/BannerPreview";

/**
 * Main page for the PrismaX Banner Generator.
 *
 * Flow:
 * 1. User sees hero section with branding, banner image, and description
 * 2. User enters Discord username and optionally uploads profile image
 * 3. Clicks "Generate Banner" → loading animation
 * 4. Banner preview appears with download option
 */
export default function Home() {
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [generatedProfileImage, setGeneratedProfileImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const handleGenerate = useCallback(async (username: string, profileImage: string | null) => {
    setIsGenerating(true);
    setShowBanner(false);

    // Simulate generation time for a smooth UX
    // (the banner is rendered client-side, but we add a brief delay
    // so the loading state feels intentional and premium)
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setGeneratedUsername(username);
    setGeneratedProfileImage(profileImage);
    setShowBanner(true);
    setIsGenerating(false);
  }, []);

  return (
    <main className="min-h-screen flex flex-col" id="prismax-banner-generator">
      {/* Hero Section */}
      <HeroSection />

      {/* Username Input Form */}
      <UsernameForm onGenerate={handleGenerate} isGenerating={isGenerating} />

      {/* Loading State */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            className="flex flex-col items-center gap-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animated loading indicator - gold themed */}
            <div className="relative w-16 h-16">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid transparent",
                  borderTopColor: "#D4A843",
                  borderRightColor: "#A07830",
                  animation: "spin 1s linear infinite",
                }}
              />
              <div
                className="absolute inset-2 rounded-full"
                style={{
                  border: "2px solid transparent",
                  borderBottomColor: "#F0D078",
                  borderLeftColor: "#8B6840",
                  animation: "spin 1.5s linear infinite reverse",
                }}
              />
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,168,67,0.3), transparent)",
                }}
              />
            </div>
            <p className="text-prismax-muted text-sm font-medium animate-pulse">
              Crafting your premium banner...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner Preview */}
      <AnimatePresence>
        {showBanner && !isGenerating && (
          <motion.div
            key="banner-preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BannerPreview username={generatedUsername} profileImage={generatedProfileImage} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center">
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 text-xs text-prismax-muted/40">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
            <span>Built with conviction by the PrismaX community</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}
