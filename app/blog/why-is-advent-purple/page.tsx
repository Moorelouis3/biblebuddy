import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("why-is-advent-purple", {
  title: "Why Is Advent Purple? The Meaning of the Liturgical Colors",
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

export default function WhyIsAdventPurplePage() {
  return (
    <BlogPostShell
      slug="why-is-advent-purple"
      title={<>📖 Why Is Advent Purple? The Meaning of the Liturgical Colors</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              You walk into church on the first Sunday of Advent and the whole room has changed
              color overnight.
            </p>
            <p>
              The priest or pastor is in purple. The banners are purple. Maybe even the candles on
              the wreath are purple, except for one.
            </p>
            <p>Nobody hands you a program explaining why.</p>
            <p>
              📌 <strong>Here is the plain answer. Purple is the color the Western church uses for
              Advent because it already meant two things long before Advent existed. It was the
              color of a king, because the dye cost more than almost anything else people wore.
              And it became the color of penance and preparation, borrowed from Lent, once the
              church started treating the weeks before Christmas as a season of getting ready
              rather than a season already celebrating.</strong>
            </p>
            <p>
              That short answer hides a better story. Purple sat on the backs of kings, on a dye
              that cost more than gold, and on the shoulders of Jesus Himself the night Roman
              soldiers mocked Him as a king He actually was. This guide walks through where the
              color came from, why some churches use blue instead, and what it has to do with you
              sitting in a pew this December.
            </p>
            <p>Every historical claim below links back to a named source, so you can check it yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It would be easy to file this under trivia. A color is a color.</p>
          <p>
            ⚠️ <strong>But the church did not pick colors by accident, and this one carries real
            weight.</strong> Purple is not decoration. It is a visual sermon, preached at you every
            single Sunday of Advent before a single word is spoken.
          </p>
          <p>
            The sermon is this. You are not just counting down days until a party. You are waiting
            on a King, the same way Israel waited centuries for a King who would actually come.
          </p>
          <p>
            That same color is what Roman soldiers forced onto Jesus to mock Him as exactly that, a
            King, hours before the cross.
          </p>
          <p>
            💡 <strong>Advent asks you to sit in that tension on purpose.</strong> The King is
            coming. The King was also mocked. Purple carries both truths at once.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Purple Actually Means, and Where It Came From
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Purple Was the Color of Kings Long Before the Church Touched It
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Purple did not start out holy. It started out expensive.
          </p>
          <p>
            In the ancient world, true purple dye came from a sea snail found along the eastern
            Mediterranean coast, in a process so labor heavy that the University of York, reporting
            on a 2026 find of purple dyed cloth in a Roman burial, states the dye was a commodity
            valued at up to three times the price of gold during the Roman period.
          </p>
          <p>
            📌 <strong>That is not a color anyone wore by accident.</strong> Only the wealthiest
            people on earth could afford it, which is exactly why the Bible ties purple to kings
            and to wealth so often, starting with the tabernacle itself.
          </p>
          <VerseQuote
            text="Moreover thou shalt make the tabernacle with ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work shalt thou make them."
            reference="Exodus 26:1"
          />
          <p>
            Later, after Gideon defeated the kings of Midian, Scripture notes exactly what he took
            from them as spoil.
          </p>
          <VerseQuote
            text="And the weight of the golden earrings that he requested was a thousand and seven hundred shekels of gold; beside ornaments, and collars, and purple raiment that was on the kings of Midian, and beside the chains that were about their camels' necks."
            reference="Judges 8:26"
          />
          <p>
            Purple raiment on the kings of Midian. Not a detail Scripture needed to mention, unless
            everyone already knew what that color on a king meant.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Purple Is Also the Color They Mocked Jesus With
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is where the color turns. The same association with royalty is exactly why Roman
            soldiers chose purple the night they beat Jesus before the cross.
          </p>
          <VerseQuote
            text="And they clothed him with purple, and platted a crown of thorns, and put it about his head,"
            reference="Mark 15:17"
          />
          <p>
            They were not dressing Him for warmth. They were dressing Him as a king, on purpose, as
            a cruel joke. Mark records what happened once the mockery was finished.
          </p>
          <VerseQuote
            text="And when they had mocked him, they took off the purple from him, and put his own clothes on him, and led him out to crucify him."
            reference="Mark 15:20"
          />
          <p>
            📌 <strong>That is the part most Advent wreaths never mention.</strong> The color on
            the altar in December is the same color laid across the back of a man the world
            thought was lying about being a King.
          </p>
          <p>
            Advent asks you to believe the soldiers were more right than they meant to be. The man
            in the purple robe really was the King, exactly as{" "}
            <ArticleLink href="/blog/what-is-the-feast-of-christ-the-king">the Feast of Christ the King</ArticleLink>{" "}
            declares outright at the very end of the church year, right before Advent turns around
            and starts the waiting over again.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. How the Church Actually Settled on This Color
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The church did not always use purple, and it did not use it everywhere at once. The
            Liturgical Arts Journal traces an organized sequence of colors as far back as a ninth
            century document called the Ordo of St. Amand, with a twelfth century crusader church
            in Jerusalem later recording its own color list.
          </p>
          <p>
            The figure most tied to fixing the system for Rome is Pope Innocent III, who died in
            1216. The same source reports that in his work on the Mass, Innocent III specified
            white, red, green, and black as the main colors, with violet used only to a lesser
            extent.
          </p>
          <p>
            💡 <strong>Violet was not even the main penitential color at first. Black was.</strong>{" "}
            Violet only grew into common use for penitential seasons across the thirteenth and
            fourteenth centuries, slowly replacing black across the Roman rite. Rose joined the set
            in that same window, authorized for Gaudete Sunday in Advent and Laetare Sunday in
            Lent, the two Sundays that break the purple on purpose.
          </p>
          <p>
            So the purple you see every December is not an unbroken custom reaching back to the
            apostles. It is a color that slowly won an argument against black over roughly two
            centuries.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Why the Church Still Calls It Violet, and Why Advent Borrowed Lent&apos;s Color
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Open the current Catholic rulebook and you will not even see the word purple. The
            USCCB&apos;s own guide to the liturgical colors lists violet for Advent, for Lent, and
            for Masses for the Dead, with rose permitted on the Third Sunday of Advent and the
            Fourth Sunday of Lent.
          </p>
          <p>
            Violet is the formal name. Purple is what most people call the same color in everyday
            speech, and the rubrics never specify an exact shade, which is why you will see
            everything from a deep red violet to a cooler blue violet across different parishes.
          </p>
          <p>
            ⚠️ <strong>Notice something in that USCCB list.</strong> Advent and Lent share the exact
            same color. Advent was not originally built as a penitential season to match Lent, but
            once the church began treating the weeks before Christmas as preparation rather than
            straight celebration, it reached for the color that already meant exactly that.
          </p>
          <p>
            That shared color is part of why{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              the church&apos;s own calendar
            </ArticleLink>{" "}
            groups Advent and Lent together as the two great seasons of getting ready, long before
            either one reaches its feast.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why Some Churches Use Blue Instead, and Why That Claim Needs a Careful Word
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Walk into some Anglican, Episcopal, or Lutheran churches in Advent and you will see
            blue, not purple, on the altar.
          </p>
          <p>
            A popular explanation says this blue, often called Sarum blue, simply restores what the
            medieval English Sarum Rite always used for Advent, before the Reformation ever
            happened. That explanation is repeated often. It is also disputed by the historians who
            have actually looked at the old Sarum books.
          </p>
          <p>
            A detailed review on the liturgy blog Pray Tell argues the exact colors the medieval
            Sarum Rite used are genuinely contested among scholars, and that the blue revival most
            churches practice today traces to nineteenth century interest in pre Reformation
            worship, not an unbroken medieval custom.
          </p>
          <p>
            📌 <strong>Say it the honest way, not the tidy way.</strong> Blue for Advent is a real
            and widespread modern practice. The claim that it comes straight down, unchanged, from
            the Sarum Rite is weaker than the popular version of the story suggests.
          </p>
          <p>
            Whatever its exact origin, the color stuck in Lutheran practice specifically. The
            Evangelical Lutheran Church in America&apos;s own worship blog describes blue as
            associated with Advent, suggesting hope, while noting that some assemblies use purple
            instead, tied to royalty and the king the church is awaiting. Neither answer is wrong
            inside its own tradition.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Rose Breaks the Purple on Purpose, and That Is the Whole Point
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One Sunday a year, the purple stops, just for a day.
          </p>
          <p>
            On{" "}
            <ArticleLink href="/blog/what-is-gaudete-sunday">Gaudete Sunday</ArticleLink>, the third
            Sunday of Advent, the USCCB&apos;s own color list permits rose in place of violet. The
            same{" "}
            <ArticleLink href="/blog/what-is-an-advent-wreath">pink candle on the Advent wreath</ArticleLink>{" "}
            matches the vestments that same morning.
          </p>
          <p>
            💡 <strong>That one bright Sunday only works because every other Sunday is purple.</strong>{" "}
            A single rose candle in a wreath of pink would say nothing. A single rose Sunday inside
            a season of purple says the waiting is more than halfway over, and it is worth
            celebrating that fact out loud for a day before returning to the preparation.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Letting Advent Purple Actually Teach You Something
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need to be Catholic, Anglican, or Lutheran for this color to shape your December.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Let the color slow you down on purpose.</strong> Purple is not there to make
            the sanctuary pretty. It is there to tell you this season is about preparing, not
            rushing straight to the party.
          </li>
          <li>
            <strong>Remember what purple cost before you remember what it means.</strong> A dye once
            worth more than gold became the color the world used to mock a King who was not
            pretending.
          </li>
          <li>
            <strong>Do not treat blue versus purple as a real argument.</strong> Whichever color
            your own church uses, both are honest answers to the same waiting.
          </li>
          <li>
            <strong>Light the rose candle, or wear something lighter, on Gaudete Sunday.</strong>{" "}
            Let yourself feel the relief of one bright Sunday without skipping past the purple
            weeks around it.
          </li>
          <li>
            <strong>Read a purple themed passage each week.</strong> Judges 8:26, Mark 15:17, and
            Acts 16:14 use the same word for very different reasons.
          </li>
          <li>
            <strong>Ask what you are actually preparing for.</strong> Advent purple only teaches you
            anything if you let it ask a real question: are you ready for the King it points
            toward.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses About Purple
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Scripture never explains Advent vestments directly. But the word purple carries
            enough weight on its own to teach you something every time it shows up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Esther 8:15</h3>
        <VerseQuote
          text="And Mordecai went out from the presence of the king in royal apparel of blue and white, and with a great crown of gold, and with a garment of fine linen and purple: and the city of Shushan rejoiced and was glad."
          reference="Esther 8:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Mordecai&apos;s promotion is announced the moment he steps out in purple. The color told
          the whole city everything it needed to know before any decree was read aloud.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Proverbs 31:22</h3>
        <VerseQuote
          text="She maketh herself coverings of tapestry; her clothing is silk and purple."
          reference="Proverbs 31:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The excellent woman of Proverbs 31 is not described as showing off. Purple belongs on a
          list of her being prepared and skilled, a sign of a household in order, not excess.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Mark 15:17</h3>
        <VerseQuote
          text="And they clothed him with purple, and platted a crown of thorns, and put it about his head,"
          reference="Mark 15:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This is the verse Advent purple is always quietly standing next to. The color was not a
          mistake. It was the one color loud enough to say king, even as a cruel joke.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Acts 16:14</h3>
        <VerseQuote
          text="And a certain woman named Lydia, a seller of purple, of the city of Thyatira, which worshipped God, heard us: whose heart the Lord opened, that she attended unto the things which were spoken of Paul."
          reference="Acts 16:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Lydia built her livelihood on this one expensive color, and Scripture names her trade
          before anything else. God then opened the heart of a woman who sold the color of kings,
          so she could finally meet the real one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Revelation 18:12</h3>
        <VerseQuote
          text="The merchandise of gold, and silver, and precious stones, and of pearls, and fine linen, and purple, and silk, and scarlet, and all thyine wood, and all manner vessels of ivory, and all manner vessels of most precious wood, and of brass, and iron, and marble,"
          reference="Revelation 18:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Near the end of the Bible, purple shows up one more time, in a list of everything Babylon
          loved and lost. The same color marking a true King in Advent marks empty luxury here.
          Purple was never magic. It meant whatever it was pointed at.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Advent Purple
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is purple the color of Advent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Purple, formally called violet, marks Advent as a season of preparation and penance, the
          same role it plays during Lent. The color itself carries an older meaning too, tied to
          royalty and expense, which fits a season spent waiting for a King.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is purple the same as violet in church?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. The USCCB&apos;s guidelines use the word violet, while most people in the pew call it
          purple. The rubrics never define one exact shade, so parishes vary from a deep red violet
          to a cooler blue violet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who decided the church would use purple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No single person invented it outright. Pope Innocent III named white, red, green, and
          black as the main Roman colors in the early thirteenth century, with violet used only to
          a lesser extent, then grew into the main penitential color over the next two centuries.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was purple dye so expensive in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          True purple dye came from a sea snail through a difficult, labor heavy process.
          Researchers at the University of York describe the finished dye as a commodity worth up
          to three times the price of gold during the Roman period.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Roman soldiers put a purple robe on Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Mark 15:17 and 20 describe soldiers clothing Jesus in purple and crowning Him with thorns
          as a cruel mockery of His claim to be a King, a color chosen on purpose because everyone
          already knew what it meant.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do all Christian churches use purple for Advent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Many Catholic parishes use violet, while some Anglican, Episcopal, and Lutheran
          congregations use blue instead, often linked to hope rather than penance. Other
          Lutheran assemblies keep purple instead, tied to royalty and the awaited king.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the blue Advent tradition really from the medieval Sarum Rite?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That is the popular explanation, but it is disputed. Historians who have studied the
          medieval Sarum books say the exact colors it used are genuinely contested, and most trace
          the modern blue revival to nineteenth century interest in pre Reformation worship.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is one Advent Sunday rose instead of purple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The third Sunday of Advent, Gaudete Sunday, permits rose vestments as a brief, deliberate
          break from the purple, marking the point where the season&apos;s waiting is more than
          halfway finished.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does purple mean the same thing in Advent and in Lent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Mostly. Both seasons use the color for preparation and self examination. Lent leans
          harder into penance for sin, while Advent leans toward hopeful waiting for a King who is
          already on the way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What color was used for Advent before purple became standard?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Black held the main penitential role in the earlier Roman rite. Violet only grew into
          common use for penitential seasons like Advent and Lent across the thirteenth and
          fourteenth centuries, gradually taking over black&apos;s older place.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the history and three things remain true about the purple you will see this Advent.</p>
          <p>
            📌 <strong>Purple meant king long before it meant church season.</strong> A dye worth
            more than gold became shorthand for royalty, which is exactly why Rome&apos;s soldiers
            reached for it to mock Jesus as a King they did not believe was real.
          </p>
          <p>
            📌 <strong>The church&apos;s use of it is older than you might guess, and younger than
            you might assume.</strong> Pope Innocent III named it in the early thirteenth century.
            It still took two more centuries to fully replace black.
          </p>
          <p>
            📌 <strong>Blue and rose are not rivals to purple. They are honest variations on the
            same waiting.</strong> Whichever color your own church lights this December, all of
            them point at the same King.
          </p>
          <p>
            That King really did come wearing purple once, mocked by men who had no idea they were
            telling the truth. Advent asks you to believe they were right.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="6 November 2026"
        sources={[
          {
            title: "Understanding the Liturgical Colors",
            publisher: "USCCB",
            url: "https://www.usccb.org/prayer-and-worship/liturgical-year-and-calendar/understanding-the-liturgical-colors",
            note: "The source for the current Catholic color assignments: violet for Advent, Lent, and Masses for the Dead, and rose permitted on the Third Sunday of Advent and the Fourth Sunday of Lent.",
          },
          {
            title: "A Brief History of Liturgical Colours",
            publisher: "Liturgical Arts Journal",
            year: "2024",
            url: "https://www.liturgicalartsjournal.com/2024/05/a-brief-history-of-liturgical-colours.html",
            note: "The source for the ninth century Ordo of St. Amand, the twelfth century Jerusalem color sequence, Pope Innocent III's color list in De Sacro Altaris Mysterio, and violet's thirteenth and fourteenth century rise over black as the main penitential color.",
          },
          {
            title: "Rare Purple Cloth",
            publisher: "University of York",
            year: "2026",
            url: "https://www.york.ac.uk/news-and-events/news/2026/research/rare-purple-cloth/",
            note: "The source for Tyrian purple dye being valued at up to three times the price of gold during the Roman period, drawn from the university's analysis of purple dyed cloth found in Roman era burials.",
          },
          {
            title: "Sarum Blue: The Great Untruth",
            publisher: "Pray Tell (J. Barrington Bates)",
            year: "2013",
            url: "https://praytellblog.com/index.php/2013/11/25/sarum-blue-the-great-untruth/",
            note: "The source for the dispute among historians over what colors the medieval Sarum Rite actually used for Advent, and for tracing the modern Sarum blue revival to nineteenth century interest in pre Reformation worship.",
          },
          {
            title: "Liturgygrams: A Summary of Color Usage, According to the Church Year",
            publisher: "ELCA Worship Blog",
            url: "https://blogs.elca.org/worship/tag/liturgygrams/",
            note: "The source for blue being associated with Advent and hope in Evangelical Lutheran Church in America practice, with some congregations instead keeping purple, tied to royalty and the awaited king.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
