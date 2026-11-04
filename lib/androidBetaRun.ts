/**
 * Reading the Android beta's 14-day run out of a column of daily checks.
 *
 * Google's rule is about continuity - twelve testers opted in for fourteen
 * consecutive days - but Google shows no countdown, no start date and no
 * history, and exposes no API for the number (checked 2026-11-04). All that
 * exists is a figure on the Play Console dashboard, which vanishes once it
 * passes twelve. So the number gets written down by hand, and this works out
 * what the column of readings means.
 *
 * The important honesty here is the gap count. A run of readings 12, 12, 12
 * taken on Monday, Tuesday and Friday does NOT show five continuous days at
 * twelve - it shows three days we looked and two we did not. Google is
 * watching every day whether we are or not, so a day without a reading is
 * reported as unknown rather than quietly counted as good.
 */

import { TESTERS_NEEDED, TESTER_DAYS } from "@/lib/androidBeta";

export type BetaCheck = {
  checked_on: string;
  opted_in: number;
  group_members: number | null;
  note: string | null;
};

export type BetaRun = {
  /** Most recent reading, or null if nobody has recorded one yet. */
  latest: BetaCheck | null;
  /** Readings, newest first, for the running list. */
  readings: BetaCheck[];
  /** First day of the current unbroken stretch at or above the bar. */
  runStartedOn: string | null;
  /** Whole days from that day until the latest reading. */
  daysHeld: number;
  /** How many more are needed. Zero means the fortnight is served. */
  daysLeft: number;
  /** The date the run can be expected to complete, if it holds. */
  completesOn: string | null;
  /** A reading below the bar since the run began - the thing that breaks it. */
  dipped: boolean;
  /** Days inside the run with no reading at all. Unknown, not good. */
  unchecked: number;
  /** Nobody has looked today yet. */
  staleToday: boolean;
};

const DAY = 86_400_000;
const dayOf = (iso: string) => Math.floor(new Date(`${iso}T00:00:00Z`).getTime() / DAY);
const isoOf = (day: number) => new Date(day * DAY).toISOString().slice(0, 10);

/** Berlin's calendar date - Louis's clock is the one that matters here. */
export function betaToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function readBetaRun(rows: BetaCheck[], today = betaToday()): BetaRun {
  const sorted = [...rows].sort((a, b) => a.checked_on.localeCompare(b.checked_on));
  const latest = sorted.length ? sorted[sorted.length - 1] : null;

  if (!latest || latest.opted_in < TESTERS_NEEDED) {
    // Not at the bar today, so no run is in progress. Saying "0 of 14" here
    // would be worse than saying nothing: it implies a clock that is ticking.
    return {
      latest,
      readings: [...sorted].reverse(),
      runStartedOn: null,
      daysHeld: 0,
      daysLeft: TESTER_DAYS,
      completesOn: null,
      dipped: false,
      unchecked: 0,
      staleToday: latest?.checked_on !== today,
    };
  }

  // Walk back from the newest reading until one falls under the bar. That
  // reading is the break; the run starts the day after it.
  let startIndex = sorted.length - 1;
  while (startIndex > 0 && sorted[startIndex - 1].opted_in >= TESTERS_NEEDED) startIndex -= 1;
  const runStartedOn = sorted[startIndex].checked_on;
  const dipped = startIndex > 0;

  const firstDay = dayOf(runStartedOn);
  const lastDay = dayOf(latest.checked_on);
  const daysHeld = lastDay - firstDay;

  // Days inside the run nobody recorded. The span minus the readings taken.
  const seen = new Set(sorted.slice(startIndex).map((r) => r.checked_on));
  let unchecked = 0;
  for (let d = firstDay; d <= lastDay; d += 1) if (!seen.has(isoOf(d))) unchecked += 1;

  const daysLeft = Math.max(0, TESTER_DAYS - daysHeld);
  return {
    latest,
    readings: [...sorted].reverse(),
    runStartedOn,
    daysHeld,
    daysLeft,
    completesOn: isoOf(firstDay + TESTER_DAYS),
    dipped,
    unchecked,
    staleToday: latest.checked_on !== today,
  };
}
