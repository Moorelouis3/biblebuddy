import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-31-explained", {
  title: "Numbers 31 Explained: The War Against Midian and Balaam's Death",
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

export default function NumbersThirtyOneExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-31-explained"
      title={<>📖 Numbers 31 Explained: The War Against Midian and Balaam&apos;s Death</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Twenty four thousand people already died from a plague.</p>
            <p>Now God tells Moses to go finish what started it.</p>
            <p>
              <strong>Numbers 31 explained</strong> is the chapter where Israel goes to war
              against Midian, the nation whose own women drew Israel into sin at Baal Peor.
              Five kings die in the battle. A famous prophet named Balaam dies with them. And
              Moses, instead of celebrating the victory his officers bring home, gets angry at
              the one decision they made on their own.
            </p>
            <p>Maybe you have read a chapter like this before and tried to read around the hard parts instead of through them.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God call this war an act of vengeance, not conquest?</li>
            <li>❓ Why was Balaam killed, when he never actually cursed Israel?</li>
            <li>❓ Why does Moses order something harsher than the normal rules of war Israel already had?</li>
            <li>❓ What does a week of purification outside the camp have to do with any of this?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Numbers 31 is not a pattern for how Israel waged every war. It is the
              one time God settles a specific account, for a specific sin, against the specific
              nation that caused it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the command to avenge,
              the battle and the five kings who fell alongside Balaam, Moses&apos; anger at the
              camp gate, seven days of purification outside it, how the spoil was counted and
              divided, and the gold the officers brought back once they realized not one of them
              had been lost.
            </p>
            <p>Fifty four verses, and very few of them are comfortable.</p>
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
            <ArticleLink href="/blog/numbers-30-explained">Numbers 30</ArticleLink> closed out the
            three chapter legal pause, offerings, feasts, and vows, that filled the gap after
            Moses learned in Numbers 27 that he would die before entering Canaan. Numbers 31
            breaks that pause and finally returns to something the story never finished.
          </p>
          <p>
            Six chapters earlier, in <ArticleLink href="/blog/numbers-25-explained">Numbers 25</ArticleLink>,
            Israel camped at Shittim and the men of Israel began sleeping with the women of Moab
            and worshiping Baal Peor alongside them. A Midianite woman named Cozbi was at the
            center of it, and when Phinehas killed her and the Israelite man she was with, the
            plague that had already killed twenty four thousand people finally stopped. Right
            there, God gave Moses a standing order that Numbers 31 has simply been waiting to
            carry out.
          </p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Vex the Midianites, and smite them: For they vex you with their wiles, wherewith they have beguiled you in the matter of Peor, and in the matter of Cozbi, the daughter of a prince of Midian, their sister, which was slain in the day of the plague for Peor's sake."
          reference="Numbers 25:16 to 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>That order sat unfulfilled through three chapters of law. Numbers 31 is Moses finally acting on it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 31 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Order to Avenge, and Who Went to Fight (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with God repeating the order from Numbers 25, now as a direct command to act.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Avenge the children of Israel of the Midianites: afterward shalt thou be gathered unto thy people."
          reference="Numbers 31:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Afterward shalt thou be gathered unto thy people&quot; is Scripture&apos;s
            gentle phrase for Moses&apos; own death. God names this war as the last task before
            that happens, tying it directly to what Moses already learned back in{" "}
            <ArticleLink href="/blog/numbers-27-explained">Numbers 27</ArticleLink>.
          </p>
          <p>Moses passes the command on, and his own wording makes the stakes personal to God, not just to Israel.</p>
        </div>
        <VerseQuote
          text="And Moses spake unto the people, saying, Arm some of yourselves unto the war, and let them go against the Midianites, and avenge the LORD of Midian."
          reference="Numbers 31:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This was never framed as Israel settling its own grievance. It is called
            avenging the LORD, because the sin at Peor was ultimately an offense against
            Him.</strong>
          </p>
          <p>
            The army that goes is small on purpose, a thousand men from each of the twelve
            tribes, twelve thousand total, not the whole nation. And one name stands out among
            who leads them.
          </p>
        </div>
        <VerseQuote
          text="And Moses sent them to the war, a thousand of every tribe, them and Phinehas the son of Eleazar the priest, to the war, with the holy instruments, and the trumpets to blow in his hand."
          reference="Numbers 31:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Phinehas is the same priest whose javelin stopped the plague in Numbers 25. The
            man whose zeal ended that crisis personally leads the mission that finishes settling
            the account it left behind.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Five Kings and a Prophet Named Balaam Fall Together (verses 7 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The battle itself takes four verses. The result is total.</p>
        </div>
        <VerseQuote
          text="And they warred against the Midianites, as the LORD commanded Moses; and they slew all the males. And they slew the kings of Midian, beside the rest of them that were slain; namely, Evi, and Rekem, and Zur, and Hur, and Reba, five kings of Midian: Balaam also the son of Beor they slew with the sword."
          reference="Numbers 31:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One of those five names has already appeared in this story. Numbers 25 named him too,
            the moment Cozbi died.
          </p>
        </div>
        <VerseQuote
          text="Now the name of the Israelite that was slain, even that was slain with the Midianitish woman, was Zimri, the son of Salu, a prince of a chief house among the Simeonites. And the name of the Midianitish woman that was slain was Cozbi, the daughter of Zur; he was head over a people, and of a chief house in Midian."
          reference="Numbers 25:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Zur, the king killed in Numbers 31:8, is Cozbi&apos;s own father.</strong>{" "}
            The war that follows the Peor incident ends by killing the man whose daughter started
            it.
          </p>
          <p>
            And then there is Balaam. He had already refused, three times over in{" "}
            <ArticleLink href="/blog/numbers-22-explained">Numbers 22</ArticleLink> and{" "}
            <ArticleLink href="/blog/numbers-24-explained">Numbers 24</ArticleLink>, to put an
            actual curse on Israel into words. He dies here anyway. That gap, between what he
            said out loud and what he actually did, gets answered later in this chapter, and
            again in the New Testament.
          </p>
          <p>The rest of the battle follows the same pattern as any ancient war, just at scale.</p>
        </div>
        <VerseQuote
          text="And the children of Israel took all the women of Midian captives, and their little ones, and took the spoil of all their cattle, and all their flocks, and all their goods. And they burnt all their cities wherein they dwelt, and all their goodly castles, with fire."
          reference="Numbers 31:9 and 10"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Moses&apos; Anger at the Camp Gate (verses 13 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The army returns with captives, cattle, and spoil, expecting to have finished the
            assignment. Moses meets them at the edge of the camp, and he is not pleased.
          </p>
        </div>
        <VerseQuote
          text="And Moses was wroth with the officers of the host, with the captains over thousands, and captains over hundreds, which came from the battle. And Moses said unto them, Have ye saved all the women alive?"
          reference="Numbers 31:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            His reason is not generic. He names exactly who these women were and exactly what
            they had already done.
          </p>
        </div>
        <VerseQuote
          text="Behold, these caused the children of Israel, through the counsel of Balaam, to commit trespass against the LORD in the matter of Peor, and there was a plague among the congregation of the LORD."
          reference="Numbers 31:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the verse that finally explains Balaam&apos;s death. He never spoke a
            curse over Israel. Verse 16 says he gave counsel, advice behind the scenes that led
            directly to the seduction at Peor and the plague that followed it.
          </p>
          <p>Moses then gives the order the officers had not carried out on their own.</p>
        </div>
        <VerseQuote
          text="Now therefore kill every male among the little ones, and kill every woman that hath known man by lying with him. But all the women children, that have not known a man by lying with him, keep alive for yourselves."
          reference="Numbers 31:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the hardest verse in the chapter, and the text does not soften
            it.</strong> Moses ties the order directly to verse 16, to the specific women who had
            already drawn Israel into Baal worship once. More on how to read this sits in the
            hard questions below. Skipping past it here would not make it easier to face.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Seven Days Outside the Camp (verses 19 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before anyone who fought or touched the dead could rejoin the rest of Israel, the law
            required a full week of purification.
          </p>
        </div>
        <VerseQuote
          text="And do ye abide without the camp seven days: whosoever hath killed any person, and whosoever hath touched any slain, purify both yourselves and your captives on the third day, and on the seventh day."
          reference="Numbers 31:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is not a new rule invented for this war. <ArticleLink href="/blog/numbers-19-explained">Numbers 19</ArticleLink>{" "}
            had already set the terms for anyone who touched a corpse.
          </p>
        </div>
        <VerseQuote
          text="And a man that is clean shall gather up the ashes of the heifer, and lay them up without the camp in a clean place, and it shall be kept for the congregation of the children of Israel for a water of separation: it is a purification for sin."
          reference="Numbers 19:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 31 applies that same law at the scale of an entire returning army.</p>
        </div>
        <VerseQuote
          text="Only the gold, and the silver, the brass, the iron, the tin, and the lead, Every thing that may abide the fire, ye shall make it go through the fire, and it shall be clean: nevertheless it shall be purified with the water of separation: and all that abideth not the fire ye shall make go through the water."
          reference="Numbers 31:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Metal that could survive fire went through fire first and water second.
            Cloth, skins, and wood that could not went through water alone.</strong> Even the
            spoils of this specific war had to pass through the same ordinary purification law
            every death in the camp already required.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Dividing What War Left Behind (verses 25 to 47)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God then tells Moses to count everything and split it evenly between two groups.</p>
        </div>
        <VerseQuote
          text="Take the sum of the prey that was taken, both of man and of beast, thou, and Eleazar the priest, and the chief fathers of the congregation: And divide the prey into two parts; between them that took the war upon them, who went out to battle, and between all the congregation:"
          reference="Numbers 31:26 and 27"
        />
        <VerseQuote
          text="And levy a tribute unto the Lord of the men of war which went out to battle: one soul of five hundred, both of the persons, and of the beeves, and of the asses, and of the sheep:"
          reference="Numbers 31:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Half went to the twelve thousand who fought. Half went to the rest of
            Israel who stayed home.</strong> Out of the soldiers&apos; half, one in every five
            hundred went to Eleazar the priest. Out of the congregation&apos;s half, one in every
            fifty went to the Levites. Nobody who stayed behind was cut out of what the war
            produced, and nobody who fought kept the whole reward to themselves.
          </p>
          <p>The totals the chapter records are enormous.</p>
        </div>
        <VerseQuote
          text="And the booty, being the rest of the prey which the men of war had caught, was six hundred thousand and seventy thousand and five thousand sheep, And threescore and twelve thousand beeves, And threescore and one thousand asses, And thirty and two thousand persons in all, of women that had not known man by lying with him."
          reference="Numbers 31:32 to 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Six hundred seventy five thousand sheep. Seventy two thousand cattle. Sixty one
            thousand donkeys. And thirty two thousand people, all counted under the one category
            the previous section already defined. Every number in the rest of the chapter, down
            to the six hundred seventy five sheep and the seventy two cattle handed to Eleazar as
            the priest&apos;s tribute, is simply this total divided down in the exact proportions
            verses 28 through 30 already set.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Not One Man Lost, and the Gold That Followed (verses 48 to 54)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter&apos;s last scene is the officers coming to Moses with something nobody had asked them for.</p>
        </div>
        <VerseQuote
          text="And they said unto Moses, Thy servants have taken the sum of the men of war which are under our charge, and there lacketh not one man of us. We have therefore brought an oblation for the LORD, what every man hath gotten, of jewels of gold, chains, and bracelets, rings, earrings, and tablets, to make an atonement for our souls before the LORD."
          reference="Numbers 31:49 and 50"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Twelve thousand men went to war against five kings and an entire nation, and every
            single one came home. The officers read that as something that needed answering, not
            just celebrating, so they brought gold as an atonement offering, the same word used
            for Phinehas&apos; own act back in Numbers 25.
          </p>
        </div>
        <VerseQuote
          text="And all the gold of the offering that they offered up to the LORD, of the captains of thousands, and of the captains of hundreds, was sixteen thousand seven hundred and fifty shekels."
          reference="Numbers 31:52"
        />
        <VerseQuote
          text="And Moses and Eleazar the priest took the gold of the captains of thousands and of hundreds, and brought it into the tabernacle of the congregation, for a memorial for the children of Israel before the LORD."
          reference="Numbers 31:54"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter that opened with a plague and a war ends with gold stored
            inside the tabernacle itself, as a permanent reminder.</strong> The last word in
            Numbers 31 is not the battle. It is worship.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 31 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did God command something this severe against one specific nation?</strong>{" "}
            The text itself gives a reason, not a general rule. Numbers 25:17 and 18 and Numbers
            31:16 both tie this war to one event, Midianite women drawing Israel into Baal
            worship at Peor, which Scripture treats as an attack on Israel&apos;s covenant with
            God serious enough to cost twenty four thousand lives in the plague that followed.
            This chapter presents itself as settling that one account, not as a pattern for how
            Israel was told to treat every neighboring nation.
          </p>
          <p>
            <strong>Why order the deaths of the boys and the women who were not virgins, when
            Israel&apos;s normal rules of war were less severe than this?</strong> Deuteronomy 20
            lays out what war usually looked like for a nation outside Canaan.
          </p>
        </div>
        <VerseQuote
          text="And when the LORD thy God hath delivered it into thine hands, thou shalt smite every male thereof with the edge of the sword: But the women, and the little ones, and the cattle, and all that is in the city, even all the spoil thereof, shalt thou take unto thyself; and thou shalt eat the spoil of thine enemies, which the LORD thy God hath given thee."
          reference="Deuteronomy 20:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Under that standard rule, only the men would have died. Numbers 31 goes further, and
            Numbers 31:16 to 18 states the reason in the same breath as the order: these were the
            specific people, by the text&apos;s own account, through whom the Peor seduction had
            already happened once. The chapter frames this as removing the exact threat that had
            already cost Israel so much, not as the standard Israel was told to apply everywhere.
            That reasoning explains what the text says. It does not make the verse comfortable to
            read, and this article will not pretend it does.
          </p>
          <p>
            <strong>Why was Balaam killed, when his own words in Numbers 22 through 24 never
            actually cursed Israel?</strong> Numbers 31:16 answers that directly: he caused the
            trespass &quot;through counsel,&quot; advice given behind the scenes rather than a
            curse spoken in public. The New Testament treats Balaam the same way, judging him by
            what he counseled and wanted, not only by the blessing that came out of his mouth.
          </p>
        </div>
        <VerseQuote
          text="Which have forsaken the right way, and are gone astray, following the way of Balaam the son of Bosor, who loved the wages of unrighteousness;"
          reference="2 Peter 2:15"
        />
        <VerseQuote
          text="Woe unto them! for they have gone in the way of Cain, and ran greedily after the error of Balaam for reward, and perished in the gainsaying of Core."
          reference="Jude 1:11"
        />
        <VerseQuote
          text="But I have a few things against thee, because thou hast there them that hold the doctrine of Balaam, who taught Balac to cast a stumblingblock before the children of Israel, to eat things sacrificed unto idols, and to commit fornication."
          reference="Revelation 2:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three different New Testament writers all remember Balaam the same way,
            as a man who loved payment more than obedience and taught others how to trap Israel
            even after God stopped him from cursing them outright.</strong> Numbers 31:8 is the
            moment that teaching finally catches up with him.
          </p>
          <p>
            <strong>How should a Christian read a chapter like this today?</strong> Honestly,
            without pretending it settles easily. Some readers hold that this was a specific
            judgment, carried out once, under a direct command, against the exact group the text
            says caused a specific national sin, and that it was never meant as a template for
            how God&apos;s people treat every enemy afterward. Others are simply honest that the
            suffering described here is real and the chapter does not explain it away for a later
            reader&apos;s comfort. Numbers 31 does not offer more explanation than what it gives,
            and reaching for more certainty than the text supports would be adding to it rather
            than reading it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 31
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 31:2</h3>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Avenge the children of Israel of the Midianites: afterward shalt thou be gathered unto thy people."
          reference="Numbers 31:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The command that sets the whole chapter in motion, tied directly to the standing order
          God gave back in Numbers 25 and to Moses&apos; own approaching death.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 31:8</h3>
        <VerseQuote
          text="And they slew the kings of Midian, beside the rest of them that were slain; namely, Evi, and Rekem, and Zur, and Hur, and Reba, five kings of Midian: Balaam also the son of Beor they slew with the sword."
          reference="Numbers 31:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Zur is the father of Cozbi from Numbers 25, and Balaam dies here for the counsel he
          gave, not for a curse he actually spoke.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 31:16</h3>
        <VerseQuote
          text="Behold, these caused the children of Israel, through the counsel of Balaam, to commit trespass against the LORD in the matter of Peor, and there was a plague among the congregation of the LORD."
          reference="Numbers 31:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one verse that explains both Moses&apos; anger and Balaam&apos;s death, naming
          exactly what happened and who advised it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 31:50</h3>
        <VerseQuote
          text="We have therefore brought an oblation for the LORD, what every man hath gotten, of jewels of gold, chains, and bracelets, rings, earrings, and tablets, to make an atonement for our souls before the LORD."
          reference="Numbers 31:50"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A gift nobody required, offered by soldiers who came home without losing a single man
          and felt that fact needed answering before God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 31:54</h3>
        <VerseQuote
          text="And Moses and Eleazar the priest took the gold of the captains of thousands and of hundreds, and brought it into the tabernacle of the congregation, for a memorial for the children of Israel before the LORD."
          reference="Numbers 31:54"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter closes inside the tabernacle, not on the battlefield, with worship as the
          last word rather than the war itself.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 31
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 31 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 31 records Israel&apos;s war against Midian, commanded by God as payment for
          Midian&apos;s role in drawing Israel into sin at Baal Peor in Numbers 25. Five Midianite
          kings die, along with the prophet Balaam, and the chapter ends with how the spoil was
          purified and divided.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel go to war against Midian?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 25:16 to 18 records God&apos;s command to avenge what happened at Peor, where
          Midianite women had drawn Israelite men into worshiping Baal, leading to a plague that
          killed twenty four thousand people. Numbers 31 carries that command out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Phinehas in Numbers 31?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Phinehas was the priest, son of Eleazar and grandson of Aaron, whose earlier zeal in
          Numbers 25 stopped the plague at Peor. Numbers 31:6 has him carrying the holy
          instruments and trumpets into this same war.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Balaam killed, if he never cursed Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 31:16 says the Midianite women caused Israel&apos;s trespass &quot;through the
          counsel of Balaam,&quot; meaning he advised the scheme even though he never spoke a
          curse. The New Testament, in 2 Peter 2:15, Jude 1:11, and Revelation 2:14, consistently
          remembers him as a man who sold his counsel for profit.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses order the death of the Midianite captives?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 31:15 and 16 tie the order directly to the Peor incident, identifying these as
          the specific women through whom that sin had already happened once. It goes beyond
          Israel&apos;s usual rules of war in Deuteronomy 20, and the text gives this one reason
          for it rather than treating it as a general policy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the water of separation in Numbers 31?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the purification water described in Numbers 19:9, made from the ashes of a red
          heifer, used to cleanse anyone who had touched a dead body. Numbers 31:23 applies that
          same law to the army and the metal they brought back from the war.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How much spoil did Israel take from Midian?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 31:32 to 35 counts six hundred seventy five thousand sheep, seventy two thousand
          cattle, sixty one thousand donkeys, and thirty two thousand people, split evenly between
          the soldiers who fought and the rest of Israel who stayed behind.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the army officers bring a gold offering after the battle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 31:49 and 50 record the officers noticing that not one of their twelve thousand
          men had been lost in the fighting, and bringing gold jewelry as a freewill atonement
          offering in response, which Numbers 31:54 says was placed in the tabernacle as a
          memorial.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is this the same Midian that later oppresses Israel in Judges?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Judges 6:1 shows Midian oppressing Israel again generations later, so this war did not
          end Midian as a people. Numbers 31 settled one generation&apos;s account for one
          specific sin, not Midian&apos;s existence as a nation.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 31 is not a chapter to flatten into a simple lesson. It asks to be read honestly instead.</p>
          <p>
            📌 <strong>God settles accounts, and this one had been open since Numbers 25.</strong>{" "}
            The plague, the standing order, and this war are one continuous story, not three
            separate events.
          </p>
          <p>
            📌 <strong>Counsel given in secret carries real weight before God.</strong> Balaam
            never cursed Israel out loud, and Numbers 31:16 still holds him responsible for what
            he advised behind the scenes.
          </p>
          <p>
            📌 <strong>Not losing anyone was treated as something to answer for, not just
            something to celebrate.</strong> The officers&apos; gold offering in verse 50 came
            from men who felt that coming home whole was a gift, not an achievement.
          </p>
          <p>
            You are not going to war against Midian this week. But you likely have your own
            version of counsel given quietly, advice or influence you have offered someone that
            you would not want tied back to you the way Balaam&apos;s was.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think honestly about the last piece of advice you gave someone in private, and ask
            whether it was counsel you would want remembered the way Numbers 31:16 remembers
            Balaam&apos;s.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
