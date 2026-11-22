import { NextResponse } from "next/server";
import { clueAdmin, clueUserFrom, createRoom } from "@/lib/clueGame/server";

/** Host Room: create a private lobby. Body: { deckIds: string[] }. */
export async function POST(request: Request) {
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to host a room." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  try {
    const code = await createRoom(admin, user, Array.isArray(body.deckIds) ? body.deckIds.map(String) : ["genesis"]);
    return NextResponse.json({ code });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not create a room." }, { status: 400 });
  }
}
