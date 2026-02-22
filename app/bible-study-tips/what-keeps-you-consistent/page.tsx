"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatKeepsYouConsistent() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">What Keeps You Consistent?</h1>
        <p className="text-gray-600 mb-4">Staying disciplined is not easy.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Starting Bible study is easy.</p>
          <p>Staying consistent is the challenge.</p>
          <ul className="list-disc ml-6">
            <li>Life gets busy.</li>
            <li>Distractions creep in.</li>
            <li>Motivation fades.</li>
          </ul>
          <p>But consistency builds depth.</p>
          <p>What helps you stay faithful in your Bible study routine?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
