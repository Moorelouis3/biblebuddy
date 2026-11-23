import { trackFeatureEvent, type FeatureEventName } from "@/lib/featureEvents";
import { isNativeApp } from "@/lib/nativeApp";
import { supabase } from "@/lib/supabaseClient";

/**
 * Bible Buddy Match measurement (Louis, 2026-11-22: "we need analytics for the
 * game to track if people are using it for real, where and how"). Every event
 * carries where it was played (iPhone app, Android app, web on a phone or a
 * computer); the board events carry which board and how it went. Read by the
 * Features tab (lib/newFeaturesReport.ts, "Bible Buddy Match").
 */
let cachedUserId: string | null | undefined;

async function userId(): Promise<string | null> {
  if (cachedUserId !== undefined) return cachedUserId;
  const { data } = await supabase.auth.getUser();
  cachedUserId = data.user?.id ?? null;
  return cachedUserId;
}

/** "ios-app", "android-app", "web-phone" or "web-desktop". */
export function matchPlatform(): string {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /Android/.test(ua);
  if (isNativeApp()) return ios ? "ios-app" : android ? "android-app" : "app";
  return ios || android || /Mobile/.test(ua) ? "web-phone" : "web-desktop";
}

export function trackMatch(event: FeatureEventName, metadata: Record<string, unknown> = {}) {
  // Plays on a local dev server (tests) never count in the live numbers.
  if (process.env.NODE_ENV === "development") return;
  void userId().then((id) => trackFeatureEvent(event, id, { platform: matchPlatform(), ...metadata }));
}
