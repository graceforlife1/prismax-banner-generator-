"use client";

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";
import {
  type EditorState,
  type EditorAction,
  type Layer,
  generateId,
  createBackgroundLayer,
  createAvatarLayer,
  createTextLayer,
  createBadgeLayer,
} from "./types";

/* ── Initial State with default PrismaX composition ── */

function createInitialLayers(): Layer[] {
  return [
    createBackgroundLayer(),
    createAvatarLayer({
      id: "default-avatar",
      name: "Profile Avatar",
      x: 80,
      y: 240,
      width: 240,
      height: 240,
      zIndex: 10,
    }),
    createTextLayer({
      id: "default-username",
      name: "Username",
      x: 370,
      y: 230,
      width: 900,
      height: 100,
      content: "YourName",
      fontSize: 80,
      fontFamily: "Outfit",
      bold: true,
      letterSpacing: -1,
      zIndex: 11,
    }),
    createTextLayer({
      id: "default-tagline",
      name: "Tagline",
      x: 370,
      y: 350,
      width: 600,
      height: 40,
      content: "Community Member",
      fontSize: 16,
      fontFamily: "Outfit",
      bold: false,
      letterSpacing: 6,
      color: "rgba(212,168,67,0.6)",
      textTransform: "uppercase",
      zIndex: 11,
      glowText: { enabled: false, color: "rgba(212,168,67,0.1)", radius: 10 },
    }),
    createBadgeLayer({
      id: "default-badge-verified",
      name: "Verified Badge",
      x: 370,
      y: 410,
      width: 160,
      height: 36,
      text: "VERIFIED",
      icon: "✓",
      zIndex: 12,
    }),
    createBadgeLayer({
      id: "default-badge-premium",
      name: "Premium Badge",
      x: 550,
      y: 410,
      width: 140,
      height: 36,
      text: "PREMIUM",
      icon: "⭐",
      zIndex: 12,
    }),
    createTextLayer({
      id: "default-brand",
      name: "Brand Tagline",
      x: 370,
      y: 480,
      width: 700,
      height: 30,
      content: "Real-World Behavior • Advanced Models • Quality",
      fontSize: 14,
      fontFamily: "Outfit",
      bold: false,
      letterSpacing: 3,
      color: "rgba(168,152,128,0.5)",
      textTransform: "uppercase",
      zIndex: 9,
      glowText: { enabled: false, color: "rgba(212,168,67,0.05)", radius: 5 },
    }),
  ];
}

const initialState: EditorState = {
  layers: createInitialLayers(),
  selectedLayerId: null,
  canvasZoom: 0.55,
  canvasWidth: 1600,
  canvasHeight: 900,
  showExportModal: false,
  history: [createInitialLayers()],
  historyIndex: 0,
};

/* ── Reducer ── */

