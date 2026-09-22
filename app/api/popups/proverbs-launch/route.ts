import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getCommunityEvent, getCommunityEventState } from "@/lib/communityEvents";

// Who gets the one-time "The Wisdom of Proverbs starts today" popup
// (2026-09-22): members of the community study who have NOT started the
// devotional yet, while the study is live, and only once.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POPUP_ID = "wisdom_proverbs_launch_2026"; // same id as components/ProverbsLaunchPopup.tsx
const EVENT_SLUG = "wisdom-of-proverbs";

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const event = getCommunityEvent(EVENT_SLUG);
  if (!url || !anonKey || !serviceKey || !event) return NextResponse.json({ eligible: false });

  const preview = new URL(request.url).searchParams.get("preview") === "1";
  const state = getCommunityEventState(event);
  if (state.phase !== "live" && !preview) return NextResponse.json({ eligible: false });

  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7) : "";
  if (!token) return NextResponse.json({ eligible: false }, { status: 401 });
  const authClient = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData } = await authClient.auth.getUser(token);
  const userId = userData.user?.id;
  if (!userId) return NextResponse.json({ eligible: false }, { status: 401 });

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const [seen, member, progress] = await Promise.all([
    admin.from("user_popups_seen").select("popup_id").eq("user_id", userId).eq("popup_id", POPUP_ID).limit(1),
    admin.from("community_event_members").select("user_id").eq("event_slug", EVENT_SLUG).eq("user_id", userId).limit(1),
    admin.from("devotional_progress").select("day_number").eq("devotional_id", event.devotionalId).eq("user_id", userId).limit(1),
  ]);
  if (seen.error || seen.data?.length) return NextResponse.json({ eligible: false });
  if (!member.data?.length) return NextResponse.json({ eligible: false });
  if (progress.data?.length) return NextResponse.json({ eligible: false });

  const day = state.phase === "live" ? state.communityDay : 1;
  return NextResponse.json({ eligible: true, day });
}
