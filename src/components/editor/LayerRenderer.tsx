"use client";

import React from "react";
import type { Layer, AvatarLayer, TextLayer, BadgeLayer, AssetLayer, ImageLayer, BackgroundLayer } from "@/lib/types";
import { getAssetSVG } from "@/lib/assets";

/**
 * Renders a single layer's visual content based on its type.
 * This component handles ONLY the visual output — no interaction logic.
 */
export default function LayerRenderer({ layer }: { layer: Layer }) {
  switch (layer.type) {
    case "avatar":
      return <AvatarRenderer layer={layer} />;
    case "text":
      return <TextRenderer layer={layer} />;
    case "badge":
      return <BadgeRenderer layer={layer} />;
    case "asset":
      return <AssetRenderer layer={layer} />;
    case "image":
      return <ImageRenderer layer={layer} />;
    case "background":
      return null; // Background is rendered separately
    default:
      return null;
  }
}

/* ── Avatar ── */

function getClipPath(frame: string): string {
  switch (frame) {
    case "circle":
      return "circle(50%)";
    case "hexagon":
      return "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    case "diamond":
      return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    case "rounded-square":
      return "inset(0 round 16px)";
    default:
      return "none";
  }
}

function AvatarRenderer({ layer }: { layer: AvatarLayer }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        clipPath: getClipPath(layer.frameStyle),
        border: `${layer.borderWidth}px solid ${layer.borderColor}`,
        borderRadius: layer.frameStyle === "circle" ? "50%" : layer.frameStyle === "rounded-square" ? "16px" : "0",
        background: "rgba(20,18,16,0.9)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 ${layer.glow.enabled ? layer.glow.radius : 0}px ${layer.glowColor}`,
      }}
    >
      {layer.imageUrl ? (
        <img
          src={layer.imageUrl}
          alt="Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          draggable={false}
        />
      ) : (
        <svg
          width="40%"
          height="40%"
          viewBox="0 0 24 24"
          fill="none"
          stroke={layer.borderColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </div>
  );
}

/* ── Text ── */

function TextRenderer({ layer }: { layer: TextLayer }) {
  const textShadows: string[] = [];
  if (layer.glowText.enabled) {
    textShadows.push(`0 0 ${layer.glowText.radius}px ${layer.glowText.color}`);
  }
  if (layer.outline.enabled) {
    const w = layer.outline.width;
    const c = layer.outline.color;
    textShadows.push(`${w}px 0 0 ${c}`, `-${w}px 0 0 ${c}`, `0 ${w}px 0 ${c}`, `0 -${w}px 0 ${c}`);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: layer.textAlign === "center" ? "center" : "flex-start",
        justifyContent:
          layer.textAlign === "center" ? "center" : layer.textAlign === "right" ? "flex-end" : "flex-start",
        fontFamily: `'${layer.fontFamily}', sans-serif`,
        fontSize: `${layer.fontSize}px`,
        fontWeight: layer.bold ? 800 : 400,
        fontStyle: layer.italic ? "italic" : "normal",
        color: layer.color,
        letterSpacing: `${layer.letterSpacing}px`,
        textTransform: layer.textTransform,
        textShadow: textShadows.length > 0 ? textShadows.join(", ") : "none",
        lineHeight: 1.1,
        wordBreak: "break-word",
        overflow: "hidden",
        userSelect: "none",
        whiteSpace: "pre-wrap",
      }}
    >
      {layer.content}
    </div>
  );
}

/* ── Badge ── */

function BadgeRenderer({ layer }: { layer: BadgeLayer }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "4px 12px",
        borderRadius: `${layer.borderRadius}px`,
        background: layer.backgroundColor,
        border: `${layer.borderWidth}px solid ${layer.borderColor}`,
        fontFamily: `'${layer.fontFamily}', sans-serif`,
        fontSize: `${layer.fontSize}px`,
        fontWeight: 600,
        color: layer.textColor,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: `${layer.fontSize + 2}px` }}>{layer.icon}</span>
      <span>{layer.text}</span>
    </div>
  );
}

/* ── Asset ── */

function AssetRenderer({ layer }: { layer: AssetLayer }) {
  const svgMarkup = getAssetSVG(layer.assetId, layer.colorTint);
  return (
    <div
      style={{ width: "100%", height: "100%", userSelect: "none" }}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}

/* ── Image ── */

function ImageRenderer({ layer }: { layer: ImageLayer }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: `${layer.borderRadius}px`,
        overflow: "hidden",
      }}
    >
      <img
        src={layer.imageUrl}
        alt="Custom Image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: layer.objectFit,
        }}
        draggable={false}
      />
    </div>
  );
}
