"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function FavoriteBibleCharacter() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">Favorite Bible Character?</h1>
        <p className="text-gray-600 mb-4 text-center">The person who inspires you.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>The Bible is filled with real people.</p>
          <ul className="list-disc ml-6">
            <li>Some were bold.</li>
            <li>Some were broken.</li>
            <li>Some were leaders.</li>
            <li>Some were outsiders.</li>
          </ul>
          <p>But each of them reveals something about God.</p>
          <p>Who is your favorite Bible character — and what draws you to their story?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
