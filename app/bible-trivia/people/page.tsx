"use client";

import Link from "next/link";

export default function PeopleOfTheBiblePage() {
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
            className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg h-full hover:shadow-xl transition-shadow"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">God</h2>
              <p className="text-gray-600 text-sm">100 Questions</p>
            </div>
          </Link>

          {/* Jesus Deck Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg h-full opacity-75">
            <div className="text-center">
              <div className="text-6xl mb-4">✝️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Jesus</h2>
              <p className="text-gray-500 text-sm italic">Coming Soon</p>
            </div>
          </div>

          {/* Moses Deck Card */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 shadow-lg h-full opacity-75">
            <div className="text-center">
              <div className="text-6xl mb-4">🗡️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Moses</h2>
              <p className="text-gray-500 text-sm italic">Coming Soon</p>
            </div>
          </div>

          {/* Abraham Deck Card */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg h-full opacity-75">
            <div className="text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Abraham</h2>
              <p className="text-gray-500 text-sm italic">Coming Soon</p>
            </div>
          </div>
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