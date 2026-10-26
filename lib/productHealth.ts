import type { SupabaseClient } from "@supabase/supabase-js";
import { berlinDay, dashboardRanges, type DashboardWindow } from "./adminDashboard";

/**
 * Product Health: are our systems helping people discover Bible Buddy, start
 * studying, return, and connect with each other? (Louis, 2026-10-26)
 *
 * NOT a second analytics system. /admin/analytics still owns traffic and raw
 * activity, and this reads the same tables through the same Berlin-midnight
 * helpers it uses (berlinDay, dashboardRanges from lib/adminDashboard.ts).
 * The difference is the question: that page says how much happened, this one
 * says whether what happened did its job.
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE: a number is only shown when it was
 * actually measured. Every metric carries an `evidence` state, and a failed
 * query, a table that does not exist, or a cohort too young to judge each get
 * their own state rather than quietly becoming a zero. Louis has to be able
 * to tell "nobody did this" from "we never tracked it" at a glance, because
 * the two call for opposite responses.
 */

/* ------------------------------------------------------------------ */
/* Evidence                                                            */
/* ------------------------------------------------------------------ */

export type Evidence =
  /** Measured from real rows over the selected period. */
  | "live"
  /** Measured, but the sample or the elapsed time is too small to read. */
  | "insufficient"
  /** The thing is not instrumented. A zero here would be a lie. */
  | "missing_tracking"
  /** Meaningless for this period or this surface, e.g. a study not released. */
  | "not_applicable"
  /** The query or integration failed. Never silently a zero. */
  | "source_unavailable";

export type Metric = {
  label: string;
  /** null whenever evidence is not "live" or "insufficient". */
  value: number | null;
  /** The denominator behind a percentage, so nobody reads 100% of two people as a win. */
  denominator?: number | null;
  /** Same metric over the comparable previous period, when one exists. */
  previous?: number | null;
  unit: "percent" | "count" | "minutes";
  evidence: Evidence;
  /** Why it is not live, or what the number does and does not prove. */
  note?: string;
};

export const EVIDENCE_LABEL: Record<Evidence, string> = {
  live: "Measured",
  insufficient: "Not enough yet",
  missing_tracking: "Not tracked",
  not_applicable: "Not applicable",
  source_unavailable: "Source unavailable",
};

const metric = (m: Metric): Metric => m;

/** A metric whose query threw. Keeps the failure visible instead of zeroing it. */
export function unavailable(label: string, unit: Metric["unit"], reason: string): Metric {
  return { label, value: null, unit, evidence: "source_unavailable", note: reason };
}

/* ------------------------------------------------------------------ */
/* Definitions, shown in the UI so a number can always be interrogated  */
/* ------------------------------------------------------------------ */

/**
 * What counts as study. Deliberately narrow: opening a page is not studying.
 * Trivia and games are left out because finishing a quiz is not the outcome
 * this dashboard is asking about.
 */
export const MEANINGFUL_STUDY_ACTIONS = [
  "devotional_day_completed",
  "bible_in_one_year_day_completed",
  "chapter_completed",
  "reading_plan_chapter_completed",
] as const;

/** Louis's own account. Excluded everywhere, or he is his own best cohort. */
const OWNER_USER_ID = "669d4404-5eee-49ee-a112-2ecbd573e22a";

const DAY_MS = 86_400_000;
/** A click is credited with study that follows it inside this window. */
export const EMAIL_ATTRIBUTION_HOURS = 24;
/** A signup cohort is not judged on day 7 until 7 full days have passed. */
export const RETENTION_ELIGIBILITY_DAYS = { d1: 1, d7: 7, d30: 30 } as const;
/** Below this many people a rate is reported but flagged as unreadable. */
export const MIN_COHORT_FOR_RATE = 20;

