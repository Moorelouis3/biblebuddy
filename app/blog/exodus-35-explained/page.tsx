import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-35-explained", {
  title: "Exodus 35 Explained: The Offering for the Tabernacle Begins",
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

export default function ExodusThirtyFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-35-explained"
      title={<>📖 Exodus 35 Explained: The Offering for the Tabernacle Begins</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two chapters ago, Israel tore the gold off their own bodies to melt a calf. In this chapter, they tear the gold off their own bodies again, and this time nobody has to ask twice.</p>
            <p>
              <strong>Exodus 35 explained</strong> is the chapter where Moses comes down from his third trip up
              the mountain, his face still carrying the glow nobody could explain, and does something he has
              not done in a while. He gathers the whole congregation and gives them something to build.
            </p>
            <p>Maybe you remember the golden calf and the shining face, but skipped straight past what happens right after.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Moses repeat the sabbath law again, with one detail added that was never said before?</li>
            <li>❓ Why does God ask for the exact same materials He already asked for back in Exodus 25?</li>
            <li>❓ Why does the text go out of its way to name women&apos;s skill at spinning?</li>
            <li>❓ Why did the people have to be told to stop giving, instead of being begged to start?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 35 is the chapter where the same gold that built an idol gets handed over again,
              this time for the right reason, by people nobody forced.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the sabbath renewed with a new detail,
              Moses repeating word for word what God had told him alone on the mountain, the people&apos;s
              offering pouring in faster than anyone expected, the specific mention of women&apos;s needlework,
              and Bezaleel and Aholiab named publicly for a job God had already given them before the golden
              calf ever happened.
            </p>
            <p>Read slowly. This chapter is quiet, but it answers a question Exodus 32 never fully settled.</p>
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
            <ArticleLink href="/blog/exodus-34-explained">Exodus 34</ArticleLink> ended with Moses coming down
            the mountain a third time, carrying tables of stone he had to cut himself, a covenant renewed, and
            a face that shone from being near God without his own knowledge. He had started wearing a veil,
            taking it off only when he spoke with the LORD or delivered God&apos;s words to the people, then
            covering his face again until the next time.
          </p>
          <p>
            That scene closed Exodus 34 on something personal, one man&apos;s changed face. Exodus 35 opens on
            something communal. Moses gathers the whole congregation, the same word used for the crowd that
            once surrounded Aaron demanding a calf in{" "}
            <ArticleLink href="/blog/exodus-32-explained">Exodus 32</ArticleLink>. This time what he hands them
            is not a crisis. It is a plan God had already given him, back before the calf, that the camp never
            got the chance to hear.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 35 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Sabbath, Repeated With One New Detail (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens with a law the camp has already heard, and then adds something it has not.</p>
        </div>
        <VerseQuote
          text="And Moses gathered all the congregation of the children of Israel together, and said unto them, These are the words which the LORD hath commanded, that ye should do them."
          reference="Exodus 35:1"
        />
        <VerseQuote
          text="Six days shall work be done, but on the seventh day there shall be to you an holy day, a sabbath of rest to the LORD: whosoever doeth work therein shall be put to death."
          reference="Exodus 35:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>None of this is new.</strong> The six and seven day pattern, and the death penalty for
            working on the sabbath, had already been given to Moses alone on the mountain in{" "}
            <ArticleLink href="/blog/exodus-31-explained">Exodus 31</ArticleLink>. What follows in the very
            next verse had not.
          </p>
        </div>
        <VerseQuote text="Ye shall kindle no fire throughout your habitations upon the sabbath day." reference="Exodus 35:3" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Not lighting a cooking fire or a hearth fire is a specific, practical detail no earlier sabbath
            command in Exodus had spelled out. Rest here is not just an idea. It reaches into the smallest
            daily task, keeping a home warm or a meal cooking, and says that counts as work too.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Moses Repeats, Almost Word for Word, What God Told Him Alone (verses 4 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The sabbath took three verses. The building project takes the rest of the chapter, starting with a
            request Moses had already heard once before, privately.
          </p>
        </div>
        <VerseQuote
          text="And Moses spake unto all the congregation of the children of Israel, saying, This is the thing which the LORD commanded, saying, Take ye from among you an offering unto the LORD: whosoever is of a willing heart, let him bring it, an offering of the LORD; gold, and silver, and brass,"
          reference="Exodus 35:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Compare this to what God told Moses on the mountain, long before the golden calf.</strong>{" "}
            God had already named almost this exact list to Moses alone at the start of{" "}
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink>: gold, silver, brass, blue
            and purple and scarlet thread, fine linen, goats&apos; hair, rams&apos; skins, badgers&apos; skins,
            shittim wood, oil, spices, onyx stones. Moses is not announcing something new here. He is finally
            relaying, to the people who need to actually bring it, instructions God gave him before the calf
            ever interrupted the plan.
          </p>
          <p>
            <strong>Shittim wood</strong> is acacia, a hard desert wood suited to furniture that has to survive
            decades of travel. The list continues into the furniture itself.
          </p>
        </div>
        <VerseQuote
          text="The tabernacle, his tent, and his covering, his taches, and his boards, his bars, his pillars, and his sockets, The ark, and the staves thereof, with the mercy seat, and the vail of the covering, The table, and his staves, and all his vessels, and the shewbread,"
          reference="Exodus 35:11 to 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Taches</strong> are clasps or hooks, used to fasten the tabernacle&apos;s curtains together.
            <strong> Shewbread</strong> was bread kept continually on the table inside the holy place, a visible
            sign that the LORD provided for His people. The list keeps going through the lampstand, the incense
            altar, the bronze altar, the court hangings, the priestly garments for Aaron and his sons, right
            down to the tent pegs and their cords.
          </p>
          <p>
            💡 Nothing here is decoration for its own sake. Every item on this list had already been described
            in careful detail across Exodus 25 through 30. Moses is handing the people a construction list for
            a building whose blueprint was already finished.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Same Gold, Given a Different Way (verses 20 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>What happens next is the chapter&apos;s quiet answer to a question the golden calf story left hanging.</p>
        </div>
        <VerseQuote
          text="And all the congregation of the children of Israel departed from the presence of Moses. And they came, every one whose heart stirred him up, and every one whom his spirit made willing, and they brought the LORD's offering to the work of the tabernacle of the congregation, and for all his service, and for the holy garments."
          reference="Exodus 35:20 and 21"
        />
        <VerseQuote
          text="And they came, both men and women, as many as were willing hearted, and brought bracelets, and earrings, and rings, and tablets, all jewels of gold: and every man that offered offered an offering of gold unto the LORD."
          reference="Exodus 35:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Bracelets, earrings, rings, the same kind of gold ornament Aaron collected in{" "}
            <ArticleLink href="/blog/exodus-32-explained">Exodus 32:2 and 3</ArticleLink> to build the calf, and
            the same category of jewelry Israel stripped off in mourning when{" "}
            <ArticleLink href="/blog/exodus-33-explained">Exodus 33:4 to 6</ArticleLink> told them God would not
            travel in their midst.</strong> This is the third time gold jewelry moves in this story. First it
            built an idol. Then it came off in grief. Now it is handed over again, and this time no one has to
            ask twice.
          </p>
          <p>
            📌 <strong>The difference was never the gold.</strong> It was what the heart behind it was reaching
            for. Verse 21 uses &quot;willing&quot; and &quot;stirred&quot; in the same breath, language Exodus
            32 never once used for the crowd demanding a calf.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Every Willing Heart, Not Just a Few (verses 25 to 29)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The offering was not limited to whoever happened to own gold. The text makes a point of naming skill, not just wealth.</p>
        </div>
        <VerseQuote
          text="And all the women that were wise hearted did spin with their hands, and brought that which they had spun, both of blue, and of purple, and of scarlet, and of fine linen. And all the women whose heart stirred them up in wisdom spun goats' hair."
          reference="Exodus 35:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Scripture names this work specifically and calls it wisdom, twice in two verses.</strong>{" "}
            Spinning thread by hand was skilled, essential labor, and the text credits the women who did it by
            name of trade, not as an afterthought folded into &quot;the people.&quot; Without their thread,
            there is no blue or purple or scarlet for a single curtain in the tabernacle.
          </p>
          <p>Rulers contribute what ordinary households would not have on hand.</p>
        </div>
        <VerseQuote
          text="And the rulers brought onyx stones, and stones to be set, for the ephod, and for the breastplate; And spice, and oil for the light, and for the anointing oil, and for the sweet incense."
          reference="Exodus 35:27 and 28"
        />
        <VerseQuote
          text="The children of Israel brought a willing offering unto the LORD, every man and woman, whose heart made them willing to bring for all manner of work, which the LORD had commanded to be made by the hand of Moses."
          reference="Exodus 35:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 29 sums up the whole offering in one line: every man and woman, each contributing
            according to what they actually had to give. Nobody is named as holding back, and nobody is named
            as giving more than their own willingness.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Bezaleel and Aholiab, Named to the People at Last (verses 30 to 35)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by naming the two men who will turn all this material into an actual building.</p>
        </div>
        <VerseQuote
          text="And Moses said unto the children of Israel, See, the LORD hath called by name Bezaleel the son of Uri, the son of Hur, of the tribe of Judah; And he hath filled him with the spirit of God, in wisdom, in understanding, and in knowledge, and in all manner of workmanship;"
          reference="Exodus 35:30 and 31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>These words are not new either.</strong> God spoke almost this exact description of
            Bezaleel to Moses privately at the start of Exodus 31, before the golden calf,
            before the broken tables, before any of it. The appointment never changed. What changed is that the
            people are finally hearing about it, after a covenant crisis delayed the announcement by several
            chapters.
          </p>
        </div>
        <VerseQuote
          text="And he hath put in his heart that he may teach, both he, and Aholiab, the son of Ahisamach, of the tribe of Dan. Them hath he filled with wisdom of heart, to work all manner of work, of the engraver, and of the cunning workman, and of the embroiderer, in blue, and in purple, in scarlet, and in fine linen, and of the weaver, even of them that do any work, and of those that devise cunning work."
          reference="Exodus 35:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice that Bezaleel is not only gifted to build. He is gifted to teach.</strong> The
            tabernacle was never meant to rest on two men&apos;s hands alone. Verse 34 says God put teaching
            itself into Bezaleel&apos;s heart, so the skill needed for this work could spread to everyone
            whose heart had just been stirred to give material for it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 35 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does this chapter repeat material already given in Exodus 25 and Exodus 31 almost word
            for word?</strong> The text itself explains the gap in timing, not the content. God gave the
            materials list and named Bezaleel and Aholiab to Moses privately, on the mountain, before the
            golden calf. The people below never heard any of it, because the covenant broke and had to be
            rebuilt before the tabernacle work could resume. Exodus 35 is Moses finally delivering, to the
            whole congregation, instructions that had been waiting since before the crisis. The repetition is
            not padding. It is catching the people up on a plan that was already finished, just never
            announced.
          </p>
          <p>
            <strong>Is the death penalty for breaking the sabbath in Exodus 35:2 still a command for Christians
            today?</strong> Exodus 35:2 states the penalty plainly as part of Israel&apos;s covenant law at
            Sinai. The New Testament treats the sabbath differently than the rest of the Ten Commandments in
            several places.
          </p>
        </div>
        <VerseQuote
          text="Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new moon, or of the sabbath days: Which are a shadow of things to come; but the body is of Christ."
          reference="Colossians 2:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Christians read this differently. Some hold that the moral principle of regular rest and worship
            continues even though the specific Mosaic penalty does not apply outside Israel&apos;s covenant
            law. Others see the sabbath itself as part of the ceremonial law fulfilled in Christ, no longer
            binding in its Old Testament form at all. What Exodus 35:2 and 3 record is not in dispute: within
            Israel&apos;s covenant, sabbath rest was treated with the same seriousness as any other command God
            had just renewed.
          </p>
          <p>
            <strong>Why does Exodus 35:3 add a command against kindling fire that no earlier sabbath passage in
            Exodus mentions?</strong> Exodus 20:8 to 11, 23:12, and 31:14 and 15 all command sabbath rest and
            state the death penalty, but none of them name fire specifically. Exodus 35:3 is the first place in
            the book this detail appears. The text does not explain why it surfaces here rather than earlier.
            What it does show is that rest was never meant to stay a general idea. It was specific enough to
            reach into whether a cooking fire stayed lit.
          </p>
          <p>
            <strong>Why does the text specifically credit women&apos;s skill at spinning, when so much of
            Exodus names only men?</strong> Exodus 35:25 and 26 are direct: &quot;all the women that were wise
            hearted did spin with their hands,&quot; and their skill is called wisdom twice. The tabernacle
            could not have been built without the thread they produced. The text does not elaborate further
            than that, but it does not need to. It simply records, without comment, that the work these women
            did was essential and skilled, not incidental.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 35
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 35:2 and 3</h3>
        <VerseQuote
          text="Six days shall work be done, but on the seventh day there shall be to you an holy day, a sabbath of rest to the LORD: whosoever doeth work therein shall be put to death. Ye shall kindle no fire throughout your habitations upon the sabbath day."
          reference="Exodus 35:2 and 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The sabbath law reaches into the smallest daily task, a fire for cooking or warmth, with a detail no
          earlier passage in Exodus had spelled out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 35:5</h3>
        <VerseQuote
          text="Take ye from among you an offering unto the LORD: whosoever is of a willing heart, let him bring it, an offering of the LORD; gold, and silver, and brass,"
          reference="Exodus 35:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A request God had already given Moses alone, back before the golden calf, finally reaching the
          people it was always meant for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 35:21</h3>
        <VerseQuote
          text="And they came, every one whose heart stirred him up, and every one whom his spirit made willing, and they brought the LORD's offering to the work of the tabernacle of the congregation, and for all his service, and for the holy garments."
          reference="Exodus 35:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same bracelets and earrings that built a calf two chapters ago, handed over again, this time
          because nobody had to ask.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 35:25 and 26</h3>
        <VerseQuote
          text="And all the women that were wise hearted did spin with their hands, and brought that which they had spun, both of blue, and of purple, and of scarlet, and of fine linen. And all the women whose heart stirred them up in wisdom spun goats' hair."
          reference="Exodus 35:25 and 26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Skilled handwork named directly and called wisdom, work the tabernacle could not exist without.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 35:30 and 31</h3>
        <VerseQuote
          text="And Moses said unto the children of Israel, See, the LORD hath called by name Bezaleel the son of Uri, the son of Hur, of the tribe of Judah; And he hath filled him with the spirit of God, in wisdom, in understanding, and in knowledge, and in all manner of workmanship;"
          reference="Exodus 35:30 and 31"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          An appointment made before the golden calf ever happened, finally announced to the people it affects,
          once the covenant that had broken was whole again.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 35
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 35 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 35 records Moses gathering the whole congregation after the covenant was renewed, repeating
          the sabbath law with a new detail against kindling fire, relaying God&apos;s earlier instructions for
          a tabernacle offering, the people giving willingly, skilled women spinning thread, and Bezaleel and
          Aholiab named publicly as the craftsmen God had already chosen to build it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 35 repeat so much from earlier chapters?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God had already given Moses the materials list in Exodus 25 and named Bezaleel and Aholiab in Exodus
          31, but only to Moses privately on the mountain. The golden calf and the covenant&apos;s renewal
          interrupted everything before the people ever heard any of it. Exodus 35 is Moses finally announcing
          a plan that was already finished.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 35:3 forbid kindling a fire on the sabbath?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No earlier sabbath command in Exodus names fire specifically. Exodus 35:3 is the first place this
          detail appears, making sabbath rest reach into an ordinary daily task rather than staying a general
          principle.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the same gold jewelry show up again in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Bracelets, earrings, and rings had already been broken off to build the golden calf in Exodus 32, then
          stripped off in mourning in Exodus 33. Exodus 35:22 shows the same category of jewelry given a third
          time, now freely, for the tabernacle instead of an idol.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Bezaleel and Aholiab?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Bezaleel, of the tribe of Judah, and Aholiab, of the tribe of Dan, were the two craftsmen Exodus
          35:30 to 35 names as filled with God&apos;s Spirit for skilled work in metal, stone, and cloth, and
          also gifted to teach others the same skills.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 35 mention women spinning thread specifically?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 35:25 and 26 call the women&apos;s spinning &quot;wisdom&quot; twice in two verses. Their
          handmade thread supplied the blue, purple, and scarlet material the tabernacle&apos;s curtains and
          garments required, work the text credits directly rather than folding into a general mention of
          &quot;the people.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is shittim wood in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Shittim wood is acacia, a hard wood native to the desert regions Israel traveled through, strong
          enough for furniture meant to survive decades of travel through the wilderness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;taches&quot; mean in Exodus 35?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Taches are clasps or hooks, used in the tabernacle&apos;s construction to fasten its curtains and
          coverings together at the seams.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the Israelites forced to give toward the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Exodus 35:5, 21, and 29 each describe the offering using the word &quot;willing.&quot; Verse 29
          sums it up directly: every man and woman gave according to what their own heart made them willing to
          bring, not a required amount.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 35 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The willing offering in Exodus 35 becomes the pattern Paul later points back to when he teaches about
          giving: not under compulsion, but from a heart that wants to. The chapter also sets up the next two
          chapters, where Bezaleel and the people&apos;s gifts actually become the tabernacle.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 35 does not undo the golden calf. It answers it.</p>
          <p>
            📌 <strong>The same gold that built an idol built a dwelling for God two chapters later.</strong>{" "}
            What changed was never the material. It was whether the heart behind it was forced or willing.
          </p>
          <p>
            📌 <strong>A delayed plan is not a cancelled plan.</strong> Everything Moses announces in this
            chapter had already been settled on the mountain before the calf. The covenant crisis delayed the
            announcement. It never changed what God had already decided to build, or who He had already chosen
            to build it.
          </p>
          <p>
            📌 <strong>Skill counted as worship here, not just gold.</strong> The women who spun thread and the
            men Bezaleel would go on to teach gave something just as real as a bracelet, and the text names it
            just as clearly.
          </p>
          <p>
            You are probably not bringing onyx stones to a tabernacle. But you likely have something, time, a
            skill, an ordinary craft, that could be given the same way Exodus 35 describes: willingly, not
            because someone had to ask twice.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Exodus 35:29 again today, and ask what you actually have that your own heart would be willing
            to give, without being pressured into it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
