export type PremiumSkinId = "none" | "blue-storm" | "midnight-garden" | "lavender-prayer" | "ruby-village" | "slow-mornings" | "morning-mercy" | "carolina-coastline";

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
  originalImage: string;
  thumbnailImage: string;
  mobileBackgroundImage: string;
  desktopBackgroundImage: string;
  price: number;
  palette: PremiumSkinPalette;
};

export const PREMIUM_SKIN_STORAGE_KEY = "bb:premium-skin";

export const BLUE_STORM_SKIN: PremiumSkin = {
  id: "blue-storm",
  name: "Blue Storm",
  label: "Premium Skin",
  storeSubtitle: "A cinematic storm atmosphere for focused Bible study.",
  backgroundImage: "/skins/optimized/blue-storm-desktop.webp",
  originalImage: "/skins/Bluestormskin.png",
  thumbnailImage: "/skins/optimized/blue-storm-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/blue-storm-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/blue-storm-desktop.webp",
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
  backgroundImage: "/skins/optimized/midnight-garden-desktop.webp",
  originalImage: "/skins/MidnightGarden.png",
  thumbnailImage: "/skins/optimized/midnight-garden-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/midnight-garden-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/midnight-garden-desktop.webp",
  price: 1000,
  palette: {
    background: "#07100F",
    surface: "rgba(17, 35, 22, 0.8)",
    surfaceSoft: "rgba(70, 101, 43, 0.36)",
    card: "rgba(14, 31, 18, 0.8)",
    cardBorder: "rgba(155, 205, 98, 0.42)",
    textPrimary: "#FFF7DF",
    textSecondary: "#D9DEBD",
    textMuted: "#A8B289",
    accent: "#AFCF7A",
    accentSoft: "rgba(144, 190, 84, 0.26)",
    button: "#638238",
    buttonText: "#FFF8DE",
    navBackground: "rgba(15, 34, 19, 0.9)",
    navActive: "#D7B86B",
    navInactive: "#AAB18B",
    progressTrack: "rgba(218, 203, 148, 0.18)",
    progressFill: "#D7B86B",
  },
};

export const LAVENDER_PRAYER_SKIN: PremiumSkin = {
  id: "lavender-prayer",
  name: "Lavender Prayer",
  label: "Premium Skin",
  storeSubtitle: "A dreamy moonlit prayer atmosphere with candles, stars, and quiet nighttime reflection.",
  backgroundImage: "/skins/optimized/lavender-prayer-desktop.webp",
  originalImage: "/skins/LavenderPrayerSkin.png",
  thumbnailImage: "/skins/optimized/lavender-prayer-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/lavender-prayer-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/lavender-prayer-desktop.webp",
  price: 1000,
  palette: {
    background: "#130D1F",
    surface: "rgba(28, 18, 44, 0.76)",
    surfaceSoft: "rgba(91, 68, 126, 0.28)",
    card: "rgba(25, 16, 42, 0.74)",
    cardBorder: "rgba(207, 174, 255, 0.34)",
    textPrimary: "#FFF7FF",
    textSecondary: "#EAD8FF",
    textMuted: "#C3A8DE",
    accent: "#CFAEFF",
    accentSoft: "rgba(188, 139, 255, 0.2)",
    button: "#6F4EA2",
    buttonText: "#FFF7FF",
    navBackground: "rgba(18, 11, 30, 0.88)",
    navActive: "#F0C8FF",
    navInactive: "#C3A8DE",
    progressTrack: "rgba(234, 216, 255, 0.18)",
    progressFill: "#F0C8FF",
  },
};

export const RUBY_VILLAGE_SKIN: PremiumSkin = {
  id: "ruby-village",
  name: "Ruby Village",
  label: "Premium Skin",
  storeSubtitle: "A bold ruby kingdom atmosphere for disciplined, spiritually powerful study.",
  backgroundImage: "/skins/optimized/ruby-village-desktop.webp",
  originalImage: "/skins/RubyVillage.png",
  thumbnailImage: "/skins/optimized/ruby-village-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/ruby-village-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/ruby-village-desktop.webp",
  price: 1000,
  palette: {
    background: "#120507",
    surface: "rgba(55, 12, 16, 0.78)",
    surfaceSoft: "rgba(120, 34, 30, 0.3)",
    card: "rgba(44, 9, 13, 0.76)",
    cardBorder: "rgba(255, 105, 84, 0.36)",
    textPrimary: "#FFF6EF",
    textSecondary: "#FFD2BE",
    textMuted: "#D99A86",
    accent: "#FF735F",
    accentSoft: "rgba(255, 93, 72, 0.22)",
    button: "#9C1F24",
    buttonText: "#FFF6EF",
    navBackground: "rgba(32, 7, 10, 0.9)",
    navActive: "#FFC06A",
    navInactive: "#D99A86",
    progressTrack: "rgba(255, 210, 190, 0.16)",
    progressFill: "#FFC06A",
  },
};

