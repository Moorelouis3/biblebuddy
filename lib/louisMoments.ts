"use client";

export const LOUIS_MOMENT_EVENT = "bb:louis-moment";

export type LouisMomentReply = {
  id: string;
  label: string;
  href?: string;
  message?: string;
};

export type LouisMomentDetail = {
  message: string;
  replies?: LouisMomentReply[];
};

export function dispatchLouisMoment(detail: LouisMomentDetail) {
  if (typeof document === "undefined") return;
  document.dispatchEvent(new CustomEvent(LOUIS_MOMENT_EVENT, { detail }));
}

