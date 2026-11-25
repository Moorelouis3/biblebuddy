// lib/supabaseClient.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";
import { boundedAuthLock, fetchWithTimeout } from "./supabaseAuthLock";
import { isPageUnloading, reportSupabaseFailure } from "./supabaseFailureReporter";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * The same bounded fetch as before, plus a note of what failed.
 *
 * This is the only place every Supabase request passes through, and it is the
 * only instrument that sees the bugs in docs/STABILITY_VERIFICATION_2026-11-09:
 * none of them throw, so none of them reach a global error listener. See
 * lib/supabaseFailureReporter.ts, which carries its own rate limits so a reader
 * on a dying connection cannot turn this into a write storm.
 *
 * Reporting is fire-and-forget on both paths and cannot change what the caller
 * gets back: a failed request still fails, a 500 is still a 500.
 */
/** The one header that tells an upsert apart from a plain insert - both are a POST. */
function getPreferHeader(headers: HeadersInit | undefined): string | null {
  if (!headers) return null;
  try {
    if (headers instanceof Headers) return headers.get("Prefer");
    if (Array.isArray(headers)) {
      const pair = headers.find(([name]) => name.toLowerCase() === "prefer");
      return pair ? pair[1] : null;
    }
    const record = headers as Record<string, string>;
    const key = Object.keys(record).find((name) => name.toLowerCase() === "prefer");
    return key ? record[key] : null;
  } catch {
    return null;
  }
}

function instrumentedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  const method = init?.method ?? (typeof input === "object" && "method" in input ? input.method : "GET");
  const preferHeader = getPreferHeader(init?.headers);
  // Read now, before the request can fail: by the time .then/.catch below
  // runs, a client-side navigation may have already changed the address bar,
  // which would blame the failure on the wrong page (see
  // lib/supabaseFailureReporter.ts).
  const pathname = typeof window !== "undefined" ? window.location.pathname : undefined;

  return fetchWithTimeout(input, init).then(
    (response) => {
      // 4xx is usually the app asking a wrong question; 5xx and 0 are the
      // database or the network, which is what this is here to find.
      if (response.status >= 500) {
        reportSupabaseFailure({
          url,
          method,
          status: response.status,
          reason: response.statusText || "server error",
          preferHeader,
          pathname,
        });
      }
      return response;
    },
    (error: unknown) => {
      // A plain AbortError here is the browser cancelling the request on its
      // own - the reader navigated away or closed the tab before it finished.
      // That is not a bug, it is nearly every page load that gets abandoned
      // early, and reporting it drowned real failures in noise (see
      // docs/BUG_FIXER_AGENT.md, 2026-11-13). Our own 30s hang detector in
      // lib/supabaseAuthLock.ts uses a different name, TimeoutError, precisely
      // so a genuine hang still gets reported here.
      if (error instanceof Error && error.name === "AbortError") {
        throw error;
      }
      // Same case, different name: WebKit can reject a request cut short by
      // page navigation with a plain "TypeError: Load failed" instead of
      // AbortError (see lib/supabaseFailureReporter.ts). The login page's
      // hard `window.location.href` redirect right after a fire-and-forget
      // app_logins insert is exactly this, on iOS Safari.
      if (isPageUnloading()) {
        throw error;
      }
      const reason = error instanceof Error ? `${error.name}: ${error.message}` : "fetch failed";
      reportSupabaseFailure({ url, method, status: 0, reason, preferHeader, pathname });
      throw error;
    },
  );
}

// ⭐ Use createBrowserClient from @supabase/ssr to store sessions in cookies
// ⭐ This allows middleware to read the session
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
    // Left to itself, supabase-js waits forever for its auth Web Lock, and a
    // page the OS suspended mid-refresh never gives that lock back - which is
    // how the iOS app froze after being left open. See lib/supabaseAuthLock.ts.
    lock: boundedAuthLock,
  },
  global: {
    // No request the client makes may outlive the page it was made on - and
    // the ones that fail leave a trace, because supabase-js will not.
    fetch: instrumentedFetch,
  },
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});

/**
 * "Who is signed in?" is answered from the phone, not the server.
 *
 * supabase.auth.getUser() is a network request every time it is called, and
 * about 150 places call it, usually as the first line of a screen's load.
 * It also holds the auth lock while it waits, so every other Supabase
 * request on the screen queues behind it. On a phone that was up to a second
 * of nothing before any data could even be asked for (docs/SPEED_REPORT_
 * 2026-11-25.md, cause 6).
 *
 * getSession() reads the same user out of the stored session with no
 * request, and refreshes the token by itself when it has expired. The
 * database still checks the token on every query, so this changes how fast
 * the screen learns the answer and nothing about what a person may read.
 *
 * Signed out (no stored session), and any call that passes its own token,
 * still go to the original.
 */
const getUserFromServer = supabase.auth.getUser.bind(supabase.auth);
supabase.auth.getUser = (async (jwt?: string) => {
  if (!jwt) {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data.session?.user) {
        return { data: { user: data.session.user }, error: null };
      }
    } catch {
      // Fall through to the real check.
    }
  }
  return getUserFromServer(jwt);
}) as typeof supabase.auth.getUser;
