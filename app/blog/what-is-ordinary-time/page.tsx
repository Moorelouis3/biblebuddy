import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-ordinary-time", {
  title: "What Is Ordinary Time? The Longest Season of the Church Year",
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

export default function WhatIsOrdinaryTimePage() {
  return (
    <BlogPostShell
      slug="what-is-ordinary-time"
      title={<>📖 What Is Ordinary Time? The Longest Season of the Church Year</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Advent gets candles. Lent gets ashes and a fast. Christmas gets a whole season of its
              own, and Easter gets fifty days of celebrating.
            </p>
            <p>
              Then there is the stretch your pastor or your Catholic coworker calls Ordinary Time,
              and it sounds like the church simply ran out of things to say about those weeks.
            </p>
            <p>
              📌 <strong>Here is the plain answer. Ordinary Time is not a gap between the real
              seasons. It is the longest season on the whole church calendar, thirty three or
              thirty four weeks a year, and the word ordinary does not mean plain. It means
              ordered, numbered, counted.</strong>
            </p>
            <p>
              This guide walks through where that name actually comes from, exactly when the season
              starts and ends, why its length changes most years, what it looked like before 1969,
              and why its color is green.
            </p>
            <p>Every historical and liturgical claim below links back to a named source you can check yourself.</p>
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
            It is easy to treat Ordinary Time as the part of the year you can skip past to get to
            the next real season.
          </p>
          <p>
            ⚠️ <strong>But most of your Christian life happens during weeks exactly like
            these.</strong> No fast. No countdown. No decorations. Just an ordinary Tuesday, asking
            you to still follow Jesus on it.
          </p>
          <VerseQuote
            text="And Jesus increased in wisdom and stature, and in favour with God and man."
            reference="Luke 2:52"
          />
          <p>
            💡 <strong>Even Jesus had years the Gospels compress into one verse.</strong> Most of
            His earthly life was not a miracle on a feast day. It was ordinary growth, in an
            ordinary house, in an ordinary town. A church calendar that gives more than half the
            year to a season with no special drama is not being lazy. It is telling you the
            truth about where most of your own faith will actually be lived out.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Ordinary Time Actually Is
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. What the Word Ordinary Actually Means
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Say the season&apos;s name out loud to most people and they hear the everyday meaning
            of ordinary. Plain. Unremarkable. Nothing going on.
          </p>
          <p>
            📌 <strong>That is not where the word comes from.</strong> Catholic writer Jennifer
            Gregory Miller, in a Catholic Culture commentary on the season, traces ordinary to the
            Latin root ordo and ordinalis, the source of the English word ordinal. She writes that
            &quot;the weeks of Ordinary Time are ordered weeks, numbered sequentially.&quot;
          </p>
          <p>
            Ordinal numbers are first, second, third, and so on. That is literally what the Sundays
            of this season are called on a Catholic calendar. The Second Sunday in Ordinary Time.
            The Twentieth Sunday in Ordinary Time. Counted weeks, not empty ones.
          </p>
          <p>
            Not every writer on the subject thinks the name lands well even once you know the
            history. John Grondelski, writing for the National Catholic Register, argues that
            calling a season Ordinary still leaves most people with the impression it is about
            &quot;whatever&apos;s left over&quot; once the real seasons are accounted for. He is not
            disputing where the word came from. He is pointing out that the technical meaning
            rarely survives contact with how English speakers actually use the word.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Two Blocks: After Christmas, and After Easter
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ordinary Time is not one continuous run through the calendar. It comes in two separate
            pieces, split apart by Lent and Easter sitting in the middle of the year.
          </p>
          <p>
            The official Vatican document that created the modern calendar, the Universal Norms on
            the Liturgical Year and the General Roman Calendar, describes the season in paragraph
            43 as the weeks left over once Advent, Christmas, Lent, and Easter are accounted for,
            in which &quot;the mystery of Christ itself is honoured in its fullness, especially on
            Sundays.&quot;
          </p>
          <p>
            The USCCB&apos;s own page on the liturgical year puts the two blocks in plain terms, a
            shorter stretch &quot;of 4 to 8 weeks after Christmas Time,&quot; and a much longer one
            &quot;lasting about six months after Easter Time,&quot; during which the church
            considers the fullness of Jesus&apos; teachings and works among His people.
          </p>
          <p>
            📌 <strong>Picture the year as two mountains with a plain on either side.</strong> The
            Christmas mountain, the long plain of winter and early spring Ordinary Time, the Easter
            mountain, and then a much longer plain running all the way through summer and fall until
            Advent begins the climb again.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. How the First Block Starts: The Baptism of the Lord
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Universal Norms set the actual start date in paragraph 44. Ordinary Time
            &quot;begins on the Monday which follows the Sunday occurring after 6 January,&quot;
            and runs &quot;up to and including the Tuesday before the beginning of Lent.&quot;
          </p>
          <p>
            That Sunday after January 6 has its own name on the calendar. Paragraph 7 of the same
            document states plainly that &quot;the Sunday following 6 January is the Feast of the
            Baptism of the Lord.&quot; Ordinary Time&apos;s first numbered week opens the very next
            morning.
          </p>
          <p>
            That is not a coincidence of timing. The season that follows is built around Christ&apos;s
            adult, public ministry, and His baptism in the Jordan is the hinge the Gospels
            themselves use to open that ministry. The calendar is simply following the same order
            Scripture already set.{" "}
            <ArticleLink href="/blog/what-is-epiphany">
              Epiphany
            </ArticleLink>{" "}
            and the days immediately around it are the last stop before that shift.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. How It Ends: The Solemnity of Christ the King
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The second, much longer block starts the Monday after Pentecost and keeps running until
            the Universal Norms close it out, ending &quot;before First Vespers of the First Sunday
            of Advent.&quot;
          </p>
          <p>
            Paragraph 7 names the exact Sunday that caps the whole season off.{" "}
            <ArticleLink href="/blog/what-is-the-feast-of-christ-the-king">
              The Last Sunday in Ordinary Time is the Solemnity of Our Lord Jesus Christ, King of
              the Universe
            </ArticleLink>
            , the final numbered Sunday of the entire church year, every single time.
          </p>
          <p>
            📌 <strong>That placement is deliberate.</strong> Every ordinary week of discipleship
            the season has walked through all year ends the same way, standing in front of a King,
            right before{" "}
            <ArticleLink href="/blog/when-does-advent-begin">
              Advent begins the next cycle
            </ArticleLink>{" "}
            all over again.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why the Season Runs Thirty Three Weeks Some Years, Thirty Four Others
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ordinary Time does not have a fixed number of weeks. The Universal Norms state it
            directly in paragraph 43. The season covers &quot;thirty three or thirty four
            weeks,&quot; depending on the year.
          </p>
          <p>
            Easter moves. It can fall as early as late March or as late as April 25, and Lent
            always begins forty six days before it, counting Sundays. A late Easter pushes Lent&apos;s
            start later too, which stretches the first block of Ordinary Time out by a week or more
            compared to a year with an early Easter.
          </p>
          <p>
            Christ the King stays fixed as the final Sunday no matter what, so the stretching and
            shrinking all happens in that first winter block, between the Baptism of the Lord and
            Ash Wednesday. Count the actual numbered weeks assigned for a given year, and the total
            lands on thirty three in years with an early Easter, thirty four in years with a late
            one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Before 1969: Sundays After Epiphany, Sundays After Pentecost
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ordinary Time as a single, continuously numbered season is younger than it looks. Pope
            Paul VI approved the Universal Norms in 1969, effective the following year, replacing a
            calendar that had split these same weeks into two differently named, separately counted
            periods.
          </p>
          <p>
            John Grondelski&apos;s National Catholic Register piece lays out what those two older
            names were. The weeks now making up the first block of Ordinary Time were called
            Sundays After Epiphany. The far longer second block was Sundays After Pentecost, a name
            the older calendar still uses today wherever the pre 1969 form of the Mass is
            celebrated.
          </p>
          <p>
            Jennifer Gregory Miller&apos;s commentary describes why the reform changed it. The old
            system created what she calls &quot;the confusion of Time after Epiphany Sundays
            inserted at the end of the year&quot; whenever Easter fell early and the Pentecost count
            ran out of room. A single, continuously numbered season solved that problem by simply
            never running out of numbers.
          </p>
          <p>
            📌 <strong>Say plainly what changed and what did not.</strong> The weeks themselves are
            the same weeks the church has always kept. Only the naming and numbering system around
            them is new, a 1969 fix for a counting problem, not a new season invented from nothing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Why the Color Is Green
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Walk into a Catholic parish on most Sundays of the year and the color at the altar will
            be green. The USCCB&apos;s own page on liturgical colors lists green as the color for
            Ordinary Time, plain and simple.
          </p>
          <p>
            Green is the color of a plant that is still growing, not yet finished, not yet in bloom.
            That is exactly the picture Jesus Himself reached for when He described what this
            unremarkable, uncelebrated kind of time is actually for.
          </p>
          <VerseQuote
            text="So is the kingdom of God, as if a man should cast seed into the ground; And should sleep, and rise night and day, and the seed should spring and grow up, he knoweth not how. For the earth bringeth forth fruit of herself; first the blade, then the ear, after that the full corn in the ear."
            reference="Mark 4:26 to 28"
          />
          <p>
            💡 <strong>Nobody watches a seed and sees a miracle happening in real time.</strong>{" "}
            They see dirt, for weeks, until one day there is a stalk. Ordinary Time is the church
            telling you that most of your own growth in Christ will look exactly that
            unremarkable, right up until the day it very much is not.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Keeping Ordinary Time Well
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a parish calendar on your wall to let this season actually shape you.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Stop waiting for a special season to take your faith seriously.</strong> If
            discipleship only happens during Advent or Lent, you have missed roughly ten months of
            the year it was always meant to cover.
          </li>
          <li>
            <strong>Read Mark 4:26 to 28 on a day that feels completely uneventful.</strong> Let it
            reframe what an ordinary Tuesday is actually doing in your spiritual life.
          </li>
          <li>
            <strong>Notice the green.</strong> If your own church follows the liturgical colors,
            let that color be a weekly reminder that growth, not drama, is the normal shape of
            following Jesus.
          </li>
          <li>
            <strong>Pick one small habit and keep it for the whole stretch.</strong> A short daily
            reading plan or a single memorized verse, kept for thirty three weeks straight, will
            change you more than one intense week of Lent ever could on its own.
          </li>
          <li>
            <strong>Do not confuse ordinary with unimportant.</strong> The word describes how the
            weeks are numbered, not how much they matter to your own walk with God.
          </li>
          <li>
            <strong>Mark the two hinge points on your own calendar.</strong> The Baptism of the Lord
            and the Solemnity of Christ the King are easy to miss, and both say something worth
            pausing on about who Jesus actually is.
          </li>
          <li>
            <strong>Ask what your own tradition calls this stretch.</strong> Whether you hear
            Ordinary Time or the Season After Pentecost, the weeks underneath are the same weeks,
            and{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              the different names different churches use
            </ArticleLink>{" "}
            are worth understanding rather than dismissing.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses About Ordinary, Everyday Growth
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ordinary Time has no feast of its own to preach on, so the Sunday readings spend the
            season walking straight through Jesus&apos; public ministry. These five passages carry
            the theme underneath that choice.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Mark 4:26 to 29</h3>
        <VerseQuote
          text="So is the kingdom of God, as if a man should cast seed into the ground; And should sleep, and rise night and day, and the seed should spring and grow up, he knoweth not how. For the earth bringeth forth fruit of herself; first the blade, then the ear, after that the full corn in the ear. But when the fruit is brought forth, immediately he putteth in the sickle, because the harvest is come."
          reference="Mark 4:26 to 29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Jesus picked an ordinary farming picture on purpose. The man in the parable does not
          understand how the seed grows. He just keeps living his ordinary days while it does.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 2:51 and 52</h3>
        <VerseQuote
          text="And he went down with them, and came to Nazareth, and was subject unto them: but his mother kept all these sayings in her heart. And Jesus increased in wisdom and stature, and in favour with God and man."
          reference="Luke 2:51 and 52"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Luke covers years of Jesus&apos; childhood in one sentence. Most of the Son of God&apos;s
          earthly life was lived in exactly the kind of unremarkable, undocumented time this season
          is named for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Colossians 2:6 and 7</h3>
        <VerseQuote
          text="As ye have therefore received Christ Jesus the Lord, so walk ye in him: Rooted and built up in him, and stablished in the faith, as ye have been taught, abounding therein with thanksgiving."
          reference="Colossians 2:6 and 7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul describes faith with the same picture the season does. Being rooted and built up
          does not happen in one dramatic moment. It happens across ordinary weeks of simply
          walking with Christ.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Philippians 1:6</h3>
        <VerseQuote
          text="Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ:"
          reference="Philippians 1:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul is not confident because of a single breakthrough. He is confident because God
          finishes what He starts, across every ordinary day between the start and the finish.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Peter 3:18</h3>
        <VerseQuote
          text="But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ. To him be glory both now and for ever. Amen."
          reference="2 Peter 3:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The command is simply grow. Not perform a feat, not keep a fast, just keep growing, which
          is the one command that can only ever be obeyed in ordinary time.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Ordinary Time
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Ordinary Time in the Catholic Church?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ordinary Time is the name for the thirty three or thirty four weeks of the church year
          that fall outside Advent, Christmas, Lent, and Easter, counted in ordinal, numbered
          Sundays rather than tied to a particular event like Christ&apos;s birth or resurrection.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is it called Ordinary Time if it is not plain or unimportant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The word ordinary here comes from the Latin ordinalis, meaning numbered or ordered, not
          from the everyday English sense of plain. The Sundays are literally called the First,
          Second, Third Sunday in Ordinary Time, and so on, straight through the count.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When does Ordinary Time start?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The first block starts the Monday after the Feast of the Baptism of the Lord, the Sunday
          following January 6, and runs until the Tuesday before Ash Wednesday. The second, longer
          block starts the Monday after Pentecost Sunday.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When does Ordinary Time end?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The first block ends right before Lent begins. The second and much longer block ends on
          the Solemnity of Christ the King, the final Sunday of the entire church year, the week
          before the First Sunday of Advent.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many weeks is Ordinary Time?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Thirty three weeks in years with an earlier Easter, thirty four in years with a later one,
          because a later Easter pushes Lent&apos;s start back and stretches the winter block of
          Ordinary Time by an extra week or more.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What color is worn during Ordinary Time?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Green, which the USCCB&apos;s own guide to liturgical colors assigns specifically to
          Ordinary Time, a traditional picture of living, growing things rather than a finished
          harvest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did the church call these weeks before 1969?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The winter weeks were called Sundays After Epiphany, and the much longer summer and fall
          stretch was Sundays After Pentecost, two separately counted periods that the 1969 reform
          replaced with one continuous numbered season.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestant churches observe Ordinary Time?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many do, through the Revised Common Lectionary shared by several mainline traditions. The
          Christian Resource Institute&apos;s own lectionary guide labels the same stretch Counted
          Sundays After Pentecost, the same ordinal counting Ordinary Time uses, under a different
          name. Many other Protestant churches follow no fixed church calendar for these weeks at
          all.{" "}
          <ArticleLink href="/blog/what-is-the-liturgical-calendar">
            The wider liturgical calendar
          </ArticleLink>{" "}
          is kept with real variation across denominations.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Ordinary Time the same as the Season After Pentecost?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They overlap but are not identical. Season After Pentecost usually refers only to the
          second, longer block, while Ordinary Time on the Catholic calendar also covers the
          shorter winter block between the Baptism of the Lord and Ash Wednesday.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does anything special happen during Ordinary Time?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Individual saints&apos; feast days and holy days still fall throughout it, and the Sunday
          readings walk steadily through Jesus&apos; public ministry and teaching. The season has
          no single theme of its own on purpose, which is exactly the point its name is making.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the confusion around the name, and three things remain true about Ordinary Time.</p>
          <p>
            📌 <strong>It is the longest season on the calendar, not a gap between the real
            ones.</strong> Thirty three or thirty four weeks, built around the steady, unremarkable
            work of Christian growth rather than a single feast.
          </p>
          <p>
            📌 <strong>Ordinary means numbered, not unimportant.</strong> The weeks are counted in
            order, the way a seed grows in order, blade, then ear, then the full corn, with nothing
            skipped.
          </p>
          <p>
            📌 <strong>It opens with Christ&apos;s baptism and closes with Christ as King.</strong>{" "}
            Everything ordinary in between sits inside those two bookends, which is the whole
            argument for taking an ordinary Tuesday seriously.
          </p>
          <p>
            Most of your life with God will not happen on a feast day. It will happen on a week
            nobody marked on any calendar at all. Ordinary Time is the church telling you, every
            single year, that this is exactly where growth was always supposed to happen.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="8 November 2026"
        sources={[
          {
            title: "Universal Norms on the Liturgical Year and the General Roman Calendar",
            publisher: "Sacred Congregation for Divine Worship, approved by Pope Paul VI, hosted by the Liturgy Office of the Catholic Bishops' Conference of England and Wales",
            year: "1969",
            url: "https://www.liturgyoffice.org.uk/Calendar/Info/GNLY.pdf",
            note: "The source for paragraphs 43 and 44 defining Ordinary Time, its thirty three or thirty four week length, and its exact start and end dates, and for paragraph 7 naming the Baptism of the Lord and the Solemnity of Christ the King as its two hinge points.",
          },
          {
            title: "The Liturgical Year",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/prayer-worship/liturgical-year",
            note: "The source for Ordinary Time's two block description, the four to eight week winter stretch and the roughly six month summer and fall stretch, and for the season covering the fullness of Jesus' teachings and works.",
          },
          {
            title: "Understanding the Liturgical Colors",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/prayer-and-worship/liturgical-year-and-calendar/understanding-the-liturgical-colors",
            note: "The source for green being the color assigned to Ordinary Time.",
          },
          {
            title: "Our Ordinary Walk of Life: Understanding Tempus per Annum",
            publisher: "Catholic Culture, by Jennifer Gregory Miller",
            url: "https://www.catholicculture.org/commentary/our-ordinary-walk-life-understanding-tempus-per-annum/",
            note: "The source for the Latin root ordo and ordinalis behind the word ordinary, and for the pre 1969 calendar's confusion over Sundays after Epiphany running out of room at the end of some years.",
          },
          {
            title: "Do We Need Sundays After Pentecost?",
            publisher: "National Catholic Register, by John Grondelski",
            url: "https://www.ncregister.com/blog/do-we-need-sundays-after-pentecost",
            note: "The source for the pre 1969 names Sundays After Epiphany and Sundays After Pentecost, still used today in the older form of the Mass, and for the critique that the name Ordinary Time can read as 'whatever's left over.'",
          },
          {
            title: "Year A: Sundays after Pentecost (Ordinary Time)",
            publisher: "The Christian Resource Institute (crivoice.org), by Dennis Bratcher",
            url: "https://crivoice.org/lectionary/YearA/Aordinarylist.html",
            note: "The source for several Protestant traditions using the Revised Common Lectionary and labeling these same weeks Counted Sundays After Pentecost.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
