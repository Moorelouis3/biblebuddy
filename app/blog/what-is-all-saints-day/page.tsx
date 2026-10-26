import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-all-saints-day", {
  title: "What Is All Saints' Day? Meaning, History, and How Christians Celebrate",
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

export default function WhatIsAllSaintsDayPage() {
  return (
    <BlogPostShell
      slug="what-is-all-saints-day"
      title={<>📖 What Is All Saints&apos; Day? Meaning, History, and How Christians Celebrate</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Every church calendar has a day most people walk straight past.</p>
            <p>
              📌 <strong>All Saints&apos; Day falls on November 1, and it is the day the
              Church sets aside to remember every believer who has died in Christ, not
              only the ones with a title, a statue, or a feast day of their own.</strong>
            </p>
            <p>
              Maybe you grew up Catholic and you already know it as a holy day, a Mass you
              are expected to attend the morning after Halloween candy is still on the
              counter.
            </p>
            <p>
              Maybe you grew up Protestant and you have heard the words &quot;All Saints&quot;
              exactly once, read off a church sign, and never thought about it again.
            </p>
            <p>
              Or maybe the only thing November 1 means to you is that it comes right after
              the night with the costumes, and you never connected the two at all.
            </p>
            <p>
              This guide walks through where All Saints&apos; Day actually came from, what the
              Catholic Church teaches about it, where that leaves Protestant and Orthodox
              Christians, and what the Bible itself means when it calls someone a saint.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💙 Why This Matters for Your Faith</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a Catholic background to care about this question.</p>
          <p>
            ⚠️ <strong>All Saints&apos; Day is really asking who belongs to the family of God,
            and what happens to them when they die.</strong>
          </p>
          <p>
            That question sits underneath a lot of grief. A parent who died in the faith.
            A grandmother whose funeral you still think about. A friend from youth group who
            did not make it to thirty.
          </p>
          <p>
            Scripture has an answer for where they are and what they are doing, and it is
            bigger and more specific than a vague feeling that they are &quot;in a better
            place.&quot;
          </p>
          <p>
            Understanding{" "}
            <ArticleLink href="/blog/what-is-heaven">what the Bible actually says about heaven</ArticleLink>{" "}
            changes how you grieve, and it changes how you picture your own life ending too.
          </p>
          <p>
            The word &quot;saint&quot; also carries a lot of baggage. For some readers it means a
            dead person on a stained glass window. For others it is a word the New Testament
            uses for every single Christian, living or dead, famous or never mentioned by
            name.
          </p>
          <p>Both of those uses of the word are real, and this guide is where you sort out which one the Bible is actually using, and when.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 What All Saints&apos; Day Actually Is</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. What the Day Marks and When It Falls</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>All Saints&apos; Day is set on November 1 every year in the Western Church.</p>
          <p>
            In the Catholic Church it is a solemnity, the highest rank a feast day can carry,
            and in the United States it is a holy day of obligation, meaning Catholics are
            expected to attend Mass that day the same as on a Sunday.
          </p>
          <p>
            📌 <strong>It does not honor only the saints with a capital S, the ones who got
            canonized and have a statue.</strong> It honors every believer the Church
            trusts is already with God in glory, known by name or not.
          </p>
          <p>That includes the apostles. It also includes nobody in particular. Your great great grandmother who prayed quietly and never made a list.</p>
          <p>November 2, the very next day, is a separate observance called All Souls&apos; Day, set apart for the faithful departed still being prepared for heaven rather than already there. The two days are related but they are not the same day.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. How the Day Began, From a Roman Temple to November 1</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The story starts earlier than you would guess, and in an odd building.</p>
          <p>
            In the year 609, Pope Boniface IV took the Pantheon, a domed Roman temple
            originally built for every god of the empire, and dedicated it as a Christian
            church in honor of the Virgin Mary and all the martyrs.
          </p>
          <p>
            That first feast was kept on May 13, not November 1, and it only covered
            martyrs, Christians killed for their faith.
          </p>
          <p>
            The move to November 1, and the move to cover all saints rather than only
            martyrs, is credited to Pope Gregory III, who ruled from 731 to 741. He
            dedicated a chapel inside St. Peter&apos;s Basilica in Rome to all the saints
            and fixed its anniversary on November 1.
          </p>
          <p>
            A century later, Pope Gregory IV, who ruled from 827 to 844, extended that
            November 1 celebration from one chapel in Rome to the entire Church.
          </p>
          <p>
            💡 <strong>So the date is not arbitrary and it is not ancient either.</strong> It
            took over two centuries, and two different popes named Gregory, to settle on
            November 1 for the whole Church.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. What the Catholic Church Actually Teaches</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            It is worth stating the Catholic teaching the way the Church itself states it,
            rather than the version that gets passed around secondhand.
          </p>
          <p>
            The Catechism of the Catholic Church teaches that the phrase &quot;communion of
            saints&quot; has two linked meanings. It means communion in holy things,
            centered on the Eucharist, and it means communion among holy people, the living
            and the dead, bound together in Christ.
          </p>
          <p>
            The Catechism puts it plainly: those who already dwell in heaven &quot;do not
            cease to intercede with the Father for us,&quot; and their care for believers
            still on earth &quot;greatly helps our weakness.&quot;
          </p>
          <p>
            📌 <strong>That belief, that the saints in heaven are actively praying for
            Christians still alive, is the real theological center of the day.</strong> All
            Saints&apos; Day is not a memorial the way a museum exhibit is a memorial. In
            Catholic teaching it is closer to a family reunion where half the family is
            already home.
          </p>
          <p>
            That is also why the Catholic Church treats it as a day serious enough to
            require Mass attendance, the same obligation a Sunday carries, in every Latin
            Rite diocese in the United States.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Not Every Church Keeps It the Same Way, or on the Same Day</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>November 1 is the Western date. It is not the only date.</p>
          <p>
            The Eastern Orthodox Church keeps its own Sunday of All Saints on the first
            Sunday after Pentecost, which moves every year because Pentecost itself moves
            with Easter.
          </p>
          <p>
            On that Sunday, Orthodox parishes commemorate &quot;all of the Saints,&quot;
            named and unknown, as the fruit the Holy Spirit produced after descending on the
            Church at Pentecost. The connection to Pentecost, rather than to a fixed date on
            the calendar, is the whole point for them.
          </p>
          <p>
            That is one more reminder that the church calendar is not one single thing every
            Christian everywhere shares. If you have ever wondered{" "}
            <ArticleLink href="/blog/why-so-many-denominations">
              why Christians ended up with so many denominations
            </ArticleLink>{" "}
            keeping so many different calendars, this is a small, low stakes example of a
            much bigger pattern. Shared faith, divided practice.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Does Halloween Actually Come From a Pagan Festival?</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You cannot write about November 1 without someone asking about October 31.</p>
          <p>
            The popular version of the story says the ancient Celtic festival Samhain marked
            the Celtic new year, that the Celts believed the line between the living and the
            dead grew thin that night, and that the Church placed All Saints&apos; Day on
            November 1 to cover the same ground the old festival already held, with All
            Hallows&apos; Eve, shortened over time to Halloween, as the night before it.
          </p>
          <p>
            ⚠️ <strong>That version is widely repeated, but it is not the only position
            researchers hold.</strong> The historian Ronald Hutton, in his study of the
            English ritual year, argues the direction actually ran the other way in the
            British Isles. All Saints&apos; Day moved in and took over where Samhain had
            been, rather than the Church designing its feast around Samhain on purpose, and
            he places most of what we now call Halloween customs later still, developing
            mainly after the Reformation rather than carrying straight through from the
            Celts.
          </p>
          <p>
            What is solid either way: the name Halloween does come from the Church calendar.
            &quot;Hallow&quot; is an old word for saint, All Saints&apos; Day was once called
            All Hallows, and its eve became All Hallows&apos; Eve, then Halloween. That part
            is simple word history, not theory.
          </p>
          <p>
            What is not solid is the confident claim that the Church picked November 1
            specifically to stamp out one particular Celtic holiday. Treat that as a theory
            with real supporters and real critics, not a settled fact you repeat at a party.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. What the Bible Actually Calls a Saint</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is where the word &quot;saint&quot; gets confusing if you only know the Catholic use of it.</p>
          <p>Open almost any letter Paul wrote, and watch who he calls a saint.</p>
        </div>
        <VerseQuote
          text="To all that be in Rome, beloved of God, called to be saints: Grace to you and peace from God our Father, and the Lord Jesus Christ."
          reference="Romans 1:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is not writing to a committee of specially approved believers.</p>
          <p>He is writing to an ordinary church, full of ordinary people, in Rome.</p>
        </div>
        <VerseQuote
          text="Paul and Timotheus, the servants of Jesus Christ, to all the saints in Christ Jesus which are at Philippi, with the bishops and deacons:"
          reference="Philippians 1:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In the New Testament, &quot;saint&quot; usually just means a believer
            set apart for God, not a believer promoted above other believers.</strong> That
            is the sense most Protestant churches mean when they say the word at all.
          </p>
          <p>
            Hebrews pictures that whole company, the believers who have already finished the
            race, surrounding the ones still running it.
          </p>
        </div>
        <VerseQuote
          text="Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us,"
          reference="Hebrews 12:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That is the Bible&apos;s own picture behind a day like this one. Not a stadium
            of strangers. A crowd of people who already ran your exact race, cheering from
            the stands.
          </p>
          <p>Jesus names the same crowd when He opens the Sermon on the Mount.</p>
        </div>
        <VerseQuote
          text="Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake. Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you."
          reference="Matthew 5:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That passage, the Beatitudes, is the Gospel reading the Catholic Church assigns
            to every Mass for the Solemnity of All Saints, alongside Revelation 7 and
            1 John 3. The connection is not an accident.
          </p>
          <p>
            💡 <strong>Whatever else divides Christians over this day, nobody disagrees
            that Jesus promised a reward in heaven to ordinary, pressed on, falsely accused
            people.</strong> That promise is the actual heart of the holiday, underneath
            every argument about dates and calendars.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. Where Protestants Differ, and Why</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Most Protestant discomfort with All Saints&apos; Day does not come from the word
            &quot;saint&quot; itself. It comes from what the Catholic Church ties to the day
            right alongside it, especially the doctrine of purgatory and prayer for the
            dead.
          </p>
          <p>
            Lutheran and Anglican churches kept All Saints&apos; Day after the Reformation,
            and many Protestant churches today mark the first Sunday of November, sometimes
            combining it with All Souls&apos; Day into one service that focuses on
            remembering and thanking God for believers who have died, rather than praying
            them out of purgatory.
          </p>
          <p>
            Other Protestant traditions skip the day entirely, not because they reject that
            dead believers are with Christ, but because they see no biblical command to mark
            a special day for it, and they read the New Testament&apos;s &quot;saints&quot;
            language as proof every believer already carries that title now, with nothing
            extra to add on November 1.
          </p>
          <p>
            That split traces back to the same root argument behind{" "}
            <ArticleLink href="/blog/what-is-reformation-day">Reformation Day itself</ArticleLink>
            , the one about where final religious authority sits, Scripture alone or
            Scripture read alongside developing church tradition.
          </p>
          <p>
            And underneath the calendar argument sits a more personal one.{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              How you know you are saved
            </ArticleLink>{" "}
            shapes whether you picture the saints in heaven as people still being perfected,
            or people already finished, the moment they died in Christ.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">✅ Practical Tips for All Saints&apos; Day</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whatever church you belong to, this day can still mean something to you personally.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Read Hebrews 12:1 out loud on November 1.</strong> Picture the specific
            believers who finished their race before you. Name them if you can.
          </li>
          <li>
            <strong>Write down the name of someone who shaped your faith and has died.</strong>{" "}
            A grandparent, a pastor, a friend. Thank God for them by name, not in general.
          </li>
          <li>
            <strong>Read Matthew 5:1 through 12 slowly.</strong> That is the passage the
            Church has read on this day for centuries. Ask which Beatitude describes your
            life right now.
          </li>
          <li>
            <strong>Learn one story from church history you did not already know.</strong>{" "}
            Reading about{" "}
            <ArticleLink href="/blog/inspiring-biblical-characters">
              ordinary people in Scripture who followed God faithfully
            </ArticleLink>{" "}
            is a good place to start, since most of the saints this day honors were never
            famous either.
          </li>
          <li>
            <strong>Ask a Catholic friend what the day means to them.</strong> Ask honestly,
            not to win an argument. You will likely hear something closer to gratitude than
            to superstition.
          </li>
          <li>
            <strong>Resist letting Halloween swallow the whole week.</strong> Costumes and
            candy are not the enemy. Just do not let them crowd out the older, deeper thing
            November 1 is actually about.
          </li>
          <li>
            <strong>Remember that if you are in Christ, the New Testament already calls you
            a saint.</strong> Let that shape how you carry yourself this week, not as pride,
            but as an identity you did not earn and cannot lose by having a bad day.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Top 4 Bible Verses About the Saints</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scripture talks about the saints far more than most readers expect.</p>
          <p>Here are four passages worth knowing by heart.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Revelation 7:9 and 10</h3>
        <VerseQuote
          text="After this I beheld, and, lo, a great multitude, which no man could number, of all nations, and kindreds, and people, and tongues, stood before the throne, and before the Lamb, clothed with white robes, and palms in their hands; And cried with a loud voice, saying, Salvation to our God which sitteth upon the throne, and unto the Lamb."
          reference="Revelation 7:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the clearest picture the Bible gives of what All Saints&apos; Day is actually pointing toward.</p>
          <p>Not one nation. Not one church. A multitude too large to count, out of every nation and language that has ever existed.</p>
          <p>That includes believers whose names nobody wrote down. It includes you, if you belong to Christ.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Revelation 7:14</h3>
        <VerseQuote
          text="And I said unto him, Sir, thou knowest. And he said to me, These are they which came out of great tribulation, and have washed their robes, and made them white in the blood of the Lamb."
          reference="Revelation 7:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what makes those robes white. Not a clean record. Not a lifetime without failure.</p>
          <p>
            <strong>The blood of the Lamb.</strong>
          </p>
          <p>Every saint in that crowd got there the same way, through what Christ did, not through what they managed to avoid doing wrong.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Revelation 7:17</h3>
        <VerseQuote
          text="For the Lamb which is in the midst of the throne shall feed them, and shall lead them unto living fountains of waters: and God shall wipe away all tears from their eyes."
          reference="Revelation 7:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you are grieving someone right now, read this one twice.</p>
          <p>The saints in heaven are not floating in some vague peace. They are being fed, led, and personally comforted by the same Lamb who died for them.</p>
          <p>God himself wipes the tears. Not an angel assigned to the task. God himself.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Corinthians 1:2</h3>
        <VerseQuote
          text="Unto the church of God which is at Corinth, to them that are sanctified in Christ Jesus, called to be saints, with all that in every place call upon the name of Jesus Christ our Lord, both theirs and ours:"
          reference="1 Corinthians 1:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul wrote this to the single messiest church in the New Testament. Division, lawsuits, sexual sin, arguments over which teacher was best.</p>
          <p>And he still calls them saints, in the very first sentence, before he corrects a single thing.</p>
          <p>
            📌 <strong>Being a saint, in Bible language, was never about having your life
            together.</strong> It was about belonging to Christ.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About All Saints&apos; Day</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is All Saints&apos; Day and why is it celebrated?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All Saints&apos; Day, celebrated November 1, is the day the Western Church sets
          aside to honor every believer who has died in Christ, canonized or not. It grew
          out of an earlier feast for martyrs and was fixed on November 1 for the whole
          Church by Pope Gregory IV in the ninth century. For Catholics it is a solemnity
          and a holy day of obligation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is All Saints&apos; Day the same as Halloween?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Halloween, from &quot;All Hallows&apos; Eve,&quot; is the evening before All
          Saints&apos; Day, October 31. The name comes from the Church calendar, but the
          modern costumes and candy traditions are a much later development, and historians
          disagree over exactly how much of Halloween traces back to the old Celtic festival
          Samhain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between All Saints&apos; Day and All Souls&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All Saints&apos; Day, November 1, honors believers the Church holds are already
          with God in heaven. All Souls&apos; Day, November 2, is set apart to pray for the
          faithful departed still being purified, in Catholic teaching, before entering
          heaven&apos;s full presence of God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants celebrate All Saints&apos; Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some do. Lutheran and Anglican churches kept the day after the Reformation, often
          observing it the first Sunday of November, with a focus on thanksgiving for
          departed believers rather than prayer for the dead. Many other Protestant
          churches do not mark it at all, holding that every believer is already a saint
          in the New Testament sense, with no separate day required.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it biblical to pray to saints?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Catholic and Orthodox Christians ask departed saints to pray for them, the same
          way you might ask a living friend to pray for you, and they do not consider this
          worship. Most Protestants read Scripture&apos;s instruction to pray to God alone
          and conclude there is no biblical command, and no clear biblical example, of
          believers asking the dead to intercede for them. This remains one of the real,
          unresolved differences between the traditions.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the Bible mean when it calls someone a saint?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In the New Testament, the word almost always means an ordinary believer set apart
          for God through faith in Christ, not someone officially recognized after death.
          Paul addresses entire churches, including deeply flawed ones like Corinth, as
          saints in the opening lines of his letters.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is November 1 a holy day of obligation for Catholics?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Catholic Church ranks All Saints&apos; Day as a solemnity, its highest category
          of feast, which places it alongside Sundays as a day Mass attendance is required
          in Latin Rite dioceses in the United States. The obligation is lifted only in
          years when November 1 falls on a Saturday or a Monday.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Orthodox Church celebrate All Saints&apos; Day on November 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The Eastern Orthodox Church keeps its own Sunday of All Saints on the first
          Sunday after Pentecost, a date that moves each year with Easter rather than
          staying fixed on November 1 like the Western calendar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the Catholic Church invent All Saints&apos; Day to replace a pagan holiday?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That is a popular claim, but it is not settled history. Some writers argue the
          Church placed the feast on November 1 to cover the Celtic festival Samhain. Other
          historians, including Ronald Hutton in his study of the English ritual year,
          argue the evidence points the other way, with All Saints&apos; Day simply taking
          over the season rather than being designed around an older festival on purpose.
          Treat it as a genuinely disputed question.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">If I am not Catholic, should I do anything on November 1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          You do not need to attend Mass to let the day shape you. Reading Hebrews 12:1 and
          Revelation 7, and thanking God by name for believers who shaped your faith and
          have since died, honors the same truth the holiday points to, whatever church you
          belong to.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>All Saints&apos; Day started as one pope dedicating one chapel to martyrs he could not name individually.</p>
          <p>
            📌 <strong>Nearly thirteen centuries later, it is still doing the same basic
            job: insisting that the Christians who came before you are not gone, and that
            you belong to the same family they belonged to.</strong>
          </p>
          <p>
            Catholics mark that with Mass and a theology of saints actively praying for the
            living. Orthodox Christians mark it on a different Sunday tied to Pentecost.
            Many Protestants mark it quietly, or not at all, holding that the title
            &quot;saint&quot; already belongs to every believer, living or dead, right now.
          </p>
          <p>Those really are different answers. Do not let anyone flatten them into one.</p>
          <p>
            But underneath all three sits the same cloud of witnesses from Hebrews 12,
            the same multitude from Revelation 7, the same Lamb whose blood, not anyone&apos;s
            good record, made their robes white.
          </p>
          <p>
            So here is one way to carry November 1, wherever you worship. Name someone who
            is gone. Thank God for them, specifically. And remember that the race you are
            still running is being watched by people who already finished it.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="26 October 2026"
        sources={[
          {
            title: "History of Halloween",
            publisher: "History.com",
            url: "https://www.history.com/articles/history-of-halloween",
            note: "On the Celtic festival Samhain, Pope Boniface IV's 609 Pantheon dedication, and Pope Gregory III's eighth century move to November 1.",
          },
          {
            title: "All Saints' Day",
            publisher: "Catholic Encyclopedia (1913), via Wikisource",
            url: "https://en.wikisource.org/wiki/Catholic_Encyclopedia_(1913)/All_Saints%27_Day",
            note: "On Pope Gregory III (731 to 741) fixing the November 1 date, and Pope Gregory IV (827 to 844) extending it to the whole Church.",
          },
          {
            title: "Paragraph 5: The Communion of Saints",
            publisher: "Catechism of the Catholic Church, The Holy See",
            url: "https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_three/article_9/paragraph_5_the_communion_of_saints.html",
            note: "Paragraphs 946 to 962, the Catholic Church's current teaching on the communion of saints and their intercession for the living.",
          },
          {
            title: "Canon 1246 - Holy Days of Obligation",
            publisher: "United States Conference of Catholic Bishops",
            url: "https://www.usccb.org/beliefs-and-teachings/what-we-believe/canon-law/complementary-norms/canon-1246",
            note: "On All Saints' Day as a holy day of obligation in the United States, and when that obligation is lifted.",
          },
          {
            title: "Sunday of All Saints",
            publisher: "Monastery of the Holy Myrrhbearers",
            url: "https://www.monasterevmc.org/blogs/english-blog/sunday-of-all-saints",
            note: "On the Eastern Orthodox observance of All Saints on the first Sunday after Pentecost.",
          },
          {
            title: "All Saints' Day",
            publisher: "Christian Resource Institute (crivoice.org)",
            url: "https://crivoice.org/allsaints.html",
            note: "On Lutheran and Anglican retention of the day after the Reformation, and Protestant discomfort tied to the doctrine of purgatory.",
          },
          {
            title: "From My Diary: Thinking About All Saints' Day",
            publisher: "Roger Pearse",
            url: "https://roger-pearse.com/weblog/2019/10/03/from-my-diary-thinking-about-all-saints-day",
            note: "Reporting historian Ronald Hutton's conclusion, in Stations of the Sun, that All Saints' Day displaced Samhain rather than being built around it, and that most Halloween customs developed after the Reformation.",
          },
          {
            title: "Mass Readings for November 1, Solemnity of All Saints",
            publisher: "United States Conference of Catholic Bishops",
            url: "https://bible.usccb.org/bible/readings/110122.cfm",
            note: "Confirms Matthew 5:1-12a, alongside Revelation 7:2-4, 9-14 and 1 John 3:1-3, as the fixed Mass readings for the Solemnity of All Saints.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
