import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-36-explained", {
  title: "Exodus 36 Explained: Too Much to Give",
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

export default function ExodusThirtySixExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-36-explained"
      title={<>📖 Exodus 36 Explained: Too Much to Give</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Moses asked for an offering in the last chapter. Nobody expected the problem that followed.</p>
            <p>
              <strong>Exodus 36 explained</strong> is the chapter where the shortage turns into a surplus. One
              chapter earlier, the real question was whether a people who had just melted their jewelry into an
              idol would give anything at all. This chapter answers that question so completely that Moses has
              to send out an order telling everyone to stop.
            </p>
            <p>Maybe you have never thought of a Bible chapter as having a plot twist, but this one does.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did Moses have to command the people to stop giving?</li>
            <li>❓ Why does this chapter repeat Exodus 26 almost word for word?</li>
            <li>❓ Why does the text name Bezaleel and Aholiab, then just keep calling the builder &quot;he&quot;?</li>
            <li>❓ What do the silver sockets by the veil and the brass sockets at the door actually mean?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 36 is the chapter where a command spoken long before the golden calf finally
              becomes a building, measured exactly the way it was first described.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the offering that had to be capped, the
              ten curtains cut to the exact size God named chapters ago, the tent and its coverings, the boards
              and bars that framed the whole structure, and the veil and doorway where the materials themselves
              quietly mark out how close you are allowed to stand.
            </p>
            <p>Read slowly. This chapter has almost no drama in it, and that is exactly the point.</p>
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
            <ArticleLink href="/blog/exodus-35-explained">Exodus 35</ArticleLink> ended with Moses naming two men
            to the whole congregation: Bezaleel, filled with the Spirit of God for every kind of skilled work, and
            Aholiab, gifted alongside him to teach others the same skills. Both appointments had already been
            settled on the mountain back in <ArticleLink href="/blog/exodus-31-explained">Exodus 31</ArticleLink>,
            before the golden calf ever happened. The people had just heard Moses relay a materials list God gave
            him privately long before, and had started bringing gold, silver, fine thread, and spun goats&apos;
            hair faster than anyone running the project expected.
          </p>
          <p>
            That is where Exodus 36 starts: the morning after the giving began, with craftsmen already at work and
            a pile of material still growing behind them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 36 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Too Much to Give (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the craftsmen actually at their benches.</p>
        </div>
        <VerseQuote
          text="Then wrought Bezaleel and Aholiab, and every wise hearted man, in whom the LORD put wisdom and understanding to know how to work all manner of work for the service of the sanctuary, according to all that the LORD had commanded."
          reference="Exodus 36:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Wrought</strong> is an old form of worked. Verse 3 adds a detail easy to miss: the people did
            not bring their gift once and walk away. They kept showing up with free offerings every morning while
            the work was already underway. Then the problem surfaces.
          </p>
        </div>
        <VerseQuote
          text="And they spake unto Moses, saying, The people bring much more than enough for the service of the work, which the LORD commanded to make."
          reference="Exodus 36:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The craftsmen are the ones who bring this to Moses, not Moses checking on them.</strong> The
            people building the thing had to stop and report that they could not use everything coming in. Moses
            answers with an order no other chapter in Exodus needs.
          </p>
        </div>
        <VerseQuote
          text="And Moses gave commandment, and they caused it to be proclaimed throughout the camp, saying, Let neither man nor woman make any more work for the offering of the sanctuary. So the people were restrained from bringing. For the stuff they had was sufficient for all the work to make it, and too much."
          reference="Exodus 36:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read what this is not.</strong> It is not God rejecting a gift the way He once questioned
            Cain&apos;s offering. It is not a leader hoarding more than a project needs. The camp gave so much that
            continuing to give would have meant waste, and Moses would rather stop good giving than let it become
            pointless giving.
          </p>
          <p>💡 This is the only place in the Bible where a crowd has to be told, in so many words, to stop giving.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Ten Curtains, Measured Exactly as Commanded (verses 8 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the material settled, the chapter turns to the actual building, starting with the innermost layer.</p>
        </div>
        <VerseQuote
          text="And every wise hearted man among them that wrought the work of the tabernacle made ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work made he them."
          reference="Exodus 36:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Compare that to what God told Moses alone on the mountain, long before any of this camp heard a word
            of it:
          </p>
        </div>
        <VerseQuote
          text="Moreover thou shalt make the tabernacle with ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work shalt thou make them."
          reference="Exodus 26:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The only real difference between those two verses is the tense.</strong> One says
            &quot;thou shalt make.&quot; The other says &quot;made he them.&quot; A command spoken in{" "}
            <ArticleLink href="/blog/exodus-26-explained">Exodus 26</ArticleLink> turns into a finished fact here,
            with the same cherubim pattern, the same four colors, and the same measurements down to the cubit.
          </p>
          <p>The gold fasteners that join the curtains into a single covering get their own verse.</p>
        </div>
        <VerseQuote
          text="And he made fifty taches of gold, and coupled the curtains one unto another with the taches: so it became one tabernacle."
          reference="Exodus 36:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Ten separate curtains, sewn by different hands from material given by hundreds of different people,
            end this verse as one tabernacle. The fasteners are small. What they finish is not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Outer Tent, the Coverings, and One Missing Line (verses 14 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A second, coarser layer goes over the first, built from goats&apos; hair rather than fine linen.</p>
        </div>
        <VerseQuote
          text="And he coupled five curtains by themselves, and six curtains by themselves."
          reference="Exodus 36:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Set this beside the original instruction, and one clause has quietly dropped out.</strong>
          </p>
        </div>
        <VerseQuote
          text="And thou shalt couple five curtains by themselves, and six curtains by themselves, and shalt double the sixth curtain in the forefront of the tabernacle."
          reference="Exodus 26:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Exodus 26 told Moses to fold the sixth curtain double at the front. Exodus 36 does not repeat that
            line. The text never explains the gap, and it is far more likely a detail the writer assumed than a
            step that was skipped, since the rest of the chapter matches its instructions this closely. It is a
            small reminder that this account, careful as it is, is not a word for word transcript of every clause
            in Exodus 25 through 30.
          </p>
          <p>The final covering over the whole tent is weatherproofing, not decoration.</p>
        </div>
        <VerseQuote
          text="And he made a covering for the tent of rams' skins dyed red, and a covering of badgers' skins above that."
          reference="Exodus 36:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Underneath the gold and the color sits something plain and practical: leather, meant to keep rain
            and sand off everything more beautiful underneath it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Boards and Bars: The Frame Holds Together (verses 20 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Under the curtains, the tabernacle needed a skeleton. Twenty boards go up on the south side, twenty on
            the north, six across the back, with two more bracing the corners.
          </p>
        </div>
        <VerseQuote
          text="And forty sockets of silver he made under the twenty boards; two sockets under one board for his two tenons, and two sockets under another board for his two tenons."
          reference="Exodus 36:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every board in the structure, wherever it stood, rested on silver, not directly on the desert ground.
            Bars of acacia wood ran through rings along the boards to lock the whole wall together, and then one
            last step covered the entire frame.
          </p>
        </div>
        <VerseQuote
          text="And he overlaid the boards with gold, and made their rings of gold to be places for the bars, and overlaid the bars with gold."
          reference="Exodus 36:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Nothing structural was left bare.</strong> Wood cut from a desert tree, standing on silver,
            wrapped entirely in gold. A visitor walking toward this tent would never see a single board, a single
            bar, or a single socket in its raw material.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Veil and the Door: Gold Inside, Brass at the Threshold (verses 35 to 38)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two curtains close out the chapter, and the materials chosen for each one are not interchangeable.
          </p>
        </div>
        <VerseQuote
          text="And he made a vail of blue, and purple, and scarlet, and fine twined linen: with cherubims made he it of cunning work. And he made thereunto four pillars of shittim wood, and overlaid them with gold: their hooks were of gold; and he cast for them four sockets of silver."
          reference="Exodus 36:35 and 36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That veil would hang between the holy place and the most holy place, the room holding the ark itself.
            Its pillars stand on silver, the same material under every board in the building. The outer door
            tells a different story.
          </p>
        </div>
        <VerseQuote
          text="And he made an hanging for the tabernacle door of blue, and purple, and scarlet, and fine twined linen, of needlework; And the five pillars of it with their hooks: and he overlaid their chapiters and their fillets with gold: but their five sockets were of brass."
          reference="Exodus 36:37 and 38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Gold still covers the visible parts of the outer doorway, but its sockets, the part
            actually touching the ground, are brass, not silver.</strong> That is the same metal used later for
            the altar and the laver standing in the open court. The nearer a piece stood to the ark, the more
            precious the material under it got. Nothing in the text states this as a rule, but the pattern across
            the whole structure is too consistent to be an accident.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. One Man&apos;s Hands for a Whole Camp&apos;s Gift (verse 1 compared to verses 8 to 38)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Something easy to miss happens in the grammar of this chapter. Verse 1 names Bezaleel, Aholiab, and
            every wise hearted man together. Across the thirty one verses from verse 8 to the end of the chapter,
            the builder named by the text keeps narrowing down to one word: he.
          </p>
          <p>
            📌 <strong>The text does not explain the switch, but it fits everything Exodus 35 already said about
            these two men.</strong> Bezaleel was named first and given credit as the one who could teach the
            work, not only do it. Verse after verse of &quot;he made&quot; most likely describes a crew working
            under one man&apos;s direction, with the account crediting the lead craftsman the way a finished
            building today still gets credited to one architect, even though dozens of hands built it.
          </p>
          <p>
            That single &quot;he&quot; stands for every woman who spun thread, every ruler who brought a stone,
            and every ordinary household that gave until Moses had to tell them to stop.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 36 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was it wrong for Moses to tell people to stop giving?</strong> Exodus 36:6 and 7 state the
            reason plainly: the material on hand was already sufficient, and more would have gone to waste. The
            chapter never treats this as a lack of faith or a limit on generosity. It treats it as good
            stewardship of an actual, finished project with real dimensions, not an open ended fund.
          </p>
          <p>
            <strong>Why does this chapter repeat Exodus 26 so closely instead of simply saying the tabernacle was
            built as commanded?</strong> The text does not explain its own method, but the effect is worth
            noticing. Stating the measurements again, almost clause for clause, lets a reader check the finished
            building against the original command without taking anyone&apos;s word for it. The repetition is the
            proof.
          </p>
          <p>
            <strong>Does Exodus 36 skipping the instruction to double the sixth curtain, found in Exodus 26:9,
            mean the tabernacle was not built exactly as commanded?</strong> The text gives no reason for the
            gap, and nothing later in Exodus or Numbers suggests the tent was ever assembled wrong. The simplest
            explanation is an assumed detail left out of a summary account, not a missed instruction, especially
            given how exactly every measurement around it matches.
          </p>
          <p>
            <strong>Is there a spiritual meaning behind silver sockets under the veil and brass sockets at the
            door?</strong> Scripture does not state one directly in Exodus 36. What is observable in the text is
            a consistent pattern: gold nearest the ark, silver under the boards and the inner veil, brass at the
            outer threshold and later at the altar and laver in the court. Many readers see a picture of
            increasing holiness the closer an object stood to God&apos;s presence, though Exodus itself leaves
            that reading as an inference from the materials, not a stated rule.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 36
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 36:5</h3>
        <VerseQuote
          text="And they spake unto Moses, saying, The people bring much more than enough for the service of the work, which the LORD commanded to make."
          reference="Exodus 36:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A problem almost no other chapter in the Bible records: generosity outrunning what a project can
          actually use.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 36:6 and 7</h3>
        <VerseQuote
          text="And Moses gave commandment, and they caused it to be proclaimed throughout the camp, saying, Let neither man nor woman make any more work for the offering of the sanctuary. So the people were restrained from bringing. For the stuff they had was sufficient for all the work to make it, and too much."
          reference="Exodus 36:6 and 7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same camp that had to be begged for gold back in the wilderness now has to be told to stop bringing
          it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 36:1</h3>
        <VerseQuote
          text="Then wrought Bezaleel and Aholiab, and every wise hearted man, in whom the LORD put wisdom and understanding to know how to work all manner of work for the service of the sanctuary, according to all that the LORD had commanded."
          reference="Exodus 36:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A plan announced many chapters earlier finally turns into real, ongoing work, done exactly as it was
          first commanded.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 36:13</h3>
        <VerseQuote
          text="And he made fifty taches of gold, and coupled the curtains one unto another with the taches: so it became one tabernacle."
          reference="Exodus 36:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Separate curtains, sewn by separate hands, become one single structure through fifty small gold clasps.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 36:35 and 36</h3>
        <VerseQuote
          text="And he made a vail of blue, and purple, and scarlet, and fine twined linen: with cherubims made he it of cunning work. And he made thereunto four pillars of shittim wood, and overlaid them with gold: their hooks were of gold; and he cast for them four sockets of silver."
          reference="Exodus 36:35 and 36"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The curtain that would one day separate the ark from everyone else, woven with the same skilled hands
          that gave willingly one chapter earlier.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 36
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 36 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 36 records the Israelites giving so much material for the tabernacle that Moses had to order
          them to stop, then walks through the actual construction of the tent: the inner curtains, the goats&apos;
          hair covering, the leather coverings, the gold covered boards and bars, and the veil and door hangings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses tell the Israelites to stop giving?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 36:5 to 7 says the craftsmen reported that the people had already brought more than enough
          material for the project, so Moses proclaimed throughout the camp that no one should bring any more.
          It was a practical decision about a finished list of materials, not a rejection of generosity.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Exodus 36 the only place in the Bible where people give too much?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the clearest example of a crowd being told to stop. Malachi 3:10 describes a related but
          different picture, God promising to pour out more blessing than a storehouse has room for, which is
          abundance flowing out rather than an offering flowing in that has to be capped.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 36 repeat the instructions from Exodus 26?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 26 recorded God&apos;s instructions to Moses alone on the mountain. Exodus 36 shows those same
          measurements carried out, almost clause for clause, as an actual building. The repetition lets the
          finished tabernacle be checked against the original command rather than simply asserting it matched.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;wrought&quot; mean in Exodus 36:1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is an older form of &quot;worked.&quot; Exodus 36:1 uses it to describe Bezaleel, Aholiab, and the other
          skilled craftsmen actively doing the construction work God had gifted them to do.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the text just say &quot;he&quot; instead of naming Bezaleel throughout the chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 36:1 and 2 name Bezaleel, Aholiab, and every wise hearted man together. From verse 8 on, the
          text narrates the building in the singular. The chapter does not explain the shift, but it reads
          naturally as the lead craftsman&apos;s work standing in for the whole crew he had been given to teach.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the sockets under the veil silver but the sockets at the door brass?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 36:36 gives the veil&apos;s pillars silver sockets, the same material under the tabernacle&apos;s boards.
          Exodus 36:38 gives the outer door&apos;s pillars brass sockets, the same metal later used for the altar and
          laver in the open court. The text does not explain the choice, but the pattern across the structure
          puts costlier material closer to the ark and plainer material at the outer edges.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Exodus 36 match Exodus 26 in every detail?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Almost entirely, but not perfectly. Exodus 26:9 instructs doubling the sixth goats&apos; hair curtain at the
          front of the tent, a line Exodus 36:16 does not repeat. Every measurement and material around it still
          matches exactly, so the gap reads as an assumed detail in a summary account rather than a step that was
          left undone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 36 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The veil built in Exodus 36:35, hung to keep ordinary people out of the most holy place, is the same
          kind of curtain Hebrews later says was torn open through Christ. Hebrews 10:19 and 20 describes
          believers now having boldness to enter the holiest &quot;through the veil, that is to say, his flesh,&quot;
          reading the barrier this chapter builds as a picture of exactly what the cross removed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the lesson of Exodus 36 for today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That real generosity has a shape, not just a feeling. The Israelites did not give until they ran out of
          gold. They gave until the actual need was met, and then they stopped, which the text treats as just as
          faithful as the giving itself.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 36 has almost no tension in it, and that is what makes it worth reading slowly.</p>
          <p>
            📌 <strong>Generosity has a finish line.</strong> Israel gave until the work was fully supplied, and
            Moses calling a stop to it was not a lesser kind of faith than the giving itself.
          </p>
          <p>
            📌 <strong>A command spoken years before still mattered word for word.</strong> Nothing God told
            Moses privately on the mountain got simplified, shortened, or improved on once the people actually
            built it.
          </p>
          <p>
            📌 <strong>Credit for a shared gift can rest on one set of hands.</strong> Bezaleel is named once, and
            then the chapter just says &quot;he,&quot; carrying the whole camp&apos;s gold, thread, and labor
            through one craftsman&apos;s work.
          </p>
          <p>
            You will probably never be told to stop giving to something. But Exodus 36 still asks whether your own
            giving has a real target, or whether it just continues out of habit long after the actual need has
            been met.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Pick one specific need you could actually meet this week, not a vague cause, and give toward it until
            it is done. Then stop, the way Exodus 36 did, and call that enough.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
