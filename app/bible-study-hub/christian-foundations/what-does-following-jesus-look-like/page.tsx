"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatDoesFollowingJesusLookLike() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">What Does Following Jesus Look Like?</h1>
        <p className="text-gray-600 mb-4 text-center">Faith lived out daily.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Following Jesus is more than agreement.</p>
          <ul className="list-disc ml-6">
            <li>It affects how we think.</li>
            <li>How we speak.</li>
            <li>How we treat others.</li>
            <li>How we handle trials.</li>
          </ul>
          <p>It shapes daily life.</p>
          <p>What does following Jesus look like in your life right now?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
