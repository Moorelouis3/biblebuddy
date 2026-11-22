/**
 * Bible Clue Game on the server: private rooms and Feed challenges.
 *
 * Rooms: the server is the only clock and the only judge. A room's full match
 * (answers included) lives in clue_rooms.state and never leaves the server;
 * players get engine.publicView(). Every change is a read → reduce → write
 * "where version = read", retried on conflict, so two guesses racing for one
 * card cannot both win it. After a change the server pings the room's
 * Realtime channel; clients then fetch the new view (the ping carries no
 * game data).
 *
 * Challenges: a finished solo round frozen (cards, order, 5-point clue
 * variants, settings) so everyone plays exactly the same round. The first
 * finished attempt per person is ranked. Tapping Challenge posts once to the
 * Feed; the post is updated with the attempt count and the leader.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { ALL_CLUE_CARDS, deckLabel, poolFor } from "./catalog";
import { createMatch, publicView, reduceClueMatch, type ClueAction, type ClueMatch, DEFAULT_CLUE_SETTINGS } from "./engine";

export type ClueUser = { id: string; name: string; avatar: string | null };

export function clueAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase server credentials missing");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

/** The signed-in Bible Buddy user behind a request (Bearer access token). */
export async function clueUserFrom(request: Request, admin = clueAdmin()): Promise<ClueUser | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer /i, "") || "";
  if (!token) return null;
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  const { data: profile } = await admin
    .from("profile_stats")
    .select("display_name, username, profile_image_url")
    .eq("user_id", data.user.id)
    .maybeSingle();
  const meta = (data.user.user_metadata || {}) as Record<string, string | undefined>;
  const name =
    (profile?.display_name as string | null) ||
    meta.firstName ||
    meta.first_name ||
    (profile?.username as string | null) ||
    (data.user.email ? data.user.email.split("@")[0] : null) ||
    "Buddy";
  return { id: data.user.id, name: String(name).trim().slice(0, 40), avatar: (profile?.profile_image_url as string | null) || null };
}

/* ---------- rooms ---------- */

// No 0/O, 1/I/L: a code read aloud across a room has to survive.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const newCode = (length = 5) =>
  Array.from({ length }, () => CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)]).join("");

export const normalizeCode = (code: string) => String(code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);

type RoomRow = {
  code: string;
  host_id: string;
  deck_ids: string[];
  status: "lobby" | "playing" | "over" | "closed";
  state: ClueMatch | null;
  version: number;
  expires_at: string;
};

type PlayerRow = { user_id: string; display_name: string | null; avatar_url: string | null; joined_at: string };

async function ping(code: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return;
  try {
    await fetch(`${url}/realtime/v1/api/broadcast`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
      body: JSON.stringify({ messages: [{ topic: `clue-room-${code}`, event: "changed", payload: { at: Date.now() } }] }),
    });
  } catch {
    // Clients also poll slowly while a room is open; a lost ping only delays.
  }
}

async function loadRoom(admin: SupabaseClient, code: string): Promise<RoomRow | null> {
  const { data } = await admin.from("clue_rooms").select("code, host_id, deck_ids, status, state, version, expires_at").eq("code", code).maybeSingle();
  return (data as RoomRow | null) ?? null;
}

async function loadPlayers(admin: SupabaseClient, code: string): Promise<PlayerRow[]> {
  const { data } = await admin
    .from("clue_room_players")
    .select("user_id, display_name, avatar_url, joined_at")
    .eq("room_code", code)
    .order("joined_at", { ascending: true });
  return (data as PlayerRow[] | null) ?? [];
}

/** Write only if nobody else wrote since we read. */
async function saveRoom(admin: SupabaseClient, room: RoomRow, patch: Partial<RoomRow>): Promise<boolean> {
  const { data } = await admin
    .from("clue_rooms")
    .update({ ...patch, version: room.version + 1, updated_at: new Date().toISOString() })
    .eq("code", room.code)
    .eq("version", room.version)
    .select("code");
  return Array.isArray(data) && data.length === 1;
}

export async function createRoom(admin: SupabaseClient, host: ClueUser, deckIds: string[]) {
  const decks = deckIds.filter((id) => poolFor([id]).length > 0);
  if (decks.length === 0) throw new Error("Pick a deck that is ready to play.");
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const code = newCode();
    const { error } = await admin.from("clue_rooms").insert({ code, host_id: host.id, deck_ids: decks });
    if (error) continue; // code taken: try another
    await admin.from("clue_room_players").insert({ room_code: code, user_id: host.id, display_name: host.name, avatar_url: host.avatar });
    return code;
  }
  throw new Error("Could not create a room. Try again.");
}

