import { NextRequest, NextResponse } from "next/server";

/**
 * Switched off, 2026-10-18.
 *
 * This drained group_post_broadcast_queue into one notification per member
 * per post - "Louis Moore posted in Bible Buddy Study Group", about six
 * thousand of them every time he wrote anything. 461,515 of the 495,594 rows
 * in the notifications table came out of here.
 *
 * Louis: "I used to have it so every time I push something they would be
 * notified. I think that may be annoying - I would hate to be notified on
 * social media every time somebody else posted something, so we can take that
 * off." People are told when somebody likes or replies to their own post, and
 * nothing else; a new post is something you find by opening the feed.
 *
 * The route stays as a 410 rather than disappearing, because its schedule may
 * still be in vercel.json on a deployed build and a 404 there reads like a
 * broken deploy. The database trigger that fills the queue is still in place
 * and is Louis's to drop - nothing drains it now, so it writes to a queue
 * nobody reads.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  return NextResponse.json(
    { ok: false, retired: "Group post broadcasts were turned off on 2026-10-18." },
    { status: 410 },
  );
}
