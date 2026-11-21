/**
 * Bible Covers (Louis, 2026-11-21): a full-app skin a reader puts on Bible
 * Buddy, the way people pick a Bible for its cover. Separate from the colour
 * theme (lib/appThemes.ts): the theme is what the app looks like with no
 * cover, and taking a cover off puts that theme back exactly.
 *
 * One system, not a second one. A cover is the same seventeen theme tokens the
 * whole app already reads (about 3,500 places use var(--bb-*)), plus a small
 * set of cover tokens for the parts a theme never had: frosted panel frames,
 * the warm action colour, the "completed" colour, the glow. Pages are skinned
 * by those tokens and by a handful of hook classes (bb-cv-*) in
 * app/bible-covers.css - never by substring rules like [class*="bg-white"],
 * which is what made the old skins (deleted 2026-05-28) both patchy and slow.
 *
 * Adding the next cover is a new entry here plus its artwork. Nothing else.
 */
import type { AppThemeTokens } from "./appThemes";

export type BibleCoverId =
  | "winter-cabin"
  | "midnight-garden"
  | "lavender-prayer"
  | "ruby-village"
  | "blue-storm"
  | "carolina-coastline"
  | "angel-wings"
  | "desert-dawn"
  | "slow-mornings"
  | "morning-mercy"
  | "mount-sinai"
  | "dark";

/** One light effect per cover (Louis, 2026-11-21: "do all them have light animation like the winter cabin snow one?"). */
export type BibleCoverEffect =
  | "snow" | "fireflies" | "stars" | "embers" | "fire" | "lightning"
  | "beam" | "rays" | "sand" | "rain" | "petals" | "drift" | "none";

/** What the motion switch in Settings is called for each effect. */
export const EFFECT_LABELS: Record<BibleCoverEffect, string> = {
  snow: "Falling snow", fireflies: "Fireflies", stars: "Twinkling stars", embers: "Rising embers",
  fire: "Embers and firelight", lightning: "Distant lightning", beam: "Lighthouse beam",
  rays: "Light and sparkles", sand: "Drifting sand", rain: "Rain on the window", petals: "Falling petals",
  drift: "Moving background", none: "Moving background",
};

export type BibleCoverTokens = {
  /** Panels and card frames: the deep surface the content sits on. */
  panel: string;
  panelStrong: string;
  /** Small tiles and chips that used to be pastel (generated remap). */
  tile: string;
  tileStrong: string;
  /** Thin frosted border around every holder. */
  frame: string;
  frameStrong: string;
  /** Key actions and live highlights. */
  warm: string;
  warmText: string;
  warmSoft: string;
  /** Quieter controls, progress, secondary text. */
  cool: string;
  coolSoft: string;
  /** Completed things. */
  done: string;
  doneSoft: string;
  /** Light from the scene, used once per card at most. */
  glow: string;
  /** The reading surface: solid, calm, for long sessions. */
  readerBg: string;
  readerText: string;
};

export type BibleCover = {
  id: BibleCoverId;
  name: string;
  /** The theme tokens while the cover is on. */
  theme: AppThemeTokens;
  cover: BibleCoverTokens;
  /** null: a plain cover with no picture (Dark). */
  art: { mobile: string; desktop: string; thumb: string } | null;
  /** Base colour under the art while it loads, and the still fallback tint. */
  base: string;
  /**
   * The cover's light effect, drawn over the slowly drifting art. Every one
   * only moves or fades layers (components/BibleCoverBackdrop.tsx).
   */
  motion: BibleCoverEffect;
};

/**
 * Every other cover is Winter Cabin's template with its own palette (Louis,
 * 2026-11-21: "use this as the template and all ones can be like that").
 * A cover is described by a handful of colours read off its artwork - the
 * shadow it sits in, the light in it, a second quieter hue - and everything
 * else is derived the same way Winter Cabin's is.
 */
