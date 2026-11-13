"use client";

/**
 * Why the app froze after being left open (2026-11-07).
 *
 * supabase-js serialises every auth call behind one exclusive Web Lock keyed
 * on the auth storage key, and it asks for that lock with an acquire timeout
 * of -1 - wait forever. `getSession`, `getUser`, `refreshSession` and
 * `signOut` all go through it, and this app calls those from 271 places, with
 * most screens refusing to render until one of them answers.
 *
 * On iOS the app is the live site inside a WKWebView, so the page is suspended
 * every time the phone is locked or another app comes forward. Suspend it
 * while a token refresh is in flight and that fetch never settles: the
 * callback holding the lock never returns, so the lock is never released. From
 * then on every auth call in the app waits behind it forever. Nothing crashes,
 * nothing errors - the screen simply stops answering, and only force-quitting
 * clears it, because a new page context gets a new LockManager.
 *
 * The same thing happens on the web when a background tab is discarded
 * mid-refresh; AppShell already carried a note about it and wrapped its own
 * `getSession` in an 8s timeout. That fixed one call site out of 271. This
 * fixes the lock instead.
 *
 * Two bounds, both of which turn "forever" into "a few seconds":
 *
 *   - the lock is acquired with a real timeout, and if it cannot be had in
 *     time the work runs anyway. Cross-tab serialisation is a nicety here, not
 *     a correctness requirement: supabase-js re-reads storage inside the
 *     callback, so the worst case of two tabs refreshing at once is a wasted
 *     request, while the worst case of waiting forever is the bug above.
 *   - every request the client makes carries an abort timeout, so a fetch the
 *     OS suspended cannot sit in the lock indefinitely in the first place.
 */

/** How long to wait for the auth lock before giving up and doing the work anyway. */
export const AUTH_LOCK_ACQUIRE_TIMEOUT_MS = 5_000;

/** How long any Supabase request may run before it is aborted. */
export const SUPABASE_REQUEST_TIMEOUT_MS = 30_000;

type LockFn<R> = () => Promise<R>;

/**
 * supabase-js decides whether a lock failure is worth reporting by looking for
 * `isAcquireTimeout` on the error (GoTrueClient's auto-refresh tick, which
 * rethrows anything else). Its own LockAcquireTimeoutError carries that flag,
 * so ours has to as well - without it a perfectly ordinary "somebody else is
 * refreshing right now" surfaced as an uncaught exception in the console.
 */
class LockAcquireTimeout extends Error {
  readonly isAcquireTimeout = true;

  constructor(message: string) {
    super(message);
    this.name = "LockAcquireTimeout";
  }
}

function lockManager(): LockManager | null {
  try {
    return globalThis.navigator?.locks ?? null;
  } catch {
    return null;
  }
}

/**
 * Drop-in for supabase-js's `navigatorLock` that cannot wait forever.
 *
 * `acquireTimeout` arrives as -1 ("wait as long as it takes") for ordinary
 * calls and 0 ("only if it is free") for the background refresh tick. The 0
 * case is passed through unchanged, because supabase-js uses the failure as a
 * signal to skip that tick; -1 becomes a real timeout.
 */
export async function boundedAuthLock<R>(
  name: string,
  acquireTimeout: number,
  fn: LockFn<R>,
): Promise<R> {
  const locks = lockManager();
  if (!locks) return await fn();

  if (acquireTimeout === 0) {
    return (await locks.request(name, { mode: "exclusive", ifAvailable: true }, async (lock) => {
      if (!lock) {
        throw new LockAcquireTimeout(
          `Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`,
        );
      }
      return await fn();
    })) as R;
  }

  const waitMs = acquireTimeout > 0 ? acquireTimeout : AUTH_LOCK_ACQUIRE_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), waitMs);

  try {
    return (await locks.request(
      name,
      { mode: "exclusive", signal: controller.signal },
      async () => await fn(),
    )) as R;
  } catch (error) {
    // Only the acquire timed out. A lock we could not get in five seconds is a
    // lock a dead page is holding, so run without it rather than join the
    // queue behind it - that queue is what never moved again.
    if (controller.signal.aborted) {
      console.warn(
        `[SUPABASE_AUTH] Could not take the auth lock in ${waitMs}ms; continuing without it.`,
      );
      return await fn();
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * fetch with a deadline, for the Supabase client.
 *
 * A caller's own AbortSignal still works: whichever fires first wins. The
 * point is that no request the client makes can stay pending for the life of
 * the page, which is what lets a suspended refresh hold the auth lock.
 */
export function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs: number = SUPABASE_REQUEST_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  // A distinct name for *our* deadline firing, so it can never be mistaken for
  // the browser cancelling the request on its own (page navigated away, tab
  // closed) - that one keeps the default "AbortError: signal is aborted
  // without reason" and is not a hang. See lib/supabaseClient.ts, which only
  // reports the latter as a bug because of this difference.
  const timer = setTimeout(
    () => controller.abort(new DOMException("Bible Buddy request timed out", "TimeoutError")),
    timeoutMs,
  );

  const callerSignal = init?.signal;
  if (callerSignal) {
    if (callerSignal.aborted) {
      clearTimeout(timer);
      return Promise.reject(callerSignal.reason ?? new DOMException("Aborted", "AbortError"));
    }
    callerSignal.addEventListener("abort", () => controller.abort(callerSignal.reason), {
      once: true,
    });
  }

  return fetch(input, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}
