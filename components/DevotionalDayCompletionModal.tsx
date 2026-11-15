"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { ModalShell } from "./ModalShell";
import { supabase } from "../lib/supabaseClient";
import { trackWisdomBookEvent } from "../lib/wisdomOfProverbsProducts";

/**
 * "You finished Day N" - the one day-complete popup for every study
 * (Louis, 2026-11-15, from his lavender mockup).
 *
 * ONE TEMPLATE. There is no version of this per study and there must never
 * be one. Hand it the study's id and it reads that study's row - title,
 * cover, total days, Amazon address - from the same `devotionals` table the
 * Library reads. A study added tomorrow gets this popup, with its own cover
 * and its own book, without anybody touching this file. Bible in One Year has
 * no row in that table, so it passes its cover and address in through `book`.
 *
 * WHAT IT SHOWS, top to bottom:
 *   - the celebration: open Bible, DAY COMPLETE, "You finished Day N!", the
 *     study's name;
 *   - the study's printed book, with its real cover and a button to Amazon -
 *     ONLY when that study has an Amazon address. Never a "coming soon",
 *     never a dead button;
 *   - for a study whose book is not on Amazon yet, the same cover with how
 *     far the reader has got ("Day 3 of 30") and nothing to tap (Louis,
 *     2026-11-15, for The Obedience of Abraham while Amazon reviewed it:
 *     "Show cover now"). The moment the study has an address this turns into
 *     the book card by itself;
 *   - what next: Start Day N+1, or - only if the screen says that day
 *     cannot be opened yet - a line saying so, or a whole-study celebration
 *     on the last day.
 *
 * The book is an offer and nothing more. Nothing here is locked behind it,
 * the way out is always one tap, and the main button is always the study.
 *
 * It replaced a peach card with Lil Louis on top (2026-10-26). The props that
 * card took still work, so the three screens that open it did not have to
 * change how they decide when to show it or where its buttons go.
 *
 * TWO JOBS, ONE COMPONENT - still. The study page also renders this as a
 * plain notice by passing customTitle. That path is dormant (study is free)
 * but while it exists it must not wear a celebration, so it keeps a plain
 * white card: no confetti, no book, no tracking.
 *
 * TRACKING (landing_page_events, never master_actions - looking at a popup
 * is not study activity): day_complete_popup_shown, day_complete_book_shown,
 * study_guide_amazon_clicked (placement "day_complete"),
 * day_complete_next_clicked, day_complete_bookshelf_clicked,
 * day_complete_closed. The admin Popups tab adds them up as ONE row,
 * "Completed day popup", for every study together (lib/adminDashboard.ts). Each carries the
 * study id and the day. A tap on Amazon is a tap, not a sale.
 */

type Book = { coverImage?: string | null; url?: string | null };

interface DevotionalDayCompletionModalProps {
  dayNumber: number | null;
  devotionalTitle: string | null;
  onClose: () => void;
  /**
   * The study's id in `devotionals`. With it the popup finds the cover, the
   * book and the length by itself. Leave it out only for a study that has no
   * row there, and pass `book` instead.
   */
  devotionalId?: string | null;
  /** For a study with no `devotionals` row (Bible in One Year). */
  book?: Book;
  /** Saves the lookup when the screen already knows it. */
  totalDays?: number | null;
  /** Say so outright when the screen knows this was the last day. */
  studyComplete?: boolean;
  customTitle?: string;
  customBody?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimary?: () => void;
  /** The main button is busy (saving). */
  primaryDisabled?: boolean;
  /**
   * Where the second button goes. Without it the button only dismisses, and
   * then it must SAY dismiss - a "Back to bookshelf" that leaves you on the
   * same page is the kind of label this pass exists to remove.
   */
  onSecondary?: () => void;
  /**
   * Set ONLY when the screen's own rule says the next day cannot be opened
   * yet, with the words to show ("Day 9 is not open yet."). The popup does
   * not work this out for itself, on purpose: the first version read the
   * group-study calendar and told people "Day 9 opens tomorrow" - but the
   * app has never stopped anybody reading ahead, so it would have turned
   * away readers the study itself lets through. Whoever opens the day is the
   * only one who knows whether it will open.
   */
  nextDayAvailability?: string | null;
  /** Bible in One Year keeps its "tap outside does nothing" behaviour. */
  closeOnBackdrop?: boolean;
}

