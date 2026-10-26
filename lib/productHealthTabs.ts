import type { SupabaseClient } from "@supabase/supabase-js";
import {
  countOf,
  pageRows,
  rate,
  pct,
  iso,
  studyActionsForUsers,
  signupCohortBefore,
  countSignups,
  emailEvents,
  SCANNER_UA,
  OWNER_USER_ID,
  DAY_MS,
  unavailable,
  dashboardRanges,
  berlinDay,
  EMAIL_ATTRIBUTION_HOURS,
  MEANINGFUL_STUDY_ACTIONS,
  type Metric,
  type ProductHealthTab,
  type DashboardWindow,
} from "./productHealth";
import { PRODUCT_RELEASES, LANDING_REDESIGN } from "./productHealthReleases";

/**
 * The detail tabs. Split from lib/productHealth.ts so the Overview request
 * never loads or runs any of this - each tab is fetched on its own, which is
 * what keeps a refresh from sweeping six subsystems' history at once.
 */

type Range = { start: Date; end: Date };
type Section = { title: string; caption?: string; metrics: Metric[] };
export type TabData = { sections: Section[]; tables?: { title: string; columns: string[]; rows: (string | number | null)[][]; note?: string }[] };

/* ------------------------------------------------------------------ */
/* Acquisition                                                         */
/* ------------------------------------------------------------------ */

async function acquisition(admin: SupabaseClient, current: Range, previous: Range, now: Date): Promise<TabData> {
  const visits = await countOf(admin, "landing_page_events", (q) =>
    q.eq("event_name", "landing_page_visit").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const ctaClicks = await countOf(admin, "landing_page_events", (q) =>
    q.eq("event_name", "clicked_start_journey").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const regs = await countSignups(admin, current.start, current.end);
  const regsPrev = await countSignups(admin, previous.start, previous.end);

  /**
   * Source mix, from the signup record rather than guessed from referrers.
   *
   * This one keeps profile_stats, because signup_source lives nowhere else.
   * It filters on created_at, not registered_at: registered_at in this table
   * died on 2026-10-06 (see SIGNUP_TABLE in lib/productHealth.ts) and the
   * account_type column is barely populated, so guests cannot be filtered out
   * reliably here. The totals therefore will not match Registrations above,
   * and the table says so rather than pretending they are the same people.
   */
  const sourceRows = await pageRows<{ signup_source: string | null; user_id: string }>(
    admin,
    "profile_stats",
    "signup_source, user_id, created_at",
    (q) => q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)).neq("user_id", OWNER_USER_ID),
  );
  const bySource = new Map<string, number>();
  for (const r of sourceRows.rows) bySource.set(r.signup_source || "Unrecorded", (bySource.get(r.signup_source || "Unrecorded") || 0) + 1);

  /* Email delivery health and the funnel beneath it. */
  const events = await emailEvents(admin, current.start, current.end);
  const emailMetrics: Metric[] = [];
  if (events.error) {
    emailMetrics.push(unavailable("Email delivery", "count", events.error));
  } else {
    const by = (t: string) => events.rows.filter((e) => e.event_type === t);
    const delivered = by("delivery").length;
    const bounced = by("bounce").length;
    const humanClicks = by("click").filter((e) => !SCANNER_UA.test(e.user_agent || ""));
    const scannerClicks = by("click").length - humanClicks.length;
    emailMetrics.push(
      { label: "Delivered", value: delivered, unit: "count", evidence: delivered ? "live" : "insufficient" },
      rate("Bounce rate", bounced, delivered + bounced, null, "A bounce rate above about 5% puts the sending domain at risk."),
      { label: "Human clicks", value: humanClicks.length, unit: "count", evidence: "live", note: `${scannerClicks} further clicks came from scanner user agents and are excluded.` },
      {
        label: "Opens",
        value: by("open").length,
        unit: "count",
        evidence: "insufficient",
        note: "Shown for completeness only. Every open on record is a proxy or scanner fetch, so this number cannot be read as people reading.",
      },
    );
  }

  return {
    sections: [
      {
        title: "Landing page",
        caption: "Visit to account. The CTA click sits between them.",
        metrics: [
          visits.error ? unavailable("Landing visits", "count", visits.error) : { label: "Landing visits", value: visits.count, unit: "count", evidence: "live" },
          ctaClicks.error ? unavailable("CTA clicks", "count", ctaClicks.error) : { label: "CTA clicks", value: ctaClicks.count, unit: "count", evidence: "live" },
          regs.error
            ? unavailable("Registrations", "count", regs.error)
            : { label: "Registrations", value: regs.count, previous: regsPrev.count, unit: "count", evidence: "live" },
          visits.error || regs.error
            ? unavailable("Visit → signup", "percent", visits.error || regs.error || "")
            : rate("Visit → signup", regs.count ?? 0, visits.count ?? 0, null, "Registrations are site-wide, so arrivals that never saw the landing page are in the numerator."),
        ],
      },
      {
        title: "Email",
        caption: `Delivery, clicks, and study inside a ${EMAIL_ATTRIBUTION_HOURS}h attribution window.`,
        metrics: emailMetrics,
      },
      {
        title: "Blog",
        caption: "Views are measured. Blog reader to signup is not.",
        metrics: [await blogViews(admin, current)],
      },
    ],
    tables: [
      {
        title: "Where signups came from",
        columns: ["Source", "Signups"],
        rows: [...bySource.entries()].sort((a, b) => b[1] - a[1]).map(([s, n]) => [s, n]),
        note: "profile_stats.signup_source, recorded at account creation. These totals will NOT match Registrations above: this table cannot separate guests from registrations, because the columns that would do it stopped being written. 'Unrecorded' is a real state, not a zero.",
      },
      await landingRedesignComparison(admin, now),
    ],
  };
}

