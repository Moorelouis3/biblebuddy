"use client";

import { ModalShell } from "./ModalShell";

// Bottom sheet with the manual Add-to-Home-Screen steps for iPhone, which has
// no install prompt API — Apple only allows the manual Share-menu route.

type InstallIOSSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const STEPS = [
  "Tap the Share button at the bottom of Safari (the square with the arrow)",
  "Scroll down and tap Add to Home Screen",
  "Tap Add in the top corner",
];

function isIOSSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|OPT\//.test(ua);
}

export default function InstallIOSSheet({ isOpen, onClose }: InstallIOSSheetProps) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} placement="bottom">
      <div className="w-full max-w-md rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 pb-6 pt-4 shadow-[0_18px_44px_rgba(14,26,58,0.22)]">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--bb-card-border,#dbe7f4)]" />
        <div className="mb-4 flex items-center gap-3">
          <img
            src="/icons/icon-192.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-[12px] shadow-[0_2px_6px_rgba(14,26,58,0.25)]"
          />
          <div className="min-w-0">
            <h2 className="text-base font-extrabold leading-snug text-[var(--bb-text-primary,#111827)]">
              Three taps and it&apos;s on your home screen
            </h2>
            {isIOSSafari() ? (
              <p className="mt-1 text-xs font-semibold text-[var(--bb-accent,#2f7fe8)]">
                You&apos;re already in Safari — perfect. iPhone doesn&apos;t allow one-tap installs, so here&apos;s the way:
              </p>
            ) : null}
          </div>
        </div>
        <ol className="space-y-3">
          {STEPS.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_12%,var(--bb-card,#ffffff))] text-xs font-extrabold text-[var(--bb-accent,#2f7fe8)]">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed text-[var(--bb-text-primary,#111827)]">{step}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-[var(--bb-accent,#2f7fe8)] py-3 text-sm font-bold text-white transition hover:brightness-110"
        >
          Got it
        </button>
      </div>
    </ModalShell>
  );
}
