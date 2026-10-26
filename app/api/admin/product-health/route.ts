import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { computeProductHealth, type ProductHealthTab } from "@/lib/productHealth";
import { buildProductHealthReport, type ReportPeriod } from "@/lib/productHealthReport";
import { DASHBOARD_WINDOWS, type DashboardWindow } from "@/lib/adminDashboard";

/**
 * Product Health data, for Louis only.
 *
 * Same gate as every other admin route here: a bearer token from the signed-in
 * session, checked against the owner address, and only then is a service-role
 * client created. The service key never leaves this process and no part of
 * this payload is reachable without the token.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const ADMIN_EMAIL = "moorelouis3@gmail.com";

async function requireLouis(request: NextRequest): Promise<{ admin: SupabaseClient } | NextResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const auth = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await auth.auth.getUser(token);
  if (error || (data.user?.email || "").toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return { admin: createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } }) };
}

/**
 * A small in-process cache.
 *
 * These queries page through master_actions, which has 185,000 rows and grows
 * daily. Without this, switching tabs back and forth would re-run the lot
 * every time. 90 seconds is long enough to make the page feel immediate and
 * short enough that Refresh (which passes refresh=1 and skips this) is the
 * only thing anybody needs to reach for.
 */
const CACHE_MS = 90_000;
const cache = new Map<string, { at: number; payload: unknown }>();

const TABS: ProductHealthTab[] = ["overview", "acquisition", "retention", "devotionals", "community", "releases", "reports"];

export async function GET(request: NextRequest) {
  const auth = await requireLouis(request);
  if (auth instanceof NextResponse) return auth;

  const params = request.nextUrl.searchParams;
  const tab = (params.get("tab") || "overview") as ProductHealthTab;
  const window = (params.get("window") || "30d") as DashboardWindow;
  const report = params.get("report") as ReportPeriod | null;
  const refresh = params.get("refresh") === "1";

  if (!TABS.includes(tab)) return NextResponse.json({ error: "Unknown tab." }, { status: 400 });
  if (!DASHBOARD_WINDOWS.includes(window)) return NextResponse.json({ error: "Unknown window." }, { status: 400 });

  try {
    if (report) {
      if (report !== "weekly" && report !== "monthly") {
        return NextResponse.json({ error: "Unknown report period." }, { status: 400 });
      }
      const built = await buildProductHealthReport(auth.admin, report);
      return NextResponse.json({ ok: true, report: built });
    }

    const key = `${tab}:${window}`;
    const hit = cache.get(key);
    if (!refresh && hit && Date.now() - hit.at < CACHE_MS) {
      return NextResponse.json({ ...(hit.payload as object), cached: true, cachedAt: new Date(hit.at).toISOString() });
    }
    const payload = await computeProductHealth(auth.admin, tab, window);
    cache.set(key, { at: Date.now(), payload });
    return NextResponse.json({ ...payload, cached: false });
  } catch (error) {
    // A thrown query must never reach the page as a zero.
    console.error("[PRODUCT_HEALTH]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Product Health failed to compute." },
      { status: 500 },
    );
  }
}
