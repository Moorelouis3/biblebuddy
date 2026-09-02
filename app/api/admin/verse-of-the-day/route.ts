import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Admin API for the Verse of the Day system. All entry writes in the app go
 * through here (the table has no client write policies).
 *
 * GET  ?mode=overview     entries (all statuses) + settings + queue health
 * GET  ?mode=performance  per-entry engagement counts from landing_page_events
 *                         and the engagement table
 * POST { action, ... }    create | update | set_status | reschedule |
 *                         set_background | swap_dates | save_settings | delete
 *
 * Auth: Bearer access token of the signed-in owner (same pattern as the
 * onboarding analytics API) - the token's email must be the admin email.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return null;
  const admin = getAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  if ((data.user.email || "").toLowerCase() !== ADMIN_EMAIL) return null;
  return { admin, userId: data.user.id };
}

/** Berlin calendar date as YYYY-MM-DD - Louis's clock is the admin clock. */
function berlinDayKey(offsetDays = 0) {
  const now = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

type QueueHealth = {
  today: string;
  approvedDaysRemaining: number;
  tomorrowCovered: boolean;
  nextGapDate: string | null;
};

async function computeQueueHealth(admin: NonNullable<ReturnType<typeof getAdminClient>>): Promise<QueueHealth> {
  const today = berlinDayKey();
  const { data } = await admin
    .from("verse_of_the_day_entries")
    .select("scheduled_date, status")
    .gt("scheduled_date", today)
    .order("scheduled_date", { ascending: true });
  const approvedDates = new Set(
    (data || []).filter((row) => row.status === "approved").map((row) => row.scheduled_date as string),
  );
  // Remaining = consecutive covered days starting tomorrow; a gap ends the run,
  // because the homepage falls back the moment a day has no approved entry.
  let remaining = 0;
  let nextGap: string | null = null;
  for (let i = 1; i <= 366; i++) {
    const day = berlinDayKey(i);
    if (approvedDates.has(day)) {
      remaining += 1;
    } else {
      nextGap = day;
      break;
    }
  }
  return {
    today,
    approvedDaysRemaining: remaining,
    tomorrowCovered: approvedDates.has(berlinDayKey(1)),
    nextGapDate: nextGap,
  };
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { admin } = auth;
  const mode = request.nextUrl.searchParams.get("mode") || "overview";

  if (mode === "performance") {
    // Engagement counts per scheduled date, honest numbers from the two
    // real sources: analytics events and the engagement table.
    const { data: events } = await admin
      .from("landing_page_events")
      .select("event_name, metadata")
      .like("event_name", "votd_%")
      .limit(50000);
    const byDate: Record<string, Record<string, number>> = {};
    for (const row of events || []) {
      const date = String((row.metadata as Record<string, unknown>)?.date || "unknown");
      byDate[date] = byDate[date] || {};
      byDate[date][row.event_name] = (byDate[date][row.event_name] || 0) + 1;
    }
    const { data: engagement } = await admin
      .from("verse_of_the_day_engagement")
      .select("entry_id, bookmarked, completed_at, opened_at");
    const byEntry: Record<string, { opens: number; completes: number; bookmarks: number }> = {};
    for (const row of engagement || []) {
      const bucket = (byEntry[row.entry_id] = byEntry[row.entry_id] || { opens: 0, completes: 0, bookmarks: 0 });
      if (row.opened_at) bucket.opens += 1;
      if (row.completed_at) bucket.completes += 1;
      if (row.bookmarked) bucket.bookmarks += 1;
    }
    return NextResponse.json({ byDate, byEntry });
  }

  const [{ data: entries }, { data: settings }, queue] = await Promise.all([
    admin.from("verse_of_the_day_entries").select("*").order("scheduled_date", { ascending: true, nullsFirst: false }),
    admin.from("verse_of_the_day_settings").select("*").eq("id", 1).maybeSingle(),
    computeQueueHealth(admin),
  ]);
  return NextResponse.json({ entries: entries || [], settings: settings || null, queue });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { admin } = auth;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad JSON." }, { status: 400 });
  }
  const action = String(body.action || "");
  const now = new Date().toISOString();

  try {
    if (action === "create" || action === "update") {
      const entry = (body.entry || {}) as Record<string, unknown>;
      const row: Record<string, unknown> = {
        reference: entry.reference,
        book: entry.book,
        chapter: entry.chapter,
        verse_start: entry.verse_start,
        verse_end: entry.verse_end ?? null,
        translation: entry.translation || "KJV",
        verse_text: entry.verse_text,
        scheduled_date: entry.scheduled_date || null,
        background_theme: entry.background_theme || null,
        title: entry.title,
        author_section: entry.author_section,
        context_section: entry.context_section,
        meaning_section: entry.meaning_section,
        application_section: entry.application_section,
        takeaway: entry.takeaway,
        reflection_question: entry.reflection_question,
        prayer: entry.prayer || null,
        status: entry.status || "draft",
        updated_at: now,
        edited_by: ADMIN_EMAIL,
      };
      if (action === "create") {
        const { data, error } = await admin.from("verse_of_the_day_entries").insert(row).select("id").single();
        if (error) throw error;
        return NextResponse.json({ ok: true, id: data.id });
      }
      const { error } = await admin.from("verse_of_the_day_entries").update(row).eq("id", body.id);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action === "set_status") {
      const status = String(body.status || "");
      if (!["draft", "ready_for_review", "approved", "archived"].includes(status)) {
        return NextResponse.json({ error: "Bad status." }, { status: 400 });
      }
      const patch: Record<string, unknown> = { status, updated_at: now, edited_by: ADMIN_EMAIL };
      if (status === "approved") patch.published_at = now;
      const { error } = await admin.from("verse_of_the_day_entries").update(patch).eq("id", body.id);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action === "reschedule") {
      const { error } = await admin
        .from("verse_of_the_day_entries")
        .update({ scheduled_date: body.scheduled_date || null, updated_at: now, edited_by: ADMIN_EMAIL })
        .eq("id", body.id);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action === "set_background") {
      const { error } = await admin
        .from("verse_of_the_day_entries")
        .update({ background_theme: body.background_theme || null, updated_at: now, edited_by: ADMIN_EMAIL })
        .eq("id", body.id);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action === "swap_dates") {
      // Reorder = swap two entries' scheduled dates atomically enough for a
      // one-admin system: clear one, move the other, restore.
      const { data: a } = await admin.from("verse_of_the_day_entries").select("id, scheduled_date").eq("id", body.idA).single();
      const { data: b } = await admin.from("verse_of_the_day_entries").select("id, scheduled_date").eq("id", body.idB).single();
      if (!a || !b) return NextResponse.json({ error: "Entry not found." }, { status: 404 });
      await admin.from("verse_of_the_day_entries").update({ scheduled_date: null }).eq("id", a.id);
      await admin.from("verse_of_the_day_entries").update({ scheduled_date: a.scheduled_date, updated_at: now }).eq("id", b.id);
      await admin.from("verse_of_the_day_entries").update({ scheduled_date: b.scheduled_date, updated_at: now }).eq("id", a.id);
      return NextResponse.json({ ok: true });
    }

    if (action === "save_settings") {
      const { error } = await admin
        .from("verse_of_the_day_settings")
        .update({
          repeat_after_days: Number(body.repeat_after_days) || 180,
          target_days_ahead: Number(body.target_days_ahead) || 30,
          updated_at: now,
        })
        .eq("id", 1);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action === "delete") {
      const { error } = await admin.from("verse_of_the_day_entries").delete().eq("id", body.id);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || "Failed." }, { status: 500 });
  }
}
