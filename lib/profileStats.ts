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
  username?: string;
  display_name?: string;
  hide_credit_info_modal?: boolean;
  is_paid?: boolean;
  daily_credits?: number;
}

export interface HeatMapDay {
  date: string; // YYYY-MM-DD
  actions: number;
}

/**
 * Get profile stats for a user (from profile_stats table)
 */
export async function getProfileStats(userId: string): Promise<ProfileStats | null> {
  const selectString = "*, hide_credit_info_modal, is_paid, daily_credits";
  const { data, error, status, statusText } = await supabase
    .from("profile_stats")
    .select(selectString)
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    console.error("[PROFILE] Error fetching profile stats:", {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
      status,
      statusText,
      selectString,
      data,
    });
    // If row is missing, try to create it (upsert)
    if (status === 406 || (error && (error.code === 'PGRST116' || error.code === '42703'))) {
      // 42703 = undefined_column (column missing)
      const { error: upsertError, data: upsertData } = await supabase
        .from("profile_stats")
        .upsert({ user_id: userId }, { onConflict: "user_id" })
        .select(selectString)
        .maybeSingle();
      if (upsertError) {
        console.error("[PROFILE] Error upserting profile stats:", {
          message: upsertError?.message,
          code: upsertError?.code,
          details: upsertError?.details,
          hint: upsertError?.hint,
          status,
          statusText,
          selectString,
        });
        // Fallback: return minimal default
        return { user_id: userId, is_paid: false, daily_credits: 5, hide_credit_info_modal: false } as any;
      }
      return upsertData as ProfileStats;
    }
    // Fallback: return minimal default
    return { user_id: userId, is_paid: false, daily_credits: 5, hide_credit_info_modal: false } as any;
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
 * Get heat map data (last 90 days) from master_actions table
 * Groups actions by date and counts actions per day
 */
export async function getHeatMapData(
  userId: string
): Promise<HeatMapDay[]> {
  try {
    // Get last 90 days of actions
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const { data, error } = await supabase
      .from("master_actions")
      .select("created_at")
      .eq("user_id", userId)
      .gte("created_at", ninetyDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[PROFILE] Error fetching heat map data:", error);
      return [];
    }

    // Group actions by date and count
    const actionsByDate = new Map<string, number>();
    data?.forEach((action) => {
      const date = new Date(action.created_at).toISOString().slice(0, 10); // YYYY-MM-DD
      actionsByDate.set(date, (actionsByDate.get(date) || 0) + 1);
    });

    // Generate array for last 90 days
    const heatMapData: HeatMapDay[] = [];
    const today = new Date();
    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().slice(0, 10);
      heatMapData.push({
        date: dateStr,
        actions: actionsByDate.get(dateStr) || 0,
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
// Includes all Bible study actions except user_login
const STREAK_ACTION_TYPES = [
  ACTION_TYPE.chapter_completed,
  ACTION_TYPE.book_completed,
  ACTION_TYPE.person_learned,
  ACTION_TYPE.place_discovered,
  ACTION_TYPE.keyword_mastered,
  ACTION_TYPE.note_created,
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

