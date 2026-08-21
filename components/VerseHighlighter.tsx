import React, { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

// Rendered only for chapters that need the whole-Bible notes. Keeping it
// behind next/dynamic, and behind a condition, is what stops Genesis 1
// downloading a 33 MB chunk it never reads from.
const BibleStudySectionsLoader = dynamic(() => import("./BibleStudySectionsLoader"), { ssr: false });
import { ColorPicker } from "./ColorPicker";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import {
  deleteHighlight,
  deleteHighlightRange,
  fetchHighlightRanges,
  fetchHighlights,
  updateHighlightRangeNote,
  upsertHighlight,
  upsertHighlightRange,
  type VerseHighlightRange,
} from "../lib/verseHighlightingApi";
import { ACTION_TYPE } from "../lib/actionTypes";
import CreditLimitModal from "./CreditLimitModal";
import { supabase } from "../lib/supabaseClient";
import { consumeCreditAction, isCreditActionCanceled, previewCreditAction, type CreditClientResult } from "../lib/creditClient";
import { CORE_STUDY_IS_FREE } from "../lib/accessPolicy";
import type {
  BibleReaderStudyNoteCategory,
  BibleReaderStudySection,
} from "../lib/bibleReaderStudyNotes";
import {
  extractPhraseNote,
  findPhraseNoteEntry,
  getInsightCardColor,
  getInsightCardTitle,
  getPhraseNoteIcon,
  insightCardKey,
  type InsightCardPhrase,
} from "../lib/insightCards";

interface VerseHighlighterProps {
  book: string;
  chapter: number;
  /**
   * The chapter's verses as plain text.
   *
   * Verses used to accept pre-enriched HTML as well, which wrapped every
   * person, place and keyword the app knows about in a tappable span. Those
   * popups competed with Insight Card phrases for the same words, so the
   * phrase is now the only thing in a verse a reader can tap. The people,
   * place and keyword libraries are unchanged and still have their own pages.
   */
  verses: Array<{ number: number; text: string }>;
  plainTextMode?: boolean;
  surface?: "default" | "dashboard";
  studySectionPlacement?: "end" | "start";
  hideStudySections?: boolean;
  studySections?: BibleReaderStudySection[];
  onStudyNotesCreditBlocked?: () => void;
  /**
   * The chapter's Insight Card phrases. Supplied by the reader, so this
   * component never needs to know which book or chapter has cards. Empty, or
   * absent, means the chapter simply has no cards yet.
   */
  insightPhrases?: InsightCardPhrase[];
}

function getNearestScrollContainer(element: HTMLElement | null) {
  if (!element || typeof window === "undefined") return null;

  let current: HTMLElement | null = element.parentElement;
  while (current) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    const canScroll =
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      current.scrollHeight > current.clientHeight;

    if (canScroll) return current;
    current = current.parentElement;
  }

  return null;
}

function scrollStudyAccordionHeaderIntoView(element: HTMLElement | null) {
  if (!element || typeof window === "undefined") return;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const scrollContainer = getNearestScrollContainer(element);

      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const top = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - 12;
        scrollContainer.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        return;
      }

      const top = element.getBoundingClientRect().top + window.scrollY - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    });
  });
}

type ColorPickerState =
  | { mode: "verse"; verse: number; anchor: { x: number; y: number } }
  | {
      mode: "range";
      verse: number;
      startOffset: number;
      endOffset: number;
      selectedText: string;
      anchor: { x: number; y: number };
      rangeId?: string;
      selectedColor?: string;
    };

type HighlightNoteEditorState = {
  range: VerseHighlightRange;
  noteText: string;
};

type HighlightNoteViewerState = {
  range: VerseHighlightRange;
  anchor: { x: number; y: number };
};

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/**
 * The verse exactly as the reader sees it.
 *
 * This one string is the whole contract. Saved highlights are character
 * offsets into it, and Insight Card underlines are resolved to offsets in it,
 * so it has to be computed the same way for every chapter on every surface.
 *
 * It used to depend on whether the caller happened to supply enriched HTML:
 * with it, the text was stripped of tags, decoded and whitespace collapsed;
 * without it, the raw string was used. The two do not agree, so the same
 * chapter could measure a reader's highlights against two different strings
 * depending on which reader opened it. There is only one definition now.
 *
 * Tags are still stripped rather than assumed absent, so a caller that passes
 * markup cannot silently shift every offset in the chapter.
 */
function getVisibleVerseText(v: { text: string }) {
  return decodeHtmlEntities(
    String(v.text || "")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function getTextOffset(root: HTMLElement, targetNode: Node, targetOffset: number) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let offset = 0;
  let node = walker.nextNode();

  while (node) {
    const parentElement = node.parentElement;
    if (parentElement?.closest("[data-highlight-note-indicator='true']")) {
      node = walker.nextNode();
      continue;
    }

    if (node === targetNode) {
      return offset + targetOffset;
    }
    offset += node.textContent?.length || 0;
    node = walker.nextNode();
  }

  return offset;
}

function normalizeSelectedRange(text: string, startOffset: number, endOffset: number) {
  let start = Math.max(0, Math.min(startOffset, text.length));
  let end = Math.max(0, Math.min(endOffset, text.length));

  if (start > end) {
    const previousStart = start;
    start = end;
    end = previousStart;
  }

  while (start < end && /\s/.test(text[start] || "")) start += 1;
  while (end > start && /\s/.test(text[end - 1] || "")) end -= 1;

  return {
    startOffset: start,
    endOffset: end,
    selectedText: text.slice(start, end),
  };
}

function groupRangesByVerse(ranges: VerseHighlightRange[]) {
  return ranges.reduce<Record<number, VerseHighlightRange[]>>((map, range) => {
    if (!map[range.verse]) map[range.verse] = [];
    map[range.verse].push(range);
    return map;
  }, {});
}

function rangesOverlap(startA: number, endA: number, startB: number, endB: number) {
  return startA < endB && endA > startB;
}

/* ── Genesis 1 Study Mode ──────────────────────────────────────────────────
   Genesis 1 only. Everything below is reached only when the chapter is
   Genesis 1 and the reader has Study Mode switched on; every other chapter
   renders exactly as it did before.

   The one rule that governs all of it: a saved highlight is a pair of
   character offsets into the verse's visible text, so the dotted underlines
   have to be drawn by splitting that same text into spans. Nothing may add,
   remove, or reorder a single character of it. That is why the underlines are
   resolved to offsets first and merged with the highlight offsets into one
   segment list, rather than being wrapped around matched substrings. */

/** Stable identity, so the default prop never triggers a re-render. */
const EMPTY_INSIGHT_PHRASES: InsightCardPhrase[] = [];

type GenesisOneMark = {
  start: number;
  end: number;
  color: string;
  /** Card fill, painted behind the words while that card is open. */
  activeBg: string;
  phrase: InsightCardPhrase;
  phraseKey: string;
};

type VerseSegment = {
  start: number;
  end: number;
  range: VerseHighlightRange | null;
  underline: GenesisOneMark | null;
  isRangeEnd: boolean;
};

/**
 * Bring a revealed Insight Card and the verse it belongs to onto the screen.
 *
 * The verse is what the reader just tapped, so it is the anchor: it is placed
 * near the top of the view with the card opening underneath it. Positions are
 * computed rather than left to scrollIntoView, which does nothing at all in
 * some states and cannot bias towards the verse above.
 */
function scrollPhraseCardIntoView(card: HTMLElement | null) {
  if (!card || typeof window === "undefined") return;

  // A timer, not requestAnimationFrame: rAF is paused whenever the tab is not
  // visible, which left the card sitting off screen. The delay lets the card
  // finish laying out before anything is measured.
  window.setTimeout(() => {
    {
      // The verse row is a sibling of the card's wrapper, not of the card, so
      // climb until a preceding .verse-line turns up.
      let node: HTMLElement | null = card;
      let verseRow: HTMLElement | null = null;
      while (node && !verseRow) {
        const previous = node.previousElementSibling as HTMLElement | null;
        if (previous?.classList?.contains("verse-line")) verseRow = previous;
        node = node.parentElement;
      }

      const anchor = verseRow || card;
      const anchorRect = anchor.getBoundingClientRect();

      // In the dashboard the reader lives in an iframe that the parent sizes
      // to full content height, so this document never scrolls and scrolling
      // it does nothing. Ask the parent to scroll instead.
      let inIframe = false;
      try {
        inIframe = window.self !== window.top;
      } catch {
        inIframe = true;
      }

      if (inIframe) {
        const cardRect = card.getBoundingClientRect();
        window.parent?.postMessage(
          {
            type: "bb-bible-reader-scroll-to",
            top: Math.max(0, anchorRect.top + window.scrollY),
            blockHeight: Math.ceil(cardRect.bottom - anchorRect.top),
          },
          window.location.origin,
        );
        return;
      }

      // html and body report as scrollable, but scrolling them directly does
      // not move the viewport. Those cases have to go through window.
      const nearest = getNearestScrollContainer(anchor);
      const container =
        nearest && nearest !== document.body && nearest !== document.documentElement ? nearest : null;
      const cardRect = card.getBoundingClientRect();
      const blockHeight = cardRect.bottom - anchorRect.top;

      // Centre the verse and its card together when they fit, otherwise pin
      // the verse near the top so the card runs down from it.
      const spareFor = (viewportHeight: number) =>
        Math.max(16, blockHeight < viewportHeight ? (viewportHeight - blockHeight) / 2 : viewportHeight * 0.12);

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const top = container.scrollTop + (anchorRect.top - containerRect.top) - spareFor(container.clientHeight);
        container.scrollTo({ top: Math.max(0, top), behavior: "auto" });
        return;
      }

      const top = anchorRect.top + window.scrollY - spareFor(window.innerHeight);
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    }
  }, 60);
}

/** Stable identity for one Insight Card, used as the open/closed key. */

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Locate the phrase's exact words inside the verse text.
 *
 * The quoted words come from the KJV, so a plain match is the normal case. The
 * looser passes only exist so that a stray difference in case or spacing costs
 * an underline rather than breaking the verse.
 */
