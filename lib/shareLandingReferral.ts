/**
 * The marker a public share landing page leaves when someone clicks its CTA, so
 * the signup that follows can name the link that brought them.
 *
 * The Wisdom of Proverbs page (components/proverbs/ProverbsLandingPage.tsx) is
 * the first to use it, 2026-10-16. Its CTA points at
 * /signup?next=/devotionals/<id>, and the signup page does record that query
 * string in page_path - but an Apple or Google signup leaves the page entirely
 * and reports created_account_successfully from /dashboard inside AppShell,
 * where the query string is long gone. localStorage survives that hop.
 *
 * Everything here is best effort: localStorage throws in a locked-down browser,
 * and tracking must never block a page or a signup.
 */

export type ShareLandingReferral = {
  /** The landing page they clicked from, e.g. "/devotionals/wisdom-of-proverbs". */
  page: string;
  /** Which CTA on that page, e.g. "hero" or "closing". */
  placement: string | null;
  /** ISO timestamp of the click. */
  at: string;
};

const REFERRAL_KEY = "bb:share-landing-click";
const LANDING_SESSION_KEY = "bb:landing-session-id";

/**
 * A click only explains a signup for so long. Someone who opened the Proverbs
 * link in March and signed up from a Pinterest post in April belongs to
 * Pinterest, so the marker goes stale rather than claiming them.
 */
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * The same id lib/signupAttribution.ts reads as `landingSessionId` and the
 * signup events carry, created here if the visitor has not got one yet. It is
 * what lines a share page view up with the signup that follows it: both rows in
 * landing_page_events share one session_id.
 */
export function getLandingSessionId() {
  if (typeof window === "undefined") return "server";
  try {
    const existing = window.localStorage.getItem(LANDING_SESSION_KEY);
    if (existing) return existing;
    const next =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    window.localStorage.setItem(LANDING_SESSION_KEY, next);
    return next;
  } catch {
    return "unknown";
  }
}

export function markShareLandingClick(page: string, placement: string | null = null) {
  if (typeof window === "undefined") return;
  try {
    const referral: ShareLandingReferral = { page, placement, at: new Date().toISOString() };
    window.localStorage.setItem(REFERRAL_KEY, JSON.stringify(referral));
  } catch {
    // Attribution is never worth a broken CTA.
  }
}

export function readShareLandingReferral(): ShareLandingReferral | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(REFERRAL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ShareLandingReferral>;
    if (typeof parsed?.page !== "string" || typeof parsed?.at !== "string") return null;
    const age = Date.now() - new Date(parsed.at).getTime();
    if (!Number.isFinite(age) || age > MAX_AGE_MS) return null;
    return {
      page: parsed.page,
      placement: typeof parsed.placement === "string" ? parsed.placement : null,
      at: parsed.at,
    };
  } catch {
    return null;
  }
}