export const SLOW_MORNINGS_SKIN: PremiumSkin = {
  id: "slow-mornings",
  name: "Slow Mornings",
  label: "Premium Skin",
  storeSubtitle: "A cozy rainy morning atmosphere for peaceful coffee, Scripture, and daily reflection.",
  backgroundImage: "/skins/optimized/slow-mornings-desktop.webp",
  originalImage: "/skins/SlowMornings.png",
  thumbnailImage: "/skins/optimized/slow-mornings-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/slow-mornings-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/slow-mornings-desktop.webp",
  price: 1000,
  palette: {
    background: "#170F0A",
    surface: "rgba(49, 31, 21, 0.78)",
    surfaceSoft: "rgba(148, 91, 45, 0.28)",
    card: "rgba(39, 24, 17, 0.78)",
    cardBorder: "rgba(245, 178, 91, 0.36)",
    textPrimary: "#FFF4E1",
    textSecondary: "#F5D8B0",
    textMuted: "#C99D72",
    accent: "#F5B25B",
    accentSoft: "rgba(245, 178, 91, 0.22)",
    button: "#A45F25",
    buttonText: "#FFF4E1",
    navBackground: "rgba(31, 19, 13, 0.9)",
    navActive: "#FFD28A",
    navInactive: "#D1A77C",
    progressTrack: "rgba(245, 216, 176, 0.18)",
    progressFill: "#FFD28A",
  },
};

export const MORNING_MERCY_SKIN: PremiumSkin = {
  id: "morning-mercy",
  name: "Morning Mercy",
  label: "Premium Skin",
  storeSubtitle: "A hopeful sunrise devotional atmosphere with flowers, coffee, and fresh-start peace.",
  backgroundImage: "/skins/optimized/morning-mercy-desktop.webp",
  originalImage: "/skins/MorningMercy.png",
  thumbnailImage: "/skins/optimized/morning-mercy-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/morning-mercy-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/morning-mercy-desktop.webp",
  price: 1000,
  palette: {
    background: "#FFF3E3",
    surface: "rgba(255, 238, 219, 0.78)",
    surfaceSoft: "rgba(255, 203, 169, 0.34)",
    card: "rgba(255, 244, 229, 0.78)",
    cardBorder: "rgba(238, 151, 104, 0.36)",
    textPrimary: "#4A271A",
    textSecondary: "#7C4D35",
    textMuted: "#A66D51",
    accent: "#E99265",
    accentSoft: "rgba(233, 146, 101, 0.24)",
    button: "#D6754D",
    buttonText: "#FFF8EE",
    navBackground: "rgba(255, 238, 219, 0.9)",
    navActive: "#C8585D",
    navInactive: "#8D6046",
    progressTrack: "rgba(166, 109, 81, 0.18)",
    progressFill: "#F4B35F",
  },
};

export const CAROLINA_COASTLINE_SKIN: PremiumSkin = {
  id: "carolina-coastline",
  name: "Carolina Coastline",
  label: "Premium Skin",
  storeSubtitle: "A moody lighthouse coast atmosphere for steady, peaceful nighttime study.",
  backgroundImage: "/skins/optimized/carolina-coastline-desktop.webp",
  originalImage: "/skins/CarolinaCoastline.png",
  thumbnailImage: "/skins/optimized/carolina-coastline-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/carolina-coastline-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/carolina-coastline-desktop.webp",
  price: 1000,
  palette: {
    background: "#04111F",
    surface: "rgba(7, 24, 43, 0.78)",
    surfaceSoft: "rgba(56, 129, 177, 0.26)",
    card: "rgba(6, 21, 39, 0.76)",
    cardBorder: "rgba(123, 175, 212, 0.42)",
    textPrimary: "#F3FAFF",
    textSecondary: "#C8E6F7",
    textMuted: "#8FB3CC",
    accent: "#7BAFD4",
    accentSoft: "rgba(123, 175, 212, 0.24)",
    button: "#1D6692",
    buttonText: "#F3FAFF",
    navBackground: "rgba(5, 18, 34, 0.9)",
    navActive: "#A6D8F4",
    navInactive: "#9AB8CB",
    progressTrack: "rgba(200, 230, 247, 0.18)",
    progressFill: "#7BAFD4",
  },
};

