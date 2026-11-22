/**
 * The Bible Buddy Match tab on /admin/analytics (Louis, 2026-11-22: "my
 * analytics page needs to be simple: how many different people are playing a
 * day, 7 days, 30 days, how many boards are finished... go deep, I want to
 * track everything on your side").
 *
 * Two halves:
 *   - the headline: different players and boards finished today, in the last
 *     7 days, the last 30 days and since launch (fixed windows, the same
 *     whatever period the dashboard is set to), plus where players are on the
 *     trail right now;
 *   - the detail, since launch and for the chosen period: every board, where
 *     people play, where they came from, power-ups, hints, time played.
 *
 * Sources: landing_page_events, match_* (lib/match/track.ts), and
 * match_progress (each player's furthest board, kept in step by the game).
 * "Players" are distinct accounts. The summarising half is pure so it can be
 * checked without a database.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export type MatchRange = { start: Date; end: Date };
export type MatchEventRow = { event_name: string; user_id: string | null; metadata: Record<string, unknown> | null; created_at: string };
export type MatchProgressRow = { user_id: string; unlocked: number; done: string[] | null };

export const MATCH_REPORT_EVENTS = [
  "match_opened",
  "match_board_started",
  "match_board_won",
  "match_board_lost",
  "match_board_left",
  "match_power_made",
  "match_power_used",
  "match_hint",
  "match_session",
];

export type MatchHeadline = { label: string; today: number; week: number; month: number; allTime: number; hint: string };
export type MatchFigure = { label: string; hint: string; allTime: number; period: number; unit?: "people" | "times" | "percent" | "minutes" };
/** One player, for the most-active list (Louis, 2026-11-22). */
export type ActivePlayer = { userId: string; name: string; a: number; b: number; c: number; last: string };

/**
 * Players ranked by how much they have played: for Match a = boards won,
 * b = boards played, c = minutes. Names filled in by the loader.
 */
export function rankPlayers(
  rows: Array<{ event_name: string; user_id: string | null; metadata: Record<string, unknown> | null; created_at: string }>,
  score: { a: string; b: string; c?: { event: string; key: string; per?: number } },
): ActivePlayer[] {
  const by = new Map<string, ActivePlayer>();
  for (const r of rows) {
    if (!r.user_id) continue;
    const p = by.get(r.user_id) || { userId: r.user_id, name: "", a: 0, b: 0, c: 0, last: r.created_at };
    if (r.event_name === score.a) p.a += 1;
    if (r.event_name === score.b) p.b += 1;
    if (score.c && r.event_name === score.c.event) p.c += (Number(r.metadata?.[score.c.key]) || 0) / (score.c.per || 1);
    if (r.created_at > p.last) p.last = r.created_at;
    by.set(r.user_id, p);
  }
  return [...by.values()].map((p) => ({ ...p, c: Math.round(p.c) })).sort((x, y) => y.a - x.a || y.b - x.b || y.c - x.c || (y.last > x.last ? 1 : -1));
}

export type MatchGameReport = {
  launched: string;
  headline: MatchHeadline[];
  /** Most active first: a = boards won, b = boards played, c = minutes. */
  players: ActivePlayer[];
  /** Players whose furthest board is each board, now (match_progress). */
  onBoard: Array<{ label: string; players: number }>;
  finishedEverything: number;
  sections: Array<{ key: string; icon: string; title: string; line: string; figures: MatchFigure[] }>;
  breakdowns: Array<{ title: string; rows: Array<{ label: string; allTime: number; period: number }> }>;
};

const LAUNCHED = "22 November 2026";
const DAY = 24 * 3_600_000;
const time = (iso: string) => Date.parse(iso);
const inRange = (iso: string, r: MatchRange) => {
  const t = time(iso);
  return t >= r.start.getTime() && t < r.end.getTime();
};
const meta = (row: MatchEventRow, key: string) => (row.metadata ? row.metadata[key] : undefined);
const str = (v: unknown) => (v === undefined || v === null || v === "" ? "" : String(v));

/** Distinct accounts among rows. */
export const people = (rows: MatchEventRow[]) => new Set(rows.map((r) => r.user_id).filter(Boolean) as string[]).size;

/**
 * One headline row: a count today (since midnight UTC), in the last 7 and 30
 * days, and since launch. Shared with the Bible Clue tab so both read the same.
 */
export function headlineRow(
  label: string,
  hint: string,
  rows: Array<{ created_at: string }>,
  count: (rows: Array<{ created_at: string; user_id?: string | null }>) => number,
  now = new Date(),
): MatchHeadline {
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const since = (from: number) => rows.filter((r) => Date.parse(r.created_at) >= from);
  return { label, hint, today: count(since(midnight)), week: count(since(now.getTime() - 7 * DAY)), month: count(since(now.getTime() - 30 * DAY)), allTime: count(rows) };
}

