/**
 * The Bible Clue Game tab on /admin/analytics (Louis, 2026-11-22: "a page on
 * the analytics page that tracks this game.. how many people click it, how
 * many people play a round solo, multiplayer, with others... anything", and
 * the invite links as "a free way to get new people to join").
 *
 * This is the detailed view. The Features tab keeps its short Bible Clue
 * block (lib/newFeaturesReport.ts) beside the other games, so the games can
 * be compared on the same few questions; the numbers here come from the same
 * event rows plus the game's own tables, so the two cannot disagree on a
 * figure they both show.
 *
 * Sources:
 *   - landing_page_events, clue_game_* (lib/clueGame/track.ts): opens, solo
 *     and challenge games, rounds, invites shared and invite links opened
 *     (the only events that can be anonymous: the person is not signed up yet);
 *   - clue_rooms / clue_room_players: multiplayer, from the rooms themselves;
 *   - clue_challenges / clue_challenge_attempts: Feed challenges;
 *   - profile_stats.signup_utm_source = "clue_invite": accounts made from an
 *     invite link (the invite page sends people to /signup tagged that way).
 *
 * Everything labelled "people" is distinct accounts. Every figure is given
 * since launch and for the period chosen on the dashboard. The summarising
 * half is pure so it can be checked without a database.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { headlineRow, people, rankPlayers, withNames, type ActivePlayer, type MatchHeadline } from "./matchGameReport";

export type ClueRange = { start: Date; end: Date };

export type ClueEventRow = { event_name: string; user_id: string | null; metadata: Record<string, unknown> | null; created_at: string };
export type ClueRoomRow = { code: string; host_id: string; status: string; state: { dealt?: number; phase?: string } | null; created_at: string };
export type ClueRoomPlayerRow = { room_code: string; user_id: string; joined_at: string };
export type ClueChallengeRow = { id: string; creator_id: string; created_at: string };
export type ClueAttemptRow = { challenge_id: string; user_id: string; finished_at: string };
export type ClueInviteSignupRow = { user_id: string; signup_utm_medium: string | null; signup_source_recorded_at: string | null };

export type ClueGameInput = {
  events: ClueEventRow[];
  rooms: ClueRoomRow[];
  roomPlayers: ClueRoomPlayerRow[];
  challenges: ClueChallengeRow[];
  attempts: ClueAttemptRow[];
  inviteSignups: ClueInviteSignupRow[];
};

/** One number, since launch and in the chosen period. */
export type ClueFigure = { label: string; hint: string; allTime: number; period: number; unit?: "people" | "times" | "percent" | "average" };

export type ClueGameReport = {
  launched: string;
  /** The simple view (Louis, 2026-11-22: the full tab was "too hard to understand"): today, 7 days, 30 days, since launch. */
  headline: MatchHeadline[];
  /** Most active first: a = games finished, b = games played. */
  players: ActivePlayer[];
  sections: Array<{ key: string; icon: string; title: string; line: string; figures: ClueFigure[] }>;
  breakdowns: Array<{ title: string; rows: Array<{ label: string; allTime: number; period: number }> }>;
};

const LAUNCHED = "22 November 2026 (Beta)";

const time = (iso: string | null | undefined) => (iso ? Date.parse(iso) : NaN);
const inRange = (iso: string | null | undefined, range: ClueRange) => {
  const t = time(iso);
  return Number.isFinite(t) && t >= range.start.getTime() && t < range.end.getTime();
};
const meta = (row: ClueEventRow, key: string) => (row.metadata ? row.metadata[key] : undefined);

/** Both columns at once: a count over rows, or distinct people when `who` is given. */
function figure<T>(
  label: string,
  hint: string,
  rows: T[],
  at: (row: T) => string | null | undefined,
  range: ClueRange,
  who?: (row: T) => string | null | undefined,
): ClueFigure {
  if (!who) return { label, hint, allTime: rows.length, period: rows.filter((r) => inRange(at(r), range)).length, unit: "times" };
  const all = new Set<string>();
  const inPeriod = new Set<string>();
  for (const r of rows) {
    const id = who(r);
    if (!id) continue;
    all.add(id);
    if (inRange(at(r), range)) inPeriod.add(id);
  }
  return { label, hint, allTime: all.size, period: inPeriod.size, unit: "people" };
}

function ratio(label: string, hint: string, top: ClueFigure, bottom: ClueFigure): ClueFigure {
  const p = (a: number, b: number) => (b > 0 ? Math.round((a / b) * 1000) / 10 : 0);
  return { label, hint, allTime: p(top.allTime, bottom.allTime), period: p(top.period, bottom.period), unit: "percent" };
}

const berlinDay = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));

