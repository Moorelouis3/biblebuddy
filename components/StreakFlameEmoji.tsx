"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { ACTIVE_STREAK_FLAME_STORAGE_KEY, normalizeFlameCosmeticId, type FlameCosmeticId } from "../lib/flameCosmetics";

const FLAME_FILTERS: Record<FlameCosmeticId, string> = {
  default: "none",
  orange: "none",
  blue: "hue-rotate(176deg) saturate(1.12) brightness(1.18)",
  gold: "hue-rotate(22deg) saturate(1.45) brightness(1.12)",
  purple: "hue-rotate(215deg) saturate(1.75) brightness(1.02)",
  red: "hue-rotate(342deg) saturate(1.35) brightness(1.02)",
  green: "hue-rotate(92deg) saturate(1.65) brightness(1.05)",
  black: "grayscale(1) contrast(1.45) brightness(0.72)",
};

type Props = {
  flameId?: FlameCosmeticId | string | null;
  size?: number;
  className?: string;
  title?: string;
};

export default function StreakFlameEmoji({ flameId, size = 42, className = "", title }: Props) {
  const [localFlameId, setLocalFlameId] = useState<FlameCosmeticId>(() => normalizeFlameCosmeticId(flameId));

  useEffect(() => {
    if (flameId) {
      setLocalFlameId(normalizeFlameCosmeticId(flameId));
      return;
    }

    function loadActiveFlame(event?: Event) {
      const detailFlameId = (event as CustomEvent<{ flameId?: string }> | undefined)?.detail?.flameId;
      const storedFlameId =
        typeof window !== "undefined" ? window.localStorage.getItem(ACTIVE_STREAK_FLAME_STORAGE_KEY) : null;
      setLocalFlameId(normalizeFlameCosmeticId(detailFlameId || storedFlameId));
    }

    loadActiveFlame();
    window.addEventListener("bb:streak-flame-changed", loadActiveFlame);
    window.addEventListener("storage", loadActiveFlame);
    return () => {
      window.removeEventListener("bb:streak-flame-changed", loadActiveFlame);
      window.removeEventListener("storage", loadActiveFlame);
    };
  }, [flameId]);

  const normalizedFlameId = flameId ? normalizeFlameCosmeticId(flameId) : localFlameId;

  return (
    <span
      className={`inline-block leading-none ${className}`}
      style={{ fontSize: size, filter: FLAME_FILTERS[normalizedFlameId] ?? "none" } as CSSProperties}
      title={title}
      aria-label={title}
      role="img"
    >
      🔥
    </span>
  );
}
