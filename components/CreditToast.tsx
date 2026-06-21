"use client";

import React, { useEffect } from "react";

interface CreditToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function CreditToast({ open, onClose, message }: CreditToastProps) {
  useEffect(() => {
    if (!open) return undefined;

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [open, onClose]);

  if (!open || !message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[200] flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-white px-4 py-3 text-[13px] font-bold text-[var(--bb-text-primary,#111827)] shadow-[0_14px_34px_rgba(15,23,42,0.14)]">
        <span
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--bb-accent-soft,#eaf5ff)] text-[var(--bb-accent,#2f7fe8)]"
          aria-hidden="true"
        >
          C
        </span>
        <span className="min-w-0 flex-1 leading-5">{message}</span>
        <button
          type="button"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-bold text-[var(--bb-text-muted,#6b7280)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)] hover:text-[var(--bb-text-primary,#111827)]"
          onClick={onClose}
          aria-label="Close credit message"
        >
          x
        </button>
      </div>
    </div>
  );
}
