"use client";

/**
 * Records Supabase requests that fail, so the quiet bugs stop being quiet.
 *
 * The 8 November 2026 audit's headline recommendation was a global
 * `unhandledrejection` listener. It would have found almost nothing. supabase-js
 * does not throw when a request fails - postgrest-js catches the fetch rejection
 * and RETURNS `{ data: null, error }`, and auth-js does the same - so a failed
 * read reaches no error listener anywhere. Only storage calls and raw `fetch`
 * throw. Shipping those listeners and waiting a day would have produced an empty
 * list, and an empty list reads as "those bugs were theoretical".
 *
 * Every bug in that audit and in the 9 November verification is a failed
 * Supabase request. So this sits where all of them pass: the client's own
 * `fetch`, already wrapped in lib/supabaseAuthLock.ts for the 30s timeout.
 *
 * WHAT IT SENDS: the table, the operation, the HTTP status, a short reason and
 * `location.pathname`. Never a payload, never a filter value, never anything a
 * reader typed, and never the query string - a password-reset token lives in
 * one of those (see lib/crashRecovery.ts, fixed in the same commit).
 *
 * WHAT STOPS IT BECOMING THE OUTAGE: monitoring is the one feature that can
 * cause the failure it was added to observe. October's three database outages
 * came from an 8-second poll, and a reader on a dying connection produces a
 * failed request every few seconds. `recordBugReport` is 2-4 round trips. So
 * there are three bounds, all client-side, all free:
 *
 *   1. one post per fingerprint per page load - a screen retrying ten times
 *      posts once;
 *   2. a hard ceiling of ten posts per page load, whatever happens;
 *   3. offline sends nothing at all. A reader with no connection is not news,
 *      and the post could not arrive anyway.
 *
 * The bounds are the interesting part, so they are pure functions with no
 * browser globals in them, and npm run verify:supabase-failure-reporter runs
 * them for real rather than modelling them.
 */

/** Never more than this many reports from one page load, however bad it gets. */
export const MAX_REPORTS_PER_PAGE_LOAD = 10;

export type ReporterState = {
  /** Fingerprints already posted during this page load. */
  sent: Set<string>;
  /** How many posts have gone out, which is also sent.size, kept separate for clarity. */
  posted: number;
};

export function newReporterState(): ReporterState {
  return { sent: new Set<string>(), posted: 0 };
}

export type RequestDescription = {
  /** The table or view, or "auth" / "storage" for the non-postgrest endpoints. */
  table: string;
  operation: "select" | "insert" | "update" | "upsert" | "delete" | "rpc" | "auth" | "storage";
};

/**
 * What failed, in terms safe to send: a table name and a verb.
 *
 * Returns null for anything that is not a Supabase request, and for our own
 * reporting endpoint - a reporter that reports its own failures is a loop.
 */
export function describeSupabaseRequest(url: string, method: string): RequestDescription | null {
  if (!url) return null;
  if (url.includes("/api/bug-reports")) return null;

  let path: string;
  try {
    path = url.startsWith("http") ? new URL(url).pathname : url.split("?")[0];
  } catch {
    return null;
  }

  const verb = (method || "GET").toUpperCase();

  if (path.includes("/auth/v1/")) return { table: "auth", operation: "auth" };
  if (path.includes("/storage/v1/")) return { table: "storage", operation: "storage" };

  const rest = path.match(/\/rest\/v1\/(?:rpc\/)?([A-Za-z0-9_]+)/);
  if (!rest) return null;
  const table = rest[1];
  if (path.includes("/rest/v1/rpc/")) return { table, operation: "rpc" };

  const operation: RequestDescription["operation"] =
    verb === "GET" || verb === "HEAD"
      ? "select"
      : verb === "POST"
        ? "insert"
        : verb === "PATCH"
          ? "update"
          : verb === "PUT"
            ? "upsert"
            : verb === "DELETE"
              ? "delete"
              : "select";

  return { table, operation };
}

/**
 * One bug, one fingerprint.
 *
 * Ids in the path are replaced so that the same failure on every devotional
 * collapses into one row rather than one row per study, which is the same
 * normalisation the crash endpoint does for chunk hashes.
 */
export function failureFingerprint(input: {
  table: string;
  operation: string;
  status: number;
  reason: string;
  pathname: string;
}): string {
  const page = (input.pathname || "/")
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, "#")
    .replace(/\d+/g, "#")
    .slice(0, 120);
  const reason = (input.reason || "")
    .replace(/\d+/g, "#")
    .slice(0, 80);
  return `supabase:${input.table}:${input.operation}:${input.status}:${page}:${reason}`;
}

/**
 * The three bounds. Pure, so the test can run them rather than describe them.
 *
 * Being offline deliberately costs nothing: it returns false before the budget
 * is touched, so a reader whose connection drops and comes back still has all
 * ten reports available for the failures that can actually be posted.
 */
export function shouldReport(state: ReporterState, fingerprint: string, online: boolean): boolean {
  if (!online) return false;
  if (state.posted >= MAX_REPORTS_PER_PAGE_LOAD) return false;
  if (state.sent.has(fingerprint)) return false;
  state.sent.add(fingerprint);
  state.posted += 1;
  return true;
}

// ── The stateful part ───────────────────────────────────────────────────────

const pageState = newReporterState();

/** A local dev server has no real visitors, so its failures are noise. */
function isLocalDevHost(): boolean {
  try {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
  } catch {
    return true;
  }
}

function isOnline(): boolean {
  try {
    // Only `false` is trustworthy: `true` means "has an interface", not "can
    // reach the internet". That is fine - the point is to suppress the
    // certainly-pointless case, not to predict success.
    return navigator.onLine !== false;
  } catch {
    return true;
  }
}

/**
 * Fire and forget. Never awaited, never throws, never the reason a page breaks.
 *
 * Deliberately uses plain `fetch` and sends no auth token: reaching for
 * `supabase.auth.getSession()` from inside the client's own fetch wrapper is a
 * recursion waiting to happen. Reports arrive unattributed, which is the right
 * trade - the table and the page are what identify the bug.
 */
export function reportSupabaseFailure(input: {
  url: string;
  method: string;
  status: number;
  reason: string;
}): void {
  try {
    if (typeof window === "undefined") return;
    if (isLocalDevHost()) return;

    const described = describeSupabaseRequest(input.url, input.method);
    if (!described) return;

    const pathname = window.location.pathname;
    const fingerprint = failureFingerprint({
      table: described.table,
      operation: described.operation,
      status: input.status,
      reason: input.reason,
      pathname,
    });

    if (!shouldReport(pageState, fingerprint, isOnline())) return;

    void fetch("/api/bug-reports/supabase-failure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        table: described.table,
        operation: described.operation,
        status: input.status,
        reason: input.reason.slice(0, 200),
        page: pathname,
        fingerprint,
      }),
      keepalive: true,
    }).catch(() => {
      // The connection that failed the first request is the one being asked to
      // carry the report about it. Losing it is expected and fine.
    });
  } catch {
    // Monitoring must never make the thing it monitors worse.
  }
}
