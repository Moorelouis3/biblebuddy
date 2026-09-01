import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("names-of-god-meanings", {
  title: "The Names of God and What They Mean: Yahweh, El Shaddai, Adonai, and More",
});

function VerseQuote({ text, reference }: { text: string; reference: string }) {
  return (
    <blockquote className="mt-5 rounded-2xl border border-[#d7e5ff] bg-[#f7faff] px-6 py-5 text-lg italic leading-8 text-slate-700">
      <p>&quot;{text}&quot;</p>
      <footer className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#0056fd]">
        {reference}
      </footer>
    </blockquote>
  );
}

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]">
      {children}
    </Link>
  );
}

export default function NamesOfGodMeaningsPage() {
  return (
    <BlogPostShell
      slug="names-of-god-meanings"
      title={<>📖 The Names of God and What They Mean</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably seen the graphic.</p>
            <p>
              A neat list of the <strong>names of God and their meanings</strong>, each one with a
              tidy definition underneath it.
            </p>
            <p>Elohim. Yahweh. El Shaddai. Jehovah Jireh.</p>
            <p>They look like a set of matching titles God handed out all at once.</p>
            <p>
              📌 <strong>They are not.</strong>
            </p>
            <p>
              Some of these are formal names God used to identify Himself. Some are titles people
              gave Him after He showed up in a specific moment. Scripture treats that difference
              carefully, and this guide will too.
            </p>
            <p>
              Here is why this matters more than trivia. Every name of God in the Bible is a window
              into His character. Not a label. A revelation.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>✅ What each major name actually means</li>
            <li>✅ Exactly where it appears in Scripture</li>
            <li>✅ The honest truth about the popular Jehovah compound names</li>
            <li>✅ How the King James Bible actually translates God&apos;s personal name</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>No folk versions. No garbled memes.</p>
            <p>Just what the text says, verse by verse.</p>
            <p>Let&apos;s start at the beginning. Literally.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why the Names of God Matter for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You cannot trust someone you do not know.</p>
          <p>
            And in Scripture, a name is not just what someone is called. It is a claim about who
            they actually are.
          </p>
          <p>
            When God reveals a name for Himself, He is not decorating a title. He is telling you
            something true about His power, His faithfulness, or His nearness, right when His
            people needed to hear it.
          </p>
          <p>
            📌 <strong>That is why the names of God are not trivia for a Bible quiz.</strong> They
            are promises with a name attached, part of what makes{" "}
            <ArticleLink href="/blog/what-is-the-bible">the Bible</ArticleLink> a living book and
            not a history text.
          </p>
          <p>
            El Shaddai told a childless old man that God was strong enough to keep an impossible
            promise. Jehovah Shalom told a terrified farmer hiding in a winepress that God was not
            angry with him.
          </p>
          <p>Every name is God answering a question His people were actually asking.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 The Major Names of God in the Bible
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Elohim, the Mighty Creator God
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Open the Bible to its very first verse, and this is the name you meet.</p>
        </div>
        <VerseQuote
          text="In the beginning God created the heaven and the earth."
          reference="Genesis 1:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Hebrew word behind &quot;God&quot; here is <strong>Elohim</strong>. It is a plural
            form paired with a singular verb, a grammar choice pointing to fullness and majesty
            rather than more than one god.
          </p>
          <p>
            📌 <strong>Elohim is the name of raw, sovereign power.</strong> Before God is ever
            called Father, Shepherd, or Friend, He is Elohim, mighty enough to speak a universe
            into being.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. YHWH, the God Who Is
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is God&apos;s personal name, and it comes with the most famous name reveal in the
            Bible. Moses stood in front of a burning bush and asked who was sending him.
          </p>
        </div>
        <VerseQuote
          text="And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you."
          reference="Exodus 3:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            You can read that full encounter in{" "}
            <ArticleLink href="/blog/moses">Moses&apos; story</ArticleLink>. The Hebrew letters
            behind &quot;I AM&quot; are the four consonants YHWH, sometimes written Yahweh,
            sometimes Jehovah. Nobody knows the exact original pronunciation, since ancient Hebrew
            was written without vowels.
          </p>
          <p>⚠️ Here is the detail most graphics skip, and it matters.</p>
          <p>
            The King James Bible almost never spells this name out as &quot;Yahweh&quot; or
            &quot;Jehovah&quot; on the page. Nearly every time YHWH appears, the KJV translates it
            as <strong>LORD</strong>, in small capital letters. It is a handful of places, not the
            norm, where the KJV renders it literally as JEHOVAH.
          </p>
        </div>
        <VerseQuote
          text="And I appeared unto Abraham, unto Isaac, and unto Jacob, by the name of God Almighty, but by my name JEHOVAH was I not known to them."
          reference="Exodus 6:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That single verse is where most of the &quot;Jehovah&quot; naming tradition comes from.
            If you have ever wondered why{" "}
            <ArticleLink href="/blog/why-so-many-bible-translations">
              Bible translations
            </ArticleLink>{" "}
            handle God&apos;s name differently, this is the reason. Some spell it out. Most follow
            the KJV pattern and print LORD instead.
          </p>
          <p>
            💡 <strong>Either way, the meaning holds.</strong> YHWH is the God who simply is. Not
            made. Not becoming. Always the same, yesterday, today, and forever.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. El Shaddai, God Almighty
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Abram was ninety nine years old, still childless, still waiting on a promise that
            looked impossible. This is the name God used to reintroduce Himself.
          </p>
        </div>
        <VerseQuote
          text="And when Abram was ninety years old and nine, the LORD appeared to Abram, and said unto him, I am the Almighty God; walk before me, and be thou perfect."
          reference="Genesis 17:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>El Shaddai means the Almighty, all sufficient God.</strong> The name arrives
            right before God renames Abram to Abraham and confirms a covenant that no human ability
            could have produced. When your circumstance says impossible, this is the name that says
            otherwise.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. El Elyon, the Most High God
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            After Abram won a battle to rescue his nephew Lot, a mysterious king and priest named
            Melchizedek met him and blessed him in this name.
          </p>
        </div>
        <VerseQuote
          text="And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth: And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all."
          reference="Genesis 14:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>El Elyon</strong> means God Most High, seated above every earthly power and
            threat. Abram had just walked off a battlefield. Melchizedek reminded him who actually
            won it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Adonai, Lord and Master
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            When Abram had a real complaint, still no son and a servant set to inherit everything,
            this is how he addressed God.
          </p>
        </div>
        <VerseQuote
          text="And Abram said, LORD God, what wilt thou give me, seeing I go childless, and the steward of my house is this Eliezer of Damascus?"
          reference="Genesis 15:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Adonai</strong> means Lord, or Master, the title of someone with the final say
            over your life. Abram brought God his honest frustration, but he still opened with
            Adonai. He argued as a servant, not as an equal.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ The Jehovah Names You&apos;ve Probably Seen Listed
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is where most Pinterest graphics blur a line. They list Jehovah Jireh, Jehovah
            Rapha, and Jehovah Shalom as though God announced each one by name, the same way He
            announced Himself as I AM.
          </p>
          <p>He did not. Not exactly.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Jehovah Jireh, Jehovah Nissi, and Jehovah Shalom
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            These three do appear in the King James text as compound words, but not as names God
            spoke over Himself. They are what His people named an altar or a place, right after
            watching Him act.
          </p>
        </div>
        <VerseQuote
          text="And Abraham called the name of that place Jehovahjireh: as it is said to this day, In the mount of the LORD it shall be seen."
          reference="Genesis 22:14"
        />
        <VerseQuote
          text="And Moses built an altar, and called the name of it Jehovahnissi:"
          reference="Exodus 17:15"
        />
        <VerseQuote
          text="Then Gideon built an altar there unto the LORD, and called it Jehovahshalom: unto this day it is yet in Ophrah of the Abiezrites."
          reference="Judges 6:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jehovah Jireh</strong> means the LORD will provide, named after God supplied
            a ram in place of Isaac. <strong>Jehovah Nissi</strong> means the LORD is my banner,
            named after a battle victory. <strong>Jehovah Shalom</strong> means the LORD is peace,
            named after God calmed a frightened Gideon.
          </p>
          <p>
            Each one is real, biblical, and honest. They are memorial titles, tied to one specific
            moment, not names God used to introduce Himself the way He did at the burning bush.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Jehovah Rapha and the Rest of the List
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Jehovah Rapha&quot; is even further from a formal name. It never appears in the
            King James text as a compound word at all. It comes from a promise God spoke after the
            waters of Marah were healed.
          </p>
        </div>
        <VerseQuote
          text="And said, If thou wilt diligently hearken to the voice of the LORD thy God, and wilt do that which is right in his sight, and wilt give ear to his commandments, and keep all his statutes, I will put none of these diseases upon thee, which I have brought upon the Egyptians: for I am the LORD that healeth thee."
          reference="Exodus 15:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;The LORD that healeth thee&quot; is where the popular title Jehovah Rapha comes
            from. Titles like Jehovah Rohi, drawn from the shepherd imagery of Psalm 23, and
            Jehovah Tsidkenu, drawn from Jeremiah 23:6, follow the same pattern. Real Scripture,
            real truth about God, but a title later generations built from a phrase.
          </p>
          <p>
            💡 <strong>None of that makes these titles less true.</strong> God really does heal,
            and really is your shepherd. Just hold the popular name lists loosely and let the
            actual verses carry the weight.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ How to Study God&apos;s Names for Yourself
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Reading a list is a start. Studying the actual verses is what changes you.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read the story around the name, not just the definition.</strong> Every name
            of God shows up inside a real situation someone was facing. Read Genesis 17 or Exodus 3
            in full, not just the one verse.
          </li>
          <li>
            <strong>Ask which name you need right now.</strong> Waiting on an impossible promise?
            Sit with El Shaddai. Feeling small under a big threat? Sit with El Elyon.
          </li>
          <li>
            <strong>Mark every name of God as you find it.</strong>{" "}
            <ArticleLink href="/blog/a-simple-bible-highlighting-system">
              A simple highlighting system
            </ArticleLink>{" "}
            makes these names easy to spot again later, especially on your next full read through.
          </li>
          <li>
            <strong>Study it verse by verse, not just the summary.</strong> This overview gets you
            started. Bible Buddy is where you can go phrase by phrase through Exodus 3 or Genesis
            17 and see exactly how each name unfolds in context, completely free.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Names of God
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is God&apos;s real name in the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          His personal name is YHWH, four Hebrew consonants revealed to Moses at the burning bush
          as &quot;I AM THAT I AM.&quot; It is usually written Yahweh or Jehovah in English, though
          the original pronunciation is uncertain because ancient Hebrew had no written vowels. The
          King James Bible almost always translates it as LORD instead of spelling it out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does the King James Bible say LORD instead of Yahweh or Jehovah?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This follows a much older Jewish tradition of not pronouncing God&apos;s personal name
          out loud, out of reverence. Translators followed that pattern by rendering YHWH as LORD
          in small capital letters almost everywhere it appears. A small number of verses, like
          Exodus 6:3, are the exception and spell it out as JEHOVAH.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is Jehovah Jireh a name God calls Himself?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not directly. Abraham gave that name to the place where God provided a ram for the
          sacrifice, recorded in Genesis 22:14. It is a real, biblical, memorial title born out of
          that one moment, but Scripture never records God introducing Himself with it the way He
          did with &quot;I AM.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does it matter which name of God is used in a passage?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the name usually matches what the moment needed. God is called El Shaddai when a
          promise looks impossible, and Jehovah Shalom when someone is terrified. Paying attention
          to the name helps you notice exactly what God is revealing about Himself in that passage.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every name of God in Scripture is God answering a real need.</strong> Elohim
            when the world needed a Creator. I AM when Moses needed courage. El Shaddai when
            Abraham needed a promise kept. Jehovah Shalom when Gideon needed peace.
          </p>
          <p>
            📌 <strong>Not every popular title is a formal name, and that is fine.</strong> The
            actual Scripture behind Jehovah Rapha and Jehovah Jireh is more solid than the tidy
            graphic anyway.
          </p>
          <p>
            The names were never meant to stay on a list. They were meant to be lived inside, one
            situation at a time, the way Abraham and Moses and Gideon lived inside them.
          </p>
          <p>So here is your next step. Pick one name from this guide.</p>
          <p>Go read the whole chapter it comes from, slowly, and let it answer whatever you are actually facing this week.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            An overview like this can only take you so far. The real depth is in the chapters
            themselves.
          </p>
          <p>
            Inside <strong>Bible Buddy</strong>, you can{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">read the Bible</ArticleLink> with
            verse by verse notes that walk you through moments like the burning bush and
            Abraham&apos;s covenant, right where they happen.
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English</li>
          <li>🌱 Daily devotionals that meet you where you are</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 A community of believers walking the same road</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is free to start. No pressure, no credit card.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
