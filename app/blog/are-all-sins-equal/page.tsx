import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("are-all-sins-equal");

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

export default function AreAllSinsEqualPage() {
  return (
    <BlogPostShell
      slug="are-all-sins-equal"
      title={<>📖 Are All Sins Equal to God?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somebody probably told you this in a Sunday school class.</p>
            <p>Or you have said it to someone else without really deciding if it is true.</p>
            <p>&quot;All sin is the same to God.&quot;</p>
            <p>So the affair and the white lie you told your boss this morning land the same way in heaven.</p>
            <p>
              📌 <strong>Here is the honest answer to are all sins equal. Yes, and no. And the
              difference between those two answers matters more than you think.</strong>
            </p>
            <p>Every sin separates you from God the exact same way. That part is true and it is not up for debate.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>But Scripture does not treat every sin the same in weight, consequence, or judgment.</p>
            <p>Jesus said that plainly. Not a theologian centuries later. Jesus Himself.</p>
            <p>He told a Roman governor that someone else standing in the room had committed the greater sin.</p>
            <p>That sentence alone should settle the question that all sin sits on one flat shelf.</p>
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Getting this right protects you from two different traps.
          </p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 The trap of minimizing a sin because it feels small compared to someone else&apos;s.</li>
            <li>🔲 The trap of despairing over a sin because it feels too big for God to forgive.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Both traps come from misunderstanding this exact question.</p>
            <p>So let&apos;s walk through what the Bible actually says. Every verse here is word for word King James.</p>
            <p>By the end you will know how to hold both truths at once, the way Jesus did.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not a question for a seminary classroom.</p>
          <p>It is a question you carry into Tuesday.</p>
          <p>
            Into the moment you compare your gossip to someone else&apos;s addiction and quietly feel
            better about yourself.
          </p>
          <p>Into the moment you remember something you did years ago and wonder if grace has a limit.</p>
          <p>
            ⚠️ <strong>Get this wrong one way and you stop taking your own sin seriously.</strong> You
            start grading on a curve, comparing yourself to people who seem worse, and never actually
            dealing with your own heart before God.
          </p>
          <p>
            ⚠️ <strong>Get this wrong the other way and you stop believing you can be forgiven.</strong>{" "}
            You carry one failure like a weight nothing can lift, while God Himself says otherwise.
          </p>
          <p>The world has no real answer here. It either shrugs at sin entirely, or it ranks people by behavior and calls that justice.</p>
          <p>Scripture does something neither. It tells you the truth about how serious sin is, and the truth about how big grace is.</p>
          <p>📌 <strong>Both at once. That is the only honest place to stand.</strong></p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Actually Says About Sin
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. All Sin Separates You From God the Same Way
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start here, because this is the part that is completely true.</p>
          <p>Every sin, no matter how small it looks to you, puts you on the wrong side of a holy God.</p>
        </div>
        <VerseQuote text="For all have sinned, and come short of the glory of God;" reference="Romans 3:23" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Not some have sinned. Not the bad ones have sinned.</p>
          <p><strong>All have sinned.</strong></p>
          <p>And the wage that sin pays is not graded by size.</p>
        </div>
        <VerseQuote
          text="For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord."
          reference="Romans 6:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the word is <strong>death</strong>, singular. Not a sliding scale of wages where a
            lie earns a small fine and murder earns the death penalty.
          </p>
          <p>
            One wage. One result. Because sin is not first a scorecard problem. It is{" "}
            <ArticleLink href="/blog/what-is-sin">a broken relationship</ArticleLink> with the God who
            made you, and a broken relationship does not come in sizes.
          </p>
          <p>Adam and Eve did not commit murder in the garden. They ate fruit they were told not to eat.</p>
          <p>And it cost them Eden.</p>
          <p>📌 <strong>Every sin, no matter how small it looks from the outside, is big enough to separate you from God.</strong></p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Break the Law at One Point and You Are Guilty of All of It
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>James takes this even further.</p>
        </div>
        <VerseQuote
          text="For whosoever shall keep the whole law, and yet offend in one point, he is guilty of all."
          reference="James 2:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that slowly.</p>
          <p>You cannot pass God&apos;s law the way you pass a test, by getting most of the answers right.</p>
          <p>The law is not ten separate boxes where you check off nine and lose a few points on the tenth.</p>
          <p>It is one whole thing. Break it anywhere and you have broken it, period.</p>
          <p>
            💡 This is why &quot;I&apos;m a good person&quot; cannot be the standard. Good compared to
            whom, and measured against what.
          </p>
          <p>Against God&apos;s actual standard, one offense is already a verdict, not a deduction.</p>
          <p>So in this specific sense, yes. Sins are equal. Any sin is enough to make you guilty.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Jesus Told Pilate One Man Had &quot;The Greater Sin&quot;
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now here is where the flat answer stops being enough.</p>
          <p>Jesus stood in front of Pontius Pilate, beaten and about to be crucified, and He said this:</p>
        </div>
        <VerseQuote
          text="Jesus answered, Thou couldest have no power at all against me, except it were given thee from above: therefore he that delivered me unto thee hath the greater sin."
          reference="John 19:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The greater sin.</p>
          <p>Jesus was comparing Pilate, who was caving to political pressure, with the religious leaders who handed Him over with full knowledge of who He was.</p>
          <p>
            If every sin truly landed the same in God&apos;s eyes, that sentence makes no sense. Jesus
            does not say &quot;a sin.&quot; He says <strong>the greater sin</strong>.
          </p>
          <p>
            📌 <strong>Jesus Himself used comparative language about sin. That settles whether degrees
            of sin are a real category in Scripture.</strong>
          </p>
          <p>They are.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Scripture Grades Consequence, Not Just the Verdict
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once you see that, you start noticing it everywhere in Jesus&apos; own teaching.</p>
          <p>He told the cities that rejected Him this:</p>
        </div>
        <VerseQuote
          text="But I say unto you, That it shall be more tolerable for the land of Sodom in the day of judgment, than for thee."
          reference="Matthew 11:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            More tolerable for Sodom. A city whose name is a byword for wickedness, and Jesus says the
            day of judgment will go <strong>easier</strong> on them than on a town that watched His
            miracles and shrugged.
          </p>
          <p>
            Why. Because more light and more knowledge carries more responsibility, the same
            principle behind{" "}
            <ArticleLink href="/blog/what-is-hell">what Scripture actually teaches about hell</ArticleLink>{" "}
            as a place of real, measured judgment rather than one flat punishment for everyone.
          </p>
          <p>He said the same thing with a wage metaphor:</p>
        </div>
        <VerseQuote
          text="And that servant, which knew his lord's will, and prepared not himself, neither did according to his will, shall be beaten with many stripes. But he that knew not, and did commit things worthy of stripes, shall be beaten with few stripes. For unto whomsoever much is given, of him shall be much required: and to whom men have committed much, of him they will ask the more."
          reference="Luke 12:47 and 48"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p><strong>Many stripes</strong> for one servant. <strong>Few stripes</strong> for another.</p>
          <p>Not because God is unfair. Because God is exactly fair. He judges people according to what they actually knew.</p>
          <p>And He told the religious leaders of His day this, about the fine print they obsessed over while missing the point of the whole law:</p>
        </div>
        <VerseQuote
          text="Woe unto you, scribes and Pharisees, hypocrites! for ye pay tithe of mint and anise and cummin, and have omitted the weightier matters of the law, judgment, mercy, and faith: these ought ye to have done, and not to leave the other undone."
          reference="Matthew 23:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Weightier matters. That phrase alone tells you some matters carry more weight than others.</p>
          <p>Jesus does not say every single commandment pulls the exact same weight. He says some are weightier, and the Pharisees had the ranking backward.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Debt You Cannot Pay Is Still a Debt, Whatever the Size
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>So how do both truths fit together. Picture the parable Jesus told about two debts.</p>
          <p>One servant owed his king an amount he could never repay in a hundred lifetimes.</p>
        </div>
        <VerseQuote
          text="And when he had begun to reckon, one was brought unto him, which owed him ten thousand talents."
          reference="Matthew 18:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That same servant then went and found a man who owed him a tiny amount by comparison.</p>
        </div>
        <VerseQuote
          text="But the same servant went out, and found one of his fellowservants, which owed him an hundred pence: and he laid hands on him, and took him by the throat, saying, Pay me that thou owest."
          reference="Matthew 18:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ten thousand talents and a hundred pence are not remotely the same size of debt. The parable does not pretend otherwise.</p>
          <p>But notice what both debts had in common before the king forgave the first one.</p>
          <p>📌 <strong>Neither man could pay what he owed. A debt you cannot pay is still a debt, whatever the number attached to it.</strong></p>
          <p>
            That is the picture to hold onto. The size of two sins can be genuinely different, the way
            ten thousand talents is different from a hundred pence.
          </p>
          <p>And the fact that you owe anything at all is enough to leave you bankrupt before God, with no currency of your own that pays it off.</p>
          <p>Both things are true. Neither cancels the other.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Contempt and Murder Live Closer Together Than You Think
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the warning side of this truth, and it needs to be said plainly.</p>
          <p>Jesus took the commandment against murder and moved the line much closer to you than you expected.</p>
        </div>
        <VerseQuote
          text="Ye have heard that it was said by them of old time, Thou shalt not kill; and whosoever shall kill shall be in danger of the judgment: But I say unto you, That whosoever is angry with his brother without a cause shall be in danger of the judgment: and whosoever shall say to his brother, Raca, shall be in danger of the council: but whosoever shall say, Thou fool, shall be in danger of hell fire."
          reference="Matthew 5:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Murder starts in the courtroom of your own heart long before it ever reaches a hand.</p>
          <p>Contempt for another person, the quiet verdict that someone is worthless, is the same root as murder. It just has not grown all the way yet.</p>
          <p>John said this even more bluntly:</p>
        </div>
        <VerseQuote
          text="Whosoever hateth his brother is a murderer: and ye know that no murderer hath eternal life abiding in him."
          reference="1 John 3:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The &quot;small&quot; sin you called a personality flaw might be the same seed
            as the sin you think you would never commit.</strong>
          </p>
          <p>
            This is not meant to crush you. It is meant to keep you from the trap this whole article
            opened with, the one where you quietly rank your sin as fine because it never became
            something dramatic, the same way people argue over whether{" "}
            <ArticleLink href="/blog/is-drinking-alcohol-a-sin">something like drinking</ArticleLink>{" "}
            is even sin at all while ignoring the contempt sitting quietly in their own heart.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The One Sin Scripture Calls Unpardonable
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This question always lands here eventually, so let&apos;s face it directly.</p>
          <p>Jesus named one sin that stands apart from the rest.</p>
        </div>
        <VerseQuote
          text="Wherefore I say unto you, All manner of sin and blasphemy shall be forgiven unto men: but the blasphemy against the Holy Ghost shall not be forgiven unto men. And whosoever speaketh a word against the Son of man, it shall be forgiven him: but whosoever speaketh against the Holy Ghost, it shall not be forgiven him, neither in this world, neither in the world to come."
          reference="Matthew 12:31 and 32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That is not Jesus describing a one time slip of the tongue. He is describing a settled,
            final refusal to listen when the Spirit of God is clearly at work, a heart so hardened it
            calls good evil on purpose, over and over, until there is nothing left for the Spirit to
            reach.
          </p>
          <p>
            📌 <strong>If you are worried you have committed this, you almost certainly have not.</strong>{" "}
            The fear itself, the ache of wondering whether you have gone too far, is the Spirit still
            working on your heart. A heart that has truly crossed this line stops caring entirely.
          </p>
          <p>
            John describes something close to this, a settled sin that does not end in{" "}
            <ArticleLink href="/blog/what-is-repentance">repentance</ArticleLink>:
          </p>
        </div>
        <VerseQuote text="All unrighteousness is sin: and there is a sin not unto death." reference="1 John 5:17" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the phrase. <strong>A sin not unto death.</strong> John is drawing the same
            distinction Jesus drew. Most sin, confessed and repented of, does not end in that final
            hardness. One particular path does.
          </p>
          <p>So the honest summary of everything so far looks like this.</p>
          <p>📌 <strong>Every sin equally separates you from God. Not every sin carries equal weight, consequence, or danger.</strong></p>
          <p>Hold both. Jesus did.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Living This Out Honestly
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not just a theology question. It changes how you actually live. Here are eight ways to put it into practice.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Stop ranking your sin against somebody else&apos;s.</strong> The moment you think
            &quot;at least I never did what they did,&quot; you have missed the point of James 2:10
            entirely.
          </li>
          <li>
            <strong>Stop calling your own sin small just because it is quiet.</strong> Contempt, gossip,
            and a bitter heart are not harmless just because nobody can see them.
          </li>
          <li>
            <strong>Bring the quiet sins to confession, not just the loud ones.</strong> A habit of
            daily confession keeps your heart honest long before anything grows into something bigger.
          </li>
          <li>
            <strong>Do not let a big failure convince you grace ran out.</strong> The same God who
            forgave a debt of ten thousand talents is the God you are praying to right now.
          </li>
          <li>
            <strong>Watch the root, not just the fruit.</strong> Catch contempt in your heart early.
            That is where Jesus said the real danger starts.
          </li>
          <li>
            <strong>Let conviction send you toward God, not away from Him.</strong> The fact that your
            conscience still aches is good news, not bad news.
          </li>
          <li>
            <strong>Extend the same grading to other people that you want extended to you.</strong>{" "}
            Mercy first, judgment last. That is the order Jesus used with the woman caught in sin, and
            the order He uses with you.
          </li>
          <li>
            <strong>Run to{" "}
            <ArticleLink href="/blog/can-god-forgive-what-ive-done">forgiveness</ArticleLink>, not away
            from it.</strong> There is no debt you can owe that is bigger than the cross.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 4 Bible Verses About Whether All Sins Are Equal
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you only remember a handful of verses from this whole guide, make it these four.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Romans 6:23</h3>
        <VerseQuote
          text="For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord."
          reference="Romans 6:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse that proves sin is equal in one specific sense. There is one wage, not a sliding scale, and it is death.</p>
          <p>
            But look at the second half of the verse too. The gift that cancels that wage is also one
            gift, not a bigger gift for small sinners and a smaller gift for big ones. Eternal life,
            offered the exact same way to everyone who comes to Christ.
          </p>
          <p>This is the verse to hold when you are tempted to think your sin put you in a different category than everyone else. It did not.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. James 2:10</h3>
        <VerseQuote
          text="For whosoever shall keep the whole law, and yet offend in one point, he is guilty of all."
          reference="James 2:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse for the person comparing their record to someone else&apos;s and feeling fairly confident.</p>
          <p>One point of failure is enough. There is no version of you that passes God&apos;s law on points.</p>
          <p>That should humble you, not crush you. It is the exact reason grace, not performance, had to be the answer.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. John 19:11</h3>
        <VerseQuote
          text="Jesus answered, Thou couldest have no power at all against me, except it were given thee from above: therefore he that delivered me unto thee hath the greater sin."
          reference="John 19:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse that keeps anyone from flattening sin into one meaningless pile.</p>
          <p>
            Jesus, standing a few hours from the cross, still made a moral distinction between two
            people&apos;s guilt. If He drew that line, you can trust that lines like it are real.
          </p>
          <p>This is the verse for the person who thinks careful moral reasoning about sin is somehow unspiritual. It is not. Jesus did it Himself.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 12:47 and 48</h3>
        <VerseQuote
          text="And that servant, which knew his lord's will, and prepared not himself, neither did according to his will, shall be beaten with many stripes. But he that knew not, and did commit things worthy of stripes, shall be beaten with few stripes. For unto whomsoever much is given, of him shall be much required: and to whom men have committed much, of him they will ask the more."
          reference="Luke 12:47 and 48"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse for how God actually judges knowledge and opportunity.</p>
          <p>
            More truth, more exposure to Scripture, more years in the church, means more
            responsibility, not a free pass. This is a sobering verse for anyone who has sat in church
            pews their whole life.
          </p>
          <p>It is also a comforting verse for anyone who came to faith late, or who grew up with no exposure to God&apos;s Word at all. God judges according to what was actually given.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Whether All Sins Are Equal
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Are all sins equal in God&apos;s eyes?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In one sense, yes. Every sin separates you from God the same way and carries the same wage,
          death, per Romans 6:23. In another sense, no. Jesus Himself spoke of &quot;the greater
          sin&quot; in John 19:11, and Scripture consistently ties judgment to knowledge and
          opportunity. Both answers are true at the same time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is one sin worse than another sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in terms of consequence and severity. Jesus said it would be more tolerable for Sodom in
          the day of judgment than for a town that rejected His miracles, which only makes sense if
          some sin carries a heavier verdict than other sin. Every sin still makes you guilty before a
          holy God, but Scripture never pretends all sins carry identical weight.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the unpardonable sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus named blasphemy against the Holy Ghost as the one sin that will not be forgiven, in
          Matthew 12:31 and 32. This describes a settled, final rejection of the Spirit&apos;s work, not
          a single bad moment or a fearful thought. If you are worried you have committed it, that fear
          itself is strong evidence you have not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is lying as bad as murder?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both make you guilty before God, and James 2:10 says breaking the law at any point leaves you
          guilty of all of it. But Scripture does not treat their consequences the same. Jesus traced
          murder back to the contempt that starts it in Matthew 5:21 and 22, which shows the two are
          related at the root, not that every lie carries the same weight as taking a life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Jesus tell Pilate that someone else had the greater sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus was comparing Pilate, who gave in to political pressure, with the religious leaders who
          handed Him over with full knowledge of who He was. Jesus Himself used comparative language
          about sin in John 19:11, which settles that degrees of guilt are a real category in
          Scripture, not a human invention.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does getting angry at someone count as the same sin as murder?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus said unjust anger and contempt carry real danger, calling them the seed that murder
          grows from in Matthew 5:21 and 22. They share the same root in the heart. That does not mean
          every flash of frustration is identical to taking a life, but it does mean contempt should
          never be dismissed as harmless.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          If all sin leads to death, why do some sins get harsher judgment in the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the wage and the judgment are two different things. Every sin earns the same wage,
          separation from God, per Romans 6:23. But within that, Luke 12:47 and 48 says God judges
          people according to how much they knew and how much was entrusted to them. More knowledge
          means more responsibility, not a harsher starting line.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can a small sin send you to hell the same as a big sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in the sense that any unforgiven sin leaves you separated from God, and the size of the
          sin was never what saved anyone. What saves you is turning to Christ, not the size of what
          you are forgiven for. The real danger is not a small sin. It is an unconfessed one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is it true that no sin is too big for God to forgive?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, outside of the settled, final rejection described as the unpardonable sin. The parable
          of the servant who owed ten thousand talents in Matthew 18:24 pictures a debt no one could
          ever repay, forgiven in full. If you are still aching over what you did, that ache is an
          invitation to confess it, not proof that grace has a ceiling.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Every sin separates you from God the same way.</strong> There is no small sin
            that leaves your relationship with Him untouched.
          </p>
          <p>
            📌 <strong>Not every sin carries the same weight, consequence, or danger.</strong> Jesus
            Himself drew these lines. Stop pretending they are not there.
          </p>
          <p>
            📌 <strong>Neither truth cancels the other, and neither one gives you permission to
            despair or to coast.</strong>
          </p>
          <p>
            So stop comparing your sin to someone else&apos;s to feel better, and stop carrying a sin
            you have already confessed like it disqualifies you.
          </p>
          <p>
            The God who forgave a debt of ten thousand talents is not measuring your receipt before He
            decides whether to forgive you.
          </p>
          <p>He already decided. At the cross.</p>
          <p>Here is your one next step.</p>
          <p>
            Take the sin you have been minimizing, and the sin you have been carrying like a weight too
            heavy for grace, and bring both to Him tonight. Honestly. Out loud if you can.
          </p>
          <p>He is not grading you on a curve.</p>
          <p>He already paid the whole debt.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
