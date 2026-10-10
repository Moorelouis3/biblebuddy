import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Daily sign-ups, split into anonymous guests and real email accounts, so the
 * effect of the signup wall can be read week over week.
 *
 * Louis, 2026-10-08: guests were switched off on the 6th, total sign-ups fell,
 * and the question was whether the emails gained were worth the accounts lost.
 * He asked for the same table every Wednesday so the comparison builds itself
 * instead of being re-derived by hand each time.
 *
 * Counted from auth.users, NOT from the user_signups table. user_signups
 * undercounts anything before 2026-10-07 - 1 October has one row against eight
 * real accounts - because it is written by the signup form and the pre-wall
 * guest-to-account path often skipped it. auth.users is the only place that
 * knows both is_anonymous and the real email, and it is the source the
 * original 1,872-guests measurement came from, so the baseline below is
 * comparable.
 *
 * Bucketed by Europe/Berlin day, never UTC. Louis reads these numbers on his
 * own clock and a UTC day boundary moves the 22:00-24:00 Berlin block into the
 * wrong day - it reported 7 October as 16 accounts when the real figure was 20.
 */

// Measured once from auth.users over 22 Sep - 5 Oct 2026, the last full
// fortnight before the wall. Kept as a constant rather than recomputed each
// run: it is a fixed historical fact, and recomputing it would mean
// enumerating every user back to September on every call.
const BASELINE = {
  window: "2026-09-22 to 2026-10-05",
  perDay: { anonymous: 33.1, withEmail: 4.6, total: 37.7 },
};

const WALL_DATE = "2026-10-06";

function isAuthorized(request: NextRequest) {
  const secret = process.env.SECOND_BRAIN_STATS_SECRET;
  // Fails closed, like /api/stats/second-brain: a sign-up endpoint should
  // never be reachable when no secret is configured.
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const requestedDays = Number(request.nextUrl.searchParams.get("days"));
  const days = Number.isFinite(requestedDays) ? Math.min(Math.max(requestedDays, 1), 90) : 21;

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const berlinDay = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const cutoff = berlinDay.format(new Date(Date.now() - days * 24 * 60 * 60 * 1000));

  const buckets = new Map<string, { day: string; anonymous: number; withEmail: number }>();
  let scanned = 0;
  let truncated = false;

  // listUsers has no date filter, so this walks the whole table. At ~7,000
  // users that is seven pages and a few seconds. The page cap is a guard for
  // the day that stops being true - if it ever trips, the response says so
  // rather than quietly reporting short numbers.
  const MAX_PAGES = 50;
  for (let page = 1; ; page += 1) {
    if (page > MAX_PAGES) {
      truncated = true;
      break;
    }
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data.users.length) break;

    for (const user of data.users) {
      scanned += 1;
      const day = berlinDay.format(new Date(user.created_at));
      if (day < cutoff) continue;
      const anonymous = user.is_anonymous === true || (!user.email && !user.phone);
      const bucket = buckets.get(day) || { day, anonymous: 0, withEmail: 0 };
      if (anonymous) bucket.anonymous += 1;
      else bucket.withEmail += 1;
      buckets.set(day, bucket);
    }

    if (data.users.length < 1000) break;
  }

  const rows = [...buckets.values()]
    .sort((a, b) => a.day.localeCompare(b.day))
    .map((row) => ({ ...row, total: row.anonymous + row.withEmail }));

  // Today is still running, so it is marked rather than silently averaged in.
  const today = berlinDay.format(new Date());
  const complete = rows.filter((row) => row.day !== today && row.day > WALL_DATE);
  const sum = (key: "anonymous" | "withEmail" | "total") =>
    complete.reduce((acc, row) => acc + row[key], 0);

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    today,
    wallDate: WALL_DATE,
    timezone: "Europe/Berlin",
    baseline: BASELINE,
    days: rows,
    sinceWall: complete.length
      ? {
          completeDays: complete.length,
          perDay: {
            anonymous: Number((sum("anonymous") / complete.length).toFixed(1)),
            withEmail: Number((sum("withEmail") / complete.length).toFixed(1)),
            total: Number((sum("total") / complete.length).toFixed(1)),
          },
        }
      : null,
    scanned,
    truncated,
  });
}
