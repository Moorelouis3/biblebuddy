/**
 * Action Recording System
 * 
 * Records user actions to master_actions table and updates profile_stats
 * 
 * ACTION FLOW:
 * 1. Insert action into master_actions
 * 2. Update profile_stats (increment counters, update last_active_date)
 */

import { supabase } from "./supabaseClient";

export type ActionType =
  | "user_login"
  | "chapter_completed"
  | "book_completed"
  | "note_created"
  | "person_learned"
  | "place_discovered"
  | "keyword_mastered";

/**
 * Log an action to master_actions table ONLY
 * 
 * This is the SINGLE source of truth for master_actions inserts.
 * All pages should use this function instead of direct inserts.
 * 
 * Profile stats updates should be handled separately by each page.
 * 
 * @param userId - The user ID
 * @param actionType - The type of action
 * @param actionLabel - Optional human-readable label (e.g., "Genesis 1", "Bethlehem", "David")
 * @param username - Optional username (will be fetched from auth if not provided)
 */
export async function logActionToMasterActions(
  userId: string,
  actionType: ActionType,
  actionLabel?: string | null,
  username?: string | null
): Promise<void> {
  try {
    // Get username if not provided
    let finalUsername = username;
    if (!finalUsername) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const meta: any = user.user_metadata || {};
        finalUsername =
          meta.firstName ||
          meta.first_name ||
          (user.email ? user.email.split("@")[0] : null) ||
          "User";
      } else {
        finalUsername = "User";
      }
    }

    // Insert action into master_actions with action_label
    const insertData: {
      user_id: string;
      action_type: string;
      username: string;
      action_label?: string | null;
    } = {
      user_id: userId,
      action_type: actionType,
      username: finalUsername,
    };

    // Only include action_label if provided (not null/undefined)
    if (actionLabel !== null && actionLabel !== undefined) {
      insertData.action_label = actionLabel;
    }

    const { error: actionError } = await supabase
      .from("master_actions")
      .insert(insertData);

    if (actionError) {
      console.error("[ACTION] Error logging action to master_actions:", actionError);
      throw actionError;
    }
  } catch (err) {
    console.error("[ACTION] Error in logActionToMasterActions:", err);
    throw err;
  }
}

/**
 * Record an action and update profile stats
 * 
 * STEP 1: Insert into master_actions
 * STEP 2: Update profile_stats
 * 
 * @deprecated Consider using logActionToMasterActions() for master_actions only,
 * then handle profile_stats separately
 */
export async function recordAction(
  userId: string,
  actionType: ActionType,
  actionLabel?: string | null,
  username?: string | null
): Promise<void> {
  try {
    // STEP 1: Insert action into master_actions using shared function
    await logActionToMasterActions(userId, actionType, actionLabel, username);

    // STEP 2: Update profile_stats
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Get current stats
    const { data: currentStats, error: fetchError } = await supabase
      .from("profile_stats")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("[ACTION] Error fetching profile stats:", fetchError);
      throw fetchError;
    }

    // If no stats row exists, create one
    if (!currentStats) {
      const initialStats: Record<string, any> = {
        user_id: userId,
        total_actions: 1,
        last_active_date: today,
        current_streak: 1,
        updated_at: new Date().toISOString(),
      };

      // Increment the appropriate counter based on action type
      if (actionType === "chapter_completed") {
        initialStats.chapters_completed_count = 1;
      } else if (actionType === "note_created") {
        initialStats.notes_created_count = 1;
      } else if (actionType === "person_learned") {
        initialStats.people_learned_count = 1;
      } else if (actionType === "place_discovered") {
        initialStats.places_discovered_count = 1;
      } else if (actionType === "keyword_mastered") {
        initialStats.keywords_mastered_count = 1;
      }

      const { error: insertError } = await supabase
        .from("profile_stats")
        .insert(initialStats);

      if (insertError) {
        console.error("[ACTION] Error creating profile stats:", insertError);
        throw insertError;
      }
    } else {
      // Update existing stats
      const updates: Record<string, any> = {
        total_actions: (currentStats.total_actions || 0) + 1,
        last_active_date: today,
        updated_at: new Date().toISOString(),
      };

      // Increment the appropriate counter
      if (actionType === "chapter_completed") {
        updates.chapters_completed_count = (currentStats.chapters_completed_count || 0) + 1;
      } else if (actionType === "note_created") {
        updates.notes_created_count = (currentStats.notes_created_count || 0) + 1;
      } else if (actionType === "person_learned") {
        updates.people_learned_count = (currentStats.people_learned_count || 0) + 1;
      } else if (actionType === "place_discovered") {
        updates.places_discovered_count = (currentStats.places_discovered_count || 0) + 1;
      } else if (actionType === "keyword_mastered") {
        updates.keywords_mastered_count = (currentStats.keywords_mastered_count || 0) + 1;
      }

      // Update streak if needed (simplified - will be recalculated on Profile page load)
      // For now, just ensure last_active_date is updated

      const { error: updateError } = await supabase
        .from("profile_stats")
        .update(updates)
        .eq("user_id", userId);

      if (updateError) {
        console.error("[ACTION] Error updating profile stats:", updateError);
        throw updateError;
      }
    }
  } catch (err) {
    console.error("[ACTION] Error in recordAction:", err);
    throw err;
  }
}

