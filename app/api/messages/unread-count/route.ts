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

  // Single server-side join — avoids passing a potentially huge array of
  // conversation IDs as a URL parameter (breaks for accounts like Louis that
  // have conversations with every user in the app).
  const { data: unreadRows, error: rpcError } = await (supabaseAdmin as any)
    .rpc("get_unread_conversation_ids", { p_user_id: currentUserId });

  if (rpcError) {
    console.error("[unread-count] RPC error:", rpcError.message);
    return NextResponse.json({ error: rpcError.message }, { status: 500 });
  }

  const unreadConversationIds = (unreadRows || []).map((r: any) => r.conversation_id);

  return NextResponse.json({
    count: unreadConversationIds.length,
    unreadConversationIds,
  });
}
