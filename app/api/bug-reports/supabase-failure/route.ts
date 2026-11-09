import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { platformFromUserAgent, recordBugReport } from "@/lib/bugReports";

// Supabase requests that failed in somebody's browser, from the client's own
// fetch wrapper (lib/supabaseFailureReporter.ts).
//
// This exists because supabase-js does not throw when a request fails - it
// returns { data: null, error } - so none of these ever reached the crash
// boundary, a global error listener, or any other record. Every bug in
// docs/STABILITY_VERIFICATION_2026-11-09.md is one of these.
//
// Modelled on ./crash/route.ts and sharing its dedupe: a fingerprint seen in
// the last 14 days bumps a counter instead of making a new row. Anyone can
// post, including signed-out readers, so it accepts only short, named fields
// and never a payload.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const str = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : "");

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const table = str(body?.table, 80);
  const operation = str(body?.operation, 20);
  const reason = str(body?.reason, 200);
  // pathname only. The client sends no query string on purpose: one of them
  // carries a live password-reset token.
  const page = str(body?.page, 300).split("?")[0];
  const status = Number.isFinite(body?.status) ? Number(body.status) : 0;
  const fingerprint = str(body?.fingerprint, 200);

  if (!table || !fingerprint) return NextResponse.json({ ok: false }, { status: 400 });

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    await recordBugReport(admin, {
      source: "supabase",
      category: "Request failure",
      area: table,
      page,
      message: `${operation || "request"} on ${table} failed (${status || "no response"}): ${reason || "unknown"}`,
      errorDetails: {
        table,
        operation,
        status,
        reason,
        userAgent: str(request.headers.get("user-agent"), 300),
      },
      fingerprint,
      // The same failure in the native shell and in a browser are not the same
      // bug: one of them may need an App Store release to fix.
      platform: platformFromUserAgent(request.headers.get("user-agent")),
      // Deliberately unattributed. Asking supabase-js who is signed in, from
      // inside its own fetch wrapper, is a recursion; the table and the page
      // are what identify the bug anyway.
      reporterUserId: null,
      reporterName: null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "save failed" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
