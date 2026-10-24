import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-20-explained", {
  title: "Leviticus 20 Explained: The Death Penalty Chapter of the Law",
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

export default function LeviticusTwentyExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-20-explained"
      title={<>📖 Leviticus 20 Explained: The Death Penalty Chapter of the Law</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Twenty seven verses. Ten different death sentences, and not one of them delivered the same way.</p>
            <p>
              <strong>Leviticus 20 explained</strong> is the chapter that finally answers a question{" "}
              <ArticleLink href="/blog/leviticus-18-explained">Leviticus 18</ArticleLink> left hanging.
              That chapter named which relationships were forbidden. This one names what happens to
              someone who breaks the law anyway, and the answer is not one single penalty handed out
              evenly. Some sins here end in stoning. One ends in fire. Others end only in a childless
              old age, with no human court sentence attached at all.
            </p>
            <p>Maybe you have assumed every sin on this list carried the exact same weight.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does cursing your own parent carry a death sentence in the middle of a chapter about sex?</li>
            <li>❓ What does it mean that God says He will personally cut off a man and his whole family?</li>
            <li>❓ Why do some incest cases in this chapter end in death, and others only in bearing guilt?</li>
            <li>❓ And why does a chapter about forbidden relationships end with a rule about clean and unclean animals?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 20 is not a flat list of death sentences. It is a careful, uneven
              scale, and the unevenness is the whole point.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the death sentence for Molech
              worship and the family it reaches beyond the guilty man himself, the call to holiness
              repeated a third time, the parent curse law tucked into the middle of it, the sexual sins
              Leviticus 18 already named now given a penalty, the cases that get a lighter sentence
              than you might expect, and the closing lines tying the whole chapter back to the land
              itself.
            </p>
            <p>Read slowly. The differences between these verses matter as much as what they have in common.</p>
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
            <ArticleLink href="/blog/leviticus-19-explained">Leviticus 19</ArticleLink> widened the
            lens from the family out to the field, the courtroom, and the marketplace, closing with
            honest scales and love for the stranger. Before that, Leviticus 18 drew the actual lines
            around who could be touched inside a family and who could not, and closed with a warning
            that the land itself had already paid a price for the nations that ignored those lines.
          </p>
          <p>
            Leviticus 20 goes back to finish what Leviticus 18 started. That chapter spent thirty
            verses naming forbidden relationships and almost never said what should happen to someone
            who crossed one of those lines anyway. This chapter closes that gap, relationship by
            relationship, and adds a few penalties Leviticus 18 never mentioned at all, cursing a
            parent, consulting a familiar spirit, and worshiping Molech.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 20 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Molech Worship, and the Family It Reaches Beyond the Guilty Man (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the one sin it treats as heaviest of all.</p>
        </div>
        <VerseQuote
          text="Again, thou shalt say to the children of Israel, Whosoever he be of the children of Israel, or of the strangers that sojourn in Israel, that giveth any of his seed unto Molech; he shall surely be put to death: the people of the land shall stone him with stones."
          reference="Leviticus 20:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Molech was worshiped by giving a child to be burned, the same practice{" "}
            <ArticleLink href="/blog/leviticus-18-explained">Leviticus 18:21</ArticleLink> already
            forbade without naming a penalty. Here the penalty is named plainly, death by stoning, and
            it applies equally to a native Israelite or a foreigner living among them.
          </p>
          <p>
            📌 <strong>God does not stop at punishing the man who does it. He adds a second layer no
            other sin in this chapter gets.</strong>
          </p>
        </div>
        <VerseQuote
          text="And I will set my face against that man, and will cut him off from among his people; because he hath given of his seed unto Molech, to defile my sanctuary, and to profane my holy name."
          reference="Leviticus 20:3"
        />
        <VerseQuote
          text="And if the people of the land do any ways hide their eyes from the man, when he giveth of his seed unto Molech, and kill him not: Then I will set my face against that man, and against his family, and will cut him off, and all that go a whoring after him, to commit whoredom with Molech, from among their people."
          reference="Leviticus 20:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Verse 2 names a human court&apos;s job, stoning by the people of the land. Verses 3 and 4
            name something the court cannot do at all, God Himself acting directly, in His own words,
            &quot;I will set my face against that man.&quot; If the community looks away and refuses to carry
            out the sentence, God says He will reach past the guilty man to his whole family. Looking
            away was never a safe third option.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Familiar Spirits, and Holiness Stated a Third Time (verses 6 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From Molech, the chapter turns to a different kind of counterfeit worship.</p>
        </div>
        <VerseQuote
          text="And the soul that turneth after such as have familiar spirits, and after wizards, to go a whoring after them, I will even set my face against that soul, and will cut him off from among his people."
          reference="Leviticus 20:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A familiar spirit describes a spirit people believed could be reached for guidance through
            a human medium, often understood as contact with the dead. King Saul later breaks this
            exact law, seeking out a medium at Endor the night before his final battle. Leviticus 19
            already forbade seeking one out. This verse attaches God&apos;s own direct judgment to it,
            &quot;I will even set my face against that soul,&quot; the same phrase just used for Molech.
          </p>
        </div>
        <VerseQuote
          text="Sanctify yourselves therefore, and be ye holy: for I am the LORD your God. And ye shall keep my statutes, and do them: I am the LORD which sanctify you."
          reference="Leviticus 20:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Be ye holy, for I am the LORD your God&quot; already opened Leviticus 19. Here it functions
            almost like a hinge, closing the first half of this chapter and bracing the reader for the
            list that is about to follow. Holiness is not simply the subject of a chapter. It is the
            reason every verse after this one carries the weight it does.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Cursing a Parent, in the Middle of a List About Sex (verse 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before the chapter turns to its long list of sexual sins, one verse interrupts with
            something that, at first glance, looks out of place.
          </p>
        </div>
        <VerseQuote
          text="For every one that curseth his father or his mother shall be surely put to death: he hath cursed his father or his mother; his blood shall be upon him."
          reference="Leviticus 20:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the same offense named in Exodus 21:17, and it sits here next to the
            same command Leviticus 19:3 already gave, fearing your father and mother.</strong> The
            chapter treats contempt for a parent as belonging to the same category as the sexual
            boundaries surrounding it, both are about who has authority over your life and your body,
            and whether you will honor the limits that authority sets.
          </p>
          <p>&quot;His blood shall be upon him&quot; places the responsibility for the sentence on the guilty person himself, not on the one who carries it out.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Leviticus 18&apos;s Sins, Now Given a Penalty (verses 10 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter now works back through relationships Leviticus 18 already forbade, this time
            naming exactly what happens when someone breaks the law anyway.
          </p>
        </div>
        <VerseQuote
          text="And the man that committeth adultery with another man’s wife, even he that committeth adultery with his neighbour’s wife, the adulterer and the adulteress shall surely be put to death."
          reference="Leviticus 20:10"
        />
        <VerseQuote
          text="And the man that lieth with his father’s wife hath uncovered his father’s nakedness: both of them shall surely be put to death; their blood shall be upon them."
          reference="Leviticus 20:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice that both parties share the sentence equally in these two verses, the man and the
            woman alike. &quot;Their blood shall be upon them&quot; repeats the same principle verse 9 just used
            for cursing a parent, responsibility for the sentence rests on the guilty, not on whoever
            enforces it.
          </p>
        </div>
        <VerseQuote
          text="And if a man lie with his daughter in law, both of them shall surely be put to death: they have wrought confusion; their blood shall be upon them."
          reference="Leviticus 20:12"
        />
        <VerseQuote
          text="If a man also lie with mankind, as he lieth with a woman, both of them have committed an abomination: they shall surely be put to death; their blood shall be upon them."
          reference="Leviticus 20:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 13 states the same prohibition Leviticus 18:22 already named, and attaches the same
            word, &quot;abomination.&quot; What Leviticus 18 only forbade, this verse sentences, the heaviest
            penalty this chapter has, applied equally to both men involved.
          </p>
          <p>Verse 14 then describes a penalty found nowhere else in this chapter.</p>
        </div>
        <VerseQuote
          text="And if a man take a wife and her mother, it is wickedness: they shall be burnt with fire, both he and they; that there be no wickedness among you."
          reference="Leviticus 20:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Every other sentence in this chapter is death by stoning or simply &quot;put to death&quot;
            without a method named. This is the one case in the whole chapter where the method itself
            is fire, and it is the only sin here involving three people at once rather than two.
          </p>
        </div>
        <VerseQuote
          text="And if a man lie with a beast, he shall surely be put to death: and ye shall slay the beast. And if a woman approach unto any beast, and lie down thereto, thou shalt kill the woman, and the beast: they shall surely be put to death; their blood shall be upon them."
          reference="Leviticus 20:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The law names this offense for a man and for a woman separately, in nearly identical
            language, rather than assuming it only needed stating once. Both the person and the animal
            are put to death in either case, a detail the text states without further comment.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Not Every Sin on This List Gets the Same Sentence (verses 17 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter now shifts to a set of relationships that, on the surface, look just as serious
            as the ones already listed, but the sentence attached to them changes.
          </p>
        </div>
        <VerseQuote
          text="And if a man shall take his sister, his father’s daughter, or his mother’s daughter, and see her nakedness, and she see his nakedness; it is a wicked thing; and they shall be cut off in the sight of their people: he hath uncovered his sister’s nakedness; he shall bear his iniquity."
          reference="Leviticus 20:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Compare this to verse 11. A man with his father&apos;s wife is put to death. A man
            with his sister is cut off and bears his iniquity, a real and serious consequence, but not
            the death sentence named just a few verses earlier.</strong> The chapter does not explain
            why the two relationships are weighed differently. It simply states a different sentence
            for each one.
          </p>
        </div>
        <VerseQuote
          text="And if a man shall lie with a woman having her sickness, and shall uncover her nakedness; he hath discovered her fountain, and she hath uncovered the fountain of her blood: and both of them shall be cut off from among their people."
          reference="Leviticus 20:18"
        />
        <VerseQuote
          text="And thou shalt not uncover the nakedness of thy mother’s sister, nor of thy father’s sister: for he uncovereth his near kin: they shall bear their iniquity."
          reference="Leviticus 20:19"
        />
        <VerseQuote
          text="And if a man shall lie with his uncle’s wife, he hath uncovered his uncle’s nakedness: they shall bear their sin; they shall die childless. And if a man shall take his brother’s wife, it is an unclean thing: he hath uncovered his brother’s nakedness; they shall be childless."
          reference="Leviticus 20:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ &quot;Die childless&quot; appears nowhere else in this chapter. For an aunt by marriage and a
            brother&apos;s wife, the stated consequence is not stoning and not being cut off from the
            community outright. It is living without the one thing an Israelite family depended on
            most, an heir to carry the family name forward.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 The Land, Clean and Unclean, and Belonging to the LORD (verses 22 to 27)
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by widening out from individual cases to the whole nation, the same way Leviticus 18 did.</p>
        </div>
        <VerseQuote
          text="Ye shall therefore keep all my statutes, and all my judgments, and do them: that the land, whither I bring you to dwell therein, spue you not out. And ye shall not walk in the manners of the nation, which I cast out before you: for they committed all these things, and therefore I abhorred them."
          reference="Leviticus 20:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Spue you not out&quot; repeats the same picture of the land vomiting out its inhabitants that{" "}
            <ArticleLink href="/blog/leviticus-18-explained">Leviticus 18:25</ArticleLink> already used
            for Canaan&apos;s previous residents. Israel is warned that the same fate waits for them if they
            copy what those nations did.
          </p>
          <p>Then, unexpectedly, the chapter brings in a subject it has not touched once until now.</p>
        </div>
        <VerseQuote
          text="Ye shall therefore put difference between clean beasts and unclean, and between unclean fowls and clean: and ye shall not make your souls abominable by beast, or by fowl, or by any manner of living thing that creepeth on the ground, which I have separated from you as unclean."
          reference="Leviticus 20:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <ArticleLink href="/blog/leviticus-11-explained">Leviticus 11</ArticleLink> already laid
            out the clean and unclean food laws in full detail. This verse does not repeat those
            details. It uses the category itself, the practice of telling clean apart from unclean, as
            one more picture of the same thing this entire chapter has been doing with relationships,
            drawing a line and keeping it.
          </p>
        </div>
        <VerseQuote
          text="And ye shall be holy unto me: for I the LORD am holy, and have severed you from other people, that ye should be mine."
          reference="Leviticus 20:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Severed you from other people, that ye should be mine&quot; is the real reason behind
            every penalty in this chapter.</strong> Israel was not being punished for its own sake. It
            was being kept distinct, on purpose, for a relationship with God that required that
            distinction to survive.
          </p>
          <p>The chapter&apos;s final verse circles back to exactly where the second section started.</p>
        </div>
        <VerseQuote
          text="A man also or woman that hath a familiar spirit, or that is a wizard, shall surely be put to death: they shall stone them with stones: their blood shall be upon them."
          reference="Leviticus 20:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 6 named familiar spirits as deserving God&apos;s own direct judgment. Verse 27 closes the
            loop, naming the human penalty, stoning, that verse 6 never specified. The chapter opens
            and closes on the same two counterfeit forms of worship, Molech and the familiar spirit,
            framing everything about family and sex that sits between them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 20 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does this chapter repeat relationships Leviticus 18 already forbade?</strong>{" "}
            Leviticus 18 states the boundary. Leviticus 20 answers the question that chapter left
            open, what happens when the boundary is crossed. Reading them side by side shows law and
            penalty were given in two separate stages rather than all at once.
          </p>
          <p>
            <strong>Does Leviticus 20:13 really call for the death penalty, and how does the New
            Testament treat the same subject?</strong> The verse is direct, forbidding sexual relations
            between men and naming a death sentence for it under Israel&apos;s civil law. The New Testament
            addresses the same subject again, in passages like Romans 1:26 and 27 and 1 Corinthians 6:9
            and 10, without repeating the civil penalty attached to it here. Most Christian traditions
            separate Israel&apos;s civil penalties, tied to its own national law, from its moral teaching,
            which carries forward.
          </p>
          <p>
            <strong>Why do verses 19 to 21 give a lighter sentence than verse 11 for what look like
            similar offenses?</strong> The text states the different sentences plainly, death for a
            father&apos;s wife, being cut off or dying childless for an aunt or a brother&apos;s wife, without
            explaining the reasoning behind the difference. What can be said honestly is that the
            chapter itself draws this line, and any claim beyond what the text states goes further
            than Leviticus 20 does.
          </p>
          <p>
            <strong>What does &quot;cut off from among his people&quot; actually mean?</strong> In some verses it
            sits beside a named human penalty, stoning in verses 2 and 27. In others, like verse 3&apos;s &quot;I
            will set my face against that man,&quot; it is God speaking in the first person about His own
            action, separate from anything a human court could carry out. The phrase does not always
            describe the same kind of judgment.
          </p>
          <p>
            <strong>Was the death penalty for Molech worship or cursing a parent actually carried out in
            Israel&apos;s history?</strong> Scripture records Israelites worshiping Molech anyway, generations
            later, including under king Manasseh, which suggests this law was not consistently enforced
            even though it remained on the books. The text commands the penalty. It does not claim every
            generation of Israel kept it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 20:26</h3>
        <VerseQuote
          text="And ye shall be holy unto me: for I the LORD am holy, and have severed you from other people, that ye should be mine."
          reference="Leviticus 20:26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The closest thing this chapter has to a thesis statement, naming the real reason behind every
          penalty just listed, belonging, not punishment for its own sake.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 20:9</h3>
        <VerseQuote
          text="For every one that curseth his father or his mother shall be surely put to death: he hath cursed his father or his mother; his blood shall be upon him."
          reference="Leviticus 20:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that breaks the pattern, interrupting a chapter about sexual sin to name contempt
          for a parent as carrying the exact same weight.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 20:4 and 5</h3>
        <VerseQuote
          text="And if the people of the land do any ways hide their eyes from the man, when he giveth of his seed unto Molech, and kill him not: Then I will set my face against that man, and against his family, and will cut him off, and all that go a whoring after him, to commit whoredom with Molech, from among their people."
          reference="Leviticus 20:4 and 5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that removes looking away as a safe option, naming God&apos;s own direct action against
          a man and his family if the community refuses to act.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 20:20 and 21</h3>
        <VerseQuote
          text="And if a man shall lie with his uncle’s wife, he hath uncovered his uncle’s nakedness: they shall bear their sin; they shall die childless. And if a man shall take his brother’s wife, it is an unclean thing: he hath uncovered his brother’s nakedness; they shall be childless."
          reference="Leviticus 20:20 and 21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Proof that this chapter is not a flat list. The same book that commands stoning a few verses
          earlier names childlessness as the consequence here instead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 20:7 and 8</h3>
        <VerseQuote
          text="Sanctify yourselves therefore, and be ye holy: for I am the LORD your God. And ye shall keep my statutes, and do them: I am the LORD which sanctify you."
          reference="Leviticus 20:7 and 8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The hinge in the middle of the chapter, repeating Leviticus 19&apos;s opening command and bracing
          the reader for the long list of penalties that follows.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 20 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 20 attaches penalties to the relationships Leviticus 18 forbade, adds a few new
          offenses of its own, Molech worship, cursing a parent, and consulting a familiar spirit, and
          closes by tying the whole chapter back to Israel&apos;s holiness and its hold on the land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 20 repeat laws from Leviticus 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 18 names forbidden relationships without stating what should happen to someone who
          breaks them. Leviticus 20 goes back through the same list and attaches a specific penalty to
          each one, which is why the two chapters read like companions rather than duplicates.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Bible really say to put someone to death for cursing their parents?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in Leviticus 20:9, the same offense named in Exodus 21:17. It is placed inside a list
          about sexual sin because both are treated as offenses against the authority God placed over a
          person&apos;s life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;cut off from among his people&quot; mean in Leviticus 20?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is not used the same way every time. Some verses pair it with a named human penalty like
          stoning. Others, like verse 3, use it as God&apos;s own first person statement, &quot;I will cut him
          off,&quot; separate from anything a human court could carry out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do some sins in Leviticus 20 get the death penalty and others do not?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 17 through 21 state lighter sentences, being cut off or dying childless, for
          relationships that look similar to ones punished by death earlier in the chapter. The text
          states the difference plainly without explaining the reasoning behind it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Leviticus 20:13 say, and how does the New Testament treat it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It forbids sexual relations between men and names a death sentence under Israel&apos;s civil law.
          The New Testament addresses the same subject again in Romans 1 and 1 Corinthians 6 without
          repeating the civil penalty, which most Christian traditions read as reaffirming the moral
          teaching while setting aside the national law tied to it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 20 end with a rule about clean and unclean animals?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 25 does not repeat the detailed food laws from Leviticus 11. It uses the same practice
          of telling clean apart from unclean as one more example of the line drawing this entire
          chapter has been doing with relationships.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the Molech death penalty actually enforced in Israel&apos;s history?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not consistently. Later Scripture records kings of Israel and Judah, including Manasseh,
          tolerating or even practicing Molech worship generations after this law was given, which shows
          the command existed without always being carried out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;die childless&quot; mean as a punishment in Leviticus 20?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It names a consequence without a human court sentence attached, the loss of an heir to carry
          the family name forward, used specifically for a man who takes his uncle&apos;s wife or his
          brother&apos;s wife.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Christians today still have to follow the penalties in Leviticus 20?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Christian traditions separate Israel&apos;s civil penalties, tied to its own law and
          government, from its moral teaching. The moral boundaries named in this chapter are reaffirmed
          elsewhere in the New Testament; the specific civil sentences are not treated as binding on
          Christians today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God say He will punish a man&apos;s whole family for Molech worship?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 4 and 5 attach that consequence specifically to a community that hides its eyes and
          refuses to act, not to the guilty man alone. The text frames looking away as its own kind of
          participation in the sin.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 20 is uncomfortable to read quickly, and the discomfort is doing real work.</p>
          <p>
            📌 <strong>This chapter refuses to treat every sin the same way.</strong> A father&apos;s wife
            brings death. An uncle&apos;s wife brings a childless life instead. The text itself draws that
            line, even where it does not explain it.
          </p>
          <p>
            📌 <strong>Looking away was never neutral.</strong> A community that refused to act against
            Molech worship did not escape judgment. It shared in it.
          </p>
          <p>
            📌 <strong>Every penalty in this chapter answers back to one verse near its middle,
            &quot;severed you from other people, that ye should be mine.&quot;</strong> The point was never
            punishment alone. It was belonging to God, kept distinct on purpose.
          </p>
          <p>
            You will likely never face a court applying these exact sentences. But the question
            underneath them has not gone anywhere, whether you treat the boundaries God sets as His to
            set, even the ones you cannot fully explain.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read back through Leviticus 20:26 today, and ask what it would look like for your own life
            to be visibly set apart, not identical to everyone around you.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
