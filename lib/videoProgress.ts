"use client";

import { supabase } from "./supabaseClient";

export type VideoProgressRow = {
  id: string;
  user_id: string;
  video_id: string;
  current_time: number | null;
  duration: number | null;
  completed: boolean | null;
  last_event: string | null;
  updated_at: string | null;
};

export type SaveVideoProgressInput = {
  userId: string;
  videoId: string;
  currentTime: number;
  duration: number;
  lastEvent: "play" | "pause" | "progress" | "completed";
  completed?: boolean;
};

export async function getVideoProgress(userId: string, videoId: string) {
  const { data, error } = await supabase
    .from("video_progress")
    .select("id, user_id, video_id, current_time, duration, completed, last_event, updated_at")
    .eq("user_id", userId)
    .eq("video_id", videoId)
    .maybeSingle<VideoProgressRow>();

  if (error) throw error;
  return data;
}

export async function getVideoProgressForVideos(userId: string, videoIds: string[]) {
  if (!videoIds.length) return [] as VideoProgressRow[];

  const { data, error } = await supabase
    .from("video_progress")
    .select("id, user_id, video_id, current_time, duration, completed, last_event, updated_at")
    .eq("user_id", userId)
    .in("video_id", videoIds)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data || []) as VideoProgressRow[];
}

export async function saveVideoProgress({
  userId,
  videoId,
  currentTime,
  duration,
  lastEvent,
  completed,
}: SaveVideoProgressInput) {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const safeCurrentTime = Number.isFinite(currentTime) && currentTime >= 0 ? currentTime : 0;
  const resolvedCompleted =
    typeof completed === "boolean"
      ? completed
      : safeDuration > 0 && safeCurrentTime >= safeDuration * 0.9;

  const { error } = await supabase.from("video_progress").upsert(
    {
      user_id: userId,
      video_id: videoId,
      current_time: safeCurrentTime,
      duration: safeDuration,
      completed: resolvedCompleted,
      last_event: lastEvent,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,video_id",
    },
  );

  if (error) throw error;
}
