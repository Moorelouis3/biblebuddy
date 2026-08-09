import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-bible");

export default function WhatIsTheBiblePage() {
  return (
    <BlogPostShell
      slug="what-is-the-bible"
      title={<>What Is the Bible?</>}
      intro={
        <>
          <h2 className="text-xl font-semibold mb-8 text-gray-700">More Than a Book — The Story of God for Us</h2>
        </>
      }
    >
      <section className="mb-8">
          <p className="mb-4">The Bible is not just a book.</p>
          <p className="mb-4">It is a library.</p>
          <p className="mb-4">Sixty-six books.<br/>Written by over forty authors.<br/>Across three continents.<br/>In three languages.<br/>Over roughly 1,500 years.</p>
          <p className="mb-4">And somehow — it tells one unified story.</p>
          <p className="mb-4">Not about humanity reaching God.<br/>But about God reaching humanity.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">📜 A Book From God — Through Men — For Us</h2>
          <p className="mb-4">Christians believe the Bible is inspired.</p>
          <p className="mb-4">📖 2 Timothy 3:16<br/>“All Scripture is God-breathed…”</p>
          <p className="mb-4">That does not mean God dropped a finished book from heaven.</p>
          <p className="mb-4">It means He worked through real people.</p>
          <p className="mb-4">Real personalities.<br/>Real experiences.<br/>Real cultures.</p>
          <p className="mb-4">Kings wrote parts of it.<br/>Shepherds wrote parts of it.<br/>Prophets.<br/>Fishermen.<br/>Tax collectors.<br/>A former persecutor of Christians.</p>
          <p className="mb-4">From palace courts to prison cells — God was speaking.</p>
          <p className="mb-4">The Bible is divine in origin.<br/>Human in delivery.<br/>Perfect in purpose.</p>
          <p className="mb-4">It is God revealing Himself.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">🕰️ Written Across 1,500 Years</h2>
          <p className="mb-4">The earliest writings date back around 1400 BC.</p>
          <p className="mb-4">The final writings were completed near the end of the first century AD.</p>
          <p className="mb-4">That means the Bible was written across roughly fifteen centuries.</p>
          <p className="mb-4">Empires rose and fell during that time.</p>
          <p className="mb-4">Languages shifted.<br/>Cultures changed.<br/>Governments collapsed.</p>
          <p className="mb-4">And yet the central message never changed:</p>
          <p className="mb-4">God is holy.<br/>Humanity is fallen.<br/>Redemption is coming.<br/>And His name is Jesus.</p>
          <p className="mb-4">That kind of unity across centuries is not normal.<br/>It is remarkable.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">📖 Old Testament vs. New Testament</h2>
          <p className="mb-4">The Bible is divided into two major sections:</p>
          <p className="mb-4 font-semibold">The Old Testament</p>
          <p className="mb-4">Thirty-nine books.</p>
          <p className="mb-4">It begins with creation.<br/>It tells the story of Israel.<br/>It reveals God’s covenant with His people.<br/>It includes law, poetry, prophecy, and history.</p>
          <p className="mb-4">It prepares the way.<br/>It builds expectation.<br/>It whispers promises of a coming Messiah.</p>
          <p className="mb-4">Genesis plants the seed.<br/>Isaiah describes the suffering servant.<br/>Micah names Bethlehem.<br/>Psalm 22 paints the crucifixion before crucifixion existed.</p>
          <p className="mb-4">The Old Testament is not outdated.<br/>It is the foundation.</p>
          <p className="mb-4 font-semibold">The New Testament</p>
          <p className="mb-4">Twenty-seven books.</p>
          <p className="mb-4">It opens with four Gospels — Matthew, Mark, Luke, and John — telling the life, death, and resurrection of Jesus.</p>
          <p className="mb-4">Then Acts records the birth of the early Church.</p>
          <p className="mb-4">The Epistles explain theology, doctrine, and how to live as followers of Christ.</p>
          <p className="mb-4">And Revelation closes the story with ultimate restoration.</p>
          <p className="mb-4">The New Testament fulfills what the Old anticipated.</p>
          <p className="mb-4">Promise.<br/>Fulfillment.<br/>Grace.<br/>Hope.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">📚 The Bible Is Structured by Genre</h2>
          <p className="mb-4">The Bible is not one style of writing.</p>
          <p className="mb-4">It contains multiple genres:</p>
          <p className="mb-4">📖 Law<br/>Genesis through Deuteronomy — foundational instruction.</p>
          <p className="mb-4">📖 History<br/>Joshua through Esther — real events, real kings, real battles.</p>
          <p className="mb-4">📖 Poetry & Wisdom<br/>Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon — emotion, worship, reflection.</p>
          <p className="mb-4">📖 Prophecy<br/>Isaiah through Malachi — warnings, hope, future promises.</p>
          <p className="mb-4">📖 Gospels<br/>The life of Jesus from four perspectives.</p>
          <p className="mb-4">📖 Letters<br/>Practical instruction for churches and believers.</p>
          <p className="mb-4">📖 Apocalyptic<br/>Revelation — symbolic imagery revealing ultimate victory.</p>
          <p className="mb-4">Understanding genre matters.</p>
          <p className="mb-4">You don’t read poetry the same way you read historical narrative.</p>
          <p className="mb-4">And when you understand that — confusion fades.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">✍️ The Authors: From Kings to Tax Collectors</h2>
          <p className="mb-4">Think about who wrote Scripture:</p>
          <p className="mb-4">👑 David — a king and warrior<br/>🐑 Amos — a shepherd<br/>📜 Moses — raised in Egyptian royalty<br/>🎣 Peter — a fisherman<br/>💰 Matthew — a tax collector<br/>📚 Paul — a trained Pharisee and former persecutor<br/>👨‍⚕️ Luke — a physician</p>
          <p className="mb-4">They were not clones.</p>
          <p className="mb-4">They had different educations.<br/>Different personalities.<br/>Different backgrounds.</p>
          <p className="mb-4">Yet their writings harmonize.</p>
          <p className="mb-4">The Bible’s unity does not erase their individuality.</p>
          <p className="mb-4">It reveals divine guidance.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">🌍 Three Languages. One Message.</h2>
          <p className="mb-4">The Old Testament was primarily written in Hebrew.<br/>Parts in Aramaic.</p>
          <p className="mb-4">The New Testament was written in Greek.</p>
          <p className="mb-4">Different languages.<br/>Different audiences.</p>
          <p className="mb-4">One message.</p>
          <p className="mb-4">God creating.<br/>God covenanting.<br/>God redeeming.<br/>God restoring.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">🔥 Not Just Information — Instruction</h2>
          <p className="mb-4">The Bible is not just history.</p>
          <p className="mb-4">It is instruction.</p>
          <p className="mb-4">📖 Psalm 119:105<br/>“Your word is a lamp to my feet and a light to my path.”</p>
          <p className="mb-4">It teaches.<br/>Corrects.<br/>Rebukes.<br/>Encourages.</p>
          <p className="mb-4">It reveals who God is.<br/>It exposes who we are.<br/>It shows how to live.</p>
          <p className="mb-4">It does not just inform the mind.<br/>It transforms the heart.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">✨ The Bible Is a Story</h2>
          <p className="mb-4">From Genesis to Revelation, it tells one continuous story:</p>
          <p className="mb-4">Creation.<br/>Fall.<br/>Redemption.<br/>Restoration.</p>
          <p className="mb-4">Eden lost.<br/>Eden restored.</p>
          <p className="mb-4">A tree in Genesis.<br/>A cross in the Gospels.<br/>A tree of life again in Revelation.</p>
          <p className="mb-4">That is not random.<br/>That is intentional design.</p>
          <p className="mb-4">The Bible is a grand narrative — and every page pushes forward.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Final Thought</h2>
          <p className="mb-4">The Bible is not outdated.</p>
          <p className="mb-4">It is ancient — yes.</p>
          <p className="mb-4">But timeless.</p>
          <p className="mb-4">It has survived persecution.<br/>Translation.<br/>Criticism.<br/>Skepticism.</p>
          <p className="mb-4">And it continues to shape civilizations, cultures, and hearts.</p>
          <p className="mb-4">It is from God.<br/>Through people.<br/>For us.</p>
          <p className="mb-4">If you want to understand faith,<br/>understand truth,<br/>understand history,<br/>understand purpose —</p>
          <p className="mb-4">start here.</p>
          <p className="mb-4">Because the Bible is not just a book.</p>
          <p className="mb-4">It is the story of God.</p>
          <p className="mb-4">And it is still being read.</p>
        </section>
      {/* Reflection Section */}
      <div className="mt-8 mb-4 flex flex-col items-center">
        <hr className="w-2/3 mb-2 border-blue-200" />
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-1">Reflection Question</h2>
        <div className="text-lg md:text-xl font-semibold text-center text-gray-700 mb-1">
          What is the most surprising or interesting fact you’ve learned about the Bible?
        </div>
        <div className="text-sm italic text-gray-500 text-center mt-0 mb-0">
          Share your thoughts below and join the conversation.
        </div>
      </div>
      {/* CommentSection wrapper with minimal top margin */}
      <div className="mt-2">
        {/* CommentSection is rendered by layout, so nothing else needed here */}
      </div>
      
    </BlogPostShell>
  );
}
