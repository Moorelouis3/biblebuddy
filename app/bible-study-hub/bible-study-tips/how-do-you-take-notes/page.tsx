import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function HowDoYouTakeNotesPage() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mt-6 mb-2">How Do You Take Notes?</h1>
        <p className="text-gray-600 text-center mb-8">Everyone studies a little differently.</p>
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-gray-800 text-base md:text-lg">There is no single right way to take Bible study notes.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Some people use notebooks.<br/>Some use color systems.<br/>Some type everything digitally.<br/>Some barely write at all.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Your note system shapes how you process Scripture.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">So how do you take notes when you study the Bible?</p>
        </div>
        {/* CommentSection is handled by layout */}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
