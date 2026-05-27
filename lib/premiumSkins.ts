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
  | "fresh-green"
  | "passion-fruit";

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
export const PREMIUM_SKIN_PENDING_SYNC_MS = 7 * 24 * 60 * 60 * 1000;
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
  card?: string;
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
      card: input.card ?? input.surface,
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
  subtitle: "A calm pastel blue layout with a focused accent.",
  base: "#2F8FD0",
  soft: "#DDF0FF",
  background: "#EEF7FF",
  surface: "#FFFFFF",
  surfaceSoft: "#DFF0FF",
  cardBorder: "#B7DAF2",
  textPrimary: "#102A43",
  textSecondary: "#334E68",
  textMuted: "#627D98",
});

export const MIDNIGHT_GARDEN_SKIN = createBasicSkin({
  id: "midnight-garden",
  name: "Midnight Garden",
  subtitle: "A soft garden-green layout for quiet reading and prayer.",
  base: "#23A85D",
  soft: "#DCF6E6",
  background: "#EEFBF3",
  surface: "#FFFFFF",
  surfaceSoft: "#DCF6E6",
  cardBorder: "#A8E2BE",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4D7C5B",
});

export const LAVENDER_PRAYER_SKIN = createBasicSkin({
  id: "lavender-prayer",
  name: "Lavender Prayer",
  subtitle: "A deep lavender study theme for quiet focus.",
  base: "#B78CFF",
  soft: "#38245F",
  background: "#130D24",
  surface: "#1C1333",
  surfaceSoft: "#2A1A4D",
  card: "#22173D",
  cardBorder: "#5F43A4",
  textPrimary: "#FBF8FF",
  textSecondary: "#E4D8FF",
  textMuted: "#B8A7DF",
});

export const RUBY_VILLAGE_SKIN = createBasicSkin({
  id: "ruby-village",
  name: "Ruby Village",
  subtitle: "A deep ruby theme with warm, steady contrast.",
  base: "#FF5A76",
  soft: "#4B1320",
  background: "#1A070C",
  surface: "#260C13",
  surfaceSoft: "#3B111C",
  card: "#2D0E17",
  cardBorder: "#783244",
  textPrimary: "#FFF8F9",
  textSecondary: "#FFD4DC",
  textMuted: "#E7A8B5",
});

export const SLOW_MORNINGS_SKIN = createBasicSkin({
  id: "slow-mornings",
  name: "Slow Mornings",
  subtitle: "A warm gold layout for steady daily study.",
  base: "#C98715",
  soft: "#FFE9B8",
  background: "#FFF7E5",
  surface: "#FFFFFF",
  surfaceSoft: "#FFE9B8",
  cardBorder: "#E1C06C",
  textPrimary: "#33240A",
  textSecondary: "#614A19",
  textMuted: "#92733C",
});

export const MORNING_MERCY_SKIN = createBasicSkin({
  id: "morning-mercy",
  name: "Morning Mercy",
  subtitle: "A fresh orange layout with a hopeful morning accent.",
  base: "#E4742F",
  soft: "#FFE3C9",
  background: "#FFF4EA",
  surface: "#FFFFFF",
  surfaceSoft: "#FFE3C9",
  cardBorder: "#F0B987",
  textPrimary: "#3B1707",
  textSecondary: "#9A3412",
  textMuted: "#B85C2B",
});

export const CAROLINA_COASTLINE_SKIN = createBasicSkin({
  id: "carolina-coastline",
  name: "Carolina Coastline",
  subtitle: "A soft coastal blue layout with a steady accent.",
  base: "#338FC4",
  soft: "#DDF2FF",
  background: "#EFF9FF",
  surface: "#FBFDFF",
  surfaceSoft: "#DDF2FF",
  cardBorder: "#B8DDF0",
  textPrimary: "#123047",
  textSecondary: "#34566E",
  textMuted: "#66859B",
});

export const ANGEL_WINGS_SKIN = createBasicSkin({
  id: "angel-wings",
  name: "Angel Wings",
  subtitle: "A light sky layout with a gentle blue accent.",
  base: "#32A7DF",
  soft: "#DDF6FF",
  background: "#F0FAFF",
  surface: "#FFFFFF",
  surfaceSoft: "#DDF6FF",
  cardBorder: "#B5E2F4",
  textPrimary: "#0C2D3D",
  textSecondary: "#075985",
  textMuted: "#4F8AA8",
});

export const WINTER_CABIN_SKIN = createBasicSkin({
  id: "winter-cabin",
  name: "Winter Cabin",
  subtitle: "A crisp ice-blue layout for calm focused study.",
  base: "#4D8DFF",
  soft: "#DFECFF",
  background: "#F0F6FF",
  surface: "#FFFFFF",
  surfaceSoft: "#DFECFF",
  cardBorder: "#BBD5FA",
  textPrimary: "#0F2A4A",
  textSecondary: "#1D4E89",
  textMuted: "#6A88AA",
});

export const MOUNT_SINAI_SKIN = createBasicSkin({
  id: "mount-sinai",
  name: "Mount Sinai",
  subtitle: "A deep bronze theme with a warm mountain glow.",
  base: "#F2B35A",
  soft: "#4E3213",
  background: "#160D05",
  surface: "#241609",
  surfaceSoft: "#34210D",
  card: "#2A1A0A",
  cardBorder: "#75501F",
  textPrimary: "#FFF8EB",
  textSecondary: "#F6D9A9",
  textMuted: "#C8A56D",
});

