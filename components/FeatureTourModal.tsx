"use client";

import { type ReactNode } from "react";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";

type FeatureTourModalProps = {
  isOpen: boolean;
  title: string;
  body: string;
  content?: ReactNode;
  isSaving?: boolean;
  primaryButtonText?: string;
  onClose: () => void;
  onUnderstand: () => void;
};

export function FeatureTourModal({
  isOpen,
  title,
  body,
  content,
  isSaving = false,
  primaryButtonText = "Got it",
  onClose,
  onUnderstand,
}: FeatureTourModalProps) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} backdropColor="bg-blue-50/90" scrollable={true}>
      <div className="relative my-6 flex w-full max-w-[32rem] flex-col items-center rounded-[28px] border border-blue-200 bg-gradient-to-br from-[#eef6ff] via-[#f4f9ff] to-[#eef8f8] px-5 py-5 shadow-2xl sm:px-6 sm:py-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-blue-400 hover:text-blue-700"
          aria-label="Close"
        >
          X
        </button>
        <div className="flex w-full flex-col items-center">
          <LouisAvatar mood="bible" size={64} />
          <div className="mb-3 mt-3 text-center text-[1.45rem] font-bold leading-tight text-blue-900 sm:text-3xl">{title}</div>
          <div className="w-full">
            <div className="mx-auto max-h-[62vh] w-full max-w-2xl overflow-y-auto px-1">
              {content ? (
                content
              ) : (
                <div className="space-y-4">
                  <p className="max-w-xl text-center text-sm leading-7 text-gray-600 md:text-[15px]">{body}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-5 flex w-full max-w-2xl items-center justify-end gap-3">
          <button
            type="button"
            onClick={onUnderstand}
            disabled={isSaving}
            className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 md:text-base"
          >
            {isSaving ? "Saving..." : primaryButtonText}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
