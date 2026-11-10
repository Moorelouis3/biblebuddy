"use client";

import { useEffect, useRef } from "react";
import { ModalShell } from "./ModalShell";
import { fireConfettiBurst, confettiForLevel, prefersReducedMotion } from "@/lib/celebration";
import {
  getLevelDefinition,
  getTierForLevel,
  getRingColorsForLevel,
  isMilestoneLevel,
  clampLevel,
  MAX_LEVEL,
} from "@/lib/levelSystem";

/**
 * "You reached Level 10" - the Golden Badge celebration, approved by Louis on
 * 2026-11-10 (docs/LEVELS_POPUP_GOLDEN_BADGE_2026-11-10.md §8, §9).
 *
 * The design brief, and the reason it looks like this:
 *
 * The first version of this was a dark navy card with gold on it, and Louis
 * rejected it - "it looks like a separate game screen rather than something
 * that belongs inside our app". He was right: it used none of the 17 theme
 * tokens in lib/appThemes.ts, so it was wrong on all 17 - nearly the card
 * colour on Dark, a hole in the page on the six pastels.
 *
 * So every surface here is a theme token: the card is --bb-card, the crest band
 * is --bb-accent-soft, text is the three text tokens, the bar is
 * --bb-progress-track/-fill, the button is --bb-button/--bb-button-text. It
 * follows the house celebration style set by DevotionalDayCompletionModal: a
 * light tinted card, a big radius, an uppercase pill, decoration drawn in SVG
 * rather than shipped as an asset, one full-width primary button.
 *
 * The gold shield is the single exception and stays gold on every theme. It is
 * what marks the moment as earned rather than as a notice, and a shield
 * recoloured to match a pastel theme stops looking like an achievement. It gets
 * away with being fixed because it sits on --bb-accent-soft inside its own dark
 * core, so it never has to contrast with the card.
 *
 * Two contrast faults were found by computing every element against all 17
 * themes, and both fixes are load-bearing - do not remove either:
 *
 *  1. The crest band is only 1.13:1 against the card on Light and under 1.20:1
 *     on seven themes, and the drawn curve is filled with the card colour so it
 *     vanished too. The 1px --bb-card-border hairline along the curve is what
 *     makes the band read at all. cardBorder against card is 1.30:1 at worst on
 *     all 17.
 *  2. The shield's dark-gold outline is only 2.46:1 against Dark's accentSoft.
 *     The shield therefore carries a double stroke - dark #8A6410 inside, light
 *     #E9C566 outside - so one of the two always clears 3:1. Worst best-of-two
 *     is 4.17:1, on Purple.
 *
 * Milestones are the same card with the dial turned up, not a different popup.
 * 5, 10, 15 and 20 are where the ring changes colour family, so they are the
 * one moment the user's visible identity changes - they add the tier banner and
 * the sparks. Every level fires confetti; only the duration changes
 * (lib/celebration.ts confettiForLevel).
 *
 * Costs nothing per page load: it renders only when LevelProgressCard's
 * existing /api/points/summary response says the level rose, and it adds no
 * fetch, no interval, no subscription of its own.
 */

const GOLD_DARK = "#8A6410";
const GOLD_LIGHT = "#E9C566";

/** Fixed, not Math.random() in render - the idiom from BuddyCelebrationModal. */
const SPARKS: Array<{ x: number; y: number; r: number; o: number }> = [
  { x: 20, y: 24, r: 2.6, o: 0.8 },
  { x: 220, y: 32, r: 2.2, o: 0.7 },
  { x: 30, y: 84, r: 2.0, o: 0.6 },
  { x: 212, y: 92, r: 2.4, o: 0.75 },
  { x: 12, y: 56, r: 1.8, o: 0.55 },
  { x: 230, y: 66, r: 1.8, o: 0.55 },
  { x: 46, y: 14, r: 1.7, o: 0.5 },
  { x: 196, y: 18, r: 1.9, o: 0.55 },
  { x: 120, y: 10, r: 1.6, o: 0.45 },
  { x: 66, y: 106, r: 1.6, o: 0.4 },
  { x: 176, y: 110, r: 1.7, o: 0.45 },
  { x: 100, y: 18, r: 1.4, o: 0.4 },
];

