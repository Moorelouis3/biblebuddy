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

    const response = await fetch("/api/comments/admin?limit=30", {
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
    return ["All", ...SOURCE_ORDER.filter((source) => names.has(source))];
  }, [comments]);

  const filteredComments = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return comments.filter((comment) => {
      if (selectedSource !== "All" && comment.source !== selectedSource) return false;
      if (hideMyComments && comment.isMine) return false;
      if (selectedQueue === "today" && comment.createdAt?.slice(0, 10) !== new Date().toISOString().slice(0, 10)) return false;
      if (selectedQueue === "needsReply" && (comment.hasMyReply || comment.userId === null)) return false;
      if (selectedQueue === "mine" && !comment.isMine && !comment.hasMyReply) return false;
      if (!needle) return true;
      return [comment.userName, comment.content, comment.source, comment.sourceLabel, comment.contextTitle, comment.contextContent]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [comments, hideMyComments, search, selectedQueue, selectedSource]);

  const sourceCards = sources.filter((source) => source !== "All");

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

  return (
    <main className="min-h-screen bg-[#f6f8f3] px-4 py-6 text-gray-950 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6d8f57]">Moderator dashboard</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Comments Admin</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Track top-level public comments from the group feed, Bible chapters, and articles so moderators can reply fast.
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

        <section className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metricCards.map((card) => (
            <button
              key={card.label}
              type="button"
              onClick={() => setSelectedQueue(card.queue)}
              className={`rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                selectedQueue === card.queue ? "border-[#7BAFD4] ring-2 ring-[#d8edf8]" : "border-black/5"
              } ${card.tone}`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{card.label}</p>
              <p className="mt-2 text-3xl font-black">{card.value}</p>
            </button>
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
                              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">Needs reply</span>
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
                  <div className="mb-4 rounded-2xl border border-white bg-white/85 p-3">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">What they commented on</p>
                    <p className="mt-1 text-sm font-black text-gray-950">{selectedComment.contextTitle || selectedComment.sourceLabel}</p>
                    <p className="mt-2 text-xs leading-5 text-gray-600">
                      {selectedComment.contextContent || "No extra source context was found for this comment."}
                    </p>
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">Comment</p>
                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-800">{selectedComment.content || "No comment text"}</p>
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
                    Preview
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
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4f8fb7]">Comment Preview</p>
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
            <div className="max-h-[70vh] overflow-y-auto p-5">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-gray-500">Original post or source</p>
                <p className="mt-2 text-sm leading-7 text-gray-700">
                  {openPreviewComment.contextContent || "No extra source context was found for this comment."}
                </p>
              </div>
              <div className="mt-4 rounded-2xl border border-[#d9e7ff] bg-white p-4">
                <p className="text-sm font-black text-gray-950">{openPreviewComment.userName || "Buddy"}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-800">{openPreviewComment.content || "No comment text"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