async function blogViews(admin: SupabaseClient, current: Range): Promise<Metric> {
  const res = await countOf(admin, "master_actions", (q) =>
    q.eq("action_type", "blog_post_viewed").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  return res.error
    ? unavailable("Blog post views", "count", res.error)
    : {
        label: "Blog post views",
        value: res.count,
        unit: "count",
        evidence: "live",
        note: "Nothing links a blog session to a later registration, so blog-to-signup conversion is not reported.",
      };
}

/* ------------------------------------------------------------------ */
/* Retention                                                           */
/* ------------------------------------------------------------------ */

async function retention(admin: SupabaseClient, current: Range, now: Date): Promise<TabData> {
  const windows: { n: number; label: string }[] = [
    { n: 1, label: "Day 1" },
    { n: 7, label: "Day 7" },
    { n: 30, label: "Day 30" },
  ];
  const metrics: Metric[] = [];
  for (const w of windows) {
    const cutoff = new Date(now.getTime() - w.n * DAY_MS);
    const cohort = await signupCohortBefore(admin, cutoff);
    if (cohort.error) {
      metrics.push(unavailable(`${w.label} study retention`, "percent", cohort.error));
      continue;
    }
    const ids = cohort.rows.map((r) => r.user_id).filter(Boolean);
    if (!ids.length) {
      metrics.push({ label: `${w.label} study retention`, value: null, denominator: 0, unit: "percent", evidence: "insufficient", note: "No cohort is old enough yet." });
      continue;
    }
    const acts = await studyActionsForUsers(admin, ids);
    if (acts.error) {
      metrics.push(unavailable(`${w.label} study retention`, "percent", acts.error));
      continue;
    }
    const reg = new Map(cohort.rows.map((r) => [r.user_id, r.registered_at ? new Date(r.registered_at).getTime() : 0]));
    const hit = new Set<string>();
    for (const a of acts.rows) {
      if (!a.user_id) continue;
      const r0 = reg.get(a.user_id);
      if (!r0) continue;
      const age = (new Date(a.created_at).getTime() - r0) / DAY_MS;
      if (age >= w.n && age < w.n + 7) hit.add(a.user_id);
    }
    metrics.push(rate(`${w.label} study retention`, hit.size, ids.length, null, `Meaningful study between day ${w.n} and day ${w.n + 6} after registering. Cohort window: last 90 days of eligible signups.`));
  }

  /* Platform split, honest about how little device_info is populated. */
  const total = await countOf(admin, "master_actions", (q) =>
    q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const native = await countOf(admin, "master_actions", (q) =>
    q.ilike("device_info->>userAgent", "%BibleBuddyApp%").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const mobileWeb = await countOf(admin, "master_actions", (q) =>
    q
      .ilike("device_info->>userAgent", "%iPhone%")
      .not("device_info->>userAgent", "ilike", "%BibleBuddyApp%")
      .gte("created_at", iso(current.start))
      .lt("created_at", iso(current.end)),
  );
  const withUa = await countOf(admin, "master_actions", (q) =>
    q.not("device_info->>userAgent", "is", null).gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const unknown = (total.count ?? 0) - (withUa.count ?? 0);

  return {
    sections: [
      { title: "Study retention by cohort", caption: "App opens are deliberately not counted. Only meaningful study.", metrics },
      {
        title: "Platform",
        caption: "An iPhone user agent is mobile web. Only the BibleBuddyApp marker is the native app.",
        metrics: [
          native.error ? unavailable("Native app actions", "count", native.error) : { label: "Native app actions", value: native.count, unit: "count", evidence: (native.count ?? 0) > 0 ? "live" : "insufficient", note: "The app is not released, so this is TestFlight and Louis's own device." },
          mobileWeb.error ? unavailable("Mobile web (iPhone)", "count", mobileWeb.error) : { label: "Mobile web (iPhone)", value: mobileWeb.count, unit: "count", evidence: "live" },
          { label: "Unknown platform", value: unknown, unit: "count", evidence: unknown > 0 ? "missing_tracking" : "live", note: "device_info is written empty on most actions, so platform cannot be determined for these. Installed-web-app versus browser is not distinguishable at all." },
        ],
      },
    ],
    tables: [
      {
        title: "New versus existing users on iOS",
        columns: ["Field", "Value"],
        rows: [["Status", "Not reportable"], ["Why", "Fewer than a few dozen actions carry the native marker and the app has not been released, so splitting them by account age would be noise."]],
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Devotionals                                                         */
/* ------------------------------------------------------------------ */

async function devotionals(admin: SupabaseClient, current: Range): Promise<TabData> {
  const { data: studies, error: studiesError } = await admin
    .from("devotionals")
    .select("id, title, total_days, available_from, is_published")
    .order("title");
  if (studiesError) {
    return { sections: [{ title: "Devotionals", metrics: [unavailable("Devotionals", "count", studiesError.message)] }] };
  }

  const progress = await pageRows<{ devotional_id: string; user_id: string; day_number: number; is_completed: boolean; created_at: string }>(
    admin,
    "devotional_progress",
    "devotional_id, user_id, day_number, is_completed, created_at",
    (q) => q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)).neq("user_id", OWNER_USER_ID),
  );

  const rows: (string | number | null)[][] = [];
  for (const s of studies || []) {
    const mine = progress.rows.filter((p) => p.devotional_id === s.id);
    if (!mine.length) continue;
    const readers = new Set(mine.map((p) => p.user_id)).size;
    const starters = new Set(mine.filter((p) => p.day_number === 1).map((p) => p.user_id)).size;
    const deepest = new Map<string, number>();
    for (const p of mine) {
      if (!p.is_completed) continue;
      deepest.set(p.user_id, Math.max(deepest.get(p.user_id) || 0, p.day_number));
    }
    const pastDayThree = [...deepest.values()].filter((d) => d >= 3).length;
    const finishers = [...deepest.values()].filter((d) => d >= (s.total_days || 9999)).length;
    const notYetOpen = s.available_from && new Date(s.available_from) > current.end;
    rows.push([
      s.title,
      s.total_days ?? null,
      readers,
      starters,
      pastDayThree,
      notYetOpen ? "not open yet" : finishers,
    ]);
  }
  rows.sort((a, b) => Number(b[3]) - Number(a[3]));

  /* TV and chat, labelled for what is and is not measurable. */
  const uniq = async (label: string, actions: string[], note: string, evidenceWhenZero: Metric["evidence"] = "insufficient"): Promise<Metric> => {
    const res = await pageRows<{ user_id: string | null }>(
      admin,
      "master_actions",
      "user_id, created_at",
      (q) => q.in("action_type", actions).gte("created_at", iso(current.start)).lt("created_at", iso(current.end)).neq("user_id", OWNER_USER_ID),
    );
    if (res.error) return unavailable(label, "count", res.error);
    const value = new Set(res.rows.map((r) => r.user_id).filter(Boolean)).size;
    return { label, value, unit: "count", evidence: value ? "live" : evidenceWhenZero, note };
  };

  const tv = [
    await uniq("TV opened", ["bible_buddy_tv_viewed"], "People who opened Bible Buddy TV."),
    await uniq("Title selected", ["bible_buddy_tv_title_opened"], "A selection is not a viewing."),
    await uniq("Video started", ["bible_buddy_tv_video_started"], "A start is not a watch."),
    {
      label: "Watch time",
      value: null,
      unit: "minutes" as const,
      evidence: "missing_tracking" as const,
      note: "No playback progress is recorded anywhere, so how much of a video was watched is unknown. This needs instrumentation before it can be reported.",
    },
  ];
  const chat = [
    await uniq("Chat opened", ["louis_opened"], "Opening the chat."),
    await uniq("Sent a message", ["louis_user_message_sent"], "The real adoption number: people who actually typed something."),
  ];

  return {
    sections: [
      { title: "Bible Buddy TV", caption: "Clicks are not proof of viewing.", metrics: tv },
      { title: "Lil Louis chat", caption: "Message contents are never read by this dashboard, only counts.", metrics: chat },
    ],
    tables: [
      {
        title: "Per study",
        columns: ["Study", "Days", "Readers", "Started day 1", "Reached day 3", "Finished"],
        rows,
        note: "Activity inside the selected period only. A long study released recently cannot show finishers yet, and days that have not unlocked are excluded rather than counted as drop-off.",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Community                                                           */
/* ------------------------------------------------------------------ */

async function community(admin: SupabaseClient, current: Range): Promise<TabData> {
  const posts = await pageRows<{ user_id: string; created_at: string; comment_count: number | null }>(
    admin,
    "feed_posts",
    "user_id, created_at, comment_count",
    (q) => q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)).neq("user_id", OWNER_USER_ID),
  );
  const comments = await pageRows<{ user_id: string; post_id: string; created_at: string }>(
    admin,
    "feed_post_comments",
    "user_id, post_id, created_at",
    (q) => q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)).neq("user_id", OWNER_USER_ID),
  );
  const reactions = await pageRows<{ user_id: string; post_id: string; created_at: string }>(
    admin,
    "feed_post_reactions",
    "user_id, post_id, created_at",
    (q) => q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)).neq("user_id", OWNER_USER_ID),
  );
  const sent = await countOf(admin, "buddy_requests", (q) => q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)));
  const accepted = await countOf(admin, "buddy_requests", (q) =>
    q.eq("status", "accepted").gte("updated_at", iso(current.start)).lt("updated_at", iso(current.end)),
  );

  const autoComments = await countOf(admin, "article_comments", (q) =>
    q.eq("is_auto", true).gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const humanArticleComments = await countOf(admin, "article_comments", (q) =>
    q.eq("is_auto", false).eq("is_deleted", false).gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );

  const postedIds = new Set(posts.rows.map((r) => r.user_id));
  const answered = new Set(comments.rows.map((r) => r.post_id));

  return {
    sections: [
      {
        title: "Feed",
        caption: "Louis's own account is excluded throughout.",
        metrics: [
          posts.error ? unavailable("Posts", "count", posts.error) : { label: "Posts", value: posts.rows.length, unit: "count", evidence: "live" },
          { label: "Unique posters", value: postedIds.size, unit: "count", evidence: postedIds.size ? "live" : "insufficient" },
          comments.error ? unavailable("Commenters", "count", comments.error) : { label: "Unique commenters", value: new Set(comments.rows.map((r) => r.user_id)).size, unit: "count", evidence: "live" },
          reactions.error ? unavailable("Reacting people", "count", reactions.error) : { label: "People reacting", value: new Set(reactions.rows.map((r) => r.user_id)).size, unit: "count", evidence: "live" },
          posts.error ? unavailable("Posts answered", "percent", posts.error) : rate("Posts that got a reply", answered.size, posts.rows.length, null, "A post with nobody answering is the thing that makes people stop posting."),
        ],
      },
      {
        title: "Buddies",
        caption: "Requests sent in the period against acceptances recorded in it.",
        metrics: [
          sent.error ? unavailable("Requests sent", "count", sent.error) : { label: "Requests sent", value: sent.count, unit: "count", evidence: "live" },
          accepted.error ? unavailable("Requests accepted", "count", accepted.error) : { label: "Requests accepted", value: accepted.count, unit: "count", evidence: "live" },
          sent.error || accepted.error ? unavailable("Acceptance rate", "percent", sent.error || accepted.error || "") : rate("Acceptance rate", accepted.count ?? 0, sent.count ?? 0, null, "Requests can be accepted after the period they were sent in, so this crosses boundaries."),
        ],
      },
      {
        title: "Automation separated out",
        caption: "Auto-posted replies are not community activity and are never mixed into the human counts.",
        metrics: [
          autoComments.error ? unavailable("Auto comments", "count", autoComments.error) : { label: "Auto-posted comments", value: autoComments.count, unit: "count", evidence: "live", note: "article_comments.is_auto, posted by the reply routine every 15 minutes." },
          humanArticleComments.error ? unavailable("Human study comments", "count", humanArticleComments.error) : { label: "Human study comments", value: humanArticleComments.count, unit: "count", evidence: "live" },
        ],
      },
    ],
    tables: [
      {
        title: "Discovery gaps, for a future Recommended Buddies",
        columns: ["Gap", "What is missing"],
        rows: [
          ["How people find each other", "No event records a profile being viewed from a discovery surface, so there is no way to tell browsing from a direct link."],
          ["Why a request was sent", "buddy_requests records sender, receiver and status only. Nothing says what prompted it."],
          ["Shared ground", "Study overlap between two people is computable from devotional_progress but is not stored anywhere as a signal."],
        ],
        note: "Listed for a later piece of work. Nothing was built and no extra profile information was collected.",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Releases                                                            */
/* ------------------------------------------------------------------ */

function releases(): TabData {
  return {
    sections: [],
    tables: [
      {
        title: "Change log",
        columns: ["What changed", "Date", "Verified", "Audience", "Expected outcome", "Metric to review", "Review on"],
        rows: PRODUCT_RELEASES.map((r) => [r.what, r.date, r.verified ? "git commit" : "owner-reported", r.audience, r.expected, r.metric, r.reviewOn]),
        note: "Verified entries are anchored to a commit in this repository. Owner-reported entries are Louis's recollection and are labelled as such, never promoted to verified.",
      },
    ],
  };
}

/* ------------------------------------------------------------------ */

export async function computeTab(admin: SupabaseClient, tab: ProductHealthTab, window: DashboardWindow, now: Date): Promise<TabData> {
  const { current, previous } = dashboardRanges(window, now);
  switch (tab) {
    case "acquisition":
      return acquisition(admin, current, previous, now);
    case "retention":
      return retention(admin, current, now);
    case "devotionals":
      return devotionals(admin, current);
    case "community":
      return community(admin, current);
    case "releases":
      return releases();
    default:
      return { sections: [] };
  }
}

export { berlinDay, pct };
export type { Range, Section };

/**
 * Before and after the landing page shipped.
 *
 * Observational, and labelled as such on the page. Everything else moved in
 * the same fortnight - guest accounts went off, the onboarding questionnaire
 * went, the Google consent screen was fixed - so this says what changed
 * alongside the redesign, not what the redesign caused.
 */
async function landingRedesignComparison(admin: SupabaseClient, now: Date) {
  const shipped = new Date(`${LANDING_REDESIGN.date}T00:00:00Z`);
  const elapsed = Math.floor((now.getTime() - shipped.getTime()) / DAY_MS);
  const span = Math.min(Math.max(elapsed, 1), 14);

  const side = async (start: Date, end: Date) => {
    const v = await countOf(admin, "landing_page_events", (q) =>
      q.eq("event_name", "landing_page_visit").gte("created_at", iso(start)).lt("created_at", iso(end)),
    );
    const r = await countSignups(admin, start, end);
    return { visits: v.count, regs: r.count, error: v.error || r.error };
  };

  const after = await side(shipped, new Date(shipped.getTime() + span * DAY_MS));
  const before = await side(new Date(shipped.getTime() - span * DAY_MS), shipped);

  if (after.error || before.error) {
    return {
      title: "Landing page redesign",
      columns: ["Field", "Value"],
      rows: [["Status", "Source unavailable"], ["Error", after.error || before.error || ""]] as (string | number | null)[][],
    };
  }
  if (elapsed < 3) {
    return {
      title: "Landing page redesign",
      columns: ["Field", "Value"],
      rows: [
        ["Shipped", `${LANDING_REDESIGN.date} (verified: ${LANDING_REDESIGN.evidence})`],
        ["Status", `Only ${elapsed} day(s) of data since. Too early to compare.`],
      ] as (string | number | null)[][],
      note: "A comparison will appear here once there is at least three days either side.",
    };
  }
  return {
    title: "Landing page redesign",
    columns: ["Period", "Landing visits", "Registrations", "Visit → signup"],
    rows: [
      [`${span} days before`, before.visits, before.regs, `${pct(before.regs ?? 0, before.visits ?? 0)}%`],
      [`${span} days after`, after.visits, after.regs, `${pct(after.regs ?? 0, after.visits ?? 0)}%`],
    ] as (string | number | null)[][],
    note: `Shipped ${LANDING_REDESIGN.date}, verified against ${LANDING_REDESIGN.evidence}. Observational only: guest accounts, the onboarding questionnaire and the Google consent screen all changed in the same fortnight, so this is not evidence the redesign caused the difference.`,
  };
}
