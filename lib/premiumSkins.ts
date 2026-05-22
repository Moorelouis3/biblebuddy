export type PremiumSkinId = "none" | "blue-storm" | "midnight-garden" | "lavender-prayer" | "ruby-village" | "slow-mornings" | "morning-mercy" | "carolina-coastline" | "angel-wings" | "winter-cabin" | "mount-sinai" | "desert-dawn" | "no-fuss";

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

export const ANGEL_WINGS_SKIN: PremiumSkin = {
  id: "angel-wings",
  name: "Angel Wings",
  label: "Premium Skin",
  storeSubtitle: "A cinematic heavenly atmosphere with angel wings, divine light, and peaceful protection.",
  backgroundImage: "/skins/optimized/angel-wings-desktop.webp",
  originalImage: "/skins/AngelWings.png",
  thumbnailImage: "/skins/optimized/angel-wings-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/angel-wings-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/angel-wings-desktop.webp",
  price: 1000,
  palette: {
    background: "#06152A",
    surface: "rgba(11, 40, 72, 0.76)",
    surfaceSoft: "rgba(92, 166, 219, 0.28)",
    card: "rgba(8, 31, 58, 0.74)",
    cardBorder: "rgba(246, 211, 133, 0.42)",
    textPrimary: "#F8FCFF",
    textSecondary: "#D7ECF8",
    textMuted: "#A9C6D8",
    accent: "#8DDCFF",
    accentSoft: "rgba(141, 220, 255, 0.24)",
    button: "#1F77AD",
    buttonText: "#F8FCFF",
    navBackground: "rgba(5, 20, 40, 0.9)",
    navActive: "#F6D385",
    navInactive: "#B8D5E7",
    progressTrack: "rgba(215, 236, 248, 0.18)",
    progressFill: "#F6D385",
  },
};

export const WINTER_CABIN_SKIN: PremiumSkin = {
  id: "winter-cabin",
  name: "Winter Cabin",
  label: "Premium Skin",
  storeSubtitle: "A quiet snowy cabin atmosphere for peaceful nighttime Bible study and reflection.",
  backgroundImage: "/skins/WinterCabin.png",
  originalImage: "/skins/WinterCabin.png",
  thumbnailImage: "/skins/WinterCabin.png",
  mobileBackgroundImage: "/skins/WinterCabin.png",
  desktopBackgroundImage: "/skins/WinterCabin.png",
  price: 1000,
  palette: {
    background: "#050E1D",
    surface: "rgba(8, 19, 36, 0.78)",
    surfaceSoft: "rgba(52, 89, 120, 0.28)",
    card: "rgba(7, 18, 34, 0.76)",
    cardBorder: "rgba(155, 215, 255, 0.36)",
    textPrimary: "#F5FBFF",
    textSecondary: "#D6E8F5",
    textMuted: "#9FB9CB",
    accent: "#9BD7FF",
    accentSoft: "rgba(155, 215, 255, 0.22)",
    button: "#2C6F9E",
    buttonText: "#F5FBFF",
    navBackground: "rgba(5, 14, 29, 0.9)",
    navActive: "#D7ECFF",
    navInactive: "#A9C0D1",
    progressTrack: "rgba(214, 232, 245, 0.18)",
    progressFill: "#9BD7FF",
  },
};

export const MOUNT_SINAI_SKIN: PremiumSkin = {
  id: "mount-sinai",
  name: "Mount Sinai",
  label: "Premium Skin",
  storeSubtitle: "A sacred storm-lit mountain atmosphere for reverent deep Bible study.",
  backgroundImage: "/skins/MountSinai.png",
  originalImage: "/skins/MountSinai.png",
  thumbnailImage: "/skins/MountSinai.png",
  mobileBackgroundImage: "/skins/MountSinai.png",
  desktopBackgroundImage: "/skins/MountSinai.png",
  price: 1000,
  palette: {
    background: "#050505",
    surface: "rgba(20, 16, 12, 0.8)",
    surfaceSoft: "rgba(88, 55, 26, 0.3)",
    card: "rgba(18, 15, 12, 0.78)",
    cardBorder: "rgba(230, 153, 55, 0.4)",
    textPrimary: "#FFF4DE",
    textSecondary: "#E8CDA5",
    textMuted: "#B99263",
    accent: "#EAA23A",
    accentSoft: "rgba(234, 162, 58, 0.22)",
    button: "#A85F18",
    buttonText: "#FFF4DE",
    navBackground: "rgba(12, 10, 8, 0.92)",
    navActive: "#FFD37A",
    navInactive: "#C09B6A",
    progressTrack: "rgba(232, 205, 165, 0.18)",
    progressFill: "#FFD37A",
  },
};