export async function joinRoom(admin: SupabaseClient, rawCode: string, user: ClueUser) {
  const code = normalizeCode(rawCode);
  const room = await loadRoom(admin, code);
  if (!room || room.status === "closed" || Date.parse(room.expires_at) < Date.now()) {
    return { ok: false as const, reason: "This room has closed or the code is wrong." };
  }
  const players = await loadPlayers(admin, code);
  const already = players.some((p) => p.user_id === user.id);
  if (!already) {
    if (room.status !== "lobby") return { ok: false as const, reason: "This game has already started." };
    if (players.length >= 8) return { ok: false as const, reason: "This room is full." };
    await admin.from("clue_room_players").insert({ room_code: code, user_id: user.id, display_name: user.name, avatar_url: user.avatar });
    await ping(code);
  } else {
    await admin.from("clue_room_players").update({ last_seen: new Date().toISOString() }).eq("room_code", code).eq("user_id", user.id);
  }
  return { ok: true as const, code };
}

/** Run one change against the room, retrying if another request won the race. */
async function mutate(
  admin: SupabaseClient,
  code: string,
  change: (room: RoomRow, players: PlayerRow[], now: number) => Partial<RoomRow> | null | { error: string },
) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const room = await loadRoom(admin, code);
    if (!room) return { error: "This room has closed or the code is wrong." };
    const players = await loadPlayers(admin, code);
    const patch = change(room, players, Date.now());
    if (!patch) return { ok: true as const };
    if ("error" in patch) return patch;
    if (await saveRoom(admin, room, patch)) {
      await ping(code);
      return { ok: true as const };
    }
  }
  return { error: "The table was busy. Try again." };
}

export function startRoom(admin: SupabaseClient, code: string, user: ClueUser) {
  return mutate(admin, code, (room, players, now) => {
    if (room.host_id !== user.id) return { error: "Only the host can start the game." };
    if (room.status !== "lobby") return null;
    const pool = poolFor(room.deck_ids);
    const match = reduceClueMatch(
      createMatch({
        cards: pool,
        sides: players.map((p) => ({ id: p.user_id, name: p.display_name || "Buddy" })),
        players: players.map((p) => ({ id: p.user_id, name: p.display_name || "Buddy", sideId: p.user_id })),
        seed: Math.floor(Math.random() * 2147483647),
      }),
      { type: "deal", now },
      ALL_CLUE_CARDS,
    );
    return { status: "playing", state: match };
  });
}

export function actInRoom(admin: SupabaseClient, code: string, user: ClueUser, action: { type: string; text?: string }) {
  return mutate(admin, code, (room, _players, now) => {
    if (!room.state || room.status !== "playing") return null;
    let next: ClueMatch = reduceClueMatch(room.state, { type: "tick", now }, ALL_CLUE_CARDS);
    let engineAction: ClueAction | null = null;
    if (action.type === "guess") engineAction = { type: "guess", now, playerId: user.id, text: String(action.text || "") };
    else if (action.type === "wait") engineAction = { type: "wait", now, playerId: user.id };
    else if (action.type === "pause" || action.type === "resume") {
      if (room.host_id !== user.id) return { error: "Only the host can pause." };
      engineAction = { type: action.type, now };
    }
    if (engineAction) next = reduceClueMatch(next, engineAction, ALL_CLUE_CARDS);
    if (next === room.state) return null;
    return { state: next, status: next.phase === "over" ? "over" : "playing" };
  });
}

/** Bring the clock up to now (deal, next clue, reveal) and return what this player may see. */
export async function viewRoom(admin: SupabaseClient, rawCode: string, user: ClueUser) {
  const code = normalizeCode(rawCode);
  await mutate(admin, code, (room, _players, now) => {
    if (!room.state || room.status !== "playing") return null;
    const next = reduceClueMatch(room.state, { type: "tick", now }, ALL_CLUE_CARDS);
    if (next === room.state) return null;
    return { state: next, status: next.phase === "over" ? "over" : "playing" };
  });
  const room = await loadRoom(admin, code);
  if (!room) return { error: "This room has closed or the code is wrong." };
  const players = await loadPlayers(admin, code);
  if (!players.some((p) => p.user_id === user.id)) return { error: "Join this room first.", needsJoin: true };
  return {
    code,
    hostId: room.host_id,
    status: room.status,
    deckIds: room.deck_ids,
    deckName: deckLabel(room.deck_ids),
    you: user.id,
    players: players.map((p) => ({ id: p.user_id, name: p.display_name || "Buddy", avatar: p.avatar_url })),
    match: room.state ? publicView(room.state, ALL_CLUE_CARDS, Date.now()) : null,
    settings: room.state?.settings ?? DEFAULT_CLUE_SETTINGS,
  };
}

