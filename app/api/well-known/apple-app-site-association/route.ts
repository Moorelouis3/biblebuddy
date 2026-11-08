/**
 * The file iOS reads to decide that a mybiblebuddy.net link belongs to the app.
 *
 * Louis, 2026-11-08: "the emails open the web version of the app in chrome on
 * my iphone, can we make it open the app on ios or android instead of the
 * website?" This is the iOS half of the answer. Apple calls it a Universal
 * Link: when the app is installed and the domain vouches for it here, tapping
 * an https link opens the app instead of Safari or Chrome.
 *
 * Served from a route handler behind a rewrite rather than from public/,
 * for two reasons:
 *   1. Apple requires Content-Type: application/json, and a file with no
 *      extension in public/ is served as application/octet-stream, which
 *      fails silently.
 *   2. Next ignores folders beginning with a dot inside app/, so
 *      app/.well-known/ would never be routed at all.
 * next.config.ts rewrites /.well-known/apple-app-site-association here, and
 * proxy.ts lets /.well-known through without an account - Apple's fetcher is
 * never signed in.
 *
 * WWW ONLY, DELIBERATELY. mybiblebuddy.net 307s to www.mybiblebuddy.net, and
 * iOS does not follow redirects when it matches a link or when it fetches
 * this file. An apex link can therefore never open the app, which is why the
 * email templates were moved onto www in the same commit.
 *
 * Nothing here switches anything on by itself. The app only claims these
 * links once it is built carrying the Associated Domains entitlement - see
 * scripts/ios-entitlements.sh and docs/DEEP_LINKS.md.
 */

// Apple re-fetches this through its CDN; an hour is plenty and keeps a
// mistake from being cached for a day.
export const revalidate = 3600;

/** Team ID (docs/APP_STORE_LISTING.md) + the bundle id from capacitor.config.ts. */
const APP_ID = "Q8TDSF2RP2.net.mybiblebuddy.app";

/**
 * Paths that must stay in the browser.
 *
 * Auth is the important one. A password reset, an email confirmation or an
 * OAuth round trip has to finish where it started, and handing it to the app
 * mid-flight strands it. /unsubscribe has to work for somebody who does not
 * have the app and never will - it is a legal obligation, not a feature - and
 * / is the marketing landing page, which exists to sell the app to a stranger
 * and makes no sense opened inside it.
 */
const BROWSER_ONLY = [
  "/",
  "/login",
  "/login/*",
  "/signup",
  "/signup/*",
  "/reset-password",
  "/reset-password/*",
  "/unsubscribe",
  "/unsubscribe/*",
  "/delete-account",
  "/delete-account/*",
];

export async function GET() {
  const body = {
    applinks: {
      details: [
        {
          appIDs: [APP_ID],
          // Read in order; the first match wins, so the exclusions come first
          // and the catch-all last.
          components: [
            ...BROWSER_ONLY.map((path) => ({
              "/": path,
              exclude: true,
              comment: "Stays in the browser - see app/api/well-known/apple-app-site-association/route.ts",
            })),
            { "/": "/*", comment: "Everything else opens in the Bible Buddy app" },
          ],
        },
      ],
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      // Apple will not read it as anything else.
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
