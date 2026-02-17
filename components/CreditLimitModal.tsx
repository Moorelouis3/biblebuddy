"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

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
  const resetInProgressRef = useRef(false);

  useEffect(() => {
    if (!open || !userId) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    const performReset = async () => {
      if (resetInProgressRef.current || cancelled) return;

      resetInProgressRef.current = true;
      setIsResettingCredits(true);

      const nowIso = new Date().toISOString();
      const { error: resetError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            daily_credits: 5,
            last_credit_reset: nowIso,
            updated_at: nowIso,
          },
          { onConflict: "user_id" }
        );

      if (resetError) {
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

  if (!open) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black/70 ${zIndexClassName} flex items-start justify-center overflow-y-auto p-4 py-10`}>
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="rounded-3xl bg-blue-50/80 px-5 md:px-8 py-8 md:py-10 flex flex-col justify-center">
          <div className="w-full mx-auto">
            <div className="w-full max-w-2xl mx-auto rounded-2xl border border-blue-100 bg-white/80 px-5 md:px-7 py-6 md:py-6">
              <div className="space-y-5 text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
                  🔒
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                  🔒 Free Plan Limit Reached
                </h2>

                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  You’ve used all 5 daily credits included with the free plan.
                </p>

                <div className="text-left rounded-xl border border-blue-100 bg-white/70 px-4 py-4">
                  <p className="text-sm md:text-[15px] text-gray-700 mb-2">Credits are used when you:</p>
                  <ul className="space-y-1 text-sm md:text-[15px] text-gray-600 leading-7">
                    <li>• Explore People, Places, or Keywords</li>
                    <li>• Highlight a verse</li>
                    <li>• Start a trivia round</li>
                    <li>• Open devotionals</li>
                    <li>• Begin new study actions</li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <p className="text-sm md:text-[15px] text-gray-700">Your credits reset in:</p>
                  <p className="text-lg md:text-xl font-semibold text-gray-900">
                    ⏳ {isResettingCredits ? "Resetting..." : creditCountdown}
                  </p>
                </div>

                <p className="text-sm md:text-[15px] text-gray-600 leading-7">
                  You can wait for your credits to reset — or unlock unlimited study access with Bible Buddy Pro.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 max-w-2xl mx-auto w-full">
            <button
              type="button"
              onClick={() => router.push("/upgrade")}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition"
            >
              Upgrade to Bible Buddy Pro
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Continue with free plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
