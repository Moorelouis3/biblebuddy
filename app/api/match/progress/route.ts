import { NextResponse } from "next/server";
import { clueAdmin, clueUserFrom } from "@/lib/clueGame/server";

export const dynamic = "force-dynamic";

/**
 * Bible Buddy Match progress (supabase/migrations/20261122_match_progress.sql).
 *
 * GET  -> { me, buddies }: your saved progress, and each Bible Buddy (the
 *         buddies table, either side) who has played: name, photo and the
 *         board they are on, for their faces on the map.
 * POST -> { unlocked, done, best }: merged into your row, never backwards
 *         (the higher board, every board ever finished, the best scores), so
 *         two phones and a stale tab cannot undo each other.
 */

type Row = { user_id: string; unlocked: number; done: string[]; best: Record<string, number> };

export async function GET(request: Request) {
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  // Start from the people who have played (a few hundred at most) and keep
  // the ones who are this person's Buddies. The other way round (every Buddy,
  // then their progress) capped at 500 Buddies a side, and Louis has ~2,000:
  // Jessica, Vickie and Mike never showed on his map (2026-11-23).
  const [{ data: mine }, { data: played }] = await Promise.all([
    admin.from("match_progress").select("user_id, unlocked, done, best").eq("user_id", user.id).maybeSingle(),
    admin.from("match_progress").select("user_id, unlocked, done").neq("user_id", user.id).order("updated_at", { ascending: false }).limit(1000),
  ]);
  const playerIds = ((played || []) as Row[]).map((r) => r.user_id);
  let buddies: Array<{ id: string; name: string; avatar: string | null; unlocked: number; done: number }> = [];
  const ids: string[] = [];
  for (let i = 0; i < playerIds.length; i += 200) {
    const chunk = playerIds.slice(i, i + 200);
    const [{ data: a }, { data: b }] = await Promise.all([
      admin.from("buddies").select("user_id_2").eq("user_id_1", user.id).in("user_id_2", chunk),
      admin.from("buddies").select("user_id_1").eq("user_id_2", user.id).in("user_id_1", chunk),
    ]);
    ids.push(...(a || []).map((r) => r.user_id_2 as string), ...(b || []).map((r) => r.user_id_1 as string));
  }
  if (ids.length) {
    const want = new Set(ids);
    const rows = ((played || []) as Row[]).filter((r) => want.has(r.user_id));
    const { data: profiles } = await admin.from("profile_stats").select("user_id, display_name, username, profile_image_url").in("user_id", [...want]);
    const prof = new Map((profiles || []).map((p) => [p.user_id as string, p]));
    buddies = ((rows || []) as Row[]).map((r) => {
      const p = prof.get(r.user_id);
      const name = String((p?.display_name as string) || (p?.username as string) || "Buddy").split(/\s+/)[0];
      return { id: r.user_id, name, avatar: (p?.profile_image_url as string | null) ?? null, unlocked: r.unlocked, done: (r.done || []).length };
    });
  }
  return NextResponse.json({ me: mine ?? null, buddies }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const admin = clueAdmin();
  const user = await clueUserFrom(request, admin);
  if (!user) return NextResponse.json({ error: "Sign in to play." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const unlocked = Math.max(1, Math.min(500, Math.floor(Number(body.unlocked) || 1)));
  const done = Array.isArray(body.done) ? body.done.map(String).filter((s: string) => /^[a-z0-9-]{1,40}$/.test(s)).slice(0, 500) : [];
  const best: Record<string, number> = {};
  for (const [k, v] of Object.entries((body.best && typeof body.best === "object" ? body.best : {}) as Record<string, unknown>)) {
    if (/^[a-z0-9-]{1,40}$/.test(k) && Number.isFinite(Number(v))) best[k] = Math.max(0, Math.min(10_000_000, Math.floor(Number(v))));
  }
  const { data: prev } = await admin.from("match_progress").select("unlocked, done, best").eq("user_id", user.id).maybeSingle();
  const merged = {
    user_id: user.id,
    unlocked: Math.max(unlocked, (prev?.unlocked as number) || 1),
    done: [...new Set([...((prev?.done as string[]) || []), ...done])],
    best: { ...((prev?.best as Record<string, number>) || {}) },
    updated_at: new Date().toISOString(),
  };
  for (const [k, v] of Object.entries(best)) merged.best[k] = Math.max(merged.best[k] || 0, v);
  const { error } = await admin.from("match_progress").upsert(merged, { onConflict: "user_id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, unlocked: merged.unlocked, done: merged.done, best: merged.best });
}
