import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
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

  // Verify the caller is authenticated
  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const currentUserId = userData.user.id;

  // Use service role so RLS doesn't block reading received messages
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Get all conversations this user is part of
  const { data: convos } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .or(`user_id_1.eq.${currentUserId},user_id_2.eq.${currentUserId}`);

  if (!convos || convos.length === 0) {
    return NextResponse.json({ count: 0, unreadConversationIds: [] });
  }

  const convoIds = convos.map((c: any) => c.id);

  // Get unread messages sent TO this user (service role bypasses RLS)
  const { data: unreadRows } = await supabaseAdmin
    .from("messages")
    .select("conversation_id")
    .in("conversation_id", convoIds)
    .neq("sender_id", currentUserId)
    .is("read_at", null);

  const unreadConversationIds = [...new Set((unreadRows || []).map((r: any) => r.conversation_id))];

  return NextResponse.json({
    count: unreadConversationIds.length,
    unreadConversationIds,
  });
}
