/**
 * The regression test for the iOS freeze (2026-11-07).
 *
 *   npm run verify:auth-lock
 *
 * Everything here is stubbed - no network, no database, no Supabase project -
 * so it costs nothing and can run on any machine. What it pins down is the one
 * behaviour the app was missing: when the auth Web Lock is held by a page that
 * will never give it back, an auth call has to carry on anyway instead of
 * waiting for the life of the page.
 *
 * The real LockManager is modelled faithfully enough to matter: `ifAvailable`
 * hands the callback `null` when the lock is busy, and a request made with an
 * AbortSignal rejects when that signal fires.
 */
import {
  AUTH_LOCK_ACQUIRE_TIMEOUT_MS,
  SUPABASE_REQUEST_TIMEOUT_MS,
  boundedAuthLock,
  fetchWithTimeout,
} from "../lib/supabaseAuthLock";

let passed = 0;
const failures: string[] = [];

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  ok  ${label}`);
  } else {
    failures.push(label);
    console.log(`FAIL  ${label}`);
  }
}

type LockRequest = (
  name: string,
  options: { mode: string; ifAvailable?: boolean; signal?: AbortSignal },
  callback: (lock: { name: string } | null) => Promise<unknown>,
) => Promise<unknown>;

/** A LockManager whose lock is either free or held by somebody who never returns. */
function fakeLocks(held: boolean): { request: LockRequest } {
  return {
    request: async (name, options, callback) => {
      if (options.ifAvailable) {
        return await callback(held ? null : { name });
      }
      if (!held) return await callback({ name });
      // Held: the request only ever settles if the caller aborts it, exactly
      // as the browser behaves.
      return await new Promise((_resolve, reject) => {
        options.signal?.addEventListener(
          "abort",
          () => reject(options.signal?.reason ?? new DOMException("Aborted", "AbortError")),
          { once: true },
        );
      });
    },
  };
}

function setLocks(locks: { request: LockRequest } | null) {
  Object.defineProperty(globalThis, "navigator", {
    value: locks ? { locks } : {},
    configurable: true,
    writable: true,
  });
}

async function main() {
  console.log("Supabase auth lock and request timeouts\n");

  // ── The lock ───────────────────────────────────────────────────────────────
  setLocks(null);
  check(
    "runs the work when the browser has no LockManager at all",
    (await boundedAuthLock("lock:x", -1, async () => "ran")) === "ran",
  );

  setLocks(fakeLocks(false));
  check(
    "takes a free lock and returns the result",
    (await boundedAuthLock("lock:x", -1, async () => "ran")) === "ran",
  );

  check(
    "ifAvailable (acquireTimeout 0) runs when the lock is free",
    (await boundedAuthLock("lock:x", 0, async () => "ran")) === "ran",
  );

  setLocks(fakeLocks(true));
  let busyError: unknown = null;
  try {
    await boundedAuthLock("lock:x", 0, async () => "ran");
  } catch (error) {
    busyError = error;
  }
  check(
    "ifAvailable rejects when the lock is busy, so the refresh tick skips",
    busyError instanceof Error,
  );
  check(
    "that rejection is flagged isAcquireTimeout, so supabase-js swallows it instead of throwing",
    Boolean((busyError as { isAcquireTimeout?: boolean })?.isAcquireTimeout),
  );

  /**
   * The freeze itself. Before this change the call below never settled, and
   * every screen waiting on getSession() waited with it until the app was
   * force-quit.
   */
  const startedAt = Date.now();
  const result = await boundedAuthLock("lock:x", 150, async () => "ran anyway");
  const waited = Date.now() - startedAt;
  check("a lock held forever no longer hangs the caller", result === "ran anyway");
  check(`gives up near its timeout rather than waiting (waited ${waited}ms)`, waited >= 140 && waited < 3000);

  let threw: unknown = null;
  setLocks(fakeLocks(false));
  try {
    await boundedAuthLock("lock:x", -1, async () => {
      throw new Error("auth failed");
    });
  } catch (error) {
    threw = error;
  }
  check(
    "a real failure inside the lock still reaches the caller",
    threw instanceof Error && threw.message === "auth failed",
  );

  check(
    "the default acquire timeout is short enough to be invisible but long enough to be real",
    AUTH_LOCK_ACQUIRE_TIMEOUT_MS >= 1_000 && AUTH_LOCK_ACQUIRE_TIMEOUT_MS <= 10_000,
  );

  // ── The request timeout ────────────────────────────────────────────────────
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (_input: unknown, init?: RequestInit) =>
    await new Promise((_resolve, reject) => {
      init?.signal?.addEventListener(
        "abort",
        () => reject(new DOMException("Aborted", "AbortError")),
        { once: true },
      );
    })) as typeof fetch;

  let aborted = false;
  try {
    await fetchWithTimeout("https://example.test/never", undefined, 120);
  } catch (error) {
    aborted = (error as Error)?.name === "AbortError";
  }
  check("a request that never answers is aborted rather than left pending", aborted);

  globalThis.fetch = (async () => ({ ok: true, status: 200 })) as unknown as typeof fetch;
  const quick = await fetchWithTimeout("https://example.test/ok", undefined, 5_000);
  check("a normal response passes straight through", quick.status === 200);

  const callerController = new AbortController();
  globalThis.fetch = (async (_input: unknown, init?: RequestInit) =>
    await new Promise((_resolve, reject) => {
      init?.signal?.addEventListener(
        "abort",
        () => reject(new DOMException("Aborted", "AbortError")),
        { once: true },
      );
    })) as typeof fetch;
  const callerAbort = fetchWithTimeout("https://example.test/slow", { signal: callerController.signal }, 60_000);
  callerController.abort();
  let callerWon = false;
  try {
    await callerAbort;
  } catch (error) {
    callerWon = (error as Error)?.name === "AbortError";
  }
  check("a caller's own abort still works", callerWon);

  let preAborted = false;
  try {
    await fetchWithTimeout("https://example.test/x", { signal: AbortSignal.abort() }, 60_000);
  } catch {
    preAborted = true;
  }
  check("an already-aborted signal is refused without calling fetch", preAborted);

  check(
    "the request timeout is generous enough for a slow phone",
    SUPABASE_REQUEST_TIMEOUT_MS >= 15_000,
  );

  globalThis.fetch = originalFetch;

  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length) {
    for (const failure of failures) console.log(`  - ${failure}`);
    process.exit(1);
  }
}

void main();
