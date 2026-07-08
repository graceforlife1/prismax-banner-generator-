"use client";

import React from "react";
import { useEditor } from "@/lib/editorStore";
import type { BackgroundLayer } from "@/lib/types";
import DraggableLayer from "./DraggableLayer";

interface BannerCanvasProps {
  // Option to hide active selection handles for export
  isExporting?: boolean;
}

/**
 * The 1600x900 canvas that renders the background and all layers.
 * Positioned inside a relative wrapper that is scaled by the zoom level.
 */
const BannerCanvas = React.forwardRef<HTMLDivElement, BannerCanvasProps>(
  ({ isExporting = false }, ref) => {
    const { state, sortedLayers } = useEditor();

    // Find background layer
    const bgLayer = state.layers.find((l) => l.type === "background") as BackgroundLayer | undefined;

    // Filter out background from draggable layers
    const interactiveLayers = sortedLayers.filter((l) => l.type !== "background");

    return (
      <div
        ref={ref}
        id="prismax-canvas-node"
        style={{
          width: `${state.canvasWidth}px`,
          height: `${state.canvasHeight}px`,
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0C0A08",
          userSelect: "none",
        }}
      >
        {/* === LAYER 0: Background Gradient & Base Image === */}
        {bgLayer && bgLayer.visible && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: bgLayer.gradient,
              opacity: bgLayer.opacity,
              filter: bgLayer.blur > 0 ? `blur(${bgLayer.blur}px)` : "none",
            }}
          >
            {/* Base foundation: original PrismaX banner blended with opacity/gradients */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/prismax-hero-banner.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.28,
                mixBlendMode: "luminosity",
              }}
            />

            {/* Asymmetrical layout: Mascot backdrop layered on the right side */}
            <div
              className="float"
              style={{
                position: "absolute",
                right: "-80px",
                bottom: "-50px",
                width: "900px",
                height: "900px",
                backgroundImage: "url('/prismax-hero-banner.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom right",
                opacity: 0.75,
                maskImage: "radial-gradient(circle at 75% 75%, black 25%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle at 75% 75%, black 25%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            {/* === Subtle Grid Pattern === */}
            {bgLayer.showGrid && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(212, 168, 67, 0.035) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212, 168, 67, 0.035) 1px, transparent 1px)
                  `,
                  backgroundSize: "80px 80px",
                }}
              />
            )}

            {/* === Asymmetrical Light Streaks & Glow Blobs === */}
            {bgLayer.showGlowOrbs && (
              <>
                {/* Gold Glow Top Left */}
                <div
                  style={{
                    position: "absolute",
                    width: "800px",
                    height: "800px",
                    top: "-300px",
                    left: "-200px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(212, 168, 67, 0.15) 0%, transparent 70%)",
                    filter: "blur(120px)",
                  }}
                />
                {/* Warm Amber Center/Left Glow */}
                <div
                  style={{
                    position: "absolute",
                    width: "900px",
                    height: "600px",
                    top: "15%",
                    left: "10%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(139, 104, 64, 0.12) 0%, transparent 70%)",
                    filter: "blur(100px)",
                  }}
                />
                {/* Accent Cyber Glow behind mascot (cyan/gold hybrid tint for premium esports depth) */}
                <div
                  style={{
                    position: "absolute",
                    width: "600px",
                    height: "600px",
                    bottom: "10%",
                    right: "10%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(212, 168, 67, 0.18) 0%, rgba(139, 104, 64, 0.03) 50%, transparent 80%)",
                    filter: "blur(90px)",
                  }}
                />
              </>
            )}

            {/* === Dynamic Oversized Asymmetrical "PRISMAX" Typography === */}
            {bgLayer.showPrismaXText && (
              <div
                style={{
                  position: "absolute",
                  top: "22%",
                  left: "5%",
                  fontSize: "220px",
                  fontWeight: 900,
                  fontFamily: "'Orbitron', 'Outfit', sans-serif",
                  color: "rgba(212, 168, 67, 0.025)",
                  WebkitTextStroke: "1.5px rgba(212, 168, 67, 0.05)",
                  letterSpacing: "15px",
                  pointerEvents: "none",
                  userSelect: "none",
                  lineHeight: 0.8,
                }}
              >
                PRISMAX
              </div>
            )}

            {/* === Ambient Particles / Grid Nodes === */}
            {bgLayer.showParticles && (
              <>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: `${3 + (i % 3) * 2}px`,
                      height: `${3 + (i % 3) * 2}px`,
                      borderRadius: "50%",
                      background: i % 2 === 0 ? "#D4A843" : "#F0D078",
                      opacity: 0.15 + (i % 5) * 0.1,
                      top: `${20 + (i * 73) % 860}px`,
                      left: `${40 + (i * 127) % 1500}px`,
                      boxShadow: `0 0 8px ${i % 2 === 0 ? "rgba(212, 168, 67, 0.4)" : "rgba(240, 208, 120, 0.4)"}`,
                    }}
                  />
                ))}
              </>
            )}

            {/* === Decorative Technical Circuit Lines === */}
            <div
              style={{
                position: "absolute",
                width: "400px",
                height: "2px",
                top: "12%",
                left: "3%",
                background: "linear-gradient(90deg, rgba(212, 168, 67, 0.2), transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "2px",
                height: "350px",
                top: "12%",
                left: "3%",
                background: "linear-gradient(180deg, rgba(212, 168, 67, 0.2), transparent)",
              }}
            />
          </div>
        )}

        {/* === BRANDING ACCENTS: Top Header Bar (Merged cleanly) === */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "50px",
            right: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "24px",
                fontWeight: "bold",
                fontStyle: "italic",
                color: "#D4A843",
                textShadow: "0 0 10px rgba(212, 168, 67, 0.3)",
              }}
            >
              P<span style={{ fontSize: "16px", verticalAlign: "sub" }}>(x)</span>
            </span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#FFFFFF",
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              PRISMAX
            </span>
          </div>

          {/* Sub Header Badge */}
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              background: "rgba(212, 168, 67, 0.06)",
              border: "1px solid rgba(212, 168, 67, 0.15)",
              color: "#D4A843",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Verified Quality
          </div>
        </div>

        {/* === BRANDING ACCENTS: Bottom Bar === */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50px",
            right: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 1,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "rgba(168, 152, 128, 0.4)", letterSpacing: "1px" }}>
              PRISMAX.IO
            </span>
            <span style={{ fontSize: "8px", color: "rgba(212, 168, 67, 0.3)" }}>•</span>
            <span style={{ fontSize: "10px", color: "rgba(168, 152, 128, 0.3)" }}>
              Robotics · Data · Excellence
            </span>
          </div>
          <span style={{ fontSize: "11px", color: "rgba(168, 152, 128, 0.4)", letterSpacing: "1px" }}>
            EST. {new Date().getFullYear()}
          </span>
        </div>

        {/* === LAYER CANVAS CONTENT: Interactive Layers === */}
        {interactiveLayers.map((layer) => {
          // If exporting, render standard static elements instead of Draggable ones to avoid selection boxes
          if (isExporting) {
            const filters: string[] = [];
            if (layer.blur > 0) filters.push(`blur(${layer.blur}px)`);
            if (layer.glow.enabled) filters.push(`drop-shadow(0 0 ${layer.glow.radius}px ${layer.glow.color})`);

            const shadows: string[] = [];
            if (layer.shadow.enabled) {
              shadows.push(
                `${layer.shadow.offsetX}px ${layer.shadow.offsetY}px ${layer.shadow.blur}px ${layer.shadow.color}`
              );
            }

            if (!layer.visible) return null;

            return (
              <div
                key={layer.id}
                style={{
                  position: "absolute",
                  left: `${layer.x}px`,
                  top: `${layer.y}px`,
                  width: `${layer.width}px`,
                  height: `${layer.height}px`,
                  transform: `rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity,
                  filter: filters.length > 0 ? filters.join(" ") : undefined,
                  boxShadow: shadows.length > 0 ? shadows.join(", ") : undefined,
                  zIndex: layer.zIndex,
                  pointerEvents: "none",
                }}
              >
                {/* Directly render visual layer component */}
                <DraggableLayer layer={layer} canvasZoom={1} />
              </div>
            );
          }

          // Otherwise render full draggable, resizable layer controls
          return (
            <DraggableLayer
              key={layer.id}
              layer={layer}
              canvasZoom={state.canvasZoom}
            />
          );
        })}

        {/* === OUTER DECORATIVE BORDER (Esports/Premium frame) === */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid transparent",
            background: `linear-gradient(transparent, transparent) padding-box,
              linear-gradient(135deg, rgba(212, 168, 67, 0.25), rgba(200, 144, 60, 0.1), transparent) border-box`,
            pointerEvents: "none",
          }}
        />
        {/* Corner Brackets */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "60px", height: "60px", borderTop: "2px solid rgba(212, 168, 67, 0.3)", borderLeft: "2px solid rgba(212, 168, 67, 0.3)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", borderTop: "2px solid rgba(212, 168, 67, 0.3)", borderRight: "2px solid rgba(212, 168, 67, 0.3)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "60px", height: "60px", borderBottom: "2px solid rgba(212, 168, 67, 0.3)", borderLeft: "2px solid rgba(212, 168, 67, 0.3)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "60px", height: "60px", borderBottom: "2px solid rgba(212, 168, 67, 0.3)", borderRight: "2px solid rgba(212, 168, 67, 0.3)" }} />
      </div>
    );
  }
);

BannerCanvas.displayName = "BannerCanvas";

export default BannerCanvas;
