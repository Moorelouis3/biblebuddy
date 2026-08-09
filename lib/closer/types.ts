export type CloserPlatform = "instagram" | "facebook" | "threads";

export type CloserStatus =
  | "dm_sent"
  | "dm_failed_fallback_posted"
  | "public_reply_sent"
  | "skipped_no_trigger"
  | "skipped_duplicate"
  | "skipped_rate_limited"
  | "skipped_dry_run"
  | "error";

export type CloserConfig = {
  dryRun: boolean;
  hourlyCap: number;
  triggerWords: string[];
  signupLink: string;
  dmTemplate: string;
  fallbackCommentTemplate: string;
  publicReplyTemplate: string;
};

// One comment, normalized out of whichever platform delivered it.
export type CloserComment = {
  platform: CloserPlatform;
  commentId: string;
  postId: string | null;
  commenterHandle: string | null;
  commenterId: string | null;
  text: string;
};

export type CloserEventRow = {
  id: string;
  platform: CloserPlatform;
  comment_id: string;
  post_id: string | null;
  commenter_handle: string | null;
  commenter_id: string | null;
  comment_text: string | null;
  matched_trigger: string | null;
  status: CloserStatus;
  detail: string | null;
  dry_run: boolean;
  created_at: string;
};

export type CloserSendResult = {
  ok: boolean;
  // Set when the platform refused for a reason that will never succeed on
  // retry (policy, privacy, comment too old). Those must not be retried.
  permanent?: boolean;
  detail: string;
};
