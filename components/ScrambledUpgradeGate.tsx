"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UpgradeRequiredModal from "@/components/UpgradeRequiredModal";
import {
  FREE_SCRAMBLED_BOOK_KEYS,
  FREE_SCRAMBLED_PERSON_KEYS,
} from "@/lib/bibleStudyGameCatalog";
import { supabase } from "@/lib/supabaseClient";

type ScrambledUpgradeGateProps = {
  bookSlug: string;
  children: React.ReactNode;
};

export default function ScrambledUpgradeGate({
  bookSlug,
  children,
}: ScrambledUpgradeGateProps) {
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const isFreePack =
    FREE_SCRAMBLED_BOOK_KEYS.has(bookSlug) || FREE_SCRAMBLED_PERSON_KEYS.has(bookSlug);

  useEffect(() => {
    let isMounted = true;

    async function loadAccess() {
      if (isFreePack) {
        if (!isMounted) return;
        setIsPaid(true);
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!isMounted) return;
        setIsPaid(false);
        setShowUpgradeModal(true);
        setLoading(false);
        return;
      }

      const { data: profileStats } = await supabase
        .from("profile_stats")
        .select("is_paid")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!isMounted) return;
      const paid = profileStats?.is_paid === true;
      setIsPaid(paid);
      setShowUpgradeModal(!paid);
      setLoading(false);
    }

    void loadAccess();

    return () => {
      isMounted = false;
    };
  }, [bookSlug, isFreePack]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  if (isPaid || isFreePack) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Scrambled Pro Feature</h1>
          <p className="mb-6 text-sm text-gray-600">
            Free users can play Genesis, Exodus, Leviticus, and Numbers. The rest of
            Scrambled unlocks with Pro.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/upgrade"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Unlock Full Features
            </Link>
            <Link
              href="/bible-study-games/scrambled/books"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Back to books
            </Link>
          </div>
        </div>
      </div>

      <UpgradeRequiredModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </>
  );
}
