"use client";

/**
 * "Day N is ready" - the daily nudge for members of a live community study
 * (2026-09-23, Louis: opening Bible Buddy without going to the group should
 * still tell you today's day is open).
 *
 * Shown at most once per calendar day (user_popups_seen row per day), never
 * once that day is finished, and never on the pages where it would get in the
 * way. One design for all 31 days: the event art with the day number drawn
 * over it, so there is nothing to make per day.
 * ?previewDay=N shows it early for testing.
 * Tracking: community_event_day_popup_impression / _dismissed / _clicked.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";
import { supabase } from "../lib/supabaseClient";
import { getActiveCommunityEvent } from "../lib/communityEvents";
import { eventDayStudyPath } from "../lib/communityEventDays";
import { PROMO_VISIT_KEY } from "./ProverbsLaunchPopup";

const SHOW_DELAY_MS = 1200;
const EXCLUDED_PREFIXES = ["/start", "/events", "/books", "/devotionals", "/login", "/signup", "/reset-password", "/admin", "/moderator-admin", "/onboarding"];

type Eligibility = { popupId: string; day: number; totalDays: number; title: string | null; devotionalId: string };

function track(eventName: string, userId: string, extra: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "day_popup",
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

export default function CommunityEventDayPopup({
  userId,
  pathname,
  blocked,
}: {
  userId: string;
  pathname: string | null;
  blocked: boolean;
}) {
  const router = useRouter();
  const event = getActiveCommunityEvent();
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<Eligibility | null>(null);
  const pathRef = useRef(pathname);
  const blockedRef = useRef(blocked);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    pathRef.current = pathname;
    blockedRef.current = blocked;
  }, [pathname, blocked]);

  useEffect(() => {
    if (!event) return;
    // ?previewDay=N alone is for the pages (Today card, tracker). Showing this
    // popup early needs ?previewPopup=1 as well, so a preview link cannot
    // surprise anyone with "Day 31 is ready" a week before the study starts
    // (2026-09-23, Louis).
    let previewDay = "";
    try {
      const search = new URLSearchParams(window.location.search);
      if (search.get("previewPopup") === "1") previewDay = search.get("previewDay") || "";
    } catch {}

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      let eligibility: Eligibility | null = null;
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch(`/api/popups/community-event-day${previewDay ? `?previewDay=${encodeURIComponent(previewDay)}` : ""}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const payload = (await res.json()) as { eligible?: boolean } & Eligibility;
        if (!payload.eligible || cancelled) return;
        eligibility = payload;
      } catch {
        return;
      }
      // A local mark as well, so a second page view in the same minute does
      // not fire a second request race.
      try {
        if (window.localStorage.getItem(`bb-popup-done:${eligibility.popupId}:${userId}`)) return;
      } catch {}

      let clearSince = 0;
      const attempt = async () => {
        if (cancelled || !eligibility) return;
        const clear = !isExcluded(pathRef.current) && !blockedRef.current && !otherModalOpen() && !document.hidden;
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
          // Keeps the book/launch promos out of the same visit.
          window.sessionStorage.setItem(PROMO_VISIT_KEY, eligibility.popupId);
        } catch {}
        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        setInfo(eligibility);
        setOpen(true);
        track("community_event_day_popup_impression", userId, { day: eligibility.day, event: event.slug });
      };
      timer = setTimeout(attempt, 600);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [event, userId]);

  const close = useCallback(
    (method: "close_button" | "later" | "escape" | "backdrop") => {
      setOpen(false);
      if (info) track("community_event_day_popup_dismissed", userId, { day: info.day, method });
      restoreFocusRef.current?.focus?.();
    },
    [info, userId],
  );

  const openStudy = useCallback(() => {
    if (!info) return;
    track("community_event_day_popup_clicked", userId, { day: info.day });
    setOpen(false);
    router.push(eventDayStudyPath(info.devotionalId, info.day));
  }, [info, router, userId]);

  useEffect(() => {
    if (!open) return;
    return lockDocumentScroll('[aria-labelledby="community-event-day-title"]');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close("escape");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open || !info || !event) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 backdrop-blur-[3px]"
      style={{ zIndex: 9995 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close("backdrop");
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-event-day-title"
        className="relative w-full max-w-sm overflow-hidden rounded-[26px] text-white shadow-2xl"
        style={{
          background: `linear-gradient(180deg, rgba(10,6,3,0.35) 0%, rgba(16,10,5,0.92) 58%, #16100a 100%), url(${event.bannerArt}) center top / cover no-repeat, #16100a`,
        }}
      >
        <button
          type="button"
          onClick={() => close("close_button")}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-lg font-bold text-white transition hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
        >
          ✕
        </button>
        <div className="px-6 pb-6 pt-24 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#e3b964]">{event.title}</p>
          <h2
            id="community-event-day-title"
            className="mt-2 text-[2.4rem] font-bold leading-none"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', color: "#f6ecd8" }}
          >
            Day {info.day} is ready
          </h2>
          <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-[#cfa147]">
            Day {info.day} of {info.totalDays} · Proverbs {info.day}
          </p>
          {info.title ? <p className="mt-3 text-[15px] font-semibold leading-6 text-[#eadcc2]">{info.title}</p> : null}
          <button
            type="button"
            onClick={openStudy}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#f5dfa0] to-[#cf9f45] py-4 text-[16px] font-black tracking-wide text-[#1c1307] shadow-lg transition hover:brightness-105 active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-white"
          >
            OPEN TODAY&apos;S STUDY <span aria-hidden="true">→</span>
          </button>
          <button type="button" onClick={() => close("later")} className="mt-2 w-full py-2 text-sm font-bold text-white/70 hover:text-white">
            Later today
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
