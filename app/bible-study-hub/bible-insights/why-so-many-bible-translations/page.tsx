import BibleStudyBreadcrumb from "@/components/BibleStudyBreadcrumb";
import Image from "next/image";

export default function WhySoManyBibleTranslationsPage() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-10">
      <BibleStudyBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Bible Study Hub", href: "/bible-study-hub" },
          { label: "Bible Insights", href: "/bible-study-hub/bible-insights" },
          { label: "Why So Many Bible Translations?" }
        ]}
      />
      <div className="mb-8">
        <Image
          src="/Translationsbanner.png"
          alt="Why So Many Bible Translations Banner"
          width={1200}
          height={600}
          className="rounded-xl shadow-sm w-full h-auto object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">Why So Many Bible Translations?</h1>
      <h2 className="text-xl font-semibold mb-8 text-gray-700">Understanding Your Modern Bible Version</h2>

      <section className="mb-8">
        <p className="mb-4">Have you ever wondered why there are so many different Bible translations?</p>
        <p className="mb-4">Maybe you have opened a Bible app and felt overwhelmed.</p>
        <p className="mb-4">ESV.<br/>NIV.<br/>KJV.<br/>NKJV.<br/>NLT.<br/>NASB.</p>
        <p className="mb-4">Which one is right?</p>
        <p className="mb-4">Did someone change the Bible?</p>
        <p className="mb-4">Did someone rewrite it?</p>
        <p className="mb-4">Why does one version sound poetic and old while another sounds modern and simple?</p>
        <p className="mb-4">If the Bible is God’s Word, why does it not look the same everywhere?</p>
        <p className="mb-4">That is a real question.</p>
        <p className="mb-4">And it deserves a real answer.</p>
        <p className="mb-4">The reason there are many translations is not corruption.</p>
        <p className="mb-4">It is clarity.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">📜 The Bible Was Not Written in English</h2>
        <p className="mb-4">The Bible was not originally written in English.</p>
        <p className="mb-4">The Old Testament was written primarily in Hebrew.<br/>Parts of it were written in Aramaic.</p>
        <p className="mb-4">The New Testament was written in Greek.</p>
        <p className="mb-4">That means every English Bible you have ever held is a translation.</p>
        <p className="mb-4">Not a remix.<br/>Not an update to change theology.<br/>Not a modern rewrite to fit culture.</p>
        <p className="mb-4">A translation.</p>
        <p className="mb-4">Scholars take ancient manuscripts and carefully translate them into the language people speak today so that the meaning is preserved and understood.</p>
        <p className="mb-4">Languages change.</p>
        <p className="mb-4">The English spoken in the year 1611 is not the English you speak today.</p>
        <p className="mb-4">Even the English spoken one hundred years ago feels different.</p>
        <p className="mb-4">If the Bible stayed locked in one era of language, many people would struggle to understand it.</p>
        <p className="mb-4">Translation is not about changing the message.</p>
        <p className="mb-4">It is about carrying the message forward.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">📚 The Three Translation Approaches</h2>
        <p className="mb-4">Every major English Bible translation falls into one of three general approaches.</p>
        <p className="mb-4">📝 Word for Word</p>
        <p className="mb-4">This approach tries to stay as close as possible to the original wording and structure of Hebrew and Greek.</p>
        <p className="mb-4">Examples include the King James Version, the New King James Version, the New American Standard Bible, and the English Standard Version.</p>
        <p className="mb-4">📖 Thought for Thought</p>
        <p className="mb-4">This approach focuses on translating the meaning of phrases clearly rather than matching every word structure exactly.</p>
        <p className="mb-4">Examples include the New International Version and the Christian Standard Bible.</p>
        <p className="mb-4">💬 Paraphrase</p>
        <p className="mb-4">This approach restates Scripture in very modern language.</p>
        <p className="mb-4">Examples include the New Living Translation and The Message.</p>
        <p className="mb-4">None of these approaches are trying to change doctrine.</p>
        <p className="mb-4">They are trying to communicate faithfully.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">👑 The King James Version</h2>
        <p className="mb-4">In 1604 King James the First authorized a new English translation.</p>
        <p className="mb-4">Forty seven scholars were appointed.</p>
        <p className="mb-4">When it was published in 1611 it shaped the English language itself.</p>
        <p className="mb-4">For centuries it was the dominant English Bible.</p>
        <p className="mb-4">The New King James Version later updated its language while preserving its structure.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">📘 The New American Standard Bible</h2>
        <p className="mb-4">First published in 1971.</p>
        <p className="mb-4">It became known for precision and strict adherence to the original text.</p>
        <p className="mb-4">It is often considered one of the most literal English translations available.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">📖 The New International Version</h2>
        <p className="mb-4">Published in 1978.</p>
        <p className="mb-4">Developed by over one hundred scholars.</p>
        <p className="mb-4">Balanced readability and faithfulness to the original manuscripts.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">📘 The English Standard Version</h2>
        <p className="mb-4">Published in 2001.</p>
        <p className="mb-4">Designed to be word for word accurate while remaining readable.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">📗 The New Living Translation</h2>
        <p className="mb-4">Published in 1996.</p>
        <p className="mb-4">Focused on clarity and modern readability.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">🔥 Why So Many?</h2>
        <p className="mb-4">Because English changes.</p>
        <p className="mb-4">Because scholarship advances.</p>
        <p className="mb-4">Because clarity matters.</p>
        <p className="mb-4">More translations do not weaken Scripture.</p>
        <p className="mb-4">They demonstrate its reach.</p>
        <p className="mb-4">The message has not changed.</p>
        <p className="mb-4">Only the language around it has.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">🚫 Important</h2>
        <p className="mb-4">Do not alter existing Bible Insights articles.<br/>Do not refactor layout components.<br/>Do not modify global styles.<br/>Do not rename folders.</p>
        <p className="mb-4">Only add this new card and article following the established pattern.</p>
      </section>
    </article>
  );
}
