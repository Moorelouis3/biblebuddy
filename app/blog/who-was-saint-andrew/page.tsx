import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-saint-andrew", {
  title: "Who Was Saint Andrew? The Apostle's Story and Feast Day",
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

export default function WhoWasSaintAndrewPage() {
  return (
    <BlogPostShell
      slug="who-was-saint-andrew"
      title={<>📖 Who Was Saint Andrew? The Apostle&apos;s Story and Feast Day</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>He is almost always standing next to his brother in the lists.</p>
            <p>Peter gets the name change, the sermon at Pentecost, the keys.</p>
            <p>Andrew gets a single line, and then he is gone from the page.</p>
            <p>
              📌 <strong>But look closer and Andrew is the one who brought Peter to Jesus in the
              first place. Every time Andrew shows up in the Gospels, he is introducing someone
              else to Christ.</strong>
            </p>
            <p>Scotland flies a flag shaped like the cross he died on, and most people have no idea why.</p>
            <p>
              This is the real story of Saint Andrew. The fisherman, the first one called, the
              brother who could not keep the good news to himself, and the cross that still flies
              over a country he never set foot in.
            </p>
            <p>Let&apos;s start with who he actually was.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Saint Andrew Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew was a fisherman from Bethsaida, a town on the Sea of Galilee.</p>
          <p>His father&apos;s name was Jonah, or John, depending on the Gospel.</p>
          <p>
            📌 <strong>He was Simon Peter&apos;s brother, and the two of them ran the same fishing
            business together on the same water.</strong>
          </p>
          <p>By the time Jesus began His public ministry, Andrew and Peter shared a house in Capernaum.</p>
          <p>
            Before any of that, Andrew was already a disciple of John the Baptist, out in the
            desert, waiting for something to happen.
          </p>
          <p>
            💡 Understand this and the rest of his story makes sense: Andrew was already looking
            for the Messiah before he ever met Jesus. He just did not know yet who it was.
          </p>
          <p>Now here is how it actually went.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life of Saint Andrew the Apostle</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Day John the Baptist Pointed at Jesus</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew was standing with John the Baptist when Jesus walked by.</p>
          <p>John said one sentence, and it changed Andrew&apos;s life.</p>
        </div>
        <VerseQuote
          text="Again the next day after John stood, and two of his disciples; And looking upon Jesus as he walked, he saith, Behold the Lamb of God!"
          reference="John 1:35 to 36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew did not wait around to think it over.</p>
          <p>
            📌 <strong>He and another disciple of John left immediately and followed Jesus home
            for the day.</strong>
          </p>
          <p>
            Jesus asked them what they were looking for. They asked where He was staying. He said
            come and see, and they stayed with Him the rest of that day.
          </p>
          <p>⚠️ Scripture never tells us what they talked about. It only tells us Andrew left that house a different man.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Brother Who Could Not Keep It To Himself</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The very next thing Andrew did was go find Peter.</p>
        </div>
        <VerseQuote
          text="He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ. And he brought him to Jesus."
          reference="John 1:41 to 42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not Andrew finds a new job, or Andrew joins a movement.</p>
          <p>We have found the Messiah.</p>
          <p>
            💡 <strong>Andrew is the reason Peter ever met Jesus at all. The apostle history
            remembers least is the one who brought the apostle history remembers most.</strong>
          </p>
          <p>The Catholic Encyclopedia notes that in every list of the apostles, Andrew is always named among the first four, right alongside Peter, James, and John.</p>
          <p>
            A calling can run through someone else first. The same pattern shows up again in{" "}
            <ArticleLink href="/blog/paul">Paul&apos;s story</ArticleLink>, where one conversation
            on a road reshaped an entire mission that spread far past Galilee.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Called a Second Time, by the Water</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Meeting Jesus once was not the same as leaving everything for Him.</p>
          <p>That came later, back on the Sea of Galilee, while Andrew and Peter were still working.</p>
        </div>
        <VerseQuote
          text="And Jesus, walking by the sea of Galilee, saw two brethren, Simon called Peter, and Andrew his brother, casting a net into the sea: for they were fishers. And he saith unto them, Follow me, and I will make you fishers of men. And they straightway left their nets, and followed him."
          reference="Matthew 4:18 to 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Straightway. No negotiation, no going home to pack first.</p>
          <p>
            📌 <strong>Andrew left an actual business, nets and all, the same day Jesus called
            him.</strong>
          </p>
          <p>This second call is why Eastern Christian tradition gives Andrew the title Protokletos, meaning First Called, since he is the first of the Twelve named in the Gospels as answering Christ&apos;s call to discipleship.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Boy With the Loaves</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Years later, a crowd of thousands followed Jesus into the countryside with nothing to eat.</p>
          <p>It was Andrew who noticed the one boy in the crowd who had food.</p>
        </div>
        <VerseQuote
          text="One of his disciples, Andrew, Simon Peter's brother, saith unto him, There is a lad here, which hath five barley loaves, and two small fishes: but what are they among so many?"
          reference="John 6:8 to 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew did not have an answer. He just brought the boy forward anyway.</p>
          <p>💡 He kept doing the same thing he did with Peter: finding someone and bringing them to Jesus, even when he had no idea what Jesus would do with them.</p>
          <p>Jesus fed five thousand people with what that boy had in his hands.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Greeks Who Wanted to See Jesus</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Near the end of Jesus&apos; ministry, a group of Greeks came looking for Him at the feast.</p>
          <p>They asked Philip. Philip did not go to Jesus alone.</p>
        </div>
        <VerseQuote
          text="The same came therefore to Philip, which was of Bethsaida of Galilee, and desired him, saying, Sir, we would see Jesus. Philip cometh and telleth Andrew: and again Andrew and Philip tell Jesus."
          reference="John 12:21 to 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>📌 Every scene Andrew appears in has the same shape. Someone wants to reach Jesus, and Andrew is the one who makes the introduction happen.</p>
          <p>
            After the resurrection, Andrew is listed among the apostles waiting together in
            Jerusalem for the Holy Spirit, the same upper room where{" "}
            <ArticleLink href="/blog/what-is-the-liturgical-calendar">
              the Church&apos;s whole yearly calendar of feasts
            </ArticleLink>{" "}
            effectively begins.
          </p>
          <p>Scripture does not record his name again after that. Tradition has to carry the rest of his story.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. What Tradition Says Came Next</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>⚠️ Be honest about what comes after Acts: it is Church tradition, not the biblical text, and the early sources do not fully agree with each other.</p>
          <p>
            The Catholic Encyclopedia lists several ancient writers naming different mission
            fields for Andrew: Scythia according to Eusebius, Epirus according to Gregory of
            Nazianzus, Achaia according to Jerome, and a wider sweep through Asia Minor and the
            Black Sea region according to Nicephorus.
          </p>
          <p>
            The most consistent thread across these accounts places Andrew&apos;s final years
            preaching in Achaia, in Greece, and founding a church at Byzantium, the small city
            that later grew into Constantinople.
          </p>
          <p>
            The Order of St. Andrew, which represents the Ecumenical Patriarchate of
            Constantinople, still honors him today as the founder of that church and carries his
            title, Protokletos, in its own name.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. Martyred at Patras</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Tradition holds that Andrew was crucified at Patras, in Achaia, under a Roman governor named Aegeas, around AD 60, during Nero&apos;s reign.</p>
          <p>The Catholic Encyclopedia records that he was bound to the cross with ropes rather than nailed to it, which was meant to prolong his suffering rather than shorten it.</p>
        </div>
        <VerseQuote
          text="For whosoever will save his life shall lose it: but whosoever will lose his life for my sake, the same shall save it."
          reference="Luke 9:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>📌 The man who once left his nets the same day he was called left his life the same way, without pulling back.</p>
          <p>
            ⚠️ One detail most people assume is older than it is. The idea that Andrew died on an
            X shaped cross, the shape now called the saltire, has evidence going back no further
            than the fourteenth century, according to the Catholic Encyclopedia. The martyrdom
            itself is ancient. The specific shape of the cross is a later addition to the story.
          </p>
          <p>
            Nearly three hundred years after his death, Andrew&apos;s bones were moved from Patras
            to Constantinople, the new Christian capital named for Emperor Constantine, the same
            ruler behind{" "}
            <ArticleLink href="/blog/the-man-who-legalized-christianity">
              legalizing Christianity across the Roman Empire
            </ArticleLink>
            . The Catholic Encyclopedia dates that move to around AD 357, two decades after
            Constantine&apos;s own death, when the relics were deposited in the city&apos;s Church
            of the Apostles.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Saint Andrew&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Finding Jesus is never the end of the story</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew spent one day with Jesus and then went straight to his brother.</p>
          <p>❓ Who is the first person you would tell if you genuinely believed you had found the Messiah?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. You do not need the spotlight to matter</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter preached at Pentecost. Andrew is barely mentioned again after the Gospels.</p>
          <p>📌 Without Andrew&apos;s one conversation, there is no Peter standing up that day at all.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Bring people, even without an answer ready</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew brought the boy with the loaves without knowing what Jesus would do.</p>
          <p>💡 He did not need a plan. He just needed to make the introduction.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A real calling costs you something you are using right now</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew left his nets in the water, mid work, the day Jesus called him.</p>
          <p>⚠️ He did not wait for a slow season in the business to answer.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Saint Andrew&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. John 1:40 to 42</h3>
        <VerseQuote
          text="One of the two which heard John speak, and followed him, was Andrew, Simon Peter's brother. He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ. And he brought him to Jesus."
          reference="John 1:40 to 42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the first thing Scripture ever tells us Andrew did after meeting Jesus.</p>
          <p>📌 He went and got someone else. That single habit defines his whole story.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Matthew 4:18 to 20</h3>
        <VerseQuote
          text="And Jesus, walking by the sea of Galilee, saw two brethren, Simon called Peter, and Andrew his brother, casting a net into the sea: for they were fishers. And he saith unto them, Follow me, and I will make you fishers of men. And they straightway left their nets, and followed him."
          reference="Matthew 4:18 to 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Fishers of men was not a new job title. It was the same instinct Andrew already had.</p>
          <p>💡 He had already been fishing for Peter. Jesus just made it his life&apos;s work.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. John 6:8 to 9</h3>
        <VerseQuote
          text="One of his disciples, Andrew, Simon Peter's brother, saith unto him, There is a lad here, which hath five barley loaves, and two small fishes: but what are they among so many?"
          reference="John 6:8 to 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Andrew names the problem honestly. What are they among so many.</p>
          <p>📌 He brought the little he found anyway, and let Jesus decide if it was enough.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. John 12:21 to 22</h3>
        <VerseQuote
          text="The same came therefore to Philip, which was of Bethsaida of Galilee, and desired him, saying, Sir, we would see Jesus. Philip cometh and telleth Andrew: and again Andrew and Philip tell Jesus."
          reference="John 12:21 to 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Even another disciple came to Andrew first when strangers wanted to meet Jesus.</p>
          <p>💡 That is what being known for something looks like. People bring you the exact need you have already shown you care about.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Saint Andrew</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Saint Andrew a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. He appears by name in all four Gospels and the book of Acts as one of the Twelve
          Apostles and the brother of Simon Peter. The core facts of his calling and his place
          among the apostles come directly from Scripture, not later legend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Saint Andrew called the First Called?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the Gospel of John records him as the first of the Twelve to begin following
          Jesus, after John the Baptist pointed Jesus out as the Lamb of God. Eastern Orthodox
          Christians use the Greek title Protokletos for this reason, and it is still attached
          to his name in Orthodox tradition today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Saint Andrew the patron saint of?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scotland, Russia, and Greece each honor him as a national patron saint, along
          with fishermen more broadly, which fits his original trade on the Sea of Galilee. His
          feast day on the Orthodox calendar also carries the Patriarchate of Constantinople,
          which traces its founding to him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">When is Saint Andrew&apos;s feast day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          November 30 every year, in both the Western and Eastern Churches. It is also the
          anchor date for the start of Advent: the Catholic Church has long defined the first
          Sunday of Advent as the Sunday nearest to Saint Andrew&apos;s feast, which is why{" "}
          <ArticleLink href="/blog/when-does-advent-begin">when Advent begins</ArticleLink> moves
          a little each year.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Saint Andrew die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Church tradition says he was crucified at Patras, in Greece, around AD 60, bound to the
          cross with ropes rather than nailed, which stretched out his suffering. This account is
          not in Scripture, but it is the consistent early Christian memory of how his life
          ended.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saint Andrew really die on an X shaped cross?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That specific detail, the diagonal cross now called a saltire, is a much later addition
          to the story. The Catholic Encyclopedia notes the evidence for it goes back no further
          than the fourteenth century, roughly 1,300 years after Andrew died. His crucifixion
          itself is treated as historical. The shape of the cross is legend layered on top of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Saint Andrew the patron saint of Scotland?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Legend says a monk named Rule carried relics of Andrew to Scotland and was shipwrecked
          on the Fife coast, founding the town later named St Andrews. Historians at the
          University of St Andrews consider it more likely the relics arrived through Bishop
          Acca of Hexham around 732. Either way, Scotland formally named him its patron saint in
          the 1320 Declaration of Arbroath.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Saint Andrew&apos;s relics?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Catholic Encyclopedia says they were moved from Patras to Constantinople around AD
          357. Centuries later, after Crusaders took Constantinople, a cardinal moved
          most of them to Amalfi, Italy, where they remain. The relics kept in Scotland were lost
          during the Reformation in 1559, after John Knox&apos;s preaching led to the destruction
          of St Andrews Cathedral, the same upheaval behind{" "}
          <ArticleLink href="/blog/what-is-reformation-day">the story of Reformation Day</ArticleLink>.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Saint Andrew older or younger than Peter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never says. Tradition and most artwork assume Andrew was the older brother,
          since he met Jesus first, but the Bible does not state their birth order either way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Protestants celebrate Saint Andrew&apos;s Day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Some do, mainly as a cultural and historical observance tied to Scotland or Advent
          rather than a day of prayer to a saint. Scottish Presbyterians in particular still
          mark November 30 as a national day, while many other Protestants observe it quietly or
          not at all, leaving the choice to each believer&apos;s own conscience.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the saltire, the national flags, even the uncertain details of where he preached, and one plain fact about Andrew still stands.</p>
          <p>
            📌 <strong>Every single time Scripture shows him doing something, he is bringing
            someone else to Jesus. His brother. A boy with bread. A group of strangers who just
            wanted to see Christ for themselves.</strong>
          </p>
          <p>He never preached a famous sermon on the page of the Bible. He never performed a recorded miracle.</p>
          <p>He just kept making introductions, one person at a time, for the rest of his life.</p>
          <p>❓ Who is standing close enough to you right now that you could do the exact same thing Andrew did with Peter?</p>
          <p>📌 <strong>You do not need a title to bring someone to Jesus. Andrew never had one either.</strong></p>
        </div>
      </section>

      <ArticleSources
        checkedOn="30 October 2026"
        sources={[
          {
            title: "Saint of the Day, 30 November: Saint Andrew the Apostle",
            publisher: "Vatican News",
            url: "https://www.vaticannews.va/en/saints/11/30.html",
            note: "The source for November 30 as his feast day, his identity as Peter's brother and the first apostle called, his martyrdom on a diagonal cross, and his patronage of fishermen and the Church of Constantinople.",
          },
          {
            title: "St. Andrew",
            publisher: "Catholic Encyclopedia (1907), New Advent",
            url: "https://www.newadvent.org/cathen/01471a.htm",
            note: "The source for Andrew's background as a fisherman from Bethsaida, his time as a disciple of John the Baptist, his place in the apostle lists, the ancient writers' differing accounts of his mission field, his martyrdom at Patras around AD 60 under Nero, the detail that he was bound rather than nailed to the cross, the X shaped cross tradition dating no earlier than the fourteenth century, the relic translation to Constantinople around AD 357, and his patronage of Russia and Scotland.",
          },
          {
            title: "St Andrew to St Andrews: Who, When and Why?",
            publisher: "University of St Andrews Museums and Collections",
            url: "https://university-collections.wp.st-andrews.ac.uk/2020/11/29/st-andrew-to-st-andrews-who-when-and-why/",
            note: "The source for the St Rule relic legend versus the more likely account of Bishop Acca of Hexham bringing relics to Fife around 732, the 1320 Declaration of Arbroath naming Andrew Scotland's patron saint, and the relics being lost during the 1559 Reformation.",
          },
          {
            title: "The Order of Saint Andrew the Apostle, Archons of the Ecumenical Patriarchate",
            publisher: "Archons.org",
            url: "https://archons.org/?p=1970",
            note: "The source for the title Protokletos, meaning First Called, and the tradition that Andrew founded the Church of Byzantium, which became the Patriarchate of Constantinople.",
          },
          {
            title: "Advent",
            publisher: "Catholic Encyclopedia, Catholic.com",
            url: "https://www.catholic.com/encyclopedia/advent",
            note: "The source for Advent beginning on the Sunday nearest to Saint Andrew's feast day, November 30.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
