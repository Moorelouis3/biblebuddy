"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  currentStreak?: number | null;
  className?: string;
};

export default function StreakFlameBadge({ currentStreak, className = "" }: Props) {
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

  if ((currentStreak ?? 0) < 30) return null;

  const streakLabel =
    (currentStreak ?? 0) >= 100
      ? "100+ day streak"
      : `${currentStreak} day streak`;

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
        aria-label={`${streakLabel} badge`}
        title={streakLabel}
      >
        🔥
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-30 mt-2 w-64 rounded-2xl border border-[#e9dccb] bg-[#fffaf4] p-3 shadow-xl">
          <p className="text-sm font-semibold text-gray-900">{streakLabel}</p>
          <p className="mt-1 text-xs leading-5 text-gray-600">
            This person has been in the Bible daily for more than 30 days.
          </p>
        </div>
      ) : null}
    </div>
  );
}
