import React, { useState, useRef, useEffect } from "react";
import { ColorPicker } from "./ColorPicker";
import { fetchHighlights, upsertHighlight, deleteHighlight } from "../lib/verseHighlightingApi";
import { supabase } from "../lib/supabaseClient";

interface VerseHighlighterProps {
  book: string;
  chapter: number;
  verses: Array<{ number: number; text: string }>;
}

export const VerseHighlighter: React.FC<VerseHighlighterProps> = ({ book, chapter, verses }) => {

  const [highlightMap, setHighlightMap] = useState<Record<number, string>>({});
  const [picker, setPicker] = useState<{ verse: number; anchor: { x: number; y: number } } | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);


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
    if (color === prev) {
      setHighlightMap((m) => { const n = { ...m }; delete n[verse]; return n; });
      await deleteHighlight(book, chapter, verse);
    } else if (color) {
      setHighlightMap((m) => ({ ...m, [verse]: color }));
      await upsertHighlight(book, chapter, verse, color);
    }
  };

  return (
    <div>
      {verses.map((v) => (
        <span
          key={v.number}
          className="verse-text group transition-colors duration-200"
          style={{ backgroundColor: highlightMap[v.number] ? getColorCode(highlightMap[v.number]) : "transparent", borderRadius: highlightMap[v.number] ? 4 : 0, transition: "background-color 0.3s" }}
        >
          <span
            className="select-none text-xs text-gray-400 mr-1 cursor-pointer hover:text-blue-600"
            onClick={(e) => { e.stopPropagation(); handleVerseClick(v.number, e); }}
            title="Highlight this verse"
          >
            {v.number}
          </span>
          {v.text}
        </span>
      ))}
      <ColorPicker
        anchor={picker?.anchor || null}
        selectedColor={picker && highlightMap[picker.verse] ? highlightMap[picker.verse] : null}
        onSelect={handleColorSelect}
        onClose={() => setPicker(null)}
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
