"use client";

import { useEffect, useRef, type ReactNode } from "react";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import type { BibleYearDeepStudySection } from "../lib/bibleYearDayOneDeepStudy";

type BibleYearDeepStudySectionCardsProps = {
  sections: BibleYearDeepStudySection[];
  activeReference: string | null;
  onActiveReferenceChange: (reference: string | null) => void;
  topId?: string;
  className?: string;
  onBottomReached?: () => void;
  bottomReachedDisabled?: boolean;
  footer?: ReactNode;
};

function stripLeadingReferenceHeading(markdown: string, reference: string) {
  const escapedReference = reference.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return markdown.replace(new RegExp(`^#{1,6}\\s+${escapedReference}\\s*\\n+`), "");
}

export default function BibleYearDeepStudySectionCards({
  sections,
  activeReference,
  onActiveReferenceChange,
  topId,
  className = "",
  onBottomReached,
  bottomReachedDisabled = false,
}: BibleYearDeepStudySectionCardsProps) {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const bottomReachedRef = useRef(false);

  useEffect(() => {
    bottomReachedRef.current = false;
  }, [bottomReachedDisabled]);

  useEffect(() => {
    if (!onBottomReached || bottomReachedDisabled) return;
    const node = bottomRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || bottomReachedRef.current) return;
        bottomReachedRef.current = true;
        onBottomReached();
      },
      { threshold: 1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [bottomReachedDisabled, onBottomReached]);

  function openSection(reference: string) {
    const nextReference = activeReference === reference ? null : reference;
    onActiveReferenceChange(nextReference);
    if (!nextReference) return;
    if (typeof window === "undefined") return;
    window.setTimeout(() => {
      cardRefs.current[nextReference]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  return (
    <div className={className}>
      <span id={topId} className="block h-0" aria-hidden="true" />

      <div className="grid gap-2">
        {sections.map((section, index) => {
          const isOpen = activeReference === section.reference;
          const shouldPrompt = !activeReference && index === 0;
          return (
            <div
              key={`bible-year-deep-study-${section.reference}`}
              ref={(node) => {
                cardRefs.current[section.reference] = node;
              }}
            >
              <button
                type="button"
                onClick={() => openSection(section.reference)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                  isOpen
                    ? "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,transparent)] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)]"
                    : "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,transparent)] bg-black/14 hover:border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,transparent)] hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_8%,transparent)]"
                } ${shouldPrompt ? "bible-year-first-deep-note-prompt" : ""}`}
                aria-expanded={isOpen}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] text-lg">
                  {section.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-[var(--bb-text-primary,#fff7ed)]">{section.title}</span>
                  <span className="mt-0.5 block text-xs font-bold text-[var(--bb-accent,#f6b44b)]">{section.reference}</span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#e7d4bd)]">{section.summary}</span>
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 shrink-0 text-[var(--bb-accent,#f6b44b)] transition ${isOpen ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              {isOpen ? (
                <div className="mt-3 rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_28%,transparent)] bg-black/16 px-3 py-4">
                  <ChapterNotesMarkdown>{stripLeadingReferenceHeading(section.markdown, section.reference)}</ChapterNotesMarkdown>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div ref={bottomRef} className="h-px" aria-hidden="true" />
      <style jsx>{`
        @keyframes bible-year-first-deep-note-nudge {
          0%,
          100% {
            transform: translateX(0) scale(1);
            box-shadow: 0 0 0 color-mix(in srgb, var(--bb-accent, #f6b44b) 0%, transparent);
          }
          12% {
            transform: translateX(-2px) scale(1.01);
          }
          24% {
            transform: translateX(2px) scale(1.01);
          }
          36% {
            transform: translateX(-1px) scale(1.01);
          }
          48% {
            transform: translateX(1px) scale(1.01);
            box-shadow: 0 0 24px color-mix(in srgb, var(--bb-accent, #f6b44b) 28%, transparent);
          }
        }

        .bible-year-first-deep-note-prompt {
          animation: bible-year-first-deep-note-nudge 1.9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
