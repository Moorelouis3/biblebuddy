/**
 * Study View Limit Utilities
 * 
 * Handles daily limit checking and logging for free users
 */

import { supabase } from "./supabaseClient";
import { ACTION_TYPE } from "./actionTypes";

/**
 * Check if user can access a study view (Person, Place, or Keyword)
 * Returns { allowed: boolean, reason?: string }
 * 
 * NOTE: All restrictions removed - all users have unlimited access
 */
export async function checkStudyViewLimit(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  // Always allow access - no restrictions
  return { allowed: true };
}

/**
 * Log a study_view action to master_actions
 */
export async function logStudyView(
  userId: string,
  username: string | null,
  actionLabel: "person" | "place" | "keyword"
): Promise<boolean> {
  try {
    const actionType =
      actionLabel === "person"
        ? ACTION_TYPE.person_learned
        : actionLabel === "place"
          ? ACTION_TYPE.place_discovered
          : ACTION_TYPE.keyword_mastered;

    console.log("[STUDY_VIEW] Attempting study_view insert:", {
      user_id: userId,
      username: username ?? null,
      action_type: actionType,
      action_label: actionLabel,
    });

    const { data, error } = await supabase
      .from("master_actions")
      .insert({
        user_id: userId,
        username: username ?? null,
        action_type: actionType,
        action_label: actionLabel,
      })
      .select();

    if (error) {
      console.error("[STUDY_VIEW] Error inserting study_view:", error);
      console.error("[STUDY_VIEW] Error details:", JSON.stringify(error, null, 2));
      return false;
    }

    console.log("[STUDY_VIEW] study_view insert success:", data);
    return true;
  } catch (err) {
    console.error("[STUDY_VIEW] Unexpected error logging study view:", err);
    return false;
  }
}

