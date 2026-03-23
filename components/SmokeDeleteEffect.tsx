"use client";

import { useEffect, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  tx: number;
  scale: number;
};

let _pid = 0;
let _lastX = 0;
let _lastY = 0;
let _trackingInit = false;

function initTracking() {
  if (_trackingInit || typeof window === "undefined") return;
  _trackingInit = true;
  _lastX = window.innerWidth / 2;
  _lastY = window.innerHeight / 2;
  window.addEventListener("mousedown", (e) => { _lastX = e.clientX; _lastY = e.clientY; }, { passive: true });
  window.addEventListener("touchstart", (e) => {
    if (e.touches[0]) { _lastX = e.touches[0].clientX; _lastY = e.touches[0].clientY; }
  }, { passive: true });
}

export function triggerSmokeDelete() {
  if (typeof document === "undefined") return;
  document.dispatchEvent(new CustomEvent("bb:smoke-delete", { detail: { x: _lastX, y: _lastY } }));
}

export function SmokeDeleteEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    initTracking();

    function handle(e: Event) {
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      const burst: Particle[] = [-44, -22, 0, 22, 44].map((base) => ({
        id: _pid++,
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        tx: base + (Math.random() - 0.5) * 16,
        scale: 0.8 + Math.random() * 0.6,
      }));

      setParticles((prev) => [...prev, ...burst]);

      const ids = new Set(burst.map((p) => p.id));
      setTimeout(() => setParticles((prev) => prev.filter((p) => !ids.has(p.id))), 820);
    }

    document.addEventListener("bb:smoke-delete", handle);
    return () => document.removeEventListener("bb:smoke-delete", handle);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <style>{`
        @keyframes bbSmokeUp {
          0%   { transform: translate(0, 0) scale(0.4) rotate(-5deg); opacity: 1; }
          50%  { opacity: 0.65; }
          100% { transform: translate(var(--bb-tx), -85px) scale(var(--bb-s)) rotate(12deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: p.x - 14,
            top: p.y - 14,
            fontSize: "1.5rem",
            lineHeight: 1,
            display: "block",
            animation: "bbSmokeUp 0.78s ease-out forwards",
            "--bb-tx": `${p.tx}px`,
            "--bb-s": p.scale * 2,
          } as React.CSSProperties}
        >
          💨
        </span>
      ))}
    </div>
  );
}
