/**
 * The Features tab on /admin/analytics: the counting, checked offline.
 *
 *   npm run verify:new-features
 *
 * No database. It feeds lib/newFeaturesReport.ts a small made-up history and
 * checks every number by hand, then checks that each event the report reads
 * is one the app really sends and the analytics route really accepts.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { FEATURE_EVENT_NAMES, summariseNewFeatures, type NewFeaturesInput } from "../lib/newFeaturesReport";

let passed = 0;
function check(label: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok ${label}`);
}

// Berlin is UTC+1 in November, so 10:00Z is 11:00 the same day there.
const day = (d: number, hour = 10) => `2026-11-${String(d).padStart(2, "0")}T${String(hour).padStart(2, "0")}:00:00.000Z`;
const event = (name: string, user: string | null, at: string, metadata: Record<string, unknown> = {}) => ({
  event_name: name,
  user_id: user,
  metadata,
  created_at: at,
});

const input: NewFeaturesInput = {
  events: [
    // Popup: ann, bob, cat and dan saw it. ann tapped Memory twice (one person), bob tapped Word Search.
    event("new_games_popup_impression", "ann", day(13)),
    event("new_games_popup_impression", "bob", day(13)),
    event("new_games_popup_impression", "cat", day(14)),
    event("new_games_popup_impression", "dan", day(14)),
    event("new_games_popup_clicked", "ann", day(13), { game: "bible_memory" }),
    event("new_games_popup_clicked", "ann", day(13, 11), { game: "bible_memory" }),
    event("new_games_popup_clicked", "bob", day(13), { game: "word_search" }),
    event("new_games_popup_dismissed", "cat", day(14), { method: "close_button" }),
    event("new_games_popup_dismissed", "dan", day(14), { method: "later" }),
    // A row with no account is never a person.
    event("new_games_popup_impression", null, day(14)),
    // Bible Memory: ann opened on two days, eve opened once and left.
    event("bible_memory_opened", "ann", day(13)),
    event("bible_memory_opened", "ann", day(15)),
    event("bible_memory_opened", "eve", day(14)),
    event("bible_memory_verse_saved", "ann", day(13), { source: "daily_verse_card" }),
    event("bible_memory_verse_saved", "ann", day(13), { source: "reader" }),
    event("bible_memory_verse_saved", "bob", day(14), { source: "reader" }),
    // Word Search: bob opened the list, fay opened and left.
    event("word_search_opened", "bob", day(13)),
    event("word_search_opened", "fay", day(14)),
  ],
  memoryVerses: [
    { user_id: "ann", created_at: day(13), last_practised_at: day(13, 12) },
    { user_id: "ann", created_at: day(13), last_practised_at: null },
    { user_id: "bob", created_at: day(14), last_practised_at: null },
  ],
  actions: [
    { user_id: "ann", action_type: "bible_memory_session_completed", created_at: day(13, 12) },
    { user_id: "ann", action_type: "bible_memory_session_completed", created_at: day(15, 12) },
    { user_id: "bob", action_type: "word_search_book_completed", created_at: day(13, 12) },
  ],
  wordSearch: [
    { user_id: "bob", book: "genesis", found: [], completed_at: day(13, 12), updated_at: day(13, 12) },
    { user_id: "bob", book: "ruth", found: ["RUTH"], completed_at: null, updated_at: day(16) },
    { user_id: "gus", book: "genesis", found: [], completed_at: null, updated_at: day(14) },
  ],
};

// "This period" = 14 November only, in Berlin.
const period = { start: new Date("2026-11-13T23:00:00.000Z"), end: new Date("2026-11-14T23:00:00.000Z") };
const report = summariseNewFeatures(input, period);
const feature = (key: string) => {
  const found = report.features.find((entry) => entry.key === key);
  assert.ok(found, `${key} is in the report`);
  return found;
};
const step = (key: string, label: string) => {
  const found = feature(key).steps.find((entry) => entry.label === label);
  assert.ok(found, `${key} has a "${label}" step`);
  return [found.allTime, found.period];
};
const breakdown = (key: string, title: string) =>
  Object.fromEntries((feature(key).breakdowns.find((entry) => entry.title === title)?.rows || []).map((row) => [row.label, row.value]));

check("three features, in launch order, each with steps and a place to open it", () => {
  assert.deepEqual(report.features.map((entry) => entry.key), ["new_games_popup", "bible_memory", "word_search"]);
  for (const entry of report.features) {
    assert.ok(entry.steps.length >= 4);
    assert.ok(entry.href.startsWith("/"));
    for (const each of entry.steps) assert.ok(each.hint.length > 10, `${entry.key} / ${each.label} explains itself`);
  }
});

check("popup: people, not taps - and a row with no account is nobody", () => {
  assert.deepEqual(step("new_games_popup", "Saw the popup"), [4, 2]);
  assert.deepEqual(step("new_games_popup", "Tapped a game"), [2, 0]);
  assert.deepEqual(step("new_games_popup", "Chose Bible Memory"), [1, 0]);
  assert.deepEqual(step("new_games_popup", "Chose Word Search"), [1, 0]);
  assert.deepEqual(breakdown("new_games_popup", "How it was closed"), { "Close button": 1, "Maybe later": 1 });
});

check("Bible Memory: opened, saved, practised, finished, came back", () => {
  assert.deepEqual(step("bible_memory", "Opened it"), [2, 1]);
  assert.deepEqual(step("bible_memory", "Saved a verse"), [2, 1]);
  assert.deepEqual(step("bible_memory", "Practised"), [1, 0]);
  assert.deepEqual(step("bible_memory", "Finished a session"), [1, 0]);
  // ann was there on the 13th and the 15th. Nobody active on the 14th has a second day.
  assert.deepEqual(step("bible_memory", "Came back another day"), [1, 0]);
  assert.deepEqual(breakdown("bible_memory", "Where verses were saved from"), { "Bible reader": 2, "Verse of the Day card": 1 });
  assert.deepEqual(breakdown("bible_memory", "Totals"), { "Verses saved": 3, "Sessions finished": 2 });
});

check("Word Search: a finished book counts as a found word even after Play again empties the grid", () => {
  assert.deepEqual(step("word_search", "Opened it"), [2, 1]);
  assert.deepEqual(step("word_search", "Opened a puzzle"), [2, 1]);
  assert.deepEqual(step("word_search", "Found a word"), [1, 0]);
  assert.deepEqual(step("word_search", "Finished a book"), [1, 0]);
  // bob: the 13th and the 16th.
  assert.deepEqual(step("word_search", "Came back another day"), [1, 0]);
  assert.deepEqual(breakdown("word_search", "Most opened books"), { genesis: 2, ruth: 1 });
});

check("coming back is counted in the period the person is active in, so Today is not always zero", () => {
  const onThe15th = { start: new Date("2026-11-14T23:00:00.000Z"), end: new Date("2026-11-15T23:00:00.000Z") };
  const later = summariseNewFeatures(input, onThe15th);
  const memory = later.features.find((entry) => entry.key === "bible_memory");
  assert.equal(memory?.steps.find((entry) => entry.label === "Came back another day")?.period, 1);
});

check("an empty history is a report of zeros, not a crash", () => {
  const empty = summariseNewFeatures({ events: [], memoryVerses: [], actions: [], wordSearch: [] }, period);
  assert.equal(empty.features.length, 3);
  for (const entry of empty.features) for (const each of entry.steps) assert.deepEqual([each.allTime, each.period], [0, 0]);
});

check("every event the report reads is sent by the app and accepted by the analytics route", () => {
  const root = path.resolve(__dirname, "..");
  const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
  const route = read("app/api/landing-analytics/route.ts");
  const senders = ["components/NewGamesPopup.tsx", "lib/featureEvents.ts", "lib/bibleMemory.ts", "components/memory/BibleMemoryHome.tsx", "components/wordsearch/WordSearchBooks.tsx"]
    .map(read)
    .join("\n");
  for (const name of FEATURE_EVENT_NAMES) {
    assert.ok(route.includes(`"${name}"`), `${name} is in ALLOWED_EVENTS`);
    assert.ok(senders.includes(`"${name}"`), `${name} is sent somewhere`);
  }
  assert.ok(read("lib/adminDashboard.ts").includes("newFeatures,"), "the dashboard returns the report");
  assert.ok(read("components/admin/AnalyticsDashboardView.tsx").includes('{ key: "features", label: "Features" }'));
});

console.log(`\n${passed} checks passed`);
