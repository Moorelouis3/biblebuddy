"use client";

import { useEffect, useState } from "react";
import { LouisAvatar } from "./LouisAvatar";
import confetti from "canvas-confetti";

interface DevotionalDayCompletionModalProps {
  dayNumber: number;
  devotionalTitle: string;
  onClose: () => void;
}

export default function DevotionalDayCompletionModal({
  dayNumber,
  devotionalTitle,
  onClose,
}: DevotionalDayCompletionModalProps) {
  const [showModal, setShowModal] = useState(true);

  // Trigger confetti when component mounts (same logic as Bible chapter completion)
  useEffect(() => {
    function triggerConfetti() {
      const duration = 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

      // Style confetti canvas to appear above everything
      const styleConfettiCanvas = (canvas: HTMLCanvasElement) => {
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '99999';
        canvas.style.pointerEvents = 'none';
      };

      // Use MutationObserver to catch new canvas elements as they're created
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeName === 'CANVAS') {
              styleConfettiCanvas(node as HTMLCanvasElement);
            }
          });
        });
      });

      // Start observing the document body for new canvas elements
      observer.observe(document.body, { childList: true, subtree: true });

      // Also style any existing canvases
      document.querySelectorAll('canvas').forEach(styleConfettiCanvas);

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          // Stop observing
          observer.disconnect();
          
          // Clean up canvas after animation ends
          setTimeout(() => {
            document.querySelectorAll('canvas').forEach((canvas) => {
              const htmlCanvas = canvas as HTMLCanvasElement;
              // Only remove confetti canvases (those with our z-index)
              if (htmlCanvas.style.zIndex === '99999') {
                // Fade out and remove
                htmlCanvas.style.opacity = '0';
                htmlCanvas.style.transition = 'opacity 0.5s';
                setTimeout(() => {
                  htmlCanvas.remove();
                }, 500);
              }
            });
          }, 500);
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }

    triggerConfetti();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    onClose();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center overflow-y-auto p-4 py-10">
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10 mt-10">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Inner light blue column */}
        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">
          {/* Header with Louis */}
          <div className="flex flex-col items-center mb-6">
            <LouisAvatar mood="stareyes" size={80} />
            <h1 className="text-2xl md:text-3xl font-bold mt-4 text-center text-gray-900">
              🎉 Congratulations!
            </h1>
            <p className="text-base md:text-lg text-gray-700 mt-3 text-center font-semibold">
              You've completed Day {dayNumber} of {devotionalTitle}
            </p>
            <p className="text-base text-gray-600 mt-2 text-center">
              Great job — your consistency is paying off!
            </p>
          </div>

          {/* Action Button */}
          <div className="grid grid-cols-1 gap-4 mb-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
            >
              Continue Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

