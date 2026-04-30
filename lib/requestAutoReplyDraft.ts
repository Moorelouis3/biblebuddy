import { supabase } from "./supabaseClient";

export async function requestAutoReplyDraft(params: {
  originalPostTitle?: string | null;
  originalPostContent?: string | null;
  targetCommentContent: string;
  targetDisplayName?: string | null;
}) {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;

  if (!accessToken) {
    throw new Error("Could not verify your session.");
  }

  const response = await fetch("/api/auto-reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Could not generate a reply draft.");
  }

  const reply = typeof payload.reply === "string" ? payload.reply.trim() : "";
  if (!reply) {
    throw new Error("Could not generate a reply draft.");
  }

  return reply;
}
