/**
 * Profile Stats Utilities
 * 
 * Functions for reading profile stats and calculating streaks/heat map data
 */

import { supabase } from "./supabaseClient";
import { ACTION_TYPE } from "./actionTypes";

export interface ProfileStats {
  total_actions: number;
  chapters_completed_count: number;
  notes_created_count: number;
  people_learned_count: number;
  places_discovered_count: number;
  keywords_mastered_count: number;
  trivia_questions_answered: number;
  last_active_date: string | null;
  current_streak: number;
  verse_of_the_day_shown?: string | null;
  username?: string;
  display_name?: string;
  hide_credit_info_modal?: boolean;
  is_paid?: boolean;
  member_badge?: string | null;
  daily_credits?: number;
  last_seen_update_version?: string | null;
  daily_recommendation_shown?: string | null;
  level_1_skipped_date?: string | null;
  bio?: string | null;
  location?: string | null;
  profile_image_url?: string | null;
  last_active_at?: string | null;
  profile_is_public?: boolean;
}

export interface HeatMapDay {
  date: string; // YYYY-MM-DD
  loginCount: number;
  meaningfulCount: number;
  level: 0 | 1 | 2;
  actions: number;
}

const NON_STREAK_ACTION_TYPES = new Set([
  ACTION_TYPE.user_signup,
]);

function isMeaningfulActionType(actionType: string): boolean {
  return !NON_STREAK_ACTION_TYPES.has(actionType as typeof ACTION_TYPE.user_signup) && actionType !== ACTION_TYPE.user_login;
}

/**
 * Get profile stats for a user (from profile_stats table)
 */
export async function getProfileStats(userId: string): Promise<ProfileStats | null> {
  const { data, error } = await supabase
    .from("profile_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[PROFILE] Error fetching profile stats:", error);
    return { user_id: userId, is_paid: false, daily_credits: 5, hide_credit_info_modal: false } as any;
  }

  if (!data) {
    // No row yet — create one
    const { data: newData, error: upsertError } = await supabase
      .from("profile_stats")
      .upsert({ user_id: userId }, { onConflict: "user_id" })
      .select("*")
      .maybeSingle();
    if (upsertError) {
      console.error("[PROFILE] Error creating profile stats:", upsertError);
      return { user_id: userId, is_paid: false, daily_credits: 5, hide_credit_info_modal: false } as any;
    }
    return newData as ProfileStats;
  }

  return data as ProfileStats;
}

/**
 * Get only the username for a user (from profile_stats table)
 */
export async function getUsername(userId: string): Promise<{ username: string } | null> {
  const { data, error } = await supabase
    .from("profile_stats")
    .select("username")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("[PROFILE] Error fetching username:", error);
    return null;
  }

  return data;
}

/**
 * Get heat map data (last 364 days) from master_actions table.
 * Level 1 means the user logged in that day.
 * Level 2 means the user completed at least one meaningful action that day.
 */
export async function getHeatMapData(
  userId: string
): Promise<HeatMapDay[]> {
  try {
    const daysToShow = 182;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - (daysToShow - 1));

    const { data, error } = await supabase
      .from("master_actions")
      .select("created_at, action_type")
      .eq("user_id", userId)
      .gte("created_at", daysAgo.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[PROFILE] Error fetching heat map data:", error);
      return [];
    }

    const actionsByDate = new Map<
      string,
      { actions: number; loginCount: number; meaningfulCount: number }
    >();
    data?.forEach((action) => {
      const date = new Date(action.created_at).toISOString().slice(0, 10); // YYYY-MM-DD
      const current = actionsByDate.get(date) || {
        actions: 0,
        loginCount: 0,
        meaningfulCount: 0,
      };
      current.actions += 1;
      if (action.action_type === ACTION_TYPE.user_login) {
        current.loginCount += 1;
      }
      if (isMeaningfulActionType(action.action_type)) {
        current.meaningfulCount += 1;
      }
      actionsByDate.set(date, current);
    });

    // Generate array for the last 364 days
    const heatMapData: HeatMapDay[] = [];
    const today = new Date();
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().slice(0, 10);
      const stats = actionsByDate.get(dateStr) || {
        actions: 0,
        loginCount: 0,
        meaningfulCount: 0,
      };
      const level: 0 | 1 | 2 =
        stats.meaningfulCount > 0 ? 2 : stats.loginCount > 0 ? 1 : 0;
      heatMapData.push({
        date: dateStr,
        loginCount: stats.loginCount,
        meaningfulCount: stats.meaningfulCount,
        level,
        actions: stats.actions,
      });
    }

    return heatMapData;
  } catch (err) {
    console.error("[PROFILE] Error in getHeatMapData:", err);
    return [];
  }
}

