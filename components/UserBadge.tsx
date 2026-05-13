"use client";

import { useState } from "react";
import { resolveUserBadge } from "../lib/userBadges";
import { ModalShell } from "./ModalShell";
import { LouisAvatar } from "./LouisAvatar";

export default function UserBadge({
  customBadge,
  isPaid,
  groupRole,
  proExpiresAt,
  className = "",
}: {
  customBadge?: string | null;
  isPaid?: boolean | null;
  groupRole?: string | null;
  proExpiresAt?: string | null;
  className?: string;
}) {
  const badge = resolveUserBadge({ customBadge, isPaid, groupRole, proExpiresAt });
  const [open, setOpen] = useState(false);

  if (!badge) return null;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition hover:opacity-90 ${badge.className} ${className}`.trim()}
      >
        <span aria-hidden="true">{badge.emoji}</span>
        <span>{badge.label}</span>
      </button>

      <ModalShell isOpen={open} onClose={() => setOpen(false)} backdropColor="bg-black/60">
        <div
          className="mx-4 w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <LouisAvatar mood={badge.louisMood} size={56} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Bible Buddy Badge</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
                    <span aria-hidden="true">{badge.emoji}</span>
                    <span>{badge.label}</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-9 w-9 rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900">{badge.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{badge.description}</p>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
