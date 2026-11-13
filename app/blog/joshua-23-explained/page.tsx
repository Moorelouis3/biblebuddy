import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-23-explained", {
  title: "Joshua 23 Explained: The Warning Joshua Gave Before He Died",
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

export default function JoshuaTwentyThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-23-explained"
      title={<>📖 Joshua 23 Explained: The Warning Joshua Gave Before He Died</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The wars are over. The land is divided. And the man who led both just called everyone back together one more time.</p>
            <p>
              <strong>Joshua 23 explained</strong> is Joshua&apos;s first farewell speech, given to Israel&apos;s
              elders, heads, judges, and officers while he is still alive but &quot;old and stricken in age.&quot;
              He is not handing out any more land here. He is handing out a warning, built entirely on what he has
              already watched God do with his own eyes.
            </p>
            <p>Maybe you have reached a point in life where you finally have time to say the thing you have been meaning to say for years.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why gather the leaders here, when a second farewell gathers everyone in the next chapter?</li>
            <li>❓ Why does a single surviving neighbor worry Joshua more than any army ever did?</li>
            <li>❓ What does &quot;the way of all the earth&quot; actually mean?</li>
            <li>❓ How can the exact same God who kept every promise also threaten every curse?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Joshua spends his last public words pointing backward at a record nobody in that room
              could argue with, then uses it to warn about a future none of them had seen yet.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: Joshua calling the leaders together, the
              victories he credits entirely to the LORD, the charge to cleave to the law instead of the nations
              still living among them, the one specific danger that could undo everything, and the farewell line
              that ties God&apos;s past faithfulness to a warning about the future.
            </p>
            <p>Sixteen verses, one old man&apos;s last public word, and a warning still worth hearing.</p>
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
            <ArticleLink href="/blog/joshua-22-explained">Joshua 22</ArticleLink> ended with a near war that never
            happened. Reuben, Gad, and the half tribe of Manasseh went home east of the Jordan, Israel almost
            attacked them over a misunderstood altar, and the whole nation stepped back from the edge once
            Phinehas heard the truth. The land division that had filled chapters 13 through 21 was finished.
            Every tribe had ground to call its own.
          </p>
          <p>
            Joshua 23 opens with no new conquest and no new boundary. Time has simply passed. The man who led
            Israel across the Jordan and through every campaign since is now old, and he knows exactly what that
            means for how much longer he has left to speak.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 23 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. An Old Man Calls the Leaders Together (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming exactly who Joshua gathers, and it is not the whole nation.</p>
        </div>
        <VerseQuote
          text="And it came to pass a long time after that the LORD had given rest unto Israel from all their enemies round about, that Joshua waxed old and stricken in age. And Joshua called for all Israel, and for their elders, and for their heads, and for their judges, and for their officers, and said unto them, I am old and stricken in age:"
          reference="Joshua 23:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joshua names his own age twice in two verses, and he does it before he says anything
            else.</strong> This is not a man hiding how little time he has left. He wants that fact sitting in the
            room while he talks, because it is the whole reason the room has been called together.
          </p>
          <p>
            The audience is elders, heads, judges, and officers, the leadership structure of the nation rather than
            every household in Israel. A second gathering, with a much wider guest list, is still ahead. This one
            belongs to the men who will have to carry Joshua&apos;s words forward once he is gone.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. What the LORD Has Already Done, in Plain Sight (verses 3 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before Joshua asks anything of them, he reminds them of something they do not need to take on faith.</p>
        </div>
        <VerseQuote
          text="And ye have seen all that the LORD your God hath done unto all these nations because of you; for the LORD your God is he that hath fought for you."
          reference="Joshua 23:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Ye have seen&quot; is the whole weight of the sentence. Joshua is not telling them a story
            from his own memory that they have to trust secondhand. Every person in that room watched walled
            cities fall and five kings scatter. The evidence is their own eyes, not his word for it.
          </p>
          <p>He then credits the result to the only one who actually deserves it, twice over.</p>
        </div>
        <VerseQuote
          text="And the LORD your God, he shall expel them from before you, and drive them from out of your sight; and ye shall possess their land, as the LORD your God hath promised unto you."
          reference="Joshua 23:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Even the land they have not yet fully cleared out, Joshua still says the LORD will finish
            driving out.</strong> He is not describing a closed case. He is describing an ongoing promise that
            still has ground left to cover, the same unfinished edge <ArticleLink href="/blog/joshua-1-explained">
            God had already told Joshua about</ArticleLink> at the very start of this book.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Be Very Courageous: Cleave to the Law, Not the Nations (verses 6 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Only after that reminder does Joshua give the first real command of the speech.</p>
        </div>
        <VerseQuote
          text="Be ye therefore very courageous to keep and to do all that is written in the book of the law of Moses, that ye turn not aside therefrom to the right hand or to the left;"
          reference="Joshua 23:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Courage here has nothing to do with a battlefield. It is the courage to keep obeying a written law
            once the fighting is finished and the pressure to compromise quietly sets in instead. This is the same
            charge Moses already gave Joshua before his own death in{" "}
            <ArticleLink href="/blog/deuteronomy-31-explained">Deuteronomy 31</ArticleLink>, now passed down a
            generation.
          </p>
          <p>Joshua spells out exactly what staying faithful looks like in practice.</p>
        </div>
        <VerseQuote
          text="That ye come not among these nations, these that remain among you; neither make mention of the name of their gods, nor cause to swear by them, neither serve them, nor bow yourselves unto them: But cleave unto the LORD your God, as ye have done unto this day."
          reference="Joshua 23:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Four separate verbs describe the slide away from God: come among, mention their gods, swear
            by them, serve them.</strong> Joshua lists it as a sequence, not a single event, because that is how it
            actually happens. Nobody wakes up bowing to an idol. They drift there one small association at a time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. One Man of You Shall Chase a Thousand (verses 9 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua returns to the evidence one more time, and this time he puts a number on it.</p>
        </div>
        <VerseQuote
          text="For the LORD hath driven out from before you great nations and strong: but as for you, no man hath been able to stand before you unto this day. One man of you shall chase a thousand: for the LORD your God, he it is that fighteth for you, as he hath promised you."
          reference="Joshua 23:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>One against a thousand is not a boast about Israelite soldiers. It is Joshua&apos;s way of
            saying the math never added up unless the LORD was the one doing the fighting.</strong> No army wins
            at those odds on skill alone. The whole conquest only makes sense as a record of what God did, which is
            exactly the point Joshua keeps circling back to before he asks for anything.
          </p>
          <p>Only now, after three separate reminders of what they have already seen, does he narrow the command down to one sentence.</p>
        </div>
        <VerseQuote
          text="Take good heed therefore unto yourselves, that ye love the LORD your God."
          reference="Joshua 23:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Everything before this verse was evidence. Everything after it is consequence. Verse 11 is the
            hinge the whole speech turns on, and it reduces obedience to the law, courage in battle, and refusing
            foreign gods down to a single root: love for the LORD, not a checklist kept for its own sake.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The One Door Back Into Danger (verses 12 and 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua then names the single specific way all of this could still unravel.</p>
        </div>
        <VerseQuote
          text="Else if ye do in any wise go back, and cleave unto the remnant of these nations, even these that remain among you, and shall make marriages with them, and go in unto them, and they to you: Know for a certainty that the LORD your God will no more drive out any of these nations from before you; but they shall be snares and traps unto you, and scourges in your sides, and thorns in your eyes, until ye perish from off this good land which the LORD your God hath given you."
          reference="Joshua 23:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Intermarriage with the surviving nations is the single danger Joshua spells out by
            name.</strong> Not another war. Not a famine. A quiet family connection with neighbors who still served
            other gods, made one household at a time, long after every battle had already been won.
          </p>
          <p>
            The images he reaches for, snares, traps, scourges, and thorns, describe something small and constant
            rather than one dramatic disaster. A thorn does not kill in a single moment. It wears a person down,
            every single day, for as long as it stays in.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. &quot;I Am Going the Way of All the Earth&quot; (verse 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua finally says out loud what the first two verses had already implied.</p>
        </div>
        <VerseQuote
          text="And, behold, this day I am going the way of all the earth: and ye know in all your hearts and in all your souls, that not one thing hath failed of all the good things which the LORD your God spake concerning you; all are come to pass unto you, and not one thing hath failed thereof."
          reference="Joshua 23:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;The way of all the earth&quot; is a plain, unafraid way of saying death. Joshua does not dress
            it up or avoid naming it. He states it in the same breath as the only other claim he wants them to
            carry away from the whole speech: that God&apos;s word to them has never once come up short.
          </p>
          <p>
            📌 <strong>He puts his own coming death right next to God&apos;s unbroken record on purpose.</strong>{" "}
            Joshua is leaving. The promises he is leaving behind are not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Good Things Kept in Full, Evil Things Just as Sure (verses 15 and 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua closes with the argument the whole chapter has been building toward.</p>
        </div>
        <VerseQuote
          text="Therefore it shall come to pass, that as all good things are come upon you, which the LORD your God promised you; so shall the LORD bring upon you all evil things, until he have destroyed you from off this good land which the LORD your God hath given you. When ye have transgressed the covenant of the LORD your God, which he commanded you, and have gone and served other gods, and bowed yourselves to them; then shall the anger of the LORD be kindled against you, and ye shall perish quickly from off the good land which he hath given unto you."
          reference="Joshua 23:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Joshua does not treat blessing and judgment as two different kinds of promise. He treats
            them as the same promise, aimed in two directions.</strong> The very reliability that delivered every
            good thing in verse 14 is the reason the warning in verses 15 and 16 cannot be dismissed as an empty
            threat. A God who keeps His word does not stop being that God the moment the word is a warning instead
            of a gift.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 23 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does Joshua treat marrying into the remaining nations as more dangerous than any army
            Israel fought?</strong> What the text says: verse 12 names intermarriage with the surviving nations as
            the one thing that would undo everything, while verses 9 and 10 describe Israel defeating far greater
            armies without difficulty. How this is read: a battle is won or lost in a day, in plain view, with
            everyone aware of the stakes. A marriage brings a different household&apos;s gods into daily life
            quietly, year after year, with no single moment that announces itself as the turning point. The danger
            Joshua warns about is not strength. It is what gets absorbed without anyone noticing.
          </p>
          <p>
            <strong>Does this warning condemn every marriage between an Israelite and someone from another
            nation?</strong> What the text says: verse 12 specifically targets marriage with &quot;the remnant of
            these nations, even these that remain among you,&quot; the Canaanite peoples still clinging to their
            own gods in the land Israel had just taken. How this fits the rest of Scripture: later figures like
            Rahab and Ruth, both foreign born, are welcomed into Israel after turning to the LORD themselves. The
            concern in Joshua 23 was never ancestry. It was continuing loyalty to other gods, which is exactly what
            Rahab and Ruth had already left behind before either one became part of the nation&apos;s own story.
          </p>
          <p>
            <strong>Why does Joshua anchor a warning about a future nobody has seen yet to a record everybody has
            already watched?</strong> What the text says: verse 14 states that not one good thing God promised had
            failed, and verses 15 and 16 immediately use that same track record to say the warned evil would be
            just as certain. How this is read: Joshua is not asking the leaders to trust a new and untested claim.
            He is asking them to apply the only standard they have direct evidence for, God&apos;s consistency, to
            a promise they have not yet had to test. If the good half of God&apos;s word held without exception, the
            warning half carries the same weight, not a lesser one.
          </p>
          <p>
            <strong>Why gather the leaders here if a wider farewell to the whole nation is still ahead in the next
            chapter?</strong> What the text says: verse 2 names elders, heads, judges, and officers, while the
            opening of the next chapter explicitly calls together all the tribes of Israel at a different location.
            How this fits: Joshua 23 reads as a leadership briefing, aimed at the men who will have to keep
            enforcing this charge long after he is gone, before the fuller public ceremony that follows it. One
            farewell was not enough for everything an aging leader needed to say before &quot;the way of all the
            earth&quot; caught up with him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 23:14</h3>
        <VerseQuote
          text="And, behold, this day I am going the way of all the earth: and ye know in all your hearts and in all your souls, that not one thing hath failed of all the good things which the LORD your God spake concerning you; all are come to pass unto you, and not one thing hath failed thereof."
          reference="Joshua 23:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Joshua&apos;s own death stated plainly, placed deliberately beside the one claim he most wants
          remembered: God&apos;s word to Israel never once came up short.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 23:6</h3>
        <VerseQuote
          text="Be ye therefore very courageous to keep and to do all that is written in the book of the law of Moses, that ye turn not aside therefrom to the right hand or to the left;"
          reference="Joshua 23:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Courage redefined for a generation whose wars are finished. The hardest fight left is staying obedient
          once no one is watching and nothing is forcing the issue.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 23:10</h3>
        <VerseQuote
          text="One man of you shall chase a thousand: for the LORD your God, he it is that fighteth for you, as he hath promised you."
          reference="Joshua 23:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A ratio no army wins by skill alone, offered as living proof that the conquest was never really about
          Israel&apos;s own strength.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 23:13</h3>
        <VerseQuote
          text="Know for a certainty that the LORD your God will no more drive out any of these nations from before you; but they shall be snares and traps unto you, and scourges in your sides, and thorns in your eyes, until ye perish from off this good land which the LORD your God hath given you."
          reference="Joshua 23:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The cost of compromise described as something slow and constant rather than sudden, the kind of danger
          easy to underestimate precisely because it never arrives all at once.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 23
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          An aging Joshua called Israel&apos;s elders, heads, judges, and officers together for a farewell speech.
          He reminded them that the LORD alone had defeated every nation before them, charged them to keep the
          law and avoid the gods of the nations still remaining in the land, warned that marrying into those
          nations would undo everything, and tied his own approaching death to God&apos;s unbroken record of kept
          promises.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Joshua speaking to in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 2 names the audience specifically: elders, heads, judges, and officers, the leadership of the
          nation rather than every household in Israel. A broader gathering of all the tribes follows in the next
          chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the way of all the earth&quot; mean in Joshua 23:14?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a plain way of saying death, the one path every person on earth eventually walks. Joshua states it
          without softening it, then uses the same verse to make his real point about God&apos;s faithfulness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was intermarriage with the remaining nations such a serious warning?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 12 ties the danger directly to the nations that still served other gods. A marriage brought a
          different household&apos;s worship into daily Israelite life, a slower and quieter threat than any
          battlefield, which is exactly why Joshua singles it out by name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Joshua 23 mean God stopped helping Israel take the rest of the land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verse 5 still describes the LORD expelling the remaining nations as an ongoing promise, not a
          finished one. The chapter assumes unfinished ground still exists and calls Israel to faithfulness while
          that process continues.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Joshua 23 the same speech as Joshua 24?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Joshua 23 addresses the nation&apos;s leaders. The chapter that follows opens with Joshua gathering
          all the tribes at a different location for a wider ceremony. Both are farewell addresses from the same
          final period of Joshua&apos;s life, but they are two separate occasions.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the main command in Joshua 23?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 11 states it directly: take good heed to yourselves, that you love the LORD your God. Every other
          instruction in the chapter, courage, obedience to the law, avoiding foreign gods, flows out of that one
          command rather than standing beside it as a separate rule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Joshua 23 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It mirrors Moses charging Joshua before his own death in Deuteronomy 31, and it leans on the same
          warning Moses had already given about the remaining nations becoming a snare in Deuteronomy 7. The
          blessing and curse pattern in verses 15 and 16 also echoes the choice Moses laid out for the whole
          nation before they ever crossed the Jordan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Israel listen to Joshua&apos;s warning?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not fully. The book of Judges records exactly the pattern Joshua warned against: intermarriage with the
          remaining nations, adopting their gods, and the trouble that followed, which makes this farewell speech
          read less like a formality and more like a warning that history went on to confirm.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 23 is a short chapter, but it carries the full weight of a man who knows this is one of his last chances to be heard.</p>
          <p>
            📌 <strong>Evidence came before instruction.</strong> Joshua did not ask Israel&apos;s leaders to trust
            him blindly. He pointed at victories they had personally watched before he ever told them what to do
            next.
          </p>
          <p>
            📌 <strong>The real danger was never the army left standing. It was the neighbor left close.</strong>{" "}
            One quiet family connection worried Joshua more than any battle he had already won, because it could
            undo the victory from the inside, one household at a time.
          </p>
          <p>
            📌 <strong>A God reliable enough to keep every good promise is reliable enough to keep every
            warning.</strong> Joshua refused to let Israel take comfort in half of God&apos;s record while
            ignoring the other half.
          </p>
          <p>
            You are not standing where Israel&apos;s leaders stood, but you likely have your own version of a
            remaining nation, some small compromise still living quietly inside an otherwise faithful life.
          </p>
          <p>So here is your one next step.</p>
          <p>Name whatever that compromise is honestly today, before it has decades to wear you down the way Joshua warned it would.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
