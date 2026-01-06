/**
 * Sync Notes Count Utility
 * 
 * Syncs the notes_created_count in profile_stats by counting from the notes table.
 * This is called on login and when a new day is detected.
 */

import { supabase } from "./supabaseClient";

/**
 * Sync notes count from notes table to profile_stats
 * @param userId - The user ID to sync notes for
 * @returns true if successful, false otherwise
 */
export async function syncNotesCount(userId: string): Promise<boolean> {
  try {
    // Count all notes for this user
    const { count, error: countError } = await supabase
      .from("notes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (countError) {
      console.error("[SYNC NOTES] Error counting notes:", countError);
      return false;
    }

    console.log(`[SYNC NOTES] Count from database: ${count}`);

    // Get existing username if available
    const { data: currentStats } = await supabase
      .from("profile_stats")
      .select("username, chapters_completed_count, people_learned_count, places_discovered_count, keywords_mastered_count")
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

    // Calculate total_actions as sum of all counts
    const totalActions = 
      (currentStats?.chapters_completed_count || 0) +
      (count || 0) +
      (currentStats?.people_learned_count || 0) +
      (currentStats?.places_discovered_count || 0) +
      (currentStats?.keywords_mastered_count || 0);

    // Update profile_stats with the count
    const { error: statsError } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          notes_created_count: count || 0,
          total_actions: totalActions,
          username: username,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (statsError) {
      console.error("[SYNC NOTES] Error updating profile_stats:", statsError);
      return false;
    }

    console.log(`[SYNC NOTES] Successfully updated notes_created_count to ${count}`);
    return true;
  } catch (err) {
    console.error("[SYNC NOTES] Error in syncNotesCount:", err);
    return false;
  }
}

/**
 * Check if we should sync notes count (new day detected)
 * Uses localStorage to track last sync date
 * @param userId - The user ID
 * @returns true if we should sync (new day or never synced), false otherwise
 */
export function shouldSyncNotesCount(userId: string): boolean {
  if (typeof window === "undefined") return false;

  const lastSyncKey = `notes_sync_date_${userId}`;
  const lastSyncDate = localStorage.getItem(lastSyncKey);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // If never synced or different day, sync
  if (!lastSyncDate || lastSyncDate !== today) {
    localStorage.setItem(lastSyncKey, today);
    return true;
  }

  return false;
}

