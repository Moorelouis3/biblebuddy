import { WEEKLY_POLL_BANK, getNextWeeklyPollIndex } from "./weeklyPollBank";

export type WeeklyGroupPollOption = {
  key: string;
  text: string;
};

export type WeeklyGroupPollTheme = {
  key: string;
  subjectTitle: string;
  question: string;
  intro: string | null;
  options: WeeklyGroupPollOption[];
};

export type WeeklyGroupPollRecord = {
  id: string;
  group_id: string;
  post_id: string;
  week_key: string;
  poll_key: string;
  subject_title: string;
  question: string;
  intro: string | null;
  options: WeeklyGroupPollOption[];
  created_at: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function getPollWeekStart(date = new Date()): Date {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utc.getUTCDay();
  const daysSinceWednesday = (day + 4) % 7;
  utc.setUTCDate(utc.getUTCDate() - daysSinceWednesday);
  return utc;
}

export function getPollWeekKey(date = new Date()): string {
  const weekStart = getPollWeekStart(date);
  return `${weekStart.getUTCFullYear()}-${pad(weekStart.getUTCMonth() + 1)}-${pad(weekStart.getUTCDate())}`;
}

function getPollWeekSeed(date: Date) {
  return Math.floor(getPollWeekStart(date).getTime() / (7 * 24 * 60 * 60 * 1000));
}

// The 52-poll rotation is anchored so the week of 2026-09-02 = Poll #1
// (the old cycle's reading-frequency poll, which is the same question).
// That makes date-only previews line up with the history-based publisher:
// 2026-09-09 is Poll #2 and so on through all 52 before any repeat.
const POLL_ROTATION_ANCHOR_SEED = Math.floor(Date.UTC(2026, 8, 2) / (7 * 24 * 60 * 60 * 1000));

/**
 * Opinion Wednesday - a 52-week rotation over the approved poll bank.
 *
 * Pass `recentPollKeysNewestFirst` (past poll_key values from
 * weekly_group_polls) to get the authoritative pick: the poll after the
 * most recently published one, so no poll repeats until all 52 have been
 * used and a redeploy never resets the rotation. Without history
 * (scheduler previews, analytics) the pick falls back to anchored date
 * math, which matches the history-based pick as long as no Wednesday is
 * skipped.
 */
export function getWeeklyGroupPollTheme(
  date = new Date(),
  recentPollKeysNewestFirst?: string[],
): WeeklyGroupPollTheme {
  const total = WEEKLY_POLL_BANK.length;
  const index = recentPollKeysNewestFirst
    ? getNextWeeklyPollIndex(recentPollKeysNewestFirst)
    : (((getPollWeekSeed(date) - POLL_ROTATION_ANCHOR_SEED) % total) + total) % total;
  return WEEKLY_POLL_BANK[index];
}

export function buildWeeklyGroupPoll(date = new Date(), recentPollKeysNewestFirst?: string[]) {
  const theme = getWeeklyGroupPollTheme(date, recentPollKeysNewestFirst);
  return {
    weekKey: getPollWeekKey(date),
    pollKey: theme.key,
    subjectTitle: theme.subjectTitle,
    question: theme.question,
    intro: theme.intro,
    options: theme.options,
  };
}

export function parseWeeklyPollOptions(value: unknown): WeeklyGroupPollOption[] {
  if (!Array.isArray(value)) return [];
  return value.filter((option) => {
    if (!option || typeof option !== "object") return false;
    const maybe = option as WeeklyGroupPollOption;
    return typeof maybe.key === "string" && typeof maybe.text === "string";
  }) as WeeklyGroupPollOption[];
}
