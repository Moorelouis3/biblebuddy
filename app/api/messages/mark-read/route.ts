import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const conversationId = typeof body?.conversationId === "string" ? body.conversationId : "";
  if (!conversationId) {
    return NextResponse.json({ error: "Missing conversationId." }, { status: 400 });
  }

  // Verify the caller is authenticated
  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const currentUserId = userData.user.id;

  // Use service role so RLS doesn't block the UPDATE
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Verify the caller is a participant in the conversation
  const { data: conversation } = await supabaseAdmin
    .from("conversations")
    .select("id, user_id_1, user_id_2")
    .eq("id", conversationId)
    .maybeSingle();

  if (!conversation || (conversation.user_id_1 !== currentUserId && conversation.user_id_2 !== currentUserId)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const nowIso = new Date().toISOString();

  // Mark all unread messages FROM the other user as read
  const { error: updateError } = await supabaseAdmin
    .from("messages")
    .update({ read_at: nowIso })
    .eq("conversation_id", conversationId)
    .neq("sender_id", currentUserId)
    .is("read_at", null);

  if (updateError) {
    return NextResponse.json({ error: updateError.message || "Could not mark messages as read." }, { status: 500 });
  }

  // Also mark the DM notification as read
  await supabaseAdmin
    .from("notifications")
    .update({ is_read: true })
    .eq("type", "direct_message")
    .eq("article_slug", `/messages/${conversationId}`)
    .eq("user_id", currentUserId)
    .eq("is_read", false);

  return NextResponse.json({ ok: true });
}
