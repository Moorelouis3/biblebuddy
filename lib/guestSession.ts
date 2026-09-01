"use client";

import { supabase } from "./supabaseClient";
import { getCaptchaToken } from "./captcha";

/**
 * Guest sessions — study without signing up.
 *
 * Bible Buddy already supported anonymous users, but only through the landing
 * questionnaire on `/`. Someone arriving from a blog post, a search result or a
 * shared link had no way to become a guest, so every study action failed.
 *
 * `ensureGuestSession()` fixes that: it can be called from any page, at the
 * moment a visitor actually tries to study something.
 *
 * Deliberate choices:
 *
 *  - Called on the first STUDY ACTION, never on page view. Bounced traffic and
 *    crawlers must not create rows.
 *  - Concurrent calls share one in-flight promise, so a double tap cannot create
 *    two guests.
 *  - A guest is a real Supabase user, so RLS and progress writes work unchanged.
 *  - Signing up later attaches an email to this SAME user id, so nothing has to
 *    be migrated — all study history carries over. See the conversion flow in
 *    components/DashboardJourneyExperience.tsx.
 */

export type GuestSessionResult =
  | { ok: true; userId: string; created: boolean }
  | { ok: false; reason: "disabled" | "error"; message?: string };

let inFlight: Promise<GuestSessionResult> | null = null;

function isAnonymousDisabled(message: string | undefined) {
  return /anonymous sign-?ins are disabled/i.test(message || "");
}

/**
 * Best-effort minimal profile row so progress writes have somewhere to land.
 *
 * AppShell's auth listener also bootstraps a fuller profile, but that runs
 * asynchronously and we may write progress before it finishes. This upsert is
 * idempotent (onConflict: user_id), so the two cannot conflict.
 */
async function ensureGuestProfile(userId: string, source: string) {
  const nowIso = new Date().toISOString();

  const { error } = await supabase.from("profile_stats").upsert(
    {
      user_id: userId,
      account_type: "guest",
      guest_started_at: nowIso,
      traffic_source: source,
      onboarding_completed: false,
    },
    { onConflict: "user_id" },
  );

  if (!error) return;

  // Older databases may not have the guest lifecycle columns yet. Fall back to
  // the columns that definitely exist rather than failing the whole flow.
  if (/account_type|guest_started_at|traffic_source|column/i.test(error.message || "")) {
    await supabase
      .from("profile_stats")
      .upsert({ user_id: userId, onboarding_completed: false }, { onConflict: "user_id" });
    return;
  }

  console.error("[GUEST] Could not create guest profile:", error.message);
}

/**
 * Record a new user, once, when they choose to study.
 *
 * Using the app IS the conversion. Bible Buddy is free and earns through
 * in-app promos, so a guest who studies daily and never gives an email has
 * completed the funnel. Analytics used to count only created_free_account,
 * which just the email form fires, so those people were invisible.
 *
 * Deliberately NOT called when a guest account is created. /start makes a
 * guest the moment the page loads, so counting creation counted arrivals,
 * bounces included. This is called from the places where someone actually
 * chose to study: picking a reading plan, or opening a devotional day or a
 * chapter directly.
 *
 * Fires at most once per user, so the paths cannot double count.
 *
 * Fire and forget. A failed analytics call must never stop someone reading.
 */
export function recordNewUser(userId: string, source: string) {
  if (typeof window === "undefined") return;

  const flag = `bb:new-user-logged:${userId}`;
  try {
    if (window.localStorage.getItem(flag)) return;
    window.localStorage.setItem(flag, "1");
  } catch {
    // Storage blocked: fall through and log. A duplicate beats a silent miss.
  }

  try {
    // The original channel, captured on whatever page they first arrived at
    // (TrafficSourceCapture in the root layout). The landing page's own
    // sessionStorage value only exists when they came through the landing
    // page this session, so it is the fallback, not the answer.
    let firstTouch: string | null = null;
    let firstTouchReferrer: string | null = null;
    try {
      firstTouch = window.localStorage.getItem("bb:first-touch-source");
      firstTouchReferrer = window.localStorage.getItem("bb:first-touch-referrer");
    } catch { /* storage blocked */ }
    const landingSource = firstTouch || window.sessionStorage.getItem("bb:landing-source") || null;
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "guest_account_created",
        session_id: window.sessionStorage.getItem("bb:landing-session") || undefined,
        user_id: userId,
        source: landingSource || undefined,
        referrer: document.referrer || null,
        page_path: `${window.location.pathname}${window.location.search}`,
        metadata: { guest_entry_source: source, first_touch_referrer: firstTouchReferrer || undefined },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Storage blocked or similar - not worth breaking the session over.
  }
}

