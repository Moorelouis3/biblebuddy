"use client";

/**
 * One-time promo popup for The Wisdom of Proverbs community study
 * (Louis, 2026-09-13).
 *
 * Who sees it: signed-in users who are not already members and have never
 * been shown it. "Shown" is saved to their account in user_popups_seen
 * (popup_id below) the moment it appears, so it never comes back on another
 * device or browser; localStorage is only a fast skip. Join reuses the same
 * joinCommunityEvent() as the event page, then sends them to that page,
 * which already shows them as signed up.
 *
 * Tracking goes through /api/landing-analytics with user_id:
 * wisdom_proverbs_popup_impression / _dismissed / _join_clicked /
 * _join_success / _join_failed. The generic popup_id means the next promo
 * (Advent, Easter...) is a new id, not a new system.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import AccountRequiredModal from "./AccountRequiredModal";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";
import { supabase } from "../lib/supabaseClient";
import { checkFullAccount, type AccountGateState } from "../lib/accountGate";
import { isCommunityEventMember, joinCommunityEvent } from "../lib/communityEventJoin";
import { getCommunityEvent, getCommunityEventState } from "../lib/communityEvents";

const PROMOTION_ID = "wisdom_proverbs_2026";
const EVENT_SLUG = "wisdom-of-proverbs";
const SHOW_DELAY_MS = 1500;
const EXCLUDED_PREFIXES = ["/start", "/events", "/login", "/signup", "/reset-password", "/admin", "/moderator-admin", "/onboarding"];

const localKey = (userId: string) => `bb-popup-done:${PROMOTION_ID}:${userId}`;

function track(eventName: string, userId: string, extra: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        user_id: userId,
        source: "popup",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: { promotion_id: PROMOTION_ID, event_slug: EVENT_SLUG, source: "popup", ...extra },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics never blocks the popup.
  }
}

function isExcluded(pathname: string | null) {
  return !pathname || EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/** Another modal is up (they all lock body scroll or announce a dialog). */
function otherModalOpen() {
  return document.body.style.overflow === "hidden" || Boolean(document.querySelector('[aria-modal="true"]'));
}

const FEATURES = [
  { icon: "📅", title: "31 Days", text: "One chapter each day in October" },
  { icon: "👥", title: "Study Together", text: "With Bible Buddies around the world" },
  { icon: "💬", title: "Daily Discussion", text: "Share insights, ask questions, encourage each other" },
  { icon: "📈", title: "Grow in Wisdom", text: "Practical truth for everyday life" },
];

