import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ACTION_TYPE } from "@/lib/actionTypes";

const CHAPTER_JOURNEY_TASK_TOTAL = 6;
const CHAPTER_JOURNEY_TITLES = new Set([
  "The Obedience of Abraham",
  "The Testing of Joseph",
  "The Wisdom of Proverbs",
]);

type DevotionalRow = {
  id: string;
  title: string;
  total_days: number;
};

type DayRow = {
  devotional_id: string;
  day_number: number;
  bible_reading_book: string | null;
  bible_reading_chapter: number | null;
};

type ProgressScore = {
  userId: string;
  completedTasks: number;
  completedChapters: number;
  totalChapters: number;
};

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Server not configured.");
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function chapterSlug(book: string, chapter: number) {
  return `bible-chapter-${book.toLowerCase().replace(/\s+/g, "-")}-${chapter}`;
}

function notesActionLabel(book: string, chapter: number) {
  return `${book} ${chapter} Review Opened`;
}

function displayName(profile: any) {
  return profile?.display_name || profile?.username || "Bible Buddy";
}

function completionLabel(score: ProgressScore) {
  if (score.completedChapters >= score.totalChapters) return `Completed all ${score.totalChapters} chapters`;
  if (score.completedChapters > 0) return `${score.completedChapters}/${score.totalChapters} chapters complete`;
  return `${score.completedTasks} task${score.completedTasks === 1 ? "" : "s"} started`;
}

