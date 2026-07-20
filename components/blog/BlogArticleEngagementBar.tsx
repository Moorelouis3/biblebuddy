"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { triggerToast } from "@/components/AppToast";

type BlogArticleEngagementBarProps = {
  articleSlug: string;
  commentsAnchorId?: string;
};

export default function BlogArticleEngagementBar({
  articleSlug,
  commentsAnchorId = "blog-comments",
}: BlogArticleEngagementBarProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!cancelled) setUserId(user?.id ?? null);

      const [likesResult, commentsResult] = await Promise.all([
        supabase.from("blog_article_likes").select("user_id").eq("article_slug", articleSlug),
        supabase
          .from("article_comments")
          .select("id", { count: "exact", head: true })
          .eq("article_slug", articleSlug)
          .eq("is_deleted", false),
      ]);

      if (cancelled) return;

      if (!likesResult.error && likesResult.data) {
        setLikeCount(likesResult.data.length);
        setLiked(Boolean(user?.id && likesResult.data.some((row) => row.user_id === user.id)));
      }

      if (!commentsResult.error && typeof commentsResult.count === "number") {
        setCommentCount(commentsResult.count);
      }

      setLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [articleSlug]);

  async function handleToggleLike() {
    if (loading) return;
    if (!userId) {
      triggerToast("Sign in to like this article.");
      return;
    }

    const wasLiked = liked;
    setLoading(true);
    setLiked(!wasLiked);
    setLikeCount((count) => Math.max(0, count + (wasLiked ? -1 : 1)));

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Please sign in to like this article.");

      const response = await fetch("/api/blog/like", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ articleSlug, liked: !wasLiked }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error || "Could not update like.");

      setLiked(payload.liked === true);
      setLikeCount(Math.max(0, Number(payload.like_count ?? 0)));
    } catch (err) {
      setLiked(wasLiked);
      setLikeCount((count) => Math.max(0, count + (wasLiked ? 1 : -1)));
      triggerToast(err instanceof Error ? err.message : "Could not update like.");
    } finally {
      setLoading(false);
    }
  }

  function scrollToComments() {
    if (typeof document === "undefined") return;
    document.getElementById(commentsAnchorId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mb-6 flex items-center gap-5 rounded-full border border-[#dce7f5] bg-white px-5 py-3 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <button
        type="button"
        onClick={() => void handleToggleLike()}
        disabled={loading}
        className={`flex items-center gap-2 text-sm font-black transition disabled:opacity-60 ${
          liked ? "text-[#e53e3e]" : "text-slate-500 hover:text-[#e53e3e]"
        }`}
        aria-pressed={liked}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.5s-7.5-4.6-10-9.3C.6 8.1 2 4.5 5.6 4c2-.3 3.9.6 5 2.2C11.7 4.6 13.6 3.7 15.6 4c3.6.5 5 4.1 3.6 7.2-2.5 4.7-10 9.3-10 9.3z"
          />
        </svg>
        {loaded ? likeCount : " "} {likeCount === 1 ? "Like" : "Likes"}
      </button>

      <button
        type="button"
        onClick={scrollToComments}
        className="flex items-center gap-2 text-sm font-black text-slate-500 transition hover:text-[#0056fd]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          />
        </svg>
        {loaded ? commentCount : " "} {commentCount === 1 ? "Comment" : "Comments"}
      </button>
    </div>
  );
}
