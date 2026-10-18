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

  /**
   * Ask the counter which conversations are unread, and clear exactly those.
   *
   * This used to list the account's conversations and update messages in all
   * of them:
   *
   *   .from("conversations").select("id").or(user_id_1.eq…,user_id_2.eq…)
   *
   * with no pagination, and PostgREST stops at a thousand rows. Louis has a
   * conversation with very nearly every account in the app, so that page was
   * a small and arbitrary slice of them - it marked a thousand conversations
   * read, none of which had to be the unread ones, and the badge came back
   * saying 46 the moment he reopened the app. Exactly 46, every time, because
   * nothing it did touched them.
   *
   * get_unread_conversation_ids is the function the unread badge itself
   * counts, so clearing what it returns cannot disagree with it. It is also a
   * far smaller list - the unread ones, not every conversation ever had.
   */
  const { data: unreadRows, error: rpcError } = await (admin as any).rpc(
    "get_unread_conversation_ids",
    { p_user_id: currentUserId },
  );
  if (rpcError) return NextResponse.json({ error: rpcError.message }, { status: 500 });

  const ids = (unreadRows || []).map((row: any) => row.conversation_id).filter(Boolean);
  if (ids.length === 0) return NextResponse.json({ ok: true, cleared: 0 });

  const nowIso = new Date().toISOString();
  let cleared = 0;

  // In chunks, because .in() goes into the URL and a long enough list is
  // rejected before it reaches the database.
  for (let i = 0; i < ids.length; i += 200) {
    const { data: updated, error: updateError } = await admin
      .from("messages")
      .update({ read_at: nowIso })
      .in("conversation_id", ids.slice(i, i + 200))
      .neq("sender_id", currentUserId)
      .is("read_at", null)
      .select("id");
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
    cleared += (updated || []).length;
  }

  // The dots in the notification list come from these, so they go too.
  await admin
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", currentUserId)
    .eq("type", "direct_message")
    .eq("is_read", false);

  return NextResponse.json({ ok: true, cleared });
}
