"use client";

import { supabase } from "./supabaseClient";

export type CreditClientResult = {
  ok: boolean;
  reason?: string;
  dailyCredits?: number;
  isPaid?: boolean;
};

type CreditFeedbackEvent = {
  message: string;
};

const CREDIT_FEEDBACK_EVENT = "bb-credit-feedback";

function dispatchCreditFeedback(detail: CreditFeedbackEvent) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(CREDIT_FEEDBACK_EVENT, { detail }));
}

export function emitCreditFeedback(detail: CreditFeedbackEvent) {
  dispatchCreditFeedback(detail);
}

export function isCreditActionCanceled(result: CreditClientResult) {
  return result.reason === "canceled";
}

async function resolveUserId(fallbackUserId?: string | null): Promise<string> {
  if (fallbackUserId) {
    return fallbackUserId;
  }

  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? "guest";
}

function maybeShowCreditFeedback(userId: string, dailyCredits: number) {
  if (typeof window === "undefined" || userId === "guest") {
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const firstUseKey = `bb_credit_first_use_${userId}_${today}`;

  if (!sessionStorage.getItem(firstUseKey)) {
    sessionStorage.setItem(firstUseKey, "1");
  }

  dispatchCreditFeedback({
    message: `You used 1 free credit. ${dailyCredits} of 5 left today.`,
  });
}

export async function previewCreditAction(actionType: string): Promise<CreditClientResult> {
  const response = await fetch("/api/consume-credit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ actionType, preview: true }),
  });

  const result = (await response.json().catch(() => ({}))) as CreditClientResult;
  if (!response.ok) {
    return { ok: false, reason: result.reason ?? "error" };
  }
  return result;
}

export async function consumeCreditAction(
  actionType: string,
  options?: { userId?: string | null; actionLabel?: string | null }
): Promise<CreditClientResult> {
  try {
    const response = await fetch("/api/consume-credit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ actionType, actionLabel: options?.actionLabel ?? null }),
    });

    const result = (await response.json().catch(() => ({}))) as CreditClientResult;

    if (!response.ok) {
      return { ok: false, reason: result.reason ?? "error" };
    }

    if (result.ok && typeof result.dailyCredits === "number") {
      const userId = await resolveUserId(options?.userId);
      maybeShowCreditFeedback(userId, result.dailyCredits);
    }

    return {
      ok: result.ok === true,
      reason: result.reason,
      dailyCredits: result.dailyCredits,
    };
  } catch {
    return { ok: false, reason: "error" };
  }
}

export { CREDIT_FEEDBACK_EVENT };
