"use client";

import { useRouter } from "next/navigation";
import { ModalShell } from "./ModalShell";

interface GlobalUpdateModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export function GlobalUpdateModal({ isOpen, onDismiss }: GlobalUpdateModalProps) {
  const router = useRouter();

  function handleExplore() {
    onDismiss();
    router.push("/dashboard");
  }

  return (
    <ModalShell isOpen={isOpen} onClose={onDismiss} zIndex="z-[200]" backdropColor="bg-black/70">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10"
        role="dialog"
        aria-modal="true"
        aria-label="Bible Buddy update"
      >
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl font-black leading-none text-slate-900 shadow-sm transition hover:bg-white"
          aria-label="Close update"
        >
          x
        </button>

        <img
          src="/updatebanner2026.png"
          alt="Bible Buddy update"
          className="block w-full bg-[#f3f7fd]"
        />

        <div className="bg-white px-5 pb-5 pt-4">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleExplore}
              className="w-full rounded-2xl bg-[#7BAFD4] px-4 py-3 text-sm font-black text-slate-950 shadow-md transition hover:bg-[#6aa3cc]"
            >
              Open Bible Buddy
            </button>
            <button
              type="button"
              onClick={onDismiss}
              className="w-full rounded-2xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-200"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
