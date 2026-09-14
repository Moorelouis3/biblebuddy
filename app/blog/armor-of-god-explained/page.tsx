import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("armor-of-god-explained", {
  title: "The Armor of God Explained: Ephesians 6 Piece by Piece",
  description:
    "The Armor of God from Ephesians 6:10 to 18 explained piece by piece: the belt of truth, breastplate of righteousness, shoes of peace, shield of faith, helmet of salvation, sword of the Spirit, and prayer.",
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
      title={<>📖 The Armor of God Explained: Ephesians 6 Piece by Piece</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably seen the graphic.</p>
            <p>A soldier standing firm, each piece of armor labeled with a Bible word.</p>
            <p>Belt. Breastplate. Shield. Sword.</p>
            <p>It looks important, but the picture alone cannot tell you what it actually means.</p>
            <p>
              Maybe you have prayed the verse once, during a hard week, and never actually opened
              the passage since.
            </p>
            <p>
              Maybe you know the phrase <strong>armor of God</strong> but could not name all six
              pieces if someone asked you right now.
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>The armor of God comes from one passage, Ephesians 6:10 to 18, and every
              piece is tied to a real part of how you stand firm in your faith.</strong>
            </p>
            <p>This is not a costume and it is not a formula.</p>
            <p>Paul was not writing about visible demons or spooky battles.</p>
            <p>He was writing to ordinary Christians about staying standing when life pushes back.</p>
            <p>The same temptation. The same lie about yourself. The same doubt at 2 a.m.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This guide walks through the whole passage, piece by piece.</p>
            <p>
              You will get the belt, the breastplate, the shoes, the shield, the helmet, and the
              sword, one at a time, in Paul&apos;s own words.
            </p>
            <p>You will see why he ends the passage with prayer, and not with the sword.</p>
            <p>
              You will get a whole section of the top verses on spiritual armor from across
              Scripture, and honest answers to the questions people actually ask about spiritual
              warfare.
            </p>
            <p>
              And you will get real, practical ways to put this armor on today, not just admire the
              picture of it.
            </p>
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
          <p>
            That is why this is not a topic for a slow season. It is for the season you are
            actually in right now.
          </p>
          <p>
            Doubt at 2 a.m. Temptation that will not let go. A lie about yourself that you keep
            believing even though you know better.
          </p>
          <p>Notice how Paul opens the passage. A command, then a reason.</p>
        </div>
        <VerseQuote
          text="Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."
          reference="Ephesians 6:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The strength is not yours to produce. It is His.</p>
          <p>Then Paul names exactly who the fight is against.</p>
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
            ⚠️ <strong>Every Christian is standing somewhere in this fight, whether they feel it or
            not.</strong>
          </p>
          <p>
            If fear about unseen forces is part of what brought you to this passage, it may help to
            read{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible actually says about fear
            </ArticleLink>{" "}
            alongside this study. The world says try harder or think more positively. Scripture
            says something different. It says you need real protection, and God supplies it,
            piece by piece.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚔️ What Each Piece of the Armor of God Means
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul does not stop at telling you there is a fight. He commands you to actually put on
            protection, piece by piece.
          </p>
        </div>
        <VerseQuote
          text="Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand."
          reference="Ephesians 6:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul repeats the word stand three times in this passage.</p>
          <p>💡 That is the whole point of the armor. Not attack first. Stand.</p>
          <p>Here is each piece, one at a time, in the order Paul gives them.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Belt of Truth</h3>
        <VerseQuote
          text="Stand therefore, having your loins girt about with truth,"
          reference="Ephesians 6:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A Roman soldier&apos;s belt was not decoration.</p>
          <p>
            It held his tunic tight so he could move fast, and it anchored the sheath that carried
            his sword. Without the belt, everything else on a soldier was loose. His sword arm was
            slower. His whole body was exposed.
          </p>
          <p>
            📌 <strong>Truth works the same way in your life.</strong> Everything else you put on
            gets fastened to it.
          </p>
          <p>
            There are two kinds of truth Paul has in mind here. Truth about who God actually is,
            not who fear says He is. And truth about who you actually are in Christ, not the story
            shame keeps telling you.
          </p>
          <p>
            If wrestling with hard questions is part of your walk right now, that struggle is not
            the opposite of the belt of truth.{" "}
            <ArticleLink href="/blog/is-it-a-sin-to-doubt-god">
              Honest doubt
            </ArticleLink>{" "}
            can actually be how you get to a truth that finally holds.
          </p>
          <p>Loose truth makes every other piece of armor loose too.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Breastplate of Righteousness</h3>
        <VerseQuote
          text="and having on the breastplate of righteousness;"
          reference="Ephesians 6:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The breastplate covered the chest. The heart, the lungs, the vital organs.</p>
          <p>
            💡 <strong>This is not your own righteousness.</strong> Paul is not telling you to
            armor yourself with your own good behavior. He means the righteousness Christ already
            gave you.
          </p>
          <p>
            That distinction matters more than it sounds like it should. Your own righteousness has
            cracks in it. It fails on a bad day, and a bad day is exactly when you need protection
            the most.
          </p>
          <p>
            The accusation against your heart never really stops. You are not enough. You blew it
            again. You will never change.
          </p>
          <p>
            📌 <strong>The breastplate of righteousness is what stands between that accusation and
            your heart.</strong> Not your performance. His finished work.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Shoes Fitted With the Gospel of Peace
        </h3>
        <VerseQuote
          text="And your feet shod with the preparation of the gospel of peace;"
          reference="Ephesians 6:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A Roman soldier&apos;s boots had spikes built into the sole. That gave him traction on
            rough or muddy ground, ground that would slide out from under an unprepared foot.
          </p>
          <p>Good footing is not glamorous. It is just what keeps you standing in the fight.</p>
          <p>
            ✅ <strong>The gospel of peace does exactly that for you.</strong> Peace with God is
            not a feeling that comes and goes with your circumstances. It is settled ground under
            you.
          </p>
          <p>
            Anxious circumstances try to knock your feet out from under you. A bad diagnosis. A
            layoff. A relationship falling apart.
          </p>
          <p>
            The gospel does not promise the ground around you will stay smooth. It promises your
            footing will hold anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Shield of Faith</h3>
        <VerseQuote
          text="Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked."
          reference="Ephesians 6:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul opens this one with the words <strong>above all</strong>. Out of six pieces, this
            is the one he flags as most urgent.
          </p>
          <p>
            Roman shields were large, sometimes soaked in water or covered in leather, built to
            stop a flaming arrow before it ever reached the soldier holding it.
          </p>
          <p>
            📌 <strong>Faith works the same way against a lie.</strong> It quenches the thought
            before it lands and starts a fire in your heart.
          </p>
          <p>
            A fiery dart rarely announces itself. It shows up as a sudden thought. God has given up
            on you. This will never get better. You are the only one struggling this way.
          </p>
          <p>
            The shield does not argue with the dart in midair. It simply refuses to let the dart
            land. That is what raising faith looks like in the actual moment.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Helmet of Salvation</h3>
        <VerseQuote text="And take the helmet of salvation," reference="Ephesians 6:17" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The helmet protected the one part of a soldier a single hit could end the fight for good. The head.</p>
          <p>
            💡 <strong>The helmet of salvation guards your mind.</strong> Your standing with God is
            already settled, and that settled truth is what keeps despair from taking over your
            thinking.
          </p>
          <p>
            Despair does not usually attack with one big blow. It attacks with a slow drip. It is
            too late for you. You have wandered too far this time. God is finished being patient
            with you.
          </p>
          <p>
            📌 <strong>None of that is true, and the helmet is why you do not have to believe
            it.</strong> Salvation is not a feeling you have to manufacture. It is a fact you get
            to wear.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Sword of the Spirit</h3>
        <VerseQuote
          text="and the sword of the Spirit, which is the word of God:"
          reference="Ephesians 6:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Look back at the list. Belt, breastplate, shoes, shield, helmet.</p>
          <p>
            📌 <strong>Every single one of those is defense.</strong> The sword is the only
            offensive piece in the whole passage.
          </p>
          <p>
            It is called the word of God because that is exactly how Jesus used it. In the
            wilderness, facing the devil directly, He did not answer with a feeling or a general
            sense that things would work out. He answered with one specific verse at a time.
          </p>
          <p>
            If you want to be ready to actually swing this sword the next time a lie shows up, it
            helps to know{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith
            </ArticleLink>{" "}
            when someone, or something, challenges it directly.
          </p>
          <p>A vague feeling cannot cut through a specific lie. A specific verse can.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Prayer: How You Actually Wear the Armor
        </h3>
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
            worn.</strong> A soldier standing in full armor with no way to reach his commander is
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
            gives that armor somewhere to actually get put on daily, instead of staying a nice idea
            you read about once.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Putting the Armor On
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The armor is not a chant and it is not a ritual you perform once. Here are seven ways
            to actually wear it.
          </p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Name the lie before you fight it.</strong> The belt of truth only helps once you
            know what untrue thing you are actually believing right now. Say it out loud, then say
            what is actually true instead.
          </li>
          <li>
            <strong>Memorize one piece&apos;s verse this week.</strong> Pick just one, the shield of
            faith or the sword of the Spirit, and get it into your memory. A verse you have
            memorized is a verse you can use in the dark, when you cannot reach for a Bible.
          </li>
          <li>
            <strong>Bring a specific verse to a specific temptation.</strong> The sword of the
            Spirit works because it is precise, the same way Jesus answered each temptation with an
            exact verse instead of a general feeling.
          </li>
          <li>
            <strong>Name your specific battle before you pray, not a vague one.</strong> Do not
            just pray for strength in general. Pray for the exact lie, the exact temptation, the
            exact fear you are facing today.
          </li>
          <li>
            <strong>Guard your mind before the moment, not during it.</strong>{" "}
            <ArticleLink href="/blog/building-self-control">Self control</ArticleLink> is not
            willpower in the moment. It is the helmet you already had on before the fiery dart
            showed up.
          </li>
          <li>
            <strong>Let peace set your footing before panic does.</strong> When circumstances shake,
            go back to what the gospel already settled about you before you react to what just
            happened.
          </li>
          <li>
            <strong>Pray about the fight before you feel it, not only after you lose it.</strong>{" "}
            Paul says pray always, not pray after. Make it part of your morning, not just your
            emergency line.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses on the Armor of God
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The armor of God shows up in more than one place in Scripture.</p>
          <p>Here are four verses worth carrying with you.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Ephesians 6:11</h3>
        <VerseQuote
          text="Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."
          reference="Ephesians 6:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the thesis verse of the whole passage.</p>
          <p>
            Notice the word <strong>wiles</strong>. It does not mean brute force. It means
            schemes, tricks, subtle traps.
          </p>
          <p>
            The devil is described here as clever, not just strong. That is why the armor is not
            optional accessory. It is what stands against a strategy built to look harmless until
            it has already worked.
          </p>
          <p>Put on the whole armor, Paul says. Not just the pieces that feel comfortable today.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Ephesians 6:12</h3>
        <VerseQuote
          text="For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places."
          reference="Ephesians 6:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This verse names the real target so you stop aiming at the wrong one.</p>
          <p>
            Notice how Paul stacks the language. Principalities, powers, rulers of darkness,
            spiritual wickedness in high places. That is not repetition for effect.
          </p>
          <p>
            📌 <strong>It describes an organized structure behind evil, not a random, scattered
            force.</strong> That should sober you. It should not paralyze you.
          </p>
          <p>
            The very next verse tells you what to do about an organized enemy. Take up the whole
            armor. You were never sent into this fight unequipped.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Corinthians 10:4</h3>
        <VerseQuote
          text="(For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds;)"
          reference="2 Corinthians 10:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul writes about this same battle again, years later, to a different church.</p>
          <p>
            <strong>Not carnal</strong> means not fleshly, not human strategy, not willpower alone.
          </p>
          <p>
            A <strong>strong hold</strong> here is not a building. It is a fortified pattern of
            thinking, a lie you have believed and defended for so long it feels like a fact.
          </p>
          <p>
            💡 <strong>You cannot argue a strong hold down with your own strength.</strong> It
            comes down through weapons that are mighty through God, not weapons you built
            yourself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Thessalonians 5:8</h3>
        <VerseQuote
          text="But let us, who are of the day, be sober, putting on the breastplate of faith and love; and for an helmet, the hope of salvation."
          reference="1 Thessalonians 5:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the same armor picture Paul painted in Ephesians, seen from a slightly
            different angle.
          </p>
          <p>
            Here the breastplate is faith and love. In Ephesians it is righteousness. Here the
            helmet is the hope of salvation. In Ephesians it is salvation itself.
          </p>
          <p>
            Same protection, described two ways. That tells you this armor was not a one time
            metaphor Paul used once and dropped. It was how he consistently pictured the Christian
            life.
          </p>
          <p>
            ✅ <strong>Notice the word sober.</strong> This armor is for people who are wide awake,
            paying attention, not drifting through their days on autopilot.
          </p>
        </div>
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

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do I need to put on the armor every day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Paul&apos;s language suggests an ongoing practice, not a one time event. The command to
          pray always in verse 18 points the same way. This is a daily posture of standing on
          truth, not a prayer you say once and never think about again.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is spiritual warfare real today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Ephesians 6:12 was not written about a past era, it describes an ongoing wrestling
          match believers are still in right now. It does not usually look like a movie. It looks
          like a temptation you keep circling back to, a lie about yourself you cannot shake, or
          division in a relationship that will not resolve. The fight is real even when it is
          quiet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I know if I am under spiritual attack?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not every hard day is a spiritual attack, and not every attack looks dramatic. Watch for
          patterns like sudden despair with no clear cause, a persistent lie about your identity, or
          temptation that intensifies right when you are trying to grow closer to God. When that
          happens, do not panic. Put the armor on, and bring it straight to prayer.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I actually put on the armor of God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Start small and specific rather than trying to feel all six pieces at once. Name one lie
          and replace it with truth. Pick one verse and bring it to one temptation. Pray about the
          exact battle you are facing today, not a vague request for strength. The armor gets worn
          in small, repeated choices, not in one dramatic moment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;fiery darts of the wicked&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a picture of sudden, burning thoughts meant to catch you off guard, things like
          despair, doubt, or temptation that arrive out of nowhere and try to ignite before you can
          think clearly. Roman shields were built to stop a literal flaming arrow before it landed.
          Faith is what stops the thought the same way, before it starts a fire in your heart.
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
            📌 <strong>Standing firm, not winning one dramatic battle, is the actual goal of this
            passage.</strong>
          </p>
          <p>
            You do not need a special ritual to put this on. You need truth in front of you, and a
            habit of bringing your day to God.
          </p>
          <p>
            Start with one piece today. Read Ephesians 6:10 to 18 slowly, out loud if you can, and
            let it settle before you move on to the next thing.
          </p>
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
