"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
import { ACTION_TYPE } from "@/lib/actionTypes";
import {
  BIBLE_GAME_BOOKS,
  BIBLE_GAME_ITEMS_PER_PAGE,
  SCRAMBLED_LIVE_BOOK_KEYS,
} from "@/lib/bibleStudyGameCatalog";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";
import { supabase } from "@/lib/supabaseClient";

export default function ScrambledBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const filteredBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return BIBLE_GAME_BOOKS;
    return BIBLE_GAME_BOOKS.filter((book) => book.title.toLowerCase().includes(query));
  }, [searchQuery]);

  const startIndex = page * BIBLE_GAME_ITEMS_PER_PAGE;
  const visibleBooks = filteredBooks.slice(startIndex, startIndex + BIBLE_GAME_ITEMS_PER_PAGE);
  const hasPrevPage = page > 0;
  const hasNextPage = startIndex + BIBLE_GAME_ITEMS_PER_PAGE < filteredBooks.length;

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setUserId(user?.id ?? null);
      const meta: any = user?.user_metadata || {};
      setUsername(
        meta.firstName ||
          meta.first_name ||
          (user?.email ? user.email.split("@")[0] : null) ||
          null
      );
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.scrambled_books_viewed,
      actionLabel: "Books of the Bible",
      dedupeKey: "scrambled-books-viewed",
    }).catch((error) => console.error("[NAV] Failed to track Scrambled books view:", error));
  }, [userId, username]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">Books of the Bible</h1>
        <p className="text-gray-700 mb-4">Words based on the books of the Bible</p>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800 w-full">
              <div className="absolute -left-2 top-5 h-3 w-3 rotate-45 border-b border-l border-gray-200 bg-white" />
              <p className="mb-2">
                Pick a book of the Bible, and I&apos;ll give you Scripture words to unscramble from it.
              </p>
              <p>Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, Song of Songs, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi, Matthew, Mark, Luke, John, Acts, Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, and Philemon are live now, and the rest of the books can open up naturally as we add more packs.</p>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setPage(0);
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
              {visibleBooks.map((book) => {
                const isLive = SCRAMBLED_LIVE_BOOK_KEYS.has(book.key);

                if (isLive) {
                  return (
                    <Link
                      key={book.key}
                      href={`/bible-study-games/scrambled/${book.key}`}
                      onClick={() => {
                        if (!userId) return;
                        void trackNavigationActionOnce({
                          userId,
                          username,
                          actionType: ACTION_TYPE.scrambled_book_opened,
                          actionLabel: book.title,
                          dedupeKey: `scrambled-book-opened:${book.key}`,
                        }).catch((error) => console.error("[NAV] Failed to track Scrambled book click:", error));
                      }}
                      className="rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 text-left text-sm shadow-sm transition hover:scale-[1.01] hover:shadow-md"
                    >
                      <p className="font-semibold">{book.title}</p>
                      <p className="mt-1 text-[11px]">Click to play this book.</p>
                    </Link>
                  );
                }

                return (
                  <div
                    key={book.key}
                    className="rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 text-left text-sm text-gray-500 shadow-sm"
                  >
                    <p className="font-semibold">{book.title}</p>
                    <p className="mt-1 text-[11px]">Coming soon.</p>
                  </div>
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
                Previous books
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
                Next books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
