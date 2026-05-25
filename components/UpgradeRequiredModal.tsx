"use client";

import { useState } from "react";
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
  const [showPlans, setShowPlans] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "yearly" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const closeAll = () => {
    if (loadingPlan) return;
    setShowPlans(false);
    setError(null);
    onClose();
  };

  const openPlans = () => {
    setError(null);
    setShowPlans(true);
  };

  const startCheckout = async (plan: "monthly" | "yearly") => {
    try {
      setLoadingPlan(plan);
      setError(null);

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }
      if (!data.url) {
        throw new Error("Stripe did not return a checkout link.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      const message = checkoutError instanceof Error ? checkoutError.message : "Something went wrong. Please try again.";
      setError(message);
      setLoadingPlan(null);
    }
  };

  return (
    <ModalShell isOpen={isOpen} onClose={closeAll} backdropColor="bg-black/60">
      {showPlans ? (
        <div className="relative w-full max-w-[360px] overflow-hidden rounded-[24px] border border-[#ead9bd] bg-[#fffdf8] p-4 text-left text-[#0f1b33] shadow-[0_22px_62px_rgba(15,23,42,0.28)]">
          {loadingPlan ? (
            <div className="absolute inset-0 z-10 grid place-items-center bg-[#fffdf8]/86 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <span className="h-9 w-9 animate-spin rounded-full border-4 border-[#dcecff] border-t-[#2f7fe8]" aria-hidden="true" />
                <p className="mt-3 text-sm font-black">Opening Stripe</p>
                <p className="mt-1 text-xs font-semibold text-[#52627b]">
                  Taking you to the {loadingPlan === "monthly" ? "$4.99 monthly" : "$50 yearly"} checkout.
                </p>
              </div>
            </div>
          ) : null}
          <button
            type="button"
            onClick={() => {
              if (loadingPlan) return;
              setShowPlans(false);
              setError(null);
            }}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#e7dccb] bg-white/90 text-lg font-black text-[#0f1b33] shadow-sm transition hover:bg-[#fff4dc] disabled:opacity-50"
            aria-label="Close plan choices"
            disabled={Boolean(loadingPlan)}
          >
            x
          </button>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#a66b00]">Bible Buddy Pro</p>
          <h2 className="mt-2 pr-10 text-2xl font-black leading-tight">Choose your plan</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#52627b]">
            Unlock Study Notes and start understanding Scripture more deeply.
          </p>
          <div className="mt-4 grid gap-2">
            <button
              type="button"
              onClick={() => startCheckout("monthly")}
              disabled={Boolean(loadingPlan)}
              className="flex items-center justify-between rounded-2xl border border-[#c9ddfb] bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f4f8ff] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span>
                <span className="block text-sm font-black">Monthly</span>
                <span className="block text-xs font-semibold text-[#52627b]">Flexible access</span>
              </span>
              <span className="text-xl font-black text-[#2f7fe8]">$4.99</span>
            </button>
            <button
              type="button"
              onClick={() => startCheckout("yearly")}
              disabled={Boolean(loadingPlan)}
              className="flex items-center justify-between rounded-2xl border border-[#f0cf8b] bg-[#f6b44b] px-4 py-3 text-left text-[#201100] shadow-sm transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span>
                <span className="block text-sm font-black">Yearly</span>
                <span className="block text-xs font-semibold opacity-80">Best value</span>
              </span>
              <span className="text-xl font-black">$50</span>
            </button>
          </div>
          {error ? (
            <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold leading-5 text-red-700">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={closeAll}
            disabled={Boolean(loadingPlan)}
            className="mt-3 w-full rounded-2xl border border-[#d7e3f4] bg-white px-4 py-3 text-sm font-black text-[#0f1b33] transition hover:bg-[#f8fbff] disabled:cursor-wait disabled:opacity-60"
          >
            Keep Studying Free
          </button>
        </div>
      ) : (
        <div className="relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-[#ead9bd] bg-[#fffdf8] px-4 py-4 text-center text-[#0f1b33] shadow-[0_20px_58px_rgba(15,23,42,0.28)]">
          <button
            type="button"
            onClick={closeAll}
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
            <button
              type="button"
              onClick={openPlans}
              className="flex w-full items-center justify-center rounded-[17px] bg-[#2f7fe8] px-4 py-3 text-center text-white shadow-[0_12px_24px_rgba(47,127,232,0.24)] transition hover:brightness-105"
            >
              <span>
                <span className="block text-sm font-black leading-tight">Unlock Study Notes</span>
                <span className="mt-0.5 block text-[11px] font-semibold text-white/88">Start understanding Scripture more deeply</span>
              </span>
            </button>
            <button
              type="button"
              onClick={closeAll}
              className="rounded-[15px] border border-[#7aaaf3] bg-white/78 px-4 py-2 text-[#0f1b33] transition hover:bg-[#f4f8ff]"
            >
              <span className="block text-xs font-black leading-tight">Continue with Free Plan</span>
              <span className="mt-0.5 block text-[11px] font-semibold text-[#4c5d78]">Keep studying with the free plan</span>
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}
