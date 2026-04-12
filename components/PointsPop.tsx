"use client";

import { useEffect, useRef, useState } from "react";

type PointsPayload = {
  delta: number;
  label?: string;
};

let _pointsId = 0;

export function triggerPoints(delta: number, label?: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.dispatchEvent(
    new CustomEvent("bb:points", {
      detail: { delta, label } satisfies PointsPayload,
    }),
  );
}

export function PointsPop() {
  const [items, setItems] = useState<Array<{ id: number; delta: number; label?: string }>>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    function onPoints(e: Event) {
      const { delta, label } = (e as CustomEvent<PointsPayload>).detail || { delta: 0 };
      if (!Number.isFinite(delta) || delta === 0) return;

      const id = ++_pointsId;
      setItems((prev) => [...prev, { id, delta, label }]);

      const t = setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
        timersRef.current.delete(id);
      }, 1750);
      timersRef.current.set(id, t);
    }

    document.addEventListener("bb:points", onPoints);
    return () => {
      document.removeEventListener("bb:points", onPoints);
      for (const t of timersRef.current.values()) {
        clearTimeout(t);
      }
      timersRef.current.clear();
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: "6.5rem",
        right: "1rem",
        zIndex: 9998,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
        alignItems: "flex-end",
      }}
    >
      {items.map((item, index) => {
        const positive = item.delta > 0;
        const color = positive ? "#16a34a" : "#dc2626";
        const bg = positive ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)";
        const border = positive ? "rgba(22,163,74,0.25)" : "rgba(220,38,38,0.25)";
        const text = `${positive ? "+" : ""}${item.delta}`;

        return (
          <div
            key={item.id}
            className="bb-points-float"
            style={{
              transform: `translateY(${index * 2}px)`,
              color,
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: "9999px",
              padding: "0.35rem 0.65rem",
              fontWeight: 800,
              letterSpacing: "0.02em",
              fontSize: "0.95rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              textShadow: "0 1px 0 rgba(255,255,255,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            {text} pts
          </div>
        );
      })}
    </div>
  );
}
