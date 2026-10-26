"use client";

import { useEffect, useState } from "react";
import { LouisAvatar } from "./LouisAvatar";
import confetti from "canvas-confetti";
import { ModalShell } from "./ModalShell";
import { cardTint } from "../lib/cardTints";
import { DEFAULT_BUDDY_AVATAR } from "../lib/buddyAvatars";

/**
 * "You finished Day N" - the first popup in the Lil Louis family
 * (Louis, 2026-10-26, from the approved peach mockup).
 *
 * Restyled, not rebuilt. It was a 768-896px wide white card with a blue-50
 * panel inside it and Louis sitting within the frame. The mockup is a compact
 * peach card with Louis breaking the top edge, a DAY COMPLETE pill, soft hills
 * along the bottom and one blue button. Everything underneath is unchanged:
 * same props, same two call sites, same completion tracking.
 *
 * Peach is CARD_TINTS[0] from lib/cardTints, the same peach the Bible Trivia
 * card and the streak chip already use, so this lands as part of the dashboard
 * family rather than a new colour.
 *
 * TWO JOBS, ONE COMPONENT. The study page also renders this as a plain notice
 * ("You Need Bible Buddy Pro") by passing customTitle. That path is dormant -
 * isProLocked requires !CORE_STUDY_IS_FREE and study is free - but while it
 * exists it must not wear a celebration: no confetti, no pill, no hills. The
 * presence of customTitle is what separates them, so neither call site had to
 * change to get the right one.
 */

interface DevotionalDayCompletionModalProps {
  dayNumber: number | null;
  devotionalTitle: string | null;
  onClose: () => void;
  customTitle?: string;
  customBody?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimary?: () => void;
  /**
   * Where the second button goes. Without it the button only dismisses, and
   * then it must SAY dismiss - a "Back to bookshelf" that leaves you on the
   * same page is the kind of label this pass exists to remove.
   */
  onSecondary?: () => void;
}

const PEACH = cardTint(0);

/** Respect the OS setting rather than firing 1,000ms of particles at someone who asked for stillness. */
function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function DevotionalDayCompletionModal({
  dayNumber,
  devotionalTitle,
  onClose,
  customTitle,
  customBody,
  primaryButtonText,
  secondaryButtonText,
  onPrimary,
  onSecondary,
}: DevotionalDayCompletionModalProps) {
  const [showModal, setShowModal] = useState(true);
  const isCelebration = !customTitle;

  useEffect(() => {
    if (!isCelebration || prefersReducedMotion()) return;

    const duration = 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

    const styleConfettiCanvas = (canvas: HTMLCanvasElement) => {
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = "99999";
      canvas.style.pointerEvents = "none";
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "CANVAS") styleConfettiCanvas(node as HTMLCanvasElement);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll("canvas").forEach(styleConfettiCanvas);

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        observer.disconnect();
        setTimeout(() => {
          document.querySelectorAll("canvas").forEach((canvas) => {
            const htmlCanvas = canvas as HTMLCanvasElement;
            if (htmlCanvas.style.zIndex === "99999") {
              htmlCanvas.style.opacity = "0";
              htmlCanvas.style.transition = "opacity 0.5s";
              setTimeout(() => htmlCanvas.remove(), 500);
            }
          });
        }, 500);
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Cleanup matters now that this can unmount while the loop is mid-flight.
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [isCelebration]);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <ModalShell isOpen={showModal} onClose={handleClose} backdropColor="bg-black/70" scrollable>
      {/* mt-16 leaves room for Louis above the card; max-w-sm keeps it a card
          rather than the near-full-width panel this used to be. */}
      <div className="relative mb-10 mt-16 w-full max-w-sm">
        <div
          className="relative overflow-hidden rounded-[32px] shadow-2xl shadow-black/30 ring-1 ring-black/5"
          style={{ backgroundColor: isCelebration ? PEACH.bg : "#ffffff", border: `1px solid ${isCelebration ? PEACH.border : "#e5e7eb"}` }}
        >
          {isCelebration ? (
            <>
              {/* Soft hills along the bottom, drawn rather than fetched - no new
                  asset to ship, and it scales to any card width. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 90"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full"
              >
                <path d="M0 62 C 70 30, 120 78, 200 54 C 270 33, 330 70, 400 48 L400 90 L0 90 Z" fill="#f7e2cd" opacity="0.75" />
                <path d="M0 76 C 90 52, 150 88, 230 70 C 300 54, 350 82, 400 68 L400 90 L0 90 Z" fill="#f3d5b5" opacity="0.7" />
              </svg>
              {/* Landscape detail, down in the hills. These started life up
                  beside the headline and sat right on top of it at 375px. */}
              <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-4 text-lg opacity-50">🌿</span>
              <span aria-hidden="true" className="pointer-events-none absolute bottom-9 right-5 text-sm opacity-40">✨</span>
            </>
          ) : null}

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-white/70 text-sm font-black text-gray-500 transition hover:bg-white hover:text-gray-800"
          >
            ✕
          </button>

          <div className="relative z-10 px-6 pb-7 pt-16 text-center sm:px-8">
            {isCelebration ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e4f0e4] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#3f7a46]">
                <span aria-hidden="true">✓</span>
                Day complete
              </span>
            ) : null}

            <h1 className="mt-4 text-[27px] font-black leading-tight text-[#10213a] sm:text-3xl">
              {customTitle ? customTitle : `You finished Day ${dayNumber}!`}
            </h1>

            {customBody ? (
              <p className="mt-3 text-[15px] leading-relaxed text-[#44566f]">{customBody}</p>
            ) : (
              <>
                <p className="mt-3 text-[15px] leading-relaxed text-[#44566f]">
                  A little time in God&rsquo;s Word. A meaningful step forward.
                </p>
                {devotionalTitle ? (
                  <p className="mt-1 text-[13px] font-bold text-[#7c8da3]">{devotionalTitle}</p>
                ) : null}
              </>
            )}

            <div className="mt-6 grid gap-2">
              <button
                type="button"
                onClick={onPrimary ?? handleClose}
                className="w-full rounded-2xl bg-[#2f6fd0] px-5 py-3.5 text-[15px] font-black text-white shadow-lg shadow-[#2f6fd0]/25 transition hover:bg-[#2559ab] active:scale-[0.99]"
              >
                {primaryButtonText ?? "Close"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onSecondary) {
                    setShowModal(false);
                    onSecondary();
                    return;
                  }
                  handleClose();
                }}
                className="w-full rounded-2xl px-5 py-2.5 text-[13px] font-bold text-[#5b6c84] transition hover:text-[#10213a]"
              >
                {secondaryButtonText ?? (onSecondary ? "Back to bookshelf" : "Close")}
              </button>
            </div>
          </div>
        </div>

        {/* Louis breaks the top edge, as in the mockup. Outside the clipped
            card, so the overflow-hidden that keeps the hills inside the
            rounded corners does not cut his hat off. */}
        <div className="pointer-events-none absolute inset-x-0 -top-14 flex justify-center">
          <LouisAvatar
            mood={isCelebration ? "stareyes" : "think"}
            size={132}
            unframed
            fallbackBuddyId={DEFAULT_BUDDY_AVATAR}
          />
        </div>
      </div>
    </ModalShell>
  );
}
