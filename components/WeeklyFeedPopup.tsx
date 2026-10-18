"use client";

/**
 * The two weekly nudges towards the feed (2026-10-18, Louis): one asking for a
 * prayer request, one asking this week's poll question.
 *
 * Each is shown to a person once a week - prayer on a Sunday week, the poll on
 * the Wednesday week the poll bank already rotates on - so nobody gets both in
 * the same visit and nobody gets the same one twice. A promo popup that has
 * already appeared this visit (PROMO_VISIT_KEY) wins, and the weekly one waits
 * for the next visit rather than stacking on top of it.
 *
 * The poll is answered in the popup itself. The prayer one opens the feed with
 * the composer already on Prayer -> Request, because the ask is the whole point
 * and a feed that opens on a blank box loses people.
 *
 * Tracking: weekly_popup_impression / _dismissed / _poll_voted / _prayer_clicked.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";
import { supabase } from "../lib/supabaseClient";
import type { WeeklyFeedPopupKind } from "../lib/weeklyFeedPopups";
import { PROMO_VISIT_KEY } from "./ProverbsLaunchPopup";

const SHOW_DELAY_MS = 1200;
const EXCLUDED_PREFIXES = [
  "/start",
  "/events",
  "/books",
  "/login",
  "/signup",
  "/reset-password",
  "/admin",
  "/moderator-admin",
  "/onboarding",
  "/bb-feed",
];

type PollOption = { key: string; text: string };
type PollPayload = {
  id: string;
  groupId: string;
  pollKey: string;
  subjectTitle: string;
  question: string;
  intro: string | null;
  options: PollOption[];
  counts: Record<string, number>;
  totalVotes: number;
};
type Eligibility = { popupId: string; weekKey: string; poll?: PollPayload };

function track(eventName: string, userId: string, extra: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "weekly_popup",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: extra,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics never blocks the popup */
  }
}

