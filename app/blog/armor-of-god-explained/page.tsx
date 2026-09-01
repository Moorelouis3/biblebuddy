import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("armor-of-god-explained", {
  title: "The Armor of God Explained: Ephesians 6 Piece by Piece",
  description:
    "The Armor of God from Ephesians 6:10 to 18 explained piece by piece: the belt of truth, breastplate, shield of faith, sword of the Spirit, and prayer.",
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

export default function ArmorOfGodExplainedPage() {
  return (
    <BlogPostShell
      slug="armor-of-god-explained"
      title={<>📖 The Armor of God Explained</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably seen the graphic.</p>
            <p>A soldier standing firm, each piece of armor labeled with a Bible word.</p>
            <p>Belt. Breastplate. Shield. Sword.</p>
            <p>It looks important, but the picture alone cannot tell you what it actually means.</p>
            <p>
              📌 <strong>The armor of God comes from one passage, Ephesians 6:10 to 18, and every
              piece is tied to a real part of how you stand firm in your faith.</strong>
            </p>
            <p>This is not a costume and it is not a formula.</p>
            <p>Paul was not writing about visible demons or spooky battles.</p>
            <p>He was writing to ordinary Christians about staying standing when life pushes back.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This guide walks through the whole passage, piece by piece.</p>
            <p>What each piece of armor represents. What Paul actually meant by wrestling. And why he ends the passage with prayer, not with the sword.</p>
            <p>No hype. Just the text.</p>
            <p>Let&apos;s get into it.</p>
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
            Paul wrote Ephesians from a Roman prison, chained to a guard. You can read more about{" "}
            <ArticleLink href="/blog/paul">the man behind the letter</ArticleLink> elsewhere, but
            here is what matters for this passage. This armor was not written from a place of
            comfort. It was written while genuinely under attack.
          </p>
          <p>That is why this is not a topic for a slow season. It is for the season you are actually in right now.</p>
          <p>Doubt at 2 a.m. Temptation that will not let go. A lie about yourself that you keep believing even though you know better.</p>
          <p>
            ⚠️ <strong>Every Christian is standing somewhere in this fight, whether they feel it or not.</strong>
          </p>
          <p>
            The world says try harder or think more positively. Scripture says something
            different. It says you need real protection, and God supplies it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚔️ What Each Piece of the Armor of God Means
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. This Is Not a Fight Against People</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul opens the passage with a command, then a reason.</p>
        </div>
        <VerseQuote
          text="Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."
          reference="Ephesians 6:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice the strength is not yours to produce. It is His.</p>
          <p>Then Paul names exactly what the armor is for.</p>
        </div>
        <VerseQuote
          text="For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places."
          reference="Ephesians 6:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This verse alone corrects most of what gets simplified on a Pinterest
            graphic.</strong> The battle is not against the difficult coworker or the family member
            who hurt you. It is against unseen spiritual forces working behind the scenes of every
            temptation, lie, and division.
          </p>
          <p>
            That does not mean you get to blame the devil for every hard relationship. It means the
            armor is not aimed at people at all.
          </p>
          <p>
            If fear about unseen forces is part of what brought you to this passage, it may help to
            read{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible actually says about fear
            </ArticleLink>{" "}
            alongside this study. The armor is not meant to make you afraid of the enemy. It is meant to make you ready.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Stand Firm: The Belt, the Breastplate, and the Shoes</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul repeats the word stand three times in this passage. That is the point of the whole armor. Not attack. Stand.</p>
        </div>
        <VerseQuote
          text="Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand."
          reference="Ephesians 6:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then he lists the first three pieces.</p>
        </div>
        <VerseQuote
          text="Stand therefore, having your loins girt about with truth, and having on the breastplate of righteousness; And your feet shod with the preparation of the gospel of peace;"
          reference="Ephesians 6:14 and 15"
        />
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>
            🟢 <strong>The belt of truth</strong> held a soldier&apos;s tunic together and kept his
            weapons in place. Without it, everything else falls apart. Truth about God and truth
            about yourself is what everything else in the Christian life gets fastened to.
          </li>
          <li>
            🟢 <strong>The breastplate of righteousness</strong> guarded the chest, the vital
            organs. This is not your own righteousness. It is the righteousness Christ gives you.
            It guards your identity from an accusation that never lets up.
          </li>
          <li>
            🟢 <strong>Shoes fitted with the gospel of peace</strong> gave a soldier solid footing
            on rough ground. You are not meant to be shaken loose by every hard circumstance. Good
            news gives you a place to stand.
          </li>
        </ul>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Shield, the Helmet, and the Sword</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Next comes the piece Paul calls the most important of all.</p>
        </div>
        <VerseQuote
          text="Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked."
          reference="Ephesians 6:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Roman shields were large enough to stop a flaming arrow before it landed. Faith works
            the same way with a lie before it lands in your heart.
          </p>
          <p>Then the last two pieces, given together.</p>
        </div>
        <VerseQuote
          text="And take the helmet of salvation, and the sword of the Spirit, which is the word of God:"
          reference="Ephesians 6:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>The helmet of salvation</strong> guards your mind. Your standing with God is
            settled, and that settled truth is what keeps despair from taking over your thinking.
          </p>
          <p>
            <strong>The sword of the Spirit</strong> is the only offensive piece in the whole list.
            Everything else is defense. It is called the word of God because that is exactly how
            Jesus answered the devil in the wilderness, one specific verse at a time, not a
            feeling or a slogan.
          </p>
          <p>
            This is exactly the kind of passage that comes alive when you slow down and study it
            instead of skimming it. Inside <strong>Bible Buddy</strong>, Ephesians 6 is walked
            through verse by verse, and it is completely free to start. If you want to be ready to
            actually use this sword when a lie shows up, it also helps to know{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith
            </ArticleLink>{" "}
            when someone challenges it directly.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Prayer Is Not an Optional Extra</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is where most graphics stop. Six pieces of armor, and the picture ends.</p>
          <p>But Paul does not stop there.</p>
        </div>
        <VerseQuote
          text="Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints;"
          reference="Ephesians 6:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Prayer is not a seventh piece of armor. It is how the other six actually get
            worn.</strong> A soldier standing in armor with no communication to his commander is
            still exposed. Prayer is that ongoing line to God.
          </p>
          <p>
            Notice Paul also says to pray for all saints, not just yourself. This armor was never
            meant to be worn alone.
          </p>
          <p>
            If prayer feels vague or hard to sustain, learning{" "}
            <ArticleLink href="/blog/how-to-spend-1-hour-with-god">
              how to spend real time with God
            </ArticleLink>{" "}
            gives that armor somewhere to actually get put on daily, instead of staying a nice
            idea.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Putting the Armor On
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The armor is not a chant and it is not a ritual you perform once. Here is how to actually wear it.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Name the lie before you fight it.</strong> The belt of truth only helps once
            you know what untrue thing you are actually believing right now.
          </li>
          <li>
            <strong>Bring a specific verse to a specific temptation.</strong> The sword of the
            Spirit works because it is precise, the same way Jesus answered each temptation with an
            exact verse instead of a general feeling.
          </li>
          <li>
            <strong>Guard your mind before the moment, not during it.</strong>{" "}
            <ArticleLink href="/blog/building-self-control">Self control</ArticleLink> is not
            willpower in the moment. It is the helmet you already had on before the fiery dart
            showed up.
          </li>
          <li>
            <strong>Pray about the fight before you feel it, not only after you lose it.</strong>{" "}
            Paul says pray always, not pray after.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About the Armor of God
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the armor of God in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a set of six pictures Paul uses in Ephesians 6:10 to 18 to describe how a Christian
          stays spiritually protected. The belt of truth, the breastplate of righteousness, shoes
          fitted with the gospel of peace, the shield of faith, the helmet of salvation, and the
          sword of the Spirit, followed by a call to constant prayer.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the armor of God a real piece of clothing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Paul is using the armor of a Roman soldier, something his readers saw every day, as a
          picture of spiritual realities like truth, righteousness, and faith. The armor is real in
          effect, not literal in material.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Paul say we do not wrestle against flesh and blood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because it is easy to treat a difficult person as the real problem. Paul is redirecting
          the fight to its actual source, unseen spiritual forces behind the temptation, lie, or
          division, so you stop aiming your armor at the wrong target.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the sword of the Spirit exactly?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ephesians 6:17 names it directly. The sword of the Spirit is the word of God. It is the
          one offensive piece in the whole passage, and it works the way Jesus used it against
          temptation in the wilderness, one specific verse at a time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do I have to put the armor of God on every day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Paul&apos;s language suggests an ongoing practice, not a one time event. The command to
          pray always in verse 18 points the same way. This is a daily posture of standing on
          truth, not a prayer you say once and never think about again.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The armor of God was never meant to be a graphic you glance at and move past.</p>
          <p>
            📌 <strong>It is truth, righteousness, peace, faith, salvation, and the word of God,
            held together by prayer.</strong>
          </p>
          <p>
            📌 <strong>The fight was never against the people around you. It is against the lies
            behind them.</strong>
          </p>
          <p>
            📌 <strong>Standing firm, not winning a dramatic battle, is the actual goal of this
            passage.</strong>
          </p>
          <p>
            You do not need a special ritual to put this on. You need truth in front of you, and a
            habit of bringing your day to God.
          </p>
          <p>Start with one piece today. Read Ephesians 6:10 to 18 slowly, out loud if you can, and let it settle.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you want to actually study Ephesians 6 verse by verse instead of just reading about
            it, you do not have to figure it out alone.
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
