import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useT } from "../lib/i18n/useT";

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
  /**
   * Share this verse as a picture (lib/verseShareImage.ts). Left out, there
   * is no share row.
   */
  share?: {
    busy: boolean;
    onShare: () => void;
  } | null;
}

const COLORS = [
  { name: "yellow", labelKey: "reader.color.yellow", code: "#FFF9C4" },
  { name: "green", labelKey: "reader.color.green", code: "#C8E6C9" },
  { name: "blue", labelKey: "reader.color.blue", code: "#BBDEFB" },
  { name: "purple", labelKey: "reader.color.purple", code: "#E1BEE7" },
  { name: "orange", labelKey: "reader.color.orange", code: "#FFE0B2" },
] as const;

export const ColorPicker: React.FC<ColorPickerProps> = ({ anchor, selectedColor, onSelect, onClose, memory, share }) => {
  const t = useT();
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
  const rows = (memory ? 1 : 0) + (share ? 1 : 0);
  const width = rows ? 224 : 172;
  const height = 64 + rows * 48;
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
            aria-label={t(c.labelKey)}
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
          {memory.failed ? t("reader.memory.failed") : memory.saved ? `✓ ${t("reader.memory.saved")}` : `🧠 ${t("reader.memory.add")}`}
        </button>
      ) : null}
      {share ? (
        <button
          type="button"
          onClick={share.onShare}
          disabled={share.busy}
          className="whitespace-nowrap rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm font-bold text-gray-900 transition hover:bg-gray-50 disabled:opacity-60"
        >
          {share.busy ? t("reader.share.preparing") : `↗ ${t("reader.share.verse")}`}
        </button>
      ) : null}
    </div>,
    document.body,
  );
};
