import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("paul", {
  title: "Who Was Paul in the Bible? From Persecutor to Apostle",
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

export default function PaulCharacterStudyPage() {
  return (
    <BlogPostShell
      slug="paul"
      title={<>📖 Who Was Paul in the Bible? From Persecutor to Apostle</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Ever think you have done too much for God to use you?</p>
            <p>Not too little. Too much.</p>
            <p>There is a name you cannot say out loud in church without your face getting hot.</p>
            <p>A season you hope nobody looks into.</p>
            <p>
              📌 <strong>Paul wrote almost half the New Testament, and he did it as a man who used
              to hunt Christians for a living.</strong>
            </p>
            <p>Not a skeptic. Not a seeker. Not confused.</p>
            <p>He dragged believers out of their homes and approved of their executions.</p>
            <p>Then Jesus stopped him in the middle of the road.</p>
            <p>And the man who destroyed the message spent the rest of his life preaching it.</p>
            <p>
              This is the whole story of Paul in the Bible, walked through in order, straight from
              the text. Who he was before. What actually happened on that road. What it cost him.
              And what his life still says to you.
            </p>
            <p>Let&apos;s walk through it.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Paul Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>He was born Saul, in Tarsus, a major intellectual city of the Roman Empire.</p>
          <p>He lived in the first century, overlapping with the earliest years of the Church.</p>
          <p>
            📌 His story runs through <strong>Acts 7 to Acts 28</strong>, plus everything he tells
            us about himself in his own letters.
          </p>
          <p>Here is what he brought to the table before he ever met Jesus.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🔥 A strict Pharisee, from a family of Pharisees</li>
          <li>🔥 Trained under Gamaliel, one of the most respected teachers alive</li>
          <li>🔥 Fluent in Hebrew tradition and Greek culture</li>
          <li>🔥 A Roman citizen by birth, which was rare and valuable</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He was educated. Disciplined. Devout.</p>
          <p>He also wrote thirteen books of your New Testament.</p>
          <p>
            💡 If you have ever wondered{" "}
            <ArticleLink href="/blog/what-is-the-bible">what the Bible actually is</ArticleLink> and
            who wrote it, Paul is a huge part of that answer.
          </p>
          <p>Now here is how his life actually went.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life of Paul</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Saul Was Not Spiritually Lazy. He Was Spiritually Intense.</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>People imagine Paul before Christ as some wild sinner.</p>
          <p>He was the opposite.</p>
          <p>He was the most religious man in the room, every room.</p>
          <p>He described himself this way years later:</p>
        </div>
        <VerseQuote
          text="Circumcised the eighth day, of the stock of Israel, of the tribe of Benjamin, an Hebrew of the Hebrews; as touching the law, a Pharisee."
          reference="Philippians 3:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>⚠️ That is the part people miss.</p>
          <p>
            <strong>You can be extremely religious and completely wrong.</strong>
          </p>
          <p>Saul believed followers of Jesus were dangerous heretics.</p>
          <p>He believed he was defending God&apos;s honor.</p>
          <p>And he was sincerely, devoutly, energetically fighting against God&apos;s Messiah.</p>
          <p>Understand why he saw it that way.</p>
          <p>The Law said a man hung on a tree was cursed.</p>
          <p>So a crucified Messiah was not just wrong to Saul. It was blasphemy.</p>
          <p>Every instinct his training gave him pointed the same direction.</p>
          <p>Stamp this out before it spreads.</p>
          <p>
            💡 That is what makes his story so unsettling. He was not ignoring Scripture. He was
            reading it and still missing Jesus in it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Man Standing at Stephen&apos;s Execution</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first time we meet him, he is not throwing stones.</p>
          <p>He is holding the coats of the men who are.</p>
          <p>Stephen, the first Christian martyr, is being stoned to death.</p>
          <p>And Scripture makes sure you know Saul was there for it.</p>
        </div>
        <VerseQuote text="And Saul was consenting unto his death." reference="Acts 8:1" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>After that, he escalated.</p>
          <p>He went house to house. He dragged out men and women.</p>
          <p>He put them in prison. He voted for their deaths.</p>
          <p>He later admitted he tried to force them to blaspheme.</p>
          <p>
            ⚠️ <strong>This is not a man with a checkered past. This is a man with blood on his
            hands.</strong>
          </p>
          <p>Hold that in your head for what happens next.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Road to Damascus</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>He was traveling to Damascus with arrest warrants in hand.</p>
          <p>Going to find more Christians. Going to bring them back in chains.</p>
          <p>Then a light from heaven knocked him to the ground.</p>
        </div>
        <VerseQuote
          text="And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me?"
          reference="Acts 9:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that question again slowly.</p>
          <p>Jesus did not say why are you persecuting my people.</p>
          <p>
            He said <strong>why are you persecuting me</strong>.
          </p>
          <p>
            💡 To touch the Church is to touch Christ. He takes what happens to His people
            personally.
          </p>
          <p>Saul asked who is speaking.</p>
          <p>The answer: I am Jesus, whom thou persecutest.</p>
          <p>Everything he had built his life on collapsed in one sentence.</p>
          <p>If Jesus is alive, Saul had been fighting God this whole time.</p>
          <p>He was struck blind for three days.</p>
          <p>The proud Pharisee who dragged people through streets had to be led by the hand.</p>
          <p>
            📌 <strong>He arrived in Damascus exactly the way he had brought others there.
            Helpless.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Believer Who Had to Go Hug Him</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God sent a believer named Ananias to pray for him.</p>
          <p>Understand what God was asking.</p>
          <p>Go to the house where the man who came to arrest you is staying.</p>
          <p>Ananias said what any of us would say. Lord, I have heard about this man.</p>
          <p>God&apos;s answer was not a debate. It was a plan:</p>
        </div>
        <VerseQuote
          text="Go thy way: for he is a chosen vessel unto me, to bear my name before the Gentiles, and kings, and the children of Israel."
          reference="Acts 9:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ananias went. He laid hands on him.</p>
          <p>And he opened with two words that should stop you cold.</p>
          <p>
            <strong>Brother Saul.</strong>
          </p>
          <p>The man who murdered his friends, called brother.</p>
          <p>💡 That is the gospel in two words, spoken by someone who had every right to refuse.</p>
          <p>Saul&apos;s sight came back. He was baptized.</p>
          <p>And immediately he started preaching that Jesus is the Son of God.</p>
          <p>People were stunned. Is this not the man who destroyed believers?</p>
          <p>
            ⚠️ Grace changed him. It did not remove the opposition. He had to escape the city in a
            basket lowered through a hole in the wall.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Hidden Years Nobody Talks About</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Most people jump straight from the road to the missionary journeys.</p>
          <p>There is a gap in between, and it matters.</p>
          <p>Paul says he did not run to Jerusalem to be trained by the apostles.</p>
          <p>He went to Arabia. Then back to Damascus.</p>
          <p>
            <strong>Three years</strong> before his ministry really began.
          </p>
          <p>Think about what those years had to undo.</p>
          <p>Every passage he had used to justify hunting Christians, he now had to read again.</p>
          <p>Every argument he had won, he now had to answer.</p>
          <p>He had to rebuild an entire theology around a crucified Messiah he had called cursed.</p>
          <p>That does not happen in a weekend.</p>
          <p>And when he finally did go to Jerusalem, the believers there were still afraid of him.</p>
          <p>
            ⚠️ Some people will need years to trust your change. That is not unfair. That is just
            what damage costs.
          </p>
          <p>The man trained by Gamaliel now sat under the Holy Spirit and relearned everything.</p>
          <p>Same Scriptures. Completely new eyes.</p>
          <p>
            📌 <strong>God prepares before He promotes.</strong> Paul had the education already. He
            needed the years.
          </p>
          <p>
            If you are in a quiet season that feels like it is going nowhere, read the story of{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink> and his forty years in the desert.
            God does this on purpose.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Three Journeys and a Message for Everybody</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul spent the rest of his life on the road.</p>
          <p>Three major missionary journeys across the Roman world.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>⛵ He planted churches in cities that had never heard the name of Jesus</li>
          <li>✍️ He wrote letters back to them that became your New Testament</li>
          <li>🗣️ He argued in synagogues, marketplaces, and in front of philosophers in Athens</li>
          <li>⚖️ He stood trial before governors and kings and preached to them too</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He supported himself the whole time by making tents.</p>
          <p>He refused to be a financial burden on the churches he planted.</p>
          <p>💡 The greatest missionary in history had a day job.</p>
          <p>And he carried one message that broke the world open.</p>
          <p>The gospel is not only for Jews. It is for everybody.</p>
        </div>
        <VerseQuote
          text="There is neither Jew nor Greek, there is neither bond nor free, there is neither male nor female: for ye are all one in Christ Jesus."
          reference="Galatians 3:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Think about who wrote that sentence.</p>
          <p>A Pharisee. A man raised to keep those exact lines drawn.</p>
          <p>💡 Christ did not just save Paul. He dismantled his whole way of sorting people.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. What It Cost Him</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>We romanticize Paul. He did not have a comfortable life.</p>
          <p>He listed it out himself once, and it is brutal reading.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>⚠️ Whipped with thirty nine lashes, five separate times</li>
          <li>⚠️ Beaten with rods three times</li>
          <li>⚠️ Stoned and left for dead</li>
          <li>⚠️ Shipwrecked three times, once adrift a full day and night</li>
          <li>⚠️ Hungry, cold, sleepless, imprisoned, and constantly in danger</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He also carried something he called a thorn in the flesh.</p>
          <p>He begged God three times to take it away. God said no, and told him why:</p>
        </div>
        <VerseQuote
          text="My grace is sufficient for thee: for my strength is made perfect in weakness."
          reference="2 Corinthians 12:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Sometimes God removes the problem. Sometimes He leaves it and holds you inside it.
            Both are answers.
          </p>
          <p>He wrote some of his most joyful letters from a prison cell.</p>
          <p>Philippians, the book that keeps saying rejoice, was written in chains.</p>
          <p>Read that again.</p>
          <p>A man in custody, facing possible execution, writing a letter about joy.</p>
          <p>
            📌 <strong>His circumstances never once matched his tone. That is not denial. That is
            somebody whose hope was not built on his situation.</strong>
          </p>
          <p>He also kept planting churches in places that would forget him.</p>
          <p>He poured years into people who later turned on him.</p>
          <p>He kept going anyway.</p>
          <p>Tradition says he was executed in Rome under Nero.</p>
          <p>Near the end he wrote this to Timothy:</p>
        </div>
        <VerseQuote
          text="I have fought a good fight, I have finished my course, I have kept the faith."
          reference="2 Timothy 4:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not I was impressive. Not I was successful.</p>
          <p>
            📌 <strong>I finished. I kept the faith.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Paul&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Nobody is too far gone</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul held the coats at an execution and voted for deaths.</p>
          <p>He called himself the chief of sinners, and he was not being dramatic.</p>
          <p>
            📌 If God can use him, the thing in your past is not the disqualifier you think it is.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Sincerity is not the same as being right</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Saul was completely sincere while completely wrong.</p>
          <p>He was zealous, disciplined, and fighting God.</p>
          <p>
            ⚠️ Passion is not proof you are on the right road. Test what you believe against
            Scripture, not against how strongly you feel it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. God can use everything you were before</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul&apos;s Pharisee training let him argue Scripture with anybody.</p>
          <p>His Greek education let him speak to philosophers.</p>
          <p>His Roman citizenship kept him alive and got him to Rome.</p>
          <p>💡 God did not erase his background. He repurposed it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Somebody has to be Ananias</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul&apos;s story does not happen without a scared believer obeying God.</p>
          <p>Ananias walked toward the man who came to arrest him and called him brother.</p>
          <p>
            ❓ Who is the person you have written off that God might be sending you toward?
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Finishing beats impressing</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul&apos;s summary of his own life had three parts.</p>
          <p>I fought. I finished. I kept the faith.</p>
          <p>📌 No crowds, no numbers, no résumé. Just faithfulness all the way to the end.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Paul&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Acts 9:4</h3>
        <VerseQuote
          text="And he fell to the earth, and heard a voice saying unto him, Saul, Saul, why persecutest thou me?"
          reference="Acts 9:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The sentence that ended one life and started another.</p>
          <p>Notice Jesus says his name twice. That is how you speak to somebody you know.</p>
          <p>And notice the question is not what are you doing. It is why.</p>
          <p>💡 Jesus went straight for his heart, not his behavior.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Timothy 1:15</h3>
        <VerseQuote
          text="Christ Jesus came into the world to save sinners; of whom I am chief."
          reference="1 Timothy 1:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Written late in life, after decades of ministry.</p>
          <p>He does not say I was chief. He says I am.</p>
          <p>The closer he got to God, the more clearly he saw himself.</p>
          <p>📌 Growing in grace does not make you think less of your sin. It makes you love mercy more.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Corinthians 12:9</h3>
        <VerseQuote
          text="My grace is sufficient for thee: for my strength is made perfect in weakness."
          reference="2 Corinthians 12:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>God&apos;s answer to a prayer He said no to.</p>
          <p>Sufficient means enough. Not barely enough. Enough.</p>
          <p>The weakness was not removed. It became the place strength showed up.</p>
          <p>
            If you are praying about something that will not lift, read{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">what the Bible says
            about anxiety</ArticleLink> and where to carry it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Philippians 4:13</h3>
        <VerseQuote text="I can do all things through Christ which strengtheneth me." reference="Philippians 4:13" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most quoted and most misused verse Paul wrote.</p>
          <p>It is not about winning games or getting promotions.</p>
          <p>Read the verses before it. He is talking about surviving hunger and need.</p>
          <p>💡 It is a verse about contentment in hard places, written from prison.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Timothy 4:7</h3>
        <VerseQuote
          text="I have fought a good fight, I have finished my course, I have kept the faith."
          reference="2 Timothy 4:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Some of the last words he ever wrote.</p>
          <p>He is in a cell, near the end, and this is his summary.</p>
          <p>Three verbs. Fought. Finished. Kept.</p>
          <p>📌 That is a life you can actually aim at.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Paul</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Paul in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Paul was a first century Pharisee who violently persecuted the early Church, then met the
          risen Jesus on the road to Damascus and became the most influential missionary in
          Christian history. He planted churches across the Roman world and wrote thirteen books of
          the New Testament. His story is told in Acts 7 through 28 and throughout his own letters.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Saul change his name to Paul?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He did not, really. Saul was his Hebrew name and Paul was his Roman name, and he almost
          certainly had both from birth. Acts starts using Paul as his ministry turns toward
          Gentile audiences, where a Roman name made sense. It was not a conversion name change,
          even though it is often told that way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many books of the Bible did Paul write?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Thirteen letters carry his name: Romans through Philemon. Hebrews is sometimes attributed
          to him, but it is anonymous and scholars have debated it since the early Church, so most
          count thirteen. That is roughly half of the New Testament&apos;s books.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Paul one of the twelve disciples?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. He never walked with Jesus during His earthly ministry and was not part of the twelve.
          He called himself an apostle because the risen Christ appeared to him personally and
          commissioned him directly. He was blunt that he received his message by revelation, not
          from the other apostles.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was Paul&apos;s thorn in the flesh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nobody knows. Guesses include an eye disease, chronic illness, a speech problem, or
          persistent opposition from enemies. Paul deliberately never says. That silence may be
          the point: because it is unnamed, anyone carrying anything can read that passage and find
          themselves in it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did Paul die?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not record his death. Acts ends with him under house arrest in Rome, still
          preaching. Early Church tradition says he was beheaded in Rome under Emperor Nero, around
          AD 64 to 67. Beheading rather than crucifixion would fit his Roman citizenship.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Paul married?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not say clearly. In 1 Corinthians 7 he writes as an unmarried man and
          recommends singleness for those who can handle it. Some argue that as a Pharisee he would
          likely have married young and may have been widowed. The honest answer is that the Bible
          leaves it open.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Paul really see Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That is his claim, and he staked his life on it. He described it as an appearance of the
          risen Christ, not a vision or a feeling, and he pointed to it whenever anyone challenged
          his authority. Whatever happened on that road turned the Church&apos;s most dangerous
          enemy into its most tireless missionary overnight.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Paul so important to Christianity?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Two reasons. He carried the gospel out of Jewish communities and into the wider Roman
          world, which is why the faith spread the way it did. And his letters explain what the
          cross actually means, laying the theological foundation the Church has stood on ever
          since.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Paul today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That no past is too dark for God to redeem. That being sincere is not the same as being
          right. That God prepares people in private before He uses them in public. And that the
          goal is not to be impressive but to finish faithfully.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is proof of something you need on your worst days.</p>
          <p>
            📌 <strong>Grace is not a second chance for good people. It is a first chance for people
            who do not deserve one.</strong>
          </p>
          <p>The man who held the coats at an execution wrote most of your New Testament.</p>
          <p>The man who arrested believers spent his life making more of them.</p>
          <p>Nothing about that was earned. All of it was given.</p>
          <p>So here is your one next step.</p>
          <p>Read Acts 9 tonight, slowly.</p>
          <p>Watch how gently Jesus speaks to a man who was actively hurting His people.</p>
          <p>
            He speaks to you the same way. And if you want to see what happened to the man who wrote
            the Gospel that carries Paul&apos;s influence, read{" "}
            <ArticleLink href="/blog/luke">the story of Luke</ArticleLink> next.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul&apos;s letters can feel dense the first time through. You do not have to figure
            them out alone.
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
