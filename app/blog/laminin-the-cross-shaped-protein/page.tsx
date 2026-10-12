import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import ArticleSources from "@/components/blog/ArticleSources";
import ClaimStatus from "@/components/blog/ClaimStatus";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("laminin-the-cross-shaped-protein", {
  title: "Laminin: The Truth About the Cross Shaped Protein",
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

export default function LamininPage() {
  return (
    <BlogPostShell
      slug="laminin-the-cross-shaped-protein"
      title={<>📖 Laminin, the Cross Shaped Protein</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Somebody has shown you the picture.</p>
            <p>
              A molecule shaped like a cross, with a verse under it. He is before all things, and
              by him all things consist.
            </p>
            <p>
              And the line that comes with it: the protein that holds your body together is shaped
              like the cross of Christ.
            </p>
            <p>
              📌 <strong>Here is the honest answer. Laminin is real, it really is essential, and
              the molecule first studied really did look like a cross under an electron
              microscope. But the image you were shown is a diagram, not a photograph, not every
              laminin is cross shaped, and the structural biologist who wrote the standard review
              says the shape inside your body is closer to an umbrella.</strong>
            </p>
            <p>So the story is partly true. Which is the most awkward kind of true.</p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>This article separates the science from the sermon illustration.</p>
            <p>
              What laminin actually does, in plain words. Where the cross shape came from and what
              the researchers actually saw. Why Christians share it. And what Colossians 1 is
              really talking about, which turns out to be far bigger than a protein.
            </p>
            <p>
              Nobody here is being mocked. The people who share this are not being dishonest. They
              are being enthusiastic with a detail they were handed.
            </p>
            <p>This is just what the detail actually is.</p>
          </div>
        </>
      }
    >
      <ShortVersion>
        <p>
          Laminins are large proteins in the basement membrane, the thin sheet your cells are
          anchored to. Without them, bodies do not form at all.
        </p>
        <p>
          The first one purified, now called laminin-111, appeared as a cross in electron
          micrographs in the early 1980s.
        </p>
        <p>
          A range of shapes was visible in those images. Only the cross made it into the textbooks.
        </p>
        <p>
          Mammals have at least fifteen laminins, and the ones built from chains missing their
          short arms are not cross shaped.
        </p>
        <p>
          Inside a real basement membrane, laminin is thought to stand more like a three spoked
          umbrella than a cross.
        </p>
        <p>Colossians 1:17 is about Christ sustaining all creation. It is not about a molecule.</p>
      </ShortVersion>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🧬 What laminin actually does
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forget the shape for a minute. The function is the genuinely astonishing part.</p>
          <p>
            Every sheet of cells in your body sits on something. Your skin, the lining of your gut,
            the filters in your kidneys, the membranes around your muscle fibres. Underneath each
            one is a thin layer called a basement membrane, and that layer is what the cells hold
            on to.
          </p>
          <p>Laminins are a main building block of it.</p>
          <p>
            📌 <strong>They are not optional. Without laminins, basement membranes do not form,
            and embryo development stops at an early stage.</strong>
          </p>
          <p>
            That is not preaching. That is the opening paragraph of the standard structural review
            of laminins, written by Erhard Hohenester at Imperial College London.
          </p>
          <p>
            Each laminin is made of three different protein chains, called alpha, beta and gamma,
            locked together by chemical bonds. One end of the molecule grips the cell surface. The
            other ends link to other laminins, forming a network, so what you end up with is a
            mesh that cells can stand on and hang from at the same time.
          </p>
          <p>
            It does not work alone. Other proteins such as nidogen bind into the same network, and
            a basement membrane is a team effort rather than one molecule&apos;s achievement.
          </p>
          <p>
            And when laminins fail, people suffer. Faults in laminin genes cause severe human
            disease, including forms of muscular dystrophy and blistering skin disorders, and a
            kidney and eye condition called Pierson syndrome.
          </p>
          <p>
            💡 <strong>So the claim that laminin helps hold you together is not hype. It is a fair
            plain English summary of what the literature says.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✝️ Where the cross shape came from
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Around 1979, two laboratories independently purified a large, unfamiliar protein from the matrix produced by mouse tumour cells.</p>
          <p>
            When antibodies against it were tested on mouse tissue, they lit up the basement
            membranes, which are also called basal laminae. That is where Rupert Timpl and his
            colleagues got the name. Laminin.
          </p>
          <p>
            In the early 1980s researchers imaged it using a technique called rotary shadowing
            electron microscopy. What came out was a molecule with four arms: one long arm around
            77 nanometres ending in a prominent blob, and three shorter arms around 34 nanometres
            each ending in a pair of smaller blobs.
          </p>
          <p>Long arm down. Three shorter arms out and up.</p>
          <p>
            📌 <strong>That is a cross. The researchers said so, the word cruciform went into the
            literature, and it has been there ever since.</strong>
          </p>
          <p>
            So this part of the story is not invented. A real scientific paper described a real
            molecule as cross shaped, decades before any pastor mentioned it.
          </p>
          <p>Then comes the sentence that almost nobody who shares the image has read.</p>
          <p>
            Writing in 2019 about those original micrographs, Hohenester notes that although a
            range of shapes was seen in the images, only a cross with roughly perpendicular arms
            entered the literature. He calls that somewhat unfortunate, because inside an actual
            basement membrane the structure of laminin is more likely to resemble a three spoked
            umbrella than a cross.
          </p>
          <p>
            ⚠️ <strong>An umbrella. Standing up on the cell surface, three spokes out at the top,
            the long arm reaching down to grip the cell.</strong>
          </p>
          <p>
            Both descriptions are of the same molecule. The cross is what it looks like flattened
            onto a slide for imaging. The umbrella is closer to how it is thought to sit in living
            tissue.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🔍 Four things the popular version gets wrong
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. The picture is usually a drawing</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The clean, symmetrical cross that gets shared is a schematic. Scientists draw those to
            show which part of the molecule is which, in the same way a map of the underground is
            not a photograph of tunnels. The actual electron micrographs are grainy, and the arms
            bend.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Not every laminin is cross shaped</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            There is not one laminin. Mammals have at least fifteen different ones, assembled from
            five alpha chains, four beta chains and three gamma chains. Only fifteen of the sixty
            possible combinations have actually been confirmed in the laboratory.
          </p>
          <p>
            And they are not all built the same. Several chains are missing the domains that form
            the short arms entirely, which means the laminins made from them cannot have the full
            four armed shape. The familiar cross belongs to laminin-111, the one that happened to
            be purified first.
          </p>
          <p>
            📌 <strong>The sermon says laminin is shaped like a cross. The literature says one
            well studied laminin is, and the family is more varied than that.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Proteins are not rigid</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A protein is not a little metal ornament. It flexes, folds and changes shape to do its
            job. Studies of laminin&apos;s arms have found a pronounced kink in one of them, and
            curvature in another. A fixed symmetrical cross is a simplification of something that
            moves.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. The verse is not about a protein</h3>
        <div className="mt-4 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the big one, and it needs its own section. Keep reading.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🙏 Why Christians share this
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The version almost everyone has met comes from the pastor Louie Giglio, who paired an
            image of laminin with a line from Colossians 1 in a widely shared message about the
            scale and detail of creation. The idea landed hard: the glue holding your cells
            together is shaped like the cross, and the One who made it is the One who holds all
            things.
          </p>
          <p>It is a beautiful thought, and the instinct behind it is right.</p>
          <p>
            ✅ <strong>Creation really does testify. That is a biblical claim, not a sentimental
            one.</strong>
          </p>
        </div>
        <VerseQuote
          text="For the invisible things of him from the creation of the world are clearly seen, being understood by the things that are made, even his eternal power and Godhead; so that they are without excuse:"
          reference="Romans 1:20"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            And the body in particular is held up in Scripture as something to be amazed by, long
            before anyone owned a microscope.
          </p>
        </div>
        <VerseQuote
          text="I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well."
          reference="Psalm 139:14"
        />
        <VerseQuote
          text="Thou hast clothed me with skin and flesh, and hast fenced me with bones and sinews."
          reference="Job 10:11"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            So the impulse to look at a cell and worship is not the problem. The problem is what
            happens when the argument is built on the shape rather than on the Maker.
          </p>
          <p>
            Worth knowing: the sharpest corrections to the laminin argument have come from
            Christians, not from atheists. Answers in Genesis, a creationist organisation, has
            published a piece taking it apart. So has the physicist and science educator Jay Wile.
            This is not believers against sceptics. It is Christians asking other Christians to
            make better arguments.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚖️ Established and unsettled
        </h2>
        <ClaimStatus
          established={[
            "Laminins are large glycoproteins required for basement membranes to form and function, in all animals.",
            "Without laminins, basement membranes do not form and embryo development arrests early.",
            "Laminin-111, the first one purified, appeared as a four armed cross in electron micrographs in the early 1980s, and cruciform is standard language in the literature.",
            "Mammals have at least fifteen laminin isoforms, built from five alpha, four beta and three gamma chains.",
            "Faults in laminin genes cause serious human disease, including muscular dystrophies, blistering skin disorders and Pierson syndrome.",
          ]}
          uncertain={[
            "That all laminins are cross shaped. Several chains lack the short arm domains entirely, so the laminins built from them cannot be.",
            "That the familiar image is a photograph. It is almost always a schematic diagram.",
            "That the shape is fixed. One arm is known to have a pronounced kink, and proteins flex as they work.",
            "How laminin is really arranged inside a living basement membrane. The accepted model comes mostly from laboratory experiments, not from direct imaging, and is described as closer to a three spoked umbrella than a cross.",
            "That any of this is what Colossians 1:17 is about.",
          ]}
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 What Colossians 1 is actually saying
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Read the verse with the one before it, the way Paul wrote it.</p>
        </div>
        <VerseQuote
          text="For by him were all things created, that are in heaven, and that are in earth, visible and invisible, whether they be thrones, or dominions, or principalities, or powers: all things were created by him, and for him: And he is before all things, and by him all things consist."
          reference="Colossians 1:16-17"
        />
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Look at the scale Paul is working at. Heaven and earth. Visible and invisible. Thrones,
            dominions, principalities, powers. He is talking about governments and angelic
            authorities and galaxies and atoms, all of it, held in place by Christ.
          </p>
          <p>
            📌 <strong>All things consist in the King James. Modern translations often render it
            hold together, which is where the laminin illustration gets its hook.</strong>
          </p>
          <p>
            Both are good translations of a Greek word meaning to hold together, to cohere, to be
            sustained. And Paul&apos;s point is a claim about the entire created order, continuing
            every second, not a prophecy about a molecule discovered in 1979.
          </p>
          <p>
            Which means something important. If laminin were shaped like a hexagon, Colossians
            1:17 would be exactly as true.
          </p>
          <p>
            ⚠️ <strong>And that is the real reason to be careful with this one.</strong>
          </p>
          <p>
            When you tie a verse to a scientific detail, you hand your argument&apos;s strength to
            that detail. A reader who finds out that not all laminins are crosses, or that the
            image was a drawing, does not just drop the illustration. They start wondering what
            else they were told too confidently.
          </p>
          <p>
            A truth as big as Colossians 1 does not need the help, and the same instinct is worth
            applying to other viral claims. We have written about that pattern in{" "}
            <ArticleLink href="/blog/have-they-found-noahs-ark">
              the search for Noah&apos;s ark
            </ArticleLink>{" "}
            and in{" "}
            <ArticleLink href="/blog/shroud-of-turin-what-the-science-says">
              what the science actually says about the Shroud of Turin
            </ArticleLink>
            .
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⏭️ Where the science goes next
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The structural picture of a single laminin molecule is, in Hohenester&apos;s words,
            essentially complete. Crystal structures now cover every part of it.
          </p>
          <p>
            What is not finished is the network. Nobody has yet imaged native laminin polymers
            inside a real basement membrane at molecular resolution, which is why the arrangement
            in living tissue is still a model rather than a picture.
          </p>
          <p>
            💡 <strong>So the honest situation is almost the opposite of the viral version.</strong>
          </p>
          <p>
            The shape of one laminin is known in enormous detail. How thousands of them actually
            hold you together is the part still being worked out. That is a more interesting fact
            than the cross, and it is true.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is laminin really shaped like a cross?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Laminin-111, the first laminin purified, was described as cross shaped from electron
          microscope images, and cruciform is still standard language for it. But a range of shapes
          was visible in those original images, not all laminins share that architecture, and the
          arrangement inside living tissue is thought to look more like a three spoked umbrella.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does laminin hold the human body together?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a fair summary. Laminins are a main component of the basement membranes that anchor
          your cells, and without them those membranes do not form at all. They work alongside
          other proteins rather than on their own, so holds you together is accurate as long as it
          is not told as a solo performance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Did Louie Giglio get laminin wrong?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He used a real protein and a real description of its shape. What travelled afterwards
          flattened it: one laminin became all laminin, and a textbook diagram became a photograph.
          That is how illustrations usually go wrong, by being repeated rather than by being
          invented.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Is laminin proof that God exists?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and it is not a good place to build a case. A shape is not an argument, and the
          moment the science is described more precisely the illustration loses its force. The
          better version of the same instinct is to marvel at what laminin does, which is
          extraordinary whatever shape it is.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Colossians 1:17 refer to laminin?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Paul is writing about Christ sustaining everything in creation, visible and
          invisible, including thrones and powers. Laminin is one small example of a created thing
          being held together, along with every other created thing. The verse was not waiting for
          a microscope.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Should Christians stop sharing the laminin story?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Share it accurately and it is still worth telling. Say that one well studied laminin
          looks like a cross in electron micrographs, that the picture is usually a diagram, and
          that the real wonder is a protein without which no body would form at all. That version
          survives a sceptic reading the paper, and the first version does not.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Three things to take away.</p>
          <p>
            📌 <strong>The protein is real and the function is staggering.</strong> No laminin, no
            basement membrane, no body. That deserves worship on its own terms.
          </p>
          <p>
            📌 <strong>The cross shape is real for one laminin, in one kind of image.</strong> It
            is not the whole family, it is not a photograph, and it is not how the molecule stands
            in your tissue.
          </p>
          <p>
            📌 <strong>Colossians 1:17 is bigger than this.</strong> Paul was not pointing at a
            cell. He was pointing at everything.
          </p>
          <p>
            There is a kind of faith that needs the diagram to be true. And there is a kind that
            can lose the diagram and not lose anything at all.
          </p>
          <p>
            If you want to think more carefully about where faith and science actually meet, read{" "}
            <ArticleLink href="/blog/christian-and-science">
              can a Christian trust science
            </ArticleLink>
            . And if you want to be the person in the group chat who checks before sharing,{" "}
            <ArticleLink href="/blog/how-to-defend-your-faith-in-jesus">
              how to defend your faith in Jesus
            </ArticleLink>{" "}
            is the better foundation than any molecule.
          </p>
          <p>He holds all things together. He always did, whatever shape they turned out to be.</p>
        </div>
      </section>

      <ArticleSources
        checkedOn="12 October 2026"
        sources={[
          {
            title: "Structural biology of laminins",
            publisher: "Hohenester, E., Essays in Biochemistry 63(3), 285-295",
            year: "2019",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6744579/",
            note: "Open access. The primary source for chain composition, isoform counts, the electron microscopy history, the three spoked umbrella description, and laminin related disease.",
          },
          {
            title: "Laminin and the cross",
            publisher: "Answers in Genesis",
            url: "https://answersingenesis.org/biology/microbiology/laminin-and-the-cross/",
            note: "A creationist organisation setting out why the laminin argument should not be used. Included because the correction came from inside the church.",
          },
          {
            title: "Laminin shaminin",
            publisher: "Jay L. Wile",
            url: "https://blog.drwile.com/laminin-shaminin/",
            note: "A Christian scientist on the gap between the diagram and the molecule.",
          },
          {
            title: "Does Louie Giglio misinterpret Colossians 1:17 to say it is referring to laminin?",
            publisher: "Eternal Perspective Ministries",
            year: "2022",
            url: "https://www.epm.org/resources/2022/May/23/louie-giglio-misinterpret-laminin/",
            note: "On the exegetical question, and on representing Giglio's actual argument fairly.",
          },
          {
            title: "The laminin family",
            publisher: "Aumailley, M., Cell Adhesion & Migration 7(1)",
            year: "2013",
            url: "https://www.tandfonline.com/doi/full/10.4161/cam.22826",
            note: "A wider review of the laminin family and the three arm interaction model.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
