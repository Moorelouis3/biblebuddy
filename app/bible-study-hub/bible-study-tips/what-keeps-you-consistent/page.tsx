import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatKeepsYouConsistentPage() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mt-6 mb-2">What Keeps You Consistent?</h1>
        <p className="text-gray-600 text-center mb-8">Staying disciplined is not easy.</p>
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-gray-800 text-base md:text-lg">Starting Bible study is easy.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Staying consistent is the challenge.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Life gets busy.<br/>Distractions creep in.<br/>Motivation fades.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">But consistency builds depth.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">What helps you stay faithful in your Bible study routine?</p>
        </div>
        {/* CommentSection is handled by layout */}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
