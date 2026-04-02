console.log("Executing: scripts/repair-recurring-post-ownership.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const RECURRING_CATEGORIES = [
  "weekly_trivia",
  "weekly_poll",
  "weekly_question",
  "update_monday",
  "who_was_this_friday",
  "bible_study_saturday",
  "prayer_request_sunday",
];

async function main() {
  const { data: groups, error: groupsError } = await supabase
    .from("study_groups")
    .select("id, name, leader_user_id")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"]);

  if (groupsError) {
    throw new Error(groupsError.message || "Could not load official study groups.");
  }

  const validGroups = (groups || []).filter((group) => group.leader_user_id);
  if (validGroups.length === 0) {
    throw new Error("No official study groups with leader_user_id were found.");
  }

  for (const group of validGroups) {
    const ownerId = group.leader_user_id as string;

    const { data: profile } = await supabase
      .from("profile_stats")
      .select("display_name, username")
      .eq("user_id", ownerId)
      .maybeSingle();

    const displayName = profile?.display_name || profile?.username || "Louis";

    const { error: postsError } = await supabase
      .from("group_posts")
      .update({
        user_id: ownerId,
        display_name: displayName,
      })
      .eq("group_id", group.id)
      .in("category", RECURRING_CATEGORIES);

    if (postsError) {
      throw new Error(postsError.message || `Could not update recurring posts for ${group.name}.`);
    }

    await supabase
      .from("weekly_group_trivia_sets")
      .update({ created_by: ownerId })
      .eq("group_id", group.id);

    await supabase
      .from("weekly_group_polls")
      .update({ created_by: ownerId })
      .eq("group_id", group.id);

    await supabase
      .from("weekly_group_questions")
      .update({ created_by: ownerId })
      .eq("group_id", group.id);

    await supabase
      .from("weekly_group_series_posts")
      .update({ created_by: ownerId })
      .eq("group_id", group.id);

    console.log(`Repaired recurring post ownership for ${group.name}.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
