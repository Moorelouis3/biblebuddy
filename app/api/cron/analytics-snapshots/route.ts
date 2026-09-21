import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { computeDashboard, type DashboardWindow } from "@/lib/adminDashboard";
import { writeAnalyticsSnapshot } from "@/lib/adminAnalyticsSnapshots";

// Pre-builds /admin/analytics so it opens instantly. Since 2026-09-21 this
// builds the new dashboard (lib/adminDashboard.ts) directly - about 15s per
// timeframe. The old page's snapshots had silently stopped updating on
// 2026-09-15; the old page (/admin/analytics/legacy) now computes live.
// Groups keep their existing vercel.json schedules: Today every 30 min, the
// rest hourly. "long" is kept as a no-op so its schedule does not 400.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const GROUPS: Record<string, DashboardWindow[]> = {
  today: ["today"],
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
