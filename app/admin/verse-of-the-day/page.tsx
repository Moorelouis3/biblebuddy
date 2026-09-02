"use client";

/**
 * Verse of the Day admin - schedule, edit, approve, preview, performance.
 *
 * Reads and writes through /api/admin/verse-of-the-day (service role behind
 * an owner check); the entries table has no client write policies. Statuses
 * stored are draft / ready_for_review / approved / archived - "scheduled"
 * and "published" are shown as derived labels from the date, so nothing has
 * to flip at midnight.
 */

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import VerseOfTheDayBreakdown from "../../../components/VerseOfTheDayBreakdown";
import {
  VOTD_BACKGROUNDS,
  getVotdBackground,
  type VerseOfTheDayEntry,
  type VotdBackgroundTheme,
} from "../../../lib/verseOfTheDayContent";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

type AdminEntry = VerseOfTheDayEntry & {
  status: "draft" | "ready_for_review" | "approved" | "archived";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type Overview = {
  entries: AdminEntry[];
  settings: { repeat_after_days: number; target_days_ahead: number } | null;
  queue: { today: string; approvedDaysRemaining: number; tomorrowCovered: boolean; nextGapDate: string | null };
};

type Performance = {
  byDate: Record<string, Record<string, number>>;
  byEntry: Record<string, { opens: number; completes: number; bookmarks: number }>;
};

const BACKGROUND_OPTIONS: Array<{ value: VotdBackgroundTheme; label: string }> = [
  { value: "purple-sunrise", label: "Purple sunrise" },
  { value: "blue-sunrise", label: "Blue sunrise" },
  { value: "green-mountains", label: "Green mountains" },
  { value: "orange-night", label: "Orange night" },
];

const EMPTY_ENTRY = {
  reference: "",
  book: "",
  chapter: 1,
  verse_start: 1,
  verse_end: null as number | null,
  translation: "KJV",
  verse_text: "",
  scheduled_date: null as string | null,
  background_theme: null as VotdBackgroundTheme | null,
  title: "",
  author_section: "",
  context_section: "",
  meaning_section: "",
  application_section: "",
  takeaway: "",
  reflection_question: "",
  prayer: null as string | null,
  status: "draft" as AdminEntry["status"],
};

function derivedLabel(entry: AdminEntry, today: string) {
  if (entry.status === "approved" && entry.scheduled_date) {
    return entry.scheduled_date <= today ? "published" : "scheduled";
  }
  return entry.status.replace(/_/g, " ");
}

function statusColor(label: string) {
  if (label === "published") return "bg-green-100 text-green-800";
  if (label === "scheduled") return "bg-blue-100 text-blue-800";
  if (label === "approved") return "bg-blue-100 text-blue-800";
  if (label === "ready for review") return "bg-amber-100 text-amber-800";
  if (label === "archived") return "bg-gray-200 text-gray-600";
  return "bg-gray-100 text-gray-700";
}

export default function VerseOfTheDayAdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [token, setToken] = useState("");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<(typeof EMPTY_ENTRY & { id?: string }) | null>(null);
  const [previewEntry, setPreviewEntry] = useState<VerseOfTheDayEntry | null>(null);
  const [showArchive, setShowArchive] = useState(false);

  async function refresh(currentToken = token) {
    const response = await fetch("/api/admin/verse-of-the-day?mode=overview", {
      headers: { Authorization: `Bearer ${currentToken}` },
      cache: "no-store",
    });
    const json = await response.json();
    if (response.ok) setOverview(json);
    else setMessage(json?.error || "Could not load entries.");
  }

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if ((data.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
        setAuthorized(false);
        return;
      }
      setAuthorized(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token || "";
      setToken(accessToken);
      await refresh(accessToken);
      const perfResponse = await fetch("/api/admin/verse-of-the-day?mode=performance", {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
      if (perfResponse.ok) setPerformance(await perfResponse.json());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function post(payload: Record<string, unknown>, successMessage: string) {
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/verse-of-the-day", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json?.error || "Failed.");
      setMessage(successMessage);
      await refresh();
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const today = overview?.queue.today || "";
  const upcoming = useMemo(
    () =>
      (overview?.entries || []).filter(
        (entry) => entry.status !== "archived" && (!entry.scheduled_date || entry.scheduled_date >= today),
      ),
    [overview, today],
  );
  const archive = useMemo(
    () =>
      (overview?.entries || [])
        .filter((entry) => entry.status === "archived" || (entry.scheduled_date && entry.scheduled_date < today))
        .sort((a, b) => (b.scheduled_date || "").localeCompare(a.scheduled_date || "")),
    [overview, today],
  );

  if (authorized === false) {
    return <div className="p-10 text-center font-bold">Not authorized.</div>;
  }
  if (!overview) {
    return <div className="p-10 text-center font-bold text-gray-500">Loading Verse of the Day admin...</div>;
  }

  const queue = overview.queue;
  const queueTone = !queue.tomorrowCovered
    ? "border-red-300 bg-red-50 text-red-900"
    : queue.approvedDaysRemaining <= 10
      ? "border-amber-300 bg-amber-50 text-amber-900"
      : "border-green-300 bg-green-50 text-green-900";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-28">
      <h1 className="text-2xl font-black text-gray-900">Verse of the Day</h1>
      <p className="mt-1 text-sm font-semibold text-gray-500">
        Schedule, edit and approve the daily verse breakdowns.
      </p>

      {message ? (
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-bold text-blue-900">
          {message}
        </div>
      ) : null}

      {/* Queue health */}
      <div className={`mt-5 rounded-2xl border p-4 ${queueTone}`}>
        <p className="text-sm font-black">
          {!queue.tomorrowCovered
            ? `CRITICAL: no approved verse for tomorrow. The homepage will fall back to the legacy pool.`
            : `${queue.approvedDaysRemaining} approved day${queue.approvedDaysRemaining === 1 ? "" : "s"} remain after today.`}
        </p>
        <p className="mt-1 text-xs font-semibold opacity-80">
          {queue.nextGapDate ? `First date with no approved verse: ${queue.nextGapDate}.` : "No gaps in the next year."}{" "}
          Target: {overview.settings?.target_days_ahead ?? 30} days ahead.
        </p>
      </div>

      {/* Settings */}
      {overview.settings ? (
        <div className="mt-4 flex flex-wrap items-end gap-3 rounded-2xl border border-gray-200 bg-white p-4">
          <label className="text-xs font-black text-gray-600">
            Repeat a verse only after (days)
            <input
              type="number"
              defaultValue={overview.settings.repeat_after_days}
              id="votd-repeat-days"
              className="mt-1 block w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm font-bold"
            />
          </label>
          <label className="text-xs font-black text-gray-600">
            Target approved days ahead
            <input
              type="number"
              defaultValue={overview.settings.target_days_ahead}
              id="votd-target-days"
              className="mt-1 block w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm font-bold"
            />
          </label>
          <button
            type="button"
            disabled={busy}
            onClick={() =>
              void post(
                {
                  action: "save_settings",
                  repeat_after_days: (document.getElementById("votd-repeat-days") as HTMLInputElement)?.value,
                  target_days_ahead: (document.getElementById("votd-target-days") as HTMLInputElement)?.value,
                },
                "Settings saved.",
              )
            }
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-black text-white disabled:opacity-50"
          >
            Save settings
          </button>
          <button
            type="button"
            onClick={() => setEditing({ ...EMPTY_ENTRY })}
            className="ml-auto rounded-full bg-blue-600 px-5 py-2.5 text-sm font-black text-white"
          >
            + Add a verse
          </button>
        </div>
      ) : null}

      {/* Upcoming schedule */}
      <h2 className="mt-8 text-xs font-black uppercase tracking-wide text-gray-500">
        Upcoming schedule ({upcoming.length})
      </h2>
      <div className="mt-2 space-y-2">
        {upcoming.map((entry, index) => {
          const label = derivedLabel(entry, today);
          const perf = performance?.byDate[entry.scheduled_date || ""] || {};
          return (
            <div key={entry.id} className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-black text-gray-900">{entry.scheduled_date || "Unscheduled"}</span>
                <span className="text-sm font-bold text-gray-700">{entry.reference}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${statusColor(label)}`}>{label}</span>
                {entry.scheduled_date === today ? (
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-black text-purple-800">
                    TODAY
                  </span>
                ) : null}
                <span className="ml-auto flex flex-wrap items-center gap-1.5">
                  <select
                    value={entry.background_theme || ""}
                    onChange={(event) =>
                      void post(
                        { action: "set_background", id: entry.id, background_theme: event.target.value || null },
                        "Background updated.",
                      )
                    }
                    className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs font-bold"
                  >
                    <option value="">Auto rotation</option>
                    {BACKGROUND_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    defaultValue={entry.scheduled_date || ""}
                    onBlur={(event) => {
                      if (event.target.value && event.target.value !== entry.scheduled_date) {
                        void post(
                          { action: "reschedule", id: entry.id, scheduled_date: event.target.value },
                          "Rescheduled.",
                        );
                      }
                    }}
                    className="rounded-lg border border-gray-300 px-2 py-1 text-xs font-bold"
                  />
                  {index > 0 && entry.scheduled_date && upcoming[index - 1].scheduled_date ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void post(
                          { action: "swap_dates", idA: entry.id, idB: upcoming[index - 1].id },
                          "Swapped dates.",
                        )
                      }
                      className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs font-black"
                      title="Swap with the day above"
                    >
                      ↑
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setEditing({ ...(entry as unknown as typeof EMPTY_ENTRY), id: entry.id })}
                    className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-black"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewEntry(entry)}
                    className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-black"
                  >
                    Preview
                  </button>
                  {entry.status !== "approved" ? (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void post({ action: "set_status", id: entry.id, status: "approved" }, "Approved.")}
                      className="rounded-lg bg-green-600 px-2.5 py-1.5 text-xs font-black text-white"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void post({ action: "set_status", id: entry.id, status: "ready_for_review" }, "Unpublished.")
                      }
                      className="rounded-lg border border-amber-400 px-2.5 py-1.5 text-xs font-black text-amber-700"
                    >
                      Unpublish
                    </button>
                  )}
                </span>
              </div>
              <p className="mt-2 line-clamp-1 text-sm font-semibold text-gray-500">{entry.verse_text}</p>
              {Object.keys(perf).length ? (
                <p className="mt-1 text-[11px] font-bold text-gray-400">
                  {perf.votd_card_impression || 0} views · {perf.votd_breakdown_open || 0} opens ·{" "}
                  {perf.votd_breakdown_complete || 0} finished · {perf.votd_bookmark || 0} bookmarks ·{" "}
                  {perf.votd_share || 0} shares · {perf.votd_open_in_bible || 0} to Bible
                </p>
              ) : null}
            </div>
          );
        })}
        {!upcoming.length ? (
          <p className="rounded-2xl border border-dashed border-gray-300 p-6 text-center text-sm font-bold text-gray-500">
            Nothing scheduled. Add a verse or run the seed script.
          </p>
        ) : null}
      </div>

      {/* Archive */}
      <button
        type="button"
        onClick={() => setShowArchive((value) => !value)}
        className="mt-8 text-xs font-black uppercase tracking-wide text-gray-500"
      >
        {showArchive ? "▾" : "▸"} Archive ({archive.length})
      </button>
      {showArchive ? (
        <div className="mt-2 space-y-2">
          {archive.map((entry) => {
            const perf = performance?.byDate[entry.scheduled_date || ""] || {};
            return (
              <div key={entry.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-black text-gray-700">{entry.scheduled_date}</span>
                  <span className="font-bold text-gray-600">{entry.reference}</span>
                  <span className="ml-auto text-[11px] font-bold text-gray-400">
                    {perf.votd_card_impression || 0} views · {perf.votd_breakdown_open || 0} opens ·{" "}
                    {perf.votd_breakdown_complete || 0} finished · {perf.votd_bookmark || 0} bookmarks ·{" "}
                    {perf.votd_share || 0} shares
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewEntry(entry)}
                    className="rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-black"
                  >
                    Preview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Editor */}
      {editing ? (
        <div className="fixed inset-0 z-[9995] overflow-y-auto bg-black/50 p-4">
          <div className="mx-auto my-6 max-w-3xl rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">{editing.id ? "Edit verse" : "Add a verse"}</h2>
              <button type="button" onClick={() => setEditing(null)} className="text-xl font-black text-gray-400">
                ✕
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["reference", "Reference (e.g. John 3:16)"],
                  ["book", "Book key (e.g. 1 peter)"],
                  ["chapter", "Chapter"],
                  ["verse_start", "Verse start"],
                  ["verse_end", "Verse end (optional)"],
                  ["scheduled_date", "Scheduled date"],
                ] as const
              ).map(([field, label]) => (
                <label key={field} className="text-xs font-black text-gray-600">
                  {label}
                  <input
                    type={field === "scheduled_date" ? "date" : field.includes("verse") || field === "chapter" ? "number" : "text"}
                    value={(editing as Record<string, unknown>)[field] == null ? "" : String((editing as Record<string, unknown>)[field])}
                    onChange={(event) =>
                      setEditing((value) => (value ? { ...value, [field]: event.target.value || null } : value))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm font-semibold"
                  />
                </label>
              ))}
              <label className="text-xs font-black text-gray-600">
                Background
                <select
                  value={editing.background_theme || ""}
                  onChange={(event) =>
                    setEditing((value) =>
                      value ? { ...value, background_theme: (event.target.value || null) as VotdBackgroundTheme | null } : value,
                    )
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm font-semibold"
                >
                  <option value="">Auto rotation</option>
                  {BACKGROUND_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-black text-gray-600">
                Status
                <select
                  value={editing.status}
                  onChange={(event) =>
                    setEditing((value) => (value ? { ...value, status: event.target.value as AdminEntry["status"] } : value))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm font-semibold"
                >
                  <option value="draft">Draft</option>
                  <option value="ready_for_review">Ready for review</option>
                  <option value="approved">Approved</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>
            {(
              [
                ["title", "Breakdown title", 1],
                ["verse_text", "Verse text (KJV)", 3],
                ["author_section", "Who wrote this?", 6],
                ["context_section", "Where are we in the story?", 6],
                ["meaning_section", "What does it actually mean?", 6],
                ["application_section", "Why this matters today", 6],
                ["takeaway", "Take this with you", 2],
                ["reflection_question", "Think about it", 2],
                ["prayer", "Prayer (optional)", 3],
              ] as const
            ).map(([field, label, rows]) => (
              <label key={field} className="mt-3 block text-xs font-black text-gray-600">
                {label}
                <textarea
                  rows={rows}
                  value={((editing as Record<string, unknown>)[field] as string) || ""}
                  onChange={(event) =>
                    setEditing((value) => (value ? { ...value, [field]: event.target.value } : value))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold leading-relaxed"
                />
              </label>
            ))}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  void post(
                    {
                      action: editing.id ? "update" : "create",
                      id: editing.id,
                      entry: { ...editing, chapter: Number(editing.chapter), verse_start: Number(editing.verse_start), verse_end: editing.verse_end ? Number(editing.verse_end) : null },
                    },
                    "Saved.",
                  ).then(() => setEditing(null))
                }
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-black text-white disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() =>
                  setPreviewEntry({
                    ...(editing as unknown as VerseOfTheDayEntry),
                    id: editing.id || "preview",
                    scheduled_date: editing.scheduled_date || overview.queue.today,
                    verse_end: editing.verse_end ? Number(editing.verse_end) : null,
                    chapter: Number(editing.chapter),
                    verse_start: Number(editing.verse_start),
                  })
                }
                className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-black text-gray-700"
              >
                Preview
              </button>
              {editing.id ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    if (window.confirm("Delete this entry completely?")) {
                      void post({ action: "delete", id: editing.id }, "Deleted.").then(() => setEditing(null));
                    }
                  }}
                  className="ml-auto rounded-full border border-red-300 px-5 py-2.5 text-sm font-black text-red-600"
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {/* Preview - the real breakdown component plus a mini card preview */}
      {previewEntry ? (
        <div className="fixed inset-0 z-[9996] overflow-y-auto bg-black/60 p-4" onClick={() => setPreviewEntry(null)}>
          <div className="mx-auto my-6 max-w-2xl" onClick={(event) => event.stopPropagation()}>
            <div
              className="relative mb-3 overflow-hidden rounded-[24px] border border-black/30 p-5"
              style={{
                backgroundImage: `linear-gradient(95deg, rgba(0,0,0,0.72), rgba(0,0,0,0.35)), url(${getVotdBackground(previewEntry).src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#e3c27c]">📖 Verse of the Day</p>
              <p className="mt-2 font-serif text-lg font-bold leading-snug text-[#f7efdf]">{previewEntry.verse_text}</p>
              <p className="mt-2 text-[13px] font-black text-[#e3c27c]">
                {previewEntry.reference} · {previewEntry.translation}
              </p>
            </div>
            <VerseOfTheDayBreakdown
              entry={previewEntry}
              userId={null}
              surface="page"
              onClose={() => setPreviewEntry(null)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
