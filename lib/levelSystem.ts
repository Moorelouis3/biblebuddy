import type { ActionType } from "./actionTypes";
import { TASK_XP } from "./progressionRewards";

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
  user_signup: 25,
  user_login: 5,
  chapter_completed: TASK_XP.reading,
  book_completed: 250,
  devotional_day_started: 5,
  devotional_day_viewed: 1,
  devotional_day_completed: TASK_XP.intro,
  devotional_reflection_saved: TASK_XP.reflection,
  reading_plan_chapter_completed: TASK_XP.reading,
  bible_in_one_year_day_viewed: 3,
  bible_in_one_year_reading_completed: 25,
  bible_in_one_year_trivia_completed: 20,
  bible_in_one_year_reflection_completed: 20,
  /**
   * Deliberately 0, and listed rather than left out.
   *
   * This fires 2,108 times in master_actions and scored nothing because it was
   * simply absent from this table - which reads as an oversight. It is not: the
   * three *_completed rows above already pay 65 for a finished Bible in One
   * Year day, so weighting the wrapper event as well would pay twice for the
   * same day's reading. The key is here with an explicit 0 so the next person
   * does not "fix" the gap.
   */
  bible_in_one_year_day_completed: 0,
  chapter_notes_viewed: 0,
  chapter_notes_reviewed: TASK_XP.notes,
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
  trivia_question_correct: 5,
  // 1,625 finished trivia chapters paid nothing before 2026-11-10. Scored once
  // per chapter via UNIQUE_PER_LABEL in lib/pointsEngine.ts.
  trivia_chapter_completed: 15,
  scrambled_word_answered: 5,
  // Same gap as above: 608 finished scrambled chapters paid nothing.
  scrambled_chapter_completed: 10,
  // A finished Bible Memory practice session (2026-11-12). Repeatable, so it is
  // capped at two a day in lib/pointsEngine.ts rather than scored once.
  bible_memory_session_completed: 10,
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
  bible_buddy_tv_video_started: 10,
  bible_topic_lesson_completed: 20,
  louis_daily_task_bonus: TASK_XP.chapterBonus,
  referral_signup_reward: 0,
  badge_earned: 0,
};

export const SOCIAL_POINT_WEIGHTS = {
  groupPostCreated: 5,
  groupCommentCreated: 3,
  groupLikeGiven: 1,
  likeReceived: 2,
} as const;

