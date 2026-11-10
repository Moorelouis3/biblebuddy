import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { MAX_LEVEL } from "@/lib/levelSystem";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * "I have shown the user this level-up."
 *
 * The other half of the fix for defects D1 and D2
 * (docs/LEVELS_PROPOSAL_2026-11-10.md §1.7). /api/points/summary banks the new
 * level and reports that a celebration is owed; this route is how the client
 * says it has been paid, and only then does the level stop being owed.
 *
 * Idempotent by construction. The write is a monotonic high-water mark:
 *
 *   level_celebrated = max(level_celebrated, :level)
 *
 * so a retry, a double-tap, two tabs racing and an out-of-order request from a
 * stale page all land on the same value, and none of them can move it
 * backwards. There is nothing to undo and nothing to guard with a lock.
 *
 * One write, no read beyond the auth lookup. Called once per level a user ever
 * reaches - at most 19 times in an account's life.
 */
export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { data: userData, error: userError } = await supabase.auth.getUser(token);
  const userId = userData?.user?.id;
  if (userError || !userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  let level: number;
  try {
    const body = (await request.json()) as { level?: unknown };
    level = Math.floor(Number(body?.level));
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  if (!Number.isFinite(level) || level < 1 || level > MAX_LEVEL) {
    return NextResponse.json({ error: "Invalid level." }, { status: 400 });
  }

  // Read the current mark, then write only if this request raises it. Two
  // concurrent requests can both pass this check, and that is harmless: they
  // write the same value. A read-modify-write is only unsafe when the value can
  // move both ways, and this one cannot.
  const { data: existing, error: readError } = await supabase
    .from("profile_stats")
    .select("level_celebrated")
    .eq("user_id", userId)
    .maybeSingle();

  // supabase-js resolves with {data: null, error} rather than throwing, so a
  // dropped connection has to be checked, not caught. Failing loudly here is
  // right: swallowing it would leave the celebration owed forever and the user
  // seeing the same popup on every dashboard load.
  if (readError) {
    console.error("[POINTS] Could not read level_celebrated:", readError.message);
    return NextResponse.json({ error: "Could not record celebration." }, { status: 500 });
  }

  const current = (existing as { level_celebrated: number | null } | null)?.level_celebrated ?? 0;
  if (level <= current) {
    return NextResponse.json({ ok: true, levelCelebrated: current, changed: false });
  }

  const { error: writeError } = await supabase
    .from("profile_stats")
    .upsert({ user_id: userId, level_celebrated: level }, { onConflict: "user_id" });

  if (writeError) {
    console.error("[POINTS] Could not record celebration:", writeError.message);
    return NextResponse.json({ error: "Could not record celebration." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, levelCelebrated: level, changed: true });
}
