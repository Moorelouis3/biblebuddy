// Native app detection (2026-09-21, App Store prep). The iOS/Android apps are
// a Capacitor shell that loads this website, so the same code runs in both.
// Use these helpers to hide web-only things (install banners, web push
// prompts, ads, upgrade screens) inside the store apps.
//
// Detection: Capacitor injects window.Capacitor, and the shell's config appends
// NATIVE_APP_UA_MARKER to the user agent so the server can tell too.

export const NATIVE_APP_UA_MARKER = "BibleBuddyApp";

type CapacitorGlobal = {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
  Plugins?: Record<string, any>;
};

function capacitor(): CapacitorGlobal | null {
  if (typeof window === "undefined") return null;
  return ((window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor) ?? null;
}

export function isNativeApp(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (capacitor()?.isNativePlatform?.()) return true;
  } catch {
    // ignore
  }
  return typeof navigator !== "undefined" && navigator.userAgent.includes(NATIVE_APP_UA_MARKER);
}

export function isNativeUserAgent(userAgent: string | null | undefined): boolean {
  return Boolean(userAgent && userAgent.includes(NATIVE_APP_UA_MARKER));
}

export function nativePlatform(): "ios" | "android" | "web" {
  if (!isNativeApp()) return "web";
  const platform = capacitor()?.getPlatform?.();
  if (platform === "ios" || platform === "android") return platform;
  return /android/i.test(navigator.userAgent) ? "android" : "ios";
}

/**
 * Open a link outside the app. In the native app this uses the Capacitor
 * Browser plugin (an in-app Safari/Chrome sheet) when it is installed, so
 * outside sites never replace Bible Buddy inside the WebView. On the web it
 * opens a new tab.
 */
export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  if (isNativeApp()) {
    const browser = capacitor()?.Plugins?.Browser;
    if (browser?.open) {
      void browser.open({ url });
      return;
    }
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

/** True for http(s) links that leave mybiblebuddy.net. */
export function isExternalUrl(href: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const url = new URL(href, window.location.href);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    const host = url.hostname.replace(/^www\./, "");
    const own = window.location.hostname.replace(/^www\./, "");
    return host !== own && host !== "mybiblebuddy.net";
  } catch {
    return false;
  }
}
