"use client";

import { saveWidgetSnapshot } from "./bibleLock";
import { isNativeApp } from "./nativeApp";

/**
 * Feeding the iOS home-screen widgets (Louis, 2026-11-18).
 *
 * The widgets (native/ios-extensions/BibleBuddyWidgets) run in their own
 * process and cannot see the sign-in or the database, so the app tells them
 * what it knows as it learns it:
 *
 *   streak  HomeScreen, from profile_stats.current_streak
 *   study   YourBookshelf, the study in progress (or null when there is none)
 *   verse   VerseOfTheDayCard, today's verse (the Verse widget also fetches
 *           this itself from /api/widgets/verse, so it is a fallback here)
 *
 * Parts arrive separately and the native side merges them key by key, so one
 * screen never wipes what another wrote. Sends are batched for a moment so a
 * Home screen loading three parts makes one bridge call, not three.
 *
 * Does nothing on the web, on Android, and on any iOS build older than the
 * one that carries the widgets - the plugin method simply is not there, and
 * that is not an error worth showing anyone.
 */

export type WidgetStudy = {
  title: string;
  day: number | null;
  totalDays: number;
  completedDays: number;
  /** An absolute URL or a site path; the widget downloads it. */
  cover: string | null;
  /** Where a tap on the widget opens. */
  href: string;
};

export type WidgetVerse = { reference: string; text: string; translation: string | null; date: string };

type WidgetPart = { streak?: number | null; study?: WidgetStudy | null; verse?: WidgetVerse | null };

let pending: WidgetPart = {};
let timer: ReturnType<typeof setTimeout> | null = null;
let unavailable = false;

export function updateWidgets(part: WidgetPart) {
  if (typeof window === "undefined" || unavailable || !isNativeApp()) return;
  pending = { ...pending, ...part };
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    const snapshot = JSON.stringify(pending);
    pending = {};
    timer = null;
    saveWidgetSnapshot(snapshot).then(
      (saved) => {
        if (!saved) unavailable = true;
      },
      (error: unknown) => {
        // An older build without the method. Stop trying for this visit.
        unavailable = true;
        console.info("[WIDGETS] not in this build:", error instanceof Error ? error.message : error);
      },
    );
  }, 600);
}
