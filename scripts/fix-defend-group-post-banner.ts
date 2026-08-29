/**
 * One-off: the blog-group-post cron shared "How to Defend Your Faith in Jesus"
 * while the article was still on the christian-foundations fallback banner, so
 * the group post is stamped with the anxiety image. The article now has its own
 * banner, so repoint the group post's media_url at it.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { BLOG_ARTICLES } from "../lib/blogContent";

config({ path: ".env.local" });

const SITE_URL = "https://www.mybiblebuddy.net";
const SLUG = "how-to-defend-your-faith-in-jesus";

async function main() {
  const article = BLOG_ARTICLES.find((a) => a.slug === SLUG);
  if (!article) throw new Error(`article ${SLUG} not found`);

  const linkUrl = `${SITE_URL}${article.canonicalPath}`;
  const mediaUrl = `${SITE_URL}${article.image}`;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data: posts, error } = await supabase
    .from("group_posts")
    .select("id, group_id, media_url, created_at")
    .eq("link_url", linkUrl);
  if (error) throw error;

  if (!posts?.length) {
    console.log("No group post found for", linkUrl);
    return;
  }

  for (const post of posts) {
    console.log(`post ${post.id} in group ${post.group_id} (${post.created_at})`);
    console.log(`  was: ${post.media_url}`);
    if (post.media_url === mediaUrl) {
      console.log("  already correct, skipping");
      continue;
    }
    const { error: upErr } = await supabase
      .from("group_posts")
      .update({ media_url: mediaUrl })
      .eq("id", post.id);
    if (upErr) throw upErr;
    console.log(`  now: ${mediaUrl}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
