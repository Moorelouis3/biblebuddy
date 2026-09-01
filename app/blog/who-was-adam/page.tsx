import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-adam", {
  title: "Who Was Adam? The First Man in the Bible, His Story and Why He Matters",
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

export default function WhoWasAdamPage() {
  return (
    <BlogPostShell
      slug="who-was-adam"
      title={<>📖 Who Was Adam? The First Man in the Bible</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably heard the name your whole life.</p>
            <p>Adam. The first man. The garden. The apple.</p>
            <p>But most of that picture in your head did not come from the Bible itself.</p>
            <p>
              📌 <strong>Who was Adam in the Bible, really? He was the first human being God
              formed, placed in a perfect garden, given real work and a real relationship with his
              Maker, and the one whose choice broke all of it.</strong>
            </p>
            <p>
              His story is not just ancient history. It is the reason you know what work feels
              like, what shame feels like, and what it means to need someone to fix what you
              cannot fix yourself.
            </p>
            <p>
              This is Adam&apos;s story straight from Genesis, in order, with the popular details
              that are not actually in the text corrected along the way. Where he came from. What
              his life in Eden was really like. What he did wrong. And why the story does not end
              with him.
            </p>
            <p>Let&apos;s meet him.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Adam Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Adam was the first human being, made directly by God, not born of parents.</p>
          <p>
            His story opens the entire Bible. You find it in{" "}
            <strong>Genesis 1 through 5</strong>, and his name is mentioned again later in{" "}
            <strong>Romans 5</strong> and <strong>1 Corinthians 15</strong>, where Paul uses his
            life to explain what Jesus came to fix.
          </p>
          <p>His wife was Eve, the first woman, formed from his own body.</p>
          <p>
            His sons Cain and Abel are the Bible&apos;s first brothers, and their story is the
            Bible&apos;s first murder.
          </p>
          <p>
            💡 Adam is not just a character at the start of the Bible. Paul calls him a pattern, a
            picture of something bigger to come. Keep that in mind. It matters by the end.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Adam&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Formed From the Dust</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Adam was not spoken into existence the way light and stars were.</p>
          <p>He was formed, up close, by God&apos;s own hands.</p>
        </div>
        <VerseQuote
          text="And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul."
          reference="Genesis 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Dust first. Then breath.</p>
          <p>
            📌 <strong>You are dust that God chose to breathe into.</strong> That is not an
            insult. It is the whole story of your worth in one verse.
          </p>
          <p>The same chapter says God made man in His own image, male and female:</p>
        </div>
        <VerseQuote
          text="So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not a partial reflection. Not a distant resemblance. <strong>God&apos;s image.</strong>
          </p>
          <p>
            💡 Every person you meet carries that same image, not just Adam. That is where human
            worth comes from, and it is why the{" "}
            <ArticleLink href="/blog/what-is-the-bible">Bible</ArticleLink> opens with it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Life and Work in Eden</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God did not put Adam in the garden to do nothing.</p>
        </div>
        <VerseQuote
          text="And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it."
          reference="Genesis 2:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Work existed before sin did.</strong> Adam had a job in paradise. Tending
            and guarding a garden was real responsibility, not a punishment.
          </p>
          <p>
            He was also given one boundary, a tree he was told not to eat from, with a warning
            that death would follow if he did.
          </p>
          <p>
            He named every animal God brought to him, and among all of them, not one was a fit
            companion:
          </p>
        </div>
        <VerseQuote
          text="And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him."
          reference="Genesis 2:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>💡 God noticed the problem before Adam could even name it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Creation of Eve</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God put Adam into a deep sleep and took a rib from his side.</p>
          <p>From it He built Eve and brought her to Adam.</p>
          <p>Adam&apos;s response is the Bible&apos;s first recorded human words of poetry:</p>
        </div>
        <VerseQuote
          text="And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man."
          reference="Genesis 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Eve was not an afterthought or a lesser creation.</strong> She came from
            Adam&apos;s own side, not his head to rule him or his foot to be walked on.
          </p>
          <p>They were naked, and unashamed. Nothing between them, and nothing between them and God.</p>
          <p>
            Genesis even pictures God walking in the garden with them, the kind of nearness{" "}
            <ArticleLink href="/blog/how-to-spend-1-hour-with-god">
              spending real time with God
            </ArticleLink>{" "}
            is still meant to feel like.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The Fall</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is where the popular version gets a small but real detail wrong. Genesis never
            names the fruit an apple. It only says fruit, from the tree of the knowledge of good
            and evil.
          </p>
          <p>The serpent convinced Eve the fruit was good, and she ate. Then she gave it to Adam.</p>
        </div>
        <VerseQuote
          text="And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat."
          reference="Genesis 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice something the popular retelling usually drops. Adam was not tricked from
            far away. He was right there with her, and he ate too.
          </p>
          <p>
            Scripture never lets him off the hook as a bystander. That kind of quiet giving in,
            going along instead of standing firm, is exactly why{" "}
            <ArticleLink href="/blog/building-self-control">learning self control</ArticleLink>{" "}
            in the small moment matters so much.
          </p>
          <p>Their eyes were opened, but not the way the serpent promised.</p>
          <p>They felt shame for the first time, hid from God, and said they were afraid.</p>
          <p>
            💡 That is the first fear recorded in the Bible, and it shows up right after
            disobedience, not before it, the same kind of fear{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              Scripture keeps addressing
            </ArticleLink>{" "}
            all the way through.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Consequences and Life After Eden</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God did not destroy Adam. He judged him, but He also stayed present with him.</p>
          <p>The ground itself was cursed because of Adam, and work turned hard.</p>
        </div>
        <VerseQuote
          text="In the sweat of thy face shalt thou eat bread, till thou return unto the ground; for out of it wast thou taken: for dust thou art, and unto dust shalt thou return."
          reference="Genesis 3:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Dust to dust. Genesis 2:7 and Genesis 3:19 are the same sentence, reversed.</p>
          <p>
            God clothed Adam and Eve Himself with animal skins, the first death in Scripture,
            covering their shame with something that cost a life. Then they were sent out of the
            garden.
          </p>
          <p>
            Life went on. Adam and Eve had Cain, Abel, and later Seth. Genesis is careful to say
            they also had other sons and daughters, not just the three names most people know.
          </p>
        </div>
        <VerseQuote
          text="And the days of Adam after he had begotten Seth were eight hundred years: and he begat sons and daughters: And all the days that Adam lived were nine hundred and thirty years: and he died."
          reference="Genesis 5:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Nine hundred and thirty years, and then it says plainly: and he died.</strong>{" "}
            The warning from the garden finally landed. Death entered through one man, exactly
            like God said it would.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Adam&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Your worth was never up for debate</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before Adam did anything right or wrong, he was made in God&apos;s image.</p>
          <p>❓ What would change if you actually believed that about yourself today?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Work is a gift, not a curse</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Adam worked in paradise, before sin ever touched anything.</p>
          <p>The curse made work hard. It did not invent work.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Silence in the moment of temptation is still a choice</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Adam did not argue with the serpent. He simply ate.</p>
          <p>⚠️ Standing right beside sin and saying nothing is still a decision.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. God pursues you after the failure, not just before it</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God came looking for Adam in the garden. He still does.</p>
          <p>📌 Shame makes you hide. God&apos;s first move is always to come find you.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Adam&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 2:7</h3>
        <VerseQuote
          text="And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul."
          reference="Genesis 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most personal creation moment in the whole Bible.</p>
          <p>Not spoken from a distance. Formed and breathed into, up close.</p>
          <p>💡 Your life started as a gift from God&apos;s own breath, and so did every life since.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Romans 5:19</h3>
        <VerseQuote
          text="For as by one man's disobedience many were made sinners, so by the obedience of one shall many be made righteous."
          reference="Romans 5:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is writing about Adam and Jesus in the same breath.</p>
          <p>One man&apos;s disobedience broke it. One Man&apos;s obedience fixed it.</p>
          <p>
            📌 <strong>This is the whole gospel compressed into one sentence, and Adam is half
            the sentence.</strong>
          </p>
          <p>
            Paul makes the same point elsewhere, calling Jesus the last Adam, the second man from
            heaven undoing what the first man from earth broke.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Adam</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Adam a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis presents Adam as a real historical man, not a symbol. He appears in genealogies
          in Genesis 5, and the New Testament treats him as real too, most clearly when Paul
          contrasts him directly with Jesus in Romans 5 and 1 Corinthians 15.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Adam and Eve eat an apple?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis never says the word apple. It simply calls it fruit from the tree of the
          knowledge of good and evil. That detail comes from later art and tradition, not the text.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Adam when he died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 5:5 says he lived nine hundred and thirty years and then he died, which fulfills
          the warning God gave him back in the garden.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible blame Adam instead of Eve for sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Eve ate first and Scripture does not excuse her. But Adam was standing right there, and
          as the one God gave the original command to directly, Paul repeatedly traces sin and
          death back through Adam, the one who was told first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Jesus is the last Adam?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Paul uses the title in 1 Corinthians 15 to show Jesus reversing what Adam started. The
          first Adam brought death to everyone connected to him by birth. The last Adam brings
          life to everyone connected to Him by faith.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Adam&apos;s story is not really about how far back history goes.</p>
          <p>It is about where you stand right now.</p>
          <p>
            📌 <strong>Made in God&apos;s image. Broken by one bad choice. Still pursued by a God
            who came looking anyway.</strong>
          </p>
          <p>That is Adam&apos;s story, and in more ways than you might like to admit, it is yours too.</p>
          <p>
            But Adam is not where the Bible leaves it. Paul&apos;s whole point in Romans 5 is that
            the story does not end with the first man&apos;s failure.
          </p>
          <p>
            If that leaves you asking where you stand with God right now,{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              how do you know you are saved
            </ArticleLink>{" "}
            is worth reading next.
          </p>
          <p>
            This chapter comes alive in a whole new way when you walk through it slowly, verse by
            verse, inside <strong>Bible Buddy</strong>. And it is completely free.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis is where every other book of the Bible starts making sense. If you have never
            worked through it for yourself, start with{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink>.
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
