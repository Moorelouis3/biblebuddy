"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BIBLE_STUDY_GROUP_ID } from "@/lib/bibleStudiesCatalog";

/**
 * The group's current discussion, pinned to the top of the feed.
 *
 * Louis asked what the group is for once the feed took its place in the tab
 * bar, and the honest answer was that they are different things: the feed is
 * where somebody posts their own thing, the group is one shared room carrying
 * the daily prompt and the weekly trivia, poll and prayer threads. Two doors
 * to two rooms is how people end up ignoring one of them - so the room shows
 * through the feed rather than sitting behind a separate tab.
 *
 * It is a door, not a copy: the thread itself, with its replies and its
 * moderation, stays in the group page. This is the question and how many
 * people have answered it.
 *
 * Renders nothing when the group has nothing to show, which is the one thing
 * it must never get wrong - a permanent empty card at the top of the feed
 * would be worse than no card at all.
 */

type TodayPost = {
  id: string;
  content: string;
  display_name: string | null;
  created_at: string;
  replies: number;
};

/** Strip the HTML the group composer stores, for a one-line preview. */
function preview(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export default function TodayInTheGroup() {
  const [post, setPost] = useState<TodayPost | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        // The newest thing somebody started in the group. Not "today's" by
        // date: the group is quiet on some days, and a card that empties
        // itself overnight teaches people to stop looking at it.
        const { data: rows } = await supabase
          .from("group_posts")
          .select("id, content, display_name, created_at")
          .eq("group_id", BIBLE_STUDY_GROUP_ID)
          .is("parent_post_id", null)
          .order("created_at", { ascending: false })
          .limit(1);

        const latest = rows?.[0];
        if (!latest || cancelled) return;

        const { count } = await supabase
          .from("group_posts")
          .select("id", { count: "exact", head: true })
          .eq("parent_post_id", latest.id);

        if (cancelled) return;
        setPost({
          id: latest.id,
          content: preview(latest.content ?? ""),
          display_name: latest.display_name,
          created_at: latest.created_at,
          replies: count ?? 0,
        });
      } catch {
        // The feed is fine without it.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!post || !post.content) return null;

  return (
    <Link
      href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
      className="relative mb-3 block overflow-hidden rounded-2xl border border-[#ddd6f3] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "#f5f2ff",
        backgroundImage: "url(/home-cards/bg-group.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "left bottom",
      }}
    >
      <div className="relative z-10">
        <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#6a5aa8]">
          In the group now
        </p>
        <p className="mt-1 line-clamp-2 text-sm font-black leading-snug text-[#2b2150]">
          {post.content}
        </p>
        <p className="mt-1.5 text-xs font-bold text-[#6a5aa8]">
          {post.display_name ? `${post.display_name} · ` : ""}
          {post.replies === 0
            ? "No replies yet — be the first"
            : `${post.replies} ${post.replies === 1 ? "reply" : "replies"}`}
          {" · Join the discussion →"}
        </p>
      </div>
    </Link>
  );
}
