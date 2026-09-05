// lib/pointsEngine.ts
// The one place Bible Buddy points are computed (relaunched 2026-09-05).
//
// Design rule: DERIVE, DON'T STORE. Points are always a weighted sum over
// master_actions plus the group tables. profile_stats.current_level (and
// total_points where present) are caches of this computation, never a
// hand-maintained balance. Change a weight here and everyone re-scores on
// the next recompute.
//
// Anti-farming, the reason the old system got hard to control:
//  - UNIQUE actions score once per distinct action_label (re-reading the
//    same chapter or re-completing the same day never scores twice).
//  - REPEATABLE actions have a per-day cap.
//  - Social points (group posts / comments / likes) are capped per day too.

import { ACTION_POINT_WEIGHTS, SOCIAL_POINT_WEIGHTS, calculateWeightedPoints } from "./levelSystem";
import type { ActionType } from "./actionTypes";

export type PointsActionRow = {
  action_type: string | null;
  action_label: string | null;
  created_at: string | null;
};

export type PointsSocialRow = {
  created_at: string | null;
};

// Score once per distinct action_label, ever. These are "completion" facts:
// finishing Genesis 3 twice is still one completed chapter.
const UNIQUE_PER_LABEL = new Set<string>([
  "chapter_completed",
  "book_completed",
  "chapter_notes_reviewed",
  "devotional_day_completed",
  "devotional_day_started",
  "devotional_reflection_saved",
  "reading_plan_chapter_completed",
  "bible_in_one_year_reading_completed",
  "bible_in_one_year_trivia_completed",
  "bible_in_one_year_reflection_completed",
  "bible_topic_lesson_completed",
  "person_learned",
  "place_discovered",
  "keyword_mastered",
  "series_week_started",
  "user_signup",
]);

// Repeatable actions with a daily ceiling (count per UTC day).
const DAILY_CAPS: Partial<Record<string, number>> = {
  user_login: 1,
  trivia_question_correct: 10,
  scrambled_word_answered: 10,
  verse_highlighted: 10,
  note_created: 5,
  note_started: 5,
  understand_verse_of_the_day: 1,
  bible_in_one_year_day_viewed: 3,
  devotional_day_viewed: 5,
  person_viewed: 10,
  place_viewed: 10,
  keyword_viewed: 10,
  feed_post_thought: 3,
  feed_post_prayer: 3,
  feed_post_prayer_request: 3,
  feed_post_photo: 3,
  feed_post_video: 3,
  feed_post_liked: 10,
  feed_post_commented: 5,
  feed_post_replied: 5,
  buddy_added: 5,
  bible_buddy_tv_video_started: 3,
  louis_daily_task_bonus: 3,
  study_group_feed_viewed: 1,
  study_group_article_opened: 3,
  study_group_bible_study_card_opened: 3,
};

// Social activity daily ceilings (rows per UTC day that score).
const SOCIAL_DAILY_CAPS = {
  groupPosts: 3,
  groupComments: 5,
  groupLikesGiven: 10,
  likesReceived: 20,
} as const;

function dayKey(createdAt: string | null) {
  return (createdAt || "").slice(0, 10) || "unknown";
}

// Count rows while honoring a per-day cap.
function countWithDailyCap(rows: PointsSocialRow[], capPerDay: number) {
  const byDay = new Map<string, number>();
  let counted = 0;
  for (const row of rows) {
    const key = dayKey(row.created_at);
    const used = byDay.get(key) ?? 0;
    if (used >= capPerDay) continue;
    byDay.set(key, used + 1);
    counted += 1;
  }
  return counted;
}

export type ComputedPoints = {
  studyPoints: number;
  socialPoints: number;
  bonusPoints: number;
  totalPoints: number;
  scoredActionCount: number;
};

export function computePointsFromActivity(options: {
  actions: PointsActionRow[];
  groupRootPosts: PointsSocialRow[];
  groupComments: PointsSocialRow[];
  groupLikesGiven: PointsSocialRow[];
  likesReceived: PointsSocialRow[];
  streakBonusPoints?: number;
}): ComputedPoints {
  const seenUnique = new Set<string>();
  const dailyCounts = new Map<string, number>();
  const scoredActionTypes: string[] = [];

  for (const action of options.actions) {
    const type = action.action_type || "";
    if (!type) continue;
    const weight = ACTION_POINT_WEIGHTS[type as ActionType] ?? 0;
    if (weight <= 0) continue;

    if (UNIQUE_PER_LABEL.has(type)) {
      const uniqueKey = `${type}:${(action.action_label || "").trim().toLowerCase()}`;
      if (seenUnique.has(uniqueKey)) continue;
      seenUnique.add(uniqueKey);
    } else {
      const cap = DAILY_CAPS[type];
      if (cap !== undefined) {
        const capKey = `${type}:${dayKey(action.created_at)}`;
        const used = dailyCounts.get(capKey) ?? 0;
        if (used >= cap) continue;
        dailyCounts.set(capKey, used + 1);
      }
    }

    scoredActionTypes.push(type);
  }

  const groupRootPostCount = countWithDailyCap(options.groupRootPosts, SOCIAL_DAILY_CAPS.groupPosts);
  const groupCommentCount = countWithDailyCap(options.groupComments, SOCIAL_DAILY_CAPS.groupComments);
  const groupLikeGivenCount = countWithDailyCap(options.groupLikesGiven, SOCIAL_DAILY_CAPS.groupLikesGiven);
  const likesReceivedCount = countWithDailyCap(options.likesReceived, SOCIAL_DAILY_CAPS.likesReceived);

  const breakdown = calculateWeightedPoints({
    actionTypes: scoredActionTypes,
    groupRootPostCount,
    groupCommentCount,
    groupLikeGivenCount,
    likesReceivedCount,
    streakBonusPoints: options.streakBonusPoints ?? 0,
  });

  return {
    ...breakdown,
    scoredActionCount: scoredActionTypes.length,
  };
}

// Streak bonus: +5 points per full week of the current streak, capped at
// +50, folded into the bonus bucket. Small enough not to dominate, real
// enough to make protecting a streak feel worth it.
export function streakBonusPointsFor(currentStreak: number | null | undefined) {
  const weeks = Math.floor(Math.max(0, currentStreak ?? 0) / 7);
  return Math.min(50, weeks * 5);
}

export { SOCIAL_POINT_WEIGHTS };
