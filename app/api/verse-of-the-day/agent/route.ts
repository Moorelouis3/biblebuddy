import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * The Verse of the Day Writer routine's door into the queue (2026-09-26).
 *
 * The cloud clone has no Supabase keys - the same constraint the Bug Fixer
 * works around - so the routine reads the queue and submits finished entries
 * through here. It can only touch verse_of_the_day_entries.
 *
 * GET  -> what to write next: the date, the rotating background, and every
 *         reference already used so the routine never repeats a verse.
 * POST -> one finished entry. The KJV text is fetched HERE from bible-api,
 *         never taken from the request, so Scripture cannot be mistyped or
 *         paraphrased by the writer.
 *
 * Auth: VERSE_AGENT_TOKEN if set, otherwise BUG_AGENT_TOKEN, which the
 * routine environment already carries. Set the dedicated one when convenient.
 *
 * scripts/verse-of-the-day-queue.mjs is the same queue for local use, where
 * the service key is available; the scheduling rules are deliberately
 * mirrored in both, so change them together.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TABLE = "verse_of_the_day_entries";
const TARGET_RUNWAY_DAYS = 90;
const BACKGROUND_ROTATION = ["purple-sunrise", "blue-sunrise", "green-mountains", "orange-night"];
const REQUIRED_FIELDS = [
  "reference",
  "book",
  "chapter",
  "verse_start",
  "title",
  "author_section",
  "context_section",
  "meaning_section",
  "application_section",
  "takeaway",
  "reflection_question",
  "prayer",
] as const;

function authorized(request: NextRequest) {
  const expected = process.env.VERSE_AGENT_TOKEN || process.env.BUG_AGENT_TOKEN || "";
  const given = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!expected || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Berlin calendar day, the boundary the app and the watchdog both use. */
function berlinDay(offsetDays = 0) {
  const at = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(at);
}

function addDays(isoDate: string, days: number) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

/** "Psalms 23:1" and "Psalm 23:1" are the same verse for duplicate checks. */
function referenceKey(reference: string) {
  return String(reference)
    .toLowerCase()
    .replace(/^psalms?\b/, "psalm")
    .replace(/\s+/g, " ")
    .replace(/[.,]/g, "")
    .trim();
}

type QueueRow = { scheduled_date: string; status: string; reference: string | null };

async function loadQueue(admin: ReturnType<typeof adminClient>) {
  const { data, error } = await admin.from(TABLE).select("scheduled_date, status, reference").order("scheduled_date");
  if (error) throw new Error(error.message);
  return (data || []) as QueueRow[];
}

function queueState(rows: QueueRow[]) {
  const today = berlinDay();
  const approved = new Set(rows.filter((r) => r.status === "approved").map((r) => r.scheduled_date));
  let runwayDays = 0;
  while (approved.has(addDays(today, runwayDays))) runwayDays += 1;
  let nextDate: string | null = null;
  for (let i = 0; i < 400 && !nextDate; i += 1) {
    const day = addDays(today, i);
    if (!approved.has(day)) nextDate = day;
  }
  return {
    today,
    runwayDays,
    lastCoveredDay: runwayDays ? addDays(today, runwayDays - 1) : null,
    targetRunwayDays: TARGET_RUNWAY_DAYS,
    shortBy: Math.max(0, TARGET_RUNWAY_DAYS - runwayDays),
    writeMore: runwayDays < TARGET_RUNWAY_DAYS,
    nextDate,
  };
}

async function fetchKjv(book: string, chapter: number, verseStart: number, verseEnd?: number | null) {
  const range = verseEnd ? `${verseStart}-${verseEnd}` : `${verseStart}`;
  const url = `https://bible-api.com/${encodeURIComponent(book)}+${chapter}:${range}?translation=kjv`;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const payload = (await res.json()) as { text?: string };
      const text = String(payload.text || "").replace(/\s+/g, " ").trim();
      if (text) return text;
      throw new Error(`bible-api returned no text for ${book} ${chapter}:${range}`);
    }
    if (res.status !== 429) throw new Error(`bible-api ${res.status} for ${book} ${chapter}:${range}`);
    await new Promise((r) => setTimeout(r, attempt * 1200));
  }
  throw new Error(`bible-api rate limited for ${book} ${chapter}:${range}`);
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const admin = adminClient();
    const rows = await loadQueue(admin);
    const state = queueState(rows);
    return NextResponse.json({
      ...state,
      backgroundTheme: BACKGROUND_ROTATION[rows.length % BACKGROUND_ROTATION.length],
      avoidReferences: rows.map((r) => r.reference).filter(Boolean),
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const entry = (await request.json()) as Record<string, unknown>;
    const missing = REQUIRED_FIELDS.filter((f) => entry[f] === undefined || entry[f] === null || entry[f] === "");
    if (missing.length) {
      return NextResponse.json({ error: `missing: ${missing.join(", ")}` }, { status: 400 });
    }

    const admin = adminClient();
    const rows = await loadQueue(admin);
    const state = queueState(rows);

    const reference = String(entry.reference);
    if (rows.some((r) => r.reference && referenceKey(r.reference) === referenceKey(reference))) {
      return NextResponse.json({ error: `${reference} has already been used - pick another verse` }, { status: 409 });
    }

    const scheduled = String(entry.scheduled_date || state.nextDate || "");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(scheduled)) {
      return NextResponse.json({ error: "scheduled_date must be YYYY-MM-DD" }, { status: 400 });
    }
    if (rows.some((r) => r.scheduled_date === scheduled && r.status === "approved")) {
      return NextResponse.json({ error: `${scheduled} already has an approved verse` }, { status: 409 });
    }

    const verseText = await fetchKjv(
      String(entry.book),
      Number(entry.chapter),
      Number(entry.verse_start),
      entry.verse_end ? Number(entry.verse_end) : null,
    );

    const row = {
      reference,
      book: String(entry.book),
      chapter: Number(entry.chapter),
      verse_start: Number(entry.verse_start),
      verse_end: entry.verse_end ? Number(entry.verse_end) : null,
      title: String(entry.title),
      author_section: String(entry.author_section),
      context_section: String(entry.context_section),
      meaning_section: String(entry.meaning_section),
      application_section: String(entry.application_section),
      takeaway: String(entry.takeaway),
      reflection_question: String(entry.reflection_question),
      prayer: String(entry.prayer),
      scheduled_date: scheduled,
      translation: "KJV",
      verse_text: verseText,
      status: "approved",
      background_theme:
        typeof entry.background_theme === "string" && entry.background_theme
          ? entry.background_theme
          : BACKGROUND_ROTATION[rows.length % BACKGROUND_ROTATION.length],
      edited_by: "verse-writer-routine",
      updated_at: new Date().toISOString(),
    };

    const { error } = await admin.from(TABLE).upsert(row, { onConflict: "scheduled_date" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const after = queueState([...rows, { scheduled_date: scheduled, status: "approved", reference }]);
    return NextResponse.json({
      saved: scheduled,
      reference,
      verse_text: verseText,
      runwayDays: after.runwayDays,
      writeMore: after.writeMore,
      nextDate: after.nextDate,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "failed" }, { status: 500 });
  }
}
