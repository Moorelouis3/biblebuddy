"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Bug tracker. Reports and crashes arrive on their own; the Bug Fixer routine
// fixes what it can (twice a day, before each deploy) and writes a reply that
// goes out automatically after the fix is live. Louis reads, edits or holds.

type Bug = {
  id: string;
  source: string;
  status: string;
  category: string | null;
  area: string | null;
  page: string | null;
  message: string;
  error_details: Record<string, unknown> | null;
  occurrences: number;
  last_seen_at: string;
  reporter_user_id: string | null;
  reporter_name: string | null;
  conversation_id: string | null;
  diagnosis: string | null;
  fix_summary: string | null;
  fix_commit: string | null;
  louis_action: string | null;
  reply_draft: string | null;
  reply_hold: boolean;
  reply_sent_at: string | null;
  resolved_at: string | null;
  created_at: string;
};

const STATUS_LABEL: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-amber-100 text-amber-800" },
  fixing: { label: "Being fixed", className: "bg-blue-100 text-blue-800" },
  fixed: { label: "Fixed", className: "bg-emerald-100 text-emerald-800" },
  needs_louis: { label: "Needs you", className: "bg-red-100 text-red-800" },
  not_a_bug: { label: "Not a bug", className: "bg-gray-100 text-gray-700" },
  duplicate: { label: "Duplicate", className: "bg-gray-100 text-gray-700" },
};

const FILTERS = [
  { key: "attention", label: "Needs you" },
  { key: "open", label: "Open" },
  { key: "done", label: "Done" },
  { key: "all", label: "All" },
] as const;

