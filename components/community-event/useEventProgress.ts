"use client";

/**
 * A member's real progress through a community event's devotional.
 *
 * Completion is the devotional's own record: a day counts as done when
 * devotional_progress has is_completed = true for (user, devotional, day) -
 * the same flag the devotional and day pages write. Nothing is reset for the
 * event, so people who started early keep every day they already finished.
 *
 * Refetches when the tab regains focus, so finishing a day and coming back
 * updates the tracker without a reload.
 */

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export function useEventProgress(devotionalId: string | null | undefined, userId: string | null | undefined, enabled = true) {
  const [completedDays, setCompletedDays] = useState<Set<number>>(() => new Set());
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!devotionalId || !userId || !enabled) return;
    try {
      const { data, error } = await supabase
        .from("devotional_progress")
        .select("day_number, is_completed")
        .eq("user_id", userId)
        .eq("devotional_id", devotionalId)
        .eq("is_completed", true);
      if (error) return;
      setCompletedDays(
        new Set(
          (data || [])
            .map((row: { day_number: number | null }) => Number(row.day_number))
            .filter((n) => Number.isFinite(n) && n > 0),
        ),
      );
      setLoaded(true);
    } catch {
      /* the tracker just stays at its last known state */
    }
  }, [devotionalId, userId, enabled]);

  useEffect(() => {
    const initial = window.setTimeout(() => void load(), 0);
    const onVisible = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(initial);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  return { completedDays, loaded, reload: load };
}
