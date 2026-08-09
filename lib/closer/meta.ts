import crypto from "crypto";
import type { CloserSendResult } from "./types";

// Every call to Meta lives in this file so there is one place to correct if an
// endpoint shape changes.
//
// Sourcing note: developers.facebook.com is blocked by this environment's
// egress proxy, so these were built from Meta's documented behaviour as
// reported by secondary sources rather than read directly off the official
// reference. The shapes below match the documented Graph API conventions, but
// treat the first live call as the real verification. dry_run is on by
// default precisely so that first call happens under supervision.
//
//   Facebook private reply   POST /{comment-id}/private_replies   message=...
//   Instagram private reply  POST /{ig-user-id}/messages          recipient={comment_id}
//   Public comment reply     POST /{comment-id}/replies           message=...
//   Threads reply            POST /{user-id}/threads (reply_to_id) then /threads_publish
//
// Meta permits exactly ONE private reply per comment, ever. A retry is not a
// harmless duplicate, it is a wasted single chance, which is why the caller
// records the attempt before making it.

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || "v21.0";
const GRAPH_HOST = "https://graph.facebook.com";
const THREADS_HOST = "https://graph.threads.net/v1.0";

export function getMetaEnv() {
  return {
    appSecret: process.env.META_APP_SECRET || "",
    verifyToken: process.env.META_WEBHOOK_VERIFY_TOKEN || "",
    facebookPageId: process.env.FACEBOOK_PAGE_ID || "",
    facebookPageToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "",
    instagramUserId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "",
    instagramToken: process.env.INSTAGRAM_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "",
    threadsUserId: process.env.THREADS_USER_ID || "",
    threadsToken: process.env.THREADS_ACCESS_TOKEN || "",
  };
}

// Which credentials are missing, for the status page and the startup report.
export function getMissingMetaEnv(): string[] {
  const env = getMetaEnv();
  const missing: string[] = [];
  if (!env.appSecret) missing.push("META_APP_SECRET");
  if (!env.verifyToken) missing.push("META_WEBHOOK_VERIFY_TOKEN");
  if (!env.facebookPageToken) missing.push("FACEBOOK_PAGE_ACCESS_TOKEN");
  if (!env.facebookPageId) missing.push("FACEBOOK_PAGE_ID");
  if (!env.instagramUserId) missing.push("INSTAGRAM_BUSINESS_ACCOUNT_ID");
  if (!env.threadsUserId) missing.push("THREADS_USER_ID");
  if (!env.threadsToken) missing.push("THREADS_ACCESS_TOKEN");
  return missing;
}

// Meta signs every webhook body with the app secret. Without this check the
// endpoint is a public, unauthenticated trigger for sending DMs.
export function verifyMetaSignature(rawBody: string, signatureHeader: string | null) {
  const { appSecret } = getMetaEnv();
  if (!appSecret) return { ok: false, reason: "META_APP_SECRET is not configured" };
  if (!signatureHeader) return { ok: false, reason: "Missing X-Hub-Signature-256 header" };

  const expected = "sha256=" + crypto.createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  if (a.length !== b.length) return { ok: false, reason: "Signature length mismatch" };
  if (!crypto.timingSafeEqual(a, b)) return { ok: false, reason: "Signature mismatch" };
  return { ok: true, reason: "" };
}

// Errors that will never succeed on retry. Meta returns these when the user
// cannot be messaged (private account, no prior connection, comment outside
// the allowed window) or when the single private reply was already used.
const PERMANENT_ERROR_CODES = new Set([10, 200, 230, 551, 2018001, 2018108, 2534037]);
const PERMANENT_ERROR_PATTERN =
  /cannot message|not allowed|policy|permission|outside.*window|already.*replied|private repl|user not found|24 hour/i;

function classifyError(status: number, body: string): CloserSendResult {
  let code: number | null = null;
  let message = body;
  try {
    const parsed = JSON.parse(body) as { error?: { code?: number; message?: string; error_subcode?: number } };
    if (parsed.error) {
      code = parsed.error.error_subcode ?? parsed.error.code ?? null;
      message = parsed.error.message || body;
    }
  } catch {
    // Non JSON error body: fall back to the raw text.
  }

  const permanent =
    (code !== null && PERMANENT_ERROR_CODES.has(code)) ||
    PERMANENT_ERROR_PATTERN.test(message) ||
    status === 400 ||
    status === 403;

  return { ok: false, permanent, detail: `HTTP ${status}${code !== null ? ` code ${code}` : ""}: ${message}` };
}

async function postForm(url: string, params: Record<string, string>): Promise<CloserSendResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params).toString(),
    });
    const text = await response.text();
    if (!response.ok) return classifyError(response.status, text);
    return { ok: true, detail: text.slice(0, 500) };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : "Network error" };
  }
}

async function postJson(url: string, payload: unknown, token: string): Promise<CloserSendResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    if (!response.ok) return classifyError(response.status, text);
    return { ok: true, detail: text.slice(0, 500) };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : "Network error" };
  }
}

export async function sendInstagramPrivateReply(commentId: string, message: string): Promise<CloserSendResult> {
  const { instagramUserId, instagramToken } = getMetaEnv();
  if (!instagramUserId || !instagramToken) {
    return { ok: false, permanent: true, detail: "Instagram credentials are not configured" };
  }
  return postJson(
    `${GRAPH_HOST}/${GRAPH_VERSION}/${instagramUserId}/messages`,
    { recipient: { comment_id: commentId }, message: { text: message } },
    instagramToken,
  );
}

export async function sendFacebookPrivateReply(commentId: string, message: string): Promise<CloserSendResult> {
  const { facebookPageToken } = getMetaEnv();
  if (!facebookPageToken) {
    return { ok: false, permanent: true, detail: "Facebook page token is not configured" };
  }
  return postForm(`${GRAPH_HOST}/${GRAPH_VERSION}/${commentId}/private_replies`, {
    message,
    access_token: facebookPageToken,
  });
}

// Public reply under the comment. Used as the fallback when a DM is refused,
// and as the only option on Threads.
export async function sendPublicCommentReply(commentId: string, message: string): Promise<CloserSendResult> {
  const { facebookPageToken } = getMetaEnv();
  if (!facebookPageToken) {
    return { ok: false, permanent: true, detail: "Page token is not configured" };
  }
  return postForm(`${GRAPH_HOST}/${GRAPH_VERSION}/${commentId}/replies`, {
    message,
    access_token: facebookPageToken,
  });
}

// Threads has no DM API at all, so a public reply is the whole strategy there.
// Publishing is two steps: build a container, then publish it.
export async function sendThreadsReply(replyToId: string, message: string): Promise<CloserSendResult> {
  const { threadsUserId, threadsToken } = getMetaEnv();
  if (!threadsUserId || !threadsToken) {
    return { ok: false, permanent: true, detail: "Threads credentials are not configured" };
  }

  const created = await postForm(`${THREADS_HOST}/${threadsUserId}/threads`, {
    media_type: "TEXT",
    text: message,
    reply_to_id: replyToId,
    access_token: threadsToken,
  });
  if (!created.ok) return created;

  let creationId = "";
  try {
    creationId = (JSON.parse(created.detail) as { id?: string }).id || "";
  } catch {
    return { ok: false, detail: `Could not read creation id from Threads response: ${created.detail}` };
  }
  if (!creationId) return { ok: false, detail: "Threads container response had no id" };

  return postForm(`${THREADS_HOST}/${threadsUserId}/threads_publish`, {
    creation_id: creationId,
    access_token: threadsToken,
  });
}
