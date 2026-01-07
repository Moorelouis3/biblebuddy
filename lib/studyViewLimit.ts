/**
 * Study View Limit Utilities
 * 
 * Handles daily limit checking and logging for free users
 */

import { supabase } from "./supabaseClient";

/**
 * Check if user can access a study view (Person, Place, or Keyword)
 * Returns { allowed: boolean, reason?: string }
 */
export async function checkStudyViewLimit(userId: string): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  try {
    // 1. Get membership status
    const { data: profileStats, error: profileError } = await supabase
      .from("profile_stats")
      .select("membership_status")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileError) {
      console.error("[STUDY_VIEW] Error fetching membership status:", profileError);
      // Default to allowing access if we can't check
      return { allowed: true };
    }

    const membershipStatus = profileStats?.membership_status || "free";

    // 2. If pro, allow immediately (will still log for analytics)
    if (membershipStatus === "pro") {
      return { allowed: true };
    }

    // 3. If free, check daily limit
    // Get start of today in the user's local timezone (local midnight)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfTodayISO = startOfToday.toISOString();

    // Count study_view actions today
    const { count, error: countError } = await supabase
      .from("master_actions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("action_type", "study_view")
      .gte("created_at", startOfTodayISO);

    if (countError) {
      console.error("[STUDY_VIEW] Error counting study views:", countError);
      // Default to allowing access if we can't check
      return { allowed: true };
    }

    const todayCount = count ?? 0;

    // 4. Check if limit reached
    if (todayCount >= 3) {
      return {
        allowed: false,
        reason: "You've reached your daily limit of 3 deep study views. Upgrade to Pro for unlimited access.",
      };
    }

    // 5. Within limit - allow and log
    return { allowed: true };
  } catch (err) {
    console.error("[STUDY_VIEW] Error checking study view limit:", err);
    // Default to allowing access on error
    return { allowed: true };
  }
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
    console.log("[STUDY_VIEW] Attempting study_view insert:", {
      user_id: userId,
      username: username ?? null,
      action_type: "study_view",
      action_label: actionLabel,
    });

    const { data, error } = await supabase
      .from("master_actions")
      .insert({
        user_id: userId,
        username: username ?? null,
        action_type: "study_view",
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

