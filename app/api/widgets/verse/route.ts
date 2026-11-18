import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getVerseOfTheDay } from "@/lib/verseOfTheDay";

/**
 * Today's Verse of the Day for the iOS home-screen widget (2026-11-18).
 *
 * The widget runs outside the app with no sign-in, and anonymous database
 * reads were closed on 9 Nov 2026, so it asks here. Public on purpose: the
 * verse of the day is already public on the site.
 *
 *   GET /api/widgets/verse?date=YYYY-MM-DD   (the phone's local day)
 *
 * Only an APPROVED entry is ever returned - the queue holds drafts for days
 * ahead. With none for that day it answers with the same fallback pool the
 * home card uses, so the widget never shows an empty box.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("date") || "";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : new Date().toISOString().slice(0, 10);

  let body: { reference: string; text: string; translation: string; date: string } | null = null;
  try {
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data } = await admin
      .from("verse_of_the_day_entries")
      .select("reference, verse_text, translation, scheduled_date")
      .eq("scheduled_date", date)
      .eq("status", "approved")
      .maybeSingle();
    if (data?.verse_text) {
      body = {
        reference: String(data.reference),
        text: String(data.verse_text),
        translation: String(data.translation || "KJV"),
        date: String(data.scheduled_date),
      };
    }
  } catch {
    /* Fall through to the pool. */
  }

  if (!body) {
    const legacy = getVerseOfTheDay(new Date(`${date}T12:00:00Z`));
    body = { reference: legacy.reference, text: legacy.text, translation: "KJV", date };
  }

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
  });
}
