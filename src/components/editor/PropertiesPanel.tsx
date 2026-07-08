"use client";

import React, { useRef } from "react";
import { useEditor, useEditorActions } from "@/lib/editorStore";
import type {
  Layer,
  AvatarLayer,
  TextLayer,
  BadgeLayer,
  AssetLayer,
  ImageLayer,
  BackgroundLayer,
  FrameStyle,
  FontFamily,
} from "@/lib/types";
import { BADGE_ICONS } from "@/lib/assets";

const FONT_OPTIONS: FontFamily[] = [
  "Outfit", "Inter", "Orbitron", "Rajdhani", "Bebas Neue",
  "Poppins", "Oswald", "Montserrat", "Press Start 2P", "Teko",
];

/**
 * Context-sensitive properties panel for the selected layer.
 */
export default function PropertiesPanel() {
  const { selectedLayer } = useEditor();
  const { updateLayer } = useEditorActions();

  if (!selectedLayer) {
    return (
      <div className="properties-panel">
        <div className="panel-header">
          <h3 className="panel-title">Properties</h3>
        </div>
        <div className="properties-empty">
          <p>Select a layer to edit its properties</p>
        </div>
      </div>
    );
  }

  const update = (updates: Partial<Layer>) => {
    updateLayer(selectedLayer.id, updates);
  };

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <h3 className="panel-title">Properties</h3>
        <span className="panel-layer-type">{selectedLayer.type}</span>
      </div>

      <div className="properties-content">
        {/* Common properties */}
        <CommonProps layer={selectedLayer} update={update} />

        {/* Type-specific properties */}
        {selectedLayer.type === "avatar" && <AvatarProps layer={selectedLayer as AvatarLayer} update={update} />}
        {selectedLayer.type === "text" && <TextProps layer={selectedLayer as TextLayer} update={update} />}
        {selectedLayer.type === "badge" && <BadgeProps layer={selectedLayer as BadgeLayer} update={update} />}
        {selectedLayer.type === "asset" && <AssetProps layer={selectedLayer as AssetLayer} update={update} />}
        {selectedLayer.type === "image" && <ImageProps layer={selectedLayer as ImageLayer} update={update} />}
        {selectedLayer.type === "background" && <BackgroundProps layer={selectedLayer as BackgroundLayer} update={update} />}
      </div>
    </div>
  );
}

/* ── Common Properties ── */