type CoverSpec = {
  id: BibleCoverId;
  name: string;
  art: string | null; // public/skins/optimized/<art>-{mobile,desktop}.webp; null = no picture
  motion?: BibleCover["motion"];
  /** The darkest colour in the art: the page base and the reading surface. */
  base: string;
  readerBg: string;
  /** Panels: the shadow colour of the art, as "r, g, b". */
  panelRgb: string;
  /** Frames and quiet chips: the cool light in the art, as "r, g, b". */
  frameRgb: string;
  /** Text: near-white, a tinted secondary, a muted third. */
  text: string;
  secondary: string;
  muted: string;
  /** The art's warm light source: key actions and live things. */
  warm: string;
  warmText: string;
  /** Quiet controls and progress. */
  cool: string;
  done: string;
  doneRgb: string;
};

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}

function makeCover(spec: CoverSpec): BibleCover {
  const warmRgb = hexToRgb(spec.warm);
  const coolRgb = hexToRgb(spec.cool);
  return {
    id: spec.id,
    name: spec.name,
    base: spec.base,
    art: spec.art
      ? {
          mobile: `/skins/optimized/${spec.art}-mobile.webp`,
          desktop: `/skins/optimized/${spec.art}-desktop.webp`,
          thumb: `/skins/optimized/${spec.art}-thumb.webp`,
        }
      : null,
    motion: spec.motion ?? "drift",
    theme: {
      background: "transparent",
      surface: `rgba(${spec.panelRgb}, 0.88)`,
      surfaceSoft: `rgba(${spec.panelRgb}, 0.72)`,
      card: `rgba(${spec.panelRgb}, 0.84)`,
      cardBorder: `rgba(${spec.frameRgb}, 0.26)`,
      textPrimary: spec.text,
      textSecondary: spec.secondary,
      textMuted: spec.muted,
      accent: spec.warm,
      accentSoft: `rgba(${warmRgb}, 0.16)`,
      button: spec.warm,
      buttonText: spec.warmText,
      navBackground: `rgba(${spec.panelRgb}, 0.92)`,
      navActive: spec.text,
      navInactive: spec.muted,
      progressTrack: `rgba(${spec.frameRgb}, 0.2)`,
      progressFill: spec.cool,
    },
    cover: {
      panel: `rgba(${spec.panelRgb}, 0.82)`,
      panelStrong: `rgba(${spec.panelRgb}, 0.95)`,
      tile: `rgba(${spec.panelRgb}, 0.9)`,
      tileStrong: `rgba(${spec.frameRgb}, 0.16)`,
      frame: `rgba(${spec.frameRgb}, 0.26)`,
      frameStrong: `rgba(${spec.frameRgb}, 0.42)`,
      warm: spec.warm,
      warmText: spec.warmText,
      warmSoft: `rgba(${warmRgb}, 0.16)`,
      cool: spec.cool,
      coolSoft: `rgba(${coolRgb}, 0.14)`,
      done: spec.done,
      doneSoft: `rgba(${spec.doneRgb}, 0.55)`,
      glow: `rgba(${warmRgb}, 0.2)`,
      readerBg: spec.readerBg,
      readerText: spec.text,
    },
  };
}

