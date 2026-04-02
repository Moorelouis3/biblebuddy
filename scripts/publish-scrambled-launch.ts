console.log("Executing: scripts/publish-scrambled-launch.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "../lib/actionTypes";

const LOUIS_EMAIL = "moorelouis3@gmail.com";
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function chunkRows<T>(rows: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < rows.length; index += size) {
    chunks.push(rows.slice(index, index + size));
  }
  return chunks;
}

async function resolveLouisId() {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/auth/v1/admin/users?filter=${encodeURIComponent(`email=="${LOUIS_EMAIL}"`)}`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY!,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY!}`,
        },
      },
    );

    if (response.ok) {
      const payload = await response.json();
      const user = (payload?.users ?? []).find((entry: { email?: string | null; id?: string | null }) =>
        entry.email?.toLowerCase() === LOUIS_EMAIL,
      );
      if (user?.id) {
        return user.id;
      }
    }
  } catch {}

  const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (error) throw new Error(error.message || "Could not load Louis account.");

  const user = data.users.find((entry) => entry.email?.toLowerCase() === LOUIS_EMAIL);
  if (!user?.id) {
    throw new Error("Louis account not found.");
  }

  return user.id;
}

async function main() {
  const { data: groups, error: groupError } = await supabase
    .from("study_groups")
    .select("id, name, created_at, leader_user_id")
    .in("name", ["Bible Buddy Study Group", "Hope Nation"])
    .order("created_at", { ascending: false });

  if (groupError) {
    throw new Error(groupError.message || "Could not load official study group.");
  }

  const group =
    groups?.find((row) => row.name === "Bible Buddy Study Group") ??
    groups?.find((row) => row.name === "Hope Nation") ??
    null;

  if (!group) {
    throw new Error("Official study group not found.");
  }

  const louisId = group.leader_user_id || (await resolveLouisId());

  const { data: louisProfile } = await supabase
    .from("profile_stats")
    .select("display_name, username")
    .eq("user_id", louisId)
    .maybeSingle();

  const displayName = louisProfile?.display_name || louisProfile?.username || "Louis";
  const title = "Update: I added Scrambled to Bible Buddy";
  const content =
    "<p>I added a new Bible Study Games mode inside Bible Buddy called <strong>Scrambled</strong>.</p>" +
    "<p>Each round gives you words from a specific Bible chapter, and you unscramble them one by one. Genesis 1 might give you words like light or day from the creation story.</p>" +
    "<p>Tap below and go try it out. I want to see how many words you can get right.</p>";
  const linkUrl = "/bible-study-games/scrambled";

  const { data: existingPost, error: existingError } = await supabase
    .from("group_posts")
    .select("id")
    .eq("group_id", group.id)
    .eq("user_id", louisId)
    .eq("title", title)
    .eq("link_url", linkUrl)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message || "Could not check for existing Scrambled launch post.");
  }

  if (existingPost?.id) {
    console.log(`Scrambled launch post already exists: ${existingPost.id}`);
    return;
  }

  const { data: post, error: postError } = await supabase
    .from("group_posts")
    .insert({
      group_id: group.id,
      user_id: louisId,
      display_name: displayName,
      title,
      category: "general",
      content,
      link_url: linkUrl,
    })
    .select("id")
    .single();

  if (postError || !post) {
    throw new Error(postError?.message || "Could not publish the Scrambled launch post.");
  }

  const now = new Date().toISOString();

  await supabase.from("master_actions").insert({
    user_id: louisId,
    username: displayName,
    action_type: ACTION_TYPE.group_message_sent,
    action_label: "Posted Scrambled launch update",
  });

  const { data: members, error: membersError } = await supabase
    .from("group_members")
    .select("user_id")
    .eq("group_id", group.id)
    .eq("status", "approved");

  if (membersError) {
    throw new Error(membersError.message || "Could not load study group members.");
  }

  const notificationRows = (members || [])
    .map((member) => member.user_id)
    .filter((userId): userId is string => Boolean(userId) && userId !== louisId)
    .map((userId) => ({
      user_id: userId,
      type: "study_group_update",
      from_user_id: louisId,
      from_user_name: displayName,
      article_slug: `/study-groups/${group.id}/chat`,
      post_id: post.id,
      message: "posted a new study group update about Scrambled. Tap to try it out.",
      is_read: false,
      created_at: now,
    }));

  if (notificationRows.length > 0) {
    for (const batch of chunkRows(notificationRows, 25)) {
      const { error: notifError } = await supabase.from("notifications").insert(batch);
      if (notifError) {
        throw new Error(notifError.message || "Could not notify the study group about Scrambled.");
      }
    }
  }

  console.log(`Created Scrambled launch post ${post.id} and notified ${notificationRows.length} group members.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
