export type PremiumSkinId =
  | "none"
  | "blue-storm"
  | "midnight-garden"
  | "lavender-prayer"
  | "ruby-village"
  | "slow-mornings"
  | "morning-mercy"
  | "carolina-coastline"
  | "angel-wings"
  | "winter-cabin"
  | "mount-sinai"
  | "desert-dawn"
  | "no-fuss"
  | "quiet-blue"
  | "royal-purple"
  | "fresh-green";

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
  hasImageBackground?: boolean;
  price: number;
  palette: PremiumSkinPalette;
};

export const PREMIUM_SKIN_STORAGE_KEY = "bb:premium-skin";
export const PREMIUM_SKIN_STORAGE_TIMESTAMP_KEY = "bb:premium-skin-updated-at";
export const PREMIUM_SKIN_PENDING_SYNC_KEY = "bb:premium-skin-pending-sync";
export const PREMIUM_SKIN_PENDING_SYNC_MS = 90 * 1000;
export const PREMIUM_SKIN_LOCK_MS = 24 * 60 * 60 * 1000;

type BasicSkinInput = {
  id: Exclude<PremiumSkinId, "none">;
  name: string;
  subtitle: string;
  base: string;
  soft: string;
  background: string;
  surface: string;
  surfaceSoft: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  buttonText?: string;
  price?: number;
};

function createBasicSkin(input: BasicSkinInput): PremiumSkin {
  return {
    id: input.id,
    name: input.name,
    label: "Skin",
    storeSubtitle: input.subtitle,
    backgroundImage: "",
    originalImage: "",
    thumbnailImage: "",
    mobileBackgroundImage: "",
    desktopBackgroundImage: "",
    hasImageBackground: false,
    price: input.price ?? 750,
    palette: {
      background: input.background,
      surface: input.surface,
      surfaceSoft: input.surfaceSoft,
      card: "#FFFFFF",
      cardBorder: input.cardBorder,
      textPrimary: input.textPrimary,
      textSecondary: input.textSecondary,
      textMuted: input.textMuted,
      accent: input.base,
      accentSoft: input.soft,
      button: input.base,
      buttonText: input.buttonText ?? "#FFFFFF",
      navBackground: input.surface,
      navActive: input.base,
      navInactive: input.textMuted,
      progressTrack: input.cardBorder,
      progressFill: input.base,
    },
  };
}

export function getPremiumSkinStorageKey(userId: string | null | undefined) {
  return userId ? `${PREMIUM_SKIN_STORAGE_KEY}:${userId}` : PREMIUM_SKIN_STORAGE_KEY;
}

export function readCachedPremiumSkin(userId: string | null | undefined): PremiumSkinId {
  if (typeof window === "undefined") return "none";
  return normalizePremiumSkinId(
    (userId ? window.localStorage.getItem(getPremiumSkinStorageKey(userId)) : null) ||
      window.localStorage.getItem(PREMIUM_SKIN_STORAGE_KEY),
  );
}

export function getPremiumSkinStorageTimestampKey(userId: string | null | undefined) {
  return userId ? `${PREMIUM_SKIN_STORAGE_TIMESTAMP_KEY}:${userId}` : PREMIUM_SKIN_STORAGE_TIMESTAMP_KEY;
}

export function readCachedPremiumSkinUpdatedAtMs(userId: string | null | undefined) {
  if (typeof window === "undefined") return 0;
  const raw =
    (userId ? window.localStorage.getItem(getPremiumSkinStorageTimestampKey(userId)) : null) ||
    window.localStorage.getItem(PREMIUM_SKIN_STORAGE_TIMESTAMP_KEY);
  const updatedAt = Number(raw);
  return Number.isFinite(updatedAt) ? updatedAt : 0;
}

export function getPremiumSkinPendingSyncKey(userId: string | null | undefined) {
  return userId ? `${PREMIUM_SKIN_PENDING_SYNC_KEY}:${userId}` : PREMIUM_SKIN_PENDING_SYNC_KEY;
}

export function readCachedPremiumSkinAgeMs(userId: string | null | undefined) {
  if (typeof window === "undefined" || !userId) return Number.POSITIVE_INFINITY;
  const updatedAt = Number(window.localStorage.getItem(getPremiumSkinStorageTimestampKey(userId)));
  return Number.isFinite(updatedAt) ? Date.now() - updatedAt : Number.POSITIVE_INFINITY;
}

