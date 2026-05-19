import type { AppThemeId } from "./appThemes";
import type { FlameCosmeticId } from "./flameCosmetics";
import { BLUE_STORM_SKIN, LAVENDER_PRAYER_SKIN, MIDNIGHT_GARDEN_SKIN, RUBY_VILLAGE_SKIN, SLOW_MORNINGS_SKIN, type PremiumSkinId } from "./premiumSkins";

export type StoreItemKind = "theme" | "premium_skin" | "streak_flame" | "buddy" | "boost" | "mystery";

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
  { id: "theme-blue", kind: "theme", title: "Blue", subtitle: "Cool and calm.", price: 500, emoji: "🔵", accent: "#2563EB", themeId: "blue" },
  { id: "theme-gold", kind: "theme", title: "Gold", subtitle: "Warm and uplifting.", price: 500, emoji: "🟡", accent: "#B7791F", themeId: "gold" },
  { id: "theme-purple", kind: "theme", title: "Purple", subtitle: "Royal and focused.", price: 500, emoji: "🟣", accent: "#7C3AED", themeId: "purple" },
  { id: "theme-red", kind: "theme", title: "Red", subtitle: "Bold and passionate.", price: 500, emoji: "🔴", accent: "#DC2626", themeId: "red" },
  { id: "theme-green", kind: "theme", title: "Green", subtitle: "Fresh and growing.", price: 500, emoji: "🟢", accent: "#16A34A", themeId: "green" },
  { id: "theme-pink", kind: "theme", title: "Pink", subtitle: "Soft and bright.", price: 500, emoji: "🌸", accent: "#DB2777", themeId: "pink" },
  { id: "theme-orange", kind: "theme", title: "Orange", subtitle: "Warm streak energy.", price: 500, emoji: "🟠", accent: "#EA580C", themeId: "orange" },
  { id: "theme-gray", kind: "theme", title: "Gray", subtitle: "Clean and steady.", price: 500, emoji: "⚪", accent: "#4B5563", themeId: "gray" },
  { id: "theme-black", kind: "theme", title: "Black", subtitle: "Sharp and focused.", price: 500, emoji: "⚫", accent: "#050505", themeId: "black" },
];

export const PREMIUM_SKIN_STORE_ITEMS: BibleBuddyStoreItem[] = [
  {
    id: "skin-blue-storm",
    kind: "premium_skin",
    title: BLUE_STORM_SKIN.name,
    subtitle: BLUE_STORM_SKIN.storeSubtitle,
    price: BLUE_STORM_SKIN.price,
    emoji: "Storm",
    accent: BLUE_STORM_SKIN.palette.accent,
    imageSrc: BLUE_STORM_SKIN.thumbnailImage,
    skinId: BLUE_STORM_SKIN.id,
  },
  {
    id: "skin-midnight-garden",
    kind: "premium_skin",
    title: MIDNIGHT_GARDEN_SKIN.name,
    subtitle: MIDNIGHT_GARDEN_SKIN.storeSubtitle,
    price: MIDNIGHT_GARDEN_SKIN.price,
    emoji: "Moon",
    accent: MIDNIGHT_GARDEN_SKIN.palette.accent,
    imageSrc: MIDNIGHT_GARDEN_SKIN.thumbnailImage,
    skinId: MIDNIGHT_GARDEN_SKIN.id,
  },
  {
    id: "skin-lavender-prayer",
    kind: "premium_skin",
    title: LAVENDER_PRAYER_SKIN.name,
    subtitle: LAVENDER_PRAYER_SKIN.storeSubtitle,
    price: LAVENDER_PRAYER_SKIN.price,
    emoji: "Prayer",
    accent: LAVENDER_PRAYER_SKIN.palette.accent,
    imageSrc: LAVENDER_PRAYER_SKIN.thumbnailImage,
    skinId: LAVENDER_PRAYER_SKIN.id,
  },
  {
    id: "skin-ruby-village",
    kind: "premium_skin",
    title: RUBY_VILLAGE_SKIN.name,
    subtitle: RUBY_VILLAGE_SKIN.storeSubtitle,
    price: RUBY_VILLAGE_SKIN.price,
    emoji: "Ruby",
    accent: RUBY_VILLAGE_SKIN.palette.accent,
    imageSrc: RUBY_VILLAGE_SKIN.thumbnailImage,
    skinId: RUBY_VILLAGE_SKIN.id,
  },
  {
    id: "skin-slow-mornings",
    kind: "premium_skin",
    title: SLOW_MORNINGS_SKIN.name,
    subtitle: SLOW_MORNINGS_SKIN.storeSubtitle,
    price: SLOW_MORNINGS_SKIN.price,
    emoji: "Coffee",
    accent: SLOW_MORNINGS_SKIN.palette.accent,
    imageSrc: SLOW_MORNINGS_SKIN.thumbnailImage,
    skinId: SLOW_MORNINGS_SKIN.id,
  },
];

