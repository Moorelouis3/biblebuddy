import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-20-explained", {
  title: "Joshua 20 Explained: Six Cities, One Refuge From Revenge",
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

export default function JoshuaTwentyExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-20-explained"
      title={<>📖 Joshua 20 Explained: Six Cities, One Refuge From Revenge</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A man swings an axe. The head flies off the handle. His neighbor is dead, and he never meant for any of it to happen.</p>
            <p>
              <strong>Joshua 20 explained</strong> is the chapter where Israel finally sets up six cities meant
              for exactly that man. Not a city for the guilty to hide in. A city for someone with innocent hands
              and a dead neighbor anyway, built so a grieving family&apos;s rage has somewhere to stop before it
              becomes a second death.
            </p>
            <p>Maybe you have carried guilt for something you never intended, while someone else was still owed an explanation you could not give fast enough.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Israel need six whole cities just for accidents?</li>
            <li>❓ What stopped a grieving family from taking revenge anyway?</li>
            <li>❓ Why does the slayer&apos;s freedom depend on one specific man dying?</li>
            <li>❓ What happened if he stepped outside the city gate too soon?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Joshua 20 is only nine verses long, and every single one of them is about protecting
              someone the law has not yet decided is guilty.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: the old command from Moses finally
              carried out, the exact kind of killing that qualified for refuge, what happened at the city gate,
              the avenger of blood who had to be held back, the high priest whose death set the slayer free, and
              the six named cities themselves, three on each side of the Jordan.
            </p>
            <p>Nine verses, and they describe a kind of mercy the ancient world rarely bothered to build.</p>
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
            <ArticleLink href="/blog/joshua-19-explained">Joshua 19</ArticleLink> closed out seven chapters of
            land division. Every tribe had a border. Joshua himself had finally received his own city, last of
            anyone. The long work of settling twelve tribes into one country was, on paper, finished.
          </p>
          <p>
            But a country full of neighbors who now share fences, wells, and forests is also a country where
            accidents happen between people who used to be strangers scattered across a wilderness camp. Someone
            is going to swing an axe and lose the head of it. Someone is going to be in the wrong place when an ox
            bolts or a stone slips. Before any of that happens even once in the land, Joshua stops to build
            somewhere safe for it to land.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 20 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. An Old Command, Finally Carried Out (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the LORD speaking directly to Joshua, not with a new idea but an old debt.</p>
        </div>
        <VerseQuote
          text="The LORD also spake unto Joshua, saying, Speak to the children of Israel, saying, Appoint out for you cities of refuge, whereof I spake unto you by the hand of Moses:"
          reference="Joshua 20:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This was not a brand new law dropped into chapter twenty. It was a promise made decades
            earlier, waiting for a land to exist in.</strong> The idea of a place to flee goes back even further
            than Moses naming cities. Before any city had a name, God had already told the people what the
            principle would be.
          </p>
        </div>
        <VerseQuote
          text="And if a man lie not in wait, but God deliver him into his hand; then I will appoint thee a place whither he shall flee."
          reference="Exodus 21:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That verse comes from{" "}
            <ArticleLink href="/blog/exodus-21-explained">Exodus 21</ArticleLink>, given at Sinai, long before
            Israel had a single city anywhere. Then, with the people camped on the plains of Moab,{" "}
            <ArticleLink href="/blog/numbers-35-explained">Numbers 35</ArticleLink> turned that promise into an
            actual instruction, six named cities, three on each side of the Jordan once the land was taken.
            Joshua 20 is the moment that instruction finally has ground under it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Who Actually Qualified for Refuge (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The next verse is careful about exactly who these cities were for.</p>
        </div>
        <VerseQuote
          text="That the slayer that killeth any person unawares and unwittingly may flee thither: and they shall be your refuge from the avenger of blood."
          reference="Joshua 20:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Unawares</strong> means it happened without the person seeing it coming. <strong>Unwittingly</strong>{" "}
            means there was no plan behind it. Both words point at the same thing from two angles: no intent, no
            malice, no plot. <ArticleLink href="/blog/deuteronomy-19-explained">Deuteronomy 19</ArticleLink> had
            already given Israel the exact picture of what this looked like in real life.
          </p>
        </div>
        <VerseQuote
          text="As when a man goeth into the wood with his neighbour to hew wood, and his hand fetcheth a stroke with the axe to cut down the tree, and the head slippeth from the helve, and lighteth upon his neighbour, that he die; he shall flee unto one of those cities, and live:"
          reference="Deuteronomy 19:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two friends. One axe. No warning, no grudge, no history of bad blood between them.</strong>{" "}
            That is the exact situation these cities were built for. Not a loophole for a murderer with a good
            story. A real door for a man whose hands were clean but whose neighbor was still dead because of him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Declaring His Cause at the Gate (verse 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Reaching the city was not the end of the process. It was the start of one.</p>
        </div>
        <VerseQuote
          text="And when he that doth flee unto one of those cities shall stand at the entering of the gate of the city, and shall declare his cause in the ears of the elders of that city, they shall take him into the city unto them, and give him a place, that he may dwell among them."
          reference="Joshua 20:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The man did not get to just slip inside the walls unnoticed. He had to stand at the gate, in front
            of the elders, and say out loud what had happened. No anonymous entry, no hiding behind a city wall
            without ever explaining himself. The elders heard his account before they gave him a place to live.
          </p>
          <p>
            ⚠️ Notice what this is not. The elders at the gate were not yet pronouncing a final verdict. They were
            making a first judgment call, enough to let him in, while the real hearing still waited ahead of him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Held Back From the Avenger, Not Yet Declared Innocent (verse 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once inside, the city had one specific job: keep one man away from him.</p>
        </div>
        <VerseQuote
          text="And if the avenger of blood pursue after him, then they shall not deliver the slayer up into his hand; because he smote his neighbour unwittingly, and hated him not beforetime."
          reference="Joshua 20:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The &quot;avenger of blood&quot; was usually the dead man&apos;s closest relative, the one custom
            expected to settle the score with his own hands. Ancient law across the whole region generally
            allowed this. Israel&apos;s law did not remove that family&apos;s pain or their claim. It simply
            refused to let raw grief skip straight to a second killing before anyone had actually weighed what
            happened.
          </p>
          <p>
            📌 <strong>This protection was never a blanket pardon for every kind of killer.</strong> The very same
            chapter of Deuteronomy that gave the axe head example also drew the opposite case in plain language.
          </p>
        </div>
        <VerseQuote
          text="But if any man hate his neighbour, and lie in wait for him, and rise up against him, and smite him mortally that he die, and fleeth into one of these cities: Then the elders of his city shall send and fetch him thence, and deliver him into the hand of the avenger of blood, that he may die."
          reference="Deuteronomy 19:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A city of refuge was never a hiding place for a man who hated his neighbor and planned the whole
            thing. The elders could, and were commanded to, hand a real murderer straight back out to the avenger
            of blood. The system protected the accidental killer precisely because it refused to protect the
            deliberate one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Until the Death of the High Priest (verse 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter names exactly how long this protection lasted, and the answer is strange at first glance.</p>
        </div>
        <VerseQuote
          text="And he shall dwell in that city, until he stand before the congregation for judgment, and until the death of the high priest that shall be in those days: then shall the slayer return, and come unto his own city, and unto his own house, unto the city from whence he fled."
          reference="Joshua 20:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not a fixed sentence of five years or ten. Release came tied to one man&apos;s death, a high priest
            the slayer had no control over and could not predict. He might walk free in a year. He might wait
            decades, depending entirely on how long that particular high priest lived.
          </p>
          <p>
            ⚠️ Staying inside the city line mattered the entire time. Numbers 35 is specific about what happened
            to a man who grew impatient and wandered past the city&apos;s border before the high priest died.
          </p>
        </div>
        <VerseQuote
          text="But if the slayer shall at any time come without the border of the city of his refuge, whither he was fled; And the revenger of blood find him without the borders of the city of his refuge, and the revenger of blood kill the slayer; he shall not be guilty of blood: Because he should have remained in the city of his refuge until the death of the high priest."
          reference="Numbers 35:26 to 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Step outside the line, and the law&apos;s protection stepped off with him. The avenger of blood
            could kill him there and face no guilt at all for it. The refuge was real, but it was bounded, and the
            man had to choose to stay inside it every single day of the wait.
          </p>
          <p>
            📌 <strong>That wait, tied to the high priest&apos;s death rather than a calendar, is exactly what the
            book of Hebrews later picks up and reshapes around Jesus.</strong> Centuries after Joshua, a writer
            describing hope in Christ reaches for this same word.
          </p>
        </div>
        <VerseQuote
          text="That by two immutable things, in which it was impossible for God to lie, we might have a strong consolation, who have fled for refuge to lay hold upon the hope set before us:"
          reference="Hebrews 6:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Fled for refuge&quot; is the same picture as a man running for Kedesh or Hebron. But Hebrews
            describes a high priest who never dies and never needs replacing.
          </p>
        </div>
        <VerseQuote
          text="But this man, because he continueth ever, hath an unchangeable priesthood. Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them."
          reference="Hebrews 7:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In Joshua 20, freedom waited on a high priest&apos;s death. In Hebrews, the refuge never
            runs out, because that high priest never dies again.</strong> The type in this chapter is temporary by
            design. What it points toward is not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Three Cities on Each Side of the Jordan (verses 7 and 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter then names the six cities, grouped by which side of the river they stood on.</p>
        </div>
        <VerseQuote
          text="And they appointed Kedesh in Galilee in mount Naphtali, and Shechem in mount Ephraim, and Kirjatharba, which is Hebron, in the mountain of Judah."
          reference="Joshua 20:7"
        />
        <VerseQuote
          text="And on the other side Jordan by Jericho eastward, they assigned Bezer in the wilderness upon the plain out of the tribe of Reuben, and Ramoth in Gilead out of the tribe of Gad, and Golan in Bashan out of the tribe of Manasseh."
          reference="Joshua 20:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Kedesh, Shechem, and Hebron on the west side. Bezer, Ramoth in Gilead, and Golan on the
            east.</strong> Spread north to south on both banks of the Jordan, so that no one in the whole country
            had to run an impossibly long way to reach one.
          </p>
          <p>
            Kedesh is not a new name to anyone reading the chapters in order. Joshua 19 had just listed it among
            Naphtali&apos;s fenced cities one chapter earlier, almost in passing. Now it turns out to be one of
            only six places in the entire land set apart for exactly this purpose.
          </p>
          <p>
            Hebron carries its own long history. Abraham had bought a burial plot there for his wife generations
            before any tribe existed, a story told in{" "}
            <ArticleLink href="/blog/genesis-23-explained">Genesis 23</ArticleLink>, and{" "}
            <ArticleLink href="/blog/joshua-15-explained">Joshua 15</ArticleLink> had already given that same city
            to Caleb for his own inheritance. A burial ground, a reward for faith, and now a refuge for the
            unintentional killer, all sitting on the same hillside.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. A Refuge for the Stranger Too (verse 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by widening who the whole system actually covered.</p>
        </div>
        <VerseQuote
          text="These were the cities appointed for all the children of Israel, and for the stranger that sojourneth among them, that whosoever killeth any person at unawares might flee thither, and not die by the hand of the avenger of blood, until he stood before the congregation."
          reference="Joshua 20:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>These cities were never an Israelite privilege closed to outsiders.</strong> A foreigner
            living among the tribes, with no family line to rely on and no tribal land to retreat to, got the
            exact same door as a native Israelite. Numbers had already said the same thing plainly.
          </p>
        </div>
        <VerseQuote
          text="These six cities shall be a refuge, both for the children of Israel, and for the stranger, and for the sojourner among them: that every one that killeth any person unawares may flee thither."
          reference="Numbers 35:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In a world where a foreigner usually had the fewest protections of anyone, Israel built one piece of
            its legal system that treated a stranger&apos;s accidental hands exactly the same as a native son&apos;s.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 20 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did fleeing to a city of refuge prove the slayer was innocent?</strong> What the text says: verse
            4 has him declare his cause to the elders at the gate, and verse 6 still requires him to stand before
            the congregation for judgment afterward. How this is read: entry was never a verdict. It was a pause,
            a safe place to wait while the real hearing was still ahead of him, and the elders could still hand a
            deliberate murderer over to the avenger of blood if the facts showed intent, exactly as Deuteronomy 19
            describes.
          </p>
          <p>
            <strong>Why tie his freedom to one man&apos;s death instead of a fixed number of years?</strong> The text
            does not explain the reasoning directly. What is plain is the effect: the slayer could not calculate
            his own release date, and the whole community&apos;s sense of when justice was finally settled was
            tied to something bigger than his individual case, the end of an entire high priest&apos;s service.
          </p>
          <p>
            <strong>What actually happened if he left the city before the high priest died?</strong> Numbers 35:26
            and 27 answer this directly, outside this chapter. The avenger of blood could kill him there and bear
            no guilt for it, because the slayer himself had broken the one condition keeping him safe. The refuge
            protected him only inside its own borders.
          </p>
          <p>
            <strong>Why only six cities for the whole land, instead of a court in every town?</strong> The text does
            not say. What is clear from Numbers 35:14 is the deliberate split, three cities on each side of the
            Jordan, spaced so that reaching one was realistic from anywhere in Israel&apos;s territory, without
            needing one in every single town.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 20:3</h3>
        <VerseQuote
          text="That the slayer that killeth any person unawares and unwittingly may flee thither: and they shall be your refuge from the avenger of blood."
          reference="Joshua 20:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The whole chapter in one line: a real escape, built specifically for someone who never meant for any of
          it to happen.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 20:6</h3>
        <VerseQuote
          text="And he shall dwell in that city, until he stand before the congregation for judgment, and until the death of the high priest that shall be in those days: then shall the slayer return, and come unto his own city, and unto his own house, unto the city from whence he fled."
          reference="Joshua 20:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Freedom tied to a death the slayer never controlled, a shape later writers of Scripture would reach for
          again when describing a far greater high priest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 20:7</h3>
        <VerseQuote
          text="And they appointed Kedesh in Galilee in mount Naphtali, and Shechem in mount Ephraim, and Kirjatharba, which is Hebron, in the mountain of Judah."
          reference="Joshua 20:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Three names on the west side of the Jordan, one of them a city whose history stretched all the way back
          to Abraham, now carrying a brand new purpose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 20:9</h3>
        <VerseQuote
          text="These were the cities appointed for all the children of Israel, and for the stranger that sojourneth among them, that whosoever killeth any person at unawares might flee thither, and not die by the hand of the avenger of blood, until he stood before the congregation."
          reference="Joshua 20:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The closing verse widens the whole chapter: this protection belonged to the stranger in the land exactly
          as much as it belonged to Israel&apos;s own sons.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 20?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel finally set up the six cities of refuge God had commanded through Moses years earlier, three
          cities west of the Jordan and three east of it. Anyone who killed another person by accident could flee
          to one, state his case at the gate, and be protected there from revenge until a formal hearing, or until
          the death of the high priest serving at that time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;unawares and unwittingly&quot; mean in Joshua 20:3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes a killing with no plan and no warning behind it, like the axe head example in Deuteronomy
          19:5, where the blade simply slips off its handle. Both words rule out intent. They do not describe
          carelessness being excused, only the complete absence of a plot.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was the avenger of blood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Usually the closest living male relative of the person who had been killed, the one ancient custom
          expected to settle the death personally. The cities of refuge did not remove his grief or his claim.
          They stopped him from acting on it before anyone had weighed whether the killing was truly deliberate.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Could a real murderer hide in a city of refuge?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Deuteronomy 19:11 and 12 instructs the elders of a murderer&apos;s own city to fetch him out of the
          city of refuge and hand him over to the avenger of blood. These cities protected only the person who
          killed without hatred and without a plan, never someone who lay in wait for his neighbor.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened if the slayer left the city before the high priest died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 35:26 and 27 says the avenger of blood could kill him outside the city&apos;s border without
          being guilty of murder. The protection only held as long as the slayer stayed inside the line. Stepping
          past it, even by his own choice, ended the refuge.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did release depend on the death of the high priest?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 20:6 states it as a fact without explaining the reasoning. What is clear is the effect: the
          slayer&apos;s freedom was never something he could schedule or earn on his own timetable. It arrived
          attached to something outside his control entirely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where were the six cities of refuge located?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Kedesh, Shechem, and Hebron sat west of the Jordan. Bezer, Ramoth in Gilead, and Golan sat east of it.
          Joshua 20:7 and 8 name all six, spread far enough apart that nowhere in Israel&apos;s territory was
          impossibly distant from one of them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the cities of refuge only for Israelites?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Joshua 20:9 names &quot;the stranger that sojourneth among them&quot; alongside the children of
          Israel as equally protected, matching what Numbers 35:15 had already commanded generations earlier.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do the cities of refuge relate to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 6:18 describes believers as people who have &quot;fled for refuge&quot; to the hope found in
          Christ, using the same picture as a man running for Kedesh or Hebron. Hebrews 7:24 and 25 then notes the
          difference: unlike the high priests of Joshua&apos;s day, Jesus never dies, so the refuge He offers
          never runs out waiting on anyone&apos;s death.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 20 is short, but it builds something most ancient nations never bothered to build.</p>
          <p>
            📌 <strong>An accident was never treated the same as a murder.</strong> The whole chapter exists to
            draw that line clearly, with real cities and real elders standing at the gate to judge it.
          </p>
          <p>
            📌 <strong>Protection had a condition attached.</strong> The slayer had to stay inside the line he was
            given. Mercy here was real, but it was not loose.
          </p>
          <p>
            📌 <strong>Freedom waited on someone else&apos;s death, not his own effort.</strong> That shape, a
            refuge opened by a high priest&apos;s death, is exactly the picture Hebrews later hands to anyone who
            has fled to Christ.
          </p>
          <p>
            You are probably not fleeing toward Kedesh or Hebron this week. But you may be carrying guilt for
            something you never planned, still waiting for somewhere safe to stand while it gets sorted out.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Hebrews 6:18 again, slowly, and let &quot;fled for refuge&quot; describe exactly what it is to
            run to Christ instead of running from Him.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
