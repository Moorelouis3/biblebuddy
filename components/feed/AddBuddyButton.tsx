"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

/**
 * "Add buddy", on the post itself.
 *
 * Louis, 2026-10-18: "add buddy as a friend on the community page."
 *
 * Until now the only way to add somebody was to open their profile, which
 * means the moment you want to - reading something they wrote that you liked -
 * is never the moment you can. A feed is where you meet people; the button
 * belongs where you meet them.
 *
 * It sends the same row the profile page sends, into buddy_requests, with the
 * same buddy_request notification. Accepting is deliberately NOT duplicated
 * here: the profile's accept does more than flip a status - a conversation is
 * created, activity is logged - so a received request links there instead of
 * growing a second copy of that flow to keep in step.
 */

export type BuddyState = "none" | "buddies" | "pending_sent" | "pending_received";

export default function AddBuddyButton({ targetUserId, targetName, myId, myName, state, onRequested }: {
  targetUserId: string;
  targetName: string;
  myId: string;
  myName: string;
  state: BuddyState;
  /** So the feed remembers, and every other post by the same person updates too. */
  onRequested: (targetUserId: string) => void;
}) {
  const [busy, setBusy] = useState(false);

  // Your own post, or somebody you already have. Nothing to offer.
  if (!targetUserId || targetUserId === myId || state === "buddies") return null;

  if (state === "pending_sent") {
    return <span className="flex-shrink-0 text-xs font-bold text-gray-400">Requested</span>;
  }

  if (state === "pending_received") {
    return (
      <Link
        href={`/profile/${targetUserId}`}
        className="flex-shrink-0 rounded-full border border-[#cfe4d8] px-3 py-1 text-xs font-black transition hover:bg-[#f2faf6]"
        style={{ color: "#2f8f5b" }}
      >
        Accept
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          const { error } = await supabase
            .from("buddy_requests")
            .insert({ sender_id: myId, receiver_id: targetUserId });
          if (error) {
            setBusy(false);
            return;
          }
          onRequested(targetUserId);
          await supabase.from("notifications").insert({
            user_id: targetUserId,
            type: "buddy_request",
            from_user_id: myId,
            from_user_name: myName,
            article_slug: `/profile/${myId}`,
            message: `${myName} sent you a Buddy request!`,
          });
        } catch {
          // The request is either in or it is not; nothing here is worth
          // breaking the post card over.
        }
        setBusy(false);
      }}
      aria-label={`Add ${targetName} as a buddy`}
      className="flex flex-shrink-0 items-center gap-1 rounded-full border border-[#dbe7f4] px-3 py-1 text-xs font-black transition hover:bg-[#f2f7fd] disabled:opacity-50"
      // Inline, because globals.css carries unlayered colour rules that
      // outrank a utility class - see components/home/BibleLockBanner.
      style={{ color: "#2f7fe8" }}
    >
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
      Add
    </button>
  );
}
