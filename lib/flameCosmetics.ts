import type { PremiumSkinId } from "./premiumSkins";

export type FlameCosmeticId = "default" | "orange" | "blue" | "gold" | "purple" | "red" | "green" | "black";

export type FlameCosmetic = {
  id: FlameCosmeticId;
  name: string;
  light: string;
  main: string;
  dark: string;
};

export const DEFAULT_FLAME_COSMETIC: FlameCosmeticId = "default";
export const ACTIVE_STREAK_FLAME_STORAGE_KEY = "bb:active-streak-flame";
export const ACTIVE_STREAK_FLAME_COLORS_STORAGE_KEY = "bb:active-streak-flame-colors";

export const FLAME_COSMETICS: FlameCosmetic[] = [
  { id: "default", name: "Classic Flame", light: "#FDBA74", main: "#F97316", dark: "#B91C1C" },
  { id: "orange", name: "Orange Flame", light: "#FFEDD5", main: "#EA580C", dark: "#9A3412" },
  { id: "blue", name: "Blue Flame", light: "#DBEAFE", main: "#7BAFD4", dark: "#2563EB" },
  { id: "gold", name: "Gold Flame", light: "#FEF3C7", main: "#B7791F", dark: "#614A19" },
  { id: "purple", name: "Purple Flame", light: "#EDE9FE", main: "#7C3AED", dark: "#4C3575" },
  { id: "red", name: "Red Flame", light: "#FF6B6B", main: "#991B1B", dark: "#3F0508" },
  { id: "green", name: "Green Flame", light: "#DCFCE7", main: "#16A34A", dark: "#166534" },
  { id: "black", name: "Black Flame", light: "#D4D4D4", main: "#525252", dark: "#050505" },
];

export const FLAME_COSMETIC_BY_ID = new Map(FLAME_COSMETICS.map((flame) => [flame.id, flame]));

export const PREMIUM_SKIN_FLAME_BY_ID: Partial<Record<PremiumSkinId, FlameCosmeticId>> = {
  "blue-storm": "blue",
  "midnight-garden": "green",
  "lavender-prayer": "purple",
  "ruby-village": "red",
  "slow-mornings": "gold",
  "morning-mercy": "orange",
  "carolina-coastline": "blue",
  "angel-wings": "blue",
  "winter-cabin": "blue",
  "mount-sinai": "gold",
  "desert-dawn": "gold",
};

export function normalizeFlameCosmeticId(value: unknown): FlameCosmeticId {
  return FLAME_COSMETIC_BY_ID.has(value as FlameCosmeticId) ? (value as FlameCosmeticId) : DEFAULT_FLAME_COSMETIC;
}

export function getFlameCosmetic(value: unknown): FlameCosmetic {
  return FLAME_COSMETIC_BY_ID.get(normalizeFlameCosmeticId(value)) ?? FLAME_COSMETIC_BY_ID.get(DEFAULT_FLAME_COSMETIC)!;
}

export function getPremiumSkinFlameId(skinId: PremiumSkinId | string | null | undefined): FlameCosmeticId | null {
  return PREMIUM_SKIN_FLAME_BY_ID[skinId as PremiumSkinId] ?? null;
}

export function getDocumentPremiumSkinFlameId(): FlameCosmeticId | null {
  if (typeof document === "undefined") return null;
  return getPremiumSkinFlameId(document.documentElement.dataset.bbSkin);
}

export function resolveActiveFlameCosmeticId(flameId?: FlameCosmeticId | string | null): FlameCosmeticId {
  const skinFlame = getDocumentPremiumSkinFlameId();
  if (skinFlame && (flameId == null || flameId === "")) return skinFlame;
  return normalizeFlameCosmeticId(flameId);
}

export function persistActiveStreakFlame(flameId: FlameCosmeticId | string | null | undefined): FlameCosmeticId {
  const normalizedFlameId = normalizeFlameCosmeticId(flameId);
  const flame = getFlameCosmetic(normalizedFlameId);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ACTIVE_STREAK_FLAME_STORAGE_KEY, normalizedFlameId);
    window.localStorage.setItem(ACTIVE_STREAK_FLAME_COLORS_STORAGE_KEY, JSON.stringify(flame));
  }
  if (typeof document !== "undefined") {
    document.documentElement.dataset.bbStreakFlame = normalizedFlameId;
    document.documentElement.style.setProperty("--bb-active-flame-light", flame.light);
    document.documentElement.style.setProperty("--bb-active-flame-main", flame.main);
    document.documentElement.style.setProperty("--bb-active-flame-dark", flame.dark);
  }
  return normalizedFlameId;
}
