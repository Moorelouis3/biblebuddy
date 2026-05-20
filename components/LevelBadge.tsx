"use client";

import { useEffect, useRef, useState } from "react";
import { LEVEL_DEFINITIONS } from "@/lib/levelSystem";
import { getPremiumSkin, type PremiumSkinId } from "@/lib/premiumSkins";

type Props = {
  currentLevel?: number | null;
  className?: string;
  skinId?: PremiumSkinId | string | null;
};

export default function LevelBadge({ currentLevel, className = "", skinId }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!currentLevel || currentLevel < 1) return null;

  const maxLevel = LEVEL_DEFINITIONS[LEVEL_DEFINITIONS.length - 1]?.level ?? 20;
  const level = Math.min(Math.max(currentLevel, 1), maxLevel);
  const definition = LEVEL_DEFINITIONS.find((d) => d.level === level);
  const skin = getPremiumSkin(skinId);
  const skinButtonStyle = skin
    ? {
        borderColor: skin.palette.accent,
        background: `linear-gradient(135deg, ${skin.palette.accentSoft}, ${skin.palette.surfaceSoft})`,
        color: skin.palette.textPrimary,
        boxShadow: `0 0 0 1px ${skin.palette.accentSoft}, 0 0 14px ${skin.palette.accentSoft}`,
      }
    : undefined;
  const skinPanelStyle = skin
    ? {
        borderColor: skin.palette.cardBorder,
        background: skin.palette.card,
        color: skin.palette.textPrimary,
        boxShadow: `0 18px 44px rgba(0,0,0,0.24), 0 0 28px ${skin.palette.accentSoft}`,
      }
    : undefined;

  return (
    <div ref={rootRef} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-full border border-[#d7dcef] bg-[#f7f8fc] px-1.5 text-[11px] font-semibold leading-none text-[#44506b] transition hover:scale-105"
        style={skinButtonStyle}
        aria-label={`Level ${level} badge`}
        title={`Level ${level} - ${definition?.levelName ?? ""}`}
      >
        {`L${level}`}
      </button>
      {open && definition ? (
        <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-2xl border border-[#e2d9f3] bg-[#faf8ff] p-3 shadow-xl" style={skinPanelStyle}>
          <p className="text-sm font-semibold text-gray-900" style={skin ? { color: skin.palette.textPrimary } : undefined}>
            Level {level} - {definition.levelName}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-600" style={skin ? { color: skin.palette.textSecondary } : undefined}>{definition.identityText}</p>
        </div>
      ) : null}
    </div>
  );
}
