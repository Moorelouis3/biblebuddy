import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("judges-6-explained", {
  title: "Judges 6 Explained: Gideon, the Altar of Baal, and the Fleece",
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

export default function JudgesSixExplainedPage() {
  return (
    <BlogPostShell
      slug="judges-6-explained"
      title={<>📖 Judges 6 Explained: Gideon, the Altar of Baal, and the Fleece</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A man threshing wheat in secret, hiding his own food from raiders, is told he is a mighty man of valour.</p>
            <p>
              <strong>Judges 6 explained</strong> is the chapter where this book meets its most famous judge, and
              he does not arrive on a battlefield. He arrives at a winepress, scared of Midianite raiders, arguing
              with an angel about whether God has actually abandoned Israel.
            </p>
            <p>Maybe you have felt that gap yourself, the one between what you are told you are and what you actually feel like right now.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God send a prophet before He ever sends a deliverer?</li>
            <li>❓ Why does the angel call a hiding man a mighty man of valour before he has done a single brave thing?</li>
            <li>❓ Why does Gideon tear down his father&apos;s altar at night instead of in the open?</li>
            <li>❓ And what is really going on with the fleece, the one most people only remember as a trick with wet wool?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Gideon never once sounds confident in this chapter. He sounds like a man who needs proof,
              asks for it twice, and gets it both times.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: seven years of Israel hiding in caves, an
              unnamed prophet&apos;s rebuke, the angel at the winepress, the sign of fire, the altar torn down by
              night, the new name Gideon is given, and the two nights he asks God to prove Himself with a fleece of
              wool.
            </p>
            <p>Forty verses, one reluctant deliverer, and a God who answers every single doubt with patience instead of rebuke.</p>
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
            <ArticleLink href="/blog/judges-5-explained">Judges 5</ArticleLink> closed the Deborah and Barak story
            with a song and a number: forty years of rest after Sisera&apos;s defeat. That is the longest quiet
            stretch since Ehud&apos;s eighty years, and it is also exactly where the cycle Israel keeps repeating
            always leads. Rest does not last. It runs out the moment the generation that lived through the rescue
            is no longer the one making the choices.
          </p>
          <p>
            Judges 6 opens with the same sentence this book has used three times already since{" "}
            <ArticleLink href="/blog/judges-2-explained">Judges 2</ArticleLink> first named the pattern: Israel did
            evil again. This time the LORD does not sell them to a single king or a single army. He sells them to
            Midian, a people who do not even bother to conquer Israel&apos;s cities. They simply raid the land
            every harvest and leave.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Judges 6 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Seven Years Under Midian: Driven Into Caves (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the shortest, most familiar sentence in the whole book, then describes an oppression unlike any before it.</p>
        </div>
        <VerseQuote
          text="And the children of Israel did evil in the sight of the LORD: and the LORD delivered them into the hand of Midian seven years."
          reference="Judges 6:1"
        />
        <VerseQuote
          text="And the hand of Midian prevailed against Israel: and because of the Midianites the children of Israel made them the dens which are in the mountains, and caves, and strong holds."
          reference="Judges 6:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Every oppressor so far in this book has ruled Israel from somewhere. Midian does not rule anything.
            Israel is not paying tribute to a king sitting on a throne. It is living underground, in dens and caves
            and mountain strongholds, hiding from raiders who never settle down long enough to govern.
          </p>
        </div>
        <VerseQuote
          text="And so it was, when Israel had sown, that the Midianites came up, and the Amalekites, and the children of the east, even they came up against them; And they encamped against them, and destroyed the increase of the earth, till thou come unto Gaza, and left no sustenance for Israel, neither sheep, nor ox, nor ass."
          reference="Judges 6:3 and 4"
        />
        <VerseQuote
          text="For they came up with their cattle and their tents, and they came as grasshoppers for multitude; for both they and their camels were without number: and they entered into the land to destroy it."
          reference="Judges 6:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the timing of the raids.</strong> Verse 3 says they came up exactly when Israel had
            sown, meaning the attacks were timed to the planting season so the raiders could strip the harvest the
            moment it was ready. This was not random violence. It was a system built to starve a nation one planting
            cycle at a time, reaching all the way south to Gaza.
          </p>
          <p>The result is stated in one blunt line.</p>
        </div>
        <VerseQuote
          text="And Israel was greatly impoverished because of the Midianites; and the children of Israel cried unto the LORD."
          reference="Judges 6:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The same pattern every judge story has followed holds again. The cry does not come the first year of
            the raids, or even the third. It comes only after the land is already impoverished, after seven straight
            harvests stolen. Israel cries out late, the same way it always does in this book, but it still cries out.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The LORD Sends a Prophet Before a Deliverer (verses 7 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Something happens here that none of the earlier rescues included. Before any deliverer is named, God sends a message.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when the children of Israel cried unto the LORD because of the Midianites, That the LORD sent a prophet unto the children of Israel, which said unto them, Thus saith the LORD God of Israel, I brought you up from Egypt, and brought you forth out of the house of bondage;"
          reference="Judges 6:7 and 8"
        />
        <VerseQuote
          text="And I said unto you, I am the LORD your God; fear not the gods of the Amorites, in whose land ye dwell: but ye have not obeyed my voice."
          reference="Judges 6:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The prophet is not named. His entire job in this chapter is to say one thing plainly: the problem was
            never that God stopped acting. The problem is that Israel stopped listening. He rehearses the exodus
            from Egypt, the same rescue the whole nation claims to remember, and then delivers the verdict in six
            words: &quot;ye have not obeyed my voice.&quot;
          </p>
          <p>
            📌 <strong>Before Gideon ever hears from an angel, Israel already has the diagnosis.</strong> The
            raids are not a mystery God needs to explain. They are the direct result of a choice Israel already
            knows it made. The rebuke comes first, and the rescue comes second, which is new. No earlier chapter in
            this book bothered to send a prophet before raising up a judge.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Angel Finds Gideon Hiding His Grain (verses 11 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From the nation as a whole, the chapter narrows down to one man, caught in the middle of an ordinary, fearful task.</p>
        </div>
        <VerseQuote
          text="And there came an angel of the LORD, and sat under an oak which was in Ophrah, that pertained unto Joash the Abiezrite: and his son Gideon threshed wheat by the winepress, to hide it from the Midianites."
          reference="Judges 6:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Threshing wheat is loud, visible work, normally done out in the open on a hilltop to catch the wind.
            Gideon is doing it by a winepress instead, a smaller, hidden spot, specifically so Midianite raiders will
            not see the grain and take it. His introduction is not a battle scene. It is a man quietly trying to
            keep his family fed without getting robbed.
          </p>
        </div>
        <VerseQuote
          text="And the angel of the LORD appeared unto him, and said unto him, The LORD is with thee, thou mighty man of valour."
          reference="Judges 6:12"
        />
        <VerseQuote
          text="And Gideon said unto him, Oh my Lord, if the LORD be with us, why then is all this befallen us? and where be all his miracles which our fathers told us of, saying, Did not the LORD bring us up from Egypt? but now the LORD hath forsaken us, and delivered us into the hands of the Midianites."
          reference="Judges 6:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Mighty man of valour&quot; and Gideon&apos;s actual answer do not match at all.</strong>{" "}
            He has just been found hiding food from raiders, and he responds to the greeting with a complaint about
            secondhand miracles, stories his fathers told him, not anything he has seen himself. The gap between
            what the angel calls him and how Gideon actually feels is the whole engine of this chapter. God is not
            describing who Gideon currently is. He is naming who Gideon is about to become.
          </p>
          <p>Gideon&apos;s complaint gets a direct answer, aimed not at the nation but at him personally.</p>
        </div>
        <VerseQuote
          text="And the LORD looked upon him, and said, Go in this thy might, and thou shalt save Israel from the hand of the Midianites: have not I sent thee?"
          reference="Judges 6:14"
        />
        <VerseQuote
          text="And he said unto him, Oh my Lord, wherewith shall I save Israel? behold, my family is poor in Manasseh, and I am the least in my father's house."
          reference="Judges 6:15"
        />
        <VerseQuote
          text="And the LORD said unto him, Surely I will be with thee, and thou shalt smite the Midianites as one man."
          reference="Judges 6:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Gideon&apos;s excuse is not about ability. It is about rank.</strong> He does not say he is
            weak. He says his family is poor and he is the least important person in it, the same kind of objection{" "}
            <ArticleLink href="/blog/exodus-3-explained">Moses raised at the burning bush</ArticleLink> generations
            earlier. Both men get the same style of answer. God never argues with the self assessment. He simply
            promises His own presence is the actual qualification, not anything Gideon already has.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Sign of Fire, and an Altar Called The LORD Is Peace (verses 17 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Gideon does not refuse the call. He asks for proof that it is real before he moves any further.</p>
        </div>
        <VerseQuote
          text="And he said unto him, If now I have found grace in thy sight, then shew me a sign that thou talkest with me."
          reference="Judges 6:17"
        />
        <VerseQuote
          text="And Gideon went in, and made ready a kid, and unleavened cakes of an ephah of flour: the flesh he put in a basket, and he put the broth in a pot, and brought it out unto him under the oak, and presented it."
          reference="Judges 6:19"
        />
        <VerseQuote
          text="Then the angel of the LORD put forth the end of the staff that was in his hand, and touched the flesh and the unleavened cakes; and there rose up fire out of the rock, and consumed the flesh and the unleavened cakes. Then the angel of the LORD departed out of his sight."
          reference="Judges 6:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Gideon brings an entire meal, a goat and a large measure of flour baked into bread, the kind of
            offering a poor family would not waste on a stranger without a reason. The fire that answers him does
            not come from a torch or a coal. It rises straight out of the rock itself, and the messenger who asked
            for the meal simply vanishes the moment the fire finishes it.
          </p>
          <p>Only then does the full weight of who he has been talking to land on Gideon.</p>
        </div>
        <VerseQuote
          text="And when Gideon perceived that he was an angel of the LORD, Gideon said, Alas, O LORD God! for because I have seen an angel of the LORD face to face."
          reference="Judges 6:22"
        />
        <VerseQuote
          text="And the LORD said unto him, Peace be unto thee; fear not: thou shalt not die."
          reference="Judges 6:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Gideon&apos;s fear is not about the Midianites anymore. It is about having seen God.</strong>{" "}
            Ancient Israel widely believed that seeing God face to face meant death, and Gideon says so out loud. The
            answer he gets is not a correction of bad theology. It is a direct promise: peace, not death. Gideon
            responds the only way he knows how.
          </p>
        </div>
        <VerseQuote
          text="Then Gideon built an altar there unto the LORD, and called it Jehovahshalom: unto this day it is yet in Ophrah of the Abiezrites."
          reference="Judges 6:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Jehovahshalom means &quot;the LORD is peace.&quot; It follows the same pattern as{" "}
            <ArticleLink href="/blog/genesis-22-explained">Jehovahjireh, &quot;the LORD will provide,&quot;</ArticleLink>{" "}
            the name Abraham gave the mountain where a ram was caught in a thicket in his own son&apos;s place. Both
            names mark the exact spot where a terrified man discovered God was not the threat he feared.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Tearing Down Baal&apos;s Altar by Night, and the Name Jerubbaal (verses 25 to 32)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The very same night, Gideon gets a second assignment, and this one is far closer to home than the Midianites.</p>
        </div>
        <VerseQuote
          text="And it came to pass the same night, that the LORD said unto him, Take thy father's young bullock, even the second bullock of seven years old, and throw down the altar of Baal that thy father hath, and cut down the grove that is by it:"
          reference="Judges 6:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Before Gideon fights a single Midianite, God sends him to tear down an altar his own father
            built.</strong> The raiders camped in the valley are not the only problem. Joash, Gideon&apos;s father,
            keeps a Baal altar and a wooden Asherah pole right at home, in an Israelite household, during the exact
            years Israel is being crushed for exactly this kind of worship.
          </p>
          <p>Gideon obeys, but not in the way the command might suggest.</p>
        </div>
        <VerseQuote
          text="Then Gideon took ten men of his servants, and did as the LORD had said unto him: and so it was, because he feared his father's household, and the men of the city, that he could not do it by day, that he did it by night."
          reference="Judges 6:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The text names the reason plainly: fear of his own father&apos;s household and the men of the city.
            This is the same Gideon who just watched fire rise out of a rock, and he still cannot bring himself to
            do this in daylight. Faith to believe a sign and courage to act in public are not automatically the same
            thing, and this chapter lets that gap stand without smoothing it over.
          </p>
          <p>The morning brings exactly the reaction Gideon feared.</p>
        </div>
        <VerseQuote
          text="And when the men of the city arose early in the morning, behold, the altar of Baal was cast down, and the grove was cut down that was by it, and the second bullock was offered upon the altar that was built. And they said one to another, Who hath done this thing? And when they enquired and asked, they said, Gideon the son of Joash hath done this thing."
          reference="Judges 6:28 and 29"
        />
        <VerseQuote
          text="Then the men of the city said unto Joash, Bring out thy son, that he may die: because he hath cast down the altar of Baal, and because he hath cut down the grove that was by it."
          reference="Judges 6:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joash, the same father whose altar was just destroyed, is the one who defends his son.</p>
        </div>
        <VerseQuote
          text="And Joash said unto all that stood against him, Will ye plead for Baal? will ye save him? he that will plead for him, let him be put to death whilst it is yet morning: if he be a god, let him plead for himself, because one hath cast down his altar."
          reference="Judges 6:31"
        />
        <VerseQuote
          text="Therefore on that day he called him Jerubbaal, saying, Let Baal plead against him, because he hath thrown down his altar."
          reference="Judges 6:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Jerubbaal means something close to &quot;let Baal contend.&quot; It is meant as a taunt, daring a god
            that cannot speak to come defend his own broken altar. Joash&apos;s logic is simple and sharp: a god who
            needs human beings to kill his critics for him is not much of a god. Gideon carries this second name for
            the rest of his story, a permanent reminder of the morning a lifeless idol was publicly dared to do
            something and did nothing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Muster, and a Fleece Asked Twice (verses 33 to 40)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the altar down, the actual invasion arrives.</p>
        </div>
        <VerseQuote
          text="Then all the Midianites and the Amalekites and the children of the east were gathered together, and went over, and pitched in the valley of Jezreel."
          reference="Judges 6:33"
        />
        <VerseQuote
          text="But the Spirit of the LORD came upon Gideon, and he blew a trumpet; and Abiezer was gathered after him. And he sent messengers throughout all Manasseh; who also was gathered after him: and he sent messengers unto Asher, and unto Zebulun, and unto Naphtali; and they came up to meet them."
          reference="Judges 6:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Zebulun and Naphtali answer the trumpet again, the same two tribes{" "}
            <ArticleLink href="/blog/judges-4-explained">Barak called to mount Tabor</ArticleLink> a generation
            earlier. The Spirit coming upon Gideon is what turns a hiding farmer into someone an entire region will
            rally behind, but the man who just raised an army still is not finished asking for proof.
          </p>
        </div>
        <VerseQuote
          text="And Gideon said unto God, If thou wilt save Israel by mine hand, as thou hast said, Behold, I will put a fleece of wool in the floor; and if the dew be on the fleece only, and it be dry upon all the earth beside, then shall I know that thou wilt save Israel by mine hand, as thou hast said."
          reference="Judges 6:36 and 37"
        />
        <VerseQuote
          text="And it was so: for he rose up early on the morrow, and thrust the fleece together, and wringed the dew out of the fleece, a bowl full of water."
          reference="Judges 6:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Dew settling on wool overnight is ordinary. Dew settling on wool while the ground all around
            stays completely dry is not.</strong> God gives the sign exactly as asked, a bowl full of water wrung
            from one fleece on an otherwise dry night. Gideon, already holding proof, still is not done.
          </p>
        </div>
        <VerseQuote
          text="And Gideon said unto God, Let not thine anger be hot against me, and I will speak but this once: let me prove, I pray thee, but this once with the fleece; let it now be dry only upon the fleece, and upon all the ground let there be dew."
          reference="Judges 6:39"
        />
        <VerseQuote
          text="And God did so that night: for it was dry upon the fleece only, and there was dew on all the ground."
          reference="Judges 6:40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Gideon asks for the exact reverse result the second time, and opens his request by admitting
            he expects God might be angry at him for asking again.</strong> God is not angry. He simply does it. The
            chapter ends on that quiet reversal, a dry fleece surrounded by soaked ground, proof stacked on proof,
            for a man who still has not led a single battle yet.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Judges 6 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Was it wrong for Gideon to ask the angel for a sign in verses 17 through 21 before believing
            the call was real?</strong> What the text says: Gideon asks plainly for proof, and the angel grants it
            without rebuke, answering with fire from the rock rather than a correction. How this is read: the
            request comes from a man trying to be sure he is hearing from God and not simply reassuring himself of
            something he wants, which several Bible teachers distinguish from demanding proof out of stubborn
            refusal to obey.{" "}
            <ArticleLink href="/blog/is-it-a-sin-to-doubt-god">Honest doubt and unbelief are not the same
            thing</ArticleLink>, and Gideon moves forward the moment he has his answer rather than stalling further.
          </p>
          <p>
            <strong>Does the fleece test in verses 36 through 40 mean it is right to ask God for a sign to confirm
            His will today?</strong> What the text says: Gideon asks twice for a specific, falsifiable result, and
            God grants both requests exactly as asked. How this is read: Scripture elsewhere warns against putting
            God to the test out of unbelief, yet Gideon is never corrected here, and God answers patiently both
            times. Bible teachers generally read this as describing what happened to Gideon in his specific calling,
            not as a general method for every believer to copy whenever they want certainty before obeying something
            God has already made clear.
          </p>
          <p>
            <strong>Was Gideon&apos;s decision to tear down Baal&apos;s altar at night, out of fear, a failure of
            courage?</strong> What the text says: verse 27 states his fear of his father&apos;s household and the
            men of the city as the plain reason he waited for darkness. How this is read: the chapter does not
            praise the choice or call it cowardice either. It simply reports it, then shows the same man leading an
            entire regional muster a few verses later. Judges 6 treats courage as something that grows across the
            chapter rather than something Gideon arrives with already finished.
          </p>
          <p>
            <strong>Who exactly is &quot;the angel of the LORD&quot; who speaks with Gideon in this chapter?</strong>{" "}
            What the text says: verse 14 has &quot;the LORD&quot; Himself speak the words the angel had just been
            speaking, and Gideon reacts in verse 22 as though he has seen God, not merely a messenger. How this is
            read: many Bible teachers read these appearances of &quot;the angel of the LORD&quot; across the Old
            Testament as a visible appearance of God Himself, since the speaker is addressed and treated as God and
            not as a created being delivering a separate message. The text moves between the two titles without
            flagging a change in who is actually speaking.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Judges 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Judges 6:12</h3>
        <VerseQuote text="And the angel of the LORD appeared unto him, and said unto him, The LORD is with thee, thou mighty man of valour." reference="Judges 6:12" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A greeting that names Gideon for who he is about to become, spoken to a man currently hiding grain from the very enemy he will defeat.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Judges 6:14</h3>
        <VerseQuote text="And the LORD looked upon him, and said, Go in this thy might, and thou shalt save Israel from the hand of the Midianites: have not I sent thee?" reference="Judges 6:14" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The commission answers Gideon&apos;s complaint directly. The might he is sent in is never described as his own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Judges 6:23</h3>
        <VerseQuote text="And the LORD said unto him, Peace be unto thee; fear not: thou shalt not die." reference="Judges 6:23" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A direct answer to the oldest fear in the Bible, that seeing God face to face means death, given to a man who just assumed his own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Judges 6:24</h3>
        <VerseQuote text="Then Gideon built an altar there unto the LORD, and called it Jehovahshalom: unto this day it is yet in Ophrah of the Abiezrites." reference="Judges 6:24" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The LORD is peace, marked permanently on the exact spot where a terrified man discovered God was not the threat he feared.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Judges 6:34</h3>
        <VerseQuote text="But the Spirit of the LORD came upon Gideon, and he blew a trumpet; and Abiezer was gathered after him." reference="Judges 6:34" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same man who once worked by night out of fear now blows the trumpet that gathers an army, once the Spirit, not his own nerve, moves him.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Judges 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Judges 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Israel served Midian seven years after raiders stripped the land&apos;s harvests, driving the people into
          caves. God sent an unnamed prophet to rebuke their disobedience, then the angel of the LORD appeared to
          Gideon, called him to deliver Israel, confirmed the call with fire from a rock, had him tear down his
          father&apos;s altar of Baal, and gave him a new name, Jerubbaal. The chapter ends with Gideon gathering an
          army and asking God twice to confirm the victory with a sign involving a fleece of wool.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Gideon in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Gideon was the son of Joash, from the clan of Abiezer in the tribe of Manasseh. Judges 6 introduces him
          hiding wheat from Midianite raiders, then calls him through the angel of the LORD to become the judge who
          would deliver Israel from seven years of oppression.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Jehovahshalom mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jehovahshalom means &quot;the LORD is peace.&quot; Gideon gives this name to the altar he builds in verse
          24, right after the LORD tells him &quot;Peace be unto thee; fear not&quot; for having seen the angel of
          the LORD face to face.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Gideon also called Jerubbaal?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          After Gideon tears down his father&apos;s altar of Baal, the men of the city demand his death. Joash, his
          own father, defends him by challenging Baal to defend himself, and names his son Jerubbaal, meaning
          &quot;let Baal contend,&quot; in verse 32.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Gideon ask for a sign before believing the angel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 17 has Gideon ask for proof that he is really talking with God rather than acting on a mistaken
          impression. The angel grants the sign of fire without any rebuke, and Gideon moves forward in obedience
          immediately after receiving it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the meaning of the fleece test in Judges 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In verses 36 through 40, Gideon asks God for two specific, opposite signs involving dew on a fleece of
          wool, to confirm that God would really save Israel by his hand. God grants both requests exactly as asked,
          and the chapter presents it as part of Gideon&apos;s own personal journey toward confidence, not as a
          method every believer is told to repeat.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the angel of the LORD in Judges 6 Jesus or an angel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text calls the visitor &quot;the angel of the LORD,&quot; but it also has &quot;the LORD&quot;
          Himself speak in verse 14, and Gideon reacts as if he has seen God directly. Many Bible teachers read this
          figure across the Old Testament as a visible appearance of God, though Scripture itself never fully
          explains the exact relationship between the two titles.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Midianites oppress Israel for seven years?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 1 states it as a direct consequence of Israel doing evil in the LORD&apos;s sight, continuing the
          same pattern of sin and judgment this book has followed since Judges 2. The oppression itself worked by
          raiding the harvest each year rather than ruling Israel&apos;s cities directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Gideon tear down his father&apos;s altar at night?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 27 says he feared his father&apos;s household and the men of the city, so he waited until night to
          obey God&apos;s command. The text does not praise or condemn the timing. It simply records it, then shows
          Gideon gathering an army openly only a few verses later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the lesson of Judges 6 for today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God can call someone to a task long before that person feels ready for it, and that He answers honest
          uncertainty with patient confirmation rather than rejection. Gideon never sounds confident in this chapter,
          and he is still the one God chooses to use.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Judges 6 introduces its most famous judge as its least confident one.</p>
          <p>
            📌 <strong>God names Gideon a mighty man of valour before Gideon has done anything brave.</strong> The
            call came first. The courage came later, built up one sign and one small obedience at a time.
          </p>
          <p>
            📌 <strong>Honest uncertainty is not the same as disobedience.</strong> Gideon asked for proof twice and
            still obeyed every time he received it, and God never once punished him for asking.
          </p>
          <p>
            📌 <strong>The closest idol is sometimes the first one that has to come down.</strong> Gideon faced his
            own father&apos;s altar before he ever faced a Midianite army.
          </p>
          <p>
            You may feel more like a man hiding grain than a mighty man of valour right now. Gideon felt exactly the
            same way the day God called him that.
          </p>
          <p>So here is your one next step.</p>
          <p>Name the one thing closest to home that God is actually asking you to deal with first, before you look further out for the fight you expected instead.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
