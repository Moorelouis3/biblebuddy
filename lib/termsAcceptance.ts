import { supabase } from "./supabaseClient";

// Terms / Privacy / Community Guidelines acceptance (App Store 1.2 EULA).
// Email signups record it right after creating the account. Google sign-in
// leaves the site, so the button marks a pending acceptance in localStorage
// and AppShell records it once the user is back and signed in.

export const TERMS_VERSION = "2026-09-21";
const PENDING_KEY = "bb:pending-terms-acceptance";

type AcceptanceMethod = "email_signup" | "guest_upgrade" | "google_signup" | "google_login" | "google_landing";

/** Call right before redirecting to Google. */
export function markTermsAcceptancePending(method: AcceptanceMethod) {
  try {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify({ method, at: new Date().toISOString() }));
  } catch {
    // storage blocked - acceptance is still shown on the page
  }
}

/** Saves acceptance on the signed-in user (keeps an earlier acceptance). */
export async function recordTermsAcceptance(method: AcceptanceMethod, acceptedAt = new Date().toISOString()) {
  try {
    const { data } = await supabase.auth.getUser();
    const meta = (data.user?.user_metadata || {}) as Record<string, unknown>;
    if (meta.terms_accepted_at && meta.terms_version === TERMS_VERSION) return;
    await supabase.auth.updateUser({
      data: { terms_accepted_at: acceptedAt, terms_version: TERMS_VERSION, terms_accepted_via: method },
    });
  } catch (error) {
    console.error("Terms acceptance save failed (non-blocking):", error);
  }
}

/** Called by AppShell after sign-in: records a pending Google acceptance. */
export async function recordPendingTermsAcceptance() {
  let pending: { method?: AcceptanceMethod; at?: string } | null = null;
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    pending = raw ? JSON.parse(raw) : null;
  } catch {
    pending = null;
  }
  if (!pending?.method) return;
  await recordTermsAcceptance(pending.method, pending.at || new Date().toISOString());
  try {
    window.localStorage.removeItem(PENDING_KEY);
  } catch {
    // ignore
  }
}
