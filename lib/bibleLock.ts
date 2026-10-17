"use client";

import { registerPlugin } from "@capacitor/core";
import type { ActionType } from "./actionTypes";
import { isNativeApp } from "./nativeApp";
import { nativePluginAvailable } from "./nativeAuth";

/**
 * The Bible lock (Louis, 2026-10-14).
 *
 * The reader picks the apps that usually win their attention, and Bible Buddy
 * shields them until that day's reading is done.
 *
 * iOS only, and genuinely native - Apple's Screen Time frameworks have no web
 * surface, which is exactly why this is the first thing in Bible Buddy a
 * website could not do. The Swift lives in native/plugins/bible-lock.
 *
 * Nothing here ever learns which apps were chosen. Apple's picker returns
 * opaque tokens, the count is all that comes back across this bridge, and no
 * Screen Time data is read, stored or sent anywhere. That is also why this
 * adds nothing to the App Store privacy label.
 *
 * Needs the Family Controls (Distribution) entitlement, granted 2026-10-14,
 * and the capability on the App ID. Android blocks apps through a completely
 * different mechanism and is a separate piece of work.
 */

/**
 * What counts as having done today's reading (Louis, 2026-10-14).
 *
 * The rule is completion, never opening. Bible Buddy records a *_viewed or
 * *_opened event for almost every tap, and if any of those unlocked the phone
 * then opening the Bible for one second would do it and the whole feature is
 * theatre.
 *
 * It is also deliberately not only chapters. Louis's point: there are many
 * ways into Scripture here, and finishing a trivia chapter or a devotional day
 * or a Bible-in-One-Year day is time spent in the Bible by any honest reading.
 * Someone who does the trivia instead of the chapter has still done the thing
 * this feature exists to protect.
 *
 * Left out on purpose: single questions and single words
 * (trivia_question_correct, scrambled_word_answered), because one tap is not a
 * session; everything social or in the feed, which is time with people rather
 * than with Scripture; and Little Louis, which is a conversation that may not
 * touch the Bible at all.
 */
export const UNLOCKING_ACTIONS = new Set<ActionType>([
  // Reading
  "chapter_completed",
  "reading_plan_chapter_completed",
  "bible_in_one_year_day_completed",
  "bible_in_one_year_reading_completed",
  "bible_year_task_completed",
  "devotional_day_completed",
  "bible_topic_lesson_completed",
  "book_completed",

  // The games - a trivia or scrambled chapter is a real sitting with a passage
  "trivia_chapter_completed",
  "scrambled_chapter_completed",
  "bible_in_one_year_trivia_completed",

  // Writing something down
  "devotional_reflection_saved",
  "bible_in_one_year_reflection_completed",
  "note_created",

  // Going deeper on a passage
  "chapter_notes_reviewed",
  "keyword_mastered",
  "person_learned",
  "place_discovered",
  "understand_verse_of_the_day",
]);

/** The same list in words, for the screen that explains it. */
export const UNLOCKING_ACTIONS_SUMMARY =
  "Finish a chapter, a devotional day, a Bible in One Year day, a trivia or scrambled chapter, " +
  "save a reflection or a note, or learn a keyword, person or place.";

export type BibleLockStatus = {
  supported: boolean;
  authorized: boolean;
  /** How many apps and categories are selected. Never which. */
  chosen: number;
  locked: boolean;
};

type BibleLockPlugin = {
  isSupported(): Promise<{ supported: boolean }>;
  status(): Promise<BibleLockStatus>;
  requestAuthorization(): Promise<{ authorized: boolean }>;
  chooseApps(): Promise<{ chosen?: number; cancelled?: boolean }>;
  lock(): Promise<{ locked: boolean }>;
  clear(): Promise<{ locked: boolean }>;
};

const BibleLock = registerPlugin<BibleLockPlugin>("BibleLock");

const OFF: BibleLockStatus = { supported: false, authorized: false, chosen: 0, locked: false };