function sparkCountForLevel(level: number): number {
  if (level >= 20) return 12;
  if (level === 15) return 10;
  if (level === 10) return 8;
  if (level === 5) return 6;
  return 0;
}

export type LevelUpCelebrationProps = {
  level: number;
  /** Lifetime XP, already computed by /api/points/summary. */
  totalPoints: number;
  /** XP still needed for the next level. 0 at the top. */
  pointsToNextLevel: number;
  /** Name of the next level, or null at the top. */
  nextLevelName: string | null;
  /** Progress through the current level, 0-100. */
  progressPercent: number;
  /** First name, for the personal line. Null is fine - the line adapts. */
  displayName?: string | null;
  /** Called when the user dismisses. Must acknowledge so it cannot fire again. */
  onDismiss: () => void;
};

/**
 * The sentence above the encouragement.
 *
 * Says what the level cost, because that is what makes it read as an
 * achievement rather than a notification. display_name is null for a lot of
 * accounts since onboarding was removed in October 2026, so every line has to
 * work without a name.
 */
function personalLine(level: number, name: string | null | undefined): string {
  const first = (name || "").trim().split(/\s+/)[0] || "";
  const you = first ? `${first}, ` : "";
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  if (level >= 20) return first ? `${you}you've read a Bible's worth.` : "You've read a Bible's worth.";
  if (level === 15) return first ? `${you}a year of daily study.` : "A year of daily study.";
  if (level === 10) return first ? `${you}four months in the Word.` : "Four months in the Word.";
  if (level === 5) return first ? `${you}you've read your first month.` : "You've read your first month.";
  if (level === 2) return first ? `Well done, ${first}. You read your first chapter.` : "You read your first chapter.";
  return first ? cap(`${you}that is another level of steady study.`) : "That is another level of steady study.";
}

