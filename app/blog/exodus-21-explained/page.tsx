import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-21-explained", {
  title: "Exodus 21 Explained: Servants, Justice, and Eye for Eye",
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

export default function ExodusTwentyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-21-explained"
      title={<>📖 Exodus 21 Explained: Servants, Justice, and Eye for Eye</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No mountain on fire this time. No trumpet, no thunder. Just thirty six verses of ordinary disputes God expects Israel&apos;s judges to actually settle with fairness.</p>
            <p>
              <strong>Exodus 21 explained</strong> is the first full chapter of what Exodus 24:7 later
              calls &quot;the book of the covenant,&quot; the case law that fills in exactly how the
              Ten Commandments apply once two neighbors disagree, a fight breaks out, or someone&apos;s
              animal does damage it was never supposed to do.
            </p>
            <p>Maybe you have skimmed past this chapter because it reads more like a law code than a story.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the Bible regulate servitude instead of simply ending it on the spot?</li>
            <li>❓ What does &quot;eye for eye, tooth for tooth&quot; actually mean?</li>
            <li>❓ Why do a son&apos;s and a daughter&apos;s situations get such different rules?</li>
            <li>❓ And why does one verse about a struck servant sound so hard to read?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 21 is not a chapter celebrating servitude or revenge. It is a chapter
              putting hard limits on both, inside a world that already practiced both long before
              Israel existed.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the release built into Hebrew
              servitude, the different protection given to a daughter, the laws on taking a life, the
              fight that goes wrong, the hardest verse in the chapter, the famous eye for eye principle,
              and the laws about an ox that gores or falls into somebody&apos;s pit.
            </p>
            <p>Read slowly. This chapter asks harder questions of a modern reader than almost any other in Exodus.</p>
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
            <ArticleLink href="/blog/exodus-20-explained">Exodus 20</ArticleLink> ended with God speaking
            the Ten Commandments directly to the whole trembling nation, then giving Moses simple
            instructions for building a plain altar of earth or unworked stone. The people had just
            asked for a go between rather than hear God&apos;s voice again, and Moses walked toward the
            thick darkness on their behalf.
          </p>
          <p>
            Exodus 21 opens right where that leaves off, with God still speaking to Moses, but the
            subject shifts from broad commands to specific disputes. This is also the chapter where
            the system <ArticleLink href="/blog/exodus-18-explained">Jethro talked Moses into setting
            up</ArticleLink>, judges handling the people&apos;s cases, finally gets something concrete
            to work from. The Ten Commandments said what mattered. Exodus 21 starts telling judges how
            to rule when real people bring real disputes before them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 21 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. From Ten Words to Case Law (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One short sentence changes the whole shape of the book.</p>
        </div>
        <VerseQuote text="Now these are the judgments which thou shalt set before them." reference="Exodus 21:1" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Judgments</strong> here means specific rulings for specific situations, not
            broad principles like &quot;thou shalt not steal.&quot; The Ten Commandments told Israel
            what kind of people to be. What follows tells Israel&apos;s judges exactly what to do when
            two of those people end up in conflict anyway.
          </p>
          <p>
            📌 <strong>&quot;Before them&quot; is not a vague audience.</strong> It means the able, God
            fearing men Moses had just appointed as judges in Exodus 18. The commandments came from the
            mountain. The case law that applies them comes to sit on the desks of ordinary men settling
            ordinary arguments.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Six Years a Servant, the Seventh Year Free (verses 2 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The very first case law in Israel&apos;s legal code is a built in expiration date on servitude.</p>
        </div>
        <VerseQuote
          text="If thou buy an Hebrew servant, six years he shall serve: and in the seventh he shall go out free for nothing."
          reference="Exodus 21:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The servant this law has in mind is almost always a fellow Israelite who fell into deep
            debt or extreme poverty and sold his own labor to survive, not a prisoner captured in war
            or a person bought as permanent property. Whatever the arrangement cost to begin with, the
            seventh year cancels it completely, free, for nothing.
          </p>
          <p>Family complicates the release, and the text addresses that directly.</p>
        </div>
        <VerseQuote
          text="If he came in by himself, he shall go out by himself: if he were married, then his wife shall go out with him."
          reference="Exodus 21:3"
        />
        <VerseQuote
          text="If his master have given him a wife, and she have born him sons or daughters; the wife and her children shall be her master's, and he shall go out by himself."
          reference="Exodus 21:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A man can walk into servitude married and walk out married. A man given a wife by his
            master inside that household leaves that arrangement alone when his own six years end,
            unless he chooses otherwise.
          </p>
        </div>
        <VerseQuote
          text="And if the servant shall plainly say, I love my master, my wife, and my children; I will not go out free:"
          reference="Exodus 21:5"
        />
        <VerseQuote
          text="Then his master shall bring him unto the judges; he shall also bring him to the door, or unto the door post; and his master shall bore his ear through with an aul; and he shall serve him for ever."
          reference="Exodus 21:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This decision has to be made publicly, in front of judges, not quietly agreed to
            behind closed doors.</strong> Staying is allowed only when the servant himself states it
            plainly, and the mark that follows, a hole bored through the ear at the doorpost, is
            permanent and visible. Many Christian readers later connect this image to Psalm 40:6,
            &quot;mine ears hast thou opened,&quot; and to Hebrews 10&apos;s picture of Christ taking on
            a body to do the Father&apos;s will, a willing, lifelong service chosen rather than forced.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Daughter Sold as a Servant (verses 7 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The next case law covers a situation the six year rule does not: a daughter sold into a household expecting her to eventually marry into it.</p>
        </div>
        <VerseQuote
          text="And if a man sell his daughter to be a maidservant, she shall not go out as the menservants do."
          reference="Exodus 21:7"
        />
        <VerseQuote
          text="If she please not her master, who hath betrothed her to himself, then shall he let her be redeemed: to sell her unto a strange nation he shall have no power, seeing he hath dealt deceitfully with her."
          reference="Exodus 21:8"
        />
        <VerseQuote
          text="And if he have betrothed her unto his son, he shall deal with her after the manner of daughters."
          reference="Exodus 21:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This arrangement functions closer to a marriage contract than ordinary labor. The six year
            release does not apply because the expectation was never a temporary job, it was a future
            place in the family. What the law refuses to allow is just as telling: she can never be
            resold to outsiders, and if the man who received her loses interest, she must be let go
            through redemption rather than traded away like property with no say in the matter.
          </p>
        </div>
        <VerseQuote
          text="If he take him another wife; her food, her raiment, and her duty of marriage, shall he not diminish."
          reference="Exodus 21:10"
        />
        <VerseQuote text="And if he do not these three unto her, then shall she go out free without money." reference="Exodus 21:11" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Neglect has a built in penalty, and it favors her.</strong> Food, clothing, and
            marital care are named specifically, and failing even one of the three cancels the whole
            arrangement and sets her free with no payment required from her side at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. When a Life Is Taken (verses 12 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The next group of case laws all protect a life or a family bond, and the penalty for breaking them is the most severe the chapter names.</p>
        </div>
        <VerseQuote text="He that smiteth a man, so that he die, shall be surely put to death." reference="Exodus 21:12" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This single sentence rests on the same ground{" "}
            <ArticleLink href="/blog/genesis-9-explained">Genesis 9:6</ArticleLink> already laid down
            after the flood: human life carries a weight nothing else does, because every person bears
            God&apos;s image. The very next two verses, though, show the law refusing to treat every
            death the same way.
          </p>
        </div>
        <VerseQuote
          text="And if a man lie not in wait, but God deliver him into his hand; then I will appoint thee a place whither he shall flee."
          reference="Exodus 21:13"
        />
        <VerseQuote
          text="But if a man come presumptuously upon his neighbour, to slay him with guile; thou shalt take him from mine altar, that he may die."
          reference="Exodus 21:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>An accident gets a place to run to. A planned killing gets dragged away from the
            altar itself.</strong> Verse 13 is the first seed of what later Scripture develops into full
            cities of refuge, places built specifically so someone who kills without intent to kill has
            somewhere safe to go while the facts get sorted out. Verse 14 closes the one loophole a
            murderer might try: grabbing the horns of an altar could not turn premeditated murder into
            something God&apos;s own holy ground would shield.
          </p>
        </div>
        <VerseQuote text="And he that smiteth his father, or his mother, shall be surely put to death." reference="Exodus 21:15" />
        <VerseQuote
          text="And he that stealeth a man, and selleth him, or if he be found in his hand, he shall surely be put to death."
          reference="Exodus 21:16"
        />
        <VerseQuote text="And he that curseth his father, or his mother, shall surely be put to death." reference="Exodus 21:17" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three more capital cases sit alongside murder: striking a parent, cursing a parent, and
            kidnapping a free person to sell them. The law that just spent six verses regulating how a
            person enters servitude honestly now names stealing someone into servitude by force a crime
            worth a life.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Fight That Doesn&apos;t Kill, and a Servant Who Is Struck (verses 18 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From capital cases, the law drops down to the kind of dispute that probably happened in the camp every week.</p>
        </div>
        <VerseQuote
          text="And if men strive together, and one smite another with a stone, or with his fist, and he die not, but keepeth his bed:"
          reference="Exodus 21:18"
        />
        <VerseQuote
          text="If he rise again, and walk abroad upon his staff, then shall he that smote him be quit: only he shall pay for the loss of his time, and shall cause him to be thoroughly healed."
          reference="Exodus 21:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Recovery changes everything here. Once the injured man can walk again, the one who struck
            him is not charged with assault going forward, but he still owes real money for the lost
            wages and the full cost of healing. The law treats an ordinary fist fight seriously without
            treating it like murder.
          </p>
          <p>Then the chapter turns to the hardest two verses in it.</p>
        </div>
        <VerseQuote
          text="And if a man smite his servant, or his maid, with a rod, and he die under his hand; he shall be surely punished."
          reference="Exodus 21:20"
        />
        <VerseQuote text="Notwithstanding, if he continue a day or two, he shall not be punished: for he is his money." reference="Exodus 21:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read honestly, this is uncomfortable, and it should be.</strong> Verse 20 is
            easy to skip past, but it is doing real work: killing a servant outright carries real
            punishment, in a world where plenty of surrounding cultures gave an owner unlimited power
            over a servant&apos;s life. Verse 21 is the part that sits hardest, treating a servant&apos;s
            recovery after a beating as grounds for no punishment, reasoning in purely economic terms
            that would never be acceptable applied to any other relationship in this chapter. The
            section below on hard questions takes this verse seriously rather than explaining it away.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Eye for Eye: The Unborn Child and the Limits on Revenge (verses 22 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most famous line in the whole chapter grows out of a very specific accident.</p>
        </div>
        <VerseQuote
          text="If men strive, and hurt a woman with child, so that her fruit depart from her, and yet no mischief follow: he shall be surely punished, according as the woman's husband will lay upon him; and he shall pay as the judges determine."
          reference="Exodus 21:22"
        />
        <VerseQuote text="And if any mischief follow, then thou shalt give life for life," reference="Exodus 21:23" />
        <VerseQuote text="Eye for eye, tooth for tooth, hand for hand, foot for foot," reference="Exodus 21:24" />
        <VerseQuote text="Burning for burning, wound for wound, stripe for stripe." reference="Exodus 21:25" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;Eye for eye&quot; is a ceiling, not a floor.</strong> The phrase gets
            quoted today as a byword for brutal revenge, but inside this law it caps the punishment at
            matching the harm, no more. A wrong done to one eye cannot be answered with two, and verse
            22 already models how that plays out in practice: real harm, real payment, set by judges,
            not by the angriest party in the dispute.
          </p>
        </div>
        <VerseQuote
          text="And if a man smite the eye of his servant, or the eye of his maid, that it perish; he shall let him go free for his eye's sake."
          reference="Exodus 21:26"
        />
        <VerseQuote
          text="And if he smite out his manservant's tooth, or his maidservant's tooth; he shall let him go free for his tooth's sake."
          reference="Exodus 21:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The same eye for eye principle that just capped revenge between free men now
            protects a servant&apos;s own body.</strong> A master who damages a servant&apos;s eye or
            tooth does not pay a fine, he loses the servant entirely, free, no term left to serve.
            Whatever a servant owed before that injury is erased the moment the injury happens.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. When an Ox Gores or Falls Into a Pit (verses 28 to 36)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes on property and livestock, and the question running underneath every verse is the same one: did the owner know, and did he do anything about it.</p>
        </div>
        <VerseQuote
          text="If an ox gore a man or a woman, that they die: then the ox shall be surely stoned, and his flesh shall not be eaten; but the owner of the ox shall be quit."
          reference="Exodus 21:28"
        />
        <VerseQuote
          text="But if the ox were wont to push with his horn in time past, and it hath been testified to his owner, and he hath not kept him in, but that he hath killed a man or a woman; the ox shall be stoned, and his owner also shall be put to death."
          reference="Exodus 21:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            An ox that had never shown violence before carries no blame back to its owner. The same ox,
            once its owner has already been warned and done nothing, turns his own negligence into
            something close to killing by his own hand. Verse 30 even allows his life to be ransomed
            with payment instead, a mercy the law did not have to include.
          </p>
        </div>
        <VerseQuote
          text="If the ox shall push a manservant or a maidservant; he shall give unto their master thirty shekels of silver, and the ox shall be stoned."
          reference="Exodus 21:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Thirty shekels, a specific, fixed price, is the same number the Gospels record being
            counted out for betraying Jesus centuries later in Matthew 26:15, the price of a servant&apos;s
            life turning up again at the cost someone was willing to pay to hand Him over.
          </p>
        </div>
        <VerseQuote
          text="And if a man shall open a pit, or if a man shall dig a pit, and not cover it, and an ox or an ass fall therein;"
          reference="Exodus 21:33"
        />
        <VerseQuote
          text="The owner of the pit shall make it good, and give money unto the owner of them; and the dead beast shall be his."
          reference="Exodus 21:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Nobody has to be struck by lightning or an enemy army for this law to matter.</strong>{" "}
            An uncovered hole in the ground is a hazard whether or not anyone ever falls in it, and the
            law assigns responsibility for it before disaster happens, not only after. The final two
            verses apply the same logic when one man&apos;s ox injures another&apos;s, splitting the
            loss when the danger was unknown and placing it fully on the negligent owner when it was not.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 21 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does Exodus 21 mean the Bible endorses slavery?</strong> The servitude it regulates
            is almost entirely debt servitude, paying off what you owed through labor, with a guaranteed
            release after six years. That is a different institution from the lifelong, inherited
            chattel slavery practiced later in history, which this same chapter criminalizes in verse 16
            by making it a capital crime to kidnap a free person and sell them.
          </p>
          <p>
            <strong>Why does a daughter sold as a maidservant get different rules than a son?</strong>{" "}
            A son&apos;s servitude in verses 2 to 6 is temporary labor with a fixed end date. A
            daughter&apos;s arrangement in verses 7 to 11 is a path toward marriage into the household,
            closer to a betrothal contract than a job, which is why it comes with its own protections,
            guaranteed food, clothing, and marital care, that her brother&apos;s arrangement never needed.
          </p>
          <p>
            <strong>What does &quot;eye for eye, tooth for tooth&quot; actually mean?</strong> It states
            a ceiling on punishment, not a license for personal revenge. The injury in verse 22 that
            triggers the whole principle is settled by judges assigning a payment, not by the husband
            taking matters into his own hands. Centuries later, Jesus directly addresses this same
            phrase in His teaching on the Sermon on the Mount, pushing His listeners past the legal
            limit on retaliation toward not retaliating at all.
          </p>
          <p>
            <strong>What does &quot;her fruit depart from her&quot; mean in verses 22 and 23?</strong>{" "}
            Careful readers genuinely disagree on this one. Some understand it as a miscarriage, with
            verse 22&apos;s fine covering the loss of the unborn child when no further harm comes to
            the mother, and verse 23&apos;s life for life applying only if the mother herself dies.
            Others read it as an early, survivable birth, with verse 22 covering that outcome and verse
            23&apos;s harsher penalty reserved for a case where the child dies as a result. Both readings
            take the passage seriously as describing real harm to an unborn child; they differ on
            exactly which harm triggers which penalty, and the Hebrew text itself does not settle the
            question for us.
          </p>
          <p>
            <strong>Why does verse 21 say a servant beaten and still alive after a day or two goes
            unpunished, &quot;for he is his money&quot;?</strong> This is the hardest verse in the
            chapter to defend, and it should not be softened into something more comfortable than it
            is. The reasoning given is frankly economic, the master&apos;s own financial loss standing
            in for further punishment. What the law does do, in the verse right before it, is
            criminalize outright killing a servant, a real limit on an owner&apos;s power, even while
            verse 21 falls short of the full dignity the gospel ultimately extends to every person.
          </p>
          <p>
            <strong>Why does an accidental killer still need somewhere to flee, if it genuinely
            was not murder?</strong> Grief and anger do not wait for a trial to decide whether a death
            was intentional. A dead man&apos;s family could seek revenge on the spot before anyone
            sorts out what happened. The place to flee in verse 13 protects an innocent killer from
            exactly that, giving the facts time to be weighed by judges instead of settled by whoever
            grieves loudest.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 21:2</h3>
        <VerseQuote
          text="If thou buy an Hebrew servant, six years he shall serve: and in the seventh he shall go out free for nothing."
          reference="Exodus 21:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The very first case law in Israel&apos;s legal code is a built in release date, a limit on
          servitude that was never meant to last a lifetime.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 21:13 and 14</h3>
        <VerseQuote
          text="And if a man lie not in wait, but God deliver him into his hand; then I will appoint thee a place whither he shall flee. But if a man come presumptuously upon his neighbour, to slay him with guile; thou shalt take him from mine altar, that he may die."
          reference="Exodus 21:13 and 14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The earliest seed of the cities of refuge, and proof the law already distinguished an
          accident from a plan long before the rest of Scripture builds that system out fully.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 21:23 to 25</h3>
        <VerseQuote
          text="Then thou shalt give life for life, Eye for eye, tooth for tooth, hand for hand, foot for foot, Burning for burning, wound for wound, stripe for stripe."
          reference="Exodus 21:23 to 25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most quoted line in the chapter, a ceiling on punishment rather than a command to seek it,
          decided by judges rather than by the injured party.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 21:32</h3>
        <VerseQuote
          text="If the ox shall push a manservant or a maidservant; he shall give unto their master thirty shekels of silver, and the ox shall be stoned."
          reference="Exodus 21:32"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A fixed price for a servant&apos;s life that resurfaces centuries later as the exact sum paid
          to betray the Son of God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Matthew 5:38 and 39</h3>
        <VerseQuote
          text="Ye have heard that it hath been said, An eye for an eye, and a tooth for a tooth: But I say unto you, That ye resist not evil: but whosoever shall smite thee on thy right cheek, turn to him the other also."
          reference="Matthew 5:38 and 39"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Jesus takes the exact legal ceiling set in Exodus 21 and calls His own followers to something
          that goes even further past it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 21 opens the case law given to Israel&apos;s judges after the Ten Commandments. It
          covers the terms of Hebrew servitude and its release in the seventh year, the different rules
          for a daughter sold as a maidservant, the penalties for murder, manslaughter, striking or
          cursing a parent, and kidnapping, injuries from fights and from a servant being struck, the
          eye for eye principle after an injury to a pregnant woman, and the liability of an owner
          whose ox gores someone or falls into an uncovered pit.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Exodus 21 support slavery?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It regulates debt servitude, a temporary arrangement with a guaranteed release after six
          years, while making it a capital crime in verse 16 to kidnap a free person and sell them. The
          chapter restricts one practice severely and bans the other outright rather than endorsing
          either without limit.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;eye for eye, tooth for tooth&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It sets a maximum penalty equal to the harm done, decided by judges, not a command to pursue
          personal revenge. Matthew 5:38 and 39 shows Jesus referencing this exact phrase centuries
          later while calling His followers toward something beyond even that legal limit.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was a Hebrew servant in Exodus 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Almost always a fellow Israelite working off a debt or extreme poverty, not a prisoner of war
          or lifelong property. Exodus 21:2 guarantees the arrangement ends after six years, with
          release owed for nothing in the seventh.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why would a servant choose to stay forever instead of going free?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 21:5 and 6 describe a servant who has come to genuinely love his master, wife, and
          children formed during his service, and who says so plainly before judges rather than being
          pressured into staying. The ear boring that follows marks the choice publicly and permanently.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;her fruit depart from her&quot; mean in Exodus 21:22?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Careful readers disagree. Some take it as a miscarriage caused during a fight between men,
          with the harsher life for life penalty in verse 23 reserved for the mother&apos;s own death.
          Others take it as a premature but survivable birth, with the stricter penalty applying if the
          child later dies. The Hebrew wording itself does not resolve which reading is correct.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 21:21 say nothing happens to a master if his servant survives a beating?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text gives an economic reason, the servant being the master&apos;s own financial loss, and
          it is genuinely one of the hardest verses in the chapter to read. The verse immediately
          before it does criminalize killing a servant outright, a real restriction, even though verse
          21 still falls short of treating a servant&apos;s body with the full protection the rest of
          this same chapter gives to a free man.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does an ox that gores someone get stoned?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 21:28 treats the animal as no longer fit to remain among the living and forbids eating
          its meat afterward, marking the death as a serious matter rather than an ordinary loss of
          livestock, while the owner himself goes free when the ox had never shown violence before.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a city of refuge, and where does Exodus 21 connect to it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 21:13 is the earliest reference to an appointed place where someone who kills without
          intent to kill can flee for safety. Numbers 35 and Joshua 20 later establish specific cities
          that serve this purpose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 21 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew 5:38 and 39 takes this chapter&apos;s eye for eye ceiling and pushes past it. Matthew
          26:15 echoes the thirty shekel price this chapter sets in verse 32, paid again centuries later
          to betray Jesus.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 21 will not let a reader stay comfortable, and it was probably never meant to.</p>
          <p>
            📌 <strong>Every law here limits power that had no limit before it.</strong> A servant gets
            a release date, a daughter gets protection written into her contract, an ox owner gets held
            responsible for what he already knew, and even revenge gets capped at matching the wrong
            done.
          </p>
          <p>
            📌 <strong>Not every limit reaches as far as it should.</strong> Verse 21 is in this chapter
            too, and pretending it reads easily would be dishonest. Scripture&apos;s own trajectory, from
            this case law all the way to Christ, keeps pushing further toward the full dignity every
            person was created with.
          </p>
          <p>
            📌 <strong>Eye for eye was always meant to restrain revenge, not demand it.</strong> Jesus
            takes that same legal ceiling in Matthew 5 and calls His people to go past it, toward mercy
            that the law never required but never forbade either.
          </p>
          <p>
            This chapter rewards a second, slower read more than a first one. Go back through the hard
            verses again, the ones you want to explain away fastest, and let them stay as uncomfortable
            as they actually are before you move on to Exodus 22.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
