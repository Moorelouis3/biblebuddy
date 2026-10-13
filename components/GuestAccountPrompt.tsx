"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isGuestUser } from "@/lib/guestSession";

/**
 * "Only Bible Buddy members can comment."
 *
 * Guests can read and study everything with no account. Taking part in the
 * community needs one.
 *
 * The database already enforces this — BLOCK_ANONYMOUS_COMMUNITY_WRITES.sql
 * adds RESTRICTIVE policies so a guest INSERT is rejected outright. This is the
 * friendly half: without it the write just fails and the user sees nothing.
 *
 * Usage:
 *
 *   const { blockIfGuest, guestPrompt } = useGuestGate();
 *
 *   async function submitComment() {
 *     if (await blockIfGuest("comment")) return;   // shows the prompt, stops
 *     ...existing insert...
 *   }
 *
 *   return <>{...}{guestPrompt}</>;
 */

type GuestAction = "comment" | "post" | "like" | "reply" | "message" | "join in";

const ACTION_COPY: Record<GuestAction, string> = {
  comment: "comment",
  post: "post",
  like: "like posts",
  reply: "reply",
  message: "send messages",
  "join in": "join in",
};

export function GuestAccountPrompt({
  open,
  action = "comment",
  onClose,
}: {
  open: boolean;
  action?: GuestAction;
  onClose: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl text-gray-400 transition hover:text-gray-700"
        >
          ✕
        </button>

        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0056FD]">
          Members only
        </p>
        <h2 className="mt-2 text-xl font-black text-gray-950">
          Only Bible Buddy members can {ACTION_COPY[action]}
        </h2>
        <p className="mt-3 text-sm font-medium leading-6 text-gray-600">
          Create a free account to join the conversation. It takes a few seconds,
          it costs nothing, and <strong>everything you have studied so far is
          kept</strong> — your progress carries straight over.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="w-full rounded-xl bg-[#0056FD] py-3 font-black text-white transition hover:bg-blue-700"
          >
            Create my free account
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-gray-100 py-3 font-bold text-gray-700 transition hover:bg-gray-200"
          >
            Keep studying
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook form. `blockIfGuest` returns true when the caller should stop.
 * Non-guests always get false, so registered users are never delayed by more
 * than one cached auth lookup.
 */
export function useGuestGate() {
  const [promptFor, setPromptFor] = useState<GuestAction | null>(null);

  const blockIfGuest = useCallback(async (action: GuestAction = "comment") => {
    try {
      const guest = await isGuestUser();
      if (guest) {
        setPromptFor(action);
        return true;
      }
    } catch {
      // Never block a real user because the check itself failed. The database
      // policy is the actual enforcement; this is only the explanation.
    }
    return false;
  }, []);

  const guestPrompt = (
    <GuestAccountPrompt
      open={promptFor !== null}
      action={promptFor ?? "comment"}
      onClose={() => setPromptFor(null)}
    />
  );

  return { blockIfGuest, guestPrompt };
}

export default GuestAccountPrompt;
