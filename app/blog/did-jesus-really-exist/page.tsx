import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("did-jesus-really-exist", {
  title: "Did Jesus Really Exist? The Evidence Outside the Bible",
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

export default function DidJesusReallyExistPage() {
  return (
    <BlogPostShell
      slug="did-jesus-really-exist"
      title={<>📖 Did Jesus Really Exist?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Someone told you Jesus never existed.</p>
            <p>Maybe it was a coworker over lunch. Maybe a video at midnight that would not let you sleep.</p>
            <p>Maybe it was just a comment section, and you have not been able to shake it since.</p>
            <p>So you typed the question into your phone. Did Jesus really exist?</p>
            <p>
              📌 <strong>Here is the honest answer, before anything else. Yes. Jesus of Nazareth
              really lived. He really was executed under a Roman governor named Pontius Pilate.
              And almost no serious historian today, Christian or not, argues otherwise.</strong>
            </p>
            <p>That is not a Christian talking point. That is the settled position of secular history.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>You are not asking a strange question.</p>
            <p>You are asking the right one.</p>
            <p>Because if someone is going to tell you Jesus was a legend, made up decades later by grieving followers, they should have to answer to the actual historical record.</p>
            <p>Not just to your church. To Rome. To Jewish writers who hated the movement. To governors filing reports back to the emperor.</p>
            <p>
              This guide walks through what people wrote about Jesus <strong>outside the Bible</strong>, in
              the decades right after His death. A Roman senator. A Jewish historian. A Roman
              governor. Even later rabbis who despised the whole thing.
            </p>
            <p>None of them were trying to prove Christianity true. Several of them were trying to shut it down.</p>
            <p>And every one of them treated Jesus as a real man who really lived and really died.</p>
            <p>Get a cup of coffee. Take a breath.</p>
            <p>Let&apos;s walk through what the historical record actually says.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🧭 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need a history degree to follow Jesus.</p>
          <p>But you do need to know your faith is not standing on nothing.</p>
          <p>
            📌 <strong>Because the world will keep saying it is a fairy tale.</strong>
          </p>
          <p>
            A relative rolls their eyes at church. A stranger online calls Jesus a myth copied
            from older religions. Your own mind asks the question at 2 a.m., when the house is
            quiet and the doubts get loud.
          </p>
          <p>
            If your only answer is &quot;I just believe,&quot; doubt gets to speak first in that
            moment. And doubt is a confident speaker.
          </p>
          <p>
            This is not about winning an argument with a stranger. This is about{" "}
            <strong>your own settled confidence</strong> in the God you have built your life on.
          </p>
          <p>
            Notice what this article is not doing yet. It is not asking whether Jesus rose from
            the dead, or whether He is the Son of God. Those are the next questions, and they
            matter enormously. You can read the case for the resurrection in{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith in Jesus
            </ArticleLink>
            .
          </p>
          <p>This article answers a smaller, more basic question first.</p>
          <p>❓ Did a man named Jesus actually walk the earth, teach, and die on a Roman cross?</p>
          <p>
            📌 <strong>Get that settled, and every conversation after it changes shape.</strong>
          </p>
          <p>Because once existence is not in question, the only honest debate left is who He was.</p>
          <p>That is a much better place to stand.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🏛️ The Evidence Outside the Bible
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start here, because this is where a skeptic will actually listen.</p>
          <p>
            Not with a Bible verse, but with sources that have no reason to help Christianity.
            Roman historians. A Jewish scholar. A Roman governor writing to his emperor. Later
            rabbis who wanted nothing to do with the movement.
          </p>
          <p>None of them set out to defend Jesus. All of them still wrote about Him as a real man.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Tacitus: A Roman Historian Who Despised Christianity
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Cornelius Tacitus was one of Rome&apos;s most respected historians.</p>
          <p>
            Around AD 116, he wrote his <em>Annals</em>, a history of the Roman Empire. In it, he
            describes Emperor Nero blaming a devastating fire in Rome on a group he calls
            &quot;Christians.&quot;
          </p>
          <p>Then Tacitus explains where the name came from.</p>
          <p>
            He writes that &quot;Christus,&quot; the founder of the name, was put to death by the
            procurator Pontius Pilate during the reign of Tiberius.
          </p>
          <p>
            📌 <strong>Read that again.</strong> A Roman senator, writing decades later from
            Roman records, names Pilate as the man who executed Jesus.
          </p>
          <p>
            Tacitus was not friendly to this new movement. He calls it a &quot;mischievous
            superstition.&quot; He is not trying to make Christians look good.
          </p>
          <p>
            💡 <strong>That is exactly what makes his testimony so strong.</strong> A hostile
            historian, writing to a Roman audience, still treats the crucifixion under Pilate as
            an accepted historical fact, not a rumor worth questioning.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Josephus: A Jewish Historian&apos;s Record of Jesus
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Flavius Josephus was a Jewish historian writing for Roman readers around AD 93.</p>
          <p>
            In his massive work <em>Antiquities of the Jews</em>, he includes a short passage
            about Jesus, sometimes called the Testimonium Flavianum. It mentions Jesus as a wise
            man who drew a large following, was condemned by Pilate, and whose followers did not
            abandon their devotion after His death.
          </p>
          <p>
            ⚠️ <strong>Be honest about this one, because scholars are.</strong> Most historians
            believe parts of this passage were reworded by later Christian copyists, since some
            of the phrasing sounds like something a believer would write, not a Jewish historian
            with no interest in Christianity.
          </p>
          <p>
            But the wide scholarly view is not that Josephus wrote nothing about Jesus. It is that
            he wrote something plain and factual, and someone later dressed it up.
          </p>
          <p>
            And there is a second, far less disputed passage. A few chapters later, Josephus
            mentions the execution of &quot;James, the brother of Jesus, who was called
            Christ.&quot; Almost no scholar contests that line.
          </p>
          <p>
            📌 <strong>A Jewish historian with no love for the church casually mentions Jesus as
            a known, executed man, the way you would mention any other public figure.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Pliny the Younger: A Governor&apos;s Letter to the Emperor
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Pliny the Younger governed the Roman province of Bithynia.</p>
          <p>
            Around AD 112, he wrote to Emperor Trajan asking for guidance on what to do with the
            growing number of Christians in his province. It is one of the earliest outside
            descriptions of Christian worship that survives.
          </p>
          <p>He describes believers gathering before daylight, singing a hymn to Christ &quot;as to a god,&quot; and binding themselves by oath to live honestly.</p>
          <p>
            Notice what this letter is not. It is not a sermon. It is an administrative report
            from a Roman official trying to figure out how to enforce the law.
          </p>
          <p>
            📌 <strong>This is not a story about how Christianity began. It is a snapshot of a
            real, organized movement, already spreading through a Roman province within about
            eighty years of the crucifixion, gathered around a real person they called
            Christ.</strong>
          </p>
          <p>
            That kind of movement does not form around a man nobody ever met.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Talmud: Hostile Testimony from Jewish Sources
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Talmud is a collection of Jewish rabbinic teaching, compiled centuries after
            Jesus, though it draws on earlier oral tradition.
          </p>
          <p>
            It contains references to a man named Yeshu, executed on the eve of Passover, accused
            of practicing sorcery and leading Israel astray.
          </p>
          <p>These lines are not kind. They were never meant to be. They come from a tradition that rejected Jesus entirely.</p>
          <p>
            💡 <strong>And that is exactly why they matter.</strong> If early opponents of
            Christianity had wanted to end the whole movement with one simple claim, they had an
            easy option available. They could have said He never lived at all.
          </p>
          <p>They did not say that. Not once, in any source that survives.</p>
          <p>
            📌 <strong>Instead they argued about who He was and what He did.</strong> The same
            argument people are still having today.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Serious Historians Actually Say Today
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Put Tacitus, Josephus, Pliny, and the Talmud next to the Gospel accounts, and you get
            a wide, independent trail of evidence, coming from people with very different reasons
            to write.
          </p>
          <p>
            That is why the idea that Jesus never existed, sometimes called the &quot;Christ
            myth theory,&quot; holds almost no ground among historians. Even scholars who reject
            Christianity entirely will tell you that.
          </p>
          <p>
            Bart Ehrman, an agnostic New Testament scholar who has written whole books
            questioning the reliability of the Gospels, has said plainly that virtually every
            trained historian, believer or not, agrees a Jewish man named Jesus really lived and
            was crucified under Pontius Pilate.
          </p>
          <p>
            📌 <strong>Read that carefully. This is coming from a scholar with no motive to
            defend the faith.</strong>
          </p>
          <p>
            The genuine academic debate was never really &quot;did Jesus exist.&quot; It is who
            He was. A prophet. A revolutionary. A teacher who got it wrong. Or exactly who He
            claimed to be, the Son of God who rose from the dead.
          </p>
          <p>
            ❓ So if a real man named Jesus lived, taught, and was executed under Pilate, exactly
            as hostile sources admit, one question is left standing.
          </p>
          <p>
            📌 <strong>What explains what His followers say happened three days later?</strong>
          </p>
          <p>
            That question is bigger than this article. It is the whole case for the resurrection,
            and you can walk through the evidence for it in{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith in Jesus
            </ArticleLink>
            .
          </p>
          <p>But settle this piece first. The man was real. The cross was real.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Talking About This With a Skeptic
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Knowing the evidence is one thing. Using it well in a real conversation is another.</p>
          <p>Here are seven ways to hold this well the next time it comes up.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Start outside the Bible, not inside it.</strong> If someone doubts Scripture,
            quoting Scripture to prove Jesus existed will not land. Start with Tacitus or
            Josephus. Sources they cannot dismiss as biased.
          </li>
          <li>
            <strong>Know the difference between existence and identity.</strong> You are not
            trying to prove Jesus is God in this conversation. You are only proving He was a real
            man. Keep those two questions separate, because mixing them muddies both.
          </li>
          <li>
            <strong>Be honest about the Josephus passage.</strong> Do not overstate it. Say
            plainly that scholars believe it was edited later, but that a real core reference
            remains. Overclaiming hurts your credibility more than a careful answer ever will.
          </li>
          <li>
            <strong>Remember what makes hostile sources so valuable.</strong> Tacitus and the
            Talmud had nothing to gain by mentioning Jesus. Point that out. A source with no
            reason to help your case is the strongest kind of witness.
          </li>
          <li>
            <strong>Do not stop at existence.</strong> Once someone agrees Jesus was real, the
            conversation has just gotten more interesting, not less. Be ready to move to the
            resurrection next, since that is where the real weight of the gospel sits.
          </li>
          <li>
            <strong>Stay calm and stay kind.</strong> You are not trying to win a debate. You are
            trying to hand someone a reason to keep asking honest questions instead of walking
            away. Learning{" "}
            <ArticleLink href="/blog/how-to-defend-the-bible">
              how to defend the Bible itself
            </ArticleLink>{" "}
            works the same way. Gently, not as a weapon.
          </li>
          <li>
            <strong>Keep reading for yourself.</strong> The best confidence is not secondhand.
            Spend time actually{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">reading the Gospels</ArticleLink>{" "}
            so your answers come from familiarity, not a memorized script.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need all seven mastered before your next conversation.</p>
          <p>Pick two. Practice them. Let confidence build from there.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Jesus Being a Real Man
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The Gospels themselves also read as historical claims, not folklore. Here are five
            verses worth knowing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 1:1 through 4</h3>
        <VerseQuote
          text="Forasmuch as many have taken in hand to set forth in order a declaration of those things which are most surely believed among us, Even as they delivered them unto us, which from the beginning were eyewitnesses, and ministers of the word; It seemed good to me also, having had perfect understanding of all things from the very first, to write unto thee in order, most excellent Theophilus, That thou mightest know the certainty of those things, wherein thou hast been instructed."
          reference="Luke 1:1 through 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Luke opens his Gospel the way a careful historian opens a report, not the way a storyteller opens a legend.</p>
          <p>He mentions eyewitnesses. He mentions tracing everything carefully from the beginning. He names a real person, Theophilus, as his reader.</p>
          <p>That is not how you frame a myth. That is how you frame an investigation, written for someone who could check it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. John 19:19 and 20</h3>
        <VerseQuote
          text="And Pilate wrote a title, and put it on the cross. And the writing was, JESUS OF NAZARETH THE KING OF THE JEWS. This title then read many of the Jews: for the place where Jesus was crucified was nigh to the city: and it was written in Hebrew, and Greek, and Latin."
          reference="John 19:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the kind of small, specific detail a legend rarely bothers inventing.</p>
          <p>A real sign, on a real hill, near a real city, written in three real languages so travelers passing through could all read it.</p>
          <p>Executions leave paperwork. This one left a public sign that hostile priests tried and failed to get changed.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Corinthians 15:3 through 8</h3>
        <VerseQuote
          text="For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures: And that he was seen of Cephas, then of the twelve: After that, he was seen of above five hundred brethren at once; of whom the greater part remain unto this present, but some are fallen asleep. After that, he was seen of James; then of all the apostles. And last of all he was seen of me also, as of one born out of due time."
          reference="1 Corinthians 15:3 through 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Most scholars, including many who are not Christians, date this creed to within just a few years of the crucifixion.</p>
          <p>It reads like a formal statement handed down, not a legend that slowly grew over generations.</p>
          <p>
            📌 <strong>Paul even names living witnesses reading over his shoulder, in effect
            telling the Corinthians to go ask them.</strong>
          </p>
          <p>That is testimony you could challenge at the time it was written. Nobody on record did.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. John 1:14</h3>
        <VerseQuote
          text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
          reference="John 1:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>John does not describe an idea or a symbol. He describes flesh. A body. Someone who dwelt among people who could see Him.</p>
          <p>&quot;We beheld his glory&quot; is the language of an eyewitness, not a philosopher building a metaphor.</p>
          <p>The whole claim of Christianity rests on this. God did not stay distant. He became a real man in a real place.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 John 1:1 through 3</h3>
        <VerseQuote
          text="That which was from the beginning, which we have heard, which we have seen with our eyes, which we have looked upon, and our hands have handled, of the Word of life; (For the life was manifested, and we have seen it, and bear witness, and shew unto you that eternal life, which was with the Father, and was manifested unto us;) That which we have seen and heard declare we unto you, that ye also may have fellowship with us: and truly our fellowship is with the Father, and with his Son Jesus Christ."
          reference="1 John 1:1 through 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Count the verbs. Heard. Seen with our eyes. Looked upon. Hands have handled.</p>
          <p>💡 <strong>That is not the language of a movement inventing a founder. That is the language of people describing a person they knew.</strong></p>
          <p>John is not asking you to take a feeling on faith. He is telling you what he personally experienced, and inviting you to weigh it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Whether Jesus Really Existed
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jesus really exist as a historical person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Nearly every serious historian, Christian or not, agrees a Jewish man named Jesus
          lived in the first century and was executed under the Roman governor Pontius Pilate.
          That conclusion comes from multiple independent sources, both inside and outside the
          Bible. The genuine scholarly debate is about who He was, not whether He walked the
          earth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the strongest evidence for Jesus outside the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Tacitus is often considered the strongest single piece, because he was a respected
          Roman historian hostile to Christianity, writing decades after the events from Roman
          records. Josephus and Pliny the Younger add independent support from a Jewish and a
          Roman government source. Together, they form a wide trail no single skeptic wrote and no
          single church controlled.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Josephus really write about Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in two separate passages. Scholars believe parts of the longer passage were edited
          by later Christian copyists, but most agree an authentic core mentioning Jesus remains.
          A second, shorter passage about &quot;James, the brother of Jesus&quot; faces far less
          dispute. Together they show a Jewish historian treating Jesus as an established public
          figure.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Tacitus reference to Jesus authentic?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, the vast majority of historians accept it as genuine. Some skeptics have raised
          questions over the centuries, but no serious manuscript evidence supports the idea that
          it was inserted later. It remains one of the earliest and most respected non Christian
          mentions of Jesus and Pontius Pilate.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do any Jewish sources mention Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Josephus wrote about Him in the first century, and the Talmud, compiled later,
          contains hostile references to a man named Yeshu who was executed near Passover. These
          sources reject Jesus theologically, but neither denies He lived. That combination, hostile
          in tone yet certain of His existence, carries real historical weight.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do historians who are not Christians believe Jesus existed?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Agnostic and secular scholars, including well known New Testament critics, openly
          state that a Jewish man named Jesus really lived and was crucified under Pilate. Their
          disagreements with Christianity are about His identity and His teachings, not His
          existence. That distinction gets lost in casual online debates far more than it does in
          actual scholarship.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          If Jesus existed, does that prove Christianity is true?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not by itself, and it was never meant to. Proving Jesus existed only establishes that a
          real man lived and died as the Gospels describe. The larger question, whether He rose
          from the dead and is who He claimed to be, takes a second step of evidence, which you can
          walk through in{" "}
          <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
            how to defend your faith in Jesus
          </ArticleLink>
          .
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do some people still think Jesus was made up?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Usually because the claim spreads faster online than the actual scholarship does. The
          &quot;Christ myth theory&quot; has almost no support among trained historians, but a
          confident video or post does not need footnotes to sound convincing. It helps to remember
          that popularity online and accuracy in history are two very different things.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between Jesus existing and Jesus being God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Existence is a historical question, answered by the kind of sources in this article.
          Whether Jesus is God is a much bigger claim, resting on His own words and on the
          resurrection. Keeping these two questions separate actually helps a real conversation,
          because most people find the first one much easier to accept than the second.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Where can I go deeper on defending my faith in Jesus?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Start with{" "}
          <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
            how to defend your faith in Jesus
          </ArticleLink>
          , which walks through the evidence for the resurrection itself. Understanding{" "}
          <ArticleLink href="/blog/what-is-the-bible">what the Bible actually is</ArticleLink>{" "}
          is a strong next step after that, since the two questions build on each other.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Jesus really existed.</strong> A Roman historian who despised Christianity,
            a Jewish historian with no reason to help the church, a Roman governor filing a
            routine report, and hostile rabbinic writings all treat Him as a real man who really
            died.
          </p>
          <p>
            📌 <strong>Virtually no serious historian argues otherwise.</strong> The real
            scholarly conversation moved past that question a long time ago. The live debate is
            who He was, not whether He walked the earth.
          </p>
          <p>
            📌 <strong>That leaves you one honest question left.</strong> If a real man lived and
            was really crucified, what explains an empty tomb and hundreds of people who claimed
            they saw Him alive again?
          </p>
          <p>You do not have to answer every skeptic on your own, and you do not have to have this memorized perfectly by tomorrow.</p>
          <p>You just need to know the ground is solid.</p>
          <p>
            When you are ready, the next step is the resurrection itself, in{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith in Jesus
            </ArticleLink>
            .
          </p>
          <p>The man was real. The cross was real. Now go see what the empty tomb means.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Building a faith that can stand up to hard questions starts with actually knowing
            your Bible, not just knowing about it.
          </p>
          <p>
            Inside <strong>Bible Buddy</strong>, you will find:
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English, so the history and the meaning behind hard passages actually make sense</li>
          <li>🌱 Daily devotionals that build real confidence over time, not just a burst of motivation</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 A community of believers walking through the same honest questions</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is free to start. No pressure, no credit card.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