/**
 * Twenty levels, re-cut on 2026-11-10 (docs/LEVELS_REVIEW_2026-11-10.md).
 *
 * This replaced a 50-level ladder whose thresholds had been rebalanced upward
 * and never checked against reality: 6,321 of 6,630 users sat at Level 1, the
 * highest score anybody had reached was 30,727, and Level 21 began at 40,200 -
 * so the top thirty levels were not merely unreached, they were unreachable.
 *
 * Three anchors set this curve:
 *
 *  1. Level 2 is one chapter. chapter_completed is 25 and user_signup is 25, so
 *     50 means the first chapter you read moves you off Level 1. The old
 *     threshold was 250 - ten chapters - which is the whole reason 95% of
 *     accounts never moved.
 *  2. Level 20 is a Bible's worth of study. 1,189 chapters at 25 points is
 *     29,725, rounded to 30,000. A full Bible in One Year run (365 days at 65)
 *     is 23,725, which lands on Level 19.
 *  3. The gap grows to 4,000 and then flattens. The last three levels cost
 *     about two months of daily study each, so the top is a finish line rather
 *     than an asymptote.
 *
 * Measured outcome of the re-cut, over 7,195 users: above Level 1 goes from 309
 * to 1,193, 1,153 users rise and none falls (the level floor below catches the
 * five who otherwise would).
 *
 * The names and both copy lines are the originals from the 50-level file,
 * unchanged, with one exception: Level 17 was "Teacher" and is now "Mentor",
 * because "Teacher" is Louis's own member_badge and the two would have sat
 * side by side meaning different things.
 */
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
    maxPoints: 149,
    levelName: "Explorer",
    identityText: "Beginning to engage and discover more of the Bible.",
    encouragementText: "Keep exploring. Clarity grows with each step you take.",
  },
  {
    level: 3,
    minPoints: 150,
    maxPoints: 299,
    levelName: "Listener",
    identityText: "Taking time to read and absorb God's Word.",
    encouragementText: "Slow down and listen. The Word shapes you as you stay with it.",
  },
  {
    level: 4,
    minPoints: 300,
    maxPoints: 499,
    levelName: "Reader",
    identityText: "Consistently reading and interacting with Scripture.",
    encouragementText: "Consistency matters. Keep building your rhythm in the Word.",
  },
  {
    level: 5,
    minPoints: 500,
    maxPoints: 799,
    levelName: "Learner",
    identityText: "Starting to understand and reflect on what is read.",
    encouragementText: "Understanding comes little by little. Stay curious and keep going.",
  },
  {
    level: 6,
    minPoints: 800,
    maxPoints: 1199,
    levelName: "Follower",
    identityText: "Applying what is learned and staying consistent.",
    encouragementText: "Keep practicing what you are learning. Growth shows up in repetition.",
  },
  {
    level: 7,
    minPoints: 1200,
    maxPoints: 1699,
    levelName: "Disciple",
    identityText: "Committed to growing daily in the Word.",
    encouragementText: "Daily faithfulness adds up. Your habits are shaping your walk.",
  },
  {
    level: 8,
    minPoints: 1700,
    maxPoints: 2299,
    levelName: "Rooted",
    identityText: "Building a strong foundation in Scripture.",
    encouragementText: "Roots grow quietly. Stay planted and keep showing up.",
  },
  {
    level: 9,
    minPoints: 2300,
    maxPoints: 3099,
    levelName: "Grounded",
    identityText: "Stable and consistent in Bible study habits.",
    encouragementText: "Stability is powerful. Keep building on what is already taking shape.",
  },
  {
    level: 10,
    minPoints: 3100,
    maxPoints: 4099,
    levelName: "Steady",
    identityText: "Showing discipline and regular engagement.",
    encouragementText: "Steady progress matters. Keep moving one faithful step at a time.",
  },
  {
    level: 11,
    minPoints: 4100,
    maxPoints: 5399,
    levelName: "Faithful",
    identityText: "Reliable in daily study and spiritual growth.",
    encouragementText: "Faithfulness is a strength. Keep returning to the Word each day.",
  },
  {
    level: 12,
    minPoints: 5400,
    maxPoints: 6999,
    levelName: "Equipped",
    identityText: "Gaining deeper understanding and context.",
    encouragementText: "You are not just reading more. You are understanding more.",
  },
  {
    level: 13,
    minPoints: 7000,
    maxPoints: 8999,
    levelName: "Watchful",
    identityText: "Aware, intentional, and growing in discernment.",
    encouragementText: "Discernment grows through attention. Stay alert and keep learning.",
  },
  {
    level: 14,
    minPoints: 9000,
    maxPoints: 11499,
    levelName: "Devoted",
    identityText: "Deep commitment to time in the Word.",
    encouragementText: "Devotion deepens over time. Keep giving God your attention.",
  },
  {
    level: 15,
    minPoints: 11500,
    maxPoints: 14499,
    levelName: "Servant",
    identityText: "Living out what is learned through action.",
    encouragementText: "What you are learning is showing up in how you live. Keep going.",
  },
  {
    level: 16,
    minPoints: 14500,
    maxPoints: 17999,
    levelName: "Builder",
    identityText: "Helping strengthen others through knowledge and example.",
    encouragementText: "You are building something steady. Your example matters.",
  },
  {
    level: 17,
    minPoints: 18000,
    maxPoints: 21999,
    levelName: "Mentor",
    identityText: "Able to explain and share understanding clearly.",
    encouragementText: "Clarity helps others grow too. Keep sharing what you have learned.",
  },
  {
    level: 18,
    minPoints: 22000,
    maxPoints: 25999,
    levelName: "Shepherd",
    identityText: "Guiding and supporting others in their journey.",
    encouragementText: "Leadership grows out of faithfulness. Keep caring well for others.",
  },
  {
    level: 19,
    minPoints: 26000,
    maxPoints: 29999,
    levelName: "Watchman",
    identityText: "Spiritually alert, mature, and grounded in truth.",
    encouragementText: "Stay watchful and grounded. Maturity is built through steady faithfulness.",
  },
  {
    level: 20,
    minPoints: 30000,
    maxPoints: null,
    levelName: "Ambassador",
    identityText: "Representing the Word with consistency, wisdom, and leadership.",
    encouragementText: "You have built something lasting. Keep representing the Word well.",
  },
];

