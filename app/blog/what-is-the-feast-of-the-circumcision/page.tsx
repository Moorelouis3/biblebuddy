import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-feast-of-the-circumcision", {
  title: "What Is the Feast of the Circumcision of Christ? January 1 Explained",
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

export default function WhatIsTheFeastOfTheCircumcisionPage() {
  return (
    <BlogPostShell
      slug="what-is-the-feast-of-the-circumcision"
      title={<>📖 What Is the Feast of the Circumcision of Christ? January 1 Explained</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Open an old prayer book to January 1 and you will not find a party.
            </p>
            <p>
              You will find a small, blunt feast about a baby being cut, eight days after His
              birth, exactly the way every Jewish boy in His world was cut.
            </p>
            <p>
              Most churches today call January 1 something else. A few still do not.
            </p>
            <p>
              📌 <strong>Here is the plain answer. The Feast of the Circumcision of Christ marks
              the Gospel moment, eight days after Christmas, when the infant Jesus was
              circumcised under the law given to Abraham and formally given the name Jesus. The
              Western church kept this as the headline event of January 1 for centuries, Rome
              quietly renamed the day twice in the twentieth century, and the old title never
              actually disappeared. It still stands today in the Eastern Orthodox calendar and on
              many Anglican and Lutheran calendars.</strong>
            </p>
            <p>
              This guide walks through what Luke actually records, why the early church built a
              feast out of it, how Rome moved away from the title, and where it is still kept
              exactly as it was.
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
            It is easy to wave this off as a squeamish detail from an old calendar nobody uses
            anymore.
          </p>
          <p>
            ⚠️ <strong>But this is not a side note about ritual surgery.</strong> It is the
            moment Scripture puts Jesus under the exact law He came to fulfill, on the exact
            schedule that law required, with no shortcut taken.
          </p>
          <p>
            Paul later makes the stakes plain. Jesus was not born generically into the world. He
            was born into a specific covenant, under a specific law, so that He could actually
            redeem the people standing under it.
          </p>
          <VerseQuote
            text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
            reference="Galatians 4:4 and 5"
          />
          <p>
            💡 <strong>Christmas says the Word became flesh.</strong> January 1 says that flesh
            kept the law, down to the eighth day, before it ever did anything else.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Feast of the Circumcision Actually Marks
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Law Behind the Day: A Sign Given to Abraham
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The eighth day did not start with Jesus. It started roughly two thousand years
            earlier, with God and Abraham.
          </p>
          <VerseQuote
            text="This is my covenant, which ye shall keep, between me and you and thy seed after thee; Every man child among you shall be circumcised. And ye shall circumcise the flesh of your foreskin; and it shall be a token of the covenant betwixt me and you."
            reference="Genesis 17:10 and 11"
          />
          <p>
            God names the exact day a few verses later, and makes it non negotiable.
          </p>
          <VerseQuote
            text="And he that is eight days old shall be circumcised among you, every man child in your generations, he that is born in the house, or bought with money of any stranger, which is not of thy seed."
            reference="Genesis 17:12"
          />
          <p>
            📌 <strong>This was never a private hygiene choice.</strong> It was the visible mark
            of belonging to God&apos;s covenant people, cut into the body of every son born into that
            covenant, on a day fixed in advance.
          </p>
          <p>
            Jewish practice has kept that same eighth day schedule for thousands of years.
            Chabad.org describes the ceremony, called a brit milah, still taking place on the
            eighth day of a healthy boy&apos;s life, and still built around two things happening at
            once: the actual circumcision, and the giving of the child&apos;s name.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. What Luke Actually Records on the Eighth Day
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luke had already shown readers this exact custom once, a few verses earlier, with a
            different baby.
          </p>
          <VerseQuote
            text="And it came to pass, that on the eighth day they came to circumcise the child; and they called him Zacharias, after the name of his father."
            reference="Luke 1:59"
          />
          <p>
            That was John the Baptist. Luke then places Jesus under the identical custom, on the
            identical schedule, with one deliberate difference in how the name arrived.
          </p>
          <VerseQuote
            text="And when eight days were accomplished for the circumcising of the child, his name was called JESUS, which was so named of the angel before he was conceived in the womb."
            reference="Luke 2:21"
          />
          <p>
            💡 <strong>John&apos;s father named him after himself, until a relative stepped in.</strong>{" "}
            Jesus was named by an angel, before He was even conceived. Luke is not just reporting
            a minor surgery. He is reporting that the promised child kept the same law every
            other Jewish boy kept, on the same day, while carrying a name no human father chose.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. How the Early Church Turned This Into a Feast
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Catholic Encyclopedia, in its 1908 entry on the feast hosted by New Advent, traces
            an actual legal order for it. The Council of Tours, in the year 567, told the churches
            under it to keep a Mass of the Circumcision on January 1.
          </p>
          <p>
            Rome itself moved slower. The same source says that at Rome in the seventh century,
            the day was still mainly kept as the octave, the eighth day, of Christmas, rather than
            as a feast centered on the Circumcision itself. The Circumcision only came to the
            front of the day later, with the title&nbsp;
            <em>In Circumcisione Domini et Octava Nativitatis</em> eventually naming both at once.
          </p>
          <p>
            📌 <strong>So the feast grew unevenly, not all at once.</strong> Gaul kept a Mass of
            the Circumcision by law in the sixth century. Byzantine calendars from the eighth and
            ninth centuries already list the Circumcision alongside the feast of Saint Basil the
            Great on the same day. Wikipedia&apos;s account of the feast&apos;s history places Rome&apos;s own
            adoption of the title Circumcision of the Lord later still, in the thirteenth or
            fourteenth century.
          </p>
          <p>
            One thing every one of those sources agrees on. Whatever the exact century, the church
            was reading the same event, the eighth day after the birth of Christ, and deciding it
            was worth a Mass of its own.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Why Rome Renamed the Day Twice in the Twentieth Century
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            For centuries, Circumcision of the Lord was the title most Western Catholics actually
            saw printed on January 1. Two popes changed that inside forty years.
          </p>
          <p>
            Pope John XXIII&apos;s 1960 calendar reform dropped the word Circumcision from the title
            entirely and called the day simply the Octave of the Nativity, a change the 1962 Roman
            Missal still carries.
          </p>
          <p>
            Pope Paul VI went further. His 1969 motu proprio Mysterii Paschalis reorganized the
            whole liturgical calendar, and gave January 1 the name most Catholics know today, the
            Solemnity of Mary, the Holy Mother of God, while keeping the naming of Jesus as part of
            the same day rather than its title.{" "}
            <ArticleLink href="/blog/what-is-the-solemnity-of-mary">
              The Solemnity of Mary carries its own full story
            </ArticleLink>
            , including the ancient council behind the title Mother of God, but the short version
            for this guide is simple. The Gospel scene did not move. The sign on the door did.
          </p>
          <p>
            ⚠️ <strong>Say exactly what changed, and what did not.</strong> The Mass readings for
            January 1 still include Luke&apos;s account of the circumcision and naming. What changed
            across 1960 and 1969 was which part of that same Gospel scene got the title on the
            sign out front.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Where the Old Title Still Stands Today
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rome&apos;s rename never reached every church that kept this feast.
          </p>
          <p>
            The Eastern Orthodox Church never dropped it. The OCA&apos;s own page for the day calls it
            the Circumcision of our Lord and Savior Jesus Christ, kept every January 1, and states
            plainly that accounts of the feast continue in the Eastern church right up through the
            fourth century. Orthodox parishes keep it paired with the feast of Saint Basil the
            Great, on the same date, the way Byzantine calendars already did over a thousand years
            ago.
          </p>
          <p>
            Anglican and Lutheran churches kept it too, for the same reason stated plainly in the
            Wikipedia account of the feast&apos;s history: it is a feast of Christ, tied directly to a
            specific verse of Scripture, Luke 2:21, which made it the kind of feast the Reformers
            did not throw out. The Book of Common Prayer called the day the Circumcision of
            Christ outright. The Church of England&apos;s modern Common Worship, in use since the year
            2000, renamed it the Naming and Circumcision of Jesus rather than drop the word
            entirely. Some Lutheran calendars still title the day the Circumcision and the Name of
            Jesus, and Martin Luther himself preached on it, in a sermon still preserved in his
            Church Postils.
          </p>
          <p>
            📌 <strong>That is the real shape of this feast&apos;s history.</strong> Not one church
            quietly abandoning an old idea, but several churches making their own separate
            decisions about one shared Gospel event, and landing in different places on what to
            call it. It is one more entry in{" "}
            <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
              the wider list of ways Catholic and Protestant church calendars actually differ
            </ArticleLink>
            , even where both sides are reading the exact same verse.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. What Circumcision Was Always Pointing Toward
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            None of this history answers the harder question. Why does any of it matter now, when
            no church asks a Gentile Christian to be circumcised.
          </p>
          <p>
            Paul answers that directly, writing to a church arguing over exactly this.
          </p>
          <VerseQuote
            text="In whom also ye are circumcised with the circumcision made without hands, in putting off the body of the sins of the flesh by the circumcision of Christ: Buried with him in baptism, wherein also ye are risen with him through the faith of the operation of God, who hath raised him from the dead."
            reference="Colossians 2:11 and 12"
          />
          <p>
            💡 <strong>Christ&apos;s own circumcision, kept perfectly under the law, is what lets Paul
            say every believer now carries a circumcision made without hands.</strong> The
            physical sign given to Abraham finds its fulfillment in Jesus keeping it exactly, not
            in every believer after Him repeating it.
          </p>
          <p>
            Paul makes the same move again, pushing the sign past the skin entirely.
          </p>
          <VerseQuote
            text="For he is not a Jew, which is one outwardly; neither is that circumcision, which is outward in the flesh: But he is a Jew, which is one inwardly; and circumcision is that of the heart, in the spirit, and not in the letter; whose praise is not of men, but of God."
            reference="Romans 2:28 and 29"
          />
          <p>
            That is why most Protestant churches, outside the Anglican and Lutheran traditions
            that kept the day on their calendar, never built a feast around January 1 at all. Not
            because the event did not matter, but because they read Paul as moving the sign from
            the body to the heart, and saw no reason to keep marking the old location on a
            calendar.
          </p>
          <p>
            This was not the only Old Testament law the holy family kept on a strict schedule.{" "}
            <ArticleLink href="/blog/what-is-the-presentation-of-jesus">
              The Presentation of Jesus in the temple
            </ArticleLink>{" "}
            follows roughly forty days later, obeying a different law from Leviticus about a
            mother&apos;s purification. Both feasts are reading the same thing. Mary and Joseph did
            not treat the law as optional for their own son.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Keeping This Day Well
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            You do not need a Mass on your calendar for this feast to teach you something real.
          </p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Luke 2:21 before you read any resolution list.</strong> Let the first
            thing you hear about the new year be that Jesus kept the law before He ever preached
            a word of it.
          </li>
          <li>
            <strong>Learn which calendar your own church actually follows.</strong> Catholic,
            Orthodox, Anglican, and Lutheran congregations all treat January 1 differently, and
            knowing which one yours keeps will help the day actually mean something.
          </li>
          <li>
            <strong>Do not treat the different titles as a contradiction.</strong> Solemnity of
            Mary, Circumcision of Christ, and Naming and Circumcision of Jesus are three names
            standing over the same eight verses of Luke.
          </li>
          <li>
            <strong>Sit with Galatians 4:4 and 5 for a minute.</strong> God sending His Son under
            the law is not abstract theology. It is the reason Jesus could actually redeem anyone
            standing under it.
          </li>
          <li>
            <strong>Ask what your own circumcision of the heart looks like this year.</strong>{" "}
            Romans 2:29 was not written as a slogan. It names something real Paul expected to
            change in you.
          </li>
          <li>
            <strong>If you grew up thinking this feast was just a Catholic oddity, go check an
            Orthodox or Lutheran calendar.</strong> You will find the exact same date, kept with a
            different name, for the exact same Gospel reason.
          </li>
          <li>
            <strong>Let January 1 extend Christmas instead of ending it.</strong>{" "}
            <ArticleLink href="/blog/what-is-christmastide">
              Christmastide does not stop at the manger
            </ArticleLink>
            , and this feast is proof the church kept unpacking what the birth of Jesus actually
            meant, one day at a time.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses for the Feast of the Circumcision
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Five passages carry almost the entire meaning of this day.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 17:10 and 11</h3>
        <VerseQuote
          text="This is my covenant, which ye shall keep, between me and you and thy seed after thee; Every man child among you shall be circumcised. And ye shall circumcise the flesh of your foreskin; and it shall be a token of the covenant betwixt me and you."
          reference="Genesis 17:10 and 11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This is the command Jesus was placed under on the eighth day. Without this verse, Luke
          2:21 is just a strange medical detail. With it, Luke 2:21 is Jesus keeping a promise God
          made two thousand years before He was born.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 2:21</h3>
        <VerseQuote
          text="And when eight days were accomplished for the circumcising of the child, his name was called JESUS, which was so named of the angel before he was conceived in the womb."
          reference="Luke 2:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This single verse is the feast. Two facts sit side by side here, a Gospel detail every
          church that keeps this day is actually pointing at: the law was kept, and the name came
          from heaven, not from a father.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Galatians 4:4 and 5</h3>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul tells you why the eighth day mattered at all. Jesus was placed under the law on
          purpose, specifically so He could redeem the people who could never keep it well enough
          on their own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Colossians 2:11 and 12</h3>
        <VerseQuote
          text="In whom also ye are circumcised with the circumcision made without hands, in putting off the body of the sins of the flesh by the circumcision of Christ: Buried with him in baptism, wherein also ye are risen with him through the faith of the operation of God, who hath raised him from the dead."
          reference="Colossians 2:11 and 12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This is where the Old Testament sign lands for a Christian today. Not repeated on your
          own body, but fulfilled in Christ&apos;s body and applied to you through faith and baptism.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Romans 2:28 and 29</h3>
        <VerseQuote
          text="For he is not a Jew, which is one outwardly; neither is that circumcision, which is outward in the flesh: But he is a Jew, which is one inwardly; and circumcision is that of the heart, in the spirit, and not in the letter; whose praise is not of men, but of God."
          reference="Romans 2:28 and 29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul finishes the thought he started in Galatians. The sign given to Abraham was always
          pointing past the skin, toward a heart actually changed by God, which is the one part of
          this feast every tradition, with or without it on the calendar, can agree matters.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Feast of the Circumcision
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the Feast of the Circumcision of Christ?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the Christian observance, kept on January 1, of the Gospel event in Luke 2:21,
          when the infant Jesus was circumcised on the eighth day under the law given to Abraham
          and formally given the name Jesus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why was Jesus circumcised if He was God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Galatians 4:4 and 5 answers this directly. Jesus was made under the law on purpose, so
          that He could redeem the people who were already under it. His circumcision shows Him
          fully submitting to the same covenant sign every other Jewish son carried.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Feast of the Circumcision still on the Catholic calendar?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not under that title. Pope John XXIII&apos;s 1960 reform renamed the day the Octave of the
          Nativity, and Pope Paul VI&apos;s 1969 reform, Mysterii Paschalis, gave it its current
          Catholic name, the Solemnity of Mary, the Holy Mother of God. The naming of Jesus is
          still part of the day&apos;s readings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Eastern Orthodox churches still celebrate the Circumcision of Christ?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, under that exact name. The Orthodox Church in America&apos;s own calendar keeps January
          1 as the Circumcision of our Lord and Savior Jesus Christ, paired with the feast of
          Saint Basil the Great on the same day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Anglicans and Lutherans still observe this feast?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many do. The Church of England&apos;s Common Worship calls the day the Naming and
          Circumcision of Jesus, the older Book of Common Prayer called it the Circumcision of
          Christ outright, and several Lutheran calendars still title it the Circumcision and the
          Name of Jesus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the connection between circumcision and baptism?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Colossians 2:11 and 12 ties the two together directly, describing believers as
          circumcised with a circumcision made without hands and buried with Christ in baptism.
          Baptism carries forward what physical circumcision once marked, entry into God&apos;s
          covenant people.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do most Protestant churches not keep this feast?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Protestant traditions outside Anglicanism and Lutheranism never built a church
          calendar around named feast days at all. Where Scripture is read as moving the sign of
          circumcision from the body to the heart, in Romans 2:28 and 29, many Protestants see no
          need for a yearly feast marking the old physical sign.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why is Jesus&apos;s circumcision mentioned right before His name?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke 2:21 follows the same Jewish custom he already described for John the Baptist in
          Luke 1:59, where circumcision and naming happened together on the eighth day. Jesus&apos;s
          name, though, came from an angel before He was conceived, not from a parent choosing it
          on the spot.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does circumcision of the heart mean?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Romans 2:29 describes a circumcision that is internal and spiritual rather than
          physical, a change in a person&apos;s heart rather than their body. Paul presents this as
          what the Old Testament sign was always ultimately pointing toward.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the different titles, and three things remain true about January 1.</p>
          <p>
            📌 <strong>The Gospel event never moved.</strong> Whatever your church calls the day,
            Luke 2:21 is still the verse behind it. Jesus, circumcised on the eighth day, named by
            an angel before He was ever conceived.
          </p>
          <p>
            📌 <strong>The titles changed because different churches made different choices, not
            because the history is actually contested.</strong> Rome renamed the day twice in the
            twentieth century. Orthodox, Anglican, and Lutheran calendars simply never did.
          </p>
          <p>
            📌 <strong>The sign itself was always pointing further than the body.</strong>{" "}
            Galatians 4:4 and 5 says why Christ kept it. Romans 2:28 and 29 says where it was
            always headed.
          </p>
          <p>
            Whatever your church calls January 1,{" "}
            <ArticleLink href="/blog/what-is-epiphany">
              Epiphany is still five days away
            </ArticleLink>
            , and the manger is not finished teaching you yet. Ask yourself the question Paul
            actually leaves you with. Not whether you keep an old sign in your body, but whether
            God has actually gotten to your heart.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="7 November 2026"
        sources={[
          {
            title: "Feast of the Circumcision",
            publisher: "Catholic Encyclopedia (1908), via New Advent",
            year: "1908",
            url: "https://www.newadvent.org/cathen/03779a.htm",
            note: "The source for the Council of Tours (567) ordering a Mass of the Circumcision, Rome's seventh century emphasis on the Christmas octave over the Circumcision itself, and the theological reading of Jesus fulfilling the law under Galatians 4:4 and 5.",
          },
          {
            title: "Feast of the Circumcision of Christ",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Feast_of_the_Circumcision_of_Christ",
            note: "The source for Rome adopting the title Circumcision of the Lord by the thirteenth or fourteenth century, the 1960 and 1969 Catholic calendar reforms, and the feast's current titles and status in Anglican and Lutheran churches.",
          },
          {
            title: "The Circumcision of our Lord and Savior Jesus Christ",
            publisher: "Orthodox Church in America (OCA)",
            url: "https://www.oca.org/saints/id/lives/100001",
            note: "The source for the Eastern Orthodox Church's continued observance of the feast under its original name, its pairing with the feast of Saint Basil the Great, and its theological reading of circumcision through Genesis 17 and Colossians 2:11 and 12.",
          },
          {
            title: "Mysterii Paschalis",
            publisher: "Pope Paul VI, The Holy See, vatican.va",
            year: "1969",
            url: "https://www.vatican.va/content/paul-vi/en/motu_proprio/documents/hf_p-vi_motu-proprio_19690214_mysterii-paschalis.html",
            note: "The primary source for the 1969 reform that renamed January 1 the Solemnity of Mary, the Holy Mother of God, in the Catholic Church's General Roman Calendar.",
          },
          {
            title: "The Bris Ceremony",
            publisher: "Chabad.org",
            url: "https://www.chabad.org/library/article_cdo/aid/1472861/jewish/The-Bris-Ceremony.htm",
            note: "The source for the brit milah still being performed on the eighth day of a Jewish boy's life today, and for the naming of the child taking place as part of that same ceremony.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
