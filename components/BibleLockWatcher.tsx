"use client";

import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { bibleLockStatus, clearBibleLock, UNLOCKING_ACTIONS } from "@/lib/bibleLock";
import { getBibleBuddyLocalDayStartIso } from "@/lib/louisDailyFlow";

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
      if (!status.supported || !status.locked) return;

      const { data } = await supabase
        .from("master_actions")
        .select("action_type")
        .eq("user_id", userId)
        .gte("created_at", getBibleBuddyLocalDayStartIso())
        .in("action_type", [...UNLOCKING_ACTIONS])
        .limit(1);

      if (data && data.length > 0) {
        await clearBibleLock();
        // The reader shows its own line when it unlocks on the spot. This path
        // is the quieter one - the app coming back to find the day already
        // done - so it says so once and gets out of the way.
        window.dispatchEvent(new CustomEvent("bb:bible-lock-lifted"));
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
