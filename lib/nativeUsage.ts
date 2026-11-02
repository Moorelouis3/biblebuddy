import { supabase } from "@/lib/supabaseClient";
import { isNativeApp, nativePlatform } from "@/lib/nativeApp";

/**
 * Marks that an account used the real App Store / Play Store app today.
 *
 * Why this exists (Louis, 2026-11-02): "I am willing to bet retention will be
 * better with the iOS app." It is a good bet and worth measuring, but nothing
 * in the database could answer it. Clicks on a download button are not
 * downloads, downloads are not usage, and App Store Connect only ever reports
 * totals - it can never tell us whether *this* person came back.
 *
 * One row per account per day is enough: retention is a question about days,
 * and `master_actions` is already how every other cohort query reads activity.
 * So "did app users come back more than web users" becomes a join, not a new
 * pipeline.
 *
 * Deliberately NOT a column on profile_stats. A flag would only say "has used
 * the app at some point", which cannot be split by week, cannot show somebody
 * drifting back to the browser, and gets overwritten rather than accumulating.
 *
 * CAREFUL when querying retention. Most cohort queries treat any
 * master_actions row as "active that day". These rows mean "opened the app",
 * not "studied", so a cohort measured after 2026-11-02 would look better than
 * one before it for no real reason. Exclude NATIVE_SESSION_ACTION when the
 * question is engagement; keep it when the question is whether they returned.
 *
 * It does NOT affect profile_stats.total_actions, which is recomputed as a sum
 * of study counts rather than a count of rows - so nothing gated on that
 * number (the feedback prompt, the store review prompt) moves because of this.
 */

export const NATIVE_SESSION_ACTION = "native_app_session";

const LOCAL_KEY = "bb:native-session-logged";

/** Today in UTC, matching how the cohort queries bucket master_actions. */
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Call once per app load with the signed-in user's id. Safe to call on every
 * render path: it is a no-op on the web, when signed out, and after the first
 * call of the day on this device.
 */
export async function recordNativeAppUse(userId: string | null | undefined) {
  if (!isNativeApp()) return;
  if (!userId) return;

  const today = todayKey();
  // localStorage is the cheap guard. Losing it (reinstall, cleared storage)
  // costs one duplicate row a day, which the cohort queries already tolerate
  // because they count distinct days, not rows.
  try {
    if (window.localStorage.getItem(LOCAL_KEY) === today) return;
  } catch {
    // Private mode or blocked storage: fall through and write. Still at most
    // one row per app load, which is not enough traffic to matter.
  }

  try {
    await supabase.from("master_actions").insert({
      user_id: userId,
      action_type: NATIVE_SESSION_ACTION,
      action_label: "Opened the native app",
      event_metadata: { platform: nativePlatform() },
    });
    try {
      window.localStorage.setItem(LOCAL_KEY, today);
    } catch {
      // ignore
    }
  } catch {
    // Measurement must never break the app for the people we are measuring.
  }
}