export const DESERT_DAWN_SKIN: PremiumSkin = {
  id: "desert-dawn",
  name: "Desert Dawn",
  label: "Premium Skin",
  storeSubtitle: "A rugged sunrise wilderness atmosphere for disciplined, grounded Bible study.",
  backgroundImage: "/skins/optimized/desert-dawn-desktop.webp",
  originalImage: "/skins/DesertDawn.png",
  thumbnailImage: "/skins/optimized/desert-dawn-thumb.webp",
  mobileBackgroundImage: "/skins/optimized/desert-dawn-mobile.webp",
  desktopBackgroundImage: "/skins/optimized/desert-dawn-desktop.webp",
  price: 1000,
  palette: {
    background: "#0E0906",
    surface: "rgba(42, 26, 15, 0.8)",
    surfaceSoft: "rgba(128, 80, 35, 0.3)",
    card: "rgba(35, 22, 13, 0.78)",
    cardBorder: "rgba(232, 171, 72, 0.42)",
    textPrimary: "#FFF4DE",
    textSecondary: "#E9CFA4",
    textMuted: "#B98A55",
    accent: "#E8AB48",
    accentSoft: "rgba(232, 171, 72, 0.24)",
    button: "#9A5A1C",
    buttonText: "#FFF4DE",
    navBackground: "rgba(19, 12, 8, 0.92)",
    navActive: "#FFD37A",
    navInactive: "#C8A073",
    progressTrack: "rgba(233, 207, 164, 0.18)",
    progressFill: "#FFD37A",
  },
};

export const NO_FUSS_SKIN: PremiumSkin = {
  id: "no-fuss",
  name: "No Fuss",
  label: "Premium Skin",
  storeSubtitle: "Clean focus mode with distraction-free premium minimalism.",
  backgroundImage: "/skins/no-fuss-preview.svg",
  originalImage: "/skins/no-fuss-preview.svg",
  thumbnailImage: "/skins/no-fuss-preview.svg",
  mobileBackgroundImage: "/skins/no-fuss-preview.svg",
  desktopBackgroundImage: "/skins/no-fuss-preview.svg",
  hasImageBackground: false,
  price: 750,
  palette: {
    background: "#0D0D0D",
    surface: "rgba(20, 20, 20, 0.78)",
    surfaceSoft: "rgba(32, 32, 32, 0.68)",
    card: "rgba(26, 26, 26, 0.82)",
    cardBorder: "rgba(42, 42, 42, 0.92)",
    textPrimary: "#F5F5F5",
    textSecondary: "#B0B0B0",
    textMuted: "#7A7A7A",
    accent: "#4DA3FF",
    accentSoft: "rgba(77, 163, 255, 0.16)",
    button: "#1F6FB8",
    buttonText: "#F5F5F5",
    navBackground: "rgba(18, 18, 18, 0.88)",
    navActive: "#6CB8FF",
    navInactive: "#8A8A8A",
    progressTrack: "rgba(245, 245, 245, 0.12)",
    progressFill: "#4DA3FF",
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
  ANGEL_WINGS_SKIN,
  WINTER_CABIN_SKIN,
  MOUNT_SINAI_SKIN,
  DESERT_DAWN_SKIN,
  NO_FUSS_SKIN,
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
  if (skin.hasImageBackground === false) {
    root.style.setProperty("--bb-skin-bg-image", "none");
    root.style.setProperty("--bb-skin-bg-image-mobile", "none");
    root.style.setProperty("--bb-skin-bg-image-desktop", "none");
  } else {
    root.style.setProperty("--bb-skin-bg-image", `url("${skin.originalImage}")`);
    root.style.setProperty("--bb-skin-bg-image-mobile", `url("${skin.originalImage}")`);
    root.style.setProperty("--bb-skin-bg-image-desktop", `url("${skin.originalImage}")`);
  }
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
                : skin.id === "angel-wings"
                  ? "rgba(141, 220, 255, 0.44)"
                  : skin.id === "winter-cabin"
                    ? "rgba(155, 215, 255, 0.44)"
                    : skin.id === "mount-sinai"
                      ? "rgba(234, 162, 58, 0.46)"
                      : skin.id === "desert-dawn"
                        ? "rgba(232, 171, 72, 0.46)"
                        : skin.id === "no-fuss"
                          ? "rgba(108, 184, 255, 0.24)"
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
                : skin.id === "angel-wings"
                  ? "rgba(246, 211, 133, 0.38)"
                  : skin.id === "winter-cabin"
                    ? "rgba(255, 207, 125, 0.24)"
                    : skin.id === "mount-sinai"
                      ? "rgba(255, 211, 122, 0.34)"
                      : skin.id === "desert-dawn"
                        ? "rgba(255, 211, 122, 0.36)"
                        : skin.id === "no-fuss"
                          ? "rgba(255, 255, 255, 0.08)"
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