/**
 * Calculate current streak from master_actions table
 * Returns streak data including last 7 days
 * 
 * Streak Definition: A user earns a streak for a day if they perform
 * AT LEAST ONE meaningful Bible action that day.
 * 
 * Valid streak-triggering actions:
 * - chapter_completed
 * - book_completed
 * - person_learned
 * - place_discovered
 * - keyword_mastered
 * 
 * NOT streak-triggering:
 * - user_login
 */
export interface StreakData {
  currentStreak: number;
  last7Days: Array<{ date: string; completed: boolean }>;
}

// Valid action types that count toward streak
// Logging in counts as an active day, as do all Bible study actions
const STREAK_ACTION_TYPES = [
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
];

export async function calculateStreakFromActions(
  userId: string
): Promise<StreakData> {
  try {
    console.log(`[STREAK] Fetching actions for user_id: ${userId}`);
    
    // Get all actions EXCEPT user_login (filtering for valid streak actions)
    const { data, error } = await supabase
      .from("master_actions")
      .select("created_at, action_type")
      .eq("user_id", userId)
      .in("action_type", STREAK_ACTION_TYPES)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[STREAK] Error fetching actions for streak:", error);
      return { currentStreak: 0, last7Days: [] };
    }

    console.log(`[STREAK] Found ${data?.length || 0} valid streak actions`);

    // Helper function to get YYYY-MM-DD from a Date in local timezone
    const getLocalDateString = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Convert to dates (YYYY-MM-DD) using LOCAL timezone and deduplicate
    // One valid action per day = streak day (no minimum count needed)
    const completedDates = new Set<string>();
    data?.forEach((action) => {
      // Parse as UTC timestamp, then convert to user's local date
      const actionDate = new Date(action.created_at);
      const dateStr = getLocalDateString(actionDate);
      completedDates.add(dateStr);
      console.log(`[STREAK] Action on ${dateStr} (${action.action_type}) - UTC was: ${action.created_at}`);
    });

    console.log(`[STREAK] Active dates:`, Array.from(completedDates).sort());

    // Calculate current streak (walk backward from today in LOCAL timezone)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = getLocalDateString(today);
    console.log(`[STREAK] Today (local): ${todayStr}`);

    let currentStreak = 0;
    let checkDate = new Date(today);
    let checkDateStr = todayStr;

    // Walk backward day by day (using local dates)
    while (true) {
      if (completedDates.has(checkDateStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
        checkDateStr = getLocalDateString(checkDate);
      } else {
        break; // Streak breaks
      }
    }

    // Generate last 7 days (using local dates)
    const last7Days: Array<{ date: string; completed: boolean }> = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getLocalDateString(date);
      const isCompleted = completedDates.has(dateStr);
      last7Days.push({
        date: dateStr,
        completed: isCompleted,
      });
      console.log(`[STREAK] Day ${dateStr}: ${isCompleted ? '✓ ACTIVE' : '✗ inactive'}`);
    }

    console.log(`[STREAK] Current streak: ${currentStreak} days`);
    console.log(`[STREAK] Last 7 days:`, last7Days.map(d => `${d.date}: ${d.completed ? '✓' : '✗'}`).join(', '));

    return {
      currentStreak,
      last7Days,
    };
  } catch (err) {
    console.error("[PROFILE] Error calculating streak:", err);
    return { currentStreak: 0, last7Days: [] };
  }
}

/**
 * Get day of week abbreviation (S, M, T, W, T, F, S)
 */
export function getDayAbbr(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  const day = date.getDay();
  const abbrs = ["S", "M", "T", "W", "T", "F", "S"];
  return abbrs[day];
}