function CommonProps({ layer, update }: { layer: Layer; update: (u: Partial<Layer>) => void }) {
  return (
    <div className="prop-section">
      <div className="prop-section-title">Transform</div>

      <div className="prop-row-2">
        <label className="prop-label">
          X
          <input
            type="number"
            className="prop-input"
            value={layer.x}
            onChange={(e) => update({ x: Number(e.target.value) })}
          />
        </label>
        <label className="prop-label">
          Y
          <input
            type="number"
            className="prop-input"
            value={layer.y}
            onChange={(e) => update({ y: Number(e.target.value) })}
          />
        </label>
      </div>

      <div className="prop-row-2">
        <label className="prop-label">
          W
          <input
            type="number"
            className="prop-input"
            value={layer.width}
            onChange={(e) => update({ width: Math.max(10, Number(e.target.value)) })}
          />
        </label>
        <label className="prop-label">
          H
          <input
            type="number"
            className="prop-input"
            value={layer.height}
            onChange={(e) => update({ height: Math.max(10, Number(e.target.value)) })}
          />
        </label>
      </div>

      <div className="prop-row-2">
        <label className="prop-label">
          Rotation
          <input
            type="number"
            className="prop-input"
            value={layer.rotation}
            onChange={(e) => update({ rotation: Number(e.target.value) })}
          />
        </label>
        <label className="prop-label">
          Opacity
          <input
            type="range"
            className="prop-range"
            min="0"
            max="1"
            step="0.05"
            value={layer.opacity}
            onChange={(e) => update({ opacity: Number(e.target.value) })}
          />
        </label>
      </div>

      <label className="prop-label">
        Blur
        <input
          type="range"
          className="prop-range"
          min="0"
          max="20"
          step="1"
          value={layer.blur}
          onChange={(e) => update({ blur: Number(e.target.value) })}
        />
      </label>

      {/* Glow */}
      <div className="prop-section-title">Glow</div>
      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.glow.enabled}
          onChange={(e) => update({ glow: { ...layer.glow, enabled: e.target.checked } })}
        />
        <span>Enable Glow</span>
      </div>
      {layer.glow.enabled && (
        <div className="prop-row-2">
          <label className="prop-label">
            Color
            <input
              type="color"
              className="prop-color"
              value={layer.glow.color}
              onChange={(e) => update({ glow: { ...layer.glow, color: e.target.value } })}
            />
          </label>
          <label className="prop-label">
            Radius
            <input
              type="range"
              className="prop-range"
              min="1"
              max="60"
              value={layer.glow.radius}
              onChange={(e) => update({ glow: { ...layer.glow, radius: Number(e.target.value) } })}
            />
          </label>
        </div>
      )}

      {/* Shadow */}
      <div className="prop-section-title">Shadow</div>
      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.shadow.enabled}
          onChange={(e) => update({ shadow: { ...layer.shadow, enabled: e.target.checked } })}
        />
        <span>Enable Shadow</span>
      </div>
      {layer.shadow.enabled && (
        <>
          <div className="prop-row-2">
            <label className="prop-label">
              Color
              <input
                type="color"
                className="prop-color"
                value={layer.shadow.color.startsWith("rgba") ? "#000000" : layer.shadow.color}
                onChange={(e) => update({ shadow: { ...layer.shadow, color: e.target.value } })}
              />
            </label>
            <label className="prop-label">
              Blur
              <input
                type="range"
                className="prop-range"
                min="0"
                max="60"
                value={layer.shadow.blur}
                onChange={(e) => update({ shadow: { ...layer.shadow, blur: Number(e.target.value) } })}
              />
            </label>
          </div>
          <div className="prop-row-2">
            <label className="prop-label">
              X
              <input
                type="number"
                className="prop-input prop-input-sm"
                value={layer.shadow.offsetX}
                onChange={(e) => update({ shadow: { ...layer.shadow, offsetX: Number(e.target.value) } })}
              />
            </label>
            <label className="prop-label">
              Y
              <input
                type="number"
                className="prop-input prop-input-sm"
                value={layer.shadow.offsetY}
                onChange={(e) => update({ shadow: { ...layer.shadow, offsetY: Number(e.target.value) } })}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Avatar Properties ── */

function AvatarProps({ layer, update }: { layer: AvatarLayer; update: (u: Partial<AvatarLayer>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => update({ imageUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="prop-section">
      <div className="prop-section-title">Avatar</div>

      <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFile} />
      <button className="prop-upload-btn" onClick={() => fileRef.current?.click()}>
        {layer.imageUrl ? "Change Image" : "Upload Avatar"}
      </button>

      {layer.imageUrl && (
        <button className="prop-remove-btn" onClick={() => update({ imageUrl: null })}>
          Remove Image
        </button>
      )}

      <label className="prop-label">
        Frame Style
        <select
          className="prop-select"
          value={layer.frameStyle}
          onChange={(e) => update({ frameStyle: e.target.value as FrameStyle })}
        >
          <option value="circle">Circle</option>
          <option value="rounded-square">Rounded Square</option>
          <option value="hexagon">Hexagon</option>
          <option value="diamond">Diamond</option>
          <option value="none">None</option>
        </select>
      </label>

      <div className="prop-row-2">
        <label className="prop-label">
          Border
          <input
            type="range"
            className="prop-range"
            min="0"
            max="12"
            value={layer.borderWidth}
            onChange={(e) => update({ borderWidth: Number(e.target.value) })}
          />
        </label>
        <label className="prop-label">
          Color
          <input
            type="color"
            className="prop-color"
            value={layer.borderColor}
            onChange={(e) => update({ borderColor: e.target.value })}
          />
        </label>
      </div>
    </div>
  );
}

/* ── Text Properties ── */

function TextProps({ layer, update }: { layer: TextLayer; update: (u: Partial<TextLayer>) => void }) {
  return (
    <div className="prop-section">
      <div className="prop-section-title">Text</div>

      <label className="prop-label">
        Content
        <textarea
          className="prop-textarea"
          value={layer.content}
          onChange={(e) => update({ content: e.target.value, name: e.target.value.slice(0, 20) || "Text" })}
          rows={2}
        />
      </label>

      <label className="prop-label">
        Font
        <select
          className="prop-select"
          value={layer.fontFamily}
          onChange={(e) => update({ fontFamily: e.target.value as FontFamily })}
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>

      <div className="prop-row-2">
        <label className="prop-label">
          Size
          <input
            type="number"
            className="prop-input"
            value={layer.fontSize}
            min={8}
            max={200}
            onChange={(e) => update({ fontSize: Number(e.target.value) })}
          />
        </label>
        <label className="prop-label">
          Color
          <input
            type="color"
            className="prop-color"
            value={layer.color}
            onChange={(e) => update({ color: e.target.value })}
          />
        </label>
      </div>

      <label className="prop-label">
        Letter Spacing
        <input
          type="range"
          className="prop-range"
          min="-5"
          max="20"
          value={layer.letterSpacing}
          onChange={(e) => update({ letterSpacing: Number(e.target.value) })}
        />
      </label>

      <div className="prop-row-3">
        <button
          className={`prop-toggle ${layer.bold ? "prop-toggle-active" : ""}`}
          onClick={() => update({ bold: !layer.bold })}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          className={`prop-toggle ${layer.italic ? "prop-toggle-active" : ""}`}
          onClick={() => update({ italic: !layer.italic })}
          title="Italic"
        >
          <em>I</em>
        </button>
        <select
          className="prop-select-sm"
          value={layer.textTransform}
          onChange={(e) => update({ textTransform: e.target.value as TextLayer["textTransform"] })}
        >
          <option value="none">Normal</option>
          <option value="uppercase">UPPER</option>
          <option value="lowercase">lower</option>
        </select>
      </div>

      {/* Text Glow */}
      <div className="prop-section-title">Text Glow</div>
      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.glowText.enabled}
          onChange={(e) => update({ glowText: { ...layer.glowText, enabled: e.target.checked } })}
        />
        <span>Enable Text Glow</span>
      </div>
      {layer.glowText.enabled && (
        <div className="prop-row-2">
          <label className="prop-label">
            Color
            <input
              type="color"
              className="prop-color"
              value={layer.glowText.color.startsWith("rgba") ? "#D4A843" : layer.glowText.color}
              onChange={(e) => update({ glowText: { ...layer.glowText, color: e.target.value } })}
            />
          </label>
          <label className="prop-label">
            Radius
            <input
              type="range"
              className="prop-range"
              min="1"
              max="60"
              value={layer.glowText.radius}
              onChange={(e) => update({ glowText: { ...layer.glowText, radius: Number(e.target.value) } })}
            />
          </label>
        </div>
      )}

      {/* Text Outline */}
      <div className="prop-section-title">Text Outline</div>
      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.outline.enabled}
          onChange={(e) => update({ outline: { ...layer.outline, enabled: e.target.checked } })}
        />
        <span>Enable Outline</span>
      </div>
      {layer.outline.enabled && (
        <div className="prop-row-2">
          <label className="prop-label">
            Color
            <input
              type="color"
              className="prop-color"
              value={layer.outline.color}
              onChange={(e) => update({ outline: { ...layer.outline, color: e.target.value } })}
            />
          </label>
          <label className="prop-label">
            Width
            <input
              type="range"
              className="prop-range"
              min="1"
              max="6"
              value={layer.outline.width}
              onChange={(e) => update({ outline: { ...layer.outline, width: Number(e.target.value) } })}
            />
          </label>
        </div>
      )}
    </div>
  );
}

/* ── Badge Properties ── */

function BadgeProps({ layer, update }: { layer: BadgeLayer; update: (u: Partial<BadgeLayer>) => void }) {
  return (
    <div className="prop-section">
      <div className="prop-section-title">Badge</div>

      <label className="prop-label">
        Text
        <input
          className="prop-input"
          value={layer.text}
          onChange={(e) => update({ text: e.target.value, name: `Badge: ${e.target.value}` })}
        />
      </label>

      <label className="prop-label">
        Icon
        <div className="prop-icon-grid">
          {BADGE_ICONS.map((icon) => (
            <button
              key={icon}
              className={`prop-icon-btn ${layer.icon === icon ? "prop-icon-btn-active" : ""}`}
              onClick={() => update({ icon })}
            >
              {icon}
            </button>
          ))}
        </div>
      </label>

      <div className="prop-row-2">
        <label className="prop-label">
          BG Color
          <input
            type="color"
            className="prop-color"
            value={layer.backgroundColor.startsWith("rgba") ? "#D4A843" : layer.backgroundColor}
            onChange={(e) => update({ backgroundColor: e.target.value + "22" })}
          />
        </label>
        <label className="prop-label">
          Text Color
          <input
            type="color"
            className="prop-color"
            value={layer.textColor}
            onChange={(e) => update({ textColor: e.target.value })}
          />
        </label>
      </div>

      <div className="prop-row-2">
        <label className="prop-label">
          Border
          <input
            type="color"
            className="prop-color"
            value={layer.borderColor.startsWith("rgba") ? "#D4A843" : layer.borderColor}
            onChange={(e) => update({ borderColor: e.target.value + "55" })}
          />
        </label>
        <label className="prop-label">
          Radius
          <input
            type="range"
            className="prop-range"
            min="0"
            max="20"
            value={layer.borderRadius}
            onChange={(e) => update({ borderRadius: Number(e.target.value) })}
          />
        </label>
      </div>

      <label className="prop-label">
        Font Size
        <input
          type="number"
          className="prop-input"
          value={layer.fontSize}
          min={8}
          max={36}
          onChange={(e) => update({ fontSize: Number(e.target.value) })}
        />
      </label>
    </div>
  );
}

/* ── Asset Properties ── */

function AssetProps({ layer, update }: { layer: AssetLayer; update: (u: Partial<AssetLayer>) => void }) {
  return (
    <div className="prop-section">
      <div className="prop-section-title">Asset</div>
      <label className="prop-label">
        Color Tint
        <input
          type="color"
          className="prop-color"
          value={layer.colorTint}
          onChange={(e) => update({ colorTint: e.target.value })}
        />
      </label>
      <p className="prop-hint">Asset: {layer.assetId.replace(/-/g, " ")}</p>
    </div>
  );
}

/* ── Image Properties ── */

function ImageProps({ layer, update }: { layer: ImageLayer; update: (u: Partial<ImageLayer>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => update({ imageUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="prop-section">
      <div className="prop-section-title">Image</div>
      <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFile} />
      <button className="prop-upload-btn" onClick={() => fileRef.current?.click()}>
        Replace Image
      </button>
      <label className="prop-label">
        Border Radius
        <input
          type="range"
          className="prop-range"
          min="0"
          max="50"
          value={layer.borderRadius}
          onChange={(e) => update({ borderRadius: Number(e.target.value) })}
        />
      </label>
      <label className="prop-label">
        Fit
        <select
          className="prop-select"
          value={layer.objectFit}
          onChange={(e) => update({ objectFit: e.target.value as ImageLayer["objectFit"] })}
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
          <option value="fill">Fill</option>
        </select>
      </label>
    </div>
  );
}

/* ── Background Properties ── */

function BackgroundProps({ layer, update }: { layer: BackgroundLayer; update: (u: Partial<BackgroundLayer>) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => update({ imageUrl: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div className="prop-section">
      <div className="prop-section-title">Background</div>
      <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleFile} />
      <button className="prop-upload-btn" onClick={() => fileRef.current?.click()}>
        {layer.imageUrl ? "Change Background Image" : "Upload Background"}
      </button>
      {layer.imageUrl && (
        <button className="prop-remove-btn" onClick={() => update({ imageUrl: null })}>
          Remove Image
        </button>
      )}

      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.showPrismaXText}
          onChange={(e) => update({ showPrismaXText: e.target.checked })}
        />
        <span>Show PRISMAX Text</span>
      </div>

      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.showParticles}
          onChange={(e) => update({ showParticles: e.target.checked })}
        />
        <span>Show Particles</span>
      </div>

      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.showGrid}
          onChange={(e) => update({ showGrid: e.target.checked })}
        />
        <span>Show Grid</span>
      </div>

      <div className="prop-row-check">
        <input
          type="checkbox"
          className="prop-checkbox"
          checked={layer.showGlowOrbs}
          onChange={(e) => update({ showGlowOrbs: e.target.checked })}
        />
        <span>Show Glow Orbs</span>
      </div>
    </div>
  );
}
