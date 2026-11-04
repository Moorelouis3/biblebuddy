import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-feast-of-the-annunciation", {
  title: "What Is the Feast of the Annunciation? The Day God Said It First",
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

export default function WhatIsTheFeastOfTheAnnunciationPage() {
  return (
    <BlogPostShell
      slug="what-is-the-feast-of-the-annunciation"
      title={<>📖 What Is the Feast of the Annunciation? The Day God Said It First</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably seen the painting before you ever heard the word.</p>
            <p>
              A young woman, startled, in a plain room. An angel kneeling in front of her, one
              hand raised. A shaft of light falling where no window explains it.
            </p>
            <p>That scene has a name on the church calendar, and a fixed day every single year.</p>
            <p>
              📌 <strong>The Feast of the Annunciation, kept every March 25, celebrates the moment
              the angel Gabriel told a young woman in Nazareth that she would carry the Son of
              God, and her answer, barely one sentence long, is the moment the church says
              eternity stepped into a human body.</strong>
            </p>
            <p>
              Notice the date. March 25 sits exactly nine months before December 25, and that is
              not a decorating accident. It is the whole point.
            </p>
            <p>
              This guide walks through what actually happened in Luke&apos;s account, how the
              church arrived at this particular date, why Catholics rank this day above almost
              every other feast, and where Protestants, Orthodox Christians, and Catholics differ
              on keeping it at all.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is easy to treat this as a detail for art historians and calendar nerds.</p>
          <p>
            ⚠️ <strong>But look at what the Annunciation is actually claiming.</strong> Christmas
            gets the manger, the shepherds, and the star. The Annunciation gets something quieter
            and, in a real sense, bigger. It is the moment Christians say God himself entered a
            human body, nine months before anyone could see him.
          </p>
          <p>
            The world has an answer for an unexpected pregnancy that upends a woman&apos;s plans.
            It calls it bad luck, or a burden, or a problem to manage. Mary&apos;s own answer was
            none of those.
          </p>
          <p>
            💡 <strong>She said yes to a plan she did not understand, before a single piece of it
            made sense.</strong> That is the posture every Christian is eventually asked to take
            toward God, whether the news that interrupts your life is this strange or far more
            ordinary.
          </p>
          <p>
            Learning what{" "}
            <ArticleLink href="/blog/who-was-mary-mother-of-jesus">
              Mary&apos;s own story
            </ArticleLink>{" "}
            actually says, instead of only the paintings and the carols, is part of learning what
            faith looks like when the instructions are not fully given yet.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Actually Happened at the Annunciation
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. An Angel Sent to an Unremarkable Town
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke dates the scene with one small, specific detail.</p>
          <p>
            The angel Gabriel comes six months after he had already visited an old priest named
            Zacharias, promising him a son in his old age, the boy who would grow up to be{" "}
            <ArticleLink href="/blog/who-was-elizabeth">
              John the Baptist, born to Zacharias and Elisabeth
            </ArticleLink>
            . Six months later, Gabriel is sent again.
          </p>
        </div>
        <VerseQuote
          text="And in the sixth month the angel Gabriel was sent from God unto a city of Galilee, named Nazareth, To a virgin espoused to a man whose name was Joseph, of the house of David; and the virgin's name was Mary."
          reference="Luke 1:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nazareth was not a city anyone expected news like this from. It had no reputation, no
            temple, nothing to recommend it.
          </p>
          <p>
            📌 <strong>Mary was engaged, not yet living with Joseph, and completely ordinary by
            every measure the world uses.</strong> That is exactly who Gabriel was sent to find.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. &quot;How Shall This Be&quot;: Mary&apos;s Honest Question
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Gabriel&apos;s greeting alone was enough to unsettle her.</p>
        </div>
        <VerseQuote
          text="And the angel came in unto her, and said, Hail, thou that art highly favoured, the Lord is with thee: blessed art thou among women."
          reference="Luke 1:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke says she was troubled, and tried to work out what kind of greeting this even was.
            Then came the actual announcement.
          </p>
        </div>
        <VerseQuote
          text="And, behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name JESUS. He shall be great, and shall be called the Son of the Highest: and the Lord God shall give unto him the throne of his father David."
          reference="Luke 1:31 and 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Mary did not argue. She asked the one question that actually made sense to ask.</p>
        </div>
        <VerseQuote text="Then said Mary unto the angel, How shall this be, seeing I know not a man?" reference="Luke 1:34" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>That question is not doubt. It is an honest request for understanding from
            someone who has already decided to trust the one asking.</strong> Gabriel&apos;s
            answer is the heart of the whole feast.
          </p>
        </div>
        <VerseQuote
          text="And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God."
          reference="Luke 1:35"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Sentence Every Christmas Depends On
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Gabriel gives her one more sign, that her relative Elisabeth, long thought barren, is
            already six months along herself. Then Mary answers.
          </p>
        </div>
        <VerseQuote
          text="And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word. And the angel departed from her."
          reference="Luke 1:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>That single sentence, be it unto me according to thy word, is what the
            whole feast is built around.</strong> Everything Christmas celebrates in December is,
            by the church&apos;s own reckoning, already decided the moment she says it.
          </p>
          <p>
            Matthew&apos;s Gospel records a second, quieter annunciation, an angel appearing to
            Joseph in a dream to tell him not to be afraid to take Mary as his wife, because what
            was conceived in her was of the Holy Ghost. Luke tells Mary&apos;s side of the story.
            Matthew tells Joseph&apos;s.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Why the Church Fixed the Date at March 25
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nothing in Luke or Matthew gives a calendar date for any of this.</p>
          <p>
            ⚠️ <strong>So be honest about where March 25 actually comes from.</strong> The
            Catholic Encyclopedia states that ancient Christian writers, working from an idea that
            the world was created in spring and that Christ&apos;s death and conception fell on
            the same date, settled on March 25 as the day of the crucifixion first, and only then
            reasoned backward to the conception. A third century work known as De Pascha Computus
            argued the point directly.
          </p>
          <p>
            Historian William J. Tighe, writing in Christianity Today, traces this to a Jewish
            and early Christian idea that great men died on the same date as their birth or
            conception. Add nine months to March 25 and the result is December 25, the date the
            Western church settled on for Christmas.
          </p>
          <p>
            A different, more devotional reading of the same date exists alongside that history.
            Catholic writer Fr. David Vincent Meconi has called the spring equinox, which March 25
            marked on the old calendar, a fitting day for God to begin remaking the world, tying
            it back to the first words of Genesis about light overcoming darkness.
          </p>
          <p>
            💡 <strong>Both explanations agree on the plain fact worth keeping: the date is a
            theological argument built centuries after the event, not a line from an eyewitness
            calendar.</strong> The USCCB states the connection people actually notice every year
            plainly enough on its own: the Annunciation falls exactly nine months before
            Christmas.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Feast of Christ That Slowly Became a Feast of Mary
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Catholic Encyclopedia dates the feast&apos;s first clear appearance to around the
            time of the Council of Ephesus in the fifth century, and it is recorded in the Latin
            Church&apos;s Sacramentary of Pope Gelasius not long after.
          </p>
          <p>
            In the Eastern churches, the Annunciation has always stayed a feast of Christ himself,
            the day the Incarnation begins, while a separate day in late December honors
            Mary&apos;s own part in it. The Tenth Council of Toledo in the year 656 called the
            Western feast something different, the festival of the Mother of God, and historians
            tracing that shift note how medieval devotion increasingly centered the day on
            Mary&apos;s obedience rather than on Christ&apos;s arrival.
          </p>
          <p>
            ⚠️ <strong>This is exactly the point where the Annunciation gets confused with a
            different Catholic teaching.</strong> The Annunciation is Luke&apos;s own account of
            Gabriel&apos;s visit. The Immaculate Conception is a separate Catholic doctrine about
            Mary&apos;s own conception, kept on a different day in December. They share a word,
            conception, and almost nothing else.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Why This One Outranks Almost Everything Else on the Calendar
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In the Catholic Church, the Annunciation holds the rank of a solemnity, the highest
            category a feast day can carry, and it was historically kept as a holy day of
            obligation across the universal church before later local decrees lifted that specific
            requirement in places like the United States.
          </p>
          <p>
            That high rank occasionally runs into a problem. When March 25 lands inside Holy Week
            or Easter Week, Catholic News Agency has reported that the Church moves the solemnity
            entirely, because, as one recent liturgical calendar explained it, the Lord&apos;s
            passion, death, and resurrection outrank any other solemnity on the calendar. In 2024
            the feast was pushed all the way to April 8.
          </p>
          <p>
            📌 <strong>Not every Christian tradition keeps this day the same way, and no single
            calendar owns the correct answer.</strong> Lutheran and Anglican calendars both list
            the Annunciation as a major feast of their own, moved by similar rules when it
            collides with Holy Week. Many other Protestant congregations never formally observe it
            at all, for the same reason{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              their broader calendars differ from Rome&apos;s
            </ArticleLink>
            , while still affirming the event Luke records as true and essential.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Ways to Mark the Annunciation
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a parish calendar to let March 25 mean something.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Luke 1:26 to 38 out loud on March 25.</strong> Hearing the whole exchange
            in one sitting, instead of in scattered verses, keeps Gabriel&apos;s announcement and
            Mary&apos;s answer together the way Luke wrote them.
          </li>
          <li>
            <strong>Pray the Angelus.</strong> The USCCB itself suggests this short, ancient prayer
            built directly from Gabriel&apos;s words and Mary&apos;s answer as a simple way to mark
            the day.
          </li>
          <li>
            <strong>Say her answer back to God when you are the one waiting on unclear news.</strong>{" "}
            Be it unto me according to thy word is a real prayer for a hard season, not only a
            line in a painting&apos;s caption.
          </li>
          <li>
            <strong>Mark your own calendar nine months before Christmas.</strong> Letting the
            Incarnation begin in your mind on March 25, instead of only on December 25, changes
            how long you actually sit with the idea that God became human.
          </li>
          <li>
            <strong>Keep the two conceptions straight in your own notes.</strong> If your church
            teaches the Immaculate Conception, write down the date difference so the two feasts
            stop blending together in your head.
          </li>
          <li>
            <strong>Tell the story to someone younger using Joseph&apos;s side too.</strong>{" "}
            Matthew&apos;s short account of the angel appearing to Joseph is often left out, and
            it shows that both parents had to answer the same kind of impossible news.
          </li>
          <li>
            <strong>Ask yourself Mary&apos;s own question honestly.</strong> How shall this be was
            not rebellion. Bringing your own genuine how to God before you obey is not a lack of
            faith.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Verses Behind the Feast of the Annunciation
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 1:28</h3>
        <VerseQuote
          text="And the angel came in unto her, and said, Hail, thou that art highly favoured, the Lord is with thee: blessed art thou among women."
          reference="Luke 1:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the first thing heaven ever says to Mary, and it is not a command.</p>
          <p>
            📌 Before she is asked for anything, she is told she is favored and that the Lord is
            already with her. The invitation comes after the reassurance, not before it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 1:35</h3>
        <VerseQuote
          text="And the angel answered and said unto her, The Holy Ghost shall come upon thee, and the power of the Highest shall overshadow thee: therefore also that holy thing which shall be born of thee shall be called the Son of God."
          reference="Luke 1:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse the whole feast exists to mark. The church counts the conception of
            Christ from this exact moment, nine months before Bethlehem.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 1:38</h3>
        <VerseQuote
          text="And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word. And the angel departed from her."
          reference="Luke 1:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Six words carry the whole weight of her answer. Be it unto me according to thy
            word. The angel leaves the moment she says it, because the answer heaven was waiting
            for has already been given.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Isaiah 7:14</h3>
        <VerseQuote
          text="Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel."
          reference="Isaiah 7:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Isaiah wrote this centuries before Gabriel ever reached Nazareth. Matthew later quotes
            this exact verse to explain what he had just watched happen to Mary.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Galatians 4:4 and 5</h3>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is not describing Nazareth directly, but this is the theology the Annunciation
            puts into a single scene. God sent his Son, made of a woman, at the exact moment
            Gabriel named in Luke 1.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Feast of the Annunciation
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Feast of the Annunciation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the day the church remembers the angel Gabriel telling Mary she would bear the Son
          of God, recorded in Luke 1:26 to 38. Catholics keep it as a solemnity on March 25, nine
          months before Christmas.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is the Annunciation on March 25?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No verse in the Bible gives that date. The Catholic Encyclopedia traces it to an ancient
          belief that Christ&apos;s death and conception shared the same calendar date, which
          lands the conception on March 25 and, nine months later, the birth on December 25.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Annunciation the same as the Immaculate Conception?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and this is the most common confusion about the day.{" "}
          <ArticleLink href="/blog/what-is-the-immaculate-conception">
            The Immaculate Conception
          </ArticleLink>{" "}
          is a Catholic teaching about Mary&apos;s own conception, kept on a different day. The
          Annunciation is Gabriel&apos;s visit to Mary and the conception of Jesus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants celebrate the Annunciation?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some do. Lutheran and Anglican calendars both list it as a major feast. Many other
          Protestant and evangelical churches hold no formal observance for it at all, while still
          treating the event itself, recorded plainly in Luke, as true and important.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Annunciation a holy day of obligation?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was historically kept as one across the universal church. Later decrees lifted that
          specific requirement in places including France in 1802 and the United States in 1884,
          though it remains a solemnity on the Catholic calendar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does the date of the Annunciation sometimes move?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          When March 25 falls during Holy Week or Easter Week, the Church moves the solemnity to
          a later date, because the events of the Lord&apos;s passion and resurrection take
          precedence over every other feast. In 2024 it moved all the way to April 8.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What did the angel Gabriel actually say to Mary?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He greeted her as highly favored, told her not to fear, said she would conceive a son
          named Jesus who would be called the Son of the Highest, and explained that the Holy
          Ghost would come upon her. Mary answered by accepting the word as it was given to her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Joseph get his own annunciation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Matthew 1:20 and 21 records an angel appearing to Joseph in a dream, telling him not
          to be afraid to take Mary as his wife because the child was conceived of the Holy Ghost.
          Luke tells Mary&apos;s side of the story. Matthew tells Joseph&apos;s.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the Angelus, and how does it connect to the Annunciation?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Angelus is a short, traditional prayer built directly from Gabriel&apos;s greeting
          and Mary&apos;s answer in Luke 1. The USCCB recommends praying it as a simple way to keep
          the Annunciation present in daily prayer, not only on March 25.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Was the idea that March 25 was the date of Christ&apos;s death ever actually proven?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The Catholic Encyclopedia itself calls the reasoning behind these ancient
          calculations fanciful, and historians who have studied the question, including William
          J. Tighe, treat it as a theological argument from the early centuries of the church, not
          a historical record of the actual date.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the paintings, the Latin name, and the calendar argument over the date, and one plain scene remains.</p>
          <p>
            📌 <strong>An angel brought impossible news to an ordinary young woman, and she said
            yes before any of it made sense.</strong> The church built a whole day around that
            yes because of what it says the moment actually was, God entering human life, not
            waiting for Bethlehem to do it.
          </p>
          <p>
            📌 <strong>The date, March 25, is a theological argument, not an eyewitness record.</strong>{" "}
            That does not make the day meaningless. It makes the honesty about where the date
            comes from part of taking the day seriously.
          </p>
          <p>
            Whatever your own tradition does with March 25, the event behind it stands on its own,{" "}
            <ArticleLink href="/blog/what-is-christmas">
              nine months before the night the waiting finally ended
            </ArticleLink>
            .
          </p>
          <p>❓ Is there news in your own life right now that you have not yet been able to say yes to?</p>
          <p>
            📌 <strong>Mary&apos;s answer did not require her to understand the whole plan first.
            It only required her to trust the one who sent it.</strong>
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="4 November 2026"
        sources={[
          {
            title: "The Feast of the Annunciation",
            publisher: "Catholic Encyclopedia (1907), New Advent",
            url: "https://www.newadvent.org/cathen/01542a.htm",
            note: "The source for the feast's origin around the Council of Ephesus, its appearance in the Sacramentary of Pope Gelasius, the ancient reasoning behind the March 25 date, the Tenth Council of Toledo calling it the festival of the Mother of God, and the feast's history as a holy day of obligation.",
          },
          {
            title: "March 25: The Solemnity of the Annunciation of the Lord",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://usccb.org/prayer-and-worship/liturgical-year/lent/march-25",
            note: "The source for the feast falling exactly nine months before Christmas and the USCCB's suggestion to pray the Angelus.",
          },
          {
            title: "Why Isn't the Annunciation Celebrated Today?",
            publisher: "Catholic News Agency, via Catholic World Report",
            year: "2024",
            url: "https://www.catholicworldreport.com/2024/03/25/why-isnt-the-annunciation-celebrated-today/",
            note: "The source for the 2024 transfer of the solemnity to April 8 and the rule that Holy Week outranks other solemnities on the calendar.",
          },
          {
            title: "Why Is March 25th the Feast of the Annunciation?",
            publisher: "Fr. David Vincent Meconi, S.J., via The Catholic Company",
            url: "https://www.catholiccompany.com/blogs/get-fed/why-is-march-25th-the-feast-of-the-annunciation",
            note: "The source for the spring equinox explanation of the March 25 date.",
          },
          {
            title: "From Jesus to Mary and Back Again: A History of the Annunciation",
            publisher: "Ted Olsen, citing William J. Tighe, Christianity Today",
            year: "2010",
            url: "https://www.christianitytoday.com/2010/03/from-jesus-to-mary-and-back-again-history-of-annunciation",
            note: "The source for the computation hypothesis tying the conception date to a presumed date of Christ's death, the feast's historical shift toward a Marian focus, and Protestant practice around the day.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
