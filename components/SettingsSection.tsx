"use client";

/**
 * One collapsible row on the Settings page (Louis, 2026-10-25).
 *
 * Settings was nine cards stacked open, every one of them showing all of its
 * controls at once - so the theme swatches, the buddy carousel, two forms and
 * the delete-account block were all on screen together and you scrolled past
 * most of it to reach anything. "I don't like how the template, how you can
 * change the theme. It's just laying there. It should be like a drop down
 * there. Everything should be separate drop down."
 *
 * Built on <details>/<summary> rather than useState on purpose: the browser
 * handles the open/close, the keyboard and the ARIA for free, it survives
 * before hydration, and Ctrl+F finds text inside a closed section in Chrome.
 * There is no state here to get out of step with anything.
 *
 * Closed by default - that is the point of the change. Pass defaultOpen for a
 * section that should greet you open.
 */

import type { ReactNode } from "react";

type Props = {
  title: string;
  /** One line under the title, visible whether the section is open or shut. */
  description?: string;
  /** Small glyph before the title. Decorative - it is hidden from readers. */
  icon?: string;
  /** Start open. Default is closed. */
  defaultOpen?: boolean;
  /** Red-tinted frame, for the one section that destroys something. */
  tone?: "default" | "danger";
  children: ReactNode;
};

export default function SettingsSection({
  title,
  description,
  icon,
  defaultOpen = false,
  tone = "default",
  children,
}: Props) {
  const danger = tone === "danger";

  return (
    <details
      open={defaultOpen}
      className={`group mb-3 overflow-hidden rounded-xl shadow-sm transition-shadow open:shadow-md ${
        danger
          ? "border border-red-200 bg-red-50/60"
          : "bg-[var(--bb-card,#ffffff)]"
      }`}
    >
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 transition-colors [&::-webkit-details-marker]:hidden ${
          danger ? "hover:bg-red-100/60" : "hover:bg-[var(--bb-accent-soft,#eaf2ff)]"
        }`}
      >
        <span className="min-w-0">
          <span
            className={`flex items-center gap-2 text-base font-semibold ${
              danger ? "text-red-700" : "text-[var(--bb-text-primary,#111827)]"
            }`}
          >
            {icon ? (
              <span aria-hidden="true" className="text-lg leading-none">
                {icon}
              </span>
            ) : null}
            {title}
          </span>
          {description ? (
            <span
              className={`mt-1 block text-sm ${
                danger ? "text-red-600" : "text-[var(--bb-text-secondary,#4b5563)]"
              }`}
            >
              {description}
            </span>
          ) : null}
        </span>

        {/* Rotates on open. group-open is what makes this work without state. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180 ${
            danger ? "text-red-400" : "text-[var(--bb-text-secondary,#9ca3af)]"
          }`}
        >
          <path d="M5 7.5l5 5 5-5" />
        </svg>
      </summary>

      <div
        className={`border-t px-5 pb-5 pt-4 text-[var(--bb-text-primary,#111827)] ${
          danger ? "border-red-200" : "border-[var(--bb-card-border,#e5e7eb)]"
        }`}
      >
        {children}
      </div>
    </details>
  );
}
