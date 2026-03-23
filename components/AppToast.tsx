"use client";

import { useEffect, useRef, useState } from "react";

type ToastType = "success" | "info" | "warning";

interface ToastPayload {
  message: string;
  type?: ToastType;
}

let _id = 0;

export function triggerToast(message: string, type: ToastType = "success") {
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent("bb:toast", { detail: { message, type } }));
  }
}

export function AppToast() {
  const [item, setItem] = useState<{ id: number; message: string; type: ToastType } | null>(null);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onToast(e: Event) {
      const { message, type = "success" } = (e as CustomEvent<ToastPayload>).detail;
      if (timerRef.current) clearTimeout(timerRef.current);
      setLeaving(false);
      setItem({ id: ++_id, message, type });
      timerRef.current = setTimeout(() => {
        setLeaving(true);
        timerRef.current = setTimeout(() => setItem(null), 230);
      }, 2600);
    }
    document.addEventListener("bb:toast", onToast);
    return () => {
      document.removeEventListener("bb:toast", onToast);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!item) return null;

  const bg =
    item.type === "success" ? "#059669" :
    item.type === "warning" ? "#d97706" :
    "#2563eb";

  const icon =
    item.type === "success" ? "✓" :
    item.type === "warning" ? "⚠" :
    "ℹ";

  return (
    <div
      key={item.id}
      role="status"
      aria-live="polite"
      className={leaving ? "bb-toast-out" : "bb-toast-in"}
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        zIndex: 9997,
        background: bg,
        color: "#fff",
        padding: "0.7rem 1.3rem",
        borderRadius: "9999px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
        fontSize: "0.875rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "0.45rem",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}
    >
      <span style={{ fontSize: "1rem" }}>{icon}</span>
      {item.message}
    </div>
  );
}
