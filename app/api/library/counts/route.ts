import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { COMMUNITY_EVENTS } from "@/lib/communityEvents";
// The shelf id of Bible in One Year (BIBLE_YEAR_SHELF_ID in lib/libraryCatalog),
// written out: that module builds the browser Supabase client on import.
const BIBLE_YEAR_SHELF_ID = "bible-in-one-year";

/**
 * How many Buddies are in each study, for the Library's holders
 * (Louis, 2026-11-21: "says how many people are doing it ... most popular to
 * least as default").
 *
 * Not a new way of counting. Each number is one an existing screen already
 * shows, so the Library never disagrees with them:
 * - a devotional: devotional_readers, the "N Bible Buddies are studying" total
 *   on the study's own page (app/api/devotionals/[id]/readers).
 * - a community study: the larger of that and community_event_members, the
 *   count its signup page shows (app/api/community-events/[slug]/count). An
 *   upcoming study has joiners long before anyone can open a day.
 * - Bible in One Year: distinct people with a row in bible_year_day_progress.
 *
 * Counts only, never ids or names. Cached ten minutes at the edge.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: devotionals, error } = await admin.from("devotionals").select("id").limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const counts: Record<string, number> = {};

  await Promise.all(
    (devotionals || []).map(async ({ id }: { id: string }) => {
      const { data } = await admin.rpc("devotional_readers", { p_devotional_id: id, p_limit: 0 });
      counts[id] = Number((data as { total?: number } | null)?.total ?? 0);
    }),
  );

  await Promise.all(
    COMMUNITY_EVENTS.map(async (event) => {
      const { count } = await admin
        .from("community_event_members")
        .select("*", { count: "exact", head: true })
        .eq("event_slug", event.slug);
      counts[event.devotionalId] = Math.max(counts[event.devotionalId] ?? 0, count ?? 0);
    }),
  );

  // Paged: every response stops at 1000 rows (PostgREST cap), and this table
  // is several thousand.
  const readers = new Set<string>();
  for (let from = 0; from < 200_000; from += 1000) {
    const { data, error: pageError } = await admin
      .from("bible_year_day_progress")
      .select("user_id")
      .order("id")
      .range(from, from + 999);
    if (pageError || !data) break;
    for (const row of data as Array<{ user_id: string }>) readers.add(row.user_id);
    if (data.length < 1000) break;
  }
  counts[BIBLE_YEAR_SHELF_ID] = readers.size;

  return NextResponse.json(
    { counts },
    { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800" } },
  );
}
