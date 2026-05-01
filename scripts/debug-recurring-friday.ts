import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { buildWhoWasThisFridayPost } from "../lib/groupRecurringSeries";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) throw new Error("Missing Supabase environment variables.");

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const date = new Date("2026-05-01T18:00:00+02:00");
  const post = buildWhoWasThisFridayPost(date);
  console.log("POST TEMPLATE", { weekKey: post.weekKey, title: post.title });

  const { data: groups, error: groupsError } = await supabase
    .from("study_groups")
    .select("id, name, leader_user_id")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"]);
  if (groupsError) throw groupsError;
  const group = groups?.find((row) => row.name === "Bible Buddy Study Group") ?? groups?.[0];
  if (!group?.leader_user_id) throw new Error("Official group/leader missing.");
  console.log("GROUP", group);

  const { data: profile, error: profileError } = await supabase
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", group.leader_user_id)
    .maybeSingle();
  if (profileError) throw profileError;
  const displayName = profile?.display_name || profile?.username || "Louis";
  console.log("OWNER", { userId: group.leader_user_id, displayName });

  const { data: existing, error: existingError } = await supabase
    .from("weekly_group_series_posts")
    .select("id, post_id, week_key")
    .eq("group_id", group.id)
    .eq("series_key", "who_was_this_friday")
    .eq("week_key", post.weekKey)
    .maybeSingle();
  if (existingError) throw existingError;
  console.log("EXISTING", existing);

  const variants = [
    {
      label: "general_short",
      payload: {
        group_id: group.id,
        user_id: group.leader_user_id,
        display_name: displayName,
        title: "[DEBUG] general short",
        category: "general",
        content: "<p>debug short post</p>",
      },
    },
    {
      label: "friday_short",
      payload: {
        group_id: group.id,
        user_id: group.leader_user_id,
        display_name: displayName,
        title: "[DEBUG] friday short",
        category: "who_was_this_friday",
        content: "<p>debug short post</p>",
      },
    },
    {
      label: "friday_full",
      payload: {
        group_id: group.id,
        user_id: group.leader_user_id,
        display_name: displayName,
        title: `[DEBUG] ${post.title}`,
        category: "who_was_this_friday",
        content: post.contentHtml,
      },
    },
  ];

  for (const variant of variants) {
    console.log(`ATTEMPTING INSERT: ${variant.label}`);
    const { data: inserted, error: insertError } = await supabase
      .from("group_posts")
      .insert(variant.payload)
      .select("id, title, created_at")
      .single();

    if (insertError) {
      console.error(`FAILED: ${variant.label}`, insertError);
      continue;
    }

    console.log("INSERTED", inserted);

    const { error: deleteError } = await supabase.from("group_posts").delete().eq("id", inserted.id);
    if (deleteError) throw deleteError;
    console.log("CLEANED UP", inserted.id);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