const MORE_COVERS: CoverSpec[] = [
  // Dark mode (Louis, 2026-11-21: "light mode, dark mode and the covers").
  // Built as a cover with no picture, so every screen and popup gets the same
  // finished treatment the covers have - the old dark theme only swapped the
  // theme tokens and left white panels scattered through the app. The
  // actions stay Bible Buddy blue rather than a cover's warm colour.
  {
    id: "dark", name: "Dark", art: null, motion: "none",
    base: "#0b1017", readerBg: "#121821", panelRgb: "22, 29, 40", frameRgb: "148, 163, 184",
    text: "#F1F5F9", secondary: "#CBD5E1", muted: "#94A3B8",
    warm: "#6EA4FF", warmText: "#06142E", cool: "#93C5FD", done: "#7DB894", doneRgb: "40, 92, 72",
  },
  {
    id: "midnight-garden", motion: "fireflies", name: "Midnight Garden", art: "midnight-garden",
    base: "#050b0a", readerBg: "#0c1614", panelRgb: "10, 22, 20", frameRgb: "190, 214, 196",
    text: "#F2F6F1", secondary: "#C2D0C4", muted: "#90A496",
    warm: "#F2C072", warmText: "#2A1A05", cool: "#C6D6E6", done: "#8FC08C", doneRgb: "52, 96, 62",
  },
  {
    id: "lavender-prayer", motion: "stars", name: "Lavender Prayer", art: "lavender-prayer",
    base: "#0e0820", readerBg: "#160f2b", panelRgb: "26, 16, 50", frameRgb: "204, 180, 255",
    text: "#F6F2FF", secondary: "#D1C3F0", muted: "#A293C6",
    warm: "#F4C27E", warmText: "#2B1A06", cool: "#C9B3FF", done: "#8FC2A0", doneRgb: "50, 92, 72",
  },
  {
    id: "ruby-village", motion: "embers", name: "Ruby Village", art: "ruby-village",
    base: "#160405", readerBg: "#1d0a0b", panelRgb: "36, 10, 12", frameRgb: "255, 176, 156",
    text: "#FFF4F0", secondary: "#EBC4BA", muted: "#BC948A",
    warm: "#FFB45E", warmText: "#2E1500", cool: "#F2B8A8", done: "#9CC49A", doneRgb: "58, 92, 58",
  },
  {
    id: "blue-storm", motion: "lightning", name: "Blue Storm", art: "blue-storm",
    base: "#03081a", readerBg: "#0a1226", panelRgb: "8, 16, 40", frameRgb: "128, 172, 255",
    text: "#F1F6FF", secondary: "#B6C9EE", muted: "#8197C2",
    warm: "#CFE4FF", warmText: "#06142E", cool: "#8FB8FF", done: "#7DB894", doneRgb: "40, 92, 72",
  },
  {
    id: "carolina-coastline", motion: "beam", name: "Carolina Coast", art: "carolina-coastline",
    base: "#050e1c", readerBg: "#0c1828", panelRgb: "8, 20, 40", frameRgb: "150, 190, 235",
    text: "#F3F7FC", secondary: "#B8CBE4", muted: "#8DA3C0",
    warm: "#F6A65E", warmText: "#2C1300", cool: "#9CC6F0", done: "#7DB894", doneRgb: "40, 92, 72",
  },
  {
    id: "angel-wings", motion: "rays", name: "Angel Wings", art: "angel-wings",
    base: "#0a1834", readerBg: "#10203f", panelRgb: "14, 32, 68", frameRgb: "222, 236, 255",
    text: "#F6FAFF", secondary: "#C8D9F2", muted: "#97ACCB",
    warm: "#FFDC86", warmText: "#2A1D00", cool: "#D6E6FF", done: "#8CC4A2", doneRgb: "44, 96, 76",
  },
  {
    id: "desert-dawn", motion: "sand", name: "Desert Dawn", art: "desert-dawn",
    base: "#0b0805", readerBg: "#16110b", panelRgb: "26, 18, 10", frameRgb: "240, 204, 150",
    text: "#FBF5EC", secondary: "#E2CFAE", muted: "#B09B7C",
    warm: "#F5B24E", warmText: "#2A1700", cool: "#E6CFA6", done: "#9CBE8A", doneRgb: "60, 90, 50",
  },
  {
    id: "slow-mornings", motion: "rain", name: "Slow Mornings", art: "slow-mornings",
    base: "#120b07", readerBg: "#1a120c", panelRgb: "32, 21, 13", frameRgb: "240, 204, 158",
    text: "#FCF6EE", secondary: "#E2CDAE", muted: "#AE987D",
    warm: "#F2B866", warmText: "#2B1700", cool: "#E9D4B5", done: "#9DBE8C", doneRgb: "62, 90, 52",
  },
  {
    id: "morning-mercy", motion: "petals", name: "Morning Mercy", art: "morning-mercy",
    base: "#241310", readerBg: "#2a1814", panelRgb: "46, 25, 20", frameRgb: "255, 206, 178",
    text: "#FFF6F0", secondary: "#F0CDBE", muted: "#C49F90",
    warm: "#FFC46B", warmText: "#2C1800", cool: "#FFCFB8", done: "#A2C49A", doneRgb: "64, 94, 58",
  },
  {
    id: "mount-sinai", motion: "fire", name: "Mount Sinai", art: "mount-sinai",
    base: "#060403", readerBg: "#120d09", panelRgb: "18, 12, 8", frameRgb: "255, 184, 116",
    text: "#FDF5EC", secondary: "#DCC5A8", muted: "#A6917A",
    warm: "#FFA94D", warmText: "#2C1300", cool: "#E2C9A8", done: "#9CBE8A", doneRgb: "60, 90, 50",
  },
];

