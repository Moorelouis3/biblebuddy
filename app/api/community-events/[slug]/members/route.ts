import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCommunityEvent } from "@/lib/communityEvents";

/**
 * Faces for the public study page (2026-10-06), the sibling of ../count.
 *
 * community_event_members is readable only to signed-in users, and a signed-out
 * visitor cannot open a profile page either, so this is the one place member
 * identity reaches the public web. It is therefore deliberately thin: a first
 * name and an avatar, nothing else. No user ids (so the list cannot be used to
 * enumerate accounts), no surnames, no emails, no join dates, no progress.
 *
 * Oldest joiners first, so the page shows the people who have actually been
 * studying rather than whoever signed up a minute ago.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MEMBERS = 40;

function firstName(profile: { display_name?: string | null; username?: string | null }) {
  const raw = (profile.display_name || profile.username || "").trim();
  if (!raw) return "Bible Buddy";
  return raw.split(/\s+/)[0].slice(0, 20);
}

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!getCommunityEvent(slug)) {
    return NextResponse.json({ error: "Unknown event." }, { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const { data: members, error } = await admin
    .from("community_event_members")
    .select("user_id")
    .eq("event_slug", slug)
    .order("joined_at", { ascending: true })
    .limit(MAX_MEMBERS);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const ids = (members || []).map((row) => row.user_id).filter(Boolean);
  if (!ids.length) {
    return NextResponse.json({ members: [] }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  }

  const { data: profiles } = await admin
    .from("profile_stats")
    .select("user_id, display_name, username, profile_image_url")
    .in("user_id", ids);

  const byId = new Map((profiles || []).map((p) => [p.user_id, p]));
  const out = ids
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((profile: any) => ({
      name: firstName(profile),
      image: profile.profile_image_url || null,
    }));

  return NextResponse.json(
    { members: out },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
  );
}