async function createGuest(source: string): Promise<GuestSessionResult> {
  const { data: sessionData } = await supabase.auth.getSession();
  const existingId = sessionData.session?.user?.id;
  if (existingId) {
    return { ok: true, userId: existingId, created: false };
  }

  // Bot protection. Returns undefined when Turnstile is not configured, in
  // which case this behaves exactly as before.
  const captchaToken = await getCaptchaToken();

  const { data, error } = await supabase.auth.signInAnonymously({
    options: {
      data: { guest_entry_source: source },
      ...(captchaToken ? { captchaToken } : {}),
    },
  });

  if (error) {
    if (isAnonymousDisabled(error.message)) {
      console.warn(
        "[GUEST] Anonymous sign-ins are disabled in Supabase. Guest study is unavailable " +
          "until Authentication → Providers → Anonymous is enabled.",
      );
      return { ok: false, reason: "disabled", message: error.message };
    }
    console.error("[GUEST] Could not start guest session:", error.message);
    return { ok: false, reason: "error", message: error.message };
  }

  const userId = data.user?.id;
  if (!userId) return { ok: false, reason: "error", message: "No user returned" };

  await ensureGuestProfile(userId, source);
  return { ok: true, userId, created: true };
}

/**
 * Returns the current user id, creating a guest account if there is no session.
 *
 * Safe to call repeatedly. Never throws — callers should degrade to read-only
 * when this returns `ok: false`, not break the page.
 */
export async function ensureGuestSession(options?: { source?: string }): Promise<GuestSessionResult> {
  const source = options?.source || "deep_link";

  if (inFlight) return inFlight;

  inFlight = createGuest(source).finally(() => {
    inFlight = null;
  });

  return inFlight;
}

function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

/**
 * Landing page "Start studying now" — guest account straight into Bible in One
 * Year Day 1, with no questionnaire and no signup form.
 *
 * The profile is written with `bible_year_started_at`, `bible_year_launch_seen_at`
 * and `onboarding_completed` already set, because AppShell shows the first-login
 * onboarding modal when those are missing. Setting them here is what makes the
 * journey land on Day 1 instead of on a welcome wall.
 *
 * Day 1 progress is seeded too, matching what AppShell would have created.
 */
export async function startGuestBibleYearJourney(options?: {
  source?: string;
}): Promise<GuestSessionResult> {
  const guest = await ensureGuestSession({ source: options?.source || "landing_start_studying" });
  if (!guest.ok) return guest;

  const nowIso = new Date().toISOString();
  const todayKey = localDateKey();

  const fullProfile = {
    user_id: guest.userId,
    onboarding_completed: true,
    app_theme: "light",
    preferred_study_mode: "bible_year",
    bible_year_started_at: todayKey,
    bible_year_launch_seen_at: nowIso,
    louis_primary_devotional_day: 1,
    updated_at: nowIso,
  };

  const { error } = await supabase
    .from("profile_stats")
    .upsert(fullProfile, { onConflict: "user_id" });

  if (error) {
    // Older databases may not have every column. Fall back to the minimum that
    // still skips the onboarding modal.
    if (/column|preferred_study_mode|bible_year_|louis_primary|app_theme|updated_at/i.test(error.message || "")) {
      await supabase
        .from("profile_stats")
        .upsert({ user_id: guest.userId, onboarding_completed: true }, { onConflict: "user_id" });
    } else {
      console.error("[GUEST] Could not set up Bible in One Year journey:", error.message);
    }
  }

  // Seed Day 1 so the dashboard has something to show immediately.
  const { error: dayError } = await supabase.from("bible_year_day_progress").upsert(
    {
      user_id: guest.userId,
      day_number: 1,
      reading_completed: false,
      study_notes_completed: false,
      trivia_completed: false,
      reflection_completed: false,
    },
    { onConflict: "user_id,day_number" },
  );

  if (dayError && /study_notes_completed|column/i.test(dayError.message || "")) {
    await supabase.from("bible_year_day_progress").upsert(
      {
        user_id: guest.userId,
        day_number: 1,
        reading_completed: false,
        trivia_completed: false,
        reflection_completed: false,
      },
      { onConflict: "user_id,day_number" },
    );
  }

  return guest;
}

/** Current user id without creating anything. */
export async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

/** True when the signed-in user is an anonymous guest rather than a registered account. */
export async function isGuestUser(): Promise<boolean> {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return false;
  return Boolean(
    (user as unknown as { is_anonymous?: boolean }).is_anonymous ||
      !user.email ||
      user.identities?.length === 0,
  );
}
