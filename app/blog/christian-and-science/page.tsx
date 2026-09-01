import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("christian-and-science", {
  title: "Can You Be a Christian and Believe in Science? An Honest Answer",
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

export default function CanYouBeAChristianAndBelieveInSciencePage() {
  return (
    <BlogPostShell
      slug="christian-and-science"
      title={<>📖 Can You Be a Christian and Believe in Science? An Honest Answer</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somewhere along the way, someone made you feel like you had to pick a side.</p>
            <p>Faith or facts.</p>
            <p>The Bible or the lab.</p>
            <p>Church on Sunday or the periodic table on Monday.</p>
            <p>
              Maybe it was a professor who rolled his eyes when you mentioned church. Maybe it was
              a pastor who made your biology textbook sound like the enemy.
            </p>
            <p>
              📌 <strong>Here is the honest answer, right up front. Yes. You can be a Christian
              and believe in science. Millions of serious scientists always have.</strong>
            </p>
            <p>Christianity and science were never supposed to be enemies.</p>
            <p>That is not a dodge. That is not a &quot;both sides&quot; answer to keep everyone comfortable.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🔲 Choose the faith your family raised you in.</li>
            <li>🔲 Choose the field you have worked years to get into.</li>
            <li>🔲 Pick one, and quietly grieve the other.</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              That is a false choice. And it has talked a lot of good, honest, thinking Christians
              out of both their faith and their curiosity.
            </p>
            <p>Here is what might surprise you.</p>
            <p>
              Some of the sharpest minds who ever studied the natural world were devoted believers.
              Not in spite of their science. Because of it.
            </p>
            <p>
              This guide will walk you through why the &quot;war&quot; between faith and science is
              newer than you have probably been told, how to read Genesis honestly, the different
              ways faithful Christians understand creation, and what actually has to be true for
              your faith to stand.
            </p>
            <p>You do not have to check your brain at the door of the church.</p>
            <p>And you do not have to check your Bible at the door of the lab.</p>
            <p>Let&apos;s walk through why.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚖️ Why This Question Weighs on You
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not really a question about biology or the Big Bang.</p>
          <p>It is a question about whether you belong.</p>
          <p>
            Maybe you are the only Christian in your research group, and you have learned to stay
            quiet when the conversation turns to origins.
          </p>
          <p>
            Maybe you are the only person in your small group who has ever taken a real interest in
            the age of rocks, and it feels like a suspicious hobby.
          </p>
          <p>
            ⚠️ <strong>Both worlds have, at times, told you that curiosity and faith cannot share
            the same head.</strong>
          </p>
          <p>Some scientists talk as if belief in God is a leftover superstition science will replace.</p>
          <p>Some churches talk as if scientific questions are the first step toward walking away from God.</p>
          <p>Neither one is telling you the truth.</p>
          <p>
            Part of learning{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith
            </ArticleLink>{" "}
            is learning you do not need to defend it by pretending your questions do not exist.
          </p>
          <p>
            The stakes are not small. Your career, your family, your church, and your own sense of
            whether you can trust your mind are all wrapped up in this one question.
          </p>
          <p>
            📌 <strong>You get to be a whole person. Thinking and believing were never meant to
            live in separate rooms.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔭 Why Faith and Science Were Never Really at War
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Yes, You Can Believe Both</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start with the plain answer again, because it deserves more than one line.</p>
          <p>Yes.</p>
          <p>
            You can run experiments on Monday and sing hymns on Sunday. You can love data and love
            the God who, Christians believe, designed the world the data describes.
          </p>
          <p>
            📌 <strong>Some of the founders of modern science were serious, convinced
            believers.</strong>
          </p>
          <p>
            <strong>Isaac Newton</strong>, who gave the world the laws of motion and gravity, wrote
            far more about theology and Scripture than he ever wrote about physics.
          </p>
          <p>
            <strong>Johannes Kepler</strong>, who worked out how the planets actually move, once
            described his discoveries as thinking God&apos;s thoughts after Him.
          </p>
          <p>
            <strong>Gregor Mendel</strong>, the monk whose pea plants laid the foundation for
            modern genetics, did his groundbreaking work in a monastery garden.
          </p>
          <p>
            And this is not only history. <strong>Francis Collins</strong>, who led the Human
            Genome Project, has written openly about coming to faith in Christ as an adult
            scientist studying the evidence in front of him.
          </p>
          <p>
            These were not people doing science quietly despite their faith. For many of them,
            studying creation was an act of worship, a way of tracing the handiwork of the God
            they already believed in.
          </p>
          <p>
            ❓ If some of the best scientific minds in history saw no contradiction, why would you
            assume there has to be one?
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A Newer Fight Than You Think</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is something worth knowing. The idea that science and faith have always been at
            war is a fairly recent story, and a shallower one than it gets credit for.
          </p>
          <p>
            For most of the last several centuries, the people doing the world&apos;s leading
            scientific work were largely doing it inside a Christian framework, not against one,
            believing the universe was orderly because a rational God made it that way.
          </p>
          <p>
            The popular picture of scientists and believers locked in a centuries long war owes a
            lot to a handful of 19th century books written to push that narrative, more than it
            owes to an honest reading of history.
          </p>
          <p>That does not mean there have never been real disagreements. There have.</p>
          <p>
            But &quot;faith and science have always been enemies&quot; is a story, not a fact. You
            do not have to organize your whole life around a story that is not true.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Reading Genesis Honestly</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>So if faith and science are not enemies, what do you do with Genesis 1 and 2?</p>
          <p>Start here.</p>
          <p>
            Genesis was written to an ancient audience, in the ancient world&apos;s way of talking
            about origins, not in the language of a modern lab report.
          </p>
          <p>
            That does not make it less true. It means you have to ask what kind of truth it is
            claiming to tell you.
          </p>
          <p>
            Read plainly, Genesis is not competing with a biology class. It is a theological
            claim, standing at the front of the whole Bible, making a few enormous statements.
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🟢 God created everything that exists. Nothing made itself.</li>
          <li>🟢 What God made was good.</li>
          <li>🟢 Human beings, uniquely, bear His image.</li>
        </ul>
        <p className="mt-5 text-lg leading-8 text-slate-700">Scripture states the first claim in its very first verse:</p>
        <VerseQuote
          text="In the beginning God created the heaven and the earth."
          reference="Genesis 1:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">And the third claim, a few verses later:</p>
        <VerseQuote
          text="So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Those two truths, that God made everything and that you specifically carry His image,
            do not depend on settling every detail of how or exactly how long.
          </p>
          <p>
            Here is where thoughtful, Bible believing scholars genuinely disagree, and where this
            guide will not pretend there is a quiet consensus.
          </p>
          <p>
            They disagree on how literally to read the timeframe of Genesis 1. They disagree on
            the exact mechanism God used to form the first humans. They agree completely that He
            did it, on purpose, and that it was good.
          </p>
          <p>
            💡 The most important sentence in Genesis 1 might be the shortest one. God said it was
            good. Not an accident. Not chaos figuring itself out. Intended.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Three Main Christian Views on Creation
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the part where a lot of guides pick a side and call the other views compromise.</p>
          <p>This guide will not do that.</p>
          <p>
            ⚠️ <strong>Sincere, Bible believing Christians land in different places on this
            question, and have for a long time.</strong>
          </p>
          <p>
            You should know the main positions so you can think clearly, not so you can be talked
            into one before you understand any of them.
          </p>
          <p>
            📌 <strong>Young Earth Creationism.</strong> God created the universe and everything
            in it in six ordinary days, in the relatively recent past. Christians who hold this
            view believe it takes Genesis 1 at its most straightforward, plain reading, and they
            consider that faithfulness to the text, not a rejection of science.
          </p>
          <p>
            📌 <strong>Old Earth Creationism.</strong> The universe and the earth are genuinely
            old. Christians who hold this view accept the ancient timeline mainstream science
            describes, while still holding that God directly and specially created life, and
            specially created the first humans, rather than leaving it to unguided natural
            processes.
          </p>
          <p>
            📌 <strong>Evolutionary Creation, sometimes called Theistic Evolution.</strong> God
            used the process of evolution, over long ages, as His chosen means of bringing about
            life, including human life. Christians who hold this view see evolution the way they
            see gravity or embryology, a natural process God designed and sustains, not a rival
            explanation that replaces Him.
          </p>
          <p>Three different answers to how and when. One shared answer to who and why.</p>
          <p>
            📌 <strong>This article is not going to tell you which of these three is
            correct.</strong> Faithful, careful, Bible loving Christians, including respected
            pastors, scientists, and theologians, hold each of these three positions in good
            conscience.
          </p>
          <p>
            If you feel pressure from your church to land on one answer before you have thought it
            through, or pressure from your lab to treat belief in a Creator as automatically
            unscientific, both pressures are asking you to skip a step that deserves real thought.
          </p>
          <p>
            Take the time. Read. Ask people you trust in more than one camp. This is not a hill
            worth losing your peace, or your friendships, over.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Actually Matters, No Matter Which View You Hold
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here is a test worth applying. Ask what has to be true for the gospel to stand, and
            what is a secondary question you can hold with an open hand.
          </p>
          <p>These are not secondary. Christians across every creation view affirm them together.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>✅ God created intentionally. The universe is not an accident.</li>
          <li>✅ Humanity bears God&apos;s image, and that gives every person real worth.</li>
          <li>
            ✅ <ArticleLink href="/blog/what-is-the-bible">The Bible is trustworthy</ArticleLink>,
            telling the truth about who God is and who you are.
          </li>
        </ul>
        <p className="mt-5 text-lg leading-8 text-slate-700">Paul made the case that creation itself points back to its Maker:</p>
        <VerseQuote
          text="For the invisible things of him from the creation of the world are clearly seen, being understood by the things that are made, even his eternal power and Godhead; so that they are without excuse:"
          reference="Romans 1:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Notice what that verse does not do. It does not settle the age of the earth. It settles who is behind it.</p>
          <p>
            Now compare that to the secondary questions. Exactly how old the earth is, and exactly
            what mechanism God used to form the first humans, are important questions worth
            studying carefully. But they are not the hinge your faith swings on.
          </p>
          <p>
            📌 <strong>The resurrection of Jesus is the hinge your faith swings on. Not your
            position on Genesis.</strong>
          </p>
          <p>
            If you have never settled{" "}
            <ArticleLink href="/blog/how-do-you-know-you-are-saved">
              whether you actually know you are saved
            </ArticleLink>
            , that question deserves your attention far more urgently than the age of the earth
            does.
          </p>
          <p>Keep the main thing the main thing, and you can hold the secondary questions with curiosity instead of fear.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. You Do Not Have to Choose Anymore</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you have spent years quietly feeling like a traitor to one side or the other, hear this clearly.</p>
          <p>
            📌 <strong>You are allowed to breathe easier.</strong>
          </p>
          <p>
            You do not have to leave your faith at the lab door, and you do not have to leave your
            mind at the church door.
          </p>
          <p>
            Some of your questions may take years to work through. That is fine. God is not
            intimidated by your questions, and He is not waiting for you to stop asking before He
            will still call you His.
          </p>
          <p>
            Whatever field you are in, and whatever conclusion you eventually land on about
            creation, you can stay exactly where you are. A Christian, and a thinking person, at
            the very same time.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🧭 Practical Tips for Living With an Honest Faith and an Honest Mind
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Living with real questions is not the same as living without a foundation.</p>
          <p>
            Here are eight habits that will help you stay grounded while you keep learning, whether
            you are a student, a professional, or just tired of feeling stuck between two worlds.
          </p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Study both, honestly.</strong> Do not skip the hard chapters of Genesis, and do
            not skip the hard chapters of your textbook. Reading only what confirms what you
            already believe is not faith. It is avoidance.
          </li>
          <li>
            <strong>Separate the gospel from the debate.</strong> Get clear in your own mind that
            your salvation does not depend on winning an argument about origins. That clarity will
            keep you calm in conversations that would otherwise rattle you.
          </li>
          <li>
            <strong>Talk to real people, not just headlines.</strong> Find Christians in your field
            who hold a different creation view than you expected, and actually listen to how they
            got there before you decide they are wrong.
          </li>
          <li>
            <strong>Do not let one loud voice define a whole group.</strong> An outspoken atheist
            online, or one overly certain pastor, is not the entire scientific community, and not
            the whole church.{" "}
            <ArticleLink href="/blog/why-so-many-denominations">
              Christians have disagreed honestly about secondary questions
            </ArticleLink>{" "}
            for a long time, and the church has survived every one.
          </li>
          <li>
            <strong>Read one serious book outside your current view.</strong> Pick something
            written by a thoughtful Christian who holds a different position than you, and read it
            charitably before you argue with it.
          </li>
          <li>
            <strong>Keep worship going while you think.</strong> Do not wait for perfect
            intellectual certainty to keep praying and{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">
              opening your Bible
            </ArticleLink>
            . Faith was never meant to wait on the sidelines until every question closes.
          </li>
          <li>
            <strong>Watch for pride on every side.</strong> Certainty can be pride in disguise, and
            so can cynicism. Both can make you feel smarter than the people who disagree with you.
            Neither one makes you right.
          </li>
          <li>
            <strong>Give yourself permission to say &quot;I do not know yet.&quot;</strong> That is
            not unbelief. That is honesty. God has never once been threatened by an honest
            question.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Christianity and Science
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>You could study these questions for a lifetime.</p>
          <p>But if you want a place to start, start with these five verses.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 1:1</h3>
        <VerseQuote
          text="In the beginning God created the heaven and the earth."
          reference="Genesis 1:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ten words. Arguably the most important sentence in the history of ideas.</p>
          <p>Before there is a law, a promise, or a character in Scripture, there is a Creator and a creation.</p>
          <p>
            This is the verse to return to when the debate about mechanism has swallowed the
            point. Something did not come from nothing on its own. Someone made it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 1:27</h3>
        <VerseQuote
          text="So God created man in his own image, in the image of God created he him; male and female created he them."
          reference="Genesis 1:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whatever your view on how humanity came to be, this verse tells you why humanity matters.</p>
          <p>You are not an accident of chemistry that eventually learned to ask questions.</p>
          <p>You carry the image of the God who made the questions worth asking in the first place.</p>
          <p>That truth does not shift no matter which creation view you hold. It is the floor every position stands on.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Psalm 19:1 and 2</h3>
        <VerseQuote
          text="The heavens declare the glory of God; and the firmament sheweth his handywork. Day unto day uttereth speech, and night unto night sheweth knowledge."
          reference="Psalm 19:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>David wrote this thousands of years before telescopes.</p>
          <p>He looked up and saw a message. Not silence. Not randomness. Speech.</p>
          <p>
            Every field of science that studies the sky, the earth, or the human body is, in a
            sense, reading the message this verse describes in finer and finer detail.
          </p>
          <p>The instrument keeps changing. The message does not.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Colossians 1:16 and 17</h3>
        <VerseQuote
          text="For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him: And he is before all things, and by him all things consist."
          reference="Colossians 1:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is not talking about the church in this verse. He is talking about the universe.</p>
          <p>Every law of physics that holds the world together, this verse says, holds together in Christ.</p>
          <p>Studying how the universe works is not a rival project to studying who holds it together. It is the same universe.</p>
          <p>Gravity did not stop needing Him the day someone finally wrote an equation for it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Proverbs 25:2</h3>
        <VerseQuote
          text="It is the glory of God to conceal a thing: but the honour of kings is to search out a matter."
          reference="Proverbs 25:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This might be the most freeing verse in this whole guide.</p>
          <p>God hides things in creation on purpose. And He calls searching them out an honor, not a threat.</p>
          <p>
            Every honest experiment, every careful measurement, every late night in a lab chasing
            down an answer, can be an act of the very thing this verse describes.
          </p>
          <p>Curiosity is not the enemy of worship. In this verse, it looks a lot like worship.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Christianity and Science
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can you be a Christian and believe in evolution?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Many Christians hold evolutionary creation, believing God used evolutionary
          processes as His means of creating life. Others hold to a more direct, special creation
          instead. Both groups affirm that God created intentionally and that humanity bears His
          image, and this article does not take a side between them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is the Big Bang compatible with the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many old earth Christians see the Big Bang as fitting well with &quot;In the beginning
          God created,&quot; a universe with a definite start. Christians who hold a young earth
          view instead understand Genesis to describe a much shorter, more recent creation.
          Sincere, Bible believing Christians land on both sides of this question.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Do you have to believe in a literal six day creation to be a Christian?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Thoughtful, Bible believing scholars have long held different views on how literally
          to read the six days of Genesis 1. What they agree on is that God created everything, on
          purpose, and that it was good. Your salvation rests on Christ, not on your position on
          the length of a day in Genesis 1.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between young earth and old earth creationism?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Young earth creationism holds that God created everything in six ordinary days, in the
          relatively recent past. Old earth creationism accepts an ancient universe and earth,
          while still holding that God directly and specially created life and humanity. Both are
          held today by faithful, careful Christians.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is theistic evolution, or evolutionary creation?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the view that God used evolution over long ages as His chosen means of bringing
          about life, including human life. Christians who hold this view see evolution as a
          natural process God designed and sustains, not a rival explanation that removes Him from
          the picture. It is one of the three main Christian positions on creation, alongside
          young earth and old earth creationism.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did many famous scientists actually believe in God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Isaac Newton, Johannes Kepler, and Gregor Mendel were serious believers who saw
          their scientific work as an exploration of God&apos;s creation. In modern times, Francis
          Collins, who led the Human Genome Project, has spoken openly about his faith. Believing
          in God has never been incompatible with rigorous, respected science.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is science trying to disprove God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Science as a method studies the natural world through observation and testing. It cannot
          weigh in on whether a Creator stands behind that world, because that question sits
          outside what the method measures. Some individual scientists are outspoken atheists, and
          some are committed believers. The method itself is neutral, even when scientists are
          not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          How old is the earth according to the Bible?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not give a scientific date for the earth&apos;s age, and faithful
          Christians read the evidence differently. Some, working from the genealogies, land on a
          relatively young earth. Others accept the ancient timeline mainstream science describes.
          The Bible is far more concerned with who created the earth and why than with its exact
          age.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Can I disagree with my church about creation and still belong?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Creation views are a secondary issue, not a test of salvation. Plenty of solid,
          Bible teaching churches include members who hold different positions on young earth, old
          earth, and evolutionary creation. If yours treats one view as a requirement for
          fellowship, that is worth a gentle, honest conversation with your pastor.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Where do I start if I want to study this more?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Start with the text itself. Read Genesis 1 and 2 slowly, more than once, before reading
          anyone&apos;s opinion about it. Then find one honest, well written book from each of the
          three main views and read them side by side. You are not looking for the view with the
          loudest defenders, but the one you can hold with a clear conscience before God.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Yes, you can be a Christian and believe in science.</strong> Newton, Kepler,
            Mendel, and Francis Collins are proof enough that a serious mind and a sincere faith
            were never enemies.
          </p>
          <p>
            📌 <strong>Genesis makes theological claims, and sincere Christians read its details
            differently.</strong> Young earth, old earth, and evolutionary creation are all held by
            faithful believers, and this guide will not tell you which one is right.
          </p>
          <p>
            📌 <strong>What matters most does not change no matter which view you hold.</strong>{" "}
            God created intentionally, you bear His image, and the Bible is trustworthy.
          </p>
          <p>You do not have to resolve every question about origins before you can trust God with your life.</p>
          <p>You just have to keep showing up. To the text. To the questions. To Him.</p>
          <p>So here is your one next step.</p>
          <p>
            Open Genesis 1 tonight and read it slowly, the way you would read it if no one had ever
            told you it was controversial.
          </p>
          <p>Let it say what it actually says.</p>
          <p>And bring your honest questions to the God who was never afraid of them.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If wrestling with the hard questions makes it difficult to know where to even start in
            Scripture, you do not have to figure it out alone.
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
