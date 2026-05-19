"use client";

export function hasCachedSupabaseSession() {
  if (typeof window === "undefined") return false;

  try {
    const hasLocalToken = Object.keys(window.localStorage).some(
      (key) => key.startsWith("sb-") && key.endsWith("-auth-token"),
    );
    if (hasLocalToken) return true;
  } catch {
    // Some mobile browsers can block storage briefly during app resume.
  }

  try {
    return document.cookie
      .split(";")
      .some((cookie) => /(^|\s)sb-[^=]*-auth-token/.test(cookie));
  } catch {
    return false;
  }
}
