import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

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
  const postId = typeof body?.postId === "string" ? body.postId : "";
  const nextPinned = typeof body?.nextPinned === "boolean" ? body.nextPinned : null;

  if (!groupId || !postId || nextPinned === null) {
    return NextResponse.json({ error: "Missing pin details." }, { status: 400 });
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

  const isAdmin = requester.email === ADMIN_EMAIL;

  if (!isAdmin) {
    const { data: membership, error: membershipError } = await supabaseAdmin
      .from("group_members")
      .select("role")
      .eq("group_id", groupId)
      .eq("user_id", requester.id)
      .eq("status", "approved")
      .maybeSingle();

    if (membershipError) {
      return NextResponse.json({ error: membershipError.message || "Could not verify membership." }, { status: 500 });
    }

    const canModerateGroup = membership?.role === "leader" || membership?.role === "moderator";
    if (!canModerateGroup) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }
  }

  const { data: post, error: postError } = await supabaseAdmin
    .from("group_posts")
    .select("id, group_id, is_pinned")
    .eq("id", postId)
    .eq("group_id", groupId)
    .is("parent_post_id", null)
    .maybeSingle();

  if (postError || !post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  if (nextPinned) {
    const { count, error: countError } = await supabaseAdmin
      .from("group_posts")
      .select("id", { count: "exact", head: true })
      .eq("group_id", groupId)
      .is("parent_post_id", null)
      .eq("is_pinned", true);

    if (countError) {
      return NextResponse.json({ error: countError.message || "Could not check pinned posts." }, { status: 500 });
    }

    if ((count ?? 0) >= 3 && !post.is_pinned) {
      return NextResponse.json({ error: "You can only pin 3 posts at a time." }, { status: 400 });
    }
  }

  const { data: updatedPost, error: updateError } = await supabaseAdmin
    .from("group_posts")
    .update({ is_pinned: nextPinned })
    .eq("id", postId)
    .eq("group_id", groupId)
    .select("id, is_pinned")
    .single();

  if (updateError || !updatedPost) {
    return NextResponse.json({ error: updateError?.message || "Could not update pin right now." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    postId: updatedPost.id,
    isPinned: updatedPost.is_pinned,
  });
}
