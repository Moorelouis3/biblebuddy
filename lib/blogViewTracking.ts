function getBlogSessionId() {
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
