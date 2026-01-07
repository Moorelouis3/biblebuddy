"use client";

export default function UpdatesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Updates</h1>
      <p className="text-gray-500 mb-8">
        How Bible Buddy is growing to help you understand the Bible better over time.
      </p>

      {/* Version 2.0 */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">Version 2.0 — January 2026</h2>
        <p className="text-gray-600 italic mb-4">A major step forward in understanding Scripture</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bible Buddy moved from a simple reading tool to a full Bible study workspace.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed mb-4">
          <li>The entire Bible unlocked (no forced reading plan)</li>
          <li>People of the Bible database (2,500+ profiles)</li>
          <li>Places of the Bible database (2,500+ locations)</li>
          <li>Keywords of the Bible (1,000+ study concepts)</li>
          <li>Clickable people, places, and keywords inside Scripture</li>
          <li>In-chapter pop-up explanations while reading</li>
          <li>Simple note taking system tied to chapters</li>
          <li>User profile page with study stats</li>
          <li>Action-based progress tracking</li>
          <li>Streaks and habit building</li>
          <li>Feedback and feature request system</li>
          <li>Performance and analytics improvements</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          This update focused on understanding, not speed.
        </p>
      </section>

      {/* Version 1.0 */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">Version 1.0 — December 2025</h2>
        <p className="text-gray-600 italic mb-4">The beginning</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bible Buddy started as a focused reading experience.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed mb-4">
          <li>Guided Bible reading plan</li>
          <li>Limited character studies</li>
          <li>Basic note taking</li>
          <li>Chapter completion tracking</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Version 1.0 laid the foundation for everything that followed.
        </p>
      </section>

      {/* What We're Working Toward */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">What We're Working Toward</h2>
        <p className="text-gray-600 italic mb-4">Planned improvements and ideas</p>
        <p className="text-gray-700 leading-relaxed mb-6">
          These are features we're actively thinking about or planning.
          They are not promises or deadlines.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-3">Planned</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>Expanded keyword database toward 2,500+</li>
          <li>Deeper connections between people, places, and events</li>
          <li>More detailed user profiles</li>
          <li>Profile pictures and personalization</li>
          <li>Shareable progress and study stats</li>
          <li>Improved note organization</li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-3">Exploring</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed mb-6">
          <li>Study summaries after chapters</li>
          <li>Optional quizzes and reflections</li>
          <li>Guided learning paths</li>
          <li>Social features that encourage growth without comparison</li>
        </ul>

        <p className="text-gray-700 leading-relaxed">
          Bible Buddy is built to grow slowly and intentionally.
          Understanding the Bible is a lifelong journey.
        </p>
      </section>

      {/* Thank You */}
      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">Thank you</h2>
        <p className="text-gray-700 leading-relaxed">
          Thank you for using Bible Buddy and being part of its growth.
          Your feedback helps shape what comes next.
        </p>
      </section>
    </div>
  );
}

