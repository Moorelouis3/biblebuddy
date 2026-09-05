"use client";

import { useEffect, useState } from "react";

// Floating "+XP" feedback, revived with the 2026-09-05 points relaunch.
// Every completion path in the app already calls triggerPoints(); this
// renders the pops globally (mounted once in app/layout.tsx).

type Pop = {
  id: number;
  delta: number;
  label?: string;
};

const EVENT_NAME = "bb:points-pop";
let nextPopId = 1;

export function triggerPoints(delta: number, label?: string) {
  if (typeof window === "undefined") return;
  if (!Number.isFinite(delta) || delta <= 0) return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { delta: Math.round(delta), label } }));
}

export function PointsPop() {
  const [pops, setPops] = useState<Pop[]>([]);

  useEffect(() => {
    function onPop(event: Event) {
      const detail = (event as CustomEvent).detail as { delta: number; label?: string } | undefined;
      if (!detail || !detail.delta) return;
      const pop: Pop = { id: nextPopId++, delta: detail.delta, label: detail.label };
      setPops((current) => [...current.slice(-3), pop]);
      window.setTimeout(() => {
        setPops((current) => current.filter((item) => item.id !== pop.id));
      }, 1900);
    }
    window.addEventListener(EVENT_NAME, onPop);
    return () => window.removeEventListener(EVENT_NAME, onPop);
  }, []);

  if (pops.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-[9999] flex flex-col items-center gap-1">
      {pops.map((pop) => (
        <div
          key={pop.id}
          className="bb-points-pop rounded-full bg-[var(--bb-accent,#2f7fe8)] px-4 py-1.5 text-sm font-black text-white shadow-lg"
        >
          +{pop.delta} XP{pop.label ? ` · ${pop.label}` : ""}
        </div>
      ))}
      <style>{`
        .bb-points-pop {
          animation: bb-points-pop-float 1.9s ease-out forwards;
        }
        @keyframes bb-points-pop-float {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          15% {
            opacity: 1;
            transform: translateY(0) scale(1.05);
          }
          30% {
            transform: translateY(0) scale(1);
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-26px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
