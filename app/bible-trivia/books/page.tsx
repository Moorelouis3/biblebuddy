"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface BookProgress {
  genesis: number;
  exodus: number;
  leviticus: number;
  numbers: number;
  deuteronomy: number;
  joshua: number;
  judges: number;
  ruth: number;
}

export default function BooksOfTheBiblePage() {
  const [progress, setProgress] = useState<BookProgress>({
    genesis: 100,
    exodus: 100,
    leviticus: 100,
    numbers: 100,
    deuteronomy: 100,
    joshua: 100,
    judges: 100,
    ruth: 50,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch progress for all books
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("book, is_correct")
          .eq("user_id", user.id)
          .in("book", [
            "genesis",
            "exodus",
            "leviticus",
            "numbers",
            "deuteronomy",
            "joshua",
            "judges",
            "ruth",
          ]);

        if (error) {
          console.error("Error fetching trivia progress:", error);
        } else {
          // Calculate remaining questions for each book
          const bookTotals = {
            genesis: 100,
            exodus: 100,
            leviticus: 100,
            numbers: 100,
            deuteronomy: 100,
            joshua: 100,
            judges: 100,
            ruth: 50,
          };
          // Removed duplicate bookTotals definition to fix build error
          const correctCounts: Record<string, number> = {};

          progressData?.forEach((p) => {
            if (p.is_correct) {
              correctCounts[p.book] = (correctCounts[p.book] || 0) + 1;
            }
          });

          setProgress({
            genesis: Math.max(0, bookTotals.genesis - (correctCounts.genesis || 0)),
            exodus: Math.max(0, bookTotals.exodus - (correctCounts.exodus || 0)),
            leviticus: Math.max(0, bookTotals.leviticus - (correctCounts.leviticus || 0)),
            numbers: Math.max(0, bookTotals.numbers - (correctCounts.numbers || 0)),
            deuteronomy: Math.max(0, bookTotals.deuteronomy - (correctCounts.deuteronomy || 0)),
            joshua: Math.max(0, bookTotals.joshua - (correctCounts.joshua || 0)),
            judges: Math.max(0, bookTotals.judges - (correctCounts.judges || 0)),
            ruth: Math.max(0, bookTotals.ruth - (correctCounts.ruth || 0)),
          });
        }
      }
      setLoading(false);
    }
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">📚 Books of the Bible</h1>
          <p className="text-gray-600">Test your knowledge of biblical books</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            {
              key: "genesis",
              title: "Genesis",
              href: "/bible-trivia/genesis",
              icon: "📚",
              cardClass:
                "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200",
            },
            {
              key: "exodus",
              title: "Exodus",
              href: "/bible-trivia/exodus",
              icon: "🔥",
              cardClass:
                "bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200",
            },
            {
              key: "leviticus",
              title: "Leviticus",
              href: "/bible-trivia/leviticus",
              icon: "🌿",
              cardClass:
                "bg-gradient-to-br from-lime-50 to-green-50 border-2 border-lime-200",
            },
            {
              key: "numbers",
              title: "Numbers",
              href: "/bible-trivia/numbers",
              icon: "🔢",
              cardClass:
                "bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-200",
            },
            {
              key: "deuteronomy",
              title: "Deuteronomy",
              href: "/bible-trivia/deuteronomy",
              icon: "📜",
              cardClass:
                "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200",
            },
            {
              key: "joshua",
              title: "Joshua",
              href: "/bible-trivia/joshua",
              icon: "⚔️",
              cardClass:
                "bg-gradient-to-br from-cyan-50 to-blue-100 border-2 border-cyan-200",
            },
            {
              key: "judges",
              title: "Judges",
              href: "/bible-trivia/judges",
              icon: "⚖️",
              cardClass:
                "bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200",
            },
            {
              key: "ruth",
              title: "Ruth",
              href: "/bible-trivia/ruth",
              icon: "🌾",
              cardClass:
                "bg-gradient-to-br from-pink-50 to-yellow-100 border-2 border-pink-200",
            },
          ].map((card) => (
            <Link key={card.key} href={card.href}>
              <div
                className={`${card.cardClass} rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{card.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {loading
                      ? "Loading..."
                      : `${progress[card.key as keyof BookProgress]} Questions Remaining`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Categories */}
        <div className="mt-8 text-center">
          <Link href="/bible-trivia" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Categories
          </Link>
        </div>
      </div>
    </div>
  );
}