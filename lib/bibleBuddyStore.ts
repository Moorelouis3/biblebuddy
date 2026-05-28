import type { AppThemeId } from "./appThemes";
import type { FlameCosmeticId } from "./flameCosmetics";

export type StoreItemKind = "theme" | "premium_skin" | "buddy" | "boost" | "mystery";

export type BibleBuddyStoreItem = {
  id: string;
  kind: StoreItemKind;
  title: string;
  subtitle: string;
  price: number;
  emoji: string;
  accent: string;
  imageSrc?: string;
  themeId?: AppThemeId;
  skinId?: string;
  flameId?: FlameCosmeticId;
  comingSoon?: boolean;
  repeatable?: boolean;
};

export const THEME_STORE_ITEMS: BibleBuddyStoreItem[] = [];

export const BUDDY_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "buddy-lil-louis", kind: "buddy", title: "Lil Louis", subtitle: "Your first Bible Buddy.", price: 0, emoji: "Crown", accent: "#DC2626" },
  { id: "buddy-walter", kind: "buddy", title: "Walter", subtitle: "Calm wisdom", price: 750, emoji: "W", accent: "#4B5563", imageSrc: "/Walterwaving.png" },
  { id: "buddy-lindsey", kind: "buddy", title: "Lindsey", subtitle: "Daily faith coach", price: 750, emoji: "L", accent: "#DB2777", imageSrc: "/Lindseywaving.png" },
  { id: "buddy-steve", kind: "buddy", title: "Steve", subtitle: "Youth pastor energy", price: 750, emoji: "S", accent: "#2563EB", imageSrc: "/Stevewaving.png" },
];

export const STREAK_FLAME_STORE_ITEMS: BibleBuddyStoreItem[] = [];

export const BOOST_STORE_ITEMS: BibleBuddyStoreItem[] = [];

export const STORE_ITEMS = [
  ...THEME_STORE_ITEMS,
  ...BUDDY_STORE_ITEMS,
  ...BOOST_STORE_ITEMS,
];

export function getStoreItem(itemId: string) {
  return STORE_ITEMS.find((item) => item.id === itemId) ?? null;
}
