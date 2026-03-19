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
  const preview = typeof body?.preview === "string" ? body.preview.trim() : "";

  if (!conversationId) {
    return NextResponse.json({ error: "Missing conversationId." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const sender = userData.user;
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: conversation, error: conversationError } = await supabaseAdmin
    .from("conversations")
    .select("id, user_id_1, user_id_2")
    .eq("id", conversationId)
    .maybeSingle();

  if (conversationError || !conversation) {
    return NextResponse.json({ error: "Conversation not found." }, { status: 404 });
  }

  if (conversation.user_id_1 !== sender.id && conversation.user_id_2 !== sender.id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const recipientId = conversation.user_id_1 === sender.id ? conversation.user_id_2 : conversation.user_id_1;

  const { data: senderProfile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", sender.id)
    .maybeSingle();

  const senderName =
    senderProfile?.display_name?.trim() ||
    senderProfile?.username?.trim() ||
    sender.email?.split("@")[0] ||
    "A buddy";

  const message = preview ? `sent you a new message: ${preview}` : "sent you a new message";

  const { error: insertError } = await supabaseAdmin
    .from("notifications")
    .insert({
      user_id: recipientId,
      type: "direct_message",
      from_user_id: sender.id,
      from_user_name: senderName,
      article_slug: `/messages/${conversationId}`,
      message,
      is_read: false,
    });

  if (insertError) {
    return NextResponse.json({ error: insertError.message || "Could not create notification." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
