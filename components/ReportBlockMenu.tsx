"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ModalShell } from "@/components/ModalShell";
import { BLOCKS_CHANGED_EVENT, blockUser, getUsersIBlocked, unblockUser } from "@/lib/userBlocks";

// Report / block menu for community content (2026-09-21, App Store guideline
// 1.2). Drop it next to any post, comment, profile or member. It hides itself
// for your own content and when you're signed out.

export type ReportContentType =
  | "group_post"
  | "group_comment"
  | "series_comment"
  | "comment"
  | "profile"
  | "event_member"
  | "message";

export const REPORT_REASONS = [
  "Spam",
  "Harassment or bullying",
  "Hate speech",
  "Sexual content",
  "Violence or threats",
  "False information",
  "Something else",
] as const;

type Props = {
  targetUserId: string | null | undefined;
  targetName?: string | null;
  contentType: ReportContentType;
  contentId?: string | null;
  /** Pass when the parent already knows who is signed in; otherwise the session is read. */
  currentUserId?: string | null;
  /** Show the Block option (default true). */
  allowBlock?: boolean;
  /** Label for the report option, e.g. "Report post". */
  reportLabel?: string;
  /** Small dots for dense lists (comments/replies). */
  size?: "sm" | "md";
  className?: string;
  /** Which side the dropdown opens toward. */
  align?: "left" | "right";
  onBlocked?: () => void;
};

async function submitReport(input: {
  reporterId: string;
  reportedUserId: string;
  contentType: ReportContentType;
  contentId?: string | null;
  reason: string;
  note: string;
}): Promise<{ ok: boolean; error?: string }> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return { ok: false, error: "Please sign in to report." };

  try {
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        reportedUserId: input.reportedUserId,
        contentType: input.contentType,
        contentId: input.contentId || "",
        reason: input.reason,
        note: input.note,
      }),
    });
    if (response.ok) return { ok: true };
    const payload = await response.json().catch(() => null);
    if (response.status < 500) return { ok: false, error: payload?.error || "Could not send the report." };
  } catch {
    // Network/server problem: fall through to the direct insert below.
  }

  // Fallback: RLS lets a signed-in user insert their own report directly.
  const note = input.note.replace(/[\r\n\t]+/g, " ").trim().slice(0, 1000);
  const tag = input.contentId ? `[${input.contentType}:${input.contentId}]` : `[${input.contentType}]`;
  const { error } = await supabase.from("buddy_reports").insert({
    reporter_user_id: input.reporterId,
    reported_user_id: input.reportedUserId,
    reason: `${tag} ${input.reason}${note ? ` — ${note}` : ""}`,
  });
  if (error) {
    console.error("[REPORTS] Direct insert error:", error);
    return { ok: false, error: "Could not send the report. Please try again." };
  }
  return { ok: true };
}

