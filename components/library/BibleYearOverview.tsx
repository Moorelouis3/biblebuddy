"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "../../lib/bibleInOneYearPlan";
import {
  BIBLE_YEAR_RANGES,
  BIBLE_YEAR_TOTAL_DAYS,
  EMPTY_POSITION,
  bibleYearDayHref,
  bibleYearPercent,
  bibleYearRangeIndexFor,
  fetchBibleYearPosition,
  type BibleYearPosition,
} from "../../lib/bibleYearProgress";
import {
  BIBLE_YEAR_TOTAL_CHAPTERS,
  bibleYearShelfStudy,
} from "../../lib/libraryCatalog";
import { Disclosure, ReadersCard, StudyProgressHeader } from "./studyGuideShared";
import LoadFailedNotice from "../LoadFailedNotice";

/**
 * Bible in One Year's study overview - the screen Wisdom of Proverbs has, for
 * the plan that used to have its own.
 *
 * Built 2026-11-03. Louis: "wisdom of proverbs is the Template!" So the parts
 * here are the Proverbs ones out of ./studyGuideShared: the same back link,
 * cover and title, the same progress bar, the same community card, the same
 * accordion. Only the progress map is new code, and only because 365 cannot be
 * done the way 31 is.
 *
 * WHAT THE PLAN KEPT
 *
 * Every day, title, reference, cover and completion flag comes from the same
 * places it always did - lib/bibleInOneYearPlan.ts and
 * bible_year_day_progress. Opening a day still goes through
 * bibleYearDayHref(), the address the day rail has always used, so the day
 * experience itself is untouched and /plan deep links still work.
 */

/**
 * The groups and the arithmetic live in lib/bibleYearProgress so they can be
 * verified without rendering - scripts/verify-bible-year-overview.ts.
 */
const RANGES = BIBLE_YEAR_RANGES;
const rangeIndexFor = bibleYearRangeIndexFor;