function when(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function BugTrackerPage() {
  const [bugs, setBugs] = useState<Bug[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("open");
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const token = useCallback(async () => (await supabase.auth.getSession()).data.session?.access_token || "", []);

  const load = useCallback(async () => {
    const response = await fetch("/api/admin/bugs", { headers: { Authorization: `Bearer ${await token()}` } });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload?.error || "Could not load.");
      return;
    }
    setBugs(payload.bugs);
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function act(id: string, op: string, extra: Record<string, unknown>, done: string) {
    setBusy(id + op);
    setError(null);
    setNotice(null);
    try {
      const response = await fetch("/api/admin/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({ op, id, ...extra }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Failed.");
      setNotice(done);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setBusy(null);
    }
  }

  const list = (bugs || []).filter((bug) => {
    if (filter === "all") return true;
    if (filter === "attention") return bug.status === "needs_louis";
    if (filter === "open") return bug.status === "new" || bug.status === "fixing" || bug.status === "needs_louis";
    return !["new", "fixing", "needs_louis"].includes(bug.status);
  });
  const count = (key: string) =>
    (bugs || []).filter((bug) =>
      key === "attention"
        ? bug.status === "needs_louis"
        : key === "open"
          ? ["new", "fixing", "needs_louis"].includes(bug.status)
          : key === "done"
            ? !["new", "fixing", "needs_louis"].includes(bug.status)
            : true,
    ).length;

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 text-slate-950">
      <h1 className="text-2xl font-black">Bug Tracker</h1>
      <p className="mt-1 text-sm font-semibold text-gray-500">
        Every Report a Problem and every app crash lands here by itself. The Bug Fixer checks twice a day (6:30 and
        14:30 UTC), fixes what it can before the next deploy, and writes the reply. Replies send themselves at 8:45 and
        16:45 UTC once the fix is live - edit or hold one before then if you want.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-black ${
              filter === item.key ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {item.label} ({count(item.key)})
          </button>
        ))}
      </div>

      {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      {notice ? <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{notice}</p> : null}
      {!bugs && !error ? <p className="mt-6 text-sm font-semibold text-gray-500">Loading...</p> : null}
      {bugs && list.length === 0 ? <p className="mt-6 text-sm font-semibold text-gray-500">Nothing here.</p> : null}

      {list.map((bug) => {
        const status = STATUS_LABEL[bug.status] || { label: bug.status, className: "bg-gray-100" };
        const reply = replies[bug.id] ?? bug.reply_draft ?? "";
        return (
          <article key={bug.id} className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black">
              <span className={`rounded-full px-2.5 py-1 ${status.className}`}>{status.label}</span>
              <span className="text-gray-500">
                {bug.source === "crash" ? "💥 Crash" : "🛟 Report"} · {bug.area || "App"} · {when(bug.created_at)}
              </span>
              {bug.occurrences > 1 ? (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-red-700">happened {bug.occurrences} times</span>
              ) : null}
            </div>

            <p className="mt-2 whitespace-pre-wrap text-[15px] font-bold">{bug.message}</p>
            <p className="mt-1 text-xs font-semibold text-gray-500">
              {bug.reporter_name || (bug.reporter_user_id ? "Signed-in user" : "Signed-out visitor")}
              {bug.page ? ` · on ${bug.page}` : ""}
            </p>

            {bug.louis_action ? (
              <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-800">
                What you need to do: {bug.louis_action}
              </div>
            ) : null}
            {bug.diagnosis ? (
              <p className="mt-3 text-sm">
                <span className="font-black">What was wrong: </span>
                {bug.diagnosis}
              </p>
            ) : null}
            {bug.fix_summary ? (
              <p className="mt-2 text-sm">
                <span className="font-black">What was changed: </span>
                {bug.fix_summary}
                {bug.fix_commit ? <span className="text-gray-500"> ({bug.fix_commit.slice(0, 8)})</span> : null}
              </p>
            ) : null}

            {bug.reporter_user_id ? (
              <div className="mt-3">
                <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                  Reply to {bug.reporter_name || "them"}
                  {bug.reply_sent_at ? ` · sent ${when(bug.reply_sent_at)}` : bug.reply_hold ? " · on hold" : ""}
                </p>
                {bug.reply_sent_at ? (
                  <p className="mt-1 whitespace-pre-wrap rounded-xl bg-gray-50 p-3 text-sm">{bug.reply_draft}</p>
                ) : (
                  <>
                    <textarea
                      rows={3}
                      value={reply}
                      placeholder="The Bug Fixer writes this when it finishes."
                      onChange={(event) => setReplies((prev) => ({ ...prev, [bug.id]: event.target.value }))}
                      className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={!reply.trim() || busy === bug.id + "send_reply"}
                        onClick={() => act(bug.id, "send_reply", { content: reply }, "Reply sent.")}
                        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white disabled:opacity-40"
                      >
                        Send now
                      </button>
                      <button
                        type="button"
                        disabled={busy === bug.id + "update"}
                        onClick={() => act(bug.id, "update", { reply_draft: reply }, "Reply saved.")}
                        className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-black text-white"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          act(
                            bug.id,
                            "update",
                            { hold: !bug.reply_hold },
                            bug.reply_hold ? "Reply will send automatically." : "Reply held.",
                          )
                        }
                        className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-black text-gray-700"
                      >
                        {bug.reply_hold ? "Let it send" : "Hold reply"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : null}

            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
              <span className="text-xs font-bold text-gray-500">Mark as:</span>
              {Object.entries(STATUS_LABEL)
                .filter(([key]) => key !== bug.status)
                .map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => act(bug.id, "update", { status: key }, `Marked ${value.label}.`)}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-black text-gray-700 hover:bg-gray-200"
                  >
                    {value.label}
                  </button>
                ))}
              {bug.error_details ? (
                <details className="w-full">
                  <summary className="cursor-pointer text-xs font-black text-gray-500">Technical details</summary>
                  <pre className="mt-1 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-2 text-[11px]">
                    {JSON.stringify(bug.error_details, null, 2)}
                  </pre>
                </details>
              ) : null}
            </div>
          </article>
        );
      })}
    </main>
  );
}
