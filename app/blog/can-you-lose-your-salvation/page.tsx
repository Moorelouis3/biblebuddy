import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("can-you-lose-your-salvation");

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

export default function CanYouLoseYourSalvationPage() {
  return (
    <BlogPostShell
      slug="can-you-lose-your-salvation"
      title={<>📖 Can You Lose Your Salvation? What the Bible Says</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You did the thing again.</p>
            <p>The sin you promised God, and yourself, you were done with.</p>
            <p>And now there is a voice in your head that will not stop asking one question.</p>
            <p>
              📌 <strong>Can you lose your salvation? Can one more failure be the thing that finally
              undoes it?</strong>
            </p>
            <p>
              Maybe it was not one big sin. Maybe it was months of drifting. Prayer got thin. Church
              got easy to skip. And now you look back and you are not even sure you still believe the
              way you used to.
            </p>
            <p>Either way, the fear feels the same.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 What if I have sinned too many times to be forgiven?</li>
            <li>🔲 What if I do not feel saved anymore?</li>
            <li>🔲 What if I fall away for good and it is too late to come back?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This is one of the most asked questions in the whole Christian life.</p>
            <p>And it is not a question the Bible dodges.</p>
            <p>
              Here is what you need to know before anything else. <strong>Good, sincere, Bible
              believing Christians read the same Scripture and land in different places on this.</strong>
            </p>
            <p>
              This guide will not pretend that is not true. It will walk you through the verses that
              sound like an unbreakable promise, the verses that sound like a real warning, and where
              faithful believers honestly disagree about how those two kinds of verses fit together.
            </p>
            <p>
              What every side agrees on is this. Where you stand with God right now, today, is never
              settled by staring at your fear. It is settled by looking at Christ.
            </p>
            <p>Take a breath. Let&apos;s look at what God&apos;s Word actually says.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not a question for a theology classroom.</p>
          <p>It is a question that shows up at 2 a.m., after the sin, in the silence.</p>
          <p>
            <strong>Because what you believe about this shapes how you relate to God every single
            day.</strong>
          </p>
          <p>
            If you believe your standing with God swings on your last twenty four hours, you will
            live like a defendant. Always checking the verdict. Never resting.
          </p>
          <p>
            If you believe nothing you do matters at all, you can drift into a faith with no weight
            to it, no urgency, no fruit.
          </p>
          <p>Neither of those is the life the Bible actually describes.</p>
          <p>
            📌 <strong>The stakes are not just settling an argument. The stakes are whether you walk
            with God in fear or in faith.</strong>
          </p>
          <p>
            And this question is tied to bigger ones too, like what{" "}
            <ArticleLink href="/blog/what-is-hell">
              the Bible actually teaches about hell
            </ArticleLink>{" "}
            and what it means to belong to God forever. That is part of why it carries so much weight
            for anyone who takes their faith seriously.
          </p>
          <p>
            This is also why Christians can read the same Bible and disagree here in good conscience.
            The verses are real. The warnings are real. The promises are real. Working out how they
            fit together is part of{" "}
            <ArticleLink href="/blog/why-so-many-denominations">
              why there are so many denominations
            </ArticleLink>{" "}
            in the first place.
          </p>
          <p>So this guide will not tell you which camp to join.</p>
          <p>It will show you the actual verses, honestly, so you can study this for yourself.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Says About Losing Your Salvation
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Jesus Says No One Can Pluck You From His Hand
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start with the words of Jesus Himself, because He spoke directly to this.</p>
          <p>He was describing His sheep. The people who actually belong to Him.</p>
        </div>
        <VerseQuote
          text="My sheep hear my voice, and I know them, and they follow me: And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand. My Father, which gave them me, is greater than all; and no man is able to pluck them out of my Father's hand."
          reference="John 10:27-29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the double grip.</strong> You are in the Son&apos;s hand, and you are in
            the Father&apos;s hand.
          </p>
          <p>
            Jesus does not say His sheep will never wander, never doubt, never sin again. He says they
            will never perish, and no one can pluck them out.
          </p>
          <p>
            This is one of the strongest verses on the whole subject. It is a huge reason so many
            Christians believe a truly saved person cannot ultimately be lost.
          </p>
          <p>
            And notice it does not end with the sheep. Jesus adds the Father&apos;s hand around His
            own, as if to say even if something could somehow slip past Him, it would still have to
            get past the Father too. That is the picture. Two hands, not one, and neither one letting
            go.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Nothing Can Separate You From God&apos;s Love
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul asks the question almost every anxious believer has asked in the dark.</p>
          <p>Can anything separate me from God now?</p>
        </div>
        <VerseQuote
          text="For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
          reference="Romans 8:38-39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read the list slowly.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>✅ Not death, and not life.</li>
          <li>✅ Not angels, and not rulers.</li>
          <li>✅ Not the present, and not the future.</li>
          <li>✅ Not height, not depth, not any other creature.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is not making a small claim. He is saying he searched every category he could think
            of, and none of it is strong enough to tear a believer out of Christ&apos;s love.
          </p>
          <p>
            Whatever you are carrying tonight, whatever fear woke you up, it is already on Paul&apos;s
            list. And Paul says it loses.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. You Were Sealed, Not Just Signed Up
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul gives the Ephesians a picture from everyday life. A seal marks ownership.</p>
        </div>
        <VerseQuote
          text="In whom ye also trusted, after that ye heard the word of truth, the gospel of your salvation: in whom also after that ye believed, ye were sealed with that holy Spirit of promise, Which is the earnest of our inheritance until the redemption of the purchased possession, unto the praise of his glory."
          reference="Ephesians 1:13-14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The word <strong>earnest</strong> here means down payment. A guarantee that the rest is
            coming.
          </p>
          <p>
            When you believed, the Holy Spirit Himself became God&apos;s down payment on you. Not a
            maybe. A promise already in motion.
          </p>
          <p>Paul says the same thing to the Philippians a different way:</p>
        </div>
        <VerseQuote
          text="Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ:"
          reference="Philippians 1:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice who is doing the work. He which hath begun a good work in you will perform it.</p>
          <p>Not you, gritting your teeth to the finish line. Him, finishing what He started.</p>
          <p>
            That does not erase your responsibility to keep believing and keep obeying. It means the
            engine behind your perseverance is not your own willpower running on fumes. It is God,
            already committed to the outcome.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Warning Passages That Give Sincere Christians Pause
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now for the verses that make this question so hard.</p>
          <p>
            If the Bible only had the passages above, this would not be a debate at all. But it also
            has this, from the book of Hebrews:
          </p>
        </div>
        <VerseQuote
          text="For it is impossible for those who were once enlightened, and have tasted of the heavenly gift, and were made partakers of the Holy Ghost, And have tasted the good word of God, and the powers of the world to come, If they shall fall away, to renew them again unto repentance; seeing they crucify to themselves the Son of God afresh, and put him to an open shame."
          reference="Hebrews 6:4-6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Read plainly, that sounds like people who genuinely tasted the heavenly gift, and then
            fell away.
          </p>
          <p>The same book has a second, similarly heavy warning:</p>
        </div>
        <VerseQuote
          text="For if we sin wilfully after that we have received the knowledge of the truth, there remaineth no more sacrifice for sins, But a certain fearful looking for of judgment and fiery indignation, which shall devour the adversaries."
          reference="Hebrews 10:26-27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter adds a third warning, using a picture from everyday life instead of temple language:</p>
        </div>
        <VerseQuote
          text="For if after they have escaped the pollutions of the world through the knowledge of the Lord and Saviour Jesus Christ, they are again entangled therein, and overcome, the latter end is worse with them than the beginning. For it had been better for them not to have known the way of righteousness, than, after they have known it, to turn from the holy commandment delivered unto them."
          reference="2 Peter 2:20-21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Peter is not describing a person who never heard the gospel. He is describing someone who
            escaped the world&apos;s pollutions through knowing Christ, and then went back.
          </p>
          <p>
            This is where the honest disagreement starts. All three of these warnings are real verses,
            sitting in the same inspired book as John 10 and Romans 8. Any honest reading of Scripture
            has to hold both kinds of passages, not just the ones that feel comfortable.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Two Faithful Ways Christians Read These Passages
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ <strong>So which is it? Can a real Christian actually fall away, or not?</strong>
          </p>
          <p>Bible believing Christians answer this two honest ways.</p>
          <p>
            <strong>Eternal security</strong>, sometimes called &quot;once saved, always saved&quot; or
            the perseverance of the saints, holds that a person who is truly, savingly born again
            cannot ultimately lose that salvation. This view is common in Reformed and many Baptist
            churches. On this view, the Hebrews and Peter warnings describe people who looked like
            believers, tasted real blessings around the church, but were never truly born again to
            begin with. The apostle John describes exactly this kind of person leaving the church
            later on, and says plainly that their leaving proved they were never truly part of it.
          </p>
          <p>
            <strong>Conditional security</strong> holds that salvation is received by faith and can be
            walked away from by a deliberate, ongoing turning away from Christ. This view is common in
            Wesleyan, Methodist, and many Pentecostal churches. On this view, the warnings mean exactly
            what they appear to say. A real believer who willfully and finally abandons Christ is in
            real danger, which is precisely why Scripture warns so seriously and so often.
          </p>
          <p>
            📌 <strong>Both camps take Scripture seriously. Neither camp is reading these verses
            carelessly.</strong> This is not a case of one side ignoring the Bible and the other side
            obeying it. It is two honest, centuries old attempts to hold every verse, the promises and
            the warnings alike, as true at the same time. Godly, Bible loving pastors have argued this
            for hundreds of years, and neither side has convinced the whole church.
          </p>
          <p>
            What both views agree on matters more than what divides them. No one who takes these
            passages seriously believes a person can live in careless, unrepentant sin and still call
            themselves secure. And no one who takes the promises seriously believes a genuinely
            repentant, believing heart has anything to fear. The disagreement lives in a narrower space
            than it often sounds like from the outside.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Take Heed, Whichever View You Hold
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is what matters more than picking a side tonight.</p>
          <p>Every writer in the New Testament wants you actively walking with God, not coasting.</p>
        </div>
        <VerseQuote
          text="Wherefore let him that thinketh he standeth take heed lest he fall."
          reference="1 Corinthians 10:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is written to believers, in a church, about real spiritual danger.</p>
          <p>The writer of Hebrews says the same thing a different way:</p>
        </div>
        <VerseQuote
          text="Take heed, brethren, lest there be in any of you an evil heart of unbelief, in departing from the living God. But exhort one another daily, while it is called To day; lest any of you be hardened through the deceitfulness of sin."
          reference="Hebrews 3:12-13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the remedy is not private worry. It is <strong>exhort one another daily</strong>.
          </p>
          <p>
            Sin has a slow, deceiving power. It rarely announces itself. It talks you into small
            compromises until a hardened heart does not feel unusual anymore.
          </p>
          <p>
            That is one reason{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">
              anxious thoughts about your faith
            </ArticleLink>{" "}
            can actually be a mercy. A conscience that still cares whether it is right with God is not
            a hardened one.
          </p>
          <p>Paul gives Timothy a steadying word right in the middle of a warning about false teachers:</p>
        </div>
        <VerseQuote
          text="Nevertheless the foundation of God standeth sure, having this seal, The Lord knoweth them that are his. And, Let every one that nameth the name of Christ depart from iniquity."
          reference="2 Timothy 2:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the two halves of that verse.</strong> The foundation stands sure. The
            Lord knows who is truly His. And in the very same breath, everyone who names Christ is
            told to depart from iniquity.
          </p>
          <p>
            That is the whole tension of this subject compressed into one sentence. God&apos;s
            knowledge of His own is certain. Your daily walk still matters.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Where Your Assurance Is Actually Supposed to Rest
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is where both honest views actually meet.</p>
          <p>
            Your assurance was never meant to rest on a perfect memory of your own performance. It
            rests on Christ.
          </p>
        </div>
        <VerseQuote
          text="These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life, and that ye may believe on the name of the Son of God."
          reference="1 John 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            John wrote a whole letter so believers could <strong>know</strong>, not guess, that they
            have eternal life.
          </p>
          <p>And he gives the test plainly. Do you believe on the name of the Son of God, today?</p>
          <p>Not did you feel it perfectly on your best day five years ago. Do you believe now.</p>
          <p>He also gives you the way back when you fail:</p>
        </div>
        <VerseQuote
          text="If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
          reference="1 John 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Faithful and just.</strong> Not moody. Not keeping score waiting to run out of
            patience.
          </p>
          <p>Paul, near the end of his life, said this about his own confidence:</p>
        </div>
        <VerseQuote
          text="For the which cause I also suffer these things: nevertheless I am not ashamed: for I know whom I have believed, and am persuaded that he is able to keep that which I have committed unto him against that day."
          reference="2 Timothy 1:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Paul&apos;s confidence was not in Paul.</strong> It was in the one Paul had
            handed his life to.
          </p>
          <p>
            That is worth remembering the next time your mind runs through everything you have gotten
            wrong. The question was never whether{" "}
            <ArticleLink href="/blog/paul">
              Paul
            </ArticleLink>{" "}
            or you could hold on tight enough. It is whether you keep coming back to the One who is
            holding on. Jude closes his short letter with a doxology written for exactly this fear:
          </p>
        </div>
        <VerseQuote
          text="Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy, To the only wise God our Saviour, be glory and majesty, dominion and power, both now and ever. Amen."
          reference="Jude 1:24-25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            He is able to keep you. Not you gripping Him with white knuckles, but Him keeping you, all
            the way to the day you stand before Him faultless with exceeding joy.
          </p>
          <p>Whichever view of these verses you hold, that is a promise every honest reading of Scripture leaves standing.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Walking in Assurance, Not Fear
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not settle this question by spiraling at midnight.</p>
          <p>You settle it, day by day, by where you put your feet. Here are eight places to start.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Confess the specific sin, out loud, today.</strong> Do not let it sit and grow in
            the dark. Name it to God plainly and receive 1 John 1:9 as true for you right now.
          </li>
          <li>
            <strong>Ask whether you still want Christ.</strong> A hardened, walked away heart usually
            does not care anymore. If the fear of losing Him is keeping you up, that longing itself is
            evidence something real is still alive in you.
          </li>
          <li>
            <strong>Get back in the Word this week.</strong> Faith is fed by hearing, and starved by
            silence. Even ten minutes a day keeps your heart tender instead of hardened.
          </li>
          <li>
            <strong>Find one person to be honest with.</strong> Hebrews says exhort one another daily,
            not white knuckle it alone. Isolation is where a wandering heart usually gets worse.
          </li>
          <li>
            <strong>Stop keeping a private scorecard.</strong> If you are mentally tallying good days
            against bad ones to calculate your standing with God, put the scorecard down. That was
            never how grace worked.
          </li>
          <li>
            <strong>Return to your first love, not just your first rules.</strong> Revelation 2
            rebukes a church for leaving its first love, not for breaking a checklist. Ask what
            drew you to Jesus originally, and go back there.
          </li>
          <li>
            <strong>Take the warning verses seriously, not casually.</strong> Whichever view you hold,
            do not use grace as a license to coast. Let the warnings do their job of keeping you
            watchful.
          </li>
          <li>
            <strong>Rest your weight on Christ, not on your memory of feeling saved.</strong> Feelings
            move. His finished work on the cross does not. Anchor there on the hard nights, and if the
            same fear keeps circling back, bring it to God by name instead of letting it run quietly
            in the background of your week.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Pick two of these to start this week. Not all eight.</p>
          <p>A quiet, faithful return beats a dramatic, exhausted resolution every time.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Losing Your Salvation
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you only remember five verses from this whole guide, start with these.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. John 10:28-29</h3>
        <VerseQuote
          text="And I give unto them eternal life; and they shall never perish, neither shall any man pluck them out of my hand. My Father, which gave them me, is greater than all; and no man is able to pluck them out of my Father's hand."
          reference="John 10:28-29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The picture of two hands holding you, the Son&apos;s and the Father&apos;s, is one of the
            most repeated verses in this whole conversation, and for good reason.
          </p>
          <p>
            It does not say His sheep will never struggle. It says no outside force is strong enough
            to tear them from His grip.
          </p>
          <p>
            Read it again on a hard day. The verb is not maybe. It is shall never perish. Write this
            one down and keep it somewhere you will actually see it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Romans 8:38-39</h3>
        <VerseQuote
          text="For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
          reference="Romans 8:38-39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is not guessing here. He says he is <strong>persuaded</strong>, a courtroom word for
            settled conviction after weighing the evidence.
          </p>
          <p>
            He wrote this from the middle of real suffering, not from a comfortable season. If
            anything on this list could separate a believer from God, Paul had already lived through
            most of it and still landed here.
          </p>
          <p>Keep this one where you can find it fast on the nights fear runs loud.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Hebrews 6:4-6</h3>
        <VerseQuote
          text="For it is impossible for those who were once enlightened, and have tasted of the heavenly gift, and were made partakers of the Holy Ghost, And have tasted the good word of God, and the powers of the world to come, If they shall fall away, to renew them again unto repentance."
          reference="Hebrews 6:4-6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Read this one honestly, not defensively. It is the verse that keeps this whole subject from
            being simple, and it deserves to be wrestled with rather than explained away.
          </p>
          <p>
            Whatever you conclude about who exactly it describes, let it do its job. It was written to
            keep believers moving forward, not to give anyone a comfortable excuse to coast.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Corinthians 10:12</h3>
        <VerseQuote
          text="Wherefore let him that thinketh he standeth take heed lest he fall."
          reference="1 Corinthians 10:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Short, and aimed straight at confidence that has turned into carelessness. Spiritual
            pride is usually the step right before a fall.
          </p>
          <p>
            Paul wrote this to a church that was proud of its own maturity while tolerating serious
            sin. Confidence in Christ and carefulness about your own heart were never meant to be
            opposites.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 John 5:13</h3>
        <VerseQuote
          text="These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life, and that ye may believe on the name of the Son of God."
          reference="1 John 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God does not want you guessing about this forever. He wants you to <strong>know</strong>.
            The test John gives is simple. Do you believe on Christ, today.
          </p>
          <p>
            John wrote this after an entire letter about sin, love, and truth, so it is not a naive
            promise handed out without conditions. It is the settled conclusion of a pastor who wanted
            his people resting, not guessing.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Losing Your Salvation
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can you lose your salvation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sincere, Bible believing Christians answer this differently. Some hold that a truly born
          again believer can never ultimately lose salvation, pointing to verses like John 10:28-29.
          Others hold that salvation can be walked away from through deliberate, final unbelief,
          pointing to warnings like Hebrews 6:4-6. Both views take the whole Bible seriously, and
          neither one should be preached as the obvious, settled answer that only careless readers
          would question. What every honest view agrees on is that your assurance rests on believing
          in Christ, not on a perfect memory of your own performance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does &quot;once saved, always saved&quot; mean?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the belief that once a person is truly, savingly born again, God preserves that
          salvation permanently, no matter what happens afterward. Supporters point to promises like
          Romans 8:38-39 and Philippians 1:6. This view usually explains the Hebrews warnings as
          describing people who were close to the church but never truly born again.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the unpardonable sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus calls it blasphemy against the Holy Ghost in Matthew 12:31-32, the one sin He says
          will not be forgiven. Most Bible teachers understand this as a settled, final rejection of
          the Spirit&apos;s witness about Christ, not a single curse word or bad thought. If you are
          afraid you have committed it, that very fear and desire to be right with God is itself
          strong evidence you have not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is falling away the same as struggling with sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Every believer, including Paul, wrestled with ongoing sin, and Romans 7 is Paul&apos;s
          own honest account of that fight. Falling away in Hebrews describes a deliberate, final
          turning from Christ, not a bad season or a repeated struggle you keep bringing back to God.
          A conscience that still hates its own sin, still confesses it, still comes back, is not a
          conscience that has fallen away.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does God let this be confusing instead of just saying clearly?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both the promises and the warnings serve a purpose. The promises comfort a genuinely
          repentant, believing heart. The warnings jolt a careless or drifting heart back awake.
          Reading only one set of verses gives you either false confidence or crushing despair.
          Scripture holds both together on purpose, the same way a good parent both reassures a child
          and warns them about real danger, without those two things canceling each other out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What if I do not feel saved anymore?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Feelings are real, but they are not the test Scripture gives. Emotions rise and fall with
          sleep, stress, and circumstances that have nothing to do with your actual standing before
          God. 1 John 5:13 points you to belief in Christ, not a feeling. If you still want to
          believe, still want to be right with God, and it grieves you that you do not feel close to
          Him, bring that honestly to Him today. That desire is not nothing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can I be saved again after falling away?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          If you are asking that question with a genuine desire to return to Christ, come to Him now.
          1 John 1:9 promises that God is faithful and just to forgive a confessing heart. The
          hardest cases Hebrews describes are people who no longer want to come back at all. Wanting
          to return is itself a sign the door has not shut.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does doubting my salvation mean I am not really saved?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Plenty of faithful believers in Scripture wrestled with doubt, including Thomas and John
          the Baptist. Doubt that drives you to search Scripture and pray harder is very different from
          indifference that does not care either way. Bring your doubts to God directly instead of
          letting them sit unspoken.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What are the Hebrews 6 and Hebrews 10 warnings actually about?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews was written to Jewish believers under real pressure to abandon Christ and go back to
          the old sacrificial system rather than face persecution for following Him. The warnings
          address the seriousness of deliberately, knowingly rejecting Christ after tasting the truth
          about Him, not an ordinary lapse or a hard season of doubt. Christians honestly disagree on
          whether this describes people who were truly saved and fell away, or people who were close
          to the truth but never truly born again to begin with.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How can I have real assurance instead of constant fear?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Stop building assurance on your own performance and build it on Christ&apos;s finished work.
          Confess sin honestly and quickly. Stay in the Word so your faith is fed instead of starved.
          Stay close to other believers instead of isolating with your fear. And remember that a
          heart still afraid of losing Him is usually a heart that still belongs to Him. Assurance
          tends to grow slowly, through years of showing up to God honestly, not through one dramatic
          moment of certainty.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>The Bible holds both promise and warning, and sincere Christians read them
            differently.</strong> Do not let anyone tell you this question has one obvious answer
            that everyone who disagrees is simply ignoring Scripture.
          </p>
          <p>
            📌 <strong>Your assurance was never meant to rest on your memory. It rests on
            Christ.</strong> A perfect performance record was never the requirement. Believing on
            His name, today, is.
          </p>
          <p>
            📌 <strong>A heart still afraid of losing Him is usually a heart He still holds.</strong>{" "}
            The people Scripture warns about are the ones who stopped caring. If you are still reading
            this, still wrestling, still wanting to be right with God, that matters.
          </p>
          <p>
            This question will not be fully settled on this side of{" "}
            <ArticleLink href="/blog/what-is-heaven">heaven</ArticleLink>. But you do not need it
            fully settled to take your next step today.
          </p>
          <p>
            Whichever camp you eventually land in, and it is fine to still be studying this one, do
            not let the debate become an excuse to stop pursuing God. That is the one response every
            verse in this guide, promise and warning alike, argues against.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Confess whatever is sitting between you and God right now, honestly, and believe 1 John
            1:9 is true for you.
          </p>
          <p>Not because you earned the forgiveness.</p>
          <p>Because He is faithful and just, and He already promised it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Questions like this get heavier when you carry them alone with a search bar at midnight.
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
