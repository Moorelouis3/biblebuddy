export type BuddyAvatarId = "louis" | "walter" | "lindsey" | "steve";

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
    name: "Lil Louis",
    unlockLevel: 1,
    title: "Bible Teacher",
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
    id: "walter",
    name: "Walter",
    unlockLevel: 1,
    title: "Retired Preacher",
    description: "Wise, patient, grounded in Scripture, and speaks like a mentor.",
    profileImage: "/Walterwaving.png",
    traits: ["Wise", "Patient", "Grounded"],
    bio: "Walter is planned as a steady pastor voice for users who want calm wisdom and Scripture-first guidance.",
    speakingStyle: "Slow, warm, pastoral, and rooted in the Bible.",
    favoriteBibleThemes: ["Wisdom", "Faithfulness", "Endurance"],
    mentorStyle: "Mentor voice for steady spiritual growth.",
    colors: { bg: "#f2f3f5", face: "#8f5a3c", hair: "#f4f0e8", accent: "#4B5563", robe: "#d6d9de" },
  },
  {
    id: "lindsey",
    name: "Lindsey",
    unlockLevel: 1,
    title: "Christian Life Coach",
    description: "Encouraging, practical, gentle, and focused on daily faith.",
    profileImage: "/Lindseywaving.png",
    traits: ["Gentle", "Practical", "Encouraging"],
    bio: "Lindsey is a practical everyday faith voice for busy users building a Bible habit at home.",
    speakingStyle: "Kind, simple, practical, and encouraging.",
    favoriteBibleThemes: ["Prayer", "Family", "Daily faith"],
    mentorStyle: "Gentle coach for real-life Bible habits.",
    colors: { bg: "#fff4f7", face: "#9a5a38", hair: "#4b2d21", accent: "#DB2777", robe: "#ffe0ea" },
  },
  {
    id: "steve",
    name: "Steve",
    unlockLevel: 1,
    title: "New Youth Pastor",
    description: "Energetic, relatable, Scripture focused, and growth driven.",
    traits: ["Energetic", "Relatable", "Focused"],
    bio: "Steve is planned as a youth pastor voice for quick encouragement, action steps, and growth-focused study.",
    speakingStyle: "Energetic, clear, casual, and Scripture focused.",
    favoriteBibleThemes: ["Growth", "Purpose", "Courage"],
    mentorStyle: "High-energy coach for momentum.",
    colors: { bg: "#eef7ff", face: "#a8643c", hair: "#3b2419", accent: "#2563EB", robe: "#d9ecff" },
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
