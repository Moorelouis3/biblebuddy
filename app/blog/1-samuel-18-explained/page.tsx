import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("1-samuel-18-explained", {
  title: "1 Samuel 18 Explained: Jonathan's Covenant, Saul's Jealousy",
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

export default function OneSamuelEighteenExplainedPage() {
  return (
    <BlogPostShell
      slug="1-samuel-18-explained"
      title={<>📖 1 Samuel 18 Explained: Jonathan&apos;s Covenant, Saul&apos;s Jealousy</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One afternoon. One dead giant. And the same royal family responds to it in two completely opposite directions.</p>
            <p>One son loves David instantly. The father starts planning how to get rid of him.</p>
            <p>
              <strong>1 Samuel 18 explained</strong> is the chapter where David stops being a name
              Saul has to ask for twice and becomes a problem Saul cannot stop watching. The same
              afternoon that wins David a nation&apos;s admiration also starts the fear that will
              define the rest of Saul&apos;s reign.
            </p>
            <p>Maybe you have watched someone else&apos;s success make a person who should be happy for you turn cold instead.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Jonathan, the king&apos;s own son, give away his robe and his weapons to David?</li>
            <li>❓ What actually happens when the evil spirit comes on Saul and he &quot;prophesies&quot; with a javelin in his hand?</li>
            <li>❓ Why does Saul promise David one daughter, then marry her to someone else?</li>
            <li>❓ What is the hundred Philistine foreskins Saul demands as a bride price?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every single time this chapter says David succeeded, it gives the same
              reason. Every single time it says Saul grew afraid, it gives the same reason too.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the covenant Jonathan makes
              with David before either of them says a word to Saul about it, the song that turns a
              victory parade into the start of Saul&apos;s jealousy, the javelin thrown inside the
              king&apos;s own house, the promotion that is really a demotion, the daughter promised
              and then withheld, the dowry designed to get David killed, and the enmity that settles
              in for good by the chapter&apos;s last verse.
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
            <ArticleLink href="/blog/1-samuel-17-explained">1 Samuel 17</ArticleLink> ended with
            Goliath dead, the Philistine army fleeing, and Saul asking twice whose son the shepherd
            boy who just won the war actually was. David answered him plainly: the son of Jesse the
            Bethlehemite, the same answer he had already given once, standing in the exact same
            clothes he had worn out to the battle.
          </p>
          <p>
            1 Samuel 18 explained picks up in the very next moment, while David is presumably still
            standing in front of Saul with Goliath&apos;s blood not yet washed off. Nothing about
            David&apos;s own situation has changed since the fight ended. What changes in this
            chapter is how everyone around him starts reacting to who he now obviously is.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 1 Samuel 18 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Jonathan&apos;s Soul Knit to David&apos;s (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens before Saul has said a single word about what he plans to do with David.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when he had made an end of speaking unto Saul, that the soul of Jonathan was knit with the soul of David, and Jonathan loved him as his own soul."
          reference="1 Samuel 18:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Knit&quot; describes two separate things being bound together so
            tightly they function as one.</strong> This is not Jonathan being impressed by a good
            fight. It is the start of what Scripture treats as the deepest covenant friendship in
            the whole Old Testament, formed the moment the two men actually talk to each other for
            the first time.
          </p>
          <p>Saul keeps David close, and Jonathan does something that costs him something real.</p>
        </div>
        <VerseQuote
          text="Then Jonathan and David made a covenant, because he loved him as his own soul. And Jonathan stripped himself of the robe that was upon him, and gave it to David, and his garments, even to his sword, and to his bow, and to his girdle."
          reference="1 Samuel 18:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jonathan is the crown prince. The robe, sword, bow, and belt he hands over are not
            spare clothing, they are the exact gear that marked him as Saul&apos;s heir and Israel&apos;s
            best fighter. Many readers of this chapter take the gesture as more than a gift between
            friends: Jonathan is the one man in Israel with an actual claim to the throne David has
            already been secretly anointed for, and he hands his own symbols of that claim to David
            without being asked.
          </p>
          <p>
            💡 Whatever Jonathan understood about David&apos;s future that day, the text does not
            say he knew about the anointing back in{" "}
            <ArticleLink href="/blog/1-samuel-16-explained">1 Samuel 16</ArticleLink>. What it shows
            is a king&apos;s son choosing loyalty to David over his own position, the opposite
            instinct his father is about to have.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. A New Captain, a Song, and the Start of Saul&apos;s Jealousy (verses 5 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>David&apos;s rise in Saul&apos;s court is immediate, and at first it looks like nothing but good news.</p>
        </div>
        <VerseQuote
          text="And David went out whithersoever Saul sent him, and behaved himself wisely: and Saul set him over the men of war, and he was accepted in the sight of all the people, and also in the sight of Saul's servants."
          reference="1 Samuel 18:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then comes the detail that turns the mood of the whole chapter. Israel&apos;s women
            come out to celebrate the army&apos;s return, and their song puts two names side by
            side in a way nobody can unhear.
          </p>
        </div>
        <VerseQuote
          text="And the women answered one another as they played, and said, Saul hath slain his thousands, and David his ten thousands."
          reference="1 Samuel 18:7"
        />
        <VerseQuote
          text="And Saul was very wroth, and the saying displeased him; and he said, They have ascribed unto David ten thousands, and to me they have ascribed but thousands: and what can he have more but the kingdom?"
          reference="1 Samuel 18:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Saul does the math out loud, and the math is not really the problem.</strong>{" "}
            A folk song exaggerating numbers at a victory parade is ordinary. What Saul hears
            underneath it is a question about his own throne, a question nobody in the song was
            actually asking.
          </p>
        </div>
        <VerseQuote text="And Saul eyed David from that day and forward." reference="1 Samuel 18:9" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One line, and the whole relationship changes. Saul does not confront David, banish him,
            or even speak to him about it. He simply starts watching him, which turns out to be far
            more dangerous than an open argument would have been.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Javelin in the House (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The watching does not stay passive for long. The same torment{" "}
            <ArticleLink href="/blog/1-samuel-16-explained">1 Samuel 16</ArticleLink> introduced
            returns, and this time David is standing close enough to become its target.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass on the morrow, that the evil spirit from God came upon Saul, and he prophesied in the midst of the house: and David played with his hand, as at other times: and there was a javelin in Saul's hand."
          reference="1 Samuel 18:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Prophesied&quot; here does not describe David receiving a true word from God the
            way Samuel does elsewhere. The same Hebrew word can describe raving, agitated speech, a
            man coming apart in front of his own household. David is doing exactly what he always
            does, playing to calm him. This time it does not work.
          </p>
        </div>
        <VerseQuote
          text="And Saul cast the javelin; for he said, I will smite David even to the wall with it. And David avoided out of his presence twice."
          reference="1 Samuel 18:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the first time in the Bible Saul tries to kill David, and it happens
            inside his own home, against the man playing music to help him.</strong> The text says
            David dodged it twice, which means this was not a single lapse Saul could later explain
            away as an accident.
          </p>
        </div>
        <VerseQuote text="And Saul was afraid of David, because the LORD was with him, and was departed from Saul." reference="1 Samuel 18:12" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the reason given for Saul&apos;s fear. Not David&apos;s fighting skill, not
            his popularity. The LORD being with one man and gone from the other. Saul can feel the
            difference even without anyone explaining it to him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Promoted Away From the King, Not Promoted Up (verses 13 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Saul&apos;s response to a failed murder attempt is a reassignment that looks generous from the outside.</p>
        </div>
        <VerseQuote
          text="Therefore Saul removed him from him, and made him his captain over a thousand; and he went out and came in before the people."
          reference="1 Samuel 18:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A promotion that moves someone out of a king&apos;s sight is rarely only
            about rank.</strong> Saul cannot have David near him and safe at the same time, so he
            puts distance between them while handing David more public responsibility than before,
            not less.
          </p>
        </div>
        <VerseQuote text="And David behaved himself wisely in all his ways; and the LORD was with him." reference="1 Samuel 18:14" />
        <VerseQuote text="Wherefore when Saul saw that he behaved himself very wisely, he was afraid of him." reference="1 Samuel 18:15" />
        <VerseQuote text="But all Israel and Judah loved David, because he went out and came in before them." reference="1 Samuel 18:16" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Distance does not fix Saul&apos;s problem, it multiplies it.</strong> Every
            attempt to get David out of view only puts him in front of more people, who respond to
            him exactly the way the women at the victory parade did. The farther Saul pushes David
            away, the bigger David&apos;s reputation grows in the space he is pushed into.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Merab Promised, Then Given to Another (verses 17 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Saul tries a second strategy, one that looks like favor on the surface.</p>
        </div>
        <VerseQuote
          text="And Saul said to David, Behold my elder daughter Merab, her will I give thee to wife: only be thou valiant for me, and fight the LORD's battles. For Saul said, Let not mine hand be upon him, but let the hand of the Philistines be upon him."
          reference="1 Samuel 18:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Saul says the marriage offer out loud and keeps the real plan silent.</strong>{" "}
            A royal marriage sounds like reward. The actual goal, stated plainly to no one but the
            reader, is to put David in front of enough Philistine spears that Saul never has to
            raise a hand against him himself.
          </p>
          <p>David&apos;s answer is not false modesty. It is a genuine question about his own standing.</p>
        </div>
        <VerseQuote
          text="And David said unto Saul, Who am I? and what is my life, or my father's family in Israel, that I should be son in law to the king?"
          reference="1 Samuel 18:18"
        />
        <VerseQuote
          text="But it came to pass at the time when Merab Saul's daughter should have been given to David, that she was given unto Adriel the Meholathite to wife."
          reference="1 Samuel 18:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The text never explains why the promise was broken. It simply records that it was.
            Whatever Saul&apos;s reasoning, the pattern already set earlier in the chapter, offer
            something that looks like honor while quietly managing the risk David represents,
            continues here without a single word of apology to David for the broken word.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Michal&apos;s Love and a Deadly Dowry (verses 20 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>A second daughter enters the story, and this time her feelings are stated directly.</p>
        </div>
        <VerseQuote text="And Michal Saul's daughter loved David: and they told Saul, and the thing pleased him." reference="1 Samuel 18:20" />
        <VerseQuote
          text="And Saul said, I will give him her, that she may be a snare to him, and that the hand of the Philistines may be against him. Wherefore Saul said to David, Thou shalt this day be my son in law in the one of the twain."
          reference="1 Samuel 18:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Saul says it plainly this time: he wants his own daughter to be a snare.</strong>{" "}
            Michal&apos;s real love for David becomes, in her father&apos;s mind, simply another
            tool for getting David killed by someone else&apos;s hand. Scripture does not soften
            this or explain it away. It states it, and lets the reader feel how far Saul has already
            fallen from the man who once stood head and shoulders above Israel as its answer to
            prayer.
          </p>
          <p>Saul works the offer through intermediaries first, to feel out whether David will take the bait.</p>
        </div>
        <VerseQuote
          text="And Saul's servants spake those words in the ears of David. And David said, Seemeth it to you a light thing to be a king's son in law, seeing that I am a poor man, and lightly esteemed?"
          reference="1 Samuel 18:23"
        />
        <VerseQuote
          text="And Saul said, Thus shall ye say to David, The king desireth not any dowry, but an hundred foreskins of the Philistines, to be avenged of the king's enemies. But Saul thought to make David fall by the hand of the Philistines."
          reference="1 Samuel 18:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A dowry of a hundred Philistine foreskins is not a strange cultural footnote to skip
            past. It requires David to go deep into enemy territory and survive direct, repeated
            combat a hundred times over, phrased as a patriotic request so refusing it would look
            like cowardice. The text states Saul&apos;s actual intention without any ambiguity
            left for the reader to guess at.
          </p>
        </div>
        <VerseQuote
          text="Wherefore David arose and went, he and his men, and slew of the Philistines two hundred men; and David brought their foreskins, and they gave them in full tale to the king, that he might be the king's son in law. And Saul gave him Michal his daughter to wife."
          reference="1 Samuel 18:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>David does not just meet the price, he doubles it.</strong> The plan built to
            end David&apos;s life instead hands him a wife, a stronger military reputation, and a
            formal place inside the royal family, exactly the outcome the plan existed to prevent.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. An Enemy for the Rest of His Life (verses 28 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by naming what Saul has become, without any softer word for it.</p>
        </div>
        <VerseQuote text="And Saul saw and knew that the LORD was with David, and that Michal Saul's daughter loved him." reference="1 Samuel 18:28" />
        <VerseQuote text="And Saul was yet the more afraid of David; and Saul became David's enemy continually." reference="1 Samuel 18:29" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every scheme in this chapter made David&apos;s position stronger, and every
            one of those outcomes only deepened Saul&apos;s fear instead of settling it.</strong>{" "}
            Fear that will not accept evidence against itself does not fade with time. It calcifies
            into permanent enmity, which is exactly the word this verse uses.
          </p>
        </div>
        <VerseQuote
          text="Then the princes of the Philistines went forth: and it came to pass, after they went forth, that David behaved himself more wisely than all the servants of Saul; so that his name was much set by."
          reference="1 Samuel 18:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter that opened with one soul knit to David&apos;s closes with another soul
            permanently set against him. Both reactions started the same afternoon, from the same
            family, watching the same man.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 1 Samuel 18 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Jonathan know David was already anointed king when he gave him his robe and
            weapons?</strong> What the text says: verse 4 simply records the gift, right after
            verse 3 calls it part of a covenant born from Jonathan loving David as his own soul. How
            this is read: many readers take the robe and weapons as Jonathan symbolically setting
            aside his own claim to the throne in David&apos;s favor, since they were the exact items
            that marked him as heir. The chapter never states that Jonathan knew about the private
            anointing in 1 Samuel 16, so this reading rests on the symbolism of the gift, not on a
            claim the text makes outright.
          </p>
          <p>
            <strong>What does it mean that an evil spirit from God made Saul prophesy with a javelin
            in his hand?</strong> What the text says: verse 10 pairs &quot;the evil spirit from God
            came upon Saul&quot; with &quot;he prophesied in the midst of the house.&quot; How this
            is read: the Hebrew word translated prophesied can describe ecstatic, agitated speech
            as well as true revelation from God, and nothing in this scene presents Saul&apos;s
            words as a genuine message from the LORD. The chapter is describing a man coming apart
            in front of his household, not delivering prophecy in the sense Samuel does elsewhere.
          </p>
          <p>
            <strong>Why did Saul break his promise to give David his daughter Merab?</strong> What
            the text says: verse 19 simply reports that she was given to Adriel instead, with no
            reason stated. How this is read: given the plan already stated in verse 17, to expose
            David to Philistine spears rather than raise a hand against him personally, some readers
            see the broken promise as part of the same pattern of using marriage as a tool rather
            than a genuine reward. The text itself stays silent on Saul&apos;s exact motive here,
            and that silence is worth leaving unresolved rather than filled in with certainty the
            chapter does not supply.
          </p>
          <p>
            <strong>Was the relationship between David and Jonathan romantic?</strong> What the text
            says: verse 1 and verse 3 both use the language of a soul knit to another and loved
            &quot;as his own soul.&quot; How this is read: this is covenant language describing
            total loyalty between two men in a culture where sworn friendships carried real
            political and personal weight, the same category as the covenant David later keeps with
            Jonathan&apos;s surviving family. The text gives no indication of anything beyond that
            covenant friendship, and reading the passage as describing something it never claims
            goes beyond what the words actually say.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 1 Samuel 18
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 Samuel 18:1</h3>
        <VerseQuote
          text="And it came to pass, when he had made an end of speaking unto Saul, that the soul of Jonathan was knit with the soul of David, and Jonathan loved him as his own soul."
          reference="1 Samuel 18:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The covenant friendship that will carry David through some of his darkest years begins
          here, on the very first day anyone outside his own family knew his name.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Samuel 18:7</h3>
        <VerseQuote
          text="And the women answered one another as they played, and said, Saul hath slain his thousands, and David his ten thousands."
          reference="1 Samuel 18:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A celebration song, not an accusation, is what first plants the fear that will define the
          rest of Saul&apos;s reign.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Samuel 18:12</h3>
        <VerseQuote text="And Saul was afraid of David, because the LORD was with him, and was departed from Saul." reference="1 Samuel 18:12" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s own explanation for everything that follows. Not David&apos;s skill.
          Who was with him, and who was not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Samuel 18:21</h3>
        <VerseQuote
          text="And Saul said, I will give him her, that she may be a snare to him, and that the hand of the Philistines may be against him."
          reference="1 Samuel 18:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Saul&apos;s own stated plan, with nothing left to guess at. His daughter&apos;s real love
          for David becomes bait in her father&apos;s hands.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Samuel 18:29</h3>
        <VerseQuote text="And Saul was yet the more afraid of David; and Saul became David's enemy continually." reference="1 Samuel 18:29" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verdict the whole chapter has been building toward, stated without any softening.
          Fear left unaddressed became a lasting enmity.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 1 Samuel 18
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 1 Samuel 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jonathan makes a covenant of loyal friendship with David right after the fight with
          Goliath, while Saul grows jealous after a victory song praises David more than himself.
          Saul tries to kill David with a javelin, then tries to have him killed by the Philistines
          through two separate marriage schemes involving his daughters Merab and Michal. Every
          plan fails, and the chapter ends with Saul permanently hostile toward David.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Jonathan give David his robe and armor?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 4 shows Jonathan stripping off his robe, sword, bow, and belt and giving them to
          David right after making a covenant with him. These items marked Jonathan as heir to the
          throne, which is why many readers see the gift as Jonathan setting aside his own claim in
          favor of David, not simply a gesture of friendship.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Saul jealous of David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 8 shows Saul reacting to a victory song that credited David with ten times the
          kills the song gave him, hearing in it a threat to his own kingdom. The jealousy was not
          really about the song&apos;s numbers, it was about what Saul feared the growing admiration for
          David meant for his throne.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saul really throw a javelin at David?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Verse 11 says Saul cast the javelin intending to kill David while he was playing
          music for him, and that David dodged it twice, which rules out reading it as a single
          accidental lapse.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does it say an evil spirit made Saul prophesy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 10 pairs the evil spirit coming on Saul with him prophesying in his house. The
          Hebrew word used can describe raving, agitated speech rather than true revelation, and
          the scene shows a tormented man coming apart, not delivering a genuine message from God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Saul give Michal to David instead of Merab?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Merab was promised to David first in verse 17, but verse 19 says she was given to Adriel
          instead without explanation. When Michal is later shown loving David in verse 20, Saul
          offers her instead, explicitly as a snare meant to get David killed by the Philistines.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the dowry of a hundred Philistine foreskins?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 25 records Saul demanding a hundred Philistine foreskins as Michal&apos;s bride price,
          framed as patriotic vengeance but privately intended, as the same verse states plainly, to
          get David killed in the fighting required to collect them. David returned with two
          hundred instead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the relationship between David and Jonathan romantic?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text describes a covenant friendship, using language about souls being knit together
          and loved as one&apos;s own self, the same category of devoted loyalty Scripture elsewhere
          describes between covenant partners. Nothing in the chapter presents it as anything beyond
          that bond of loyal friendship.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Saul make David a captain if he was afraid of him?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 13 shows Saul removing David from his immediate presence by promoting him over a
          thousand men, moving him out of sight rather than openly confronting him. The plan
          backfired, since verse 16 shows the promotion only put David in front of more people who
          came to love him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens right after 1 Samuel 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Saul openly orders Jonathan and his servants to kill David, and Jonathan intervenes to
          talk his father down, buying David a temporary reprieve that will not last through the
          chapters that follow.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>1 Samuel 18 is not really about a javelin or a dowry. It is about what happens when the same success reaches two different hearts.</p>
          <p>
            📌 <strong>Loyalty and jealousy can start in the same family, on the same afternoon,
            over the same man.</strong> Jonathan&apos;s soul was knit to David&apos;s before Saul
            had even finished eyeing him with suspicion.
          </p>
          <p>
            📌 <strong>Every scheme built to remove David only put him somewhere stronger.</strong>{" "}
            Distance made him more loved. A deadly dowry made him a son in law. Fear that refuses
            to accept evidence against itself never runs out of new plans to try.
          </p>
          <p>
            Saul spends this whole chapter afraid of something he cannot undo. The LORD had already
            left him and was already with David, and no amount of managing David&apos;s rise was
            ever going to change which of those two facts was true.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Notice whether you are responding to someone else&apos;s success the way Jonathan did,
            or the way Saul did, the next time it happens in front of you.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
