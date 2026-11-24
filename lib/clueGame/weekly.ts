/**
 * Weekly Bible Trivia (Louis, 2026-11-24): one game a week for the whole
 * community. Bible Buddy posts it on the Feed every Tuesday at 12:00 New York
 * time, it stays pinned at the top until the next one, and everyone plays the
 * same 10 questions. Highest score when the next one posts is the winner, and
 * that is written onto the old post.
 *
 * It replaces the weekly group trivia (lib/groupWeeklyTrivia.ts, 7 fixed sets
 * posted into the study group, which is closed). Its Tuesday cron entry was
 * removed from vercel.json the same day, so the two never run side by side.
 *
 * A week IS a Bible Trivia challenge (clue_challenges, settings.weekly), so the
 * game, the leaderboard and the Feed card are the challenge ones.
 *
 * Themes are filters over the question bank, not fixed sets (Louis: "if we say
 * the 12 disciples, you can have hundreds of questions ... that could be like
 * 100 different times"). A theme comes back only after every other theme has
 * had its week (least recently used first), and its 10 questions are ones it
 * has not used before until its pool runs out. The pools grow on their own as
 * the question writer fills the bank toward 45 a chapter.
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { WEEKLY_SETTINGS, type BankItem } from "./engine";
import { BIBLE_BUDDY_USER_ID } from "../bibleBuddyAccount";

export type WeeklyTheme = {
  key: string;
  title: string;
  /** One line on the Feed card and in the popup. */
  intro: string;
  /** Books, each all chapters or [from, to]. */
  books: Array<[string, number?, number?]>;
  /** When set, a question must mention one of these (question or right answer). */
  words?: RegExp;
};

const GOSPELS: Array<[string]> = [["matthew"], ["mark"], ["luke"], ["john"]];

