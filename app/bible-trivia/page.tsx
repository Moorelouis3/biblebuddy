"use client";

import Link from "next/link";

export default function BibleTriviaPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">🎯 Bible Trivia</h1>
          <p className="text-gray-600">Test your Bible knowledge</p>
        </div>

        {/* Genesis Deck Card */}
        <div className="max-w-md mx-auto">
          <Link href="/bible-trivia/genesis">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Genesis</h2>
                <p className="text-gray-600 text-sm">25 Questions Available</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

