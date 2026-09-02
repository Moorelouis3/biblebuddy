"use client";

import Link from "next/link";
import { useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
import { BIBLE_GAME_ITEMS_PER_PAGE, BIBLE_GAME_PEOPLE } from "@/lib/bibleStudyGameCatalog";

export default function ScrambledPeoplePage() {
  const [page, setPage] = useState(0);

  const startIndex = page * BIBLE_GAME_ITEMS_PER_PAGE;
  const visiblePeople = BIBLE_GAME_PEOPLE.slice(startIndex, startIndex + BIBLE_GAME_ITEMS_PER_PAGE);
  const hasPrevPage = page > 0;
  const hasNextPage = startIndex + BIBLE_GAME_ITEMS_PER_PAGE < BIBLE_GAME_PEOPLE.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">People of the Bible</h1>
        <p className="text-gray-700 mb-4">Words based on the characters of the Bible</p>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="think" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800 w-full">
              <div className="absolute -left-2 top-5 h-3 w-3 rotate-45 border-b border-l border-gray-200 bg-white" />
              <p className="mb-2">
                These people packs are the next natural step for Scrambled.
              </p>
              <p>The layout is here already, and the first live Scrambled words are still under Genesis while we build these out.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {visiblePeople.map((person) => (
                <div
                  key={person.key}
                  className="rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 text-left text-sm text-gray-500 shadow-sm"
                >
                  <p className="font-semibold">{person.title}</p>
                  <p className="mt-1 text-[11px]">Coming soon.</p>
                </div>
              ))}
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

              <Link href="/bible-study-games/scrambled" className="text-blue-600 hover:underline">
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
    </div>
  );
}
