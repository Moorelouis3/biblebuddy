"use client";

/**
 * One group post's reply thread, embeddable outside the group feed
 * (2026-09-22, Wisdom of Proverbs community study). The devotional day's
 * discussion IS the replies on that day's Bible Buddy group post, so a
 * comment made here or in the group shows in both places - stored once as a
 * group_posts reply. Inserts, deletes, gating, report/block and blocked-user
 * hiding mirror the group feed's comment thread
 * (app/study-groups/[id]/chat/page.tsx, GroupPostComments).
 */

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useAccountGate } from "@/components/AccountRequiredModal";
import ReportBlockMenu from "@/components/ReportBlockMenu";
import { useBlockedUserIds } from "@/lib/userBlocks";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { eventDayDiscussionPath } from "@/lib/communityEventDays";

type ThreadReply = {
  id: string;
  user_id: string;
  display_name: string | null;
  content: string;
  created_at: string;
  parent_post_id: string | null;
  profile_image_url: string | null;
};

type Props = {
  postId: string;
  groupId: string;
  placeholderText?: string;
  submitButtonText?: string;
  /** Fired after the signed-in user posts a reply. */
  onPosted?: () => void;
  /** Fired once on load when the signed-in user already has a reply here. */
  onUserHasPosted?: () => void;
};

const REPLY_FIELDS = "id, user_id, display_name, content, created_at, parent_post_id";

function timeAgo(value: string) {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(value).toLocaleDateString();
}

function initialOf(name: string) {
  return (name.trim()[0] || "B").toUpperCase();
}

