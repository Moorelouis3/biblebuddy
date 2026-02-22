"use client";

import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatsYourBestStudyTip() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">What’s Your Best Study Tip?</h1>
        <p className="text-gray-600 mb-4">Share what helps you most.</p>
        <div className="text-gray-800 space-y-2 mb-8">
          <p>We all approach Bible study differently.</p>
          <ul className="list-disc ml-6">
            <li>Some people outline.</li>
            <li>Some highlight.</li>
            <li>Some journal.</li>
            <li>Some listen.</li>
            <li>Some pray first.</li>
            <li>Some dive straight in.</li>
          </ul>
          <p>Over time, we develop small habits that make a big difference.</p>
          <p>So what is one Bible study tip that has helped you the most?</p>
        </div>
      </div>
    </BibleStudyHubArticleLayout>
  );
}
