"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

interface PeopleProgress {
  god: number;
  jesus: number;
  moses: number;
  abraham: number;
}

export default function PeopleOfTheBiblePage() {
  const [progress, setProgress] = useState<PeopleProgress>({
    god: 100,
    jesus: 100,
    moses: 100,
    abraham: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
// Fetch progress for all people categories
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('book, is_correct')
          .eq('user_id', user.id)
          .in('book', ['god', 'jesus', 'moses', 'abraham']);

        if (error) {
          console.error('Error fetching trivia progress:', error);
        } else {
          // Calculate remaining questions for each person
          const personTotals = { god: 100, jesus: 100, moses: 100, abraham: 100 };
          const correctCounts: Record<string, number> = {};

          progressData?.forEach(p => {
            if (p.is_correct) {
              correctCounts[p.book] = (correctCounts[p.book] || 0) + 1;
            }
          });

          setProgress({
            god: Math.max(0, personTotals.god - (correctCounts.god || 0)),
            jesus: Math.max(0, personTotals.jesus - (correctCounts.jesus || 0)),
            moses: Math.max(0, personTotals.moses - (correctCounts.moses || 0)),
            abraham: Math.max(0, personTotals.abraham - (correctCounts.abraham || 0))
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
          <h1 className="text-3xl font-semibold mb-2">👥 People of the Bible</h1>
          <p className="text-gray-600">Learn about biblical characters</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* God Deck Card */}
          <Link
            href="/bible-trivia/god"
            className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">God</h2>
              <p className="text-gray-600 text-sm">
                {loading ? "Loading..." : `${progress.god} Questions Remaining`}
              </p>
            </div>
          </Link>

          {/* Jesus Deck Card */}
          <Link
            href="/bible-trivia/jesus"
            className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">✝️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Jesus</h2>
              <p className="text-gray-600 text-sm">
                {loading ? "Loading..." : `${progress.jesus} Questions Remaining`}
              </p>
            </div>
          </Link>

          {/* Moses Deck Card */}
          <Link
            href="/bible-trivia/moses"
            className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 shadow-lg h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">⛰️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Moses</h2>
              <p className="text-gray-600 text-sm">
                {loading ? "Loading..." : `${progress.moses} Questions Remaining`}
              </p>
            </div>
          </Link>

          {/* Abraham Deck Card */}
          <Link
            href="/bible-trivia/abraham"
            className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🌾</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Abraham</h2>
              <p className="text-gray-600 text-sm">
                {loading ? "Loading..." : `${progress.abraham} Questions Remaining`}
              </p>
            </div>
          </Link>
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



