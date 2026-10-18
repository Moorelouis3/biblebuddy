"use client";

import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  announceBibleLockChanged,
  announceBibleLockLifted,
  bibleLockLockedAt,
  bibleLockStatus,
  clearBibleLock,
  lockChosenApps,
  UNLOCKING_ACTIONS,
} from "@/lib/bibleLock";
import { getBibleBuddyLocalDayKey, getBibleBuddyLocalDayStartIso } from "@/lib/louisDailyFlow";

/**
 * Give the phone back as soon as today's reading is done, whichever way it was
 * done (Louis, 2026-10-17: "it's not just chapter done, it's a bunch of
 * actions we made to open the apps").
 *
 * recordAction lifts the lock, and the one screen that mattered most -
 * FullChapterReader - does not go through it. Nor do the several API routes
 * that record a finished day, and those could not lift it anyway: the shield
 * is on the device, so only code running in the app can clear it.
 *
 * Chasing twenty-one call sites would leave the twenty-second broken. So this
 * asks the only question that actually matters - has anything in
 * UNLOCKING_ACTIONS been recorded since midnight - and clears the shield if so.
 * It runs when the app opens and every time it comes back to the front, which
 * is exactly when somebody who just finished a chapter looks at their phone.
 *
 * Does nothing on the website, on Android, or when nothing is locked.
 */
/** The day the app last put the lock back on, so it only does it once. */
const AUTO_LOCK_DAY_KEY = "bb:bible-lock-auto-locked-day";

export default function BibleLockWatcher({ userId }: { userId: string | null }) {
  // One check at a time, and never two in the same second: coming back to the
  // foreground can fire both visibilitychange and focus.
  const checking = useRef(false);
  const lastCheck = useRef(0);

  const check = useCallback(async () => {
    if (!userId || checking.current) return;
    if (Date.now() - lastCheck.current < 3000) return;
    checking.current = true;
    lastCheck.current = Date.now();

    try {
      const status = await bibleLockStatus();
      if (!status.supported) return;

      // Not locked, but set up: this is where the new day starts. The lock is
      // meant to come back by itself every morning (Louis, 2026-10-17: "it
      // should be already set every day"), and the extension that would do
      // that without the app being opened cannot build yet - see
      // docs/bible-lock-entitlement-evidence.md. So the app does it the first
      // time it is opened on a day where nothing has been read.
      if (!status.locked) {
        if (status.chosen === 0) return;
        const today = getBibleBuddyLocalDayKey();
        let lastAutoLock: string | null = null;
        try {
          lastAutoLock = window.localStorage.getItem(AUTO_LOCK_DAY_KEY);
        } catch {
          // Blocked storage: skip, rather than risk locking twice in a day.
          return;
        }
        // Once a day. Somebody who unlocked on purpose in Settings is not
        // re-locked until tomorrow.
        if (lastAutoLock === today) return;

        const { data: doneToday } = await supabase
          .from("master_actions")
          .select("action_type")
          .eq("user_id", userId)
          .gte("created_at", getBibleBuddyLocalDayStartIso())
          .in("action_type", [...UNLOCKING_ACTIONS])
          .limit(1);
        if (doneToday && doneToday.length > 0) return;

        try {
          window.localStorage.setItem(AUTO_LOCK_DAY_KEY, today);
        } catch {}
        await lockChosenApps();
        // Changed, not lifted. This branch has just PUT THE LOCK ON, and it
        // used to fire the lifted event - so locking announced itself as
        // unlocking and the strip flapped green then back to locked.
        announceBibleLockChanged();
        return;
      }

      // Since the lock went on, not since midnight. Somebody who reads in the
      // morning and locks their apps at lunch would otherwise be unlocked by
      // breakfast, every time the app opened.
      const since = bibleLockLockedAt() || getBibleBuddyLocalDayStartIso();

      const { data } = await supabase
        .from("master_actions")
        .select("action_type")
        .eq("user_id", userId)
        .gte("created_at", since)
        .in("action_type", [...UNLOCKING_ACTIONS])
        .limit(1);

      // A chapter read for the second time writes no event at all - the
      // master_actions row is written once per chapter, ever (see
      // lib/readingProgress.ts). Somebody re-reading Psalm 23 would have been
      // left shielded with nothing they could do about it, so completed_chapters
      // - which is always written - is the second place to look.
      let done = Boolean(data && data.length > 0);
      if (!done) {
        const { data: chapters } = await supabase
          .from("completed_chapters")
          .select("chapter")
          .eq("user_id", userId)
          .gte("completed_at", since)
          .limit(1);
        done = Boolean(chapters && chapters.length > 0);
      }

      if (done) {
        await clearBibleLock();
        // Genuinely lifted: the apps are back. This is the one place in this
        // file that may say so.
        announceBibleLockLifted();
      }
    } catch {
      // A failed check leaves the shield exactly as it was, which is the safe
      // side: the way out is always in Settings.
    } finally {
      checking.current = false;
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    void check();

    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", check);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", check);
    };
  }, [userId, check]);

  return null;
}
