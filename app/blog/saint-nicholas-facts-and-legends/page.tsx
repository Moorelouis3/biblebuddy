import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import ArticleSources from "@/components/blog/ArticleSources";
import ClaimStatus from "@/components/blog/ClaimStatus";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("saint-nicholas-facts-and-legends", {
  title: "Who Was Saint Nicholas? Historical Facts Versus Modern Legends",
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

export default function SaintNicholasFactsAndLegendsPage() {
  return (
    <BlogPostShell
      slug="saint-nicholas-facts-and-legends"
      title={<>📖 Who Was Saint Nicholas? Historical Facts Versus Modern Legends</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>In 1953, workmen in Bari, Italy opened a tomb that had not been touched in centuries.</p>
            <p>Inside was a skeleton. An anatomy professor was called in with a camera and a measuring tape.</p>
            <p>
              📌 <strong>That is not how most legends end. Most legends stay stories. This one got
              X-rayed.</strong>
            </p>
            <p>
              Everyone knows some version of Saint Nicholas. Gold coins, a famine fixed by magic, a
              slap at a famous council. Fewer people know that scientists have actually examined his
              bones, radiocarbon dated a relic claimed to be his, and tried to rebuild his face from
              a skull.
            </p>
            <p>
              This guide sorts what real research has actually found from what medieval storytellers
              added later, legend by legend, with the named source for each claim.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Saint Nicholas Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Saint Nicholas served as bishop of Myra, a port city in the Roman province of Lycia, in
            what is now southern Turkey, sometime in the fourth century.
          </p>
          <p>
            The Catholic Encyclopedia states the historical record plainly. There is scarcely
            anything historically certain about him beyond that single fact.
          </p>
          <p>
            ⚠️ Nearly everything else that is famous about him, the gold, the storm, the slap, comes
            from accounts written down generations after he died.
          </p>
          <p>
            📌 <strong>But this is where his story gets unusual. He is one of the only ancient saints
            whose actual bones have been examined, measured, and dated by modern scientists.</strong>
          </p>
          <p>Here is what that research has actually found, and what it has not.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Separating the Man From the Myth
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. What History Can Actually Confirm</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip every legend away and one documented fact remains standing.</p>
          <p>
            A man named Nicholas served as bishop of Myra in the 300s. The Catholic Encyclopedia says
            that is essentially the whole certain biography.
          </p>
          <p>
            💡 <strong>No birth record. No eyewitness diary. Just a name in old bishop lists, attached
            to a real city on the Lycian coast.</strong>
          </p>
          <p>Everything that follows in this guide is measured against that one small, solid fact.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Three Boys and the Brine Barrel</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The National Catholic Register calls this one a grisly legend, and it is. During a famine
            in Myra, three boys were lured into a butcher&apos;s shop, killed, and pickled in a wooden
            barrel to be sold as meat.
          </p>
          <p>
            The story says Bishop Nicholas discovered the crime and prayed over the barrel, and the
            boys were restored to life.
          </p>
          <p>
            ⚠️ <strong>No source treats this as history. It is a medieval tale, most often traced to
            Jacobus de Voragine&apos;s Golden Legend, written around 1275, roughly nine centuries after
            Nicholas died.</strong>
          </p>
          <p>
            The National Catholic Register notes that paintings of Nicholas standing over three boys
            in a tub became common in medieval art, and that image is the likely reason he ended up
            as patron saint of children, along with coopers and brewers, the craftsmen who built the
            barrels the story depends on.
          </p>
        </div>
        <VerseQuote
          text="But when Jesus saw it, he was much displeased, and said unto them, Suffer the little children to come unto me, and forbid them not: for of such is the kingdom of God."
          reference="Mark 10:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Whatever actually happened in Myra, the instinct behind the legend, that Christ&apos;s
            own bishop would fight for forgotten children, was already Jesus&apos; own instinct
            centuries before anyone wrote the story down.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Grain Ships That Fed a Famine</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The St. Nicholas Center records a second famine story, set during Myra&apos;s own hunger
            crisis. Grain ships bound for Alexandria with cargoes of wheat anchored at Andriaki, Myra&apos;s
            harbor.
          </p>
          <p>
            Nicholas asked the captains to sell some of their cargo to feed the starving town. One
            captain objected that the grain was already measured and sealed, and he would answer for
            any shortfall when it reached port.
          </p>
          <p>
            Nicholas promised there would be no trouble. The captain agreed to sell a hundred bushels
            from each ship.
          </p>
          <p>
            📌 <strong>When the ships finally arrived and the remaining grain was weighed, it came out
            exactly the same as when it was loaded.</strong>
          </p>
          <p>
            ⚠️ That detail, grain that does not lose weight after part of it is sold, is the
            miraculous claim at the center of the story, and no outside record confirms it happened.
            It survives only as tradition, not as documented history.
          </p>
        </div>
        <VerseQuote
          text="For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in."
          reference="Matthew 25:35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Legend or not, the shape of the story matches exactly what Jesus says He is actually
            watching for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. What His Bones Actually Showed</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is where the story stops being folklore and becomes forensic record. In 1953, during
            repairs to the crypt of the Basilica of San Nicola in Bari, Nicholas&apos;s tomb was opened
            on the night of May 5.
          </p>
          <p>
            According to the St. Nicholas Center, Luigi Martino, a professor of human anatomy at the
            University of Bari, examined the remains and returned on the night of May 7, 1957, to
            take detailed measurements and X-rays.
          </p>
          <p>
            📌 <strong>Martino&apos;s findings: a skeleton belonging to a man who died over the age of
            seventy, of average height for his era, about 5 feet 5 and three quarter inches. Most of
            the bones were broken, though the skull itself was intact.</strong>
          </p>
          <p>
            That matches the traditional account of Nicholas dying around age 75. It does not prove
            the skeleton is his. It confirms only that the remains venerated in Bari belong to an
            elderly man from roughly the right era.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. The Relic That Got Radiocarbon Dated</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In a study covered by Lab Manager, Professor Tom Higham and Dr. Georges Kazan, directors
            of the Oxford Relics Cluster at Oxford University&apos;s Keble College, tested a tiny
            sample from a bone fragment believed to be a relic of Saint Nicholas.
          </p>
          <p>
            The fragment, a piece of the left pubis, is owned by Father Dennis O&apos;Neill of St.
            Martha of Bethany Church in Morton Grove, Illinois, and originally came from Lyon, France.
          </p>
          <p>
            📌 <strong>Radiocarbon dating placed the bone in the fourth century AD, the same century
            Nicholas is believed to have died, around AD 343.</strong>
          </p>
          <p>
            Higham was careful about what that actually proves, in his own words reported by Lab
            Manager: &quot;Science is not able to definitely prove that it is, it can only prove that
            it is not.&quot;
          </p>
          <p>
            ⚠️ <strong>The dating rules out a fake carved from newer bone. It cannot rule in that this
            exact fragment belonged to this exact man.</strong> The Oxford team proposed DNA testing
            against the Bari and Venice remains next, to see if the fragments share one skeleton, and
            that test has not been reported as completed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. Trying to Give Him a Face</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In 2004, forensic pathologist Francesco Introna of the University of Bari brought in
            facial anthropologist Caroline Wilkinson, then at the University of Manchester, to
            attempt a facial reconstruction, according to the St. Nicholas Center.
          </p>
          <p>
            Wilkinson had no skull to hold. She worked entirely from Martino&apos;s 1957 measurements
            and X-rays, using computer diagnostic techniques, and digital artist Anand Kapoor
            completed the finished image.
          </p>
          <p>
            📌 <strong>The St. Nicholas Center is careful with its own language here. The result shows
            what Nicholas may have looked like, built from two dimensional data of a face nobody
            living has ever seen.</strong>
          </p>
          <p>
            💡 <strong>Notice the gap between the gift shop Santa and this image.</strong> One comes
            from Victorian illustrators. The other comes from an actual skull&apos;s measurements,
            filtered through decades of forensic guesswork. Neither one is a photograph, and the
            honest answer is that nobody alive has seen this man&apos;s real face.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From His Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. A real life does not need an exaggerated one</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the barrel, the ships, even the famous slap at Nicaea, and what is left is still worth telling.</p>
          <p>📌 A bishop in a hard century who gave what he had and is still remembered seventeen hundred years later.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Test the story before you repeat it</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every legend in this guide started as somebody&apos;s retelling, decades or centuries after the fact.</p>
          <p>❓ How many things you believe about faith came from a story, not from a source you ever checked.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Evidence can confirm a detail without confirming a conclusion</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The bones in Bari match an elderly fourth century man. The Illinois fragment dates to the
            right century. Neither fact alone proves whose bones they actually are.
          </p>
          <p>⚠️ Holding a real clue and holding proof are two different things. Good research keeps them separate.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Generosity outlasts the myths built on top of it</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Even the legends about Nicholas, the gold, the grain, the boys, all point the same direction: toward someone who gave.</p>
          <p>💡 The exaggeration grew because the core was true. People do not invent centuries of stories about a man who never gave anything.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses for Sorting Fact From Legend</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Proverbs 25:2</h3>
        <VerseQuote
          text="It is the glory of God to conceal a thing: but the honour of kings is to search out a matter."
          reference="Proverbs 25:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Searching out a matter, bone by bone and record by record, is not a modern invention.</p>
          <p>📌 Scripture calls that kind of careful digging honorable, centuries before an anatomy professor ever opened a tomb.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Hebrews 11:4</h3>
        <VerseQuote
          text="By faith Abel offered unto God a more excellent sacrifice than Cain, by which he obtained witness that he was righteous, God testifying of his gifts: and by it he being dead yet speaketh."
          reference="Hebrews 11:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>He being dead yet speaketh. That line was written about Abel, not Nicholas.</p>
          <p>💡 But it fits a skeleton in Bari that still gets measured, dated, and studied seventeen centuries after burial, almost perfectly.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Matthew 25:35 to 36</h3>
        <VerseQuote
          text="For I was an hungred, and ye gave me meat: I was thirsty, and ye gave me drink: I was a stranger, and ye took me in: Naked, and ye clothed me: I was sick, and ye visited me: I was in prison, and ye came unto me."
          reference="Matthew 25:35 to 36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whether or not the grain ships are history, this is the exact shape of what Nicholas is remembered for doing.</p>
          <p>📌 Jesus names the test before any legend about Myra was ever written.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Thessalonians 5:21</h3>
        <VerseQuote text="Prove all things; hold fast that which is good." reference="1 Thessalonians 5:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Paul is not talking about forensic science. He is talking about how a Christian should weigh any claim at all.</p>
          <p>⚠️ That includes a famous story about a famous saint, and it includes whatever you read in this guide too.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">⚖️ Established and Unsettled</h2>
        <ClaimStatus
          established={[
            "A man named Nicholas served as bishop of Myra in the fourth century. The Catholic Encyclopedia states there is scarcely anything else historically certain about him.",
            "In 1953 and again in 1957, Luigi Martino, professor of human anatomy at the University of Bari, examined and measured the skeleton venerated in the Basilica of San Nicola in Bari, finding it belonged to a man over seventy who stood about 5 feet 5 and three quarter inches tall.",
            "In 2017, Professor Tom Higham and Dr. Georges Kazan of Oxford University's Oxford Relics Cluster radiocarbon dated a bone fragment held in Morton Grove, Illinois, placing it in the fourth century AD.",
            "In 2004, forensic pathologist Francesco Introna and facial anthropologist Caroline Wilkinson produced a facial reconstruction built entirely from Martino's 1957 measurements, not from the physical skull.",
            "The three boys in the brine barrel story and the grain ship famine story both appear in medieval sources, most traced to Jacobus de Voragine's Golden Legend, written around 1275.",
          ]}
          uncertain={[
            "Whether the bone fragment in Illinois, the bones in Bari, and the roughly 500 fragments kept in Venice all come from one man. Oxford's own team proposed DNA testing to find out, and that test has not been reported as completed.",
            "Whether the three boys ever existed or were ever restored to life. No source in this guide treats that story as documented history rather than medieval legend.",
            "Whether the famine grain actually kept its full weight after being sold. The claim survives only in tradition, with no outside record confirming it.",
          ]}
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About the Real Saint Nicholas</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Saint Nicholas a real historical person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. The Catholic Encyclopedia confirms he served as bishop of Myra in the fourth century.
          That is the one fact nearly every source agrees is documented history rather than legend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is actually proven about Saint Nicholas, versus legend?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          His role as bishop of Myra is historical. The bones in Bari belong to an elderly fourth
          century man, confirmed by Luigi Martino&apos;s 1953 and 1957 examination. Everything more
          specific, including the gold, the barrel of boys, and the grain ships, comes from later
          tradition rather than a contemporary record.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saint Nicholas really bring three boys back to life from a brine barrel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No source treats this as documented history. The National Catholic Register calls it a
          grisly legend, traced mainly to the thirteenth century Golden Legend, written roughly nine
          hundred years after Nicholas died.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saint Nicholas really multiply grain during a famine?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That specific detail, grain keeping its full weight after part of it was sold, is not
          confirmed by any outside record. The story is preserved by tradition, recorded on the St.
          Nicholas Center, not by a historical account from his own lifetime.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Have scientists actually tested Saint Nicholas&apos;s bones?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Luigi Martino examined and measured the Bari skeleton in 1953 and 1957, and in 2017
          Oxford University researchers Tom Higham and Georges Kazan radiocarbon dated a separate
          relic fragment held in Illinois to the fourth century AD.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does radiocarbon dating prove the Illinois bone belonged to Saint Nicholas?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. It proves the bone is old enough to be his. Professor Tom Higham said plainly that
          science can rule a relic out but cannot prove a specific identity. DNA comparison against
          the Bari and Venice remains was proposed as the next step.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did Saint Nicholas actually look like?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Nobody knows for certain. A 2004 reconstruction by facial anthropologist Caroline Wilkinson,
          built from measurements taken off the Bari skull in 1957 rather than the skull itself,
          offers one scientific best guess, not a photograph.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Are the bones in Bari and the relics in Venice from the same person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Luigi Martino examined the roughly 500 small fragments kept in Venice in 1992 and concluded
          they complete the Bari skeleton. That conclusion rests on his anatomical comparison rather
          than DNA testing, which has not been reported as done.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Saint Nicholas have so many legends attached to him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because almost nothing was written about him during his own lifetime, later generations
          filled the gap with stories that carried his reputation for generosity and courage, most
          collected centuries later in works like the Golden Legend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does it matter if some Saint Nicholas stories are legend and not history?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          For your faith, no. The documented facts, a real bishop who is still studied by scientists
          seventeen centuries later, already carry the point. The legends simply dressed up a
          generosity that was real before anyone added gold coins or grain ships to it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Most saints only get a story. Saint Nicholas got a tomb opened, a skull measured, and a bone radiocarbon dated.</p>
          <p>
            📌 <strong>None of that science proves every legend. It proves something better: a real
            man, from a real century, who real researchers still think is worth the trouble of
            checking.</strong>
          </p>
          <p>Keep the stories if your family loves them. Just know, now, which parts are history and which parts are tradition wearing history&apos;s clothes.</p>
          <p>
            That same discipline, reading past the familiar picture to what the record actually
            supports, is exactly what{" "}
            <ArticleLink href="/blog/was-jesus-born-in-a-stable">
              the question of where Jesus was actually born
            </ArticleLink>{" "}
            asks of you too.
          </p>
          <p>
            If you want the fuller story of his day and his legend&apos;s long walk to Santa Claus,{" "}
            <ArticleLink href="/blog/when-is-saint-nicholas-day">
              read the full account of Saint Nicholas Day
            </ArticleLink>
            . And if one quietly faithful bishop got you curious about the others,{" "}
            <ArticleLink href="/blog/who-was-saint-andrew">Saint Andrew</ArticleLink> and{" "}
            <ArticleLink href="/blog/who-was-saint-martin-of-tours">Saint Martin of Tours</ArticleLink>{" "}
            are worth the same honest look, and so is{" "}
            <ArticleLink href="/blog/what-is-christmas">the season his feast day opens into</ArticleLink>.
          </p>
        </div>
      </section>

      <ArticleSources
        checkedOn="1 November 2026"
        sources={[
          {
            title: "St. Nicholas of Myra (Or Nicholas of Bari)",
            publisher: "Michael Ott, The Catholic Encyclopedia (1911), New Advent",
            url: "https://www.newadvent.org/cathen/11063b.htm",
            note: "The source for the statement that almost nothing is historically certain about Nicholas beyond his service as Bishop of Myra in the fourth century.",
          },
          {
            title: "Anatomical Examination of the Bari Relics",
            publisher: "St. Nicholas Center",
            url: "https://www.stnicholascenter.org/who-is-st-nicholas/real-face/anatomical-examination",
            note: "The source for Luigi Martino's 1953 and 1957 examination of the Bari skeleton, including the age, height, and condition of the bones.",
          },
          {
            title: "Is St. Nicholas in Venice, too?",
            publisher: "St. Nicholas Center",
            url: "https://www.stnicholascenter.org/pages/relics-in-the-lido-of-venice",
            note: "The source for Martino's 1992 comparison of the roughly 500 Venice bone fragments against the Bari remains.",
          },
          {
            title: "How Saint Nicholas May Have Looked",
            publisher: "St. Nicholas Center",
            url: "https://www.stnicholascenter.org/who-is-st-nicholas/real-face/how-he-may-have-looked",
            note: "The source for the 2004 facial reconstruction by Francesco Introna and Caroline Wilkinson, built from Martino's 1957 measurements rather than the physical skull.",
          },
          {
            title: "Could Ancient Bones Suggest Santa Was Real?",
            publisher: "Lab Manager",
            year: "2017",
            url: "https://www.labmanager.com/could-ancient-bones-suggest-santa-was-real-5621",
            note: "The source for Tom Higham and Georges Kazan's Oxford University radiocarbon dating of the Illinois relic fragment to the fourth century AD, and Higham's own caveat about what the dating can and cannot prove.",
          },
          {
            title: "Famine Relief or The Miracle of the Grain",
            publisher: "St. Nicholas Center",
            url: "https://www.stnicholascenter.org/pages/famine-relief/",
            note: "The source for the grain ship famine legend, including the hundred bushels per ship and the cargo weighing the same after the sale.",
          },
          {
            title: "St. Nicholas: 5 Things to Know and Share",
            publisher: "CNA, National Catholic Register",
            url: "https://www.ncregister.com/cna/st-nicholas-5-things-to-know-and-share",
            note: "The source for the three boys brine barrel legend, its traditional link to the Golden Legend of around 1275, and Nicholas's patronage of children, coopers, and brewers.",
          },
        ]}
      />
    </BlogPostShell>
  );
}
