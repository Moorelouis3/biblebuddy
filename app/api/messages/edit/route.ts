import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDirectMessagePreview } from "@/lib/directMessageActions";

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
  const messageId = typeof body?.messageId === "string" ? body.messageId : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";

  if (!messageId || !content) {
    return NextResponse.json({ error: "Missing messageId or content." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const currentUserId = userData.user.id;

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: message, error: messageError } = await supabaseAdmin
    .from("messages")
    .select("id, conversation_id, sender_id, created_at, action_label, action_href")
    .eq("id", messageId)
    .maybeSingle();

  if (messageError || !message) {
    return NextResponse.json({ error: messageError?.message || "Message not found." }, { status: 404 });
  }

  if (message.sender_id !== currentUserId) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { data: conversation } = await supabaseAdmin
    .from("conversations")
    .select("id, user_id_1, user_id_2")
    .eq("id", message.conversation_id)
    .maybeSingle();

  if (!conversation || (conversation.user_id_1 !== currentUserId && conversation.user_id_2 !== currentUserId)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { data: newerOwnMessage } = await supabaseAdmin
    .from("messages")
    .select("id")
    .eq("conversation_id", message.conversation_id)
    .eq("sender_id", currentUserId)
    .or(`created_at.gt.${message.created_at},and(created_at.eq.${message.created_at},id.neq.${message.id})`)
    .limit(1)
    .maybeSingle();

  if (newerOwnMessage?.id) {
    return NextResponse.json({ error: "Only your latest message can be edited." }, { status: 409 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("messages")
    .update({ content })
    .eq("id", messageId)
    .eq("sender_id", currentUserId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message || "Could not edit message." }, { status: 500 });
  }

  const { data: latestMessage } = await supabaseAdmin
    .from("messages")
    .select("id")
    .eq("conversation_id", message.conversation_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestMessage?.id === messageId) {
    await supabaseAdmin
      .from("conversations")
      .update({
        last_message_preview: getDirectMessagePreview(content, message.action_label, message.action_href),
      })
      .eq("id", message.conversation_id);
  }

  return NextResponse.json({ ok: true });
}