export const WEEKLY_THEMES: WeeklyTheme[] = [
  {
    key: "twelve_disciples",
    title: "The 12 Disciples",
    intro: "The men Jesus called to follow Him: Peter, Andrew, James, John and the rest.",
    books: [...GOSPELS, ["acts", 1, 12]],
    words: /\b(Peter|Andrew|Philip|Bartholomew|Nathanael|Thomas|Matthew|Levi|Judas|Iscariot|Thaddaeus|Lebbaeus|Simon|Zebedee|Alphaeus|disciples?|apostles?|the twelve|Matthias)\b/i,
  },
  { key: "life_of_jesus", title: "The Life of Jesus", intro: "From the manger in Bethlehem to the empty tomb.", books: GOSPELS },
  {
    key: "miracles_of_jesus",
    title: "Miracles of Jesus",
    intro: "Water into wine, the blind who saw, the storm that went still.",
    books: GOSPELS,
    words: /\b(heal(ed|s|ing)?|blind|lepers?|leprosy|lame|palsy|raised?|five thousand|four thousand|loaves|fishes|wine|storm|wind|walk(ed)? on|fever|devils?|unclean spirit|dead|miracles?|whole|sight|withered)\b/i,
  },
  {
    key: "parables",
    title: "The Parables",
    intro: "The stories Jesus told: seeds, sheep, coins, sons and a good Samaritan.",
    books: GOSPELS,
    words: /\b(parables?|sower|seed|mustard|leaven|talents?|virgins|prodigal|Samaritan|lost sheep|piece of silver|vineyard|husbandm[ae]n|pearl|net|tares|wedding|supper|steward|fig tree|Lazarus)\b/i,
  },
  { key: "creation", title: "Creation and the Garden", intro: "Six days, a garden called Eden, and the first man and woman.", books: [["genesis", 1, 3]] },
  { key: "noah", title: "Noah and the Flood", intro: "The ark, the animals, forty days of rain and a rainbow.", books: [["genesis", 6, 9]] },
  { key: "abraham", title: "The Story of Abraham", intro: "The call, the promise, the stars and the son.", books: [["genesis", 12, 25]] },
  { key: "joseph", title: "The Story of Joseph", intro: "The coat, the pit, the prison and the palace.", books: [["genesis", 37, 50]] },
  { key: "genesis", title: "The Book of Genesis", intro: "The book of beginnings, from Adam to Joseph.", books: [["genesis"]] },
  { key: "moses", title: "Moses and the Exodus", intro: "The burning bush, the plagues and the Red Sea.", books: [["exodus", 1, 20]] },
  { key: "wilderness", title: "Forty Years in the Wilderness", intro: "Manna, quail, the bronze serpent and the long road to the promised land.", books: [["exodus", 15, 18], ["numbers"]] },
  { key: "joshua_judges", title: "Heroes of Joshua and Judges", intro: "Jericho, Gideon, Deborah and Samson.", books: [["joshua"], ["judges"]] },
  {
    key: "women_of_the_bible",
    title: "Women of the Bible",
    intro: "Sarah, Ruth, Esther, Hannah, Mary and the women who shaped the story.",
    books: [["genesis"], ["exodus"], ["joshua"], ["judges"], ["ruth"], ["1-samuel"], ["2-samuel"], ["1-kings"], ["2-kings"], ["esther"], ["matthew"], ["mark"], ["luke"], ["john"], ["acts"]],
    words: /\b(Eve|Sarah|Sarai|Hagar|Rebekah|Rachel|Leah|Dinah|Tamar|Miriam|Jochebed|Zipporah|Rahab|Deborah|Jael|Delilah|Ruth|Naomi|Orpah|Hannah|Abigail|Michal|Bathsheba|Jezebel|Huldah|Esther|Vashti|Mary|Martha|Elisabeth|Elizabeth|Anna|Lydia|Priscilla|Dorcas|Tabitha|Sapphira|Rhoda|widow|woman|women|wife|daughter|queen|mother)\b/i,
  },
  { key: "ruth_esther", title: "Ruth and Esther", intro: "Loyalty in the fields of Bethlehem and courage in the palace of Persia.", books: [["ruth"], ["esther"]] },
  { key: "david", title: "The Life of David", intro: "The shepherd, the giant, the king and the psalms.", books: [["1-samuel", 16, 31], ["2-samuel"]] },
  {
    key: "kings_of_israel",
    title: "Kings of Israel",
    intro: "Saul, David, Solomon and the kings who came after them.",
    books: [["1-samuel", 8, 31], ["2-samuel"], ["1-kings"], ["2-kings"]],
    words: /\b(kings?|reign(ed)?|throne|crown(ed)?|anoint(ed)?|Saul|David|Solomon|Rehoboam|Jeroboam|Ahab|Jehu|Hezekiah|Josiah|Asa|Jehoshaphat|Joash|Manasseh|Uzziah|Zedekiah)\b/i,
  },
  { key: "elijah_elisha", title: "Elijah and Elisha", intro: "Fire on Carmel, a chariot of fire and a double portion.", books: [["1-kings", 17, 22], ["2-kings", 1, 13]] },
  {
    key: "prophets",
    title: "The Prophets",
    intro: "The men God sent to speak for Him, from Samuel to Malachi.",
    books: [["1-samuel"], ["1-kings"], ["2-kings"], ["isaiah"], ["jeremiah"], ["ezekiel"], ["daniel"], ["hosea"], ["joel"], ["amos"], ["obadiah"], ["jonah"], ["micah"], ["nahum"], ["habakkuk"], ["zephaniah"], ["haggai"], ["zechariah"], ["malachi"]],
    words: /\b(prophets?|prophes(y|ied)|Samuel|Nathan|Elijah|Elisha|Isaiah|Jeremiah|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|vision|word of the LORD|thus saith)\b/i,
  },
  { key: "daniel", title: "The Book of Daniel", intro: "The lions' den, the fiery furnace and the writing on the wall.", books: [["daniel"]] },
  { key: "jonah_minor_prophets", title: "Jonah and the Minor Prophets", intro: "Twelve short books, one great fish.", books: [["hosea"], ["joel"], ["amos"], ["obadiah"], ["jonah"], ["micah"], ["nahum"], ["habakkuk"], ["zephaniah"], ["haggai"], ["zechariah"], ["malachi"]] },
  { key: "job", title: "The Story of Job", intro: "Everything lost, three friends and the voice from the whirlwind.", books: [["job"]] },
  { key: "psalms", title: "The Psalms", intro: "The songs and prayers of God's people.", books: [["psalms"]] },
  { key: "wisdom", title: "Proverbs and Wisdom", intro: "Proverbs, Ecclesiastes and the beginning of wisdom.", books: [["proverbs"], ["ecclesiastes"]] },
  { key: "birth_of_jesus", title: "The Birth of Jesus", intro: "Angels, shepherds, wise men and a baby in a manger.", books: [["matthew", 1, 2], ["luke", 1, 2]] },
  { key: "last_week_of_jesus", title: "The Last Week of Jesus", intro: "Palm Sunday, the Last Supper, the cross and the empty tomb.", books: [["matthew", 21, 28], ["mark", 11, 16], ["luke", 19, 24], ["john", 12, 21]] },
  { key: "early_church", title: "The Early Church", intro: "Pentecost, Peter, Stephen and the church on the move.", books: [["acts", 1, 12]] },
  {
    key: "paul",
    title: "The Journeys of Paul",
    intro: "The Damascus road, the shipwreck and the letters to the churches.",
    books: [["acts", 9, 28], ["romans"], ["1-corinthians"], ["2-corinthians"], ["galatians"], ["ephesians"], ["philippians"], ["colossians"], ["1-thessalonians"], ["2-thessalonians"], ["1-timothy"], ["2-timothy"], ["titus"], ["philemon"]],
  },
  { key: "revelation", title: "The Book of Revelation", intro: "Patmos, the seven churches and the New Jerusalem.", books: [["revelation"]] },
];

