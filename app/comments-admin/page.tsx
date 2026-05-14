"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
  actions24h?: number;
  signups24h?: number;
  bySource: Record<string, number>;
  bySource24h?: Record<string, number>;
};

type RecentSignup = {
  userId: string;
  name: string;
  image: string | null;
  profileHref: string;
  createdAt: string;
};

type ActiveBuddy = {
  rank: number;
  userId: string;
  name: string;
  image: string | null;
  profileHref: string;
  level: number;
  streak: number;
  totalActions: number;
};

type ActiveBuddiesPage = {
  page: number;
  pageSize: number;
  total: number;
  rows: ActiveBuddy[];
};

const SOURCE_FILTERS = [
  { value: "All", label: "All Sources", short: "All", color: "bg-gray-100 text-gray-700" },
  { value: "Group Feed", label: "Group Feed Posts", short: "Group Feed", color: "bg-emerald-50 text-emerald-700" },
  { value: "Bible Chapters", label: "Bible Chapter Posts", short: "Bible Chapters", color: "bg-sky-50 text-sky-700" },
  { value: "Articles", label: "Article Posts", short: "Articles", color: "bg-violet-50 text-violet-700" },
];

const STATUS_FILTERS = [
  { value: "needs", label: "Needs Reply" },
  { value: "replied", label: "Already Replied" },
  { value: "all", label: "All Comments" },
] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number]["value"];

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

function sourceHref(comment: AdminComment) {
  if (!comment.href) return "/dashboard";
  return comment.href.startsWith("/") ? comment.href : `/${comment.href}`;
}

