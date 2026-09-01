import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-1-explained", {
  title: "Genesis 1 Explained: The Creation of the World",
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

export default function GenesisOneExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-1-explained"
      title={<>📖 Genesis 1 Explained: The Creation of the World</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You want to know what Genesis 1 actually says.</p>
            <p>Not the meme version. Not the version somebody argued about online.</p>
            <p>The real text, in order, explained in plain language.</p>
            <p>
              📌 <strong>Genesis 1 is the opening chapter of the Bible. It is the account of how
              God made everything that exists, in six days, simply by speaking.</strong>
            </p>
            <p>
              Maybe a verse from this chapter crossed your feed and you realized you had never
              actually read the whole thing it came from.
            </p>
            <p>
              Maybe you are teaching this chapter to your kids or your small group and want to get
              the order right.
            </p>
            <p>
              Or maybe you have heard the arguments about six days versus millions of years and you
              just want to know what the chapter itself says first.
            </p>
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-700">Here is what this guide walks through.</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 What actually happens on each of the six days, in the right order</li>
            <li>🔲 Why light shows up before the sun, and what that means</li>
            <li>🔲 What it means that you are made in God&apos;s image</li>
            <li>🔲 What Genesis 1 says about God&apos;s authority over everything He made</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This is a chapter overview, not a verse by verse study.</p>
            <p>
              By the end, you will actually understand Genesis 1, and you will know exactly where
              to go if you want to slow down and study it one verse at a time.
            </p>
            <p>Let&apos;s open the chapter and start at the beginning.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌍 What Genesis 1 Actually Is
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 1 is the first chapter of the first book of the Bible.</p>
          <p>
            Genesis means beginning, and this chapter earns that name. It opens{" "}
            <ArticleLink href="/blog/what-is-the-bible">the entire Bible</ArticleLink>, the whole
            story of God and His people, with the single most important sentence in Scripture.
          </p>
          <VerseQuote text="In the beginning God created the heaven and the earth." reference="Genesis 1:1" />
          <p>
            📌 <strong>Everything else in the Bible builds on this one verse.</strong> Before there
            is a garden, a promise, a law, or a cross, there is God, and there is what He made.
          </p>
          <p>
            Genesis is traditionally credited to{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink>, though the text itself does not
            name its author. What matters most for this chapter is not who held the pen. It is
            what the words actually claim.
          </p>
          <p>
            And what they claim is bold. Ancient people around Israel told creation stories full of
            fighting gods and leftover chaos. Genesis 1 tells a different story. One God. No rival.
            No struggle. He simply speaks, and it happens.
          </p>
          <p>That order and intention, not chaos, is the whole tone of the chapter from verse one.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌱 The Six Days of Creation, In Order
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Days One Through Three: God Forms the World
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens on a world with no shape and nothing in it yet.</p>
          <p>Then God starts speaking, and the shape appears.</p>
          <p>
            On day one, God calls light into existence and separates it from darkness. Day and
            night begin here.
          </p>
        </div>
        <VerseQuote text="And God said, Let there be light: and there was light." reference="Genesis 1:3" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice something a lot of Pinterest graphics skip over. Light shows up here, on day
            one. The sun does not get made until day four. That is not a mistake in the text, and
            the chapter is not confused about the order.
          </p>
          <p>
            Genesis 1 separates the source of light from the object that carries it later. Whatever
            you make of that, the text is deliberate about it, not sloppy.
          </p>
          <p>
            On day two, God separates the waters above from the waters below with a firmament,
            forming the sky.
          </p>
          <p>
            On day three, God gathers the waters below into seas and lets dry land appear. Then He
            fills that land with plants and trees, each bearing seed after its own kind.
          </p>
          <p>Watch the pattern building through these three days.</p>
          <p>
            📌 <strong>Days one through three are all about forming spaces.</strong> Light and dark.
            Sky and sea. Land and plants. God is building rooms before He moves anything into them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Days Four Through Six: God Fills What He Formed
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the pattern flips.</p>
          <p>
            On day four, God makes the sun, moon, and stars, and sets them to govern day and night
            and mark seasons and years. This is the light bearer now filling the space light and
            dark already occupied on day one.
          </p>
          <p>
            On day five, God fills the sky and sea with birds and every living creature that swims,
            and blesses them to multiply. That fills the space formed on day two.
          </p>
          <p>
            On day six, God fills the land with cattle, creeping things, and wild beasts after their
            kind. That fills the space formed on day three.
          </p>
          <p>
            💡 <strong>The six days are not a random list.</strong> Days one through three form
            three spaces. Days four through six fill each of those same spaces in the same order.
            That structure is in the text itself, not something added later.
          </p>
          <p>And day six does not stop with the animals.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Humanity, Made in God&apos;s Image
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Everything before this point, God called good.</p>
          <p>Then He does something He has not done for anything else He made.</p>
        </div>
        <VerseQuote
          text="And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth. So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Slow down on that for a second.</p>
          <p>
            No plant is called God&apos;s image. No animal, no star, no sea creature. Only the man
            and the woman.
          </p>
          <p>
            📌 <strong>Every human being carries something of God stamped into who they are.</strong>{" "}
            Not just certain people. Not just one gender. The text is specific. Male and female,
            both, equally, bear that image.
          </p>
          <p>
            That is the foundation under the truth that{" "}
            <ArticleLink href="/blog/your-body-is-a-temple">your body is a temple</ArticleLink>.
            Human worth in Scripture never starts with what you accomplish. It starts here, in
            Genesis 1, before anyone had done anything at all.
          </p>
          <p>
            Genesis 1 also gives humanity a job alongside that identity. Dominion. Not to abuse the
            earth, but to care for it and rule it the way God rules, with order and purpose rather
            than chaos.
          </p>
          <p>
            This chapter comes alive on a whole different level when you slow down and study it
            verse by verse, and that is exactly what <strong>Bible Buddy</strong> is built for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Very Good: God&apos;s Authority as Creator
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes on day six with a summary line.</p>
        </div>
        <VerseQuote
          text="And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
          reference="Genesis 1:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not just good, like each individual day before it. Very good, as a finished whole.</p>
          <p>
            Nine times in this chapter, God speaks and it happens exactly as He said. No effort. No
            resistance. No committee.
          </p>
          <p>
            📌 <strong>That is the real claim of Genesis 1.</strong> Not just that God made
            everything, but that He has full authority over everything He made. Nothing in creation
            exists outside His word or His right to rule it.
          </p>
          <p>
            One popular claim worth correcting here. A lot of graphics compress the whole creation
            week into Genesis 1, including God resting on the seventh day. Read closely and that
            rest actually opens the next chapter, Genesis 2, once the sixth day&apos;s work is
            already finished.
          </p>
          <p>The small detail matters, because it shows how carefully this text is put together.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ What Genesis 1 Means for You
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not just ancient history. It sets the frame for how you see everything else.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>You are not an accident.</strong> Everything else in creation happened by a
            word. You were made in God&apos;s own image, on purpose, with intention behind it.
          </li>
          <li>
            <strong>Order beats chaos.</strong> God brought shape and structure out of formless
            emptiness. That is still His pattern in your life when things feel scattered.
          </li>
          <li>
            <strong>God has the final word over creation, including your circumstances.</strong>{" "}
            Nine times He speaks and it is so. He is not wringing His hands over your situation.
          </li>
          <li>
            <strong>Read Genesis 1 for yourself, slowly.</strong> Mark verse 1, verse 27, and verse
            31 in your Bible with{" "}
            <ArticleLink href="/blog/a-simple-bible-highlighting-system">
              a simple highlighting system
            </ArticleLink>{" "}
            so the chapter stays easy to find again.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 1
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What was created on each day in Genesis 1?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Day one is light. Day two is the sky. Day three is dry land and plants. Day four is the
          sun, moon, and stars. Day five is sea creatures and birds. Day six is land animals and
          then humanity, made male and female in God&apos;s image.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did God create the world in six literal twenty four hour days?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Faithful Christians read this differently. The Hebrew word for day, yom, is the same word
          used for a normal day elsewhere in Scripture, which is why many read it literally. Either
          way, the whole chapter insists that God, not chance, is behind everything that exists.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why was light created before the sun in Genesis 1?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the mechanism, and it does not need to. Genesis 1 separates the
          existence of light on day one from the sun, moon, and stars that are given to govern and
          display that light starting on day four. The order is intentional, not a slip in the
          text.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does it mean that humans are made in the image of God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means every person carries something of God&apos;s own character stamped into who they
          are, whether or not they believe in Him. Genesis 1:27 says this of both male and female
          equally. It is the reason Scripture treats human life as sacred from the very first
          chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Genesis 1 say God rested on the seventh day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not technically. Genesis 1 ends with the sixth day and the summary that everything was
          very good. The seventh day of rest actually opens Genesis 2. Popular graphics often fold
          it into one seven day week, and the idea is connected, but the rest itself belongs to the
          next chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 1 is doing more than describing a week.</p>
          <p>
            📌 <strong>It is telling you who God is, who you are, and how the two connect.</strong>
          </p>
          <p>
            God made an ordered, intentional world by speaking. He made you in His own image, on
            purpose. And He holds full authority over everything He made, including whatever you are
            walking through right now.
          </p>
          <p>
            That is a lot to carry from one chapter, and this overview only scratches the surface of
            what is actually in the text.
          </p>
          <p>
            If you want to go slower, verse by verse, that is exactly what{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">reading the Bible</ArticleLink> well
            looks like, and it is exactly what Bible Buddy is for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Study Genesis 1 Verse by Verse in Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This overview gets you the shape of the chapter.</p>
          <p>
            Inside <strong>Bible Buddy</strong>, you can go through Genesis 1 one verse at a time,
            with plain English notes explaining exactly what each line means.
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse notes on every chapter, starting in Genesis</li>
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
