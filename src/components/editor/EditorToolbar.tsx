"use client";

import React from "react";
import { useEditor, useEditorActions } from "@/lib/editorStore";

/**
 * Top toolbar with undo/redo, zoom, and export controls.
 */
export default function EditorToolbar() {
  const { state } = useEditor();
  const { undo, redo, setZoom, showExportModal } = useEditorActions();

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  const zoomPercent = Math.round(state.canvasZoom * 100);

  return (
    <div className="editor-toolbar">
      {/* Left: Brand */}
      <div className="toolbar-section">
        <div className="toolbar-brand">
          <span className="toolbar-brand-icon">P<sub>(x)</sub></span>
          <span className="toolbar-brand-text">PrismaX Editor</span>
        </div>
      </div>

      {/* Center: Undo/Redo + Zoom */}
      <div className="toolbar-section toolbar-center">
        <button
          className="toolbar-btn"
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M1 4v6h6" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
        <button
          className="toolbar-btn"
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M23 4v6h-6" />
            <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
          </svg>
        </button>

        <div className="toolbar-divider" />

        <button
          className="toolbar-btn"
          onClick={() => setZoom(state.canvasZoom - 0.1)}
          disabled={state.canvasZoom <= 0.2}
          title="Zoom Out"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M8 11h6" />
          </svg>
        </button>
        <span className="toolbar-zoom-label">{zoomPercent}%</span>
        <button
          className="toolbar-btn"
          onClick={() => setZoom(state.canvasZoom + 0.1)}
          disabled={state.canvasZoom >= 2}
          title="Zoom In"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 8v6" />
            <path d="M8 11h6" />
          </svg>
        </button>
        <button
          className="toolbar-btn"
          onClick={() => setZoom(0.55)}
          title="Reset Zoom"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
          </svg>
        </button>

        <div className="toolbar-divider" />

        <span className="toolbar-dimension">
          {state.canvasWidth} × {state.canvasHeight}
        </span>
      </div>

      {/* Right: Export */}
      <div className="toolbar-section">
        <button
          className="toolbar-export-btn"
          onClick={() => showExportModal(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Export PNG</span>
        </button>
      </div>
    </div>
  );
}
