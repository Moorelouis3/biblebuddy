import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-6-explained", {
  title: "Joshua 6 Explained: Six Silent Days and the Fall of Jericho",
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

export default function JoshuaSixExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-6-explained"
      title={<>📖 Joshua 6 Explained: Six Silent Days and the Fall of Jericho</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The walls are still standing. The gates are shut tight. And God hands Joshua a battle plan no general would ever choose.</p>
            <p>
              <strong>Joshua 6 explained</strong> is the chapter where Israel wins its first real fight in
              Canaan without anyone striking the wall itself. For six straight days the whole army walks a
              circle around Jericho in total silence. On the seventh day they walk it seven more times,
              shout once, and a fortified city falls flat before a single Israelite climbs over it.
            </p>
            <p>Maybe the plan God has you walking right now feels just as strange. Repetitive. Quiet. Nothing like the fight you were bracing for.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why would God tell an army to march in circles for a week instead of simply attacking?</li>
            <li>❓ Why did Joshua order total silence for six straight days?</li>
            <li>❓ Why was almost everything in Jericho destroyed except the gold, the silver, and one household?</li>
            <li>❓ What was the curse Joshua spoke over the ruins, and did it ever actually come true?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Jericho does not fall because Israel is strong. It falls because Israel keeps doing
              something that makes no military sense, for exactly as long as God says to keep doing it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter: the plan itself, the six silent days, the
              seventh day&apos;s seven laps and the shout, the things set apart for God alone, the promise
              finally kept to Rahab, and the curse Joshua speaks over what is left standing.
            </p>
            <p>Read slowly. This chapter has as much to say about obeying without proof as it does about the wall itself.</p>
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
            <ArticleLink href="/blog/joshua-5-explained">Joshua 5</ArticleLink> ended in the middle of a
            conversation. A stranger with a drawn sword met Joshua near Jericho, named himself only as
            captain of the host of the LORD, and told Joshua to take off his sandal because the ground he
            stood on was holy. The chapter cut off right there, before the captain said whatever he had
            actually come to say.
          </p>
          <p>
            Joshua 6 opens as the same scene continuing, not a new one starting. The very first verse
            describes Jericho sealed shut, and the LORD begins speaking immediately, the same voice Joshua
            had just fallen on his face in front of. Whatever the captain came to tell Joshua, this chapter
            is almost certainly it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 6 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Sealed City, and a Battle Already Decided (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a city bracing for the kind of siege it already knows how to survive.</p>
        </div>
        <VerseQuote
          text="Now Jericho was straitly shut up because of the children of Israel: none went out, and none came in."
          reference="Joshua 6:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Straitly</strong> means tightly, narrowly shut, not the modern word for honest. Every
            gate is closed. Jericho is doing exactly what a fortified city under threat is supposed to do.
          </p>
          <p>Then the LORD speaks, and the outcome is already decided before Israel takes a single step.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Joshua, See, I have given into thine hand Jericho, and the king thereof, and the mighty men of valour."
          reference="Joshua 6:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the tense.</strong> &quot;I have given&quot; is spoken before the walk begins,
            before the trumpets, before the shout. The LORD does not say He will give the city if the plan
            works. He says it is already done, and the plan is simply how that already settled fact plays
            out in time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Plan No General Would Choose (verses 3 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>What the LORD orders next has nothing to do with ramps, battering rams, or ladders.</p>
        </div>
        <VerseQuote
          text="And ye shall compass the city, all ye men of war, and go round about the city once. Thus shalt thou do six days. And seven priests shall bear before the ark seven trumpets of rams' horns: and the seventh day ye shall compass the city seven times, and the priests shall blow with the trumpets."
          reference="Joshua 6:3 and 4"
        />
        <VerseQuote
          text="And it shall come to pass, that when they make a long blast with the ram's horn, and when ye hear the sound of the trumpet, all the people shall shout with a great shout; and the wall of the city shall fall down flat, and the people shall ascend up every man straight before him."
          reference="Joshua 6:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Add it up and the whole army walks a complete circle around Jericho thirteen times before the
            wall ever moves. Once a day for six days, then seven times on the seventh day. Nothing about
            that schedule looks like a siege tactic. It looks like a test of whether Israel will keep walking
            with nothing to show for it yet.
          </p>
          <p>
            The trumpets are not war instruments either. &quot;Rams&apos; horns&quot; is the shofar, the
            same kind of horn used for announcements and sacred assemblies, not for rallying troops into
            combat. Priests carry it, walking in front of the ark, not soldiers leading a charge.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Six Days of Complete Silence (verses 6 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua passes the order down, and adds one detail the LORD never actually specified.</p>
        </div>
        <VerseQuote
          text="And Joshua had commanded the people, saying, Ye shall not shout, nor make any noise with your voice, neither shall any word proceed out of your mouth, until the day I bid you shout; then shall ye shout."
          reference="Joshua 6:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Picture this honestly.</strong> Thousands of people walk past a hostile, watching city
            every single day, and nobody is allowed to say one word. No chanting, no jeering at the enemy,
            no cheering each other on. Just footsteps and trumpets.
          </p>
          <p>The marching order itself is just as deliberate, repeated twice in the chapter almost word for word:</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🛡️ Armed men go first.</li>
          <li>🎺 Seven priests follow, blowing seven trumpets.</li>
          <li>📦 The ark of the LORD comes next.</li>
          <li>🚶 A rear guard closes the line behind it.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Every single day ends the same quiet way, with nothing visibly different about the wall:
          </p>
        </div>
        <VerseQuote
          text="And the second day they compassed the city once, and returned into the camp: so they did six days."
          reference="Joshua 6:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Six days of this, with the text spending barely one sentence per day, because nothing changes
            on the outside. Obedience with no visible result is still the whole assignment on days two
            through six.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Seventh Day, and the Shout That Ends the Siege (verses 15, 16, and 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The seventh day starts early, and it does not stop after one lap.</p>
        </div>
        <VerseQuote
          text="And it came to pass on the seventh day, that they rose early about the dawning of the day, and compassed the city after the same manner seven times: only on that day they compassed the city seven times."
          reference="Joshua 6:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The text repeats &quot;seven times&quot; inside the same verse, as if making sure nobody skims
            past how different this day is from the previous six. Then, finally, Joshua gives the order the
            whole nation has been waiting six days to hear.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass at the seventh time, when the priests blew with the trumpets, Joshua said unto the people, Shout; for the LORD hath given you the city."
          reference="Joshua 6:16"
        />
        <VerseQuote
          text="So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city."
          reference="Joshua 6:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joshua repeats the exact phrase from verse 2, word for word: the LORD has given you
            the city.</strong> Six days of silent walking did not earn that gift. It was already true before
            the first lap. The shout did not cause the wall to fall either, any more than the silence did.
            Both were simply the shape obedience took that week.
          </p>
          <p>
            The New Testament later gives its own one line explanation for what actually brought the wall
            down, and it is not engineering:
          </p>
        </div>
        <VerseQuote
          text="By faith the walls of Jericho fell down, after they were compassed about seven days."
          reference="Hebrews 11:30"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What Was Devoted to God, and the Promise Kept to Rahab (verses 17 to 19, 21, 22, 23, and 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the shout even happens, Joshua tells the people exactly what is off limits once the city falls.</p>
        </div>
        <VerseQuote
          text="And the city shall be accursed, even it, and all that are therein, to the LORD: only Rahab the harlot shall live, she and all that are with her in the house, because she hid the messengers that we sent."
          reference="Joshua 6:17"
        />
        <VerseQuote
          text="And ye, in any wise keep yourselves from the accursed thing, lest ye make yourselves accursed, when ye take of the accursed thing, and make the camp of Israel a curse, and trouble it. But all the silver, and gold, and vessels of brass and iron, are consecrated unto the LORD: they shall come into the treasury of the LORD."
          reference="Joshua 6:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Accursed&quot; here means devoted entirely to God, not available for any soldier to
            quietly pocket for himself. Jericho is the first city taken in Canaan, and nothing about this
            victory is allowed to become personal profit. The gold and silver go into the LORD&apos;s own
            treasury, not into anyone&apos;s tent.
          </p>
          <p>Then the city falls exactly as the plan said it would.</p>
        </div>
        <VerseQuote
          text="And they utterly destroyed all that was in the city, both man and woman, young and old, and ox, and sheep, and ass, with the edge of the sword."
          reference="Joshua 6:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>But one household in the city had already been promised something different, back when the walls were still fully standing.</p>
        </div>
        <VerseQuote
          text="And the young men that were spies went in, and brought out Rahab, and her father, and her mother, and her brethren, and all that she had; and they brought out all her kindred, and left them without the camp of Israel."
          reference="Joshua 6:22 and 23"
        />
        <VerseQuote
          text="And Joshua saved Rahab the harlot alive, and her father's household, and all that she had; and she dwelleth in Israel even unto this day; because she hid the messengers, which Joshua sent to spy out Jericho."
          reference="Joshua 6:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is <ArticleLink href="/blog/joshua-2-explained">the same oath sworn to Rahab
            back in Joshua 2</ArticleLink>, kept to the letter in the middle of total destruction.</strong>{" "}
            Nothing in the chapter suggests Israel was free to renegotiate once the fighting actually
            started. A promise made before the walls fell still held after they fell.
          </p>
          <p>
            <ArticleLink href="/blog/who-was-rahab">Rahab&apos;s story</ArticleLink> does not end with this
            chapter either. Hebrews and James both point back to this exact moment centuries later as proof
            of real faith, not just a convenient escape.
          </p>
        </div>
        <VerseQuote
          text="By faith the harlot Rahab perished not with them that believed not, when she had received the spies with peace."
          reference="Hebrews 11:31"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The City Burned, and a Curse Spoken Over the Ruins (verses 24, 26, and 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the devoted things are removed, nothing else in Jericho is left standing.</p>
        </div>
        <VerseQuote
          text="And they burnt the city with fire, and all that was therein: only the silver, and the gold, and the vessels of brass and of iron, they put into the treasury of the house of the LORD."
          reference="Joshua 6:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua closes the chapter with words that sound less like a battle report and more like a sentence meant to outlast him.</p>
        </div>
        <VerseQuote
          text="And Joshua adjured them at that time, saying, Cursed be the man before the LORD, that riseth up and buildeth this city Jericho: he shall lay the foundation thereof in his firstborn, and in his youngest son shall he set up the gates of it."
          reference="Joshua 6:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This curse is not forgotten by the rest of Scripture.</strong> Centuries later, 1
            Kings records it coming true in painful detail, naming the exact man and his exact sons.
          </p>
        </div>
        <VerseQuote
          text="In his days did Hiel the Bethelite build Jericho: he laid the foundation thereof in Abiram his firstborn, and set up the gates thereof in his youngest son Segub, according to the word of the LORD, which he spake by Joshua the son of Nun."
          reference="1 Kings 16:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Hundreds of years pass between Joshua speaking that curse and Hiel losing his sons
            to it.</strong> Scripture treats it as the same word still working, not an old threat that quietly
            expired.
          </p>
          <p>The chapter ends the way it began, crediting the LORD rather than Joshua for what happened.</p>
        </div>
        <VerseQuote text="So the LORD was with Joshua; and his fame was noised throughout all the country." reference="Joshua 6:27" />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 6 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did God command the total destruction of everyone in Jericho?</strong> What the text
            says: Joshua 6:21 states plainly that the city was utterly destroyed, man and woman, young and
            old, with no exception named besides Rahab&apos;s household. The chapter does not soften this or
            explain it in the moment. What the surrounding Scripture adds: God had told{" "}
            <ArticleLink href="/blog/genesis-15-explained">Abraham centuries earlier in Genesis 15</ArticleLink>{" "}
            that his descendants would not possess this land until &quot;the iniquity of the Amorites is not
            yet full,&quot; meaning this judgment was not sudden or impulsive, and{" "}
            <ArticleLink href="/blog/deuteronomy-7-explained">Deuteronomy 7</ArticleLink> had already laid out
            the command against these specific nations in the land, not against enemies generally. How
            Christians read it: some treat this as a singular act of judgment tied to one culture at one
            moment in redemptive history, never repeated as a pattern for ordinary warfare anywhere else in
            Scripture. Others point out that Jericho functioned as a fortified royal and military city, and
            that total conquest language describing a stronghold&apos;s population was common across the
            ancient world. The text itself does not fully explain why judgment fell exactly here, exactly
            then, only that it did not fall without warning.
          </p>
          <p>
            <strong>Why did silence matter for six whole days, when the LORD never actually commanded
            it?</strong> What the text says: Joshua 6:10 records the no talking order as something &quot;Joshua
            had commanded,&quot; separate from the marching plan the LORD gave in verses 3 through 5. What
            this likely means: the chapter never states a reason, but the effect is a test with nothing to
            measure for most of a week. No chanting to feel productive, no mockery of Jericho to feel brave,
            just obedience with zero evidence attached to it until the seventh day. Nothing about marching in
            silence made Jericho more or less likely to fall. It simply made the obedience harder to fake.
          </p>
          <p>
            <strong>Was it right to spare Rahab, given she had lied to her own king to protect the
            spies?</strong> What the text says: Joshua 6:17 and 6:25 tie her survival directly to one act,
            hiding the messengers, with no mention of weighing her past against anyone else&apos;s fate.
            How the New Testament reads it: Hebrews 11:31 credits her survival to faith, and James 2:25 calls
            the same act being justified by works, treating the hiding of the spies as the visible proof of
            what she already believed, not a loophole Israel happened to honor. The chapter never asks
            whether she deserved rescue more than anyone else inside those walls. It only records that a
            promise was made to her, and that promise held.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 6:20</h3>
        <VerseQuote
          text="So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city."
          reference="Joshua 6:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Thirteen silent laps around a fortified city end in one verse. The wall does not crumble slowly.
          It falls flat the instant the shout goes up.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 6:2</h3>
        <VerseQuote
          text="And the LORD said unto Joshua, See, I have given into thine hand Jericho, and the king thereof, and the mighty men of valour."
          reference="Joshua 6:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The outcome is announced before a single lap is walked. Everything that follows is the shape that
          already settled victory takes in time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 6:16</h3>
        <VerseQuote
          text="And it came to pass at the seventh time, when the priests blew with the trumpets, Joshua said unto the people, Shout; for the LORD hath given you the city."
          reference="Joshua 6:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Joshua repeats the LORD&apos;s own words from the start of the chapter back to the people, word for
          word, right before the one command they had been waiting six days to hear.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 6:25</h3>
        <VerseQuote
          text="And Joshua saved Rahab the harlot alive, and her father's household, and all that she had; and she dwelleth in Israel even unto this day; because she hid the messengers, which Joshua sent to spy out Jericho."
          reference="Joshua 6:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One promise, made before any of this happened, survives inside one of the harshest judgments in
          the Old Testament, kept exactly as sworn.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 6:26</h3>
        <VerseQuote
          text="And Joshua adjured them at that time, saying, Cursed be the man before the LORD, that riseth up and buildeth this city Jericho: he shall lay the foundation thereof in his firstborn, and in his youngest son shall he set up the gates of it."
          reference="Joshua 6:26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A sentence spoken over a smoking ruin that Scripture does not let anyone forget. 1 Kings 16:34
          records it landing on a real family, generations later.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Joshua 6 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6 records the fall of Jericho. Israel marches around the sealed city once a day for six
          days in complete silence, then seven times on the seventh day, shouts on command, and watches the
          wall fall flat so the city can be taken without a siege.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel march around Jericho for six days before fighting?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:3 and 4 give the exact instruction: once around the city each day for six days, then
          seven times on the seventh day. The text never explains the reasoning, only the command, and the
          result credited to faith rather than strategy in Hebrews 11:30.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the Israelites told to stay completely silent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:10 records Joshua commanding no shouting, no noise, and no words at all until the day he
          gave the signal. No reason is stated in the text, but it meant six days of visible obedience with
          nothing to show for it until the very end.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the walls of Jericho fall down?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:20 simply states that the wall fell down flat the moment the people shouted. Hebrews
          11:30 gives the New Testament&apos;s own explanation: it happened by faith, not by any military
          method described in the chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the fall of Jericho a miracle or something that can be explained naturally?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text presents it as a direct act of God tied to specific obedience, not a natural event that
          happened to coincide with the timing. Hebrews 11:30 credits faith, not chance, and nothing in
          Joshua 6 hints at a natural cause.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God command Israel to destroy everyone in Jericho?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:21 records the destruction without explaining it in the moment, but Genesis 15:16 shows
          this judgment was tied to centuries of warning, not a sudden decision. Christians read the
          severity of it differently, and the text itself leaves some of the why unanswered.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Rahab spared when the rest of Jericho was destroyed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:17 and 6:25 tie her survival to one act: hiding the Israelite spies back in Joshua 2.
          Hebrews 11:31 calls it faith, and James 2:25 calls it being justified by works, treating that one
          choice as proof of what she believed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that things in Jericho were &quot;accursed&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:17 to 19 use the word to mean devoted entirely to the LORD, not available for any soldier
          to keep for himself. The silver, gold, and metal vessels went into God&apos;s own treasury rather
          than anyone&apos;s personal possession.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the curse Joshua put on Jericho, and did it come true?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 6:26 records Joshua cursing anyone who rebuilds Jericho, saying it would cost that man his
          firstborn and his youngest son. 1 Kings 16:34 records this happening exactly as spoken, hundreds
          of years later, to a man named Hiel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does the fall of Jericho connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 11:30 and 31 both point back to this chapter as proof of real faith. The promise kept to
          Rahab traces directly to the oath sworn in Joshua 2, and the curse on Jericho is recorded coming
          true centuries later in 1 Kings 16:34.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 6 wins its only real battle before anyone draws a weapon against the wall.</p>
          <p>
            📌 <strong>Obedience came before any proof it would work.</strong> Six days of walking produced
            nothing visible. The seventh day simply finished what the LORD had already declared true on
            day one.
          </p>
          <p>
            📌 <strong>What is devoted to God is not quietly yours to keep.</strong> The gold and silver
            went into the LORD&apos;s own treasury the same day the rest of the city burned, with no
            exception made for a soldier who might have wanted some of it.
          </p>
          <p>
            📌 <strong>A promise sworn before the fighting still held after it.</strong> Rahab&apos;s rescue
            was not a last minute mercy. It was a debt Israel had already agreed to pay, collected in the
            middle of the loudest judgment in the chapter.
          </p>
          <p>
            You will not march around a city or hear a wall fall flat. But you will have seasons that ask
            for obedience with nothing to show for it yet, day after day, with no sign anything is working.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name the thing you are still silently walking around right now, with no visible result, and
            keep walking it one more day before you decide God has forgotten the plan.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
