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
            <p>Hey. I am really glad you are here.</p>
            <p>Today is Day 1 of our journey through the Bible together, and the reading is Genesis 1 and 2.</p>
            <p>Before Abraham. Before Moses. Before David. Before Jesus.</p>
            <p>Before cities, war, pain and shame.</p>
            <p>The story starts here.</p>
            <p>At the beginning.</p>
            <p>
              <strong>There was God.</strong>
            </p>
            <p>
              So take a breath. Let the noise settle for a moment. We are going back to the first
              page of the Bible, and we are going to walk through it the way you would walk through
              a room you have never really looked at before. Slowly, in order, seeing what is
              actually there.
            </p>
            <p>
              These are the written notes for <strong>Bible in One Year Day 1</strong>. If you
              listened to today&apos;s teaching already, this is the same walk in writing. If you
              are reading first, this will carry you through it.
            </p>
            <p>Here is what Day 1 puts in front of you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>📖 Genesis 1, the six days, told as a pattern rather than a list</li>
            <li>🌬️ Genesis 2, the same creation from close up: dust, breath, a garden, a name</li>
            <li>❓ Why the account seems to happen twice, and why that is not a mistake</li>
            <li>🕊️ Why God rests when He cannot get tired</li>
            <li>💙 What being made in God&apos;s image actually says about you</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Everything the rest of the Bible says assumes what these two chapters
              settle first: God is good, the world He made is good, and you were made on
              purpose.</strong>
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌑 Before anything existed, God was already there
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis opens with eleven words that do not explain themselves.</p>
          <VerseQuote text="In the beginning God created the heaven and the earth." reference="Genesis 1:1" />
          <p>Stay here for a second.</p>
          <p>
            Nobody introduces God. Nobody says where He came from or what He was doing before this.
            He is not a character who walks onto the stage partway through the story. He simply is,
            and everything else begins because He speaks.
          </p>
          <p>Then look at what the world is like at the start.</p>
          <VerseQuote
            text="And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
            reference="Genesis 1:2"
          />
          <p>Formless. Empty. Dark. Deep water over everything.</p>
          <p>
            📌 <strong>But unfinished does not mean abandoned.</strong> The Spirit of God is already
            there, moving over the water, before the world has any shape at all.
          </p>
          <p>And then creation begins, and it begins quietly. With a voice.</p>
          <VerseQuote text="And God said, Let there be light: and there was light." reference="Genesis 1:3" />
          <p>God does not panic in the dark. He does not fight it. He speaks into it.</p>
          <p>
            And notice when the light arrives. The sun and the moon are not made until day four.
            Light is in the world before any of the things we normally credit for it. Genesis is
            telling you where light actually comes from.
          </p>
          <p>
            Maybe you know what it is like when your own life feels formless, or empty, or too dark
            to make out. The Bible starts here for a reason. Darkness is not too much for God.
            Confusion is not stronger than His voice.
          </p>
          <p>
            One more thing before we move on, because it shapes the whole chapter. Watch the rhythm
            in these verses: God speaks, it happens, God names it, God calls it good, evening and
            morning. Six times. Once you see that pattern you can read Genesis 1 the way it is
            written, as ordered creation rather than a pile of facts, and the breaks in the pattern
            start to stand out. Day six breaks it. Day seven breaks it completely.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌊 He makes room before He fills it
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Days two and three are God making space.</p>
          <p>
            The waters separate. Sky opens above, seas gather below, and dry ground comes up out of
            the water. Then the ground starts to grow: grass, herbs, fruit trees, each carrying seed
            inside itself.
          </p>
          <p>This is not random motion. Watch the pattern.</p>
          <p>
            📌 <strong>God prepares the world before He fills it.</strong> Sky first, then birds.
            Seas first, then fish. Land and plants first, then animals and people. Nothing arrives
            anywhere that has not already been made ready for it.
          </p>
          <p>
            And that first growing thing is a seed. Most of what God grows starts smaller than we
            expect it to. A seed is the easiest thing in the world to overlook, and inside it is
            next year&apos;s fruit and the generation after that.
          </p>
          <p>
            There is an old way of reading these six days that helps here. The first three days
            make spaces that are empty: light and dark, sky and sea, dry land. The next three days
            fill those same spaces in the same order: sun and moon in the light, birds and fish in
            sky and sea, animals and people on the land. Day one is filled by day four, day two by
            day five, day three by day six.
          </p>
          <p>
            📌 <strong>Genesis 1 is not a scramble. It is a house being built and then furnished,
            room by room.</strong>
          </p>
          <p>
            That matters for how you read the argument people have about these days. Whatever you
            conclude about their length, the chapter is clearly arranged to show order and purpose,
            not to be read like a lab report. Hold your view honestly, and hold it lightly enough to
            keep reading.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ☀️ Lights in the sky, and a quiet correction
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            On day four the sky fills with lights, and they are given jobs: to divide day from
            night, and to mark signs, seasons, days and years. Time becomes something you can count.
          </p>
          <p>
            Now, that would have landed differently for the first people who heard it. In the world
            around Israel, the sun and the moon were gods. Whole nations were built on that.
          </p>
          <p>
            📌 <strong>Genesis does not argue with them. It just files the sun and moon under
            things God made and hung up.</strong> They are not gods. They are lamps in His sky,
            doing the work He gave them.
          </p>
          <p>
            Then the waters swarm, the sky fills with wings, and the land starts moving with
            creatures of every kind. The silence of that empty, dark world at the start of the
            chapter is completely gone now. There is movement, sound, breath and rhythm.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          👤 The moment the whole chapter has been building toward
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Everything so far has been spoken into place. Then God says something different. Let us
            make man in our image, after our likeness.
          </p>
          <VerseQuote
            text="So God created man in his own image, in the image of God created he him; male and female created he them."
            reference="Genesis 1:27"
          />
          <p>Read that slowly, because it is about you.</p>
          <p>
            📌 <strong>Human beings are not accidents in this story. You are not an accident.</strong>
          </p>
          <p>
            Before anyone measures your success, your looks, your strength, your usefulness or your
            past, Genesis has already settled where human worth comes from. It comes from God, and
            it is handed out before you have done a single thing.
          </p>
          <p>
            Male and female, both in His image. Both carrying that dignity. Both blessed. Both given
            the same job: to fill the earth and take care of it.
          </p>
          <p>
            That job gets called dominion, and the word has been misused for centuries. It does not
            mean use it up. It means look after it. Humanity is put here to represent God&apos;s
            care inside God&apos;s world, the way a good gardener represents the one who planted it.
          </p>
          <p>
            It is worth sitting with how unusual that was. The people who first heard Genesis lived
            among nations where the king was the image of the god, the one man who carried the
            divine likeness. Genesis hands that status to everybody. The farmer, the servant, the
            mother, the child.
          </p>
          <p>
            📌 <strong>Whatever the world decides you are worth, chapter one has already ruled on
            it, and it ruled before you were born.</strong>
          </p>
          <p>
            And notice how God speaks here. Everywhere else in the chapter it is &quot;let there
            be.&quot; Here it is &quot;let us make man in our image.&quot; The pattern breaks for
            you. Christians have long read that &quot;us&quot; as the earliest hint of God as
            Father, Son and Spirit, and even if you set that question aside, the change of tone is
            impossible to miss. Making people is not the same kind of act as making seas.
          </p>
          <p>Then the chapter ends with God looking over all of it.</p>
          <VerseQuote
            text="And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
            reference="Genesis 1:31"
          />
          <p>Not good enough. Not acceptable. Very good.</p>
          <p>
            Before sin breaks anything, the world is blessed, ordered, alive and full of purpose.
            That is the design you have to see before you read what happens to it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🕊️ The first holy thing in the Bible is a day
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The story does not end with God rushing on to the next thing. It ends with rest.</p>
          <VerseQuote
            text="And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made. And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made."
            reference="Genesis 2:2-3"
          />
          <p>
            God is not tired. Nothing in Genesis suggests He needs a break. He rests because the
            work is finished, and He stops to enjoy it.
          </p>
          <p>
            📌 <strong>The first thing the Bible ever calls holy is not a building, a mountain or
            an object. It is a day.</strong> Time with God is set apart from the very first week.
          </p>
          <p>
            So if your life feels like non stop holding everything together, Genesis pushes back
            gently, on page one. You were not built to carry it all. Stopping is not laziness. Rest
            is trust, and it was built into the world before anything went wrong. If you want to
            take that further, <ArticleLink href="/blog/how-to-spend-1-hour-with-god">an hour with God</ArticleLink>{" "}
            is a good place to start.
          </p>
          <p>
            There is one more detail people miss here. Every other day in chapter 1 closes with
            &quot;and the evening and the morning were the third day,&quot; and so on. The seventh
            day has no such line. The account leaves that day open.
          </p>
          <p>
            Also notice what the man wakes up into. Human beings arrive on day six, and their first
            full day is God&apos;s day of rest. 📌 <strong>People did not start with work and earn
            a rest. They started in rest, and worked out of it.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌬️ Dust, and the breath of God
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            At Genesis 2:4 the camera moves. Chapter 1 gave you the wide shot, six days, the whole
            sky and sea. Chapter 2 walks you right up close to one man, one garden, one relationship.
          </p>
          <p>
            It is the same creation told twice, from two distances. That is not a contradiction, it
            is how the story is built. Chapter 1 is the map. Chapter 2 is the room you are standing
            in. If that question nags at you, the longer answer is in{" "}
            <ArticleLink href="/blog/genesis-2-explained">Genesis 2 explained</ArticleLink>.
          </p>
          <VerseQuote
            text="And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul."
            reference="Genesis 2:7"
          />
          <p>Two halves of that verse, and you need both.</p>
          <p>
            Formed from dust. That is humbling. We are not gods, and Genesis will not let us forget
            it. We are made of the same stuff as the ground under our feet.
          </p>
          <p>
            And then God leans in close enough to breathe. 📌 <strong>Humanity is dust that God
            breathed into.</strong> Fragile and valuable at the same time. Low and alive.
          </p>
          <p>
            Then God plants a garden and puts the man in it. Before there is any command, there is
            provision. Before there is any test, there is a home. Eden is beauty, safety and
            plenty, handed over before anything is asked.
          </p>
          <p>
            Two trees get named in the middle of that garden: the tree of life, and the tree of the
            knowledge of good and evil. Remember both. The first one comes back at the very end of
            the Bible, in the last chapter of Revelation, standing in the city of God with its
            leaves for the healing of the nations. The story closes near the tree it opened beside.
          </p>
          <p>
            Something else changes in chapter 2 that is easy to read straight past. Chapter 1 calls
            Him God. From Genesis 2:4 on, He is the LORD God, the personal name. The God who spoke
            galaxies into place in chapter 1 is the same God kneeling in the dirt in chapter 2, and
            the writer wants you to feel the difference in distance.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌳 Work, freedom, and one boundary
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The garden is full. Rivers run out of it. Gold and onyx get named. The world near God is
            supplied and alive. And then two things happen that people usually get backwards.
          </p>
          <VerseQuote
            text="And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it. And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat: But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die."
            reference="Genesis 2:15-17"
          />
          <p>
            First, work. The man is given something to do before anything has gone wrong. Work is
            not the punishment. Work is part of the good world, and having something worth tending
            was always meant to be part of being human.
          </p>
          <p>
            Second, the order of the sentence. Freely eat of every tree, except one. 📌{" "}
            <strong>The yes comes before the no, and the yes is enormous.</strong>
          </p>
          <p>
            This is not a stingy God guarding a garden. It is a generous God with one real boundary
            in it, and the boundary is about trust. Will people receive life from God, or reach out
            and decide good and evil for themselves?
          </p>
          <p>
            Tomorrow that question gets answered, and not the way anyone wants. You can read where
            it goes in <ArticleLink href="/blog/genesis-3-explained">Genesis 3 explained</ArticleLink>.
          </p>
          <p>
            The rivers in this section get named too: Pison, Gihon, Hiddekel and Euphrates. Two of
            those last names are still on maps today, which is part of why Eden reads like a place
            and not a fairy tale. If that detail interests you, there is a whole study on{" "}
            <ArticleLink href="/blog/garden-of-eden-four-rivers">the four rivers of Eden</ArticleLink>.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🤝 The first thing God calls not good
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven times in chapter 1, God looks at what He made and calls it good. Then, for the
            first time, something is not.
          </p>
          <VerseQuote
            text="And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him."
            reference="Genesis 2:18"
          />
          <p>Not sin. Not rebellion. Nothing has gone wrong yet.</p>
          <p>
            📌 <strong>The first thing in the Bible called not good is a person being alone.</strong>
          </p>
          <p>
            The man is surrounded by living creatures. He names every one of them. And not one of
            them can meet him face to face, which is exactly the point the naming is making.
          </p>
          <p>
            So God puts him into a deep sleep and makes the woman, and when the man wakes up and
            sees her, the first human words in Scripture come out as poetry. This is now bone of my
            bones, and flesh of my flesh. That is not a legal statement. That is wonder.
          </p>
          <p>And then the chapter closes with a line that is almost hard to picture now.</p>
          <VerseQuote
            text="And they were both naked, the man and his wife, and were not ashamed."
            reference="Genesis 2:25"
          />
          <p>No hiding. No covering. No performing. Fully known and completely safe with it.</p>
          <p>Before shame entered the story, there was peace.</p>
          <p>
            Between those two moments sits the line Jesus quotes when people ask Him about
            marriage: a man leaves his father and his mother, and cleaves unto his wife, and they
            are one flesh. It is written into the story here, at the beginning, before any law is
            given and before anything goes wrong.
          </p>
          <p>
            And hold on to that last verse for tomorrow, because it is the exact thing that breaks
            first. Not the garden. Not the work. The being unafraid in front of God and each other.
            One chapter later they are sewing leaves together and hiding in the trees.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📅 How to actually read Day 1
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If today is your first day of reading the Bible in a year, a word about how to do this
            so you are still here in March.
          </p>
          <p>
            <strong>Read the chapters first, notes second.</strong> Genesis 1 and 2 take about
            eight minutes. Let the text hit you before anyone explains it, including me.
          </p>
          <p>
            <strong>Do not chase every question today.</strong> Day 1 raises big ones: the length
            of the days, dinosaurs, where Cain&apos;s wife comes from, how this sits with science.
            Write them down and keep going. Most of them get clearer once you have more of the book
            in you, and{" "}
            <ArticleLink href="/blog/christian-and-science">faith and science</ArticleLink> has a
            fuller answer than I can give you in a paragraph here.
          </p>
          <p>
            <strong>Pick the same time tomorrow.</strong> The people who finish a year in the Bible
            are almost never the ones with the most time. They are the ones who made it boringly
            predictable: same chair, same ten minutes, same cup of coffee.
          </p>
          <p>
            <strong>Miss a day without quitting.</strong> You will miss days. A plan is not a
            streak you can break, it is a road you get back on. Missing Tuesday costs you nothing
            if you open it again on Wednesday.
          </p>
          <p>
            📌 <strong>The goal was never to finish the Bible. The goal is to know God, and
            finishing is just what happens along the way.</strong>
          </p>
          <p>
            If you want a fuller method for reading well, not just often,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink>{" "}
            walks through it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔑 Where Day 1 leaves you
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>So this is where the Bible begins.</p>
          <p>Not with human achievement. Not with human failure. Not with a problem we have to solve.</p>
          <p>
            It begins with God creating, speaking, ordering, filling, blessing, resting, forming,
            breathing, planting, providing, and making room for relationship.
          </p>
          <p>
            That matters, because the rest of this book is going to show you what happens when that
            good world breaks, and how far God goes to get it back. But before the fall, before the
            hiding and the violence and the exile and the rescue, you need to have seen the design.
          </p>
          <p>
            You were made by God. You were made in God&apos;s image. You were made for life with
            Him.
          </p>
          <p>
            And if you carry nothing else out of Day 1, carry this: God is not afraid of darkness,
            emptiness or disorder. He knows how to speak light into places that feel impossible.
          </p>
          <p>
            Tomorrow we step into Genesis 3 and 4. The peace of Eden gets tested, trust breaks,
            shame walks in. And even there, God does not disappear.
          </p>
          <p>For now, rest in the beginning.</p>
          <p>The world was made good.</p>
          <p>
            <strong>And you were made on purpose.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Bible in One Year Day 1 reading?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 1 and Genesis 2: the six days of creation, the seventh day of rest, and the closer
          account of the man, the garden and the woman.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Genesis tell creation twice?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Chapter 1 is the wide view of the whole world over six days. Chapter 2 walks in close and
          slows down on one man, one garden and one relationship. Same creation, told from two
          distances, which is why the order of the telling is different.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to be made in the image of God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means your worth is given, not earned, and that you are here to represent God&apos;s
          care inside His world. Genesis 1:27 gives it to men and women equally, before either has
          achieved anything.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the days of creation 24 hours long?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sincere Christians land in different places here. Some read the days as ordinary days,
          some as long ages, some as a deliberate framework showing order rather than a clock. The
          text says evening and morning and does not settle the argument, so hold your view
          honestly and hold it kindly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God rest if He does not get tired?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He stops because the work is finished, not because He is worn out, and He blesses that day
          and sets it apart. Rest is presented as something good and holy from the start, not as a
          reward for exhaustion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What comes after Day 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Day 2 is Genesis 3 and 4: the serpent, the first sin, the curses, and the first murder.
          The notes for those chapters are in{" "}
          <ArticleLink href="/blog/genesis-3-explained">Genesis 3 explained</ArticleLink> and{" "}
          <ArticleLink href="/blog/genesis-4-explained">Genesis 4 explained</ArticleLink>.
        </p>
      </section>
    </BlogPostShell>
  );
}
