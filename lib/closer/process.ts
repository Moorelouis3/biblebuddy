import type { SupabaseClient } from "@supabase/supabase-js";
import { findTrigger, loadCloserConfig, renderTemplate } from "./config";
import {
  sendFacebookPrivateReply,
  sendInstagramPrivateReply,
  sendPublicCommentReply,
  sendThreadsReply,
} from "./meta";
import type { CloserComment, CloserConfig, CloserStatus } from "./types";

const ACTION_STATUSES: CloserStatus[] = ["dm_sent", "dm_failed_fallback_posted", "public_reply_sent"];

// The outbound calls are injected rather than imported directly at the call
// site so the simulation script can exercise the real decision logic - the
// trigger match, the claim, the DM refused then fallback path - without
// touching Meta. Production passes nothing and gets the real senders.
export type CloserSenders = {
  instagramPrivateReply: typeof sendInstagramPrivateReply;
  facebookPrivateReply: typeof sendFacebookPrivateReply;
  publicCommentReply: typeof sendPublicCommentReply;
  threadsReply: typeof sendThreadsReply;
};

export const REAL_SENDERS: CloserSenders = {
  instagramPrivateReply: sendInstagramPrivateReply,
  facebookPrivateReply: sendFacebookPrivateReply,
  publicCommentReply: sendPublicCommentReply,
  threadsReply: sendThreadsReply,
};

export type ProcessOutcome = {
  commentId: string;
  platform: string;
  status: CloserStatus;
  detail: string;
};

async function finish(
  supabase: SupabaseClient,
  commentId: string,
  platform: string,
  status: CloserStatus,
  detail: string,
): Promise<ProcessOutcome> {
  await supabase
    .from("closer_events")
    .update({ status, detail: detail.slice(0, 2000) })
    .eq("platform", platform)
    .eq("comment_id", commentId);
  return { commentId, platform, status, detail };
}

// Actions taken in the last hour, used for the safety cap. Counts real sends
// only: skips and errors did not consume anything at Meta.
async function countRecentActions(supabase: SupabaseClient) {
  const sinceIso = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("closer_events")
    .select("id", { count: "exact", head: true })
    .in("status", ACTION_STATUSES)
    .gte("created_at", sinceIso);
  return count || 0;
}

export async function processComment(
  supabase: SupabaseClient,
  comment: CloserComment,
  configOverride?: CloserConfig,
  senders: CloserSenders = REAL_SENDERS,
): Promise<ProcessOutcome> {
  const config = configOverride ?? (await loadCloserConfig(supabase));
  const trigger = findTrigger(comment.text, config.triggerWords);

  // Claim the comment BEFORE doing anything else. The unique index on
  // (platform, comment_id) is what makes this safe: a webhook retry, a
  // redeploy mid send, or two instances racing all lose the insert here
  // instead of sending a second message. Meta allows exactly one private
  // reply per comment ever, so a duplicate is not noise, it burns the only
  // chance to reach that person.
  const { error: claimError } = await supabase.from("closer_events").insert({
    platform: comment.platform,
    comment_id: comment.commentId,
    post_id: comment.postId,
    commenter_handle: comment.commenterHandle,
    commenter_id: comment.commenterId,
    comment_text: comment.text?.slice(0, 2000) ?? null,
    matched_trigger: trigger,
    status: "processing",
    dry_run: config.dryRun,
  });

  if (claimError) {
    // 23505 is the unique violation: we have seen this comment before.
    if (claimError.code === "23505") {
      return {
        commentId: comment.commentId,
        platform: comment.platform,
        status: "skipped_duplicate",
        detail: "Already processed",
      };
    }
    return {
      commentId: comment.commentId,
      platform: comment.platform,
      status: "error",
      detail: `Could not record event: ${claimError.message}`,
    };
  }

  if (!trigger) {
    return finish(supabase, comment.commentId, comment.platform, "skipped_no_trigger", "No trigger word in comment");
  }

  const dmText = renderTemplate(config.dmTemplate, config.signupLink);
  const publicText = renderTemplate(config.publicReplyTemplate, config.signupLink);
  const fallbackText = renderTemplate(config.fallbackCommentTemplate, config.signupLink);

  if (config.dryRun) {
    const wouldDo =
      comment.platform === "threads"
        ? `WOULD post public reply: ${publicText}`
        : `WOULD send DM: ${dmText}`;
    return finish(supabase, comment.commentId, comment.platform, "skipped_dry_run", `${wouldDo} (trigger: ${trigger})`);
  }

  const recentActions = await countRecentActions(supabase);
  if (recentActions >= config.hourlyCap) {
    return finish(
      supabase,
      comment.commentId,
      comment.platform,
      "skipped_rate_limited",
      `Hourly cap of ${config.hourlyCap} reached (${recentActions} in the last hour)`,
    );
  }

  // Threads has no DM API, so the public reply is not a fallback there, it is
  // the intended path, and it carries the link.
  if (comment.platform === "threads") {
    const result = await senders.threadsReply(comment.commentId, publicText);
    return result.ok
      ? finish(supabase, comment.commentId, comment.platform, "public_reply_sent", "Threads reply posted")
      : finish(supabase, comment.commentId, comment.platform, "error", `Threads reply failed: ${result.detail}`);
  }

  const dmResult =
    comment.platform === "instagram"
      ? await senders.instagramPrivateReply(comment.commentId, dmText)
      : await senders.facebookPrivateReply(comment.commentId, dmText);

  if (dmResult.ok) {
    return finish(supabase, comment.commentId, comment.platform, "dm_sent", `DM sent (trigger: ${trigger})`);
  }

  // A transient failure is left as an error rather than falling back: the
  // private reply may still be available later, and posting the "check your
  // DMs" comment when no DM went out would be a lie to the reader.
  if (!dmResult.permanent) {
    return finish(
      supabase,
      comment.commentId,
      comment.platform,
      "error",
      `DM failed, not retried and no fallback posted because the failure looks transient: ${dmResult.detail}`,
    );
  }

  const fallback = await senders.publicCommentReply(comment.commentId, fallbackText);
  if (fallback.ok) {
    return finish(
      supabase,
      comment.commentId,
      comment.platform,
      "dm_failed_fallback_posted",
      `DM refused (${dmResult.detail}). Public fallback posted.`,
    );
  }

  return finish(
    supabase,
    comment.commentId,
    comment.platform,
    "error",
    `DM refused (${dmResult.detail}) and fallback comment also failed (${fallback.detail})`,
  );
}

// Sends are queued one at a time with a small gap rather than fired in
// parallel. Meta documents roughly 2 messaging calls per second per account,
// and a burst from one popular post is exactly how an app gets throttled.
export async function processCommentsSequentially(
  supabase: SupabaseClient,
  comments: CloserComment[],
  senders: CloserSenders = REAL_SENDERS,
): Promise<ProcessOutcome[]> {
  const config = await loadCloserConfig(supabase);
  const outcomes: ProcessOutcome[] = [];

  for (const comment of comments) {
    outcomes.push(await processComment(supabase, comment, config, senders));
    if (!config.dryRun) await sleep(600);
  }

  return outcomes;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
