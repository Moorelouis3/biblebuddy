import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("is-anxiety-a-sin", {
  title: "Is Anxiety a Sin? What the Bible Actually Teaches",
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

export default function IsAnxietyASinPage() {
  return (
    <BlogPostShell
      slug="is-anxiety-a-sin"
      title={<>📖 Is Anxiety a Sin? What the Bible Actually Teaches</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somebody told you that anxiety is a sin.</p>
            <p>
              Maybe they said it straight out. Maybe they just implied it with a raised eyebrow
              when you admitted you were struggling.
            </p>
            <p>
              📌 <strong>Now you are carrying two things instead of one. The anxious thought
              itself, and the guilt for having it.</strong>
            </p>
            <p>That is a heavy way to live.</p>
            <p>
              And it is worth asking honestly. Is anxiety a sin? Or is it something else entirely,
              something the Bible actually has compassion for?
            </p>
            <p>This guide will not hand you a slogan.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 You feel guilty for feeling anxious</li>
            <li>🔲 Somebody quoted a verse at you like it was a diagnosis</li>
            <li>🔲 You are tired of pretending you are fine on Sunday</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>If any of that is you, keep reading.</p>
            <p>
              Here is what might surprise you. Scripture draws a careful line between what you
              feel and what you do with it. And that line matters more than you have been told.
            </p>
            <p>
              📖 The clearest proof is not a verse about you at all. It is a night in a garden
              called Gethsemane, where the sinless Son of God was in genuine anguish.
            </p>
            <p>
              By the end of this guide you will know the difference between temptation and sin,
              what Jesus actually felt the night before the cross, when anxiety can turn into sin,
              and what God asks of you instead of shame.
            </p>
            <p>Take a breath. Let&apos;s walk through it together.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not just a question about a word.</p>
          <p>It is a question about whether you run to God with your anxious thoughts, or hide them from Him.</p>
          <p>
            If you believe anxiety itself is sin, every anxious moment becomes another reason to
            feel disqualified. You stop praying about it because you are too ashamed to bring it
            up. You perform calm on Sunday and fall apart Monday, alone.
          </p>
          <p>
            ⚠️ <strong>That is exactly the opposite of what Scripture calls you to.</strong>
          </p>
          <p>
            Guilt you did not earn does not draw you closer to God. It pushes you away from Him at
            the exact moment you need Him most.
          </p>
          <p>
            So the stakes here are not about winning an argument over a definition. The stakes are
            whether you keep bringing your fear to God, or whether false guilt convinces you that
            you are too anxious to be welcome in His presence.
          </p>
          <p>You have always been welcome. Even tonight, even like this.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Bible Actually Teaches About Anxiety and Sin
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Feeling Is Not the Same as a Sin
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sin, in Scripture, is a matter of the will.</p>
          <p>It is choosing to disobey, to distrust, to disbelieve, on purpose.</p>
          <p>
            An emotion is different. It arrives. It is not summoned by a decision the way sin is.
          </p>
          <p>
            You did not choose to feel your chest tighten when the phone rang with bad news. You
            did not decide to lie awake running through everything that could go wrong.
          </p>
          <p>
            📌 <strong>Anxiety is closer to hunger or grief than it is to a chosen act of
            rebellion.</strong>
          </p>
          <p>
            It is part of living in a body, in a broken world, with a mind that is wired to notice
            danger. That is not a design flaw in you. It is what it feels like to be human after
            the fall.
          </p>
          <p>Scripture is honest about this everywhere you look.</p>
          <p>
            Read the psalms of David and you will find fear, dread, and sleepless nights, and not
            one line of God rebuking him for feeling them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Jesus Himself Was in Anguish in Gethsemane
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the strongest proof of all.</p>
          <p>The night before the cross, Jesus went to a garden called Gethsemane to pray.</p>
        </div>
        <VerseQuote
          text="And he took with him Peter and the two sons of Zebedee, and began to be sorrowful and very heavy. Then saith he unto them, My soul is exceeding sorrowful, even unto death: tarry ye here, and watch with me."
          reference="Matthew 26:37 and 38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exceeding sorrowful, even unto death.</p>
          <p>That is not a calm man reciting a prayer. That is genuine anguish.</p>
          <p>Luke, a physician, records the physical toll of it.</p>
        </div>
        <VerseQuote
          text="And being in an agony he prayed more earnestly: and his sweat was as it were great drops of blood falling down to the ground."
          reference="Luke 22:44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>His own body responded to dread the way a body under crushing pressure does.</p>
          <p>And He prayed the same request three times.</p>
        </div>
        <VerseQuote
          text="O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt."
          reference="Matthew 26:39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now hold that next to this:</p>
        </div>
        <VerseQuote
          text="For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin."
          reference="Hebrews 4:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Yet without sin.</p>
          <p>
            📌 <strong>If dread itself were automatically sin, Jesus could not have felt it in
            Gethsemane and remained sinless. But He did both.</strong>
          </p>
          <p>
            That single fact should settle something for you tonight. The anguish you feel is not
            proof that something is wrong with your walk with God. It was present in the most
            faithful walk that ever existed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Temptation Is Not Sin, Giving In Is
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scripture actually gives you a framework for this, and it is not about anxiety at first glance. It is about temptation.</p>
        </div>
        <VerseQuote
          text="Let no man say when he is tempted, I am tempted of God: for God cannot be tempted with evil, neither tempteth he any man: But every man is tempted, when he is drawn away of his own lust, and enticed. Then when lust hath conceived, it bringeth forth sin."
          reference="James 1:13 to 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the order. Being tempted comes first, and it is not the sin.</p>
          <p>Sin is what happens further down the line, when the pull is entertained and acted on.</p>
          <p>
            📌 <strong>An anxious thought knocking on the door works the same way. The knock is not
            the sin. What you do after the knock is what matters.</strong>
          </p>
          <p>Paul says something similar about pressure in general:</p>
        </div>
        <VerseQuote
          text="There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it."
          reference="1 Corinthians 10:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Common to man. Not a mark of unusual failure. Common.</p>
          <p>And notice the promise attached. Not that the pressure vanishes, but that a way through it is always provided.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Where Anxiety Can Actually Become Sin
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now, honestly, there is a line.</p>
          <p>
            The feeling itself is not sin. But what you build on top of the feeling can become
            sin, and it is worth naming plainly rather than pretending it never happens.
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>⚠️ When anxiety hardens into a refusal to trust God with an outcome</li>
            <li>⚠️ When it drives you to lie, manipulate, or control others to feel safe</li>
            <li>⚠️ When it becomes an excuse to stop praying instead of a reason to pray more</li>
            <li>⚠️ When you let it grow into an idol of control that you serve instead of God</li>
          </ul>
          <p className="mt-5">
            That last one is worth sitting with. Anxiety often wants the same thing an idol wants:
            your full attention, your obedience, your worship.
          </p>
          <p>
            This is where <ArticleLink href="/blog/what-is-the-fruit-of-the-spirit">the fruit of the Spirit</ArticleLink>{" "}
            comes in. Self control is not about crushing the feeling by sheer force. It is about
            choosing, again and again, where your fear gets taken, and{" "}
            <ArticleLink href="/blog/building-self-control">building that self control</ArticleLink>{" "}
            over time like any other spiritual discipline.
          </p>
          <p>
            📌 <strong>The line is not the feeling. The line is what the feeling talks you into
            doing.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why False Guilt Makes It Worse
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you are in Christ, here is where you actually stand:</p>
        </div>
        <VerseQuote
          text="There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."
          reference="Romans 8:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>No condemnation. Not reduced condemnation. None.</p>
          <p>
            Piling guilt onto a person who is already anxious is not conviction from the Holy
            Spirit. It is an extra weight that Scripture never asked you to carry.
          </p>
          <p>John says something that lands directly on this:</p>
        </div>
        <VerseQuote text="For if our heart condemn us, God is greater than our heart, and knoweth all things." reference="1 John 3:20" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Your own heart can accuse you of things God never charged you with.</p>
          <p>He sees the whole picture. Your heart only sees the fear in front of it.</p>
          <p>
            💡 When you feel a wave of shame on top of the anxiety, ask a simple question. Is this
            conviction pointing me toward God, or is this just fear wearing a spiritual costume?
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. What God Actually Asks of You
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not command you to stop feeling anxious the way you would flip off a light switch. He never gives an instruction that impossible.</p>
          <p>What He asks for is a direction. Bring it to Him.</p>
        </div>
        <VerseQuote
          text="Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
          reference="Philippians 4:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the command is not aimed at the feeling. It is aimed at the destination.</p>
          <p>Every anxious thought becomes raw material for prayer instead of evidence against you.</p>
          <p>Peter says it even shorter:</p>
        </div>
        <VerseQuote text="Casting all your care upon him; for he careth for you." reference="1 Peter 5:7" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            You can find the full picture of what that looks like day to day in{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">
              what the Bible says about anxiety
            </ArticleLink>
            , but the short version is this. God is not asking you to feel nothing. He is asking
            you to bring what you feel to Him instead of managing it alone.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Jesus Understands, He Does Not Judge
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Isaiah described Him hundreds of years before He was born:</p>
        </div>
        <VerseQuote
          text="He is despised and rejected of men; a man of sorrows, and acquainted with grief."
          reference="Isaiah 53:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Acquainted with grief. Not a stranger to it. Familiar with it.</p>
          <p>Hebrews takes that a step further and turns it into a promise for you specifically:</p>
        </div>
        <VerseQuote
          text="For in that he himself hath suffered being tempted, he is able to succour them that are tempted."
          reference="Hebrews 2:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Succour means to run to your aid.</p>
          <p>
            He is not standing over you with a checklist, waiting to see if your faith is strong
            enough. He already walked through the exact kind of anguish you are carrying, and He
            did not sin doing it.
          </p>
          <p>
            And when Paul begged God three times to remove his own thorn, the answer was not a
            rebuke.
          </p>
        </div>
        <VerseQuote
          text="My grace is sufficient for thee: for my strength is made perfect in weakness."
          reference="2 Corinthians 12:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Weakness is not disqualifying. It is where His strength actually shows
            up.</strong>
          </p>
          <p>You are not on trial. You are being met.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Handling Anxiety Without the Guilt
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Understanding the difference between feeling and sin matters. Living it out day to day matters more. Here are eight ways to start.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Name it as a feeling, not a verdict.</strong> When the anxious thought shows
            up, say quietly, this is anxiety, not proof that I am unfaithful. Separating the two
            out loud breaks the shame spiral before it starts.
          </li>
          <li>
            <strong>Bring it to God the moment it knocks.</strong> Do not wait until you feel calm
            enough to pray properly. Pray the fear itself, in the actual words it is using in your
            head.
          </li>
          <li>
            <strong>Watch for the line into unbelief.</strong> Ask yourself honestly, am I feeling
            this, or am I refusing to hand it to Him? That question alone will show you where you
            actually stand.
          </li>
          <li>
            <strong>Keep one verse ready for the middle of the night.</strong> Memorize 1 Peter 5:7
            or Philippians 4:6 and 7. You want truth within reach before the spiral, not buried in
            an app you have to go find.
          </li>
          <li>
            <strong>Let Romans 8:1 correct the guilt, every time.</strong> When shame piles on top
            of the anxiety, say it back to yourself. There is therefore now no condemnation.
          </li>
          <li>
            <strong>Practice self control over what feeds the fear, not the feeling itself.</strong>
            Guard what you read late at night, who you compare your life to, and what you let run
            unchecked through your mind.
          </li>
          <li>
            <strong>Say the fear out loud to a trusted believer.</strong> Hidden anxiety grows in
            the dark. Spoken anxiety, brought into the light with someone who loves you, tends to
            shrink.
          </li>
          <li>
            <strong>Get real help when it is heavy.</strong> If anxiety is crushing you day after
            day, seeing a doctor or counselor is not weak faith. God works through wise helpers
            too, and taking care of your mind honors the God who made it.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Anxiety and Sin
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Matthew 26:39</h3>
        <VerseQuote
          text="O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt."
          reference="Matthew 26:39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus prayed this three times in Gethsemane, His soul exceeding sorrowful. He asked
            honestly for another way, and He surrendered honestly to His Father anyway.
          </p>
          <p>That is the pattern for you. Bring the honest request first. Let surrender follow, not replace it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Hebrews 4:15</h3>
        <VerseQuote
          text="For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin."
          reference="Hebrews 4:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse that settles the whole question. Jesus was tested in every way you
            are, and He carried it without sin. Feeling the pressure is not what made Him
            sinless or unsinless. What He did with it is.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Romans 8:1</h3>
        <VerseQuote
          text="There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."
          reference="Romans 8:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Keep this verse close for the moments guilt shows up uninvited. It does not say
            reduced condemnation. It says none. That covers the shame about the anxiety, not just the anxiety itself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Peter 5:7</h3>
        <VerseQuote text="Casting all your care upon him; for he careth for you." reference="1 Peter 5:7" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ten words, short enough to pray in a parking lot. All your care, not the polished parts
            you are willing to admit to. He asks for it because He genuinely cares, not because He is grading your composure.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Philippians 4:6 and 7</h3>
        <VerseQuote
          text="Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
          reference="Philippians 4:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul wrote this from a Roman prison. The instruction is not to feel nothing. It is to
            aim every worry at God instead of carrying it alone, and let His peace stand guard over what you cannot manage yourself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Anxiety and Sin
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is anxiety a sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, feeling anxious is not a sin. It is an emotion, and Scripture shows faithful people,
          and even Jesus Himself in Gethsemane, experiencing real anguish without it being sin.
          What Scripture warns against is what anxiety can turn into if you let it, like a refusal
          to trust God or a habit of control born of fear.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Was what Jesus felt in Gethsemane the same as anxiety?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Gospels describe Jesus as sorrowful, heavy, and in an agony so intense that His sweat
          fell like drops of blood. That is genuine dread and anguish, the same category of
          experience anxiety belongs to. And Scripture says plainly that He remained without sin
          the entire time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can anxiety become a sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The feeling itself is not sin, but what grows from it can be. If anxiety hardens into a
          settled refusal to trust God, or drives you to lie or manipulate others to feel safe, it
          has moved from a feeling into a choice. Watch what you do with the fear, not just the fear itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between temptation and sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          James 1 says temptation is being drawn toward something, and sin is what happens when
          that pull is acted on. Being tempted is not the sin. Giving in is. Anxious thoughts work
          the same way. The thought arriving is not sin. What you build on top of it can be.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does having anxiety mean I do not trust God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not automatically. David, Elijah, and Paul all wrote or experienced deep fear and still
          walked in real faith. Trust is not the absence of fear. It is what you do with the fear,
          namely bringing it to God instead of hiding it from Him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is doubting God because of anxiety a sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Honest questions brought to God in prayer are not the same as settled unbelief. The
          psalms are full of writers who asked God hard, doubting questions and were never
          condemned for it. What matters is where the doubt goes. Toward God in prayer, or away
          from Him entirely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is medication for anxiety okay for Christians?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Medicine is a gift of common grace, and taking it for your mind is no different than
          taking it for any other part of your body. Luke, who wrote two books of the Bible, was a
          physician. Pray about it, talk honestly with your doctor, and refuse the shame.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What did Jesus mean about taking no thought for tomorrow?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In Matthew 6, Jesus was teaching that today already has enough grace for today, and
          tomorrow will have its own grace when it arrives. It is an invitation to stay present
          with God one day at a time, not a command to feel nothing about the future.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do I feel guilty about being anxious?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Often because someone, sometimes with good intentions, treated anxiety like a faith
          problem instead of a human one. 1 John 3:20 says your own heart can condemn you over
          things God never charged you with. Bring the guilt itself to God alongside the anxiety.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Should Christians go to therapy for anxiety?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, if it helps. Proverbs says there is safety in a multitude of counselors, and a good
          counselor is exactly that. Getting help for a heavy, ongoing struggle is not a lack of
          faith. It is often what obedience looks like in practice.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Anxiety is a feeling, not a verdict.</strong> Jesus Himself was in genuine
            anguish in Gethsemane, and Scripture calls Him without sin the whole time.
          </p>
          <p>
            📌 <strong>The line is not the feeling. The line is what you build on it.</strong>{" "}
            Watch for unbelief, control, and hiding. Those are the places anxiety can turn into
            something more.
          </p>
          <p>
            📌 <strong>God does not want your guilt. He wants your honesty.</strong> Every anxious
            thought is raw material for prayer, not evidence against you.
          </p>
          <p>You will not walk out of this article free of every anxious thought.</p>
          <p>That was never the goal.</p>
          <p>
            The goal was to stop carrying the extra weight of thinking your fear disqualifies you.
            It never did.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Take the anxious thought that is loudest right now, the one you have been ashamed to
            pray about, and pray it. Plainly. Tonight.
          </p>
          <p>He already met you in Gethsemane. He will meet you here too.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If shame keeps you from bringing your real struggles to God, you do not have to carry
            that alone.
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