export function readPendingPremiumSkinSync(userId: string | null | undefined) {
  if (typeof window === "undefined" || !userId) return null;
  const raw = window.localStorage.getItem(getPremiumSkinPendingSyncKey(userId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { skinId?: unknown; startedAt?: unknown };
    const skinId = normalizePremiumSkinId(parsed.skinId);
    const startedAt = Number(parsed.startedAt);
    if (!Number.isFinite(startedAt)) return null;
    if (Date.now() - startedAt > PREMIUM_SKIN_PENDING_SYNC_MS) {
      window.localStorage.removeItem(getPremiumSkinPendingSyncKey(userId));
      return null;
    }
    return { skinId, startedAt };
  } catch {
    window.localStorage.removeItem(getPremiumSkinPendingSyncKey(userId));
    return null;
  }
}

export function shouldPreferCachedPremiumSkin(userId: string | null | undefined, authoritativeSkinId: PremiumSkinId) {
  if (typeof window === "undefined" || !userId) return false;
  const cachedSkinId = readCachedPremiumSkin(userId);
  if (cachedSkinId === authoritativeSkinId) return false;
  const pendingSync = readPendingPremiumSkinSync(userId);
  return Boolean(pendingSync && pendingSync.skinId === cachedSkinId);
}

export function cachePremiumSkinForUser(userId: string | null | undefined, skinId: PremiumSkinId, options: { markSelected?: boolean } = {}) {
  if (typeof window === "undefined") return;
  const normalizedSkinId = normalizePremiumSkinId(skinId);
  if (userId) window.localStorage.setItem(getPremiumSkinStorageKey(userId), normalizedSkinId);
  window.localStorage.setItem(PREMIUM_SKIN_STORAGE_KEY, normalizedSkinId);
  if (options.markSelected) {
    const updatedAt = String(Date.now());
    if (userId) window.localStorage.setItem(getPremiumSkinStorageTimestampKey(userId), updatedAt);
    window.localStorage.setItem(PREMIUM_SKIN_STORAGE_TIMESTAMP_KEY, updatedAt);
    if (userId) {
      window.localStorage.setItem(getPremiumSkinPendingSyncKey(userId), JSON.stringify({ skinId: normalizedSkinId, startedAt: Number(updatedAt) }));
    }
  }
}

export function isIncomingPremiumSkinOlderThanCache(userId: string | null | undefined, selectedAt: string | null | undefined) {
  if (typeof window === "undefined" || !userId || !selectedAt) return false;
  const pendingSync = readPendingPremiumSkinSync(userId);
  if (!pendingSync) return false;
  const incomingSelectedAtMs = Date.parse(selectedAt);
  if (!Number.isFinite(incomingSelectedAtMs)) return false;
  const cachedUpdatedAtMs = readCachedPremiumSkinUpdatedAtMs(userId);
  return cachedUpdatedAtMs > incomingSelectedAtMs;
}

export function clearPendingPremiumSkinSync(userId: string | null | undefined, skinId?: PremiumSkinId) {
  if (typeof window === "undefined" || !userId) return;
  const pendingSync = readPendingPremiumSkinSync(userId);
  if (!skinId || pendingSync?.skinId === skinId) {
    window.localStorage.removeItem(getPremiumSkinPendingSyncKey(userId));
  }
}

export function clearLegacyPremiumSkinCache() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PREMIUM_SKIN_STORAGE_TIMESTAMP_KEY);
}

export function getPremiumSkinLockRemainingMs(activeSkinId: PremiumSkinId, selectedAt: string | null | undefined, nextSkinId: PremiumSkinId) {
  if (activeSkinId === "none" || nextSkinId === activeSkinId) return 0;
  const selectedAtMs = selectedAt ? Date.parse(selectedAt) : Number.NaN;
  if (!Number.isFinite(selectedAtMs)) return 0;
  return Math.max(0, PREMIUM_SKIN_LOCK_MS - (Date.now() - selectedAtMs));
}

export function formatPremiumSkinLockRemaining(ms: number) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  if (minutes === 0) return `${hours} hour${hours === 1 ? "" : "s"}`;
  return `${hours}h ${minutes}m`;
}

export const BLUE_STORM_SKIN = createBasicSkin({
  id: "blue-storm",
  name: "Blue Storm",
  subtitle: "A bold blue layout with a focused storm-blue accent.",
  base: "#2563EB",
  soft: "#DBEAFE",
  background: "#EAF3FF",
  surface: "#F8FBFF",
  surfaceSoft: "#DBEAFE",
  cardBorder: "#BFDBFE",
  textPrimary: "#102A43",
  textSecondary: "#334E68",
  textMuted: "#627D98",
});

