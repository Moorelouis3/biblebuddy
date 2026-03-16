"use client";

import { useRouter } from "next/navigation";
import { ModalShell } from "./ModalShell";

interface GlobalUpdateModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export function GlobalUpdateModal({ isOpen, onDismiss }: GlobalUpdateModalProps) {
  const router = useRouter();

  function handleExplore() {
    onDismiss();
    router.push("/study-groups");
  }

  return (
    <ModalShell isOpen={isOpen} onClose={onDismiss} zIndex="z-[200]" backdropColor="bg-black/70">
      <div
        className="relative w-full max-w-sm rounded-[28px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-1.5"
        role="dialog"
        aria-modal="true"
        aria-label="Version 4.0 Update"
      >
        <div className="rounded-3xl bg-gradient-to-b from-indigo-50 to-blue-50/60 px-5 py-6 overflow-hidden">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
              v4.0 - What's New
            </span>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-4 mb-5 space-y-3">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2">
              <p className="text-[11px] font-semibold text-indigo-900">Direct Group Access</p>
              <p className="text-[11px] text-indigo-700 mt-0.5">The dashboard now opens the official study group directly.</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2">
              <p className="text-[11px] font-semibold text-emerald-900">Weekly Unlocks</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">Leaders set Week 1 and the rest unlock automatically week by week.</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2">
              <p className="text-[11px] font-semibold text-amber-900">Simpler Study Flow</p>
              <p className="text-[11px] text-amber-700 mt-0.5">Group details now live inside the group instead of on an extra page.</p>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-gray-900 text-center leading-tight mb-2">
            Bible Study Group
            <br />
            <span className="text-indigo-600">is now front and center.</span>
          </h2>

          <p className="text-xs text-gray-500 text-center leading-relaxed mb-4 px-1">
            The official Bible Buddy group is now the main place for weekly study, prayer, and shared conversation.
          </p>

          <ul className="space-y-1.5 mb-5 px-0.5">
            <li className="flex items-center gap-2 text-xs text-gray-700">
              <span className="flex-shrink-0">🤝</span>
              <span>One official group for the whole app</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-700">
              <span className="flex-shrink-0">📚</span>
              <span>Weekly lessons with visible lock states</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-700">
              <span className="flex-shrink-0">🙏</span>
              <span>Prayer and encouragement in one place</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-700">
              <span className="flex-shrink-0">🗓️</span>
              <span>Automatic release schedule after the first date is set</span>
            </li>
          </ul>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleExplore}
              className="w-full px-4 py-3 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-90 transition-opacity bg-indigo-600"
            >
              Open Bible Study Group
            </button>
            <button
              type="button"
              onClick={onDismiss}
              className="w-full px-4 py-2.5 rounded-2xl bg-gray-100 text-gray-500 font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
