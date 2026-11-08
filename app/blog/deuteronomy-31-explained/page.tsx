import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-31-explained", {
  title: "Deuteronomy 31 Explained: Be Strong and of a Good Courage",
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

export default function DeuteronomyThirtyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-31-explained"
      title={<>📖 Deuteronomy 31 Explained: Be Strong and of a Good Courage</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Moses is a hundred and twenty years old, and he just found out he is not crossing the river.</p>
            <p>
              <strong>Deuteronomy 31 explained</strong> is the chapter where the handoff actually
              happens. Moses cannot lead Israel into the land. So in one chapter he hands the
              people a new leader, hands the priests a written law, hands Israel a song they
              cannot lose, and hands God Himself the job of going ahead of them, since he never
              could do that part anyway.
            </p>
            <p>You may remember this chapter only as the one with the famous phrase about courage.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Moses repeat &quot;be strong and of a good courage&quot; three times in one chapter?</li>
            <li>❓ Why write an entire song just to warn Israel about the future?</li>
            <li>❓ Did God already know Israel would turn away before they ever did it?</li>
            <li>❓ What happened to the actual scroll Moses placed beside the ark?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 31 is Moses stepping down from a job God never actually gave
              away, because the one who really led Israel was never Moses to begin with.</strong>
            </p>
            <p>
              Walk through it slowly. The transfer of leadership here is not improvised at the last
              minute. Most of it had already been set in motion long before this chapter opens.
            </p>
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
            <ArticleLink href="/blog/deuteronomy-30-explained">Deuteronomy 30</ArticleLink> closed
            Moses&apos;s long speech on the starkest terms possible: life or death, blessing or
            cursing, with heaven and earth called as witnesses to the choice. Moses had just spent
            thirty chapters laying out the covenant, the law, the blessing, the curse, and the
            promise of restoration after judgment.
          </p>
          <p>
            Deuteronomy 31 moves from speech to action. The choosing is over for now. What is left
            is logistics, who leads next, how the law survives Moses, and what happens the moment
            everyone stops paying attention to any of it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 31 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Moses Steps Down, the Mission Does Not (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with Moses stating a fact he has clearly already made peace with.</p>
        </div>
        <VerseQuote
          text="And he said unto them, I am an hundred and twenty years old this day; I can no more go out and come in: also the LORD hath said unto me, Thou shalt not go over this Jordan."
          reference="Deuteronomy 31:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Stephen&apos;s speech in Acts later divides Moses&apos;s hundred and twenty years
            into three even stretches of forty: forty years growing up in Egypt, forty years as a
            shepherd in Midian, forty years leading Israel through the wilderness. Three careers,
            three different wildernesses, one life, and none of it ends with Moses getting to see
            the finish line he spent the last forty years walking toward.
          </p>
          <p>
            📌 <strong>Moses does not soften the news or make it about himself.</strong> In the
            very next breath he tells Israel who is actually going ahead of them, and it was never
            him.
          </p>
        </div>
        <VerseQuote
          text="Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee."
          reference="Deuteronomy 31:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the first of three times this exact command shows up in this one
            chapter.</strong> Moses is not coining a slogan here. He is handing Israel the one line
            that has to outlast him, because the courage was always supposed to rest on God&apos;s
            presence, not on whichever leader happened to be standing at the front.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Public Charge to a Leader Already Chosen (verses 7 and 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses then turns from the whole nation to one man, and this moment is not the first
            time Joshua has heard something like it.
          </p>
        </div>
        <VerseQuote
          text="And Moses called unto Joshua, and said unto him in the sight of all Israel, Be strong and of a good courage: for thou must go with this people unto the land which the LORD hath sworn unto their fathers to give them; and thou shalt cause them to inherit it."
          reference="Deuteronomy 31:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Years earlier, God had already told Moses exactly how to hand Joshua this role, in{" "}
            <ArticleLink href="/blog/numbers-27-explained">
              a private ceremony with Eleazar the priest
            </ArticleLink>
            , laying a hand on him and giving him a charge in front of the whole congregation.
            Deuteronomy 31 is not a sudden decision made because Moses ran out of time. It is the
            public, final step of something God set in motion long before this chapter.
          </p>
        </div>
        <VerseQuote
          text="And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed."
          reference="Deuteronomy 31:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            👀 Notice what changes and what does not between verse 6 and verse 8. The audience
            shrinks from a whole nation down to one man, but the promise does not shrink with it.
            Joshua gets the same guarantee Israel just got, word for word.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Law Written to Be Read Out Loud Every Seven Years (verses 9 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses puts the speech he has just finished into a form that can outlive him.</p>
        </div>
        <VerseQuote
          text="And Moses wrote this law, and delivered it unto the priests the sons of Levi, which bare the ark of the covenant of the LORD, and unto all the elders of Israel."
          reference="Deuteronomy 31:9"
        />
        <VerseQuote
          text="At the end of every seven years, in the solemnity of the year of release, in the feast of tabernacles, When all Israel is come to appear before the LORD thy God in the place which he shall choose, thou shalt read this law before all Israel in their hearing."
          reference="Deuteronomy 31:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The timing is specific on purpose. The feast of tabernacles already gathered the
            whole nation in one place once a year, and every seventh of those gatherings lined up
            with the year of release, when debts were cancelled and the land itself rested. Moses
            ties the law&apos;s public reading to the one moment guaranteed to have everyone
            listening at once.
          </p>
        </div>
        <VerseQuote
          text="Gather the people together, men, and women, and children, and thy stranger that is within thy gates, that they may hear, and that they may learn, and fear the LORD your God, and observe to do all the words of this law: And that their children, which have not known any thing, may hear, and learn to fear the LORD your God, as long as ye live in the land whither ye go over Jordan to possess it."
          reference="Deuteronomy 31:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Nobody gets to grow up not knowing this law, by design.</strong> A child born
            the year after one reading is only ever at most seven years old before hearing the
            whole thing recited again. This is the same instinct behind{" "}
            <ArticleLink href="/blog/deuteronomy-17-explained">
              the king&apos;s own copy of the law commanded earlier in Deuteronomy
            </ArticleLink>
            : the law is only useful to a generation that actually hears it, so Moses builds the
            hearing into the calendar itself rather than leaving it to chance.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. God Tells Moses the Ending Before It Happens (verses 14 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God calls Moses and Joshua to the tabernacle, and what He says there is not what either
            man was probably hoping to hear.
          </p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Behold, thou shalt sleep with thy fathers; and this people will rise up, and go a whoring after the gods of the strangers of the land, whither they go to be among them, and will forsake me, and break my covenant which I have made with them."
          reference="Deuteronomy 31:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;Go a whoring&quot; is marriage language, not generic disobedience.</strong>{" "}
            Scripture keeps reaching for this exact picture whenever it describes idolatry, because
            the covenant itself was never framed as a rulebook. It was framed as a relationship, and
            chasing other gods gets described the same way Scripture describes chasing other lovers.
          </p>
        </div>
        <VerseQuote
          text="Then my anger shall be kindled against them in that day, and I will forsake them, and I will hide my face from them, and they shall be devoured, and many evils and troubles shall befall them; so that they will say in that day, Are not these evils come upon us, because our God is not among us?"
          reference="Deuteronomy 31:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 God even tells Moses the question Israel will eventually ask out loud, before Israel
            has asked it. That level of advance detail is part of what makes the chapters that
            follow, blessing and cursing, exile and return, read less like generic warnings and
            more like a story God had already seen the end of.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Song Nobody Can Quietly Lose (verses 19 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right after that hard news, God gives Moses an unusual assignment.</p>
        </div>
        <VerseQuote
          text="Now therefore write ye this song for you, and teach it the children of Israel: put it in their mouths, that this song may be a witness for me against the children of Israel."
          reference="Deuteronomy 31:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A scroll can be lost, hidden, or ignored. A song memorized by an entire
            nation cannot be.</strong> Putting the warning in a tune that children would learn
            without even trying meant the next generation would carry the evidence against their
            own future unfaithfulness in their own mouths, whether they wanted to or not.
          </p>
        </div>
        <VerseQuote
          text="And it shall come to pass, when many evils and troubles are befallen them, that this song shall testify against them as a witness; for it shall not be forgotten out of the mouths of their seed: for I know their imagination which they go about, even now, before I have brought them into the land which I sware."
          reference="Deuteronomy 31:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses does exactly what he is told, the same day, with no delay and no argument about
            it.
          </p>
        </div>
        <VerseQuote
          text="Moses therefore wrote this song the same day, and taught it the children of Israel."
          reference="Deuteronomy 31:22"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Book Beside the Ark (verses 23 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses repeats the charge to Joshua a third time, this time as part of finishing the
            written law rather than addressing the nation directly.
          </p>
        </div>
        <VerseQuote
          text="And he gave Joshua the son of Nun a charge, and said, Be strong and of a good courage: for thou shalt bring the children of Israel into the land which I sware unto them: and I will be with thee."
          reference="Deuteronomy 31:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then, once the book itself is finally finished, Moses gives it the most secure resting
            place in the whole camp.
          </p>
        </div>
        <VerseQuote
          text="Take this book of the law, and put it in the side of the ark of the covenant of the LORD your God, that it may be there for a witness against thee."
          reference="Deuteronomy 31:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Centuries later, that very idea of a law book stored away and forgotten
            becomes an actual crisis.</strong> Under King Josiah, a copy of the law is found inside
            the temple after apparently sitting unread for years, and the discovery alone is enough
            to tear the king&apos;s clothes.
          </p>
        </div>
        <VerseQuote
          text="And Hilkiah the high priest said unto Shaphan the scribe, I have found the book of the law in the house of the LORD."
          reference="2 Kings 22:8"
        />
        <VerseQuote
          text="And it came to pass, when the king had heard the words of the book of the law, that he rent his clothes."
          reference="2 Kings 22:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A book kept safe is not the same thing as a book kept read. Moses solved the first
            problem in verse 26. The second problem is exactly why he also wrote a song nobody had
            to go looking for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Called to Witness One Last Time (verses 27 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses closes the chapter by naming exactly why he is doing all of this so carefully.</p>
        </div>
        <VerseQuote
          text="For I know thy rebellion, and thy stiff neck: behold, while I am yet alive with you this day, ye have been rebellious against the LORD; and how much more after my death?"
          reference="Deuteronomy 31:27"
        />
        <VerseQuote
          text="For I know that after my death ye will utterly corrupt yourselves, and turn aside from the way which I have commanded you; and evil will befall you in the latter days; because ye will do evil in the sight of the LORD, to provoke him to anger through the work of your hands."
          reference="Deuteronomy 31:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Moses is not guessing based on a bad mood.</strong> He watched this nation
            rebel with Moses standing right in front of them, miracles and all. His conclusion about
            what happens once he is gone is drawn from evidence he personally lived through, not
            pessimism for its own sake. The chapter ends with Moses doing the last thing God asked
            of him.
          </p>
        </div>
        <VerseQuote
          text="And Moses spake in the ears of all the congregation of Israel the words of this song, until they were ended."
          reference="Deuteronomy 31:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That song, word for word, is what the next chapter actually is. Deuteronomy 31 is the
            setup. Deuteronomy 32 is the song itself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 31 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>If God already told Moses Israel would turn away, did Deuteronomy 30&apos;s
            command to choose life ever offer a real choice?</strong> The text holds both without
            resolving the tension for the reader. Deuteronomy 30 sets a genuine choice in front of
            Israel, with real consequences attached to each side. Deuteronomy 31 then has God state
            plainly what Israel will actually choose. Scripture does not treat God&apos;s
            foreknowledge of an outcome as the same thing as God forcing that outcome. Moses himself
            grounds his own prediction in verse 27 on what he personally watched Israel do while he
            was still alive, not on some fatalistic prophecy detached from their actual choices.
            Knowing what a person will freely do and making them do it are different claims, and the
            chapter only makes the first one.
          </p>
          <p>
            <strong>Why command a song instead of simply writing more of the law down?</strong> A
            song survives in a way a scroll cannot. In a world where most people could not read, and
            where a single physical copy could be lost, damaged, or shut away unread, a song taught
            to children becomes something every single person carries personally, word for word,
            without needing access to the book at all. Verse 19 states the reasoning directly: the
            song exists specifically to be a witness that cannot be filed away and forgotten the way
            a document can.
          </p>
          <p>
            <strong>Does &quot;be strong and of a good courage&quot; mean something more specific
            here than general encouragement?</strong> Yes. Every time this phrase appears in this
            chapter, it is immediately followed by a reason, God going ahead, God not failing or
            forsaking, God&apos;s presence doing what the courage itself could never produce on its
            own. It is never offered as a stand alone pep talk. The same pairing shows up again once
            Joshua takes over, this time coming straight from God rather than from Moses.
          </p>
        </div>
        <VerseQuote
          text="There shall not any man be able to stand before thee all the days of thy life: as I was with Moses, so I will be with thee: I will not fail thee, nor forsake thee."
          reference="Joshua 1:5"
        />
        <VerseQuote
          text="Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest."
          reference="Joshua 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The exact command Moses gave Joshua in Deuteronomy 31 is the exact command God gives
            Joshua Himself in the opening chapter of the next book. The leadership changed hands.
            The source of the courage never did.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 31
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 31:6</h3>
        <VerseQuote
          text="Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee."
          reference="Deuteronomy 31:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first of three times this command appears in this chapter, and the first time it is
          God&apos;s presence doing the work, not Moses&apos;s leadership.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 31:8</h3>
        <VerseQuote
          text="And the LORD, he it is that doth go before thee; he will be with thee, he will not fail thee, neither forsake thee: fear not, neither be dismayed."
          reference="Deuteronomy 31:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same promise Israel just received, handed personally to Joshua, proof that the
          guarantee was never scaled down when the audience shrank to one man.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 31:19</h3>
        <VerseQuote
          text="Now therefore write ye this song for you, and teach it the children of Israel: put it in their mouths, that this song may be a witness for me against the children of Israel."
          reference="Deuteronomy 31:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A warning placed somewhere it could not be lost, memorized rather than merely written, so
          an entire nation would carry it without having to go looking for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 31:26</h3>
        <VerseQuote
          text="Take this book of the law, and put it in the side of the ark of the covenant of the LORD your God, that it may be there for a witness against thee."
          reference="Deuteronomy 31:26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The written law given the most protected resting place in the whole camp, a safeguard
          that centuries later becomes part of an actual national crisis when it is found again.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 31:29</h3>
        <VerseQuote
          text="For I know that after my death ye will utterly corrupt yourselves, and turn aside from the way which I have commanded you; and evil will befall you in the latter days; because ye will do evil in the sight of the LORD, to provoke him to anger through the work of your hands."
          reference="Deuteronomy 31:29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Moses&apos;s clear eyed prediction, built on what he personally watched Israel do while he
          was still alive to watch it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 31
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 31 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 31 covers Moses, at a hundred and twenty years old, publicly commissioning
          Joshua as his successor, writing the law down for the priests, commanding it be read
          publicly every seven years, and writing a song at God&apos;s command as a lasting witness
          against Israel&apos;s future unfaithfulness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Moses not allowed to enter the promised land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 31 states the fact plainly without repeating the reason, since Moses already
          explained it earlier in the book: his own failure to honor God at the waters of Meribah.
          Here the focus is not on why Moses cannot go, but on what happens to Israel once he does
          not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;be strong and of a good courage&quot; mean in Deuteronomy 31?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is not generic encouragement. Each time the phrase appears, it is immediately tied to
          God&apos;s presence going ahead of Israel and Joshua, not to self confidence or natural
          ability. God repeats the exact same pairing to Joshua directly in Joshua 1.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses write a song in Deuteronomy 31?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God commanded it specifically because a song taught to children could not be lost,
          hidden, or ignored the way a written scroll could be. Verse 19 calls the song a witness
          meant to outlast anything that could happen to a physical document.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to the book of the law Moses placed beside the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not trace it directly, but 2 Kings 22 records a copy of the law being
          rediscovered in the temple centuries later under King Josiah, after apparently going
          unread for years, exactly the kind of neglect Moses&apos;s extra safeguard of a song was
          meant to prevent.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God really know Israel would turn to other gods before it happened?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 16 to 18 say so plainly. Scripture treats this as God&apos;s knowledge of what
          Israel would freely do, not God forcing the outcome; Moses bases his own identical
          prediction in verse 27 on what he had personally watched Israel choose while still alive.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Moses when he died, and what does his age mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He was a hundred and twenty. Acts 7 later divides his life into three forty year stretches:
          growing up in Egypt, shepherding in Midian, and leading Israel through the wilderness, one
          long life spent almost entirely in exile from wherever he currently belonged.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was the law read publicly every seven years?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The seventh year lined up with the year of release at the feast of tabernacles, when the
          whole nation was already gathered in one place. Moses used that guaranteed gathering so
          every generation, children included, would hear the whole law at least once before
          reaching adulthood.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Deuteronomy 31 connect to the book of Joshua?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It sets up the transition directly. The same charge Moses gives Joshua here, be strong and
          of a good courage, is the first thing God says to Joshua once Moses is dead, confirming
          the leadership handoff was real and that God&apos;s presence transferred with it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Deuteronomy 31 the end of the Torah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not quite. Two chapters remain, the song of Deuteronomy 32 and Moses&apos;s final
          blessing and death in Deuteronomy 33 and 34, but Deuteronomy 31 is where Moses finishes
          every piece of unfinished business, the successor, the written law, and the song, before
          those closing chapters.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 31 is Moses doing paperwork, and it matters more than it sounds like it should.</p>
          <p>
            📌 <strong>The courage this chapter commands was never about the leader out front.</strong>{" "}
            Moses hands Joshua the exact same promise Israel just received, because the presence
            going ahead of them was never Moses to begin with.
          </p>
          <p>
            📌 <strong>Knowing what people will do and forcing what they do are not the same
            thing.</strong> God tells Moses exactly how Israel will fail, and Moses builds a safeguard
            anyway instead of shrugging at the inevitable.
          </p>
          <p>
            📌 <strong>A truth kept safe is not the same as a truth kept known.</strong> The book
            went into the ark for safekeeping. The song went into Israel&apos;s mouths so it could
            never be shelved and forgotten the same way.
          </p>
          <p>Here is your one next step from this chapter.</p>
          <p>
            Ask yourself honestly whether the truths you know best are the ones written down
            somewhere safe, or the ones you have actually let settle into memory the way this
            chapter insists they need to.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
