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
  content: string;
  createdAt: string;
  parentId: string | null;
  rootId: string | null;
  isReply: boolean;
  replyCount: number;
  hasMyReply: boolean;
  isMine?: boolean;
};

type CommentStats = {
  total: number;
  today: number;
  myRepliesToday: number;
  needsReply: number;
  bySource: Record<string, number>;
};

type RecentSignup = {
  userId: string;
  name: string;
  image: string | null;
  profileHref: string;
  createdAt: string;
};

type ActivityItem = {
  id: string;
  userId: string | null;
  name: string;
  image: string | null;
  profileHref: string | null;
  text: string;
  createdAt: string;
};

type HourlyActionCount = {
  hour: number;
  count: number;
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
  lastActiveAt: string | null;
};

type ActiveBuddiesPage = {
  page: number;
  pageSize: number;
  total: number;
  rows: ActiveBuddy[];
};

const SOURCE_STYLES: Record<string, { dot: string; bg: string; label: string }> = {
  "Group Feed": { dot: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "Group Feed" },
  "Bible Chapters": { dot: "bg-sky-500", bg: "bg-sky-50 text-sky-700 border-sky-100", label: "Bible Chapters" },
  "Articles": { dot: "bg-violet-500", bg: "bg-violet-50 text-violet-700 border-violet-100", label: "Articles" },
};
const SOURCE_ORDER = ["Group Feed", "Bible Chapters", "Articles"];

function formatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function localDateKey(value: string | Date = new Date()) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatHour(hour: number) {
  if (hour === 0) return "12a";
  if (hour < 12) return `${hour}a`;
  if (hour === 12) return "12p";
  return `${hour - 12}p`;
}

function kindLabel(kind: CommentKind) {
  switch (kind) {
    case "article_comment":
      return "Comment";
    case "feed_post_comment":
      return "Group Feed";
    case "group_feed_comment":
      return "Group Feed";
    case "series_post_comment":
      return "Bible Study";
    case "series_reflection":
      return "Reflection";
    default:
      return "Comment";
  }
}

