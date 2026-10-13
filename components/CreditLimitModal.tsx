"use client";

import { ModalShell } from "./ModalShell";

// Bible Buddy is free (lib/accessPolicy.ts CORE_STUDY_IS_FREE) and ships in the
// App Store, which forbids pointing people at an outside checkout. This modal
// used to sell a $50 Pro upgrade when daily credits ran out; it now only says
// everything is included and lets the reader carry on. Props are unchanged so
// the many existing importers keep working.
type CreditLimitModalProps = {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onResetComplete?: () => void;
  zIndexClassName?: string;
};

export default function CreditLimitModal({
  open,
  onClose,
  onResetComplete,
  zIndexClassName = "z-[120]",
}: CreditLimitModalProps) {
  const handleContinue = () => {
    onResetComplete?.();
    onClose();
  };

  return (
    <ModalShell isOpen={open} onClose={onClose} zIndex={zIndexClassName} backdropColor="bg-black/70" scrollable={true}>
      <div className="relative w-full max-w-[390px] overflow-hidden rounded-[26px] border border-[#d7e3f4] bg-white p-5 text-center text-[#0f1b33] shadow-[0_22px_62px_rgba(15,23,42,0.28)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#d7e3f4] bg-white/90 text-lg font-black text-[#0f1b33] shadow-sm transition hover:bg-[#f4f8ff]"
        >
          x
        </button>
        <h2 className="mt-2 px-8 text-2xl font-black leading-tight text-[#0b162f]">Everything is free</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#52627b]">
          Every chapter, study note, audio lesson and trivia game in Bible Buddy is included. Keep studying.
        </p>
        <button
          type="button"
          onClick={handleContinue}
          className="mt-4 w-full rounded-2xl bg-[#2f7fe8] px-4 py-3 text-sm font-black text-white transition hover:brightness-105"
        >
          Keep studying
        </button>
      </div>
    </ModalShell>
  );
}
