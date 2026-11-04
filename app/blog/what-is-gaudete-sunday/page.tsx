import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-gaudete-sunday", {
  title: "What Is Gaudete Sunday? Why Is One Advent Candle Pink?",
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

export default function WhatIsGaudeteSundayPage() {
  return (
    <BlogPostShell
      slug="what-is-gaudete-sunday"
      title={<>📖 What Is Gaudete Sunday? Why Is One Advent Candle Pink?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The first two purple candles felt right. Quiet. Waiting. A little heavy, even.</p>
            <p>Then the third Sunday comes, and the candle is not purple at all.</p>
            <p>Nobody in the pew ever gets a reason why. The priest just lights it, and moves on.</p>
            <p>
              📌 <strong>Gaudete Sunday is the third Sunday of Advent, the one Sunday the church
              deliberately breaks its own quiet, waiting mood to tell you plainly to rejoice. The
              rose candle on the wreath and the rose vestments on the priest both say the same
              thing: the waiting is more than half finished, and joy is allowed before the answer
              fully arrives.</strong>
            </p>
            <p>
              This guide walks through where the word Gaudete actually comes from, why the color
              changes for exactly one Sunday, what the church&apos;s own readings for the day say,
              and how churches outside the Catholic Church mark this same pause in their own way.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is easy to file this under trivia. A fun fact about a candle color.</p>
          <p>
            ⚠️ <strong>But look at what Gaudete Sunday is actually arguing.</strong> It is telling
            you that joy and waiting are not opposites. The church could have made Advent one
            unbroken month of purple, head down, until Christmas finally arrived. It chose not to.
          </p>
          <p>
            Most of your own life happens in that same gap. Waiting on the diagnosis. Waiting on
            the marriage to heal. Waiting on the prayer that still has not been answered.
          </p>
          <p>
            💡 <strong>Gaudete Sunday says you do not have to wait until the answer comes to feel
            joy again.</strong> Joy is allowed to interrupt the waiting, on God&apos;s own
            schedule, before the thing you are hoping for has actually shown up.
          </p>
          <p>
            Learning why this one Sunday looks different is part of learning{" "}
            <ArticleLink href="/blog/advent-vs-christmas">
              what Advent is actually for
            </ArticleLink>
            , instead of only treating it as the slow countdown before the real holiday starts.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Gaudete Sunday Actually Is
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Word Behind the Name</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start with the word itself. Gaudete is Latin, and it is a command, not a description.</p>
          <p>
            📌 <strong>It means rejoice.</strong> Catholic Extension explains that the day takes
            its name from the opening word of the Mass&apos;s entrance antiphon, the short chant
            that opens worship that Sunday. Simply Catholic traces that antiphon straight back to
            Paul&apos;s letter to the Philippians.
          </p>
        </div>
        <VerseQuote
          text="Rejoice in the Lord alway: and again I say, Rejoice. Let your moderation be known unto all men. The Lord is at hand."
          reference="Philippians 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul did not write that line for a calendar. He wrote it from a prison cell, to a
            church he loved, as a flat command regardless of circumstance. Centuries later, the
            church took his own opening word, Gaudete, and let it name an entire Sunday.
          </p>
          <p>The Lord is at hand sits right next to the command to rejoice, and that order matters.</p>
          <p>💡 The joy is not because the trouble is over. It is because the Lord is near.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Why One Candle Breaks the Pattern</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Most Advent wreaths carry three purple candles and one that is not. I have written a
            full guide to{" "}
            <ArticleLink href="/blog/what-is-an-advent-wreath">
              everything else the wreath means
            </ArticleLink>
            , so here the focus stays narrow: why does the third candle alone change color.
          </p>
          <p>
            ⚠️ <strong>The honest word for that color is rose, not pink.</strong> Simply Catholic
            cites the General Instruction of the Roman Missal, paragraph 346, which states plainly
            that rose vestments &quot;may be used, where it is the practice,&quot; on Gaudete
            Sunday and on its Lenten counterpart, Laetare Sunday. The candle&apos;s color is
            chosen to match the vestment the priest is already permitted to wear that day.
          </p>
          <p>
            A note on the word itself. EWTN&apos;s own liturgical Q&amp;A is specific here: pink,
            the article says, &quot;is not counted among the liturgical colors&quot; at all. Rose
            is its own distinct shade, closer to a pale, faded red than to a nursery pink.
          </p>
          <p>
            📌 <strong>Where a parish has no rose vestments on hand, the same source notes the
            priest simply wears violet instead.</strong> Rose has always been the exception for
            one Sunday, never the rule.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The History Behind the Rose Vestments
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Rose did not appear on the church&apos;s calendar the way it looks today, all at once.
          </p>
          <p>
            EWTN&apos;s Q&amp;A notes that the earliest Christian vestments were simply white, the
            everyday formal dress of the ancient world, and that a settled set of rules for which
            color belonged to which day did not really take hold until around the middle of the
            sixteenth century. Color coded worship, in other words, grew up slowly, long after the
            church itself.
          </p>
          <p>
            Christianity.com&apos;s own overview places the custom of a joyful pause inside
            Advent&apos;s penitential season back in the medieval church, once Advent itself had
            come to be kept with the same kind of seriousness as Lent. A season built that heavy
            needed its own relief valve.
          </p>
          <p>
            That relief valve has a twin. Gaudete Sunday&apos;s counterpart in Lent is Laetare
            Sunday, the fourth Sunday of Lent, which gets the identical rose treatment for the
            identical reason.{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              Both sit inside the church&apos;s wider calendar of penitential and festive seasons
            </ArticleLink>
            , and both exist to say the same thing on a single day: keep going, you are not as far
            from the finish as the color around you usually suggests.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. What This Year&apos;s Own Readings Say
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Mass readings for Gaudete Sunday rotate on a three year cycle, Year A, Year B, and
            Year C, so the exact passages change depending on where the church calendar lands.
          </p>
          <p>
            For the Third Sunday of Advent in 2026, falling on December 13, the USCCB&apos;s own
            daily readings list the first reading as Isaiah 61, the prophet speaking as one sent
            with good news.
          </p>
        </div>
        <VerseQuote
          text="The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound."
          reference="Isaiah 61:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In place of the usual psalm, that same USCCB page lists Mary&apos;s own song, the
            Magnificat, as the responsorial for the day.
          </p>
        </div>
        <VerseQuote
          text="And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour."
          reference="Luke 1:46 and 47"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The second reading, from Paul again, makes the command to rejoice almost relentless.</p>
        </div>
        <VerseQuote
          text="Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you."
          reference="1 Thessalonians 5:16 to 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what is missing from all three readings.</strong> Not one of them
            says the hard season is already over. Isaiah is still speaking to captives. Paul wrote
            his letter to a young, struggling church. The command to rejoice always arrives before
            the circumstances finish changing, never after.
          </p>
          <p>
            In the Year C cycle, the Gospel for this same Sunday moves to Luke 3, where crowds ask
            John the Baptist what they should actually do, and his answers are plain and practical,
            not abstract.{" "}
            <ArticleLink href="/blog/who-were-the-wise-men">
              Advent keeps circling back to people who had to act on partial information
            </ArticleLink>
            , long before the full picture of Christ arrived.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. How Protestants Keep Their Own Pause
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Gaudete Sunday is not only a Catholic observance. Christianity.com&apos;s overview
            names the Anglican Church and Lutheran churches alongside Rome as traditions that keep
            this same Sunday, often with the same rose coloring in both candle and vestment.
          </p>
          <p>
            ⚠️ <strong>Many other Protestant and evangelical churches keep an Advent wreath
            without ever naming the day Gaudete at all.</strong> Instead they usually land on a
            theme of joy for the third candle inside a wider Hope, Peace, Joy, and Love naming
            scheme, which I cover in full in the wreath guide linked above, since the names and
            even the week order shift from church to church.
          </p>
          <p>
            📌 <strong>What stays constant underneath the different names is the same idea
            Catholics mark with rose.</strong> Somewhere in the middle of Advent, the mood turns
            toward joy on purpose, whatever each tradition happens to call that week.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Ways to Keep Gaudete Sunday
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a parish or a rose candle to let this Sunday mean something.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Say out loud why the color changed.</strong> If your own church lights a
            wreath, tell whoever is next to you what the rose candle actually marks, instead of
            letting it pass unexplained the way it usually does.
          </li>
          <li>
            <strong>Read Philippians 4:4 and 5 before the day starts.</strong> Let Paul&apos;s own
            command set the tone before anything else does.
          </li>
          <li>
            <strong>Pray 1 Thessalonians 5:16 to 18 as written, in order.</strong> Rejoice. Pray
            without ceasing. Give thanks. The three commands build on each other on purpose.
          </li>
          <li>
            <strong>Let one bright thing interrupt a heavy week.</strong> Gaudete Sunday is not
            asking you to pretend the hard season is finished. It is asking you to let joy in
            before it is.
          </li>
          <li>
            <strong>Teach a child the real reason, not a guess.</strong> If someone younger asks
            why the candle is a different color, give them the actual answer instead of leaving it
            mysterious for another year.
          </li>
          <li>
            <strong>Hold the joy and the waiting together.</strong> Do not rush past Advent to get
            to Christmas, and do not let the waiting crowd out the one Sunday built for rejoicing
            in the middle of it.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Verses Behind Gaudete Sunday
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Philippians 4:4 to 7</h3>
        <VerseQuote
          text="Rejoice in the Lord alway: and again I say, Rejoice. Let your moderation be known unto all men. The Lord is at hand. Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
          reference="Philippians 4:4 to 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the exact passage the whole Sunday is named after.</p>
          <p>
            📌 Paul does not say rejoice because everything is fine. He says rejoice because the
            Lord is at hand, and then hands you what to do with every anxious thing underneath
            that joy. Prayer. Thanksgiving. A peace that stands guard over what you cannot
            control.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Thessalonians 5:16 to 18</h3>
        <VerseQuote
          text="Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you."
          reference="1 Thessalonians 5:16 to 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three short commands, stacked on top of each other with no room to argue.</p>
          <p>
            💡 Notice the word evermore. Not on the good days. Not once the circumstances improve.
            This is Paul telling a young, struggling church that joy is meant to be constant,
            which is exactly the claim Gaudete Sunday makes about one Sunday in the middle of a
            quiet season.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Isaiah 61:1 and 2</h3>
        <VerseQuote
          text="The Spirit of the Lord GOD is upon me; because the LORD hath anointed me to preach good tidings unto the meek; he hath sent me to bind up the brokenhearted, to proclaim liberty to the captives, and the opening of the prison to them that are bound; To proclaim the acceptable year of the LORD, and the day of vengeance of our God; to comfort all that mourn."
          reference="Isaiah 61:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the reading the USCCB assigns for Gaudete Sunday this year, and it is good
            news aimed squarely at people who are still captive, still bound, still mourning.
          </p>
          <p>Jesus later reads this exact passage out loud in His home synagogue and says it is about Him.</p>
          <p>📌 The good tidings were never for people whose troubles were already solved.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 1:46 and 47</h3>
        <VerseQuote
          text="And Mary said, My soul doth magnify the Lord, And my spirit hath rejoiced in God my Saviour."
          reference="Luke 1:46 and 47"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mary sings this while the promise inside her is still completely invisible to anyone
            looking at her from the outside.
          </p>
          <p>
            💡 Her joy runs ahead of the evidence, the same way Gaudete Sunday asks the whole
            church to let joy run ahead of whatever is still unfinished in December.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Gaudete Sunday
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Gaudete mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gaudete is Latin for rejoice. It is the first word of the entrance antiphon sung or
          recited at the start of Mass on the third Sunday of Advent, a line drawn from
          Philippians 4:4, where Paul commands the church to rejoice in the Lord always.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why is one Advent candle pink instead of purple?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The third candle is colored rose to match the rose vestments the priest is permitted to
          wear that same Sunday, under paragraph 346 of the General Instruction of the Roman
          Missal. It marks the one deliberate break in Advent&apos;s usual purple, signaling that
          the season is now more than halfway finished.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What color are the vestments on Gaudete Sunday?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Rose, where that is the local practice, in place of the violet worn on every other
          Sunday of Advent. Where a parish has no rose vestments, the priest simply wears violet
          instead, since rose has always been an option rather than a requirement.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is Gaudete Sunday the same thing as Laetare Sunday?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, but they are a matched pair. Gaudete Sunday is the third Sunday of Advent. Laetare
          Sunday is the fourth Sunday of Lent, and it gets the identical rose treatment for the
          same reason, a brief, deliberate pause of joy inside a penitential season.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the Bible reading for Gaudete Sunday?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It changes with the church&apos;s three year cycle. For December 13, 2026, the USCCB
          lists Isaiah 61, the Magnificat from Luke 1 as the responsorial, 1 Thessalonians 5:16 to
          24, and John 1:6 to 8 and 19 to 28. In the Year C cycle the Gospel instead comes from
          Luke 3, where John the Baptist answers the crowd&apos;s question about what to do.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants celebrate Gaudete Sunday?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some do by that exact name, including Anglican and Lutheran churches, which keep rose
          vestments and candles of their own. Many other Protestant churches keep a joy themed
          candle on the third week of Advent without using the word Gaudete at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is Gaudete Sunday a holy day of obligation?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. It is simply the regular Sunday Mass for the third week of Advent, kept with a
          different optional color. Every Sunday already carries its own obligation for Catholics,
          and Gaudete Sunday does not add anything beyond that.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is pink the correct word for the candle&apos;s color?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not officially. EWTN&apos;s own liturgical guidance states plainly that pink is not
          counted among the church&apos;s liturgical colors at all. The correct term is rose, a
          paler, more muted shade than ordinary pink.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does Advent get a joyful Sunday in the middle of a penitential season?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Advent, treated with the same seriousness as Lent since the medieval church,
          needed a built in reminder that the waiting has a limit. Gaudete Sunday marks that the
          season is more than half over, and it lets joy arrive before the final answer does, not
          only after.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the Latin and the vestment rules, and one plain claim is left standing.</p>
          <p>
            📌 <strong>Gaudete Sunday says joy does not have to wait for the waiting to end.</strong>{" "}
            One Sunday, in the middle of a quiet, penitential season, the church puts on a
            different color and says it plainly: rejoice, the Lord is at hand.
          </p>
          <p>
            📌 <strong>That claim did not start with a candle.</strong> It started with Paul,
            writing from a prison cell, commanding a church he loved to rejoice always, long before
            any wreath existed to put the command on display.
          </p>
          <p>
            Whatever is still unfinished in your own life this Advent,{" "}
            <ArticleLink href="/blog/what-is-christmas">
              the waiting is heading somewhere real
            </ArticleLink>
            , and it does not have to stay silent until it arrives.
          </p>
          <p>❓ Is there a hard, unfinished thing in your own life right now that joy could still interrupt before it is resolved?</p>
          <p>
            📌 <strong>Rejoice in the Lord always.</strong> Not because everything is finished. Because the Lord is at hand.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="4 November 2026"
        sources={[
          {
            title: "Rose-Colored Vestments on Gaudete Sunday",
            publisher: "Fr. Edward McNamara, via EWTN (originally ZENIT)",
            url: "https://www.ewtn.com/catholicism/library/rosecolored-vestments-on-gaudete-sunday-4852",
            note: "The source for the General Instruction of the Roman Missal, paragraph 346, the history of vestment colors, the statement that pink is not a liturgical color, and the fallback to violet where rose vestments are unavailable.",
          },
          {
            title: "What is Gaudete Sunday?",
            publisher: "Catholic Extension",
            url: "https://catholicextension.org/what-is-gaudete-sunday/",
            note: "The source for the name coming from the Mass's entrance antiphon and the day's place in the middle of Advent.",
          },
          {
            title: "Why Do We Light a Pink Candle?",
            publisher: "Simply Catholic",
            url: "https://www.simplycatholic.com/the-pink-candle/",
            note: "The source for GIRM 346's exact wording on rose vestments and the entrance antiphon's text from Philippians 4:4.",
          },
          {
            title: "Daily Readings for December 13, 2026",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://bible.usccb.org/bible/readings/121326.cfm",
            note: "The source for this year's assigned Mass readings for the Third Sunday of Advent: Isaiah 61, Luke 1 as the responsorial, 1 Thessalonians 5, and John 1.",
          },
          {
            title: "What is Gaudete Sunday? Meaning, History, and Traditions",
            publisher: "Christianity.com",
            url: "https://www.christianity.com/wiki/holidays/gaudete-sunday-third-advent-sunday.html",
            note: "The source for the custom's medieval roots, the list of traditions that observe Gaudete Sunday including Anglican and Lutheran churches, and the day's Latin derivation from the Mass introit.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
