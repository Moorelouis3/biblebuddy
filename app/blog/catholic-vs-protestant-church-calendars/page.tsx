import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("catholic-vs-protestant-church-calendars", {
  title: "What Is the Difference Between Catholic and Protestant Church Calendars?",
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

export default function CatholicVsProtestantChurchCalendarsPage() {
  return (
    <BlogPostShell
      slug="catholic-vs-protestant-church-calendars"
      title={<>📖 What Is the Difference Between Catholic and Protestant Church Calendars?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Your Catholic coworker asks what you are giving up for Lent. You have never given up anything for Lent in your life.</p>
            <p>Your own church has never once mentioned Ash Wednesday, Advent, or something your coworker casually calls Ordinary Time. Nobody told you that was strange. Nobody told you it was normal either.</p>
            <p>
              📌 <strong>Here is the plain answer. Catholic and Protestant church calendars differ because they answer one question very differently: does the church get to add its own yearly rhythm of feast days on top of Scripture, or does it only get to keep what Scripture itself commands. Catholics answer yes, and built a detailed calendar around that yes. Protestants split into at least three different answers, and this guide walks through every one of them.</strong>
            </p>
            <p>That split did not happen by accident, and it did not happen all at once. It ran through Martin Luther, the English Reformation, the Puritans, and all the way down to a Baptist pastor in Texas deciding whether his own church should talk about Lent.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide walks through what the Catholic calendar actually requires, what Martin Luther kept and threw out, how Anglicans trimmed hundreds of medieval feast days down to a short list, why Reformed and Puritan churches rejected a yearly calendar altogether, and why a growing number of Baptist churches are quietly picking some of it back up.
            </p>
            <p>Every historical and doctrinal claim below links back to a named source, so you can go check it yourself.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is tempting to treat this as a trivia question. Who keeps more holy days, who keeps fewer, who is right.</p>
          <p>
            ⚠️ <strong>But the real question underneath is not whose calendar is more spiritual.</strong> It is whether a calendar helps you remember God on purpose, or becomes one more way to quietly judge a believer who worships differently than you do.
          </p>
          <p>Scripture itself assumes you will want to mark time around the Lord, whether the rhythm is daily or yearly.</p>
        </div>
        <VerseQuote
          text="It is a good thing to give thanks unto the LORD, and to sing praises unto thy name, O most High: to shew forth thy lovingkindness in the morning, and thy faithfulness every night."
          reference="Psalm 92:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Morning and night. That is a calendar too, just a much smaller one than the Catholic Church&apos;s or even Luther&apos;s. Every tradition in this guide, without exception, believes a Christian&apos;s time belongs to God.
          </p>
          <p>
            What they disagree about is how much of that time the church gets to shape with its own additional feast days, and who gets to decide. The stakes are not whether your church keeps Advent. The stakes are whether you let a real, honest disagreement like this one turn into a reason to look down on another believer&apos;s walk with Christ.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 How the Catholic and Protestant Calendars Actually Differ
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The One Day Every Tradition in This Guide Still Keeps
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before the differences, name the agreement, because it is bigger than any of the splits below.
          </p>
          <p>
            📌 <strong>Every tradition covered in this guide, Catholic and Protestant alike, keeps Sunday as the Lord&apos;s Day.</strong> The United States Conference of Catholic Bishops calls Sunday &quot;the original feast day,&quot; a celebration so central that it outranks almost every saint&apos;s day on the Catholic calendar when the two fall on the same date.
          </p>
          <p>
            That single point of agreement is nearly where the agreement ends. From there, Catholics built a calendar with hundreds of named days, while entire Protestant traditions kept exactly one.{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              The full shape of the Christian year, season by season
            </ArticleLink>{" "}
            is covered on its own, but this guide is about the specific fork in the road between Rome, Wittenberg, Geneva, and the Baptist church down the street.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Catholic Calendar: Two Layers, Three Ranks, Six Required Days
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The USCCB&apos;s own page on the liturgical year describes the Catholic calendar as having two tracks running at once: &quot;a seasonal cycle and a sanctoral cycle, called the Proper of Time and the Proper of Saints, respectively.&quot;
          </p>
          <p>
            The Proper of Time is Advent, Christmas, Lent, Easter, and the rest of the seasons built around the life of Christ. The Proper of Saints is the separate list of fixed feast days scattered across the year honoring specific saints. Every day gets ranked by importance. The USCCB page states it plainly: each day is classed as a &quot;Solemnity, Feast, or Memorial,&quot; and Memorials are further split into &quot;Obligatory or Optional.&quot;
          </p>
          <p>
            📌 <strong>Out of that whole calendar, only a handful of days actually carry a binding obligation to attend Mass.</strong> A 1992 decree from the Vatican&apos;s Congregation for Bishops, implemented by the USCCB and effective January 1, 1993, names six holy days of obligation for dioceses in the United States beyond Sunday itself:
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 January 1, the Solemnity of Mary, Mother of God</li>
            <li>🟢 Ascension Thursday, the sixth week of Easter</li>
            <li>🟢 August 15, the Assumption of the Blessed Virgin Mary</li>
            <li>🟢 November 1, All Saints</li>
            <li>🟢 December 8, the Immaculate Conception</li>
            <li>🟢 December 25, the Nativity of the Lord</li>
          </ul>
          <p>
            Everything else on the Catholic calendar, hundreds of memorials and feasts across the year, is real and kept, but optional in the specific sense that no Catholic is bound to attend Mass for it.{" "}
            <ArticleLink href="/blog/what-is-a-holy-day-of-obligation">
              What a holy day of obligation actually requires, and what happens if you miss one
            </ArticleLink>{" "}
            goes deeper into that specific list.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Catholic Lectionary: The Readings Are Already Chosen
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is a difference most Protestants never think about. A Catholic priest does not pick his own Sunday Scripture readings.
          </p>
          <p>
            The USCCB&apos;s own lectionary page describes a three year Sunday cycle, labeled Year A, B, and C, that changes every year on the First Sunday of Advent. Year A reads mostly from Matthew, Year B from Mark, and Year C from Luke, with John read during Lent and Easter in all three years. A separate two year weekday cycle, Year I and Year II, reads the same Gospels in both years while the first reading and psalm alternate.
          </p>
          <p>
            💡 <strong>That means a Catholic congregation anywhere in the world hears nearly the same Scripture on the same Sunday.</strong> Most Protestant pastors, outside the liturgical traditions covered below, choose their own text week to week, sometimes preaching straight through a single book of the Bible for months at a time instead.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Luther Kept the Feasts of the Lord, Cut the Feasts of the Saints
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Martin Luther did not reject the church calendar. He edited it, and he said exactly where he drew the line.
          </p>
          <p>
            In his 1523 revision of the Latin Mass, Luther wrote, &quot;But we in Wittenberg intend to observe only the Lord&apos;s days and the festivals of the Lord.&quot; He continued, &quot;We think that all the feasts of the saints should be abrogated.&quot;
          </p>
          <p>
            📌 <strong>Notice the line Luther actually drew.</strong> Not calendar versus no calendar. Feasts of the Lord, meaning Christmas, Easter, and the events of Christ&apos;s own life, versus feasts of the saints, which he saw as a separate, later layer of tradition worth cutting.
          </p>
          <p>
            Lutheran teaching did not erase the saints from memory entirely. The Augsburg Confession, Article 21, says &quot;the memory of saints may be set before us, that we may follow their faith and good works,&quot; while adding plainly that &quot;the Scripture teaches not the invocation of saints.&quot; You can remember a saint&apos;s example. You cannot pray to one.
          </p>
          <p>
            That same edit is still visible in most Lutheran churches today, which keep Advent, Christmas, Epiphany, Lent, Easter, and Pentecost on their own calendars, the feasts of the Lord Luther chose to keep.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Anglicans Cut a List of Hundreds Down to Twenty Two
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Church of England made its own, separate edit, and it was far more severe than Luther&apos;s.
          </p>
          <p>
            The Catholic Encyclopedia&apos;s entry on the Book of Common Prayer describes the medieval calendar it replaced as one that &quot;contained the fast days and the feasts for most of the days in the year.&quot; The first Book of Common Prayer, in 1549, &quot;omitted the fast days altogether and gave only twenty two saints&apos; days,&quot; and the same source notes all twenty two were &quot;New Testament saints.&quot;
          </p>
          <p>
            📌 <strong>Among the Marian feasts alone, only two survived the cut: the Purification and the Annunciation.</strong> All Souls&apos; Day, the day set aside for praying for the dead, was dropped entirely, a direct result of rejecting the doctrine of purgatory it was built around.{" "}
            <ArticleLink href="/blog/what-is-all-saints-day">
              All Saints&apos; Day itself survived that same cut
            </ArticleLink>
            , which tells you something about where the English Reformation actually drew its lines. A later prayer book, printed between 1559 and 1561, &quot;reintroduced the mention of the fast days and a goodly number of feasts,&quot; so even this cut was not the final word.
          </p>
          <p>
            Methodist churches grew directly out of a renewal movement inside the Church of England, led by an Anglican priest named John Wesley, and most still keep a similar shape: Advent through Epiphany, then Lent through Pentecost, without the full medieval list of saints either side had already left behind.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Reformed and Puritan Churches: No Calendar But the Lord&apos;s Day
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A third answer rejected the whole project, on principle rather than by trimming a list.
          </p>
        </div>
        <VerseQuote
          text="But now, after that ye have known God, or rather are known of God, how turn ye again to the weak and beggarly elements, whereunto ye desire again to be in bondage? Ye observe days, and months, and times, and years. I am afraid of you, lest I have bestowed upon you labour in vain."
          reference="Galatians 4:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Reformed and Puritan theologians took Paul&apos;s warning seriously enough to build it into their confession. The Westminster Confession of Faith, Chapter 21, states that acceptable worship is &quot;instituted by himself, and so limited to his own revealed will,&quot; a principle historians call the regulative principle. Read the whole chapter and it names exactly one day God appointed across the year: &quot;one day in seven for a Sabbath,&quot; now kept as the Lord&apos;s Day. Christmas, Easter, and every other feast go unmentioned, on purpose.
          </p>
          <p>
            ⚠️ <strong>That was never read as an attack on Christmas or Easter themselves.</strong> It was a conviction that if Scripture never commands a yearly cycle of extra feast days, no church has the authority to require one, however good the day being honored actually is.{" "}
            <ArticleLink href="/blog/what-is-reformation-day">
              What the Reformation itself is remembered for
            </ArticleLink>{" "}
            runs on a related but separate question of church authority.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Baptists and Nondenominational Churches: Free to Choose, Increasingly Choosing More
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Most Baptist and nondenominational churches historically kept no formal calendar at all, beyond preaching through Christmas and Easter as they came.
          </p>
          <p>
            That is quietly changing. Baptist News Global reported that &quot;though traditionally viewed as a Catholic rite, increasing numbers of Baptists are discovering the discipline of Lent.&quot; Bo Prosser, a coordinator for the Cooperative Baptist Fellowship, explained the appeal this way: &quot;It&apos;s not a program. It&apos;s an appreciation of liturgy.&quot;
          </p>
          <p>
            💡 Not every Baptist church is on board yet. Randel Everett, then executive director of the Baptist General Convention of Texas, wrote that &quot;some of our churches emphasize Advent, but not many mention Lent.&quot;
          </p>
          <p>
            📌 <strong>So the honest answer for this whole group is not one answer.</strong> No Baptist or nondenominational church is required to keep any calendar beyond Sunday, and a growing number are freely choosing to borrow pieces of one anyway, the same freedom that let their ancestors reject it in the first place.{" "}
            <ArticleLink href="/blog/most-important-christian-holidays">
              Which holidays nearly every Christian tradition still agrees matter most
            </ArticleLink>{" "}
            is the simplest place to start if your own church has never talked about any of this.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips for Navigating a Different Tradition&apos;s Calendar
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whichever side of this you grew up on, here is how to actually live alongside the other side well.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Learn what your own church actually does, and why.</strong> Ask your pastor directly whether your congregation follows a calendar, part of one, or none at all, and what the reasoning behind that choice is.
          </li>
          <li>
            <strong>If you keep a calendar, let it point to Christ, not just decorate your year.</strong> Luther kept Christmas and Easter because they are about Jesus, not because a calendar needs filling.
          </li>
          <li>
            <strong>If you do not keep one, do not treat someone who does as less free in Christ.</strong> The same Scripture that frees you to skip Lent frees your Catholic or Lutheran neighbor to keep it.
          </li>
          <li>
            <strong>Visit a different tradition&apos;s service during a high season at least once.</strong> An Ash Wednesday service or a Catholic Midnight Mass will teach you more in an hour than this whole guide can.
          </li>
          <li>
            <strong>Never confuse a disagreement over a calendar with a disagreement over the gospel.</strong> Every tradition in this guide confesses the same Christ, the same resurrection, and the same empty tomb.
          </li>
          <li>
            <strong>Start with Sunday before you argue about any other day.</strong> It is the one day every tradition covered here already agrees on. Build from there, not from the parts you disagree about.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Sacred Days and Christian Freedom
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>None of these verses mention Advent or Lent by name. All five sit underneath every argument this guide has described.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 16:16</h3>
        <VerseQuote
          text="Three times in a year shall all thy males appear before the LORD thy God in the place which he shall choose; in the feast of unleavened bread, and in the feast of weeks, and in the feast of tabernacles: and they shall not appear before the LORD empty."
          reference="Deuteronomy 16:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God gave Israel a calendar with teeth, three required gatherings a year, long before any church argued over one. Every side of this debate agrees that marking sacred time is a biblical instinct. They disagree about who gets to write the calendar now that Christ has come.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Nehemiah 8:9 and 10</h3>
        <VerseQuote
          text="And Nehemiah, which is the Tirshatha, and Ezra the priest the scribe, and the Levites that taught the people, said unto all the people, This day is holy unto the LORD your God; mourn not, nor weep. For all the people wept, when they heard the words of the law. Then he said unto them, Go your way, eat the fat, and drink the sweet, and send portions unto them for whom nothing is prepared: for this day is holy unto our LORD: neither be ye sorry; for the joy of the LORD is your strength."
          reference="Nehemiah 8:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A holy day was never meant to feel like an obligation dragging on you. It was meant to end in shared food and real joy. Whatever calendar your own church keeps, that is still the test worth applying to it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Corinthians 5:7 and 8</h3>
        <VerseQuote
          text="Purge out therefore the old leaven, that ye may be a new lump, as ye are unleavened. For even Christ our passover is sacrificed for us: Therefore let us keep the feast, not with old leaven, neither with the leaven of malice and wickedness; but with the unleavened bread of sincerity and truth."
          reference="1 Corinthians 5:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul takes an actual Jewish feast and reads Christ directly into it. Whether or not your own tradition keeps a formal feast day, this is the deeper pattern every single one of them, Catholic or Protestant, is trying to point at.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Mark 2:27 and 28</h3>
        <VerseQuote
          text="And he said unto them, The sabbath was made for man, and not man for the sabbath: Therefore the Son of man is Lord also of the sabbath."
          reference="Mark 2:27 and 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus is not against a set apart day here. He is correcting who the day serves. 📌 <strong>A calendar, any calendar, exists to serve the people who keep it and the Lord they keep it for, not the other way around.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. John 4:23 and 24</h3>
        <VerseQuote
          text="But the hour cometh, and now is, when the true worshippers shall worship the Father in spirit and in truth: for the Father seeketh such to worship him. God is a Spirit: and they that worship him must worship him in spirit and in truth."
          reference="John 4:23 and 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse the Reformed and Puritan tradition leaned on hardest. Worship in spirit and in truth never required a Catholic calendar to be real. It also never required rejecting one to be sincere.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Catholic and Protestant Calendars
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the main difference between the Catholic and Protestant church calendars?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Catholics follow one detailed, church wide calendar with ranked feast days, saints, and six required holy days beyond Sunday. Protestants have no single answer: Lutherans and Anglicans kept a trimmed version of the same calendar, Reformed and Puritan churches kept only the Lord&apos;s Day, and Baptists and nondenominational churches have historically kept none at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do all Protestants reject the church calendar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Lutheran, Anglican, and Methodist churches generally kept Advent, Christmas, Lent, Easter, and Pentecost. Reformed and Puritan churches rejected any calendar beyond the weekly Lord&apos;s Day on principle. Baptist and nondenominational churches historically kept neither, though a growing number now observe Advent or Lent informally.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What are the Catholic Church&apos;s six holy days of obligation in the United States?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          January 1 for Mary, Mother of God, Ascension Thursday, August 15 for the Assumption, November 1 for All Saints, December 8 for the Immaculate Conception, and December 25 for Christmas. A 1992 decree set this list for the United States, effective January 1, 1993.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Martin Luther keep some feast days and reject others?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luther kept what he called the festivals of the Lord, days tied directly to events in Christ&apos;s own life, like Christmas and Easter. He rejected the feasts of the saints, writing that Wittenberg intended to observe only the Lord&apos;s days and the Lord&apos;s festivals.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Lutherans follow a Catholic style calendar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Lutherans keep a trimmed version of it. Most Lutheran churches observe Advent, Christmas, Epiphany, Lent, Easter, and Pentecost, the same as Catholics, but without the extensive calendar of saints&apos; feast days the Catholic Church still keeps.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Catholic Lectionary cycle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A three year rotation for Sundays, Years A, B, and C, reading mostly from Matthew, Mark, and Luke in turn, with John read during Lent and Easter every year. Weekdays follow a separate two year cycle, Year I and Year II, using the same Gospel readings both years.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do Reformed and Presbyterian churches not keep a church calendar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because of the regulative principle, the conviction that acceptable worship must be instituted by God himself, not added by the church. The Westminster Confession names only the weekly Lord&apos;s Day as divinely appointed and mentions no annual feast calendar at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Baptists celebrate Lent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Historically, almost never. That is changing in some Baptist circles, with leaders in the Cooperative Baptist Fellowship describing a growing appreciation for Lent as a spiritual discipline, even while other Baptist bodies report it is still rarely mentioned.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the Church of England keep the Catholic calendar of saints?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, not intact. The first Book of Common Prayer in 1549 cut the medieval calendar down to twenty two saints&apos; days, all from the New Testament, kept only two Marian feasts, and dropped All Souls&apos; Day along with the doctrine of purgatory it was built on.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it wrong for a Protestant to follow the Catholic liturgical calendar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No single verse forbids it, and no single verse requires it either. Scripture leaves this to conscience, which is exactly why faithful Christians have landed in such different places on it, from a detailed Catholic calendar to a Puritan church that keeps only Sunday.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the councils, the confessions, and the centuries, and three things remain.</p>
          <p>
            📌 <strong>Every tradition in this guide keeps Sunday.</strong> Catholics, Lutherans, Anglicans, Reformed Christians, and Baptists all agree the Lord&apos;s Day belongs to the Lord, even when they agree on almost nothing else about the rest of the year.
          </p>
          <p>
            📌 <strong>The real disagreement is about church authority, not about Jesus.</strong> Rome says the church may add feast days. Luther kept some and cut others. Geneva and the Puritans said only Scripture may add a holy day. None of them disagree about who Christ is.
          </p>
          <p>
            📌 <strong>None of this was ever meant to divide people who both kneel at the same cross.</strong> A Catholic keeping six holy days and a Baptist keeping none can both be worshipping in spirit and in truth.
          </p>
          <p>
            So here is one way to carry this forward. The next time you meet a believer whose calendar looks nothing like yours, ask them what their own tradition actually teaches, instead of assuming you already know.{" "}
            <ArticleLink href="/blog/what-is-christmas">
              Every version of this calendar, trimmed or full, still exists to point at the same birth
            </ArticleLink>
            . That was never the part anyone disagreed about.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="31 October 2026"
        sources={[
          {
            title: "Liturgical Year & Calendar",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/prayer-worship/liturgical-year",
            note: "The source for the Proper of Time and Proper of Saints, the Solemnity, Feast, and Memorial ranking system, and Sunday's status as 'the original feast day.'",
          },
          {
            title: "Canon 1246 §2: Complementary Norm",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/beliefs-and-teachings/what-we-believe/canon-law/complementary-norms/canon-1246",
            note: "The source for the six holy days of obligation in the United States and the 1993 effective date of the governing decree.",
          },
          {
            title: "Questions About the Lectionary",
            publisher: "United States Conference of Catholic Bishops (USCCB)",
            url: "https://www.usccb.org/faq/questions-about-lectionary",
            note: "The source for the three year Sunday cycle (Years A, B, C) and the two year weekday cycle (Years I and II).",
          },
          {
            title: "Saints' Days",
            publisher: "Lutheran Reformation, The Lutheran Church, Missouri Synod",
            url: "https://lutheranreformation.org/theology/saints-days/",
            note: "The source for Martin Luther's 1523 statement, from his revision of the Latin Mass (Luther's Works, American Edition, vol. 53, p. 23), that Wittenberg would keep only the Lord's days and the Lord's festivals.",
          },
          {
            title: "Augsburg Confession, Article XXI: Of the Worship of Saints",
            publisher: "Book of Concord",
            url: "https://bookofconcord.org/augsburgconfession.php",
            note: "The source for the Lutheran confessional position that the memory of saints may be honored, but their invocation is not taught by Scripture.",
          },
          {
            title: "Book of Common Prayer",
            publisher: "The Catholic Encyclopedia, New Advent",
            url: "https://newadvent.org/cathen/02678c.htm",
            note: "The source for the 1549 Book of Common Prayer calendar keeping only twenty two, New Testament only, saints' days, the two surviving Marian feasts, the dropping of All Souls' Day, and the 1559 to 1561 book's partial restoration.",
          },
          {
            title: "Increasingly, Baptists turning to observance of Lent",
            publisher: "Baptist News Global",
            year: "2009",
            url: "https://baptistnews.com/article/increasinglybaptiststurningtoobservanceoflent/",
            note: "The source for the growing Baptist observance of Lent, including quotes from Bo Prosser of the Cooperative Baptist Fellowship and Randel Everett of the Baptist General Convention of Texas.",
          },
          {
            title: "Westminster Confession of Faith, Chapter 21: Of Religious Worship and the Sabbath Day",
            publisher: "A Puritan's Mind",
            year: "1646",
            url: "https://www.apuritansmind.com/westminster-standards/chapter-21/",
            note: "The source for the regulative principle of worship and the Confession naming only the weekly Lord's Day as divinely appointed, with no mention of an annual feast calendar.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
