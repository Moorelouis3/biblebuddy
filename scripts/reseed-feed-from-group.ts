/**
 * Rewrite Bible Buddy's feed posts from the group posts they were copied from.
 *
 * A one-off. The first copy ran the HTML through a stripper that replaced each
 * tag with a space and then collapsed all whitespace, so fifty-four posts
 * landed on the wall as single run-on lines with their bullet emoji stranded
 * mid-sentence. The converter that should have been used in the first place
 * now lives in lib/htmlToPlainText and is what the live mirror uses, so this
 * re-derives the stored text through it and the two agree by construction.
 *
 *   npx tsx scripts/reseed-feed-from-group.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { BIBLE_BUDDY_USER_ID } from "../lib/bibleBuddyAccount";
import { feedBodyFromGroupPost } from "../lib/htmlToPlainText";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1).trim()]),
);

const db = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL as string,
  env.SUPABASE_SERVICE_ROLE_KEY as string,
  { auth: { persistSession: false } },
);

/** Two weeks, which is what the wall had on it worth carrying over. */
const WINDOW_DAYS = 14;

async function main() {
  const { data: existing, error: readError } = await db
    .from("feed_posts")
    .select("id")
    .eq("user_id", BIBLE_BUDDY_USER_ID);
  if (readError) throw new Error(readError.message);

  for (const row of existing ?? []) {
    await db.from("feed_posts").delete().eq("id", row.id);
  }
  console.log(`cleared ${existing?.length ?? 0} existing Bible Buddy posts`);

  const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();
  const { data: groupPosts, error: groupError } = await db
    .from("group_posts")
    .select("title, content, media_url, link_url, created_at")
    .is("parent_post_id", null)
    .gte("created_at", since)
    .order("created_at", { ascending: true });
  if (groupError) throw new Error(groupError.message);

  let written = 0;
  for (const row of groupPosts ?? []) {
    const content = feedBodyFromGroupPost(row.title, row.content);
    if (content.length < 15) continue;

    const { error } = await db.from("feed_posts").insert({
      user_id: BIBLE_BUDDY_USER_ID,
      post_type: row.media_url ? "photo" : "thought",
      content: content.slice(0, 4000),
      media_url: row.media_url ?? null,
      link_url: row.link_url ?? null,
      visibility: "community",
      reaction_counts: {},
      comment_count: 0,
      created_at: row.created_at,
    });
    if (error) {
      console.error("skipped:", error.message);
      continue;
    }
    written += 1;
  }

  console.log(`wrote ${written} posts with their formatting intact`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
