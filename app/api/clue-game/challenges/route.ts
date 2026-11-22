import { NextResponse } from "next/server";
import { clueAdmin, clueUserFrom, createChallenge } from "@/lib/clueGame/server";

/** Challenge: freeze a finished solo round and post it to the Feed once. */
export async function POST(request: Request) {
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to share a challenge." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const result = await createChallenge(admin, user, body);
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json(result);
}
