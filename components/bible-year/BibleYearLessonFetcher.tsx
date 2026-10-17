"use client";

import { useEffect } from "react";
import type { BibleYearDailyLesson } from "@/lib/bibleYearDailyLessons";

/**
 * Fetches the lesson for a Bible in One Year day the bundle does not carry
 * (Louis, 2026-10-17: "someone told me day 106 don't work").
 *
 * BIBLE_YEAR_DAY_CONTENT stops at day 105, so days 106 to 365 fell through to
 * a placeholder page even though the writing and the recordings both exist.
 * The writing is the narration scripts - about 2.5MB across 364 modules - so
 * it comes from /api/bible-year/day/[day]/lesson one day at a time rather than
 * being shipped to every reader of every page.
 *
 * It renders nothing. It exists so the fetch can hang off a component's
 * lifecycle instead of guessing which piece of state means "this day is on
 * screen" inside a nineteen-thousand-line component.
 */
export default function BibleYearLessonFetcher({
  dayNumber,
  onLesson,
}: {
  dayNumber: number;
  onLesson: (dayNumber: number, lesson: BibleYearDailyLesson) => void;
}) {
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const response = await fetch(`/api/bible-year/day/${dayNumber}/lesson`);
        if (!response.ok) return;
        const payload = await response.json();
        if (cancelled || !payload?.lesson) return;
        onLesson(dayNumber, payload.lesson as BibleYearDailyLesson);
      } catch {
        // The placeholder page is already on screen; leaving it there is the
        // right outcome for a day whose script really is missing.
      }
    })();
    return () => {
      cancelled = true;
    };
    // onLesson is a setter wrapper and is not worth re-running for.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayNumber]);

  return null;
}