function sourceLabel(source: string) {
  if (source === "Bible Chapters") return "Bible Chapter";
  if (source === "Group Feed") return "Group Feed";
  return "Article";
}

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [stats, setStats] = useState<CommentStats | null>(null);
  const [recentSignups, setRecentSignups] = useState<RecentSignup[]>([]);
  const [activeBuddies, setActiveBuddies] = useState<ActiveBuddiesPage | null>(null);
  const [moderatorName, setModeratorName] = useState("Moderator");
  const [moderatorImage, setModeratorImage] = useState<string | null>(null);
  const [canAutoReply, setCanAutoReply] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("needs");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [hideMyComments, setHideMyComments] = useState(true);
  const [search, setSearch] = useState("");
  const [showRecentSignups, setShowRecentSignups] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [postingId, setPostingId] = useState<string | null>(null);
  const [draftingId, setDraftingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [buddyPage, setBuddyPage] = useState(0);

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || "";
  }

  async function loadDashboard(page = buddyPage) {
    setLoading(true);
    setError(null);
    const token = await getToken();

    if (!token) {
      setError("Sign in as an admin or moderator to view the Moderator Dashboard.");
      setLoading(false);
      return;
    }

    const response = await fetch(`/api/comments/admin?limit=60&tzOffset=${new Date().getTimezoneOffset()}&buddyPage=${page}&buddyLimit=20`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      setError(payload?.error || "Could not load the Moderator Dashboard.");
      setLoading(false);
      return;
    }

    setComments(payload.comments || []);
    setStats(payload.stats || null);
    setRecentSignups(payload.recentSignups || []);
    setActiveBuddies(payload.activeBuddies || null);
    setModeratorName(payload.moderator?.name || "Moderator");
    setModeratorImage(payload.moderator?.image || null);
    setCanAutoReply(Boolean(payload.moderator?.canAutoReply));
    setLoading(false);
  }

  useEffect(() => {
    void loadDashboard(buddyPage);
  }, [buddyPage]);

  const filteredComments = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return comments.filter((comment) => {
      const isReplied = Boolean(comment.hasModeratorReply || comment.hasMyReply);
      if (hideMyComments && comment.isMine) return false;
      if (statusFilter === "needs" && isReplied) return false;
      if (statusFilter === "replied" && !isReplied) return false;
      if (sourceFilter !== "All" && comment.source !== sourceFilter) return false;
      if (!needle) return true;
      return [comment.userName, comment.content, comment.sourceLabel, comment.contextTitle, comment.contextContent]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [comments, hideMyComments, search, sourceFilter, statusFilter]);

  const sourceCounts = useMemo(() => {
    return comments.reduce<Record<string, number>>((acc, comment) => {
      const isReplied = Boolean(comment.hasModeratorReply || comment.hasMyReply);
      if (hideMyComments && comment.isMine) return acc;
      if (statusFilter === "needs" && isReplied) return acc;
      if (statusFilter === "replied" && !isReplied) return acc;
      acc[comment.source] = (acc[comment.source] || 0) + 1;
      acc.All = (acc.All || 0) + 1;
      return acc;
    }, {});
  }, [comments, hideMyComments, statusFilter]);

  function openReply(comment: AdminComment) {
    setReplyingTo(`${comment.kind}-${comment.id}`);
    setReplyText("");
    setStatusMessage(null);
  }

  async function draftAutoReply(comment: AdminComment) {
    setReplyingTo(`${comment.kind}-${comment.id}`);
    setDraftingId(comment.id);
    setStatusMessage(null);
    try {
      const draft = await requestAutoReplyDraft({
        originalPostTitle: cleanText(comment.contextTitle || comment.sourceLabel, 120),
        originalPostContent: cleanText(comment.contextContent || `${comment.source}: ${comment.sourceLabel}`, 900),
        targetCommentContent: cleanText(comment.content, 900),
        targetDisplayName: comment.userName,
      });
      setReplyText(draft);
      setStatusMessage("Auto reply drafted. Review it before posting.");
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
    setReplyingTo(null);
    setReplyText("");
    setStatusMessage("Reply posted. That comment is marked as replied now.");
  }

  const metricCards = [
    { label: "New Bible Buddy members", value: stats?.signups24h ?? recentSignups.length, action: "signups" as const },
    { label: "Total comments", value: stats?.today ?? 0 },
    { label: "Comments needing reply", value: stats?.needsReply ?? 0, filter: "needs" as const },
    { label: "Replied in 24 hours", value: stats?.myRepliesToday ?? 0, filter: "replied" as const },
    { label: "Total user actions", value: stats?.actions24h ?? 0 },
    { label: "Bible chapter comments", value: stats?.bySource24h?.["Bible Chapters"] ?? 0, source: "Bible Chapters" },
    { label: "Group feed comments", value: stats?.bySource24h?.["Group Feed"] ?? 0, source: "Group Feed" },
    { label: "Article comments", value: stats?.bySource24h?.Articles ?? 0, source: "Articles" },
  ];

  const activeStart = activeBuddies ? activeBuddies.page * activeBuddies.pageSize + 1 : 0;
  const activeEnd = activeBuddies ? activeStart + Math.max(activeBuddies.rows.length - 1, 0) : 0;

  return (
    <main className="min-h-screen bg-[#f6f8f3] px-4 py-6 text-gray-950 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <section className="mb-5 rounded-3xl border border-[#d8e7f3] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white bg-[#eaf6ff] text-xl font-black text-[#2f6685] shadow-sm">
                {moderatorImage ? <img src={moderatorImage} alt="" className="h-full w-full object-cover" /> : avatarFallback(moderatorName)}
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5b8fb8]">Bible Buddy Moderation</p>
                <h1 className="text-2xl font-black">Moderator Dashboard</h1>
                <p className="text-sm font-semibold text-gray-600">
                  Welcome back, {moderatorName}. Work the comments that need replies first.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void loadDashboard()}
              className="h-11 rounded-full bg-[#7BAFD4] px-5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
            >
              Refresh
            </button>
          </div>
        </section>

        <section className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => {
                if (card.action === "signups") setShowRecentSignups((value) => !value);
                if (card.filter) setStatusFilter(card.filter);
                if (card.source) setSourceFilter(card.source);
              }}
              className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#7BAFD4]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">Last 24 hours</p>
              <p className="mt-1 text-3xl font-black">{card.value}</p>
              <p className="mt-1 text-sm font-black text-gray-700">{card.label}</p>
            </button>
          ))}
        </section>

        {showRecentSignups ? (
          <section className="mb-5 rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">Recent New Bible Buddies</p>
                <h2 className="text-xl font-black">New members in the last 24 hours</h2>
              </div>
              <button type="button" onClick={() => setShowRecentSignups(false)} className="rounded-full bg-gray-100 px-3 py-1 text-sm font-black">
                Hide
              </button>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {recentSignups.map((signup) => (
                <Link key={signup.userId} href={signup.profileHref} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#fbfcf8] p-3">
                  <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-sm font-black text-[#2f6685]">
                    {signup.image ? <img src={signup.image} alt="" className="h-full w-full object-cover" /> : avatarFallback(signup.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-black">{signup.name}</span>
                    <span className="text-xs font-semibold text-gray-500">{formatTime(signup.createdAt)}</span>
                  </span>
                </Link>
              ))}
              {!recentSignups.length ? <p className="text-sm font-semibold text-gray-500">No new signups found in the last 24 hours.</p> : null}
            </div>
          </section>
        ) : null}

        <section className="rounded-3xl border border-black/5 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">Main Queue</p>
                <h2 className="text-2xl font-black">Comment Action List</h2>
                <p className="text-sm font-semibold text-gray-500">
                  Newest top-level comments. Reply inline and the queue clears as you go.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <label className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700">
                  <input
                    type="checkbox"
                    checked={hideMyComments}
                    onChange={(event) => setHideMyComments(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-[#7BAFD4]"
                  />
                  Hide my comments
                </label>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search comments"
                  className="h-10 rounded-full border border-gray-200 px-4 text-sm outline-none focus:border-[#6d8f57] focus:ring-2 focus:ring-[#dbead1]"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setStatusFilter(filter.value)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    statusFilter === filter.value ? "bg-[#7BAFD4] text-slate-950 shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {SOURCE_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setSourceFilter(filter.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
                    sourceFilter === filter.value ? "bg-[#6d8f57] text-white shadow-sm" : filter.color
                  }`}
                >
                  {filter.label} ({sourceCounts[filter.value] || 0})
                </button>
              ))}
            </div>
          </div>

          {statusMessage ? <p className="mx-4 mt-4 rounded-2xl bg-[#f4faf5] p-3 text-sm font-bold text-[#557842]">{statusMessage}</p> : null}

          {loading ? (
            <div className="p-10 text-center text-sm font-semibold text-gray-500">Loading comments...</div>
          ) : error ? (
            <div className="p-10 text-center text-sm font-semibold text-red-600">{error}</div>
          ) : filteredComments.length === 0 ? (
            <div className="p-10 text-center text-sm font-semibold text-gray-500">No comments found for this filter.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredComments.map((comment) => {
                const key = `${comment.kind}-${comment.id}`;
                const isReplied = Boolean(comment.hasModeratorReply || comment.hasMyReply);
                const replyOpen = replyingTo === key;
                const sourceFilterMeta = SOURCE_FILTERS.find((item) => item.value === comment.source) || SOURCE_FILTERS[0];

                return (
                  <article key={key} className="bg-white p-4 transition hover:bg-[#fbfcf8]">
                    <div className="flex items-start gap-3">
                      <Link
                        href={comment.userProfileHref || "#"}
                        className="grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-sm font-black text-[#2f6685]"
                      >
                        {comment.userImage ? <img src={comment.userImage} alt="" className="h-full w-full object-cover" /> : avatarFallback(comment.userName)}
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link href={comment.userProfileHref || "#"} className="font-black hover:text-[#4f8fb7]">
                            {comment.userName || "Bible Buddy"}
                          </Link>
                          <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-black text-blue-700">
                            L{comment.userLevel ?? 1}
                          </span>
                          {comment.userBadgeLabel ? (
                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${comment.userBadgeClassName || "bg-gray-100 text-gray-700"}`}>
                              {comment.userBadgeEmoji ? `${comment.userBadgeEmoji} ` : ""}
                              {comment.userBadgeLabel}
                            </span>
                          ) : null}
                          <span className={`rounded-full px-2 py-0.5 text-xs font-black ${sourceFilterMeta.color}`}>
                            {sourceLabel(comment.source)}
                          </span>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-black ${isReplied ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                            {isReplied ? "Replied" : "Not Replied"}
                          </span>
                        </div>

                        <p className="mt-1 text-xs font-semibold text-gray-500">
                          {cleanText(comment.sourceLabel, 80)} - {formatTime(comment.createdAt)} - {comment.replyCount} {comment.replyCount === 1 ? "reply" : "replies"}
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-[15px] leading-7 text-gray-900">{cleanText(comment.content, 900) || "No comment text"}</p>

                        {comment.contextTitle || comment.contextContent ? (
                          <div className="mt-3 rounded-2xl border border-gray-100 bg-[#fbfcf8] px-3 py-2">
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-gray-400">Commented on</p>
                            <p className="mt-1 line-clamp-1 text-sm font-black text-gray-800">{cleanText(comment.contextTitle || comment.sourceLabel, 120)}</p>
                            {comment.contextContent ? <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-gray-500">{cleanText(comment.contextContent, 240)}</p> : null}
                          </div>
                        ) : null}

                        <div className="mt-3 flex flex-wrap gap-2 text-sm font-black">
                          <Link
                            href={sourceHref(comment)}
                            target="_blank"
                            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                          >
                            Open Source
                          </Link>
                          <button
                            type="button"
                            onClick={() => openReply(comment)}
                            className="rounded-full bg-[#eaf4fa] px-4 py-2 text-[#2f6685] hover:bg-[#d8edf8]"
                          >
                            Reply
                          </button>
                          {canAutoReply ? (
                            <button
                              type="button"
                              onClick={() => void draftAutoReply(comment)}
                              disabled={draftingId === comment.id}
                              className="rounded-full bg-[#fff3cf] px-4 py-2 text-[#8a6115] hover:bg-[#ffe9a6] disabled:opacity-60"
                            >
                              {draftingId === comment.id ? "Drafting..." : "Auto Reply"}
                            </button>
                          ) : null}
                        </div>

                        {replyOpen ? (
                          <div className="mt-4 rounded-2xl border border-[#d8e7f3] bg-[#f7fbfd] p-3">
                            <label className="text-sm font-black text-gray-900">Reply to {comment.userName}</label>
                            <textarea
                              value={replyText}
                              onChange={(event) => setReplyText(event.target.value)}
                              rows={4}
                              placeholder="Write a kind, helpful reply..."
                              className="mt-2 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#6d8f57] focus:ring-2 focus:ring-[#dbead1]"
                            />
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => void submitReply(comment)}
                                disabled={postingId === comment.id || !replyText.trim()}
                                className="rounded-full bg-[#6d8f57] px-5 py-2 text-sm font-black text-white shadow-sm hover:bg-[#5f804b] disabled:opacity-60"
                              >
                                {postingId === comment.id ? "Posting..." : "Post Reply"}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText("");
                                }}
                                className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-black text-gray-600 hover:bg-gray-50"
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
        </section>

        <section className="mt-5 rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">Community</p>
              <h2 className="text-xl font-black">Most Active Bible Buddies</h2>
              <p className="text-sm font-semibold text-gray-500">
                {activeBuddies?.total ? `Showing ${activeStart}-${activeEnd} of ${activeBuddies.total}` : "Loaded in pages for speed"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBuddyPage((page) => Math.max(0, page - 1))}
                disabled={buddyPage === 0}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-black text-gray-700 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setBuddyPage((page) => page + 1)}
                disabled={!activeBuddies || activeEnd >= activeBuddies.total}
                className="rounded-full bg-[#7BAFD4] px-4 py-2 text-sm font-black text-slate-950 disabled:opacity-40"
              >
                Next 20
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
            {(activeBuddies?.rows || []).map((buddy) => (
              <Link key={buddy.userId} href={buddy.profileHref} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#fbfcf8] p-3 transition hover:border-[#c8d9bd]">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#fef3c7] text-sm font-black text-[#9a6115]">{buddy.rank}</span>
                <span className="grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-sm font-black text-[#2f6685]">
                  {buddy.image ? <img src={buddy.image} alt="" className="h-full w-full object-cover" /> : avatarFallback(buddy.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-black">{buddy.name}</span>
                  <span className="text-xs font-bold text-gray-500">
                    L{buddy.level} - {buddy.totalActions} actions - {buddy.streak} streak
                  </span>
                </span>
              </Link>
            ))}
            {!activeBuddies?.rows?.length ? <p className="text-sm font-semibold text-gray-500">No active Buddies found.</p> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
