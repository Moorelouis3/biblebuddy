"use client";

/**
 * The "Report a Problem" card that sits at the bottom of every app page
 * (mounted by AppShell under the page content), so people report from the
 * page where the problem actually happened - the report carries the current
 * page automatically. Louis, 2026-09-03.
 *
 * Reuses the exact pipeline of the Bible in One Year day reporter:
 * POST /api/messages/support-report, which opens a Messages conversation
 * with Louis and drops the report into it.
 */

import { useMemo, useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ModalShell } from "./ModalShell";
import { supabase } from "../lib/supabaseClient";

const REPORT_CATEGORIES = [
  "App bug",
  "Audio or video",
  "Study Notes",
  "Trivia",
  "Billing or upgrade",
  "Account or login",
  "Other",
];

/** A human name for the page being reported, from its path. */
function pageLabel(pathname: string) {
  const rules: Array<[string, string]> = [
    ["/dashboard", "Home"],
    ["/reading", "Bible Reader"],
    ["/Bible", "Bible Reader"],
    ["/plan", "Plan Day"],
    ["/plans", "Plans"],
    ["/devotionals", "Plans"],
    ["/bible-study-games", "Games"],
    ["/bible-trivia", "Bible Trivia"],
    ["/study-groups", "Study Group"],
    ["/verse-of-the-day", "Verse of the Day"],
    ["/events", "Community Event"],
    ["/notes", "Notes"],
    ["/chat", "BB Chat"],
    ["/messages", "Messages"],
    ["/settings", "Settings"],
    ["/profile", "Profile"],
  ];
  for (const [prefix, label] of rules) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return label;
  }
  return pathname;
}

export default function ReportProblemCard() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(REPORT_CATEGORIES[0]);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const area = useMemo(() => pageLabel(pathname), [pathname]);

  function close() {
    if (submitting) return;
    setIsOpen(false);
    setError(null);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (!message.trim()) {
      setError("Please describe what happened.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("Please sign in again and try one more time.");
      }
      const response = await fetch("/api/messages/support-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          category,
          area,
          message,
          source: "Report Problem Card",
          currentUrl:
            typeof window !== "undefined" ? window.location.pathname + window.location.search : pathname,
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || "Could not send your report.");
      }
      setIsOpen(false);
      setMessage("");
      const conversationId = typeof payload?.conversationId === "string" ? payload.conversationId : null;
      if (conversationId) {
        router.push(`/messages/${conversationId}`);
      } else {
        window.alert("Your report was saved. You can check Messages if a follow-up is needed.");
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not send your report.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[960px] px-4 pb-6">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-[rgba(15,23,42,0.12)] p-4 text-left shadow-sm outline-none transition hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] active:scale-[0.99] sm:p-5"
          style={{
            backgroundColor: "#fdf6e9",
            backgroundImage: "url(/verse-of-the-day/verse-bg-05-cream-gold-clouds.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/80 text-2xl shadow-sm backdrop-blur-sm"
            aria-hidden="true"
          >
            🛟
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-black text-[#111827] sm:text-lg">Report a Problem</span>
            <span className="mt-0.5 block text-xs font-semibold text-[#334155]">
              Something broken or confusing on this page? Tell Louis - it goes straight to him.
            </span>
          </span>
          <span
            className="hidden shrink-0 items-center rounded-lg bg-[#111827] px-5 py-2.5 text-xs font-black uppercase tracking-wide sm:flex"
            style={{ color: "#ffffff" }}
          >
            Report →
          </span>
        </button>
      </div>

      <ModalShell isOpen={isOpen} onClose={close} backdropColor="bg-black/55">
        <div className="mx-4 w-full max-w-lg rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-white p-5 text-left shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bb-accent,#2f7fe8)]">
                Report a problem
              </p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">
                Help us fix it faster
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                Report a bug, issue, or suggestion.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--bb-surface-soft,#f4f8ff)] text-xl font-bold text-[var(--bb-text-secondary,#4b5563)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)]"
              aria-label="Close problem report"
            >
              ×
            </button>
          </div>

          {/* The page is captured for you - that is the whole point of the
              card living on every page. */}
          <div className="mt-4 rounded-[20px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-3">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
              Reporting from
            </p>
            <p className="mt-1 text-sm font-black text-[var(--bb-text-primary,#111827)]">{area}</p>
            <p className="mt-1 break-all text-xs font-medium text-[var(--bb-text-muted,#6b7280)]">{pathname}</p>
          </div>

          <form className="mt-5 grid gap-4" onSubmit={submit}>
            <label className="grid gap-2 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
              Type
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-white px-4 py-3 text-sm font-semibold text-[var(--bb-text-primary,#111827)] outline-none transition focus:border-[var(--bb-accent,#2f7fe8)]"
              >
                {REPORT_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
              What happened?
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                placeholder="Tell us what broke, what you expected, and anything that helps us reproduce it."
                className="rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-white px-4 py-3 text-sm font-medium leading-6 text-[var(--bb-text-primary,#111827)] outline-none transition placeholder:text-[var(--bb-text-muted,#6b7280)] focus:border-[var(--bb-accent,#2f7fe8)]"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={close}
                className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-white px-5 py-3 text-sm font-black text-[var(--bb-text-secondary,#4b5563)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-2xl bg-[#111827] px-5 py-3 text-sm font-black shadow-sm transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                style={{ color: "#ffffff" }}
              >
                {submitting ? "Sending..." : "Send to Louis"}
              </button>
            </div>
          </form>
        </div>
      </ModalShell>
    </>
  );
}