export async function GET(request: NextRequest) {
  try {
    const admin = getAdminClient();
    const idsParam = request.nextUrl.searchParams.get("ids") || "";
    const selectedId = request.nextUrl.searchParams.get("devotionalId") || "";
    const page = Math.max(0, Number(request.nextUrl.searchParams.get("page") || 0));
    const pageSize = Math.min(Math.max(5, Number(request.nextUrl.searchParams.get("pageSize") || 10)), 25);
    const requestedIds = [...new Set(idsParam.split(",").map((id) => id.trim()).filter(Boolean))];
    const devotionalIds = selectedId ? [selectedId] : requestedIds;

    if (devotionalIds.length === 0) {
      return NextResponse.json({ summaries: {}, selected: null });
    }

    const [{ data: devotionals }, { data: days }] = await Promise.all([
      admin
        .from("devotionals")
        .select("id, title, total_days")
        .in("id", devotionalIds),
      admin
        .from("devotional_days")
        .select("devotional_id, day_number, bible_reading_book, bible_reading_chapter")
        .in("devotional_id", devotionalIds),
    ]);

    const devotionalRows = (devotionals || []) as DevotionalRow[];
    const dayRows = (days || []) as DayRow[];
    const devotionalMap = new Map(devotionalRows.map((devotional) => [devotional.id, devotional]));
    const daysByDevotional = new Map<string, DayRow[]>();

    dayRows.forEach((day) => {
      const next = daysByDevotional.get(day.devotional_id) || [];
      next.push(day);
      daysByDevotional.set(day.devotional_id, next);
    });

    const chapterDays = dayRows.filter((day) => {
      const devotional = devotionalMap.get(day.devotional_id);
      return devotional && CHAPTER_JOURNEY_TITLES.has(devotional.title) && day.bible_reading_book && day.bible_reading_chapter;
    });
    const chapterLabels = chapterDays.map((day) => `${day.bible_reading_book} ${day.bible_reading_chapter}`);
    const noteLabels = chapterDays.map((day) => notesActionLabel(day.bible_reading_book || "", Number(day.bible_reading_chapter)));
    const chapterSlugs = chapterDays.map((day) => chapterSlug(day.bible_reading_book || "", Number(day.bible_reading_chapter)));
    const dayByNoteLabel = new Map(noteLabels.map((label, index) => [label, chapterDays[index]]));
    const dayBySlug = new Map(chapterSlugs.map((slug, index) => [slug, chapterDays[index]]));

    const [progressRes, notesRes, triviaRes, scrambledRes, reflectionRes] = await Promise.all([
      admin
        .from("devotional_progress")
        .select("user_id, devotional_id, day_number, is_completed, reading_completed")
        .in("devotional_id", devotionalIds)
        .limit(20000),
      noteLabels.length
        ? admin
            .from("master_actions")
            .select("user_id, action_label")
            .in("action_type", [ACTION_TYPE.chapter_notes_reviewed, ACTION_TYPE.chapter_notes_viewed])
            .in("action_label", noteLabels)
            .limit(20000)
        : Promise.resolve({ data: [] as any[] }),
      chapterLabels.length
        ? admin
            .from("master_actions")
            .select("user_id, action_label")
            .eq("action_type", ACTION_TYPE.trivia_chapter_completed)
            .limit(20000)
        : Promise.resolve({ data: [] as any[] }),
      chapterLabels.length
        ? admin
            .from("master_actions")
            .select("user_id, action_label")
            .eq("action_type", ACTION_TYPE.scrambled_chapter_completed)
            .limit(20000)
        : Promise.resolve({ data: [] as any[] }),
      chapterSlugs.length
        ? admin
            .from("article_comments")
            .select("user_id, article_slug")
            .eq("is_deleted", false)
            .in("article_slug", chapterSlugs)
            .limit(20000)
        : Promise.resolve({ data: [] as any[] }),
    ]);

    const taskKeysByUserStudy = new Map<string, Set<string>>();

    function addTask(userId: string | null | undefined, devotionalId: string | null | undefined, dayNumber: number, task: string) {
      if (!userId || !devotionalId || !dayNumber) return;
      const key = `${userId}:${devotionalId}`;
      const tasks = taskKeysByUserStudy.get(key) || new Set<string>();
      tasks.add(`${dayNumber}:${task}`);
      taskKeysByUserStudy.set(key, tasks);
    }

    (progressRes.data || []).forEach((row: any) => {
      if (row.is_completed === true) addTask(row.user_id, row.devotional_id, row.day_number, "intro");
      if (row.reading_completed === true) addTask(row.user_id, row.devotional_id, row.day_number, "reading");
    });

    (notesRes.data || []).forEach((row: any) => {
      const day = dayByNoteLabel.get(row.action_label);
      addTask(row.user_id, day?.devotional_id, day?.day_number || 0, "notes");
    });

    const chapterDayMatchers = chapterDays.map((day) => ({
      day,
      label: `${day.bible_reading_book} ${day.bible_reading_chapter}`.toLowerCase(),
    }));

    (triviaRes.data || []).forEach((row: any) => {
      const actionLabel = String(row.action_label || "").toLowerCase();
      const match = chapterDayMatchers.find((item) => actionLabel.startsWith(item.label));
      addTask(row.user_id, match?.day.devotional_id, match?.day.day_number || 0, "trivia");
    });

    (scrambledRes.data || []).forEach((row: any) => {
      const actionLabel = String(row.action_label || "").toLowerCase();
      const match = chapterDayMatchers.find((item) => actionLabel.startsWith(item.label));
      addTask(row.user_id, match?.day.devotional_id, match?.day.day_number || 0, "scrambled");
    });

    (reflectionRes.data || []).forEach((row: any) => {
      const day = dayBySlug.get(row.article_slug);
      addTask(row.user_id, day?.devotional_id, day?.day_number || 0, "reflection");
    });

    const scoresByDevotional = new Map<string, ProgressScore[]>();

    taskKeysByUserStudy.forEach((tasks, key) => {
      const [userId, devotionalId] = key.split(":");
      const devotional = devotionalMap.get(devotionalId);
      if (!devotional || tasks.size === 0) return;

      const completedByDay = new Map<number, number>();
      tasks.forEach((taskKey) => {
        const dayNumber = Number(taskKey.split(":")[0]);
        completedByDay.set(dayNumber, (completedByDay.get(dayNumber) || 0) + 1);
      });

      const completedChapters = [...completedByDay.values()].filter((count) => {
        return CHAPTER_JOURNEY_TITLES.has(devotional.title)
          ? count >= CHAPTER_JOURNEY_TASK_TOTAL
          : count > 0;
      }).length;

      const score: ProgressScore = {
        userId,
        completedTasks: tasks.size,
        completedChapters,
        totalChapters: devotional.total_days,
      };
      const list = scoresByDevotional.get(devotionalId) || [];
      list.push(score);
      scoresByDevotional.set(devotionalId, list);
    });

    scoresByDevotional.forEach((scores) => {
      scores.sort((a, b) =>
        b.completedChapters - a.completedChapters ||
        b.completedTasks - a.completedTasks ||
        a.userId.localeCompare(b.userId),
      );
    });

    const userIds = [...new Set([...scoresByDevotional.values()].flat().map((score) => score.userId))];
    const { data: profiles } = userIds.length
      ? await admin
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url, current_level")
          .in("user_id", userIds)
      : { data: [] as any[] };
    const profileMap = new Map((profiles || []).map((profile: any) => [profile.user_id, profile]));

    function serializeScore(score: ProgressScore, rank: number) {
      const profile = profileMap.get(score.userId);
      return {
        rank,
        userId: score.userId,
        name: displayName(profile),
        image: profile?.profile_image_url || null,
        profileHref: `/profile/${score.userId}`,
        level: profile?.current_level ?? 1,
        completedTasks: score.completedTasks,
        completedChapters: score.completedChapters,
        totalChapters: score.totalChapters,
        percent: Math.round((score.completedChapters / Math.max(1, score.totalChapters)) * 100),
        label: completionLabel(score),
      };
    }

    const summaries = Object.fromEntries(
      devotionalRows.map((devotional) => {
        const scores = scoresByDevotional.get(devotional.id) || [];
        return [
          devotional.id,
          {
            total: scores.length,
            avatars: scores.slice(0, 5).map((score, index) => serializeScore(score, index + 1)),
          },
        ];
      }),
    );

    const selectedScores = selectedId ? scoresByDevotional.get(selectedId) || [] : [];
    const pageStart = page * pageSize;
    const selected = selectedId
      ? {
          devotionalId: selectedId,
          title: devotionalMap.get(selectedId)?.title || "Bible Study",
          total: selectedScores.length,
          page,
          pageSize,
          rows: selectedScores.slice(pageStart, pageStart + pageSize).map((score, index) => serializeScore(score, pageStart + index + 1)),
        }
      : null;

    return NextResponse.json({ summaries, selected });
  } catch (error) {
    console.error("[DEVOTIONAL_COMMUNITY_PROGRESS]", error);
    return NextResponse.json({ error: "Could not load Bible study community progress." }, { status: 500 });
  }
}
