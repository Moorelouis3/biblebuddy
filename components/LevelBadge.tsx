"use client";

import { useEffect, useRef, useState } from "react";
import { LEVEL_DEFINITIONS } from "@/lib/levelSystem";

type Props = {
  currentLevel?: number | null;
  className?: string;
};

export default function LevelBadge({ currentLevel, className = "" }: Props) {
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
        aria-label={`Level ${level} badge`}
        title={`Level ${level} - ${definition?.levelName ?? ""}`}
      >
        {`L${level}`}
      </button>
      {open && definition ? (
        <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-2xl border border-[#e2d9f3] bg-[#faf8ff] p-3 shadow-xl">
          <p className="text-sm font-semibold text-gray-900">
            Level {level} - {definition.levelName}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-600">{definition.identityText}</p>
        </div>
      ) : null}
    </div>
  );
}
