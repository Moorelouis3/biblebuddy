import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getScrambledBook,
  getScrambledProgressKey,
  type ScrambledProgressMap,
} from "@/lib/scrambledGameData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseQuestionId(actionLabel: string, bookName: string, chapterNumber: number) {
  const prefix = `${bookName} ${chapterNumber} - `;
  if (!actionLabel.startsWith(prefix)) return null;

  const rest = actionLabel.slice(prefix.length);
  const nextSeparator = rest.indexOf(" - ");
  if (nextSeparator === -1) return null;

  return rest.slice(0, nextSeparator).trim() || null;
}

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }

  const bookSlug = request.nextUrl.searchParams.get("book")?.trim().toLowerCase() || "";
  const book = getScrambledBook(bookSlug);

  if (!book) {
    return NextResponse.json({ error: "Scrambled book not found." }, { status: 404 });
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

  const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const [{ data: wordRows, error: wordsError }, { data: completionRows, error: completionError }] = await Promise.all([
    supabaseAdmin
      .from("master_actions")
      .select("action_label, created_at")
      .eq("user_id", userData.user.id)
      .eq("action_type", "scrambled_word_answered")
      .ilike("action_label", `${book.name} %`)
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("master_actions")
      .select("action_label, created_at")
      .eq("user_id", userData.user.id)
      .eq("action_type", "scrambled_chapter_completed")
      .ilike("action_label", `${book.name} %`)
      .order("created_at", { ascending: false }),
  ]);

  if (wordsError || completionError) {
    return NextResponse.json({ error: wordsError?.message || completionError?.message || "Could not load scrambled progress." }, { status: 500 });
  }

  const progress: ScrambledProgressMap = {};

  for (const chapter of book.chapters) {
    const solvedIds = new Set<string>();
    let lastPlayedAt: string | null = null;

    for (const row of wordRows || []) {
      const actionLabel = typeof row.action_label === "string" ? row.action_label : "";
      const questionId = parseQuestionId(actionLabel, book.name, chapter.chapter);
      if (!questionId) continue;

      if (!lastPlayedAt) {
        lastPlayedAt = row.created_at;
      }

      solvedIds.add(questionId);
    }

    const hasCompletedChapterAction = (completionRows || []).some((row) => {
      const actionLabel = typeof row.action_label === "string" ? row.action_label : "";
      return actionLabel.startsWith(`${book.name} ${chapter.chapter} - `);
    });

    const completionRow = (completionRows || []).find((row) => {
      const actionLabel = typeof row.action_label === "string" ? row.action_label : "";
      return actionLabel.startsWith(`${book.name} ${chapter.chapter} - `);
    });

    if ((!lastPlayedAt || (completionRow?.created_at && new Date(completionRow.created_at).getTime() > new Date(lastPlayedAt).getTime()))) {
      lastPlayedAt = completionRow?.created_at ?? lastPlayedAt;
    }

    const bestScore = hasCompletedChapterAction ? chapter.questions.length : Math.min(solvedIds.size, chapter.questions.length);
    progress[getScrambledProgressKey(book.slug, chapter.chapter)] = {
      completed: hasCompletedChapterAction || bestScore >= chapter.questions.length,
      bestScore,
      lastPlayedAt: lastPlayedAt || "",
    };
  }

  return NextResponse.json({
    ok: true,
    progress,
  });
}
