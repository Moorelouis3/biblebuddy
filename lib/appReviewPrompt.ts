import type { SupabaseClient } from "@supabase/supabase-js";
import { isNativeApp, nativePlatform, openExternal } from "./nativeApp";

/**
 * Asking for App Store / Play Store reviews, inside the native app only.
 *
 * The whole game here is restraint. Apple's StoreKit shows the rating sheet at
 * most THREE times per user per 365 days, and iOS - not us - decides whether a
 * given call actually paints anything. Burn a prompt on a weak moment and that
 * slot is gone for the year. So this module's job is to say "no" nearly always,
 * and "yes" only just after the person has finished something they are pleased
 * with.
 *
 * Three rules that are not ours to bend:
 *
 * 1. Native sheet only (App Store Review Guideline 5.6.1). We never build our
 *    own "Rate us!" dialog, and never a custom one in front of the real one.
 * 2. No gating. We must not ask "enjoying the app?" and route only the happy
 *    answers to the store - Apple forbids it and so does the FTC. Everybody
 *    who hits a qualifying moment gets the same sheet.
 * 3. No incentives. Not points, not a streak freeze, not an unlock. Ever.
 *
 * The book is deliberately not part of this. Amazon reviews may only be
 * requested from people who actually bought the book, by email, and Amazon
 * additionally requires $50 of lifetime spend before anyone may review at all.
 * Sending a wave of non-buyers at the listing from one source is the exact
 * shape Amazon's fraud detection looks for, and those reviews get stripped.
 */

/** Moments good enough to spend one of three yearly slots on. */
export type ReviewTrigger =
  | "devotional_day_completed"
  | "bible_year_day_completed"
  | "chapter_study_completed"
  | "trivia_chapter_completed"
  | "streak_milestone";

/** Recorded in master_actions so the history survives a reinstall. */
export const REVIEW_PROMPT_ACTION = "app_review_prompt_shown";

const MAX_PROMPTS_PER_YEAR = 3;        // Apple's own ceiling; no point exceeding it
const MIN_DAYS_BETWEEN_PROMPTS = 90;   // spreads our three slots across the year
const MIN_DAYS_SINCE_FIRST_SEEN = 7;   // never ask someone who just arrived
const MIN_QUALIFYING_ACTIONS = 5;      // ...nor someone who has barely used it

/** Streak lengths worth interrupting for. Everything else is just a Tuesday. */
const STREAK_MILESTONES = new Set([7, 30, 100, 365]);

const LOCAL_KEY = "bb:last-review-prompt";

export type ReviewDecision = { asked: boolean; reason: string };

function daysBetween(a: Date, b: Date) {
  return Math.abs(a.getTime() - b.getTime()) / 86_400_000;
}

/** localStorage is only a fast "definitely not" - the real record is in the DB. */
function recentlyPromptedLocally(): boolean {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return false;
    return daysBetween(new Date(), new Date(raw)) < MIN_DAYS_BETWEEN_PROMPTS;
  } catch {
    return false; // private window, blocked storage - fall through to the DB check
  }
}

function rememberPromptLocally() {
  try {
    window.localStorage.setItem(LOCAL_KEY, new Date().toISOString());
  } catch {
    // never let a storage failure break the calling flow
  }
}

/**
 * A trigger only counts when the person has actually got somewhere. Finishing
 * day 1 of anything is not an achievement worth a review slot; finishing day 5
 * means they came back.
 */
export function triggerQualifies(trigger: ReviewTrigger, value: number): boolean {
  switch (trigger) {
    case "devotional_day_completed":
      return value >= 5;
    case "bible_year_day_completed":
      return value >= 7;
    case "streak_milestone":
      return STREAK_MILESTONES.has(value);
    case "chapter_study_completed":
    case "trivia_chapter_completed":
      return value >= 3; // their third, not their first
    default:
      return false;
  }
}

