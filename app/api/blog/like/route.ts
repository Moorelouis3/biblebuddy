import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BLOG_ARTICLES } from "@/lib/blogContent";

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
  const articleSlug = typeof body?.articleSlug === "string" ? body.articleSlug.trim() : "";
  const liked = body?.liked === true;

  if (!articleSlug || !BLOG_ARTICLES.some((article) => article.slug === articleSlug)) {
    return NextResponse.json({ error: "Unknown article." }, { status: 400 });
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

  const isMissingLikesTable = (message?: string | null) =>
    /blog_article_likes|schema cache|does not exist|could not find the table/i.test(message || "");

  if (liked) {
    const { error } = await supabaseAdmin
      .from("blog_article_likes")
      .upsert({ article_slug: articleSlug, user_id: userData.user.id }, { onConflict: "article_slug,user_id" });

    if (error) {
      if (isMissingLikesTable(error.message)) {
        return NextResponse.json({ liked: true, like_count: 0 });
      }
      return NextResponse.json({ error: error.message || "Could not like article." }, { status: 500 });
    }
  } else {
    const { error } = await supabaseAdmin
      .from("blog_article_likes")
      .delete()
      .eq("article_slug", articleSlug)
      .eq("user_id", userData.user.id);

    if (error) {
      if (isMissingLikesTable(error.message)) {
        return NextResponse.json({ liked: false, like_count: 0 });
      }
      return NextResponse.json({ error: error.message || "Could not remove like." }, { status: 500 });
    }
  }

  const { count, error: countError } = await supabaseAdmin
    .from("blog_article_likes")
    .select("id", { count: "exact", head: true })
    .eq("article_slug", articleSlug);

  if (countError) {
    if (isMissingLikesTable(countError.message)) {
      return NextResponse.json({ liked, like_count: 0 });
    }
    return NextResponse.json({ error: countError.message || "Could not load like count." }, { status: 500 });
  }

  return NextResponse.json({ liked, like_count: count ?? 0 });
}
