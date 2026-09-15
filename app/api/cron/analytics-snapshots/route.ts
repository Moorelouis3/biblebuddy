import { NextRequest, NextResponse } from "next/server";

// Pre-builds /admin/analytics so it opens instantly (Louis, 2026-09-15: 20-40s
// waits were "wild"). Each timeframe is computed by the analytics route itself
// with fresh=1, which saves the result as a snapshot. Groups run on their own
// schedules (vercel.json): Today every 30 min, the rest less often because
// they change slowly and cost the most to build.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const GROUPS: Record<string, string[]> = {
  today: ["today"],
  recent: ["yesterday", "7d", "30d"],
  long: ["90d", "lifetime"],
};

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const group = request.nextUrl.searchParams.get("group") || "today";
  const windows = GROUPS[group];
  if (!windows) return NextResponse.json({ error: "Unknown group." }, { status: 400 });

  const origin = request.nextUrl.origin;
  const results: Array<{ window: string; mode: string; status: number | string; seconds: number }> = [];

  // One timeframe at a time (overview + full together) so the database is not
  // hit with every heavy query at once - except the long group: 90 Days and
  // All Time take minutes each, and back to back they would pass the 5-minute
  // limit on this function.
  const buildWindow = (window: string) =>
    Promise.all(
      ["overview", "full"].map(async (mode) => {
        const started = Date.now();
        const params = new URLSearchParams({ window, fresh: "1" });
        if (mode === "overview") params.set("mode", "overview");
        try {
          const response = await fetch(`${origin}/api/admin/onboarding-analytics?${params}`, {
            headers: { Authorization: `Bearer ${secret}` },
            cache: "no-store",
          });
          // Drain the body so the connection closes cleanly.
          await response.arrayBuffer();
          results.push({ window, mode, status: response.status, seconds: Math.round((Date.now() - started) / 1000) });
        } catch (error) {
          results.push({
            window,
            mode,
            status: error instanceof Error ? error.message : "failed",
            seconds: Math.round((Date.now() - started) / 1000),
          });
        }
      }),
    );
  if (group === "long") {
    await Promise.all(windows.map(buildWindow));
  } else {
    for (const window of windows) await buildWindow(window);
  }

  return NextResponse.json({ ok: results.every((row) => row.status === 200), group, results });
}
