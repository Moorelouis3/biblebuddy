"use client";

import { useEffect } from "react";
import { useSupabaseUser } from "@/lib/useSupabaseUser";

/**
 * Nothing inside this renders to somebody without an account.
 *
 * Louis, 2026-11-08: "The Bible reader? Should not be on Google. It should be
 * a part of the app ... People should not be able to get to the Bible and read
 * anything without having an account and being inside there."
 *
 * Until now the reader had no auth check at all. app/bible/[book]/[chapter]
 * read the URL and rendered the chapter, so anybody with the link - or anybody
 * guessing /bible/john/3 - got the full chapter, study notes, trivia and
 * scrambled, signed out. Verified on the live site from a browser with no
 * session and no cookies.
 *
 * Two rules, and both matter:
 *
 *   1. Children never render until a user is confirmed. Not "render and then
 *      redirect" - that paints the content first, which is the thing being
 *      prevented, and leaves it in the DOM for anything reading the page.
 *   2. The redirect waits for the auth check to finish. The native app loads
 *      these same URLs, and its session takes a moment to resolve on a cold
 *      start; redirecting during that window would throw a signed-in member
 *      out to the signup page.
 *
 * window.location.replace rather than the Next router: this is a gate, and a
 * full navigation cannot be swallowed by a client-router quirk. `replace`
 * keeps the gated URL out of history, so Back does not bounce between the
 * wall and the page behind it.
 *
 * ?next= is carried through, which /signup and /login both already honour and
 * validate, so somebody who signs up lands on the chapter they came for.
 */

/**
 * Does this browser hold a Supabase session token at all?
 *
 * useSupabaseUser reports "no user" for two very different things: nobody is
 * signed in, and the call to Supabase failed. The second one happens - it is
 * why AppShell carries a retry and a timeout around getSession - and treating
 * it as "no account" would throw a signed-in member out of the chapter they
 * were reading because their train went into a tunnel.
 *
 * So a redirect also requires that no auth token is present. A member who
 * fails the network check keeps the empty shell and gets the chapter when the
 * session resolves; nothing is shown to them in the meantime either way.
 *
 * This cannot be used to get in. A token here is only a reason NOT to eject
 * somebody - the reader still renders nothing until Supabase confirms a user,
 * and every piece of content it loads is behind row-level security that
 * checks the real token, not this.
 *
 * Same cookie test as AppShell's, plus the localStorage key, since the client
 * is configured for browser storage and a WebView can be stingy with cookies.
 */
function hasStoredAuthToken(): boolean {
  try {
    const cookie = document.cookie
      .split(";")
      .some((c) => {
        const name = c.trim().split("=")[0] || "";
        return name.startsWith("sb-") && name.includes("auth-token");
      });
    if (cookie) return true;
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i) || "";
      if (key.startsWith("sb-") && key.includes("auth-token")) return true;
    }
  } catch {
    // Blocked storage. Fall through to "no token", which only means the
    // visitor is sent to signup - the safe direction for a gate.
  }
  return false;
}

export default function RequireAccount({ children }: { children: React.ReactNode }) {
  const { loading, userId } = useSupabaseUser();

  useEffect(() => {
    if (loading || userId) return;
    if (hasStoredAuthToken()) return;
    const next = `${window.location.pathname}${window.location.search}`;
    window.location.replace(`/signup?next=${encodeURIComponent(next)}`);
  }, [loading, userId]);

  if (loading || !userId) {
    // Deliberately empty. A visitor is on their way to /signup and a member is
    // a moment from the real thing; a spinner in between is one more flash.
    return (
      <div className="min-h-screen bg-gray-50" aria-busy="true">
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  return <>{children}</>;
}
