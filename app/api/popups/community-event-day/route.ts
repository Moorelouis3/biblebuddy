import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getActiveCommunityEvent, getCommunityEventState } from "@/lib/communityEvents";

// The daily "Day N is ready" reminder (2026-09-23, Louis): members who open
// Bible Buddy but never look at the group still need to know today's day is
// open. Shown at most once per calendar day, and never once that day is done.
//
// user_popups_seen keeps one row per day (popup_id wisdom_proverbs_day_<n>),
// so it cannot repeat on another device either.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const dayPopupId = (slug: string, day: number) => `${slug.replace(/-/g, "_")}_day_${day}`;

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const event = getActiveCommunityEvent();
  if (!url || !anonKey || !serviceKey || !event) return NextResponse.json({ eligible: false });

  const params = new URL(request.url).searchParams;
  const previewDay = Number(params.get("previewDay"));
  const state = getCommunityEventState(event);
  const day = state.phase === "live" ? state.communityDay : previewDay > 0 && previewDay <= event.totalDays ? previewDay : null;
  if (!day) return NextResponse.json({ eligible: false });

  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7) : "";
  if (!token) return NextResponse.json({ eligible: false }, { status: 401 });
  const authClient = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData } = await authClient.auth.getUser(token);
  const userId = userData.user?.id;
  if (!userId) return NextResponse.json({ eligible: false }, { status: 401 });

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const popupId = dayPopupId(event.slug, day);
  const [seen, member, progress, dayRow] = await Promise.all([
    admin.from("user_popups_seen").select("popup_id").eq("user_id", userId).eq("popup_id", popupId).limit(1),
    admin.from("community_event_members").select("user_id").eq("event_slug", event.slug).eq("user_id", userId).limit(1),
    admin
      .from("devotional_progress")
      .select("day_number")
      .eq("user_id", userId)
      .eq("devotional_id", event.devotionalId)
      .eq("day_number", day)
      .eq("is_completed", true)
      .limit(1),
    admin.from("devotional_days").select("day_title").eq("devotional_id", event.devotionalId).eq("day_number", day).maybeSingle(),
  ]);

  if (seen.error || seen.data?.length) return NextResponse.json({ eligible: false });
  if (!member.data?.length) return NextResponse.json({ eligible: false });
  if (progress.data?.length) return NextResponse.json({ eligible: false, reason: "already done today" });

  return NextResponse.json({
    eligible: true,
    popupId,
    day,
    totalDays: event.totalDays,
    title: (dayRow.data as { day_title?: string | null } | null)?.day_title?.trim() || null,
    devotionalId: event.devotionalId,
    eventSlug: event.slug,
  });
}
