"use client";

import { isNativeApp } from "./nativeApp";
import { hasCachedSupabaseSession } from "./authBoot";

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
 * `signedIn` is read from the cached Supabase token rather than awaited, so
 * this can be used while rendering. It is only ever used to choose between two
 * in-app destinations, and both of them handle the other case themselves -
 * /app sends a signed-in person to the dashboard, the dashboard sends a signed
 * out one to login - so a stale answer costs a redirect, never a dead end.
 */
export function homeDestination(): string {
  if (!isNativeApp()) return PUBLIC_HOME_PATH;
  return hasCachedSupabaseSession() ? APP_HOME_PATH : APP_WELCOME_PATH;
}

/** The same decision for the explicit "Home" button, which on the web wants
 *  the landing page specifically rather than whatever "/" resolves to. */
export function homeButtonDestination(): string {
  if (!isNativeApp()) return PUBLIC_LANDING_PATH;
  return hasCachedSupabaseSession() ? APP_HOME_PATH : APP_WELCOME_PATH;
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
