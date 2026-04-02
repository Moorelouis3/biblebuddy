import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getScrambledChapter } from "@/lib/scrambledGameData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BuddyRoundEntry = {
  user_id: string;
  display_name: string;
  username: string | null;
  profile_image_url: string | null;
  score: number;
  total: number;
  completed_at: string | null;
};

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
  const chapterNumber = Number(request.nextUrl.searchParams.get("chapter"));
  const chapter = getScrambledChapter(bookSlug, chapterNumber);

  if (!chapter) {
    return NextResponse.json({ error: "Scrambled chapter not found." }, { status: 404 });
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

  const currentUserId = userData.user.id;
  const { data: buddyRows, error: buddiesError } = await supabaseAdmin
    .from("buddies")
    .select("user_id_1, user_id_2")
    .or(`user_id_1.eq.${currentUserId},user_id_2.eq.${currentUserId}`);

  if (buddiesError) {
    return NextResponse.json({ error: buddiesError.message || "Could not load buddies." }, { status: 500 });
  }

  const buddyIds = Array.from(
    new Set(
      (buddyRows || [])
        .map((row) => (row.user_id_1 === currentUserId ? row.user_id_2 : row.user_id_1))
        .filter(Boolean),
    ),
  );

  if (buddyIds.length === 0) {
    return NextResponse.json({ ok: true, buddies: [] satisfies BuddyRoundEntry[] });
  }

  const { data: actionRows, error: actionsError } = await supabaseAdmin
    .from("master_actions")
    .select("user_id, action_label, created_at")
    .eq("action_type", "scrambled_word_answered")
    .in("user_id", buddyIds)
    .ilike("action_label", `${bookSlug === "genesis" ? "Genesis" : chapter.title.split(" ")[0]} ${chapter.chapter} - %`)
    .order("created_at", { ascending: false });

  if (actionsError) {
    return NextResponse.json({ error: actionsError.message || "Could not load buddy chapter progress." }, { status: 500 });
  }

  const byUser = new Map<string, { solvedIds: Set<string>; completedAt: string | null }>();
  const bookName = chapter.title.split(" ")[0];

  for (const row of actionRows || []) {
    const questionId = parseQuestionId(row.action_label || "", bookName, chapter.chapter);
    if (!questionId) continue;

    const entry = byUser.get(row.user_id) || { solvedIds: new Set<string>(), completedAt: null };
    entry.solvedIds.add(questionId);

    if (!entry.completedAt) {
      entry.completedAt = row.created_at;
    }

    byUser.set(row.user_id, entry);
  }

  const completedBuddyIds = Array.from(byUser.entries())
    .filter(([, value]) => value.solvedIds.size >= chapter.questions.length)
    .map(([userId]) => userId);

  if (completedBuddyIds.length === 0) {
    return NextResponse.json({ ok: true, buddies: [] satisfies BuddyRoundEntry[] });
  }

  const { data: profileRows, error: profileError } = await supabaseAdmin
    .from("profile_stats")
    .select("user_id, display_name, username, profile_image_url")
    .in("user_id", completedBuddyIds);

  if (profileError) {
    return NextResponse.json({ error: profileError.message || "Could not load buddy profiles." }, { status: 500 });
  }

  const profileMap = new Map((profileRows || []).map((row) => [row.user_id, row]));

  const buddies: BuddyRoundEntry[] = completedBuddyIds
    .map((userId) => {
      const profile = profileMap.get(userId);
      const progress = byUser.get(userId);
      const displayName =
        profile?.display_name?.trim() ||
        profile?.username?.trim() ||
        "Buddy";

      return {
        user_id: userId,
        display_name: displayName,
        username: profile?.username ?? null,
        profile_image_url: profile?.profile_image_url ?? null,
        score: chapter.questions.length,
        total: chapter.questions.length,
        completed_at: progress?.completedAt ?? null,
      };
    })
    .sort((left, right) => {
      const leftTime = left.completed_at ? new Date(left.completed_at).getTime() : 0;
      const rightTime = right.completed_at ? new Date(right.completed_at).getTime() : 0;
      return rightTime - leftTime;
    });

  return NextResponse.json({ ok: true, buddies });
}
