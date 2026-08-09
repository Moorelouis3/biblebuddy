import { NextRequest, NextResponse } from "next/server";
import { getCloserSupabase } from "@/lib/closer/config";
import { getMetaEnv, verifyMetaSignature } from "@/lib/closer/meta";
import { processCommentsSequentially } from "@/lib/closer/process";
import type { CloserComment } from "@/lib/closer/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// One endpoint for both Instagram and Facebook. Meta delivers every product's
// webhooks for an app to the same callback URL and tells you which one it is
// via the top level `object` field, so splitting this into two routes would
// just mean registering one of them and wondering why the other never fired.

// GET is Meta's subscription handshake: it calls the callback URL with a
// challenge and expects the raw value echoed back as plain text.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  const { verifyToken } = getMetaEnv();
  if (!verifyToken) {
    return new NextResponse("META_WEBHOOK_VERIFY_TOKEN is not configured", { status: 500 });
  }

  if (mode === "subscribe" && token === verifyToken && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new NextResponse("Verification failed", { status: 403 });
}

export async function POST(request: NextRequest) {
  // The signature is computed over the exact bytes Meta sent, so the body has
  // to be read as raw text before any JSON parsing.
  const rawBody = await request.text();

  const signature = verifyMetaSignature(rawBody, request.headers.get("x-hub-signature-256"));
  if (!signature.ok) {
    // Without this check the endpoint is an open trigger for sending DMs from
    // Louis's accounts to anyone an attacker names.
    console.error("[CLOSER] Rejected webhook:", signature.reason);
    return new NextResponse("Invalid signature", { status: 401 });
  }

  let payload: MetaWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as MetaWebhookPayload;
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const comments = extractComments(payload);

  // Always 200 quickly. Meta retries anything else, and a retry storm on a
  // popular post is worse than a dropped event we can see in the log.
  if (!comments.length) return NextResponse.json({ ok: true, processed: 0 });

  const supabase = getCloserSupabase();
  if (!supabase) {
    console.error("[CLOSER] Supabase is not configured, dropping", comments.length, "comment(s)");
    return NextResponse.json({ ok: true, processed: 0, note: "storage not configured" });
  }

  try {
    const outcomes = await processCommentsSequentially(supabase, comments);
    return NextResponse.json({ ok: true, processed: outcomes.length, outcomes });
  } catch (error) {
    console.error("[CLOSER] Processing failed:", error);
    return NextResponse.json({ ok: true, processed: 0, error: "processing failed" });
  }
}

type MetaWebhookPayload = {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{ field?: string; value?: Record<string, unknown> }>;
  }>;
};

// Normalizes both products into one shape. Instagram sends field "comments";
// a Facebook Page sends field "feed" for everything that happens on the page,
// so a comment there has to be picked out by item/verb rather than assumed.
export function extractComments(payload: MetaWebhookPayload): CloserComment[] {
  const platform = payload.object === "instagram" ? "instagram" : "facebook";
  const comments: CloserComment[] = [];

  for (const entry of payload.entry || []) {
    for (const change of entry.changes || []) {
      const value = (change.value || {}) as Record<string, any>;

      if (platform === "instagram") {
        if (change.field !== "comments") continue;
        const commentId = asText(value.id);
        if (!commentId) continue;
        comments.push({
          platform: "instagram",
          commentId,
          postId: asText(value.media?.id),
          commenterHandle: asText(value.from?.username),
          commenterId: asText(value.from?.id),
          text: asText(value.text) || "",
        });
        continue;
      }

      if (change.field !== "feed") continue;
      if (value.item !== "comment") continue;
      // Edits and deletions are not new comments to answer.
      if (value.verb && value.verb !== "add") continue;
      const commentId = asText(value.comment_id);
      if (!commentId) continue;
      // Skip the page replying to itself, or the loop never ends.
      if (entry.id && asText(value.from?.id) === entry.id) continue;
      comments.push({
        platform: "facebook",
        commentId,
        postId: asText(value.post_id),
        commenterHandle: asText(value.from?.name),
        commenterId: asText(value.from?.id),
        text: asText(value.message) || "",
      });
    }
  }

  return comments;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
