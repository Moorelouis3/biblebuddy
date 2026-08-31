import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("how-do-you-know-you-are-saved", {
  title: "How Do You Know You Are Saved? 6 Biblical Signs Your Faith Is Real",
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

export default function HowDoYouKnowYouAreSavedPage() {
  return (
    <BlogPostShell
      slug="how-do-you-know-you-are-saved"
      title={<>📖 How Do You Know You Are Saved? 6 Biblical Signs Your Faith Is Real</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>It is late. The house is quiet.</p>
            <p>And a question shows up that you cannot pray away.</p>
            <p>What if I am not really saved?</p>
            <p>You said the prayer. You believe in Jesus. You go to church, or you used to.</p>
            <p>
              But you still sin. You still doubt. You still have days when God feels far away. And
              somewhere along the line, someone made it sound like real Christians do not struggle
              like you struggle.
            </p>
            <p>
              Maybe it was a comment from a well meaning friend. Maybe it was a sermon that left you
              feeling smaller instead of freer. Maybe it is just the quiet voice in your own head that
              keeps a running list of every reason you might not measure up.
            </p>
            <p>
              📌 <strong>So how do you know you are saved? Not guess. Not hope. Know.</strong>
            </p>
            <p>
              This guide walks through six biblical signs that your faith is real. Not six things you
              have to do to earn salvation. Six things God does in a person He has actually saved.
            </p>
            <p>
              You are not the first person to lie awake with this exact question, and you will not be
              the last. Christians who love God deeply have asked it for as long as the church has
              existed.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 Maybe you are scoring yourself against a list you cannot pass.</li>
            <li>🔲 Maybe you are waiting for a feeling that never arrives.</li>
            <li>🔲 Maybe you have just never been shown what the Bible actually says.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Here is the truth this whole guide is built on.</p>
            <p>Salvation is not something you earn. It is something you receive by faith.</p>
            <p>
              📖 But real faith never leaves a person unchanged. It always leaves evidence behind. And
              that evidence is what you are about to read.
            </p>
            <p>Get quiet for a minute. Let&apos;s look at what God says, not what your fear says.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the six signs, you need the ground they stand on.</p>
          <p>
            This question matters more than almost any other question a person can ask, because
            everything else in your life eventually gets sorted by the answer to it. Your peace at
            night. Your sense of who you belong to. Whether the cross was for you specifically, or
            just for people who somehow have it more figured out than you do.
          </p>
          <p>Here is the whole gospel in four short beats.</p>
          <p>
            📌 <strong>Everyone has sinned.</strong> Not most people. Everyone. That includes you, and
            it includes the person who hurt you.
          </p>
        </div>
        <VerseQuote text="For all have sinned, and come short of the glory of God;" reference="Romans 3:23" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Sin leads to death.</strong> Not just physical death. Separation from the God
            who made you.
          </p>
        </div>
        <VerseQuote
          text="For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord."
          reference="Romans 6:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>📌 We cannot save ourselves. Good works cannot erase guilt.</p>
          <p>You cannot out perform a debt you already owe.</p>
          <p>📌 Jesus paid the price. And we are saved through faith in Christ, not our own effort.</p>
        </div>
        <VerseQuote
          text="For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast."
          reference="Ephesians 2:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is why this matters more than any other question you will ever ask.</p>
          <p>Your eternity is not resting on a feeling you had one Sunday.</p>
          <p>It is resting on what Jesus already did.</p>
          <p>
            But here is the hinge the rest of this guide turns on. Salvation is received by faith.{" "}
            <strong>But real faith never leaves you unchanged.</strong>
          </p>
          <p>
            The six signs below do not earn your salvation. They reveal what God is already producing
            in you.
          </p>
          <p>
            Think of it like checking a plant for roots instead of demanding it already be a full
            grown tree. Roots do not prove the tree is finished growing. They prove it is genuinely
            alive and connected to something that can sustain it.
          </p>
          <p>
            📌 <strong>Look for the fruit, not perfection.</strong>
          </p>
          <p>
            And if the question itself has you lying awake with your heart racing, it may help to
            read what{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              Scripture says about fear
            </ArticleLink>{" "}
            too. Fear is not the same thing as faith, and it should not be the voice deciding this for
            you.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 6 Biblical Signs Your Faith Is Real
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. You Truly Believe in Jesus Christ
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Salvation starts here, and it never moves past it.</p>
          <p>You have confessed Jesus as Lord. You believe in your heart that God raised Him from the dead.</p>
        </div>
        <VerseQuote
          text="That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved. For with the heart man believeth unto righteousness; and with the mouth confession is made unto salvation."
          reference="Romans 10:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not believing facts about Jesus the way you believe facts about history.</p>
          <p>Trusting Him. Leaning your whole weight on Him.</p>
          <p>
            Think about the difference between knowing a chair exists and actually sitting down in
            it. You can believe every true thing about Jesus, His birth, His miracles, His death, His
            resurrection, and still never put your weight on Him.
          </p>
          <p>Saving faith is the moment you stop admiring the chair and sit down.</p>
          <p>
            You stop treating Jesus like a good historical figure or a moral teacher worth studying,
            and you start treating Him like the Lord your whole life actually answers to. That shift
            usually comes with a moment, even if the moment felt small and unremarkable at the time.
          </p>
          <p>
            That is what it means to confess Jesus as Lord. Not just Savior, someone you keep around
            for emergencies. Lord, someone whose word actually gets the final say in your life.
          </p>
          <p>
            If you can look back and honestly say you did that, even quietly, even without fireworks,
            you have this first sign already.
          </p>
          <p>What that looks like in an ordinary week:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 You talk to Jesus like He is really listening, not like you are performing.</li>
            <li>🟢 When life gets hard, He is the first place you turn, not the last resort.</li>
            <li>🟢 You believe He rose from the dead, not as trivia, but as the hinge your whole hope hangs on.</li>
          </ul>
          <p>📌 Salvation begins with faith in Christ. Everything else on this list grows out of that root.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. You Have Turned Away From Sin
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Repentance is more than feeling sorry.</p>
          <p>It is a change of mind that produces a change in direction.</p>
        </div>
        <VerseQuote
          text="Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord;"
          reference="Acts 3:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>You will still struggle with sin.</p>
          <p>But you no longer want sin to rule you.</p>
          <p>
            ❓ Notice the difference. Not sinless. Not sin free. Just no longer content to let sin sit
            on the throne.
          </p>
          <p>
            That fight for{" "}
            <ArticleLink href="/blog/building-self-control">self control</ArticleLink>{" "}
            you feel every time you choose not to say the sharp thing or click the thing you know you
            should not, that fight is itself part of the evidence.
          </p>
          <p>
            Think of it like a boat turning around in the water. The moment the wheel turns, the boat
            does not instantly face the new direction. It keeps drifting on the old momentum for a
            while, even as the engine is already pulling the other way.
          </p>
          <p>
            That drift is not proof the turn never happened. It is just physics. Old sin has momentum
            too. Give it time to catch up with the new direction your heart is already facing.
          </p>
          <p>What that looks like in an ordinary week:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 You feel real conviction after sinning instead of nothing at all.</li>
            <li>🟢 You are actually trying to walk away from something, even if you have failed at it before.</li>
            <li>🟢 You would rather be corrected by God&apos;s Word than stay comfortable in the wrong.</li>
          </ul>
          <p>📌 Real faith changes your direction, even when it has not finished changing your habits.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. God Has Given You a New Heart
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You are no longer comfortable remaining exactly who you were.</p>
          <p>God begins changing your desires, your priorities, and the way you live.</p>
        </div>
        <VerseQuote
          text="A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh."
          reference="Ezekiel 36:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A stony heart does not flinch. It does not grieve over sin. It does not ache for God.</p>
          <p>A heart of flesh does.</p>
          <p>
            💡 If the things that used to feel harmless now bother your conscience, that is not you
            getting stricter with yourself. That is a new heart, doing what a new heart does.
          </p>
          <p>
            Notice something else about that verse. God does not say He will soften your old heart. He
            says He will take it away and give you a different one entirely.
          </p>
          <p>
            This is a promise, spoken through Ezekiel to a scattered, discouraged people, long before
            Jesus ever walked the earth. Even then, God was already describing the kind of inward
            renewal He would one day give through His Spirit.
          </p>
          <p>
            That is why trying to reform the old you never worked for very long. You cannot talk a
            stone into caring. But a heart of flesh cares without being talked into it. It aches when
            it used to shrug. It notices when it used to sleep right through.
          </p>
          <p>
            You may not have chosen the timing or the exact moment it happened. Most believers cannot
            point to the precise second their heart changed. What you can do is look at the evidence
            now and ask whether the change described in Ezekiel actually matches the direction of your
            own life.
          </p>
          <p>What that looks like in an ordinary week:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 Something you used to laugh at now makes you uncomfortable.</li>
            <li>🟢 You genuinely want to be different, not just look different to other people.</li>
            <li>🟢 Priorities have quietly shifted, even ones you never consciously decided to change.</li>
          </ul>
          <p>📌 Salvation produces a new life, not just a new label.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Holy Spirit Lives in You
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not leave you to follow Him alone.</p>
          <p>The Spirit convicts you, guides you into truth, and helps you become more like Christ.</p>
        </div>
        <VerseQuote
          text="The Spirit itself beareth witness with our spirit, that we are the children of God:"
          reference="Romans 8:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That conviction you feel after you snap at someone you love. That quiet nudge to open your
            Bible on a night you would rather scroll. That is not you being hard on yourself.
          </p>
          <p>That is a Person, living inside you.</p>
          <p>
            Before you were saved, sin might not have bothered you much at all. It just felt like
            living. Now it costs you something. There is friction where there used to be none.
          </p>
          <p>
            That friction is not a malfunction. It is the Spirit doing exactly what He was sent to do,
            keeping you from settling somewhere you do not actually belong anymore.
          </p>
          <p>What that looks like in an ordinary week:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 A quiet nudge steers you away from a bad decision before you make it.</li>
            <li>🟢 Scripture you read years ago suddenly makes sense in a way it never did before.</li>
            <li>🟢 You sense you are not facing your struggles completely alone.</li>
          </ul>
          <p>📌 You belong to God, and His Spirit leads you.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. You Want to Know and Obey God
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The Bible becomes more than a book.</p>
          <p>You do not obey to earn salvation. You obey because you love Him.</p>
        </div>
        <VerseQuote text="If ye love me, keep my commandments." reference="John 14:15" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the order in that verse. Love comes first. Obedience follows it. Jesus never flips
            that around.
          </p>
          <p>
            You may still fail at obeying plenty. But there is a difference between a person who wants
            to obey and keeps stumbling, and a person who never wanted to in the first place.
          </p>
          <p>
            Think about how that plays out with someone you actually love. You do the dishes without
            being asked, not because you are worried about getting caught if you do not, but because
            you want to make their life easier. Obedience out of love looks completely different than
            obedience out of fear.
          </p>
          <p>
            That is the shift salvation produces. The Bible stops being a rulebook you are graded on
            and starts being a love letter you actually want to read.
          </p>
          <p>What that looks like in an ordinary week:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 You genuinely miss reading the Bible when a week gets away from you.</li>
            <li>🟢 You catch yourself wanting to obey, even in the small, unseen decisions.</li>
            <li>🟢 Prayer feels less like a duty and more like a conversation with someone you trust.</li>
          </ul>
          <p>📌 Real faith creates a hunger for God, not a checklist to survive Him.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. You Want Others to Know Jesus
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The gospel is the good news of what Jesus accomplished through His death and resurrection.
          </p>
          <p>And when Christ transforms your life, you want others to experience His grace too.</p>
        </div>
        <VerseQuote
          text="And he said unto them, Go ye into all the world, and preach the gospel to every creature."
          reference="Mark 16:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            You do not have to preach on a street corner for this to be true of you. It might look like
            praying for your neighbor by name. Sending a text to a friend who is hurting.
          </p>
          <p>
            💡 A heart that has truly tasted grace finds it hard to keep quiet about where it came
            from.
          </p>
          <p>
            Think of the last time you found a great restaurant, or a doctor who actually helped, or a
            show worth your time. You told someone. Not because you were assigned to. Because good
            news is hard to sit on.
          </p>
          <p>
            The gospel is the best news anyone has ever heard, and if it has actually landed in you,
            it will not stay locked inside your own chest forever.
          </p>
          <p>What that looks like in an ordinary week:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🟢 You bring up your faith naturally, without it feeling forced.</li>
            <li>🟢 You genuinely want the people you love to know Jesus too, even if it makes conversations awkward.</li>
            <li>🟢 You pray by name for someone who does not know Him yet.</li>
          </ul>
          <p>📌 Saved people want to share the Savior.</p>
          <p>Six signs. None of them a scoreboard. All of them fruit from the same root.</p>
          <p>
            ⚠️ <strong>None of this means you have to be perfect at all six, all the time.</strong>{" "}
            Struggling with sin is not the same thing as being ruled by it. The question was never how
            perfectly you are living. The question is which direction you are facing.
          </p>
          <p>
            You probably did not see every sign equally strong in yourself as you read through this
            list. That is normal. Different believers grow at different speeds in different areas,
            just like a plant does not grow every leaf on the same day.
          </p>
          <p>
            What matters is whether you can see the root. If even one or two of these signs are
            genuinely, honestly true of you right now, that is not a small thing. That is the
            fingerprint of God&apos;s work already in progress.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: How To Grow in Assurance
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Assurance is not a feeling you chase once and keep forever.</p>
          <p>
            It is something you <strong>build</strong>, the same way trust in any relationship gets
            built. Not with one grand gesture, but with small, repeated moments that add up over time.
          </p>
          <p>Here are seven ways to start today.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Stop measuring yourself by a feeling.</strong> Feelings move with your sleep, your
            hormones, and your bad week. Your salvation does not rest on any of those. It rests on
            what Jesus did, once, on the cross, two thousand years before you ever felt a single
            emotion about it.
          </li>
          <li>
            <strong>Look for fruit, not perfection.</strong> Ask honestly: do you love God more than
            you used to? Do you hate sin more than you used to? Growth, even slow growth, is evidence
            of life. A tree does not have to be full grown to be alive. It just has to be growing.
          </li>
          <li>
            <strong>Read 1 John slowly.</strong> John wrote that whole letter so believers could know,
            not guess, that they have eternal life. It is the clearest test list in Scripture, and it
            was written for people just as unsure as you feel right now.
          </li>
          <li>
            <strong>Confess the specific sin, not just the general guilt.</strong> Vague guilt keeps
            you spinning. A named sin, brought honestly to God, gets forgiven and left behind. Naming
            it out loud, even just to God, takes away a lot of its power to hide.
          </li>
          <li>
            <strong>Watch your direction over months, not moments.</strong> One bad day does not undo
            a changed life. Zoom out. Are you closer to God this year than last year? That is the
            question that actually tells you something.
          </li>
          <li>
            <strong>Tell another believer what you are wrestling with.</strong> Doubt shrinks in the
            light. A trusted, mature Christian can often see fruit growing in you long before you
            notice it yourself, because it is easier to spot growth in someone else&apos;s life than
            in your own.
          </li>
          <li>
            <strong>Get help if the doubt will not lift.</strong> Sometimes what feels like spiritual
            doubt is really anxiety wearing a spiritual costume. If that sounds like you, a counselor
            is not a failure of faith. God works through wise helpers too, and there is no extra credit
            for suffering through something alone that help was available for.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>None of these seven earn you anything.</p>
          <p>They just help you see clearly what God has already done.</p>
          <p>
            Pick one or two to start, not all seven at once. A habit you actually keep for a month
            will do more for your assurance than an ambitious list you abandon after three days.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Assurance of Salvation
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The six signs show you the fruit. These five verses go straight to the promise.</p>
          <p>
            Keep one of them close this week. Write it down. Say it out loud on the nights the doubt
            gets loud. God&apos;s own words are stronger medicine than anything your anxious thoughts
            can manufacture.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 John 5:13</h3>
        <VerseQuote
          text="These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life, and that ye may believe on the name of the Son of God."
          reference="1 John 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that verse again. John wrote it for exactly one reason.</p>
          <p>So you could know, not wonder.</p>
          <p>
            Assurance is not arrogance. It is not you claiming to be better than anyone else. It is you
            taking God at His word about what He already did for you.
          </p>
          <p>
            John was writing to real people with real doubts, the same kind you are carrying right
            now. He did not tell them to work harder for certainty. He handed them a letter and said
            this is so you can know.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Corinthians 5:17</h3>
        <VerseQuote
          text="Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."
          reference="2 Corinthians 5:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not a slightly improved version of the old you. A new creature.</p>
          <p>
            You do not have to manufacture that newness. You just have to look for it, honestly, in
            the direction your life has actually gone.
          </p>
          <p>
            Old things passed away does not mean every old habit vanished overnight. It means the
            person you were, dead in sin and running from God, is not who you are anymore. The
            direction of your whole life has already turned.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. John 10:28 and 29</h3>
        <VerseQuote
          text="And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand. My Father, which gave them me, is greater than all; and no man is able to pluck them out of my Father's hand."
          reference="John 10:28 and 29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two hands are named here. The Son&apos;s hand, and the Father&apos;s.</p>
          <p>
            You are not gripping salvation with your own tired fingers, hoping you do not slip. You
            are held.
          </p>
          <p>
            That matters on the nights your own grip feels weak. Your hold on Jesus might waver. His
            hold on you does not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 John 3:14</h3>
        <VerseQuote
          text="We know that we have passed from death unto life, because we love the brethren. He that loveth not his brother abideth in death."
          reference="1 John 3:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is a test almost no one uses. Do you love other believers, genuinely, not just tolerate them?</p>
          <p>Real love for God&apos;s people is one of the quietest, most reliable signs there is.</p>
          <p>
            Not admiring believers from a distance. Actually caring when they hurt, actually
            celebrating when they win, actually showing up. That kind of love is not natural. It is
            evidence something supernatural moved in.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Corinthians 13:5</h3>
        <VerseQuote
          text="Examine yourselves, whether ye be in the faith; prove your own selves. Know ye not your own selves, how that Jesus Christ is in you, except ye be reprobates?"
          reference="2 Corinthians 13:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul does not tell you to guess. He tells you to examine.</p>
          <p>
            That is the whole spirit of this guide. Not a scoreboard to fail. An honest, Scripture
            guided look at whether Christ is actually at work in you.
          </p>
          <p>
            Notice what the examination is looking for. Not whether you are flawless. Whether Jesus
            Christ is in you. That is a very different test, and it is one you can actually pass.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Assurance of Salvation
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How can I know for sure that I am saved?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Start with what Jesus did, not what you feel. If you have genuinely believed in Him and
          trusted Him for salvation, you are saved, and 1 John 5:13 says you can know it. Then look
          for the fruit this guide walks through: a changed direction, a new heart, a hunger for God.
          Fruit does not save you, but it confirms that real faith is there. Certainty is not
          arrogance when it is built on God&apos;s promise instead of your own performance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it a sin to doubt your salvation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Doubt is not the same as unbelief. Plenty of faithful people in Scripture wrestled with
          real questions. What matters is where you take the doubt. Bring it to God and His Word
          instead of just sitting in it. Honest doubt that seeks an answer is very different from a
          hardened heart that has stopped asking. Thomas doubted the resurrection out loud, and Jesus
          met him with evidence, not condemnation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What if I do not feel saved?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Feelings are the least reliable part of the whole picture. They shift with sleep, stress,
          and circumstances. Salvation rests on what Jesus finished at the cross, not on your emotional
          weather. If you have felt anxious about this for a while, it may be worth reading what{" "}
          <ArticleLink href="/blog/is-anxiety-a-sin">
            Scripture actually says about anxious thoughts
          </ArticleLink>{" "}
          too, because sometimes the fear itself needs its own attention.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can you lose your salvation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sincere, Bible believing Christians read the same verses and land in different places on
          this question. It deserves more room than one paragraph, so read the{" "}
          <ArticleLink href="/blog/can-you-lose-your-salvation">
            full breakdown of what the Bible says about losing your salvation
          </ArticleLink>{" "}
          for both sides handled honestly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does struggling with sin mean I am not really saved?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Every believer in Scripture struggled with sin after coming to faith, Paul included. The
          question is not whether sin still shows up. It is whether sin still rules you, or whether
          you fight it, confess it, and keep turning back to God. Direction, not perfection. Paul
          himself called this the war between what he wanted to do and what he actually did, and he
          wrote that as a mature believer, not a new one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to be born again?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus used that exact phrase with Nicodemus in John 3. It means a spiritual new start, not a
          self improvement project. God gives you a new heart and a new spirit, the same new heart
          Ezekiel 36:26 promises. It is something done to you and in you, not something you accomplish
          on your own. Nicodemus himself was confused by it, and Jesus told him plainly that this is
          the Spirit&apos;s work, not a technique anyone can master on their own effort.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do good works save you?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Ephesians 2:8 and 9 is clear that salvation is a gift, not a wage you earn. But James
          says real faith always shows up in how you live. Good works do not buy salvation. They are
          the natural evidence that salvation already happened, the way smoke is evidence of a fire
          rather than the thing that started it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What if I said the sinner&apos;s prayer years ago but nothing in my life ever changed?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A prayer said once, with no lasting fruit and no ongoing faith, is worth examining honestly
          rather than assuming. This is exactly what 2 Corinthians 13:5 is asking you to do. It is
          never too late to turn to Christ again in genuine, present tense faith. God is not counting
          how many years ago you prayed. He is looking at where your heart stands right now. A prayer
          is not a magic formula that saves you regardless of what follows it. Saving faith is
          ongoing trust, not a single sentence spoken once and forgotten.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is believing facts about Jesus enough to be saved?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. James says even the demons believe there is one God, and they tremble. That is belief
          without trust and without surrender. Saving faith is not just agreeing Jesus existed. It is
          leaning your whole weight on Him as Lord. History facts sit in your head. Saving faith moves
          into your heart and rearranges how you actually live.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do I still sin if the Holy Spirit lives in me?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the Spirit changes you gradually, not instantly, in a body and a world still marked
          by sin. The presence of the Spirit does not mean the absence of struggle. It means you now
          have conviction, strength, and a Helper you did not have before. That ongoing fight is
          itself part of the evidence He is there. An unbeliever with no Spirit in them does not feel
          this tension at all. The very fact that sin bothers you is proof of a war going on inside
          you that was not there before.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between assurance and false confidence?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Assurance rests on what Jesus did and shows up as real, growing fruit in your life. False
          confidence rests on a memory of a decision, or a family tradition, with no ongoing love for
          God and no discomfort with sin at all. If the thought of examining your own heart terrifies
          you, that discomfort is often a good sign, not a bad one. A truly hardened heart rarely asks
          this question in the first place. Jesus warned about people who called Him Lord and were
          still strangers to Him, which is exactly why an honest checkup like this one matters more
          than a comfortable assumption ever could.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How long does it take to feel sure about your salvation?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          There is no set timeline in Scripture, and comparing your journey to someone else&apos;s
          rarely helps. Some believers sense it almost immediately. Others grow into settled assurance
          slowly, over years, through steady obedience and answered prayer. What matters is not how
          fast the certainty came, but whether your faith and direction are real right now.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the sin that cannot be forgiven?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus called it blasphemy against the Holy Spirit, and it describes a permanently hardened
          rejection of God, attributing His clear work to the devil, not a single bad thought or a
          moment of doubt. Here is what should actually comfort you: a person worried they may have
          committed it is showing exactly the tender conscience that unforgivable hardness does not
          have. The fact that this question troubles you is itself evidence against it being true of
          you.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Salvation is received by faith, not earned by performance.</strong> Ephesians
            2:8 and 9 settles that question. You did not save yourself, and you cannot lose your grip
            on a gift you never earned in the first place.
          </p>
          <p>
            📌 <strong>Real faith always leaves evidence.</strong> A believing heart, a turning away
            from sin, a new heart, the Spirit within you, a hunger for God, a love for others to know
            Him. Not perfection. Fruit.
          </p>
          <p>
            📌 <strong>The question was never how perfect you are. It is which direction you are
            facing.</strong>
          </p>
          <p>
            You did not read this guide by accident. If God is not real to you at all, none of this
            would matter enough to trouble you. The very fact that you care this much is itself worth
            paying attention to.
          </p>
          <p>
            You may close this page still carrying some of the same questions you opened it with.
            That is okay.
          </p>
          <p>
            Certainty about eternity rarely arrives all at once. For most believers it builds slowly,
            the way trust in a faithful friend builds, one kept promise at a time.
          </p>
          <p>
            Assurance usually grows the same way{" "}
            <ArticleLink href="/blog/what-is-the-fruit-of-the-spirit">
              fruit grows on a branch
            </ArticleLink>
            . Slowly. Quietly. Over a season, not overnight.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read 1 John 5:13 again. Then ask God honestly, in your own words, whether the six signs in
            this guide describe the direction your life is facing.
          </p>
          <p>Not a courtroom. A conversation.</p>
          <p>He is not looking to trap you. He is looking to be known by you.</p>
          <p>
            And whatever answer you find tonight, come back to this list again in a month, and again
            in a year. The signs of real faith tend to grow clearer with time, not fainter.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If questions about your faith keep circling back, you do not have to sort through them
            alone.
          </p>
          <p>
            Assurance grows the same way every other part of your walk with God grows. In the Word,
            day after day, verse after verse.
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
            Thousands of Christians are already reading this way, one day at a time. There is room for
            you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
