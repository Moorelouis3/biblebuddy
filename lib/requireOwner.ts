import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Shared guard for owner-only API routes (2026-09-21 security pass). Allows
// Louis's own session token, the Vercel cron (CRON_SECRET) or Life Buddy
// (BIBLE_BUDDY_STATS_SECRET). Returns a 401/403 response to send back, or
// null when the caller is allowed.

const OWNER_EMAIL = "moorelouis3@gmail.com";

export async function requireOwner(request: Request): Promise<NextResponse | null> {
  const header = request.headers.get("authorization") || "";
  const token = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : "";
  if (!token) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const secrets = [process.env.CRON_SECRET, process.env.BIBLE_BUDDY_STATS_SECRET].filter(Boolean);
  if (secrets.includes(token)) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const client = createClient(url, anonKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data, error } = await client.auth.getUser(token);
  if (error || data.user?.email !== OWNER_EMAIL) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return null;
}
