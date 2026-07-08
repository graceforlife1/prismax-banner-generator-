"use client";

import React, { useState } from "react";
import { useEditorActions, useEditor } from "@/lib/editorStore";
import { ASSET_CATALOG, BADGE_PRESETS, BADGE_ICONS } from "@/lib/assets";
import {
  createTextLayer,
  createBadgeLayer,
  createAssetLayer,
  createImageLayer,
  type AssetId,
} from "@/lib/types";

export default function AssetLibrary() {
  const { addLayer } = useEditorActions();
  const { state } = useEditor();
  const [activeTab, setActiveTab] = useState<"text" | "badges" | "assets" | "uploads">("text");

  // Determine standard offsets to place new layers near center
  const getCenterCoords = () => {
    const w = 200;
    const h = 80;
    return {
      x: Math.round((state.canvasWidth - w) / 2 + (Math.random() * 40 - 20)),
      y: Math.round((state.canvasHeight - h) / 2 + (Math.random() * 40 - 20)),
    };
  };

  const handleAddText = (style: "title" | "username" | "tagline" | "glow") => {
    const coords = getCenterCoords();
    let textLayer;

    switch (style) {
      case "title":
        textLayer = createTextLayer({
          name: "Title Layer",
          content: "PRISMAX",
          fontSize: 90,
          fontFamily: "Orbitron",
          color: "#F0D078",
          bold: true,
          ...coords,
          width: 600,
          height: 120,
        });
        break;
      case "username":
        textLayer = createTextLayer({
          name: "Discord Name",
          content: "DiscordUser",
          fontSize: 60,
          fontFamily: "Outfit",
          color: "#FFFFFF",
          bold: true,
          ...coords,
          width: 500,
          height: 90,
        });
        break;
      case "tagline":
        textLayer = createTextLayer({
          name: "Tagline",
          content: "Behavior • Models • Quality",
          fontSize: 18,
          fontFamily: "Outfit",
          color: "rgba(212, 168, 67, 0.7)",
          letterSpacing: 4,
          bold: false,
          ...coords,
          width: 600,
          height: 40,
        });
        break;
      case "glow":
        textLayer = createTextLayer({
          name: "Glow Text",
          content: "GLOWING",
          fontSize: 72,
          fontFamily: "Rajdhani",
          color: "#F0D078",
          glowText: { enabled: true, color: "#D4A843", radius: 25 },
          bold: true,
          ...coords,
          width: 500,
          height: 100,
        });
        break;
    }

    addLayer(textLayer);
  };

  const handleAddBadge = (preset: typeof BADGE_PRESETS[0]) => {
    const coords = getCenterCoords();
    const badge = createBadgeLayer({
      name: `Badge: ${preset.text}`,
      text: preset.text,
      icon: preset.icon,
      backgroundColor: preset.bg,
      borderColor: preset.border,
      textColor: preset.textColor,
      ...coords,
      width: 160,
      height: 38,
    });
    addLayer(badge);
  };

  const handleAddAsset = (assetId: AssetId) => {
    const coords = getCenterCoords();
    const assetMeta = ASSET_CATALOG.find((a) => a.id === assetId);
    const asset = createAssetLayer(assetId, {
      ...coords,
      width: assetMeta ? assetMeta.defaultWidth : 120,
      height: assetMeta ? assetMeta.defaultHeight : 120,
    });
    addLayer(asset);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const coords = getCenterCoords();
        const imgLayer = createImageLayer(reader.result, {
          name: "Uploaded Image",
          ...coords,
          width: 250,
          height: 250,
        });
        addLayer(imgLayer);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="asset-library">
      <div className="panel-header">
        <h3 className="panel-title">Add Elements</h3>
      </div>

      {/* Tabs */}
      <div className="library-tabs">
        <button
          className={`lib-tab-btn ${activeTab === "text" ? "lib-tab-active" : ""}`}
          onClick={() => setActiveTab("text")}
        >
          Text
        </button>
        <button
          className={`lib-tab-btn ${activeTab === "badges" ? "lib-tab-active" : ""}`}
          onClick={() => setActiveTab("badges")}
        >
          Badges
        </button>
        <button
          className={`lib-tab-btn ${activeTab === "assets" ? "lib-tab-active" : ""}`}
          onClick={() => setActiveTab("assets")}
        >
          Assets
        </button>
        <button
          className={`lib-tab-btn ${activeTab === "uploads" ? "lib-tab-active" : ""}`}
          onClick={() => setActiveTab("uploads")}
        >
          Media
        </button>
      </div>

      <div className="library-content">
        {/* TEXT PRESETS */}
        {activeTab === "text" && (
          <div className="preset-group">
            <h4 className="preset-subtitle">Text Styles</h4>
            <div className="preset-grid">
              <button className="preset-action-btn" onClick={() => handleAddText("title")}>
                <span className="font-bold text-lg text-prismax-gold">Title Text</span>
                <span className="text-[10px] text-prismax-muted">Orbitron / Large</span>
              </button>
              <button className="preset-action-btn" onClick={() => handleAddText("username")}>
                <span className="font-semibold text-md text-white">Name / Username</span>
                <span className="text-[10px] text-prismax-muted">Outfit / Semibold</span>
              </button>
              <button className="preset-action-btn" onClick={() => handleAddText("tagline")}>
                <span className="text-xs uppercase tracking-wider text-prismax-muted">Sub-Tagline</span>
                <span className="text-[10px] text-prismax-muted">Outfit / Spaced</span>
              </button>
              <button className="preset-action-btn" onClick={() => handleAddText("glow")}>
                <span className="font-bold text-md text-prismax-gold-light glow-glow-sm">Glow Heading</span>
                <span className="text-[10px] text-prismax-muted">Glow Effect Enabled</span>
              </button>
            </div>
          </div>
        )}

        {/* BADGE PRESETS */}
        {activeTab === "badges" && (
          <div className="preset-group">
            <h4 className="preset-subtitle">Custom Roles</h4>
            <div className="preset-badge-list">
              {BADGE_PRESETS.map((preset) => (
                <button
                  key={preset.text}
                  className="preset-badge-item"
                  onClick={() => handleAddBadge(preset)}
                  style={{
                    backgroundColor: preset.bg,
                    borderColor: preset.border,
                    color: preset.textColor,
                  }}
                >
                  <span className="mr-1">{preset.icon}</span>
                  <span>{preset.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DECORATIVE ASSETS */}
        {activeTab === "assets" && (
          <div className="preset-group">
            <h4 className="preset-subtitle">Gaming & Esports Elements</h4>
            <div className="preset-asset-grid">
              {ASSET_CATALOG.map((asset) => (
                <button
                  key={asset.id}
                  className="preset-asset-card"
                  onClick={() => handleAddAsset(asset.id)}
                  title={asset.name}
                >
                  <span className="text-2xl">{asset.icon}</span>
                  <span className="text-[10px] truncate w-full text-center mt-1 text-prismax-text">
                    {asset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOM UPLOADS */}
        {activeTab === "uploads" && (
          <div className="preset-group">
            <h4 className="preset-subtitle">Upload Images</h4>
            <div className="upload-container">
              <label className="upload-dropzone">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">📥</span>
                  <span className="text-xs text-prismax-text font-semibold">Click to upload image</span>
                  <span className="text-[10px] text-prismax-muted">PNG, JPG, SVG, WebP</span>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
