import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-12-explained", {
  title: "Genesis 12 Explained: The Call of Abram and the Promise That Changes Everything",
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

export default function GenesisTwelveExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-12-explained"
      title={<>📖 Genesis 12 Explained: The Call of Abram and the Promise That Changes Everything</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One man. One command. One promise big enough to cover every nation on earth.</p>
            <p>
              <strong>Genesis 12 explained</strong> is the chapter where the Bible narrows from the
              whole human race down to a single family, and stays there for the rest of the book. God
              speaks to a seventy five year old man named Abram and tells him to leave everything he
              knows, in exchange for a promise he cannot yet see any way to keep.
            </p>
            <p>Maybe you have made a promise to God that felt too big for your own situation to hold.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God choose Abram specifically, out of everyone alive?</li>
            <li>❓ What exactly did God promise him, and how much of it did Abram actually see fulfilled?</li>
            <li>❓ Why does the man of faith lie about his own wife within the same chapter he obeys God?</li>
            <li>❓ And what does any of this have to do with you, thousands of years later?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Genesis 12 is where the promise of a Savior, first spoken in Eden, gets handed
              to one specific family for the first time.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the call, the promise, the
              obedience, the altars, the famine, and the frightened lie that nearly cost Abram
              everything the promise was supposed to give him.
            </p>
            <p>A man leaves home not knowing where he is going. Somehow that becomes the model for faith itself.</p>
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
            <ArticleLink href="/blog/genesis-11-explained">Genesis 11</ArticleLink> ended with a family
            already in motion, and a journey already stalled. Terah took his son Abram, his
            grandson Lot, and his daughter in law Sarai, and set out from Ur of the Chaldees for the
            land of Canaan. They never made it. The family stopped in Haran, and stayed there until
            Terah died.
          </p>
          <p>
            That same chapter also dropped one quiet, painful detail right before the journey began:
            &quot;But Sarai was barren; she had no child.&quot; Whatever God was about to do with this
            family, it could not run on{" "}
            <ArticleLink href="/blog/who-was-sarah">Abram and Sarai&apos;s</ArticleLink> own ability to
            have children.
          </p>
          <p>
            📌 <strong>Genesis 11 ends with an unfinished trip and a childless couple. Genesis 12 opens
            with God finishing what Terah started, and building a promise directly on top of the
            problem Sarai&apos;s barrenness created.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 12 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Call and the Promise (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with God speaking directly to one man, with no introduction and no buildup.</p>
        </div>
        <VerseQuote
          text="Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee: And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing: And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed."
          reference="Genesis 12:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what God asks Abram to leave, in order: his country, his kindred, his
            father&apos;s house.</strong> Each one is a smaller, more personal circle than the last.
            This is not a relocation. It is a stripping away of every source of identity and security
            Abram has ever had, before God gives him a single detail about where he is actually going.
          </p>
          <p>
            The promise that follows has five parts, and they stack on each other: a great nation, a
            blessing, a great name, protection for those connected to him, and a blessing that reaches
            every family on earth through him. That last part is the one worth slowing down on.
          </p>
          <p>
            💡 &quot;In thee shall all families of the earth be blessed&quot; is not a small line. It
            reaches back to the first promise God ever made after sin entered the world, that a
            descendant would undo what the serpent broke in{" "}
            <ArticleLink href="/blog/genesis-3-explained">Genesis 3</ArticleLink>. Genesis 12 is where
            that promise gets handed to a specific family for the first time, instead of staying a
            general hope for humanity.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Abram Obeys, at Seventy Five (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God speaks a promise with no timeline attached. Abram&apos;s response is immediate.</p>
        </div>
        <VerseQuote
          text="So Abram departed, as the LORD had spoken unto him; and Lot went with him: and Abram was seventy and five years old when he departed out of Haran."
          reference="Genesis 12:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Seventy five years old, with no children and no land, and Abram leaves anyway.</strong>{" "}
            The text does not record a single question back to God, no negotiation, no request for
            more information. Just departure. Lot comes along too, the nephew whose grandfather Haran
            died young back in Ur, now tied to his uncle&apos;s journey instead of his own father&apos;s.
          </p>
        </div>
        <VerseQuote
          text="And Abram passed through the land unto the place of Sichem, unto the plain of Moreh. And the Canaanite was then in the land."
          reference="Genesis 12:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 That last sentence, &quot;the Canaanite was then in the land,&quot; is easy to skim
            past, but it matters. Abram arrives at the land God is about to promise him, and it is
            already fully occupied. The promise does not come with an empty plot of land waiting.
            It comes with a claim laid down in the middle of someone else&apos;s territory, and it
            will take centuries before Abram&apos;s descendants actually possess any of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Altars in a Land That Is Not Yet His (verses 7 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God speaks again, and for the first time names exactly what the land promise means.</p>
        </div>
        <VerseQuote
          text="And the LORD appeared unto Abram, and said, Unto thy seed will I give this land: and there builded he an altar unto the LORD, who appeared unto him."
          reference="Genesis 12:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Abram does not own a single foot of this land yet. He builds an altar on it
            anyway.</strong> That is the pattern this chapter sets for the rest of Genesis: Abram
            keeps worshiping in a land he has only been promised, never one he has actually received.
          </p>
        </div>
        <VerseQuote
          text="And he removed from thence unto a mountain on the east of Bethel, and pitched his tent, having Bethel on the west, and Hai on the east: and there he builded an altar unto the LORD, and called upon the name of the LORD."
          reference="Genesis 12:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A second altar, a second act of worship, before a single promise has visibly come true.
            Then the chapter moves him further south, toward a test the text does not warn him is
            coming.
          </p>
        </div>
        <VerseQuote text="And Abram journeyed, going on still toward the south." reference="Genesis 12:9" />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Famine, Fear, and a Half Truth (verses 10 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns sharply from worship to survival.</p>
        </div>
        <VerseQuote
          text="And there was a famine in the land: and Abram went down into Egypt to sojourn there; for the famine was grievous in the land."
          reference="Genesis 12:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice what is missing from this verse.</strong> There is no record of Abram
            asking God whether to go down to Egypt, the way he had clear direction to leave Haran in
            the first place. The man who obeyed a command with no details now makes his own decision
            under pressure, with no mention of consulting the LORD at all.
          </p>
          <p>As they near the border, fear takes over, and Abram makes a plan.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when he was come near to enter into Egypt, that he said unto Sarai his wife, Behold now, I know that thou art a fair woman to look upon: Therefore it shall come to pass, when the Egyptians shall see thee, that they shall say, This is his wife: and they will kill me, but they will save thee alive. Say, I pray thee, thou art my sister: that it may be well with me for thy sake; and my soul shall live because of thee."
          reference="Genesis 12:11 to 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Read closely, and Abram is not only asking Sarai to protect him. He is asking
            her to absorb the danger he is afraid of himself.</strong> &quot;My soul shall live because
            of thee&quot; means his safety runs directly through whatever happens to her once she is
            taken into another man&apos;s household. This is the same man who left his whole country on
            a promise with no proof, now managing a crisis on his own terms instead of trusting the God
            who has not stopped speaking to him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Pharaoh, the Plague, and Being Sent Away (verses 14 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The plan works exactly the way Abram feared it might.</p>
        </div>
        <VerseQuote
          text="And it came to pass, that, when Abram was come into Egypt, the Egyptians beheld the woman that she was very fair. The princes also of Pharaoh saw her, and commended her before Pharaoh: and the woman was taken into Pharaoh's house."
          reference="Genesis 12:14 and 15"
        />
        <VerseQuote
          text="And he entreated Abram well for her sake: and he had sheep, and oxen, and he asses, and menservants, and maidservants, and she asses, and camels."
          reference="Genesis 12:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The lie appears to work, and Abram grows wealthy from it.</strong> Sheep, oxen,
            donkeys, servants, and camels all arrive because Pharaoh believes he has fairly compensated
            a woman&apos;s brother for her hand. The text does not celebrate this. It simply records
            what the deception bought, right before showing what it nearly cost.
          </p>
        </div>
        <VerseQuote text="And the LORD plagued Pharaoh and his house with great plagues because of Sarai Abram's wife." reference="Genesis 12:17" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God intervenes to protect Sarai, and to protect the promise, not because Abram
            handled the situation well.</strong> Nothing in the text credits Abram with any plan to fix
            what he started. God simply steps in.
          </p>
        </div>
        <VerseQuote
          text="And Pharaoh called Abram, and said, What is this that thou hast done unto me? why didst thou not tell me that she was thy wife? Why saidst thou, She is my sister? so I might have taken her to me to wife: now therefore behold thy wife, take her, and go thy way."
          reference="Genesis 12:18 and 19"
        />
        <VerseQuote text="And Pharaoh commanded his men concerning him: and they sent him away, and his wife, and all that he had." reference="Genesis 12:20" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A pagan king ends up rebuking the man God called.</strong> Pharaoh asks the exact
            question Abram should have been able to answer honestly from the start: why didn&apos;t you
            tell me the truth? The chapter that opened with Abram trusting God perfectly closes with a
            foreign ruler having to correct him. The promise survives the chapter, but it survives
            despite Abram&apos;s choices here, not because of them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 12 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was this the first time God spoke to Abram?</strong> Genesis 12:1 says &quot;the
            LORD had said unto Abram,&quot; a phrasing that can describe something already spoken
            before this point in the story. Stephen&apos;s speech in Acts 7:2 and 3 states plainly that
            &quot;the God of glory appeared unto our father Abraham, when he was in Mesopotamia, before
            he dwelt in Charran,&quot; meaning God&apos;s call may have first come while the family was
            still in Ur, with Genesis 12 recording the same call repeated, or completed, once Terah was
            gone. Genesis itself does not spell out the timing in detail, but the New Testament&apos;s
            own account fits with the call beginning earlier than this chapter.
          </p>
          <p>
            <strong>Did Abram actually lie about Sarai being his sister?</strong> Not entirely. Genesis
            20:12 later has Abram explain that Sarai was &quot;the daughter of my father, but not the
            daughter of my mother,&quot; making her his half sister by blood. The statement was
            technically true. But leaving out the fact that she was also his wife was a deliberate
            deception, built to protect himself at his wife&apos;s expense. A half truth told to create
            a false impression is still a lie in every way that matters.
          </p>
          <p>
            <strong>Why did God protect Abram and bless him anyway, right after this failure?</strong>{" "}
            Genesis 12 never suggests Abram earned the promise through good behavior. The blessing was
            spoken before Abram had done anything at all, and it survives his worst moment in the same
            chapter without being revoked. This is a pattern that runs through the rest of Scripture:
            God&apos;s promises rest on His own character, not on the perfect performance of the person
            receiving them.
          </p>
          <p>
            <strong>Does &quot;curse him that curseth thee&quot; mean God guarantees to bless or curse
            nations today based on how they treat modern Israel?</strong> Christians genuinely disagree
            on how directly this verse applies beyond Abram himself. Some read it as an enduring
            principle tied to God&apos;s ongoing relationship with Abram&apos;s physical descendants.
            Others read it as a promise specific to the patriarch and the founding of his family line,
            fulfilled and reinterpreted through the New Testament&apos;s teaching that Abram&apos;s true
            heirs are those who share his faith, as Galatians 3:7 and 29 describe. Genesis 12 alone does
            not settle every detail of how the verse should be applied to nations and politics thousands
            of years later, and sincere believers land in different places on it.
          </p>
          <p>
            <strong>Was going down to Egypt during the famine a failure of faith?</strong> The text does
            not directly condemn the decision to leave Canaan during a famine, and later Scripture
            records other patriarchs doing similar things in hard times. What it does show plainly is
            that Abram left without any recorded word from God, in contrast to how carefully the chapter
            documents God speaking to him everywhere else. Whatever judgment belongs on the decision to
            go, the deception once he arrived is the part the text clearly frames as wrong.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 12:1 to 3</h3>
        <VerseQuote
          text="Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee: And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing: And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed."
          reference="Genesis 12:1 to 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The Abrahamic covenant in full, spoken to a man with no children and no land, and the
          moment the promise of a worldwide blessing gets attached to one specific family for the
          first time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 12:4</h3>
        <VerseQuote
          text="So Abram departed, as the LORD had spoken unto him; and Lot went with him: and Abram was seventy and five years old when he departed out of Haran."
          reference="Genesis 12:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Immediate obedience at an age most people would call it too late to start over, with no
          recorded hesitation between the promise and the departure.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 12:7</h3>
        <VerseQuote
          text="And the LORD appeared unto Abram, and said, Unto thy seed will I give this land: and there builded he an altar unto the LORD, who appeared unto him."
          reference="Genesis 12:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The land promise stated for the first time, and Abram&apos;s response is worship in a
          country he does not yet own a single acre of.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 12:13</h3>
        <VerseQuote
          text="Say, I pray thee, thou art my sister: that it may be well with me for thy sake; and my soul shall live because of thee."
          reference="Genesis 12:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same man who trusted God enough to leave everything now trusts his own scheme enough
          to put his wife at risk to save himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 12:17</h3>
        <VerseQuote text="And the LORD plagued Pharaoh and his house with great plagues because of Sarai Abram's wife." reference="Genesis 12:17" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God protecting the promise directly, stepping in for Sarai when Abram had no plan left to
          protect her himself.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 12 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records God calling Abram to leave his country for a land he has not yet seen, promising
          to make him a great nation and bless every family on earth through him. The chapter then
          follows Abram&apos;s obedient departure, his worship in Canaan, and a famine that sends him
          to Egypt, where fear leads him to deceive Pharaoh about his marriage to Sarai.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Abrahamic covenant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The promise God makes to Abram in Genesis 12:1 to 3: a great nation descended from him, a
          personal blessing and a great name, protection for those who bless him and judgment for those
          who curse him, and a blessing that reaches every family on earth through his line. This
          promise gets repeated and expanded in later chapters of Genesis.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God choose Abram specifically?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 12 does not give a reason. It records the call being spoken, not a qualification
          Abram met first. Nothing in the surrounding chapters describes him doing something to earn
          the promise before it was given.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Abram lie about Sarai being his sister?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He told Pharaoh she was his sister and left out that she was also his wife. Genesis 20:12
          later reveals she was his half sister by his father, so the statement was technically true,
          but the deception was real, since he deliberately hid the marriage to protect himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Sarai really Abram&apos;s half sister?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          According to Genesis 20:12, yes. Abram explains there that Sarai was the daughter of his
          father but not his mother. Marriage between close relatives was not forbidden at this early
          point in biblical history, though it was later restricted under the law given to Moses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Abram go down to Egypt during the famine?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 12:10 says simply that the famine in Canaan was severe. The chapter does not record
          Abram receiving direction from God to go, which stands out against how clearly the rest of
          the chapter documents God speaking to him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;in thee shall all families of the earth be blessed&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It promises that the blessing given to Abram will not stay limited to his own descendants but
          will eventually reach every nation. Christians read this as pointing forward to Jesus, a
          descendant of Abram whose life, death, and resurrection extend God&apos;s blessing to people
          from every family on earth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Abram when he left Haran?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Seventy five, according to Genesis 12:4. He would not see the birth of Isaac, the son the
          promise depended on, for another twenty five years, a wait explored fully in{" "}
          <ArticleLink href="/blog/could-you-sacrifice-your-isaac">the story of Abraham and Isaac</ArticleLink>.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God punish Abram for lying about Sarai?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not directly. The plague in Genesis 12:17 falls on Pharaoh&apos;s household, not Abram, and
          Abram leaves Egypt wealthier than he arrived. The consequence lands on the people deceived,
          while God quietly protects the promise and the woman it depended on.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where are Shechem, Bethel, and Hai located?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All three sit in the hill country of central Canaan, the same region that becomes the heartland
          of Israel later in the Old Testament. Shechem lies further north, while Bethel and Hai (also
          spelled Ai) sit closer together, marking the path Abram travels south through the land God has
          just promised him.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 12 holds two very different pictures of the same man, in the same chapter, only a few verses apart.</p>
          <p>
            📌 <strong>Faith that obeys instantly can still fail under pressure.</strong> The same
            Abram who left his whole country on nothing but a spoken word later handled a famine by
            managing the crisis himself instead of asking God about it.
          </p>
          <p>
            📌 <strong>The promise never depended on Abram getting it right.</strong> God protected
            Sarai and confronted Pharaoh Himself, while Abram stood by with no plan left of his own.
          </p>
          <p>
            📌 <strong>A blessing for the whole world started with one flawed man&apos;s obedience.</strong>{" "}
            &quot;In thee shall all families of the earth be blessed&quot; did not wait for Abram to
            become someone who deserved it.
          </p>
          <p>
            You may have obeyed God well in one season and managed your own fear badly in the very
            next one. Genesis 12 says that combination does not disqualify you from the promise
            either.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Open Genesis 13 next. Abram leaves Egypt, and has to decide what kind of man he is going
            to be with the wealth he brought back from his own mistake.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
