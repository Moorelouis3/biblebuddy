import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("2-samuel-9-explained", {
  title: "2 Samuel 9 Explained: David's Kindness to Mephibosheth",
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

export default function TwoSamuelNineExplainedPage() {
  return (
    <BlogPostShell
      slug="2-samuel-9-explained"
      title={<>📖 2 Samuel 9 Explained: David&apos;s Kindness to Mephibosheth</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A king at the height of his power stops and asks about a dead friend&apos;s family.</p>
            <p>
              <strong>2 Samuel 9 explained</strong> is the chapter where David, with his wars won and his
              throne secure, remembers a promise he made years earlier to a man who is no longer alive to
              collect on it. Jonathan is dead. Saul&apos;s whole house has fallen apart over the last five
              chapters. But one grandson of Saul is still out there, hiding, lame, and certain that David
              would want him dead on sight. David goes looking for him anyway.
            </p>
            <p>Maybe you have made a promise to someone you loved, and the person who could call it due has already died.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does David go searching for Saul&apos;s family instead of eliminating any threat from it?</li>
            <li>❓ Who is Mephibosheth, and why does he call himself &quot;a dead dog&quot;?</li>
            <li>❓ Why does David give him back land, then hand him a full time servant to run it?</li>
            <li>❓ What does it actually mean to eat &quot;at the king&apos;s table&quot; every day?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This whole chapter runs on one phrase, repeated twice: &quot;for Jonathan&apos;s
              sake.&quot;</strong> Nothing Mephibosheth does earns what he receives here. Everything traces
              back to a covenant made between two other men, years before this chapter opens.
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: David&apos;s question, the search
              through Ziba, the fearful meeting, the land restored, and the table Mephibosheth ends up
              eating at for the rest of his life.
            </p>
            <p>Read slowly. This is one of the clearest pictures of grace in the entire Old Testament.</p>
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
            <ArticleLink href="/blog/2-samuel-8-explained">2 Samuel 8</ArticleLink> closed out a long run of
            victories: Philistines, Moab, Syria, Edom, all beaten and paying tribute, their gold dedicated to
            the LORD instead of kept. David is no longer fighting to survive. He is governing a kingdom that
            has already been secured, with officials in place and enemies turned into servants on every
            border.
          </p>
          <p>
            Saul&apos;s own family had not fared nearly as well across these chapters. Saul and his son
            Jonathan died together in battle. Jonathan&apos;s young son was dropped and lamed while fleeing
            that same news, a detail{" "}
            <ArticleLink href="/blog/2-samuel-4-explained">2 Samuel 4</ArticleLink> already recorded. The last
            man standing from Saul&apos;s line, Ish-bosheth, was murdered by his own officers in that same
            chapter. By the time 2 Samuel 9 explained opens, it would be easy to assume Saul&apos;s whole
            household is simply gone. David does not assume that. He asks.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 2 Samuel 9 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. David&apos;s Question, and a Promise Made Long Before (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a king asking about the family of the man he replaced on the throne.</p>
        </div>
        <VerseQuote
          text="And David said, Is there yet any that is left of the house of Saul, that I may shew him kindness for Jonathan's sake?"
          reference="2 Samuel 9:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;For Jonathan&apos;s sake&quot; is the key to the whole chapter, stated in its
            very first verse.</strong> This is not a new idea David has just had. Years earlier, Jonathan had
            made David swear something specific.
          </p>
        </div>
        <VerseQuote
          text="Then Jonathan and David made a covenant, because he loved him as his own soul."
          reference="1 Samuel 18:3"
        />
        <VerseQuote
          text="But also thou shalt not cut off thy kindness from my house for ever: no, not when the LORD hath cut off the enemies of David every one from the face of the earth."
          reference="1 Samuel 20:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <ArticleLink href="/blog/1-samuel-20-explained">1 Samuel 20</ArticleLink> recorded Jonathan
            asking David, long before either of them knew how things would end, to keep showing kindness to
            his family even after Jonathan was gone and David had already won. David has now won. Jonathan
            has now been gone for several chapters. This is the moment the old promise comes due, and no one
            on earth is left to hold David to it but David himself.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Ziba, and the Search for Jonathan&apos;s Son (verses 2 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David does not know where to look, so he starts with someone who used to work for Saul&apos;s house.</p>
        </div>
        <VerseQuote
          text="And there was of the house of Saul a servant whose name was Ziba. And when they had called him unto David, the king said unto him, Art thou Ziba? And he said, Thy servant is he."
          reference="2 Samuel 9:2"
        />
        <VerseQuote
          text="And the king said, Is there not yet any of the house of Saul, that I may shew the kindness of God unto him? And Ziba said unto the king, Jonathan hath yet a son, which is lame on his feet."
          reference="2 Samuel 9:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice David&apos;s own words shift between verse 1 and verse 3. First he calls it kindness for
            Jonathan&apos;s sake. Here he calls it &quot;the kindness of God.&quot; David is treating keeping
            his word to a dead friend as something closer to an act of worship than a personal favor.
          </p>
        </div>
        <VerseQuote
          text="And the king said unto him, Where is he? And Ziba said unto the king, Behold, he is in the house of Machir, the son of Ammiel, in Lodebar."
          reference="2 Samuel 9:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ Lodebar sat east of the Jordan, and its name is usually read as &quot;no pasture,&quot; a plain,
            forgettable place to disappear into. A grandson of a king is living somewhere nobody would think
            to look for royalty. That is exactly where David goes looking anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Mephibosheth Brought In, Afraid (verses 5 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David sends for the man by name, and the meeting does not start the way a free gift usually feels.</p>
        </div>
        <VerseQuote
          text="Now when Mephibosheth, the son of Jonathan, the son of Saul, was come unto David, he fell on his face, and did reverence. And David said, Mephibosheth. And he answered, Behold thy servant!"
          reference="2 Samuel 9:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Mephibosheth was five years old when Saul and Jonathan died and he was lamed fleeing the news,
            the exact account{" "}
            <ArticleLink href="/blog/2-samuel-4-explained">2 Samuel 4</ArticleLink> already gave. He has spent
            his entire life as the surviving heir of the king David replaced. Being summoned to David&apos;s
            court is not obviously good news to a man in that position. He falls on his face expecting the
            worst.
          </p>
        </div>
        <VerseQuote
          text="And David said unto him, Fear not: for I will surely shew thee kindness for Jonathan thy father's sake, and will restore thee all the land of Saul thy father; and thou shalt eat bread at my table continually."
          reference="2 Samuel 9:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;For Jonathan&apos;s sake&quot; appears again, word for word, exactly as it did in
            verse 1.</strong> David is not improvising comfort on the spot. He is telling Mephibosheth plainly
            what this whole visit is actually about, and why he has nothing to fear.
          </p>
          <p>Mephibosheth&apos;s own answer says more about how he sees himself than anything David has said yet.</p>
        </div>
        <VerseQuote
          text="And he bowed himself, and said, What is thy servant, that thou shouldest look upon such a dead dog as I am?"
          reference="2 Samuel 9:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;A dead dog&quot; is the exact phrase David himself once used about his own life.</strong>{" "}
            Years earlier, hiding from Saul in a cave,{" "}
            <ArticleLink href="/blog/1-samuel-24-explained">David asked Saul the same question in reverse
            </ArticleLink>: why a king would chase down something as worthless as a dead dog.
          </p>
        </div>
        <VerseQuote
          text="After whom is the king of Israel come out? after whom dost thou pursue? after a dead dog, after a flea."
          reference="1 Samuel 24:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The man David once was, hunted and worthless in his own words, is the same language the last
            heir of his former enemy now uses about himself. David is standing exactly where he once stood,
            except now he is the king, and he is the one choosing not to treat a dead dog as one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. David Restores the Land, and Puts Ziba to Work (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David does not just speak kindness. He immediately gives orders to make it real.</p>
        </div>
        <VerseQuote
          text="Then the king called to Ziba, Saul's servant, and said unto him, I have given unto thy master's son all that pertained to Saul and to all his house."
          reference="2 Samuel 9:9"
        />
        <VerseQuote
          text="Thou therefore, and thy sons, and thy servants, shall till the land for him, and thou shalt bring in the fruits, that thy master's son may have food to eat: but Mephibosheth thy master's son shall eat bread alway at my table. Now Ziba had fifteen sons and twenty servants."
          reference="2 Samuel 9:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Ziba, once a servant of the house that lost everything, suddenly runs a large
            operation again.</strong> Fifteen sons and twenty servants are now working land that belongs on
            paper to Mephibosheth, so that Mephibosheth himself never has to farm a single acre of it. His
            food is already guaranteed anyway. He eats at David&apos;s table, not from his own fields.
          </p>
          <p>
            💡 The arrangement is specific, not vague. Mephibosheth gets the land back in full, Ziba gets
            put to work running it, and neither man&apos;s role is left for either of them to figure out
            later.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Permanent Seat at the King&apos;s Table (verses 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ziba accepts the assignment without complaint, and the chapter closes on exactly where Mephibosheth ends up living.</p>
        </div>
        <VerseQuote
          text="Then said Ziba unto the king, According to all that my lord the king hath commanded his servant, so shall thy servant do. As for Mephibosheth, said the king, he shall eat at my table, as one of the king's sons."
          reference="2 Samuel 9:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;As one of the king&apos;s sons&quot; is the strongest line in the chapter.</strong>{" "}
            Mephibosheth is not a tolerated guest or a pensioner kept quiet in the countryside. The surviving
            heir of the dynasty David&apos;s own throne replaced is placed at David&apos;s family table as
            family.
          </p>
        </div>
        <VerseQuote
          text="And Mephibosheth had a young son, whose name was Micha. And all that dwelt in the house of Ziba were servants unto Mephibosheth."
          reference="2 Samuel 9:12"
        />
        <VerseQuote
          text="So Mephibosheth dwelt in Jerusalem: for he did eat continually at the king's table; and was lame on both his feet."
          reference="2 Samuel 9:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The chapter ends the same way it introduced him, naming his lameness one more time. Nothing
            about his condition changed. What changed is everything around it: a house, a son of his own,
            servants working for him instead of the other way around, and a permanent place in Jerusalem at
            the very table of the king whose rise ended his grandfather&apos;s dynasty.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 2 Samuel 9 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was David&apos;s kindness only political, a way to keep a possible rival close and
            watched?</strong> What the text says: verses 1 and 7 both give the same reason, &quot;for
            Jonathan&apos;s sake,&quot; without mentioning any concern about Mephibosheth as a threat. How
            this is read: most readers take the stated motive at face value, since the text had already shown
            David mourning Saul and Jonathan honestly after their deaths and never treats this chapter as a
            containment strategy. Bringing Mephibosheth to live permanently in Jerusalem would also make him
            easier to watch, so both things can be true without the text choosing between them.
          </p>
          <p>
            <strong>When did this actually happen in David&apos;s reign?</strong> What the text says: the
            chapter gives no date, and it sits here in the narrative right after the conquests of{" "}
            <ArticleLink href="/blog/2-samuel-8-explained">2 Samuel 8</ArticleLink>. How this is read: some
            readers place it early in David&apos;s reign, since searching for Saul&apos;s heir reads like an
            early act of a new king settling his throne. Others point out that Mephibosheth already has a
            young son by verse 12, which takes years, suggesting this chapter may describe something that
            actually happened well into David&apos;s reign, simply placed here by theme rather than by strict
            timeline.
          </p>
          <p>
            <strong>Why does Mephibosheth call himself &quot;a dead dog&quot; instead of simply thanking
            David?</strong> What the text says: verse 8 records the phrase exactly, with no explanation
            attached. How this is read: this was common court language for extreme self abasement before a
            king who held the power of life and death, and it carries extra weight here because David used
            the identical phrase about his own life in 1 Samuel 24:14. Most readers take it as a genuinely
            desperate man, not false modesty.
          </p>
          <p>
            <strong>Was Ziba trustworthy?</strong> What the text says: 2 Samuel 9 shows him simply obeying
            David&apos;s order without objection. How this is read: later chapters complicate this picture.
            During Absalom&apos;s revolt, Ziba brings David supplies and tells him Mephibosheth stayed behind
            hoping to reclaim the kingdom, and David gives Ziba all of Mephibosheth&apos;s property on the
            spot. When David returns afterward, Mephibosheth says Ziba lied and deceived him, and David
            simply splits the land between them without ruling on who told the truth. Nothing in 2 Samuel 9
            itself raises any doubt about Ziba, so this chapter should be read for what it says, not for what
            happens to the same two men much later.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 2 Samuel 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Samuel 9:1</h3>
        <VerseQuote
          text="And David said, Is there yet any that is left of the house of Saul, that I may shew him kindness for Jonathan's sake?"
          reference="2 Samuel 9:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A king at the height of his power going out of his way to find someone to keep an old promise to,
          long after the man who asked for it is gone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Samuel 9:7</h3>
        <VerseQuote
          text="And David said unto him, Fear not: for I will surely shew thee kindness for Jonathan thy father's sake, and will restore thee all the land of Saul thy father; and thou shalt eat bread at my table continually."
          reference="2 Samuel 9:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment fear turns into a standing invitation, built on a covenant Mephibosheth had nothing to
          do with making.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 9:8</h3>
        <VerseQuote
          text="And he bowed himself, and said, What is thy servant, that thou shouldest look upon such a dead dog as I am?"
          reference="2 Samuel 9:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A man describing himself with the exact words David once used about his own life, right before
          receiving far more than he thought he deserved.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Samuel 9:11</h3>
        <VerseQuote
          text="As for Mephibosheth, said the king, he shall eat at my table, as one of the king's sons."
          reference="2 Samuel 9:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The grandson of the dynasty David replaced, given a permanent place in David&apos;s own household
          as family, not as a tolerated guest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Samuel 20:14 and 15</h3>
        <VerseQuote
          text="And thou shalt not only while yet I live shew me the kindness of the LORD, that I die not: But also thou shalt not cut off thy kindness from my house for ever."
          reference="1 Samuel 20:14 and 15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The original promise, made years before this chapter, that 2 Samuel 9 is David quietly keeping in
          full.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 2 Samuel 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 2 Samuel 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          David asks if anyone from Saul&apos;s house is still alive so he can show them kindness for
          Jonathan&apos;s sake. He finds Mephibosheth, Jonathan&apos;s lame son, through a former servant
          named Ziba, restores Saul&apos;s land to him, and gives him a permanent seat at the king&apos;s own
          table for the rest of his life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Mephibosheth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He was Jonathan&apos;s son and Saul&apos;s grandson, lamed in both feet as a young child while
          fleeing the news of his father and grandfather&apos;s deaths, a story told fully in{" "}
          <ArticleLink href="/blog/2-samuel-4-explained">2 Samuel 4</ArticleLink>. By the time this chapter
          finds him, he is living quietly in Lodebar, far from David&apos;s court.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did David show kindness to Mephibosheth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 1 and 7 both give the identical reason: &quot;for Jonathan&apos;s sake.&quot; David was
          keeping a covenant he made with Jonathan years earlier, recorded in 1 Samuel 20, to never cut off
          kindness from Jonathan&apos;s family.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Mephibosheth call himself &quot;a dead dog&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was extreme language for someone utterly worthless before a king who could have had him killed
          on sight. David had used the same exact phrase about his own life in 1 Samuel 24:14, years earlier,
          while hiding from Saul.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What land did David give back to Mephibosheth?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 9 says David restored &quot;all that pertained unto Saul and to all his house,&quot; the full
          family estate that had belonged to Saul before his death.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Ziba?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He had been a servant of Saul&apos;s household. David used him to locate Mephibosheth, then put him
          in charge of farming Mephibosheth&apos;s restored land with his own fifteen sons and twenty
          servants, named directly in verse 10.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Mephibosheth ate &quot;at the king&apos;s table&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It meant he lived permanently in Jerusalem as part of David&apos;s own household, verse 11 says
          &quot;as one of the king&apos;s sons,&quot; sharing in the royal family&apos;s daily provision rather
          than surviving on his own restored farmland.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Mephibosheth stay loyal to David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter does not address it, since the question only comes up later during Absalom&apos;s
          revolt, when Ziba and Mephibosheth give conflicting accounts of where Mephibosheth&apos;s loyalty
          actually stood. 2 Samuel 9 itself ends with nothing but gratitude recorded on Mephibosheth&apos;s
          side.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Mephibosheth&apos;s story a picture of grace?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many readers see it that way. A man from a fallen house, by his own words worth no more than a dead
          dog, is given back everything and adopted into the king&apos;s own family table, none of it earned
          and all of it owed to a promise made by someone else on his behalf.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 2 Samuel 9 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It completes the covenant David made with Jonathan all the way back in 1 Samuel 18 and 20,
          showing a promise kept years after the man who asked for it had died, with no one left who could
          have forced David to honor it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>2 Samuel 9 has no battle in it, and it may still be one of the most important chapters in David&apos;s whole story.</p>
          <p>
            📌 <strong>Kindness kept years later is worth more than kindness promised in the moment.</strong>{" "}
            Jonathan asked for this in 1 Samuel 20. He never lived to see David actually do it. David kept the
            promise anyway, to a man who could not have held him to it.
          </p>
          <p>
            📌 <strong>Grace finds people who have already written themselves off.</strong> Mephibosheth
            called himself a dead dog before he knew what David was about to give him. He is restored while
            still convinced he does not deserve to be found.
          </p>
          <p>
            📌 <strong>Real kindness gets specific.</strong> David does not just say kind words. He names the
            land, names the servant who will work it, and names the table Mephibosheth will eat at for the
            rest of his life.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of a promise you made to someone who is no longer here to ask you about it, and ask
            yourself honestly whether you have actually kept it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
