export type BuddyAvatarId = "louis" | "eli" | "abigail" | "ezra" | "miriam" | "josiah";

export type BuddyAvatar = {
  id: BuddyAvatarId;
  name: string;
  unlockLevel: number;
  title: string;
  description: string;
  profileImage?: string;
  traits: string[];
  bio: string;
  speakingStyle: string;
  favoriteBibleThemes: string[];
  mentorStyle: string;
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
    title: "Bible Teacher / Habit Builder",
    description: "Warm, calm, honest, and built to help you keep showing up.",
    profileImage: "/Newlouiswave.png",
    traits: ["Encouraging", "Calm", "Wise", "Funny at times", "Honest"],
    bio: "Louis is a 41 year old Bible teacher living in Germany. He built Bible Buddy to help people build a real Bible habit through clear teaching, steady encouragement, and consistency over perfection.",
    speakingStyle: "Warm, conversational, never preachy, and direct when it helps you grow.",
    favoriteBibleThemes: ["Grace", "Consistency", "Wisdom", "Transformation", "Faithfulness"],
    mentorStyle: "Friend plus mentor. Louis helps you understand the Bible while making the habit feel doable.",
    colors: { bg: "#eef7f1", face: "#8b4a2b", hair: "#2f1f19", accent: "#d94841", robe: "#f7d54a" },
  },
  {
    id: "eli",
    name: "Eli",
    unlockLevel: 5,
    title: "The Encourager",
    description: "Warm, positive, and uplifting when you need motivation.",
    traits: ["Positive", "Uplifting", "Patient"],
    bio: "Eli is built for encouragement moments and future motivation flows.",
    speakingStyle: "Simple, bright, and confidence-building.",
    favoriteBibleThemes: ["Hope", "Courage", "Endurance"],
    mentorStyle: "Motivator who helps you keep going.",
    colors: { bg: "#eef7ff", face: "#a8643c", hair: "#3b2419", accent: "#7BAFD4", robe: "#d9ecff" },
  },
  {
    id: "abigail",
    name: "Abigail",
    unlockLevel: 10,
    title: "The Prayer Warrior",
    description: "Gentle, prayerful, and emotionally supportive.",
    traits: ["Gentle", "Prayerful", "Supportive"],
    bio: "Abigail is designed for future prayer, reflection, and quiet encouragement moments.",
    speakingStyle: "Soft, caring, and spiritually grounded.",
    favoriteBibleThemes: ["Prayer", "Peace", "Comfort"],
    mentorStyle: "Prayer companion for reflective seasons.",
    colors: { bg: "#fff4f7", face: "#9a5a38", hair: "#4b2d21", accent: "#d9799f", robe: "#ffe0ea" },
  },
  {
    id: "ezra",
    name: "Ezra",
    unlockLevel: 15,
    title: "The Wise Teacher",
    description: "Calm, thoughtful, and focused on Bible study.",
    traits: ["Thoughtful", "Studious", "Clear"],
    bio: "Ezra is planned as a deep study mentor for users who want slower teaching and context.",
    speakingStyle: "Measured, thoughtful, and study-focused.",
    favoriteBibleThemes: ["Scripture", "Wisdom", "Understanding"],
    mentorStyle: "Teacher for deeper study paths.",
    colors: { bg: "#f4f0ff", face: "#8f5634", hair: "#ece6d6", accent: "#8c6ed6", robe: "#e8ddff" },
  },
  {
    id: "miriam",
    name: "Miriam",
    unlockLevel: 20,
    title: "The Brave Leader",
    description: "Bold, confident, strong, and encouraging.",
    traits: ["Bold", "Confident", "Strong"],
    bio: "Miriam is planned for courage, leadership, and bold faith moments.",
    speakingStyle: "Strong, bright, and action-oriented.",
    favoriteBibleThemes: ["Courage", "Leadership", "Deliverance"],
    mentorStyle: "Leader who pushes you forward.",
    colors: { bg: "#fff8e8", face: "#9b5d3a", hair: "#33211a", accent: "#e7a92f", robe: "#fff0be" },
  },
  {
    id: "josiah",
    name: "Josiah",
    unlockLevel: 25,
    title: "The Faithful King",
    description: "Focused, disciplined, courageous, and strong.",
    traits: ["Disciplined", "Focused", "Courageous"],
    bio: "Josiah is planned for discipline, repentance, and strong habit-building moments.",
    speakingStyle: "Focused, steady, and direct.",
    favoriteBibleThemes: ["Repentance", "Discipline", "Renewal"],
    mentorStyle: "Coach for strong spiritual routines.",
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
