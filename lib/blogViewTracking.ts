import { supabase } from "./supabaseClient";
import { logActionToMasterActions } from "./actionRecorder";

export function getBlogSessionId() {
  if (typeof window === "undefined") return "server";
  const key = "bb:blog-session-id";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(key, next);
  return next;
}

export function trackBlogPageView(articleSlug: string) {
  if (typeof window === "undefined" || !articleSlug) return;

  const payload = {
    article_slug: articleSlug,
    session_id: getBlogSessionId(),
    referrer: document.referrer || null,
  };

  void fetch("/api/blog/track-view", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    console.error("Blog view tracking failed:", error);
  });
}

// Also record the read in master_actions so it shows up in the Action Log on
// the analytics page next to the rest of a user's activity ("Viewed blog post:
// Moses"). Separate from trackBlogPageView, which counts every view including
// anonymous ones: master_actions is keyed by user_id, so only signed in
// readers can be logged here. Blog traffic is mostly logged out, so this is a
// slice of the view count, not a replacement for it.
//
// Logged once per post per browser session, so scrolling back up or
// navigating away and returning does not flood the log.
export async function logBlogViewToMasterActions(articleSlug: string, title: string) {
  if (typeof window === "undefined" || !articleSlug) return;

  const seenKey = `bb:blog-view-logged:${articleSlug}`;
  try {
    if (window.sessionStorage.getItem(seenKey)) return;
  } catch {
    // Storage unavailable: fall through and log, a duplicate beats a silent miss.
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await logActionToMasterActions(user.id, "blog_post_viewed", `Viewed blog post: ${title}`, null, {
      sessionId: getBlogSessionId(),
      eventMetadata: { article_slug: articleSlug, title },
    });

    // Only mark it seen once the write actually landed. logActionToMasterActions
    // rethrows, so until the CHECK constraint migration has been run every
    // insert fails - flagging before the write would mean nothing logged until
    // readers started a fresh session after the migration.
    try {
      window.sessionStorage.setItem(seenKey, "1");
    } catch {
      // Non blocking.
    }
  } catch (error) {
    console.error("Blog view action logging failed:", error);
  }
}

export type BlogPromoEvent = {
  eventType: "impression" | "click";
  promo: string;
  postSlug: string;
  slotIndex: number;
};

export function trackBlogPromoEvent(event: BlogPromoEvent) {
  if (typeof window === "undefined") return;

  void fetch("/api/blog/track-promo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: event.eventType,
      promo: event.promo,
      post_slug: event.postSlug,
      slot_index: event.slotIndex,
      session_id: getBlogSessionId(),
    }),
    keepalive: true,
  }).catch((error) => {
    console.error("Blog promo tracking failed:", error);
  });
}
