import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-21-explained", {
  title: "Genesis 21 Explained: Isaac's Birth and Hagar Sent Away",
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

export default function GenesisTwentyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-21-explained"
      title={<>📖 Genesis 21 Explained: Isaac&apos;s Birth and Hagar Sent Away</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A promise made twenty five years earlier finally has a name and a birthday.</p>
            <p>
              <strong>Genesis 21 explained</strong> is the chapter where Sarah actually holds the son she
              laughed at the thought of having, and where that same joy sits right next to a second
              family being sent out into the wilderness with nothing but bread and a bottle of water.
              One household. One birth. Two very different futures starting on the same page.
            </p>
            <p>Maybe you have watched someone else&apos;s answered prayer land right on top of your own unresolved pain.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ What was Ishmael actually doing when Sarah saw him &quot;mocking&quot;?</li>
            <li>❓ Why does God tell Abraham to listen to Sarah after everything Sarah has already gotten wrong?</li>
            <li>❓ Does God abandon Hagar and Ishmael once they leave Abraham&apos;s tent?</li>
            <li>❓ And why does Abimelech show up again, right after the mess of Genesis 20?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Isaac&apos;s birth does not erase Ishmael. It forces a decision about him.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the birth itself, the feast and
              the moment that ruins it, Hagar and Ishmael&apos;s second exile, the well in the desert, and
              a covenant with a foreign king that closes the chapter in peace instead of conflict.
            </p>
            <p>Watch how many times God shows up for the person who was just told no.</p>
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
            <ArticleLink href="/blog/genesis-20-explained">Genesis 20</ArticleLink> ended with Abraham
            praying for a king he had just endangered, and God healing Abimelech&apos;s household from the
            closed wombs Abraham&apos;s second lie about Sarah had caused. That chapter fell somewhere
            inside the year God had promised in{" "}
            <ArticleLink href="/blog/genesis-18-explained">Genesis 18</ArticleLink>, when the LORD told
            Abraham He would return &quot;according to the time of life&quot; and Sarah would have a son.
          </p>
          <p>
            This is not the first time a child of Abraham&apos;s has been sent into the wilderness with
            Hagar. Back in <ArticleLink href="/blog/genesis-16-explained">Genesis 16</ArticleLink>, a
            pregnant Hagar fled from Sarah&apos;s harsh treatment on her own, and an angel found her by a
            well and told her to return, promising to multiply her son&apos;s descendants and naming him
            Ishmael, &quot;God hears,&quot; because the LORD had heard her affliction. Ishmael grew up in
            Abraham&apos;s household for years afterward, the only son, until{" "}
            <ArticleLink href="/blog/genesis-17-explained">Genesis 17</ArticleLink> named the coming son
            through Sarah specifically and Abraham was told that son, not Ishmael, would carry the
            covenant forward.
          </p>
          <p>
            📌 <strong>Every earlier chapter promised this birth. Genesis 21 is the first one that
            actually delivers it, and shows what the delivery costs the family already living in that
            tent.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 21 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Promise Keeps Its Exact Word (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens without any drama, just a promise being kept to the letter.</p>
        </div>
        <VerseQuote
          text="And the LORD visited Sarah as he had said, and the LORD did unto Sarah as he had spoken. For Sarah conceived, and bare Abraham a son in his old age, at the set time of which God had spoken to him."
          reference="Genesis 21:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Twice in one sentence, the text says God did exactly &quot;as he had said&quot;
            and &quot;as he had spoken.&quot;</strong> After chapters of waiting, doubt, and two separate
            detours through other kings&apos; houses, Genesis makes a point of matching the outcome to the
            original words, word for word, with no new conditions added.
          </p>
        </div>
        <VerseQuote
          text="And Abraham called the name of his son that was born unto him, whom Sarah bare to him, Isaac. And Abraham circumcised his son Isaac being eight days old, as God had commanded him. And Abraham was an hundred years old, when his son Isaac was born unto him."
          reference="Genesis 21:3 to 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Isaac means &quot;he laughs,&quot; a name God had already chosen back in Genesis 17, before
            Abraham laughed at the promise and before Sarah laughed at it too. Abraham obeys the
            circumcision command from Genesis 17 immediately, on the eighth day, exactly as instructed. At
            a hundred years old, he is finally holding the son that promise was always about.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Sarah&apos;s Laughter Changes Meaning (verses 6 and 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah gets the last word on her own laughter, and it is nothing like the first one.</p>
        </div>
        <VerseQuote
          text="And Sarah said, God hath made me to laugh, so that all that hear will laugh with me. And she said, Who would have said unto Abraham, that Sarah should have given children suck? for I have born him a son in his old age."
          reference="Genesis 21:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In Genesis 18, Sarah laughed alone, in secret, and denied it out of fear. Here she
            laughs out loud and invites everyone else to laugh with her.</strong> Same woman, same
            impossible news finally arrived, and the laughter has gone from something she hid to something
            she hands out. Her own question, &quot;who would have said,&quot; answers itself: nobody would
            have said it, because nobody but God could have made it true.
          </p>
          <p>
            💡 Nursing her own child at her age was as unthinkable to her neighbors as the pregnancy
            itself. Genesis lets Sarah say so herself, in her own words, rather than only reporting the
            birth from the outside.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Feast, Then a Look Sarah Cannot Unsee (verses 8 and 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Time jumps forward to weaning, usually somewhere around age two or three in that world, and a celebration.</p>
        </div>
        <VerseQuote
          text="And the child grew, and was weaned: and Abraham made a great feast the same day that Isaac was weaned."
          reference="Genesis 21:8"
        />
        <VerseQuote
          text="And Sarah saw the son of Hagar the Egyptian, which she had born unto Abraham, mocking."
          reference="Genesis 21:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The text does not say what Ishmael said or did. It gives Genesis&apos;s single
            word for it, and lets Sarah&apos;s reaction fill in the rest.</strong> Notice how Genesis names
            him here: not Ishmael, but &quot;the son of Hagar the Egyptian,&quot; the same distancing
            language Sarah is about to use herself in the very next verse.
          </p>
          <p>
            ⚠️ Genesis uses a word built on the same Hebrew root as Isaac&apos;s own name, a wordplay that
            does not survive translation. Whatever Ishmael was doing at that feast, the text ties it
            directly to the boy whose whole name means laughter.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. &quot;Cast Out This Bondwoman and Her Son&quot; (verses 10 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sarah does not raise a concern. She demands a permanent outcome.</p>
        </div>
        <VerseQuote
          text="Wherefore she said unto Abraham, Cast out this bondwoman and her son: for the son of this bondwoman shall not be heir with my son, even with Isaac."
          reference="Genesis 21:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Sarah never says Hagar or Ishmael by name here, only &quot;this bondwoman&quot;
            and &quot;her son.&quot;</strong> Her real concern is stated plainly too: inheritance. Ishmael
            is Abraham&apos;s firstborn by age, and Sarah wants that fact settled permanently, not left to
            work itself out later.
          </p>
        </div>
        <VerseQuote
          text="And the thing was very grievous in Abraham's sight because of his son."
          reference="Genesis 21:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Genesis is careful here: Abraham&apos;s grief is &quot;because of his son,&quot; not because
            of Sarah&apos;s demand in the abstract. Whatever else Ishmael was to this household, Abraham
            still calls him his son and grieves over losing him.
          </p>
        </div>
        <VerseQuote
          text="And God said unto Abraham, Let it not be grievous in thy sight because of the lad, and because of thy bondwoman; in all that Sarah hath said unto thee, hearken unto her voice; for in Isaac shall thy seed be called."
          reference="Genesis 21:12"
        />
        <VerseQuote
          text="And also of the son of the bondwoman will I make a nation, because he is thy seed."
          reference="Genesis 21:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God backs Sarah&apos;s hard demand and softens Abraham&apos;s pain in the same two
            verses.</strong> &quot;In Isaac shall thy seed be called&quot; settles the covenant line for
            good. But God does not stop there. He repeats, almost word for word, the promise already made
            to Hagar in Genesis 16: Ishmael will become a nation too, because he is still Abraham&apos;s
            own seed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Bread, Water, and a Wilderness (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham obeys immediately, and the provision he sends out is stark.</p>
        </div>
        <VerseQuote
          text="And Abraham rose up early in the morning, and took bread, and a bottle of water, and gave it unto Hagar, putting it on her shoulder, and the child, and sent her away: and she departed, and wandered in the wilderness of Beersheba."
          reference="Genesis 21:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Bread and one bottle of water is not a rich man&apos;s provision for a woman and a
            growing boy heading into open desert.</strong> Genesis does not soften how little this is, or
            excuse it. It simply records what Abraham gave and what happened next.
          </p>
        </div>
        <VerseQuote
          text="And the water was spent in the bottle, and she cast the child under one of the shrubs. And she went, and sat her down over against him a good way off, as it were a bow shot: for she said, Let me not see the death of the child. And she sat over against him, and lift up her voice, and wept."
          reference="Genesis 21:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Let me not see the death of the child&quot; is a mother positioning herself
            far enough away to survive watching her son die.</strong> This is the lowest point in the
            chapter, and Genesis lets it sit there without rushing to the rescue in the very next breath.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. God Hears the Boy Where He Is (verses 17 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The rescue, when it comes, answers the exact meaning built into Ishmael&apos;s own name.</p>
        </div>
        <VerseQuote
          text="And God heard the voice of the lad; and the angel of God called to Hagar out of heaven, and said unto her, What aileth thee, Hagar? fear not; for God hath heard the voice of the lad where he is."
          reference="Genesis 21:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Ishmael means &quot;God hears,&quot; the very name the angel gave Hagar in Genesis
            16 because &quot;the LORD hath heard thy affliction.&quot;</strong> Years later, sent out a
            second time, that promise is still active. The text says God heard the boy&apos;s voice, not
            only Hagar&apos;s weeping beside him.
          </p>
        </div>
        <VerseQuote
          text="Arise, lift up the lad, and hold him in thine hand; for I will make him a great nation. And God opened her eyes, and she saw a well of water; and she went, and filled the bottle with water, and gave the lad drink."
          reference="Genesis 21:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The well does not appear out of nowhere. Genesis says God &quot;opened her eyes,&quot;
            language that suggests the water may have been there the whole time, unseen, until the exact
            moment she needed to see it.
          </p>
        </div>
        <VerseQuote
          text="And God was with the lad; and he grew, and dwelt in the wilderness, and became an archer. And he dwelt in the wilderness of Paran: and his mother took him a wife out of the land of Egypt."
          reference="Genesis 21:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;God was with the lad&quot; is the chapter&apos;s final word on Ishmael, and
            it is not a word of rejection.</strong> Sent away from Abraham&apos;s inheritance, Ishmael is
            not sent away from God&apos;s presence. Hagar, an Egyptian herself, finds her son an Egyptian
            wife, the land of her own birth reappearing in her son&apos;s story even out in Paran.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Abimelech Returns, Asking for a Promise (verses 22 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The scene shifts entirely, from a desperate mother in the wilderness to a king seeking a treaty.</p>
        </div>
        <VerseQuote
          text="And it came to pass at that time, that Abimelech and Phichol the chief captain of his host spake unto Abraham, saying, God is with thee in all that thou doest:"
          reference="Genesis 21:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;God is with thee in all that thou doest&quot; comes from the same king
            Abraham lied to in Genesis 20, only one chapter earlier.</strong> Abimelech watched Abraham
            deceive him and still walks away convinced God&apos;s hand is on this man, enough to want a
            formal, binding promise from him.
          </p>
        </div>
        <VerseQuote
          text="Now therefore swear unto me here by God that thou wilt not deal falsely with me, nor with my son, nor with my son's son: but according to the kindness that I have done unto thee, thou shalt do unto me, and to the land wherein thou hast sojourned."
          reference="Genesis 21:23"
        />
        <VerseQuote text="And Abraham said, I will swear." reference="Genesis 21:24" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Abimelech specifically asks Abraham not to &quot;deal falsely,&quot; the exact failure of
            Genesis 20 named out loud as the thing he wants guaranteed will not happen again. Abraham
            agrees without hesitation, in four short words.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          8. A Well, Seven Lambs, and a Covenant at Beersheba (verses 25 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before agreeing to the treaty, Abraham raises a grievance of his own.</p>
        </div>
        <VerseQuote
          text="And Abraham reproved Abimelech because of a well of water, which Abimelech's servants had violently taken away."
          reference="Genesis 21:25"
        />
        <VerseQuote
          text="And Abimelech said, I wot not who hath done this thing: neither didst thou tell me, neither yet heard I of it, but to day."
          reference="Genesis 21:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A well of water is the second thing worth fighting over in this chapter, after a
            bottle of water nearly cost Hagar her son.</strong> In a dry country, water rights were not a
            small complaint. Abraham raises it directly instead of letting it fester, and Abimelech
            answers with what reads like genuine surprise rather than a denial.
          </p>
        </div>
        <VerseQuote
          text="And Abraham took sheep and oxen, and gave them unto Abimelech; and both of them made a covenant."
          reference="Genesis 21:27"
        />
        <VerseQuote
          text="And Abraham set seven ewe lambs of the flock by themselves. And Abimelech said unto Abraham, What mean these seven ewe lambs which thou hast set by themselves? And he said, For these seven ewe lambs shalt thou take of my hand, that they may be a witness unto me, that I have digged this well."
          reference="Genesis 21:28 to 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Seven lambs, handed over as a witness, settle ownership of the well without a single word
            of a written contract. Abraham makes the ordinary gift itself carry the legal weight.
          </p>
        </div>
        <VerseQuote
          text="Wherefore he called that place Beersheba; because there they sware both of them."
          reference="Genesis 21:31"
        />
        <VerseQuote
          text="And Abraham planted a grove in Beersheba, and called there on the name of the LORD, the everlasting God. And Abraham sojourned in the Philistines' land many days."
          reference="Genesis 21:33 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Beersheba carries a double meaning in Hebrew, tied to both &quot;oath&quot; and
            &quot;seven,&quot; and the seven lambs in the very same scene make both meanings true at
            once.</strong> The chapter that opened with a birth closes with Abraham planting a tree and
            calling on God by a new title, the everlasting God, in the land where he now expects to stay a
            long while.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 21 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What was Ishmael actually doing when Sarah saw him &quot;mocking&quot;?</strong>{" "}
            Genesis 21:9 gives one Hebrew word, built on the same root as Isaac&apos;s own name, and does
            not explain further. Some readers take it as innocent childish play that Sarah overreacted to.
            Others read it as real mockery or teasing aimed at Isaac, closer to bullying than laughter.
            Paul, writing in Galatians centuries later, calls it persecution outright:
          </p>
        </div>
        <VerseQuote
          text="But as then he that was born after the flesh persecuted him that was born after the Spirit, even so it is now."
          reference="Galatians 4:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Genesis itself never settles the question with that much force. What it does show is Sarah
            reacting with total finality, and God backing her decision regardless of exactly how serious
            the original incident was.
          </p>
          <p>
            <strong>Why does God tell Abraham to listen to Sarah, given how much Sarah has already gotten
            wrong?</strong> Sarah is the same woman who gave Hagar to Abraham in the first place back in
            Genesis 16, then treated her harshly enough to drive her into the wilderness once already, and
            who lied about her own laughter in Genesis 18. Genesis 21:12 does not say Sarah is right about
            everything. It says her demand lines up with what God had already decided about the covenant
            line, and instructs Abraham to act on it for that reason, not as a blanket endorsement of her
            character.
          </p>
          <p>
            <strong>Does God abandon Hagar and Ishmael?</strong> The text answers this one plainly, more
            than once. God hears the boy&apos;s voice, sends an angel, opens Hagar&apos;s eyes to water in
            time, and states directly that He is with the lad as he grows. Being excluded from Abraham&apos;s
            inheritance is not the same as being excluded from God&apos;s care, and Genesis 21 goes out of
            its way to keep those two things separate.
          </p>
          <p>
            <strong>How does Paul use this chapter in Galatians 4?</strong> Paul reads Hagar and Sarah as
            an allegory for two covenants, slavery under the law versus freedom through promise, and
            quotes Genesis 21:10 directly to make his point about which one believers belong to:
          </p>
        </div>
        <VerseQuote
          text="Nevertheless what saith the scripture? Cast out the bondwoman and her son: for the son of the bondwoman shall not be heir with the son of the freewoman."
          reference="Galatians 4:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul is not offering new information about what happened in Genesis 21. He is using an event
            that already happened, exactly as Genesis records it, to teach something separate about grace
            and law generations later.
          </p>
          <p>
            <strong>Why does the Abimelech story appear right after the Hagar story, with no transition?</strong>{" "}
            Genesis often places a domestic crisis next to a diplomatic one without commentary connecting
            them. Here the pairing sharpens both halves: Abraham sends his own son away with almost nothing,
            then a foreign king who has no covenant claim on him at all shows up asking to be treated with
            kindness and honesty. The contrast is left for the reader to notice, not explained by the text.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 21:1 and 2</h3>
        <VerseQuote
          text="And the LORD visited Sarah as he had said, and the LORD did unto Sarah as he had spoken. For Sarah conceived, and bare Abraham a son in his old age, at the set time of which God had spoken to him."
          reference="Genesis 21:1 and 2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise kept twice over in one sentence, matching the outcome to the original words with no
          conditions quietly added along the way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 21:6</h3>
        <VerseQuote
          text="And Sarah said, God hath made me to laugh, so that all that hear will laugh with me."
          reference="Genesis 21:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same laughter that was once hidden and denied in Genesis 18 comes back out loud, shared
          instead of concealed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 21:17</h3>
        <VerseQuote
          text="And God heard the voice of the lad; and the angel of God called to Hagar out of heaven, and said unto her, What aileth thee, Hagar? fear not; for God hath heard the voice of the lad where he is."
          reference="Genesis 21:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Ishmael&apos;s own name means God hears, and this verse proves the name still holds years after
          it was first given.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 21:20</h3>
        <VerseQuote text="And God was with the lad; and he grew, and dwelt in the wilderness, and became an archer." reference="Genesis 21:20" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Sent out of Abraham&apos;s household, Ishmael is never sent out of God&apos;s presence. The
          chapter is careful to keep those two facts separate.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 21:33</h3>
        <VerseQuote
          text="And Abraham planted a grove in Beersheba, and called there on the name of the LORD, the everlasting God."
          reference="Genesis 21:33"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A new name for God, the everlasting God, spoken by a man who has just watched a twenty five year
          old promise arrive exactly on time.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 21
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 21 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records the long promised birth of Isaac to Abraham and Sarah in their old age, Sarah&apos;s
          demand that Hagar and Ishmael be sent away after Ishmael mocks Isaac, God&apos;s provision for
          Hagar and Ishmael in the wilderness, and a covenant Abraham makes with King Abimelech over a well
          at Beersheba.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Abraham when Isaac was born?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 21:5 states Abraham was a hundred years old when Isaac was born, matching the timeline
          Genesis 17 already laid out a year earlier.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Sarah want Hagar and Ishmael cast out?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 21:9 and 10 says Sarah saw Ishmael mocking, then demanded he and Hagar be sent away so
          Ishmael could not share the inheritance with Isaac. Her stated reasoning centers on protecting
          Isaac&apos;s status as heir.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;mocking&quot; mean in Genesis 21:9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Hebrew word shares its root with Isaac&apos;s own name and can range in meaning from playful
          laughing to real mockery. Genesis does not specify which. Galatians 4:29 later calls it
          persecution, a stronger reading than the bare word in Genesis requires on its own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God agree with Sarah instead of defending Ishmael?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 21:12 ties God&apos;s instruction to the covenant already decided in Genesis 17, that
          Isaac would carry the promised line forward, not to an endorsement of everything about Sarah&apos;s
          character or motives.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God abandon Ishmael?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Genesis 21:13, 17, 18, and 20 all state directly that God would make Ishmael a nation, heard
          his voice in the wilderness, and was with him as he grew. He was excluded from Abraham&apos;s
          inheritance, not from God&apos;s care.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Beersheba mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 21:31 ties the name to the oath Abraham and Abimelech swore there. The Hebrew wording
          also carries the sense of seven, matching the seven ewe lambs Abraham gave as a witness that he
          had dug the well in verses 28 to 30.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Abimelech appear again so soon after Genesis 20?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 21:22 has Abimelech noting that God is with Abraham in everything he does, and asking for
          a sworn promise not to be dealt with falsely, directly referencing the kind of deception Abraham
          had just shown him in the previous chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Paul use Hagar and Sarah in the New Testament?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Galatians 4:22 to 31 reads Hagar and Sarah as an allegory for two covenants, slavery under the
          law and freedom through promise, quoting Genesis 21:10 directly to argue that believers belong to
          the promise, not the bondage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Ishmael after Genesis 21?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 21:20 and 21 says he grew up in the wilderness of Paran, became an archer, and married an
          Egyptian woman his mother chose for him. Genesis 25 later records his descendants and his death.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 21 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It fulfills the promise first given to{" "}
          <ArticleLink href="/blog/who-was-sarah">Sarah</ArticleLink> by name in Genesis 18, resolves the
          tension that began when <ArticleLink href="/blog/who-was-hagar">Hagar</ArticleLink> first fled in
          Genesis 16, and sets up the covenant test God brings to Abraham over this same son in the very
          next chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 21 refuses to let one family&apos;s joy erase another family&apos;s pain.</p>
          <p>
            📌 <strong>A promise kept exactly as spoken is still worth naming out loud.</strong> Genesis
            repeats &quot;as he had said&quot; and &quot;as he had spoken&quot; in the same sentence, on
            purpose, after twenty five years of waiting.
          </p>
          <p>
            📌 <strong>Being sent away from an inheritance is not the same as being sent away from
            God.</strong> Hagar and Ishmael leave Abraham&apos;s tent with almost nothing, and God meets
            them anyway, by name, in the exact place they run out of water.
          </p>
          <p>
            📌 <strong>Integrity with the people around you and faithfulness to God are not separate
            projects.</strong> The same chapter that settles Isaac&apos;s inheritance also has Abraham
            settling a well dispute honestly with a king he had wronged only one chapter earlier.
          </p>
          <p>
            You may be holding an answered prayer in one hand and someone else&apos;s hard situation in
            the other, unsure how both can be true at once.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Let your own answered prayer make you more attentive to the person still waiting in the
            wilderness, not less, the way God stayed attentive to both households in this chapter at once.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