export const MIDNIGHT_GARDEN_SKIN = createBasicSkin({
  id: "midnight-garden",
  name: "Midnight Garden",
  subtitle: "A calm green layout for quiet reading and prayer.",
  base: "#16A34A",
  soft: "#DCFCE7",
  background: "#ECFDF3",
  surface: "#F7FFF9",
  surfaceSoft: "#DCFCE7",
  cardBorder: "#BBF7D0",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4D7C5B",
});

export const LAVENDER_PRAYER_SKIN = createBasicSkin({
  id: "lavender-prayer",
  name: "Lavender Prayer",
  subtitle: "A soft purple layout with a peaceful prayer accent.",
  base: "#7C3AED",
  soft: "#EDE9FE",
  background: "#F3EAFF",
  surface: "#FBF8FF",
  surfaceSoft: "#EDE2FF",
  cardBorder: "#D8C1FF",
  textPrimary: "#261447",
  textSecondary: "#4C3575",
  textMuted: "#7C68A6",
});

export const RUBY_VILLAGE_SKIN = createBasicSkin({
  id: "ruby-village",
  name: "Ruby Village",
  subtitle: "A strong red layout with a warm ruby accent.",
  base: "#DC2626",
  soft: "#FEE2E2",
  background: "#FFF0F0",
  surface: "#FFF8F8",
  surfaceSoft: "#FEE2E2",
  cardBorder: "#FECACA",
  textPrimary: "#3B0A0A",
  textSecondary: "#7F1D1D",
  textMuted: "#B45353",
});

export const SLOW_MORNINGS_SKIN = createBasicSkin({
  id: "slow-mornings",
  name: "Slow Mornings",
  subtitle: "A warm gold layout for steady daily study.",
  base: "#B7791F",
  soft: "#FEF3C7",
  background: "#FFF3D6",
  surface: "#FFFCF3",
  surfaceSoft: "#FDECC8",
  cardBorder: "#F1D39A",
  textPrimary: "#33240A",
  textSecondary: "#614A19",
  textMuted: "#92733C",
});

export const MORNING_MERCY_SKIN = createBasicSkin({
  id: "morning-mercy",
  name: "Morning Mercy",
  subtitle: "A fresh orange layout with a hopeful morning accent.",
  base: "#EA580C",
  soft: "#FFEDD5",
  background: "#FFF4E8",
  surface: "#FFF9F2",
  surfaceSoft: "#FFEDD5",
  cardBorder: "#FED7AA",
  textPrimary: "#3B1707",
  textSecondary: "#9A3412",
  textMuted: "#B85C2B",
});

export const CAROLINA_COASTLINE_SKIN = createBasicSkin({
  id: "carolina-coastline",
  name: "Carolina Coastline",
  subtitle: "A soft coastal blue layout with a steady accent.",
  base: "#7BAFD4",
  soft: "#EAF5FF",
  background: "#F0F8FF",
  surface: "#FBFDFF",
  surfaceSoft: "#EAF5FF",
  cardBorder: "#C9E0F2",
  textPrimary: "#123047",
  textSecondary: "#34566E",
  textMuted: "#66859B",
});

export const ANGEL_WINGS_SKIN = createBasicSkin({
  id: "angel-wings",
  name: "Angel Wings",
  subtitle: "A light sky layout with a gentle blue accent.",
  base: "#38BDF8",
  soft: "#E0F2FE",
  background: "#F0F9FF",
  surface: "#FFFFFF",
  surfaceSoft: "#E0F2FE",
  cardBorder: "#BAE6FD",
  textPrimary: "#0C2D3D",
  textSecondary: "#075985",
  textMuted: "#4F8AA8",
});

export const WINTER_CABIN_SKIN = createBasicSkin({
  id: "winter-cabin",
  name: "Winter Cabin",
  subtitle: "A crisp ice-blue layout for calm focused study.",
  base: "#60A5FA",
  soft: "#DBEAFE",
  background: "#F1F7FF",
  surface: "#FFFFFF",
  surfaceSoft: "#EFF6FF",
  cardBorder: "#BFDBFE",
  textPrimary: "#0F2A4A",
  textSecondary: "#1D4E89",
  textMuted: "#6A88AA",
});

export const MOUNT_SINAI_SKIN = createBasicSkin({
  id: "mount-sinai",
  name: "Mount Sinai",
  subtitle: "A grounded amber layout with a strong gold accent.",
  base: "#D97706",
  soft: "#FEF3C7",
  background: "#FFF7E8",
  surface: "#FFFCF7",
  surfaceSoft: "#FEF3C7",
  cardBorder: "#FCD34D",
  textPrimary: "#3A2503",
  textSecondary: "#7C4A03",
  textMuted: "#A16207",
});

