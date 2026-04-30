import React, { useState, useRef, useEffect } from "react";
import { ColorPicker } from "./ColorPicker";
import { fetchHighlights, upsertHighlight, deleteHighlight } from "../lib/verseHighlightingApi";
import { ACTION_TYPE } from "../lib/actionTypes";
import CreditLimitModal from "./CreditLimitModal";
import { supabase } from "../lib/supabaseClient";
import { consumeCreditAction } from "../lib/creditClient";

interface VerseHighlighterProps {
  book: string;
  chapter: number;
  verses: Array<{ number: number; text: string; enrichedHtml?: string }>;
  plainTextMode?: boolean;
}

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


export const VerseHighlighter: React.FC<VerseHighlighterProps> = ({ book, chapter, verses, plainTextMode = false }) => {
  const [highlightMap, setHighlightMap] = useState<Record<number, string>>({});
  const [picker, setPicker] = useState<{ verse: number; anchor: { x: number; y: number } } | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [creditBlocked, setCreditBlocked] = useState(false);

  // Kept in place so the feed feature can be re-enabled later without losing logic.
  const [shareVerse, setShareVerse] = useState<{ number: number; text: string } | null>(null);
  const [shareContent, setShareContent] = useState("");
  const [shareSubmitting, setShareSubmitting] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  async function handleShareSubmit() {
    if (!user || !shareVerse || shareSubmitting) return;
    setShareSubmitting(true);
    const verseRef = `${book.charAt(0).toUpperCase() + book.slice(1)} ${chapter}:${shareVerse.number}`;
    const { data, error } = await supabase
      .from("feed_posts")
      .insert({
        user_id: user.id,
        post_type: "verse",
        content: shareContent.trim() || "",
        verse_ref: verseRef,
        verse_text: shareVerse.text,
        visibility: "community",
      })
      .select("id")
      .single();

    if (!error && data) {
      void supabase.rpc("log_feed_activity", {
        p_activity_type: "verse_shared",
        p_activity_data: { verse_ref: verseRef, post_id: data.id },
        p_feed_post_id: data.id,
        p_is_public: true,
      });
      setShareSuccess(true);
      setTimeout(() => {
        setShareVerse(null);
        setShareContent("");
        setShareSuccess(false);
      }, 1800);
    }
    setShareSubmitting(false);
  }

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData?.user || null);
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchHighlights(book, chapter)
      .then((data) => {
        const map: Record<number, string> = {};
        data.forEach((h) => { map[h.verse] = h.color; });
        setHighlightMap(map);
      })
      .catch(() => setHighlightMap({}))
      .finally(() => setLoading(false));
  }, [user, book, chapter]);

  const handleVerseClick = (verse: number, e: React.MouseEvent) => {
    console.log('[VerseHighlighter] handleVerseClick fired', { verse, user });
    if (!user) return;
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPicker({ verse, anchor: { x: rect.left + rect.width / 2, y: rect.bottom + window.scrollY + 4 } });
  };

  const handleColorSelect = async (color: string | null) => {
    if (!picker) return;
    const { verse } = picker;
    const prev = highlightMap[verse] || null;
    setPicker(null);
    if (!user) return;
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

  return (
    <div>
      {verses.map((v) => (
        <div
          key={v.number}
          className="flex items-start mb-2 group verse-line"
          style={{ backgroundColor: highlightMap[v.number] ? getColorCode(highlightMap[v.number]) : "transparent", borderRadius: highlightMap[v.number] ? 4 : 0, transition: "background-color 0.3s" }}
        >
          <button
            className="select-none text-lg mr-3 cursor-pointer hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold bg-blue-100 px-2 py-0.5 rounded-md shadow-sm"
            style={{ minWidth: 32 }}
            onClick={(e) => { e.stopPropagation(); handleVerseClick(v.number, e); }}
            title={`Highlight verse ${v.number}`}
            tabIndex={0}
          >
            {getNumberEmoji(v.number)}
          </button>
          {/* Render enriched HTML for this verse, fallback to plain text */}
          <span
            className="verse-text break-words text-base leading-relaxed flex-1"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML from server-side enrichment
            dangerouslySetInnerHTML={{ __html: plainTextMode ? v.text : getEnrichedHtmlForVerse(v.enrichedHtml, v.text) }}
          />
          {/* Share to Feed button — visible on row hover */}
        </div>
      ))}
      <ColorPicker
        anchor={picker?.anchor || null}
        selectedColor={picker && highlightMap[picker.verse] ? highlightMap[picker.verse] : null}
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

function getColorCode(color: string) {
  switch (color) {
    case "yellow": return "#FFF9C4";
    case "green": return "#C8E6C9";
    case "blue": return "#BBDEFB";
    case "purple": return "#E1BEE7";
    case "orange": return "#FFE0B2";
    default: return "transparent";
  }
}
