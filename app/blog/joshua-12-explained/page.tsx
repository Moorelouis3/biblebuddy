import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-12-explained", {
  title: "Joshua 12 Explained: The List of Every King Israel Defeated",
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

export default function JoshuaTwelveExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-12-explained"
      title={<>📖 Joshua 12 Explained: The List of Every King Israel Defeated</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No battle happens in this chapter. No march, no siege, no sword drawn.</p>
            <p>
              <strong>Joshua 12 explained</strong> is the chapter that stops the whole story to take stock of it.
              Eleven chapters of fighting end, and before the book moves on to dividing up the land, it pauses to
              name every king who fell along the way. Two east of the Jordan, defeated by Moses. Thirty one west of
              it, defeated by Joshua.
            </p>
            <p>Maybe you have reached the end of a long season and felt the urge to just count what actually happened.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Who were Sihon and Og, and why does the book of Joshua stop to mention them again?</li>
            <li>❓ Why does this list name 31 kings when the earlier chapters only tell the story of a handful?</li>
            <li>❓ What happened to all the other kings this chapter never explains?</li>
            <li>❓ Why is Gibeon, a city at the center of two earlier chapters, missing from a list of defeated kings?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This chapter is Israel&apos;s own closing record, and it quietly reveals that most of the
              conquest never made it into the story at all.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: the two kings Moses defeated east of the
              Jordan, the borders of everything Joshua took to the west, the kings whose names you already know from
              earlier chapters, the kings this book never mentions anywhere else, and the final count that closes
              the military half of Joshua for good.
            </p>
            <p>Read slowly. A list can carry more weight than it looks like it should.</p>
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
            <ArticleLink href="/blog/joshua-11-explained">Joshua 11</ArticleLink> ended with the last organized
            resistance to Israel broken at the waters of Merom, Hazor burned, and one sentence that changed the shape
            of the whole book. The land rested from war.
          </p>
          <p>
            Joshua 12 picks up right there, but it does not tell another battle. It looks back over everything
            Israel and Moses together had already taken, from the far side of the Jordan to the hills of Judah, and
            writes down a final tally before the next section of Joshua turns to dividing the ground that tally
            represents.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 12 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Two Kings East of the Jordan: Sihon and Og (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by looking backward, past Joshua entirely, to victories Moses already won.</p>
        </div>
        <VerseQuote
          text="Now these are the kings of the land, which the children of Israel smote, and possessed their land on the other side Jordan toward the rising of the sun, from the river Arnon unto mount Hermon, and all the plain on the east:"
          reference="Joshua 12:1"
        />
        <VerseQuote
          text="Sihon king of the Amorites, who dwelt in Heshbon, and ruled from Aroer, which is upon the bank of the river Arnon, and from the middle of the river, and from half Gilead, even unto the river Jabbok, which is the border of the children of Ammon;"
          reference="Joshua 12:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Sihon&apos;s defeat belongs to an earlier book entirely. <ArticleLink href="/blog/numbers-21-explained">Numbers
            21</ArticleLink> records Israel destroying Sihon&apos;s kingdom on the way to Canaan, long before Joshua
            ever led anyone across the Jordan. Joshua 12 reaches back to include it anyway.
          </p>
          <p>Og gets the same treatment, with one detail added that the earlier account does not repeat here.</p>
        </div>
        <VerseQuote
          text="And the coast of Og king of Bashan, which was of the remnant of the giants, that dwelt at Ashtaroth and at Edrei, And reigned in mount Hermon, and in Salcah, and in all Bashan, unto the border of the Geshurites and the Maachathites, and half Gilead, the border of Sihon king of Heshbon."
          reference="Joshua 12:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Calling Og part of <strong>the remnant of the giants</strong> is not a passing detail. The same term
            describes the Anakim Joshua had just finished cutting off from Hebron and Debir in the chapter before
            this one. Og&apos;s defeat, told in full in <ArticleLink href="/blog/deuteronomy-3-explained">Deuteronomy
            3</ArticleLink>, was already proof that these giants could fall. Joshua&apos;s own campaign against the
            Anakim follows the same pattern Moses set first.
          </p>
        </div>
        <VerseQuote
          text="Them did Moses the servant of the LORD and the children of Israel smite: and Moses the servant of the LORD gave it for a possession unto the Reubenites, and the Gadites, and the half tribe of Manasseh."
          reference="Joshua 12:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who gets named as the one who smote these two kings. Moses, not Joshua.</strong> Joshua
            12 is careful to give credit where the victory actually happened, even though the man reading this list
            out loud, generations later, led none of it himself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Whole West, From Baalgad to Seir (verses 7 and 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Verse 7 switches sides of the river and switches leaders in the same breath.</p>
        </div>
        <VerseQuote
          text="And these are the kings of the country which Joshua and the children of Israel smote on this side Jordan on the west, from Baalgad in the valley of Lebanon even unto the mount Halak, that goeth up to Seir; which Joshua gave unto the tribes of Israel for a possession according to their divisions;"
          reference="Joshua 12:7"
        />
        <VerseQuote
          text="In the mountains, and in the valleys, and in the plains, and in the springs, and in the wilderness, and in the south country; the Hittites, the Amorites, and the Canaanites, the Perizzites, the Hivites, and the Jebusites:"
          reference="Joshua 12:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Six peoples, six kinds of land. The chapter is not describing one army in one terrain. It is
            describing every landscape Canaan had to offer, mountain, valley, plain, spring, wilderness, and south
            country, all of it now under one name on the deed.
          </p>
          <p>
            This is the same boundary language the book keeps returning to since its opening chapter, where God
            first told Joshua exactly how far this land would stretch.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Fifteen Kings You Already Met (verses 9 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the list itself begins, two names to a verse, almost like a roll call.</p>
        </div>
        <VerseQuote
          text="The king of Jericho, one; the king of Ai, which is beside Bethel, one; The king of Jerusalem, one; the king of Hebron, one;"
          reference="Joshua 12:9 and 10"
        />
        <VerseQuote
          text="The king of Madon, one; the king of Hazor, one;"
          reference="Joshua 12:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Read the names carefully and you find a whole earlier reading list folded into a few lines.{" "}
            <ArticleLink href="/blog/joshua-6-explained">Jericho</ArticleLink> and Ai open the conquest. Jerusalem,
            Hebron, Jarmuth, Lachish, and Eglon are the five kings who besieged Gibeon and ended up with their necks
            under Israel&apos;s captains&apos; feet. Libnah, Makkedah, and Debir fell in the same southern campaign.
            Horam king of Gezer died trying to send help to Lachish. Madon, Hazor, Shimron, and Achshaph were part of
            Jabin&apos;s coalition broken at the waters of Merom in the chapter right before this one.
          </p>
          <p>
            📌 <strong>Fifteen kings, and every one of them already has a story you could point to in Joshua 1
            through 11.</strong> This part of the list is not new information. It is a summary of chapters you have
            already read.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Sixteen Kings the Story Never Mentioned (verses 11 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The rest of the list is a different kind of information entirely.</p>
        </div>
        <VerseQuote
          text="The king of Dor in the coast of Dor, one; the king of the nations of Gilgal, one;"
          reference="Joshua 12:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Geder, Hormah, Arad, Adullam, Bethel, Tappuah, Hepher, Aphek, Lasharon, Taanach, Megiddo, Kedesh,
            Jokneam of Carmel, Dor, the nations of Gilgal, and Tirzah. Sixteen kings in that list, and not one of
            them gets a single verse of battle anywhere else in the entire book of Joshua.
          </p>
          <p>
            ⚠️ <strong>Sixteen out of 31 western kings are named here and nowhere else.</strong> Megiddo was one of
            the most important fortified cities in this period, well documented outside the Bible, which makes its
            complete absence from the narrative chapters even more striking. Real victories, never narrated. Joshua
            11:18 already warned the reader not to picture this conquest as one dramatic season. This list is the
            proof. Most of the fighting simply never made it onto the page.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Thirty One Kings, and the One City Missing From the List (verse 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes the way a ledger closes, with a total.</p>
        </div>
        <VerseQuote
          text="The king of Tirzah, one: all the kings thirty and one."
          reference="Joshua 12:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Thirty one kings west of the Jordan, plus Sihon and Og east of it, makes 33 kings named across
            this one chapter alone.</strong> That number is the chapter&apos;s whole argument in a single figure. This
            was not a handful of lucky wins. It was a complete, countable defeat of an entire region&apos;s
            leadership.
          </p>
          <p>
            One city is conspicuously absent from that count.{" "}
            <ArticleLink href="/blog/joshua-9-explained">Gibeon</ArticleLink> sits in the exact middle of the territory
            this list covers, and its king is nowhere on it. Joshua 11:19 already explained why. Gibeon made peace
            instead of making war, and this chapter&apos;s list only has room for kings who chose the battlefield.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 12 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does the book stop the story to give a list instead of moving straight to dividing the
            land?</strong> What the text says: verses 7 and 8 explicitly tie this list to the land Joshua is about
            to give the tribes for a possession. How this fits the chapter: a division of land only makes sense once
            the reader knows exactly what was won and from whom. The list functions as the closing record of one
            phase of the book, read before the deed to that same land is drawn up in the chapters that follow.
          </p>
          <p>
            <strong>Why are 19 of the 31 western kings never mentioned in any earlier chapter of Joshua?</strong>{" "}
            What the text says: Joshua 11:18 already states plainly that Joshua made war a long time with these
            kings, not in one short season. How this is read: the earlier chapters narrate a handful of battles in
            detail because they illustrate how God worked, not because they are a complete record. Joshua 12 is the
            complete record, and it shows the detailed chapters were always a sample, not the whole story.
          </p>
          <p>
            <strong>What does &quot;the king of the nations of Gilgal&quot; in verse 23 actually mean?</strong> What
            the text says: it is listed as its own distinct king, grouped with Dor on the coastal plain. How this is
            read: this does not appear to be the same Gilgal where Israel camped near the Jordan in earlier chapters.
            Bible scholars are not fully agreed on exactly which place or people this title refers to, and this
            article will not guess past what the text itself states.
          </p>
          <p>
            <strong>Why is Gibeon&apos;s king missing from a list that otherwise accounts for the whole region?</strong>{" "}
            What the text says: Joshua 11:19 states that no city made peace with Israel except Gibeon, and every
            other city was taken in battle. How this fits: Joshua 12 is a list of kings Israel defeated, not a map of
            every city in the land. Gibeon survived by treaty rather than conquest, so it was never going to appear
            on a list built entirely around battles fought and won.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 12:6</h3>
        <VerseQuote
          text="Them did Moses the servant of the LORD and the children of Israel smite: and Moses the servant of the LORD gave it for a possession unto the Reubenites, and the Gadites, and the half tribe of Manasseh."
          reference="Joshua 12:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter gives Moses full credit for Sihon and Og before Joshua&apos;s own victories are ever listed, a
          reminder that this conquest began a generation before Joshua led a single battle.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 12:7</h3>
        <VerseQuote
          text="And these are the kings of the country which Joshua and the children of Israel smote on this side Jordan on the west, from Baalgad in the valley of Lebanon even unto the mount Halak, that goeth up to Seir; which Joshua gave unto the tribes of Israel for a possession according to their divisions;"
          reference="Joshua 12:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that ties the whole chapter directly to what comes next, naming the exact land about to be
          divided among the tribes in the second half of the book.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 12:9</h3>
        <VerseQuote
          text="The king of Jericho, one; the king of Ai, which is beside Bethel, one;"
          reference="Joshua 12:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The list opens with the two cities that opened the conquest itself, anchoring 33 kings of victory to the
          exact place the whole story started.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 12:24</h3>
        <VerseQuote
          text="The king of Tirzah, one: all the kings thirty and one."
          reference="Joshua 12:24"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The final count of the chapter, and the number that proves this was a complete defeat of the region&apos;s
          leadership rather than a string of isolated wins.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 12?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter lists every king Israel defeated in the conquest so far. Two kings, Sihon and Og, were
          defeated by Moses east of the Jordan. Thirty one kings were defeated by Joshua west of it, for a total of
          33 named across the whole chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Sihon in Joshua 12?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sihon was the Amorite king of Heshbon, defeated by Moses and Israel years before Joshua ever crossed the
          Jordan. Numbers 21 tells the full story of his defeat, and Joshua 12:2 recalls it as part of the complete
          record of land taken.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Og king of Bashan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Og ruled Bashan and is described in verse 4 as part of the remnant of the giants. Deuteronomy 3 tells how
          Moses defeated him, and Joshua 12 names him alongside Sihon as the two kings whose land went to the
          Reubenites, Gadites, and half the tribe of Manasseh.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Joshua 12 list 31 kings on the west side of the Jordan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 24 states the total directly. The number functions as a closing tally for the entire military
          campaign Joshua led from chapter 1 onward, proving the scale of the victory in a single countable figure
          rather than a general claim.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the list in Joshua 12 match every battle told earlier in the book?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Only 15 of the 31 western kings can be matched to a battle told in detail earlier in Joshua. The other
          16 appear only here, which fits Joshua 11:18&apos;s own statement that the war lasted a long time, far
          longer than the handful of battles the book actually narrates.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Gibeon missing from the list of defeated kings?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gibeon is not on the list because it was never defeated. Joshua 9 records Gibeon making peace with Israel
          through a disguise, and Joshua 11:19 confirms it was the only city that avoided war entirely. Joshua 12
          lists kings Israel fought, not every city in the land.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the nations of Gilgal&quot; mean in Joshua 12:23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It names a king grouped with Dor on the coastal plain, separate from the Gilgal where Israel camped near
          the Jordan earlier in the book. The exact identity of this place is not settled among Bible scholars, and
          the text itself gives no further explanation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible include a chapter that is mostly a list?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the list itself is the point. It closes out everything Moses and Joshua accomplished before the
          book turns to dividing the land, and it proves the scale of the victory with specific names rather than a
          vague summary.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 12 reads like an accounting ledger, and that is exactly why it matters.</p>
          <p>
            📌 <strong>Most of what God does for you will never get its own chapter.</strong> Sixteen kings in this
            list never appear in a single narrated battle. The victories were still just as real as Jericho and Ai.
            They simply never made it onto the page in detail.
          </p>
          <p>
            📌 <strong>A complete record is worth more than a few good stories.</strong> Fifteen famous names would
            have made a fine highlight reel. Thirty three named kings is proof, not just a highlight reel.
          </p>
          <p>
            📌 <strong>What is missing from a list can say as much as what is on it.</strong> Gibeon is absent
            because it chose peace over war, and that absence is its own kind of testimony.
          </p>
          <p>
            You probably are not keeping a list of kings this week. But you likely have a long season behind you
            right now that you have never actually counted up.
          </p>
          <p>Here is the one thing this chapter actually asks of you.</p>
          <p>
            Take ten minutes today and write your own short list, not of battles, but of what God has already
            carried you through this year that you never stopped to count.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
