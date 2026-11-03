import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Who is reading Bible in One Year, for the Library's community card.
 *
 * Why this is not app/api/devotionals/[id]/readers: that route takes a
 * devotional uuid and reads devotional_progress through the
 * devotional_readers function. Bible in One Year is a reading plan with its
 * own table and no devotionals row, so it needs its own count.
 *
 * WHAT COUNTS AS A READER HERE, AND WHY IT DIFFERS FROM THE DEVOTIONALS ONE
 *
 * For a devotional, a devotional_progress row means somebody deliberately
 * opened a day, so the count is "anybody with a row". That rule would lie
 * here: lib/guestSession.ts seeds a Day 1 row for every new account so the
 * dashboard has something to show, which on 2026-11-03 made 3,653 people
 * "readers" when 481 had actually finished a day. Nearly all of that number
 * was the seed.
 *
 * So this counts people who have COMPLETED at least one day. It is the
 * smaller number and the true one.
 *
 * Thin on purpose, same rule as the devotionals route: a first name and an
 * avatar. No user ids, no surnames, no emails, no dates, no progress.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_READERS = 24;
const PAGE = 1000;

function firstName(profile: { display_name?: string | null; username?: string | null }) {
  const raw = (profile.display_name || profile.username || "").trim();
  if (!raw) return "Bible Buddy";
  return raw.split(/\s+/)[0].slice(0, 20);
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  // Completed days only, paged: the table is small (under 6k rows) and the
  // answer is cached for five minutes, so this costs one scan per cache miss.
  const readers = new Map<string, number>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await admin
      .from("bible_year_day_progress")
      .select("user_id, reading_completed")
      .eq("reading_completed", true)
      .range(from, from + PAGE - 1);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) break;
    for (const row of data) {
      const id = (row as { user_id: string | null }).user_id;
      if (id) readers.set(id, (readers.get(id) || 0) + 1);
    }
    if (data.length < PAGE) break;
  }

  const total = readers.size;
  if (total === 0) {
    return NextResponse.json(
      { total: 0, readers: [] },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  }

  // The faces are the people furthest into the plan, which is the most
  // encouraging order and stable between requests.
  const ids = [...readers.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_READERS)
    .map(([id]) => id);

  const { data: profiles } = await admin
    .from("profile_stats")
    .select("user_id, display_name, username, profile_image_url")
    .in("user_id", ids);

  const byId = new Map((profiles || []).map((p) => [p.user_id, p]));
  const faces = ids
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((p) => ({
      name: firstName(p as { display_name?: string | null; username?: string | null }),
      image: (p as { profile_image_url?: string | null }).profile_image_url || null,
    }));

  return NextResponse.json(
    { total, readers: faces },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
  );
}
