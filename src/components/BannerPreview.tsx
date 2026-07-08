"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, useEditorActions } from "@/lib/editorStore";
import BannerCanvas from "./BannerCanvas";
import { downloadBanner } from "@/lib/downloadBanner";

/**
 * Modernized Export / Preview modal that displays the finalized banner
 * (selection bounding boxes hidden) before downloading.
 */
export default function BannerPreview() {
  const { state } = useEditor();
  const { showExportModal } = useEditorActions();
  const exportCanvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [pixelRatio, setPixelRatio] = useState<number>(2); // Default to 2x (retina quality)
  const [scale, setScale] = useState(0.4);

  // Compute preview scaling based on screen size
  useEffect(() => {
    if (!state.showExportModal || !containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setScale(width / 1600);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [state.showExportModal]);

  if (!state.showExportModal) return null;

  const handleDownload = async () => {
    if (!exportCanvasRef.current) return;

    setIsDownloading(true);
    setDownloadError("");

    // Find custom text/username or fallback
    const nameLayer = state.layers.find((l) => l.type === "text" && l.id === "default-username");
    const nameStr = nameLayer && nameLayer.type === "text" ? nameLayer.content : "prismax";

    try {
      await downloadBanner(exportCanvasRef.current, nameStr, pixelRatio);
      // Automatically close modal on success
      setTimeout(() => {
        showExportModal(false);
      }, 1000);
    } catch (err) {
      setDownloadError(
        err instanceof Error ? err.message : "Download failed. Please try again."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="export-modal-overlay">
      <motion.div
        className="export-modal-card glass-strong"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="flex flex-col">
            <h2 className="modal-title">Export Final Banner</h2>
            <p className="modal-subtitle">Verify your gaming configuration before rendering</p>
          </div>
          <button className="modal-close-btn" onClick={() => showExportModal(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Preview Area */}
        <div className="modal-preview-wrapper" ref={containerRef}>
          <div
            style={{
              width: "1600px",
              height: "900px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Render with isExporting=true to hide active handles and selections */}
            <BannerCanvas ref={exportCanvasRef} isExporting={true} />
          </div>
        </div>

        {/* Settings and Actions */}
        <div className="modal-controls">
          <div className="modal-settings">
            <label className="settings-label">
              <span>Output Quality</span>
              <select
                className="settings-select"
                value={pixelRatio}
                onChange={(e) => setPixelRatio(Number(e.target.value))}
              >
                <option value={1}>Standard Resolution (1600 × 900)</option>
                <option value={2}>Retina Resolution 2x (3200 × 1800)</option>
                <option value={3}>Ultra Resolution 3x (4800 × 2700)</option>
              </select>
            </label>
            <p className="settings-tip">
              Recommended: 2x for premium print/high-res displays
            </p>
          </div>

          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={() => showExportModal(false)}>
              Cancel
            </button>
            <button
              className="modal-btn-export btn-primary"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner" />
                  Generating PNG...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PNG
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Error notification */}
        {downloadError && <p className="modal-error-msg">{downloadError}</p>}
      </motion.div>
    </div>
  );
}
