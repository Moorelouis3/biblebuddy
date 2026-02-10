"use client";

import Link from "next/link";

type UpgradeRequiredModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UpgradeRequiredModal({
  isOpen,
  onClose,
}: UpgradeRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🔒 Pro Feature
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            This feature is available for Bible Buddy Pro users.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/upgrade"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold px-4 py-2 hover:bg-blue-700 transition"
            >
              Unlock Full Features
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 hover:bg-gray-100 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
