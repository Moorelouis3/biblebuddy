import { NextResponse } from "next/server";
import { clueAdmin, clueUserFrom, getChallenge, passChallenge, submitChallengeAttempt } from "@/lib/clueGame/server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** The frozen round, its leaderboard and its chain. */
export async function GET(request: Request, { params }: Ctx) {
  const { id } = await params;
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  const result = await getChallenge(admin, id, user);
  if ("error" in result) return NextResponse.json(result, { status: 404 });
  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}

/**
 * Body { score, won, from? }: a finished attempt. The first one per person is
 * ranked and posts that person's link in the chain to the Feed.
 * Body { op: "pass", buddyIds }: pass the challenge on to your Bible Buddies.
 */
export async function POST(request: Request, { params }: Ctx) {
  const { id } = await params;
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  if (body?.op === "pass") {
    const passed = await passChallenge(admin, id, user, Array.isArray(body.buddyIds) ? body.buddyIds : []);
    if ("error" in passed) return NextResponse.json(passed, { status: 400 });
    return NextResponse.json(passed);
  }
  // Local testing reads and writes the live database: no Feed post from it.
  const result = await submitChallengeAttempt(admin, id, user, body, { postToFeed: process.env.NODE_ENV !== "development" });
  if ("error" in result) return NextResponse.json(result, { status: 404 });
  const board = await getChallenge(admin, id, user);
  return NextResponse.json({ ...result, challenge: board });
}
