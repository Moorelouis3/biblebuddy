import React, { useState, useRef, useEffect } from "react";

interface ColorPickerProps {
  anchor: { x: number; y: number } | null;
  selectedColor: string | null;
  onSelect: (color: string | null) => void;
  onClose: () => void;
}

const COLORS = [
  { name: "yellow", code: "#FFF9C4" },
  { name: "green", code: "#C8E6C9" },
  { name: "blue", code: "#BBDEFB" },
  { name: "purple", code: "#E1BEE7" },
  { name: "orange", code: "#FFE0B2" },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ anchor, selectedColor, onSelect, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  if (!anchor) return null;

  return (
    <div
      ref={ref}
      className="fixed z-50 p-2 rounded-lg shadow-lg bg-white border flex gap-2 animate-fade-in"
      style={{ top: anchor.y, left: anchor.x }}
    >
      {COLORS.map((c) => (
        <button
          key={c.name}
          aria-label={c.name}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${selectedColor === c.name ? "border-gray-800 scale-110" : "border-transparent"}`}
          style={{ backgroundColor: c.code }}
          onClick={() => onSelect(selectedColor === c.name ? null : c.name)}
        />
      ))}
    </div>
  );
};
