export type PremiumSkinId = "none" | "blue-storm" | "midnight-garden";

export type PremiumSkinPalette = {
  background: string;
  surface: string;
  surfaceSoft: string;
  card: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentSoft: string;
  button: string;
  buttonText: string;
  navBackground: string;
  navActive: string;
  navInactive: string;
  progressTrack: string;
  progressFill: string;
};

export type PremiumSkin = {
  id: Exclude<PremiumSkinId, "none">;
  name: string;
  label: string;
  storeSubtitle: string;
  backgroundImage: string;
  price: number;
  palette: PremiumSkinPalette;
};

export const PREMIUM_SKIN_STORAGE_KEY = "bb:premium-skin";

export const BLUE_STORM_SKIN: PremiumSkin = {
  id: "blue-storm",
  name: "Blue Storm",
  label: "Premium Skin",
  storeSubtitle: "A cinematic storm atmosphere for focused Bible study.",
  backgroundImage: "/skins/Bluestormskin.png",
  price: 1000,
  palette: {
    background: "#061322",
    surface: "rgba(8, 22, 42, 0.74)",
    surfaceSoft: "rgba(31, 84, 132, 0.28)",
    card: "rgba(7, 20, 38, 0.72)",
    cardBorder: "rgba(103, 204, 255, 0.34)",
    textPrimary: "#F5FBFF",
    textSecondary: "#C7E8FF",
    textMuted: "#91B9D4",
    accent: "#5DD6FF",
    accentSoft: "rgba(47, 154, 255, 0.22)",
    button: "#075AA8",
    buttonText: "#F5FBFF",
    navBackground: "rgba(6, 18, 35, 0.86)",
    navActive: "#67D6FF",
    navInactive: "#9CBBD0",
    progressTrack: "rgba(180, 225, 255, 0.2)",
    progressFill: "#5DD6FF",
  },
};

export const MIDNIGHT_GARDEN_SKIN: PremiumSkin = {
  id: "midnight-garden",
  name: "Midnight Garden",
  label: "Premium Skin",
  storeSubtitle: "A peaceful moonlit garden atmosphere for quiet nighttime prayer and reflection.",
  backgroundImage: "/skins/MidnightGarden.png",
  price: 1000,
  palette: {
    background: "#07100F",
    surface: "rgba(9, 21, 24, 0.76)",
    surfaceSoft: "rgba(53, 77, 48, 0.3)",
    card: "rgba(8, 18, 24, 0.74)",
    cardBorder: "rgba(158, 183, 112, 0.34)",
    textPrimary: "#FFF7DF",
    textSecondary: "#D9DEBD",
    textMuted: "#A8B289",
    accent: "#AFCF7A",
    accentSoft: "rgba(151, 179, 105, 0.2)",
    button: "#566C32",
    buttonText: "#FFF8DE",
    navBackground: "rgba(7, 14, 18, 0.88)",
    navActive: "#D7B86B",
    navInactive: "#AAB18B",
    progressTrack: "rgba(218, 203, 148, 0.18)",
    progressFill: "#D7B86B",
  },
};

export const PREMIUM_SKINS: PremiumSkin[] = [BLUE_STORM_SKIN, MIDNIGHT_GARDEN_SKIN];
export const PREMIUM_SKIN_BY_ID = new Map(PREMIUM_SKINS.map((skin) => [skin.id, skin]));

export function normalizePremiumSkinId(value: unknown): PremiumSkinId {
  return PREMIUM_SKIN_BY_ID.has(value as Exclude<PremiumSkinId, "none">)
    ? (value as Exclude<PremiumSkinId, "none">)
    : "none";
}

export function getPremiumSkin(value: unknown): PremiumSkin | null {
  const skinId = normalizePremiumSkinId(value);
  if (skinId === "none") return null;
  return PREMIUM_SKIN_BY_ID.get(skinId) ?? null;
}

export function applyPremiumSkinToDocument(skinId: PremiumSkinId) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const skin = getPremiumSkin(skinId);

  if (!skin) {
    root.dataset.bbSkin = "none";
    root.style.removeProperty("--bb-skin-bg-image");
    root.style.removeProperty("--bb-skin-glow");
    root.style.removeProperty("--bb-skin-warm-glow");
    return;
  }

  root.dataset.bbSkin = skin.id;
  root.style.setProperty("--bb-skin-bg-image", `url("${skin.backgroundImage}")`);
  root.style.setProperty("--bb-skin-glow", skin.id === "midnight-garden" ? "rgba(175, 207, 122, 0.42)" : "rgba(93, 214, 255, 0.42)");
  root.style.setProperty("--bb-skin-warm-glow", skin.id === "midnight-garden" ? "rgba(215, 184, 107, 0.38)" : "rgba(93, 214, 255, 0.2)");

  const variableMap: Record<keyof PremiumSkinPalette, string> = {
    background: "--bb-background",
    surface: "--bb-surface",
    surfaceSoft: "--bb-surface-soft",
    card: "--bb-card",
    cardBorder: "--bb-card-border",
    textPrimary: "--bb-text-primary",
    textSecondary: "--bb-text-secondary",
    textMuted: "--bb-text-muted",
    accent: "--bb-accent",
    accentSoft: "--bb-accent-soft",
    button: "--bb-button",
    buttonText: "--bb-button-text",
    navBackground: "--bb-nav-background",
    navActive: "--bb-nav-active",
    navInactive: "--bb-nav-inactive",
    progressTrack: "--bb-progress-track",
    progressFill: "--bb-progress-fill",
  };

  (Object.keys(variableMap) as Array<keyof PremiumSkinPalette>).forEach((key) => {
    root.style.setProperty(variableMap[key], skin.palette[key]);
  });

  root.style.setProperty("--bb-reader-bg", skin.palette.card);
  root.style.setProperty("--bb-reader-surface", skin.palette.surface);
  root.style.setProperty("--bb-reader-border", skin.palette.cardBorder);
  root.style.setProperty("--bb-reader-text", skin.palette.textPrimary);
  root.style.setProperty("--bb-reader-secondary", skin.palette.textSecondary);
  root.style.setProperty("--bb-reader-muted", skin.palette.textMuted);
  root.style.setProperty("--background", skin.palette.background);
  root.style.setProperty("--foreground", skin.palette.textPrimary);
}
