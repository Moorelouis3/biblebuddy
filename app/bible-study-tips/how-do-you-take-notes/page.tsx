"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function HowDoYouTakeNotes() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">How Do You Take Notes?</h1>
        <p className="text-gray-600 mb-4">Everyone studies a little differently.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>There is no single right way to take Bible study notes.</p>
          <ul className="list-disc ml-6">
            <li>Some people use notebooks.</li>
            <li>Some use color systems.</li>
            <li>Some type everything digitally.</li>
            <li>Some barely write at all.</li>
          </ul>
          <p>Your note system shapes how you process Scripture.</p>
          <p>So how do you take notes when you study the Bible?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
