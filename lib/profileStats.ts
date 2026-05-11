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
  has_fire_streak_badge?: boolean;
  fire_streak_awarded_at?: string | null;
  fire_streak_last_checked_at?: string | null;
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

type ActivitySummaryByDate = Map<
  string,
  { actions: number; loginCount: number; meaningfulCount: number }
>;

function isMeaningfulActionType(actionType: string): boolean {
  return !NON_STREAK_ACTION_TYPES.has(actionType as typeof ACTION_TYPE.user_signup) && actionType !== ACTION_TYPE.user_login;
}

function getLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftStreakDateKey(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0);
  date.setDate(date.getDate() + days);
  return getLocalDateString(date);
}

function calculateAnchoredCurrentStreak(completedDates: Set<string>) {
  const todayKey = getLocalDateString(new Date());
  const yesterdayKey = shiftStreakDateKey(todayKey, -1);

  let cursorKey: string | null = null;
  if (completedDates.has(todayKey)) {
    cursorKey = todayKey;
  } else if (completedDates.has(yesterdayKey)) {
    cursorKey = yesterdayKey;
  } else {
    return 0;
  }

  let currentStreak = 0;
  while (cursorKey && completedDates.has(cursorKey)) {
    currentStreak += 1;
    cursorKey = shiftStreakDateKey(cursorKey, -1);
  }

  return currentStreak;
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

  try {
    const { count: triviaQuestionsAnsweredCount, error: triviaCountError } = await supabase
      .from("trivia_question_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId);

    if (!triviaCountError && typeof triviaQuestionsAnsweredCount === "number") {
      const merged = {
        ...data,
        trivia_questions_answered: triviaQuestionsAnsweredCount,
      } as ProfileStats;

      if ((data.trivia_questions_answered ?? 0) !== triviaQuestionsAnsweredCount) {
        void supabase
          .from("profile_stats")
          .update({ trivia_questions_answered: triviaQuestionsAnsweredCount })
          .eq("user_id", userId);
      }

      return merged;
    }
  } catch (countError) {
    console.error("[PROFILE] Error syncing trivia question count:", countError);
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

    const { byDate: actionsByDate } = await getUserActivitySummary(userId, daysAgo.toISOString());

    // Generate array for the last 364 days
    const heatMapData: HeatMapDay[] = [];
    const today = new Date();
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getLocalDateString(date);
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
 * Streak Definition: a user earns a streak day by opening/logging in to
 * Bible Buddy that day. Bible Study actions grow levels and points.
 */
export interface StreakData {
  currentStreak: number;
  last7Days: Array<{ date: string; completed: boolean }>;
}

async function getUserActivitySummary(
  userId: string,
  sinceIso: string,
): Promise<{
  byDate: ActivitySummaryByDate;
  completedDates: Set<string>;
}> {
  const pageSize = 1000;
  const actions: Array<{ created_at: string; action_type: string }> = [];
  const appLogins: Array<{ created_at: string }> = [];

  let from = 0;
  while (true) {
    const actionsResponse = await supabase
      .from("master_actions")
      .select("created_at, action_type")
      .eq("user_id", userId)
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    const { data, error } = actionsResponse;
    if (error) {
      throw error;
    }

    const chunk = data || [];
    actions.push(...chunk);
    if (chunk.length < pageSize) {
      break;
    }
    from += pageSize;
  }

  from = 0;
  while (true) {
    const appLoginsResponse = await supabase
      .from("app_logins")
      .select("created_at")
      .eq("user_id", userId)
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: false })
      .range(from, from + pageSize - 1);

    const { data, error } = appLoginsResponse;
    if (error) {
      console.error("[PROFILE] Error fetching app_logins:", error);
      break;
    }

    const chunk = data || [];
    appLogins.push(...chunk);
    if (chunk.length < pageSize) {
      break;
    }
    from += pageSize;
  }

  const byDate: ActivitySummaryByDate = new Map();
  const completedDates = new Set<string>();

  function ensureDay(dateStr: string) {
    const current = byDate.get(dateStr) || {
      actions: 0,
      loginCount: 0,
      meaningfulCount: 0,
    };
    byDate.set(dateStr, current);
    return current;
  }

  actions.forEach((action) => {
    const dateStr = getLocalDateString(new Date(action.created_at));
    const current = ensureDay(dateStr);
    current.actions += 1;
    if (action.action_type === ACTION_TYPE.user_login) {
      current.loginCount += 1;
    }
    if (action.action_type === ACTION_TYPE.user_login) {
      completedDates.add(dateStr);
    }
    if (isMeaningfulActionType(action.action_type)) {
      current.meaningfulCount += 1;
    }
  });

  appLogins.forEach((login) => {
    const dateStr = getLocalDateString(new Date(login.created_at));
    const current = ensureDay(dateStr);
    current.actions += 1;
    current.loginCount += 1;
    completedDates.add(dateStr);
  });

  return { byDate, completedDates };
}

export async function calculateStreakFromActions(
  userId: string
): Promise<StreakData> {
  try {
    console.log(`[STREAK] Fetching actions for user_id: ${userId}`);

    const actionsResponse = await supabase
      .from("master_actions")
      .select("created_at, action_type")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.user_login)
      .order("created_at", { ascending: false });

    const { data, error } = actionsResponse;

    if (error) {
      console.error("[STREAK] Error fetching master_actions for streak:", error);
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = getLocalDateString(today);
    console.log(`[STREAK] Today (local): ${todayStr}`);

    const currentStreak = calculateAnchoredCurrentStreak(completedDates);

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

export async function getUnifiedHeatMapData(
  userId: string
): Promise<HeatMapDay[]> {
  try {
    const daysToShow = 182;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - (daysToShow - 1));
    const { byDate } = await getUserActivitySummary(userId, daysAgo.toISOString());

    const heatMapData: HeatMapDay[] = [];
    const today = new Date();
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getLocalDateString(date);
      const stats = byDate.get(dateStr) || {
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
    console.error("[PROFILE] Error in getUnifiedHeatMapData:", err);
    return [];
  }
}

export async function calculateUnifiedStreakFromActions(
  userId: string
): Promise<StreakData> {
  try {
    const lookback = new Date();
    lookback.setDate(lookback.getDate() - 400);
    const { completedDates } = await getUserActivitySummary(userId, lookback.toISOString());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentStreak = calculateAnchoredCurrentStreak(completedDates);

    const last7Days: Array<{ date: string; completed: boolean }> = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = getLocalDateString(date);
      last7Days.push({
        date: dateStr,
        completed: completedDates.has(dateStr),
      });
    }

    return {
      currentStreak,
      last7Days,
    };
  } catch (err) {
    console.error("[PROFILE] Error calculating unified streak:", err);
    return { currentStreak: 0, last7Days: [] };
  }
}

export async function syncCurrentStreakToProfileStats(
  userId: string
): Promise<StreakData> {
  if (typeof window !== "undefined") {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await fetch("/api/streak/current", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, timeZone }),
      });

      const payload = await response.json().catch(() => null);
      if (response.ok && payload?.streakData) {
        return payload.streakData as StreakData;
      }

      if (process.env.NODE_ENV !== "development") {
        console.warn("[STREAK] Server sync failed, falling back to local calculation.");
      } else if (payload?.error || payload?.message) {
        console.warn("[STREAK] Server sync failed, falling back to local calculation:", payload);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "development") {
        console.warn("[STREAK] Server sync request failed, falling back to local calculation.");
      } else {
        console.warn("[STREAK] Server sync request failed, falling back to local calculation:", error);
      }
    }
  }

  return calculateUnifiedStreakFromActions(userId);
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

