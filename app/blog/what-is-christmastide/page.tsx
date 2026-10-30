import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-christmastide", {
  title: "What Is Christmastide? The Twelve Days of Christmas Explained",
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

export default function WhatIsChristmastidePage() {
  return (
    <BlogPostShell
      slug="what-is-christmastide"
      title={<>📖 What Is Christmastide? The Twelve Days of Christmas Explained</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The tree comes down on December 26. The last candy cane gets eaten. Everyone goes back to work, and Christmas is officially over.</p>
            <p>Except, according to most of Christian history, it just started.</p>
            <p>Maybe you have heard the song about twelve days of Christmas and assumed it was just a strange list of birds and jewelry with no real meaning behind it.</p>
            <p>
              📌 <strong>Here is the plain answer. Christmastide is the actual Christian season that
              begins on Christmas Day and runs for twelve days, through January 5, with the wider
              Catholic calendar stretching the celebration even further into January. December 25 was
              never meant to be the whole party. It was meant to be day one.</strong>
            </p>
            <p>
              That one sentence raises more questions than it answers. Twelve days of what, exactly?
              Why does the song count gifts instead of church feasts? And why do Orthodox Christians,
              Catholics, and Protestants all seem to draw the lines in slightly different places?
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide walks through where Christmastide actually comes from, what the Catholic
              Church&apos;s own law says about its exact dates, the specific feast days hidden inside
              those twelve days, how Orthodox Christians keep the same season on their own calendar,
              and why most Protestant Christians treat the whole thing very differently.
            </p>
            <p>Every historical and liturgical claim below links back to a named source, so you can go check it yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is easy to treat December 25 like a finish line. The gifts are opened, the big meal is eaten, and the next thought is already about New Year&apos;s or getting back to normal.</p>
          <p>
            ⚠️ <strong>That instinct to rush past the manger is older than Black Friday.</strong> It is
            just human nature to want to move on quickly from something you cannot fully take in.
          </p>
          <p>Scripture describes the incarnation as something far too large for one day to hold.</p>
        </div>
        <VerseQuote
          text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
          reference="John 1:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God did not visit the world for an afternoon. He moved in.</strong> The Word
            becoming flesh is not a single transaction you can wrap up in twenty four hours. It keeps
            unfolding: a baby born, a name given, a light revealed to strangers from the east, a
            Savior eventually baptized as a grown man.
          </p>
          <p>
            💡 Christmastide exists because the Church, centuries ago, decided the Incarnation deserved
            more than a single day of attention before everyone moved on to ordinary life again.
          </p>
          <p>
            The stakes here are not really about calendars or decorations. The stakes are whether you
            let the birth of Christ actually sink in, or whether you let it get crowded out by the next
            thing on the list before you have even finished sitting with it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Christmastide Actually Is
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Plain Definition: Twelve Days, Starting on Christmas Day
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Start with the simplest version. Christmastide, also called Twelvetide, is the twelve day
            stretch that begins on December 25 and runs through January 5, the night traditionally
            called Twelfth Night.
          </p>
          <p>
            📌 <strong>Count it out and the math works cleanly.</strong> December 25, 26, 27, 28, 29,
            30, 31, then January 1 through 5. Twelve days, start to finish, closing the evening before
            Epiphany on January 6.
          </p>
          <p>
            This is the season behind the familiar carol. The gifts in the song are not the point of
            this guide. The twelve actual days behind the counting are.{" "}
            <ArticleLink href="/blog/what-is-christmas-eve">
              The night before all of this begins
            </ArticleLink>{" "}
            carries its own separate history, built around waiting rather than celebrating.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Where Rome Draws the Line: Christmas Time in Catholic Law
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is where most explanations of Christmastide stop short, and this guide will not.
            The twelve folk days are not actually the full length of the Catholic Church&apos;s own
            Christmas season.
          </p>
          <p>
            The Church&apos;s own General Norms for the Liturgical Year and the Calendar, the official
            document governing the Catholic calendar, states it plainly in its own numbered rule:
            &quot;Christmas Time runs from First Vespers (Evening Prayer I) of the Nativity of the Lord
            up to and including the Sunday after Epiphany or after 6 January.&quot;
          </p>
          <p>
            📌 <strong>That is longer than twelve days, on purpose.</strong> The same document states
            a second rule right after it: &quot;The Sunday falling after 6 January is the Feast of the
            Baptism of the Lord.&quot; That Sunday, not January 5 or January 6, is the day the Catholic
            Church&apos;s own Christmas season actually closes.
          </p>
          <p>
            So there are really two separate measuring sticks running at once. The twelve days most
            people know from the song are the older, shorter folk tradition. Christmas Time, the
            Church&apos;s own liturgical season, quietly runs a week or two beyond it, all the way to
            the Baptism of the Lord.{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              Where this season sits inside the Church&apos;s whole yearly calendar
            </ArticleLink>{" "}
            is worth understanding on its own.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Octave: Eight Days Counted as One Single Feast
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The first eight days of Christmastide are not just any eight days. The same official
            Catholic norms give the Nativity its own Octave, meaning the Church treats the first eight
            days of Christmas as one extended, continuous feast rather than eight separate ordinary
            days.
          </p>
          <p>The document lays the Octave out day by day:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 December 25, the Nativity of the Lord itself</li>
            <li>🟢 December 26, the Feast of Saint Stephen, the first Christian martyr</li>
            <li>🟢 December 27, the Feast of Saint John, Apostle and Evangelist</li>
            <li>🟢 December 28, the Feast of the Holy Innocents</li>
            <li>🟢 December 29 through 31, ordinary days within the Octave</li>
            <li>🟢 January 1, the Octave Day, kept as the Solemnity of Mary, the Holy Mother of God</li>
          </ul>
          <p>
            💡 Notice who gets remembered in those first few days. A martyr, an apostle who died of old
            age, and a group of murdered children. Christmastide does not wait long before reminding
            you that the Incarnation walked straight into a world of real suffering.
          </p>
          <p>
            The Sunday that falls within the Octave, or December 30 in a year with no such Sunday, also
            carries the Feast of the Holy Family. And whichever Sunday lands between January 2 and
            January 5 is marked as the Second Sunday after the Nativity, the last Sunday of the season
            before Epiphany itself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Twelfth Night and Where the Carol Actually Comes From
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            January 5, the last of the twelve folk days, is Twelfth Night, the eve of Epiphany. Christian
            History Institute, a magazine devoted to church history, traces the season&apos;s formal
            start to a church council meeting at Tours in the year 567, which named the days between
            Christmas and Epiphany a special, sacred season of feasting rather than ordinary time.
          </p>
          <p>
            📌 <strong>That council meeting is where &quot;the twelve days of Christmas&quot; comes
            from, long before it was ever a song.</strong> In medieval Western Europe, Twelfth Night
            itself became a night of real festivity, plays, and reversal of the usual order, which is
            also where William Shakespeare borrowed the name for his own comedy about mistaken
            identity.
          </p>
          <p>
            ⚠️ <strong>What this guide will not do is dress the carol&apos;s gift list up as a secret
            code for church teaching.</strong> That claim circulates widely online, but it is a
            separate, disputed question with real evidence problems on both sides, and it deserves its
            own honest treatment rather than a confident paragraph here. What is well established is
            simpler and sturdier: the twelve days themselves are a real, old feature of the Christian
            calendar, regardless of what any song&apos;s verses do or do not symbolize.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. How the Orthodox Church Keeps the Same Twelve Days
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Eastern Orthodox Christians keep a version of this same season, built around the same idea:
            the Nativity and the feast of Theophany, the Orthodox name for the Lord&apos;s baptism and
            manifestation, are treated as two connected Great Feasts with twelve festive days linking
            them together.
          </p>
          <p>
            The Orthodox Church in America&apos;s own published guide to the feast states it directly:
            &quot;December 25 through January 4 are fast free,&quot; following an afterfeast period of
            six days after the Nativity itself on December 25. Theophany, completing the twelve day
            arc, falls on January 6, with a strict fast kept the day before on January 5, the eve of the
            feast.
          </p>
          <p>
            Churches still using the older Julian calendar for their church year, including the Russian,
            Serbian, and Jerusalem Orthodox Churches, keep this exact same twelve day structure, just
            running on dates that currently sit thirteen days behind the Gregorian calendar most of the
            world uses.{" "}
            <ArticleLink href="/blog/why-is-christmas-on-january-7">
              The full explanation for why their Christmas lands on January 7 instead of December 25
            </ArticleLink>{" "}
            is its own guide, but the underlying twelve day season is the same one described here,
            simply read off an older calendar.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Why Most Protestants Keep One Day, Not a Season
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Be fair to both sides here, because Bible Buddy has Catholic and Protestant
            readers.</strong> Liturgical Protestant traditions, including Anglican and Lutheran
            churches, generally keep a version of the same twelve day Christmas season, often followed
            by their own Epiphany season afterward.
          </p>
          <p>
            Most other Protestant traditions, particularly Baptist, nondenominational, and many
            evangelical churches, do not observe a formal liturgical Christmas season at all. Christmas
            Day itself gets celebrated, and then ordinary church life simply resumes.
          </p>
          <p>Paul gave the theological reasoning many of these traditions still point back to.</p>
        </div>
        <VerseQuote
          text="Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new moon, or of the sabbath days: Which are a shadow of things to come; but the body is of Christ."
          reference="Colossians 2:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Never present one side of this as simply the Christian answer.</strong> A
            Catholic or Orthodox believer reads a structured Christmastide as the Church, with real
            authority Christ gave it, drawing out the full weight of the Incarnation over time. A
            Protestant reading Colossians 2 often concludes that no specific calendar of extra feast
            days is owed to God, even a good one, and that keeping or not keeping it is a matter of
            conscience rather than command.
          </p>
          <p>
            Both readers can love the same Christmas Day without agreeing on whether the twelve days
            that follow it are binding, optional, or simply unnecessary. That disagreement is honest,
            and it does not need to be settled here for either side to be taken seriously.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Actually Keeping Christmastide
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whether or not your own church marks these twelve days, here is how to let the season shape you a little, even quietly, on your own.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Leave the tree and lights up past December 26.</strong> You are not behind on
            taking down decorations. In most of Christian history, the season was only getting started.
          </li>
          <li>
            <strong>Read one Gospel passage a day for the twelve days.</strong> Spread the Christmas
            story out instead of reading it once on the 25th and moving on. Let it settle in slowly.
          </li>
          <li>
            <strong>Remember Saint Stephen and the Holy Innocents on their actual days.</strong> A
            quiet prayer for persecuted Christians on December 26, and for grieving parents on December
            28, keeps the season honest about the cost the Incarnation walked into.
          </li>
          <li>
            <strong>Mark January 1 as more than a countdown to resolutions.</strong> Many churches keep
            it as the day Mary is honored as the Mother of God and the day the name Jesus was formally
            given. Let that outrank your diet plan for five minutes.
          </li>
          <li>
            <strong>Plan something for Twelfth Night, January 5.</strong> A simple family meal or a
            short time of prayer gives the ending of the season its own shape, instead of letting it
            dissolve without notice.
          </li>
          <li>
            <strong>If your tradition does not mark these days, that is not a lesser faith.</strong>{" "}
            You can still choose to let the Incarnation occupy more than one day of your own personal
            attention, with or without a church calendar telling you to.
          </li>
          <li>
            <strong>Carry the season all the way to Epiphany.</strong>{" "}
            <ArticleLink href="/blog/what-is-epiphany">
              What the Church remembers on January 6
            </ArticleLink>{" "}
            is really the finish line this whole season has been walking toward the entire time.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses for the Twelve Days of Christmas
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Christmastide was built around real events in the Gospels, not a greeting card season. These five verses mark out the days themselves.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 2:21</h3>
        <VerseQuote
          text="And when eight days were accomplished for the circumcising of the child, his name was called JESUS, which was so named of the angel before he was conceived in the womb."
          reference="Luke 2:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Count eight days from Christmas and you land on January 1, the Octave Day the Catholic
            calendar keeps as the Solemnity of Mary and the giving of the Holy Name. This verse is the
            actual Gospel event behind that date, not a tradition invented later.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Matthew 2:1 and 2</h3>
        <VerseQuote
          text="Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, Saying, Where is he that is born King of the Jews? for we have seen his star in the east, and are come to worship him."
          reference="Matthew 2:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The wise men were already traveling while the twelve days were unfolding. Their arrival at
            the very end of the season is why the whole Christmastide arc has always pointed toward one
            destination: a star over a house, and strangers finally kneeling down.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Matthew 2:9 and 10</h3>
        <VerseQuote
          text="When they had heard the king, they departed; and, lo, the star, which they saw in the east, went before them, till it came and stood over where the young child was. When they saw the star, they rejoiced with exceeding great joy."
          reference="Matthew 2:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Twelve days of waiting end in exceeding great joy, not a shrug. Whatever your own
            Christmastide looks like this year, that is the emotion the season is actually built to
            arrive at.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 2:16 to 18</h3>
        <VerseQuote
          text="Then Herod, when he saw that he was mocked of the wise men, was exceeding wroth, and sent forth, and slew all the children that were in Bethlehem, and in all the coasts thereof, from two years old and under, according to the time which he had diligently enquired of the wise men. Then was fulfilled that which was spoken by Jeremy the prophet, saying, In Rama was there a voice heard, lamentation, and weeping, and great mourning, Rachel weeping for her children, and would not be comforted, because they are not."
          reference="Matthew 2:16 to 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the hard verse behind December 28&apos;s Feast of the Holy Innocents. Christmastide
            does not skip past it. A season built around real history has to make room for real grief,
            even grief this old and this heavy.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Galatians 4:4 and 5</h3>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Fulness of time is not a fast idea. It is a slow, deliberate one. Christmastide gives that
            phrase twelve actual days to breathe instead of twenty four rushed hours.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Christmastide
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Christmastide?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Christmastide, also called Twelvetide or the Twelve Days of Christmas, is the Christian
          season that begins on December 25 and runs twelve days through January 5, the eve of
          Epiphany. The Catholic Church&apos;s own liturgical Christmas season actually extends past
          those twelve days, all the way to the Feast of the Baptism of the Lord in January.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What are the twelve days of Christmas, exactly?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          December 25 through January 5. The Nativity itself has its own eight day Octave running
          December 25 to January 1, and the remaining four days lead up to Twelfth Night on January 5,
          the evening before Epiphany on January 6.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the song about a secret religious code?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That claim is widely repeated online, but it is a genuinely disputed theory, not a settled
          historical fact, and the evidence for it is weaker than the story suggests. The twelve days
          themselves are real and well documented; what a specific popular song&apos;s verses may or may
          not symbolize is a separate, far less certain question.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When does Christmastide actually end?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It depends which measuring stick you use. The folk tradition of twelve days ends January 5,
          Twelfth Night. The Catholic Church&apos;s own official Christmas season runs further, closing
          on the Feast of the Baptism of the Lord, the Sunday after January 6.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What feast days fall inside Christmastide?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Saint Stephen on December 26, Saint John the Evangelist on December 27, the Holy Innocents on
          December 28, the Holy Family on the Sunday within the Octave, and the Solemnity of Mary, the
          Holy Mother of God, on January 1, the Octave Day of Christmas itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Orthodox Christians celebrate Christmastide too?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Orthodox Christians keep a fast free twelve day period linking the Nativity on December
          25 to the feast of Theophany on January 6, the Orthodox celebration of Christ&apos;s baptism.
          Churches on the older Julian calendar keep the same structure on dates that currently fall
          thirteen days later on the Gregorian calendar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants celebrate the twelve days of Christmas?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Anglican and Lutheran churches generally do, following a version of the same liturgical
          calendar. Most Baptist, nondenominational, and many other evangelical churches do not observe
          a formal season, treating Christmas Day itself as the full observance and leaving the
          following days as a matter of personal choice.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Twelfth Night?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Twelfth Night is January 5, the final evening of the twelve days and the eve of Epiphany. In
          medieval Western Europe it became a night of feasting and festivity, and it is also where
          William Shakespeare borrowed the title for his own comedy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it wrong to take Christmas decorations down right after December 25?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No single verse requires anyone to keep decorations up for twelve days. It is simply a much
          older pattern than the modern habit of packing everything away on December 26, and many
          Christians find real meaning in letting the season run its full course on purpose.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Christmastide is not a quirky detail hiding behind a children&apos;s song. It is one of the
            oldest instincts in the Christian calendar: the conviction that God becoming flesh is too
            large an event to process in a single day.
          </p>
          <p>
            📌 <strong>Twelve real days, a saint and a group of murdered children remembered honestly
            along the way, and a Catholic calendar that keeps the celebration going even longer than
            that.</strong> None of it was ever about a song&apos;s gift list. All of it was about giving
            the Incarnation room to actually sink in.
          </p>
          <p>
            Whatever your own tradition does or does not observe on the calendar, you still get to
            decide how long you let the news of Christmas actually occupy your attention this year.{" "}
            <ArticleLink href="/blog/what-is-christmas">
              What that one birth in Bethlehem actually means
            </ArticleLink>{" "}
            does not stop mattering the moment the wrapping paper gets thrown away.
          </p>
          <p>So here is one way to carry it forward.</p>
          <p>Pick one day between now and January 5 that you would otherwise have treated as ordinary.</p>
          <p>Read the Christmas story again that day. Slowly, out loud if you can.</p>
          <p>Let the twelfth day of a two thousand year old season still have something to say to you.</p>
        </div>
      </section>

      <ArticleSources
        checkedOn="30 October 2026"
        sources={[
          {
            title: "General Norms for the Liturgical Year and the Calendar",
            publisher: "Catholic Bishops' Conference of England and Wales, Liturgy Office",
            url: "https://www.liturgyoffice.org/Calendar/Info/GNLY.pdf",
            note: "The source for the official text of nos. 32 to 38, defining Christmas Time as running from First Vespers of the Nativity to the Sunday after Epiphany, the structure of the Octave day by day, the Feast of the Holy Family, the Second Sunday after the Nativity, and the Feast of the Baptism of the Lord.",
          },
          {
            title: "Twelve days of Christmas",
            publisher: "Christian History Institute",
            url: "https://christianhistoryinstitute.org/magazine/article/ff-twelve-days-of-christmas",
            note: "The source for the Council of Tours in 567 naming the twelve days a season of feasting, the Western Octave feasts of Saint Stephen, Saint John, and the Holy Innocents, and Twelfth Night as the origin of Shakespeare's play title.",
          },
          {
            title: "The Nativity of Our Lord Jesus Christ",
            publisher: "Orthodox Church in America (OCA), Department of Christian Education",
            url: "https://www.oca.org/cdn/PDFs/evangelization/pamphlets/nativity-bw.pdf",
            note: "The source for the Nativity's six day afterfeast and the exact wording that December 25 through January 4 are fast free in Orthodox practice.",
          },
          {
            title: "Icons of the Twelve Great Feasts",
            publisher: "Orthodox Church in America (OCA)",
            url: "https://oca.org/fs/icons-of-twelve-great-feasts",
            note: "The source for the Nativity of Christ (December 25) and Theophany (January 6) as two of Orthodoxy's Twelve Great Feasts.",
          },
          {
            title: "Why Orthodox Christians celebrate Christmas in January",
            publisher: "National Geographic",
            year: "2022",
            url: "https://www.nationalgeographic.com/history/article/why-celebrate-christmas-january",
            note: "The source for the Julian calendar churches, including Russia, Serbia, and Jerusalem, sitting thirteen days behind the Gregorian calendar.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
