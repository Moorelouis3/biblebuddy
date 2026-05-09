import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "@/lib/actionTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DevotionalRow = {
  title: string;
};

type DevotionalDayRow = {
  day_number: number;
  bible_reading_book: string | null;
  bible_reading_chapter: number | null;
};

function normalizeBookKey(book: string) {
  return book.toLowerCase().trim();
}

function buildChapterLabel(book: string, chapter: number) {
  return `${book} ${chapter}`;
}

function uniqueChapterRows(days: DevotionalDayRow[]) {
  const seen = new Set<string>();
  const chapters: Array<{ book: string; chapter: number; label: string }> = [];

  for (const day of days) {
    const book = (day.bible_reading_book || "").trim();
    const chapter = Number(day.bible_reading_chapter);
    if (!book || !Number.isFinite(chapter)) continue;

    const key = `${normalizeBookKey(book)}:${chapter}`;
    if (seen.has(key)) continue;
    seen.add(key);
    chapters.push({ book, chapter, label: buildChapterLabel(book, chapter) });
  }

  return chapters;
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabaseAuth = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const devotionalId = typeof body?.devotionalId === "string" ? body.devotionalId.trim() : "";

  if (!devotionalId) {
    return NextResponse.json({ error: "Missing devotional id." }, { status: 400 });
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const [{ data: devotionalData, error: devotionalError }, { data: dayData, error: daysError }] = await Promise.all([
    supabaseAdmin.from("devotionals").select("title").eq("id", devotionalId).maybeSingle(),
    supabaseAdmin
      .from("devotional_days")
      .select("day_number, bible_reading_book, bible_reading_chapter")
      .eq("devotional_id", devotionalId)
      .order("day_number", { ascending: true }),
  ]);

  if (devotionalError) {
    return NextResponse.json({ error: devotionalError.message }, { status: 500 });
  }

  if (daysError) {
    return NextResponse.json({ error: daysError.message }, { status: 500 });
  }

  if (!devotionalData) {
    return NextResponse.json({ error: "Bible Study not found." }, { status: 404 });
  }

  const userId = userData.user.id;
  const devotionalTitle = ((devotionalData as DevotionalRow).title || "").trim();
  const days = ((dayData || []) as DevotionalDayRow[]).filter((day) => Number.isFinite(day.day_number));
  const chapters = uniqueChapterRows(days);

  const resetResults = await Promise.all([
    supabaseAdmin.from("devotional_progress").delete().eq("user_id", userId).eq("devotional_id", devotionalId),
    ...days.map((day) =>
      supabaseAdmin
        .from("master_actions")
        .delete()
        .eq("user_id", userId)
        .in("action_type", [
          ACTION_TYPE.devotional_day_opened,
          ACTION_TYPE.devotional_bible_reading_opened,
          ACTION_TYPE.devotional_reflection_saved,
          ACTION_TYPE.devotional_day_completed,
          ACTION_TYPE.devotional_day_started,
          ACTION_TYPE.devotional_day_viewed,
        ])
        .ilike("action_label", `${devotionalTitle} - Day ${day.day_number}%`),
    ),
    ...chapters.map((chapter) =>
      supabaseAdmin
        .from("completed_chapters")
        .delete()
        .eq("user_id", userId)
        .eq("book", normalizeBookKey(chapter.book))
        .eq("chapter", chapter.chapter),
    ),
    ...chapters.map((chapter) =>
      supabaseAdmin
        .from("master_actions")
        .delete()
        .eq("user_id", userId)
        .in("action_type", [
          ACTION_TYPE.chapter_completed,
          ACTION_TYPE.bible_chapter_viewed,
          ACTION_TYPE.chapter_notes_viewed,
          ACTION_TYPE.chapter_notes_reviewed,
          ACTION_TYPE.trivia_chapter_completed,
          ACTION_TYPE.trivia_question_answered,
          ACTION_TYPE.trivia_question_correct,
          ACTION_TYPE.trivia_started,
          ACTION_TYPE.scrambled_chapter_opened,
          ACTION_TYPE.scrambled_chapter_completed,
          ACTION_TYPE.scrambled_word_answered,
        ])
        .ilike("action_label", `${chapter.label}%`),
    ),
  ]);

  const resetError = resetResults.find((result) => result.error)?.error;
  if (resetError) {
    return NextResponse.json({ error: resetError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    title: devotionalTitle,
    resetDays: days.length,
    resetChapters: chapters.length,
  });
}
