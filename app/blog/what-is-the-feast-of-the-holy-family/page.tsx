import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-feast-of-the-holy-family", {
  title: "What Is the Feast of the Holy Family? Meaning and Biblical Lessons",
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

export default function WhatIsTheFeastOfTheHolyFamilyPage() {
  return (
    <BlogPostShell
      slug="what-is-the-feast-of-the-holy-family"
      title={<>📖 What Is the Feast of the Holy Family? Meaning and Biblical Lessons</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The tree is still up. The leftovers are still in the fridge. And somewhere in the stretch of quiet days between Christmas and New Year, you saw it on a church bulletin or a calendar app: Feast of the Holy Family.</p>
            <p>Maybe you pictured a nativity scene. Maybe you wondered if it was a Catholic thing you were not invited to.</p>
            <p>
              📌 <strong>Here is the plain answer. The Feast of the Holy Family is a Christian holy day,
              kept mainly by Catholics on the Sunday that falls between Christmas and New Year, that
              remembers Jesus, Mary, and Joseph as an actual household. Not a stained glass window. A
              family that fled a king who wanted their baby dead, lost track of their twelve year old
              son for three days, and kept a quiet home in a town nobody respected.</strong>
            </p>
            <p>That last detail is easy to miss under all the candles and carols.</p>
            <p>
              This guide walks through the real Bible passages behind the feast, where the day came
              from, how Catholics observe it, where Protestants land on it, and what this unglamorous
              little family can actually teach yours.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is tempting to file this under church trivia. A feast day about a family that lived two thousand years ago does not sound urgent.</p>
          <p>
            ⚠️ <strong>But look at what Scripture actually shows you.</strong> Not a family with a
            perfect script. A family that ran for their lives in the middle of the night. A family
            that misplaced their own son in a crowded city. A family that did not fully understand
            what their child said to them, even while they loved him completely.
          </p>
          <p>
            📌 <strong>That is the point. God did not put His Son into a flawless household to prove a
            point about perfection. He put Him into a real one, under real pressure, to show you what
            faithfulness looks like when a family cannot control what happens to it.</strong>
          </p>
          <p>
            If every family you compare yours to on a screen looks calmer and more put together, this
            feast is a correction. The first family built around Jesus did not have that either.
          </p>
          <p>
            💡 Your family does not need to be impressive to be the place God is at work. It needs to
            keep showing up, the way Mary and Joseph did, even when they did not understand what was
            happening to them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🕰️ What the Feast of the Holy Family Actually Celebrates
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. When It Is Kept, and Why the Date Moves</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In the Catholic Church today, the Feast of the Holy Family falls on the Sunday that sits
            inside the eight days of Christmas, between December 25 and January 1. Most years that
            lands somewhere between December 26 and December 30.
          </p>
          <p>
            Some years there is no Sunday to land on. When Christmas itself falls on a Sunday, the
            next Sunday is already claimed by the Solemnity of Mary on January 1, so the feast is
            fixed instead to December 30 that year, whatever day of the week that turns out to be.
          </p>
          <p>
            That rule is worth knowing before anyone tells you this is an ancient, unchanging
            tradition fixed since the apostles. It is a much younger feast than it looks, and it has
            been placed on the calendar for a specific reason.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A Nineteenth Century Feast, Not a First Century One</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The feast itself is young compared to most of the church calendar. Pope Leo XIII, who led
            the Catholic Church through the final decades of the nineteenth century, is the pope
            credited with instituting it and promoting it across the universal church. That period was
            one of rapid industrialization, which was pulling families out of farms and villages and
            into crowded, unstable city life.
          </p>
          <p>
            Promoting the Holy Family as a model was a direct answer to that upheaval, not an old
            custom finally getting official recognition. Leo XIII wanted Catholic families looking at
            a real household under pressure, not an abstract ideal.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Story Behind the Feast: A Family on the Run</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Strip away the feast day entirely and look at what the Gospels actually record about this
            family. It starts hard. Soon after the visit from the magi described in{" "}
            <ArticleLink href="/blog/who-were-the-wise-men">the story of the wise men</ArticleLink>, an
            angel warns Joseph in a dream that Herod intends to kill the child.
          </p>
        </div>
        <VerseQuote
          text="And when they were departed, behold, the angel of the Lord appeareth to Joseph in a dream, saying, Arise, and take the young child and his mother, and flee into Egypt, and be thou there until I bring thee word: for Herod will seek the young child to destroy him."
          reference="Matthew 2:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joseph does not argue, does not wait for morning, does not ask for a better plan. He gets
            up at night and leaves the country with his wife and infant son. This is not a quiet
            nativity scene anymore. This is a refugee family escaping a death order from the government
            of their own region.
          </p>
          <p>
            That is the family this feast honors. Not an idealized household untouched by danger. One
            that obeyed God immediately while afraid, and kept moving.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. An Ordinary Childhood in Nazareth</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Once Herod was dead, the family returned, not to Bethlehem, but to Nazareth in Galilee,
            the small town Joseph and Mary already called home before any of this started. Luke
            compresses what sounds like years of ordinary life into two short verses.
          </p>
        </div>
        <VerseQuote
          text="And when they had performed all things according to the law of the Lord, they returned into Galilee, to their own city Nazareth. And the child grew, and waxed strong in spirit, filled with wisdom: and the grace of God was upon him."
          reference="Luke 2:39 and 40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice what the Bible does not give you here. No miracle. No sign. Just a child growing up
            in a working family&apos;s house, the same way every other child in Nazareth grew up. After
            the drama of{" "}
            <ArticleLink href="/blog/was-jesus-born-in-a-stable">the night Jesus was born</ArticleLink>{" "}
            and the flight from Herod, Scripture settles into years of quiet, unremarkable faithfulness.
          </p>
          <p>
            Most of what shaped Jesus&apos; childhood happened in exactly the kind of ordinary days your
            own family has right now. That is not a small detail. It is the whole shape of the feast.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The One Childhood Story the Gospels Actually Tell</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Scripture only pulls back the curtain on one specific moment between Jesus&apos; infancy and
            His adult ministry: the trip to Jerusalem when He was twelve. Mary and Joseph traveled
            there every year for Passover, and this year Jesus stayed behind in the temple without
            telling them.
          </p>
        </div>
        <VerseQuote
          text="And when they saw him, they were amazed: and his mother said unto him, Son, why hast thou thus dealt with us? behold, thy father and I have sought thee sorrowing. And he said unto them, How is it that ye sought me? wist ye not that I must be about my Father's business?"
          reference="Luke 2:48 and 49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three days of searching. Three days of fear, for any parent. And Jesus&apos; answer is not
            rebellious, but it is not comforting either. He is already living out of a loyalty His own
            parents cannot fully follow yet.
          </p>
        </div>
        <VerseQuote
          text="And he went down with them, and came to Nazareth, and was subject unto them: but his mother kept all these sayings in her heart. And Jesus increased in wisdom and stature, and in favour with God and man."
          reference="Luke 2:51 and 52"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is what the text does not skip past. After that confusing exchange, Jesus goes home
            and submits to His parents anyway. Mary does not get an explanation. She keeps the moment
            in her heart instead and keeps raising her son. That tension, between a child who belongs
            to God and still obeys his mother, is the whole family on display in one scene.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⛪ How Catholics Observe the Day, and Where Others Differ
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In Catholic parishes, the feast is kept with a normal Sunday Mass, built around readings
            about family life, often drawing on Paul&apos;s instructions in Colossians 3 for how the
            people under one roof are supposed to treat each other. Priests often use the day to
            invite couples to renew their marriage vows, and families to recommit to praying together.
          </p>
          <p>
            It is <strong>not</strong>{" "}
            <ArticleLink href="/blog/what-is-a-holy-day-of-obligation">
              a separate holy day of obligation
            </ArticleLink>
            . Because it always falls on a Sunday, Mass attendance is simply the regular Sunday
            obligation every Catholic already has, not an extra requirement added for this feast.
          </p>
          <p>
            Eastern Orthodox churches keep their own commemoration of the Holy Family on a different
            date, folded into their Christmas cycle rather than treated as its own major feast.
          </p>
          <p>
            Most Protestant churches do not observe it at all. That is not an oversight. It follows
            directly from how Protestant traditions generally handle the church calendar, which{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              the difference between Catholic and Protestant church calendars
            </ArticleLink>{" "}
            explains in full: most Protestant traditions kept the handful of events tied directly to
            Jesus&apos; own life and work, like Christmas and Easter, and set aside the later calendar of
            feast days built up around saints and holy families. A Protestant reader can still take
            the Bible passages behind this feast completely seriously. They simply will not find it on
            their church calendar by this name.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Living Like the Holy Family This Week
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a feast day on a calendar to take this story home with you. Here are seven ways to actually do that.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Name the hard part of your family&apos;s year out loud.</strong> Joseph&apos;s family
            fled a death threat. Yours has had its own hard season. Say it plainly in prayer instead of
            glossing over it for the sake of looking fine.
          </li>
          <li>
            <strong>Obey the next right step, not the whole plan.</strong> Joseph did not get a map to
            Egypt. He got one instruction for one night. Ask God for today&apos;s step, not next year&apos;s.
          </li>
          <li>
            <strong>Keep showing up after the confusing moments.</strong> Mary did not get a full
            explanation at the temple. She kept loving and raising her son anyway. You will not
            understand everything about your family either. Stay anyway.
          </li>
          <li>
            <strong>Let the ordinary days count.</strong> Most of Jesus&apos; childhood was unremarkable
            on purpose. Your dishes, bedtime routines, and quiet dinners are not a delay before real
            life. They are real life.
          </li>
          <li>
            <strong>Pray together on purpose, even briefly.</strong> One short prayer before bed as a
            household does more over a year than one dramatic prayer said once.
          </li>
          <li>
            <strong>Treat each other the way Colossians 3 describes.</strong> Kindness, patience,
            forgiveness. Read it as a family this week and ask which one your house needs most right
            now.
          </li>
          <li>
            <strong>Remember this is for every kind of family.</strong> Single parent households,
            blended families, and people without children at all are still living out faithfulness
            under pressure. The Holy Family is a pattern for faithfulness, not a requirement to match
            its shape exactly.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 4 Bible Verses About the Holy Family
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The story above pulls from across the Gospels. These four verses are the ones worth keeping close.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 2:40</h3>
        <VerseQuote
          text="And the child grew, and waxed strong in spirit, filled with wisdom: and the grace of God was upon him."
          reference="Luke 2:40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One sentence covers years. Luke does not describe a single miracle in Jesus&apos; boyhood,
            only steady growth, inside a family that provided wisdom and grace had room to work in. It
            is a reminder that a slow, ordinary upbringing is not a wasted one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 2:51</h3>
        <VerseQuote
          text="And he went down with them, and came to Nazareth, and was subject unto them: but his mother kept all these sayings in her heart."
          reference="Luke 2:51"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus had just told His parents He had to be about His Father&apos;s business. Then He went
            home and obeyed them anyway. Submission to an earthly family and devotion to God were not
            in competition in that house. The same can be true in yours.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Colossians 3:20</h3>
        <VerseQuote
          text="Children, obey your parents in all things: for this is well pleasing unto the Lord."
          reference="Colossians 3:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Written by Paul decades after Jesus&apos; childhood, this verse describes the very pattern
            Luke already showed you in Nazareth. A household working the way God designed it is not
            abstract theology. It looked like an actual family, obeying and being obeyed in the right
            order.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Ephesians 6:1</h3>
        <VerseQuote text="Children, obey your parents in the Lord: for this is right." reference="Ephesians 6:1" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul adds one phrase here that Colossians does not spell out: <strong>in the Lord</strong>.
            The obedience Scripture asks for in a family is never obedience for its own sake. It is
            obedience that lines up a household with God, the same alignment Joseph showed every time
            he got up in the night and did exactly what he was told.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Feast of the Holy Family
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Feast of the Holy Family?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a Christian holy day, kept mainly in the Catholic Church, that honors Jesus, Mary, and
          Joseph as a family and holds their household up as an example for every Christian family.
          It falls on the Sunday within the eight days of Christmas.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When is the Feast of the Holy Family celebrated?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          On the Sunday that falls between Christmas Day and New Year&apos;s Day. In a year when
          Christmas itself is a Sunday, leaving no other Sunday free before January 1, the Church
          moves the feast instead to the fixed date of December 30.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Catholic Church celebrate the Feast of the Holy Family?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pope Leo XIII promoted it in the late nineteenth century as a response to rapid
          industrialization, which was straining family life across Europe. The Church still presents
          the Holy Family as a working model for ordinary households, not a museum piece.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Feast of the Holy Family a holy day of obligation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, not on its own. Because it is always kept on a Sunday, attending Mass that day simply
          fulfills the ordinary Sunday obligation every Catholic already has. It is not an additional
          day of obligation stacked on top.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What Bible passage is read on the Feast of the Holy Family?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Gospel reading changes across the Church&apos;s three year cycle, but it is always drawn
          from Jesus&apos; infancy or childhood, such as His presentation in the temple as a baby or the
          time His parents found Him there at age twelve. Parishes also lean on readings like
          Colossians 3, which gives direct instructions for how members of a household should treat
          each other.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants celebrate the Feast of the Holy Family?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Generally, no. Most Protestant traditions kept the holidays tied directly to events in
          Jesus&apos; own life, like Christmas and Easter, and did not carry forward the later calendar
          of feast days built around saints and holy figures, including this one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who started the Feast of the Holy Family?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pope Leo XIII is the pope credited with instituting it and promoting it across the
          universal Church, in the final decades of the nineteenth century, as industrialization was
          straining family life across Europe.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Jesus stay behind in the temple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke&apos;s Gospel records that the twelve year old Jesus stayed in the Jerusalem temple,
          sitting among the religious teachers, asking and answering questions, while His parents
          traveled a day&apos;s journey home without Him. When they found Him and asked why, He told
          them He had to be about His Father&apos;s business, a statement about His identity that His own
          parents did not fully grasp yet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the Holy Family a real historical family?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. The Gospels present Jesus, Mary, and Joseph as a real household living under real
          political danger, in a real town, Nazareth, that nobody considered important. The feast does
          not honor a symbol. It honors an actual family&apos;s documented obedience.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can my family learn from the Holy Family?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That faithfulness does not require a perfect or comfortable situation. Joseph obeyed in fear,
          at night, with no map. Mary carried confusion she could not resolve. Both kept showing up for
          their son. That is the whole model: keep showing up, even without full understanding.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the candles, the Sunday Mass, the renewed vows, and one plain story is still standing underneath the feast.</p>
          <p>
            📌 <strong>A young couple fled a death threat in the dark, raised a son they did not fully
            understand, and kept doing it anyway, one ordinary day after another.</strong>
          </p>
          <p>
            That is not a story about a flawless family. It is a story about a faithful one. The same
            obedience that got Joseph up in the night to flee to Egypt is the obedience Paul later asks
            every household to practice in Colossians 3 and Ephesians 6.
          </p>
          <p>
            Your family will not get an angel appearing in a dream to tell you the next step. But you
            already have what Mary and Joseph had: enough light for today, and a God who stays faithful
            to the people under your roof.
          </p>
          <p>❓ What is the one ordinary, unremarkable thing your family keeps showing up to do, that nobody outside your house would ever call impressive?</p>
          <p>📌 <strong>According to this feast, that might be exactly where God is at work.</strong></p>
        </div>
      </section>

      <ArticleSources
        checkedOn="4 November 2026"
        sources={[
          {
            title: "Holy Family of Jesus, Mary and Joseph, December 30",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/prayer-and-worship/liturgical-year/christmas/christmas-december-30",
            note: "The source for the Feast of the Holy Family falling on December 30 in years when no other Sunday is free between Christmas and January 1, and for the Gospel reading about the twelve year old Jesus in the temple.",
          },
          {
            title: "Feast of the Holy Family",
            publisher: "Catholic Culture (catholicculture.org)",
            url: "https://www.catholicculture.org/culture/liturgicalyear/calendar/day.cfm?date=2008-12-28",
            note: "The source for Pope Leo XIII instituting the feast in response to the breakdown of family life during industrialization, and for the feast's place on the Sunday within the Christmas octave.",
          },
          {
            title: "Angelus, 27 December 2009",
            publisher: "Pope Benedict XVI, via the Holy See (vatican.va)",
            url: "https://www.vatican.va/content/benedict-xvi/en/angelus/2009/documents/hf_ben-xvi_ang_20091227.html",
            note: "The source for the Church's own teaching on why the Holy Family is held up as a model, and for the reading of Jesus in the temple as shaped by His relationship with Mary and Joseph.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