export default function LevelUpCelebration({
  level,
  totalPoints,
  pointsToNextLevel,
  nextLevelName,
  progressPercent,
  displayName,
  onDismiss,
}: LevelUpCelebrationProps) {
  const safeLevel = clampLevel(level);
  const def = getLevelDefinition(safeLevel);
  const tier = getTierForLevel(safeLevel);
  const ring = getRingColorsForLevel(safeLevel);
  const milestone = isMilestoneLevel(safeLevel);
  const isTop = safeLevel >= MAX_LEVEL;
  const sparks = SPARKS.slice(0, sparkCountForLevel(safeLevel));
  const headingId = `levelup-heading-${safeLevel}`;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<Element | null>(null);

  // Confetti at every level. fireConfettiBurst is a no-op under reduced
  // motion, so there is no branch here.
  useEffect(() => {
    const stop = fireConfettiBurst(confettiForLevel(safeLevel));
    return stop;
  }, [safeLevel]);

  // Focus in on open, back to wherever it was on close, and Escape to dismiss.
  // ModalShell handles the portal and the scroll lock; focus is ours.
  useEffect(() => {
    previouslyFocused.current = typeof document !== "undefined" ? document.activeElement : null;
    panelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onDismiss();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const back = previouslyFocused.current as HTMLElement | null;
      if (back && typeof back.focus === "function") back.focus();
    };
  }, [onDismiss]);

  const reduced = prefersReducedMotion();

  return (
    <ModalShell isOpen onClose={onDismiss} backdropColor="bg-black/60" scrollable zIndex="z-[9995]">
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="w-full max-w-sm overflow-hidden rounded-[30px] shadow-2xl outline-none"
        style={{
          backgroundColor: "var(--bb-card, #ffffff)",
          border: "1px solid var(--bb-card-border, #d8e3ec)",
        }}
      >
        {/* ── Crest band ─────────────────────────────────────────────────── */}
        <div
          className="relative text-center"
          style={{
            backgroundColor: "var(--bb-accent-soft, #eaf2ff)",
            padding: milestone ? "14px 16px 6px" : "20px 16px 6px",
          }}
        >
          {sparks.length > 0 ? (
            <svg
              viewBox="0 0 240 150"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <g fill={GOLD_LIGHT}>
                {sparks.map((s, i) => (
                  <circle key={i} cx={s.x} cy={s.y} r={s.r} opacity={s.o} />
                ))}
              </g>
            </svg>
          ) : null}

          {/* The drawn divider, plus the hairline that is the only reason the
              band reads on Light. Both are needed: the fill hides the band's
              lower edge, the stroke draws it back in a colour guaranteed to
              contrast with the card. */}
          <svg
            viewBox="0 0 240 22"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-[20px] w-full"
            style={{ bottom: -1 }}
          >
            <path
              d="M0 13 C56 2 102 19 148 9 C190 2 218 13 240 7 L240 22 L0 22 Z"
              fill="var(--bb-card, #ffffff)"
            />
            <path
              d="M0 13 C56 2 102 19 148 9 C190 2 218 13 240 7"
              fill="none"
              stroke="var(--bb-card-border, #d8e3ec)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {milestone ? (
            <p
              className="relative inline-block rounded-[10px] px-[9px] py-[3px] text-[9px] font-black uppercase"
              style={{
                letterSpacing: "0.14em",
                color: "var(--bb-accent, #0056fd)",
                backgroundColor: "var(--bb-card, #ffffff)",
                border: "1px solid var(--bb-card-border, #d8e3ec)",
              }}
            >
              {isTop ? "Top level" : `Tier ${tier.romanNumeral} · ${tier.tierName}`}
            </p>
          ) : null}

          <div className="relative mt-0.5 flex justify-center">
            <Shield
              level={safeLevel}
              coreColor={tier.coreColor}
              ringColor={ring.ringOnCore}
              crowned={isTop}
              animate={!reduced}
            />
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="px-4 pb-4 pt-0 text-center sm:px-5 sm:pb-5">
          <Ribbon label={isTop ? "Top of the ladder" : "Level up"} animate={!reduced} />

          <h2
            id={headingId}
            className="mt-2 text-[21px] font-black leading-tight sm:text-[23px]"
            style={{ color: "var(--bb-text-primary, #101827)" }}
          >
            {def.levelName}
          </h2>
          <p
            className="mt-0.5 text-[11px] font-bold"
            style={{ color: "var(--bb-text-muted, #64748b)" }}
          >
            {`Level ${safeLevel}`}
            {milestone && !isTop ? " · a new tier" : ""}
          </p>

          <p
            className="mt-2 text-[12.5px] font-semibold leading-relaxed"
            style={{ color: "var(--bb-text-secondary, #334155)" }}
          >
            {personalLine(safeLevel, displayName)}
          </p>

          <p
            className="mt-2 rounded-[14px] px-3 py-2.5 text-[12px] font-bold leading-relaxed"
            style={{
              backgroundColor: "var(--bb-surface-soft, #eef4f8)",
              color: "var(--bb-text-primary, #101827)",
            }}
          >
            {def.encouragementText}
          </p>

          {nextLevelName ? (
            <div className="mt-3">
              <div
                className="h-1.5 overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--bb-progress-track, #d8e3ec)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(0, Math.min(100, progressPercent))}%`,
                    backgroundColor: "var(--bb-progress-fill, #0056fd)",
                  }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[10.5px] font-bold" style={{ color: "var(--bb-text-muted, #64748b)" }}>
                  {`${totalPoints.toLocaleString()} XP`}
                </span>
                <span className="text-[10.5px] font-bold" style={{ color: "var(--bb-text-muted, #64748b)" }}>
                  {`${pointsToNextLevel.toLocaleString()} to ${nextLevelName}`}
                </span>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-[17px] font-black" style={{ color: "var(--bb-accent, #0056fd)" }}>
              {`${totalPoints.toLocaleString()} XP`}
            </p>
          )}

          <button
            type="button"
            onClick={onDismiss}
            className="mt-3 w-full rounded-[14px] px-5 py-3 text-[13px] font-black transition active:scale-[0.99]"
            style={{
              backgroundColor: "var(--bb-button, #0056fd)",
              color: "var(--bb-button-text, #ffffff)",
            }}
          >
            {isTop ? "Amen" : "Keep going"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

/**
 * The shield, drawn rather than fetched.
 *
 * Four layers, outside in: the light-gold outer stroke, the gold plate with its
 * dark-gold inner stroke, the tier's deep core, and the level's own ring on
 * that core. The two gold strokes are the double-stroke fix - on a dark crest
 * band the light one carries the edge, on a light band the dark one does.
 */
function Shield({
  level,
  coreColor,
  ringColor,
  crowned,
  animate,
}: {
  level: number;
  coreColor: string;
  ringColor: string;
  crowned: boolean;
  animate: boolean;
}) {
  const digits = String(level);
  const fontSize = digits.length > 1 ? 30 : 34;

  if (crowned) {
    return (
      <svg
        viewBox="0 0 150 140"
        className={`h-[105px] w-[112px] ${animate ? "bb-levelup-shield" : ""}`}
        aria-hidden="true"
      >
        <GoldDefs />
        <path d="M75 4 L83 15 L93 8 L90 22 L60 22 L57 8 L67 15 Z" fill="url(#bbLevelGoldFlat)" />
        <Laurel x={2} y={24} w={44} h={100} />
        <Laurel x={104} y={24} w={44} h={100} right />
        <path d="M28 116 C46 130 104 130 122 116" fill="none" stroke="url(#bbLevelGoldFlat)" strokeWidth={3} strokeLinecap="round" />
        <path d="M75 24 L116 38 V76 C116 100 97 117 75 125 C53 117 34 100 34 76 V38 Z" fill="none" stroke={GOLD_LIGHT} strokeWidth={3} />
        <path d="M75 26 L114 39 V76 C114 99 96 115 75 122 C54 115 36 99 36 76 V39 Z" fill="url(#bbLevelGold)" stroke={GOLD_DARK} strokeWidth={1} />
        <path d="M75 37 L105 48 V76 C105 95 90 109 75 115 C60 109 45 95 45 76 V48 Z" fill={coreColor} />
        <path d="M75 37 L105 48 V76 C105 95 90 109 75 115 C60 109 45 95 45 76 V48 Z" fill="none" stroke={ringColor} strokeWidth={2.4} />
        <text x={75} y={88} textAnchor="middle" fontSize={fontSize} fontWeight={700} fill="#FFFFFF">
          {digits}
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 136 122"
      className={`h-[93px] w-[104px] ${animate ? "bb-levelup-shield" : ""}`}
      aria-hidden="true"
    >
      <GoldDefs />
      <Laurel x={0} y={14} w={42} h={94} />
      <Laurel x={94} y={14} w={42} h={94} right />
      <path d="M68 8 L110 22 V60 C110 84 91 101 68 109 C45 101 26 84 26 60 V22 Z" fill="none" stroke={GOLD_LIGHT} strokeWidth={3} />
      <path d="M68 10 L108 23 V60 C108 83 90 99 68 106 C46 99 28 83 28 60 V23 Z" fill="url(#bbLevelGold)" stroke={GOLD_DARK} strokeWidth={1} />
      <path d="M68 21 L99 32 V60 C99 79 84 93 68 99 C52 93 37 79 37 60 V32 Z" fill={coreColor} />
      <path d="M68 21 L99 32 V60 C99 79 84 93 68 99 C52 93 37 79 37 60 V32 Z" fill="none" stroke={ringColor} strokeWidth={2.4} />
      <text x={68} y={digits.length > 1 ? 72 : 73} textAnchor="middle" fontSize={fontSize} fontWeight={700} fill="#FFFFFF">
        {digits}
      </text>
    </svg>
  );
}

function GoldDefs() {
  return (
    <defs>
      <linearGradient id="bbLevelGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FBEFB4" />
        <stop offset="0.38" stopColor="#E3BA4E" />
        <stop offset="0.72" stopColor="#C29121" />
        <stop offset="1" stopColor={GOLD_DARK} />
      </linearGradient>
      <linearGradient id="bbLevelGoldFlat" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={GOLD_LIGHT} />
        <stop offset="1" stopColor="#A97C14" />
      </linearGradient>
    </defs>
  );
}

/**
 * One laurel branch, drawn twice.
 *
 * Positioned with an explicit translate+scale rather than a nested <svg> with
 * x/y/width/height. The nested-svg form renders differently once it sits inside
 * a transformed <g> - the browser scales the inner viewBox against the outer
 * one and the branch came out small and shoved against the shield. A plain
 * transform is deterministic: the branch is authored in a 46x108 box, so the
 * scale factors are just the target size over that.
 *
 * `right` mirrors the branch by translating to the far edge and scaling x by
 * -1, which keeps both copies the same distance from the shield.
 */
function Laurel({ x, y, w, h, right = false }: { x: number; y: number; w: number; h: number; right?: boolean }) {
  const sx = w / 46;
  const sy = h / 108;
  const transform = right
    ? `translate(${x + w}, ${y}) scale(${-sx}, ${sy})`
    : `translate(${x}, ${y}) scale(${sx}, ${sy})`;
  return (
    <g transform={transform}>
      <path d="M40 6 C16 26 8 58 14 102" fill="none" stroke="url(#bbLevelGoldFlat)" strokeWidth={3.4} strokeLinecap="round" />
      <g fill="url(#bbLevelGoldFlat)">
        <ellipse cx={33} cy={15} rx={8.6} ry={4.4} transform="rotate(-42 33 15)" />
        <ellipse cx={25} cy={29} rx={9.1} ry={4.6} transform="rotate(-30 25 29)" />
        <ellipse cx={19} cy={44} rx={9.4} ry={4.7} transform="rotate(-18 19 44)" />
        <ellipse cx={15} cy={60} rx={9.4} ry={4.7} transform="rotate(-8 15 60)" />
        <ellipse cx={14} cy={76} rx={8.8} ry={4.4} transform="rotate(2 14 76)" />
      </g>
    </g>
  );
}

function Ribbon({ label, animate }: { label: string; animate: boolean }) {
  const long = label.length > 10;
  return (
    <div
      className={`relative mx-auto block overflow-hidden ${animate ? "bb-levelup-ribbon" : ""}`}
      style={{ width: long ? 168 : 142, marginTop: -8 }}
    >
      <svg viewBox="0 0 200 30" className="block w-full" aria-hidden="true">
        <defs>
          <linearGradient id="bbRibbonGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={GOLD_LIGHT} />
            <stop offset="1" stopColor="#A97C14" />
          </linearGradient>
        </defs>
        <path d={long ? "M5 3 H195 L185 16 L195 28 H5 L15 16 Z" : "M7 3 H193 L184 16 L193 28 H7 L16 16 Z"} fill="url(#bbRibbonGold)" />
        <text
          x={100}
          y={21}
          textAnchor="middle"
          fontSize={long ? 11.5 : 12}
          fontWeight={500}
          letterSpacing={long ? 1.4 : 2}
          fill="#3B2A05"
          style={{ textTransform: "uppercase" }}
        >
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}
