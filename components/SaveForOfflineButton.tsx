"use client";

import { useEffect, useState } from "react";

/**
 * "Save for offline", next to the audio controls (Louis, 2026-10-11).
 *
 * A Bible in One Year day is twenty minutes of mp3, and the commute is both
 * when people listen and when the signal is worst. The service worker has
 * been able to cache this since September - nothing ever asked it to.
 *
 * Self-contained on purpose: it owns its own state so adding it to a player
 * is one line rather than threading handlers through a component that is
 * already a thousand lines long.
 */

type Props = {
  /** The audio file to keep. */
  audioSrc: string;
  /** Page URLs worth keeping with it, e.g. the day's reading. */
  pageUrls?: string[];
  className?: string;
};

type State = "idle" | "unavailable" | "saving" | "saved" | "failed";

export default function SaveForOfflineButton({ audioSrc, pageUrls, className }: Props) {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { offlineDownloadAvailable } = await import("@/lib/offlineDownload");
      const ok = await offlineDownloadAvailable();
      if (!cancelled && !ok) setState("unavailable");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // No service worker means no cache to put anything in. Showing a button
  // that cannot work is worse than showing nothing.
  if (state === "unavailable" || !audioSrc) return null;

  async function save() {
    setState("saving");
    const { downloadForOffline } = await import("@/lib/offlineDownload");
    const started = await downloadForOffline({
      urls: pageUrls ?? [],
      mediaUrls: [audioSrc],
    });
    // postMessage is one-way: this says the worker was asked, not that the
    // download finished. It keeps fetching in the background after you
    // navigate away, which is the behaviour you want for twenty minutes of
    // audio - but it does mean "Saved" is really "saving, carry on".
    setState(started ? "saved" : "failed");
  }

  const label =
    state === "saving" ? "Saving…" : state === "saved" ? "✓ Saved for offline" : state === "failed" ? "Could not save" : "⬇ Save for offline";

  return (
    <button
      type="button"
      onClick={() => void save()}
      disabled={state === "saving" || state === "saved"}
      className={
        className ??
        "mt-1 text-[12px] font-bold text-current underline decoration-dotted underline-offset-4 opacity-70 transition hover:opacity-100 disabled:no-underline disabled:opacity-60"
      }
    >
      {label}
    </button>
  );
}
