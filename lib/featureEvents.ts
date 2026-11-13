"use client";

/**
 * Small "somebody opened this" events for new features (2026-11-13).
 *
 * The games already record what people DO in them (saved verses, finished
 * sessions, found words). What they did not record is somebody arriving and
 * leaving without doing anything, or which of four buttons a verse was saved
 * from - and without those, "nobody uses it" and "nobody finds it" look the
 * same. These events fill exactly that gap and nothing more.
 *
 * They go through the existing /api/landing-analytics route into
 * landing_page_events, the same place the popups report to, and are read back
 * by lib/newFeaturesReport.ts for the Features tab on /admin/analytics.
 * Every name used here must be in that route's ALLOWED_EVENTS or it is
 * rejected.
 *
 * Never awaited and never allowed to throw: analytics must not slow down or
 * break the thing it is measuring.
 */

export type FeatureEventName = "bible_memory_opened" | "bible_memory_verse_saved" | "word_search_opened";

/** Where "Add to Bible Memory" was tapped. */
export type MemorySaveSource = "daily_verse_card" | "daily_verse_popup" | "reader" | "picker" | "word_search";

export function trackFeatureEvent(
  eventName: FeatureEventName,
  userId: string | null | undefined,
  metadata: Record<string, unknown> = {},
) {
  if (typeof window === "undefined" || !userId) return;
  try {
    // Absolute URL: inside the iOS app a relative fetch can hang forever.
    void fetch(`${window.location.origin}/api/landing-analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "app",
        page_path: window.location.pathname,
        referrer: null,
        metadata,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Not worth surfacing.
  }
}
