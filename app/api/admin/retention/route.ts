import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAY = 86400000;

function ago(ms: number, days: number) {
  return new Date(ms - days * DAY).toISOString();
}

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const db = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const now = Date.now();

    // ── Fetch all login events (all time) ─────────────────────────────────
    // Uses service role so RLS doesn't block. Fetch in pages of 10k to avoid
    // hitting any server-side row cap.
    const allLogins: { user_id: string; created_at: string }[] = [];
    let page = 0;
    const PAGE_SIZE = 10000;
    while (true) {
      const { data, error } = await db
        .from("master_actions")
        .select("user_id, created_at")
        .eq("action_type", "user_login")
        .order("created_at", { ascending: true })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (error) {
        console.error("[RETENTION API] query error:", error);
        break;
      }
      if (!data || data.length === 0) break;
      allLogins.push(...data);
      if (data.length < PAGE_SIZE) break;
      page++;
    }

    console.log(`[RETENTION API] total login rows fetched: ${allLogins.length}`);

    // ── Build per-user date sets ──────────────────────────────────────────
    const userDates = new Map<string, Set<string>>();
    for (const row of allLogins) {
      if (!row.user_id) continue;
      const day = row.created_at.slice(0, 10);
      if (!userDates.has(row.user_id)) userDates.set(row.user_id, new Set());
      userDates.get(row.user_id)!.add(day);
    }

    // ── Cutoff strings ────────────────────────────────────────────────────
    const thirtyDaysAgoStr = ago(now, 30).slice(0, 10);
    const sevenDaysAgoStr  = ago(now, 7).slice(0, 10);
    const oneDayAgoStr     = ago(now, 1).slice(0, 10);

    // ── DAU / WAU / MAU ───────────────────────────────────────────────────
    let dauCount = 0, wauCount = 0, mauCount = 0;
    const avgGaps: number[] = [];

    for (const [, dates] of userDates) {
      const sorted = [...dates].sort();
      const lastDay = sorted[sorted.length - 1];

      // MAU = active in last 30 days
      if (lastDay < thirtyDaysAgoStr) continue;
      mauCount++;
      if (lastDay >= sevenDaysAgoStr) wauCount++;
      if (lastDay >= oneDayAgoStr) dauCount++;

      // Frequency — avg gap between sessions (all-time history)
      if (sorted.length < 2) {
        avgGaps.push(999); // one-time user sentinel
        continue;
      }
      let total = 0;
      for (let i = 1; i < sorted.length; i++) {
        total += (new Date(sorted[i]).getTime() - new Date(sorted[i - 1]).getTime()) / DAY;
      }
      avgGaps.push(total / (sorted.length - 1));
    }

    // ── Stickiness ────────────────────────────────────────────────────────
    const dauMauPct = mauCount > 0 ? Math.round((dauCount / mauCount) * 100) : 0;
    const wauMauPct = mauCount > 0 ? Math.round((wauCount / mauCount) * 100) : 0;

    // ── Avg / median gap ─────────────────────────────────────────────────
    const realGaps = avgGaps.filter((g) => g < 999);
    const avgGapDays =
      realGaps.length > 0
        ? Math.round((realGaps.reduce((a, b) => a + b, 0) / realGaps.length) * 10) / 10
        : 0;
    const sortedGaps = [...realGaps].sort((a, b) => a - b);
    const medianGapDays =
      sortedGaps.length > 0
        ? Math.round(sortedGaps[Math.floor(sortedGaps.length / 2)] * 10) / 10
        : 0;

    // ── 7-day return rate ─────────────────────────────────────────────────
    const prevSet = new Set<string>();
    const currSet = new Set<string>();
    const fourteenDaysAgoStr = ago(now, 14).slice(0, 10);
    for (const [userId, dates] of userDates) {
      for (const d of dates) {
        if (d >= fourteenDaysAgoStr && d < sevenDaysAgoStr) prevSet.add(userId);
        if (d >= sevenDaysAgoStr) currSet.add(userId);
      }
    }
    const returned = [...prevSet].filter((id) => currSet.has(id)).length;
    const sevenDayReturnPct = prevSet.size > 0 ? Math.round((returned / prevSet.size) * 100) : 0;

    // ── Frequency buckets ─────────────────────────────────────────────────
    const BUCKETS = [
      { label: "Daily",           sublabel: "≤ 1.5 days avg",          min: 0,    max: 1.5,      color: "#22c55e" },
      { label: "Few times/week",  sublabel: "1.5 – 3.5 days avg",      min: 1.5,  max: 3.5,      color: "#84cc16" },
      { label: "Weekly",          sublabel: "3.5 – 8 days avg",        min: 3.5,  max: 8,        color: "#eab308" },
      { label: "Bi-weekly",       sublabel: "8 – 20 days avg",         min: 8,    max: 20,       color: "#f97316" },
      { label: "Monthly",         sublabel: "20 – 40 days avg",        min: 20,   max: 40,       color: "#ef4444" },
      { label: "One-time / rare", sublabel: "Only 1 login or 40+ days", min: 40,  max: Infinity, color: "#9ca3af" },
    ];

    const totalForBuckets = avgGaps.length;
    const freqBuckets = BUCKETS.map((b) => {
      const count = avgGaps.filter((g) => g >= b.min && g < b.max).length;
      return { ...b, count, pct: totalForBuckets > 0 ? Math.round((count / totalForBuckets) * 100) : 0 };
    });

    return NextResponse.json({
      dauMauPct,
      wauMauPct,
      sevenDayReturnPct,
      avgGapDays,
      medianGapDays,
      activeUserCount: mauCount,
      freqBuckets,
      debug: { totalLoginRows: allLogins.length, uniqueUsers: userDates.size },
    });
  } catch (e: any) {
    console.error("[RETENTION API] error:", e);
    return NextResponse.json({ error: e?.message || "Failed" }, { status: 500 });
  }
}
