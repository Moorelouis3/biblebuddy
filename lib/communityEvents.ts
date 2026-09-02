/**
 * Community devotional events - the reusable brain behind The Wisdom of
 * Proverbs rollout, written so the next community study is a config entry,
 * not a rebuild.
 *
 * All date logic runs in Europe/Berlin: the community day rolls over when
 * October 1st (etc.) begins in Berlin, everywhere in the world at once.
 */

export type CommunityEvent = {
  slug: string;
  title: string;
  subtitle: string;
  /** The devotional this event runs - devotionals.id in the database. */
  devotionalId: string;
  /** First community day, as YYYY-MM-DD in Europe/Berlin. */
  startDate: string;
  /** Length in days; day N maps to devotional_days.day_number N. */
  totalDays: number;
  bannerArt: string;
  /** Book/journal promo stays hidden until a real link is configured. */
  bookUrl: string | null;
};

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    slug: "wisdom-of-proverbs",
    title: "The Wisdom of Proverbs",
    subtitle: "A 31-Day Bible Buddy Community Devotional",
    devotionalId: "c0ca300a-c0e9-47b8-84c5-99aca743a203",
    startDate: "2026-10-01",
    totalDays: 31,
    bannerArt: "/events/proverbs-banner-art.png",
    bookUrl: null,
  },
];

export function getCommunityEvent(slug: string) {
  return COMMUNITY_EVENTS.find((event) => event.slug === slug) || null;
}

/** The event shown on the group page right now - newest first. */
export function getActiveCommunityEvent() {
  return COMMUNITY_EVENTS[0] || null;
}

/** Today's calendar date in Europe/Berlin, as {y, m, d}. */
function berlinToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const [y, m, d] = parts.split("-").map(Number);
  return { y, m, d };
}

/** Whole days between two Y/M/D dates, sign preserved. UTC keeps it DST-proof. */
function daysBetween(a: { y: number; m: number; d: number }, b: { y: number; m: number; d: number }) {
  return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86_400_000);
}

export type CommunityEventState =
  | { phase: "countdown"; daysToGo: number }
  | { phase: "live"; communityDay: number }
  | { phase: "evergreen" };

export function getCommunityEventState(event: CommunityEvent, now = new Date()): CommunityEventState {
  const [y, m, d] = event.startDate.split("-").map(Number);
  const start = { y, m, d };
  const today = berlinToday(now);
  const elapsed = daysBetween(start, today);

  if (elapsed < 0) return { phase: "countdown", daysToGo: -elapsed };
  if (elapsed < event.totalDays) return { phase: "live", communityDay: elapsed + 1 };
  return { phase: "evergreen" };
}

/**
 * Which days may be opened. During the live window only days up to the
 * community day unlock - never future ones - and everything already unlocked
 * stays open so people can catch up. Outside the window, all days are open
 * and readers go at their own pace.
 */
export function isCommunityEventDayUnlocked(event: CommunityEvent, dayNumber: number, now = new Date()) {
  if (dayNumber < 1 || dayNumber > event.totalDays) return false;
  const state = getCommunityEventState(event, now);
  if (state.phase === "countdown") return false;
  if (state.phase === "live") return dayNumber <= state.communityDay;
  return true;
}
