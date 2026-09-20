import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { recordBugReport } from "@/lib/bugReports";

// Crash reports from app/error.tsx and app/global-error.tsx. Before these
// existed a crash showed people the raw "Application error" screen and
// Louis only heard about it if someone bothered to DM him (Day 1, 2026-09-10).
// Anyone can post here - a crash can happen before sign-in - so it only
// accepts short fields and dedupes identical errors into one row.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : "");

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const name = str(body?.name, 120) || "Error";
  const message = str(body?.message, 1000);
  const stack = str(body?.stack, 4000);
  const page = str(body?.page, 500);
  const digest = str(body?.digest, 120);
  const boundary = str(body?.boundary, 40);
  if (!message && !digest) return NextResponse.json({ ok: false }, { status: 400 });

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

  let reporterUserId: string | null = null;
  let reporterName: string | null = null;
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (token) {
    const auth = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data } = await auth.auth.getUser(token);
    if (data.user) {
      reporterUserId = data.user.id;
      const { data: profile } = await admin
        .from("profile_stats")
        .select("display_name, username")
        .eq("user_id", data.user.id)
        .maybeSingle();
      reporterName = profile?.display_name || profile?.username || null;
    }
  }

  // Same error on the same page = same bug. Numbers and hashes in chunk
  // names change every deploy, so strip them before comparing. Deploy ids
  // (dpl_...) are mixed-case alphanumeric, not pure hex, so they need their
  // own pass or "failed to load chunk" errors get a fresh fingerprint (and
  // a fresh open bug) on every single deploy instead of collapsing.
  const pagePath = page.split("?")[0];
  const normalized = `${name}:${message}`
    .replace(/dpl_[A-Za-z0-9]+/g, "dpl_#")
    .replace(/[0-9a-f]{6,}/gi, "#")
    .replace(/\d+/g, "#")
    .slice(0, 150);
  const fingerprint = `crash:${pagePath}:${normalized}`;

  try {
    await recordBugReport(admin, {
      source: "crash",
      category: "Crash",
      area: boundary === "global" ? "Whole app" : "Page",
      page,
      message: `${name}: ${message || "(no message)"}`,
      errorDetails: {
        stack,
        digest,
        boundary,
        userAgent: str(request.headers.get("user-agent"), 300),
        autoReloaded: Boolean(body?.autoReloaded),
      },
      fingerprint,
      reporterUserId,
      reporterName,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "save failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
