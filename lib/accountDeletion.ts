import type { SupabaseClient } from "@supabase/supabase-js";

// Permanent account deletion (App Store 5.1.1(v) / Google Play).
// Wipes everything tied to a user, then removes the auth user itself.
// Must be called with a SERVICE-ROLE client. Order matters: rows that other
// rows point at (posts, comments, conversations, notifications) are cleared
// child-first so no foreign key blocks the final auth.admin.deleteUser.

export const PROTECTED_ACCOUNT_EMAILS = ["moorelouis3@gmail.com"];

export type AccountDeletionResult = {
  ok: boolean;
  error?: string;
  // table -> rows deleted/updated (only non-zero entries)
  cleared: Record<string, number>;
  // non-fatal problems (missing tables, storage hiccups)
  warnings: string[];
  storageFilesRemoved: number;
};

// Plain "delete where <column> = userId" tables.
const USER_OWNED_ROWS: Array<[table: string, column: string]> = [
  ["ambassador_referrals", "ambassador_user_id"],
  ["ambassador_referrals", "referred_user_id"],
  ["ambassador_profiles", "user_id"],
  ["app_logins", "user_id"],
  ["article_comments", "user_id"],
  ["article_likes", "user_id"],
  ["bible_buddy_chat_threads", "user_id"],
  ["bible_year_day_progress", "user_id"],
  ["blog_article_likes", "user_id"],
  ["blog_page_views", "user_id"],
  ["blog_promo_events", "user_id"],
  ["buddies", "user_id_1"],
  ["buddies", "user_id_2"],
  ["buddy_blocks", "blocker_user_id"],
  ["buddy_blocks", "blocked_user_id"],
  ["buddy_reports", "reporter_user_id"],
  ["buddy_reports", "reported_user_id"],
  ["buddy_requests", "sender_id"],
  ["buddy_requests", "receiver_id"],
  ["bug_reports", "reporter_user_id"],
  ["community_event_members", "user_id"],
  ["completed_chapters", "user_id"],
  ["devotional_progress", "user_id"],
  ["email_funnel_events", "user_id"],
  ["email_funnel_sends", "user_id"],
  ["email_funnel_state", "user_id"],
  ["feed_activity", "user_id"],
  ["feed_post_reactions", "user_id"],
  ["group_feed_carousel_queue", "created_by"],
  ["group_members", "user_id"],
  ["group_post_likes", "user_id"],
  ["group_series_comment_likes", "user_id"],
  ["group_series_post_likes", "user_id"],
  ["highlights", "user_id"],
  ["keywords_progress", "user_id"],
  ["landing_onboarding_responses", "user_id"],
  ["landing_page_events", "user_id"],
  ["louis_inbox_messages", "user_id"],
  ["master_actions", "user_id"],
  ["moderator_actions", "moderator_user_id"],
  ["moderator_settings", "user_id"],
  ["notes", "user_id"],
  ["onboarding_dm_sent", "user_id"],
  ["people_progress", "user_id"],
  ["places_progress", "user_id"],
  ["push_notification_jobs", "user_id"],
  ["push_subscriptions", "user_id"],
  ["reading_sessions", "user_id"],
  ["series_reflection_likes", "user_id"],
  ["series_trivia_scores", "user_id"],
  ["series_week_progress", "user_id"],
  ["study_group_members", "user_id"],
  ["trivia_question_progress", "user_id"],
  ["user_badge_popups_seen", "user_id"],
  ["user_bookmarks", "user_id"],
  ["user_email_funnel_tier", "user_id"],
  ["user_feedback", "user_id"],
  ["user_popups_seen", "user_id"],
  ["user_progress_meta", "user_id"],
  ["user_requests", "user_id"],
  ["user_signups", "user_id"],
  ["user_store_purchases", "user_id"],
  ["verse_highlight_ranges", "user_id"],
  ["verse_of_the_day_engagement", "user_id"],
  ["video_helpfulness_votes", "user_id"],
  ["weekly_bible_report_sent", "user_id"],
  ["weekly_group_poll_votes", "user_id"],
  ["weekly_group_trivia_scores", "user_id"],
  // profile last, after everything that might read it
  ["profile_stats", "user_id"],
];

