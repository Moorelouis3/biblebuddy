import { NextResponse } from "next/server";
import { clueAdmin, clueUserFrom, listBuddies } from "@/lib/clueGame/server";

export const dynamic = "force-dynamic";

/** Your Bible Buddies, for picking who to challenge (lib/clueGame/server.ts listBuddies). */
export async function GET(request: Request) {
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to challenge your Buddies." }, { status: 401 });
  return NextResponse.json({ buddies: await listBuddies(admin, user.id) }, { headers: { "Cache-Control": "no-store" } });
}
