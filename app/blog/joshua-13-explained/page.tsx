import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-13-explained", {
  title: "Joshua 13 Explained: Still Very Much Land to Possess",
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

export default function JoshuaThirteenExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-13-explained"
      title={<>📖 Joshua 13 Explained: Still Very Much Land to Possess</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Joshua is old now. And the first thing God says to him in this chapter is not comfort.</p>
            <p>
              <strong>Joshua 13 explained</strong> is the chapter where the land gets divided up among the
              tribes, even though the conquest the last three chapters just finished describing was nowhere
              near finished itself. God hands an aging leader a map with real gaps still on it, and tells
              him to divide it by lot anyway.
            </p>
            <p>Maybe you have been handed a job that was supposed to already be done.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God remind an old man how much work is still left undone?</li>
            <li>❓ Why does this chapter openly admit that two whole peoples were never driven out?</li>
            <li>❓ Why do the Levites get written out of the land twice in the same chapter?</li>
            <li>❓ Why does a quiet list of borders suddenly mention the death of a sorcerer named Balaam?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Joshua 13 hands out land nobody has fully cleared yet, by lot instead of by
              conquest, because the promise is what guarantees it, not how much fighting has already
              happened.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: God&apos;s charge to an old Joshua,
              the recap of what Moses already won east of the Jordan, the one tribe that gets no land at
              all, and the specific territory handed to Reuben, Gad, and half of Manasseh.
            </p>
            <p>Watch how often this chapter admits what still has not happened, right in the middle of handing out the deed.</p>
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
            <ArticleLink href="/blog/joshua-12-explained">Joshua 12</ArticleLink> closed the military half of
            the book with a ledger: 33 kings named, defeated, and accounted for, two of them by Moses and
            thirty one by Joshua. It read like a finished project.
          </p>
          <p>
            Joshua 13 opens the second half of the book, the half about dividing the ground that ledger
            represents. But before a single tribe gets its share, God stops to say the project everyone just
            finished reading about is not actually finished at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 13 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Still Very Much Land to Possess (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with God naming exactly where Joshua stands in life.</p>
        </div>
        <VerseQuote
          text="Now Joshua was old and stricken in years; and the LORD said unto him, Thou art old and stricken in years, and there remaineth yet very much land to be possessed."
          reference="Joshua 13:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God says &quot;old and stricken in years&quot; twice in one verse, once as fact and
            once in His own voice to Joshua directly.</strong> This is not a rebuke. It is a plain statement
            of where Joshua is, right before telling him there is still real work left for someone else to
            finish.
          </p>
          <p>Verses 2 and 3 name exactly what is still outstanding.</p>
        </div>
        <VerseQuote
          text="This is the land that yet remaineth: all the borders of the Philistines, and all Geshuri, From Sihor, which is before Egypt, even unto the borders of Ekron northward, which is counted to the Canaanite: five lords of the Philistines; the Gazathites, and the Ashdothites, the Eshkalonites, the Gittites, and the Ekronites; also the Avites:"
          reference="Joshua 13:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Those five named cities, Gaza, Ashdod, Ashkelon, Gath, and Ekron, are the five Philistine
            cities that keep showing up for the rest of Israel&apos;s history, all the way through the
            stories of Samson and Goliath generations later. None of them have been touched by the conquest
            Israel just finished.
          </p>
          <p>Verses 4 through 6 keep adding to the list, coastal land in the north now included.</p>
        </div>
        <VerseQuote
          text="All the inhabitants of the hill country from Lebanon unto Misrephothmaim, and all the Sidonians, them will I drive out from before the children of Israel: only divide thou it by lot unto the Israelites for an inheritance, as I have commanded thee."
          reference="Joshua 13:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read that instruction carefully. God does not tell Joshua to go fight for this land
            first and divide it once it is won.</strong> He says divide it now, by lot, and He will drive the
            remaining people out later. The deed comes before the clearing. This is the same kind of promise
            Israel has been living on since <ArticleLink href="/blog/joshua-1-explained">Joshua 1</ArticleLink>,
            just now applied to ground nobody has even marched toward yet.
          </p>
        </div>
        <VerseQuote
          text="Now therefore divide this land for an inheritance unto the nine tribes, and the half tribe of Manasseh,"
          reference="Joshua 13:7"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. What Moses Already Won, and What Israel Still Didn&apos;t Finish (verses 8 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before dividing the land west of the Jordan, the chapter circles back to the two kings Moses
            already defeated east of it, Sihon and Og, the same two kings the previous chapter had just
            named as the opening entries on its own list.
          </p>
        </div>
        <VerseQuote
          text="And all the cities of Sihon king of the Amorites, which reigned in Heshbon, unto the border of the children of Ammon; And Gilead, and the border of the Geshurites and Maachathites, and all mount Hermon, and all Bashan unto Salcah;"
          reference="Joshua 13:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Sihon&apos;s defeat is told in full in{" "}
            <ArticleLink href="/blog/numbers-21-explained">Numbers 21</ArticleLink>, and Og&apos;s in
            Deuteronomy 3, both of them years before Joshua ever led a battle of his own. This recap is not
            new information. It is the foundation the rest of the chapter is about to build on.
          </p>
          <p>Then comes a sentence that does not fit the victorious tone of the chapter before this one.</p>
        </div>
        <VerseQuote
          text="Nevertheless the children of Israel expelled not the Geshurites, nor the Maachathites: but the Geshurites and the Maachathites dwell among the Israelites until this day."
          reference="Joshua 13:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the chapter stating its own failure out loud, in the plainest possible
            language.</strong> &quot;Nevertheless&quot; is doing real work in that sentence. Everything
            around it describes victory and inheritance. This one clause admits two named peoples simply
            stayed, right in the territory just handed to half the tribe of Manasseh.
          </p>
          <p>
            💡 This same region and these same two peoples resurface generations later. Bible background
            sources widely connect this Geshur with the Geshur ruled by Talmai, whose daughter Maacah
            becomes the mother of David&apos;s son Absalom. A people this chapter admits Israel never drove
            out are still there, still a kingdom, still intermarrying with Israel&apos;s own royal family,
            centuries after this verse was written.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Levi Gets No Map, Only the LORD (verse 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right in the middle of a chapter about borders, one tribe is named and then quietly set apart from the whole system.</p>
        </div>
        <VerseQuote
          text="Only unto the tribe of Levi he gave none inheritance; the sacrifices of the LORD God of Israel made by fire are their inheritance, as he said unto them."
          reference="Joshua 13:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every other tribe in this chapter gets a border. Levi gets a sentence about
            worship.</strong> The priestly tribe lives off the offerings brought to the LORD rather than off
            crops grown on tribal land, a pattern already set out before Israel ever crossed the Jordan. The
            chapter does not treat this as a loss. It states it as Levi&apos;s actual portion.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Reuben&apos;s Territory, and Balaam&apos;s Death Recalled (verses 15 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The detailed borders begin with Reuben, the firstborn of Jacob&apos;s sons, even though his tribe no longer leads anything in Israel.</p>
        </div>
        <VerseQuote
          text="And their coast was from Aroer, that is on the bank of the river Arnon, and the city that is in the midst of the river, and all the plain by Medeba; Heshbon, and all her cities that are in the plain; Dibon, and Bamothbaal, and Bethbaalmeon,"
          reference="Joshua 13:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Several of these city names, Heshbon and Dibon especially, were Sihon&apos;s own cities
            before Numbers 21. Reuben does not receive empty, undefined ground. It receives a kingdom that
            already had roads, walls, and a name before Israel ever took it.
          </p>
          <p>Then, almost in passing, the list adds a detail that reaches back further than Sihon&apos;s war.</p>
        </div>
        <VerseQuote
          text="And all the cities of the plain, and all the kingdom of Sihon king of the Amorites, which reigned in Heshbon, whom Moses smote with the princes of Midian, Evi, and Rekem, and Zur, and Hur, and Reba, which were dukes of Sihon, dwelling in the country."
          reference="Joshua 13:21"
        />
        <VerseQuote
          text="Balaam also the son of Beor, the soothsayer, did the children of Israel slay with the sword among them that were slain by them."
          reference="Joshua 13:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A border list suddenly names the man who tried to curse Israel for pay.</strong>{" "}
            <ArticleLink href="/blog/numbers-22-explained">Numbers 22</ArticleLink> tells how Balaam was
            hired to curse Israel and could only bless it instead. It was during the Midianite campaign
            described in <ArticleLink href="/blog/numbers-31-explained">Numbers 31</ArticleLink> that he was
            finally killed, fighting on the side of the very people who had hired him against Israel in the
            first place. Joshua 13 does not retell that story. It simply notes that his death belongs to the
            same ground now being handed to Reuben.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Gad&apos;s Territory (verses 24 to 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Gad&apos;s share sits north of Reuben&apos;s, stretching into Gilead.</p>
        </div>
        <VerseQuote
          text="And their coast was Jazer, and all the cities of Gilead, and half the land of the children of Ammon, unto Aroer that is before Rabbah;"
          reference="Joshua 13:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Rabbah later becomes the capital of Ammon, the same Ammon whose border Gad now shares.
            Reuben and Gad are not placed in some quiet corner of the map. They sit on the exposed eastern
            edge, next to nations Israel has not fought and will keep dealing with for generations.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Half the Tribe of Manasseh (verses 29 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The third and last territory east of the Jordan goes to half of one tribe, split because the other half will settle west of the river.</p>
        </div>
        <VerseQuote
          text="And their coast was from Mahanaim, all Bashan, all the kingdom of Og king of Bashan, and all the towns of Jair, which are in Bashan, threescore cities:"
          reference="Joshua 13:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Threescore is sixty. One family within Manasseh ends up holding sixty towns in Bashan, the same
            region just named in verse 12 as part of the territory of Og, the giant king Moses already
            struck down. The chapter keeps circling back to the same two defeated kings from three different
            angles, because almost every acre east of the Jordan traces back to one of them.
          </p>
        </div>
        <VerseQuote
          text="These are the countries which Moses did distribute for inheritance in the plains of Moab, on the other side Jordan, by Jericho, eastward."
          reference="Joshua 13:32"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Chapter Closes Exactly Where It Opened: Levi Again (verse 33)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The very last verse of the chapter returns to the one tribe that never got a border.</p>
        </div>
        <VerseQuote
          text="But unto the tribe of Levi Moses gave not any inheritance: the LORD God of Israel was their inheritance, as he said unto them."
          reference="Joshua 13:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Levi is the only tribe whose inheritance gets stated twice, once in verse 14 and
            once again right here, in two separate places in the chapter.</strong> Reuben, Gad, and
            Manasseh each get one block of rivers and cities, described once and then left behind. Levi
            gets no geography at all, just the same single claim restated in its own words at both the
            start and the end: the LORD Himself is what they hold.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 13 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does &quot;very much land yet to be possessed&quot; in verse 1 contradict
            &quot;the land rested from war&quot; from the chapter before this one?</strong> What the text
            says: <ArticleLink href="/blog/joshua-11-explained">Joshua 11:23</ArticleLink> closes the
            organized military campaign Joshua personally led. Joshua 13:1 then names territory, Philistine
            cities and the Sidonian coast, that campaign never once marched toward. How this fits together:
            the two statements describe different things. One closes a finished stage of leadership. The
            other opens the next stage, where land still outside Israel&apos;s reach gets assigned by
            promise before it is ever taken by force.
          </p>
          <p>
            <strong>Why does the chapter openly admit Israel never drove out the Geshurites and the
            Maachathites?</strong> What the text says: verse 13 states it plainly, with no softening and no
            explanation offered. How this is read: the book of Joshua elsewhere credits Israel with
            obedience in strong language, so this one honest admission stands out. It is not hidden or
            excused. It is simply recorded, the same way a ledger records an unpaid debt alongside the
            paid ones.
          </p>
          <p>
            <strong>Why does the tribe of Levi receive no land at all?</strong> What the text says: verses 14
            and 33 both state the same reason, that the LORD Himself, through the offerings brought to Him,
            is Levi&apos;s portion instead of ground. How Christians read it: many see this as pointing
            toward a larger principle carried into the New Testament, that nearness to God Himself can be a
            real inheritance in its own right, not merely the absence of one.
          </p>
          <p>
            <strong>Why does a chapter about tribal borders stop to mention Balaam&apos;s death?</strong>{" "}
            What the text says: verse 22 places it inside the list of what happened to Sihon&apos;s allies,
            not as its own story. How this fits: the detail ties the ground Reuben is about to receive to
            events already fully told in Numbers, reminding the reader that this land carries a history
            longer than the conquest alone.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 13:1</h3>
        <VerseQuote
          text="Now Joshua was old and stricken in years; and the LORD said unto him, Thou art old and stricken in years, and there remaineth yet very much land to be possessed."
          reference="Joshua 13:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God&apos;s opening word to an aging Joshua, naming his age and the unfinished work in the same
          breath, without treating either as a problem to be hidden.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 13:6</h3>
        <VerseQuote
          text="All the inhabitants of the hill country from Lebanon unto Misrephothmaim, and all the Sidonians, them will I drive out from before the children of Israel: only divide thou it by lot unto the Israelites for an inheritance, as I have commanded thee."
          reference="Joshua 13:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The deed is handed out before the land is cleared, because the promise behind it, not the fighting
          already done, is what makes the inheritance real.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 13:14</h3>
        <VerseQuote
          text="Only unto the tribe of Levi he gave none inheritance; the sacrifices of the LORD God of Israel made by fire are their inheritance, as he said unto them."
          reference="Joshua 13:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first of two verses that give Levi no map at all, only a relationship to the altar itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 13:22</h3>
        <VerseQuote
          text="Balaam also the son of Beor, the soothsayer, did the children of Israel slay with the sword among them that were slain by them."
          reference="Joshua 13:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A one line reminder, inside a list of borders, that the man hired to curse Israel ended up dying
          among the very enemies who hired him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 13:33</h3>
        <VerseQuote
          text="But unto the tribe of Levi Moses gave not any inheritance: the LORD God of Israel was their inheritance, as he said unto them."
          reference="Joshua 13:33"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s closing sentence, restating the same claim verse 14 already made and leaving
          Levi the only tribe whose inheritance is stated twice, in two separate parts of the chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 13?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God tells an aging Joshua that much land, including Philistine territory and the Sidonian coast,
          still remains unconquered. He instructs Joshua to divide the land by lot anyway, then the chapter
          recaps the territory Moses already won east of the Jordan and assigns it to Reuben, Gad, and half
          the tribe of Manasseh, while the tribe of Levi receives no land at all.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God tell Joshua there was still land to possess if he was already old?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 13:1 states Joshua&apos;s age as plain fact, not as an excuse to stop. The instruction that
          follows is not for Joshua to personally finish the remaining conquest himself, but to divide the
          whole land, taken and untaken, among the tribes who will finish the work in the generations after
          him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does &quot;land yet to be possessed&quot; fit with Joshua 11 saying the land rested from war?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 11:23 closes the organized military campaign Joshua led across the center of Canaan. Joshua
          13:1 then names territory that campaign never engaged at all, Philistine cities and the northern
          coast. The rest describes one finished stage of leadership, not the complete absence of any
          remaining enemy anywhere in the land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Israel drive out the Geshurites and Maachathites?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 13:13 states this plainly without giving a reason. The two peoples remained in the land
          Manasseh had just been given, and this same Geshur is widely connected by Bible background sources
          to the kingdom later ruled by Talmai, father of Maacah and grandfather of David&apos;s son Absalom.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What land did the tribe of Reuben receive?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Reuben received the plain around the river Arnon and cities including Heshbon and Dibon, territory
          that had belonged to Sihon king of the Amorites before Numbers 21 records his defeat.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What land did the tribe of Gad receive?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gad received Gilead and the cities around it, including Jazer, bordering half the land of Ammon
          near its capital Rabbah, according to Joshua 13:24 and 25.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the tribe of Levi not receive a land inheritance?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 13:14 and 33 both give the same reason: the LORD Himself, through the offerings brought to
          Him, was Levi&apos;s portion instead of territory. The tribe set apart for priestly service lived
          by that arrangement rather than by farmland.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Joshua 13 mention Balaam&apos;s death?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 22 notes that Balaam died among the Midianite leaders Israel defeated, a death told in full
          in Numbers 31. Joshua 13 includes it because that same campaign and that same ground is now part
          of Reuben&apos;s inheritance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the land actually divided by casting lots?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 13:6 instructs Joshua to divide the land by lot, and later chapters in Joshua describe this
          happening at Shiloh. The method put the outcome outside of Joshua&apos;s own choice, letting each
          tribe&apos;s specific territory be decided rather than assigned by human preference.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 13 is a chapter of borders and lists, and underneath them it is surprisingly honest about what is not finished.</p>
          <p>
            📌 <strong>An unfinished task is not automatically a failed one.</strong> God tells an old man
            exactly how much work remains, then hands the next step to an entire nation instead of expecting
            one aging leader to close every gap himself.
          </p>
          <p>
            📌 <strong>The text records its own shortcomings without hiding them.</strong> The Geshurites and
            Maachathites staying in the land is not explained away. It is simply stated, right next to
            every tribe&apos;s successful inheritance.
          </p>
          <p>
            📌 <strong>Not every inheritance looks like territory.</strong> Levi&apos;s portion is stated
            twice, in two separate parts of this chapter, and neither time does it come with a border.
            Nearness to God Himself is treated as a real possession, not a consolation for missing one.
          </p>
          <p>
            You probably are not dividing tribal land this week. But you likely have an unfinished task
            handed to you right now that someone else will have to help carry forward.
          </p>
          <p>Here is the one thing this chapter actually asks of you.</p>
          <p>
            Name what is still undone as plainly as this chapter does, instead of pretending the job is
            finished just because the hardest part already is.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
