import { NextResponse } from "next/server";
import { clueAdmin, clueUserFrom, getChallenge, submitChallengeAttempt } from "@/lib/clueGame/server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** The frozen round and its leaderboard. */
export async function GET(request: Request, { params }: Ctx) {
  const { id } = await params;
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  const result = await getChallenge(admin, id, user);
  if ("error" in result) return NextResponse.json(result, { status: 404 });
  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}

/** A finished attempt. The first one per person is ranked. Body: { score, won }. */
export async function POST(request: Request, { params }: Ctx) {
  const { id } = await params;
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const result = await submitChallengeAttempt(admin, id, user, body);
  if ("error" in result) return NextResponse.json(result, { status: 404 });
  const board = await getChallenge(admin, id, user);
  return NextResponse.json({ ...result, challenge: board });
}
