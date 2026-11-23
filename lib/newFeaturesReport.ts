/**
 * "Is the new thing working?" for the Features tab on /admin/analytics
 * (Louis, 2026-11-13).
 *
 * One list of recently launched features, each reduced to the same few
 * questions in the same order: how many people saw the way in, how many tried
 * it, how many did the real thing, and how many came back on another day.
 * Each number is given twice - since launch, and inside whatever period the
 * dashboard is showing.
 *
 * Everything counted here is PEOPLE (distinct accounts), not events, unless
 * the label says otherwise: 40 taps by one person is one person.
 *
 * This is not a second dashboard. It is one more block of the existing one:
 * computeDashboard() in lib/adminDashboard.ts calls computeNewFeatures() and
 * returns it as `newFeatures`. If it fails, the dashboard carries on without
 * it.
 *
 * Adding the next feature: add its rows to the loader, add a block to
 * summariseNewFeatures(), and it appears on the tab. The summarising half is
 * a pure function so scripts/verify-new-features-report.ts can check the
 * arithmetic without a database.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

export type FeatureRange = { start: Date; end: Date };

export type FeatureStep = {
  label: string;
  /** Distinct people since launch. */
  allTime: number;
  /** Distinct people inside the dashboard's selected period. */
  period: number;
  /** One plain line on what was counted. */
  hint: string;
};

export type FeatureBreakdownRow = { label: string; value: number };

export type FeatureReport = {
  key: string;
  icon: string;
  title: string;
  /** Where the feature lives, for a link from the admin page. */
  href: string;
  launched: string;
  steps: FeatureStep[];
  /** Extra counts worth seeing, since launch. */
  breakdowns: Array<{ title: string; unit: string; rows: FeatureBreakdownRow[] }>;
};

export type NewFeaturesReport = { features: FeatureReport[] };

// ---------- rows as they come out of the database ----------

export type FeatureEventRow = {
  event_name: string;
  user_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};
export type MemoryVerseRow = { user_id: string; created_at: string; last_practised_at: string | null };
export type ActionRow = { user_id: string | null; action_type: string; created_at: string };
export type WordSearchRow = {
  user_id: string;
  book: string;
  found: string[] | null;
  completed_at: string | null;
  updated_at: string;
};

export type NewFeaturesInput = {
  events: FeatureEventRow[];
  memoryVerses: MemoryVerseRow[];
  actions: ActionRow[];
  wordSearch: WordSearchRow[];
};

// ---------- pure summarising ----------

const inRange = (iso: string | null | undefined, range: FeatureRange) => {
  if (!iso) return false;
  const time = Date.parse(iso);
  return Number.isFinite(time) && time >= range.start.getTime() && time < range.end.getTime();
};

/** The calendar day in Berlin, which is the day the rest of the dashboard uses. */
const berlinDayKey = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin", year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(iso),
  );

type Touch = { user: string; at: string };

const peopleIn = (touches: Touch[], range?: FeatureRange) =>
  new Set(touches.filter((touch) => !range || inRange(touch.at, range)).map((touch) => touch.user)).size;

/**
 * People who used the feature on two or more different days.
 *
 * For the period figure the question is "of the people active in this period,
 * how many have ever been here on another day" - a person's second day counts
 * for the period it falls in. Counting only days inside the period would make
 * "Today" always zero.
 */
function cameBack(touches: Touch[], range?: FeatureRange) {
  // One pass: trivia brings tens of thousands of touches, so no per-user scans.
  const days = new Map<string, Set<string>>();
  const activeInRange = new Set<string>();
  for (const touch of touches) {
    if (!days.has(touch.user)) days.set(touch.user, new Set());
    days.get(touch.user)!.add(touch.at.slice(0, 13)); // hour bucket, cheap
    if (range && inRange(touch.at, range)) activeInRange.add(touch.user);
  }
  let count = 0;
  for (const [user, hours] of days) {
    if (range && !activeInRange.has(user)) continue;
    // Berlin day keys only for people who could have two days at all.
    if (hours.size < 2) continue;
    const berlinDays = new Set([...hours].map((h) => berlinDayKey(`${h}:00:00Z`)));
    if (berlinDays.size < 2) continue;
    count += 1;
  }
  return count;
}

function step(label: string, hint: string, touches: Touch[], range: FeatureRange): FeatureStep {
  return { label, hint, allTime: peopleIn(touches), period: peopleIn(touches, range) };
}

