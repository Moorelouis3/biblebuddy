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

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Posts written in the app are stored as HTML paragraphs (<p>..</p>, with an
// empty <p></p> for a blank line). The teasers in blogContent.ts are plain
// text with newlines, which the opened-post view collapses into one block.
// Convert: every line becomes its own <p>, blank lines become spacer <p>s,
// **bold** becomes <strong>. Content that is already HTML is left alone.
function teaserToHtml(content: string) {
  const trimmed = content.trim();
  if (/^\s*<(p|div|h[1-6]|ul|ol|blockquote)[\s>]/i.test(trimmed)) return trimmed;
  const lines = trimmed.split("\n").map((line) => line.trim());
  const html: string[] = [];
  let pendingBlank = false;
  for (const line of lines) {
    if (!line) {
      pendingBlank = true;
      continue;
    }
    if (pendingBlank && html.length) html.push("<p></p>");
    pendingBlank = false;
    const withBold = escapeHtml(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html.push(`<p>${withBold}</p>`);
  }
  return html.join("");
}

function stripArticleUrlLine(content: string, articleUrl: string) {
  const lines = content.split("\n");
  const kept: string[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const isUrlLine = line === articleUrl || line === `${articleUrl}/`;
    if (isUrlLine) {
      // Drop a "Read it here:" style lead-in directly above the URL too.
      const prev = kept.length ? kept[kept.length - 1].trim() : "";
      if (/^(read (it|more|the (full )?(post|article)) here|read here|full (post|article)( here)?)\s*[:\-–—]?$/i.test(prev)) {
        kept.pop();
      }
      continue;
    }
    kept.push(lines[i]);
  }
  return kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
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

  // Only articles published in the last few days are candidates. Older
  // articles were already shared when they went live; re-sharing them (which
  // happened once when the anxiety article's URL moved from
  // /bible-study-hub/... to /blog/... and slipped past the URL dedupe) just
  // spams the group with content everyone has seen.
  const RECENT_WINDOW_DAYS = 4;
  const cutoff = Date.now() - RECENT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const pendingArticles = BLOG_ARTICLES.filter((article) => {
    if (!article.groupPost) return false;
    const publishedAt = Date.parse(article.publishedAt);
    return Number.isNaN(publishedAt) ? false : publishedAt >= cutoff;
  });
  if (!pendingArticles.length) {
    return NextResponse.json({ ok: true, posted: [], note: "No recent articles carry a groupPost teaser." });
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

  // Dedupe against BOTH the canonical and any legacy URL, so an article whose
  // path moved is still recognised as already shared.
  const urlsFor = (article: (typeof pendingArticles)[number]) =>
    [article.canonicalPath, article.legacyPath]
      .filter((path): path is string => Boolean(path))
      .map((path) => `${SITE_URL}${path}`);
  const articleUrls = pendingArticles.flatMap(urlsFor);
  const { data: existingPosts, error: existingError } = await supabaseAdmin
    .from("group_posts")
    .select("link_url")
    .eq("group_id", targetGroup.id)
    .in("link_url", articleUrls);
  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }
  const alreadyPosted = new Set((existingPosts || []).map((row) => row.link_url));

  const toPost = pendingArticles.filter((article) => !urlsFor(article).some((url) => alreadyPosted.has(url)));
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
          // The feed renders a "Read the full post" button from link_url, so a
          // bare "Read it here: <url>" line in the teaser is just clutter.
          content: teaserToHtml(stripArticleUrlLine(article.groupPost!.content, `${SITE_URL}${article.canonicalPath}`)),
          media_url: `${SITE_URL}${article.image}`,
          link_url: `${SITE_URL}${article.canonicalPath}`,
        },
        // Same as the other recurring auto-posts: skip insert-time
        // notification fanout, which reliably statement-times-out on this
        // table (hit live while posting the anxiety article share).
        { skipInsertNotifications: true },
      );
      posted.push(article.slug);
    } catch (error) {
      failed.push({ slug: article.slug, error: error instanceof Error ? error.message : "unknown" });
    }
  }

  return NextResponse.json({ ok: failed.length === 0, posted, failed });
}
