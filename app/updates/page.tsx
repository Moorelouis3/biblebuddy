"use client";

export default function UpdatesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Updates</h1>
      <p className="text-gray-500 mb-8">
        How Bible Buddy is growing to help you understand the Bible better over time.
      </p>

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">Version 4.0 - March 2026</h2>
        <p className="text-gray-600 italic mb-4">Bible Study Group - the new central place for shared study</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bible Buddy now puts shared study front and center. Version 4.0 focuses the community experience around one official Bible study group with a simpler path into lessons and discussion.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed mb-4">
          <li>One official Bible Buddy Study Group for everyone in the app</li>
          <li>Dashboard card opens the group directly with no extra middle page</li>
          <li>Weekly Bible study lessons unlock automatically on schedule</li>
          <li>Upcoming weeks stay visibly locked until release</li>
          <li>Members must finish the previous week before starting the next one</li>
          <li>Leader controls for setting the start date inside the group itself</li>
          <li>Group details moved into the group view instead of a separate page</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          The Bible was never meant to be studied alone. This update makes the study group the clearest place to read, reflect, and grow together.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">Version 3.0 - March 2026</h2>
        <p className="text-gray-600 italic mb-4">New devotional: The Testing of Joseph</p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Bible Buddy's second devotional series is now live - a 21-day walk through Joseph's journey in Genesis.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 leading-relaxed mb-4">
          <li>The Testing of Joseph - 21 days covering Genesis 37-50</li>
          <li>Daily devotional text, Bible reading, and reflection question</li>
          <li>Explores themes of favor, betrayal, faithfulness, and redemption</li>
          <li>Progress tracked day-by-day alongside The Tempting of Jesus</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Joseph's story is one of the most complete portraits of faith under pressure in all of Scripture.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">Version 2.0 - January 2026</h2>
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

      <section>
        <h2 className="text-xl font-semibold mt-10 mb-3">Version 1.0 - December 2025</h2>
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
