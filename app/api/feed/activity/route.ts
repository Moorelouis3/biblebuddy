import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { FEED_MILESTONES, insertFeedMilestone } from "@/lib/feedMilestones";
import type { ActionType } from "@/lib/actionTypes";

/**
 * The buddy feed's automatic items (Louis, 2026-10-17).
 *
 * The browser asks for one when somebody finishes something worth announcing;
 * the decision is made here, not there. A page that could write its own feed
 * rows could announce anything about anybody, and the allowlist, the daily cap
 * and the "not twice" rule are only worth having if they cannot be skipped by
 * whoever is calling.
 *
 * Fire and forget from the caller's side: whether an announcement happens
 * changes nothing about the reading that earned it, which is recorded before
 * this is ever called.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  if (!token) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const authClient = createClient(supabaseUrl, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: authData } = await authClient.auth.getUser(token);
  const userId = authData.user?.id;
  // The row is written for whoever the token says they are. Nothing in the
  // request body can name a different person.
  if (!userId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const actionType = String(body?.actionType ?? "") as ActionType;
  if (!FEED_MILESTONES.has(actionType)) {
    return NextResponse.json({ ok: true, posted: false, reason: "not a milestone" });
  }

  // Short, flat, and strings or numbers only: this ends up rendered as a
  // sentence on other people's screens.
  const raw = body?.data && typeof body.data === "object" ? body.data : {};
  const data: Record<string, string | number | null> = {};
  for (const [key, value] of Object.entries(raw).slice(0, 8)) {
    if (typeof value === "number") data[key] = value;
    else if (typeof value === "string") data[key] = value.replace(/[\r\n\t]+/g, " ").trim().slice(0, 120);
  }

  const admin = createClient(supabaseUrl, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const result = await insertFeedMilestone(admin, userId, actionType, data);
  return NextResponse.json({ ok: true, ...result });
}
