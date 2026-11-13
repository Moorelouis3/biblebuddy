import type { ActionType } from "./actionTypes";

/**
 * What gives the phone back. The one list (2026-11-13).
 *
 * Bible Lock shields the apps a reader chose until they have spent time in
 * Scripture today. "Spent time" means FINISHING one of the things below - one
 * is enough, any of them, and the apps stay open until midnight. There is no
 * count to reach and no setting for one: the unit is "one finished activity
 * per local day", and this file does not change that.
 *
 * Every screen that finishes something asks this file, through
 * bibleLockActivityCompleted(). No screen decides for itself what counts. To
 * make a new feature count: add its action type here, and call
 * bibleLockActivityCompleted() where the feature records its completion.
 *
 * The rule for getting on the list is completion, never opening. Bible Buddy
 * records a *_viewed or *_opened event for almost every tap, and if those
 * unlocked the phone the feature would be theatre. A finished game round
 * counts whatever the score: the time was spent either way.
 *
 * This file is plain data on purpose. lib/bibleLock.ts registers a Capacitor
 * plugin the moment it loads, so it cannot be imported by server code or by
 * the offline checks (npm run verify:bible-lock). This can.
 */

export type BibleLockGroup = "read" | "study" | "game" | "write" | "deeper";

export type BibleLockActivity = {
  action: ActionType;
  group: BibleLockGroup;
  /** What the reader has to finish, in a few words. */
  what: string;
};

export const BIBLE_LOCK_ACTIVITIES: BibleLockActivity[] = [
  // Reading
  { action: "chapter_completed", group: "read", what: "Finish a Bible chapter" },
  { action: "reading_plan_chapter_completed", group: "read", what: "Finish a reading plan chapter" },
  { action: "book_completed", group: "read", what: "Finish a book of the Bible" },
  { action: "bible_in_one_year_reading_completed", group: "read", what: "Finish a Bible in One Year lesson" },
  { action: "bible_in_one_year_day_completed", group: "read", what: "Finish a Bible in One Year day" },
  { action: "bible_year_task_completed", group: "read", what: "Finish a Bible in One Year task" },

  // A study guide day has four parts: The Big Picture, Today's Reading,
  // Today's Trivia and Discussion. Any ONE of them is enough. The Big Picture
  // records devotional_day_completed and Discussion records
  // devotional_reflection_saved; the reading and the trivia are the same
  // chapter_completed and trivia_chapter_completed as everywhere else.
  { action: "devotional_day_completed", group: "study", what: "Finish a study guide day's Big Picture" },
  { action: "devotional_reflection_saved", group: "study", what: "Join a study guide day's discussion" },
  { action: "bible_in_one_year_reflection_completed", group: "study", what: "Join a Bible in One Year discussion" },
  { action: "bible_topic_lesson_completed", group: "study", what: "Finish a Bible topic lesson" },

  // Game rounds. Finished, at any score.
  { action: "trivia_chapter_completed", group: "game", what: "Finish a Bible Trivia round" },
  { action: "bible_in_one_year_trivia_completed", group: "game", what: "Finish a Bible in One Year trivia round" },
  { action: "scrambled_chapter_completed", group: "game", what: "Finish a Scrambled chapter" },
  // Added 2026-11-13. Both recorded a completion that the lock ignored.
  { action: "bible_memory_session_completed", group: "game", what: "Finish a Bible Memory practice round" },
  { action: "word_search_book_completed", group: "game", what: "Finish a Bible Word Search puzzle" },

  // Writing something down
  { action: "note_created", group: "write", what: "Save a Bible note" },

  // Going deeper on a passage
  { action: "chapter_notes_reviewed", group: "deeper", what: "Review a chapter's notes" },
  { action: "keyword_mastered", group: "deeper", what: "Learn a keyword" },
  { action: "person_learned", group: "deeper", what: "Learn about a person" },
  { action: "place_discovered", group: "deeper", what: "Learn about a place" },
  { action: "understand_verse_of_the_day", group: "deeper", what: "Understand the verse of the day" },
];

export const UNLOCKING_ACTIONS: ReadonlySet<ActionType> = new Set<ActionType>(
  BIBLE_LOCK_ACTIVITIES.map((activity) => activity.action),
);

/** The same list in one sentence, for the screens that explain it. */
export const UNLOCKING_ACTIONS_SUMMARY =
  "Finish a Bible chapter, one part of a study guide day, a Bible in One Year lesson, " +
  "or a round of Bible Trivia, Scrambled, Bible Memory or Word Search. " +
  "Saving a note or learning a keyword, person or place counts too.";

/** The three kinds of way out, for a screen that has room for three lines. */
export const BIBLE_LOCK_CHOICES: Array<{ title: string; detail: string }> = [
  { title: "Read", detail: "Finish a Bible chapter or today's Bible in One Year lesson." },
  { title: "Study", detail: "Finish any one part of a study guide day, or save a note." },
  { title: "Play", detail: "Finish a round of Trivia, Scrambled, Bible Memory or Word Search." },
];

/**
 * A screen has just finished something. If it is on the list and the apps are
 * shielded, give them back now and say so.
 *
 * This is the call every completion handler makes. Until 2026-11-13 only a
 * finished chapter did this; everything else on the list waited for
 * BibleLockWatcher, which only looks when the app is opened or brought back
 * to the front - so a reader who finished a trivia round stayed locked until
 * they left the app and came back.
 *
 * Safe to call from anywhere, any number of times: it does nothing on the
 * server, on the website, on Android, for an action that is not on the list,
 * or when nothing is locked. A double tap, a retry, or a child activity that
 * also finishes its parent cannot unlock "twice" - the second call finds the
 * apps already open and says nothing.
 *
 * It never writes anything. Whether the completion is recorded, scored or
 * deduplicated stays the feature's own business.
 */
export function bibleLockActivityCompleted(action: ActionType): void {
  if (typeof window === "undefined" || !UNLOCKING_ACTIONS.has(action)) return;
  void import("./bibleLock")
    .then((mod) => mod.liftBibleLockFor(action))
    .catch(() => {
      // No plugin, not in the app, nothing locked: the activity still counts.
    });
}
