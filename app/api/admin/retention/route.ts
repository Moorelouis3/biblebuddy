import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DAY_MS = 24 * 60 * 60 * 1000;

type ActionRow = {
  user_id: string | null;
  created_at: string;
};

function getDayKey(dateIso: string) {
  return dateIso.slice(0, 10);
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
    const since60d = new Date(now - 60 * DAY_MS).toISOString();
    const since30d = new Date(now - 30 * DAY_MS).toISOString();
    const since14d = new Date(now - 14 * DAY_MS).toISOString();
    const since7d = new Date(now - 7 * DAY_MS).toISOString();
    const since24h = new Date(now - DAY_MS).toISOString();

    const { data, error } = await db
      .from("master_actions")
      .select("user_id, created_at")
      .gte("created_at", since60d)
      .order("created_at", { ascending: false })
      .limit(250000);

    if (error) {
      console.error("[USAGE API] query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = ((data || []) as ActionRow[]).filter((row) => typeof row.user_id === "string" && row.user_id.length > 0);

    const active24h = new Set<string>();
    const active7d = new Set<string>();
    const active30d = new Set<string>();
    const prev7d = new Set<string>();

    const actionsByUser7d = new Map<string, number>();
    const actionsByUser30d = new Map<string, number>();
    const activeDaysByUser30d = new Map<string, Set<string>>();

    for (const row of rows) {
      const userId = row.user_id as string;
      const createdAt = row.created_at;

      if (createdAt >= since24h) {
        active24h.add(userId);
      }

      if (createdAt >= since7d) {
        active7d.add(userId);
        actionsByUser7d.set(userId, (actionsByUser7d.get(userId) || 0) + 1);
      } else if (createdAt >= since14d) {
        prev7d.add(userId);
      }

      if (createdAt >= since30d) {
        active30d.add(userId);
        actionsByUser30d.set(userId, (actionsByUser30d.get(userId) || 0) + 1);

        if (!activeDaysByUser30d.has(userId)) {
          activeDaysByUser30d.set(userId, new Set());
        }
        activeDaysByUser30d.get(userId)?.add(getDayKey(createdAt));
      }
    }

    const totalActions24h = rows.filter((row) => row.created_at >= since24h).length;
    const totalActions7d = rows.filter((row) => row.created_at >= since7d).length;
    const totalActions30d = rows.filter((row) => row.created_at >= since30d).length;

    const avgActionsPerActiveUser24h =
      active24h.size > 0 ? Math.round((totalActions24h / active24h.size) * 10) / 10 : 0;
    const avgActionsPerActiveUser7d =
      active7d.size > 0 ? Math.round((totalActions7d / active7d.size) * 10) / 10 : 0;
    const avgActionsPerActiveUser30d =
      active30d.size > 0 ? Math.round((totalActions30d / active30d.size) * 10) / 10 : 0;

    const avgActiveDays30d =
      activeDaysByUser30d.size > 0
        ? Math.round(
            (
              [...activeDaysByUser30d.values()].reduce((sum, days) => sum + days.size, 0) /
              activeDaysByUser30d.size
            ) * 10
          ) / 10
        : 0;

    const powerUsers7d = [...actionsByUser7d.values()].filter((count) => count >= 5).length;
    const returningUsers7d = [...prev7d].filter((userId) => active7d.has(userId)).length;
    const returnRate7d = prev7d.size > 0 ? Math.round((returningUsers7d / prev7d.size) * 100) : 0;

    return NextResponse.json({
      active24h: active24h.size,
      active7d: active7d.size,
      active30d: active30d.size,
      totalActions24h,
      totalActions7d,
      totalActions30d,
      avgActionsPerActiveUser24h,
      avgActionsPerActiveUser7d,
      avgActionsPerActiveUser30d,
      avgActiveDays30d,
      powerUsers7d,
      returnRate7d,
      debug: {
        rowsFetched: rows.length,
        unique24h: active24h.size,
        unique7d: active7d.size,
        unique30d: active30d.size,
      },
    });
  } catch (error) {
    console.error("[USAGE API] error:", error);
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
