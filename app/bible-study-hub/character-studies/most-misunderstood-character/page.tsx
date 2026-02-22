"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function MostMisunderstoodCharacter() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">Most Misunderstood Character?</h1>
        <p className="text-gray-600 mb-4 text-center">Someone people often misjudge.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Some biblical figures are remembered for one moment.</p>
          <p>But their stories are deeper than a single mistake.</p>
          <ul className="list-disc ml-6">
            <li>Context matters.</li>
            <li>Growth matters.</li>
            <li>Redemption matters.</li>
          </ul>
          <p>What Bible character do you think is most misunderstood — and why?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
