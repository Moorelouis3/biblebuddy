import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tells Content Buddy that a tracked link turned into a signup.
 *
 * Every reply the commenter writes carries an `r=` code, and Content Buddy
 * counts the clicks on it. It was never told what happened next, because the
 * half of the loop that reports a signup back was designed and never built -
 * so the Closer screen read 7,238 clicks and zero signups, for every window
 * anyone looked at, and the only number Louis actually judges this by was
 * always a flat zero.
 *
 * Server side rather than straight from the browser: Content Buddy answers on
 * another origin and sends no CORS headers, so a fetch from the page would be
 * blocked before it arrived.
 *
 * Never fails the signup. A person who has just created an account must not
 * see an error because a statistic could not be filed, so every failure here
 * is swallowed and answered with ok.
 */
const CONTENT_BUDDY =
  process.env.CONTENT_BUDDY_URL || "https://life-buddy-production.up.railway.app";

export async function POST(request: NextRequest) {
  let code: string | null = null;
  try {
    const body = await request.json();
    code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : null;
  } catch {
    code = null;
  }
  // A code is 6-12 characters of the alphabet Content Buddy generates. Anything
  // else is a stale value or someone poking at the route, and is not worth a
  // round trip.
  if (!code || !/^[A-Z0-9]{6,12}$/.test(code)) {
    return NextResponse.json({ ok: true, reported: false });
  }

  try {
    const res = await fetch(`${CONTENT_BUDDY}/api/closer/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      signal: AbortSignal.timeout(5000),
    });
    return NextResponse.json({ ok: true, reported: res.ok });
  } catch {
    return NextResponse.json({ ok: true, reported: false });
  }
}