function isExcluded(pathname: string | null) {
  return !pathname || EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function otherModalOpen() {
  return document.body.style.overflow === "hidden" || Boolean(document.querySelector('[aria-modal="true"]'));
}

export default function WeeklyFeedPopup({
  kind,
  userId,
  pathname,
  blocked,
}: {
  kind: WeeklyFeedPopupKind;
  userId: string;
  pathname: string | null;
  /** AppShell's own modals (install ask, celebrations...) are open. */
  blocked: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<Eligibility | null>(null);
  const [voted, setVoted] = useState<string | null>(null);
  const [voting, setVoting] = useState<string | null>(null);
  const pathRef = useRef(pathname);
  const blockedRef = useRef(blocked);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    pathRef.current = pathname;
    blockedRef.current = blocked;
  }, [pathname, blocked]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      let eligibility: Eligibility | null = null;
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch(`/api/popups/weekly-feed?kind=${kind}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const payload = (await res.json()) as { eligible?: boolean } & Eligibility;
        if (!payload.eligible || cancelled) return;
        eligibility = payload;
      } catch {
        return;
      }

      // A local mark too, so a second page view in the same minute cannot race
      // a second request.
      try {
        if (window.localStorage.getItem(`bb-popup-done:${eligibility.popupId}:${userId}`)) return;
      } catch {}

      let clearSince = 0;
      const attempt = async () => {
        if (cancelled || !eligibility) return;
        let promoAlreadyShown = false;
        try {
          promoAlreadyShown = Boolean(window.sessionStorage.getItem(PROMO_VISIT_KEY));
        } catch {}
        const clear =
          !promoAlreadyShown &&
          !isExcluded(pathRef.current) &&
          !blockedRef.current &&
          !otherModalOpen() &&
          !document.hidden;
        if (!clear) clearSince = 0;
        else if (!clearSince) clearSince = Date.now();
        if (!clear || Date.now() - clearSince < SHOW_DELAY_MS) {
          timer = setTimeout(attempt, 1000);
          return;
        }

        const now = new Date().toISOString();
        const { error } = await supabase.from("user_popups_seen").upsert(
          { user_id: userId, popup_id: eligibility.popupId, has_seen: true, seen_at: now, updated_at: now },
          { onConflict: "user_id,popup_id", ignoreDuplicates: true },
        );
        if (error || cancelled) return;
        try {
          window.localStorage.setItem(`bb-popup-done:${eligibility.popupId}:${userId}`, "seen");
          // Keeps the other weekly nudge, and the promos, out of this visit.
          window.sessionStorage.setItem(PROMO_VISIT_KEY, eligibility.popupId);
        } catch {}
        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        setInfo(eligibility);
        setOpen(true);
        track("weekly_popup_impression", userId, { kind, week: eligibility.weekKey });
      };
      timer = setTimeout(attempt, 600);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [kind, userId]);

  const close = useCallback(
    (method: "close_button" | "later" | "escape" | "backdrop") => {
      setOpen(false);
      track("weekly_popup_dismissed", userId, { kind, method, week: info?.weekKey });
      restoreFocusRef.current?.focus?.();
    },
    [info?.weekKey, kind, userId],
  );

  const openFeed = useCallback(
    (reason: "prayer" | "poll_results") => {
      track("weekly_popup_prayer_clicked", userId, { kind, reason, week: info?.weekKey });
      setOpen(false);
      router.push(reason === "prayer" ? "/bb-feed?compose=prayer_request" : "/bb-feed");
    },
    [info?.weekKey, kind, router, userId],
  );

  const vote = useCallback(
    async (optionKey: string) => {
      const poll = info?.poll;
      if (!poll || voting) return;
      setVoting(optionKey);
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch(`/api/groups/${poll.groupId}/weekly-poll/vote`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ pollId: poll.id, optionKey }),
        });
        if (!res.ok) return;
        setVoted(optionKey);
        track("weekly_popup_poll_voted", userId, { option: optionKey, poll: poll.pollKey, week: info?.weekKey });
      } catch {
        // Leave the options up; a failed vote is better than a lie.
      } finally {
        setVoting(null);
      }
    },
    [info?.poll, info?.weekKey, userId, voting],
  );

  useEffect(() => {
    if (!open) return;
    return lockDocumentScroll('[aria-labelledby="weekly-popup-title"]');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close("escape");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, open]);

  if (!open || !info || typeof document === "undefined") return null;

  const poll = info.poll;
  const totalAfterVote = (poll?.totalVotes ?? 0) + (voted ? 1 : 0);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onClick={() => close("backdrop")}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="weekly-popup-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="relative bg-gradient-to-br from-[#1f3a63] via-[#2f6fd0] to-[#5b9be8] px-6 py-7 text-center text-white">
          <button
            type="button"
            onClick={() => close("close_button")}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg text-white transition hover:bg-white/25"
          >
            ×
          </button>
          <div aria-hidden className="text-3xl">
            {kind === "prayer" ? "🙏" : "💬"}
          </div>
          <h2 id="weekly-popup-title" className="mt-2 text-xl font-bold leading-snug">
            {kind === "prayer" ? "What can we pray for this week?" : poll?.question}
          </h2>
          <p className="mt-2 text-sm text-white/85">
            {kind === "prayer"
              ? "Drop it on the feed and the Bible Buddy community prays with you."
              : poll?.subjectTitle || "This week's question"}
          </p>
        </div>

        <div className="px-6 py-6">
          {kind === "prayer" ? (
            <>
              <p className="text-[15px] leading-relaxed text-[#2c3e55]">
                Be as specific as you need, or just say <em>please pray for me</em>. Nothing is too small, and nobody
                here is judging.
              </p>
              <button
                type="button"
                onClick={() => openFeed("prayer")}
                className="mt-5 w-full rounded-full bg-[#2f6fd0] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-[#2f6fd0]/25 transition hover:bg-[#2559ab]"
              >
                Share a prayer request
              </button>
            </>
          ) : (
            <>
              {poll?.intro ? (
                <p className="mb-4 text-[15px] leading-relaxed text-[#2c3e55]">{poll.intro}</p>
              ) : null}
              <div className="space-y-2">
                {(poll?.options || []).map((option) => {
                  const count = (poll?.counts[option.key] || 0) + (voted === option.key ? 1 : 0);
                  const share = totalAfterVote > 0 ? Math.round((count / totalAfterVote) * 100) : 0;
                  const chosen = voted === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      disabled={Boolean(voted) || Boolean(voting)}
                      onClick={() => vote(option.key)}
                      className={`relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left text-[15px] font-semibold transition ${
                        chosen
                          ? "border-[#2f6fd0] text-[#10213a]"
                          : voted
                            ? "border-[#e3ecf8] text-[#5b6c84]"
                            : "border-[#dce7f7] text-[#10213a] hover:border-[#2f6fd0] hover:bg-[#f5f9ff]"
                      }`}
                    >
                      {voted ? (
                        <span
                          aria-hidden
                          className="absolute inset-y-0 left-0 bg-[#eaf2ff]"
                          style={{ width: `${share}%` }}
                        />
                      ) : null}
                      <span className="relative flex items-center justify-between gap-3">
                        <span>{option.text}</span>
                        {voted ? <span className="text-sm font-bold text-[#2f6fd0]">{share}%</span> : null}
                      </span>
                    </button>
                  );
                })}
              </div>
              {voted ? (
                <button
                  type="button"
                  onClick={() => openFeed("poll_results")}
                  className="mt-5 w-full rounded-full bg-[#2f6fd0] px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-[#2f6fd0]/25 transition hover:bg-[#2559ab]"
                >
                  See what everyone said
                </button>
              ) : null}
            </>
          )}

          <button
            type="button"
            onClick={() => close("later")}
            className="mt-3 w-full rounded-full px-6 py-2.5 text-sm font-semibold text-[#5b6c84] transition hover:bg-[#f3f7fc]"
          >
            {voted ? "Close" : "Maybe later"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