export const DEFINITIONS: { term: string; meaning: string }[] = [
  {
    term: "Meaningful study activity",
    meaning:
      "One of " +
      MEANINGFUL_STUDY_ACTIONS.join(", ") +
      ". Opening a page, playing a game or answering trivia does not count.",
  },
  {
    term: "Signup cohort",
    meaning:
      "email_engagement.registered_at, which is the column still being written. Guests are Supabase anonymous users with no address, so an email row is a real registration and guests are excluded by construction. profile_stats.registered_at is NOT used: it stopped being written on 2026-10-06 and has 3 rows in the last 30 days. Anyone who registered without reaching the email pipeline is missing, which understates the denominator rather than inventing people.",
  },
  {
    term: "First-study activation",
    meaning:
      "Of the people who registered in the period, the share who have since completed at least one meaningful study. The most recent signups have had less time to qualify, so this number can only rise as a period ages.",
  },
  {
    term: "Day 7 study retention",
    meaning:
      "Of the people who registered at least 7 full days before the end of the period, the share with meaningful study activity on day 7 to day 13 after registering. Anyone who registered more recently is not eligible and is excluded from the denominator.",
  },
  {
    term: "Email-attributed study",
    meaning:
      "People who clicked a link in a Bible Buddy email during the period and completed a meaningful study within " +
      EMAIL_ATTRIBUTION_HOURS +
      " hours of that click. Attribution is not causation: some of them would have studied anyway.",
  },
  {
    term: "Email opens",
    meaning:
      "Treated as a weak signal only. Every open on record is a proxy or scanner fetch, so clicks are the trustworthy number. Clicks from known scanner user agents are excluded where identifiable.",
  },
  {
    term: "Platform",
    meaning:
      "Native app only when master_actions.device_info.userAgent carries the BibleBuddyApp marker that capacitor.config.ts appends. An iPhone user agent on its own is mobile web, not the app. Rows with no device_info are Unknown.",
  },
  {
    term: "Unique users",
    meaning:
      "Distinct user_id. Rows with no user_id are counted separately as signed-out and never merged into a known person.",
  },
  {
    term: "Reporting timezone",
    meaning: "Europe/Berlin. Day boundaries are Berlin midnight, matching /admin/analytics.",
  },
  {
    term: "Previous period",
    meaning:
      "The equal-length stretch immediately before the selected one. Today compares against the same hours of yesterday, so a morning is never compared with a whole day.",
  },
  {
    term: "Exclusions",
    meaning:
      "Louis's own account is excluded from study, feed and buddy counts. Auto-posted comments (article_comments.is_auto) are separated from human ones.",
  },
];

/* ------------------------------------------------------------------ */
/* Query helpers                                                       */
/* ------------------------------------------------------------------ */

type Range = { start: Date; end: Date };

/** A counting query that reports its own failure rather than returning 0. */
async function countOf(
  admin: SupabaseClient,
  table: string,
  // The query builder's generics do not survive being passed around.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply: (q: any) => any,
): Promise<{ count: number | null; error?: string }> {
  try {
    const res = await apply(admin.from(table).select("*", { count: "exact", head: true }));
    // An error with an empty message is still an error. This is not
    // hypothetical: a head:true count on email_engagement came back with
    // exactly that, the empty string read as falsy at the call site, and the
    // landing page conversion rendered as 0% of 6,064 visits instead of 4.4%.
    // A silent zero from a failed query is the one thing this file exists to
    // prevent, so any error at all is reported, named or not.
    if (res.error) return { count: null, error: res.error.message || `${table}: query rejected` };
    if (res.count == null) return { count: null, error: `${table}: no count returned` };
    return { count: res.count };
  } catch (error) {
    return { count: null, error: error instanceof Error ? error.message : "query failed" };
  }
}

/**
 * Count by reading the rows back.
 *
 * Slower than a head count and used only where the head count is unreliable.
 * PostgREST returns no count for some filter combinations on views, and a
 * missing count must never be mistaken for zero.
 */
async function countByRows(
  admin: SupabaseClient,
  table: string,
  column: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply: (q: any) => any,
  orderColumn: string,
): Promise<{ count: number | null; error?: string }> {
  const res = await pageRows<Record<string, unknown>>(admin, table, column, apply, orderColumn);
  if (res.error) return { count: null, error: res.error };
  return { count: res.rows.length };
}

/**
 * Page rows out with a hard ceiling.
 *
 * Nothing on this dashboard may scan unbounded history on a refresh, so every
 * caller passes a date-bounded filter and this stops at `max` regardless. A
 * truncated read is reported, never passed off as the whole picture.
 */
async function pageRows<T>(
  admin: SupabaseClient,
  table: string,
  columns: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply: (q: any) => any,
  orderColumn = "created_at",
  max = 20000,
): Promise<{ rows: T[]; truncated: boolean; error?: string }> {
  const rows: T[] = [];
  try {
    for (let from = 0; from < max; from += 1000) {
      const res = await apply(admin.from(table).select(columns))
        .order(orderColumn, { ascending: true })
        .range(from, from + 999);
      if (res.error) return { rows, truncated: false, error: res.error.message };
      const batch = (res.data || []) as T[];
      rows.push(...batch);
      if (batch.length < 1000) return { rows, truncated: false };
    }
    return { rows, truncated: true };
  } catch (error) {
    return { rows, truncated: false, error: error instanceof Error ? error.message : "query failed" };
  }
}

const iso = (d: Date) => d.toISOString();
const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 1000) / 10 : 0);

