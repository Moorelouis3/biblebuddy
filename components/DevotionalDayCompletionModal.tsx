"use client";

import { useEffect, useState } from "react";
import { LouisAvatar } from "./LouisAvatar";
import confetti from "canvas-confetti";
import { ModalShell } from "./ModalShell";

interface DevotionalDayCompletionModalProps {
  dayNumber: number | null;
  devotionalTitle: string | null;
  onClose: () => void;
  customTitle?: string;
  customBody?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimary?: () => void;
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
}: DevotionalDayCompletionModalProps) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    function triggerConfetti() {
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
            if (node.nodeName === "CANVAS") {
              styleConfettiCanvas(node as HTMLCanvasElement);
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
      document.querySelectorAll("canvas").forEach(styleConfettiCanvas);

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          observer.disconnect();

          setTimeout(() => {
            document.querySelectorAll("canvas").forEach((canvas) => {
              const htmlCanvas = canvas as HTMLCanvasElement;
              if (htmlCanvas.style.zIndex === "99999") {
                htmlCanvas.style.opacity = "0";
                htmlCanvas.style.transition = "opacity 0.5s";
                setTimeout(() => {
                  htmlCanvas.remove();
                }, 500);
              }
            });
          }, 500);

          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }

    triggerConfetti();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <ModalShell isOpen={showModal} onClose={handleClose} backdropColor="bg-black/70" scrollable={true}>
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10 mt-10">
        <button
          onClick={handleClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">
          <div className="flex flex-col items-center mb-6">
            <LouisAvatar mood="stareyes" size={112} />
            <h1 className="text-2xl md:text-3xl font-bold mt-4 text-center text-gray-900">
              {customTitle ? customTitle : "You finished today's devotional"}
            </h1>
            {customBody ? (
              <p className="text-base md:text-lg text-gray-700 mt-3 text-center font-semibold">
                {customBody}
              </p>
            ) : (
              <>
                <p className="text-base md:text-lg text-gray-700 mt-3 text-center font-semibold">
                  You've completed Day {dayNumber} of {devotionalTitle}
                </p>
                <p className="text-base text-gray-600 mt-2 text-center">
                  Louis is proud of you. Small, steady time in the Word is how real growth starts to stack up.
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            {primaryButtonText && onPrimary ? (
              <button
                type="button"
                onClick={onPrimary}
                className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
              >
                {primaryButtonText}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
              >
                Continue Reading
              </button>
            )}
            {secondaryButtonText && (
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-300 transition text-center"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
