import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-3-explained", {
  title: "Deuteronomy 3 Explained: Og of Bashan and the Giant's Iron Bed",
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

export default function DeuteronomyThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-3-explained"
      title={<>📖 Deuteronomy 3 Explained: Og of Bashan and the Giant&apos;s Iron Bed</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One king left standing east of the Jordan. One bed that needed its own footnote in Scripture.</p>
            <p>And one old man, standing on land he just finished winning, asking for something God still says no to.</p>
            <p>
              <strong>Deuteronomy 3 explained</strong> is Moses continuing his farewell sermon with
              the second half of the conquest east of the Jordan: the defeat of Og, the giant king
              of Bashan, the dividing up of that land before Israel has even crossed the river, and
              then, right in the middle of victory, Moses turning to God with the one request he
              has carried for forty years.
            </p>
            <p>Maybe you have won something real, and still wanted the one thing you were told you could not have.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Who was Og, and was he actually a giant?</li>
            <li>❓ Why could Israel wipe out Bashan completely when it had to leave Ammon alone?</li>
            <li>❓ Why does Moses give away land nobody has set foot on yet?</li>
            <li>❓ And why does God say no to Moses again, after everything he has done?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 3 is Moses handing off a finished war and an unfinished
              longing in the same breath.</strong>
            </p>
            <p>
              Here is the whole chapter, start to finish: the battle at Edrei, the giant king and
              his iron bed, the land split between Reuben, Gad, and half of Manasseh, the charge
              given to Joshua, and the prayer God finally cuts short.
            </p>
            <p>Twenty nine verses, and the hardest one is Moses asking for something he already knows the answer to.</p>
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
            <ArticleLink href="/blog/deuteronomy-2-explained">Deuteronomy 2</ArticleLink> ended with
            Israel finishing off Sihon, the Amorite king who refused even peaceful passage through
            his land. That victory gave Israel its first real territory east of the Jordan,
            stretching from the Arnon north toward Gilead. Edom, Moab, and Ammon had all been left
            untouched, exactly as God commanded, while Sihon&apos;s whole kingdom fell.
          </p>
          <p>
            Moses is still retelling this part of the journey to a new generation, not inventing
            it. The events themselves were first recorded back in{" "}
            <ArticleLink href="/blog/numbers-21-explained">Numbers 21</ArticleLink>, where both
            Sihon and Og were defeated within the same stretch of chapters. Deuteronomy 3 picks up
            immediately where Deuteronomy 2 left off, with Israel turning north from newly won
            territory straight into a second war, this time against a king whose size needed its
            own explanation.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 3 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Fear Not: The Second King Falls (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Israel barely has time to settle Sihon&apos;s land before the next king marches out.</p>
        </div>
        <VerseQuote
          text="Then we turned, and went up the way to Bashan: and Og the king of Bashan came out against us, he and all his people, to battle at Edrei."
          reference="Deuteronomy 3:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the battle even starts, God gives Moses the same kind of word He gave before Sihon.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto me, Fear him not: for I will deliver him, and all his people, and his land, into thy hand; and thou shalt do unto him as thou didst unto Sihon king of the Amorites, which dwelt at Heshbon."
          reference="Deuteronomy 3:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Notice what God does not do.</strong> He does not explain why Og should not
            be feared, and He does not describe how the battle will go. He simply repeats what He
            already proved true once, at Heshbon, and tells Moses to expect the same outcome. One
            victory becomes the pattern for the next fight, not just a memory of the last one.
          </p>
          <p>Og does not get a second warning. He gets the same ending Sihon got.</p>
        </div>
        <VerseQuote
          text="So the LORD our God delivered into our hands Og also, the king of Bashan, and all his people: and we smote him until none was left to him remaining. And we took all his cities at that time, there was not a city which we took not from them, threescore cities, all the region of Argob, the kingdom of Og in Bashan."
          reference="Deuteronomy 3:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Sixty cities in one campaign.</strong> This is not a border skirmish. Bashan
            was a whole kingdom, and verse 5 adds that these were not open villages but fenced
            cities with high walls, gates, and bars, the kind of defense a king builds when he does
            not expect to lose. Og lost anyway.
          </p>
        </div>
        <VerseQuote
          text="And we utterly destroyed them, as we did unto Sihon king of Heshbon, utterly destroying the men, women, and children, of every city."
          reference="Deuteronomy 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Moses states this as plainly as he stated it about Heshbon in the last chapter,
            without softening it. Only the cattle and the spoil were kept. This was the same total
            conquest ordered against Sihon, carried out a second time against a second kingdom.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Giant&apos;s Bed (verses 8 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With both Amorite kings dead, Moses pauses the battle report to describe exactly how
            much ground just changed hands.
          </p>
        </div>
        <VerseQuote
          text="And we took at that time out of the hand of the two kings of the Amorites the land that was on this side Jordan, from the river of Arnon unto mount Hermon;"
          reference="Deuteronomy 3:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 9 adds a small aside that the Sidonians call that mountain Sirion, and the
            Amorites call it Shenir, a detail that only makes sense if Moses expects readers who
            know several names for the same ridge. Then comes the line this chapter is best
            remembered for.
          </p>
        </div>
        <VerseQuote
          text="For only Og king of Bashan remained of the remnant of giants; behold, his bedstead was a bedstead of iron; is it not in Rabbath of the children of Ammon? nine cubits was the length thereof, and four cubits the breadth of it, after the cubit of a man."
          reference="Deuteronomy 3:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Using the common eighteen inch cubit, that bed measured out to roughly
            thirteen feet long and six feet wide.</strong> The verse goes out of its way to add
            &quot;after the cubit of a man,&quot; meaning this was measured with an ordinary human
            forearm, not some special giant scale invented to make the number bigger than it was.
          </p>
          <p>
            &quot;Remnant of giants&quot; connects Og to a people Scripture had already named
            centuries earlier. <ArticleLink href="/blog/genesis-14-explained">Genesis 14</ArticleLink>{" "}
            records Chedorlaomer&apos;s army striking the Rephaims in Ashteroth Karnaim, a town in
            this same region, long before Israel ever left Egypt.
          </p>
        </div>
        <VerseQuote
          text="And in the fourteenth year came Chedorlaomer, and the kings that were with him, and smote the Rephaims in Ashteroth Karnaim, and the Zuzims in Ham, and the Emims in Shaveh Kiriathaim,"
          reference="Genesis 14:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Most English translations render the Hebrew word behind &quot;giants&quot; here as
            Rephaim, the same family of peoples the previous chapter had just named in the Emims
            and the Zamzummims. Og was not an isolated oddity. He was the last
            king left from a line of unusually large peoples God had already been clearing out of
            that region for generations, and the text points to his bed, still on display in
            Rabbath, as proof any reader of Moses&apos; own day could go check for themselves.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Giving Away Land Before Crossing the River (verses 12 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses does not wait for the rest of Canaan to decide what happens to the land just won.
            He assigns it immediately.
          </p>
        </div>
        <VerseQuote
          text="And this land, which we possessed at that time, from Aroer, which is by the river Arnon, and half mount Gilead, and the cities thereof, gave I unto the Reubenites and to the Gadites. And the rest of Gilead, and all Bashan, being the kingdom of Og, gave I unto the half tribe of Manasseh; all the region of Argob, with all Bashan, which was called the land of giants."
          reference="Deuteronomy 3:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This same division was first recorded in{" "}
            <ArticleLink href="/blog/numbers-32-explained">Numbers 32</ArticleLink>, where Reuben
            and Gad asked for this exact territory because it suited their large herds, and part of
            Manasseh ended up with land nobody originally heard ask for it. Moses, retelling the
            story decades later, speaks of the grant in his own voice, &quot;gave I,&quot; because
            he is the one who carried it out.
          </p>
          <p>One family inside Manasseh gets singled out by name for what it did with its share.</p>
        </div>
        <VerseQuote
          text="Jair the son of Manasseh took all the country of Argob unto the coasts of Geshuri and Maachathi; and called them after his own name, Bashanhavothjair, unto this day."
          reference="Deuteronomy 3:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Numbers 32 describes Jair claiming the smaller villages of the region and
            naming them Havothjair.</strong> Here, decades later, that same family&apos;s name
            covers the wider region of Argob as Bashan havoth jair. Both verses describe the same
            family&apos;s hold on the same ground, just named at two different points: first the
            villages Jair actually took, later the fuller territory his name had come to mark.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. One Condition on the Land East of the Jordan (verses 18 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Reuben, Gad, and half of Manasseh get their land first, but Moses attaches a condition
            none of the other tribes have to meet.
          </p>
        </div>
        <VerseQuote
          text="And I commanded you at that time, saying, The LORD your God hath given you this land to possess it: ye shall pass over armed before your brethren the children of Israel, all that are meet for the war."
          reference="Deuteronomy 3:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Families and herds stay behind. Fighting men go ahead of everyone else.</p>
        </div>
        <VerseQuote
          text="But your wives, and your little ones, and your cattle, (for I know that ye have much cattle,) shall abide in your cities which I have given you; Until the LORD have given rest unto your brethren, as well as unto you, and until they also possess the land which the LORD your God hath given them beyond Jordan: and then shall ye return every man unto his possession, which I have given you."
          reference="Deuteronomy 3:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Receiving an inheritance first did not excuse these two and a half tribes
            from the fight that still lay ahead.</strong> If anything, it put them under a stricter
            obligation. They owed the rest of Israel help crossing the Jordan precisely because they
            were not going to need that crossing for themselves.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Moses Commissions Joshua (verses 21 and 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With two kingdoms already fallen, Moses turns to the man who will lead the rest of the
            conquest without him.
          </p>
        </div>
        <VerseQuote
          text="And I commanded Joshua at that time, saying, Thine eyes have seen all that the LORD your God hath done unto these two kings: so shall the LORD do unto all the kingdoms whither thou passest. Ye shall not fear them: for the LORD your God he shall fight for you."
          reference="Deuteronomy 3:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joshua is not told to imagine a future victory. He is told to remember two
            he just watched happen.</strong> Sihon and Og are not abstract encouragement here. They
            are evidence Joshua stood close enough to see with his own eyes, and Moses points
            straight at them before Joshua ever leads a single battle of his own.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Moses&apos; Plea, and the Answer He Already Knew (verses 23 to 29)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Right after commissioning his successor, Moses does something he has not done out loud
            anywhere else in this sermon. He tells Israel what he asked God for himself.
          </p>
        </div>
        <VerseQuote
          text="And I besought the LORD at that time, saying, O Lord GOD, thou hast begun to shew thy servant thy greatness, and thy mighty hand: for what God is there in heaven or in earth, that can do according to thy works, and according to thy might? I pray thee, let me go over, and see the good land that is beyond Jordan, that goodly mountain, and Lebanon."
          reference="Deuteronomy 3:23 to 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;Besought&quot; is a strong word, closer to begging than asking.</strong>{" "}
            Moses has just watched two kings and their armies fall. He is not doubting God&apos;s
            power. He is standing in the middle of proof of it, and using that very proof as the
            reason God might finally say yes.
          </p>
          <p>God does not argue with the request. He simply closes it.</p>
        </div>
        <VerseQuote
          text="But the LORD was wroth with me for your sakes, and would not hear me: and the LORD said unto me, Let it suffice thee; speak no more unto me of this matter. Get thee up into the top of Pisgah, and lift up thine eyes westward, and northward, and southward, and eastward, and behold it with thine eyes: for thou shalt not go over this Jordan."
          reference="Deuteronomy 3:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;For your sakes&quot; matches exactly what Moses already told this same
            generation in{" "}
            <ArticleLink href="/blog/deuteronomy-1-explained">Deuteronomy 1</ArticleLink>.</strong>{" "}
            The no is not new information here. What is new is hearing Moses describe the asking
            itself, and the firmness of God&apos;s &quot;speak no more unto me of this matter&quot;
            next to the real kindness of still being offered a view from Pisgah.
          </p>
          <p>The chapter ends with the baton fully passed and the camp still waiting.</p>
        </div>
        <VerseQuote
          text="But charge Joshua, and encourage him, and strengthen him: for he shall go over before this people, and he shall cause them to inherit the land which thou shalt see."
          reference="Deuteronomy 3:28"
        />
        <VerseQuote
          text="So we abode in the valley over against Bethpeor."
          reference="Deuteronomy 3:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Three commands land on Joshua in a single verse: charge him, encourage him,
            strengthen him. Moses is not simply stepping aside. He is actively building up the man
            who will finish what he started, in the very same breath where he is told he will not
            get to finish it himself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 3 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was Og really a giant, or is this exaggerated royal legend?</strong> The text
            treats it as plain history, not folklore. It names a specific object, a bed, states its
            exact measurements, and points to its exact location in Rabbath as something a reader
            in Moses&apos; own time could go verify. Scripture elsewhere ties Og to the Rephaim, the
            same unusually large peoples Genesis 14 and Deuteronomy 2 already describe in matter of
            fact terms, not as monsters out of myth.
          </p>
          <p>
            <strong>Could &quot;bedstead&quot; mean something other than a bed Og actually slept
            in?</strong> Most readings take it at face value, a real piece of royal furniture sized
            to its owner. Some commentators have suggested it may describe a stone sarcophagus or
            monument rather than a bed used in daily life, since the size would be unusual even for
            a tall king. The text itself does not settle which reading is correct, only that the
            object was real, iron, and on public display long after Og was dead.
          </p>
          <p>
            <strong>Why could Israel destroy Bashan completely, when{" "}
            <ArticleLink href="/blog/deuteronomy-2-explained">Deuteronomy 2</ArticleLink> told them
            to leave Ammon alone just one chapter earlier?</strong> The difference was never about
            strength. It was about ownership. Ammon&apos;s land belonged to the children of Lot by
            God&apos;s own prior decision. Bashan carried no such protection. Og, like Sihon before
            him, had no grant shielding his kingdom, and his own decision to march out and fight
            sealed the rest.
          </p>
          <p>
            <strong>Is God being unfair to Moses here, after everything Moses has done?</strong>{" "}
            The chapter does not pretend the no is painless. Moses calls it being &quot;wroth with
            me,&quot; his own word, and still reports it to Israel without softening it into
            something else. But the same verse that refuses him the crossing offers him Pisgah, a
            real view of the land, and the dignity of personally strengthening the man who will
            lead Israel into it. Refusal and real kindness sit inside the very same two verses.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 3:2</h3>
        <VerseQuote
          text="And the LORD said unto me, Fear him not: for I will deliver him, and all his people, and his land, into thy hand; and thou shalt do unto him as thou didst unto Sihon king of the Amorites, which dwelt at Heshbon."
          reference="Deuteronomy 3:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A past victory becomes the pattern for the next fight. God does not give Moses new
          reasons not to be afraid, only the same proof He already gave once.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 3:11</h3>
        <VerseQuote
          text="For only Og king of Bashan remained of the remnant of giants; behold, his bedstead was a bedstead of iron; is it not in Rabbath of the children of Ammon? nine cubits was the length thereof, and four cubits the breadth of it, after the cubit of a man."
          reference="Deuteronomy 3:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most quoted verse in the chapter, measured in ordinary human cubits on purpose, so no
          reader could dismiss the size as exaggeration dressed up in special units.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 3:22</h3>
        <VerseQuote
          text="Ye shall not fear them: for the LORD your God he shall fight for you."
          reference="Deuteronomy 3:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Joshua&apos;s first marching orders, built entirely on two battles he had just watched
          Moses win without lifting a weapon himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 3:25</h3>
        <VerseQuote
          text="I pray thee, let me go over, and see the good land that is beyond Jordan, that goodly mountain, and Lebanon."
          reference="Deuteronomy 3:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most personal line Moses speaks in this entire sermon, asked right after two of the
          biggest victories of his life, and still answered no.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 3:27</h3>
        <VerseQuote
          text="Get thee up into the top of Pisgah, and lift up thine eyes westward, and northward, and southward, and eastward, and behold it with thine eyes: for thou shalt not go over this Jordan."
          reference="Deuteronomy 3:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A refusal and a gift in the same sentence. Moses does not get the crossing, but he does
          not get nothing either.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 3 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 3 continues Moses&apos; retelling of Israel&apos;s journey with the defeat of
          Og, the giant king of Bashan, the dividing of the conquered land east of the Jordan among
          Reuben, Gad, and half of Manasseh, Moses commissioning Joshua, and Moses&apos; own request
          to enter the promised land, which God refuses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Og of Bashan?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Og was the Amorite king of Bashan, a region northeast of the Jordan, and the last king
          left from the Rephaim, a people associated with unusual height. Deuteronomy 3:11
          describes his iron bed and states he was the only one of that line still remaining when
          Israel defeated him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How big was Og&apos;s bed, and was Og really a giant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 3:11 gives the bed&apos;s size as nine cubits long and four cubits wide, which
          using the common eighteen inch cubit works out to roughly thirteen feet long and six feet
          wide. The verse specifies it was measured &quot;after the cubit of a man,&quot; an
          ordinary human standard, which is part of why the text presents it as real history rather
          than exaggeration.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Israel completely destroy Bashan, when Deuteronomy 2 told Israel to leave Ammon
          alone?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ammon&apos;s territory belonged to the descendants of Lot by a prior promise from God.
          Bashan carried no such protection, and Og chose to march out and fight Israel rather than
          allow passage, the same pattern that sealed Sihon&apos;s fate in the chapter before this
          one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why wouldn&apos;t God let Moses cross into the promised land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 3:26 says God was &quot;wroth&quot; with Moses &quot;for your sakes,&quot;
          connecting his exclusion to the unbelief the people showed earlier in the journey.
          Numbers 20 records the specific act, Moses striking the rock in disobedience rather than
          speaking to it, as the direct cause.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Mount Pisgah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Pisgah was a ridge or peak near Mount Nebo, east of the Jordan, high enough to see across
          into Canaan. God allowed Moses to climb it and view the land in every direction, even
          though he was not permitted to enter it himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Jair rename part of Bashan after himself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jair, from the half tribe of Manasseh, took the towns of the Argob region as part of his
          family&apos;s inheritance and named them Bashan havoth jair after himself. Numbers 32
          records the earlier, narrower version of this same claim over the smaller villages of the
          area.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did Reuben, Gad, and half of Manasseh still have to send soldiers across the Jordan
          if they already had their land?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses required their fighting men to cross ahead of the rest of Israel and help finish
          the conquest of Canaan before returning home, exactly as agreed in Numbers 32. Receiving
          their inheritance first came with an obligation, not an exemption from the fight still
          ahead.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 3 is a chapter about finishing one thing and being told no on another, in the same breath.</p>
          <p>
            📌 <strong>A proven God does not need a new reason to be trusted the next time.</strong>{" "}
            Og got the exact same &quot;fear him not&quot; Sihon got, because the God who delivered
            one kingdom had already settled the question for the next one.
          </p>
          <p>
            📌 <strong>Receiving something early can come with a greater, not smaller,
            responsibility.</strong> Reuben, Gad, and half of Manasseh got their land before anyone
            else, and it cost them the obligation to fight for everyone else&apos;s first.
          </p>
          <p>
            📌 <strong>God&apos;s no can still come wrapped in real kindness.</strong> Moses did not
            get the crossing he begged for, and he still got Pisgah, a real view, and the honor of
            personally strengthening the man who would finish the job.
          </p>
          <p>
            You are probably not asking God to cross a river this week. But you likely have your
            own version of Moses&apos; request, something good you want that God has already
            answered, and the answer was not the one you were hoping for.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask whether you are still arguing with a no God already gave, instead of looking for
            whatever Pisgah He is actually offering you right now.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
