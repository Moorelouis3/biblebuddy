"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { requestAutoReplyDraft } from "../../lib/requestAutoReplyDraft";

type CommentKind =
  | "article_comment"
  | "feed_post_comment"
  | "group_feed_comment"
  | "series_post_comment"
  | "series_reflection";

type AdminComment = {
  id: string;
  kind: CommentKind;
  source: string;
  sourceLabel: string;
  href: string;
  contextTitle: string;
  contextContent: string;
  userId: string | null;
  userName: string;
  userImage: string | null;
  userProfileHref: string | null;
  userLevel?: number;
  userBadgeLabel?: string | null;
  userBadgeEmoji?: string | null;
  userBadgeClassName?: string | null;
  content: string;
  createdAt: string;
  replyCount: number;
  hasMyReply: boolean;
  hasModeratorReply?: boolean;
  isMine?: boolean;
};

type CommentStats = {
  total: number;
  today: number;
  myRepliesToday: number;
  needsReply: number;
  signups24h?: number;
  totalUsers?: number;
  bySource: Record<string, number>;
};

type StatusFilter = "needs" | "all" | "replied";

const SOURCE_FILTERS = [
  { value: "All", label: "All" },
  { value: "Bible Chapters", label: "Bible" },
  { value: "Articles", label: "Studies" },
  { value: "Group Feed", label: "Community" },
];

function avatarFallback(name: string) {
  return (name || "B").trim().charAt(0).toUpperCase();
}

