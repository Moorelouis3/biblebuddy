import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCommunityEvent } from "@/lib/communityEvents";

// How many people have joined a community study, for visitors who are not
// logged in (2026-09-19). community_event_members is readable only to signed
// in users, so a logged out reader arriving from the Proverbs emails saw
// "Be the first Bible Buddy to join the journey" while 69 people had already
// joined. Returns a count only - never names, photos or ids.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!getCommunityEvent(slug)) {
    return NextResponse.json({ error: "Unknown event." }, { status: 404 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const { count, error } = await admin
    .from("community_event_members")
    .select("*", { count: "exact", head: true })
    .eq("event_slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(
    { count: count ?? 0 },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
  );
}