/** A question that only makes sense inside its chapter ("in this chapter"). */
const NEEDS_CONTEXT = /\b(this|these) (chapter|psalm|passage|verses?|proverb)\b/i;

/** The theme's whole pool, easiest first within the bank's order. */
export function themePool(theme: WeeklyTheme, bank: Iterable<BankItem>): BankItem[] {
  const out: BankItem[] = [];
  for (const q of bank) {
    const inBook = theme.books.some(([book, from, to]) => q.book === book && (from == null || (q.chapter >= from && q.chapter <= (to ?? from))));
    if (!inBook) continue;
    if (NEEDS_CONTEXT.test(q.question)) continue;
    if (theme.words && !theme.words.test(`${q.question} ${q.answerText}`)) continue;
    out.push(q);
  }
  return out;
}

const LEVEL_ORDER = { beginner: 0, medium: 1, hard: 2 } as const;


/**
 * Ten questions, not used by this theme before while any are left: 7 easy and
 * 3 medium, never hard. The first week ran 4/4/2 and Louis got 4 right
 * (2026-11-24: "very hard.. to hard.. make it easier"); a game the whole
 * community plays should be one most people can do well in.
 */
export function drawWeek(pool: BankItem[], used: Set<string>, seed: number): BankItem[] {
  let rand = seed >>> 0 || 1;
  const next = () => ((rand = (rand * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const shuffle = <T,>(list: T[]) => {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const fresh = pool.filter((q) => !used.has(q.id));
  const from = fresh.length >= 10 ? fresh : pool;
  const byLevel = (level: keyof typeof LEVEL_ORDER) => shuffle(from.filter((q) => q.level === level));
  const picked: BankItem[] = [...byLevel("beginner").slice(0, 7), ...byLevel("medium").slice(0, 3)];
  // Not enough of a level: fill from the rest, easiest first.
  for (const q of shuffle(from).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])) {
    if (picked.length >= 10) break;
    if (!picked.includes(q)) picked.push(q);
  }
  return picked.slice(0, 10).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]);
}

/** The theme for the coming week: never played, else the one played longest ago. */
export function nextTheme(history: Array<{ key: string; week: string }>, playable: (t: WeeklyTheme) => boolean): WeeklyTheme {
  const last = new Map<string, string>();
  for (const h of history) if (!last.has(h.key) || last.get(h.key)! < h.week) last.set(h.key, h.week);
  const options = WEEKLY_THEMES.filter(playable);
  const never = options.find((t) => !last.has(t.key));
  if (never) return never;
  return options.slice().sort((a, b) => (last.get(a.key)! < last.get(b.key)! ? -1 : 1))[0];
}

/* ---------- the week ---------- */

/** Weeks start Tuesday at 12:00 in New York. */
const ZONE = "America/New_York";

function nyParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: ZONE, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false, weekday: "short" }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { y: get("year"), m: get("month"), d: get("day"), hour: Number(get("hour")) % 24, weekday: get("weekday") };
}

