"use client";

import { useState } from "react";

/**
 * Landing page primary CTA - the "Continue on Web Version" button at all
 * three call-to-action points.
 *
 * Click -> sign up -> the app. There is nothing in between any more (Louis,
 * 2026-10-18): no questionnaire, no chooser, no first-login modal. Name and
 * profile picture are asked for later, once, after the account finishes its
 * first real thing - see DisplayNamePromptGate.
 *
 * It is a plain <a>, not a <button> with router.push, and that is the whole
 * point (Louis, 2026-11-02, after the button did nothing on the live site):
 * the landing page throws an uncaught hydration error, which leaves Next's
 * client router unable to finish a navigation - the /signup RSC request goes
 * out and is aborted, and the visitor just sits on the landing page. A real
 * link is a browser navigation. Nothing in our JavaScript can swallow it,
 * so the front door cannot be closed again by anything that breaks on the
 * page around it. Not next/link either, for the same reason.
 *
 * There is also no session check here any more. It used to ask Supabase
 * whether you were signed in so it could send you to /dashboard instead,
 * which meant an await standing between the click and the navigation.
 * /signup already forwards anyone with a session on to the dashboard, so
 * the check bought nothing and cost everything.
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
  const [starting, setStarting] = useState(false);

  // Fires the analytics event and shows feedback while the page loads, but
  // never preventDefault() and never awaits: the browser is already on its
  // way to /signup, and the event is sent with keepalive so it survives the
  // page unload. If anything in here throws, the link still works.
  function handleClick() {
    setStarting(true);
    try {
      onTrack?.(clickedFrom);
    } catch (err) {
      console.error("[LANDING] Could not track the start click:", err);
    }
  }

  return (
    <a href="/signup" onClick={handleClick} className={className}>
      {starting ? "Starting..." : children}
    </a>
  );
}
