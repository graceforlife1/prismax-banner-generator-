/**
 * PrismaX SVG Asset Library
 *
 * Collection of decorative SVG assets in the PrismaX gold/brown palette.
 * Each asset is a function that returns an SVG string for rendering.
 */

import type { AssetId } from "./types";

export interface AssetMeta {
  id: AssetId;
  name: string;
  category: "character" | "decoration" | "gaming" | "effect" | "shape";
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
}

export const ASSET_CATALOG: AssetMeta[] = [
  { id: "robot-full", name: "Robot", category: "character", icon: "🤖", defaultWidth: 160, defaultHeight: 200 },
  { id: "robot-head", name: "Robot Head", category: "character", icon: "🤖", defaultWidth: 100, defaultHeight: 100 },
  { id: "crystal", name: "Crystal", category: "decoration", icon: "💎", defaultWidth: 80, defaultHeight: 120 },
  { id: "crystal-cluster", name: "Crystal Cluster", category: "decoration", icon: "💎", defaultWidth: 160, defaultHeight: 140 },
  { id: "crown", name: "Crown", category: "decoration", icon: "👑", defaultWidth: 120, defaultHeight: 80 },
  { id: "shield", name: "Shield", category: "gaming", icon: "🛡️", defaultWidth: 100, defaultHeight: 120 },
  { id: "star", name: "Star", category: "decoration", icon: "⭐", defaultWidth: 80, defaultHeight: 80 },
  { id: "star-burst", name: "Star Burst", category: "effect", icon: "✨", defaultWidth: 140, defaultHeight: 140 },
  { id: "hologram-frame", name: "Hologram Frame", category: "gaming", icon: "🔮", defaultWidth: 200, defaultHeight: 160 },
  { id: "lightning", name: "Lightning", category: "effect", icon: "⚡", defaultWidth: 60, defaultHeight: 140 },
  { id: "energy-orb", name: "Energy Orb", category: "effect", icon: "🔵", defaultWidth: 100, defaultHeight: 100 },
  { id: "crosshair", name: "Crosshair", category: "gaming", icon: "🎯", defaultWidth: 80, defaultHeight: 80 },
  { id: "hex-pattern", name: "Hex Pattern", category: "shape", icon: "⬡", defaultWidth: 160, defaultHeight: 140 },
  { id: "rank-frame", name: "Rank Frame", category: "gaming", icon: "🎮", defaultWidth: 120, defaultHeight: 120 },
  { id: "health-bar", name: "Health Bar", category: "gaming", icon: "❤️", defaultWidth: 200, defaultHeight: 30 },
  { id: "sparkle-cluster", name: "Sparkles", category: "effect", icon: "✨", defaultWidth: 120, defaultHeight: 120 },
  { id: "circuit-node", name: "Circuit Node", category: "shape", icon: "⚙️", defaultWidth: 100, defaultHeight: 100 },
  { id: "prism", name: "Prism", category: "shape", icon: "🔺", defaultWidth: 80, defaultHeight: 100 },
];

/**
 * Returns the SVG markup string for a given asset ID.
 * Color parameter allows tinting.
 */
