import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { computeDashboard, type DashboardWindow } from "@/lib/adminDashboard";
import { writeAnalyticsSnapshot } from "@/lib/adminAnalyticsSnapshots";

// Pre-builds /admin/analytics so it opens instantly. Since 2026-09-21 this
// builds the new dashboard (lib/adminDashboard.ts) directly - about 15s per
// timeframe. The old page's snapshots had silently stopped updating on
// 2026-09-15; the old page (/admin/analytics/legacy) now computes live.
// Every timeframe is rebuilt every 15 minutes (2026-09-26, Louis: "so its no
// waiting") - `today` on the quarter hour, `recent` (yesterday / 7d / 30d)
// offset to 7,22,37,52 so the two runs never overlap. The page only ever
// reads these files, so opening /admin/analytics never computes anything.
// "long" is kept as an empty group so an old schedule would not 400.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * ONE WINDOW PER RUN. Building several in a single invocation gets the
 * function OOM-killed: Vercel logged "instance was killed because it ran out
 * of available memory" on 2026-09-26, after writing `today` and dying on the
 * next window. It is why `30d` used to sit hours stale while `7d` was fresh -
 * the old three-window `recent` run never reached the end.
 *
 * Each window now has its own schedule, staggered three minutes apart, so all
 * four still refresh every 15 minutes without two runs ever overlapping.
 * `all` is kept for manual use only - do not put it on a schedule.
 */
const GROUPS: Record<string, DashboardWindow[]> = {
  today: ["today"],
  yesterday: ["yesterday"],
  "7d": ["7d"],
  "30d": ["30d"],
  all: ["today", "yesterday", "7d", "30d"],
  recent: ["yesterday", "7d", "30d"],
  long: [],
};

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const group = request.nextUrl.searchParams.get("group") || "today";
  const windows = GROUPS[group];
  if (!windows) return NextResponse.json({ error: "Unknown group." }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  const results: Array<{ window: string; ok: boolean; seconds: number; error?: string }> = [];
  for (const window of windows) {
    const started = Date.now();
    try {
      const data = await computeDashboard(admin, window);
      await writeAnalyticsSnapshot(admin, `dashboard:${window}`, { ...data, snapshotAt: new Date().toISOString() } as unknown as Record<string, unknown>);
      results.push({ window, ok: true, seconds: Math.round((Date.now() - started) / 1000) });
    } catch (error) {
      results.push({ window, ok: false, seconds: Math.round((Date.now() - started) / 1000), error: error instanceof Error ? error.message : "failed" });
    }
  }
  return NextResponse.json({ ok: results.every((r) => r.ok), group, results });
}
