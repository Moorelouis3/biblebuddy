"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/**
 * "Message", on a member's profile (2026-11-06).
 *
 * Buddies already have a thread - it is created when a request is accepted -
 * so for them this is just a push to it. For everybody else
 * /api/messages/open-conversation finds or creates the one thread for the
 * pair: `conversations` is only readable by its two participants under RLS,
 * so the browser cannot insert that row itself, and the route is what keeps a
 * second thread from ever appearing for the same two people.
 *
 * Blocks are decided by the route, in both directions, so a blocked pair gets
 * a refusal here rather than a thread that would then refuse every message.
 */
export default function MessageBuddyButton({
  targetUserId,
  className = "",
}: {
  targetUserId: string;
  className?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function open() {
    if (busy || !targetUserId) return;
    setBusy(true);
    setError(null);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        router.push("/messages");
        return;
      }
      const res = await fetch("/api/messages/open-conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ targetUserId }),
      });
      const json = await res.json().catch(() => null);
      if (res.ok && json?.conversationId) {
        router.push(`/messages/${json.conversationId}`);
        return;
      }
      setError(json?.error || "Could not open the conversation.");
    } catch {
      setError("Could not open the conversation.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void open()}
        disabled={busy}
        className={`profile-skin-button inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition disabled:opacity-60 ${className}`}
        // Inline, because globals.css carries unlayered colour rules that
        // outrank a utility class - see components/home/BibleLockBanner.
        style={{ backgroundColor: "#4a9b6f", color: "#ffffff" }}
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
        </svg>
        {busy ? "Opening..." : "Message"}
      </button>
      {error ? (
        <p role="alert" className="basis-full text-xs text-red-500">
          {error}
        </p>
      ) : null}
    </>
  );
}
