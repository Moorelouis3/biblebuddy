import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("what-is-repentance", {
  title: "What Is Repentance, Really? A Simple, Honest Answer",
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

export default function WhatIsRepentancePage() {
  return (
    <BlogPostShell
      slug="what-is-repentance"
      title={<>📖 What Is Repentance, Really? A Simple, Honest Answer</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>What is repentance? It is not feeling sorry. It is a change of mind that
              produces a change in direction.</strong>
            </p>
            <p>You already knew the word.</p>
            <p>You have heard it from a pulpit. Maybe you have said it yourself, after a bad week.</p>
            <p>But somewhere along the way it got flattened into one thing. Feeling bad.</p>
            <p>
              Cry a little. Say sorry to God. Feel the weight lift. And then, a month later, do the
              same thing again.
            </p>
            <p>
              If that cycle has you wondering whether your repentance is even real, you are not alone,
              and you are not the problem you think you are.
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This guide is going to give you the honest, full picture.</p>
            <p>What repentance actually is, straight from Scripture.</p>
            <p>Why feeling sorry is not the same thing, and never was.</p>
            <p>What it looks like when you fall into the same sin again.</p>
            <p>And what turning to God actually looks like on an ordinary Tuesday.</p>
            <p>Let&apos;s start with the part most people get wrong first.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You cannot have a real relationship with God without repentance.</p>
          <p>Not because God is keeping score, waiting for the right apology.</p>
          <p>
            But because sin is the thing that gets in between you and Him, and repentance is the
            turn back toward His face.
          </p>
          <p>
            Skip it, and you end up with a faith that is all belief and no movement. Facts about
            Jesus sitting next to a life that never actually changes direction.
          </p>
          <p>
            📌 <strong>That is why knowing{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">how you know you are saved</ArticleLink>{" "}
            and understanding repentance are the same conversation.</strong>
          </p>
          <p>Real faith always turns. Not perfectly. But really.</p>
          <p>The world has its own version of this, and it falls apart fast.</p>
          <p>
            Therapy language calls it growth. Self help calls it a better version of you. Both can be
            true in their own lane, and neither one touches the real problem.
          </p>
          <p>
            ⚠️ <strong>The world&apos;s versions ask you to feel better about yourself. God asks you
            to turn toward Him.</strong>
          </p>
          <p>Those are not the same thing, and only one of them actually saves anybody.</p>
          <p>
            And the stakes are not small. Scripture is honest that a life that never turns ends
            somewhere real, which is exactly why{" "}
            <ArticleLink href="/blog/what-is-hell">what the Bible actually teaches about hell</ArticleLink>{" "}
            is not a topic to avoid out of politeness.
          </p>
          <p>
            That is not meant to scare you into a feeling. It is meant to show you why this word
            matters more than almost any other one in your Bible.
          </p>
          <p>So get this settled early, because the rest of this guide builds on it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Repentance Really Means
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Repentance Is More Than Feeling Sorry
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the first thing to settle.</p>
          <p>Feeling sorry is an emotion. Repentance is a decision.</p>
          <p>
            You can feel sorry about getting caught. You can feel sorry about the consequences
            landing on you. Neither of those is repentance.
          </p>
          <p>Paul draws the line sharply:</p>
        </div>
        <VerseQuote
          text="For godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death."
          reference="2 Corinthians 7:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two kinds of sorrow. One leads somewhere good. One leads nowhere at all.
          </p>
          <p>
            ❓ What is the difference between them? Not the tears. Not the intensity. The direction.
          </p>
          <p>
            Godly sorrow turns toward God. Worldly sorrow just sits in the feeling, or worse, turns
            inward on itself.
          </p>
          <p>
            💡 <strong>You can see the difference most clearly in two men on the same night.</strong>
          </p>
          <p>Peter denied Jesus three times. Then this happened:</p>
        </div>
        <VerseQuote
          text="And Peter remembered the word of Jesus, which said unto him, Before the cock crow, thou shalt deny me thrice. And he went out, and wept bitterly."
          reference="Matthew 26:75"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas betrayed Jesus for thirty pieces of silver. Then this happened:</p>
        </div>
        <VerseQuote
          text="Then Judas, which had betrayed him, when he saw that he was condemned, repented himself, and brought again the thirty pieces of silver to the chief priests and elders, saying, I have sinned in that I have betrayed the innocent blood. And they said, What is that to us? see thou to that. And he cast down the pieces of silver in the temple, and departed, and went and hanged himself."
          reference="Matthew 27:3 through 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Both men did something terrible to Jesus in the same twenty four hours. Both men felt
            genuine, crushing regret.
          </p>
          <p>
            ⚠️ <strong>Only one of them turned back toward Jesus. The other one turned in on
            himself and never came back at all.</strong>
          </p>
          <p>Peter wept, and then he went looking for Jesus again.</p>
          <p>Judas wept, and then he gave up on himself.</p>
          <p>
            📌 <strong>That is the whole difference between worldly sorrow and godly sorrow. One
            ends at the feeling. The other one walks somewhere.</strong>
          </p>
          <p>
            So the next time you are tempted to measure your repentance by how bad you feel, stop
            and ask a better question instead. Not how heavy is the guilt. Where is it taking you.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. It Is a Change of Mind That Changes Your Direction
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The word repent in the New Testament carries the idea of a changed mind. Not a passing
            thought. A real change in how you see something, deep enough that it moves your feet.
          </p>
          <p>John the Baptist put it in the plainest possible terms:</p>
        </div>
        <VerseQuote text="Bring forth therefore fruits meet for repentance:" reference="Matthew 3:8" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Fruit. Something you can actually see growing.</p>
          <p>
            Not a feeling locked up inside you. Something that shows in your actual life. Your
            words. Your habits. Where your money goes. Who you forgive.
          </p>
          <p>
            💡 <strong>If nothing in your life is different, nothing in your mind has actually
            changed yet.</strong>
          </p>
          <p>
            And notice who starts this whole thing. Not you, working up enough guilt on your own.
          </p>
        </div>
        <VerseQuote
          text="Or despisest thou the riches of his goodness and forbearance and longsuffering; not knowing that the goodness of God leadeth thee to repentance?"
          reference="Romans 2:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not His anger. His goodness. God&apos;s kindness toward you is what is actually pulling
            you to turn, long before guilt ever does.
          </p>
          <p>
            ❓ That changes how you picture the whole thing, does it not? You are not turning toward
            an angry God bracing for impact. You are turning toward a kind one who has been patient
            with you this whole time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. What Turning Actually Looks Like
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus told one story that shows this better than any definition could.</p>
          <p>
            A son takes his inheritance early, which was its own kind of insult, and leaves for a
            far country. He burns through everything on reckless living. Then the money runs out
            and a famine hits, and he ends up feeding pigs, starving, a Jewish boy doing the one job
            his own law called unclean.
          </p>
          <p>Here is the turn, in slow motion:</p>
        </div>
        <VerseQuote
          text="And when he came to himself, he said, How many hired servants of my father's have bread enough and to spare, and I perish with hunger! I will arise and go to my father, and will say unto him, Father, I have sinned against heaven, and before thee, And am no more worthy to be called thy son: make me as one of thy hired servants."
          reference="Luke 15:17 through 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Watch the order. First he came to himself. Then he named what he had done,
            plainly. Then he got up and actually walked home.</strong>
          </p>
          <p>Three steps. Honest thinking. Honest naming. Real movement.</p>
          <p>Any one of those three missing, and it is not repentance yet.</p>
          <p>And look at what met him on the road:</p>
        </div>
        <VerseQuote
          text="And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him."
          reference="Luke 15:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The father was not standing at the door with His arms folded, waiting to hear the
            speech before deciding.
          </p>
          <p>He was already running.</p>
          <p>
            💡 <strong>That is what it looks like every single time you actually turn back to
            God.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Repenting of the Same Sin Again Does Not Mean It Is Fake
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now let us talk about the thing you are actually worried about.</p>
          <p>
            You have confessed this same sin before. You meant it. And here you are again,
            confessing it a second time, or a tenth.
          </p>
          <p>❓ Does that prove your first repentance was not real?</p>
          <p>No. Here is why.</p>
          <p>
            Jesus told His disciples to keep forgiving someone who keeps coming back saying sorry:
          </p>
        </div>
        <VerseQuote
          text="Take heed to yourselves: If thy brother trespass against thee, rebuke him; and if he repent, forgive him. And if he trespass against thee seven times in a day, and seven times in a day turn again to thee, saying, I repent; thou shalt forgive him."
          reference="Luke 17:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven times in one day. Jesus is describing a real struggle with a repeated sin, and He
            still calls the turning back real each time.
          </p>
          <p>
            📌 <strong>A sin you keep fighting is not proof your faith is fake. A sin you have
            stopped fighting at all would be.</strong>
          </p>
          <p>
            That is the actual test. Not whether the temptation is gone. Whether you are still
            turning, still naming it, still walking back.
          </p>
          <p>
            This is also exactly why confession is not a one time transaction you complete and move
            on from.
          </p>
        </div>
        <VerseQuote
          text="If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
          reference="1 John 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If confessing once covered every future sin forever, John would never have needed to
            write that verse to Christians, in the present tense, as an ongoing posture.
          </p>
          <p>
            ⚠️ <strong>Do not let a relapse convince you your faith was never real. Let it send you
            back to the same honest confession, again.</strong>
          </p>
          <p>
            If you are stuck wondering whether this means your salvation is actually in danger, that
            is a fair question, and it deserves its own honest answer. Start with{" "}
            <ArticleLink href="/blog/can-you-lose-your-salvation">
              what the Bible actually says about losing your salvation
            </ArticleLink>
            , because the fear underneath that question is usually bigger than the sin itself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Turning Actually Looks Like on a Tuesday
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Repentance is not only an altar moment with music playing.</p>
          <p>Most of it happens in plain, boring minutes, with nobody watching.</p>
          <p>It looks like deleting the app you cannot handle at midnight.</p>
          <p>It looks like telling your spouse the truth you have been avoiding for a week.</p>
          <p>It looks like paying back the money, not just apologizing for taking it.</p>
          <p>
            It looks like catching the same old thought pattern mid sentence and actually stopping
            it, instead of letting it run.
          </p>
          <p>
            💡 <strong>None of that feels dramatic. All of it is repentance.</strong>
          </p>
          <p>
            That is also where real discipline comes in. Turning away from a sin once is a decision.
            Staying turned is{" "}
            <ArticleLink href="/blog/building-self-control">a habit you have to build</ArticleLink>.
          </p>
          <p>
            And for plenty of readers, the pull back toward the old sin is tied to something
            specific holding you back in the first place.{" "}
            <ArticleLink href="/blog/5-things-holding-men-back-from-god">
              Naming what that actually is
            </ArticleLink>{" "}
            is usually the honest next step.
          </p>
          <p>Repentance that only shows up on Sunday is not repentance yet. It is a performance.</p>
          <p>Real repentance shows up on the Tuesday nobody is grading you on.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Repentance Is Not Earning Your Way Back
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One more thing needs saying plainly, because plenty of sincere people get this part
            wrong.
          </p>
          <p>
            Repentance is not punishing yourself until you feel you have suffered enough to
            deserve forgiveness.
          </p>
          <p>
            ⚠️ <strong>Beating yourself up is not humility. It is a quiet way of trying to pay for
            your own sin, which Jesus already paid for in full.</strong>
          </p>
          <p>Paul described real repentance to King Agrippa this way:</p>
        </div>
        <VerseQuote
          text="But shewed first unto them of Damascus, and at Jerusalem, and throughout all the coasts of Judaea, and then to the Gentiles, that they should repent and turn to God, and do works meet for repentance."
          reference="Acts 26:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the order. Repent and turn to God first. The works that match real repentance
            come after, as proof of the turning, never as the price of it.
          </p>
          <p>
            And notice how patient God is while you get there. He is not standing over you with a
            stopwatch.
          </p>
        </div>
        <VerseQuote
          text="The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering to us-ward, not willing that any should perish, but that all should come to repentance."
          reference="2 Peter 3:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>God is not slow because He does not care. He is patient because He wants
            you to actually get there, not just punish yourself into pretending you did.</strong>
          </p>
          <p>Let the guilt do its one job, which is to point you back to God. Then let it go.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: What Turning Looks Like This Week
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Repentance is not a feeling you wait for. It is something you practice.</p>
          <p>Here are seven ways to actually do it this week.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Name the sin out loud, specifically.</strong> Not &quot;I have not been a good
            Christian.&quot; Say the actual thing. &quot;I lied to my wife about the money.&quot;
            Vague sorrow produces vague change. Specific confession produces specific turning.
          </li>
          <li>
            <strong>Tell God before you try to fix it yourself.</strong> Confess first, plan
            second. Trying to clean yourself up before you come to God gets the order backward.
          </li>
          <li>
            <strong>Make it right where you can.</strong> If money is owed, pay it. If a lie was
            told, correct it. Repentance that costs you nothing is usually just words.
          </li>
          <li>
            <strong>Tell one trusted believer.</strong> Hidden sin grows in the dark. A sin spoken
            out loud to someone safe loses most of its power over you.
          </li>
          <li>
            <strong>Remove the easy path back to it.</strong> Block the number. Delete the app.
            Change the route home. Willpower alone rarely beats a familiar trigger sitting in plain
            sight.
          </li>
          <li>
            <strong>Expect to need to do this again.</strong> Build the plan for the next time the
            temptation shows up, because it will. That is not pessimism. That is honesty, and it
            keeps you from being surprised and discouraged when the fight comes back around.
          </li>
          <li>
            <strong>Thank God for the conviction itself.</strong> Feeling bad about sin is not a
            punishment. It is the goodness of God still working on you. Treat it like a gift, not an
            attack, because a conscience that no longer bothers you is the actual danger sign.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Pick one of these and start tonight. Not all seven at once.</p>
          <p>Small, honest, repeated turning beats one big emotional moment every time.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses About Repentance
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Corinthians 7:10</h3>
        <VerseQuote
          text="For godly sorrow worketh repentance to salvation not to be repented of: but the sorrow of the world worketh death."
          reference="2 Corinthians 7:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse to come back to whenever you are not sure if your sorrow over sin is
            real.
          </p>
          <p>Ask where the sorrow is heading. One kind leads to life. The other just leads nowhere.</p>
          <p>If your sorrow has never once moved your feet toward God, that is worth being honest about.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Luke 15:20</h3>
        <VerseQuote
          text="And he arose, and came to his father. But when he was yet a great way off, his father saw him, and had compassion, and ran, and fell on his neck, and kissed him."
          reference="Luke 15:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Keep this verse for the moment you are too ashamed to go back to God at all.
          </p>
          <p>
            The father ran before a single word of apology was said. That is the picture of how God
            responds to real turning.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 John 1:9</h3>
        <VerseQuote
          text="If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
          reference="1 John 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Memorize this one. It is short enough, and it is a promise, not a maybe.</p>
          <p>
            Faithful and just. Not moody. Not keeping track of how many times you have come back
            this month.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Acts 3:19</h3>
        <VerseQuote
          text="Repent ye therefore, and be converted, that your sins may be blotted out, when the times of refreshing shall come from the presence of the Lord;"
          reference="Acts 3:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter preached this to the very crowd that had helped kill Jesus weeks earlier.</p>
          <p>
            If repentance was available to them, it is available to you, whatever you are carrying
            right now.
          </p>
          <p>Blotted out. Not just covered. Removed.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Psalm 51:17</h3>
        <VerseQuote
          text="The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise."
          reference="Psalm 51:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David wrote this after his sin with Bathsheba, one of the ugliest failures in the whole
            Bible.
          </p>
          <p>
            And he found out God was not looking for a perfect man. He was looking for a broken,
            honest one.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Repentance
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to repent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          To repent means to have a change of mind about sin that produces a change in direction.
          It starts with honestly naming what you have done, moves through genuine sorrow, and ends
          with actually turning back toward God. Feeling sorry alone is not repentance. Walking back
          is the part that completes it. It is less like paying a fine and more like a U turn on a
          road you realized was going the wrong way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is repentance a one time event or ongoing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both. There is a first turning, when you come to Christ. But repentance also continues as
          a daily posture for the rest of your life, because you keep sinning and need to keep
          coming back. 1 John 1:9 is written in the present tense for exactly this reason.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do I have to repent every time I sin, even small things?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, in the sense of staying honest with God about it. That does not mean panicking over
          every small failure. It means keeping short accounts, bringing sin to God as soon as you
          notice it, rather than letting it pile up in silence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          If I keep falling into the same sin, does that mean I never really repented?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Jesus told His disciples to forgive a brother who repents of the same sin seven times
          in one day. A repeated struggle shows you are still fighting, which is very different from
          giving up the fight entirely. The real warning sign is not repetition. It is when you stop
          turning at all, when the sin stops bothering you and you stop bringing it to God. Keep
          bringing it back to Him, even the hundredth time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between repentance and regret?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Regret can stay stuck on how the sin makes you feel or what it cost you. Repentance moves
          past the feeling into an actual change of direction toward God. Judas regretted betraying
          Jesus. Peter repented of denying Him. Only one of them turned back.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can you repent without feeling emotional about it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Emotion often comes with real repentance, but the test is the turning, not the tears.
          Someone can weep and never change, and someone can quietly, soberly decide to stop a sin
          and actually mean it. God is looking at the direction of your life, not the size of your
          reaction.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does repentance mean I have to feel worthless?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Honest confession and self hatred are not the same thing. The prodigal son named his
          sin plainly, and his father still called him son and threw a celebration. Repentance is
          honest about the sin without being cruel about your identity in Christ.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is repentance something I do, or something God does in me?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both are true at once. Romans 2:4 says the goodness of God leads you to repentance, so God
          is the one drawing you. But you are still the one who has to actually turn. Nobody repents
          for you.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between repentance and asking for forgiveness?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Asking for forgiveness is a request. Repentance is the turning that makes the request
          honest. You can ask forgiveness for something and keep doing it. Real repentance is what
          turns the apology into something real.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I know if my repentance is real?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Look for fruit, not just feelings. Has anything in your actual life changed, even a
          little? Are you still fighting the sin instead of excusing it? Are you turning toward God
          instead of hiding from Him? Real repentance always shows up somewhere outside your own
          head, in a habit broken, a relationship repaired, or a conversation you finally had the
          courage to start.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is a good Bible verse to start with if I am trying to repent right now?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Start with 1 John 1:9. It is short, it is a promise rather than a condition, and it tells
          you exactly what God does the moment you confess honestly. Say the sin plainly to Him
          tonight, in your own words, and let that verse be the thing you stand on while you wait
          to feel anything at all.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Repentance is more than feeling sorry.</strong> It is a change of mind that
            actually changes your direction. Judas felt sorry and walked away forever. Peter felt
            sorry and walked back.
          </p>
          <p>
            📌 <strong>Falling into the same sin again does not prove your repentance was fake.</strong>{" "}
            It proves you are still in the fight. Giving up the fight is the real warning sign, not
            the struggle itself.
          </p>
          <p>
            📌 <strong>Real turning shows up on an ordinary Tuesday,</strong> not only at an altar.
            A deleted app. An honest sentence. A debt repaid. That is what repentance actually looks
            like most of the time.
          </p>
          <p>
            You do not need a perfect track record to come back to God tonight. You need to come
            to yourself, like the son in that story, and get up, and start walking.
          </p>
          <p>
            You do not even need the whole speech worked out before you move. The son in that story
            barely got his first sentence out before his father was already running toward him.
          </p>
          <p>
            So whatever it is you have been carrying, name it to God honestly right now, in your own
            plain words. Then get up and take the next step that turning actually asks of you.
          </p>
          <p>He is already watching the road. He has been the whole time.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