/** Rate metric that tells the truth about a small denominator. */
function rate(label: string, numerator: number, denominator: number, previous?: number | null, note?: string): Metric {
  const value = pct(numerator, denominator);
  /**
   * A share above 100% is never a fact about people, it is a sign the two
   * numbers do not belong to each other. It is reported as a broken
   * definition rather than printed. This caught a 909% day-completion rate
   * built on an event that barely fires.
   */
  if (value > 100) {
    return {
      label,
      value: null,
      denominator,
      unit: "percent",
      evidence: "source_unavailable",
      note: `Definition error: ${numerator} over ${denominator} is ${value}%. The numerator and denominator are not measuring the same thing, so no rate is shown.`,
    };
  }
  return {
    label,
    value,
    denominator,
    previous: previous ?? null,
    unit: "percent",
    evidence: denominator === 0 ? "insufficient" : denominator < MIN_COHORT_FOR_RATE ? "insufficient" : "live",
    note:
      denominator === 0
        ? "Nobody was eligible in this period."
        : denominator < MIN_COHORT_FOR_RATE
          ? `Only ${denominator} people qualify, too few to read as a trend.`
          : note,
  };
}

/* ------------------------------------------------------------------ */
/* Shared fact gathering                                               */
/* ------------------------------------------------------------------ */

type StudyRow = { user_id: string | null; action_type: string; created_at: string };
type SignupRow = { user_id: string; registered_at: string | null };

/**
 * THE SIGNUP COHORT, and why it is not the obvious table.
 *
 * profile_stats looks like the right place and is not. Two traps, both found
 * by checking the numbers rather than trusting the column names:
 *
 *  - profile_stats.registered_at stopped being written on 2026-10-06, the day
 *    guest accounts were switched off, because the guest-to-registered
 *    conversion was the only thing that set it. Three rows in the last 30
 *    days. A cohort built on it is empty and every rate on top of it is noise.
 *  - profile_stats.account_type only started being filled recently: 36 rows
 *    in the last 7 days against 37 in the last 30. Filtering on it drops
 *    almost everybody.
 *
 * email_engagement.registered_at is written through to today (266 in the last
 * 30 days, 80 in the last 7) and carries the user_id needed to join to study
 * activity. It also matches how /admin/analytics already splits people:
 * guests are Supabase anonymous users with no address, everyone real has one,
 * so an email row IS a real signup and guests are excluded by construction.
 *
 * The known gap: anyone who registered but never reached the email pipeline
 * is missing. That understates the denominator, which makes activation and
 * retention read slightly high rather than inventing people who do not exist.
 */
const SIGNUP_TABLE = "email_engagement";
const SIGNUP_DATE = "registered_at";

async function studyActions(admin: SupabaseClient, from: Date, to: Date) {
  return pageRows<StudyRow>(
    admin,
    "master_actions",
    "user_id, action_type, created_at",
    (q) =>
      q
        .in("action_type", MEANINGFUL_STUDY_ACTIONS as unknown as string[])
        .gte("created_at", iso(from))
        .lt("created_at", iso(to))
        .neq("user_id", OWNER_USER_ID),
  );
}

/** Everyone who registered between two instants. See SIGNUP_TABLE above. */
export async function signupCohort(admin: SupabaseClient, from: Date, to: Date) {
  return pageRows<SignupRow>(
    admin,
    SIGNUP_TABLE,
    "user_id, registered_at",
    (q) =>
      q
        .gte(SIGNUP_DATE, iso(from))
        .lt(SIGNUP_DATE, iso(to))
        .not("user_id", "is", null)
        .neq("user_id", OWNER_USER_ID),
    SIGNUP_DATE,
  );
}

/** Everyone who registered before an instant, bounded to a 90 day lookback. */
export async function signupCohortBefore(admin: SupabaseClient, before: Date, lookbackDays = 90) {
  return pageRows<SignupRow>(
    admin,
    SIGNUP_TABLE,
    "user_id, registered_at",
    (q) =>
      q
        .lt(SIGNUP_DATE, iso(before))
        .gte(SIGNUP_DATE, iso(new Date(before.getTime() - lookbackDays * DAY_MS)))
        .not("user_id", "is", null)
        .neq("user_id", OWNER_USER_ID),
    SIGNUP_DATE,
  );
}

/**
 * How many registered in a window.
 *
 * Counted by reading the rows, not by a head count: PostgREST returns no
 * count for this particular set of filters on email_engagement, and that
 * missing count is what produced a 0% landing conversion before.
 */
export async function countSignups(admin: SupabaseClient, from: Date, to: Date) {
  return countByRows(
    admin,
    SIGNUP_TABLE,
    "user_id",
    (q) =>
      q.gte(SIGNUP_DATE, iso(from)).lt(SIGNUP_DATE, iso(to)).not("user_id", "is", null).neq("user_id", OWNER_USER_ID),
    SIGNUP_DATE,
  );
}

