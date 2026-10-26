import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-5-explained", {
  title: "Numbers 5 Explained: Camp Purity, Restitution, and the Law of Jealousy",
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

export default function NumbersFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-5-explained"
      title={<>📖 Numbers 5 Explained: Camp Purity, Restitution, and the Law of Jealousy</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Three separate problems, three separate laws, and one question running underneath all of them: what happens when something unclean gets inside a camp where God Himself lives.</p>
            <p>
              <strong>Numbers 5 explained</strong> moves away from carrying furniture and counting men and lands on
              something messier. Who gets sent outside the camp. What a person owes after wronging someone else. And
              what a husband could do when he suspected his wife of unfaithfulness but had no witness and no proof.
            </p>
            <p>None of these three laws reads like the orderly chapters right before it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a skin disease get a person physically removed from camp?</li>
            <li>❓ Why does paying someone back require paying extra on top?</li>
            <li>❓ What actually happened to a woman forced to drink the &quot;bitter water&quot;?</li>
            <li>❓ And why is there no matching test for a husband a wife suspects?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Numbers 5 is about guarding the space where God dwells, from three different directions at
              once: disease, debt, and suspicion.</strong>
            </p>
            <p>
              This walkthrough goes through the chapter in order: who had to leave the camp and why, the law that
              made a wrong debt require more than repayment, and the long, uncomfortable ritual a jealous husband
              could put his wife through when he had no other way to settle his doubt.
            </p>
            <p>This is not an easy chapter. It is worth reading honestly instead of skipping past.</p>
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
            <ArticleLink href="/blog/numbers-4-explained">Numbers 4</ArticleLink> finished the long logistics project
            that started back in Numbers 1: the camp counted, arranged, and now fully trained in exactly how to pack
            up and carry the tabernacle without anyone dying in the process. Every man had a job. Every holy object
            had a covering. The structure was finally in place.
          </p>
          <p>
            Numbers 5 asks a different question than any of the first four chapters. Structure keeps a camp organized.
            It does not keep a camp clean. This chapter turns from who carries what to what has to be kept out, paid
            back, or settled before God&apos;s presence in the center of the camp means anything at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 5 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Put Outside the Camp (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a short, direct command naming three groups who could not stay inside the camp.</p>
        </div>
        <VerseQuote
          text="Command the children of Israel, that they put out of the camp every leper, and every one that hath an issue, and whosoever is defiled by the dead: Both male and female shall ye put out, without the camp shall ye put them; that they defile not their camps, in the midst whereof I dwell."
          reference="Numbers 5:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A <strong>leper</strong> here means anyone with the skin condition described in{" "}
            <ArticleLink href="/blog/leviticus-13-explained">Leviticus 13</ArticleLink>, not specifically the disease
            modern medicine calls leprosy today. Someone with &quot;an issue&quot; had a bodily discharge, the same
            category of uncleanness{" "}
            <ArticleLink href="/blog/leviticus-15-explained">Leviticus 15</ArticleLink> already laid out in detail.
            Contact with a dead body made a person ceremonially unclean regardless of how careful or accidental the
            contact was.
          </p>
          <p>
            📌 <strong>Read the reason God gives, and the whole law stops sounding like disgust at illness.</strong>{" "}
            &quot;That they defile not their camps, in the midst whereof I dwell.&quot; This is not about punishing
            sick people. It is about the fact that God&apos;s own dwelling place sat in the exact center of this
            camp, the same center Numbers 2 described the tabernacle occupying. Nothing about uncleanness here was
            ever just a health rule floating on its own.
          </p>
          <p>Verse 4 closes the point in one plain line.</p>
        </div>
        <VerseQuote
          text="And the children of Israel did so, and put them out without the camp: as the LORD spake unto Moses, so did the children of Israel."
          reference="Numbers 5:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            No argument, no exceptions recorded, no case where someone talked their way around it. The same obedience
            that closed Numbers 1 and Numbers 2 shows up again here, even on a command that must have meant real
            personal loss for the people it applied to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Debt That Costs More Than It Took (verses 5 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From bodily uncleanness, the chapter turns to a wrong done against another person.</p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, When a man or woman shall commit any sin that men commit, to do a trespass against the LORD, and that person be guilty; Then they shall confess their sin which they have done: and he shall recompense his trespass with the principal thereof, and add unto it the fifth part thereof, and give it unto him against whom he hath trespassed."
          reference="Numbers 5:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the chain this verse draws. A wrong against another person is called &quot;a trespass against the
            LORD.&quot; Harming your neighbor and sinning against God are not two separate categories here. They are
            the same act seen from two angles.
          </p>
          <p>
            💡 <strong>Repaying exactly what was taken was never enough.</strong> &quot;The fifth part&quot; means
            twenty percent on top of what is owed, confessed openly and paid directly to the person wronged, not
            quietly settled in private. A debt in Israel came with an admission attached to it.
          </p>
          <p>And the law covers the one case where paying the person back is no longer possible.</p>
        </div>
        <VerseQuote
          text="But if the man have no kinsman to recompense the trespass unto, let the trespass be recompensed unto the LORD, even to the priest; beside the ram of the atonement, whereby an atonement shall be made for him."
          reference="Numbers 5:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The debt did not simply disappear because the person it was owed to was gone.</strong> It went
            to the priest instead, and the sin still required an atoning sacrifice on top of it. Death did not cancel
            what was owed. It only changed who collected it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Husband&apos;s Suspicion, With No Witness (verses 11 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter now moves into its longest and hardest section, what the rest of Scripture later came to call
            the law of jealousy.
          </p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, and say unto them, If any man's wife go aside, and commit a trespass against him, And a man lie with her carnally, and it be hid from the eyes of her husband, and be kept close, and she be defiled, and there be no witness against her, neither she be taken with the manner;"
          reference="Numbers 5:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Adultery already carried a death penalty under the law described in{" "}
            <ArticleLink href="/blog/exodus-20-explained">Exodus 20</ArticleLink>, but that penalty required a
            witness or a confession. This section deals with exactly the case where neither exists. No one saw
            anything. No one caught her in the act. There is only a husband&apos;s suspicion, with nothing to prove
            or disprove it.
          </p>
          <p>Verse 14 names the problem the rest of the chapter exists to solve.</p>
        </div>
        <VerseQuote
          text="And the spirit of jealousy come upon him, and he be jealous of his wife, and she be defiled: or if the spirit of jealousy come upon him, and he be jealous of his wife, and she be not defiled:"
          reference="Numbers 5:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Read that verse closely and notice what it refuses to assume. The exact same suspicion could land on a
            guilty wife or an innocent one. The husband himself had no way to tell which. Without some kind of
            process, that doubt had nowhere to go except to fester, or to end in a husband simply divorcing her, or
            worse, on nothing but a feeling.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Before the LORD: the Offering, the Oath, and the Bitter Water (verses 15 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whatever this process is, it does not happen privately between husband and wife. It moves straight to the priest.</p>
        </div>
        <VerseQuote
          text="Then shall the man bring his wife unto the priest, and he shall bring her offering for her, the tenth part of an ephah of barley meal; he shall pour no oil upon it, nor put frankincense thereon; for it is an offering of jealousy, an offering of memorial, bringing iniquity to remembrance."
          reference="Numbers 5:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every detail of this offering is deliberately plain.</strong> Barley was a lesser grain than
            the wheat used in most grain offerings. No oil, no frankincense, none of the things that normally made an
            offering pleasant. This offering was not meant to look or smell like celebration. Its whole purpose was
            named out loud in its own description: bringing iniquity to remembrance.
          </p>
          <p>The priest then brings the woman before the LORD and prepares the test itself.</p>
        </div>
        <VerseQuote
          text="And the priest shall take holy water in an earthen vessel; and of the dust that is in the floor of the tabernacle the priest shall take, and put it into the water: And the priest shall set the woman before the LORD, and uncover the woman's head, and put the offering of memorial in her hands, which is the jealousy offering: and the priest shall have in his hand the bitter water that causeth the curse:"
          reference="Numbers 5:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            An earthen vessel, holy water, and dust from the tabernacle floor itself. Whatever power this water carried,
            the text ties it directly to the ground of God&apos;s own dwelling place, not to any ingredient with
            effects of its own.
          </p>
          <p>
            Before she drinks anything, the priest makes her swear an oath that cuts both ways.
          </p>
        </div>
        <VerseQuote
          text="And the priest shall charge her by an oath, and say unto the woman, If no man have lain with thee, and if thou hast not gone aside to uncleanness with another instead of thy husband, be thou free from this bitter water that causeth the curse: But if thou hast gone aside to another instead of thy husband, and if thou be defiled, and some man have lain with thee beside thine husband: Then the priest shall charge the woman with an oath of cursing, and the priest shall say unto the woman, The LORD make thee a curse and an oath among thy people, when the LORD doth make thy thigh to rot, and thy belly to swell;"
          reference="Numbers 5:19 to 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The oath states innocence first, not guilt.</strong> Before the curse is ever spoken, the
            woman hears plainly that if she is innocent, the water does nothing to her at all. The curse is
            conditional, named out loud in her hearing, and she answers it herself.
          </p>
        </div>
        <VerseQuote
          text="And this water that causeth the curse shall go into thy bowels, to make thy belly to swell, and thy thigh to rot: And the woman shall say, Amen, amen."
          reference="Numbers 5:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 That one word at the end of the verse is easy to read past. &quot;Amen, amen&quot; here is the first
            time the word appears anywhere in the Bible, spoken by a woman agreeing out loud to a curse that will
            fall on her if she is lying. Whatever this ritual was, it did not run on silent suspicion. It ran on a
            sworn, spoken, witnessed oath that she herself had to answer.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Guilty or Clean: What the Water Decided (verses 23 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The priest finishes the ritual by recording the exact words of the curse before anything is actually tested.</p>
        </div>
        <VerseQuote
          text="And the priest shall write these curses in a book, and he shall blot them out with the bitter water: And he shall cause the woman to drink the bitter water that causeth the curse: and the water that causeth the curse shall enter into her, and become bitter."
          reference="Numbers 5:23 and 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The written curse, washed off the page into the same water she then drinks, ties the spoken oath and the
            physical test into one act. There is no separate verdict handed down later. The water itself becomes the
            verdict.
          </p>
          <p>
            Before she drinks, one more offering happens, the same grain brought back into the ritual at its center.
          </p>
        </div>
        <VerseQuote
          text="Then the priest shall take the jealousy offering out of the woman's hand, and shall wave the offering before the LORD, and offer it upon the altar: And the priest shall take an handful of the offering, even the memorial thereof, and burn it upon the altar, and afterward shall cause the woman to drink the water."
          reference="Numbers 5:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Only after the offering is burned does she actually drink. Then the chapter states both possible outcomes side by side, with no suspense built in either direction.</p>
        </div>
        <VerseQuote
          text="And when he hath made her to drink the water, then it shall come to pass, that, if she be defiled, and have done trespass against her husband, that the water that causeth the curse shall enter into her, and become bitter, and her belly shall swell, and her thigh shall rot: and the woman shall be a curse among her people. And if the woman be not defiled, but be clean; then she shall be free, and shall conceive seed."
          reference="Numbers 5:27 and 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>An innocent woman did not just walk away unharmed. She walked away able to have children.</strong>{" "}
            Verse 28 ties her vindication directly to future fertility, which lines up with what the curse actually
            targets in verses 21 and 27: her reproductive body specifically, not a vague illness. Whatever this law
            did to a guilty woman, it promised an innocent one something more than silence. It promised a future.
          </p>
          <p>The chapter closes by naming what the whole law was for, and who carried the weight of it.</p>
        </div>
        <VerseQuote
          text="This is the law of jealousies, when a wife goeth aside to another instead of her husband, and is defiled; Or when the spirit of jealousy cometh upon him, and he be jealous over his wife, and shall set the woman before the LORD, and the priest shall execute upon her all this law. Then shall the man be guiltless from iniquity, and this woman shall bear her iniquity."
          reference="Numbers 5:29 to 31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That last verse is blunt about where responsibility lands. A husband who invoked this law and turned out
            to be wrong faced no penalty for the accusation itself. Whatever fairness this ritual built in for the
            woman being tested, it built almost none in against the husband bringing the accusation in the first
            place.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 5 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why is there no matching test for a wife who suspects her husband?</strong> The text does not
            explain this, and this walkthrough will not pretend it does. Numbers 5 gives a legal process for a
            husband&apos;s suspicion and gives no equivalent process for a wife&apos;s. That imbalance is simply
            there in the text, part of a law written inside a culture where a husband, not a wife, held the legal
            standing to bring this kind of accusation at all.
          </p>
          <p>
            <strong>Was this actually a fair process, or a superstitious one?</strong> Compared to what surrounded
            Israel in the ancient world, it reads as more restrained than it first appears. Other ancient Near
            Eastern law codes used ordeals too, sometimes requiring an accused wife to be thrown into a river to
            prove her innocence by surviving it. Numbers 5 never risks the woman&apos;s life on a physical hazard a
            strong swimmer could survive and a weak one could not. The outcome here rests entirely on God&apos;s
            judgment of a sworn oath, decided through drinking water mixed with dust and ink, not through anything
            that could be rigged or outmuscled.
          </p>
          <p>
            <strong>Did this ritual actually still happen later in Israel&apos;s history?</strong> Jewish tradition,
            recorded centuries later in the Mishnah, says this ritual, known there as the test of the sotah, was
            eventually discontinued before the Second Temple was destroyed, specifically because too many husbands
            had themselves become unfaithful, and the tradition held that the test only worked when the husband
            bringing the charge was innocent of the same sin himself. That detail is later Jewish teaching, not
            something Numbers 5 states directly, but it shows this law was taken seriously enough, long after Moses,
            that later generations debated when it still applied.
          </p>
          <p>
            <strong>Does the New Testament ever revisit a scene like this one?</strong> John 8 records religious
            leaders bringing a woman caught in adultery to Jesus, demanding judgment under the law. Jesus never
            performs anything like the ritual in Numbers 5. He turns the accusation back on the accusers themselves,
            then tells the woman to go and sin no more. The Gospel account does not quote or reference Numbers 5
            directly, and this walkthrough will not claim a connection the text itself does not make, but the
            contrast in how each scene treats a woman under suspicion is hard to miss.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 5:3</h3>
        <VerseQuote
          text="Both male and female shall ye put out, without the camp shall ye put them; that they defile not their camps, in the midst whereof I dwell."
          reference="Numbers 5:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason behind every exclusion in this chapter, stated once and never repeated: God Himself lived in the
          middle of this camp, and that changed what the camp could tolerate.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 5:7</h3>
        <VerseQuote
          text="Then they shall confess their sin which they have done: and he shall recompense his trespass with the principal thereof, and add unto it the fifth part thereof, and give it unto him against whom he hath trespassed."
          reference="Numbers 5:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Confession paired with repayment, plus twenty percent on top. A wrong against a neighbor in Israel was
          never settled quietly or settled cheap.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 5:19</h3>
        <VerseQuote
          text="And the priest shall charge her by an oath, and say unto the woman, If no man have lain with thee, and if thou hast not gone aside to uncleanness with another instead of thy husband, be thou free from this bitter water that causeth the curse."
          reference="Numbers 5:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The oath names innocence before it ever names guilt. Whatever this test was, it started by stating plainly
          what would happen if she had done nothing wrong at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 5:22</h3>
        <VerseQuote text="And this water that causeth the curse shall go into thy bowels, to make thy belly to swell, and thy thigh to rot: And the woman shall say, Amen, amen." reference="Numbers 5:22" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first recorded &quot;Amen&quot; in the Bible, spoken by a woman agreeing to stand under her own sworn
          oath before God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 5:28</h3>
        <VerseQuote text="And if the woman be not defiled, but be clean; then she shall be free, and shall conceive seed." reference="Numbers 5:28" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Innocence in this chapter was not just the absence of punishment. It came with a future named directly in
          the verse: children still to come.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 5 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 5 covers three separate laws: removing the physically unclean from camp, requiring confession and
          repayment plus twenty percent for a wrong done against another person, and the ritual a husband could use
          when he suspected his wife of unfaithfulness without a witness to prove it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were lepers put outside the camp?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 3 gives the reason directly: God dwelt in the middle of the camp, and uncleanness could not be
          allowed to defile the space around His presence. The exclusion was temporary and tied to the purity laws
          in Leviticus 13 through 15, not a permanent rejection of the person.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the &quot;bitter water&quot; in Numbers 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was holy water mixed with dust from the tabernacle floor and the washed off ink of a written curse,
          given to a wife suspected of adultery by her husband. Verses 27 and 28 describe two outcomes: physical
          harm if she was guilty, or safety and future fertility if she was innocent.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was there no test for a husband a wife suspected?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 5 never explains this gap, and it is a real one. The law as written only gives the husband legal
          standing to bring this accusation, reflecting the culture it was written into rather than a principle the
          text argues for directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did a husband face any consequence for a false accusation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 31 states plainly that the man would be guiltless from iniquity once the ritual was carried out,
          whatever the outcome. The law protected an innocent woman from the final curse, but it did not punish a
          husband for suspecting wrongly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is this the same law Jesus faced in John 8?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. John 8 describes a woman accused of adultery with no stated witnesses, which was normally a capital
          case under Exodus 20, not the jealousy ritual of Numbers 5. The Gospel account never quotes or references
          this chapter, though both scenes involve a woman under suspicion and no proof presented.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the jealousy offering use barley instead of wheat?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 15 specifically withholds the oil and frankincense that normally made a grain offering pleasant,
          calling it instead an offering that brought iniquity to remembrance. Every detail of the offering matched
          the seriousness of the accusation rather than the comfort of a normal sacrifice.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was this ritual still practiced in Jesus&apos; time?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jewish tradition recorded in the Mishnah says the ritual was discontinued before the Second Temple fell,
          reportedly because husbands bringing the charge were no longer innocent of unfaithfulness themselves. That
          detail comes from later Jewish teaching, not from Numbers 5 itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Numbers 5 teach Christians today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God took both uncleanness and broken trust seriously enough to legislate for them in detail, and that
          He built a real process into a situation, suspicion with no proof, that could otherwise destroy a marriage
          on nothing but a feeling.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 5 is not comfortable reading, and it was never meant to be read as comfortable.</p>
          <p>
            📌 <strong>God&apos;s presence in the camp set the terms for everything else in this chapter.</strong>{" "}
            Uncleanness, debt, and suspicion were not three random problems. They were three different ways something
            could come between a holy God and the people camped around Him.
          </p>
          <p>
            📌 <strong>A debt confessed out loud and repaid with interest was taken more seriously than a debt paid
            quietly.</strong> Israel&apos;s law never let a wrong get settled in the dark.
          </p>
          <p>
            📌 <strong>Suspicion without proof is old, and so is the damage it can do.</strong> Numbers 5 gave Israel
            an imperfect, uneven process for it. It did not pretend the problem itself did not exist.
          </p>
          <p>
            You are not under this law. But the suspicion, the unpaid debt, and the thing you have been keeping
            hidden instead of confessing are all still familiar.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one thing you have been settling quietly instead of confessing honestly, and bring it into the open
            the way this chapter insisted Israel do.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
