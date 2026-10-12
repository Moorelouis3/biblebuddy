import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-22-explained", {
  title: "Exodus 22 Explained: Restitution, Justice, and the Poor",
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

export default function ExodusTwentyTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-22-explained"
      title={<>📖 Exodus 22 Explained: Restitution, Justice, and the Poor</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A stolen sheep. A trampled vineyard. A coat taken as collateral and kept past dark.</p>
            <p>
              <strong>Exodus 22 explained</strong> is Israel&apos;s case law for the ordinary damage
              people do to each other: theft, fire that spreads too far, a borrowed animal that dies,
              a seduced daughter nobody will marry now. Then, in the same breath, it turns to the
              people who have no family to sue on their behalf at all.
            </p>
            <p>Maybe you have skipped this chapter because it reads like small claims court.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does stealing an ox cost five times as much as stealing a sheep?</li>
            <li>❓ Why does it matter whether a thief breaks in at night or in daylight?</li>
            <li>❓ Does &quot;thou shalt not suffer a witch to live&quot; really mean what it sounds like?</li>
            <li>❓ And why does God say He personally hears the cry of the people everyone else overlooks?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 22 treats property carefully and treats the powerless even more
              carefully. The second half of the chapter is where its real weight sits.</strong>
            </p>
            <p>
              This walkthrough covers the whole chapter in order: restitution for theft and damage,
              property left in someone else&apos;s care, the law on seduction, the three offenses that
              carried a death sentence, the protection written in for the stranger and the widow, and
              the closing instructions about giving God what is His first.
            </p>
            <p>Some of these verses will surprise you with how modern their reasoning sounds.</p>
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
            <ArticleLink href="/blog/exodus-21-explained">Exodus 21</ArticleLink> covered the case
            law touching a person&apos;s body: servitude and its release, injuries from a fight, the
            eye for eye principle, and an owner&apos;s liability for an ox that gores someone. The
            chapter closed on an ox falling into an uncovered pit, one neighbor&apos;s negligence
            costing another neighbor an animal.
          </p>
          <p>
            Exodus 22 keeps Moses and God in the same conversation, still laying out judgments for
            the judges Israel had just appointed, but the subject shifts from bodily harm to
            property, trust, and finally to the people a legal system can most easily forget. Nothing
            about the setting changes. The camp is still at the foot of Sinai, and God is still
            speaking case by case rather than in broad statements.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 22 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Repaying What Was Taken (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the clearest case of all: a man steals an animal and disposes of it.</p>
        </div>
        <VerseQuote
          text="If a man shall steal an ox, or a sheep, and kill it, or sell it; he shall restore five oxen for an ox, and four sheep for a sheep."
          reference="Exodus 22:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>The penalty is not the same for every animal.</strong> An ox plowed a
            field and pulled a cart; losing one cost a household its working power, not just its
            meat. A stolen ox costs the thief five in return. A stolen sheep, valuable but not a
            household&apos;s engine, costs him four. The law is already weighing what was actually
            lost, not applying one flat fine to every theft.
          </p>
          <p>Right in the middle of that penalty, the text interrupts itself with a different case entirely.</p>
        </div>
        <VerseQuote
          text="If a thief be found breaking up, and be smitten that he die, there shall no blood be shed for him."
          reference="Exodus 22:2"
        />
        <VerseQuote
          text="If the sun be risen upon him, there shall be blood shed for him; for he should make full restitution; if he have nothing, then he shall be sold for his theft."
          reference="Exodus 22:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The time of day changes everything about this case.</strong> A homeowner
            who kills a burglar breaking in by night carries no guilt. He could not see who he was
            facing or what that person intended. The same killing in broad daylight is treated as
            bloodshed, because by then the homeowner could see the thief clearly enough to subdue or
            identify him instead of resorting to deadly force. A thief with nothing to repay is sold
            into labor rather than killed outright.
          </p>
          <p>The law then returns to straightforward restitution.</p>
        </div>
        <VerseQuote
          text="If the theft be certainly found in his hand alive, whether it be ox, or ass, or sheep; he shall restore double."
          reference="Exodus 22:4"
        />
        <VerseQuote
          text="If a man shall cause a field or vineyard to be eaten, and shall put in his beast, and shall feed in another man's field; of the best of his own field, and of the best of his own vineyard, shall he make restitution."
          reference="Exodus 22:5"
        />
        <VerseQuote
          text="If fire break out, and catch in thorns, so that the stacks of corn, or the standing corn, or the field, be consumed therewith; he that kindled the fire shall surely make restitution."
          reference="Exodus 22:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Carelessness pays just as surely as theft does here.</strong> Letting an
            animal wander into a neighbor&apos;s crop, or lighting a fire that spreads further than
            intended, was never a theft at all. The law charges full restitution anyway, and verse 5
            is specific about it: payment comes from the best of the offender&apos;s own field, not
            whatever he can spare.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Property Left in Someone Else&apos;s Care (verses 7 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The next section turns to a different situation: something handed over for safekeeping that goes missing.</p>
        </div>
        <VerseQuote
          text="If a man shall deliver unto his neighbour money or stuff to keep, and it be stolen out of the man's house; if the thief be found, let him pay double."
          reference="Exodus 22:7"
        />
        <VerseQuote
          text="If the thief be not found, then the master of the house shall be brought unto the judges, to see whether he have put his hand unto his neighbour's goods."
          reference="Exodus 22:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Verse 8 protects the depositor against the very person he trusted.</strong>{" "}
            If no outside thief turns up, suspicion naturally falls on the man who had custody of the
            goods. Rather than let him simply deny it, the law brings him before judges to test whether
            he quietly kept what was never his.
          </p>
          <p>
            Verse 9 states the general rule underneath both cases: whatever kind of property is in
            dispute, both sides bring their claim before the judges, and whoever the judges find guilty
            pays double. The same principle then covers livestock given to a neighbor to watch rather
            than valuables.
          </p>
        </div>
        <VerseQuote
          text="If a man deliver unto his neighbour an ass, or an ox, or a sheep, or any beast, to keep; and it die, or be hurt, or driven away, no man seeing it:"
          reference="Exodus 22:10"
        />
        <VerseQuote
          text="Then shall an oath of the LORD be between them both, that he hath not put his hand unto his neighbour's goods; and the owner of it shall accept thereof, and he shall not make it good."
          reference="Exodus 22:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>When no human witness exists, God is named as the witness instead.</strong>{" "}
            An oath sworn before the LORD settles a dispute no court could otherwise resolve. The
            caretaker is not free to lie casually; he is swearing in front of the one party who
            actually did see what happened, whether or not anyone else did.
          </p>
        </div>
        <VerseQuote text="And if it be stolen from him, he shall make restitution unto the owner thereof." reference="Exodus 22:12" />
        <VerseQuote
          text="If it be torn in pieces, then let him bring it for witness, and he shall not make good that which was torn."
          reference="Exodus 22:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A theft on the caretaker&apos;s watch still counts as his responsibility. An animal killed
            by a wild beast does not, as long as he can produce the torn remains as proof rather than
            just claim it happened.
          </p>
        </div>
        <VerseQuote
          text="And if a man borrow ought of his neighbour, and it be hurt, or die, the owner thereof being not with it, he shall surely make it good."
          reference="Exodus 22:14"
        />
        <VerseQuote
          text="But if the owner thereof be with it, he shall not make it good: if it be an hired thing, it came for his hire."
          reference="Exodus 22:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Borrowing carries more risk than renting.</strong> A borrowed animal that
            dies while the owner is absent must be replaced, full stop. If the owner came along with
            it, the loss is his to bear, since he was there to prevent it. Hired animals fall under
            neither rule; the fee paid for the hire already covers the risk.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Law on Seduction (verses 16 and 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From property, the case law turns briefly to a very different kind of loss.</p>
        </div>
        <VerseQuote
          text="And if a man entice a maid that is not betrothed, and lie with her, he shall surely endow her to be his wife."
          reference="Exodus 22:16"
        />
        <VerseQuote
          text="If her father utterly refuse to give her unto him, he shall pay money according to the dowry of virgins."
          reference="Exodus 22:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>In a culture where a woman&apos;s future depended on marriage, this law
            answers a real problem: who provides for her now.</strong> The man who seduced her owes
            her a bride price whether or not the marriage happens. If her father says no to the
            marriage, the money is still due. The law does not let the man who caused the loss walk
            away from its cost.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Three Offenses That Carried a Death Sentence (verses 18 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three short, blunt sentences follow, each naming a capital offense with no case details attached.</p>
        </div>
        <VerseQuote text="Thou shalt not suffer a witch to live." reference="Exodus 22:18" />
        <VerseQuote text="Whosoever lieth with a beast shall surely be put to death." reference="Exodus 22:19" />
        <VerseQuote text="He that sacrificeth unto any god, save unto the LORD only, he shall be utterly destroyed." reference="Exodus 22:20" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>All three strike at the same thing from different angles: Israel&apos;s
            covenant identity as a people set apart.</strong> Occult practice, sexual perversion that
            crosses the boundary between human and animal, and worshipping any god but the LORD each
            threatened to dissolve the very thing that made Israel Israel. These are the only three
            verses in the chapter with no surrounding explanation, no restitution scale, no
            exceptions. The law treats them as a different category of wrong entirely.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. God&apos;s Own Stake in the Stranger, the Widow, and the Poor (verses 21 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here the chapter changes tone completely, and the voice behind the law gets personal.</p>
        </div>
        <VerseQuote text="Thou shalt neither vex a stranger, nor oppress him: for ye were strangers in the land of Egypt." reference="Exodus 22:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Israel&apos;s own memory is the whole argument here. They know exactly what it felt
            like to be <ArticleLink href="/blog/exodus-12-explained">foreigners under a government
            that despised them</ArticleLink>, and the law refuses to let that memory fade into
            indifference toward the next outsider in their own land.
          </p>
        </div>
        <VerseQuote text="Ye shall not afflict any widow, or fatherless child." reference="Exodus 22:22" />
        <VerseQuote text="If thou afflict them in any wise, and they cry at all unto me, I will surely hear their cry;" reference="Exodus 22:23" />
        <VerseQuote
          text="And my wrath shall wax hot, and I will kill you with the sword; and your wives shall be widows, and your children fatherless."
          reference="Exodus 22:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>No judge, no court, no witness requirement sits between the widow&apos;s cry
            and God&apos;s own anger.</strong> Every other law in this chapter runs through Israel&apos;s
            legal system. This one does not. A widow or an orphan with nobody left to take their case
            to a judge still has somewhere to cry out, and God names Himself as the one who answers
            directly. <ArticleLink href="/blog/who-was-ruth">Ruth&apos;s own story</ArticleLink> shows
            exactly what it looked like when a widow with nothing was not left to fend for herself alone.
          </p>
        </div>
        <VerseQuote
          text="If thou lend money to any of my people that is poor by thee, thou shalt not be to him as an usurer, neither shalt thou lay upon him usury."
          reference="Exodus 22:25"
        />
        <VerseQuote text="If thou at all take thy neighbour's raiment to pledge, thou shalt deliver it unto him by that the sun goeth down:" reference="Exodus 22:26" />
        <VerseQuote
          text="For that is his covering only, it is his raiment for his skin: wherein shall he sleep? and it shall come to pass, when he crieth unto me, that I will hear; for I am gracious."
          reference="Exodus 22:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A creditor could legally hold a poor man&apos;s cloak as collateral, and the
            law still will not let him keep it overnight.</strong> For a man with nothing else, that
            cloak was also his blanket. The debt is real and the pledge is allowed, but comfort for
            one freezing night outweighs the creditor&apos;s convenience. Lending without interest to
            someone already poor sits in the same category: profiting further off a neighbor&apos;s
            hardship is not permitted here.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Honoring God and Giving Him the First (verses 28 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes on respect owed upward, toward both human authority and God Himself.</p>
        </div>
        <VerseQuote text="Thou shalt not revile the gods, nor curse the ruler of thy people." reference="Exodus 22:28" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Translators read &quot;the gods&quot; two different ways here. Some take it as Israel&apos;s
            own judges, since the same Hebrew word is translated &quot;judges&quot; a few verses earlier
            in this chapter, the same office set up in{" "}
            <ArticleLink href="/blog/exodus-20-explained">the chapter that opened this whole section
            of law</ArticleLink>. Others take it as a direct command not to blaspheme God Himself,
            paired naturally with the next command about cursing a civil ruler. Either way, the verse
            protects an authority structure Israel depended on from being torn down by its own people&apos;s
            mouths.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt not delay to offer the first of thy ripe fruits, and of thy liquors: the firstborn of thy sons shalt thou give unto me."
          reference="Exodus 22:29"
        />
        <VerseQuote
          text="Likewise shalt thou do with thine oxen, and with thy sheep: seven days it shall be with his dam; on the eighth day thou shalt give it me."
          reference="Exodus 22:30"
        />
        <VerseQuote
          text="And ye shall be holy men unto me: neither shall ye eat any flesh that is torn of beasts in the field; ye shall cast it to the dogs."
          reference="Exodus 22:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Firstfruits, firstborn sons, and firstborn animals all belong to God before
            anything else is divided up.</strong> A newborn animal stays with its mother a full seven
            days before being set apart on the eighth, and the chapter ends where it keeps landing all
            through this section: holiness is not an abstract idea, it shows up in what you eat, what
            you give first, and how carefully you treat whatever is not fully yours to begin with.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 22 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does Exodus 22:18 command Christians to execute witches today?</strong> This verse
            sits inside Israel&apos;s civil law as a theocratic nation, enforced by its own judges
            under its own government, not a command handed to individual believers or modern states
            to carry out on their own. The New Testament never repeats it as instruction for the
            church, which instead confronts occult practice with teaching and discipline rather than
            civil execution.
          </p>
          <p>
            <strong>Why does breaking in at night change whether killing the thief counts as
            bloodshed?</strong> Darkness removes a homeowner&apos;s ability to tell how dangerous the
            intruder actually is or to subdue him without lethal force. Daylight restores that ability,
            so the same killing becomes bloodguilt rather than self defense once the homeowner could
            reasonably have done otherwise.
          </p>
          <p>
            <strong>Why does stealing an ox cost five animals in return, but a sheep only four?</strong>{" "}
            Scholars generally connect this to what each animal actually cost a household. An ox did
            irreplaceable daily labor that a sheep never did, so losing one, even temporarily while
            a thief held it, cost more than the animal&apos;s market price alone.
          </p>
          <p>
            <strong>Doesn&apos;t requiring marriage after seduction punish the woman by forcing her to
            marry her seducer?</strong> The text places the obligation entirely on the man, requiring
            him to pay her bride price whether the marriage happens or not, and it gives her father
            the power to refuse the marriage outright. The law is protecting her future financial
            security against a man trying to walk away from what he caused, not forcing her into
            anything against her family&apos;s wishes.
          </p>
          <p>
            <strong>Why does God skip the courts entirely for the widow, the orphan, and the
            stranger?</strong> Every other case in this chapter assumes someone with standing to bring
            a claim before a judge. A widow, an orphan, or a foreigner often had no one. Verses 22 to
            24 answer that gap by making God Himself the court of last resort when the human system
            has nobody left to advocate for the vulnerable person.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 22
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 22:21</h3>
        <VerseQuote text="Thou shalt neither vex a stranger, nor oppress him: for ye were strangers in the land of Egypt." reference="Exodus 22:21" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Israel&apos;s own history in Egypt becomes the reason to treat the next outsider with
          decency, memory doing the work a law alone could never force.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 22:22 to 24</h3>
        <VerseQuote
          text="Ye shall not afflict any widow, or fatherless child. If thou afflict them in any wise, and they cry at all unto me, I will surely hear their cry; And my wrath shall wax hot, and I will kill you with the sword; and your wives shall be widows, and your children fatherless."
          reference="Exodus 22:22 to 24"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The only law in the chapter that bypasses Israel&apos;s judges completely, with God naming
          Himself as the one who hears the cry nobody else is listening for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 22:25</h3>
        <VerseQuote
          text="If thou lend money to any of my people that is poor by thee, thou shalt not be to him as an usurer, neither shalt thou lay upon him usury."
          reference="Exodus 22:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A direct limit on profiting off a neighbor&apos;s hardship, aimed squarely at the person who
          already had the least room to absorb another cost.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 22:2 and 3</h3>
        <VerseQuote
          text="If a thief be found breaking up, and be smitten that he die, there shall no blood be shed for him. If the sun be risen upon him, there shall be blood shed for him; for he should make full restitution; if he have nothing, then he shall be sold for his theft."
          reference="Exodus 22:2 and 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A law that weighs the exact circumstances of a killing rather than treating every dead
          intruder as the same case.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 22:31</h3>
        <VerseQuote
          text="And ye shall be holy men unto me: neither shall ye eat any flesh that is torn of beasts in the field; ye shall cast it to the dogs."
          reference="Exodus 22:31"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s closing line, tying everything back to one word: Israel belonged to God,
          down to what was on their plate.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 22
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 22?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 22 continues Israel&apos;s case law with restitution for theft and property damage,
          rules for goods or animals left in someone else&apos;s care, the law on seducing an
          unbetrothed woman, three offenses punished by death, protections for strangers, widows, and
          the poor, and closing instructions about honoring rulers and giving God the firstfruits.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Exodus 22 say about stealing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A thief who kills or sells a stolen ox must repay five oxen, or four sheep for a stolen
          sheep. If the stolen animal is recovered alive, the penalty drops to double. The scale
          reflects how much the owner actually lost, not one flat fine for every theft.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Exodus 22 really command killing witches?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 22:18 names it as a capital offense inside Israel&apos;s own civil law, carried out
          by Israel&apos;s judges under its own government. It is not a command the New Testament
          repeats for individual believers or civil authorities today to enforce themselves.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does breaking in at night change the punishment in Exodus 22?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 22:2 and 3 treat darkness as removing a homeowner&apos;s ability to identify the
          danger or respond without lethal force. The same killing in daylight, when the homeowner
          could see clearly enough to act otherwise, counts as bloodshed instead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Exodus 22 say about helping the poor?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 25 forbids charging interest to a poor neighbor, and verses 26 and 27 require
          returning a poor man&apos;s cloak, taken as a pledge for debt, before nightfall, since it
          may be the only covering he has to sleep in.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God threaten to personally punish those who oppress widows and orphans?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 22:22 to 24 is the one law in the chapter that does not route through Israel&apos;s
          judges. A widow or orphan often had nobody to bring a case to court on their behalf, so God
          names Himself as the one who hears their cry directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Exodus 22 teach about seduction and marriage?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 16 and 17 require a man who seduces an unbetrothed woman to pay her bride price
          whether or not the marriage takes place, placing the financial cost of his choice on him
          rather than on her future.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is cursing a ruler treated so seriously in Exodus 22?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 28 is often understood to cover Israel&apos;s judges as well as its civil rulers, since
          a judge exercised God&apos;s own authority while settling a case. Cursing that authority was
          treated as an attack on the system God had set up to protect everyone else in the chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Exodus 22:31 mean about holiness and eating torn flesh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse ties Israel&apos;s set apart identity to an ordinary daily choice: refusing meat
          from an animal already torn and killed by a wild beast rather than slaughtered properly,
          making holiness something lived out in the kitchen, not only at the altar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 22 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Its concern for the stranger, the widow, and the poor runs straight through the rest of
          Scripture, from the prophets&apos; repeated charges against Israel for neglecting exactly
          these people to James 1:27 defining pure religion partly as looking after widows and orphans
          in their affliction.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 22 spends most of its length on property, and most of its weight on people with none.</p>
          <p>
            📌 <strong>Restitution in this chapter always fits the actual loss.</strong> An ox costs
            more to replace than a sheep. A night intruder is judged differently than a daylight one.
            The law keeps asking what really happened before it asks what to do about it.
          </p>
          <p>
            📌 <strong>The widow, the stranger, and the poor get a protection nobody else in the
            chapter receives: God skips the courtroom and answers them directly.</strong> Every other
            case here runs through judges. Verses 22 to 24 do not, because the people they protect
            often had no one to bring their case at all.
          </p>
          <p>
            You probably will not face a gored ox or a borrowed donkey this week. You will almost
            certainly cross paths with someone who has no one speaking up for them.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one person in your life who fits Exodus 22&apos;s description of a stranger, a widow,
            or someone poor by you, and do for them this week what this chapter insists on.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