export function getAssetSVG(id: AssetId, color: string = "#D4A843"): string {
  const c = color;
  const cFaded = color + "66"; // 40% opacity hex
  const cLight = "#F0D078";

  switch (id) {
    case "robot-full":
      return `<svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="55" y="10" width="50" height="50" rx="10" fill="${c}" opacity="0.9"/>
        <circle cx="70" cy="30" r="6" fill="#0C0A08"/>
        <circle cx="90" cy="30" r="6" fill="#0C0A08"/>
        <rect x="72" y="42" width="16" height="4" rx="2" fill="#0C0A08" opacity="0.6"/>
        <line x1="80" y1="2" x2="80" y2="12" stroke="${c}" stroke-width="2"/>
        <circle cx="80" cy="2" r="4" fill="${cLight}" opacity="0.8"/>
        <rect x="45" y="65" width="70" height="80" rx="8" fill="${c}" opacity="0.8"/>
        <rect x="55" y="75" width="50" height="30" rx="4" fill="#0C0A08" opacity="0.3"/>
        <text x="80" y="96" text-anchor="middle" fill="${cLight}" font-size="14" font-family="monospace">P(x)</text>
        <rect x="20" y="70" width="20" height="50" rx="6" fill="${c}" opacity="0.7"/>
        <rect x="120" y="70" width="20" height="50" rx="6" fill="${c}" opacity="0.7"/>
        <rect x="52" y="150" width="22" height="40" rx="6" fill="${c}" opacity="0.7"/>
        <rect x="86" y="150" width="22" height="40" rx="6" fill="${c}" opacity="0.7"/>
        <circle cx="63" cy="192" r="8" fill="${c}" opacity="0.5"/>
        <circle cx="97" cy="192" r="8" fill="${c}" opacity="0.5"/>
      </svg>`;

    case "robot-head":
      return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="20" width="70" height="60" rx="14" fill="${c}" opacity="0.9"/>
        <circle cx="37" cy="45" r="8" fill="#0C0A08"/>
        <circle cx="63" cy="45" r="8" fill="#0C0A08"/>
        <circle cx="37" cy="43" r="3" fill="${cLight}" opacity="0.6"/>
        <circle cx="63" cy="43" r="3" fill="${cLight}" opacity="0.6"/>
        <rect x="38" y="60" width="24" height="6" rx="3" fill="#0C0A08" opacity="0.5"/>
        <line x1="50" y1="8" x2="50" y2="22" stroke="${c}" stroke-width="2.5"/>
        <circle cx="50" cy="6" r="5" fill="${cLight}"/>
        <rect x="5" y="40" width="12" height="8" rx="4" fill="${c}" opacity="0.6"/>
        <rect x="83" y="40" width="12" height="8" rx="4" fill="${c}" opacity="0.6"/>
      </svg>`;

    case "crystal":
      return `<svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 5 L65 40 L55 115 L40 118 L25 115 L15 40 Z" fill="${c}" opacity="0.6"/>
        <path d="M40 5 L65 40 L40 118 Z" fill="${cLight}" opacity="0.3"/>
        <path d="M40 5 L15 40 L40 118 Z" fill="${c}" opacity="0.4"/>
        <line x1="40" y1="5" x2="40" y2="118" stroke="${cLight}" stroke-width="0.5" opacity="0.5"/>
        <line x1="15" y1="40" x2="65" y2="40" stroke="${cLight}" stroke-width="0.5" opacity="0.4"/>
      </svg>`;

    case "crystal-cluster":
      return `<svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 10 L80 50 L70 130 L60 133 L50 130 L40 50 Z" fill="${c}" opacity="0.7"/>
        <path d="M60 10 L80 50 L60 133 Z" fill="${cLight}" opacity="0.25"/>
        <path d="M100 30 L115 60 L108 120 L100 122 L92 120 L85 60 Z" fill="${c}" opacity="0.6"/>
        <path d="M100 30 L115 60 L100 122 Z" fill="${cLight}" opacity="0.2"/>
        <path d="M30 40 L42 65 L37 110 L30 112 L23 110 L18 65 Z" fill="${c}" opacity="0.5"/>
        <path d="M130 50 L140 70 L136 105 L130 107 L124 105 L120 70 Z" fill="${c}" opacity="0.45"/>
      </svg>`;

    case "crown":
      return `<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 65 L20 20 L40 40 L60 8 L80 40 L100 20 L110 65 Z" fill="${c}" opacity="0.85"/>
        <path d="M10 65 L110 65 L108 75 L12 75 Z" fill="${c}"/>
        <circle cx="20" cy="18" r="5" fill="${cLight}"/>
        <circle cx="60" cy="6" r="6" fill="${cLight}"/>
        <circle cx="100" cy="18" r="5" fill="${cLight}"/>
        <circle cx="40" cy="68" r="3" fill="${cLight}" opacity="0.6"/>
        <circle cx="60" cy="68" r="3" fill="${cLight}" opacity="0.6"/>
        <circle cx="80" cy="68" r="3" fill="${cLight}" opacity="0.6"/>
      </svg>`;

    case "shield":
      return `<svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 5 L90 20 L90 60 C90 85 70 105 50 115 C30 105 10 85 10 60 L10 20 Z" fill="${c}" opacity="0.15"/>
        <path d="M50 5 L90 20 L90 60 C90 85 70 105 50 115 C30 105 10 85 10 60 L10 20 Z" stroke="${c}" stroke-width="2.5"/>
        <path d="M50 15 L82 27 L82 58 C82 79 65 96 50 105 C35 96 18 79 18 58 L18 27 Z" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <path d="M40 55 L48 63 L65 46" stroke="${cLight}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

    case "star":
      return `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 5 L48 28 L72 28 L53 43 L59 67 L40 53 L21 67 L27 43 L8 28 L32 28 Z" fill="${c}" opacity="0.85"/>
        <path d="M40 5 L48 28 L72 28 L53 43 L59 67 L40 53 L21 67 L27 43 L8 28 L32 28 Z" stroke="${cLight}" stroke-width="1" opacity="0.4"/>
        <path d="M40 18 L44 30 L57 30 L47 38 L50 50 L40 43 L30 50 L33 38 L23 30 L36 30 Z" fill="${cLight}" opacity="0.3"/>
      </svg>`;

    case "star-burst":
      return `<svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="70" y1="10" x2="70" y2="130" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <line x1="10" y1="70" x2="130" y2="70" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <line x1="25" y1="25" x2="115" y2="115" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <line x1="115" y1="25" x2="25" y2="115" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <circle cx="70" cy="70" r="15" fill="${c}" opacity="0.3"/>
        <circle cx="70" cy="70" r="8" fill="${cLight}" opacity="0.6"/>
        <circle cx="70" cy="70" r="3" fill="#fff" opacity="0.8"/>
        <circle cx="70" cy="10" r="3" fill="${cLight}" opacity="0.5"/>
        <circle cx="70" cy="130" r="3" fill="${cLight}" opacity="0.5"/>
        <circle cx="10" cy="70" r="3" fill="${cLight}" opacity="0.5"/>
        <circle cx="130" cy="70" r="3" fill="${cLight}" opacity="0.5"/>
      </svg>`;

    case "hologram-frame":
      return `<svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="190" height="150" rx="4" stroke="${c}" stroke-width="1.5" opacity="0.5"/>
        <rect x="12" y="12" width="176" height="136" rx="2" stroke="${c}" stroke-width="0.5" opacity="0.3"/>
        <line x1="5" y1="25" x2="45" y2="25" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <line x1="5" y1="5" x2="5" y2="35" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <line x1="155" y1="155" x2="195" y2="155" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <line x1="195" y1="125" x2="195" y2="155" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <text x="15" y="20" fill="${c}" font-size="8" font-family="monospace" opacity="0.5">SYS://PRISMAX</text>
        <text x="140" y="150" fill="${c}" font-size="7" font-family="monospace" opacity="0.4">v2.0.26</text>
        <line x1="15" y1="30" x2="60" y2="30" stroke="${c}" stroke-width="0.5" stroke-dasharray="2 3" opacity="0.3"/>
      </svg>`;

    case "lightning":
      return `<svg viewBox="0 0 60 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 5 L15 60 L28 60 L10 135 L50 55 L35 55 L55 5 Z" fill="${c}" opacity="0.8"/>
        <path d="M35 5 L15 60 L28 60 L10 135 L50 55 L35 55 L55 5 Z" stroke="${cLight}" stroke-width="1" opacity="0.4"/>
        <path d="M38 15 L22 58 L32 58 L18 120" stroke="${cLight}" stroke-width="1.5" opacity="0.3" fill="none"/>
      </svg>`;

    case "energy-orb":
      return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="${c}" opacity="0.1"/>
        <circle cx="50" cy="50" r="25" fill="${c}" opacity="0.15"/>
        <circle cx="50" cy="50" r="15" fill="${c}" opacity="0.25"/>
        <circle cx="50" cy="50" r="8" fill="${cLight}" opacity="0.6"/>
        <circle cx="50" cy="50" r="3" fill="#fff" opacity="0.8"/>
        <circle cx="50" cy="50" r="40" stroke="${c}" stroke-width="0.8" opacity="0.3" stroke-dasharray="4 6"/>
        <circle cx="50" cy="50" r="45" stroke="${c}" stroke-width="0.5" opacity="0.15" stroke-dasharray="2 8"/>
      </svg>`;

    case "crosshair":
      return `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="25" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <circle cx="40" cy="40" r="12" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <circle cx="40" cy="40" r="2" fill="${cLight}"/>
        <line x1="40" y1="5" x2="40" y2="15" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
        <line x1="40" y1="65" x2="40" y2="75" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
        <line x1="5" y1="40" x2="15" y2="40" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
        <line x1="65" y1="40" x2="75" y2="40" stroke="${c}" stroke-width="1.5" opacity="0.7"/>
      </svg>`;

    case "hex-pattern":
      return `<svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 L80 25 L80 55 L50 70 L20 55 L20 25 Z" stroke="${c}" stroke-width="1" opacity="0.3" fill="${c}" fill-opacity="0.05"/>
        <path d="M110 10 L140 25 L140 55 L110 70 L80 55 L80 25 Z" stroke="${c}" stroke-width="1" opacity="0.25" fill="${c}" fill-opacity="0.03"/>
        <path d="M80 55 L110 70 L110 100 L80 115 L50 100 L50 70 Z" stroke="${c}" stroke-width="1" opacity="0.2" fill="${c}" fill-opacity="0.04"/>
        <path d="M50 10 L80 25 L80 55 L50 70 L20 55 L20 25 Z" stroke="${cLight}" stroke-width="0.5" opacity="0.15"/>
      </svg>`;

    case "rank-frame":
      return `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 5 L105 25 L115 75 L85 110 L35 110 L5 75 L15 25 Z" stroke="${c}" stroke-width="2" opacity="0.7"/>
        <path d="M60 15 L97 32 L105 72 L80 102 L40 102 L15 72 L23 32 Z" stroke="${c}" stroke-width="1" opacity="0.3"/>
        <text x="60" y="65" text-anchor="middle" fill="${cLight}" font-size="24" font-weight="bold" font-family="sans-serif" opacity="0.8">S+</text>
        <circle cx="60" cy="25" r="4" fill="${cLight}" opacity="0.5"/>
      </svg>`;

    case "health-bar":
      return `<svg viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="196" height="26" rx="4" fill="#0C0A08" opacity="0.6"/>
        <rect x="2" y="2" width="196" height="26" rx="4" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <rect x="5" y="5" width="152" height="20" rx="2" fill="${c}" opacity="0.7"/>
        <rect x="5" y="5" width="152" height="10" rx="2" fill="${cLight}" opacity="0.2"/>
        <text x="170" y="20" fill="${cLight}" font-size="10" font-family="monospace" opacity="0.7">80%</text>
      </svg>`;

    case "sparkle-cluster":
      return `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 30 L63 50 L80 45 L65 55 L75 70 L60 60 L45 70 L55 55 L40 45 L57 50 Z" fill="${cLight}" opacity="0.7"/>
        <path d="M30 60 L32 70 L40 68 L34 73 L38 80 L30 76 L22 80 L26 73 L20 68 L28 70 Z" fill="${c}" opacity="0.5"/>
        <path d="M85 75 L87 83 L93 81 L88 85 L92 90 L85 87 L78 90 L82 85 L77 81 L83 83 Z" fill="${c}" opacity="0.4"/>
        <circle cx="90" cy="30" r="2" fill="${cLight}" opacity="0.6"/>
        <circle cx="25" cy="40" r="1.5" fill="${cLight}" opacity="0.5"/>
        <circle cx="95" cy="55" r="1" fill="${cLight}" opacity="0.4"/>
        <circle cx="50" cy="90" r="1.5" fill="${c}" opacity="0.3"/>
      </svg>`;

    case "circuit-node":
      return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="10" fill="${c}" opacity="0.3"/>
        <circle cx="50" cy="50" r="10" stroke="${c}" stroke-width="1.5" opacity="0.6"/>
        <circle cx="50" cy="50" r="4" fill="${cLight}" opacity="0.7"/>
        <line x1="50" y1="10" x2="50" y2="40" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <line x1="50" y1="60" x2="50" y2="90" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <line x1="10" y1="50" x2="40" y2="50" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <line x1="60" y1="50" x2="90" y2="50" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <circle cx="50" cy="10" r="3" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <circle cx="50" cy="90" r="3" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <circle cx="10" cy="50" r="3" stroke="${c}" stroke-width="1" opacity="0.4"/>
        <circle cx="90" cy="50" r="3" stroke="${c}" stroke-width="1" opacity="0.4"/>
      </svg>`;

    case "prism":
      return `<svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 5 L10 85 L40 70 Z" fill="${c}" opacity="0.7"/>
        <path d="M40 5 L70 85 L40 70 Z" fill="${cLight}" opacity="0.4"/>
        <path d="M10 85 L40 70 L70 85 L40 95 Z" fill="${c}" opacity="0.3"/>
        <line x1="40" y1="5" x2="40" y2="70" stroke="${cLight}" stroke-width="0.5" opacity="0.4"/>
        <line x1="40" y1="5" x2="10" y2="85" stroke="${cLight}" stroke-width="0.5" opacity="0.2"/>
      </svg>`;

    default:
      return `<svg viewBox="0 0 80 80"><rect width="80" height="80" fill="${c}" opacity="0.2" rx="8"/></svg>`;
  }
}

