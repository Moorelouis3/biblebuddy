"use client";

/**
 * The story screen after a board is won (Louis, 2026-11-22: the Genesis
 * "win-screen" pictures in public/games/match/transitions). One picture, like
 * an intro and an outro: it pops in whole, the player taps its green button,
 * and it plays out back to the map, where the next board is highlighted and
 * the player's photo walks to it. (A first version faded the story and the
 * button in separately; Louis wanted the whole screen as one.)
 */

import { useState } from "react";

/** The story screens there are, by book and board number. */
export function winStoryFor(book: string, number: number): string | null {
  if (book === "Genesis" && number >= 1 && number <= 11) return `/games/match/transitions/genesis-${String(number).padStart(2, "0")}.webp`;
  return null;
}

export default function WinStory({ src, alt, onContinue }: { src: string; alt: string; onContinue: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const go = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(onContinue, 420);
  };
  return (
    <div className={`bbm-story ${leaving ? "is-leaving" : ""}`} role="dialog" aria-modal="true" aria-label={alt}>
      <div className="bbm-story-blur" style={{ backgroundImage: `url(${src})` }} aria-hidden="true" />
      <div className="bbm-story-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bbm-story-base" src={src} alt={alt} draggable={false} />
        {/* The tap spot over the green button drawn in the picture. */}
        <button type="button" className="bbm-story-go" onClick={go} aria-label="Continue to the map" />
      </div>
    </div>
  );
}
