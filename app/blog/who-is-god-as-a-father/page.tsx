import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-is-god-as-a-father", {
  title: "Who Is God as a Father? What Scripture Actually Says",
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

export default function WhoIsGodAsAFatherPage() {
  return (
    <BlogPostShell
      slug="who-is-god-as-a-father"
      title={<>📖 Who Is God as a Father?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Father is not a safe word for everyone.</p>
            <p>
              Maybe your father left. Maybe he yelled more than he ever hugged. Maybe he was in the
              house but never really there. Maybe you never met him at all.
            </p>
            <p>
              So when someone says <strong>God as a Father</strong>, it can land wrong before it
              even has a chance to land right.
            </p>
            <p>
              📌 <strong>Hear this before anything else. Whatever your earthly father was, God is
              not bound by it.</strong>
            </p>
            <p>
              He does not inherit your father&apos;s temper, his silence, or his absence. Scripture
              describes a Father who is nothing like the worst version you may have known, and
              often nothing like the best version either. He is better than both.
            </p>
            <p>
              This guide walks through what the Bible actually says when it calls God Father. Not
              the greeting card version. The real one, straight from Scripture, verse by verse.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            How you picture God as Father shapes almost everything else about your faith.
          </p>
          <p>
            If you picture Him as a distant judge, you will pray like you are filing a report. If
            you picture Him as an absent figure, you will read the Bible waiting for Him to leave
            again. Neither picture comes from Scripture.
          </p>
          <p>
            📖 <strong>The Bible is careful and consistent about this.</strong> Fatherhood is one
            of the main ways God chose to describe Himself to His people, from the Old Testament
            through the New.
          </p>
          <p>
            That is not an accident. He wants you to know Him as close, not just correct. So let
            us look at what He actually says about it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Scripture Means When It Calls God Father
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. He Is Compassionate Toward You</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start here, because it undoes a lot of wrong pictures at once.</p>
          <p>The psalmist did not compare God to a stern judge. He compared Him to a good father&apos;s pity for his own children.</p>
        </div>
        <VerseQuote
          text="Like as a father pitieth his children, so the LORD pitieth them that fear him."
          reference="Psalm 103:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Pitieth</strong> here means compassion. Tenderness toward someone who is
            struggling, not annoyance at them.
          </p>
          <p>
            If you have ever carried <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">anxious thoughts</ArticleLink> into
            prayer and wondered if God was tired of hearing about them, this verse answers that.
            He is not tired. He is moved.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. He Provides What Is Good</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus made this point with a simple picture any parent understands.</p>
        </div>
        <VerseQuote
          text="Or what man is there of you, whom if his son ask bread, will he give him a stone? Or if he ask a fish, will he give him a serpent? If ye then, being evil, know how to give good gifts unto your children, how much more shall your Father which is in heaven give good things to them that ask him?"
          reference="Matthew 7:9, 10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus is not saying earthly fathers are worthless. He is saying even flawed fathers
            usually get the basics right, and God gets it more right than any of them.
          </p>
          <p>
            📌 <strong>You do not have to talk God into caring about you.</strong> Provision is
            part of who He already is.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. He Disciplines Because He Loves You</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the part that trips people up, especially if discipline in your house growing
            up meant fear instead of love.
          </p>
          <p>Scripture ties the two together on purpose.</p>
        </div>
        <VerseQuote
          text="For whom the Lord loveth he chasteneth, and scourgeth every son whom he receiveth. If ye endure chastening, God dealeth with you as with sons; for what son is he whom the father chasteneth not?"
          reference="Hebrews 12:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>⚠️ God&apos;s discipline is never about rejection. It is proof you belong to Him.</p>
          <p>
            A father who does not care what his child becomes does not bother correcting anything.
            Growing in{" "}
            <ArticleLink href="/blog/building-self-control">
              self control
            </ArticleLink>{" "}
            under God&apos;s correction feels hard in the moment. It is still love, not punishment
            looking for an excuse.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. He Adopts You Into His Family</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is where the Bible goes further than a nice metaphor. Paul says believers are
            legally, permanently adopted.
          </p>
        </div>
        <VerseQuote
          text="For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father."
          reference="Romans 8:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            You may have seen the popular claim online that <strong>Abba</strong> literally means
            &quot;Daddy,&quot; like a toddler&apos;s first word. That overstates it. Abba is a
            family word used by grown children too. What it reliably tells us is closeness, not
            distance. This is family language, not courtroom language.
          </p>
          <p>
            If you have ever wondered <ArticleLink href="/blog/how-do-you-know-you-are-saved">how you know you are saved</ArticleLink>,
            this is part of the answer. Adoption is not a feeling you have to manufacture. It is a
            fact Scripture declares over you the moment you belong to Christ.
          </p>
          <p>
            This is exactly the kind of verse that opens up when you slow down and study it line by
            line. That kind of study, verse by verse in plain English, is what{" "}
            <strong>Bible Buddy</strong> is built for, and it is free to start.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. He Calls You His Child</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>John does not just say God loves you. He says look at how much.</p>
        </div>
        <VerseQuote
          text="Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God: therefore the world knoweth us not, because it knew him not."
          reference="1 John 3:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Behold</strong> means stop and look. John wants you to actually pause on this
            instead of skimming past it.
          </p>
          <p>
            💡 A father shapes the family likeness in his children. As you grow closer to God, that
            same likeness shows up in you, what Scripture calls{" "}
            <ArticleLink href="/blog/what-is-the-fruit-of-the-spirit">the fruit of the Spirit</ArticleLink>.
            Not earned resemblance. Family resemblance.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ What This Means for You Today
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Bring Him the thing you are afraid to say out loud.</strong> A father who
            pities his children is safe to be honest with. He already knows anyway.
          </li>
          <li>
            <strong>Let correction land as love, not rejection.</strong> When conviction shows up
            in your reading or your prayer, ask what it is producing, not just what it is
            confronting.
          </li>
          <li>
            <strong>Rest in adoption instead of performing for approval.</strong> You are not
            auditioning to be His child. You already are one.
          </li>
          <li>
            <strong>Say &quot;Father&quot; on purpose in prayer this week.</strong> If the word
            still feels heavy, say it anyway and ask God to redefine it for you over time.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About God as a Father
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is calling God a Father just a metaphor?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is more than a comparison. Scripture uses father language for God&apos;s character,
          His compassion, His provision, His discipline, and then goes further with adoption
          language. Romans 8:15 describes a real legal standing, not a poetic figure of speech.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What if my earthly father was not a good father?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Then you have permission to stop measuring God by that example. Psalm 68:5 calls Him
          &quot;a father of the fatherless.&quot; That is a specific promise for people whose story
          with an earthly father was broken. He is not the repeat of what hurt you.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the Bible say God is male?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God is spirit, not a physical being with a gender. Scripture uses Father as His chosen
          way to reveal His character, relationship, and authority, and it also uses maternal
          images in places like Isaiah 66:13. Father is the name God gave Himself, not a claim
          about biology.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Abba Father mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Abba is an Aramaic family word Jesus used for God, and Paul uses it in Romans 8:15 and
          Galatians 4:6. It signals close, secure family belonging rather than formal distance.
          The popular claim that it simply means &quot;Daddy&quot; oversimplifies a real language
          point, but the closeness it points to is genuine.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is God a father to everyone, or only to Christians?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God is Creator of everyone, but Scripture reserves the adoption language, the Spirit of
          adoption crying &quot;Abba, Father,&quot; for those who belong to Christ. Anyone can come
          to Him. Adoption is what happens when you do.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Your earthly father, whoever he was, does not get the final word on who God is.</p>
          <p>
            📌 <strong>Scripture says God is compassionate, He provides, He disciplines out of
            love, He adopts you, and He calls you His own.</strong>
          </p>
          <p>
            That is not a wish. It is what He has already said about you in His Word.
          </p>
          <p>
            One good next step is to spend real time with Him and let Him show you who He is
            firsthand. Even{" "}
            <ArticleLink href="/blog/how-to-spend-1-hour-with-god">
              one focused hour with God
            </ArticleLink>{" "}
            can start to rewrite what the word Father means to you.
          </p>
          <p>He is not finished showing you who He is.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you want to see for yourself what Scripture says about God as Father, verse by
            verse, you do not have to figure it out alone.
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
