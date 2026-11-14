"use client";

/**
 * The one popup shell for tutorials and announcements (Louis, 2026-11-13).
 *
 * PROPOSAL / PREVIEW. Today only /tips opens this, when somebody taps a
 * tutorial there. Nothing opens it automatically. See
 * docs/POPUP_SYSTEM_PROPOSAL.md.
 *
 * It is the approved look from NewGamesPopup and BibleLockPopup - white
 * rounded card, lavender wash, pill, dark navy headline with the underline,
 * one coloured feature card with a small picture of the real thing, one main
 * button - turned into a single component that draws whatever entry of
 * lib/popups/catalog.ts it is handed. A new tutorial is a new entry in that
 * list, not a new component.
 *
 * This component only draws and handles the keyboard. It does not decide who
 * sees it, and it records nothing: whoever opens it is told how it was closed
 * and does the remembering.
 *
 * Phone first: the middle scrolls, the main button and "Maybe later" stay
 * pinned under it, the close button stays pinned above it, the page behind
 * does not move, and the safe areas are respected.
 */

import { useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { lockDocumentScroll } from "../../hooks/useDocumentScrollLock";
import type { PopupDefinition, PopupEventSignup, PopupPreview } from "../../lib/popups/catalog";
import { Sparkle } from "../NewGamesPopup";

export type FeaturePopupCloseMethod =
  "close_button" | "escape" | "backdrop" | "later" | "never";

const ENTRANCE_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .bb-feature-popup-card { animation: bb-feature-popup-in 260ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
  @keyframes bb-feature-popup-in {
    from { opacity: 0; transform: translateY(14px) scale(0.98); }
    to { opacity: 1; transform: none; }
  }
}
`;

/** Lavender for things you study with, blue for things you play or join. */
const TONES: Record<
  "lavender" | "blue" | "brand",
  {
    card: string;
    border: string;
    icon: string;
    button: string;
    ring: string;
    shadow: string;
    /** The wash behind the headline. */
    wash: string;
    pillBg: string;
    pillText: string;
    /** Sparkle and the underline. */
    accent: string;
    /** Hairlines in the footer. */
    line: string;
  }
> = {
  lavender: {
    card: "linear-gradient(135deg, #f6efff 0%, #eadcff 100%)",
    border: "#d9c8fb",
    icon: "#e2d0fb",
    button: "linear-gradient(180deg, #8b45f0 0%, #6d28d9 100%)",
    ring: "#c4b5fd",
    shadow: "0 8px 18px rgba(109,40,217,0.35)",
    wash: "linear-gradient(180deg, #e9defd 0%, #f3ecff 48%, #ffffff 100%)",
    pillBg: "#dfcffb",
    pillText: "#5b21b6",
    accent: "#7c3aed",
    line: "#cdbff0",
  },
  blue: {
    card: "linear-gradient(135deg, #eef7ff 0%, #d9ecff 100%)",
    border: "#bfdcf8",
    icon: "#cfe6fb",
    button: "linear-gradient(180deg, #2f6bf0 0%, #1d4ed8 100%)",
    ring: "#93c5fd",
    shadow: "0 8px 18px rgba(29,78,216,0.35)",
    wash: "linear-gradient(180deg, #e9defd 0%, #f3ecff 48%, #ffffff 100%)",
    pillBg: "#dfcffb",
    pillText: "#5b21b6",
    accent: "#7c3aed",
    line: "#cdbff0",
  },
  // Bible Buddy's own blue, the colour of the logo (--bb-logo-blue #0056FD).
  // Louis, 2026-11-14: "blue like the logo is my main color, not purple".
  // Used for the two store asks, head to foot.
  brand: {
    card: "linear-gradient(135deg, #eef4ff 0%, #d6e6ff 100%)",
    border: "#b9d2ff",
    icon: "#cfe0ff",
    button: "linear-gradient(180deg, #2f74ff 0%, #0056fd 100%)",
    ring: "#93c5fd",
    shadow: "0 8px 18px rgba(0,86,253,0.35)",
    wash: "linear-gradient(180deg, #dbe8ff 0%, #edf3ff 48%, #ffffff 100%)",
    pillBg: "#cfe0ff",
    pillText: "#0041c2",
    accent: "#0056fd",
    line: "#b9d2ff",
  },
};

const MAIN_BUTTON =
  "flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-5 text-[17px] font-black text-white outline-none transition active:scale-[0.98] focus-visible:ring-4";

const TONE_BY_PREVIEW: Record<PopupPreview, keyof typeof TONES> = {
  reader: "lavender",
  study_day: "lavender",
  memory: "lavender",
  verse_of_the_day: "lavender",
  word_search: "blue",
  trivia: "blue",
  feed: "blue",
  app_store: "brand",
  android_beta: "brand",
  event_signup: "brand",
};

/** Where a study sign-up has got to. Only a popup with `event` uses it. */
export type FeaturePopupSignup = "idle" | "working" | "done";

export default function FeaturePopup({
  popup,
  inSection,
  onClose,
  onCta,
  signup = "idle",
  onDone,
}: {
  popup: PopupDefinition;
  /** The person is already where the feature lives: the button just closes. */
  inSection: boolean;
  onClose: (method: FeaturePopupCloseMethod) => void;
  onCta: () => void;
  /** A study sign-up only: the button registers, then the popup says so. */
  signup?: FeaturePopupSignup;
  /** A study sign-up only: the button after it is done ("See the study page"). */
  onDone?: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = `feature-popup-title-${popup.id}`;
  const tone = TONES[TONE_BY_PREVIEW[popup.preview]];
  const headlineStart = popup.headline.slice(
    0,
    popup.headline.length - popup.headlineAccent.length,
  );

  // Background scroll lock, shared with every other modal.
  useEffect(
    () => lockDocumentScroll(`[aria-labelledby="${titleId}"]`),
    [titleId],
  );

  // Escape, focus trap, and focus back where it came from on the way out.
  useEffect(() => {
    const cameFrom = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href]",
        ) || [],
      ).filter((el) => el.offsetParent !== null);
    // Focus lands on the main button, not on Close.
    const focusTimer = window.setTimeout(
      () =>
        (focusables()[1] ?? focusables()[0])?.focus({ preventScroll: true }),
      50,
    );

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose("escape");
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
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      cameFrom?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  // A study sign-up with designed artwork: same dialog, same keys, same
  // buttons calling the same handlers - only drawn differently.
  if (popup.event?.poster) {
    return createPortal(
      <PosterSignup
        popup={popup}
        event={popup.event}
        poster={popup.event.poster}
        titleId={titleId}
        dialogRef={dialogRef}
        signup={signup}
        onClose={onClose}
        onCta={onCta}
        onDone={onDone}
      />,
      document.body,
    );
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(30,27,45,0.5)] backdrop-blur-md"
      style={{
        zIndex: 9995,
        paddingTop: "max(12px, env(safe-area-inset-top))",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        paddingLeft: "max(12px, env(safe-area-inset-left))",
        paddingRight: "max(12px, env(safe-area-inset-right))",
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose("backdrop");
      }}
    >
      <style>{ENTRANCE_CSS}</style>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={`${titleId}-sub`}
        className="bb-feature-popup-card relative flex max-h-full w-full max-w-[460px] flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(31,20,70,0.35)]"
      >
        <button
          type="button"
          onClick={() => onClose("close_button")}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white text-[#111827] shadow-[0_4px_14px_rgba(60,40,120,0.22)] outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M3.5 3.5l11 11M14.5 3.5l-11 11"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {popup.event ? (
            <EventSignupBody popup={popup} event={popup.event} tone={tone} titleId={titleId} done={signup === "done"} />
          ) : (
          <>
          <div
            className="px-5 pb-3.5 pt-5 sm:px-6"
            style={{ background: tone.wash }}
          >
            <div className="flex items-center gap-1.5 pr-14">
              <Sparkle
                color={tone.accent}
                className="h-5 w-5 shrink-0 -rotate-12"
              />
              <p
                className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em]"
                style={{ background: tone.pillBg, color: tone.pillText }}
              >
                {popup.pill}
              </p>
            </div>
            <h2
              id={titleId}
              className="mt-3 pr-10 text-[28px] font-black leading-[1.1] tracking-tight text-[#14122b] sm:text-[32px]"
            >
              {headlineStart}
              <span className="relative inline-block whitespace-nowrap">
                {popup.headlineAccent}
                <svg
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-2 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 Q 50 1 98 6"
                    fill="none"
                    stroke={tone.accent}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p
              id={`${titleId}-sub`}
              className="mt-2.5 text-[16px] font-semibold leading-snug text-[#4b5068]"
            >
              {popup.description}
            </p>
          </div>

          <div className="px-4 pb-3.5 sm:px-5">
            <section
              className="relative overflow-hidden rounded-[26px] border p-4 shadow-[0_6px_18px_rgba(91,80,220,0.12)]"
              style={{ background: tone.card, borderColor: tone.border }}
            >
              {popup.kind === "ask" ? (
                <div aria-hidden="true">
                  <Preview kind={popup.preview} />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl text-[28px] shadow-inner"
                      style={{ background: tone.icon }}
                      aria-hidden="true"
                    >
                      {popup.cardIcon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[21px] font-black leading-tight text-[#14122b]">
                        {popup.cardTitle}
                      </h3>
                      <p className="text-[14px] font-semibold leading-snug text-[#4b5068]">
                        {popup.cardLine}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-3.5 rounded-2xl bg-white p-3 shadow-[0_4px_14px_rgba(60,60,160,0.14)]"
                    aria-hidden="true"
                  >
                    <Preview kind={popup.preview} />
                  </div>
                </>
              )}
            </section>

            {popup.steps.length ? (
              <ol className="mt-3.5 flex flex-col gap-2.5 px-1">
                {popup.steps.map((step, index) => (
                  <li key={step.title} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ede4ff] text-[12px] font-black text-[#6d28d9]"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <p className="min-w-0 text-[14px] leading-snug text-[#4b5068]">
                      <span className="block text-[15px] font-black text-[#14122b]">
                        {step.title}
                      </span>
                      {step.detail}
                    </p>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
          </>
          )}
        </div>

        <div className="shrink-0 border-t border-[#efe9fb] bg-white px-4 pb-2 pt-3 sm:px-5">
          {popup.event ? (
            <button
              type="button"
              onClick={signup === "done" ? onDone : onCta}
              disabled={signup === "working"}
              className={`${MAIN_BUTTON} disabled:opacity-70`}
              style={{
                background: tone.button,
                boxShadow: tone.shadow,
                ["--tw-ring-color" as string]: tone.ring,
              }}
            >
              {signup === "done" ? "See the study page" : signup === "working" ? "Signing you up…" : popup.cta.label}
              {signup === "done" ? <span aria-hidden="true">→</span> : null}
            </button>
          ) : popup.cta.external ? (
            /* A real link, not a button that navigates: leaving for the App
               Store has to be the person's own tap or the phone may not
               hand it over to the store. */
            <a
              href={popup.cta.href}
              onClick={onCta}
              className={MAIN_BUTTON}
              style={{
                background: tone.button,
                boxShadow: tone.shadow,
                color: "#ffffff",
                ["--tw-ring-color" as string]: tone.ring,
              }}
            >
              {popup.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={onCta}
              className={MAIN_BUTTON}
              style={{
                background: tone.button,
                boxShadow: tone.shadow,
                ["--tw-ring-color" as string]: tone.ring,
              }}
            >
              {inSection ? popup.ctaInSection : popup.cta.label}
              {inSection ? null : <span aria-hidden="true">→</span>}
            </button>
          )}
          {popup.footnote ? (
            <p className="mt-3 flex items-center justify-center gap-3 text-[13px] font-bold text-[#3b3f58]">
              <span
                className="h-px w-8"
                style={{ background: tone.line }}
                aria-hidden="true"
              />
              <span className="text-center">{popup.footnote}</span>
              <span
                className="h-px w-8"
                style={{ background: tone.line }}
                aria-hidden="true"
              />
            </p>
          ) : null}
          <div className="mt-1 flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => onClose("later")}
              className="min-h-[44px] rounded-xl px-4 text-[15px] font-bold text-[#7b8094] outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
            >
              {signup === "done" ? "Close" : popup.event ? "Maybe Later" : "Maybe later"}
            </button>
            {popup.offerNeverAgain ? (
              <>
                <span style={{ color: tone.line }} aria-hidden="true">
                  •
                </span>
                <button
                  type="button"
                  onClick={() => onClose("never")}
                  className="min-h-[44px] rounded-xl px-4 text-[14px] font-semibold text-[#9aa0b4] outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
                >
                  Don&apos;t show again
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ───────────────────────── a study sign-up ─────────────────────────

/**
 * The middle of a study sign-up (a catalog entry with `event`): the study's
 * approved banner whole across the top, then the words. Same shell, close
 * button, focus trap and footer as every other popup.
 */
function EventSignupBody({
  popup,
  event,
  tone,
  titleId,
  done,
}: {
  popup: PopupDefinition;
  event: PopupEventSignup;
  tone: (typeof TONES)[keyof typeof TONES];
  titleId: string;
  done: boolean;
}) {
  return (
    <>
      {/* The title is in the artwork too, so the picture is decoration to a
          screen reader: the heading below says it. Width and height are the
          file's own, so the card does not jump when it loads. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={event.art} alt="" width={2000} height={667} className="block h-auto w-full" />
      <div className="px-5 pb-4 pt-4 text-center sm:px-6" style={{ background: tone.wash }}>
        {done ? (
          <div role="status">
            <p className="text-[34px] leading-none" aria-hidden="true">
              🎉
            </p>
            <h2 id={titleId} className="mt-2 text-[26px] font-black leading-[1.1] tracking-tight text-[#14122b]">
              {event.doneTitle}
            </h2>
            <p id={`${titleId}-sub`} className="mt-2.5 text-[16px] font-semibold leading-snug text-[#4b5068]">
              {event.doneLine}
            </p>
          </div>
        ) : (
          <>
            <p
              className="inline-block rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em]"
              style={{ background: tone.pillBg, color: tone.pillText }}
            >
              {popup.pill}
            </p>
            <h2
              id={titleId}
              className="mt-3 text-[26px] font-black uppercase leading-[1.1] tracking-tight text-[#14122b] sm:text-[30px]"
            >
              {popup.headline}
            </h2>
            <p className="mt-2 text-[13px] font-black uppercase leading-relaxed tracking-[0.14em]" style={{ color: tone.accent }}>
              {event.facts[0]}
              <br />
              {event.facts[1]}
            </p>
            <p id={`${titleId}-sub`} className="mt-3 text-[16px] font-semibold leading-snug text-[#4b5068]">
              {popup.description}
            </p>
          </>
        )}
      </div>
      {done ? null : (
        <ul
          className="mx-4 mb-4 flex flex-col gap-2 rounded-[22px] border px-4 py-3.5 sm:mx-5"
          style={{ background: tone.card, borderColor: tone.border }}
        >
          {event.bullets.map((bullet) => (
            <li key={bullet} className="text-[15px] font-bold leading-snug text-[#14122b]">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// ───────────────────────── a study sign-up with designed artwork ─────────────────────────

const GOLD_BUTTON =
  "flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-[#f5dfa0] to-[#ddb862] whitespace-nowrap px-3 py-4 text-[15px] font-black uppercase text-[#1c1307] max-[359px]:text-[13px] shadow-lg outline-none transition active:scale-[0.99] disabled:opacity-80 focus-visible:ring-4 focus-visible:ring-white";

/**
 * The look of the Beginning of Everything popup, for a catalog entry whose
 * `event` has a `poster`.
 *
 *   wide screen   the finished image, a real button laid over its drawn one
 *                 and a real ✕ (never an invisible hotspot over empty sky)
 *   phone         the picture as a header, the words as real text so nothing
 *                 is shrunk to unreadable, the button pinned at the bottom
 *   signed up     the dark card at every size, saying so
 *
 * It draws and nothing else: the buttons call the handlers FeaturePopup was
 * given, so eligibility, limits, snoozing and the sign-up itself are exactly
 * the plain card's.
 */
function PosterSignup({
  popup,
  event,
  poster,
  titleId,
  dialogRef,
  signup,
  onClose,
  onCta,
  onDone,
}: {
  popup: PopupDefinition;
  event: PopupEventSignup;
  poster: NonNullable<PopupEventSignup["poster"]>;
  titleId: string;
  dialogRef: RefObject<HTMLDivElement | null>;
  signup: FeaturePopupSignup;
  onClose: (method: FeaturePopupCloseMethod) => void;
  onCta: () => void;
  onDone?: () => void;
}) {
  const done = signup === "done";
  const working = signup === "working";
  const spot = poster.button;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/65 backdrop-blur-[3px]"
      style={{
        zIndex: 9995,
        paddingTop: "max(12px, env(safe-area-inset-top))",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        paddingLeft: "max(12px, env(safe-area-inset-left))",
        paddingRight: "max(12px, env(safe-area-inset-right))",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose("backdrop");
      }}
    >
      <style>{ENTRANCE_CSS}</style>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={`${titleId}-sub`}
        className="bb-feature-popup-card relative flex max-h-full w-full flex-col"
        style={{ maxWidth: done ? 460 : "min(880px, calc((100dvh - 48px) * 1.483))" }}
      >
        <h2 id={titleId} className="sr-only">
          {done ? event.doneTitle : popup.headline}
        </h2>
        <p id={`${titleId}-sub`} className="sr-only">
          {done ? event.doneLine : poster.alt}
        </p>

        {/* Wide screen: the artwork itself. */}
        {done ? null : (
          <div className="relative hidden overflow-hidden rounded-[28px] shadow-2xl sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster.desktop}
              alt={poster.alt}
              width={1200}
              height={809}
              className="block h-auto w-full select-none"
              draggable={false}
            />
            <button
              type="button"
              onClick={() => onClose("close_button")}
              aria-label="Close"
              className="absolute right-[1.6%] top-[2%] grid h-[7.5%] w-[5%] place-items-center rounded-full bg-black/45 text-[1.6vw] font-bold leading-none text-white/90 outline-none backdrop-blur-sm transition hover:bg-black/70 hover:text-white focus-visible:ring-2 focus-visible:ring-white lg:text-[20px]"
            >
              ✕
            </button>
            <button
              type="button"
              onClick={onCta}
              disabled={working}
              aria-label={poster.ctaLabel}
              className={`absolute rounded-[14px] outline-none transition focus-visible:ring-4 focus-visible:ring-white ${
                working
                  ? "bg-[#ecd48f] text-[1.7vw] font-black uppercase tracking-wide text-[#1c1307] lg:text-[15px]"
                  : "hover:bg-white/15 active:bg-black/10"
              }`}
              style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.width}%`, height: `${spot.height}%` }}
            >
              {working ? "Signing you up…" : null}
            </button>
          </div>
        )}

        {/* Phone, and the "you're signed up" card at every size. */}
        <div
          className={`flex max-h-[calc(100dvh-24px)] min-h-0 flex-col overflow-hidden rounded-[24px] bg-[#0c0b12] text-white shadow-2xl ${
            done ? "" : "sm:hidden"
          }`}
        >
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className={`relative ${done ? "h-[26dvh] min-h-[150px]" : "h-[34dvh] min-h-[180px]"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster.mobile}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0c0b12]" />
              <button
                type="button"
                onClick={() => onClose("close_button")}
                aria-label="Close"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-xl font-bold text-white outline-none backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white"
              >
                ✕
              </button>
            </div>
            {done ? (
              <div role="status" className="-mt-4 px-5 pb-5 text-center">
                <p className="relative text-[34px] leading-none" aria-hidden="true">
                  🎉
                </p>
                <p className="mt-2 text-[28px] font-black leading-[1.05] text-[#ecc86f]">{event.doneTitle}</p>
                <p className="mt-3 text-[15px] font-medium leading-snug text-white/85">{event.doneLine}</p>
              </div>
            ) : (
              <div className="-mt-6 px-5 pb-4">
                <p className="relative text-[30px] font-black leading-[1.05]" aria-hidden="true">
                  {poster.title[0]}
                  <br />
                  <span className="text-[#ecc86f]">{poster.title[1]}</span>
                </p>
                <p className="mt-3 text-[15px] font-medium leading-snug text-white/85">
                  <span className="font-black text-[#ecc86f]">{poster.lead[0]}</span> {poster.lead[1]}
                </p>
                <ul className="mt-4 space-y-3">
                  {poster.features.map((feature) => (
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
                  <p className="font-serif text-[16px] italic leading-snug">&ldquo;{poster.verse}&rdquo;</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ecc86f]">— {poster.verseRef}</p>
                </blockquote>
              </div>
            )}
          </div>
          <div className="shrink-0 border-t border-white/10 bg-[#0c0b12] px-4 pb-2 pt-3">
            <button type="button" onClick={done ? onDone : onCta} disabled={working} className={GOLD_BUTTON}>
              {done ? "See the study page" : working ? "Signing you up…" : poster.ctaLabel}
              {working ? null : <span aria-hidden="true">→</span>}
            </button>
            <button
              type="button"
              onClick={() => onClose("later")}
              className="mx-auto mt-1 block min-h-[44px] rounded-xl px-4 text-[15px] font-bold text-white/60 outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {done ? "Close" : "Maybe Later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── small pictures of the real thing ─────────────────────────

const chip = "rounded-full px-3 py-1 text-[12px] font-bold";

function Preview({ kind }: { kind: PopupPreview }) {
  switch (kind) {
    case "reader":
      return (
        <div>
          <p className="font-serif text-[15px] leading-relaxed text-[#14122b]">
            <sup className="mr-1 text-[10px] font-black text-[#8a8fa3]">1</sup>
            In the beginning God{" "}
            <span className="rounded bg-[#ede4ff] px-1 font-bold text-[#5b21b6] underline decoration-[#7c3aed] decoration-2 underline-offset-4">
              created
            </span>{" "}
            the heaven and the earth.
          </p>
          <div className="mt-2.5 rounded-xl border border-[#e4d8fb] bg-[#faf7ff] px-3 py-2">
            <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#6d28d9]">
              Study note
            </p>
            <p className="text-[13px] font-semibold leading-snug text-[#4b5068]">
              What this word means, right under the verse.
            </p>
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#f4f5fa] px-3 py-2">
            <span className="text-[13px] font-black text-[#14122b]">
              📖 Study Mode
            </span>
            <span className="flex h-6 w-11 items-center justify-end rounded-full bg-[#7c3aed] px-0.5">
              <span className="h-5 w-5 rounded-full bg-white shadow" />
            </span>
          </div>
        </div>
      );
    case "study_day":
      return (
        <div className="grid grid-cols-2 gap-2">
          {[
            ["📖", "Read", true],
            ["📝", "Learn", true],
            ["🧠", "Test", false],
            ["💬", "Discuss", false],
          ].map(([icon, label, done]) => (
            <div
              key={label as string}
              className="flex items-center gap-1.5 rounded-xl bg-[#f7f4ff] px-2.5 py-2.5"
            >
              <span className="text-[17px]">{icon}</span>
              <span className="min-w-0 flex-1 text-[13px] font-black text-[#14122b]">
                {label}
              </span>
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-black ${
                  done
                    ? "bg-[#10b981] text-white"
                    : "border-2 border-[#d6d0ea] text-transparent"
                }`}
              >
                ✓
              </span>
            </div>
          ))}
        </div>
      );
    case "memory":
      return (
        <div>
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[15px] font-bold text-[#14122b]">
            <span>The LORD is my</span>
            <span className="rounded-full bg-[#7c3aed] px-3 py-0.5 font-black text-white shadow-[0_2px_0_#5b21b6]">
              shepherd
            </span>
            <span>.</span>
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <span className={`${chip} bg-[#f1ecfb] text-[#8a8fa3]`}>
              protector
            </span>
            <span className={`${chip} bg-[#f1ecfb] text-[#8a8fa3]`}>
              teacher
            </span>
            <span className={`${chip} ml-auto bg-[#e8fbf3] text-[#0f5d45]`}>
              Practising
            </span>
          </div>
        </div>
      );
    case "word_search":
      return (
        <div className="flex items-center gap-3">
          <div className="grid shrink-0 gap-y-0.5">
            {["PSALM", "FAITH", "GRACE", "TRUST"].map((row, rowIndex) => (
              <div
                key={row}
                className={`grid grid-cols-5 rounded-md ${rowIndex === 2 ? "bg-[#5eead4]" : ""}`}
              >
                {row.split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`grid h-[22px] w-[22px] place-items-center text-[13px] leading-none text-[#14122b] ${rowIndex === 2 ? "font-black" : "font-bold"}`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="min-w-0 rounded-xl bg-[#eef7ff] px-3 py-2">
            <p className="text-[13px] font-black text-[#14122b]">GRACE</p>
            <p className="text-[12px] font-semibold leading-snug text-[#4b5068]">
              What it means, and the verse it is from.
            </p>
          </div>
        </div>
      );
    case "trivia":
      return (
        <div>
          <p className="text-[14px] font-black leading-snug text-[#14122b]">
            Who built the ark?
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <span className="rounded-xl border-2 border-[#10b981] bg-[#e8fbf3] px-3 py-2 text-[13px] font-black text-[#0f5d45]">
              Noah ✓
            </span>
            <span className="rounded-xl border-2 border-[#e5e7f0] px-3 py-2 text-[13px] font-bold text-[#8a8fa3]">
              Moses
            </span>
            <span className="rounded-xl border-2 border-[#e5e7f0] px-3 py-2 text-[13px] font-bold text-[#8a8fa3]">
              Abraham
            </span>
            <span className="rounded-xl border-2 border-[#e5e7f0] px-3 py-2 text-[13px] font-bold text-[#8a8fa3]">
              David
            </span>
          </div>
        </div>
      );
    case "feed":
      return (
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#cfe6fb] text-[14px]">
              🙂
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-black leading-tight text-[#14122b]">
                A Bible Buddy member
              </p>
              <p className="text-[11px] font-semibold text-[#8a8fa3]">
                Prayer request
              </p>
            </div>
          </div>
          <p className="mt-2 text-[13px] font-semibold leading-snug text-[#4b5068]">
            Please pray for my family this week.
          </p>
          <div className="mt-2.5 flex gap-2">
            <span className={`${chip} bg-[#eef7ff] text-[#1d4ed8]`}>
              ❤️ Like
            </span>
            <span className={`${chip} bg-[#f4f5fa] text-[#5b6079]`}>
              💬 Comment
            </span>
          </div>
        </div>
      );
    // A study sign-up shows the study's own artwork (EventSignupBody).
    case "event_signup":
      return null;
    case "app_store":
    case "android_beta":
      return (
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/icon-192.png"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-[16px] shadow-[0_6px_16px_rgba(0,86,253,0.28)]"
              />
              <div className="min-w-0">
                <p className="text-[19px] font-black leading-tight text-[#14122b]">
                  Bible Buddy
                </p>
                <p className="text-[13px] font-semibold leading-snug text-[#4b5068]">
                  {kind === "app_store"
                    ? "On the App Store"
                    : "On the Play Store"}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span
                className={`${chip} bg-[#0056fd] font-black text-white shadow-[0_2px_0_#0041c2]`}
              >
                Free
              </span>
              <span
                className={`${chip} bg-white font-bold text-[#0041c2] shadow-[0_2px_8px_rgba(0,60,160,0.14)]`}
              >
                {kind === "app_store"
                  ? "Your streak comes too"
                  : "Your streak comes too"}
              </span>
            </div>
          </div>
          <PhoneScene className="h-[132px] w-[99px] shrink-0" />
        </div>
      );
    case "verse_of_the_day":
      return (
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8a8fa3]">
            Verse of the day
          </p>
          <p className="mt-1 font-serif text-[15px] font-bold leading-snug text-[#14122b]">
            And let us not be weary in well doing.
          </p>
          <p className="mt-0.5 text-[12px] font-bold text-[#5b6079]">
            Galatians 6:9 · KJV
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <span className={`${chip} bg-[#ede4ff] text-[#5b21b6]`}>
              Read the breakdown →
            </span>
            <span className={`${chip} bg-[#f4f5fa] text-[#14122b]`}>
              🧠 Memorize
            </span>
          </div>
        </div>
      );
  }
}

/**
 * A phone with Bible Buddy on its home screen. Drawn here, like the sheep in
 * the games popup, so it scales with the card and costs no request beyond
 * the app icon. Decoration only.
 */
function PhoneScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 84 112" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bb-phone-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#edf3ff" />
          <stop offset="1" stopColor="#cfe0ff" />
        </linearGradient>
        <clipPath id="bb-phone-icon">
          <rect x="29" y="44" width="26" height="26" rx="7" />
        </clipPath>
      </defs>
      {/* sparkles */}
      <g fill="none" strokeLinecap="round" strokeWidth="2.4">
        <path d="M6 22l5 3M12 12l3 5M21 8l-1 6" stroke="#0056fd" />
        <path d="M78 84l-5-2M74 94l-4-4" stroke="#14b8a6" />
      </g>
      {/* phone */}
      <rect x="16" y="6" width="52" height="100" rx="12" fill="#14122b" />
      <rect
        x="19.5"
        y="9.5"
        width="45"
        height="93"
        rx="9"
        fill="url(#bb-phone-screen)"
      />
      <rect x="34" y="12" width="16" height="4" rx="2" fill="#14122b" />
      {/* other apps: shapes and colours only */}
      <g>
        <rect x="25" y="24" width="12" height="12" rx="3.5" fill="#a9c6ff" />
        <rect x="41" y="24" width="12" height="12" rx="3.5" fill="#bfdcf8" />
        <rect x="25" y="78" width="12" height="12" rx="3.5" fill="#bfdcf8" />
        <rect x="41" y="78" width="12" height="12" rx="3.5" fill="#a9c6ff" />
      </g>
      {/* Bible Buddy, front and centre */}
      <rect
        x="27"
        y="42"
        width="30"
        height="30"
        rx="9"
        fill="#ffffff"
        opacity="0.9"
      />
      <image
        href="/icons/icon-192.png"
        x="29"
        y="44"
        width="26"
        height="26"
        clipPath="url(#bb-phone-icon)"
      />
      <circle cx="56" cy="44" r="6" fill="#10b981" />
      <path
        d="M53.2 44l2 2 3.6-4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