function Avatar({ name, url, small }: { name: string; url: string | null; small?: boolean }) {
  const size = small ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs";
  return url ? (
    <img src={url} alt={name} className={`${size} shrink-0 rounded-full object-cover`} />
  ) : (
    <div className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[var(--bb-accent,#2f7fe8)] font-bold text-white`}>
      {initialOf(name)}
    </div>
  );
}

export default function GroupPostThread({
  postId,
  groupId,
  placeholderText = "Share your thoughts...",
  submitButtonText = "Post",
  onPosted,
  onUserHasPosted,
}: Props) {
  const { ensureFullAccount, accountGateModal } = useAccountGate("join the discussion");
  const blockedUserIds = useBlockedUserIds();
  const [userId, setUserId] = useState<string | null>(null);
  const [me, setMe] = useState<{ display_name: string; profile_image_url: string | null; can_moderate: boolean }>({
    display_name: "Buddy",
    profile_image_url: null,
    can_moderate: false,
  });
  const [category, setCategory] = useState<string | null>(null);
  const [replies, setReplies] = useState<ThreadReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ThreadReply | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadThread = useCallback(async () => {
    const { data: parent } = await supabase
      .from("group_posts")
      .select("category")
      .eq("id", postId)
      .maybeSingle();
    setCategory((parent as { category?: string } | null)?.category ?? null);

    // Direct replies, then every reply under them (same walk as the group feed).
    const { data: topLevel } = await supabase
      .from("group_posts")
      .select(REPLY_FIELDS)
      .eq("group_id", groupId)
      .eq("parent_post_id", postId)
      .order("created_at", { ascending: true });
    let allRows = (topLevel || []) as Omit<ThreadReply, "profile_image_url">[];
    let parentIds = allRows.map((row) => row.id);
    while (parentIds.length > 0) {
      const { data } = await supabase
        .from("group_posts")
        .select(REPLY_FIELDS)
        .in("parent_post_id", parentIds)
        .order("created_at", { ascending: true });
      const newRows = (data || []) as Omit<ThreadReply, "profile_image_url">[];
      if (newRows.length === 0) break;
      allRows = [...allRows, ...newRows];
      parentIds = newRows.map((row) => row.id);
    }

    const userIds = [...new Set(allRows.map((row) => row.user_id))];
    const imageMap = new Map<string, string | null>();
    const nameMap = new Map<string, string>();
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", userIds);
      (
        (profiles || []) as Array<{
          user_id: string;
          display_name: string | null;
          username: string | null;
          profile_image_url: string | null;
        }>
      ).forEach((profile) => {
        imageMap.set(profile.user_id, profile.profile_image_url ?? null);
        const name = profile.display_name || profile.username;
        if (name) nameMap.set(profile.user_id, name);
      });
    }

    setReplies(
      allRows.map((row) => ({
        ...row,
        display_name: row.display_name || nameMap.get(row.user_id) || "Buddy",
        profile_image_url: imageMap.get(row.user_id) ?? null,
      })),
    );
    setLoading(false);
    return allRows;
  }, [groupId, postId]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id ?? null;
      if (cancelled) return;
      setUserId(uid);

      if (uid) {
        const [{ data: profile }, { data: membership }] = await Promise.all([
          supabase
            .from("profile_stats")
            .select("display_name, username, profile_image_url, member_badge")
            .eq("user_id", uid)
            .maybeSingle(),
          supabase
            .from("group_members")
            .select("role")
            .eq("group_id", groupId)
            .eq("user_id", uid)
            .eq("status", "approved")
            .maybeSingle(),
        ]);
        if (cancelled) return;
        const metaName =
          (auth.user?.user_metadata?.firstName as string | undefined) ||
          (auth.user?.user_metadata?.first_name as string | undefined);
        setMe({
          display_name: profile?.display_name || profile?.username || metaName || "Buddy",
          profile_image_url: profile?.profile_image_url ?? null,
          can_moderate:
            profile?.member_badge === "moderator" || membership?.role === "leader" || membership?.role === "moderator",
        });
      }

      const rows = await loadThread();
      if (!cancelled && uid && onUserHasPosted && rows.some((row) => row.user_id === uid)) {
        onUserHasPosted();
      }
    })();
    return () => {
      cancelled = true;
    };
    // onUserHasPosted is a fresh closure each parent render; run once per thread.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, postId, loadThread]);

  // Live updates: new direct replies from the group feed show up here too.
  useEffect(() => {
    const channel = supabase
      .channel(`group-post-thread-${postId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "group_posts", filter: `parent_post_id=eq.${postId}` },
        () => {
          void loadThread();
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [postId, loadThread]);

  async function submitReply(content: string, parentId: string | null) {
    const text = content.trim();
    if (!text || submitting) return;
    // Replying requires a real account - name, email, profile picture (same gate as the group).
    if (!(await ensureFullAccount())) return;

    // The gate may have just finished a guest's account, so read identity fresh.
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id ?? null;
    if (!uid) {
      setError("Sign in to join the discussion.");
      return;
    }
    let displayName = me.display_name;
    let profileImage = me.profile_image_url;
    if (uid !== userId || displayName === "Buddy") {
      const { data: profile } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url")
        .eq("user_id", uid)
        .maybeSingle();
      displayName =
        profile?.display_name ||
        profile?.username ||
        (auth.user?.user_metadata?.firstName as string | undefined) ||
        (auth.user?.user_metadata?.first_name as string | undefined) ||
        "Buddy";
      profileImage = profile?.profile_image_url ?? null;
      setUserId(uid);
      setMe((prev) => ({ ...prev, display_name: displayName, profile_image_url: profileImage }));
    }

    setSubmitting(true);
    setError(null);

    let replyCategory = category;
    if (!replyCategory) {
      const { data: parent } = await supabase.from("group_posts").select("category").eq("id", postId).maybeSingle();
      replyCategory = (parent as { category?: string } | null)?.category ?? null;
    }

    // Same insert the group feed uses for comments, so the thread-activity
    // triggers and notifications behave identically.
    const { data: inserted, error: insertError } = await supabase
      .from("group_posts")
      .insert({
        group_id: groupId,
        user_id: uid,
        display_name: displayName,
        category: replyCategory,
        content: text,
        parent_post_id: parentId ?? postId,
      })
      .select("id, created_at")
      .single();

    if (insertError) {
      setError(insertError.message || "Could not post your reply.");
      setSubmitting(false);
      return;
    }

    setReplies((prev) => [
      ...prev,
      {
        id: inserted?.id ?? crypto.randomUUID(),
        user_id: uid,
        display_name: displayName,
        content: text,
        created_at: inserted?.created_at ?? new Date().toISOString(),
        parent_post_id: parentId ?? postId,
        profile_image_url: profileImage,
      },
    ]);
    void logActionToMasterActions(uid, "group_message_sent", `group-post:${postId}`);
    if (parentId) {
      setReplyText("");
      setReplyingTo(null);
    } else {
      setNewReply("");
    }
    setSubmitting(false);
    onPosted?.();
  }

  async function deleteReply(reply: ThreadReply) {
    if (deletingId) return;
    setDeletingId(reply.id);
    setError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) throw new Error("Could not verify your session.");

      const response = await fetch("/api/comments/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ kind: "group_feed_comment", commentId: reply.id }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Could not delete this comment.");

      const deletedIds = new Set<string>((payload.deletedIds || []) as string[]);
      if (deletedIds.size === 0) deletedIds.add(reply.id);
      setReplies((prev) => prev.filter((item) => !deletedIds.has(item.id)));
      if (replyingTo && deletedIds.has(replyingTo)) {
        setReplyingTo(null);
        setReplyText("");
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete this comment.");
    }
    setDeletingId(null);
  }

  // Blocked users' comments (and replies under them) are hidden, like the group feed.
  const visible = blockedUserIds.size > 0 ? replies.filter((reply) => !blockedUserIds.has(reply.user_id)) : replies;
  const topLevel = visible.filter((reply) => reply.parent_post_id === postId);
  const childrenOf = (parentId: string) => visible.filter((reply) => reply.parent_post_id === parentId);

  function renderReply(reply: ThreadReply, depth: number): ReactNode {
    const name = reply.display_name || "Buddy";
    const canDelete = Boolean(userId) && (reply.user_id === userId || me.can_moderate);
    return (
      <div
        key={reply.id}
        id={`thread-reply-${reply.id}`}
        className={depth > 0 ? "mt-3 border-l border-[var(--bb-card-border,#e8ddd0)] pl-3" : "mt-4"}
      >
        <div className="flex gap-2.5">
          <Link href={`/profile/${reply.user_id}`} className="mt-0.5">
            <Avatar name={name} url={reply.profile_image_url} small={depth > 0} />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <Link href={`/profile/${reply.user_id}`} className="text-sm font-bold text-[var(--bb-text-primary,#111827)] hover:underline">
                {name}
              </Link>
              <span className="text-[11px] text-[var(--bb-text-muted,#9ca3af)]">{timeAgo(reply.created_at)}</span>
            </div>
            <p className="mt-0.5 whitespace-pre-wrap text-sm leading-6 text-[var(--bb-text-secondary,#374151)]">{reply.content}</p>
            <div className="mt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setReplyingTo(replyingTo === reply.id ? null : reply.id);
                  setReplyText("");
                }}
                className="text-[11px] font-semibold text-[var(--bb-text-muted,#9ca3af)] transition hover:text-[var(--bb-accent,#2f7fe8)]"
              >
                Reply
              </button>
              {canDelete && (
                <button
                  type="button"
                  onClick={() => setPendingDelete(reply)}
                  disabled={deletingId === reply.id}
                  className="text-[11px] font-semibold text-[var(--bb-text-muted,#9ca3af)] transition hover:text-red-500 disabled:opacity-50"
                >
                  {deletingId === reply.id ? "Deleting..." : "Delete"}
                </button>
              )}
              {reply.user_id !== userId && (
                <ReportBlockMenu
                  targetUserId={reply.user_id}
                  targetName={name}
                  contentType="group_comment"
                  contentId={reply.id}
                  currentUserId={userId}
                  size="sm"
                  align="left"
                  className="-ml-1.5"
                />
              )}
            </div>
            {replyingTo === reply.id && (
              <div className="mt-2 flex items-end gap-2">
                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  placeholder={`Reply to ${name}...`}
                  rows={1}
                  autoFocus
                  className="flex-1 resize-none rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-white px-3 py-2 text-sm text-[var(--bb-text-primary,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--bb-accent,#2f7fe8)]/30"
                />
                <button
                  type="button"
                  onClick={() => void submitReply(replyText, reply.id)}
                  disabled={!replyText.trim() || submitting}
                  className="shrink-0 rounded-xl bg-[var(--bb-accent,#2f7fe8)] px-3 py-2 text-xs font-semibold text-white transition disabled:opacity-40"
                >
                  Reply
                </button>
              </div>
            )}
            {childrenOf(reply.id).map((child) => renderReply(child, Math.min(depth + 1, 1)))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {accountGateModal}

      <div className="flex items-end gap-2">
        <textarea
          value={newReply}
          onChange={(event) => setNewReply(event.target.value)}
          placeholder={placeholderText}
          rows={3}
          className="flex-1 resize-none rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-white px-3 py-2.5 text-sm text-[var(--bb-text-primary,#111827)] focus:outline-none focus:ring-2 focus:ring-[var(--bb-accent,#2f7fe8)]/30"
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <Link
          href={eventDayDiscussionPath(groupId, postId)}
          className="text-xs font-semibold text-[var(--bb-accent,#2f7fe8)] hover:underline"
        >
          See this in the Bible Buddy group
        </Link>
        <button
          type="button"
          onClick={() => void submitReply(newReply, null)}
          disabled={!newReply.trim() || submitting}
          className="rounded-full bg-[var(--bb-accent,#2f7fe8)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-40"
        >
          {submitting ? "Posting..." : submitButtonText}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      <div className="mt-2">
        {loading ? (
          <p className="py-3 text-center text-xs text-[var(--bb-text-muted,#9ca3af)]">Loading discussion...</p>
        ) : topLevel.length === 0 ? (
          <p className="py-3 text-center text-xs text-[var(--bb-text-muted,#9ca3af)]">No replies yet. Start the conversation.</p>
        ) : (
          topLevel.map((reply) => renderReply(reply, 0))
        )}
      </div>

      {pendingDelete && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[230] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPendingDelete(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-[var(--bb-card-border)] bg-[var(--bb-card,#ffffff)] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="text-lg font-black text-[var(--bb-text-primary,#111827)]">Delete this comment?</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              This removes it here and in the Bible Buddy group, along with any replies under it. This can&apos;t be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="flex-1 rounded-2xl border border-[var(--bb-card-border)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const reply = pendingDelete;
                  setPendingDelete(null);
                  void deleteReply(reply);
                }}
                className="flex-1 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
