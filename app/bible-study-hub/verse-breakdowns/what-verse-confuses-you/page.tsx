"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatVerseConfusesYou() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">What Verse Confuses You?</h1>
        <p className="text-gray-600 mb-4 text-center">Some passages require deeper study.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Scripture is rich and layered.</p>
          <ul className="list-disc ml-6">
            <li>Some verses are clear.</li>
            <li>Others require time, study, and prayer to understand.</li>
          </ul>
          <p>It is okay to wrestle with difficult passages.</p>
          <p>What verse do you struggle to fully understand?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
