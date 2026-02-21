import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";


export default function WhatTranslationDoYouUsePage() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Breadcrumbs removed: component not found */}
        <h1 className="text-3xl font-bold text-center mt-6 mb-2">What Translation Do You Use?</h1>
        <p className="text-gray-600 text-center mb-8">Share which Bible translation you read and why.</p>

        {/* Intro text block, styled like article body */}
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-gray-800 text-base md:text-lg">We all read the Bible differently.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Some people prefer a word for word translation because they want to stay as close to the original text as possible.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Others choose a thought for thought translation to better understand the overall meaning.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Some grew up reading the KJV and love its depth and tradition.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Others prefer something modern and easier to follow.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">There isn’t one right answer here.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">The goal is understanding.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">So tell us — what translation do you read, and why does it work for you?</p>
        </div>
        {/* CommentSection still handled by layout */}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