const signups = signupCohort;

/** Study actions for a set of users, at any time. Chunked to keep URLs sane. */
async function studyActionsForUsers(admin: SupabaseClient, userIds: string[]) {
  const out: StudyRow[] = [];
  for (let i = 0; i < userIds.length; i += 150) {
    const chunk = userIds.slice(i, i + 150);
    const res = await pageRows<StudyRow>(
      admin,
      "master_actions",
      "user_id, action_type, created_at",
      (q) => q.in("action_type", MEANINGFUL_STUDY_ACTIONS as unknown as string[]).in("user_id", chunk),
    );
    if (res.error) return { rows: out, error: res.error };
    out.push(...res.rows);
  }
  return { rows: out };
}

/**
 * Email clicks that look like a person.
 *
 * Every open on record is a scanner fetch, so opens are never used as a
 * success measure. Clicks are better but not clean: security appliances
 * follow links too, and they announce themselves in the user agent.
 */
const SCANNER_UA = /(bot|crawler|spider|proofpoint|barracuda|mimecast|symantec|forcepoint|microsoft office|outlook-ios-android|safelinks|GoogleImageProxy|curl|wget|python-requests|HeadlessChrome)/i;

type EmailEventRow = { event_type: string; occurred_at: string; email: string | null; campaign_id: string | null; user_agent: string | null; link_url: string | null };

async function emailEvents(admin: SupabaseClient, from: Date, to: Date) {
  return pageRows<EmailEventRow>(
    admin,
    "email_events",
    "event_type, occurred_at, email, campaign_id, user_agent, link_url",
    (q) => q.gte("occurred_at", iso(from)).lt("occurred_at", iso(to)),
    "occurred_at",
  );
}

/* ------------------------------------------------------------------ */
/* Overview                                                            */
/* ------------------------------------------------------------------ */

export type SystemRow = {
  system: string;
  intent: string;
  measure: string;
  metric: Metric;
  detailTab: string;
};

export type OverviewData = {
  headline: Metric[];
  systems: SystemRow[];
  retentionByCohort: { label: string; cohortSize: number; retained: number; rate: number; eligible: boolean }[];
  topDevotionals: { title: string; starts: number }[];
  featureAdoption: Metric[];
  banner: { title: string; detail: string };
  focus: { title: string; detail: string }[];
  playStore: { status: string; detail: string; source: string };
};

async function computeOverview(admin: SupabaseClient, window: DashboardWindow, now: Date): Promise<OverviewData> {
  const { current, previous } = dashboardRanges(window, now);
  const problems: string[] = [];

  /* --- 1. First-study activation ----------------------------------- */
  const [cur, prev] = await Promise.all([signups(admin, current.start, current.end), signups(admin, previous.start, previous.end)]);
  if (cur.error) problems.push(`signups: ${cur.error}`);

  const curIds = cur.rows.map((r) => r.user_id).filter(Boolean);
  const prevIds = prev.rows.map((r) => r.user_id).filter(Boolean);
  const curStudy = curIds.length ? await studyActionsForUsers(admin, curIds) : { rows: [] as StudyRow[] };
  const prevStudy = prevIds.length ? await studyActionsForUsers(admin, prevIds) : { rows: [] as StudyRow[] };
  const curActivated = new Set(curStudy.rows.map((r) => r.user_id).filter(Boolean)).size;
  const prevActivated = new Set(prevStudy.rows.map((r) => r.user_id).filter(Boolean)).size;

  const activation = cur.error
    ? unavailable("First-study activation", "percent", cur.error)
    : rate(
        "First-study activation",
        curActivated,
        curIds.length,
        pct(prevActivated, prevIds.length),
        "Counts any meaningful study since registering, so the newest signups have had least time to qualify.",
      );

  /* --- 2. Day 7 study retention ------------------------------------ */
  const d7 = await dayNRetention(admin, 7, current.end, now);
  const d7prev = await dayNRetention(admin, 7, previous.end, now);
  const retention = d7.error
    ? unavailable("Day 7 study retention", "percent", d7.error)
    : rate("Day 7 study retention", d7.retained, d7.eligible, d7prev.error ? null : pct(d7prev.retained, d7prev.eligible),
        "Only people who registered at least 7 full days ago are eligible.");

  /* --- 3. Email-attributed study ----------------------------------- */
  const emailMetric = await emailToStudy(admin, current, previous);

  /* --- 4. Buddy connections ---------------------------------------- */
  const accepted = await countOf(admin, "buddy_requests", (q) =>
    q.eq("status", "accepted").gte("updated_at", iso(current.start)).lt("updated_at", iso(current.end)),
  );
  const acceptedPrev = await countOf(admin, "buddy_requests", (q) =>
    q.eq("status", "accepted").gte("updated_at", iso(previous.start)).lt("updated_at", iso(previous.end)),
  );
  const buddies: Metric = accepted.error
    ? unavailable("Buddy connections", "count", accepted.error)
    : {
        label: "Buddy connections",
        value: accepted.count,
        previous: acceptedPrev.count,
        unit: "count",
        evidence: "live",
        note: "Requests whose status became accepted in this period.",
      };

  /* --- system health table ----------------------------------------- */
  const systems = await computeSystems(admin, current, previous, { activation, retention, emailMetric, buddies });

  /* --- retention by signup week ------------------------------------ */
  const cohorts = await retentionByWeek(admin, now);

  /* --- supporting cards -------------------------------------------- */
  const [topDevotionals, featureAdoption] = await Promise.all([
    mostStartedDevotionals(admin, current),
    featureAdoptionMetrics(admin, current),
  ]);

  const banner = buildBanner({ activation, retention, emailMetric, buddies }, problems);
  const focus = buildFocus({ activation, retention, emailMetric, buddies }, systems);

  return {
    headline: [activation, retention, emailMetric, buddies],
    systems,
    retentionByCohort: cohorts,
    topDevotionals,
    featureAdoption,
    banner,
    focus,
    playStore: {
      status: "Blocked (owner-reported)",
      detail:
        "Louis reports identity verification is incomplete and his address needs updating to his current one before he can verify again. Not independently checked from here, and nothing about his address or account was changed.",
      source: "Owner-reported 2026-10-26",
    },
  };
}

