"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatVerseHasChallengedYou() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">What Verse Has Challenged You?</h1>
        <p className="text-gray-600 mb-4 text-center">Growth often comes through conviction.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Not every verse feels comforting.</p>
          <ul className="list-disc ml-6">
            <li>Some confront us.</li>
            <li>Some stretch us.</li>
            <li>Some expose areas where we need to grow.</li>
          </ul>
          <p>But those verses often shape us the most.</p>
          <p>What verse has challenged you deeply in your walk with Christ?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
