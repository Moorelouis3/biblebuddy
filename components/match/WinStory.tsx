"use client";

/**
 * The story screen after a board is won (Louis, 2026-11-22, the 11 Genesis
 * "win-screen" pictures in public/games/match/transitions): "Well done!" and
 * the board's name first, then the short story fades in over the full-screen
 * picture, then the green button. The button goes back to the map, where the
 * next board is highlighted and the player's photo walks to it; the last
 * Genesis one leads on to Exodus.
 *
 * The words and the button are painted into each picture, so the fade is done
 * with layers of the same picture: under the story and the button sits a
 * blurred copy of that strip (unreadable), and the sharp strip fades in over
 * it. Tapping anywhere shows everything at once.
 */

import { useState } from "react";

/** Which boards have a story screen: Genesis boards 1-11, by board number. */
export function winStoryFor(book: string, number: number): string | null {
  if (book === "Genesis" && number >= 1 && number <= 11) return `/games/match/transitions/genesis-${String(number).padStart(2, "0")}.webp`;
  return null;
}

/** The strips of the picture, in percent of its height (the same on all 11). */
const STORY = "inset(66.5% 3% 20.6% 3% round 28px)";
const BUTTON = "inset(79.6% 8% 9.6% 8% round 999px)";
const PLAQUE = "inset(6.5% 10% 76.5% 10%)";

export default function WinStory({ src, alt, onContinue }: { src: string; alt: string; onContinue: () => void }) {
  const [all, setAll] = useState(false);
  return (
    <div className={`bbm-story ${all ? "is-all" : ""}`} role="dialog" aria-modal="true" aria-label={alt} onClick={() => setAll(true)}>
      <div className="bbm-story-blur" style={{ backgroundImage: `url(${src})` }} aria-hidden="true" />
      <div className="bbm-story-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bbm-story-base" src={src} alt={alt} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bbm-story-hide" src={src} alt="" style={{ clipPath: STORY }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bbm-story-hide" src={src} alt="" style={{ clipPath: BUTTON }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bbm-story-plaque" src={src} alt="" style={{ clipPath: PLAQUE }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bbm-story-text" src={src} alt="" style={{ clipPath: STORY }} draggable={false} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="bbm-story-button" src={src} alt="" style={{ clipPath: BUTTON }} draggable={false} />
        <button
          type="button"
          className="bbm-story-go"
          onClick={(e) => {
            e.stopPropagation();
            onContinue();
          }}
          aria-label="Continue to the map"
        />
      </div>
    </div>
  );
}