/** Where an open came from, as the game records it (lib/clueGame/track.ts). */
const OPEN_FROM: Record<string, string> = {
  games: "Games page",
  invite: "Invite link",
  challenge: "Feed challenge",
  popup: "New games popup",
  direct: "Other / direct",
};

const CHANNEL: Record<string, string> = {
  sms: "Text message",
  whatsapp: "WhatsApp",
  messenger: "Messenger",
  email: "Email",
  copy: "Copied link",
  more: "Phone share menu",
};

export function summariseClueGame(input: ClueGameInput, range: ClueRange): ClueGameReport {
  const ev = (name: string) => input.events.filter((r) => r.event_name === name);
  const at = (r: ClueEventRow) => r.created_at;
  const user = (r: ClueEventRow) => r.user_id;

  // ---- reach ----
  const opened = ev("clue_game_opened");
  const openedPeople = figure("Opened the game", "People who opened Bible Trivia.", opened, at, range, user);

  // ---- solo ----
  const started = ev("clue_game_started");
  const soloStarted = started.filter((r) => meta(r, "mode") === "solo");
  const finished = ev("clue_game_finished");
  const soloFinished = finished.filter((r) => meta(r, "mode") === "solo");
  const soloPeople = figure("Played solo", "People who started at least one solo game.", soloStarted, at, range, user);
  const soloGames = figure("Solo games started", "Every solo game dealt.", soloStarted, at, range);
  const soloDone = figure("Solo games finished", "Played all 10 rounds.", soloFinished, at, range);
  const soloRate = ratio("Solo games finished", "Of the solo games started.", soloDone, soloGames);
  const cards = ev("clue_game_card");
  const rounds = figure("Rounds played (solo and challenges)", "Every card that was won or ran out of clues.", cards, at, range);
  const roundsWon = figure("Rounds won", "Guessed right before the fifth clue ran out.", cards.filter((r) => meta(r, "outcome") === "won"), at, range);
  const winRate = ratio("Rounds won", "Of rounds played.", roundsWon, rounds);
  const scores = soloFinished.map((r) => ({ at: r.created_at, score: Number(meta(r, "score")) })).filter((s) => Number.isFinite(s.score));
  const avg = (list: typeof scores) => (list.length ? Math.round((list.reduce((a, s) => a + s.score, 0) / list.length) * 10) / 10 : 0);
  const avgScore: ClueFigure = {
    label: "Average solo score",
    hint: "Points at the end of a finished solo game (most possible: 50).",
    allTime: avg(scores),
    period: avg(scores.filter((s) => inRange(s.at, range))),
    unit: "average",
  };

  // ---- multiplayer, from the rooms themselves ----
  const playersBy = new Map<string, ClueRoomPlayerRow[]>();
  for (const p of input.roomPlayers) playersBy.set(p.room_code, [...(playersBy.get(p.room_code) || []), p]);
  const startedRooms = input.rooms.filter((r) => r.status === "playing" || r.status === "over" || (r.state?.dealt ?? 0) > 0);
  const withOthers = startedRooms.filter((r) => (playersBy.get(r.code)?.length ?? 0) >= 2);
  const roomAt = (r: ClueRoomRow) => r.created_at;
  const roomsMade = figure("Rooms created", "Every room a host opened.", input.rooms, roomAt, range);
  const roomsPlayed = figure("Rooms that started a game", "The host pressed Start.", startedRooms, roomAt, range);
  const roomsTogether = figure("Games played with other people", "Started with 2 or more players in the room.", withOthers, roomAt, range);
  const hosts = figure("People who hosted a room", "Opened at least one room.", input.rooms, roomAt, range, (r) => r.host_id);
  const hostOf = new Map(input.rooms.map((r) => [r.code, r.host_id]));
  const guests = input.roomPlayers.filter((p) => hostOf.get(p.room_code) !== p.user_id);
  const joiners = figure("People who joined someone else's room", "Came in by a code or an invite link.", guests, (p) => p.joined_at, range, (p) => p.user_id);
  const playedTogether = input.roomPlayers.filter((p) => withOthers.some((r) => r.code === p.room_code));
  const multiPeople = figure("People who played with others", "Were in a room game with 2 or more players.", playedTogether, (p) => p.joined_at, range, (p) => p.user_id);
  const avgPlayers = (rooms: ClueRoomRow[]) =>
    rooms.length ? Math.round((rooms.reduce((a, r) => a + (playersBy.get(r.code)?.length ?? 0), 0) / rooms.length) * 10) / 10 : 0;
  const avgRoom: ClueFigure = {
    label: "Average players in a room game",
    hint: "Across rooms that started (rooms seat 4).",
    allTime: avgPlayers(startedRooms),
    period: avgPlayers(startedRooms.filter((r) => inRange(r.created_at, range))),
    unit: "average",
  };

  // ---- invites: the free way in ----
  const shared = ev("clue_game_invite_shared");
  const openedInvite = ev("clue_game_invite_opened");
  const inviteShares = figure("Invites sent", "Every tap on a share option in a room.", shared, at, range);
  const inviters = figure("People who sent an invite", "Shared a room link at least once.", shared, at, range, user);
  const inviteOpens = figure("Invite links opened", "Every time someone opened a /play link (signed in or not).", openedInvite, at, range);
  const inviteOpensNew = figure(
    "Opened by someone without an account",
    "Saw the invite page and the sign-up button.",
    openedInvite.filter((r) => meta(r, "signed_in") === false),
    at,
    range,
  );
  const signupAt = (r: ClueInviteSignupRow) => r.signup_source_recorded_at;
  const inviteSignups = figure("New accounts from invites", "Signed up from an invite link (signup tagged clue_invite).", input.inviteSignups, signupAt, range, (r) => r.user_id);
  const invitedIds = new Set(input.inviteSignups.map((r) => r.user_id));
  const invitedPlayed = figure(
    "…and then played in a room",
    "New accounts from invites who joined a room.",
    input.roomPlayers.filter((p) => invitedIds.has(p.user_id)),
    (p) => p.joined_at,
    range,
    (p) => p.user_id,
  );
  const signupRate = ratio("Invite opens that became an account", "New accounts from invites, of opens by people without one.", inviteSignups, inviteOpensNew);

  // ---- challenges on the Feed ----
  const challengesMade = figure("Challenges posted to the Feed", "Every challenge shared.", input.challenges, (c) => c.created_at, range);
  const challengeTakers = figure("People who took a challenge", "Finished someone's challenge.", input.attempts, (a) => a.finished_at, range, (a) => a.user_id);
  const attemptsDone = figure("Challenge attempts finished", "Every finished attempt.", input.attempts, (a) => a.finished_at, range);

  // ---- coming back ----
  const activity: Array<{ user: string; at: string }> = [
    ...opened.filter((r) => r.user_id).map((r) => ({ user: r.user_id!, at: r.created_at })),
    ...input.roomPlayers.map((p) => ({ user: p.user_id, at: p.joined_at })),
  ];
  const days = new Map<string, Set<string>>();
  for (const a of activity) {
    if (!days.has(a.user)) days.set(a.user, new Set());
    days.get(a.user)!.add(berlinDay(a.at));
  }
  const returners = [...days.entries()].filter(([, d]) => d.size >= 2).map(([u]) => u);
  const activeInPeriod = new Set(activity.filter((a) => inRange(a.at, range)).map((a) => a.user));
  const cameBack: ClueFigure = {
    label: "Came back on another day",
    hint: "Opened or played on 2 or more different days (period: of those active in it).",
    allTime: returners.length,
    period: returners.filter((u) => activeInPeriod.has(u)).length,
    unit: "people",
  };
  const feedback = ev("clue_game_feedback");
  const liked = figure("Said they enjoyed it", "Tapped the thumbs up after a game.", feedback.filter((r) => meta(r, "enjoyed") === true), at, range, user);
  const disliked = figure("Said they did not", "Tapped the thumbs down.", feedback.filter((r) => meta(r, "enjoyed") === false), at, range, user);
  const studyOpens = figure("Study This Card opened", "Opened a card's teaching after a round.", ev("clue_game_study_opened"), at, range);

  // ---- breakdowns ----
  const countBy = <T,>(rows: T[], key: (r: T) => string, when: (r: T) => string | null | undefined, names: Record<string, string>) => {
    const map = new Map<string, { allTime: number; period: number }>();
    for (const r of rows) {
      const k = key(r);
      const cur = map.get(k) || { allTime: 0, period: 0 };
      cur.allTime += 1;
      if (inRange(when(r), range)) cur.period += 1;
      map.set(k, cur);
    }
    return [...map.entries()].map(([k, v]) => ({ label: names[k] || k, ...v })).sort((a, b) => b.allTime - a.allTime);
  };

  const ofEvent = (name: string) => input.events.filter((r) => r.event_name === name);
  const headline: MatchHeadline[] = [
    headlineRow("Different players", "People who opened or played Bible Trivia.", input.events, (x) => people(x as ClueEventRow[])),
    headlineRow("Solo games played", "Solo games started.", ofEvent("clue_game_started"), (x) => x.length),
    headlineRow("Games finished", "Played to the end (solo and challenges).", ofEvent("clue_game_finished"), (x) => x.length),
    headlineRow("Rooms played", "Multiplayer rooms where the game was started.", input.rooms.filter((r) => (r.state?.dealt ?? 0) > 0), (x) => x.length),
    headlineRow("Challenge games", "Feed and buddy challenges played to the end.", input.attempts.map((a) => ({ created_at: a.finished_at })), (x) => x.length),
  ];

  return {
    launched: LAUNCHED,
    headline,
    players: rankPlayers(input.events, { a: "clue_game_finished", b: "clue_game_started" }),
    sections: [
      {
        key: "reach",
        icon: "👀",
        title: "Who finds it",
        line: `${openedPeople.allTime} people opened it`,
        figures: [openedPeople, figure("Times opened", "Every visit to the game's menu.", opened, at, range)],
      },
      {
        key: "solo",
        icon: "🃏",
        title: "Solo",
        line: `${soloPeople.allTime} people · ${soloGames.allTime} games`,
        figures: [soloPeople, soloGames, soloDone, soloRate, rounds, winRate, avgScore],
      },
      {
        key: "multi",
        icon: "👥",
        title: "Multiplayer",
        line: `${roomsTogether.allTime} games with other people · ${multiPeople.allTime} people`,
        figures: [roomsMade, hosts, roomsPlayed, roomsTogether, multiPeople, joiners, avgRoom],
      },
      {
        key: "invites",
        icon: "📨",
        title: "Invites (new people for free)",
        line: `${inviteShares.allTime} sent · ${inviteSignups.allTime} new accounts`,
        figures: [inviteShares, inviters, inviteOpens, inviteOpensNew, inviteSignups, signupRate, invitedPlayed],
      },
      {
        key: "challenges",
        icon: "🏆",
        title: "Feed challenges",
        line: `${challengesMade.allTime} posted · ${challengeTakers.allTime} people took one`,
        figures: [challengesMade, attemptsDone, challengeTakers],
      },
      {
        key: "return",
        icon: "🔁",
        title: "Coming back and liking it",
        line: `${cameBack.allTime} came back · ${liked.allTime} 👍 · ${disliked.allTime} 👎`,
        figures: [cameBack, liked, disliked, studyOpens],
      },
    ],
    breakdowns: [
      { title: "Where people opened it from", rows: countBy(opened, (r) => String(meta(r, "from") || "direct"), at, OPEN_FROM) },
      { title: "How invites were sent", rows: countBy(shared, (r) => String(meta(r, "channel") || "more"), at, CHANNEL) },
      { title: "Which invite links were opened", rows: countBy(openedInvite, (r) => String(meta(r, "ch") || "unknown"), at, { ...CHANNEL, unknown: "Unknown" }) },
    ],
  };
}