// Shared content the user created but other people still use (groups,
// scheduled series). Keep the content, drop the link to the person.
const NULLIFY_REFERENCES: Array<[table: string, column: string]> = [
  ["study_groups", "leader_user_id"],
  ["group_series", "created_by"],
  ["group_series_posts", "created_by"],
  ["group_recurring_post_overrides", "created_by"],
  ["series_schedules", "created_by"],
  ["weekly_group_polls", "created_by"],
  ["weekly_group_questions", "created_by"],
  ["weekly_group_series_posts", "created_by"],
  ["weekly_group_trivia_sets", "created_by"],
  ["group_post_broadcast_queue", "cursor_user_id"],
  ["moderator_actions", "target_user_id"],
];

const CHUNK = 200;

function isMissingTableError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    error.code === "42703" ||
    error.code === "PGRST204" ||
    /does not exist|could not find/i.test(error.message || "")
  );
}

function chunks<T>(items: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += CHUNK) out.push(items.slice(i, i + CHUNK));
  return out;
}

export async function deleteUserAccount(
  admin: SupabaseClient,
  userId: string
): Promise<AccountDeletionResult> {
  const cleared: Record<string, number> = {};
  const warnings: string[] = [];
  let storageFilesRemoved = 0;

  const note = (key: string, count: number | null | undefined) => {
    if (count) cleared[key] = (cleared[key] || 0) + count;
  };

  // Throws on real errors; missing tables/columns become warnings.
  const deleteWhere = async (table: string, column: string, value: string | string[]) => {
    const values = Array.isArray(value) ? value : [value];
    if (values.length === 0) return;
    for (const part of chunks(values)) {
      const query = admin.from(table).delete({ count: "exact" });
      const { error, count } = part.length === 1 ? await query.eq(column, part[0]) : await query.in(column, part);
      if (error) {
        if (isMissingTableError(error)) {
          warnings.push(`${table}.${column}: ${error.message}`);
          return;
        }
        throw new Error(`Could not clear ${table} (${column}): ${error.message}`);
      }
      note(table, count);
    }
  };

  const nullifyWhere = async (table: string, column: string, value: string | string[]) => {
    const values = Array.isArray(value) ? value : [value];
    if (values.length === 0) return;
    for (const part of chunks(values)) {
      const query = admin.from(table).update({ [column]: null }, { count: "exact" });
      const { error, count } = part.length === 1 ? await query.eq(column, part[0]) : await query.in(column, part);
      if (error) {
        if (isMissingTableError(error)) {
          warnings.push(`${table}.${column}: ${error.message}`);
          return;
        }
        throw new Error(`Could not unlink ${table} (${column}): ${error.message}`);
      }
      note(`${table} (unlinked)`, count);
    }
  };

  const selectIds = async (table: string, column: string, value: string | string[], idColumn = "id") => {
    const values = Array.isArray(value) ? value : [value];
    const ids: string[] = [];
    for (const part of chunks(values)) {
      if (part.length === 0) continue;
      const { data, error } = await admin.from(table).select(idColumn).in(column, part).limit(10000);
      if (error) {
        if (isMissingTableError(error)) {
          warnings.push(`${table}.${column}: ${error.message}`);
          return ids;
        }
        throw new Error(`Could not read ${table}: ${error.message}`);
      }
      for (const row of (data || []) as unknown as Array<Record<string, string>>) {
        if (row[idColumn]) ids.push(row[idColumn]);
      }
    }
    return ids;
  };

  // A user's post/comment plus every reply hanging under it (replies from
  // other people included - the thread goes with its root).
  const collectThread = async (table: string, parentColumn: string, rootIds: string[]) => {
    const all = new Set(rootIds);
    let frontier = rootIds;
    for (let depth = 0; depth < 10 && frontier.length > 0; depth += 1) {
      const children = (await selectIds(table, parentColumn, frontier)).filter((id) => !all.has(id));
      children.forEach((id) => all.add(id));
      frontier = children;
    }
    return [...all];
  };

  let conversationIds: string[] = [];

  try {
    // 1. Group posts (and replies under them)
    const groupPostIds = await collectThread(
      "group_posts",
      "parent_post_id",
      await selectIds("group_posts", "user_id", userId)
    );
    if (groupPostIds.length > 0) {
      await deleteWhere("group_post_likes", "post_id", groupPostIds);
      await nullifyWhere("group_feed_carousel_queue", "published_post_id", groupPostIds);
      await nullifyWhere("verse_of_the_day_entries", "group_post_id", groupPostIds);
      // deepest replies first so parent_post_id never blocks
      await deleteWhere("group_posts", "id", [...groupPostIds].reverse());
    }

    // 2. Feed posts + their comments/reactions/activity
    const feedPostIds = await selectIds("feed_posts", "user_id", userId);
    if (feedPostIds.length > 0) {
      await deleteWhere("feed_post_reactions", "post_id", feedPostIds);
      await deleteWhere("feed_activity", "feed_post_id", feedPostIds);
      await deleteWhere("feed_post_comments", "post_id", feedPostIds);
    }
    const feedCommentIds = await collectThread(
      "feed_post_comments",
      "parent_comment_id",
      await selectIds("feed_post_comments", "user_id", userId)
    );
    await deleteWhere("feed_post_comments", "id", [...feedCommentIds].reverse());
    await deleteWhere("feed_posts", "id", feedPostIds);

    // 3. Series reflections + likes + replies
    const reflectionIds = await collectThread(
      "series_reflections",
      "parent_reflection_id",
      await selectIds("series_reflections", "user_id", userId)
    );
    if (reflectionIds.length > 0) {
      await deleteWhere("series_reflection_likes", "reflection_id", reflectionIds);
      await deleteWhere("series_reflections", "id", [...reflectionIds].reverse());
    }

    // 4. Group series post comments + likes + replies
    const seriesCommentIds = await collectThread(
      "group_series_post_comments",
      "parent_comment_id",
      await selectIds("group_series_post_comments", "user_id", userId)
    );
    if (seriesCommentIds.length > 0) {
      await deleteWhere("group_series_comment_likes", "comment_id", seriesCommentIds);
      await deleteWhere("group_series_post_comments", "id", [...seriesCommentIds].reverse());
    }

    // 5. Direct messages: whole conversations the user was part of
    conversationIds = [
      ...new Set([
        ...(await selectIds("conversations", "user_id_1", userId)),
        ...(await selectIds("conversations", "user_id_2", userId)),
      ]),
    ];
    await deleteWhere("messages", "sender_id", userId);
    if (conversationIds.length > 0) {
      await deleteWhere("messages", "conversation_id", conversationIds);
      await deleteWhere("buddy_reports", "conversation_id", conversationIds);
      await nullifyWhere("bug_reports", "conversation_id", conversationIds);
      await deleteWhere("conversations", "id", conversationIds);
    }

    // 6. Notifications to or from the user (+ queued push jobs for them)
    const notificationIds = [
      ...new Set([
        ...(await selectIds("notifications", "user_id", userId)),
        ...(await selectIds("notifications", "from_user_id", userId)),
      ]),
    ];
    if (notificationIds.length > 0) {
      await deleteWhere("push_notification_jobs", "notification_id", notificationIds);
      await deleteWhere("notifications", "id", notificationIds);
    }

    // 7. Unlink shared content, then wipe everything else keyed by user
    for (const [table, column] of NULLIFY_REFERENCES) {
      await nullifyWhere(table, column, userId);
    }
    for (const [table, column] of USER_OWNED_ROWS) {
      await deleteWhere(table, column, userId);
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      cleared,
      warnings,
      storageFilesRemoved,
    };
  }

  // 8. Uploaded files (avatars/<uid>/..., post-media/<uid>/..., DM photos
  //    of the conversations removed above)
  const storageFolders: Array<[bucket: string, folder: string]> = [
    ["avatars", userId],
    ["post-media", userId],
    ...conversationIds.map((id): [string, string] => ["post-media", `dm-photos/${id}`]),
  ];
  for (const [bucket, folder] of storageFolders) {
    try {
      const { data: files, error } = await admin.storage.from(bucket).list(folder, { limit: 1000 });
      if (error) {
        warnings.push(`storage ${bucket}: ${error.message}`);
        continue;
      }
      const paths = (files || []).filter((file) => file.id).map((file) => `${folder}/${file.name}`);
      if (paths.length > 0) {
        const { data: removed, error: removeError } = await admin.storage.from(bucket).remove(paths);
        if (removeError) warnings.push(`storage ${bucket}: ${removeError.message}`);
        else storageFilesRemoved += removed?.length || 0;
      }
    } catch (error) {
      warnings.push(`storage ${bucket}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // 9. The auth user itself
  const { error: authError } = await admin.auth.admin.deleteUser(userId);
  if (authError) {
    return { ok: false, error: `Could not delete login: ${authError.message}`, cleared, warnings, storageFilesRemoved };
  }

  return { ok: true, cleared, warnings, storageFilesRemoved };
}