export const DESERT_DAWN_SKIN = createBasicSkin({
  id: "desert-dawn",
  name: "Desert Dawn",
  subtitle: "A sunlit amber layout with a simple desert accent.",
  base: "#F59E0B",
  soft: "#FEF3C7",
  background: "#FFF8E7",
  surface: "#FFFCF5",
  surfaceSoft: "#FEF3C7",
  cardBorder: "#FDE68A",
  textPrimary: "#3B2502",
  textSecondary: "#7C4A03",
  textMuted: "#A66A12",
});

export const NO_FUSS_SKIN = createBasicSkin({
  id: "no-fuss",
  name: "No Fuss",
  subtitle: "A clean neutral layout with minimal distraction.",
  base: "#4B5563",
  soft: "#E5E7EB",
  background: "#F4F5F7",
  surface: "#FAFAFA",
  surfaceSoft: "#E5E7EB",
  cardBorder: "#D1D5DB",
  textPrimary: "#111827",
  textSecondary: "#374151",
  textMuted: "#6B7280",
});

export const QUIET_BLUE_SKIN = createBasicSkin({
  id: "quiet-blue",
  name: "Quiet Blue",
  subtitle: "A simple soft-blue layout for everyday reading.",
  base: "#3B82F6",
  soft: "#DBEAFE",
  background: "#EFF6FF",
  surface: "#FFFFFF",
  surfaceSoft: "#DBEAFE",
  cardBorder: "#BFDBFE",
  textPrimary: "#102A43",
  textSecondary: "#334E68",
  textMuted: "#627D98",
  price: 500,
});

export const ROYAL_PURPLE_SKIN = createBasicSkin({
  id: "royal-purple",
  name: "Royal Purple",
  subtitle: "A clean purple layout with a bold accent.",
  base: "#9333EA",
  soft: "#F3E8FF",
  background: "#FAF5FF",
  surface: "#FFFFFF",
  surfaceSoft: "#F3E8FF",
  cardBorder: "#E9D5FF",
  textPrimary: "#2E1065",
  textSecondary: "#581C87",
  textMuted: "#7E57A8",
  price: 500,
});

export const FRESH_GREEN_SKIN = createBasicSkin({
  id: "fresh-green",
  name: "Fresh Green",
  subtitle: "A clean green layout for growth and consistency.",
  base: "#22C55E",
  soft: "#DCFCE7",
  background: "#F0FDF4",
  surface: "#FFFFFF",
  surfaceSoft: "#DCFCE7",
  cardBorder: "#BBF7D0",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4D7C5B",
  price: 500,
});

export const PREMIUM_SKINS: PremiumSkin[] = [
  BLUE_STORM_SKIN,
  MIDNIGHT_GARDEN_SKIN,
  LAVENDER_PRAYER_SKIN,
  RUBY_VILLAGE_SKIN,
  SLOW_MORNINGS_SKIN,
  MORNING_MERCY_SKIN,
  CAROLINA_COASTLINE_SKIN,
  ANGEL_WINGS_SKIN,
  WINTER_CABIN_SKIN,
  MOUNT_SINAI_SKIN,
  DESERT_DAWN_SKIN,
  NO_FUSS_SKIN,
  QUIET_BLUE_SKIN,
  ROYAL_PURPLE_SKIN,
  FRESH_GREEN_SKIN,
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
      return "midnight-garden";
    case "gold":
      return "slow-mornings";
    case "purple":
      return "lavender-prayer";
    case "pink":
      return "royal-purple";
    case "red":
      return "ruby-village";
    case "orange":
      return "morning-mercy";
    case "black":
    case "gray":
      return "no-fuss";
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
      return "midnight-garden";
    case "gold":
      return "slow-mornings";
    case "purple":
      return "lavender-prayer";
    case "red":
      return "ruby-village";
    case "orange":
      return "morning-mercy";
    case "black":
      return "no-fuss";
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
    delete root.dataset.bbBasicSkin;
    root.style.removeProperty("--bb-skin-bg-image");
    root.style.removeProperty("--bb-skin-bg-image-mobile");
    root.style.removeProperty("--bb-skin-bg-image-desktop");
    root.style.removeProperty("--bb-skin-glow");
    root.style.removeProperty("--bb-skin-warm-glow");
    return;
  }

  root.dataset.bbSkin = "none";
  root.dataset.bbBasicSkin = skin.id;
  root.style.setProperty("--bb-skin-bg-image", "none");
  root.style.setProperty("--bb-skin-bg-image-mobile", "none");
  root.style.setProperty("--bb-skin-bg-image-desktop", "none");
  root.style.setProperty("--bb-skin-glow", skin.palette.accentSoft);
  root.style.setProperty("--bb-skin-warm-glow", skin.palette.accentSoft);

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
