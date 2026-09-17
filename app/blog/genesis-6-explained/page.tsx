import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-6-explained", {
  title: "Genesis 6 Explained: Wickedness, Noah, and the Ark",
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

export default function GenesisSixExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-6-explained"
      title={<>📖 Genesis 6 Explained: Wickedness, Noah, and the Ark</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One man stays right side up while the whole world tips over.</p>
            <p>
              <strong>Genesis 6 explained</strong> is the hinge chapter of early Genesis. It opens
              with a strange, disputed few verses about &quot;sons of God&quot; and giants, moves
              into God&apos;s grief over a world gone completely dark, and ends with one family
              building a boat while everyone around them keeps living like nothing is coming.
            </p>
            <p>Maybe you have wondered if the world could really get bad enough for this.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Who were the &quot;sons of God&quot; in verse 2?</li>
            <li>❓ Were the giants in verse 4 real, and where did they come from?</li>
            <li>❓ What made Noah different from every other person alive?</li>
            <li>❓ Why did God build in years of warning before the flood ever came?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>God does not destroy the world on impulse. He grieves first, warns for
              decades, and saves one obedient family before judgment falls.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the puzzling opening
              verses, the heartbreak behind God&apos;s decision, Noah&apos;s quiet obedience, and
              the exact blueprint God hands him for the ark.
            </p>
            <p>This is the chapter where grace shows up before the flood does, not after.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 What Happened Just Before This Chapter
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/genesis-5-explained">Genesis 5</ArticleLink> traced ten
            generations from Adam to Noah, and every name on that list ended with the same two
            words: &quot;and he died.&quot; Only one man, Enoch, broke the pattern, because he{" "}
            <ArticleLink href="/blog/men-who-walked-with-god">walked with God</ArticleLink> and
            was taken instead of dying.
          </p>
          <p>
            That chapter closed on a tired father naming his newborn son Noah, hoping for comfort
            from a cursed, hard ground. Genesis 6 picks up generations later, and it turns out the
            comfort that son will bring has nothing to do with easier farming. It has to do with
            keeping the human race alive at all.
          </p>
          <p>
            📌 <strong>Genesis 5 showed death spreading through one family, one name at a time.
            Genesis 6 shows wickedness spreading through the whole earth at once.</strong> The
            genealogy was the slow build. This chapter is where it boils over.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 6 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Sons of God, Daughters of Men (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with population growth, and then a strange marriage pattern.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when men began to multiply on the face of the earth, and daughters were born unto them, That the sons of God saw the daughters of men that they were fair; and they took them wives of all which they chose."
          reference="Genesis 6:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;Sons of God&quot; is one of the most debated phrases in
            Genesis.</strong> Christians hold two main views, and honesty requires laying both out
            rather than picking one and pretending the question is closed.
          </p>
          <p>
            The first view reads &quot;sons of God&quot; as fallen angelic beings who took on
            human wives, pointing to other Old Testament passages where the same Hebrew phrase
            clearly means heavenly beings, and to Jude and 2 Peter, which describe angels who
            &quot;kept not their first estate&quot; being held for judgment. The second view reads
            &quot;sons of God&quot; as the godly line of Seth intermarrying with the ungodly line
            of Cain, blending the two families Genesis 4 and 5 had carefully kept separate,
            trading spiritual devotion for physical attraction alone.
          </p>
          <p>
            Both readings agree on what the verse is actually warning about: a boundary God cared
            about got erased. Whether that boundary was angelic and human, or godly and godless,
            the result in the next verses is the same, a world sliding fast toward total
            corruption.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Deadline on the Calendar (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right after that troubling marriage pattern, God sets a limit.</p>
        </div>
        <VerseQuote
          text="And the LORD said, My spirit shall not always strive with man, for that he also is flesh: yet his days shall be an hundred and twenty years."
          reference="Genesis 6:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Most readers take the hundred and twenty years as a countdown to the
            flood, not a new cap on the human lifespan.</strong> Genesis 5 already showed people
            living well past nine hundred years, and lifespans do not drop to 120 until many
            generations after the flood. Read as a countdown, this verse means Noah gets about
            120 years to build the ark and warn his neighbors before judgment arrives.
          </p>
          <p>
            💡 &quot;My spirit shall not always strive&quot; describes God&apos;s patience as
            active, not passive. He is not simply waiting for time to pass. He is working,
            pleading, and holding back judgment, and that effort has a limit.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Giants in the Earth (verse 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One of the strangest verses in the whole Bible follows immediately.</p>
        </div>
        <VerseQuote
          text="There were giants in the earth in those days; and also after that, when the sons of God came in unto the daughters of men, and they bare children to them, the same became mighty men which were of old, men of renown."
          reference="Genesis 6:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Hebrew word translated &quot;giants&quot; here is Nephilim, a name Numbers 13:33
            uses again centuries later to describe people the Israelite spies found terrifying in
            size. Genesis 6:4 does not say the Nephilim were created by the unions in verse 2. It
            says they were already there, and that the same kind of &quot;mighty men of renown&quot;
            kept appearing afterward too.
          </p>
          <p>
            ⚠️ <strong>Scripture never explains exactly what the Nephilim were.</strong> Any
            confident description of their size, origin, or fate beyond what these two verses and
            Numbers 13:33 state is speculation, not text. What the verse does make clear is the
            direction things were heading: renown and might, without any mention of righteousness.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. God&apos;s Grief Over the Human Heart (verses 5 and 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns from a strange scene on earth to an aching one in heaven.</p>
        </div>
        <VerseQuote
          text="And God saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually. And it repented the LORD that he had made man on the earth, and it grieved him at his heart."
          reference="Genesis 6:5 and 6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Only evil continually&quot; is total language. Not mostly evil, not
            evil sometimes. Every thought, all the time.</strong> This is the clearest picture in
            Genesis of how far sin had spread since{" "}
            <ArticleLink href="/blog/genesis-3-explained">the fall in Eden</ArticleLink>. One
            forbidden bite led here, generations later, to a heart that could no longer imagine
            good on its own.
          </p>
          <p>
            &quot;It repented the LORD&quot; and &quot;it grieved him at his heart&quot; are
            startling words to read about God. They do not mean God discovered something He did
            not already know, or that He made a mistake creating humanity. They mean His response
            to sin is not cold calculation. It carries real sorrow, the grief of a Father watching
            what He made turn against Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Judgment Announced, and One Exception (verses 7 and 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Grief moves to decision, and then to a single name that changes everything.</p>
        </div>
        <VerseQuote
          text="And the LORD said, I will destroy man whom I have created from the face of the earth; both man, and beast, and the creeping thing, and the fowls of the air; for it repenteth me that I have made them. But Noah found grace in the eyes of the LORD."
          reference="Genesis 6:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Ten words turn the whole chapter around: &quot;But Noah found grace in
            the eyes of the LORD.&quot;</strong> This is the first time the word &quot;grace&quot;
            appears anywhere in the Bible, and it shows up right in the middle of an announcement
            of judgment.
          </p>
          <p>
            Grace here does not mean Noah earned an exemption by being flawless on his own merit.
            It means God, in the middle of righteous anger at an entire world, still looked for
            and found someone to save. Judgment and rescue arrive in the same two verses, the same
            pattern already seen with Adam and Eve and with Cain.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Noah, Just and Perfect, Walking With God (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The text pauses to describe exactly who this man is.</p>
        </div>
        <VerseQuote
          text="These are the generations of Noah: Noah was a just man and perfect in his generations, and Noah walked with God. And Noah begat three sons, Shem, Ham, and Japheth."
          reference="Genesis 6:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Noah walked with God&quot; is the exact phrase Genesis 5 used about
            Enoch, and Scripture uses it about almost no one else.</strong> Enoch walked with God
            and was taken from death entirely. Noah walks with God and is instead carried through
            death and out the other side, in an ark built to survive the very judgment coming for
            everyone else.
          </p>
          <p>
            &quot;Perfect in his generations&quot; does not mean sinless. It means blameless
            compared to the generation around him, a man whose integrity stood out against a
            corrupted culture rather than a claim that Noah never failed. His later stumble after
            the flood, in the very next chapters of Genesis, confirms he was still a flawed man
            saved by grace, not a perfect one who earned rescue.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Earth Filled With Violence (verses 11 and 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The camera pulls back out to the whole earth again, and the picture is bleak.</p>
        </div>
        <VerseQuote
          text="The earth also was corrupt before God, and the earth was filled with violence. And God looked upon the earth, and, behold, it was corrupt; for all flesh had corrupted his way upon the earth."
          reference="Genesis 6:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Two words repeat here on purpose: corrupt and violence. &quot;Corrupt&quot; points
            back to the inward rot already described in verse 5. &quot;Violence&quot; shows what
            that rot produces outwardly, the same escalation already glimpsed in{" "}
            <ArticleLink href="/blog/genesis-4-explained">Lamech&apos;s boast about murder</ArticleLink>{" "}
            back in Genesis 4. One generation bragged about killing. By this chapter, violence has
            filled the whole earth.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          8. The Ark, Built to Exact Instructions (verses 13 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God speaks directly to Noah, and the plan He gives is specific, not vague.</p>
        </div>
        <VerseQuote
          text="And God said unto Noah, The end of all flesh is come before me; for the earth is filled with violence through them; and, behold, I will destroy them with the earth. Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch."
          reference="Genesis 6:13 and 14"
        />
        <VerseQuote
          text="And this is the fashion which thou shalt make it of: The length of the ark shall be three hundred cubits, the breadth of it fifty cubits, and the height of it thirty cubits. A window shalt thou make to the ark, and in a cubit shalt thou finish it above; and the door of the ark shalt thou set in the side thereof; with lower, second, and third stories shalt thou make it."
          reference="Genesis 6:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three hundred cubits by fifty cubits by thirty cubits works out to roughly
            450 feet long, 75 feet wide, and 45 feet tall, using the common 18 inch cubit.</strong>{" "}
            That is a massive vessel for its time, three stories tall, with a single door and
            enough room for the cargo God is about to describe.
          </p>
          <p>
            &quot;Gopher wood&quot; appears nowhere else in the Bible, and scholars are not
            certain exactly which wood it names, likely a type of resinous timber suited to
            waterproofing. What matters more than the species is the pitch, sealing the ark inside
            and out so nothing that floods the earth gets in.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          9. A Covenant Before the Flood Even Falls (verses 17 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God names the coming flood plainly, then immediately promises to preserve life through it.</p>
        </div>
        <VerseQuote
          text="And, behold, I, even I, do bring a flood of waters upon the earth, to destroy all flesh, wherein is the breath of life, from under heaven; and every thing that is in the earth shall die. But with thee will I establish my covenant; and thou shalt come into the ark, thou, and thy sons, and thy wife, and thy sons' wives with thee."
          reference="Genesis 6:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the first time the word &quot;covenant&quot; appears in the
            Bible.</strong> Before a single drop of rain falls, before the ark is even finished,
            God binds Himself to Noah&apos;s survival with a promise. Judgment is certain, but so is
            the rescue of everyone who gets in the ark.
          </p>
        </div>
        <VerseQuote
          text="And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female. Of fowls after their kind, and of cattle after their kind, of every creeping thing of the earth after his kind, two of every sort shall come unto thee, to keep them alive. And take thou unto thee of all food that is eaten, and thou shalt gather it to thee; and it shall be for food for thee, and for them."
          reference="Genesis 6:19 to 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 19 gives the general command, two of every sort. Genesis 7 later adds a more
            detailed instruction, seven pairs of every clean animal, but that refinement belongs
            to the next chapter, not this one. Here the picture is simple: an ark big enough, food
            stored enough, and every kind of living creature represented enough to start over.
          </p>
          <p>The chapter ends on a single line that says everything about Noah&apos;s character.</p>
        </div>
        <VerseQuote
          text="Thus did Noah; according to all that God commanded him, so did he."
          reference="Genesis 6:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>No recorded argument. No recorded excuse. Just obedience, matched exactly
            to what God commanded.</strong> Noah spends decades building a boat for rain
            no one has ever seen, in front of neighbors who have every reason in the world to
            think he has lost his mind. The text does not dwell on how that felt. It simply says
            he did it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 6 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Who exactly were the &quot;sons of God&quot;?</strong> The text itself does
            not settle this. The fallen angels view and the godly Sethite line view both have
            long histories among careful Bible readers, and both agree the deeper point is a
            boundary God set being crossed, whatever its exact nature. Certainty beyond that is
            opinion, not the text.
          </p>
          <p>
            <strong>Were the Nephilim literal giants?</strong> Genesis 6:4 and Numbers 13:33 both
            describe them as physically imposing, and most Christians read this straightforwardly.
            What the Bible does not give is a height, an origin story beyond what these verses
            state, or an explanation of how they relate to the flood that follows. Anything more
            specific than the text is guesswork.
          </p>
          <p>
            <strong>Does God regretting making man mean He is not all knowing?</strong> Most
            careful readers understand &quot;it repented the LORD&quot; as describing real grief
            expressed in human terms we can understand, not a literal change of mind from
            surprise. The same Bible that records this grief also describes God&apos;s plans as
            settled from the beginning. Scripture holds both truths without resolving the tension
            for us in a single verse.
          </p>
          <p>
            <strong>Was the flood really worldwide?</strong> The language in verses 7 and 17,
            destroying &quot;all flesh&quot; and everything &quot;under heaven,&quot; reads as
            total in scope, and many Christians take it as a literal global flood. Others read the
            same wording as describing a catastrophic regional flood covering the known world of
            that time, using language Scripture elsewhere uses for widespread events. This is a
            genuine point where believers differ, and Genesis 6 alone does not settle it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 6:5</h3>
        <VerseQuote
          text="And God saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually."
          reference="Genesis 6:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The starkest description of total human corruption anywhere in Genesis, the reason the
          flood becomes necessary at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 6:8</h3>
        <VerseQuote text="But Noah found grace in the eyes of the LORD." reference="Genesis 6:8" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first time the word grace appears in the Bible, arriving in the same breath as an
          announcement of judgment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 6:9</h3>
        <VerseQuote
          text="These are the generations of Noah: Noah was a just man and perfect in his generations, and Noah walked with God."
          reference="Genesis 6:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same rare description already given to Enoch in Genesis 5, marking Noah as one of
          only a handful of men in Scripture described this way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 6:18</h3>
        <VerseQuote
          text="But with thee will I establish my covenant; and thou shalt come into the ark, thou, and thy sons, and thy wife, and thy sons' wives with thee."
          reference="Genesis 6:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first covenant in the Bible, promised before the flood even begins, and the pattern
          for every covenant God makes afterward.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 6:22</h3>
        <VerseQuote
          text="Thus did Noah; according to all that God commanded him, so did he."
          reference="Genesis 6:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Complete obedience with no recorded objection, carried out over a project that likely
          took Noah close to a century to finish.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Genesis 6 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records how wicked the world became before the flood, God&apos;s grief over that
          wickedness, and His decision to save Noah&apos;s family and build an ark rather than destroy
          every living thing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were the sons of God in Genesis 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Christians hold two main views: fallen angelic beings who took human wives, or the
          godly line of Seth intermarrying with the ungodly line of Cain. The text itself does not
          state which is correct.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the giants in Genesis 6 real?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6:4 calls them Nephilim and describes them as mighty men of renown. Numbers
          13:33 later uses the same name for people the Israelite spies found physically
          intimidating. Scripture gives no further detail beyond these mentions.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God regret making mankind?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6:5 and 6 describe human wickedness as total, every thought only evil
          continually. God&apos;s grief is described in real, human terms, showing His response to sin
          is sorrow, not indifference.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Noah find grace?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6:8 and 9 say Noah walked with God and was just and blameless compared to his
          generation. Grace is not described as something Noah earned outright, but as God
          choosing to save him in the middle of judging everyone else.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How big was Noah&apos;s ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6:15 gives its dimensions as three hundred cubits long, fifty wide, and thirty
          tall, roughly 450 feet by 75 feet by 45 feet using an 18 inch cubit, with three stories
          inside.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is gopher wood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The exact species is uncertain. The word appears only in Genesis 6:14, and most scholars
          believe it names a resinous timber well suited to being sealed with pitch.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long did it take Noah to build the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6 does not give an exact number of years. Many readers connect the 120 years in
          verse 3 to the length of Noah&apos;s warning and building period, though the text does not
          say that explicitly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the first covenant in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6:18 records it, God&apos;s promise to Noah that he and his family would be kept
          alive through the flood in the ark, made before a single drop of rain had fallen.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Noah sinless?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Genesis 6:9 calls him just and perfect in his generations, meaning blameless
          compared to a corrupt culture, not without sin. His stumble after the flood in later
          chapters confirms he was a flawed man saved by grace.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the flood in Genesis 6 worldwide or local?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6 describes the coming destruction as total, covering all flesh under heaven.
          Christians differ on whether this describes a literal global flood or a catastrophic
          flood across the known world of that era, and this chapter alone does not resolve the
          question.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 6 is not really about a boat. It is about what God does when a world goes dark.</p>
          <p>
            📌 <strong>Judgment in this chapter is never cold.</strong> God grieves before He
            acts, and He warns for a lifetime before the flood ever comes.
          </p>
          <p>
            📌 <strong>Grace shows up in the middle of judgment, not after it.</strong> Noah found
            grace while the rest of the earth was already under sentence, the same pattern seen{" "}
            <ArticleLink href="/blog/who-was-adam">back in Eden</ArticleLink>.
          </p>
          <p>
            📌 <strong>Obedience does not need to understand everything first.</strong> Noah built
            a boat for rain he had never seen, on nothing but a word from God.
          </p>
          <p>
            You live in a world with its own version of Genesis 6:5, plenty of reasons to think
            wickedness has the final word.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask honestly whether you are building anything today on nothing but obedience, the
            way Noah did, before you can see any proof it will matter.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
