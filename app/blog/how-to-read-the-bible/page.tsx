import Image from "next/image";
import BibleStudyHubArticleLayout from "@/components/BibleStudyHubArticleLayout";

export default function HowToReadTheBible() {
  return (
    <BibleStudyHubArticleLayout>
      <div className="mb-8">
        <Image
          src="/Biblereadingbanner.png"
          alt="Bible Reading Banner"
          width={1200}
          height={400}
          className="w-full rounded-xl mb-6"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">How to Read the Bible</h1>
      <h2 className="text-xl font-semibold mb-3">A Simple Way to Study Scripture</h2>
      <p className="mb-4">Most people think reading the Bible and studying the Bible are the same thing.</p>
      <p className="mb-4">They are not.</p>
      <p className="mb-4">Many open a passage.<br />Read a chapter.<br />Close the book.<br />Move on.</p>
      <p className="mb-4">That is where it ends.</p>
      <p className="mb-4">But reading is only the beginning.</p>
      <p className="mb-4">Understanding is the goal.</p>
      <p className="mb-4">Reading without understanding does not change much.</p>
      <p className="mb-4">Finishing chapters does not equal growth.</p>
      <p className="mb-4">The purpose of reading Scripture is not to check a box.</p>
      <p className="mb-4">It is to understand what God is saying.</p>
      <p className="mb-4">And that requires a different approach.</p>
      <h2 className="text-xl font-semibold mt-8 mb-3">📖 Reading and Studying Are Not the Same</h2>
      <p className="mb-4">Reading is the first step.</p>
      <p className="mb-4">Studying is what follows.</p>
      <p className="mb-4">Reading gathers information.<br />Studying pursues meaning.</p>
      <p className="mb-4">If reading stops at the surface, transformation rarely follows.</p>
      <p className="mb-4">Scripture was not given to be skimmed.</p>
      <p className="mb-4">It was given to be examined.</p>
      <p className="mb-4">The difference between casual reading and intentional study changes everything.</p>
      <h2 className="text-xl font-semibold mt-8 mb-3">📚 The Bible Is One Connected Story</h2>
      <p className="mb-4">The Bible is not a random collection of inspirational verses.</p>
      <p className="mb-4">It is one unified story told through many smaller stories.</p>
      <p className="mb-4">The story of:</p>
      <ul className="mb-4 ml-6 list-none">
        <li>📖 Jesus</li>
        <li>📖 Joseph</li>
        <li>📖 Moses</li>
        <li>📖 David</li>
        <li>📖 Israel</li>
        <li>📖 Paul</li>
      </ul>
      <p className="mb-4">Each account stands on its own.</p>
      <p className="mb-4">But each one connects.</p>
      <p className="mb-4">Themes repeat.</p>
      <p className="mb-4">Promises build.</p>
      <p className="mb-4">Events echo across generations.</p>
      <p className="mb-4">Just like a long running series where characters and storylines intertwine, Scripture unfolds intentionally.</p>
      <p className="mb-4">When the Bible is seen as one connected narrative instead of isolated passages, clarity increases.</p>
      <p className="mb-4">Understanding deepens.</p>
      <p className="mb-4">Reading becomes engaging.</p>
      <h2 className="text-xl font-semibold mt-8 mb-3">👤 Real People. Real History.</h2>
      <p className="mb-4">The people in Scripture were not fictional characters.</p>
      <p className="mb-4">They were real.</p>
      <p className="mb-4">They lived in real places.<br />Faced real conflict.<br />Made real mistakes.</p>
      <p className="mb-4">Studying Scripture means asking:</p>
      <ul className="mb-4 ml-6 list-none">
        <li>👤 Who is this person</li>
        <li>📍 Where are they in history</li>
        <li>🧩 How does this connect to the larger story</li>
        <li>➡️ Where is this leading</li>
      </ul>
      <p className="mb-4">When Scripture is approached this way, it becomes dynamic.</p>
      <p className="mb-4">Stories stick.</p>
      <p className="mb-4">The human mind is wired for narrative.</p>
      <p className="mb-4">So instead of fighting that design, lean into it.</p>
      <p className="mb-4">Studying the Bible is better.</p>
      <p className="mb-4">The difference is engagement.</p>
      <p className="mb-4">Slow down.</p>
      <p className="mb-4">Ask questions.</p>
      <p className="mb-4">Seek context.</p>
      <p className="mb-4">Follow the story.</p>
      <p className="mb-4">Scripture was not given to be rushed through.</p>
      <p className="mb-4">It was given to be understood.</p>
      <p className="mb-4">And when it is approached with patience and intention, it begins to shape everything.</p>
      {/* Reflection Section */}
      <div className="mt-8 mb-4 flex flex-col items-center">
        <hr className="w-2/3 mb-2 border-blue-200" />
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-1">Reflection Question</h2>
        <div className="text-lg md:text-xl font-semibold text-center text-gray-700 mb-1">
          What is your favorite Bible story and why?
        </div>
        <div className="text-sm italic text-gray-500 text-center mt-0 mb-0">
          Share your thoughts below and join the conversation.
        </div>
      </div>
      {/* CommentSection wrapper with minimal top margin */}
      <div className="mt-2">
        {/* CommentSection is rendered by layout, so nothing else needed here */}
      </div>
    </BibleStudyHubArticleLayout>
  );
}
