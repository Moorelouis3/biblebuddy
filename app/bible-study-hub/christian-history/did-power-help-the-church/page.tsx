"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function DidPowerHelpTheChurch() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">Did Power Help the Church?</h1>
        <p className="text-gray-600 mb-4 text-center">Faith and influence through history.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>When Christianity moved from persecution to power, everything changed.</p>
          <ul className="list-disc ml-6">
            <li>Churches became public.</li>
            <li>Leaders gained influence.</li>
            <li>Faith and government became intertwined.</li>
          </ul>
          <p>Some believe this strengthened the Church.</p>
          <p>Others believe it compromised it.</p>
          <p>Do you think power ultimately helped or hurt the Church — and why?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
