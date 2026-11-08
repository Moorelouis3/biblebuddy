/**
 * Where "Download the Bible Buddy app" goes. One file, every blog promo.
 *
 * 2026-11-03: Louis supplied four new blog banners, all of which say
 * "Download the Bible Buddy app". Until then the blog's rotating banners sold
 * a free account and pointed at /signup. iOS 1.0 went live on 2026-11-01, so
 * the ask on the blog is now the install, and every one of those banners
 * points at the App Store listing instead.
 *
 * ===========================================================================
 *  THE ANDROID URL GOES IN `APP_STORES.google` BELOW. That is the only edit.
 * ===========================================================================
 *
 * Nothing else has to change when the Play listing is live. Putting the URL
 * there switches on device-aware routing everywhere at once:
 *
 *   iPhone / iPad        -> App Store
 *   Android              -> Google Play
 *   desktop / unknown    -> App Store on the banner itself, plus both store
 *                           buttons underneath it, inside the post
 *
 * While it stays null there is no routing and no choice to make: every reader
 * on every device goes to the App Store, and nothing on the page mentions
 * Android. Do not put a guess, a search URL or a "coming soon" page in it -
 * an empty string and a null both read as "not live yet", and anything else
 * is advertised to readers as a working Play listing.
 */

import { isNativeApp } from "@/lib/nativeApp";

export type StorePlatform = "ios" | "android" | "other";

type StoreLinks = {
  apple: string;
  /** null until the Play listing is live. See the block comment above. */
  google: string | null;
};

export const APP_STORES: StoreLinks = {
  apple: "https://apps.apple.com/app/id6822155944",
  google: null,
};

/** Whether we have a real Play listing to send anyone to. */
export function androidIsLive(): boolean {
  return typeof APP_STORES.google === "string" && APP_STORES.google.trim().length > 0;
}

/**
 * Which store a device belongs to.
 *
 * `touchPoints` is navigator.maxTouchPoints and is what catches an iPad: since
 * iPadOS 13 it asks for desktop sites by default and its user agent says
 * "Macintosh", so a UA test alone sends every iPad reader to the desktop
 * branch. A Mac reports 0 touch points; an iPad reports 5.
 *
 * Anything unrecognised is "other" on purpose - a reader we cannot place is
 * better offered a choice than guessed at.
 */
export function detectStorePlatform(userAgent: string, touchPoints = 0): StorePlatform {
  const ua = userAgent || "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/macintosh/i.test(ua) && touchPoints > 1) return "ios"; // iPad in desktop mode
  return "other";
}

/**
 * The same question, asked of the browser rather than of a string.
 *
 * Louis, 2026-11-08: "make sure it works to identify the mobile user device
 * even if the link is clicked on social media". Most of the blog's phone
 * traffic arrives inside somebody else's app - Instagram, Facebook, Threads,
 * TikTok - and those are WebViews with their own user agents.
 *
 * The good news, confirmed by scripts/verify-store-platform.ts against real
 * captured strings: every one of them keeps "iPhone" or "Android" in the user
 * agent and appends its own name, so the test above already places them. This
 * function exists for the cases it does not:
 *
 *   1. navigator.userAgentData.platform, where Chromium offers it. It is
 *      structured rather than parsed and a WebView cannot garble it by
 *      appending to a string.
 *   2. navigator.platform, the old field, which still says "iPhone" or
 *      "Linux armv8l" when a WebView has rewritten the user agent wholesale.
 *
 * Anything still unplaced stays "other", and "other" is treated as desktop.
 * That is deliberate: a phone we cannot name is better offered the web than
 * sent to the wrong shop, and in practice there is no such phone - all 21
 * captured user agents in the verify script are placed by the string alone.
 *
 * Order matters. The user agent is checked before navigator.platform because
 * an iPad in desktop mode reports "MacIntel" there, and the touch-point test
 * above is what catches it.
 */
export function clientStorePlatform(): StorePlatform {
  if (typeof navigator === "undefined") return "other";

  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string; mobile?: boolean };
  };
  const touchPoints = typeof nav.maxTouchPoints === "number" ? nav.maxTouchPoints : 0;

  const hint = (nav.userAgentData?.platform || "").toLowerCase();
  if (hint === "android") return "android";
  if (hint === "ios" || hint === "ipados") return "ios";

  const byUserAgent = detectStorePlatform(nav.userAgent || "", touchPoints);
  if (byUserAgent !== "other") return byUserAgent;

  const legacy = (nav.platform || "").toLowerCase();
  if (/iphone|ipad|ipod/.test(legacy)) return "ios";
  if (/android|linux arm/.test(legacy)) return "android";

  return "other";
}

/**
 * The single destination for a device. Always the App Store until Android is
 * live, including for Android readers - the iOS listing is the only real
 * place to send anyone today.
 */
export function storeHref(platform: StorePlatform): string {
  const google = APP_STORES.google;
  if (platform === "android" && google) return google;
  return APP_STORES.apple;
}

/**
 * True when a reader should be shown both stores rather than sent straight to
 * one. Only ever true once Android is live, and only on devices we could not
 * place - a phone goes to its own store without being asked.
 */
export function showsBothStores(platform: StorePlatform): boolean {
  return androidIsLive() && platform === "other";
}

/** Where an account was created: in the store app or a browser, and on what. */
export type SignupSurface = { surface: "app" | "web"; platform: StorePlatform };

/**
 * Stamped on the signup event so "how many of today's new people came from
 * the app" is a question with an answer (Louis, 2026-11-03).
 *
 * Until now the only clue was the sign-in provider: an Apple account almost
 * certainly means an iPhone, but it cannot tell the app apart from Safari on
 * the same phone, and it says nothing at all about a Google or email signup.
 * The shell already appends NATIVE_APP_UA_MARKER to its user agent, so the
 * answer was being thrown away rather than missing.
 *
 * Read on the client at the moment of signup - the server never sees this.
 */
export function signupSurface(): SignupSurface {
  if (typeof navigator === "undefined") return { surface: "web", platform: "other" };
  return {
    surface: isNativeApp() ? "app" : "web",
    platform: detectStorePlatform(navigator.userAgent, navigator.maxTouchPoints ?? 0),
  };
}
