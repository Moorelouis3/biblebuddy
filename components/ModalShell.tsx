"use client";

import { useEffect, useRef, useState } from "react";

// Track how many modals are currently mounted so scroll is only restored when all are closed
let _openModalCount = 0;

interface ModalShellProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  /** Tailwind z-index class, e.g. "z-50", "z-[200]". Default: "z-50" */
  zIndex?: string;
  /** When true: items-start + overflow-y-auto (tall scrollable modals). Default: false */
  scrollable?: boolean;
  /** Tailwind background class for the backdrop. Default: "bg-black/60" */
  backdropColor?: string;
  /** Placement for non-scrollable modals. Default: "center" */
  placement?: "center" | "bottom";
  /** When false, only explicit close controls close the modal. Default: true */
  closeOnBackdrop?: boolean;
}

/**
 * Wraps any modal with animated backdrop + panel (swoop-in on open, swoop-out on close).
 * Usage: replace the outer `fixed inset-0` backdrop div with <ModalShell isOpen={...} onClose={...}>
 * and remove the `if (!isOpen) return null` guard — ModalShell handles mounting/unmounting.
 */
export function ModalShell({
  isOpen,
  onClose,
  children,
  zIndex = "z-50",
  scrollable = false,
  backdropColor = "bg-black/60",
  placement = "center",
  closeOnBackdrop = true,
}: ModalShellProps) {
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      clearTimeout(timerRef.current);
      setClosing(false);
      setMounted(true);
    } else if (mounted) {
      setClosing(true);
      timerRef.current = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 220);
    }
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Lock body scroll while any modal is mounted
  useEffect(() => {
    if (!mounted) return;
    _openModalCount += 1;
    document.body.style.overflow = "hidden";
    return () => {
      _openModalCount -= 1;
      if (_openModalCount <= 0) {
        _openModalCount = 0;
        document.body.style.overflow = "";
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 ${zIndex} ${backdropColor} flex ${
        scrollable ? "items-start overflow-y-auto py-10" : placement === "bottom" ? "items-end pb-6 sm:pb-8" : "items-center"
      } justify-center p-4 ${closing ? "modal-backdrop-out" : "modal-backdrop-in"}`}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={closing ? "modal-panel-out" : "modal-panel-in"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
