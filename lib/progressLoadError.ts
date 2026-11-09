/**
 * "We could not read your progress" is not "you have no progress".
 *
 * supabase-js does not throw when a request fails - it RETURNS
 * { data: null, error }. So every helper that read somebody's history and
 * answered a failure with [] or 0 or false was making a statement of fact
 * about that person's own reading, and getting it wrong in the direction
 * that hurts: a reader on day 280 of Bible in One Year was shown Day 1 with
 * nothing read.
 *
 * This is the error those reads throw instead. The rule, as written in
 * lib/libraryCatalog.ts: throw when the screen has NOTHING to show without
 * this read, degrade quietly when the read is a detail.
 *
 * Screens catch it and show components/LoadFailedNotice - "Couldn't load.",
 * "Try Again" - which is Louis's own wording from 2026-11-08: "instead of
 * grey boxes forever, you'd see Couldn't load, tap to try again."
 */
export class ProgressLoadError extends Error {
  constructor(what: string, cause: string) {
    super(`Could not load ${what}: ${cause}`);
    this.name = "ProgressLoadError";
  }
}

/** True for the error above, however it reached you. */
export function isProgressLoadError(err: unknown): boolean {
  return err instanceof ProgressLoadError || (err as { name?: string })?.name === "ProgressLoadError";
}
