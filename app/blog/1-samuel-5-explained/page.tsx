import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("1-samuel-5-explained", {
  title: "1 Samuel 5 Explained: Dagon Falls Before the Ark",
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

export default function OneSamuelFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="1-samuel-5-explained"
      title={<>📖 1 Samuel 5 Explained: Dagon Falls Before the Ark</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The Philistines just won the greatest trophy of their lives.</p>
            <p>They carry it straight into the house of their own god, to show him off.</p>
            <p>
              <strong>1 Samuel 5 explained</strong> is the chapter where that trophy stops behaving
              like one. The statue it is set beside starts falling down in front of it. Within
              weeks, the men who fought a battle to capture this object are begging each other to
              get rid of it before it kills anyone else.
            </p>
            <p>Maybe you have assumed that once something good falls into the wrong hands, it stops mattering what God thinks about it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did the Philistines set the ark right next to their own god, Dagon?</li>
            <li>❓ What does it mean that Dagon fell on his face, twice?</li>
            <li>❓ What were the emerods that struck Ashdod, Gath, and Ekron?</li>
            <li>❓ Why did the Philistines keep moving the ark instead of just sending it home?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Israel loses this ark without putting up a fight for it. God does not need
              Israel in the room to defend His own name.</strong>
            </p>
            <p>
              Here is the whole chapter, in order: the ark set beside Dagon, Dagon falling twice, a
              disease that spreads with the ark, and three cities in a row begging to pass the
              problem somewhere else.
            </p>
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
            <ArticleLink href="/blog/1-samuel-4-explained">1 Samuel 4</ArticleLink> ended about as
            badly as a chapter can end. Israel lost thirty thousand soldiers in a single battle,
            Hophni and Phinehas died exactly as two separate prophecies said they would, Eli fell
            backward off his seat and broke his neck the moment he heard the ark was gone, and his
            daughter in law died giving birth to a son she named Ichabod, saying the glory had
            left Israel.
          </p>
          <p>
            1 Samuel 5 explained picks up with the ark no longer in Israel&apos;s story at all. It
            is sitting in enemy territory, in the hands of people who worship a god named Dagon,
            and the chapter never once checks back in on Israel to see how they are handling the
            loss. For twelve verses, Israel is not even in the room. The chapter only follows the
            ark, and what starts happening to the people who think they won it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 1 Samuel 5 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Trophy Set Beside a Rival God (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the ark on the move, carried deep into Philistine country.</p>
        </div>
        <VerseQuote
          text="And the Philistines took the ark of God, and brought it from Ebenezer unto Ashdod. When the Philistines took the ark of God, they brought it into the house of Dagon, and set it by Dagon."
          reference="1 Samuel 5:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ashdod was one of five major Philistine cities, along with Gath and Ekron, both of
            which show up later in this same chapter. Dagon was the chief god of the Philistines,
            usually connected to grain and the harvest. Setting a captured people&apos;s sacred
            object beside your own god&apos;s statue was a normal victory move in that world. It
            said, plainly, our god beat your god.
          </p>
          <p>
            📌 <strong>Nobody in Ashdod asked whether that claim was actually true. They just
            assumed it, and arranged the furniture to match.</strong> The rest of the chapter is
            Dagon disagreeing with his own worshippers.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Dagon Falls Once (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The victory display does not survive its first night.</p>
        </div>
        <VerseQuote
          text="And when they of Ashdod arose early on the morrow, behold, Dagon was fallen upon his face to the earth before the ark of the LORD. And they took Dagon, and set him in his place again."
          reference="1 Samuel 5:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Fallen upon his face&quot; is the exact posture of a worshipper bowing down.
            Dagon is not knocked sideways or toppled by an earthquake. He is found in the one
            position a god is never supposed to take in front of anything, flat on the ground, face
            down, in front of the ark.
          </p>
          <p>
            The men of Ashdod do not take the hint. They pick Dagon back up and put him exactly
            where he was, as if the statue simply slipped. Pharaoh&apos;s magicians reacted a
            similar way centuries earlier, matching the first plagues with their own tricks right
            up until they could not anymore. <ArticleLink href="/blog/exodus-7-explained">
            Aaron&apos;s rod swallowed theirs</ArticleLink> and still did not end the contest on the
            spot. One bent knee from a statue was never going to convince Ashdod either, at least
            not the first time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Dagon Falls Again, and Loses What a God Should Never Lose (verses 4 and 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The next morning removes any room for explaining it away as an accident.</p>
        </div>
        <VerseQuote
          text="And when they arose early on the morrow morning, behold, Dagon was fallen upon his face to the ground before the ark of the LORD; and the head of Dagon and both the palms of his hands were cut off upon the threshold; only the stump of Dagon was left to him."
          reference="1 Samuel 5:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is not a second fall. It is a dismantling.</strong> Dagon is found face
            down again, and this time his head and both hands have broken off, left lying right on
            the threshold he supposedly guards. Only a stump remains where the statue used to stand
            whole. Whatever put him on the ground the first night, nobody could call a coincidence
            twice.
          </p>
          <p>
            Centuries later, a song in the Psalms describes idols in general with language that
            fits this exact scene almost too well.
          </p>
          <VerseQuote
            text="Their idols are silver and gold, the work of men's hands. They have mouths, but they speak not: eyes have they, but they see not: They have ears, but they hear not: noses have they, but they smell not: They have hands, but they handle not: feet have they, but they walk not: neither speak they through their throat."
            reference="Psalm 115:4 to 7"
          />
          <p>
            📌 <strong>Dagon&apos;s own hands end up cut off and useless on the floor of his
            temple, the exact detail that song mocks about every idol everywhere.</strong> A god
            with no working hands cannot even hold himself up, let alone defend the people who
            carried an ark into his house to prove he was the stronger one.
          </p>
          <VerseQuote
            text="Therefore neither the priests of Dagon, nor any that come into Dagon's house, tread on the threshold of Dagon in Ashdod unto this day."
            reference="1 Samuel 5:5"
          />
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              💡 This verse tells you the custom was still being kept at the time it was written
              down, long after the event itself. A small superstition, stepping carefully around a
              broken god&apos;s doorway, outlived the explanation for why anyone started doing it.
            </p>
          </div>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Hand of the LORD Turns Heavy on Ashdod (verses 6 and 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A broken statue was not the end of what Ashdod had to deal with.</p>
        </div>
        <VerseQuote
          text="But the hand of the LORD was heavy upon them of Ashdod, and he destroyed them, and smote them with emerods, even Ashdod and the coasts thereof."
          reference="1 Samuel 5:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Emerods were a painful swelling or tumor. Exactly what medical condition the Hebrew
            word describes is genuinely debated, since it only shows up a handful of times in the
            Old Testament. Some older translations read it as hemorrhoids. What every reading
            agrees on is that it was physically painful, it spread beyond the city itself into the
            surrounding territory, and it arrived right alongside the ark.
          </p>
          <p>The people of Ashdod reach the obvious conclusion fast.</p>
        </div>
        <VerseQuote
          text="And when the men of Ashdod saw that it was so, they said, The ark of the God of Israel shall not abide with us: for his hand is sore upon us, and upon Dagon our god."
          reference="1 Samuel 5:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what they do not say.</strong> They never claim Dagon fought back or
            lost a close contest. They say the LORD&apos;s hand is heavy on them and on Dagon alike,
            as if their own god were just one more casualty standing next to them. Their solution is
            not repentance. It is distance. Get the object out of our city.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Gath Learns the Same Lesson (verses 8 and 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ashdod cannot solve this alone, so it becomes a problem for the whole region.</p>
        </div>
        <VerseQuote
          text="They sent therefore and gathered all the lords of the Philistines unto them, and said, What shall we do with the ark of the God of Israel? And they answered, Let the ark of the God of Israel be carried about unto Gath. And they carried the ark of the God of Israel about thither."
          reference="1 Samuel 5:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The plan is to relocate the ark, not to return it.</strong> Nobody in this
            meeting suggests sending it back to Israel. The five lords of the Philistines treat
            this like a problem that can be handed to a neighboring city instead of a sign that
            needs to be obeyed. Gath inherits the ark with no warning about what came with it in
            Ashdod.
          </p>
        </div>
        <VerseQuote
          text="And it was so, that, after they had carried it about, the hand of the LORD was against the city with a very great destruction: and he smote the men of the city, both small and great, and they had emerods in their secret parts."
          reference="1 Samuel 5:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moving the ark did not move the problem away from it. It moved the problem
            to wherever the ark went next.</strong> &quot;Both small and great&quot; means this was
            not limited to leaders or soldiers. The whole city, regardless of rank, is struck the
            same way Ashdod was.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Ekron Begs Before the Ark Even Arrives (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>By the third city, nobody needs to wait and see what happens.</p>
        </div>
        <VerseQuote
          text="Therefore they sent the ark of God to Ekron. And it came to pass, as the ark of God came to Ekron, that the Ekronites cried out, saying, They have brought about the ark of the God of Israel to us, to slay us and our people."
          reference="1 Samuel 5:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Ekron reacts before a single person there has been struck with anything.</strong>{" "}
            Word of Ashdod and Gath has traveled fast enough that the whole city cries out on
            arrival. Two cities were enough evidence. Nobody in Ekron is willing to wait for a
            third data point.
          </p>
        </div>
        <VerseQuote
          text="So they sent and gathered together all the lords of the Philistines, and said, Send away the ark of the God of Israel, and let it go again to his own place, that it slay us not, and our people: for there was a deadly destruction throughout all the city; the hand of God was very heavy there."
          reference="1 Samuel 5:11"
        />
        <VerseQuote
          text="And the men that died not were smitten with the emerods: and the cry of the city went up to heaven."
          reference="1 Samuel 5:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 For the first time in the chapter, somebody uses the right words. &quot;Let it go
            again to his own place&quot; finally names the actual solution, three cities and an
            unknown number of deaths after the ark first entered Dagon&apos;s temple. &quot;The cry
            of the city went up to heaven&quot; closes the chapter on a note that sounds almost like
            a prayer, even though nobody here worships the God they are crying out to.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 1 Samuel 5 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did the Philistines set the ark right next to Dagon in the first
            place?</strong> What the text says: verse 2 reports the act without explaining the
            reasoning behind it. How this is read: placing a defeated nation&apos;s sacred object
            beside the victor&apos;s own god was a normal way ancient peoples announced a conquest,
            treating the outcome of a battle as proof that one god had beaten another. The chapter
            spends the rest of its length showing that assumption was wrong.
          </p>
          <p>
            <strong>Does Dagon falling down mean he was a real, lesser god that the LORD
            defeated?</strong> What the text says: the narrative only describes a statue falling
            and breaking, with no commentary on what, if anything, stood behind it. How this is
            read: Scripture elsewhere describes idols as lifeless objects, not weaker rival powers.
          </p>
          <VerseQuote
            text="Thou shalt have no other gods before me. Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth: Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God"
            reference="Exodus 20:3 to 5"
          />
          <p>
            A statue with no working hands or head, lying on the ground it was supposed to guard,
            reads less like one god losing a fight to another and more like the point Exodus 20
            already makes plainly. There was never a contest between equals here.
          </p>
          <p>
            <strong>What were the emerods, exactly?</strong> What the text says: verses 6, 9, and
            12 all name the same affliction without describing its symptoms beyond painful
            swelling. How this is read: the precise medical condition behind the Hebrew word is
            genuinely uncertain, and honest readers should hold that loosely rather than naming it
            with more confidence than the text supports. What is certain is that it struck in
            proportion to how long each city kept the ark, and it stopped being a mystery to anyone
            after the second outbreak.
          </p>
          <p>
            <strong>Why did the Philistines move the ark to Gath and Ekron instead of sending it
            back to Israel right after Ashdod?</strong> What the text says: verse 8 records the
            lords choosing to carry the ark to Gath, with no mention of returning it considered at
            that meeting. How this is read: relocating a problem is often easier than admitting what
            caused it. Ashdod could tell itself the trouble was local. Only after two more cities
            suffered the identical pattern did &quot;send it back&quot; finally become the plan,
            in the very last verses of the chapter.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 1 Samuel 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 Samuel 5:3</h3>
        <VerseQuote
          text="And when they of Ashdod arose early on the morrow, behold, Dagon was fallen upon his face to the earth before the ark of the LORD. And they took Dagon, and set him in his place again."
          reference="1 Samuel 5:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A rival god found bowing, and his own worshippers stand him back up rather than ask what
          it means. The whole chapter grows out of that first refusal to take the hint.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Samuel 5:4</h3>
        <VerseQuote
          text="And when they arose early on the morrow morning, behold, Dagon was fallen upon his face to the ground before the ark of the LORD; and the head of Dagon and both the palms of his hands were cut off upon the threshold; only the stump of Dagon was left to him."
          reference="1 Samuel 5:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A statue that supposedly represents strength loses its head and both hands in one night,
          leaving nothing standing but a stump on its own doorstep.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Samuel 5:7</h3>
        <VerseQuote
          text="And when the men of Ashdod saw that it was so, they said, The ark of the God of Israel shall not abide with us: for his hand is sore upon us, and upon Dagon our god."
          reference="1 Samuel 5:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The men of Ashdod never claim Dagon fought and lost. They lump their own god in with
          themselves as another casualty, which says more than they probably meant it to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Samuel 5:11</h3>
        <VerseQuote
          text="So they sent and gathered together all the lords of the Philistines, and said, Send away the ark of the God of Israel, and let it go again to his own place, that it slay us not, and our people: for there was a deadly destruction throughout all the city; the hand of God was very heavy there."
          reference="1 Samuel 5:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The right answer, finally spoken, after two cities already learned it the hard way.
          Sending the ark home was always the only real solution on offer.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 1 Samuel 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in 1 Samuel 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Philistines placed the captured ark of the covenant in the temple of their god
          Dagon at Ashdod. Dagon&apos;s statue fell down twice, the second time losing its head and
          hands, and the city was then struck with a painful affliction called emerods. The ark
          was moved to Gath and then Ekron, and the same destruction followed it to both cities
          until the Philistine leaders finally agreed to send it back to Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Dagon in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Dagon was the chief god of the Philistines, most closely associated with grain and the
          harvest. His temple in Ashdod was prominent enough to house a national trophy like the
          captured ark, and his statue appears again later in <ArticleLink href="/blog/judges-16-explained">
          Samson&apos;s story</ArticleLink>, where the Philistines credit Dagon with handing Samson
          over to them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Dagon fall down before the ark?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the mechanism, only that it happened twice in two consecutive
          mornings. The posture, fallen on his face, is the exact position of someone bowing down,
          which reads as a plain reversal of what the Philistines intended when they set him beside
          their trophy in the first place.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Dagon lost his head and hands?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A head and hands cut off and left on the threshold leave the statue unable to see, speak,
          or act in any of the ways a god was supposed to. It is a vivid picture of the same point
          Psalm 115 makes about every idol: hands that cannot handle anything are no real defense
          for anyone who trusts them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were emerods?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Emerods were a painful swelling or tumor, though the exact medical condition behind the
          Hebrew word is uncertain since it appears only a handful of times in the Old Testament.
          Whatever it was, it struck Ashdod, Gath, and Ekron in the same pattern, each time soon
          after the ark arrived.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Philistines keep moving the ark instead of sending it home right away?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ashdod&apos;s leaders chose to send the ark to Gath rather than consider returning it,
          treating the trouble as something that could be handed off instead of a sign that needed
          to be obeyed. Only after Gath and then Ekron suffered the identical affliction did the
          Philistine lords finally agree, in the chapter&apos;s last verses, that sending it back to
          Israel was the only real option left.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does 1 Samuel 5 mean Dagon was a real but weaker god?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture consistently describes idols as lifeless objects made by human hands rather
          than lesser rival powers, which fits what happens to Dagon here. A statue with no working
          head or hands, lying broken on its own doorstep, reads as exposure rather than a contest
          between two real gods.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is the custom about the threshold mentioned in verse 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse notes that priests still avoided stepping on Dagon&apos;s threshold at the time
          the book was written, long after the original event. It shows the memory of Dagon&apos;s
          humiliation outlasted the generation that witnessed it, turning into a lasting
          superstition in Ashdod itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 1 Samuel 5 connect to 1 Samuel 4?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          1 Samuel 4 ended with Israel defeated and the ark captured, seemingly a total loss. 1
          Samuel 5 shows that losing the ark to an enemy never put it, or the God it represented,
          under anyone&apos;s control. The disaster that looked final in one chapter becomes a
          humiliation for the other side in the very next one.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>1 Samuel 5 never mentions Israel once, and that is exactly the point.</p>
          <p>
            📌 <strong>God did not need Israel&apos;s army, or even Israel&apos;s attention, to
            defend His own name.</strong> He did it alone, inside the enemy&apos;s own temple,
            while the nation that lost the ark was still mourning Eli and naming a baby Ichabod.
          </p>
          <p>
            📌 <strong>An idol propped back up is still an idol.</strong> Ashdod picked Dagon off
            the floor once and tried to pretend nothing had happened. The second morning removed
            that option for good.
          </p>
          <p>
            📌 <strong>Relocating a problem is not the same as solving it.</strong> Three cities
            suffered the same affliction because the first two tried to pass it along instead of
            asking what it actually required.
          </p>
          <p>So here is your one next step.</p>
          <p>
            If there is a problem in your life that you have been moving from place to place
            instead of actually sending back where it belongs, name it honestly this week instead
            of handing it off one more time.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
