"use client";

import React, { useRef, MouseEvent } from "react";
import { EditorProvider, useEditor, useEditorActions } from "@/lib/editorStore";
import HeroSection from "@/components/HeroSection";
import AssetLibrary from "@/components/editor/AssetLibrary";
import BannerCanvas from "@/components/BannerCanvas";
import LayerPanel from "@/components/editor/LayerPanel";
import PropertiesPanel from "@/components/editor/PropertiesPanel";
import EditorToolbar from "@/components/editor/EditorToolbar";
import BannerPreview from "@/components/BannerPreview";
import { AnimatePresence } from "framer-motion";

function EditorWorkspace() {
  const { state } = useEditor();
  const { selectLayer } = useEditorActions();
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Clicking empty workspace area deselects the current layer
  const handleWorkspaceClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).id === "canvas-container") {
      selectLayer(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0C0A08] text-[#F0E8D8] overflow-hidden">
      {/* Top Header Bar */}
      <HeroSection />

      {/* Editor Main Grid */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Side: Asset Library */}
        <AssetLibrary />

        {/* Center: Canvas Workspace */}
        <div
          ref={workspaceRef}
          onClick={handleWorkspaceClick}
          className="flex-1 flex flex-col items-center justify-start overflow-auto p-8 relative bg-[#060504] select-none"
          id="canvas-container"
          style={{
            backgroundImage: "radial-gradient(rgba(212, 168, 67, 0.015) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {/* Zoom & Action Controls */}
          <EditorToolbar />

          {/* Scaled Canvas Container */}
          <div
            className="canvas-viewport flex items-center justify-center relative mt-4 shadow-2xl transition-all duration-300"
            style={{
              width: `${state.canvasWidth * state.canvasZoom}px`,
              height: `${state.canvasHeight * state.canvasZoom}px`,
              minWidth: `${state.canvasWidth * state.canvasZoom}px`,
              minHeight: `${state.canvasHeight * state.canvasZoom}px`,
            }}
          >
            <div
              style={{
                width: `${state.canvasWidth}px`,
                height: `${state.canvasHeight}px`,
                transform: `scale(${state.canvasZoom})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <BannerCanvas />
            </div>
          </div>
        </div>

        {/* Right Side: Double Stack (Layer List & Properties) */}
        <div className="w-[340px] flex flex-col border-l border-prismax-border/30 bg-[#141210] h-full overflow-hidden select-none">
          <div className="flex-1 overflow-y-auto border-b border-prismax-border/20">
            <LayerPanel />
          </div>
          <div className="flex-1 overflow-y-auto">
            <PropertiesPanel />
          </div>
        </div>
      </div>

      {/* Popups & Modals */}
      <AnimatePresence>
        {state.showExportModal && <BannerPreview />}
      </AnimatePresence>
    </div>
  );
}

export default function Page() {
  return (
    <EditorProvider>
      <EditorWorkspace />
    </EditorProvider>
  );
}