function pushHistory(state: EditorState, newLayers: Layer[]): Partial<EditorState> {
  const newHistory = state.history.slice(0, state.historyIndex + 1);
  newHistory.push(newLayers);
  // Keep max 30 history entries
  if (newHistory.length > 30) newHistory.shift();
  return {
    history: newHistory,
    historyIndex: newHistory.length - 1,
  };
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "ADD_LAYER": {
      const newLayers = [...state.layers, action.payload];
      return {
        ...state,
        layers: newLayers,
        selectedLayerId: action.payload.id,
        ...pushHistory(state, newLayers),
      };
    }

    case "UPDATE_LAYER": {
      const newLayers = state.layers.map((l) =>
        l.id === action.payload.id ? ({ ...l, ...action.payload.updates } as Layer) : l
      );
      return {
        ...state,
        layers: newLayers,
        ...pushHistory(state, newLayers),
      };
    }

    case "DELETE_LAYER": {
      const newLayers = state.layers.filter((l) => l.id !== action.payload);
      return {
        ...state,
        layers: newLayers,
        selectedLayerId: state.selectedLayerId === action.payload ? null : state.selectedLayerId,
        ...pushHistory(state, newLayers),
      };
    }

    case "DUPLICATE_LAYER": {
      const source = state.layers.find((l) => l.id === action.payload);
      if (!source) return state;
      const dup: Layer = {
        ...source,
        id: generateId(),
        name: `${source.name} (Copy)`,
        x: source.x + 20,
        y: source.y + 20,
        zIndex: Math.max(...state.layers.map((l) => l.zIndex)) + 1,
      } as Layer;
      const newLayers = [...state.layers, dup];
      return {
        ...state,
        layers: newLayers,
        selectedLayerId: dup.id,
        ...pushHistory(state, newLayers),
      };
    }

    case "SELECT_LAYER":
      return { ...state, selectedLayerId: action.payload };

    case "MOVE_LAYER_UP": {
      const sorted = [...state.layers].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((l) => l.id === action.payload);
      if (idx < 0 || idx >= sorted.length - 1) return state;
      const currentZ = sorted[idx].zIndex;
      const nextZ = sorted[idx + 1].zIndex;
      const newLayers = state.layers.map((l) => {
        if (l.id === sorted[idx].id) return { ...l, zIndex: nextZ } as Layer;
        if (l.id === sorted[idx + 1].id) return { ...l, zIndex: currentZ } as Layer;
        return l;
      });
      return { ...state, layers: newLayers, ...pushHistory(state, newLayers) };
    }

    case "MOVE_LAYER_DOWN": {
      const sorted = [...state.layers].sort((a, b) => a.zIndex - b.zIndex);
      const idx = sorted.findIndex((l) => l.id === action.payload);
      if (idx <= 0) return state;
      const currentZ = sorted[idx].zIndex;
      const prevZ = sorted[idx - 1].zIndex;
      const newLayers = state.layers.map((l) => {
        if (l.id === sorted[idx].id) return { ...l, zIndex: prevZ } as Layer;
        if (l.id === sorted[idx - 1].id) return { ...l, zIndex: currentZ } as Layer;
        return l;
      });
      return { ...state, layers: newLayers, ...pushHistory(state, newLayers) };
    }

    case "REORDER_LAYER": {
      const newLayers = state.layers.map((l) =>
        l.id === action.payload.id ? ({ ...l, zIndex: action.payload.newZIndex } as Layer) : l
      );
      return { ...state, layers: newLayers, ...pushHistory(state, newLayers) };
    }

    case "TOGGLE_VISIBILITY": {
      const newLayers = state.layers.map((l) =>
        l.id === action.payload ? ({ ...l, visible: !l.visible } as Layer) : l
      );
      return { ...state, layers: newLayers };
    }

    case "TOGGLE_LOCK": {
      const newLayers = state.layers.map((l) =>
        l.id === action.payload ? ({ ...l, locked: !l.locked } as Layer) : l
      );
      return { ...state, layers: newLayers };
    }

    case "SET_ZOOM":
      return { ...state, canvasZoom: Math.max(0.2, Math.min(2, action.payload)) };

    case "SHOW_EXPORT_MODAL":
      return { ...state, showExportModal: action.payload };

    case "UNDO": {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return {
        ...state,
        layers: state.history[newIndex],
        historyIndex: newIndex,
      };
    }

    case "REDO": {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return {
        ...state,
        layers: state.history[newIndex],
        historyIndex: newIndex,
      };
    }

    case "LOAD_STATE":
      return {
        ...state,
        layers: action.payload,
        ...pushHistory(state, action.payload),
      };

    default:
      return state;
  }
}

/* ── Context ── */

interface EditorContextValue {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  selectedLayer: Layer | null;
  sortedLayers: Layer[];
}

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  const selectedLayer = state.layers.find((l) => l.id === state.selectedLayerId) ?? null;
  const sortedLayers = [...state.layers].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <EditorContext.Provider value={{ state, dispatch, selectedLayer, sortedLayers }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be used within EditorProvider");
  return ctx;
}

export function useEditorActions() {
  const { dispatch } = useEditor();

  const addLayer = useCallback((layer: Layer) => dispatch({ type: "ADD_LAYER", payload: layer }), [dispatch]);
  const updateLayer = useCallback(
    (id: string, updates: Partial<Layer>) =>
      dispatch({ type: "UPDATE_LAYER", payload: { id, updates } }),
    [dispatch]
  );
  const deleteLayer = useCallback((id: string) => dispatch({ type: "DELETE_LAYER", payload: id }), [dispatch]);
  const duplicateLayer = useCallback((id: string) => dispatch({ type: "DUPLICATE_LAYER", payload: id }), [dispatch]);
  const selectLayer = useCallback(
    (id: string | null) => dispatch({ type: "SELECT_LAYER", payload: id }),
    [dispatch]
  );
  const moveLayerUp = useCallback((id: string) => dispatch({ type: "MOVE_LAYER_UP", payload: id }), [dispatch]);
  const moveLayerDown = useCallback((id: string) => dispatch({ type: "MOVE_LAYER_DOWN", payload: id }), [dispatch]);
  const toggleVisibility = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_VISIBILITY", payload: id }),
    [dispatch]
  );
  const toggleLock = useCallback((id: string) => dispatch({ type: "TOGGLE_LOCK", payload: id }), [dispatch]);
  const setZoom = useCallback((z: number) => dispatch({ type: "SET_ZOOM", payload: z }), [dispatch]);
  const undo = useCallback(() => dispatch({ type: "UNDO" }), [dispatch]);
  const redo = useCallback(() => dispatch({ type: "REDO" }), [dispatch]);
  const showExportModal = useCallback(
    (show: boolean) => dispatch({ type: "SHOW_EXPORT_MODAL", payload: show }),
    [dispatch]
  );

  return {
    addLayer,
    updateLayer,
    deleteLayer,
    duplicateLayer,
    selectLayer,
    moveLayerUp,
    moveLayerDown,
    toggleVisibility,
    toggleLock,
    setZoom,
    undo,
    redo,
    showExportModal,
  };
}
