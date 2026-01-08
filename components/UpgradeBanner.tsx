"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export function UpgradeBanner() {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function checkMembership() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return;
        }

        setUserId(user.id);

        // Check membership status
        const { data: profileStats, error } = await supabase
          .from("profile_stats")
          .select("membership_status")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("[UPGRADE_BANNER] Error checking membership:", error);
          return;
        }

        const membershipStatus = profileStats?.membership_status || "free";

        // Show banner only for free users
        if (membershipStatus === "free") {
          setShowBanner(true);
        }
      } catch (err) {
        console.error("[UPGRADE_BANNER] Error:", err);
      }
    }

    checkMembership();
  }, []);

  if (!showBanner || !userId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <p className="text-sm sm:text-base">
          Free Member
        </p>
        <button
          onClick={() => router.push("/upgrade")}
          className="px-4 py-1.5 bg-white text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition whitespace-nowrap"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
}

