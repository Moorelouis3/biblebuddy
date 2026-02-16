"use client";

import { type ReactNode } from "react";

type FeatureTourModalProps = {
  isOpen: boolean;
  title: string;
  body: string;
  content?: ReactNode;
  isSaving?: boolean;
  onClose: () => void;
  onUnderstand: () => void;
};

export function FeatureTourModal({
  isOpen,
  title,
  body,
  content,
  isSaving = false,
  onClose,
  onUnderstand,
}: FeatureTourModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/70 p-4 md:p-6 overflow-hidden">
      <div className="relative w-full max-w-3xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3">
        <div className="rounded-3xl bg-blue-50/80 px-5 md:px-8 py-8 md:py-10 flex flex-col justify-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-7 top-6 text-gray-500 hover:text-gray-800 text-xl"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="w-full mx-auto">
            <div className="w-full max-w-2xl mx-auto rounded-2xl border border-blue-100 bg-white/80 px-5 md:px-7 py-6 md:py-6 max-h-[58vh] overflow-y-auto">
              {content ? (
                content
              ) : (
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">{title}</h2>
                  <p className="max-w-xl text-sm md:text-[15px] text-gray-600 leading-7">{body}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 max-w-2xl mx-auto w-full">
            <button
              type="button"
              onClick={onUnderstand}
              disabled={isSaving}
              className="px-6 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "I understand"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
