import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("bible-in-one-year-day-1-study-notes", {
  title: "Bible in One Year Day 1 Study Notes: Genesis 1-2",
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

export default function BibleInOneYearDayOneStudyNotesPage() {
  return (
    <BlogPostShell
      slug="bible-in-one-year-day-1-study-notes"
      title={<>📖 Bible in One Year Day 1 Study Notes: Genesis 1-2</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Today is Day 1 of Bible in One Year, and the reading is Genesis 1 and 2.</p>
            <p>
              Before Abraham. Before Moses. Before David. Before Jesus. Before cities, war, and
              shame ever enter the story, Scripture starts somewhere much quieter.
            </p>
            <p>At the beginning, there was God.</p>
            <p>
              <strong>These Bible in One Year Day 1 Study Notes</strong> walk through Genesis 1 and
              2 in order, the way today&apos;s reading and teaching laid it out: God speaking the
              world into shape over six days, resting on the seventh, then a closer look at how He
              formed the first man and woman and placed them in a garden called Eden.
            </p>
            <p>
              If you already listened to today&apos;s Bible in One Year teaching, this is the
              written version to go deeper with. If you are reading first, this will walk you
              through it before or after.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Genesis tell the creation story twice, once in chapter 1 and again in chapter 2?</li>
            <li>❓ What does it actually mean that you are made in the image of God?</li>
            <li>❓ Why does the Bible make such a big deal out of a day of rest?</li>
            <li>❓ And what is Genesis 2 saying about work, marriage, and being known, before anything ever goes wrong?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Everything in the rest of the Bible assumes what these two chapters
              establish first: God is good, the world He made is good, and you were made on
              purpose.</strong>
            </p>
            <p>
              Genesis 3 breaks that peace tomorrow. Today, before you get to the fall, you need to
              see the design.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why the Bible Starts Here
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis opens with no introduction and no explanation of where God came from. He is
            simply already there, before anything else exists.
          </p>
          <VerseQuote
            text="In the beginning God created the heaven and the earth."
            reference="Genesis 1:1"
          />
          <p>
            📌 <strong>God is not a character who walks onto the stage partway through the
            story.</strong> He is the reason there is a stage at all. Everything you will read for
            the next 364 days, every covenant, every failure, every rescue, sits on top of this one
            sentence.
          </p>
          <p>
            The very next verse tells you what the world looked like before God started shaping it.
          </p>
          <VerseQuote
            text="And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
            reference="Genesis 1:2"
          />
          <p>
            💡 Unformed and empty does not mean abandoned. God&apos;s Spirit is already hovering
            over the waters before the world has any shape at all. If your life ever feels
            formless, unfinished, or hard to make sense of, Day 1 is telling you something worth
            holding onto: darkness is never too much for God, and confusion is never stronger than
            His voice.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Bible in One Year Day 1 Explained: Genesis 1 and 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. God Speaks the World Into Order (Genesis 1:3 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Creation begins quietly, with a voice. God does not fight the darkness or panic in it.
            He speaks into it.
          </p>
        </div>
        <VerseQuote
          text="And God said, Let there be light: and there was light."
          reference="Genesis 1:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Light enters the story before the sun and moon are ever named.</strong>{" "}
            Genesis is telling you, on its very first page, that light does not ultimately come
            from created things. Light comes from God.
          </p>
          <p>
            From there, the world starts taking shape in a clear order. Waters are separated on day
            two. Sky opens above, seas gather below, and dry ground appears on day three.
          </p>
        </div>
        <VerseQuote
          text="And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good."
          reference="Genesis 1:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is not random motion. It is God making room for life before He ever fills it with
            life. Then, still on day three, the earth begins to grow.
          </p>
        </div>
        <VerseQuote
          text="And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so."
          reference="Genesis 1:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Most things God grows start smaller than you would expect. A seed is easy to
            overlook, but inside it is future provision, future fruit, and future generations. That
            pattern does not stop with plants.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Lights, Creatures, and a World Coming Alive (Genesis 1:14 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            On day four, the sky fills with lights. Days can now be counted. Seasons can be known.
            Years can be remembered.
          </p>
        </div>
        <VerseQuote
          text="And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:"
          reference="Genesis 1:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what the sun and moon are not called here.</strong> To the ancient
            world, the sun and moon were often treated like gods in their own right. Genesis
            quietly corrects that. They are not gods. They are lights, hung in God&apos;s sky,
            serving the purpose He assigns them.
          </p>
          <p>
            Then, on days five and six, the waters and the sky come alive. Birds lift into the air,
            sea creatures fill the deep, and land animals begin moving across the ground.
          </p>
        </div>
        <VerseQuote
          text="And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven."
          reference="Genesis 1:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The silence of the empty, formless world from verse two is gone now. There is movement,
            sound, breath, and rhythm everywhere you look.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Made in the Image of God (Genesis 1:26 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the moment the whole chapter has been building toward, and it reads differently
            than everything before it.
          </p>
        </div>
        <VerseQuote
          text="And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth."
          reference="Genesis 1:26"
        />
        <VerseQuote
          text="So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Human beings are not an accident, and you are not an accident.</strong>{" "}
            Nothing else in the creation account gets this kind of introduction. Light, land, and
            animals are simply spoken into being. Humanity gets deliberation first: &quot;Let us
            make man.&quot;
          </p>
          <p>
            Before anyone measures your success, your appearance, your usefulness, or your past,
            Genesis says human worth starts with God, and it starts here. Both male and female are
            made in God&apos;s image. Both carry that dignity equally. Both are blessed. Both are
            called into purpose.
          </p>
          <p>
            The dominion given in verse 26 is not a license to abuse creation. It is a
            responsibility to represent God&apos;s own care inside the world He made.
          </p>
        </div>
        <VerseQuote
          text="And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
          reference="Genesis 1:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Every single day up to now has been called good. Day six, once humanity exists, is
            called <strong>very good</strong>. Before sin ever breaks anything, the world Genesis
            describes is blessed, ordered, alive, and full of purpose.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Seventh Day: Why Rest Is Holy (Genesis 2:1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The story does not end with God rushing on to the next project. It ends with rest.</p>
        </div>
        <VerseQuote
          text="And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made."
          reference="Genesis 2:2"
        />
        <VerseQuote
          text="And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made."
          reference="Genesis 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 God rests not because He is tired, but because the work is finished. Creation has a
            built in rhythm from the very start: working and resting, forming and filling, speaking
            and delighting in what He made.
          </p>
          <p>
            📌 <strong>The first thing the Bible ever calls holy is not a building or an
            object.</strong> It is a day. Time set apart with God is holy from the very first pages
            of Scripture. If your life feels like nonstop striving, Genesis 2 is already gently
            pushing back before you even reach the rest of the Bible. You were never meant to hold
            everything together on your own. Rest here is not laziness. It is trust.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Closer Look: Dust, Breath, and a Garden Named Eden (Genesis 2:4 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis 2 is not a second, competing creation story. It is the same story, zoomed in.{" "}
            <ArticleLink href="/blog/genesis-1-explained">Genesis 1</ArticleLink> gave you the wide
            view of the whole universe taking shape. Genesis 2 brings the camera close enough to
            see dust, breath, a garden, and a relationship.
          </p>
        </div>
        <VerseQuote
          text="And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul."
          reference="Genesis 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice both halves of this verse.</strong> God forms the man from the dust of
            the ground, which is humbling. You are not a god. You are a creature, made from the
            same earth you walk on. But then God breathes into him the breath of life. Humanity is
            dust touched by God: fragile, but valuable; humble, but alive with breath that came from
            the Creator Himself.
          </p>
          <p>Before there is a single command, there is provision. Before there is a test, there is a home.</p>
        </div>
        <VerseQuote
          text="And out of the ground made the LORD God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil."
          reference="Genesis 2:9"
        />
        <VerseQuote
          text="And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it."
          reference="Genesis 2:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Work exists before sin ever enters the picture. Tending the garden is meaningful
            responsibility, part of the good world God made, not a punishment invented later.
          </p>
        </div>
        <VerseQuote
          text="And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat:"
          reference="Genesis 2:16"
        />
        <VerseQuote
          text="But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die."
          reference="Genesis 2:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Freedom comes before restriction, and the restriction is small compared to
            the freedom.</strong> One tree is off limits out of an entire garden freely given. This
            is not a stingy God rationing out permission. It is a generous God setting one real
            boundary, and the whole rest of the Bible ends up turning on how humanity answers the
            question underneath it: will you receive life from God, or try to define good and evil
            for yourself?
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Not Good to Be Alone: The First Marriage (Genesis 2:18 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            For the first time in the whole creation account, God says something is not good. Not
            sin. Not rebellion. Being alone.
          </p>
        </div>
        <VerseQuote
          text="And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him."
          reference="Genesis 2:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The man is surrounded by every kind of living creature God just made, yet none of them
            corresponds to him. None can meet him as a true partner. So God causes a deep sleep to
            fall over the man, and forms the woman from his own side.
          </p>
        </div>
        <VerseQuote
          text="And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man."
          reference="Genesis 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The first words ever recorded from a human being in Scripture are not a complaint or
            a request. They are poetry, spoken in wonder and recognition.
          </p>
        </div>
        <VerseQuote
          text="And they were both naked, the man and his wife, and were not ashamed."
          reference="Genesis 2:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Genesis 2 ends with a picture that is almost hard to imagine now.</strong>{" "}
            Fully known, fully seen, and fully at peace, with no hiding and nothing to fear. Before
            shame ever entered the story, there was peace. That peace is exactly what
            tomorrow&apos;s reading in{" "}
            <ArticleLink href="/blog/genesis-3-explained">Genesis 3</ArticleLink> begins to break.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Day 1 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does Genesis seem to tell the creation story twice?</strong> Genesis 1 gives
            a wide, ordered, day by day account of the whole universe being formed. Genesis 2 is not
            a rival account that contradicts it. It slows down and zooms in on day six, focusing
            specifically on the man, the woman, and the garden they were placed in. Reading them as
            two lenses on the same event, one wide and one close, fits the text better than reading
            them as competing stories.
          </p>
          <p>
            <strong>How long were the days of creation?</strong> Genesis 1 uses the ordinary Hebrew
            word for a day, marked by an evening and a morning, and many Christians read the days as
            a normal week for that reason. Other Christians, taking the same Scripture seriously,
            read the days as longer ages of time, noting that the sun and moon, which normally mark
            a day, are not created until day four. Genesis 1 itself does not settle the exact
            mechanism, and sincere believers hold different views on this question.
          </p>
          <p>
            <strong>Were Adam and Eve the first human beings?</strong> That is what Genesis presents
            them as: the first man and the first woman, formed directly by God rather than born of
            other humans. The text does not treat them as symbols standing in for humanity in
            general. It gives them a specific origin, a specific garden, and a specific fall in the
            very next chapter.
          </p>
          <p>
            <strong>What does it actually mean to be made in the image of God?</strong> Genesis 1:26
            and 27 do not fully define the phrase, but the context around it points to representing
            God&apos;s character and exercising His kind of care over creation, not a physical
            resemblance. It is also given to both male and female equally, which was a strikingly
            high view of human worth and dignity for the ancient world this was first written into.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Day 1
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 1:1</h3>
        <VerseQuote
          text="In the beginning God created the heaven and the earth."
          reference="Genesis 1:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Everything else in Scripture, every promise, every failure, every rescue, is built on top
          of this one opening sentence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 1:27</h3>
        <VerseQuote
          text="So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          You are not an accident. Before anyone else defines your worth, Genesis already has.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 1:31</h3>
        <VerseQuote
          text="And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
          reference="Genesis 1:31"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Everything before sin was called good, and once humanity is here, God calls it very good.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 2:7</h3>
        <VerseQuote
          text="And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul."
          reference="Genesis 2:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Dust and breath together. Humble, and yet alive with something that came straight from
          God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 2:25</h3>
        <VerseQuote
          text="And they were both naked, the man and his wife, and were not ashamed."
          reference="Genesis 2:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Before shame ever entered the story, there was peace. That is the world Genesis 3 is about
          to disturb.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Bible in One Year Day 1
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Bible in One Year Day 1 reading?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Day 1 covers Genesis 1 and 2, the account of God creating the world in six days, resting
          on the seventh, and forming the first man and woman in the garden of Eden.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to be made in the image of God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 1:26 and 27 describe humanity as made in God&apos;s image and likeness, given
          responsibility to represent His care over the rest of creation. It points to dignity and
          purpose that belongs to every human being, not a physical resemblance to God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Genesis 2 seem to describe creation again?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 1 tells the story from a wide angle, covering all six days in order. Genesis 2
          zooms in specifically on day six, giving a closer look at how the man and woman were
          formed and placed in Eden. It is the same event told from two different distances, not two
          different events.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were Adam and Eve the first humans?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis presents them as exactly that: the first man and the first woman, formed directly
          by God rather than born from other people, with their own specific place in the story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis say about the length of the creation days?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 1 describes each day with an evening and a morning, which some Christians read as
          a normal week. Others read the days as longer periods, pointing out that the sun and moon
          are not created until day four. Genesis itself does not settle the exact mechanism, and
          Christians who take Scripture seriously land in different places on this question.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God rest on the seventh day if He does not get tired?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 2:2 and 3 present the rest as a mark of completion, not exhaustion. God&apos;s work
          was finished, and He set that seventh day apart as holy, establishing a rhythm of work and
          rest that runs through the rest of Scripture.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God only give Adam and Eve one restriction?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 2:16 and 17 show freedom given first, an entire garden of trees to eat from
          freely, with one tree set apart. The single boundary against a whole garden of freedom
          shows a generous God with one real test of trust, not a controlling one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens after Day 1 in Bible in One Year?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Day 2 moves into Genesis 3 and 4, where the peace of Eden is tested, trust breaks, and
          shame enters the story for the first time. The design you just read about in Day 1 is what
          makes the fall in Day 2 so costly.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is where the Bible begins, and it does not begin with a problem to solve.</p>
          <p>
            📌 <strong>You were made by God, made in His image, and made for life with Him.</strong>{" "}
            Not an accident, not an afterthought, and not a mistake.
          </p>
          <p>
            📌 <strong>Rest is not laziness. It is part of the design.</strong> The first thing the
            Bible ever calls holy is a day, not a building or an object.
          </p>
          <p>
            📌 <strong>Before shame ever entered the world, there was peace.</strong> Genesis 3
            tomorrow is going to test that peace. Genesis 1 and 2 today are what makes the loss worth
            grieving, and worth God going to such lengths to restore.
          </p>
          <p>
            If you carry nothing else out of Day 1, carry this: God is not afraid of darkness,
            emptiness, or disorder. He knows exactly how to speak light into places that feel
            impossible, including yours.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Before you move on to Day 2, take one quiet minute and let Genesis 1:27 be true about
            you specifically. Not in general. Specifically. You were made on purpose.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
