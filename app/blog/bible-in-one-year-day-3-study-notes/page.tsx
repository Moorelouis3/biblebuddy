import BlogPostShell from "@/components/blog/BlogPostShell";
import BlogVideoEmbed from "@/components/blog/BlogVideoEmbed";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";
import { getBibleYearDayYoutubeVideoId } from "@/lib/bibleYearDayYoutubeVideos";

export const metadata = buildBlogArticleMetadata("bible-in-one-year-day-3-study-notes", {
  title: "Bible in One Year Day 3 Study Notes: Genesis 5-7",
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

// From the registry, never hand typed (docs/BIBLE_YEAR_STUDY_NOTES_WRITER_AGENT.md).
const videoId = getBibleYearDayYoutubeVideoId(3);

export default function BibleInOneYearDayThreeStudyNotesPage() {
  return (
    <BlogPostShell
      slug="bible-in-one-year-day-3-study-notes"
      title={<>📖 Bible in One Year Day 3 Study Notes: Genesis 5-7</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Hey. Good to have you back.</p>
            <p>Day 3 does something the first two days did not do.</p>
            <p>It slows all the way down and hands you a list of names.</p>
            <p>Ten generations. Fathers and sons. How long each one lived.</p>
            <p>And at the end of almost every single life on that list, the same three words.</p>
            <p>
              <strong>And he died.</strong>
            </p>
            <p>
              Today is <strong>Day 3</strong> of Bible in One Year, and the reading is Genesis 5,
              6, and 7. A family tree, a world that goes wrong, and one man who spends years
              building a boat nobody else thinks he needs.
            </p>
            <p>
              These are the written notes for Bible in One Year Day 3. If you listened to
              today&apos;s teaching already, this is the same walk in writing. Take a breath.
              Let&apos;s go.
            </p>
            <p>Here is what Day 3 puts in front of you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>📜 A genealogy that is really a countdown, and one name that breaks the pattern</li>
            <li>👶 A father who names his son comfort, without knowing what that son will actually do</li>
            <li>💔 A world gone so wrong that it grieves God, and one man who finds grace inside it</li>
            <li>🚪 A boat built by hand, to exact measurements, over years, in front of watching neighbors</li>
            <li>🌊 The door that shuts, the rain that falls, and the man left standing when the water stops rising</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Before the flood ever came, God had already given the plan, already named
              the covenant, and already opened the door. Rescue was prepared before judgment
              arrived.</strong>
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📜 A list of names carrying the image of God
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before Genesis starts counting deaths, it reminds you of something it does not want
            you to forget while you read the rest of this chapter.
          </p>
          <VerseQuote
            text="This is the book of the generations of Adam. In the day that God created man, in the likeness of God made he him; Male and female created he them; and blessed them, and called their name Adam, in the day when they were created."
            reference="Genesis 5:1-2"
          />
          <p>
            📌 <strong>That is the frame around everything you are about to read.</strong> Every
            name on this list, however briefly Genesis mentions him, carries the image of God.
            These are not statistics. They are people.
          </p>
          <p>
            Then the list actually starts, and it sets a rhythm almost immediately. A man lives.
            He has sons and daughters. He dies. Then it happens again with the next name, and the
            next.
          </p>
          <p>
            It can feel like a section to skip past on your way to the flood. Do not skip it. The
            repeating sentence is the whole point.
          </p>
          <p>
            Back on Day 2, God told Adam that in the day he ate from the one forbidden tree, he
            would surely die. Genesis 5 is that sentence playing out across ten generations. The
            years are long. Some of these men live over nine hundred years. But the ending never
            changes.
          </p>
          <VerseQuote
            text="And all the days that Adam lived were nine hundred and thirty years: and he died."
            reference="Genesis 5:5"
          />
          <p>
            The first death recorded in the Bible belongs to the first man. Not a stranger. Not an
            enemy. Adam himself, the one who was there when the world was called very good, dies
            like everyone after him will.
          </p>
          <p>
            Read the list all the way through and you notice something else. These lifespans
            overlap. Adam is still alive when several of his descendants are born, generation
            stacked on generation, long before anyone reaches the funeral line at the end of their
            verse. This is not a distant, thinned out family tree. It is a crowded, overlapping
            household, all of it slowly walking toward the same three words.
          </p>
          <p>
            You come from a line of names like this too, even if nobody wrote yours down the way
            Genesis wrote down Adam&apos;s. Every family has its own list of lived and died. What
            this chapter is about to show you is that death spreading through a family tree is not
            the end of the story God is telling.
          </p>
        </div>
        {videoId ? (
          <BlogVideoEmbed
            videoId={videoId}
            title="Day 3: Noah Builds the Ark | Bible in One Year (Genesis 5-7)"
            description="Day 3 of the Bible in One Year: Genesis 5 through 7, the generations from Adam to Noah, the wickedness that fills the earth, and the start of the flood, explained in plain English."
            uploadDate="2026-08-30"
            caption="Prefer to listen? This is Day 3 of the Bible in One Year, the same walk through Genesis 5, 6, and 7."
          />
        ) : null}
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🕊️ The man who skipped the ending
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Down in the middle of that repeating rhythm, He lived, he had sons and daughters, he
            died, one name breaks the pattern completely.
          </p>
          <VerseQuote
            text="And Enoch walked with God: and he was not; for God took him."
            reference="Genesis 5:24"
          />
          <p>No death notice. No age at the end. Just a man who walked so closely with God that one day he simply was not there anymore.</p>
          <p>
            📌 <strong>In a chapter built almost entirely out of funerals, God plants one sentence
            saying death is not actually how this has to end.</strong>
          </p>
          <p>
            Notice the phrase itself too. Enoch walked with God. Hold onto that exact wording,
            because Genesis is about to use it again for someone else on this same list, and it
            is not an accident when it shows up twice.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          👶 A father names his son comfort
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The genealogy keeps moving through Methuselah, the longest lived man in the Bible, and
            down to a man named Lamech. Lamech has a son, and the name he gives him is not random.
          </p>
          <VerseQuote
            text="And he called his name Noah, saying, This same shall comfort us concerning our work and toil of our hands, because of the ground which the LORD hath cursed."
            reference="Genesis 5:29"
          />
          <p>
            A father looks out at a tired, cursed world and hopes his newborn son will be the
            relief. That hope is real. It is also too small for what it is hoping for. Lamech is
            thinking about easier ground to farm. God has something much larger in mind for this
            child, and Lamech has no idea yet what that will actually cost his son to carry.
          </p>
          <p>
            📌 <strong>Noah does not lift the curse from the ground. He is not the final comfort
            his father was hoping for. But he is the one God is about to use.</strong>
          </p>
          <p>
            And notice something about where this name lands. It is the very last name on a list
            of ten generations, and it becomes the very first name of the next story. The
            genealogy was not a detour on the way to the flood. It was walking you there, one
            generation at a time.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💔 Every intention of the human heart
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis 6 opens with people multiplying across the earth, and then it says something
            almost unbearable to read.
          </p>
          <VerseQuote
            text="And God saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually. And it repented the LORD that he had made man on the earth, and it grieved him at his heart. And the LORD said, I will destroy man whom I have created from the face of the earth; both man, and beast, and the creeping thing, and the fowls of the air; for it repenteth me that I have made them. But Noah found grace in the eyes of the LORD."
            reference="Genesis 6:5-8"
          />
          <p>
            Not some intentions. Not most of the time. Every imagination, only evil, continually.
            Genesis does not soften this, and it will not let you skim past it either.
          </p>
          <p>
            📌 <strong>Stop on that word grieved.</strong> This is not a distant God watching a
            broken planet from a safe height. This is a God who feels what has been done to the
            world He called very good back on Day 1, and it hurts Him at His heart.
          </p>
          <p>
            Think about the distance between those two moments. Genesis 1 ends with God looking
            over everything He made and calling it very good. A handful of chapters later, that
            same God is grieved by what human beings have done with it. The world did not stay the
            way it started, and this chapter is honest about how far it drifted.
          </p>
          <p>
            And then, at the end of the darkest paragraph in the Bible so far, come eight words
            that change everything about how you read the rest of the chapter. But Noah found
            grace in the eyes of the LORD.
          </p>
          <p>
            Not because Noah earned an exception. Genesis will tell you plenty about Noah&apos;s
            character in the next few verses, but the sentence itself is written as grace first,
            reasons after. Judgment is real in this story. So is a man standing outside its reach,
            found by God before he does anything to be found.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚪 Walking with God, and the measurements of a boat
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis tells you plainly what kind of man Noah was.</p>
          <VerseQuote
            text="These are the generations of Noah: Noah was a just man and perfect in his generations, and Noah walked with God."
            reference="Genesis 6:9"
          />
          <p>
            Walked with God. That is the exact same phrase used a few verses earlier for Enoch.
            Genesis is not telling you Noah was flawless. It is telling you he kept walking with
            God in a generation where every single imagination around him had gone the other way.
          </p>
          <p>
            📌 <strong>That is usually what faithfulness looks like. Not spectacular. Just
            continuing, when continuing has stopped making sense to everyone around you.</strong>
          </p>
          <p>
            Then God tells him exactly what is coming. The end of all flesh, He says, is come
            before Him, because the earth is filled with violence. This is not a vague sense that
            things are bad. God names it specifically, and then immediately tells Noah exactly
            what to build in response.
          </p>
          <p>
            The instructions are specific. Gopher wood. Rooms inside. Pitch within and without.
            Three hundred cubits long, fifty wide, thirty high. A window. A door in the side. Three
            levels. Genesis hands you a building plan here, because this is not a symbol or a
            legend. It is a boat, built by hand, over years, in front of watching neighbors, out of
            a kind of wood specific enough that God bothered to name it.
          </p>
          <p>
            📌 <strong>Notice how practical the rescue is.</strong> God does not simply promise to
            protect Noah and leave the details vague. He hands him measurements, materials, and a
            deadline built into the warning itself. Faith here does not look like waiting on a
            feeling. It looks like picking up tools.
          </p>
          <p>And buried inside those measurements is a promise.</p>
          <VerseQuote
            text="But with thee will I establish my covenant; and thou shalt come into the ark, thou, and thy sons, and thy wife, and thy sons' wives with thee. And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female."
            reference="Genesis 6:18-19"
          />
          <p>
            Judgment is coming. So is a covenant. God names the rescue in the same breath as the
            warning, before a single drop of rain has fallen.
          </p>
          <p>The chapter closes with the whole man summed up in one line.</p>
          <VerseQuote
            text="Thus did Noah; according to all that God commanded him, so did he."
            reference="Genesis 6:22"
          />
          <p>
            No recorded complaint. No recorded argument. Just years of exact, unglamorous
            obedience to a set of instructions that must have sounded strange to build a boat on
            dry land, far from any sea, for rain nobody around him had ever seen fall from the
            sky.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🐘 Come into the ark, and seven quiet days
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 7 opens with an invitation, and it is worth noticing the exact word God uses.</p>
          <VerseQuote
            text="And the LORD said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation."
            reference="Genesis 7:1"
          />
          <p>
            📌 <strong>Come. Not go.</strong> God is not sending Noah away from danger toward
            somewhere else. He is calling him toward safety where God Himself already is.
          </p>
          <p>
            Then come the loading instructions. Seven of every clean animal, one male and one
            female. Two of every animal that is not clean. Seven of every bird. Genesis is careful
            to tell you the ratios are not identical across every kind, which is one more reason
            this reads as an actual event Noah had to manage, not a tidy symbol.
          </p>
          <p>
            Noah, his wife, his three sons, and their wives go in with the animals. And then
            Genesis tells you something easy to miss entirely: seven days pass between the loading
            and the rain.
          </p>
          <p>
            Seven days, with the boat finished and full, and the sky still perfectly clear.
            Sometimes obedience is completely finished and nothing has happened yet. That must
            have been a very long week for a family sealed inside a boat everyone else in the
            area had watched them build for years, waiting on a promise no cloud in the sky was
            backing up yet.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌊 The Lord shut him in
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then it starts.</p>
          <p>
            The fountains of the great deep burst open, and the windows of heaven open above.
            Remember Genesis 1, where God separated the waters to make room for a world. Here
            those same waters come back together. This reads like creation being undone.
          </p>
          <p>And in the middle of the description of the rain starting, one small sentence carries enormous weight.</p>
          <VerseQuote
            text="And they that went in, went in male and female of all flesh, as God had commanded him: and the LORD shut him in."
            reference="Genesis 7:16"
          />
          <p>
            📌 <strong>Noah built the boat. God closed the door.</strong> Noah never had to hold
            that door shut himself against the water outside. The same God who gave him the plan
            finished the job.
          </p>
          <p>
            The water keeps rising after that, fifteen cubits above the highest hills anyone in
            that world knew, until the mountains themselves are covered. Genesis does not
            celebrate this. It reads like grief, the same grief God felt back in chapter 6, now
            playing out in full across everything that breathed.
          </p>
          <VerseQuote
            text="And every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark."
            reference="Genesis 7:23"
          />
          <p>
            Only Noah was left, and those who were with him in the ark. Judgment is completely
            real in this chapter. So is the boat God told one man to build, years before the first
            drop of rain ever fell. The waters keep the upper hand for a hundred and fifty days
            before the story turns, and that turn is where tomorrow&apos;s reading picks up.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔑 Where Day 3 leaves you
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>So that is Day 3. A list of deaths. A world that went wrong. And a man who spent years building something that must have looked ridiculous.</p>
          <p>
            But notice the shape of it. Before the flood ever came, God had already given the
            plan, already named the covenant, already opened the door. Rescue was prepared before
            judgment arrived. That is not an accident in this one story. That is how God works all
            the way through this book.
          </p>
          <p>
            📌 <strong>If today you feel like Enoch in a chapter full of endings, or like Noah
            building something nobody around you understands, Genesis has already seen both of
            those lives.</strong> God noticed the man who walked with Him when no one else did.
          </p>
          <p>
            If you want to go deeper into either chapter, the fuller studies are here:{" "}
            <ArticleLink href="/blog/genesis-5-explained">Genesis 5 explained</ArticleLink>,{" "}
            <ArticleLink href="/blog/genesis-6-explained">Genesis 6 explained</ArticleLink>, and{" "}
            <ArticleLink href="/blog/genesis-7-explained">Genesis 7 explained</ArticleLink>. And if
            you missed yesterday&apos;s reading, you can catch up on{" "}
            <ArticleLink href="/blog/bible-in-one-year-day-2-study-notes">
              Bible in One Year Day 2
            </ArticleLink>{" "}
            first.
          </p>
          <p>
            Tomorrow we step into Genesis 8, 9, and 10. The water goes down, the door opens, and
            God puts a rainbow in the sky.
          </p>
          <p>For now, the rain is falling.</p>
          <p>The door is shut.</p>
          <p>
            <strong>And God shut it.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Bible in One Year Day 3 reading?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 5, 6, and 7: the genealogy from Adam to Noah, the wickedness that fills the
          earth, God&apos;s instructions for building the ark, and the start of the flood.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Genesis list so many generations before the flood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The genealogy in Genesis 5 connects Adam to Noah through ten generations, and its
          repeating pattern, a man lived, had sons and daughters, and died, shows death spreading
          exactly the way God warned it would after Genesis 3. It also sets up Noah as the last
          name on that list and the first name of the flood story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Enoch, and why did he not die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Enoch was a descendant of Adam through Seth, seven generations before Noah. Genesis 5:24
          says he walked with God, and he was not, for God took him, which breaks the chapter&apos;s
          repeating pattern of death and is the only life in that list with no closing age or death
          notice.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long did it take Noah to build the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis does not give an exact number of years for the build itself. It does say Noah
          was five hundred years old when his sons were born (Genesis 5:32) and six hundred years
          old when the flood came (Genesis 7:6), so the command, the building, and the flood all
          fall somewhere inside that century.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How big was Noah&apos;s ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6:15 gives its size as three hundred cubits long, fifty cubits wide, and thirty
          cubits high. Using the common estimate that a cubit was roughly eighteen inches, that
          puts the ark at around four hundred fifty feet long, big enough to hold Noah&apos;s
          family and pairs of every kind of animal God told him to bring aboard.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What comes after Day 3 in the Bible in One Year?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Day 4 is Genesis 8 through 10: the flood waters receding, Noah&apos;s family leaving the
          ark, and God setting a rainbow in the sky as a sign of His covenant never to flood the
          whole earth again.
        </p>
      </section>
    </BlogPostShell>
  );
}
