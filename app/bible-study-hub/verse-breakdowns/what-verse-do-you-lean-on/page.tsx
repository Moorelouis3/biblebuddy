"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatVerseDoYouLeanOn() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">What Verse Do You Lean On?</h1>
        <p className="text-gray-600 mb-4 text-center">The scripture you return to.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>We all have certain verses we return to again and again.</p>
          <ul className="list-disc ml-6">
            <li>Some bring comfort.</li>
            <li>Some bring strength.</li>
            <li>Some bring clarity in confusing seasons.</li>
          </ul>
          <p>These verses become anchors in our lives.</p>
          <p>What verse do you lean on the most — and why?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
