/**
 * Study day pacing. Louis, 2026-11-22: "after 2 days completed back to back
 * add a timer like 7 mins".
 *
 * Two study days can be completed one after the other. If the last two were
 * completed within STUDY_DAY_WAIT_MS of each other, the next new day waits
 * until STUDY_DAY_WAIT_MS has passed since the latest one. After that wait the
 * pattern starts over: two more, then wait again. It counts across all
 * studies, so switching study does not skip the wait.
 *
 * The clock is master_actions devotional_day_completed, which is written once
 * per day and only the first time (lib/devotionalDayClaim.ts).
 * devotional_progress.completed_at is no good here because re-marking an old
 * day rewrites it. Re-opening or re-marking a day already done is never
 * blocked: callers only ask before a new completion.
 *
 * If the read fails the answer is "no wait". A dropped connection should never
 * stop someone finishing a day.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "@/lib/actionTypes";

export const STUDY_DAY_WAIT_MS = 7 * 60 * 1000;
/** How many days in a row are free before the wait. */
export const STUDY_DAY_FREE_RUN = 2;

/** Pure rule, newest first. Returns milliseconds left to wait (0 = go). */
export function studyDayWaitFrom(recentCompletionsNewestFirst: number[], now: number): number {
  const times = recentCompletionsNewestFirst.filter(Number.isFinite).slice(0, STUDY_DAY_FREE_RUN);
  if (times.length < STUDY_DAY_FREE_RUN) return 0;
  const latest = times[0];
  const oldest = times[times.length - 1];
  if (latest - oldest >= STUDY_DAY_WAIT_MS) return 0; // not back to back
  return Math.max(0, latest + STUDY_DAY_WAIT_MS - now);
}

export async function studyDayWaitMs(supabase: Pick<SupabaseClient, "from">, userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("master_actions")
      .select("created_at")
      .eq("user_id", userId)
      .eq("action_type", ACTION_TYPE.devotional_day_completed)
      .order("created_at", { ascending: false })
      .limit(STUDY_DAY_FREE_RUN);
    if (error || !data) return 0;
    return studyDayWaitFrom(
      (data as Array<{ created_at: string }>).map((row) => Date.parse(row.created_at)),
      Date.now(),
    );
  } catch {
    return 0;
  }
}

export function formatStudyWait(ms: number): string {
  const total = Math.max(1, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * The note shown when a day has to wait. One plain banner with a live
 * countdown, attached to <body> so it works on every screen that completes a
 * day (the Home pager's transform breaks position:fixed inside it).
 */
export function showStudyDayWait(ms: number) {
  if (typeof document === "undefined") return;
  document.getElementById("bb-study-wait")?.remove();
  const until = Date.now() + ms;
  const el = document.createElement("div");
  el.id = "bb-study-wait";
  el.setAttribute("role", "status");
  el.style.cssText =
    "position:fixed;left:16px;right:16px;margin:0 auto;bottom:calc(88px + env(safe-area-inset-bottom));z-index:2147483000;" +
    "max-width:380px;padding:12px 16px;border-radius:16px;background:#111827;color:#fff;" +
    "font:600 14px/1.4 system-ui,-apple-system,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.25);text-align:center;";
  document.body.appendChild(el);
  const render = () => {
    const left = until - Date.now();
    if (left <= 0) {
      el.textContent = "Ready. You can complete your next day now.";
      window.setTimeout(() => el.remove(), 2500);
      window.clearInterval(timer);
      return;
    }
    el.textContent = `Two days back to back, nice work! Take a breather with what you read. Your next day opens in ${formatStudyWait(left)}.`;
  };
  const timer = window.setInterval(render, 1000);
  render();
  el.addEventListener("click", () => {
    window.clearInterval(timer);
    el.remove();
  });
  window.setTimeout(() => {
    if (el.isConnected && until - Date.now() > 0) {
      window.clearInterval(timer);
      el.remove();
    }
  }, 8000);
}

/** Ask before a new completion. True = go ahead; false = the note was shown. */
export async function studyDayMayComplete(supabase: Pick<SupabaseClient, "from">, userId: string): Promise<boolean> {
  const wait = await studyDayWaitMs(supabase, userId);
  if (wait <= 0) return true;
  showStudyDayWait(wait);
  return false;
}
