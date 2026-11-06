import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Find-or-create the one-to-one thread between the signed-in viewer and another
// member, so the Message button on a profile always lands on a real thread.
// Conversations are keyed by the two ids in sorted order, exactly as every
// other caller writes them (send-welcome-dm, the nudge route, the profile page's
// own lookup), so this never produces a second thread for the same pair.
//
// Creating the row needs the service key: `conversations` is only readable by
// its two participants under RLS, so the browser cannot insert one itself.

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
  const targetUserId = typeof body?.targetUserId === "string" ? body.targetUserId.trim() : "";
  if (!targetUserId) {
    return NextResponse.json({ error: "Missing targetUserId." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const viewerId = userData.user.id;
  if (viewerId === targetUserId) {
    return NextResponse.json({ error: "You can't message yourself." }, { status: 400 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // The other person must still exist.
  const { data: targetProfile } = await supabaseAdmin
    .from("profile_stats")
    .select("user_id")
    .eq("user_id", targetUserId)
    .maybeSingle();
  if (!targetProfile) {
    return NextResponse.json({ error: "That member could not be found." }, { status: 404 });
  }

  // Blocks count in both directions, the same way the feed and inbox treat them.
  const { data: blockRows } = await supabaseAdmin
    .from("buddy_blocks")
    .select("blocker_user_id, blocked_user_id")
    .or(
      `and(blocker_user_id.eq.${viewerId},blocked_user_id.eq.${targetUserId}),` +
        `and(blocker_user_id.eq.${targetUserId},blocked_user_id.eq.${viewerId})`,
    );
  if (blockRows && blockRows.length > 0) {
    return NextResponse.json({ error: "You can't message this member." }, { status: 403 });
  }

  const [uid1, uid2] = viewerId < targetUserId ? [viewerId, targetUserId] : [targetUserId, viewerId];

  const { data: existing } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("user_id_1", uid1)
    .eq("user_id_2", uid2)
    .maybeSingle();

  if (existing?.id) {
    return NextResponse.json({ conversationId: existing.id });
  }

  const { data: created, error: createError } = await supabaseAdmin
    .from("conversations")
    .insert({ user_id_1: uid1, user_id_2: uid2 })
    .select("id")
    .single();

  if (createError || !created) {
    // Another tab (or a buddy-accept trigger) may have inserted it in between.
    const { data: raced } = await supabaseAdmin
      .from("conversations")
      .select("id")
      .eq("user_id_1", uid1)
      .eq("user_id_2", uid2)
      .maybeSingle();
    if (raced?.id) {
      return NextResponse.json({ conversationId: raced.id });
    }
    console.error("[OPEN_CONVERSATION] Could not create conversation:", createError?.message);
    return NextResponse.json({ error: "Could not open the conversation." }, { status: 500 });
  }

  return NextResponse.json({ conversationId: created.id });
}