/* ---------- challenges ---------- */

const challengeId = () => newCode(8);
const SITE = "https://www.mybiblebuddy.net";

function challengePostText(c: {
  id: string;
  creatorName: string;
  creatorScore: number;
  deckName: string;
  attempts: number;
  leaderName: string | null;
  leaderScore: number | null;
}) {
  const head = `🃏 ${c.creatorName} scored ${c.creatorScore} in ${c.deckName} on the Bible Clue Game. Can you beat it?`;
  const board =
    c.attempts > 1 && c.leaderName && c.leaderScore !== null
      ? `\n\n${c.attempts} Buddies have played it. ${c.leaderName} leads with ${c.leaderScore}.`
      : "";
  return `${head}${board}\n\n[Play the challenge](${SITE}/bible-study-games/clue/challenge/${c.id})`;
}

export type ChallengeInput = {
  roundId: string;
  deckIds: string[];
  cardIds: string[];
  topClue: Record<string, number>;
  score: number;
  won: number;
};

export async function createChallenge(admin: SupabaseClient, user: ClueUser, input: ChallengeInput, opts: { postToFeed?: boolean } = {}) {
  const roundId = String(input.roundId || "").slice(0, 64);
  if (!roundId) return { error: "Missing round." };
  const existing = await admin.from("clue_challenges").select("id, feed_post_id").eq("source_round_id", roundId).maybeSingle();
  if (existing.data) return { id: existing.data.id as string, alreadyPosted: true };

  const cardIds = (input.cardIds || []).filter((id) => ALL_CLUE_CARDS.has(id));
  if (cardIds.length !== DEFAULT_CLUE_SETTINGS.roundSize || new Set(cardIds).size !== cardIds.length) {
    return { error: "That round can't be shared." };
  }
  const topClue: Record<string, number> = {};
  for (const id of cardIds) {
    const n = Math.max(0, Math.floor(Number(input.topClue?.[id] ?? 0)));
    topClue[id] = n <= (ALL_CLUE_CARDS.get(id)?.altTopClues?.length ?? 0) ? n : 0;
  }
  const score = Math.max(-50, Math.min(50, Math.round(Number(input.score) || 0)));
  const won = Math.max(0, Math.min(cardIds.length, Math.round(Number(input.won) || 0)));
  const deckIds = (input.deckIds || []).filter((d) => poolFor([d]).length > 0);
  const id = challengeId();
  const { error } = await admin.from("clue_challenges").insert({
    id,
    creator_id: user.id,
    source_round_id: roundId,
    deck_ids: deckIds.length ? deckIds : ["genesis"],
    card_ids: cardIds,
    top_clue: topClue,
    settings: { clueSeconds: DEFAULT_CLUE_SETTINGS.clueSeconds, revealSeconds: DEFAULT_CLUE_SETTINGS.revealSeconds },
    creator_score: score,
    creator_won: won,
    attempts: 1,
    leader_id: user.id,
    leader_name: user.name,
    leader_score: score,
  });
  if (error) {
    // Two taps raced: the other one made it.
    const again = await admin.from("clue_challenges").select("id").eq("source_round_id", roundId).maybeSingle();
    if (again.data) return { id: again.data.id as string, alreadyPosted: true };
    return { error: "Could not save the challenge." };
  }
  await admin.from("clue_challenge_attempts").insert({ challenge_id: id, user_id: user.id, display_name: user.name, score, won, ranked: true, shared: true });
  // Tests leave the Feed alone.
  if (opts.postToFeed === false) return { id, alreadyPosted: false };
  const content = challengePostText({
    id,
    creatorName: user.name,
    creatorScore: score,
    deckName: deckLabel(deckIds),
    attempts: 1,
    leaderName: user.name,
    leaderScore: score,
  });
  const { data: post } = await admin
    .from("feed_posts")
    .insert({ user_id: user.id, post_type: "thought", content, visibility: "community", reaction_counts: {}, comment_count: 0 })
    .select("id")
    .single();
  if (post?.id) await admin.from("clue_challenges").update({ feed_post_id: post.id }).eq("id", id);
  return { id, alreadyPosted: false };
}