export const BIBLE_COVERS: Record<BibleCoverId, BibleCover> = {
  ...(Object.fromEntries(MORE_COVERS.map((spec) => [spec.id, makeCover(spec)])) as Record<Exclude<BibleCoverId, "winter-cabin">, BibleCover>),
  "winter-cabin": {
    id: "winter-cabin",
    name: "Winter Cabin",
    base: "#07111f",
    art: {
      mobile: "/covers/winter-cabin-mobile.webp",
      desktop: "/covers/winter-cabin-desktop.webp",
      thumb: "/covers/winter-cabin-thumb.webp",
    },
    motion: "snow",
    theme: {
      // Transparent so the scene shows through every page background; the
      // base colour sits on <html> (cover.base) instead.
      background: "transparent",
      surface: "rgba(13, 26, 46, 0.88)",
      surfaceSoft: "rgba(28, 47, 76, 0.72)",
      card: "rgba(14, 28, 50, 0.84)",
      cardBorder: "rgba(156, 196, 238, 0.26)",
      textPrimary: "#F3F7FC",
      textSecondary: "#B4CBE6",
      textMuted: "#8FA8C6",
      accent: "#F2BC78",
      accentSoft: "rgba(242, 188, 120, 0.16)",
      button: "#F5C58A",
      buttonText: "#2B1A06",
      navBackground: "rgba(11, 23, 42, 0.9)",
      navActive: "#EEF5FF",
      navInactive: "#9FB6D4",
      progressTrack: "rgba(156, 196, 238, 0.2)",
      progressFill: "#9CC6F0",
    },
    cover: {
      panel: "rgba(13, 27, 49, 0.82)",
      panelStrong: "rgba(10, 21, 39, 0.94)",
      tile: "rgba(20, 38, 64, 0.86)",
      tileStrong: "rgba(34, 58, 92, 0.92)",
      frame: "rgba(156, 196, 238, 0.26)",
      frameStrong: "rgba(170, 208, 246, 0.42)",
      warm: "#F2BC78",
      warmText: "#2B1A06",
      warmSoft: "rgba(242, 188, 120, 0.16)",
      cool: "#9CC6F0",
      coolSoft: "rgba(156, 198, 240, 0.14)",
      done: "#7DB894",
      doneSoft: "rgba(54, 104, 78, 0.55)",
      glow: "rgba(255, 186, 104, 0.2)",
      readerBg: "#0E1A2C",
      readerText: "#E9F0F9",
    },
  },
};

/**
 * Pages that keep their own look under a cover: the marketing and sign-in
 * pages and the blog, which are built light for strangers and Google.
 * Narrower than lib/publicRoutes on purpose - a study's page is public but is
 * also where a signed-in reader studies, so it wears the cover.
 */
export const COVER_EXCLUDED_EXACT = [
  "/", "/app", "/login", "/signup", "/reset-password", "/privacy", "/terms",
  "/community-guidelines", "/faq", "/unsubscribe", "/features", "/how-it-works",
  "/android", "/updates", "/ambassador",
];
export const COVER_EXCLUDED_PREFIXES = ["/blog", "/r"];

