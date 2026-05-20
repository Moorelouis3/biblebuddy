"use client";

import { useState } from "react";
import { resolveUserBadge } from "../lib/userBadges";
import { ModalShell } from "./ModalShell";
import { LouisAvatar } from "./LouisAvatar";
import { getPremiumSkin, type PremiumSkinId } from "../lib/premiumSkins";

export default function UserBadge({
  customBadge,
  isPaid,
  groupRole,
  proExpiresAt,
  className = "",
  skinId,
}: {
  customBadge?: string | null;
  isPaid?: boolean | null;
  groupRole?: string | null;
  proExpiresAt?: string | null;
  className?: string;
  skinId?: PremiumSkinId | string | null;
}) {
  const badge = resolveUserBadge({ customBadge, isPaid, groupRole, proExpiresAt });
  const [open, setOpen] = useState(false);

  if (!badge) return null;

  const skin = getPremiumSkin(skinId);
  const badgeStyle = skin
    ? {
        borderColor: skin.palette.accent,
        background: `linear-gradient(135deg, ${skin.palette.accentSoft}, ${skin.palette.surfaceSoft})`,
        color: skin.palette.textPrimary,
        boxShadow: `0 0 0 1px ${skin.palette.accentSoft}, 0 0 16px ${skin.palette.accentSoft}`,
      }
    : undefined;
  const modalStyle = skin
    ? {
        borderColor: skin.palette.cardBorder,
        background: skin.palette.card,
        color: skin.palette.textPrimary,
        boxShadow: `0 24px 70px rgba(0,0,0,0.34), 0 0 34px ${skin.palette.accentSoft}`,
      }
    : undefined;

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
        style={badgeStyle}
      >
        <span aria-hidden="true">{badge.emoji}</span>
        <span>{badge.label}</span>
      </button>

      <ModalShell isOpen={open} onClose={() => setOpen(false)} backdropColor="bg-black/60">
        <div
          className="mx-4 w-full max-w-sm rounded-3xl border border-transparent bg-white p-5 shadow-2xl"
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <LouisAvatar mood={badge.louisMood} size={56} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400" style={skin ? { color: skin.palette.textMuted } : undefined}>Bible Buddy Badge</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`} style={badgeStyle}>
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
              style={skin ? { color: skin.palette.textSecondary } : undefined}
            >
              ×
            </button>
          </div>

          <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3" style={skin ? { background: skin.palette.surfaceSoft } : undefined}>
            <p className="text-sm font-semibold text-gray-900" style={skin ? { color: skin.palette.textPrimary } : undefined}>{badge.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600" style={skin ? { color: skin.palette.textSecondary } : undefined}>{badge.description}</p>
          </div>
        </div>
      </ModalShell>
    </>
  );
}
