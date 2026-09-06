import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-were-martha-and-mary", {
  title: "Who Were Martha and Mary of Bethany? The Sisters Who Saw Jesus Cry",
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

export default function WhoWereMarthaAndMaryPage() {
  return (
    <BlogPostShell
      slug="who-were-martha-and-mary"
      title={<>📖 Who Were Martha and Mary of Bethany? The Sisters Who Saw Jesus Cry</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two sisters loved Jesus with everything they had.</p>
            <p>They just did not love Him the same way.</p>
            <p>One sister ran to the kitchen the moment He walked through the door.</p>
            <p>The other sister sat down on the floor and listened.</p>
            <p>Then their brother got sick. Then he died.</p>
            <p>
              📌 <strong>Both sisters stood at that grave asking the exact same question. Where was
              Jesus when we needed Him?</strong>
            </p>
            <p>Maybe you already know which sister you are.</p>
            <p>
              Maybe you are the one who cooks, plans, and serves, and quietly wonders if anyone
              notices how tired you are.
            </p>
            <p>
              Or maybe you are the one who would rather sit still and listen, and you feel guilty for
              not doing more.
            </p>
            <p>
              ❓ <strong>Have you ever wondered if the way you love God is the wrong way?</strong>
            </p>
            <p>Martha and Mary both wrestled with that, without ever saying it out loud.</p>
            <p>
              This is the full story of Martha and Mary of Bethany, told in order, straight from the
              text. Their home in Bethany. The day Martha got frustrated with her sister. The death of
              their brother Lazarus. The tears Jesus cried at his grave. The miracle that followed. And
              the costly, strange, beautiful thing Mary did with a jar of perfume that Jesus said the
              world would never forget.
            </p>
            <p>Let&apos;s start with who these two women actually were.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🕰️ Who Martha and Mary Were
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Martha and Mary were sisters who lived in a small village called Bethany, about two
            miles outside Jerusalem.
          </p>
          <p>They had a brother named Lazarus, and the three of them shared a home there.</p>
          <p>
            📌 Jesus loved this family. Scripture says so in plain words, and He stayed at their
            house more than once during His ministry.
          </p>
          <p>
            Their story appears in three places: <strong>Luke 10</strong>, and <strong>John 11 and
            12</strong>. Luke shows us a normal afternoon in their home. John shows us the hardest
            week of their lives.
          </p>
          <p>
            Martha is usually named first, which in that culture often meant she was the older
            sister, or perhaps the one who owned the house. Whatever the reason, she is the one who
            answers the door and runs the kitchen.
          </p>
          <p>
            Mary is the quieter one on the page. She speaks only a handful of words in the entire
            Bible, but what she does speaks louder than words ever could.
          </p>
          <p>
            💡 Neither sister is ever called Jesus&apos; disciple in the way the twelve men who
            traveled with Him are. But they were something just as real. They were His friends, in a
            home He could actually rest in.
          </p>
          <p>Now let&apos;s walk through what actually happened.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Their Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. One Sister Serves, One Sister Sits
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first time we meet these sisters, Jesus has just arrived at their village.</p>
        </div>
        <VerseQuote
          text="Now it came to pass, as they went, that he entered into a certain village: and a certain woman named Martha received him into her house."
          reference="Luke 10:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Martha is the one who opens her home to Him. That is not a small thing. Feeding and
            housing a traveling teacher and likely His followers took real work.
          </p>
        </div>
        <VerseQuote
          text="And she had a sister called Mary, which also sat at Jesus' feet, and heard his word."
          reference="Luke 10:39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            While Martha is busy in the kitchen, Mary sits down at Jesus&apos; feet, the position of
            a student learning from a teacher.
          </p>
          <p>
            📌 In that culture, sitting at a rabbi&apos;s feet to learn was almost always something
            only men did. Mary sat there anyway, and Jesus let her stay.
          </p>
          <p>Martha kept working. And the work kept piling up.</p>
        </div>
        <VerseQuote
          text="But Martha was cumbered about much serving, and came to him, and said, Lord, dost thou not care that my sister hath left me to serve alone? bid her therefore that she help me."
          reference="Luke 10:40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Cumbered means pulled in every direction, weighed down, distracted. Martha was not lazy
            or petty. She was exhausted, and she felt alone in it.
          </p>
          <p>
            ⚠️ Notice what she actually says to Jesus. Not just come tell my sister to help. She
            says, dost thou not care. That is the sound of a tired heart, not just a tired body.
          </p>
          <p>
            💡 If you have ever felt invisible while you served, notice that Martha said that exact
            feeling out loud, to Jesus Himself, and He did not scold her for saying it.
          </p>
          <p>Jesus answered her gently, but honestly.</p>
        </div>
        <VerseQuote
          text="And Jesus answered and said unto her, Martha, Martha, thou art careful and troubled about many things: But one thing is needful: and Mary hath chosen that good part, which shall not be taken away from her."
          reference="Luke 10:41 and 42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Saying her name twice is a sign of tenderness, not anger. Martha, Martha.</p>
          <p>
            📌 <strong>Jesus never says Martha&apos;s serving was wrong. He says she was careful and
            troubled about many things, when only one thing was needed in that moment.</strong>
          </p>
          <p>
            Mary had chosen the good part, and Jesus said it would not be taken from her. He did not
            say Martha&apos;s part was bad. He said Mary&apos;s choice, in that moment, was the
            better one.
          </p>
          <p>
            ❓ If you have ever felt anxious trying to manage everything at once, you are not alone
            in that feeling. You can read more in{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">
              what the Bible says about anxiety
            </ArticleLink>
            .
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Brother Falls Sick, and Jesus Waits
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Some time later, their brother Lazarus became seriously ill. The sisters knew exactly
            who to call.
          </p>
        </div>
        <VerseQuote
          text="Now a certain man was sick, named Lazarus, of Bethany, the town of Mary and her sister Martha."
          reference="John 11:1"
        />
        <VerseQuote
          text="Therefore his sisters sent unto him, saying, Lord, behold, he whom thou lovest is sick."
          reference="John 11:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice how they describe Lazarus. Not just our brother. He whom thou lovest. They were
            confident enough in Jesus&apos; love for this family to say it plainly.
          </p>
          <p>Then the Bible tells us something remarkable, right before the hardest part.</p>
        </div>
        <VerseQuote text="Now Jesus loved Martha, and her sister, and Lazarus." reference="John 11:5" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Scripture states it directly. Jesus loved this family. Full stop.</strong>
          </p>
          <p>Then comes the verse that has confused readers for two thousand years.</p>
        </div>
        <VerseQuote
          text="When he had heard therefore that he was sick, he abode two days still in the same place where he was."
          reference="John 11:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            He loved them, and He stayed put anyway. Two more days passed while Lazarus got worse
            and then died.
          </p>
          <p>
            ⚠️ This is one of the hardest verses in this whole story to sit with. Jesus&apos; love
            for this family did not mean an instant rescue. It meant something the sisters could not
            see yet.
          </p>
          <p>
            💡 If you have ever wondered why God allows suffering to run its course instead of
            stopping it right away, this family lived that question before you did. It is worth
            reading{" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">
              why God allows suffering
            </ArticleLink>{" "}
            if that question is sitting heavy on you right now.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Martha Runs to Meet Him on the Road
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>By the time Jesus finally arrived in Bethany, Lazarus had already been buried.</p>
        </div>
        <VerseQuote
          text="Then when Jesus came, he found that he had lain in the grave four days already."
          reference="John 11:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 Four days mattered to the people watching this story unfold. Many Jewish people at
            that time believed a person&apos;s spirit stayed near the body for three days. By day
            four, there was no doubt left. Lazarus was truly, completely gone.
          </p>
          <p>
            Friends and neighbors had come from Jerusalem to sit with the grieving sisters, as was
            the custom. Then word came that Jesus was on His way.
          </p>
        </div>
        <VerseQuote
          text="Then Martha, as soon as she heard that Jesus was coming, went and met him: but Mary sat still in the house."
          reference="John 11:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            True to who she is, Martha gets up and moves toward Him. And true to who she is, Mary
            stays where she is.
          </p>
          <p>Then Martha says one of the most honest sentences in the whole Bible.</p>
        </div>
        <VerseQuote
          text="Then said Martha unto Jesus, Lord, if thou hadst been here, my brother had not died. But I know, that even now, whatsoever thou wilt ask of God, God will give it thee."
          reference="John 11:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Lord, if thou hadst been here, my brother had not died.</strong> That is not a
            polite greeting. That is grief and a little bit of blame, spoken straight to His face.
          </p>
          <p>
            📌 <strong>And in the very next breath, she still says, I know God will give you
            whatever you ask.</strong> Grief and faith, held together in the same sentence.
          </p>
          <p>Jesus answers her with a promise.</p>
        </div>
        <VerseQuote text="Jesus saith unto her, Thy brother shall rise again." reference="John 11:23" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martha answers like a woman with good, correct theology and a broken heart.</p>
        </div>
        <VerseQuote
          text="Martha saith unto him, I know that he shall rise again in the resurrection at the last day."
          reference="John 11:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            She believed in the resurrection at the end of time. That was standard Jewish teaching.
            What she did not yet see was standing right in front of her.
          </p>
        </div>
        <VerseQuote
          text="Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die. Believest thou this?"
          reference="John 11:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jesus was not only talking about someday. He was saying, that promise is
            standing right in front of you, right now.</strong>
          </p>
          <p>Martha&apos;s answer is one of the clearest confessions of faith in the entire Bible.</p>
        </div>
        <VerseQuote
          text="She saith unto him, Yea, Lord: I believe that thou art the Christ, the Son of God, which should come into the world."
          reference="John 11:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>Martha said this before Lazarus was raised. Before she saw the miracle. She
            believed first, and saw second.</strong>
          </p>
          <p>
            The woman we usually remember for being cumbered about much serving is the same woman
            who spoke one of the boldest statements of faith in Scripture, in the middle of the worst
            week of her life.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Mary Falls at His Feet, and Jesus Weeps
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After talking with Martha, Jesus called for Mary.</p>
        </div>
        <VerseQuote
          text="Then when Mary was come where Jesus was, and saw him, she fell down at his feet, saying unto him, Lord, if thou hadst been here, my brother had not died."
          reference="John 11:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Mary says the exact same words her sister said. Same grief, same ache, same question.
            But Mary says it on her knees at His feet, the same place we first found her back in
            Luke 10.
          </p>
          <p>Jesus does not answer her with a theology lesson. He responds with His whole heart.</p>
        </div>
        <VerseQuote
          text="When Jesus therefore saw her weeping, and the Jews also weeping which came with her, he groaned in the spirit, and was troubled, And said, Where have ye laid him? They said unto him, Lord, come and see."
          reference="John 11:33 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then comes the shortest verse in the entire Bible, and one of the most human.</p>
        </div>
        <VerseQuote text="Jesus wept." reference="John 11:35" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jesus already knew He was about to raise Lazarus from the dead. He wept
            anyway.</strong>
          </p>
          <p>
            💡 God, in the flesh, standing feet away from a miracle He was about to perform, still
            let Himself cry over the grief of people He loved.
          </p>
          <p>
            ❓ <strong>Why cry if you already know the ending will be good?</strong> Because sorrow
            is real even when hope is real too. Jesus did not need to grieve for information. He
            grieved because He loved them, and death is an enemy even to the God who is about to
            defeat it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Lazarus, Come Forth
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus walked to the tomb, a cave with a stone across the entrance.</p>
        </div>
        <VerseQuote
          text="Jesus said, Take ye away the stone. Martha, the sister of him that was dead, saith unto him, Lord, by this time he stinketh: for he hath been dead four days."
          reference="John 11:39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Even after everything Martha had just confessed, she still spoke up with the hard,
            practical truth. Four days in that climate meant real decay. Faith did not erase her
            common sense.
          </p>
          <p>Jesus reminded her of what He had already told her.</p>
        </div>
        <VerseQuote
          text="Jesus saith unto her, Said I not unto thee, that, if thou wouldest believe, thou shouldest see the glory of God?"
          reference="John 11:40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>They removed the stone. Jesus prayed out loud, for the sake of the crowd watching.</p>
        </div>
        <VerseQuote
          text="And when he thus had spoken, he cried with a loud voice, Lazarus, come forth. And he that was dead came forth, bound hand and foot with graveclothes: and his face was bound about with a napkin. Jesus saith unto them, Loose him, and let him go."
          reference="John 11:43 and 44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>A man dead four days walked out of his own grave at the sound of Jesus&apos;
            voice.</strong>
          </p>
          <p>
            📌 The One who wept at that tomb is the same One who had the power to empty it. Grief
            and power were never opposites in Jesus. They stood side by side at the same grave.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. A Supper, a Jar of Perfume, and a Costly Gift
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Some time later, Jesus came back to Bethany, six days before the Passover, the yearly
            Jewish feast remembering God rescuing His people out of Egypt.
          </p>
        </div>
        <VerseQuote
          text="There they made him a supper; and Martha served: but Lazarus was one of them that sat at the table with him."
          reference="John 12:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Martha is still Martha. She is still serving. Notice this time nobody is arguing about
            it. She had learned, or maybe just stayed exactly herself in the way that honored God.
          </p>
          <p>Then Mary did something nobody at that table expected.</p>
        </div>
        <VerseQuote
          text="Then took Mary a pound of ointment of spikenard, very costly, and anointed the feet of Jesus, and wiped his feet with her hair: and the house was filled with the odour of the ointment."
          reference="John 12:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 A pound of pure spikenard was worth close to a year&apos;s wages for an ordinary
            worker. This was not a small gift. It may have been Mary&apos;s entire savings.
          </p>
          <p>
            She poured it on His feet and wiped it with her hair, something a respectable woman in
            that culture simply did not do in public. She did not care. Not one person besides Jesus
            mattered to her in that room.
          </p>
          <p>Not everyone thought it was beautiful.</p>
        </div>
        <VerseQuote
          text="Then saith one of his disciples, Judas Iscariot, Simon's son, which should betray him, Why was not this ointment sold for three hundred pence, and given to the poor?"
          reference="John 12:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The Bible does not let Judas hide behind that question.</p>
        </div>
        <VerseQuote
          text="This he said, not that he cared for the poor; but because he was a thief, and had the bag, and bare what was put therein."
          reference="John 12:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Not every objection that sounds reasonable is honest. Judas asked a question that
            sounded caring and meant something else entirely.
          </p>
          <p>Jesus defended Mary Himself.</p>
        </div>
        <VerseQuote
          text="Then said Jesus, Let her alone: against the day of my burying hath she kept this."
          reference="John 12:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Out of everyone in that room, Mary may have been the only one who understood
            what was actually coming.</strong> Jesus had told the disciples plainly that He would
            die, and they kept missing it. Mary, in her own quiet way, was ready.
          </p>
          <p>
            💡 Sometimes the person who loves quietly is paying closer attention than the ones doing
            all the talking. Compare that to{" "}
            <ArticleLink href="/blog/who-is-leah">Leah&apos;s story</ArticleLink>, another woman in
            Scripture whose quiet faithfulness outlasted everyone else&apos;s opinion of her.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💡 Lessons From Their Lives
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. There is more than one right way to love Jesus
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martha served. Mary sat and listened. Jesus loved them both.</p>
          <p>
            ✅ You do not have to choose between being a Martha and being a Mary. You need the
            wisdom to know which one the moment calls for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Serving becomes a problem when it crowds out sitting with Jesus
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus never told Martha to stop serving. He told her serving was not the one thing
            needed in that specific moment.
          </p>
          <p>⚠️ Busy hands and a distant heart can happen even while doing good, useful things.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Honest grief and real faith can live in the same sentence
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Both sisters said the same painful words to Jesus. Lord, if thou hadst been here, my
            brother had not died.
          </p>
          <p>Neither one got scolded for saying it.</p>
          <p>
            💡 You can tell God exactly how you feel and still trust Him in the very next
            breath, the way Martha did.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Jesus grieves with people even when He is about to fix the problem
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus wept knowing the tomb was about to be empty.</p>
          <p>
            📌 God does not require you to stop hurting before He will act. He is willing to grieve
            beside you on the way to the miracle.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Delayed does not mean denied
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus loved this family, and He still waited two days before going to them.</p>
          <p>
            ⚠️ His love was never in question. His timing was simply not theirs, and it turned out to
            be for something bigger than they could have asked for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Costly love is never wasted on Jesus
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judas called Mary&apos;s gift a waste. Jesus called it a treasure worth remembering.</p>
          <p>
            📌 What you pour out for Jesus, even if the world calls it excessive, is never wasted on
            Him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Key Verses From Their Story
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Luke 10:41 and 42</h3>
        <VerseQuote
          text="And Jesus answered and said unto her, Martha, Martha, thou art careful and troubled about many things: But one thing is needful: and Mary hath chosen that good part, which shall not be taken away from her."
          reference="Luke 10:41 and 42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The heart of the whole Martha and Mary story sits in this one gentle correction.</p>
          <p>💡 Jesus names the problem as anxiety and distraction, not service itself.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. John 11:5</h3>
        <VerseQuote text="Now Jesus loved Martha, and her sister, and Lazarus." reference="John 11:5" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three names, one plain statement of love, right before the hardest chapter of their lives.</p>
          <p>📌 God&apos;s love for you is not measured by how quickly He rescues you.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. John 11:25 and 26</h3>
        <VerseQuote
          text="Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die. Believest thou this?"
          reference="John 11:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One of the boldest claims Jesus ever made about Himself, spoken to a grieving woman at a graveside.</p>
          <p>❓ He still asks that same question. Believest thou this?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. John 11:35</h3>
        <VerseQuote text="Jesus wept." reference="John 11:35" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two words. The shortest verse in the Bible, and one of the most comforting.</p>
          <p>💡 God is not distant from your tears. He has shed His own.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. John 12:7</h3>
        <VerseQuote
          text="Then said Jesus, Let her alone: against the day of my burying hath she kept this."
          reference="John 12:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jesus defended a quiet act of love that others could not understand.</p>
          <p>📌 He still sees what you give Him in private, even when nobody else does.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Martha and Mary
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Martha and Mary in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Martha and Mary were sisters who lived in Bethany, a village near Jerusalem, along with
          their brother Lazarus. Jesus loved this family and often stayed in their home. Their story
          appears in Luke 10 and in John 11 and 12.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Jesus wrong to correct Martha?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and He was gentle about it. He never said her serving was wrong or unimportant. He said
          she was careful and troubled about many things when only one thing was needed in that
          moment. It was a correction spoken in love, using her name twice, not a rebuke meant to
          shame her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Mary of Bethany the same as Mary Magdalene?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, they are two different women. This is one of the most common mix ups in the Bible.
          Mary of Bethany was the sister of Martha and Lazarus. Mary Magdalene was a separate woman
          from the town of Magdala, whom Jesus delivered from seven demons, and who was the first
          person to see Him after His resurrection. Scripture never says they are the same person.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Jesus wait two days before going to Lazarus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not give a full explanation. John simply says Jesus loved the family, and
          then stayed two more days anyway. What we do know is what happened because of the delay. A
          miracle took place that a smaller, quicker healing never could have shown, a man raised
          from the dead after four days in the grave.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Jesus wept mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means exactly what it says. Jesus cried real tears at the grave of His friend Lazarus,
          even though He already knew He was about to raise him from the dead. It shows that Jesus
          fully shared in human sorrow. His power to fix a problem did not stop Him from feeling the
          pain of it first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Martha say Lord, if thou hadst been here, my brother had not died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was an honest mix of grief and faith. She believed Jesus could have prevented the death,
          and she was hurting that He had not arrived in time. In the very next breath she also said
          she still believed God would give Jesus whatever He asked. Mary later said the identical
          words to Him at the same spot.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the ointment of spikenard that Mary used?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Spikenard was a rare, fragrant oil imported from far away, and a pound of the pure kind was
          extremely expensive, worth close to a year of ordinary wages. Mary used it to anoint
          Jesus&apos; feet and then wiped them with her hair, an act of humility and devotion, not
          just a costly gift.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Judas object to what Mary did?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He asked why the perfume was not sold and the money given to the poor. Scripture is direct
          about his real motive. He did not actually care about the poor. He was a thief who managed
          the disciples&apos; money bag and used to help himself to what was in it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Martha and Mary ever get married?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not say. Scripture gives no record of either sister having a husband or
          children. Their identity in the text is built entirely around their relationship with
          Lazarus and with Jesus, not around a marriage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Lazarus after he was raised from the dead?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible tells us he sat at the table with Jesus at the supper in John 12, alive and well.
          It also says the chief priests planned to kill him too, because his living, breathing
          presence was drawing so many people to believe in Jesus. Scripture does not record any
          further details about his life after that.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Martha and Mary today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That Jesus values both busy hands and a quiet heart, and that neither sister was loved more
          than the other. That grief and faith can sit in the same sentence. And that the love you
          give Jesus quietly, even when others do not understand it, is never wasted on Him.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Martha served. Mary sat. Both of them wept at the same grave.</p>
          <p>
            📌 <strong>Jesus never made either sister choose between serving Him and sitting with
            Him. He simply asked each of them, in her own moment, to notice what mattered most.</strong>
          </p>
          <p>
            📌 <strong>He wept with them before He worked the miracle, proving that grief and power
            are never opposites in Him.</strong>
          </p>
          <p>
            📌 <strong>And He defended the quiet, costly love Mary gave Him, even when the people
            closest to Him could not understand it.</strong>
          </p>
          <p>Whichever sister you relate to more, the same Jesus loves you the way He loved them.</p>
          <p>
            Read John 11 for yourself tonight, slowly, and watch how close Jesus stays to two grieving
            sisters. If you are still learning your way around passages like this one,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> is a
            good next step.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
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
          <p>It is completely free. No pressure, no credit card, no account needed to begin.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
        </div>

        <StudyCta
          slug="women-of-the-bible"
          title="Women of the Bible"
          days={21}
          description="Martha and Mary show two different ways of loving Jesus. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
