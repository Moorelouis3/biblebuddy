import React, { useState, useRef, useEffect } from "react";
import { ColorPicker } from "./ColorPicker";
import { fetchHighlights, upsertHighlight, deleteHighlight } from "../lib/verseHighlightingApi";
import { ACTION_TYPE } from "../lib/actionTypes";
import CreditLimitModal from "./CreditLimitModal";
import { supabase } from "../lib/supabaseClient";

interface VerseHighlighterProps {
  book: string;
  chapter: number;
  verses: Array<{ number: number; text: string; enrichedHtml?: string }>;
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


export const VerseHighlighter: React.FC<VerseHighlighterProps> = ({ book, chapter, verses }) => {
  const [highlightMap, setHighlightMap] = useState<Record<number, string>>({});
  const [picker, setPicker] = useState<{ verse: number; anchor: { x: number; y: number } } | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [creditBlocked, setCreditBlocked] = useState(false);

  // Verse share state
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
      // Fetch profile_stats to check is_paid
      const { data: profileStats, error } = await supabase
        .from("profile_stats")
        .select("is_paid, daily_credits")
        .eq("user_id", user.id)
        .maybeSingle();
      // ...existing code...
      if (!profileStats) {
        return;
      }
      if (!profileStats.is_paid) {
        // Increment daily_credits by 1 for free users
        await supabase
          .from("profile_stats")
          .update({ daily_credits: (profileStats.daily_credits ?? 0) + 1 })
          .eq("user_id", user.id);
      }
      setHighlightMap((m) => { const n = { ...m }; delete n[verse]; return n; });
      await deleteHighlight(book, chapter, verse);
    } else if (color) {
      // --- ADD highlight ---
      // Fetch profile_stats to check is_paid and credits
      const { data: profileStats, error } = await supabase
        .from("profile_stats")
        .select("is_paid, daily_credits")
        .eq("user_id", user.id)
        .maybeSingle();
      // ...existing code...
      if (!profileStats) {
        return;
      }
      if (profileStats.is_paid) {
        // Paid users: allow highlight, do not decrement
        setHighlightMap((m) => ({ ...m, [verse]: color }));
        await upsertHighlight(book, chapter, verse, color);
        return;
      }
      // Free users: check credits
      if ((profileStats.daily_credits ?? 0) <= 0) {
        setCreditBlocked(true);
        return;
      }
      // Decrement credits safely
      const { error: decErr, count, status, data: updateData } = await supabase
        .from("profile_stats")
        .update({ daily_credits: (profileStats.daily_credits ?? 0) - 1 })
        .eq("user_id", user.id)
        .gt("daily_credits", 0);
      // Check if update affected a row
      if (
        decErr ||
        (Array.isArray(updateData) && updateData && (updateData as unknown[]).length === 0)
      ) {
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
            dangerouslySetInnerHTML={{ __html: getEnrichedHtmlForVerse(v.enrichedHtml, v.text) }}
          />
          {/* Share to Feed button — visible on row hover */}
          {user && (
            <button
              onClick={(e) => { e.stopPropagation(); setShareVerse({ number: v.number, text: v.text }); setShareContent(""); }}
              className="opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 ml-2 flex-shrink-0 transition-opacity text-gray-400 active:text-green-600 p-1 rounded"
              title={`Share verse ${v.number} to Feed`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          )}
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
      {shareVerse && (
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
                    {book.charAt(0).toUpperCase() + book.slice(1)} {chapter}:{shareVerse.number}
                  </p>
                  <p className="text-sm text-gray-700 italic leading-relaxed">"{shareVerse.text}"</p>
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
