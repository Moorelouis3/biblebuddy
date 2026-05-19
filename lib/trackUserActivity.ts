/**
 * Track User Activity Utility
 *
 * Tracks when a user logs in, refreshes, or interacts with the app.
 * Updates last_active_at as a lightweight heartbeat and logs user_login once per Bible Buddy day.
 */

import { supabase } from "./supabaseClient";
import { ACTION_TYPE } from "./actionTypes";
import { getBibleBuddyLocalDayKey } from "./louisDailyFlow";
import { getStoreItem } from "./bibleBuddyStore";

// In-memory lock to prevent concurrent calls racing past the localStorage check.
// Concurrent callers share the same promise so streak syncs can wait for today's
// login write instead of reading yesterday's streak.
const inFlight = new Map<string, Promise<boolean>>();
const HEARTBEAT_THROTTLE_MS = 24 * 60 * 60 * 1000;

async function recordActivityHeartbeat(userId: string) {
  const nowIso = new Date().toISOString();

  if (typeof window !== "undefined") {
    const heartbeatKey = `bb:last-active-heartbeat:${userId}`;
    const lastHeartbeat = Number(window.localStorage.getItem(heartbeatKey) || 0);
    if (Number.isFinite(lastHeartbeat) && Date.now() - lastHeartbeat < HEARTBEAT_THROTTLE_MS) {
      return;
    }
    window.localStorage.setItem(heartbeatKey, String(Date.now()));
  }

  const { error } = await supabase
    .from("profile_stats")
    .update({
      last_active_at: nowIso,
      updated_at: nowIso,
    })
    .eq("user_id", userId);

  if (error && !/last_active_at/i.test(error.message || "")) {
    console.error("[TRACK_ACTIVITY] Error updating last_active_at:", error);
  }
}

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
  const existingRun = inFlight.get(userId);
  if (existingRun) {
    return existingRun;
  }

  const run = (async (): Promise<boolean> => {
    try {
      await recordActivityHeartbeat(userId);

    // Check if we've already logged activity for this user in this session
    const sessionKey = `activity_logged_${userId}`;
    const today = getBibleBuddyLocalDayKey();

    if (typeof window !== "undefined") {
      const lastLogged = localStorage.getItem(sessionKey);
      if (lastLogged === today) {
        return false;
      }
    }

    // Claim the slot in localStorage immediately before any await
    if (typeof window !== "undefined") {
      localStorage.setItem(sessionKey, today);
    }

    // Get current profile stats to check last_active_date
    let { data: currentStats, error: currentStatsError }: { data: any; error: any } = await supabase
      .from("profile_stats")
      .select("last_active_date, username, current_streak, grace_days_count, last_grace_day_earned_at, diamonds_count")
      .eq("user_id", userId)
      .maybeSingle();

    const graceColumnsMissing =
      currentStatsError &&
      /grace_days_count|last_grace_day_earned_at|diamonds_count/i.test(currentStatsError.message || "");

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
      return false;
    }

    const lastActiveDate = currentStats?.last_active_date;

    // Check if it's been 24 hours (different day) since last active
    const shouldLog = !lastActiveDate || lastActiveDate !== today;

    if (!shouldLog) {
      return false;
    }

    const yesterday = shiftDayKey(today, -1);
    const currentStoredStreak = Math.max(0, Number(currentStats?.current_streak || 0));
    const currentGraceDays = Math.max(0, Math.min(5, Number(currentStats?.grace_days_count || 0)));
    const currentDiamonds = Math.max(0, Number(currentStats?.diamonds_count || 0));
    const graceDayPrice = getStoreItem("boost-extra-grace-day")?.price ?? 100;

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
        return false;
      }
      const graceDaysToBuy = Math.max(0, missedDays - currentGraceDays);
      const totalGraceDayCost = graceDaysToBuy * graceDayPrice;
      if (graceDaysToBuy > 0 && currentDiamonds >= totalGraceDayCost && currentStoredStreak > 0) {
        setGraceDayLocalEvent(userId, "pending-purchase", {
          lastActiveDate,
          today,
          currentStreak: currentStoredStreak,
          graceDays: currentGraceDays,
          missedDays,
          diamonds: currentDiamonds,
          pricePerGraceDay: graceDayPrice,
          graceDaysToBuy,
        });
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

    const nowIso = new Date().toISOString();

    // Update profile_stats with last_active_date
    let { error: statsError } = await supabase
      .from("profile_stats")
      .upsert(
        {
          user_id: userId,
          last_active_at: nowIso,
          last_active_date: today,
          username: username,
          current_streak: nextCurrentStreak,
          grace_days_count: nextGraceDays,
          ...(shouldEarnGraceDay ? { last_grace_day_earned_at: today } : {}),
          updated_at: nowIso,
        },
        {
          onConflict: "user_id",
        }
      );

    if (statsError && /grace_days_count|last_grace_day_earned_at|last_active_at/i.test(statsError.message || "")) {
      const statsErrorMessage = statsError.message || "";
      const fallbackPayload: Record<string, unknown> = {
        user_id: userId,
        last_active_date: today,
        username: username,
        current_streak: nextCurrentStreak,
        updated_at: nowIso,
      };

      if (!/last_active_at/i.test(statsErrorMessage)) {
        fallbackPayload.last_active_at = nowIso;
      }

      const fallbackUpdate = await supabase
        .from("profile_stats")
        .upsert(
          fallbackPayload,
          {
            onConflict: "user_id",
          }
        );
      statsError = fallbackUpdate.error;
    }

    if (statsError) {
      console.error("[TRACK_ACTIVITY] Error updating profile_stats:", statsError);
      return false;
    }

    if (shouldEarnGraceDay) {
      setGraceDayLocalEvent(userId, `earned:${today}`, {
        streak: nextCurrentStreak,
        graceDays: nextGraceDays,
        earnedGraceDays: 1,
      });
    }

    console.log(`[TRACK_ACTIVITY] Successfully tracked activity for user ${userId} on ${today}`);
    return true;
    } catch (err) {
      console.error("[TRACK_ACTIVITY] Error in trackUserActivity:", err);
      return false;
    } finally {
      inFlight.delete(userId);
    }
  })();

  inFlight.set(userId, run);
  return run;
}