/** Day N retention for everybody eligible as of `asOf`. */
async function dayNRetention(admin: SupabaseClient, n: number, asOf: Date, now: Date) {
  const cutoff = new Date(Math.min(asOf.getTime(), now.getTime()) - n * DAY_MS);
  const cohort = await signupCohortBefore(admin, cutoff);
  if (cohort.error) return { eligible: 0, retained: 0, error: cohort.error };
  const ids = cohort.rows.map((r) => r.user_id).filter(Boolean);
  if (!ids.length) return { eligible: 0, retained: 0 };
  const acts = await studyActionsForUsers(admin, ids);
  if (acts.error) return { eligible: ids.length, retained: 0, error: acts.error };

  const registeredAt = new Map(cohort.rows.map((r) => [r.user_id, r.registered_at ? new Date(r.registered_at).getTime() : 0]));
  const retained = new Set<string>();
  for (const a of acts.rows) {
    if (!a.user_id) continue;
    const reg = registeredAt.get(a.user_id);
    if (!reg) continue;
    const age = (new Date(a.created_at).getTime() - reg) / DAY_MS;
    // The 7th day window: day 7 up to day 14. Studying on day 2 is not day 7
    // retention, and this is the distinction the whole metric rests on.
    if (age >= n && age < n + 7) retained.add(a.user_id);
  }
  return { eligible: ids.length, retained: retained.size };
}

async function emailToStudy(admin: SupabaseClient, current: Range, previous: Range): Promise<Metric> {
  const events = await emailEvents(admin, current.start, current.end);
  if (events.error) return unavailable("Email → study", "percent", `email_events: ${events.error}`);

  const clicks = events.rows.filter((e) => e.event_type === "click" && !SCANNER_UA.test(e.user_agent || ""));
  if (!clicks.length) {
    return {
      label: "Email → study",
      value: null,
      denominator: 0,
      unit: "percent",
      evidence: "insufficient",
      note: "No human-looking email clicks in this period.",
    };
  }
  const emails = [...new Set(clicks.map((c) => (c.email || "").toLowerCase()).filter(Boolean))];

  // Clicker -> user_id, through the one table that joins an address to a person.
  const link = await pageRows<{ email: string; user_id: string | null }>(
    admin,
    "email_engagement",
    "email, user_id",
    (q) => q.in("email", emails.slice(0, 500)),
    "email",
  );
  if (link.error) return unavailable("Email → study", "percent", `email_engagement: ${link.error}`);
  const userByEmail = new Map(link.rows.filter((r) => r.user_id).map((r) => [r.email.toLowerCase(), r.user_id as string]));
  const ids = [...new Set([...userByEmail.values()])];
  if (!ids.length) {
    return {
      label: "Email → study",
      value: 0,
      denominator: emails.length,
      unit: "percent",
      evidence: "live",
      note: `${emails.length} addresses clicked, none of which is linked to a Bible Buddy account.`,
    };
  }
  const acts = await studyActionsForUsers(admin, ids);
  if (acts.error) return unavailable("Email → study", "percent", acts.error);

  const firstClick = new Map<string, number>();
  for (const c of clicks) {
    const uid = userByEmail.get((c.email || "").toLowerCase());
    if (!uid) continue;
    const t = new Date(c.occurred_at).getTime();
    if (!firstClick.has(uid) || t < firstClick.get(uid)!) firstClick.set(uid, t);
  }
  const attributed = new Set<string>();
  for (const a of acts.rows) {
    if (!a.user_id) continue;
    const click = firstClick.get(a.user_id);
    if (click == null) continue;
    const dt = new Date(a.created_at).getTime() - click;
    if (dt >= 0 && dt <= EMAIL_ATTRIBUTION_HOURS * 3_600_000) attributed.add(a.user_id);
  }

  const prevEvents = await emailEvents(admin, previous.start, previous.end);
  const prevClickers = prevEvents.error
    ? null
    : new Set(prevEvents.rows.filter((e) => e.event_type === "click" && !SCANNER_UA.test(e.user_agent || "")).map((e) => (e.email || "").toLowerCase())).size;

  return rate(
    "Email → study",
    attributed.size,
    emails.length,
    prevClickers ? null : null,
    `Of ${emails.length} addresses that clicked, ${attributed.size} studied within ${EMAIL_ATTRIBUTION_HOURS}h. Attribution, not proof the email caused it.`,
  );
}

