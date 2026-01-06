/**
 * Sync Chapters Count Utility
 * 
 * Syncs the chapters_completed_count in profile_stats by counting from the completed_chapters table.
 * This is called on login and when a new day is detected.
 */

import { supabase } from "./supabaseClient";

/**
 * Sync chapters count from completed_chapters table to profile_stats
 * @param userId - The user ID to sync chapters for
 * @returns true if successful, false otherwise
 */
export async function syncChaptersCount(userId: string): Promise<boolean> {
  try {
    // Count all completed chapters for this user
    const { count, error: countError } = await supabase
      .from("completed_chapters")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) {
      console.error("[SYNC CHAPTERS] Error counting completed_chapters:", countError);
      return false;
    }

    console.log(`[SYNC CHAPTERS] Count from database: ${count}`);

    // Get existing username if available
    const { data: currentStats } = await supabase
      .from("profile_stats")
      .select("username")
      .eq("user_id", userId)
      .maybeSingle();

    // Get username from auth if not in stats
    let username = currentStats?.username || "User";
    if (!currentStats?.username) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const meta: any = user.user_metadata || {};
        username =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "User";
      }
    }

    // Update profile_stats with the count
    const { error: statsError } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          chapters_completed_count: count || 0,
          username: username,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (statsError) {
      console.error("[SYNC CHAPTERS] Error updating profile_stats:", statsError);
      return false;
    }

    console.log(`[SYNC CHAPTERS] Successfully updated chapters_completed_count to ${count}`);
    return true;
  } catch (err) {
    console.error("[SYNC CHAPTERS] Error in syncChaptersCount:", err);
    return false;
  }
}

/**
 * Check if we should sync chapters count (new day detected)
 * Uses localStorage to track last sync date
 * @param userId - The user ID
 * @returns true if we should sync (new day or never synced), false otherwise
 */
export function shouldSyncChaptersCount(userId: string): boolean {
  if (typeof window === "undefined") return false;

  const lastSyncKey = `chapters_sync_date_${userId}`;
  const lastSyncDate = localStorage.getItem(lastSyncKey);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // If never synced or different day, sync
  if (!lastSyncDate || lastSyncDate !== today) {
    localStorage.setItem(lastSyncKey, today);
    return true;
  }

  return false;
}