function findUnderlineOffsets(text: string, underline: string) {
  const exact = text.indexOf(underline);
  if (exact >= 0) return { start: exact, end: exact + underline.length };

  const caseInsensitive = text.toLowerCase().indexOf(underline.toLowerCase());
  if (caseInsensitive >= 0) return { start: caseInsensitive, end: caseInsensitive + underline.length };

  const words = underline.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return null;

  const match = new RegExp(words.map(escapeRegExp).join("\\s+"), "i").exec(text);
  return match ? { start: match.index, end: match.index + match[0].length } : null;
}

function getInsightMarks(
  visibleText: string,
  versePhrases: InsightCardPhrase[],
  orderOf: (phrase: InsightCardPhrase) => number,
): GenesisOneMark[] {
  const marks: GenesisOneMark[] = [];

  versePhrases.forEach((phrase) => {
    const offsets = findUnderlineOffsets(visibleText, phrase.underline);
    if (!offsets) return;

    const color = getInsightCardColor(orderOf(phrase));
    marks.push({
      ...offsets,
      color: color.underline,
      activeBg: color.cardBg,
      phrase,
      phraseKey: insightCardKey(phrase),
    });
  });

  // Two underlines cannot share a character, so a later one that runs into an
  // earlier one is dropped rather than drawn on top of it.
  return marks
    .sort((a, b) => a.start - b.start)
    .filter((mark, index, sorted) => index === 0 || mark.start >= sorted[index - 1].end);
}

/**
 * Cut the verse text at every highlight and underline boundary.
 *
 * The pieces are joined back together in order and cover the text exactly
 * once, so the rendered element's textContent still equals the text the
 * highlight offsets were measured against.
 */
function buildVerseSegments(
  textLength: number,
  ranges: VerseHighlightRange[],
  marks: GenesisOneMark[],
): VerseSegment[] {
  const boundaries = new Set<number>([0, textLength]);
  ranges.forEach((range) => {
    boundaries.add(range.start_offset);
    boundaries.add(range.end_offset);
  });
  marks.forEach((mark) => {
    boundaries.add(mark.start);
    boundaries.add(mark.end);
  });

  const cuts = Array.from(boundaries)
    .filter((cut) => cut >= 0 && cut <= textLength)
    .sort((a, b) => a - b);

  const segments: VerseSegment[] = [];

  for (let index = 0; index < cuts.length - 1; index += 1) {
    const start = cuts[index];
    const end = cuts[index + 1];
    if (end <= start) continue;

    const range = ranges.find((candidate) => candidate.start_offset <= start && candidate.end_offset >= end) || null;
    const mark = marks.find((candidate) => candidate.start <= start && candidate.end >= end) || null;

    segments.push({
      start,
      end,
      range,
      underline: mark,
      isRangeEnd: Boolean(range && range.end_offset === end),
    });
  }

  return segments;
}