function cleanText(value: string | null | undefined, max = 500) {
  const text = String(value || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&rsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function sourceTone(source: string) {
  if (source === "Bible Chapters") return "bg-blue-50 text-blue-700 border-blue-100";
  if (source === "Group Feed") return "bg-emerald-50 text-emerald-700 border-emerald-100";
  return "bg-violet-50 text-violet-700 border-violet-100";
}

function sourceLabel(source: string) {
  if (source === "Bible Chapters") return "Bible";
  if (source === "Group Feed") return "Community";
  return "Study";
}

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [stats, setStats] = useState<CommentStats | null>(null);
  const [moderatorName, setModeratorName] = useState("Moderator");
  const [moderatorImage, setModeratorImage] = useState<string | null>(null);
  const [canAutoReply, setCanAutoReply] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("needs");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [postingId, setPostingId] = useState<string | null>(null);
  const [draftingId, setDraftingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || "";
  }

  async function loadDashboard(nextPage = page) {
    setLoading(true);
    setError(null);
    const token = await getToken();

    if (!token) {
      setError("Sign in as an admin or moderator to view the Moderator Dashboard.");
      setLoading(false);
      return;
    }

    const response = await fetch(
      `/api/comments/admin?limit=40&page=${nextPage}&tzOffset=${new Date().getTimezoneOffset()}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      setError(payload?.error || "Could not load the Moderator Dashboard.");
      setLoading(false);
      return;
    }

    setComments(payload.comments || []);
    setStats(payload.stats || null);
    setModeratorName(payload.moderator?.name || "Moderator");
    setModeratorImage(payload.moderator?.image || null);
    setCanAutoReply(Boolean(payload.moderator?.canAutoReply));
    setLoading(false);
  }

  useEffect(() => {
    void loadDashboard(page);
  }, [page]);

  const filteredComments = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return comments.filter((comment) => {
      const isReplied = Boolean(comment.hasModeratorReply || comment.hasMyReply);
      if (statusFilter === "needs" && isReplied) return false;
      if (statusFilter === "replied" && !isReplied) return false;
      if (sourceFilter !== "All" && comment.source !== sourceFilter) return false;
      if (!needle) return true;
      return [comment.userName, comment.content, comment.sourceLabel, comment.contextTitle, comment.contextContent]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [comments, search, sourceFilter, statusFilter]);

  async function draftAutoReply(comment: AdminComment) {
    const key = `${comment.kind}-${comment.id}`;
    setReplyingTo(key);
    setDraftingId(comment.id);
    setStatusMessage(null);
    try {
      const draft = await requestAutoReplyDraft({
        originalPostTitle: cleanText(comment.contextTitle || comment.sourceLabel, 140),
        originalPostContent: cleanText(comment.contextContent || `${comment.source}: ${comment.sourceLabel}`, 900),
        targetCommentContent: cleanText(comment.content, 900),
        targetDisplayName: comment.userName,
      });
      setReplyText(draft);
      setStatusMessage("Reply drafted. Review it, edit if needed, then send.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Could not draft an auto reply.");
    } finally {
      setDraftingId(null);
    }
  }

  async function submitReply(comment: AdminComment) {
    if (!replyText.trim()) return;
    setPostingId(comment.id);
    setStatusMessage(null);
    const token = await getToken();
    const response = await fetch("/api/comments/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        kind: comment.kind,
        targetId: comment.id,
        content: replyText.trim(),
      }),
    });
    const payload = await response.json().catch(() => null);
    setPostingId(null);

    if (!response.ok) {
      setStatusMessage(payload?.error || "Could not post reply.");
      return;
    }

    setComments((current) =>
      current.map((item) =>
        item.id === comment.id && item.kind === comment.kind
          ? { ...item, hasModeratorReply: true, hasMyReply: true, replyCount: item.replyCount + 1 }
          : item,
      ),
    );
    setStats((current) =>
      current
        ? {
            ...current,
            myRepliesToday: current.myRepliesToday + 1,
            needsReply: Math.max(0, current.needsReply - 1),
          }
        : current,
    );
    setReplyingTo(null);
    setReplyText("");
    setStatusMessage("Reply sent. That comment is marked as replied.");
  }

  const statCards = [
    { label: "New Users Today", value: stats?.signups24h ?? 0 },
    { label: "Total Users", value: stats?.totalUsers ?? 0 },
    { label: "New Comments Today", value: stats?.today ?? 0 },
    { label: "Comments Needing Reply", value: stats?.needsReply ?? 0, click: () => setStatusFilter("needs") },
    { label: "Your Replies Today", value: stats?.myRepliesToday ?? 0, click: () => setStatusFilter("replied") },
  ];

  const repliesToday = stats?.myRepliesToday ?? 0;

  return (
    <main className="min-h-screen bg-[#f7faf5] px-4 py-6 text-slate-950 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-[30px] border border-emerald-100 bg-white p-5 shadow-[0_18px_45px_rgba(54,83,64,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50 text-xl font-black text-emerald-700">
                {moderatorImage ? <img src={moderatorImage} alt="" className="h-full w-full object-cover" /> : avatarFallback(moderatorName)}
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Community Inbox</p>
                <h1 className="text-2xl font-black">Welcome back, {moderatorName}.</h1>
                <p className="mt-1 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                  Help encourage the BibleBuddy community through thoughtful replies and guidance.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void loadDashboard()}
              className="h-11 rounded-full bg-emerald-600 px-5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700"
            >
              Refresh Inbox
            </button>
          </div>
        </section>

        <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {statCards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={card.click}
              className="rounded-[22px] border border-slate-100 bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200"
            >
              <p className="text-3xl font-black text-slate-950">{Number(card.value || 0).toLocaleString()}</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-slate-500">{card.label}</p>
            </button>
          ))}
        </section>

        <section className="mt-4 overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-[0_18px_45px_rgba(54,83,64,0.08)]">
          <div className="border-b border-slate-100 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Live Comment Queue</p>
                <h2 className="mt-1 text-2xl font-black">Comments needing encouragement</h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
                  Reply from one calm inbox across Bible studies, reflections, topics, and community posts.
                </p>
              </div>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search comments"
                className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ["needs", "Needs Reply"],
                ["all", "Newest"],
                ["replied", "Replied"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatusFilter(value as StatusFilter)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    statusFilter === value ? "bg-emerald-600 text-white shadow-sm" : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  }`}
                >
                  {label}
                </button>
              ))}
              {SOURCE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setSourceFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    sourceFilter === filter.value ? "bg-[#7BAFD4] text-slate-950 shadow-sm" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {statusMessage ? (
            <p className="mx-4 mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-sm font-bold text-emerald-800">
              {statusMessage}
            </p>
          ) : null}

          {loading ? (
            <div className="p-10 text-center text-sm font-semibold text-slate-500">Loading community inbox...</div>
          ) : error ? (
            <div className="p-10 text-center text-sm font-semibold text-red-600">{error}</div>
          ) : filteredComments.length === 0 ? (
            <div className="p-10 text-center text-sm font-semibold text-slate-500">No comments found for this filter.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredComments.map((comment) => {
                const key = `${comment.kind}-${comment.id}`;
                const isReplied = Boolean(comment.hasModeratorReply || comment.hasMyReply);
                const replyOpen = replyingTo === key;

                return (
                  <article key={key} className="p-4 transition hover:bg-[#fbfdf9]">
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-sm font-black text-[#2f6685]">
                        {comment.userImage ? <img src={comment.userImage} alt="" className="h-full w-full object-cover" /> : avatarFallback(comment.userName)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-black">{comment.userName || "Bible Buddy"}</p>
                          <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-black text-blue-700">
                            L{comment.userLevel ?? 1}
                          </span>
                          {comment.userBadgeLabel ? (
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${comment.userBadgeClassName || "bg-slate-100 text-slate-700"}`}>
                              {comment.userBadgeEmoji ? `${comment.userBadgeEmoji} ` : ""}
                              {comment.userBadgeLabel}
                            </span>
                          ) : null}
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-black ${sourceTone(comment.source)}`}>
                            {sourceLabel(comment.source)}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-black ${isReplied ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                            {isReplied ? "Replied" : "Needs reply"}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {cleanText(comment.sourceLabel, 92)} - {formatTime(comment.createdAt)}
                        </p>
                        <p className="mt-3 whitespace-pre-wrap text-[15px] font-semibold leading-7 text-slate-900">
                          {cleanText(comment.content, 900) || "No comment text"}
                        </p>

                        <div className="mt-3 rounded-2xl border border-slate-100 bg-[#fbfcf8] px-3 py-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Source Location</p>
                          <p className="mt-1 text-sm font-black text-slate-800">{cleanText(comment.contextTitle || comment.sourceLabel, 130)}</p>
                          {comment.contextContent ? (
                            <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
                              {cleanText(comment.contextContent, 240)}
                            </p>
                          ) : null}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {canAutoReply ? (
                            <button
                              type="button"
                              onClick={() => void draftAutoReply(comment)}
                              disabled={draftingId === comment.id}
                              className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
                            >
                              {draftingId === comment.id ? "Writing..." : "Auto Reply"}
                            </button>
                          ) : null}
                          <button
                            type="button"
                            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-lg font-black text-slate-500 transition hover:bg-slate-50"
                            aria-label="More options"
                            title="More options"
                          >
                            ...
                          </button>
                        </div>

                        {replyOpen ? (
                          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
                            <label className="text-sm font-black text-slate-900">Auto reply preview</label>
                            <textarea
                              value={replyText}
                              onChange={(event) => setReplyText(event.target.value)}
                              rows={4}
                              placeholder="BibleBuddy will draft a warm reply here..."
                              className="mt-2 w-full resize-none rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold leading-6 outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
                            />
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => void submitReply(comment)}
                                disabled={postingId === comment.id || !replyText.trim()}
                                className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-black text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
                              >
                                {postingId === comment.id ? "Sending..." : "Send"}
                              </button>
                              <button
                                type="button"
                                onClick={() => void draftAutoReply(comment)}
                                disabled={draftingId === comment.id}
                                className="rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-black text-emerald-800 hover:bg-emerald-50 disabled:opacity-60"
                              >
                                Regenerate
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText("");
                                }}
                                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-black text-slate-600 hover:bg-slate-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 p-4">
            <button
              type="button"
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              disabled={page === 0}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 disabled:opacity-40"
            >
              Previous
            </button>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Page {page + 1}</p>
            <button
              type="button"
              onClick={() => setPage((value) => value + 1)}
              disabled={comments.length < 40}
              className="rounded-full bg-[#7BAFD4] px-4 py-2 text-sm font-black text-slate-950 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>

        <section className="mt-4 rounded-[30px] border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Thank You</p>
          <h2 className="mt-1 text-xl font-black">
            You replied to {repliesToday.toLocaleString()} {repliesToday === 1 ? "comment" : "comments"} today.
          </h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            Thank you for helping build an encouraging BibleBuddy community. A gentle reply can help someone keep showing up to Scripture.
          </p>
          <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black leading-6 text-emerald-900">
            "Encourage one another and build one another up." - 1 Thessalonians 5:11
          </p>
        </section>
      </div>
    </main>
  );
}
