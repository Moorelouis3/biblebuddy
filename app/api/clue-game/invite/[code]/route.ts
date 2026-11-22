import { NextResponse } from "next/server";
import { clueAdmin, roomInvite } from "@/lib/clueGame/server";

export const dynamic = "force-dynamic";

/**
 * Public: the invite card for /play/<code>. No sign-in, because the person
 * opening an invite often has no account yet. See roomInvite() for exactly
 * what it reveals (host first name and photo, deck, seats, joinable).
 */
export async function GET(_request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const invite = await roomInvite(clueAdmin(), code);
  return NextResponse.json(invite, { headers: { "Cache-Control": "no-store" } });
}
