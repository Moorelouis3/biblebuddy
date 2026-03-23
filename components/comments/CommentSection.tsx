"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { triggerSmokeDelete } from "@/components/SmokeDeleteEffect";
import { getUsername } from "@/lib/profileStats";
import UserBadge from "@/components/UserBadge";
import LevelBadge from "@/components/LevelBadge";
import { triggerToast } from "@/components/AppToast";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

interface Comment {
  id: string;
  article_slug: string;
  user_id: string;
  user_name: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string | null;
  is_deleted: boolean;
  profile_image_url?: string | null;
  member_badge?: string | null;
  is_paid?: boolean | null;
  current_level?: number | null;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleSlug: string;
  headingText?: string;
  placeholderText?: string;
  submitButtonText?: string;
}

function groupComments(comments: Comment[]): Comment[] {
  const map: Record<string, Comment & { replies: Comment[] }> = {};
  const roots: Comment[] = [];
  comments.forEach((c) => {
    map[c.id] = { ...c, replies: [] };
  });
  comments.forEach((c) => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].replies.push(map[c.id]);
    } else if (!c.parent_id) {
      roots.push(map[c.id]);
    }
  });
  return roots;
}

function timeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diff = (now.getTime() - then.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return then.toLocaleDateString();
}

export default function CommentSection({
  articleSlug,
  headingText = "Comments",
  placeholderText = "Write a comment...",
  submitButtonText = "Post Comment",
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserBadge, setCurrentUserBadge] = useState<string | null>(null);

  const hydrateUser = useCallback(async (userId?: string | null, email?: string | null) => {
    if (!userId) {
      setUser(null);
      setCurrentUserBadge(null);
      return;
    }

    let displayName = "";
    try {
      const profile = await getUsername(userId);
      if (profile && typeof profile.username === "string" && profile.username.trim()) {
        displayName = profile.username.trim();
      } else if (email && typeof email === "string") {
        displayName = email.split("@")[0];
      } else {
        displayName = "Anonymous";
      }
    } catch (err) {
      console.error("[CommentSection] Error fetching username:", err);
      if (email && typeof email === "string") {
        displayName = email.split("@")[0];
      } else {
        displayName = "Anonymous";
      }
    }

    try {
      const { data: profileRow } = await supabase
        .from("profile_stats")
        .select("member_badge")
        .eq("user_id", userId)
        .maybeSingle();
      setCurrentUserBadge(profileRow?.member_badge ?? null);
    } catch {
      setCurrentUserBadge(null);
    }

    setUser({ id: userId, name: displayName });
  }, []);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("article_comments")
      .select("*")
      .eq("article_slug", articleSlug)
      .order("created_at", { ascending: true });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    const rows = (data || []) as Comment[];
    setComments(rows);

    const userIds = [...new Set(rows.map((c) => c.user_id))];
    if (userIds.length === 0) return;
    try {
      const { data: profiles } = await supabase
        .from("profile_stats")
        .select("user_id, profile_image_url, member_badge, is_paid, current_level")
        .in("user_id", userIds);
      if (!profiles || profiles.length === 0) return;
      const profileMap: Record<string, { profile_image_url: string | null; member_badge: string | null; is_paid: boolean; current_level: number | null }> = {};
      profiles.forEach((p) => {
        profileMap[p.user_id] = {
          profile_image_url: p.profile_image_url ?? null,
          member_badge: p.member_badge ?? null,
          is_paid: p.is_paid === true,
          current_level: p.current_level ?? null,
        };
      });
      setComments((prev) =>
        prev.map((c) => ({
          ...c,
          profile_image_url: profileMap[c.user_id]?.profile_image_url ?? null,
          member_badge: profileMap[c.user_id]?.member_badge ?? null,
          is_paid: profileMap[c.user_id]?.is_paid ?? false,
          current_level: profileMap[c.user_id]?.current_level ?? null,
        })),
      );
    } catch {
      // Profile enrichment failed; comments still render.
    }
  }, [articleSlug]);

  useEffect(() => {
    if (typeof window === "undefined" || comments.length === 0) return;
    const hash = window.location.hash;
    if (!hash.startsWith("#comment-")) return;
    const targetId = hash.slice(1);

    function tryScroll(attemptsLeft: number) {
      const el = document.getElementById(targetId);
      if (!el) {
        if (attemptsLeft > 0) setTimeout(() => tryScroll(attemptsLeft - 1), 200);
        return;
      }
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.transition = "background-color 0.3s ease";
      el.style.backgroundColor = "#dbeafe";
      setTimeout(() => {
        el.style.backgroundColor = "";
        setTimeout(() => {
          el.style.transition = "";
        }, 600);
      }, 2500);
    }

    const timer = setTimeout(() => tryScroll(5), 150);
    return () => clearTimeout(timer);
  }, [comments]);

  useEffect(() => {
    void fetchComments();
    void (async () => {
      const [{ data: userData }, { data: sessionData }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession(),
      ]);

      const authUser = userData.user ?? sessionData.session?.user ?? null;
      await hydrateUser(authUser?.id ?? null, authUser?.email ?? null);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await hydrateUser(session?.user?.id ?? null, session?.user?.email ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchComments, hydrateUser]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("article_comments").insert({
      id: uuidv4(),
      article_slug: articleSlug,
      user_id: user.id,
      user_name: user.name,
      content,
      parent_id: replyTo,
    });
    setLoading(false);
    setContent("");
    setReplyTo(null);
    if (error) setError(error.message);
    else {
      triggerToast("Comment posted!");
      void fetchComments();
    }
  };

  const handleDelete = async (id: string) => {
    triggerSmokeDelete();
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/comments/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kind: "article_comment",
          commentId: id,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not delete comment.");
      }

      void fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete comment.");
    }
    setLoading(false);
  };

  const renderComments = (items: Comment[], depth = 0) =>
    items.length === 0
      ? null
      : items.map((c) => (
          <div
            key={c.id}
            id={`comment-${c.id}`}
            className={`flex gap-3 py-4 ${
              depth > 0 ? "rounded-md border-l-2 border-blue-100 bg-blue-50/40 pl-4" : "border-b border-gray-200"
            } transition-all`}
          >
            <a href={`/profile/${c.user_id}`} className="flex-shrink-0">
              {c.profile_image_url ? (
                <img src={c.profile_image_url} alt={c.user_name} className="h-10 w-10 rounded-full object-cover transition hover:opacity-80" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-lg font-bold text-blue-700 transition hover:opacity-80">
                  {c.user_name.charAt(0).toUpperCase()}
                </div>
              )}
            </a>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <a href={`/profile/${c.user_id}`} className="font-semibold text-blue-900 hover:underline">
                  {c.user_name}
                </a>
                <LevelBadge currentLevel={c.current_level} />
                <UserBadge customBadge={c.member_badge} isPaid={c.is_paid === true} />
                <span className="text-xs text-gray-400">{timeAgo(c.created_at)}</span>
              </div>
              <div className="mb-2 whitespace-pre-line leading-relaxed text-gray-800">{c.content}</div>
              <div className="mt-1 flex gap-3 text-sm">
                {user && (user.id === c.user_id || currentUserBadge === "moderator") && (
                  <button className="text-red-500 transition hover:text-red-700 hover:underline" onClick={() => void handleDelete(c.id)}>
                    Delete
                  </button>
                )}
                <button className="text-blue-500 transition hover:text-blue-700 hover:underline" onClick={() => setReplyTo(c.id)}>
                  Reply
                </button>
              </div>
              {replyTo === c.id && (
                <form onSubmit={handlePost} className="mt-3 flex flex-col gap-2">
                  <textarea
                    className="w-full rounded-lg border border-blue-200 p-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={2}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a reply..."
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
                      disabled={loading || !content.trim()}
                    >
                      {loading ? "Posting..." : "Post Reply"}
                    </button>
                    <button
                      type="button"
                      className="text-sm text-gray-500 hover:underline"
                      onClick={() => {
                        setReplyTo(null);
                        setContent("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              {c.replies && c.replies.length > 0 && <div className="mt-2">{renderComments(c.replies, depth + 1)}</div>}
            </div>
          </div>
        ));

  return (
    <section className="mt-0">
      <div className="mx-auto max-w-2xl rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-sm md:p-8">
        <h2 className="mb-2 text-xl font-bold text-blue-900">{headingText}</h2>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        {user && !replyTo && (
          <form onSubmit={handlePost} className="mb-2 flex flex-col gap-2">
            <textarea
              className="w-full rounded-lg border border-blue-200 p-3 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholderText}
              required
            />
            <button
              type="submit"
              className="self-end rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60"
              disabled={loading || !content.trim()}
            >
              {loading ? "Posting..." : submitButtonText}
            </button>
          </form>
        )}
        <div>
          {comments.length === 0 ? (
            <div className="py-8 text-center text-base text-gray-400">No comments yet. Be the first to share your reflection.</div>
          ) : (
            renderComments(groupComments(comments))
          )}
        </div>
        {!user && <div className="mt-4 text-center text-sm text-gray-500">Sign in to comment.</div>}
      </div>
    </section>
  );
}