function normalizeForPreviewMatch(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isPreviewEcho(paragraph: string, preview: string) {
  const written = normalizeForPreviewMatch(paragraph);
  const shown = normalizeForPreviewMatch(preview);
  if (!written || !shown) return false;
  if (written === shown) return true;

  // Allow for a preview that was trimmed or lightly repunctuated, but not for a
  // short line that merely happens to start the same way.
  const [shorter, longer] = written.length < shown.length ? [written, shown] : [shown, written];
  return longer.startsWith(shorter) && shorter.length >= longer.length * 0.6;
}

/**
 * The previews were written from the opening line of each note, so without
 * this an expanded card would repeat the sentence sitting directly above it.
 * The card header keeps that line; the body picks up from the next one.
 */
function dropPreviewEcho(paragraphs: string[], preview: string) {
  let start = 0;
  while (start < paragraphs.length && isPreviewEcho(paragraphs[start], preview)) start += 1;

  // Never blank the note out entirely — if the echo is all there is, keep it.
  return start && start < paragraphs.length ? paragraphs.slice(start) : paragraphs;
}

function GenesisOneInsightCard({
  phrase,
  colorIndex,
  icon,
  paragraphs,
  loadingNote = false,
  isOpen,
  onToggle,
  onClose,
}: {
  phrase: InsightCardPhrase;
  colorIndex: number;
  icon: string;
  paragraphs: string[];
  loadingNote?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
}) {
  const color = getInsightCardColor(colorIndex);
  const title = getInsightCardTitle(phrase);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrolledForRef = useRef<string | null>(null);

  // A card summoned by tapping the verse can land half off screen, so bring it
  // and the verse above it into view. Only for the tap-to-open card; the
  // listed cards must not move the page around as they expand.
  useEffect(() => {
    if (!onClose || !isOpen || typeof window === "undefined") {
      if (!isOpen) scrolledForRef.current = null;
      return;
    }

    // onClose is a fresh closure each render, so without this the effect would
    // re-fire and keep yanking the page while the card is open.
    if (scrolledForRef.current === phrase.noteTitle) return;
    scrolledForRef.current = phrase.noteTitle;

    const node = cardRef.current;
    if (!node) return;

    scrollPhraseCardIntoView(node);
  }, [isOpen, onClose, phrase.noteTitle]);
  // A phrase whose note has not been written yet still earns its underline and
  // its preview, but it does not pretend to open onto anything.
  // Openable while the notes are still on their way, so a tap never feels dead.
  const hasNote = paragraphs.length > 0 || loadingNote;

  const head = (
    <>
      <span className="text-lg leading-tight" aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.95rem] font-black leading-5 tracking-[-0.005em] text-slate-900">{title}</span>
        <span className="mt-1 block text-[0.86rem] font-semibold leading-[1.55] text-slate-600">{phrase.preview}</span>
      </span>
      {onClose ? (
        <span aria-hidden="true" className="text-base leading-tight text-transparent">
          ›
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={`text-base leading-tight transition-transform ${
            hasNote ? "text-slate-400" : "text-transparent"
          } ${isOpen ? "rotate-90" : ""}`}
        >
          ›
        </span>
      )}
    </>
  );

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-[14px] border scroll-mt-24"
      style={{ backgroundColor: color.cardBg, borderColor: color.cardBorder }}
    >
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close this Insight Card"
          className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-white/70 text-base font-black leading-none text-slate-500 transition hover:bg-white hover:text-slate-800"
        >
          ×
        </button>
      ) : null}
      {hasNote ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 px-3.5 py-3 text-left"
        >
          {head}
        </button>
      ) : (
        <div className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 px-3.5 py-3 text-left">{head}</div>
      )}

      {hasNote && isOpen ? (
        <div className="px-3.5 pb-3.5 pl-[3.4rem]">
          {paragraphs.length ? (
            <div className="text-slate-700">
              <ChapterNotesMarkdown compactMobile>{paragraphs.join("\n\n")}</ChapterNotesMarkdown>
            </div>
          ) : (
            <div className="animate-pulse space-y-2 pt-1" aria-live="polite">
              <span className="sr-only">Loading this Insight Card</span>
              <div className="h-3 w-11/12 rounded bg-black/10" />
              <div className="h-3 w-9/12 rounded bg-black/10" />
              <div className="h-3 w-10/12 rounded bg-black/10" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function HighlightActionMenu({
  anchor,
  hasSavedRange,
  hasNote,
  onAddNote,
  onChangeColor,
  onRemove,
  onClose,
}: {
  anchor: { x: number; y: number } | null;
  hasSavedRange: boolean;
  hasNote: boolean;
  onAddNote: () => void;
  onChangeColor: () => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!anchor) return;
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [anchor, onClose]);

  if (!anchor || !mounted) return null;

  const left = Math.min(Math.max(anchor.x - 122, 12), window.innerWidth - 244);
  const top = Math.min(Math.max(anchor.y - 58, 12), window.innerHeight - 58);

  return createPortal(
    <div
      ref={ref}
      className="fixed z-[9999] flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 text-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.22)]"
      style={{ top, left }}
      role="menu"
      aria-label="Highlight actions"
    >
      <button
        type="button"
        onClick={onAddNote}
        className="rounded-xl px-3 py-2 text-xs font-black transition hover:bg-slate-100"
      >
        📝 {hasNote ? "Edit Note" : "Add Note"}
      </button>
      <button
        type="button"
        onClick={onChangeColor}
        className="rounded-xl px-3 py-2 text-xs font-black transition hover:bg-slate-100"
      >
        🎨 Color
      </button>
      {hasSavedRange ? (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-xl px-3 py-2 text-xs font-black text-rose-600 transition hover:bg-rose-50"
        >
          ✕ Remove
        </button>
      ) : null}
    </div>,
    document.body,
  );
}

function HighlightNoteModal({
  state,
  onChange,
  onSave,
  onDelete,
  onClose,
  saving,
}: {
  state: HighlightNoteEditorState | null;
  onChange: (value: string) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!state || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/45 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-[max(12px,env(safe-area-inset-top))] sm:items-center">
      <div className="flex max-h-[calc(100svh-24px-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-full max-w-lg flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-950 shadow-[0_26px_90px_rgba(15,23,42,0.35)] sm:max-h-[86vh]">
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5 sm:py-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">Highlight Note</p>
            <h3 className="mt-1 text-base font-black leading-tight sm:text-lg">Add a note to this highlight</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-xl font-black text-slate-600 transition hover:bg-slate-200"
            aria-label="Close note"
          >
            ×
          </button>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold leading-6 text-slate-800">
            “{state.range.selected_text}”
          </div>
          <label className="block">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">My Note</span>
            <textarea
              value={state.noteText}
              onChange={(event) => onChange(event.target.value)}
              rows={6}
              autoFocus
              placeholder="Write what this highlighted phrase means to you..."
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold leading-6 text-slate-950 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 sm:text-sm"
            />
          </label>
        </div>
        <div className="shrink-0 border-t border-slate-100 bg-white px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 sm:flex sm:justify-between sm:gap-2 sm:px-5 sm:py-4">
          <button
            type="button"
            onClick={onDelete}
            disabled={saving || !state.range.note_text}
            className="mb-2 w-full rounded-2xl border border-rose-200 px-4 py-3 text-sm font-black text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40 sm:mb-0 sm:w-auto"
          >
            Delete Note
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:flex-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="flex-1 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-[0_14px_32px_rgba(14,165,233,0.28)] transition hover:bg-sky-400 disabled:opacity-60 sm:flex-none"
            >
              {saving ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function HighlightNoteViewer({
  state,
  onEdit,
  onDelete,
  onClose,
  deleting,
}: {
  state: HighlightNoteViewerState | null;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  deleting: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!state) return;
    setMenuOpen(false);
  }, [state?.range.id]);

  useEffect(() => {
    if (!state) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, onClose]);

  if (!state || !mounted) return null;

  const cardWidth = 340;
  const desktopLeft = Math.min(Math.max(state.anchor.x - cardWidth / 2, 14), window.innerWidth - cardWidth - 14);
  const desktopTop = Math.min(Math.max(state.anchor.y + 10, 14), window.innerHeight - 260);
  const noteText = state.range.note_text || "";

  return createPortal(
    <>
      <div
        ref={ref}
        data-highlight-note-viewer="true"
        className="fixed bottom-0 left-0 right-0 z-[10000] rounded-t-[24px] border border-slate-200 bg-white p-4 text-slate-950 shadow-[0_-18px_52px_rgba(15,23,42,0.22)] sm:left-auto sm:right-auto sm:rounded-[20px] sm:p-4 sm:shadow-[0_20px_60px_rgba(15,23,42,0.24)]"
        style={{
          ["--note-card-left" as string]: `${desktopLeft}px`,
          ["--note-card-top" as string]: `${desktopTop}px`,
        }}
      >
        <style>{`
          @media (min-width: 640px) {
            [data-highlight-note-viewer="true"] {
              left: var(--note-card-left);
              top: var(--note-card-top);
              bottom: auto;
              right: auto;
              width: ${cardWidth}px;
            }
          }
        `}</style>
        <div className="contents">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-slate-200 sm:hidden" aria-hidden="true" />
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-sky-600">📝 Note</p>
              <p className="mt-2 rounded-2xl bg-amber-50 px-3 py-2 text-sm font-black leading-5 text-slate-900">
                “{state.range.selected_text}”
              </p>
            </div>
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-lg font-black text-slate-700 transition hover:bg-slate-200"
                aria-label="Note options"
                aria-expanded={menuOpen}
              >
                ⋯
              </button>
              {menuOpen ? (
                <div className="absolute right-0 top-11 z-10 w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_16px_42px_rgba(15,23,42,0.18)]">
                  <button
                    type="button"
                    onClick={onEdit}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-black text-slate-800 transition hover:bg-slate-100"
                  >
                    Edit Note
                  </button>
                  <button
                    type="button"
                    onClick={onDelete}
                    disabled={deleting}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-black text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Delete Note"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <p className="mt-3 max-h-[32svh] overflow-y-auto whitespace-pre-wrap text-[15px] font-semibold leading-7 text-slate-800 sm:max-h-64 sm:text-sm sm:leading-6">
            {noteText}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-200 sm:hidden"
          >
            Close
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}

function StudyCategoryContent({
  category,
  openItemIndex,
  onToggleItem,
  onItemOpened,
}: {
  category: BibleReaderStudyNoteCategory;
  openItemIndex: number | null;
  onToggleItem: (index: number) => void;
  onItemOpened: (index: number) => void;
}) {
  const nestedMenu = category.id === "key-phrases";
  const flatSection = category.id === "what-is-happening" || category.id === "why-this-matters";
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});
  const nestedItemIcons = nestedMenu ? getNestedStudyItemIcons(category) : [];
  const renderMarkdownBody = (markdown: string) => (
    <div className="text-[var(--bb-text-secondary,#4b5563)]">
      <ChapterNotesMarkdown compactMobile>{markdown}</ChapterNotesMarkdown>
    </div>
  );

  return (
    <div className="mt-3 space-y-3">
      {category.content.map((item, index) => {
        const [lead, ...rest] = item.split("\n");
        const displayLead = category.id === "key-phrases" ? lead.replace(/^["“”]+|["“”]+$/g, "") : lead;
        const cleanDisplayLead = getNestedStudyItemHeading(category.id, displayLead);
        const paragraphs = rest.filter((paragraph) => paragraph.trim());
        const hasHeading = paragraphs.length > 0;

        if (nestedMenu && hasHeading) {
          const itemOpen = openItemIndex === index;
          const nestedItemIcon = nestedItemIcons[index] || getNestedStudyItemIcon(category.id, cleanDisplayLead);
          return (
            <section
              key={item}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_5%,var(--bb-card,#ffffff))] shadow-sm"
            >
              <button
                type="button"
                onClick={() => {
                  onToggleItem(index);
                  if (!itemOpen) {
                    scrollStudyAccordionHeaderIntoView(itemRefs.current[index]);
                    onItemOpened(index);
                  }
                }}
                className="flex w-full items-center gap-2 px-3 py-3 text-left transition hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_8%,var(--bb-card,#ffffff))]"
                aria-expanded={itemOpen}
              >
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] text-[11px] font-black text-[var(--bb-text-primary,#111827)]">
                  {nestedItemIcon}
                </span>
                <span className="min-w-0 flex-1 text-xs font-black leading-5 text-[var(--bb-text-primary,#111827)] sm:text-sm">
                  {cleanDisplayLead}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 shrink-0 text-[var(--bb-accent,#f6b44b)] transition ${itemOpen ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
              {itemOpen ? (
                <div className="border-t border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,var(--bb-card-border,#dbe7f4))] px-4 py-3 pl-11">
                  {renderMarkdownBody(paragraphs.join("\n\n"))}
                </div>
              ) : null}
            </section>
          );
        }

        if (flatSection) {
          const flatParagraphs = item
            .split("\n")
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);

          return (
            <div
              key={item}
              className="px-1"
            >
              {renderMarkdownBody(flatParagraphs.join("\n\n"))}
            </div>
          );
        }

        return (
          <section
            key={item}
            className="rounded-xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_18%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_5%,var(--bb-card,#ffffff))] px-3 py-3 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)] shadow-sm sm:text-sm sm:leading-6"
          >
            {hasHeading ? (
              <>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 grid h-6 min-w-6 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] text-[11px] font-black text-[var(--bb-text-primary,#111827)]">
                    {index + 1}
                  </span>
                  <p className="font-black leading-5 text-[var(--bb-text-primary,#111827)]">{cleanDisplayLead}</p>
                </div>
                <div className="mt-2 pl-8">
                  {renderMarkdownBody(paragraphs.join("\n\n"))}
                </div>
              </>
            ) : (
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-base">{category.list ? "•" : category.icon}</span>
                <p>{lead}</p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function getNestedStudyItemHeading(categoryId: string, heading: string) {
  const withoutQuotes = categoryId === "key-phrases" ? heading.replace(/^["â€œâ€]+|["â€œâ€]+$/g, "") : heading;
  return withoutQuotes.replace(/^(?:[\p{Extended_Pictographic}\uFE0F\u200D]+\s*)+/u, "").trim();
}

function getLeadingEmoji(text: string) {
  const match = text.trim().match(/^([\p{Extended_Pictographic}](?:\uFE0F|\u200D[\p{Extended_Pictographic}]\uFE0F?)*)/u);
  return match?.[1] || null;
}

function getNestedStudyItemIcons(category: BibleReaderStudyNoteCategory) {
  const usedIcons = new Set<string>();
  return category.content.map((item, index) => {
    const [lead] = item.split("\n");
    const heading = getNestedStudyItemHeading(category.id, lead);
    const leadingEmoji = getLeadingEmoji(lead);
    const preferredIcon = leadingEmoji || getNestedStudyItemIcon(category.id, heading);
    const icon = usedIcons.has(preferredIcon)
      ? getFallbackNestedStudyItemIcon(category.id, index, usedIcons)
      : preferredIcon;
    usedIcons.add(icon);
    return icon;
  });
}

function getFallbackNestedStudyItemIcon(categoryId: string, index: number, usedIcons: Set<string>) {
  const phraseIcons = ["💬", "🧩", "🔎", "📌", "🌿", "🧠", "🕯️", "🧭", "✨", "📖", "🪨", "🌊", "🔥", "🌱", "🕊️"];
  const truthIcons = ["🔑", "💡", "🧱", "🛡️", "🌱", "⚖️", "🙌", "🕊️", "✨", "📖", "❤️", "🧭", "🔥", "🌍", "⏳"];
  const icons = categoryId === "key-phrases" ? phraseIcons : truthIcons;
  for (let offset = 0; offset < icons.length; offset += 1) {
    const icon = icons[(index + offset) % icons.length];
    if (!usedIcons.has(icon)) return icon;
  }
  return categoryId === "key-phrases" ? "💬" : "🔑";
}

function getNestedStudyItemIcon(categoryId: string, heading: string) {
  const normalizedHeading = heading.toLowerCase();

  if (categoryId === "key-phrases") {
    if (normalizedHeading.includes("beginning")) return "\u{1F305}";
    if (normalizedHeading.includes("created")) return "\u{1F30C}";
    if (normalizedHeading.includes("heavens") || normalizedHeading.includes("expanse")) return "\u{1F4AB}";
    if (normalizedHeading.includes("earth") || normalizedHeading.includes("dry land")) return "\u{1F30D}";
    if (normalizedHeading.includes("formless") || normalizedHeading.includes("void")) return "\u{1F300}";
    if (normalizedHeading.includes("deep") || normalizedHeading.includes("waters")) return "\u{1F30A}";
    if (normalizedHeading.includes("spirit")) return "\u{1F54A}\u{FE0F}";
    if (normalizedHeading.includes("light")) return "\u{1F4A1}";
    if (normalizedHeading.includes("good") || normalizedHeading.includes("very good")) return "\u{2705}";
    if (normalizedHeading.includes("evening") || normalizedHeading.includes("morning")) return "\u{1F307}";
    if (normalizedHeading.includes("divide") || normalizedHeading.includes("separate")) return "\u{2194}\u{FE0F}";
    if (normalizedHeading.includes("sprout") || normalizedHeading.includes("vegetation")) return "\u{1F331}";
    if (normalizedHeading.includes("seed")) return "\u{1F33E}";
    if (normalizedHeading.includes("signs") || normalizedHeading.includes("seasons")) return "\u{1F4C5}";
    if (normalizedHeading.includes("set them")) return "\u{1F4CD}";
    if (normalizedHeading.includes("swarm")) return "\u{1F41F}";
    if (normalizedHeading.includes("kinds")) return "\u{1F9EC}";
    if (normalizedHeading.includes("blessed")) return "\u{1F64C}";
    if (normalizedHeading.includes("let us make")) return "\u{1F5E3}\u{FE0F}";
    if (normalizedHeading.includes("image") || normalizedHeading.includes("likeness")) return "\u{1FA9E}";
    if (normalizedHeading.includes("male") || normalizedHeading.includes("female")) return "\u{1F46B}";
    if (normalizedHeading.includes("dominion")) return "\u{1F451}";
    if (normalizedHeading.includes("fruitful") || normalizedHeading.includes("multiply")) return "\u{1F33F}";
  }

  if (categoryId === "key-truths") {
    if (normalizedHeading.includes("existed before")) return "\u{267E}\u{FE0F}";
    if (normalizedHeading.includes("not random")) return "\u{1F9ED}";
    if (normalizedHeading.includes("word")) return "\u{1F4D6}";
    if (normalizedHeading.includes("present")) return "\u{1F64F}";
    if (normalizedHeading.includes("order") || normalizedHeading.includes("boundaries")) return "\u{1F9F1}";
    if (normalizedHeading.includes("character")) return "\u{1F50D}";
    if (normalizedHeading.includes("hope") || normalizedHeading.includes("third day")) return "\u{1F305}";
    if (normalizedHeading.includes("forms") || normalizedHeading.includes("fills")) return "\u{1F3D7}\u{FE0F}";
    if (normalizedHeading.includes("authority")) return "\u{1F451}";
    if (normalizedHeading.includes("future") || normalizedHeading.includes("fruitfulness")) return "\u{1F331}";
    if (normalizedHeading.includes("physical world")) return "\u{1F30D}";
    if (normalizedHeading.includes("servants")) return "\u{2600}\u{FE0F}";
    if (normalizedHeading.includes("rhythm")) return "\u{23F1}\u{FE0F}";
    if (normalizedHeading.includes("fear")) return "\u{1F30A}";
    if (normalizedHeading.includes("abundance") || normalizedHeading.includes("variety")) return "\u{1F308}";
    if (normalizedHeading.includes("blessing")) return "\u{1F64C}";
    if (normalizedHeading.includes("identity")) return "\u{1FAAA}";
    if (normalizedHeading.includes("dignity")) return "\u{1F48E}";
    if (normalizedHeading.includes("men and women")) return "\u{1F91D}";
    if (normalizedHeading.includes("distinct")) return "\u{2728}";
    if (normalizedHeading.includes("stewardship")) return "\u{1F331}";
    if (normalizedHeading.includes("work")) return "\u{1F6E0}\u{FE0F}";
    if (normalizedHeading.includes("original design")) return "\u{1F3E1}";
  }

  return categoryId === "key-phrases" ? "\u{1F4AC}" : "\u{1F511}";
}

function slugStudyAnalyticsValue(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getStudySectionAnalyticsSlug(reference: string) {
  const match = reference.match(/^\s*([1-3]?\s?[A-Za-z]+)\s+(\d+):(\d+)(?:-(\d+))?/);
  if (!match) return slugStudyAnalyticsValue(reference);
  const bookSlug = slugStudyAnalyticsValue(match[1]);
  const chapter = match[2];
  const startVerse = match[3];
  const endVerse = match[4] || startVerse;
  return `${bookSlug}${chapter}-${startVerse}-${endVerse}`;
}

function getStudyPhraseTitle(categoryId: string, item: string) {
  const [lead] = item.split("\n");
  return getNestedStudyItemHeading(categoryId, lead);
}

function InlineStudySection({
  section,
  isOpen,
  openCategory,
  openItemKey,
  isCreditLocked,
  onToggleSection,
  onToggleCategory,
  onToggleItem,
  onLockedCategory,
}: {
  section: BibleReaderStudySection;
  isOpen: boolean;
  openCategory: string | null;
  openItemKey: string | null;
  isCreditLocked: boolean;
  onToggleSection: () => void;
  onToggleCategory: (categoryId: string) => void;
  onToggleItem: (categoryId: string, itemIndex: number) => void;
  onLockedCategory: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const visibleCategories = section.categories.filter(
    (category) => category.id !== "key-truths" && category.content.some((item) => item.trim().length > 0),
  );
  const directPhraseCategory =
    visibleCategories.length === 1 && visibleCategories[0].id === "key-phrases"
      ? visibleCategories[0]
      : null;

  return (
    <div ref={sectionRef} className="my-4">
      <button
        type="button"
        onClick={() => {
          onToggleSection();
          if (!isOpen) {
            scrollStudyAccordionHeaderIntoView(sectionRef.current);
          }
        }}
        className={`flex w-full items-center gap-2.5 rounded-2xl border px-2.5 py-3 text-left transition sm:gap-3 sm:px-3 ${
          isOpen
            ? "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,var(--bb-card-border,#dbe7f4))] bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,var(--bb-card,#ffffff))]"
            : "border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] hover:border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_34%,var(--bb-card-border,#dbe7f4))] hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_7%,var(--bb-card,#ffffff))]"
        }`}
        aria-expanded={isOpen}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_14%,transparent)] text-lg">
          {section.icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-black leading-tight text-[var(--bb-text-primary,#111827)]">
            {section.reference}
          </span>
          <span className="mt-0.5 block text-xs font-black leading-5 text-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_58%,var(--bb-text-secondary,#4b5563))]">{section.title}</span>
          {section.summary ? (
            <span className="mt-1 block text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">{section.summary}</span>
          ) : null}
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
        <div className="mt-2 overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_24%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)]">
          {directPhraseCategory ? (
            <div className="px-3 pb-4 pt-1">
              <StudyCategoryContent
                category={directPhraseCategory}
                openItemIndex={
                  openItemKey?.startsWith(`${directPhraseCategory.id}:`)
                    ? Number(openItemKey.split(":")[1])
                    : null
                }
                onToggleItem={(itemIndex) => {
                  if (isCreditLocked) {
                    onLockedCategory();
                    return;
                  }
                  onToggleItem(directPhraseCategory.id, itemIndex);
                }}
                onItemOpened={() => undefined}
              />
            </div>
          ) : visibleCategories.map((category, index) => {
            const categoryOpen = openCategory === category.id;
            return (
              <div
                key={`${section.reference}-${category.id}`}
                ref={(node) => {
                  categoryRefs.current[category.id] = node;
                }}
                className={index > 0 ? "border-t border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,var(--bb-card-border,#dbe7f4))]" : ""}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isCreditLocked) {
                      onLockedCategory();
                      return;
                    }
                    onToggleCategory(category.id);
                    if (!categoryOpen) {
                      scrollStudyAccordionHeaderIntoView(categoryRefs.current[category.id]);
                    }
                  }}
                  className="flex w-full items-center gap-2 px-3 py-3 text-left transition hover:bg-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_7%,var(--bb-card,#ffffff))]"
                  aria-expanded={categoryOpen}
                >
                  <span className="text-base">{category.icon}</span>
                  <span className="min-w-0 flex-1 text-xs font-black leading-5 text-[var(--bb-text-primary,#111827)] sm:text-sm">
                    {category.title}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={`h-4 w-4 shrink-0 text-[var(--bb-accent,#f6b44b)] transition ${categoryOpen ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
                {categoryOpen ? (
                  <div className="border-t border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,var(--bb-card-border,#dbe7f4))] px-3 pb-4 pt-1">
                    <StudyCategoryContent
                      category={category}
                      openItemIndex={
                        openItemKey?.startsWith(`${category.id}:`)
                          ? Number(openItemKey.split(":")[1])
                          : null
                      }
                      onToggleItem={(itemIndex) => onToggleItem(category.id, itemIndex)}
                      onItemOpened={() => undefined}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}


export const VerseHighlighter: React.FC<VerseHighlighterProps> = ({
  book,
  chapter,
  verses,
  plainTextMode = false,
  surface = "default",
  studySectionPlacement = "end",
  hideStudySections = false,
  studySections,
  onStudyNotesCreditBlocked,
  insightPhrases = EMPTY_INSIGHT_PHRASES,
}) => {
  const [highlightMap, setHighlightMap] = useState<Record<number, string>>({});
  const [rangeMap, setRangeMap] = useState<Record<number, VerseHighlightRange[]>>({});
  const [picker, setPicker] = useState<ColorPickerState | null>(null);
  const [rangeColorPickerOpen, setRangeColorPickerOpen] = useState(false);
  const [noteEditor, setNoteEditor] = useState<HighlightNoteEditorState | null>(null);
  const [noteViewer, setNoteViewer] = useState<HighlightNoteViewerState | null>(null);
  const [noteSaving, setNoteSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [creditBlocked, setCreditBlocked] = useState(false);
  const [openStudyReference, setOpenStudyReference] = useState<string | null>(null);
  const [openStudyCategories, setOpenStudyCategories] = useState<Record<string, string | null>>({});
  const [openStudyItems, setOpenStudyItems] = useState<Record<string, string | null>>({});
  const [studyCreditLockedSections, setStudyCreditLockedSections] = useState<Record<string, boolean>>({});
  const [studyCreditUnlockedSections, setStudyCreditUnlockedSections] = useState<Record<string, boolean>>({});
  const [backgroundStudySections, setBackgroundStudySections] = useState<BibleReaderStudySection[]>([]);
  const [needsAggregatedStudySections, setNeedsAggregatedStudySections] = useState(false);
  const [studyNotesCreditPreview, setStudyNotesCreditPreview] = useState<CreditClientResult | null>(null);
  // Off by default: the chapter opens as plain Scripture with quiet
  // underlines, and an Insight Card appears only when one is tapped.
  const [studyModeOn, setStudyModeOn] = useState(false);
  const [insightNotesLoading, setInsightNotesLoading] = useState(false);
  const insightNotesLoadingRef = useRef(false);
  const [openInsightCard, setOpenInsightCard] = useState<string | null>(null);
  // How far down the chapter the Insight Cards have been mounted so far.
  const [insightCardCeiling, setInsightCardCeiling] = useState(6);
  const shareVerse = null as { number: number; text: string } | null;
  const shareContent = "";
  const shareSubmitting = false;
  const shareSuccess = false;
  const setShareVerse = (_value: null) => {};
  const setShareContent = (_value: string) => {};
  const handleShareSubmit = () => {};

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData?.user || null);
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([fetchHighlights(book, chapter), fetchHighlightRanges(book, chapter)])
      .then(([data, ranges]) => {
        const map: Record<number, string> = {};
        data.forEach((h) => { map[h.verse] = h.color; });
        setHighlightMap(map);
        setRangeMap(groupRangesByVerse(ranges));
      })
      .catch(() => {
        setHighlightMap({});
        setRangeMap({});
      })
      .finally(() => setLoading(false));
  }, [user, book, chapter]);

  useEffect(() => {
    if (CORE_STUDY_IS_FREE || !user || plainTextMode || hideStudySections) {
      setStudyNotesCreditPreview(null);
      return;
    }

    let canceled = false;
    const timeoutId = setTimeout(() => {
      void previewCreditAction(ACTION_TYPE.study_notes_section_opened).then((result) => {
        if (!canceled) setStudyNotesCreditPreview(result);
      });
    }, 0);

    return () => {
      canceled = true;
      clearTimeout(timeoutId);
    };
  }, [hideStudySections, plainTextMode, user]);

  useEffect(() => {
    if (studySections || plainTextMode || hideStudySections) {
      setBackgroundStudySections([]);
      return;
    }

    // A chapter with Insight Cards does not preload notes at all.
    //
    // The whole-Bible notes are 482 files and about 35 MB of source. A card
    // only needs them to fill in its body once it has been opened, and its
    // icon, title and preview all come from the small phrase map. So they are
    // fetched on the first tap instead of on arrival.
    if (insightPhrases.length) {
      setBackgroundStudySections([]);
      return;
    }

    // Everything else is handled by <BibleStudySectionsLoader />, which is
    // only rendered for chapters that need the whole-Bible aggregator. Doing
    // it there rather than with an import() here is what keeps that 33 MB
    // chunk out of Genesis 1's graph entirely.
    setNeedsAggregatedStudySections(true);

    return () => setNeedsAggregatedStudySections(false);
  }, [book, chapter, hideStudySections, plainTextMode, studySections, insightPhrases]);


  /**
   * Credits are only spent when the free-study policy is switched off. Under
   * the default policy nothing is consumed and nothing can block the reader,
   * so the upgrade modal never appears for reading, highlighting or notes.
   */
  async function spendCredit(
    actionType: string,
    options?: { userId?: string; actionLabel?: string },
  ): Promise<CreditClientResult> {
    if (CORE_STUDY_IS_FREE) return { ok: true } as CreditClientResult;
    return consumeCreditAction(actionType as never, options as never);
  }

  const handleVerseClick = (verse: number, e: React.MouseEvent) => {
    console.log('[VerseHighlighter] handleVerseClick fired', { verse, user });
    if (!user) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPicker({ mode: "verse", verse, anchor: { x: rect.left + rect.width / 2, y: rect.bottom + 8 } });
  };

  const handlePartialSelection = (verse: number, verseText: string, root: HTMLElement) => {
    if (!user) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return;

    const visibleVerseText = root.textContent || verseText;
    const normalized = normalizeSelectedRange(
      visibleVerseText,
      getTextOffset(root, range.startContainer, range.startOffset),
      getTextOffset(root, range.endContainer, range.endOffset),
    );
    if (!normalized.selectedText) return;

    const overlappingRanges = (rangeMap[verse] || []).filter((savedRange) =>
      rangesOverlap(normalized.startOffset, normalized.endOffset, savedRange.start_offset, savedRange.end_offset),
    );
    const hasWholeVerseHighlight = Boolean(highlightMap[verse]);

    if (overlappingRanges.length || hasWholeVerseHighlight) {
      selection.removeAllRanges();
      setPicker(null);
      setRangeColorPickerOpen(false);

      if (overlappingRanges.length) {
        const overlappingIds = new Set(overlappingRanges.map((savedRange) => savedRange.id));
        setRangeMap((current) => ({
          ...current,
          [verse]: (current[verse] || []).filter((savedRange) => !overlappingIds.has(savedRange.id)),
        }));
        void Promise.all(overlappingRanges.map((savedRange) => deleteHighlightRange(savedRange.id)));
      }

      if (hasWholeVerseHighlight) {
        setHighlightMap((current) => {
          const next = { ...current };
          delete next[verse];
          return next;
        });
        void deleteHighlight(book, chapter, verse);
      }

      return;
    }

    const rect = range.getBoundingClientRect();
    setPicker({
      mode: "range",
      verse,
      startOffset: normalized.startOffset,
      endOffset: normalized.endOffset,
      selectedText: normalized.selectedText,
      anchor: { x: rect.left + rect.width / 2, y: rect.bottom + 8 },
    });
    setRangeColorPickerOpen(false);
  };

  const handleRangeClick = (range: VerseHighlightRange, event: React.MouseEvent) => {
    if (!user) return;
    event.preventDefault();
    event.stopPropagation();

    if (range.note_text) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      setPicker(null);
      setRangeColorPickerOpen(false);
      setNoteViewer({
        range,
        anchor: { x: rect.left + rect.width / 2, y: rect.bottom + 8 },
      });
      return;
    }

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setPicker({
      mode: "range",
      verse: range.verse,
      startOffset: range.start_offset,
      endOffset: range.end_offset,
      selectedText: range.selected_text,
      anchor: { x: rect.left + rect.width / 2, y: rect.bottom + 8 },
      rangeId: range.id,
      selectedColor: range.color,
    });
    setRangeColorPickerOpen(false);
  };

  async function saveRangeFromPicker(pickerState: Extract<ColorPickerState, { mode: "range" }>, color = pickerState.selectedColor || "yellow") {
    if (!user) return null;

    if (pickerState.rangeId) {
      return {
        id: pickerState.rangeId,
        verse: pickerState.verse,
        start_offset: pickerState.startOffset,
        end_offset: pickerState.endOffset,
        selected_text: pickerState.selectedText,
        color,
        note_text: null,
        note_updated_at: null,
        ...(rangeMap[pickerState.verse] || []).find((range) => range.id === pickerState.rangeId),
      } as VerseHighlightRange;
    }

    const creditResult = await spendCredit(ACTION_TYPE.verse_highlighted, { userId: user.id });
    if (!creditResult.ok) {
      if (!CORE_STUDY_IS_FREE) setCreditBlocked(true);
      return null;
    }

    const savedRange = await upsertHighlightRange(book, chapter, {
      verse: pickerState.verse,
      start_offset: pickerState.startOffset,
      end_offset: pickerState.endOffset,
      selected_text: pickerState.selectedText,
      color,
    });

    if (savedRange) {
      setRangeMap((current) => {
        const existing = current[pickerState.verse] || [];
        const withoutSameRange = existing.filter((range) => range.id !== savedRange.id);
        return {
          ...current,
          [pickerState.verse]: [...withoutSameRange, savedRange].sort((a, b) => a.start_offset - b.start_offset),
        };
      });
    }

    return savedRange;
  }

  const handleAddNote = async () => {
    if (!picker || picker.mode !== "range") return;
    const savedRange = await saveRangeFromPicker(picker);
    if (!savedRange) return;
    setPicker(null);
    setRangeColorPickerOpen(false);
    setNoteEditor({ range: savedRange, noteText: savedRange.note_text || "" });
  };

  const handleRemoveRange = async () => {
    if (!picker || picker.mode !== "range" || !picker.rangeId) return;
    const verse = picker.verse;
    const rangeId = picker.rangeId;
    setPicker(null);
    setRangeColorPickerOpen(false);
    setRangeMap((current) => ({
      ...current,
      [verse]: (current[verse] || []).filter((range) => range.id !== rangeId),
    }));
    await deleteHighlightRange(rangeId);
  };

  const handleSaveNote = async () => {
    if (!noteEditor) return;
    setNoteSaving(true);
    const savedRange = await updateHighlightRangeNote(noteEditor.range.id, noteEditor.noteText);
    if (savedRange) {
      setRangeMap((current) => ({
        ...current,
        [savedRange.verse]: (current[savedRange.verse] || [])
          .map((range) => (range.id === savedRange.id ? savedRange : range))
          .sort((a, b) => a.start_offset - b.start_offset),
      }));
      setNoteEditor(null);
    }
    setNoteSaving(false);
  };

  const handleDeleteNote = async () => {
    if (!noteEditor) return;
    setNoteSaving(true);
    const savedRange = await updateHighlightRangeNote(noteEditor.range.id, null);
    if (savedRange) {
      setRangeMap((current) => ({
        ...current,
        [savedRange.verse]: (current[savedRange.verse] || [])
          .map((range) => (range.id === savedRange.id ? savedRange : range))
          .sort((a, b) => a.start_offset - b.start_offset),
      }));
      setNoteEditor(null);
    }
    setNoteSaving(false);
  };

  const handleEditViewedNote = () => {
    if (!noteViewer) return;
    setNoteEditor({ range: noteViewer.range, noteText: noteViewer.range.note_text || "" });
    setNoteViewer(null);
  };

  const handleDeleteViewedNote = async () => {
    if (!noteViewer) return;
    setNoteSaving(true);
    const savedRange = await updateHighlightRangeNote(noteViewer.range.id, null);
    if (savedRange) {
      setRangeMap((current) => ({
        ...current,
        [savedRange.verse]: (current[savedRange.verse] || [])
          .map((range) => (range.id === savedRange.id ? savedRange : range))
          .sort((a, b) => a.start_offset - b.start_offset),
      }));
      setNoteViewer(null);
    }
    setNoteSaving(false);
  };

  const handleColorSelect = async (color: string | null) => {
    if (!picker) return;
    const { verse } = picker;
    if (!user) return;

    if (picker.mode === "range") {
      setPicker(null);
      setRangeColorPickerOpen(false);
      if (picker.rangeId && color === picker.selectedColor) {
        setRangeMap((current) => ({
          ...current,
          [verse]: (current[verse] || []).filter((range) => range.id !== picker.rangeId),
        }));
        await deleteHighlightRange(picker.rangeId);
        return;
      }

      if (color) {
        const creditResult = await spendCredit(ACTION_TYPE.verse_highlighted, { userId: user.id });
        if (!creditResult.ok) {
          if (!CORE_STUDY_IS_FREE) setCreditBlocked(true);
          return;
        }

        const savedRange = await upsertHighlightRange(book, chapter, {
          verse,
          start_offset: picker.startOffset,
          end_offset: picker.endOffset,
          selected_text: picker.selectedText,
          color,
        });

        if (savedRange) {
          setRangeMap((current) => {
            const existing = current[verse] || [];
            const withoutSameRange = existing.filter((range) => range.id !== savedRange.id);
            return {
              ...current,
              [verse]: [...withoutSameRange, savedRange].sort((a, b) => a.start_offset - b.start_offset),
            };
          });
        }
      }
      return;
    }

    setPicker(null);
    const prev = highlightMap[verse] || null;
    // --- REMOVE highlight ---
    if (color === prev) {
      setHighlightMap((m) => { const n = { ...m }; delete n[verse]; return n; });
      await deleteHighlight(book, chapter, verse);
    } else if (color) {
      // --- ADD highlight ---
      const creditResult = await spendCredit(ACTION_TYPE.verse_highlighted, { userId: user.id });
      if (!creditResult.ok) {
        if (!CORE_STUDY_IS_FREE) setCreditBlocked(true);
        return;
      }
      setHighlightMap((m) => ({ ...m, [verse]: color }));
      await upsertHighlight(book, chapter, verse, color);
    }
  };

  // Render all verse numbers as a simple bold number
  function getNumberEmoji(num: number) {
    return <span style={{fontWeight:'bold',fontSize:'1em'}}>{num}</span>;
  }

  const resolvedStudySections = studySections ?? backgroundStudySections;

  const studySectionsByVerse = resolvedStudySections.reduce<Record<number, BibleReaderStudySection[]>>(
    (map, section) => {
      const placementVerse = studySectionPlacement === "start" ? section.startVerse : section.endVerse;
      if (!map[placementVerse]) map[placementVerse] = [];
      map[placementVerse].push(section);
      return map;
    },
    {},
  );

  // A chapter has Insight Cards when the reader hands us its phrases. That is
  // the only thing that decides it; no book or chapter is named here.
  const insightCardsAvailable = !plainTextMode && !hideStudySections && insightPhrases.length > 0;

  /** Reading order picks each card's colour. */
  const insightCardOrder = useMemo(
    () => new Map(insightPhrases.map((phrase, index) => [phrase, index] as const)),
    [insightPhrases],
  );
  const orderOfInsightCard = (phrase: InsightCardPhrase) => insightCardOrder.get(phrase) ?? 0;
  const insightPhrasesForVerse = (verse: number) => insightPhrases.filter((phrase) => phrase.verse === verse);

  function getStudySectionForVerse(verse: number) {
    return (
      resolvedStudySections.find((section) => verse >= section.startVerse && verse <= section.endVerse) || null
    );
  }

  function getKeyPhraseEntries(studySection: BibleReaderStudySection | null) {
    if (!studySection) return [];
    return studySection.categories.find((category) => category.id === "key-phrases")?.content || [];
  }

  /**
   * Find the section holding a phrase's note.
   *
   * Normally that is the section covering the verse. It is searched first so
   * that a title used more than once in the chapter ("God Saw That It Was
   * Good", "Be Fruitful And Multiply") resolves to the right day's note. The
   * sweep over the other sections is a safety net for verses no section covers
   * — Genesis 1:29-31 currently sits inside the 1:26-28 section because its
   * heading in lib/genesisOneSource.ts is missing the leading "#".
   */
  function resolveInsightCardNote(phrase: InsightCardPhrase) {
    const ownSection = getStudySectionForVerse(phrase.verse);
    const ordered = ownSection
      ? [ownSection, ...resolvedStudySections.filter((section) => section !== ownSection)]
      : resolvedStudySections;

    for (const section of ordered) {
      const entries = getKeyPhraseEntries(section);
      if (findPhraseNoteEntry(entries, phrase.noteTitle) !== null) return { section, entries };
    }

    return { section: ownSection, entries: getKeyPhraseEntries(ownSection) };
  }

  /**
   * Study Mode shows the same paid notes the section boxes show, so opening a
   * Insight Card charges the section the same way opening its box does — once,
   * and not again if the reader already unlocked it.
   */
  async function ensureStudySectionUnlocked(studySection: BibleReaderStudySection) {
    if (!user) return true;
    if (studyCreditUnlockedSections[studySection.reference]) return true;

    const creditResult = await spendCredit(ACTION_TYPE.study_notes_section_opened, {
      userId: user.id,
      actionLabel: `opened ${getStudySectionAnalyticsSlug(studySection.reference)} notes opened`,
    });

    if (!creditResult.ok) {
      if (isCreditActionCanceled(creditResult)) return false;
      if (onStudyNotesCreditBlocked) {
        onStudyNotesCreditBlocked();
      } else {
        if (!CORE_STUDY_IS_FREE) setCreditBlocked(true);
      }
      return false;
    }

    setStudyCreditUnlockedSections((current) => ({ ...current, [studySection.reference]: true }));
    if (typeof creditResult.dailyCredits === "number") {
      setStudyNotesCreditPreview((current) => ({
        ...(current || { ok: true }),
        ok: true,
        dailyCredits: creditResult.dailyCredits,
        isPaid: false,
      }));
    }
    return true;
  }

  /** Fetch the notes the first time an Insight Card is opened. */
  async function ensureInsightNotesLoaded() {
    if (resolvedStudySections.length || insightNotesLoadingRef.current) return;
    insightNotesLoadingRef.current = true;
    setInsightNotesLoading(true);

    try {
      // Fetched as data, so the whole-Bible notes never enter the bundle.
      const response = await fetch(
        `/api/study-notes?book=${encodeURIComponent(book)}&chapter=${chapter}`,
      );
      if (!response.ok) throw new Error(`study notes responded ${response.status}`);
      const data = (await response.json()) as { sections?: BibleReaderStudySection[] };
      setBackgroundStudySections(data.sections || []);
    } catch (error) {
      console.warn("[BIBLE_READER_NOTES] Could not load study sections:", error);
      insightNotesLoadingRef.current = false;
    } finally {
      setInsightNotesLoading(false);
    }
  }

  async function handleToggleInsightCard(phrase: InsightCardPhrase, phraseKey: string) {
    if (openInsightCard === phraseKey) {
      setOpenInsightCard(null);
      return;
    }

    // Open straight away; the body drops in when the notes arrive.
    if (insightCardsAvailable) {
      setOpenInsightCard(phraseKey);
      void ensureInsightNotesLoaded();
    }

    const { section: studySection, entries } = resolveInsightCardNote(phrase);
    if (studySection && !(await ensureStudySectionUnlocked(studySection))) return;

    setOpenInsightCard(phraseKey);

    if (studySection) {
      const itemIndex = entries.findIndex((entry) => findPhraseNoteEntry([entry], phrase.noteTitle) !== null);
      if (itemIndex >= 0) void trackStudyPhraseOpened(studySection, "key-phrases", itemIndex);
    }
  }

  function getInitialOpenStudyCategory(studySection: BibleReaderStudySection) {
    const visibleCategories = studySection.categories.filter(
      (category) => category.id !== "key-truths" && category.content.some((item) => item.trim().length > 0),
    );
    return visibleCategories.length === 1 ? visibleCategories[0].id : null;
  }

  async function trackStudyPhraseOpened(studySection: BibleReaderStudySection, categoryId: string, itemIndex: number) {
    if (!user || categoryId !== "key-phrases") return;

    const category = studySection.categories.find((item) => item.id === categoryId);
    const phraseText = category?.content[itemIndex];
    if (!phraseText) return;

    const phraseTitle = getStudyPhraseTitle(categoryId, phraseText);
    const phraseSlug = slugStudyAnalyticsValue(phraseTitle);
    const sectionSlug = getStudySectionAnalyticsSlug(studySection.reference);
    const metadata = (user.user_metadata || {}) as Record<string, unknown>;
    const username =
      (typeof metadata.display_name === "string" && metadata.display_name.trim()) ||
      (typeof metadata.username === "string" && metadata.username.trim()) ||
      (typeof metadata.full_name === "string" && metadata.full_name.trim()) ||
      (typeof user.email === "string" ? user.email : null);

    const { error } = await supabase.from("master_actions").insert({
      user_id: user.id,
      username,
      action_type: ACTION_TYPE.study_notes_viewed,
      action_label: `opened ${sectionSlug}${phraseSlug ? ` ${phraseSlug}` : ""} opened`,
      event_metadata: {
        kind: "reader_phrase_opened",
        source: "bible_reader",
        sourceLabel: "Bible Reader",
        book,
        chapter,
        sectionReference: studySection.reference,
        sectionTitle: studySection.title,
        phraseTitle,
        phraseKey: phraseSlug,
        phraseIndex: itemIndex + 1,
      },
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.warn("[STUDY_NOTES_ANALYTICS] Could not track phrase open:", error);
    }
  }

  async function handleToggleStudySection(studySection: BibleReaderStudySection) {
    if (openStudyReference === studySection.reference) {
      setOpenStudyReference(null);
      setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: null }));
      setOpenStudyItems((current) => ({ ...current, [studySection.reference]: null }));
      return;
    }

    const initialOpenCategory = getInitialOpenStudyCategory(studySection);
    setOpenStudyReference(studySection.reference);
    setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: null }));
    setOpenStudyItems((current) => ({ ...current, [studySection.reference]: null }));

    if (!user || studyCreditUnlockedSections[studySection.reference]) {
      setStudyCreditLockedSections((current) => ({ ...current, [studySection.reference]: false }));
      setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: initialOpenCategory }));
      return;
    }

    const canOpenOptimistically =
      studyNotesCreditPreview?.ok === true &&
      (studyNotesCreditPreview.isPaid === true ||
        (typeof studyNotesCreditPreview.dailyCredits === "number" && studyNotesCreditPreview.dailyCredits > 2));

    if (studyNotesCreditPreview?.ok === true && studyNotesCreditPreview.isPaid !== true && studyNotesCreditPreview.dailyCredits === 0) {
      setStudyCreditLockedSections((current) => ({ ...current, [studySection.reference]: true }));
      setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: null }));
      setOpenStudyItems((current) => ({ ...current, [studySection.reference]: null }));
      return;
    }

    if (canOpenOptimistically) {
      setStudyCreditLockedSections((current) => ({ ...current, [studySection.reference]: false }));
      setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: initialOpenCategory }));
    }

    const creditResult = await spendCredit(ACTION_TYPE.study_notes_section_opened, {
      userId: user.id,
      actionLabel: `opened ${getStudySectionAnalyticsSlug(studySection.reference)} notes opened`,
    });

    if (!creditResult.ok) {
      if (isCreditActionCanceled(creditResult)) {
        setOpenStudyReference(null);
        setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: null }));
        setOpenStudyItems((current) => ({ ...current, [studySection.reference]: null }));
        return;
      }
      setStudyCreditLockedSections((current) => ({ ...current, [studySection.reference]: true }));
      setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: null }));
      setOpenStudyItems((current) => ({ ...current, [studySection.reference]: null }));
      return;
    }

    setStudyCreditUnlockedSections((current) => ({ ...current, [studySection.reference]: true }));
    if (typeof creditResult.dailyCredits === "number") {
      setStudyNotesCreditPreview((current) => ({
        ...(current || { ok: true }),
        ok: true,
        dailyCredits: creditResult.dailyCredits,
        isPaid: false,
      }));
    } else if (studyNotesCreditPreview?.isPaid === true) {
      setStudyNotesCreditPreview((current) => ({ ...(current || { ok: true }), ok: true, isPaid: true }));
    }
    setStudyCreditLockedSections((current) => ({ ...current, [studySection.reference]: false }));
    setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: initialOpenCategory }));
  }

  function renderVerseText(v: { number: number; text: string }) {
    const visibleText = getVisibleVerseText(v);
    const ranges = plainTextMode ? [] : (rangeMap[v.number] || [])
      .filter((range) => range.start_offset >= 0 && range.end_offset <= visibleText.length && range.end_offset > range.start_offset)
      .sort((a, b) => a.start_offset - b.start_offset);

    // The underlines stay on with Study Mode off. Off just means the cards are
    // not listed out; tapping an underlined phrase opens that one card.
    const marks = insightCardsAvailable
      ? getInsightMarks(visibleText, insightPhrasesForVerse(v.number), orderOfInsightCard)
      : [];

    if (!ranges.length && !marks.length) {
      return (
        <span
          className="verse-text-content"
          data-bible-verse-text={v.number}
          onMouseUp={(event) => {
            if (!plainTextMode) handlePartialSelection(v.number, v.text, event.currentTarget);
          }}
          onTouchEnd={(event) => {
            if (plainTextMode) return;
            const root = event.currentTarget;
            window.setTimeout(() => handlePartialSelection(v.number, v.text, root), 0);
          }}
        >
          {visibleText}
        </span>
      );
    }

    // One span per stretch of text that shares a highlight and an underline.
    // Concatenated, they reproduce visibleText character for character.
    const pieces: React.ReactNode[] = buildVerseSegments(visibleText.length, ranges, marks).map((segment) => {
      const content = visibleText.slice(segment.start, segment.end);
      if (!segment.range && !segment.underline) return content;

      const range = segment.range;
      const underline = segment.underline;
      // A saved highlight owns the click, so the existing note and colour
      // actions keep working. Otherwise an underlined phrase opens its card.
      const opensPhraseCard = Boolean(underline && !range);
      // While a phrase's card is open its words carry the card's own colour,
      // so it is obvious at a glance which part of the verse was tapped.
      const phraseIsOpen = Boolean(underline && openInsightCard === underline.phraseKey);

      return (
        <span
          key={`${segment.start}-${segment.end}`}
          className={`${range || phraseIsOpen ? "rounded-[3px]" : ""}${opensPhraseCard ? " cursor-pointer" : ""}`.trim() || undefined}
          style={{
            backgroundColor: range
              ? getColorCode(range.color, surface)
              : phraseIsOpen
                ? underline!.activeBg
                : undefined,
            transition: "background-color 0.18s",
            // The 2px sits on the outside edges of a highlight only, so a
            // highlight split by an underline boundary still looks like one
            // continuous block rather than gaining a gap in the middle.
            paddingLeft: range && segment.start === range.start_offset ? 2 : undefined,
            paddingRight: range && segment.end === range.end_offset ? 2 : undefined,
            // Read mode keeps the underlines as a quiet hint rather than a
            // marked up page, so they drop to about a third of their strength.
            // Faded in read mode, but the open phrase comes back to full
            // strength so it reads as the one you are looking at.
            borderBottom: underline
              ? `${studyModeOn || phraseIsOpen ? "2px" : "1px"} dotted ${underline.color}${
                  studyModeOn || phraseIsOpen ? "" : "59"
                }`
              : undefined,
            paddingBottom: underline ? 1 : undefined,
          }}
          title={
            range
              ? range.note_text
                ? "Click to view this note"
                : "Click to add a note, change color, or remove this highlight"
              : opensPhraseCard
                ? `Open the ${getInsightCardTitle(underline!.phrase)} Insight Card`
                : undefined
          }
          onClick={
            range
              ? (event) => handleRangeClick(range, event)
              : opensPhraseCard
                ? (event) => {
                    // A drag that selected text is a highlight gesture, not a tap.
                    if (!window.getSelection()?.isCollapsed) return;
                    event.stopPropagation();
                    void handleToggleInsightCard(underline!.phrase, underline!.phraseKey);
                  }
                : undefined
          }
        >
          {content}
          {range && segment.isRangeEnd && range.note_text ? (
            <sup
              data-highlight-note-indicator="true"
              contentEditable={false}
              className="ml-0.5 inline-grid h-4 min-w-4 translate-y-[-1px] select-none place-items-center rounded-full bg-sky-500 px-1 text-[9px] font-black leading-none text-white"
            >
              📝
            </sup>
          ) : null}
        </span>
      );
    });

    return (
      <span
        className="verse-text-content"
        data-bible-verse-text={v.number}
        onMouseUp={(event) => {
          if (!plainTextMode) handlePartialSelection(v.number, v.text, event.currentTarget);
        }}
        onTouchEnd={(event) => {
          if (plainTextMode) return;
          const root = event.currentTarget;
          window.setTimeout(() => handlePartialSelection(v.number, v.text, root), 0);
        }}
      >
        {pieces}
      </span>
    );
  }

  /**
   * Resolve every phrase's icon and note body once per notes load.
   *
   * This used to run per card, per render: 87 cards each scanning every
   * section and splitting strings again. Doing it once and reading from a map
   * is the difference between the reader feeling instant and feeling stuck.
   */
  const insightCardNotes = useMemo(() => {
    const map = new Map<string, { icon: string; paragraphs: string[] }>();
    if (!insightCardsAvailable || !resolvedStudySections.length) return map;

    insightPhrases.forEach((phrase) => {
      const { entries } = resolveInsightCardNote(phrase);
      map.set(insightCardKey(phrase), {
        icon:
          getPhraseNoteIcon(entries, phrase.noteTitle) ||
          getNestedStudyItemIcon("key-phrases", getInsightCardTitle(phrase)),
        paragraphs: dropPreviewEcho(extractPhraseNote(entries, phrase.noteTitle), phrase.preview),
      });
    });

    return map;
  }, [insightCardsAvailable, resolvedStudySections]);

  /**
   * Scripture paints immediately; the cards fill in behind it a few verses at
   * a time during idle frames, rather than mounting all 87 at once.
   */
  useEffect(() => {
    if (!insightCardsAvailable || !studyModeOn) return;
    if (insightCardCeiling >= verses.length) return;
    if (typeof window === "undefined") return;

    let cancelled = false;
    const bump = () => {
      if (!cancelled) setInsightCardCeiling((current) => Math.min(current + 6, verses.length));
    };

    // A timer rather than requestIdleCallback: idle callbacks are starved
    // while the tab is in the background, which left the chapter half filled.
    const timeoutId = window.setTimeout(bump, 50);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [insightCardsAvailable, studyModeOn, insightCardCeiling, verses.length]);

  function renderInsightCards(verse: number) {
    const allPhrases = insightPhrasesForVerse(verse);
    // Study Mode on lists every card under the verse. Off shows nothing until
    // the reader taps an underlined phrase, then just that one card.
    const phrases = studyModeOn
      ? allPhrases
      : allPhrases.filter((phrase) => insightCardKey(phrase) === openInsightCard);
    if (!phrases.length) return null;

    // Verses past the ceiling have not been reached by the background fill
    // yet. A tapped card always renders, wherever it is.
    if (studyModeOn && verse > insightCardCeiling) return null;

    return (
      <div className="mb-4 mt-3 flex flex-col gap-2.5">
        {phrases.map((phrase) => {
          const phraseKey = insightCardKey(phrase);
          const colorIndex = orderOfInsightCard(phrase);
          // Title and preview come from the phrase map and are ready straight
          // away. The note body arrives with the notes and only matters once
          // the card is opened.
          const resolved = insightCardNotes.get(phraseKey);

          return (
            <GenesisOneInsightCard
              key={phraseKey}
              phrase={phrase}
              colorIndex={colorIndex}
              // Straight from the phrase map, so a card is complete without
              // the notes having loaded.
              icon={phrase.icon || resolved?.icon || getNestedStudyItemIcon("key-phrases", getInsightCardTitle(phrase))}
              paragraphs={resolved?.paragraphs || []}
              loadingNote={insightNotesLoading && !resolved}
              isOpen={openInsightCard === phraseKey}
              onToggle={() => {
                void handleToggleInsightCard(phrase, phraseKey);
              }}
              // With Study Mode off the card was summoned by tapping the verse,
              // so it needs its own way out.
              onClose={studyModeOn ? undefined : () => setOpenInsightCard(null)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {needsAggregatedStudySections ? (
        <BibleStudySectionsLoader book={book} chapter={chapter} onLoaded={setBackgroundStudySections} />
      ) : null}
      <style>{`
        .bible-selectable-text {
          -webkit-touch-callout: none;
          touch-action: manipulation;
        }
      `}</style>

      {insightCardsAvailable ? (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-white px-3.5 py-3">
          <span className="min-w-0">
            <span className="block text-[0.95rem] font-black leading-5 text-slate-900">Study Mode</span>
            <span className="mt-0.5 block text-xs font-semibold leading-5 text-slate-500">
              {studyModeOn
                ? "Every Insight Card is listed under its verse."
                : "Tap any underlined phrase below to open its Insight Card."}
            </span>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={studyModeOn}
            aria-label="Study Mode"
            onClick={() => {
              setStudyModeOn((on) => !on);
              setOpenInsightCard(null);
            }}
            className={`relative h-[30px] w-[52px] shrink-0 rounded-full transition-colors ${
              studyModeOn ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-[3px] top-[3px] h-6 w-6 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform ${
                studyModeOn ? "translate-x-[22px]" : ""
              }`}
            />
          </button>
        </div>
      ) : null}

      {verses.map((v) => (
        <React.Fragment key={v.number}>
          {plainTextMode || hideStudySections || insightCardsAvailable ? null : studySectionPlacement === "start" ? (studySectionsByVerse[v.number] || []).map((studySection) => (
            <InlineStudySection
              key={`inline-study-${studySection.reference}`}
              section={studySection}
              isOpen={openStudyReference === studySection.reference}
              openCategory={openStudyCategories[studySection.reference] || null}
              openItemKey={openStudyItems[studySection.reference] || null}
              isCreditLocked={Boolean(studyCreditLockedSections[studySection.reference])}
              onToggleSection={() => {
                void handleToggleStudySection(studySection);
              }}
              onToggleCategory={(categoryId) => {
                setOpenStudyCategories((current) => ({
                  ...current,
                  [studySection.reference]: current[studySection.reference] === categoryId ? null : categoryId,
                }));
                setOpenStudyItems((current) => ({ ...current, [studySection.reference]: null }));
              }}
              onToggleItem={(categoryId, itemIndex) => {
                const itemKey = `${categoryId}:${itemIndex}`;
                const isOpening = openStudyItems[studySection.reference] !== itemKey;
                setOpenStudyItems((current) => ({
                  ...current,
                  [studySection.reference]: current[studySection.reference] === itemKey ? null : itemKey,
                }));
                if (isOpening) {
                  void trackStudyPhraseOpened(studySection, categoryId, itemIndex);
                }
              }}
              onLockedCategory={() => {
                if (onStudyNotesCreditBlocked) {
                  onStudyNotesCreditBlocked();
                  return;
                }
                if (!CORE_STUDY_IS_FREE) setCreditBlocked(true);
              }}
            />
          )) : null}
          {insightCardsAvailable ? (
            /* Study Mode runs the number inline with the text rather than in
               its own column. The number stays a sibling of the text span, not
               a child of it, so it never enters the offsets a highlight is
               measured in. */
            <div
              // With the cards listed out they already separate the verses.
              // In read mode the verses run back to back, so they need the gap.
              className={`group verse-line ${studyModeOn ? "mb-1.5" : "mb-4"}`}
              style={{
                backgroundColor: highlightMap[v.number] ? getColorCode(highlightMap[v.number], surface) : "transparent",
                borderRadius: highlightMap[v.number] ? 4 : 0,
                transition: "background-color 0.3s",
              }}
            >
              <button
                type="button"
                className="mr-1.5 inline select-none cursor-pointer rounded-md px-1 align-baseline text-[0.95rem] font-black text-sky-600 tabular-nums hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleVerseClick(v.number, e);
                }}
                title={`Highlight verse ${v.number}`}
                tabIndex={0}
              >
                {v.number}
              </button>
              <span className="verse-text bible-selectable-text break-words text-[1.06rem] leading-[1.75] text-slate-900 selection:bg-sky-200 selection:text-slate-950 [&_p]:inline">
                {renderVerseText(v)}
              </span>
            </div>
          ) : (
            <div
              className="mb-2 flex items-baseline gap-2 group verse-line"
              style={{
                backgroundColor: !plainTextMode && highlightMap[v.number] ? getColorCode(highlightMap[v.number], surface) : "transparent",
                borderRadius: !plainTextMode && highlightMap[v.number] ? 4 : 0,
                transition: "background-color 0.3s",
              }}
            >
              <button
                type="button"
                className="shrink-0 select-none cursor-pointer rounded-md bg-blue-100 px-2 py-0.5 text-lg font-bold shadow-sm hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ minWidth: 32 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!plainTextMode) handleVerseClick(v.number, e);
                }}
                title={`Highlight verse ${v.number}`}
                tabIndex={0}
              >
                {getNumberEmoji(v.number)}
              </button>
              {/* Render enriched HTML for this verse, fallback to plain text */}
              <span
                className="verse-text bible-selectable-text min-w-0 flex-1 break-words text-base leading-relaxed selection:bg-sky-200 selection:text-slate-950 [&_p]:inline"
              >
                {renderVerseText(v)}
              </span>
              {/* Share to Feed button — visible on row hover */}
            </div>
          )}
          {insightCardsAvailable ? renderInsightCards(v.number) : null}
          {plainTextMode || hideStudySections || insightCardsAvailable ? null : studySectionPlacement === "end" ? (studySectionsByVerse[v.number] || []).map((studySection) => (
            <InlineStudySection
              key={`inline-study-${studySection.reference}`}
              section={studySection}
              isOpen={openStudyReference === studySection.reference}
              openCategory={openStudyCategories[studySection.reference] || null}
              openItemKey={openStudyItems[studySection.reference] || null}
              isCreditLocked={Boolean(studyCreditLockedSections[studySection.reference])}
              onToggleSection={() => {
                void handleToggleStudySection(studySection);
              }}
              onToggleCategory={(categoryId) => {
                setOpenStudyCategories((current) => ({
                  ...current,
                  [studySection.reference]: current[studySection.reference] === categoryId ? null : categoryId,
                }));
                setOpenStudyItems((current) => ({ ...current, [studySection.reference]: null }));
              }}
              onToggleItem={(categoryId, itemIndex) => {
                const itemKey = `${categoryId}:${itemIndex}`;
                const isOpening = openStudyItems[studySection.reference] !== itemKey;
                setOpenStudyItems((current) => ({
                  ...current,
                  [studySection.reference]: current[studySection.reference] === itemKey ? null : itemKey,
                }));
                if (isOpening) {
                  void trackStudyPhraseOpened(studySection, categoryId, itemIndex);
                }
              }}
              onLockedCategory={() => {
                if (onStudyNotesCreditBlocked) {
                  onStudyNotesCreditBlocked();
                  return;
                }
                if (!CORE_STUDY_IS_FREE) setCreditBlocked(true);
              }}
            />
          )) : null}
        </React.Fragment>
      ))}
      <ColorPicker
        anchor={picker?.mode === "verse" || rangeColorPickerOpen ? picker?.anchor || null : null}
        selectedColor={
          picker?.mode === "range"
            ? picker.selectedColor || null
            : picker && highlightMap[picker.verse]
              ? highlightMap[picker.verse]
              : null
        }
        onSelect={handleColorSelect}
        onClose={() => {
          setRangeColorPickerOpen(false);
          setPicker(null);
        }}
      />
      <HighlightActionMenu
        anchor={picker?.mode === "range" && !rangeColorPickerOpen ? picker.anchor : null}
        hasSavedRange={Boolean(picker?.mode === "range" && picker.rangeId)}
        hasNote={Boolean(
          picker?.mode === "range" &&
            picker.rangeId &&
            (rangeMap[picker.verse] || []).find((range) => range.id === picker.rangeId)?.note_text,
        )}
        onAddNote={handleAddNote}
        onChangeColor={() => setRangeColorPickerOpen(true)}
        onRemove={handleRemoveRange}
        onClose={() => {
          setRangeColorPickerOpen(false);
          setPicker(null);
        }}
      />
      <HighlightNoteViewer
        state={noteViewer}
        deleting={noteSaving}
        onEdit={handleEditViewedNote}
        onDelete={() => {
          void handleDeleteViewedNote();
        }}
        onClose={() => setNoteViewer(null)}
      />
      <HighlightNoteModal
        state={noteEditor}
        saving={noteSaving}
        onChange={(value) => setNoteEditor((current) => (current ? { ...current, noteText: value } : current))}
        onSave={handleSaveNote}
        onDelete={handleDeleteNote}
        onClose={() => setNoteEditor(null)}
      />
      <CreditLimitModal
        open={creditBlocked}
        userId={user?.id || null}
        onClose={() => setCreditBlocked(false)}
      />

      {/* ── Share Verse to Feed Modal ─────────────────────────────────── */}
      {false && shareVerse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-5">
            {shareSuccess ? (
              <div className="text-center py-6">
                <p className="text-3xl mb-2">✅</p>
                <p className="font-semibold text-gray-900">Shared to your Feed!</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900 text-sm">Share to Bible Buddy Feed</h3>
                  <button onClick={() => setShareVerse(null)} className="text-gray-400 hover:text-gray-600 transition text-lg leading-none">×</button>
                </div>

                {/* Verse preview */}
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">
                    {book.charAt(0).toUpperCase() + book.slice(1)} {chapter}:{shareVerse!.number}
                  </p>
                  <p className="text-sm text-gray-700 italic leading-relaxed">"{shareVerse!.text}"</p>
                </div>

                {/* Thought textarea */}
                <textarea
                  value={shareContent}
                  onChange={(e) => setShareContent(e.target.value)}
                  placeholder="What does this verse mean to you? (optional)"
                  rows={3}
                  autoFocus
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
                />

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    onClick={handleShareSubmit}
                    disabled={shareSubmitting}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white transition disabled:opacity-40"
                    style={{ backgroundColor: "#4a9b6f" }}
                  >
                    {shareSubmitting ? "Sharing..." : "Share"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function getColorCode(color: string, surface: "default" | "dashboard" = "default") {
  if (surface === "dashboard") {
    switch (color) {
      case "yellow": return "#FFF6CF";
      case "green": return "#DDF3E6";
      case "blue": return "#DCEFFE";
      case "purple": return "#ECE6FF";
      case "orange": return "#FFE7CA";
      default: return "transparent";
    }
  }

  switch (color) {
    case "yellow": return "#FFF9C4";
    case "green": return "#C8E6C9";
    case "blue": return "#BBDEFB";
    case "purple": return "#E1BEE7";
    case "orange": return "#FFE0B2";
    default: return "transparent";
  }
}
