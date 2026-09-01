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
          <p>A pretty background. A list of life lessons from Jesus. No verses. No context. Just a caption.</p>
          <p>
            📌 <strong>This article is the real version.</strong>
          </p>
          <p>
            Here are fifteen lessons from the life of Jesus, and every single one is tied to something
            He actually said or did in the Gospels, chapter and verse.
          </p>
          <p>
            Jesus was a real person who walked real roads in first century Israel.{" "}
            <ArticleLink href="/blog/did-jesus-really-exist">
              Historians outside the Bible confirm He lived
            </ArticleLink>
            , and the four Gospels record what He taught and how He lived it out in front of
            witnesses.
          </p>
          <p>That is what makes His example different from a quote graphic.</p>
          <p>These are not proverbs floating in space. Each one happened somewhere specific, to
            someone specific, and the Bible names exactly where.</p>
          <p>Grab your Bible or open one on your phone. Let&apos;s walk through all fifteen.</p>
        </div>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why Jesus&apos; Example Still Matters
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Plenty of teachers have told people to love their neighbor or forgive their enemy.</p>
          <p>Jesus is the only one who did it while being betrayed, beaten, and nailed to a cross.</p>
          <p>
            📌 <strong>That is what makes His life more than good advice.</strong> It is proof the
            advice actually works, lived out by the one Person who had every reason to walk away
            from it and never did.
          </p>
          <p>
            When you study how He treated people, prayed, handled pressure, and faced temptation,
            you are not collecting inspiration. You are watching the Son of God show you what a
            life fully surrendered to the Father actually looks like up close.
          </p>
          <p>That is worth more than any quote card.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 15 Lessons From the Life of Jesus
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Each lesson below points to the exact moment in Scripture it comes from, so you can go
          read it in full for yourself.
        </p>

        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Unconditional Love.</strong> In the{" "}
            <ArticleLink href="/blog/salt-and-light">Sermon on the Mount</ArticleLink>, Jesus told
            His followers to love people who could never repay them, including the people who hate
            them.
          </li>
        </ol>
        <VerseQuote
          text="But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;"
          reference="Matthew 5:44"
        />

        <ol className="mt-5 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700" start={2}>
          <li>
            <strong>Forgiveness.</strong> While nails were still in His hands, Jesus prayed for the
            men killing Him instead of demanding justice first (Luke 23:34). He also told Peter that
            forgiveness has no ceiling, not seven times but seventy times seven (Matthew 18:21 and
            22).
          </li>
          <li>
            <strong>Trusting God.</strong> During a storm that terrified seasoned fishermen, Jesus
            was asleep in the boat. Once He calmed the wind and waves, He asked His disciples why
            they still had no faith (Mark 4:35 to 41).
          </li>
          <li>
            <strong>Humility.</strong> At the last supper, He tied a towel around His waist and
            washed His disciples&apos; feet like the lowest servant in the house, then told them
            plainly to follow His example (John 13:1 to 15).
          </li>
        </ol>
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Minutes later, at that same table, He gave them a command that grew straight out of what
          He had just done.
        </p>
        <VerseQuote
          text="A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another."
          reference="John 13:34 and 35"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Love had a face and a task before it ever became a doctrine.
        </p>

        <ol className="mt-5 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700" start={5}>
          <li>
            <strong>Prayer.</strong> Even with crowds needing Him, Jesus got up before daylight and
            went alone to a quiet place to pray (Mark 1:35). If you want to build that same habit,{" "}
            <ArticleLink href="/blog/how-to-spend-1-hour-with-god">
              here is a simple way to spend real time with God
            </ArticleLink>{" "}
            without it feeling like a chore.
          </li>
          <li>
            <strong>Compassion.</strong> Facing a hungry crowd of thousands, Jesus did not send them
            away. Scripture says He was moved with compassion and healed their sick before He ever
            fed them (Matthew 14:14).
          </li>
          <li>
            <strong>Obedience.</strong> In the garden of Gethsemane, knowing exactly what the next
            day would cost Him, Jesus asked His Father to remove the cup, then chose obedience over
            His own comfort anyway.
          </li>
        </ol>
        <VerseQuote
          text="Saying, Father, if thou be willing, remove this cup from me: nevertheless not my will, but thine, be done."
          reference="Luke 22:42"
        />

        <ol className="mt-5 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700" start={8}>
          <li>
            <strong>Resisting Temptation.</strong> After forty days without food in the wilderness,
            the devil offered Jesus bread, power, and glory in exchange for one shortcut. He
            answered every offer with Scripture instead of arguing on His own (Matthew 4:1 to 11).
          </li>
        </ol>
        <VerseQuote
          text="But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God."
          reference="Matthew 4:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Notice His weapon was not willpower. It was the Word, already known and ready to speak.{" "}
          <ArticleLink href="/blog/building-self-control">
            Building that kind of self control
          </ArticleLink>{" "}
          starts the same way, long before the temptation ever shows up.
        </p>

        <ol className="mt-5 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700" start={9}>
          <li>
            <strong>Patience.</strong> With disciples who argued about who was greatest and crowds
            that misunderstood Him constantly, Jesus kept teaching and kept explaining instead of
            walking away (Mark 9:19).
          </li>
          <li>
            <strong>Faith Over Fear.</strong> When Peter started sinking on the water, Jesus did not
            wait for him to work it out. He reached out immediately and asked why doubt had beaten
            faith (Matthew 14:22 to 33). It is the same question Scripture keeps asking about{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              fear and faith
            </ArticleLink>{" "}
            in general.
          </li>
          <li>
            <strong>Truth Spoken in Love.</strong> To a woman caught in adultery and dragged in
            front of Him to be stoned, Jesus refused to condemn her and refused to pretend the sin
            did not matter, in the same breath (John 8:1 to 11).
          </li>
          <li>
            <strong>Gratitude.</strong> Of the ten men with leprosy Jesus healed in one moment, only
            one turned back to thank Him, and Jesus noticed the nine who did not (Luke 17:11 to 19).
          </li>
          <li>
            <strong>Mercy.</strong> A blind beggar named Bartimaeus shouted for Jesus in a crowd that
            tried to silence him. Jesus stopped everything and asked what he wanted (Mark 10:46 to
            52).
          </li>
          <li>
            <strong>Perseverance.</strong> Knowing that suffering and a cross were waiting there,
            Jesus still set His face toward Jerusalem and kept walking (Luke 9:51).
          </li>
          <li>
            <strong>Eternal Hope.</strong> On the same night He was betrayed, He told His frightened
            disciples not to let their hearts be troubled, because He was going to prepare them a
            place (John 14:1 to 3). That promise is also what settles the question of{" "}
            <ArticleLink href="/blog/what-is-heaven">what heaven actually is</ArticleLink>.
          </li>
        </ol>

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
            You do not have to master all fifteen this week. Pick one. Read the passage it comes
            from. Ask God to help you live it out today, and let tomorrow bring the next one.
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
