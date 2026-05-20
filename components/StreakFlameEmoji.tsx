"use client";

import type { CSSProperties } from "react";
import { useId } from "react";
import {
  ACTIVE_STREAK_FLAME_COLORS_STORAGE_KEY,
  ACTIVE_STREAK_FLAME_STORAGE_KEY,
  getFlameCosmetic,
  getDocumentPremiumSkinFlameId,
  normalizeFlameCosmeticId,
  type FlameCosmetic,
  type FlameCosmeticId,
} from "../lib/flameCosmetics";

type Props = {
  flameId?: FlameCosmeticId | string | null;
  size?: number;
  className?: string;
  title?: string;
};

export default function StreakFlameEmoji({ flameId, size = 42, className = "", title }: Props) {
  const storedFlameId =
    typeof window !== "undefined" ? window.localStorage.getItem(ACTIVE_STREAK_FLAME_STORAGE_KEY) : null;
  const skinLockedFlameId = getDocumentPremiumSkinFlameId();
  const resolvedFlameId = flameId == null
    ? skinLockedFlameId ?? normalizeFlameCosmeticId(storedFlameId)
    : normalizeFlameCosmeticId(flameId);
  let flame = getFlameCosmetic(resolvedFlameId);
  if (typeof window !== "undefined") {
    try {
      const cached = JSON.parse(window.localStorage.getItem(ACTIVE_STREAK_FLAME_COLORS_STORAGE_KEY) || "null") as FlameCosmetic | null;
      if (
        cached?.id === resolvedFlameId &&
        (!skinLockedFlameId || cached.id === skinLockedFlameId) &&
        typeof cached.light === "string" &&
        typeof cached.main === "string" &&
        typeof cached.dark === "string"
      ) {
        flame = cached;
      }
    } catch {
      // Ignore corrupt cached flame colors and use the bundled palette.
    }
  }
  const gradientId = useId().replace(/:/g, "");
  const outerGradientId = `flame-outer-${gradientId}`;
  const innerGradientId = `flame-inner-${gradientId}`;
  const glowGradientId = `flame-glow-${gradientId}`;

  return (
    <span
      className={`inline-grid place-items-center leading-none ${className}`}
      style={{ width: size, height: size } as CSSProperties}
      title={title}
      aria-label={title || flame.name}
      role="img"
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
        className="block overflow-visible"
      >
        <defs>
          <radialGradient id={glowGradientId} cx="50%" cy="74%" r="56%">
            <stop offset="0%" stopColor={flame.main} stopOpacity="0.32" />
            <stop offset="100%" stopColor={flame.main} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={outerGradientId} x1="20%" y1="8%" x2="78%" y2="96%">
            <stop offset="0%" stopColor={flame.light} />
            <stop offset="38%" stopColor={flame.main} />
            <stop offset="100%" stopColor={flame.dark} />
          </linearGradient>
          <linearGradient id={innerGradientId} x1="34%" y1="22%" x2="70%" y2="96%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="38%" stopColor={flame.light} />
            <stop offset="100%" stopColor={flame.main} />
          </linearGradient>
        </defs>
        <ellipse cx="32" cy="47" rx="22" ry="15" fill={`url(#${glowGradientId})`} />
        <path
          d="M34 3C42 14 52 21 55 35c3 15-8 27-23 27S7 53 9 38c1-9 6-15 12-22-1 8 2 13 7 15-2-12 1-20 6-28Z"
          fill={`url(#${outerGradientId})`}
        />
        <path
          d="M34 18c6 8 13 15 13 25 0 10-7 17-16 17-8 0-14-6-14-14 0-6 3-11 8-16 0 7 3 11 7 12-2-9 0-17 2-24Z"
          fill={`url(#${innerGradientId})`}
          opacity="0.96"
        />
        <path
          d="M27 47c0-5 3-9 7-14 4 6 7 10 7 15 0 6-4 10-8 10-4 0-6-4-6-11Z"
          fill="#FFFFFF"
          opacity="0.44"
        />
      </svg>
    </span>
  );
}
