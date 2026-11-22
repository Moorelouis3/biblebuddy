import { NextResponse } from "next/server";
import { actInRoom, clueAdmin, clueUserFrom, joinRoom, normalizeCode, startRoom, viewRoom } from "@/lib/clueGame/server";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ code: string }> };

/** The table as this player may see it (no answers before the reveal). */
export async function GET(request: Request, { params }: Ctx) {
  const { code } = await params;
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  const view = await viewRoom(admin, code, user);
  if ("error" in view) return NextResponse.json(view, { status: view.needsJoin ? 403 : 404 });
  return NextResponse.json(view, { headers: { "Cache-Control": "no-store" } });
}

/** Body: { op: "join" | "start" | "rematch" | "answer" | "pause" | "resume", choice? (0-3) }. */
export async function POST(request: Request, { params }: Ctx) {
  const { code: raw } = await params;
  const code = normalizeCode(raw);
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const op = String(body.op || "");
  let result: { ok?: boolean; error?: string; reason?: string };
  if (op === "join") {
    const joined = await joinRoom(admin, code, user);
    result = joined.ok ? { ok: true } : { error: joined.reason };
  } else if (op === "start" || op === "rematch") {
    result = await startRoom(admin, code, user, { rematch: op === "rematch" });
  } else if (["answer", "pause", "resume"].includes(op)) {
    result = await actInRoom(admin, code, user, { type: op, choice: body.choice });
  } else {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  const view = await viewRoom(admin, code, user);
  return NextResponse.json(view, { headers: { "Cache-Control": "no-store" } });
}
