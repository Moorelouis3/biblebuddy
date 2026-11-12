import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-18-explained", {
  title: "Joshua 18 Explained: Shiloh, Slackness, and Benjamin's Lot",
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

export default function JoshuaEighteenExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-18-explained"
      title={<>📖 Joshua 18 Explained: Shiloh, Slackness, and Benjamin&apos;s Lot</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Seven tribes still had no land. Not because none was left. Because nobody had gone to measure it.</p>
            <p>
              <strong>Joshua 18 explained</strong> is the chapter where Israel sets up a tent at a town called
              Shiloh that will matter for centuries, where Joshua stops waiting for seven tribes to organize
              themselves and does it for them, and where Benjamin, the smallest and youngest of Jacob&apos;s sons,
              gets a border squeezed between two much bigger brothers.
            </p>
            <p>Maybe you have watched a group sit on something good because nobody wanted to go first.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Joshua accuse Israel of being slack when dividing land just takes time?</li>
            <li>❓ Why does the land get measured by men and also decided by lot?</li>
            <li>❓ Why does Jerusalem show up again, this time under a different tribe?</li>
            <li>❓ Why does a chapter about land keep mentioning a tribe that gets none?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>The land had already been given. What was missing was not more promise from God. It was
              someone willing to walk it, write it down, and bring back a report.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: the tabernacle settling at Shiloh,
              Joshua&apos;s sharp question to seven stalled tribes, the survey and the lot that finally divided
              their land, and Benjamin&apos;s own border and city list, right down to the one city both this
              chapter and an earlier one could not finish taking.
            </p>
            <p>Twenty eight verses, and half of Israel&apos;s unclaimed inheritance gets settled inside them.</p>
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
            <ArticleLink href="/blog/joshua-17-explained">Joshua 17</ArticleLink> closed on a tribe that already
            had land complaining it was not enough, and Joshua answering their complaint by pointing them at
            ground they had not yet bothered to clear. Judah, Ephraim, and Manasseh, three of the biggest and
            most aggressive tribes, already held their inheritance by the end of that chapter.
          </p>
          <p>
            Joshua 18 turns to the tribes who had not moved at all. Seven of them were still camped around Israel
            with no ground of their own, and the text does not treat that as a paperwork delay. It treats it as a
            problem Joshua has to confront directly.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 18 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Tabernacle Settles at Shiloh (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter opens with a move that gets one sentence here and centuries of consequence afterward.
          </p>
        </div>
        <VerseQuote
          text="And the whole congregation of the children of Israel assembled together at Shiloh, and set up the tabernacle of the congregation there. And the land was subdued before them."
          reference="Joshua 18:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the first time Scripture names the exact place where the tabernacle came to rest
            once the fighting slowed down.</strong> Shiloh sat in the hill country roughly in the middle of
            Canaan, central enough for every tribe to reach it. It did not become the worship center by accident.{" "}
            <ArticleLink href="/blog/deuteronomy-12-explained">Deuteronomy 12</ArticleLink> had already commanded
            one chosen place where Israel would bring its offerings instead of worshiping wherever it pleased, and
            Shiloh is where that command finally landed on a map.
          </p>
          <p>
            Shiloh does not disappear after this chapter. It stays the center of Israel&apos;s worship for
            generations, long enough to become the home of a priest named Eli and the boy who grew up serving
            beside him, Samuel, the son a desperate woman named Hannah brought there herself to fulfill a vow. The
            quiet verse that plants the tabernacle here is the same ground{" "}
            <ArticleLink href="/blog/who-was-hannah">Hannah&apos;s story</ArticleLink> will later be built on.
          </p>
        </div>
        <VerseQuote
          text="And there remained among the children of Israel seven tribes, which had not yet received their inheritance."
          reference="Joshua 18:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One verse of settling in. One verse of unfinished business. The chapter wastes no time getting to the
            actual problem.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. &quot;How Long Are Ye Slack?&quot; (verses 3 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua does not open a committee meeting. He opens with a rebuke.</p>
        </div>
        <VerseQuote
          text="And Joshua said unto the children of Israel, How long are ye slack to go to possess the land, which the LORD God of your fathers hath given you?"
          reference="Joshua 18:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice what the land already is in this sentence. Not promised. Not available. Given.</strong>{" "}
            Joshua is not telling seven tribes to go earn something that might still be refused. He is telling
            them to go collect something that is already theirs by God&apos;s own decision, and that they are the
            only obstacle left standing between themselves and it.
          </p>
          <p>
            He does not wait for them to volunteer a plan. He builds one and tells them to execute it.
          </p>
        </div>
        <VerseQuote
          text="Give out from among you three men for each tribe: and I will send them, and they shall rise, and go through the land, and describe it according to the inheritance of them; and they shall come again to me."
          reference="Joshua 18:4"
        />
        <VerseQuote
          text="And they shall divide it into seven parts: Judah shall abide in their coast on the south, and the house of Joseph shall abide in their coasts on the north."
          reference="Joshua 18:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Twenty one men, three from each of the seven remaining tribes, sent out together. Nobody surveys
            only their own future portion. Every tribe has a hand in describing land that might end up belonging
            to one of the others, which removes any one group&apos;s chance to quietly shade the report in its
            own favor.
          </p>
        </div>
        <VerseQuote
          text="But the Levites have no part among you; for the priesthood of the LORD is their inheritance: and Gad, and Reuben, and half the tribe of Manasseh, have received their inheritance beyond Jordan on the east, which Moses the servant of the LORD gave them."
          reference="Joshua 18:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joshua names the two groups who are not part of this problem before anyone can ask why they
            are missing.</strong> Reuben, Gad, and half of Manasseh already settled east of the Jordan under
            Moses, long before Israel ever crossed into Canaan. The Levites were never going to get a tribal
            territory at all. Their inheritance was the priesthood itself, a point the law had already made clear
            and this chapter simply restates at the exact moment land gets divided, so nobody mistakes their
            absence for an oversight.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Measured by Men, Decided by Lot (verses 8 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The twenty one men actually go. The text does not skip over the fact that this took real effort.</p>
        </div>
        <VerseQuote
          text="And the men went and passed through the land, and described it by cities into seven parts in a book, and came again to Joshua to the host at Shiloh."
          reference="Joshua 18:9"
        />
        <VerseQuote
          text="And Joshua cast lots for them in Shiloh before the LORD: and there Joshua divided the land unto the children of Israel according to their divisions."
          reference="Joshua 18:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Two very different kinds of work sit side by side in these two verses. Walking hills, counting
            cities, and writing a book is slow, physical, human labor. Casting a lot before the LORD is instant
            and entirely outside human control. Neither one replaces the other.
          </p>
          <p>
            This is not a new idea Joshua invented at Shiloh. <ArticleLink href="/blog/numbers-26-explained">
            Numbers 26</ArticleLink> already laid out the same two step principle years earlier in the
            wilderness, before Israel had even crossed the Jordan: the size of each tribe&apos;s portion would be
            set by their numbers, a human and measurable fact, but which specific stretch of ground went to which
            tribe would be settled by lot, removing the chance for Joshua or anyone else to quietly steer the best
            land toward a favorite. The twenty one surveyors did the measuring. The lot made the choice no man got
            to make.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Benjamin&apos;s Border, Squeezed Between Two Brothers (verses 11 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Of the seven tribes waiting, the text picks one to describe in detail first: Benjamin, the youngest of
            Jacob&apos;s twelve sons.
          </p>
        </div>
        <VerseQuote
          text="And the lot of the tribe of the children of Benjamin came up according to their families: and the coast of their lot came forth between the children of Judah and the children of Joseph."
          reference="Joshua 18:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Benjamin lands exactly where its own history would predict: wedged between its biggest
            brother and its father&apos;s favorite son&apos;s family.</strong> Judah already held the largest
            territory in Canaan. Joseph&apos;s two sons, Ephraim and Manasseh, held the central hill country
            together. Benjamin, small and young, gets the strip of ground squeezed right between them, a
            position with almost no room for growth but sitting on some of the most fought over ground in the
            whole land, including the stretch running past Jericho, Bethel, and down toward Jerusalem itself.
          </p>
          <p>
            Jacob had already described this son&apos;s temperament generations earlier, on his deathbed in
            Egypt:
          </p>
        </div>
        <VerseQuote text="Benjamin shall ravin as a wolf: in the morning he shall devour the prey, and at night he shall divide the spoil." reference="Genesis 49:27" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That blessing from <ArticleLink href="/blog/genesis-49-explained">Genesis 49</ArticleLink> promised a
            fierce, fighting tribe, not a large one. Benjamin&apos;s later history in Judges and 1 Samuel bears
            that out. It never grows into a sprawling nation like Judah or Ephraim, but it produces some of
            Israel&apos;s most relentless warriors and, centuries later, its first king.
          </p>
        </div>
        <VerseQuote
          text="And the border came down to the end of the mountain that lieth before the valley of the son of Hinnom, and which is in the valley of the giants on the north, and descended to the valley of Hinnom, to the side of Jebusi on the south, and descended to Enrogel,"
          reference="Joshua 18:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Jebusi&quot; is Jerusalem under its older name, the same city whose border{" "}
            <ArticleLink href="/blog/joshua-15-explained">Joshua 15</ArticleLink> already traced from Judah&apos;s
            side. Benjamin&apos;s border runs along the south side of that same city. Two tribes, two chapters,
            and one city sitting exactly where both of their lines meet.
          </p>
        </div>
        <VerseQuote
          text="And Jordan was the border of it on the east side. This was the inheritance of the children of Benjamin, by the coasts thereof round about, according to their families."
          reference="Joshua 18:20"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Benjamin&apos;s Cities, Ending at Jerusalem (verses 21 to 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With the border fixed, the chapter lists Benjamin&apos;s cities in two groups, twelve and then
            fourteen.
          </p>
        </div>
        <VerseQuote
          text="And Betharabah, and Zemaraim, and Bethel,"
          reference="Joshua 18:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Bethel, the place Jacob himself named generations earlier after wrestling with a vision of a ladder to
            heaven, sits inside this short list almost without comment. By the time Joshua divides the land, a
            place that once marked one man&apos;s private encounter with God had simply become a town with a
            name on a list, inherited by a tribe descended from a brother that man had not even been born yet
            when he passed through.
          </p>
        </div>
        <VerseQuote
          text="And Zelah, Eleph, and Jebusi, which is Jerusalem, Gibeath, and Kirjath; fourteen cities with their villages. This is the inheritance of the children of Benjamin according to their families."
          reference="Joshua 18:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter ends on the same city Joshua 15 already named, this time counted among
            Benjamin&apos;s own cities instead of sitting only on Judah&apos;s border.</strong> Jerusalem was
            never cleanly inside one tribe&apos;s ground. It sat so close to the line between Judah and Benjamin
            that both tribes&apos; records could honestly claim it, long before either one of them actually held
            it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 18 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was Joshua being fair calling seven tribes &quot;slack&quot; for not yet having land, when
            surveying and dividing a whole country simply takes time?</strong> What the text says: verse 2 states
            plainly that seven tribes had not received their inheritance, and verse 3 has Joshua asking them how
            long they intend to stay slack about taking land already given to them. How this is read: the rebuke
            is not about the speed of a bureaucratic process. Judah, Ephraim, and Manasseh had already organized
            their own surveys and claims in the previous chapters. These seven tribes had done nothing, not even
            proposed the three men per tribe Joshua ends up ordering himself in verse 4. The slackness was a
            failure to start, not a failure to finish quickly.
          </p>
          <p>
            <strong>Why does the land need both a human survey, written in a book, and a lot cast before the
            LORD? Would either one alone not have been enough?</strong> What the text says: verses 8 and 9 have
            twenty one men walk the land and record it by cities in a book, and verse 10 has Joshua cast lots over
            the result. How this is read: Numbers 26
            already established this exact two part pattern, size set by counted population, specific location
            set by lot. A survey alone would leave room for a human hand to steer the best ground toward a
            favored tribe. A lot alone, with no survey, would have no fair divisions to choose between in the
            first place. The chapter needs both because each one guards against a different kind of unfairness.
          </p>
          <p>
            <strong>Does Jerusalem appearing in Benjamin&apos;s city list here contradict Joshua 15, which already
            connects Jerusalem to Judah?</strong> What the text says: Joshua 15:8 traces Judah&apos;s border along the side
            of Jebusi, which is Jerusalem, and 15:63 says Judah could not drive the Jebusites out of it. Joshua
            18:28 lists Jebusi, which is Jerusalem, among Benjamin&apos;s own fourteen cities. How this is read:
            the two accounts describe the same city sitting on a shared border rather than two different cities or
            a contradiction. Judges 1:21 later says plainly that it was Benjamin, not Judah, who failed to drive
            the Jebusites out of Jerusalem, confirming the city belonged on Benjamin&apos;s side of the line even
            though Judah&apos;s border also ran along it.
          </p>
          <p>
            <strong>Why does verse 7 repeat that the Levites have no inheritance, when that rule was already
            settled long before Joshua 18?</strong> What the text says: verse 7 restates that the Levites&apos;
            inheritance is the priesthood itself, grouped in the same sentence with the tribes who had already
            settled east of the Jordan. How this is read: the reminder lands at the exact moment seven tribes are
            about to receive land, the one moment someone might wonder why an entire tribe is missing from the
            count. Repeating it here closes that question before it can be asked, the same purpose
            Deuteronomy 12&apos;s instructions about one central place of worship already served for the Levites&apos; role.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 18
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 18:3</h3>
        <VerseQuote
          text="And Joshua said unto the children of Israel, How long are ye slack to go to possess the land, which the LORD God of your fathers hath given you?"
          reference="Joshua 18:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise already kept by God, still waiting on seven tribes to actually go collect it. The gap between
          given and claimed is the whole chapter in one sentence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 18:7</h3>
        <VerseQuote
          text="But the Levites have no part among you; for the priesthood of the LORD is their inheritance"
          reference="Joshua 18:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A reminder dropped into the exact moment land gets divided, so an entire tribe missing from the count
          reads as design, not neglect.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 18:10</h3>
        <VerseQuote
          text="And Joshua cast lots for them in Shiloh before the LORD: and there Joshua divided the land unto the children of Israel according to their divisions."
          reference="Joshua 18:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Human measuring and divine choosing, finished in the same verse. Neither replaces the other anywhere in
          this chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 18:28</h3>
        <VerseQuote
          text="And Zelah, Eleph, and Jebusi, which is Jerusalem, Gibeath, and Kirjath; fourteen cities with their villages."
          reference="Joshua 18:28"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same city Judah&apos;s border already touched, now counted among Benjamin&apos;s own towns, because
          the real line ran right between the two brothers.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 18
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel set up the tabernacle at Shiloh. Joshua then confronted seven tribes still without land, ordered
          a survey by twenty one men, and cast lots to divide their portions. The chapter closes with Benjamin&apos;s
          specific border and a list of its twenty six cities, ending at Jerusalem.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Joshua call Israel &quot;slack&quot; in Joshua 18:3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Seven tribes had taken no steps toward claiming land that God had already given them, while other
          tribes like Judah and Joseph&apos;s sons had already organized their own surveys and settled their
          borders. Joshua&apos;s question was aimed at their inaction, not at how long a fair division naturally takes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the tabernacle move to Shiloh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Shiloh sat centrally in the hill country of Canaan, reachable from every tribe&apos;s territory, which
          fit Deuteronomy 12&apos;s command for one chosen place of worship instead of many scattered ones. It
          remained Israel&apos;s central worship site for generations, including during Eli and Samuel&apos;s lifetimes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How were the seven remaining tribes&apos; lands divided?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Three men from each of the seven tribes, twenty one total, walked through the unclaimed land and wrote a
          description of it divided into seven parts. Joshua then cast lots before the LORD at Shiloh to decide
          which tribe received which part.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Levites receive no land in Joshua 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 18:7 says the priesthood itself was the Levites&apos; inheritance, a provision already
          established earlier in the law. The verse repeats that rule here specifically because this is the
          chapter where the other tribes&apos; land gets divided, closing off any question about why Levi is missing from the count.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Jerusalem listed under Benjamin&apos;s cities in Joshua 18:28?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jerusalem, called Jebusi here, sat right on the border shared by Judah and Benjamin. Joshua 15 already
          traced Judah&apos;s border running along the city, and Joshua 18:28 lists it among Benjamin&apos;s
          towns. Judges 1:21 later confirms it was Benjamin&apos;s responsibility to remove the Jebusites, and that they did not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Benjamin&apos;s territory positioned between Judah and Joseph?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 18:11 states plainly that Benjamin&apos;s lot came up between Judah and the house of Joseph. As
          the smallest and youngest of Jacob&apos;s sons, Benjamin received a narrow strip wedged between its two
          largest brothers, land that put it directly in the path of some of the most contested cities in Canaan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;cast lots&quot; mean in Joshua 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Casting lots was a method of decision that removed human choice from the outcome, understood as placing
          the result directly in God&apos;s hands. Numbers 26 had already set the principle that tribal portion
          size would be measured by population, while which specific land went to which tribe would be settled by
          lot rather than by any person&apos;s preference.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter mention Reuben, Gad, and half of Manasseh if they are not part of this division?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 18:7 names them to explain why only seven tribes, not nine, were still waiting for land. Those
          two and a half tribes had already received their inheritance east of the Jordan under Moses, before
          Israel ever crossed into Canaan, so they had no part in this round of lots.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the connection between Joshua 18 and Hannah in 1 Samuel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 18:1 is the first time Scripture names Shiloh as the place where the tabernacle came to rest.
          That same town, generations later, is where Hannah brought her son Samuel to serve under the priest Eli, making this quiet verse the origin of a site that matters for the rest of Israel&apos;s early history.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 18 is a chapter about land, but the real subject is what it takes to actually go get something you already have a right to.</p>
          <p>
            📌 <strong>Given is not the same as claimed.</strong> God had already decided the seven tribes&apos;
            inheritance long before this chapter opens. What was missing was not more promise. It was someone
            willing to walk the ground and bring back a report.
          </p>
          <p>
            📌 <strong>A fair outcome still needs both effort and trust.</strong> Twenty one men did the slow,
            physical work of measuring. The lot made the choice no person was allowed to make. Neither step
            replaced the other.
          </p>
          <p>
            📌 <strong>Small and squeezed is not the same as forgotten.</strong> Benjamin received the narrowest
            lot of any tribe mentioned here, wedged between two much larger brothers. It still received a real
            border, real cities, and a real place in the record.
          </p>
          <p>You probably are not waiting on a lot cast at Shiloh this week. But you likely have something already settled that you have simply not gone to walk yet.</p>
          <p>So here is the one thing this chapter actually asks of you.</p>
          <p>Stop waiting to be told to start, and go describe the ground in front of you, the way those twenty one men did before anyone cast a single lot.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
