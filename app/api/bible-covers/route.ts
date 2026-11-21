import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_COVERS, normalizeBibleCoverId, type BibleCoverId } from "@/lib/bibleCovers";

/**
 * Bible Covers on the account (2026-11-21).
 *
 *   GET  -> { counts: { "winter-cabin": 56, ... }, total }   how many Buddies
 *           have each cover on (Louis: "when a buddy selects it shows 56
 *           buddies are using this cover").
 *   POST { cover: id | null }  (signed in) -> saves the choice to the account
 *           and answers with the fresh counts.
 *
 * The choice lives in auth user_metadata.bible_cover, not in a new
 * profile_stats column (no migration) and not in master_actions - picking a
 * cover is not studying, and anything in master_actions counts as activity
 * for the email and analytics rules. user_metadata also travels with the
 * session, so AppShell can put the same cover on someone's other devices.
 *
 * Counting reads every account's metadata (about 8 pages of 1,000), so it is
 * held for ten minutes per server instance and nudged by each POST.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Counts = Record<BibleCoverId, number>;
const TTL_MS = 10 * 60 * 1000;
let cache: { at: number; counts: Counts; total: number } | null = null;

function clients() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !service) return null;
  const opts = { auth: { autoRefreshToken: false, persistSession: false } };
  return { auth: createClient(url, anon, opts), admin: createClient(url, service, opts) };
}

function emptyCounts(): Counts {
  return Object.fromEntries(Object.keys(BIBLE_COVERS).map((id) => [id, 0])) as Counts;
}

async function countCovers(admin: NonNullable<ReturnType<typeof clients>>["admin"]) {
  if (cache && Date.now() - cache.at < TTL_MS) return cache;
  const counts = emptyCounts();
  let total = 0;
  for (let page = 1; page < 100; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    for (const user of data.users) {
      const id = normalizeBibleCoverId((user.user_metadata as Record<string, unknown> | undefined)?.bible_cover);
      if (id) {
        counts[id] += 1;
        total += 1;
      }
    }
    if (data.users.length < 1000) break;
  }
  cache = { at: Date.now(), counts, total };
  return cache;
}

export async function GET() {
  const c = clients();
  if (!c) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  try {
    const { counts, total } = await countCovers(c.admin);
    return NextResponse.json({ counts, total }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch (error) {
    console.error("[BIBLE_COVERS] count failed:", error);
    return NextResponse.json({ error: "Could not count covers." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const c = clients();
  if (!c) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const token = request.headers.get("authorization")?.replace(/^Bearer /i, "") || "";
  const { data: who } = token ? await c.auth.auth.getUser(token) : { data: { user: null } };
  const user = who?.user;
  if (!user) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });

  let body: { cover?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const next = body.cover === null ? null : normalizeBibleCoverId(body.cover);
  if (body.cover !== null && !next) return NextResponse.json({ error: "Unknown cover." }, { status: 400 });

  const meta = (user.user_metadata || {}) as Record<string, unknown>;
  const previous = normalizeBibleCoverId(meta.bible_cover);
  if (previous !== next) {
    const { error } = await c.admin.auth.admin.updateUserById(user.id, {
      user_metadata: { ...meta, bible_cover: next },
    });
    if (error) {
      console.error("[BIBLE_COVERS] save failed:", error.message);
      return NextResponse.json({ error: "Could not save your cover." }, { status: 500 });
    }
    // Keep the held count honest without re-reading every account.
    if (cache) {
      if (previous) { cache.counts[previous] = Math.max(0, cache.counts[previous] - 1); cache.total -= 1; }
      if (next) { cache.counts[next] += 1; cache.total += 1; }
    }
  }

  try {
    const { counts, total } = await countCovers(c.admin);
    return NextResponse.json({ cover: next, counts, total });
  } catch {
    return NextResponse.json({ cover: next });
  }
}
