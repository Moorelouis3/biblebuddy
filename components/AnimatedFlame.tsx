"use client";

import type { CSSProperties } from "react";
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

export default function AnimatedFlame({ flameId, size = 42, className = "", title }: Props) {
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
      if (cached?.id === resolvedFlameId && (!skinLockedFlameId || cached.id === skinLockedFlameId) && cached.light && cached.main && cached.dark) {
        flame = cached;
      }
    } catch {
      // Use the bundled flame palette if the cached colors are unavailable.
    }
  }
  const filterByFlame: Record<string, string> = {
    default: "none",
    orange: "none",
    blue: "hue-rotate(176deg) saturate(1.12) brightness(1.18)",
    gold: "hue-rotate(22deg) saturate(1.45) brightness(1.12)",
    purple: "hue-rotate(215deg) saturate(1.75) brightness(1.02)",
    red: "hue-rotate(342deg) saturate(1.35) brightness(1.02)",
    green: "hue-rotate(92deg) saturate(1.65) brightness(1.05)",
    black: "grayscale(1) contrast(1.45) brightness(0.72)",
  };

  return (
    <span
      className={`bb-animated-flame ${className}`}
      style={
        {
          "--bb-flame-size": `${size}px`,
          "--bb-flame-light": flame.light,
          "--bb-flame-main": flame.main,
          "--bb-flame-dark": flame.dark,
          "--bb-flame-filter": filterByFlame[flame.id] ?? "none",
        } as CSSProperties
      }
      aria-label={title || flame.name}
      title={title || flame.name}
    >
      <span className="bb-animated-flame__shape" aria-hidden="true" />
    </span>
  );
}
