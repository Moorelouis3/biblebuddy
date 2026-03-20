import type { ActionType } from "./actionTypes";

export type LevelDefinition = {
  level: number;
  minPoints: number;
  maxPoints: number | null;
  levelName: string;
  identityText: string;
  encouragementText: string;
};

export type WeightedPointBreakdown = {
  studyPoints: number;
  socialPoints: number;
  bonusPoints: number;
  totalPoints: number;
};

export const ACTION_POINT_WEIGHTS: Partial<Record<ActionType, number>> = {
  user_signup: 5,
  user_login: 1,
  chapter_completed: 10,
  book_completed: 30,
  devotional_day_started: 2,
  devotional_day_viewed: 1,
  devotional_day_completed: 9,
  reading_plan_chapter_completed: 9,
  bible_in_one_year_day_viewed: 3,
  chapter_notes_viewed: 2,
  note_started: 1,
  note_created: 7,
  verse_highlighted: 2,
  understand_verse_of_the_day: 3,
  person_viewed: 1,
  person_learned: 6,
  place_viewed: 1,
  place_discovered: 6,
  keyword_viewed: 1,
  keyword_mastered: 6,
  trivia_started: 1,
  trivia_question_answered: 3,
  feed_post_thought: 5,
  feed_post_prayer: 5,
  feed_post_prayer_request: 5,
  feed_post_photo: 5,
  feed_post_video: 5,
  feed_post_liked: 2,
  feed_post_commented: 4,
  feed_post_replied: 3,
  buddy_added: 5,
  series_week_started: 8,
  study_group_feed_viewed: 1,
  study_group_article_opened: 2,
  study_group_bible_study_card_opened: 2,
};

export const SOCIAL_POINT_WEIGHTS = {
  groupPostCreated: 5,
  groupCommentCreated: 3,
  groupLikeGiven: 1,
  likeReceived: 2,
} as const;

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  {
    level: 1,
    minPoints: 0,
    maxPoints: 99,
    levelName: "First Steps",
    identityText: "You're just getting started. Every habit begins here.",
    encouragementText: "Keep going. Consistency starts here.",
  },
  {
    level: 2,
    minPoints: 100,
    maxPoints: 299,
    levelName: "Getting Oriented",
    identityText: "You're learning how the Bible fits together.",
    encouragementText: "Keep going. You're building a real rhythm.",
  },
  {
    level: 3,
    minPoints: 300,
    maxPoints: 699,
    levelName: "Curious Reader",
    identityText: "You're asking good questions and digging deeper.",
    encouragementText: "Stay curious. Understanding grows here.",
  },
  {
    level: 4,
    minPoints: 700,
    maxPoints: 1499,
    levelName: "Scripture Explorer",
    identityText: "You're connecting people, places, and meaning.",
    encouragementText: "You're connecting the story. Keep exploring.",
  },
  {
    level: 5,
    minPoints: 1500,
    maxPoints: 2999,
    levelName: "Story Builder",
    identityText: "You're starting to see the Bible as one big story.",
    encouragementText: "You're building understanding, not just habits.",
  },
  {
    level: 6,
    minPoints: 3000,
    maxPoints: 4999,
    levelName: "Thoughtful Student",
    identityText: "You're studying with intention and reflection.",
    encouragementText: "Keep pressing in. This is meaningful growth.",
  },
  {
    level: 7,
    minPoints: 5000,
    maxPoints: 7999,
    levelName: "Pattern Seeker",
    identityText: "You notice themes, connections, and repetition.",
    encouragementText: "You're building something lasting.",
  },
  {
    level: 8,
    minPoints: 8000,
    maxPoints: 11999,
    levelName: "Deep Reader",
    identityText: "You're comfortable slowing down and going deep.",
    encouragementText: "Stay engaged. You're seeing the bigger picture.",
  },
  {
    level: 9,
    minPoints: 12000,
    maxPoints: 16999,
    levelName: "Wise Observer",
    identityText: "You understand context and purpose more clearly.",
    encouragementText: "Faithfulness matters. Keep walking forward.",
  },
  {
    level: 10,
    minPoints: 17000,
    maxPoints: null,
    levelName: "Rooted",
    identityText: "You've built a strong foundation in Scripture and community.",
    encouragementText: "Welcome home. You are a Bible Buddy.",
  },
];

export function calculateWeightedPoints(options: {
  actionTypes: string[];
  groupRootPostCount: number;
  groupCommentCount: number;
  groupLikeGivenCount: number;
  likesReceivedCount: number;
}) {
  const studyPoints = options.actionTypes.reduce((total, actionType) => {
    return total + (ACTION_POINT_WEIGHTS[actionType as ActionType] ?? 0);
  }, 0);

  const socialPoints =
    options.groupRootPostCount * SOCIAL_POINT_WEIGHTS.groupPostCreated +
    options.groupCommentCount * SOCIAL_POINT_WEIGHTS.groupCommentCreated +
    options.groupLikeGivenCount * SOCIAL_POINT_WEIGHTS.groupLikeGiven;

  const bonusPoints = options.likesReceivedCount * SOCIAL_POINT_WEIGHTS.likeReceived;
  const totalPoints = studyPoints + socialPoints + bonusPoints;

  return {
    studyPoints,
    socialPoints,
    bonusPoints,
    totalPoints,
  } satisfies WeightedPointBreakdown;
}

export function getLevelInfoFromPoints(totalPoints: number) {
  const currentLevel =
    [...LEVEL_DEFINITIONS].reverse().find((definition) => totalPoints >= definition.minPoints) ||
    LEVEL_DEFINITIONS[0];

  const nextLevel = LEVEL_DEFINITIONS.find((definition) => definition.level === currentLevel.level + 1) || null;
  const levelStart = currentLevel.minPoints;
  const levelEnd = currentLevel.maxPoints ?? currentLevel.minPoints;
  const span = nextLevel ? Math.max(nextLevel.minPoints - levelStart, 1) : 1;
  const progress = nextLevel ? totalPoints - levelStart : span;
  const progressPercent = nextLevel ? Math.min(100, Math.max(0, (progress / span) * 100)) : 100;

  return {
    ...currentLevel,
    totalPoints,
    levelStart,
    levelEnd,
    nextLevel,
    pointsToNextLevel: nextLevel ? Math.max(0, nextLevel.minPoints - totalPoints) : 0,
    progressPercent,
  };
}
