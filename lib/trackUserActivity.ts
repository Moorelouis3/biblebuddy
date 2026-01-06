/**
 * Track User Activity Utility
 * 
 * Tracks when a user logs in or refreshes the app (opens a new page).
 * Updates last_active_date in profile_stats and logs to master_actions once per 24 hours.
 */

import { supabase } from "./supabaseClient";

/**
 * Track user activity (login/refresh)
 * Only logs once per 24 hours per user
 * @param userId - The user ID to track activity for
 * @returns true if activity was logged, false if it was already logged today
 */
export async function trackUserActivity(userId: string): Promise<boolean> {
  try {
    // Check if we've already logged activity for this user in this session
    const sessionKey = `activity_logged_${userId}`;
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    
    if (typeof window !== "undefined") {
      const lastLogged = localStorage.getItem(sessionKey);
      if (lastLogged === today) {
        // Already logged today in this session
        return false;
      }
    }

    // Get current profile stats to check last_active_date
    const { data: currentStats } = await supabase
      .from("profile_stats")
      .select("last_active_date, username")
      .eq("user_id", userId)
      .maybeSingle();

    const lastActiveDate = currentStats?.last_active_date;
    
    // Check if it's been 24 hours (different day) since last active
    const shouldLog = !lastActiveDate || lastActiveDate !== today;

    if (!shouldLog) {
      // Already logged today, mark in localStorage and return
      if (typeof window !== "undefined") {
        localStorage.setItem(sessionKey, today);
      }
      return false;
    }

    // Get username from auth
    const { data: { user } } = await supabase.auth.getUser();
    let username = currentStats?.username || "User";
    
    if (!currentStats?.username && user) {
      const meta: any = user.user_metadata || {};
      username =
        meta.firstName ||
        meta.first_name ||
        (user.email ? user.email.split("@")[0] : null) ||
        "User";
    }

    // Insert into master_actions (user_login has no action_label)
    const { error: actionError } = await supabase
      .from("master_actions")
      .insert({
        user_id: userId,
        username: username,
        action_type: "user_login",
      });

    if (actionError) {
      console.error("[TRACK_ACTIVITY] Error logging to master_actions:", actionError);
      // Continue anyway - we still want to update last_active_date
    }

    // Update profile_stats with last_active_date
    const { error: statsError } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          last_active_date: today,
          username: username,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (statsError) {
      console.error("[TRACK_ACTIVITY] Error updating profile_stats:", statsError);
      return false;
    }

    // Mark in localStorage that we've logged today
    if (typeof window !== "undefined") {
      localStorage.setItem(sessionKey, today);
    }

    console.log(`[TRACK_ACTIVITY] Successfully tracked activity for user ${userId} on ${today}`);
    return true;
  } catch (err) {
    console.error("[TRACK_ACTIVITY] Error in trackUserActivity:", err);
    return false;
  }
}

