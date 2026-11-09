import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-the-octave-of-christmas", {
  title: "What Is the Octave of Christmas? The Eight Days Explained",
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

export default function WhatIsTheOctaveOfChristmasPage() {
  return (
    <BlogPostShell
      slug="what-is-the-octave-of-christmas"
      title={<>📖 What Is the Octave of Christmas? The Eight Days Explained</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              December 25 gets every bit of the attention. Then the wrapping paper hits the trash
              and most people act like Christmas is already finished.
            </p>
            <p>The church never agreed to that.</p>
            <p>
              📌 <strong>Here is the plain answer. The Octave of Christmas is an eight day stretch,
              December 25 through January 1, where the church keeps every single day with the full
              weight of Christmas itself, not as a memory of it. Each day inside that week carries
              its own name, and four of them belong to people other than the baby in the
              manger.</strong>
            </p>
            <p>
              A deacon stoned to death. An apostle who the early church believed outlived every
              other betrayal. Toddlers killed by a frightened king. A title for Mary the church took
              centuries to settle on. All eight days sit inside one single feast, not eight separate
              ones.
            </p>
            <p>
              This guide walks through where the whole idea of an octave actually came from, why
              only two feasts in the entire Catholic year still keep one, what happens on each of
              the eight days, and what the Bible itself says about the number the octave is built
              on.
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
            It would be easy to treat this as liturgical trivia. Eight days, a fancy Latin word,
            nothing a normal Christian life actually touches.
          </p>
          <VerseQuote
            text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
            reference="Galatians 4:4 and 5"
          />
          <p>
            ⚠️ <strong>But the fulness of time Paul writes about there did not stop at the
            manger.</strong> It kept running for eight more days, until a real baby had been placed
            under the actual law his own people lived by, and had received the actual name an angel
            had already chosen for him before he was ever conceived.
          </p>
          <p>
            💡 The octave is the church refusing to let Christmas become a single photograph. It
            insists the Word stayed flesh for the whole week, obeyed the law of the people he was
            born into, and only then received the name every knee will one day bow to.
          </p>
          <p>
            That is not trivia. That is the Incarnation taking its time, on purpose, in front of
            witnesses who wrote it down.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Where the Octave of Christmas Actually Comes From
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. What the Word Octave Actually Means
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Octave comes from the Latin octava, simply the eighth.</p>
          <p>
            📌 <strong>Wikipedia&apos;s account of the practice explains that the word does two jobs
            at once.</strong> It names the whole eight day period that follows a major feast, and it
            names the eighth day itself, counted inclusively so it always falls on the same weekday
            as the feast that started it.
          </p>
          <p>
            For Christmas, that means December 25 is day one of the octave, not day zero, and
            January 1 is day eight, officially called the Octave Day. Everything in between keeps
            the feast going rather than simply remembering it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Where the Custom of Keeping an Octave Began
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The surprising part is that octaves did not start as holy days at all.</p>
          <p>
            📌 <strong>Wikipedia&apos;s history of the practice traces the earliest Christian octaves
            to the fourth century, under Constantine, when newly built basilicas in Jerusalem and
            Tyre were dedicated with eight straight days of celebration.</strong> Easter and
            Pentecost picked up their own octaves that same century, and in the Eastern church so did
            Epiphany.
          </p>
          <p>
            Christmas came later. The same account says Rome was keeping an octave for the Nativity
            by the eighth century, borrowing a pattern that had already proven itself on buildings
            before it was ever attached to the birth of Christ.
          </p>
          <p>
            💡 A custom built to dedicate a building ended up shaping how the whole church still
            marks the most important week of its year.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Why Only Two Feasts Still Get One
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            By the middle of the last century, the Roman calendar had collected a long list of
            octaves. One pope after another had added more, until nearly every major feast carried
            its own eight day tail.
          </p>
          <p>
            📌 <strong>Wikipedia&apos;s account records Pope Pius V trimming that list in 1568, and
            Pope Pius XII going much further in 1955, keeping only the octaves of Christmas, Easter,
            and Pentecost.</strong> His reasoning was specific. Those three were the only octaves
            where each day still had its own separate Mass readings, rather than simply repeating the
            feast day&apos;s liturgy all week.
          </p>
          <p>
            Fourteen years later, the 1969 reform under Pope Paul VI removed the Octave of Pentecost
            too, leaving exactly two solemnities in the entire Catholic year that still carry a full
            eight day octave.
          </p>
          <p>
            ⚠️ <strong>Of everything the church has ever celebrated for eight straight days, only the
            birth and the resurrection of Christ still get that treatment now.</strong> Nothing else
            in the calendar is considered worth a whole week of being treated as though it just
            happened.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Eight Days, One by One
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is what actually fills the week, day by day.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>
            🟢 <strong>December 25, day one.</strong> The Nativity of the Lord itself.
          </li>
          <li>
            🟢 <strong>December 26, day two.</strong>{" "}
            <ArticleLink href="/blog/who-was-saint-stephen">
              Saint Stephen
            </ArticleLink>
            , the first Christian deacon stoned to death for his faith.
          </li>
          <li>
            🟢 <strong>December 27, day three.</strong> Saint John, the apostle and evangelist.
            Wikipedia&apos;s account of his life says church tradition holds he died of natural
            causes at Ephesus, the only one of the twelve not counted among the martyrs.
          </li>
          <li>
            🟢 <strong>December 28, day four.</strong>{" "}
            <ArticleLink href="/blog/what-is-the-feast-of-the-holy-innocents">
              The Holy Innocents
            </ArticleLink>
            , the children a frightened king had killed in Bethlehem.
          </li>
          <li>
            🟢 <strong>The Sunday inside the octave, or December 30 in years with no Sunday to
            spare.</strong> The Feast of the Holy Family.
          </li>
          <li>
            🟢 <strong>December 29 and 31, days five and seven.</strong> Catholic Culture&apos;s
            own liturgical calendar lists both as octave days with their own Mass readings, carrying
            optional memorials underneath them: Saint Thomas Becket, the Archbishop of Canterbury
            murdered in his own cathedral in 1170, and Saint Sylvester the First, pope for over
            twenty years until his death in 335.
          </li>
          <li>
            🟢 <strong>January 1, day eight.</strong> The Octave Day itself, the Solemnity of Mary,
            Mother of God.
          </li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what that list actually is.</strong> A martyr, an apostle, murdered
            children, a murdered archbishop, a pope, and a title for Mary, all sharing one single
            feast with the newborn Christ. The octave was never a week of quiet repetition. The
            wider twelve days of Christmas carries it inside the first eight days, then keeps
            going four days further.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why the Eighth Day Became Mary, Mother of God
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>January 1 has not always meant the same thing, even inside the same church.</p>
          <p>
            📌 <strong>Wikipedia&apos;s account of the Feast of the Circumcision of Christ says Rome
            first kept January 1 as a feast honoring Mary as the Mother of God, then shifted to
            marking it mainly as the octave day of Christmas once the Annunciation and the
            Assumption grew into their own major feasts in the seventh century.</strong> By the
            thirteenth or fourteenth century, Rome was observing the day as the Circumcision of the
            Lord and the Octave of the Nativity together.
          </p>
          <VerseQuote
            text="And when eight days were accomplished for the circumcising of the child, his name was called JESUS, which was so named of the angel before he was conceived in the womb."
            reference="Luke 2:21"
          />
          <p>
            That verse is the entire reason the day ever carried the name Circumcision at all. The
            law itself is even older than the Gospel account of it.
          </p>
          <VerseQuote
            text="And in the eighth day the flesh of his foreskin shall be circumcised."
            reference="Leviticus 12:3"
          />
          <p>
            💡 Jesus was not exempt from that command. He was placed directly under it, on the exact
            day the octave still marks.
          </p>
          <p>
            📌 <strong>The changes since then are well documented.</strong> Wikipedia&apos;s account
            of the Feast of the Circumcision says Pope John the Twenty Third&apos;s 1960 calendar
            dropped the circumcision wording and simply called the day the Octave of the Nativity,
            and Pope Paul the Sixth&apos;s 1969 reform then made it the Solemnity of Mary, the Holy
            Mother of God, while keeping the giving of Jesus&apos; name as a second commemoration on
            the same day. The USCCB&apos;s own page for January 1 still carries both titles today:
            the Octave Day of Christmas, and the Solemnity of Mary, the Holy Mother of God.
          </p>
          <p>
            ⚠️ Eastern Orthodox churches, every Lutheran church, and some Anglican churches never made
            that same switch. Wikipedia&apos;s account notes they still keep January 1 as the
            Circumcision, or the Circumcision and the Holy Name, exactly as Rome itself once did.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. What the Number Eight Is Actually Pointing To
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>None of this is arbitrary scheduling. The number eight carries its own weight.</p>
          <p>
            📌 <strong>Wikipedia&apos;s account of the octave explains that the early church linked
            the eighth day to the weekly celebration of Christ&apos;s resurrection, which is why
            Sunday itself came to be called the eighth day in Christian writing.</strong> Because
            Jewish circumcision happened on the eighth day after birth, that same number also became
            tied to baptism, and the account notes that early baptismal fonts were often built with
            eight sides on purpose.
          </p>
          <p>
            One more eighth day sits quietly beside the Christmas one. John the Baptist&apos;s own
            circumcision and naming happened the exact same way.
          </p>
          <VerseQuote
            text="And it came to pass, that on the eighth day they came to circumcise the child; and they called him Zacharias, after the name of his father. And his mother answered and said, Not so; but he shall be called John."
            reference="Luke 1:59 and 60"
          />
          <p>
            💡 Two babies, six months apart, both brought under the same law on the same eighth day,
            both given a name that had already been chosen before they were born. Scripture repeats
            that pattern on purpose.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Keeping the Octave Yourself
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a parish calendar to let these eight days actually shape your own week.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Keep opening gifts, within reason, past December 25.</strong> The church never
            treated Christmas as a single day. Letting the joy run longer than one morning matches
            what the calendar has always said.
          </li>
          <li>
            <strong>Read one short passage a day for all eight days.</strong> Luke 2, Acts 6 and 7
            for Stephen, Matthew 2 for the Holy Innocents, Luke 1 for John the Baptist&apos;s own
            eighth day. Ten minutes a day keeps the story moving instead of freezing it at the
            manger.
          </li>
          <li>
            <strong>Say the name of Jesus out loud on January 1.</strong> That is the day the church
            has always tied to his name being given. Philippians 4 calls that name the one every
            knee will bow to.
          </li>
          <li>
            <strong>Do not rush to take the decorations down on December 26.</strong> If the church
            keeps celebrating for eight more days, your own tree can survive a few more too.
          </li>
          <li>
            <strong>Remember someone who suffered for their faith.</strong> Stephen&apos;s feast sits
            two days after Christmas on purpose. Joy and cost live closer together than most years
            let you notice.
          </li>
          <li>
            <strong>Pray for peace on January 1.</strong> The day is also the World Day of Peace, a
            fitting close to a week that began with angels announcing peace on earth.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses Behind the Octave of Christmas
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These five passages carry the whole eight day week, from the manger to the name.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 2:21</h3>
        <VerseQuote
          text="And when eight days were accomplished for the circumcising of the child, his name was called JESUS, which was so named of the angel before he was conceived in the womb."
          reference="Luke 2:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This is the single verse the entire Octave Day grew out of. The name Jesus was not decided
          on the eighth day. It was simply spoken out loud on it, after being settled before his own
          conception.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 12:3</h3>
        <VerseQuote
          text="And in the eighth day the flesh of his foreskin shall be circumcised."
          reference="Leviticus 12:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Moses wrote this centuries before a single Gospel existed. Jesus kept a command his own
          ancestors had been obeying since Abraham, rather than standing outside the law he came to
          fulfill.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 1:59 and 60</h3>
        <VerseQuote
          text="And it came to pass, that on the eighth day they came to circumcise the child; and they called him Zacharias, after the name of his father. And his mother answered and said, Not so; but he shall be called John."
          reference="Luke 1:59 and 60"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Six months before Jesus reached his own eighth day, his cousin reached the identical one.
          Luke places both naming days on purpose, so a reader cannot miss the pattern.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Galatians 4:4 and 5</h3>
        <VerseQuote
          text="But when the fulness of the time was come, God sent forth his Son, made of a woman, made under the law, To redeem them that were under the law, that we might receive the adoption of sons."
          reference="Galatians 4:4 and 5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul is describing the exact week the octave still keeps. God&apos;s Son came as a real
          baby, under a real law, so that people under that same law could actually be adopted out
          from under it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Philippians 2:9 to 11</h3>
        <VerseQuote
          text="Wherefore God also hath highly exalted him, and given him a name which is above every name: That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth; And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
          reference="Philippians 2:9 to 11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The name quietly given on the eighth day in Luke 2:21 is the exact name every knee will
          one day bow to here. The octave closes on the day that name was first spoken, not the day
          its full weight became clear.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Octave of Christmas
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Octave of Christmas?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the eight day period from December 25 through January 1, during which the Catholic
          Church keeps treating each day with the same solemnity as Christmas itself, rather than
          as a memory of it. Christmas and Easter are the only two feasts in the current Roman
          calendar that still carry a full octave.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is it called an octave?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Octave comes from the Latin word for eighth. The term names both the whole eight day
          stretch and the eighth day itself, counted inclusively so it lands on the same weekday as
          the feast that started it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What happens on each day of the Christmas octave?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          December 25 is the Nativity itself, December 26 remembers Saint Stephen, December 27
          remembers Saint John the Apostle, December 28 remembers the Holy Innocents, the Sunday
          inside the week is the Feast of the Holy Family, December 29 and 31 carry optional
          memorials of Saint Thomas Becket and Saint Sylvester the First, and January 1, the Octave
          Day, is the Solemnity of Mary, Mother of God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do Christmas and Easter still have an octave when other feasts do not?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pope Pius XII&apos;s 1955 reform kept only these two, plus Pentecost, because their octave
          days each carried their own separate Mass readings rather than simply repeating the feast
          day all week. The 1969 reform under Pope Paul VI then removed Pentecost&apos;s octave too,
          leaving only Christmas and Easter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is January 1 the Feast of the Circumcision or the Solemnity of Mary?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In the current Roman calendar, it is the Solemnity of Mary, Mother of God, a change made
          in the 1969 reform. Before that, the day had been called the Circumcision of the Lord for
          several centuries, and some Lutheran, Anglican, and Eastern Orthodox churches still keep
          it under that older name today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Octave of Christmas the same as the twelve days of Christmas?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, though they overlap. The octave is the first eight of those twelve days, running
          through January 1.{" "}
          <ArticleLink href="/blog/meaning-of-the-twelve-days-of-christmas">
            The full twelve days
          </ArticleLink>{" "}
          continue four days further, ending the night before{" "}
          <ArticleLink href="/blog/what-is-epiphany">Epiphany</ArticleLink> on January 6.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants observe the Octave of Christmas?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many Protestant traditions do not follow a fixed saints and feast day calendar the way
          Catholic and Anglican churches do, so the octave as a formal structure is mostly a
          Catholic, Anglican, Orthodox, and Lutheran observance. Any Christian can still read
          through the eight days&apos; passages on their own, whether or not their church marks the
          octave itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does Saint Stephen&apos;s feast come right after Christmas?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It places the cost of following Christ immediately beside the joy of his birth. The
          church put a martyr&apos;s feast on day two of the octave on purpose, so the manger and
          the price of discipleship never sit far apart on the calendar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does the Bible actually mention an eight day celebration?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not for Christmas specifically. What Scripture does give is the eighth day itself, the
          day Jewish law set for circumcision and the day Jesus was formally named in Luke 2:21. The
          church built the octave&apos;s length around that same eighth day, not around an
          instruction to celebrate for a week.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the Octave Day of Christmas?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Octave Day is January 1 specifically, the eighth and final day of the octave, kept
          today as the Solemnity of Mary, Mother of God.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the Latin word, and three things remain true about this eight day week.</p>
          <p>
            📌 <strong>Christmas was never meant to be one single day.</strong> The church has kept
            every day between December 25 and January 1 as Christmas itself since at least the
            eighth century, and it is one of only two feasts left in the whole year still treated
            that way.
          </p>
          <p>
            📌 <strong>The eighth day is where Jesus actually received his name.</strong> Not at his
            birth. Eight days later, under the same law his cousin John was placed under six months
            earlier, exactly as Leviticus had commanded for every Jewish son before him.
          </p>
          <p>
            📌 <strong>The week closes on Mary, not by accident.</strong> The same eighth day that
            once marked a circumcision now marks her title as Mother of God, a change the church
            took centuries to settle and still keeps today.
          </p>
          <p>
            Whatever your own tree looks like by December 26, the church is not finished
            celebrating. Eight days, one baby, one name, and a week too important to end after a
            single morning.
          </p>
          <p>❓ Which of these eight days had you never actually heard of before today?</p>
          <p>📌 <strong>Start there. That is the one worth reading about next.</strong></p>
        </div>
      </section>

      <ArticleSources
        checkedOn="9 November 2026"
        sources={[
          {
            title: "Octave (liturgy)",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Octave_(liturgy)",
            note: "The source for the origin of Christian octaves under Constantine's basilica dedications, the 1568, 1955, and 1969 reductions, and the eighth day's link to Sunday as the day of resurrection and to the octagonal shape of early baptismal fonts.",
          },
          {
            title: "Feast of the Circumcision of Christ",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Feast_of_the_Circumcision_of_Christ",
            note: "The source for the biblical basis in Luke 2:21, the day's shift from a Marian feast to the Octave of the Nativity in the seventh century, Pope John XXIII's 1960 calendar change, Pope Paul VI's 1969 reform, and which churches still keep the Circumcision today.",
          },
          {
            title: "John the Apostle",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/John_the_Apostle",
            note: "The source for the church tradition that John died of natural causes at Ephesus rather than as a martyr, the only one of the twelve apostles not counted among the martyrs.",
          },
          {
            title: "Solemnity of Mary, Mother of God",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Solemnity_of_Mary,_Mother_of_God",
            note: "The source for the 1969 renaming of January 1 under Pope Paul VI and the feast's current emphasis on Mary's motherhood alongside the Holy Name of Jesus.",
          },
          {
            title: "January 1: The Octave Day of Christmas and Solemnity of Mary, Mother of God",
            publisher: "United States Conference of Catholic Bishops",
            url: "https://www.usccb.org/prayer-and-worship/liturgical-year/christmas/christmas-january-1",
            note: "The source for the two titles the Catholic Church currently gives January 1, and the day's standing as the World Day of Peace.",
          },
          {
            title: "Christmas: December 29th",
            publisher: "Catholic Culture",
            url: "https://www.catholicculture.org/culture/liturgicalyear/calendar/day.cfm?date=2025-12-29",
            note: "The source for December 29 being the fifth day within the Christmas octave and carrying the optional memorial of Saint Thomas Becket, including his 1162 appointment as Archbishop of Canterbury and his 1170 death.",
          },
          {
            title: "Christmas: December 31st",
            publisher: "Catholic Culture",
            url: "https://www.catholicculture.org/culture/liturgicalyear/calendar/day.cfm?date=2025-12-31",
            note: "The source for December 31 being the seventh day within the Christmas octave and carrying the optional memorial of Saint Sylvester I, who died in 335.",
          },
          {
            title: "Pope Sylvester I",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Pope_Sylvester_I",
            note: "The source for Sylvester I's papacy running from 314 to 335, a little over twenty years.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
