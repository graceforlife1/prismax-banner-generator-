"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import type { Layer } from "@/lib/types";
import { useEditor, useEditorActions } from "@/lib/editorStore";
import LayerRenderer from "./LayerRenderer";

interface DraggableLayerProps {
  layer: Layer;
  canvasZoom: number;
}

/**
 * Wraps a layer in an interactive container that supports:
 * - Click to select
 * - Drag to move
 * - Resize via 8-point handles
 * - Rotate via top handle
 * All coordinates are in canvas-space (1600×900).
 */
export default function DraggableLayer({ layer, canvasZoom }: DraggableLayerProps) {
  const { state } = useEditor();
  const { selectLayer, updateLayer } = useEditorActions();
  const isSelected = state.selectedLayerId === layer.id;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, layerX: 0, layerY: 0 });
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, w: 0, h: 0, x: 0, y: 0, handle: "" });
  const rotateStart = useRef({ startAngle: 0, layerRotation: 0 });

  if (!layer.visible) return null;

  // Compute layer style with effects
  const filters: string[] = [];
  if (layer.blur > 0) filters.push(`blur(${layer.blur}px)`);
  if (layer.glow.enabled) filters.push(`drop-shadow(0 0 ${layer.glow.radius}px ${layer.glow.color})`);

  const shadows: string[] = [];
  if (layer.shadow.enabled) {
    shadows.push(
      `${layer.shadow.offsetX}px ${layer.shadow.offsetY}px ${layer.shadow.blur}px ${layer.shadow.color}`
    );
  }

  const layerStyle: React.CSSProperties = {
    position: "absolute",
    left: `${layer.x}px`,
    top: `${layer.y}px`,
    width: `${layer.width}px`,
    height: `${layer.height}px`,
    transform: `rotate(${layer.rotation}deg)`,
    opacity: layer.opacity,
    filter: filters.length > 0 ? filters.join(" ") : undefined,
    boxShadow: shadows.length > 0 ? shadows.join(", ") : undefined,
    cursor: layer.locked ? "not-allowed" : isDragging ? "grabbing" : "grab",
    zIndex: layer.zIndex,
    outline: isSelected ? "2px solid rgba(212,168,67,0.8)" : "none",
    outlineOffset: "2px",
    pointerEvents: "auto",
    userSelect: "none",
  };

  /* ── Drag Logic ── */

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (layer.locked || layer.type === "background") return;
      e.stopPropagation();
      selectLayer(layer.id);

      dragStart.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        layerX: layer.x,
        layerY: layer.y,
      };
      setIsDragging(true);

      const handleMouseMove = (ev: MouseEvent) => {
        const dx = (ev.clientX - dragStart.current.mouseX) / canvasZoom;
        const dy = (ev.clientY - dragStart.current.mouseY) / canvasZoom;
        updateLayer(layer.id, {
          x: Math.round(dragStart.current.layerX + dx),
          y: Math.round(dragStart.current.layerY + dy),
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [layer.id, layer.x, layer.y, layer.locked, layer.type, canvasZoom, selectLayer, updateLayer]
  );

  /* ── Resize Logic ── */

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, handle: string) => {
      if (layer.locked) return;
      e.stopPropagation();
      e.preventDefault();

      resizeStart.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        w: layer.width,
        h: layer.height,
        x: layer.x,
        y: layer.y,
        handle,
      };
      setIsResizing(true);

      const handleMouseMove = (ev: MouseEvent) => {
        const dx = (ev.clientX - resizeStart.current.mouseX) / canvasZoom;
        const dy = (ev.clientY - resizeStart.current.mouseY) / canvasZoom;
        const { w, h, x, y, handle: hdl } = resizeStart.current;

        let newW = w, newH = h, newX = x, newY = y;

        if (hdl.includes("e")) { newW = Math.max(20, w + dx); }
        if (hdl.includes("w")) { newW = Math.max(20, w - dx); newX = x + dx; }
        if (hdl.includes("s")) { newH = Math.max(20, h + dy); }
        if (hdl.includes("n")) { newH = Math.max(20, h - dy); newY = y + dy; }

        updateLayer(layer.id, {
          width: Math.round(newW),
          height: Math.round(newH),
          x: Math.round(newX),
          y: Math.round(newY),
        });
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [layer.id, layer.width, layer.height, layer.x, layer.y, layer.locked, canvasZoom, updateLayer]
  );

  /* ── Rotate Logic ── */

  const handleRotateStart = useCallback(
    (e: React.MouseEvent) => {
      if (layer.locked) return;
      e.stopPropagation();
      e.preventDefault();

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      rotateStart.current = { startAngle, layerRotation: layer.rotation };
      setIsRotating(true);

      const handleMouseMove = (ev: MouseEvent) => {
        const angle = Math.atan2(ev.clientY - cy, ev.clientX - cx) * (180 / Math.PI);
        const delta = angle - rotateStart.current.startAngle;
        let newRot = rotateStart.current.layerRotation + delta;
        // Snap to 0/90/180/270 if within 5 degrees
        const snapAngles = [0, 90, 180, 270, -90, -180, -270, 360];
        for (const snap of snapAngles) {
          if (Math.abs(newRot - snap) < 5) {
            newRot = snap;
            break;
          }
        }
        updateLayer(layer.id, { rotation: Math.round(newRot) });
      };

      const handleMouseUp = () => {
        setIsRotating(false);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [layer.id, layer.rotation, layer.locked, updateLayer]
  );

  /* ── Resize Handles ── */

  const handles = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
  const handlePositions: Record<string, React.CSSProperties> = {
    n: { top: -5, left: "50%", transform: "translateX(-50%)", cursor: "n-resize" },
    ne: { top: -5, right: -5, cursor: "ne-resize" },
    e: { top: "50%", right: -5, transform: "translateY(-50%)", cursor: "e-resize" },
    se: { bottom: -5, right: -5, cursor: "se-resize" },
    s: { bottom: -5, left: "50%", transform: "translateX(-50%)", cursor: "s-resize" },
    sw: { bottom: -5, left: -5, cursor: "sw-resize" },
    w: { top: "50%", left: -5, transform: "translateY(-50%)", cursor: "w-resize" },
    nw: { top: -5, left: -5, cursor: "nw-resize" },
  };

  return (
    <div
      ref={containerRef}
      style={layerStyle}
      onMouseDown={handleMouseDown}
      data-layer-id={layer.id}
    >
      {/* Layer visual content */}
      <LayerRenderer layer={layer} />

      {/* Selection UI */}
      {isSelected && !layer.locked && (
        <>
          {/* Resize handles */}
          {handles.map((h) => (
            <div
              key={h}
              onMouseDown={(e) => handleResizeStart(e, h)}
              style={{
                position: "absolute",
                width: "10px",
                height: "10px",
                background: "#D4A843",
                border: "1px solid #0C0A08",
                borderRadius: "2px",
                zIndex: 9999,
                ...handlePositions[h],
              }}
            />
          ))}

          {/* Rotate handle */}
          <div
            onMouseDown={handleRotateStart}
            style={{
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "rgba(212,168,67,0.9)",
              border: "2px solid #0C0A08",
              cursor: "grab",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0C0A08" strokeWidth="3" strokeLinecap="round">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </div>

          {/* Connector line from rotate handle to element */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              left: "50%",
              width: "1px",
              height: "20px",
              background: "rgba(212,168,67,0.5)",
              transform: "translateX(-50%)",
              zIndex: 9998,
            }}
          />
        </>
      )}
    </div>
  );
}
