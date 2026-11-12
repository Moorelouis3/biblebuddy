import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ColorPickerProps {
  anchor: { x: number; y: number } | null;
  selectedColor: string | null;
  onSelect: (color: string | null) => void;
  onClose: () => void;
  /**
   * Bible Memory (2026-11-12). When the reader passes this, the menu a verse
   * number opens gains "Add to Bible Memory" under the highlight colours.
   * Left out, the picker is exactly what it was: five colours.
   */
  memory?: {
    saved: boolean;
    busy: boolean;
    failed: boolean;
    onToggle: () => void;
  } | null;
}

const COLORS = [
  { name: "yellow", code: "#FFF9C4" },
  { name: "green", code: "#C8E6C9" },
  { name: "blue", code: "#BBDEFB" },
  { name: "purple", code: "#E1BEE7" },
  { name: "orange", code: "#FFE0B2" },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ anchor, selectedColor, onSelect, onClose, memory }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!anchor) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [anchor, onClose]);


  if (!anchor || !mounted) return null;

  // Wider and taller when the Bible Memory row is there, so it never opens
  // half off the edge of a phone.
  const width = memory ? 224 : 172;
  const height = memory ? 112 : 64;
  const left = Math.min(Math.max(anchor.x - 80, 12), window.innerWidth - width);
  const top = Math.min(Math.max(anchor.y, 12), window.innerHeight - height);

  return createPortal(
    <div
      ref={ref}
      className="fixed z-[9999] flex flex-col gap-2 rounded-lg border bg-white p-2 shadow-lg animate-fade-in"
      style={{ top, left }}
    >
      <div className="flex gap-2">
        {COLORS.map((c) => (
          <button
            key={c.name}
            aria-label={c.name}
            className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${selectedColor === c.name ? "border-gray-800 scale-110" : "border-transparent"}`}
            style={{ backgroundColor: c.code }}
            onClick={() => onSelect(c.name)}
          />
        ))}
      </div>
      {memory ? (
        <button
          type="button"
          onClick={memory.onToggle}
          disabled={memory.busy}
          aria-pressed={memory.saved}
          className={`whitespace-nowrap rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
            memory.saved ? "border-green-600 bg-green-50 text-green-800" : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
          }`}
        >
          {memory.failed ? "Did not save. Tap to retry" : memory.saved ? "✓ In Bible Memory" : "🧠 Add to Bible Memory"}
        </button>
      ) : null}
    </div>,
    document.body,
  );
};
