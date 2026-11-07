import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-a-feast-day", {
  title: "What Is a Saint's Feast Day? Why the Date Is Usually a Death Day",
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

export default function WhatIsAFeastDayPage() {
  return (
    <BlogPostShell
      slug="what-is-a-feast-day"
      title={<>📖 What Is a Saint&apos;s Feast Day? Why the Date Is Usually a Death Day</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Open a Catholic calendar and you will find a name sitting next to almost every day
              of the year. Saint somebody, feast day today.
            </p>
            <p>
              Look closer and something odd shows up. The date usually has nothing to do with when
              that person was born. It is the day they died.
            </p>
            <p>That seems backward until you learn why the church picked it on purpose.</p>
            <p>
              📌 <strong>Here is the plain answer. A feast day almost always falls on the date a
              saint died, not the date they were born, because the early church read a martyr&apos;s
              death as their birth into heaven. The Latin term for it is dies natalis, a birthday.
              Only three people on the whole calendar get an earthly birthday instead, and the
              church had to make its peace with the fact that for most saints, nobody actually
              knows the real date at all.</strong>
            </p>
            <p>
              This guide walks through where that custom started, why the church marked death
              instead of birth on purpose, who the three exceptions are, and what happens when the
              real date was never written down.
            </p>
            <p>Every historical claim below links back to a named source you can check yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is easy to treat a feast day as a trivia question. Which saint, which date, next.
          </p>
          <p>
            ⚠️ <strong>But the choice to mark death instead of birth is a statement of belief, not
            an accident of record keeping.</strong> It says the day a Christian&apos;s body gave out is
            not the saddest day of their story. It is the day they actually arrived.
          </p>
          <VerseQuote
            text="Precious in the sight of the LORD is the death of his saints."
            reference="Psalm 116:15"
          />
          <p>
            💡 <strong>A calendar built on that verse is not morbid.</strong> It is a yearly
            reminder that your own death, if you belong to Christ, is not the end of your story
            either.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What a Feast Day Actually Marks
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Word the Church Uses: Dies Natalis, a Birthday Into Heaven
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Natalis is just the Latin word for birthday. Romans and Greeks used it, and the Greek
            equivalent genethlios, for the day a person was born into the world.
          </p>
          <p>
            📌 <strong>Early Christians took that same word and pointed it somewhere else
            entirely.</strong> The 1911 Catholic Encyclopedia entry on the subject, hosted by New
            Advent, explains that Christians applied natalis to the day a martyr died, treating it
            as a kind of birthday rather than an ending.
          </p>
          <p>
            Ambrose made the logic explicit. The same source quotes him saying the day of a
            Christian&apos;s burial is called a birthday, because being set free from the prison of
            our sins, we are born into the liberty of the Savior.
          </p>
          <p>
            Origen noticed the opposite was also true of Scripture&apos;s villains. The Encyclopedia
            notes that he pointed out no saint in the Bible is recorded keeping a feast on his own
            birthday, while sinners like Pharaoh and Herod are the ones who throw birthday
            banquets.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Where the Custom Started: A Grave in Smyrna
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The earliest clear example on record is Polycarp, the bishop of Smyrna, burned alive
            for his faith around the year 155 or 156.
          </p>
          <p>
            The letter the church at Smyrna wrote afterward, preserved among the early church
            fathers and hosted by New Advent, describes believers planning to gather at the spot
            where his bones were kept, with joy and gladness, to celebrate what it calls the
            anniversary of his martyrdom.
          </p>
          <p>
            📌 <strong>That gathering is the first saint&apos;s day the church&apos;s own history can
            actually point to.</strong> The letter says the day is kept partly to remember a man who
            had already run his race, and partly to train everyone still running theirs.
          </p>
          <p>
            Once one congregation did this for one bishop, the shape of the whole calendar was set.
            Record the day a Christian died. Gather there every year. Call it a birthday.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Why Death, Not Birth, Was the Day Worth Marking
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul gave the early church the theology that made this an easy call, not just a nice
            turn of phrase.
          </p>
          <VerseQuote text="For to me to live is Christ, and to die is gain." reference="Philippians 1:21" />
          <p>
            Near the end of his own life, Paul described his coming death the same way a runner
            describes a finish line, not a wall.
          </p>
          <VerseQuote
            text="For I am now ready to be offered, and the time of my departure is at hand. I have fought a good fight, I have finished my course, I have kept the faith: Henceforth there is laid up for me a crown of righteousness, which the Lord, the righteous judge, shall give me at that day: and not to me only, but unto all them also that love his appearing."
            reference="2 Timothy 4:6 to 8"
          />
          <p>
            💡 <strong>A feast day is the church saying the same thing out loud, once a year, about
            one specific person.</strong> This is the day they crossed the line, not the day
            everyone should feel bad about.
          </p>
          <p>
            It also fits what the day actually becomes on the calendar.{" "}
            <ArticleLink href="/blog/solemnity-feast-memorial-difference">
              The rank a feast day carries, solemnity, feast, or memorial
            </ArticleLink>
            , is decided separately, but the date underneath almost every rank still starts the
            same way, with the day a saint went home.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Three Exceptions: Jesus, Mary, and John the Baptist
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Only three figures on the entire church calendar get a feast tied to their earthly
            birth instead of their death. Jesus at Christmas. Mary on September 8. John the Baptist
            on June 24.
          </p>
          <p>
            Catholic World Report&apos;s own explainer on John&apos;s feast states plainly that he is one
            of only three people, after Jesus and Mary, whose birthday is actually celebrated in
            the liturgy.
          </p>
          <p>
            John gets the exception because Scripture records him as already set apart before
            birth.
          </p>
          <VerseQuote
            text="And it came to pass, that, when Elisabeth heard the salutation of Mary, the babe leaped in her womb; and Elisabeth was filled with the Holy Ghost:"
            reference="Luke 1:41"
          />
          <p>
            The traditional reading of that leap, repeated across Catholic teaching material, is
            that John was already being set free from the weight every other child carries, before
            he ever drew breath. Birth itself was already something worth marking.
          </p>
          <p>
            Mary&apos;s case is similar in shape but different in detail. EWTN&apos;s page on her Nativity
            says the feast was fixed to September 8 once the separate feast of her Immaculate
            Conception had spread through the church, nine months earlier on December 8. The same
            page is honest that the Gospels say nothing about her birth at all. The only account
            comes from the Protevangelium of James, an apocryphal writing from the end of the
            second century that later tradition built on.
          </p>
          <p>
            📌 <strong>Say that plainly, not tidily.</strong> The church marks Mary&apos;s birth on a
            date drawn from a text outside Scripture, not from an eyewitness record the way most
            feast dates eventually come from a death.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. When Nobody Knows the Real Date, the Church Still Has to Pick One
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The dies natalis idea only works cleanly when somebody actually wrote the death date
            down at the time. For most of Christian history, almost nobody did.
          </p>
          <p>
            Thomas Aquinas is the clearest modern example of what happens next. He died on March 7,
            1274. Wikipedia&apos;s account of his feast records that his actual death date still falls
            during Lent most years, a season the Roman calendar keeps mostly free of saints&apos; days.
            The 1969 reform of the General Roman Calendar moved his feast to January 28 instead,
            the date his relics were carried to Toulouse in 1369.
          </p>
          <p>
            📌 <strong>That is not the church pretending the death date does not matter.</strong> It
            is the church choosing a different real date from the same saint&apos;s life, a
            translation of relics, when the dies natalis itself cannot be kept well on the
            liturgical calendar that particular year.
          </p>
          <p>
            Most older saints have no surviving death date at all, only a local tradition and a
            cause opened centuries after the fact. That is the gap{" "}
            <ArticleLink href="/blog/how-does-the-church-make-a-saint">
              the canonization process
            </ArticleLink>{" "}
            exists to close today, gathering testimony and documents a first century martyr&apos;s
            neighbors never had reason to write down.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Keeping a Feast Day Well
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a parish calendar to let this custom actually teach you something.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Look up the saint behind your own name, or your church&apos;s name.</strong>{" "}
            Find the date, and read what actually happened on it before you assume.
          </li>
          <li>
            <strong>Read Philippians 1:21 before you read a saint&apos;s biography.</strong> It is the
            verse that makes the whole custom make sense.
          </li>
          <li>
            <strong>Do not confuse a feast day with a birthday party.</strong> One honors an
            arrival in heaven. The other honors an arrival on earth. Both matter, for different
            reasons.
          </li>
          <li>
            <strong>Check whether a saint has more than one date on the calendar.</strong> A second
            date, like Aquinas&apos;s January 28, usually marks something real, not a mistake.
          </li>
          <li>
            <strong>Go read the story behind one specific date.</strong>{" "}
            <ArticleLink href="/blog/when-is-saint-nicholas-day">
              Saint Nicholas Day on December 6
            </ArticleLink>{" "}
            is kept on his actual death date, a rare case where the popular legend and the church
            calendar agree on the day.
          </li>
          <li>
            <strong>Let 2 Timothy 4:7 shape how you measure your own life.</strong> Paul was not
            counting years lived. He was counting a race finished.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses About a Saint&apos;s Feast Day
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Scripture never uses the phrase feast day the way a modern calendar does. But four
            passages carry almost the entire reasoning behind the custom.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Psalm 116:15</h3>
        <VerseQuote
          text="Precious in the sight of the LORD is the death of his saints."
          reference="Psalm 116:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This single line is the whole calendar in miniature. If God Himself calls a believer&apos;s
          death precious, marking that date every year is not strange at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Philippians 1:21</h3>
        <VerseQuote text="For to me to live is Christ, and to die is gain." reference="Philippians 1:21" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul is not being dramatic here. He is stating the plain math behind every dies natalis
          on the calendar. Death is not loss for a believer. It is gain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Revelation 14:13</h3>
        <VerseQuote
          text="And I heard a voice from heaven saying unto me, Write, Blessed are the dead which die in the Lord from henceforth: Yea, saith the Spirit, that they may rest from their labours; and their works do follow them."
          reference="Revelation 14:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A voice from heaven calls this death blessed, not merely bearable. The martyrs whose
          graves started this whole custom were reading a promise exactly like this one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Timothy 4:7 and 8</h3>
        <VerseQuote
          text="I have fought a good fight, I have finished my course, I have kept the faith: Henceforth there is laid up for me a crown of righteousness, which the Lord, the righteous judge, shall give me at that day: and not to me only, but unto all them also that love his appearing."
          reference="2 Timothy 4:7 and 8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul wrote this near his own execution. A feast day is the church repeating his verdict
          about one more believer each time it comes around, a race finished well, not a life cut
          short.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Feast Days
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a saint&apos;s feast day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A feast day is the date the church sets aside each year to remember a particular saint,
          almost always the date of their death, understood as their birthday into heaven rather
          than an ending.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why is a feast day usually the date of death, not birth?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Early Christians, following the custom recorded in the Martyrdom of Polycarp, read a
          believer&apos;s death as their true birth into eternal life, which made the death date, not
          the earthly birth date, the day worth marking every year.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does dies natalis mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Dies natalis is Latin for day of birth. The early church applied the word to a martyr&apos;s
          death date, treating it as the day they were truly born, into heaven rather than into the
          world.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Which saints get feast days on their actual birthday instead of their death?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Only three figures on the church calendar: Jesus at Christmas, Mary on September 8, and
          John the Baptist on June 24. Scripture presents all three as set apart before or at
          birth, which is the reason given for the exception.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What happens when nobody knows a saint&apos;s real death date?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The church assigns the closest real date it can document instead, often the date relics
          were moved to a new church, the way Thomas Aquinas&apos;s feast moved to January 28, the
          date his relics reached Toulouse, rather than his actual March 7 death date.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is a feast day the same thing as a patron saint?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No.{" "}
          <ArticleLink href="/blog/what-is-a-patron-saint">
            A patron saint is chosen for a connection to a place, trade, or person
          </ArticleLink>
          , while a feast day is simply the date the whole church remembers that saint every year.
          A saint can have one without needing the other.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can a saint have more than one feast day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Some saints carry a second date marking a translation of relics or another
          documented event in addition to their dies natalis, which is why a few names appear on
          the calendar more than once a year.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants observe saints&apos; feast days?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It varies widely. Tabletalk Magazine&apos;s own account of the Reformation notes that the
          Continental Reformers kept a small set of feast days while other Reformed Christians
          opposed structuring the year around saints&apos; days at all. Many Anglican and Lutheran
          calendars kept a reduced set of feasts, while most other Protestant traditions kept none.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does the Bible never use the phrase feast day for a saint?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture describes feasts as commanded gatherings for God Himself, like Passover, not
          as yearly remembrances of individual believers. The custom of a personal feast day grew
          up afterward, out of verses like Psalm 116:15 and Philippians 1:21, rather than a direct
          biblical command.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the history, and three things remain true about the date next to a saint&apos;s name.</p>
          <p>
            📌 <strong>The date almost always marks an ending the church refuses to call sad.</strong>{" "}
            A grave in Smyrna started a custom still running nineteen centuries later, built on the
            plain belief that a believer&apos;s death is a birthday, not a loss.
          </p>
          <p>
            📌 <strong>Only three births ever made the calendar.</strong> Jesus, Mary, and John the
            Baptist, each for a reason Scripture itself gives, which only makes the pattern for
            everyone else stand out more clearly.
          </p>
          <p>
            📌 <strong>When the real date was lost, the church still had to choose one.</strong>{" "}
            Aquinas&apos;s January 28 shows a calendar being honest about a gap in the record, not
            papering over it.
          </p>
          <p>
            Whatever saint&apos;s name sits on your own calendar today, the question underneath the
            history is the same one Paul asked of his own life. Not when were you born, but what
            will the day you die actually be the birthday of.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="7 November 2026"
        sources={[
          {
            title: "Natal Day",
            publisher: "Catholic Encyclopedia (1911), via New Advent",
            year: "1911",
            url: "https://www.newadvent.org/cathen/10709a.htm",
            note: "The source for the Latin term dies natalis, the early church applying natalis to a martyr's death date, and the Ambrose and Origen quotations on death as a birthday.",
          },
          {
            title: "The Encyclical Epistle of the Church at Smyrna Concerning the Martyrdom of the Holy Polycarp",
            publisher: "Ante-Nicene Fathers, via New Advent",
            url: "https://www.newadvent.org/fathers/0102.htm",
            note: "The primary account of the church at Smyrna planning to gather at Polycarp's grave to celebrate the anniversary of his martyrdom, the earliest clearly recorded saint's day.",
          },
          {
            title: "Feast of Saint Thomas Aquinas",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Feast_of_Saint_Thomas_Aquinas",
            note: "The source for Aquinas's March 7, 1274 death date, the 1969 move of his feast to January 28, and that date marking the 1369 translation of his relics to Toulouse.",
          },
          {
            title: "Summer Christmas: Why Does the Catholic Church Celebrate the Birthday of St. John the Baptist?",
            publisher: "Catholic World Report",
            year: "2026",
            url: "https://www.catholicworldreport.com/2026/06/24/summer-christmas-why-does-the-catholic-church-celebrate-the-birthday-of-st-john-the-baptist/",
            note: "The source for John the Baptist being one of only three people, after Jesus and Mary, whose earthly birthday is kept as a feast on the church calendar.",
          },
          {
            title: "Nativity of the Blessed Virgin Mary",
            publisher: "EWTN",
            url: "https://www.ewtn.com/catholicism/saints/nativity-of-the-blessed-virgin-mary-821",
            note: "The source for Mary's Nativity being fixed to September 8, nine months after the Immaculate Conception, and for her birth account coming from the apocryphal Protevangelium of James rather than the Gospels.",
          },
          {
            title: "Defining Our Days",
            publisher: "Tabletalk Magazine, Ligonier Ministries",
            year: "2003",
            url: "https://tabletalkmagazine.com/article/2003/01/defining-our-days/",
            note: "The source for the Continental Reformers keeping a reduced set of feast days while other Reformed Christians opposed structuring the calendar around saints' days at all.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
