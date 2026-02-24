"use client";
import React from "react";

interface CreditToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export default function CreditToast({ open, onClose, message }: CreditToastProps) {
  if (!open) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
      <div className="bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 animate-fade-in">
        <span>{message}</span>
        <button
          className="ml-4 text-white/80 hover:text-white text-lg font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}
