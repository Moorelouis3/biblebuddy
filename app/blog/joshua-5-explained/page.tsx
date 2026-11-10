import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-5-explained", {
  title: "Joshua 5 Explained: A New Circumcision Before the First Battle",
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

export default function JoshuaFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-5-explained"
      title={<>📖 Joshua 5 Explained: A New Circumcision Before the First Battle</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Israel just crossed a flooded river on dry ground. Jericho is in sight. And God&apos;s next order is not about swords.</p>
            <p>
              <strong>Joshua 5 explained</strong> is the chapter where a whole army, camped within sight of
              an enemy city, makes itself physically unable to fight for days, keeps a feast instead of
              marching, and then watches a stranger with a drawn sword walk straight toward Joshua and
              refuse to pick a side.
            </p>
            <p>Maybe you have wondered why God would ask His people to be at their weakest moment possible, right next to a threat.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did God order every man circumcised right next to Jericho, of all places and times?</li>
            <li>❓ What was this &quot;second time&quot; circumcision actually fixing?</li>
            <li>❓ Why does the manna stop the same week Israel keeps its first Passover in Canaan?</li>
            <li>❓ Who is the &quot;captain of the host of the LORD,&quot; and why does Joshua fall on his face?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every scene in this chapter trades a safer option for a more exposed one, and
              every time, that exposure is the point.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter: the enemy kings whose hearts already failed
              them, the knives and the hill named for them, the feast kept in the shadow of a walled city,
              the day the manna simply stopped, and the armed man who meets Joshua and will not answer his
              question the way Joshua expects.
            </p>
            <p>Read slowly. This chapter is about what it costs to be made ready, not just willing.</p>
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
            <ArticleLink href="/blog/joshua-4-explained">Joshua 4</ArticleLink> ended with the last
            Israelite stepping onto dry ground, the Jordan closing back up behind the priests the instant
            their feet lifted out of it, and two separate sets of twelve stones left behind as proof: one
            carried to the camp at Gilgal, one left in the riverbed itself. Reuben, Gad, and half of
            Manasseh had crossed armed at the front of the column, keeping a promise their fathers made
            decades earlier. The LORD had magnified Joshua in front of the whole nation, exactly as He had
            promised.
          </p>
          <p>
            Joshua 5 opens on the other side of that river, with Israel camped at Gilgal on the plains of
            Jericho, and the very first verse answers a question nobody in the camp had even asked yet:
            what did the people living in this land think when they heard what just happened to the river?
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 5 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Land Already Knows (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before Joshua gives a single order in this chapter, the text reports what has already happened to the enemy.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when all the kings of the Amorites, which were on the side of Jordan westward, and all the kings of the Canaanites, which were by the sea, heard that the LORD had dried up the waters of Jordan from before the children of Israel, until we were passed over, that their heart melted, neither was there spirit in them any more, because of the children of Israel."
          reference="Joshua 5:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the small word tucked in the middle of this verse: &quot;until we were
            passed over.&quot;</strong> The writer briefly drops into first person, as someone who was
            actually there for the crossing, before switching straight back to third person narration.
            Scholars have long pointed to moments like this as evidence the book carries an eyewitness
            voice inside it, not just a later summary written from a distance.
          </p>
          <p>
            Every king on this side of the Jordan has now heard the same report <ArticleLink href="/blog/joshua-2-explained">Rahab
            already gave the spies</ArticleLink>: hearts melting, courage gone, before a single battle. The
            chapter spends its first verse making sure you know the fear was already total, so that
            nothing Israel does next can be mistaken for the reason Canaan is afraid.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Circumcise Again (verses 2 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the enemy already terrified, God&apos;s first command is not about Jericho&apos;s walls.</p>
        </div>
        <VerseQuote
          text="At that time the LORD said unto Joshua, Make thee sharp knives, and circumcise again the children of Israel the second time."
          reference="Joshua 5:2"
        />
        <VerseQuote
          text="And Joshua made him sharp knives, and circumcised the children of Israel at the hill of the foreskins."
          reference="Joshua 5:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Stop and picture where this happens.</strong> Israel is camped on the plains of
            Jericho, close enough that the people inside the city can see the camp. Every fighting man in
            the nation is about to be in no condition to fight for days, at the exact moment a fortified
            enemy city sits within sight. If Jericho had chosen to attack right then, Israel would have had
            almost nothing to defend itself with but trust.
          </p>
          <p>The text then explains, plainly, why this had never been done before now.</p>
        </div>
        <VerseQuote
          text="And this is the cause why Joshua did circumcise: All the people that came out of Egypt, that were males, even all the men of war, died in the wilderness by the way, after they came out of Egypt."
          reference="Joshua 5:4"
        />
        <VerseQuote
          text="Now all the people that came out were circumcised: but all the people that were born in the wilderness by the way as they came forth out of Egypt, them they had not circumcised."
          reference="Joshua 5:5"
        />
        <VerseQuote
          text="For the children of Israel walked forty years in the wilderness, till all the people that were men of war, which came out of Egypt, were consumed, because they obeyed not the voice of the LORD: unto whom the LORD sware that he would not shew them the land, which the LORD sware unto their fathers that he would give us, a land that floweth with milk and honey."
          reference="Joshua 5:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Circumcision was the sign of God&apos;s covenant with Abraham, going all the way back to{" "}
            <ArticleLink href="/blog/genesis-17-explained">God&apos;s promise in Genesis 17</ArticleLink>,
            where every male descendant was to carry it as a permanent mark of belonging to that covenant.
            An entire generation, born during forty years of wandering caused by their parents&apos;
            unbelief, had grown up without it. The sign had quietly lapsed right alongside the obedience
            that was supposed to go with it.
          </p>
          <p>
            📌 <strong>Verse 6 does not soften why this generation almost missed the land their parents
            refused to trust God for.</strong> &quot;Because they obeyed not the voice of the LORD&quot; is
            stated as fact, not debated. The children inherited the promise, but the covenant mark on their
            own bodies had to be restored before they could step fully into it.
          </p>
        </div>
        <VerseQuote
          text="And their children, whom he raised up in their stead, them Joshua circumcised: for they were uncircumcised, because they had not circumcised them by the way."
          reference="Joshua 5:7"
        />
        <VerseQuote
          text="And it came to pass, when they had done circumcising all the people, that they abode in their places in the camp, till they were whole."
          reference="Joshua 5:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            There is also a practical reason this could never have happened mid journey. A whole nation
            recovering from circumcision needed to stay still, camped in one place, for days of healing.
            The wilderness, with no fixed home and manna gathered fresh every morning, never offered that
            kind of stillness. Only now, finally settled on the very edge of the promised land, does
            Israel have the stability to do what the wilderness never allowed.
          </p>
        </div>
        <VerseQuote
          text="And the LORD said unto Joshua, This day have I rolled away the reproach of Egypt from off you. Wherefore the name of the place is called Gilgal unto this day."
          reference="Joshua 5:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Many Bible teachers connect the name <strong>Gilgal</strong> to a Hebrew word meaning to roll,
            matching the LORD&apos;s own words here almost exactly: this day I have rolled away. Whatever
            the reproach of Egypt specifically meant, slavery, uncircumcision, or the shame of forty wasted
            years, God names the place itself after the moment it finally ended.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The First Passover in Canaan, and the Manna Stops (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the nation is circumcised, it keeps a feast that this exact generation has only ever heard about secondhand.</p>
        </div>
        <VerseQuote
          text="And the children of Israel encamped in Gilgal, and kept the passover on the fourteenth day of the month at even in the plains of Jericho."
          reference="Joshua 5:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This detail connects straight back to the law Israel already carried about{" "}
            <ArticleLink href="/blog/exodus-12-explained">the Passover</ArticleLink>, which required every
            male keeping it to be circumcised first. Israel could not have kept this feast properly even
            one day earlier. The circumcision at Gilgal was not only about restoring a sign, it was the
            precondition for everything that happens next in this chapter.
          </p>
        </div>
        <VerseQuote
          text="And they did eat of the old corn of the land on the morrow after the passover, unleavened cakes, and parched corn in the selfsame day."
          reference="Joshua 5:11"
        />
        <VerseQuote
          text="And the manna ceased on the morrow after they had eaten of the old corn of the land; neither had the children of Israel manna any more; but they did eat of the fruit of the land of Canaan that year."
          reference="Joshua 5:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>God does not run two food supplies at once a day longer than needed.</strong> The
            manna that had fed Israel since the wilderness, the supply{" "}
            <ArticleLink href="/blog/exodus-16-explained">first given in Exodus 16</ArticleLink>, stops the
            very day the land itself starts feeding them instead. The miracle does not overlap with the
            ordinary provision it was always meant to give way to. It simply ends, the moment it is no
            longer necessary.
          </p>
          <p>
            📌 <strong>Forty years of daily miracle, and the transition out of it takes exactly one
            verse.</strong> No ceremony marks the last bowl of manna. The text barely pauses before moving
            to the next thing God does.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Captain of the LORD&apos;s Host (verses 13 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends with a scene that starts as a confrontation and turns into something else entirely.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when Joshua was by Jericho, that he lifted up his eyes and looked, and, behold, there stood a man over against him with his sword drawn in his hand: and Joshua went unto him, and said unto him, Art thou for us, or for our adversaries?"
          reference="Joshua 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joshua does the one thing that looks reckless on paper. He sees an armed stranger near an
            enemy city and walks straight toward him, asking a question with only two possible answers:
            whose side are you on.
          </p>
        </div>
        <VerseQuote
          text="And he said, Nay; but as captain of the host of the LORD am I now come. And Joshua fell on his face to the earth, and did worship, and said unto him, What saith my lord unto his servant?"
          reference="Joshua 5:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Nay&quot; is the whole answer.</strong> He does not say he is for Israel. He
            will not be filed under either side Joshua offered. He comes as the one in command, over
            Israel&apos;s cause itself, not as a soldier taking a position inside it. Joshua&apos;s
            instant response, falling to the ground, is not how anyone reacts to meeting a fellow general.
          </p>
        </div>
        <VerseQuote
          text="And the captain of the LORD's host said unto Joshua, Loose thy shoe from off thy foot; for the place whereon thou standest is holy. And Joshua did so."
          reference="Joshua 5:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The wording here is nearly identical to what Moses heard decades earlier, standing in front of
            a burning bush: <ArticleLink href="/blog/exodus-3-explained">take off your shoes, this ground
            is holy</ArticleLink>. The ground itself was ordinary dirt outside Jericho a moment before.
            What makes it holy is who is standing on it, not anything special about the place on a map.
          </p>
          <p>
            💡 The chapter ends mid conversation. Whatever the captain was about to tell Joshua picks up
            without a pause at the start of the next chapter, where the LORD speaks about Jericho directly.
            Chapter breaks are a later convenience added to help readers find their place. The oldest
            readers of this book would have heard verse 15 and the opening of the siege of Jericho as one
            continuous scene, not two separate stories.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 5 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why would God make Israel physically weaker right next to an enemy city?</strong> What
            the text says: Joshua 5:8 states plainly that the men stayed in camp, recovering, with no
            mention of any defensive plan against Jericho during that time. What is reasoned from the
            surrounding chapters: verse 1 already reported that every king in the region had lost the will
            to fight before Israel did anything at all. The timing of the circumcision looks less like a
            risk Israel took and more like proof of how total that fear already was. Nothing in the text
            suggests Joshua saw this as dangerous enough to delay.
          </p>
          <p>
            <strong>Is the captain of the LORD&apos;s host an angel, or is it Christ himself appearing
            before His birth?</strong> What the text says: Joshua 5:14 and 15 never names him beyond the
            title given, and Joshua responds by falling down and worshipping, then receiving the same
            command about holy ground that Moses received directly from God at the burning bush.
            Christians read this two ways. Some hold that this is a created angel, a military commander
            sent to lead Israel&apos;s army, and that the worship described is the kind of respectful
            bowing Scripture elsewhere gives to angels and other authorities, not worship reserved for God
            alone. Others point to the holy ground language mirroring Exodus 3 so closely, and to the
            figure accepting worship without correcting Joshua the way angels do elsewhere in Scripture, as
            evidence this is a preincarnate appearance of the Son of God, the same kind of appearance many
            see in Genesis 18 and Judges 6. The text itself does not settle it either way.
          </p>
          <p>
            <strong>Why did this generation grow up uncircumcised in the first place?</strong> What the
            text says: Joshua 5:6 ties it directly to the wilderness generation&apos;s disobedience, the
            same refusal to trust God for the land that Israel&apos;s parents showed when the spies first
            scouted Canaan a generation earlier. The covenant sign was never formally cancelled. It simply
            was not kept during forty years spent outside the promise that sign pointed toward.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 5:15</h3>
        <VerseQuote
          text="And the captain of the LORD's host said unto Joshua, Loose thy shoe from off thy foot; for the place whereon thou standest is holy. And Joshua did so."
          reference="Joshua 5:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Nearly the same words Moses heard at the burning bush, echoed decades later for a new leader
          facing a new mission. Ordinary ground, made holy only by who is standing on it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 5:9</h3>
        <VerseQuote
          text="And the LORD said unto Joshua, This day have I rolled away the reproach of Egypt from off you. Wherefore the name of the place is called Gilgal unto this day."
          reference="Joshua 5:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A place gets its permanent name from the one morning something finally ended. Gilgal becomes a
          landmark for a reproach that no longer applied.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 5:12</h3>
        <VerseQuote
          text="And the manna ceased on the morrow after they had eaten of the old corn of the land; neither had the children of Israel manna any more; but they did eat of the fruit of the land of Canaan that year."
          reference="Joshua 5:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Forty years of daily miracle ends in a single sentence, the exact day it is no longer needed.
          God&apos;s provision changes shape without ever actually stopping.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 5:6</h3>
        <VerseQuote
          text="For the children of Israel walked forty years in the wilderness, till all the people that were men of war, which came out of Egypt, were consumed, because they obeyed not the voice of the LORD: unto whom the LORD sware that he would not shew them the land, which the LORD sware unto their fathers that he would give us, a land that floweth with milk and honey."
          reference="Joshua 5:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The plainest statement in the chapter of why an entire generation never finished what it
          started. Unbelief cost them the very land their children now stand inside of.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 5:14</h3>
        <VerseQuote
          text="And he said, Nay; but as captain of the host of the LORD am I now come. And Joshua fell on his face to the earth, and did worship, and said unto him, What saith my lord unto his servant?"
          reference="Joshua 5:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Joshua asks a two sided question and gets an answer that refuses both sides. Whoever this is, he
          is not taking a position in Israel&apos;s war. He is standing over it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Joshua 5 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 5 records Israel pausing right before attacking Jericho to circumcise an entire generation
          born in the wilderness, keep its first Passover in Canaan, watch the manna stop, and meet the
          captain of the LORD&apos;s host, who tells Joshua the ground he stands on is holy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel need to be circumcised again in Joshua 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The generation born during the forty years in the wilderness had never been circumcised, even
          though it was the sign of God&apos;s covenant with Abraham. Joshua 5:6 says this happened because
          their parents disobeyed God, and the sign went unkept during the years spent outside the promise.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God have Israel circumcised so close to Jericho?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the timing directly, but Joshua 5:1 already reports that every king in
          the region had lost the will to fight before this happened. Circumcision also had to come before
          the Passover Israel kept two verses later, since the law required it, and the camp finally had
          the stillness needed to recover that the wilderness never allowed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the meaning of the name Gilgal?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many Bible teachers connect Gilgal to a Hebrew word meaning to roll, matching the LORD&apos;s own
          words in Joshua 5:9: this day I have rolled away the reproach of Egypt. The place is named
          directly after what happened there.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the manna stop in Joshua 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 5:12 says the manna ceased the day after Israel ate the old corn of the land, once the
          land itself could feed them. The miraculous provision ended exactly when it was no longer
          necessary, not before and not after.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was the captain of the LORD&apos;s host in Joshua 5?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 5:14 only gives him that title. He meets Joshua with a drawn sword, refuses to say he is
          on Israel&apos;s side specifically, and receives worship from Joshua, who then hears the same
          command about holy ground that Moses heard at the burning bush.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the captain of the LORD&apos;s host Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Christians disagree. Some read him as a created angel leading Israel&apos;s army. Others see the
          close match to Moses&apos; encounter at the burning bush, and the fact that he accepts
          Joshua&apos;s worship without correction, as signs this is a preincarnate appearance of Christ.
          The text itself does not state which view is correct.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Joshua fall down and worship the captain of the LORD&apos;s host?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 5:14 records the action without explaining Joshua&apos;s reasoning, but the response fits
          someone recognizing immediately that he is not speaking to an ordinary soldier. Whatever Joshua
          understood in that moment, his posture was instant, not something he worked up to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Joshua 5 end in the middle of a conversation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Chapter divisions were added centuries after the book was written, purely to help readers find
          their place. Joshua 6 opens with the LORD speaking directly about Jericho, continuing the same
          scene that Joshua 5:15 leaves hanging, not starting a new one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Joshua 5 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The circumcision ties directly back to God&apos;s covenant with Abraham in Genesis 17 and the law
          requiring it before Passover in Exodus 12. The holy ground scene echoes Moses at the burning bush
          in Exodus 3. Even the manna ending fulfills what was already promised about its length back in
          Exodus 16.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 5 never raises a weapon, and it still prepares Israel for war more than any other chapter so far.</p>
          <p>
            📌 <strong>Being ready for battle was never only about strength.</strong> Israel spent its most
            exposed days near Jericho recovering, not fortifying, because the real preparation was the
            covenant sign, not the muscle behind it.
          </p>
          <p>
            📌 <strong>God does not run the miraculous longer than necessary.</strong> The manna stopped
            the same day ordinary food became available. What looks like a loss of provision is really
            provision changing shape right on schedule.
          </p>
          <p>
            📌 <strong>Joshua met someone he could not categorize, and he worshipped before he understood
            fully.</strong> &quot;Art thou for us, or for our adversaries&quot; got an answer that refused
            the whole premise of the question.
          </p>
          <p>
            You will not circumcise anyone or watch manna stop. But you will face moments where readiness
            looks less like strength and more like obedience you cannot yet explain to anyone watching.
          </p>
          <p>So here is your one next step.</p>
          <p>Ask whether there is a covenant sign in your own life that quietly lapsed somewhere along the way, and what it would take to restore it before your next battle instead of during it.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
