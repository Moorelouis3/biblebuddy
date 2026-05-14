"use client";

import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";

type GuidedChapterLimitModalProps = {
  isOpen: boolean;
  variant: "completed" | "locked";
  unlocksInLabel?: string | null;
  onClose: () => void;
  onBackToDashboard?: () => void;
  onUpgrade?: () => void;
};

export default function GuidedChapterLimitModal({
  isOpen,
  variant,
  unlocksInLabel,
  onClose,
  onBackToDashboard,
  onUpgrade,
}: GuidedChapterLimitModalProps) {
  const isCompleted = variant === "completed";
  const title = isCompleted ? "Today's Chapter Complete" : "You're ready for the next chapter.";
  const primaryCopy = isCompleted
    ? "You completed today's guided Bible study chapter."
    : "As a free member, you can complete one guided Bible study chapter per day.";
  const secondaryCopy = isCompleted
    ? "Come back tomorrow to continue your Bible journey for free, or upgrade to Bible Buddy Pro to continue studying now."
    : `Your next chapter unlocks in ${unlocksInLabel || "soon"}.`;
  const tertiaryCopy = isCompleted
    ? null
    : "To keep going now with chapter intros, notes, trivia, Scrambled, and guided study tasks, upgrade to Bible Buddy Pro.";

  function handleUpgrade() {
    if (onUpgrade) {
      onUpgrade();
      return;
    }
    if (typeof window !== "undefined") {
      window.location.href = "/upgrade";
    }
  }

  function handleSecondary() {
    if (isCompleted && onBackToDashboard) {
      onBackToDashboard();
      return;
    }
    onClose();
  }

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} backdropColor="bg-black/55">
      <div className="mx-4 w-full max-w-md overflow-hidden rounded-[28px] border border-[#d7e4f7] bg-white shadow-2xl">
        <div className="bg-gradient-to-br from-[#edf5ff] via-white to-[#fff7e8] px-6 py-7 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white bg-white shadow-sm">
            <LouisAvatar mood={isCompleted ? "stareyes" : "bible"} size={60} />
          </div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#7BAFD4]">Bible Buddy</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-gray-950">{title}</h2>
          <p className="mt-4 text-base font-bold leading-6 text-gray-900">{primaryCopy}</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">{secondaryCopy}</p>
          {tertiaryCopy ? (
            <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">{tertiaryCopy}</p>
          ) : null}
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={handleUpgrade}
              className="rounded-full bg-[#7BAFD4] px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#6aa3ca]"
            >
              {isCompleted ? "Upgrade to Pro" : "Upgrade to Continue Now"}
            </button>
            <button
              type="button"
              onClick={handleSecondary}
              className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              {isCompleted ? "Back to Dashboard" : "Come Back Tomorrow"}
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
