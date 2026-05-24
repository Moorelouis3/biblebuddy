"use client";

import { useRef } from "react";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import type { BibleYearDeepStudySection } from "../lib/bibleYearDayOneDeepStudy";

type BibleYearDeepStudySectionCardsProps = {
  sections: BibleYearDeepStudySection[];
  activeReference: string | null;
  onActiveReferenceChange: (reference: string | null) => void;
  topId?: string;
  className?: string;
};

const bibleReferenceLinePattern =
  /^\s*(?:[-*]\s*)?(?:>\s*)?(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}]\s*)?(?:\*\*)?(?:[1-3]\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+\d+:\d+(?:\s*(?:-|to)\s*\d+)?/u;

function getHeadingText(line: string) {
  return line.replace(/^#{1,6}\s+/, "").replace(/[*_`]/g, "").trim();
}

function normalizeReferenceText(value: string) {
  return value.replace(/\s+/g, " ").replace(/\s+to\s+/gi, "-").replace(/\s*-\s*/g, "-").trim().toLowerCase();
}

function normalizeHeadingText(value: string) {
  return value
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}]/gu, "")
    .replace(/[^\p{L}\p{N}: -]+/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function addBlankLineBetweenVerseBlocks(markdown: string) {
  const output: string[] = [];

  for (const line of markdown.split("\n")) {
    const previousLine = output[output.length - 1] ?? "";
    if (bibleReferenceLinePattern.test(line) && previousLine.trim() !== "") {
      output.push("");
    }
    output.push(line);
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function prepareOpenSectionMarkdown(markdown: string, reference: string, title: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  while (lines[0]?.trim() === "") lines.shift();

  const firstHeading = lines[0];
  if (/^#{1,6}\s+/.test(firstHeading ?? "") && normalizeReferenceText(getHeadingText(firstHeading)) === normalizeReferenceText(reference)) {
    lines.shift();
    while (lines[0]?.trim() === "") lines.shift();
  }

  const nextHeading = lines[0];
  if (/^#{1,6}\s+/.test(nextHeading ?? "") && normalizeHeadingText(getHeadingText(nextHeading)) === normalizeHeadingText(title)) {
    lines.shift();
    while (lines[0]?.trim() === "") lines.shift();
  }

  return addBlankLineBetweenVerseBlocks(lines.join("\n"));
}

export default function BibleYearDeepStudySectionCards({
  sections,
  activeReference,
  onActiveReferenceChange,
  topId,
  className = "",
}: BibleYearDeepStudySectionCardsProps) {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
                className={`flex w-full items-center gap-2.5 rounded-2xl border px-2.5 py-3 text-left transition sm:gap-3 sm:px-3 ${
                  isOpen
                    ? "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,var(--bb-card,#ffffff))]"
                    : "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] hover:border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,var(--bb-card-border,#dbe7f4))] hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_7%,var(--bb-card,#ffffff))]"
                } ${shouldPrompt ? "bible-year-first-deep-note-prompt" : ""}`}
                aria-expanded={isOpen}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] text-lg">
                  {section.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-[var(--bb-text-primary,#111827)]">{section.title}</span>
                  <span className="mt-0.5 block text-xs font-bold text-[var(--bb-accent,#f6b44b)]">{section.reference}</span>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">{section.summary}</span>
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
                <div className="bible-year-deep-note-open mt-2 bg-[var(--bb-card,#ffffff)] px-0 py-3 text-[var(--bb-text-primary,#111827)] sm:mt-3 sm:rounded-[24px] sm:border sm:border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,var(--bb-card-border,#dbe7f4))] sm:bg-[var(--bb-card,#ffffff)] sm:px-3 sm:py-4">
                  <ChapterNotesMarkdown compactMobile>{prepareOpenSectionMarkdown(section.markdown, section.reference, section.title)}</ChapterNotesMarkdown>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
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
