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

  return (
    <span
      className={`bb-animated-flame ${className}`}
      style={
        {
          "--bb-flame-size": `${size}px`,
          "--bb-flame-light": flame.light,
          "--bb-flame-main": flame.main,
          "--bb-flame-dark": flame.dark,
        } as CSSProperties
      }
      aria-label={title || flame.name}
      title={title || flame.name}
    >
      <span className="bb-animated-flame__body" aria-hidden="true">
        <span className="bb-animated-flame__core" />
      </span>
    </span>
  );
}
