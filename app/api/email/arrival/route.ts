import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Records a visit that arrived from an email link.
 *
 * This is what replaced the SES click number on 2026-11-09. SES could only
 * count a click by rewriting every link through awstrack.me, and that is
 * exactly what stopped email links opening the app, so click tracking was
 * turned off. Every email link already carries ?utm_source=email, so the site
 * can count the arrival itself. See docs/DEEP_LINKS.md and
 * supabase/migrations/20261109_email_arrivals.sql.
 *
 * One request per arrival. Nothing here polls, and nothing retries: a lost
 * statistic is cheaper than another request-per-tick against the database,
 * which is what took it down three times in October.
 */

/** Written to by the service key only - the table's RLS allows nothing else. */
function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

/**
 * The table may not exist yet on an environment where the migration has not
 * been run. Same shape as app/api/blog/track-promo/route.ts: say ok and drop
 * the row rather than handing the browser an error over a statistic.
 */
function isMissingTable(message?: string | null) {
  return /email_arrivals|schema cache|does not exist|could not find the table/i.test(message || "");
}

/** Keeps a query string or a fragment out of the stored path. */
function cleanPath(value: unknown): string {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw.startsWith("/")) return "";
  return raw.split(/[?#]/)[0].slice(0, 300);
}

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export async function POST(request: NextRequest) {
  const db = admin();
  if (!db) return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 500 });

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });

  const pagePath = cleanPath(body.page_path);
  if (!pagePath) return NextResponse.json({ ok: false, error: "Invalid page_path." }, { status: 400 });

  const campaignId = cleanText(body.campaign_id, 100);
  const sessionId = cleanText(body.session_id, 200);

  // Who, from the session rather than from the link. A per-recipient token in
  // the URL would be the obvious way to do this and is the reason not to: it
  // puts something that identifies a person into an address that gets shared,
  // logged by every proxy on the way, and pasted into chats.
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  let userId: string | null = null;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (token && anonKey) {
    const asReader = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data } = await asReader.auth.getUser(token);
    userId = data.user?.id || null;
  }

  // The Capacitor shell loads this same site, so the user agent is the only
  // thing that separates an arrival in the app from one in a browser.
  // appendUserAgent puts "BibleBuddyApp" there and several other things
  // already depend on it.
  const userAgent = request.headers.get("user-agent") || "";
  const isNative = /BibleBuddyApp/i.test(userAgent);

  const { error } = await db.from("email_arrivals").insert({
    campaign_id: campaignId,
    page_path: pagePath,
    user_id: userId,
    session_id: sessionId,
    user_agent: userAgent.slice(0, 500) || null,
    is_native: isNative,
  });

  if (error) {
    if (isMissingTable(error.message)) return NextResponse.json({ ok: true, stored: false });
    console.error("[EMAIL ARRIVAL] could not record:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
