"use client";

/**
 * Tells someone their account is no longer being deleted.
 *
 * Asking to delete now starts a 30 day grace period rather than wiping
 * anything (see lib/accountDeletionSchedule.ts). Signing in again inside that
 * window cancels it - this is the part that says so, because silently keeping
 * an account somebody asked to destroy would be worse than not having a grace
 * period at all.
 *
 * It asks the server once per session. For everyone who never requested a
 * deletion - which is everyone, nearly always - that is one indexed lookup
 * that returns `{ pending: false }` and this renders nothing.
 */

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../lib/supabaseClient";
import { lockDocumentScroll } from "../hooks/useDocumentScrollLock";

/** Once per browser session: a reload should not show it again. */
const ASKED_KEY = "bb:deletion-check-done";

export default function DeletionCancelledNotice() {
  const [deletionDate, setDeletionDate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (typeof window === "undefined") return;
      try {
        if (window.sessionStorage.getItem(ASKED_KEY)) return;
        window.sessionStorage.setItem(ASKED_KEY, "1");
      } catch {
        /* private window - asking again is harmless, it is idempotent */
      }

      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token || cancelled) return;

      try {
        const res = await fetch("/api/account/deletion-status", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok || cancelled) return;
        const body = await res.json();
        if (body?.cancelled && body?.wouldHaveBeenDeletedOn) {
          setDeletionDate(String(body.wouldHaveBeenDeletedOn));
        }
      } catch {
        /* never block the app over this */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!deletionDate) return;
    return lockDocumentScroll();
  }, [deletionDate]);

  const close = useCallback(() => setDeletionDate(null), []);

  if (!deletionDate || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your account was not deleted"
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(10, 12, 20, 0.72)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 22,
          padding: "30px 26px 24px",
          background: "linear-gradient(170deg, #1b2a24 0%, #101713 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
          color: "#fff",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ fontSize: 40, lineHeight: 1 }}>🌱</div>
        <h2 style={{ margin: "16px 0 10px", fontSize: 22, fontWeight: 700 }}>Welcome back</h2>
        <p style={{ margin: "0 0 10px", fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.88)" }}>
          Your account was going to be deleted on <strong>{deletionDate}</strong>. You signed in, so we have
          cancelled that.
        </p>
        <p style={{ margin: "0 0 22px", fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.88)" }}>
          Everything is still here — your reading, your notes, all of it.
        </p>
        <button
          onClick={close}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: 700,
            color: "#0f1a14",
            background: "linear-gradient(135deg, #8fe3b0 0%, #4fc98a 100%)",
          }}
        >
          Good, keep it
        </button>
        <p style={{ margin: "14px 0 0", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
          Still want it gone? Settings → Delete my account.
        </p>
      </div>
    </div>,
    document.body,
  );
}
