"use client";

import { type ReactNode } from "react";
import { LouisAvatar } from "./LouisAvatar";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50 bg-opacity-90 px-3 py-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-blue-100 border border-blue-200 shadow-2xl p-6 sm:p-8 my-8 flex flex-col items-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-blue-400 hover:text-blue-700 text-xl"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="flex flex-col items-center w-full">
          <LouisAvatar mood="bible" size={72} />
          <div className="mb-4 mt-3 text-2xl md:text-3xl font-bold text-blue-900 text-center">{title}</div>
          <div className="w-full">
            <div className="w-full max-w-2xl mx-auto rounded-2xl border border-blue-100 bg-white/80 px-5 md:px-7 py-6 md:py-6 max-h-[58vh] overflow-y-auto">
              {content ? (
                content
              ) : (
                <div className="space-y-6">
                  <p className="max-w-xl text-sm md:text-[15px] text-gray-600 leading-7 text-center">{body}</p>
                </div>
              )}
            </div>
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
  );
}
