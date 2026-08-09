import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("luke", {
  title: "Who Was Luke in the Bible? The Outsider Who Wrote the Most",
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
    <Link href={href} className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]">
      {children}
    </Link>
  );
}

export default function LukeCharacterStudyPage() {
  return (
    <BlogPostShell
      slug="luke"
      title={<>📖 Who Was Luke in the Bible? The Outsider Who Wrote the Most</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Ever walk into a church and feel like everybody else grew up here but you?</p>
            <p>They know the songs. They know the books of the Bible in order.</p>
            <p>You are still figuring out where Habakkuk is.</p>
            <p>
              📌 <strong>The man who wrote more of your New Testament than anybody else was an
              outsider too.</strong>
            </p>
            <p>Luke never walked beside Jesus.</p>
            <p>He was not one of the twelve. He was not in the inner circle.</p>
            <p>He was not even Jewish.</p>
            <p>He did not grow up with the Law, the temple, or the promises.</p>
            <p>He came in from the outside, late, with none of the credentials.</p>
            <p>And God used him to write more words of Scripture than Paul, Peter, or John.</p>
            <p>
              This is the story of Luke in the Bible, what we actually know about him, and why an
              outsider ended up carrying so much of the story.
            </p>
            <p>Let&apos;s walk through it.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Luke Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke was a first century physician and a traveling companion of the apostle Paul.</p>
          <p>He is never named in the Gospels, because he was not there for them.</p>
          <p>
            📌 He is mentioned by name only three times in the whole Bible:{" "}
            <strong>Colossians 4:14</strong>, <strong>2 Timothy 4:11</strong>, and{" "}
            <strong>Philemon 24</strong>.
          </p>
          <p>Three mentions. And two entire books of the Bible.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>✅ Not one of the twelve disciples</li>
          <li>✅ A Gentile, not Jewish by birth</li>
          <li>✅ A physician by training</li>
          <li>✅ Author of the Gospel of Luke and the book of Acts</li>
          <li>✅ The single largest contributor to the New Testament by word count</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Read that last one again. More of your New Testament came from Luke&apos;s pen than
            from any apostle.
          </p>
          <p>
            If you have ever wondered{" "}
            <ArticleLink href="/blog/what-is-the-bible">what the Bible actually is</ArticleLink> and
            who put it together, Luke is a big part of that story.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Story of Luke</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Outsider in the Room</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke is widely believed to be the only Gentile author in the New Testament.</p>
          <p>That means he was not born into any of it.</p>
          <p>No Law of Moses. No covenant promises. No temple.</p>
          <p>Everyone else writing Scripture had grown up inside the story.</p>
          <p>Luke walked in from outside it.</p>
          <p>
            ⚠️ In that world, that was not a small thing. Gentiles were the ones on the other side of
            the wall.
          </p>
          <p>And that outsider perspective turned into his greatest strength.</p>
          <p>Because most of the early Church was becoming Gentile too.</p>
          <p>People who did not know the customs. Who needed things explained.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📌 He explains Jewish customs instead of assuming you know them</li>
          <li>📌 He gives geography and dates so outsiders can locate the story</li>
          <li>📌 He translates religious terms into language a Greek reader could follow</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Luke did not just tell the story. He translated it for people who were not
            raised in it.</strong>
          </p>
          <p>Which is exactly what you need when you are the one who did not grow up in church.</p>
          <p>Watch what he does with the family tree of Jesus.</p>
          <p>Matthew traces it back to Abraham, the father of the Jewish people.</p>
          <p>Luke keeps going. Past Abraham. All the way back to Adam.</p>
          <p>
            📌 <strong>He is telling you this Savior does not belong to one nation. He belongs to
            the whole human race.</strong>
          </p>
          <p>A Jewish writer might never have thought to make that point.</p>
          <p>The outsider did, because it was his point.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Beloved Physician</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul gives us the one personal detail we have about his profession.</p>
        </div>
        <VerseQuote text="Luke, the beloved physician, and Demas, greet you." reference="Colossians 4:14" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two words that tell you a lot.</p>
          <p>
            <strong>Beloved.</strong> Paul was fond of him personally.
          </p>
          <p>
            <strong>Physician.</strong> He was educated and trained in observation.
          </p>
          <p>And you can see the doctor in his writing.</p>
          <p>He describes illnesses with more precision than the other Gospel writers.</p>
          <p>He notes ages, timelines, and named officials you can check against history.</p>
          <p>He is the one who tells us Jesus sweat drops like blood in Gethsemane.</p>
          <p>When Mark says a woman had an issue of blood, Luke adds that no one could heal her.</p>
          <p>When others say a man was sick, Luke tells you what he was sick with.</p>
          <p>
            💡 <strong>God did not discard his training when He called him. He used it.</strong>
          </p>
          <p>That should land on you if you have ever felt like your job is unspiritual.</p>
          <p>Luke did not have to become a preacher to be useful.</p>
          <p>He brought the exact skill he already had and God put it in the Bible.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Man Who Did the Research</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke opens his Gospel by telling you exactly how he wrote it.</p>
          <p>No other Gospel does this.</p>
        </div>
        <VerseQuote
          text="It seemed good to me also, having had perfect understanding of all things from the very first, to write unto thee in order, most excellent Theophilus, that thou mightest know the certainty of those things, wherein thou hast been instructed."
          reference="Luke 1:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Look at what he says he did.</p>
          <p>He investigated everything carefully, from the beginning.</p>
          <p>He wrote it in order.</p>
          <p>And he says why: so you would know the certainty of what you were taught.</p>
          <p>
            📌 <strong>Luke was not writing a legend. He was building a case.</strong>
          </p>
          <p>He interviewed eyewitnesses.</p>
          <p>
            💡 Many scholars believe the birth details in Luke 1 and 2 came from Mary herself. Twice
            he mentions that Mary kept these things and pondered them in her heart, which reads like
            a note about his source.
          </p>
          <p>
            If somebody has ever told you the Bible is just made up stories, this is one of the
            places to start.{" "}
            <ArticleLink href="/blog/how-to-defend-the-bible">Learning how to defend the
            Bible</ArticleLink> begins with knowing how carefully it was written.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Gospel for Everybody Who Got Left Out</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every Gospel has a personality. Luke&apos;s is unmistakable.</p>
          <p>He keeps putting the camera on people nobody else was filming.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>👩 Women, named and honored, far more than in any other Gospel</li>
          <li>💸 The poor, and hard words about wealth</li>
          <li>🌍 Samaritans and Gentiles, the outsiders of that world</li>
          <li>🙏 Tax collectors, sinners, and the people religion had written off</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three of the most famous parables Jesus told are only in Luke.</p>
          <p>The Good Samaritan. The Prodigal Son. The Lost Sheep.</p>
          <p>❓ Notice what all three have in common?</p>
          <p>They are all about somebody outside being brought in.</p>
          <p>He is also the one who records the thief on the cross.</p>
          <p>A criminal, hours from death, with nothing to offer and no time to fix his life.</p>
          <p>Jesus tells him today shalt thou be with me in paradise.</p>
          <p>
            💡 No other Gospel writer includes that. Luke did, because Luke understood what it is to
            be let in without earning it.
          </p>
          <p>And he gives us Zacchaeus, Mary Magdalene, the widow of Nain, the grateful Samaritan.</p>
          <p>Name after name that the important people of that world would have skipped.</p>
          <p>
            📌 <strong>The outsider wrote the Gospel about outsiders. That is not a
            coincidence.</strong>
          </p>
          <p>And he sums up the whole mission of Jesus in one sentence:</p>
        </div>
        <VerseQuote
          text="For the Son of man is come to seek and to save that which was lost."
          reference="Luke 19:10"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Friend Who Stayed</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Somewhere in Acts, the writing changes.</p>
          <p>It stops saying they and starts saying we.</p>
          <p>💡 Those are called the we passages, and they are Luke quietly telling you he was there.</p>
          <p>He traveled with Paul. He survived the shipwreck with him.</p>
          <p>He was with him through imprisonments and trials.</p>
          <p>Think about what that friendship actually cost.</p>
          <p>Paul was a dangerous person to be seen with.</p>
          <p>Riots followed him. Governments arrested him. Crowds tried to kill him.</p>
          <p>An educated physician had every reason to keep his distance.</p>
          <p>Luke got on the boat instead.</p>
          <p>
            💡 The shipwreck in Acts 27 is described in such detail because the man writing it was
            in the water.
          </p>
          <p>And at the very end, when almost everyone had scattered, Paul wrote this:</p>
        </div>
        <VerseQuote text="Only Luke is with me." reference="2 Timothy 4:11" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four words. Read them slowly.</p>
          <p>Paul is in a Roman prison near the end of his life.</p>
          <p>Demas has left him. Others have gone.</p>
          <p>
            <strong>Only Luke is with me.</strong>
          </p>
          <p>
            📌 <strong>The doctor who could have been anywhere chose a cell with a condemned
            friend.</strong>
          </p>
          <p>
            If you want the other half of that friendship, read{" "}
            <ArticleLink href="/blog/paul">the story of Paul</ArticleLink> and what he went through.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Sequel Nobody Expected</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke did not stop at the Gospel.</p>
          <p>He wrote a second volume: the book of Acts.</p>
          <p>Volume one is what Jesus did. Volume two is what His Church did next.</p>
          <p>Without Acts, we would not have the story of the early Church at all.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🔥 Pentecost and the coming of the Spirit</li>
          <li>🔥 The first martyrs</li>
          <li>🔥 The conversion of Saul on the Damascus road</li>
          <li>🔥 The gospel breaking out of Jerusalem and into the world</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice how Acts ends.</p>
          <p>Paul under house arrest in Rome, still preaching, no conclusion given.</p>
          <p>No tidy ending. No final scene.</p>
          <p>
            💡 Many people believe that is intentional. The story was not finished, because the
            Church was still writing it.
          </p>
          <p>
            📌 <strong>You are living in the part Luke did not get to write down.</strong>
          </p>
          <p>And notice one more thing about Acts.</p>
          <p>He does not clean up the early Church.</p>
          <p>He records their arguments, their favoritism, the sharp fight between Paul and Barnabas.</p>
          <p>
            💡 An honest historian leaves in the parts that make his own side look bad. Luke did.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Luke&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Being an outsider can be the qualification</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke was not raised in it, and that is why he explained it so well.</p>
          <p>He knew which parts confuse a newcomer, because he had been one.</p>
          <p>
            📌 The thing you think disqualifies you from serving might be exactly what makes you
            useful to the next person walking in.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. God uses your profession, not just your free time</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke did not stop being a doctor to serve God.</p>
          <p>His trained eye for detail is the reason his Gospel reads the way it does.</p>
          <p>💡 Whatever you are good at was given to you. It is not separate from your faith.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Faith is not afraid of investigation</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke opened his Gospel by describing his research.</p>
          <p>He wanted his reader to know the certainty of it, not just feel good about it.</p>
          <p>
            ❓ If Scripture invites you to check it, why would you be nervous about your questions?
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Faithful presence beats a platform</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke never preached a famous sermon we know of.</p>
          <p>He never led a church we can name.</p>
          <p>He stayed. He wrote. He sat in a prison with his friend.</p>
          <p>📌 Two thousand years later, we read what he wrote every single Sunday.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Write it down</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Everything we know about the early Church exists because one man documented it.</p>
          <p>He could have assumed somebody else would.</p>
          <p>💡 What God is doing in your life is worth recording, even if only you ever read it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Luke&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 1:3 and 4</h3>
        <VerseQuote
          text="It seemed good to me also, having had perfect understanding of all things from the very first, to write unto thee in order, most excellent Theophilus, that thou mightest know the certainty of those things, wherein thou hast been instructed."
          reference="Luke 1:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The only place a Gospel writer explains his method.</p>
          <p>Investigated. Ordered. Written so you could be certain.</p>
          <p>💡 Christianity has never asked you to believe without evidence.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Colossians 4:14</h3>
        <VerseQuote text="Luke, the beloved physician, and Demas, greet you." reference="Colossians 4:14" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One of only three verses that name him.</p>
          <p>Notice who is standing next to him in this sentence: Demas.</p>
          <p>Later, Paul writes that Demas forsook him, having loved this present world.</p>
          <p>📌 Same verse, two men. One left. One stayed. Time tells the difference.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Timothy 4:11</h3>
        <VerseQuote text="Only Luke is with me." reference="2 Timothy 4:11" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Possibly the highest compliment in the New Testament, and it is four words.</p>
          <p>No title. No accomplishment. Just present when it cost something.</p>
          <p>💡 Be the person somebody could write that sentence about.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 19:10</h3>
        <VerseQuote
          text="For the Son of man is come to seek and to save that which was lost."
          reference="Luke 19:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke&apos;s summary of the whole mission of Jesus.</p>
          <p>Seek comes first. God moves toward you before you move toward Him.</p>
          <p>And He said it in the house of a tax collector everybody hated.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Acts 1:8</h3>
        <VerseQuote
          text="But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth."
          reference="Acts 1:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This verse is the outline of the entire book of Acts.</p>
          <p>Jerusalem, then Judea, then Samaria, then the ends of the earth.</p>
          <p>
            📌 A Gentile outsider wrote down the promise that the gospel was always going to reach
            people like him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Luke</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Luke in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke was a first century physician and traveling companion of the apostle Paul. He wrote
          the Gospel of Luke and the book of Acts, which together make him the largest contributor
          to the New Testament by word count. He is believed to be the only Gentile author in the
          Bible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Luke one of the twelve disciples?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. He never met Jesus during His earthly ministry and was not part of the twelve. He came
          to faith later, through the early Church, and wrote his Gospel by carefully interviewing
          people who had been eyewitnesses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Luke ever meet Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Almost certainly not. He says in his own opening that the events were handed down to him
          by those who were eyewitnesses from the beginning, which strongly implies he was not one.
          That makes his careful research all the more important.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many books did Luke write?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Two: the Gospel of Luke and Acts. They were written as a two part work to the same reader.
          Together they are longer than all of Paul&apos;s letters combined, which is why Luke is
          the single biggest contributor to the New Testament.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Theophilus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both of Luke&apos;s books are addressed to him, and we do not know for certain who he was.
          The title most excellent suggests a person of rank, possibly a Roman official. The name
          itself means lover of God, so some believe it may stand for any believer reading it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Luke a doctor?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Paul calls him the beloved physician in Colossians 4:14. Readers have long noticed
          that his writing reflects it, with more precise descriptions of illness and healing than
          the other Gospels contain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What makes the Gospel of Luke different?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Its focus on outsiders. Luke gives more attention to women, the poor, Samaritans, and
          sinners than any other Gospel. Several of the most famous parables, including the Good
          Samaritan and the Prodigal Son, appear only in Luke.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Gospel of Luke historically reliable?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luke names real rulers, cities, and officials that can be checked against other ancient
          sources, and he has a strong track record for accuracy on those details. Historians still
          debate individual points, as they do with any ancient document. What is clear is that he
          was deliberately writing history, not myth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Luke die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not say. Early tradition holds that he lived to old age and died in Greece,
          with some accounts claiming he was martyred. These come from later Church writings rather
          than Scripture, so hold them loosely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Luke today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That you do not need insider status to matter to God. That your education and profession
          can serve Him rather than compete with Him. That faith welcomes honest investigation. And
          that staying with someone in their hardest hour can be worth more than any platform.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke had every reason to think he did not belong.</p>
          <p>Wrong background. Wrong nationality. Arrived too late for the main events.</p>
          <p>He wrote more of your New Testament than anybody else.</p>
          <p>Hold three things from his life.</p>
          <p>
            📌 <strong>Being an outsider is not a disqualification. It can be your
            perspective.</strong>
          </p>
          <p>
            📌 <strong>God uses what you were trained to do.</strong>
          </p>
          <p>
            📌 <strong>Faithful presence outlasts a platform.</strong>
          </p>
          <p>So here is your one next step.</p>
          <p>Read Luke 15 tonight, the chapter with the lost sheep, the lost coin, and the lost son.</p>
          <p>
            Watch how much time God spends going after the one who was not in the room. He wrote it
            down because it happened to him too.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you feel behind because you did not grow up in church, you are exactly who this was
            built for. Start with{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> and
            go one day at a time.
          </p>
          <p>
            Inside <strong>Bible Buddy</strong>, you will find:
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English</li>
          <li>🌱 Daily devotionals that meet you where you are</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 A community of believers walking the same road</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is free to start. No pressure, no credit card.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
          <p>Sign up by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
