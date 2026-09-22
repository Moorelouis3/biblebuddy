import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Who gets the one-time "New Book Live!" popup (2026-09-22):
//   - signed up for the Wisdom of Proverbs community study, OR
//   - opened / used the Wisdom of Proverbs devotional,
//   - and has not seen this popup yet,
//   - and is not still waiting on the JOIN popup (non-members see that one
//     first; the book popup only follows once it has been seen), so two
//     promos never land in the same visit.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WISDOM_BOOK_POPUP_ID = "wisdom_proverbs_book_2026"; // same id as components/WisdomBookPopup.tsx
const JOIN_POPUP_ID = "wisdom_proverbs_2026";
const EVENT_SLUG = "wisdom-of-proverbs";
const PROVERBS_DEVOTIONAL_ID = "c0ca300a-c0e9-47b8-84c5-99aca743a203";
const DEVOTIONAL_ACTIONS = [
  "devotional_opened",
  "devotional_day_opened",
  "devotional_day_started",
  "devotional_day_viewed",
  "devotional_day_completed",
];

export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) return NextResponse.json({ eligible: false });

  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7) : "";
  if (!token) return NextResponse.json({ eligible: false }, { status: 401 });
  const authClient = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData } = await authClient.auth.getUser(token);
  const userId = userData.user?.id;
  if (!userId) return NextResponse.json({ eligible: false }, { status: 401 });

  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const [seen, member, progress, actions] = await Promise.all([
    admin.from("user_popups_seen").select("popup_id").eq("user_id", userId).in("popup_id", [WISDOM_BOOK_POPUP_ID, JOIN_POPUP_ID]),
    admin.from("community_event_members").select("user_id").eq("event_slug", EVENT_SLUG).eq("user_id", userId).limit(1),
    admin.from("devotional_progress").select("user_id").eq("devotional_id", PROVERBS_DEVOTIONAL_ID).eq("user_id", userId).limit(1),
    admin
      .from("master_actions")
      .select("id")
      .eq("user_id", userId)
      .in("action_type", DEVOTIONAL_ACTIONS)
      .ilike("action_label", "%proverbs%")
      .limit(1),
  ]);

  const seenIds = new Set((seen.data || []).map((row: { popup_id: string }) => row.popup_id));
  if (seen.error || seenIds.has(WISDOM_BOOK_POPUP_ID)) return NextResponse.json({ eligible: false });

  const isMember = Boolean(member.data?.length);
  const usedDevotional = Boolean(progress.data?.length || actions.data?.length);
  if (!isMember && !usedDevotional) return NextResponse.json({ eligible: false });
  // Non-members get the join popup first.
  if (!isMember && !seenIds.has(JOIN_POPUP_ID)) return NextResponse.json({ eligible: false });

  return NextResponse.json({ eligible: true, reason: isMember ? "member" : "devotional" });
}
