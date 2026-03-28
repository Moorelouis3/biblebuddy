"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getProfileStats } from "@/lib/profileStats";
import CreditLimitModal from "@/components/CreditLimitModal";
import { consumeCreditAction } from "@/lib/creditClient";

export interface CreditActionResult {
  ok: boolean;
  reason?: string;
  dailyCredits?: number;
}

export function useCreditAction() {
  const [showCreditBlocked, setShowCreditBlocked] = useState(false);
  const [creditResult, setCreditResult] = useState<CreditActionResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function consumeCredit(actionType: string): Promise<CreditActionResult> {
    setLoading(true);
    setShowCreditBlocked(false);
    setCreditResult(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const userId = user?.id || "guest";
      let isPaid = false;
      let hideCreditInfoModal = false;

      if (userId !== "guest") {
        const stats = await getProfileStats(userId);
        isPaid = !!stats?.is_paid;
        hideCreditInfoModal = !!stats?.hide_credit_info_modal;
      }

      const result = await consumeCreditAction(actionType, { userId });
      setCreditResult(result);

      if (!result.ok && result.reason === "no_credits" && !isPaid) {
        const modalKey = `bb_credit_modal_shown_${userId}`;
        if (!hideCreditInfoModal && !sessionStorage.getItem(modalKey)) {
          setShowCreditBlocked(true);
          sessionStorage.setItem(modalKey, "1");
        }
      }

      return result;
    } catch {
      const failed = { ok: false, reason: "error" } as CreditActionResult;
      setCreditResult(failed);
      setShowCreditBlocked(true);
      return failed;
    } finally {
      setLoading(false);
    }
  }

  function Overlays() {
    return (
      <CreditLimitModal
        open={showCreditBlocked}
        userId={null}
        onClose={() => setShowCreditBlocked(false)}
      />
    );
  }

  return {
    consumeCredit,
    showCreditBlocked,
    setShowCreditBlocked,
    creditResult,
    loading,
    overlays: <Overlays />,
  };
}
