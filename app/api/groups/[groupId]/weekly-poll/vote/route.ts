import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ groupId: string }> },
) {
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

  const { groupId } = await context.params;
  const body = await request.json().catch(() => null);
  const pollId = typeof body?.pollId === "string" ? body.pollId : "";
  const optionKey = typeof body?.optionKey === "string" ? body.optionKey : "";

  if (!pollId || !optionKey) {
    return NextResponse.json({ error: "Missing poll details." }, { status: 400 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: membership } = await supabaseAdmin
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId)
    .eq("user_id", userData.user.id)
    .eq("status", "approved")
    .maybeSingle();

  if (!membership) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { data: poll, error: pollError } = await supabaseAdmin
    .from("weekly_group_polls")
    .select("id, group_id, options")
    .eq("id", pollId)
    .eq("group_id", groupId)
    .maybeSingle();

  if (pollError || !poll) {
    return NextResponse.json({ error: "Poll not found." }, { status: 404 });
  }

  const options = Array.isArray(poll.options) ? poll.options : [];
  const isValidOption = options.some((option: any) => option?.key === optionKey);
  if (!isValidOption) {
    return NextResponse.json({ error: "Invalid option." }, { status: 400 });
  }

  const { data: existingVote } = await supabaseAdmin
    .from("weekly_group_poll_votes")
    .select("id")
    .eq("poll_id", pollId)
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (existingVote) {
    const { error: updateError } = await supabaseAdmin
      .from("weekly_group_poll_votes")
      .update({ option_key: optionKey })
      .eq("id", existingVote.id);
    if (updateError) {
      return NextResponse.json({ error: updateError.message || "Could not save vote." }, { status: 500 });
    }
  } else {
    const { error: insertError } = await supabaseAdmin
      .from("weekly_group_poll_votes")
      .insert({
        poll_id: pollId,
        user_id: userData.user.id,
        option_key: optionKey,
      });
    if (insertError) {
      return NextResponse.json({ error: insertError.message || "Could not save vote." }, { status: 500 });
    }
  }

  const { data: voteRows, error: votesError } = await supabaseAdmin
    .from("weekly_group_poll_votes")
    .select("option_key, user_id")
    .eq("poll_id", pollId);

  if (votesError) {
    return NextResponse.json({ error: votesError.message || "Could not load results." }, { status: 500 });
  }

  const voteCounts: Record<string, number> = {};
  for (const vote of voteRows || []) {
    voteCounts[vote.option_key] = (voteCounts[vote.option_key] || 0) + 1;
  }

  return NextResponse.json({
    ok: true,
    currentVote: optionKey,
    voteCounts,
    totalVotes: (voteRows || []).length,
  });
}
