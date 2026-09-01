import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("men-who-walked-with-god", {
  title: "Every Man Who Walked With God in the Bible: Enoch, Noah, and What It Means",
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

export default function MenWhoWalkedWithGodPage() {
  return (
    <BlogPostShell
      slug="men-who-walked-with-god"
      title={<>📖 Every Man Who Walked With God in the Bible</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably seen the phrase on a pin or a graphic somewhere.</p>
            <p>A short list of men who walked with God in the Bible.</p>
            <p>It sounds simple. It is not as simple as most graphics make it look.</p>
            <p>
              📌 <strong>Scripture only uses the exact words &quot;walked with God&quot; about two
              men in the entire Bible: Enoch and Noah.</strong>
            </p>
            <p>Everyone else you have heard grouped with them lived the same kind of life.</p>
            <p>But the Bible describes their walk with God in different words.</p>
            <p>
              That distinction is not a technicality. It actually tells you more about what walking
              with God means, not less.
            </p>
            <p>
              Here is the full, accurate picture. Who Scripture actually says walked with God, who
              else lived that way in different terms, and what it means for you today.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚶 What &quot;Walked With God&quot; Actually Means
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Walking is not a sprint and it is not standing still.</p>
          <p>It is steady. It is ongoing. It happens one day at a time, in the same direction.</p>
          <p>
            💡 That is exactly what the Hebrew picture behind this phrase carries. Not a single
            dramatic moment with God, but a life spent in step with Him, day after day, for years.
          </p>
          <p>It implies closeness. You do not walk beside a stranger.</p>
          <p>It implies agreement. Amos later asks the question plainly.</p>
          <p>Can two walk together, except they be agreed?</p>
          <p>And it implies obedience. A walk has a direction, and God sets it.</p>
          <p>
            📌 <strong>To walk with God is to live in ongoing, close, obedient relationship with
            Him, not to have one good day with Him and move on.</strong>
          </p>
          <p>With that in mind, look at the only two men the Bible names this way.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 The Two Men Scripture Calls By This Exact Name
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Enoch</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Enoch shows up in one short paragraph in Genesis 5, in the middle of a genealogy.</p>
          <p>Verse after verse says the same thing about the men in that list.</p>
          <p>He lived. He had children. He died.</p>
          <p>Then Enoch breaks the pattern, twice in three verses.</p>
        </div>
        <VerseQuote
          text="And Enoch walked with God after he begat Methuselah three hundred years, and begat sons and daughters:"
          reference="Genesis 5:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three hundred years. Not three hundred good days.</p>
          <p>Then two verses later, Genesis says it again, and something changes.</p>
        </div>
        <VerseQuote
          text="And Enoch walked with God: and he was not; for God took him."
          reference="Genesis 5:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Everyone else in that chapter gets a death notice.</p>
          <p>Enoch does not.</p>
          <p>
            📌 <strong>He was not, for God took him.</strong> Instead of dying, Enoch was taken
            directly by God.
          </p>
          <p>Hebrews looks back at this centuries later and explains it in plain terms.</p>
        </div>
        <VerseQuote
          text="By faith Enoch was translated that he should not see death; and was not found, because God had translated him: for before his translation he had this testimony, that he pleased God."
          reference="Hebrews 11:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the order. The walk with God came first, for three hundred years. The unusual
            ending came after, as the result of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Noah</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Noah is the only other man Scripture describes with this exact phrase.</p>
          <p>His introduction in Genesis 6 uses three separate descriptions in one verse.</p>
        </div>
        <VerseQuote
          text="These are the generations of Noah: Noah was a just man and perfect in his generations, and Noah walked with God."
          reference="Genesis 6:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Just. Perfect in his generations. And walked with God.</p>
          <p>
            📌 Perfect here does not mean sinless. It means complete, whole, undivided in his
            devotion, standing apart from a generation that was not.
          </p>
          <p>And what a generation to stand apart from.</p>
          <p>The verses right before this describe the earth as corrupt and filled with violence.</p>
          <p>
            ⚠️ Noah was not just faithful in private. He kept walking with God while nearly everyone
            around him had stopped entirely.
          </p>
          <p>That walk showed up as action, not just belief.</p>
          <p>God warned him about a flood no one had ever seen, and Noah built a boat on dry land.</p>
        </div>
        <VerseQuote
          text="By faith Noah, being warned of God of things not seen as yet, moved with fear, prepared an ark to the saving of his house; by the which he condemned the world, and became heir of the righteousness which is by faith."
          reference="Hebrews 11:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Walking with God rarely looks dramatic in the moment. It looks like still building
            when nobody else believes you.
          </p>
          <p>
            Noah&apos;s story goes much deeper than these two verses, and the whole chapter is worth
            slowing down for. You can read it verse by verse inside{" "}
            <strong>Bible Buddy</strong>, which is free to use, so there is nothing stopping you from
            starting today.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🤝 Other Faithful Men, Described in Different Words
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is where a lot of graphics blur the line. Other men in Scripture lived the same
            kind of close, obedient life with God.
          </p>
          <p>
            📌 <strong>But the Bible does not use the phrase &quot;walked with God&quot; about
            them.</strong> Their walk is real. The wording is just different, and that difference
            matters if you want to be accurate to the text.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Abraham, called the friend of God</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God tells Abraham directly to walk before Him and be perfect, in Genesis 17:1.</p>
          <p>That is close language, but it is not the same sentence used for Enoch and Noah.</p>
          <p>Later, Scripture gives Abraham a different title entirely.</p>
        </div>
        <VerseQuote
          text="And the scripture was fulfilled which saith, Abraham believed God, and it was imputed unto him for righteousness: and he was called the Friend of God."
          reference="James 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Friend of God. That is Abraham&apos;s label, and it is its own honor.</p>
          <p>
            💡 <ArticleLink href="/blog/moses">Moses</ArticleLink> is described a similar way too,
            as a man the LORD spoke to face to face, as a man speaks to his friend. Different words,
            same closeness.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Micah 6:8 and the broader command</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One more verse gets attached to this topic constantly, and it is worth being careful
            with here.
          </p>
        </div>
        <VerseQuote
          text="He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?"
          reference="Micah 6:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This verse is not naming a man who walked with God like Enoch or Noah. It is a command
            to every reader, telling all of God&apos;s people what He requires.
          </p>
          <p>
            📌 It broadens the phrase from a description of two specific men into an instruction for
            you. Do justly. Love mercy. Walk humbly with your God.
          </p>
          <p>
            Enoch and Noah show you what that command looks like lived out over a lifetime. Micah 6:8
            tells you the same thing is asked of you.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💡 What This Looks Like for You Today
        </h2>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>
            🟢 <strong>Think years, not moments.</strong> Enoch walked with God for three hundred
            years. Your walk is built the same way, one ordinary day connected to the next.
          </li>
          <li>
            🟢 <strong>Start with time, not intensity.</strong> A walk needs consistent time
            together. If you are not sure how to build that rhythm, this guide to{" "}
            <ArticleLink href="/blog/how-to-spend-1-hour-with-god">spending an hour with
            God</ArticleLink> is a real place to start.
          </li>
          <li>
            🟢 <strong>Expect to stand apart sometimes.</strong> Noah kept walking with God while
            his whole generation had stopped. Faithfulness will occasionally look out of step with
            everyone around you, and that is not a bad sign.
          </li>
          <li>
            🟢 <strong>Let obedience be the proof, not just the feeling.</strong> Noah did not just
            believe God about the flood. He built the ark. A real walk with God shows up in what you
            actually do.
          </li>
          <li>
            🟢 <strong>Read the source, not just the summary.</strong> A pin or a quote graphic can
            point you here, but it cannot replace reading it yourself. If Genesis feels intimidating,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> is a
            good place to build that habit.
          </li>
          <li>
            🟢 <strong>Name what actually breaks your consistency.</strong> For most men it is not
            unbelief, it is drift. This piece on the{" "}
            <ArticleLink href="/blog/5-things-holding-men-back-from-god">five things holding men
            back from God</ArticleLink> names the usual culprits plainly, so you can deal with the
            real one instead of a vague sense of failure.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Who walked with God in the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Only two men are described with the exact phrase &quot;walked with God&quot;: Enoch
          (Genesis 5:22 and 5:24) and Noah (Genesis 6:9). Other men, like Abraham and Moses, are
          described as close to God in different language, such as being called His friend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What does it mean that Enoch walked with God and was not?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means Enoch did not die like everyone else in his family line. Genesis says God took
          him, and Hebrews 11:5 explains that he was translated so that he would not see death. His
          three hundred years of walking with God came before that, not after it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Was Noah the only righteous man before the flood?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 6:9 calls Noah just and perfect in his generations, standing out from a world
          Scripture describes as corrupt and full of violence. The text does not claim every other
          person on earth was individually evil in every action, but it is clear Noah&apos;s
          household was the one God chose to save.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is Abraham called a man who walked with God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not in those exact words. God tells Abraham to walk before Him in Genesis 17:1, and James
          2:23 calls him the Friend of God. Both describe a close relationship with God, but the
          Bible reserves the specific phrase &quot;walked with God&quot; for Enoch and Noah alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does &quot;walk humbly with thy God&quot; in Micah 6:8 refer to a specific man?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Micah 6:8 is a command given to every reader, not a description of one historical
          figure. It uses similar walking language to explain what God requires of anyone who wants
          to live rightly: justice, mercy, and humility before Him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How can I start walking with God today?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Start the way Enoch and Noah did, with ordinary consistency rather than one dramatic
          moment. Set aside real time with God, obey what He shows you even when it costs something,
          and keep going the next day. Reading Scripture for yourself, a little at a time, is where
          that habit actually takes root, and over time it shows up as{" "}
          <ArticleLink href="/blog/what-is-the-fruit-of-the-spirit">the fruit of the
          Spirit</ArticleLink> in how you actually live.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Only two men in the whole Bible get this exact description.</p>
          <p>Enoch, for three hundred years. Noah, while an entire generation walked away.</p>
          <p>
            Abraham, Moses, and everyone else who lived close to God did it under different words,
            and that is worth being honest about instead of flattening every faithful life into one
            phrase.
          </p>
          <p>
            📌 <strong>What ties all of them together is not the wording. It is the pattern.</strong>
          </p>
          <p>Close relationship. Ongoing obedience. One day connected to the next.</p>
          <p>
            That is not a life reserved for two men in Genesis. Micah 6:8 puts it in front of every
            reader, including you, right now.
          </p>
          <p>
            ❓ <strong>What would it look like for your life to be described that way?</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This overview covers the whole picture, but Genesis 5 and 6 have far more to unpack than
            one article can hold. Inside <strong>Bible Buddy</strong>, you can walk through Enoch and
            Noah&apos;s chapters verse by verse and see exactly how each detail connects.
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
