export type BuddyAvatarId = "louis" | "eli" | "abigail" | "ezra" | "miriam" | "josiah";

export type BuddyAvatar = {
  id: BuddyAvatarId;
  name: string;
  unlockLevel: number;
  title: string;
  description: string;
  colors: {
    bg: string;
    face: string;
    hair: string;
    accent: string;
    robe: string;
  };
};

export const DEFAULT_BUDDY_AVATAR: BuddyAvatarId = "louis";
export const SELECTED_BUDDY_STORAGE_KEY = "bb:selected-buddy-avatar";

export const BUDDY_AVATARS: BuddyAvatar[] = [
  {
    id: "louis",
    name: "Louis",
    unlockLevel: 1,
    title: "Your Faithful Guide",
    description: "Friendly, personal, encouraging, familiar.",
    colors: { bg: "#eef7f1", face: "#8b4a2b", hair: "#2f1f19", accent: "#d94841", robe: "#f7d54a" },
  },
  {
    id: "eli",
    name: "Eli",
    unlockLevel: 5,
    title: "The Encourager",
    description: "Warm, positive, and uplifting when you need motivation.",
    colors: { bg: "#eef7ff", face: "#a8643c", hair: "#3b2419", accent: "#7BAFD4", robe: "#d9ecff" },
  },
  {
    id: "abigail",
    name: "Abigail",
    unlockLevel: 10,
    title: "The Prayer Warrior",
    description: "Gentle, prayerful, and emotionally supportive.",
    colors: { bg: "#fff4f7", face: "#9a5a38", hair: "#4b2d21", accent: "#d9799f", robe: "#ffe0ea" },
  },
  {
    id: "ezra",
    name: "Ezra",
    unlockLevel: 15,
    title: "The Wise Teacher",
    description: "Calm, thoughtful, and focused on Bible study.",
    colors: { bg: "#f4f0ff", face: "#8f5634", hair: "#ece6d6", accent: "#8c6ed6", robe: "#e8ddff" },
  },
  {
    id: "miriam",
    name: "Miriam",
    unlockLevel: 20,
    title: "The Brave Leader",
    description: "Bold, confident, strong, and encouraging.",
    colors: { bg: "#fff8e8", face: "#9b5d3a", hair: "#33211a", accent: "#e7a92f", robe: "#fff0be" },
  },
  {
    id: "josiah",
    name: "Josiah",
    unlockLevel: 25,
    title: "The Faithful King",
    description: "Focused, disciplined, courageous, and strong.",
    colors: { bg: "#edf8f4", face: "#7f4a31", hair: "#2d211c", accent: "#3f9c78", robe: "#d8f1e6" },
  },
];

export function getBuddyAvatar(id: string | null | undefined) {
  return BUDDY_AVATARS.find((buddy) => buddy.id === id) ?? BUDDY_AVATARS[0];
}

export function normalizeBuddyAvatarId(id: string | null | undefined): BuddyAvatarId {
  return getBuddyAvatar(id).id;
}

export function isBuddyUnlocked(buddy: BuddyAvatar, currentLevel: number) {
  return Math.max(1, currentLevel || 1) >= buddy.unlockLevel;
}
