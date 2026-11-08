import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The app is an app. One gate, in front of everything.
 *
 * Louis, 2026-11-08: "the only thing open is the blog and the like data pages,
 * about, security crap... landing page of course but everything else in the app
 * is a fucking app!!!! locked ... can you go to fucking duolingo and get to
 * their day 5 training without logging in?"
 *
 * So this is an allowlist, not a blocklist. A path is public only if it is named
 * below; everything else needs an account. That direction matters more than the
 * list does - it means a page somebody adds next month is locked the day it is
 * added instead of quietly becoming the next thing that was open for months.
 *
 * What this replaced: a blocklist of eight prefixes - /dashboard,
 * /reading-plan(s), /notes, /ai, /grow, /profile, /bible-trivia. Everything
 * nobody thought to name was open, which is how the entire Bible (1,189
 * chapters), /reading, the word games, every reference page and every study note
 * ended up readable by anybody with the URL.
 *
 * It also no longer calls supabase.auth.getUser(). That was a network round trip
 * to Supabase on every single protected page view, and it was pointless twice
 * over: the paid branch it fed has been dead since core study went free
 * (CORE_STUDY_IS_FREE), and when the call failed the code fell through to
 * checking the cookie anyway. A request-per-page-view to the database is the
 * exact shape of the thing that took the database down in October.
 *
 * Why a cookie test is enough: the only thing being decided here is whether
 * somebody gets to see a page at all. Every piece of data behind these pages is
 * fetched by the browser with a real token and sits behind row level security,
 * so a forged cookie buys an empty page. lib/supabaseClient.ts has stored the
 * session in cookies since 2025-12-10 (createBrowserClient), the same store the
 * client reads, so "has a cookie" and "is signed in" are one question here.
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
  // The one thing that belongs on Google.
  "/blog",
  // Readable deep links from posts, email and social: /study/<slug> only
  // resolves a name to a devotional id and redirects to its landing page.
  "/study",
  // Community event sign-up pages. They are doors, and they already gate every
  // action behind an account of their own.
  "/events",
  "/books",
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

/**
 * Not pages at all: Next's own assets, the API, and anything with a file
 * extension (sitemap.xml, robots.txt, feed.xml, the manifest, every image).
 *
 * /.well-known is here for the deep-link files that let an https link open
 * the app instead of Chrome. Apple's and Google's fetchers are never signed
 * in, so without this the gate below sends them to /signup and the whole
 * feature fails silently - the apps simply never claim the domain, with no
 * error anywhere to say why.
 *
 * Note that the extension test two lines down would have let
 * /.well-known/assetlinks.json through on its own, but NOT
 * /.well-known/apple-app-site-association, which Apple requires to have no
 * extension at all. Naming the prefix covers both and does not depend on a
 * filename keeping its dot.
 */
const SKIP_PREFIXES = ['/_next/', '/api/', '/.well-known/'];

function isNotAPage(pathname: string): boolean {
  if (SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  const lastSegment = pathname.slice(pathname.lastIndexOf('/') + 1);
  return lastSegment.includes('.');
}

function isPublicPath(pathname: string): boolean {
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

/**
 * Does this request carry a Supabase session cookie?
 *
 * @supabase/ssr splits a token too big for one cookie into `...auth-token.0`,
 * `...auth-token.1`, so this matches a prefix rather than an exact name. The
 * code verifier cookie is written during an OAuth round trip and is not a
 * session, so it does not count.
 */
function hasSessionCookie(req: NextRequest): boolean {
  return req.cookies.getAll().some(
    ({ name, value }) =>
      name.startsWith("sb-") &&
      name.includes("auth-token") &&
      !name.includes("code-verifier") &&
      Boolean(value)
  );
}

/**
 * A sign-in that is still landing.
 *
 * Supabase finishes some flows in the browser - the magic link and recovery
 * links put their tokens in the URL, and the PKCE exchange happens after the
 * page loads - so for one navigation there can be a signed-in person with no
 * cookie yet. Bouncing them to /signup at that exact moment would break the
 * link they just clicked. Carried over from the proxy this replaced, where it
 * was there for the same reason.
 */
function isLandingFromAuth(req: NextRequest): boolean {
  const url = req.url;
  if (url.includes("access_token") || url.includes("refresh_token") || url.includes("code=")) {
    return true;
  }
  const referer = req.headers.get("referer") || "";
  return (
    referer.includes("/login") ||
    referer.includes("/signup") ||
    referer.includes("/reset-password")
  );
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (isNotAPage(pathname) || isPublicPath(pathname)) return NextResponse.next();

  // Locked either way: nothing inside the app is for an index, signed in or
  // not. A header rather than per-page metadata, so a new page cannot forget.
  const headers = { "X-Robots-Tag": "noindex, nofollow" };

  if (hasSessionCookie(req) || isLandingFromAuth(req)) {
    return NextResponse.next({ headers });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/signup";
  url.search = "";
  // /signup and /login both already validate and honour ?next=, so somebody who
  // signs up lands on the page they were trying to open.
  url.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(url, { headers });
}

export const config = {
  // '/:path*' and not the usual negative-lookahead one-liner. A custom regex
  // group in a Next matcher is compiled by path-to-regexp, where '/' is a
  // segment delimiter a group cannot cross: '/((?!api|_next).*)' matched '/'
  // and '/blog' and never matched '/bible/john/3', so the gate ran on exactly
  // the paths that did not need it. Verified by the absence of a 'proxy.ts: Xms'
  // line on every nested path in the dev server log.
  //
  // So this matches everything and SKIP_PREFIXES above does the excluding,
  // where it is plain code that can be read and tested.
  matcher: ['/:path*'],
};
