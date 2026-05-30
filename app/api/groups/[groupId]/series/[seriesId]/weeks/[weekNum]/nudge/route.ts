import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDirectMessagePreview, isMissingDirectMessageActionColumnError } from "@/lib/directMessageActions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    groupId: string;
    seriesId: string;
    weekNum: string;
  }>;
};

function buildNudgeMessage(chapterLabel: string, missingSections: string[]) {
  const sectionList = missingSections.join("\n");
  return [
    `Hey great job on starting the "${chapterLabel} Bible Study." You are almost done.`,
    "",
    "You still need to finish:",
    sectionList,
    "",
    "Tap the button below to jump back in and complete this chapter Bible study.",
  ].join("\n");
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { groupId, weekNum } = await context.params;

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
  const targetUserId = typeof body?.targetUserId === "string" ? body.targetUserId : "";
  const chapterLabel = typeof body?.chapterLabel === "string" ? body.chapterLabel.trim() : "";
  const missingSections = Array.isArray(body?.missingSections)
    ? body.missingSections.filter((item: unknown): item is string => typeof item === "string" && item.trim().length > 0)
    : [];

  if (!targetUserId || !chapterLabel || missingSections.length === 0) {
    return NextResponse.json({ error: "Missing nudge details." }, { status: 400 });
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

  const { data: membership } = await supabaseAdmin
    .from("group_members")
    .select("role")
    .eq("group_id", groupId)
    .eq("user_id", currentUserId)
    .maybeSingle();

  if (!membership || membership.role !== "leader") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { data: targetMember } = await supabaseAdmin
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId)
    .eq("user_id", targetUserId)
    .eq("status", "approved")
    .maybeSingle();

  if (!targetMember) {
    return NextResponse.json({ error: "Target buddy not found." }, { status: 404 });
  }

  const [uid1, uid2] = currentUserId < targetUserId ? [currentUserId, targetUserId] : [targetUserId, currentUserId];
  const { data: existingConversation } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("user_id_1", uid1)
    .eq("user_id_2", uid2)
    .maybeSingle();

  let conversationId = existingConversation?.id ?? "";
  if (!conversationId) {
    const { data: newConversation, error: conversationError } = await supabaseAdmin
      .from("conversations")
      .insert({ user_id_1: uid1, user_id_2: uid2 })
      .select("id")
      .single();

    if (conversationError || !newConversation) {
      return NextResponse.json({ error: conversationError?.message || "Could not create conversation." }, { status: 500 });
    }
    conversationId = newConversation.id;
  }

  const { data: senderProfile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", currentUserId)
    .maybeSingle();

  const senderName =
    senderProfile?.display_name?.trim() ||
    senderProfile?.username?.trim() ||
    userData.user.email?.split("@")[0] ||
    "A buddy";

  const actionLabel = "Click here to complete this chapter Bible study";
  const actionHref = `/study-groups/${groupId}/series/week/${weekNum}`;
  const message = buildNudgeMessage(chapterLabel, missingSections);
  const now = new Date().toISOString();
  const preview = getDirectMessagePreview(message, actionLabel, actionHref);

  let { error: messageError } = await supabaseAdmin
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: currentUserId,
      content: message,
      action_label: actionLabel,
      action_href: actionHref,
      created_at: now,
    });

  if (messageError && isMissingDirectMessageActionColumnError(messageError)) {
    ({ error: messageError } = await supabaseAdmin
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: message,
        created_at: now,
      }));
  }

  if (messageError) {
    return NextResponse.json({ error: messageError.message || "Could not send message." }, { status: 500 });
  }

  await supabaseAdmin
    .from("conversations")
    .update({ last_message_at: now, last_message_preview: preview })
    .eq("id", conversationId);

  const conversationRoute = `/messages/${conversationId}`;
  const { data: existingUnread } = await supabaseAdmin
    .from("notifications")
    .select("id")
    .eq("user_id", targetUserId)
    .eq("type", "direct_message")
    .eq("article_slug", conversationRoute)
    .eq("is_read", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingUnread?.id) {
    await supabaseAdmin
      .from("notifications")
      .update({
        from_user_id: currentUserId,
        from_user_name: senderName,
        message: `sent you a new message: ${preview}`,
        created_at: now,
      })
      .eq("id", existingUnread.id);
  } else {
    await supabaseAdmin
      .from("notifications")
      .insert({
        user_id: targetUserId,
        type: "direct_message",
        from_user_id: currentUserId,
        from_user_name: senderName,
        article_slug: conversationRoute,
        message: `sent you a new message: ${preview}`,
        is_read: false,
      });
  }

  return NextResponse.json({ ok: true, conversationId });
}
