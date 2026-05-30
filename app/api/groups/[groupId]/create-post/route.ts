import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function isStatementTimeoutError(message: string | null | undefined) {
  return typeof message === "string" && message.toLowerCase().includes("statement timeout");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
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
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  const category = typeof body?.category === "string" ? body.category.trim() : "";
  const mediaUrl = typeof body?.mediaUrl === "string" && body.mediaUrl.trim().length > 0 ? body.mediaUrl.trim() : null;
  const linkUrl = typeof body?.linkUrl === "string" && body.linkUrl.trim().length > 0 ? body.linkUrl.trim() : null;

  if (!groupId || !category || (!content && !mediaUrl && !linkUrl)) {
    return NextResponse.json({ error: "Missing post details." }, { status: 400 });
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

  const [{ data: membership }, { data: profile }] = await Promise.all([
    supabaseAdmin
      .from("group_members")
      .select("role")
      .eq("group_id", groupId)
      .eq("user_id", requester.id)
      .eq("status", "approved")
      .maybeSingle(),
    supabaseAdmin
      .from("profile_stats")
      .select("display_name, username, profile_image_url, is_paid, member_badge, current_streak, current_level")
      .eq("user_id", requester.id)
      .maybeSingle(),
  ]);

  if (!membership) {
    return NextResponse.json({ error: "Join the study group first before posting." }, { status: 403 });
  }

  const displayName =
    profile?.display_name ||
    profile?.username ||
    requester.user_metadata?.firstName ||
    requester.user_metadata?.first_name ||
    (requester.email ? requester.email.split("@")[0] : "Buddy");

  const postId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  let insertErrorMessage: string | null = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const { error: insertError } = await supabaseAdmin
      .from("group_posts")
      .insert({
        id: postId,
        group_id: groupId,
        user_id: requester.id,
        display_name: displayName,
        title: title || null,
        category,
        content,
        media_url: mediaUrl,
        link_url: linkUrl,
      });

    if (!insertError) {
      insertErrorMessage = null;
      break;
    }

    insertErrorMessage = insertError.message || "Post failed to publish.";

    const { data: existingPost } = await supabaseAdmin
      .from("group_posts")
      .select("id")
      .eq("id", postId)
      .maybeSingle();

    if (existingPost?.id) {
      insertErrorMessage = null;
      break;
    }

    if (!isStatementTimeoutError(insertErrorMessage) || attempt === 2) {
      break;
    }

    await delay(250 * (attempt + 1));
  }

  if (insertErrorMessage) {
    const friendlyMessage = isStatementTimeoutError(insertErrorMessage)
      ? "Posting is taking longer than usual right now. Please try again in a moment."
      : insertErrorMessage;
    return NextResponse.json({ error: friendlyMessage }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    post: {
      id: postId,
      user_id: requester.id,
      display_name: displayName,
      title: title || null,
      category,
      content,
      like_count: 0,
      is_pinned: false,
      created_at: createdAt,
      parent_post_id: null,
      media_url: mediaUrl,
      link_url: linkUrl,
      comment_count: 0,
      role: membership.role || "member",
      liked: false,
      profile_image_url: profile?.profile_image_url ?? null,
      is_paid: !!profile?.is_paid,
      member_badge: profile?.member_badge ?? null,
      current_streak: profile?.current_streak ?? null,
      current_level: profile?.current_level ?? null,
    },
  });
}