export default function BibleYearOverview() {
  const router = useRouter();
  const study = bibleYearShelfStudy();

  const [position, setPosition] = useState<BibleYearPosition>(EMPTY_POSITION);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  // Could not read this person's progress. Emphatically NOT the same as
  // "nothing read yet": showing Day 1 to somebody on day 280 is the bug this
  // state exists to prevent.
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Which range is open. Exactly one at a time, so at most 30 rows are ever
  // mounted - requirement for 365 days: no heavy render of every row.
  const [openRange, setOpenRange] = useState(0);
  const [jumpValue, setJumpValue] = useState("");
  const [jumpError, setJumpError] = useState<string | null>(null);
  const [highlightDay, setHighlightDay] = useState<number | null>(null);
  const rangeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id ?? null;
      const p = await fetchBibleYearPosition(userId);
      if (cancelled) return;
      setSignedIn(Boolean(userId));
      setPosition(p);
      // Open the range the reader is actually in, not Days 1-30.
      setOpenRange(rangeIndexFor(p.planDay ?? 1));
      setLoading(false);
    })().catch((error: unknown) => {
      // fetchBibleYearPosition throws on a failed read now. Before it did,
      // this landed on the empty position and the screen opened on Day 1 with
      // an empty progress bar - telling somebody 280 days in that they had
      // read nothing. Say we could not load it instead.
      if (cancelled) return;
      console.warn("[BIBLE YEAR] Could not load the plan:", error);
      setFailed(true);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  /** Try Again: back to the skeleton, then run the load once more. */
  function retryLoad() {
    setFailed(false);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }

  const completed = useMemo(() => new Set(position.completedDayNumbers), [position.completedDayNumbers]);
  const currentDay = position.planDay ?? 1;

  const percent = bibleYearPercent(position.completedDays);

  const jumpToDay = (raw: string) => {
    const day = Number(raw);
    if (!Number.isFinite(day) || day < 1 || day > BIBLE_YEAR_TOTAL_DAYS) {
      setJumpError(`Pick a day between 1 and ${BIBLE_YEAR_TOTAL_DAYS}.`);
      return;
    }
    setJumpError(null);
    const index = rangeIndexFor(day);
    setOpenRange(index);
    setHighlightDay(day);
    // The range has to be open before its row exists to scroll to.
    requestAnimationFrame(() => {
      document
        .getElementById(`bible-year-day-${day}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  if (failed) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <LoadFailedNotice message="Couldn't load your progress." onRetry={retryLoad} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl animate-pulse px-4 py-6">
        <div className="h-5 w-24 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
        <div className="mt-6 flex gap-6">
          <div className="h-56 w-40 rounded-2xl bg-[var(--bb-surface-soft,#f1f5fa)]" />
          <div className="flex-1 space-y-4 pt-4">
            <div className="h-8 w-2/3 rounded bg-[var(--bb-surface-soft,#f1f5fa)]" />
            <div className="h-3 w-full rounded-full bg-[var(--bb-surface-soft,#f1f5fa)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-5 md:py-8">
      <Link
        href={`/library/${study.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-black text-[var(--bb-text-secondary,#5f6368)] hover:text-[var(--bb-accent,#2f7fe8)]"
      >
        ← Bible in One Year
      </Link>

      <div className="mt-6">
        <StudyProgressHeader
          cover={study.cover_image}
          title={study.title}
          subtitle={`${study.subtitle} · ${BIBLE_YEAR_TOTAL_CHAPTERS.toLocaleString()} chapters`}
          percent={percent}
          percentLabel={`${percent}% complete`}
          countLabel={`${position.completedDays}/${BIBLE_YEAR_TOTAL_DAYS} days`}
        />
      </div>

      {/* The Continue shortcut. Above the map on purpose: a reader on day 212
          should not have to find day 212 to carry on. */}
      <button
        type="button"
        onClick={() => router.push(bibleYearDayHref(currentDay))}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-6 py-4 text-base font-black text-[var(--bb-button-text,#ffffff)] shadow-lg shadow-[#2f7fe8]/20 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] focus-visible:ring-offset-2"
      >
        <span aria-hidden>📖</span>
        {position.planFinished
          ? "Read it again from Day 1"
          : position.completedDays > 0
            ? `Continue — Day ${currentDay}`
            : "Start Day 1"}
      </button>

      <Disclosure
        icon="📝"
        title="Study Overview"
        subtitle="What this plan is, and how the year is laid out"
      >
        <p className="text-[15px] leading-relaxed text-[var(--bb-text-secondary,#2c3e55)]">
          {study.description}
        </p>
        <ul className="mt-5 space-y-2.5">
          {[
            `365 days, three or four chapters a day`,
            `All ${BIBLE_YEAR_TOTAL_CHAPTERS.toLocaleString()} chapters, Genesis 1 to Revelation 22`,
            "Study notes beside every day's reading",
            "Listen instead of reading on most days",
            "Nothing locks and nothing expires if you fall behind",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[15px] font-semibold text-[var(--bb-text-primary,#111827)]"
            >
              <span aria-hidden className="mt-0.5 text-base">✅</span>
              {item}
            </li>
          ))}
        </ul>
      </Disclosure>

      {/* ----------------------------------------------------- progress map -- */}
      <section className="mt-5 rounded-[26px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">
              Progress Map
            </p>
            <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#111827)]">Days</h2>
          </div>
          <p className="text-xs font-black text-[var(--bb-text-muted,#6b7280)]">
            {position.completedDays}/{BIBLE_YEAR_TOTAL_DAYS} done
          </p>
        </div>

        {/* Jump to Day. 365 days is too many to scroll and too many to page
            through thirteen times, so the number is also an address. */}
        {/* noValidate on purpose: with min/max the browser blocks the submit
            and shows its own tooltip, which on a phone can be a silent
            nothing-happened. This way the message below is always ours, and
            it is announced, because it carries role="alert". */}
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            jumpToDay(jumpValue);
          }}
          className="mb-5 flex flex-wrap items-end gap-2"
        >
          <label className="flex-1 min-w-[140px]">
            <span className="block text-xs font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">
              Jump to day
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={BIBLE_YEAR_TOTAL_DAYS}
              value={jumpValue}
              onChange={(e) => {
                setJumpValue(e.target.value);
                setJumpError(null);
              }}
              placeholder={`1 – ${BIBLE_YEAR_TOTAL_DAYS}`}
              aria-invalid={jumpError ? true : undefined}
              aria-describedby={jumpError ? "bible-year-jump-error" : undefined}
              className="mt-1 w-full rounded-2xl border-2 border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-base font-bold text-[var(--bb-text-primary,#111827)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-[var(--bb-surface-soft,#f1f5fa)] px-5 py-3 text-base font-black text-[var(--bb-text-primary,#111827)] transition hover:bg-[var(--bb-accent-soft,#eaf5ff)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] focus-visible:ring-offset-2"
          >
            Go
          </button>
        </form>
        {jumpError ? (
          <p id="bible-year-jump-error" role="alert" className="-mt-3 mb-4 text-sm font-bold text-[#b42318]">
            {jumpError}
          </p>
        ) : null}

        <div className="space-y-3">
          {RANGES.map((range, index) => {
            const isOpen = openRange === index;
            const doneInRange = position.completedDayNumbers.filter(
              (d) => d >= range.start && d <= range.end,
            ).length;
            const total = range.end - range.start + 1;
            const holdsCurrent = currentDay >= range.start && currentDay <= range.end;
            const allDone = doneInRange === total;

            return (
              <div
                key={range.label}
                ref={(el) => {
                  rangeRefs.current[index] = el;
                }}
                className={`overflow-hidden rounded-[24px] border transition ${
                  allDone
                    ? "border-emerald-300 bg-emerald-50"
                    : holdsCurrent
                      ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-card,#ffffff)]"
                      : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenRange(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={`bible-year-range-${index}`}
                  className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-[var(--bb-surface-soft,#f8fbff)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--bb-accent,#2f7fe8)]"
                >
                  <span className="flex-1 min-w-0">
                    <span className="block text-base font-black text-[var(--bb-text-primary,#111827)]">
                      {range.label}
                      {holdsCurrent ? (
                        <span className="ml-2 rounded-full bg-[var(--bb-accent,#2f7fe8)] px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
                          You are here
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                      {doneInRange} of {total} days done
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={`shrink-0 text-xl text-[var(--bb-accent,#2f7fe8)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    ⌄
                  </span>
                </button>

                {/* Only the open range's rows exist in the DOM. */}
                {isOpen ? (
                  <div
                    id={`bible-year-range-${index}`}
                    className="border-t border-[var(--bb-card-border,#eaf1fb)] p-3 sm:p-4"
                  >
                    <ol className="space-y-2">
                      {GENESIS_BIBLE_IN_ONE_YEAR_SERIES.filter(
                        (day) => day.dayNumber >= range.start && day.dayNumber <= range.end,
                      ).map((day) => {
                        const isDone = completed.has(day.dayNumber);
                        const isCurrent = day.dayNumber === currentDay && !isDone;
                        const isHighlit = highlightDay === day.dayNumber;

                        return (
                          <li key={day.dayNumber} id={`bible-year-day-${day.dayNumber}`}>
                            <Link
                              href={bibleYearDayHref(day.dayNumber)}
                              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bb-accent,#2f7fe8)] focus-visible:ring-offset-1 ${
                                isDone
                                  ? "border-emerald-300 bg-emerald-50 hover:bg-emerald-100"
                                  : isCurrent
                                    ? "border-[var(--bb-accent,#2f7fe8)] bg-[var(--bb-accent-soft,#eaf1fd)] hover:brightness-[0.98]"
                                    : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] hover:bg-[var(--bb-surface-soft,#f8fbff)]"
                              } ${isHighlit ? "ring-2 ring-[var(--bb-accent,#2f7fe8)] ring-offset-1" : ""}`}
                            >
                              <span
                                aria-hidden
                                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black ${
                                  isDone
                                    ? "bg-emerald-500 text-white"
                                    : isCurrent
                                      ? "bg-[var(--bb-accent,#2f7fe8)] text-white"
                                      : "bg-[var(--bb-surface-soft,#f1f5fa)] text-[var(--bb-text-muted,#6b7280)]"
                                }`}
                              >
                                {isDone ? "✓" : day.dayNumber}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[15px] font-black text-[var(--bb-text-primary,#111827)]">
                                  Day {day.dayNumber} · {day.title}
                                </span>
                                <span className="mt-0.5 block truncate text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">
                                  {day.reference}
                                </span>
                              </span>
                              <span
                                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${
                                  isDone
                                    ? "bg-emerald-500 text-white"
                                    : isCurrent
                                      ? "bg-[var(--bb-accent,#2f7fe8)] text-white"
                                      : "bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-text-muted,#637083)]"
                                }`}
                              >
                                {isDone ? "Done" : isCurrent ? "Next" : "To read"}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      {!signedIn ? (
        <p className="mt-5 rounded-2xl bg-[var(--bb-surface-soft,#f3f8ff)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-secondary,#2c3e55)]">
          Sign in and your place saves as you go, on every device.
        </p>
      ) : null}

      <ReadersCard readersPath="/api/bible-year/readers" title={study.title} />
    </div>
  );
}
