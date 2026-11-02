import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-an-advent-wreath", {
  title: "What Is an Advent Wreath? The Meaning of the Four Candles",
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

export default function WhatIsAnAdventWreathPage() {
  return (
    <BlogPostShell
      slug="what-is-an-advent-wreath"
      title={<>📖 What Is an Advent Wreath? The Meaning of the Four Candles</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Maybe your church lit one last Sunday and nobody explained why there were four
              candles instead of one, or why one of them is pink.
            </p>
            <p>Maybe you bought a wreath at the store and it came with no instructions at all.</p>
            <p>
              📌 <strong>Here is the plain answer. An Advent wreath is a circle of evergreen
              branches holding four candles, three purple and one pink, lit one at a time on each
              of the four Sundays before Christmas. The circle stands for God having no beginning
              and no end. The evergreens stand for life that does not die. And the growing light,
              one candle more each week, pictures the world waiting in darkness for Christ, the
              light that is finally lit in full on Christmas Day.</strong>
            </p>
            <p>
              That is the whole wreath in one sentence. The rest of it, what each candle is
              called, why three are purple, and what the wreath has to do with a Lutheran pastor
              in Hamburg, is worth slowing down for.
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide walks through what every part of the wreath actually means, the
              different names churches give the four candles, how Catholics bless and light it at
              home, and the Scripture standing behind each theme.
            </p>
            <p>Every historical claim below links back to a named source, so you can check it yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is easy to treat the wreath as decoration. Something pretty on the dinner table while you wait for the real holiday.</p>
          <p>
            ⚠️ <strong>But look at what the wreath is actually built to do.</strong> It does not
            let you have Christmas all at once. It makes you wait, one candle at a time, through
            four whole weeks of a world that still looks mostly dark.
          </p>
          <p>
            That is not a small thing to practice. Most of your life is spent waiting on God for
            something that has not arrived yet. The wreath takes that exact feeling, being stuck
            between the promise and the answer, and turns it into something you can light with
            your own hands.
          </p>
          <p>
            💡 <strong>Every week you light one more candle, you are rehearsing the same thing
            Israel rehearsed for centuries.</strong> The light has not fully come yet. But it is
            coming, and you can already see it growing.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Every Part of the Wreath Actually Means
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Circle and the Evergreens</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Start with the shape itself. Catholic Straight Answers explains that a circle has no
            beginning and no end, which is why the church has long read the wreath&apos;s shape as
            a picture of God&apos;s own eternity and of the everlasting life Christ offers.
          </p>
          <p>
            Franciscan Media puts it just as simply: the evergreen branches &quot;stand for
            everlasting life.&quot; Catholic Straight Answers goes a step further and names the
            specific plants many traditional wreaths use. Holly for the crown of thorns Christ
            wore, its red berries recalling His blood. Pine, cedar, and yew for life that does not
            fade through winter. Pine cones and seedpods for life that is only sleeping, not gone.
          </p>
          <p>
            📌 <strong>None of that was decided by accident.</strong> Long before anyone chose
            which candles to light, someone already chose branches that do not turn brown, cut
            into a shape that does not have a stopping point.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Why Four Candles, and Why Three Are Purple</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The number four is not random either. Catholic Straight Answers credits Pope Gregory
            VII, who died in 1095, with fixing the number of Sundays in Advent at four, which is
            why the wreath carries exactly four candles rather than three or six.
          </p>
          <p>
            Three of those candles are purple. CNA&apos;s explainer on the wreath notes that
            Advent was historically treated as a kind of little Lent, and purple carries the same
            weight on this wreath that it carries during Lent itself, a color of penance,
            preparation, and prayer rather than celebration.
          </p>
          <p>
            Franciscan Media adds one more layer some traditions keep. Purple is also the color of
            royalty, so the candles can be read as waiting on a King, not only waiting out a season
            of penance.
          </p>
          <p>
            ⚠️ <strong>That matters because Advent gets treated like a countdown to a party.</strong>{" "}
            The candle colors say otherwise. Three weeks out of four are closer in spirit to{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">the church&apos;s own penitential seasons</ArticleLink>{" "}
            than to a celebration that has already started.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Pink Candle and Gaudete Sunday</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One candle breaks the pattern on purpose. CNA&apos;s explainer describes the third
            candle as rose colored, lit on the third Sunday of Advent, a day the church calls
            Gaudete Sunday, Latin for &quot;rejoice.&quot; The priest wears rose vestments that
            same day instead of purple.
          </p>
          <p>
            📌 <strong>For one Sunday, right in the middle of a penitential season, the mood
            changes on purpose.</strong> The waiting is not over. But the wreath itself tells you
            the waiting is now more than halfway finished, and that is worth a lighter color for a
            day.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Names Families Give Each Candle</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is where honesty matters more than a tidy answer. A lot of people learned that
            the four candles are named Hope, Peace, Joy, and Love, one theme for each week.
            Christianity.com lists exactly that order, with the week one candle also called the
            Prophecy Candle, week two the Bethlehem Candle, week three the Shepherd&apos;s Candle,
            and week four the Angel&apos;s Candle.
          </p>
          <p>
            ⚠️ <strong>But the same source admits there is no single official set.</strong> Some
            traditions swap Peace and Faith for the second week. Names and even candle colors
            change by country and by church. No pope or denomination has ever issued one official
            list that every Christian wreath follows.
          </p>
          <p>
            💡 <strong>That does not make the names meaningless. It makes them a tradition worth
            keeping loosely.</strong> Hope, peace, joy, and love are all real things Scripture
            promises around Christ&apos;s birth, whichever week your own family happens to assign
            them to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Light Itself Is the Real Point</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Strip away the names and the colors, and one thing is left standing. Every week, there
            is more light than the week before.
          </p>
          <p>Isaiah already knew exactly what that kind of growing light would mean.</p>
        </div>
        <VerseQuote
          text="The people that walked in darkness have seen a great light: they that dwell in the land of the shadow of death, upon them hath the light shined."
          reference="Isaiah 9:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            John later points at exactly who that light turned out to be, and what it still does in
            a dark room.
          </p>
        </div>
        <VerseQuote
          text="In him was life; and the life was the light of men. And the light shineth in darkness; and the darkness comprehended it not."
          reference="John 1:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The darkness never once puts the light out in that verse.</strong> It just
            fails to understand it. That is exactly what a wreath with one lonely candle on week
            one and four candles blazing by week four is built to show you with your own eyes.
          </p>
          <p>
            Advent is not only waiting for a baby to be born two thousand years ago. It is also{" "}
            <ArticleLink href="/blog/what-is-epiphany">
              light breaking into the world in stages, the way it does at Epiphany too
            </ArticleLink>
            , and the way Simeon later called that same child{" "}
            <ArticleLink href="/blog/what-is-candlemas">a light to lighten the Gentiles</ArticleLink>{" "}
            when he held Him in the temple.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. From a Lutheran Pastor&apos;s Idea to Nearly Every Christian Tradition</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The wreath most Christians now light is younger than the season it marks. Franciscan
            Media traces the modern custom to Germany, where Catholics by the sixteenth century
            were using lit wreaths as a sign of Christ&apos;s coming. The candle filled version
            closest to what most homes use today, though, came later still, built by a Lutheran
            minister for children in his care rather than handed down from Rome.{" "}
            <ArticleLink href="/blog/when-does-advent-begin">
              That fuller story, and exactly what he built it from, is worth reading on its own
            </ArticleLink>
            .
          </p>
          <p>
            📌 <strong>That origin is part of why the wreath crosses church lines so easily.</strong>{" "}
            It did not start as a strictly Catholic object the way a rosary or a relic did. It
            started as a practical teaching tool, which is probably exactly why{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              Catholic and Protestant churches that disagree about plenty else
            </ArticleLink>{" "}
            both still light one every December.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Lighting Your Own Wreath
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a parish Mass to let an Advent wreath actually shape your month.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Bless the wreath before you light it the first time.</strong> Catholic
            Straight Answers suggests the wreath is best lit at the dinner table, right after the
            meal is blessed, so the whole family is already gathered.
          </li>
          <li>
            <strong>Let the lighting rotate through the family.</strong> One traditional pattern
            has the youngest child light the first purple candle in week one, an older child add
            the second in week two, a parent light the rose candle alongside the others in week
            three, and the whole wreath lit together in week four.
          </li>
          <li>
            <strong>Read one short passage before you light it.</strong> A few verses from Luke 1
            or 2 take less time than finding a lighter, and they give the moment its reason.
          </li>
          <li>
            <strong>Say the candle&apos;s theme out loud, even if your tradition names it
            differently.</strong> Hope, peace, joy, and love all survive the disagreement over
            which week gets which word.
          </li>
          <li>
            <strong>Let the growing light be the whole lesson some weeks.</strong> You do not
            always need a long devotional. Sometimes watching the room get brighter is the point.
          </li>
          <li>
            <strong>Keep it somewhere you will actually see it burn.</strong> A wreath packed away
            in a box after the first Sunday cannot do the one thing it is built for.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses Behind the Advent Wreath
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four passages, one for each candle&apos;s most common theme.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Romans 15:13, Hope</h3>
        <VerseQuote
          text="Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost."
          reference="Romans 15:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Notice how much Paul packs into one sentence about hope. Joy and peace are not separate
          topics here. They grow out of the same hope the first candle is lit to picture.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 1:78 and 79, Peace</h3>
        <VerseQuote
          text="Through the tender mercy of our God; whereby the dayspring from on high hath visited us, To give light to them that sit in darkness and in the shadow of death, to guide our feet into the way of peace."
          reference="Luke 1:78 and 79"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This is Zacharias singing over his newborn son John, months before Jesus was even born.
          The dayspring, the first light of morning, visiting people still sitting in the shadow of
          death. That is the second candle in one image.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 2:10 and 11, Joy</h3>
        <VerseQuote
          text="And the angel said unto them, Fear not: for, behold, I bring you good tidings of great joy, which shall be to all people. For unto you is born this day in the city of David a Saviour, which is Christ the Lord."
          reference="Luke 2:10 and 11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Great joy, offered to shepherds working a night shift, nobody important by the world&apos;s
          standards. The rose candle is lit for people exactly like them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 John 4:9 and 10, Love</h3>
        <VerseQuote
          text="In this was manifested the love of God toward us, because that God sent his only begotten Son into the world, that we might live through him. Herein is love, not that we loved God, but that he loved us, and sent his Son to be the propitiation for our sins."
          reference="1 John 4:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The fourth candle does not celebrate a feeling. It celebrates a direction. God moved
          toward us first, before anyone on earth loved Him back.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Advent Wreath
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is an Advent wreath?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A circle of evergreen branches holding four candles, three purple and one rose, lit one
          at a time on each Sunday of Advent, the four weeks leading up to Christmas. A fifth white
          candle in the center is sometimes added and lit on Christmas Day itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What do the four candles on an Advent wreath mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many churches and families name them Hope, Peace, Joy, and Love, one theme per week,
          though Christianity.com notes there is no single official naming every tradition shares.
          The rose candle, lit on the third week, usually carries the joy theme.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why are three of the candles purple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Purple marks Advent as a season of preparation and penance, closer in spirit to Lent than
          to Christmas itself. CNA&apos;s explainer notes that Advent was historically called a
          little Lent, which is why the color matches.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is one candle pink or rose?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is lit on the third Sunday of Advent, called Gaudete Sunday, Latin for rejoice. The
          lighter color marks a day of rejoicing in the middle of an otherwise penitential season,
          and the priest wears matching rose vestments that same day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Advent wreath only a Catholic tradition?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Franciscan Media traces the candle lit custom closest to today&apos;s wreath to a
          Lutheran minister rather than a pope, which is part of why Catholic, Lutheran, Anglican,
          and many other Protestant churches all keep some form of it today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Advent wreath have exactly four candles?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Catholic Straight Answers credits Pope Gregory VII, who died in 1095, with fixing Advent
          at four Sundays, which is why the wreath carries four candles rather than any other
          number.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What do the evergreen branches on the wreath represent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Life that does not fade through winter. Franciscan Media simply calls them a sign of
          everlasting life, while Catholic Straight Answers lists specific traditional meanings for
          holly, pine, cedar, and seedpods used in some wreaths.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the circular shape of the wreath mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A circle has no beginning and no end, which is why it has long been read as a picture of
          God&apos;s own eternity and of the everlasting life Christ offers believers.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can I light an Advent wreath at home instead of at church?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Many Catholic resources suggest lighting it at the family dinner table right after
          the meal is blessed, with different family members lighting the candles as the weeks
          progress.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When do you light the first candle on an Advent wreath?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          On the first Sunday of Advent, the fourth Sunday before Christmas Day, which moves every
          year depending on where Christmas falls in the week.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the specific names and even the specific colors, and three things remain true about every Advent wreath.</p>
          <p>
            📌 <strong>The circle and the evergreens were chosen on purpose.</strong> A shape with
            no end, holding branches that do not die, built to picture a God who does not either.
          </p>
          <p>
            📌 <strong>The light grows a little every week, and that is the whole lesson.</strong>{" "}
            Darkness does not get the final word. It just does not understand the light it is
            looking at yet.
          </p>
          <p>
            📌 <strong>No single church owns this one.</strong> A Lutheran pastor&apos;s idea
            became a candle lit habit in homes across nearly every Christian tradition, which is
            rarer than it sounds.
          </p>
          <p>
            You do not need the exact right names for each candle to let this wreath do its job.{" "}
            <ArticleLink href="/blog/what-is-christmas">
              Light one candle this week, on the way toward the day it is all pointing to
            </ArticleLink>
            , and let the room get a little brighter than it was last Sunday.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="2 November 2026"
        sources={[
          {
            title: "Advent Wreath: A Popular Symbol",
            publisher: "Franciscan Media",
            url: "https://www.franciscanmedia.org/faith-and-family/advent-wreath-a-popular-symbol/",
            note: "The source for the circle representing God's eternity, the evergreens standing for everlasting life, the sixteenth century German Catholic origin, and the Lutheran minister credited with the modern candle lit wreath.",
          },
          {
            title: "Everything You Need to Know About the Advent Wreath",
            publisher: "Francesca Pollio Fenton, Catholic News Agency (CNA) / EWTN",
            year: "2023",
            url: "https://www.ewtnnews.com/world/us/everything-you-need-to-know-about-the-advent-wreath?redirectedfrom=cna",
            note: "The source for Advent being historically called a little Lent, the purple and rose candle colors, Gaudete Sunday's rose vestments, and the USCCB's statement on the progressive lighting of the candles.",
          },
          {
            title: "What Is the Meaning of the Advent Wreath?",
            publisher: "Catholic Straight Answers",
            url: "https://catholicstraightanswers.com/advent-wreath/",
            note: "The source for Pope Gregory VII fixing Advent at four Sundays, the specific evergreen species and their traditional meanings, and the family lighting custom by week.",
          },
          {
            title: "Advent Wreath: Meaning of Advent Candles",
            publisher: "Christianity.com",
            url: "https://www.christianity.com/wiki/holidays/advent-wreath-meaning-of-advent-candles.html",
            note: "The source for the Hope, Peace, Joy, and Love candle names, the Prophecy, Bethlehem, Shepherd's, and Angel's candle names, and the plain statement that no single official naming exists across traditions.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
