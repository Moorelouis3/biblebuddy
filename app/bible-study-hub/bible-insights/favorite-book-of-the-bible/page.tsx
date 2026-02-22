import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";


export default function FavoriteBookOfTheBiblePage() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Breadcrumbs handled by layout if present */}
        <h1 className="text-3xl font-bold text-center mt-6 mb-2">Favorite Book of the Bible?</h1>
        <p className="text-gray-600 text-center mb-8">Every book speaks differently.</p>
        <div className="max-w-2xl mx-auto">
          <p className="mb-4 text-gray-800 text-base md:text-lg">The Bible is one story — but told through many voices.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">History.<br/>Poetry.<br/>Prophecy.<br/>Gospels.<br/>Letters.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Each book carries a different tone, perspective, and emphasis.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">Some comfort us.<br/>Some challenge us.<br/>Some shape how we see God.</p>
          <p className="mb-4 text-gray-800 text-base md:text-lg">So which book stands out to you — and what makes it your favorite?</p>
        </div>
        {/* CommentSection removed; handled by layout */}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
