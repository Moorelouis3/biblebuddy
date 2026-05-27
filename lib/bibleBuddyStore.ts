import type { AppThemeId } from "./appThemes";
import type { FlameCosmeticId } from "./flameCosmetics";
import { PREMIUM_SKINS, type PremiumSkinId } from "./premiumSkins";

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
  skinId?: PremiumSkinId;
  flameId?: FlameCosmeticId;
  comingSoon?: boolean;
  repeatable?: boolean;
};

export const THEME_STORE_ITEMS: BibleBuddyStoreItem[] = [];

const SKIN_EMOJI_BY_ID: Partial<Record<PremiumSkinId, string>> = {
  "lavender-prayer": "Purple",
  "ruby-village": "Red",
  "mount-sinai": "Amber",
  "no-fuss": "Slate",
  "passion-fruit": "Pink",
};

export const PREMIUM_SKIN_STORE_ITEMS: BibleBuddyStoreItem[] = PREMIUM_SKINS.map((skin) => ({
  id: `skin-${skin.id}`,
  kind: "premium_skin",
  title: skin.name,
  subtitle: skin.storeSubtitle,
  price: skin.price,
  emoji: SKIN_EMOJI_BY_ID[skin.id] ?? "Skin",
  accent: skin.palette.accent,
  skinId: skin.id,
}));

export const BUDDY_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "buddy-lil-louis", kind: "buddy", title: "Lil Louis", subtitle: "Your first Bible Buddy.", price: 0, emoji: "Crown", accent: "#DC2626" },
  { id: "buddy-walter", kind: "buddy", title: "Walter", subtitle: "Calm wisdom", price: 750, emoji: "W", accent: "#4B5563", imageSrc: "/Walterwaving.png" },
  { id: "buddy-lindsey", kind: "buddy", title: "Lindsey", subtitle: "Daily faith coach", price: 750, emoji: "L", accent: "#DB2777", imageSrc: "/Lindseywaving.png" },
  { id: "buddy-steve", kind: "buddy", title: "Steve", subtitle: "Youth pastor energy", price: 750, emoji: "S", accent: "#2563EB", imageSrc: "/Stevewaving.png" },
];

export const STREAK_FLAME_STORE_ITEMS: BibleBuddyStoreItem[] = [];

export const BOOST_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "boost-extra-grace-day", kind: "boost", title: "Extra Grace Day", subtitle: "Add 1 grace day to protect your streak.", price: 100, emoji: "Heart", accent: "#DC2626", repeatable: true },
  { id: "boost-double-xp-7", kind: "boost", title: "Double XP: 7 Days", subtitle: "Earn 2x XP from Bible study tasks this week.", price: 300, emoji: "Bolt", accent: "#B7791F", repeatable: true },
  { id: "mystery-prize", kind: "mystery", title: "Mystery Prize", subtitle: "Open a surprise reward from the store.", price: 100, emoji: "Gift", accent: "#7C3AED", repeatable: true },
];

export const STORE_ITEMS = [
  ...PREMIUM_SKIN_STORE_ITEMS,
  ...THEME_STORE_ITEMS,
  ...BUDDY_STORE_ITEMS,
  ...BOOST_STORE_ITEMS,
];

export function getStoreItem(itemId: string) {
  return STORE_ITEMS.find((item) => item.id === itemId) ?? null;
}
