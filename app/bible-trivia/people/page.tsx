"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import UpgradeRequiredModal from "@/components/UpgradeRequiredModal";
import { LouisAvatar } from "@/components/LouisAvatar";
import { BIBLE_GAME_ITEMS_PER_PAGE, BIBLE_GAME_PEOPLE, FREE_TRIVIA_PERSON_KEYS } from "@/lib/bibleStudyGameCatalog";
import { supabase } from "@/lib/supabaseClient";

const PERSON_TOTALS: Record<string, number> = {
  god: 100,
  jesus: 100,
  moses: 100,
  abraham: 100,
};

export default function PeopleOfTheBiblePage() {
  const [progress, setProgress] = useState<Record<string, number>>(PERSON_TOTALS);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [page, setPage] = useState(0);

  const startIndex = page * BIBLE_GAME_ITEMS_PER_PAGE;
  const visiblePeople = BIBLE_GAME_PEOPLE.slice(startIndex, startIndex + BIBLE_GAME_ITEMS_PER_PAGE);
  const hasPrevPage = page > 0;
  const hasNextPage = startIndex + BIBLE_GAME_ITEMS_PER_PAGE < BIBLE_GAME_PEOPLE.length;

  useEffect(() => {
    async function fetchProgress() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsPaid(false);
        setLoading(false);
        return;
      }

      const { data: profileStats } = await supabase
        .from("profile_stats")
        .select("is_paid")
        .eq("user_id", user.id)
        .maybeSingle();

      setIsPaid(!!profileStats?.is_paid);

      const { data: progressData, error } = await supabase
        .from("trivia_question_progress")
        .select("book, is_correct")
        .eq("user_id", user.id)
        .in(
          "book",
          BIBLE_GAME_PEOPLE.map((person) => person.key),
        );

      if (error) {
        console.error("Error fetching trivia progress:", error);
        setLoading(false);
        return;
      }

      const correctCounts: Record<string, number> = {};
      progressData?.forEach((entry) => {
        if (entry.is_correct) {
          correctCounts[entry.book] = (correctCounts[entry.book] || 0) + 1;
        }
      });

      const nextProgress = Object.fromEntries(
        BIBLE_GAME_PEOPLE.map((person) => [person.key, Math.max(0, PERSON_TOTALS[person.key] - (correctCounts[person.key] || 0))]),
      );

      setProgress(nextProgress);
      setLoading(false);
    }

    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">People of the Bible</h1>
        <p className="text-gray-700 mb-4">Trivia based on the characters of the Bible</p>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="think" size={56} />
            <div className="relative w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm">
              <div className="absolute -left-2 top-5 h-3 w-3 rotate-45 border-b border-l border-gray-200 bg-white" />
              <p className="mb-2">Choose a person of the Bible and test how well you know their story.</p>
              <p>God and Jesus are open for free users, and the other people stay locked the same way they already were.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mt-2 md:grid-cols-4">
              {visiblePeople.map((person) => {
                const isLocked = isPaid === false && !FREE_TRIVIA_PERSON_KEYS.has(person.key);
                const label = loading
                  ? "Loading..."
                  : `${progress[person.key] ?? PERSON_TOTALS[person.key]} questions remaining`;

                const content = (
                  <>
                    <p className="font-semibold">{person.title}</p>
                    <p className="mt-1 text-[11px]">{label}</p>
                    {isLocked ? (
                      <div className="absolute inset-0 flex items-end justify-center rounded-xl bg-black/45 pb-3">
                        <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold text-white">Pro Users Only</span>
                      </div>
                    ) : null}
                  </>
                );

                if (isLocked) {
                  return (
                    <button
                      key={person.key}
                      type="button"
                      onClick={() => setShowUpgradeModal(true)}
                      className="relative rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 text-left text-sm shadow-sm transition"
                    >
                      {content}
                    </button>
                  );
                }

                return (
                  <Link
                    key={person.key}
                    href={person.triviaHref}
                    className="relative rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 text-left text-sm shadow-sm transition hover:scale-[1.01] hover:shadow-md"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => hasPrevPage && setPage((current) => current - 1)}
                disabled={!hasPrevPage}
                className={`text-blue-600 hover:underline ${!hasPrevPage ? "cursor-default text-gray-300" : ""}`}
              >
                Previous people
              </button>

              <Link href="/bible-trivia" className="text-blue-600 hover:underline">
                Change category
              </Link>

              <button
                type="button"
                onClick={() => hasNextPage && setPage((current) => current + 1)}
                disabled={!hasNextPage}
                className={`text-blue-600 hover:underline ${!hasNextPage ? "cursor-default text-gray-300" : ""}`}
              >
                Next people
              </button>
            </div>
          </div>
        </div>
      </div>

      <UpgradeRequiredModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
}
