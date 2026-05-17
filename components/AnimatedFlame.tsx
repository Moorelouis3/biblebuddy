"use client";

import type { CSSProperties } from "react";
import { getFlameCosmetic, type FlameCosmeticId } from "../lib/flameCosmetics";

type Props = {
  flameId?: FlameCosmeticId | string | null;
  size?: number;
  className?: string;
  title?: string;
};

export default function AnimatedFlame({ flameId, size = 42, className = "", title }: Props) {
  const flame = getFlameCosmetic(flameId);
  const filterByFlame: Record<string, string> = {
    default: "none",
    orange: "none",
    blue: "hue-rotate(165deg) saturate(1.9) brightness(1.08)",
    gold: "hue-rotate(22deg) saturate(1.45) brightness(1.12)",
    purple: "hue-rotate(215deg) saturate(1.75) brightness(1.02)",
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
      <span className="bb-animated-flame__emoji" aria-hidden="true">🔥</span>
    </span>
  );
}