export default function WisdomProverbsPopup({
  userId,
  pathname,
  blocked,
}: {
  userId: string;
  pathname: string | null;
  /** AppShell's own modals (install ask, celebrations...) are open. */
  blocked: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gate, setGate] = useState<AccountGateState | null>(null);
  const pathRef = useRef(pathname);
  const blockedRef = useRef(blocked);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  pathRef.current = pathname;
  blockedRef.current = blocked;

  // Eligibility runs once per signed-in user per page load.
  useEffect(() => {
    const event = getCommunityEvent(EVENT_SLUG);
    if (!event || getCommunityEventState(event).phase === "evergreen") return;
    try {
      if (window.localStorage.getItem(localKey(userId))) return;
    } catch {
      // Storage blocked - the account check below still decides.
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    void (async () => {
      try {
        if (await isCommunityEventMember(userId, EVENT_SLUG)) {
          try {
            window.localStorage.setItem(localKey(userId), "member");
          } catch {}
          return;
        }
        const { data: seen, error: seenError } = await supabase
          .from("user_popups_seen")
          .select("id")
          .eq("user_id", userId)
          .eq("popup_id", PROMOTION_ID)
          .maybeSingle();
        // If the seen-state can't be read, don't risk showing it twice.
        if (seenError || seen) {
          if (seen) {
            try {
              window.localStorage.setItem(localKey(userId), "seen");
            } catch {}
          }
          return;
        }
      } catch {
        return;
      }

      // Let the app land first, then wait for a clear moment: right page,
      // no other popup up, tab visible. New users sit on /start for a while,
      // so keep waiting (a cheap local check, no network) until it's clear.
      let clearSince = 0;
      const attempt = async () => {
        if (cancelled) return;
        const clear = !isExcluded(pathRef.current) && !blockedRef.current && !otherModalOpen() && !document.hidden;
        if (!clear) clearSince = 0;
        else if (!clearSince) clearSince = Date.now();
        // Needs a settled moment on a real page, not a flash between routes.
        if (!clear || Date.now() - clearSince < SHOW_DELAY_MS) {
          timer = setTimeout(attempt, 1000);
          return;
        }
        // Record the impression on the account BEFORE showing, so a failed
        // write never leads to a repeat later.
        const { error: writeError } = await supabase.from("user_popups_seen").upsert(
          { user_id: userId, popup_id: PROMOTION_ID, has_seen: true, seen_at: new Date().toISOString(), updated_at: new Date().toISOString() },
          { onConflict: "user_id,popup_id", ignoreDuplicates: true },
        );
        if (writeError || cancelled) return;
        try {
          window.localStorage.setItem(localKey(userId), "seen");
        } catch {}
        restoreFocusRef.current = document.activeElement as HTMLElement | null;
        setOpen(true);
        track("wisdom_proverbs_popup_impression", userId, { page: pathRef.current });
      };
      timer = setTimeout(attempt, 500);
    })();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [userId]);

  const close = useCallback(
    (method: "close_button" | "escape" | "backdrop") => {
      if (joining) return;
      setOpen(false);
      track("wisdom_proverbs_popup_dismissed", userId, { method });
      restoreFocusRef.current?.focus?.();
    },
    [joining, userId],
  );

  const runJoin = useCallback(async () => {
    setJoining(true);
    setError(null);
    const result = await joinCommunityEvent(userId, EVENT_SLUG, { source: "popup" });
    if (!result.ok) {
      setJoining(false);
      setError("Something went wrong. Please try again.");
      track("wisdom_proverbs_popup_join_failed", userId, { error: result.error });
      return;
    }
    track("wisdom_proverbs_popup_join_success", userId, { already_joined: result.alreadyJoined });
    if (!result.alreadyJoined) track("community_event_joined", userId, { event: EVENT_SLUG });
    try {
      window.localStorage.setItem(localKey(userId), "joined");
    } catch {}
    setOpen(false);
    setJoining(false);
    router.push(`/events/${EVENT_SLUG}`);
  }, [router, userId]);

  const handleJoin = useCallback(async () => {
    if (joining) return;
    track("wisdom_proverbs_popup_join_clicked", userId);
    setError(null);
    // Joining needs a full account (name, email, photo), same as the event
    // page. If something is missing, finish it here and the join continues.
    const state = await checkFullAccount();
    if (!state.ok) {
      setGate(state);
      return;
    }
    await runJoin();
  }, [joining, runJoin, userId]);

  // Background scroll lock, shared with every other modal so stacked
  // modals (the account step) unlock in the right order.
  useEffect(() => {
    if (!open) return;
    return lockDocumentScroll("[aria-labelledby=\"proverbs-popup-title\"]");
  }, [open]);

  // Escape and focus trap.
  useEffect(() => {
    if (!open) return;
    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])") || [],
      ).filter((el) => el.offsetParent !== null);
    window.setTimeout(() => focusables()[0]?.focus(), 50);

    const onKey = (event: KeyboardEvent) => {
      if (gate) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close("escape");
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, gate]);

  if (!open) return null;

  const joinText = joining ? "JOINING..." : "JOIN THE GROUP STUDY";

  return createPortal(
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/65 p-3 backdrop-blur-[3px] sm:p-6"
        // Sits under the account modal (ModalShell uses 9990) while that is open.
        style={{ zIndex: gate ? 9980 : 9995 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) close("backdrop");
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="proverbs-popup-title"
          className="relative w-full"
          style={{ maxWidth: "min(880px, calc((100dvh - 48px) * 1.483))" }}
        >
          <h2 id="proverbs-popup-title" className="sr-only">
            Join the Wisdom of Proverbs Group Bible Study
          </h2>

          {/* Desktop / tablet: the artwork itself, with real buttons laid
              exactly over its drawn close X and JOIN button. */}
          <div className="relative hidden overflow-hidden rounded-[28px] shadow-2xl sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/events/proverbs-popup-desktop.webp"
              alt="Join the Group Bible Study! Let's study the Book of Proverbs together this October: 31 days, one chapter each day, study together with Bible Buddies around the world, daily discussion, grow in wisdom."
              width={1200}
              height={809}
              className="block h-auto w-full select-none"
              draggable={false}
            />
            <button
              type="button"
              onClick={() => close("close_button")}
              aria-label="Close"
              className="absolute right-[1.2%] top-[1.4%] h-[9%] w-[6.5%] rounded-full outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
            />
            <button
              type="button"
              onClick={() => void handleJoin()}
              disabled={joining}
              aria-label="Join the group study"
              className={`absolute left-[2.9%] top-[89.3%] h-[8.7%] w-[94.4%] rounded-[14px] outline-none transition focus-visible:ring-4 focus-visible:ring-white ${
                joining
                  ? "bg-[#ecd48f] text-[1.7vw] font-black tracking-wide text-[#1c1307] lg:text-[15px]"
                  : "hover:bg-white/15 active:bg-black/10"
              }`}
            >
              {joining ? joinText : null}
            </button>
            {error ? (
              <p
                role="alert"
                className="absolute bottom-[12%] left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg"
              >
                {error}
              </p>
            ) : null}
          </div>

          {/* Phone: the king as a header and real text below, so nothing is
              shrunk to unreadable. The button never scrolls away. */}
          <div className="flex max-h-[calc(100dvh-24px)] flex-col overflow-hidden rounded-[24px] bg-[#1a120a] text-white shadow-2xl sm:hidden">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="relative h-[34dvh] min-h-[180px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/events/proverbs-popup-mobile-king.webp"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#1a120a]" />
                <button
                  type="button"
                  onClick={() => close("close_button")}
                  aria-label="Close"
                  className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-xl font-bold text-white backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white"
                >
                  ✕
                </button>
              </div>
              <div className="-mt-6 px-5 pb-4">
                <p className="relative text-[30px] font-black leading-[1.05]">
                  Join the
                  <br />
                  <span className="text-[#ecc86f]">Group Bible Study!</span>
                </p>
                <p className="mt-3 text-[15px] font-medium leading-snug text-white/85">
                  Let&apos;s study the Book of Proverbs together this October. Connect with Bible Buddies around the world
                  and grow in wisdom.
                </p>
                <ul className="mt-4 space-y-3">
                  {FEATURES.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-3">
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[#ecc86f] text-lg"
                        aria-hidden="true"
                      >
                        {feature.icon}
                      </span>
                      <span>
                        <span className="block text-[15px] font-black">{feature.title}</span>
                        <span className="block text-[13px] text-white/75">{feature.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-4 rounded-2xl border border-[#ecc86f]/40 bg-white/5 px-4 py-3 text-center">
                  <p className="font-serif text-[16px] italic leading-snug">
                    &ldquo;The fear of the Lord is the beginning of wisdom.&rdquo;
                  </p>
                  <p className="mt-1 text-[11px] font-bold tracking-[0.2em] text-[#ecc86f]">— PROVERBS 9:10</p>
                </blockquote>
              </div>
            </div>
            <div className="shrink-0 border-t border-white/10 bg-[#1a120a] px-4 pb-4 pt-3">
              {error ? (
                <p role="alert" className="mb-2 text-center text-sm font-bold text-red-300">
                  {error}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => void handleJoin()}
                disabled={joining}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#f5dfa0] to-[#ddb862] py-4 text-[16px] font-black tracking-wide text-[#1c1307] shadow-lg transition active:scale-[0.99] disabled:opacity-80 focus-visible:ring-4 focus-visible:ring-white"
              >
                <span aria-hidden="true">👥</span> {joinText} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AccountRequiredModal
        isOpen={Boolean(gate)}
        gate={gate}
        actionLabel="join the study"
        onClose={() => setGate(null)}
        onCompleted={() => {
          setGate(null);
          void runJoin();
        }}
      />
    </>,
    document.body,
  );
}