export const PREMIUM_SKINS: PremiumSkin[] = [
  BLUE_STORM_SKIN,
  MIDNIGHT_GARDEN_SKIN,
  LAVENDER_PRAYER_SKIN,
  RUBY_VILLAGE_SKIN,
  SLOW_MORNINGS_SKIN,
  MORNING_MERCY_SKIN,
  CAROLINA_COASTLINE_SKIN,
];
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

export function getPremiumSkinForLegacyTheme(value: unknown): PremiumSkinId {
  switch (String(value || "").toLowerCase()) {
    case "blue":
      return "blue-storm";
    case "navy":
      return "carolina-coastline";
    case "green":
    case "gold":
      return "midnight-garden";
    case "purple":
    case "pink":
      return "lavender-prayer";
    case "red":
    case "orange":
    case "black":
      return "ruby-village";
    case "brown":
      return "slow-mornings";
    case "cream":
    case "peach":
      return "morning-mercy";
    default:
      return "none";
  }
}

export function getPremiumSkinForLegacyFlame(value: unknown): PremiumSkinId {
  switch (String(value || "").toLowerCase()) {
    case "blue":
      return "blue-storm";
    case "navy":
      return "carolina-coastline";
    case "green":
    case "gold":
      return "midnight-garden";
    case "purple":
      return "lavender-prayer";
    case "red":
    case "orange":
    case "black":
      return "ruby-village";
    default:
      return "none";
  }
}

export function applyPremiumSkinToDocument(skinId: PremiumSkinId) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const skin = getPremiumSkin(skinId);

  if (!skin) {
    root.dataset.bbSkin = "none";
    root.style.removeProperty("--bb-skin-bg-image");
    root.style.removeProperty("--bb-skin-bg-image-mobile");
    root.style.removeProperty("--bb-skin-bg-image-desktop");
    root.style.removeProperty("--bb-skin-glow");
    root.style.removeProperty("--bb-skin-warm-glow");
    return;
  }

  root.dataset.bbSkin = skin.id;
  root.style.setProperty("--bb-skin-bg-image", `url("${skin.desktopBackgroundImage}")`);
  root.style.setProperty("--bb-skin-bg-image-mobile", `url("${skin.mobileBackgroundImage}")`);
  root.style.setProperty("--bb-skin-bg-image-desktop", `url("${skin.desktopBackgroundImage}")`);
  root.style.setProperty(
    "--bb-skin-glow",
    skin.id === "midnight-garden"
      ? "rgba(175, 207, 122, 0.42)"
      : skin.id === "lavender-prayer"
        ? "rgba(207, 174, 255, 0.42)"
        : skin.id === "ruby-village"
          ? "rgba(255, 115, 95, 0.42)"
          : skin.id === "slow-mornings"
            ? "rgba(245, 178, 91, 0.42)"
            : skin.id === "morning-mercy"
              ? "rgba(233, 146, 101, 0.42)"
              : skin.id === "carolina-coastline"
                ? "rgba(123, 175, 212, 0.42)"
          : "rgba(93, 214, 255, 0.42)",
  );
  root.style.setProperty(
    "--bb-skin-warm-glow",
    skin.id === "midnight-garden"
      ? "rgba(215, 184, 107, 0.38)"
      : skin.id === "lavender-prayer"
        ? "rgba(245, 203, 255, 0.3)"
        : skin.id === "ruby-village"
          ? "rgba(255, 192, 106, 0.34)"
          : skin.id === "slow-mornings"
            ? "rgba(255, 210, 138, 0.36)"
            : skin.id === "morning-mercy"
              ? "rgba(244, 179, 95, 0.34)"
              : skin.id === "carolina-coastline"
                ? "rgba(166, 216, 244, 0.3)"
          : "rgba(93, 214, 255, 0.2)",
  );

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
