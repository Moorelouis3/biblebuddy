import { ACTION_TYPE } from "./actionTypes";
import { logActionToMasterActions } from "./actionRecorder";
import { supabase } from "./supabaseClient";

export function buildBibleBuddyTvWatchLabel(input: {
  categoryLabel: string;
  title: string;
  episodeLabel: string;
  episodeTitle: string;
  episodeId: string;
}) {
  return `${input.categoryLabel} - ${input.title} - ${input.episodeLabel} - ${input.episodeTitle} - watch:${input.episodeId}`;
}

export async function recordBibleBuddyTvWatchOnce(input: {
  userId: string;
  username?: string | null;
  actionLabel: string;
}) {
  const { userId, username = null, actionLabel } = input;
  if (!userId || !actionLabel) return { recorded: false };

  const { data, error } = await supabase
    .from("master_actions")
    .select("id")
    .eq("user_id", userId)
    .eq("action_type", ACTION_TYPE.bible_buddy_tv_video_started)
    .eq("action_label", actionLabel)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.warn("[TV] Could not check existing TV watch:", error);
    return { recorded: false };
  }

  if (data?.id) return { recorded: false };

  await logActionToMasterActions(
    userId,
    ACTION_TYPE.bible_buddy_tv_video_started,
    actionLabel,
    username,
  );

  return { recorded: true };
}
