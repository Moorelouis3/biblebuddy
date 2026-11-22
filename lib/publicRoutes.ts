/**
 * Which pages anybody may open, signed in or not. Moved out of proxy.ts on
 * 2026-11-19 so the profile-completion gate (components/ProfileCompletionGate.tsx)
 * reads the SAME list instead of keeping a second copy that drifts. proxy.ts
 * still makes the decision; this file only holds the list. No Next imports,
 * so it is safe in the browser.
 */

/** Exact paths anybody may open. */
const PUBLIC_EXACT = new Set([
  // The landing page.
  "/",
  // The way in.
  "/login",
  "/signup",
  "/reset-password",
  // Legal and support. Apple and Google both check these, logged out.
  "/privacy",
  "/terms",
  "/community-guidelines",
  "/contact",
  "/faq",
  "/unsubscribe",
  // Account deletion has to be reachable without the app to satisfy the stores.
  // The page itself still does nothing until somebody signs in.
  "/delete-account",
  // Pages whose whole job is to sell the app to a stranger.
  "/features",
  "/how-it-works",
  "/android",
  "/app",
  "/updates",
  "/ambassador",
  // The Screen Time feature's explainer. /bible-lock/tasks is the feature
  // itself and is not public.
  "/bible-lock",
  // In the sitemap as a door into the app.
  "/bible-in-one-year",
]);

/** Everything under these is public. */
const PUBLIC_PREFIXES = [
  /**
   * Tracked links. This is the most important door in the whole operation and
   * it was shut for a week.
   *
   * /r/<code> is not a page of ours at all: next.config rewrites it to Content
   * Buddy, which counts the click and forwards the person to the landing page.
   * Every link in every comment reply, Instagram DM and promotional post is
   * one of these.
   *
   * When this gate became an allowlist (ca9c6fd5, 8 November 2026) /r was
   * overlooked, so from that day every tracked link 307'd to /signup before
   * the rewrite could run. Two things followed, and both looked like different
   * problems:
   *
   *   - a stranger who clicked a link in a comment met a signup form cold,
   *     instead of the landing page that explains what the app is;
   *   - the click was never counted either, because the counter sits on the
   *     far side of the rewrite and was never reached. "0 clicks" was not
   *     nobody clicking - it was nobody arriving.
   *
   * Nothing of ours is served under /r, so opening it exposes no content.
   */
  "/r",
  // The one thing that belongs on Google.
  "/blog",
  // Readable deep links from posts, email and social: /study/<slug> only
  // resolves a name to a devotional id and redirects to its landing page.
  "/study",
  // Community event sign-up pages. They are doors, and they already gate every
  // action behind an account of their own.
  "/events",
  "/books",
  // Bible Clue room invites (2026-11-22): /play/<code> shows who invited you
  // and sends you to sign up, then into the room. The room itself stays
  // behind an account; the invite page only reads roomInvite().
  "/play",
];

/**
 * A study's own page is a landing page - cover, description, what it is, and a
 * sign-up. It is in the sitemap and it is where /study/<slug>, the blog promos
 * and the emails land somebody who has never heard of Bible Buddy.
 *
 * So /devotionals/<id> is public and /devotionals/<id>/day/<n> - the content -
 * is not. /devotionals on its own is the in-app list and is not public either.
 * app/bible-studies/[id] re-exports the same page, so it gets the same rule.
 */
const LANDING_PARENTS = new Set(["devotionals", "bible-studies"]);

export function isPublicPath(pathname: string): boolean {
  const path =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (PUBLIC_EXACT.has(path)) return true;

  for (const prefix of PUBLIC_PREFIXES) {
    if (path === prefix || path.startsWith(`${prefix}/`)) return true;
  }

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2 && LANDING_PARENTS.has(segments[0])) return true;

  return false;
}

