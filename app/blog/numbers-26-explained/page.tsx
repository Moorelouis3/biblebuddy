import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-26-explained", {
  title: "Numbers 26 Explained: The Census That Only Two Men Survived",
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

export default function NumbersTwentySixExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-26-explained"
      title={<>📖 Numbers 26 Explained: The Census That Only Two Men Survived</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No battle in this chapter. No ritual either. Just a roll call, tribe by tribe, taken in a camp still grieving.</p>
            <p>
              <strong>Numbers 26 explained</strong> is the second census in the book, ordered right after the plague at
              Baalpeor, and it quietly does something no sword ever managed. It counts the nation God swore would die in
              the wilderness, name by family, and finds almost no one left who remembers leaving Egypt.
            </p>
            <p>Maybe you have watched a long season of waiting finally close, not with a dramatic ending, but with a list.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why order a headcount right after a plague just killed thousands?</li>
            <li>❓ Why does one tribe&apos;s number collapse while another nearly doubles?</li>
            <li>❓ Why does a military census stop to mention a man with no sons?</li>
            <li>❓ Why does the chapter end by naming only two survivors?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This is the chapter where a promise made 38 years earlier finally comes due, counted out one
              family at a time.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the command for a new census, Reuben&apos;s family
              and the rebellion it still remembers, Simeon&apos;s sudden drop, the rest of the tribes tallied by name, the
              land divided by lot, the Levites counted on their own terms, and the final line that closes out an entire
              generation.
            </p>
            <p>Sixty five verses of names and numbers, and almost none of the names belong to anyone still alive.</p>
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
            <ArticleLink href="/blog/numbers-25-explained">Numbers 25</ArticleLink> ended with Israel still camped at
            Shittim, a plague just stopped, 24,000 dead, and Phinehas granted a covenant of peace for the one act that
            turned God&apos;s anger aside. The chapter closed with a command to move against Midian, the nation behind the
            scheme at Baalpeor.
          </p>
          <p>
            Numbers 26 opens in that same bruised camp, on the plains of Moab, with God speaking to Moses and Eleazar
            before a single step is taken toward Midian. Before Israel fights anyone else, God wants to know exactly
            who is left to fight.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 26 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Census Ordered in the Middle of Grief (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The command comes while the plague is still fresh, not months later once the camp has settled.</p>
        </div>
        <VerseQuote
          text="And it came to pass after the plague, that the LORD spake unto Moses and unto Eleazar the son of Aaron the priest, saying, Take the sum of all the congregation of the children of Israel, from twenty years old and upward, throughout their fathers’ house, all that are able to go to war in Israel."
          reference="Numbers 26:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who God speaks to. Not Moses and Aaron, the pair who led the first census.</strong>{" "}
            Eleazar stands in his father&apos;s place now, high priest since Aaron died on Mount Hor. This census is already
            being taken by a different generation of leadership than the one that started the count 38 years earlier.
          </p>
          <p>Moses passes the command to the people with almost identical wording, naming exactly where they stand.</p>
        </div>
        <VerseQuote
          text="And Moses and Eleazar the priest spake with them in the plains of Moab by Jordan near Jericho, saying, Take the sum of the people, from twenty years old and upward; as the LORD commanded Moses and the children of Israel, which went forth out of the land of Egypt."
          reference="Numbers 26:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The phrase &quot;which went forth out of the land of Egypt&quot; is doing quiet work here. Moses is
            still described that way, but as the chapter unfolds, almost no one being counted actually fits that
            description anymore. They left Egypt as infants, or they were born in the wilderness after it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Reuben, and a Rebellion the Census Still Remembers (verses 5 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Reuben opens the list as Jacob&apos;s firstborn tribe, and the count stays simple until one family name pulls
            the chapter backward.
          </p>
        </div>
        <VerseQuote
          text="And the sons of Eliab; Nemuel, and Dathan, and Abiram. This is that Dathan and Abiram, which were famous in the congregation, who strove against Moses and against Aaron in the company of Korah, when they strove against the LORD: And the earth opened her mouth, and swallowed them up together with Korah, when that company died, what time the fire devoured two hundred and fifty men: and they became a sign. Notwithstanding the children of Korah died not."
          reference="Numbers 26:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A census is the last place you would expect a flashback, and this one includes two.</strong>{" "}
            Dathan and Abiram belonged to Reuben. Their revolt alongside{" "}
            <ArticleLink href="/blog/numbers-16-explained">Korah</ArticleLink> swallowed them into the earth decades
            earlier, and the list pauses just long enough to make sure no reader forgets why their line stops here.
          </p>
          <p>
            ⚠️ The last line is the detail easiest to miss. &quot;The children of Korah died not.&quot; Korah himself
            was consumed with the two hundred and fifty men who burned, but his own sons lived on. Judgment in this
            chapter is specific. It falls on the man who led the revolt, not automatically on every descendant who
            shared his name.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Simeon&apos;s Number Falls Off a Cliff (verses 12 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter moves to Simeon next, and the contrast with 38 years earlier is impossible to miss.</p>
        </div>
        <VerseQuote
          text="Those that were numbered of them, even of the tribe of Simeon, were fifty and nine thousand and three hundred."
          reference="Numbers 1:23"
        />
        <VerseQuote
          text="These are the families of the Simeonites, twenty and two thousand and two hundred."
          reference="Numbers 26:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Simeon drops from 59,300 to 22,200. No other tribe loses anywhere near that share of its
            people.</strong> The text never states a reason here, but{" "}
            <ArticleLink href="/blog/numbers-25-explained">the previous chapter</ArticleLink> already named the man at
            the center of the plague that just ended: Zimri, &quot;a prince of a chief house among the Simeonites.&quot;
            A tribe whose own leading family led the way into Baalpeor is the tribe that comes out of this census the
            smallest it has ever been.
          </p>
          <p>
            Numbers 26 does not spell out the connection in so many words, so this stays a strong inference rather than
            a stated fact. But the timing, one chapter after 24,000 died and one chapter naming a Simeonite prince as
            part of the cause, makes the drop hard to read as a coincidence.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Nine More Tribes, Counted Family by Family (verses 15 to 51)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Gad, Judah, Issachar, Zebulun, Manasseh, Ephraim, Benjamin, Dan, Asher, and Naphtali follow in the same
            pattern: family names, then a total. Most of the list reads like a ledger. Two moments break the rhythm.
          </p>
          <p>
            Inside Judah&apos;s count, the text pauses to note that two of Judah&apos;s own sons, Er and Onan, died in Canaan
            long before the Exodus, a detail{" "}
            <ArticleLink href="/blog/numbers-1-explained">the first census</ArticleLink> had no reason to repeat since
            it was already old news by then. Inside Manasseh&apos;s count comes the detail the rest of the book will build
            on.
          </p>
        </div>
        <VerseQuote
          text="And Zelophehad the son of Hepher had no sons, but daughters: and the names of the daughters of Zelophehad were Mahlah, and Noah, Hoglah, Milcah, and Tirzah."
          reference="Numbers 26:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Naming five daughters by name, inside a census meant to count men able to go to war, is unusual enough
            to notice. A military roll has no use for daughters. Scripture includes them anyway, setting up a question
            about inheritance the very next chapter will have to answer, once the land these numbers are about to
            divide comes up for a family with no son to receive it.
          </p>
          <p>
            Asher&apos;s count carries a smaller version of the same thing, naming a daughter, Sarah, the only other woman
            named anywhere in this chapter. Whatever reason Scripture had for recording these two women by name among
            hundreds of thousands of men, it was deliberate both times.
          </p>
          <p>When every family has been counted, one number sums up the whole nation.</p>
        </div>
        <VerseQuote
          text="These were the numbered of the children of Israel, six hundred thousand and a thousand seven hundred and thirty."
          reference="Numbers 26:51"
        />
        <VerseQuote
          text="Even all they that were numbered were six hundred thousand and three thousand and five hundred and fifty."
          reference="Numbers 1:46"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>601,730 against 603,550. Thirty eight years, an entire generation replaced, and the total
            barely moved.</strong> Judah, Issachar, Benjamin, Asher, and Manasseh grew, Manasseh most of all, nearly
            doubling. Simeon, Ephraim, and Naphtali shrank enough to cancel most of that growth out. A nation that
            should have multiplied freely in four decades instead spent most of that time standing still, which is
            exactly what a 40 year sentence in the wilderness looks like from the outside.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Land Divided by Lot, Not by Preference (verses 52 to 56)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The reason for the headcount finally surfaces once every tribe has a number attached to it.</p>
        </div>
        <VerseQuote
          text="Unto these the land shall be divided for an inheritance according to the number of names."
          reference="Numbers 26:53"
        />
        <VerseQuote
          text="Notwithstanding the land shall be divided by lot: according to the names of the tribes of their fathers they shall inherit."
          reference="Numbers 26:55 and 56"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Two different rules sit side by side here, and both apply at once. Verse 54 already said the bigger a
            tribe&apos;s number, the bigger its share of land. Verse 55 then says the actual location of that share, which
            specific stretch of ground, is settled by lot, not by request. Size decides how much a tribe gets.
            Chance, under God&apos;s direction, decides where.
          </p>
          <p>
            📌 <strong>Not one tribe gets to pick the best valley or the easiest border.</strong> The land was never
            going to be divided by which leader argued hardest or which tribe arrived first. The census fixed the
            portions. The lot fixed the place.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Levites, Counted on Separate Terms (verses 57 to 62)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before the chapter closes, one more family gets counted, and the rules change the moment the text reaches
            them.
          </p>
        </div>
        <VerseQuote
          text="And unto Aaron was born Nadab, and Abihu, Eleazar, and Ithamar. And Nadab and Abihu died, when they offered strange fire before the LORD. And those that were numbered of them were twenty and three thousand, all males from a month old and upward: for they were not numbered among the children of Israel, because there was no inheritance given them among the children of Israel."
          reference="Numbers 26:60 to 62"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The Levites are counted from one month old, not twenty years old, and the number sits entirely
            outside the 601,730 total.</strong> Every other tribe is being measured for an inheritance of land. The
            Levites have none coming, so the census that governs land has no reason to measure them by the same rule.
            Their reminder of Nadab and Abihu, dead for offering strange fire, mirrors Reuben&apos;s reminder of Dathan and
            Abiram. Both priestly and lay families carry their own cautionary name inside this same list.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Everyone Who Left Egypt Is Already Gone (verses 63 to 65)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with the line that gives every number before it its real weight.</p>
        </div>
        <VerseQuote
          text="But among these there was not a man of them whom Moses and Aaron the priest numbered, when they numbered the children of Israel in the wilderness of Sinai. For the LORD had said of them, They shall surely die in the wilderness. And there was not left a man of them, save Caleb the son of Jephunneh, and Joshua the son of Nun."
          reference="Numbers 26:64 and 65"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Of every man counted in the first census at Sinai, only two names still answer at this
            one.</strong> The oath behind this was spoken decades earlier, after ten of twelve spies came back
            convinced the Promised Land could not be taken.
          </p>
        </div>
        <VerseQuote
          text="Your carcases shall fall in this wilderness; and all that were numbered of you, according to your whole number, from twenty years old and upward, which have murmured against me, Doubtless ye shall not come into the land, concerning which I sware to make you dwell therein, save Caleb the son of Jephunneh, and Joshua the son of Nun."
          reference="Numbers 14:29 and 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <ArticleLink href="/blog/numbers-14-explained">Numbers 14</ArticleLink> read like a threat at the time
            it was spoken. Numbers 26 is that same sentence read back as a finished fact, verified by an actual
            headcount instead of taken on faith. Caleb and Joshua trusted God at the border of the land they were
            told not to fear. Thirty eight years and one census later, trust is the only reason either of their names
            still appears on a list of the living.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 26 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does Numbers 26 prove every single adult who left Egypt was dead by now?</strong> Not quite as
            broadly as it first sounds. The oath in Numbers 14, and the census here, specifically concern men twenty
            years old and upward who were counted at Sinai, the group able to go to war. Women, and anyone under
            twenty at that first census, were never the ones the oath named, so the chapter&apos;s claim is precise rather
            than universal: not one of the men originally numbered for battle remains, except Caleb and Joshua.
          </p>
          <p>
            <strong>Why did Simeon&apos;s number fall so much further than any other tribe&apos;s?</strong> The text does not
            state the reason directly inside this chapter. The strongest clue sits one chapter earlier, where Zimri, a
            Simeonite prince, stood at the center of the sin that triggered the plague. Reading the two chapters
            together, a tribe whose own leadership led into Baalpeor coming out smallest is a connection the order of
            the chapters invites, even though Numbers 26 itself never says so in plain words.
          </p>
          <p>
            <strong>Why mention that Korah&apos;s own sons survived, right after naming Dathan and Abiram&apos;s fate?</strong>{" "}
            The distinction matters for how Scripture treats guilt. Korah led the rebellion and died with it. His sons
            did not lead it, and the text records them continuing. Judgment in this census falls on the people who
            actually acted, not automatically on every descendant carrying the same family name.
          </p>
          <p>
            <strong>Does land divided &quot;by lot&quot; mean the location was left to chance?</strong> The method was
            random from a human point of view, casting lots rather than a vote or a claim staked first. Scripture
            elsewhere treats the lot as a way of putting a decision directly into God&apos;s hands rather than human
            negotiation, so the randomness of the method and the belief that God still governed the outcome are not
            treated as contradictions here.
          </p>
          <p>
            <strong>Why record daughters by name in a census built to count men for war?</strong> Numbers 26 never
            explains why Zelophehad&apos;s five daughters and Asher&apos;s daughter Sarah get named when the chapter&apos;s whole
            purpose is counting fighting men. What is clear from what follows is that Zelophehad&apos;s daughters are not a
            throwaway detail. Their lack of a brother becomes the exact problem the next chapter in this book has to
            solve.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 26
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 26:64 and 65</h3>
        <VerseQuote
          text="But among these there was not a man of them whom Moses and Aaron the priest numbered, when they numbered the children of Israel in the wilderness of Sinai. For the LORD had said of them, They shall surely die in the wilderness. And there was not left a man of them, save Caleb the son of Jephunneh, and Joshua the son of Nun."
          reference="Numbers 26:64 and 65"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise spoken as a threat in Numbers 14 comes back here as a confirmed headcount. Only two men prove it
          was never an empty warning.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 26:51</h3>
        <VerseQuote
          text="These were the numbered of the children of Israel, six hundred thousand and a thousand seven hundred and thirty."
          reference="Numbers 26:51"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A number almost identical to the one taken 38 years earlier, hiding a complete replacement of nearly every
          person it represents.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 26:33</h3>
        <VerseQuote
          text="And Zelophehad the son of Hepher had no sons, but daughters: and the names of the daughters of Zelophehad were Mahlah, and Noah, Hoglah, Milcah, and Tirzah."
          reference="Numbers 26:33"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Five names tucked inside a military roll, planting a question about inheritance the book has not finished
          answering yet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 26:9 to 11</h3>
        <VerseQuote
          text="And the sons of Eliab; Nemuel, and Dathan, and Abiram. This is that Dathan and Abiram, which were famous in the congregation, who strove against Moses and against Aaron in the company of Korah, when they strove against the LORD: And the earth opened her mouth, and swallowed them up together with Korah, when that company died, what time the fire devoured two hundred and fifty men: and they became a sign. Notwithstanding the children of Korah died not."
          reference="Numbers 26:9 to 11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A census stops to remember exactly who rebelled and exactly who survived it, down to naming which sons lived
          past their father&apos;s judgment.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 26
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 26 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 26 records the second census of Israel, taken on the plains of Moab after the plague at Baalpeor. It
          counts every tribe by family, totals 601,730 men able to go to war, sets the rule for dividing the Promised
          Land, counts the Levites separately, and closes by noting that almost none of the men counted in the first
          census were still alive.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God order a second census so soon after a plague?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 26:1 and 2 tie the command directly to the aftermath of the plague, and verses 52 to 56 explain the
          purpose: the land was about to be divided among the tribes according to their numbers, and the camp
          needed an accurate count before that could happen.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Simeon&apos;s numbers drop so sharply in Numbers 26?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Simeon fell from 59,300 in the first census to 22,200 here, a far steeper drop than any other tribe. Numbers
          26 does not state the reason, but Numbers 25:14 names a Simeonite prince, Zimri, as central to the sin at
          Baalpeor the chapter before, which makes the timing hard to read as coincidence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Dathan and Abiram in Numbers 26?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Dathan and Abiram were Reubenites who joined Korah&apos;s rebellion against Moses and Aaron. Numbers 26:9 and 10
          recalls that the earth swallowed them along with Korah, and that 250 men died by fire in the same judgment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Korah&apos;s sons die with him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Numbers 26:11 says plainly, &quot;the children of Korah died not.&quot; Korah led the rebellion and was
          consumed in it, but his own sons are recorded continuing afterward, a detail the text places right beside
          his judgment on purpose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Numbers 26 mention Zelophehad having no sons?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 26:33 names Zelophehad&apos;s five daughters inside a census meant to count fighting men, which is
          unusual on its own. The detail sets up the inheritance question his daughters bring to Moses in the very
          next chapter of the book.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How was the Promised Land divided among the twelve tribes?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 26:54 ties the size of each tribe&apos;s share to its population from this census, and verses 55 and 56
          say the specific location of each share was decided by lot, not by request. A bigger tribe got more land;
          where that land actually sat was left to the lot.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the Levites counted separately from the rest of Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 26:62 explains it directly: the Levites were not numbered among the other tribes because they were
          receiving no inheritance of land. Since the main census existed to divide land, a tribe with none coming had
          no reason to be measured by the same count.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Numbers 26 mean the entire generation that left Egypt had died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means every man who was twenty or older at the first census, the group bound by the oath in Numbers
          14:29 and 30, had died except Caleb and Joshua. Women and anyone under twenty at that earlier count were
          never the specific group that oath named.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do only Caleb and Joshua remain from the first census?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 14:29 and 30 recorded God&apos;s oath that the generation who refused to trust Him at the border of
          Canaan would die in the wilderness, naming Caleb and Joshua as the only exceptions because they trusted Him
          when the other ten spies did not. Numbers 26:65 confirms that oath came true exactly as spoken.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 26 looks like paperwork. Read closely, it is actually a verdict, carried out quietly over 38 years.</p>
          <p>
            📌 <strong>A number can confirm a promise just as surely as a miracle can.</strong> No plague, no fire,
            no dramatic scene closes this story. A simple count does it, matching exactly what God said decades
            earlier at Numbers 14.
          </p>
          <p>
            📌 <strong>Judgment in this census is specific, not inherited by name alone.</strong> Dathan and Abiram
            died for what they did. Korah&apos;s own sons lived. The chapter is careful enough to say so both times.
          </p>
          <p>
            📌 <strong>A detail that looks small, like five daughters with no brother, can decide what comes
            next.</strong> Zelophehad&apos;s family gets one verse here and an entire chapter&apos;s worth of attention soon
            after.
          </p>
          <p>
            You are probably not waiting on tribal land or a wilderness sentence to run out. But you may be living
            inside a long season where the ending, when it finally comes, will not look dramatic either.
          </p>
          <p>
            Read Numbers 14:29 and 30 next to Numbers 26:65, and let this chapter answer a question worth asking about
            your own waiting: does God keep a hard promise exactly as quietly as He keeps a good one?
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
