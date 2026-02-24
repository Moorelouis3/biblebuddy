"use client";
import React from "react";

interface CreditWarningProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function CreditWarning({ open, onClose, message }: CreditWarningProps) {
  if (!open) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200]">
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-900 px-6 py-3 rounded-lg shadow flex items-center gap-3 animate-fade-in">
        <span className="font-semibold">⚠️</span>
        <span>{message}</span>
        <button
          className="ml-4 text-yellow-900/70 hover:text-yellow-900 text-lg font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
