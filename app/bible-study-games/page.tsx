 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";
import { supabase } from "@/lib/supabaseClient";

export default function BibleStudyGamesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

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
      actionType: ACTION_TYPE.bible_study_games_viewed,
      actionLabel: "Bible Study Games",
      dedupeKey: "bible-study-games-viewed",
    }).catch((error) => console.error("[NAV] Failed to track Bible Study Games view:", error));
  }, [userId, username]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Bible Study Games</h1>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-5 flex items-start gap-3">
            <LouisAvatar mood="hands" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 h-3 w-3 rotate-45 border-b border-l border-gray-200 bg-white" />
              <p className="mb-2">
                Hey, these are the Bible study games we have to help you study and remember Scripture in a fun and interactive way.
              </p>
              <p>Pick the one you want, and let&apos;s keep Bible study active instead of passive.</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/bible-trivia"
              className="block"
              onClick={() => {
                if (!userId) return;
                void trackNavigationActionOnce({
                  userId,
                  username,
                  actionType: ACTION_TYPE.bible_game_opened,
                  actionLabel: "Bible Study Trivia",
                  dedupeKey: "bible-game-opened:trivia",
                }).catch((error) => console.error("[NAV] Failed to track game click:", error));
              }}
            >
              <div className="rounded-xl border border-[#bfe3cf] bg-[#daf1e3] p-5 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-900">Bible Study Trivia</h2>
                <p className="mt-1 text-gray-700">Test your Bible knowledge</p>
              </div>
            </Link>

            <Link
              href="/bible-study-games/scrambled"
              className="block"
              onClick={() => {
                if (!userId) return;
                void trackNavigationActionOnce({
                  userId,
                  username,
                  actionType: ACTION_TYPE.bible_game_opened,
                  actionLabel: "Scrambled",
                  dedupeKey: "bible-game-opened:scrambled",
                }).catch((error) => console.error("[NAV] Failed to track game click:", error));
              }}
            >
              <div className="rounded-xl border border-[#e8b9c1] bg-[#f6dce1] p-5 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-900">Scrambled</h2>
                <p className="mt-1 text-gray-700">How many words can you unscramble?</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