// ---------- loading ----------

/** Every event name this report reads. */
export const CLUE_REPORT_EVENTS = [
  "clue_game_opened",
  "clue_game_started",
  "clue_game_card",
  "clue_game_finished",
  "clue_game_study_opened",
  "clue_game_feedback",
  "clue_game_invite_shared",
  "clue_game_invite_opened",
];

/** Every row, however many (PostgREST caps a response at 1,000). */
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

export async function computeClueGameReport(admin: SupabaseClient, range: ClueRange): Promise<ClueGameReport> {
  const [events, rooms, roomPlayers, challenges, attempts, inviteSignups] = await Promise.all([
    everyRow<ClueEventRow>(admin, "landing_page_events", "event_name, user_id, metadata, created_at", (q) => q.in("event_name", CLUE_REPORT_EVENTS), "created_at"),
    // The state column is a whole match; only two numbers of it are needed.
    everyRow<ClueRoomRow>(admin, "clue_rooms", "code, host_id, status, state->dealt, created_at", (q) => q, "created_at").then((rows) =>
      rows.map((r) => {
        const raw = r as unknown as ClueRoomRow & { dealt?: number | null };
        return { ...raw, state: { dealt: raw.dealt ?? 0 } };
      }),
    ),
    everyRow<ClueRoomPlayerRow>(admin, "clue_room_players", "room_code, user_id, joined_at", (q) => q, "joined_at"),
    everyRow<ClueChallengeRow>(admin, "clue_challenges", "id, creator_id, created_at", (q) => q, "created_at"),
    everyRow<ClueAttemptRow>(admin, "clue_challenge_attempts", "challenge_id, user_id, finished_at", (q) => q, "finished_at"),
    everyRow<ClueInviteSignupRow>(
      admin,
      "profile_stats",
      "user_id, signup_utm_medium, signup_source_recorded_at",
      (q) => q.eq("signup_utm_source", "clue_invite"),
      "user_id",
    ),
  ]);
  const report = summariseClueGame({ events, rooms, roomPlayers, challenges, attempts, inviteSignups }, range);
  report.players = await withNames(admin, report.players);
  return report;
}
