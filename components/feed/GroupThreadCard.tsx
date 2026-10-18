"use client";

import Link from "next/link";
import { BIBLE_STUDY_GROUP_ID } from "@/lib/bibleStudiesCatalog";

/**
 * A group thread, sitting in the feed beside everybody's posts.
 *
 * Louis, 2026-10-18: "all the stuff in there sits on the feed... and then it
 * just be BB posting like a regular post mixed with others' posts and actions,
 * and we select what each person sees."
 *
 * So it looks like a post and ranks like a post. It is not one: a group
 * thread's likes live in group_post_likes and its replies are rows with
 * parent_post_id, so the feed's own like and comment buttons would write to
 * the wrong tables. Tapping it opens the thread, where those already work.
 *
 * That is also the honest design rather than a limitation - a thread is a
 * conversation, and the place to answer one is inside it.
 */

type Props = {
  post: {
    id: string;
    content: string;
    display_name: string | null;
    profile_image_url: string | null;
    media_url: string | null;
    created_at: string;
    reaction_counts: Record<string, number>;
  };
};

/** The group composer stores HTML; the feed shows a plain preview of it. */
function plain(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function timeAgo(iso: string): string {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins}m`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.round(hours / 24)}d`;
}

export default function GroupThreadCard({ post }: Props) {
  const body = plain(post.content);
  if (!body) return null;
  const likes = post.reaction_counts?.love ?? 0;

  return (
    <Link
      href={`/study-groups/${BIBLE_STUDY_GROUP_ID}/chat`}
      className="block rounded-xl border border-[#ddd6f3] bg-[#faf8ff] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          aria-hidden
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ece6ff] text-sm"
        >
          👥
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-black text-[#2b2150]">
            {post.display_name || "Bible Buddy"}
          </p>
          <p className="text-[11px] font-bold text-[#6a5aa8]">
            In the group · {timeAgo(post.created_at)}
          </p>
        </div>
      </div>

      <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-snug text-[#2b2150]">{body}</p>

      {post.media_url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={post.media_url} alt="" loading="lazy" className="mt-2 max-h-64 w-full rounded-lg object-cover" />
      ) : null}

      <p className="mt-2 text-xs font-bold text-[#6a5aa8]">
        {likes > 0 ? `${likes} ${likes === 1 ? "like" : "likes"} · ` : ""}
        Open the discussion →
      </p>
    </Link>
  );
}
