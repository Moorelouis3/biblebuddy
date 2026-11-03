import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-8-explained", {
  title: "Deuteronomy 8 Explained: Remember the Wilderness, Beware the Wealth",
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

export default function DeuteronomyEightExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-8-explained"
      title={<>📖 Deuteronomy 8 Explained: Remember the Wilderness, Beware the Wealth</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Forty years of manna. Clothes that never wore out. Feet that never swelled.</p>
            <p>
              <strong>Deuteronomy 8 explained</strong> is Moses looking back at the wilderness
              Israel just survived and telling them exactly why God kept them hungry, kept them
              dependent, and kept them walking for so long before ever letting them see the land He
              promised.
            </p>
            <p>Maybe you have only ever heard this chapter quoted for one line, the one Jesus used against the devil.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did God let Israel go hungry on purpose before feeding them manna?</li>
            <li>❓ What does it mean that man does not live by bread alone?</li>
            <li>❓ Why does a chapter about a good land spend most of its words warning about pride?</li>
            <li>❓ Does God test people to find something out He does not already know?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 8 names the one danger success carries that hunger never
              did: the quiet thought that you built this yourself.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the reason for the
              wilderness, the manna and the sentence Jesus later quotes word for word, the good
              land waiting ahead, the warning buried inside every blessing in it, and the exact
              line Moses puts in Israel&apos;s mouth that he is trying to stop them from ever
              saying.
            </p>
            <p>Twenty verses, and the second half rewrites what the first half just taught.</p>
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
            <ArticleLink href="/blog/deuteronomy-7-explained">Deuteronomy 7</ArticleLink> ended
            with a warning about gold stripped off a melted down idol, a danger so small most
            people would walk right past it. Moses had just spent the whole chapter explaining
            why Israel could not make peace with the nations already living in the land, because
            the real threat was never military. It was a heart pulled toward other gods.
          </p>
          <p>
            Deuteronomy 8 turns from the nations Israel will face to the land itself, and to
            Israel&apos;s own heart once that land actually starts providing. Moses has one
            sermon left to finish before the people cross the Jordan, and here he stops to explain
            the forty years behind them before he says one more word about the future in front of
            them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 8 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Why the Wilderness Happened at All (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens with a command, then immediately turns to explain the forty years just finished.</p>
        </div>
        <VerseQuote
          text="All the commandments which I command thee this day shall ye observe to do, that ye may live, and multiply, and go in and possess the land which the LORD sware unto your fathers."
          reference="Deuteronomy 8:1"
        />
        <VerseQuote
          text="And thou shalt remember all the way which the LORD thy God led thee these forty years in the wilderness, to humble thee, and to prove thee, to know what was in thine heart, whether thou wouldest keep his commandments, or no."
          reference="Deuteronomy 8:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Remember all the way&quot; is the key phrase of the whole
            chapter.</strong> Not just remember that God exists, remember the actual route. Every
            hungry stretch, every water shortage, every year that felt like wasted time had a
            purpose attached to it: to humble, to prove, to know what was really in Israel&apos;s
            heart.
          </p>
          <p>
            💡 Humbling and proving are not the same thing. Humbling strips away what a person
            leans on besides God. Proving reveals what was underneath that reliance all along, now
            that it has been stripped away.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Manna, and the Sentence Jesus Later Quotes (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses names the specific test, the one most people only remember as a story about food.</p>
        </div>
        <VerseQuote
          text="And he humbled thee, and suffered thee to hunger, and fed thee with manna, which thou knewest not, neither did thy fathers know; that he might make thee know that man doth not live by bread only, but by every word that proceedeth out of the mouth of the LORD doth man live."
          reference="Deuteronomy 8:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The order matters. God let the hunger come first, on purpose, before the manna ever
            fell. <ArticleLink href="/blog/exodus-16-explained">Exodus 16</ArticleLink> tells the
            actual story, a food Israel had never seen before, with no name of its own, appearing
            every morning on ground that grew nothing else. The point was never only to keep
            Israel alive. It was to make Israel watch their life depend on something they could
            not grow, store, or explain.
          </p>
          <p>
            📌 <strong>&quot;Man doth not live by bread only, but by every word that proceedeth
            out of the mouth of the LORD&quot; is the verse this whole chapter exists to teach.</strong>{" "}
            Bread keeps a body alive. This verse says a person&apos;s actual life runs on
            something bread was never able to supply on its own.
          </p>
          <p>Centuries later, hungry in a different wilderness, Jesus faces the exact same test and answers it the exact same way.</p>
        </div>
        <VerseQuote
          text="And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread. But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."
          reference="Matthew 4:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The devil&apos;s offer to Jesus was not sinful food. It was a shortcut around
            trusting His Father for the next meal, the same shortcut manna refused to let Israel
            take. Where Israel&apos;s complaints about hunger run through{" "}
            <ArticleLink href="/blog/exodus-16-explained">Exodus 16</ArticleLink> and{" "}
            <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink>, Jesus simply
            quotes the verse Israel was supposed to have learned, and holds it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Clothes That Did Not Wear Out, Discipline Like a Father Gives (verses 4 and 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses adds a detail easy to read past, because nothing happening is the whole point of it.</p>
        </div>
        <VerseQuote
          text="Thy raiment waxed not old upon thee, neither did thy foot swell, these forty years."
          reference="Deuteronomy 8:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            👀 No burned sandals. No worn out robes. No swollen feet after forty years of walking
            a desert on foot. Scripture never records this as a miracle the way it records the Red
            Sea or the manna, because nobody noticed it happening in real time. A provision this
            quiet is still a provision.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt also consider in thine heart, that, as a man chasteneth his son, so the LORD thy God chasteneth thee."
          reference="Deuteronomy 8:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses names the forty years &quot;chastening,&quot; and chastening in this
            verse means formation, not a sentence being served.</strong> A father who disciplines a
            son is not trying to destroy him. He is trying to shape someone who can be trusted with
            more than he currently has. Hunger, dependence, and a wardrobe that never failed were
            all part of raising a nation that could be handed an entire land without falling apart
            the moment it arrived.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Good Land, Named Item by Item (verses 6 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Having explained the wilderness, Moses finally turns to what waits on the other side of it.</p>
        </div>
        <VerseQuote
          text="Therefore thou shalt keep the commandments of the LORD thy God, to walk in his ways, and to fear him. For the LORD thy God bringeth thee into a good land, a land of brooks of water, of fountains and depths that spring out of valleys and hills; A land of wheat, and barley, and vines, and fig trees, and pomegranates; a land of oil olive, and honey; A land wherein thou shalt eat bread without scarceness, thou shalt not lack any thing in it; a land whose stones are iron, and out of whose hills thou mayest dig brass."
          reference="Deuteronomy 8:6 to 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every single item on this list is something the wilderness could not
            give.</strong> Running water instead of a rock struck for a trickle. Fruit trees
            instead of a food with no name. Metal in the hills instead of nothing to build with at
            all. Moses is not describing comfort in the abstract. He is naming the precise
            opposite of forty years of lack, feature by feature.
          </p>
          <p>Then the chapter turns to what Israel is supposed to do once all of it arrives.</p>
        </div>
        <VerseQuote
          text="When thou hast eaten and art full, then thou shalt bless the LORD thy God for the good land which he hath given thee."
          reference="Deuteronomy 8:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Blessing God when full is a harder discipline than crying out to Him when hungry.
            Hunger makes dependence obvious. A full table has to be blessed on purpose, because
            nothing about being full naturally points back to where it came from.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Sentence Moses Is Trying to Keep Out of Israel&apos;s Mouth (verses 11 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Verse 10 was the goal. Everything from here forward is Moses naming exactly how that goal gets lost.</p>
        </div>
        <VerseQuote
          text="Beware that thou forget not the LORD thy God, in not keeping his commandments, and his judgments, and his statutes, which I command thee this day: Lest when thou hast eaten and art full, and hast built goodly houses, and dwelt therein; And when thy herds and thy flocks multiply, and thy silver and thy gold is multiplied, and all that thou hast is multiplied; Then thine heart be lifted up, and thou forget the LORD thy God, which brought thee forth out of the land of Egypt, from the house of bondage;"
          reference="Deuteronomy 8:11 to 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the order Moses lays out.</strong> Full stomach, then a house built,
            then herds and silver and gold all multiplying at once. Forgetting God is not pictured
            as one dramatic rejection. It is pictured as a slow drift that keeps pace with every
            good thing arriving on schedule.
          </p>
          <p>Moses then reaches back into the exact wilderness this chapter opened with, and names it again.</p>
        </div>
        <VerseQuote
          text="Who led thee through that great and terrible wilderness, wherein were fiery serpents, and scorpions, and drought, where there was no water; who brought thee forth water out of the rock of flint; Who fed thee in the wilderness with manna, which thy fathers knew not, that he might humble thee, and that he might prove thee, to do thee good at thy latter end;"
          reference="Deuteronomy 8:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;To do thee good at thy latter end&quot; reframes the whole wilderness one more
            time. The hunger, the snakes, the drought were never only a test to pass. They were
            preparation for a future Israel had not reached yet, aimed the entire time at the good
            land now standing in front of them.
          </p>
          <p>Then comes the line Moses has been building toward since verse 11, and it is the real target of this whole section.</p>
        </div>
        <VerseQuote
          text="And thou say in thine heart, My power and the might of mine hand hath gotten me this wealth."
          reference="Deuteronomy 8:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the actual danger named in this chapter, and it is sharper than
            simply forgetting God exists.</strong> It is crediting your own hand for something you
            did not actually produce alone. Not atheism. Self-sufficiency, wearing the exact same
            clothes as gratitude until you look closely at what it is actually thanking.
          </p>
          <p>Moses answers that exact sentence before Israel ever gets to finish thinking it.</p>
        </div>
        <VerseQuote
          text="But thou shalt remember the LORD thy God: for it is he that giveth thee power to get wealth, that he may establish his covenant which he sware unto thy fathers, as it is this day."
          reference="Deuteronomy 8:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses does not deny that Israel&apos;s own hands will do real work to earn
            this wealth.</strong> He corrects where the power behind that work came from. Even the
            strength in the hand that plants a field or trades at a market is named here as a gift,
            not a personal resource with no source outside yourself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Warning Closes Where Deuteronomy 7 Started (verses 19 and 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends on a consequence stated as plainly as the blessing was.</p>
        </div>
        <VerseQuote
          text="And it shall be, if thou do at all forget the LORD thy God, and walk after other gods, and serve them, and worship them, I testify against you this day that ye shall surely perish. As the nations which the LORD destroyeth before your face, so shall ye perish; because ye would not be obedient unto the voice of the LORD your God."
          reference="Deuteronomy 8:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;As the nations&quot; ties this warning directly back to{" "}
            <ArticleLink href="/blog/deuteronomy-7-explained">Deuteronomy 7</ArticleLink>, the
            chapter that just finished naming seven nations about to be removed from the land for
            exactly this reason.</strong> Moses is not inventing a new threat for Israel. He is
            telling them, in plain words, that the same fate waiting for those nations is not
            automatically off limits to Israel just because they carry a different name and a
            different covenant. Forgetting God is the one thing the promise never covers.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 8 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does God need to test Israel if He already knows their hearts?</strong> The
            testing in verse 2 is for Israel&apos;s own knowledge, not God&apos;s. The verse itself
            says it plainly: to know what was in Israel&apos;s heart. God is not described as
            learning something new. Israel is described as discovering, through forty years of
            lived experience rather than a guess, what they actually trusted when the easy answers
            ran out. <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink> shows
            an earlier generation failing that exact test, at the very start of the wilderness
            years this chapter now looks back on.
          </p>
          <p>
            <strong>Is the wilderness &quot;chastening&quot; in verse 5 punishment for Israel&apos;s
            sin, or something else?</strong> The word covers both ideas elsewhere in Scripture, but
            this chapter frames it as formation aimed at a future good, &quot;to do thee good at thy
            latter end,&quot; not as payment for a specific offense. Earlier wilderness punishments,
            like the forty years handed down after the spies&apos; rebellion, were disciplinary in a
            sharper sense. Deuteronomy 8 describes the same years from the far side, as the shaping a
            son receives from a father who intends to hand him something real.
          </p>
          <p>
            <strong>Does verse 18 mean work and ability contribute nothing to getting wealth?</strong>{" "}
            No. The verse names God as the one who gives the power to get wealth, not as the one who
            gets the wealth instead of the person working for it. Moses is correcting where the
            credit for that power belongs, not telling Israel their own labor is meaningless. The
            danger named in verse 17 is forgetting the source of the ability, not the existence of
            the effort.
          </p>
          <p>
            <strong>How literally should the clothes and feet of verse 4 be taken?</strong> The text
            states it as a plain fact about the forty years, without hedging it as a figure of
            speech, the same way it states the manna and the water from the rock as fact. Most
            readers take it the same way they take the rest of the wilderness provision in this
            chapter: a real, sustained provision that simply drew less attention at the time than a
            sea splitting apart.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 8
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 8:3</h3>
        <VerseQuote
          text="And he humbled thee, and suffered thee to hunger, and fed thee with manna, which thou knewest not, neither did thy fathers know; that he might make thee know that man doth not live by bread only, but by every word that proceedeth out of the mouth of the LORD doth man live."
          reference="Deuteronomy 8:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse Jesus quotes word for word against the devil in the wilderness, centuries
          after an earlier generation was first taught it through forty years of manna.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 8:2</h3>
        <VerseQuote
          text="And thou shalt remember all the way which the LORD thy God led thee these forty years in the wilderness, to humble thee, and to prove thee, to know what was in thine heart, whether thou wouldest keep his commandments, or no."
          reference="Deuteronomy 8:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that explains every hard year behind Israel in one sentence: not punishment for
          its own sake, but a test meant to surface what their own hearts actually trusted.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 8:10</h3>
        <VerseQuote
          text="When thou hast eaten and art full, then thou shalt bless the LORD thy God for the good land which he hath given thee."
          reference="Deuteronomy 8:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one instruction that should have been easy and almost never is. Gratitude when
          hungry comes naturally. Gratitude when full has to be chosen.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 8:17 and 18</h3>
        <VerseQuote
          text="And thou say in thine heart, My power and the might of mine hand hath gotten me this wealth. But thou shalt remember the LORD thy God: for it is he that giveth thee power to get wealth."
          reference="Deuteronomy 8:17 and 18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact sentence Moses is trying to keep out of Israel&apos;s mouth, answered in the
          very next breath with where the power behind their own hands actually came from.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 8:5</h3>
        <VerseQuote
          text="Thou shalt also consider in thine heart, that, as a man chasteneth his son, so the LORD thy God chasteneth thee."
          reference="Deuteronomy 8:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A single sentence that reframes forty hard years as fatherly formation instead of a
          punishment with no purpose attached to it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 8
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 8 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 8 explains why God led Israel through forty years of hunger and manna in the
          wilderness, describes the good land waiting ahead, and warns Israel not to forget God or
          credit their own strength once that land makes them wealthy and full.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;man does not live by bread alone&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means physical food keeps a body functioning, but a person&apos;s actual life depends
          on something food alone cannot supply, obedience to and dependence on what God says.
          Deuteronomy 8:3 ties the statement directly to the manna, a food Israel could not grow or
          explain on its own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Jesus quote Deuteronomy 8:3 to the devil?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In Matthew 4:4, the devil offers hungry Jesus a shortcut, turning stones to bread outside
          His Father&apos;s timing. Jesus answers with the exact verse Israel was given in the
          wilderness, holding to trust in God&apos;s provision over an immediate, self-made fix.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God let Israel go hungry before giving them manna?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 8:2 and 3 say the hunger came first on purpose, to humble Israel and reveal
          what they actually trusted once their own resources ran out. The manna then taught them
          to depend on provision they could not produce or predict themselves.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does God test people to find out something He does not know?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Deuteronomy 8:2 describes the testing as revealing what was in Israel&apos;s own
          heart, which is knowledge for Israel, not new information for God. The forty years
          surfaced through lived experience what a quick answer never could have proven.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does a chapter about a good land spend so much time warning about pride?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Moses already knows what comfort tends to do. Verses 12 to 14 describe forgetting
          God arriving gradually, keeping pace with full houses, growing flocks, and multiplying
          silver and gold, not as one dramatic rejection but as a slow drift success makes easy to miss.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God chastens like a father chastens a son?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 8:5 describes the wilderness years as formation rather than a sentence being
          served. A father disciplines a son to shape him into someone who can be trusted with more,
          which is exactly what verse 16 says the hardship was aimed at: doing Israel good at their
          latter end.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Deuteronomy 8:17 and 18 teach about work and wealth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It corrects where credit for wealth belongs without dismissing the work itself. Verse 18
          names God as the one who gives the power to get wealth, meaning the ability behind the
          labor is a gift, even while the labor remains real and necessary.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Deuteronomy 8 mention clothes that did not wear out?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 4 names it as one more form of provision during forty years of wilderness travel,
          alongside the manna and the water from the rock. It is a quieter miracle than the Red Sea,
          but the chapter states it as plain fact about what Israel actually experienced.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Deuteronomy 8 connect to Deuteronomy 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 8:19 and 20 close the warning by pointing back to the nations Deuteronomy 7
          names as being removed from the land for forgetting God and serving other gods. Moses
          tells Israel plainly that their covenant does not exempt them from the same outcome if
          they forget God the same way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the main lesson of Deuteronomy 8 for today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That comfort and success test a person as seriously as hardship does, often more quietly.
          The chapter&apos;s core instruction, remembering that every ability to produce anything
          traces back to God, applies just as directly to a full bank account today as it did to a
          field of wheat and a herd of cattle in Deuteronomy&apos;s own day.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 8 spends half its words on hunger and half on wealth, and the second half is the harder test.</p>
          <p>
            📌 <strong>The wilderness was never wasted time.</strong> Every hungry year was aimed at
            a heart Israel could not have seen clearly any other way, and at a good at their latter
            end they had not reached yet.
          </p>
          <p>
            📌 <strong>Man does not live by bread alone.</strong> Jesus proved that sentence could be
            held under real hunger, succeeding at the exact test an earlier generation was only ever
            given the chance to learn.
          </p>
          <p>
            📌 <strong>&quot;My power and the might of mine hand&quot; is the sentence to watch
            for.</strong> It rarely announces itself as rejecting God. It just quietly moves the
            credit for everything good onto your own two hands.
          </p>
          <p>
            You are probably not counting manna this week. But something in your life right now,
            paid off, built, or earned, is quietly tempting you to finish that exact sentence Moses
            warned against.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one thing you have been crediting to your own power and the might of your own
            hand, and hand the credit for it back to the one who actually gave you the power to get it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
