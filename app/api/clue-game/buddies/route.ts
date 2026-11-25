import { NextResponse } from "next/server";
import { buddyChoices, clueAdmin, clueUserFrom } from "@/lib/clueGame/server";

export const dynamic = "force-dynamic";

/**
 * Buddies for the challenge picker (lib/clueGame/server.ts buddyChoices):
 * the 10 most active, or `?q=` to search all of them. `?exclude=` is a comma
 * list of ids already in the chain.
 */
export async function GET(request: Request) {
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to challenge your Buddies." }, { status: 401 });
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").slice(0, 60);
  const exclude = (url.searchParams.get("exclude") || "").split(",").filter(Boolean).slice(0, 200);
  return NextResponse.json(await buddyChoices(admin, user.id, q, exclude), { headers: { "Cache-Control": "no-store" } });
}
