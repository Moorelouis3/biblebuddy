export type FlameCosmeticId = "default" | "orange" | "blue" | "gold" | "purple" | "red" | "green" | "black";

export type FlameCosmetic = {
  id: FlameCosmeticId;
  name: string;
  light: string;
  main: string;
  dark: string;
};

export const DEFAULT_FLAME_COSMETIC: FlameCosmeticId = "default";

export const FLAME_COSMETICS: FlameCosmetic[] = [
  { id: "default", name: "Classic Flame", light: "#FDBA74", main: "#F97316", dark: "#B91C1C" },
  { id: "orange", name: "Orange Flame", light: "#FFEDD5", main: "#EA580C", dark: "#9A3412" },
  { id: "blue", name: "Blue Flame", light: "#DBEAFE", main: "#7BAFD4", dark: "#2563EB" },
  { id: "gold", name: "Gold Flame", light: "#FEF3C7", main: "#B7791F", dark: "#614A19" },
  { id: "purple", name: "Purple Flame", light: "#EDE9FE", main: "#7C3AED", dark: "#4C3575" },
  { id: "red", name: "Red Flame", light: "#FEE2E2", main: "#DC2626", dark: "#7F1D1D" },
  { id: "green", name: "Green Flame", light: "#DCFCE7", main: "#16A34A", dark: "#166534" },
  { id: "black", name: "Black Flame", light: "#E5E5E5", main: "#050505", dark: "#050505" },
];

export const FLAME_COSMETIC_BY_ID = new Map(FLAME_COSMETICS.map((flame) => [flame.id, flame]));

export function normalizeFlameCosmeticId(value: unknown): FlameCosmeticId {
  return FLAME_COSMETIC_BY_ID.has(value as FlameCosmeticId) ? (value as FlameCosmeticId) : DEFAULT_FLAME_COSMETIC;
}

export function getFlameCosmetic(value: unknown): FlameCosmetic {
  return FLAME_COSMETIC_BY_ID.get(normalizeFlameCosmeticId(value)) ?? FLAME_COSMETIC_BY_ID.get(DEFAULT_FLAME_COSMETIC)!;
}
