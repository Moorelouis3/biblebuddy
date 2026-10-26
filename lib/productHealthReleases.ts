/**
 * The Product Health change log.
 *
 * What this is for: when a number moves, the first question is always "what
 * did we change?" This is the list that answers it, and the dashboard reads
 * it rather than anybody trying to remember.
 *
 * TWO KINDS OF ENTRY, NEVER MIXED.
 *  - verified: true means the date is anchored to a commit in this
 *    repository, named below, or to something read directly off the service
 *    that owns it. The hash is there so it can be checked.
 *  - verified: false is Louis's recollection, labelled owner-reported on the
 *    dashboard. An owner-reported date is never promoted to verified because
 *    it looked about right.
 *
 * Only entries that could actually be checked are here. The list is short on
 * purpose: inventing a plausible history would make every comparison built on
 * it worthless.
 *
 * Note on dates: a [deploy] commit builds immediately, so its commit date is
 * its release date. An untagged commit goes live at the next scheduled build
 * (10:00 or 18:00 Berlin), so where that matters the note says so.
 */

export type ProductRelease = {
  what: string;
  /** YYYY-MM-DD, Berlin. */
  date: string;
  verified: boolean;
  /** Commit hash or the service the date was read from. */
  evidence: string;
  audience: string;
  expected: string;
  /** Which number on this dashboard should move if it worked. */
  metric: string;
  /** When it is fair to look. */
  reviewOn: string;
};

export const PRODUCT_RELEASES: ProductRelease[] = [
  {
    what: "New landing page shipped",
    date: "2026-10-25",
    verified: true,
    evidence: "a46ca81e Ship the new landing page [deploy]",
    audience: "Everyone arriving on the web",
    expected: "More visitors register",
    metric: "Acquisition · Visit → signup",
    reviewOn: "2026-11-08",
  },
  {
    what: "Signing up became the onboarding; the questionnaire was removed",
    date: "2026-10-18",
    verified: true,
    evidence: "99869dd8 Signing up is the onboarding now [deploy]",
    audience: "New accounts",
    expected: "Fewer people abandon between signup and first study",
    metric: "Overview · First-study activation",
    reviewOn: "2026-11-01",
  },
  {
    what: "Guest accounts turned off",
    date: "2026-10-07",
    verified: true,
    evidence: "0cd45af0 Turn off guest accounts - signing up is the way in now [deploy]",
    audience: "Everyone new",
    expected: "Fewer signups, but each one reachable by email",
    metric: "Acquisition · Registrations",
    reviewOn: "2026-11-07",
  },
  {
    what: "21 Women of the Bible opened as a full study",
    date: "2026-10-18",
    verified: true,
    evidence: "30b205e8 and bd72d651 [deploy]",
    audience: "Everyone",
    expected: "A third study people can start",
    metric: "Devotionals · Started day 1",
    reviewOn: "2026-11-01",
  },
  {
    what: "Lil Louis moved into the bottom navigation",
    date: "2026-10-17",
    verified: true,
    evidence: "ae173fef Lil Louis gets a tab [deploy]",
    audience: "Everyone signed in",
    expected: "More people send the chat a message",
    metric: "Devotionals · Lil Louis chat",
    reviewOn: "2026-10-31",
  },
  {
    what: "Higher Hope released with its landing page",
    date: "2026-10-25",
    verified: true,
    evidence: "0b5b03b0 Higher Hope: landing page, seeder and the first ten days",
    audience: "Everyone",
    expected: "A study for a felt need, reachable from search",
    metric: "Devotionals · Readers",
    reviewOn: "2026-11-08",
  },
  {
    what: "Google sign-in consent screen shows Bible Buddy instead of the Supabase project id",
    date: "2026-10-26",
    verified: true,
    evidence: "Read off the live Google consent screen after publishing branding",
    audience: "Everyone choosing Continue with Google",
    expected: "Fewer people abandon at the Google screen",
    metric: "Acquisition · Visit → signup",
    reviewOn: "2026-11-09",
  },
  {
    what: "iOS build 1.16 submitted for App Store review",
    date: "2026-10-24",
    verified: true,
    evidence: "App Store Connect history, read 2026-10-26",
    audience: "iPhone, once approved",
    expected: "Nothing yet. Not released.",
    metric: "Retention · Native app actions",
    reviewOn: "After approval",
  },
  {
    what: "Google Play launch",
    date: "Not launched",
    verified: false,
    evidence: "Owner-reported 2026-10-26",
    audience: "Android",
    expected: "Blocked: identity verification incomplete, address needs updating",
    metric: "Not applicable until launched",
    reviewOn: "After verification",
  },
];

/** The landing redesign, for the before/after comparison on Acquisition. */
export const LANDING_REDESIGN = PRODUCT_RELEASES.find((r) => r.what === "New landing page shipped")!;
