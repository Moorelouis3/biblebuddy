"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatIsYourTestimony() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">What Is Your Testimony?</h1>
        <p className="text-gray-600 mb-4 text-center">Share how faith changed you.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Every believer has a story.</p>
          <ul className="list-disc ml-6">
            <li>Some stories are dramatic.</li>
            <li>Some are quiet.</li>
            <li>Some happened in a single moment.</li>
            <li>Some unfolded over years.</li>
          </ul>
          <p>But every testimony shows how God moves in real lives.</p>
          <p>How did your journey with Christ begin?</p>
          <p>What changed in you?</p>
          <p>Share your testimony.</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
