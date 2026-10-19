/**
 * The two weekly nudges that point people at the feed: the prayer request and
 * the poll. Each one is shown to a person once a week, and they are counted in
 * different weeks so they do not both land on the same day.
 *
 * Prayer runs Sunday to Sunday, because the prayer thread has always been a
 * Sunday thing. The poll runs Wednesday to Wednesday, which is the week the
 * poll bank already rotates on (lib/groupWeeklyPoll.ts), so the popup and the
 * poll it shows are always talking about the same week.
 */
export type WeeklyFeedPopupKind = "prayer" | "poll";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toKey(date: Date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

/** The Sunday on or before this date, in UTC. */
export function getPrayerWeekStart(date = new Date()): Date {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  utc.setUTCDate(utc.getUTCDate() - utc.getUTCDay());
  return utc;
}

export function getPrayerWeekKey(date = new Date()): string {
  return toKey(getPrayerWeekStart(date));
}

/** The id a week's popup is remembered under in user_popups_seen. */
export function weeklyPopupId(kind: WeeklyFeedPopupKind, weekKey: string) {
  return `weekly_${kind}_${weekKey}`;
}

/**
 * One popup a day, whichever it is (Louis, 2026-10-19: both of them arrived on
 * the same day). Showing either weekly nudge also writes this row, and neither
 * is offered again until the date changes - so the prayer ask and the poll
 * always land on different days.
 */
export function weeklyPopupDayId(date = new Date()) {
  return `weekly_any_${toKey(new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())))}`;
}
