import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("all-saints-day-vs-all-souls-day", {
  title: "What Is the Difference Between All Saints' Day and All Souls' Day?",
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

export default function AllSaintsDayVsAllSoulsDayPage() {
  return (
    <BlogPostShell
      slug="all-saints-day-vs-all-souls-day"
      title={<>📖 What Is the Difference Between All Saints&apos; Day and All Souls&apos; Day?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two days in a row on the calendar. Two names that sound almost the same.</p>
            <p>November 1 and November 2, back to back, and most people outside the Catholic world could not tell you what either one is actually for.</p>
            <p>
              📌 <strong>Here is the plain answer. All Saints&apos; Day, November 1, honors every
              person the church believes is already with God in heaven, the famous ones and the
              never named ones alike. All Souls&apos; Day, November 2, prays for the faithful who
              have died but may still be in the process the Catholic Church calls purgatory, being
              made ready for heaven. One day celebrates the saints who already made it. The next day
              prays for the souls who are, in Catholic teaching, still on the way.</strong>
            </p>
            <p>That one distinction, finished versus still in process, explains almost everything else about how the two days are kept.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide walks through what each day actually celebrates, where both of them came
              from, the doctrine of purgatory sitting underneath All Souls&apos; Day, why one of the
              two carries a Mass obligation and the other does not, and how Orthodox and Protestant
              Christians think about the very same two days in very different ways.
            </p>
            <p>Every historical and doctrinal claim below links back to a named source, so you can check it yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is easy to wave both days off as two more entries on a church calendar nobody checks.</p>
          <p>
            ⚠️ <strong>But look at what each day is actually asking you to believe.</strong> All
            Saints&apos; Day asks you to believe that death does not end a Christian&apos;s story,
            that the ordinary believers who died quietly in your own family are, right now, as alive
            and as near to God as any name you would find in a stained glass window. All Souls&apos;
            Day asks something just as serious. That the people you have buried are not simply gone,
            and that your prayers for them are not wasted words into silence.
          </p>
          <p>
            Both of those claims rest on the same conviction Scripture calls the communion of
            saints. The church does not stop at the grave. It is one body, living and dead, held
            together in Christ.
          </p>
          <p>
            💡 <strong>That is why these two days matter even if you never light a candle for
            either one.</strong> They are the church&apos;s way of saying out loud, twice a year on
            purpose, that grief and hope are allowed to sit in the same pew.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 All Saints&apos; Day and All Souls&apos; Day, Side by Side
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. What All Saints&apos; Day Actually Celebrates</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            All Saints&apos; Day, kept every November 1, honors every person the Catholic Church
            believes has already entered heaven and now sees God face to face, what theology calls
            the beatific vision.
          </p>
          <p>
            Not only the saints with a feast day of their own. Every forgotten, never canonized
            believer too. The church calls this the communion of saints, the whole family of God
            joined together in Christ, visible and invisible.
          </p>
          <p>Scripture is where that picture starts.</p>
        </div>
        <VerseQuote
          text="Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us,"
          reference="Hebrews 12:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A cloud of witnesses, not a handful.</strong> That image is the heart of All
            Saints&apos; Day. John saw the same crowd from the other side, already home.
          </p>
        </div>
        <VerseQuote
          text="After this I beheld, and, lo, a great multitude, which no man could number, of all nations, and kindreds, and people, and tongues, stood before the throne, and before the Lamb, clothed with white robes, and palms in their hands; And cried with a loud voice, saying, Salvation to our God which sitteth upon the throne, and unto the Lamb."
          reference="Revelation 7:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A multitude no man could number. Not a small, elite club of famous names. All Saints&apos;
            Day is built to honor exactly that kind of uncountable crowd, which is why Pope Urban IV
            once described the feast as filling in the gaps for every saint who never got a day of
            their own on the calendar.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. What All Souls&apos; Day Actually Celebrates</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            All Souls&apos; Day, kept the very next day, November 2, is a different kind of
            remembering. It is the Commemoration of All the Faithful Departed, a day set aside to
            pray for every baptized Christian who has died.
          </p>
          <p>
            Not to pray that they are saved. The church is not uncertain about that for someone who
            died in faith. The prayer is for something more specific, that whatever still needs
            cleansing in them before they see God is finished, through what Catholic doctrine calls
            purgatory.
          </p>
          <p>Paul gives Christian grief its own shape, and it is not grief without an edge of hope.</p>
        </div>
        <VerseQuote
          text="But I would not have you to be ignorant, brethren, concerning them which are asleep, that ye sorrow not, even as others which have no hope. For if we believe that Jesus died and rose again, even so them also which sleep in Jesus will God bring with him."
          reference="1 Thessalonians 4:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Sorrow, but not without hope.</strong> That is exactly the tone All
            Souls&apos; Day aims for. Not a celebration like November 1. A quieter day, closer to a
            funeral Mass than a feast, and that shift in mood is deliberate.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Where Both Days Actually Came From</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Neither day started as one neat idea handed down whole. Both grew slowly, over
            centuries, out of older and smaller customs.
          </p>
          <p>
            According to the Catholic Encyclopedia, the earliest trace of a shared day for the dead
            in Christ is a sermon from Antioch on the Sunday after Pentecost. Rome&apos;s
            persecution under Diocletian had produced so many martyrs that no calendar could give
            them each a separate day, so local churches began honoring groups of them together.
          </p>
          <p>
            The date everyone now recognizes starts with a building, not a doctrine. Pope Boniface
            IV consecrated the Pantheon in Rome to Mary and all the martyrs around the year 609.
            Pope Gregory III, reigning from 731 to 741, later dedicated a chapel inside Saint
            Peter&apos;s Basilica to all the saints and fixed its anniversary on November 1. Pope
            Gregory IV then extended that date to the whole church in the following century.
          </p>
          <p>
            All Souls&apos; Day arrived later and from a very different direction, a monastery
            rather than Rome. The Catholic Encyclopedia credits Saint Odilo, abbot of the monastery
            at Cluny in France until his death in 1048, with ordering every house under his
            authority to pray for all the faithful departed the day right after All Saints&apos;.
            The custom spread first through other Benedictine monasteries, then into the wider
            Western church.
          </p>
          <p>
            📌 <strong>One day traces back to a pope rededicating a building in Rome. The other
            traces back to one abbot&apos;s rule for his own monks.</strong> Neither started as a
            worldwide mandate. Both grew into one because enough of the church found the practice
            worth keeping.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Doctrine Underneath: Why All Souls&apos; Day Exists at All</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            All Souls&apos; Day only makes sense once you understand what it is responding to, the
            Catholic doctrine of purgatory.
          </p>
          <p>
            The Catholic Encyclopedia explains the reasoning plainly. Some souls leave this life
            trusting Christ, truly bound for heaven, but still carrying the effects of sins already
            forgiven, or small daily sins never fully dealt with. Catholic teaching holds that these
            souls are, for a time, kept from the full presence of God until that remaining
            cleansing is complete.
          </p>
          <p>
            That is where the living come in. The church teaches that prayer, almsgiving, and above
            all the Mass offered for the dead can genuinely help a soul in that state. Praying for
            the dead on November 2 is not a symbolic gesture in Catholic belief. It is considered an
            act that actually helps someone you cannot see or speak to anymore.
          </p>
          <p>
            Paul describes a different but related mystery, the moment every believer, living and
            dead, is finally changed at once.
          </p>
        </div>
        <VerseQuote
          text="Behold, I shew you a mystery; We shall not all sleep, but we shall all be changed, In a moment, in the twinkling of an eye, at the last trump: for the trumpet shall sound, and the dead shall be raised incorruptible, and we shall be changed."
          reference="1 Corinthians 15:51 and 52"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is exactly where Catholic and Protestant belief parts ways, and it is
            worth saying plainly rather than smoothing over.</strong> Most Protestant traditions do
            not teach purgatory at all, and read passages like this one as describing a single
            future resurrection rather than a present process of cleansing after death. Catholic
            teaching on purgatory is drawn mainly from church tradition and reasoning about divine
            justice and mercy, not from a verse quoted the way the verses above are. That is an
            honest difference between two real Christian convictions, not a settled fact either
            side can simply hand the other.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Only One of the Two Is a Holy Day of Obligation</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is a difference you can check against the rule book itself. The United States
            Conference of Catholic Bishops lists six holy days of obligation for Catholics in the
            United States, and November 1, All Saints&apos; Day, is one of them.
          </p>
          <p>
            The USCCB&apos;s own complementary norms add one exception specific to this feast. When
            November 1 falls on a Saturday or a Monday, the obligation to attend Mass that day is
            lifted entirely, because it would otherwise sit right beside a Sunday Mass obligation
            already in place.{" "}
            <ArticleLink href="/blog/what-is-a-holy-day-of-obligation">
              That exception does not apply to any of the other five holy days
            </ArticleLink>
            .
          </p>
          <p>
            November 2, All Souls&apos; Day, carries no such obligation at all. It is a liturgical
            commemoration with its own Mass readings, but Catholics are never required to attend.
            📌 <strong>One day you may be required to show up for. The next day, showing up is
            entirely your own choice.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. How Orthodox and Protestant Christians Mark the Same Two Dates Differently</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Step outside the Catholic Church and November 1 and 2 stop looking nearly as fixed.
          </p>
          <p>
            The Eastern Orthodox Church does not keep All Saints on November 1 at all. According to
            Wikipedia&apos;s sourced account of the feast, Orthodox Christians commemorate all
            saints together on the Sunday after Pentecost instead, a date that moves with Easter
            every year.{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              The Eastern and Western church calendars part ways on more than just this one day
            </ArticleLink>
            . In place of a single All Souls&apos; Day, Orthodox practice keeps several Saturdays of
            Souls through the year, tied to Christ resting in the tomb on a Saturday, with a
            memorial service called a Panikhida and a blessed dish called koliva shared in memory
            of the dead.
          </p>
          <p>
            Protestant churches that kept All Saints&apos; Day after the Reformation generally
            reshaped what the day means. Lutheran congregations mark it as a festival, often moved
            to the first Sunday of November. The Church of England ranks it as one of only nine
            Principal Feasts on its entire calendar. The United Methodist Church keeps it that same
            Sunday, reading the names of members who died that year. What changes is the scope.
            Many Protestant traditions use the word saint for every believer, living or dead, not
            only for those the Catholic Church has formally recognized as already in heaven.
          </p>
          <p>
            All Souls&apos; Day travels far less well into Protestant practice. Most Protestant
            traditions reject purgatory outright, and a day built to pray souls out of it has
            little place once that doctrine is gone.{" "}
            <ArticleLink href="/blog/what-is-totensonntag">
              German Protestant churches built their own answer to this instead
            </ArticleLink>
            , a separate Sunday near the end of the church year set aside to remember the dead
            without any claim about purgatory attached to it.
          </p>
          <p>
            📖 Paul also gives the saints already finished their race a kind of rest the living have
            not reached yet.
          </p>
        </div>
        <VerseQuote
          text="I have fought a good fight, I have finished my course, I have kept the faith: Henceforth there is laid up for me a crown of righteousness, which the Lord, the righteous judge, shall give me at that day: and not to me only, but unto all them also that love his appearing."
          reference="2 Timothy 4:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Notice who that crown is promised to.</strong> Not only Paul. Not only the
            famous names.{" "}
            <ArticleLink href="/blog/what-is-all-saints-day">
              Every single believer who loved His appearing
            </ArticleLink>
            . That is the whole case for All Saints&apos; Day in one verse, and it is also why{" "}
            <ArticleLink href="/blog/what-is-all-souls-day">
              the church still prays, a day later, for the ones it is not yet certain have reached
              that rest
            </ArticleLink>
            .
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Keeping Both Days Well
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a parish Mass on either date to let these two days actually shape you.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Hebrews 12:1 on November 1.</strong> One verse, and the whole idea behind
            All Saints&apos; Day is sitting right there in your own Bible.
          </li>
          <li>
            <strong>Name someone specific on November 2.</strong> All Souls&apos; Day was never
            meant to stay abstract. Say a name out loud in prayer, someone you actually buried.
          </li>
          <li>
            <strong>Visit a grave if you have one nearby.</strong> Catholics have kept this custom
            for centuries around November 2, and a cemetery visit can turn into real prayer for
            anyone.
          </li>
          <li>
            <strong>Ask who your own cloud of witnesses actually is.</strong> Grandparents, a
            mentor, a friend who died in faith. Thank God for them by name this week.
          </li>
          <li>
            <strong>Hold grief and hope together on purpose.</strong> 1 Thessalonians 4:13 does not
            ask you to stop grieving. It asks you to grieve like someone who actually has hope.
          </li>
          <li>
            <strong>Do not let Halloween be the only thing you know about this week.</strong> That
            name comes from All Hallows&apos; Eve, the night before All Saints&apos; Day, and the
            costumes arrived centuries after the feast did.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses for All Saints&apos; and All Souls&apos; Day
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three passages carry the weight of both days between them.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Revelation 14:13</h3>
        <VerseQuote
          text="And I heard a voice from heaven saying unto me, Write, Blessed are the dead which die in the Lord from henceforth: Yea, saith the Spirit, that they may rest from their labours; and their works do follow them."
          reference="Revelation 14:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Rest from their labors, works following after them. That is the picture All Souls&apos;
          Day prays toward for every Christian it remembers.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Psalm 116:15</h3>
        <VerseQuote text="Precious in the sight of the LORD is the death of his saints." reference="Psalm 116:15" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Ten words, and they overturn how most people instinctively feel about a Christian&apos;s
          death. Not a loss God merely tolerates. Something He calls precious.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Corinthians 15:51 and 52</h3>
        <VerseQuote
          text="Behold, I shew you a mystery; We shall not all sleep, but we shall all be changed, In a moment, in the twinkling of an eye, at the last trump: for the trumpet shall sound, and the dead shall be raised incorruptible, and we shall be changed."
          reference="1 Corinthians 15:51 and 52"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Both days lean on this same mystery, a moment when every believer, already home or still
          waiting, is changed together.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About All Saints&apos; and All Souls&apos; Day
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between All Saints&apos; Day and All Souls&apos; Day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All Saints&apos; Day, November 1, celebrates everyone the Catholic Church believes is
          already in heaven. All Souls&apos; Day, November 2, prays for the faithful departed who
          may still be in purgatory. One day celebrates. The next day intercedes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is All Saints&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A Catholic solemnity kept every November 1, honoring every saint in heaven, famous or
          never named. It traces back to Pope Gregory III fixing the date in the eighth century,
          and Pope Gregory IV extending it to the whole church about a century later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is All Souls&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Commemoration of All the Faithful Departed, November 2, a day Catholics pray for
          souls in purgatory. It began at the monastery of Cluny under Abbot Odilo in the eleventh
          century and later spread through the wider church.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is either day a holy day of obligation?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Only All Saints&apos; Day, and only in most years. The USCCB lists November 1 among the
          six holy days of obligation in the United States, with one exception: when it falls on a
          Saturday or a Monday, the Mass obligation is lifted. All Souls&apos; Day carries no such
          obligation in any year.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do Catholics pray for the dead on All Souls&apos; Day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Catholic teaching holds that some souls die in Christ but still need cleansing from the
          effects of sin before entering heaven fully, a state called purgatory. The church teaches
          that prayer, almsgiving, and the Mass offered for the dead can genuinely help a soul in
          that state.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants celebrate either day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many celebrate All Saints&apos; Day, including Lutherans, Anglicans, and Methodists,
          though they generally use the word saint more broadly for all believers. All Souls&apos;
          Day travels far less into Protestant practice, since most Protestant traditions reject
          the doctrine of purgatory it is built on.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does the Eastern Orthodox Church observe either day on these dates?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Orthodox Christians commemorate all saints together on the Sunday after Pentecost, a
          moving date tied to Easter, and keep several Saturdays of Souls through the year instead
          of one fixed All Souls&apos; Day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the connection between All Saints&apos; Day and Halloween?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Halloween gets its name from All Hallows&apos; Eve, the night before All Saints&apos;
          Day, once called All Hallows&apos; Day. The costumes and trick or treating developed
          centuries after the church feast and are not part of its religious meaning.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can non Catholics observe All Souls&apos; Day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Praying by name for someone you have lost or visiting a grave does not require
          accepting every detail of Catholic teaching on purgatory. The day&apos;s heart,
          remembering the dead with hope rather than silence, is open to any Christian.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the history and the doctrine, and the difference comes down to one shift in tense.</p>
          <p>
            📌 <strong>All Saints&apos; Day looks at the dead in Christ and says they have
            arrived.</strong> A cloud of witnesses, a multitude no one can number, already at rest.
          </p>
          <p>
            📌 <strong>All Souls&apos; Day looks at the dead in Christ and says we are still
            praying for them.</strong> Still asking, in Catholic belief, for whatever remains to be
            finished in them.
          </p>
          <p>
            📌 <strong>Both days rest on the same conviction.</strong> That the people you have
            buried in Christ are not simply gone, and that your prayers and your praise both still
            reach them.
          </p>
          <p>
            You do not need two days on a calendar to live like that is true. But{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              the church built its whole year around moments like this one
            </ArticleLink>
            , on purpose, so believers would not have to remember it alone.
          </p>
          <p>
            This week, name one person from your own cloud of witnesses. Thank God for them. Then
            pray for them too. Scripture leaves room for both.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="2 November 2026"
        sources={[
          {
            title: "All Saints' Day",
            publisher: "Catholic Encyclopedia, New Advent",
            url: "https://www.newadvent.org/cathen/01315a.htm",
            note: "The source for the fourth century Antioch origins, Boniface IV's 609 Pantheon dedication, and Gregory III and Gregory IV fixing and extending the November 1 date.",
          },
          {
            title: "All Souls' Day",
            publisher: "Catholic Encyclopedia, New Advent",
            url: "https://www.newadvent.org/cathen/01315b.htm",
            note: "The source for Abbot Odilo of Cluny instituting the commemoration, the doctrine of purgatory behind it, and the custom's spread through the Benedictine order.",
          },
          {
            title: "Canon 1246 Complementary Norms",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/beliefs-and-teachings/what-we-believe/canon-law/complementary-norms/canon-1246",
            note: "The source for the six U.S. holy days of obligation and the rule lifting the Mass obligation when November 1 falls on a Saturday or Monday.",
          },
          {
            title: "All Souls' Day",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/All_Souls%27_Day",
            note: "The source for Eastern Orthodox Saturdays of Souls, the Panikhida and koliva custom, and how Lutheran and Anglican traditions relate All Souls' Day to All Saints'.",
          },
          {
            title: "All Saints' Day",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/All_Saints%27_Day",
            note: "The source for the Eastern Orthodox observance on the Sunday after Pentecost, and Lutheran, Anglican, and Methodist observance of All Saints' Day.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
