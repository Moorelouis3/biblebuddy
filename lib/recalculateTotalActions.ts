/**
 * Recalculate Total Actions Utility
 * 
 * Recalculates total_actions in profile_stats as the sum of all action counts.
 * This is called on login/refresh to ensure total_actions is always accurate.
 */

import { supabase } from "./supabaseClient";

/**
 * Recalculate and update total_actions for a user
 * @param userId - The user ID to recalculate for
 * @returns true if successful, false otherwise
 */
export async function recalculateTotalActions(userId: string): Promise<boolean> {
  try {
    // Get all current counts from profile_stats
    const { data: currentStats, error: fetchError } = await supabase
      .from("profile_stats")
      .select("chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count, keywords_mastered_count, devotional_days_completed_count, trivia_correct_count")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("[RECALC_TOTAL] Error fetching profile_stats:", fetchError);
      return false;
    }

    if (!currentStats) {
      // No stats row exists yet, nothing to recalculate
      return true;
    }

    // Calculate total_actions as sum of all counts
    const totalActions = 
      (currentStats.chapters_completed_count || 0) +
      (currentStats.notes_created_count || 0) +
      (currentStats.people_learned_count || 0) +
      (currentStats.places_discovered_count || 0) +
      (currentStats.keywords_mastered_count || 0) +
      (currentStats.devotional_days_completed_count || 0) +
      (currentStats.trivia_correct_count || 0);

    // Update total_actions
    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        total_actions: totalActions,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("[RECALC_TOTAL] Error updating total_actions:", updateError);
      return false;
    }

    console.log(`[RECALC_TOTAL] Successfully recalculated total_actions to ${totalActions} for user ${userId}`);
    return true;
  } catch (err) {
    console.error("[RECALC_TOTAL] Error in recalculateTotalActions:", err);
    return false;
  }
}

