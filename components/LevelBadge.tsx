"use client";

import { useEffect, useRef, useState } from "react";
import { LEVEL_DEFINITIONS } from "@/lib/levelSystem";

const LEVEL_EMOJIS: Record<number, string> = {
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
  10: "🔟",
};

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

  const level = Math.min(Math.max(currentLevel, 1), 10);
  const emoji = LEVEL_EMOJIS[level] ?? "1️⃣";
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
        className="inline-flex items-center justify-center text-sm leading-none transition hover:scale-110"
        aria-label={`Level ${level} badge`}
        title={`Level ${level} — ${definition?.levelName ?? ""}`}
      >
        {emoji}
      </button>
      {open && definition ? (
        <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-2xl border border-[#e2d9f3] bg-[#faf8ff] p-3 shadow-xl">
          <p className="text-sm font-semibold text-gray-900">
            Level {level} — {definition.levelName}
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-600">{definition.identityText}</p>
        </div>
      ) : null}
    </div>
  );
}
