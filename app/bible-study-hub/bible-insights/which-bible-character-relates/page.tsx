import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";


export default function WhichBibleCharacterRelatesPage() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Breadcrumbs handled by layout if present */}
        <h1 className="text-3xl font-bold text-center mt-6 mb-2">Which Bible Character Relates?</h1>
        <p className="text-gray-600 text-center mb-8">Faith journeys are deeply personal.</p>
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-gray-800 text-base md:text-lg">The Bible is full of real people with real struggles.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Some were bold.<br/>Some were afraid.<br/>Some failed.<br/>Some doubted.<br/>Some ran from God.<br/>Some trusted Him anyway.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Sometimes we don’t just read their stories — we see ourselves in them.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">So think about it.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Which Bible character do you relate to the most — and why?</p>
        </div>
        {/* CommentSection removed; handled by layout */}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
