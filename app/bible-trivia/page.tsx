"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface BookProgress {
  genesis: number;
  exodus: number;
  deuteronomy: number;
}

export default function BibleTriviaPage() {
  const [progress, setProgress] = useState<BookProgress>({
    genesis: 100,
    exodus: 100,
    deuteronomy: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch progress for all books
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('book, is_correct')
          .eq('user_id', user.id)
          .in('book', ['genesis', 'exodus', 'deuteronomy']);

        if (error) {
          console.error('Error fetching trivia progress:', error);
        } else {
          // Calculate remaining questions for each book
          const bookTotals = { genesis: 100, exodus: 100, deuteronomy: 100 };
          const correctCounts: Record<string, number> = {};
          
          progressData?.forEach(p => {
            if (p.is_correct) {
              correctCounts[p.book] = (correctCounts[p.book] || 0) + 1;
            }
          });

          setProgress({
            genesis: Math.max(0, bookTotals.genesis - (correctCounts.genesis || 0)),
            exodus: Math.max(0, bookTotals.exodus - (correctCounts.exodus || 0)),
            deuteronomy: Math.max(0, bookTotals.deuteronomy - (correctCounts.deuteronomy || 0))
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
          <h1 className="text-3xl font-semibold mb-2">🎯 Bible Trivia</h1>
          <p className="text-gray-600">Test your Bible knowledge</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Genesis Deck Card */}
          <Link href="/bible-trivia/genesis">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Genesis</h2>
                <p className="text-gray-600 text-sm">
                  {loading ? "Loading..." : `${progress.genesis} Questions Remaining`}
                </p>
              </div>
            </div>
          </Link>

          {/* Exodus Deck Card */}
          <Link href="/bible-trivia/exodus">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">🔥</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Exodus</h2>
                <p className="text-gray-600 text-sm">
                  {loading ? "Loading..." : `${progress.exodus} Questions Remaining`}
                </p>
              </div>
            </div>
          </Link>

          {/* Deuteronomy Deck Card */}
          <Link href="/bible-trivia/deuteronomy">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">📜</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Deuteronomy</h2>
                <p className="text-gray-600 text-sm">
                  {loading ? "Loading..." : `${progress.deuteronomy} Questions Remaining`}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

