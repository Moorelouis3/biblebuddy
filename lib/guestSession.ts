"use client";

import { supabase } from "./supabaseClient";

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

async function createGuest(source: string): Promise<GuestSessionResult> {
  const { data: sessionData } = await supabase.auth.getSession();
  const existingId = sessionData.session?.user?.id;
  if (existingId) {
    return { ok: true, userId: existingId, created: false };
  }

  const { data, error } = await supabase.auth.signInAnonymously({
    options: { data: { guest_entry_source: source } },
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
