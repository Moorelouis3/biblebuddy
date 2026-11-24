import { NextRequest, NextResponse } from "next/server";
import { CLUE_BANK } from "@/lib/clueGame/bank";
import { clueAdmin } from "@/lib/clueGame/server";
import { ensureWeeklyTrivia, isPostingTime } from "@/lib/clueGame/weekly";

/**
 * Weekly Bible Trivia (lib/clueGame/weekly.ts): every Tuesday at 12:00 New
 * York, Bible Buddy posts the week's game on the Feed and last week's winner
 * goes on last week's post.
 *
 * Runs at 16, 17 and 18 UTC on Tuesdays (vercel.json) so noon New York is
 * covered in summer and winter time, with a retry. It does nothing before
 * noon New York, and posting twice in a week is impossible (one row a week).
 *
 * Replaced /api/cron/weekly-group-trivia on 2026-11-24.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const now = new Date();
  if (!isPostingTime(now)) return NextResponse.json({ skipped: "Not Tuesday after 12:00 New York yet." });
  try {
    const result = await ensureWeeklyTrivia(clueAdmin(), CLUE_BANK.values(), now);
    return NextResponse.json(result, { status: "error" in result ? 500 : 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not post the weekly trivia." }, { status: 500 });
  }
}
