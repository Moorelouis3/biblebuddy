"use client";

import { useState, type ReactNode } from "react";

/**
 * A section that starts closed and opens on tap.
 *
 * The profile's richest parts - the six month activity calendar, the action
 * log, the study groups - are also its tallest, and once the profile sits on
 * top of the feed they would push every post below the fold (Louis,
 * 2026-10-24: keep them, just not in the way).
 *
 * Nothing is removed by collapsing: the children still mount when opened, and
 * the existing components inside them are untouched.
 */
export default function CollapsibleSection({
  title,
  summary,
  children,
  defaultOpen = false,
}: {
  title: string;
  /** One line shown beside the title while closed, e.g. "3 groups". */
  summary?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="profile-skin-card mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        // 44px minimum height: this is a primary control on a phone.
        className="flex min-h-[44px] w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-gray-50"
      >
        <span className="flex items-baseline gap-2 truncate">
          <span className="text-lg font-semibold text-gray-900">{title}</span>
          {summary ? <span className="truncate text-sm text-gray-500">{summary}</span> : null}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open ? <div className="border-t border-gray-100 px-5 py-4">{children}</div> : null}
    </div>
  );
}
