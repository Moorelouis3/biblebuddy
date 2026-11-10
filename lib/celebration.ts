/**
 * The confetti burst Bible Buddy already uses, lifted out of a component so a
 * second celebration does not have to re-debug it.
 *
 * All of this was written for components/DevotionalDayCompletionModal.tsx
 * (2026-10-26) and is moved here unchanged in behaviour on 2026-11-10 for the
 * level-up celebration. The fiddly parts, and why they exist:
 *
 *  - canvas-confetti injects its own <canvas> into document.body with its own
 *    styling. Left alone it sits in the page flow and can end up behind a
 *    modal or scrolled away, so a MutationObserver catches each canvas as it
 *    appears and pins it fixed, full-viewport, pointer-events:none, above the
 *    modal layer. ModalShell renders at z-index 9990; the canvas goes to
 *    99999 so the confetti falls in front of the card rather than behind it.
 *  - The bursts run on an interval and taper, rather than firing one big
 *    volley, because a taper reads as a celebration and a volley reads as a
 *    glitch.
 *  - Teardown fades and removes only the canvases it pinned, and the returned
 *    cleanup clears the interval and disconnects the observer - this can
 *    unmount mid-flight, and an orphaned interval kept firing confetti onto
 *    whatever page came next.
 *
 * Nothing here polls, subscribes or fetches. One interval, bounded by its own
 * duration, started by a user action.
 */
import confetti from "canvas-confetti";

/** Respect the OS setting rather than firing particles at someone who asked for stillness. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

const CONFETTI_Z_INDEX = "99999";

function styleConfettiCanvas(canvas: HTMLCanvasElement) {
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = CONFETTI_Z_INDEX;
  canvas.style.pointerEvents = "none";
}

export type ConfettiBurstOptions = {
  /** Total length of the burst in milliseconds. */
  durationMs: number;
  /** How many launch points fire on each tick: 1, 2 or 3. */
  origins?: 1 | 2 | 3;
  /** Particle colours. Defaults to canvas-confetti's own palette. */
  colors?: string[];
  /** Particles at the start of the burst, tapering to zero. */
  peakParticleCount?: number;
};

/**
 * Fire a confetti burst. Returns a cleanup function; call it on unmount.
 *
 * Returns a no-op when reduced motion is requested or when there is no DOM, so
 * callers do not have to branch.
 */
export function fireConfettiBurst(options: ConfettiBurstOptions): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};
  if (prefersReducedMotion()) return () => {};

  const duration = Math.max(1, options.durationMs);
  const origins = options.origins ?? 2;
  const peak = options.peakParticleCount ?? 46;
  const animationEnd = Date.now() + duration;

  const defaults: Record<string, unknown> = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: Number(CONFETTI_Z_INDEX),
  };
  if (options.colors && options.colors.length > 0) defaults.colors = options.colors;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "CANVAS") styleConfettiCanvas(node as HTMLCanvasElement);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll("canvas").forEach((canvas) => styleConfettiCanvas(canvas as HTMLCanvasElement));

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
  let finished = false;

  /**
   * Fade out, then let the library dispose of its own canvas.
   *
   * The original version in DevotionalDayCompletionModal removed the canvas
   * node directly. canvas-confetti hands its canvas to a worker through
   * transferControlToOffscreen, so yanking the node out from under the worker
   * can leave the library holding a reference it can no longer measure - which
   * surfaces as "canvas.getBoundingClientRect is not a function" when the
   * component unmounts mid-burst.
   *
   * confetti.reset() is the library's own teardown and handles the worker, so
   * it is called first. The node sweep after it is a backstop for any canvas
   * we pinned that reset did not own, and it is guarded so a missing reset (an
   * older build, a stubbed module) still cleans up.
   */
  function removePinnedCanvases() {
    const pinned = [...document.querySelectorAll("canvas")].filter(
      (canvas) => (canvas as HTMLCanvasElement).style.zIndex === CONFETTI_Z_INDEX,
    ) as HTMLCanvasElement[];

    for (const canvas of pinned) {
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 0.5s";
    }

    window.setTimeout(() => {
      try {
        (confetti as unknown as { reset?: () => void }).reset?.();
      } catch {
        // An older build without reset() just falls through to the sweep.
      }
      for (const canvas of pinned) {
        if (canvas.isConnected) canvas.remove();
      }
    }, 500);
  }

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      finished = true;
      observer.disconnect();
      window.setTimeout(removePinnedCanvases, 500);
      clearInterval(interval);
      return;
    }

    const particleCount = Math.max(6, peak * (timeLeft / duration));
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.08, 0.3), y: Math.random() - 0.2 } });
    if (origins > 1) {
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.92), y: Math.random() - 0.2 } });
    }
    if (origins > 2) {
      confetti({ ...defaults, particleCount: particleCount * 0.8, origin: { x: 0.5, y: 0.08 } });
    }
  }, 230);

  return () => {
    clearInterval(interval);
    observer.disconnect();
    if (!finished) removePinnedCanvases();
  };
}

/**
 * How long the burst runs at each level, and how many launch points it uses.
 *
 * Every level celebrates - Louis, 2026-11-10: "each level is important and can
 * take months or maybe years". The measured pacing backs that: median 47 days
 * from Level 19 to 20, 15 days from 14 to 15, and 115 days to reach Level 15 at
 * all. So the escalation is duration and density, never presence.
 *
 * Levels 2-4 are the one genuinely fast band (729 of 1,190 users who reach
 * Level 2 do it on their first day, median 1-3 days to the next), so they get a
 * shorter burst rather than none.
 */
export function confettiForLevel(level: number): ConfettiBurstOptions {
  const GOLD = ["#E3BA4E", "#FBEFB4", "#C49120", "#FDF8E4"];
  if (level >= 20) return { durationMs: 1400, origins: 3, colors: GOLD, peakParticleCount: 56 };
  if (level === 5 || level === 10 || level === 15) {
    return { durationMs: 1100, origins: 2, colors: GOLD, peakParticleCount: 48 };
  }
  if (level <= 4) return { durationMs: 500, origins: 1, colors: GOLD, peakParticleCount: 38 };
  return { durationMs: 800, origins: 2, colors: GOLD, peakParticleCount: 42 };
}
