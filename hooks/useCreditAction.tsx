"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getProfileStats } from "@/lib/profileStats";
import CreditLimitModal from "@/components/CreditLimitModal";
import CreditToast from "@/components/CreditToast";
import CreditWarning from "@/components/CreditWarning";

export interface CreditActionResult {
  ok: boolean;
  reason?: string;
  dailyCredits?: number;
}

export function useCreditAction() {
  const [showCreditBlocked, setShowCreditBlocked] = useState(false); // Modal (phase 1)
  const [showToast, setShowToast] = useState(false); // Toast (phase 2)
  const [showWarning, setShowWarning] = useState(false); // Warning (phase 3)
  const [creditResult, setCreditResult] = useState<CreditActionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  // PHASE 1: Modal (first block)
  // PHASE 2: Toast (first warning after modal)
  // PHASE 3: Banner/Warning (subsequent warnings)

  // TODO: Add session gating logic in next step

  async function consumeCredit(actionType: string): Promise<CreditActionResult> {
    setLoading(true);
    setShowCreditBlocked(false);
    setShowToast(false);
    setShowWarning(false);
    setCreditResult(null);
    try {
      // Get user info for scoping keys and DB check
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || "guest";
      let isPaid = false;
      let dailyCredits: number | undefined = undefined;
      let hideCreditInfoModal = false;
      if (userId && userId !== "guest") {
        const stats = await getProfileStats(userId);
        isPaid = !!stats?.is_paid;
        dailyCredits = stats?.daily_credits ?? undefined;
        hideCreditInfoModal = !!stats?.hide_credit_info_modal;
      }

      // Debug log (dev only)
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("[CREDIT_ACTION]", { userId, isPaid, dailyCredits, hideCreditInfoModal });
      }

      const creditResponse = await fetch("/api/consume-credit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionType }),
      });
      const result = (await creditResponse.json()) as CreditActionResult;
      setCreditResult(result);
      // Always show Phase 2 toast after successful credit use for free users
      if (result.ok && !isPaid && typeof result.dailyCredits === "number") {
        setToastMessage(`-1 credit  ${result.dailyCredits} remaining`);
        setShowToast(true);
      }

      // PHASE 3: Show warning at 2 or 1 credits, once per day per user
      if (result.ok && !isPaid && typeof result.dailyCredits === "number" && (result.dailyCredits === 2 || result.dailyCredits === 1)) {
        const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const warnKey = `bb_warn_${result.dailyCredits}_${userId}_${today}`;
        if (!sessionStorage.getItem(warnKey)) {
          setWarningMessage(result.dailyCredits === 2 ? "You have 2 free credits left for today." : "You have 1 free credit left for today.");
          setShowWarning(true);
          sessionStorage.setItem(warnKey, "1");
        }
      }

      // PHASE 1: Modal (first block, only if not dismissed in DB)
      if (!result.ok && result.reason === "no_credits" && !isPaid) {
        const modalKey = `bb_credit_modal_shown_${userId}`;
        if (!hideCreditInfoModal && !sessionStorage.getItem(modalKey)) {
          setShowCreditBlocked(true);
          sessionStorage.setItem(modalKey, "1");
        }
      }

      // Debug log (dev only)
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("[CREDIT_ACTION_RESULT]", {
          userId,
          isPaid,
          dailyCreditsBefore: dailyCredits,
          dailyCreditsAfter: result.dailyCredits,
          phase1: !result.ok && result.reason === "no_credits" && !isPaid && !hideCreditInfoModal,
          phase2: result.ok && !isPaid,
          phase3: result.ok && !isPaid && (result.dailyCredits === 2 || result.dailyCredits === 1),
        });
      }
      return result;
    } catch (e) {
      setCreditResult({ ok: false, reason: "error" });
      setShowCreditBlocked(true);
      return { ok: false, reason: "error" };
    } finally {
      setLoading(false);
    }
  }

  function Overlays() {
    return (
      <>
        <CreditLimitModal
          open={showCreditBlocked}
          userId={null}
          onClose={() => setShowCreditBlocked(false)}
        />
        <CreditToast
          open={showToast}
          onClose={() => setShowToast(false)}
          message={toastMessage}
        />
        <CreditWarning
          open={showWarning}
          onClose={() => setShowWarning(false)}
          message={warningMessage}
        />
      </>
    );
  }

  return {
    consumeCredit,
    showCreditBlocked,
    setShowCreditBlocked,
    creditResult,
    loading,
    overlays: <Overlays />,
    showToast,
    setShowToast,
    showWarning,
    setShowWarning,
  };
}
