import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import ClaimStatus from "@/components/blog/ClaimStatus";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("have-they-found-noahs-ark", {
  title: "Have They Found Noah's Ark? What Is Really Happening at Durupınar",
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

export default function HaveTheyFoundNoahsArkPage() {
  return (
    <BlogPostShell
      slug="have-they-found-noahs-ark"
      title={<>📖 Have They Found Noah&apos;s Ark?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably seen the video by now.</p>
            <p>
              A boat shaped ridge in the mountains of eastern Turkey. A drill going into the
              ground. A voice saying they are close.
            </p>
            <p>And then the comments, split right down the middle.</p>
            <p>Half saying this proves the Bible. Half saying it is a rock.</p>
            <p>
              📌 <strong>Here is the honest answer before anything else. Something real is
              happening at that site. Scientists with permits are drilling it and testing it
              properly for the first time. And nothing found so far shows it is Noah&apos;s
              ark.</strong>
            </p>
            <p>Both of those things are true at once, and that is the part nobody posts.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This article walks through what is actually there.</p>
            <p>
              What the formation is. Who is studying it and what they have said. What the
              evidence shows so far. What the Bible claims and what it does not claim. And what
              would actually settle the question.
            </p>
            <p>No hype. No eye rolling either.</p>
            <p>Just the evidence, and the gaps in it.</p>
          </div>
        </>
      }
    >
      <ShortVersion>
        <p>
          A boat shaped feature near Mount Ararat, known since 1959, has been promoted as
          Noah&apos;s ark since the 1970s.
        </p>
        <p>
          In 1996 a geological paper identified it as a natural rock fold, and most geologists
          still say so.
        </p>
        <p>
          In 2026 a team led by a Turkish archaeology professor ran the first full season of
          radar, soil sampling and deep drilling there.
        </p>
        <p>
          They report anomalies underground and more carbon in the soil inside the formation
          than outside it. No wood. No dated material. No peer reviewed paper yet.
        </p>
        <p>Laboratory results are expected over the winter.</p>
      </ShortVersion>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🗺️ What the site actually is
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is called the Durupınar formation.</p>
          <p>
            It sits in Ağrı Province in eastern Turkey, near the town of Doğubayazıt, roughly 29
            km south of Mount Ararat and only a few kilometres from the Iranian border.
          </p>
          <p>
            It is a long, pointed, boat shaped ridge of rock and soil, around 157 to 164 metres
            from end to end, lying in sloping ground that has clearly moved over time.
          </p>
          <p>
            📌 <strong>It was not discovered by an expedition. It was spotted on an aerial
            survey.</strong>
          </p>
          <p>
            A Turkish army captain named İlhan Durupınar noticed the shape in survey photographs
            in 1959, and the site carries his name. For nearly twenty years almost nothing
            happened with it.
          </p>
          <p>
            Then in 1977 an American named Ron Wyatt began promoting it as the ark. In the 1980s a
            salvage expert called David Fasold ran expeditions there with ground penetrating
            radar and announced that the measurements matched the dimensions Genesis gives.
          </p>
          <p>That is where the modern story of the site really begins, and it matters why.</p>
          <p>
            Because for about forty years, almost everything the public heard about Durupınar came
            from people who had already decided what it was.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔬 Who is studying it now, and what they say
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is what changed, and it is genuinely new.</p>
          <p>
            The current project is called Noah&apos;s Ark Scans. It is directed by Prof. Dr.
            Cenker Atila of the archaeology department at Sivas Cumhuriyet University in Turkey,
            with the researcher Andrew Jones and the archaeologist Dr. Evrensel Barış Berkant as
            vice presidents, and researchers listed from Dokuz Eylül University, the University of
            Utah, the Federal University of Santa Catarina in Brazil, Trnava University in
            Slovakia and Tel Aviv University.
          </p>
          <p>
            Their 2026 field season ran from 29 June to 11 September, with around twenty
            scientists and students from five countries.
          </p>
          <p>What they did in that time:</p>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>📖 GPS mapping and 3D digital modelling of the whole formation</li>
            <li>📖 Ground penetrating radar surveys across the surface</li>
            <li>📖 Around 1,000 soil samples taken from roughly 150 locations</li>
            <li>📖 Deep core drilling, reported as twelve holes inside the formation and four outside it</li>
          </ul>
          <p>
            That last one is the part with no precedent. Nobody had drilled the site properly
            before. The team reports reaching about 20 metres in places without hitting bedrock,
            and striking cavities underground, one of them holding mud and water.
          </p>
          <p>
            Prof. Atila has described this as the first comprehensive archaeological and
            geological investigation of the site since it was identified in 1959, and has been
            careful in public about what it has shown. In his own framing, the work is intended
            to establish whether the site is a natural formation or contains material that could
            support the ark claims. Not to confirm the claims. To test them.
          </p>
          <p>
            📌 <strong>That is a scientist talking properly, and it deserves to be quoted
            properly rather than cropped into a thumbnail.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🧪 What the evidence actually shows
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three findings are doing most of the work in the headlines. Take them one at a time.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">The carbon in the soil</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The team reports that soil from inside the formation holds roughly 40 percent more
            carbon than soil taken from outside it. Prof. Atila has suggested this might be
            associated with organic material, potentially including wood.
          </p>
          <p>
            💡 <strong>Might be. Potentially.</strong> Those words are his, and they are the right
            ones.
          </p>
          <p>
            Higher carbon in soil has ordinary explanations. Buried vegetation. Organic material
            carried in by a mudflow. Centuries of animals and plants in a hollow that holds
            moisture. A raised carbon reading tells you something organic was there. It does not
            tell you it was a ship.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">The shapes under the ground</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Radar has picked up what the team describes as possible voids and anomalies with
            relatively regular edges, some appearing to meet at right angles. Earlier radar work
            from 2019 was reported as showing linear structures about 7 metres down.
          </p>
          <p>
            The team has suggested these could represent traces of compartments or structural
            elements.
          </p>
          <p>
            ⚠️ <strong>Radar does not show you objects. It shows you where the signal changes
            speed.</strong>
          </p>
          <p>
            Someone then interprets the pattern. Layered rock, water pockets, voids and tilted
            sediment all produce lines and corners on a radar profile. The interpretation might be
            right. It is still an interpretation, and it has not been published for other
            specialists to check.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">The pottery</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pottery fragments have been recovered in the area, and have been described as possibly
            belonging to a period before the flood of religious tradition.
          </p>
          <p>
            Their ages have not been established. Until a fragment is dated, and until somebody
            shows it is connected to the formation rather than simply lying in the same valley,
            this is the thinnest of the three findings and should be treated that way.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">And the case on the other side</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>This part almost never makes the videos, and it is the strongest single document in the story.</p>
          <p>
            In 1996 the geologist Lorence Collins published a paper in the Journal of Geoscience
            Education titled &quot;Bogus Noah&apos;s Ark from Turkey exposed as a common geologic
            structure.&quot; It concluded that Durupınar is a doubly plunging syncline, a natural
            fold in the rock shaped by erosion and mudflow into a smooth pointed outline. Under a
            microscope, the supposed iron brackets turned out to be weathered volcanic minerals,
            and the supposed metal braced walls turned out to be natural concentrations of
            limonite and magnetite in steeply tilted sedimentary layers.
          </p>
          <p>
            📌 <strong>His co author was David Fasold. The man who had spent the 1980s promoting
            the site as the ark put his name to the paper saying it was not.</strong>
          </p>
          <p>
            That is not a sceptic scoring a point. That is a man following his own evidence to a
            conclusion he did not want. Mainstream geologists and archaeologists have treated the
            ark identification as settled against ever since.
          </p>
          <p>
            None of which makes the new drilling pointless. Testing a natural explanation harder is
            exactly what good science does. It just means the burden of proof sits where it has
            sat since 1996, and radar lines do not move it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚖️ Established and unsettled
        </h2>
        <ClaimStatus
          established={[
            "The formation exists, is roughly 157 to 164 metres long, and was identified from aerial survey photographs in 1959.",
            "A permitted, multi institution team led by Prof. Dr. Cenker Atila ran a full field season there in 2026 using mapping, radar, soil sampling and deep core drilling.",
            "A 1996 paper in the Journal of Geoscience Education identified the formation as a natural rock fold, and found that claimed man made features were naturally occurring minerals.",
            "That paper was co authored by David Fasold, who had previously promoted the site as the ark.",
            "Mainstream geology and archaeology currently reject the ark identification.",
          ]}
          uncertain={[
            "No peer reviewed study of the formation has yet come out of the current project.",
            "The radar anomalies and right angles are the team's interpretation of their own data, not a published result others have checked.",
            "The raised soil carbon has not been shown to come from wood, or from anything built.",
            "No wood, no structural timber and no dated organic material has been recovered.",
            "The pottery fragments are undated and not shown to be connected to the formation.",
            "Radiocarbon dating is described as planned where suitable material exists. It has not been reported.",
          ]}
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What the Bible actually says
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is where a lot of the confusion starts, and it is worth reading slowly.</p>
          <p>Genesis gives the ark a material, a method and a size.</p>
        </div>
        <VerseQuote
          text="Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch."
          reference="Genesis 6:14"
        />
        <VerseQuote
          text="And this is the fashion which thou shalt make it of: The length of the ark shall be three hundred cubits, the breadth of it fifty cubits, and the height of it thirty cubits."
          reference="Genesis 6:15"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three hundred cubits is somewhere around 135 to 155 metres, depending on which cubit
            you use. That range is why the length of the Durupınar formation gets quoted so often.
          </p>
          <p>Then there is the verse everything hangs on.</p>
        </div>
        <VerseQuote
          text="And the ark rested in the seventh month, on the seventeenth day of the month, upon the mountains of Ararat."
          reference="Genesis 8:4"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Read that again. Mountains, plural. Not a mountain.</strong>
          </p>
          <p>
            Ararat in the Hebrew text is a region, roughly the kingdom known in Assyrian records
            as Urartu, covering a large area of what is now eastern Turkey, Armenia and northwest
            Iran. The single peak we call Mount Ararat today got that name much later.
          </p>
          <p>
            So Scripture does not tell us the ark landed on the mountain now called Ararat. It
            tells us it came to rest somewhere in a mountainous region. That cuts both ways
            honestly. It means Durupınar sitting 29 km from the famous peak is not an objection to
            the site. It also means being near that peak is not evidence for it.
          </p>
          <p>
            Genesis also never says the ark survived. It says the water went down, the family came
            out, and Noah built an altar. You can read how that account unfolds in the study notes
            on <ArticleLink href="/blog/genesis-6-explained">Genesis 6</ArticleLink>,{" "}
            <ArticleLink href="/blog/genesis-7-explained">Genesis 7</ArticleLink> and{" "}
            <ArticleLink href="/blog/genesis-8-explained">Genesis 8</ArticleLink>.
          </p>
          <p>
            ✅ <strong>Nothing in the Christian faith was waiting on a drill core in Ağrı
            Province.</strong>
          </p>
          <p>
            It would be fascinating if something were found. It would change nothing about whether
            God keeps His promises, which is what the flood account is actually about.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⏭️ What happens next
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The core samples and soil went to laboratories, and analysis is expected through the winter of 2026 and into 2027.</p>
          <p>Three things would genuinely move this forward.</p>
          <p>
            📖 <strong>Worked wood.</strong> Timber with tool marks, from inside the formation, at
            depth. That is the find that would change the conversation overnight.
          </p>
          <p>
            📖 <strong>A radiocarbon date on organic material from inside the structure</strong>,
            published with its method, so other labs can argue with it.
          </p>
          <p>
            📖 <strong>A peer reviewed paper.</strong> Not a press release, not a documentary. A
            paper, in a journal, where geologists who disagree get to respond.
          </p>
          <p>
            Until one of those arrives, the honest position is the uncomfortable one: an
            interesting site being studied seriously, with no confirmed evidence of a ship.
          </p>
          <p>We will update this article when the laboratory results are published.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Has Noah&apos;s ark been found?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. No discovery has been confirmed as the ark, and no scientific body accepts that it
          has been found. What exists is a boat shaped natural formation that is currently being
          investigated, with results pending.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Durupınar formation just a rock?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That is the conclusion of the published geology, including the 1996 paper that examined
          the claimed man made features under a microscope and found them to be natural minerals.
          The current team is testing whether anything lies inside it. Until their work is
          published, the natural explanation is the one with a paper behind it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does its length match the ark in Genesis?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Partly because the cubit is not a fixed unit, so three hundred cubits covers a range of
          roughly 135 to 155 metres, and partly because the formation&apos;s measured length
          depends on where you decide it ends. A match inside a range that wide is interesting but
          it is not strong evidence on its own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did they find wood when the drill bit broke?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A broken drill bit tells you the drill hit something hard. It does not tell you what.
          Claims about petrified wood at the site have circulated widely online and have not been
          confirmed by any published analysis. The samples went to a laboratory, which is exactly
          where that question gets answered.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is this the same as the Mount Ararat anomaly?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, those are two different claims about two different places. Durupınar is a formation
          in the foothills roughly 29 km from the peak. The so called Ararat anomaly is a feature
          high on Mount Ararat itself, seen in aerial and satellite imagery, which has never been
          examined on the ground.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Christianity need the ark to be found?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Scripture never promises the ark would survive or be located, and the flood account
          is about God&apos;s judgment and His covenant, not about a surviving artefact. If you
          want to think through how faith and physical evidence relate to each other, start with{" "}
          <ArticleLink href="/blog/christian-and-science">
            what Christians should think about science
          </ArticleLink>
          .
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why do Christians share unconfirmed discoveries so quickly?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Usually because it feels like help. A headline that seems to back up the Bible is
          comforting to pass on. The problem is that when the claim collapses, the person who
          shared it looks careless about truth, which is a strange look for people who follow one
          who called Himself the truth. Being slow to share is a form of honesty. If you want to
          build that muscle, read{" "}
          <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
            how to defend your faith in Jesus
          </ArticleLink>
          .
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three things worth carrying out of this.</p>
          <p>
            📌 <strong>Real scientists are doing real work at that site.</strong> They deserve to
            be reported accurately, which means quoting their caution as well as their findings.
          </p>
          <p>
            📌 <strong>Nothing found so far shows it is the ark</strong>, and the only published
            study of the formation says it is natural. That study was co signed by the man who
            once promoted it.
          </p>
          <p>
            📌 <strong>Genesis says mountains of Ararat, a region, not a peak.</strong> Most of
            the argument online is about a detail the Bible never actually gives.
          </p>
          <p>
            We will update this page when the laboratory results come out, including if they turn
            out to support the team.
          </p>
          <p>
            In the meantime, the better use of an evening is the account itself. Start with the
            study notes on{" "}
            <ArticleLink href="/blog/genesis-6-explained">Genesis 6</ArticleLink> and read it
            through to the rainbow.
          </p>
          <p>The ark is a story about mercy. That part was never missing.</p>
        </div>
      </section>

      <ArticleSources
        checkedOn="12 October 2026"
        sources={[
          {
            title: "Bogus Noah's Ark from Turkey exposed as a common geologic structure",
            publisher: "Collins, L. & Fasold, D., Journal of Geoscience Education 44, 439-444",
            year: "1996",
            url: "https://www.newsweek.com/what-1996-study-said-about-noahs-ark-site-12507519",
            note: "The paper that identified the formation as a natural rock fold. Link goes to reporting that summarises it, as the journal issue is not freely available online.",
          },
          {
            title: "Noah's Ark Scans project",
            publisher: "Noah's Ark Scans",
            url: "https://noahsarkscans.com/",
            note: "The team's own site, listing its leadership and partner institutions. A source that is advocating, not reporting.",
          },
          {
            title: "Is Noah's Ark in Türkiye? Scientists begin major study at Durupınar",
            publisher: "Türkiye Today",
            year: "2026",
            url: "https://www.turkiyetoday.com/culture/is-noahs-ark-in-turkiye-scientists-begin-major-study-at-durupinar-3224917",
            note: "Field season dates, methods and Prof. Atila's own framing of what the study is for.",
          },
          {
            title: "Noah's Ark mystery deepens as new discoveries emerge near Mount Ararat",
            publisher: "Arkeonews",
            year: "2026",
            url: "https://arkeonews.net/noahs-ark-mystery-deepens-as-new-discoveries-emerge-near-mount-ararat/",
            note: "The soil carbon figure, the radar anomalies and the pottery, with the team's attributed statements.",
          },
          {
            title: "Durupınar site",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Durup%C4%B1nar_site",
            note: "Used for the site chronology and for its citation trail to the geological literature.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
