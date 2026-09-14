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
            <p>Here is something else worth knowing before you start.</p>
            <p>
              Genesis 1 is the very first thing anyone reads when they open a Bible. Every promise,
              every prophet, every page that comes after it stands on what this one chapter claims
              about who God is.
            </p>
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-700">Here is what this guide walks through.</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 What actually happens on each of the six days, in the right order</li>
            <li>🔲 Why light shows up before the sun, and what that means</li>
            <li>🔲 What it means that you are made in God&apos;s image</li>
            <li>🔲 What Genesis 1 says about God&apos;s authority over everything He made</li>
            <li>🔲 Why this chapter matters for what you actually believe about your own life</li>
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
          💙 Why Genesis 1 Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You could skip Genesis 1 and still say you believe in Jesus.</p>
          <p>Except you cannot, not really.</p>
          <p>
            📌 <strong>What you believe about the very first chapter of the Bible shapes what you
            believe about every chapter after it.</strong>
          </p>
          <p>
            Ancient people living around Israel had their own origin stories. In those stories, the
            gods fought each other. The world got made from the leftover pieces of that fight.
            Chaos came first. Order was an accident nobody controlled.
          </p>
          <p>Genesis 1 tells a completely different story.</p>
          <p>One God. No rival. No struggle.</p>
          <p>He speaks, and it happens.</p>
          <p>
            ⚠️ That difference is not a small detail for scholars to argue about in a classroom. It
            changes what you believe about your own life.
          </p>
          <p>
            If the universe started as an accident, with nobody in charge of it, then you started
            as an accident too. No plan behind you. No purpose ahead of you. Just chemistry that
            happened to arrange itself into a person.
          </p>
          <p>
            If a violent, divided pantheon made the world, you would expect a violent, unstable God
            running it now.
          </p>
          <p>Genesis 1 says neither of those is true.</p>
          <p>
            One sovereign Creator spoke a world into order, called it good, and made you in His own
            image on purpose.
          </p>
          <p>
            That is why this chapter is worth defending, not just admiring. It is worth asking
            honestly whether{" "}
            <ArticleLink href="/blog/how-do-we-know-the-bible-is-true">
              the record it comes from can actually be trusted
            </ArticleLink>{" "}
            before you build your view of the universe on it.
          </p>
          <p>
            📌 <strong>The stakes are not just what happened at the very beginning of time. The
            stakes are whether you are here on purpose.</strong>
          </p>
          <p>Genesis 1 says you are.</p>
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
          <p>Before day one even starts, the text sets the scene.</p>
        </div>
        <VerseQuote text="In the beginning God created the heaven and the earth." reference="Genesis 1:1" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Everything else in the Bible builds on this one verse.</strong> Before there
            is a garden, a promise, a law, or a cross, there is God, and there is what He made.
          </p>
          <p>Verse two adds the picture you need before anything gets built.</p>
          <p>
            The earth has no shape yet. It is empty. Darkness covers everything, and the Spirit of
            God is hovering over the waters.
          </p>
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
          <p>On day two, God speaks again.</p>
        </div>
        <VerseQuote
          text="And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters. And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so."
          reference="Genesis 1:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That firmament is the sky. God is separating the waters above it from the waters below
            it, forming open space in between.
          </p>
          <p>
            On day three, God speaks twice more. First He gathers the waters below into seas and
            lets dry land appear. Then He fills that land with plants and trees, each bearing seed
            after its own kind.
          </p>
          <p>Watch the pattern building through these three days.</p>
          <p>
            📌 <strong>Days one through three are all about forming spaces.</strong> Light and dark.
            Sky and sea. Land and plants. God is building rooms before He moves anything into them.
          </p>
          <p>
            Notice one more detail while you are here. Six separate times in this chapter, right
            after God speaks, the text adds the same short line. And it was so. No delay. No
            struggle to make it work. God speaks, and it is so, every single time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Days Four Through Six: God Fills What He Formed
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the pattern flips.</p>
          <p>
            On day four, God makes the sun, moon, and stars, and sets them to govern day and night
            and mark seasons and years.
          </p>
        </div>
        <VerseQuote
          text="And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years: And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so."
          reference="Genesis 1:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the light bearer now filling the space light and dark already occupied on day
            one.
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
            This is the first time in Scripture you meet the man who will later be called{" "}
            <ArticleLink href="/blog/who-was-adam">Adam</ArticleLink> and the woman who will later
            be called <ArticleLink href="/blog/who-was-eve">Eve</ArticleLink>. Genesis 1 does not
            name them yet. It gives them their identity before it gives them their names. Image
            bearers first. Individuals second.
          </p>
          <p>
            That order matters. Human worth in Scripture never starts with what you accomplish, who
            you marry, or what name you carry. It starts here, before anyone had done anything at
            all.
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
            rest actually opens the next chapter, once the sixth day&apos;s work is already
            finished.
          </p>
        </div>
        <VerseQuote
          text="Thus the heavens and the earth were finished, and all the host of them. And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made."
          reference="Genesis 2:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The small detail matters, because it shows how carefully this text is put together.
            Genesis 1 and{" "}
            <ArticleLink href="/blog/genesis-2-explained">Genesis 2</ArticleLink> were never meant
            to be read apart from each other. One tells you the world got made. The other slows
            down and tells you what it was actually like to live in it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Living Like Genesis 1 Is True
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 1 is not just something to know. It is something to stand on.</p>
          <p>Here are seven ways to let it actually shape your week.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Remember you are not an accident.</strong> Everything else in creation happened
            by a word. You were made in God&apos;s own image, on purpose, with intention behind it.
            Say that to yourself on the hard mornings.
          </li>
          <li>
            <strong>Let order beat chaos in your own life too.</strong> God brought shape and
            structure out of formless emptiness. That is still His pattern when your schedule, your
            home, or your mind feels scattered. Ask Him to bring order the way He did on day one.
          </li>
          <li>
            <strong>Read the whole chapter in one sitting first.</strong> Genesis 1 only takes a few
            minutes to read straight through. Do that once before you ever study it verse by verse,
            so you see the whole shape of the week before you zoom in on any single day.
          </li>
          <li>
            <strong>Mark verses 1, 27, and 31 in your Bible.</strong> Use a simple highlighting
            system so the chapter stays easy to find. Those three verses alone give you the
            beginning, your identity, and God&apos;s verdict on it all.
          </li>
          <li>
            <strong>Compare Genesis 1 with John 1.</strong> Both chapters open with the same four
            words. Reading them side by side shows you that the God who spoke the world into being
            in Genesis is the same Word who took on flesh in John.
          </li>
          <li>
            <strong>Let &quot;very good&quot; reshape how you see your own body.</strong> You did
            not become valuable once you started performing well. God called His finished creation
            very good before it had done a single thing. That includes you.
          </li>
          <li>
            <strong>Practice a weekly rest, not just a nightly one.</strong> God built rest into the
            pattern of creation on purpose. Set aside part of one day each week to actually stop,
            even if it is only a few hours, and let that be an act of trust, not laziness.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 1
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You could study this chapter for years and never run out of depth.</p>
          <p>But if you are starting tonight, start with these five.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 1:1</h3>
        <VerseQuote text="In the beginning God created the heaven and the earth." reference="Genesis 1:1" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the first sentence in the entire Bible, and it answers the biggest question first.</p>
          <p>Not how, not why, but who.</p>
          <p>
            God is already there before the sentence even starts. He is not explained or
            introduced. He simply is, and He acts.
          </p>
          <p>
            Everything you will ever read about Him afterward, His love, His law, His Son, rests on
            this one line being true.
          </p>
          <p>If you doubt everything else some day, come back and start here again.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 1:3</h3>
        <VerseQuote text="And God said, Let there be light: and there was light." reference="Genesis 1:3" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ten words, and light exists that did not exist a moment before.</p>
          <p>No tools. No raw material. No wait between the command and the result.</p>
          <p>
            This is the verse to remember when a situation in your life looks completely dark and
            you cannot picture how it changes.
          </p>
          <p>
            The same God who spoke light into total darkness has never lost the ability to do it
            again.
          </p>
          <p>He does not need you to see the plan. He only needs to speak.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 1:26 and 27</h3>
        <VerseQuote
          text="And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth. So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the only creature in the entire chapter that God describes as made in His image.</p>
          <p>Not the stars. Not the animals. You.</p>
          <p>
            The verse repeats the word created three times in one breath, like it wants to make sure
            you do not miss it.
          </p>
          <p>And it says it plainly of male and female both, equally, together.</p>
          <p>This is the verse to memorize on the days you forget your own worth.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 1:31</h3>
        <VerseQuote
          text="And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
          reference="Genesis 1:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Six times earlier in the chapter, God looked at His work and called it good.</p>
          <p>This time, at the very end, He calls the whole finished thing very good.</p>
          <p>That includes the part of creation that just failed a test or is walking through a hard week. You.</p>
          <p>
            God&apos;s verdict on His finished work came before sin ever entered the story, and it
            still stands as the original word over your life.
          </p>
          <p>Let that verse sit with you longer than one read.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. John 1:1 through 3</h3>
        <VerseQuote
          text="In the beginning was the Word, and the Word was with God, and the Word was God. The same was in the beginning with God. All things were made by him; and without him was not any thing made that was made."
          reference="John 1:1 through 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            John opens his gospel with the exact same four words that open Genesis. In the
            beginning.
          </p>
          <p>That is not an accident. John wants you to hear the echo.</p>
          <p>
            He is telling you plainly that the Word who was with God and was God is the very one
            through whom Genesis 1 actually happened.
          </p>
          <p>
            Every time God said, Let there be, in Genesis 1, John says that command came through
            Jesus.
          </p>
          <p>
            The Creator of Genesis 1 and the Savior of the New Testament are not two different
            characters. They are the same God, telling the same story.
          </p>
        </div>
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
          Are the days in Genesis 1 literal twenty four hour days?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Faithful Christians read this differently, and it is not the test of true faith. The
          Hebrew word for day, yom, is the same word used for a normal day elsewhere in Scripture,
          which is why many read it literally. Others point to the structure of the chapter and
          read the days as an ordered framework rather than a strict timestamp. Either way, the
          whole chapter insists that God, not chance, is behind everything that exists.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why was light created before the sun in Genesis 1?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the mechanism, and it does not need to. Genesis 1 separates the
          existence of light on day one from the sun, moon, and stars that are given to govern and
          display that light starting on day four. The order is intentional, not a slip in the
          text. It also fits the pattern of the whole chapter, where God forms a space first and
          fills it later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does it mean that humans are made in the image of God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means every person carries something of God&apos;s own character stamped into who they
          are, whether or not they believe in Him. Genesis 1:27 says this of both male and female
          equally, and no other part of creation gets that description. It is the reason Scripture
          treats human life as sacred from the very first chapter. It also comes with a job
          attached, dominion, caring for creation the way God cares for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Genesis 1 say God rested on the seventh day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not technically. Genesis 1 ends with the sixth day and the summary that everything was
          very good. The seventh day of rest actually opens the next chapter, once the heavens and
          the earth were finished. Popular graphics often fold it into one seven day week, and the
          idea is connected, but the rest itself belongs to Genesis 2.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does God rest on the seventh day if He does not get tired?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God is not resting because He is worn out. He is finished, and He is setting a pattern.
          The rest marks the completion of a perfect work, not the recovery from an exhausting one.
          By resting, God builds a rhythm of work and rest into creation itself, one people would
          later follow in the Sabbath command. It is a gift He is modeling, not a need He has.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does &quot;and it was so&quot; mean in Genesis 1?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That short line shows up again and again in the chapter, right after God gives a command.
          It means the command was carried out immediately and exactly as spoken, with no delay and
          no gap between the word and the result. There is no struggle in the text, no resistance
          from creation, and no committee approving the plan. God speaks, and it is so, every single
          time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Genesis 1 conflict with science?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Christians hold different views here, and plenty of scientists are also believers. Some
          read the days literally and see the chapter as a direct scientific account. Others read
          the structure as theological, focused on who made everything and why, rather than a lab
          report on how long it took. What every faithful reading agrees on is that God is the
          source behind the universe, not blind chance. If this question matters to you, it is
          worth reading further on{" "}
          <ArticleLink href="/blog/christian-and-science">
            being a Christian and believing in science
          </ArticleLink>
          .
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who wrote Genesis 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis is traditionally credited to Moses, though the text itself does not name its
          author. Jewish and Christian tradition have held this view for thousands of years, and
          Jesus Himself referred to the writings of Moses. What matters most for this chapter is
          not who held the pen. It is what the words actually claim about the God who spoke the
          world into being.
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
            purpose. And He holds full authority over everything He made, including whatever you
            are walking through right now.
          </p>
          <p>
            That is a lot to carry from one chapter, and this overview only scratches the surface of
            what is actually in the text.
          </p>
          <p>
            The story does not stop here either. Turn the page and you find God placing that first
            man and woman in{" "}
            <ArticleLink href="/blog/garden-of-eden-four-rivers">
              a garden with four rivers running through it
            </ArticleLink>
            , and the story keeps going from there.
          </p>
          <p>So here is your one next step.</p>
          <p>Open Genesis 1 tonight and read it slowly, out loud if you can, start to finish.</p>
          <p>Let the God who spoke light into darkness speak into whatever you are carrying right now.</p>
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
