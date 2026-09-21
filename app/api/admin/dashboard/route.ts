import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { computeDashboard, DASHBOARD_WINDOWS, type DashboardWindow } from "@/lib/adminDashboard";
import { readAnalyticsSnapshot, writeAnalyticsSnapshot } from "@/lib/adminAnalyticsSnapshots";

// Owner analytics dashboard (2026-09-21). Reads the saved snapshot unless
// fresh=1 (the refresh button and the snapshot cron), then computes live and
// re-saves it. Only Louis, or the cron with CRON_SECRET, can read it.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const OWNER_EMAIL = "moorelouis3@gmail.com";

async function isOwner(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7) : "";
  if (!url || !anonKey || !token) return false;
  const client = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await client.auth.getUser(token);
  return !error && data.user?.email === OWNER_EMAIL;
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const isCron = Boolean(cronSecret) && request.headers.get("authorization") === `Bearer ${cronSecret}`;
  if (!isCron && !(await isOwner(request))) {
    return NextResponse.json({ error: "Owner analytics only." }, { status: 403 });
  }

  const params = new URL(request.url).searchParams;
  const requested = params.get("window") as DashboardWindow | null;
  const window: DashboardWindow = requested && DASHBOARD_WINDOWS.includes(requested) ? requested : "7d";
  const fresh = params.get("fresh") === "1";

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const key = `dashboard:${window}`;

  if (!fresh) {
    const snapshot = await readAnalyticsSnapshot(admin, key);
    if (snapshot) return NextResponse.json(snapshot, { headers: { "Cache-Control": "private, no-store" } });
  }

  try {
    const data = await computeDashboard(admin, window);
    const body = { ...data, snapshotAt: new Date().toISOString() };
    await writeAnalyticsSnapshot(admin, key, body as unknown as Record<string, unknown>);
    return NextResponse.json(body, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("[DASHBOARD] compute failed:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Dashboard failed." }, { status: 500 });
  }
}