export const MAX_LEVEL = LEVEL_DEFINITIONS.length;

/**
 * The four levels that get the louder celebration, and why these four.
 *
 * They are the levels where the ring changes colour family (see LEVEL_TIERS),
 * so a milestone is the one moment the user's visible identity changes rather
 * than an arbitrary round number. Every level still celebrates and still fires
 * confetti - these four just run longer and add the tier banner.
 */
export const MILESTONE_LEVELS = [5, 10, 15, 20] as const;

export function isMilestoneLevel(level: number): boolean {
  return (MILESTONE_LEVELS as readonly number[]).includes(level);
}

export type LevelTier = {
  tier: 1 | 2 | 3 | 4 | 5;
  tierName: string;
  romanNumeral: string;
  /** First and last level in the band, inclusive. */
  from: number;
  to: number;
  /**
   * The band's deepest step, used as the shield core behind the level number.
   *
   * Every one of these is 10:1 or better against white, so the number is plain
   * white on all 17 themes with no per-theme variant. That is the whole reason
   * the core is a fixed colour rather than a themed one.
   */
  coreColor: string;
};

/**
 * Five colour families: 4 / 5 / 5 / 5 / 1.
 *
 * The uneven banding is deliberate. The bands break at 5, 10, 15 and 20, which
 * are exactly the milestone levels, so the ring's colour changes on the same
 * level the big celebration fires. Level 20 is a band of one because
 * Ambassador is the summit and should not share its colour with anything.
 */
export const LEVEL_TIERS: LevelTier[] = [
  { tier: 1, tierName: "Stone", romanNumeral: "I", from: 1, to: 4, coreColor: "#334155" },
  { tier: 2, tierName: "Water", romanNumeral: "II", from: 5, to: 9, coreColor: "#15317A" },
  { tier: 3, tierName: "Olive", romanNumeral: "III", from: 10, to: 14, coreColor: "#0B4336" },
  { tier: 4, tierName: "Lamp", romanNumeral: "IV", from: 15, to: 19, coreColor: "#55250B" },
  { tier: 5, tierName: "Crown", romanNumeral: "V", from: 20, to: 20, coreColor: "#4C1D95" },
];

/**
 * Per-level ring colours, light and dark.
 *
 * `light` is for a white card (16 of the 17 themes) and `dark` for the Dark
 * theme's #0F1C2B card - this pair is what the profile ring uses, because it
 * sits directly on a themed surface. Minimum measured contrast is 3.05:1 on
 * the light card and 6.71:1 on the dark one, both clearing WCAG 1.4.11.
 *
 * `ringOnCore` is a third value, used only inside the level-up shield where
 * the ring sits on the tier's deep core instead of on the card, so the card's
 * colour is irrelevant to it.
 *
 * Twenty hues cannot each be 3:1 from their neighbours - the best within-band
 * separation reachable while keeping every colour legible is 1.26-1.55:1. So
 * colour carries the *tier* and geometry carries the step within it, and the
 * exact number is always also shown as text in LevelBadge. Never rely on the
 * ring colour alone.
 */
export type LevelRingColors = { light: string; dark: string; ringOnCore: string };

