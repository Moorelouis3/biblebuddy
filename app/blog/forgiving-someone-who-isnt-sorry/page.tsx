import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("forgiving-someone-who-isnt-sorry");

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

export default function ForgivingSomeoneWhoIsntSorryPage() {
  return (
    <BlogPostShell
      slug="forgiving-someone-who-isnt-sorry"
      title={<>📖 How Do You Forgive Someone Who Isn&apos;t Sorry?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>They are not sorry.</p>
            <p>They never said it. They never will.</p>
            <p>And you are the one still carrying it.</p>
            <p>
              📌 <strong>If you have typed how do you forgive someone who isn&apos;t sorry into a
              search bar at midnight, this guide is for you.</strong>
            </p>
            <p>Maybe it was a parent who never once said the words.</p>
            <p>Maybe it was a husband or wife who walked out and never looked back.</p>
            <p>
              Maybe it was a friend who lied about you, or a church that wounded you worse than the
              world ever did.
            </p>
            <p>Whoever it was, they are not asking to be forgiven.</p>
            <p>They are not even admitting there is anything to forgive.</p>
            <p>Maybe they have told their own version of the story so many times that they actually believe it now.</p>
            <p>And you are left standing there holding the real one.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 Just let it go.</li>
            <li>🔲 God wants you to forgive.</li>
            <li>🔲 Holding on only hurts you.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              You have probably heard all three. None of them told you what to actually do with
              someone who will never say sorry.
            </p>
            <p>Here is what might surprise you.</p>
            <p>The Bible never promises an apology before it commands forgiveness.</p>
            <p>
              Jesus forgave people who were actively killing Him. They were not sorry. They were
              dividing His clothes while He hung there.
            </p>
            <p>📖 Forgiveness in Scripture was never designed to wait on the other person.</p>
            <p>
              But forgiveness is not the only word people confuse here. So this guide is going to
              walk through four things:
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>✅ What forgiveness actually is, and what it is not</li>
            <li>✅ Why reconciliation takes two people and forgiveness only takes one</li>
            <li>✅ Why trust is rebuilt slowly, and is never owed just because you forgave</li>
            <li>✅ What to do with the anger while you wait for a sorry that may never come</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This is not going to tell you to pretend it did not happen.</p>
            <p>It is not going to tell you to walk back into danger.</p>
            <p>And it is not going to tell you that forgiving erases every consequence.</p>
            <p>Take a breath.</p>
            <p>Let&apos;s walk through what God&apos;s Word actually says.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚖️ Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You could manage this with boundaries and detachment alone.</p>
          <p>Some of that genuinely helps.</p>
          <p>But none of it answers the question actually eating at you.</p>
          <p>
            <strong>Can I let this go while they get away with it?</strong>
          </p>
          <p>That question is not only about them. It is a question about God.</p>
          <p>
            ⚠️ <strong>Unforgiveness is often a quiet disagreement with God about justice.</strong>
          </p>
          <p>
            Somewhere underneath the hurt is a belief that you have to hold the debt, because if you
            let go, nobody will ever collect it.
          </p>
          <p>That belief puts you on a seat that belongs to God alone.</p>
          <p>
            And it is exhausting work. Nobody was built to run their own court, keep their own
            ledger, and sentence someone else all at the same time.
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>❓ Does God actually see what they did?</li>
          <li>❓ Will He really deal with it if I let go?</li>
          <li>❓ Can He be trusted with the one thing I refuse to put down?</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus did not just teach forgiveness. He tied it to how you relate to God Himself.</p>
          <p>Carry the debt yourself, and you are quietly standing where only God belongs.</p>
          <p>
            📌 <strong>The stakes here are not whether they ever apologize. The stakes are whether
            you trust God enough to hand Him the case.</strong>
          </p>
          <p>That is what the rest of this guide is about.</p>
          <p>Not talking you out of the hurt. Showing you where it was always meant to go.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Says About Forgiving Someone Who Isn&apos;t Sorry
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Forgiveness, Reconciliation, and Trust Are Not the Same Thing
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Most of the confusion starts right here.</p>
          <p>People use one word, forgiveness, to mean three completely different things.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>
            📌 <strong>Forgiveness</strong> is a decision you make before God to release the debt.
          </li>
          <li>
            📌 <strong>Reconciliation</strong> is the relationship being restored.
          </li>
          <li>
            📌 <strong>Trust</strong> is confidence that it will not happen again.
          </li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forgiveness is commanded. You are told to do it no matter what they do next.</p>
          <p>Reconciliation takes two people willing to show up honestly. Paul writes it carefully:</p>
        </div>
        <VerseQuote
          text="If it be possible, as much as lieth in you, live peaceably with all men."
          reference="Romans 12:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the qualifier. <strong>If it be possible.</strong> Paul does not say it is always
            possible.
          </p>
          <p>Peace with someone who refuses to admit any wrong is often not possible, no matter how much you forgive.</p>
          <p>That is not your failure. That is theirs.</p>
          <p>
            Trust is a separate thing again. It is rebuilt by a pattern of changed behavior over time,
            and it is never owed just because you forgave.
          </p>
          <p>
            💡 You can fully forgive someone and still not hand them your heart, your children, or
            your trust again.
          </p>
          <p>Forgiveness releases the debt. It does not reissue the credit.</p>
          <p>And words alone do not reissue it either.</p>
          <p>
            David spared Saul&apos;s life in a cave when he could have ended it with one strike.
            Saul&apos;s response sounded exactly like repentance.
          </p>
        </div>
        <VerseQuote
          text="And he said to David, Thou art more righteous than I: for thou hast rewarded me good, whereas I have rewarded thee evil."
          reference="1 Samuel 24:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Weeping. A confession. Even a blessing on David&apos;s future.</p>
          <p>It did not last.</p>
        </div>
        <VerseQuote
          text="Then Saul arose, and went down to the wilderness of Ziph, having three thousand chosen men of Israel with him, to seek David in the wilderness of Ziph."
          reference="1 Samuel 26:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two chapters later, Saul was hunting him again with an army.</p>
          <p>
            📌 <strong>Words that sound like sorry are not the same as a changed direction.</strong>
          </p>
          <p>
            David still did not take revenge when he had the chance a second time. He forgave again.
            But he also never handed Saul his sword, his army, or his back.
          </p>
          <p>That is what trust separate from forgiveness actually looks like, lived out by a real king.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Forgiveness Is Commanded, Whether They Say Sorry or Not
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter once asked Jesus how many times he had to forgive the same person.</p>
          <p>He thought seven sounded generous.</p>
        </div>
        <VerseQuote
          text="Then came Peter to him, and said, Lord, how oft shall my brother sin against me, and I forgive him? till seven times?"
          reference="Matthew 18:21"
        />
        <VerseQuote
          text="Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven."
          reference="Matthew 18:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Seventy times seven is four hundred and ninety.</p>
          <p>Jesus was not handing Peter a number to count to. He was telling him to stop counting.</p>
          <p>
            📌 <strong>Nowhere in that answer does Jesus say, until they apologize.</strong>
          </p>
          <p>Paul gives the same command with no condition attached at all.</p>
        </div>
        <VerseQuote
          text="Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye."
          reference="Colossians 3:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Even as Christ forgave you.</p>
          <p>❓ Were you sorry the moment He forgave you?</p>
          <p>Most believers were forgiven long before they ever got sorry right. Grace moved first, and the sorrow came after, not the other way around.</p>
          <p>And the clearest picture of all happened on a Friday afternoon outside Jerusalem.</p>
        </div>
        <VerseQuote
          text="Then said Jesus, Father, forgive them; for they know not what they do. And they parted his raiment, and cast lots."
          reference="Luke 23:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The men under that cross were not sorry.</p>
          <p>They were dividing His robe while He bled.</p>
          <p>
            ⚠️ <strong>Jesus forgave people who were actively hurting Him and showed no sign of
            remorse at all.</strong>
          </p>
          <p>If anyone ever had the right to wait for an apology first, it was Him.</p>
          <p>He did not wait.</p>
          <p>
            That is your model. Not a feeling you are waiting to arrive. A decision you make while
            the wound is still open.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Forgiving Does Not Mean Pretending It Did Not Happen
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joseph is the clearest example in Scripture of forgiving people who were never going to
            apologize well.
          </p>
          <p>
            His brothers sold him into slavery as a teenager, and{" "}
            <ArticleLink href="/blog/who-was-joseph">years of prison and slavery</ArticleLink> followed
            long before Joseph ever sat in a palace.
          </p>
          <p>Decades later, with total power over them, Joseph did not pretend none of it happened.</p>
        </div>
        <VerseQuote
          text="And Joseph said unto them, Fear not: for am I in the place of God?"
          reference="Genesis 50:19"
        />
        <VerseQuote
          text="But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."
          reference="Genesis 50:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that middle line again.</p>
          <p>
            <strong>Ye thought evil against me.</strong>
          </p>
          <p>Joseph named the evil out loud. He did not call it a misunderstanding.</p>
          <p>
            📌 <strong>Forgiveness does not require you to rewrite what happened into something
            smaller.</strong>
          </p>
          <p>
            You can say plainly, you hurt me, and still forgive. Minimizing the wound does not heal
            it. It just buries it somewhere it will leak out later.
          </p>
          <p>Joseph forgave with his eyes wide open to exactly what they did.</p>
          <p>That is the pattern. Not blindness. Clear sight, released anyway.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Forgiving Does Not Mean Staying in Danger
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Somewhere along the way, forgiveness got mixed up with staying.</p>
          <p>Staying in the same house. Staying on the same payroll. Staying at the same table every holiday.</p>
          <p>Scripture never makes that trade.</p>
          <p>Jesus forgave people constantly. He also removed Himself from danger without apology.</p>
        </div>
        <VerseQuote
          text="And rose up, and thrust him out of the city, and led him unto the brow of the hill whereon their city was built, that they might cast him down headlong."
          reference="Luke 4:29"
        />
        <VerseQuote text="But he passing through the midst of them went his way," reference="Luke 4:30" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He did not stay to prove He had forgiven them.</p>
          <p>He walked away.</p>
          <p>
            ⚠️ <strong>Forgiving a person and staying near their fists or their bottle does not make
            you more spiritual. It makes you less safe.</strong>
          </p>
          <p>Jesus even gave His own followers permission to leave a dangerous place.</p>
        </div>
        <VerseQuote
          text="But when they persecute you in this city, flee ye into another: for verily I say unto you, Ye shall not have gone over the cities of Israel, till the Son of man be come."
          reference="Matthew 10:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Flee. That is the word He used. Not endure. Flee.</p>
          <p>
            📌 <strong>You can release someone from the debt they owe you and still lock the
            door.</strong>
          </p>
          <p>A forgiving heart and a wise boundary live in the same person at the same time.</p>
          <p>
            ⚠️ If someone has ever told you that true forgiveness means letting them back into your
            home, your phone, or your children&apos;s lives no matter what, that is not a biblical
            requirement. It is a dangerous rule someone invented and dressed up as Scripture.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Forgiving Does Not Mean Dropping Every Consequence
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forgiveness answers what you carry in your heart.</p>
          <p>It does not answer what happens next in the courtroom, the workplace, or the family.</p>
          <p>Those are two different questions, and Scripture keeps them separate.</p>
        </div>
        <VerseQuote
          text="Dearly beloved, avenge not yourselves, but rather give place unto wrath: for it is written, Vengeance is mine; I will repay, saith the Lord."
          reference="Romans 12:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what is being handed over. Not the facts. Not the consequences. The vengeance.</p>
          <p>
            📌 <strong>You give up the right to personally punish them. You do not give up the right
            to call the police, remove them from your will, or decline to leave your children in
            their care.</strong>
          </p>
          <p>
            Scripture does not treat every wrong as weightless just because it is forgiven.{" "}
            <ArticleLink href="/blog/are-all-sins-equal">
              Sin separates people from God equally
            </ArticleLink>
            , but the Bible still grades consequence here on earth. A thief still returned what he
            took under the law. Forgiveness and consequence were never enemies in Scripture.
          </p>
          <p>
            Joseph forgave his brothers completely and still tested them before he revealed himself
            fully. He let a real change show itself before he handed them his whole trust.
          </p>
          <p>That was wisdom, not unforgiveness.</p>
          <p>
            If the wrong against you was criminal, reporting it is not a lack of forgiveness either.
            David handed his own son Absalom&apos;s rebellion to God, but he still sent an army to
            stop it. Love for the person and allowing real consequences were never opposites in
            Scripture.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. What to Do With the Anger While You Are Still Waiting
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A sorry that never comes does not mean the anger has nowhere to go.</p>
          <p>It has somewhere to go. Scripture is specific about where.</p>
        </div>
        <VerseQuote
          text="And when ye stand praying, forgive, if ye have ought against any: that your Father also which is in heaven may forgive you your trespasses."
          reference="Mark 11:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus ties your own forgiveness to this moment, right in the middle of prayer.</p>
          <p>Not after the anger is gone. In the middle of still feeling it.</p>
          <p>Paul names the exact list that needs to go, right next to the command to forgive.</p>
        </div>
        <VerseQuote
          text="Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice:"
          reference="Ephesians 4:31"
        />
        <VerseQuote
          text="And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you."
          reference="Ephesians 4:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Bitterness, wrath, anger, loud arguing, cutting words, malice.</p>
          <p>Paul lists them together because they feed each other. Rehearsing the offense in your head keeps every one of them alive.</p>
          <p>Proverbs says something that sounds almost too simple to be a real strategy.</p>
        </div>
        <VerseQuote
          text="The discretion of a man deferreth his anger; and it is his glory to pass over a transgression."
          reference="Proverbs 19:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Passing over does not mean pretending, which the earlier section already ruled out. It
            means refusing to let the offense set up permanent residence in your mind.
          </p>
          <p>
            💡 <strong>You are not waiting for them to feel sorry before you can heal. You are
            choosing, today, what you will do with the anger while you wait on God with the
            rest.</strong>
          </p>
          <p>
            Some days that choosing will be easy. Other days you will have to make the same decision
            before breakfast and again before bed. Both days count.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Forgiving an Unrepentant Person Still Changes You, Even If It Never Changes Them
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter watched Jesus get mocked, beaten, and nailed up by men who never once said sorry.</p>
          <p>And he wrote down exactly what Jesus did with it.</p>
        </div>
        <VerseQuote
          text="Who, when he was reviled, reviled not again; when he suffered, he threatened not; but committed himself to him that judgeth righteously:"
          reference="1 Peter 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Committed Himself. That is the move.</p>
          <p>
            Not committed the situation to being fixed. Committed Himself, and the whole unresolved
            weight of it, to a Judge who actually sees everything.
          </p>
          <p>
            📌 <strong>You are not asked to deliver justice. You are asked to hand the case to the
            only Judge qualified to rule on it.</strong>
          </p>
          <p>Proverbs even describes what that handoff can look like in the middle of an ongoing relationship.</p>
        </div>
        <VerseQuote
          text="If thine enemy be hungry, give him bread to eat; and if he be thirsty, give him water to drink:"
          reference="Proverbs 25:21"
        />
        <VerseQuote
          text="For thou shalt heap coals of fire upon his head, and the LORD shall reward thee."
          reference="Proverbs 25:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Heaping coals here is not a secret way of cursing them. It is an old picture of
            conviction, the kind of warmth kindness alone can bring to someone who has no excuse
            left.
          </p>
          <p>Either way, notice who collects the reward. You do. The LORD shall reward thee.</p>
          <p>They may never say the words you are waiting on.</p>
          <p>
            ⚠️ <strong>If your healing depends on their apology, you have handed them one more thing
            to control.</strong>
          </p>
          <p>
            Forgiving someone who stays silent does not make what they did acceptable. It makes you
            free of carrying it on top of everything else they already took.
          </p>
          <p>
            Picture the actual math of it. They did the wrong once. Every day you refuse to put it
            down, you are doing the damage to yourself all over again, for free, while they are not
            even thinking about it.
          </p>
          <p>Stop paying a debt they never asked you to collect in the first place.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: How to Forgive Someone Who Isn&apos;t Sorry
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forgiving someone who never apologizes is rarely a single decision made once.</p>
          <p>It is usually a decision made again every time the memory resurfaces.</p>
          <p>Here are seven ways to make that decision stick.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Name what actually happened, out loud or on paper.</strong> Do not round it down
            to keep the peace. Write the real sentence: this person did this to me. Clarity about
            the wound is not bitterness. It is honesty, and Joseph modeled it first.
          </li>
          <li>
            <strong>Separate the three words before you decide anything.</strong> Ask which one you
            are actually being asked to do right now. Forgiveness, yes, always. Reconciliation and
            trust, only if it is wise and safe.
          </li>
          <li>
            <strong>Pray the anger instead of swallowing it.</strong> God can handle an honest prayer
            that starts with I am furious. If you do not know where to start,{" "}
            <ArticleLink href="/blog/how-to-pray-when-you-dont-know-what-to-say">
              a simple pattern for prayer
            </ArticleLink>{" "}
            can give you the words when you have none.
          </li>
          <li>
            <strong>Give the vengeance away on purpose.</strong> Say it plainly to God: this is Yours
            to repay, not mine. You may have to say it again tomorrow. Say it again.
          </li>
          <li>
            <strong>Put a real boundary around the danger, not around your heart.</strong> You can
            close a door to someone and still have forgiven them completely. One protects you. The
            other protects your obedience.
          </li>
          <li>
            <strong>Stop rehearsing the scene before bed.</strong> Every replay feeds the bitterness
            Paul told you to put away. Interrupt it with a verse instead, even if you have to say it
            out loud five nights in a row.
          </li>
          <li>
            <strong>Tell one trusted person the whole story.</strong> Carrying it alone makes it
            heavier, and silence makes it look bigger than it is. A wise friend keeps you honest
            about what forgiveness does and does not require.
          </li>
          <li>
            <strong>Let your healing stop depending on their apology.</strong> Decide today that your
            freedom does not need their signature on it. Then live like that is already true.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>You will not master all eight this week.</p>
          <p>Pick two. Start there.</p>
          <p>
            Notice what is missing from this list. There is no step that says wait for them to
            change first. Every single one of these is something you can do today, with or without
            their cooperation.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Forgiving Someone Who Isn&apos;t Sorry
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You could fill pages with what Scripture says about forgiveness.</p>
          <p>But if you only have room for five tonight, start here.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Matthew 18:21 and 22</h3>
        <VerseQuote
          text="Then came Peter to him, and said, Lord, how oft shall my brother sin against me, and I forgive him? till seven times?"
          reference="Matthew 18:21"
        />
        <VerseQuote
          text="Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven."
          reference="Matthew 18:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter thought he was being generous at seven.</p>
          <p>
            Jesus answered with a number nobody could actually count in the moment, four hundred and
            ninety, and that was the whole point.
          </p>
          <p>He was not handing Peter a ceiling. He was removing the ceiling entirely.</p>
          <p>
            Notice what is missing from the exchange. No condition about the brother being sorry.
            Just the command to keep forgiving.
          </p>
          <p>
            If you are keeping score of how many times you have forgiven the same offense, this verse
            is telling you to put the scorecard down.
          </p>
          <p>This is the verse for the person who thinks they have used up their patience already.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Colossians 3:13</h3>
        <VerseQuote
          text="Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye."
          reference="Colossians 3:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse to read when you feel like you are owed an explanation first.</p>
          <p>Paul does not say forgive once they explain themselves. He says forgive even as Christ forgave you.</p>
          <p>
            Think about how you were forgiven. Not after a perfect apology. While you were still
            working out what you had even done.
          </p>
          <p>The standard is not their behavior. The standard is Christ&apos;s.</p>
          <p>
            That takes the pressure off you to decide whether their sorry was good enough. You are
            not grading an apology. You are simply obeying a command already given.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Luke 23:34</h3>
        <VerseQuote
          text="Then said Jesus, Father, forgive them; for they know not what they do. And they parted his raiment, and cast lots."
          reference="Luke 23:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read where this sits. Jesus says it from the cross, while the nails are still in His hands.</p>
          <p>The men below Him were dividing His clothes in the same breath.</p>
          <p>No remorse anywhere in that scene. Jesus forgave anyway, out loud, before the debt was ever acknowledged.</p>
          <p>
            This is the verse for the moment you think, but they do not even know what they did to
            me. Neither did the men at the foot of that cross.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Romans 12:19</h3>
        <VerseQuote
          text="Dearly beloved, avenge not yourselves, but rather give place unto wrath: for it is written, Vengeance is mine; I will repay, saith the Lord."
          reference="Romans 12:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse for the fantasy you keep replaying where they finally get what is coming to them.</p>
          <p>Paul does not say the desire for justice is wrong. He says whose job it is.</p>
          <p>Vengeance is mine, saith the Lord. Not never happens. Mine.</p>
          <p>
            Handing it to Him is not weakness. It is the only way to actually put it down instead of
            carrying it disguised as patience.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Peter 2:23</h3>
        <VerseQuote
          text="Who, when he was reviled, reviled not again; when he suffered, he threatened not; but committed himself to him that judgeth righteously:"
          reference="1 Peter 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the verse for the person who has stayed quiet and wonders if that silence means they are weak.</p>
          <p>Jesus was reviled and did not revile back. He suffered and did not threaten.</p>
          <p>But He was not passive. He committed Himself to a righteous Judge.</p>
          <p>
            That is the move available to you tonight. Not silence that pretends nothing happened. A
            deliberate handoff to the only One qualified to judge it rightly.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Forgiving Someone Who Isn&apos;t Sorry
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do I have to forgive someone who never says sorry?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Scripture never makes forgiveness conditional on an apology. Jesus forgave the men
          crucifying Him while they were still mocking Him, and Colossians 3:13 commands forgiveness
          even as Christ forgave you, not as soon as they apologize. Waiting on their sorry hands them
          control over your obedience to God. You can forgive the moment you choose to, whether the
          apology ever comes or not. Many Christians wait years for a sorry that God never actually
          made the condition.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between forgiveness and reconciliation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Forgiveness is a decision you make alone, before God, to release what someone owes you.
          Reconciliation is a restored relationship, and it takes two honest people to rebuild it.
          You can fully forgive someone who refuses to reconcile. Romans 12:18 even says to live
          peaceably if it be possible, which quietly admits that sometimes it is not. A one sided
          forgiveness that God accepts is still a complete forgiveness, even without the
          reconciliation most people picture when they hear the word.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does forgiving someone mean I have to trust them again?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Trust is earned back slowly through a real pattern of changed behavior, and Scripture
          never ties it to forgiveness. Joseph forgave his brothers completely and still tested their
          honesty before he gave them his full trust. Forgiving releases the debt. It does not hand
          back the keys automatically, and nobody in Scripture was ever commanded to pretend it
          does.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can I forgive someone and still never speak to them again?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Jesus forgave people constantly and still physically removed Himself from danger,
          walking away from a crowd that wanted Him dead in Luke 4. He even told His followers to flee
          a city rather than stay and absorb harm. Distance is sometimes the wisest form of love you
          can offer both of you, and silence toward a person does not cancel the forgiveness you
          already settled with God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What if the anger comes back after I thought I had already forgiven them?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Then forgive it again. For a deep wound, forgiveness is rarely one transaction finished
          forever; it is usually a decision made again every time the memory resurfaces. If the
          thoughts turn into constant racing worry rather than simple anger,{" "}
          <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">
            what the Bible says about anxious thoughts
          </ArticleLink>{" "}
          is worth reading too, since the two often travel together. Returning anger is not proof
          you failed. It is proof you are human.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do I have to confront someone before I can forgive them?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Forgiveness happens in your heart before God and does not require the other
          person&apos;s presence, agreement, or even awareness. Confrontation can be wise in some situations and
          unsafe in others, so Scripture leaves that choice to wisdom rather than making it a
          requirement. You are free to forgive someone you will never confront and never see again,
          and a private decision before God needs no audience to be real.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What if they are already dead, or I will never see them again?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          You can still forgive them. Since forgiveness is a transaction between you and God about
          the debt in your own heart, the other person&apos;s presence was never required to begin
          with.
          Many people carry decades of resentment toward someone long gone. Bringing that debt to God
          and releasing it still works, even when there is no one left to tell, and it can still
          lift a weight you have carried since long before they died.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does forgiving someone mean what they did was okay?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Joseph told his brothers plainly, ye thought evil against me, in the same breath he
          forgave them. Naming the wrong honestly and releasing the debt are not opposites; Scripture
          does both at once. Forgiveness never requires you to relabel evil as acceptable.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it actually look like if the other person does repent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Real{" "}
          <ArticleLink href="/blog/what-is-repentance">repentance</ArticleLink> is more than the word
          sorry. It shows up as a changed direction, honest ownership without excuses, and a
          willingness to live differently going forward. If that ever happens, it opens the door to
          reconciliation and, slowly, to rebuilt trust. But none of that is required before
          forgiveness. Forgiveness can and should start long before repentance ever shows up, if it
          shows up at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do I know if I have actually forgiven someone?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          You will probably know you are getting there when their name stops running your mood, when
          you can pray for them without gritting your teeth, and when you no longer need them to
          suffer for you to feel okay. It rarely arrives all at once. Keep choosing it the next time
          the memory surfaces, and trust that God counts the choosing, not just the finished feeling.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Forgiveness, reconciliation, and trust are three different things.</strong>{" "}
            You are only commanded to do the first one. The other two depend on them, and on wisdom,
            not on you alone.
          </p>
          <p>
            📌 <strong>Forgiving someone does not mean pretending, staying in danger, or dropping
            every consequence.</strong> Joseph named the evil plainly and still forgave. Jesus
            forgave and still walked away from danger.
          </p>
          <p>
            📌 <strong>Forgiveness was never designed to wait on their sorry.</strong> Jesus forgave
            people who were actively killing Him and never once got an apology.
          </p>
          <p>They may never say the words you have been waiting to hear.</p>
          <p>That sentence used to be the whole problem. It does not have to be anymore.</p>
          <p>
            You already know{" "}
            <ArticleLink href="/blog/can-god-forgive-what-ive-done">
              how completely God forgives
            </ArticleLink>{" "}
            the people who ask Him. Let that same mercy move through you toward the one person who
            never will.
          </p>
          <p>Pick one verse from this guide tonight.</p>
          <p>Pray it honestly, with the name of the person still attached.</p>
          <p>Say exactly what they did. Do not soften it for God&apos;s sake. He already knows.</p>
          <p>Then hand Him the part that was never yours to carry.</p>
          <p>He is not waiting for them to say sorry before He helps you put it down.</p>
          <p>Neither should you.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
