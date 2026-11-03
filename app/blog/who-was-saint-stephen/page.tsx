import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-saint-stephen", {
  title: "Who Was Saint Stephen? Why Christians Remember Him on December 26",
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

export default function WhoWasSaintStephenPage() {
  return (
    <BlogPostShell
      slug="who-was-saint-stephen"
      title={<>📖 Who Was Saint Stephen? Why Christians Remember Him on December 26</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The day after Christmas, most of the world is returning gifts and eating leftovers.</p>
            <p>The church calendar does something much stranger.</p>
            <p>It hands you a man being dragged out of a city and stoned to death.</p>
            <p>
              📌 <strong>Saint Stephen was one of the first seven deacons in the earliest church,
              and the first Christian ever killed for his faith. His story is told in just three
              chapters of Acts, and it ends with him forgiving the men who are killing him.</strong>
            </p>
            <p>
              December 26 is not a random square on the calendar. The church put the first martyr
              right next to the manger on purpose.
            </p>
            <p>
              This is Stephen&apos;s story, straight from Acts, and why Christians still remember
              him the morning after Christmas.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Saint Stephen Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stephen shows up with no introduction and no family history.</p>
          <p>
            Acts simply calls him a man full of faith and of the Holy Ghost, chosen as one of
            seven men to serve the growing church in Jerusalem, only a few years after the
            resurrection.
          </p>
          <p>
            📌 His whole story runs from <strong>Acts 6:1</strong> to <strong>Acts 8:2</strong>,
            barely three chapters, in the earliest days after Pentecost.
          </p>
          <p>
            His name, Stephanos in Greek, means crown. That Greek name is also the detail
            scholars point to as evidence he was a Hellenist, a Greek speaking Jew, rather than
            part of the Aramaic speaking majority in Jerusalem.
          </p>
          <p>
            💡 Understand this and the rest makes sense: Stephen was never ordained to preach. He
            was appointed to wait on tables. Everything that happens to him grows out of a job
            nobody thought was glamorous.
          </p>
          <p>Here is how it actually went.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life and Death of Saint Stephen</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Chosen to Serve the Widows</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The church in Jerusalem was growing fast, and the growth created a real problem.</p>
          <p>
            Greek speaking widows were being left out of the daily food distribution while
            Hebrew speaking widows were cared for. The apostles could not keep preaching and
            personally manage every meal.
          </p>
          <p>So they asked the whole community to choose seven men for the job.</p>
        </div>
        <VerseQuote
          text="And the saying pleased the whole multitude: and they chose Stephen, a man full of faith and of the Holy Ghost, and Philip, and Prochorus, and Nicanor, and Timon, and Parmenas, and Nicolas a proselyte of Antioch."
          reference="Acts 6:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stephen is named first on that list, every time Scripture repeats it.</p>
          <p>
            📌 <strong>His first assignment in the church was not preaching. It was making sure
            widows got fed.</strong>
          </p>
          <p>
            That is why the Catholic Church and most church historians call these seven the first
            deacons, from the Greek word for servant, even though Acts itself never uses the title
            deacon for them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A Man Nobody Could Answer</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Serving tables did not keep Stephen quiet for long.</p>
        </div>
        <VerseQuote
          text="And Stephen, full of faith and power, did great wonders and miracles among the people... And they were not able to resist the wisdom and the spirit by which he spake."
          reference="Acts 6:8 to 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jewish teachers from several synagogues tried to debate him and kept losing.</p>
          <p>
            💡 <strong>Nobody handed Stephen a pulpit. He earned a hearing by being right in
            public, again and again.</strong>
          </p>
          <p>That is a dangerous way to make enemies, and it worked exactly that way here.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Accused of Blasphemy</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>When Stephen&apos;s opponents could not win the argument, they changed the game.</p>
        </div>
        <VerseQuote
          text="And set up false witnesses, which said, This man ceaseth not to speak blasphemous words against this holy place, and the law: For we have heard him say, that this Jesus of Nazareth shall destroy this place, and shall change the customs which Moses delivered us."
          reference="Acts 6:13 to 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>They paid men to lie, then dragged him in front of the Jewish council, the Sanhedrin.</p>
          <p>
            ⚠️ This is the exact same council and the same charge used against Jesus a short time
            earlier. Stephen was not facing a new kind of trouble. He was facing the same trouble
            his Lord had already faced.
          </p>
          <p>Then something happened that the council was not ready for.</p>
        </div>
        <VerseQuote
          text="And all that sat in the council, looking stedfastly on him, saw his face as it had been the face of an angel."
          reference="Acts 6:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 Everyone in that room was looking for a criminal. Scripture says they saw something
            closer to an angel.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A Sermon on Centuries of History</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Given the chance to defend himself, Stephen did not plead his case.</p>
          <p>
            He walked the council through Abraham, Joseph, Moses, and the exodus, then told them
            plainly that their ancestors had always resisted the Holy Spirit and killed the
            prophets who warned them, and that they had just done the same thing to the Righteous
            One.
          </p>
          <p>⚠️ That is not a defense. That is a verdict, delivered by the man on trial.</p>
          <p>The council reacted exactly how you would expect, and Stephen kept going anyway.</p>
        </div>
        <VerseQuote
          text="But he, being full of the Holy Ghost, looked up stedfastly into heaven, and saw the glory of God, and Jesus standing on the right hand of God, And said, Behold, I see the heavens opened, and the Son of man standing on the right hand of God."
          reference="Acts 7:55 to 56"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>At the exact moment his life was ending, Stephen was not looking at the
            men around him. He was looking at Jesus.</strong>
          </p>
          <p>
            That is the only place in the New Testament outside the Gospels where someone is
            recorded seeing Jesus standing, rather than seated, at the right hand of God. The rest
            of the New Testament pictures Him seated there, so this one exception is worth
            noticing on its own.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Stoned Outside the City</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The council did not wait for a formal sentence.</p>
          <p>
            They dragged Stephen outside the city walls. The witnesses laid their coats at the
            feet of a young man watching, so he could help with the stoning. His name was Saul.
          </p>
        </div>
        <VerseQuote
          text="And they stoned Stephen, calling upon God, and saying, Lord Jesus, receive my spirit. And he kneeled down, and cried with a loud voice, Lord, lay not this sin to their charge. And when he had said this, he fell asleep."
          reference="Acts 7:59 to 60"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>His last recorded words were a prayer for the men killing him, not against
            them.</strong>
          </p>
          <p>
            Fell asleep is the Bible&apos;s own gentle word for his death, the same word it uses
            for believers who die trusting they will wake again.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Saul, the Scattering, and What Tradition Says Came After</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke does not let the young man holding the coats disappear from the story.</p>
        </div>
        <VerseQuote
          text="And Saul was consenting unto his death. And at that time there was a great persecution against the church which was at Jerusalem; and they were all scattered abroad throughout the regions of Judaea and Samaria, except the apostles."
          reference="Acts 8:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That same Saul goes on to hunt Christians from house to house, before his own
            encounter with the risen Christ turns him into{" "}
            <ArticleLink href="/blog/paul">the apostle Paul</ArticleLink>. Stephen never lived to
            see it, but the man he died praying for became the greatest missionary of the early
            church.
          </p>
          <p>
            ⚠️ Be honest about what comes next: it is church tradition, not Scripture, and the
            ancient sources do not fully agree with each other. The Catholic Encyclopedia records
            that Stephen&apos;s tomb was lost for centuries until a priest named Lucian reported a
            vision in the year 415 pointing to Caphar Gamala, north of Jerusalem. The relics were
            moved first to a church on Mount Sion, then around the year 460 to a new basilica
            built outside Jerusalem&apos;s Damascus Gate.
          </p>
          <p>
            The Orthodox Church in America keeps a different detail from the same general
            tradition: that two secret believers inside the council, Gamaliel and his son Habib,
            risked their own safety to bury Stephen&apos;s body honorably. Acts itself only says
            devout men carried him to his burial and mourned him greatly, so the names belong to
            later tradition, not to the biblical text.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Saint Stephen&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The small job comes before the big one</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stephen was appointed to serve food, not to preach or perform miracles.</p>
          <p>❓ What has God actually put in front of you right now, and are you treating it as beneath you?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Boldness does not require surviving</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stephen kept preaching the truth about Jesus knowing exactly what it would cost him.</p>
          <p>📌 Faithfulness was never the same thing as safety, for him or for the apostles who outlived him.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Forgiveness can outrun pain</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stephen prayed for the men stoning him while they were still doing it.</p>
          <p>💡 That prayer did not wait for the pain to end. It happened in the middle of it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. You rarely see the fruit of your own death</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stephen never learned that Saul became Paul.</p>
          <p>
            📌 <strong>Some seeds you plant are only harvested by the next generation, or by the
            very person you thought was your enemy.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Saint Stephen&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Acts 6:5</h3>
        <VerseQuote
          text="And the saying pleased the whole multitude: and they chose Stephen, a man full of faith and of the Holy Ghost, and Philip, and Prochorus, and Nicanor, and Timon, and Parmenas, and Nicolas a proselyte of Antioch."
          reference="Acts 6:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Full of faith and of the Holy Ghost is his introduction, before a single miracle.</p>
          <p>📌 Character came first. Everything else in his story grows out of it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Acts 6:8 to 10</h3>
        <VerseQuote
          text="And Stephen, full of faith and power, did great wonders and miracles among the people."
          reference="Acts 6:8 to 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the word wonders, not arguments.</p>
          <p>💡 God backed up his preaching with power, which is exactly why his enemies had to resort to lies.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Acts 7:55 to 56</h3>
        <VerseQuote
          text="But he, being full of the Holy Ghost, looked up stedfastly into heaven, and saw the glory of God, and Jesus standing on the right hand of God."
          reference="Acts 7:55 to 56"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stedfastly is an old word for a steady, unwavering gaze.</p>
          <p>📌 He was not glancing at heaven for comfort. He was staring straight at it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Acts 7:59 to 60</h3>
        <VerseQuote
          text="And they stoned Stephen, calling upon God, and saying, Lord Jesus, receive my spirit. And he kneeled down, and cried with a loud voice, Lord, lay not this sin to their charge."
          reference="Acts 7:59 to 60"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two prayers, back to back. One for himself, one for his killers.</p>
          <p>💡 He spent his last breath on someone else&apos;s forgiveness, not his own fear.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Acts 8:1</h3>
        <VerseQuote
          text="And Saul was consenting unto his death. And at that time there was a great persecution against the church which was at Jerusalem."
          reference="Acts 8:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Consenting is a quiet word for a man who later called himself the chief of sinners.</p>
          <p>
            📌 The worst day in the early church&apos;s history was also the day it started
            spreading into{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              the wider world the church calendar still tracks today
            </ArticleLink>
            .
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Saint Stephen</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Saint Stephen a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. He appears by name across Acts 6 through 8 as one of the seven men chosen to serve
          the early Jerusalem church, and as the first Christian killed for his faith. His story is
          biblical history, not legend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Stephen called the first martyr?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Acts 7 records him as the first follower of Jesus killed specifically for his
          testimony about Christ. Vatican News still calls him by the Greek title protomartyr,
          meaning first martyr, on his feast day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Stephen one of the twelve apostles?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. He was one of seven men chosen by the whole Jerusalem community in Acts 6 to care
          for widows and manage daily needs, a group tradition later called the first deacons. He
          was never one of the Twelve.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Stephen stoned?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          False witnesses accused him of blasphemy against the temple and the law of Moses. When
          he answered by declaring that Jesus stood at the right hand of God, the council dragged
          him outside the city and stoned him without a formal sentence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Saint Stephen have to do with Saul, who became Paul?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Saul was present at Stephen&apos;s stoning, guarding the coats of the men throwing the
          stones, and Scripture says he approved of his death. That same Saul later became the
          apostle Paul, after his own encounter with the risen Jesus on the road to Damascus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Saint Stephen&apos;s feast on December 26?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Western churches have long kept the days right after Christmas for those closest to
          Christ, a custom Catholic writers call the comites Christi, or companions of Christ.
          Stephen the first martyr comes first, on December 26, followed by the apostle John on
          December 27 and the Holy Innocents on December 28.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do all Christians celebrate Saint Stephen&apos;s Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Catholics, Anglicans, and many Lutherans keep December 26 on their calendars, and the
          Church of England&apos;s Book of Common Prayer still assigns the day its own readings. Eastern
          Orthodox Christians honor him a day later, on December 27, and many low church Protestant
          traditions mark the day quietly or not at all, since they do not follow a fixed calendar
          of saints.{" "}
          <ArticleLink href="/blog/catholic-vs-protestant-church-calendars">
            How Catholic and Protestant calendars differ
          </ArticleLink>{" "}
          explains why that gap exists.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Saint Stephen&apos;s Day the same as Boxing Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They fall on the same date in the Western calendar, December 26, but they are not the
          same thing. Saint Stephen&apos;s Day is the church&apos;s feast for the first martyr. Boxing Day is
          a separate British civic custom that grew up alongside it on the same date.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Saint Stephen the patron saint of?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Vatican News lists him as the patron of stoneworkers and masons, a patronage drawn
          directly from the manner of his death. He is also honored as a patron of deacons, given
          his place as the first of the seven chosen to serve in Acts 6.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where in the Bible is Saint Stephen&apos;s story found?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Acts 6:1 through Acts 8:2. His selection as a deacon is in Acts 6:1 to 7, his trial and
          sermon run through Acts 6:8 to 7:53, and his death and burial close out Acts 7:54 to 8:2.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Stephen never asked to be first at anything.</p>
          <p>He signed up to serve food to widows, and the job led him straight to a trial, a sermon, and a death he could have avoided by saying less.</p>
          <p>
            📌 <strong>He is remembered the day after Christmas because the church wanted
            Christmas joy to sit right next to the cost of actually following Christ.</strong>
          </p>
          <p>That is not a grim addition to the holiday. It is an honest one.</p>
          <p>❓ If the truth you believe cost you something today, would you still say it out loud?</p>
          <p>
            Read <ArticleLink href="/blog/what-is-christmastide">what the twelve days of
            Christmastide actually hold</ArticleLink> and notice how quickly the season turns from
            a manger to a martyr, and from a martyr to a mission that reached the whole world.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="3 November 2026"
        sources={[
          {
            title: "Saint of the Day, 26 December: St. Stephen, First Martyr",
            publisher: "Vatican News",
            url: "https://www.vaticannews.va/en/saints/12/26.html",
            note: "The source for Stephen's title of protomartyr, the fact of his stoning, and his patronage of stoneworkers and masons.",
          },
          {
            title: "St. Stephen",
            publisher: "Catholic Encyclopedia (1907), New Advent",
            url: "https://www.newadvent.org/cathen/14286b.htm",
            note: "The source for Stephen's background as a Hellenist Jew, his election in Acts 6, his trial and speech, Saul's presence at the stoning, and the later tradition of his relics being found by Lucian in 415, moved to Mount Sion, then to a basilica near the Damascus Gate around 460.",
          },
          {
            title: "Protomartyr and Archdeacon Stephen",
            publisher: "Orthodox Church in America",
            url: "https://www.oca.org/saints/all-lives/2012/12/27",
            note: "The source for the Eastern tradition that Gamaliel and his son Habib secretly buried Stephen, the Orthodox commemoration on December 27, and the separate commemorations of his relics on August 2 and September 15.",
          },
          {
            title: "Saint Stephen's Day",
            publisher: "The Church of England, Book of Common Prayer",
            url: "https://www.churchofengland.org/prayer-and-worship/worship-texts-and-resources/book-common-prayer/collects-epistles-and-gospels-5",
            note: "The source for the Church of England keeping Saint Stephen's Day in its own Book of Common Prayer calendar in the Christmas season.",
          },
          {
            title: "The First of the King's Entourage: The Comites Christi Have Entered the Court",
            publisher: "Aleteia",
            url: "https://aleteia.org/2018/12/26/the-first-of-the-kings-entourage-the-comites-christi-have-entered-the-court",
            note: "The source for the comites Christi tradition explaining why Stephen, John, and the Holy Innocents are commemorated on the three days right after Christmas.",
          },
          {
            title: "4736. Stephanos",
            publisher: "Strong's Concordance, BibleHub",
            url: "https://biblehub.com/greek/4736.htm",
            note: "The source for the Greek word Stephanos, Stephen's name, meaning crown or wreath.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
