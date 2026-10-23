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
  // Added 2026-10-23 with the triage and approval upgrade.
  severity: string | null;
  confidence: string | null;
  steps_to_reproduce: string | null;
  steps_source: string | null;
  expected_behavior: string | null;
  actual_behavior: string | null;
  platform: string | null;
  app_version: string | null;
  risk_areas: string[] | null;
  needs_approval: boolean;
  approved_at: string | null;
  rejected_at: string | null;
  duplicate_of: string | null;
  ack_sent_at: string | null;
  attempts: number;
  branch_name: string | null;
  pr_url: string | null;
  tests_result: string | null;
};

type BugEvent = {
  id: string;
  bug_id: string;
  at: string;
  actor: string;
  kind: string;
  detail: string | null;
};

type BugReporter = {
  bug_id: string;
  reporter_user_id: string | null;
  reporter_name: string | null;
  conversation_id: string | null;
  ack_sent_at: string | null;
  reply_sent_at: string | null;
};

const STATUS_LABEL: Record<string, { label: string; className: string }> = {
  new: { label: "New", className: "bg-amber-100 text-amber-800" },
  triaging: { label: "Triaging", className: "bg-amber-50 text-amber-700" },
  investigating: { label: "Investigating", className: "bg-sky-100 text-sky-800" },
  fixing: { label: "Fix in progress", className: "bg-blue-100 text-blue-800" },
  testing: { label: "Testing", className: "bg-indigo-100 text-indigo-800" },
  awaiting_approval: { label: "Awaiting approval", className: "bg-orange-100 text-orange-800" },
  fixed: { label: "Fixed", className: "bg-emerald-100 text-emerald-800" },
  cannot_reproduce: { label: "Unable to reproduce", className: "bg-gray-100 text-gray-700" },
  needs_info: { label: "Needs more information", className: "bg-yellow-100 text-yellow-800" },
  needs_louis: { label: "Needs you", className: "bg-red-100 text-red-800" },
  not_a_bug: { label: "Not a bug", className: "bg-gray-100 text-gray-700" },
  duplicate: { label: "Duplicate", className: "bg-gray-100 text-gray-700" },
  closed: { label: "Closed", className: "bg-gray-100 text-gray-700" },
};

const OPEN = ["new", "triaging", "investigating", "fixing", "testing", "needs_info"];
const ATTENTION = ["awaiting_approval", "needs_louis"];

const FILTERS = [
  { key: "attention", label: "Needs you" },
  { key: "open", label: "Open" },
  { key: "done", label: "Done" },
  { key: "all", label: "All" },
] as const;

const SEVERITY_CLASS: Record<string, string> = {
  critical: "bg-red-100 text-red-800",
  high: "bg-orange-100 text-orange-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-gray-100 text-gray-600",
};

