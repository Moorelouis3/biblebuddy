import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-is-leah", {
  title: "Who Was Leah in the Bible? The Story of the Unloved Wife",
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

export default function WhoIsLeahPage() {
  return (
    <BlogPostShell
      slug="who-is-leah"
      title={<>📖 Who Was Leah in the Bible? The Story of the Unloved Wife</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Some people in the Bible get statues.</p>
            <p>Leah got a footnote.</p>
            <p>Her own wedding was a trick.</p>
            <p>Her husband loved her sister.</p>
            <p>Her whole life, she was the one who was not chosen.</p>
            <p>
              📌 <strong>If you have ever felt overlooked, second best, or unwanted, Leah&apos;s
              story is for you.</strong>
            </p>
            <p>Maybe it was a room where nobody said your name.</p>
            <p>A person who never picked you back.</p>
            <p>A sister, a coworker, a friend who always seemed to be the favorite.</p>
            <p>You know that specific ache of being the one people settle for.</p>
            <p>Leah lived her entire adult life inside it.</p>
            <p>
              And here is what makes her story worth your next fifteen minutes. The God of the Bible
              has a habit. <strong>He sees the person everyone else looks past.</strong>
            </p>
            <p>
              This is the full story of Leah in the Bible, walked through in order, and what her
              life still says to anyone who feels unwanted.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Leah Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leah was the older daughter of a man named Laban.</p>
          <p>Her younger sister was Rachel.</p>
          <p>She lived roughly 1900 years before Christ, in the days of the patriarchs.</p>
          <p>
            📌 Her story runs through <strong>Genesis 29 to 35</strong>, with the heart of it in
            Genesis 29.
          </p>
          <p>She married Jacob, the grandson of Abraham.</p>
          <p>Which means Leah married into the family God had chosen to bless the whole world through.</p>
          <p>She became the mother of six of the twelve tribes of Israel.</p>
          <p>Judah and Levi both came from her.</p>
          <p>
            💡 Hold onto those two names. One produces Israel&apos;s priests. The other produces its
            kings, and eventually Jesus.
          </p>
          <p>Now here is how her life actually went.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Leah&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The Sister Nobody Compared Well To</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scripture introduces the two sisters side by side, and it is brutal.</p>
        </div>
        <VerseQuote
          text="Leah was tender eyed; but Rachel was beautiful and well favoured."
          reference="Genesis 29:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scholars argue about what tender eyed means.</p>
          <p>Weak eyes. Plain. Soft. Nobody is certain.</p>
          <p>But you do not need the Hebrew to feel the sentence.</p>
          <p>
            ⚠️ <strong>Leah is introduced by comparison, and she loses.</strong>
          </p>
          <p>Some of you have lived that whole sentence.</p>
          <p>The one they mention first, and then you.</p>
          <p>That is the house Leah grew up in.</p>
          <p>Same father. Same table. Different treatment.</p>
          <p>And in that culture, a woman&apos;s whole future depended on being chosen.</p>
          <p>No marriage meant no security, no children, no standing.</p>
          <p>
            ⚠️ So being the less beautiful sister was not just a bruised ego. It was a threat to
            her entire life.
          </p>
          <p>She grew up watching men look at Rachel and then look through her.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. A Wedding Built on a Lie</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jacob fell in love with Rachel the moment he saw her.</p>
          <p>He offered Laban seven years of work for her hand.</p>
          <p>Genesis says those seven years felt like a few days to him because he loved her that much.</p>
          <p>Then the wedding night came.</p>
          <p>And Laban swapped his daughters.</p>
          <p>Under the veil, in the dark, Jacob married Leah instead.</p>
        </div>
        <VerseQuote
          text="And it came to pass, that in the morning, behold, it was Leah: and he said to Laban, What is this thou hast done unto me?"
          reference="Genesis 29:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sit in that morning light for a second.</p>
          <p>Behold, it was Leah.</p>
          <p>Not a name spoken with joy. A discovery. Almost an accusation.</p>
          <p>She watched her husband&apos;s face fall when he realized it was her.</p>
          <p>And here is the part people rush past.</p>
          <p>⚠️ Leah did not plan this. Her father used her.</p>
          <p>She was a tool in someone else&apos;s scheme, and she carried the shame of it anyway.</p>
          <p>Jacob then worked seven more years for Rachel.</p>
          <p>Leah spent her entire marriage sharing her husband with the sister he actually wanted.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The God Who Saw Her</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is where the story turns.</p>
          <p>Everyone in this account overlooked Leah.</p>
          <p>Her father. Her husband. Her sister.</p>
          <p>God did not.</p>
        </div>
        <VerseQuote
          text="And when the LORD saw that Leah was hated, he opened her womb: but Rachel was barren."
          reference="Genesis 29:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Read the first words again: <strong>when the LORD saw</strong>.
          </p>
          <p>Nobody else was looking at Leah.</p>
          <p>God was.</p>
          <p>
            💡 The word translated hated here does not mean God hated her. It describes how she was
            treated. Unloved. Second. Passed over.
          </p>
          <p>And notice which direction God moved.</p>
          <p>Toward her. Not away.</p>
          <p>
            📌 <strong>While the favored sister waited, God blessed the forgotten one.</strong>
          </p>
          <p>That is not a footnote about ancient family drama.</p>
          <p>That is who God is.</p>
          <p>Think about what He actually did here.</p>
          <p>He did not remove Jacob&apos;s preference for Rachel.</p>
          <p>He did not force anybody to love Leah.</p>
          <p>He gave her something of her own instead.</p>
          <p>
            💡 God rarely fixes people&apos;s hearts toward you on demand. He tends to give you
            something they cannot take away.
          </p>
          <p>And He does it quietly.</p>
          <p>No angel showed up at Leah&apos;s door. No prophecy was spoken over her.</p>
          <p>One sentence in Genesis says God noticed, and her whole life changed direction.</p>
          <p>
            📌 <strong>Sometimes the biggest thing God does for you is something only you and He
            know about.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Four Sons and a Heart That Changed</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leah named her sons out of her pain.</p>
          <p>You can hear her heart move, one baby at a time.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>
            📌 <strong>Reuben</strong> — the LORD hath looked upon my affliction, now my husband will
            love me
          </li>
          <li>
            📌 <strong>Simeon</strong> — the LORD hath heard that I was hated
          </li>
          <li>
            📌 <strong>Levi</strong> — now this time will my husband be joined unto me
          </li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three sons.</p>
          <p>Three attempts to earn a love that was never coming.</p>
          <p>Read those names again and you can hear a woman begging to be wanted.</p>
          <p>It never worked.</p>
          <p>Then came the fourth son.</p>
          <p>And something in her broke loose.</p>
        </div>
        <VerseQuote
          text="And she conceived again, and bare a son: and she said, Now will I praise the LORD: therefore she called his name Judah."
          reference="Genesis 29:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>No mention of Jacob this time.</p>
          <p>No now my husband will love me.</p>
          <p>
            Just this: <strong>Now will I praise the LORD.</strong>
          </p>
          <p>
            💡 Somewhere between son three and son four, Leah stopped building her worth on a man who
            would not love her, and set it on the God who always had.
          </p>
          <p>Judah means praise.</p>
          <p>She named her son after the thing God finally taught her.</p>
          <p>
            📌 <strong>That is one of the quietest, biggest victories in the whole Bible.</strong>
          </p>
          <p>Nobody threw her a party for it. No one even noticed.</p>
          <p>But heaven did.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Years That Did Not Get Easier</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Do not romanticize what came next.</p>
          <p>Leah&apos;s life did not suddenly turn sweet.</p>
          <p>The rivalry with Rachel got uglier.</p>
          <p>They competed through servants and children and bargained over who got Jacob at night.</p>
          <p>Genesis 30 is a hard, honest chapter about two hurting women hurting each other.</p>
          <p>⚠️ Leah was not a saint. She was a wounded woman in an impossible situation.</p>
          <p>Scripture never cleans her up.</p>
          <p>💡 That is exactly why you can trust it. The Bible does not sell you a highlight reel.</p>
          <p>She had six sons and a daughter and still lived with a husband whose heart was elsewhere.</p>
          <p>There is a moment in Genesis 30 that tells you everything.</p>
          <p>Her son finds some plants in a field and brings them to his mother.</p>
          <p>Rachel wants them, and Leah answers her with this:</p>
        </div>
        <VerseQuote
          text="Is it a small matter that thou hast taken my husband? and wouldest thou take away my son's mandrakes also?"
          reference="Genesis 30:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Years into the marriage, and the wound is still wide open.</p>
          <p>
            <strong>Thou hast taken my husband.</strong>
          </p>
          <p>That is not a woman who got over it. That is a woman still bleeding.</p>
          <p>Her praise in Genesis 29 was not the end of her pain.</p>
          <p>It was the beginning of somewhere better to put it.</p>
          <p>
            💡 Growth is not the absence of the ache. It is knowing where to carry it while the ache
            is still there.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Unwanted Wife in the Family Tree of Jesus</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the part that should give you chills.</p>
          <p>That fourth son, Judah, became a tribe.</p>
          <p>From the tribe of Judah came King David.</p>
          <p>And from the line of David came Jesus Christ.</p>
          <p>
            📌 <strong>The Messiah did not come through the loved and chosen sister. He came through
            Leah.</strong>
          </p>
          <p>Her third son, Levi, produced the priests who served in the temple.</p>
          <p>Moses and Aaron came from that line.</p>
          <p>
            The woman nobody wanted became the mother of Israel&apos;s worship and Israel&apos;s
            kings. If you want to see where that priestly line went, read the story of{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink>, her descendant.
          </p>
          <p>And there is one more quiet detail most people never catch.</p>
          <p>Rachel died on the road and was buried near Bethlehem.</p>
          <p>But at the end of his life, Jacob gave instructions about his own burial.</p>
        </div>
        <VerseQuote
          text="There they buried Abraham and Sarah his wife, there they buried Isaac and Rebekah his wife; and there I buried Leah."
          reference="Genesis 49:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Jacob asked to be buried in the family tomb.</p>
          <p>Beside Abraham. Beside Isaac.</p>
          <p>
            <strong>Beside Leah.</strong>
          </p>
          <p>Not Rachel. Leah.</p>
          <p>
            💡 In the end, the wife he never chose is the one he chose to lie beside forever.
          </p>
          <p>Think about how her name travels through the rest of Scripture.</p>
          <p>Ruth is told she is like Rachel and Leah, who built the house of Israel.</p>
          <p>David sits on a throne because of her fourth son.</p>
          <p>Matthew opens the New Testament with a genealogy that runs straight through Judah.</p>
          <p>
            📌 <strong>Every time you read the phrase Lion of the tribe of Judah, you are reading
            about Leah&apos;s son.</strong>
          </p>
          <p>She never knew any of it.</p>
          <p>She died thinking she was the wife nobody wanted.</p>
          <p>
            Not every woman in Scripture used her influence that way. Compare Leah to{" "}
            <ArticleLink href="/blog/who-is-jezebel">Jezebel</ArticleLink>, a queen who had all the
            power and used it to pull a nation away from God.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Leah&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Being unwanted by people is not the same as being unseen by God</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every human being in Leah&apos;s story looked past her.</p>
          <p>The one sentence that changed everything starts with when the LORD saw.</p>
          <p>You can be invisible in a room and fully known by heaven at the same time.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. You cannot earn a love that was never yours to earn</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leah tried three times to buy Jacob&apos;s heart with sons.</p>
          <p>It never once worked.</p>
          <p>
            ⚠️ Some people will not love you no matter what you produce. That is about them, not
            your worth.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Comparison will rob you your whole life if you let it</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leah measured herself against Rachel from childhood to the grave.</p>
          <p>Rachel measured herself against Leah too, and envied her children.</p>
          <p>Both women had something the other wanted.</p>
          <p>Both spent years miserable about the thing they did not have.</p>
          <p>
            ⚠️ Comparison does not just steal your joy. It blinds you to what God has already put in
            your hands.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Praise can start before the situation changes</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Nothing improved for Leah between son three and son four.</p>
          <p>Jacob still loved Rachel. The house was still hard.</p>
          <p>She said now will I praise the LORD anyway.</p>
          <p>💡 Praise is not a reward for a fixed life. It is a decision about where you look.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. God builds His biggest plans through overlooked people</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God could have brought the Messiah through the beautiful, beloved sister.</p>
          <p>He chose the one who cried herself to sleep.</p>
          <p>That is a pattern in Scripture, not an accident.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Your story is longer than your worst season</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leah died without ever being her husband&apos;s favorite.</p>
          <p>From inside her life, it looked like she lost.</p>
          <p>
            📌 Thousands of years later, we know her name because of who came through her. God plays
            a longer game than you can see from inside the pain.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Leah&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 29:31</h3>
        <VerseQuote
          text="And when the LORD saw that Leah was hated, he opened her womb: but Rachel was barren."
          reference="Genesis 29:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the hinge of the whole story.</p>
          <p>God saw, and then God acted.</p>
          <p>He did not send her a message. He changed her circumstances.</p>
          <p>Notice He blessed her in the exact place she felt worthless.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 29:35</h3>
        <VerseQuote
          text="And she conceived again, and bare a son: and she said, Now will I praise the LORD: therefore she called his name Judah."
          reference="Genesis 29:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most important sentence Leah ever said.</p>
          <p>Four sons in, she stopped naming her children after her ache.</p>
          <p>She named this one after her God.</p>
          <p>That is what healing sounds like when it starts.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 29:25</h3>
        <VerseQuote
          text="And it came to pass, that in the morning, behold, it was Leah."
          reference="Genesis 29:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Five words that carried a lifetime of rejection.</p>
          <p>Behold, it was Leah. Said like a disappointment.</p>
          <p>The Bible does not soften how she was received.</p>
          <p>💡 God lets the ugly moments stay on the page so you know He is not pretending.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Psalm 34:18</h3>
        <VerseQuote
          text="The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit."
          reference="Psalm 34:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Written by David, who came from Leah&apos;s line.</p>
          <p>He is describing exactly what happened to his ancestor.</p>
          <p>God is not near to the impressive. He is near to the broken.</p>
          <p>If your heart is in pieces right now, that verse has your name on it.</p>
          <p>
            💡 Nigh means close. Not watching from a distance. Close enough to touch.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Corinthians 1:27</h3>
        <VerseQuote
          text="But God hath chosen the foolish things of the world to confound the wise; and God hath chosen the weak things of the world to confound the things which are mighty."
          reference="1 Corinthians 1:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leah&apos;s life is this verse in human form.</p>
          <p>The overlooked sister carried the line of the King.</p>
          <p>God keeps picking the person nobody would have picked.</p>
          <p>📌 That includes you, on the days you feel like the least likely option in the room.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Leah</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Leah in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leah was the older daughter of Laban and the first wife of Jacob. Her father tricked Jacob
          into marrying her when Jacob had worked seven years for her sister Rachel. She became the
          mother of six of the twelve tribes of Israel, including Judah, the tribe Jesus was born
          into. Her story is told in Genesis 29 through 35.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God love Leah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not say God loved her because of something she did. It says the LORD saw
          that she was hated, and He moved toward her. God is consistently drawn to the rejected and
          the overlooked. Leah did not earn His attention; she simply had it, in the exact season
          when no one else was giving her any.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does tender eyed mean in Genesis 29:17?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Hebrew is genuinely uncertain. It may mean her eyes were weak or dull, or it may
          simply mean soft or delicate. Many translations render it as weak eyes. What is clear is
          the contrast the verse is drawing: whatever Leah was, Rachel was the one people called
          beautiful.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jacob ever love Leah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible never says he did. It says plainly that he loved Rachel more. But at the end of
          his life Jacob asked to be buried in the family tomb, where he had buried Leah, and that
          is where he was laid. Some read that as a quiet honoring of her. Scripture leaves it
          without comment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many children did Leah have?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Seven. Six sons and one daughter. Her sons were Reuben, Simeon, Levi, Judah, Issachar, and
          Zebulun, and her daughter was Dinah. Six of the twelve tribes of Israel descend directly
          from her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Jesus descended from Leah or Rachel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leah. Jesus came through the tribe of Judah, and Judah was Leah&apos;s fourth son. Rachel
          was the mother of Joseph and Benjamin. So the Messiah came through the wife who was not
          chosen, not the one Jacob loved.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Laban trick Jacob?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Laban claimed it was custom not to marry off the younger daughter before the older one.
          Whether that was true or an excuse, the result was seven more years of free labor from
          Jacob. It is worth noticing that Jacob, who had deceived his own father to steal a
          blessing, was now deceived by his father in law.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Leah mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The meaning is debated. It has been connected to words for weary and for wild cow, which
          in that culture was not an insult but an image of strength. Neither meaning is certain.
          Her sons&apos; names tell us far more about her heart than her own name does.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Leah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God sees people the world skips over. That you cannot force someone to value you, and
          you are not less valuable when they do not. And that praise is possible before your
          circumstances change, because Leah said now will I praise the LORD while her situation was
          still exactly as painful as before.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Leah a good person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never calls her good or bad. It shows her hurting, competing with her sister,
          and eventually turning to God. She is not a hero or a villain; she is a real woman in a
          painful situation. That honesty is one of the reasons her story still lands so hard
          thousands of years later.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leah never got the thing she wanted most.</p>
          <p>Her husband&apos;s heart stayed with someone else until the day she died.</p>
          <p>From the inside, her life looked like a loss.</p>
          <p>But hold three things next to each other.</p>
          <p>
            📌 <strong>God saw her when nobody else did.</strong>
          </p>
          <p>
            📌 <strong>She found something better to build her worth on than a man&apos;s
            approval.</strong>
          </p>
          <p>
            📌 <strong>The Savior of the world came through her line.</strong>
          </p>
          <p>Her worth was never in Jacob&apos;s hands. It was never in Rachel&apos;s shadow.</p>
          <p>It was in the God who saw her on the worst morning of her life.</p>
          <p>Yours is in the same place.</p>
          <p>If you feel like the one nobody picks, sit with Genesis 29 tonight.</p>
          <p>Read it slowly and watch how God moves toward the unwanted one.</p>
          <p>
            He is doing the same thing in your life right now, whether or not anyone around you has
            noticed yet. And if the ache underneath this is anxiety about being alone, read{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">what the Bible says
            about anxiety</ArticleLink> next.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If reading stories like Leah&apos;s makes you want to understand the rest of Scripture,
            you do not have to figure it out alone. Start with{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> and
            take it one day at a time.
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
          <p>Sign up by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
