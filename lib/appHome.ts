"use client";

import { isNativeApp } from "./nativeApp";

/**
 * Where "home" is, which is not the same place on the website and in the app
 * (Louis, 2026-10-13).
 *
 * On the website the Bible Buddy wordmark on the auth pages goes to "/", the
 * marketing landing page, and the Home button to "/?landing=1". That is
 * correct for someone who arrived from Google and is deciding whether to sign
 * up, and it is exactly wrong inside the app: tapping the wordmark on the
 * login screen dropped Louis onto the promo video and "Start Studying Now",
 * i.e. out of the app and into an advert for it.
 *
 * In the app there is no marketing page. There is the welcome screen at /app
 * for someone signed out, and the dashboard for someone signed in.
 *
 * Note "/" is NOT the app's home. The dashboard is a route of its own, and
 * the native shell is pointed at /app rather than / for the same reason.
 */

export const APP_WELCOME_PATH = "/app";
export const APP_HOME_PATH = "/dashboard";
export const PUBLIC_HOME_PATH = "/";
export const PUBLIC_LANDING_PATH = "/?landing=1";

/**
 * The destination for a wordmark or Home control.
 *
 * In the app this is ALWAYS the welcome screen, never the dashboard.
 *
 * It did briefly pick between the two by reading the cached Supabase token,
 * and that was wrong twice over. A leftover sb-*-auth-token in storage counts
 * as "signed in" to that check even when the session behind it is long dead,
 * so tapping the wordmark while logged out threw people at the dashboard -
 * which bounces them to login, but only after showing them a flash of a
 * screen they have no business seeing. It reads as a hole in the app whether
 * or not it is one.
 *
 * /app is the one destination that is right in every case and guesses about
 * nothing: it asks Supabase for a real session and replaces into the
 * dashboard itself when there is one.
 */
export function homeDestination(): string {
  if (!isNativeApp()) return PUBLIC_HOME_PATH;
  return APP_WELCOME_PATH;
}

/** The same decision for the explicit "Home" button, which on the web wants
 *  the landing page specifically rather than whatever "/" resolves to. */
export function homeButtonDestination(): string {
  if (!isNativeApp()) return PUBLIC_LANDING_PATH;
  return APP_WELCOME_PATH;
}

/**
 * Where to go after signing in. Honours a same-site ?next= and otherwise lands
 * on the dashboard - never on the marketing page, on either platform.
 */
export function postAuthDestination(search?: string): string {
  const query = search ?? (typeof window === "undefined" ? "" : window.location.search);
  let raw: string | null = null;
  try {
    raw = new URLSearchParams(query).get("next");
  } catch {
    raw = null;
  }
  if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) {
    return APP_HOME_PATH;
  }
  // "/" means the marketing page. Someone who just signed in wants the app.
  if (raw === PUBLIC_HOME_PATH) return APP_HOME_PATH;
  return raw;
}
