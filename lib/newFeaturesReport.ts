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
  const days = new Map<string, Set<string>>();
  for (const touch of touches) {
    if (!days.has(touch.user)) days.set(touch.user, new Set());
    days.get(touch.user)!.add(berlinDayKey(touch.at));
  }
  let count = 0;
  for (const [user, set] of days) {
    if (set.size < 2) continue;
    if (range && !touches.some((touch) => touch.user === user && inRange(touch.at, range))) continue;
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

  return { features: [popup, memory, wordSearch] };
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
];

const FEATURE_ACTION_TYPES = ["bible_memory_session_completed", "word_search_book_completed"];

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
