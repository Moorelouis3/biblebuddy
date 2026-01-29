"use client";

import Link from "next/link";

export default function BibleTriviaPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">🎯 Bible Trivia</h1>
          <p className="text-gray-600">Choose a category to begin</p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Books of the Bible Category */}
          <Link href="/bible-trivia/books">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Books of the Bible</h2>
                <p className="text-gray-600 text-sm">Test your knowledge of biblical books</p>
              </div>
            </div>
          </Link>

          {/* People of the Bible Category */}
          <Link href="/bible-trivia/people">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">👥</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">People of the Bible</h2>
                <p className="text-gray-600 text-sm">Learn about biblical characters</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