export const DESERT_DAWN_SKIN = createBasicSkin({
  id: "desert-dawn",
  name: "Desert Dawn",
  subtitle: "A sunlit amber layout with a simple desert accent.",
  base: "#D89022",
  soft: "#FFECC7",
  background: "#FFF8EA",
  surface: "#FFFCF5",
  surfaceSoft: "#FFECC7",
  cardBorder: "#E5C37B",
  textPrimary: "#3B2502",
  textSecondary: "#7C4A03",
  textMuted: "#A66A12",
});

export const NO_FUSS_SKIN = createBasicSkin({
  id: "no-fuss",
  name: "No Fuss",
  subtitle: "A deep neutral theme with no distractions.",
  base: "#9CA3AF",
  soft: "#27313D",
  background: "#0E1218",
  surface: "#151B24",
  surfaceSoft: "#1E2733",
  card: "#19212C",
  cardBorder: "#374151",
  textPrimary: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textMuted: "#9CA3AF",
});

export const PASSION_FRUIT_SKIN = createBasicSkin({
  id: "passion-fruit",
  name: "Passion Fruit",
  subtitle: "A deep pink theme with bright devotional energy.",
  base: "#FF5CAC",
  soft: "#5A1B47",
  background: "#21091A",
  surface: "#2D0D24",
  surfaceSoft: "#411135",
  card: "#36102C",
  cardBorder: "#7B2B61",
  textPrimary: "#FFF7FC",
  textSecondary: "#FFD2EA",
  textMuted: "#E4A4CA",
});

export const QUIET_BLUE_SKIN = createBasicSkin({
  id: "quiet-blue",
  name: "Quiet Blue",
  subtitle: "A simple soft-blue layout for everyday reading.",
  base: "#368FD6",
  soft: "#DFF0FF",
  background: "#F0F7FF",
  surface: "#FFFFFF",
  surfaceSoft: "#DFF0FF",
  cardBorder: "#BBDCF5",
  textPrimary: "#102A43",
  textSecondary: "#334E68",
  textMuted: "#627D98",
  price: 500,
});

export const ROYAL_PURPLE_SKIN = createBasicSkin({
  id: "royal-purple",
  name: "Royal Purple",
  subtitle: "A clean purple layout with a soft royal accent.",
  base: "#8B57D8",
  soft: "#EDE0FF",
  background: "#F7F1FF",
  surface: "#FFFFFF",
  surfaceSoft: "#EDE0FF",
  cardBorder: "#CDB3F3",
  textPrimary: "#2E1065",
  textSecondary: "#581C87",
  textMuted: "#7E57A8",
  price: 500,
});

export const FRESH_GREEN_SKIN = createBasicSkin({
  id: "fresh-green",
  name: "Fresh Green",
  subtitle: "A clean green layout for growth and consistency.",
  base: "#25A960",
  soft: "#DEF7E8",
  background: "#F0FBF4",
  surface: "#FFFFFF",
  surfaceSoft: "#DEF7E8",
  cardBorder: "#ADE4C2",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4D7C5B",
  price: 500,
});

export const PREMIUM_SKINS: PremiumSkin[] = [
  LAVENDER_PRAYER_SKIN,
  RUBY_VILLAGE_SKIN,
  NO_FUSS_SKIN,
  MOUNT_SINAI_SKIN,
  PASSION_FRUIT_SKIN,
];
export const PREMIUM_SKIN_BY_ID = new Map(PREMIUM_SKINS.map((skin) => [skin.id, skin]));
export const DEFAULT_PREMIUM_SKIN_ID: PremiumSkinId = "no-fuss";

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
    case "navy":
    case "green":
    case "gray":
    case "black":
      return "no-fuss";
    case "gold":
    case "brown":
    case "cream":
      return "mount-sinai";
    case "purple":
      return "lavender-prayer";
    case "pink":
    case "orange":
    case "peach":
      return "passion-fruit";
    case "red":
      return "ruby-village";
    default:
      return "none";
  }
}

export function getPremiumSkinForLegacyFlame(value: unknown): PremiumSkinId {
  switch (String(value || "").toLowerCase()) {
    case "blue":
    case "navy":
    case "green":
    case "black":
      return "no-fuss";
    case "gold":
      return "mount-sinai";
    case "purple":
      return "lavender-prayer";
    case "red":
      return "ruby-village";
    case "orange":
      return "passion-fruit";
    default:
      return "none";
  }
}

export function resolveUnifiedThemeSkinId(activeSkin: unknown, legacyTheme?: unknown, legacyFlame?: unknown): PremiumSkinId {
  const directSkin = normalizePremiumSkinId(activeSkin);
  if (directSkin !== "none") return directSkin;
  const mappedTheme = getPremiumSkinForLegacyTheme(legacyTheme);
  if (mappedTheme !== "none") return mappedTheme;
  const mappedFlame = getPremiumSkinForLegacyFlame(legacyFlame);
  if (mappedFlame !== "none") return mappedFlame;
  return DEFAULT_PREMIUM_SKIN_ID;
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
