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

export const THEME_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "theme-blue", kind: "theme", title: "Blue", subtitle: "Cool and calm.", price: 500, emoji: "Blue", accent: "#2563EB", themeId: "blue" },
  { id: "theme-gold", kind: "theme", title: "Gold", subtitle: "Warm and uplifting.", price: 500, emoji: "Gold", accent: "#B7791F", themeId: "gold" },
  { id: "theme-purple", kind: "theme", title: "Purple", subtitle: "Royal and focused.", price: 500, emoji: "Purple", accent: "#7C3AED", themeId: "purple" },
  { id: "theme-red", kind: "theme", title: "Red", subtitle: "Bold and passionate.", price: 500, emoji: "Red", accent: "#DC2626", themeId: "red" },
  { id: "theme-green", kind: "theme", title: "Green", subtitle: "Fresh and growing.", price: 500, emoji: "Green", accent: "#16A34A", themeId: "green" },
  { id: "theme-pink", kind: "theme", title: "Pink", subtitle: "Soft and bright.", price: 500, emoji: "Pink", accent: "#DB2777", themeId: "pink" },
  { id: "theme-orange", kind: "theme", title: "Orange", subtitle: "Warm streak energy.", price: 500, emoji: "Orange", accent: "#EA580C", themeId: "orange" },
  { id: "theme-gray", kind: "theme", title: "Gray", subtitle: "Clean and steady.", price: 500, emoji: "Gray", accent: "#4B5563", themeId: "gray" },
  { id: "theme-black", kind: "theme", title: "Black", subtitle: "Sharp and focused.", price: 500, emoji: "Black", accent: "#050505", themeId: "black" },
];

const SKIN_EMOJI_BY_ID: Partial<Record<PremiumSkinId, string>> = {
  "blue-storm": "Blue",
  "midnight-garden": "Green",
  "lavender-prayer": "Purple",
  "ruby-village": "Red",
  "slow-mornings": "Gold",
  "morning-mercy": "Orange",
  "carolina-coastline": "Coast",
  "angel-wings": "Sky",
  "winter-cabin": "Ice",
  "mount-sinai": "Amber",
  "desert-dawn": "Dawn",
  "no-fuss": "Slate",
  "quiet-blue": "Blue",
  "royal-purple": "Purple",
  "fresh-green": "Green",
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
