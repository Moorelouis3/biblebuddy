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
