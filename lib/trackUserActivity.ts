/**
 * Track User Activity Utility
 *
 * Tracks when a user logs in or refreshes the app (opens a new page).
 * Updates last_active_date in profile_stats and logs to master_actions once per 24 hours.
 */

import { supabase } from "./supabaseClient";
import { ACTION_TYPE } from "./actionTypes";
import { getBibleBuddyLocalDayKey } from "./louisDailyFlow";

// In-memory lock to prevent concurrent calls racing past the localStorage check
const inFlight = new Set<string>();

function shiftDayKey(dayKey: string, days: number) {
  const [year, month, day] = dayKey.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12, 0, 0);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function diffDayKeys(fromDayKey: string, toDayKey: string) {
  const [fromYear, fromMonth, fromDay] = fromDayKey.split("-").map(Number);
  const [toYear, toMonth, toDay] = toDayKey.split("-").map(Number);
  const fromDate = Date.UTC(fromYear, fromMonth - 1, fromDay);
  const toDate = Date.UTC(toYear, toMonth - 1, toDay);
  return Math.round((toDate - fromDate) / 86400000);
}

function setGraceDayLocalEvent(userId: string, key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`bb:grace-days:${key}:${userId}`, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("bb:grace-days-updated"));
}

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
    const today = getBibleBuddyLocalDayKey();

    if (typeof window !== "undefined") {
      const lastLogged = localStorage.getItem(sessionKey);
      if (lastLogged === today) {
        return false;
      }
    }

    // Prevent concurrent calls from both passing the check above
    if (inFlight.has(userId)) {
      return false;
    }
    inFlight.add(userId);

    // Claim the slot in localStorage immediately before any await
    if (typeof window !== "undefined") {
      localStorage.setItem(sessionKey, today);
    }

    // Get current profile stats to check last_active_date
    let { data: currentStats, error: currentStatsError }: { data: any; error: any } = await supabase
      .from("profile_stats")
      .select("last_active_date, username, current_streak, grace_days_count, last_grace_day_earned_at")
      .eq("user_id", userId)
      .maybeSingle();

    const graceColumnsMissing =
      currentStatsError &&
      /grace_days_count|last_grace_day_earned_at/i.test(currentStatsError.message || "");

    if (graceColumnsMissing) {
      const fallback = await supabase
        .from("profile_stats")
        .select("last_active_date, username, current_streak")
        .eq("user_id", userId)
        .maybeSingle();
      currentStats = fallback.data;
      currentStatsError = fallback.error;
    }

    if (currentStatsError) {
      console.error("[TRACK_ACTIVITY] Error loading profile stats:", currentStatsError);
      inFlight.delete(userId);
      return false;
    }

    const lastActiveDate = currentStats?.last_active_date;

    // Check if it's been 24 hours (different day) since last active
    const shouldLog = !lastActiveDate || lastActiveDate !== today;

    if (!shouldLog) {
      inFlight.delete(userId);
      return false;
    }

    const yesterday = shiftDayKey(today, -1);
    const currentStoredStreak = Math.max(0, Number(currentStats?.current_streak || 0));
    const currentGraceDays = Math.max(0, Math.min(5, Number(currentStats?.grace_days_count || 0)));

    if (lastActiveDate && lastActiveDate !== today && lastActiveDate !== yesterday) {
      const missedDays = Math.max(1, diffDayKeys(lastActiveDate, today) - 1);
      if (currentGraceDays >= missedDays && currentStoredStreak > 0) {
        setGraceDayLocalEvent(userId, "pending-use", {
          lastActiveDate,
          today,
          currentStreak: currentStoredStreak,
          graceDays: currentGraceDays,
          missedDays,
        });
        inFlight.delete(userId);
        return false;
      }
    }

    const nextCurrentStreak =
      lastActiveDate === yesterday
        ? currentStoredStreak + 1
        : lastActiveDate === today
          ? currentStoredStreak
          : 1;

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
    console.log("[MASTER_ACTIONS] inserting:", { action_type: ACTION_TYPE.user_login, action_label: null });
    const { data: insertedAction, error: actionError } = await supabase
      .from("master_actions")
      .insert({
        user_id: userId,
        username: username ?? null,
        action_type: ACTION_TYPE.user_login,
      })
      .select("id")
      .single();

    if (actionError) {
      console.error("[TRACK_ACTIVITY] Error logging to master_actions:", actionError);
      // Continue anyway - we still want to update last_active_date
    }

    if (insertedAction?.id) {
      const streakBonusPoints = Math.min(30, Math.max(0, nextCurrentStreak));
      const streakBonusLabel = `streak_day:${streakBonusPoints}:${today}`;
      const { error: labelUpdateError } = await supabase
        .from("master_actions")
        .update({ action_label: streakBonusLabel })
        .eq("id", insertedAction.id);

      if (labelUpdateError) {
        console.error("[TRACK_ACTIVITY] Error saving streak bonus label:", labelUpdateError);
      }
    }

    const shouldEarnGraceDay =
      nextCurrentStreak > 0 &&
      nextCurrentStreak % 7 === 0 &&
      currentGraceDays < 5 &&
      currentStats?.last_grace_day_earned_at !== today;
    const nextGraceDays = shouldEarnGraceDay ? Math.min(5, currentGraceDays + 1) : currentGraceDays;

    // Update profile_stats with last_active_date
    let { error: statsError } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          last_active_date: today,
          username: username,
          current_streak: nextCurrentStreak,
          grace_days_count: nextGraceDays,
          ...(shouldEarnGraceDay ? { last_grace_day_earned_at: today } : {}),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id",
        }
      );

    if (statsError && /grace_days_count|last_grace_day_earned_at/i.test(statsError.message || "")) {
      const fallbackUpdate = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            last_active_date: today,
            username: username,
            current_streak: nextCurrentStreak,
            updated_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id",
          }
        );
      statsError = fallbackUpdate.error;
    }

    if (statsError) {
      console.error("[TRACK_ACTIVITY] Error updating profile_stats:", statsError);
      inFlight.delete(userId);
      return false;
    }

    if (shouldEarnGraceDay) {
      setGraceDayLocalEvent(userId, `earned:${today}`, {
        streak: nextCurrentStreak,
        graceDays: nextGraceDays,
        earnedGraceDays: 1,
      });
    }

    inFlight.delete(userId);
    console.log(`[TRACK_ACTIVITY] Successfully tracked activity for user ${userId} on ${today}`);
    return true;
  } catch (err) {
    console.error("[TRACK_ACTIVITY] Error in trackUserActivity:", err);
    inFlight.delete(userId);
    return false;
  }
}

