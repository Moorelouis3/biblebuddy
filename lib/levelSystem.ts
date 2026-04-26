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
  chapter_notes_viewed: 0,
  chapter_notes_reviewed: 2,
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
  trivia_started: 0,
  trivia_question_answered: 0,
  trivia_question_correct: 1,
  trivia_chapter_completed: 0,
  scrambled_word_answered: 1,
  scrambled_chapter_completed: 0,
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
  louis_daily_task_bonus: 10,
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
    maxPoints: 49,
    levelName: "Seeker",
    identityText: "Just getting started, exploring Scripture and the app.",
    encouragementText: "Every strong habit starts with one step. Keep showing up.",
  },
  {
    level: 2,
    minPoints: 50,
    maxPoints: 99,
    levelName: "Explorer",
    identityText: "Beginning to engage and discover more of the Bible.",
    encouragementText: "Keep exploring. Clarity grows with each step you take.",
  },
  {
    level: 3,
    minPoints: 100,
    maxPoints: 199,
    levelName: "Listener",
    identityText: "Taking time to read and absorb God's Word.",
    encouragementText: "Slow down and listen. The Word shapes you as you stay with it.",
  },
  {
    level: 4,
    minPoints: 200,
    maxPoints: 299,
    levelName: "Reader",
    identityText: "Consistently reading and interacting with Scripture.",
    encouragementText: "Consistency matters. Keep building your rhythm in the Word.",
  },
  {
    level: 5,
    minPoints: 300,
    maxPoints: 499,
    levelName: "Learner",
    identityText: "Starting to understand and reflect on what is read.",
    encouragementText: "Understanding comes little by little. Stay curious and keep going.",
  },
  {
    level: 6,
    minPoints: 500,
    maxPoints: 699,
    levelName: "Follower",
    identityText: "Applying what is learned and staying consistent.",
    encouragementText: "Keep practicing what you are learning. Growth shows up in repetition.",
  },
  {
    level: 7,
    minPoints: 700,
    maxPoints: 1099,
    levelName: "Disciple",
    identityText: "Committed to growing daily in the Word.",
    encouragementText: "Daily faithfulness adds up. Your habits are shaping your walk.",
  },
  {
    level: 8,
    minPoints: 1100,
    maxPoints: 1499,
    levelName: "Rooted",
    identityText: "Building a strong foundation in Scripture.",
    encouragementText: "Roots grow quietly. Stay planted and keep showing up.",
  },
  {
    level: 9,
    minPoints: 1500,
    maxPoints: 2199,
    levelName: "Grounded",
    identityText: "Stable and consistent in Bible study habits.",
    encouragementText: "Stability is powerful. Keep building on what is already taking shape.",
  },
  {
    level: 10,
    minPoints: 2200,
    maxPoints: 2999,
    levelName: "Steady",
    identityText: "Showing discipline and regular engagement.",
    encouragementText: "Steady progress matters. Keep moving one faithful step at a time.",
  },
  {
    level: 11,
    minPoints: 3000,
    maxPoints: 3999,
    levelName: "Faithful",
    identityText: "Reliable in daily study and spiritual growth.",
    encouragementText: "Faithfulness is a strength. Keep returning to the Word each day.",
  },
  {
    level: 12,
    minPoints: 4000,
    maxPoints: 4999,
    levelName: "Equipped",
    identityText: "Gaining deeper understanding and context.",
    encouragementText: "You are not just reading more. You are understanding more.",
  },
  {
    level: 13,
    minPoints: 5000,
    maxPoints: 6499,
    levelName: "Watchful",
    identityText: "Aware, intentional, and growing in discernment.",
    encouragementText: "Discernment grows through attention. Stay alert and keep learning.",
  },
  {
    level: 14,
    minPoints: 6500,
    maxPoints: 7999,
    levelName: "Devoted",
    identityText: "Deep commitment to time in the Word.",
    encouragementText: "Devotion deepens over time. Keep giving God your attention.",
  },
  {
    level: 15,
    minPoints: 8000,
    maxPoints: 9999,
    levelName: "Servant",
    identityText: "Living out what is learned through action.",
    encouragementText: "What you are learning is showing up in how you live. Keep going.",
  },
  {
    level: 16,
    minPoints: 10000,
    maxPoints: 11999,
    levelName: "Builder",
    identityText: "Helping strengthen others through knowledge and example.",
    encouragementText: "You are building something steady. Your example matters.",
  },
  {
    level: 17,
    minPoints: 12000,
    maxPoints: 14499,
    levelName: "Teacher",
    identityText: "Able to explain and share understanding clearly.",
    encouragementText: "Clarity helps others grow too. Keep sharing what you have learned.",
  },
  {
    level: 18,
    minPoints: 14500,
    maxPoints: 16999,
    levelName: "Shepherd",
    identityText: "Guiding and supporting others in their journey.",
    encouragementText: "Leadership grows out of faithfulness. Keep caring well for others.",
  },
  {
    level: 19,
    minPoints: 17000,
    maxPoints: 21999,
    levelName: "Watchman",
    identityText: "Spiritually alert, mature, and grounded in truth.",
    encouragementText: "Stay watchful and grounded. Maturity is built through steady faithfulness.",
  },
  {
    level: 20,
    minPoints: 22000,
    maxPoints: null,
    levelName: "Ambassador",
    identityText: "Representing the Word with consistency, wisdom, and leadership.",
    encouragementText: "You have built something lasting. Keep representing the Word well.",
  },
];

export function calculateWeightedPoints(options: {
  actionTypes: string[];
  groupRootPostCount: number;
  groupCommentCount: number;
  groupLikeGivenCount: number;
  likesReceivedCount: number;
  streakBonusPoints?: number;
  manualBonusPoints?: number;
}) {
  const studyPoints = options.actionTypes.reduce((total, actionType) => {
    return total + (ACTION_POINT_WEIGHTS[actionType as ActionType] ?? 0);
  }, 0);

  const socialPoints =
    options.groupRootPostCount * SOCIAL_POINT_WEIGHTS.groupPostCreated +
    options.groupCommentCount * SOCIAL_POINT_WEIGHTS.groupCommentCreated +
    options.groupLikeGivenCount * SOCIAL_POINT_WEIGHTS.groupLikeGiven;

  const bonusPoints =
    options.likesReceivedCount * SOCIAL_POINT_WEIGHTS.likeReceived +
    Math.max(0, options.streakBonusPoints ?? 0) +
    Math.max(0, options.manualBonusPoints ?? 0);
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