function when(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

export default function BugTrackerPage() {
  const [bugs, setBugs] = useState<Bug[] | null>(null);
  const [events, setEvents] = useState<BugEvent[]>([]);
  const [reporters, setReporters] = useState<BugReporter[]>([]);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("open");
  const [query, setQuery] = useState("");
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
    setEvents(payload.events || []);
    setReporters(payload.reporters || []);
    setPaused(Boolean(payload.automation?.paused));
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

  const inFilter = (bug: Bug, key: string) =>
    key === "all"
      ? true
      : key === "attention"
        ? ATTENTION.includes(bug.status)
        : key === "open"
          ? OPEN.includes(bug.status) || ATTENTION.includes(bug.status)
          : !OPEN.includes(bug.status) && !ATTENTION.includes(bug.status);

  // Search is over everything a person would actually remember about a
  // report: what they said, where it happened, who said it, what we found.
  const needle = query.trim().toLowerCase();
  const matches = (bug: Bug) =>
    !needle ||
    [bug.message, bug.area, bug.category, bug.page, bug.reporter_name, bug.diagnosis, bug.fix_summary, bug.id]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle);

  const list = (bugs || []).filter((bug) => inFilter(bug, filter) && matches(bug));
  const count = (key: string) => (bugs || []).filter((bug) => inFilter(bug, key)).length;
  const eventsFor = (bugId: string) => events.filter((event) => event.bug_id === bugId);
  const reportersFor = (bugId: string) => reporters.filter((row) => row.bug_id === bugId);

  async function setAutomation(next: boolean) {
    setBusy("automation");
    try {
      const response = await fetch("/api/admin/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await token()}` },
        body: JSON.stringify({ op: "automation", paused: next }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Failed.");
      setPaused(next);
      setNotice(next ? "Automation paused - the Bug Fixer will find nothing to do." : "Automation back on.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 text-slate-950">
      <h1 className="text-2xl font-black">Bug Tracker</h1>
      <p className="mt-1 text-sm font-semibold text-gray-500">
        Every Report a Problem and every app crash lands here by itself. The Bug Fixer checks twice a day (6:30 and
        14:30 UTC), fixes what it can before the next deploy, and writes the reply. Replies send themselves at 8:45 and
        16:45 UTC once the fix is live - edit or hold one before then if you want.
      </p>

      {/* The one switch that stops everything. Paused means the agent
          endpoint hands out no work, so the routine wakes, finds nothing and
          sleeps again - nothing is left half-fixed. */}
      <div
        className={`mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 ${
          paused ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <p className="text-sm font-bold">
          {paused ? "Automation is paused. Nothing is being fixed." : "Automation is on."}
        </p>
        <button
          type="button"
          disabled={busy === "automation"}
          onClick={() => void setAutomation(!paused)}
          className={`rounded-xl px-4 py-2 text-sm font-black text-white disabled:opacity-40 ${
            paused ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {paused ? "Turn automation back on" : "Pause automation"}
        </button>
      </div>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search reports - words, page, person, what we found"
        className="mt-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
      />

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
              {bug.severity ? (
                <span className={`rounded-full px-2 py-0.5 ${SEVERITY_CLASS[bug.severity.toLowerCase()] || "bg-gray-100 text-gray-600"}`}>
                  {bug.severity}
                </span>
              ) : null}
              {bug.platform ? <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{bug.platform}</span> : null}
              {(bug.risk_areas || []).map((risk) => (
                <span key={risk} className="rounded-full bg-orange-50 px-2 py-0.5 text-orange-700">
                  {risk}
                </span>
              ))}
              <span className="text-gray-400">#{bug.id.slice(0, 8)}</span>
            </div>

            {/* The gate. A fix in a risky area stops here until you say yes -
                the agent endpoint refuses to call it fixed on its own. */}
            {bug.status === "awaiting_approval" ? (
              <div className="mt-3 rounded-xl border border-orange-200 bg-orange-50 p-3">
                <p className="text-sm font-black text-orange-900">
                  Waiting for you before this goes out
                  {bug.risk_areas?.length ? ` - it touches ${bug.risk_areas.join(", ")}` : ""}.
                </p>
                {bug.fix_summary ? <p className="mt-1 text-sm text-orange-900">{bug.fix_summary}</p> : null}
                {bug.pr_url ? (
                  <a href={bug.pr_url} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-bold text-blue-700 underline">
                    Review the change
                  </a>
                ) : null}
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busy === bug.id + "approve"}
                    onClick={() => act(bug.id, "approve", {}, "Approved - it can go out with the next deploy.")}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-40"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    disabled={busy === bug.id + "reject"}
                    onClick={() =>
                      act(bug.id, "reject", { note: window.prompt("Why not? (optional)") || "" }, "Rejected.")
                    }
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-black text-white disabled:opacity-40"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ) : null}

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
            {bug.steps_to_reproduce ? (
              <p className="mt-2 whitespace-pre-wrap text-sm">
                <span className="font-black">
                  How to see it{bug.steps_source === "ai" ? " (worked out, not reported)" : ""}:{" "}
                </span>
                {bug.steps_to_reproduce}
              </p>
            ) : null}
            {bug.expected_behavior || bug.actual_behavior ? (
              <p className="mt-2 text-sm">
                <span className="font-black">Expected: </span>
                {bug.expected_behavior || "-"}
                <span className="font-black"> · Actually: </span>
                {bug.actual_behavior || "-"}
              </p>
            ) : null}
            {bug.tests_result ? (
              <p className="mt-2 text-sm">
                <span className="font-black">Tests: </span>
                {bug.tests_result}
              </p>
            ) : null}
            {reportersFor(bug.id).length > 1 ? (
              <p className="mt-2 text-xs font-semibold text-gray-500">
                Also reported by{" "}
                {reportersFor(bug.id)
                  .slice(1)
                  .map((row) => row.reporter_name || "a buddy")
                  .join(", ")}{" "}
                - everyone gets the reply.
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
              <button
                type="button"
                onClick={() => act(bug.id, "retry", {}, "Back in the queue.")}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-black text-gray-700 hover:bg-gray-200"
              >
                Try again{bug.attempts ? ` (${bug.attempts} so far)` : ""}
              </button>

              {/* The history: acknowledgment, triage, every fix attempt,
                  escalation, approval, and what the reporter was told. */}
              <details className="w-full">
                <summary className="cursor-pointer text-xs font-black text-gray-500">
                  History ({eventsFor(bug.id).length})
                </summary>
                <ol className="mt-2 space-y-1.5 border-l-2 border-gray-100 pl-3">
                  {eventsFor(bug.id).map((event) => (
                    <li key={event.id} className="text-xs">
                      <span className="font-black text-gray-700">{when(event.at)}</span>{" "}
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 font-bold text-gray-600">{event.actor}</span>{" "}
                      <span className="text-gray-700">{event.detail || event.kind}</span>
                    </li>
                  ))}
                  {eventsFor(bug.id).length === 0 ? (
                    <li className="text-xs text-gray-400">Nothing recorded yet.</li>
                  ) : null}
                </ol>
              </details>

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
