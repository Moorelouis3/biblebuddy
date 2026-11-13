import { supabase } from "./supabaseClient";

export type AutoCommentDraft = {
  /** "prepared" came from the library, "ai" from the model, "none" means no draft is offered. */
  route: "prepared" | "ai" | "none";
  reply: string;
  /** Why there is no draft, when route is "none". */
  message?: string;
  /** The model was told this post is a prayer request or shares something hard. */
  careful?: boolean;
};

/**
 * Ask for a draft first comment on a feed post.
 *
 * Only the post id is sent. The server reads the post itself, decides whether
 * it is routine activity (a prepared line) or something a person wrote (one
 * model call), and returns text for the comment box. It never posts anything.
 *
 * `turn` asks for a different prepared line when the first one is not wanted.
 *
 * The sibling for replying to a COMMENT is lib/requestAutoReplyDraft.ts.
 */
export async function requestAutoCommentDraft(postId: string, turn = 0): Promise<AutoCommentDraft> {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new Error("Could not verify your session.");

  // Absolute URL: inside the iOS app a relative fetch can hang forever.
  const response = await fetch(`${window.location.origin}/api/feed/auto-comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ postId, turn }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Could not write a draft.");

  const route = payload.route === "prepared" || payload.route === "ai" ? payload.route : "none";
  return {
    route,
    reply: typeof payload.reply === "string" ? payload.reply.trim() : "",
    message: typeof payload.message === "string" ? payload.message : undefined,
    careful: payload.careful === true,
  };
}
