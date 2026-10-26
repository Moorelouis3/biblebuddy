import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-reformation-day", {
  title: "What Is Reformation Day? History, Meaning, and Why October 31 Matters",
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

export default function WhatIsReformationDayPage() {
  return (
    <BlogPostShell
      slug="what-is-reformation-day"
      title={<>📖 What Is Reformation Day? History, Meaning, and Why October 31 Matters</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>October 31 shows up on your calendar as Halloween.</p>
            <p>For a lot of churches, it means something else first.</p>
            <p>They call it Reformation Day.</p>
            <p>
              Maybe your pastor mentioned it once, in passing, and you nodded like you knew what he
              meant. Maybe you grew up Catholic and heard the word Reformation said with a wince.
              Maybe you have never heard of it at all.
            </p>
            <p>
              📌 <strong>Reformation Day marks the anniversary of the day a German monk named Martin
              Luther is said to have posted a list of 95 arguments on a church door, and accidentally
              split Western Christianity in two.</strong>
            </p>
            <p>
              That one sentence hides a lot. What Luther actually objected to. What the Catholic Church
              actually taught then, and teaches now. Whether the door nailing even happened the way the
              legend says.
            </p>
            <p>
              This guide walks through what is history, what is legend, what the Bible passages at the
              center of the argument actually say, and how Christians on both sides of that 1517 split
              talk about it honestly today.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not have to be Lutheran, or even Protestant, for this day to matter.</p>
          <p>
            ⚠️ <strong>Reformation Day is really an argument about one question: how does a person get
            right with God?</strong>
          </p>
          <p>Is it something God does for you, as a gift you receive by trusting Him?</p>
          <p>Or is it something worked out over a lifetime, with the Church&apos;s help, through grace and good works together?</p>
          <p>
            That question is not a museum piece. It is still the question underneath every time you
            wonder whether you have done enough, prayed enough, or been good enough for God to accept
            you.
          </p>
          <p>
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">How you know you are saved</ArticleLink>{" "}
            depends almost entirely on how you answer it.
          </p>
          <p>
            Reformation Day also matters because it is a reminder that Christians who disagree
            sharply can still share the same Lord. Catholics and Protestants read the same Bible,
            confess the same Christ crucified and risen, and still read Romans differently enough to
            have split a continent over it.
          </p>
          <p>Understanding why helps you talk about it honestly, without pretending the differences do not exist.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 What Reformation Day Actually Is</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. What Happened on October 31, 1517</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Martin Luther was an Augustinian monk and a professor of theology at the University of
            Wittenberg, in what is now Germany.
          </p>
          <p>
            A Dominican friar named Johann Tetzel was touring nearby towns selling indulgences, which
            the Church taught could reduce the punishment still owed for sin after it had been
            forgiven. Some of the money raised was funding the rebuilding of St. Peter&apos;s Basilica
            in Rome.
          </p>
          <p>Luther thought the way Tetzel was selling them crossed a line.</p>
          <p>
            He wrote 95 short arguments, in Latin, mostly aimed at the abuse of indulgences rather
            than at the pope directly, and by tradition dated them October 31, 1517.
          </p>
          <p>
            📌 <strong>He was not trying to start a new church.</strong> He was a professor inviting
            other scholars to debate, which is exactly what posting theses on a university notice
            board was for.
          </p>
          <p>
            Printers got hold of them, translated them from Latin into German, and within weeks they
            had spread across the region in a way no one, least of all Luther, had planned.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Did Luther Really Nail the Theses to a Church Door?</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is where the popular story gets ahead of the evidence.</p>
          <p>
            What is well documented is that Luther wrote the theses and sent them, by letter, to the
            Archbishop of Mainz and to his own bishop. That part is not in serious dispute.
          </p>
          <p>
            The image of Luther hammering a nail into the door of Wittenberg&apos;s Castle Church is
            the part historians argue about. Some, including the German historian Erwin Iserloh in the
            1960s, questioned whether it happened at all, since Luther&apos;s own earliest letters do
            not mention it.
          </p>
          <p>
            ⚠️ <strong>Treat the door nailing as church tradition, not a documented fact.</strong> The
            theses themselves, and the printing press that spread them, are not in question. The nail
            and the hammer are.
          </p>
          <p>
            Either way, the Castle Church door became the symbol, and churches that observe Reformation
            Day today are marking that symbol, not necessarily a single verified afternoon.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. From a Scholarly Debate to a Trial</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luther did not expect to be excommunicated. He got there anyway, in stages, over about
            three and a half years.
          </p>
          <p>Rome summoned him, questioned him, and eventually declared him a heretic.</p>
          <p>
            In 1521, the Holy Roman Emperor Charles V convened an imperial assembly at the city of
            Worms, called a diet, to deal with Luther among other matters of the empire.
          </p>
          <p>
            Luther appeared under a promise of safe passage and was asked to recant his writings. He
            refused, reportedly saying his conscience was captive to the Word of God, and he could not
            act against it.
          </p>
          <p>
            📌 <strong>The Diet of Worms is the moment historians usually point to as the real break.</strong>{" "}
            After it, Luther was an outlaw of the empire as well as an excommunicated priest. There was
            no path back to the Church he had been ordained in.
          </p>
          <p>
            Frederick III, the elector who ruled Luther&apos;s home territory of Saxony, protected him
            from arrest, which is the only reason Luther lived to keep writing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Convictions That Actually Drove the Split</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Indulgences were the spark. They were never the whole fire.</p>
          <p>Underneath them sat a handful of convictions Luther and the reformers who followed him kept coming back to.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>
            📌 <strong>Faith alone.</strong> A person is made right with God by trusting Christ, not by
            earning it through good works or purchased indulgences.
          </li>
          <li>
            📌 <strong>Scripture alone.</strong> The Bible, not church tradition by itself, is the final
            authority for what Christians believe.
          </li>
          <li>
            📌 <strong>Grace alone.</strong> Salvation starts as God&apos;s initiative toward sinners,
            not something a person works up to.
          </li>
          <li>
            📌 <strong>A priesthood of all believers.</strong> Every Christian has direct access to
            God through Christ, not only through ordained clergy.
          </li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luther grounded the first of those in a verse from the Old Testament that Paul quotes twice in the New.</p>
        </div>
        <VerseQuote
          text="Behold, his soul which is lifted up is not upright in him: but the just shall live by his faith."
          reference="Habakkuk 2:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul leans on that same line to open his letter to the Romans, the book Luther called the center of the whole New Testament.</p>
        </div>
        <VerseQuote
          text="For therein is the righteousness of God revealed from faith to faith: as it is written, The just shall live by faith."
          reference="Romans 1:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luther later wrote that wrestling with this verse, in his cell at the Augustinian
            monastery in Wittenberg, was the moment the gospel stopped feeling like a threat and
            started feeling like a gift. He said he felt reborn, as if the doors of paradise had
            opened. Historians still debate exactly when that shift happened, with most placing it
            in the years right around the theses rather than long before them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. What the Catholic Church Actually Teaches</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is easy to hear &quot;indulgences&quot; and assume the Catholic Church once sold
            forgiveness and quietly dropped the idea. That is not accurate, and it is worth stating
            the Catholic position the way the Church states it.
          </p>
          <p>
            The Catechism of the Catholic Church still teaches that an indulgence is a remission, before
            God, of the temporal punishment that remains after sin&apos;s guilt has already been
            forgiven through confession. An indulgence can be partial or plenary, and can be sought for
            the living or applied to the dead.
          </p>
          <p>
            In 1563, the Council of Trent responded directly to the abuse Luther had attacked. Its
            twenty fifth session kept the practice of indulgences in place, calling it &quot;most
            salutary to the Christian people,&quot; while ordering that &quot;all evil traffic in
            them, which has been a most prolific source of abuses, be absolutely abolished.&quot;
          </p>
          <p>
            In other words, Rome agreed with Luther that selling indulgences for money had been wrong.
            It did not agree that indulgences themselves, or the system of penance and purgatory behind
            them, were wrong.
          </p>
          <p>
            That is the actual disagreement, and it did not end with Luther&apos;s century. Catholic
            teaching still holds that grace, received through the sacraments, works together with a
            believer&apos;s cooperation over a lifetime. Classic Protestant teaching holds that a
            person is declared righteous by faith the moment they trust Christ, fully and finally,
            apart from anything they contribute.
          </p>
          <p>
            Four hundred and eighty two years later, almost to the day, the Lutheran World Federation
            and the Vatican&apos;s Pontifical Council for Promoting Christian Unity signed the Joint
            Declaration on the Doctrine of Justification, in Augsburg, on October 31, 1999. Cardinal
            Edward Cassidy called it an outstanding achievement of the ecumenical movement.
          </p>
          <p>
            📌 <strong>Say plainly what it did and did not do.</strong> It found real, shared ground on
            core truths of justification, enough that the two sides agreed their old condemnations of
            each other no longer applied as stated. It did not erase every difference. The two
            traditions still teach good works differently, and the Catholic Church still teaches
            indulgences the way it always has.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. How Reformation Day Is Observed Today</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Lutheran, Reformed, and some other Protestant congregations mark Reformation Sunday, the
            Sunday nearest October 31, with hymns like &quot;A Mighty Fortress Is Our God,&quot; red
            vestments for the Holy Spirit, and sermons on grace and Scripture.
          </p>
          <p>
            In Germany, it is a legal public holiday in nine states, including Saxony and Thuringia,
            where Lutheran roots run deepest, and in Lower Saxony, Bremen, Hamburg, and
            Schleswig-Holstein, which added the holiday in 2018. Berlin and Hesse do not observe it.
            In 2017, on the 500th anniversary of the theses, it was a public holiday across the whole
            country.
          </p>
          <p>
            Most Catholic parishes do not observe Reformation Day at all. For many Catholics, October
            31 is simply the eve of All Saints&apos; Day, a feast with its own much older history.
          </p>
          <p>Neither observance is the Christian one. They are different churches remembering a split year, from different sides of it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">✅ Practical Tips for Reformation Day</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need to attend a Lutheran church to let this day teach you something.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Romans 1 through 5 this week.</strong> That stretch of Scripture is the one
            Luther kept returning to. Read it slowly, the way he did, and ask what it says about how
            you are made right with God.
          </li>
          <li>
            <strong>Ask where you are quietly trying to earn grace.</strong> Most of us do not sell
            indulgences, but plenty of us still live like God&apos;s approval depends on a good enough
            week.{" "}
            <ArticleLink href="/blog/what-is-sin">
              What sin actually is
            </ArticleLink>{" "}
            and what grace actually covers are worth settling before you can rest in either.
          </li>
          <li>
            <strong>Open your own Bible instead of only hearing it explained.</strong> Sola scriptura
            was never about Christians needing no teachers. It was about every believer having the
            right to read the text for themselves.
          </li>
          <li>
            <strong>Talk to a Catholic friend about it honestly, not politely.</strong> Ask what their
            church actually teaches about grace and good works, in their own words, before deciding you
            already know.
          </li>
          <li>
            <strong>Thank God for a Bible in your own language.</strong> That did not happen by
            accident. It happened because reformers believed ordinary Christians deserved to read
            Scripture for themselves.
          </li>
          <li>
            <strong>Learn to explain what you believe, not just repeat it.</strong> Luther could
            defend his position verse by verse under pressure.{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              Being able to give a reasoned answer
            </ArticleLink>{" "}
            is still worth practicing, whichever side of this history you land on.
          </li>
          <li>
            <strong>Resist turning this into a reason to look down on other Christians.</strong> Luther
            himself wrote some of his sharpest words in anger he later regretted. Disagreement does not
            require contempt.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Top 4 Bible Verses Behind the Reformation</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These are not verses about the Reformation. They are the verses that caused it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Romans 3:28</h3>
        <VerseQuote
          text="Therefore we conclude that a man is justified by faith without the deeds of the law."
          reference="Romans 3:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Luther translated this verse into German with the word &quot;alone&quot; added after
            faith, a translation choice critics attacked him for at the time.
          </p>
          <p>
            He defended it as capturing Paul&apos;s meaning rather than adding to it. The verse itself
            draws a hard line between being justified by faith and being justified by deeds of the law.
            That line is the whole argument in one sentence.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Ephesians 2:8 and 9</h3>
        <VerseQuote
          text="For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."
          reference="Ephesians 2:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three words carry this passage: grace, gift, and boast.</p>
          <p>
            Salvation is grace, which means it is not owed. It is a gift, which means it cannot be
            earned after the fact either. And it leaves no room for boasting, because boasting is what
            happens when a person thinks they contributed something decisive.
          </p>
          <p>
            That last clause is the one indulgences, bought with money for a loved one&apos;s soul,
            sat closest to for Luther. If salvation cannot be bought with works, it cannot be bought
            with coins either.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Timothy 3:16 and 17</h3>
        <VerseQuote
          text="All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works."
          reference="2 Timothy 3:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse behind sola scriptura, the conviction that Scripture is sufficient to
            equip a believer for doctrine and for life.
          </p>
          <p>
            Notice what it does not say. It does not say tradition is worthless, or that teachers are
            unnecessary.{" "}
            <ArticleLink href="/blog/why-bible-study-is-hard">
              Studying the Bible is still hard work
            </ArticleLink>
            , and the reformers wrote entire catechisms to help with it. It says Scripture itself is
            sufficient to make a believer complete, which was the reformers&apos; test for anything the
            Church taught as binding doctrine.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Peter 2:9</h3>
        <VerseQuote
          text="But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light"
          reference="1 Peter 2:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter is writing to ordinary, scattered believers, not to clergy.</p>
          <p>
            He calls the whole church a royal priesthood. That phrase became the backbone of the
            fourth Reformation conviction: every believer has direct access to God through Christ, and
            every believer carries a priestly calling, whatever their job title in the church happens
            to be.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Reformation Day</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Reformation Day and why is it celebrated?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Reformation Day marks the anniversary of October 31, 1517, the date Martin Luther is said to
          have published his 95 Theses against the sale of indulgences. Protestant churches, especially
          Lutheran and Reformed ones, observe it to remember the recovery of salvation by grace through
          faith and the authority of Scripture. Catholic parishes generally do not mark it, since it
          commemorates a break from Rome rather than a shared feast.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Martin Luther write the 95 Theses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luther wrote them to challenge how indulgences were being sold in his region, particularly by
          a friar named Johann Tetzel who was raising funds connected to the rebuilding of St.
          Peter&apos;s Basilica. The theses were framed as points for academic debate, not as a public
          manifesto, which is part of why the speed and reach of their spread caught Luther himself off
          guard.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Martin Luther actually nail the theses to a church door?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That part of the story is disputed among historians. What is documented is that Luther sent
          the theses by letter to his archbishop and bishop. The image of him nailing them to Wittenberg&apos;s
          Castle Church door comes from later accounts, and some historians, going back to research in
          the 1960s, have questioned whether it happened as described. Treat it as tradition rather than
          a verified fact.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between Catholic and Protestant beliefs about salvation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Classic Protestant teaching holds that a person is justified by faith alone, received as a
          gift at the moment they trust Christ. Catholic teaching holds that justification begins with
          grace but is lived out through a lifelong cooperation with grace, including the sacraments.
          The two traditions found real common ground in the 1999 Joint Declaration on the Doctrine of
          Justification, though they still describe the role of good works differently.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Reformation Day a holiday in Germany?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a public holiday in nine of Germany&apos;s sixteen states, concentrated in the
          historically Protestant east and north, including Saxony, Thuringia, and, since 2018, Lower
          Saxony, Bremen, Hamburg, and Schleswig-Holstein. It is not a holiday in Berlin or Hesse. In
          2017, the 500th anniversary year, it was observed as a public holiday across all of Germany.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Catholic Church still sell indulgences?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The Council of Trent ordered the sale of indulgences for money abolished in 1563, while
          keeping the practice of granting indulgences itself, which the Catechism of the Catholic
          Church still teaches today as tied to confession and penance rather than to payment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does sola scriptura mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sola scriptura is Latin for &quot;Scripture alone.&quot; It is the conviction that the Bible
          is the final authority for Christian doctrine, above church tradition or the pronouncements of
          church leaders when the two conflict. It does not mean tradition or teachers are worthless,
          only that they answer to Scripture rather than the other way around.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do Lutheran churches celebrate Reformation Sunday?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many Lutheran and some Reformed congregations hold a Reformation Sunday service on the Sunday
          closest to October 31. Pastors often wear red vestments, associated with the Holy Spirit, and
          the service usually includes the hymn &quot;A Mighty Fortress Is Our God,&quot; which Luther
          wrote, along with preaching on grace, faith, and Scripture.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Martin Luther trying to leave the Catholic Church?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not at first. Luther wrote the 95 Theses as an invitation to academic debate within the
          Church, not as a declaration of separation. The break came gradually, through his
          excommunication and his refusal to recant at the Diet of Worms in 1521, after Rome had already
          judged his teaching heretical.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Reformation Day is not really about a door, a nail, or even a German monk.</p>
          <p>
            📌 <strong>It is about whether grace is something God hands you, or something you spend a
            lifetime earning back toward Him.</strong>
          </p>
          <p>
            Luther&apos;s answer, that it is a gift, received by faith, became the heartbeat of the
            Protestant churches that trace their roots to 1517. The Catholic Church, for its part, has
            never taught that grace is earned from nothing. It teaches that grace is given first and
            then lived out, sacrament by sacrament, across a whole life.
          </p>
          <p>Christians can disagree about how that works and still agree on who it is from.</p>
          <p>
            So here is one way to carry this day. Open Romans. Read it as if the question actually
            matters, because it does.{" "}
            <ArticleLink href="/blog/can-you-lose-your-salvation">
              Whatever your church teaches about keeping your salvation
            </ArticleLink>
            , start with how you got it in the first place.
          </p>
          <p>Not by a purchase. Not by a perfect record. By grace, through faith.</p>
          <p>That is the one thing nearly five centuries of argument never actually changed.</p>
        </div>
      </section>

      <ArticleSources
        checkedOn="26 October 2026"
        sources={[
          {
            title: "Reformation Day",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/Reformation-Day",
            note: "Defines Reformation Day and its traditional link to Luther's 95 Theses on October 31, 1517.",
          },
          {
            title: "Martin Luther Posts 95 Theses",
            publisher: "History.com",
            url: "https://www.history.com/this-day-in-history/october-31/martin-luther-posts-95-theses",
            note: "Account of the theses, the target of Johann Tetzel's indulgence campaign, and the door-nailing tradition.",
          },
          {
            title: "X. Indulgences",
            publisher: "Catechism of the Catholic Church, The Holy See",
            url: "https://www.vatican.va/content/catechism/en/part_two/section_two/chapter_two/article_4/x_indulgences.html",
            note: "Paragraphs 1471 to 1479, the Catholic Church's current teaching on indulgences.",
          },
          {
            title: "The Canons and Decrees of the Council of Trent",
            publisher: "Hanover Historical Texts Project (trans. J. Waterworth, 1848)",
            url: "https://history.hanover.edu/texts/trent.htm",
            note: "Full text of Session 25's 1563 decree retaining indulgences while ordering the abolition of their sale for money.",
          },
          {
            title: "Why all German states except Berlin and Hesse have a holiday next week",
            publisher: "The Local Germany",
            url: "https://www.thelocal.de/20231026/why-all-german-states-except-berlin-and-hesse-have-a-holiday-next-week",
            note: "Which German states observe Reformation Day as a public holiday, including the 2018 additions.",
          },
          {
            title: "Joint Declaration on the Doctrine of Justification",
            publisher: "Catholic Culture (text as signed by the Lutheran World Federation and the Pontifical Council for Promoting Christian Unity)",
            url: "https://www.catholicculture.org/culture/library/view.cfm?RecNum=441",
            note: "Full text of the October 31, 1999 declaration and its stated scope and limits.",
          },
          {
            title: "The Breakthrough",
            publisher: "Christian History Institute",
            url: "https://christianhistoryinstitute.org/magazine/article/luthers-breakthrough",
            note: "On Luther's own account of his 'tower experience' with Romans 1:17, and the scholarly debate over when it occurred.",
          },
          {
            title: "How Did the Diet of Worms Change Christianity?",
            publisher: "Christianity.com",
            url: "https://www.christianity.com/wiki/history/diet-of-worms.html",
            note: "On Charles V convening the 1521 assembly, Luther's excommunication, his refusal to recant, and Frederick III's protection afterward.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
