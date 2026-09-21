import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-20-explained", {
  title: "Genesis 20 Explained: Abraham's Second Lie About Sarah",
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

export default function GenesisTwentyExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-20-explained"
      title={<>📖 Genesis 20 Explained: Abraham&apos;s Second Lie About Sarah</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Abraham has already done this once.</p>
            <p>
              <strong>Genesis 20 explained</strong> is the chapter where the man God called out of his
              father&apos;s house tries the exact same failed trick a second time, years later, on a
              different king in a different city. He tells people Sarah is his sister again. A ruler
              takes her into his house again. And once more, God has to step in to keep a promise that
              Abraham&apos;s own fear was putting at risk.
            </p>
            <p>Maybe you have made the same mistake twice, in slightly different clothes, and told yourself this time was somehow different.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Abraham lie about Sarah again after what already happened in Egypt?</li>
            <li>❓ Why does God warn a pagan king in a dream instead of warning Abraham first?</li>
            <li>❓ What does it mean that Abraham is called a prophet for the first time here?</li>
            <li>❓ And why does this whole mess happen right before Isaac is finally born?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Abimelech never touches Sarah, and he still ends up more shaken by what almost
              happened than Abraham seems to be.</strong>
            </p>
            <p>
              This walkthrough goes through the chapter in order: the lie told to a new king, the dream
              that stops a disaster before it starts, the morning confrontation, the payment that repairs
              Sarah&apos;s name, and the prayer that heals a household Abraham put in danger.
            </p>
            <p>Some chapters show Abraham at his boldest. This one shows him repeating his oldest fear.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 What Happened Just Before This Chapter
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/genesis-19-explained">Genesis 19</ArticleLink> ended with fire falling
            on Sodom and Gomorrah, Lot&apos;s wife turned to salt, and Abraham looking out over smoke rising
            like a furnace from the plain he had bargained for the night before. Before that, in{" "}
            <ArticleLink href="/blog/genesis-18-explained">Genesis 18</ArticleLink>, God had promised
            Abraham something specific: Sarah would have a son, and He would return &quot;according to the
            time of life,&quot; roughly a year out. Genesis 20 falls somewhere inside that waiting year,
            after the fire on Sodom and before the son actually arrives.
          </p>
          <p>
            This is not the first time Abraham has tried this move. Back in{" "}
            <ArticleLink href="/blog/genesis-12-explained">Genesis 12</ArticleLink>, fear of Pharaoh made
            him tell Sarah to say she was his sister the moment they entered Egypt. Pharaoh took her into
            his house, God struck Pharaoh&apos;s household with plagues, and Pharaoh sent Abraham away
            richer but publicly rebuked by a man who did not even worship the LORD. Years and a covenant
            later, with the promised son almost within reach, Abraham reaches for the same lie again.
          </p>
          <p>
            📌 <strong>Genesis 18 showed Abraham arguing boldly with God on behalf of strangers in
            Sodom. Genesis 20 shows the same man too afraid to trust God with his own wife.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 20 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Lie Again, in a New Place (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with Abraham on the move, and the old fear moving with him.</p>
        </div>
        <VerseQuote
          text="And Abraham journeyed from thence toward the south country, and dwelled between Kadesh and Shur, and sojourned in Gerar."
          reference="Genesis 20:1"
        />
        <VerseQuote
          text="And Abraham said of Sarah his wife, She is my sister: and Abimelech king of Gerar sent, and took Sarah."
          reference="Genesis 20:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two verses. That is all it takes for the whole scheme to repeat itself.</strong>{" "}
            Gerar was a city in the western Negev, ruled by a king Genesis calls Abimelech, which shows up
            again later as the title of a different king who deals with Isaac in the same region. Abraham
            does not wait to be asked about Sarah this time. He announces the lie before trouble even
            starts, the same fear from Egypt running the same script.
          </p>
          <p>
            💡 Sarah was around ninety years old at this point in the story, carrying the promise of a son
            within the year. Her age does not stop Abimelech from taking her. Whatever made her desirable
            to a king in Egypt years earlier, something about her still made Abraham afraid enough to lie
            about her again here.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. God Warns a King in a Dream (verses 3 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before anything happens between Abimelech and Sarah, God intervenes directly.</p>
        </div>
        <VerseQuote
          text="But God came to Abimelech in a dream by night, and said to him, Behold, thou art but a dead man, for the woman which thou hast taken; for she is a man's wife."
          reference="Genesis 20:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>God speaks to a Philistine king who has never worshipped Him, in a dream, with a
            death sentence attached.</strong> Nothing in this chapter suggests Abimelech had any way of
            knowing Sarah was married. God warns him anyway, before the sin is committed, not after.
          </p>
        </div>
        <VerseQuote
          text="But Abimelech had not come near her: and he said, LORD, wilt thou slay also a righteous nation?"
          reference="Genesis 20:4"
        />
        <VerseQuote
          text="Said he not unto me, She is my sister? and she, even she herself said, He is my brother: in the integrity of my heart and innocency of my hands have I done this."
          reference="Genesis 20:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Wilt thou slay also a righteous nation?&quot; echoes the exact question
            Abraham himself asked God in Genesis 18, word for word in spirit: wilt thou also destroy the
            righteous with the wicked?</strong> The man who pleaded for Sodom&apos;s righteous is now the
            reason a foreign king has to ask the same question about his own people. Abimelech also reveals
            that Sarah backed up the lie herself, calling Abraham her brother without being forced to.
          </p>
        </div>
        <VerseQuote
          text="And God said unto him in a dream, Yea, I know that thou didst this in the integrity of thy heart; for I also withheld thee from sinning against me: therefore suffered I thee not to touch her."
          reference="Genesis 20:6"
        />
        <VerseQuote
          text="Now therefore restore the man his wife; for he is a prophet, and he shall pray for thee, and thou shalt live: and if thou restore her not, know thou that thou shalt surely die, thou, and all that are thine."
          reference="Genesis 20:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 God credits Abimelech&apos;s integrity and also says plainly that He personally kept him
            from touching Sarah. Both things are true in the same breath: Abimelech acted in good
            conscience, and God still gets the credit for the sin that never happened. This is also the
            first time the word prophet is used for any person in the Bible, and it is applied to Abraham
            in the middle of a chapter where he is the one who lied.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Abimelech Confronts Abraham (verses 8 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Morning comes, and Abimelech wastes no time acting on what he was told.</p>
        </div>
        <VerseQuote
          text="Therefore Abimelech rose early in the morning, and called all his servants, and told all these things in their ears: and the men were sore afraid."
          reference="Genesis 20:8"
        />
        <VerseQuote
          text="Then Abimelech called Abraham, and said unto him, What hast thou done unto us? and what have I offended thee, that thou hast brought on me and on my kingdom a great sin? thou hast done deeds unto me that ought not to be done."
          reference="Genesis 20:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A pagan king rebukes the man God calls a prophet, in almost the same words Pharaoh
            used back in Egypt.</strong> Abimelech has done nothing wrong that he knew of, and he is still
            the one asking Abraham to explain himself.
          </p>
        </div>
        <VerseQuote
          text="And Abimelech said unto Abraham, What sawest thou, that thou hast done this thing?"
          reference="Genesis 20:10"
        />
        <VerseQuote
          text="And Abraham said, Because I thought, Surely the fear of God is not in this place; and they will slay me for my wife's sake."
          reference="Genesis 20:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Abraham assumed Gerar had no fear of God in it. A king there just showed more fear
            of God than Abraham did.</strong> His own explanation exposes the problem: he judged an entire
            place by his fear rather than checking it, and lied his way through a situation he never
            actually tested.
          </p>
        </div>
        <VerseQuote
          text="And yet indeed she is my sister; she is the daughter of my father, but not the daughter of my mother; and she became my wife."
          reference="Genesis 20:12"
        />
        <VerseQuote
          text="And it came to pass, when God caused me to wander from my father's house, that I said unto her, This is thy kindness which thou shalt shew unto me; at every place whither we shall come, say of me, He is my brother."
          reference="Genesis 20:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Abraham reveals two things here. First, the sister claim was technically true: Sarah was his
            half sister, sharing his father but not his mother, which marriages inside that era&apos;s
            customs allowed even though later Israelite law would forbid it. Second, and more telling, this
            was never a one time panic. Abraham admits he asked Sarah to call him her brother at every
            place they went, long before either Egypt or Gerar. The lie in this chapter was not new. It was
            a habit finally repeated somewhere it almost cost someone else everything.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Payment, Restoration, and a Rebuke for Sarah (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abimelech does not argue back. He starts making it right immediately.</p>
        </div>
        <VerseQuote
          text="And Abimelech took sheep, and oxen, and menservants, and womenservants, and gave them unto Abraham, and restored him Sarah his wife."
          reference="Genesis 20:14"
        />
        <VerseQuote
          text="And Abimelech said, Behold, my land is before thee: dwell where it pleaseth thee."
          reference="Genesis 20:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Abimelech gives Abraham livestock, servants, and an open invitation to settle
            anywhere in his land, without receiving an apology in return.</strong> A king who was nearly
            struck dead for a sin he did not know he was committing responds by making Abraham richer, not
            by punishing him.
          </p>
        </div>
        <VerseQuote
          text="And unto Sarah he said, Behold, I have given thy brother a thousand pieces of silver: behold, he is to thee a covering of the eyes, unto all that are with thee, and with all other: thus she was reproved."
          reference="Genesis 20:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;A covering of the eyes&quot; was a way of saying the payment publicly restored
            Sarah&apos;s honor, proof to anyone watching that nothing improper had happened and that her
            name was clear. Abimelech still calls Abraham &quot;thy brother&quot; in the very sentence that
            reproves her, a small, sharp reminder of the label Abraham had asked her to use.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Abraham Prays, and a Household Is Healed (verses 17 and 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends with the very thing God said would happen in the dream.</p>
        </div>
        <VerseQuote
          text="So Abraham prayed unto God: and God healed Abimelech, and his wife, and his maidservants; and they bare children."
          reference="Genesis 20:17"
        />
        <VerseQuote
          text="For the LORD had fast closed up all the wombs of the house of Abimelech, because of Sarah Abraham's wife."
          reference="Genesis 20:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every womb in Abimelech&apos;s household had been closed the whole time Sarah was
            there, and nobody is told that until the very last verse.</strong> The judgment was already
            running quietly in the background of the entire chapter. Abraham, the man whose fear caused the
            problem, is also the one whose prayer God uses to end it, exactly as the dream in verse 7 said
            he would.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 20 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Abraham actually lie?</strong> Not entirely, and that is what makes it worse rather
            than better. Genesis 20:12 confirms Sarah really was his half sister. The statement was
            technically true and still deliberately misleading, told specifically to hide that she was also
            his wife. Abraham used a half truth to manage a risk instead of trusting God with it, which
            Abimelech himself treats as a great sin regardless of the technicality.
          </p>
          <p>
            <strong>Why does Abraham repeat a mistake he already saw backfire in Egypt?</strong> Verse 13
            answers this directly. Abraham tells Abimelech this was his standing arrangement with Sarah
            &quot;at every place whither we shall come,&quot; which means Genesis 12 was not a one time
            panic that Abraham grew out of. It was a long running strategy he kept using, and Gerar is
            simply the next place it happened to surface in the text.
          </p>
        </div>
        <VerseQuote
          text="And Abraham said, Because I thought, Surely the fear of God is not in this place; and they will slay me for my wife's sake."
          reference="Genesis 20:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was Sarah ever in real danger, this close to Isaac being born?</strong> The text is
            careful on this point. Verse 4 states plainly that Abimelech had not come near her, and verse 6
            has God saying He personally withheld Abimelech from touching her. Genesis 21 opens right after
            this chapter with Sarah conceiving Isaac at the time God had spoken, so the promise was never
            actually put at risk. The danger was real in the moment; the outcome was protected the entire
            time.
          </p>
          <p>
            <strong>Why did God close the wombs of Abimelech&apos;s whole household for a sin the king did
            not know he was committing?</strong> Genesis 20 does not fully explain the mechanics, only that
            it happened &quot;because of Sarah Abraham&apos;s wife,&quot; and that it was already in effect
            before anyone in the chapter knew about it. The judgment reads less like punishment for
            deliberate wrongdoing and more like a protective measure, a household kept from bearing
            children in a house where a married woman was being held, until she could be restored.
          </p>
          <p>
            <strong>Who was Abimelech?</strong> Genesis never gives him a personal name beyond the title
            Abimelech, king of Gerar. The same title appears again later for a king who deals with Isaac in
            the same city, using nearly the same &quot;she is my sister&quot; line Isaac learned from his
            father. Many readers take Abimelech as a royal title, similar to Pharaoh, rather than one man&apos;s
            given name, which would explain how it applies to more than one king across two generations.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 4 Bible Verses From Genesis 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 20:6</h3>
        <VerseQuote
          text="And God said unto him in a dream, Yea, I know that thou didst this in the integrity of thy heart; for I also withheld thee from sinning against me: therefore suffered I thee not to touch her."
          reference="Genesis 20:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God protecting someone from a sin they did not even see coming, and telling them so directly, in a
          dream, before it could ever happen.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 20:7</h3>
        <VerseQuote
          text="Now therefore restore the man his wife; for he is a prophet, and he shall pray for thee, and thou shalt live: and if thou restore her not, know thou that thou shalt surely die, thou, and all that are thine."
          reference="Genesis 20:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first time Scripture calls anyone a prophet, spoken about a man who is at that exact moment in
          the middle of lying to a king.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 20:11</h3>
        <VerseQuote
          text="And Abraham said, Because I thought, Surely the fear of God is not in this place; and they will slay me for my wife's sake."
          reference="Genesis 20:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A wrong assumption, spoken out loud, from the one person in the chapter who turns out to have
          judged the situation worst of all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 20:17 and 18</h3>
        <VerseQuote
          text="So Abraham prayed unto God: and God healed Abimelech, and his wife, and his maidservants; and they bare children."
          reference="Genesis 20:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The man whose fear caused the harm becomes the man whose prayer ends it, closing the chapter with
          restoration instead of judgment.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 20 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records Abraham telling King Abimelech of Gerar that Sarah is his sister rather than his wife,
          out of fear he would be killed otherwise. Abimelech takes Sarah, God warns him in a dream before
          any sin happens, and Abimelech confronts Abraham, returns Sarah, and pays restitution. The chapter
          closes with Abraham praying for Abimelech&apos;s household, which God heals from a period of
          closed wombs.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Abraham say Sarah was his sister again?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 20:11 has Abraham explain he assumed Gerar had no fear of God in it and feared being
          killed for his wife&apos;s sake. Verse 13 reveals this was not new; Abraham says it was his
          standing arrangement with Sarah at every place they traveled, the same lie he had already used
          once before in Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Sarah really Abraham&apos;s sister?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 20:12 says she was his half sister, the daughter of his father but not his mother. The
          statement Abraham made was technically true and still deliberately misleading, since he left out
          that she was also his wife.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God appear to Abimelech in a dream instead of punishing him right away?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 20:6 has God saying He already knew Abimelech acted in the integrity of his heart and had
          personally kept him from touching Sarah. The dream warns him and gives him the chance to make it
          right before any sin was committed, rather than punishing him for something he had not actually
          done.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;a covering of the eyes&quot; mean in Genesis 20:16?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes the silver Abimelech gave as a public sign that Sarah&apos;s name was clear. Anyone
          who might have doubted her was meant to see the payment and understand that nothing improper had
          taken place while she was in Abimelech&apos;s house.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the wombs of Abimelech&apos;s household closed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 20:18 states it happened because of Sarah, and that it was already in place before anyone
          in the household knew why. It reads as a protective judgment tied to a married woman being held
          in the king&apos;s house, lifted once Abraham prayed after Sarah was restored.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is this the same story as Genesis 12?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a separate incident with the same lie, told years later in a different country to a
          different king. In <ArticleLink href="/blog/genesis-12-explained">Genesis 12</ArticleLink>,
          Abraham used the sister claim on Pharaoh in Egypt. Genesis 20 shows him using the identical excuse
          on Abimelech of Gerar, and Genesis 20:13 confirms it was a pattern, not a single lapse.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Abraham really a prophet if he was lying in the same chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 20:7 calls him a prophet in the middle of the same event where he is deceiving a king.
          Scripture does not treat the title as proof Abraham was behaving well; it treats it as a statement
          about his standing with God and his role praying for Abimelech, alongside an honest record of his
          failure in the same chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Genesis 20 connect to what happens later with Isaac?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 26 records Isaac telling the same lie about his own wife, Rebekah, to a king also called
          Abimelech in the same city of Gerar, almost word for word. The pattern Abraham started in fear
          reappears in his son&apos;s life a generation later.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 20 is not a new failure. It is an old one, still running.</p>
          <p>
            📌 <strong>Abraham&apos;s fear of a place he never actually tested cost more than his fear of
            Egypt years earlier.</strong> He assumed Gerar had no fear of God in it, and a king there proved
            him wrong before the sun went down.
          </p>
          <p>
            📌 <strong>God protected the promise even while Abraham was busy mismanaging it.</strong> Sarah
            was never touched, Isaac was never at risk, and the household God used Abraham to harm is the
            same household his own prayer went on to heal.
          </p>
          <p>
            📌 <strong>A pattern you never named out loud can still be seen clearly by everyone
            watching.</strong> Abraham called this arrangement kindness in verse 13. Abimelech called it a
            great sin the moment it landed on him.
          </p>
          <p>
            You may have a fear you have managed the same way more than once, quietly enough that you never
            called it a pattern.
          </p>
          <p>So here is your one next step.</p>
          <p>Name it plainly, the way Abimelech named it, before it lands on someone else.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
