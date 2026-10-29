import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-feast-of-christ-the-king", {
  title: "What Is the Feast of Christ the King? Meaning and Biblical Significance",
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

export default function WhatIsTheFeastOfChristTheKingPage() {
  return (
    <BlogPostShell
      slug="what-is-the-feast-of-christ-the-king"
      title={<>📖 What Is the Feast of Christ the King? Meaning and Biblical Significance</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You open your church bulletin on a Sunday near the end of November and the title at the top stops you.</p>
            <p>&quot;The Solemnity of Our Lord Jesus Christ, King of the Universe.&quot;</p>
            <p>
              📌 <strong>That is the Feast of Christ the King, and it is one of the newest holidays on the
              whole Christian calendar, even though it sounds ancient.</strong> It was created less than a
              hundred years ago, by one pope, for a very specific reason.
            </p>
            <p>
              Maybe you are Catholic and you have sung the hymns every year without ever asking where the day
              actually came from.
            </p>
            <p>
              Maybe your own church is Protestant and marks this same Sunday under a different name, and you
              have never connected the two.
            </p>
            <p>
              Or maybe you have never heard of it at all, and you are wondering what a king has to do with the
              last Sunday before Advent starts.
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide walks through why Pope Pius XI created the feast in 1925, what he was actually
              responding to, why the date moved decades later, what the Bible itself says about the kind of
              king Jesus claimed to be, and how different churches keep this Sunday today.
            </p>
            <p>Every historical claim below is sourced, so you can go check it yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is easy to file this feast under church trivia, a date on a calendar nobody asked for. That
            undersells what it is actually asking you.
          </p>
          <p>
            ⚠️ <strong>The question behind this Sunday is not decoration. It is who actually rules your
            life.</strong> Every government, every boss, every crisis in the news is making an unspoken claim
            on your allegiance. This feast exists to put one claim above all of them.
          </p>
          <p>
            It also lands right before{" "}
            <ArticleLink href="/blog/when-does-advent-begin">Advent begins</ArticleLink>, which is not an
            accident. The church year ends by looking forward to the King who is already reigning and is
            still coming, before it starts over again waiting for His first arrival as a baby.
          </p>
          <p>
            💡 You do not need to be Catholic to ask this question seriously. Scripture calls Jesus King long
            before any pope did, and that claim is the whole point.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Where the Feast of Christ the King Actually Came From
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Why Pope Pius XI Created a Brand New Feast in 1925
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Start with the plain fact most people never hear. The Feast of Christ the King is not an ancient
            tradition handed down from the early church. Pope Pius XI instituted it in 1925, through an
            encyclical called Quas Primas, dated December 11 that year.
          </p>
          <p>
            📌 <strong>He was not writing in peaceful times.</strong> World War One had just ended, and a wave
            of revolutions between 1917 and 1923 had already toppled the Hohenzollern, Romanov, Habsburg, and
            Ottoman rulers. New ideologies claiming absolute loyalty were rising to fill the gap, and the
            Vatican itself was still locked in an unresolved dispute with the Italian state over Rome.
          </p>
          <p>
            In the encyclical itself, Pius XI points to a deeper problem underneath the politics. He writes
            that the evils of the age came from the fact that &quot;the majority of men had thrust Jesus Christ
            and his holy law out of their lives.&quot; A new feast was his answer, not as a slogan, but as a
            yearly reminder written into the whole church&apos;s calendar.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Idea Had Been Pushed for Decades Before the Pope Agreed
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The feast did not appear out of nowhere in 1925 either. A Jesuit priest named Jean Marie
            Sanna Solaro had already asked Rome for a feast of Christ&apos;s kingship back in 1870, and the
            Congregation of Rites turned it down.
          </p>
          <p>
            💡 <strong>The idea survived because lay people kept pushing it, not only clergy.</strong> A woman
            named Marthe de Noaillat, who ran a religious museum in France, spent years writing to bishops and
            religious orders across the world to build support. Pius XI later told her plainly that he needed
            both the teaching church and the listening church behind the idea before he would act. By 1925
            enough of both existed.
          </p>
          <p>
            He announced the new feast himself, at Mass, on the final day of the 1925 Holy Year, with
            Marthe and her husband present as honored guests.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Why the Feast First Landed in October, Not November
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pius XI did not pick the date at random. In Quas Primas he assigned the feast to the last Sunday
            of October, deliberately placed right before{" "}
            <ArticleLink href="/blog/what-is-all-saints-day">All Saints&apos; Day</ArticleLink> on November 1.
          </p>
          <p>
            He explained why in the encyclical itself. That Sunday sits near the end of the church&apos;s
            yearly cycle of readings, so the feast would crown the whole year&apos;s remembering of
            Christ&apos;s life, right before the church turned to honor the saints who had followed Him. The
            first parish anywhere in the world dedicated to Christ the King was consecrated the following
            year, in 1926, in Cincinnati, Ohio.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. How the Date and the Name Changed After Vatican II
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you have only ever known this feast in late November, that is because it moved. In 1969, Pope
            Paul VI issued a motu proprio called Mysterii Paschalis that revised the General Roman Calendar
            after the Second Vatican Council.
          </p>
          <p>
            That revision renamed the day the Solemnity of Our Lord Jesus Christ, King of the Universe, and
            moved it to the very last Sunday of{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">the church year</ArticleLink>, the
            Sunday right before Advent starts. Vatican News explains the reasoning plainly. The move was meant
            to sharpen the feast&apos;s pointing toward the end of time, when Christ returns in glory, rather
            than leaving it tucked into an earlier, more ordinary stretch of the calendar.
          </p>
          <p>
            ⚠️ <strong>So there are really two versions of this feast on the calendar today.</strong> Catholics
            who worship according to the older Latin Mass still keep it on the last Sunday of October, the
            original date. Everyone following the ordinary calendar keeps it at the very end of the church
            year instead.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Kind of King the Bible Actually Describes
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            None of this history would matter if Scripture did not already call Jesus a king, centuries before
            any feast existed. The clearest moment comes at His own trial.
          </p>
        </div>
        <VerseQuote
          text="Jesus answered, My kingdom is not of this world: if my kingdom were of this world, then would my servants fight, that I should not be delivered to the Jews: but now is my kingdom not from hence."
          reference="John 18:36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pilate wanted to know if Jesus was a political threat to Rome. Jesus answers by redefining the
            whole category. His kingship does not run on armies or borders. It runs on truth, and on a
            different kind of authority altogether.
          </p>
          <p>
            📌 <strong>That answer is the whole point of the feast Pius XI created.</strong> He was not asking
            governments to hand the church political power. He was asking every Christian to stop treating
            Christ&apos;s rule as a private, spiritual add on, separate from the rest of life.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. How Protestant Churches Keep a Version of the Same Sunday
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Catholicism did not keep this Sunday to itself. Many Protestant denominations that follow a shared
            calendar of readings, known as the Revised Common Lectionary, mark the same last Sunday of the
            church year, usually under a different name.
          </p>
          <p>
            The Episcopal Church&apos;s own glossary lists it as Christ the King Sunday, falling on the final
            Sunday after Pentecost, and notes that the observance traces back to the Catholic feast even
            though it is not formally fixed in the Episcopal calendar. Lutheran, Methodist, and Moravian
            churches keep a version of the same Sunday as well, sometimes calling it Reign of Christ Sunday
            instead, with the Moravian Church using that title to mark the close of its own Pentecost season.
          </p>
          <p>
            ✅ <strong>Not every Protestant church observes it, and that is worth saying plainly.</strong> Many
            evangelical and Baptist congregations do not follow a fixed liturgical calendar at all, so this
            Sunday simply does not appear on their schedule. Where a church does keep it, Catholic and
            Protestant and Orthodox alike are pointing at the same claim: Christ reigns now, not only someday.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">✅ Practical Tips for Keeping This Sunday Well</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is how to actually let this feast shape you, whether or not your own church marks it by name.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read John 18:33 to 37 for yourself.</strong> Most of what people assume about this feast
            comes secondhand. The actual exchange between Jesus and Pilate is short and worth five minutes.
          </li>
          <li>
            <strong>Ask what actually governs your week.</strong> Money, approval, fear, and comfort all make
            quiet claims on you every day. Name the one that is winning right now.
          </li>
          <li>
            <strong>Use the Sunday as a hinge, not an ending.</strong> It closes one church year and opens
            straight into the hope of Advent. Let your own reflection do the same.
          </li>
          <li>
            <strong>Learn one real historical fact instead of a guess.</strong> Now you know this feast is
            under a hundred years old, created for a specific, troubled moment. Share that instead of a vague
            impression.
          </li>
          <li>
            <strong>If your church does not mark it, mark it quietly yourself.</strong> Read Colossians 1 or
            Revelation 19 on the last Sunday before Advent and let the title sit with you.
          </li>
          <li>
            <strong>Hold the word king honestly.</strong> Every earthly version of that word has let people
            down at some point. Let that disappointment sharpen what Jesus meant instead of flattening it.
          </li>
          <li>
            <strong>Talk about it across church lines.</strong> If you have Catholic and Protestant friends,
            ask each other what this Sunday means in your own tradition. The answers overlap more than you
            would guess.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Bible Verses on the Kingship of Christ
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These five verses carry the whole claim this feast is built on, from Daniel&apos;s prophecy to the final word on a Roman cross.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Daniel 7:13 to 14</h3>
        <VerseQuote
          text="I saw in the night visions, and, behold, one like the Son of man came with the clouds of heaven, and came to the Ancient of days, and they brought him near before him. And there was given him dominion, and glory, and a kingdom, that all people, nations, and languages, should serve him: his dominion is an everlasting dominion, which shall not pass away, and his kingdom that which shall not be destroyed."
          reference="Daniel 7:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Written centuries before Jesus was born, this vision names a dominion that never ends. The New
            Testament writers go back to this exact passage again and again when they explain who Jesus is.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Colossians 1:16 to 17</h3>
        <VerseQuote
          text="For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him: And he is before all things, and by him all things consist."
          reference="Colossians 1:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is not calling Jesus a king among other kings. He is saying every throne that has ever
            existed, including the ones that frightened Pius XI in 1925, only exists because Christ made it
            exist in the first place.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Philippians 2:9 to 11</h3>
        <VerseQuote
          text="Wherefore God also hath highly exalted him, and given him a name which is above every name: That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth; And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
          reference="Philippians 2:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This comes right after Paul describes Jesus emptying Himself and dying a criminal&apos;s death.
            The exaltation is not a reward tacked on afterward. It is the direct result of that same
            humility.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 25:31 to 32</h3>
        <VerseQuote
          text="When the Son of man shall come in his glory, and all the holy angels with him, then shall he sit upon the throne of his glory: And before him shall be gathered all nations: and he shall separate them one from another, as a shepherd divideth his sheep from the goats:"
          reference="Matthew 25:31 and 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is why the feast sits at the very end of the church year on the modern calendar. The scene is
            a king on a throne, judging every nation, which is exactly the eschatological note Pope Paul VI
            wanted this Sunday to carry.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Revelation 19:16</h3>
        <VerseQuote
          text="And he hath on his vesture and on his thigh a name written, KING OF KINGS, AND LORD OF LORDS."
          reference="Revelation 19:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The same title Pilate mocked by nailing it over a dying man&apos;s head in{" "}
            <ArticleLink href="/blog/what-is-christmas">
              the Gospel accounts of His birth and death
            </ArticleLink>{" "}
            shows up here in full, final glory. The cross was not the end of the claim. It was the proof of
            it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Feast of Christ the King
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Feast of Christ the King?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a Catholic feast, now officially called the Solemnity of Our Lord Jesus Christ, King of the
          Universe, that celebrates Jesus Christ as king over every person, nation, and power. Pope Pius XI
          instituted it in 1925 to remind believers that Christ&apos;s authority is not limited to private,
          spiritual matters.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When is the Feast of Christ the King?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          On the ordinary Catholic calendar used since 1969, it falls on the last Sunday before Advent begins,
          which closes out the entire church year. Catholics who use the older Latin Mass calendar still keep
          it on its original date, the last Sunday of October.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who created the Feast of Christ the King, and why?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pope Pius XI created it through the encyclical Quas Primas in 1925. He was responding to the
          upheaval following World War One, including the fall of several major monarchies and the spread of
          ideologies competing for people&apos;s total loyalty, and he wanted an annual feast to reassert
          Christ&apos;s kingship over every area of life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the date of the feast change?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pope Paul VI moved it in 1969 as part of the liturgical reforms following the Second Vatican
          Council. Moving it to the very last Sunday of the church year sharpened its focus on Christ&apos;s
          final, coming reign, rather than placing it earlier in an ordinary stretch of the calendar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants celebrate Christ the King Sunday?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some do. Churches that follow the Revised Common Lectionary, including many Anglican, Lutheran,
          Methodist, and Moravian congregations, mark the same final Sunday, sometimes under the name Reign of
          Christ Sunday instead. Many evangelical and Baptist churches do not follow a fixed liturgical
          calendar at all, so the day does not appear on their schedule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Feast of Christ the King in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The specific feast day is not. It is a modern addition to the church calendar, created in 1925. The
          claim behind it, that Jesus reigns as king over creation, runs through both the Old and New
          Testaments, from Daniel&apos;s vision of the Son of man to Revelation&apos;s King of Kings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What Bible readings go with the Feast of Christ the King?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Catholic lectionary readings for the day commonly include Christ before Pilate in John 18, the
          final judgment scene in Matthew 25, and passages from Colossians and Revelation describing
          Christ&apos;s cosmic rule. The exact readings rotate with the church&apos;s three year lectionary
          cycle.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the liturgical color for Christ the King Sunday?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          White, the color used for feasts celebrating Christ&apos;s glory, is standard for this solemnity. It
          also sets up the shift into the purple of the season that follows it, when Advent begins the very
          next Sunday.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Christ the King Sunday come right before Advent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The church year is built as a full cycle. It closes by pointing toward Christ&apos;s final coming
          as reigning king, then immediately starts over by remembering His first coming as a baby in
          Bethlehem. One Sunday ends the story at its climax. The next begins it again at its quietest
          moment.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A hundred years is not long, as church history goes. The Feast of Christ the King is one of the
            newest days on the Christian calendar, born out of a specific, frightened moment in 1925, and it
            still moved houses once more in 1969 to say something even clearer.
          </p>
          <p>
            📌 <strong>But the claim underneath the feast is as old as Daniel&apos;s vision and as final as
            Revelation&apos;s last page.</strong> Jesus stood in front of Pilate and called Himself a king of
            a kingdom that armies cannot touch, and the New Testament never backs away from that claim again.
          </p>
          <p>
            Whether your own church marks this Sunday by name or not, the question it asks is not optional.
            Something already governs your attention, your fear, and your hope. This feast simply names the
            one thing that actually deserves to.
          </p>
          <p>
            The church year is about to turn over again, straight into the waiting of Advent. Before it does,
            this Sunday asks you to settle, at least for one week, who is actually on the throne of your own
            life.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="29 October 2026"
        sources={[
          {
            title: "Quas Primas",
            publisher: "Pope Pius XI, Vatican.va",
            year: "1925",
            url: "https://www.vatican.va/content/pius-xi/en/encyclicals/documents/hf_p-xi_enc_11121925_quas-primas.html",
            note: "The primary source for why Pius XI created the feast, the 'majority of men' quote, the original last Sunday of October date, and his reasoning for placing it before All Saints' Day.",
          },
          {
            title: "Our Lord Jesus Christ, King of the Universe",
            publisher: "Vatican News",
            url: "https://www.vaticannews.va/en/liturgical-holidays/our-lord-jesus-christ--king-of-the-universe.html",
            note: "The source for the 1969 move to the end of the liturgical year and the stated reasoning about the feast's eschatological focus.",
          },
          {
            title: "Why Pope Pius XI established the feast of Christ the King in a turbulent 1925",
            publisher: "EWTN News",
            url: "https://www.ewtnnews.com/world/europe/why-pope-pius-xi-established-the-feast-of-christ-the-king-in-a-turbulent-1925",
            note: "The source for the World War One context that followed, the 1870 Sanna Solaro request, Marthe de Noaillat's role, and the first Cincinnati parish in 1926.",
          },
          {
            title: "Christ the King Sunday",
            publisher: "The Episcopal Church, An Episcopal Dictionary of the Church",
            url: "https://www.episcopalchurch.org/glossary/christ-the-king-sunday/",
            note: "The source for how the Episcopal Church describes and dates its own observance of the day.",
          },
          {
            title: "Feast of Christ the King",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Feast_of_Christ_the_King",
            note: "The source for which denominations keep a version of the day and the alternate names they use, including the Moravian Church's Reign of Christ Sunday.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
