import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-2-explained", {
  title: "Exodus 2 Explained: Baby Moses in the Basket and the Flight to Midian",
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

export default function ExodusTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-2-explained"
      title={<>📖 Exodus 2 Explained: Baby Moses in the Basket and the Flight to Midian</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A king orders every Hebrew baby boy thrown in a river. One mother answers by putting her own son in that same river on purpose.</p>
            <p>
              <strong>Exodus 2 explained</strong> is the chapter that gets Moses from a basket in
              the reeds to a well in a foreign country, forty years apart, in only twenty five
              verses. A baby born under a death sentence grows up in the house of the very king who
              signed it, then throws it all away for a people who do not even recognize him as one
              of their own.
            </p>
            <p>Maybe you have had to decide which side you actually belong to, even when it cost you everything comfortable.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ How does a death sentence turn into an adoption?</li>
            <li>❓ Why does Moses kill a man, then run for his life?</li>
            <li>❓ What happens to Moses during the forty silent years this chapter skips over?</li>
            <li>❓ And why does the chapter end on Israel groaning instead of on Moses at all?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every major turn in this chapter happens because someone refused to leave
              a baby, a stranger, or a suffering people alone.</strong>
            </p>
            <p>
              This walkthrough goes through Exodus 2 in order: the basket in the river, the
              princess who adopts a Hebrew son, the killing that sends Moses running, the well in
              Midian where he builds a new life, and the verse that quietly sets up everything
              Exodus 3 is about to do.
            </p>
            <p>A chapter with no miracles in it still manages to be the hinge the whole book turns on.</p>
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
            <ArticleLink href="/blog/exodus-1-explained">Exodus 1</ArticleLink> ended with Pharaoh
            giving up on secret killings through two midwives and going public instead, ordering
            every Hebrew son thrown into the river the moment he is born. The same family that once
            followed <ArticleLink href="/blog/who-was-joseph">Joseph</ArticleLink> down into Egypt
            in safety is now hunted inside the very country that once saved them.
          </p>
          <p>
            Exodus 2 opens with that decree still standing, and with one particular family about to
            test exactly how far they will go to disobey it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 2 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Mother&apos;s Desperate Plan (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a marriage, then almost immediately a crisis.</p>
        </div>
        <VerseQuote
          text="And the woman conceived, and bare a son: and when she saw him that he was a goodly child, she hid him three months."
          reference="Exodus 2:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Neither parent is named yet in this chapter. Exodus will not give their names until
            later, when Moses&apos;s family line is recorded in full. For now the text keeps them
            as simply a man and a woman of the tribe of Levi, doing what any parent under that
            decree had to do: hide the child and buy time.
          </p>
          <p>Three months of hiding only works for so long.</p>
        </div>
        <VerseQuote
          text="And when she could not longer hide him, she took for him an ark of bulrushes, and daubed it with slime and with pitch, and put the child therein; and she laid it in the flags by the river's brink."
          reference="Exodus 2:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>The Hebrew word for this basket is the same word Genesis uses for Noah&apos;s
            ark.</strong> It is not the ordinary word for a boat. Scripture uses it exactly twice:
            once for the vessel that carried a family safely through a flood that destroyed the
            world, and once here, for the vessel that carries one baby safely through a decree
            meant to destroy him.
          </p>
          <p>
            The New Testament later names what this mother was actually doing, long before she
            could see any of it work out.
          </p>
        </div>
        <VerseQuote
          text="By faith Moses, when he was born, was hid three months of his parents, because they saw he was a proper child; and they were not afraid of the king's commandment."
          reference="Hebrews 11:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Hiding a baby for three months, then floating him down a crocodile filled
            river in a basket sealed with tar, gets called faith, not desperation.</strong> The
            decision was not blind. It was a calculated risk, taken by parents who refused to hand
            their son over to a decree without at least trying to put him somewhere God could still
            reach him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Princess Finds a Basket, and Names Him Moses (verses 5 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The basket does not drift unseen for long.</p>
        </div>
        <VerseQuote
          text="And when she had opened it, she saw the child: and, behold, the babe wept. And she had compassion on him, and said, This is one of the Hebrews' children."
          reference="Exodus 2:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Pharaoh&apos;s own daughter knows exactly what she is looking at, and saves
            him anyway.</strong> She does not mistake him for an Egyptian child by accident. She
            sees a Hebrew baby, the very thing her father ordered destroyed, and compassion wins
            before politics gets a vote.
          </p>
          <p>
            Moses&apos;s sister, watching from a distance the whole time, steps in at exactly the
            right moment to offer a nurse, and the baby ends up back in his own mother&apos;s arms,
            paid by the one household in Egypt with the power to protect him.
          </p>
        </div>
        <VerseQuote
          text="And the child grew, and she brought him unto Pharaoh's daughter, and he became her son. And she called his name Moses: and she said, Because I drew him out of the water."
          reference="Exodus 2:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>The name itself plays on the Hebrew word for drawing something
            out.</strong> A princess names a rescued baby after the very thing that almost killed
            him. Centuries later, that same man will draw an entire nation out of slavery through
            water, this time at the Red Sea instead of the Nile.
          </p>
          <p>
            Nothing in this section is a miracle. No angel, no plague, no parted sea. Just a
            frightened mother, a watching sister, a compassionate stranger, and a river doing
            exactly what it was told not to do.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Forty Years Later: Moses Picks a Side (verses 11 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus jumps straight from an infant to a grown man in one sentence.</p>
        </div>
        <VerseQuote
          text="And it came to pass in those days, when Moses was grown, that he went out unto his brethren, and looked on their burdens: and he spied an Egyptian smiting an Hebrew, one of his brethren."
          reference="Exodus 2:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Stephen&apos;s speech in Acts fills in the one detail Exodus leaves out here.
          </p>
        </div>
        <VerseQuote text="And when he was full forty years old, it came into his heart to visit his brethren the children of Israel." reference="Acts 7:23" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses is not a confused teenager here. He is a grown man, raised with every
            privilege Egypt could offer, making a deliberate choice about which family is actually
            his.</strong> Hebrews names that choice directly.
          </p>
        </div>
        <VerseQuote
          text="Choosing rather to suffer affliction with the people of God, than to enjoy the pleasures of sin for a season; Esteeming the reproach of Christ greater riches than the treasures in Egypt: for he had respect unto the recompence of the reward."
          reference="Hebrews 11:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>What that choice looks like in the moment is not gentle.</p>
        </div>
        <VerseQuote
          text="And he looked this way and that way, and when he saw that there was no man, he slew the Egyptian, and hid him in the sand."
          reference="Exodus 2:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The text does not call this an act of faith or a model to copy.</strong>{" "}
            Looking around to check no one was watching before killing a man and burying the body
            describes someone hiding a crime, not a deliverer stepping into a calling with God&apos;s
            blessing. Whatever right instinct drove Moses toward his own people, he acted on it with
            violence and secrecy rather than waiting on God to send him properly, which is exactly
            what Exodus 3 eventually does instead.
          </p>
          <p>The very next day proves the secret did not stay secret.</p>
        </div>
        <VerseQuote
          text="And he said, Who made thee a prince and a judge over us? intendest thou to kill me, as thou killedst the Egyptian? And Moses feared, and said, Surely this thing is known."
          reference="Exodus 2:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Moses stepped in to stop one Hebrew from wronging another, expecting gratitude, and
            got the exact question Cain&apos;s descendants had been asking for generations: who
            gave you the right. The people he just risked everything for are the ones who turn on
            him first.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Well in Midian, and a Family of His Own (verses 15 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Word reaches Pharaoh, and Moses stops being safe in Egypt at all.</p>
        </div>
        <VerseQuote
          text="Now when Pharaoh heard this thing, he sought to slay Moses. But Moses fled from the face of Pharaoh, and dwelt in the land of Midian: and he sat down by a well."
          reference="Exodus 2:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The man raised to one day possibly rule part of Egypt is now a fugitive sitting alone
            by a well in a country he does not belong to, with nothing. A well is also exactly
            where Isaac&apos;s servant found Rebekah and where Jacob first met Rachel. Moses&apos;s
            own turn at a well plays out the same way.
          </p>
        </div>
        <VerseQuote
          text="And Moses was content to dwell with the man: and he gave Moses Zipporah his daughter."
          reference="Exodus 2:21"
        />
        <VerseQuote
          text="And she bare him a son, and he called his name Gershom: for he said, I have been a stranger in a strange land."
          reference="Exodus 2:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses names his own son after exactly what he feels.</strong> Gershom sounds
            like the Hebrew for a stranger there. Raised Egyptian, born Hebrew, now married into a
            Midianite family, Moses does not belong fully anywhere, and he says so out loud through
            his son&apos;s name instead of pretending otherwise.
          </p>
          <p>
            The priest who takes him in is named Reuel in this verse, though later chapters of
            Exodus call the same man Jethro. Scripture never explains the two names directly; what
            it does make clear is that Moses, the fugitive with nothing, is welcomed into this
            family and given a home.
          </p>
          <p>
            <ArticleLink href="/blog/moses">The rest of Moses&apos;s story</ArticleLink> only
            really gets moving once this quiet stretch in Midian ends.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The King Dies, and God Remembers (verses 23 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter closes by jumping forward again, this time skipping the rest of
            Moses&apos;s years in Midian in a single verse.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass in process of time, that the king of Egypt died: and the children of Israel sighed by reason of the bondage, and they cried, and their cry came up unto God by reason of the bondage."
          reference="Exodus 2:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Acts gives the length of that silent stretch a number Exodus itself never states here.
          </p>
        </div>
        <VerseQuote text="And when forty years were expired, there appeared to him in the wilderness of mount Sina an angel of the Lord in a flame of fire in a bush." reference="Acts 7:30" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Forty years pass between one verse and the next, and the chapter spends more
            words on Israel&apos;s groaning than on anything Moses did during all of it.</strong>{" "}
            Whatever Moses was doing with sheep in Midian for four decades, Exodus treats it as not
            worth recording. What it does record, in full, is that the people kept crying out the
            entire time.
          </p>
        </div>
        <VerseQuote
          text="And God heard their groaning, and God remembered his covenant with Abraham, with Isaac, and with Jacob. And God looked upon the children of Israel, and God had respect unto them."
          reference="Exodus 2:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God is never named as doing anything active in this entire chapter until its
            very last two verses.</strong> No basket is guided by His hand on the page. No well
            meeting is called providence outright. Then, right at the end, four short clauses credit
            Him with hearing, remembering, looking, and respecting, as if the whole quiet chapter
            was Him working underneath everything the text actually described out loud.
          </p>
          <p>
            The covenant named here is the same one God spelled out centuries earlier in{" "}
            <ArticleLink href="/blog/genesis-15-explained">Genesis 15</ArticleLink>, the promise
            that this exact bondage would end. Exodus 2 closes by quietly confirming that promise
            is still active, right before Exodus 3 shows what God does about it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 2 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was Moses right to kill the Egyptian?</strong> The text itself never calls it
            righteous. Moses checks that no one is watching, kills the man, and hides the body,
            which reads as someone covering up a crime rather than carrying out justice openly.
            Hebrews 11 praises Moses&apos;s faith in choosing Israel over Egypt, but it never
            specifically praises this killing. Most careful readers separate the two: the choice to
            identify with his suffering people was right, the method he used that day was not, and
            the very next verses show the consequences catching up with him immediately.
          </p>
          <p>
            <strong>Why does Exodus skip forty years between verse 15 and verse 23 without
            saying so?</strong> Exodus itself gives no number. Acts 7:30 is the verse that supplies
            it, saying forty years passed before the burning bush. Exodus was written to move the
            story toward the exodus itself, not to document Moses&apos;s private decades as a
            shepherd, so it compresses an entire adult lifetime into one short verse and spends far
            more space on what Israel was going through back in Egypt during that same stretch.
          </p>
          <p>
            <strong>Why is the priest of Midian called Reuel here but Jethro later in
            Exodus?</strong> Exodus 2:18 names him Reuel. Exodus 3:1 and 18:1 call the same man
            Jethro. Bible teachers read this difference two main ways: some take Jethro as a title
            or honorific meaning something like his excellency, used alongside a personal name,
            Reuel. Others suggest Reuel was the grandfather and the family relationship got
            compressed in this early verse. Exodus never resolves which explanation is correct, and
            both readings keep the two names pointing at the same household.
          </p>
          <p>
            <strong>Why does the same Hebrew word appear for Noah&apos;s ark and Moses&apos;s
            basket?</strong> Genesis 6 and Exodus 2 are the only two places in the Hebrew Bible
            that use this particular word for a vessel. Scripture does not explain the choice, but
            the pattern is hard to miss: both times, God preserves someone through water that
            should have destroyed them, inside a small sealed container that depended entirely on
            staying afloat and sealed.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Exodus 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 2:3</h3>
        <VerseQuote
          text="And when she could not longer hide him, she took for him an ark of bulrushes, and daubed it with slime and with pitch, and put the child therein; and she laid it in the flags by the river's brink."
          reference="Exodus 2:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A mother turns the very river meant to kill her son into the way she saves him, using the
          same kind of vessel God once used to save Noah&apos;s whole family.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 2:10</h3>
        <VerseQuote
          text="And the child grew, and she brought him unto Pharaoh's daughter, and he became her son. And she called his name Moses: and she said, Because I drew him out of the water."
          reference="Exodus 2:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A name given in gratitude for a rescue from water becomes the name of the man who will
          later lead a whole nation through water to freedom.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 2:12</h3>
        <VerseQuote
          text="And he looked this way and that way, and when he saw that there was no man, he slew the Egyptian, and hid him in the sand."
          reference="Exodus 2:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A right instinct carried out the wrong way, costing Moses the life he knew and sending
          him into forty years of exile before God sends him back properly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 2:22</h3>
        <VerseQuote text="And she bare him a son, and he called his name Gershom: for he said, I have been a stranger in a strange land." reference="Exodus 2:22" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Moses names his own grief out loud, belonging fully to neither the palace he grew up in
          nor the people he was born to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 2:24 and 25</h3>
        <VerseQuote
          text="And God heard their groaning, and God remembered his covenant with Abraham, with Isaac, and with Jacob. And God looked upon the children of Israel, and God had respect unto them."
          reference="Exodus 2:24 and 25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          After a whole chapter where God is never named as acting, four verbs in one breath reveal
          He was never absent, only quiet.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A Levite couple hides their newborn son from Pharaoh&apos;s decree, then sets him afloat
          in a basket on the Nile, where Pharaoh&apos;s own daughter finds him, names him Moses,
          and raises him. As a grown man, Moses kills an Egyptian he sees abusing a Hebrew, flees to
          Midian, marries, and has a son, while back in Egypt the people continue crying out to
          God under their bondage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Moses&apos;s real parents?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 2 does not name them, describing them only as a man and woman of the tribe of
          Levi. Exodus 6:20 later identifies them by name as part of the family record, after this
          chapter has already told their part of the story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Pharaoh&apos;s daughter adopt a Hebrew baby?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 2:6 says simply that she had compassion on him once she saw he was a Hebrew child.
          The text gives no political motive and no sign she was trying to undermine her
          father&apos;s decree. It presents her choice as an ordinary human response to a crying
          baby, nothing more calculated than that.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the name Moses mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 2:10 ties it to the Hebrew idea of drawing something out, explained in the verse
          itself as the reason Pharaoh&apos;s daughter gave him that name. The connection becomes
          sharper later, once the man named for being drawn out of water becomes the one who draws
          a whole nation out through water at the Red Sea.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses flee to Midian?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 2:15 says Pharaoh heard about the Egyptian Moses killed and sought to kill him in
          return. Midian, east of Egypt, was far enough away to be safe and was already home to
          relatives of Abraham through his son Midian, giving Moses somewhere to land that was not
          entirely foreign ground.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Zipporah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Zipporah was the daughter of the priest of Midian, given to Moses as his wife in Exodus
          2:21 after he helped her and her sisters at a well. Her name is connected to the Hebrew
          word for a bird. She becomes the mother of Moses&apos;s son Gershom in this chapter and
          appears again later in Exodus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Moses know he was Hebrew while growing up in the palace?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 2:11 describes him going out to his brethren as an adult, language that assumes he
          already knew exactly who his own people were. His birth mother nursed him as a baby
          according to Exodus 2:9, which likely gave him real contact with his Hebrew identity
          before he ever moved fully into Pharaoh&apos;s household.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many years does Exodus 2 actually cover?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter spans roughly eighty years in twenty five verses. Acts 7:23 and 7:30 supply
          the two numbers Exodus itself leaves out: Moses was forty when he fled Egypt, and another
          forty years passed in Midian before the events of Exodus 3.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter end with Israel groaning instead of with Moses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 2:23 to 25 shifts the camera away from Moses entirely, back to the people still
          suffering in Egypt. The ending makes clear this story was never only about one man
          building a new life in Midian. It was always about a whole people God had not forgotten,
          whether or not Moses was anywhere near them yet.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 2 has no plague, no parted sea, and no burning bush, and it still shapes everything that follows.</p>
          <p>
            📌 <strong>God works through ordinary courage long before He works through
            miracles.</strong> A basket, a watching sister, a compassionate princess, and a well in
            a foreign country all move this story forward before a single supernatural sign
            appears.
          </p>
          <p>
            📌 <strong>Choosing your people can cost you everything you were given by the people
            you did not choose.</strong> Moses walked away from an Egyptian palace the moment he
            decided which family was actually his, and the cost was immediate and real.
          </p>
          <p>
            📌 <strong>God&apos;s silence is not the same as God&apos;s absence.</strong> Forty
            years pass with nothing recorded, and the chapter still ends by naming exactly what God
            was doing underneath all of it: hearing, remembering, looking, and caring.
          </p>
          <p>
            You may be in a season that feels as quiet and unrecorded as Moses&apos;s years with
            sheep in Midian.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Keep crying out, the way Israel did in the very last verses of this chapter, even
            without any sign yet that it is being heard. Exodus 2 ends by promising it already was.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
