import type { SupabaseClient } from "@supabase/supabase-js";
import { readAnalyticsSnapshot, writeAnalyticsSnapshot } from "@/lib/adminAnalyticsSnapshots";
import { BLOG_ARTICLES } from "@/lib/blogContent";
import chapterProgress from "@/data/chapter-blog/progress.json";

/**
 * The owner analytics dashboard (2026-09-21), built from Louis's mockup.
 * One function computes every panel for a window; the API route caches the
 * result as a snapshot so the page opens instantly.
 *
 * Definitions, so the numbers never drift from what the page says:
 * - New users: every account created (profile_stats row) in the window.
 * - Picked a study path: a guest who reached their plan
 *   (bible_year_launch_seen_at) or any non-guest account.
 * - Visitors: distinct browser sessions seen on landing pages or blog posts.
 * - Active: did anything that writes master_actions, a landing/app event, or a
 *   blog view while signed in.
 * All day boundaries are Berlin midnight.
 */

export type DashboardWindow = "today" | "yesterday" | "7d" | "30d";
export const DASHBOARD_WINDOWS: DashboardWindow[] = ["today", "yesterday", "7d", "30d"];

const OWNER_USER_ID = "669d4404-5eee-49ee-a112-2ecbd573e22a";
const DAY_MS = 86_400_000;

// ---------- time (Berlin) ----------

function berlinOffsetMinutes(at: Date) {
  const part = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "shortOffset" })
    .formatToParts(at)
    .find((p) => p.type === "timeZoneName")?.value || "GMT+1";
  const match = part.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return 60;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3] || 0));
}

/** Berlin calendar day (YYYY-MM-DD) of an instant. */
export function berlinDay(at: Date | string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date(at));
}

/** The UTC instant of Berlin midnight at the start of a Berlin day. */
function berlinMidnight(day: string) {
  const guess = new Date(`${day}T00:00:00Z`);
  return new Date(guess.getTime() - berlinOffsetMinutes(guess) * 60_000);
}

