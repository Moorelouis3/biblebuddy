import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Clear every unread message at once (Louis, 2026-10-17: "the Mandy convo is
 * always blocked by 40 new messages that aren't new").
 *
 * They were real unread rows, some from June - mark-read only runs when you
 * open a conversation, so forty-seven of them had simply never been opened,
 * and a four-month-old "Thank you Louis" sat in the badge looking like news.
 * Opening forty-seven conversations to clear it is not a fix.
 *
 * Marks only messages sent TO the caller, in conversations the caller is in.
 * Nothing else is touched, and nobody else's messages can be reached.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const currentUserId = userData.user.id;
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Identity comes from the token, never the body: the conversations are
  // whichever ones this account is actually in.
  const { data: conversations, error: convError } = await admin
    .from("conversations")
    .select("id")
    .or(`user_id_1.eq.${currentUserId},user_id_2.eq.${currentUserId}`);
  if (convError) return NextResponse.json({ error: convError.message }, { status: 500 });

  const ids = (conversations || []).map((c) => c.id);
  if (ids.length === 0) return NextResponse.json({ ok: true, cleared: 0 });

  const nowIso = new Date().toISOString();
  const { data: updated, error: updateError } = await admin
    .from("messages")
    .update({ read_at: nowIso })
    .in("conversation_id", ids)
    .neq("sender_id", currentUserId)
    .is("read_at", null)
    .select("id");
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  // The dots in the notification list come from these, so they go too.
  await admin
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", currentUserId)
    .eq("type", "direct_message")
    .eq("is_read", false);

  return NextResponse.json({ ok: true, cleared: (updated || []).length });
}
