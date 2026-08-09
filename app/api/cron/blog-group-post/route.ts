import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { BLOG_ARTICLES } from "@/lib/blogContent";
import { insertGroupPostWithRetry } from "@/lib/groupPostInsert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const SITE_URL = "https://www.mybiblebuddy.net";

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

async function resolveLouisUserId(supabaseAdmin: SupabaseClient) {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (supabaseUrl && serviceKey) {
    const response = await fetch(
      `${supabaseUrl}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
    );
    if (response.ok) {
      const payload = await response.json();
      const found = (payload?.users ?? []).find(
        (user: { email?: string | null; id?: string | null }) => user.email?.toLowerCase() === LOUIS_EMAIL,
      );
      if (found?.id) return found.id as string;
    }
  }

  const { data } = await supabaseAdmin
    .from("profile_stats")
    .select("user_id, display_name")
    .ilike("display_name", "Louis Moore")
    .maybeSingle();
  if (data?.user_id) return data.user_id as string;

  throw new Error("Could not resolve Louis's user id for the group post author.");
}

// Shares each blog article carrying a groupPost teaser into the Bible Buddy
// Study Group exactly once. Dedup is by link_url match against existing
// root posts, so re-runs (or redeploys) never double-post.
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const pendingArticles = BLOG_ARTICLES.filter((article) => article.groupPost);
  if (!pendingArticles.length) {
    return NextResponse.json({ ok: true, posted: [], note: "No articles carry a groupPost teaser." });
  }

  const { data: group, error: groupError } = await supabaseAdmin
    .from("study_groups")
    .select("id, name, created_at")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"])
    .order("created_at", { ascending: false });
  if (groupError) {
    return NextResponse.json({ error: groupError.message }, { status: 500 });
  }
  const targetGroup =
    group?.find((row) => row.name === "Bible Buddy Study Group") ??
    group?.find((row) => row.name === "Hope Nation") ??
    null;
  if (!targetGroup) {
    return NextResponse.json({ error: "Official study group not found." }, { status: 404 });
  }

  const articleUrls = pendingArticles.map((article) => `${SITE_URL}${article.canonicalPath}`);
  const { data: existingPosts, error: existingError } = await supabaseAdmin
    .from("group_posts")
    .select("link_url")
    .eq("group_id", targetGroup.id)
    .in("link_url", articleUrls);
  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }
  const alreadyPosted = new Set((existingPosts || []).map((row) => row.link_url));

  const toPost = pendingArticles.filter(
    (article) => !alreadyPosted.has(`${SITE_URL}${article.canonicalPath}`),
  );
  if (!toPost.length) {
    return NextResponse.json({ ok: true, posted: [], note: "All article group posts already exist." });
  }

  const louisUserId = await resolveLouisUserId(supabaseAdmin);
  const { data: profile } = await supabaseAdmin
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisUserId)
    .maybeSingle();
  const displayName = profile?.display_name || profile?.username || "Louis Moore";

  const posted: string[] = [];
  const failed: Array<{ slug: string; error: string }> = [];
  for (const article of toPost) {
    try {
      await insertGroupPostWithRetry(
        supabaseAdmin,
        {
          group_id: targetGroup.id,
          user_id: louisUserId,
          display_name: displayName,
          title: article.groupPost!.title,
          category: "general",
          content: article.groupPost!.content,
          media_url: `${SITE_URL}${article.image}`,
          link_url: `${SITE_URL}${article.canonicalPath}`,
        },
        { skipInsertNotifications: false },
      );
      posted.push(article.slug);
    } catch (error) {
      failed.push({ slug: article.slug, error: error instanceof Error ? error.message : "unknown" });
    }
  }

  return NextResponse.json({ ok: failed.length === 0, posted, failed });
}