export const STREAK_FLAME_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "flame-orange", kind: "streak_flame", title: "Orange Flame", subtitle: "Classic 30 day streak fire.", price: 250, emoji: "🔥", accent: "#EA580C", flameId: "orange" },
  { id: "flame-blue", kind: "streak_flame", title: "Blue Flame", subtitle: "Matches the blue theme.", price: 250, emoji: "🔥", accent: "#38BDF8", flameId: "blue" },
  { id: "flame-gold", kind: "streak_flame", title: "Gold Flame", subtitle: "Matches the gold theme.", price: 250, emoji: "🔥", accent: "#F59E0B", flameId: "gold" },
  { id: "flame-purple", kind: "streak_flame", title: "Purple Flame", subtitle: "Matches the purple theme.", price: 250, emoji: "🔥", accent: "#8B5CF6", flameId: "purple" },
  { id: "flame-red", kind: "streak_flame", title: "Red Flame", subtitle: "Matches the red theme.", price: 250, emoji: "🔥", accent: "#DC2626", flameId: "red" },
  { id: "flame-green", kind: "streak_flame", title: "Green Flame", subtitle: "Matches the green theme.", price: 250, emoji: "🔥", accent: "#22C55E", flameId: "green" },
  { id: "flame-black", kind: "streak_flame", title: "Black Flame", subtitle: "Matches the black theme.", price: 250, emoji: "🔥", accent: "#050505", flameId: "black" },
];

export const BUDDY_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "buddy-lil-louis", kind: "buddy", title: "Lil Louis", subtitle: "Your first Bible Buddy.", price: 0, emoji: "👑", accent: "#DC2626" },
  { id: "buddy-walter", kind: "buddy", title: "Walter", subtitle: "Calm wisdom", price: 750, emoji: "W", accent: "#4B5563", imageSrc: "/Walterwaving.png" },
  { id: "buddy-lindsey", kind: "buddy", title: "Lindsey", subtitle: "Daily faith coach", price: 750, emoji: "L", accent: "#DB2777", imageSrc: "/Lindseywaving.png" },
  { id: "buddy-steve", kind: "buddy", title: "Steve", subtitle: "Youth pastor energy", price: 750, emoji: "S", accent: "#2563EB", imageSrc: "/Stevewaving.png" },
];

export const BOOST_STORE_ITEMS: BibleBuddyStoreItem[] = [
  { id: "boost-extra-grace-day", kind: "boost", title: "Extra Grace Day", subtitle: "Add 1 grace day to protect your streak.", price: 100, emoji: "💗", accent: "#DC2626", repeatable: true },
  { id: "boost-double-xp-7", kind: "boost", title: "Double XP: 7 Days", subtitle: "Earn 2x XP from Bible study tasks this week.", price: 300, emoji: "⚡", accent: "#B7791F", repeatable: true },
  { id: "mystery-prize", kind: "mystery", title: "Mystery Prize", subtitle: "Open a surprise reward from the store.", price: 100, emoji: "🎁", accent: "#7C3AED", repeatable: true },
];

export const STORE_ITEMS = [
  ...PREMIUM_SKIN_STORE_ITEMS,
  ...THEME_STORE_ITEMS,
  ...STREAK_FLAME_STORE_ITEMS,
  ...BUDDY_STORE_ITEMS,
  ...BOOST_STORE_ITEMS,
];

export function getStoreItem(itemId: string) {
  return STORE_ITEMS.find((item) => item.id === itemId) ?? null;
}
