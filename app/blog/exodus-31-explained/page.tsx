import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-31-explained", {
  title: "Exodus 31 Explained: Bezaleel, the Sabbath Sign, and the Tables of Stone",
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

export default function ExodusThirtyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-31-explained"
      title={<>📖 Exodus 31 Explained: Bezaleel, the Sabbath Sign, and the Tables of Stone</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>God spends four chapters describing gold, blue thread, and acacia wood. This chapter finally names the man who has to build it.</p>
            <p>
              <strong>Exodus 31 explained</strong> is the hinge between blueprint and building. God calls a
              craftsman by name and fills him with His own Spirit for the job, repeats the command to keep
              the sabbath with a penalty attached that stops readers cold, and then hands Moses two stone
              tables written by God&apos;s own finger. Three verses later, in the very next chapter, Israel
              is already melting gold into a calf.
            </p>
            <p>Maybe you have assumed skill and spirituality are two different categories entirely.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the Bible say a craftsman was filled with the Spirit of God?</li>
            <li>❓ Why does the sabbath command show up again here, with a death penalty attached?</li>
            <li>❓ Who actually wrote on the tables of stone?</li>
            <li>❓ Why does this chapter end in peace while the next one opens in disaster?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 31 closes the entire tabernacle section of Exodus with three things God
              gives directly: a gifted man, a weekly sign, and a set of tables no human hand carved.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: Bezaleel called and filled by name,
              Aholiab and every wise hearted helper added alongside him, the sabbath renewed as a sign
              between God and Israel, and the two tables of testimony placed in Moses&apos; hands at the very
              top of the mountain.
            </p>
            <p>Eighteen verses, and every one of them is still standing on the mountain when the next chapter falls apart in the camp below.</p>
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
            <ArticleLink href="/blog/exodus-30-explained">Exodus 30</ArticleLink> closed out God&apos;s
            instructions for the tabernacle itself: the altar of incense, the half shekel ransom, the bronze
            laver, and two exact recipes, the holy anointing oil and the holy incense, that no one outside
            the tabernacle was ever allowed to copy. By the end of that chapter, Moses had heard every
            specification God intended to give.
          </p>
          <p>
            Specifications are not a building. Somebody still had to actually cut the stones, cast the gold,
            and sew the linen Moses had only heard described in words. Exodus 31 is God&apos;s answer to the
            question those four chapters never addressed: who does the work, and how does an ordinary
            Israelite become capable of building something this precise?
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 31 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Bezaleel, Called by Name and Filled With the Spirit of God (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not open with instructions this time. He opens with a name.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, See, I have called by name Bezaleel the son of Uri, the son of Hur, of the tribe of Judah:"
          reference="Exodus 31:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Bezaleel is traced three generations back, son of Uri, son of Hur, from the tribe of Judah. A
            specific family line, not an anonymous volunteer picked at random out of the camp. What God says
            next about him is the detail worth slowing all the way down for.
          </p>
        </div>
        <VerseQuote
          text="And I have filled him with the spirit of God, in wisdom, and in understanding, and in knowledge, and in all manner of workmanship,"
          reference="Exodus 31:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the first time Scripture says a specific person was filled with the Spirit of
            God, and the task attached to it is skilled craftsmanship.</strong> Not prophecy, not leading an
            army, not speaking God&apos;s word to Pharaoh. Cutting stone and casting metal to a precise
            design.
          </p>
          <p>
            Four words describe what that filling produced in him: wisdom, understanding, knowledge, and
            workmanship. The last word matters as much as the first three. Whatever spiritual gifting Bezaleel
            received, it showed up as skill in his hands, not only insight in his head.
          </p>
        </div>
        <VerseQuote
          text="To devise cunning works, to work in gold, and in silver, and in brass, And in cutting of stones, to set them, and in carving of timber, to work in all manner of workmanship."
          reference="Exodus 31:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Gold, silver, brass, cut stone, carved wood. Every material named back in{" "}
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink> through Exodus 30 now has a
            named man God Himself equipped to shape it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Aholiab and Every Wise Hearted Helper (verses 6 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Bezaleel does not work alone. God names a second man in the same breath.</p>
        </div>
        <VerseQuote
          text="And I, behold, I have given with him Aholiab, the son of Ahisamach, of the tribe of Dan: and in the hearts of all that are wise hearted I have put wisdom, that they may make all that I have commanded thee;"
          reference="Exodus 31:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Bezaleel comes from Judah, the tribe that will one day produce David and ultimately
            Christ. Aholiab comes from Dan, one of the smaller, less prominent tribes.</strong> God does not
            pair His lead craftsman with someone from a second prestigious family. He pairs him with a man
            from Dan, and the text gives Aholiab no lesser mention for it.
          </p>
          <p>
            Notice too that the wisdom is not limited to these two names. &quot;All that are wise
            hearted&quot; already had wisdom God put there, which this verse now puts to work on a specific
            project. The gift did not arrive new. It was already present, waiting for its assignment.
          </p>
        </div>
        <VerseQuote
          text="The tabernacle of the congregation, and the ark of the testimony, and the mercy seat that is thereupon, and all the furniture of the tabernacle, And the table and his furniture, and the pure candlestick with all his furniture, and the altar of incense, And the altar of burnt offering with all his furniture, and the laver and his foot, And the cloths of service, and the holy garments for Aaron the priest, and the garments of his sons, to minister in the priest's office, And the anointing oil, and sweet incense for the holy place: according to all that I have commanded thee shall they do."
          reference="Exodus 31:7 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every single item from the last five chapters gets named again here in one breath: the ark, the
            mercy seat, the table, the candlestick, the two altars, the laver, the priestly garments, the
            oil, the incense. Nothing Moses heard described goes unbuilt, and nothing gets handed to an
            unequipped builder.
          </p>
          <p>
            ⚠️ <strong>God never tells Moses to go find skilled men. He tells Moses that He has already made
            them skilled.</strong> The ability comes before the assignment, not the other way around.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Sabbath Renewed as a Sign Between God and Israel (verses 12 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Right in the middle of construction instructions, God pulls the subject away from gold and
            craftsmen entirely.
          </p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Speak thou also unto the children of Israel, saying, Verily my sabbaths ye shall keep: for it is a sign between me and you throughout your generations; that ye may know that I am the LORD that doth sanctify you."
          reference="Exodus 31:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel had already kept the sabbath once, weeks earlier with the manna in{" "}
            <ArticleLink href="/blog/exodus-16-explained">Exodus 16</ArticleLink>, and heard it commanded at
            Sinai in <ArticleLink href="/blog/exodus-20-explained">Exodus 20</ArticleLink>. This is the third
            time the subject comes up, and the reason given here is new. It is not only rest. It is a sign,
            proof that the LORD is the one setting Israel apart as holy.
          </p>
          <p>Then the stakes rise sharply.</p>
        </div>
        <VerseQuote
          text="Ye shall keep the sabbath therefore; for it is holy unto you: every one that defileth it shall surely be put to death: for whosoever doeth any work therein, that soul shall be cut off from among his people."
          reference="Exodus 31:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is not a suggestion with a gentle consequence. Working on the sabbath is tied to
            death, the same weight already attached to approaching the altar unwashed back in{" "}
            <ArticleLink href="/blog/exodus-30-explained">Exodus 30</ArticleLink>.</strong> Rest, here, is
            treated with the same seriousness as atonement.
          </p>
        </div>
        <VerseQuote
          text="Six days may work be done; but in the seventh is the sabbath of rest, holy to the LORD: whosoever doeth any work in the sabbath day, he shall surely be put to death."
          reference="Exodus 31:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The command closes by tying the sabbath all the way back to the very beginning of Genesis.</p>
        </div>
        <VerseQuote
          text="It is a sign between me and the children of Israel for ever: for in six days the LORD made heaven and earth, and on the seventh day he rested, and was refreshed."
          reference="Exodus 31:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The sabbath is not a new idea invented at Sinai. It is creation&apos;s own rhythm, applied now
            as a permanent sign that marks Israel as God&apos;s people even while they are busy building Him
            a dwelling place.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Two Tables, Written by the Finger of God (verse 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One verse closes the chapter, and it closes an entire season on the mountain.</p>
        </div>
        <VerseQuote
          text="And he gave unto Moses, when he had made an end of communing with him upon mount Sinai, two tables of testimony, tables of stone, written with the finger of God."
          reference="Exodus 31:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Not dictated to Moses to write down. Written with the finger of God Himself.</strong>{" "}
            Everything from Exodus 20 through this verse, every law, every tabernacle measurement, every
            formula for oil and incense, Moses received over an extended stretch of time on the mountain.
            This single sentence marks the end of that stretch.
          </p>
          <p>
            This is also the last calm moment in the story for a while. The very next chapter opens with
            Moses still delaying to come down, and the people at the foot of the mountain already deciding
            they cannot wait for him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 31 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was the sabbath death penalty ever actually carried out?</strong> Exodus 31:14 states the
            command plainly, and Scripture records at least one case where it was enforced to the letter.
          </p>
        </div>
        <VerseQuote
          text="And while the children of Israel were in the wilderness, they found a man that gathered sticks upon the sabbath day."
          reference="Numbers 15:32"
        />
        <VerseQuote
          text="And the LORD said unto Moses, The man shall be surely put to death: all the congregation shall stone him with stones without the camp."
          reference="Numbers 15:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That episode in Numbers happened precisely because nobody had a prior ruling for what gathering
            sticks counted as. The warning in Exodus 31:14 was not decorative language. It was a real law
            Israel&apos;s leaders eventually had to apply to a real case.
          </p>
          <p>
            <strong>Why does the Bible describe skilled craftsmanship as being filled with the Spirit of
            God?</strong> The text never separates the two the way a modern reader might expect. Earlier in
            Genesis, Pharaoh said of Joseph that the Spirit of God was in him, but that was Pharaoh&apos;s own
            observation about wisdom, not God&apos;s own statement about a trade. Exodus 31:3 is God Himself
            naming workmanship, alongside wisdom, understanding, and knowledge, as something His Spirit
            fills a person to do. Skill that serves God&apos;s purposes is not treated here as a lesser,
            secular category sitting apart from spiritual gifting.
          </p>
          <p>
            <strong>Why place the sabbath command in the middle of building instructions, rather than at the
            start or end?</strong> The text does not explain its own placement, but the position fits the
            content. Bezaleel and Aholiab are about to begin months of demanding, detailed work. Right
            before that labor starts, God reminds Israel that even sacred construction stops every seventh
            day. The sabbath was never suspended for a worthy enough project.
          </p>
          <p>
            <strong>How is a stone tablet &quot;written with the finger of God&quot; different from the Ten
            Commandments Moses already received back in Exodus 20?</strong> Exodus 20 records God speaking
            the commandments aloud to the whole nation. Exodus 31:18 and the opening of the next chapter
            describe the same content, this time engraved permanently onto stone and placed directly into
            Moses&apos; hands. Spoken word and written record are not two different sets of commands, but the
            same law given in two forms.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 31
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 31:3</h3>
        <VerseQuote
          text="And I have filled him with the spirit of God, in wisdom, and in understanding, and in knowledge, and in all manner of workmanship,"
          reference="Exodus 31:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first time Scripture names a specific person filled with the Spirit of God, and the task is
          skilled craftsmanship, not prophecy or leadership. A reminder that God equips hands as readily as hearts.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 31:6</h3>
        <VerseQuote
          text="And I, behold, I have given with him Aholiab, the son of Ahisamach, of the tribe of Dan: and in the hearts of all that are wise hearted I have put wisdom, that they may make all that I have commanded thee;"
          reference="Exodus 31:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God pairs His lead craftsman from Judah with a second man from the small tribe of Dan, and extends
          the same gift of wisdom to every wise hearted worker in the camp, not only to the two names listed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 31:13</h3>
        <VerseQuote
          text="Speak thou also unto the children of Israel, saying, Verily my sabbaths ye shall keep: for it is a sign between me and you throughout your generations; that ye may know that I am the LORD that doth sanctify you."
          reference="Exodus 31:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The sabbath described not just as rest, but as a permanent sign proving that the LORD Himself sets
          Israel apart. Rest becomes evidence, not merely relief.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 31:17</h3>
        <VerseQuote
          text="It is a sign between me and the children of Israel for ever: for in six days the LORD made heaven and earth, and on the seventh day he rested, and was refreshed."
          reference="Exodus 31:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The sabbath traced all the way back to creation itself. A pattern God established before Israel
          existed, not a rule invented for the wilderness alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 31:18</h3>
        <VerseQuote
          text="And he gave unto Moses, when he had made an end of communing with him upon mount Sinai, two tables of testimony, tables of stone, written with the finger of God."
          reference="Exodus 31:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that closes the mountain scene. The last peaceful sentence before the camp below falls
          apart in the opening lines of the very next chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 31
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 31 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 31 names Bezaleel and Aholiab as the men God filled with His Spirit to build the tabernacle,
          repeats the command to keep the sabbath with a penalty of death for working on it, and ends with
          Moses receiving two stone tables written directly by the finger of God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Bezaleel in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A craftsman from the tribe of Judah, son of Uri and grandson of Hur, named in Exodus 31:2 as the man
          God called by name and filled with wisdom, understanding, knowledge, and skill to lead the building
          of the tabernacle and its furnishings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Aholiab?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A craftsman from the tribe of Dan, son of Ahisamach, named in Exodus 31:6 as the man God gave to
          work alongside Bezaleel. Scripture gives him no lesser standing for coming from a smaller, less
          prominent tribe than Judah.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to be filled with the Spirit of God in Exodus 31?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In this chapter it specifically means being equipped for skilled craftsmanship: wisdom,
          understanding, knowledge, and workmanship in gold, silver, brass, stone, and wood, according to
          Exodus 31:3 and 4. It is the earliest place Scripture uses this exact description of a person.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 31 repeat the sabbath command?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel had already observed the sabbath with the manna in Exodus 16 and heard it commanded at Sinai
          in Exodus 20. Exodus 31:13 gives it here as a sign that the LORD sanctifies Israel, placed
          deliberately right before months of demanding tabernacle construction were about to begin.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the death penalty for breaking the sabbath actually enforced?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Numbers 15:32 to 36 records a man stoned for gathering sticks on the sabbath, after the LORD
          told Moses plainly that the man should be put to death, the same penalty named in Exodus 31:14 and
          15.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What are the tables of testimony?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Two stone tablets mentioned in Exodus 31:18, described as written with the finger of God rather
          than by Moses&apos; own hand. They held the law God had already spoken aloud in Exodus 20, now set
          in permanent, written form.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 31 end right before the golden calf story?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter division falls at the exact moment Moses finishes receiving instructions on the
          mountain. The very next chapter opens with the people below, growing impatient at his delay,
          already asking Aaron to make them a god they can see.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is skill the same thing as a spiritual gift?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 31:3 does not separate the two. God names workmanship, the practical skill of cutting stone
          and casting metal, in the same breath as wisdom, understanding, and knowledge, all as things His
          Spirit filled Bezaleel to do for a holy purpose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God choose a man from Judah and a man from Dan to build the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 31:2 and 6 name the tribes without explaining the choice. Judah would later become the royal
          and messianic line, while Dan was one of the less prominent tribes. The text gives both men equal
          standing in the work, with no hierarchy drawn between where each one came from.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 31 is a quiet chapter. Read next to what follows it, the quiet is almost unbearable.</p>
          <p>
            📌 <strong>God fills hands, not only hearts.</strong> Bezaleel&apos;s Spirit filled skill shows up
            as workmanship you could hold, measure, and admire, not only as a feeling.
          </p>
          <p>
            📌 <strong>Rest was never suspended for a worthy enough project.</strong> Right before the
            largest building task Israel had ever undertaken, God renewed the sabbath, with the highest
            stakes the command had carried yet.
          </p>
          <p>
            📌 <strong>The last calm verse in this chapter sits right beside the first disaster in the
            next.</strong> Moses receives tables written by God&apos;s own finger while the people he leads
            are already losing patience at the bottom of the mountain.
          </p>
          <p>
            You may never cast gold or carve stone for a tabernacle. But whatever skill you actually have,
            Exodus 31 insists it can be the exact place God&apos;s Spirit shows up in your life.
          </p>
          <p>So here is your one next step.</p>
          <p>Name one skill you have treated as purely practical, and ask whether God might be filling it for a purpose bigger than you have given it credit for.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
