import type { SupabaseClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "./actionTypes";

export const STREAK_TIME_ZONE = "America/New_York";

const STREAK_ACTION_TYPES = new Set([
  ACTION_TYPE.user_login,
  ACTION_TYPE.chapter_completed,
  ACTION_TYPE.book_completed,
  ACTION_TYPE.bible_in_one_year_day_viewed,
  ACTION_TYPE.devotional_day_completed,
  ACTION_TYPE.devotional_day_started,
  ACTION_TYPE.devotional_day_viewed,
  ACTION_TYPE.person_learned,
  ACTION_TYPE.person_viewed,
  ACTION_TYPE.place_discovered,
  ACTION_TYPE.place_viewed,
  ACTION_TYPE.keyword_mastered,
  ACTION_TYPE.keyword_viewed,
  ACTION_TYPE.note_created,
  ACTION_TYPE.note_started,
  ACTION_TYPE.reading_plan_chapter_completed,
  ACTION_TYPE.scrambled_word_answered,
  ACTION_TYPE.trivia_question_answered,
  ACTION_TYPE.trivia_started,
  ACTION_TYPE.chapter_notes_viewed,
  ACTION_TYPE.verse_highlighted,
  ACTION_TYPE.understand_verse_of_the_day,
  ACTION_TYPE.feed_post_thought,
  ACTION_TYPE.feed_post_prayer,
  ACTION_TYPE.feed_post_prayer_request,
  ACTION_TYPE.feed_post_photo,
  ACTION_TYPE.feed_post_video,
  ACTION_TYPE.feed_post_liked,
  ACTION_TYPE.feed_post_commented,
  ACTION_TYPE.feed_post_replied,
  ACTION_TYPE.buddy_added,
  ACTION_TYPE.group_message_sent,
  ACTION_TYPE.series_week_started,
  ACTION_TYPE.study_group_feed_viewed,
  ACTION_TYPE.study_group_article_opened,
  ACTION_TYPE.study_group_bible_study_card_opened,
]);

export function getStreakDateKey(dateInput: Date | string) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: STREAK_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(date)
    .filter((part) => part.type !== "literal");

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value])) as Record<string, string>;
  return `${values.year}-${values.month}-${values.day}`;
}

export function calculateStreakFromCompletedDates(completedDates: Set<string>) {
  const todayKey = getStreakDateKey(new Date());
  let currentStreak = 0;
  let cursor = new Date(`${todayKey}T12:00:00Z`);
  let cursorKey = todayKey;

  while (completedDates.has(cursorKey)) {
    currentStreak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
    cursorKey = getStreakDateKey(cursor);
  }

  return currentStreak;
}

export async function getLiveStreakMapForUsers(
  supabase: SupabaseClient,
  userIds: string[],
  lookbackDays = 400,
) {
  const normalizedIds = Array.from(new Set(userIds.filter(Boolean)));
  if (normalizedIds.length === 0) return new Map<string, number>();

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - lookbackDays);
  const sinceIso = since.toISOString();

  const [actionsResponse, appLoginsResponse] = await Promise.all([
    supabase
      .from("master_actions")
      .select("user_id, created_at, action_type")
      .in("user_id", normalizedIds)
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false }),
    supabase
      .from("app_logins")
      .select("user_id, created_at")
      .in("user_id", normalizedIds)
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false }),
  ]);

  if (actionsResponse.error) {
    throw actionsResponse.error;
  }
  if (appLoginsResponse.error) {
    throw appLoginsResponse.error;
  }

  const completedDatesByUser = new Map<string, Set<string>>();
  const ensureUserSet = (userId: string) => {
    let existing = completedDatesByUser.get(userId);
    if (!existing) {
      existing = new Set<string>();
      completedDatesByUser.set(userId, existing);
    }
    return existing;
  };

  (actionsResponse.data || []).forEach((row) => {
    if (!row.user_id) return;
    if (!STREAK_ACTION_TYPES.has(row.action_type as typeof ACTION_TYPE[keyof typeof ACTION_TYPE])) return;
    ensureUserSet(row.user_id).add(getStreakDateKey(row.created_at));
  });

  (appLoginsResponse.data || []).forEach((row) => {
    if (!row.user_id) return;
    ensureUserSet(row.user_id).add(getStreakDateKey(row.created_at));
  });

  const streakMap = new Map<string, number>();
  normalizedIds.forEach((userId) => {
    streakMap.set(userId, calculateStreakFromCompletedDates(completedDatesByUser.get(userId) || new Set<string>()));
  });

  return streakMap;
}
