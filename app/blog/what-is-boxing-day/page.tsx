import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-boxing-day", {
  title: "What Is Boxing Day? St. Stephen's Day and Its Christian Roots",
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

export default function WhatIsBoxingDayPage() {
  return (
    <BlogPostShell
      slug="what-is-boxing-day"
      title={<>📖 What Is Boxing Day? St. Stephen&apos;s Day and Its Christian Roots</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>December 26 shows up on your calendar with a strange name attached to it.</p>
            <p>
              Boxing Day. No gloves. No ring. Half the world gets the day off and still could not
              tell you why it is called that.
            </p>
            <p>
              📌 <strong>Here is the plain answer. Boxing Day began as a day for giving, not
              fighting. Servants, tradesmen, and the poor received boxes of money or gifts on this
              day, and the custom grew up alongside an older, quieter observance: the feast of
              Saint Stephen, the first Christian ever killed for his faith.</strong>
            </p>
            <p>
              Two different stories share one date. One is about British household custom. The
              other is about a deacon who forgave the men stoning him. This guide walks through
              both, where the name actually comes from, and why some Christians still mark the day
              as a feast while the rest of the world treats it as a shopping holiday.
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
            It would be easy to let December 26 pass as nothing more than leftover turkey and
            doorbuster sales.
          </p>
          <VerseQuote
            text="He that hath pity upon the poor lendeth unto the LORD; and that which he hath given will he pay him again."
            reference="Proverbs 19:17"
          />
          <p>
            ⚠️ <strong>But the oldest layer of this day is about exactly that verse.</strong> Long
            before anyone called it Boxing Day, churches were opening alms boxes and handing the
            contents to the poor on this exact date, right beside remembering a man who gave his
            whole life away in service.
          </p>
          <p>
            💡 <strong>A holiday built around generosity, sitting next to a feast for a martyr who
            died serving widows, is not a coincidence worth skipping past.</strong> It is the
            church putting the manger and the cross closer together than a calendar usually allows.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Where Boxing Day Actually Comes From
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. What Boxing Day Actually Is Today
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Strip away the name for a moment. Boxing Day is simply the day right after Christmas,
            December 26, kept as a public holiday across Britain and much of the Commonwealth.
          </p>
          <p>
            📌 <strong>Wikipedia&apos;s own account of the holiday lists it as a statutory or
            general holiday in Australia, Canada, New Zealand, Hong Kong, Nigeria, Trinidad and
            Tobago, and South Africa, where it was renamed the Day of Goodwill in 1994.</strong> In
            most of Ireland the same date is called Saint Stephen&apos;s Day instead, while Ulster
            tends to call it Boxing Day like the rest of the United Kingdom.
          </p>
          <p>
            The United States never adopted the holiday nationally. One small exception stands out.
            Massachusetts Governor William F. Weld declared December 26 Boxing Day there in 1996,
            though it never became an employee holiday.
          </p>
          <p>
            💡 For most people today the name just means a second day of rest, or the day the sales
            start. The history underneath it is older and, honestly, kinder than that.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Servant Who Had to Work on Christmas Day
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One widely told explanation starts in the kitchens and stables of wealthy British
            households, not in a church.
          </p>
          <p>
            Servants worked straight through Christmas Day, cooking and serving a feast they could
            not sit down to eat with their own families. The day after, employers sent them home
            with a box: a bonus, a bit of food from the feast, sometimes a small gift, as thanks for
            a year of service they rarely got thanked for out loud.
          </p>
          <p>
            📌 <strong>History.com&apos;s account of the custom calls these Christmas boxes, in
            essence, an early version of the holiday bonus.</strong> Tradesmen who had served a
            household all year, the milkman, the butcher, the chimney sweep, collected a similar
            box or tip on the first working day after Christmas as thanks for twelve months of
            reliable work.
          </p>
          <p>
            Wikipedia&apos;s account adds a real diary entry to the custom. The English diarist
            Samuel Pepys mentions giving a Christmas box to a tradesman in his own journal, dated
            19 December 1663, which is one of the earliest personal records of the practice in
            writing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Church&apos;s Own Alms Box, Opened on a Saint&apos;s Day
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A second, older explanation does not start with wealthy households at all. It starts
            inside the church building itself.
          </p>
          <p>
            📌 <strong>Parish churches kept alms boxes near the entrance all through Advent,
            collecting money for the poor.</strong> Wikipedia&apos;s account of the custom traces
            the practice back to late Roman and early Christian almsgiving, and says those boxes
            were traditionally opened and distributed on the feast of Saint Stephen, December 26.
          </p>
          <p>
            History.com states the same connection plainly: clergy gave the contents of those boxes
            to the poor on &quot;the feast of St. Stephen, the first Christian martyr&quot; and a
            figure the early church already associated with charity, since{" "}
            <ArticleLink href="/blog/who-was-saint-stephen">
              Stephen himself was chosen to make sure widows got fed
            </ArticleLink>
            .
          </p>
          <p>
            ⚠️ Neither story cancels the other out. A servant&apos;s tip box and a church&apos;s alms
            box grew up on the same date for the same basic reason. December 26 had already become
            the day this culture gave something away.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Carol Written for This Exact Day
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you have ever sung Good King Wenceslas, you have already celebrated the Christian
            layer of this day without noticing it.
          </p>
          <p>
            📌 <strong>Wikipedia&apos;s account of the carol says the English clergyman John Mason
            Neale wrote its lyrics in 1853, setting them on &quot;the Feast of Stephen,&quot; and
            fitting them to a much older thirteenth century spring melody called Tempus Adest
            Floridum.</strong> The carol first appeared that year in a collection called Carols for
            Christmas Tide.
          </p>
          <p>
            The king in the song is Wenceslas, a tenth century duke of Bohemia who was never
            crowned king in his own lifetime. Wikipedia notes that the Holy Roman Emperor Otto the
            First gave him the royal title after his death, which is the only reason the carol calls
            him a king at all.
          </p>
          <p>
            💡 Neale did not pick December 26 by accident. He set a story about a ruler going out in
            brutal cold to give food to a poor man on the exact day church tradition had already
            marked for generosity. The carol is a sermon on Proverbs 19:17 wearing a snow scene.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. How a Tip Box Turned Into a Bank Holiday
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A household custom does not automatically become a day off work. That took an act of
            law, nearly two centuries after the habit of giving boxes was already common.
          </p>
          <p>
            📌 <strong>Wikipedia&apos;s account of the holiday says the Bank Holidays Act 1871
            formally established December 26 as a bank holiday in England, Wales, and Ireland, and
            the Oxford English Dictionary records the earliest British attestation of the actual
            name &quot;Boxing Day&quot; from 1743.</strong>
          </p>
          <p>
            Scotland came later. The same account notes Boxing Day only became an additional bank
            holiday there in 1974, by royal proclamation under a 1971 update to the original law.
          </p>
          <p>
            💡 The name is older than the law, and the custom is older than the name. A tip handed
            to a servant in the 1600s eventually became a date parliament had to formally protect.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. One Date, Kept Two Very Different Ways
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is the honest picture. December 26 is not one holiday wearing two names. It is two
            different things that happen to land on the same square of the calendar.
          </p>
          <p>
            📌 <strong>In the Catholic Church, December 26 is kept as the Feast of Saint Stephen,
            First Martyr, the second day inside{" "}
            <ArticleLink href="/blog/what-is-christmastide">the Christmas octave</ArticleLink>
            .</strong> The Church of England&apos;s own Book of Common Prayer still assigns the day
            its own readings, and many Lutheran churches keep it too.
          </p>
          <p>
            Eastern Orthodox churches honor Stephen a day later, December 27, or January 9 on the
            Julian calendar still followed in some Orthodox communities. Many low church Protestant
            traditions mark neither the feast nor a fixed saints&apos; calendar at all, since they do
            not organize the year around a list of saints&apos; days the way Catholic and Anglican
            calendars do.
          </p>
          <p>
            Meanwhile Boxing Day itself, the bank holiday and the sales, runs almost entirely
            separate from any of that. Most shoppers lining up for a discount on December 26 have
            never heard of Stephen and are not trying to insult him. They are keeping the civic half
            of a date that has carried two different meanings for centuries.
          </p>
          <p>
            💡 You do not have to choose only one. You can take the day off, and still spend five
            minutes remembering the man the alms box was originally opened for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Keeping Boxing Day Well
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            You do not need a Victorian household or a parish alms box to let this history actually
            shape your own December 26.
          </p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Give something away before you buy anything.</strong> Even a small gift to
            someone who served you this year, a tip, a note, a meal, keeps the oldest version of
            this custom alive.
          </li>
          <li>
            <strong>Read Acts 6 and 7 on December 26.</strong> It takes ten minutes and puts the
            actual man behind the feast day back into a day most people spend shopping.
          </li>
          <li>
            <strong>Play Good King Wenceslas and actually listen to the words.</strong> It was
            written for this exact day, about a ruler who went out in the cold rather than stay
            warm while someone else was hungry.
          </li>
          <li>
            <strong>Learn what your own country calls this day.</strong> Boxing Day, Saint
            Stephen&apos;s Day, the Day of Goodwill, or no holiday at all. The name tells you which
            half of the history your culture kept.
          </li>
          <li>
            <strong>Do not assume Boxing Day sales are a Christian tradition.</strong> They are not.
            The feast and the bank holiday share a date, not a purpose.
          </li>
          <li>
            <strong>If your church keeps the feast, show up.</strong> A Mass or service for the
            first martyr the day after Christmas is a short walk from the manger to the cost of
            actually following Christ.
          </li>
          <li>
            <strong>Ask who in your life serves you quietly all year.</strong> The original box was
            for exactly that person. Most of us can still name one.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses Behind Boxing Day
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Boxing Day has no Bible verse of its own. These five passages carry the two ideas,
            giving and sacrifice, that the day actually grew out of.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Proverbs 19:17</h3>
        <VerseQuote
          text="He that hath pity upon the poor lendeth unto the LORD; and that which he hath given will he pay him again."
          reference="Proverbs 19:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          This is the verse every alms box and every Christmas box was quietly obeying, long before
          anyone wrote a name for the custom down.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 15:10 and 11</h3>
        <VerseQuote
          text="Thou shalt surely give him, and thine heart shall not be grieved when thou givest unto him: because that for this thing the LORD thy God shall bless thee in all thy works, and in all that thou puttest thine hand unto. For the poor shall never cease out of the land: therefore I command thee, saying, Thou shalt open thine hand wide unto thy brother, to thy poor, and to thy needy, in thy land."
          reference="Deuteronomy 15:10 and 11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Moses commands an open hand centuries before any English household started handing
          servants a box. Boxing Day did not invent generosity. It just gave an old command a date.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Acts 6:1 to 3</h3>
        <VerseQuote
          text="And in those days, when the number of the disciples was multiplied, there arose a murmuring of the Grecians against the Hebrews, because their widows were neglected in the daily ministration. Then the twelve called the multitude of the disciples unto them, and said, It is not reason that we should leave the word of God, and serve tables. Wherefore, brethren, look ye out among you seven men of honest report, full of the Holy Ghost and wisdom, whom we may appoint over this business."
          reference="Acts 6:1 to 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Stephen was appointed because people were going hungry. The man the church remembers on
          December 26 got his start solving the exact problem the day&apos;s alms boxes existed to
          fix.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 5:44 and 45</h3>
        <VerseQuote
          text="But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you; That ye may be the children of your Father which is in heaven: for he maketh his sun to rise on the evil and on the good, and sendeth rain on the just and on the unjust."
          reference="Matthew 5:44 and 45"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Stephen kept this exact command while he was being stoned, praying for the men killing
          him rather than against them. The feast on December 26 remembers a man who put Jesus&apos;
          hardest teaching into practice at the worst possible moment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Acts 8:2</h3>
        <VerseQuote text="And devout men carried Stephen to his burial, and made great lamentation over him." reference="Acts 8:2" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Even the men who buried Stephen are only described by their devotion, not their names. The
          first Christian martyr was mourned by people history never bothered to identify, which is
          its own quiet lesson about whose grief actually matters to God.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Boxing Day
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Boxing Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Boxing Day is December 26, the day after Christmas, kept as a public holiday in the
          United Kingdom and much of the Commonwealth. It has nothing to do with the sport of
          boxing. The name comes from a tradition of giving boxes of money, gifts, or alms on this
          date.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is it called Boxing Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Historians give two main explanations, and both may be true at once. Wealthy households
          gave servants and tradesmen a Christmas box of money or gifts on the first weekday after
          Christmas, and churches opened their own alms boxes on the same date and gave the contents
          to the poor.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Boxing Day a religious holiday?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The civic holiday, the bank holiday and the sales, is not religious on its own. It shares
          its date with a genuinely religious observance, the Feast of Saint Stephen, which several
          Christian traditions still keep as a feast day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between Boxing Day and Saint Stephen&apos;s Day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They fall on the same date, December 26, but they are not the same thing. Saint
          Stephen&apos;s Day is the church&apos;s feast for the first Christian martyr. Boxing Day is
          a separate British civic custom that grew up alongside it on the same date. In most of
          Ireland the day is actually called Saint Stephen&apos;s Day rather than Boxing Day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Boxing Day celebrated in the United States?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not nationally. It is not a federal or state holiday for most of the country. Massachusetts
          is the one notable exception, after Governor William F. Weld declared December 26 Boxing
          Day there in 1996, though it was never made an employee holiday.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Which countries celebrate Boxing Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a public or statutory holiday in the United Kingdom, Australia, Canada, New Zealand,
          Hong Kong, and Nigeria, among others. South Africa renamed it the Day of Goodwill in 1994,
          and Trinidad and Tobago also keeps it as a public holiday.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does the carol Good King Wenceslas mention the Feast of Stephen?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because its English lyricist, John Mason Neale, set the story deliberately on December 26
          in 1853, matching a tale about a generous ruler to the day the church already associated
          with giving to the poor.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do Protestants celebrate Boxing Day or Saint Stephen&apos;s Day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many do, through the civic Boxing Day holiday itself, which is not tied to any one church.
          Anglicans and many Lutherans also keep the religious Feast of Saint Stephen on the same
          date. Other Protestant traditions follow no fixed saints&apos; calendar and may not mark the
          feast at all, which{" "}
          <ArticleLink href="/blog/what-is-the-liturgical-calendar">
            how different church calendars actually work
          </ArticleLink>{" "}
          explains in more depth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do stores have such big Boxing Day sales?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The sales grew out of the civic holiday, not the church feast. Once December 26 became a
          guaranteed day off work across the Commonwealth, retailers used the free time and the post
          Christmas returns rush to launch major sales, a modern habit with no connection to the
          alms boxes the day is actually named for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What happens after Boxing Day in the church calendar?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Christmas octave keeps moving. December 27 remembers the apostle John, December 28
          remembers{" "}
          <ArticleLink href="/blog/what-is-the-feast-of-the-holy-innocents">
            the Holy Innocents
          </ArticleLink>
          , and the full{" "}
          <ArticleLink href="/blog/meaning-of-the-twelve-days-of-christmas">
            twelve days of Christmas
          </ArticleLink>{" "}
          run until{" "}
          <ArticleLink href="/blog/what-is-epiphany">Epiphany</ArticleLink> on January 6.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the sales and the strange name, and two true things remain about this day.</p>
          <p>
            📌 <strong>Boxing Day began as a day for giving something away, not getting a
            discount.</strong> A servant&apos;s tip, a tradesman&apos;s thanks, a church&apos;s alms
            box emptied for the poor. Whatever shopping it has grown into since, that is where the
            name actually started.
          </p>
          <p>
            📌 <strong>The same date remembers a man who gave everything, not just a box of
            coins.</strong> Stephen served tables, preached without fear, and prayed for the people
            killing him while they were still doing it. The church placed his feast right after
            Christmas on purpose, so the joy of the manger would sit next to the real cost of
            following Christ.
          </p>
          <p>
            You do not have to pick a side between the bank holiday and the feast day. Keep the rest
            if your country gives it to you. Just do not let the whole day pass without giving
            something away, the way the very first Boxing Day custom asked you to.
          </p>
          <p>❓ Who served you this year without much thanks, and what will you actually give them?</p>
          <p>📌 <strong>That question is the oldest part of this whole holiday.</strong></p>
        </div>
      </section>

      <ArticleSources
        checkedOn="9 November 2026"
        sources={[
          {
            title: "Boxing Day",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Boxing_Day",
            note: "The source for the Oxford English Dictionary's 1743 earliest attestation of the name, the Bank Holidays Act 1871 and the 1974 Scottish proclamation, Samuel Pepys's 1663 diary reference to a Christmas box, the alms box tradition tied to the Feast of Saint Stephen, and the list of countries that observe the holiday, including South Africa's 1994 renaming to the Day of Goodwill and Massachusetts Governor William F. Weld's 1996 declaration.",
          },
          {
            title: "Saint Stephen's Day",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Saint_Stephen%27s_Day",
            note: "The source for the Western December 26 and Eastern December 27 or January 9 observance dates, and the day's standing as the second day of Christmastide.",
          },
          {
            title: "Good King Wenceslas",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Good_King_Wenceslas",
            note: "The source for John Mason Neale writing the carol's lyrics in 1853 and setting them on the Feast of Stephen, its first publication in Carols for Christmas Tide, the Tempus Adest Floridum melody, and Wenceslas of Bohemia receiving the royal title only after his death.",
          },
          {
            title: "Why Is the Day After Christmas Called Boxing Day?",
            publisher: "History.com, by Christopher Klein",
            url: "https://www.history.com/articles/why-is-the-day-after-christmas-called-boxing-day",
            note: "The source for the Christmas box as an early form of a holiday bonus for servants and tradesmen, and for the feast of Saint Stephen being described as the first Christian martyr and a figure associated with charity.",
          },
          {
            title: "December 26 — Feast of Saint Stephen, First Martyr",
            publisher: "United States Conference of Catholic Bishops, Daily Readings",
            url: "https://bible.usccb.org/bible/readings/122625.cfm",
            note: "The source for the Catholic Church's current title for the day and its assigned Mass readings from Acts 6 and 7.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
