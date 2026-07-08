"use client";

import React from "react";
import { useEditor, useEditorActions } from "@/lib/editorStore";

/**
 * Right sidebar — layer list with visibility, lock, delete, duplicate controls.
 * Layers displayed in reverse z-order (top layer first).
 */
export default function LayerPanel() {
  const { state, sortedLayers } = useEditor();
  const { selectLayer, toggleVisibility, toggleLock, deleteLayer, duplicateLayer, moveLayerUp, moveLayerDown } =
    useEditorActions();

  // Display top-most layer first
  const reversed = [...sortedLayers].reverse();

  const layerTypeIcon = (type: string) => {
    switch (type) {
      case "avatar": return "👤";
      case "text": return "𝐓";
      case "badge": return "🏷";
      case "asset": return "✦";
      case "image": return "🖼";
      case "background": return "🎨";
      default: return "◻";
    }
  };

  return (
    <div className="layer-panel">
      <div className="panel-header">
        <h3 className="panel-title">Layers</h3>
        <span className="panel-count">{state.layers.length}</span>
      </div>

      <div className="layer-list">
        {reversed.map((layer) => {
          const isSelected = state.selectedLayerId === layer.id;

          return (
            <div
              key={layer.id}
              className={`layer-item ${isSelected ? "layer-item-selected" : ""}`}
              onClick={() => selectLayer(layer.id)}
            >
              {/* Layer type icon */}
              <span className="layer-type-icon">{layerTypeIcon(layer.type)}</span>

              {/* Layer name */}
              <span className="layer-name" title={layer.name}>
                {layer.name}
              </span>

              {/* Controls */}
              <div className="layer-controls">
                {/* Visibility */}
                <button
                  className="layer-ctrl-btn"
                  onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}
                  title={layer.visible ? "Hide" : "Show"}
                >
                  {layer.visible ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>

                {/* Lock */}
                <button
                  className="layer-ctrl-btn"
                  onClick={(e) => { e.stopPropagation(); toggleLock(layer.id); }}
                  title={layer.locked ? "Unlock" : "Lock"}
                >
                  {layer.locked ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 019.9-1" />
                    </svg>
                  )}
                </button>

                {/* Move Up */}
                <button
                  className="layer-ctrl-btn"
                  onClick={(e) => { e.stopPropagation(); moveLayerUp(layer.id); }}
                  title="Move Up"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>

                {/* Move Down */}
                <button
                  className="layer-ctrl-btn"
                  onClick={(e) => { e.stopPropagation(); moveLayerDown(layer.id); }}
                  title="Move Down"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Duplicate */}
                {layer.type !== "background" && (
                  <button
                    className="layer-ctrl-btn"
                    onClick={(e) => { e.stopPropagation(); duplicateLayer(layer.id); }}
                    title="Duplicate"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  </button>
                )}

                {/* Delete */}
                {layer.type !== "background" && (
                  <button
                    className="layer-ctrl-btn layer-ctrl-delete"
                    onClick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }}
                    title="Delete"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
