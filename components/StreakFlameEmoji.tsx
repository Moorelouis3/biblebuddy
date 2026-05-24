"use client";

import type { CSSProperties } from "react";
import { useEffect, useId, useState } from "react";
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
  currentStreak?: number | null;
  size?: number;
  className?: string;
  title?: string;
};

export default function StreakFlameEmoji({ flameId, currentStreak, size = 42, className = "", title }: Props) {
  const initialFlameId = flameId == null ? "default" : normalizeFlameCosmeticId(flameId);
  const [flame, setFlame] = useState<FlameCosmetic>(() => getFlameCosmetic(initialFlameId));
  const hasStreakProgress = typeof currentStreak === "number";
  const streakDays = Math.max(0, Math.floor(currentStreak ?? 0));
  const isLocked = hasStreakProgress && streakDays <= 0;
  const isBuilding = hasStreakProgress && streakDays > 0 && streakDays < 30;
  const isEarned = hasStreakProgress && streakDays >= 30;
  const [buildingColorVisible, setBuildingColorVisible] = useState(!isBuilding);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedFlameId = window.localStorage.getItem(ACTIVE_STREAK_FLAME_STORAGE_KEY);
      const skinLockedFlameId = getDocumentPremiumSkinFlameId();
      const resolvedFlameId = flameId == null
        ? skinLockedFlameId ?? normalizeFlameCosmeticId(storedFlameId)
        : normalizeFlameCosmeticId(flameId);
      let nextFlame = getFlameCosmetic(resolvedFlameId);
      try {
        const cached = JSON.parse(window.localStorage.getItem(ACTIVE_STREAK_FLAME_COLORS_STORAGE_KEY) || "null") as FlameCosmetic | null;
        if (
          cached?.id === resolvedFlameId &&
          (!skinLockedFlameId || cached.id === skinLockedFlameId) &&
          typeof cached.light === "string" &&
          typeof cached.main === "string" &&
          typeof cached.dark === "string"
        ) {
          nextFlame = cached;
        }
      } catch {
        // Ignore corrupt cached flame colors and use the bundled palette.
      }
      setFlame(nextFlame);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [flameId]);

  useEffect(() => {
    if (!isBuilding) {
      return;
    }

    const cycleMs = 4000;
    const progress = Math.max(0, Math.min(1, (streakDays - 1) / 28));
    const colorMs = 1000 + progress * 2850;

    function syncColorPhase() {
      const cyclePosition = Date.now() % cycleMs;
      setBuildingColorVisible(cyclePosition >= cycleMs - colorMs);
    }

    syncColorPhase();
    const timer = window.setInterval(syncColorPhase, 180);
    return () => window.clearInterval(timer);
  }, [isBuilding, streakDays]);

  const gradientId = useId().replace(/:/g, "");
  const outerGradientId = `flame-outer-${gradientId}`;
  const innerGradientId = `flame-inner-${gradientId}`;
  const glowGradientId = `flame-glow-${gradientId}`;
  const postThirtyProgress = Math.max(0, Math.min(1, (streakDays - 30) / 70));
  const earnedPulseDuration = 2.65 - postThirtyProgress * 0.95;
  const earnedPulseScale = 1.025 + postThirtyProgress * 0.04;
  const flameStageClass = isEarned
    ? "bb-streak-flame-earned-motion"
    : isLocked
      ? "bb-streak-flame-building-gray"
    : isBuilding && !buildingColorVisible
      ? "bb-streak-flame-building-gray"
      : isBuilding
        ? "bb-streak-flame-building-color"
        : "";
  const flameStyle = {
    width: size,
    height: size,
    color: flame.main,
    "--bb-streak-earned-duration": `${earnedPulseDuration}s`,
    "--bb-streak-earned-scale": earnedPulseScale,
  } as CSSProperties;

  return (
    <span
      className={`inline-grid place-items-center leading-none ${flameStageClass} ${className}`}
      style={flameStyle}
      title={title}
      aria-label={title || flame.name}
      role="img"
    >
      <style>{`
        .bb-streak-flame-building-gray svg {
          filter: grayscale(1) saturate(0.15) brightness(0.82);
          opacity: 0.52;
          transform: scale(0.98);
          transition: filter 320ms ease, opacity 320ms ease, transform 320ms ease;
        }
        .bb-streak-flame-building-color svg {
          filter: grayscale(0) saturate(1) brightness(1);
          opacity: 1;
          transform: scale(1);
          transition: filter 320ms ease, opacity 320ms ease, transform 320ms ease;
        }
        .bb-streak-flame-earned-motion svg {
          transform-origin: 50% 92%;
          animation: bb-streak-flame-earned-motion var(--bb-streak-earned-duration, 2.4s) ease-in-out infinite;
          filter: drop-shadow(0 0 10px color-mix(in srgb, currentColor 22%, transparent));
        }
        .bb-streak-flame-earned-motion .bb-streak-flame-glow {
          animation: bb-streak-flame-glow var(--bb-streak-earned-duration, 2.4s) ease-in-out infinite;
        }
        @keyframes bb-streak-flame-earned-motion {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(-1.2deg);
          }
          34% {
            transform: translateY(-1px) scale(var(--bb-streak-earned-scale, 1.035)) rotate(1.4deg);
          }
          68% {
            transform: translateY(0.5px) scale(1.01) rotate(-0.8deg);
          }
        }
        @keyframes bb-streak-flame-glow {
          0%, 100% { opacity: 0.82; transform: scale(1); }
          45% { opacity: 1; transform: scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bb-streak-flame-earned-motion svg,
          .bb-streak-flame-earned-motion .bb-streak-flame-glow {
            animation: none !important;
          }
        }
      `}</style>
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
        <ellipse className="bb-streak-flame-glow" cx="32" cy="47" rx="22" ry="15" fill={`url(#${glowGradientId})`} />
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
