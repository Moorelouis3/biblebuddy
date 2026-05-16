"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";

interface DailyRecommendationModalProps {
  greeting: string;
  contextLine: string;
  recommendationLine: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  onClose: () => void;
  /** Called in addition to onClose when "Do something different" is pressed */
  onSecondary?: () => void;
}

export default function DailyRecommendationModal({
  greeting,
  contextLine,
  recommendationLine,
  primaryButtonText,
  primaryButtonHref,
  onClose,
  onSecondary,
}: DailyRecommendationModalProps) {
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  const handlePrimary = () => {
    handleClose();
    router.push(primaryButtonHref);
  };

  const handleSecondary = () => {
    onSecondary?.();
    handleClose();
    router.push("/dashboard");
  };

  return (
    <ModalShell isOpen={visible} onClose={handleClose} backdropColor="bg-black/70" scrollable={true}>
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10 mt-10">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Inner light blue panel — matches DevotionalDayCompletionModal style */}
        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">
          <div className="flex flex-col items-center mb-6">
            <LouisAvatar mood="wave" size={112} />
            <p className="text-sm font-semibold text-blue-600 mt-4 text-center">{greeting}</p>
            <p className="text-base md:text-lg text-gray-800 mt-3 text-center font-semibold">
              {contextLine}
            </p>
            <p className="text-base text-gray-600 mt-2 text-center">{recommendationLine}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <button
              type="button"
              onClick={handlePrimary}
              className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
            >
              {primaryButtonText}
            </button>
            <button
              type="button"
              onClick={handleSecondary}
              className="px-4 py-4 rounded-2xl text-sm md:text-base font-semibold bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-300 transition text-center"
            >
              Do something different
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