/** Fires the real store sheet. Returns false when the platform gave us nothing. */
async function showNativeReviewSheet(): Promise<boolean> {
  try {
    const plugins = (window as unknown as { Capacitor?: { Plugins?: Record<string, any> } })
      .Capacitor?.Plugins;
    const plugin = plugins?.InAppReview ?? plugins?.RateApp;
    if (!plugin?.requestReview) return false;
    await plugin.requestReview();
    return true;
  } catch {
    return false;
  }
}

/**
 * The one entry point. Call it right after a win has been shown to the user -
 * after the confetti, not instead of it - and ignore the result; it is for
 * analytics, not for branching the UI.
 *
 * It is deliberately quiet: every "no" is a normal outcome, never an error.
 */
export async function maybeRequestAppReview(opts: {
  supabase: SupabaseClient;
  userId: string | null | undefined;
  trigger: ReviewTrigger;
  /** Day number, streak length, or how many of this thing they have finished. */
  value: number;
}): Promise<ReviewDecision> {
  const { supabase, userId, trigger, value } = opts;

  if (!isNativeApp()) return { asked: false, reason: "web - there is no store sheet to show" };
  if (!userId) return { asked: false, reason: "no signed-in user" };
  if (!triggerQualifies(trigger, value)) return { asked: false, reason: `${trigger} at ${value} is too early` };
  if (recentlyPromptedLocally()) return { asked: false, reason: "prompted recently on this device" };

  // History lives in master_actions: survives reinstalls, and shows up in admin
  // analytics next to everything else.
  const yearAgo = new Date(Date.now() - 365 * 86_400_000).toISOString();
  const { data: prompts, error } = await supabase
    .from("master_actions")
    .select("created_at")
    .eq("user_id", userId)
    .eq("action_type", REVIEW_PROMPT_ACTION)
    .gte("created_at", yearAgo)
    .order("created_at", { ascending: false });

  // If we cannot read the history, do NOT ask. Failing closed costs us one
  // prompt; failing open risks pestering someone who already said no.
  if (error) return { asked: false, reason: `history unreadable: ${error.message}` };

  if ((prompts?.length || 0) >= MAX_PROMPTS_PER_YEAR) {
    return { asked: false, reason: "already used all three slots this year" };
  }
  const last = prompts?.[0]?.created_at;
  if (last && daysBetween(new Date(), new Date(last)) < MIN_DAYS_BETWEEN_PROMPTS) {
    return { asked: false, reason: "inside the 90-day gap" };
  }

  // Engagement floor: how long they have been around, and how much they have done.
  const { data: history } = await supabase
    .from("master_actions")
    .select("created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(MIN_QUALIFYING_ACTIONS + 1);

  if ((history?.length || 0) < MIN_QUALIFYING_ACTIONS) {
    return { asked: false, reason: "not enough history yet" };
  }
  const first = history?.[0]?.created_at;
  if (first && daysBetween(new Date(), new Date(first)) < MIN_DAYS_SINCE_FIRST_SEEN) {
    return { asked: false, reason: "arrived less than a week ago" };
  }

  const shown = await showNativeReviewSheet();
  if (!shown) return { asked: false, reason: "no review plugin on this build" };

  rememberPromptLocally();
  await supabase.from("master_actions").insert({
    user_id: userId,
    action_type: REVIEW_PROMPT_ACTION,
    metadata: { trigger, value, platform: nativePlatform() },
  });

  return { asked: true, reason: `${trigger} at ${value}` };
}

/**
 * The manual "Rate Bible Buddy" row for Settings. This opens the store listing
 * outright, which is allowed, is not rate-limited, and does NOT consume one of
 * the three sheets - so it is the right home for a permanent link.
 *
 * Fill APP_STORE_ID in once App Store Connect issues it.
 */
export const APP_STORE_ID = ""; // e.g. "1234567890"
export const PLAY_PACKAGE = "net.mybiblebuddy.app";

export function openStoreListingForReview() {
  const platform = nativePlatform();
  if (platform === "ios") {
    if (!APP_STORE_ID) return;
    openExternal(`https://apps.apple.com/app/id${APP_STORE_ID}?action=write-review`);
    return;
  }
  openExternal(`https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`);
}
