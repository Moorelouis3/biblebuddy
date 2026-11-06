"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

export type BuddyState =
  "none" | "buddies" | "pending_sent" | "pending_received";

export default function AddBuddyButton({
  targetUserId,
  targetName,
  myId,
  myName,
  state,
  onRequested,
  variant = "pill",
}: {
  targetUserId: string;
  targetName: string;
  myId: string;
  myName: string;
  state: BuddyState;
  /** So the feed remembers, and every other post by the same person updates too. */
  onRequested: (targetUserId: string) => void;
  /**
   * "pill" is the small control on a post card. "profile" is the member
   * profile's action row (2026-11-06): a full button beside Message, which
   * also has to say something in the states the pill stays silent in.
   */
  variant?: "pill" | "profile";
}) {
  const [busy, setBusy] = useState(false);
  /**
   * What the sender is told afterwards (Louis, 2026-10-18: "a pop up saying
   * your buddy request has been sent"). Sending used to be silent in both
   * directions - the button just went quiet - so nobody knew whether it had
   * worked, and a request that failed looked exactly like one that worked.
   */
  const [result, setResult] = useState<"sent" | "failed" | null>(null);

  useEffect(() => {
    if (result !== "sent") return;
    const timer = setTimeout(() => setResult(null), 4500);
    return () => clearTimeout(timer);
  }, [result]);

  useEffect(() => {
    if (!result) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setResult(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result]);

  const confirmation =
    result && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-4"
            onClick={() => setResult(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="buddy-request-sent-title"
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-xs rounded-t-3xl bg-white p-6 text-center shadow-2xl sm:rounded-3xl"
            >
              <div aria-hidden className="text-3xl">
                {result === "sent" ? "🤝" : "😕"}
              </div>
              <h2
                id="buddy-request-sent-title"
                className="mt-2 text-lg font-bold text-[#10213a]"
              >
                {result === "sent" ? "Buddy request sent" : "That did not send"}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#5b6c84]">
                {result === "sent"
                  ? `${targetName} will see it in their notifications. You will be buddies as soon as they accept.`
                  : `We could not send your request to ${targetName}. Have another go in a moment.`}
              </p>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="mt-4 w-full rounded-full bg-[#2f7fe8] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2566bd]"
              >
                Got it
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  const isProfile = variant === "profile";
  // The profile row's buttons share the row evenly; a post card's sit tight
  // against the author line. Same radii and type scale as the row's Message.
  const profileButton =
    "profile-skin-inner inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-4 py-1.5 text-sm font-medium transition hover:bg-gray-200 disabled:opacity-60";

  if (!targetUserId || targetUserId === myId) return confirmation;

  if (state === "buddies") {
    // The pill says nothing once you are buddies - on a post there is nothing
    // to do. The profile row still needs to show where you stand.
    if (!isProfile) return confirmation;
    return (
      <>
        {confirmation}
        <span className={profileButton} style={{ color: "#4b5563" }}>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
          </svg>
          Buddies
        </span>
      </>
    );
  }

  if (state === "pending_sent") {
    return (
      <>
        {confirmation}
        {isProfile ? (
          <span className={profileButton} style={{ color: "#6b7280" }}>
            Requested
          </span>
        ) : (
          <span className="flex-shrink-0 text-xs font-bold text-gray-400">
            Requested
          </span>
        )}
      </>
    );
  }

  if (state === "pending_received") {
    return (
      <>
        {confirmation}
        {/*
          ?details=1 matters: /profile/<id> forwards straight back to the feed
          without it, so a plain link here would bounce the reader in a circle
          instead of reaching the accept/decline buttons.
        */}
        <Link
          href={`/profile/${targetUserId}?details=1`}
          className={
            isProfile
              ? `${profileButton} border-[#cfe4d8] bg-[#f2faf6] hover:bg-[#e8f5ee]`
              : "flex-shrink-0 rounded-full border border-[#cfe4d8] px-3 py-1 text-xs font-black transition hover:bg-[#f2faf6]"
          }
          style={{ color: "#2f8f5b" }}
        >
          Accept
        </Link>
      </>
    );
  }

  return (
    <>
      {confirmation}
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
              setResult("failed");
              setBusy(false);
              return;
            }
            onRequested(targetUserId);
            setResult("sent");
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
            // breaking the post card over - but the sender still hears about it.
            setResult("failed");
          }
          setBusy(false);
        }}
        aria-label={`Add ${targetName} as a buddy`}
        className={
          isProfile
            ? profileButton
            : "flex flex-shrink-0 items-center gap-1 rounded-full border border-[#dbe7f4] px-3 py-1 text-xs font-black transition hover:bg-[#f2f7fd] disabled:opacity-50"
        }
        // Inline, because globals.css carries unlayered colour rules that
        // outrank a utility class - see components/home/BibleLockBanner.
        style={{ color: isProfile ? "#374151" : "#2f7fe8" }}
      >
        {isProfile ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M19 8v6M22 11h-6" />
          </svg>
        ) : (
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14M5 12h14"
            />
          </svg>
        )}
        {isProfile ? "Add Buddy" : "Add"}
      </button>
    </>
  );
}
