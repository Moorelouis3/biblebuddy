"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatDoesBeingChristianMean() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">What Does Being Christian Mean?</h1>
        <p className="text-gray-600 mb-4 text-center">Faith is more than religion.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Being a Christian is not just a label.</p>
          <ul className="list-disc ml-6">
            <li>It is belief.</li>
            <li>It is identity.</li>
            <li>It is surrender.</li>
            <li>It is transformation.</li>
          </ul>
          <p>Different people express their faith in different ways.</p>
          <p>So what does being a Christian mean to you personally?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
