import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-2-explained", {
  title: "Genesis 2 Explained: Eden, Adam, Eve & God's Design",
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

export default function GenesisTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-2-explained"
      title={<>📖 Genesis 2 Explained: Eden, Adam, Eve &amp; God&apos;s Design</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Genesis 1 gives you the wide shot.</p>
            <p>Six days. Light, land, sea, stars, animals, and finally, on day six, a man and a woman made in God&apos;s image.</p>
            <p>Genesis 2 pulls the camera in close.</p>
            <p>
              This is where <strong>Genesis 2 explained</strong> actually matters, because this
              chapter answers the questions Genesis 1 leaves open.
            </p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ How exactly did God form the first man?</li>
            <li>❓ What was he actually supposed to do in Eden?</li>
            <li>❓ What was the one command he was given?</li>
            <li>❓ And why did God make a woman at all?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              Maybe you clicked over here because someone in your life quoted this chapter to you.
              About marriage. About work. About what it means to be made in God&apos;s image.
            </p>
            <p>And you wanted to see the actual text before you took their word for it.</p>
            <p>Good instinct. That is exactly what we are going to do.</p>
            <p>
              Not a paraphrase. Not the version that gets passed around in memes. The chapter
              itself, walked through in order, so you understand what it actually says and why it
              still matters.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🌍 Where Genesis 2 Fits
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 2 opens by closing out the seven days. God finishes His work, rests on the seventh day, and blesses it.</p>
          <p>
            📌 <strong>Worth pausing on:</strong> a popular claim says Genesis 2 institutes the
            Sabbath. It does not, not yet. The word &quot;Sabbath&quot; never appears, and no one is
            commanded to rest. That command comes later, at Sinai, part of{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">later Scripture</ArticleLink>. Here, God
            simply rests.
          </p>
          <p>
            Then verse 4 turns the camera around. Genesis 1 said humanity was made, male and female,
            on day six, in one summary line. Genesis 2 is not a second, contradicting account. It is
            that same event, slowed down, with the details Genesis 1 skipped. Tradition holds{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink> wrote it down.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Happens in Genesis 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. God Forms Man From Dust and Breathes Life Into Him
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 1 said God created man. Genesis 2 shows you how.</p>
        </div>
        <VerseQuote
          text="And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul."
          reference="Genesis 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two actions. Both intimate.</p>
          <p>
            📌 <strong>God formed him.</strong> The word pictures a potter shaping clay by hand, not
            a word spoken from a distance like the rest of creation.
          </p>
          <p>
            📌 <strong>God breathed into him.</strong> Not into an animal, not into a tree. Into a
            man&apos;s own nostrils, His own breath.
          </p>
          <p>
            That is the difference between dust and a <strong>living soul</strong>. Dust is
            everywhere. The breath of God in it is what made the first man different from
            everything else God had made that week.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. God Plants a Garden and Gives Adam a Job and a Command
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not leave the man standing in an empty field. He plants him a home.</p>
          <p>
            Eden had a tree of life and a tree of the knowledge of good and evil growing in the
            middle of it, and a river flowing out to water it. The chapter does spend several
            verses naming the four rivers that branched from it, but that geography is its own
            study, worth exploring on its own.
          </p>
          <p>What matters for the chapter&apos;s flow is what God gave the man to do there.</p>
        </div>
        <VerseQuote
          text="And the LORD God took the man, and put him into the garden of Eden to dress it and to keep it."
          reference="Genesis 2:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Work is not a punishment in this chapter. It comes before anything ever went wrong.
            Adam had real responsibility in paradise. Tending it, guarding it. That is worth
            noticing before you ever get to a curse.
          </p>
          <p>Then God gives him one command.</p>
        </div>
        <VerseQuote
          text="And the LORD God commanded the man, saying, Of every tree of the garden thou mayest freely eat: But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die."
          reference="Genesis 2:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice how generous this is before it is restrictive. Every tree in the garden was
            open to him. One tree, out of all of them, was fenced off. Freedom was the rule.
            Restriction was the exception.
          </p>
          <p>
            That single command is also the first place Scripture shows a person able to trust God
            with something, or not. Learning to keep a boundary God sets is its own kind of{" "}
            <ArticleLink href="/blog/building-self-control">self control</ArticleLink>, and Genesis
            2 is where that test first appears in the Bible, long before it appears in your own
            life.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. God Creates Eve and Makes Marriage
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Adam names every animal God brings to him. Cattle, birds, every beast of the field.</p>
          <p>And in the middle of all that naming, something is missing.</p>
        </div>
        <VerseQuote
          text="And the LORD God said, It is not good that the man should be alone; I will make him an help meet for him."
          reference="Genesis 2:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Not good&quot; is the first negative statement in the entire Bible.</strong>{" "}
            Everything up to this point was called good, or very good. Aloneness is the first thing
            God names as not good.
          </p>
          <p>
            One popular graphic adds that the rib shows Eve was taken from Adam&apos;s side to
            stand equal beside him, not his head to rule him or his foot to be trampled. That line
            is a well known preaching illustration, not something Genesis 2 itself says.
          </p>
          <p>
            What the text does say is this. No animal, out of everything Adam named, was a fit
            match for him.
          </p>
        </div>
        <VerseQuote
          text="And the LORD God caused a deep sleep to fall upon Adam, and he slept: and he took one of his ribs, and closed up the flesh instead thereof; And the rib, which the LORD God had taken from man, made he a woman, and brought her unto the man."
          reference="Genesis 2:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Adam&apos;s response is the first recorded human words in Scripture.</p>
        </div>
        <VerseQuote
          text="And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man."
          reference="Genesis 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the chapter steps back from the story and states the pattern for every marriage after it.</p>
        </div>
        <VerseQuote
          text="Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh."
          reference="Genesis 2:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Leave, cleave, one flesh. That is the biblical shape of marriage in three words, and{" "}
            <ArticleLink href="/blog/paul">Paul</ArticleLink> quotes this exact verse centuries later
            when he teaches on marriage in the New Testament.
          </p>
          <p>The chapter closes on one final line.</p>
        </div>
        <VerseQuote
          text="And they were both naked, the man and his wife, and were not ashamed."
          reference="Genesis 2:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 No shame yet. No hiding, no blame, no fear. Genesis 2 ends in complete openness
            between the man, the woman, and God. Remembering that is what makes Genesis 3, when it
            all breaks, hit as hard as it does.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ What Genesis 2 Teaches You
        </h2>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>You were formed on purpose, not as an afterthought.</strong> God did not speak
            you into being from a distance. The image is a potter with dust and His own breath.
          </li>
          <li>
            <strong>Work came before sin, so it is not a curse.</strong> Adam had a job in paradise.
            If your work feels meaningless, that is not how it was designed.
          </li>
          <li>
            <strong>A boundary from God is a gift, not a cage.</strong> One tree was off limits out
            of an entire garden that was freely his. Restriction was the exception, not the rule.
          </li>
          <li>
            <strong>You were never meant to do life completely alone.</strong> God said it Himself
            before anything had gone wrong yet. Isolation was the first not good.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Genesis 2 contradict Genesis 1?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Genesis 1 gives the six day overview and states that God made man, male and female,
          on day six. Genesis 2 is not a competing timeline. It zooms into that same sixth day and
          fills in how the man and woman were actually formed. Summary, then detail, same story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the tree of the knowledge of good and evil?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was one specific tree growing in the middle of Eden, alongside the tree of life. God
          commanded Adam not to eat from it, with a clear warning attached. The chapter itself does
          not explain what would have happened if Adam had obeyed forever. It simply records the one
          command and the one warning, and leaves what comes next for Genesis 3.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did God say it was not good for man to be alone?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the first thing in the Bible God calls not good, even though everything He had made
          up to that point was good or very good. Adam had God&apos;s presence and a job, and it
          still was not enough on its own. Human companionship was part of the original design, not
          a fix added after something broke.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does the rib mean Eve was inferior to Adam?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The text calls her an &quot;help meet,&quot; meaning a helper suited to him, matching
          him, not beneath him. Adam himself recognizes her as bone of his bones and flesh of his
          flesh, the language of someone equal in kind, not a lesser creature. The rib shows shared
          origin, not rank.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did Genesis 2 establish the Sabbath?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter opens with God resting on the seventh day and blessing it, but it never uses
          the word Sabbath and gives no command to anyone to keep that day. That specific command to
          Israel comes later, at Mount Sinai. Genesis 2 shows God&apos;s own rest, not yet a law for
          man.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 2 is a short chapter that answers big questions.</p>
          <p>
            📌 <strong>You were formed with intention, given real purpose, handed one clear
            boundary, and never meant to walk through life alone.</strong>
          </p>
          <p>
            That is the picture this chapter paints before anything ever went wrong, and it is
            worth returning to whenever you need to remember what you were actually made for.
          </p>
          <p>
            This chapter comes alive verse by verse inside <strong>Bible Buddy</strong>, and it is
            completely free to start.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If you want to slow down and study Genesis 2, or any chapter, verse by verse, you do
            not have to do it alone.
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