/** Badge icon presets */
export const BADGE_ICONS = [
  "✓", "⭐", "👑", "🛡️", "⚡", "💎", "🎮", "🤖", "🔥", "❤️",
  "🏆", "🎯", "💫", "🌟", "🔮", "⚔️", "🎭", "🎪", "🎁", "🏅",
];

/** Badge template presets */
export const BADGE_PRESETS = [
  { text: "ADMIN", icon: "🛡️", bg: "rgba(220,50,50,0.15)", border: "rgba(220,50,50,0.4)", textColor: "#FF6B6B" },
  { text: "MODERATOR", icon: "⚡", bg: "rgba(100,140,255,0.15)", border: "rgba(100,140,255,0.4)", textColor: "#6B8FFF" },
  { text: "VIP", icon: "👑", bg: "rgba(212,168,67,0.15)", border: "rgba(212,168,67,0.4)", textColor: "#D4A843" },
  { text: "MEMBER", icon: "⭐", bg: "rgba(212,168,67,0.1)", border: "rgba(212,168,67,0.25)", textColor: "#D4A843" },
  { text: "VERIFIED", icon: "✓", bg: "rgba(80,200,120,0.12)", border: "rgba(80,200,120,0.35)", textColor: "#50C878" },
  { text: "STREAMER", icon: "🎮", bg: "rgba(160,90,220,0.15)", border: "rgba(160,90,220,0.4)", textColor: "#A05ADC" },
  { text: "SUPPORTER", icon: "❤️", bg: "rgba(255,100,130,0.12)", border: "rgba(255,100,130,0.35)", textColor: "#FF6482" },
  { text: "OG", icon: "💫", bg: "rgba(255,180,50,0.15)", border: "rgba(255,180,50,0.4)", textColor: "#FFB432" },
];
