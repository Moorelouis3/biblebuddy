import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-epiphany", {
  title: "What Is Epiphany? The Meaning of Three Kings' Day on January 6",
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

export default function WhatIsEpiphanyPage() {
  return (
    <BlogPostShell
      slug="what-is-epiphany"
      title={<>📖 What Is Epiphany? The Meaning of Three Kings&apos; Day on January 6</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The tree is still up. Nobody at your church has mentioned taking the lights down yet.</p>
            <p>
              Then your phone calendar or a friend online says something about &quot;Three Kings
              Day&quot; on January 6, and you realize Christmas might not actually be over the way you
              thought it was.
            </p>
            <p>
              Somebody mentions &quot;Epiphany&quot; in a sermon like everyone already knows what it
              means. You nod along, but you genuinely do not.
            </p>
            <p>
              📌 <strong>Epiphany is the day the Western Church set apart to remember the Magi finally
              reaching Jesus, and the same day the Eastern Church uses to remember Christ&apos;s own
              baptism in the Jordan.</strong>
            </p>
            <p>
              Those are two different events pointing at the same truth. Both are about God showing
              Himself to the world in a way nobody could miss.
            </p>
            <p>
              This guide walks through what the word Epiphany actually means, how January 6 got chosen,
              why the date on your own church calendar might say a Sunday instead, what the Eastern
              Church celebrates that same week, and how Christians in different countries still mark
              the day today.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is tempting to file Epiphany under trivia. A date on an old calendar, a bread with a
            figurine baked inside it, a word you have heard but never used.
          </p>
          <p>
            ⚠️ <strong>But the whole point of the feast is a claim bigger than any detail about dates.
            God did not stay hidden.</strong>
          </p>
          <p>
            The Magi in Matthew 2 were not Jewish. They were outsiders, probably astrologers from the
            east, who had no covenant claim on Israel&apos;s God at all. The fact that the earliest
            Christians built a feast around God revealing Himself to exactly those people, foreigners,
            is not a small detail.
          </p>
          <p>
            It says something that mattered to them from the very start: this good news was never
            meant to stay inside one nation. Whatever you are watching this January, Epiphany asks you
            to notice the same thing the Magi noticed. God does not just exist. He shows up, and He
            means to be found.
          </p>
          <p>
            💡 Knowing the history behind the date is interesting. Knowing why the Church thought it was
            worth keeping a whole feast about is the part that actually matters.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Epiphany Actually Celebrates, and Where January 6 Came From
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. What the Word Epiphany Actually Means</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Epiphany comes from the Greek word epiphaneia, which means manifestation or appearing. The
            Catholic Encyclopedia lists several old names for the feast built on that same root, among
            them theophaneia, apparitio, and the plainer Festum trium regum, the Feast of the Three
            Kings. English speakers also inherited an older nickname for the day: Twelfth Day, counting
            twelve days on from Christmas.
          </p>
          <p>
            That Greek word was not invented for a holiday. The New Testament already used it for
            Christ Himself.
          </p>
        </div>
        <VerseQuote
          text="But is now made manifest by the appearing of our Saviour Jesus Christ, who hath abolished death, and hath brought life and immortality to light through the gospel:"
          reference="2 Timothy 1:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is not talking about a date on a calendar there. He is talking about Christ Himself
            stepping into view. Epiphany borrows that exact word and gives it one day a year to stand
            on.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. What the Western Church Celebrates: The Magi Reaching Jesus
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In the West, Epiphany belongs to the Magi. Matthew is the only Gospel that records their
            visit at all.
          </p>
        </div>
        <VerseQuote
          text="Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem, Saying, Where is he that is born King of the Jews? for we have seen his star in the east, and are come to worship him."
          reference="Matthew 2:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Matthew never says there were three of them, never names them, and never calls them kings.
            Those details came later, built mostly on the three gifts and on Psalm 72&apos;s picture of
            kings bringing tribute. What Scripture actually gives you is simpler and in some ways
            stranger: foreigners who studied the stars, following one star for what was likely months
            of travel, to kneel in front of a toddler in{" "}
            <ArticleLink href="/blog/what-the-first-christmas-actually-looked-like">
              a poor family&apos;s house
            </ArticleLink>
            .
          </p>
        </div>
        <VerseQuote
          text="When they had heard the king, they departed; and, lo, the star, which they saw in the east, went before them, till it came and stood over where the young child was. When they saw the star, they rejoiced with exceeding great joy. And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense, and myrrh."
          reference="Matthew 2:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Catholic Encyclopedia traces how this one visit became the whole reason for the feast
            in the West. Pope Leo I, preaching in the fifth century, &quot;definitely asserts their
            visit to be the commemoration for which the feast was instituted.&quot; Augustine&apos;s
            sermons and the Gelasian Sacramentary, an early Roman prayer book, both center the day on
            the Magi the same way. By the time the West fully adopted the feast, the Magi had become
            its main character.
          </p>
          <p>
            📌 <strong>What the Magi found was not a king on a throne. It was a baby, with{" "}
            <ArticleLink href="/blog/who-was-mary-mother-of-jesus">His mother Mary</ArticleLink>
            , in an ordinary house.</strong> They worshipped anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. What the Eastern Church Celebrates the Same Day: Theophany
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is where most Western Christians get surprised. Eastern Orthodox Christians keep
            January 6 too, but they are not primarily remembering the Magi at all. They call the day
            Theophany, and it belongs to Christ&apos;s baptism.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass in those days, that Jesus came from Nazareth of Galilee, and was baptized of John in Jordan. And straightway coming up out of the water, he saw the heavens opened, and the Spirit like a dove descending upon him: And there came a voice from heaven, saying, Thou art my beloved Son, in whom I am well pleased."
          reference="Mark 1:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Orthodox Church in America describes Theophany as the feast that &quot;reveals the Most
            Holy Trinity to the world through the Baptism of the Lord,&quot; with the Father speaking
            from heaven, the Son standing in the water, and the Spirit descending as a dove. Its older
            names lean the same direction: the Day of Illumination and the Feast of Lights, names that
            treat the day as God enlightening the world rather than only a king being visited.
          </p>
          <p>
            Citing the eighth century theologian John of Damascus, the OCA explains that Christ did not
            need to be baptized for His own sake. He had no sin to wash away. He was baptized instead to
            fulfill the Law, to reveal the Trinity openly, to make holy the water itself, and to give
            every Christian after Him a pattern to follow into their own baptism. The early Church took
            that connection seriously enough that catechumens were traditionally baptized during the
            Vespers of Theophany itself.
          </p>
          <p>
            Both halves of this feast, East and West, are really doing the same thing with two different
            events. One shows God revealed to strangers who came looking for Him. The other shows God
            revealed in a voice from heaven over a riverbank. Manifestation either way.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. How One Early Feast Carried Several Different Comings at Once
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Catholic Encyclopedia&apos;s account of the early centuries is genuinely messy, and it
            says so plainly rather than smoothing it over. Clement of Alexandria, writing around the
            year 200, is the earliest clear reference to anyone marking this date at all. He reports
            that a Gnostic group called the followers of Basilides, who were not part of mainstream
            Christianity, kept the day of Christ&apos;s baptism, spending the night before in readings.
            That is evidence the date mattered to some Egyptian Christians early on, not proof the whole
            Church already kept it as a feast.
          </p>
          <p>
            The fourth century bishop Epiphanius later wrote that January 6 was Christ&apos;s
            &quot;Epiphany,&quot; but he placed the Baptism on a different day entirely, November 6,
            while still tying the Nativity and the wedding at Cana to January 6. Other early writers
            disagree with him on the details. The honest summary is that for roughly the first three
            centuries, different churches linked different events, birth, baptism, and even the water
            turned to wine at Cana, to this one date, before the West and East eventually settled into
            the separate emphases they each still carry today.
          </p>
          <p>
            ⚠️ <strong>None of that uncertainty is a crack in the foundation.</strong> It is simply how
            an early, scattered Church slowly worked out which day would carry which memory, centuries
            before anyone could pick up a phone and compare notes with a church three provinces away.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why Your Own Church Calendar Might Not Say January 6
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you are Catholic in the United States, there is a good chance you have never celebrated
            Epiphany on January 6 in your life. The USCCB&apos;s own proper calendar for dioceses in the
            United States lists the feast under the heading &quot;Sunday between January 2 and 8,&quot;
            which means most American parishes transfer the solemnity to the nearest Sunday rather than
            keeping the fixed date.
          </p>
          <p>
            Other countries still keep January 6 itself, a fixed holy day regardless of the weekday it
            falls on. The practice genuinely varies by country and sometimes by diocese within the same
            country, which is exactly why the date can feel unpredictable if you have moved churches or
            countries and never noticed the difference before.
          </p>
          <p>
            📌 <strong>So &quot;when is Epiphany&quot; does not have one single answer.</strong> It
            depends on whether your own diocese or church keeps the fixed day or the nearest Sunday, the
            same kind of local variation that shapes how{" "}
            <ArticleLink href="/blog/when-does-advent-begin">Advent&apos;s own start date</ArticleLink>{" "}
            gets set each year.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. How Christians Still Mark the Day Around the World
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One of the oldest surviving customs is called chalking the door. The Church of England
            describes it as part of a traditional Epiphany celebration where blessed chalk is used to
            write letters and the new year above a doorway, something like 20 plus C, M, B, plus 26 for
            this coming year. Those letters stand for the traditional names given to the Magi, Caspar,
            Melchior, and Balthazar, or for the Latin blessing Christus mansionem benedicat, meaning
            &quot;may Christ bless this house.&quot; One parish rector interviewed by the Church of
            England called the marking &quot;a reminder of faith and strength&quot; for the year ahead.
          </p>
          <p>
            Many countries built an entire gift giving tradition around this same day instead of around
            Christmas itself. Spanish speaking countries widely call it Three Kings Day, and the custom
            of children receiving gifts in connection with the Magi&apos;s own gifts to Jesus runs
            through much of Latin America and Spain, even though the specific local practices differ
            from one country to the next.
          </p>
          <p>
            Both the chalking tradition and the Three Kings gift customs point back at the exact same
            thing Matthew wrote down: people responding to Christ by giving, because He gave first.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Actually Keeping Epiphany
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is how to let January 6 do more than mark the end of your decorations.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Matthew 2:1 to 12 in one sitting.</strong> It takes two minutes and it is the
            entire biblical account the whole Western feast is built on.
          </li>
          <li>
            <strong>Find out what your own church actually does.</strong> Ask whether your parish or
            congregation keeps January 6 itself or moves the feast to the nearest Sunday, and why.
          </li>
          <li>
            <strong>Read Mark 1:9 to 11 the same week.</strong> Seeing both events side by side shows
            you the single theme, God revealed, that holds the whole feast together.
          </li>
          <li>
            <strong>Try chalking your own door, with understanding, not superstition.</strong> Write the
            letters and the year, and let it be a prayer for the house, not a charm.
          </li>
          <li>
            <strong>Ask who the Magi represent in your own life.</strong> They had no covenant claim on
            God at all, and He still let them find Him. Who around you still needs to hear that the
            door is open to them too.
          </li>
          <li>
            <strong>Learn one thing about how Orthodox Christians keep Theophany.</strong> The Great
            Blessing of Waters, where parishes bless rivers, lakes, and indoor water alike, is one of the
            oldest continuously kept Christian customs there is.
          </li>
          <li>
            <strong>Do not rush past the gifts in the story.</strong> Gold, frankincense, and myrrh were
            not random. Spend five minutes actually looking up what each one meant to a first century
            reader.
          </li>
          <li>
            <strong>Let Epiphany close your Christmas season on purpose.</strong> Instead of just taking
            decorations down because the calendar says so, end the season with one deliberate moment of
            worship.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Top 5 Bible Verses for Epiphany</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These five carry the whole feast, East and West, in one short list.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Matthew 2:9 to 11</h3>
        <VerseQuote
          text="When they had heard the king, they departed; and, lo, the star, which they saw in the east, went before them, till it came and stood over where the young child was. When they saw the star, they rejoiced with exceeding great joy. And when they were come into the house, they saw the young child with Mary his mother, and fell down, and worshipped him: and when they had opened their treasures, they presented unto him gifts; gold, and frankincense, and myrrh."
          reference="Matthew 2:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The whole Western feast is this one scene. Outsiders following a star for months, finding
            an ordinary house, and worshipping a child they had every reason to walk past.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Mark 1:9 to 11</h3>
        <VerseQuote
          text="And it came to pass in those days, that Jesus came from Nazareth of Galilee, and was baptized of John in Jordan. And straightway coming up out of the water, he saw the heavens opened, and the Spirit like a dove descending upon him: And there came a voice from heaven, saying, Thou art my beloved Son, in whom I am well pleased."
          reference="Mark 1:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the Eastern half of the feast. Father, Son, and Spirit all present at once, over an
            ordinary river, in front of ordinary witnesses.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Isaiah 60:1 to 3</h3>
        <VerseQuote
          text="Arise, shine; for thy light is come, and the glory of the LORD is risen upon thee. For, behold, the darkness shall cover the earth, and gross darkness the people: but the LORD shall arise upon thee, and his glory shall be seen upon thee. And the Gentiles shall come to thy light, and kings to the brightness of thy rising."
          reference="Isaiah 60:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Written centuries before the Magi ever packed for their trip. Gentiles and kings drawn to a
            light that is not their own is exactly the picture Matthew later shows you walking into
            Bethlehem.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Psalm 72:10 and 11</h3>
        <VerseQuote
          text="The kings of Tarshish and of the isles shall bring presents: the kings of Sheba and Seba shall offer gifts. Yea, all kings shall fall down before him: all nations shall serve him."
          reference="Psalm 72:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This psalm, about Israel&apos;s own king, is where the later legend of three crowned kings
            bringing gifts actually comes from. Matthew never calls the Magi kings himself, but early
            readers heard this psalm echoing under his account anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Timothy 1:10</h3>
        <VerseQuote
          text="But is now made manifest by the appearing of our Saviour Jesus Christ, who hath abolished death, and hath brought life and immortality to light through the gospel:"
          reference="2 Timothy 1:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The actual word behind Epiphany, used by Paul for Christ appearing in the flesh at all. Every
            custom on this page is trying to point back at this one verse.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Epiphany</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Epiphany in simple terms?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Epiphany is a Christian feast on or near January 6 that celebrates God revealing Himself to
          the world. In the West it centers on the Magi reaching Jesus. In the Eastern Church, where it
          is called Theophany, it centers on Christ&apos;s baptism in the Jordan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Epiphany the same as Three Kings&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in the Western tradition. &quot;Festum trium regum,&quot; the Feast of the Three Kings,
          is one of Epiphany&apos;s own older names, and many Spanish speaking countries still call the
          day Three Kings Day today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Epiphany on January 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nobody can say for certain. The Catholic Encyclopedia states plainly that &quot;the reason for
          the fixing of this date it is impossible to discover.&quot; What is clear is that the Eastern
          Church kept the date first, and the earliest surviving reference to Christians marking it
          comes from Clement of Alexandria around the year 200.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Catholic Church celebrate Epiphany on January 6 or a Sunday?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It depends on where you are. The USCCB&apos;s proper calendar for the United States lists
          Epiphany on the Sunday between January 2 and 8, so most American parishes keep it there
          instead of on the fixed date. Other countries keep January 6 itself as a holy day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between Epiphany and Theophany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They are names for the same January date used by different traditions for different events.
          Epiphany is the Western name, tied mainly to the Magi. Theophany is the Eastern Orthodox name
          for the same day, tied to Christ&apos;s baptism and the revealing of the Trinity.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were there really three wise men?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew never gives a number. He says &quot;wise men,&quot; plural, and lists three gifts,
          gold, frankincense, and myrrh. The familiar number three and the names Caspar, Melchior, and
          Balthazar both came later, built on those three gifts and on Psalm 72&apos;s picture of kings
          bringing tribute, not on anything Matthew himself states.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does chalking the door mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a custom, described by the Church of England as part of traditional Epiphany
          observance, of marking a doorway with blessed chalk, the year, and the letters C, M, and B.
          The letters can stand for the traditional Magi names or for the Latin blessing
          &quot;Christus mansionem benedicat,&quot; may Christ bless this house.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants celebrate Epiphany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It varies widely. Churches that follow the full{" "}
          <ArticleLink href="/blog/what-is-the-liturgical-calendar">liturgical calendar</ArticleLink>
          , including many Anglican, Lutheran, and Methodist congregations, generally keep Epiphany.
          Many Baptist and nondenominational churches mark the day lightly or not at all, often for the
          same reasons they treat the wider church calendar as optional rather than commanded.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Twelfth Day of Christmas?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is an older English name for Epiphany itself, counting twelve days forward from Christmas
          Day. The night before, January 5, is traditionally called Twelfth Night.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Bible actually call this day Epiphany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Scripture never names a holiday called Epiphany. It does use the underlying Greek word,
          epiphaneia, for Christ&apos;s own appearing, which is exactly where the Church later borrowed
          the feast&apos;s name from.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Clear away the dates and the customs and three things remain.</p>
          <p>
            📌 <strong>Epiphany means manifestation, God showing Himself on purpose.</strong> The West
            remembers that through the Magi. The East remembers it through Christ&apos;s baptism. Both
            halves are reaching for the same truth.
          </p>
          <p>
            📌 <strong>The exact date has never been simple.</strong> The earliest centuries linked
            different events to January 6 before East and West settled into their separate emphases,
            and even today the day you keep it on can depend on your own country or diocese.
          </p>
          <p>
            📌 <strong>The Magi had no claim on God at all, and found Him anyway.</strong> That is still
            the invitation standing open to you.
          </p>
          <p>
            So before you take the last decoration down, read Matthew 2 once more. Notice that the
            people who traveled the farthest to find Jesus were the ones with the least reason to go
            looking in the first place.
          </p>
          <p>He showed Himself to strangers once.</p>
          <p>He is still willing to be found.</p>
        </div>
      </section>

      <ArticleSources
        checkedOn="27 October 2026"
        sources={[
          {
            title: "Epiphany",
            publisher: "The Catholic Encyclopedia, New Advent",
            year: "1907",
            url: "https://www.newadvent.org/cathen/05504c.htm",
            note: "On the etymology of 'Epiphany', the feast's origin in the Eastern Church, the Clement of Alexandria and Epiphanius references, the uncertainty around why January 6 was chosen, and Pope Leo I's sermons centering the Western feast on the Magi.",
          },
          {
            title: "Proper Calendar for the Dioceses of the United States of America",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/prayer-and-worship/liturgical-year-and-calendar/proper-calendar",
            note: "Lists 'Sunday between January 2 and 8' for the Epiphany of the Lord in the U.S. proper calendar.",
          },
          {
            title: "Feast of the Theophany of our Lord and Savior Jesus Christ",
            publisher: "Orthodox Church in America (OCA)",
            url: "https://www.oca.org/saints/lives/2018/01/06/100106-feast-of-the-theophany-of-our-lord-and-savior-jesus-christ",
            note: "On Theophany as the revealing of the Trinity through Christ's baptism, the ancient names Day of Illumination and Feast of Lights, the baptism of catechumens at Theophany Vespers, and the citation of John of Damascus on why Christ was baptized.",
          },
          {
            title: "Chalking the Door explainer",
            publisher: "Church of England",
            url: "https://www.churchofengland.org/node/38598",
            note: "On the chalking the door custom, the meaning of the letters C, M, and B, and its place in traditional Epiphany celebration.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
