"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhoDoYouRelateTo() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">Who Do You Relate To?</h1>
        <p className="text-gray-600 mb-4 text-center">A story that mirrors yours.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Scripture does not hide flaws.</p>
          <ul className="list-disc ml-6">
            <li>It shows fear.</li>
            <li>Failure.</li>
            <li>Doubt.</li>
            <li>Redemption.</li>
          </ul>
          <p>Many of us see pieces of ourselves in biblical stories.</p>
          <p>What Bible character do you relate to the most — and why?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
