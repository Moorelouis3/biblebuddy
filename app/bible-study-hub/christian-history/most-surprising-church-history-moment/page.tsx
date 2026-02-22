"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function MostSurprisingChurchHistoryMoment() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2 text-center">Most Surprising Church History Moment?</h1>
        <p className="text-gray-600 mb-4 text-center">Events that changed your perspective.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>Church history is filled with unexpected turns.</p>
          <ul className="list-disc ml-6">
            <li>Persecution.</li>
            <li>Revival.</li>
            <li>Political shifts.</li>
            <li>Martyrs.</li>
            <li>Reformers.</li>
          </ul>
          <p>Many believers discover moments in history they were never taught growing up.</p>
          <p>What moment in Church history surprised you the most — and why?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
