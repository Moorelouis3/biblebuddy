import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Who is studying a devotional, for the Library's study page.
 *
 * The public Proverbs page has had "N Bible Buddies are studying Proverbs"
 * with faces since 2026-10-06, but it reads community_event_members, which
 * only exists for the two community studies. Louis, 2026-10-17: "well hell,
 * any devotional in our library should have the page like that." So this reads
 * devotional_progress instead, through the devotional_readers function - the
 * people who have actually opened a day, which every study has.
 *
 * Note the two numbers mean different things and will not match: the community
 * page counts people who joined the event, this counts people who opened a day.
 *
 * Deliberately thin, same rule as app/api/community-events/[slug]/members: a
 * first name and an avatar. No user ids (so the list cannot enumerate
 * accounts), no surnames, no emails, no progress, no dates.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_READERS = 24;

function firstName(profile: { display_name?: string | null; username?: string | null }) {
  const raw = (profile.display_name || profile.username || "").trim();
  if (!raw) return "Bible Buddy";
  return raw.split(/\s+/)[0].slice(0, 20);
}

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Bad devotional id." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data, error } = await admin.rpc("devotional_readers", {
    p_devotional_id: id,
    p_limit: MAX_READERS,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const total = Number((data as any)?.total ?? 0);
  const ids: string[] = Array.isArray((data as any)?.user_ids) ? (data as any).user_ids : [];
  if (!ids.length) {
    return NextResponse.json(
      { total, readers: [] },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  }

  const { data: profiles } = await admin
    .from("profile_stats")
    .select("user_id, display_name, username, profile_image_url")
    .in("user_id", ids);

  const byId = new Map((profiles || []).map((p) => [p.user_id, p]));
  // Keep the function's order (longest-standing readers first) rather than
  // whatever order the profile lookup came back in.
  const readers = ids
    .map((userId) => byId.get(userId))
    .filter(Boolean)
    .map((p: any) => ({ name: firstName(p), image: p.profile_image_url || null }));

  return NextResponse.json(
    { total, readers },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
  );
}
