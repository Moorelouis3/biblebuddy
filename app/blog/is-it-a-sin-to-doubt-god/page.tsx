import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("is-it-a-sin-to-doubt-god");

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

export default function IsItASinToDoubtGodPage() {
  return (
    <BlogPostShell
      slug="is-it-a-sin-to-doubt-god"
      title={<>📖 Is It a Sin to Doubt God?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You typed it into your phone last night.</p>
            <p>Is it a sin to doubt God.</p>
            <p>
              Maybe your finger hovered over the search bar for a minute before you actually pressed
              enter. Because asking the question felt like admitting something.
            </p>
            <p>
              📌 <strong>So here is the answer, right at the top. No. Doubt is not a sin.</strong>
            </p>
            <p>You are not the first person to lie awake wondering if any of this is real.</p>
            <p>
              You are not the first believer to sit in church, sing the songs, mean most of the
              words, and still carry a question you have never said out loud to anyone.
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>Maybe someone told you doubt means your faith is weak.</p>
            <p>Maybe someone told you a real Christian would not even ask these questions.</p>
            <p>That is not what the Bible teaches.</p>
            <p>
              📖 Scripture is full of people who doubted out loud. Thomas. John the Baptist. A
              desperate father who said the truest sentence in the whole Gospels.
            </p>
            <p>
              <strong>Jesus never once shamed a single one of them.</strong>
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide will walk through what honest doubt actually looks like in the Bible, how it
              is different from hardened unbelief, and what to do the next time a hard question shows
              up in your own heart.
            </p>
            <p>It will not tell you to just believe harder.</p>
            <p>It will show you what Jesus actually did with people who struggled to believe.</p>
            <p>Take a breath. You are safe here.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not a small question.</p>
          <p>Because a lot of Christians who carry doubt never bring it to God at all.</p>
          <p>
            They bring it to a group chat, or a search engine, or nobody. They hide it, because
            somewhere along the way they learned that doubt gets you a lecture instead of an answer.
          </p>
          <p>
            ⚠️ <strong>That is the real danger. Not the doubt itself. The hiding.</strong>
          </p>
          <p>
            A question you are ashamed of cannot be brought to God in prayer. It just sits there and
            grows in the dark.
          </p>
          <p>
            And when nobody tells you the truth about doubt, it is easy to start believing the lie
            that faith is supposed to feel certain every single day. Rock solid. No cracks.
          </p>
          <p>That is not what faith is, and it is not what the Bible describes.</p>
          <p>
            📌 <strong>The stakes here are whether your doubt drives you away from God, or straight
            into His arms.</strong>
          </p>
          <p>
            One of those outcomes leaves you quietly drifting for years. The other one is where real
            faith actually gets built.
          </p>
          <p>
            If you have ever felt like{" "}
            <ArticleLink href="/blog/why-does-god-feel-silent">God has gone quiet on you</ArticleLink>{" "}
            right when you needed Him most, this matters even more. Silence and doubt tend to show up
            together.
          </p>
          <p>This guide is here to make sure your doubt leads you closer to God, not farther away.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What God&apos;s Word Says About Doubt
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Doubt Is Not the Same Thing as Unbelief
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start here, because this is the whole key to the rest of this guide.</p>
          <p>
            <strong>Unbelief</strong> is a settled decision. It has already looked at the evidence
            and closed the case. It is not asking a question. It has stopped asking.
          </p>
          <p>
            <strong>Doubt</strong> is different. Doubt is a question still standing open. It wants an
            answer. It is still knocking.
          </p>
          <p>
            💡 A person who doubts is still in the fight. A person in unbelief has already walked off
            the field.
          </p>
          <p>
            Every person you are about to meet in this section brought a real, honest question to
            God. And every single time, God met the question instead of punishing the person for
            asking it.
          </p>
          <p>Keep that in mind as you read what comes next.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Thomas Doubted Out Loud, and Jesus Met Him There
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You probably already know this one, because his name became a label.</p>
          <p>Doubting Thomas.</p>
          <p>
            But look at what actually happened. Jesus had risen from the dead and appeared to the
            other disciples. Thomas was not in the room. So they told him the news.
          </p>
          <p>Here is exactly how he answered them:</p>
        </div>
        <VerseQuote
          text="Except I shall see in his hands the print of the nails, and put my finger into the print of the nails, and thrust my hand into his side, I will not believe."
          reference="John 20:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is not a quiet, private worry. That is a flat, public refusal.</p>
          <p>
            📌 <strong>And notice what Jesus did not do a week later. He did not scold him.</strong>
          </p>
        </div>
        <VerseQuote
          text="Then saith he to Thomas, Reach hither thy finger, and behold my hands; and reach hither thy hand, and thrust it into my side: and be not faithless, but believing."
          reference="John 20:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus walked into a locked room and gave Thomas exactly what he asked for. The nail
            prints. The wound in His side.
          </p>
          <p>Thomas did not have to earn that. He just had to show up honest.</p>
          <p>And the moment the evidence was in front of him, everything in him broke open:</p>
        </div>
        <VerseQuote text="And Thomas answered and said unto him, My LORD and my God." reference="John 20:28" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is one of the highest statements of faith in the entire New Testament.</p>
          <p>And it came out of the mouth of the man history calls the doubter.</p>
          <p>
            Jesus did add one more sentence, and it matters for you specifically, since you were not
            in that room either:
          </p>
        </div>
        <VerseQuote
          text="Jesus saith unto him, Thomas, because thou hast seen me, thou hast believed: blessed are they that have not seen, and yet have believed."
          reference="John 20:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>You are the person Jesus was already blessing in that sentence.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. John the Baptist Doubted From Inside a Prison Cell
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This one surprises people, because John the Baptist looks like a rock in Scripture.</p>
          <p>
            He is the one who pointed at Jesus in the Jordan River and called Him the Lamb of God. He
            baptized Him. He heard the voice from heaven. If anyone should have been certain, it was
            John.
          </p>
          <p>
            Then he ended up in a prison cell, waiting to be executed, and he sent his own disciples
            to go ask Jesus a question:
          </p>
        </div>
        <VerseQuote
          text="Now when John had heard in the prison the works of Christ, he sent two of his disciples, And said unto him, Art thou he that should come, or do we look for another?"
          reference="Matthew 11:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that question again.</p>
          <p>Are you actually the one, or was I wrong about all of it.</p>
          <p>
            ❓ If John the Baptist could ask that question from a cell and stay a faithful man, what
            does that say about the questions you have been afraid to ask?
          </p>
          <p>Look at how Jesus responded. He did not rebuke John for asking.</p>
        </div>
        <VerseQuote
          text="Jesus answered and said unto them, Go and shew John again those things which ye do hear and see: The blind receive their sight, and the lame walk, the lepers are cleansed, and the deaf hear, the dead are raised up, and the poor have the gospel preached to them."
          reference="Matthew 11:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He sent evidence. Real, visible, checkable evidence.</p>
          <p>
            Jesus treats an honest question from a struggling believer the same way every time. He
            answers it. He does not slam the door on it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Father Who Believed and Doubted in the Same Breath
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This might be the most honest verse in the whole Bible for anyone carrying doubt right
            now.
          </p>
          <p>
            A desperate father brought his sick son to Jesus. Jesus told him that all things are
            possible to the one who believes. Listen to what the man said back:
          </p>
        </div>
        <VerseQuote
          text="And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief."
          reference="Mark 9:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read that sentence slowly.</p>
          <p>Lord, I believe.</p>
          <p>Help my unbelief.</p>
          <p>
            💡 <strong>Both of those things were true in him at the exact same moment.</strong>
          </p>
          <p>
            He was not lying about the first half to sound spiritual. He was not hiding the second
            half out of shame. He said the whole truth, with tears, to the only person who could
            actually do anything about it.
          </p>
          <p>Jesus healed his son.</p>
          <p>
            He did not require the man to sort out his theology first. He met him in the middle of
            his mixed up, honest, crying prayer.
          </p>
          <p>
            📌 <strong>That prayer is available to you right now, exactly as it is.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Peter&apos;s Doubt Got Him Caught, Not Drowned
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Peter asked Jesus to call him out onto the water in the middle of a storm, and Jesus did.</p>
        </div>
        <VerseQuote
          text="And he said, Come. And when Peter was come down out of the ship, he walked on the water, to go to Jesus."
          reference="Matthew 14:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then he looked at the wind and started to sink:</p>
        </div>
        <VerseQuote
          text="But when he saw the wind boisterous, he was afraid; and beginning to sink, he cried, saying, Lord, save me."
          reference="Matthew 14:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what Peter did the second doubt hit him. He did not swim for the boat. He cried out to Jesus.</p>
        </div>
        <VerseQuote
          text="And immediately Jesus stretched forth his hand, and caught him, and said unto him, O thou of little faith, wherefore didst thou doubt?"
          reference="Matthew 14:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus asked him a question. He did not let him sink while He asked it.</p>
          <p>
            The hand reached out before the question finished. Peter was caught first, corrected
            second.
          </p>
          <p>
            📌 <strong>That is the order Jesus still works in. He catches you, then He talks to you
            about it.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. When Doubt Turns Into Hardened Refusal
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Now the honest part, because this guide would be lying to you if it stopped here.</p>
          <p>
            Every verse above shows a doubter who kept reaching toward God with the question. James
            describes something different: a person who never intends to actually settle anything.
          </p>
        </div>
        <VerseQuote
          text="But let him ask in faith, nothing wavering. For he that wavereth is like a wave of the sea driven with the wind and tossed. For let not that man think that he shall receive any thing of the Lord. A double minded man is unstable in all his ways."
          reference="James 1:6 through 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ James is not describing the father in Mark 9, crying out for help with his unbelief.
          </p>
          <p>
            He is describing someone tossed back and forth on purpose, refusing to land anywhere,
            never actually bringing the question to God to be answered.
          </p>
          <p>Here is the honest line between the two.</p>
          <p>
            Honest doubt says: I am struggling to believe this, and I want to know if it is true. It
            keeps searching.
          </p>
          <p>
            Hardened refusal says: I have already decided, and no answer will change my mind. It has
            stopped searching.
          </p>
          <p>If you are reading this article looking for answers, you are almost certainly the first kind.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Bring Your Honest Questions Straight to God
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David modeled this over and over in the Psalms. He did not tuck his questions away into a
            private journal and pretend to God that everything was fine.
          </p>
          <p>He said the hard thing out loud, straight to God:</p>
        </div>
        <VerseQuote
          text="How long wilt thou forget me, O LORD? for ever? how long wilt thou hide thy face from me? How long shall I take counsel in my soul, having sorrow in my heart daily? how long shall mine enemy be exalted over me?"
          reference="Psalm 13:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That is a man questioning God&apos;s presence, God&apos;s timing, and God&apos;s silence, in the same breath.</p>
          <p>And it is sitting inside Scripture, still being read, still being prayed, thousands of years later.</p>
          <p>
            📌 <strong>God was never afraid of David&apos;s questions. He put them in the Bible.</strong>
          </p>
          <p>
            Whatever doubt you have been afraid to say out loud, it is safe to say it to God. He has
            heard harder questions than yours, and He has never once walked away from an honest one.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: What To Do With Your Doubt
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Doubt does not need to be defeated in one night.</p>
          <p>It needs somewhere honest to go. Here are eight places to start.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Say the doubt out loud to God.</strong> Not a polished version of it. The actual
            sentence in your head. Pray the father&apos;s prayer from Mark 9 word for word if you
            need to borrow it.
          </li>
          <li>
            <strong>Tell one trusted believer.</strong> A hidden question grows heavier every week you
            carry it alone. A spoken one gets lighter almost immediately, even before it is answered.
          </li>
          <li>
            <strong>Go looking for the actual evidence.</strong> Faith is not blind, and you do not
            have to pretend it is. Studying{" "}
            <ArticleLink href="/blog/how-do-we-know-the-bible-is-true">
              why the Bible is trustworthy
            </ArticleLink>{" "}
            gives your questions somewhere solid to land.
          </li>
          <li>
            <strong>Separate the feeling from the fact.</strong> Feeling distant from God is real, but
            it is not proof He has moved. Read the Psalms and notice how often the writer feels one
            way and states the truth another way in the very same verse.
          </li>
          <li>
            <strong>Ask better questions than you think.</strong> Instead of only asking is any of
            this true, also ask what would it mean if it is. That second question keeps you searching
            instead of just spiraling.
          </li>
          <li>
            <strong>Keep showing up anyway.</strong> Keep reading. Keep praying. Keep going to church.
            Obedience with a question mark attached is still obedience, and God honors it.
          </li>
          <li>
            <strong>Watch for fear disguised as doubt.</strong> Sometimes what looks like doubting God
            is actually{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">plain fear</ArticleLink>{" "}
            wearing a theological costume. Naming which one it is can change what you actually need
            to do about it.
          </li>
          <li>
            <strong>Give yourself the same grace Jesus gave Thomas.</strong> He did not require Thomas
            to fix his own doubt before he would help. Let God meet you exactly where you are, not
            where you think you should already be.
          </li>
        </ol>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>You do not need to fix all of this today.</p>
          <p>Pick one step. Start there.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Doubt
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you only remember five verses from this whole guide, make it these five.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Mark 9:24</h3>
        <VerseQuote
          text="And straightway the father of the child cried out, and said with tears, Lord, I believe; help thou mine unbelief."
          reference="Mark 9:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the verse to pray on the exact night your faith feels the thinnest. It does not
            ask you to sound certain. It only asks you to be honest.
          </p>
          <p>Say it out loud tonight if you need to. Word for word.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. John 20:29</h3>
        <VerseQuote
          text="Jesus saith unto him, Thomas, because thou hast seen me, thou hast believed: blessed are they that have not seen, and yet have believed."
          reference="John 20:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus said this looking straight at a man who had just doubted Him out loud, days earlier.
          </p>
          <p>
            You are among the blessed He named in this verse. You have never seen Him with your own
            eyes, and you are still here, still reading, still reaching.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Matthew 14:31</h3>
        <VerseQuote
          text="And immediately Jesus stretched forth his hand, and caught him, and said unto him, O thou of little faith, wherefore didst thou doubt?"
          reference="Matthew 14:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The hand came before the question.</p>
          <p>
            Whatever you are sinking under right now, this is the verse that reminds you which comes
            first for you too.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 11:3</h3>
        <VerseQuote
          text="And said unto him, Art thou he that should come, or do we look for another?"
          reference="Matthew 11:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            John the Baptist asked this from a prison cell, and Jesus answered him with evidence
            instead of a rebuke.
          </p>
          <p>
            This is the verse for the reader whose doubt showed up during the hardest season of their
            life, not the easiest one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Psalm 13:1</h3>
        <VerseQuote
          text="How long wilt thou forget me, O LORD? for ever? how long wilt thou hide thy face from me?"
          reference="Psalm 13:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>David asked God this question and it made it into Scripture, not out of it.</p>
          <p>This is the verse for when your doubt sounds more like grief than an argument.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Doubt and the Bible
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is doubting God a sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Doubt is a question, not a decision to reject God. Thomas doubted the resurrection out
          loud and Jesus gave him evidence instead of a rebuke. What matters is where you take the
          doubt. Bring it to God honestly, and it becomes the start of a stronger faith, not the end
          of one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does the Bible say about doubt?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible treats honest doubt as something God meets, not something He punishes. Thomas,
          John the Baptist, and a desperate father in Mark 9 all voiced real doubt, and Jesus answered
          every one of them with patience and evidence. The one warning Scripture gives is about
          hardened, wavering refusal that never actually seeks an answer.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jesus ever doubt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never records Jesus doubting who He was or who God the Father is. In Gethsemane He
          asked for the cup to pass if possible, but He never questioned the Father&apos;s goodness or
          existence. His struggle was over the cost of obedience, not over whether God was real.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between doubt and unbelief?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Doubt is a question still open, still searching for an answer. Unbelief is a settled refusal
          that has already decided against the truth no matter what evidence shows up. The father in
          Mark 9 shows both words can even sit in the same heart at once, which is exactly why he
          asked Jesus to help the unbelief that remained.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do I doubt my faith?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Doubt often shows up during exhaustion, grief, unanswered prayer, or simply thinking deeply
          for the first time about what you were taught as a child. None of those causes make you a
          weak Christian. They make you a thinking one. God is not intimidated by any of them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What should I do when I doubt God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Say it to God plainly, the way the father in Mark 9 did. Tell one trusted believer instead of
          carrying it alone. Keep reading Scripture and keep showing up, even while the question is
          still open. Doubt handled this way tends to lead somewhere. Doubt hidden away tends to just
          grow heavier.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is it normal for Christians to have doubts?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Some of the most faithful people in Scripture, including John the Baptist and the
          apostle Thomas, voiced real doubt at real low points. Doubt shows up in a life of faith more
          often than most churches admit out loud, and it always has.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can you be saved and still have doubts?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Salvation rests on what Christ did, not on the steadiness of your feelings from one day
          to the next. If wondering whether your faith is even real is part of what is keeping you up
          at night, this question gets a full, honest answer in{" "}
          <ArticleLink href="/blog/how-do-you-know-you-are-saved">
            how you can know you are saved
          </ArticleLink>
          .
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the prayer for doubt in the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The clearest one is Mark 9:24. Lord, I believe, help thou mine unbelief. It holds both the
          faith you have and the doubt you are carrying in the very same sentence, and God answered it
          the moment it was prayed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does doubting mean I am not really a Christian?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. A real Christian can still ask real questions. What defines your faith is where you take
          those questions, not whether you have them at all. Bringing your doubt to God is itself an
          act of faith, because it assumes He is actually there to answer.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Doubt is not the same thing as unbelief.</strong> Thomas doubted out loud and
            Jesus met him with evidence, not a lecture. Your questions do not disqualify you.
          </p>
          <p>
            📌 <strong>Jesus catches you before He questions you.</strong> Peter was sinking, and the
            hand reached out first. Whatever you are sinking under tonight, that order has not
            changed.
          </p>
          <p>
            📌 <strong>The safest place for your doubt is straight to God, not away from Him.</strong>{" "}
            Lord, I believe, help thou mine unbelief is still a full and honest prayer.
          </p>
          <p>You do not need a perfectly certain faith to belong to God.</p>
          <p>
            You need an honest one. The kind that keeps knocking, keeps asking, and keeps bringing its
            questions to the only One who has never once slammed the door.
          </p>
          <p>So here is your one next step.</p>
          <p>Tonight, say your real question to God, out loud, in your own words.</p>
          <p>He already knows what it is. He is just waiting for you to bring it to Him.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If doubt has kept you from opening your Bible, you do not have to carry it alone or figure
            it out by yourself.
          </p>
          <p>
            Inside <strong>Bible Buddy</strong>, you will find:
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English</li>
          <li>🌱 Daily devotionals that meet you where you are</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 A community of believers who ask the same honest questions you do</li>
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