export async function getChallenge(admin: SupabaseClient, rawId: string, user: ClueUser | null) {
  const id = String(rawId || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
  const { data: c } = await admin.from("clue_challenges").select("*").eq("id", id).maybeSingle();
  if (!c) return { error: "This challenge was not found." };
  const { data: board } = await admin
    .from("clue_challenge_attempts")
    .select("user_id, display_name, score, won, finished_at")
    .eq("challenge_id", id)
    .eq("ranked", true)
    .order("score", { ascending: false })
    .order("finished_at", { ascending: true })
    .limit(25);
  const { data: creator } = await admin.from("profile_stats").select("display_name").eq("user_id", c.creator_id).maybeSingle();
  const mine = user ? (board || []).find((row) => row.user_id === user.id) ?? null : null;
  return {
    id,
    creatorId: c.creator_id as string,
    creatorName: (creator?.display_name as string | null) || (c.leader_name as string | null) || "A Buddy",
    creatorScore: c.creator_score as number,
    deckIds: c.deck_ids as string[],
    deckName: deckLabel(c.deck_ids as string[]),
    cardIds: c.card_ids as string[],
    topClue: c.top_clue as Record<string, number>,
    attempts: c.attempts as number,
    leaderboard: (board || []).map((row, i) => ({ rank: i + 1, userId: row.user_id, name: row.display_name || "Buddy", score: row.score, won: row.won })),
    yourRanked: mine ? { score: mine.score, won: mine.won } : null,
  };
}

export async function submitChallengeAttempt(admin: SupabaseClient, rawId: string, user: ClueUser, result: { score: number; won: number }) {
  const id = String(rawId || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
  const { data: c } = await admin.from("clue_challenges").select("*").eq("id", id).maybeSingle();
  if (!c) return { error: "This challenge was not found." };
  const score = Math.max(-50, Math.min(50, Math.round(Number(result.score) || 0)));
  const won = Math.max(0, Math.min(10, Math.round(Number(result.won) || 0)));
  const { data: prior } = await admin.from("clue_challenge_attempts").select("id").eq("challenge_id", id).eq("user_id", user.id).eq("ranked", true).maybeSingle();
  const ranked = !prior;
  const { error } = await admin.from("clue_challenge_attempts").insert({ challenge_id: id, user_id: user.id, display_name: user.name, score, won, ranked });
  // The unique index on ranked attempts settles a double submit: the second is practice.
  if (error && ranked) {
    await admin.from("clue_challenge_attempts").insert({ challenge_id: id, user_id: user.id, display_name: user.name, score, won, ranked: false });
    return { ranked: false };
  }
  if (!ranked) return { ranked: false };

  const { count } = await admin.from("clue_challenge_attempts").select("id", { count: "exact", head: true }).eq("challenge_id", id).eq("ranked", true);
  const { data: top } = await admin
    .from("clue_challenge_attempts")
    .select("user_id, display_name, score")
    .eq("challenge_id", id)
    .eq("ranked", true)
    .order("score", { ascending: false })
    .order("finished_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  const attempts = count ?? (c.attempts as number) + 1;
  await admin
    .from("clue_challenges")
    .update({ attempts, leader_id: top?.user_id ?? c.leader_id, leader_name: top?.display_name ?? c.leader_name, leader_score: top?.score ?? c.leader_score })
    .eq("id", id);
  if (c.feed_post_id) {
    const { data: creator } = await admin.from("profile_stats").select("display_name").eq("user_id", c.creator_id).maybeSingle();
    const content = challengePostText({
      id,
      creatorName: (creator?.display_name as string | null) || "A Buddy",
      creatorScore: c.creator_score as number,
      deckName: deckLabel(c.deck_ids as string[]),
      attempts,
      leaderName: (top?.display_name as string | null) ?? null,
      leaderScore: (top?.score as number | null) ?? null,
    });
    await admin.from("feed_posts").update({ content }).eq("id", c.feed_post_id);
  }
  return { ranked: true, tookLead: top?.user_id === user.id && attempts > 1 };
}
