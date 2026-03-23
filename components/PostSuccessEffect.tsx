"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#4ade80", "#60a5fa", "#f472b6", "#facc15",
  "#fb923c", "#a78bfa", "#34d399", "#f87171",
  "#38bdf8", "#e879f9", "#86efac", "#fcd34d",
];

interface Piece {
  id: number;
  color: string;
  x: number;
  y: number;
  r: number;
  w: number;
  h: number;
  ox: number;
  oy: number;
  delay: number;
}

function makePieces(ox: number, oy: number): Piece[] {
  return Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const dist = 70 + Math.random() * 110;
    return {
      id: i,
      color: COLORS[i % COLORS.length],
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 50,
      r: Math.random() * 600 - 300,
      w: 5 + Math.random() * 7,
      h: 9 + Math.random() * 9,
      ox,
      oy,
      delay: Math.random() * 0.08,
    };
  });
}

export function triggerPostSuccess() {
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent("bb:post-success"));
  }
}

export function PostSuccessEffect() {
  const [bursts, setBursts] = useState<{ id: number; pieces: Piece[] }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    function onSuccess() {
      const ox = window.innerWidth / 2;
      const oy = window.innerHeight * 0.72;
      const id = nextId.current++;
      setBursts((prev) => [...prev, { id, pieces: makePieces(ox, oy) }]);
      setTimeout(() => setBursts((prev) => prev.filter((b) => b.id !== id)), 1300);
    }
    document.addEventListener("bb:post-success", onSuccess);
    return () => document.removeEventListener("bb:post-success", onSuccess);
  }, []);

  if (bursts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]" aria-hidden="true">
      {bursts.flatMap(({ id, pieces }) =>
        pieces.map((piece) => (
          <div
            key={`${id}-${piece.id}`}
            style={{
              position: "absolute",
              left: piece.ox,
              top: piece.oy,
              width: piece.w,
              height: piece.h,
              backgroundColor: piece.color,
              borderRadius: "2px",
              ["--cf-x" as string]: `${piece.x}px`,
              ["--cf-y" as string]: `${piece.y}px`,
              ["--cf-r" as string]: `${piece.r}deg`,
              animation: `bbConfetti 1.1s cubic-bezier(0.25,0.46,0.45,0.94) ${piece.delay}s both`,
            }}
          />
        ))
      )}
    </div>
  );
}
