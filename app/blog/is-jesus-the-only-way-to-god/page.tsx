import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("is-jesus-the-only-way-to-god", {
  title: "Is Jesus Really the Only Way to God?",
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

export default function IsJesusReallyTheOnlyWayToGodPage() {
  return (
    <BlogPostShell
      slug="is-jesus-the-only-way-to-god"
      title={<>📖 Is Jesus Really the Only Way to God?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somewhere in your life, there is a person you love who does not believe in Jesus.</p>
            <p>Maybe it is your dad. Maybe it is your best friend from college. Maybe it is your own son or daughter.</p>
            <p>
              And somewhere along the way, you heard what Christians actually believe about him.
              That Jesus is not just a way to God. He is the only way to God.
            </p>
            <p>And it landed wrong. Maybe it still does.</p>
            <p>
              📌 <strong>If you are asking is Jesus really the only way to God, you are not asking
              a bad question. You are asking the most honest question a person who loves someone
              outside the faith can ask.</strong>
            </p>
            <p>So let us answer it plainly, right away, instead of circling it for the next few thousand words.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>✅ Yes. The Bible says Jesus is the only way to God.</li>
            <li>✅ Not one option among several good ones.</li>
            <li>✅ Not the path that happens to work best for you personally.</li>
            <li>✅ The only way.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>That is not a verse pulled out of context and stretched.</p>
            <p>
              Jesus said it himself, in his own words, on the last night of his life. His closest
              friend Peter said it too, standing in front of the very men who had just had Jesus
              killed.
            </p>
            <p>Here is what this guide will not do.</p>
            <p>
              It will not soften that claim to make it easier to hear. And it will not defend it
              with an edge, like the exclusivity is something to win an argument with.
            </p>
            <p>
              Instead we are going to slow down and look at what Jesus actually said, why he said
              it the way he said it, and why a claim this narrow does not have to leave you (or the
              people you love) feeling condemned.
            </p>
            <p>Because here is something worth knowing before we go any further.</p>
            <p>
              💡 The most exclusive claim in the Bible was made by the same man who died for the
              people who would reject it.
            </p>
            <p>That is not the record of someone trying to shut people out.</p>
            <p>Stay with this. Bring your questions. Bring the face of the person you are thinking about right now.</p>
            <p>
              You do not have to check your honesty at the door to read the rest of this. You are
              allowed to feel the tension and still want to know the truth.
            </p>
            <p>Let us look at what Jesus actually said.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Claim Matters So Much
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You could skip past this claim. Plenty of churches do.</p>
          <p>
            Some trim it down to something softer. &quot;Jesus is a way.&quot; &quot;Jesus is my
            way.&quot; Anything that does not require an answer when a coworker asks about their
            Buddhist neighbor.
          </p>
          <p>But you cannot actually follow Jesus and quietly disagree with him about this.</p>
          <p>Because this is not a side doctrine. It is not a debate among theologians who otherwise agree on everything that matters.</p>
          <p>
            📌 <strong>This is Jesus telling you, in his own words, what he came to do.</strong>
          </p>
          <p>If he is right, this is the most important thing you could ever tell someone you love.</p>
          <p>If he is wrong about this, he is wrong about who he is entirely, and the whole faith collapses with it.</p>
          <p>There is no version of Christianity where this claim gets to be optional.</p>
          <p>
            You can still love people who reject it. You can still ache over it. But you cannot
            edit it out of Jesus&apos;s own words and call what is left the same faith.
          </p>
          <p>
            So this matters for your faith in a very practical way. How you understand this claim
            will shape how you talk to your neighbor, how you pray for your unbelieving family, and
            whether you can look someone in the eye and tell them the truth without either watering
            it down or swinging it like a weapon.
          </p>
          <p>
            ⚠️ <strong>Christians have done real damage wielding this claim without love.</strong>
          </p>
          <p>You do not have to be one of them.</p>
          <p>
            Learning{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith in Jesus
            </ArticleLink>{" "}
            starts here, with getting this claim right yourself before you ever try to explain it
            to someone else.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚪 What Jesus Actually Claimed
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. This Claim Sounds Narrow, and That Is Worth Sitting With
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Let us not rush past the discomfort.</p>
          <p>
            If you have a friend who is Jewish, or a coworker who is Muslim, or a grandmother who
            lived a beautiful, generous life and never once opened a Bible, this claim touches
            them.
          </p>
          <p>That is not a small thing.</p>
          <p>
            ❓ <strong>What kind of God would set up only one door?</strong>
          </p>
          <p>That question deserves an honest answer, not a scolding for asking it.</p>
          <p>
            Here is what will not help. Pretending you do not feel the weight of this. Reciting the
            verse quickly and moving on before it has a chance to sting.
          </p>
          <p>
            📌 <strong>Take this claim seriously enough to let it bother you for a minute.</strong>
          </p>
          <p>
            Jesus was not vague. He was not offering one spiritual option among a buffet of paths
            up the same mountain. He said something specific, in a specific place, at a specific
            moment.
          </p>
          <p>
            And the setting matters. He said this in the middle of Passover, hours before his own
            arrest, to men who were terrified about what was about to happen to them.
          </p>
          <p>This was not a sermon to a crowd. It was a promise, spoken to eleven frightened friends in an upper room.</p>
          <p>
            Think about who was in that room. Men who had left everything to follow him. Men who
            were about to watch him die and would spend the next three days believing it was all
            over. Jesus chose that night, of all nights, to say the most defining thing he ever said
            about himself.
          </p>
          <p>
            So before we look at the words themselves, sit with this. The claim really is narrow.
            It really does include people you love who do not believe it. And Jesus said it
            anyway, not because he did not care about them, but because of what he was about to do
            for them.
          </p>
          <p>Hold that tension. Do not let go of it yet. It is where the rest of this guide lives.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. What Jesus Actually Said in John 14:6
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the verse itself.</p>
        </div>
        <VerseQuote
          text="Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me."
          reference="John 14:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read it slowly.</p>
          <p>Notice the word he did not use.</p>
          <p>He did not say &quot;a way.&quot; He did not say &quot;one way among several that work.&quot; He said the way.</p>
          <p>
            📌 <strong>The definite article matters. Jesus was claiming to be the only route that
            exists, not the preferred route among options.</strong>
          </p>
          <p>Then he adds two more claims stacked on top of the first.</p>
          <p>
            The truth. Not a truth, one perspective worth weighing alongside other opinions. The
            truth, as in the standard everything else gets measured against.
          </p>
          <p>
            The life. Not a good example of how to live well. The source of life itself, the thing
            every human being is actually searching for underneath whatever they say they are
            searching for.
          </p>
          <p>And then he finishes with the part that removes any wiggle room.</p>
          <p>&quot;No man cometh unto the Father, but by me.&quot;</p>
          <p>Not &quot;no man is likely to.&quot; Not &quot;it is harder for a man to.&quot; No man comes to the Father, except by him.</p>
          <p>
            This was not an offhand comment. Thomas had just asked him, &quot;Lord, we know not
            whither thou goest; and how can we know the way?&quot;
          </p>
          <p>
            Jesus was answering a direct question with a direct claim. He did not say I will show
            you a way. He said I am the way.
          </p>
          <p>That distinction is the whole argument of this post.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Only a Few Honest Options Once You Hear This Claim
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is where a lot of people try to have it both ways.</p>
          <p>
            They want to say Jesus was a wonderful teacher. Wise. Kind. Worth admiring. And they
            want to quietly set aside the parts of what he said that make them uncomfortable, like
            this one.
          </p>
          <p>But look again at what he actually claimed.</p>
          <p>He did not say I have found a good path to God. He said I am the way.</p>
          <p>A teacher who says &quot;here is a good path&quot; is offering advice. You can take it or leave it, and he remains a good teacher either way.</p>
          <p>
            A teacher who says &quot;I myself am the only path to God, and no one reaches the
            Father except through me&quot; is not offering advice anymore.
          </p>
          <p>
            📌 <strong>That kind of claim only leaves you with a few honest options.</strong>
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🔲 Either it is true, and Jesus really is the way to God in a category all his own.</li>
          <li>🔲 Or Jesus knew it was not true and said it anyway, which makes him a liar, not a good teacher at all.</li>
          <li>🔲 Or Jesus sincerely believed something false about himself on that scale, which makes him badly mistaken about his own identity, not a wise teacher.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            What you cannot honestly do is keep the label &quot;good moral teacher&quot; while
            quietly setting aside the claim that got him killed.
          </p>
          <p>A merely good teacher does not say things like this about himself.</p>
          <p>
            ❓ <strong>So which is it?</strong>
          </p>
          <p>
            That is not a rhetorical trick. It is the actual fork in the road this one verse puts
            in front of every reader, believer or not.
          </p>
          <p>
            Plenty of people try to build a fourth option. Jesus as a good man who was simply
            confused about theology, or exaggerating for effect, or speaking in some symbolic sense
            his followers later misread.
          </p>
          <p>
            But those explanations do not survive the rest of what we know about him. This is the
            same teacher whose ethics people still admire two thousand years later. Careful,
            precise, morally serious. That is not the profile of a man prone to careless
            exaggeration about the biggest claim of his life.
          </p>
          <p>
            📌 <strong>The same sound judgment you admire in his teaching on love and forgiveness
            is the judgment behind this claim too.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. What Peter Said to the Men Who Crucified Jesus
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A few weeks after the resurrection, Peter and John healed a man who had been lame his
            whole life. It caused such a stir that the religious leaders hauled them in front of
            the Sanhedrin, the same council that had condemned Jesus to death only weeks earlier.
          </p>
          <p>These were not friendly strangers Peter was talking to.</p>
          <p>Some of the men in that room had likely called for Jesus to be crucified themselves.</p>
          <p>And Peter, standing in front of them, said this about the healing:</p>
        </div>
        <VerseQuote
          text="Be it known unto you all, and to all the people of Israel, that by the name of Jesus Christ of Nazareth, whom ye crucified, whom God raised from the dead, even by him doth this man stand here before you whole."
          reference="Acts 4:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then, without flinching, he said this:</p>
        </div>
        <VerseQuote
          text="Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved."
          reference="Acts 4:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Peter said the most exclusive sentence in the New Testament to the very
            people who had power over his life, weeks after they had killed his friend.</strong>
          </p>
          <p>This was not a comfortable thing to say.</p>
          <p>
            It would have been so much easier, so much safer, to soften it. To say something like
            &quot;well, there are many paths, but this one works for us.&quot;
          </p>
          <p>He did not do that.</p>
          <p>
            ⚠️ Notice something else. Peter was not saying this from a place of superiority. Days
            before this, he had been so afraid of a servant girl&apos;s question that he denied even
            knowing Jesus, three times.
          </p>
          <p>This is the same Peter, transformed, standing in the same council&apos;s building, no longer hiding.</p>
          <p>
            If this claim were really about human pride, this is the last place it would show up.
            Pride does not usually walk straight into a room full of the people who could kill you
            and repeat the very thing that got your friend killed.
          </p>
          <p>
            Peter said it because he believed it was true, and because he believed the people in
            that room needed to hear it too, the same people who had crucified the man he was
            preaching about.
          </p>
          <p>
            📌 <strong>That is what it looks like to say something that actually costs you
            something.</strong>
          </p>
          <p>
            Learning{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              how you know you are saved
            </ArticleLink>{" "}
            starts with taking seriously what the apostles themselves staked their lives on saying.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why Exclusive Does Not Mean Arrogant
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the part that trips people up the most.</p>
          <p>
            ❓ <strong>Does not &quot;only one way&quot; just sound arrogant?</strong>
          </p>
          <p>Think about it differently for a second.</p>
          <p>
            If you were diagnosed with a serious illness, and there was exactly one treatment that
            actually cured it, would you want your doctor to soften that?
          </p>
          <p>
            Imagine a doctor who said, &quot;well, there are several treatments, and we should
            respect that different patients choose different paths,&quot; when in fact only one of
            them actually worked.
          </p>
          <p>That doctor is not being humble. That doctor is being negligent, and it would cost you your life.</p>
          <p>
            📌 <strong>A doctor who tells you the truth about the only cure is not insulting you.
            She is loving you enough to tell you the truth instead of a comfortable lie.</strong>
          </p>
          <p>Exclusivity is not automatically arrogance. It depends entirely on whether the claim is true, and on the posture of the person saying it.</p>
          <p>
            Jesus did not say &quot;I am the way&quot; from a throne, looking down on everyone who
            disagreed. He said it hours before he let himself be nailed to a cross for the very
            people the claim describes as lost without him.
          </p>
          <p>
            ⚠️ The real arrogance would be inventing a cure that did not exist and charging people
            for it. Or worse, knowing the real cure and staying quiet about it because it might
            make you unpopular at the dinner table.
          </p>
          <p>
            📌 <strong>Telling the truth, gently, is not the opposite of love. It is what love
            does when it actually cares about the outcome and not just about being liked.</strong>
          </p>
          <p>
            That is the posture this claim was made in. Not a locked door slammed on people who do
            not qualify. A cure freely offered, paid for by Jesus himself, to anyone who will take
            it.
          </p>
          <p>
            Think about how differently the same sentence lands depending on who is speaking it. A
            stranger telling you your entire family is wrong feels like an attack. A doctor who has
            already given her own blood to save you telling you the same hard truth feels like
            something else entirely.
          </p>
          <p>Jesus is the second kind of voice, not the first.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. How to Hold This Around People You Love
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            So what do you actually do with this on a Tuesday, sitting across the table from your
            unbelieving brother, or reading a text from a friend who just told you she is agnostic
            now?
          </p>
          <p>You do not need to win the conversation.</p>
          <p>
            📌 <strong>You are not the judge. You are just a witness to what you have seen and
            what you believe is true.</strong>
          </p>
          <p>
            Start here. This claim is not the whole story of who God is. Scripture also says a
            great deal about God&apos;s character, his patience, his fairness, and how he deals
            with people who never had a real chance to hear about Jesus clearly. That is a big
            question, worth its own honest conversation, and not one this guide is trying to settle
            in a few lines.
          </p>
          <p>
            What you can hold onto, without resolving every question tonight, is this. The God who
            made this exclusive claim is the same God described all through Scripture as slow to
            anger, abounding in mercy, and more just than any of us. Whatever he does with the
            people you love, it will not be less fair or less kind than you are capable of
            imagining right now.
          </p>
          <p>
            💡 <strong>You are allowed to trust his character even in the parts you cannot fully
            map out yet.</strong>
          </p>
          <p>In the meantime, here is what love actually looks like with the people in front of you.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🟢 Stay in the relationship. Do not let a theological disagreement become the reason you stop showing up.</li>
          <li>🟢 Be honest about what you believe without demanding they agree with you on the spot.</li>
          <li>🟢 Let your life, not just your argument, be some of the evidence.</li>
          <li>🟢 Keep praying for them by name, long after the conversation is over.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>You are not the one who has to close the gap between where they are and where God wants them to be.</p>
          <p>
            📌 <strong>You are called to be{" "}
            <ArticleLink href="/blog/salt-and-light">salt and light</ArticleLink>{" "}
            in their life, not their judge.</strong>
          </p>
          <p>That is a weight off your shoulders you were never meant to carry.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Talking About This With People You Love
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You will not out argue anyone into believing this.</p>
          <p>
            But you can carry it in a way that leaves the door open instead of slamming it. Here
            are seven ways to do that.
          </p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Ask before you answer.</strong> When someone brings this up, ask what is
            actually behind the question. Most of the time it is a specific person&apos;s face
            they are picturing, not an abstract debate about religion.
          </li>
          <li>
            <strong>Lead with the cross, not the exclusivity.</strong> The reason Jesus is the only
            way is not that God is stingy with doors. It is that he opened one at his own cost.
            Start there and the exclusivity reads very differently.
          </li>
          <li>
            <strong>Say &quot;I believe&quot; instead of &quot;you are wrong.&quot;</strong> You
            are not the one who has to convict anyone. State what you believe plainly and let the
            Holy Spirit do the rest of that work.
          </li>
          <li>
            <strong>Do not argue the same night as the hurt.</strong> If this claim just wounded
            someone you love, that is a night for listening, not for winning a point. The truth
            can wait for a calmer conversation.
          </li>
          <li>
            <strong>Keep one verse ready, not ten.</strong> You do not need a research paper.
            &quot;I am the way, the truth, and the life&quot; is enough to plant, if it is planted
            with care.
          </li>
          <li>
            <strong>Let silence do some of the work.</strong> You do not have to fill every quiet
            moment with another argument. Sometimes the most respectful thing you can do is let a
            hard truth sit without chasing it.
          </li>
          <li>
            <strong>Pray specifically, not generally.</strong> Instead of &quot;bless my
            family,&quot; pray the actual name of the person you are thinking of, by name, on
            purpose, today.
          </li>
          <li>
            <strong>Remember that this took you time too.</strong> Nobody sprints to this
            conclusion overnight. Give the person in front of you the same patience God gave you
            while you were working through your own doubts.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>None of this guarantees an outcome.</p>
          <p>It just makes sure that if the door ever does open, you were someone safe standing near it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Bible Verses About Jesus Being the Way
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These four verses are where this claim lives in Scripture. Start here.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. John 14:6</h3>
        <VerseQuote
          text="Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me."
          reference="John 14:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse the whole claim hangs on.</p>
          <p>Jesus said it to answer a direct, honest question from a scared friend named Thomas.</p>
          <p>Three claims stacked together. The way. The truth. The life. Then the line that removes any other option.</p>
          <p>If you memorize one verse from this post, memorize this one, in full.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Acts 4:12</h3>
        <VerseQuote
          text="Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved."
          reference="Acts 4:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter said this standing in front of the council that had just condemned Jesus to death.</p>
          <p>He was not repeating a slogan. He was staking his freedom on it.</p>
          <p>This verse proves the exclusivity claim did not start or end with Jesus alone. His closest followers carried it forward, at real cost to themselves.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. John 10:9</h3>
        <VerseQuote
          text="I am the door: by me if any man enter in, he shall be saved, and shall go in and out, and find pasture."
          reference="John 10:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Same claim, different picture.</p>
          <p>A door is not a suggestion. You either go through it or you do not.</p>
          <p>But notice what is on the other side of this particular door. Not a locked room. Pasture. Room to go in and out freely, and to actually find rest.</p>
          <p>The exclusive door leads somewhere good.</p>
          <p>
            A shepherd who says &quot;I am the only door&quot; is not trying to trap the sheep. He
            is the reason wolves cannot get in while the sheep are asleep.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Timothy 2:5</h3>
        <VerseQuote
          text="For there is one God, and one mediator between God and men, the man Christ Jesus;"
          reference="1 Timothy 2:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul writes this plainly, years after Jesus and Peter both said it.</p>
          <p>One God. One mediator. Not many equally valid go betweens.</p>
          <p>A mediator stands between two parties to bring them together. Scripture says there is exactly one who can stand between you and God, and he is fully human and fully able to do it.</p>
          <p>
            You do not need a priest, a ritual, or a résumé of good deeds to get an audience with
            God. You need the one mediator who already stood in the gap and stayed there.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Jesus Being the Only Way
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Jesus really the only way to God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, according to the Bible&apos;s own words, not a later addition. Jesus said it himself
          in John 14:6, and Peter repeated it in Acts 4:12 in front of the men who had Jesus
          killed. It is one of the most consistently taught claims across the entire New Testament,
          not a single verse pulled out of context.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Isn&apos;t it arrogant to say there is only one way to God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exclusivity is not the same thing as arrogance. A doctor who tells you there is only one
          real cure is not being arrogant, she is being honest. Whether this claim is arrogant
          depends on whether it is true and how it is delivered, and Jesus delivered it by dying
          for the very people it describes as lost without him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What about people who have never heard of Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This is a real and important question, and Scripture does not leave it completely
          unaddressed, though it deserves its own careful study rather than a few lines here.
          Romans speaks about what people can know of God through creation itself. What we can say
          with confidence is that the God who made this claim is also described throughout the
          Bible as perfectly just, so questions about{" "}
          <ArticleLink href="/blog/what-is-hell">what happens after death</ArticleLink>{" "}
          for those who never heard clearly can be trusted to his character, even where the full
          picture is not spelled out for us.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Are all other religions completely wrong about everything?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Other faiths often hold real moral truth, real longing for God, and real insight into
          human nature. The claim in John 14:6 is not that other religions have nothing right. It
          is a specific claim about who provides the way to the Father, and Jesus said that role
          belongs to him alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can a good person who isn&apos;t a Christian still get into heaven?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible&apos;s consistent answer is that entry to{" "}
          <ArticleLink href="/blog/what-is-heaven">heaven</ArticleLink>{" "}
          is not earned by being good enough, for anyone, Christian or not. It comes through Jesus.
          That is actually good news, because it means your unbelieving friend&apos;s hope was never
          about outperforming their neighbor, and neither was yours.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jesus actually claim to be God, or did the church add that later?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus made this claim himself, recorded in the earliest manuscripts we have of John&apos;s
          gospel, decades before any church council existed. Saying no man comes to the Father
          except through him is not a claim any mere human teacher could honestly make about
          himself. If you want the fuller case for why these texts can be trusted,{" "}
          <ArticleLink href="/blog/how-to-defend-the-bible">
            how to defend the Bible
          </ArticleLink>{" "}
          walks through it in depth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is it even loving to tell someone this?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It can be, if it is said the way Jesus said it, at cost to yourself and without
          superiority. Withholding a true cure from someone you love is not more loving than
          offering it. The delivery matters as much as the content, so slow down, listen first, and
          never use this claim to win an argument instead of loving a person.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What if my family member never believes, no matter what I say?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Then you keep loving them and keep praying, because the outcome was never actually in
          your hands. You are responsible for being honest and kind, not for closing the gap in
          someone else&apos;s heart. Some of the most faithful prayers in Scripture were prayed for
          years before they were answered.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why would a loving God only give one way to reach him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because he gave one way that actually works, at his own expense, instead of a dozen ways
          that would leave you to earn your own rescue. A parent who throws one working rope to a
          drowning child is not being stingy. He is being the only kind of loving that actually
          saves anyone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Didn&apos;t Jesus also talk about many rooms or many paths somewhere?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          People sometimes point to the &quot;many mansions&quot; Jesus mentions earlier in the
          same chapter, John 14:2, and assume it means many paths to get there. Read in context it
          means the opposite. Jesus describes many rooms prepared within his Father&apos;s house,
          then immediately explains in the very next verses, John 14:6, that there is exactly one
          way in. The room is spacious. The door is singular.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I bring this up without sounding preachy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Do not lead with the claim itself. Lead with your own story, or simply answer honestly
          when you are asked. Most people are not offended by a Christian who quietly believes
          something and lives it out with kindness. They are offended by a Christian who corners
          them with it uninvited. Let your life earn the right to be asked the question.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Jesus did not offer a way. He claimed to be the way.</strong> That claim
            only leaves you with a few honest options, and a merely good teacher does not talk
            about himself the way Jesus did.
          </p>
          <p>
            📌 <strong>Exclusive does not mean arrogant.</strong> A cure offered at the cost of the
            one offering it is not pride. It is love telling the truth.
          </p>
          <p>
            📌 <strong>You are not the judge of the people you love.</strong> You are a witness,
            called to stay in the relationship, tell the truth gently, and leave the rest to a God
            whose character you can trust even where you cannot see the whole picture.
          </p>
          <p>This claim will probably still feel heavy tonight. That is honest, and it is okay.</p>
          <p>
            You do not have to resolve every question about the people you love before you take
            your next step with God.
          </p>
          <p>So here is one next step.</p>
          <p>Say a name tonight. Just one. The person you thought of at the start of this post.</p>
          <p>Bring them to God honestly, without pretending the tension away.</p>
          <p>Ask him to give you the right words at the right time, and the patience to wait for it.</p>
          <p>He already knows their name better than you do.</p>
          <p>And he has not given up on them.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If a claim this big leaves you with more questions, you do not have to sort them out
            alone.
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
