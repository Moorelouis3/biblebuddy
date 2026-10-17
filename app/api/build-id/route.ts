import { NextResponse } from "next/server";

/**
 * Which build is live right now.
 *
 * The store app is a WKWebView pointed at mybiblebuddy.net, so a deploy is
 * supposed to reach it the moment it lands. It does not: iOS caches the HTML,
 * the cached HTML names the old JavaScript, and force-quitting the app does
 * not clear it. Louis, 2026-10-17, after two fixes failed to appear and one
 * reinstall: no notification prompt, and a Bible Lock strip still offering to
 * set up a lock that was already on.
 *
 * So the app asks. Never cached - the whole point is to be newer than
 * whatever the webview is holding.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    { id: process.env.VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_DEPLOYMENT_ID || "dev" },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