function tally(values: string[], labels: Record<string, string>): FeatureBreakdownRow[] {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()]
    .map(([key, value]) => ({ label: labels[key] || key, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

const SAVE_SOURCES: Record<string, string> = {
  daily_verse_card: "Verse of the Day card",
  daily_verse_popup: "Verse of the Day popup",
  reader: "Bible reader",
  picker: "Picker inside Bible Memory",
  word_search: "Word Search word details",
};

const DISMISS_METHODS: Record<string, string> = {
  close_button: "Close button",
  later: "Maybe later",
  backdrop: "Tapped outside",
  escape: "Escape key",
};

export function summariseNewFeatures(input: NewFeaturesInput, range: FeatureRange): NewFeaturesReport {
  const eventTouches = (name: string, filter?: (row: FeatureEventRow) => boolean): Touch[] =>
    input.events
      .filter((row) => row.event_name === name && row.user_id && (!filter || filter(row)))
      .map((row) => ({ user: row.user_id as string, at: row.created_at }));
  const actionTouches = (type: string): Touch[] =>
    input.actions
      .filter((row) => row.action_type === type && row.user_id)
      .map((row) => ({ user: row.user_id as string, at: row.created_at }));
  const meta = (row: FeatureEventRow, key: string) => String(row.metadata?.[key] ?? "");

  // ----- the popup -----
  const popupShown = eventTouches("new_games_popup_impression");
  const popupClicked = eventTouches("new_games_popup_clicked");
  const popupDismissed = input.events.filter((row) => row.event_name === "new_games_popup_dismissed");
  const popup: FeatureReport = {
    key: "new_games_popup",
    icon: "📣",
    title: "New games popup",
    href: "/dashboard?bb_preview=new_games",
    launched: "13 Nov 2026",
    steps: [
      step("Saw the popup", "People it was shown to. It shows once per account.", popupShown, range),
      step("Tapped a game", "People who chose Bible Memory or Word Search from it.", popupClicked, range),
      step(
        "Chose Bible Memory",
        "Of those, the ones who tapped Bible Memory.",
        eventTouches("new_games_popup_clicked", (row) => meta(row, "game") === "bible_memory"),
        range,
      ),
      step(
        "Chose Word Search",
        "Of those, the ones who tapped Word Search.",
        eventTouches("new_games_popup_clicked", (row) => meta(row, "game") === "word_search"),
        range,
      ),
    ],
    breakdowns: [
      {
        title: "How it was closed",
        unit: "times",
        rows: tally(popupDismissed.map((row) => meta(row, "method") || "unknown"), DISMISS_METHODS),
      },
    ],
  };

  // ----- Bible Memory -----
  const memoryOpened = eventTouches("bible_memory_opened");
  const memorySaved: Touch[] = input.memoryVerses.map((row) => ({ user: row.user_id, at: row.created_at }));
  const memoryPractised: Touch[] = input.memoryVerses
    .filter((row) => row.last_practised_at)
    .map((row) => ({ user: row.user_id, at: row.last_practised_at as string }));
  const memorySessions = actionTouches("bible_memory_session_completed");
  const memoryActivity = [...memoryOpened, ...memorySaved, ...memorySessions];
  const memory: FeatureReport = {
    key: "bible_memory",
    icon: "🧠",
    title: "Bible Memory",
    href: "/bible-study-games/memory",
    launched: "13 Nov 2026",
    steps: [
      step("Opened it", "People who opened the Bible Memory screen. Counted from 13 Nov, when this was added.", memoryOpened, range),
      step("Saved a verse", "People with at least one verse saved, from any button.", memorySaved, range),
      step("Practised", "People who answered at least one question on a saved verse.", memoryPractised, range),
      step("Finished a session", "People who completed all five questions at least once.", memorySessions, range),
      {
        label: "Came back another day",
        hint: "People who opened, saved or practised on two or more different days.",
        allTime: cameBack(memoryActivity),
        period: cameBack(memoryActivity, range),
      },
    ],
    breakdowns: [
      {
        title: "Where verses were saved from",
        unit: "verses",
        rows: tally(
          input.events.filter((row) => row.event_name === "bible_memory_verse_saved").map((row) => meta(row, "source") || "unknown"),
          SAVE_SOURCES,
        ),
      },
      {
        title: "Totals",
        unit: "",
        rows: [
          { label: "Verses saved", value: input.memoryVerses.length },
          { label: "Sessions finished", value: memorySessions.length },
        ],
      },
    ],
  };

  // ----- Bible Word Search -----
  const searchOpened = eventTouches("word_search_opened");
  const searchStarted: Touch[] = input.wordSearch.map((row) => ({ user: row.user_id, at: row.updated_at }));
  const searchFound: Touch[] = input.wordSearch
    .filter((row) => (row.found?.length ?? 0) > 0 || row.completed_at)
    .map((row) => ({ user: row.user_id, at: row.updated_at }));
  const searchCompleted: Touch[] = input.wordSearch
    .filter((row) => row.completed_at)
    .map((row) => ({ user: row.user_id, at: row.completed_at as string }));
  const searchActivity = [...searchOpened, ...searchStarted, ...searchCompleted];
  const wordSearch: FeatureReport = {
    key: "word_search",
    icon: "🔎",
    title: "Bible Word Search",
    href: "/bible-study-games/word-search",
    launched: "13 Nov 2026",
    steps: [
      step("Opened it", "People who opened the list of books. Counted from 13 Nov, when this was added.", searchOpened, range),
      step("Opened a puzzle", "People who opened at least one book's puzzle.", searchStarted, range),
      step("Found a word", "People who found at least one word.", searchFound, range),
      step("Finished a book", "People who completed at least one puzzle.", searchCompleted, range),
      {
        label: "Came back another day",
        hint: "People who opened or played on two or more different days.",
        allTime: cameBack(searchActivity),
        period: cameBack(searchActivity, range),
      },
    ],
    breakdowns: [
      {
        title: "Most opened books",
        unit: "people",
        rows: tally(input.wordSearch.map((row) => row.book), {}).slice(0, 8),
      },
      {
        title: "Totals",
        unit: "",
        rows: [
          { label: "Puzzles opened", value: input.wordSearch.length },
          { label: "Books completed", value: searchCompleted.length },
        ],
      },
    ],
  };

  // ----- Bible Buddy Match (2026-11-22) -----
  const matchOpened = eventTouches("match_opened");
  const matchStarted = eventTouches("match_board_started");
  const matchWon = eventTouches("match_board_won");
  const matchPastTwo = eventTouches("match_board_won", (row) => Number(row.metadata?.number || 0) >= 3);
  const matchActivity = [...matchOpened, ...matchStarted, ...matchWon];
  const ev = (name: string) => input.events.filter((r) => r.event_name === name);
  const boardRows = new Map<string, { started: number; won: number; lost: number; left: number }>();
  for (const name of ["match_board_started", "match_board_won", "match_board_lost", "match_board_left"]) {
    for (const row of ev(name)) {
      const id = `${String(row.metadata?.number ?? "?").padStart(2, "0")} ${meta(row, "title") || meta(row, "board") || "?"}`;
      const e = boardRows.get(id) || { started: 0, won: 0, lost: 0, left: 0 };
      if (name === "match_board_started") e.started += 1;
      else if (name === "match_board_won") e.won += 1;
      else if (name === "match_board_lost") e.lost += 1;
      else e.left += 1;
      boardRows.set(id, e);
    }
  }
  const match: FeatureReport = {
    key: "match",
    icon: "💎",
    title: "Bible Buddy Match",
    href: "/bible-study-games/match",
    launched: "22 Nov 2026",
    steps: [
      step("Opened it", "People who opened Bible Buddy Match.", matchOpened, range),
      step("Started a board", "People who began playing a board.", matchStarted, range),
      step("Won a board", "People who finished at least one board.", matchWon, range),
      step("Got past Eden", "People who won board 3 or later.", matchPastTwo, range),
      {
        label: "Came back another day",
        hint: "People who opened or played on two or more different days.",
        allTime: cameBack(matchActivity),
        period: cameBack(matchActivity, range),
      },
    ],
    breakdowns: [
      {
        title: "Where they play",
        unit: "people",
        rows: tally([...ev("match_opened"), ...ev("match_board_started")].map((r) => meta(r, "platform") || "unknown"), {}),
      },
      {
        title: "Opened from",
        unit: "people",
        rows: tally(ev("match_opened").map((r) => meta(r, "from") || "direct"), {}),
      },
      {
        title: "Boards: started / won / lost / left halfway",
        unit: "",
        rows: [...boardRows.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([board, c]) => ({ label: `${board} (${c.won} won, ${c.lost} lost, ${c.left} left)`, value: c.started })),
      },
      {
        title: "Totals",
        unit: "",
        rows: [
          { label: "Boards started", value: ev("match_board_started").length },
          { label: "Boards won", value: ev("match_board_won").length },
          { label: "Boards lost (out of moves)", value: ev("match_board_lost").length },
          { label: "Boards left halfway", value: ev("match_board_left").length },
          { label: "Power-ups made", value: ev("match_power_made").length },
          { label: "Power-ups set off", value: ev("match_power_used").length },
          { label: "Hints shown (waited too long)", value: ev("match_hint").filter((r) => meta(r, "how") === "idle").length },
          { label: "Hints asked for (sun button)", value: ev("match_hint").filter((r) => meta(r, "how") === "button").length },
        ],
      },
    ],
  };

  // ----- Bible Clue Game (2026-11-22) -----
  const clueOpened = eventTouches("clue_game_opened");
  const clueStarted = eventTouches("clue_game_started");
  const clueCards = input.events.filter((row) => row.event_name === "clue_game_card");
  const clueWonTouches = eventTouches("clue_game_card", (row) => meta(row, "outcome") === "won");
  const clueFinished = eventTouches("clue_game_finished");
  const clueActivity = [...clueOpened, ...clueStarted, ...clueFinished];
  const cardRows = new Map<string, { won: number; missed: number }>();
  for (const row of clueCards) {
    const id = meta(row, "card") || "unknown";
    const entry = cardRows.get(id) || { won: 0, missed: 0 };
    if (meta(row, "outcome") === "won") entry.won += 1;
    else entry.missed += 1;
    cardRows.set(id, entry);
  }
  const clueGame: FeatureReport = {
    key: "clue_game",
    icon: "🃏",
    title: "Bible Trivia (was Bible Clue)",
    href: "/bible-study-games/clue",
    launched: "22 Nov 2026",
    steps: [
      step("Opened it", "People who opened the card table.", clueOpened, range),
      step("Dealt a card", "People who started a game.", clueStarted, range),
      step("Won a card", "People who guessed at least one card right.", clueWonTouches, range),
      step("Finished a game", "People who played until the deck ran out or they reached the target.", clueFinished, range),
      {
        label: "Came back another day",
        hint: "People who opened or played on two or more different days.",
        allTime: cameBack(clueActivity),
        period: cameBack(clueActivity, range),
      },
    ],
    breakdowns: [
      {
        title: "Cards: won / missed",
        unit: "",
        rows: [...cardRows.entries()]
          .map(([card, c]) => ({ label: `${card} (${c.won} won, ${c.missed} missed)`, value: c.won + c.missed }))
          .sort((a, b) => b.value - a.value),
      },
      {
        title: "Totals",
        unit: "",
        rows: [
          { label: "Cards played", value: clueCards.length },
          { label: "Games finished", value: clueFinished.length },
          { label: "Study This Card opened", value: input.events.filter((r) => r.event_name === "clue_game_study_opened").length },
          { label: "Challenges shared to the Feed", value: input.events.filter((r) => r.event_name === "clue_game_challenge_shared").length },
          { label: "Challenge attempts finished", value: input.events.filter((r) => r.event_name === "clue_game_challenge_finished").length },
          { label: "Rooms created", value: input.events.filter((r) => r.event_name === "clue_game_room_created").length },
          { label: "Said they enjoyed it", value: input.events.filter((r) => r.event_name === "clue_game_feedback" && r.metadata?.enjoyed === true).length },
          { label: "Said they did not", value: input.events.filter((r) => r.event_name === "clue_game_feedback" && r.metadata?.enjoyed === false).length },
          { label: "Want more books", value: input.events.filter((r) => r.event_name === "clue_game_feedback" && r.metadata?.want_more_decks === true).length },
        ],
      },
    ],
  };

  // ----- Bible Trivia (older than this tab; added so every game is here) -----
  const triviaStarted = actionTouches("trivia_started");
  const triviaAnswered = actionTouches("trivia_question_answered");
  const triviaChapter = actionTouches("trivia_chapter_completed");
  const triviaYear = actionTouches("bible_in_one_year_trivia_completed");
  const triviaActivity = [...triviaStarted, ...triviaAnswered, ...triviaChapter, ...triviaYear];
  const trivia: FeatureReport = {
    key: "trivia",
    icon: "❓",
    title: "Bible Trivia",
    href: "/bible-trivia",
    launched: "before Nov 2026",
    steps: [
      step("Started trivia", "People who opened a chapter's or a plan day's trivia.", triviaStarted, range),
      step("Answered a question", "People who answered at least one question.", triviaAnswered, range),
      step("Finished a chapter", "People who completed a chapter's trivia.", triviaChapter, range),
      step("Finished Bible in One Year trivia", "People who completed a plan day's trivia.", triviaYear, range),
      {
        label: "Came back another day",
        hint: "People who played on two or more different days.",
        allTime: cameBack(triviaActivity),
        period: cameBack(triviaActivity, range),
      },
    ],
    breakdowns: [
      {
        title: "Totals",
        unit: "",
        rows: [
          { label: "Questions answered", value: triviaAnswered.length },
          { label: "Chapters finished", value: triviaChapter.length },
        ],
      },
    ],
  };

  // ----- Scrambled -----
  const scrambledOpened = actionTouches("scrambled_chapter_opened");
  const scrambledDone = actionTouches("scrambled_chapter_completed");
  const scrambledActivity = [...actionTouches("scrambled_book_viewed"), ...scrambledOpened, ...scrambledDone];
  const scrambled: FeatureReport = {
    key: "scrambled",
    icon: "🔤",
    title: "Scrambled",
    href: "/bible-study-games/scrambled",
    launched: "Sep 2026",
    steps: [
      step("Opened a book", "People who opened a book's list of chapters.", actionTouches("scrambled_book_viewed"), range),
      step("Started a chapter", "People who opened a chapter to unscramble.", scrambledOpened, range),
      step("Finished a chapter", "People who completed a chapter.", scrambledDone, range),
      {
        label: "Came back another day",
        hint: "People who played on two or more different days.",
        allTime: cameBack(scrambledActivity),
        period: cameBack(scrambledActivity, range),
      },
    ],
    breakdowns: [
      {
        title: "Totals",
        unit: "",
        rows: [
          { label: "Chapters started", value: scrambledOpened.length },
          { label: "Chapters finished", value: scrambledDone.length },
        ],
      },
    ],
  };

  return { features: [match, clueGame, trivia, scrambled, memory, wordSearch, popup] };
}

// ---------- loading ----------

/** Every event name this report reads. Kept beside the summary so they cannot drift. */
export const FEATURE_EVENT_NAMES = [
  "new_games_popup_impression",
  "new_games_popup_clicked",
  "new_games_popup_dismissed",
  "bible_memory_opened",
  "bible_memory_verse_saved",
  "word_search_opened",
  "clue_game_opened",
  "clue_game_started",
  "clue_game_card",
  "clue_game_finished",
  "clue_game_study_opened",
  "clue_game_challenge_shared",
  "clue_game_challenge_finished",
  "clue_game_room_created",
  "clue_game_feedback",
  "match_opened",
  "match_board_started",
  "match_board_won",
  "match_board_lost",
  "match_board_left",
  "match_power_made",
  "match_power_used",
  "match_hint",
];

const FEATURE_ACTION_TYPES = [
  "bible_memory_session_completed",
  "word_search_book_completed",
  // Every game is on the tab (Louis, 2026-11-22: "the other games should be
  // tracking also"): trivia and Scrambled already logged these.
  "trivia_started",
  "trivia_question_answered",
  "trivia_chapter_completed",
  "bible_in_one_year_trivia_completed",
  "scrambled_book_viewed",
  "scrambled_chapter_opened",
  "scrambled_chapter_completed",
];

/**
 * Every row, however many: PostgREST caps a response at 1,000 rows, so a
 * single select would quietly stop counting the day a feature gets popular.
 */
async function everyRow<T>(
  admin: SupabaseClient,
  table: string,
  columns: string,
  // The query builder's generics do not survive being passed around.
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

export async function computeNewFeatures(admin: SupabaseClient, range: FeatureRange): Promise<NewFeaturesReport> {
  const [events, memoryVerses, actions, wordSearch] = await Promise.all([
    everyRow<FeatureEventRow>(
      admin,
      "landing_page_events",
      "event_name, user_id, metadata, created_at",
      (query) => query.in("event_name", FEATURE_EVENT_NAMES),
      "created_at",
    ),
    everyRow<MemoryVerseRow>(admin, "memory_verses", "user_id, created_at, last_practised_at", (query) => query, "created_at"),
    everyRow<ActionRow>(
      admin,
      "master_actions",
      "user_id, action_type, created_at",
      (query) => query.in("action_type", FEATURE_ACTION_TYPES),
      "created_at",
    ),
    everyRow<WordSearchRow>(admin, "word_search_progress", "user_id, book, found, completed_at, updated_at", (query) => query, "updated_at"),
  ]);
  return summariseNewFeatures({ events, memoryVerses, actions, wordSearch }, range);
}