/** Is it Tuesday, 12:00 or later, in New York? The only time a week is posted. */
export function isPostingTime(now: Date): boolean {
  const p = nyParts(now);
  return p.weekday === "Tue" && p.hour >= 12;
}

/** "2026-11-24": the New York date of the Tuesday this week started. */
export function weekKeyFor(now: Date): string {
  // Walk back to the most recent Tuesday 12:00 New York at or before now.
  for (let back = 0; back <= 8; back++) {
    const t = new Date(now.getTime() - back * 24 * 3_600_000);
    const p = nyParts(t);
    if (p.weekday === "Tue" && (back > 0 || p.hour >= 12)) return `${p.y}-${p.m}-${p.d}`;
  }
  const p = nyParts(now);
  return `${p.y}-${p.m}-${p.d}`;
}

export type WeeklyInfo = {
  key: string;
  title: string;
  intro: string;
  week: string;
  closed?: boolean;
  winner?: { userId: string; name: string; score: number } | null;
};

export const WEEKLY_HEADLINE = "🏆 Weekly Bible Trivia:";
const SITE = "https://www.mybiblebuddy.net";

/**
 * The Feed post. components/feed/ClueChallengePost.tsx reads this exact text,
 * and app/bb-feed pins the open one (headline starts with WEEKLY_HEADLINE and
 * there is no winner line yet).
 */
export function weeklyPostText(c: { id: string; weekly: WeeklyInfo; attempts: number; leaderName: string | null; leaderScore: number | null }) {
  const w = c.weekly;
  const lines = [`${WEEKLY_HEADLINE} ${w.title}`, "", `${w.intro} Everyone plays the same 10 questions. Highest score by next Tuesday wins.`];
  if (c.attempts > 0 && c.leaderName && c.leaderScore !== null) {
    lines.push("", `${c.attempts} ${c.attempts === 1 ? "Buddy has" : "Buddies have"} played. ${c.leaderName} leads with ${c.leaderScore}.`);
  }
  if (w.closed) {
    lines.push("", w.winner ? `🥇 Winner: ${w.winner.name} with ${w.winner.score}!` : "🥇 Winner: nobody played this week.");
  }
  lines.push("", `[${w.closed ? "Play it for practice" : "Play this week's trivia"}](${SITE}/bible-study-games/clue/challenge/${c.id})`);
  return lines.join("\n");
}

/** XP for playing (once a week) and for winning a week. Weights in lib/levelSystem.ts. */
export async function logWeeklyXp(admin: SupabaseClient, userId: string, type: "weekly_trivia_played" | "weekly_trivia_won", week: string) {
  const { data: already } = await admin.from("master_actions").select("id").eq("user_id", userId).eq("action_type", type).eq("action_label", week).limit(1);
  if (already?.length) return;
  const { data: p } = await admin.from("profile_stats").select("username").eq("user_id", userId).maybeSingle();
  await admin.from("master_actions").insert({ user_id: userId, action_type: type, action_label: week, username: (p?.username as string | null) ?? null });
}

type WeeklyRow = { id: string; card_ids: string[]; settings: { weekly?: WeeklyInfo } & Record<string, unknown>; feed_post_id: string | null; attempts: number; leader_name: string | null; leader_score: number | null; created_at: string };

async function weeklyRows(admin: SupabaseClient): Promise<WeeklyRow[]> {
  const { data } = await admin
    .from("clue_challenges")
    .select("id, card_ids, settings, feed_post_id, attempts, leader_name, leader_score, created_at")
    .eq("creator_id", BIBLE_BUDDY_USER_ID)
    .like("source_round_id", "weekly-%")
    .order("created_at", { ascending: false })
    .limit(500);
  return ((data || []) as WeeklyRow[]).filter((r) => r.settings?.weekly);
}

/** The week that is open now, if there is one. */
export async function currentWeekly(admin: SupabaseClient) {
  const rows = await weeklyRows(admin);
  const open = rows.find((r) => !r.settings.weekly!.closed);
  return open ? { id: open.id, feedPostId: open.feed_post_id, weekly: open.settings.weekly!, attempts: open.attempts } : null;
}

