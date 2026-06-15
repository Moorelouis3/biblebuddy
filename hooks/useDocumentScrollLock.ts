"use client";

import { useEffect } from "react";

let lockCount = 0;
let previousHtmlOverflow: string | null = null;
let previousBodyOverflow: string | null = null;

function setScrollLockedClass(locked: boolean) {
  document.documentElement.classList.toggle("bb-modal-scroll-locked", locked);
  document.body.classList.toggle("bb-modal-scroll-locked", locked);
}

function restoreDocumentScroll() {
  setScrollLockedClass(false);
  document.documentElement.style.overflow = previousHtmlOverflow ?? "";
  document.body.style.overflow = previousBodyOverflow ?? "";
  previousHtmlOverflow = null;
  previousBodyOverflow = null;
}

export function releaseDocumentScrollLockIfStale(activeSelector?: string) {
  if (typeof document === "undefined") return;

  window.requestAnimationFrame(() => {
    if (lockCount > 0) return;
    if (activeSelector && document.querySelector(activeSelector)) return;
    restoreDocumentScroll();
  });
}

export function lockDocumentScroll(activeSelector?: string) {
  if (typeof document === "undefined") return () => {};

  if (lockCount === 0) {
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
  }

  lockCount += 1;
  setScrollLockedClass(true);
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  let unlocked = false;
  return () => {
    if (unlocked) return;
    unlocked = true;

    lockCount = Math.max(0, lockCount - 1);
    if (lockCount <= 0) {
      lockCount = 0;
      restoreDocumentScroll();
    }

    releaseDocumentScrollLockIfStale(activeSelector);
  };
}

export function useDocumentScrollLock(locked: boolean, activeSelector?: string) {
  useEffect(() => {
    if (!locked) {
      releaseDocumentScrollLockIfStale(activeSelector);
      return undefined;
    }

    return lockDocumentScroll(activeSelector);
  }, [activeSelector, locked]);
}