export default function ReportBlockMenu({
  targetUserId,
  targetName,
  contentType,
  contentId,
  currentUserId,
  allowBlock = true,
  reportLabel,
  size = "md",
  className = "",
  align = "right",
  onBlocked,
}: Props) {
  const [sessionUserId, setSessionUserId] = useState<string | null>(currentUserId ?? null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [blockOpen, setBlockOpen] = useState(false);
  const [reason, setReason] = useState<string>("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reported, setReported] = useState(false);
  const [blockedByMe, setBlockedByMe] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const viewerId = currentUserId !== undefined ? currentUserId : sessionUserId;
  const name = (targetName || "").trim() || "this user";

  useEffect(() => {
    if (currentUserId !== undefined) return;
    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setSessionUserId(data.session?.user?.id ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [currentUserId]);

  useEffect(() => {
    if (!viewerId || !targetUserId || !allowBlock) return;
    let cancelled = false;
    const refresh = () => {
      void getUsersIBlocked({ userId: viewerId }).then((ids) => {
        if (!cancelled) setBlockedByMe(ids.has(targetUserId));
      });
    };
    refresh();
    window.addEventListener(BLOCKS_CHANGED_EVENT, refresh);
    return () => {
      cancelled = true;
      window.removeEventListener(BLOCKS_CHANGED_EVENT, refresh);
    };
  }, [viewerId, targetUserId, allowBlock]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [menuOpen]);

  if (!viewerId || !targetUserId || viewerId === targetUserId) return null;

  // Clicks and keys inside the menu/modals (which portal but still bubble
  // through React) must not reach clickable parent cards: feed cards open the
  // post on click and on Enter/Space.
  function stop(event: React.SyntheticEvent) {
    event.stopPropagation();
  }

  function openReport() {
    setMenuOpen(false);
    setReason("");
    setNote("");
    setError(null);
    setReported(false);
    setReportOpen(true);
  }

  function closeReport() {
    setReportOpen(false);
  }

  async function handleSubmitReport() {
    if (!viewerId || !targetUserId || !reason || busy) return;
    setBusy(true);
    setError(null);
    const result = await submitReport({
      reporterId: viewerId,
      reportedUserId: targetUserId,
      contentType,
      contentId,
      reason,
      note,
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error || "Could not send the report.");
      return;
    }
    setReported(true);
  }

  async function handleBlock() {
    if (!targetUserId || busy) return;
    setBusy(true);
    setError(null);
    const result = await blockUser(targetUserId);
    setBusy(false);
    if (!result.ok) {
      setError(result.error || "Could not block.");
      return;
    }
    setBlockedByMe(true);
    setBlockOpen(false);
    onBlocked?.();
  }

  async function handleUnblock() {
    if (!targetUserId || busy) return;
    setBusy(true);
    const result = await unblockUser(targetUserId);
    setBusy(false);
    setMenuOpen(false);
    if (result.ok) setBlockedByMe(false);
  }

  const buttonSize = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const dotSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const defaultReportLabel =
    contentType === "profile" ? `Report ${name}` : contentType === "event_member" ? "Report" : contentType === "group_post" ? "Report post" : "Report comment";

  return (
    <div
      ref={menuRef}
      className={`${/\babsolute\b/.test(className) ? "" : "relative "}inline-flex ${className}`}
      onClick={stop}
      onMouseDown={stop}
      onTouchStart={stop}
      onKeyDown={stop}
    >
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setMenuOpen((open) => !open);
        }}
        className={`flex ${buttonSize} items-center justify-center rounded-full text-[var(--bb-text-muted,#9ca3af)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)] hover:text-[var(--bb-text-secondary,#4b5563)]`}
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <svg className={dotSize} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="5" cy="12" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="19" cy="12" r="1.8" />
        </svg>
      </button>

      {menuOpen && (
        <div
          role="menu"
          className={`absolute ${align === "right" ? "right-0" : "left-0"} top-full z-40 mt-1 w-56 overflow-hidden rounded-2xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] p-1.5 text-left shadow-2xl`}
        >
          <button
            type="button"
            role="menuitem"
            onClick={openReport}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
          >
            <span aria-hidden="true">🚩</span>
            {reportLabel || defaultReportLabel}
          </button>
          {allowBlock &&
            (blockedByMe ? (
              <button
                type="button"
                role="menuitem"
                onClick={() => void handleUnblock()}
                disabled={busy}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)] disabled:opacity-50"
              >
                <span aria-hidden="true">↩</span>
                {busy ? "Unblocking..." : `Unblock ${name}`}
              </button>
            ) : (
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setError(null);
                  setBlockOpen(true);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <span aria-hidden="true">⛔</span>
                Block {name}
              </button>
            ))}
        </div>
      )}

      <ModalShell isOpen={reportOpen} onClose={closeReport} backdropColor="bg-black/60" zIndex="z-[95]">
        <div
          className="mx-2 w-full max-w-md rounded-[28px] border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-6 py-6 text-left text-[var(--bb-text-primary,#111827)] shadow-2xl"
          onClick={stop}
        >
          {reported ? (
            <>
              <h2 className="text-xl font-bold">Thanks for letting us know</h2>
              <p className="mt-2 text-sm text-[var(--bb-text-secondary,#6b7280)]">
                Thanks — we review reports within 24 hours.
              </p>
              {allowBlock && !blockedByMe && (
                <p className="mt-3 text-sm text-[var(--bb-text-secondary,#6b7280)]">
                  Don&apos;t want to see {name} at all? You can block them too.
                </p>
              )}
              <div className="mt-6 flex gap-3">
                {allowBlock && !blockedByMe && (
                  <button
                    type="button"
                    onClick={() => {
                      setReportOpen(false);
                      setBlockOpen(true);
                    }}
                    className="flex-1 rounded-2xl border border-red-200 bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Block {name}
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeReport}
                  className="flex-1 rounded-2xl bg-[var(--bb-button,#4a9b6f)] px-4 py-3 text-sm font-semibold text-[var(--bb-button-text,#ffffff)] transition hover:opacity-90"
                >
                  Done
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">Report</h2>
              <p className="mt-2 text-sm text-[var(--bb-text-secondary,#6b7280)]">
                What&apos;s wrong with this {contentType === "profile" || contentType === "event_member" ? "profile" : contentType === "group_post" ? "post" : "comment"}?
              </p>

              <div className="mt-4 space-y-2">
                {REPORT_REASONS.map((option) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition ${
                      reason === option
                        ? "border-[var(--bb-accent,#4a9b6f)] bg-[var(--bb-accent-soft,#eef7f1)]"
                        : "border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`report-reason-${contentType}-${contentId || targetUserId}`}
                      checked={reason === option}
                      onChange={() => setReason(option)}
                      className="h-4 w-4 accent-[var(--bb-accent,#4a9b6f)]"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={1000}
                rows={3}
                placeholder="Add a note (optional)"
                className="mt-4 w-full resize-none rounded-2xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-surface,#ffffff)] px-4 py-3 text-sm text-[var(--bb-text-primary,#111827)] placeholder-[var(--bb-text-muted,#9ca3af)] focus:outline-none focus:ring-2 focus:ring-[var(--bb-accent,#4a9b6f)]"
              />

              {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={closeReport}
                  className="flex-1 rounded-2xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#374151)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleSubmitReport()}
                  disabled={!reason || busy}
                  className="flex-1 rounded-2xl bg-[var(--bb-button,#4a9b6f)] px-4 py-3 text-sm font-semibold text-[var(--bb-button-text,#ffffff)] transition hover:opacity-90 disabled:opacity-50"
                >
                  {busy ? "Sending..." : "Send report"}
                </button>
              </div>
            </>
          )}
        </div>
      </ModalShell>

      <ModalShell isOpen={blockOpen} onClose={() => setBlockOpen(false)} backdropColor="bg-black/60" zIndex="z-[95]">
        <div
          className="mx-2 w-full max-w-md rounded-[28px] border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-6 py-6 text-left text-[var(--bb-text-primary,#111827)] shadow-2xl"
          onClick={stop}
        >
          <h2 className="text-xl font-bold">Block {name}?</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--bb-text-secondary,#6b7280)]">
            You won&apos;t see their posts, comments or messages anymore, and they won&apos;t be able to message you.
            They aren&apos;t told that you blocked them. You can unblock them any time from their profile.
          </p>
          {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setBlockOpen(false)}
              className="flex-1 rounded-2xl border border-[var(--bb-card-border,#e5e7eb)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#374151)] transition hover:bg-[var(--bb-surface-soft,#f3f4f6)]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleBlock()}
              disabled={busy}
              className="flex-1 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {busy ? "Blocking..." : "Block"}
            </button>
          </div>
        </div>
      </ModalShell>
    </div>
  );
}
