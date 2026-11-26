import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("2-samuel-5-explained", {
  title: "2 Samuel 5 Explained: David Takes the Throne and Jerusalem",
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

export default function TwoSamuelFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="2-samuel-5-explained"
      title={<>📖 2 Samuel 5 Explained: David Takes the Throne and Jerusalem</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two kings are dead. The throne David was promised years ago finally has no one else standing in front of it.</p>
            <p>
              <strong>2 Samuel 5 explained</strong> is the chapter where every tribe in Israel finally comes to David at once,
              where he takes a city nobody else had ever managed to take, and where the Philistines attack him twice in a row
              and get a different answer from God each time.
            </p>
            <p>Maybe you have waited years for something, and then watched it arrive all at once instead of gradually.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does all Israel suddenly crown David, when Judah alone crowned him years earlier?</li>
            <li>❓ What do the Jebusites mean by taunting David with &quot;the blind and the lame&quot;?</li>
            <li>❓ Why does David keep taking more wives after God already warned a king not to?</li>
            <li>❓ Why does God tell David to fight the exact same enemy two completely different ways?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>David becomes king over all Israel, takes Jerusalem, and wins two wars in this chapter, and he still
              asks God&apos;s permission before every move he makes.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the covenant all Israel makes with David, the numbers
              behind his reign, the capture of the city that becomes his capital for the rest of his life, the help a foreign
              king sends him, and the two battles that close the chapter.
            </p>
            <p>A chapter this short covers more ground than almost any other chapter in David&apos;s story so far.</p>
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
            <ArticleLink href="/blog/2-samuel-4-explained">2 Samuel 4</ArticleLink> ended with the last adult claimant to
            Saul&apos;s throne dead, murdered in his own bed by two of his own captains hoping for a reward. David executed
            them for it and buried Ishbosheth&apos;s head beside Abner&apos;s, the same general whose death one chapter
            earlier had already started the collapse of Saul&apos;s whole house.
          </p>
          <p>
            For seven and a half years David had worn a crown over one tribe while a rival wore one over the rest of the
            nation. Both rivals are gone now, Abner to Joab&apos;s private grudge and Ishbosheth to two captains chasing a
            payout. Nothing stands between David and the whole kingdom except whether the rest of Israel actually wants him.
            2 Samuel 5 explained opens with that question answered.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 2 Samuel 5 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. All Israel Comes to Hebron (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This time nobody has to send for them. The whole nation travels to David.</p>
        </div>
        <VerseQuote
          text="Then came all the tribes of Israel to David unto Hebron, and spake, saying, Behold, we are thy bone and thy flesh."
          reference="2 Samuel 5:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;We are thy bone and thy flesh&quot; is family language, not political flattery.</strong> The
            tribes are not negotiating a deal with a stranger. They are telling David he already belongs to them by blood,
            the same way Laban once used the phrase for Jacob. They go on to give the actual case for making him king.
          </p>
        </div>
        <VerseQuote
          text="Also in time past, when Saul was king over us, thou wast he that leddest out and broughtest in Israel: and the LORD said to thee, Thou shalt feed my people Israel, and thou shalt be a captain over Israel."
          reference="2 Samuel 5:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Their reasoning has two parts. David already led Israel&apos;s armies in battle even while Saul still wore the
            crown, and the LORD had already said this would happen. They are not crowning a stranger on a hunch. They are
            catching up to a promise everyone already half knew.
          </p>
        </div>
        <VerseQuote
          text="So all the elders of Israel came to the king to Hebron; and king David made a league with them in Hebron before the LORD: and they anointed David king over Israel."
          reference="2 Samuel 5:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the third time oil touches David&apos;s head.</strong>{" "}
            <ArticleLink href="/blog/1-samuel-16-explained">Samuel anointed him privately as a boy</ArticleLink> in front of
            his own family, Judah anointed him publicly over one tribe in{" "}
            <ArticleLink href="/blog/2-samuel-2-explained">2 Samuel 2</ArticleLink>, and now the elders of every tribe anoint
            him again, this time over the whole nation. Each anointing matches how much of what God promised had actually
            come true by that point.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Numbers Behind a Forty Year Reign (verses 4 and 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right after the anointing, the narrator pauses to give the whole reign in two verses.</p>
        </div>
        <VerseQuote
          text="David was thirty years old when he began to reign, and he reigned forty years. In Hebron he reigned over Judah seven years and six months: and in Jerusalem he reigned thirty and three years over all Israel and Judah."
          reference="2 Samuel 5:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Seven years and six months in Hebron, plus thirty three years in Jerusalem, lands just past forty, which the
            text simply rounds down to a whole number the way ages are usually counted in this period. David spends the
            second half of his life as king over a united nation, more than four times as long as he spent waiting for it
            as king over Judah alone.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Capturing Jerusalem From the Jebusites (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A newly crowned king needs a capital, and David goes after a city that had defied every Israelite army since{" "}
            <ArticleLink href="/blog/judges-1-explained">Judges 1</ArticleLink> first recorded that Benjamin could not drive
            the Jebusites out of it.
          </p>
        </div>
        <VerseQuote
          text="And the king and his men went to Jerusalem unto the Jebusites, the inhabitants of the land: which spake unto David, saying, Except thou take away the blind and the lame, thou shalt not come in hither: thinking, David cannot come in hither."
          reference="2 Samuel 5:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The Jebusites are not describing their own soldiers as weak. They are mocking David, confident that their
            walls are strong enough that they could defend the city with nothing but the blind and the lame manning them
            and still keep him out. It is a taunt built on how safe they believe they are.
          </p>
          <p>David answers the taunt by taking the city anyway.</p>
        </div>
        <VerseQuote
          text="Nevertheless David took the strong hold of Zion: the same is the city of David."
          reference="2 Samuel 5:7"
        />
        <VerseQuote
          text="And David said on that day, Whosoever getteth up to the gutter, and smiteth the Jebusites, and the lame and the blind, that are hated of David's soul, he shall be chief and captain. Wherefore they said, The blind and the lame shall not come into the house."
          reference="2 Samuel 5:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 David offers command of his army to whoever gets up through the gutter first, almost certainly a water shaft
            or tunnel into the stronghold rather than a straightforward gate. 1 Chronicles 11 names the man who took him up on
            it.
          </p>
        </div>
        <VerseQuote
          text="And David said, Whosoever smiteth the Jebusites first shall be chief and captain. So Joab the son of Zeruiah went first up, and was chief."
          reference="1 Chronicles 11:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joab, the same commander who killed Abner over a private blood debt in{" "}
            <ArticleLink href="/blog/2-samuel-3-explained">2 Samuel 3</ArticleLink>, earns his place as David&apos;s chief
            captain here by being first through the gutter, not by anything done in the civil war. Once the city falls,
            David renames it and starts building.
          </p>
        </div>
        <VerseQuote
          text="So David dwelt in the fort, and called it the city of David. And David built round about from Millo and inward."
          reference="2 Samuel 5:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Jerusalem belongs to no tribe.</strong> It sits almost exactly on the border between Judah and
            Benjamin, land that had stayed foreign ground for hundreds of years. Making it his own city, rather than ruling
            from Judah&apos;s own territory or Benjamin&apos;s, gives David a capital that belongs equally to every tribe
            instead of favoring the one he already came from.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Hiram&apos;s Help and David&apos;s Growing House (verses 10 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With a capital taken, the chapter moves quickly through everything that follows from it.</p>
        </div>
        <VerseQuote
          text="And David went on, and grew great, and the LORD God of hosts was with him."
          reference="2 Samuel 5:10"
        />
        <VerseQuote
          text="And Hiram king of Tyre sent messengers to David, and cedar trees, and carpenters, and masons: and they built David an house."
          reference="2 Samuel 5:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Tyre was a wealthy coastal city to the north, known across the ancient world for its cedar and its skilled
            builders. Hiram sending his own craftsmen to build a house for Israel&apos;s king is a foreign ruler choosing to
            ally himself with David rather than treat him as a threat, a relationship that continues decades later when
            Hiram helps David&apos;s son build the temple.
          </p>
        </div>
        <VerseQuote
          text="And David perceived that the LORD had established him king over Israel, and that he had exalted his kingdom for his people Israel's sake."
          reference="2 Samuel 5:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>David reads a cedar house as proof of something spiritual, not just proof that he is finally
            successful.</strong> He credits the LORD for the kingdom itself, and ties the whole thing back to Israel&apos;s
            good rather than his own.
          </p>
          <p>The very next verse undercuts the clean picture that verse just painted.</p>
        </div>
        <VerseQuote
          text="And David took him more concubines and wives out of Jerusalem, after he was come from Hebron: and there were yet sons and daughters born to David."
          reference="2 Samuel 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Nothing in this verse is presented as sin, and the text keeps moving without a single word of warning or
            rebuke attached to it. It simply records what David did, the same flat way it records the cedar house, and lets
            the reader carry the weight of it forward.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Named Sons Born in Jerusalem (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter slows down just long enough to name the children that growing household produced.</p>
        </div>
        <VerseQuote
          text="And these be the names of those that were born unto him in Jerusalem; Shammuah, and Shobab, and Nathan, and Solomon, Ibhar also, and Elishua, and Nepheg, and Japhia, And Elishama, and Eliada, and Eliphalet."
          reference="2 Samuel 5:14 to 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>One name on this list quietly outweighs every battle in the rest of the chapter.</strong> Solomon,
            the son who will build the temple and inherit the throne, is born in Jerusalem alongside ten brothers, with
            nothing in the text yet to mark him as different from any of them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Philistines Attack Twice, and God Answers Two Different Ways (verses 17 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A king over a united Israel is a bigger threat than a king over Judah alone, and the Philistines notice immediately.</p>
        </div>
        <VerseQuote
          text="But when the Philistines heard that they had anointed David king over Israel, all the Philistines came up to seek David; and David heard of it, and went down to the hold. The Philistines also came and spread themselves in the valley of Rephaim."
          reference="2 Samuel 5:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before doing anything else, David asks the same question he asked years earlier at Hebron.</p>
        </div>
        <VerseQuote
          text="And David enquired of the LORD, saying, Shall I go up to the Philistines? wilt thou deliver them into mine hand? And the LORD said unto David, Go up: for I will doubtless deliver the Philistines into thine hand."
          reference="2 Samuel 5:19"
        />
        <VerseQuote
          text="And David came to Baalperazim, and David smote them there, and said, The LORD hath broken forth upon mine enemies before me, as the breach of waters. Therefore he called the name of that place Baalperazim."
          reference="2 Samuel 5:20"
        />
        <VerseQuote
          text="And there they left their images, and David and his men burned them."
          reference="2 Samuel 5:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Baalperazim means something close to &quot;the place of breaking through.&quot; David names it for what the
            victory felt like, a wall of water breaking loose, and then destroys the idols the Philistines left behind
            rather than keeping them as spoil, the opposite of what Israel will later do when it treats captured gods as
            trophies instead of threats.
          </p>
          <p>The Philistines regroup in the same valley, and this time David does not assume the last plan still applies.</p>
        </div>
        <VerseQuote
          text="And the Philistines came up yet again, and spread themselves in the valley of Rephaim. And when David enquired of the LORD, he said, Thou shalt not go up; but fetch a compass behind them, and come upon them over against the mulberry trees."
          reference="2 Samuel 5:22 and 23"
        />
        <VerseQuote
          text="And let it be, when thou hearest the sound of a going in the tops of the mulberry trees, that then thou shalt bestir thyself: for then shall the LORD go out before thee, to smite the host of the Philistines."
          reference="2 Samuel 5:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God gives David the opposite instruction from the win that just worked.</strong> Instead of a direct
            advance, David circles around behind the Philistines and waits for a sound moving through the treetops, a sign
            the text never explains beyond calling it the LORD going out ahead of the army. David waits for the sign instead
            of charging in on his own timing.
          </p>
        </div>
        <VerseQuote
          text="And David did so, as the LORD had commanded him; and smote the Philistines from Geba until thou come to Gazer."
          reference="2 Samuel 5:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ &quot;And David did so&quot; closes the chapter on obedience, not improvisation. The same enemy, the same
            valley, and a plan David does not get to reuse. What worked the first time is not treated as a formula for the
            second.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 2 Samuel 5 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What does &quot;the blind and the lame&quot; actually mean in verses 6 and 8?</strong> What the text
            says: the Jebusites use the phrase first, as a boast that their defenses are strong enough to hold even if only
            the blind and the lame guarded them, and David&apos;s own words in verse 8 echo it back at them. How this is
            read: most readers take both uses as pointed insults traded between David and a defeated enemy, not a statement
            about disabled people in general. The closing line, &quot;the blind and the lame shall not come into the
            house,&quot; is widely read as the narrator&apos;s own note explaining where the saying survived afterward, as a
            proverb tied to this one captured city.
          </p>
          <p>
            <strong>Does David multiplying wives in verse 13 break God&apos;s own law for a king?</strong> What the text
            says: verse 13 records David taking more concubines and wives without comment, while Deuteronomy 17:17 commands
            that Israel&apos;s king &quot;shall not multiply wives to himself, that his heart turn not away.&quot; How this
            is read: the text does not call it sin outright here, but it does not excuse it either. It simply places the
            fact beside everything else David is doing right in this chapter, and later chapters of his story show exactly
            the kind of trouble marriage after marriage eventually brings into his household.
          </p>
          <p>
            <strong>Did David conquer Jerusalem by force, or by a trick entry through the gutter?</strong> What the text
            says: verse 8 and 1 Chronicles 11:6 both describe the city falling once a man gets up through the gutter, the
            water shaft running into the stronghold, rather than through a frontal assault on its gates. How this is read:
            this fits how a heavily fortified hilltop city, confident enough to taunt its attacker, was actually most
            vulnerable, not at its walls but at the one unguarded opening built to supply its own water.
          </p>
          <p>
            <strong>Why does God tell David to fight the same enemy two opposite ways in the same chapter?</strong> What
            the text says: verse 19 tells David to go up directly against the Philistines at Baalperazim, and verse 23 tells
            him not to go up at all the second time, but to circle around behind them instead. How this is read: the text
            gives no reason beyond the fact that David asked both times instead of assuming the first plan would work twice.
            The lesson most readers draw is not about the geography of either battle, but about what asking first,
            every time, actually protects David from.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 2 Samuel 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Samuel 5:3</h3>
        <VerseQuote
          text="So all the elders of Israel came to the king to Hebron; and king David made a league with them in Hebron before the LORD: and they anointed David king over Israel."
          reference="2 Samuel 5:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The third and final anointing of David, this time by every tribe together, closing a promise that had been coming
          true one piece at a time for years.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Samuel 5:7</h3>
        <VerseQuote text="Nevertheless David took the strong hold of Zion: the same is the city of David." reference="2 Samuel 5:7" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A city no Israelite army had ever taken becomes the city David is remembered by, the single word &quot;Zion&quot;
          that later fills the Psalms and the prophets, starting right here.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 5:10</h3>
        <VerseQuote text="And David went on, and grew great, and the LORD God of hosts was with him." reference="2 Samuel 5:10" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A short verse that ties David&apos;s growing power directly to God&apos;s presence rather than to his own
          strength or strategy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Samuel 5:19</h3>
        <VerseQuote
          text="And David enquired of the LORD, saying, Shall I go up to the Philistines? wilt thou deliver them into mine hand? And the LORD said unto David, Go up: for I will doubtless deliver the Philistines into thine hand."
          reference="2 Samuel 5:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          David asking before acting, even as a seasoned king with the whole nation now behind him, the same habit he built
          back when he had nothing but a crown over one tribe.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 2 Samuel 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 2 Samuel 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          All the tribes of Israel come to David at Hebron and anoint him king over the whole nation. He captures Jerusalem
          from the Jebusites and makes it his capital, receives help from Hiram king of Tyre to build a house, has more
          children, and defeats the Philistines in two separate battles after asking God for direction each time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did it take so long for all Israel to crown David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Abner had installed Saul&apos;s son Ishbosheth as a rival king over the rest of the nation, and the two sides spent
          years in a slow civil war. Only after both Abner and Ishbosheth were dead, recorded in the two chapters right
          before this one, did the other tribes come to David directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did &quot;we are thy bone and thy flesh&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a way of claiming close kinship, the same language Laban once used for Jacob in Genesis. The tribes are
          telling David he already belongs to Israel by blood, not negotiating with him as an outsider.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Jerusalem so hard to capture before David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Jebusites held a strong natural stronghold on Mount Zion that no tribe of Israel had managed to take since the
          conquest under Joshua. Its defenders were confident enough to mock David in verse 6, believing their position
          could not be broken.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the blind and the lame&quot; mean in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Jebusites use it first as a boast about how strong their defenses were. David echoes the same phrase back at
          them once he takes the city, and the text notes it became a saying afterward. It is an insult traded in victory and
          defeat, not a statement about disability in general.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did David actually get into the city?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Through a gutter, almost certainly the water shaft that supplied the stronghold, rather than through its gates.
          David offered command of his army to whoever climbed it first, and 1 Chronicles 11:6 names Joab as the man who did.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Hiram king of Tyre?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A foreign king ruling the wealthy coastal city of Tyre, known for its cedar and skilled builders. He sent
          craftsmen and materials to build David a house, beginning an alliance that continues decades later when Hiram
          helps David&apos;s son Solomon build the temple.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter list the names of David&apos;s sons?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          To put Solomon on record early, long before anyone in the story knows he will become the next king. Verse 14 names
          him among ten brothers born in Jerusalem, with nothing yet marking him as different from the rest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God give David two different battle plans against the same enemy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the military reasoning behind either plan. What it shows clearly is that David asked
          before both battles instead of assuming the first victory&apos;s strategy would work again, and received a different
          answer each time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 2 Samuel 5 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jerusalem, taken for the first time in this chapter, becomes the city of God&apos;s temple, the center of Israel&apos;s
          worship for the rest of the Old Testament, and the city where Jesus is crucified and rises again centuries later.
          Solomon, named here as one son among many, becomes the king who builds that temple.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>2 Samuel 5 moves faster than almost any chapter before it, and still never loses the habit that got David here.</p>
          <p>
            📌 <strong>A promise can take years to arrive and still feel sudden when it finally does.</strong> Every tribe
            comes to David in the same chapter, after years of a war neither side alone could end.
          </p>
          <p>
            📌 <strong>Success is not proof that every choice inside it was right.</strong> David takes a capital no one else
            could take and builds a house he credits to God, in the very same chapter that quietly records him taking more
            wives than God had already told a king not to.
          </p>
          <p>
            📌 <strong>What worked once is not a formula for next time.</strong> David wins the first battle head on and
            still asks God again before the second, and gets told to do the opposite.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Before you repeat whatever worked for you last time, ask again, the way David did twice in the same valley, and
            let the answer change your plan if it needs to.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
