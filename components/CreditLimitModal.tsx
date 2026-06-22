"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ModalShell } from "./ModalShell";

type CreditLimitModalProps = {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onResetComplete?: () => void;
  zIndexClassName?: string;
};

function formatCountdown(milliseconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${hh}h ${mm}m ${ss}s`;
}

export default function CreditLimitModal({
  open,
  userId,
  onClose,
  onResetComplete,
  zIndexClassName = "z-[120]",
}: CreditLimitModalProps) {
  const router = useRouter();
  const [creditCountdown, setCreditCountdown] = useState("24h 00m 00s");
  const [isResettingCredits, setIsResettingCredits] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<"monthly" | "yearly" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resetInProgressRef = useRef(false);

  async function startCheckout(plan: "monthly" | "yearly") {
    try {
      setLoadingPlan(plan);
      setError(null);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("Please log in to upgrade.");
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
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
  }

  useEffect(() => {
    if (!open || !userId) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    const performReset = async () => {
      if (resetInProgressRef.current || cancelled) return;

      resetInProgressRef.current = true;
      setIsResettingCredits(true);

      const resetResponse = await fetch("/api/reset-daily-credits", {
        method: "POST",
      });

      if (!resetResponse.ok) {
        const resetError = await resetResponse.text().catch(() => "");
        console.error("[CREDITS] Failed to reset credits:", resetError);
        setIsResettingCredits(false);
        resetInProgressRef.current = false;
        return;
      }

      if (cancelled) return;

      setCreditCountdown("00h 00m 00s");
      setIsResettingCredits(false);
      onResetComplete?.();
      onClose();
    };

    const startCountdown = async () => {
      const { data: profileStats, error: profileError } = await supabase
        .from("profile_stats")
        .select("last_credit_reset")
        .eq("user_id", userId)
        .maybeSingle();

      if (profileError) {
        console.error("[CREDITS] Failed to load last_credit_reset:", profileError);
        return;
      }

      if (cancelled) return;

      if (!profileStats?.last_credit_reset) {
        await performReset();
        return;
      }

      const lastReset = new Date(profileStats.last_credit_reset);
      if (Number.isNaN(lastReset.getTime())) {
        await performReset();
        return;
      }

      const nextResetAt = lastReset.getTime() + 24 * 60 * 60 * 1000;

      const tick = () => {
        const remainingTime = nextResetAt - Date.now();

        if (remainingTime <= 0) {
          setCreditCountdown("00h 00m 00s");
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
          void performReset();
          return;
        }

        setCreditCountdown(formatCountdown(remainingTime));
      };

      tick();
      intervalId = setInterval(tick, 1000);
    };

    resetInProgressRef.current = false;
    void startCountdown();

    return () => {
      cancelled = true;
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsResettingCredits(false);
    };
  }, [open, userId, onClose, onResetComplete]);

  return (
    <ModalShell isOpen={open} onClose={onClose} zIndex={zIndexClassName} backdropColor="bg-black/70" scrollable={true}>
      <div className="relative w-full max-w-[390px] overflow-hidden rounded-[26px] border border-[#ead9bd] bg-[#fffdf8] p-4 text-left text-[#0f1b33] shadow-[0_22px_62px_rgba(15,23,42,0.28)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-[#e7dccb] bg-white/90 text-lg font-black text-[#0f1b33] shadow-sm transition hover:bg-[#fff4dc]"
        >
          x
        </button>

        <div className="space-y-4">
          <div className="pr-9 text-left sm:text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#a66b00]">Bible Buddy Pro</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-[#0b162f]">Your free credits are used up</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#52627b]">
              Unlock background audio, full Study Notes, and all trivia games.
            </p>
          </div>

          <div className="rounded-[18px] border border-[#ead9bd] bg-white/72 px-4 py-3 text-left shadow-[0_8px_22px_rgba(102,65,12,0.07)]">
            <div className="grid gap-2">
              <div className="flex gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ddecff] text-[10px] font-black text-[#2f6bcf]">Audio</span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-[#0b162f]">Listen with the app closed</span>
                  <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-[#3b4b66]">Keep your lesson playing while your phone is locked or while you use other apps.</span>
                </span>
              </div>
              <div className="flex gap-2.5 border-t border-[#eadfce] pt-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eadcff] text-[10px] font-black text-[#6d3fd1]">Book</span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-[#0b162f]">Full Study Notes</span>
                  <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-[#3b4b66]">Unlock every section, key phrase, and explanation for each day.</span>
                </span>
              </div>
              <div className="flex gap-2.5 border-t border-[#eadfce] pt-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#fff1cf] text-[10px] font-black text-[#a66b00]">Trivia</span>
                <span className="min-w-0">
                  <span className="block text-sm font-black leading-tight text-[#0b162f]">All Trivia Games</span>
                  <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-[#3b4b66]">Play full daily trivia without getting stopped by the free plan.</span>
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#d7e3f4] bg-white px-4 py-3 text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#52627b]">Free credits reset in</p>
            <p className="mt-2 text-lg font-black text-[#0b162f]">
              {isResettingCredits ? "Resetting..." : creditCountdown}
            </p>
          </div>

          <div className="grid gap-2">
            <button
              type="button"
              onClick={() => void startCheckout("yearly")}
              disabled={Boolean(loadingPlan)}
              className="relative flex items-center justify-between rounded-2xl border border-[#f0cf8b] bg-[#f6b44b] px-4 py-3 text-left text-[#201100] shadow-sm transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span className="absolute right-3 top-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#8a5a00]">
                Best offer
              </span>
              <span>
                <span className="block text-sm font-black">Lifetime Access</span>
                <span className="block text-xs font-semibold opacity-80">One payment. Keep Pro for life.</span>
              </span>
              <span className="text-xl font-black">$50</span>
            </button>
            <button
              type="button"
              onClick={() => void startCheckout("monthly")}
              disabled={Boolean(loadingPlan)}
              className="flex items-center justify-between rounded-2xl border border-[#c9ddfb] bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f4f8ff] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
            >
              <span>
                <span className="block text-sm font-black">Monthly</span>
                <span className="block text-xs font-semibold text-[#52627b]">Full Pro access for $4.99/month</span>
              </span>
              <span className="text-xl font-black text-[#2f7fe8]">$4.99</span>
            </button>
          </div>

          {error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold leading-5 text-red-700">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/upgrade")}
              className="text-xs font-bold text-[#52627b] underline-offset-2 transition hover:text-[#0f1b33] hover:underline"
            >
              See full upgrade details
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-[#52627b] transition hover:text-[#0f1b33]"
            >
              Continue with free plan
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
