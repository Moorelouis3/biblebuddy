"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ensureGuestSession } from "@/lib/guestSession";

/**
 * Landing page primary CTA.
 *
 * Click → guest account created → straight into Bible in One Year Day 1.
 * No signup form, no questionnaire, no payment.
 *
 * If guest mode is unavailable (anonymous sign-ins turned off in Supabase, or a
 * network failure) it quietly falls back to /signup, so the landing page can
 * never end up with a dead button.
 */
export default function StartStudyingButton({
  clickedFrom,
  onTrack,
  className,
  children,
}: {
  /** Analytics label for which CTA was clicked, e.g. "hero" / "bottom_cta". */
  clickedFrom: string;
  onTrack?: (clickedFrom: string) => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [starting, setStarting] = useState(false);

  async function handleClick() {
    if (starting) return;
    setStarting(true);
    onTrack?.(clickedFrom);

    try {
      const result = await ensureGuestSession({ source: `landing_${clickedFrom}` });

      if (result.ok) {
        // One question, then straight into studying. The chooser saves the mode
        // and routes; nothing else stands between the click and Scripture.
        window.location.href = "/start";
        return;
      }

      router.push("/signup");
    } catch (err) {
      console.error("[LANDING] Could not start guest journey:", err);
      router.push("/signup");
    } finally {
      setStarting(false);
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={starting} className={className}>
      {starting ? "Starting..." : children}
    </button>
  );
}
