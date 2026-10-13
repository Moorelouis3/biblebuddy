export type LouisAvatarMood =
  | "wave"
  | "reading"
  | "praying"
  | "stareyes"
  | "idea"
  | "thinking"
  | "peace";

export type LouisMoment =
  | "welcome"
  | "study"
  | "chapter-complete"
  | "prayer"
  | "reflection"
  | "celebration"
  | "tip"
  | "community"
  | "loading"
  | "encouragement";

export const LOUIS_PROFILE = {
  name: "Louis",
  age: 41,
  location: "Germany",
  role: "Bible teacher / habit builder",
  oneLine: "A calm Bible study mentor who helps people build a real Bible habit without feeling overwhelmed.",
  personality: ["Encouraging", "Calm", "Funny at times", "Wise", "Honest", "Approachable"],
  background: [
    "Bible teacher",
    "Built Bible Buddy to help people build a real Bible habit",
    "Focuses on consistency over perfection",
    "Believes anyone can understand Scripture with the right guidance",
  ],
  tone: ["Warm", "Conversational", "Encouraging", "Sometimes playful", "Never preachy"],
  favoriteBibleThemes: ["Consistency", "Grace", "Wisdom", "Transformation", "God's faithfulness"],
  mentorStyle: "Friend plus mentor: clear Bible teaching, gentle nudges, and honest encouragement.",
} as const;

export const LOUIS_AVATAR_BY_MOMENT: Record<LouisMoment, LouisAvatarMood> = {
  welcome: "wave",
  study: "reading",
  "chapter-complete": "reading",
  prayer: "praying",
  reflection: "thinking",
  celebration: "stareyes",
  tip: "idea",
  community: "peace",
  loading: "thinking",
  encouragement: "peace",
};

export const LOUIS_AVATAR_FILES: Record<LouisAvatarMood, string> = {
  wave: "/Newlouiswave.png",
  reading: "/Newlouisreading.png",
  praying: "/Newlouispraying.png",
  stareyes: "/Newlouisstareyes.png",
  idea: "/Newlouisidea.png",
  thinking: "/Newlouisthinking.png",
  peace: "/Newlouispeace.png",
};

export function getLouisMoodForMoment(moment: LouisMoment): LouisAvatarMood {
  return LOUIS_AVATAR_BY_MOMENT[moment] ?? "wave";
}

export function getLouisLine(moment: LouisMoment, fallback?: string) {
  const lines: Record<LouisMoment, string> = {
    welcome: "Welcome back buddy. Ready for today's study?",
    study: "Let's slow down and understand the chapter together.",
    "chapter-complete": "You completed the chapter. Great job staying consistent.",
    prayer: "Take a quiet moment to pray through what you just read.",
    reflection: "What do you think God is showing you in this part of the story?",
    celebration: "LET'S GO. That is a strong finish.",
    tip: "Try reading the notes before trivia. It makes the questions click faster.",
    community: "Connect with Bible Buddies across the world as you keep growing.",
    loading: "Give me a second. I am pulling the study together.",
    encouragement: "Consistency over perfection. Keep showing up.",
  };

  return fallback?.trim() || lines[moment] || lines.welcome;
}
