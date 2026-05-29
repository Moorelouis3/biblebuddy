import React, { useState, useRef, useEffect } from "react";
import { ColorPicker } from "./ColorPicker";
import {
  deleteHighlight,
  deleteHighlightRange,
  fetchHighlightRanges,
  fetchHighlights,
  upsertHighlight,
  upsertHighlightRange,
  type VerseHighlightRange,
} from "../lib/verseHighlightingApi";
import { ACTION_TYPE } from "../lib/actionTypes";
import CreditLimitModal from "./CreditLimitModal";
import { supabase } from "../lib/supabaseClient";
import { consumeCreditAction } from "../lib/creditClient";

interface VerseHighlighterProps {
  book: string;
  chapter: number;
  verses: Array<{ number: number; text: string; enrichedHtml?: string }>;
  plainTextMode?: boolean;
  surface?: "default" | "dashboard";
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

function getTextOffset(root: HTMLElement, targetNode: Node, targetOffset: number) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let offset = 0;
  let node = walker.nextNode();

  while (node) {
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


export const VerseHighlighter: React.FC<VerseHighlighterProps> = ({
  book,
  chapter,
  verses,
  plainTextMode = false,
  surface = "default",
}) => {
  const [highlightMap, setHighlightMap] = useState<Record<number, string>>({});
  const [rangeMap, setRangeMap] = useState<Record<number, VerseHighlightRange[]>>({});
  const [picker, setPicker] = useState<ColorPickerState | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [creditBlocked, setCreditBlocked] = useState(false);
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

    const normalized = normalizeSelectedRange(
      verseText,
      getTextOffset(root, range.startContainer, range.startOffset),
      getTextOffset(root, range.endContainer, range.endOffset),
    );
    if (!normalized.selectedText) return;

    const rect = range.getBoundingClientRect();
    setPicker({
      mode: "range",
      verse,
      startOffset: normalized.startOffset,
      endOffset: normalized.endOffset,
      selectedText: normalized.selectedText,
      anchor: { x: rect.left + rect.width / 2, y: rect.bottom + 8 },
    });
  };

  const handleRangeClick = (range: VerseHighlightRange, event: React.MouseEvent) => {
    if (!user) return;
    event.preventDefault();
    event.stopPropagation();

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
  };

  const handleColorSelect = async (color: string | null) => {
    if (!picker) return;
    const { verse } = picker;
    setPicker(null);
    if (!user) return;

    if (picker.mode === "range") {
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

  function renderVerseText(v: { number: number; text: string; enrichedHtml?: string }) {
    const ranges = (rangeMap[v.number] || [])
      .filter((range) => range.start_offset >= 0 && range.end_offset <= v.text.length && range.end_offset > range.start_offset)
      .sort((a, b) => a.start_offset - b.start_offset);

    if (!ranges.length) {
      return (
        <span
          className="verse-text-content"
          data-bible-verse-text={v.number}
          onMouseUp={(event) => handlePartialSelection(v.number, v.text, event.currentTarget)}
          onTouchEnd={(event) => {
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
      if (start > cursor) pieces.push(v.text.slice(cursor, start));
      if (end > start) {
        pieces.push(
          <span
            key={range.id}
            className="rounded-[3px] px-0.5"
            style={{ backgroundColor: getColorCode(range.color, surface) }}
            title="Click to change or remove this highlight"
            onClick={(event) => handleRangeClick(range, event)}
          >
            {v.text.slice(start, end)}
          </span>,
        );
      }
      cursor = Math.max(cursor, end);
    });

    if (cursor < v.text.length) pieces.push(v.text.slice(cursor));

    return (
      <span
        className="verse-text-content"
        data-bible-verse-text={v.number}
        onMouseUp={(event) => handlePartialSelection(v.number, v.text, event.currentTarget)}
        onTouchEnd={(event) => {
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
      {verses.map((v) => (
        <div
          key={v.number}
          className="mb-2 flex items-baseline gap-2 group verse-line"
          style={{ backgroundColor: highlightMap[v.number] ? getColorCode(highlightMap[v.number], surface) : "transparent", borderRadius: highlightMap[v.number] ? 4 : 0, transition: "background-color 0.3s" }}
        >
          <button
            type="button"
            className="shrink-0 select-none cursor-pointer rounded-md bg-blue-100 px-2 py-0.5 text-lg font-bold shadow-sm hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ minWidth: 32 }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVerseClick(v.number, e); }}
            title={`Highlight verse ${v.number}`}
            tabIndex={0}
          >
            {getNumberEmoji(v.number)}
          </button>
          {/* Render enriched HTML for this verse, fallback to plain text */}
          <span
            className="verse-text min-w-0 flex-1 break-words text-base leading-relaxed selection:bg-sky-200 selection:text-slate-950 [&_p]:inline"
          >
            {renderVerseText(v)}
          </span>
          {/* Share to Feed button — visible on row hover */}
        </div>
      ))}
      <ColorPicker
        anchor={picker?.anchor || null}
        selectedColor={
          picker?.mode === "range"
            ? picker.selectedColor || null
            : picker && highlightMap[picker.verse]
              ? highlightMap[picker.verse]
              : null
        }
        onSelect={handleColorSelect}
        onClose={() => setPicker(null)}
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