export default function CommentsAdminPage() {
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [stats, setStats] = useState<CommentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedQueue, setSelectedQueue] = useState<"all" | "today" | "needsReply" | "mine">("all");
  const [hideMyComments, setHideMyComments] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedComment, setSelectedComment] = useState<AdminComment | null>(null);
  const [replyText, setReplyText] = useState("");
  const [postingReply, setPostingReply] = useState(false);
  const [draftingReply, setDraftingReply] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [openPreviewComment, setOpenPreviewComment] = useState<AdminComment | null>(null);
  const [moderatorName, setModeratorName] = useState("Moderator");
  const [moderatorImage, setModeratorImage] = useState<string | null>(null);
  const [recentSignups, setRecentSignups] = useState<RecentSignup[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [hourlyActionCounts, setHourlyActionCounts] = useState<HourlyActionCount[]>([]);
  const [activeBuddies, setActiveBuddies] = useState<ActiveBuddiesPage | null>(null);
  const [buddyPage, setBuddyPage] = useState(0);

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || "";
  }

  async function loadComments(page = buddyPage) {
    setLoading(true);
    setError(null);
    const token = await getToken();

    if (!token) {
      setError("Sign in as an admin or moderator to view comments.");
      setLoading(false);
      return;
    }

    const response = await fetch(`/api/comments/admin?limit=30&tzOffset=${new Date().getTimezoneOffset()}&buddyPage=${page}&buddyLimit=20`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      setError(payload?.error || "Could not load comments.");
      setLoading(false);
      return;
    }

    setComments(payload.comments || []);
    setStats(payload.stats || null);
    setModeratorName(payload.moderator?.name || "Moderator");
    setModeratorImage(payload.moderator?.image || null);
    setRecentSignups(payload.recentSignups || []);
    setActivityFeed(payload.activityFeed || []);
    setHourlyActionCounts(payload.hourlyActionCounts || []);
    setActiveBuddies(payload.activeBuddies || null);
    setLoading(false);
  }

  useEffect(() => {
    void loadComments(buddyPage);
  }, [buddyPage]);

  const commentsForCurrentQueue = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return comments.filter((comment) => {
      if (hideMyComments && comment.isMine) return false;
      if (selectedQueue === "today" && localDateKey(comment.createdAt) !== localDateKey()) return false;
      if (selectedQueue === "needsReply" && (comment.hasMyReply || comment.userId === null)) return false;
      if (selectedQueue === "mine" && !comment.isMine && !comment.hasMyReply) return false;
      if (!needle) return true;
      return [comment.userName, comment.content, comment.source, comment.sourceLabel, comment.contextTitle, comment.contextContent]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [comments, hideMyComments, search, selectedQueue]);

  const filteredComments = useMemo(() => {
    return commentsForCurrentQueue.filter((comment) => selectedSource === "All" || comment.source === selectedSource);
  }, [commentsForCurrentQueue, selectedSource]);

  const sourceCountByQueue = useMemo(() => {
    return commentsForCurrentQueue.reduce<Record<string, number>>((acc, comment) => {
      acc[comment.source] = (acc[comment.source] || 0) + 1;
      return acc;
    }, {});
  }, [commentsForCurrentQueue]);

  const sourceCards = SOURCE_ORDER.filter((source) => (sourceCountByQueue[source] || 0) > 0 || stats?.bySource?.[source]);

  const selectedSourceStyle = SOURCE_STYLES[selectedComment?.source || "Articles"] || SOURCE_STYLES.Articles;

  function avatarFallback(name: string) {
    return (name || "B").trim().charAt(0).toUpperCase();
  }

  function sourcePreviewHref(comment: AdminComment) {
    if (!comment.href) return "/dashboard";
    return comment.href.startsWith("/") ? comment.href : `/${comment.href}`;
  }

  async function draftAutoReply(comment = selectedComment) {
    if (!comment) return;
    setDraftingReply(true);
    setStatusMessage(null);
    try {
      const draft = await requestAutoReplyDraft({
        originalPostTitle: comment.contextTitle || comment.sourceLabel,
        originalPostContent: comment.contextContent || `${comment.source}: ${comment.sourceLabel}`,
        targetCommentContent: comment.content,
        targetDisplayName: comment.userName,
      });
      setReplyText(draft);
      setStatusMessage("Auto reply drafted. Review it before posting.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Could not draft an auto reply.");
    } finally {
      setDraftingReply(false);
    }
  }

  async function submitReply() {
    if (!selectedComment || !replyText.trim()) return;
    setPostingReply(true);
    setStatusMessage(null);
    const token = await getToken();
    const response = await fetch("/api/comments/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        kind: selectedComment.kind,
        targetId: selectedComment.id,
        content: replyText.trim(),
      }),
    });
    const payload = await response.json().catch(() => null);
    setPostingReply(false);

    if (!response.ok) {
      setStatusMessage(payload?.error || "Could not post reply.");
      return;
    }

    setReplyText("");
    setStatusMessage("You replied to this comment. No need to reply again.");
    setSelectedComment((previous) => previous ? { ...previous, hasMyReply: true } : previous);
    await loadComments();
  }

  async function deleteComment(comment: AdminComment) {
    if (!window.confirm("Delete this comment and its replies?")) return;
    setDeletingId(comment.id);
    setStatusMessage(null);
    const token = await getToken();
    const response = await fetch("/api/comments/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ kind: comment.kind, commentId: comment.id }),
    });
    const payload = await response.json().catch(() => null);
    setDeletingId(null);

    if (!response.ok) {
      setStatusMessage(payload?.error || "Could not delete comment.");
      return;
    }

    setSelectedComment(null);
    setStatusMessage("Comment deleted.");
    await loadComments();
  }

  const metricCards = [
    { label: "Latest comments", value: stats?.total ?? 0, tone: "bg-white", queue: "all" as const },
    { label: "Today's comments", value: stats?.today ?? 0, tone: "bg-[#f4faf5]", queue: "today" as const },
    { label: "I replied today", value: stats?.myRepliesToday ?? 0, tone: "bg-[#f7f5ff]", queue: "mine" as const },
    { label: "Needs my reply", value: stats?.needsReply ?? 0, tone: "bg-[#fff8ed]", queue: "needsReply" as const },
  ];
  const maxHourlyCount = Math.max(1, ...hourlyActionCounts.map((item) => item.count));
  const activeStart = activeBuddies ? activeBuddies.page * activeBuddies.pageSize + 1 : 0;
  const activeEnd = activeBuddies ? activeStart + Math.max(activeBuddies.rows.length - 1, 0) : 0;

  return (
    <main className="min-h-screen bg-[#f6f8f3] px-4 py-6 text-gray-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="mb-5 rounded-3xl border border-[#d8e7f3] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white bg-[#eaf6ff] shadow-sm">
                {moderatorImage ? (
                  <img src={moderatorImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl">🙋</span>
                )}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5b8fb8]">Bible Buddy Moderation</p>
                <h2 className="text-xl font-black">Welcome back, {moderatorName}.</h2>
                <p className="text-sm font-semibold text-gray-600">
                  Start with comments that need your reply, then use Auto Reply when you need a quick first draft.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-black">
              <button
                type="button"
                onClick={() => setSelectedQueue("needsReply")}
                className="rounded-full bg-[#7BAFD4] px-4 py-2 text-slate-950 shadow-sm"
              >
                Needs reply
              </button>
              <Link href="/messages" className="rounded-full border border-[#d8e7f3] bg-white px-4 py-2 text-gray-700 shadow-sm">
                Messages
              </Link>
            </div>
          </div>
        </section>

        <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6d8f57]">Moderator dashboard</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Moderator Dashboard</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Track comments, new signups, daily activity, and active Buddies from one place.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadComments()}
            className="h-11 rounded-full bg-[#7BAFD4] px-5 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
          >
            Refresh
          </button>
        </header>

        <section className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => setSelectedQueue(card.queue)}
              className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                selectedQueue === card.queue ? "border-[#7BAFD4] ring-2 ring-[#d8edf8]" : "border-black/5"
              } ${card.tone}`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{card.label}</p>
              <p className="mt-2 text-3xl font-black">{card.value}</p>
            </button>
          ))}
        </section>

        <section className="mb-5 grid gap-2 md:grid-cols-5">
          {sourceCards.map((source) => {
            const style = SOURCE_STYLES[source] || SOURCE_STYLES.Articles;
            const active = selectedSource === source;
            return (
              <button
                key={source}
                type="button"
                onClick={() => setSelectedSource(active ? "All" : source)}
                className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition ${
                  active ? "border-[#6d8f57] bg-white ring-2 ring-[#dbead1]" : "border-black/5 bg-white hover:border-[#c8d9bd]"
                }`}
              >
                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${style.dot}`} />
                <p className="mt-2 text-lg font-black">{sourceCountByQueue[source] ?? 0}</p>
                <p className="text-xs font-bold text-gray-500">{style.label}</p>
              </button>
            );
          })}
        </section>

        <section className="mb-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5b8fb8]">Today</p>
                <h2 className="text-xl font-black">Bible Buddy Activity Pulse</h2>
              </div>
              <p className="text-xs font-bold text-gray-500">Actions refresh with the dashboard</p>
            </div>

            <div className="mt-4 flex h-28 items-end gap-1 rounded-2xl border border-[#edf2e8] bg-[#fbfcf8] px-3 py-3">
              {hourlyActionCounts.map((item) => (
                <div key={item.hour} className="flex h-full flex-1 flex-col justify-end gap-1">
                  <div
                    className="min-h-[4px] rounded-t-full bg-[#7BAFD4]"
                    style={{ height: `${Math.max(4, (item.count / maxHourlyCount) * 100)}%` }}
                    title={`${formatHour(item.hour)}: ${item.count} actions`}
                  />
                  {item.hour % 4 === 0 ? (
                    <span className="text-center text-[10px] font-bold text-gray-400">{formatHour(item.hour)}</span>
                  ) : (
                    <span className="h-3" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {activityFeed.slice(0, 10).map((item) => (
                <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-3">
                  <Link
                    href={item.profileHref || "#"}
                    className="grid h-9 w-9 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-xs font-black text-[#2f6685]"
                  >
                    {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : avatarFallback(item.name)}
                  </Link>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-bold leading-5 text-gray-800">{item.text}</p>
                    <p className="mt-1 text-xs font-semibold text-gray-400">{formatTime(item.createdAt)}</p>
                  </div>
                </div>
              ))}
              {!activityFeed.length && (
                <p className="rounded-2xl border border-gray-100 bg-white p-4 text-sm font-semibold text-gray-500">
                  No tracked actions yet today.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">New Buddies</p>
                <h2 className="text-xl font-black">Recent Signups</h2>
              </div>
              <span className="rounded-full bg-[#f4faf5] px-3 py-1 text-xs font-black text-[#557842]">{recentSignups.length}</span>
            </div>
            <div className="mt-4 space-y-2">
              {recentSignups.map((signup) => (
                <Link
                  key={signup.userId}
                  href={signup.profileHref}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#fbfcf8] p-3 transition hover:border-[#c8d9bd]"
                >
                  <span className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-sm font-black text-[#2f6685]">
                    {signup.image ? <img src={signup.image} alt="" className="h-full w-full object-cover" /> : avatarFallback(signup.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black">{signup.name}</span>
                    <span className="text-xs font-semibold text-gray-500">Signed up {formatTime(signup.createdAt)}</span>
                  </span>
                </Link>
              ))}
              {!recentSignups.length && <p className="text-sm font-semibold text-gray-500">No new signup rows found.</p>}
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">Party starters</p>
              <h2 className="text-xl font-black">Most Active Bible Buddies</h2>
              <p className="text-sm font-semibold text-gray-500">
                Page {buddyPage + 1}
                {activeBuddies?.total ? ` - showing ${activeStart}-${activeEnd} of ${activeBuddies.total}` : ""}
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
              <Link
                key={buddy.userId}
                href={buddy.profileHref}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-[#fbfcf8] p-3 transition hover:border-[#c8d9bd]"
              >
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#fef3c7] text-sm font-black text-[#9a6115]">
                  {buddy.rank}
                </span>
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
            {!activeBuddies?.rows?.length && <p className="text-sm font-semibold text-gray-500">No active Buddies found.</p>}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-xl font-black">Comment Action List</h2>
                  <p className="text-xs text-gray-500">Newest {filteredComments.length} top-level comments loaded for speed</p>
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
                  <select
                    value={selectedQueue}
                    onChange={(event) => setSelectedQueue(event.target.value as typeof selectedQueue)}
                    className="h-10 rounded-full border border-gray-200 px-4 text-sm font-bold outline-none focus:border-[#6d8f57] focus:ring-2 focus:ring-[#dbead1]"
                  >
                    <option value="all">Latest comments</option>
                    <option value="today">Today</option>
                    <option value="needsReply">Needs reply</option>
                    <option value="mine">Replied by me</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center text-sm font-semibold text-gray-500">Loading comments...</div>
            ) : error ? (
              <div className="p-10 text-center text-sm font-semibold text-red-600">{error}</div>
            ) : filteredComments.length === 0 ? (
              <div className="p-10 text-center text-sm font-semibold text-gray-500">No comments found.</div>
            ) : (
              <div className="max-h-[680px] overflow-y-auto">
                {filteredComments.map((comment) => {
                  const style = SOURCE_STYLES[comment.source] || SOURCE_STYLES.Articles;
                  const selected = selectedComment?.id === comment.id && selectedComment.kind === comment.kind;
                  return (
                    <button
                      key={`${comment.kind}-${comment.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedComment(comment);
                        setReplyText("");
                        setStatusMessage(null);
                      }}
                      className={`w-full border-b border-gray-100 p-4 text-left transition hover:bg-[#fbfcf8] ${
                        selected ? "bg-[#f4faf0]" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-1 h-2.5 w-2.5 flex-none rounded-full ${style.dot}`} />
                        <span className="grid h-9 w-9 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-xs font-black text-[#2f6685]">
                          {comment.userImage ? (
                            <img src={comment.userImage} alt="" className="h-full w-full object-cover" />
                          ) : (
                            avatarFallback(comment.userName)
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-gray-950">{comment.userName || "Buddy"}</span>
                            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-black ${style.bg}`}>
                              {comment.source === "Bible Chapters" ? "Bible Chapter" : kindLabel(comment.kind)}
                            </span>
                            {comment.isReply && (
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-500">Reply</span>
                            )}
                            {comment.hasMyReply ? (
                              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700">Replied</span>
                            ) : (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">Not replied</span>
                            )}
                          </div>
                          <p className="mt-1 text-xs font-semibold text-gray-500">
                            {comment.source} · {comment.sourceLabel} · {formatTime(comment.createdAt)}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-700">{comment.content || "No comment text"}</p>
                          {comment.contextContent ? (
                            <p className="mt-2 line-clamp-1 text-xs font-semibold text-gray-500">
                              Context: {comment.contextContent}
                            </p>
                          ) : null}
                        </div>
                        <div className="hidden text-right text-xs font-bold text-gray-400 sm:block">
                          {comment.replyCount} replies
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="rounded-3xl border border-black/5 bg-white shadow-sm lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            {!selectedComment ? (
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">Action panel</p>
                <h2 className="mt-2 text-2xl font-black">Pick a comment</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Select a top-level comment to reply, preview the source, or remove it from the public conversation.
                </p>
                {statusMessage && <p className="mt-4 rounded-2xl bg-gray-50 p-3 text-sm font-semibold text-gray-700">{statusMessage}</p>}
              </div>
            ) : (
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">Reply workspace</p>
                    <div className="mt-2 flex min-w-0 items-center gap-3">
                      <Link
                        href={selectedComment.userProfileHref || "#"}
                        className="grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-full bg-[#eaf6ff] text-sm font-black text-[#2f6685]"
                      >
                        {selectedComment.userImage ? (
                          <img src={selectedComment.userImage} alt="" className="h-full w-full object-cover" />
                        ) : (
                          avatarFallback(selectedComment.userName)
                        )}
                      </Link>
                      <div className="min-w-0">
                        <Link
                          href={selectedComment.userProfileHref || "#"}
                          className="block truncate text-xl font-black text-gray-950 hover:text-[#4f8fb7]"
                        >
                          {selectedComment.userName || "Buddy"}
                        </Link>
                        <p className="mt-0.5 text-xs font-semibold text-gray-500">{formatTime(selectedComment.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedComment(null)}
                    className="h-9 w-9 rounded-full bg-gray-100 text-lg font-black text-gray-500 hover:bg-gray-200"
                    aria-label="Close selected comment"
                  >
                    x
                  </button>
                </div>

                <div className="mt-4 rounded-2xl border border-gray-100 bg-[#fbfcf8] p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-black ${selectedSourceStyle.bg}`}>
                      {selectedComment.source}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenPreviewComment(selectedComment)}
                      className="rounded-full bg-white px-2 py-0.5 text-left text-[11px] font-bold text-[#2f6685] underline-offset-2 hover:underline"
                    >
                      {selectedComment.sourceLabel}
                    </button>
                  </div>
                  <div className="mb-4 rounded-2xl border border-white bg-white/85 p-3">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">What they commented on</p>
                    <button
                      type="button"
                      onClick={() => setOpenPreviewComment(selectedComment)}
                      className="mt-1 text-left text-sm font-black text-gray-950 underline-offset-2 hover:text-[#4f8fb7] hover:underline"
                    >
                      {selectedComment.contextTitle || selectedComment.sourceLabel}
                    </button>
                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      {selectedComment.contextContent || "No extra source context was found for this comment."}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-3xl border border-[#eadfcf] bg-[#fffaf3] p-4">
                  <div className="flex items-start gap-3">
                    <Link
                      href={selectedComment.userProfileHref || "#"}
                      className="grid h-10 w-10 flex-none place-items-center overflow-hidden rounded-full bg-white text-sm font-black text-[#2f6685]"
                    >
                      {selectedComment.userImage ? (
                        <img src={selectedComment.userImage} alt="" className="h-full w-full object-cover" />
                      ) : (
                        avatarFallback(selectedComment.userName)
                      )}
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={selectedComment.userProfileHref || "#"} className="font-black hover:text-[#4f8fb7]">
                          {selectedComment.userName || "Buddy"}
                        </Link>
                        <span className="text-xs font-bold text-gray-500">{formatTime(selectedComment.createdAt)}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${
                          selectedComment.hasMyReply ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {selectedComment.hasMyReply ? "Replied" : "Not replied"}
                        </span>
                      </div>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-800">{selectedComment.content || "No comment text"}</p>
                    </div>
                  </div>
                </div>
                {selectedComment.hasMyReply ? (
                  <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-4 text-sm font-bold leading-6 text-green-800">
                    You replied to this comment. No need to reply again.
                  </div>
                ) : null}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenPreviewComment(selectedComment)}
                    className="rounded-full border border-gray-200 px-4 py-2 text-center text-sm font-black text-gray-700 hover:bg-gray-50"
                  >
                    Open source
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteComment(selectedComment)}
                    disabled={deletingId === selectedComment.id}
                    className="rounded-full bg-red-50 px-4 py-2 text-sm font-black text-red-700 hover:bg-red-100 disabled:opacity-60"
                  >
                    {deletingId === selectedComment.id ? "Deleting..." : "Delete"}
                  </button>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-black text-gray-900">Reply</label>
                    <button
                      type="button"
                      onClick={() => void draftAutoReply()}
                      disabled={draftingReply}
                      className="rounded-full bg-[#eaf4fa] px-3 py-1.5 text-xs font-black text-[#2f6685] transition hover:bg-[#d8edf8] disabled:opacity-60"
                    >
                      {draftingReply ? "Drafting..." : "Auto reply to this"}
                    </button>
                  </div>
                  <textarea
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    rows={6}
                    placeholder={`Reply to ${selectedComment.userName || "this Buddy"}...`}
                    className="mt-2 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-[#6d8f57] focus:ring-2 focus:ring-[#dbead1]"
                  />
                  <button
                    type="button"
                    onClick={() => void submitReply()}
                    disabled={postingReply || !replyText.trim()}
                    className="mt-3 w-full rounded-full bg-[#6d8f57] px-5 py-3 text-sm font-black text-white shadow-sm hover:bg-[#5f804b] disabled:opacity-60"
                  >
                    {postingReply ? "Posting..." : "Post Reply"}
                  </button>
                </div>

                {statusMessage && <p className="mt-4 rounded-2xl bg-gray-50 p-3 text-sm font-semibold text-gray-700">{statusMessage}</p>}
              </div>
            )}
          </aside>
        </div>
      </div>
      {openPreviewComment ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4"
          onClick={() => setOpenPreviewComment(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 bg-[#f7fbfd] px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4f8fb7]">Source Preview</p>
                <h2 className="mt-1 text-xl font-black text-gray-950">{openPreviewComment.contextTitle || openPreviewComment.sourceLabel}</h2>
                <p className="mt-1 text-xs font-semibold text-gray-500">{openPreviewComment.source} - {formatTime(openPreviewComment.createdAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpenPreviewComment(null)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-lg font-black text-gray-600 shadow-sm hover:bg-gray-50"
                aria-label="Close preview"
              >
                x
              </button>
            </div>
            <div className="h-[72vh] bg-gray-50">
              <iframe
                title={openPreviewComment.contextTitle || openPreviewComment.sourceLabel}
                src={sourcePreviewHref(openPreviewComment)}
                className="h-full w-full bg-white"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
