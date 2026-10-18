"use client";

import { useCallback, useEffect, useState } from "react";
import {
  bibleLockStatus,
  chooseAppsToLock,
  clearBibleLock,
  lockChosenApps,
  requestBibleLockPermission,
  UNLOCKING_ACTIONS_SUMMARY,
  type BibleLockStatus,
} from "@/lib/bibleLock";

/**
 * The Bible lock, in Settings (Louis, 2026-10-14).
 *
 * Renders nothing at all unless the device can actually do this - the website,
 * Android, iOS 15 and any installed build older than the one carrying the
 * plugin all get silence rather than a button that fails. That check is async,
 * so this starts as null and appears once it knows.
 *
 * The thing this screen has to get right is the way out. Someone who turns
 * this on is trusting a Bible app with the apps they use most, and if
 * unlocking is ever hard to find, that trust is gone and so is the review.
 * "Unlock now" sits next to the lock, with no confirmation step in front of
 * it.
 */
export default function BibleLockSettings() {
  const [status, setStatus] = useState<BibleLockStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * How long until the apps lock themselves again.
   *
   * Midnight in the reader's own timezone, which is the same midnight the
   * extension wakes on - it schedules against DateComponents(hour: 0), and iOS
   * resolves that locally too. Counting to a UTC midnight would be hours out
   * for most people and wrong in a way nobody could explain.
   *
   * Minutes, not seconds: a ticking second hand on a settings page is a
   * distraction, and it would re-render this card sixty times a minute to say
   * something that only changes once.
   */
  const [timeUntilMidnight, setTimeUntilMidnight] = useState("");

  useEffect(() => {
    const describe = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const minutes = Math.max(0, Math.round((midnight.getTime() - now.getTime()) / 60_000));
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours === 0) return `${mins} minute${mins === 1 ? "" : "s"}`;
      if (mins === 0) return `${hours} hour${hours === 1 ? "" : "s"}`;
      return `${hours}h ${mins}m`;
    };
    setTimeUntilMidnight(describe());
    const timer = setInterval(() => setTimeUntilMidnight(describe()), 30_000);
    return () => clearInterval(timer);
  }, []);

  const refresh = useCallback(async () => {
    const next = await bibleLockStatus();
    setStatus(next.supported ? next : null);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function run(work: () => Promise<void>) {
    setBusy(true);
    setError(null);
    try {
      await work();
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "That did not work. Try again.");
    } finally {
      await refresh();
      setBusy(false);
    }
  }

  // Not an iPhone, or an older build. Say nothing.
  if (!status) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-2">Bible lock</h2>
      <p className="text-sm text-gray-600">
        Lock the apps that usually get your attention first, until you have done
        today&apos;s reading. Bible Buddy never sees which apps you choose, and you can
        unlock them at any time.
      </p>

      {error ? (
        <p className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-4 space-y-4">
        {!status.authorized ? (
          <>
            <p className="text-sm text-gray-600">
              iPhone will ask you to allow this with Face ID. Nothing is locked until
              you pick the apps yourself.
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  const allowed = await requestBibleLockPermission();
                  if (!allowed) {
                    setError(
                      "iPhone did not allow it. You can turn Screen Time access on later in iPhone Settings.",
                    );
                  }
                })
              }
              className="px-6 py-2 bg-[#102D4D] text-white rounded-lg disabled:opacity-50"
            >
              {busy ? "Working..." : "Turn on Bible lock"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-gray-800">
              {status.chosen === 0
                ? "No apps chosen yet."
                : `${status.chosen} ${status.chosen === 1 ? "app" : "apps"} chosen.`}
              {status.locked ? " Locked until today's reading is done." : ""}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() =>
                  void run(async () => {
                    await chooseAppsToLock();
                  })
                }
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
              >
                {status.chosen === 0 ? "Choose apps" : "Change apps"}
              </button>

              {status.locked ? (
                <button
                  type="button"
                  disabled={busy}
                  // No "are you sure". Someone locked out of their phone needs
                  // one tap, not a dialog.
                  onClick={() => void run(async () => clearBibleLock())}
                  className="px-6 py-2 bg-[#102D4D] text-white rounded-lg disabled:opacity-50"
                >
                  Unlock now
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy || status.chosen === 0}
                  onClick={() =>
                    void run(async () => {
                      await lockChosenApps();
                    })
                  }
                  className="px-6 py-2 bg-[#102D4D] text-white rounded-lg disabled:opacity-50"
                >
                  Lock them now
                </button>
              )}
            </div>

            {/* When the apps go back on (Louis, 2026-10-17: "it should be a
                countdown to say when the next lock will happen (12am)").
                Only worth saying when apps are chosen and nothing is locked
                right now - while they are locked, the question is how to get
                them back, not when they return. */}
            {/* Shown whether or not the apps are locked right now. It was
                hidden while locked, on the reasoning that somebody locked out
                does not care when the next lock is - but Louis went looking
                for it in that exact state and found it gone (2026-10-18: "then
                no timer on settings"). A number that disappears reads as a
                fault, and while locked the midnight line is still the useful
                fact: finishing today's reading buys you the rest of today. */}
            {status.chosen > 0 ? (
              <p className="rounded-xl bg-[#f5f2ff] px-3 py-2 text-xs font-bold text-[#4a3d7a]">
                {status.locked
                  ? `Finish today's reading and your apps come back until midnight — ${timeUntilMidnight} from now.`
                  : `Your apps lock again in ${timeUntilMidnight} — at midnight.`}
              </p>
            ) : null}

            <p className="text-xs text-gray-500">
              The lock clears itself the moment you finish today&apos;s reading.{" "}
              {UNLOCKING_ACTIONS_SUMMARY} Any one of them is enough.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