function addDays(day: string, n: number) {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

type Range = { start: Date; end: Date };

export function dashboardRanges(window: DashboardWindow, now = new Date()) {
  const today = berlinDay(now);
  const todayStart = berlinMidnight(today);
  let current: Range;
  let previous: Range;
  if (window === "today") {
    current = { start: todayStart, end: now };
    const yStart = berlinMidnight(addDays(today, -1));
    // Same stretch of yesterday, so a morning is not compared with a full day.
    previous = { start: yStart, end: new Date(yStart.getTime() + (now.getTime() - todayStart.getTime())) };
  } else if (window === "yesterday") {
    current = { start: berlinMidnight(addDays(today, -1)), end: todayStart };
    previous = { start: berlinMidnight(addDays(today, -2)), end: current.start };
  } else {
    const days = window === "7d" ? 7 : 30;
    current = { start: berlinMidnight(addDays(today, -(days - 1))), end: now };
    previous = { start: berlinMidnight(addDays(today, -(2 * days - 1))), end: current.start };
  }
  return { current, previous, today };
}

// ---------- data access ----------

async function fetchAll<T>(
  admin: SupabaseClient,
  table: string,
  columns: string,
  // The Supabase query builder's generic types do not survive being passed
  // around like this, so the filter callback is typed loosely on purpose.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply: (q: any) => any,
  orderColumn = "created_at",
): Promise<T[]> {
  // Count first, then pull pages several at a time.
  const head = await apply(admin.from(table).select("*", { count: "exact", head: true }));
  const total = head.count ?? 0;
  if (!total) return [];
  const pages = Math.ceil(total / 1000);
  const out: T[] = [];
  for (let first = 0; first < pages; first += 6) {
    const batch = await Promise.all(
      Array.from({ length: Math.min(6, pages - first) }, (_, i) =>
        apply(admin.from(table).select(columns))
          .order(orderColumn, { ascending: true })
          .range((first + i) * 1000, (first + i) * 1000 + 999),
      ),
    );
    for (const res of batch) {
      if (res.error) throw new Error(`${table}: ${res.error.message}`);
      out.push(...((res.data || []) as T[]));
    }
  }
  return out;
}

async function inBatches<T>(ids: string[], fn: (chunk: string[]) => Promise<T[]>) {
  const out: T[] = [];
  for (let i = 0; i < ids.length; i += 200) out.push(...(await fn(ids.slice(i, i + 200))));
  return out;
}

const within = (iso: string, r: Range) => {
  const t = new Date(iso).getTime();
  return t >= r.start.getTime() && t < r.end.getTime();
};

function change(current: number, previous: number) {
  if (!previous) return current ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

// ---------- classification ----------

export type SourceName =
  | "Threads"
  | "Facebook"
  | "Instagram"
  | "Google"
  | "Pinterest"
  | "Email"
  | "YouTube"
  | "Direct / unknown";
export const SOURCE_ORDER: SourceName[] = ["Threads", "Facebook", "Instagram", "Google", "Pinterest", "Email", "YouTube", "Direct / unknown"];

function sourceFromText(text: string): SourceName {
  const x = text.toLowerCase();
  if (x.includes("threads")) return "Threads";
  if (/facebook|fbclid|\bfb\b|fb\./.test(x)) return "Facebook";
  if (/instagram|igshid|\big\b|closer-ig/.test(x)) return "Instagram";
  if (/pinterest|pin\.it/.test(x)) return "Pinterest";
  if (/youtube|youtu\.be/.test(x)) return "YouTube";
  if (/utm_source=email|[?&]sc=|mail\.google|outlook\.|mail\.yahoo|\bemail\b|newsletter|systeme/.test(x)) return "Email";
  if (/google|bing|duckduckgo|yahoo|gclid/.test(x)) return "Google";
  return "Direct / unknown";
}

function sessionSource(e: { referrer?: string | null; page_path?: string | null; source?: string | null }): SourceName {
  // Campaign tags on the link beat the referrer: a Threads link opened inside
  // Facebook's browser is still a Threads click.
  const path = (e.page_path || "").toLowerCase();
  const tagged = path.match(/utm_source=([^&]+)/)?.[1] || path.match(/[?&]src=([^&]+)/)?.[1] || "";
  if (tagged) {
    const s = sourceFromText(tagged);
    if (s !== "Direct / unknown") return s;
  }
  const byRef = sourceFromText(`${e.referrer || ""}`);
  if (byRef !== "Direct / unknown") return byRef;
  return sourceFromText(`${e.source || ""} ${path}`);
}

function userSource(p: ProfileRow): SourceName {
  const direct = sourceFromText(`${p.signup_source || ""} ${p.signup_utm_source || ""}`);
  if (direct !== "Direct / unknown") return direct;
  // "Blog" is where they converted, not where they came from.
  const first = sourceFromText(`${p.signup_first_touch_source || ""} ${p.signup_referrer_url || ""} ${p.signup_source_detail || ""}`);
  return first;
}

// Threads links land on the homepage with a tag, so they count as Homepage.
type LandingKind = "Homepage" | "Blog post" | "Proverbs page" | "Bible reader" | "Other page";
function pageKind(path: string | null | undefined): LandingKind {
  const x = (path || "").toLowerCase().split("?")[0];
  if (/^\/(blog|bible-study-hub|bible-study-tips)\//.test(x)) return "Blog post";
  if (/^\/events\//.test(x)) return "Proverbs page";
  if (/^\/bible/.test(x)) return "Bible reader";
  if (x === "/" || x === "") return "Homepage";
  return "Other page";
}

// ---------- rows ----------

type ProfileRow = {
  user_id: string;
  created_at: string;
  account_type: string | null;
  bible_year_launch_seen_at: string | null;
  preferred_study_mode: string | null;
  signup_source: string | null;
  signup_utm_source: string | null;
  signup_first_touch_source: string | null;
  signup_referrer_url: string | null;
  signup_source_detail: string | null;
  signup_landing_session_id: string | null;
  registered_at: string | null;
  converted_from_guest_at: string | null;
};
type EventRow = {
  session_id: string | null;
  user_id: string | null;
  event_name: string;
  referrer: string | null;
  page_path: string | null;
  source: string | null;
  created_at: string;
};
type BlogViewRow = { session_id: string | null; user_id: string | null; article_slug: string; referrer: string | null; created_at: string };
type ActionRow = { user_id: string | null; action_type: string; action_label?: string | null; created_at: string };

const pickedAPath = (p: ProfileRow) =>
  Boolean(p.bible_year_launch_seen_at) ||
  Boolean(p.registered_at || p.converted_from_guest_at) ||
  (p.account_type !== null && p.account_type !== "guest");

/**
 * Every account, straight from auth (2026-09-25, Louis: "it's over 6,400,
 * something is wrong").
 *
 * The rest of this page counts profile_stats rows, but ~720 accounts have no
 * profile_stats row at all - 712 of them real email signups - so counting that
 * table understated the user base by hundreds. auth.users is the only
 * authoritative list, and it matches the group's own member count.
 *
 * Guests are Supabase anonymous users; everyone else has an email, so the two
 * add up to the total exactly.
 *
 * CACHED FOR 30 MINUTES (2026-09-26, Louis: "it don't need to load new every
 * time"). Walking auth is ~15s for 7 pages, and the number barely moves, so it
 * is read from a small file in the snapshot bucket instead. Only the first
 * caller after the cache expires pays for the walk; the recent-signup
 * timestamps ride along so the "+N new" pill stays auth-sourced for any
 * window without a second pass. A warm function keeps it in memory too.
 */
const AUTH_COUNT_CACHE_KEY = "auth-accounts";
const AUTH_COUNT_TTL_MS = 30 * 60 * 1000;
/** Covers the widest window the card reports (30 days). */
const AUTH_RECENT_WINDOW_MS = 31 * 24 * 60 * 60 * 1000;

type AuthAccountCounts = {
  total: number;
  guests: number;
  withEmail: number;
  /** ISO creation times for accounts made in the last ~31 days. */
  recentCreatedAt: string[];
  snapshotAt: string;
};

let authCountMemo: AuthAccountCounts | null = null;

const authCountIsFresh = (counts: AuthAccountCounts | null) =>
  Boolean(counts && Date.now() - Date.parse(counts.snapshotAt) < AUTH_COUNT_TTL_MS);

async function walkAuthAccounts(admin: SupabaseClient): Promise<AuthAccountCounts | null> {
  try {
    const recentSince = Date.now() - AUTH_RECENT_WINDOW_MS;
    let total = 0;
    let guests = 0;
    let withEmail = 0;
    const recentCreatedAt: string[] = [];
    for (let page = 1; page <= 60; page += 1) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) throw new Error(error.message);
      const users = data?.users || [];
      for (const user of users) {
        total += 1;
        if (user.is_anonymous) guests += 1;
        else if (user.email) withEmail += 1;
        if (user.created_at && Date.parse(user.created_at) >= recentSince) recentCreatedAt.push(user.created_at);
      }
      if (users.length < 1000) break;
    }
    return { total, guests, withEmail, recentCreatedAt, snapshotAt: new Date().toISOString() };
  } catch (error) {
    console.error("[DASHBOARD] auth account walk failed:", error instanceof Error ? error.message : error);
    return null;
  }
}

async function countAuthAccounts(admin: SupabaseClient, current: { start: Date; end: Date }) {
  let counts = authCountIsFresh(authCountMemo) ? authCountMemo : null;

  if (!counts) {
    const stored = (await readAnalyticsSnapshot(admin, AUTH_COUNT_CACHE_KEY)) as AuthAccountCounts | null;
    if (authCountIsFresh(stored)) {
      counts = stored;
      authCountMemo = stored;
    } else {
      const walked = await walkAuthAccounts(admin);
      if (walked) {
        counts = walked;
        authCountMemo = walked;
        await writeAnalyticsSnapshot(admin, AUTH_COUNT_CACHE_KEY, walked as unknown as Record<string, unknown>);
      } else {
        // Auth unreachable: a number from earlier beats no card at all.
        counts = stored || authCountMemo;
      }
    }
  }

  if (!counts) return null;
  const newInWindow = counts.recentCreatedAt.filter((iso) => {
    const at = Date.parse(iso);
    return at >= current.start.getTime() && at < current.end.getTime();
  }).length;
  return { total: counts.total, guests: counts.guests, withEmail: counts.withEmail, newInWindow };
}

// ---------- main ----------

export async function computeDashboard(admin: SupabaseClient, window: DashboardWindow) {
  const now = new Date();
  const { current, previous, today } = dashboardRanges(window, now);
  const earliest = previous.start;
  const sinceIso = earliest.toISOString();
  const thirtyAgo = berlinMidnight(addDays(today, -29));
  const sixtyAgo = berlinMidnight(addDays(today, -59));
  const cohortStart = berlinMidnight(addDays(today, -37)); // retention cohort, users 7-37 days old
  const widest = new Date(Math.min(earliest.getTime(), sixtyAgo.getTime(), cohortStart.getTime())).toISOString();

  const profileCols =
    "user_id, created_at, account_type, bible_year_launch_seen_at, preferred_study_mode, signup_source, signup_utm_source, signup_first_touch_source, signup_referrer_url, signup_source_detail, signup_landing_session_id, registered_at, converted_from_guest_at";

  const [profilesAll, events, blogViews, promoEvents, groupPosts, proverbsMembers, emailRowsAll, lifetimeCounts] = await Promise.all([
    fetchAll<ProfileRow>(admin, "profile_stats", profileCols, (q) => q.gte("created_at", widest)),
    fetchAll<EventRow>(admin, "landing_page_events", "session_id, user_id, event_name, referrer, page_path, source, created_at", (q) => q.gte("created_at", sinceIso)),
    fetchAll<BlogViewRow>(admin, "blog_page_views", "session_id, user_id, article_slug, referrer, created_at", (q) => q.gte("created_at", sinceIso)),
    fetchAll<{ event_type: string; created_at: string }>(admin, "blog_promo_events", "event_type, created_at", (q) => q.gte("created_at", sinceIso)),
    fetchAll<{ created_at: string; user_id: string | null }>(admin, "group_posts", "created_at, user_id", (q) => q.gte("created_at", sinceIso).is("parent_post_id", null)),
    fetchAll<{ user_id: string; joined_at: string }>(admin, "community_event_members", "user_id, joined_at", (q) => q.eq("event_slug", "wisdom-of-proverbs"), "joined_at"),
    admin.from("email_campaign_stats").select("id, name, sent_at, recipients, opens, clicks, site_visits").not("sent_at", "is", null).order("sent_at", { ascending: false }).limit(24),
    // Lifetime account counts (2026-09-25, Louis: a total users card at the
    // top). Everything else on this page is window-scoped; these are all-time,
    // so they are counted server-side rather than derived from `profiles`,
    // which only reaches back as far as the comparison window needs.
    countAuthAccounts(admin, current),
  ]);

  const profiles = profilesAll.filter((p) => p.user_id !== OWNER_USER_ID);
  const inCur = (iso: string) => within(iso, current);
  const inPrev = (iso: string) => within(iso, previous);

  // ----- top cards -----
  const newCur = profiles.filter((p) => inCur(p.created_at));
  const newPrev = profiles.filter((p) => inPrev(p.created_at));
  const pickedCur = newCur.filter(pickedAPath);
  const pickedPrev = newPrev.filter(pickedAPath);

  const sessionsIn = (r: Range) => {
    const s = new Set<string>();
    for (const e of events) if (e.session_id && within(e.created_at, r)) s.add(e.session_id);
    for (const v of blogViews) if (v.session_id && within(v.created_at, r)) s.add(v.session_id);
    return s;
  };
  const visitorsCur = sessionsIn(current).size;
  const visitorsPrev = sessionsIn(previous).size;
  const blogCur = blogViews.filter((v) => inCur(v.created_at));
  const blogPrevCount = blogViews.filter((v) => inPrev(v.created_at)).length;
  const rate = (a: number, b: number) => (b ? Math.round((a / b) * 1000) / 10 : 0);

  // Sparkline points: hourly for single days, daily otherwise.
  const bucketsFor = () => {
    if (window === "today" || window === "yesterday") {
      return Array.from({ length: 24 }, (_, h) => ({
        start: new Date(current.start.getTime() + h * 3_600_000),
        end: new Date(current.start.getTime() + (h + 1) * 3_600_000),
      }));
    }
    const days = window === "7d" ? 7 : 30;
    const firstDay = berlinDay(current.start);
    return Array.from({ length: days }, (_, i) => ({ start: berlinMidnight(addDays(firstDay, i)), end: berlinMidnight(addDays(firstDay, i + 1)) }));
  };
  const buckets = bucketsFor();
  const spark = (times: string[]) =>
    buckets.map((b) => times.filter((t) => within(t, b)).length);
  const sessionSpark = buckets.map((b) => sessionsIn(b).size);

  const topCards = {
    newUsers: { value: newCur.length, change: change(newCur.length, newPrev.length), spark: spark(newCur.map((p) => p.created_at)) },
    visitors: { value: visitorsCur, change: change(visitorsCur, visitorsPrev), spark: sessionSpark },
    blogViews: { value: blogCur.length, change: change(blogCur.length, blogPrevCount), spark: spark(blogCur.map((v) => v.created_at)) },
    signupRate: {
      value: rate(newCur.length, visitorsCur),
      change: Math.round((rate(newCur.length, visitorsCur) - rate(newPrev.length, visitorsPrev)) * 10) / 10,
      spark: buckets.map((b, i) => {
        const v = sessionSpark[i];
        const n = newCur.filter((p) => within(p.created_at, b)).length;
        return v ? Math.round((n / v) * 1000) / 10 : 0;
      }),
    },
  };

  // ----- new users over time (always 30 days) -----
  const overTime = Array.from({ length: 30 }, (_, i) => {
    const day = addDays(today, -29 + i);
    return { day, value: profiles.filter((p) => berlinDay(p.created_at) === day).length };
  });
  const last30 = profiles.filter((p) => new Date(p.created_at) >= thirtyAgo).length;
  const prev30 = profiles.filter((p) => new Date(p.created_at) >= sixtyAgo && new Date(p.created_at) < thirtyAgo).length;

  // ----- activity (for next-day return and retention) -----
  const cohort = profiles.filter((p) => new Date(p.created_at) >= cohortStart && new Date(p.created_at) < berlinMidnight(addDays(today, -7)));
  const activityUserIds = Array.from(new Set([...newCur.map((p) => p.user_id), ...cohort.map((p) => p.user_id)]));
  const activityFrom = new Date(Math.min(current.start.getTime(), cohortStart.getTime())).toISOString();
  const actions = await inBatches<ActionRow>(activityUserIds, async (chunk) =>
    fetchAll<ActionRow>(admin, "master_actions", "user_id, action_type, action_label, created_at", (q) => q.in("user_id", chunk).gte("created_at", activityFrom)),
  );
  const devotionalActions = actions.filter((a) => a.action_type === "devotional_opened" || a.action_type === "devotional_day_opened");
  const activeDays = new Map<string, Set<string>>();
  const markActive = (userId: string | null, iso: string) => {
    if (!userId) return;
    const set = activeDays.get(userId) || new Set<string>();
    set.add(berlinDay(iso));
    activeDays.set(userId, set);
  };
  actions.forEach((a) => markActive(a.user_id, a.created_at));
  events.forEach((e) => markActive(e.user_id, e.created_at));
  blogViews.forEach((v) => markActive(v.user_id, v.created_at));

  const cameBackNextDay = (p: ProfileRow) => activeDays.get(p.user_id)?.has(addDays(berlinDay(p.created_at), 1)) || false;
  // Only users whose "next day" has already happened can count.
  const eligibleNextDay = newCur.filter((p) => addDays(berlinDay(p.created_at), 1) <= today);
  const returnedNextDay = eligibleNextDay.filter(cameBackNextDay).length;

  // ----- funnel -----
  const funnel = [
    { label: "Visitors", value: visitorsCur },
    { label: "Created account", value: newCur.length },
    { label: "Picked a study path", value: pickedCur.length },
    { label: "Returned next day", value: returnedNextDay },
  ];

  // ----- study paths -----
  const modeCount = { bible_year: 0, bible: 0, devotional: 0 };
  for (const p of pickedCur) {
    if (p.preferred_study_mode === "devotional") modeCount.devotional += 1;
    else if (p.preferred_study_mode === "bible") modeCount.bible += 1;
    else modeCount.bible_year += 1;
  }
  // Which devotional: the first devotional they opened. Its title is the
  // action_label on master_actions (devotional_progress is not written).
  const devotionalUsers = new Set(pickedCur.filter((p) => p.preferred_study_mode === "devotional").map((p) => p.user_id));
  const firstDevotional = new Map<string, string>();
  for (const a of devotionalActions.sort((x, y) => (x.created_at < y.created_at ? -1 : 1))) {
    if (a.user_id && devotionalUsers.has(a.user_id) && !firstDevotional.has(a.user_id) && a.action_label) {
      firstDevotional.set(a.user_id, a.action_label);
    }
  }
  const devotionalBreakdown: Record<string, number> = {};
  for (const title of firstDevotional.values()) devotionalBreakdown[title] = (devotionalBreakdown[title] || 0) + 1;
  const notStarted = devotionalUsers.size - firstDevotional.size;
  if (notStarted > 0) devotionalBreakdown["Picked, not opened yet"] = notStarted;

  // ----- traffic sources -----
  const firstEventBySession = new Map<string, { referrer: string | null; page_path: string | null; source: string | null; created_at: string }>();
  const sessionEvents = [
    ...events.filter((e) => inCur(e.created_at)).map((e) => ({ s: e.session_id, referrer: e.referrer, page_path: e.page_path, source: e.source, created_at: e.created_at })),
    ...blogCur.map((v) => ({ s: v.session_id, referrer: v.referrer, page_path: `/blog/${v.article_slug.replace(/^\/?blog\//, "").replace(/^\//, "")}`, source: null, created_at: v.created_at })),
  ].sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
  for (const e of sessionEvents) if (e.s && !firstEventBySession.has(e.s)) firstEventBySession.set(e.s, e);
  const sourceRows = new Map<SourceName, { visitors: number; newUsers: number }>();
  SOURCE_ORDER.forEach((s) => sourceRows.set(s, { visitors: 0, newUsers: 0 }));
  for (const e of firstEventBySession.values()) sourceRows.get(sessionSource(e))!.visitors += 1;
  for (const p of newCur) sourceRows.get(userSource(p))!.newUsers += 1;
  const trafficSources = SOURCE_ORDER.map((name) => {
    const r = sourceRows.get(name)!;
    // Email and search clicks often arrive without a referrer, so their visits
    // are undercounted; a rate over 100% would be nonsense, so show none.
    return { source: name, visitors: r.visitors, newUsers: r.newUsers, rate: r.newUsers > r.visitors ? null : rate(r.newUsers, r.visitors) };
  }).sort((a, b) => b.newUsers - a.newUsers || b.visitors - a.visitors);

  // First landing page, by new users.
  const landingBySession = new Map<string, string | null>();
  for (const [s, e] of firstEventBySession) landingBySession.set(s, e.page_path);
  const landingCounts: Record<LandingKind, number> = { Homepage: 0, "Blog post": 0, "Proverbs page": 0, "Bible reader": 0, "Other page": 0 };
  let landingKnown = 0;
  for (const p of newCur) {
    const recorded = (p.signup_source_detail || "").match(/(?:^| )page:(\/\S*)/)?.[1];
    const blogSlug = (p.signup_source_detail || "").match(/^blog:([^:]+)/)?.[1];
    const path = recorded || (blogSlug ? `/blog/${blogSlug}` : null) || (p.signup_landing_session_id ? landingBySession.get(p.signup_landing_session_id) ?? null : null);
    if (!path) continue;
    landingCounts[pageKind(path)] += 1;
    landingKnown += 1;
  }
  const firstLandingPages = (Object.keys(landingCounts) as LandingKind[])
    .filter((k) => landingCounts[k] > 0 || k === "Homepage" || k === "Blog post")
    .map((k) => ({ page: k, newUsers: landingCounts[k], percent: rate(landingCounts[k], landingKnown) }));

  // ----- returning people -----
  const activeToday = new Set<string>();
  const todayStart = berlinMidnight(today);
  const todayActions = await fetchAll<{ user_id: string | null; created_at: string }>(admin, "master_actions", "user_id, created_at", (q) =>
    q.gte("created_at", todayStart.toISOString()).not("user_id", "is", null),
  );
  todayActions.forEach((a) => a.user_id && a.user_id !== OWNER_USER_ID && activeToday.add(a.user_id));
  events.forEach((e) => e.user_id && e.user_id !== OWNER_USER_ID && new Date(e.created_at) >= todayStart && activeToday.add(e.user_id));
  blogViews.forEach((v) => v.user_id && v.user_id !== OWNER_USER_ID && new Date(v.created_at) >= todayStart && activeToday.add(v.user_id));

  const retention = Array.from({ length: 8 }, (_, day) => {
    const active = cohort.filter((p) => activeDays.get(p.user_id)?.has(addDays(berlinDay(p.created_at), day))).length;
    return { day, percent: rate(active, cohort.length) };
  });
  const activeAfter7 = cohort.filter((p) => {
    const start = addDays(berlinDay(p.created_at), 7);
    return Array.from(activeDays.get(p.user_id) || []).some((d) => d >= start);
  }).length;

  // ----- blog -----
  const titleBySlug = new Map(BLOG_ARTICLES.map((a) => [a.slug, a.title]));
  const slugOf = (raw: string) => raw.split("?")[0].replace(/\/$/, "").split("/").pop() || raw;
  const postCounts: Record<string, number> = {};
  for (const v of blogCur) postCounts[slugOf(v.article_slug)] = (postCounts[slugOf(v.article_slug)] || 0) + 1;
  const topPosts = Object.entries(postCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([slug, views]) => ({ slug, title: titleBySlug.get(slug) || slug.replace(/-/g, " "), views }));
  const blogSourceCounts: Record<string, number> = {};
  for (const v of blogCur) {
    const s = sourceFromText(v.referrer || "");
    const label = s === "Direct / unknown" ? (/(mybiblebuddy)/.test(v.referrer || "") ? "Inside the site" : "Direct / unknown") : s;
    blogSourceCounts[label] = (blogSourceCounts[label] || 0) + 1;
  }
  const blogSources = Object.entries(blogSourceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([source, views]) => ({ source, percent: rate(views, blogCur.length) }));
  const newUsersFromBlog = newCur.filter((p) => {
    const d = p.signup_source_detail || "";
    return /^blog:/.test(d) || /(?:^| )page:\/(blog|bible-study-hub|bible-study-tips)\//.test(d) || (p.signup_source || "").toLowerCase() === "blog";
  }).length;
  const promoImpressions = promoEvents.filter((e) => e.event_type === "impression" && inCur(e.created_at)).length;
  const promoClicks = promoEvents.filter((e) => e.event_type === "click" && inCur(e.created_at)).length;
  // Extra blog detail: how many different readers, how views ran day by day,
  // how many posts went out, and how many views each post is averaging.
  const blogReaders = new Set(blogCur.map((v) => v.user_id || v.session_id || v.created_at)).size;
  const blogReadersPrev = new Set(
    blogViews.filter((v) => inPrev(v.created_at)).map((v) => v.user_id || v.session_id || v.created_at),
  ).size;
  const blogSpark = spark(blogCur.map((v) => v.created_at));
  const publishedInWindow = BLOG_ARTICLES.filter((a) => a.publishedAt && within(new Date(a.publishedAt).toISOString(), current)).length;
  const postsWithViews = Object.keys(postCounts).length;

  // ----- popular activities -----
  const actionCounts: Record<string, number> = {};
  const windowActionRows = await fetchAll<ActionRow>(admin, "master_actions", "user_id, action_type, created_at", (q) =>
    q.gte("created_at", current.start.toISOString()).lt("created_at", current.end.toISOString()).neq("user_id", OWNER_USER_ID),
  );
  for (const a of windowActionRows) actionCounts[a.action_type] = (actionCounts[a.action_type] || 0) + 1;
  const eventCount = (...names: string[]) => events.filter((e) => inCur(e.created_at) && names.includes(e.event_name)).length;
  const action = (...types: string[]) => types.reduce((s, t) => s + (actionCounts[t] || 0), 0);
  const popularActivities = [
    { label: "Opened a Bible in One Year day", value: action("bible_in_one_year_day_viewed") },
    { label: "Finished a reading", value: action("bible_in_one_year_reading_completed", "chapter_completed") },
    { label: "Took trivia", value: action("bible_in_one_year_trivia_completed", "trivia_chapter_completed", "trivia_started") },
    { label: "Wrote a reflection", value: action("bible_in_one_year_reflection_completed") },
    { label: "Opened a devotional day", value: action("devotional_day_opened", "devotional_opened") },
    { label: "Opened Verse of the Day", value: eventCount("votd_card_click", "votd_breakdown_open", "votd_page_view") },
    { label: "Read study notes", value: action("study_notes_viewed") },
    { label: "Posted in the group", value: groupPosts.filter((g) => inCur(g.created_at) && g.user_id !== OWNER_USER_ID).length },
    { label: "Joined Proverbs", value: proverbsMembers.filter((m) => inCur(m.joined_at)).length },
  ]
    .filter((a) => a.value > 0)
    .sort((a, b) => b.value - a.value);

  // ----- email -----
  const lastEmail = (emailRowsAll.data || [])[0] as
    | { name: string; sent_at: string; recipients: number | null; opens: number | null; clicks: number | null }
    | undefined;
  let email: null | { subject: string; sentAt: string; sent: number; opens: number; clicks: number; newUsers: number } = null;
  if (lastEmail) {
    const sentAt = new Date(lastEmail.sent_at);
    const until = new Date(sentAt.getTime() + 7 * DAY_MS);
    const { data: emailSignups } = await admin
      .from("profile_stats")
      .select("user_id, signup_source, signup_utm_source, signup_source_detail")
      .gte("created_at", sentAt.toISOString())
      .lt("created_at", until.toISOString())
      .limit(5000);
    email = {
      subject: lastEmail.name,
      sentAt: lastEmail.sent_at,
      sent: lastEmail.recipients || 0,
      opens: lastEmail.opens || 0,
      clicks: lastEmail.clicks || 0,
      newUsers: (emailSignups || []).filter((p: { signup_source: string | null; signup_utm_source: string | null; signup_source_detail: string | null }) =>
        sourceFromText(`${p.signup_source || ""} ${p.signup_utm_source || ""} ${p.signup_source_detail || ""}`) === "Email",
      ).length,
    };
  }

  // Every send, newest first, so a month's emails can be compared side by side.
  const emailHistory = (emailRowsAll.data || []) as Array<{
    id: string;
    name: string;
    sent_at: string;
    recipients: number | null;
    opens: number | null;
    clicks: number | null;
    site_visits: number | null;
  }>;
  const emails = {
    sends: emailHistory.map((row) => ({
      id: row.id,
      subject: row.name,
      sentAt: row.sent_at,
      sent: row.recipients || 0,
      opens: row.opens || 0,
      clicks: row.clicks || 0,
      visits: row.site_visits || 0,
      openRate: rate(row.opens || 0, row.recipients || 0),
      clickRate: rate(row.clicks || 0, row.recipients || 0),
    })),
    last30: (() => {
      const since = berlinMidnight(addDays(today, -29)).getTime();
      const recent = emailHistory.filter((r) => new Date(r.sent_at).getTime() >= since);
      const sent = recent.reduce((n, r) => n + (r.recipients || 0), 0);
      const opens = recent.reduce((n, r) => n + (r.opens || 0), 0);
      const clicks = recent.reduce((n, r) => n + (r.clicks || 0), 0);
      const visits = recent.reduce((n, r) => n + (r.site_visits || 0), 0);
      return { count: recent.length, sent, opens, clicks, visits, openRate: rate(opens, sent), clickRate: rate(clicks, sent) };
    })(),
  };

  // ----- community -----
  const memberIds = new Set(proverbsMembers.map((m) => m.user_id));
  const joinClickers = new Set<string>();
  for (const e of events) {
    if (!inCur(e.created_at)) continue;
    if (!["wisdom_proverbs_popup_join_clicked", "community_event_join_click"].includes(e.event_name)) continue;
    if (e.user_id && memberIds.has(e.user_id)) continue;
    joinClickers.add(e.user_id || e.session_id || `${e.created_at}`);
  }
  const community = {
    proverbsTotal: proverbsMembers.length,
    proverbsJoined: proverbsMembers.filter((m) => inCur(m.joined_at)).length,
    incompleteJoins: joinClickers.size,
    groupPosts: groupPosts.filter((g) => inCur(g.created_at)).length,
  };

  // ----- printed books (Wisdom of Proverbs) -----
  // From the landing-analytics events the books page, the event-page banner
  // and the book popup send (lib/wisdomOfProverbsProducts.ts). "People" =
  // distinct signed-in user, else session, else one per event.
  const who = (e: EventRow) => e.user_id || e.session_id || `${e.event_name}:${e.created_at}`;
  const bookStats = (r: Range) => {
    const inR = events.filter((e) => within(e.created_at, r));
    const count = (name: string) => inR.filter((e) => e.event_name === name).length;
    const people = (name: string) => new Set(inR.filter((e) => e.event_name === name).map(who)).size;
    const amazonNames = ["wisdom_hardcover_amazon_clicked", "wisdom_paperback_amazon_clicked", "wisdom_journal_amazon_clicked"];
    return {
      pageViews: count("wisdom_book_page_viewed"),
      pageVisitors: people("wisdom_book_page_viewed"),
      hardcoverClicks: count("wisdom_hardcover_amazon_clicked"),
      hardcoverPeople: people("wisdom_hardcover_amazon_clicked"),
      paperbackClicks: count("wisdom_paperback_amazon_clicked"),
      paperbackPeople: people("wisdom_paperback_amazon_clicked"),
      journalClicks: count("wisdom_journal_amazon_clicked"),
      amazonPeople: new Set(inR.filter((e) => amazonNames.includes(e.event_name)).map(who)).size,
      bannerViews: count("wisdom_book_banner_viewed"),
      bannerClicks: count("wisdom_book_banner_clicked"),
      popupViews: count("wisdom_book_popup_impression"),
      popupClicks: count("wisdom_book_popup_clicked"),
      popupDismissed: count("wisdom_book_popup_dismissed"),
    };
  };
  const booksCur = bookStats(current);
  const booksPrev = bookStats(previous);
  const bookSourceCounts = new Map<string, number>();
  for (const e of events) {
    if (e.event_name !== "wisdom_book_page_viewed" || !inCur(e.created_at)) continue;
    const label =
      e.source === "proverbs_event_page" ? "Proverbs event page"
      : e.source === "book_popup" ? "Book popup"
      : e.source && e.source !== "Direct" ? e.source
      : "Direct / unknown";
    bookSourceCounts.set(label, (bookSourceCounts.get(label) || 0) + 1);
  }
  const books = {
    ...booksCur,
    pageViewsChange: change(booksCur.pageViews, booksPrev.pageViews),
    amazonClicks: booksCur.hardcoverClicks + booksCur.paperbackClicks + booksCur.journalClicks,
    amazonClicksChange: change(
      booksCur.hardcoverClicks + booksCur.paperbackClicks + booksCur.journalClicks,
      booksPrev.hardcoverClicks + booksPrev.paperbackClicks + booksPrev.journalClicks,
    ),
    clickRate: rate(booksCur.amazonPeople, booksCur.pageVisitors),
    sources: [...bookSourceCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([source, views]) => ({ source, views })),
  };

  // ----- content -----
  const chapters =(chapterProgress as { chapters: Record<string, { status: string }>; nextChapter?: string; paused?: boolean }).chapters;
  const content = {
    published: Object.values(chapters).filter((c) => c.status === "published" || c.status === "committed").length,
    total: 1189,
    next: (chapterProgress as { nextChapter?: string }).nextChapter || null,
  };

  return {
    window,
    range: { start: current.start.toISOString(), end: current.end.toISOString() },
    generatedAt: now.toISOString(),
    topCards,
    // All-time, minus Louis's own account, with the window's new signups as
    // context so the card says both "how many" and "still growing?".
    // Louis's own account is dropped from the total and from `registered`,
    // which is the one he is in. Null when auth could not be read.
    totalUsers: lifetimeCounts
      ? {
          value: Math.max(0, lifetimeCounts.total - 1),
          registered: Math.max(0, lifetimeCounts.withEmail - 1),
          guests: lifetimeCounts.guests,
          newInWindow: lifetimeCounts.newInWindow,
        }
      : null,
    startedStudying: { value: pickedCur.length, change: change(pickedCur.length, pickedPrev.length) },
    newUsersOverTime: { points: overTime, total: last30, change: change(last30, prev30) },
    funnel,
    studyPaths: {
      total: pickedCur.length,
      paths: [
        { label: "Bible in One Year", value: modeCount.bible_year },
        { label: "Just the Bible", value: modeCount.bible },
        { label: "A devotional", value: modeCount.devotional },
      ],
      devotionals: Object.entries(devotionalBreakdown)
        .sort((a, b) => b[1] - a[1])
        .map(([title, value]) => ({ title, value })),
    },
    trafficSources,
    firstLandingPages,
    returning: {
      activeToday: activeToday.size,
      nextDayReturn: rate(returnedNextDay, eligibleNextDay.length),
      activeAfter7: rate(activeAfter7, cohort.length),
      retention,
      cohortSize: cohort.length,
    },
    blog: {
      views: blogCur.length,
      change: change(blogCur.length, blogPrevCount),
      newUsers: newUsersFromBlog,
      topPosts,
      sources: blogSources,
      promo: { impressions: promoImpressions, clicks: promoClicks, ctr: rate(promoClicks, promoImpressions) },
      readers: blogReaders,
      readersChange: change(blogReaders, blogReadersPrev),
      spark: blogSpark,
      published: publishedInWindow,
      totalPosts: BLOG_ARTICLES.length,
      postsRead: postsWithViews,
      viewsPerReader: blogReaders ? Math.round((blogCur.length / blogReaders) * 10) / 10 : 0,
    },
    popularActivities,
    email,
    emails,
    community,
    books,
    content,
  };
}

export type DashboardData = Awaited<ReturnType<typeof computeDashboard>>;
