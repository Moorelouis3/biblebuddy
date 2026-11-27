import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("2-samuel-11-explained", {
  title: "2 Samuel 11 Explained: David, Bathsheba, and a Cover Up",
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

export default function TwoSamuelElevenExplainedPage() {
  return (
    <BlogPostShell
      slug="2-samuel-11-explained"
      title={<>📖 2 Samuel 11 Explained: David, Bathsheba, and a Cover Up</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>An army is out fighting a war. The king is home, alone, with time on his hands.</p>
            <p>
              <strong>2 Samuel 11 explained</strong> is the chapter where the Bible stops talking about David
              the giant killer and starts telling the truth about David the man. He sees a woman from his
              roof. He sends for her. When a child comes from it, he spends the rest of the chapter trying to
              bury what he started, first with a husband he calls home, then with a letter he hands that
              husband to carry to his own death.
            </p>
            <p>Maybe you know what it feels like to tell one small lie, and then have to keep building on it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why was David even home while his army was away fighting?</li>
            <li>❓ Why did Uriah refuse to go home to his own wife, twice?</li>
            <li>❓ What exactly did David ask Joab to do, and what did Joab understand without being told?</li>
            <li>❓ Why does the chapter end so quietly, with no judge, no prophet, no punishment yet?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every step in this chapter is David trying to manage a problem he created, and every
              step makes the problem bigger.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the roof, the summons, Uriah&apos;s
              two refusals to go home, the letter, the battle built to kill one man, and the one sentence that
              closes the chapter and changes how you have to read everything in it.
            </p>
            <p>Read slowly. This is the chapter where the king who wrote half the Psalms becomes the man who needed one written about him.</p>
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
            <ArticleLink href="/blog/2-samuel-10-explained">2 Samuel 10</ArticleLink> ended with Ammon
            crushed on two fronts and every Syrian king who had backed them making peace with Israel
            instead. Rabbah, Ammon&apos;s capital, was still standing, and the siege against it was still
            running when this chapter opens. Joab is still out there finishing what that war started.
          </p>
          <p>
            David had already gone to the battlefield himself once in that same conflict, crossing the
            Jordan to fight the second Syrian army at Helam. This time, with Joab and the army sent back out
            to besiege Rabbah, David does not go. That one small change in his routine is where this chapter
            begins.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 2 Samuel 11 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A King Who Stays Behind (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a calendar note that matters more than it looks.</p>
        </div>
        <VerseQuote
          text="And it came to pass, after the year was expired, at the time when kings go forth to battle, that David sent Joab, and his servants with him, and all Israel; and they destroyed the children of Ammon, and besieged Rabbah. But David tarried still at Jerusalem."
          reference="2 Samuel 11:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Spring was campaigning season in that part of the world. Once the rainy months passed and the
            roads dried out, kings took their armies to war. David had done exactly that every other time
            this war came up. This time the verse points it out on purpose: Joab goes, the army goes, Israel
            goes, and David stays.
          </p>
          <p>
            📌 <strong>The verse does not say David sinned by staying home. It says it so you notice what
            else happens while he is there with nothing to do.</strong> A king with no battle to fight still
            has a kingdom to run, but this chapter is about to show what fills the space when he stops
            filling it with what he is supposed to be doing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Roof, the Glance, and the Sin (verses 2 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One evening, David takes a walk on his own roof.</p>
        </div>
        <VerseQuote
          text="And it came to pass in an eveningtide, that David arose from off his bed, and walked upon the roof of the king's house: and from the roof he saw a woman washing herself; and the woman was very beautiful to look upon."
          reference="2 Samuel 11:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Flat rooftops in Jerusalem caught the evening breeze, so David walking there was not unusual. The
            chapter is careful about the order of events: he sees her, and the text says she was beautiful,
            but seeing is not yet the sin. What David does next is.
          </p>
        </div>
        <VerseQuote
          text="And David sent and enquired after the woman. And one said, Is not this Bathsheba, the daughter of Eliam, the wife of Uriah the Hittite?"
          reference="2 Samuel 11:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice how much David is told in one sentence. Her name. Her father&apos;s name. Her
            husband&apos;s name and nationality. Whoever answers David already knows this is a married
            woman, and says so before David sends for her anyway. Nobody in the verse is confused about
            whose wife she is, David included.
          </p>
          <p>
            You can read more about who she was and what this cost her in{" "}
            <ArticleLink href="/blog/who-was-bathsheba">the full story of Bathsheba</ArticleLink>.
          </p>
        </div>
        <VerseQuote
          text="And David sent messengers, and took her; and she came in unto him, and he lay with her; for she was purified from her uncleanness: and she returned unto her house."
          reference="2 Samuel 11:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The detail about her purification is not there for color. It confirms she was not already
            pregnant by Uriah, which becomes important the moment she sends word to David in the very next
            verse.
          </p>
        </div>
        <VerseQuote text="And the woman conceived, and sent and told David, and said, I am with child." reference="2 Samuel 11:5" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Five verses take David from a rooftop to a pregnancy he cannot explain away.</strong>{" "}
            Uriah is at the front with the army. There is no version of the timeline where this child is his,
            and David knows it before he does anything else in this chapter.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Covering the Trail: Uriah Called Home (verses 6 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David&apos;s first move is not confession. It is a plan.</p>
        </div>
        <VerseQuote text="And David sent to Joab, saying, Send me Uriah the Hittite. And Joab sent Uriah to David." reference="2 Samuel 11:6" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pulling one soldier off the front line and summoning him to the palace would normally need a
            reason. David gives Uriah a strange one, asking about the war in general terms rather than
            anything specific, then sends him toward his own house with a gift following behind him.
          </p>
        </div>
        <VerseQuote
          text="And David said to Uriah, Go down to thy house, and wash thy feet. And Uriah departed out of the king's house, and there followed him a mess of meat from the king."
          reference="2 Samuel 11:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Wash thy feet&quot; was a polite way of telling a man to go home and rest, with a gift from
            the king&apos;s own table sent after him to make the evening feel like a reward rather than an
            order. If Uriah goes home to Bathsheba now, any child born later could pass as his. The plan only
            needs one night to work.
          </p>
          <p>It does not get that night.</p>
        </div>
        <VerseQuote text="But Uriah slept at the door of the king's house with all the servants of his lord, and went not down to his house." reference="2 Samuel 11:9" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David tries again, asking Uriah directly why he did not go home after traveling all the way from
            the war. Uriah&apos;s answer is the one moment in this chapter where someone says plainly what he
            will and will not do, and why.
          </p>
        </div>
        <VerseQuote
          text="And Uriah said unto David, The ark, and Israel, and Judah, abide in tents; and my lord Joab, and the servants of my lord, are encamped in the open fields; shall I then go into mine house, to eat and to drink, and to lie with my wife? as thou livest, and as thy soul liveth, I will not do this thing."
          reference="2 Samuel 11:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Uriah will not enjoy comforts his comrades do not have while they are still in danger,
            and he says so as an oath, not a preference.</strong> A Hittite by birth, serving a foreign king,
            he is living out a loyalty David himself is failing to keep in this same chapter. The contrast is
            not stated. It does not need to be.
          </p>
          <p>David&apos;s second plan is to remove Uriah&apos;s judgment instead of his conviction.</p>
        </div>
        <VerseQuote
          text="And when David had called him, he did eat and drink before him; and he made him drunk: and at even he went out to lie on his bed with the servants of his lord, but went not down to his house."
          reference="2 Samuel 11:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Even drunk, Uriah still will not go home. That is twice now that a loyal soldier, sober or not,
            holds a line the king of Israel could not hold on his own roof. David has run out of gentle
            options.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Letter That Became a Death Sentence (verses 14 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Having failed twice to cover the sin quietly, David ends the chapter&apos;s trail of smaller choices with one final, deliberate one.</p>
        </div>
        <VerseQuote text="And it came to pass in the morning, that David wrote a letter to Joab, and sent it by the hand of Uriah." reference="2 Samuel 11:14" />
        <VerseQuote
          text="And he wrote in the letter, saying, Set ye Uriah in the forefront of the hottest battle, and retire ye from him, that he may be smitten, and die."
          reference="2 Samuel 11:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Uriah personally carries the order for his own death back to the battlefield, never
            knowing what the letter says.</strong> David does not raise a hand himself. He uses the chain of
            command the same way he used a gift and a drink, as a tool to get an outcome without appearing
            to cause it.
          </p>
          <p>Joab follows the order exactly.</p>
        </div>
        <VerseQuote text="And it came to pass, when Joab observed the city, that he assigned Uriah unto a place where he knew that valiant men were." reference="2 Samuel 11:16" />
        <VerseQuote text="And the men of the city went out, and fought with Joab: and there fell some of the people of the servants of David; and Uriah the Hittite died also." reference="2 Samuel 11:17" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Uriah does not die alone. Other soldiers, loyal men with no part in David&apos;s sin, fall in
            the same assault because the only way to guarantee one death without it looking planned was to
            risk many. Covering up the first wrong does not stay contained to the first wrong.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Managing the Story Back Home (verses 18 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joab knows exactly how this will sound to David, and he prepares his messenger for it before the man even leaves camp.</p>
        </div>
        <VerseQuote
          text="And charged the messenger, saying, When thou hast made an end of telling the matters of the war unto the king, And if so be that the king's wrath arise, and he say unto thee, Wherefore approached ye so nigh unto the city when ye did fight? knew ye not that they would shoot from the wall?"
          reference="2 Samuel 11:19 and 20"
        />
        <VerseQuote
          text="Who smote Abimelech the son of Jerubbesheth? did not a woman cast a piece of a millstone upon him from the wall, that he died in Thebez? why went ye nigh the wall? then say thou, Thy servant Uriah the Hittite is dead also."
          reference="2 Samuel 11:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Joab is quoting history to defend a tactic he knows is risky. Generations earlier, the tyrant{" "}
            <strong>Abimelech</strong>, son of Gideon, died at the city of Thebez when a woman dropped a
            millstone on him from a wall during a siege. That old story was still well known enough that
            Joab expects David to ask why his men went close enough to a wall to die the same avoidable way.
          </p>
          <p>
            Joab&apos;s answer to that expected objection is one line, buried in the middle of a military
            report: <em>Uriah the Hittite is dead also.</em> He is telling the messenger to let David&apos;s
            attention land on the strategy question first, so the one death that actually matters arrives
            almost as an afterthought.
          </p>
        </div>
        <VerseQuote
          text="And the shooters shot from off the wall upon thy servants; and some of the king's servants be dead, and thy servant Uriah the Hittite is dead also."
          reference="2 Samuel 11:24"
        />
        <VerseQuote
          text="Then David said unto the messenger, Thus shalt thou say unto Joab, Let not this thing displease thee, for the sword devoureth one as well as another: make thy battle more strong against the city, and overthrow it: and encourage thou him."
          reference="2 Samuel 11:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>David&apos;s response is almost too calm.</strong> He waves off the very risk Joab
            feared he would question, tells him not to let it trouble him, and orders the siege pressed
            harder. The man who once could not stop Bathsheba&apos;s name from becoming an obsession now
            talks about her husband&apos;s death the way he would talk about weather delaying a campaign.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. A Wedding That Cannot Undo a Death (verses 26 and 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes quickly, almost as if it wants to move past itself.</p>
        </div>
        <VerseQuote text="And when the wife of Uriah heard that Uriah her husband was dead, she mourned for her husband." reference="2 Samuel 11:26" />
        <VerseQuote
          text="And when the mourning was past, David sent and fetched her to his house, and she became his wife, and bare him a son. But the thing that David had done displeased the LORD."
          reference="2 Samuel 11:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            On the surface, the story reads like it resolves itself. A widow is married, a son is born, the
            king&apos;s problem appears solved. Then the chapter ends on nine words that undo every bit of
            that appearance: <strong>the thing that David had done displeased the LORD.</strong>
          </p>
          <p>
            📌 <strong>No one in Jerusalem confronts David in this chapter. God does not stay silent, even
            when every human witness does.</strong> That sentence is the hinge the next chapter swings on,
            when the silence finally breaks through a prophet named Nathan.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 2 Samuel 11 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was Bathsheba a willing participant or a victim?</strong> What the text says: verse 4
            says David &quot;sent messengers, and took her,&quot; language that puts the initiative and the
            action entirely on the king. Bathsheba is never quoted speaking in this chapter, and nothing in
            the text records her consenting, refusing, or resisting. How this is read: a king who summons a
            subject&apos;s wife holds every bit of the power in that meeting, which is why Scripture elsewhere
            places the blame for this on David, not her. Reading her as equally guilty goes further than the
            text itself does.
          </p>
          <p>
            <strong>Why does Uriah refuse to go home, twice, even drunk?</strong> What the text says: verse 11
            has Uriah tie his refusal to an oath about his fellow soldiers still in the field, and verse 13
            shows the same result even after David gets him drunk. How this is read: most readers take this as
            genuine integrity rather than suspicion of David, since nothing in the chapter suggests Uriah knew
            anything was wrong. His loyalty to his comrades simply outlasted every attempt David made to
            loosen it.
          </p>
          <p>
            <strong>Did Joab know he was being asked to arrange a murder?</strong> What the text says: the
            letter in verse 15 gives Joab a direct, specific order naming Uriah and the outcome David wants.
            How this is read: verse 16 shows Joab carrying it out exactly, and verses 19 to 21 show him
            rehearsing a defense for the tactic before David even asks about it. Joab&apos;s later willingness
            to use this exact episode against David in{" "}
            <ArticleLink href="/blog/2-samuel-9-explained">other moments in David&apos;s reign</ArticleLink>{" "}
            suggests he understood precisely what he had been asked to do and filed it away.
          </p>
          <p>
            <strong>Why mention Abimelech and Jerubbesheth at all?</strong> What the text says: Joab&apos;s
            messenger is told to cite this old story only if David questions the risk Joab&apos;s men took
            near the city wall. How this is read: &quot;Jerubbesheth&quot; is widely understood among Hebrew
            scholars to be an edited form of Jerubbaal, Gideon&apos;s other name, with later scribes swapping
            out the word &quot;baal&quot; for &quot;besheth,&quot; meaning shame, so the text would not seem to
            honor a Canaanite god&apos;s name. The history itself, recorded in Judges 9, is a real precedent
            Joab expects David to know.
          </p>
          <p>
            <strong>Why does God&apos;s displeasure arrive as a statement, not an immediate judgment?</strong>{" "}
            What the text says: verse 27 states plainly that the thing David did displeased the LORD, then the
            chapter simply ends there. How this is read: Scripture often separates the moment sin is named
            from the moment its consequences land, which is exactly what happens here. The next chapter does
            not open with silence continuing. It opens with a confrontation.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 2 Samuel 11
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Samuel 11:2 and 3</h3>
        <VerseQuote
          text="And it came to pass in an eveningtide, that David arose from off his bed, and walked upon the roof of the king's house: and from the roof he saw a woman washing herself; and the woman was very beautiful to look upon. And David sent and enquired after the woman. And one said, Is not this Bathsheba, the daughter of Eliam, the wife of Uriah the Hittite?"
          reference="2 Samuel 11:2 and 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment a glance becomes an inquiry. Everyone in this exchange, David included, already knows
          whose wife she is before he sends for her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Samuel 11:11</h3>
        <VerseQuote
          text="And Uriah said unto David, The ark, and Israel, and Judah, abide in tents; and my lord Joab, and the servants of my lord, are encamped in the open fields; shall I then go into mine house, to eat and to drink, and to lie with my wife? as thou livest, and as thy soul liveth, I will not do this thing."
          reference="2 Samuel 11:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A foreign born soldier holds a line of loyalty the king himself could not hold on his own roof,
          without ever knowing why it mattered so much that night.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Samuel 11:15</h3>
        <VerseQuote
          text="And he wrote in the letter, saying, Set ye Uriah in the forefront of the hottest battle, and retire ye from him, that he may be smitten, and die."
          reference="2 Samuel 11:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A king who will not lift a weapon himself hands the weapon to the man he is killing, in the form of
          a letter that man never gets to read.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 2 Samuel 11:17</h3>
        <VerseQuote
          text="And the men of the city went out, and fought with Joab: and there fell some of the people of the servants of David; and Uriah the Hittite died also."
          reference="2 Samuel 11:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that shows how a cover up spreads. One man&apos;s death needed to look accidental, so other
          men&apos;s deaths became the cost of making it look that way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Samuel 11:27</h3>
        <VerseQuote
          text="And when the mourning was past, David sent and fetched her to his house, and she became his wife, and bare him a son. But the thing that David had done displeased the LORD."
          reference="2 Samuel 11:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s quiet ending and its real ending are two different things. Jerusalem saw a
          wedding. God saw exactly what it was built on.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 2 Samuel 11
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 2 Samuel 11?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          David stays home from war, sees Bathsheba bathing from his roof, and sends for her. When she
          becomes pregnant, he calls her husband Uriah home from the battle twice, hoping he will sleep with
          her so the child will appear to be his. When Uriah refuses both times, David has Joab arrange his
          death in battle, then marries Bathsheba himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Bathsheba in 2 Samuel 11?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 3 names her as the daughter of Eliam and the wife of Uriah the Hittite, one of David&apos;s
          soldiers. She later becomes the mother of Solomon, and her{" "}
          <ArticleLink href="/blog/who-was-bathsheba">full story</ArticleLink> continues well beyond this one
          chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Uriah the Hittite?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Uriah was a Hittite serving as one of David&apos;s soldiers, married to Bathsheba. His loyalty to
          his fellow soldiers in verse 11, even while David tries to get him to go home, is the one thing in
          this chapter that does not break.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did David send for Uriah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Bathsheba had just told David she was pregnant in verse 5, and Uriah had been away at the siege of
          Rabbah. David&apos;s plan was to get Uriah home to his wife so the child could appear to be
          Uriah&apos;s own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Uriah refuse to go home to his wife?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 11 has Uriah swear he will not enjoy the comforts of home while the ark, the army, and his
          commander Joab are still camped out in the field during the siege. He holds that same line even
          after David gets him drunk in verse 13.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How did David have Uriah killed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          David wrote a letter ordering Joab to place Uriah in the heaviest fighting and then pull support
          away from him, recorded in verse 15. Joab carried out the order exactly, and Uriah died in the
          attack along with other soldiers.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Joab know he was committing murder for David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The letter David sent in verse 15 named Uriah specifically and the outcome David wanted, and Joab
          carried it out precisely, then prepared a defense of the tactic in advance in verses 19 to 21. The
          text gives every indication Joab understood exactly what he was being asked to do.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does 2 Samuel 11 not show David being punished right away?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 27 states that what David did displeased the LORD, but the chapter ends there without
          describing any immediate consequence. The confrontation and the consequences both arrive in the
          very next chapter, through the prophet Nathan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Bathsheba described as guilty of adultery in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text never records Bathsheba speaking, consenting, or resisting in this chapter, and the active
          verbs throughout belong to David. Scripture elsewhere places the weight of this sin on David, not
          on her.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 2 Samuel 11 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter sets up Nathan&apos;s confrontation of David in the next chapter and the
          consequences that follow in David&apos;s family. David&apos;s own later words about{" "}
          <ArticleLink href="/blog/what-is-repentance">genuine repentance</ArticleLink> and{" "}
          <ArticleLink href="/blog/can-god-forgive-what-ive-done">being forgiven completely</ArticleLink> only
          make sense once you have read exactly what he needed forgiven here.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>2 Samuel 11 does not open with a villain. It opens with a king who has nothing to do.</p>
          <p>
            📌 <strong>Sin rarely arrives as one decision. It arrives as a series of smaller ones, each
            trying to fix the last.</strong> David does not plan a murder on the roof. He only wants one
            night with Uriah&apos;s wife to cover a problem, and every verse after that is him discovering
            how much bigger the cover up has to get.
          </p>
          <p>
            📌 <strong>Integrity does not require knowing what is really happening.</strong> Uriah never
            learns why David wants him home. He simply holds his line anyway, twice, and it costs him
            everything.
          </p>
          <p>
            📌 <strong>Silence from people is not the same as silence from God.</strong> No one in Jerusalem
            says a word to David in this chapter. Verse 27 makes clear that someone was watching the whole
            time.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of the last small choice you made to manage a problem instead of admit it, and ask whether
            it is still growing.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
