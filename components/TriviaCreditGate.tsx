"use client";

import { type ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import CreditLimitModal from "@/components/CreditLimitModal";

type TriviaCreditGateProps = {
  children: ReactNode;
};

export default function TriviaCreditGate({ children }: TriviaCreditGateProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [showCreditBlocked, setShowCreditBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCreditState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (!user) {
        setUserId(null);
        setShowCreditBlocked(false);
        return;
      }

      setUserId(user.id);

      const { data: profileStats, error } = await supabase
        .from("profile_stats")
        .select("is_paid, daily_credits")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error("[TRIVIA_GATE] Failed to check profile stats:", error);
        return;
      }

      if (!profileStats || profileStats.is_paid) {
        setShowCreditBlocked(false);
        return;
      }

      const availableCredits = profileStats.daily_credits ?? 0;
      setShowCreditBlocked(availableCredits <= 0);
    };

    void loadCreditState();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <>
      {children}
      <CreditLimitModal
        open={showCreditBlocked}
        userId={userId}
        onClose={() => {
          setShowCreditBlocked(false);
          router.push("/dashboard");
        }}
      />
    </>
  );
}