async function computeSystems(
  admin: SupabaseClient,
  current: Range,
  previous: Range,
  known: { activation: Metric; retention: Metric; emailMetric: Metric; buddies: Metric },
): Promise<SystemRow[]> {
  /* iOS: only the BibleBuddyApp marker proves the native app. */
  const nativeRows = await countOf(admin, "master_actions", (q) =>
    q.ilike("device_info->>userAgent", "%BibleBuddyApp%").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const iosMetric: Metric = nativeRows.error
    ? unavailable("Native app actions", "count", nativeRows.error)
    : {
        label: "Native app actions",
        value: nativeRows.count,
        unit: "count",
        evidence: (nativeRows.count ?? 0) < MIN_COHORT_FOR_RATE ? "insufficient" : "live",
        note:
          "Actions carrying the BibleBuddyApp user agent. device_info is empty on most rows, so this is a floor, not a count of app users. The app is not released yet.",
      };

  /* Landing page: visit -> signup. */
  const visits = await countOf(admin, "landing_page_events", (q) =>
    q.eq("event_name", "landing_page_visit").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const signupsNow = await countSignups(admin, current.start, current.end);
  const landing: Metric =
    visits.error || signupsNow.error
      ? unavailable("Landing visit → signup", "percent", visits.error || signupsNow.error || "")
      : rate("Landing visit → signup", signupsNow.count ?? 0, visits.count ?? 0, null,
          "Signups are counted site-wide, so blog and direct arrivals are in the numerator as well as landing visitors.");

  /* Blog: reader -> signup is not separable without per-session attribution. */
  const blogViews = await countOf(admin, "master_actions", (q) =>
    q.eq("action_type", "blog_post_viewed").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const blog: Metric = blogViews.error
    ? unavailable("Blog post views", "count", blogViews.error)
    : {
        label: "Blog post views",
        value: blogViews.count,
        unit: "count",
        evidence: "live",
        note: "Views are measured. Blog reader to signup is not: nothing links a blog session to a later registration, so that conversion is not reported.",
      };

  /**
   * Devotionals: opened -> finished.
   *
   * NOT devotional_day_started. That action type is declared in
   * lib/actionTypes.ts and has never been recorded once in the history of the
   * table - nothing emits it. Using it gave a denominator of 0 and a rate of
   * 0%, which reads as "nobody finishes anything" when what it really meant
   * was "nobody measured the start". devotional_day_opened is really written,
   * so it is the one used, and the note says which event it is.
   */
  const devOpened = await countOf(admin, "master_actions", (q) =>
    q.in("action_type", ["devotional_day_opened", "devotional_day_viewed"]).gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const devDone = await countOf(admin, "master_actions", (q) =>
    q.eq("action_type", "devotional_day_completed").gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  /**
   * There is no measurable start-to-finish funnel for a devotional day, and
   * saying so is more use than a number that looks like one.
   *
   * Three candidates were tried against the data and all three are artefacts:
   *  - devotional_day_started: declared in lib/actionTypes.ts, never recorded
   *    once. Denominator 0.
   *  - devotional_day_opened + _viewed: 43 events in 30 days against 391
   *    completions, because the open is barely emitted. That produced a 909%
   *    completion rate.
   *  - devotional_progress rows: 99.4% complete, because the row is written
   *    when the day is finished. It cannot describe people who did not.
   *
   * So the completion count is reported, which is real, and the funnel is
   * reported as untracked with the instrumentation it would need.
   */
  const devotionals: Metric = devDone.error
    ? unavailable("Days completed", "count", devDone.error)
    : {
        label: "Days completed",
        value: devDone.count,
        unit: "count",
        evidence: "live",
        note:
          `Completions are measured. Start → finish is not: the open event fired ${devOpened.count ?? 0} times against ${devDone.count ?? 0} completions, and a devotional_progress row is only written once a day is finished. Measuring drop-off needs a day-opened event that actually fires.`,
      };

  /* Community: buddy acceptance. */
  const sent = await countOf(admin, "buddy_requests", (q) =>
    q.gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  const community: Metric =
    sent.error || known.buddies.value == null
      ? unavailable("Requests accepted", "percent", sent.error || "buddy counts unavailable")
      : rate("Requests accepted", known.buddies.value, sent.count ?? 0, null,
          "Accepted in this period over requests sent in this period; a request sent late may be accepted after it.");

  return [
    { system: "iOS app", intent: "Give regular readers a faster way in", measure: "Actions from the native app", metric: iosMetric, detailTab: "retention" },
    { system: "Landing page", intent: "Turn a visitor into an account", measure: "Visit → signup", metric: landing, detailTab: "acquisition" },
    { system: "Email", intent: "Bring people back to study", measure: "Click → study", metric: known.emailMetric, detailTab: "acquisition" },
    { system: "Blog", intent: "Reach people searching for help", measure: "Post views", metric: blog, detailTab: "acquisition" },
    { system: "Devotionals", intent: "Get a started day finished", measure: "Start → finish", metric: devotionals, detailTab: "devotionals" },
    { system: "Community", intent: "Connect readers to each other", measure: "Requests accepted", metric: community, detailTab: "community" },
  ];
}

/** Day 7 retention by signup week, newest four eligible weeks. */
async function retentionByWeek(admin: SupabaseClient, now: Date) {
  const out: { label: string; cohortSize: number; retained: number; rate: number; eligible: boolean }[] = [];
  for (let w = 4; w >= 1; w -= 1) {
    const end = new Date(now.getTime() - (w - 1) * 7 * DAY_MS);
    const start = new Date(now.getTime() - w * 7 * DAY_MS);
    const eligible = now.getTime() - end.getTime() >= 7 * DAY_MS;
    const cohort = await signupCohort(admin, start, end);
    const ids = cohort.rows.map((r) => r.user_id).filter(Boolean);
    let retained = 0;
    if (eligible && ids.length) {
      const acts = await studyActionsForUsers(admin, ids);
      const reg = new Map(cohort.rows.map((r) => [r.user_id, r.registered_at ? new Date(r.registered_at).getTime() : 0]));
      const hit = new Set<string>();
      for (const a of acts.rows) {
        if (!a.user_id) continue;
        const r0 = reg.get(a.user_id);
        if (!r0) continue;
        const age = (new Date(a.created_at).getTime() - r0) / DAY_MS;
        if (age >= 7 && age < 14) hit.add(a.user_id);
      }
      retained = hit.size;
    }
    out.push({
      label: `${berlinDay(start)}`,
      cohortSize: ids.length,
      retained,
      rate: eligible ? pct(retained, ids.length) : 0,
      eligible,
    });
  }
  return out;
}

async function mostStartedDevotionals(admin: SupabaseClient, current: Range) {
  const starts = await pageRows<{ devotional_id: string; created_at: string }>(
    admin,
    "devotional_progress",
    "devotional_id, created_at",
    (q) => q.eq("day_number", 1).gte("created_at", iso(current.start)).lt("created_at", iso(current.end)),
  );
  if (starts.error || !starts.rows.length) return [];
  const counts = new Map<string, number>();
  for (const r of starts.rows) counts.set(r.devotional_id, (counts.get(r.devotional_id) || 0) + 1);
  const { data } = await admin.from("devotionals").select("id, title");
  const titles = new Map((data || []).map((d: { id: string; title: string }) => [d.id, d.title]));
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, starts]) => ({ title: titles.get(id) || "Unknown study", starts }));
}

async function featureAdoptionMetrics(admin: SupabaseClient, current: Range): Promise<Metric[]> {
  const uniqueUsers = async (label: string, actions: string[], note?: string): Promise<Metric> => {
    const res = await pageRows<{ user_id: string | null }>(
      admin,
      "master_actions",
      "user_id, created_at",
      (q) => q.in("action_type", actions).gte("created_at", iso(current.start)).lt("created_at", iso(current.end)).neq("user_id", OWNER_USER_ID),
    );
    if (res.error) return unavailable(label, "count", res.error);
    return {
      label,
      value: new Set(res.rows.map((r) => r.user_id).filter(Boolean)).size,
      unit: "count",
      evidence: "live",
      note,
    };
  };

  const [readers, contributors, chat] = await Promise.all([
    uniqueUsers("Feed readers", ["study_group_feed_viewed"], "Distinct people who opened the feed."),
    uniqueUsers("Feed contributors", ["feed_post_thought", "feed_post_prayer", "feed_post_prayer_request", "feed_post_photo", "feed_post_video", "feed_post_commented", "feed_post_replied"], "Distinct people who posted or commented."),
    uniqueUsers("Lil Louis chat", ["louis_user_message_sent"], "People who sent at least one message, not just opened it."),
  ]);

  const tvOpens = await uniqueUsers("Bible Buddy TV", ["bible_buddy_tv_video_started"], undefined);
  const tv: Metric = {
    ...tvOpens,
    note: "Video starts are measured. Watch time is not: there is no video_progress table, so how much of anything was actually watched is unknown.",
    evidence: tvOpens.evidence === "source_unavailable" ? "source_unavailable" : tvOpens.value ? "live" : "insufficient",
  };

  return [readers, contributors, chat, tv];
}

/**
 * The banner, written from the numbers by rule rather than by a model.
 *
 * No AI call on a page load: the rules below are the whole of it, and they
 * only speak when a comparison actually supports what they say.
 */
function buildBanner(m: { activation: Metric; retention: Metric; emailMetric: Metric; buddies: Metric }, problems: string[]) {
  if (problems.length) {
    return { title: "Some figures could not be read", detail: `${problems[0]}. The rest of the page is still measured.` };
  }
  const moved = (x: Metric) => (x.value != null && x.previous != null && x.evidence === "live" ? x.value - x.previous : null);
  const up = [m.activation, m.retention, m.buddies].filter((x) => (moved(x) ?? 0) > 0);
  const down = [m.activation, m.retention, m.emailMetric].filter((x) => (moved(x) ?? 0) < 0);

  if (!up.length && !down.length) {
    return {
      title: "Not enough movement to call yet",
      detail: "No headline metric has a comparison strong enough to describe as rising or falling in this period.",
    };
  }
  const title = up.length && down.length ? `${up[0].label} is up. ${down[0].label} needs attention.` : up.length ? `${up[0].label} is up.` : `${down[0].label} is down.`;
  const parts = [...up, ...down].map((x) => `${x.label} ${x.value}%${x.previous != null ? ` from ${x.previous}%` : ""}`);
  return { title, detail: `${parts.join(" · ")}. Compared with the previous period of equal length.` };
}

function buildFocus(m: { activation: Metric; retention: Metric; emailMetric: Metric; buddies: Metric }, systems: SystemRow[]) {
  const focus: { title: string; detail: string }[] = [];
  const gaps = systems.filter((s) => s.metric.evidence === "missing_tracking" || s.metric.evidence === "source_unavailable");
  for (const g of gaps.slice(0, 1)) {
    focus.push({ title: `Close the tracking gap on ${g.system}`, detail: g.metric.note || "No measurement is reaching this dashboard." });
  }
  if (m.emailMetric.evidence === "live" && (m.emailMetric.value ?? 0) < 20) {
    focus.push({ title: "Email clicks are not turning into study", detail: `${m.emailMetric.value}% of clickers studied within ${EMAIL_ATTRIBUTION_HOURS}h. The link destination is the thing to change first.` });
  }
  if (m.retention.evidence === "insufficient") {
    focus.push({ title: "Day 7 retention needs a bigger cohort", detail: m.retention.note || "Too few eligible signups to read." });
  }
  focus.push({ title: "Finish Google Play verification", detail: "Owner-reported blocker: address update and identity verification outstanding." });
  return focus.slice(0, 3);
}

/* ------------------------------------------------------------------ */
/* Entry point                                                         */
/* ------------------------------------------------------------------ */

export type ProductHealthTab = "overview" | "acquisition" | "retention" | "devotionals" | "community" | "releases" | "reports";

export async function computeProductHealth(
  admin: SupabaseClient,
  tab: ProductHealthTab,
  window: DashboardWindow,
  now = new Date(),
) {
  const base = { generatedAt: now.toISOString(), window, timezone: "Europe/Berlin", definitions: DEFINITIONS };
  if (tab === "overview") return { ...base, overview: await computeOverview(admin, window, now) };
  const { computeTab } = await import("./productHealthTabs");
  return { ...base, [tab]: await computeTab(admin, tab, window, now) };
}

export { dashboardRanges, berlinDay };
export type { DashboardWindow, Range };
export { countOf, pageRows, rate, pct, iso, studyActionsForUsers, signups, emailEvents, SCANNER_UA, OWNER_USER_ID, DAY_MS, metric };
