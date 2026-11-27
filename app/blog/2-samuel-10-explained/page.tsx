import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("2-samuel-10-explained", {
  title: "2 Samuel 10 Explained: The Insult That Started a War",
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

export default function TwoSamuelTenExplainedPage() {
  return (
    <BlogPostShell
      slug="2-samuel-10-explained"
      title={<>📖 2 Samuel 10 Explained: The Insult That Started a War</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>David sends a few of his men to say he is sorry for a loss. They come home half shaved and half naked.</p>
            <p>
              <strong>2 Samuel 10 explained</strong> is the chapter where a simple act of kindness gets read as
              a threat, and that one wrong guess drags two nations and an army of hired mercenaries into a war
              nobody needed to fight. Ammon has a new king. David sends comforters. Ammon&apos;s own advisors
              talk their king into an insult he cannot take back.
            </p>
            <p>Maybe you know what it is like to have a good move of yours read as something it never was.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did Hanun trust his advisors over David&apos;s own history with his father?</li>
            <li>❓ What kindness had Nahash actually shown David in the first place?</li>
            <li>❓ Why does David tell his humiliated men to stay away from Jerusalem until their beards grow back?</li>
            <li>❓ How does one bad decision at a gate turn into a war against two nations at once?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>One king&apos;s fear costs his own nation an army, an alliance, and any claim to being
              the one who was wronged.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the comforters sent in good faith, the
              humiliation at the gate, the mercenary army Ammon hires to cover its own mistake, and the two
              front battle Joab wins before David ever has to put on his own armor.
            </p>
            <p>Read slowly. This chapter is what happens when suspicion beats trust, and what it costs everyone who chose it.</p>
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
            <ArticleLink href="/blog/2-samuel-9-explained">2 Samuel 9</ArticleLink> showed David at his most
            generous, tracking down Jonathan&apos;s lame son Mephibosheth in Lodebar and giving him back
            everything Saul&apos;s family had lost. That search ran through a man named Machir, son of
            Ammiel, who had been sheltering Mephibosheth. Keep that name in mind. It shows up again before
            this story is finished, long after this chapter ends.
          </p>
          <p>
            Before that, <ArticleLink href="/blog/2-samuel-8-explained">2 Samuel 8</ArticleLink> recorded
            David beating back the Philistines, Moab, Edom, and Hadadezer king of Zobah and his Syrian
            allies, dedicating the plunder to the LORD instead of keeping it. David&apos;s kingdom is secure
            on every border by the time 2 Samuel 10 opens. Nothing in the first verse suggests any of that is
            about to change.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 2 Samuel 10 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A King&apos;s Kindness Returned With Suspicion (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a death, and a king who remembers an old debt of gratitude.</p>
        </div>
        <VerseQuote
          text="And it came to pass after this, that the king of the children of Ammon died, and Hanun his son reigned in his stead."
          reference="2 Samuel 10:1"
        />
        <VerseQuote
          text="Then said David, I will shew kindness unto Hanun the son of Nahash, as his father shewed kindness unto me. And David sent to comfort him by the hand of his servants for his father. And David's servants came into the land of the children of Ammon."
          reference="2 Samuel 10:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>David is paying back a kindness, not starting a relationship from nothing.</strong>{" "}
            Something Nahash once did for David mattered enough that David wants his son treated the same
            way, in the exact moment a new king is most unsteady on his throne and most likely to misread
            anything.
          </p>
          <p>That is exactly what happens.</p>
        </div>
        <VerseQuote
          text="And the princes of the children of Ammon said unto Hanun their lord, Thinkest thou that David doth honour thy father, that he hath sent comforters unto thee? hath not David rather sent his servants unto thee, to search the city, and to spy it out, and to overthrow it?"
          reference="2 Samuel 10:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice nothing in that sentence is evidence. It is a question built to sound like one. Hanun is
            new to his throne, surrounded by advisors who have never seen David keep a promise to their
            nation, and they talk him into treating a funeral visit as reconnaissance for an invasion.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Humiliation at the Gate (verses 4 and 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hanun does not simply turn the men away. He sends them home changed.</p>
        </div>
        <VerseQuote
          text="Wherefore Hanun took David's servants, and shaved off the one half of their beards, and cut off their garments in the middle, even to their buttocks, and sent them away."
          reference="2 Samuel 10:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A man&apos;s beard carried his dignity in that world. Cutting half of it off did not just look
            strange, it marked a man as disgraced everywhere he went until it grew back. Cutting the robe off
            at the waist added public exposure to public shame. This was not a prank. It was a calculated,
            double insult aimed at men who had come offering comfort, not a threat.
          </p>
        </div>
        <VerseQuote
          text="When they told it unto David, he sent to meet them, because the men were greatly ashamed: and the king said, Tarry at Jericho until your beards be grown, and then return."
          reference="2 Samuel 10:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Jericho sat near the Jordan crossing, close enough to reach quickly but far enough from
            Jerusalem to keep these men out of public view. David&apos;s first act is not outrage. It is
            protection, giving his humiliated men time and distance to recover before anyone else in the
            capital has to see them like this.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Ammon Hires a Mercenary Army It Cannot Afford (verse 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Ammon knows exactly what it has just done, and starts preparing for the consequences before David even responds.</p>
        </div>
        <VerseQuote
          text="And when the children of Ammon saw that they stank before David, the children of Ammon sent and hired the Syrians of Bethrehob, and the Syrians of Zoba, twenty thousand footmen, and of king Maacah a thousand men, and of Ishtob twelve thousand men."
          reference="2 Samuel 10:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Stank before David&quot; is a Hebrew way of saying Ammon knew it had made itself odious, not
            that anyone smelled anything. Rather than send word of apology, Hanun hires thirty three thousand
            soldiers from four small Syrian kingdoms north of Israel. 📌{" "}
            <strong>An insult that could have ended with an apology instead buys an army.</strong> Ammon has
            just turned an avoidable misunderstanding into a war it will have to fight on its own soil.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Joab&apos;s Two Front Battle Plan (verses 7 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David does not go himself. He sends his general with the full army.</p>
        </div>
        <VerseQuote
          text="And when David heard of it, he sent Joab, and all the host of the mighty men."
          reference="2 Samuel 10:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joab arrives to find himself caught between two forces at once, exactly the position a smaller army dreads.</p>
        </div>
        <VerseQuote
          text="When Joab saw that the front of the battle was against him before and behind, he chose of all the choice men of Israel, and put them in array against the Syrians: And the rest of the people he delivered into the hand of Abishai his brother, that he might put them in array against the children of Ammon."
          reference="2 Samuel 10:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The Ammonites held the ground at their own city gate. The hired Syrians camped out in the open
            field behind Joab. Rather than panic, Joab splits his army, keeps the stronger troops against the
            stronger threat, the Syrians, and hands his brother Abishai the rest against Ammon. Then he makes
            the plan mutual.
          </p>
        </div>
        <VerseQuote
          text="And he said, If the Syrians be too strong for me, then thou shalt help me: but if the children of Ammon be too strong for thee, then I will come and help thee. Be of good courage, and let us play the men for our people, and for the cities of our God: and the LORD do that which seemeth him good."
          reference="2 Samuel 10:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joab plans for failure and still hands the outcome to God.</strong> He does not promise
            victory. He promises his brother backup if things go wrong, then tells both halves of his army to
            fight hard anyway and let the LORD decide what good looks like.
          </p>
        </div>
        <VerseQuote
          text="And Joab drew nigh, and the people that were with him, unto the battle against the Syrians: and they fled before him. And when the children of Ammon saw that the Syrians were fled, then fled they also before Abishai, and entered into the city. So Joab returned from the children of Ammon, and came to Jerusalem."
          reference="2 Samuel 10:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Both plans work in the same instant. The Syrians break first, and the Ammonites, who only hired
            the Syrians to begin with because they were afraid to face David alone, break the moment their
            paid help does. Joab wins a two front battle without David ever leaving Jerusalem.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. David Finishes What Joab Started at Helam (verses 15 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One battle is not the end of it. The Syrians regroup for a second attempt, bigger than the first.</p>
        </div>
        <VerseQuote
          text="And when the Syrians saw that they were smitten before Israel, they gathered themselves together. And Hadarezer sent, and brought out the Syrians that were beyond the river: and they came to Helam; and Shobach the captain of the host of Hadarezer went before them."
          reference="2 Samuel 10:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the same Hadadezer <ArticleLink href="/blog/2-samuel-8-explained">2 Samuel 8</ArticleLink>{" "}
            already recorded David defeating, here spelled Hadarezer, the kind of small spelling shift that
            shows up more than once between Hebrew names copied across different chapters and books. He is
            not giving up after one lost battle. He is calling in reinforcements from beyond the Euphrates.
          </p>
          <p>This time David goes in person.</p>
        </div>
        <VerseQuote
          text="And when it was told David, he gathered all Israel together, and passed over Jordan, and came to Helam. And the Syrians set themselves in array against David, and fought with him."
          reference="2 Samuel 10:17"
        />
        <VerseQuote
          text="And the Syrians fled before Israel; and David slew the men of seven hundred chariots of the Syrians, and forty thousand horsemen, and smote Shobach the captain of their host, who died there."
          reference="2 Samuel 10:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The scale of the threat decided how much of himself David had to give.</strong> Joab
            and Abishai handled Ammon and the first Syrian force on their own. When Hadarezer answered with
            an even larger coalition, David crossed the Jordan himself rather than leave it to his generals
            a second time.
          </p>
        </div>
        <VerseQuote
          text="And when all the kings that were servants to Hadarezer saw that they were smitten before Israel, they made peace with Israel, and served them. So the Syrians feared to help the children of Ammon any more."
          reference="2 Samuel 10:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter closes on an alliance David never asked to break. Every Syrian kingdom that had been
            propping up Ammon now makes peace with Israel instead, and Ammon is left to face David completely
            alone, exactly what Hanun&apos;s advisors claimed they were trying to prevent.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 2 Samuel 10 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What kindness had Nahash actually shown David?</strong> What the text says: verse 2 states
            only that Nahash &quot;shewed kindness&quot; to David, without any further detail anywhere in
            Samuel or Chronicles. How this is read: Nahash and Saul were already enemies, recorded back in{" "}
            <ArticleLink href="/blog/1-samuel-11-explained">1 Samuel 11</ArticleLink>, when Nahash besieged
            Jabesh-gilead before Saul relieved the city. Many readers connect the dots and assume Nahash
            quietly favored David during his years as a fugitive from Saul, since the two men shared the same
            enemy, but Scripture never says this directly. It should be read as a real but unrecorded kindness,
            not a guess dressed up as fact.
          </p>
          <p>
            <strong>Why did Hanun believe his advisors over his father&apos;s own history with David?</strong>{" "}
            What the text says: verse 3 gives the princes&apos; accusation with no evidence attached and no
            response from Hanun recorded before he acts on it. How this is read: a new king, untested and
            surrounded by voices eager to prove loyalty by sounding suspicious, is read by most commentators
            as more afraid of looking weak in front of his own court than actually convinced David meant harm.
            The text supports that reading without stating it outright.
          </p>
          <p>
            <strong>Why do 2 Samuel 10 and 1 Chronicles 19 give different numbers for the second battle?</strong>{" "}
            What the text says: 2 Samuel 10:18 records David defeating &quot;seven hundred chariots&quot; and
            &quot;forty thousand horsemen.&quot;
          </p>
          <VerseQuote
            text="But the Syrians fled before Israel; and David slew of the Syrians seven thousand men which fought in chariots, and forty thousand footmen, and killed Shophach the captain of the host."
            reference="1 Chronicles 19:18"
          />
          <p>
            How this is read: the two accounts agree completely on forty thousand men, on the result, and on
            the captain&apos;s death, but differ on whether seven hundred or seven thousand fought in chariots,
            and whether the other forty thousand were horsemen or footmen. Most conservative readers treat
            this as a copying variation in how ancient Hebrew numerals were transmitted across centuries of
            manuscripts, since Hebrew letters doubled as numbers and were easy to miscopy, rather than a real
            disagreement about what happened. Neither account is treated as less reliable than the other.
          </p>
          <p>
            <strong>Is this really the same war that leads into the next chapter?</strong> What the text says:
            2 Samuel 10 ends with Syria making peace, but Ammon itself is never actually conquered in this
            chapter, only driven back twice. How this is read: the siege against Ammon&apos;s capital city
            keeps running in the background of the very next events in David&apos;s life, and does not
            actually close until several chapters later, when Joab finally takes the city. 2 Samuel 10 settles
            the question of who would help Ammon. It does not settle Ammon itself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 2 Samuel 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Samuel 10:2</h3>
        <VerseQuote
          text="Then said David, I will shew kindness unto Hanun the son of Nahash, as his father shewed kindness unto me."
          reference="2 Samuel 10:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A king keeping an old debt of gratitude alive toward a son he has never met, right before that son&apos;s
          own advisors turn the gesture into an accusation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Samuel 10:4</h3>
        <VerseQuote
          text="Wherefore Hanun took David's servants, and shaved off the one half of their beards, and cut off their garments in the middle, even to their buttocks, and sent them away."
          reference="2 Samuel 10:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The insult that turns a funeral visit into the opening act of a war, aimed at men who had come to
          offer comfort, not a threat.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 10:12</h3>
        <VerseQuote
          text="Be of good courage, and let us play the men for our people, and for the cities of our God: and the LORD do that which seemeth him good."
          reference="2 Samuel 10:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Joab&apos;s order to his own army before a battle on two fronts, handing the outcome to God without
          ever pretending the fight is already won.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Samuel 10:19</h3>
        <VerseQuote
          text="And when all the kings that were servants to Hadarezer saw that they were smitten before Israel, they made peace with Israel, and served them. So the Syrians feared to help the children of Ammon any more."
          reference="2 Samuel 10:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact outcome Hanun&apos;s advisors claimed they were preventing, arriving anyway because of the
          choice they talked their king into making.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Samuel 17:27 to 29</h3>
        <VerseQuote
          text="And it came to pass, when David was come to Mahanaim, that Shobi the son of Nahash of Rabbah of the children of Ammon, and Machir the son of Ammiel of Lodebar, and Barzillai the Gileadite of Rogelim, Brought beds, and basons, and earthen vessels, and wheat, and barley, and flour, and parched corn, and beans, and lentiles, and parched pulse, And honey, and butter, and sheep, and cheese of kine, for David, and for the people that were with him, to eat: for they said, The people is hungry, and weary, and thirsty, in the wilderness."
          reference="2 Samuel 17:27 to 29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Years later, a son of this very Nahash feeds David during Absalom&apos;s revolt, alongside Machir of
          Lodebar, the same man who once sheltered Mephibosheth. The war this chapter starts does not stop
          Ammon&apos;s own royal line from ending up on David&apos;s side.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 2 Samuel 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 2 Samuel 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          David sends comforters to the new Ammonite king Hanun after his father Nahash dies. Hanun&apos;s
          advisors convince him the men are spies, so he shaves off half their beards and cuts their clothes.
          Ammon then hires Syrian mercenaries, and Joab defeats both armies in a two front battle before
          David personally defeats a second, larger Syrian force at Helam.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Hanun in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hanun was the son of Nahash and the new king of the Ammonites, whose decision to humiliate David&apos;s
          envoys in verse 4 started the war this chapter and the next several chapters describe.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Hanun shave David&apos;s servants&apos; beards?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          His princes convinced him David&apos;s comforters were actually spies sent to scout the city for an
          invasion, recorded in verse 3. Shaving half their beards and cutting their robes was his way of
          sending that accusation back to David in the most public, humiliating form possible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was a shaved beard such a big insult in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A man&apos;s beard was tied directly to his dignity and standing in that culture. Cutting off half
          of it, paired with cutting his garment up to the waist, marked a man as disgraced in public until
          both grew or were replaced, which is exactly why David told his men to wait at Jericho first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were the Syrians David fought in 2 Samuel 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 6 names mercenaries from Bethrehob, Zoba, Maacah, and Ishtob, small Aramean kingdoms Ammon
          hired for thirty three thousand soldiers. Hadarezer, the same king David had already fought in{" "}
          <ArticleLink href="/blog/2-samuel-8-explained">2 Samuel 8</ArticleLink>, later sent a second, larger
          Syrian force from beyond the Euphrates.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that David told his men to tarry at Jericho?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 5 has David meeting his humiliated servants and telling them to stay in Jericho until their
          beards grew back rather than come straight into Jerusalem. It was a protective decision, sparing
          them public shame while they recovered.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Joab split his army into two groups?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 9 says the Ammonites and the hired Syrians attacked from the front and the rear at the same
          time. Joab took the stronger troops against the Syrians himself and gave the rest to his brother
          Abishai against the Ammonites, with each side promising to help the other if needed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between 2 Samuel 10 and 1 Chronicles 19?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The two accounts tell the same story and agree on the outcome, but 2 Samuel 10:18 lists seven
          hundred chariots and forty thousand horsemen while 1 Chronicles 19:18 lists seven thousand
          charioteers and forty thousand footmen. Most readers treat this as a numeral copying difference
          between manuscripts rather than a real contradiction.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 2 Samuel 10 connect to the rest of David&apos;s story?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter sets up the ongoing siege of Ammon&apos;s capital that runs in the background of what
          happens next in David&apos;s life, and the mercy David once showed Nahash eventually comes back
          around through Nahash&apos;s other son Shobi, who helps feed David during Absalom&apos;s revolt years
          later.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>2 Samuel 10 has no villain monologuing in the dark. It just has one bad guess, acted on too fast.</p>
          <p>
            📌 <strong>Suspicion always costs more than trust would have.</strong> Hanun&apos;s guess about
            David&apos;s motives started a war his own father never had to fight, and every bit of that cost
            landed on Ammon, not David.
          </p>
          <p>
            📌 <strong>An insult looks for a reason. Trust does not need one.</strong> David sent comforters
            for a reason he had already proven years earlier. Hanun&apos;s princes supplied a reason that
            fit their fear, not the facts in front of them.
          </p>
          <p>
            📌 <strong>How much you have to give depends on how big the threat actually is.</strong> Joab and
            Abishai were enough for the first battle. When Hadarezer came back with more, David went himself.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of one relationship where you have read someone&apos;s kindness as a hidden motive, and go
            find out if you were actually right.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