export function isCoverExcludedPath(pathname: string): boolean {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (COVER_EXCLUDED_EXACT.includes(path)) return true;
  return COVER_EXCLUDED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export const BIBLE_COVER_STORAGE_KEY = "bb:bible-cover:v1";
export const BIBLE_COVER_EVENT = "bb:bible-cover-changed";

export function normalizeBibleCoverId(value: unknown): BibleCoverId | null {
  return typeof value === "string" && value in BIBLE_COVERS ? (value as BibleCoverId) : null;
}

export function readBibleCover(): BibleCoverId | null {
  if (typeof window === "undefined") return null;
  try {
    return normalizeBibleCoverId(window.localStorage.getItem(BIBLE_COVER_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Saves the choice on this device and tells the app to repaint. */
export function setBibleCover(id: BibleCoverId | null) {
  if (typeof window === "undefined") return;
  try {
    if (id) window.localStorage.setItem(BIBLE_COVER_STORAGE_KEY, id);
    else window.localStorage.removeItem(BIBLE_COVER_STORAGE_KEY);
  } catch {
    // Storage blocked: the cover still applies for this visit.
  }
  window.dispatchEvent(new CustomEvent(BIBLE_COVER_EVENT, { detail: { id } }));
}

const COVER_VARS: Record<keyof BibleCoverTokens, string> = {
  panel: "--bb-cover-panel",
  panelStrong: "--bb-cover-panel-strong",
  tile: "--bb-cover-tile",
  tileStrong: "--bb-cover-tile-strong",
  frame: "--bb-cover-frame",
  frameStrong: "--bb-cover-frame-strong",
  warm: "--bb-cover-warm",
  warmText: "--bb-cover-warm-text",
  warmSoft: "--bb-cover-warm-soft",
  cool: "--bb-cover-cool",
  coolSoft: "--bb-cover-cool-soft",
  done: "--bb-cover-done",
  doneSoft: "--bb-cover-done-soft",
  glow: "--bb-cover-glow",
  readerBg: "--bb-cover-reader-bg",
  readerText: "--bb-cover-reader-text",
};

/** The cover-only CSS variables, by name - shared with the first-paint script. */
export function bibleCoverCssVars(cover: BibleCover): Record<string, string> {
  const out: Record<string, string> = { "--bb-cover-base": cover.base };
  (Object.keys(COVER_VARS) as Array<keyof BibleCoverTokens>).forEach((key) => {
    out[COVER_VARS[key]] = cover.cover[key];
  });
  return out;
}

/**
 * Called by applyAppThemeToDocument after the theme has written its tokens.
 * With a cover on, the cover's tokens replace the theme's; with none, every
 * cover variable and attribute is removed, so the theme stands as it was.
 */
export function applyBibleCoverToDocument(
  id: BibleCoverId | null,
  setThemeTokens: (tokens: AppThemeTokens) => void,
) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const cover = id && !isCoverExcludedPath(window.location.pathname) ? BIBLE_COVERS[id] : null;
  if (!cover) {
    delete root.dataset.bbCover;
    (Object.values(COVER_VARS) as string[]).forEach((name) => root.style.removeProperty(name));
    root.style.removeProperty("--bb-cover-base");
    root.style.removeProperty("color-scheme");
    // The first-paint script may have painted the cover's base here.
    root.style.backgroundColor = root.style.getPropertyValue("--bb-background") || "";
    return;
  }
  root.dataset.bbCover = cover.id;
  setThemeTokens(cover.theme);
  Object.entries(bibleCoverCssVars(cover)).forEach(([name, value]) => root.style.setProperty(name, value));
  root.style.setProperty("--background", cover.base);
  root.style.setProperty("color-scheme", "dark");
  root.style.backgroundColor = cover.base;
}
