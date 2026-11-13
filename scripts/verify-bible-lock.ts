/**
 * Bible Lock: what gives the phone back, and that every finished activity
 * says so through the one shared list.
 *
 *   npm run verify:bible-lock
 *
 * Offline. It reads the source and runs the pure parts. It cannot run the
 * lock itself - that is Apple's Screen Time, on an iPhone - so the last mile
 * (the shield actually lifting) is not something this proves.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ACTION_TYPE, type ActionType } from "../lib/actionTypes";
import {
  BIBLE_LOCK_ACTIVITIES,
  BIBLE_LOCK_CHOICES,
  UNLOCKING_ACTIONS,
  UNLOCKING_ACTIONS_SUMMARY,
  bibleLockActivityCompleted,
} from "../lib/bibleLockActivities";

let passed = 0;
function check(label: string, fn: () => void) {
  try {
    fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (error) {
    console.error(`FAIL  ${label}`);
    console.error(error);
    process.exitCode = 1;
  }
}
const read = (path: string) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");
const count = (text: string, needle: string) => text.split(needle).length - 1;

console.log("\nThe list");

check("every entry is a real action type, and none is listed twice", () => {
  const real = new Set<string>(Object.values(ACTION_TYPE));
  const seen = new Set<string>();
  for (const activity of BIBLE_LOCK_ACTIVITIES) {
    assert.ok(real.has(activity.action), `${activity.action} is not in lib/actionTypes.ts`);
    assert.ok(!seen.has(activity.action), `${activity.action} is listed twice`);
    seen.add(activity.action);
  }
  assert.equal(UNLOCKING_ACTIONS.size, BIBLE_LOCK_ACTIVITIES.length);
});

check("everything that unlocked before 2026-11-13 still does", () => {
  const before: ActionType[] = [
    "chapter_completed", "reading_plan_chapter_completed", "bible_in_one_year_day_completed",
    "bible_in_one_year_reading_completed", "bible_year_task_completed", "devotional_day_completed",
    "bible_topic_lesson_completed", "book_completed", "trivia_chapter_completed",
    "scrambled_chapter_completed", "bible_in_one_year_trivia_completed", "devotional_reflection_saved",
    "bible_in_one_year_reflection_completed", "note_created", "chapter_notes_reviewed",
    "keyword_mastered", "person_learned", "place_discovered", "understand_verse_of_the_day",
  ];
  for (const action of before) assert.ok(UNLOCKING_ACTIONS.has(action), `${action} was dropped`);
});

check("a Bible Memory round and a Word Search puzzle now count", () => {
  assert.ok(UNLOCKING_ACTIONS.has("bible_memory_session_completed"));
  assert.ok(UNLOCKING_ACTIONS.has("word_search_book_completed"));
});

check("opening, starting, one answer, and anything social never count", () => {
  for (const action of UNLOCKING_ACTIONS) {
    assert.ok(!/_(viewed|opened|started|clicked|shown|skipped|dismissed)$/.test(action), `${action} is not a completion`);
    assert.ok(!/^(feed_|louis_|group_|buddy_|user_|trial_|upgrade_|onboarding_|dashboard_)/.test(action), `${action} is not Bible study`);
  }
  for (const action of ["trivia_question_answered", "trivia_question_correct", "scrambled_word_answered", "trivia_started", "bible_chapter_opened", "verse_highlighted", "feed_post_liked", "badge_earned"] as ActionType[]) {
    assert.ok(!UNLOCKING_ACTIONS.has(action), `${action} must not unlock`);
  }
});

check("there is one list: lib/bibleLock.ts re-exports it and keeps no copy", () => {
  const lock = read("lib/bibleLock.ts");
  assert.ok(lock.includes('from "./bibleLockActivities"'));
  assert.ok(lock.includes("export { UNLOCKING_ACTIONS, UNLOCKING_ACTIONS_SUMMARY };"));
  assert.ok(!lock.includes("new Set<ActionType>"), "a second list is back in lib/bibleLock.ts");
});

check("the words on screen name the real choices", () => {
  for (const word of ["chapter", "study guide", "Trivia", "Scrambled", "Bible Memory", "Word Search"]) {
    assert.ok(UNLOCKING_ACTIONS_SUMMARY.includes(word), `the summary does not mention ${word}`);
  }
  assert.deepEqual(BIBLE_LOCK_CHOICES.map((choice) => choice.title), ["Read", "Study", "Play"]);
});

console.log("\nThe one call");

check("it is a no-op on the server, and for anything not on the list", () => {
  // No window: must not throw, must not try to load the native module.
  bibleLockActivityCompleted("chapter_completed");
  (globalThis as unknown as { window: unknown }).window = {};
  bibleLockActivityCompleted("trivia_question_correct");
  delete (globalThis as unknown as { window?: unknown }).window;
  const source = read("lib/bibleLockActivities.ts");
  assert.ok(source.includes('if (typeof window === "undefined" || !UNLOCKING_ACTIONS.has(action)) return;'));
  assert.ok(source.includes("mod.liftBibleLockFor(action)"));
});

check("a second call cannot unlock twice: the lift only acts on a shield that is on", () => {
  const lock = read("lib/bibleLock.ts");
  const lift = lock.slice(lock.indexOf("export async function liftBibleLockFor"));
  assert.ok(lift.includes("if (!UNLOCKING_ACTIONS.has(actionType)) return false;"));
  assert.ok(lift.includes("if (!before.supported || !before.locked) return false;"));
  assert.ok(lift.indexOf("!before.locked") < lift.indexOf("announceBibleLockLifted()"));
});

console.log("\nEvery finished activity makes the call");

check("everything recorded through logActionToMasterActions", () => {
  const recorder = read("lib/actionRecorder.ts");
  const body = recorder.slice(recorder.indexOf("export async function logActionToMasterActions"));
  assert.ok(body.indexOf("bibleLockActivityCompleted(actionType);") > 0);
  assert.ok(body.indexOf("bibleLockActivityCompleted(actionType);") < body.indexOf(".insert("), "it must come before the write");
});

check("a replayed trivia or Scrambled round still counts (before the once-a-day check)", () => {
  const tracker = read("lib/navigationActionTracker.ts");
  const call = tracker.indexOf("bibleLockActivityCompleted(actionType);");
  assert.ok(call > 0);
  assert.ok(call < tracker.indexOf('storage.getItem(storageKey) === "1"'));
  assert.ok(read("components/TriviaGamePlayer.tsx").includes("ACTION_TYPE.trivia_chapter_completed"));
  assert.ok(read("components/ScrambledGamePlayer.tsx").includes("ACTION_TYPE.scrambled_chapter_completed"));
});

check("Bible Memory: a finished practice round", () => {
  const memory = read("components/memory/MemoryPractice.tsx");
  assert.ok(/logActionToMasterActions\(\s*userId,\s*ACTION_TYPE\.bible_memory_session_completed/.test(memory));
});

check("Word Search: every finished puzzle, replays included", () => {
  const game = read("components/wordsearch/WordSearchGame.tsx");
  const finished = game.indexOf("if (finished) {\n        // Every finished puzzle");
  assert.ok(finished > 0);
  assert.ok(game.indexOf("bibleLockActivityCompleted(ACTION_TYPE.word_search_book_completed);") > finished);
  assert.ok(game.indexOf("bibleLockActivityCompleted(ACTION_TYPE.word_search_book_completed);") < game.indexOf("if (firstFinish && userId)"));
});

check("the four People trivia pages: the last question, not each answer", () => {
  for (const who of ["abraham", "moses", "jesus", "god"]) {
    const page = read(`app/bible-trivia/${who}/page.tsx`);
    assert.equal(count(page, "bibleLockActivityCompleted("), 1, who);
    assert.ok(/\} else \{\n[^}]*bibleLockActivityCompleted\(ACTION_TYPE\.trivia_chapter_completed\);\n\s*setShowResults\(true\);/.test(page), who);
  }
});

check("a study guide day: the Big Picture and the Discussion, on all three screens", () => {
  const day = read("app/devotionals/[id]/day/[dayNumber]/page.tsx");
  assert.equal(count(day, "bibleLockActivityCompleted(ACTION_TYPE.devotional_day_completed);"), 1);
  assert.equal(count(day, "bibleLockActivityCompleted(ACTION_TYPE.devotional_reflection_saved);"), 1);
  assert.equal(count(read("app/devotionals/[id]/page.tsx"), "bibleLockActivityCompleted(ACTION_TYPE.devotional_day_completed);"), 2);
  const callout = read("components/DashboardDailyTaskCallout.tsx");
  assert.equal(count(callout, "bibleLockActivityCompleted(ACTION_TYPE.devotional_day_completed);"), 1);
  assert.equal(count(callout, "bibleLockActivityCompleted(ACTION_TYPE.devotional_reflection_saved);"), 1);
});

check("a study guide day's reading: markChapterDone, which every reader uses", () => {
  const progress = read("lib/readingProgress.ts");
  assert.ok(progress.includes("mod.liftBibleLockFor(ACTION_TYPE.chapter_completed)"));
});

check("Bible in One Year: the lesson and the trivia when finished, the discussion when posted", () => {
  const dash = read("components/DashboardJourneyExperience.tsx");
  assert.ok(dash.includes('const finished = card === "reflection" ? undefined : BIBLE_YEAR_CARD_ACTION_TYPE[card];'));
  assert.ok(dash.includes("if (finished) bibleLockActivityCompleted(finished);"));
  assert.equal(count(dash, "bibleLockActivityCompleted(ACTION_TYPE.bible_in_one_year_reflection_completed);"), 1);
});

check("a topic lesson and a saved note", () => {
  assert.equal(count(read("components/BibleTopicsPanel.tsx"), "bibleLockActivityCompleted(ACTION_TYPE.bible_topic_lesson_completed);"), 1);
  assert.equal(count(read("app/notes/page.tsx"), "bibleLockActivityCompleted(ACTION_TYPE.note_created);"), 1);
  assert.equal(count(read("app/notes/grow/page.tsx"), "bibleLockActivityCompleted(ACTION_TYPE.note_created);"), 1);
});

console.log("\nReopening the app, and the day turning over");

check("the watcher asks the same list, from the start of this lock period", () => {
  const watcher = read("components/BibleLockWatcher.tsx");
  assert.equal(count(watcher, '.in("action_type", [...UNLOCKING_ACTIONS])'), 2);
  assert.ok(watcher.includes("bibleLockPeriodStartIso(status, getBibleBuddyLocalDayStartIso())"));
  assert.ok(watcher.includes("if (bibleLockUnlockedThisPeriod(status)) return;"));
  assert.ok(watcher.includes('document.addEventListener("visibilitychange", onVisible);'));
});

check("nothing finished before the lock went on, or yesterday, can count", () => {
  const lock = read("lib/bibleLock.ts");
  const start = lock.slice(lock.indexOf("export function bibleLockPeriodStartIso"), lock.indexOf("export function bibleLockUnlockedThisPeriod"));
  assert.ok(start.includes("const candidates = [dayStartIso];"));
  assert.ok(start.includes("if (status.lockedAt) candidates.push(status.lockedAt);"));
  assert.ok(start.includes("return b > a ? candidate : latest;"), "the latest start must win");
});

console.log("\nThe screens");

check("the ways-out page offers reading, a study guide, notes and all four games", () => {
  const tasks = read("components/bible-lock/BibleLockTasks.tsx");
  for (const href of ["/bible-trivia", "/reading", "/notes/grow", "/bible-study-games/scrambled", "/bible-study-games/memory", "/bible-study-games/word-search"]) {
    assert.ok(tasks.includes(`"${href}"`), `no card opens ${href}`);
  }
  assert.ok(tasks.includes("/devotionals/${devotional.study.id}/day/${devotional.progress.nextDay}"));
  assert.equal(count(tasks, "...GAME_TASKS,"), 2, "the games must be there while loading and after");
});

check("no screen says reading is the only way", () => {
  for (const file of ["components/BibleLockSettings.tsx", "components/BibleLockPopup.tsx", "components/bible-lock/BibleLockPage.tsx", "components/home/BibleLockBanner.tsx"]) {
    const jsx = read(file).replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    assert.ok(!/today(&apos;|&rsquo;|')s reading/.test(jsx), `${file} still says "today's reading"`);
    assert.ok(!jsx.includes("until you have read today"), file);
  }
});

console.log(`\n${passed} checks passed.\n`);
