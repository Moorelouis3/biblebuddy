import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("lessons-from-the-life-of-jesus", {
  title: "15 Lessons From the Life of Jesus",
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

export default function LessonsFromTheLifeOfJesusPage() {
  return (
    <BlogPostShell
      slug="lessons-from-the-life-of-jesus"
      title={<>📖 15 Lessons From the Life of Jesus</>}
      intro={
        <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
          <p>You have probably seen a graphic like this before.</p>
          <p>A pretty background. A list of lessons from the life of Jesus. No verses. No context. Just a caption you scroll past.</p>
          <p>
            📌 <strong>This article is the real version.</strong>
          </p>
          <p>
            Every lesson below is tied to something Jesus actually said or did, with the chapter and
            verse so you can go read it yourself tonight.
          </p>
          <p>
            Jesus was a real person who walked real roads in first century Israel.{" "}
            <ArticleLink href="/blog/did-jesus-really-exist">
              Historians outside the Bible confirm He lived
            </ArticleLink>
            , and the four Gospels record what He taught in front of witnesses who watched Him live
            it out.
          </p>
          <p>That is what makes His example different from a quote graphic.</p>
          <p>These are not proverbs floating in space. Each one happened somewhere specific, to someone specific.</p>
          <p>
            Grab your Bible, or open one on your phone. Let&apos;s walk through what the life of
            Jesus actually teaches you.
          </p>
        </div>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Plenty of teachers have told people to love their neighbor or forgive their enemy.</p>
          <p>Jesus is the only one who did it while being betrayed, beaten, and nailed to a cross.</p>
          <p>
            📌 <strong>That is what makes His life more than good advice. It is proof the advice
            actually works.</strong>
          </p>
          <p>The world will hand you plenty of life lessons too.</p>
          <p>Hustle harder. Set better boundaries. Protect your peace.</p>
          <p>Some of that is not wrong. But none of it was lived out by someone who let it cost Him everything.</p>
          <p>
            ⚠️ <strong>A lesson nobody actually lived is just a theory.</strong>
          </p>
          <p>Jesus is not a theory. He is a Person you can study, chapter by chapter, in the Gospels.</p>
          <p>
            When you study how He treated people, prayed, handled pressure, and faced temptation,
            you are not collecting inspiration.
          </p>
          <p>
            You are watching the Son of God show you what a life fully surrendered to the Father
            actually looks like up close.
          </p>
          <p>
            ✅ <strong>That is why this list is worth more than any quote card. Every line of it can
            be verified, and every line of it can be followed.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Life of Jesus Actually Teaches You
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Fifteen moments from the Gospels, grouped into six things you can see Jesus doing again
          and again. Each one points to the exact passage it comes from.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. How Jesus Loved People Who Could Never Repay Him
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In the{" "}
            <ArticleLink href="/blog/salt-and-light">Sermon on the Mount</ArticleLink>, Jesus told
            His followers to love the people who could never pay them back.
          </p>
          <p>Not just neighbors. Enemies.</p>
        </div>
        <VerseQuote
          text="But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;"
          reference="Matthew 5:44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is not a nice sentiment. That is a command.</p>
          <p>
            📌 <strong>Love your enemies.</strong> Not tolerate them. Not avoid them. Love them.
          </p>
          <p>Jesus lived that same love toward a hungry crowd of thousands.</p>
          <p>He did not send them away to fend for themselves.</p>
        </div>
        <VerseQuote
          text="And Jesus went forth, and saw a great multitude, and was moved with compassion toward them, and he healed their sick."
          reference="Matthew 14:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the order. He was moved with compassion first.</p>
          <p>The healing and the feeding came after the compassion, not instead of it.</p>
          <p>He showed that same heart to a blind beggar named Bartimaeus.</p>
          <p>The crowd tried to shut Bartimaeus up. Jesus stopped everything for him instead.</p>
        </div>
        <VerseQuote
          text="And Jesus stood still, and commanded him to be called. And they call the blind man, saying unto him, Be of good comfort, rise; he calleth thee."
          reference="Mark 10:49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A whole crowd was walking with Jesus that day.</p>
          <p>He still stopped for one man nobody else thought was worth the delay.</p>
          <p>
            💡 <strong>Jesus never treated a person as an interruption.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. How Jesus Forgave and Told the Truth in Love
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>While nails were still in His hands, Jesus prayed for the men killing Him.</p>
          <p>He did not wait for them to apologize first.</p>
        </div>
        <VerseQuote
          text="Then said Jesus, Father, forgive them; for they know not what they do. And they parted his raiment, and cast lots."
          reference="Luke 23:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That prayer came before the crowd mocked Him. Before the soldiers gambled for His clothes.</p>
          <p>Forgiveness was His first move on the cross, not His last.</p>
          <p>He taught Peter that same forgiveness has no ceiling.</p>
        </div>
        <VerseQuote
          text="Then came Peter to him, and said, Lord, how oft shall my brother sin against me, and I forgive him? till seven times? Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven."
          reference="Matthew 18:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter thought seven was generous.</p>
          <p>❓ Four hundred and ninety was Jesus telling him to stop keeping count.</p>
          <p>But forgiveness never meant Jesus stayed silent about sin.</p>
          <p>
            A woman caught in adultery was dragged in front of Him to be stoned. The crowd wanted a
            verdict.
          </p>
        </div>
        <VerseQuote
          text="When Jesus had lifted up himself, and saw none but the woman, he said unto her, Woman, where are those thine accusers? hath no man condemned thee? She said, No man, Lord. And Jesus said unto her, Neither do I condemn thee: go, and sin no more."
          reference="John 8:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Look at what Jesus refused to do.</p>
          <p>He refused to condemn her. And He refused to pretend the sin did not matter.</p>
          <p>
            📌 <strong>Grace and truth stood in the same sentence.</strong>
          </p>
          <p>
            He did not lower the bar to make her feel better, and He did not raise a stone to make
            the crowd feel justified.
          </p>
          <p>Real love always tells the truth. It just refuses to throw it like a rock.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. How Jesus Prayed</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Even with crowds needing Him, Jesus got up before daylight to be alone with His Father.</p>
        </div>
        <VerseQuote
          text="And in the morning, rising up a great while before day, he went out, and departed into a solitary place, and there prayed."
          reference="Mark 1:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nobody made Him do that. He chose it, before the day could pull Him away from it.</p>
          <p>
            If you want to build that same habit,{" "}
            <ArticleLink href="/blog/how-to-spend-1-hour-with-god">
              here is a simple way to spend real time with God
            </ArticleLink>{" "}
            without it feeling like a chore.
          </p>
          <p>That same prayer life carried Him into the garden of Gethsemane.</p>
          <p>He knew exactly what the next day would cost Him. He asked His Father to remove the cup.</p>
        </div>
        <VerseQuote
          text="Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done."
          reference="Luke 22:42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice He asked honestly first.</p>
          <p>He did not pretend the cross did not terrify Him.</p>
          <p>
            💡 <strong>Then He surrendered anyway.</strong> Honest prayer and full obedience are not
            opposites. Jesus shows you they belong in the same sentence.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. How Jesus Handled Pressure and Temptation
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A storm hit the boat hard enough to terrify seasoned fishermen.</p>
          <p>Jesus was asleep. They woke Him, sure they were about to drown.</p>
        </div>
        <VerseQuote
          text="And he arose, and rebuked the wind, and said unto the sea, Peace, be still. And the wind ceased, and there was a great calm. And he said unto them, Why are ye so fearful? how is it that ye have no faith?"
          reference="Mark 4:39 and 40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two words stopped the storm. Peace, be still.</p>
          <p>Then He asked a harder question than the wind ever could. Why so afraid?</p>
          <p>
            After forty days without food in the wilderness, the devil offered Jesus bread, power,
            and glory in exchange for one shortcut.
          </p>
        </div>
        <VerseQuote
          text="But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."
          reference="Matthew 4:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice His weapon was not willpower. It was the Word, already known and ready to speak.</p>
          <p>
            <ArticleLink href="/blog/building-self-control">
              Building that kind of self control
            </ArticleLink>{" "}
            starts the same way, long before the temptation ever shows up.
          </p>
          <p>He met the same test on the water when Peter tried to walk to Him and started sinking.</p>
        </div>
        <VerseQuote
          text="But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me. And immediately Jesus stretched forth his hand, and caught him, and said unto him, O thou of little faith, wherefore didst thou doubt?"
          reference="Matthew 14:30 and 31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus did not wait for Peter to work it out on his own.</p>
          <p>He reached out immediately, the second Peter cried out.</p>
          <p>
            It is the same question Scripture keeps asking about{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              fear and faith
            </ArticleLink>{" "}
            in general. Why did doubt beat faith this time?
          </p>
          <p>
            And with a group of disciples who argued about who was greatest and misunderstood Him
            constantly, Jesus stayed patient instead of walking away.
          </p>
        </div>
        <VerseQuote
          text="He answereth him, and saith, O faithless generation, how long shall I be with you? how long shall I suffer you? bring him unto me."
          reference="Mark 9:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>You can hear the weariness in that line. He said it, and He still healed the boy right after.</p>
          <p>
            ⚠️ <strong>Pressure reveals what is really inside a person.</strong> Every time it
            revealed Jesus, it revealed patience, not panic.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. How Jesus Led and Served</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            At the last supper, He tied a towel around His waist and washed His disciples&apos;
            feet, the job of the lowest servant in the house.
          </p>
        </div>
        <VerseQuote
          text="If I then, your Lord and Master, have washed your feet; ye also ought to wash one another's feet. For I have given you an example, that ye should do as I have done to you."
          reference="John 13:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He was their Lord. He still knelt.</p>
          <p>
            📌 <strong>He led by going lower, not by demanding they look up to Him.</strong>
          </p>
          <p>That same leadership carried Him toward Jerusalem, knowing exactly what waited there.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when the time was come that he should be received up, he stedfastly set his face to go to Jerusalem,"
          reference="Luke 9:51"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He knew about the betrayal. He knew about the cross.</p>
          <p>He set His face toward it anyway and kept walking.</p>
          <p>
            ✅ <strong>Real leadership is not walking away from the hard road. It is walking toward
            it on purpose.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. How Jesus Gave Hope to People Everyone Else Overlooked
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus healed ten men with leprosy in one moment. Only one turned back to thank Him.</p>
        </div>
        <VerseQuote
          text="And Jesus answering said, Were there not ten cleansed? but where are the nine? There are not found that returned to give glory to God, save this stranger."
          reference="Luke 17:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus noticed the nine who did not come back.</p>
          <p>❓ If He is asking that question about your week, what would the honest answer be?</p>
          <p>
            On the same night He was betrayed, He turned to His frightened disciples and gave them
            something to hold onto for the rest of their lives.
          </p>
        </div>
        <VerseQuote
          text="Let not your heart be troubled: ye believe in God, believe also in me. In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you. And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also."
          reference="John 14:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He was hours from arrest, and He spent them comforting His friends instead of Himself.</p>
          <p>
            That promise is also what settles the question of{" "}
            <ArticleLink href="/blog/what-is-heaven">what heaven actually is</ArticleLink>.
          </p>
          <p>
            💡 <strong>Jesus gave hope to the ungrateful and the grieving alike. Neither group had
            to earn it first.</strong>
          </p>
        </div>

        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is fifteen lessons, and fifteen real places in the Gospels to go read them in full.</p>
          <p>
            💡 Reading each of these moments verse by verse, with the history and the language
            explained as you go, is exactly what <strong>Bible Buddy</strong> is for. It is free, so
            there is nothing stopping you from opening Matthew, Mark, Luke, or John tonight.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Living Like Jesus This Week
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Reading about Jesus is not the same as living like Him.</p>
          <p>Here are eight ways to put what you just read into practice, starting today.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Give God the first five minutes of your day.</strong> You do not need an hour
            to start. Before your phone gets a word in, tell God one honest thing, the way Jesus
            slipped away before daylight to pray.
          </li>
          <li>
            <strong>Say the hard forgiveness out loud, even if you do not feel it yet.</strong>{" "}
            Feelings often follow obedience instead of leading it. Pray the words. Let your heart
            catch up.
          </li>
          <li>
            <strong>Look for the one person everyone else is stepping around today.</strong> The
            crowd wanted to skip Bartimaeus. Be the person who stops instead of stepping past.
          </li>
          <li>
            <strong>Learn one verse before the temptation shows up, not during.</strong> Jesus
            already knew Scripture when the wilderness test came. Pick a verse for your specific
            struggle and memorize it this week.
          </li>
          <li>
            <strong>Do one act of service nobody will see or thank you for.</strong> Wash a dish
            that is not yours. Take a task off someone&apos;s plate quietly. Let it be unseen on
            purpose.
          </li>
          <li>
            <strong>Speak truth without throwing a stone.</strong> The next time you need to
            correct someone you love, ask if your words carry both grace and truth, or just one.
          </li>
          <li>
            <strong>Say thank you to God specifically, out loud.</strong> Do not let gratitude stay
            a silent feeling. Name exactly what He did, the way the one leper turned back and said it.
          </li>
          <li>
            <strong>Keep walking toward the hard thing you know God is asking of you.</strong> Jesus
            set His face toward Jerusalem knowing what it cost. Do not turn back from your own hard
            road just because it got harder.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Pick two of these, not all eight.</p>
          <p>Small and consistent will shape you more than a big week you cannot sustain.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 4 Bible Verses From the Life of Jesus
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          If you only carry four verses out of this whole article, carry these.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 23:34</h3>
        <VerseQuote
          text="Then said Jesus, Father, forgive them; for they know not what they do. And they parted his raiment, and cast lots."
          reference="Luke 23:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is Jesus praying for His executioners while the nails were still in His hands.</p>
          <p>Not after an apology. Not after they stopped mocking Him.</p>
          <p>Forgiveness came first, before it was deserved and before it was asked for.</p>
          <p>
            📌 <strong>If you are waiting for someone to earn your forgiveness before you offer it,
            this verse says you can start now.</strong>
          </p>
          <p>He did, at the worst possible moment of His life.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. John 13:34 and 35</h3>
        <VerseQuote
          text="A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another."
          reference="John 13:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He said this minutes after washing His disciples&apos; feet.</p>
          <p>The commandment was not new information. Loving one another was already in the Law.</p>
          <p>What was new was the standard. As I have loved you.</p>
          <p>That is a love measured by a towel and a basin, not by how the other person treats you first.</p>
          <p>This verse is the test Jesus gave the world for spotting His real followers.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Matthew 5:44</h3>
        <VerseQuote
          text="But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;"
          reference="Matthew 5:44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This verse alone separates the teaching of Jesus from almost every other moral code.</p>
          <p>Most teaching stops at do not hate your enemy.</p>
          <p>Jesus goes further. Bless. Do good. Pray for.</p>
          <p>Notice He does not ask you to feel warm toward your enemy first.</p>
          <p>He tells you to act in love, and lets the feeling follow the obedience.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 22:42</h3>
        <VerseQuote
          text="Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done."
          reference="Luke 22:42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is Jesus in Gethsemane, hours from the cross.</p>
          <p>He asked honestly for a way out. That part matters. Honest prayer is not weak faith.</p>
          <p>Then He surrendered to the Father&apos;s will anyway.</p>
          <p>
            This is the verse for the moment you are praying for God to remove something and He has
            not yet.
          </p>
          <p>You can ask honestly and still choose obedience in the very same breath.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Life of Jesus
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the greatest lesson Jesus taught?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          When asked which command mattered most, Jesus said to love God with everything you have,
          and to love your neighbor as yourself (Matthew 22:37 to 39). He said every other
          commandment in Scripture hangs on those two. Every lesson on this list is really one of
          those two commands lived out in a different situation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did Jesus actually practice what He preached?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, and that is what separates Him from a wise teacher with good sayings. He taught
          forgiveness, then forgave His executioners from the cross. He taught humility, then knelt
          and washed feet Himself. Nothing on this list is a rule He handed off to someone else to
          live out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Where in the Bible can I read the full story of Jesus&apos; life?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Start with the four Gospels: Matthew, Mark, Luke, and John. Each one tells the same life
          from a slightly different angle, and together they cover His birth, teaching, miracles,
          death, and resurrection. Any one of them is a good place to begin.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How do I start applying these lessons this week?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Do not try all fifteen at once. Pick the one lesson that stings the most right now, read
          its full passage, and ask God for one specific way to live it out today. Small and
          consistent beats big and abandoned every time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why are there four Gospels instead of one?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew, Mark, Luke, and John each wrote for a different audience and highlighted
          different details, the way four honest witnesses would. Instead of weakening the account,
          the overlap and the differences are part of why historians treat the Gospels as reliable
          testimony rather than one polished, edited story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jesus ever get angry?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. He overturned tables in the temple when merchants turned a house of prayer into a
          marketplace. His anger was never selfish or out of control. It was aimed at things that
          hurt people or dishonored God, and it never made Him sin. His anger is a model, not a
          contradiction of His gentleness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What was Jesus like as a person?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Gospels show someone children ran toward, not away from. He went to weddings and
          dinner parties, told stories with humor and sharp edges, wept openly at a friend&apos;s
          grave, and stayed patient with slow learners. He was not the stiff, distant figure some
          paintings suggest. People wanted to be near Him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Jesus spend so much time with sinners and outcasts?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He said it plainly himself. It is the sick who need a doctor, not the healthy. Tax
          collectors, lepers, and people the religious crowd avoided kept ending up at His table.
          That was not a loophole in His holiness. It was the whole point of why He came.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Jesus the only way to God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That is exactly what Jesus claimed about Himself, not just what later Christians decided.
          He said no one comes to the Father except through Him. That is a bold claim, and it is
          worth studying honestly rather than assuming, because it changes what you do with everything
          else on this list.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Fifteen lessons, and every one of them traces back to a real moment in the Gospels.</p>
          <p>
            📌 <strong>Jesus did not just teach love, forgiveness, and humility. He lived them,
            under real pressure, in front of real witnesses.</strong>
          </p>
          <p>
            He loved people who could not repay Him. He forgave before He was asked to. He prayed
            before the day could pull Him away, and He kept walking toward Jerusalem knowing exactly
            what it would cost.
          </p>
          <p>You do not have to master all fifteen this week.</p>
          <p>
            Pick one. Read the passage it comes from. Ask God to help you live it out today, and let
            tomorrow bring the next one.
          </p>
          <p>That is how a whole life gets shaped. One lesson, actually lived, at a time.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you want to read the full story behind any of these fifteen moments, you do not have
            to figure it out alone.
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
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