/** Ends a week: the winner (highest first score, earliest on a tie) goes on its post and gets the bonus XP. */
async function closeWeek(admin: SupabaseClient, row: WeeklyRow) {
  const { data: top } = await admin
    .from("clue_challenge_attempts")
    .select("user_id, display_name, score")
    .eq("challenge_id", row.id)
    .eq("ranked", true)
    .order("score", { ascending: false })
    .order("finished_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  const winner = top ? { userId: top.user_id as string, name: String(top.display_name || "Buddy"), score: Number(top.score) } : null;
  const weekly: WeeklyInfo = { ...row.settings.weekly!, closed: true, winner };
  await admin.from("clue_challenges").update({ settings: { ...row.settings, weekly } }).eq("id", row.id);
  if (row.feed_post_id) {
    const content = weeklyPostText({ id: row.id, weekly, attempts: row.attempts, leaderName: row.leader_name, leaderScore: row.leader_score });
    await admin.from("feed_posts").update({ content }).eq("id", row.feed_post_id);
  }
  if (winner) await logWeeklyXp(admin, winner.userId, "weekly_trivia_won", weekly.week);
  return winner;
}

/**
 * Posts this week's trivia if it is not up yet, after closing last week's.
 * Safe to call more than once: one row per week (source_round_id weekly-<week>).
 */
export async function ensureWeeklyTrivia(admin: SupabaseClient, bank: Iterable<BankItem>, now = new Date(), opts: { themeKey?: string } = {}) {
  const week = weekKeyFor(now);
  const rows = await weeklyRows(admin);
  const existing = rows.find((r) => r.settings.weekly!.week === week);
  if (existing) return { created: false, id: existing.id, week, title: existing.settings.weekly!.title };

  const closed = [];
  for (const row of rows.filter((r) => !r.settings.weekly!.closed)) closed.push(await closeWeek(admin, row));

  const items = [...bank];
  const pools = new Map(WEEKLY_THEMES.map((t) => [t.key, themePool(t, items)]));
  const history = rows.map((r) => ({ key: r.settings.weekly!.key, week: r.settings.weekly!.week }));
  const forced = opts.themeKey ? WEEKLY_THEMES.find((t) => t.key === opts.themeKey) : undefined;
  const theme = forced ?? nextTheme(history, (t) => (pools.get(t.key)?.length ?? 0) >= 10);
  const used = new Set(rows.filter((r) => r.settings.weekly!.key === theme.key).flatMap((r) => r.card_ids));
  const seed = Number(week.replace(/-/g, "")) || Date.now();
  const cards = drawWeek(pools.get(theme.key) || [], used, seed);
  if (cards.length < 10) return { error: `Not enough questions for ${theme.title}.` };

  const weekly: WeeklyInfo = { key: theme.key, title: theme.title, intro: theme.intro, week };
  const id = `W${week.replace(/-/g, "").slice(2)}`; // W261124
  const { error } = await admin.from("clue_challenges").insert({
    id,
    creator_id: BIBLE_BUDDY_USER_ID,
    source_round_id: `weekly-${week}`,
    deck_ids: [theme.books[0][0]],
    card_ids: cards.map((c) => c.id),
    top_clue: {},
    settings: { answerSeconds: WEEKLY_SETTINGS.answerSeconds, revealSeconds: 4, speed: true, weekly },
    creator_score: 0,
    creator_won: 0,
    attempts: 0,
    leader_id: BIBLE_BUDDY_USER_ID,
    leader_name: "Bible Buddy",
    leader_score: 0,
  });
  if (error) {
    const again = (await weeklyRows(admin)).find((r) => r.settings.weekly!.week === week);
    if (again) return { created: false, id: again.id, week, title: again.settings.weekly!.title };
    return { error: error.message };
  }
  const content = weeklyPostText({ id, weekly, attempts: 0, leaderName: null, leaderScore: null });
  const { data: post } = await admin
    .from("feed_posts")
    .insert({ user_id: BIBLE_BUDDY_USER_ID, post_type: "thought", content, visibility: "community", reaction_counts: {}, comment_count: 0 })
    .select("id")
    .single();
  if (post?.id) await admin.from("clue_challenges").update({ feed_post_id: post.id }).eq("id", id);
  return { created: true, id, week, title: theme.title, closedWinners: closed };
}
