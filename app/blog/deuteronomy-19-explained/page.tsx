import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-19-explained", {
  title: "Deuteronomy 19 Explained: Cities of Refuge, Witnesses, and Life for Life",
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

export default function DeuteronomyNineteenExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-19-explained"
      title={<>📖 Deuteronomy 19 Explained: Cities of Refuge, Witnesses, and Life for Life</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A man swings an axe. The head flies off the handle. His neighbour is dead before either of them meant for anything to happen.</p>
            <p>
              <strong>Deuteronomy 19 explained</strong> is Moses building a justice system for cases exactly
              like that one, cases where the truth matters more than the outcome. Three cities set apart
              for someone running from an avenger who wants blood whether the death was an accident or not.
              A rule that no single accuser can end a man&apos;s life alone. A penalty for anyone who lies
              under oath to destroy someone else.
            </p>
            <p>You may have skimmed this chapter once as a list of old courtroom rules with nothing in it for you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did Israel need cities where a killer could run and be safe?</li>
            <li>❓ What is the difference between an accident and a murder in this chapter?</li>
            <li>❓ Why does Moses suddenly mention a boundary stone in the middle of a chapter about courts?</li>
            <li>❓ What does &quot;eye for eye, tooth for tooth&quot; actually mean here?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 19 protects the innocent from a mob and makes sure the guilty cannot
              hide behind a system built to protect the innocent.</strong>
            </p>
            <p>
              Twenty one verses, and every one of them exists to keep an angry crowd from doing what only
              careful testimony and real evidence are allowed to do.
            </p>
            <p>Read slowly. Grief and fear make people careless with the truth. This chapter will not let Israel be.</p>
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
            <ArticleLink href="/blog/deuteronomy-18-explained">Deuteronomy 18</ArticleLink> ended with Moses
            handing Israel a way to test a prophet&apos;s word: wait, and let time show whether it actually
            came from the LORD. That chapter was about trusting a voice that claims to speak for God.
          </p>
          <p>
            Deuteronomy 19 turns from prophetic speech to courtroom speech. The question is no longer
            whether God spoke through a man. It is whether a human accuser is telling the truth about
            another human being, in a case where the wrong verdict costs a life either way: the life of
            an innocent man wrongly condemned, or the life of a victim whose killer walks free.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 19 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Three Cities, Chosen Before the Need Arises (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens by looking past the conquest to a settled Israel that has not happened yet.</p>
        </div>
        <VerseQuote
          text="When the LORD thy God hath cut off the nations, whose land the LORD thy God giveth thee, and thou succeedest them, and dwellest in their cities, and in their houses;"
          reference="Deuteronomy 19:1"
        />
        <VerseQuote
          text="Thou shalt separate three cities for thee in the midst of thy land, which the LORD thy God giveth thee to possess it."
          reference="Deuteronomy 19:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the second half of a plan already half finished. <ArticleLink href="/blog/deuteronomy-4-explained">Deuteronomy 4</ArticleLink>{" "}
            recorded Moses setting apart Bezer, Ramoth, and Golan east of the Jordan, the moment Reuben,
            Gad, and half of Manasseh had land to put them on. The three cities named here are the matching
            set west of the Jordan, for the tribes who have not crossed over yet when Moses gives this
            command.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt prepare thee a way, and divide the coasts of thy land, which the LORD thy God giveth thee to inherit, into three parts, that every slayer may flee thither."
          reference="Deuteronomy 19:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;Prepare thee a way&quot; is a civil engineering instruction, not a vague
            suggestion.</strong> Israel was told to maintain clear roads to these cities and to place them
            so no part of the land sat too far from one. A man running for his life could not be expected
            to find a safe path by luck. The nation had to build the escape route before anyone needed it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Case of the Slipping Axe Head (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses gives the exact scenario these cities exist to cover, down to the tool in the man&apos;s hand.</p>
        </div>
        <VerseQuote
          text="And this is the case of the slayer, which shall flee thither, that he may live: Whoso killeth his neighbour ignorantly, whom he hated not in time past;"
          reference="Deuteronomy 19:4"
        />
        <VerseQuote
          text="As when a man goeth into the wood with his neighbour to hew wood, and his hand fetcheth a stroke with the axe to cut down the tree, and the head slippeth from the helve, and lighteth upon his neighbour, that he die; he shall flee unto one of those cities, and live:"
          reference="Deuteronomy 19:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Whom he hated not in time past&quot; is the legal hinge the whole case turns
            on.</strong> This is not a character reference. It is the specific question a city of refuge
            existed to let a court actually investigate: did any history of hatred exist between these two
            men before the axe head came loose, or is this genuinely the first time either of them had a
            reason to want the other dead.
          </p>
          <p>A &quot;helve&quot; is simply the wooden handle of the axe. Nothing in the man&apos;s intent planned for this.</p>
        </div>
        <VerseQuote
          text="Lest the avenger of the blood pursue the slayer, while his heart is hot, and overtake him, because the way is long, and slay him; whereas he was not worthy of death, inasmuch as he hated him not in time past."
          reference="Deuteronomy 19:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The &quot;avenger of blood&quot; was a real, expected office in this culture, usually
            the dead man&apos;s nearest relative, with the recognized duty to settle the killing.</strong>{" "}
            Grief does not wait for a trial. Moses is not pretending that duty away. He is giving the
            innocent man somewhere to outrun it long enough for the truth to be weighed calmly instead of
            settled by whoever is angriest and closest.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Three More Cities if the Land Grows (verses 7 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses repeats the command, then attaches a condition that was never guaranteed.</p>
        </div>
        <VerseQuote text="Wherefore I command thee, saying, Thou shalt separate three cities for thee." reference="Deuteronomy 19:7" />
        <VerseQuote
          text="And if the LORD thy God enlarge thy coast, as he hath sworn unto thy fathers, and give thee all the land which he promised to give unto thy fathers;"
          reference="Deuteronomy 19:8"
        />
        <VerseQuote
          text="If thou shalt keep all these commandments to do them, which I command thee this day, to love the LORD thy God, and to walk ever in his ways; then shalt thou add three cities more for thee, beside these three:"
          reference="Deuteronomy 19:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Six was always the total God had in mind, the same number{" "}
            <ArticleLink href="/blog/numbers-35-explained">Numbers 35</ArticleLink> already set. But the
            second three here are tied to a condition: Israel enlarging its borders by keeping the
            commandments and walking in God&apos;s ways. Obedience was not only about staying right with
            God. It was about whether the nation&apos;s own justice system would have room to keep working
            fairly as the population grew.
          </p>
        </div>
        <VerseQuote
          text="That innocent blood be not shed in thy land, which the LORD thy God giveth thee for an inheritance, and so blood be upon thee."
          reference="Deuteronomy 19:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who bears the guilt if these cities are never built or never reached in
            time.</strong> Not just the avenger who kills the wrong man. The land itself, and the people
            living on it. A justice system that is too slow, too far away, or too thin to actually function
            makes the whole nation guilty of blood it never meant to spill.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. No Refuge for a Man Who Planned It (verses 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The same cities that protect an innocent man refuse to protect a guilty one.</p>
        </div>
        <VerseQuote
          text="But if any man hate his neighbour, and lie in wait for him, and rise up against him, and smite him mortally that he die, and fleeth into one of these cities:"
          reference="Deuteronomy 19:11"
        />
        <VerseQuote
          text="Then the elders of his city shall send and fetch him thence, and deliver him into the hand of the avenger of blood, that he may die."
          reference="Deuteronomy 19:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Compare the language to verse 4. There, the slayer acted &quot;ignorantly,&quot; having
            &quot;hated him not in time past.&quot; Here, the man &quot;hate his neighbour, and lie in
            wait.&quot; Same cities, same roads, same shelter available to both men, but the elders are
            told to investigate before anyone is allowed to stay inside the walls.
          </p>
          <p>
            A city of refuge was never a hiding place a guilty man could simply run to and claim. It was a
            holding place where a case got examined.
          </p>
        </div>
        <VerseQuote
          text="Thine eye shall not pity him, but thou shalt put away the guilt of innocent blood from Israel, that it may go well with thee."
          reference="Deuteronomy 19:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;Thine eye shall not pity him&quot; is aimed at the elders, not at the
            victim&apos;s family.</strong> A premeditated killer could count on sympathy, on connections, on
            a community that did not want the ugliness of an execution. Moses tells the men responsible for
            the verdict that mercy toward a deliberate murderer is not mercy toward Israel. It is a debt
            left unpaid that the whole nation carries.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Landmark That Does Not Move (verse 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One verse sits alone between the cities of refuge and the law of witnesses, and it looks at first like it wandered in from a different chapter.</p>
        </div>
        <VerseQuote
          text="Thou shalt not remove thy neighbour’s landmark, which they of old time have set in thine inheritance, which thou shalt inherit in the land that the LORD thy God giveth thee to possess it."
          reference="Deuteronomy 19:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A &quot;landmark&quot; here is a boundary stone, the marker that settled exactly where one
            family&apos;s inheritance ended and the next one began. Moving it a few feet in the dark, with
            no witness awake to see it happen, was a theft nobody could easily prove.
          </p>
          <p>
            📌 <strong>The verse belongs exactly where Moses put it.</strong> A murder needs an avenger and
            a court because it is loud and obvious. A moved landmark needs the same honesty because it is
            quiet and deniable. Both are a neighbour taking from a neighbour what was never his, one by
            violence and one by stealth, and Deuteronomy 19 treats guarding the truth about each one as the
            same kind of duty.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. One Witness Is Never Enough (verses 15 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses states the rule that governs every accusation in Israel, in any court, for any charge.</p>
        </div>
        <VerseQuote
          text="One witness shall not rise up against a man for any iniquity, or for any sin, in any sin that he sinneth: at the mouth of two witnesses, or at the mouth of three witnesses, shall the matter be established."
          reference="Deuteronomy 19:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the same principle{" "}
            <ArticleLink href="/blog/deuteronomy-17-explained">Deuteronomy 17</ArticleLink> already applied
            to a capital charge. Here Moses widens it to cover every sin a person could be accused of, not
            only the ones that end in execution. One person&apos;s word, however confident, can never be
            the whole case against another person.
          </p>
        </div>
        <VerseQuote
          text="If a false witness rise up against any man to testify against him that which is wrong;"
          reference="Deuteronomy 19:16"
        />
        <VerseQuote
          text="Then both the men, between whom the controversy is, shall stand before the LORD, before the priests and the judges, which shall be in those days;"
          reference="Deuteronomy 19:17"
        />
        <VerseQuote
          text="And the judges shall make diligent inquisition: and, behold, if the witness be a false witness, and hath testified falsely against his brother;"
          reference="Deuteronomy 19:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Diligent inquisition&quot; means the judges had to actually dig, not simply
            pick whichever man sounded more sincere.</strong> A false accusation was treated as a crime the
            court had a duty to catch, not a risk the accused had to disprove on his own.
          </p>
        </div>
        <VerseQuote
          text="Then shall ye do unto him, as he had thought to have done unto his brother: so shalt thou put the evil away from among you."
          reference="Deuteronomy 19:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Whatever penalty the false witness tried to bring down on an innocent man becomes his
            own penalty instead.</strong> A false accuser in a capital case risked his own life, not just a
            fine or a public correction. Lying under oath to destroy someone was treated as attempted murder
            by testimony, because that is exactly what it is.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Life for Life, the Limit on Vengeance (verses 20 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses closes with two purposes for the penalty, and then the exact standard it follows.</p>
        </div>
        <VerseQuote text="And those which remain shall hear, and fear, and shall henceforth commit no more any such evil among you." reference="Deuteronomy 19:20" />
        <VerseQuote
          text="And thine eye shall not pity; but life shall go for life, eye for eye, tooth for tooth, hand for hand, foot for foot."
          reference="Deuteronomy 19:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;Life shall go for life&quot; is not permission for Israel to invent a new
            punishment.</strong> It is the same ceiling{" "}
            <ArticleLink href="/blog/exodus-21-explained">Exodus 21</ArticleLink> and{" "}
            <ArticleLink href="/blog/leviticus-24-explained">Leviticus 24</ArticleLink> already set on an
            ordinary injury between two free men: the penalty matches the harm, nothing more. Here Moses
            applies that same matching standard to a specific case, a false witness whose intended
            punishment for his victim becomes his own.
          </p>
          <p>
            📌 <strong>The repeated phrase &quot;and those which remain shall hear, and fear&quot; names
            the second purpose out loud.</strong> The penalty was never only about settling one case. It was
            a deterrent the whole community watched happen, so the next person tempted to lie under oath
            would remember exactly what it cost the last one.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 19 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does this chapter only describe three cities of refuge when Numbers 35 commanded
            six?</strong> Moses is not contradicting Numbers 35. He already recorded the first three,
            Bezer, Ramoth, and Golan, east of the Jordan in Deuteronomy 4, as soon as Reuben,
            Gad, and half of Manasseh had land to put them on. Deuteronomy 19 covers the matching three west
            of the Jordan, which the rest of the tribes could not set apart until they actually crossed
            over and took their own territory. Together the two passages give the full six.
          </p>
          <p>
            <strong>Does &quot;eye for eye, tooth for tooth&quot; mean Israel&apos;s courts literally
            blinded or maimed people?</strong> The text applies the phrase here specifically to the penalty
            for a false witness, where the clear point is that the punishment fits the crime rather than
            exceeding it. In the personal injury cases where the same language shows up, most Hebrew
            scholars read it as setting a ceiling on compensation, not a literal instruction to injure
            someone exactly as they injured another. The principle is proportion, not mutilation for its
            own sake.
          </p>
          <p>
            <strong>Doesn&apos;t Jesus contradict &quot;life for life, eye for eye&quot; when He says not to
            resist an evil person?</strong> Jesus addresses personal retaliation in Matthew 5, a person
            choosing not to take private revenge on someone who wrongs them. Deuteronomy 19 addresses a
            court sentencing a convicted false witness after a careful investigation by judges. One is about
            how a wronged individual responds in the moment. The other is about how a nation&apos;s justice
            system punishes a proven crime. They answer two different questions rather than disagreeing on
            the same one.
          </p>
          <p>
            <strong>Why does a single verse about moving a boundary stone sit in the middle of a chapter
            about killing and witnesses?</strong> Both halves of the chapter protect a neighbour from a
            neighbour taking something that is not theirs through a method no single witness can easily
            catch. A sudden death in the woods and a boundary stone moved overnight both demand the same
            honesty from everyone involved, which is likely why Moses placed the warning here rather than
            treating it as unrelated.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 19
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 19:15</h3>
        <VerseQuote
          text="One witness shall not rise up against a man for any iniquity, or for any sin, in any sin that he sinneth: at the mouth of two witnesses, or at the mouth of three witnesses, shall the matter be established."
          reference="Deuteronomy 19:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The two or three witness rule that later shapes Matthew 18:16, 2 Corinthians 13:1, and 1 Timothy
          5:19. One accusation, however loud, was never enough to settle anything.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 19:5 and 6</h3>
        <VerseQuote
          text="As when a man goeth into the wood with his neighbour to hew wood, and his hand fetcheth a stroke with the axe to cut down the tree, and the head slippeth from the helve, and lighteth upon his neighbour, that he die; he shall flee unto one of those cities, and live: Lest the avenger of the blood pursue the slayer, while his heart is hot, and overtake him, because the way is long, and slay him; whereas he was not worthy of death, inasmuch as he hated him not in time past."
          reference="Deuteronomy 19:5 and 6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact scenario a city of refuge was built for. Grief and anger move fast. This chapter made
          sure a true accident had somewhere to outrun them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 19:14</h3>
        <VerseQuote
          text="Thou shalt not remove thy neighbour’s landmark, which they of old time have set in thine inheritance, which thou shalt inherit in the land that the LORD thy God giveth thee to possess it."
          reference="Deuteronomy 19:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A quiet theft gets the same weight as a loud one. Nobody has to be watching for the command to
          still apply.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 19:19</h3>
        <VerseQuote
          text="Then shall ye do unto him, as he had thought to have done unto his brother: so shalt thou put the evil away from among you."
          reference="Deuteronomy 19:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A false witness does not get a lighter sentence than the one he tried to hand someone else. His
          own intended penalty becomes his.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 19:21</h3>
        <VerseQuote
          text="And thine eye shall not pity; but life shall go for life, eye for eye, tooth for tooth, hand for hand, foot for foot."
          reference="Deuteronomy 19:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A ceiling on the punishment, not an invitation to exceed it. The penalty matches the crime and
          stops exactly there.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 19
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 19 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 19 sets up three cities of refuge west of the Jordan for someone who kills another
          person by accident, denies that same refuge to a deliberate murderer, warns against moving a
          boundary stone, requires two or three witnesses for any accusation, and sets the penalty for a
          false witness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the cities of refuge for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They gave someone who killed a person without hatred or intent, like the man in verses 4 and 5
          whose axe head slips from the handle, a safe place to flee before the dead man&apos;s avenger
          could act out of grief rather than a fair hearing of the facts.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many cities of refuge were there supposed to be?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Six total. Three, Bezer, Ramoth, and Golan, were already set apart east of the Jordan in
          Deuteronomy 4. Deuteronomy 19 commands the matching three on the west side, with room for three
          more if Israel&apos;s land ever grew.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Could a murderer hide in a city of refuge and never face justice?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verses 11 and 12 are direct about this. If the elders found that a man lay in wait and killed
          someone out of hatred, they were required to send for him and hand him over to the avenger of
          blood. The cities protected the innocent, not every fugitive who reached their gates.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter mention a boundary stone in the middle of laws about killing and witnesses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 14 forbids moving a neighbour&apos;s landmark, a theft that is just as real as a killing or a
          false accusation but far easier to get away with, since it usually happens with no witness
          present at all. Moses places it between the two sections to treat it with the same seriousness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel require two or three witnesses instead of one?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 19:15 states the principle plainly: one person&apos;s word was never enough to
          establish guilt for any sin. Multiple independent witnesses made a false accusation far harder to
          invent and sustain under questioning.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to someone caught giving false testimony?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 19 states that whatever the false witness intended to happen to the accused happened to him
          instead. In a capital case, that meant a false witness risked his own life for the lie, not a
          lesser punishment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does &quot;eye for eye, tooth for tooth&quot; mean the Bible commands revenge?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. In context here it sets the limit on the penalty for a false witness, matching the harm he
          intended rather than exceeding it. It functions as a ceiling on punishment, the same way Exodus 21
          and Leviticus 24 use the same phrase for personal injury cases.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the New Testament still use the two or three witness rule?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Jesus applies it to confronting a brother who sins in Matthew 18:16, and Paul applies it
          twice, to settling disputes in 2 Corinthians 13:1 and to accusations against an elder in
          1 Timothy 5:19. The principle from Deuteronomy 19:15 carries straight into church discipline.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 19 is Moses refusing to let either fear or grief write a verdict.</p>
          <p>
            📌 <strong>A system built to protect the innocent still had to refuse to protect the
            guilty.</strong> The same cities that sheltered a man whose axe slipped handed over a man who
            lay in wait, because mercy toward one is not mercy if it is extended to the other.
          </p>
          <p>
            📌 <strong>One accusation was never allowed to be the whole case.</strong> Two or three
            witnesses, diligent inquisition by the judges, and a real penalty for lying under oath, all
            built so the truth had a fair chance against both silence and slander.
          </p>
          <p>
            📌 <strong>Quiet theft got the same seriousness as a loud crime.</strong> A moved boundary stone
            and a false accusation both rely on nobody checking closely. Deuteronomy 19 checks closely
            anyway.
          </p>
          <p>
            You are not running from an avenger of blood, and you probably have not moved a boundary stone
            in the dark. But you decide, more often than you think, whether to repeat an accusation you have
            not actually verified.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Before you pass along the next piece of news about someone, ask whether you actually have two
            or three witnesses, or only one voice you liked the sound of.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
