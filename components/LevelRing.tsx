"use client";

import { getRingColorsForLevel, getTierForLevel, getTierStep, clampLevel, getLevelDefinition } from "@/lib/levelSystem";

/**
 * The coloured ring that goes around a profile photo to show a level.
 *
 * Colour carries the tier (five families) and geometry carries the step within
 * it, because twenty hues cannot each be told apart at 32px - the best
 * within-band separation reachable while keeping every colour legible is
 * 1.26-1.55:1, well under the 3:1 WCAG asks of a graphical object. So the ring
 * is never the only signal: it ships alongside LevelBadge, which states the
 * number as text, and it carries the number and name in its own aria-label.
 *
 * Geometry by step: 1 thin, 2 thick, 3 thick + inner hairline, 4 + cap notch,
 * 5 double ring.
 *
 * Use this on profiles, dashboards and other roomy surfaces. In dense rows -
 * comments, messages, feed replies - use LevelBadge alone (Louis, 2026-11-10:
 * a ring at 24px beside a badge and a streak flame is clutter).
 */
export default function LevelRing({
  level,
  size = 48,
  theme = "light",
  progressPercent,
  children,
  className = "",
}: {
  level: number | null | undefined;
  /** Outer diameter in px. */
  size?: number;
  /** Which card the ring sits on. Dark themes need the lighter ring values. */
  theme?: "light" | "dark";
  /**
   * When given, the ring is drawn as an arc filling this much of the circle,
   * with the remainder at low opacity - so the ring shows progress to the next
   * level as well as the level itself.
   */
  progressPercent?: number;
  /** The avatar. Rendered inside the ring's inner circle. */
  children?: React.ReactNode;
  className?: string;
}) {
  if (!level || level < 1) {
    // No level yet: render the avatar with no ring rather than a grey one,
    // which would read as "Level 1" to anybody who knows the system.
    return <span className={`inline-block ${className}`} style={{ width: size, height: size }}>{children}</span>;
  }

  const safe = clampLevel(level);
  const def = getLevelDefinition(safe);
  const tier = getTierForLevel(safe);
  const step = getTierStep(safe);
  const colors = getRingColorsForLevel(safe);
  const stroke = theme === "dark" ? colors.dark : colors.light;

  const thick = step >= 2;
  const hairline = step >= 3;
  const notch = step >= 4;
  const doubleRing = step >= 5;

  const strokeWidth = thick ? size * 0.075 : size * 0.05;
  const outerR = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * outerR;
  const hasProgress = typeof progressPercent === "number" && progressPercent >= 0 && progressPercent < 100;
  const dash = hasProgress ? (Math.max(0, Math.min(100, progressPercent)) / 100) * circumference : circumference;

  const innerInset = strokeWidth + (doubleRing ? size * 0.055 : size * 0.02);
  const innerSize = size - innerInset * 2;

  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Level ${safe} — ${def.levelName}`}
      title={`Level ${safe} — ${def.levelName}`}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {/* The full circle at low opacity. With progressPercent it is the
            remainder behind the arc; without it this is simply overdrawn. */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={outerR}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={hasProgress ? 0.22 : 1}
        />
        {hasProgress ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={outerR}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        ) : null}

        {/* Inner hairline, steps 3+. non-scaling-stroke so it stays 1 CSS px
            at any size and at any device pixel ratio. */}
        {hairline ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={outerR - strokeWidth * 0.85}
            fill="none"
            stroke={stroke}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={0.85}
          />
        ) : null}

        {/* Cap notch at 12 o'clock, step 4+. */}
        {notch ? (
          <rect
            x={size / 2 - strokeWidth * 0.55}
            y={0}
            width={strokeWidth * 1.1}
            height={strokeWidth * 1.9}
            rx={strokeWidth * 0.3}
            fill={stroke}
          />
        ) : null}

        {/* Outer companion ring, step 5 only. */}
        {doubleRing ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={outerR - strokeWidth * 1.7}
            fill="none"
            stroke={stroke}
            strokeWidth={Math.max(1, strokeWidth * 0.45)}
            opacity={0.9}
          />
        ) : null}
      </svg>

      <span
        className="absolute overflow-hidden rounded-full"
        style={{ left: innerInset, top: innerInset, width: innerSize, height: innerSize }}
      >
        {children}
      </span>

      {/* Tier is in the aria-label via the level name; this keeps the tier
          name available to anything reading the DOM without duplicating it
          for screen readers. */}
      <span className="sr-only">{`Tier ${tier.romanNumeral}, ${tier.tierName}`}</span>
    </span>
  );
}
