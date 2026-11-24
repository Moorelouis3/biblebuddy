import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("1-samuel-28-explained", {
  title: "1 Samuel 28 Explained: Saul and the Witch of Endor",
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

export default function OneSamuelTwentyEightExplainedPage() {
  return (
    <BlogPostShell
      slug="1-samuel-28-explained"
      title={<>📖 1 Samuel 28 Explained: Saul and the Witch of Endor</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A king who once banned this exact practice now disguises himself at night to beg for it.</p>
            <p>
              <strong>1 Samuel 28 explained</strong> is the chapter where Saul, with a Philistine
              army camped against him and heaven gone silent, sneaks into a medium&apos;s house at
              Endor to speak with a man who has been dead for years. He gets an answer. It is the
              worst one he could have received, and it comes from the very person who once anointed
              him king.
            </p>
            <p>Maybe you have gone looking for an answer in a place you already knew was off limits, because the silence had gotten too loud.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why would God simply stop answering a king who was still asking?</li>
            <li>❓ Did Saul really outlaw mediums, then go find one himself?</li>
            <li>❓ Was it actually Samuel who showed up, or something pretending to be him?</li>
            <li>❓ What exactly did Samuel tell Saul, and did it come true?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Saul does not go to Endor to find out if he will lose. He goes to find out
              how bad it will be, because by this point he already knows the answer to the first
              question.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: David&apos;s dangerous new
              position inside the Philistine army, Saul&apos;s own law against mediums, the silence
              of God, the disguised trip to Endor, the woman&apos;s terror when she recognizes who
              she is really talking to, Samuel&apos;s verdict, and the strange, almost domestic meal
              that closes out one of the darkest nights in Saul&apos;s whole story.
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
            <ArticleLink href="/blog/1-samuel-27-explained">1 Samuel 27</ArticleLink> ended with
            David settled into Ziklag under Achish, king of Gath, running raids against Israel&apos;s
            old enemies while lying to his Philistine host about who he was really attacking.
            Sixteen months had passed with no battle against Saul and no recorded word from God
            about any of it.
          </p>
          <p>
            1 Samuel 28 explained opens with that arrangement about to collide with reality. The
            Philistines are mustering for a real war against Israel, and David, still living as
            Achish&apos;s man, is about to be asked to fight on the wrong side of it. Saul, meanwhile,
            is facing that same army with a problem David does not have: no prophet left to ask, and
            a God who has stopped answering him by any method at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 1 Samuel 28 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. David, Caught Inside the Wrong Army (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a problem the previous chapter already set up but never forced David to answer.</p>
        </div>
        <VerseQuote
          text="And it came to pass in those days, that the Philistines gathered their armies together for warfare, to fight with Israel. And Achish said unto David, Know thou assuredly, that thou shalt go out with me to battle, thou and thy men."
          reference="1 Samuel 28:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Living under Achish was never going to stay free of cost, and here is the
            bill.</strong> David took protection from the Philistines to escape Saul. Now the same
            king who gave him a town expects him to march against his own nation. Nothing in the
            text shows David objecting.
          </p>
        </div>
        <VerseQuote
          text="And David said to Achish, Surely thou shalt know what thy servant can do. And Achish said to David, Therefore will I make thee keeper of mine head for ever."
          reference="1 Samuel 28:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 David&apos;s answer is carefully vague. &quot;Thou shalt know what thy servant can
            do&quot; promises nothing specific, yet Achish hears it as full commitment and offers
            David the highest trust a Philistine king can give, permanent head of his personal
            guard. The chapter leaves this thread hanging on purpose. David&apos;s way out of it
            does not come until later in the story, and this chapter is not about David at all. It
            exists to show exactly how boxed in he has let himself become, while the rest of the
            chapter turns to Saul, who is boxed in far worse.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Man Saul Needs Is Dead, and So Is His Own Law (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One verse lays out two separate problems that are about to crash into each other.</p>
        </div>
        <VerseQuote
          text="Now Samuel was dead, and all Israel had lamented him, and buried him in Ramah, even in his own city. And Saul had put away those that had familiar spirits, and the wizards, out of the land."
          reference="1 Samuel 28:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The narrator states both facts side by side, and the whole chapter hangs on
            the gap between them.</strong> Samuel, the one man who always told Saul plainly what God
            was doing, has been dead since{" "}
            <ArticleLink href="/blog/1-samuel-25-explained">before 1 Samuel 25</ArticleLink>. And
            Saul himself, at some point in his reign, drove every medium and wizard out of Israel,
            obeying the law Moses gave against exactly this kind of practice. Saul is the reason the
            thing he is about to go looking for is supposed to be impossible to find.
          </p>
          <p>
            Moses had been direct about it long before Saul&apos;s time: &quot;Regard not them that
            have familiar spirits, neither seek after wizards, to be defiled by them: I am the LORD
            your God&quot; (Leviticus 19:31), and the same law named &quot;a consulter with familiar
            spirits&quot; among the practices that made a nation unfit to live in the land at all
            (Deuteronomy 18:10 and 11). Saul enforced that law once. He is about to become the reason
            it fails.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. An Army on the Hill, and a God Who Will Not Answer (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The threat that forces Saul&apos;s hand arrives fast.</p>
        </div>
        <VerseQuote
          text="And the Philistines gathered themselves together, and came and pitched in Shunem: and Saul gathered all Israel together, and they pitched in Gilboa."
          reference="1 Samuel 28:4"
        />
        <VerseQuote
          text="And when Saul saw the host of the Philistines, he was afraid, and his heart greatly trembled."
          reference="1 Samuel 28:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the same Saul who once led Israel to real victories against this same enemy
            early in his reign. Fear alone does not explain this verse. What has actually changed is
            what Saul does next with that fear.
          </p>
        </div>
        <VerseQuote
          text="And when Saul enquired of the LORD, the LORD answered him not, neither by dreams, nor by Urim, nor by prophets."
          reference="1 Samuel 28:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Saul does try the right door first, and the text is careful to name every
            normal channel God could have used and did not.</strong> Dreams, the Urim kept by the
            priests, and prophets were the three ordinary ways Israel expected God to speak. All
            three stay silent, not because God has gone absent from the world, but because, as{" "}
            <ArticleLink href="/blog/1-samuel-15-explained">1 Samuel 15</ArticleLink> already showed,
            Saul rejected God&apos;s word once too often for this relationship to still run on
            request.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The King Who Banned Mediums Goes Looking for One (verses 7 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Shut out of every legitimate door, Saul turns to the one he had already locked himself.</p>
        </div>
        <VerseQuote
          text="Then said Saul unto his servants, Seek me a woman that hath a familiar spirit, that I may go to her, and enquire of her. And his servants said to him, Behold, there is a woman that hath a familiar spirit at Endor."
          reference="1 Samuel 28:7"
        />
        <VerseQuote
          text="And Saul disguised himself, and put on other raiment, and he went, and two men with him, and they came to the woman by night: and he said, I pray thee, divine unto me by the familiar spirit, and bring me him up, whom I shall name unto thee."
          reference="1 Samuel 28:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A king disguises himself to break his own law, at night, with only two men
            who will not report him.</strong> &quot;Familiar spirit&quot; translates a Hebrew word
            for a spirit believed to answer a necromancer&apos;s call, the same practice Saul had
            already named a capital offense when he enforced Moses&apos; law. He is not confused
            about whether this is allowed. He is choosing it anyway, in secret, because every
            allowed option has already gone silent.
          </p>
          <p>The woman&apos;s first reaction is not greed. It is fear, aimed at the very king standing in front of her.</p>
        </div>
        <VerseQuote
          text="And the woman said unto him, Behold, thou knowest what Saul hath done, how he hath cut off those that have familiar spirits, and the wizards, out of the land: wherefore then layest thou a snare for my life, to cause me to die?"
          reference="1 Samuel 28:9"
        />
        <VerseQuote
          text="And Saul sware to her by the LORD, saying, As the LORD liveth, there shall no punishment happen to thee for this thing."
          reference="1 Samuel 28:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Saul swears by the LORD&apos;s own name to protect a woman from the LORD&apos;s own
            law, a law Saul enforced himself. He is not simply disobeying God here. He is using
            God&apos;s name to guarantee the safety of the very practice God condemned, which is
            exactly the kind of thing Samuel already named years earlier: &quot;rebellion is as the
            sin of witchcraft, and stubbornness is as iniquity and idolatry&quot; (1 Samuel 15:23).
            Saul heard that sentence from Samuel&apos;s own mouth. Tonight he is living it out word
            for word.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. &quot;Why Hast Thou Deceived Me? For Thou Art Saul.&quot; (verses 11 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Saul names exactly who he wants to see, and something happens that the woman did not expect.</p>
        </div>
        <VerseQuote
          text="Then said the woman, Whom shall I bring up unto thee? And he said, Bring me up Samuel."
          reference="1 Samuel 28:11"
        />
        <VerseQuote
          text="And when the woman saw Samuel, she cried with a loud voice: and the woman spake to Saul, saying, Why hast thou deceived me? for thou art Saul."
          reference="1 Samuel 28:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The woman&apos;s own reaction is the loudest clue in the passage. She screams
            at seeing Samuel, as if whatever she normally summoned in this business was nothing like
            this.</strong> Her fear and her sudden recognition of Saul&apos;s identity both happen in
            the same breath, as though the appearance itself told her something had gone far beyond
            her usual act.
          </p>
          <p>Saul calms her and presses for details, and what she describes is strange enough that he has to ask a follow up question.</p>
        </div>
        <VerseQuote
          text="And the king said unto her, Be not afraid: for what sawest thou? And the woman said unto Saul, I saw gods ascending out of the earth."
          reference="1 Samuel 28:13"
        />
        <VerseQuote
          text="And he said unto her, What form is he of? And she said, An old man cometh up; and he is covered with a mantle. And Saul perceived that it was Samuel, and he stooped with his face to the ground, and bowed himself."
          reference="1 Samuel 28:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Gods ascending out of the earth&quot; is the woman&apos;s own description of
            what she sees, using a word that could mean a divine or spirit being rather than a
            literal deity. An old man in a mantle is enough for Saul to identify him without being
            told, since a mantle, a long robe-like garment, was Samuel&apos;s recognizable mark in
            life. Saul&apos;s response is not curiosity. He bows to the ground, the same posture of
            submission he might have given the living prophet.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Samuel&apos;s Verdict (verses 15 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Whatever Saul hoped to hear, Samuel opens with irritation, not comfort.</p>
        </div>
        <VerseQuote
          text="And Samuel said to Saul, Why hast thou disquieted me, to bring me up? And Saul answered, I am sore distressed; for the Philistines make war against me, and God is departed from me, and answereth me no more, neither by prophets, nor by dreams: therefore I have called thee, that thou mayest make known unto me what I shall do."
          reference="1 Samuel 28:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Saul finally says out loud, to a dead man, what he could not get God to
            answer directly: God has left him.</strong> He is not asking Samuel for new information.
            He already knows the one thing he came to confirm. He is asking Samuel to tell him what
            to do about a verdict he has already half accepted.
          </p>
          <p>Samuel does not soften it. He makes the silence Saul already noticed into a direct statement.</p>
        </div>
        <VerseQuote
          text="Then said Samuel, Wherefore then dost thou ask of me, seeing the LORD is departed from thee, and is become thine enemy?"
          reference="1 Samuel 28:16"
        />
        <VerseQuote
          text="And the LORD hath done to him, as he spake by me: for the LORD hath rent the kingdom out of thine hand, and given it to thy neighbour, even to David: Because thou obeyedst not the voice of the LORD, nor executedst his fierce wrath upon Amalek, therefore hath the LORD done this thing unto thee this day."
          reference="1 Samuel 28:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Samuel points to the exact same failure he confronted Saul about while he
            was still alive.</strong> The Amalek disobedience in{" "}
            <ArticleLink href="/blog/1-samuel-15-explained">1 Samuel 15</ArticleLink> is not a new
            charge invented for this night. It is the same verdict Samuel already delivered, and the
            kingdom already handed to David at{" "}
            <ArticleLink href="/blog/1-samuel-16-explained">his anointing years earlier</ArticleLink>.
            Nothing here is new. Saul has simply run out of ways to avoid hearing it again.
          </p>
          <p>Then Samuel adds what Saul did not ask for and cannot undo.</p>
        </div>
        <VerseQuote
          text="Moreover the LORD will also deliver Israel with thee into the hand of the Philistines: and to morrow shalt thou and thy sons be with me: the LORD also shall deliver the host of Israel into the hand of the Philistines."
          reference="1 Samuel 28:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Saul came for a battle plan and got a death sentence, dated for the very next
            day, that also names his sons and the whole army.</strong> There is no conditional
            escape offered, no path to repentance proposed, no mention of what Saul could still do
            differently. The word is final in a way none of Samuel&apos;s earlier rebukes, which
            always still left Saul on the throne, ever were.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. A King Fed by the Woman He Came to Use (verses 20 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The verdict lands on Saul&apos;s body before it reaches anything else.</p>
        </div>
        <VerseQuote
          text="Then Saul fell straightway all along on the earth, and was sore afraid, because of the words of Samuel: and there was no strength in him; for he had eaten no bread all the day, nor all the night."
          reference="1 Samuel 28:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The text pairs the collapse with a plain physical detail: Saul has not eaten in a full
            day and night, on top of hearing he and his sons die tomorrow. Terror and exhaustion
            arrive in the same sentence, and the chapter does not try to separate how much is one and
            how much is the other.
          </p>
          <p>What happens next is the strangest turn in the whole chapter. The woman Saul came to use becomes the one caring for him.</p>
        </div>
        <VerseQuote
          text="And the woman came unto Saul, and saw that he was sore troubled, and said unto him, Behold, thine handmaid hath obeyed thy voice, and I have put my life in my hand, and have hearkened unto thy words which thou spakest unto me. Now therefore, I pray thee, hearken thou also unto the voice of thine handmaid, and let me set a morsel of bread before thee; and eat, that thou mayest have strength, when thou goest on thy way."
          reference="1 Samuel 28:21 and 22"
        />
        <VerseQuote
          text="But he refused, and said, I will not eat. But his servants, together with the woman, compelled him; and he hearkened unto their voice. So he arose from the earth, and sat upon the bed."
          reference="1 Samuel 28:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>She reminds Saul that she risked execution to obey him, and asks him in return
            to let her obey him in something smaller: eating.</strong> It is the one request in the
            whole chapter that anyone actually grants without a fight, and it comes from a woman
            whose entire profession Saul had made a capital crime.
          </p>
        </div>
        <VerseQuote
          text="And the woman had a fat calf in the house; and she hasted, and killed it, and took flour, and kneaded it, and did bake unleavened bread thereof: And she brought it before Saul, and before his servants; and they did eat. Then they rose up, and went away that night."
          reference="1 Samuel 28:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The chapter ends on an oddly quiet, almost hospitable note, a shared meal cooked fast
            in the middle of the night, right after a death sentence that cannot be appealed. Saul
            eats, regains some strength, and walks out into the last full day of his life.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 1 Samuel 28 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did the woman at Endor actually bring up the real Samuel, or was this some kind
            of trick or demonic impersonation?</strong> What the text says: verse 12 has the woman
            scream and immediately recognize Saul the moment she sees Samuel, a reaction the passage
            treats as unusual even for her own practice. Verses 15 through 19 then put real, accurate
            prophecy into Samuel&apos;s mouth, including Saul&apos;s death the next day, which
            actually happens exactly as stated. How this is read: Christians land in different
            places here. Some read the woman&apos;s own shock as proof that something genuinely
            beyond her normal act happened, with God permitting a real appearance for His own
            purposes rather than her power producing it. Others point to the Bible&apos;s consistent
            warnings against necromancy and argue Scripture would not show real contact with a dead
            saint through forbidden means, reading this instead as a deceiving spirit allowed to
            speak truth this once for Saul&apos;s judgment. The text itself does not settle the
            mechanism. It simply states what Saul saw, what Samuel said, and that every word of it
            came true.
          </p>
          <p>
            <strong>Why did God stop answering Saul through dreams, Urim, and prophets, the normal
            channels?</strong> What the text says: verse 6 names all three and says plainly that none
            of them worked. How this is read: the text does not treat this as God being unable or
            unwilling to speak in general. It follows directly from the pattern already set in
            1 Samuel 15, where Samuel
            told Saul the LORD had rejected him as king. Most readers see the silence here as that
            same rejection playing out practically: a relationship Saul treated as optional for years
            does not stay available the one night he finally needs it.
          </p>
          <p>
            <strong>How could Saul, who personally enforced the law against mediums, turn around and
            use one himself?</strong> What the text says: verse 3 states both facts back to back with
            no explanation bridging them, and verse 9 even has the woman remind Saul of his own law
            before she will act. How this is read: the text lets the contradiction speak for itself
            rather than explaining Saul&apos;s reasoning. It reads less like hypocrisy Saul was
            unaware of and more like a desperate man choosing, with open eyes, to break the very rule
            he once enforced, because every lawful option had already failed him.
          </p>
          <p>
            <strong>Does this chapter mean mediums and the occult actually have real power to contact
            the dead?</strong> What the text says: the passage never generalizes about mediums as a
            category. It describes one specific, unrepeated night where God permitted something
            unusual for His own reasons tied to Saul&apos;s judgment. How this is read: the laws in
            Leviticus and Deuteronomy against mediums and necromancy stand on their own, separate
            from whatever happened at Endor, and most readers do not take this one account as
            evidence that such practices generally work. The chapter&apos;s own point is not about
            the woman&apos;s power. It is about Saul&apos;s choice to go looking for an answer God had
            already stopped giving him through every door that was actually open.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 1 Samuel 28
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 Samuel 28:6</h3>
        <VerseQuote
          text="And when Saul enquired of the LORD, the LORD answered him not, neither by dreams, nor by Urim, nor by prophets."
          reference="1 Samuel 28:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Every normal channel God ever used to speak to Israel is named here, and every one of them
          stays silent for the first time in Saul&apos;s whole story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Samuel 28:7</h3>
        <VerseQuote
          text="Then said Saul unto his servants, Seek me a woman that hath a familiar spirit, that I may go to her, and enquire of her."
          reference="1 Samuel 28:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same king who outlawed this practice goes looking for it himself, the moment the
          lawful doors stop opening for him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Samuel 28:12</h3>
        <VerseQuote
          text="And when the woman saw Samuel, she cried with a loud voice: and the woman spake to Saul, saying, Why hast thou deceived me? for thou art Saul."
          reference="1 Samuel 28:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The medium&apos;s own shock at what she sees is the strangest detail in the chapter, a
          woman startled by the very thing her profession claimed to be able to do.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Samuel 28:18 and 19</h3>
        <VerseQuote
          text="Because thou obeyedst not the voice of the LORD, nor executedst his fierce wrath upon Amalek, therefore hath the LORD done this thing unto thee this day. Moreover the LORD will also deliver Israel with thee into the hand of the Philistines: and to morrow shalt thou and thy sons be with me."
          reference="1 Samuel 28:18 and 19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          An old, already delivered verdict comes due on a precise deadline, tomorrow, naming Saul,
          his sons, and the army that trusted him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Samuel 28:23</h3>
        <VerseQuote
          text="But he refused, and said, I will not eat. But his servants, together with the woman, compelled him; and he hearkened unto their voice. So he arose from the earth, and sat upon the bed."
          reference="1 Samuel 28:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A condemned king is finally, briefly cared for, not by a priest or a general, but by the
          one person in the chapter whose whole trade he had once made illegal.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 1 Samuel 28
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 1 Samuel 28?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Facing a Philistine army with no answer from God through dreams, Urim, or prophets, Saul
          disguises himself and visits a medium at Endor to contact the dead prophet Samuel. Samuel
          tells him the kingdom is already lost to David, and that Saul and his sons will die the
          next day in battle, which is exactly what happens.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was the woman at Endor, often called the witch of Endor?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 7 names her only as a woman with a familiar spirit living at Endor. The text never
          gives her a name, and &quot;witch&quot; is a traditional label rather than a word the
          chapter itself uses; it calls her a woman who practices necromancy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a familiar spirit?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the Bible&apos;s term for a spirit a medium claimed could be summoned to answer
          questions, often by appearing to contact the dead. Leviticus 19:31 and Deuteronomy 18:10
          and 11 both name the practice directly and forbid it to Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why had Saul banned mediums and wizards?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 3 states that Saul had put mediums and wizards out of the land, obeying the existing
          law of Moses against the practice. The chapter never explains his personal reason, only
          that he enforced a law he goes on to break himself within the same chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was it really Samuel who appeared to Saul?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text describes Samuel appearing, speaking, and delivering a prophecy that comes true
          exactly as stated. It does not explain the mechanism behind the appearance, and Christians
          read that gap differently: some see a real, God permitted appearance, others a deceiving
          spirit allowed to speak true judgment for this one occasion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God stop answering Saul?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 6 states plainly that dreams, Urim, and prophets all failed to produce an answer.
          This follows the rejection Samuel already pronounced over Saul in
          1 Samuel 15, after Saul
          disobeyed God&apos;s command concerning the Amalekites.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did Samuel tell Saul would happen?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 17 through 19 have Samuel confirm the kingdom has already passed to David, repeat
          the reason, Saul&apos;s disobedience over Amalek, and state that Saul and his sons will die
          the next day along with much of Israel&apos;s army in defeat to the Philistines.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saul actually die the next day, the way Samuel said?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. 1 Samuel 31 records Saul and three of his sons dying in battle against the
          Philistines on Mount Gilboa, and 1 Chronicles 10:13 and 14 later states plainly that Saul
          died for his transgression, specifically naming his asking counsel of a medium as part of
          the reason.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was David not with Saul during this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 1 and 2 show David still living under Achish of Gath, about to be drawn into the
          Philistine army that is marching against Saul, the arrangement he set up in{" "}
          <ArticleLink href="/blog/1-samuel-27-explained">1 Samuel 27</ArticleLink>. He is nowhere
          near Endor or the battle this chapter sets up.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does this chapter mean witchcraft and the occult really work?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter describes one specific, unrepeated event rather than making a general claim
          about mediums. The laws against the practice in Leviticus and Deuteronomy stand
          separately, and most readers take this account as showing what happened to Saul on this
          one occasion, not as proof that such practices generally succeed.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>1 Samuel 28 is the night a king finally hears, out loud, what he had already half known for years.</p>
          <p>
            📌 <strong>Silence from God is sometimes an answer, not an absence.</strong> Saul did not
            lose access to dreams, Urim, and prophets by accident. He had already rejected the word
            those channels once carried to him, and the silence was the rejection catching up.
          </p>
          <p>
            📌 <strong>Desperation does not cancel a law you already know.</strong> Saul enforced the
            ban on mediums himself. Fear did not make him forget it existed. It made him decide,
            clearly and deliberately, to break it anyway.
          </p>
          <p>
            Samuel gave Saul no new information at Endor. Every word of the verdict had already been
            spoken years earlier, in daylight, through the proper channel Saul had stopped listening
            to. The tragedy of this chapter is not that God refused to answer Saul. It is that Saul
            went looking for an answer in the dark that he had already been given in the light.
          </p>
          <p>So here is your one next step.</p>
          <p>
            If an answer from God feels like it has gone quiet, look first at whether you already
            received it once and set it aside, before you go looking for a shortcut around the
            silence.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
