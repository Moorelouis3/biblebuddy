import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-18-explained", {
  title: "Leviticus 18 Explained: The Laws Against Sexual Immorality",
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

export default function LeviticusEighteenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-18-explained"
      title={<>📖 Leviticus 18 Explained: The Laws Against Sexual Immorality</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No altar in this chapter. No priest, no bird, no bullock.</p>
            <p>
              <strong>Leviticus 18 explained</strong> is the chapter where the law stops talking
              about what happens at the tabernacle door and starts talking about what happens
              behind a closed tent flap. Thirty verses, one word repeated over and over,
              &quot;nakedness,&quot; and a single command underneath all of it: some doors in a
              family stay shut, for good.
            </p>
            <p>Maybe this is a chapter you have skipped past, assuming it has nothing to teach you today.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does &quot;uncover nakedness&quot; get repeated so many times in one chapter?</li>
            <li>❓ Did Jacob break this law when he married both Leah and Rachel?</li>
            <li>❓ Why does a command about child sacrifice sit in the middle of a list about sex?</li>
            <li>❓ And why does the chapter end by warning that the land itself can vomit people out?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 18 is not a random list of taboos. It is Israel&apos;s God
              drawing one line around the most private room in human life and saying, Egypt and
              Canaan do not get to decide what happens in here. I do.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the warning that opens it,
              the boundaries inside the immediate family, the boundaries just outside it, the
              handful of lines named directly with no family connection at all, and the warning
              about the land itself that closes the chapter.
            </p>
            <p>Read slowly. This chapter still names exactly what it means, with no euphemism softening it.</p>
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
            <ArticleLink href="/blog/leviticus-17-explained">Leviticus 17</ArticleLink> closed by
            telling Israel that blood belongs to the LORD alone, not to anyone&apos;s private
            table. That chapter drew one line around what could be eaten. This chapter draws
            another line around who could be touched.
          </p>
          <p>
            The connection is not an accident. Leviticus 17 had already named &quot;the doings of
            Egypt&quot; once, the open field sacrifices Israel had been offering to idols instead
            of the LORD. Leviticus 18 opens by naming Egypt and Canaan again, this time for a
            completely different kind of practice Israel is about to walk straight into. A nation
            that had just left one culture behind, and was about to enter the land of another, is
            told plainly that neither culture gets to set the terms for what happens inside an
            Israelite family.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 18 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. &quot;I Am the LORD Your God&quot; (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before a single prohibition is named, the chapter spends five verses on something
            else entirely: who is speaking, and why that matters.
          </p>
        </div>
        <VerseQuote
          text="After the doings of the land of Egypt, wherein ye dwelt, shall ye not do: and after the doings of the land of Canaan, whither I bring you, shall ye not do: neither shall ye walk in their ordinances."
          reference="Leviticus 18:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Israel is standing between two cultures named directly, the one they just
            left and the one they are about to enter, and told not to copy either one.</strong>{" "}
            Egypt was behind them. Canaan was ahead of them. Both had their own sexual customs.
            Neither one gets a vote in what Israel does.
          </p>
          <p>The reason is stated as plainly as the law itself.</p>
        </div>
        <VerseQuote
          text="Ye shall do my judgments, and keep mine ordinances, to walk therein: I am the LORD your God."
          reference="Leviticus 18:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Count how often this short phrase appears in just thirty verses. &quot;I am the
            LORD&quot; or &quot;I am the LORD your God&quot; shows up six separate times across
            this chapter, once in this opening and five more times before the list ends. Every
            single prohibition that follows rests on that one claim of authority, not on taste,
            not on culture, not on whatever Egypt or Canaan happened to be doing that generation.
          </p>
          <p>
            ✅ Verse 5 adds something easy to miss in a chapter mostly remembered for its
            prohibitions: <strong>&quot;which if a man do, he shall live in them.&quot;</strong>{" "}
            These are framed as boundaries that lead to life, not a list designed only to
            restrict.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Inside the Immediate Family (verses 6 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The list proper opens with a single summary line that every verse after it will
            unpack one relationship at a time.
          </p>
        </div>
        <VerseQuote
          text="None of you shall approach to any that is near of kin to him, to uncover their nakedness: I am the LORD."
          reference="Leviticus 18:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Uncover nakedness&quot; is this chapter&apos;s own idiom for sexual
            relations, not a euphemism added by later translators.</strong> The word
            &quot;nakedness&quot; alone appears twenty four times in thirty verses. &quot;Near of
            kin&quot; is the category. Every verse that follows names exactly who falls inside it.
          </p>
        </div>
        <VerseQuote
          text="The nakedness of thy father, or the nakedness of thy mother, shalt thou not uncover: she is thy mother; thou shalt not uncover her nakedness."
          reference="Leviticus 18:7"
        />
        <VerseQuote
          text="The nakedness of thy father’s wife shalt thou not uncover: it is thy father’s nakedness."
          reference="Leviticus 18:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Verse 8 covers a father&apos;s wife even where she is not the son&apos;s own
            mother, a real situation in a culture where men sometimes had more than one wife.
            Reuben would later be condemned for exactly this, lying with his father&apos;s
            concubine in Genesis 35, decades before this law was ever spoken at Sinai.
          </p>
          <p>The list keeps moving outward, one relationship at a time, never slowing down.</p>
        </div>
        <VerseQuote
          text="The nakedness of thy sister, the daughter of thy father, or daughter of thy mother, whether she be born at home, or born abroad, even their nakedness thou shalt not uncover."
          reference="Leviticus 18:9"
        />
        <VerseQuote
          text="The nakedness of thy son’s daughter, or of thy daughter’s daughter, even their nakedness thou shalt not uncover: for theirs is thine own nakedness."
          reference="Leviticus 18:10"
        />
        <VerseQuote
          text="The nakedness of thy father’s wife’s daughter, begotten of thy father, she is thy sister, thou shalt not uncover her nakedness."
          reference="Leviticus 18:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 9 closes a loophole before anyone could even think to use it. A half sister,
            sharing only a father or only a mother, &quot;born at home&quot; or &quot;born
            abroad,&quot; counts exactly the same as a full sister. The law does not grade kinship
            by degree of shared blood. It grades it by the relationship itself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Beyond the Immediate Family: Aunts, In-Laws, and the Sister Clause (verses 12 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The list widens again, past parents and siblings into the wider household.</p>
        </div>
        <VerseQuote
          text="Thou shalt not uncover the nakedness of thy father’s sister: she is thy father’s near kinswoman."
          reference="Leviticus 18:12"
        />
        <VerseQuote
          text="Thou shalt not uncover the nakedness of thy mother’s sister: for she is thy mother’s near kinswoman."
          reference="Leviticus 18:13"
        />
        <VerseQuote
          text="Thou shalt not uncover the nakedness of thy father’s brother, thou shalt not approach to his wife: she is thine aunt."
          reference="Leviticus 18:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Both an aunt by blood and an aunt by marriage fall under the same word, &quot;near
            kinswoman.&quot; The law treats marriage itself as creating real kinship, not just a
            legal arrangement that leaves the old boundaries untouched.
          </p>
          <p>The same principle covers a daughter in law and a brother&apos;s wife.</p>
        </div>
        <VerseQuote
          text="Thou shalt not uncover the nakedness of thy daughter in law: she is thy son’s wife; thou shalt not uncover her nakedness."
          reference="Leviticus 18:15"
        />
        <VerseQuote
          text="Thou shalt not uncover the nakedness of thy brother’s wife: it is thy brother’s nakedness."
          reference="Leviticus 18:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This is the general rule for a brother&apos;s wife, stated with no exception
            written into it here. <ArticleLink href="/blog/genesis-38-explained">Genesis
            38</ArticleLink> shows a very different custom already practiced before this law, a
            childless widow married to her late husband&apos;s brother to continue his family
            line. That custom, levirate marriage, gets its own separate instruction later in
            Deuteronomy 25, specifically for a brother who died leaving no son. Leviticus 18:16
            is not written with that narrow exception in view. It is the ordinary rule for every
            other case.
          </p>
          <p>Two more verses close out this stretch of the list.</p>
        </div>
        <VerseQuote
          text="Thou shalt not uncover the nakedness of a woman and her daughter, neither shalt thou take her son’s daughter, or her daughter’s daughter, to uncover her nakedness; for they are her near kinswomen: it is wickedness."
          reference="Leviticus 18:17"
        />
        <VerseQuote
          text="Neither shalt thou take a wife to her sister, to vex her, to uncover her nakedness, beside the other in her life time."
          reference="Leviticus 18:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verse 18 is the one verse in this section with real history already
            behind it when it was spoken.</strong>{" "}
            <ArticleLink href="/blog/genesis-29-explained">Genesis 29</ArticleLink> records Jacob
            married to both Leah and Rachel, two sisters, at the same time, generations before
            Moses ever brought this law down from Sinai. Leviticus 18 does not go back and
            condemn Jacob. The law did not exist yet when he married them. What verse 18 does is
            close that exact door going forward, naming &quot;beside the other in her life
            time&quot; as the specific situation it forbids: marrying a wife&apos;s sister while
            the first wife is still living.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Two Everyday Boundaries (verses 19 and 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter steps outside the family tree for a moment, into two situations any
            married Israelite could face.
          </p>
        </div>
        <VerseQuote
          text="Also thou shalt not approach unto a woman to uncover her nakedness, as long as she is put apart for her uncleanness."
          reference="Leviticus 18:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the same monthly separation{" "}
            <ArticleLink href="/blog/leviticus-15-explained">Leviticus 15</ArticleLink> already
            laid out in detail. That chapter explained the uncleanness itself. This one simply
            adds it to the list of boundaries a husband does not cross.
          </p>
        </div>
        <VerseQuote
          text="Moreover thou shalt not lie carnally with thy neighbour’s wife, to defile thyself with her."
          reference="Leviticus 18:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This is the one line in the whole chapter that has nothing to do with family at
            all. Adultery gets its own command here, and again later as one of the ten words
            <ArticleLink href="/blog/exodus-20-explained"> Moses brought down from
            Sinai</ArticleLink>. Leviticus 18 treats it as part of the same larger category as
            everything around it, a boundary around whose body belongs to whom.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Three Lines the Text Will Not Soften (verses 21 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The list turns to three practices that stood out even among the nations Israel was
            about to displace, named with no family relationship attached to any of them.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt not let any of thy seed pass through the fire to Molech, neither shalt thou profane the name of thy God: I am the LORD."
          reference="Leviticus 18:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Child sacrifice to Molech sits in the middle of a list about sex because
            both belong to the same category in this chapter: what a person&apos;s own body and
            children exist for, and who actually gets to decide that.</strong> &quot;Thy seed&quot;
            is the same word used for offspring throughout Genesis. A practice tied to Canaanite
            worship, giving a child to be burned, is named as the clearest possible way a person
            could profane the LORD&apos;s name with what belonged to Him.
          </p>
          <p>The next two verses turn back to sexual boundaries, and state them without qualification.</p>
        </div>
        <VerseQuote
          text="Thou shalt not lie with mankind, as with womankind: it is abomination."
          reference="Leviticus 18:22"
        />
        <VerseQuote
          text="Neither shalt thou lie with any beast to defile thyself therewith: neither shall any woman stand before a beast to lie down thereto: it is confusion."
          reference="Leviticus 18:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Both verses use strong, specific words. &quot;Abomination&quot; in verse 22 is the
            same word the chapter repeats three more times, as &quot;abominations,&quot; once it
            sums up the whole list in the verses that close the chapter. &quot;Confusion&quot; in
            verse 23 names a disorder, a violation of the created order rather than an ordinary
            offense. Neither verse softens its own language, and this chapter does not ask the
            reader to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Land Itself Keeps Score (verses 24 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter closes by widening the lens from individual Israelites to the nations
            Israel is about to replace.
          </p>
        </div>
        <VerseQuote
          text="Defile not ye yourselves in any of these things: for in all these the nations are defiled which I cast out before you: And the land is defiled: therefore I do visit the iniquity thereof upon it, and the land itself vomiteth out her inhabitants."
          reference="Leviticus 18:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The land itself is pictured as sick, defiled by what was done on it, and
            finally vomiting out the people who defiled it.</strong> Canaan is not being emptied
            out so Israel can simply move in. The text says the practices just listed are the
            reason the previous inhabitants are being removed at all.{" "}
            <ArticleLink href="/blog/genesis-19-explained">Genesis 19</ArticleLink> already showed
            one city in that same region judged for exactly this kind of corruption, generations
            before Israel ever left Egypt.
          </p>
        </div>
        <VerseQuote
          text="Ye shall therefore keep my statutes and my judgments, and shall not commit any of these abominations; neither any of your own nation, nor any stranger that sojourneth among you:"
          reference="Leviticus 18:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Just like the blood law in Leviticus 17, this rule reaches past native born Israel
            to cover any foreigner living among them too. Nobody living inside Israel&apos;s camp
            gets a different standard.
          </p>
          <p>The warning closes with the same severity it opened with.</p>
        </div>
        <VerseQuote
          text="For whosoever shall commit any of these abominations, even the souls that commit them shall be cut off from among their people."
          reference="Leviticus 18:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel is not told these boundaries are unique to them, a strange religious custom
            nobody else has to answer for. They are told the land they are about to inherit has
            already paid a price for ignoring them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 18 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Jacob sin by marrying both Leah and Rachel, since verse 18 forbids
            marrying two sisters?</strong> The text of Leviticus 18 was spoken at Sinai, generations
            after Genesis 29 records Jacob&apos;s marriages. Scripture does not go back and apply this law to events that
            happened before it existed. What verse 18 does is close that door for Israel going
            forward, named specifically as marrying a wife&apos;s sister while the first wife is
            still alive.
          </p>
          <p>
            <strong>Does verse 16&apos;s ban on a brother&apos;s wife contradict the levirate
            marriage custom in Genesis 38 and Deuteronomy 25?</strong> Leviticus 18:16 states the
            ordinary rule with no exception written into this chapter. Deuteronomy 25:5 and 6
            later carve out one specific, narrow case: a man who died leaving his widow with no
            son. Genesis 38 shows that custom already practiced, and shows Onan condemned
            specifically for refusing to carry it out honestly. The general prohibition and the
            narrow exception sit in two different texts, each addressing a different situation.
          </p>
          <p>
            <strong>Why is child sacrifice to Molech placed in the middle of a list about sexual
            boundaries?</strong> The text does not explain its own ordering, only the command.
            What can be said plainly is that verse 21 sits inside a chapter about what a person&apos;s
            body, children, and household exist for, and who gets to decide that. Canaanite worship
            of Molech and the sexual practices named around it were not separate categories to the
            nations Israel was displacing.
          </p>
          <p>
            <strong>What does &quot;it is abomination&quot; in verse 22 actually mean, and how
            does the New Testament address it?</strong> The Hebrew text here is not disputed among
            scholars: it forbids sexual relations between men, using the same strong word the
            chapter later repeats, as &quot;abominations,&quot; for the whole list it closes with.
            The New Testament returns to the same subject directly rather than leaving it only to
            this one verse, in passages like 1 Corinthians 6:9 and 10 and Romans 1:26 and 27. Most
            Christian traditions read Leviticus 18&apos;s moral commands, as distinct from its
            tabernacle-era ceremonial ones, as still reflecting God&apos;s standard, reaffirmed
            rather than reversed in the New Testament.
          </p>
          <p>
            <strong>Do Christians today still have to keep the specific boundaries listed in this
            chapter?</strong> Most Christian traditions separate Israel&apos;s ceremonial law, tied
            to the tabernacle and its priesthood and fulfilled in Christ, from its moral law,
            understood as a lasting reflection of God&apos;s character. Leviticus 18&apos;s
            prohibitions on incest, adultery, and the practices named in verses 21 through 23 fall
            into that second category in how the New Testament treats them, named again rather
            than dropped.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 18
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 18:4 and 5</h3>
        <VerseQuote
          text="Ye shall do my judgments, and keep mine ordinances, to walk therein: I am the LORD your God. Ye shall therefore keep my statutes, and my judgments: which if a man do, he shall live in them: I am the LORD."
          reference="Leviticus 18:4 and 5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that frames the entire chapter before a single prohibition is named: these
          boundaries are tied to the LORD&apos;s own authority, and framed as leading to life, not
          only restriction.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 18:6</h3>
        <VerseQuote
          text="None of you shall approach to any that is near of kin to him, to uncover their nakedness: I am the LORD."
          reference="Leviticus 18:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The summary line every verse after it unpacks one relationship at a time, naming the
          category the entire chapter is built around.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 18:21</h3>
        <VerseQuote
          text="And thou shalt not let any of thy seed pass through the fire to Molech, neither shalt thou profane the name of thy God: I am the LORD."
          reference="Leviticus 18:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one command in the chapter with nothing to do with sexual boundaries directly, naming
          what a child belonged to, and who had no right to claim one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 18:24 and 25</h3>
        <VerseQuote
          text="Defile not ye yourselves in any of these things: for in all these the nations are defiled which I cast out before you: And the land is defiled: therefore I do visit the iniquity thereof upon it, and the land itself vomiteth out her inhabitants."
          reference="Leviticus 18:24 and 25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that reframes everything before it: Canaan was not emptied out at random. The
          text names exactly why its previous inhabitants lost the land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 18:30</h3>
        <VerseQuote
          text="Therefore shall ye keep mine ordinance, that ye commit not any one of these abominable customs, which were committed before you, and that ye defile not yourselves therein: I am the LORD your God."
          reference="Leviticus 18:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s closing line, tying everything back to the same claim it opened with:
          not culture, not custom, but the LORD&apos;s own ordinance.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 18
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 18 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 18 lists the sexual boundaries Israel had to keep instead of copying the
          practices of Egypt and Canaan, covering relationships inside the family, adultery, child
          sacrifice to Molech, and several practices named directly with no family connection
          attached.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;uncover nakedness&quot; mean in Leviticus 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is this chapter&apos;s own repeated idiom for sexual relations. The word
          &quot;nakedness&quot; alone appears twenty four times across thirty verses, and each
          verse names exactly which relationship the idiom applies to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jacob break Leviticus 18:18 by marrying Leah and Rachel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Genesis 29 records those marriages generations before Moses brought this law down
          from Sinai. Leviticus 18:18 closes that specific door going forward, naming marrying a
          wife&apos;s sister while she is still living as the case it forbids.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 18 forbid marrying a brother&apos;s wife when Deuteronomy allows it in one case?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 18:16 states the ordinary rule. Deuteronomy 25:5 and 6 later give one narrow
          exception, for a brother who died leaving his widow with no son, so his family line
          would not end. Genesis 38 shows that custom already in practice before either law was
          written down.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 18 mention Molech in a list about sexual sins?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 21 bans giving a child to be sacrificed to Molech, a Canaanite practice. The text
          does not explain its own placement, but it sits inside a chapter about what a person&apos;s
          body and children exist for, and who has no right to claim either one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Leviticus 18:22 say, and how does the New Testament address it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse forbids sexual relations between men, calling it abomination, the same word
          used for the other practices named around it. The New Testament returns to the subject
          directly in passages like 1 Corinthians 6:9 and 10 and Romans 1:26 and 27, which most
          Christian traditions read as reaffirming this standard rather than setting it aside.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter say the land itself was defiled?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 18:24 and 25 say the nations already living in Canaan were removed because of
          the very practices just listed. The land is pictured as sick from what was done on it,
          not simply emptied out to make room for Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did these laws apply to foreigners living among Israel too?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Leviticus 18:26 names &quot;any stranger that sojourneth among you&quot; alongside
          native born Israel, the same pattern already used for the blood law in Leviticus 17.
          Nobody living inside the camp was held to a different standard.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to someone who broke these laws?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 18:29 says whoever committed these things would be &quot;cut off from among
          their people,&quot; the same severe language used for the most serious offenses
          elsewhere in Leviticus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Christians still have to follow Leviticus 18 today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Christian traditions separate Israel&apos;s ceremonial law, fulfilled in Christ,
          from its moral law. Leviticus 18&apos;s sexual boundaries fall under the moral category,
          named again rather than dropped in New Testament passages addressing the same subjects.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 18 is a hard chapter to read quickly, and it was never meant to be read quickly.</p>
          <p>
            📌 <strong>Every boundary in this chapter answers the same question: who decides what
            a body is for.</strong> Egypt did not get a vote. Canaan did not get a vote. &quot;I am
            the LORD&quot; answers it six times in thirty verses.
          </p>
          <p>
            📌 <strong>These were never framed only as restriction.</strong> Verse 5 calls them
            boundaries a person could do and live in, not simply a wall to avoid.
          </p>
          <p>
            📌 <strong>The land itself is pictured as paying a price for ignoring them.</strong>{" "}
            Israel was warned before they ever crossed into Canaan, using that same land as proof.
          </p>
          <p>
            You will likely never need to apply most of this chapter&apos;s specific cases to your
            own life. But the question underneath all of them has not gone away.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask honestly whose terms you are letting set the boundaries in your own most private
            life, culture&apos;s, or the LORD&apos;s.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
