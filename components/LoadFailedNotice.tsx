"use client";

/**
 * "Couldn't load. Tap to try again."
 *
 * The other half of the auth-lock fix (Louis, 2026-11-08). That fix stopped
 * the app hanging forever: a request now gives up after 30 seconds instead of
 * waiting for a lock a suspended page never gave back. But giving up was
 * silent. Four screens load their data in an async effect with no catch at
 * all - the bookshelf, the Library, a study's page and the feed - so a throw
 * skipped the setLoading(false) line entirely and left their skeletons
 * animating for as long as you cared to watch. The app underneath was fine;
 * that one panel just never said anything.
 *
 * Louis: "instead of grey boxes forever, you'd see Couldn't load, tap to try
 * again." So that is all this is - a sentence and a button that re-runs the
 * load. No spinner of its own, no error code, no stack: the reader does not
 * care which table timed out, only that tapping once might fix it.
 *
 * Keep it dumb. It owns no fetching and no state; the screen that renders it
 * owns the reload. That is what makes it safe to drop into a 4,000-line
 * component without reasoning about the rest of the file.
 */

export default function LoadFailedNotice({
  /** Overrides the default sentence where a screen needs to name what failed. */
  message = "Couldn't load.",
  /** Runs the load again. The screen owns what that means. */
  onRetry,
  className = "",
}: {
  message?: string;
  onRetry: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-6 text-center ${className}`}
    >
      <p className="text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[var(--bb-accent,#2f7fe8)] px-5 text-sm font-black text-white shadow-sm transition active:scale-[0.98]"
        style={{ color: "#ffffff" }}
      >
        Try Again
      </button>
    </div>
  );
}
