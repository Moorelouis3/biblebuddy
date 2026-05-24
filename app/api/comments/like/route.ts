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
  const commentId = typeof body?.commentId === "string" ? body.commentId.trim() : "";
  const liked = body?.liked === true;

  if (!commentId) {
    return NextResponse.json({ error: "Missing comment id." }, { status: 400 });
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

  const { data: comment, error: commentError } = await supabaseAdmin
    .from("article_comments")
    .select("id, is_deleted")
    .eq("id", commentId)
    .maybeSingle();

  if (commentError || !comment || comment.is_deleted) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  if (liked) {
    const { error } = await supabaseAdmin
      .from("article_comment_likes")
      .upsert({ comment_id: commentId, user_id: userData.user.id }, { onConflict: "comment_id,user_id" });

    if (error) {
      return NextResponse.json({ error: error.message || "Could not like comment." }, { status: 500 });
    }
  } else {
    const { error } = await supabaseAdmin
      .from("article_comment_likes")
      .delete()
      .eq("comment_id", commentId)
      .eq("user_id", userData.user.id);

    if (error) {
      return NextResponse.json({ error: error.message || "Could not remove like." }, { status: 500 });
    }
  }

  const { count, error: countError } = await supabaseAdmin
    .from("article_comment_likes")
    .select("id", { count: "exact", head: true })
    .eq("comment_id", commentId);

  if (countError) {
    return NextResponse.json({ error: countError.message || "Could not load like count." }, { status: 500 });
  }

  return NextResponse.json({ liked, like_count: count ?? 0 });
}
