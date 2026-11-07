import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-24-explained", {
  title: "Deuteronomy 24 Explained: Divorce, Pledges, and a Harvest for the Poor",
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

export default function DeuteronomyTwentyFourExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-24-explained"
      title={<>📖 Deuteronomy 24 Explained: Divorce, Pledges, and a Harvest for the Poor</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A piece of paper that ends a marriage. A tool you cannot take from a poor man. A row of grain nobody is allowed to pick up.</p>
            <p>
              <strong>Deuteronomy 24 explained</strong> is twenty two verses that keep circling
              back to the same question. What does it cost one person when another person holds
              power over them. A husband sending his wife away. A lender standing at a debtor&apos;s
              door. A boss deciding when to pay. A field owner deciding what to leave behind. Every
              law in this chapter answers that question with a limit on the one who holds the
              power.
            </p>
            <p>You may have skimmed this chapter once and filed it under rules nobody follows anymore.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Does this chapter mean God wanted people to get divorced?</li>
            <li>❓ Why could a man never take his first wife back?</li>
            <li>❓ Why does taking a millstone count as taking a man&apos;s life?</li>
            <li>❓ Why does Boaz&apos;s field show up in a law written here first?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Nearly every law in Deuteronomy 24 draws a line around someone who could
              be used and tells the person with the advantage exactly where that line sits.</strong>
            </p>
            <p>
              Walk through it slowly. A couple of these verses get pulled out of context more than
              almost anything else in Deuteronomy, and the chapter they actually sit in looks very
              different from the one line people usually quote.
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
            <ArticleLink href="/blog/deuteronomy-23-explained">Deuteronomy 23</ArticleLink> ended
            on a hungry traveler walking through someone else&apos;s vineyard, allowed to eat his
            fill by hand but never allowed to fill a basket to carry home.
          </p>
          <p>
            Deuteronomy 24 picks up that same question of who gets to touch someone else&apos;s
            property and when, then widens it. By the end of this chapter the field owner is not
            just tolerating a hungry traveler passing through. He is being told to leave grain,
            olives, and grapes behind on purpose, every single harvest, for people who have
            nothing of their own to glean.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 24 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Bill of Divorce, and Why Remarriage to the First Husband Was Forbidden (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens in the middle of a situation Moses assumes is already happening.</p>
        </div>
        <VerseQuote
          text="When a man hath taken a wife, and married her, and it come to pass that she find no favour in his eyes, because he hath found some uncleanness in her: then let him write her a bill of divorcement, and give it in her hand, and send her out of his house."
          reference="Deuteronomy 24:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the sentence structure. It is not a command to divorce. It is a condition, when
            a man does this, followed by a requirement for how he must do it. A written bill of
            divorcement, handed directly to the woman, replaced a husband simply throwing his wife
            out of the house with nothing. 📌 <strong>The paper did not create the problem. It put
            a limit on a problem Moses found already in front of him.</strong> It gave the woman
            proof of her status so she could remarry without being accused of adultery.
          </p>
          <p>The law then follows her into a second marriage, and a possible third situation.</p>
        </div>
        <VerseQuote
          text="And when she is departed out of his house, she may go and be another man's wife. And if the latter husband hate her, and write her a bill of divorcement, and giveth it in her hand, and sendeth her out of his house; or if the latter husband die, which took her to be his wife;"
          reference="Deuteronomy 24:2 and 3"
        />
        <VerseQuote
          text="Her former husband, which sent her away, may not take her again to be his wife, after that she is defiled; for that is abomination before the LORD: and thou shalt not cause the land to sin, which the LORD thy God giveth thee for an inheritance."
          reference="Deuteronomy 24:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The first husband is barred for good, even if the second marriage ends. ⚠️ <strong>
            The word defiled here does not accuse the woman of sin.</strong> It names what has
            happened to the marriage, not what she is guilty of. Without this rule, a husband could
            send his wife away on a whim, watch her remarry, then reclaim her the moment it was
            convenient again, treating her as property that circulates back to him. The law closes
            that door.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Full Year to Build a Marriage Before War (verse 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From a marriage ending, Moses turns straight to a marriage just beginning.</p>
        </div>
        <VerseQuote
          text="When a man hath taken a new wife, he shall not go out to war, neither shall he be charged with any business: but he shall be free at home one year, and shall cheer up his wife which he hath taken."
          reference="Deuteronomy 24:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 No army draft, no public office, no business obligation could override this. A new
            husband stayed home a full year for one stated purpose: to cheer up his wife. In a
            chapter that will spend the rest of its length protecting people with less power, a
            new bride gets protected first, before anyone else is even named.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Millstone, a Kidnapper, and What Both Laws Protect (verses 6 and 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two short, unrelated looking laws sit next to each other, and they share one target.</p>
        </div>
        <VerseQuote
          text="No man shall take the nether or the upper millstone to pledge: for he taketh a man's life to pledge."
          reference="Deuteronomy 24:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A household millstone ground the grain a family ate every day. Take either stone as
            collateral on a debt and the family cannot grind flour, cannot bake bread, and starts
            starving while the debt is still outstanding. 📌 <strong>Moses calls that taking a
            man&apos;s life, not just his property.</strong> A tool that keeps someone alive is
            never fair collateral, no matter how legal the loan is.
          </p>
          <p>Then the chapter turns from property that sustains life to a person sold as property.</p>
        </div>
        <VerseQuote
          text="If a man be found stealing any of his brethren of the children of Israel, and maketh merchandise of him, or selleth him; then that thief shall die; and thou shalt put evil away from among you."
          reference="Deuteronomy 24:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Kidnapping a fellow Israelite to sell him carried the death penalty, the harshest
            sentence this chapter hands down. A millstone law protects a family&apos;s next meal.
            A kidnapping law protects a person&apos;s whole future. Both laws refuse to let one
            person turn another person&apos;s survival into a transaction.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Leprosy, a Pledge Returned by Sundown, and a Laborer Paid the Same Day (verses 8 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A short, pointed warning interrupts the flow before Moses returns to lending.</p>
        </div>
        <VerseQuote
          text="Take heed in the plague of leprosy, that thou observe diligently, and do according to all that the priests the Levites shall teach you: as I commanded them, so ye shall observe to do. Remember what the LORD thy God did unto Miriam by the way, after that ye were come forth out of Egypt."
          reference="Deuteronomy 24:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Miriam was struck with leprosy for turning against Moses in Numbers 12, and the memory
            is dropped here as a one line warning against ignoring the priests&apos; diagnosis out
            of pride or favoritism. Then Moses comes back to a lender standing at someone&apos;s
            door.
          </p>
        </div>
        <VerseQuote
          text="When thou dost lend thy brother any thing, thou shalt not go into his house to fetch his pledge. Thou shalt stand abroad, and the man to whom thou dost lend shall bring out the pledge abroad unto thee."
          reference="Deuteronomy 24:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The lender does not get to walk into the debtor&apos;s home and pick through his
            belongings. He waits outside. The debtor chooses what to hand over, keeping some
            dignity inside his own door even while he owes a debt he cannot yet repay.{" "}
            <ArticleLink href="/blog/exodus-22-explained">
              Exodus 22 names the same rule from the other direction
            </ArticleLink>
            , and here it comes with a sharper picture of what the pledge usually was.
          </p>
        </div>
        <VerseQuote
          text="And if the man be poor, thou shalt not sleep with his pledge: In any case thou shalt deliver him the pledge again when the sun goeth down, that he may sleep in his own raiment, and bless thee: and it shall be righteousness unto thee before the LORD thy God."
          reference="Deuteronomy 24:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The pledge, in most cases, was a man&apos;s own outer garment, the coat he slept under
            at night. A lender could legally hold it as security, but not overnight, not while the
            man who owned it shivered without it. Returning it every evening is called
            righteousness, not generosity. Then the same sundown rule applies to a worker&apos;s
            wages.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt not oppress an hired servant that is poor and needy, whether he be of thy brethren, or of thy strangers that are in thy land within thy gates: At his day thou shalt give him his hire, neither shall the sun go down upon it; for he is poor, and setteth his heart upon it: lest he cry against thee unto the LORD, and it be sin unto thee."
          reference="Deuteronomy 24:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A day laborer earned his bread one day at a time, so holding his pay even
            one extra night could mean his family went hungry that night.</strong> Moses adds a
            weight to this one that the earlier laws in the chapter do not carry: an unpaid worker
            crying out to the LORD turns a late paycheck into the employer&apos;s sin.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Each Person Answers for Their Own Sin (verse 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A single verse sits alone between the labor laws and the closing section on justice.</p>
        </div>
        <VerseQuote
          text="The fathers shall not be put to death for the children, neither shall the children be put to death for the fathers: every man shall be put to death for his own sin."
          reference="Deuteronomy 24:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is a courtroom rule, not a statement about family or inheritance. A judge could
            not execute a son to punish his father&apos;s crime, or a father to punish his
            son&apos;s. ⚠️ <strong>Surrounding nations practiced exactly that, wiping out an
            entire household for one person&apos;s offense.</strong> Israel&apos;s courts were told
            to hold only the guilty person responsible, no matter how convenient it might have been
            to punish the whole family at once.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Justice for the Stranger, and a Harvest Left on Purpose (verses 17 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes on three groups named together over and over: the stranger, the fatherless, and the widow.</p>
        </div>
        <VerseQuote
          text="Thou shalt not pervert the judgment of the stranger, nor of the fatherless; nor take a widow's raiment to pledge: But thou shalt remember that thou wast a bondman in Egypt, and the LORD thy God redeemed thee thence: therefore I command thee to do this thing."
          reference="Deuteronomy 24:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A widow&apos;s garment could not be taken in pledge at all, no sundown exception
            needed, because she had no husband to appeal to if the lender refused to return it.
            The reason given is not a general appeal to fairness. It is Israel&apos;s own memory of
            slavery in Egypt, used here to argue for mercy rather than excuse for harshness.
          </p>
          <p>Then Moses turns the field itself into a law.</p>
        </div>
        <VerseQuote
          text="When thou cuttest down thine harvest in thy field, and hast forgot a sheaf in the field, thou shalt not go again to fetch it: it shall be for the stranger, for the fatherless, and for the widow: that the LORD thy God may bless thee in all the work of thine hands."
          reference="Deuteronomy 24:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A forgotten sheaf was not to be collected after the fact. The same refrain repeats for
            an olive tree beaten once and never gone over twice, then a vineyard.
          </p>
        </div>
        <VerseQuote
          text="When thou gatherest the grapes of thy vineyard, thou shalt not glean it afterward: it shall be for the stranger, for the fatherless, and for the widow."
          reference="Deuteronomy 24:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not charity left to a farmer&apos;s mood. It is a law written into
            every single harvest.</strong>{" "}
            <ArticleLink href="/blog/leviticus-19-explained">
              Leviticus 19 already commands leaving the corners of a field unharvested
            </ArticleLink>
            , and this chapter widens that same command across grain, olives, and grapes at once.
            The chapter ends exactly where it started, with Israel told to remember being a bondman
            in Egypt, this time as the reason to leave something behind for whoever has nothing of
            their own.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 24 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does Deuteronomy 24:1 to 4 mean God commands or approves of divorce?</strong>{" "}
            The text says what the text says. It regulates a bill of divorce that was already
            happening, it never commands anyone to divorce. Centuries later, the Pharisees asked
            Jesus directly about this exact law.
          </p>
        </div>
        <VerseQuote
          text="They say unto him, Why did Moses then command to give a writing of divorcement, and to put her away? He saith unto them, Moses because of the hardness of your hearts suffered you to put away your wives: but from the beginning it was not so."
          reference="Matthew 19:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus calls it a permission tied to human hardness of heart, not God&apos;s original
            design for marriage. Deuteronomy 24 limits the damage of something already broken. It
            does not celebrate it.
          </p>
          <p>
            <strong>Why could the first husband never remarry his first wife, even after her
            second marriage ended?</strong> The text gives the reason in verse 4 itself: taking her
            back is called an abomination that would cause the land to sin, without further
            explanation of the mechanism. Most readers take this as a guard against treating a
            wife as property that circulates back to a convenient owner whenever it suits him,
            closing off any temptation to use marriage and divorce as a revolving door.
          </p>
          <p>
            <strong>Does verse 16 contradict Exodus 20:5, where God speaks of visiting the
            iniquity of the fathers upon the children?</strong> The two verses are answering
            different questions. Deuteronomy 24:16 is a rule for Israel&apos;s human courts: a
            judge may only execute the person who actually committed the crime. Exodus 20:5
            describes a different reality entirely, the natural and spiritual ripple effect of sin
            passed down through a family&apos;s choices and habits, not a court sentence. Ezekiel
            later makes the same distinction Deuteronomy 24:16 draws for judges, applied to God
            Himself.
          </p>
        </div>
        <VerseQuote
          text="The soul that sinneth, it shall die. The son shall not bear the iniquity of the father, neither shall the father bear the iniquity of the son: the righteousness of the righteous shall be upon him, and the wickedness of the wicked shall be upon him."
          reference="Ezekiel 18:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was the death penalty for kidnapping in verse 7 too harsh?</strong> Selling a
            human being stripped a free Israelite of everything, his family, his land, his whole
            future, in a single act. Measured against that loss, Moses treats the crime as equal to
            murder, not as a lesser offense against property.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 24
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 24:6</h3>
        <VerseQuote
          text="No man shall take the nether or the upper millstone to pledge: for he taketh a man's life to pledge."
          reference="Deuteronomy 24:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A household tool protected by law because taking it away does not just cost property. It
          starves a family.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 24:15</h3>
        <VerseQuote
          text="At his day thou shalt give him his hire, neither shall the sun go down upon it; for he is poor, and setteth his heart upon it: lest he cry against thee unto the LORD, and it be sin unto thee."
          reference="Deuteronomy 24:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A late paycheck is treated as more than bad business. Withholding a poor man&apos;s wage
          overnight is named sin against God, not just a debt owed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 24:16</h3>
        <VerseQuote
          text="The fathers shall not be put to death for the children, neither shall the children be put to death for the fathers: every man shall be put to death for his own sin."
          reference="Deuteronomy 24:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Israel&apos;s courts could punish only the person who actually did the crime, at a time
          when wiping out a whole household for one man&apos;s offense was common practice
          elsewhere.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 24:19</h3>
        <VerseQuote
          text="When thou cuttest down thine harvest in thy field, and hast forgot a sheaf in the field, thou shalt not go again to fetch it: it shall be for the stranger, for the fatherless, and for the widow: that the LORD thy God may bless thee in all the work of thine hands."
          reference="Deuteronomy 24:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact law behind{" "}
          <ArticleLink href="/blog/who-was-ruth">
            Ruth gleaning in Boaz&apos;s field
          </ArticleLink>{" "}
          generations later. One law in Deuteronomy becomes the reason a destitute widow is not
          left with nothing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 24
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 24 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 24 covers a bill of divorce and its limits, a full year at home for a new
          husband, laws against taking a millstone or a person as collateral or property, leprosy,
          rules for lending and pledges, fair wages for a day laborer, individual responsibility
          before the court, and gleaning laws that left part of every harvest for the poor.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 24 command divorce?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verses 1 to 4 regulate a bill of divorce that was already happening in Israel, they
          do not instruct anyone to divorce. Jesus later calls this a permission tied to human
          hardness of heart, not God&apos;s original design for marriage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why could a man never remarry his first wife after she married someone else?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 4 calls it an abomination without spelling out the full mechanism. Most readers
          understand it as closing off any use of marriage and divorce as a revolving door, so a
          wife could never be passed back and forth between husbands whenever it became
          convenient.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was a millstone, and why did taking it in pledge count as taking a life?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A millstone ground the grain a household ate every day. Taking it as collateral on a debt
          left a family unable to make bread, which verse 6 calls taking a man&apos;s life, not
          just his property.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was kidnapping punished by death in verse 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Selling a fellow Israelite as property stripped him of his family, his land, and his
          entire future in one act. The law treats that loss as equal to murder.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does verse 16 mean a parent&apos;s sin never affects their children?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 16 is a rule for human courts, limiting a judge to punishing only the person who
          committed the crime. It is not a claim that sin never has any natural or spiritual ripple
          effect across a family, which other parts of Scripture describe differently.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did a pledge have to be returned by sundown?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The pledge was usually a poor man&apos;s own coat, the garment he slept under at night.
          Verses 12 and 13 require it back every evening so he is not left shivering through the
          night over an unpaid debt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What do the gleaning laws in verses 19 to 22 have to do with Ruth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          These verses command landowners to leave forgotten sheaves, extra olives, and extra
          grapes for the stranger, the fatherless, and the widow. Ruth, a widow with nothing of her
          own, survives by gleaning in Boaz&apos;s field under exactly this law, generations after
          Moses gave it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jesus ever quote this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. In Matthew 19, the Pharisees ask Jesus about this exact divorce law, and He answers
          that Moses permitted it because of hardness of heart, not because it reflected
          God&apos;s original design for marriage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 24 still apply to Christians today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The specific court procedures belonged to Israel&apos;s covenant system under the Law.
          The values underneath them, protecting a worker&apos;s wages, a debtor&apos;s dignity,
          and a harvest for the poor, carry straight into how the New Testament calls Christians to
          treat anyone with less power than they have.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 24 reads like unrelated rules until you notice who every single one protects.</p>
          <p>
            📌 <strong>A limit on power is not the same as approval of what it limits.</strong> The
            divorce law does not celebrate divorce, and the pledge laws do not celebrate debt.
            Both regulate something painful rather than endorse it.
          </p>
          <p>
            📌 <strong>Mercy here is written into the ordinary mechanics of daily life, not left to
            feeling generous.</strong> A returned coat, a same day wage, and a forgotten sheaf were
            all commanded, not suggested.
          </p>
          <p>
            You are not standing in a grain field this week, but you probably hold some kind of
            power over someone else right now, as an employer, a lender, a landlord, or just the
            person with more options in a relationship.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask where your own power over someone else could use a limit like the ones Moses writes
            here, then set that limit before anyone has to ask you for it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