export function summariseMatchGame(
  input: { events: MatchEventRow[]; progress: MatchProgressRow[]; boards: Array<{ id: string; number: number; title: string }> },
  range: MatchRange,
  now = new Date(),
): MatchGameReport {
  const ev = input.events;
  const named = (name: string) => ev.filter((r) => r.event_name === name);
  const period = (rows: MatchEventRow[]) => rows.filter((r) => inRange(r.created_at, range));
  // Today = since midnight Berlin is how the rest of the dashboard counts; here a plain last-24h would
  // disagree with "Today" elsewhere, so the window starts at today's midnight (server time, UTC).
  const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const since = (rows: MatchEventRow[], from: number) => rows.filter((r) => time(r.created_at) >= from);
  const windows = (rows: MatchEventRow[], count: (x: MatchEventRow[]) => number): Omit<MatchHeadline, "label" | "hint"> => ({
    today: count(since(rows, midnight.getTime())),
    week: count(since(rows, now.getTime() - 7 * DAY)),
    month: count(since(rows, now.getTime() - 30 * DAY)),
    allTime: count(rows),
  });

  const started = named("match_board_started");
  const won = named("match_board_won");
  const firstWins = won.filter((r) => meta(r, "replay") !== true);
  const lost = named("match_board_lost");
  const left = named("match_board_left");
  const sessions = named("match_session");

  const headline: MatchHeadline[] = [
    { label: "Different players", hint: "People who opened or played Bible Buddy Match.", ...windows(ev, people) },
    { label: "Played a board", hint: "People who started at least one board.", ...windows(started, people) },
    { label: "Boards finished", hint: "Boards won (replays included).", ...windows(won, (x) => x.length) },
    { label: "New boards beaten", hint: "First wins only: each board counted once per player.", ...windows(firstWins, (x) => x.length) },
    {
      label: "Minutes played",
      hint: "Time with Match open on screen, all players together.",
      ...windows(sessions, (x) => Math.round(x.reduce((n, r) => n + (Number(meta(r, "seconds")) || 0), 0) / 60)),
    },
  ];

  // Where players are now: their furthest unlocked board.
  const total = input.boards.length;
  const onBoardCounts = new Map<number, number>();
  let finishedEverything = 0;
  for (const p of input.progress) {
    const done = new Set(p.done || []);
    if (total && input.boards.every((b) => done.has(b.id))) finishedEverything += 1;
    const at = Math.min(Math.max(1, p.unlocked || 1), total || 1);
    onBoardCounts.set(at, (onBoardCounts.get(at) || 0) + 1);
  }
  const onBoard = input.boards.map((b) => ({ label: `${b.number}. ${b.title}`, players: onBoardCounts.get(b.number) || 0 }));

  const pctOf = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
  const fig = (label: string, hint: string, rows: MatchEventRow[], unit: "people" | "times" = "times"): MatchFigure => ({
    label,
    hint,
    allTime: unit === "people" ? people(rows) : rows.length,
    period: unit === "people" ? people(period(rows)) : period(rows).length,
    unit,
  });
  const returned = (rows: MatchEventRow[]) => {
    const days = new Map<string, Set<string>>();
    for (const r of rows) {
      if (!r.user_id) continue;
      const set = days.get(r.user_id) || new Set<string>();
      set.add(r.created_at.slice(0, 10));
      days.set(r.user_id, set);
    }
    return [...days.values()].filter((d) => d.size >= 2).length;
  };
  const avgSession = (rows: MatchEventRow[]) => (rows.length ? Math.round(rows.reduce((n, r) => n + (Number(meta(r, "seconds")) || 0), 0) / rows.length / 60) : 0);

  const sections: MatchGameReport["sections"] = [
    {
      key: "players",
      icon: "👥",
      title: "Players",
      line: `${people(ev)} players since launch`,
      figures: [
        fig("Opened Match", "People who opened the game.", named("match_opened"), "people"),
        fig("Started a board", "People who began at least one board.", started, "people"),
        fig("Won a board", "People who finished at least one board.", won, "people"),
        { label: "Came back another day", hint: "Players with Match activity on two or more different days.", allTime: returned(ev), period: returned(period(ev)), unit: "people" },
        { label: "Finished every board", hint: "Players who have won all the boards there are, now.", allTime: finishedEverything, period: finishedEverything, unit: "people" },
      ],
    },
    {
      key: "boards",
      icon: "🧩",
      title: "Boards",
      line: `${won.length} won, ${lost.length} lost, ${left.length} left halfway`,
      figures: [
        fig("Boards started", "Every time a board was opened to play (picking one back up included).", started),
        fig("Boards won", "Replays included.", won),
        fig("First-time wins", "Each board counted once per player.", firstWins),
        fig("Lost (out of moves)", "", lost),
        fig("Left halfway", "Went back to the map with moves used and no win.", left),
        {
          label: "Win rate",
          hint: "Won out of won + lost.",
          allTime: pctOf(won.length, won.length + lost.length),
          period: pctOf(period(won).length, period(won).length + period(lost).length),
          unit: "percent",
        },
      ],
    },
    {
      key: "play",
      icon: "✨",
      title: "How they play",
      line: `${named("match_power_used").length} power-ups set off`,
      figures: [
        fig("Power-ups made", "Light Burst, Pillar of Fire, Trumpet Blast or All Match orb earned.", named("match_power_made")),
        fig("Power-ups set off", "", named("match_power_used")),
        fig("Hints after waiting", "The board showed a swap after 10 seconds without a move.", named("match_hint").filter((r) => meta(r, "how") === "idle")),
        fig("Hints asked for", "The sun button.", named("match_hint").filter((r) => meta(r, "how") === "button")),
        fig("Visits", "Times Match was opened and played on screen.", sessions),
        { label: "Average visit (minutes)", hint: "Time on screen per visit.", allTime: avgSession(sessions), period: avgSession(period(sessions)), unit: "minutes" },
      ],
    },
  ];

  const tally = (rows: MatchEventRow[], key: (r: MatchEventRow) => string, distinct = true) => {
    const all = new Map<string, Set<string> | number>();
    const per = new Map<string, Set<string> | number>();
    const add = (m: Map<string, Set<string> | number>, k: string, r: MatchEventRow) => {
      if (distinct) {
        const s = (m.get(k) as Set<string>) || new Set<string>();
        s.add(r.user_id || r.created_at);
        m.set(k, s);
      } else m.set(k, ((m.get(k) as number) || 0) + 1);
    };
    for (const r of rows) {
      const k = key(r) || "unknown";
      add(all, k, r);
      if (inRange(r.created_at, range)) add(per, k, r);
    }
    const size = (v: Set<string> | number | undefined) => (v === undefined ? 0 : typeof v === "number" ? v : v.size);
    return [...all.keys()].map((k) => ({ label: k, allTime: size(all.get(k)), period: size(per.get(k)) })).sort((a, b) => b.allTime - a.allTime);
  };
  const PLATFORM: Record<string, string> = { "ios-app": "iPhone app", "android-app": "Android app", "web-phone": "Phone browser", "web-desktop": "Computer", app: "App" };
  const FROM: Record<string, string> = { games: "Games page", popup: "The popup", direct: "Direct or a link" };
  const POWER: Record<string, string> = { light: "Light Burst", pillar: "Pillar of Fire", blast: "Trumpet Blast", orb: "All Match orb" };

  const boardRows = input.boards.map((b) => {
    const of = (rows: MatchEventRow[]) => rows.filter((r) => str(meta(r, "board")) === b.id);
    const w = of(won).length;
    const l = of(lost).length;
    return {
      label: `${b.number}. ${b.title} · won ${w}, lost ${l}, left ${of(left).length}${w + l ? ` · ${pctOf(w, w + l)}% win` : ""}`,
      allTime: of(started).length,
      period: period(of(started)).length,
    };
  });

  const breakdowns: MatchGameReport["breakdowns"] = [
    { title: "Each board: times started (won, lost, left)", rows: boardRows },
    { title: "Where they play (players)", rows: tally(ev, (r) => PLATFORM[str(meta(r, "platform"))] || str(meta(r, "platform"))) },
    { title: "Where they came from (players)", rows: tally(named("match_opened"), (r) => FROM[str(meta(r, "from"))] || str(meta(r, "from"))) },
    { title: "Power-ups set off (times)", rows: tally(named("match_power_used"), (r) => POWER[str(meta(r, "power"))] || str(meta(r, "power")), false) },
  ];

  const players = rankPlayers(ev, { a: "match_board_won", b: "match_board_started", c: { event: "match_session", key: "seconds", per: 60 } });
  return { launched: LAUNCHED, headline, players, onBoard, finishedEverything, sections, breakdowns };
}

