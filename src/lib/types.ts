/**
 * PrismaX Banner Editor — Type System
 *
 * Defines every layer type, effect, and editor state structure
 * used throughout the banner editor.
 */

/* ── Helpers ── */

export function generateId(): string {
  return `layer_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/* ── Effects ── */

export interface GlowEffect {
  enabled: boolean;
  color: string;
  radius: number;
}

export interface ShadowEffect {
  enabled: boolean;
  color: string;
  offsetX: number;
  offsetY: number;
  blur: number;
}

export interface OutlineEffect {
  enabled: boolean;
  color: string;
  width: number;
}

/* ── Layer Base ── */

export type LayerType = "avatar" | "text" | "badge" | "asset" | "image" | "background";

export interface LayerBase {
  id: string;
  name: string;
  type: LayerType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  blur: number;
  glow: GlowEffect;
  shadow: ShadowEffect;
  locked: boolean;
  visible: boolean;
  zIndex: number;
}

/* ── Specialized Layer Types ── */

export type FrameStyle = "circle" | "hexagon" | "rounded-square" | "diamond" | "none";

export interface AvatarLayer extends LayerBase {
  type: "avatar";
  imageUrl: string | null;
  frameStyle: FrameStyle;
  borderWidth: number;
  borderColor: string;
  glowColor: string;
}

export type FontFamily =
  | "Outfit"
  | "Inter"
  | "Orbitron"
  | "Rajdhani"
  | "Bebas Neue"
  | "Poppins"
  | "Oswald"
  | "Montserrat"
  | "Press Start 2P"
  | "Teko";

export interface TextLayer extends LayerBase {
  type: "text";
  content: string;
  fontFamily: FontFamily;
  fontSize: number;
  color: string;
  glowText: GlowEffect;
  outline: OutlineEffect;
  letterSpacing: number;
  textAlign: "left" | "center" | "right";
  bold: boolean;
  italic: boolean;
  textTransform: "none" | "uppercase" | "lowercase";
}

export interface BadgeLayer extends LayerBase {
  type: "badge";
  text: string;
  icon: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  fontSize: number;
  textColor: string;
  fontFamily: FontFamily;
}

export type AssetId =
  | "robot-full"
  | "robot-head"
  | "crystal"
  | "crystal-cluster"
  | "crown"
  | "shield"
  | "star"
  | "star-burst"
  | "hologram-frame"
  | "lightning"
  | "energy-orb"
  | "crosshair"
  | "hex-pattern"
  | "rank-frame"
  | "health-bar"
  | "sparkle-cluster"
  | "circuit-node"
  | "prism";

export interface AssetLayer extends LayerBase {
  type: "asset";
  assetId: AssetId;
  colorTint: string;
}

export interface ImageLayer extends LayerBase {
  type: "image";
  imageUrl: string;
  borderRadius: number;
  objectFit: "cover" | "contain" | "fill";
}

export interface BackgroundLayer extends LayerBase {
  type: "background";
  imageUrl: string | null;
  gradient: string;
  showPrismaXText: boolean;
  showParticles: boolean;
  showGrid: boolean;
  showGlowOrbs: boolean;
}

/* ── Union Type ── */

export type Layer = AvatarLayer | TextLayer | BadgeLayer | AssetLayer | ImageLayer | BackgroundLayer;

/* ── Editor State ── */

export interface EditorState {
  layers: Layer[];
  selectedLayerId: string | null;
  canvasZoom: number;
  canvasWidth: number;
  canvasHeight: number;
  showExportModal: boolean;
  history: Layer[][];
  historyIndex: number;
}

/* ── Actions ── */

export type EditorAction =
  | { type: "ADD_LAYER"; payload: Layer }
  | { type: "UPDATE_LAYER"; payload: { id: string; updates: Partial<Layer> } }
  | { type: "DELETE_LAYER"; payload: string }
  | { type: "DUPLICATE_LAYER"; payload: string }
  | { type: "SELECT_LAYER"; payload: string | null }
  | { type: "REORDER_LAYER"; payload: { id: string; newZIndex: number } }
  | { type: "MOVE_LAYER_UP"; payload: string }
  | { type: "MOVE_LAYER_DOWN"; payload: string }
  | { type: "TOGGLE_VISIBILITY"; payload: string }
  | { type: "TOGGLE_LOCK"; payload: string }
  | { type: "SET_ZOOM"; payload: number }
  | { type: "SHOW_EXPORT_MODAL"; payload: boolean }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "LOAD_STATE"; payload: Layer[] };

/* ── Default Factory Functions ── */

export function createDefaultGlow(): GlowEffect {
  return { enabled: false, color: "#D4A843", radius: 10 };
}

export function createDefaultShadow(): ShadowEffect {
  return { enabled: false, color: "rgba(0,0,0,0.5)", offsetX: 2, offsetY: 4, blur: 10 };
}

export function createDefaultOutline(): OutlineEffect {
  return { enabled: false, color: "#D4A843", width: 2 };
}

export function createAvatarLayer(overrides?: Partial<AvatarLayer>): AvatarLayer {
  return {
    id: generateId(),
    name: "Avatar",
    type: "avatar",
    x: 80,
    y: 200,
    width: 220,
    height: 220,
    rotation: 0,
    opacity: 1,
    blur: 0,
    glow: createDefaultGlow(),
    shadow: { enabled: true, color: "rgba(212,168,67,0.3)", offsetX: 0, offsetY: 0, blur: 40 },
    locked: false,
    visible: true,
    zIndex: 10,
    imageUrl: null,
    frameStyle: "circle",
    borderWidth: 4,
    borderColor: "#D4A843",
    glowColor: "rgba(212,168,67,0.25)",
    ...overrides,
  };
}

export function createTextLayer(overrides?: Partial<TextLayer>): TextLayer {
  return {
    id: generateId(),
    name: "Text",
    type: "text",
    x: 340,
    y: 250,
    width: 800,
    height: 120,
    rotation: 0,
    opacity: 1,
    blur: 0,
    glow: createDefaultGlow(),
    shadow: createDefaultShadow(),
    locked: false,
    visible: true,
    zIndex: 11,
    content: "Username",
    fontFamily: "Outfit",
    fontSize: 72,
    color: "#F0D078",
    glowText: { enabled: true, color: "rgba(212,168,67,0.25)", radius: 30 },
    outline: createDefaultOutline(),
    letterSpacing: -1,
    textAlign: "left",
    bold: true,
    italic: false,
    textTransform: "uppercase",
    ...overrides,
  };
}

export function createBadgeLayer(overrides?: Partial<BadgeLayer>): BadgeLayer {
  return {
    id: generateId(),
    name: "Badge",
    type: "badge",
    x: 340,
    y: 420,
    width: 160,
    height: 40,
    rotation: 0,
    opacity: 1,
    blur: 0,
    glow: createDefaultGlow(),
    shadow: createDefaultShadow(),
    locked: false,
    visible: true,
    zIndex: 12,
    text: "MEMBER",
    icon: "⭐",
    backgroundColor: "rgba(212,168,67,0.12)",
    borderColor: "rgba(212,168,67,0.3)",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 12,
    textColor: "#D4A843",
    fontFamily: "Outfit",
    ...overrides,
  };
}

export function createAssetLayer(assetId: AssetId, overrides?: Partial<AssetLayer>): AssetLayer {
  return {
    id: generateId(),
    name: assetId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    type: "asset",
    x: 400,
    y: 300,
    width: 120,
    height: 120,
    rotation: 0,
    opacity: 0.8,
    blur: 0,
    glow: createDefaultGlow(),
    shadow: createDefaultShadow(),
    locked: false,
    visible: true,
    zIndex: 5,
    assetId,
    colorTint: "#D4A843",
    ...overrides,
  };
}

export function createImageLayer(imageUrl: string, overrides?: Partial<ImageLayer>): ImageLayer {
  return {
    id: generateId(),
    name: "Image",
    type: "image",
    x: 200,
    y: 200,
    width: 300,
    height: 300,
    rotation: 0,
    opacity: 1,
    blur: 0,
    glow: createDefaultGlow(),
    shadow: createDefaultShadow(),
    locked: false,
    visible: true,
    zIndex: 6,
    imageUrl,
    borderRadius: 0,
    objectFit: "cover",
    ...overrides,
  };
}

export function createBackgroundLayer(overrides?: Partial<BackgroundLayer>): BackgroundLayer {
  return {
    id: generateId(),
    name: "Background",
    type: "background",
    x: 0,
    y: 0,
    width: 1600,
    height: 900,
    rotation: 0,
    opacity: 1,
    blur: 0,
    glow: createDefaultGlow(),
    shadow: createDefaultShadow(),
    locked: true,
    visible: true,
    zIndex: 0,
    imageUrl: null,
    gradient: "linear-gradient(135deg, #0C0A08 0%, #1A1208 25%, #0F0D0A 50%, #18130C 75%, #0C0A08 100%)",
    showPrismaXText: true,
    showParticles: true,
    showGrid: true,
    showGlowOrbs: true,
    ...overrides,
  };
}