/**
 * Is the lock usable on this device right now?
 *
 * False on the web, on Android, on iOS 15, and in any installed build older
 * than the one that first carried the plugin - the JavaScript half of a
 * Capacitor plugin ships with the website and updates the moment Vercel
 * deploys, while the native half only changes when someone installs a new
 * build. Checking rather than assuming is what stops this throwing at people
 * who have simply not updated yet.
 */
export async function bibleLockAvailable(): Promise<boolean> {
  if (!isNativeApp() || !nativePluginAvailable("BibleLock")) return false;
  try {
    const { supported } = await BibleLock.isSupported();
    return supported;
  } catch {
    return false;
  }
}

export async function bibleLockStatus(): Promise<BibleLockStatus> {
  if (!(await bibleLockAvailable())) return OFF;
  try {
    return await BibleLock.status();
  } catch {
    return OFF;
  }
}

/**
 * Ask for permission. iOS shows its own Face ID prompt.
 *
 * Returns false when they decline, which is an ordinary answer and not an
 * error: the rest of the app must behave exactly as it did before.
 */
export async function requestBibleLockPermission(): Promise<boolean> {
  if (!(await bibleLockAvailable())) return false;
  try {
    const { authorized } = await BibleLock.requestAuthorization();
    return authorized;
  } catch {
    return false;
  }
}

/** Opens Apple's picker. Resolves with how many were chosen, or null if cancelled. */
export async function chooseAppsToLock(): Promise<number | null> {
  if (!(await bibleLockAvailable())) return null;
  const result = await BibleLock.chooseApps();
  if (result?.cancelled) return null;
  return result?.chosen ?? 0;
}

/**
 * When the shield was last switched on, as an ISO string, or null.
 *
 * Only things finished AFTER this count as having read. Without it, somebody
 * who reads in the morning and locks their apps at lunchtime is unlocked the
 * instant the app reopens, because this morning's chapter is still "today's
 * reading" - which is exactly what happened to Louis on 2026-10-17: "I set it,
 * closed the app, and the apps were open again."
 */
export const BIBLE_LOCK_LOCKED_AT_KEY = "bb:bible-lock-locked-at";

export function bibleLockLockedAt(): string | null {
  try {
    return window.localStorage.getItem(BIBLE_LOCK_LOCKED_AT_KEY);
  } catch {
    return null;
  }
}

export async function lockChosenApps(): Promise<boolean> {
  if (!(await bibleLockAvailable())) return false;
  const { locked } = await BibleLock.lock();
  if (locked) {
    try {
      window.localStorage.setItem(BIBLE_LOCK_LOCKED_AT_KEY, new Date().toISOString());
    } catch {
      // Without it the lock still works; it just lifts on the first thing
      // finished today rather than the first thing finished from now.
    }
  }
  return locked;
}

/**
 * Give the phone back.
 *
 * Call this the moment the day's reading is marked complete, from the same
 * place that marks it, so the two can never disagree. It is also what the
 * "turn it off" control calls, and it asks no questions before doing it.
 */
/**
 * Give the phone back for an action that counts as having read, and say
 * whether it actually unlocked anything.
 *
 * recordAction already does this, but not every screen goes through it -
 * FullChapterReader writes to master_actions itself, so finishing a chapter
 * left the apps shielded and said nothing (Louis, 2026-10-17: "I just
 * finished a chapter and no pop up saying congrats, your phone is
 * unlocked"). Returning true is what lets a screen tell him.
 */
export async function liftBibleLockFor(actionType: ActionType): Promise<boolean> {
  if (!UNLOCKING_ACTIONS.has(actionType)) return false;
  const before = await bibleLockStatus();
  if (!before.supported || !before.locked) return false;
  await clearBibleLock();
  return true;
}

export async function clearBibleLock(): Promise<void> {
  if (!isNativeApp() || !nativePluginAvailable("BibleLock")) return;
  try {
    await BibleLock.clear();
  } catch {
    // Nothing to clear, or an older build. Either way the phone is not locked.
  }
}
