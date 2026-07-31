"use client";

import { useEffect, useState } from "react";
import { ModalShell } from "./ModalShell";

// Guided step-by-step Add-to-Home-Screen flow for iPhone, which has no install
// prompt API — Apple only allows the manual Share-menu route. One step at a
// time with an illustration of exactly what to tap.

type InstallIOSSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ACCENT = "#2f7fe8";

function ShareButtonIllustration() {
  // Safari's bottom bar with the Share button highlighted.
  return (
    <svg viewBox="0 0 320 130" className="h-full w-full" aria-hidden>
      <rect x="12" y="30" width="296" height="88" rx="18" fill="#f1f5fb" />
      <rect x="30" y="44" width="200" height="34" rx="17" fill="#ffffff" stroke="#dbe4ee" />
      <text x="48" y="66" fontSize="14" fontWeight="600" fill="#64748b">biblebuddy…</text>
      <circle cx="262" cy="61" r="26" fill="#ffffff" stroke={ACCENT} strokeWidth="3" />
      <g stroke={ACCENT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M254 60v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V60" />
        <path d="M262 47v16" />
        <path d="M256.5 52.5 262 47l5.5 5.5" />
      </g>
      <g>
        <path d="M262 18 l-7 9 h14 z" fill={ACCENT} />
      </g>
      <text x="262" y="14" fontSize="11" fontWeight="800" fill={ACCENT} textAnchor="middle">TAP HERE</text>
    </svg>
  );
}

function ShareMenuIllustration() {
  // The share menu with "Add to Home Screen" highlighted.
  return (
    <svg viewBox="0 0 320 130" className="h-full w-full" aria-hidden>
      <rect x="40" y="8" width="240" height="118" rx="16" fill="#f1f5fb" />
      <rect x="54" y="20" width="212" height="26" rx="8" fill="#ffffff" />
      <rect x="66" y="29" width="90" height="8" rx="4" fill="#cbd7e4" />
      <rect x="54" y="52" width="212" height="26" rx="8" fill="#ffffff" />
      <rect x="66" y="61" width="70" height="8" rx="4" fill="#cbd7e4" />
      <rect x="54" y="84" width="212" height="30" rx="10" fill="#ffffff" stroke={ACCENT} strokeWidth="2.5" />
      <rect x="64" y="91" width="16" height="16" rx="4" fill="none" stroke={ACCENT} strokeWidth="2" />
      <path d="M72 95v8M68 99h8" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
      <text x="90" y="103" fontSize="12.5" fontWeight="700" fill="#101827">Add to Home Screen</text>
    </svg>
  );
}

function AddConfirmIllustration() {
  // The confirm screen with Add highlighted in the top corner.
  return (
    <svg viewBox="0 0 320 130" className="h-full w-full" aria-hidden>
      <rect x="40" y="14" width="240" height="102" rx="16" fill="#f1f5fb" />
      <text x="86" y="42" fontSize="12" fontWeight="600" fill="#64748b">Cancel</text>
      <rect x="212" y="26" width="54" height="24" rx="12" fill="#ffffff" stroke={ACCENT} strokeWidth="2.5" />
      <text x="239" y="42" fontSize="13" fontWeight="800" fill={ACCENT} textAnchor="middle">Add</text>
      <rect x="60" y="66" width="36" height="36" rx="9" fill={ACCENT} />
      <text x="78" y="90" fontSize="16" fontWeight="900" fill="#ffffff" textAnchor="middle">B</text>
      <rect x="106" y="72" width="110" height="9" rx="4.5" fill="#cbd7e4" />
      <rect x="106" y="87" width="70" height="9" rx="4.5" fill="#dde6ef" />
      <g>
        <path d="M239 62 l-7-9 h14 z" fill={ACCENT} />
      </g>
      <text x="239" y="76" fontSize="11" fontWeight="800" fill={ACCENT} textAnchor="middle">TAP ADD</text>
    </svg>
  );
}

const STEPS = [
  {
    title: "Tap the Share button",
    detail: "It's at the bottom of Safari — the square with the arrow pointing up.",
    illustration: <ShareButtonIllustration />,
  },
  {
    title: "Tap Add to Home Screen",
    detail: "Scroll down the menu a little — it has a square with a plus in it.",
    illustration: <ShareMenuIllustration />,
  },
  {
    title: "Tap Add in the corner",
    detail: "That's it — Bible Buddy lands on your home screen and opens like an app.",
    illustration: <AddConfirmIllustration />,
  },
];

export default function InstallIOSSheet({ isOpen, onClose }: InstallIOSSheetProps) {
  const [stepIndex, setStepIndex] = useState(0);

  // Fresh start each time the sheet opens.
  useEffect(() => {
    if (isOpen) setStepIndex(0);
  }, [isOpen]);

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} placement="bottom">
      <div className="w-full max-w-md rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-5 pb-6 pt-4 shadow-[0_18px_44px_rgba(14,26,58,0.22)]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--bb-card-border,#dbe7f4)]" />
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/icons/icon-192.png"
              alt=""
              width={30}
              height={30}
              className="h-[30px] w-[30px] shrink-0 rounded-[9px] shadow-[0_2px_6px_rgba(14,26,58,0.25)]"
            />
            <p className="text-sm font-extrabold text-[var(--bb-text-primary,#111827)]">Add Bible Buddy</p>
          </div>
          <span className="rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_12%,var(--bb-card,#ffffff))] px-3 py-1 text-xs font-black text-[var(--bb-accent,#2f7fe8)]">
            Step {stepIndex + 1} of {STEPS.length}
          </span>
        </div>
        <div className="h-[150px] overflow-hidden rounded-[16px] bg-[var(--bb-surface-soft,#f8fbff)]">
          {step.illustration}
        </div>
        <h2 className="mt-4 text-lg font-extrabold leading-snug text-[var(--bb-text-primary,#111827)]">{step.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">{step.detail}</p>
        <div className="mt-2 flex items-center gap-1.5">
          {STEPS.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all ${index === stepIndex ? "w-6 bg-[var(--bb-accent,#2f7fe8)]" : "w-1.5 bg-[var(--bb-card-border,#dbe7f4)]"}`}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={() => setStepIndex(stepIndex - 1)}
              className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] px-5 py-3 text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]"
            >
              Back
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => (isLastStep ? onClose() : setStepIndex(stepIndex + 1))}
            className="flex-1 rounded-full bg-[var(--bb-accent,#2f7fe8)] py-3 text-sm font-bold text-white transition hover:brightness-110"
          >
            {isLastStep ? "Got it, I added it" : "Next"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
