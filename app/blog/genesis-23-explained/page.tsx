import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-23-explained", {
  title: "Genesis 23 Explained: Sarah's Death and the Cave of Machpelah",
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

export default function GenesisTwentyThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-23-explained"
      title={<>📖 Genesis 23 Explained: Sarah&apos;s Death and the Cave of Machpelah</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>God promised Abraham an entire country. This chapter shows him owning one field and a cave.</p>
            <p>
              <strong>Genesis 23 explained</strong> is the record of Sarah&apos;s death and the negotiation that
              follows it: Abraham, grieving, standing before strangers in a foreign land, asking to buy a place to
              bury his wife. What looks like a simple real estate transaction turns out to be the first piece of
              the promised land Abraham ever actually owns.
            </p>
            <p>Maybe you have stood at a grave and felt how little control you actually have over anything that matters.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did Abraham refuse land the Hittites offered him for free?</li>
            <li>❓ Was four hundred shekels of silver a fair price, or was Abraham overcharged?</li>
            <li>❓ Why does an entire chapter slow down for a real estate negotiation?</li>
            <li>❓ If God already promised Abraham the whole land, why did he need to buy any of it?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Abraham owned nothing in the land God promised him, until his wife died and he had to
              bury her somewhere.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: Sarah&apos;s death, Abraham&apos;s request
              to strangers, the generous offer he will not accept as a gift, the price finally named, and the
              burial that turns a cave near Hebron into the family tomb for generations to come.
            </p>
            <p>Watch how much faith is hiding inside a chapter that reads, on the surface, like a contract.</p>
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
            <ArticleLink href="/blog/genesis-22-explained">Genesis 22</ArticleLink> ended on a mountain, with a
            father who did not withhold his son and an oath from God that reached all the way to every nation on
            earth. The chapter closed quietly, with a list of names back home, one of them a granddaughter named
            Rebekah who does not yet know she will marry Isaac.
          </p>
          <p>
            Genesis 23 opens on a very different kind of loss. <ArticleLink href="/blog/who-was-sarah">Sarah</ArticleLink>{" "}
            was the woman who laughed at the idea of bearing a son in{" "}
            <ArticleLink href="/blog/genesis-18-explained">Genesis 18</ArticleLink>, then held that son in her arms
            in <ArticleLink href="/blog/genesis-21-explained">Genesis 21</ArticleLink>. She was there for the
            promise, the long wait, and the fulfillment. She was not there for the mountain in Genesis 22. Now
            Abraham loses her, and Isaac loses his mother, with no warning given in the text at all.
          </p>
          <p>
            📌 <strong>God had already promised Abraham this entire land back in Genesis 15 and 17.</strong> This
            chapter is the first time Abraham actually holds a legal deed to any part of it, and it is only enough
            ground for a grave.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 23 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Sarah&apos;s Death, and a Grief With No Home Country (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the only exact age at death Scripture ever gives for a woman.</p>
        </div>
        <VerseQuote
          text="And Sarah was an hundred and seven and twenty years old: these were the years of the life of Sarah."
          reference="Genesis 23:1"
        />
        <VerseQuote
          text="And Sarah died in Kirjatharba; the same is Hebron in the land of Canaan: and Abraham came to mourn for Sarah, and to weep for her."
          reference="Genesis 23:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>One hundred twenty seven years, stated plainly, then never repeated for any other woman in
            the Bible.</strong> No other wife, mother, or matriarch gets that exact bookkeeping. Sarah does, right
            at the chapter where the text is about to spend real attention on how she is buried.
          </p>
          <p>
            &quot;Mourn&quot; and &quot;weep&quot; are two separate words doing two separate jobs. One is the
            formal ritual of loss, the kind a household and a community would recognize. The other is the raw,
            personal grief underneath it. Abraham does both. Nothing in this verse rushes him past either one.
          </p>
          <p>
            💡 Kirjatharba means &quot;city of Arba,&quot; an older name for Hebron, and the text pauses to
            translate it for the reader even here, before the city has any other role in this chapter than being
            the place a woman died.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. &quot;I Am a Stranger and a Sojourner&quot; (verses 3 and 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abraham gets up from his grief and does something that should not have been necessary.</p>
        </div>
        <VerseQuote
          text="And Abraham stood up from before his dead, and spake unto the sons of Heth, saying, I am a stranger and a sojourner with you: give me a possession of a buryingplace with you, that I may bury my dead out of my sight."
          reference="Genesis 23:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The man God already promised this entire land calls himself a stranger and a sojourner
            inside it.</strong> Decades after leaving his own country at God&apos;s call, Abraham still owns
            nothing here. Not a field, not a well he can claim outright, not a plot to bury his own wife.
          </p>
          <p>
            He does not demand anything. He asks, using the language of someone with no standing to demand,
            because by every legal measure of the time, he had none. That posture, humble and specific at the same
            time, sets the tone for the whole negotiation that follows.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Free Gift Abraham Will Not Accept (verses 5 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The sons of Heth, the Hittites of Hebron, answer with real generosity.</p>
        </div>
        <VerseQuote
          text="Hear us, my lord: thou art a mighty prince among us: in the choice of our sepulchres bury thy dead; none of us shall withhold from thee his sepulchre, but that thou mayest bury thy dead."
          reference="Genesis 23:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The Hebrew behind &quot;mighty prince&quot; runs stronger than the English, closer to &quot;prince
            of God.&quot; People outside Abraham&apos;s faith recognize something in him that his own family
            struggled to see clearly at times. Every tomb in the area is offered to him, no charge, no conditions.
          </p>
          <p>Abraham bows to them, then asks for something far more specific than the open offer they just made.</p>
        </div>
        <VerseQuote
          text="That he may give me the cave of Machpelah, which he hath, which is in the end of his field; for as much money as it is worth he shall give it me for a possession of a buryingplace amongst you."
          reference="Genesis 23:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Abraham names the exact cave, the exact owner, and insists on paying for as much money as
            it is worth.</strong> He does not take the free general offer in verse 6. He asks, in public, in front
            of everyone at the city gate, for one particular piece of ground, purchased in full.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Ephron Names His Price (verses 10 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ephron himself is sitting right there, and he answers in front of the whole gathered city.</p>
        </div>
        <VerseQuote
          text="Nay, my lord, hear me: the field give I thee, and the cave that is therein, I give it thee; in the presence of the sons of my people give I it thee: bury thy dead."
          reference="Genesis 23:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This whole exchange happens where legal business was actually done in that world, at the city gate,
            in front of witnesses. The same custom shows up later in Ruth 4, when Boaz settles his claim on
            Ruth&apos;s land in front of the elders sitting at Bethlehem&apos;s gate. Nothing here is private or
            informal. Every word is meant to be remembered by the people standing around.
          </p>
          <p>Abraham refuses the free gift a second time and asks again, plainly, to pay.</p>
        </div>
        <VerseQuote
          text="But if thou wilt give it, I pray thee, hear me: I will give thee money for the field; take it of me, and I will bury my dead there."
          reference="Genesis 23:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ephron finally names a number, wrapped in a line that tries to make it sound small.</p>
        </div>
        <VerseQuote
          text="My lord, hearken unto me: the land is worth four hundred shekels of silver; what is that betwixt me and thee? bury therefore thy dead."
          reference="Genesis 23:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Four hundred shekels of silver is a steep price, named right after Ephron just said the
            field and cave were free.</strong> Generations later, David pays fifty shekels of silver for an entire
            threshing floor and a pair of oxen. Abraham pays eight times that for one field and one cave, at the
            exact moment he has no leverage to negotiate.
          </p>
          <p>
            Abraham does not argue the number. He weighs it out on the spot, in silver recognized as standard
            weight by any merchant, since coined money did not yet exist.
          </p>
        </div>
        <VerseQuote
          text="And Abraham hearkened unto Ephron; and Abraham weighed to Ephron the silver, which he had named in the audience of the sons of Heth, four hundred shekels of silver, current money with the merchant."
          reference="Genesis 23:16"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Land Made Sure, and Sarah Laid to Rest (verses 17 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with the language of a completed, witnessed legal transfer, stated twice.</p>
        </div>
        <VerseQuote
          text="And the field of Ephron, which was in Machpelah, which was before Mamre, the field, and the cave which was therein, and all the trees that were in the field, that were in all the borders round about, were made sure unto Abraham for a possession in the presence of the children of Heth, before all that went in at the gate of his city."
          reference="Genesis 23:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The field, the cave, and every tree on the property are listed, the kind of exact detail a real
            deed would carry. This is not a poem or a summary. It reads like a record someone expected future
            generations to be able to check.
          </p>
        </div>
        <VerseQuote
          text="And after this, Abraham buried Sarah his wife in the cave of the field of Machpelah before Mamre: the same is Hebron in the land of Canaan."
          reference="Genesis 23:19"
        />
        <VerseQuote
          text="And the field, and the cave that is therein, were made sure unto Abraham for a possession of a buryingplace by the sons of Heth."
          reference="Genesis 23:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The legal phrase &quot;made sure unto Abraham&quot; appears twice in four verses.</strong>{" "}
            Genesis does not usually repeat itself this closely by accident. The cave of Machpelah becomes the
            family tomb for generations after this: Abraham himself, then Isaac, Rebekah, Jacob, and Leah are all
            later buried in this same ground.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 23 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>If God already promised Abraham this whole land, why did he have to buy any of it?</strong>{" "}
            The promise and the possession were never the same thing in Abraham&apos;s own lifetime. Stephen says
            it directly in Acts 7:5, that God gave Abraham no inheritance in the land, not even ground to set his
            foot on, though He promised it to his descendants. Buying a grave here is not Abraham losing faith in
            the promise. It is the only piece of the promise he would ever hold in his own hands.
          </p>
          <p>
            <strong>Why did Abraham refuse land the Hittites offered him for free?</strong> A free gift can carry
            hidden strings, an unspoken debt, a claim someone could raise later. Abraham wanted a title no one
            could ever dispute, witnessed publicly and paid for in full, for one reason: so this piece of ground
            would belong to his family with no question attached to it, ever.
          </p>
          <p>
            <strong>Was four hundred shekels of silver a fair price, or was Abraham taken advantage of?</strong>{" "}
            The text does not say outright, but the shape of the conversation, a generous offer followed by a
            number dressed up as small, reads like a familiar kind of bargaining. Abraham was a wealthy man
            negotiating with no leverage, at the worst possible moment to walk away. He paid it without
            objection, which fits a man who came to bury his wife, not to win a negotiation.
          </p>
          <p>
            <strong>Why does the Bible spend an entire chapter on a real estate transaction?</strong> Because this
            is the moment the promise of land stops being only words. A cave and a field, purchased, witnessed,
            and recorded by name, become the one fixed point Abraham&apos;s family can return to for generations,
            long before any of them possess the rest of the country God promised them.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips From Abraham&apos;s Grief and Integrity
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 23 is not only a record of loss. It is a picture of how to carry grief and business at once.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Let yourself mourn and weep, both.</strong> Abraham did not skip past his grief to handle
            business. He mourned and wept for Sarah first, and only then stood up to act.
          </li>
          <li>
            <strong>Ask plainly when you need something, even from strangers.</strong> Abraham called himself a
            stranger and a sojourner, then asked directly for exactly what he needed. Humility and clarity are not
            opposites.
          </li>
          <li>
            <strong>Pay your own way when you can, even under pressure.</strong> Abraham refused a free gift twice
            because he wanted no debt attached to something this important. Consider what you might be accepting
            for free that would cost you more later.
          </li>
          <li>
            <strong>Be specific about what you are asking for.</strong> Abraham did not accept a vague offer of
            &quot;any sepulchre.&quot; He named the cave, the owner, and the terms. Vague requests get vague
            outcomes.
          </li>
          <li>
            <strong>Honor people outside your own faith.</strong> Abraham bowed to the Hittites twice in this
            chapter. Respecting people who do not share your beliefs is not a compromise of them.
          </li>
          <li>
            <strong>Take the next faithful step, even before you see the whole promise.</strong> Abraham owned one
            field while still waiting on an entire country. Faith often looks like buying the one small piece in
            front of you, not the whole thing at once.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 4 Bible Verses From Genesis 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 23:4</h3>
        <VerseQuote
          text="I am a stranger and a sojourner with you: give me a possession of a buryingplace with you, that I may bury my dead out of my sight."
          reference="Genesis 23:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Abraham&apos;s own description of his standing in the promised land, decades after God first called him
          into it. He still owned nothing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 23:6</h3>
        <VerseQuote
          text="Hear us, my lord: thou art a mighty prince among us: in the choice of our sepulchres bury thy dead; none of us shall withhold from thee his sepulchre, but that thou mayest bury thy dead."
          reference="Genesis 23:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Outsiders who did not share Abraham&apos;s faith still recognized something set apart about him, and
          offered their best without being asked twice.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 23:16</h3>
        <VerseQuote
          text="And Abraham hearkened unto Ephron; and Abraham weighed to Ephron the silver, which he had named in the audience of the sons of Heth, four hundred shekels of silver, current money with the merchant."
          reference="Genesis 23:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A steep price, paid without argument, weighed out in public where every witness could see the debt was
          settled in full.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 23:19</h3>
        <VerseQuote
          text="And after this, Abraham buried Sarah his wife in the cave of the field of Machpelah before Mamre: the same is Hebron in the land of Canaan."
          reference="Genesis 23:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first piece of the promised land Abraham ever legally owned becomes his wife&apos;s grave, and later
          his own.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 23 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records Sarah&apos;s death at Kirjatharba, also called Hebron, and Abraham&apos;s negotiation with
          the Hittites to buy the cave of Machpelah as a burial place, the first land Abraham ever legally owns in
          Canaan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old was Sarah when she died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 23:1 says she was one hundred twenty seven years old, the only woman in the Bible whose exact
          age at death is stated.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the cave of Machpelah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A cave in a field near Mamre, owned by Ephron the Hittite, which Abraham bought for four hundred shekels
          of silver as a burial place for Sarah. It later became the burial site for Abraham, Isaac, Rebekah,
          Jacob, and Leah.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where is Kirjatharba, and why is it called Hebron?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 23:2 says Kirjatharba, meaning &quot;city of Arba,&quot; is the same place as Hebron. The text
          gives both names so the reader recognizes the location by its later, more familiar name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Abraham refuse to accept the land for free?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He wanted a title no one could later dispute. Genesis 23:9 and 13 show him asking twice to pay full
          price, even after the Hittites offered any tomb in the area at no cost.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How much was four hundred shekels of silver worth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not convert it to a modern value, but it reads as a high price for one field and cave.
          Generations later, David paid fifty shekels of silver for an entire threshing floor and oxen in 2 Samuel
          24:24, a small fraction of what Abraham paid here.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter mention the trees in the field?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 23:17 lists the field, the cave, and every tree on the property as part of the legal transfer,
          the kind of specific detail a formal deed would record, meant to remove any later dispute over what
          Abraham actually bought.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who else was buried in the cave of Machpelah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Later chapters of Genesis record Abraham, Isaac, Rebekah, Jacob, and Leah all buried in this same cave,
          making it the family tomb for three generations of patriarchs and their wives.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">If Abraham already had God&apos;s promise of the land, why does Acts 7:5 say he had no inheritance in it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Stephen&apos;s point in Acts 7:5 is that the promise had not yet become possession during Abraham&apos;s
          own life, not even ground to stand on. Genesis 23 fits that exactly: the one piece of land Abraham ever
          held was a grave, purchased at the moment he needed it most.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the lesson of Genesis 23 for today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That grief and faith can move through the same chapter without cancelling each other out, and that
          faith often takes shape in one small, concrete step, like buying one field, long before the larger
          promise is fully in hand.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 23 is quiet compared to the chapter before it, and it still has something to say to you.</p>
          <p>
            📌 <strong>Grief does not cancel faith, and faith does not skip grief.</strong> Abraham mourned and
            wept for Sarah before he stood up to secure a burial place, and Scripture never rushes him past either
            one.
          </p>
          <p>
            📌 <strong>Owning nothing yet is not the same as being forgotten.</strong> Abraham called himself a
            stranger in the very land God promised him, and Hebrews 11:13 later says the same was true of every
            patriarch who died still waiting on the fuller promise.
          </p>
          <p>
            📌 <strong>One faithful, specific step can be the down payment on a promise you have not fully
            received.</strong> Abraham bought one field and one cave. It was not the whole land God promised, but
            it was real, and it was his.
          </p>
          <p>You may be holding onto a promise that still feels entirely out of reach.</p>
          <p>So here is your one next step.</p>
          <p>
            Look for the one small, concrete thing in front of you right now, and take it, the way Abraham bought
            one field instead of waiting to own the whole country before he trusted God with any of it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
