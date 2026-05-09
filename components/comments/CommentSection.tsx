"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { triggerSmokeDelete } from "@/components/SmokeDeleteEffect";
import { getUsername } from "@/lib/profileStats";
import UserBadge from "@/components/UserBadge";
import LevelBadge from "@/components/LevelBadge";
import StreakFlameBadge from "@/components/StreakFlameBadge";
import { triggerToast } from "@/components/AppToast";
import TextareaMentionInput from "@/components/TextareaMentionInput";
import MentionText from "@/components/MentionText";
import { requestAutoReplyDraft } from "@/lib/requestAutoReplyDraft";
import {
  extractMentionedItemsFromText,
  loadGroupPostMentions,
  type MentionCatalogItem,
} from "@/lib/groupPostMentions";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

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
  current_streak?: number | null;
  replies?: Comment[];
}

interface CommentSectionProps {
  articleSlug: string;
  headingText?: string;
  placeholderText?: string;
  submitButtonText?: string;
  variant?: "default" | "plain";
  onPosted?: () => void;
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

function avatarColor(seed: string) {
  const palette = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = seed.charCodeAt(index) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

export default function CommentSection({
  articleSlug,
  headingText = "Comments",
  placeholderText = "Write a comment...",
  submitButtonText = "Post Comment",
  variant = "default",
  onPosted,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserBadge, setCurrentUserBadge] = useState<string | null>(null);
  const [currentUserProfileImage, setCurrentUserProfileImage] = useState<string | null>(null);
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [savingCommentId, setSavingCommentId] = useState<string | null>(null);
  const [mentionItems, setMentionItems] = useState<MentionCatalogItem[]>([]);
  const [autoReplyLoadingId, setAutoReplyLoadingId] = useState<string | null>(null);

  const hydrateUser = useCallback(async (userId?: string | null, email?: string | null) => {
    if (!userId) {
      setUser(null);
      setCurrentUserBadge(null);
      setCurrentUserProfileImage(null);
      setCurrentUserIsAdmin(false);
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
        .select("member_badge, profile_image_url")
        .eq("user_id", userId)
        .maybeSingle();
      setCurrentUserBadge(profileRow?.member_badge ?? null);
      setCurrentUserProfileImage(profileRow?.profile_image_url ?? null);
      setCurrentUserIsAdmin(email === ADMIN_EMAIL);
    } catch {
      setCurrentUserBadge(null);
      setCurrentUserProfileImage(null);
      setCurrentUserIsAdmin(email === ADMIN_EMAIL);
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
        .select("user_id, profile_image_url, member_badge, is_paid, current_level, current_streak")
        .in("user_id", userIds);
      if (!profiles || profiles.length === 0) return;
      const profileMap: Record<string, { profile_image_url: string | null; member_badge: string | null; is_paid: boolean; current_level: number | null; current_streak: number | null }> = {};
      profiles.forEach((p) => {
        profileMap[p.user_id] = {
          profile_image_url: p.profile_image_url ?? null,
          member_badge: p.member_badge ?? null,
          is_paid: p.is_paid === true,
          current_level: p.current_level ?? null,
          current_streak: p.current_streak ?? null,
        };
      });
      setComments((prev) =>
        prev.map((c) => ({
          ...c,
          profile_image_url: profileMap[c.user_id]?.profile_image_url ?? null,
          member_badge: profileMap[c.user_id]?.member_badge ?? null,
          is_paid: profileMap[c.user_id]?.is_paid ?? false,
          current_level: profileMap[c.user_id]?.current_level ?? null,
          current_streak: profileMap[c.user_id]?.current_streak ?? null,
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
      el.style.backgroundColor = "#fff5e8";
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

  useEffect(() => {
    void (async () => {
      try {
        const items = await loadGroupPostMentions(supabase);
        setMentionItems(items);
      } catch (mentionError) {
        console.error("[CommentSection] Could not load mention items:", mentionError);
      }
    })();
  }, []);

  async function notifyMentionedUsers(
    commentId: string,
    text: string,
  ) {
    if (!user) return;

    const mentionedUsers = extractMentionedItemsFromText(text, mentionItems, ["user"])
      .map((item) => {
        const userId = item.key.startsWith("user:") ? item.key.slice(5) : null;
        return userId ? { userId, label: item.label } : null;
      })
      .filter((item): item is { userId: string; label: string } => Boolean(item))
      .filter((item) => item.userId !== user.id);

    if (mentionedUsers.length === 0) return;

    const notificationRows = mentionedUsers.map((mentionedUser) => ({
      user_id: mentionedUser.userId,
      type: "comment_mention",
      from_user_id: user.id,
      from_user_name: user.name,
      article_slug: articleSlug,
      comment_id: commentId,
      message: `${user.name} mentioned you in a comment.`,
    }));

    const { error: notificationError } = await supabase
      .from("notifications")
      .insert(notificationRows);

    if (notificationError) {
      console.error("[CommentSection] Could not send mention notifications:", notificationError);
    }
  }

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;
    setLoading(true);
    const trimmedContent = content.trim();
    const insertedId = uuidv4();
    const { data: insertedComment, error } = await supabase.from("article_comments").insert({
      id: insertedId,
      article_slug: articleSlug,
      user_id: user.id,
      user_name: user.name,
      content: trimmedContent,
      parent_id: replyTo,
    }).select("id").single();
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      const postedCommentId = insertedComment?.id || insertedId;
      setComments((prev) => [
        ...prev,
        {
          id: postedCommentId,
          article_slug: articleSlug,
          user_id: user.id,
          user_name: user.name,
          content: trimmedContent,
          parent_id: replyTo,
          created_at: new Date().toISOString(),
          updated_at: null,
          is_deleted: false,
          profile_image_url: currentUserProfileImage,
          member_badge: currentUserBadge,
          is_paid: null,
          current_level: null,
          current_streak: null,
        },
      ]);
      setContent("");
      setReplyTo(null);
      await notifyMentionedUsers(postedCommentId, trimmedContent);
      triggerToast("Comment posted!");
      onPosted?.();
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

  function canDeleteComment(comment: Comment) {
    return (
      !!user &&
      (
        comment.user_id === user.id ||
        currentUserBadge === "moderator" ||
        currentUserIsAdmin
      )
    );
  }

  function canEditComment(comment: Comment) {
    return !!user && comment.user_id === user.id;
  }

  const handleSaveCommentEdit = async (comment: Comment) => {
    const nextContent = editingCommentText.trim();
    if (!nextContent || savingCommentId) return;

    setSavingCommentId(comment.id);
    setError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/comments/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kind: "article_comment",
          commentId: comment.id,
          content: nextContent,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not save comment.");
      }

      setComments((prev) =>
        prev.map((item) =>
          item.id === comment.id
            ? {
                ...item,
                content: payload.comment?.content ?? nextContent,
                updated_at: payload.comment?.updated_at ?? new Date().toISOString(),
              }
            : item
        )
      );
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save comment.");
    }
    setSavingCommentId(null);
  };

  const handleAutoReply = async (comment: Comment) => {
    if (autoReplyLoadingId) return;
    setAutoReplyLoadingId(comment.id);
    setError(null);
    setReplyTo(comment.id);

    try {
      const draft = await requestAutoReplyDraft({
        originalPostTitle: headingText || articleSlug,
        originalPostContent: `Article: ${articleSlug}`,
        targetCommentContent: comment.content,
        targetDisplayName: comment.user_name,
      });
      setContent(draft);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate a reply draft.");
    }

    setAutoReplyLoadingId(null);
  };

  const renderComments = (items: Comment[], depth = 0) =>
    items.length === 0
      ? null
      : items.map((c) => (
          <div
            key={c.id}
            id={`comment-${c.id}`}
            className={`${depth === 0 ? "mt-4" : "ml-6 mt-3 pl-3 border-l border-[#e8ddd0]"} flex gap-3 transition-all`}
          >
            <Link href={`/profile/${c.user_id}`} className="mt-0.5 flex-shrink-0">
              {c.profile_image_url ? (
                <img src={c.profile_image_url} alt={c.user_name} className="h-8 w-8 rounded-full object-cover transition hover:opacity-80" />
              ) : (
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white transition hover:opacity-80"
                  style={{ backgroundColor: avatarColor(c.user_id) }}
                >
                  {c.user_name.charAt(0).toUpperCase()}
                </div>
              )}
            </Link>
            <div className="min-w-0 flex-1">
              <div
                className={`rounded-2xl border px-3 py-2.5 ${
                  variant === "plain" ? "border-gray-200 bg-white" : "border-[#efe5d9] bg-[#faf7f2]"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={`/profile/${c.user_id}`} className="text-xs font-semibold text-gray-800 hover:underline">
                        {c.user_name}
                      </Link>
                      <StreakFlameBadge currentStreak={c.current_streak} />
                      <LevelBadge currentLevel={c.current_level} />
                      <UserBadge customBadge={c.member_badge} isPaid={c.is_paid === true} />
                      <span className="text-xs text-gray-400">{timeAgo(c.created_at)}</span>
                    </div>
                    {editingCommentId === c.id ? (
                      <div className="mt-2 space-y-2">
                        <TextareaMentionInput
                          className="w-full resize-none rounded-xl border border-[#ead8c4] bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#d6b18b]"
                          rows={3}
                          value={editingCommentText}
                          onChange={setEditingCommentText}
                          mentionItems={mentionItems}
                          placeholder="Edit your comment..."
                          required
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => void handleSaveCommentEdit(c)}
                            disabled={savingCommentId === c.id || !editingCommentText.trim()}
                            className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                            style={{ backgroundColor: "#5a9a5a" }}
                          >
                            {savingCommentId === c.id ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCommentId(null);
                              setEditingCommentText("");
                            }}
                            className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <MentionText
                        text={c.content}
                        items={mentionItems}
                        className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-4 px-1">
                <button
                  className="text-xs font-semibold text-gray-400 transition hover:text-[#b7794d]"
                  onClick={() => {
                    setReplyTo(replyTo === c.id ? null : c.id);
                    setContent("");
                  }}
                >
                  Reply
                </button>
                <button
                  type="button"
                  onClick={() => void handleAutoReply(c)}
                  disabled={autoReplyLoadingId === c.id}
                  className="text-xs font-semibold text-gray-400 transition hover:text-[#4a9b6f] disabled:opacity-50"
                >
                  {autoReplyLoadingId === c.id ? "Writing..." : "Auto Reply"}
                </button>
                {canEditComment(c) && editingCommentId !== c.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingCommentId(c.id);
                      setEditingCommentText(c.content);
                      setReplyTo(null);
                      setContent("");
                    }}
                    className="text-xs font-semibold text-gray-400 transition hover:text-[#4a9b6f]"
                  >
                    Edit
                  </button>
                )}
                {canDeleteComment(c) && (
                  <button
                    type="button"
                    onClick={() => void handleDelete(c.id)}
                    disabled={loading}
                    className="text-xs font-semibold text-gray-400 transition hover:text-red-500 disabled:opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>
              {replyTo === c.id && (
                <form onSubmit={handlePost} className="mt-2 flex items-end gap-2">
                  <TextareaMentionInput
                    className="w-full resize-none rounded-xl border border-[#eadfce] bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d6b18b]"
                    rows={1}
                    value={content}
                    onChange={setContent}
                    mentionItems={mentionItems}
                    onEnterSubmit={() => void handlePost({ preventDefault() {} } as React.FormEvent)}
                    placeholder="Write a reply..."
                    required
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 rounded-xl bg-[#4a9b6f] px-3 py-2 text-sm font-semibold text-white transition disabled:opacity-40"
                    disabled={loading || !content.trim()}
                  >
                    Reply
                  </button>
                </form>
              )}
              {c.replies && c.replies.length > 0 && <div className="mt-2">{renderComments(c.replies, depth + 1)}</div>}
            </div>
          </div>
        ));

  return (
    <section className="mt-0">
      <div className="mx-auto max-w-2xl">
        {headingText ? <h2 className="mb-2 text-xl font-bold text-gray-900">{headingText}</h2> : null}
        {error && <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
        {user && !replyTo && (
          <form
            onSubmit={handlePost}
            className={
              variant === "plain"
                ? "flex items-center gap-3 rounded-2xl border border-green-200 bg-white px-4 py-4 shadow-sm"
                : "flex items-end gap-3"
            }
          >
            {user && (
              <Link href={`/profile/${user.id}`} className="flex-shrink-0">
                {currentUserProfileImage ? (
                  <img
                    src={currentUserProfileImage}
                    alt={user.name}
                    className={`${variant === "plain" ? "h-12 w-12" : "h-9 w-9"} rounded-full object-cover`}
                  />
                ) : (
                  <div
                    className={`flex ${variant === "plain" ? "h-12 w-12" : "h-9 w-9"} items-center justify-center rounded-full text-sm font-bold text-white`}
                    style={{ backgroundColor: avatarColor(user.id) }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </Link>
            )}
            <div
              className={`flex flex-1 items-center gap-2 ${
                variant === "plain" ? "min-h-[44px] bg-white px-0 py-0" : "rounded-2xl bg-gray-100 px-4 py-3"
              }`}
            >
              <TextareaMentionInput
                className={
                  variant === "plain"
                    ? "h-6 max-h-6 min-h-0 flex-1 resize-none overflow-hidden bg-transparent text-base font-semibold leading-6 text-gray-900 placeholder-gray-900 outline-none"
                    : "max-h-28 flex-1 resize-none overflow-hidden bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                }
                rows={1}
                value={content}
                onChange={setContent}
                mentionItems={mentionItems}
                onEnterSubmit={() => void handlePost({ preventDefault() {} } as React.FormEvent)}
                placeholder={placeholderText}
                required
              />
              <button
                type="submit"
                className={`${variant === "plain" ? "h-3.5 w-3.5" : "h-9 w-9"} flex flex-shrink-0 items-center justify-center rounded-full transition disabled:opacity-40`}
                style={{ backgroundColor: "#4a9b6f" }}
                disabled={loading || !content.trim()}
                aria-label={submitButtonText}
              >
                <svg className={`${variant === "plain" ? "hidden" : "h-4 w-4"} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        )}
        <div>
          {comments.length === 0 ? (
            <div
              className={`mt-4 rounded-xl border px-5 py-10 text-center text-sm text-gray-500 ${
                variant === "plain" ? "border-gray-200 bg-white" : "border-dashed border-[#ead8c4] bg-[#fffaf4]"
              }`}
            >
              No comments yet. Be the first to share your reflection.
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">{renderComments(groupComments(comments))}</div>
          )}
        </div>
        {!user && <div className="mt-4 text-center text-sm text-gray-500">Sign in to comment.</div>}
      </div>
    </section>
  );
}
