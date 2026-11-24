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
import { logWeeklyXp, weeklyPostText, type WeeklyInfo } from "./weekly";
import { CLUE_BANK, MIN_ROUND, bookItems, cleanSelection, selectionFromKeys, selectionLabel, selectionStatus, selectionToKeys } from "./bank";
// Every book's questions in the registry: rooms and challenges can use any book.
import "./bank/all";
import { createMatch, publicView, reduceClueMatch, type ClueAction, type ClueMatch, type ClueSelection, DEFAULT_CLUE_SETTINGS, ROUND_INTRO_MS } from "./engine";

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

/**
 * Players per room (Louis, 2026-11-22: "I don't want it to be too many
 * people where it's so much chaos"). Four for now: you at the bottom, three
 * across the top. One number to change.
 */
export const MAX_ROOM_PLAYERS = 4;

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

/** The host's pick (book, chapters, level), kept in deck_ids. */
export async function createRoom(admin: SupabaseClient, host: ClueUser, rawSelection: unknown) {
  const selection = cleanSelection(rawSelection);
  const status = selectionStatus(selection);
  if (!status.enough) throw new Error(`${selectionLabel(selection)} has ${status.count} questions. A game needs ${status.needed}. Add chapters or pick another level.`);
  const decks = selectionToKeys(selection);
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const code = newCode();
    const { error } = await admin.from("clue_rooms").insert({ code, host_id: host.id, deck_ids: decks });
    if (error) {
      if (error.code === "23505") continue; // code taken: try another
      throw new Error(`Could not create a room (${error.message}).`);
    }
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
    if (players.length >= MAX_ROOM_PLAYERS) return { ok: false as const, reason: `This room is full (${MAX_ROOM_PLAYERS} players).` };
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

/**
 * Start the game, or (rematch) a new one with the same players after it
 * ended: the questions of the last game are used only if the selection
 * runs out of fresh ones.
 */
export function startRoom(admin: SupabaseClient, code: string, user: ClueUser, opts: { rematch?: boolean } = {}) {
  return mutate(admin, code, (room, players, now) => {
    if (room.host_id !== user.id) return { error: "Only the host can start the game." };
    if (opts.rematch ? room.status !== "over" : room.status !== "lobby") return null;
    const selection = selectionFromKeys(room.deck_ids);
    const last = room.state && isCurrent(room.state) ? [...room.state.deck, ...room.state.done.map((d) => d.cardId)] : [];
    const match = reduceClueMatch(
      createMatch({
        items: bookItems(selection.book),
        selection,
        avoid: last,
        sides: players.map((p) => ({ id: p.user_id, name: p.display_name || "Buddy" })),
        players: players.map((p) => ({ id: p.user_id, name: p.display_name || "Buddy", sideId: p.user_id })),
        seed: Math.floor(Math.random() * 2147483647),
      }),
      // The shuffle-and-deal opening and the instruction play first; the first
      // question's 10 seconds start after them.
      { type: "deal", now: now + ROUND_INTRO_MS },
      CLUE_BANK,
    );
    return { status: "playing", state: match };
  });
}

/** A room saved by an older version (the five clues, or the cards before the question bank): it cannot be played on. */
const isCurrent = (state: ClueMatch | null): state is ClueMatch =>
  !!state && Array.isArray((state as { done?: unknown }).done) && !!(state as { selection?: unknown }).selection && state.deck.every((id) => CLUE_BANK.has(id));

export function actInRoom(admin: SupabaseClient, code: string, user: ClueUser, action: { type: string; choice?: number }) {
  return mutate(admin, code, (room, _players, now) => {
    if (!room.state || room.status !== "playing") return null;
    if (!isCurrent(room.state)) return { error: "This game was started on the old version. Start a new room." };
    let next: ClueMatch = reduceClueMatch(room.state, { type: "tick", now }, CLUE_BANK);
    let engineAction: ClueAction | null = null;
    if (action.type === "answer") {
      // One answer per player per question, only while it is open; a late or
      // second answer simply changes nothing (the server's clock decides).
      engineAction = { type: "answer", now, playerId: user.id, choice: Number(action.choice) };
    } else if (action.type === "pause" || action.type === "resume") {
      if (room.host_id !== user.id) return { error: "Only the host can pause." };
      engineAction = { type: action.type, now };
    }
    if (engineAction) next = reduceClueMatch(next, engineAction, CLUE_BANK);
    if (next === room.state) return null;
    return { state: next, status: next.phase === "over" ? "over" : "playing" };
  });
}

/** Bring the clock up to now (deal, next clue, reveal) and return what this player may see. */
export async function viewRoom(admin: SupabaseClient, rawCode: string, user: ClueUser) {
  const code = normalizeCode(rawCode);
  await mutate(admin, code, (room, _players, now) => {
    if (!room.state || room.status !== "playing" || !isCurrent(room.state)) return null;
    const next = reduceClueMatch(room.state, { type: "tick", now }, CLUE_BANK);
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
    selection: selectionFromKeys(room.deck_ids),
    deckName: selectionLabel(selectionFromKeys(room.deck_ids)),
    you: user.id,
    players: players.map((p) => ({ id: p.user_id, name: p.display_name || "Buddy", avatar: p.avatar_url })),
    match: room.state && isCurrent(room.state) ? publicView(room.state, CLUE_BANK, Date.now(), user.id) : null,
    outdated: !!room.state && !isCurrent(room.state),
    settings: room.state?.settings ?? DEFAULT_CLUE_SETTINGS,
  };
}

/**
 * What an invite link may show to anyone, signed in or not (the /play/<code>
 * page): who is hosting (first name and photo only), the deck, how many seats
 * are taken, and whether the room can still be joined. Nothing about the
 * other players, and nothing from the game itself.
 */
export async function roomInvite(admin: SupabaseClient, rawCode: string) {
  const code = normalizeCode(rawCode);
  const room = await loadRoom(admin, code);
  if (!room) return { code, found: false as const };
  const players = await loadPlayers(admin, code);
  const host = players.find((p) => p.user_id === room.host_id);
  const closed = room.status === "closed" || Date.parse(room.expires_at) < Date.now();
  const joinable = !closed && room.status === "lobby" && players.length < MAX_ROOM_PLAYERS;
  return {
    code,
    found: true as const,
    hostName: (host?.display_name || "A friend").split(/\s+/)[0],
    hostAvatar: host?.avatar_url ?? null,
    deckName: selectionLabel(selectionFromKeys(room.deck_ids)),
    players: players.length,
    maxPlayers: MAX_ROOM_PLAYERS,
    joinable,
    reason: joinable ? null : closed ? "closed" : room.status !== "lobby" ? "started" : "full",
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
  const head = `🃏 ${c.creatorName} scored ${c.creatorScore} in ${c.deckName} on Bible Trivia. Can you beat it?`;
  const board =
    c.attempts > 1 && c.leaderName && c.leaderScore !== null
      ? `\n\n${c.attempts} Buddies have played it. ${c.leaderName} leads with ${c.leaderScore}.`
      : "";
  return `${head}${board}\n\n[Play the challenge](${SITE}/bible-study-games/clue/challenge/${c.id})`;
}

/**
 * The chain letter (Louis, 2026-11-23): everyone who finishes a challenge for
 * the first time gets their own Feed post saying whose challenge they took and
 * how they did, with the whole chain so far, and their own link (?from=) so
 * whoever plays from THEIR post took THEIR challenge. components/feed/
 * ClueChallengePost.tsx reads this exact text.
 */
export function chainPostText(c: {
  id: string;
  name: string;
  fromName: string;
  fromId: string;
  userId: string;
  deckName: string;
  won: number;
  total: number;
  score: number;
  chain: string[];
}) {
  const from = c.fromName.split(/\s+/)[0];
  const perfect = c.won >= c.total ? " A perfect round! Can you get a perfect one too?" : " Can you beat it?";
  const head = `🔗 ${c.name} took ${from}’s Bible Trivia challenge on ${c.deckName} and got ${c.won}/${c.total} right (${c.score} point${Math.abs(c.score) === 1 ? "" : "s"}).${perfect}`;
  const chain = c.chain.length > 1 ? `\n\nThe chain: ${c.chain.map((n) => n.split(/\s+/)[0]).join(" → ")}` : "";
  return `${head}${chain}\n\n[Take the challenge](${SITE}/bible-study-games/clue/challenge/${c.id}?from=${c.userId})`;
}

/** Everyone who has finished this challenge (ranked), in the order they did: the chain. */
async function challengeChain(admin: SupabaseClient, id: string) {
  const { data } = await admin
    .from("clue_challenge_attempts")
    .select("user_id, display_name, finished_at")
    .eq("challenge_id", id)
    .eq("ranked", true)
    .order("finished_at", { ascending: true })
    .limit(200);
  return (data || []).map((r) => ({ userId: r.user_id as string, name: String((r.display_name as string) || "Buddy") }));
}

export type ChallengeInput = {
  roundId: string;
  selection: ClueSelection;
  /** The ten question ids, in order. */
  cardIds: string[];
  score: number;
  won: number;
  /**
   * A private challenge (Louis, 2026-11-22): these Bible Buddies get it as a
   * notification instead of a Feed post. Without it: an open challenge on
   * the Feed.
   */
  buddyIds?: string[];
  /** Played with speed points (since 2026-11-23): scores run to ~20,000, not ±10. */
  speed?: boolean;
};

/** A score, clamped: speed points run 0 to 20,000; the old +1/−1 scoring ±50. */
const clampScore = (raw: unknown, speed: boolean) =>
  speed ? Math.max(0, Math.min(40000, Math.round(Number(raw) || 0))) : Math.max(-50, Math.min(50, Math.round(Number(raw) || 0)));

/** The player's Bible Buddies (the buddies table, either side): id, first name, photo. */
export async function listBuddies(admin: SupabaseClient, userId: string) {
  const [{ data: a }, { data: b }] = await Promise.all([
    admin.from("buddies").select("user_id_2").eq("user_id_1", userId).limit(500),
    admin.from("buddies").select("user_id_1").eq("user_id_2", userId).limit(500),
  ]);
  const ids = [...new Set([...(a || []).map((r) => r.user_id_2 as string), ...(b || []).map((r) => r.user_id_1 as string)])].filter((id) => id && id !== userId);
  if (!ids.length) return [];
  const { data: profiles } = await admin.from("profile_stats").select("user_id, display_name, username, profile_image_url").in("user_id", ids);
  const prof = new Map((profiles || []).map((p) => [p.user_id as string, p]));
  return ids
    .map((id) => {
      const p = prof.get(id);
      return { id, name: String((p?.display_name as string) || (p?.username as string) || "Buddy").trim(), avatar: (p?.profile_image_url as string | null) ?? null };
    })
    .sort((x, y) => x.name.localeCompare(y.name));
}

export async function createChallenge(admin: SupabaseClient, user: ClueUser, input: ChallengeInput, opts: { postToFeed?: boolean } = {}) {
  const roundId = String(input.roundId || "").slice(0, 64);
  if (!roundId) return { error: "Missing round." };
  const score = clampScore(input.score, !!input.speed);
  const wantBuddies = Array.isArray(input.buddyIds) && input.buddyIds.length > 0;

  // One challenge per finished round: an open challenge and a buddy challenge
  // of the same round are the same challenge (one leaderboard).
  let id: string;
  let feedPostId: string | null = null;
  const existing = await admin.from("clue_challenges").select("id, feed_post_id").eq("source_round_id", roundId).maybeSingle();
  if (existing.data) {
    id = existing.data.id as string;
    feedPostId = (existing.data.feed_post_id as string | null) ?? null;
  } else {
    const cardIds = (input.cardIds || []).filter((cid) => CLUE_BANK.has(cid));
    if (cardIds.length < MIN_ROUND || cardIds.length > DEFAULT_CLUE_SETTINGS.roundSize || new Set(cardIds).size !== cardIds.length) {
      return { error: "That round can't be shared." };
    }
    const won = Math.max(0, Math.min(cardIds.length, Math.round(Number(input.won) || 0)));
    const selection = cleanSelection(input.selection);
    id = challengeId();
    const { error } = await admin.from("clue_challenges").insert({
      id,
      creator_id: user.id,
      source_round_id: roundId,
      deck_ids: selectionToKeys(selection),
      card_ids: cardIds,
      top_clue: {},
      settings: { answerSeconds: DEFAULT_CLUE_SETTINGS.answerSeconds, revealSeconds: DEFAULT_CLUE_SETTINGS.revealSeconds, ...(input.speed ? { speed: true } : {}) },
      creator_score: score,
      creator_won: won,
      attempts: 1,
      leader_id: user.id,
      leader_name: user.name,
      leader_score: score,
    });
    if (error) {
      // Two taps raced: the other one made it.
      const again = await admin.from("clue_challenges").select("id, feed_post_id").eq("source_round_id", roundId).maybeSingle();
      if (!again.data) return { error: "Could not save the challenge." };
      id = again.data.id as string;
      feedPostId = (again.data.feed_post_id as string | null) ?? null;
    } else {
      await admin.from("clue_challenge_attempts").insert({ challenge_id: id, user_id: user.id, display_name: user.name, score, won, ranked: true, shared: true });
    }
  }

  if (wantBuddies) {
    // Only real Bible Buddies, and each one once per challenge.
    const mine = new Map((await listBuddies(admin, user.id)).map((b) => [b.id, b]));
    const to = [...new Set(input.buddyIds!.map(String))].filter((bid) => mine.has(bid)).slice(0, 50);
    if (!to.length) return { error: "Pick at least one of your Bible Buddies." };
    const link = `/bible-study-games/clue/challenge/${id}`;
    const { data: already } = await admin.from("notifications").select("user_id").eq("type", "clue_challenge").eq("article_slug", link).in("user_id", to);
    const skip = new Set((already || []).map((r) => r.user_id as string));
    const first = user.name.split(/\s+/)[0];
    const rows = to
      .filter((bid) => !skip.has(bid))
      .map((bid) => ({
        user_id: bid,
        type: "clue_challenge",
        from_user_id: user.id,
        from_user_name: first,
        article_slug: link,
        message: `${first} challenged you to Bible Trivia! Beat ${score} point${Math.abs(score) === 1 ? "" : "s"}.`,
        is_read: false,
      }));
    if (rows.length) {
      const { error } = await admin.from("notifications").insert(rows);
      if (error) return { error: "Could not send the challenge." };
    }
    return { id, alreadyPosted: false, sentTo: to.map((bid) => mine.get(bid)!.name.split(/\s+/)[0]) };
  }

  if (feedPostId) return { id, alreadyPosted: true };
  // Tests leave the Feed alone.
  if (opts.postToFeed === false) return { id, alreadyPosted: false };
  const selection = cleanSelection(input.selection);
  const content = challengePostText({
    id,
    creatorName: user.name,
    creatorScore: score,
    deckName: selectionLabel(selection),
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
  const { data: creator } = await admin.from("profile_stats").select("display_name, profile_image_url").eq("user_id", c.creator_id).maybeSingle();
  const mine = user ? (board || []).find((row) => row.user_id === user.id) ?? null : null;
  const chain = await challengeChain(admin, id);
  const weekly = ((c.settings as { weekly?: WeeklyInfo } | null)?.weekly ?? null) as WeeklyInfo | null;
  const cardIds = c.card_ids as string[];
  return {
    /** Weekly Bible Trivia (lib/clueGame/weekly.ts): the week's theme, and its winner once closed. */
    weekly,
    /** Every book its questions come from: a weekly theme spans several. */
    books: [...new Set(cardIds.map((cid) => CLUE_BANK.get(cid)?.book).filter(Boolean) as string[])],
    chain: chain.map((r) => ({ userId: r.userId, name: r.name })),
    id,
    creatorId: c.creator_id as string,
    creatorName: (creator?.display_name as string | null) || (c.leader_name as string | null) || "A Buddy",
    creatorAvatar: ((creator as { profile_image_url?: string | null } | null)?.profile_image_url as string | null) ?? null,
    creatorScore: c.creator_score as number,
    deckIds: c.deck_ids as string[],
    deckName: weekly ? weekly.title : selectionLabel(selectionFromKeys(c.deck_ids as string[])),
    selection: selectionFromKeys(c.deck_ids as string[]),
    cardIds: c.card_ids as string[],
    /** Speed points (made since 2026-11-23); older challenges keep the +1/−1 scoring. */
    speed: !!(c.settings as { speed?: boolean } | null)?.speed,
    /** Made before the question bank (2026-11-22): its cards cannot be replayed. */
    outdated: !(c.card_ids as string[]).every((id) => CLUE_BANK.has(id)),
    attempts: c.attempts as number,
    leaderboard: (board || []).map((row, i) => ({ rank: i + 1, userId: row.user_id, name: row.display_name || "Buddy", score: row.score, won: row.won })),
    yourRanked: mine ? { score: mine.score, won: mine.won } : null,
  };
}

export async function submitChallengeAttempt(
  admin: SupabaseClient,
  rawId: string,
  user: ClueUser,
  result: { score: number; won: number; from?: string },
  opts: { postToFeed?: boolean } = {},
) {
  const id = String(rawId || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
  const { data: c } = await admin.from("clue_challenges").select("*").eq("id", id).maybeSingle();
  if (!c) return { error: "This challenge was not found." };
  const score = clampScore(result.score, !!(c.settings as { speed?: boolean } | null)?.speed);
  const won = Math.max(0, Math.min(10, Math.round(Number(result.won) || 0)));
  const weekly = ((c.settings as { weekly?: WeeklyInfo } | null)?.weekly ?? null) as WeeklyInfo | null;
  const { data: prior } = await admin.from("clue_challenge_attempts").select("id").eq("challenge_id", id).eq("user_id", user.id).eq("ranked", true).maybeSingle();
  // A finished week is practice only: its winner is already on the post.
  const ranked = !prior && !weekly?.closed;
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
  if (weekly) {
    // The week's post shows who leads; playing earns the weekly bonus XP.
    if (c.feed_post_id) {
      const content = weeklyPostText({ id, weekly, attempts, leaderName: (top?.display_name as string | null) ?? null, leaderScore: (top?.score as number | null) ?? null });
      await admin.from("feed_posts").update({ content }).eq("id", c.feed_post_id);
    }
    await logWeeklyXp(admin, user.id, "weekly_trivia_played", weekly.week).catch(() => {});
    // No chain-letter post per player: the whole community plays this one.
    return { ranked: true, tookLead: top?.user_id === user.id && attempts > 1, chainPost: null };
  }
  if (c.feed_post_id) {
    const { data: creator } = await admin.from("profile_stats").select("display_name").eq("user_id", c.creator_id).maybeSingle();
    const content = challengePostText({
      id,
      creatorName: (creator?.display_name as string | null) || "A Buddy",
      creatorScore: c.creator_score as number,
      deckName: selectionLabel(selectionFromKeys(c.deck_ids as string[])),
      attempts,
      leaderName: (top?.display_name as string | null) ?? null,
      leaderScore: (top?.score as number | null) ?? null,
    });
    await admin.from("feed_posts").update({ content }).eq("id", c.feed_post_id);
  }

  // The chain letter: your own Feed post, automatically, on your first finish.
  // "From" is whoever's link you came in on, when they are in this chain;
  // otherwise the person who started it.
  let chainPost: string | null = null;
  if (user.id !== c.creator_id) {
    const chain = await challengeChain(admin, id);
    const fromId = String(result.from || "");
    const fromRow = chain.find((r) => r.userId === fromId && r.userId !== user.id);
    const { data: creator } = await admin.from("profile_stats").select("display_name").eq("user_id", c.creator_id).maybeSingle();
    const content = chainPostText({
      id,
      name: user.name,
      fromName: fromRow?.name || (creator?.display_name as string | null) || (c.leader_name as string | null) || "a Buddy",
      fromId: fromRow?.userId || (c.creator_id as string),
      userId: user.id,
      deckName: selectionLabel(selectionFromKeys(c.deck_ids as string[])),
      won,
      total: (c.card_ids as string[]).length || 10,
      score,
      chain: chain.map((r) => r.name),
    });
    chainPost = content;
    if (opts.postToFeed !== false) {
      await admin.from("feed_posts").insert({ user_id: user.id, post_type: "thought", content, visibility: "community", reaction_counts: {}, comment_count: 0 });
    }
  }
  return { ranked: true, tookLead: top?.user_id === user.id && attempts > 1, chainPost };
}

/**
 * Pass it on: anyone in the chain (or its starter) sends the same challenge to
 * their own Bible Buddies, with their link, so the chain keeps growing.
 */
export async function passChallenge(admin: SupabaseClient, rawId: string, user: ClueUser, buddyIds: string[]) {
  const id = String(rawId || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 12);
  const { data: c } = await admin.from("clue_challenges").select("id, creator_id").eq("id", id).maybeSingle();
  if (!c) return { error: "This challenge was not found." };
  const chain = await challengeChain(admin, id);
  if (c.creator_id !== user.id && !chain.some((r) => r.userId === user.id)) return { error: "Finish the challenge first, then pass it on." };
  const mine = new Map((await listBuddies(admin, user.id)).map((b) => [b.id, b]));
  const inChain = new Set(chain.map((r) => r.userId));
  const to = [...new Set((buddyIds || []).map(String))].filter((bid) => mine.has(bid) && !inChain.has(bid)).slice(0, 50);
  if (!to.length) return { error: "Pick at least one Buddy who hasn't played it yet." };
  const link = `/bible-study-games/clue/challenge/${id}?from=${user.id}`;
  const { data: already } = await admin.from("notifications").select("user_id").eq("type", "clue_challenge").eq("article_slug", link).in("user_id", to);
  const skip = new Set((already || []).map((r) => r.user_id as string));
  const first = user.name.split(/\s+/)[0];
  const rows = to
    .filter((bid) => !skip.has(bid))
    .map((bid) => ({
      user_id: bid,
      type: "clue_challenge",
      from_user_id: user.id,
      from_user_name: first,
      article_slug: link,
      message: `${first} passed you a Bible Trivia challenge! ${chain.length} ${chain.length === 1 ? "Buddy is" : "Buddies are"} in the chain. Can you beat them?`,
      is_read: false,
    }));
  if (rows.length) {
    const { error } = await admin.from("notifications").insert(rows);
    if (error) return { error: "Could not send the challenge." };
  }
  return { id, sentTo: to.map((bid) => mine.get(bid)!.name.split(/\s+/)[0]) };
}
