"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import BannerCanvas from "./BannerCanvas";
import { downloadBanner } from "@/lib/downloadBanner";

interface BannerPreviewProps {
  username: string;
  profileImage?: string | null;
}

/**
 * Preview card that displays the generated banner in a glassmorphic container
 * with a download button. Gold & brown premium theme, 16:9 ratio.
 */
export default function BannerPreview({ username, profileImage }: BannerPreviewProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setScale(width / 1600);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleDownload = async () => {
    if (!bannerRef.current) return;

    setIsDownloading(true);
    setDownloadError("");

    try {
      await downloadBanner(bannerRef.current, username);
    } catch (err) {
      setDownloadError(
        err instanceof Error ? err.message : "Download failed. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.section
      className="max-w-5xl mx-auto px-4 pb-20"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Section Label */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "linear-gradient(135deg, #D4A843, #A07830)" }}
        />
        <h2
          className="text-sm font-semibold text-prismax-gold uppercase tracking-widest"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Banner Preview
        </h2>
      </motion.div>

      {/* Preview Card */}
      <motion.div
        className="glass-strong rounded-2xl p-4 md:p-6 glow-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Banner Container - fully responsive, scales dynamically */}
        <div className="rounded-xl overflow-hidden bg-[#0C0A08]">
          <div
            ref={containerRef}
            style={{
              width: "100%",
              position: "relative",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "1600px",
                height: "900px",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <BannerCanvas ref={bannerRef} username={username} profileImage={profileImage} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          {/* Download Button */}
          <motion.button
            onClick={handleDownload}
            disabled={isDownloading}
            className="btn-primary flex-1 sm:flex-none text-base"
            whileTap={{ scale: 0.98 }}
            id="download-banner-btn"
          >
            <span className="flex items-center justify-center gap-2">
              {isDownloading ? (
                <>
                  <div className="spinner" />
                  Preparing Download...
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Banner (PNG)
                </>
              )}
            </span>
          </motion.button>

          {/* Info text */}
          <p className="text-xs text-prismax-muted text-center sm:text-left">
            PNG • 1600×900px (16:9) • Optimized for YouTube, Twitter/X, and social media
          </p>
        </div>

        {/* Error message */}
        {downloadError && (
          <motion.p
            className="text-sm mt-3 text-center"
            style={{ color: "#C8903C" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {downloadError}
          </motion.p>
        )}
      </motion.div>

      {/* Quality Assurance Note */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-2 text-xs text-prismax-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="#D4A843"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="#D4A843"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
        <span>High-quality, retina-optimized output • Verified PrismaX Design</span>
      </motion.div>
    </motion.section>
  );
}
