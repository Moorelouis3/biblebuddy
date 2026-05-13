"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

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
  userId: string | null;
  userName: string;
  content: string;
  createdAt: string;
  parentId: string | null;
  rootId: string | null;
  isReply: boolean;
  replyCount: number;
  hasMyReply: boolean;
};

type CommentStats = {
  total: number;
  today: number;
  myRepliesToday: number;
  needsReply: number;
  bySource: Record<string, number>;
};

const SOURCE_STYLES: Record<string, { dot: string; bg: string; label: string }> = {
  "Articles": { dot: "bg-blue-500", bg: "bg-blue-50 text-blue-700 border-blue-100", label: "Articles" },
  "Community Feed": { dot: "bg-emerald-500", bg: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "Community" },
  "Group Feed": { dot: "bg-amber-500", bg: "bg-amber-50 text-amber-800 border-amber-100", label: "Group Feed" },
  "Bible Study Series": { dot: "bg-violet-500", bg: "bg-violet-50 text-violet-700 border-violet-100", label: "Bible Studies" },
  "Chapter Reflections": { dot: "bg-rose-500", bg: "bg-rose-50 text-rose-700 border-rose-100", label: "Reflections" },
};

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

function kindLabel(kind: CommentKind) {
  switch (kind) {
    case "article_comment":
      return "Article";
    case "feed_post_comment":
      return "Feed";
    case "group_feed_comment":
      return "Group";
    case "series_post_comment":
      return "Study";
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
  const [selectedQueue, setSelectedQueue] = useState<"all" | "needsReply" | "mine" | "replies">("all");
  const [search, setSearch] = useState("");
  const [selectedComment, setSelectedComment] = useState<AdminComment | null>(null);
  const [replyText, setReplyText] = useState("");
  const [postingReply, setPostingReply] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function getToken() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || "";
  }

  async function loadComments() {
    setLoading(true);
    setError(null);
    const token = await getToken();

    if (!token) {
      setError("Sign in as an admin or moderator to view comments.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/comments/admin?limit=500", {
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
    setLoading(false);
  }

  useEffect(() => {
    void loadComments();
  }, []);

  const sources = useMemo(() => {
    const names = new Set(comments.map((comment) => comment.source));
    return ["All", ...Array.from(names)];
  }, [comments]);

  const filteredComments = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return comments.filter((comment) => {
      if (selectedSource !== "All" && comment.source !== selectedSource) return false;
      if (selectedQueue === "needsReply" && (comment.hasMyReply || comment.userId === null)) return false;
      if (selectedQueue === "mine" && !comment.hasMyReply) return false;
      if (selectedQueue === "replies" && !comment.isReply) return false;
      if (!needle) return true;
      return [comment.userName, comment.content, comment.source, comment.sourceLabel]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [comments, search, selectedQueue, selectedSource]);

  const sourceCards = sources.filter((source) => source !== "All");

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
    setStatusMessage("Reply posted.");
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
    { label: "All comments", value: stats?.total ?? 0, tone: "bg-white" },
    { label: "Today", value: stats?.today ?? 0, tone: "bg-[#f4faf5]" },
    { label: "I replied today", value: stats?.myRepliesToday ?? 0, tone: "bg-[#f7f5ff]" },
    { label: "Needs reply", value: stats?.needsReply ?? 0, tone: "bg-[#fff8ed]" },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8f3] px-4 py-6 text-gray-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6d8f57]">Moderator dashboard</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Comments Admin</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Track public comments, replies, reflections, and study discussions from one action list.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void loadComments()}
            className="h-11 rounded-full bg-gray-950 px-5 text-sm font-black text-white shadow-sm transition hover:bg-gray-800"
          >
            Refresh
          </button>
        </header>

        <section className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((card) => (
            <div key={card.label} className={`rounded-2xl border border-black/5 p-4 shadow-sm ${card.tone}`}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{card.label}</p>
              <p className="mt-2 text-3xl font-black">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="mb-5 grid gap-3 md:grid-cols-5">
          {sourceCards.map((source) => {
            const style = SOURCE_STYLES[source] || SOURCE_STYLES.Articles;
            const active = selectedSource === source;
            return (
              <button
                key={source}
                type="button"
                onClick={() => setSelectedSource(active ? "All" : source)}
                className={`rounded-2xl border p-4 text-left shadow-sm transition ${
                  active ? "border-[#6d8f57] bg-white ring-2 ring-[#dbead1]" : "border-black/5 bg-white hover:border-[#c8d9bd]"
                }`}
              >
                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${style.dot}`} />
                <p className="mt-3 text-lg font-black">{stats?.bySource?.[source] ?? 0}</p>
                <p className="text-xs font-bold text-gray-500">{style.label}</p>
              </button>
            );
          })}
        </section>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="rounded-3xl border border-black/5 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-xl font-black">All Comments</h2>
                  <p className="text-xs text-gray-500">{filteredComments.length} in the current queue</p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
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
                    <option value="all">All comments</option>
                    <option value="needsReply">Needs reply</option>
                    <option value="mine">Replied by me</option>
                    <option value="replies">Replies only</option>
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
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-gray-950">{comment.userName || "Buddy"}</span>
                            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-black ${style.bg}`}>
                              {kindLabel(comment.kind)}
                            </span>
                            {comment.isReply && (
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-500">Reply</span>
                            )}
                            {comment.hasMyReply ? (
                              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700">Answered</span>
                            ) : (
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">Open</span>
                            )}
                          </div>
                          <p className="mt-1 text-xs font-semibold text-gray-500">
                            {comment.source} · {comment.sourceLabel} · {formatTime(comment.createdAt)}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-700">{comment.content || "No comment text"}</p>
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
                  Select any row to reply, open its source, or remove it from the public conversation.
                </p>
                {statusMessage && <p className="mt-4 rounded-2xl bg-gray-50 p-3 text-sm font-semibold text-gray-700">{statusMessage}</p>}
              </div>
            ) : (
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6d8f57]">Selected comment</p>
                    <h2 className="mt-2 text-xl font-black">{selectedComment.userName || "Buddy"}</h2>
                    <p className="mt-1 text-xs font-semibold text-gray-500">{formatTime(selectedComment.createdAt)}</p>
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
                    <span className={`rounded-full border px-2 py-0.5 text-[11px] font-black ${(SOURCE_STYLES[selectedComment.source] || SOURCE_STYLES.Articles).bg}`}>
                      {selectedComment.source}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-600">
                      {selectedComment.sourceLabel}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-800">{selectedComment.content || "No comment text"}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    href={selectedComment.href || "/comments-admin"}
                    className="rounded-full border border-gray-200 px-4 py-2 text-center text-sm font-black text-gray-700 hover:bg-gray-50"
                  >
                    Open
                  </Link>
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
                  <label className="text-sm font-black text-gray-900">Reply</label>
                  <textarea
                    value={replyText}
                    onChange={(event) => setReplyText(event.target.value)}
                    rows={6}
                    placeholder="Write a moderator reply..."
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
    </main>
  );
}
