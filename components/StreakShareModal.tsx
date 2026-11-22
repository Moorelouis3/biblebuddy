"use client";

import { useEffect, useRef, useState } from "react";
import { ModalShell } from "./ModalShell";
import StreakShareCard, { renderStreakCardFile, shareStreakCardImage, type StreakShareCardProps } from "./StreakShareCard";

/**
 * Tap the streak, get the share card (Louis, 2026-11-22: "i want my share your
 * streak back when u click on streak"). The card itself is
 * components/StreakShareCard.tsx, the same one the plan's progress slide shows.
 */
export default function StreakShareModal({
  isOpen,
  onClose,
  ...card
}: StreakShareCardProps & { isOpen: boolean; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileStem = `bible-buddy-streak-${Math.max(0, card.streakDays)}-days`;
  // The picture is made while the card is on screen, so the Share tap can open
  // the sheet straight away (Safari drops a share that comes seconds late).
  const prepared = useRef<Promise<File | null> | null>(null);
  const cardKey = JSON.stringify(card);
  useEffect(() => {
    prepared.current = null;
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      if (cardRef.current) prepared.current = renderStreakCardFile(cardRef.current, fileStem);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [isOpen, cardKey, fileStem]);

  async function handleShare() {
    if (!cardRef.current || pending) return;
    setPending(true);
    setMessage(null);
    try {
      const ready = prepared.current ? await prepared.current : null;
      const { message: result } = await shareStreakCardImage(cardRef.current, fileStem, ready);
      if (result) setMessage(result);
    } catch {
      setMessage("Could not make the picture on this device.");
    } finally {
      setPending(false);
    }
  }

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} zIndex="z-[300]" scrollable>
      <div className="mx-auto my-8 w-full max-w-[390px] px-4" onClick={(event) => event.stopPropagation()}>
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-lg font-black text-gray-900 shadow"
          >
            ×
          </button>
        </div>
        <StreakShareCard ref={cardRef} {...card} />
        <button
          type="button"
          onClick={() => void handleShare()}
          disabled={pending}
          className="mt-3 w-full rounded-[18px] px-5 py-3.5 text-sm font-black text-white shadow-[0_12px_24px_rgba(0,86,253,0.25)] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
          style={{ backgroundColor: "#0056FD" }}
        >
          {pending ? "Preparing Share Image..." : "Share my Streak"}
        </button>
        {message ? <p className="mt-2 text-center text-xs font-bold text-white">{message}</p> : null}
      </div>
    </ModalShell>
  );
}
