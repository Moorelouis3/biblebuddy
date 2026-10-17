import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-3-explained", {
  title: "Leviticus 3 Explained: The Law of the Peace Offering",
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

export default function LeviticusThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-3-explained"
      title={<>📖 Leviticus 3 Explained: The Law of the Peace Offering</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two chapters in, and nobody has eaten anything yet. That changes here.</p>
            <p>
              <strong>Leviticus 3 explained</strong> is the law of the peace offering, the third
              kind of sacrifice named in the opening of Leviticus, and the first one built around
              a shared meal instead of smoke rising alone. The burnt offering of{" "}
              <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink> went up the
              altar whole. The grain gift of{" "}
              <ArticleLink href="/blog/leviticus-2-explained">Leviticus 2</ArticleLink> fed the
              priests. This chapter only tells God&apos;s side of the meal.
            </p>
            <p>Maybe you assumed every animal sacrifice in Leviticus burned up completely.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why could a peace offering be a female animal, when the burnt offering required a male?</li>
            <li>❓ Why does the law only describe the fat and the blood, never the meat?</li>
            <li>❓ Why does one section of this chapter skip the words &quot;sweet savour&quot; that the others repeat?</li>
            <li>❓ And why does the chapter end on a rule about fat and blood that never expires?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 3 is the law of an offering named after peace itself, and it
              only ever describes the part of the animal that never gets eaten by anyone at
              all.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the herd animal that could
              be male or female, the hand on its head and the blood at the altar, the fat and
              kidneys named three separate times for three separate animals, the lamb&apos;s fat
              tail, the goat section that suddenly gets shorter, and the one rule at the end that
              outlasts the whole sacrificial system.
            </p>
            <p>Read slowly. This is a quiet chapter about what belongs to God even in a meal meant to be shared.</p>
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
            Leviticus 2 closed with a
            handful of grain burned as a memorial and the rest kept for Aaron&apos;s sons to eat.
            Leviticus 3 keeps the same opening word, the same altar, and moves to a third kind of
            offering entirely, one named after peace.
          </p>
          <p>
            The peace offering was not new to Israel by the time this law was written down. It had
            already been offered once before, at the foot of the very mountain where this law was
            given.
          </p>
        </div>
        <VerseQuote
          text="And he sent young men of the children of Israel, which offered burnt offerings, and sacrificed peace offerings of oxen unto the LORD."
          reference="Exodus 24:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>
              <ArticleLink href="/blog/exodus-24-explained">Exodus 24</ArticleLink> used the name
              before Leviticus ever explained the rule.
            </strong>{" "}
            Young men offered peace offerings the same day Moses sealed the covenant in blood.
            Leviticus 3 is Israel finally being told exactly how that offering was supposed to
            work.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 3 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Peace Offering From the Herd, Male or Female (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a detail that quietly breaks the pattern set two chapters earlier.</p>
        </div>
        <VerseQuote
          text="And if his oblation be a sacrifice of peace offering, if he offer it of the herd; whether it be a male or female, he shall offer it without blemish before the LORD."
          reference="Leviticus 3:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Whether it be a male or female.&quot;</strong>{" "}
            <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink> required a
            male without blemish for the burnt offering, no exceptions stated. The peace offering
            opens with the exact opposite freedom. Either sex was acceptable, as long as the animal
            itself had no blemish.
          </p>
          <p>The next verse repeats a gesture already familiar from the chapter before this one.</p>
        </div>
        <VerseQuote
          text="And he shall lay his hand upon the head of his offering, and kill it at the door of the tabernacle of the congregation: and Aaron's sons the priests shall sprinkle the blood upon the altar round about."
          reference="Leviticus 3:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The same hand on the same place, the head, the same priests handling only the blood
            once it is shed. What changes from Leviticus 1:4 is what
            happens next. There, the whole animal went to the fire. Here, the law is about to name
            only certain parts of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Fat, the Kidneys, and the Caul Above the Liver (verses 3 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three verses, and the law gets specific down to individual organs.</p>
        </div>
        <VerseQuote
          text="And he shall offer of the sacrifice of the peace offering an offering made by fire unto the LORD; the fat that covereth the inwards, and all the fat that is upon the inwards, And the two kidneys, and the fat that is on them, which is by the flanks, and the caul above the liver, with the kidneys, it shall he take away. And Aaron's sons shall burn it on the altar upon the burnt sacrifice, which is upon the wood that is on the fire: it is an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 3:3 to 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Only the fat goes up in smoke.</strong> The fat covering the inner organs,
            the two kidneys and the fat around them, and &quot;the caul above the liver,&quot; a
            fold of fat attached to the liver itself. Nothing here is muscle or meat. The law names
            fat three separate times in three verses and never once mentions the rest of the
            animal&apos;s flesh.
          </p>
          <p>
            💡 Notice where this fat actually burns: &quot;upon the burnt sacrifice, which is upon
            the wood that is on the fire.&quot; The peace offering&apos;s fat was laid directly on
            top of whatever burnt offering was already on the altar that day, sharing the same
            fire rather than lighting a new one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Lamb From the Flock, and a Fat Tail Named by Itself (verses 6 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The law scales down from the herd to the flock, and the opening freedom repeats word for word.</p>
        </div>
        <VerseQuote
          text="And if his offering for a sacrifice of peace offering unto the LORD be of the flock; male or female, he shall offer it without blemish. If he offer a lamb for his offering, then shall he offer it before the LORD."
          reference="Leviticus 3:6 and 7"
        />
        <VerseQuote
          text="And he shall lay his hand upon the head of his offering, and kill it before the tabernacle of the congregation: and Aaron's sons shall sprinkle the blood thereof round about upon the altar."
          reference="Leviticus 3:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the law adds one part a herd animal never had.</p>
        </div>
        <VerseQuote
          text="And he shall offer of the sacrifice of the peace offering an offering made by fire unto the LORD; the fat thereof, and the whole rump, it shall he take off hard by the backbone; and the fat that covereth the inwards, and all the fat that is upon the inwards, And the two kidneys, and the fat that is upon them, which is by the flanks, and the caul above the liver, with the kidneys, it shall he take away. And the priest shall burn it upon the altar: it is the food of the offering made by fire unto the LORD."
          reference="Leviticus 3:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;The whole rump&quot; names the fat tail.</strong> Sheep raised in the
            ancient Near East commonly carried a broad, fat tail, a cut valuable enough that the
            law singles it out by name, cut off close to the backbone and added to the usual fat
            and kidneys.
          </p>
          <p>
            ⚠️ <strong>Look closely at how this section ends.</strong> Verses 3 to 5 closed with
            &quot;a sweet savour unto the LORD.&quot; This section closes differently: &quot;the
            food of the offering made by fire unto the LORD.&quot; That exact phrase, &quot;sweet
            savour,&quot; appears only twice in this entire seventeen verse chapter, and the
            lamb&apos;s section is the one place among the three animals where it is missing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Goat, and a Shorter Instruction (verses 12 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The law moves to its third and final animal, and the opening suddenly gets brief.</p>
        </div>
        <VerseQuote
          text="And if his offering be a goat, then he shall offer it before the LORD. And he shall lay his hand upon the head of it, and kill it before the tabernacle of the congregation: and the sons of Aaron shall sprinkle the blood thereof upon the altar round about."
          reference="Leviticus 3:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>No &quot;male or female.&quot; No &quot;without blemish.&quot;</strong> The
            herd and the flock sections both stated those two requirements by name before the
            animal was ever killed. The goat section states neither. Leviticus does not explain the
            gap. The simplest reading is that both requirements still apply, carried forward from
            the chapter&apos;s own opening line, and the law simply saw no need to repeat them a
            third time.
          </p>
          <p>The fat, kidneys, and caul return exactly as before, and this time the sweet savour returns with them.</p>
        </div>
        <VerseQuote
          text="And he shall offer thereof his offering, even an offering made by fire unto the LORD; the fat that covereth the inwards, and all the fat that is upon the inwards, And the two kidneys, and the fat that is upon them, which is by the flanks, and the caul above the liver, with the kidneys, it shall he take away. And the priest shall burn them upon the altar: it is the food of the offering made by fire for a sweet savour: all the fat is the LORD's."
          reference="Leviticus 3:14 to 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;All the fat is the LORD&apos;s&quot; closes the goat section, and the
            whole chapter&apos;s pattern, in five plain words.</strong> Three animals, three
            separate lists of organs, one claim that never changes. Whatever meat a worshipper
            walked away with, the fat never belonged to him in the first place.
          </p>
          <p>
            That same list of parts, fat covering the inwards, the caul above the liver, the two
            kidneys, even the rump, had already been commanded once before, not for an ordinary
            worshipper&apos;s peace offering, but for the ram that ordained Aaron and his sons as
            priests.
          </p>
        </div>
        <VerseQuote
          text="Also thou shalt take of the ram the fat and the rump, and the fat that covereth the inwards, and the caul above the liver, and the two kidneys, and the fat that is upon them, and the right shoulder; for it is a ram of consecration:"
          reference="Exodus 29:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>
              <ArticleLink href="/blog/exodus-29-explained">Exodus 29</ArticleLink> used this exact
              list of parts before Leviticus 3 ever existed as written law.
            </strong>{" "}
            The priesthood&apos;s own ordination already treated these organs as God&apos;s
            portion. Leviticus 3 simply extends that same standard to every Israelite who ever
            brought a peace offering.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. One Rule That Outlasts Every Offering in the Chapter (verse 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with a single sentence that reaches past the peace offering entirely.</p>
        </div>
        <VerseQuote
          text="It shall be a perpetual statute for your generations throughout all your dwellings, that ye eat neither fat nor blood."
          reference="Leviticus 3:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Perpetual&quot; and &quot;throughout all your dwellings&quot; widen
            the rule past the tabernacle itself.</strong> This was not only an instruction for how
            to handle a peace offering at the altar. It was a standing rule for every Israelite
            household, in every place they ever lived, for every generation after this one. Fat
            belonged to the altar. Blood belonged to the altar. Neither one belonged on a family
            table, not once, not ever.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 3 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What happened to the rest of the meat, since Leviticus 3 never says?</strong>{" "}
            The text itself only ever describes two things: the fat burned on the altar, and the
            blood sprinkled around it. It never states who ate the remaining meat or where. That
            detail is not missing by accident. Leviticus answers it later, when the priest&apos;s
            own share of the breast and the shoulder, and the worshipper&apos;s own portion, get
            spelled out as their own separate law. Leviticus 3 is only ever concerned with
            God&apos;s part of the animal, not the meal built around what is left.
          </p>
          <p>
            <strong>Why could the peace offering be female, when the burnt offering required a
            male?</strong> Leviticus 3:1 and 3:6 both state the allowance without explaining it.
            One difference commonly noted between the two offerings is purpose rather than cost:
            the burnt offering was wholly given up, consumed entirely, while the peace offering
            left meat behind for a shared meal. A flock&apos;s breeding females mattered more to
            its future, and this offering never required giving one up at all unless a worshipper
            chose to.
          </p>
          <p>
            <strong>Why does the lamb&apos;s section skip the words &quot;sweet savour&quot; that
            the herd and the goat both use?</strong> Leviticus 3:11 calls the lamb&apos;s burned
            portion &quot;the food of the offering made by fire&quot; instead. The text does not
            explain the different wording, and nothing elsewhere in the chapter suggests the
            lamb&apos;s offering was valued any less. What is observable is only that one section
            out of three phrases the same act in different words.
          </p>
          <p>
            <strong>Why forbid eating fat and blood specifically, instead of regulating the whole
            animal?</strong> Leviticus 3:17 states the rule as a perpetual statute without giving
            its reason in this chapter. What the chapter does make unmistakably clear is the
            boundary itself: the parts assigned to the fire were never available for a human meal,
            at the tabernacle or at home, no matter how many generations passed.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 3:1</h3>
        <VerseQuote
          text="And if his oblation be a sacrifice of peace offering, if he offer it of the herd; whether it be a male or female, he shall offer it without blemish before the LORD."
          reference="Leviticus 3:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that sets the peace offering apart from the burnt offering before it. Either
          sex was acceptable, as long as the animal itself had no blemish.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 3:5</h3>
        <VerseQuote
          text="And Aaron's sons shall burn it on the altar upon the burnt sacrifice, which is upon the wood that is on the fire: it is an offering made by fire, of a sweet savour unto the LORD."
          reference="Leviticus 3:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The peace offering&apos;s fat was never given its own separate fire. It burned directly
          on top of whatever burnt offering was already on the altar that day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 3:11</h3>
        <VerseQuote
          text="And the priest shall burn it upon the altar: it is the food of the offering made by fire unto the LORD."
          reference="Leviticus 3:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one place in the chapter where &quot;sweet savour&quot; is missing, calling the same
          burned fat &quot;the food of the offering&quot; instead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 3:17</h3>
        <VerseQuote
          text="It shall be a perpetual statute for your generations throughout all your dwellings, that ye eat neither fat nor blood."
          reference="Leviticus 3:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A single sentence that reaches past the peace offering itself, binding every Israelite
          household, everywhere they ever lived, for every generation to come.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 3 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 3 lays out the law of the peace offering, covering three animals, a herd
          animal, a lamb, and a goat. In every case the law describes only the fat, the kidneys,
          and the caul above the liver, burned on the altar as God&apos;s own portion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a peace offering in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A peace offering was a voluntary sacrifice named for peace or well being, distinct from
          the burnt offering because it was never consumed entirely. Leviticus 3 covers only the
          fat and blood portion; Israel had already offered this same kind of sacrifice once
          before, in Exodus 24:5.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why could a peace offering be a female animal?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 3:1 and 3:6 both allow &quot;male or female&quot; without explaining the
          reason, unlike the burnt offering&apos;s male only requirement in Leviticus 1:3. The
          peace offering left meat behind for a shared meal rather than consuming the whole animal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to the meat of the peace offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 3 itself never says. It only describes the fat burned on the altar and the
          blood sprinkled around it. The portion given to the priests and the portion kept by the
          worshipper are both spelled out in a later chapter of Leviticus, not this one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was eating fat and blood forbidden?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 3:17 calls it a perpetual statute without stating its reason inside this
          chapter. What the text makes clear is the boundary: fat and blood belonged to the altar,
          never to a family meal, in every generation and every place Israel lived.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between the burnt offering, the meat offering, and the peace offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The burnt offering of Leviticus 1 was entirely consumed by fire. The meat offering of
          Leviticus 2 burned a handful and gave the rest to the priests. The peace offering of
          Leviticus 3 burned only the fat, leaving the meat for a meal the text does not describe
          in this chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 3:11 not say &quot;sweet savour&quot; like the rest of the chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 3:5 and 3:16 both close with &quot;a sweet savour unto the LORD.&quot;
          Leviticus 3:11, closing the lamb&apos;s section, calls the same burned fat &quot;the
          food of the offering&quot; instead. The chapter does not explain the different wording.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the peace offering connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 3 does not name Jesus, but the same list of fat and kidneys given to God here
          had already marked Aaron&apos;s own ordination ram as holy in Exodus 29:22, tying this
          ordinary worshipper&apos;s offering to the same standard set for Israel&apos;s
          priesthood.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the goat section in Leviticus 3 leave out &quot;without blemish&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 3:12 and 3:13 never restate &quot;male or female&quot; or &quot;without
          blemish,&quot; both stated earlier for the herd animal and the lamb. The text does not
          explain the gap. The simplest reading carries both requirements forward from the
          chapter&apos;s opening line rather than treating the goat as exempt.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 3 never once mentions a meal, and it is still the chapter that makes one possible.</p>
          <p>
            📌 <strong>God&apos;s portion came first, named down to the organ.</strong> Fat, two
            kidneys, and the caul above the liver, repeated for the herd, the flock, and the goat,
            before anything else about the offering mattered.
          </p>
          <p>
            📌 <strong>A rule can repeat almost exactly and still leave something out.</strong> The
            goat section drops &quot;without blemish&quot; and &quot;male or female.&quot; The
            lamb section drops &quot;sweet savour.&quot; Neither gap gets explained, and neither
            changes what the offering was worth.
          </p>
          <p>
            📌 <strong>What belongs to God does not become negotiable once it reaches your
            table.</strong> &quot;All the fat is the LORD&apos;s&quot; closes the chapter, and
            verse 17 makes sure that claim outlives the altar itself.
          </p>
          <p>
            You will never burn a kidney on an altar. But you still decide, every week, which part
            of what you have is quietly set aside as God&apos;s before the rest ever reaches your
            own table.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name the one thing in your week that God asks for first, before you spend, eat, or
            share any of the rest, and give it to Him the way this chapter insists on, before
            anything else.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
