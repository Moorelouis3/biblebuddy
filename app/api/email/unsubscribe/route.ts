import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { suppress } from "@/lib/email/sesSender";

/**
 * Unsubscribe, the one link every marketing email has to carry.
 *
 * Two ways in, both landing on the same suppression list:
 *   POST - Gmail and Yahoo's one-click button (RFC 8058). No page, no
 *          confirmation, no login: the mail client posts here and the address
 *          is done. Returns 200 whatever happens, because a failure here
 *          turns into a spam complaint instead.
 *   GET  - the link at the bottom of the email, for a human. Same effect, then
 *          a small page saying so.
 *
 * The link is signed with EMAIL_LINK_SECRET so an address cannot be
 * unsubscribed by guessing URLs, and nobody can unsubscribe somebody else.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sign(email: string) {
  const secret = process.env.EMAIL_LINK_SECRET || "";
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

/** The link to put in an email. */
export function unsubscribeUrlFor(email: string, baseUrl = "https://www.mybiblebuddy.net") {
  const params = new URLSearchParams({ e: email.trim().toLowerCase(), t: sign(email) });
  return `${baseUrl}/api/email/unsubscribe?${params.toString()}`;
}

function valid(email: string, token: string) {
  if (!process.env.EMAIL_LINK_SECRET || !email || !token) return false;
  const expected = sign(email);
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

async function unsubscribe(request: NextRequest) {
  const url = new URL(request.url);
  const email = (url.searchParams.get("e") || "").trim().toLowerCase();
  const token = url.searchParams.get("t") || "";
  if (!valid(email, token)) return { ok: false as const, email };
  try {
    await suppress(email, "unsubscribe", "unsubscribe link");
    return { ok: true as const, email };
  } catch (error) {
    console.error("[UNSUBSCRIBE] failed:", error instanceof Error ? error.message : error);
    return { ok: false as const, email };
  }
}

export async function POST(request: NextRequest) {
  const result = await unsubscribe(request);
  // Always 200: a mail client that sees an error may report the message as
  // spam instead, which costs the sender far more than a silent retry.
  return NextResponse.json({ ok: result.ok });
}

export async function GET(request: NextRequest) {
  const result = await unsubscribe(request);
  const body = result.ok
    ? `<h1>You're unsubscribed</h1><p>${result.email} won't receive any more emails from Bible Buddy.</p>
       <p>Your account and your study progress are untouched - this only stops the emails.</p>`
    : `<h1>That link didn't work</h1><p>It may have been cut in half by your email app. Reply to the email
       and Louis will take you off the list by hand.</p>`;

  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>Bible Buddy email</title>
     <style>
       body { margin:0; background:#f3f6fa; color:#111827; font:16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
       main { max-width:34rem; margin:0 auto; padding:3rem 1rem; }
       h1 { font-size:1.5rem; margin:0 0 .75rem; }
       p { margin:0 0 .75rem; color:#374151; }
       a { color:#2f7fe8; }
     </style></head>
     <body><main>${body}<p><a href="https://www.mybiblebuddy.net">Back to Bible Buddy</a></p></main></body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
