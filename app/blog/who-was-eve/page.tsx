import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-eve", {
  title: "Who Was Eve in the Bible? The Story of the First Woman",
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

export default function WhoWasEvePage() {
  return (
    <BlogPostShell
      slug="who-was-eve"
      title={<>📖 Who Was Eve in the Bible? The Story of the First Woman</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Eve gets blamed for a lot.</p>
            <p>Almost every sermon about sin starts with her.</p>
            <p>She ate the fruit. She ruined it for everybody. That is the version most people know.</p>
            <p>
              📌 <strong>But that is not the whole story, and it is not even the accurate
              version of the part people think they know.</strong>
            </p>
            <p>Maybe you know what that feels like.</p>
            <p>One bad decision, and it becomes the only thing anyone remembers about you.</p>
            <p>One low moment gets replayed louder than every good thing you have ever done.</p>
            <p>Eve&apos;s real story is bigger than her worst day.</p>
            <p>
              This is who Eve was in the Bible, told straight from Genesis. Her creation, her life
              with Adam, the serpent, the fruit, and what came after it, including the parts the
              popular version usually leaves out.
            </p>
            <p>Let&apos;s start where her story actually starts.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Eve Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eve was the first woman, formed by God from the rib of Adam in the garden of Eden.</p>
          <p>
            Her story sits at the very front of Scripture, in <strong>Genesis 2 through 4</strong>,
            the opening chapters of the whole Bible.
          </p>
          <p>
            📌 One detail the popular version skips: she was not called Eve from the start. God
            called the first pair &quot;man,&quot; Adam named her &quot;Woman&quot; at their creation,
            and the name Eve does not appear until after everything in the garden falls apart.
          </p>
          <p>
            Later writers refer back to her too. Paul mentions the serpent deceiving her in his
            letters to Corinth and Timothy.{" "}
            <ArticleLink href="/blog/paul">Paul&apos;s own story</ArticleLink> shows how seriously
            the early church took Genesis as real history, not legend.
          </p>
          <p>Now here is how her story actually unfolds.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Eve&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Made Because Something Was Missing</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God had already made Adam and put him in Eden to work it and keep it.</p>
          <p>Everything else in creation had already been called good.</p>
          <p>Then God said something surprising.</p>
        </div>
        <VerseQuote
          text="And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him."
          reference="Genesis 2:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>That is the first thing God calls not good in the entire Bible: a man
            alone.</strong>
          </p>
          <p>Adam named every animal God brought to him, and not one of them fit as a companion.</p>
          <p>So God put Adam into a deep sleep, took one of his ribs, and built the woman from it.</p>
          <p>When Adam woke up and saw her, this is what he said.</p>
        </div>
        <VerseQuote
          text="And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man."
          reference="Genesis 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 She was not an afterthought or a lesser add on to creation.</p>
          <p>She was God&apos;s answer to the one thing He had just called not good.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Life in Eden</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scripture says a man and his wife become one flesh, and it says this right after Eve is made.</p>
          <p>Both Adam and Eve were given the same blessing and the same job.</p>
          <p>Be fruitful. Fill the earth. Have dominion over it, together.</p>
          <p>They were both naked and unashamed, with nothing to hide from God or from each other.</p>
          <p>
            💡 There was no shame, no hiding, and no blame in that garden yet. That only shows up
            after the next scene.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Serpent and the Forbidden Fruit</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A serpent, described only as more subtil than any beast God had made, came to Eve first.</p>
          <p>He did not start with a command to sin. He started with a question.</p>
        </div>
        <VerseQuote
          text="Now the serpent was more subtil than any beast of the field which the LORD God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?"
          reference="Genesis 3:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eve corrected him, but she added a detail God never actually said: do not even touch it.</p>
          <p>The serpent pressed further.</p>
        </div>
        <VerseQuote
          text="And the serpent said unto the woman, Ye shall not surely die: For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil."
          reference="Genesis 3:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice the move. He did not deny God&apos;s word outright. He twisted it, then
            questioned God&apos;s motive.</strong>
          </p>
          <p>He made God sound like He was withholding something good, not protecting her from something bad.</p>
          <p>Then came the decision.</p>
        </div>
        <VerseQuote
          text="And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat."
          reference="Genesis 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 Two corrections worth making here. Genesis never names the fruit as an apple, that
            detail comes from later art and tradition, not the text. And Adam was not away
            somewhere else. The verse says he was with her, and he ate too.
          </p>
          <p>💡 They both fell. She was deceived by the serpent&apos;s lie. He simply chose to eat.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Consequences and a Promise</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Their eyes were opened, but not the way the serpent promised.</p>
          <p>They saw their own nakedness, covered themselves with fig leaves, and hid from God.</p>
          <p>God questioned them, and each one passed the blame down the line. Adam blamed Eve. Eve blamed the serpent.</p>
          <p>Then God spoke judgment over each of them, starting with the serpent.</p>
        </div>
        <VerseQuote
          text="And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel."
          reference="Genesis 3:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Before God ever tells Eve what her sin will cost her, He promises that her
            seed will eventually crush the one who deceived her.</strong>
          </p>
          <p>
            Christians have long read that line as the first promise of a Savior, fulfilled in
            Christ. Judgment and hope arrive in the same breath.
          </p>
          <p>Only after that promise does God turn to Eve directly.</p>
        </div>
        <VerseQuote
          text="Unto the woman he said, I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children; and thy desire shall be to thy husband, and he shall rule over thee."
          reference="Genesis 3:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Childbirth would now bring pain, and her marriage would carry new friction. Adam&apos;s judgment followed: the ground was cursed, and work would come with sweat and thorns.</p>
          <p>Then, right in the middle of that loss, Adam did something remarkable.</p>
        </div>
        <VerseQuote
          text="And Adam called his wife's name Eve; because she was the mother of all living."
          reference="Genesis 3:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 That is her actual name, given after the fall, not before it. Eve means life.</p>
          <p>📌 In the middle of judgment, Adam named his wife hope.</p>
          <p>God then made them coats of skins, meaning an animal&apos;s life was given so they could be covered.</p>
          <p>⚠️ It was the first death in the Bible, and it happened to cover their sin, not to punish them further.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Mother of All Living</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eve&apos;s story does not end at the garden gate. Outside it, she became a mother.</p>
        </div>
        <VerseQuote
          text="And Adam knew Eve his wife; and she conceived, and bare Cain, and said, I have gotten a man from the LORD."
          reference="Genesis 4:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>She then bore Abel, and years later, after Cain killed Abel, she bore a third son.</p>
          <p>
            She named him Seth, saying God had appointed her another seed in Abel&apos;s place. Every
            person alive today, according to Scripture, descends from her.
          </p>
          <p>
            💡 The woman blamed for humanity&apos;s worst moment is also, quite literally, the
            mother of humanity&apos;s every good and redeemed moment since.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Eve&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Temptation twists what God actually said</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The serpent did not tell Eve to sin outright.</p>
          <p>He questioned what God said, then made obedience sound like a loss.</p>
          <p>❓ Where do you hear that same twist today?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Being deceived does not remove responsibility</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eve believed a lie. She still made the choice.</p>
          <p>Adam believed nothing and simply ate. Both were held accountable.</p>
          <p>⚠️ Sin never stays quiet because someone else started it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. God&apos;s judgment always comes with grace attached</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>He judged Adam and Eve honestly, promised a Savior in the same breath, then clothed them Himself.</p>
          <p>📌 Judgment was never God&apos;s last word to them, and it is not His last word to you either.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. One failure does not erase a life</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eve&apos;s worst moment happened in one chapter.</p>
          <p>She went on to become the mother Adam named hope, and the mother of every life since.</p>
          <p>
            💡 Your worst chapter is not required to be your last one either, the same way{" "}
            <ArticleLink href="/blog/who-is-leah">Leah&apos;s story</ArticleLink> later in Genesis
            shows an overlooked woman still fully seen by God.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Eve&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 2:18</h3>
        <VerseQuote
          text="And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him."
          reference="Genesis 2:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eve exists because God noticed something was missing and moved to fix it.</p>
          <p>📌 She was a gift, not a consolation prize handed out after creation went wrong.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 3:6</h3>
        <VerseQuote
          text="And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat."
          reference="Genesis 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three pulls in one verse: appetite, appearance, and pride.</p>
          <p>💡 That same combination still shows up behind most temptation today.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 3:15</h3>
        <VerseQuote
          text="And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel."
          reference="Genesis 3:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The first promise of a rescuer in the whole Bible, spoken over Eve before her own
            sentence. See how that thread unfolds by reading{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">how you know you are saved</ArticleLink>.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 3:20</h3>
        <VerseQuote
          text="And Adam called his wife's name Eve; because she was the mother of all living."
          reference="Genesis 3:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Named after the fall, not before it. Named for life, right after death entered the world.</p>
          <p>💡 Her name is a statement of faith, given by a man standing in the ruins of Eden.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Eve</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Eve a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis presents her as a real, historical woman, not a symbol. The New Testament treats
          her the same way, and Jesus referred to the creation of male and female as historical fact
          when He was asked about marriage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Eve eat an apple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis never names the fruit. It only calls it the fruit of the tree of the knowledge of
          good and evil. The apple comes from later Western art and tradition, not from the Hebrew
          text. What mattered was not the type of fruit but the disobedience of eating it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Eve created inferior to Adam?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Genesis 1 says God made mankind, male and female, in His own image, with no ranking
          attached. Being formed after Adam and from his side reflects closeness, not lesser worth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Adam with Eve when she ate the fruit?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Genesis 3:6 says she gave the fruit to her husband who was with her, and he ate. The
          popular idea that Adam was off somewhere else is not what the text says.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the serpent tempt Eve and not Adam?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not explain the serpent&apos;s strategy. Paul later notes that Eve was
          deceived by the lie, while Adam sinned with his eyes fully open. Both failures mattered.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Eve mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eve, from the Hebrew Chavah, means life or life giver. Adam gave her that name right after
          the fall, because she would become the mother of all living. It is one of the few hopeful
          moments in an otherwise heavy chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eve was not a mistake, and she was not only a mistake either.</p>
          <p>
            She was God&apos;s answer to the first thing He ever called not good, and the first
            person in the Bible given a promise of rescue.
          </p>
          <p>She fell, exactly like the rest of us fall. And she was still named for life.</p>
          <p>
            📌 <strong>If you have ever felt like one failure defines you, Eve&apos;s story says
            otherwise.</strong>
          </p>
          <p>
            Her chapter of Genesis comes alive verse by verse inside Bible Buddy, completely free, if
            you want to sit with her story slower than a single article allows.
          </p>
          <p>
            Read Genesis 2 and 3 for yourself this week. If you are new to reading it straight
            through, <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink>{" "}
            is a good place to start.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis is where the whole Bible begins, and it sets up everything that follows. If you
            want the full picture of what this book actually is,{" "}
            <ArticleLink href="/blog/what-is-the-bible">what is the Bible</ArticleLink> is a solid
            next stop.
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
