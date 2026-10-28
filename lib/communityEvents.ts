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
  /** Square-ish art for the recruiting banner and the daily popup, which crop it. */
  bannerArt: string;
  /**
   * A finished wide banner with the study's name already set in it, shown
   * full width at the top of the signup page.
   *
   * Separate from bannerArt rather than replacing it (Louis, 2026-10-25).
   * bannerArt is painted behind a gradient at `right top / auto 100%` with the
   * title typeset over it, so dropping artwork that carries its own title in
   * there would print the name twice and bury half the art. Where this is set
   * the signup header shows the image instead of the typeset title; the other
   * two surfaces keep cropping the square.
   */
  heroBanner?: string | null;
  /** Book/journal promo stays hidden until a real link is configured. */
  bookUrl: string | null;
  /** Internal printed-books page, promoted on the event page after signup. */
  printBooksPath: string | null;
  /** "October 1-31" - the eyebrow over the title and the footer line. */
  dateRangeLabel: string;
  /** Banner line while the study is still counting down. */
  countdownSub: string;
  /** Banner line on a live day. "{day}" becomes the community day number. */
  liveSub: string;
  /** Banner line once the dated window has passed. */
  evergreenSub: string;
  /** The paragraph under the header: what the study is and how it paces. */
  intro: string;
  /** The two paragraphs inside "How does the community study work?". */
  howItWorks: [string, string];
  /** Completes "N Bible Buddies have already signed up to ___ together." */
  joinedLine: string;
  /** Shown to members once the dated window has passed. */
  evergreenLine: string;
};

/**
 * Every event's page is built from this list, so adding the next community
 * study is a config entry. The copy fields exist because the page used to
 * carry Proverbs wording in the markup, which quietly made the second event
 * advertise the first one.
 */
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
    printBooksPath: "/books/wisdom-of-proverbs",
    dateRangeLabel: "October 1–31",
    countdownSub: "A 31-day devotional · Starting October 1",
    liveSub: "Today: Proverbs {day}",
    evergreenSub: "Grow in wisdom one chapter at a time.",
    intro:
      "Study all 31 chapters of Proverbs alongside Bible Buddies around the world. A new day becomes available every day throughout October. You do not have to join at a particular time. Complete each day whenever it fits your schedule, then meet the community in the daily discussion.",
    howItWorks: [
      "A new devotional unlocks each day. Read or listen, read the matching chapter of Proverbs, take the trivia, and answer the daily discussion question—whenever you have time.",
      "We study the same chapter each day and meet in the discussion afterward.",
    ],
    joinedLine: "study Proverbs together",
    evergreenLine: "All 31 days are open. Go at your own pace, one chapter at a time.",
  },
  {
    slug: "beginning-of-everything",
    title: "The Beginning of Everything",
    subtitle: "A 21-Day Bible Buddy Community Devotional",
    devotionalId: "486cff66-b50e-488d-9330-3951589e6fa8",
    startDate: "2026-11-08",
    totalDays: 21,
    bannerArt: "/events/beginning-of-everything-banner-art.webp",
    heroBanner: "/events/beginning-of-everything-hero.webp",
    bookUrl: null,
    printBooksPath: null,
    dateRangeLabel: "November 8–28",
    countdownSub: "A 21-day devotional · Starting November 8",
    liveSub: "Day {day} of Genesis 1-8",
    evergreenSub: "Start where the Bible starts, one day at a time.",
    intro:
      "Read the first eight chapters of the Bible with Bible Buddies around the world - the light on the first morning, the garden, the question the serpent asked, the first family and the first murder, the long line of names from Adam to Noah, the flood, and the morning one family stepped out onto dry ground. A new day opens every day from the 8th to the 28th of November. Join whenever you like and study each day when it suits you, then meet the community in the daily discussion.",
    howItWorks: [
      // Genesis 1 alone takes four days here, so this study paces by passage
      // rather than by chapter. The copy says passage for that reason.
      "A new devotional unlocks each day. Read or listen, read that day's passage in Genesis, take the trivia, and answer the daily discussion question—whenever you have time.",
      "We read the same passage each day and meet in the discussion afterward.",
    ],
    joinedLine: "read Genesis together",
    evergreenLine: "All 21 days are open. Go at your own pace, one day at a time.",
  },
];

export function getCommunityEvent(slug: string) {
  return COMMUNITY_EVENTS.find((event) => event.slug === slug) || null;
}

/**
 * The event the banner, the home card and the daily popup speak for. A study
 * that is running always wins; otherwise the one starting soonest, so the next
 * study takes over the moment the current one finishes. Never guesses from
 * array order - that broke the day Abraham was added below Proverbs.
 */
export function getActiveCommunityEvent(now = new Date()) {
  const withState = COMMUNITY_EVENTS.map((event) => ({ event, state: getCommunityEventState(event, now) }));
  const live = withState.find((entry) => entry.state.phase === "live");
  if (live) return live.event;

  const upcoming = withState
    .filter((entry) => entry.state.phase === "countdown")
    .sort((a, b) => a.event.startDate.localeCompare(b.event.startDate));
  if (upcoming.length) return upcoming[0].event;

  // All finished: the most recent one is the one people are still reading.
  const finished = [...COMMUNITY_EVENTS].sort((a, b) => b.startDate.localeCompare(a.startDate));
  return finished[0] || null;
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
