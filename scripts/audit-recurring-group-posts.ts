import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: groups, error: groupsError } = await supabase
    .from("study_groups")
    .select("id, name")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"]);

  if (groupsError) throw groupsError;

  const group = groups?.find((row) => row.name === "Bible Buddy Study Group") ?? groups?.[0];
  if (!group) throw new Error("Official study group not found.");

  console.log("GROUP");
  console.table([group]);

  const { data: weeklyRows, error: weeklyError } = await supabase
    .from("weekly_group_series_posts")
    .select("id, series_key, week_key, post_id, created_at, title")
    .eq("group_id", group.id)
    .order("created_at", { ascending: false })
    .limit(16);

  if (weeklyError) throw weeklyError;

  console.log("\nWEEKLY GROUP SERIES POSTS");
  console.table(weeklyRows || []);

  const linkedPostIds = [...new Set((weeklyRows || []).map((row) => row.post_id).filter(Boolean))];

  if (linkedPostIds.length > 0) {
    const { data: linkedPosts, error: linkedPostsError } = await supabase
      .from("group_posts")
      .select("id, title, category, created_at, parent_post_id, group_id")
      .in("id", linkedPostIds);

    if (linkedPostsError) throw linkedPostsError;

    console.log("\nMATCHING GROUP POSTS");
    console.table(linkedPosts || []);
  }

  const { data: latestRootPosts, error: latestRootPostsError } = await supabase
    .from("group_posts")
    .select("id, title, category, created_at, parent_post_id")
    .eq("group_id", group.id)
    .is("parent_post_id", null)
    .order("created_at", { ascending: false })
    .limit(24);

  if (latestRootPostsError) throw latestRootPostsError;

  console.log("\nLATEST ROOT GROUP POSTS");
  console.table(latestRootPosts || []);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
