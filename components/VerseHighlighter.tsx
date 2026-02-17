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
            className="verse-text break-words text-base leading-relaxed"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted HTML from server-side enrichment
            dangerouslySetInnerHTML={{ __html: getEnrichedHtmlForVerse(v.enrichedHtml, v.text) }}
          />
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