type StudyRow = { title: string | null; cover_image: string | null; paperback_url: string | null; total_days: number | null };

/** Respect the OS setting rather than firing 1,000ms of particles at someone who asked for stillness. */
function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Only an address we would be willing to send somebody to. */
function validBookUrl(url: string | null | undefined): string | null {
  const value = (url || "").trim();
  return /^https:\/\/(www\.)?amazon\.[a-z.]+\//i.test(value) ? value : null;
}

export default function DevotionalDayCompletionModal({
  dayNumber,
  devotionalTitle,
  onClose,
  devotionalId,
  book,
  totalDays,
  studyComplete,
  customTitle,
  customBody,
  primaryButtonText,
  secondaryButtonText,
  onPrimary,
  primaryDisabled,
  onSecondary,
  nextDayAvailability,
  closeOnBackdrop,
}: DevotionalDayCompletionModalProps) {
  const [showModal, setShowModal] = useState(true);
  const [study, setStudy] = useState<StudyRow | null>(null);
  const isCelebration = !customTitle;

  // The study's own row: cover, book, length. One small read, and if it
  // fails the popup simply has no book card - the celebration never waits.
  useEffect(() => {
    if (!isCelebration || !devotionalId) return;
    let cancelled = false;
    void supabase
      .from("devotionals")
      .select("title, cover_image, paperback_url, total_days")
      .eq("id", devotionalId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled && data) setStudy(data as StudyRow);
      });
    return () => {
      cancelled = true;
    };
  }, [devotionalId, isCelebration]);

  const title = devotionalTitle || study?.title || null;
  const cover = book?.coverImage ?? study?.cover_image ?? null;
  const bookUrl = validBookUrl(book?.url ?? study?.paperback_url);
  const length = totalDays ?? study?.total_days ?? null;
  const day = dayNumber ?? 0;
  const finishedStudy = studyComplete ?? (length ? day >= length : false);
  const wait = isCelebration && !finishedStudy ? nextDayAvailability || null : null;
  const showBook = isCelebration && Boolean(bookUrl);
  const trackingId = devotionalId || (title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "unknown");
  const facts = useMemo(
    () => ({ devotional_id: trackingId, guide: title || "", day, study_complete: finishedStudy }),
    [trackingId, title, day, finishedStudy],
  );

  // Seen once per opening.
  const shownRef = useRef(false);
  useEffect(() => {
    if (!isCelebration || shownRef.current) return;
    shownRef.current = true;
    void trackWisdomBookEvent("day_complete_popup_shown", { ...facts, next_locked: Boolean(wait) });
  }, [isCelebration, facts, wait]);

  // The book card, counted when it is actually on the card.
  const bookShownRef = useRef(false);
  useEffect(() => {
    if (!showBook || bookShownRef.current) return;
    bookShownRef.current = true;
    void trackWisdomBookEvent("day_complete_book_shown", facts);
  }, [showBook, facts]);

  useEffect(() => {
    if (!isCelebration || prefersReducedMotion()) return;

    const duration = 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    const styleConfettiCanvas = (canvas: HTMLCanvasElement) => {
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "99999";
      canvas.style.pointerEvents = "none";
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "CANVAS") styleConfettiCanvas(node as HTMLCanvasElement);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll("canvas").forEach(styleConfettiCanvas);

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        observer.disconnect();
        setTimeout(() => {
          document.querySelectorAll("canvas").forEach((canvas) => {
            const htmlCanvas = canvas as HTMLCanvasElement;
            if (htmlCanvas.style.zIndex === "99999") {
              htmlCanvas.style.opacity = "0";
              htmlCanvas.style.transition = "opacity 0.5s";
              setTimeout(() => htmlCanvas.remove(), 500);
            }
          });
        }, 500);
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Cleanup matters now that this can unmount while the loop is mid-flight.
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [isCelebration]);

  const dismiss = () => {
    setShowModal(false);
    onClose();
  };

  /** The ✕, Escape or a tap outside: they left without choosing anything. */
  const handleClose = () => {
    if (isCelebration) void trackWisdomBookEvent("day_complete_closed", facts);
    dismiss();
  };

  const handleSecondary = () => {
    if (isCelebration) void trackWisdomBookEvent("day_complete_bookshelf_clicked", facts);
    if (onSecondary) {
      setShowModal(false);
      onSecondary();
      return;
    }
    dismiss();
  };

  const handlePrimary = () => {
    if (isCelebration) void trackWisdomBookEvent("day_complete_next_clicked", { ...facts, label: primaryButtonText || "Close" });
    (onPrimary ?? dismiss)();
  };

  // ───────── the plain notice (customTitle): unchanged in spirit, no celebration ─────────
  if (!isCelebration) {
    return (
      <ModalShell isOpen={showModal} onClose={handleClose} backdropColor="bg-black/70" scrollable>
        <div className="relative my-10 w-full max-w-sm">
          <div className="relative overflow-hidden rounded-[32px] border border-[#e5e7eb] bg-white shadow-2xl shadow-black/30">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/70 text-sm font-black text-gray-500 transition hover:bg-white hover:text-gray-800"
            >
              ✕
            </button>
            <div className="px-6 pb-7 pt-12 text-center sm:px-8">
              <h1 className="text-[27px] font-black leading-tight text-[#10213a] sm:text-3xl">{customTitle}</h1>
              {customBody ? <p className="mt-3 text-[15px] leading-relaxed text-[#44566f]">{customBody}</p> : null}
              <div className="mt-6 grid gap-2">
                <button
                  type="button"
                  onClick={handlePrimary}
                  className="min-h-[48px] w-full rounded-2xl bg-[#2f6fd0] px-5 py-3.5 text-[15px] font-black text-white shadow-lg shadow-[#2f6fd0]/25 transition hover:bg-[#2559ab] active:scale-[0.99]"
                >
                  {primaryButtonText ?? "Close"}
                </button>
                <button
                  type="button"
                  onClick={handleSecondary}
                  className="min-h-[44px] w-full rounded-2xl px-5 py-2.5 text-[13px] font-bold text-[#5b6c84] transition hover:text-[#10213a]"
                >
                  {secondaryButtonText ?? (onSecondary ? "Back to bookshelf" : "Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ModalShell>
    );
  }

  // ───────── the celebration ─────────
  const headline = finishedStudy ? "You finished the whole study!" : `You finished Day ${day}!`;
  const lead = finishedStudy
    ? "Every day, start to finish. That is something to be proud of. You completed"
    : "Another step in God's Word! You're making real progress in";

  return (
    <ModalShell isOpen={showModal} onClose={handleClose} backdropColor="bg-black/70" scrollable closeOnBackdrop={closeOnBackdrop}>
      {/* mt-12 leaves room for the open Bible, which breaks the top edge. */}
      <div className="relative mb-8 mt-12 w-full max-w-[440px]">
        <div
          className="relative overflow-hidden rounded-[32px] border border-[#e3d6fb] shadow-[0_30px_80px_rgba(31,20,70,0.35)]"
          style={{ background: "linear-gradient(180deg, #ece2ff 0%, #f6f0ff 42%, #ffffff 100%)" }}
        >
          <Scenery />

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 z-20 grid h-11 w-11 place-items-center rounded-full bg-white text-[#111827] shadow-[0_4px_14px_rgba(60,40,120,0.22)] outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M3.5 3.5l11 11M14.5 3.5l-11 11" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </button>

          <div className="relative z-10 px-4 pb-5 pt-14 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e2d4fb] px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.12em] text-[#5b21b6]">
              <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="#16a34a" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {finishedStudy ? "Study complete" : "Day complete"}
            </span>

            {/* "You finished Day 3!" stays on one line at 320px; at the first
                size tried it broke after "Day" and left "3!" on its own. The
                whole-study headline is longer and is allowed two lines. */}
            <h1
              className={`mt-3 flex items-center justify-center gap-2 font-black leading-[1.12] tracking-tight text-[#14122b] sm:text-[32px] ${
                finishedStudy ? "text-[25px]" : "text-[25px] min-[380px]:text-[27px]"
              }`}
            >
              <Rays className="hidden h-6 w-5 shrink-0 min-[430px]:block" />
              <span className={finishedStudy ? "" : "whitespace-nowrap"}>{headline}</span>
              <Rays className="hidden h-6 w-5 shrink-0 -scale-x-100 min-[430px]:block" />
            </h1>

            <p className="mx-auto mt-2.5 max-w-[320px] text-[15px] font-semibold leading-snug text-[#4b5068]">{lead}</p>
            {title ? (
              <p className="mx-auto mt-2.5 inline-block max-w-full rounded-full bg-[#e9e2fb] px-5 py-1.5 text-[14px] font-black uppercase tracking-[0.06em] text-[#3b1d8f]">
                {title}
              </p>
            ) : null}

            {showBook && bookUrl ? (
              <section
                aria-label="Get the book"
                className="relative mt-5 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3.5 gap-y-3 rounded-[26px] border border-[#eadffb] bg-white/80 p-3.5 text-left shadow-[0_8px_22px_rgba(91,60,180,0.14)] sm:gap-x-4 sm:gap-y-2.5 sm:p-4"
              >
                <div className="sm:row-span-2">
                  <BookCover src={cover} title={title} />
                </div>
                <div className="min-w-0 sm:self-end">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#ede4ff] sm:h-10 sm:w-10" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 4h2.4l2.2 10.4a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.2L20.5 8H6.6" />
                        <circle cx="10" cy="19.5" r="1.4" fill="#6d28d9" />
                        <circle cx="17" cy="19.5" r="1.4" fill="#6d28d9" />
                      </svg>
                    </span>
                    <h2 className="whitespace-nowrap text-[18px] font-black leading-tight text-[#14122b] sm:text-[20px]">Get the book</h2>
                  </div>
                  <p className="mt-1.5 text-[13.5px] font-semibold leading-snug text-[#4b5068]">
                    Enjoy this devotional away from your screen with your own physical copy.
                  </p>
                </div>
                <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:self-start">
                  {/* A real link: the tap has to be the person's own for the
                      phone to hand it to Amazon. Colour is inline because an
                      unlayered `a { color: inherit }` beats text-white. */}
                  <a
                    href={bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => void trackWisdomBookEvent("study_guide_amazon_clicked", { ...facts, placement: "day_complete" })}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full px-4 text-[15px] font-black shadow-[0_6px_14px_rgba(109,40,217,0.35)] outline-none transition active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-[#c4b5fd]"
                    style={{ background: "linear-gradient(180deg, #8b45f0 0%, #6d28d9 100%)", color: "#ffffff" }}
                  >
                    <AmazonMark className="h-6 w-6 shrink-0" />
                    <span className="h-5 w-px bg-white/35" aria-hidden="true" />
                    <span className="whitespace-nowrap">Buy on Amazon</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </section>
            ) : isCelebration && cover ? (
              /* No book to buy yet: the cover and the reader's own progress.
                 Nothing here is a button, and nothing promises a date. */
              <section
                aria-label="Your progress in this study"
                className="relative mt-5 flex items-center gap-4 rounded-[26px] border border-[#eadffb] bg-white/80 p-3.5 text-left shadow-[0_8px_22px_rgba(91,60,180,0.14)] sm:p-4"
              >
                <BookCover src={cover} title={title} />
                <div className="min-w-0 flex-1">
                  <h2 className="text-[18px] font-black leading-tight text-[#14122b] sm:text-[20px]">
                    {finishedStudy ? "Every day finished" : length ? `Day ${day} of ${length}` : `Day ${day} done`}
                  </h2>
                  <p className="mt-1.5 text-[13.5px] font-semibold leading-snug text-[#4b5068]">
                    {finishedStudy ? "You walked the whole study." : "One day at a time. You're building something."}
                  </p>
                  {length ? (
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#ede4ff]" aria-hidden="true">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, Math.max(4, Math.round((Math.min(day, length) / length) * 100)))}%`,
                          background: "linear-gradient(90deg, #8b45f0 0%, #6d28d9 100%)",
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}

            {wait ? (
              <p className="mx-auto mt-5 rounded-2xl bg-[#eef4ff] px-4 py-3 text-[15px] font-black text-[#1d3fae]">
                {wait} <span className="font-semibold text-[#4b5068]">It will be here when it opens.</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handlePrimary}
                disabled={primaryDisabled}
                className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-5 text-[17px] font-black text-white shadow-[0_8px_18px_rgba(0,86,253,0.35)] outline-none transition active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-[#93c5fd] disabled:opacity-70"
                style={{ background: "linear-gradient(180deg, #2f74ff 0%, #0056fd 100%)" }}
              >
                {primaryButtonText ?? "Close"}
                {finishedStudy ? null : <span aria-hidden="true">→</span>}
              </button>
            )}

            <button
              type="button"
              onClick={handleSecondary}
              className={
                wait
                  ? "mt-4 flex min-h-[52px] w-full items-center justify-center rounded-full px-5 text-[17px] font-black text-white shadow-[0_8px_18px_rgba(0,86,253,0.35)] outline-none transition active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-[#93c5fd]"
                  : "mx-auto mt-1 block min-h-[44px] rounded-xl px-6 text-[15px] font-bold text-[#6b7086] outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
              }
              style={wait ? { background: "linear-gradient(180deg, #2f74ff 0%, #0056fd 100%)" } : undefined}
            >
              {secondaryButtonText ?? (onSecondary ? "Back to bookshelf" : "Close")}
            </button>
          </div>
        </div>

        {/* The open Bible breaks the top edge. Outside the clipped card, so
            the overflow-hidden that keeps the hills inside the rounded
            corners does not cut its rays off. */}
        <div className="pointer-events-none absolute inset-x-0 -top-9 flex justify-center">
          <OpenBible className="h-[84px] w-[110px]" />
        </div>
      </div>
    </ModalShell>
  );
}

// ───────────────────────── artwork, drawn here so nothing is downloaded ─────────────────────────

/** The study's real cover, standing like a book. Falls back to a plain spine if it will not load. */
function BookCover({ src, title }: { src: string | null; title: string | null }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative shrink-0 self-center" aria-hidden="true">
      <span className="absolute -left-2 -top-2 text-[#f5b301]">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M3 13l4-2M6 5l3 4M13 3l-1 5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
      {/* page edge */}
      <span className="absolute bottom-1 right-[-5px] top-1 w-[6px] rounded-r-[3px] bg-[#f4efe6] shadow-[inset_-1px_0_0_#d8cfbf]" />
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className="relative h-[132px] w-[90px] rounded-[5px] object-cover shadow-[0_10px_22px_rgba(20,18,43,0.35)] sm:h-[156px] sm:w-[106px]"
        />
      ) : (
        <div className="relative grid h-[132px] w-[90px] place-items-center rounded-[5px] bg-[#2b1d5c] p-2 text-center text-[11px] font-black leading-tight text-[#f3d98b] shadow-[0_10px_22px_rgba(20,18,43,0.35)] sm:h-[156px] sm:w-[106px]">
          {title || "Bible Buddy"}
        </div>
      )}
    </div>
  );
}

/** Three short rays either side of the headline. */
function Rays({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 24" className={className} aria-hidden="true">
      <path d="M17 5L7 8M18 12H5M17 19L7 16" fill="none" stroke="#7c3aed" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/** An open Bible with light coming off it. */
function OpenBible({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 84" className={className} aria-hidden="true">
      <circle cx="55" cy="52" r="34" fill="#f1e9ff" />
      <g fill="none" stroke="#f5b301" strokeWidth="3.4" strokeLinecap="round">
        <path d="M55 6v11M34 12l5 9M76 12l-5 9M18 26l8 6M92 26l-8 6" />
      </g>
      {/* cover */}
      <path d="M17 66 L55 74 L93 66 L93 60 L55 68 L17 60 Z" fill="#6d28d9" />
      {/* pages */}
      <path d="M21 34 C 33 28, 45 30, 55 38 L55 68 C 45 60, 33 58, 21 62 Z" fill="#fffaf0" stroke="#e7dcc6" strokeWidth="1.4" />
      <path d="M89 34 C 77 28, 65 30, 55 38 L55 68 C 65 60, 77 58, 89 62 Z" fill="#fff4dc" stroke="#e7dcc6" strokeWidth="1.4" />
      <g stroke="#d9cdb4" strokeWidth="1.4" strokeLinecap="round">
        <path d="M28 41c7-2 13-1 20 3M28 48c7-2 13-1 20 3M82 41c-7-2-13-1-20 3M82 48c-7-2-13-1-20 3" fill="none" />
      </g>
      <path d="M55 38v30" stroke="#8b5cf6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Amazon's "a" with the smile under it, white on the purple button. */
function AmazonMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <text x="12" y="15" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="17" fontWeight="700" fill="#ffffff">
        a
      </text>
      <path d="M3.5 17.5 C 9 21.5, 15 21.5, 19.5 18" fill="none" stroke="#ff9900" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.6 16.6 L20.6 17.4 L18.6 19.8" fill="none" stroke="#ff9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Soft clouds up top, lavender hills and two sprouts along the bottom. */
function Scenery() {
  return (
    <>
      <svg aria-hidden="true" viewBox="0 0 440 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-24 h-24 w-full opacity-70">
        <g fill="#ffffff">
          <ellipse cx="34" cy="64" rx="26" ry="10" />
          <ellipse cx="46" cy="56" rx="16" ry="11" />
          <ellipse cx="404" cy="44" rx="24" ry="9" />
          <ellipse cx="394" cy="37" rx="14" ry="10" />
        </g>
      </svg>
      <svg aria-hidden="true" viewBox="0 0 440 90" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full">
        <path d="M0 58 C 80 28, 140 76, 220 52 C 300 30, 360 70, 440 46 L440 90 L0 90 Z" fill="#ede3ff" opacity="0.9" />
        <path d="M0 74 C 100 52, 170 88, 250 70 C 320 54, 380 82, 440 66 L440 90 L0 90 Z" fill="#e0d2fb" opacity="0.85" />
      </svg>
      <Sprout className="pointer-events-none absolute bottom-3 left-4 h-7 w-7" />
      <Sprout className="pointer-events-none absolute bottom-3 right-4 h-7 w-7 -scale-x-100" />
    </>
  );
}

function Sprout({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <path d="M14 26 C 13 18, 8 14, 3 12 C 4 19, 8 24, 14 26 Z" fill="#7cc65a" />
      <path d="M14 26 C 15 17, 20 12, 25 10 C 24 18, 20 24, 14 26 Z" fill="#5fb53f" />
      <path d="M14 26 C 13 16, 13 9, 14 4 C 16 10, 16 18, 14 26 Z" fill="#8fd16a" />
    </svg>
  );
}
