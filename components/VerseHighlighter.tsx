import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ColorPicker } from "./ColorPicker";
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
import { consumeCreditAction, isCreditActionCanceled } from "../lib/creditClient";
import {
  getBibleReaderStudySections,
  type BibleReaderStudyNoteCategory,
  type BibleReaderStudySection,
} from "../lib/bibleReaderStudyNotes";

interface VerseHighlighterProps {
  book: string;
  chapter: number;
  verses: Array<{ number: number; text: string; enrichedHtml?: string }>;
  plainTextMode?: boolean;
  surface?: "default" | "dashboard";
  studySectionPlacement?: "end" | "start";
  hideStudySections?: boolean;
  studySections?: BibleReaderStudySection[];
  onStudyNotesCreditBlocked?: () => void;
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

// Utility to extract the inner HTML for a verse from enriched HTML
function getEnrichedHtmlForVerse(enrichedHtml: string | undefined, fallback: string) {
  if (!enrichedHtml) return fallback;
  // Remove any outer <p> tags if present
  let html = enrichedHtml.trim();
  if (html.startsWith('<p') && html.endsWith('</p>')) {
    // Remove the opening <p ...> and closing </p>
    html = html.replace(/^<p[^>]*>/, '').replace(/<\/p>$/, '');
    // Remove the leading verse number badge if present
    html = html.replace(/^<span[^>]*>.*?<\/span>/, '').trim();
  }
  return html;
}

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

function getVisibleVerseText(v: { text: string; enrichedHtml?: string }, plainTextMode: boolean) {
  if (plainTextMode || !v.enrichedHtml) return v.text;

  return decodeHtmlEntities(
    getEnrichedHtmlForVerse(v.enrichedHtml, v.text)
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
                    window.setTimeout(() => {
                      itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
                      onItemOpened(index);
                    }, 0);
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
                <div className="space-y-2 border-t border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_12%,var(--bb-card-border,#dbe7f4))] px-4 py-3 pl-11 text-xs font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)] sm:text-sm sm:leading-6">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
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
              className="space-y-3 px-1 text-xs font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)] sm:text-sm sm:leading-7"
            >
              {flatParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
                  <p className="font-black leading-5 text-[var(--bb-text-primary,#111827)]">{lead}</p>
                </div>
                <div className="mt-2 space-y-2 pl-8">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
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

  return (
    <div ref={sectionRef} className="my-4">
      <button
        type="button"
        onClick={() => {
          onToggleSection();
          if (!isOpen) {
            window.setTimeout(() => {
              sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 0);
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
          {visibleCategories.map((category, index) => {
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
                      window.setTimeout(() => {
                        categoryRefs.current[category.id]?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 0);
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

    const creditResult = await consumeCreditAction(ACTION_TYPE.verse_highlighted, { userId: user.id });
    if (!creditResult.ok) {
      setCreditBlocked(true);
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
        const creditResult = await consumeCreditAction(ACTION_TYPE.verse_highlighted, { userId: user.id });
        if (!creditResult.ok) {
          setCreditBlocked(true);
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
      const creditResult = await consumeCreditAction(ACTION_TYPE.verse_highlighted, { userId: user.id });
      if (!creditResult.ok) {
        setCreditBlocked(true);
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

  const resolvedStudySections = studySections ?? getBibleReaderStudySections(book, chapter);

  const studySectionsByVerse = resolvedStudySections.reduce<Record<number, BibleReaderStudySection[]>>(
    (map, section) => {
      const placementVerse = studySectionPlacement === "start" ? section.startVerse : section.endVerse;
      if (!map[placementVerse]) map[placementVerse] = [];
      map[placementVerse].push(section);
      return map;
    },
    {},
  );

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

    const creditResult = await consumeCreditAction(ACTION_TYPE.study_notes_section_opened, {
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
    setStudyCreditLockedSections((current) => ({ ...current, [studySection.reference]: false }));
    setOpenStudyCategories((current) => ({ ...current, [studySection.reference]: initialOpenCategory }));
  }

  function renderVerseText(v: { number: number; text: string; enrichedHtml?: string }) {
    const visibleText = getVisibleVerseText(v, plainTextMode);
    const ranges = plainTextMode ? [] : (rangeMap[v.number] || [])
      .filter((range) => range.start_offset >= 0 && range.end_offset <= visibleText.length && range.end_offset > range.start_offset)
      .sort((a, b) => a.start_offset - b.start_offset);

    if (!ranges.length) {
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
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML from server-side enrichment
          dangerouslySetInnerHTML={{ __html: plainTextMode ? v.text : getEnrichedHtmlForVerse(v.enrichedHtml, v.text) }}
        />
      );
    }

    const pieces: React.ReactNode[] = [];
    let cursor = 0;

    ranges.forEach((range) => {
      const start = Math.max(cursor, range.start_offset);
      const end = Math.max(start, range.end_offset);
      if (start > cursor) pieces.push(visibleText.slice(cursor, start));
      if (end > start) {
        pieces.push(
          <span
            key={range.id}
            className="rounded-[3px] px-0.5"
            style={{ backgroundColor: getColorCode(range.color, surface) }}
            title={range.note_text ? "Click to view this note" : "Click to add a note, change color, or remove this highlight"}
            onClick={(event) => handleRangeClick(range, event)}
          >
            {visibleText.slice(start, end)}
            {range.note_text ? (
              <sup
                data-highlight-note-indicator="true"
                contentEditable={false}
                className="ml-0.5 inline-grid h-4 min-w-4 translate-y-[-1px] select-none place-items-center rounded-full bg-sky-500 px-1 text-[9px] font-black leading-none text-white"
              >
                📝
              </sup>
            ) : null}
          </span>,
        );
      }
      cursor = Math.max(cursor, end);
    });

    if (cursor < visibleText.length) pieces.push(visibleText.slice(cursor));

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

  return (
    <div>
      <style>{`
        .bible-selectable-text {
          -webkit-touch-callout: none;
          touch-action: manipulation;
        }
      `}</style>
      {verses.map((v) => (
        <React.Fragment key={v.number}>
          {plainTextMode || hideStudySections ? null : studySectionPlacement === "start" ? (studySectionsByVerse[v.number] || []).map((studySection) => (
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
                setCreditBlocked(true);
              }}
            />
          )) : null}
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
          {plainTextMode || hideStudySections ? null : studySectionPlacement === "end" ? (studySectionsByVerse[v.number] || []).map((studySection) => (
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
                setCreditBlocked(true);
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
