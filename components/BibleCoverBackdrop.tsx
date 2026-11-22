"use client";

/**
 * The scene behind a Bible Cover: artwork, a slow drift, and (Winter Cabin)
 * falling snow. One layer for the whole app, mounted once in app/layout.tsx,
 * so moving between pages never stacks a second copy or restarts it.
 *
 * Why the old skins lagged, and what this does instead (2026-11-21, read from
 * the old rules still in app/globals.css):
 *  - The old snow animated `background-position` on a full-screen layer, a
 *    repaint of the whole screen every frame, under a `filter: blur()` that
 *    was recomputed every frame too. Here the snow is two pre-drawn tiles on
 *    layers that only move (transform), which the GPU composites without
 *    repainting, and nothing is blurred.
 *  - The old moonlight used `mix-blend-mode: screen` across the full screen,
 *    blending against everything beneath it each frame. None here.
 *  - `background-attachment: fixed` on <html> made Android repaint the
 *    picture on scroll. Here the art is a position:fixed layer of its own.
 *  - Cards and dialogs used `backdrop-filter: blur(10-22px)` over the photo.
 *    The cover CSS uses solid translucent panels instead.
 *  - No JavaScript runs per frame. React state changes only when the cover is
 *    put on or taken off.
 *
 * Still instead of moving, decided by CSS (app/bible-covers.css):
 *  - reduce motion, data saver, a slow connection or <= 4 GB of memory
 *    (data-bb-perf-reduce, lib/appPerformance.ts);
 *  - the reader turned snow off (data-bb-cover-motion="still");
 *  - this device dropped frames when the snow first ran (below).
 * Animations pause while the app is hidden (data-bb-app-hidden).
 */
import { useEffect, useState } from "react";
import { BIBLE_COVERS, normalizeBibleCoverId, type BibleCover, type BibleCoverId } from "@/lib/bibleCovers";

const SNOW_PREF_KEY = "bb:bible-cover-snow:v1";
const AUTO_STILL_KEY = "bb:bible-cover-auto-still:v1";
const AUTO_STILL_RETRY_MS = 7 * 24 * 60 * 60 * 1000;

function readCoverFromDocument(): BibleCoverId | null {
  if (typeof document === "undefined") return null;
  return normalizeBibleCoverId(document.documentElement.dataset.bbCover);
}

function syncMotionAttribute() {
  const root = document.documentElement;
  let still = false;
  try {
    if (window.localStorage.getItem(SNOW_PREF_KEY) === "off") still = true;
    const auto = Number(window.localStorage.getItem(AUTO_STILL_KEY) || 0);
    if (auto && Date.now() - auto < AUTO_STILL_RETRY_MS) still = true;
  } catch {
    // Storage blocked: keep the default.
  }
  root.dataset.bbCoverMotion = still ? "still" : "on";
  return still;
}

/** Snow on or off for this reader, from the cover settings. */
export function setBibleCoverSnow(on: boolean) {
  try {
    if (on) {
      window.localStorage.removeItem(SNOW_PREF_KEY);
      window.localStorage.removeItem(AUTO_STILL_KEY);
    } else {
      window.localStorage.setItem(SNOW_PREF_KEY, "off");
    }
  } catch {
    // ignore
  }
  syncMotionAttribute();
}

/**
 * Watches the first few seconds of snow on this device. Frame timing is read
 * into local variables inside one requestAnimationFrame chain - no React state
 * per frame - and the chain ends after the sample or the moment the page is
 * hidden (a hidden page's frames are throttled and would look like lag).
 */
function sampleSmoothness(onSlow: () => void): () => void {
  let raf = 0;
  let cancelled = false;
  let start = 0;
  let last = 0;
  let frames = 0;
  let slow = 0;
  const SAMPLE_MS = 4000;
  const WARMUP_MS = 800;

  const stop = () => {
    cancelled = true;
    if (raf) cancelAnimationFrame(raf);
  };
  const tick = (now: number) => {
    if (cancelled) return;
    if (document.visibilityState !== "visible") return stop();
    if (!start) start = now;
    if (now - start > WARMUP_MS) {
      if (last) {
        frames += 1;
        if (now - last > 34) slow += 1; // worse than ~30 fps for that frame
      }
      last = now;
    }
    if (now - start < SAMPLE_MS + WARMUP_MS) {
      raf = requestAnimationFrame(tick);
      return;
    }
    // Over a fifth of frames late means the snow is costing this device.
    if (frames > 30 && slow / frames > 0.2) onSlow();
  };
  raf = requestAnimationFrame(tick);
  return stop;
}

