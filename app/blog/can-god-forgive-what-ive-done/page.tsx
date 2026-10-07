import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("can-god-forgive-what-ive-done");

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

export default function CanGodForgiveWhatIveDonePage() {
  return (
    <BlogPostShell
      slug="can-god-forgive-what-ive-done"
      title={<>📖 Can God Forgive What I&apos;ve Done?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have never said it out loud. Not to anyone.</p>
            <p>Maybe you have typed &quot;can God forgive me&quot; into your phone at midnight and closed the app before you could see an answer.</p>
            <p>
              📌 <strong>So here it is, right now, before anything else: yes. God can forgive what you have done. All of it.</strong>
            </p>
            <p>Not a softened version of it. Not the parts that are easy to admit.</p>
            <p>The actual thing. The one you replay. The one you have never told a single person.</p>
            <p>
              You are not reading this because you are curious about theology. You are reading this because something you did, or something that happened to you and you still carry like guilt, will not let go of your chest.
            </p>
            <p>This guide is not going to circle that question for ten paragraphs before answering it.</p>
            <p>The answer is yes. The rest of this is about making that answer believable.</p>
            <p>
              Because a man who approved of murder wrote half the New Testament. A king who took another man&apos;s wife wrote some of the most honest worship songs ever sung. A disciple who denied even knowing Jesus became the rock the church was built on. And a criminal with nothing left but a few final breaths walked straight into paradise.
            </p>
            <p>If God forgave them, this guide is going to show you exactly why He can forgive you too.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not a side question you can leave unanswered and still walk closely with God.</p>
          <p>
            ⚠️ <strong>An unresolved fear that you are too far gone will quietly run your whole spiritual life.</strong>
          </p>
          <p>It will keep you out of prayer, because you do not feel clean enough to show up.</p>
          <p>It will keep you quiet in church, because you assume everyone else has a smaller secret than yours.</p>
          <p>It will have you earning, performing, and proving, instead of simply receiving.</p>
          <p>And none of that is what Jesus died to give you.</p>
          <p>
            Learning{" "}
            <ArticleLink href="/blog/what-is-sin">what sin actually is</ArticleLink>{" "}
            matters here, because sin was never first a rule you broke. It is a relationship that got broken. And a broken relationship is exactly the kind of thing God specializes in putting back together.
          </p>
          <p>The stakes are not whether you feel better tonight.</p>
          <p>
            📌 <strong>The stakes are whether you spend the rest of your life hiding from God, or finally walking toward Him.</strong>
          </p>
          <p>
            And there is a second thing at stake, just as real. If you cannot believe God has forgiven you, it gets much harder to believe He could ever forgive anyone else. Mercy you have not received yourself is very hard to hand to another person.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Says About Forgiving What You Have Done
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Paul Held the Coats at a Stoning, Then Wrote Half the New Testament
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before he was Paul, he was Saul.</p>
          <p>And Saul did not just disagree with Christians. He hunted them.</p>
          <p>He stood there while a mob stoned a man named Stephen to death for his faith, and he held the coats.</p>
        </div>
        <VerseQuote
          text="And cast him out of the city, and stoned him: and the witnesses laid down their clothes at a young man's feet, whose name was Saul."
          reference="Acts 7:58"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He approved of that killing. Then he went looking for more.</p>
        </div>
        <VerseQuote
          text="As for Saul, he made havock of the church, entering into every house, and haling men and women committed them to prison."
          reference="Acts 8:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is not a man with a rough past. That is a man with blood on his hands.</p>
          <p>
            And that same man, years later, called himself this:
          </p>
        </div>
        <VerseQuote
          text="This is a faithful saying, and worthy of all acceptation, that Christ Jesus came into the world to save sinners; of whom I am chief."
          reference="1 Timothy 1:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Of whom I am chief. He never pretended it did not happen. He never minimized it.</p>
          <p>
            And God did not just forgive him quietly and tuck him in a corner. He used him to write{" "}
            <ArticleLink href="/blog/paul">more of the New Testament than anyone else</ArticleLink>.
          </p>
          <p>
            💡 <strong>God did not forgive Paul around his worst chapter. God built Paul&apos;s whole calling on the other side of it.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. David Did Not Get Away With It, and Was Still Forgiven
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David took another man&apos;s wife, then had the man killed to cover it up.</p>
          <p>
            That is adultery and murder, arranged by a king who had every resource to hide it. He almost did.
          </p>
          <p>When the prophet Nathan finally confronted him, David did not argue, and he did not explain himself.</p>
        </div>
        <VerseQuote
          text="And David said unto Nathan, I have sinned against the LORD. And Nathan said unto David, The LORD also hath put away thy sin; thou shalt not die."
          reference="2 Samuel 12:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what did not happen there. David did not do penance for years to earn that sentence.</p>
          <p>He said five words. I have sinned against the LORD. And forgiveness was already there to meet him.</p>
          <p>
            That does not mean nothing else happened.{" "}
            <ArticleLink href="/blog/who-was-bathsheba">The consequences in that family were real and heavy</ArticleLink>, and David lived with grief he brought on himself. Forgiveness and consequence are not the same conversation.
          </p>
          <p>But listen to what David wrote afterward, not before:</p>
        </div>
        <VerseQuote
          text="Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions."
          reference="Psalm 51:1"
        />
        <VerseQuote
          text="Wash me throughly from mine iniquity, and cleanse me from my sin."
          reference="Psalm 51:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A man after God&apos;s own heart is not a man who never sinned. He is a man who knew exactly where to run when he did.</strong>
          </p>
          <p>Psalm 51 is in your Bible on purpose. God did not bury David&apos;s worst moment. He let David turn it into a prayer every honest person since has prayed.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Peter Denied Even Knowing Jesus, Three Times, in One Night
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter had spent three years beside Jesus. He had watched the miracles. He had said, just hours earlier, that he would die before he denied his Lord.</p>
          <p>Then the pressure got real, and three separate times, he said he did not even know the man.</p>
        </div>
        <VerseQuote
          text="And the Lord turned, and looked upon Peter. And Peter remembered the word of the Lord, how he had said unto him, Before the cock crow, thou shalt deny me thrice."
          reference="Luke 22:61"
        />
        <VerseQuote text="And Peter went out, and wept bitterly." reference="Luke 22:62" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is not a small stumble. That is denying your own friend, right when He needed you, out of pure fear for yourself.</p>
          <p>And Jesus did not quietly write Peter off.</p>
          <p>He came looking for him after the resurrection. He restored him, by name, on a beach, over breakfast He had cooked Himself.</p>
          <p>
            📌 <strong>The man who denied Jesus three times became the man who preached the first sermon of the church and never stopped.</strong>
          </p>
          <p>Look at exactly how Jesus restored him, because the detail matters.</p>
        </div>
        <VerseQuote
          text="He saith unto him the third time, Simon, son of Jonas, lovest thou me? Peter was grieved because he said unto him the third time, Lovest thou me? And he said unto him, Lord, thou knowest all things; thou knowest that I love thee. Jesus saith unto him, Feed my sheep."
          reference="John 21:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three denials at a fire in the dark. Three questions at a breakfast in the daylight.</p>
          <p>Jesus did not skip the number. He matched it, on purpose, so Peter could hear forgiveness exactly where he had failed.</p>
          <p>⚠️ Failure under pressure is not proof you were never really His. It is the exact place Jesus keeps coming to find His own.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Thief on the Cross Had Nothing Left to Offer But a Dying Breath
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two criminals died on crosses next to Jesus. Scripture does not soften what they were. They were being executed for real crimes.</p>
          <p>One of them, with his life nearly over, turned toward Jesus with nothing left to bargain with.</p>
        </div>
        <VerseQuote text="And he said unto Jesus, Lord, remember me when thou comest into thy kingdom." reference="Luke 23:42" />
        <VerseQuote
          text="And Jesus said unto him, Verily I say unto thee, To day shalt thou be with me in paradise."
          reference="Luke 23:43"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He never got up and lived a changed life. He never made amends. He could not. He had hours left, and he spent them turning toward Jesus instead of away.</p>
          <p>
            📌 <strong>That is the clearest proof in all of Scripture that forgiveness was never about what you can still accomplish.</strong>
          </p>
          <p>If a dying criminal with no time left to prove anything could hear &quot;today you will be with me,&quot; then whatever you think you have to clean up first is not actually a requirement God set.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. What 1 John 1:9 Actually Promises You</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the verse to actually hold onto, because it is a promise, not a hope.</p>
        </div>
        <VerseQuote
          text="If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
          reference="1 John 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read the two words that describe God there. Faithful. Just.</p>
          <p>Not emotional. Not reluctant. Not deciding case by case whether your particular sin qualifies.</p>
          <p>
            📌 <strong>Faithful means He keeps His word every single time, not just on your good days.</strong>
          </p>
          <p>And just means something even bigger. It means forgiving you is not God bending the rules out of pity.</p>
          <p>
            It is just because Jesus already paid for exactly what you confessed. The debt was not forgiven. It was already settled at the cross, which is why God can be both perfectly fair and completely merciful toward you in the same breath.
          </p>
          <p>All sin requires is honesty. Not a performance. Not years of proving yourself first. Confess it, and He forgives it. That is the whole transaction, every time.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. &quot;But Mine Is Different&quot; Is the Lie, Not the Exception</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Almost everyone reading this has quietly decided their situation is the exception to everything above.</p>
          <p>Maybe you think it is too recent. Too repeated. Too ugly to say out loud, even to God.</p>
          <p>
            Here is the honest answer. There is no sin described anywhere in Scripture as too large for the cross, and there is no verse that puts yours in a separate, hopeless category.
          </p>
          <p>The only sin Jesus ever called unforgivable was a final, hardened refusal to want forgiveness at all, which is the opposite of what you are doing right now by reading this.</p>
          <p>
            If you are still worried about losing what God already gave you, that fear itself is worth examining honestly, which is exactly what{" "}
            <ArticleLink href="/blog/can-you-lose-your-salvation">this question about losing your salvation</ArticleLink>{" "}
            walks through.
          </p>
          <p>Listen again to what God says through the prophet Isaiah, not about a minor offense, but about sin He calls scarlet and crimson.</p>
        </div>
        <VerseQuote
          text="Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool."
          reference="Isaiah 1:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scarlet and crimson are not pastel colors. God named the deepest stain on purpose, so you could not say your case was worse than the one He already addressed.</p>
          <p>
            The lie always sounds personal, like God made an exception just for you. But it is actually the oldest lie there is, the same one the enemy has whispered to every guilty person since the garden. You are not different because your sin is worse. You are only convinced of something that was never true to begin with.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. Guilt That Leads You Home, and Shame That Keeps You Hiding</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>There is a difference here that changes everything, and almost nobody explains it clearly.</p>
          <p>
            💡 <strong>Guilt says, I did something wrong. Shame says, I am something wrong.</strong>
          </p>
          <p>Guilt is useful. It is the Holy Spirit tapping you on the shoulder, and it is meant to move you toward confession and then straight into relief.</p>
          <p>Shame is not from God. It does not move you toward Him. It moves you away, into silence, into hiding, into pretending.</p>
          <p>
            Remember the first people who ever sinned. They did not run toward God with an honest confession. They hid in the trees. Shame always hides. Guilt, handled honestly, always comes out of hiding and tells the truth.
          </p>
          <p>
            If God already feels distant to you because of what you did, that distance is worth naming too, and{" "}
            <ArticleLink href="/blog/why-does-god-feel-silent">this look at why God can feel silent</ArticleLink>{" "}
            walks through exactly that.
          </p>
          <p>
            Once sin is confessed, any shame left over is not conviction anymore. It is an accusation with nothing true left to stand on, because the debt it is pointing at has already been paid.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: What to Actually Do With This Tonight
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Knowing the answer is yes does not automatically make it feel true.</p>
          <p>Here are eight things you can actually do with what you just read.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Say the actual thing to God tonight, by name.</strong> Not a vague &quot;forgive my sins.&quot; Name the specific thing you have been carrying. Vague prayers leave vague peace.
          </li>
          <li>
            <strong>Stop rehearsing it and start reciting the promise.</strong> Every time the memory loops, interrupt it on purpose with 1 John 1:9, out loud if you have to.
          </li>
          <li>
            <strong>Tell one trusted believer, not everyone.</strong> Hidden things grow heavier. A spoken confession to one safe person often breaks shame&apos;s grip faster than a hundred private prayers.
          </li>
          <li>
            <strong>Read Psalm 51 when the shame comes back.</strong> Let David&apos;s own words become yours. He already wrote the prayer for exactly this moment.
          </li>
          <li>
            <strong>Let any real consequences run their course without confusing them for unforgiveness.</strong> David still grieved. Forgiveness does not always erase every earthly result.
          </li>
          <li>
            <strong>Stop asking God to forgive the same thing over and over.</strong> If you already confessed it honestly, treat it as settled. Asking again and again is arguing with a promise He already kept.
          </li>
          <li>
            <strong>Separate the voice that convicts from the voice that condemns.</strong> One points you to God. The other just makes you feel worse with nowhere to go. Learn to tell them apart.
          </li>
          <li>
            <strong>Get real help if the guilt will not lift.</strong> A pastor or a counselor can walk with you through something you were never meant to carry alone, and that is wisdom, not weak faith.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses on &quot;Can God Forgive Me&quot;
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 John 1:9</h3>
        <VerseQuote
          text="If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
          reference="1 John 1:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the clearest promise in Scripture about exactly your question. Confession, not performance, is the condition. Forgiveness and cleansing are the result, every single time it is honestly done.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Isaiah 1:18</h3>
        <VerseQuote
          text="Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow; though they be red like crimson, they shall be as wool."
          reference="Isaiah 1:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God invites you to reason with Him, not to flee from Him. He names the worst color He can think of, scarlet, and promises it can become as white as snow.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Romans 5:8</h3>
        <VerseQuote
          text="But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us."
          reference="Romans 5:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice the timing. Not after you cleaned yourself up. While you were still a sinner. The cross was not a reward for getting better. It was the proof that God moved first, before you ever could.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Micah 7:19</h3>
        <VerseQuote
          text="He will turn again, he will have compassion upon us; he will subdue our iniquities; and thou wilt cast all their sins into the depths of the sea."
          reference="Micah 7:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not buried where you can still dig it up. Cast into the depths of the sea. God does not forgive you and keep the file open in case He needs it later.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Samuel 12:13</h3>
        <VerseQuote
          text="And David said unto Nathan, I have sinned against the LORD. And Nathan said unto David, The LORD also hath put away thy sin; thou shalt not die."
          reference="2 Samuel 12:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Five honest words from David, and an immediate answer back. This is the verse for the person who thinks confession has to be long and polished before God will listen. It does not.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About God Forgiving What You Have Done
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can God forgive any sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. There is no sin named anywhere in Scripture as too large for what Christ already paid for on the cross. Murder, adultery, betrayal, and open rebellion against God are all forgiven in the Bible&apos;s own pages, in David, Paul, and Peter. The size of the sin was never the deciding factor. Honest confession is.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is there a sin God will not forgive?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus spoke of one sin He called unforgivable, blasphemy against the Holy Spirit, which describes a hardened, final refusal to want forgiveness at all. If you are anxious enough about your own sin to search this question, that anxiety itself shows the Spirit is still working on you, which is the opposite of that hardened refusal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the unforgivable sin exactly?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a settled rejection of the Holy Spirit&apos;s work, not a single bad act or a repeated struggle. People who worry they have committed it almost never have, because that sin describes a heart that has stopped caring entirely, not one that is still wrestling with guilt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do I still feel guilty after I ask God to forgive me?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Feelings often lag behind truth. God&apos;s forgiveness is a settled fact the moment you confess honestly, but the emotional residue of shame can take time to fade, especially if the sin had real consequences. Keep returning to what 1 John 1:9 actually promises instead of waiting for a feeling to confirm it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does God still forgive me if I keep struggling with the same sin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, as long as the confession is honest and not a cover for refusing to change. A real struggle looks like hating the sin and returning to God again and again. That is very different from using forgiveness as permission to stop caring, which Scripture never allows.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many times will God forgive me?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus told Peter to forgive seventy times seven, which was His way of saying stop counting altogether. God is not more patient than He asks you to be with others. There is no number where His forgiveness runs out on someone who comes to Him honestly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do I have to confess every detail to God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God already knows every detail before you say a word. Confession is not informing Him. It is agreeing with Him honestly instead of minimizing or hiding. David&apos;s whole confession in 2 Samuel 12:13 was five words, and it was enough, because it was true.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between guilt and shame in the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Guilt says you did something wrong, and it moves you toward God in confession. Shame says you are something wrong, and it moves you away from Him into hiding. Guilt is a tool the Spirit uses for a moment. Shame is a weight God never asked you to carry.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does God forget what I did after He forgives me?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture describes it as casting your sins into the depths of the sea, not as God developing amnesia. The point is not that He stops knowing. The point is that He stops holding it against you, which is a far stronger promise than forgetting.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can God forgive me if I have not forgiven myself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, and this is worth saying plainly. God&apos;s forgiveness does not wait on your own permission. If He has already forgiven what you confessed, refusing to forgive yourself is not humility. It is arguing with a verdict God already settled at the cross.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What if I do not feel forgiven even though I believe God forgave me?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That gap between truth and feeling is common, and it does not mean the forgiveness was not real. Faith rests on what God said, not on what your emotions report back on a given night. Keep standing on the promise even on the nights it does not feel true, and let the feeling catch up to the fact in its own time.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Yes, God can forgive what you have done.</strong> Paul approved a murder. David arranged one. Peter denied his own friend three times. A dying criminal had nothing left to offer but a final breath. All of them were forgiven completely.
          </p>
          <p>
            📌 <strong>Confession, not performance, is the only requirement.</strong> 1 John 1:9 does not ask you to clean yourself up first. It asks you to be honest, because He is faithful and just to do the rest.
          </p>
          <p>
            📌 <strong>Guilt can lead you home. Shame only keeps you hiding.</strong> Learn to tell them apart, and stop letting a defeated accusation talk louder than a finished cross.
          </p>
          <p>You did not read this far by accident.</p>
          <p>Whatever you have never said out loud is not too far for what Jesus already paid for.</p>
          <p>So here is your one next step, tonight, before you do anything else.</p>
          <p>Say the actual thing to God. Not a vague version of it. The real one.</p>
          <p>Then let 1 John 1:9 answer you back, the same way it has answered every honest person before you.</p>
          <p>He is not waiting to condemn you.</p>
          <p>He is already faithful. He is already just. He is already ready to forgive.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
