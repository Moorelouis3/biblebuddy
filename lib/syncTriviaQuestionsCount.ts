/**
 * Sync Trivia Questions Count Utility
 *
 * Syncs the trivia_questions_answered in profile_stats by counting from master_actions.
 * This is called on login and when a new day is detected.
 */

import { supabase } from "./supabaseClient";
import { ACTION_TYPE } from "./actionTypes";

/**
 * Sync trivia questions answered count from master_actions table to profile_stats
 * @param userId - The user ID to sync trivia questions for
 * @returns true if successful, false otherwise
 */
export async function syncTriviaQuestionsCount(userId: string): Promise<boolean> {
  try {
    // Count all trivia_question_answered actions for this user
    const { count, error: countError } = await supabase
      .from("master_actions")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.trivia_question_answered);

    if (countError) {
      console.error("[SYNC TRIVIA] Error counting trivia questions:", countError);
      return false;
    }

    console.log(`[SYNC TRIVIA] Count from database: ${count}`);

    // Update profile_stats
    const { error: updateError } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          trivia_questions_answered: count || 0,
        },
        { onConflict: "user_id" }
      );

    if (updateError) {
      console.error("[SYNC TRIVIA] Error updating profile_stats:", updateError);
      return false;
    }

    console.log(`[SYNC TRIVIA] Successfully synced trivia_questions_answered to ${count || 0}`);
    return true;
  } catch (err) {
    console.error("[SYNC TRIVIA] Unexpected error:", err);
    return false;
  }
}

/**
 * Check if we should sync trivia questions count (new day or first time)
 * @param userId - The user ID to check
 * @returns true if sync should be performed
 */
export function shouldSyncTriviaQuestionsCount(userId: string): boolean {
  const key = `last_trivia_sync_${userId}`;
  const lastSync = localStorage.getItem(key);
  const today = new Date().toDateString();

  if (lastSync !== today) {
    localStorage.setItem(key, today);
    return true;
  }

  return false;
}