export default function BibleCoverBackdrop() {
  const [coverId, setCoverId] = useState<BibleCoverId | null>(null);

  // The <html data-bb-cover> attribute is the one source of truth - it is set
  // by the theme code and by the first-paint script - so watch it rather than
  // keeping a second copy of the choice here.
  useEffect(() => {
    setCoverId(readCoverFromDocument());
    const observer = new MutationObserver(() => setCoverId(readCoverFromDocument()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bb-cover"] });
    return () => observer.disconnect();
  }, []);

  const cover = coverId ? BIBLE_COVERS[coverId] : null;

  useEffect(() => {
    if (!cover) {
      delete document.documentElement.dataset.bbCoverMotion;
      return;
    }
    const still = syncMotionAttribute();
    if (still || cover.motion === "none") return; // drift and snow are both sampled
    if (document.documentElement.dataset.bbPerfReduce === "true") return;
    let stopSample: (() => void) | null = null;
    const begin = () => {
      stopSample?.();
      stopSample = sampleSmoothness(() => {
        try {
          window.localStorage.setItem(AUTO_STILL_KEY, String(Date.now()));
        } catch {
          // ignore
        }
        syncMotionAttribute();
      });
    };
    if (document.visibilityState === "visible") begin();
    else {
      const onVisible = () => {
        if (document.visibilityState === "visible") {
          document.removeEventListener("visibilitychange", onVisible);
          begin();
        }
      };
      document.addEventListener("visibilitychange", onVisible);
      return () => {
        document.removeEventListener("visibilitychange", onVisible);
        stopSample?.();
      };
    }
    return () => stopSample?.();
  }, [cover]);

  if (!cover) return null;

  return (
    <div className="bb-cover-backdrop" data-cover={cover.id} aria-hidden="true">
      {/* Dark has no picture: the backdrop is just its base colour. */}
      {cover.art ? (
        <>
          {/* Every cover is painted as a tall phone picture. On a wide screen it
              used to be blown up 2x and cropped to a thin middle band, which
              looked stretched and lost the best part (Louis, 2026-11-22). Now
              the whole picture stands sharp in the middle, and a soft, darker
              copy of it (pre-blurred, scripts/generate-cover-fills.mjs) fills the sides (app/bible-covers.css). On a phone the
              fill sits hidden under the picture. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bb-cover-art-fill" src={cover.art.fill} alt="" decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bb-cover-art" src={cover.art.mobile} alt="" decoding="async" />
          <div className="bb-cover-shade" />
        </>
      ) : null}
      <CoverEffect effect={cover.motion} />
    </div>
  );
}

/**
 * Each cover's light effect as plain layers. Every layer carries bb-cover-fx,
 * which is what the still / reduced-motion / hidden rules in
 * app/bible-covers.css switch off, and every animation on them is transform
 * or opacity only (scripts/verify-bible-covers.ts checks the keyframes).
 * Tiles come from scripts/generate-cover-fx.mjs.
 */
function CoverEffect({ effect }: { effect: BibleCover["motion"] }) {
  switch (effect) {
    case "snow":
      return (
        <>
          <div className="bb-cover-fx bb-cover-snow bb-cover-snow-far" />
          <div className="bb-cover-fx bb-cover-snow bb-cover-snow-near" />
        </>
      );
    case "fireflies":
      return (
        <>
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-fireflies bb-fx-slow" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-fireflies bb-fx-twinkle bb-fx-offset" />
        </>
      );
    case "stars":
      return (
        <>
          <div className="bb-cover-fx bb-fx-tile bb-fx-still bb-fx-stars bb-fx-twinkle" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-still bb-fx-stars bb-fx-twinkle bb-fx-offset bb-fx-shift" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-fireflies bb-fx-slow bb-fx-faint" />
        </>
      );
    case "embers":
      return (
        <>
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-embers bb-fx-slow" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-embers bb-fx-twinkle bb-fx-offset" />
        </>
      );
    case "fire":
      return (
        <>
          <div className="bb-cover-fx bb-fx-firelight" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-embers" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-embers bb-fx-slow bb-fx-offset" />
        </>
      );
    case "lightning":
      return <div className="bb-cover-fx bb-fx-lightning" />;
    case "beam":
      return (
        <div className="bb-fx-beam-pivot">
          <div className="bb-cover-fx bb-fx-beam" />
        </div>
      );
    case "rays":
      return (
        <>
          <div className="bb-cover-fx bb-fx-rays" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-rise bb-fx-sparkles bb-fx-slow bb-fx-twinkle" />
        </>
      );
    case "sand":
      return (
        <>
          <div className="bb-cover-fx bb-fx-tile bb-fx-wind bb-fx-sand" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-wind bb-fx-sand bb-fx-slow bb-fx-offset bb-fx-faint" />
        </>
      );
    case "rain":
      return (
        <div className="bb-fx-window">
          <div className="bb-cover-fx bb-fx-tile bb-fx-fall bb-fx-rain" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-fall bb-fx-rain bb-fx-slow bb-fx-offset bb-fx-faint" />
        </div>
      );
    case "petals":
      return (
        <>
          <div className="bb-cover-fx bb-fx-tile bb-fx-flutter bb-fx-petals" />
          <div className="bb-cover-fx bb-fx-tile bb-fx-flutter bb-fx-petals bb-fx-slow bb-fx-offset bb-fx-faint" />
        </>
      );
    default:
      return null;
  }
}
