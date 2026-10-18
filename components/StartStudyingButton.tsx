"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/**
 * Landing page primary CTA.
 *
 * Click -> sign up -> the app. There is nothing in between any more (Louis,
 * 2026-10-18): no questionnaire, no chooser, no first-login modal. Name and
 * profile picture are asked for later, once, after the account finishes its
 * first real thing - see DisplayNamePromptGate.
 *
 * This used to call ensureGuestSession() and send people to /start. Since guest
 * accounts were switched off on 6 October that call returns "disabled" without
 * ever checking for a session, so somebody who was already signed in was told
 * they were not and pushed to /signup. Checking the session directly is both
 * simpler and correct: signed in goes to the app, everyone else signs up.
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
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        window.location.href = "/dashboard";
        return;
      }
      router.push("/signup");
    } catch (err) {
      console.error("[LANDING] Could not start:", err);
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
