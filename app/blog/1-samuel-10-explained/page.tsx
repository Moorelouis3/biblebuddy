import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("1-samuel-10-explained", {
  title: "1 Samuel 10 Explained: Anointed in Secret, Chosen by Lot",
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

export default function OneSamuelTenExplainedPage() {
  return (
    <BlogPostShell
      slug="1-samuel-10-explained"
      title={<>📖 1 Samuel 10 Explained: Anointed in Secret, Chosen by Lot</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A jar of oil, poured on one man&apos;s head, with nobody else watching.</p>
            <p>Then, weeks or months later, a whole nation watching one name get pulled out by lot.</p>
            <p>
              <strong>1 Samuel 10 explained</strong> is the chapter where Saul becomes king twice.
              First privately, with Samuel and a vial of oil and a question that is really a
              statement. Then publicly, at Mizpeh, where God points him out in front of everyone
              through a process nobody could accuse of favoritism.
            </p>
            <p>Maybe you have been told something true about yourself in private, long before anyone else found out it was true.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Samuel anoint Saul quietly before anyone else is told anything?</li>
            <li>❓ What are the three signs Samuel promises will happen on the road home?</li>
            <li>❓ Why does Saul end up prophesying with a band of strangers, and why does that become a saying people repeat?</li>
            <li>❓ Why does the newly chosen king spend the ceremony hiding among the baggage?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Saul is confirmed as king in private before he is ever chosen as king in
              public, and the gap between those two moments is most of this chapter.</strong>
            </p>
            <p>
              Here is the whole chapter, in order: the anointing and the question behind it, three
              signs Samuel lays out in advance, a changed man meeting prophets on a hillside, an
              uncle who gets half the story, a nationwide lot that finds a king hiding in the
              supplies, and a crowd that is not entirely convinced.
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
            <ArticleLink href="/blog/1-samuel-9-explained">1 Samuel 9</ArticleLink> ended with Saul
            still thinking mostly about donkeys. A servant&apos;s suggestion had led him to Samuel
            instead of home, and Samuel had already been told the day before that this exact man
            would be sent to him. Samuel fed Saul the best portion at a public meal, talked with
            him through the night on a rooftop, then walked him to the edge of the city the next
            morning and sent the servant on ahead, alone, so he could tell Saul something in
            private.
          </p>
          <p>
            1 Samuel 10 explained picks up at that exact threshold. The servant is gone. Saul is
            standing in the road with Samuel, about to hear the word he came looking for directions,
            not a crown.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 1 Samuel 10 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Vial of Oil, and a Question That Is Really an Answer (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the moment the last one was building toward the whole time.</p>
        </div>
        <VerseQuote
          text="Then Samuel took a vial of oil, and poured it upon his head, and kissed him, and said, Is it not because the LORD hath anointed thee to be captain over his inheritance?"
          reference="1 Samuel 10:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A vial held a smaller amount of oil than the horn used for a later king&apos;s anointing,
            and some readers see that difference as its own quiet signal about how this reign
            starts and how it ends. The kiss was a normal greeting of loyalty
            and honor in that culture, not a strange gesture tacked on for effect.
          </p>
          <p>
            📌 <strong>Samuel phrases the anointing as a question, but it is not actually asking
            Saul anything.</strong> &quot;Is it not because the LORD hath anointed thee&quot; states
            a settled fact in the shape of a question, the same way someone might say &quot;isn&apos;t
            it good to see you&quot; without expecting an argument back. The oil has already been
            poured by the time the sentence finishes.
          </p>
          <p>
            Captain over his inheritance is a deliberate choice of words. Israel belongs to God
            first. Whoever leads this nation leads something that is still, underneath the new
            title, the LORD&apos;s own possession.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Three Signs for the Road Home (verses 2 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Samuel does not send Saul off with a title and nothing else. He gives him a map of proof.</p>
        </div>
        <VerseQuote
          text="When thou art departed from me to day, then thou shalt find two men by Rachel's sepulchre in the border of Benjamin at Zelzah; and they will say unto thee, The asses which thou wentest to seek are found: and, lo, thy father hath left the care of the asses, and sorroweth for you, saying, What shall I do for my son?"
          reference="1 Samuel 10:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the first sign, and it closes a loop Saul has been carrying since the errand
            began. The donkeys are found, and his father has stopped worrying about them and
            started worrying about him instead, which is exactly the fear Saul voiced to his
            servant back in chapter 9.
          </p>
        </div>
        <VerseQuote
          text="Then shalt thou go on forward from thence, and thou shalt come to the plain of Tabor, and there shall meet thee three men going up to God to Bethel, one carrying three kids, and another carrying three loaves of bread, and another carrying a bottle of wine:"
          reference="1 Samuel 10:3"
        />
        <VerseQuote
          text="And they will salute thee, and give thee two loaves of bread; which thou shalt receive of their hands."
          reference="1 Samuel 10:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The second sign is strangers treating Saul with honor he has done nothing yet to earn,
            offering food to a man they have no reason to single out. Then comes the third sign,
            the one the rest of the chapter actually shows happening.
          </p>
        </div>
        <VerseQuote
          text="After that thou shalt come to the hill of God, where is the garrison of the Philistines: and it shall come to pass, when thou art come thither to the city, that thou shalt meet a company of prophets coming down from the high place with a psaltery, and a tabret, and a pipe, and a harp, before them; and they shall prophesy:"
          reference="1 Samuel 10:5"
        />
        <VerseQuote
          text="And the Spirit of the LORD will come upon thee, and thou shalt prophesy with them, and shalt be turned into another man."
          reference="1 Samuel 10:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A psaltery, tabret, pipe, and harp were a small traveling band, the kind of music that
            accompanied prophesying elsewhere in Scripture. The point of naming four instruments is
            not the instruments themselves. It is that Saul is about to walk straight into something
            loud, public, and impossible to miss, right where a Philistine garrison is also stationed.
          </p>
          <p>
            Samuel then tells Saul what to do with everything he is about to experience.
          </p>
        </div>
        <VerseQuote
          text="And let it be, when these signs are come unto thee, that thou do as occasion serve thee; for God is with thee."
          reference="1 Samuel 10:7"
        />
        <VerseQuote
          text="And thou shalt go down before me to Gilgal; and, behold, I will come down unto thee, to offer burnt offerings, and to sacrifice sacrifices of peace offerings: seven days shalt thou tarry, till I come to thee, and shew thee what thou shalt do."
          reference="1 Samuel 10:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Do as occasion serve thee&quot; is Samuel handing Saul real authority to
            act, not a script to recite.</strong> The signs confirm the calling. They do not tell
            Saul exactly what to do with it. Gilgal and the wait of seven days become the exact
            spot where that freedom will matter a great deal, later in this book.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Another Man, and a Proverb Born on the Spot (verses 9 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Saul leaves Samuel, and the signs start arriving before he has time to doubt them.</p>
        </div>
        <VerseQuote
          text="And it was so, that when he had turned his back to go from Samuel, God gave him another heart: and all those signs came to pass that day."
          reference="1 Samuel 10:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The change is tied to that day, matching what Samuel promised, not described as a
            permanent new nature settled on Saul forever. God is equipping him for what is in front
            of him, the way the Spirit had already come on judges before him to fit them for a
            specific task.
          </p>
        </div>
        <VerseQuote
          text="And when they came thither to the hill, behold, a company of prophets met him; and the Spirit of God came upon him, and he prophesied among them."
          reference="1 Samuel 10:10"
        />
        <VerseQuote
          text="And it came to pass, when all that knew him beforetime saw that, behold, he prophesied among the prophets, then the people said one to another, What is this that is come unto the son of Kish? Is Saul also among the prophets?"
          reference="1 Samuel 10:11"
        />
        <VerseQuote
          text="And one of the same place answered and said, But who is their father? Therefore it became a proverb, Is Saul also among the prophets?"
          reference="1 Samuel 10:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>People who knew Saul&apos;s family are the ones most shocked by what they are
            watching.</strong> &quot;Who is their father&quot; is an odd reply at first glance, but
            it is making a point: prophesying was not inherited through a bloodline the way some
            offices were. Whoever answers is saying the Spirit lands where God chooses, regardless
            of family background, which is exactly what has just happened to Saul.
          </p>
          <p>
            The question &quot;Is Saul also among the prophets&quot; sticks around long enough to
            become a fixed saying, which tells readers this scene was well known long after it
            happened. It will come back once more, in a very different tone, later in this book.
          </p>
        </div>
        <VerseQuote
          text="And when he had made an end of prophesying, he came to the high place."
          reference="1 Samuel 10:13"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. An Uncle Asks, and Saul Keeps Half the Story (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The scene shifts from public spectacle to a quiet family conversation.</p>
        </div>
        <VerseQuote
          text="And Saul's uncle said unto him and to his servant, Whither went ye? And he said, To seek the asses: and when we saw that they were no where, we came to Samuel."
          reference="1 Samuel 10:14"
        />
        <VerseQuote
          text="And Saul's uncle said, Tell me, I pray thee, what Samuel said unto you."
          reference="1 Samuel 10:15"
        />
        <VerseQuote
          text="And Saul said unto his uncle, He told us plainly that the asses were found. But of the matter of the kingdom, whereof Samuel spake, he told him not."
          reference="1 Samuel 10:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Saul answers the question honestly, and still leaves out the part that
            matters most.</strong> The donkeys were found. That part he shares freely. The anointing
            he keeps to himself, even with family asking directly. This is not deception so much as
            restraint, a young man sitting on news too large to say out loud yet, even to someone he
            trusts.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Nation Gathered, a Tribe Taken, a King Found Hiding (verses 17 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Samuel calls a second national assembly, in the same place Israel confessed its sin two chapters earlier.</p>
        </div>
        <VerseQuote
          text="And Samuel called the people together unto the LORD to Mizpeh;"
          reference="1 Samuel 10:17"
        />
        <VerseQuote
          text="And said unto the children of Israel, Thus saith the LORD God of Israel, I brought up Israel out of Egypt, and delivered you out of the hand of the Egyptians, and out of the hand of all kingdoms, and of them that oppressed you:"
          reference="1 Samuel 10:18"
        />
        <VerseQuote
          text="And ye have this day rejected your God, who himself saved you out of all your adversities and your tribulations; and ye have said unto him, Nay, but set a king over us. Now therefore present yourselves before the LORD by your tribes, and by your thousands."
          reference="1 Samuel 10:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Samuel repeats the exact charge from 1 Samuel 8, word for word, on the very
            day he is about to hand them the king they demanded.</strong> Granting the request and
            restating the diagnosis are not treated as opposites. Israel gets what it asked for and
            hears, one more time, what asking for it actually cost.
          </p>
          <p>
            What follows is not a vote and not Samuel&apos;s personal pick. It is a process Israel
            could not rig in advance.
          </p>
        </div>
        <VerseQuote
          text="And when Samuel had caused all the tribes of Israel to come near, the tribe of Benjamin was taken."
          reference="1 Samuel 10:20"
        />
        <VerseQuote
          text="When he had caused the tribe of Benjamin to come near by their families, the family of Matri was taken, and Saul the son of Kish was taken: and when they sought him, he could not be found."
          reference="1 Samuel 10:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A tribe, then a family within it, then one man, narrowed down in front of the whole
            nation by a method Israel trusted precisely because no human hand could steer it.{" "}
            <ArticleLink href="/blog/joshua-7-explained">Joshua 7</ArticleLink> had used the same
            kind of process generations earlier to expose Achan&apos;s guilt. Here it exposes God&apos;s
            choice instead, the identical tool used to find a king rather than a criminal.
          </p>
          <p>
            And the man the process lands on is nowhere to be found.
          </p>
        </div>
        <VerseQuote
          text="Therefore they enquired of the LORD further, if the man should yet come thither. And the LORD answered, Behold, he hath hid himself among the stuff."
          reference="1 Samuel 10:22"
        />
        <VerseQuote
          text="And they ran and fetched him thence: and when he stood among the people, he was higher than any of the people from his shoulders and upward."
          reference="1 Samuel 10:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The tallest man in Israel is the one hiding among the baggage.</strong> The
            text does not explain whether this came from fear, genuine humility, or both at once.
            It simply records the fact, and leaves it sitting beside the same height that caught
            everyone&apos;s eye in{" "}
            <ArticleLink href="/blog/1-samuel-9-explained">1 Samuel 9</ArticleLink>. Being visible
            and being ready are not the same thing.
          </p>
        </div>
        <VerseQuote
          text="And Samuel said to all the people, See ye him whom the LORD hath chosen, that there is none like him among all the people? And all the people shouted, and said, God save the king."
          reference="1 Samuel 10:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Samuel frames the choice as entirely God&apos;s, not his own recommendation, and the
            crowd&apos;s shout answers that framing rather than arguing with it. &quot;God save the
            king&quot; is the first time this exact phrase appears in Scripture, and it is shouted
            over a man who, moments earlier, was found crouched among the supplies.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Manner of the Kingdom, Written Down, and Everyone Sent Home (verses 25 and 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Samuel does not let the shouting be the whole ceremony.</p>
        </div>
        <VerseQuote
          text="Then Samuel told the people the manner of the kingdom, and wrote it in a book, and laid it up before the LORD. And Samuel sent all the people away, every man to his house."
          reference="1 Samuel 10:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is a second manner of the kingdom, put in writing, after Samuel already
            gave Israel a spoken one in{" "}
            <ArticleLink href="/blog/1-samuel-8-explained">1 Samuel 8</ArticleLink>.</strong> That
            earlier speech warned what a king would take. This document, laid up before the LORD
            the way Israel&apos;s law itself was kept, most likely set expectations the king himself
            would be held to. Whatever it contained in detail, the chapter treats it as serious
            enough to write down and store beside God&apos;s own presence, not simply spoken once
            and forgotten.
          </p>
        </div>
        <VerseQuote
          text="And Saul also went home to Gibeah; and there went with him a band of men, whose hearts God had touched."
          reference="1 Samuel 10:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Saul does not march home as king. He walks home to Gibeah with a small group whose
            hearts God had moved toward him, a quiet beginning for a reign that started with oil, a
            lot, and a shout, but no army and no crown yet.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Not Everyone Is Convinced (verse 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter refuses to end on applause alone.</p>
        </div>
        <VerseQuote
          text="But the children of Belial said, How shall this man save us? And they despised him, and brought him no presents. But he held his peace."
          reference="1 Samuel 10:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Children of Belial is a phrase for worthless or wicked men, used elsewhere in the Old
            Testament for people who show open contempt toward what God has established. Bringing a
            present to a new king was a normal gesture of loyalty, and this group makes a visible
            point of withholding it.
          </p>
          <p>
            💡 <strong>&quot;He held his peace&quot; closes the chapter on restraint, not
            retaliation.</strong> Saul does not force the question &quot;how shall this man save
            us&quot; to an answer here. He simply absorbs the insult and waits. The very next chapter
            is where that question gets answered, not with words, but with what Saul actually does
            when a real crisis reaches his door.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions 1 Samuel 10 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why anoint Saul privately in verse 1 and then choose him publicly by lot in
            verses 20 and 21? Isn&apos;t one of them unnecessary?</strong> What the text says:
            verse 1 happens with only Samuel and Saul present, while verses 17 through 24 describe
            an entirely separate, nationwide gathering at Mizpeh. How this is read: the two moments
            serve different audiences. The private anointing prepares Saul himself, giving him
            signs to confirm what Samuel told him before he has to face anyone else. The public lot
            convinces Israel, using a method nobody could claim Samuel had rigged in Saul&apos;s
            favor. One moment is for the king. The other is for the nation that has to accept him.
          </p>
          <p>
            <strong>Does &quot;God gave him another heart&quot; in verse 9 mean Saul became a
            permanently different, better man?</strong> What the text says: the change is tied
            directly to &quot;that day&quot; and to the specific signs Samuel had promised, not
            described as a lasting transformation of Saul&apos;s character going forward. How this
            is read: this reads as God equipping Saul for an immediate role and moment, the same
            kind of enabling the Spirit gave judges before him for specific tasks, rather than a
            permanent new nature. Later chapters of 1 Samuel, after Saul&apos;s repeated disobedience,
            show the Spirit eventually departing from him, which fits a temporary empowering far
            better than an unchangeable new heart.
          </p>
          <p>
            <strong>Was Saul&apos;s prophesying with the company of prophets the same thing Samuel
            does elsewhere in this book?</strong> What the text says: verses 10 through 13 describe
            Saul prophesying alongside musicians, in a way startling enough to the people who knew
            him that it became a lasting saying. How this is read: this looks like an outward,
            Spirit given sign confirming God&apos;s hand on Saul to onlookers, distinct from
            Samuel&apos;s ongoing calling to speak God&apos;s word as a prophet and judge over
            Israel. The chapter treats it as a one time confirming act, not Saul taking on a
            prophet&apos;s permanent office.
          </p>
          <p>
            <strong>Why does Saul hide among the baggage right when he is about to be named
            king?</strong> What the text says: verse 22 records the fact through God&apos;s own
            answer to Samuel&apos;s inquiry, with no stated reason given for Saul&apos;s side of it.
            How this is read: the honest answer is that the text does not say whether this was fear,
            reluctance, or genuine humility about a role he never sought out, and it matches the
            same hesitant reaction Saul already showed in{" "}
            <ArticleLink href="/blog/1-samuel-9-explained">1 Samuel 9</ArticleLink>. Reading
            certainty into his motive here goes further than the chapter itself does.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From 1 Samuel 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 1 Samuel 10:1</h3>
        <VerseQuote
          text="Then Samuel took a vial of oil, and poured it upon his head, and kissed him, and said, Is it not because the LORD hath anointed thee to be captain over his inheritance?"
          reference="1 Samuel 10:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment this whole book has been building toward since 1 Samuel 8, done quietly, with
          only two men present to witness it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 1 Samuel 10:6</h3>
        <VerseQuote
          text="And the Spirit of the LORD will come upon thee, and thou shalt prophesy with them, and shalt be turned into another man."
          reference="1 Samuel 10:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise fulfilled within the same chapter, showing exactly what it looks like when God
          equips a man for a role he never asked for.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 1 Samuel 10:19</h3>
        <VerseQuote
          text="And ye have this day rejected your God, who himself saved you out of all your adversities and your tribulations; and ye have said unto him, Nay, but set a king over us."
          reference="1 Samuel 10:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Samuel grants the request and repeats the warning in the same breath, on the very day he
          delivers the king Israel demanded.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. 1 Samuel 10:24</h3>
        <VerseQuote
          text="And Samuel said to all the people, See ye him whom the LORD hath chosen, that there is none like him among all the people? And all the people shouted, and said, God save the king."
          reference="1 Samuel 10:24"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first time this exact phrase appears in Scripture, shouted over a man found moments
          earlier hiding among the baggage.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Samuel 10:27</h3>
        <VerseQuote
          text="But the children of Belial said, How shall this man save us? And they despised him, and brought him no presents. But he held his peace."
          reference="1 Samuel 10:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A question the next chapter answers with action rather than argument, and a restraint from
          Saul that will not last his whole reign.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About 1 Samuel 10
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in 1 Samuel 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Samuel privately anoints Saul as king and gives him three confirming signs. On the road
          home, the Spirit of the LORD comes on Saul and he prophesies with a band of prophets,
          startling people who knew his family. Later, at a national gathering in Mizpeh, Israel&apos;s
          tribes are narrowed down by lot until Saul is chosen, though he is found hiding among the
          supplies before the crowd affirms him as king.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Saul was &quot;turned into another man&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 6 ties this change to the signs Samuel had already promised, happening on that
          specific day. It describes God empowering Saul for the role ahead of him, not a
          permanent transformation of his personal character, since later chapters show real
          struggles and failures in Saul&apos;s life after this moment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did people say &quot;Is Saul also among the prophets?&quot;</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          People who already knew Saul&apos;s family were shocked to see him prophesying, since nothing
          about his background suggested it. The reaction became a fixed saying, repeated by people
          who could not reconcile the man they knew with what they had just watched him do.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the three signs Samuel gave Saul?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Two men at Rachel&apos;s sepulchre telling him the lost donkeys were found, three men going to
          Bethel who would give him bread, and a company of prophets whose company he would join
          when the Spirit of the LORD came upon him. All three happened exactly as Samuel described.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Saul chosen by casting lots?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Casting lots among the tribes, then the families, then the individuals, let Israel see
          God&apos;s choice land on Saul without anyone being able to say Samuel had simply picked his
          favorite. It is the same method used earlier in Joshua 7 to expose Achan, here used
          instead to identify God&apos;s chosen king.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Saul hide when he was chosen as king?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 22 only records that he had hidden himself among the baggage, without explaining
          why. It may reflect genuine reluctance about a role he never sought, matching his honest
          surprise back in 1 Samuel 9, though the text leaves the exact motive unstated.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;children of Belial&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is a phrase for worthless or wicked men, used elsewhere in the Old Testament for people
          who show contempt for what God has set in place. In verse 27, this group refuses to bring
          Saul the customary gift of loyalty and openly questions whether he can actually help
          Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Saul tell anyone he had been anointed king?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not according to verse 16. When his uncle asked directly what Samuel had told him, Saul
          reported only that the donkeys were found and said nothing about the kingdom, keeping
          that part of the conversation to himself even with family.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does 1 Samuel 10 connect to Israel&apos;s demand for a king in 1 Samuel 8?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Samuel repeats, almost word for word, the same charge from 1 Samuel 8 that Israel had
          rejected God by asking for a king, right before presenting Saul to the nation. The request
          is granted and the warning is restated in the same breath, showing God&apos;s permission does
          not erase the cost Samuel had already explained.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens right after 1 Samuel 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter ends with some people despising Saul and questioning whether he can save
          anyone. The very next chapter answers that question directly, when a crisis at
          Jabeshgilead gives Saul his first real chance to act as king.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>1 Samuel 10 crowns a king twice, and neither time looks like what a crowning is supposed to look like.</p>
          <p>
            📌 <strong>What God confirms in private, He eventually makes known in public, on His own
            timetable.</strong> Saul carried the truth about his own future alone for a while before
            Israel ever saw it confirmed by lot.
          </p>
          <p>
            📌 <strong>Being chosen does not erase hesitation, and it does not need to.</strong>{" "}
            Saul hides among the baggage the same chapter he is anointed captain over God&apos;s own
            inheritance. Both things are true about him at once.
          </p>
          <p>
            The chapter ends with applause and contempt sitting side by side, and a new king who
            answers neither one with words. What he does instead is the whole subject of the next
            chapter.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of something God has already confirmed to you quietly, and ask whether you are
            still waiting on Him to make it known, or whether you are the one holding it back.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
