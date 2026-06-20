import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GENESIS_BIBLE_IN_ONE_YEAR_SERIES } from "@/lib/bibleInOneYearPlan";

type ProgressRow = {
  day_number: number;
  reading_completed: boolean | null;
  study_notes_completed?: boolean | null;
  trivia_completed: boolean | null;
  reflection_completed: boolean | null;
  created_at?: string | null;
};

function isLegacyComplete(row?: ProgressRow | null) {
  return Boolean(row?.reading_completed);
}

function getCompletedBibleChapterKey(book: string, chapter: number) {
  return `${book.trim().toLowerCase()}:${chapter}`;
}

function getBibleYearReflectionSlug(day: (typeof GENESIS_BIBLE_IN_ONE_YEAR_SERIES)[number]) {
  return `bible-in-one-year-day-${day.dayNumber}-${day.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function isMissingStudyNotesCompletedColumn(error: { message?: string | null; details?: string | null; hint?: string | null } | null | undefined) {
  const text = `${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`.toLowerCase();
  return text.includes("study_notes_completed");
}

export async function GET(request: NextRequest) {
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

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    let progressRows: ProgressRow[] = [];
    let supportsStudyNotesCompleted = true;

    const primary = await admin
      .from("bible_year_day_progress")
      .select("day_number, reading_completed, study_notes_completed, trivia_completed, reflection_completed, created_at")
      .eq("user_id", userData.user.id)
      .order("day_number", { ascending: true });

    if (primary.error && isMissingStudyNotesCompletedColumn(primary.error)) {
      supportsStudyNotesCompleted = false;
      const fallback = await admin
        .from("bible_year_day_progress")
        .select("day_number, reading_completed, trivia_completed, reflection_completed, created_at")
        .eq("user_id", userData.user.id)
        .order("day_number", { ascending: true });
      if (fallback.error) throw fallback.error;
      progressRows = ((fallback.data || []) as Array<Omit<ProgressRow, "study_notes_completed">>)
        .map((row) => ({ ...row, study_notes_completed: false }))
        .filter((row) => Number.isFinite(row.day_number));
    } else {
      if (primary.error) throw primary.error;
      progressRows = ((primary.data || []) as ProgressRow[]).filter((row) => Number.isFinite(row.day_number));
    }

    const progressRowByDay = new Map(progressRows.map((row) => [Number(row.day_number), row]));
    const legacyCompletedDays = new Set(
      progressRows.filter((row) => isLegacyComplete(row)).map((row) => Number(row.day_number)),
    );
    const legacyCurrentActiveDay =
      GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => !legacyCompletedDays.has(day.dayNumber))?.dayNumber ||
      ((GENESIS_BIBLE_IN_ONE_YEAR_SERIES[GENESIS_BIBLE_IN_ONE_YEAR_SERIES.length - 1]?.dayNumber || 0) + 1);

    const grandfatheredRows = GENESIS_BIBLE_IN_ONE_YEAR_SERIES
      .filter((day) => day.dayNumber < legacyCurrentActiveDay)
      .map((day) => progressRowByDay.get(day.dayNumber))
      .filter((row): row is ProgressRow => Boolean(row) && isLegacyComplete(row))
      .filter((row) => !(row.reading_completed && row.study_notes_completed && row.trivia_completed && row.reflection_completed));

    if (grandfatheredRows.length) {
      const grandfatherPayload = grandfatheredRows.map((row) => ({
        user_id: userData.user.id,
        day_number: Number(row.day_number),
        reading_completed: true,
        trivia_completed: true,
        reflection_completed: true,
        ...(supportsStudyNotesCompleted ? { study_notes_completed: true } : {}),
      }));
      const { error } = await admin.from("bible_year_day_progress").upsert(grandfatherPayload, { onConflict: "user_id,day_number" });
      if (!error) {
        grandfatherPayload.forEach((row) => {
          progressRowByDay.set(row.day_number, {
            day_number: row.day_number,
            reading_completed: true,
            study_notes_completed: true,
            trivia_completed: true,
            reflection_completed: true,
            created_at: progressRowByDay.get(row.day_number)?.created_at || null,
          });
        });
      }
    }

    const [completedChapterRows, actionRows, discussionRows] = await Promise.all([
      admin.from("completed_chapters").select("book, chapter").eq("user_id", userData.user.id),
      admin
        .from("master_actions")
        .select("action_type, action_label")
        .eq("user_id", userData.user.id)
        .in("action_type", [
          "bible_in_one_year_reading_completed",
          "bible_in_one_year_trivia_completed",
          "bible_in_one_year_reflection_completed",
          "bible_year_task_started",
          "bible_in_one_year_day_viewed",
        ])
        .like("action_label", "Bible in One Year Day %"),
      admin
        .from("article_comments")
        .select("article_slug")
        .eq("user_id", userData.user.id)
        .eq("is_deleted", false)
        .in("article_slug", GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((day) => getBibleYearReflectionSlug(day))),
    ]);

    const completedChapterKeys = new Set(
      ((completedChapterRows.data || []) as Array<{ book: string | null; chapter: number | null }>)
        .filter((row) => typeof row.book === "string" && Number.isFinite(row.chapter))
        .map((row) => getCompletedBibleChapterKey(String(row.book), Number(row.chapter))),
    );

    const readingActionDays = new Set<number>();
    ((actionRows.data || []) as Array<{ action_label?: string | null }>).forEach((row) => {
      const match = (row.action_label || "").match(/^Bible in One Year Day (\d+) (Reading|Video):/);
      if (!match) return;
      const dayNumber = Number(match[1]);
      if (Number.isFinite(dayNumber)) readingActionDays.add(dayNumber);
    });

    const restoredLegacyDayNumbers: number[] = [];
    for (const day of GENESIS_BIBLE_IN_ONE_YEAR_SERIES) {
      const existingRow = progressRowByDay.get(day.dayNumber);
      const restoredByRow = existingRow?.reading_completed === true;
      const restoredByAction = readingActionDays.has(day.dayNumber);
      const restoredByChapters =
        day.readings.length > 0 &&
        day.readings.every((reading) => completedChapterKeys.has(getCompletedBibleChapterKey(reading.book, reading.chapter)));
      if (!restoredByRow && !restoredByAction && !restoredByChapters) break;
      restoredLegacyDayNumbers.push(day.dayNumber);
    }

    const restoredLegacyPayload = restoredLegacyDayNumbers
      .map((dayNumber) => {
        const row = progressRowByDay.get(dayNumber);
        const alreadyGrandfathered =
          row?.reading_completed === true &&
          row?.study_notes_completed === true &&
          row?.trivia_completed === true &&
          row?.reflection_completed === true;
        if (alreadyGrandfathered) return null;
        return {
          user_id: userData.user.id,
          day_number: dayNumber,
          reading_completed: true,
          trivia_completed: true,
          reflection_completed: true,
          ...(supportsStudyNotesCompleted ? { study_notes_completed: true } : {}),
        };
      })
      .filter(Boolean) as Array<{ user_id: string; day_number: number; reading_completed: true; trivia_completed: true; reflection_completed: true; study_notes_completed?: true }>;

    if (restoredLegacyPayload.length) {
      const { error } = await admin.from("bible_year_day_progress").upsert(restoredLegacyPayload, { onConflict: "user_id,day_number" });
      if (!error) {
        restoredLegacyPayload.forEach((row) => {
          progressRowByDay.set(row.day_number, {
            day_number: row.day_number,
            reading_completed: true,
            study_notes_completed: true,
            trivia_completed: true,
            reflection_completed: true,
            created_at: progressRowByDay.get(row.day_number)?.created_at || null,
          });
        });
      }
    }

    const completedCardsByDay: Record<number, { reading?: boolean; study_notes?: boolean; trivia?: boolean; reflection?: boolean }> = {};
    const notesViewedByDay: Record<number, boolean> = {};

    Array.from(progressRowByDay.values()).forEach((row) => {
      completedCardsByDay[row.day_number] = {
        reading: row.reading_completed === true,
        study_notes: row.study_notes_completed === true,
        trivia: row.trivia_completed === true,
        reflection: row.reflection_completed === true,
      };
      if (row.study_notes_completed === true) {
        notesViewedByDay[row.day_number] = true;
      }
    });

    const cardLabelToKey: Record<string, "reading" | "trivia" | "reflection"> = {
      Reading: "reading",
      Video: "reading",
      Trivia: "trivia",
      Reflection: "reflection",
      Summary: "reflection",
    };

    ((actionRows.data || []) as Array<{ action_label?: string | null }>).forEach((row) => {
      const match = (row.action_label || "").match(/^Bible in One Year Day (\d+) (Reading|Video|Trivia|Reflection|Summary):/);
      if (!match) return;
      const dayNumber = Number(match[1]);
      const card = cardLabelToKey[match[2]];
      if (!Number.isFinite(dayNumber) || !card) return;
      completedCardsByDay[dayNumber] = {
        ...(completedCardsByDay[dayNumber] || {}),
        [card]: true,
      };
    });

    const reflectionPostedByDay: Record<number, boolean> = {};
    ((discussionRows.data || []) as Array<{ article_slug: string }>).forEach((row) => {
      const dayNumber = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => getBibleYearReflectionSlug(day) === row.article_slug)?.dayNumber;
      if (dayNumber) reflectionPostedByDay[dayNumber] = true;
    });

    const resolvedCurrentDayNumber =
      GENESIS_BIBLE_IN_ONE_YEAR_SERIES.find((day) => completedCardsByDay[day.dayNumber]?.reading !== true)?.dayNumber ||
      GENESIS_BIBLE_IN_ONE_YEAR_SERIES[GENESIS_BIBLE_IN_ONE_YEAR_SERIES.length - 1]?.dayNumber ||
      1;

    return NextResponse.json({
      completedCardsByDay,
      notesViewedByDay,
      reflectionPostedByDay,
      resolvedCurrentDayNumber,
    });
  } catch (error) {
    console.error("[BIBLE_YEAR_PROGRESS_API] Failed to load progress:", error);
    return NextResponse.json({ error: "Could not load Bible in One Year progress." }, { status: 500 });
  }
}
