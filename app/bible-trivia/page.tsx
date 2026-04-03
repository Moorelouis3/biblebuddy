"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { trackNavigationActionOnce } from "@/lib/navigationActionTracker";
import { supabase } from "@/lib/supabaseClient";

export default function BibleTriviaPage() {
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
      actionType: ACTION_TYPE.trivia_hub_viewed,
      actionLabel: "Bible Study Trivia",
      dedupeKey: "trivia-hub-viewed",
    }).catch((error) => console.error("[NAV] Failed to track trivia hub view:", error));
  }, [userId, username]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link href="/bible-study-games" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            Back to Bible Study Games
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">Bible Study Trivia</h1>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">
          <div className="mt-1 mb-5 flex items-start gap-3">
            <LouisAvatar mood="think" size={56} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800">
              <div className="absolute -left-2 top-5 h-3 w-3 rotate-45 border-b border-l border-gray-200 bg-white" />
              <p className="mb-2">
                Use trivia to test what you remember after reading and studying Scripture.
              </p>
              <p>Pick whether you want questions from books of the Bible or from people of the Bible.</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/bible-trivia/books"
              className="block"
              onClick={() => {
                if (!userId) return;
                void trackNavigationActionOnce({
                  userId,
                  username,
                  actionType: ACTION_TYPE.trivia_category_opened,
                  actionLabel: "Books of the Bible",
                  dedupeKey: "trivia-category:books",
                }).catch((error) => console.error("[NAV] Failed to track trivia category click:", error));
              }}
            >
              <div className="rounded-xl border border-[#c9d8f0] bg-[#dce7f7] p-5 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-900">Books of the Bible</h2>
                <p className="mt-1 text-gray-700">Trivia based on the books of the Bible</p>
              </div>
            </Link>

            <Link
              href="/bible-trivia/people"
              className="block"
              onClick={() => {
                if (!userId) return;
                void trackNavigationActionOnce({
                  userId,
                  username,
                  actionType: ACTION_TYPE.trivia_category_opened,
                  actionLabel: "People of the Bible",
                  dedupeKey: "trivia-category:people",
                }).catch((error) => console.error("[NAV] Failed to track trivia category click:", error));
              }}
            >
              <div className="rounded-xl border border-[#ddd0ff] bg-[#efe7ff] p-5 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
                <h2 className="text-xl font-semibold text-gray-900">People of the Bible</h2>
                <p className="mt-1 text-gray-700">Trivia based on the characters of the Bible</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
