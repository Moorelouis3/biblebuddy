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

type HighlightNoteEditorState = {
  range: VerseHighlightRange;
  noteText: string;
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
  const [rangeColorPickerOpen, setRangeColorPickerOpen] = useState(false);
  const [noteEditor, setNoteEditor] = useState<HighlightNoteEditorState | null>(null);
  const [noteSaving, setNoteSaving] = useState(false);
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
    setRangeColorPickerOpen(false);
  };

  const handleRangeClick = (range: VerseHighlightRange, event: React.MouseEvent) => {
    if (!user) return;
    event.preventDefault();
    event.stopPropagation();

    if (range.note_text) {
      setPicker(null);
      setRangeColorPickerOpen(false);
      setNoteEditor({ range, noteText: range.note_text });
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
            title={range.note_text ? "Click to view or edit this note" : "Click to add a note, change color, or remove this highlight"}
            onClick={(event) => handleRangeClick(range, event)}
          >
            {v.text.slice(start, end)}
            {range.note_text ? (
              <sup className="ml-0.5 inline-grid h-4 min-w-4 translate-y-[-1px] place-items-center rounded-full bg-sky-500 px-1 text-[9px] font-black leading-none text-white">
                📝
              </sup>
            ) : null}
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
      <style>{`
        .bible-selectable-text {
          -webkit-touch-callout: none;
          touch-action: manipulation;
        }
      `}</style>
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
            className="verse-text bible-selectable-text min-w-0 flex-1 break-words text-base leading-relaxed selection:bg-sky-200 selection:text-slate-950 [&_p]:inline"
          >
            {renderVerseText(v)}
          </span>
          {/* Share to Feed button — visible on row hover */}
        </div>
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
