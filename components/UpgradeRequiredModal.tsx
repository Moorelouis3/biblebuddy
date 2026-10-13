"use client";

import { ModalShell } from "./ModalShell";

// Bible Buddy is free (lib/accessPolicy.ts CORE_STUDY_IS_FREE) and ships in the
// App Store, which forbids pointing people at an outside checkout. This modal
// used to sell a $50 lifetime Pro plan via Stripe; it now never starts a
// checkout and only tells the reader everything is included. Props are
// unchanged so existing importers (chat, trivia, reading plans,
// ScrambledUpgradeGate) keep working.
type UpgradeRequiredModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UpgradeRequiredModal({ isOpen, onClose }: UpgradeRequiredModalProps) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} backdropColor="bg-black/60">
      <div className="relative w-full max-w-[380px] overflow-hidden rounded-[24px] border border-[#d7e3f4] bg-white px-5 py-5 text-center text-[#0f1b33] shadow-[0_20px_58px_rgba(15,23,42,0.28)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#d7e3f4] bg-white/90 text-lg font-black text-[#0f1b33] shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition hover:bg-[#f4f8ff]"
          aria-label="Close"
        >
          x
        </button>
        <h2 className="mt-2 px-8 text-2xl font-black leading-tight text-[#0b162f]">Everything is free</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#52627b]">
          Full study notes, audio lessons and every trivia game are included for everyone. Keep studying.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-2xl bg-[#2f7fe8] px-4 py-3 text-sm font-black text-white transition hover:brightness-105"
        >
          Keep studying
        </button>
      </div>
    </ModalShell>
  );
}
