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

/**
 * The story screens there are: Genesis boards 1-11 by board number, and the
 * Exodus boards by their own number (exodus-01 to exodus-12; the last one
 * leads on to Leviticus).
 */
export function winStoryFor(book: string, number: number, id = ""): string | null {
  if (book === "Genesis" && number >= 1 && number <= 11) return `/games/match/transitions/genesis-${String(number).padStart(2, "0")}.webp`;
  const ex = /^exodus-(\d\d)$/.exec(id);
  if (ex && Number(ex[1]) >= 1 && Number(ex[1]) <= 12) return `/games/match/transitions/exodus-${ex[1]}.webp`;
  const lv = /^leviticus-(\d\d)$/.exec(id);
  if (lv && Number(lv[1]) >= 1 && Number(lv[1]) <= 10) return `/games/match/transitions/leviticus-${lv[1]}.webp`;
  const nu = /^numbers-(\d\d)$/.exec(id);
  if (nu && Number(nu[1]) >= 1 && Number(nu[1]) <= 10) return `/games/match/transitions/numbers-${nu[1]}.webp`;
  const de = /^deuteronomy-(\d\d)$/.exec(id);
  if (de && Number(de[1]) >= 1 && Number(de[1]) <= 10) return `/games/match/transitions/deuteronomy-${de[1]}.webp`;
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