/** First names for the most-active list (profile_stats). */
export async function withNames(admin: SupabaseClient, players: ActivePlayer[]): Promise<ActivePlayer[]> {
  const top = players.slice(0, 50);
  if (!top.length) return top;
  const { data } = await admin.from("profile_stats").select("user_id, display_name, username").in("user_id", top.map((p) => p.userId));
  const names = new Map((data || []).map((r) => [r.user_id as string, String((r.display_name as string) || (r.username as string) || "").trim()]));
  return top.map((p) => ({ ...p, name: names.get(p.userId) || "A Buddy" }));
}

async function everyRow<T>(
  admin: SupabaseClient,
  table: string,
  columns: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apply: (query: any) => any,
  orderColumn: string,
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await apply(admin.from(table).select(columns))
      .order(orderColumn, { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...((data || []) as T[]));
    if (!data || data.length < 1000) return rows;
  }
}

export async function computeMatchGameReport(admin: SupabaseClient, range: MatchRange): Promise<MatchGameReport> {
  const { MATCH_LEVELS } = await import("@/lib/match/engine");
  const [events, progress] = await Promise.all([
    everyRow<MatchEventRow>(admin, "landing_page_events", "event_name, user_id, metadata, created_at", (q) => q.in("event_name", MATCH_REPORT_EVENTS), "created_at"),
    everyRow<MatchProgressRow>(admin, "match_progress", "user_id, unlocked, done", (q) => q, "user_id").catch(() => [] as MatchProgressRow[]),
  ]);
  const report = summariseMatchGame({ events, progress, boards: MATCH_LEVELS.map((l) => ({ id: l.id, number: l.number, title: l.title })) }, range);
  report.players = await withNames(admin, report.players);
  return report;
}
