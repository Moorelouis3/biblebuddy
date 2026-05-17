import type { ActionType } from "./actionTypes";
import { ACTION_TYPE } from "./actionTypes";

export const TASK_XP = {
  intro: 10,
  reading: 20,
  notes: 25,
  triviaPerfect: 25,
  scrambledPerfect: 25,
  reflection: 20,
  chapterBonus: 50,
} as const;

export const DIAMOND_REWARDS = {
  fullChapter: 25,
  fullBook: 250,
  perfectTrivia: 10,
  perfectScrambled: 10,
  reflection: 5,
  tvVideoWatch: 1,
  levelUp: 50,
} as const;

export const TASK_REWARD_LABELS = {
  intro: `+${TASK_XP.intro} XP`,
  reading: `+${TASK_XP.reading} XP`,
  notes: `+${TASK_XP.notes} XP`,
  trivia: `Up to +${TASK_XP.triviaPerfect} XP`,
  scrambled: `Up to +${TASK_XP.scrambledPerfect} XP`,
  reflection: `+${TASK_XP.reflection} XP`,
  chapterBonus: `+${TASK_XP.chapterBonus} XP +${DIAMOND_REWARDS.fullChapter} Diamonds`,
} as const;

export const STORE_PRICE_EXAMPLES = {
  theme: 200,
  profileFrame: 300,
  streakFlame: 500,
  premiumTheme: 750,
} as const;

export const DIAMOND_REWARD_COPY = {
  fullChapter: `+${DIAMOND_REWARDS.fullChapter} Diamonds for finishing all 6 chapter tasks`,
  fullBook: `+${DIAMOND_REWARDS.fullBook} Diamonds for finishing a Bible book`,
  themePrice: `${STORE_PRICE_EXAMPLES.theme} Diamonds for a theme`,
} as const;

type ActionLike = {
  action_type?: string | null;
  action_label?: string | null;
};

function count(actions: ActionLike[], actionType: ActionType, predicate?: (label: string) => boolean) {
  return actions.reduce((total, action) => {
    if (action.action_type !== actionType) return total;
    const label = String(action.action_label || "");
    if (predicate && !predicate(label)) return total;
    return total + 1;
  }, 0);
}

export function getTriviaScoreFromLabel(label: string) {
  const match = label.match(/-\s*(\d+)\s*\/\s*(\d+)/);
  if (!match) return null;
  const score = Number(match[1]);
  const total = Number(match[2]);
  if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) return null;
  return { score, total, perfect: score === total };
}

export function estimateDiamondStashFromActions(actions: ActionLike[], level = 1) {
  const fullChapterCount = count(actions, ACTION_TYPE.chapter_completed);
  const fullBookCount = count(actions, ACTION_TYPE.book_completed);
  const reflectionCount = count(actions, ACTION_TYPE.devotional_reflection_saved);
  const perfectTriviaCount = count(actions, ACTION_TYPE.trivia_chapter_completed, (label) => {
    const score = getTriviaScoreFromLabel(label);
    return score?.perfect === true;
  });
  const perfectScrambledCount = count(actions, ACTION_TYPE.scrambled_chapter_completed, (label) => {
    const score = getTriviaScoreFromLabel(label);
    return score?.perfect === true;
  });
  const levelBonusCount = Math.max(0, level - 1);

  return (
    fullChapterCount * DIAMOND_REWARDS.fullChapter +
    fullBookCount * DIAMOND_REWARDS.fullBook +
    reflectionCount * DIAMOND_REWARDS.reflection +
    perfectTriviaCount * DIAMOND_REWARDS.perfectTrivia +
    perfectScrambledCount * DIAMOND_REWARDS.perfectScrambled +
    levelBonusCount * DIAMOND_REWARDS.levelUp
  );
}
