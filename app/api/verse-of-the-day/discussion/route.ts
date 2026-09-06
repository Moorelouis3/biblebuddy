import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { insertGroupPostWithRetry } from "@/lib/groupPostInsert";
import { resolveFounderId } from "@/lib/weeklyBibleReport";

// Verse of the Day discussion (2026-09-06): each day's verse gets ONE real
// group post - a breakdown of the verse ending in the reflection question -
// and the popup's comment section and the group thread are the same rows.
// Answer in the popup, it shows in the group; answer in the group, it shows
// in the popup. This route only ensures the day's post exists and returns
// its id; reading and writing comments happens through the normal
// group_posts path the chat already uses.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

function firstParagraph(text: string | null | undefined) {
  return (text || "").split(/\n\s*\n/).map((line) => line.trim()).filter(Boolean)[0] || "";
}

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(request: NextRequest) {
  const supabase = createAdminClient();
  if (!supabase) return NextResponse.json({ error: "Server not configured." }, { status: 500 });

  const date = (request.nextUrl.searchParams.get("date") || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }

  try {
    const { data: entry, error: entryError } = await supabase
      .from("verse_of_the_day_entries")
      .select("id, reference, translation, verse_text, takeaway, application_section, reflection_question, scheduled_date, group_post_id")
      .eq("scheduled_date", date)
      .maybeSingle();
    if (entryError) throw new Error(entryError.message);
    if (!entry) return NextResponse.json({ error: "No verse for this date." }, { status: 404 });

    const { data: groups, error: groupError } = await supabase
      .from("study_groups")
      .select("id, name, created_at")
      .in("name", ["Bible Buddy Study Group", "Hope Nation"])
      .order("created_at", { ascending: false });
    if (groupError) throw new Error(groupError.message);
    const group =
      groups?.find((row) => row.name === "Bible Buddy Study Group") ??
      groups?.find((row) => row.name === "Hope Nation") ??
      null;
    if (!group) return NextResponse.json({ error: "Study group not found." }, { status: 404 });

    if (entry.group_post_id) {
      return NextResponse.json({ postId: entry.group_post_id, groupId: group.id });
    }

    // Only materialize the post once the day has arrived (UTC date string
    // comparison matches how scheduled_date is stored).
    const todayKey = new Date().toISOString().slice(0, 10);
    if (entry.scheduled_date > todayKey) {
      return NextResponse.json({ error: "Not yet available." }, { status: 404 });
    }

    let louisId = await resolveFounderId(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      supabase,
    );
    if (!louisId) {
      // The account sits past the first listUsers page, so page for it.
      for (let page = 1; page <= 10 && !louisId; page += 1) {
        const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
        if (error) break;
        louisId = data.users.find((user) => user.email?.toLowerCase() === "moorelouis3@gmail.com")?.id ?? null;
        if (!data.users || data.users.length < 1000) break;
      }
    }
    if (!louisId) throw new Error("Louis account not found.");
    const { data: louisProfile } = await supabase
      .from("profile_stats")
      .select("display_name, username")
      .eq("user_id", louisId)
      .maybeSingle();
    const displayName = louisProfile?.display_name || louisProfile?.username || "Louis Moore";

    const application = firstParagraph(entry.application_section);
    const content =
      `<p>"${escapeHtml(entry.verse_text)}" - ${escapeHtml(entry.reference)} (${escapeHtml(entry.translation)})</p>` +
      (entry.takeaway ? `<p>✨ ${escapeHtml(entry.takeaway)}</p>` : "") +
      (application ? `<p>${escapeHtml(application)}</p>` : "") +
      `<p>💭 ${escapeHtml(entry.reflection_question)}</p>` +
      `<p>Drop your answer below 👇 Your reply also shows up on today's Verse of the Day.</p>`;

    const postId = await insertGroupPostWithRetry(
      supabase,
      {
        group_id: group.id,
        user_id: louisId,
        display_name: displayName,
        title: `📖 Verse of the Day - ${entry.reference}`,
        category: "general",
        content,
      },
      { skipInsertNotifications: true },
    );

    // Claim the link; if a concurrent request beat us, keep the winner and
    // remove our duplicate post.
    const { data: claimed, error: claimError } = await supabase
      .from("verse_of_the_day_entries")
      .update({ group_post_id: postId })
      .eq("id", entry.id)
      .is("group_post_id", null)
      .select("id")
      .maybeSingle();
    if (claimError) throw new Error(claimError.message);
    if (!claimed) {
      await supabase.from("group_posts").delete().eq("id", postId);
      const { data: winner } = await supabase
        .from("verse_of_the_day_entries")
        .select("group_post_id")
        .eq("id", entry.id)
        .maybeSingle();
      return NextResponse.json({ postId: winner?.group_post_id ?? postId, groupId: group.id });
    }

    return NextResponse.json({ postId, groupId: group.id, created: true });
  } catch (error) {
    console.error("[VOTD_DISCUSSION] Failed:", error);
    return NextResponse.json({ error: "Could not load the discussion." }, { status: 500 });
  }
}
