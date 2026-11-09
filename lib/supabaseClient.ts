// lib/supabaseClient.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";
import { boundedAuthLock, fetchWithTimeout } from "./supabaseAuthLock";
import { reportSupabaseFailure } from "./supabaseFailureReporter";

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
function instrumentedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  const method = init?.method ?? (typeof input === "object" && "method" in input ? input.method : "GET");

  return fetchWithTimeout(input, init).then(
    (response) => {
      // 4xx is usually the app asking a wrong question; 5xx and 0 are the
      // database or the network, which is what this is here to find.
      if (response.status >= 500) {
        reportSupabaseFailure({ url, method, status: response.status, reason: response.statusText || "server error" });
      }
      return response;
    },
    (error: unknown) => {
      const reason = error instanceof Error ? `${error.name}: ${error.message}` : "fetch failed";
      reportSupabaseFailure({ url, method, status: 0, reason });
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
