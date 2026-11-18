import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("judges-21-explained", {
  title: "Judges 21 Explained: Two Oaths and a Kidnapping at Shiloh",
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

export default function JudgesTwentyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="judges-21-explained"
      title={<>📖 Judges 21 Explained: Two Oaths and a Kidnapping at Shiloh</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Six hundred men survive the war.</p>
            <p>An oath Israel swore before the fighting even started means not one of them can legally marry.</p>
            <p>
              <strong>Judges 21 explained</strong> is the last chapter of Judges, and it is the
              nation trying to undo the damage of the chapter before it without breaking a vow it
              should never have made. Israel had sworn at Mizpeh never to give a daughter to
              Benjamin. Now Benjamin is down to six hundred men hiding in a rock, and without
              wives the tribe disappears within a generation. The fix Israel settles on involves
              one more massacre and a kidnapping staged at a festival, and the text leaves you to
              decide for yourself what to make of either one.
            </p>
            <p>Maybe you have made a promise in anger that cost far more to keep than it should have.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why couldn&apos;t Israel just take back the oath and let Benjamin marry normally?</li>
            <li>❓ What happened to the town of Jabeshgilead, and why?</li>
            <li>❓ How did four hundred virgins and a dance at Shiloh solve Benjamin&apos;s problem?</li>
            <li>❓ Why does the whole book of Judges end on the line it ends on?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Judges 21 does not resolve the book of Judges. It just shows Israel
              solving one problem by creating two more, which is exactly the pattern the whole
              book has been describing.</strong>
            </p>
            <p>
              This walkthrough covers the chapter in order: the weeping at Bethel, the roll call
              that condemns an entire town, the four hundred virgins of Jabeshgilead, the offer
              made to the men at the rock, the loophole invented at the feast of Shiloh, and the
              one sentence that closes the whole book of Judges.
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
            <ArticleLink href="/blog/judges-20-explained">Judges 20</ArticleLink> ended with
            Benjamin nearly wiped out. Israel demanded the guilty men of Gibeah be handed over for
            the crime recorded in{" "}
            <ArticleLink href="/blog/judges-19-explained">Judges 19</ArticleLink>, Benjamin refused
            and chose war instead, and after two days of heavy losses Israel destroyed Benjamin&apos;s
            army, burned its cities, and left only six hundred men alive, hiding at the rock Rimmon.
          </p>
          <p>
            Judges 21 explained picks up a detail Judges 20 never mentioned in the heat of the
            fighting. Before any of that war started, Israel had sworn an oath at Mizpeh that no
            one would give a daughter in marriage to Benjamin. That oath is still standing after the
            battle is over, and it is now a problem Israel has to solve on its own, because an oath
            made to the LORD is not something this nation treats lightly, even when keeping it is
            the hardest part of the whole story.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Judges 21 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. An Oath Israel Cannot Walk Back (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming the vow that now stands in the way of fixing anything.</p>
        </div>
        <VerseQuote
          text="Now the men of Israel had sworn in Mizpeh, saying, There shall not any of us give his daughter unto Benjamin to wife."
          reference="Judges 21:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Mizpeh is where all the tribes first assembled before the war. This oath was sworn
            in anger at a tribe that had just refused to hand over the men responsible for a
            woman&apos;s death, and it is the kind of vow nobody expected to have to actually live
            with afterward.
          </p>
          <p>Once the fighting ends, the weight of that oath hits the whole camp at once.</p>
        </div>
        <VerseQuote
          text="And the people came to the house of God, and abode there till even before God, and lifted up their voices, and wept sore; And said, O LORD God of Israel, why is this come to pass in Israel, that there should be to day one tribe lacking in Israel?"
          reference="Judges 21:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Israel grieves the outcome it caused, while never once questioning whether
            the oath that is now trapping them was ever wise to make.</strong> The same pattern
            carried the whole nation into the civil war in the first place: a vow made fast,
            followed by a scramble to live inside its consequences.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Roll Call Turns Into a Death Sentence (verses 4 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Israel offers sacrifices, then turns to a second oath the text had not mentioned
            before now.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel said, Who is there among all the tribes of Israel that came not up with the congregation unto the LORD? For they had made a great oath concerning him that came not up to the LORD to Mizpeh, saying, He shall surely be put to death."
          reference="Judges 21:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is a second sworn penalty that Judges 20 never recorded Israel making
            out loud.</strong> The text simply states it existed, the same way it stated the ban on
            giving daughters to Benjamin. Two oaths, both made before the war and both still
            binding after it, now shape everything that happens for the rest of the chapter.
          </p>
          <p>The roll call finds exactly one absence.</p>
        </div>
        <VerseQuote
          text="And they said, What one is there of the tribes of Israel that came not up to Mizpeh to the LORD? And, behold, there came none to the camp from Jabeshgilead to the assembly."
          reference="Judges 21:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jabeshgilead sat east of the Jordan in Gilead, a border town with no obvious stake in a
            fight happening among the western tribes. Its absence from the muster at Mizpeh was
            likely nothing more than distance and distraction, but the oath Israel swore does not
            leave room for a reason. It only asks who stayed home.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Jabeshgilead Pays for Benjamin&apos;s Shortage (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The same army that had just leveled Benjamin&apos;s cities now turns its full force on
            a town that was not even part of the war.
          </p>
        </div>
        <VerseQuote
          text="And the congregation sent thither twelve thousand men of the valiantest, and commanded them, saying, Go and smite the inhabitants of Jabeshgilead with the edge of the sword, with the women and the children. And this is the thing that ye shall do, Ye shall utterly destroy every male, and every woman that hath lain by man."
          reference="Judges 21:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Twelve thousand soldiers are sent to enforce a vow, not to punish a crime.</strong>{" "}
            Jabeshgilead is not accused of wickedness the way Gibeah was. Its only offense, as the
            text frames it, is not showing up to a meeting. The penalty is the same destruction
            Benjamin&apos;s own cities had just suffered.
          </p>
        </div>
        <VerseQuote
          text="And they found among the inhabitants of Jabeshgilead four hundred young virgins, that had known no man by lying with any male: and they brought them unto the camp to Shiloh, which is in the land of Canaan."
          reference="Judges 21:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The actual purpose of the raid surfaces here.</strong> This was never only
            about enforcing the death oath. Four hundred surviving young women are taken alive and
            brought to the camp specifically to become wives for Benjamin, meaning the attack on
            Jabeshgilead was planned from the start as the first half of a two part solution to a
            marriage shortage.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Israel Calls Benjamin Back From the Rock (verses 13 and 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With four hundred women in hand, Israel reaches out to the six hundred survivors it had
            been trying to destroy only a few verses earlier.
          </p>
        </div>
        <VerseQuote
          text="And the whole congregation sent some to speak to the children of Benjamin that were in the rock Rimmon, and to call peaceably unto them. And Benjamin came again at that time; and they gave them wives which they had saved alive of the women of Jabeshgilead: and yet so they sufficed them not."
          reference="Judges 21:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Four hundred wives for six hundred men leaves a shortage of two hundred, stated
            plainly in the last four words of verse 14. The violence against Jabeshgilead has not
            even finished solving the problem it was meant to solve.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Loophole Built Around the Oath (verses 15 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two hundred men still have no wife, and the oath against Benjamin still stands. The
            elders solve this by looking for a technicality instead of a straight answer.
          </p>
        </div>
        <VerseQuote
          text="Howbeit we may not give them wives of our daughters: for the children of Israel have sworn, saying, Cursed be he that giveth a wife to Benjamin."
          reference="Judges 21:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice exactly what the oath forbids: a father giving his daughter.</strong>{" "}
            The elders do not ask whether the vow itself was wise. They go looking for an action
            the vow does not technically cover, and they find one at an annual festival at Shiloh.
          </p>
        </div>
        <VerseQuote
          text="Therefore they commanded the children of Benjamin, saying, Go and lie in wait in the vineyards; And see, and, behold, if the daughters of Shiloh come out to dance in dances, then come ye out of the vineyards, and catch you every man his wife of the daughters of Shiloh, and go to the land of Benjamin."
          reference="Judges 21:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The plan is a staged ambush at a religious feast. Benjamin&apos;s remaining men hide in
            the vineyards, wait for the young women of Shiloh to come out dancing, and seize wives
            by force. The elders even script out the excuse for the fathers in advance.
          </p>
        </div>
        <VerseQuote
          text="And it shall be, when their fathers or their brethren come unto us to complain, that we will say unto them, Be favourable unto them for our sakes: because we reserved not to each man his wife in the war: for ye did not give unto them at this time, that ye should be guilty."
          reference="Judges 21:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>No father gives anyone, so no one technically breaks the oath.</strong> That
            is the entire logic of the plan. The women themselves are never asked, and the text
            never pretends they were. Benjamin&apos;s men do exactly as instructed.
          </p>
        </div>
        <VerseQuote
          text="And the children of Benjamin did so, and took them wives, according to their number, of them that danced, whom they caught: and they went and returned unto their inheritance, and repaired the cities, and dwelt in them."
          reference="Judges 21:23"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Line That Closes the Whole Book (verses 24 and 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With Benjamin resettled and the oaths technically unbroken, Israel disperses, and the
            book of Judges ends on the sentence it has been building toward since{" "}
            <ArticleLink href="/blog/judges-17-explained">Judges 17</ArticleLink>.
          </p>
        </div>
        <VerseQuote
          text="In those days there was no king in Israel: every man did that which was right in his own eyes."
          reference="Judges 21:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This exact line, or a close version of it, opens the last five chapters of
            Judges.</strong> Judges 17:6 says it about Micah building his own private shrine.
            Judges 18:1 and{" "}
            <ArticleLink href="/blog/judges-19-explained">Judges 19:1</ArticleLink> say it about Dan
            stealing a priest and a Levite trusting an Israelite town over a foreign one. Judges 21
            closes the book by saying it one last time, right after showing a nation that solved a
            marriage shortage with a massacre and a kidnapping staged inside its own worship.
          </p>
          <p>
            The verdict is not subtle. A people with no king to answer to, doing whatever looks
            right to them in the moment, is exactly what produced everything this closing section
            of Judges has shown.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Judges 21 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why didn&apos;t Israel just release itself from an oath that was causing this
            much harm?</strong> What the text says: Israel weeps over the consequences of the oath
            in verses 2 and 3, then spends the rest of the chapter finding ways around it rather
            than questioning whether it should be kept at all. How this is read: the Old Testament
            treats a vow made to the LORD as binding, which explains why Israel never simply
            cancels it. The chapter still invites the reader to notice that a rash vow caused
            serious harm either way it was handled, kept or broken.
          </p>
          <p>
            <strong>Did God command the attack on Jabeshgilead?</strong> What the text says: the
            order to destroy Jabeshgilead and spare only its virgins comes from the congregation of
            Israel in verses 10 and 11, with no recorded word from the LORD attached to it. How
            this is read: this is Israel acting on its own oath and its own plan to solve a
            marriage shortage, the same pattern already seen at the end of{" "}
            <ArticleLink href="/blog/judges-20-explained">Judges 20</ArticleLink>, where Israel
            burned Benjamite cities without any command from God covering that action either.
          </p>
          <p>
            <strong>Was the ambush at Shiloh actually a loophole, or a straightforward violation of
            the oath?</strong> What the text says: Israel&apos;s oath forbade a father from giving
            his daughter to Benjamin. The plan in verses 20 and 21 has Benjamin&apos;s men seize
            wives directly, with no father involved in the handing over. How this is read: the
            elders clearly intend this as a technical way to keep the letter of the oath while
            doing the very thing the oath existed to prevent. The text records the plan without
            either praising it or condemning it outright.
          </p>
          <p>
            <strong>Does the Bible approve of what happens to the women in this chapter?</strong>{" "}
            What the text says: neither the four hundred women of Jabeshgilead nor the daughters of
            Shiloh are ever asked for consent, and no verse in the chapter frames either event as
            good. How this is read: Judges as a whole narrates Israel&apos;s moral collapse without
            a king rather than holding it up as a model. The final verse of the book names exactly
            what produced these events: a people doing whatever seemed right in their own eyes,
            with no authority to answer to.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Judges 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Judges 21:25</h3>
        <VerseQuote
          text="In those days there was no king in Israel: every man did that which was right in his own eyes."
          reference="Judges 21:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that closes the entire book of Judges, and the clearest statement of why every
          crisis in its last five chapters happened the way it did.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Judges 21:1</h3>
        <VerseQuote
          text="Now the men of Israel had sworn in Mizpeh, saying, There shall not any of us give his daughter unto Benjamin to wife."
          reference="Judges 21:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The oath that creates every problem the rest of the chapter has to solve, made in the
          heat of a war Israel had already decided to fight.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Judges 21:11</h3>
        <VerseQuote
          text="And this is the thing that ye shall do, Ye shall utterly destroy every male, and every woman that hath lain by man."
          reference="Judges 21:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The order that turns a roll call for a missed meeting into the destruction of a town,
          with no command from God recorded behind it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Judges 21:22</h3>
        <VerseQuote
          text="And it shall be, when their fathers or their brethren come unto us to complain, that we will say unto them, Be favourable unto them for our sakes: because we reserved not to each man his wife in the war: for ye did not give unto them at this time, that ye should be guilty."
          reference="Judges 21:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The excuse the elders script out before the ambush at Shiloh even happens, built entirely
          around a technicality in the wording of their own vow.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Judges 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Judges 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel realized its oath against giving daughters to Benjamin left the tribe&apos;s six
          hundred survivors without wives. It destroyed the town of Jabeshgilead for not joining
          the earlier muster, saving four hundred virgins as wives for Benjamin, then arranged for
          Benjamin to seize two hundred more wives by ambush at a festival in Shiloh, all without
          technically breaking the original oath.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t Benjamin just marry women from the other tribes normally?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel had sworn at Mizpeh, before the war against Benjamin even began, that no one would
          give a daughter to Benjamin in marriage. That vow was still binding after the war ended,
          so a normal marriage between a Benjamite man and an Israelite woman from another tribe
          was not an option Israel allowed itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Jabeshgilead destroyed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jabeshgilead had not sent anyone to the assembly at Mizpeh before the war with Benjamin,
          and Israel had sworn that anyone who failed to appear there would be put to death. Twelve
          thousand men were sent to enforce that oath, and the raid also provided four hundred
          surviving young women as wives for Benjamin.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the dancing at Shiloh in Judges 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Shiloh held a yearly feast of the LORD where young women would come out to dance. Israel&apos;s
          elders told Benjamin&apos;s remaining unmarried men to hide in the nearby vineyards and seize
          wives from among those dancing, since no father would be the one handing a daughter over
          and the original oath would stay technically unbroken.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God command the events of Judges 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter records no word from the LORD approving the attack on Jabeshgilead or the
          ambush at Shiloh. Both plans come from Israel&apos;s own leaders trying to solve a problem
          their own earlier oath created, the same pattern of acting without seeking God that marks
          the rest of the closing chapters of Judges.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the book of Judges end with &quot;no king in Israel&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The same phrase opens Judges 17, 18, and 19, framing all four of the book&apos;s final
          chapters as examples of what happens without a king to hold the nation to God&apos;s law.
          Ending the book on that line one last time makes the point as plainly as Scripture ever
          makes it: without that authority, people do whatever looks right to them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the women in Judges 21 asked if they wanted to be married this way?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Neither the surviving women of Jabeshgilead nor the dancing daughters of Shiloh are
          recorded giving any consent in the text. The chapter narrates what Israel did without
          presenting either event as God&apos;s design for marriage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Judges 21 end the story that started in Judges 19?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A crime against one woman in Judges 19 led to a civil war in{" "}
          <ArticleLink href="/blog/judges-20-explained">Judges 20</ArticleLink> that nearly erased
          an entire tribe. Judges 21 shows Israel&apos;s attempt to repair that damage, and it does
          so through another act of violence against Jabeshgilead and a kidnapping at Shiloh,
          closing the whole sequence without a clean resolution.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens after Judges 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Judges ends here, and the book of Ruth follows it in most English Bibles, opening in the
          same era, &quot;in the days when the judges ruled.&quot; Where Judges closes on a nation
          doing right in its own eyes, Ruth tells the story of ordinary loyalty and quiet faithfulness
          in that very same lawless period.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judges 21 does not give you a clean ending, because the book was never building toward one.</p>
          <p>
            📌 <strong>A rash vow does not get easier to live with over time. It just moves the
            cost onto whoever is nearest when it finally comes due.</strong> Jabeshgilead and the
            daughters of Shiloh both paid for an oath they never made.
          </p>
          <p>
            📌 <strong>Keeping the letter of a promise is not the same as doing what is right.</strong>{" "}
            Israel found a technical way around its own oath instead of asking whether the oath, or
            the plan built to dodge it, was good.
          </p>
          <p>So here is your one next step.</p>
          <p>
            The next time you are tempted to make a sweeping vow in anger, remember Mizpeh. The
            oath only took a sentence to make. It took an entire chapter, two more acts of
            violence, and a tribe nearly lost, to live with it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
