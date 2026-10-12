import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import ClaimStatus from "@/components/blog/ClaimStatus";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("shroud-of-turin-what-the-science-says", {
  title: "The Shroud of Turin: What the Science Actually Says",
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
    <Link
      href={href}
      className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]"
    >
      {children}
    </Link>
  );
}

function ShortVersion({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-[#d7e5ff] bg-[#f7faff] px-6 py-5">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-[#0056fd]">
        The short version
      </p>
      <div className="mt-3 space-y-3 text-lg leading-8 text-slate-700">{children}</div>
    </div>
  );
}

export default function ShroudOfTurinPage() {
  return (
    <BlogPostShell
      slug="shroud-of-turin-what-the-science-says"
      title={<>📖 The Shroud of Turin</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A piece of linen in a cathedral in northern Italy has a man&apos;s face on it.</p>
            <p>Faint. Front and back. Wounds in the wrists, the side, the scalp, the back.</p>
            <p>
              Some people look at it and see the burial cloth of Jesus. Some look at it and see a
              medieval painting. Both groups can point at science.
            </p>
            <p>
              📌 <strong>Here is the honest state of it. The only radiocarbon test ever done on
              the Shroud, in 1988, dated the sampled thread to the Middle Ages. That result has
              been attacked for nearly forty years and has not been overturned. And nobody has
              explained how the image got there.</strong>
            </p>
            <p>All three of those are true together. That is why this will not go away.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This article separates the parts that keep getting mixed up.</p>
            <p>
              What the cloth is. What has been tested, by whom, and what each test found. Where the
              new research genuinely challenges the old. And what the Bible says about the linen in
              the tomb, which is less than most people assume.
            </p>
            <p>You will not be told what to conclude.</p>
            <p>You will be told what is actually known.</p>
          </div>
        </>
      }
    >
      <ShortVersion>
        <p>
          A linen cloth in Turin, about 4.30 m by 1.08 m, carries a faint front and back image of
          a crucified man.
        </p>
        <p>It first appears in the historical record in France around 1355.</p>
        <p>
          In 1988 three laboratories radiocarbon dated samples from it to 1260 to 1390 CE with at
          least 95 percent confidence.
        </p>
        <p>
          Critics said the sample came from a repair. A 2026 study of the leftover 1988 fragments
          found no sign of repair or contamination.
        </p>
        <p>
          A 2022 X ray study argued for a much older date, but its result depends on assumptions
          about how the cloth was stored for twenty centuries.
        </p>
        <p>How the image formed is still unexplained.</p>
      </ShortVersion>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🧵 What the cloth actually is
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start with the object, before anyone argues about it.</p>
          <p>
            It is a single piece of rectangular linen, measured in the research literature at 4.30
            m by 1.08 m, with a narrower strip seamed along one side. It is kept in the Cathedral
            of Saint John the Baptist in Turin, and the Archbishop of Turin is its custodian.
          </p>
          <p>
            Along one half of the cloth there is a faint image of a naked man, front and back, as
            though a body had been laid on one end and the rest folded over the top. The image
            shows marks consistent with scourging across the back, wounds at the wrists and feet,
            a wound in the side, and puncture marks around the scalp.
          </p>
          <p>
            📌 <strong>It also carries its own damage history, and that history matters for the
            science.</strong>
          </p>
          <p>
            The cloth survived a fire in 1532. Afterwards nuns of the Poor Clares stitched
            twenty two patches cut from altar cloth over the burnt areas, and sewed the whole
            thing onto a backing cloth to hold it together. No cleaning or conservation work is
            documented after that until a conservation treatment in 2002.
          </p>
          <p>
            In 1898 a photographer named Secondo Pia took the first photographs of it and found
            something strange. The photographic negative read as a clear positive image, far more
            legible than the cloth itself. That is the moment the modern argument begins.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🕰️ Where it comes from, as far as anyone can show
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the part that gets skipped most often, and it is not a small detail.</p>
          <p>
            ⚠️ <strong>The documented history of the Shroud starts in the middle of the
            fourteenth century.</strong>
          </p>
          <p>
            It is first displayed in the church at Lirey in France around 1355. Documents from
            around that time record a controversy about it immediately, and a newly identified
            fourteenth century text from the philosopher Nicole Oresme, published by the historian
            Nicolas Sarzeaud in 2025, adds to that early record of dispute.
          </p>
          <p>
            Before Lirey there is no verifiable trail. Various proposals have been made connecting
            it to earlier relics, including a cloth held in Constantinople, but none of them has
            been established.
          </p>
          <p>
            It moved to Turin in 1578, and has stayed there since, shown publicly only
            occasionally.
          </p>
          <p>
            That gap is not proof of a forgery. Plenty of genuine ancient objects have no
            paperwork for most of their lives. But anyone who tells you the Shroud&apos;s history
            runs back to the first century is telling you something the sources do not support.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔬 What has been tested, and what it found
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four pieces of research carry most of the weight. Take them in order.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1978, the STURP examination</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A group of American scientists formed the Shroud of Turin Research Project in the late
            1970s and examined the cloth directly with the instruments of the day. Their findings
            were read as supporting the possibility that this really was the burial cloth of
            Jesus. In particular, nothing behaved like paint: no brush strokes, no pigment pooling
            in the weave, and the coloration confined to the very topmost fibres.
          </p>
          <p>
            Not everyone in that era agreed. Walter McCrone, a respected microscopist, published
            his own analysis and concluded the Shroud was, in his words, a beautiful medieval
            painting.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1988, the radiocarbon dating</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is still the central fact of the whole subject, so it is worth knowing how
            carefully it was set up.
          </p>
          <p>
            A workshop in Trondheim in 1985 and another in Turin in 1986 settled the procedure.
            Three accelerator mass spectrometry laboratories would do the work: the University of
            Oxford, the University of Arizona and ETH Zürich. Sampling happened on 21 April 1988,
            carried out by Luigi Gonella of the Polytechnical University of Turin and Michael Tite
            of the British Museum, with textile experts present specifically to make sure the
            sample was taken away from any area of repair.
          </p>
          <p>The result, published in Nature in 1989:</p>
          <p>
            📌 <strong>1260 to 1390 CE, with at least 95 percent confidence.</strong>
          </p>
          <p>
            In plain terms, that says the flax in the tested thread was harvested no earlier than
            the middle of the thirteenth century.
          </p>
          <p>
            💡 <strong>One detail almost nobody mentions. The dated samples were not taken from
            the image.</strong>
          </p>
          <p>
            They came from the main body of the cloth, away from the figure. So the radiocarbon
            result dates the linen, not the image on it, and anyone arguing about the image from
            that number is going one step further than the measurement does.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2022, the X ray study</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Liberato De Caro and colleagues at Italy&apos;s Institute of Crystallography published
            a study in the journal Heritage using Wide Angle X ray Scattering, which measures how
            far the cellulose in linen has structurally broken down. They examined a tiny sample,
            around 0.5 mm by 1 mm, taken near the 1988 sampling area, and compared it against
            linen from Masada in Israel historically dated to 55 to 74 AD.
          </p>
          <p>
            Their conclusion was that the results are compatible with the Shroud being a two
            thousand year old relic.
          </p>
          <p>
            ⚠️ <strong>And here is the limitation the authors state themselves.</strong>
          </p>
          <p>
            The method converts structural decay into an age, and decay depends on how the cloth
            was kept. Their calculation assumes an average temperature of roughly 20 to 22.5
            degrees Celsius and relative humidity between about 55 and 75 percent, held across
            twenty centuries, thirteen of which are entirely undocumented. The authors acknowledge
            that if the real conditions differed, the calculated age is unreliable.
          </p>
          <p>
            Critics have also pointed out that the comparison samples were not blind sampled,
            which is the normal safeguard against a researcher&apos;s expectations shaping a
            result.
          </p>
          <p>
            So this is a real study, published, by named scientists, reporting a genuinely
            different answer. It is not a replacement for radiocarbon dating, and it is not
            &quot;carbon dating has been proven wrong&quot;, which is how it is usually passed
            around.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2026, the leftover fragments</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the newest piece, and it is more interesting than the headlines made it.</p>
          <p>
            Arizona kept two of its 1988 fragments unused, as that laboratory does as a matter of
            policy. In April 2026 Rachel Freer-Waters and A. J. Timothy Jull published an analysis
            of those two fragments, roughly 14 mm and 10 mm long, in npj Heritage Science,
            alongside the archaeological control textiles that were dated at the same time.
          </p>
          <p>They examined fibre content, yarn twist and weave structure under magnification.</p>
          <p>
            📌 <strong>They found the fragments consistent with the main body of the Shroud, with
            no evidence of contamination and no signs of repair.</strong>
          </p>
          <p>
            That is a real blow to the strongest version of the repair argument, which held that
            the 1988 sample came from medieval mending woven invisibly into an ancient cloth. The
            textile conservator Mechthild Flury-Lemberg, who oversaw the 2002 conservation work,
            had already said that someone who studies textiles would be able to identify even the
            most skillful repair, and that the only repairs she saw were the ones made after the
            1532 fire.
          </p>
          <p>
            But read the rest of that 2026 paper and it cuts in an unexpected direction too. The
            authors note that the Shroud&apos;s yarn is spun with a z twist, which is unusual,
            because flax naturally twists the other way and most linen is spun accordingly. They
            note its thread density is higher than nearly all surviving ancient linen, which in
            their words suggests a much later date. And they note that its 3 over 1 herringbone
            twill weave is very unusual for early European linen, with the nearest comparable
            example cited in the literature being a late sixteenth century painting canvas.
          </p>
          <p>
            Their own summary is that the textile is singular for the measured date, made in a
            more technologically advanced time than the ancient control samples, and that it
            merits further study.
          </p>
          <p>
            They also state plainly that the two fragments are a small and potentially non uniform
            subset which may differ from other parts of the cloth. Scientists writing down the
            limits of their own evidence. It is worth noticing how rarely that makes it into a
            video about this.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚖️ Established and unsettled
        </h2>
        <ClaimStatus
          established={[
            "The cloth exists, is roughly 4.30 m by 1.08 m, and is kept in the Cathedral of Saint John the Baptist in Turin.",
            "Its documented history begins in France around 1355, and it was disputed from the start.",
            "The image is not a conventional painting: no brush strokes, and the coloration sits on the topmost fibres.",
            "In 1988 three laboratories dated samples to 1260 to 1390 CE with at least 95 percent confidence, published in Nature.",
            "Those samples were taken from the main cloth, away from the image.",
            "A 2026 study of the unused 1988 fragments found no contamination and no sign of repair.",
            "The weave, yarn twist and thread count are all unusual for ancient linen.",
          ]}
          uncertain={[
            "How the image was formed. No one has reproduced it, by any method, medieval or modern.",
            "Whether the sampled corner is representative of the whole cloth. The 2026 authors say their fragments are a small, possibly non uniform subset.",
            "Whether X ray scattering can date linen reliably, since the result depends on twenty centuries of assumed storage conditions.",
            "Whether the stains are the blood of a crucified man. A 2019 study of the bloodstain flows argued they are inconsistent with a single body position.",
            "Everything about the cloth before roughly 1350.",
          ]}
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Bible actually says about the linen
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Scripture does mention the burial cloth. Twice, and briefly.</p>
        </div>
        <VerseQuote
          text="And when Joseph had taken the body, he wrapped it in a clean linen cloth,"
          reference="Matthew 27:59"
        />
        <VerseQuote
          text="Then took they the body of Jesus, and wound it in linen clothes with the spices, as the manner of the Jews is to bury."
          reference="John 19:40"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>And then, on the morning everything changed, the cloth is still there.</p>
        </div>
        <VerseQuote
          text="Then cometh Simon Peter following him, and went into the sepulchre, and seeth the linen clothes lie, And the napkin, that was about his head, not lying with the linen clothes, but wrapped together in a place by itself."
          reference="John 20:6-7"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice what John gives us. Linen clothes, plural, and a separate napkin for the head,
            folded by itself. That is a detail an eyewitness remembers and an inventor does not
            bother with.
          </p>
          <p>
            ⚠️ <strong>Now notice what Scripture never does. It never tells us what happened to
            the cloth afterwards.</strong>
          </p>
          <p>
            Nobody takes it. Nobody keeps it. No apostle mentions it again. No letter in the New
            Testament asks after it. For the people who were actually there, the linen was not the
            point. The empty space where the body had been was the point.
          </p>
          <p>And that is exactly what Paul puts at the centre of the faith.</p>
        </div>
        <VerseQuote
          text="For I delivered unto you first of all that which I also received, how that Christ died for our sins according to the scriptures; And that he was buried, and that he rose again the third day according to the scriptures: And that he was seen of Cephas, then of the twelve:"
          reference="1 Corinthians 15:3-5"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>Christianity rests on witnesses to a living person, not on a relic.</strong>
          </p>
          <p>
            Which means this, and it needs saying in both directions. If the Shroud is medieval,
            the resurrection is untouched. If the Shroud turned out to be first century linen, it
            still would not tell you whose body lay in it.
          </p>
          <p>
            The Catholic Church, which holds the cloth, has never defined it as authentic. It is
            venerated as an icon, and the question of its date has been left to science.
          </p>
          <p>
            If the historical case for Jesus is what you are really asking about, that is a
            different and much stronger body of evidence. Start with{" "}
            <ArticleLink href="/blog/did-jesus-really-exist">
              the evidence that Jesus really existed
            </ArticleLink>
            , and then{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              the case for the resurrection itself
            </ArticleLink>
            .
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⏭️ What would actually settle it
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Honestly? Possibly nothing, and it is worth being realistic about why.</p>
          <p>
            📖 <strong>New radiocarbon dating from several places on the cloth</strong> would be
            the obvious step, and it has not been permitted since 1988. It would destroy material,
            and the custodians have been cautious.
          </p>
          <p>
            📖 <strong>A reproducible mechanism for the image</strong> would change everything. If
            someone demonstrates how a fourteenth century workshop could produce it, the medieval
            case closes. Nobody has.
          </p>
          <p>
            📖 <strong>Blind validation of the X ray dating method</strong> on linens of known age
            would tell us whether the 2022 result deserves the weight people give it.
          </p>
          <p>
            Until then this stays what it has been for six centuries: a genuinely strange object
            that reasonable people read in opposite directions.
          </p>
          <p>We will update this article as new research is published.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Shroud of Turin real?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The cloth is certainly real and certainly old. Whether it is the burial cloth of Jesus is
          unproven. The only radiocarbon dating ever done placed the sampled linen in the Middle
          Ages, and no test has established an earlier date in a way that has convinced the wider
          scientific community.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Was the carbon dating proven wrong?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. It has been contested, which is a different thing. The strongest objection was that
          the sample came from a medieval repair, and the 2026 analysis of the leftover fragments
          found no sign of repair or contamination. The 2022 X ray study reported an older date,
          but by its authors&apos; own account that depends on assumptions about storage conditions
          over twenty centuries.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How was the image made?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nobody knows. That is the plain answer. It does not behave like paint, and proposals
          ranging from contact with chemicals to scorching to a photographic process have all
          failed to reproduce it convincingly. This is the single strongest point the
          authenticity side has, and it is a real one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the blood on it real blood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The stains have been identified as blood by several researchers, but how they got there
          is disputed. A 2019 study in the Journal of Forensic Sciences modelled the flow patterns
          and concluded they were inconsistent with a single body position, which the authors read
          as pointing to artistic arrangement. Others dispute the modelling.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does the Catholic Church say it is genuine?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The Church permits it to be venerated as an icon and has never declared it to be the
          actual burial cloth of Christ, leaving the dating question to researchers.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Should Christians care about the Shroud?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a fascinating object and worth being curious about. It is not a foundation. The
          apostles who saw the risen Jesus left the linen in the tomb and never mentioned it
          again, and Paul grounds the gospel in witnesses rather than artefacts. Curiosity is
          fine. Dependence is not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do new Shroud headlines appear every year?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because it is one of the most studied objects on earth and the research genuinely keeps
          coming, and because each paper gets rewritten into a stronger claim than it made. A
          study reporting that something is compatible with a first century date becomes
          &quot;proof the Shroud is real&quot; within about two days. Reading the paper rather than
          the post is almost always worth the twenty minutes.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three things to hold onto.</p>
          <p>
            📌 <strong>The 1988 medieval date still stands</strong>, and the newest research into
            those very samples strengthened rather than weakened the integrity of that test.
          </p>
          <p>
            📌 <strong>The image is still unexplained</strong>, and that is a genuine open
            question, not a gap Christians invented.
          </p>
          <p>
            📌 <strong>Scripture leaves the linen in the tomb.</strong> So can we. The faith was
            never resting on the cloth.
          </p>
          <p>
            This is the kind of subject where it is worth being the person who says &quot;I am not
            sure, here is what the research actually found.&quot; That sentence has more weight in
            a conversation than certainty you have not earned.
          </p>
          <p>
            If you want the ground the resurrection actually stands on, read{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith in Jesus
            </ArticleLink>
            . And if you want to think more generally about how faith and evidence fit together,{" "}
            <ArticleLink href="/blog/christian-and-science">
              can a Christian trust science
            </ArticleLink>{" "}
            is the right next step.
          </p>
          <p>The tomb was empty. That is the part the witnesses could not stop talking about.</p>
        </div>
      </section>

      <ArticleSources
        checkedOn="12 October 2026"
        sources={[
          {
            title:
              "Analysis of textile fragments from the 1988 radiocarbon samples of the Turin Shroud",
            publisher: "Freer-Waters, R. & Jull, A. J. T., npj Heritage Science 14, 263",
            year: "18 April 2026",
            url: "https://www.nature.com/articles/s40494-026-02530-7",
            note: "Open access. The source for the sampling history, the 1988 procedure, and the textile findings on twist, thread count and weave.",
          },
          {
            title: "X-ray Dating of a Turin Shroud's Linen Sample",
            publisher: "De Caro, L. et al., Heritage 5(2), 47",
            year: "2022",
            url: "https://www.mdpi.com/2571-9408/5/2/47",
            note: "Open access. The Wide Angle X ray Scattering study, including the temperature and humidity assumptions its dating depends on.",
          },
          {
            title: "Radiocarbon dating of the Shroud of Turin",
            publisher: "Damon, P. E. et al., Nature 337, 611-615",
            year: "1989",
            url: "https://www.nature.com/articles/337611a0",
            note: "The original 1988 result: 1260 to 1390 CE with at least 95 percent confidence.",
          },
          {
            title: "Radiocarbon dating of the Shroud of Turin",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Radiocarbon_dating_of_the_Shroud_of_Turin",
            note: "Used for the chronology of objections and for its citation trail, including Rogers 2005 and Ramsey's 2008 contamination tests.",
          },
          {
            title: "Unraveling the myths surrounding the Shroud of Turin",
            publisher: "Skeptic",
            url: "https://www.skeptic.com/article/shroud-of-turin-authenticity-examined/",
            note: "A source arguing the sceptical case, included because an article with only friendly sources is an advert.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
