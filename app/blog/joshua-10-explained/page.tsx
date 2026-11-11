import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-10-explained", {
  title: "Joshua 10 Explained: The Day the Sun Stood Still",
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

export default function JoshuaTenExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-10-explained"
      title={<>📖 Joshua 10 Explained: The Day the Sun Stood Still</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Five kings make one decision, and it drags Israel into a war it never went looking for.</p>
            <p>
              <strong>Joshua 10 explained</strong> is the chapter where the peace treaty from the chapter
              before this one stops being a piece of paper and becomes a battle. Gibeon made peace with
              Israel. Five Amorite kings decide that peace is exactly why Gibeon has to be destroyed, and
              Israel has to choose whether a promise it made carelessly is still worth marching all night
              to keep.
            </p>
            <p>Maybe you have made a commitment that turned out to cost far more than you expected.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Israel risk its own army defending a city it tricked its way into protecting?</li>
            <li>❓ What actually happened when the sun &quot;stood still&quot;?</li>
            <li>❓ Why does the text say hailstones killed more men than Israel&apos;s own swords did?</li>
            <li>❓ Why does Joshua have his captains put their feet on the necks of five captured kings?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Israel keeps a promise that costs it an all night march and a battle it did not
              choose, and the chapter credits the whole outcome to God, not to Israel&apos;s own
              strength.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: the coalition of kings forming
              against Gibeon, Israel&apos;s night march to save the city it swore to protect, the hailstones
              and the long day, the five kings found hiding in a cave, and the southern campaign that
              follows, city after city.
            </p>
            <p>Watch how much of this chapter turns on a promise Israel almost regretted making.</p>
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
            <ArticleLink href="/blog/joshua-9-explained">Joshua 9</ArticleLink> ended with Gibeon tricking
            Israel into an oath of peace, then getting caught, then getting sentenced to permanent labor
            at the altar instead of destruction. Israel kept the oath because it had been sworn in the
            LORD&apos;s name, even though the princes never defended the wisdom of making it in the first
            place.
          </p>
          <p>
            Chapter 10 opens with the first real cost of that decision. A treaty that looked finished in
            chapter 9 turns out to have just started a war Israel never asked for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 10 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Five Kings Unite Because of a Peace They Cannot Accept (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Word of Gibeon&apos;s treaty travels to Jerusalem, and one king reacts fast.</p>
        </div>
        <VerseQuote
          text="Now it came to pass, when Adonizedec king of Jerusalem had heard how Joshua had taken Ai, and had utterly destroyed it; as he had done to Jericho and her king, so he had done to Ai and her king; and how the inhabitants of Gibeon had made peace with Israel, and were among them;"
          reference="Joshua 10:1"
        />
        <VerseQuote
          text="That they feared greatly, because Gibeon was a great city, as one of the royal cities, and because it was greater than Ai, and all the men thereof were mighty."
          reference="Joshua 10:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Adonizedec is not afraid of Israel alone. He is afraid of what Israel and Gibeon now are
            together. Gibeon was bigger and stronger than Ai, the city{" "}
            <ArticleLink href="/blog/joshua-8-explained">Israel had already destroyed in Joshua 8</ArticleLink>.
            A major city switching sides without a fight is a bigger threat to the region than another
            battlefield loss.
          </p>
          <p>So Adonizedec does not attack alone. He builds a coalition.</p>
        </div>
        <VerseQuote
          text="Wherefore Adonizedec king of Jerusalem sent unto Hoham king of Hebron, and unto Piram king of Jarmuth, and unto Japhia king of Lachish, and unto Debir king of Eglon, saying, Come up unto me, and help me, that we may smite Gibeon: for it hath made peace with Joshua and with the children of Israel."
          reference="Joshua 10:3 and 4"
        />
        <VerseQuote
          text="Therefore the five kings of the Amorites, the king of Jerusalem, the king of Hebron, the king of Jarmuth, the king of Lachish, the king of Eglon, gathered themselves together, and went up, they and all their hosts, and encamped before Gibeon, and made war against it."
          reference="Joshua 10:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The target of this war is not Israel. It is Gibeon, the very city Israel just swore
            an oath to protect.</strong> Five kings besiege one city because that city chose peace with
            Israel over fighting alongside its neighbors. The oath from Joshua 9 is about to be tested in a
            way nobody at Gilgal saw coming.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Gibeon Calls In the Promise, and God Says Fear Them Not (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Under siege, Gibeon does the only thing its treaty allows it to do.</p>
        </div>
        <VerseQuote
          text="And the men of Gibeon sent unto Joshua to the camp to Gilgal, saying, Slack not thy hand from thy servants; come up to us quickly, and save us, and help us: for all the kings of the Amorites that dwell in the mountains are gathered together against us."
          reference="Joshua 10:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Gibeon calls itself Israel&apos;s servant and asks for exactly what the oath promised: rescue.
            Israel could have let this siege run its course and lost nothing by treaty law written anywhere
            except its own sworn word. Instead, Joshua moves immediately.
          </p>
        </div>
        <VerseQuote
          text="So Joshua ascended from Gilgal, he, and all the people of war with him, and all the mighty men of valour."
          reference="Joshua 10:7"
        />
        <VerseQuote
          text="And the LORD said unto Joshua, Fear them not: for I have delivered them into thine hand; there shall not a man of them stand before thee."
          reference="Joshua 10:8"
        />
        <VerseQuote
          text="Joshua therefore came unto them suddenly, and went up from Gilgal all night."
          reference="Joshua 10:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Five kings and their armies are a far bigger force than Ai ever was, and God still
            opens with the same two words Joshua needed before Ai.</strong> &quot;Fear them not&quot; comes
            before a single sword is drawn, the same way God opened{" "}
            <ArticleLink href="/blog/joshua-1-explained">Joshua&apos;s commission in Joshua 1</ArticleLink>{" "}
            with the command to be strong and of good courage. The size of the threat changes. The word
            Joshua is given before facing it does not.
          </p>
          <p>
            💡 Gilgal to Gibeon is a real distance through rough hill country, not a short walk. Marching an
            entire army that far overnight, then fighting a battle the same day, is the kind of detail the
            text states plainly without making a show of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The LORD Fights With Hailstones (verses 10 and 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The battle itself gets two verses, and the credit in them belongs to God, not Israel&apos;s weapons.</p>
        </div>
        <VerseQuote
          text="And the LORD discomfited them before Israel, and slew them with a great slaughter at Gibeon, and chased them along the way that goeth up to Bethhoron, and smote them to Azekah, and unto Makkedah."
          reference="Joshua 10:10"
        />
        <VerseQuote
          text="And it came to pass, as they fled from before Israel, and were in the going down to Bethhoron, that the LORD cast down great stones from heaven upon them unto Azekah, and they died: they were more which died with hailstones than they whom the children of Israel slew with the sword."
          reference="Joshua 10:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read that last line carefully. More enemy soldiers die from hailstones than from
            Israelite swords.</strong> The text does not say Israel&apos;s army was weak. It says the battle
            that mattered most, measured by the body count, was not the one Israel&apos;s own hands fought.
          </p>
          <p>
            Bethhoron, Azekah, and Makkedah mark a chase of several miles, downhill terrain where a routed
            army with nowhere to regroup becomes easy to run down. The geography itself works against the
            five kings once their lines break.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Day the Sun Stood Still (verses 12 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>In the middle of the chase, Joshua says something out loud that the whole nation hears him say.</p>
        </div>
        <VerseQuote
          text="Then spake Joshua to the LORD in the day when the LORD delivered up the Amorites before the children of Israel, and he said in the sight of Israel, Sun, stand thou still upon Gibeon; and thou, Moon, in the valley of Ajalon."
          reference="Joshua 10:12"
        />
        <VerseQuote
          text="And the sun stood still, and the moon stayed, until the people had avenged themselves upon their enemies. Is not this written in the book of Jasher? So the sun stood still in the midst of heaven, and hasted not to go down about a whole day."
          reference="Joshua 10:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The <strong>book of Jasher</strong> is quoted here and once more in 2 Samuel 1:18, but it is
            not part of Scripture itself and has not survived. The writer of Joshua treats it as an existing
            record people of that time could check, the way a modern writer might point to a known
            document rather than ask readers to take a claim on faith alone.
          </p>
          <p>Verse 14 states plainly how the chapter wants this moment understood.</p>
        </div>
        <VerseQuote
          text="And there was no day like that before it or after it, that the LORD hearkened unto the voice of a man: for the LORD fought for Israel."
          reference="Joshua 10:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter calls this day unique on purpose.</strong> It does not present an extended
            day as a normal or repeatable event. It presents it as the one time God answered a request like
            this, framed around the LORD fighting for Israel rather than around Joshua controlling the sky.
          </p>
        </div>
        <VerseQuote
          text="And Joshua returned, and all Israel with him, unto the camp to Gilgal."
          reference="Joshua 10:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 15 reads almost like an ending, Israel marching home to Gilgal. The chapter is not over.
            Five kings are still missing, and the text immediately picks the thread back up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Five Kings in a Cave, and Feet on Their Necks (verses 16 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>While the chase was still underway, the five kings behind this entire war had already run out of options.</p>
        </div>
        <VerseQuote
          text="But these five kings fled, and hid themselves in a cave at Makkedah."
          reference="Joshua 10:16"
        />
        <VerseQuote
          text="And Joshua said, Roll great stones upon the mouth of the cave, and set men by it for to keep them: And stay ye not, but pursue after your enemies, and smite the hindmost of them; suffer them not to enter into their cities: for the LORD your God hath delivered them into your hand."
          reference="Joshua 10:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Joshua does not stop the whole army to deal with five trapped men right away. He seals the
            cave, posts a guard, and keeps the larger army chasing the fleeing soldiers so none of them reach
            safety behind city walls. The kings can wait. The window to finish the retreat cannot.
          </p>
        </div>
        <VerseQuote
          text="And all the people returned to the camp to Joshua at Makkedah in peace: none moved his tongue against any of the children of Israel."
          reference="Joshua 10:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Compare this to the murmuring that broke out against the princes in Joshua 9.</strong>{" "}
            There, the congregation complained openly about the Gibeonite treaty. Here, after an all night
            march and a brutal chase, nobody has a single word of complaint. The same promise that caused
            grumbling one chapter earlier is the reason this entire army is alive and victorious now.
          </p>
          <p>Only then does Joshua deal with the five kings.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when they brought out those kings unto Joshua, that Joshua called for all the men of Israel, and said unto the captains of the men of war which went with him, Come near, put your feet upon the necks of these kings. And they came near, and put their feet upon the necks of them."
          reference="Joshua 10:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A foot on the neck is a picture, not torture. It is a visual Israel&apos;s captains could
            physically feel and every soldier watching could see: the men who built this entire war lying
            flat under the feet of the army they tried to destroy. Joshua explains the point out loud before
            anyone misses it.
          </p>
        </div>
        <VerseQuote
          text="And Joshua said unto them, Fear not, nor be dismayed, be strong and of good courage: for thus shall the LORD do to all your enemies against whom ye fight."
          reference="Joshua 10:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the exact command Joshua himself received back in{" "}
            <ArticleLink href="/blog/joshua-1-explained">Joshua 1</ArticleLink>, now spoken to his own
            captains over five conquered kings.</strong> The word that steadied Joshua at the very start of
            the book is the same word he now hands down to the next generation of leaders standing with him.
          </p>
          <p>The kings are then put to death and returned to the same cave that had hidden them.</p>
        </div>
        <VerseQuote
          text="And it came to pass at the time of the going down of the sun, that Joshua commanded, and they took them down off the trees, and cast them into the cave wherein they had been hid, and laid great stones in the cave's mouth, which remain until this very day."
          reference="Joshua 10:27"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Six Cities Fall in the South (verses 28 to 43)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The rest of the chapter reads almost like a list, and that is the point. City after city falls
            to the same pattern.
          </p>
        </div>
        <VerseQuote
          text="And that day Joshua took Makkedah, and smote it with the edge of the sword, and the king thereof he utterly destroyed, them, and all the souls that were therein; he let none remain: and he did to the king of Makkedah as he did unto the king of Jericho."
          reference="Joshua 10:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Makkedah falls first, the same day. Then Libnah, then Lachish, where Horam king of Gezer brings
            a relief force that is defeated without saving the city it came to help. Then Eglon, then
            Hebron, then Debir.
          </p>
        </div>
        <VerseQuote
          text="So Joshua smote all the country of the hills, and of the south, and of the vale, and of the springs, and all their kings: he left none remaining, but utterly destroyed all that breathed, as the LORD God of Israel commanded."
          reference="Joshua 10:40"
        />
        <VerseQuote
          text="And all these kings and their land did Joshua take at one time, because the LORD God of Israel fought for Israel."
          reference="Joshua 10:42"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Six named cities fall in this stretch: Makkedah, Libnah, Lachish, Eglon, Hebron, and
            Debir.</strong> Verse 40 ties all of it back to a single source, &quot;as the LORD God of Israel
            commanded,&quot; the same way{" "}
            <ArticleLink href="/blog/joshua-8-explained">the plunder rules at Ai</ArticleLink>{" "}
            were stated as a direct command rather than Joshua&apos;s own strategy. The chapter closes the
            same way it opened the battle: crediting God, not Israel&apos;s army, for what happened.
          </p>
        </div>
        <VerseQuote
          text="And Joshua returned, and all Israel with him, unto the camp to Gilgal."
          reference="Joshua 10:43"
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 10 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did the sun literally stop moving across the sky?</strong> What the text says: verse 13
            states the sun &quot;hasted not to go down about a whole day&quot; and cites the book of Jasher
            as its source. How Christians read it: some take this as a literal, miraculous extension of
            daylight, a direct answer to Joshua&apos;s request. Others read it as poetic battle language,
            common in ancient victory accounts, describing an unusually decisive day rather than a change in
            the earth&apos;s motion. The chapter itself calls the day unmatched either way, and does not
            resolve the mechanism for the reader.
          </p>
          <p>
            <strong>Why did hailstones kill more men than Israel&apos;s own swords did?</strong> What the
            text says: verse 11 states this directly, without elaborating on why. How this fits the chapter:
            the detail keeps the credit for the victory from settling on Israel&apos;s weapons or numbers.
            The chase, the terrain, and the storm are all described as working against the fleeing army
            before Israel&apos;s soldiers ever caught up to most of them.
          </p>
          <p>
            <strong>Why does the text say Joshua &quot;utterly destroyed all that breathed&quot; across so
            many cities?</strong> What the text says: verse 40 states this plainly and ties it to a specific
            command, &quot;as the LORD God of Israel commanded.&quot; How Christians read it: this falls
            under the same time bound judgment on specific Canaanite cities already discussed in connection
            with Jericho and Ai, not a general rule for how Israel was to treat conquered peoples elsewhere.
            This chapter does not soften that language, and neither does this article.
          </p>
          <p>
            <strong>What did putting feet on the kings&apos; necks actually accomplish?</strong> What the
            text says: verse 24 shows Joshua commanding it, then explaining its meaning out loud in verse 25
            as a picture of what the LORD will do to all of Israel&apos;s enemies. How this is read: the act
            is instructional rather than simply vengeful, aimed at the watching captains and soldiers as much
            as at the five defeated kings themselves.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 10:8</h3>
        <VerseQuote
          text="And the LORD said unto Joshua, Fear them not: for I have delivered them into thine hand; there shall not a man of them stand before thee."
          reference="Joshua 10:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Spoken before the biggest coalition of kings Israel has faced in the conquest so far. The size of
          the threat grows. The word Joshua receives before facing it stays exactly the same.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 10:13</h3>
        <VerseQuote
          text="And the sun stood still, and the moon stayed, until the people had avenged themselves upon their enemies. Is not this written in the book of Jasher? So the sun stood still in the midst of heaven, and hasted not to go down about a whole day."
          reference="Joshua 10:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the most debated verses in the Old Testament, naming a now lost historical record as its
          own source for what happened.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 10:14</h3>
        <VerseQuote
          text="And there was no day like that before it or after it, that the LORD hearkened unto the voice of a man: for the LORD fought for Israel."
          reference="Joshua 10:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s own verdict on everything that just happened: unmatched, and credited entirely
          to God answering a man rather than to Israel&apos;s army.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 10:25</h3>
        <VerseQuote
          text="And Joshua said unto them, Fear not, nor be dismayed, be strong and of good courage: for thus shall the LORD do to all your enemies against whom ye fight."
          reference="Joshua 10:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same command Joshua was given at the start of the book, now passed down by Joshua himself to
          the next generation of leaders standing over five defeated kings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 10:42</h3>
        <VerseQuote
          text="And all these kings and their land did Joshua take at one time, because the LORD God of Israel fought for Israel."
          reference="Joshua 10:42"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s closing summary of an entire southern campaign, naming the same cause behind the
          hailstones, the long day, and every city that fell after it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Five Amorite kings attack Gibeon for making peace with Israel, so Israel marches all night to
          defend the city it swore to protect. God sends hailstones that kill more men than Israel&apos;s
          swords, extends the daylight at Joshua&apos;s request, and Israel then captures and executes the
          five kings and conquers six cities across southern Canaan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the sun really stand still in Joshua 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text in verses 12 and 13 states that the sun did not go down for about a whole day, citing
          the book of Jasher. Christians read this both as a literal miracle and as ancient poetic battle
          language, and the chapter itself does not explain the mechanism, only the result.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the book of Jasher?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a historical record mentioned in Joshua 10:13 and again in 2 Samuel 1:18. It has not
          survived and is not part of Scripture. The writer of Joshua cites it the way a modern writer
          might point to a known document, as an outside source readers of that time could check.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel fight to defend Gibeon after being tricked by them?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          <ArticleLink href="/blog/joshua-9-explained">Joshua 9</ArticleLink> records Israel swearing an
          oath in the LORD&apos;s name to protect Gibeon, even after discovering the Gibeonites had lied to
          get it. Joshua 10:6 and 7 show Israel honoring that oath at real military cost rather than
          abandoning a city it had already agreed to defend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did hailstones kill more enemies than Israel&apos;s swords?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 10:11 states this plainly without explaining the reason behind it. The detail keeps the
          credit for the victory on God rather than on the size or skill of Israel&apos;s army, matching
          verse 14&apos;s statement that the LORD fought for Israel that day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the five kings hide in a cave?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 16 says they fled there once their armies broke under the hailstones and the chase. Joshua
          sealed the cave with stones and posted guards rather than stopping the pursuit of the fleeing
          army, dealing with the kings only after the larger battle was finished.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did it mean for Joshua&apos;s captains to put their feet on the kings&apos; necks?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 10:24 and 25 show this as a visible picture of total defeat, explained by Joshua himself as
          a sign of what the LORD would do to all of Israel&apos;s enemies. It was a lesson aimed at the
          watching soldiers as much as a judgment on the five kings.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many cities did Joshua conquer in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Six are named directly: Makkedah, Libnah, Lachish, Eglon, Hebron, and Debir. Verse 33 also
          describes Joshua defeating a relief force sent by the king of Gezer to help Lachish, though the
          text does not say Gezer itself was taken at this time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the king of Eglon the same as the city of Debir?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and the overlap is easy to miss. Verse 3 names &quot;Debir king of Eglon,&quot; a person ruling
          a city called Eglon. Verses 38 and 39 later describe Joshua conquering a separate city also named
          Debir. Same name, two different places in the chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the lesson of Joshua 10 for today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That keeping a costly promise can still turn out to be exactly where God shows up most clearly.
          Israel marched all night to defend a city it only reluctantly agreed to protect, and the chapter
          credits everything that followed, the hailstones, the long day, and the victory, to God rather
          than to Israel&apos;s own effort.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 10 is a long chapter, and almost none of the credit in it belongs to Israel&apos;s own strength.</p>
          <p>
            📌 <strong>A promise kept at real cost can still turn out right.</strong> Israel defended a city
            it only agreed to protect by mistake, and that costly choice is exactly what put Israel in the
            middle of the LORD&apos;s clearest victory in the whole conquest so far.
          </p>
          <p>
            📌 <strong>&quot;Fear them not&quot; does not shrink to match the size of the threat.</strong>{" "}
            Five kings and their combined armies are a far bigger danger than Ai, and God opens the battle
            with the exact same command Joshua was given before facing a single city.
          </p>
          <p>
            📌 <strong>The chapter keeps pointing away from the people who did the fighting.</strong>{" "}
            Hailstones, not swords. An extended day, not a longer battle plan. A command from God, not a
            strategy session. Verse 14 says it outright: the LORD fought for Israel.
          </p>
          <p>
            You probably will not march all night to keep a promise this week. But you likely have a
            commitment right now that is costing you more than you expected when you made it.
          </p>
          <p>Here is the one thing this chapter actually asks of you.</p>
          <p>
            Keep the promise anyway, the way Israel did, and watch for whose strength actually shows up to
            carry the weight of it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
