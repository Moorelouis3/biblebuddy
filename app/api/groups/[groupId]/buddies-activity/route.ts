import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await context.params;
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

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const requester = userData.user;
  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: membership } = await supabaseAdmin
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId)
    .eq("user_id", requester.id)
    .eq("status", "approved")
    .maybeSingle();

  if (!membership && requester.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const searchParams = request.nextUrl.searchParams;
  const offset = Math.max(Number(searchParams.get("offset") || 0), 0);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") || 20), 1), 50);

  const { data: groupMemberRows, error: membersError } = await supabaseAdmin
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId)
    .eq("status", "approved");

  if (membersError) {
    return NextResponse.json({ error: membersError.message || "Could not load group buddies." }, { status: 500 });
  }

  const memberIds = [...new Set((groupMemberRows || []).map((row) => row.user_id).filter(Boolean))];
  if (memberIds.length === 0) {
    return NextResponse.json({ items: [], hasMore: false });
  }

  const queryEnd = offset + limit;
  const { data: actionRows, error: actionsError } = await supabaseAdmin
    .from("master_actions")
    .select("user_id, action_type, action_label, created_at")
    .in("user_id", memberIds)
    .order("created_at", { ascending: false })
    .range(offset, queryEnd);

  if (actionsError) {
    return NextResponse.json({ error: actionsError.message || "Could not load buddy activity." }, { status: 500 });
  }

  const resolvedRows = actionRows || [];
  const hasMore = resolvedRows.length > limit;
  const trimmedRows = resolvedRows.slice(0, limit);
  const actionUserIds = [...new Set(trimmedRows.map((row) => row.user_id).filter(Boolean))];

  const { data: profiles, error: profilesError } = actionUserIds.length > 0
    ? await supabaseAdmin
        .from("profile_stats")
        .select("user_id, display_name, username, profile_image_url")
        .in("user_id", actionUserIds)
    : { data: [], error: null };

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message || "Could not load buddy profiles." }, { status: 500 });
  }

  const profileMap = Object.fromEntries(
    (profiles || []).map((profile) => [
      profile.user_id,
      {
        display_name: profile.display_name || profile.username || "Buddy",
        profile_image_url: profile.profile_image_url ?? null,
      },
    ]),
  );

  const items = trimmedRows.map((row) => ({
    user_id: row.user_id,
    action_type: row.action_type,
    action_label: row.action_label ?? null,
    created_at: row.created_at,
    display_name: profileMap[row.user_id]?.display_name || "Buddy",
    profile_image_url: profileMap[row.user_id]?.profile_image_url ?? null,
  }));

  return NextResponse.json({ items, hasMore });
}
