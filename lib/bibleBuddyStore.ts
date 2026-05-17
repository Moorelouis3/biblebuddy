import type { AppThemeId } from "./appThemes";
import type { FlameCosmeticId } from "./flameCosmetics";

export type StoreItemKind = "theme" | "streak_flame" | "buddy" | "boost" | "mystery";

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
  flameId?: FlameCosmeticId;
  comingSoon?: boolean;
  repeatable?: boolean;
};

export const THEME_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "theme-blue", kind: "theme", title: "Blue Theme", subtitle: "Cool Bible study blues.", price: 500, emoji: "🔵", accent: "#2563EB", themeId: "blue" },
  { id: "theme-gold", kind: "theme", title: "Gold Theme", subtitle: "Warm reward energy.", price: 500, emoji: "🟡", accent: "#B7791F", themeId: "gold" },
  { id: "theme-purple", kind: "theme", title: "Purple Theme", subtitle: "Royal and focused.", price: 500, emoji: "🟣", accent: "#7C3AED", themeId: "purple" },
  { id: "theme-red", kind: "theme", title: "Red Theme", subtitle: "Bold habit heat.", price: 500, emoji: "🔴", accent: "#DC2626", themeId: "red" },
  { id: "theme-green", kind: "theme", title: "Green Theme", subtitle: "Fresh growth mode.", price: 500, emoji: "🟢", accent: "#16A34A", themeId: "green" },
  { id: "theme-pink", kind: "theme", title: "Pink Theme", subtitle: "Soft and bright.", price: 500, emoji: "🌸", accent: "#DB2777", themeId: "pink" },
  { id: "theme-orange", kind: "theme", title: "Orange Theme", subtitle: "Fire streak energy.", price: 500, emoji: "🟠", accent: "#EA580C", themeId: "orange" },
  { id: "theme-gray", kind: "theme", title: "Gray Theme", subtitle: "Clean and steady.", price: 500, emoji: "⚪", accent: "#4B5563", themeId: "gray" },
  { id: "theme-black", kind: "theme", title: "Black Theme", subtitle: "White space, black focus.", price: 500, emoji: "⚫", accent: "#050505", themeId: "black" },
];

export const STREAK_FLAME_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "flame-orange", kind: "streak_flame", title: "Orange Flame", subtitle: "Classic 30 day streak fire.", price: 250, emoji: "🔥", accent: "#EA580C", flameId: "orange" },
  { id: "flame-blue", kind: "streak_flame", title: "Blue Flame", subtitle: "Carolina blue with a deep blue base.", price: 250, emoji: "🔥", accent: "#38BDF8", flameId: "blue" },
  { id: "flame-gold", kind: "streak_flame", title: "Gold Flame", subtitle: "Bright gold with a deep amber base.", price: 250, emoji: "🔥", accent: "#F59E0B", flameId: "gold" },
  { id: "flame-purple", kind: "streak_flame", title: "Purple Flame", subtitle: "Light purple with a royal dark base.", price: 250, emoji: "🔥", accent: "#8B5CF6", flameId: "purple" },
  { id: "flame-red", kind: "streak_flame", title: "Red Flame", subtitle: "Bold red flame matched to the red theme.", price: 250, emoji: "🔥", accent: "#DC2626", flameId: "red" },
  { id: "flame-green", kind: "streak_flame", title: "Green Flame", subtitle: "Light green with a deep forest base.", price: 250, emoji: "🔥", accent: "#22C55E", flameId: "green" },
  { id: "flame-black", kind: "streak_flame", title: "Black Flame", subtitle: "Gray light with a black base.", price: 250, emoji: "🔥", accent: "#050505", flameId: "black" },
];

export const BUDDY_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "buddy-lil-louis", kind: "buddy", title: "Lil Louis", subtitle: "Your first Bible Buddy coach.", price: 0, emoji: "👑", accent: "#DC2626" },
  { id: "buddy-walter", kind: "buddy", title: "Walter", subtitle: "Retired preacher with calm Scripture wisdom.", price: 750, emoji: "W", accent: "#4B5563", imageSrc: "/Walterwaving.png" },
  { id: "buddy-lindsey", kind: "buddy", title: "Lindsey", subtitle: "Christian life coach for practical daily faith.", price: 750, emoji: "L", accent: "#DB2777", imageSrc: "/Lindseywaving.png" },
  { id: "buddy-steve", kind: "buddy", title: "Steve", subtitle: "Youth pastor energy for practical Scripture momentum.", price: 750, emoji: "S", accent: "#2563EB", imageSrc: "/Stevewaving.png" },
];

export const BOOST_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "boost-extra-grace-day", kind: "boost", title: "Extra Grace Day", subtitle: "Add 1 Grace Day to protect your streak.", price: 100, emoji: "🛡️", accent: "#DC2626", repeatable: true },
  { id: "boost-double-xp-7", kind: "boost", title: "Double XP: 7 Days", subtitle: "Earn 2x XP for Bible study tasks this week.", price: 300, emoji: "⚡", accent: "#B7791F", repeatable: true },
  { id: "boost-streak-shield-7", kind: "boost", title: "Streak Shield: 7 Days", subtitle: "Protect your streak for the next 7 days.", price: 250, emoji: "🧯", accent: "#2563EB", repeatable: true },
  { id: "mystery-prize", kind: "mystery", title: "Mystery Prize", subtitle: "Open a surprise reward from the store.", price: 100, emoji: "🎁", accent: "#7C3AED", repeatable: true },
];

export const STORE_ITEMS = [
  ...THEME_STORE_ITEMS,
  ...STREAK_FLAME_STORE_ITEMS,
  ...BUDDY_STORE_ITEMS,
  ...BOOST_STORE_ITEMS,
];

export function getStoreItem(itemId: string) {
  return STORE_ITEMS.find((item) => item.id === itemId) ?? null;
}