export const LEVEL_RING_COLORS: Record<number, LevelRingColors> = {
  1: { light: "#7C8CA3", dark: "#94A3B8", ringOnCore: "#94A3B8" },
  2: { light: "#64748B", dark: "#AEB9C7", ringOnCore: "#64748B" },
  3: { light: "#4A5768", dark: "#C6CFDA", ringOnCore: "#8494A9" },
  4: { light: "#334155", dark: "#DCE3EB", ringOnCore: "#A8B4C4" },
  5: { light: "#4E93EC", dark: "#60A5FA", ringOnCore: "#4E93EC" },
  6: { light: "#2F7FE8", dark: "#86B8F6", ringOnCore: "#5699EE" },
  7: { light: "#1F63CE", dark: "#A5C8FA", ringOnCore: "#7FB4F5" },
  8: { light: "#1A4BA8", dark: "#C0D9FC", ringOnCore: "#A5C8FA" },
  9: { light: "#15317A", dark: "#D9E6FD", ringOnCore: "#C3DAFC" },
  10: { light: "#19A67A", dark: "#2DB88A", ringOnCore: "#19A67A" },
  11: { light: "#0D8A66", dark: "#55D0A7", ringOnCore: "#2DB88A" },
  12: { light: "#0C7059", dark: "#7BDCBC", ringOnCore: "#55D0A7" },
  13: { light: "#0C5A47", dark: "#A3E7D2", ringOnCore: "#7BDCBC" },
  14: { light: "#0B4336", dark: "#C9F2E4", ringOnCore: "#A3E7D2" },
  15: { light: "#C08A08", dark: "#E0A82E", ringOnCore: "#E0A82E" },
  16: { light: "#AA6A0A", dark: "#EEBE55", ringOnCore: "#EFBF55" },
  17: { light: "#8E4A07", dark: "#F3CE7D", ringOnCore: "#F3CE7D" },
  18: { light: "#73350A", dark: "#F7DEA6", ringOnCore: "#F7DEA6" },
  19: { light: "#55250B", dark: "#FAEBC9", ringOnCore: "#FAEBC9" },
  // The Crown tier holds only Level 20, so its deepest step and its own level
  // colour are the same value. The ring inside the shield therefore uses a
  // lighter violet so it separates from the core it sits on - the only
  // hand-set ringOnCore in the table.
  20: { light: "#4C1D95", dark: "#C4B5FD", ringOnCore: "#A78BFA" },
};

export function clampLevel(level: number | null | undefined): number {
  const n = Math.floor(Number(level) || 1);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(MAX_LEVEL, n));
}

export function getTierForLevel(level: number): LevelTier {
  const safe = clampLevel(level);
  return LEVEL_TIERS.find((t) => safe >= t.from && safe <= t.to) ?? LEVEL_TIERS[0];
}

export function getRingColorsForLevel(level: number): LevelRingColors {
  return LEVEL_RING_COLORS[clampLevel(level)] ?? LEVEL_RING_COLORS[1];
}

/**
 * The step within a tier, 1-based, used to pick the ring geometry.
 *
 * Geometry, not colour, is what tells levels inside one band apart:
 * 1 = thin, 2 = thick, 3 = thick + inner hairline, 4 = + cap notch,
 * 5 = double ring.
 */
export function getTierStep(level: number): number {
  const tier = getTierForLevel(level);
  return clampLevel(level) - tier.from + 1;
}

export function getLevelDefinition(level: number): LevelDefinition {
  return LEVEL_DEFINITIONS[clampLevel(level) - 1];
}

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

export function getMinimumPointsForLevel(level: number) {
  const safeLevel = Math.max(1, Math.min(LEVEL_DEFINITIONS.length, Math.floor(level || 1)));
  return LEVEL_DEFINITIONS[safeLevel - 1]?.minPoints ?? 0;
}

/**
 * Levels never go down.
 *
 * The stored level acts as a floor, so a recompute can raise somebody and can
 * never lower them. This exists because an earlier rebalance briefly pushed
 * Louis from 12 to 8 (supabase/migrations/RESTORE_LEVEL_FLOOR_AFTER_XP_REBALANCE.sql),
 * and it is also what makes the 2026-11-10 re-cut safe: without it exactly five
 * users would have dropped one level.
 */
export function getLevelInfoWithLevelFloor(totalPoints: number, storedLevel?: number | null) {
  const minimumProtectedPoints =
    typeof storedLevel === "number" && storedLevel > 1
      ? getMinimumPointsForLevel(storedLevel)
      : 0;

  return getLevelInfoFromPoints(Math.max(totalPoints, minimumProtectedPoints));
}
