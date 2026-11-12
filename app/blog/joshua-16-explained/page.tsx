import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-16-explained", {
  title: "Joshua 16 Explained: Ephraim's Border and Gezer's Canaanites",
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

export default function JoshuaSixteenExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-16-explained"
      title={<>📖 Joshua 16 Explained: Ephraim&apos;s Border and Gezer&apos;s Canaanites</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Ten verses. One tribe. A border Joshua himself belonged to.</p>
            <p>
              <strong>Joshua 16 explained</strong> is the shortest land chapter so far in the book, and the most
              personal one. This is where the sons of Joseph receive their lot, where the text pauses to trace
              Ephraim&apos;s own border, and where a famous Bible leader turns out to be dividing out the very
              tribe he himself was born into.
            </p>
            <p>Maybe you have finished a big job and the smallest leftover piece is the one nobody wants to touch.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why are Ephraim and Manasseh handled together before the text splits them apart?</li>
            <li>❓ Was Joshua personally connected to the tribe this chapter describes?</li>
            <li>❓ Why does Ephraim end up owning cities sitting inside Manasseh&apos;s own territory?</li>
            <li>❓ Why does a short border chapter end on a city Ephraim never actually took?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>The man leading this whole division was, by birth, a member of the very tribe this
              chapter describes.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: the shared lot for Joseph&apos;s sons,
              the specific line Ephraim&apos;s border follows, the odd detail of Ephraim holding cities inside
              Manasseh&apos;s ground, and the one Canaanite city that stayed standing long after this chapter
              closed.
            </p>
            <p>Ten verses rarely carry this much, but this chapter does.</p>
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
            <ArticleLink href="/blog/joshua-15-explained">Joshua 15</ArticleLink> gave Judah the largest
            inheritance recorded in the book, traced its border in detail, and still closed by admitting one
            city, Jerusalem, that Judah never actually took from the Jebusites living inside it.
          </p>
          <p>
            Joshua 16 moves to the next tribe in line, the descendants of Joseph, and starts the same way Judah
            did: a border traced with care. But where Judah&apos;s chapter stretched to 63 verses, Joseph&apos;s
            sons get a fraction of that space before the text splits their land between Ephraim and the half tribe
            of Manasseh.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 16 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. One Lot for Both Sons of Joseph (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by treating Ephraim and Manasseh as a single lot before it ever treats them as two.</p>
        </div>
        <VerseQuote
          text="And the lot of the children of Joseph fell from Jordan by Jericho, unto the water of Jericho on the east, to the wilderness that goeth up from Jericho throughout mount Bethel,"
          reference="Joshua 16:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The border starts at the Jordan near Jericho, the first city Israel ever conquered in Canaan, and
            climbs west through the hill country toward Bethel.
          </p>
        </div>
        <VerseQuote
          text="So the children of Joseph, Manasseh and Ephraim, took their inheritance."
          reference="Joshua 16:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This verse names Manasseh before Ephraim, even though Joshua is about to spend the rest
            of the chapter on Ephraim alone.</strong> That order is not an accident. Manasseh was Joseph&apos;s
            firstborn. When{" "}
            <ArticleLink href="/blog/genesis-48-explained">Jacob blessed the two boys in Genesis 48</ArticleLink>,
            he deliberately crossed his hands, laid his right hand on the younger Ephraim instead of the firstborn
            Manasseh, and said plainly that the younger brother would become greater. Genesis 48:20 even records
            him setting &quot;Ephraim before Manasseh&quot; by name. This chapter is that old blessing playing out
            on a map: Ephraim gets its own detailed border next, while Manasseh waits one more chapter.
          </p>
          <p>
            There is a second, quieter detail worth catching here. The man drawing this border was not a
            disinterested official. <ArticleLink href="/blog/numbers-13-explained">Numbers 13:8</ArticleLink>
            lists &quot;Oshea the son of Nun&quot; as the spy representing the tribe of Ephraim, and verse 16 of
            that same chapter says Moses renamed him Jehoshua, the name Joshua carries through the rest of the
            Bible. Joshua was an Ephraimite. The leader handing out everyone else&apos;s land was, in this
            chapter, finally handing out his own tribe&apos;s.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Ephraim&apos;s Border, Point by Point (verses 5 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the shared lot recorded, the text narrows its focus and traces Ephraim&apos;s own line.</p>
        </div>
        <VerseQuote
          text="And the border of the children of Ephraim according to their families was thus: even the border of their inheritance on the east side was Atarothaddar, unto Bethhoron the upper;"
          reference="Joshua 16:5"
        />
        <VerseQuote
          text="The border went out from Tappuah westward unto the river Kanah; and the goings out thereof were at the sea. This is the inheritance of the tribe of the children of Ephraim by their families."
          reference="Joshua 16:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Bethhoron the upper sits on this border for a reason worth remembering. The same town, this time
            called &quot;Bethhoron the nether,&quot; shows up centuries later in 1 Kings 9:17, among the cities
            Solomon rebuilt. A line drawn on a map in Joshua&apos;s day was still a real, named place when a king
            of Israel was fortifying his kingdom generations afterward.
          </p>
          <p>
            Four markers carry the whole description: Atarothaddar on the east, Bethhoron the upper along the
            way, Tappuah to the river Kanah, and the Mediterranean Sea itself as the western edge. Ephraim&apos;s
            territory sat squarely in the central hill country, smaller than Judah&apos;s sprawling allotment but
            planted right in the heart of the land.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Ephraim&apos;s Cities Inside Manasseh&apos;s Land (verse 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right after fixing Ephraim&apos;s own border, the chapter adds a detail that does not fit neatly inside that line at all.</p>
        </div>
        <VerseQuote
          text="And the separate cities for the children of Ephraim were among the inheritance of the children of Manasseh, all the cities with their villages."
          reference="Joshua 16:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Ephraim did not only receive the land inside its own border. It also received individual
            cities sitting inside Manasseh&apos;s territory, named separately here and listed again when
            Manasseh&apos;s own chapter opens.</strong> The two half brothers&apos; land was not two clean,
            side by side blocks. It overlapped, city by city, the way two branches of one family often end up
            tangled together even after the inheritance is divided.
          </p>
          <p>
            That tangle matches the blessing behind it. Jacob never separated the two sons entirely. He blessed
            them together, with one set of crossed hands, and told Joseph that both would become a people. A
            border with islands of the younger brother&apos;s cities sitting inside the older brother&apos;s
            ground is a strange way to draw a map, but it is a faithful way to keep one blessing intact.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Gezer: Tribute Instead of Conquest (verse 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter&apos;s final verse does for Ephraim exactly what Joshua 15:63 just did for Judah one chapter earlier.</p>
        </div>
        <VerseQuote
          text="And they drave not out the Canaanites that dwelt in Gezer: but the Canaanites dwell among the Ephraimites unto this day, and serve under tribute."
          reference="Joshua 16:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice this is not quite the same admission Joshua 15 made about Jerusalem.</strong> The
            Jebusites simply kept living in Jerusalem alongside Judah. The Canaanites of Gezer stayed too, but
            this verse adds a phrase Joshua 15:63 never used: they &quot;serve under tribute.&quot; Ephraim could
            not drive them out, but it could and did force them into forced labor and tax. An unfinished conquest
            still found a way to extract something from the people it could not remove.
          </p>
          <p>
            This is also not the first time Gezer appears in the book. <ArticleLink href="/blog/joshua-10-explained">Joshua 10:33</ArticleLink>
            {" "}already recorded &quot;Horam king of Gezer&quot; marching out to help Lachish, and Joshua striking
            him down until none of his men were left standing. A king of Gezer died on that battlefield years
            before this chapter was written. His city, apparently, did not fall with him, the same pattern Joshua
            13 and 15 already showed at other unconquered places.
          </p>
          <p>
            Gezer&apos;s story does not end here either. Centuries later, 1 Kings 9:16 records a king of Egypt
            capturing the city, burning it, and giving it as a wedding present to his own daughter when she
            married Solomon. Solomon then rebuilt it. Unlike Jerusalem, which an Israelite king, David, finally
            claimed for Israel, Gezer finally changed hands through a foreign king&apos;s gift. Even the city
            Ephraim could never take was not Ephraim&apos;s to finish taking.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 16 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does verse 10 saying Ephraim never drove the Canaanites from Gezer contradict Joshua 10:33,
            where the king of Gezer was already struck down?</strong> What the text says: Joshua 10:33 records
            Horam, king of Gezer, defeated in the field alongside Lachish&apos;s defenders. Joshua 16:10 says
            Ephraim could not drive the Canaanite inhabitants out of the city itself. How this fits: a king
            losing his army on an open battlefield and a fortified city surrendering its population are two
            separate events. Scripture records both as true because both happened, one after the other, years
            apart.
          </p>
          <p>
            <strong>Why does this chapter name Manasseh first in verse 4, then spend every remaining verse on
            Ephraim instead?</strong> What the text says: verse 4 lists &quot;Manasseh and Ephraim&quot; in that
            order, then verses 5 through 10 describe Ephraim&apos;s border exclusively. How this is read: Manasseh
            was Joseph&apos;s firstborn by birth order, which verse 4 still respects by naming him first. But
            Genesis 48:20 already recorded Jacob giving Ephraim the greater blessing, and this chapter&apos;s
            structure, Ephraim receiving the detailed treatment while Manasseh waits for its own chapter next,
            reflects that reversal.
          </p>
          <p>
            <strong>How could Ephraim legally own cities sitting inside land that belonged to Manasseh?</strong>
            {" "}What the text says: verse 9 states plainly that Ephraim&apos;s separate cities sat &quot;among
            the inheritance of the children of Manasseh.&quot; How this is read: the two tribes descended from
            one father, Joseph, and the land division by lot in Joshua 14 placed the outcome outside human
            preference. An overlap like this reads as the two half brothers&apos; portions staying woven
            together rather than two unrelated tribes sharing a border by coincidence.
          </p>
          <p>
            <strong>Why does &quot;serve under tribute&quot; appear here but not in Joshua 15&apos;s account of
            the Jebusites in Jerusalem?</strong> What the text says: Joshua 15:63 only says the Jebusites
            &quot;dwell with&quot; Judah. Joshua 16:10 adds that the Canaanites of Gezer &quot;serve under
            tribute.&quot; How this is read: both are honest admissions that conquest stopped short of full
            removal, but Gezer&apos;s outcome includes forced labor and taxation on top of coexistence, a harsher
            arrangement than Jerusalem&apos;s. Judges 1:28 and 1:29 describe this same pattern happening across
            several Canaanite cities once Israel grew strong enough to impose it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 16
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 16:4</h3>
        <VerseQuote
          text="So the children of Joseph, Manasseh and Ephraim, took their inheritance."
          reference="Joshua 16:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One sentence closing out a promise that began generations earlier, when Jacob blessed Joseph&apos;s two
          sons with his own crossed hands in Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 16:5</h3>
        <VerseQuote
          text="And the border of the children of Ephraim according to their families was thus: even the border of their inheritance on the east side was Atarothaddar, unto Bethhoron the upper;"
          reference="Joshua 16:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The opening line of a border that Joshua, an Ephraimite by birth, was tracing for the people he had
          grown up among before he ever led them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 16:9</h3>
        <VerseQuote
          text="And the separate cities for the children of Ephraim were among the inheritance of the children of Manasseh, all the cities with their villages."
          reference="Joshua 16:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Proof that this inheritance was never meant to be two separate, tidy halves. Joseph&apos;s two sons
          stayed interwoven on the map the same way they were blessed together in Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 16:10</h3>
        <VerseQuote
          text="And they drave not out the Canaanites that dwelt in Gezer: but the Canaanites dwell among the Ephraimites unto this day, and serve under tribute."
          reference="Joshua 16:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s honest final line. A king of Gezer had already fallen in battle, yet his city
          outlasted him for generations, finally changing hands through an Egyptian king&apos;s gift rather than
          an Israelite conquest.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 16
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 16?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The children of Joseph, Ephraim and Manasseh, received their shared lot from the Jordan near Jericho
          westward to the sea. The chapter then traces Ephraim&apos;s specific border, notes that some of
          Ephraim&apos;s cities sat inside Manasseh&apos;s territory, and closes by admitting Ephraim never drove
          the Canaanites out of Gezer.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Joshua from the tribe of Ephraim?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Numbers 13:8 lists him among the twelve spies as &quot;Oshea the son of Nun&quot; representing
          Ephraim, and verse 16 says Moses renamed him Jehoshua, the name he carries for the rest of Scripture.
          The man dividing this land was, by birth, a member of the tribe this chapter describes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter mention Manasseh and Ephraim together before separating them?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both were sons of Joseph, so they first received one combined lot as his descendants. The text then
          splits off Ephraim&apos;s specific border in this chapter, with Manasseh&apos;s own detailed
          allotment following in Joshua 17.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Ephraim get more attention than Manasseh, its older brother?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 48:20 records Jacob deliberately blessing the younger Ephraim ahead of the firstborn Manasseh,
          naming him first and promising his descendants would become greater. This chapter&apos;s focus on
          Ephraim&apos;s border reflects that same order.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Ephraim had cities inside Manasseh&apos;s land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 16:9 states that some of Ephraim&apos;s separate cities and villages sat within territory that
          otherwise belonged to Manasseh. The two tribes&apos; land was not cleanly divided into two blocks; it
          overlapped in places, reflecting how closely tied the two half brothers remained even after each
          received his own inheritance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened at Gezer, and why could Ephraim not take it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 16:10 says the Canaanites kept living in Gezer, forced into tribute rather than removed outright.
          The city&apos;s king had already been defeated in battle back in Joshua 10:33, but the fortified city
          itself held out. It eventually fell generations later to an Egyptian king, who gave it to his daughter
          as a wedding gift when she married Solomon.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Joshua 16:10 the same problem as Joshua 15:63 and Jerusalem?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the same pattern, an unconquered city sitting inside a tribe&apos;s own territory, but not an
          identical outcome. Jerusalem&apos;s Jebusites simply kept living there until David took the city.
          Gezer&apos;s Canaanites were put under tribute, a harsher arrangement, and the city changed hands
          through a foreign king rather than an Israelite one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where was Gezer located?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gezer sat on Ephraim&apos;s western border in the lowlands between the hill country and the coastal
          plain, a strategic location that explains why both Canaanite kings and later Egyptian and Israelite
          rulers all fought to control it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Joshua 16 so much shorter than Joshua 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Judah received the largest tribal allotment recorded in the book, with dozens of named towns across
          four regions. Ephraim&apos;s smaller, more compact territory in the central hill country simply needed
          fewer verses to describe fully.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 16 is short enough to read in a minute, and it still carries three things worth sitting with.</p>
          <p>
            📌 <strong>An old blessing can quietly reshape a new map.</strong> Jacob crossed his hands over two
            boys in Egypt generations earlier, and this border still followed the order he set that day.
          </p>
          <p>
            📌 <strong>Family ties do not always draw clean lines.</strong> Ephraim&apos;s cities sitting inside
            Manasseh&apos;s land were not a mistake to fix. They were what staying connected actually looked like
            on paper.
          </p>
          <p>
            📌 <strong>A defeated enemy is not the same as a finished fight.</strong> Gezer&apos;s king fell in
            battle long before this chapter closed, and the city still outlasted this entire generation of
            Israelites.
          </p>
          <p>
            You are probably not tracing a tribal border this week. But you may be the one person in your own
            family whose place in it was decided by a choice someone else made long before you had any say in it.
          </p>
          <p>So here is the one thing this chapter actually asks of you.</p>
          <p>
            Take the ground you were actually given, the way Ephraim did, instead of waiting for every leftover
            Canaanite to clear out first.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
