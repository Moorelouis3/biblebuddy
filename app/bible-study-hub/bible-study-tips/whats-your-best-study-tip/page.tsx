import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function WhatsYourBestStudyTipPage() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mt-6 mb-2">What’s Your Best Study Tip?</h1>
        <p className="text-gray-600 text-center mb-8">Share what helps you most.</p>
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-gray-800 text-base md:text-lg">We all approach Bible study differently.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Some people outline.<br/>Some highlight.<br/>Some journal.<br/>Some listen.<br/>Some pray first.<br/>Some dive straight in.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Over time, we develop small habits that make a big difference.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">So what is one Bible study tip that has helped you the most?</p>
        </div>
        {/* CommentSection is handled by layout */}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
