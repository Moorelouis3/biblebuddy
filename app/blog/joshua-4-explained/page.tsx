import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-4-explained", {
  title: "Joshua 4 Explained: Twelve Stones From the Jordan",
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

export default function JoshuaFourExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-4-explained"
      title={<>📖 Joshua 4 Explained: Twelve Stones From the Jordan</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The water is still standing in a heap. Israel is barely on the other side. And God&apos;s first instruction is not about Jericho.</p>
            <p>
              <strong>Joshua 4 explained</strong> is the chapter where Israel stops, mid miracle, to build
              something that will outlast the miracle itself. Twelve men carry twelve stones out of the
              Jordan riverbed before the water ever returns to its banks, so that a question asked years
              later, by a child who never saw any of this, will have an answer.
            </p>
            <p>Maybe you have wondered why God bothers with monuments at all.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why twelve stones, and why did they have to come from the middle of the river?</li>
            <li>❓ Is there one memorial in this chapter or two?</li>
            <li>❓ What does it mean that the LORD, not Joshua, magnified Joshua?</li>
            <li>❓ Why does the chapter care so much about what children will ask someday?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>God does not just want Israel to remember this day. He wants Israel&apos;s
              children, and their children, to ask about it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter: the command to the twelve men, the two
              separate sets of stones, the armed tribes finishing the crossing, the river closing back up
              behind them, and the answer Israel is told to give for generations.
            </p>
            <p>Read slowly. This chapter is about what you build to outlast your own memory.</p>
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
            <ArticleLink href="/blog/joshua-3-explained">Joshua 3</ArticleLink> ended with the entire
            nation walking across the Jordan on dry ground while the water upstream stood up like a wall.
            The priests carrying the ark were already standing firm in the middle of the riverbed, and
            every Israelite had just passed by them on dry ground.
          </p>
          <p>
            One detail from that chapter was left hanging on purpose. Right in the middle of the buildup,
            before the water even moved, Joshua had quietly set apart twelve men, one from each tribe, and
            never said why. Joshua 4 is where that unfinished instruction finally gets explained.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 4 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Command to the Twelve Men (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter opens the moment the last Israelite steps onto dry ground on the western side.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, when all the people were clean passed over Jordan, that the LORD spake unto Joshua, saying, Take you twelve men out of the people, out of every tribe a man, And command ye them, saying, Take you hence out of the midst of Jordan, out of the place where the priests' feet stood firm, twelve stones, and ye shall carry them over with you, and leave them in the lodging place, where ye shall lodge this night."
          reference="Joshua 4:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God speaks before the water has even started to return.</strong> The twelve men are
            not sent back for safety or convenience after the fact. They go in while the riverbed is still
            dry, to take stones from one exact spot, the ground where the priests themselves had stood.
          </p>
        </div>
        <VerseQuote
          text="Then Joshua called the twelve men, whom he had prepared of the children of Israel, out of every tribe a man: And Joshua said unto them, Pass over before the ark of the LORD your God into the midst of Jordan, and take you up every man of you a stone upon his shoulder, according unto the number of the tribes of the children of Israel."
          reference="Joshua 4:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One man, one tribe, one stone, one shoulder. The instruction is deliberately simple enough
            that nobody could claim later that only part of Israel made this crossing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A Question Built on Purpose (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God tells Joshua exactly what the stones are for, and it is not decoration.</p>
        </div>
        <VerseQuote
          text="That this may be a sign among you, that when your children ask their fathers in time to come, saying, What mean ye by these stones? Then ye shall answer them, That the waters of Jordan were cut off before the ark of the covenant of the LORD; when it passed over Jordan, the waters of Jordan were cut off: and these stones shall be for a memorial unto the children of Israel for ever."
          reference="Joshua 4:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Notice the chapter does not aim the memorial at Israel today. It aims it at a child
            not born yet, asking a question nobody in this chapter will be around to answer in person.</strong>{" "}
            The stones exist to make sure the story outlives the eyewitnesses.
          </p>
          <p>
            That same pattern of a child&apos;s question answered with a rehearsed reply runs through the
            law Israel already carried, including the instructions about{" "}
            <ArticleLink href="/blog/exodus-12-explained">the Passover</ArticleLink> and{" "}
            <ArticleLink href="/blog/deuteronomy-6-explained">teaching the commandments to your children</ArticleLink>.
            Joshua 4 is not inventing a new habit. It is applying one Israel already knew.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel did so as Joshua commanded, and took up twelve stones out of the midst of Jordan, as the LORD spake unto Joshua, according to the number of the tribes of the children of Israel, and carried them over with them unto the place where they lodged, and laid them down there."
          reference="Joshua 4:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the chapter adds a second detail, easy to skim past, that most readers miss on a first read.</p>
        </div>
        <VerseQuote
          text="And Joshua set up twelve stones in the midst of Jordan, in the place where the feet of the priests which bare the ark of the covenant stood: and they are there unto this day."
          reference="Joshua 4:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is a second set of twelve stones, not the same ones mentioned again.</strong>{" "}
            One set gets carried out of the river to where Israel camps that night. Another set is set up
            right in the riverbed itself, in the exact spot where the priests stood holding the ark. Two
            monuments, two locations, one memory.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Armed Tribes Keep an Old Promise (verses 10 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>While the stones are being gathered, the priests are still standing where they have been since the crossing began.</p>
        </div>
        <VerseQuote
          text="For the priests which bare the ark stood in the midst of Jordan, until everything was finished that the LORD commanded Joshua to speak unto the people, according to all that Moses commanded Joshua: and the people hasted and passed over."
          reference="Joshua 4:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Hasted&quot; is worth noticing. Nobody lingers in the riverbed to admire the miracle.
            Israel moves with urgency, the way you move when you know the ground under you is only
            standing open by the will of God, not by nature.
          </p>
        </div>
        <VerseQuote
          text="And the children of Reuben, and the children of Gad, and half the tribe of Manasseh, passed over armed before the children of Israel, as Moses spake unto them: About forty thousand prepared for war passed over before the LORD unto battle, to the plains of Jericho."
          reference="Joshua 4:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Forty thousand armed men from two and a half tribes cross at the front of the
            column, exactly as Moses had required of them.</strong> Years earlier, in{" "}
            <ArticleLink href="/blog/numbers-32-explained">Numbers 32</ArticleLink>, Reuben, Gad, and half
            of Manasseh asked to settle east of the Jordan instead of in Canaan itself. Moses agreed, on
            one condition: they would still cross armed and fight alongside their brothers until the land
            was taken. Moses never lived to see it kept. Joshua 4 is the proof that the deal still held.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The LORD Magnifies Joshua (verse 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One short verse closes the day with a result nobody had to announce.</p>
        </div>
        <VerseQuote
          text="On that day the LORD magnified Joshua in the sight of all Israel; and they feared him, as they feared Moses, all the days of his life."
          reference="Joshua 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The sentence credits the LORD, not Joshua, with the result. Joshua never asks to be feared
            the way Moses was feared. The crossing itself, a flooded river stopped on command, does the
            convincing without a single word from Joshua about his own authority.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Priests Come Up, and the River Returns (verses 15 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Only after the stones are set, the tribes have crossed, and the people have hasted over does the LORD give the final order.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Joshua, saying, Command the priests that bear the ark of the testimony, that they come up out of Jordan."
          reference="Joshua 4:15 and 16"
        />
        <VerseQuote
          text="And it came to pass, when the priests that bare the ark of the covenant of the LORD were come up out of the midst of Jordan, and the soles of the priests' feet were lifted up unto the dry land, that the waters of Jordan returned unto their place, and flowed over all his banks, as they did before."
          reference="Joshua 4:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The same kind of trigger that opened the river closes it again.</strong> The
            previous chapter showed the water stopping the instant the priests&apos; feet touched it.
            Here, the water returns the instant their feet lift out of it. Nothing about this crossing happens by a timer or a natural ebb. It starts and
            ends on the priests&apos; own footsteps, under God&apos;s word to Joshua.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Gilgal, and Why the Stones Still Matter (verses 19 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter gives the exact day the crossing finished.</p>
        </div>
        <VerseQuote
          text="And the people came up out of Jordan on the tenth day of the first month, and encamped in Gilgal, in the east border of Jericho. And those twelve stones, which they took out of Jordan, did Joshua pitch in Gilgal."
          reference="Joshua 4:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The tenth day of the first month places this four days before Passover was kept again in the
            land, and almost exactly forty years to the week after the generation that left Egypt had
            first approached this same border, back when{" "}
            <ArticleLink href="/blog/numbers-14-explained">fear turned them away from it</ArticleLink> at
            Kadesh Barnea. A new generation reaches the spot their parents refused to trust God for.
          </p>
          <p>Then the chapter repeats the purpose of the stones, almost word for word, but widens the audience.</p>
        </div>
        <VerseQuote
          text="And he spake unto the children of Israel, saying, When your children shall ask their fathers in time to come, saying, What mean these stones? Then ye shall let your children know, saying, Israel came over this Jordan on dry land."
          reference="Joshua 4:21 and 22"
        />
        <VerseQuote
          text="For the LORD your God dried up the waters of Jordan from before you, until ye were passed over, as the LORD your God did to the Red sea, which he dried up from before us, until we were gone over: That all the people of the earth might know the hand of the LORD, that it is mighty: that ye might fear the LORD your God for ever."
          reference="Joshua 4:23 and 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The first explanation of the stones, back in verse 7, was aimed at Israel alone.
            This final explanation widens the purpose to &quot;all the people of the earth.&quot;</strong>{" "}
            A local memorial at the start of the chapter becomes, by the end of it, a witness meant for
            every nation that will ever hear the story. The goal was never Israel&apos;s pride in its own
            history. It was the whole earth knowing whose hand did this.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 4 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Are there really two sets of twelve stones in this chapter, or is the text just
            repeating itself?</strong> What the text says: verse 8 describes twelve stones carried out of
            the river to the lodging place, and verse 9, with no connecting word suggesting it is the same
            event, describes Joshua separately setting up twelve stones in the midst of Jordan itself,
            where the priests had stood. How it has been read: most readers take this as two distinct
            monuments, one visible at the camp where people actually lived and could ask about it, and
            one left in the riverbed itself as a quieter, more permanent marker of the exact spot the
            priests held firm. The text gives no reason to collapse them into one event.
          </p>
          <p>
            <strong>How could stones left in the middle of the Jordan serve as a sign, if nobody could see
            them once the river started flowing again?</strong> What the text says: verse 9 simply states
            they were set up there, and that they remained there unto this day, with no comment on whether
            they stayed visible. What this likely means: the sign was never meant to work the same way for
            both monuments. The Gilgal stones were the ones a child would actually see and ask about. The
            river stones were a fact on the ground, true and permanent whether or not anyone could view
            them, the same way a buried foundation still holds a building up even when nobody can see it.
          </p>
          <p>
            <strong>Is verse 14 just Joshua, or the writer of Joshua, boasting about his own
            reputation?</strong> What the text says: the verse credits the LORD as the one who magnified
            Joshua, not Joshua claiming it for himself. How it fits the chapter: every other verse in
            Joshua 4 traces the day&apos;s events back to the LORD speaking, commanding, and acting. This
            verse follows the same pattern. The fear Israel felt toward Joshua is presented as evidence of
            God keeping His word from{" "}
            <ArticleLink href="/blog/joshua-1-explained">Joshua 1</ArticleLink>, not a man managing his own
            image.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 4
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 4:6 and 7</h3>
        <VerseQuote
          text="That this may be a sign among you, that when your children ask their fathers in time to come, saying, What mean ye by these stones? Then ye shall answer them, That the waters of Jordan were cut off before the ark of the covenant of the LORD; when it passed over Jordan, the waters of Jordan were cut off: and these stones shall be for a memorial unto the children of Israel for ever."
          reference="Joshua 4:6 and 7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The whole purpose of the chapter in one sentence. A memorial built for a question a child has
          not asked yet, with an answer already prepared for them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 4:14</h3>
        <VerseQuote
          text="On that day the LORD magnified Joshua in the sight of all Israel; and they feared him, as they feared Moses, all the days of his life."
          reference="Joshua 4:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The promise made privately in Joshua 1 and repeated publicly in Joshua 3 is, in this one verse,
          simply kept.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 4:9</h3>
        <VerseQuote
          text="And Joshua set up twelve stones in the midst of Jordan, in the place where the feet of the priests which bare the ark of the covenant stood: and they are there unto this day."
          reference="Joshua 4:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A monument nobody would ever see once the river rose again, built anyway, because it being true
          mattered whether or not it was visible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 4:24</h3>
        <VerseQuote
          text="That all the people of the earth might know the hand of the LORD, that it is mighty: that ye might fear the LORD your God for ever."
          reference="Joshua 4:24"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The purpose widens from one nation&apos;s memory to the whole earth&apos;s knowledge in the final
          verse of the chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 4:22 and 23</h3>
        <VerseQuote
          text="Then ye shall let your children know, saying, Israel came over this Jordan on dry land. For the LORD your God dried up the waters of Jordan from before you, until ye were passed over, as the LORD your God did to the Red sea, which he dried up from before us, until we were gone over."
          reference="Joshua 4:22 and 23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Two generations, two rivers of water, one God credited for both. The Jordan crossing is told as
          a direct echo of the Red Sea, not a lesser copy of it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 4
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the meaning of the twelve stones in Joshua 4?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They were a permanent memorial, one stone representing each of Israel&apos;s twelve tribes, set
          up so that future generations who asked what the stones meant would be told the exact story of
          how the Jordan was cut off before the ark of the covenant.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were there twelve stones instead of some other number?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          One stone for each of Israel&apos;s twelve tribes, carried by one man from each tribe, made sure
          the memorial represented the whole nation crossing together, not just a portion of the people.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the twelve stones set up at Gilgal the same ones left in the Jordan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Joshua 4:8 and 4:20 describe stones carried out of the river and pitched at Gilgal, while
          verse 9 separately describes Joshua setting up twelve stones in the riverbed itself, where the
          priests had stood. The text describes two monuments, not one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was Gilgal, and why did Israel camp there?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gilgal was the first campsite inside Canaan, on the east border of Jericho. It became Israel&apos;s
          base camp for the early stages of the conquest and the place where the Gilgal stones stood as a
          permanent marker of the crossing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the armed tribes of Reuben, Gad, and Manasseh cross first?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They were keeping a promise their fathers made to Moses in Numbers 32. In exchange for settling
          land east of the Jordan, these tribes agreed to send their fighting men across first to help
          take Canaan before returning home.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that the LORD magnified Joshua?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means God made Joshua&apos;s authority unmistakable to the whole nation through the crossing
          itself. Joshua 4:14 says Israel came to fear him the way they had feared Moses, fulfilling what
          God had already promised Joshua privately back in Joshua 1 and publicly in Joshua 3.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Bible care so much about children asking questions in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Israel&apos;s faith was meant to be handed down, not just experienced once. The stones
          were built specifically to prompt a question from a generation that never saw the Jordan stop,
          giving parents a built in opportunity to retell what God did.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What day did Israel cross the Jordan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 4:19 says the people came up out of the Jordan on the tenth day of the first month, four
          days before that year&apos;s Passover, which Joshua 5 records them keeping once they reached
          Gilgal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does the Jordan crossing in Joshua 4 compare to the Red Sea?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 4:23 draws the comparison directly, saying the LORD dried up the Jordan the same way He
          had dried up the Red Sea. The difference is the generation: the people crossing the Jordan were
          mostly children or not yet born when the Red Sea parted, so this crossing gave them their own
          firsthand witness of the same kind of miracle.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter say the goal was for &quot;all the people of the earth&quot; to know?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 4:24 states the purpose was never only Israel&apos;s own confidence. It was so that every
          nation would eventually know the LORD&apos;s hand is mighty, tying one local river crossing to a
          much larger purpose running through the whole Bible.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 4 slows down right when the action should be speeding up, and that slowing down is the point.</p>
          <p>
            📌 <strong>What God does, He also makes sure gets remembered correctly.</strong> The crossing
            itself took one day. The stones were built to outlast every person who witnessed it.
          </p>
          <p>
            📌 <strong>Some monuments are for other people to see. Some are just for being true.</strong>{" "}
            The Gilgal stones stood where a child could ask about them. The river stones stood where
            nobody ever would, and the text treats both as equally worth building.
          </p>
          <p>
            📌 <strong>A promise kept by the grandchildren still counts as kept.</strong> Reuben, Gad, and
            half of Manasseh crossed armed decades after their fathers struck the deal with a man who was
            no longer alive to see it honored.
          </p>
          <p>
            You will not build a stone monument in a riverbed. But you will have moments worth making sure
            the next generation hears about correctly, instead of letting them fade into a vague story
            nobody can actually explain.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Pick one thing God has actually done in your life, and tell it to someone younger than you
            this week, plainly enough that they could repeat it back.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
