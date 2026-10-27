import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-all-souls-day", {
  title: "What Is All Souls' Day? Catholic Traditions, Prayer, and Remembering the Dead",
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
    <Link
      href={href}
      className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]"
    >
      {children}
    </Link>
  );
}

export default function WhatIsAllSoulsDayPage() {
  return (
    <BlogPostShell
      slug="what-is-all-souls-day"
      title={<>📖 What Is All Souls&apos; Day? Catholic Traditions, Prayer, and Remembering the Dead</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Open a church calendar to November 2 and you will find a day most people never notice.</p>
            <p>
              📌 <strong>All Souls&apos; Day is the day the Western Church sets apart to pray for every
              Christian who has died, asking God to finish the work of making them ready for His full
              presence.</strong>
            </p>
            <p>
              Maybe you grew up Catholic and you already know this day as the one you light a candle for,
              the Mass you attend with your mother&apos;s name written on a slip of paper near the altar.
            </p>
            <p>
              Maybe you grew up Protestant and you have never heard of it at all, or you have heard the
              word &quot;purgatory&quot; and quietly decided the whole subject is not yours to think about.
            </p>
            <p>
              Or maybe someone you loved died this year, and the only question you actually care about is
              simple. Where are they now, and is there anything left for you to do for them.
            </p>
            <p>
              This guide walks through where All Souls&apos; Day came from, what the Catholic Church
              actually teaches about purgatory and prayer for the dead, how the Eastern Orthodox Church
              remembers its own departed, where Protestants land on the same questions, and what the Bible
              itself says about what happens the moment a believer dies.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a Catholic background to feel the pull of this question.</p>
          <p>
            ⚠️ <strong>All Souls&apos; Day is really asking what happens between the moment a believer dies
            and the moment they stand fully in God&apos;s presence.</strong> Is there a gap. And if there
            is, can the living do anything to help close it.
          </p>
          <p>
            Every reader of this guide has either buried someone or will. A parent. A grandmother. A friend
            whose funeral you still think about on their birthday.
          </p>
          <p>
            What you believe about that gap changes how you grieve. It changes whether you light a candle,
            say a prayer for the dead, or simply thank God for a life already finished and already safe.
          </p>
          <p>
            Understanding{" "}
            <ArticleLink href="/blog/what-is-heaven">what the Bible actually says about heaven</ArticleLink>{" "}
            is the real foundation underneath this whole holiday, on every side of the argument.
          </p>
          <p>
            And the argument itself is not small. It touches what Christ&apos;s death actually finished on
            the cross, and whether anything about your standing with God is still unsettled after you die.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 What All Souls&apos; Day Actually Is</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. What the Day Marks and When It Falls</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>All Souls&apos; Day falls on November 2 every year, the day right after All Saints&apos; Day.</p>
          <p>
            That timing is not an accident, and the two days are not the same observance wearing two
            names.{" "}
            <ArticleLink href="/blog/what-is-all-saints-day">All Saints&apos; Day</ArticleLink> honors every
            believer the Church trusts is already in heaven&apos;s full presence, known by name or not.
          </p>
          <p>
            📌 <strong>All Souls&apos; Day is set apart for a different group, the faithful departed the
            Catholic Church believes are still being purified before they enter that same presence.</strong>
          </p>
          <p>
            In Catholic teaching, the first group needs nothing more from you. The second group, Catholics
            believe, can still be helped by the prayers of the living. That belief is the entire reason the
            day exists.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. How the Day Began, at One French Monastery</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Praying for the dead is an old Christian habit. A single fixed day for it is not nearly as old.</p>
          <p>
            Credit for establishing November 2 usually goes to Odilo, the abbot of the monastery of Cluny
            in France, who ordered every monastery under Cluny&apos;s rule to keep the day as a yearly
            commemoration of all the faithful departed.
          </p>
          <p>
            ⚠️ <strong>The exact year is less settled than the popular version of the story suggests.</strong>{" "}
            The date 998 gets repeated constantly online, but the Catholic Encyclopedia itself places
            Odilo&apos;s decree later, probably sometime after 1030, closer to the end of his time as
            abbot. What is agreed on is that the practice started at Cluny and its network of monasteries,
            and from there was adopted across the wider Western Church.
          </p>
          <p>
            💡 <strong>So treat the year as a reasonable estimate, not a fact to repeat with confidence.</strong>{" "}
            The place, Cluny, and the man, Odilo, are on firmer ground than the exact date.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. What the Catholic Church Actually Teaches About Purgatory</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is worth hearing the Catholic teaching the way the Church itself states it, rather than the
            secondhand version that gets passed around.
          </p>
          <p>
            The Catechism of the Catholic Church teaches that everyone who dies in God&apos;s grace and
            friendship, but is not yet fully purified, is already assured of eternal salvation. They simply
            undergo a purification after death to be made ready for the joy of heaven.
          </p>
          <p>
            The Church names this final purification purgatory, and the Catechism is careful to separate it
            completely from the punishment of the damned. It is a purification of people already saved, not
            a second chance for people who are not.
          </p>
          <p>
            📌 <strong>And the Catechism grounds the practice of praying for the dead in Scripture
            itself, not only in later church tradition.</strong> The Church has honored the memory of the
            dead and offered prayers for them since its earliest centuries, especially the Mass, along with
            almsgiving, indulgences, and acts of penance offered on their behalf.
          </p>
          <p>
            That belief, that your prayers can actually help someone who has already died, is the real
            engine behind this entire holiday.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. How Catholics Observe the Day Today</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Unlike All Saints&apos; Day, All Souls&apos; Day is not a holy day of obligation.</p>
          <p>
            Many Catholic parishes still hold Masses for the dead on November 2, often reading out the
            names of parishioners who died in the past year during the prayers.
          </p>
          <p>
            The Church also attaches a plenary indulgence, a full release from the temporal punishment
            still owed for sin, to visiting a cemetery and praying for the dead during the first eight days
            of November, alongside the usual requirements of confession, receiving the Eucharist, and
            prayer for the pope&apos;s intentions.
          </p>
          <p>
            Families often visit graves, bring flowers, and clean headstones that week. In some countries
            this is a full public holiday, not a quiet churchgoing habit.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. How the Eastern Orthodox Church Remembers Its Dead</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Orthodox Christians do not keep November 2 at all. Their own practice runs on a different rhythm.</p>
          <p>
            Because the Divine Liturgy is not served on ordinary weekdays during Great Lent, the Orthodox
            Church appoints specific Saturdays, commonly called Soul Saturdays, for commemorating the
            faithful departed at Liturgy instead.
          </p>
          <p>
            A memorial service called a panikhida is prayed for the dead, asking that their sins be
            pardoned and that they find rest, and the Church teaches that offering prayers, memorial
            services, and alms for the departed genuinely benefits them, even while insisting that
            repentance itself belongs to this present life, not the life to come.
          </p>
          <p>
            That is a real difference worth naming plainly. Orthodox Christians pray for the dead and
            believe it helps them, the same conviction behind All Souls&apos; Day, but they do not organize
            that belief around the Catholic doctrine of purgatory or its particular feast day.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Where Protestants Differ, and Why</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Most Protestant churches do not observe All Souls&apos; Day, and the reason is not indifference
            to the dead. It is a direct rejection of purgatory itself.
          </p>
          <p>
            The Westminster Confession of Faith, a core doctrinal statement for Presbyterian and other
            Reformed churches, states plainly that at death the souls of the righteous are received into
            heaven and the souls of the wicked are cast into hell, adding that &quot;besides these two
            places, for souls separated from their bodies, the Scripture acknowledgeth none.&quot; No third
            place. No further purification required.
          </p>
          <p>
            The same confession addresses prayer directly, teaching that prayer is to be made &quot;for all
            sorts of men living, or that shall live hereafter: but not for the dead.&quot;
          </p>
          <p>
            ⚠️ <strong>That is not a minor disagreement about one holiday.</strong> It is a different answer
            to the question of what Christ&apos;s death actually finished. Most Protestants read passages
            like Hebrews 9:27, judgment coming right after death with nothing in between, and conclude there
            is no gap left for anyone&apos;s prayers to fill.
          </p>
          <p>
            That same root disagreement, about where final authority sits and what the cross actually
            accomplished, runs underneath{" "}
            <ArticleLink href="/blog/what-is-reformation-day">Reformation Day itself</ArticleLink>, and it
            shapes{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">how a Christian knows they are saved</ArticleLink>{" "}
            in the first place.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. What the Bible Says About Death and the Believer</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whatever you believe about purgatory, every tradition agrees on one Bible fact first.</p>
        </div>
        <VerseQuote
          text="And as it is appointed unto men once to die, but after this the judgment:"
          reference="Hebrews 9:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Death is not the end of the story, and it is not a guess. Judgment follows it.</p>
          <p>
            The disagreement starts with what happens inside that judgment, and the verse Catholic theology
            leans on hardest for purgatory sits a few books earlier, in a passage about how a Christian&apos;s
            life gets tested.
          </p>
        </div>
        <VerseQuote
          text="Every man's work shall be made manifest: for the day shall declare it, because it shall be revealed by fire; and the fire shall try every man's work of what sort it is."
          reference="1 Corinthians 3:13"
        />
        <VerseQuote
          text="If any man's work shall be burned, he shall suffer loss: but he himself shall be saved; yet so as by fire."
          reference="1 Corinthians 3:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Catholic theology reads that fire as evidence of a real purification after death. Many
            Protestant commentators read the same fire as God testing a believer&apos;s works at the final
            judgment, not a process their soul passes through first. Same verse, two different pictures of
            what it is describing.
          </p>
          <p>
            What is not disputed is what the verse promises either way. The person himself is saved. The
            fire burns away the work, never the one who did it.
          </p>
          <p>
            For the believer&apos;s own hope, look instead at what Paul tells a grieving church about those
            who have already died in Christ.
          </p>
        </div>
        <VerseQuote
          text="But I would not have you to be ignorant, brethren, concerning them which are asleep, that ye sorrow not, even as others which have no hope."
          reference="1 Thessalonians 4:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Paul does not tell grieving Christians not to feel sorrow. He tells them not to grieve
            the way people with no hope grieve.</strong> There is a real difference between those two
            griefs, and the whole holiday sits inside that difference.
          </p>
          <p>Revelation pictures the other side of that same hope.</p>
        </div>
        <VerseQuote
          text="And I heard a voice from heaven saying unto me, Write, Blessed are the dead which die in the Lord from henceforth: Yea, saith the Spirit, that they may rest from their labours; and their works do follow them."
          reference="Revelation 14:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Rest, not waiting. Blessing, not uncertainty. Whatever gap exists between death and glory, the believer who dies in the Lord is already called blessed.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">✅ Practical Tips for All Souls&apos; Day</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whatever church you belong to, November 2 can still mean something to you personally.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Say the name of someone you lost, out loud, in prayer.</strong> Not a vague
            &quot;be with the family&quot; line. Their actual name, and one specific thing you are
            thankful God gave you through them.
          </li>
          <li>
            <strong>Read 1 Thessalonians 4:13 and 14 slowly.</strong> Let the difference between grieving
            with hope and grieving without it actually land, rather than skimming past it.
          </li>
          <li>
            <strong>If you are Catholic, go to a Mass for the dead if your parish holds one.</strong>{" "}
            Bring the name of someone specific with you, not just a general intention.
          </li>
          <li>
            <strong>If you are Protestant, do not assume this day has nothing for you.</strong> Thanking
            God by name for a believer who shaped your faith and has since died honors the same truth the
            holiday points to, without adopting a doctrine you do not hold.
          </li>
          <li>
            <strong>Visit a grave this week, even just one.</strong> A grandparent, a mentor, anyone. Let
            the visit be a prayer, not only a chore.
          </li>
          <li>
            <strong>Ask a Catholic or Orthodox friend what this week means to them.</strong> Ask to
            understand, not to debate. You will likely hear grief and hope tangled together.
          </li>
          <li>
            <strong>Write down what you actually believe about death, and why.</strong> Most Christians
            inherited their view and never tested it against Scripture themselves.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Top 4 Bible Verses for All Souls&apos; Day</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These four passages are the ones believers have turned to for centuries when someone they love dies.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Ecclesiastes 12:7</h3>
        <VerseQuote
          text="Then shall the dust return to the earth as it was: and the spirit shall return unto God who gave it."
          reference="Ecclesiastes 12:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This verse closes out one of the most honest books in Scripture, written by a man who tried
            everything life had to offer and still came back to this one plain fact.
          </p>
          <p>The body goes back to the ground it came from. The spirit goes back to the God who gave it.</p>
          <p>Nothing in this verse says the spirit simply stops existing. It returns. To God, specifically.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Job 19:25 and 26</h3>
        <VerseQuote
          text="For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth: And though after my skin worms destroy this body, yet in my flesh shall I see God:"
          reference="Job 19:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Job said this in the middle of losing everything, his children, his health, his whole former life.</p>
          <p>
            And in the middle of that, he reached past his own grave to a redeemer he was certain would
            still be standing, long after worms had done their worst to his body.
          </p>
          <p>That is one of the oldest resurrection hopes in the entire Bible, spoken by a man covered in ash.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 12:23</h3>
        <VerseQuote
          text="But now he is dead, wherefore should I fast? can I bring him back again? I shall go to him, but he shall not return to me."
          reference="2 Samuel 12:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David said this after his infant son died, and it is one of the most quietly devastating lines
            in the Old Testament.
          </p>
          <p>
            He does not pretend the death does not hurt. He states a plain fact instead. He will go to his
            son. His son will not come back to him.
          </p>
          <p>
            📌 <strong>That one sentence, &quot;I shall go to him,&quot; is David&apos;s own confidence that
            death did not simply erase his son.</strong> There was still a &quot;him&quot; to go to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Thessalonians 4:14</h3>
        <VerseQuote
          text="For if we believe that Jesus died and rose again, even so them also which sleep in Jesus will God bring with him."
          reference="1 Thessalonians 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the word Paul uses for a believer&apos;s death here. Sleep.</p>
          <p>Not an ending. A rest that Jesus Himself will come back and personally end.</p>
          <p>
            Every believer the Church remembers this week, whatever label gets put on the day, is pictured
            in this one verse as asleep in Jesus, not lost to Him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About All Souls&apos; Day</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is All Souls&apos; Day and why is it celebrated?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All Souls&apos; Day, kept on November 2, is the day the Catholic Church sets apart to pray for the
          faithful departed believed to be in purgatory, undergoing a final purification before entering
          heaven. The practice is traced to Odilo, abbot of Cluny, who ordered it kept across the monasteries
          under his rule, and it was later adopted across the wider Western Church.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between All Saints&apos; Day and All Souls&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All Saints&apos; Day, November 1, honors believers the Church holds are already with God in
          heaven&apos;s full presence. All Souls&apos; Day, November 2, is set apart to pray for the faithful
          departed the Church believes are still being purified in purgatory before entering that presence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants believe in All Souls&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Almost none observe it, because almost none hold the doctrine of purgatory it is built on. The
          Westminster Confession of Faith, a standard for Presbyterian and other Reformed churches, teaches
          that Scripture recognizes only two destinations for a soul after death, heaven or hell, with
          nothing in between and no prayer offered for those who have already died.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the Catholic Church actually teach about purgatory?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Catechism of the Catholic Church teaches that everyone in purgatory already died in God&apos;s
          grace and friendship and is guaranteed eternal salvation. Purgatory is a final purification to
          prepare them for heaven, not a second chance at salvation and not the punishment given to the
          damned.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is praying for the dead biblical?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This is one of the real, unresolved differences between the traditions. Catholics and Orthodox
          Christians point to the long history of the Church praying for the departed and to passages like
          1 Corinthians 3:13 through 15 as support. Most Protestants read Hebrews 9:27, judgment following
          death directly, and find no biblical command, and no clear biblical example, of believers praying
          for someone already dead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Eastern Orthodox Church celebrate All Souls&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not on November 2 and not under that name. The Orthodox Church instead keeps several Soul
          Saturdays, especially during Great Lent, when a memorial service called a panikhida is prayed for
          the departed. Orthodox Christians do believe prayer benefits the dead, but they organize that
          belief around their own calendar, not the Catholic feast.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it true All Souls&apos; Day started in the year 998?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That date is repeated constantly, but it is not settled. Odilo, abbot of Cluny, is reliably
          credited with establishing the observance for his monasteries, but the Catholic Encyclopedia
          itself places the decree later, probably after 1030. Treat the exact year as uncertain and the
          man and the place, Odilo and Cluny, as the solid part of the story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a plenary indulgence, and how does it connect to All Souls&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A plenary indulgence is a full release, in Catholic teaching, from the temporal punishment still
          owed for sin after it has been forgiven. The Church ties one to visiting a cemetery and praying
          for the dead during the first eight days of November, alongside confession, receiving the
          Eucharist, and prayer for the pope&apos;s intentions.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is All Souls&apos; Day a holy day of obligation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Unlike All Saints&apos; Day, Catholics are not required to attend Mass on November 2, though
          many parishes hold one and many Catholics choose to go.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens to a Christian right after they die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture says judgment follows death and that believers who die in Christ are blessed, resting
          from their labors and asleep in Jesus awaiting the resurrection. Traditions genuinely disagree on
          whether anything else happens in between, which this guide has tried to lay out honestly on every
          side.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>All Souls&apos; Day started as one abbot&apos;s decree for one network of French monasteries.</p>
          <p>
            📌 <strong>Nearly a thousand years later, it is still asking the same question every grieving
            Christian eventually asks. Is there anything left for me to do for the person I lost.</strong>
          </p>
          <p>
            Catholics answer that question with purgatory, indulgences, and a Mass for the dead. Orthodox
            Christians answer it with their own Soul Saturdays and the panikhida. Most Protestants answer it
            by trusting that Christ&apos;s finished work left nothing unsettled, and that prayer belongs to
            the living, not the dead.</p>
          <p>Those really are different answers. This guide has not tried to flatten them into one.</p>
          <p>
            But every single one of those answers is reaching for the same comfort Paul offered a grieving
            church two thousand years ago. Sorrow, yes. But never the sorrow of people with no hope.
          </p>
          <p>
            So here is one way to carry November 2, whatever you believe about what comes next. Say a name
            out loud. Thank God for that life, specifically. And remember that whatever gap you believe
            exists between death and glory, the believer who died in the Lord is already called blessed.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="27 October 2026"
        sources={[
          {
            title: "Odilo, Saint",
            publisher: "Catholic Encyclopedia, via Catholic.com",
            url: "https://www.catholic.com/encyclopedia/odilo-saint",
            note: "Credits Odilo, abbot of Cluny, with establishing the commemoration of All Souls for his monasteries, and notes the common date of 998 is probably wrong, placing the decree after 1030.",
          },
          {
            title: "III. The Final Purification, or Purgatory",
            publisher: "Catechism of the Catholic Church, The Holy See",
            url: "https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_three/article_12/iii_the_final_purification%2C_or_purgatory.html",
            note: "Paragraphs 1030 to 1032, the Catholic Church's current teaching on purgatory and the practice of praying, offering Mass, almsgiving, and penance for the dead.",
          },
          {
            title: "Catholics Can Get an Indulgence for the Dead by Praying at a Cemetery Any Day This November",
            publisher: "EWTN News / Catholic News Agency",
            url: "https://ewtnnews.com/vatican/catholics-can-get-an-indulgence-for-the-dead-by-praying-at-a-cemetery-any-day-this-november",
            note: "On the standard plenary indulgence tied to a cemetery visit during the first eight days of November, and its ordinary conditions of confession, Eucharist, and prayer for the pope's intentions.",
          },
          {
            title: "3rd Saturday of Great Lent: Memorial Saturday",
            publisher: "Orthodox Church in America (oca.org)",
            url: "https://www.oca.org/saints/lives/2012/03/17/13-3rd-saturday-of-great-lent-memorial-saturday",
            note: "On the Orthodox Church's Soul Saturdays during Great Lent, the panikhida memorial service, and the Church's teaching that prayer for the departed benefits them while repentance itself belongs to this life.",
          },
          {
            title: "The Westminster Confession of Faith",
            publisher: "Orthodox Presbyterian Church (opc.org)",
            url: "https://opc.org/wcf.html",
            note: "Chapter 32 on the state of souls after death ('besides these two places...the Scripture acknowledgeth none') and Chapter 21 on prayer ('for all sorts of men living...but not for the dead').",
          },
          {
            title: "All Saints' Day",
            publisher: "Catholic Encyclopedia (1913), via Wikisource",
            url: "https://en.wikisource.org/wiki/Catholic_Encyclopedia_(1913)/All_Saints%27_Day",
            note: "Background on the Western Church calendar All Souls' Day sits beside, including the November 1 date for All Saints established by Pope Gregory III and Pope Gregory IV.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
