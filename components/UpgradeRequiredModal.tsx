"use client";

import Link from "next/link";
import { ModalShell } from "./ModalShell";

type UpgradeRequiredModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const studyNoteFeatures = [
  {
    icon: "Book",
    iconClass: "bg-[#eadcff] text-[#6d3fd1]",
    title: "Verse by verse breakdowns",
    description: "Understand difficult passages one section at a time.",
  },
  {
    icon: "Search",
    iconClass: "bg-[#dff0d8] text-[#3b7a39]",
    title: "Word studies",
    description: "See what key words and phrases originally meant.",
  },
  {
    icon: "Link",
    iconClass: "bg-[#ddecff] text-[#2f6bcf]",
    title: "Scripture connections",
    description: "Connect stories, themes, and people across the Bible.",
  },
];

export default function UpgradeRequiredModal({ isOpen, onClose }: UpgradeRequiredModalProps) {
  return (
    <ModalShell isOpen={isOpen} onClose={onClose} backdropColor="bg-black/60">
      <div className="relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-[#ead9bd] bg-[#fffdf8] px-4 py-4 text-center text-[#0f1b33] shadow-[0_20px_58px_rgba(15,23,42,0.28)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#e7dccb] bg-white/90 text-lg font-black text-[#0f1b33] shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition hover:bg-[#fff4dc]"
          aria-label="Close upgrade prompt"
        >
          x
        </button>

        <div className="pr-9 text-left sm:text-center">
          <h2 className="font-serif text-[26px] font-black leading-[1.02] tracking-normal text-[#0b162f] sm:text-[28px]">
            Don&apos;t just read.
            <span className="block">Finally <span className="text-[#2f7fe8]">understand.</span></span>
          </h2>
          <div className="mx-auto mt-1.5 h-1 w-36 rounded-full bg-[#8eb8ee] opacity-70 sm:w-44" aria-hidden="true" />
        </div>

        <div className="mx-auto mt-3 max-w-sm space-y-1.5 text-left text-[13px] font-semibold leading-5 text-[#263855] sm:text-center">
          <p>Bible Buddy Free helps you stay consistent.</p>
          <p>
            Bible Buddy Pro helps you <span className="font-black text-[#1f65c7]">understand Scripture more deeply</span> with Study Notes, context, and clearer explanations.
          </p>
        </div>

        <div className="mt-3 rounded-[18px] border border-[#ead9bd] bg-white/72 px-3 py-2.5 text-left shadow-[0_8px_22px_rgba(102,65,12,0.07)]">
          <div className="grid gap-2">
            {studyNoteFeatures.map((feature, index) => (
              <div key={feature.title} className={`flex gap-2.5 ${index > 0 ? "border-t border-[#eadfce] pt-2" : ""}`}>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-black ${feature.iconClass}`} aria-hidden="true">
                  {feature.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-[#0b162f]">{feature.title}</span>
                  <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-[#3b4b66]">{feature.description}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-2">
          <Link
            href="/upgrade"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-[17px] bg-[#2f7fe8] px-4 py-3 text-center text-white shadow-[0_12px_24px_rgba(47,127,232,0.24)] transition hover:brightness-105"
          >
            <span>
              <span className="block text-sm font-black leading-tight">Unlock Study Notes</span>
              <span className="mt-0.5 block text-[11px] font-semibold text-white/88">Start understanding Scripture more deeply</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[15px] border border-[#7aaaf3] bg-white/78 px-4 py-2 text-[#0f1b33] transition hover:bg-[#f4f8ff]"
          >
            <span className="block text-xs font-black leading-tight">Continue with Free Plan</span>
            <span className="mt-0.5 block text-[11px] font-semibold text-[#4c5d78]">Keep studying with the free plan</span>
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
