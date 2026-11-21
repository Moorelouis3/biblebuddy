"use client";

/**
 * The Bible Cover shelf in Settings (lib/bibleCovers.ts). A cover is chosen
 * like a Bible is - by its cover - so they are shown as books on a shelf, not
 * as colour swatches. "None" puts the reader's own theme back exactly.
 *
 * Saved on this device for now (localStorage). Saving it to the account so it
 * follows someone to their phone needs a profile_stats column; see the
 * handoff of 2026-11-21.
 */
import { useEffect, useState } from "react";
import { BIBLE_COVERS, BIBLE_COVER_EVENT, EFFECT_LABELS, readBibleCover, setBibleCover, type BibleCoverId } from "@/lib/bibleCovers";
import { setBibleCoverSnow } from "@/components/BibleCoverBackdrop";

const SNOW_PREF_KEY = "bb:bible-cover-snow:v1";

export default function BibleCoverPicker() {
  const [current, setCurrent] = useState<BibleCoverId | null>(null);
  const [motionOn, setMotionOn] = useState(true);

  useEffect(() => {
    const sync = () => setCurrent(readBibleCover());
    sync();
    try {
      setMotionOn(window.localStorage.getItem(SNOW_PREF_KEY) !== "off");
    } catch {
      // storage blocked: motion stays on
    }
    window.addEventListener(BIBLE_COVER_EVENT, sync);
    return () => window.removeEventListener(BIBLE_COVER_EVENT, sync);
  }, []);

  // Winter Cabin first: it is the one the others were modelled on.
  const covers = Object.values(BIBLE_COVERS).sort((a, b) => Number(b.id === "winter-cabin") - Number(a.id === "winter-cabin"));

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => setBibleCover(null)}
          aria-pressed={current === null}
          className="text-left"
        >
          <span
            className={`grid aspect-[3/4] w-full place-items-center rounded-l-md rounded-r-xl border text-center shadow-sm ${
              current === null ? "ring-[3px] ring-[var(--bb-accent,#0056fd)] ring-offset-2" : ""
            }`}
            style={{ background: "var(--bb-surface-soft, #f4f7fc)", borderColor: "var(--bb-card-border, #dbe7f4)" }}
          >
            <span className="px-2 font-serif text-[13px] font-bold text-[var(--bb-text-primary,#0e1a3a)]">
              No cover
            </span>
          </span>
          <span className="mt-1.5 block text-center text-[11px] font-bold text-[var(--bb-text-secondary,#4b5563)]">Your theme</span>
        </button>
        {covers.map((cover) => {
          const selected = current === cover.id;
          return (
            <button
              key={cover.id}
              type="button"
              onClick={() => setBibleCover(cover.id)}
              aria-pressed={selected}
              aria-label={`${cover.name} Bible cover`}
              className="text-left"
            >
              <span
                className={`relative block aspect-[3/4] w-full overflow-hidden rounded-l-md rounded-r-xl bg-cover bg-center shadow-[0_10px_18px_-8px_rgba(14,26,58,0.55)] ${
                  selected ? "ring-[3px] ring-[var(--bb-accent,#0056fd)] ring-offset-2" : ""
                }`}
                style={{ backgroundImage: `url(${cover.art.thumb})`, backgroundColor: cover.base }}
              >
                {/* The spine and the gilt title, so it reads as a Bible. */}
                <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-black/30" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                <span className="absolute inset-x-2 bottom-2 text-white">
                  <span className="block text-[7px] font-black tracking-[0.22em] opacity-85">HOLY BIBLE</span>
                  <span className="block font-serif text-[12px] font-bold leading-tight">{cover.name}</span>
                </span>
                {selected ? (
                  <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[var(--bb-accent,#0056fd)] text-[11px] font-black text-[var(--bb-button-text,#ffffff)]">
                    ✓
                  </span>
                ) : null}
              </span>
              <span className="mt-1.5 block text-center text-[11px] font-bold text-[var(--bb-text-secondary,#4b5563)]">{cover.name}</span>
            </button>
          );
        })}
      </div>

      {current ? (
        <label className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-4 py-3">
          <span>
            <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">
              {EFFECT_LABELS[BIBLE_COVERS[current].motion]}
            </span>
            <span className="block text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
              Off keeps the picture still. It also goes still by itself on phones that cannot keep up.
            </span>
          </span>
          <input
            type="checkbox"
            checked={motionOn}
            onChange={(event) => {
              setMotionOn(event.target.checked);
              setBibleCoverSnow(event.target.checked);
            }}
            className="h-5 w-5 shrink-0 accent-[var(--bb-accent,#0056fd)]"
          />
        </label>
      ) : null}
    </div>
  );
}
