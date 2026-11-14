"use client";

/**
 * Tips: every tutorial, opened by hand (Louis, 2026-11-13).
 *
 * PROPOSAL / PREVIEW. This page is not linked from anywhere yet; it is
 * reached by typing /tips. It is the "place to reopen tutorials" from
 * docs/POPUP_SYSTEM_PROPOSAL.md and, until the rollout is approved, the way
 * to look at each proposed popup in the approved design.
 *
 * Opening one here is never counted as an automatic display, is never
 * limited by the once-a-visit rule, and changes nobody's history: somebody
 * who asked to see a tutorial has not been interrupted by it.
 *
 * ?open=<popup id> opens one straight away, so a tutorial can be linked to.
 */

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findPopup, TIPS_CATALOG, type PopupDefinition } from "@/lib/popups/catalog";
import { setTestMode, testModeOn } from "@/lib/popups/switch";
import FeaturePopup from "./FeaturePopup";

// /tips?popup_test=on and =off (lib/popups/switch.ts). Done as the file loads,
// not in an effect, so it is already decided before any popup on the page
// asks whether the coordinator is in charge.
if (typeof window !== "undefined") {
  try {
    const wanted = new URLSearchParams(window.location.search).get("popup_test");
    if (wanted === "on" || wanted === "off") setTestMode(wanted === "on");
  } catch {
    // Unreadable address: leave test mode as it was.
  }
}

export default function TipsPage() {
  const router = useRouter();
  const [open, setOpen] = useState<PopupDefinition | null>(null);
  /** Popup test mode in this browser: null until read. */
  const [testing, setTesting] = useState<boolean | null>(null);

  // ?open=<id>. Read after the page has settled, as the popups do.
  useEffect(() => {
    const timer = setTimeout(() => {
      const search = new URLSearchParams(window.location.search);
      setTesting(testModeOn());
      const wanted = findPopup(search.get("open") || "");
      if (wanted) setOpen(wanted);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(() => {
    const href = open?.cta.href;
    setOpen(null);
    if (href) router.push(href);
  }, [open, router]);

  return (
    <main className="mx-auto w-full max-w-[720px] px-4 pb-28 pt-6">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#6d28d9]">Tips</p>
      <h1 className="mt-1 text-[28px] font-black leading-tight text-[var(--bb-text-primary,#14122b)]">How Bible Buddy works</h1>
      <p className="mt-1.5 text-[15px] font-semibold text-[var(--bb-text-muted,#5b6079)]">
        Short guides to the main parts of the app. Tap one to open it.
      </p>

      {testing ? (
        <div className="mt-4 rounded-2xl border border-[#bfdcf8] bg-[#eef7ff] p-3.5">
          <p className="text-[14px] font-black text-[#14122b]">Popup test mode is ON for this device</p>
          <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[#4b5068]">
            Only this phone or browser follows the new one-popup-per-visit rule. Nobody else is affected.
          </p>
          <button
            type="button"
            onClick={() => setTesting(setTestMode(false))}
            className="mt-2.5 min-h-[44px] rounded-full bg-white px-5 text-[14px] font-black text-[#1d4ed8] shadow-sm outline-none focus-visible:ring-4 focus-visible:ring-[#93c5fd]"
          >
            Turn test mode off
          </button>
        </div>
      ) : null}

      <ul className="mt-5 flex flex-col gap-3">
        {TIPS_CATALOG.map((popup) => (
          <li key={popup.id}>
            <button
              type="button"
              onClick={() => setOpen(popup)}
              className="flex min-h-[72px] w-full items-center gap-3 rounded-[22px] border border-[#e4d8fb] bg-white p-3.5 text-left shadow-[0_4px_14px_rgba(91,80,220,0.08)] outline-none transition active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-[#c4b5fd]"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#ede4ff] text-[24px]" aria-hidden="true">
                {popup.cardIcon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-black leading-tight text-[#14122b]">{popup.cardTitle}</span>
                <span className="block text-[13px] font-semibold leading-snug text-[#5b6079]">{popup.headline}</span>
              </span>
              <span className="shrink-0 text-[18px] font-black text-[#7c3aed]" aria-hidden="true">
                →
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open ? <FeaturePopup key={open.id} popup={open} inSection={false} onClose={close} onCta={go} /> : null}
    </main>
  );
}
