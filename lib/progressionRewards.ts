export const TASK_XP = {
  intro: 0,
  reading: 0,
  notes: 0,
  triviaPerfect: 0,
  scrambledPerfect: 0,
  reflection: 0,
  chapterBonus: 0,
} as const;

export const DIAMOND_REWARDS = {
  fullChapter: 0,
  fullBook: 0,
  perfectTrivia: 0,
  perfectScrambled: 0,
  reflection: 0,
  tvVideoWatch: 0,
  levelUp: 0,
} as const;

export const TASK_REWARD_LABELS = {
  intro: "Complete",
  reading: "Complete",
  notes: "Complete",
  trivia: "Practice",
  scrambled: "Practice",
  reflection: "Reflect",
  chapterBonus: "Chapter complete",
} as const;

export const STORE_PRICE_EXAMPLES = {
  theme: 200,
  profileFrame: 300,
  streakFlame: 500,
  premiumTheme: 750,
} as const;

export const DIAMOND_REWARD_COPY = {
  fullChapter: "Chapter completion recorded",
  fullBook: "Book completion recorded",
  themePrice: "Theme purchase retired",
} as const;

export function getTriviaScoreFromLabel(label: string) {
  const match = label.match(/-\s*(\d+)\s*\/\s*(\d+)/);
  if (!match) return null;
  const score = Number(match[1]);
  const total = Number(match[2]);
  if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) return null;
  return { score, total, perfect: score === total };
}

export function estimateDiamondStashFromActions(actions: Array<{ action_type?: string | null; action_label?: string | null }>, level = 1) {
  void actions;
  void level;
  return 0;
}
