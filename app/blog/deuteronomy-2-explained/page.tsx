import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-2-explained", {
  title: "Deuteronomy 2 Explained: Esau, Moab, Ammon, and Sihon's Defeat",
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

export default function DeuteronomyTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-2-explained"
      title={<>📖 Deuteronomy 2 Explained: Esau, Moab, Ammon, and Sihon&apos;s Defeat</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Three nations Israel could have fought. Three nations God told them to leave alone.</p>
            <p>Then one king who would not let them pass, and a battle God told them to finish completely.</p>
            <p>
              <strong>Deuteronomy 2 explained</strong> continues Moses&apos; sermon with the part of
              the story that gets skipped most often: the long walk around Edom, Moab, and Ammon,
              three relatives of Israel whose land God had already settled on someone else, and the
              giants who lived in that land before any of them did.
            </p>
            <p>Maybe you have wondered why the Bible spends a whole chapter on land Israel was never going to take.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why did God forbid Israel from fighting Esau&apos;s people, when they had just destroyed an entire Amorite army?</li>
            <li>❓ Who were the Emims and the Zamzummims, and were they really giants?</li>
            <li>❓ Why did it take thirty eight years just to cross one brook?</li>
            <li>❓ And why could Israel fight Sihon of Heshbon, when it could not fight anyone else?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 2 is Moses showing a new generation that God had already drawn
              every border on the map long before Israel ever left Egypt.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the command to turn north,
              the nations Israel had to leave alone, the giants who once ruled that land, the king
              who refused to let Israel pass in peace, and the one battle in this chapter Israel was
              actually told to fight.
            </p>
            <p>Thirty seven verses, and most of them are about restraint, not conquest.</p>
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
            <ArticleLink href="/blog/deuteronomy-1-explained">Deuteronomy 1</ArticleLink> ended on a
            defeat. Israel, stung by God&apos;s sentence against the unbelieving generation, charged
            up into the hill country against God&apos;s direct instruction not to, and the Amorites
            chased them all the way to Hormah. The people wept before the LORD, and He would not
            listen. So they stayed at Kadesh, going nowhere, for many days.
          </p>
          <p>
            Deuteronomy 2 picks up right there and finally starts moving again. Moses is still
            retelling, not inventing, a story this new generation needs in their own ears. But the
            tone shifts here. Instead of one more failure, this chapter is mostly God giving very
            specific, very careful instructions about exactly whose land Israel could touch, and
            whose it could not.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 2 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Turning North: Leaving Esau&apos;s Land Alone (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After the defeat at Hormah, God finally gives Israel a new direction.</p>
        </div>
        <VerseQuote
          text="Then we turned, and took our journey into the wilderness by the way of the Red sea, as the LORD spake unto me: and we compassed mount Seir many days. And the LORD spake unto me, saying, Ye have compassed this mountain long enough: turn you northward."
          reference="Deuteronomy 2:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mount Seir was the territory of <ArticleLink href="/blog/genesis-36-explained">
            Esau&apos;s descendants</ArticleLink>, the nation of Edom. Jacob and Esau had been
            rivals since the womb, but what God says next has nothing to do with old family history.
          </p>
        </div>
        <VerseQuote
          text="And command thou the people, saying, Ye are to pass through the coast of your brethren the children of Esau, which dwell in Seir; and they shall be afraid of you: take ye good heed unto yourselves therefore: Meddle not with them; for I will not give you of their land, no, not so much as a foot breadth; because I have given mount Seir unto Esau for a possession."
          reference="Deuteronomy 2:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Not so much as a foot breadth&quot; is as precise as a land grant gets.</strong>{" "}
            Israel was stronger than Edom right then, and Edom knew it, which is exactly why God had
            to say it this plainly. Strength was never the reason Israel got to take any land. God&apos;s
            word was.
          </p>
          <p>Instead of conquest, God gives Israel a different instruction entirely: pay for what you need.</p>
        </div>
        <VerseQuote
          text="Ye shall buy meat of them for money, that ye may eat; and ye shall also buy water of them for money, that ye may drink. For the LORD thy God hath blessed thee in all the works of thy hand: he knoweth thy walking through this great wilderness: these forty years the LORD thy God hath been with thee; thou hast lacked nothing."
          reference="Deuteronomy 2:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Forty years of manna, water from a rock, clothes that did not wear out, and here, in
            the middle of a chapter about buying groceries, Moses stops to name it: <strong>thou
            hast lacked nothing.</strong> Provision this chapter is not dramatic. It looks like a
            fair transaction at a market, and that is still provision.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Crossing the Zered: The Last of the Old Generation (verses 9 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moab gets the same off limits order Edom just got, with the same reasoning attached.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto me, Distress not the Moabites, neither contend with them in battle: for I will not give thee of their land for a possession; because I have given Ar unto the children of Lot for a possession."
          reference="Deuteronomy 2:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;The children of Lot&quot; means Moab traces back to{" "}
            <ArticleLink href="/blog/genesis-19-explained">Lot, Abraham&apos;s nephew</ArticleLink>,
            through his older daughter after Sodom was destroyed. Moab was not a stranger nation to
            Israel. It was family, several generations removed, and God had already given that
            family its own land, long before Israel needed to cross it.
          </p>
          <p>
            A short parenthetical note follows, naming the people who lived in that region before
            Moab did.
          </p>
        </div>
        <VerseQuote
          text="The Emims dwelt therein in times past, a people great, and many, and tall, as the Anakims; Which also were accounted giants, as the Anakims; but the Moabites call them Emims."
          reference="Deuteronomy 2:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then Moses states the number that explains the whole delay since Kadeshbarnea, as plainly
            as he stated the eleven day route in the previous chapter.
          </p>
        </div>
        <VerseQuote
          text="And the space in which we came from Kadeshbarnea, until we were come over the brook Zered, was thirty and eight years; until all the generation of the men of war were wasted out from among the host, as the LORD sware unto them."
          reference="Deuteronomy 2:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Thirty eight years is not a round number. It is the exact gap between the oath
            at Kadeshbarnea and the moment the last man under that oath finally died.</strong> God did
            not shorten the sentence out of impatience, and He did not stretch it out of cruelty. He
            let it run its full length, one funeral at a time, until it was finished.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Ammon, and the Giants Who Were Not a Myth (verses 17 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the old generation is gone, God speaks to Moses again with the third off limits order.</p>
        </div>
        <VerseQuote
          text="And when thou comest nigh over against the children of Ammon, distress them not, nor meddle with them: for I will not give thee of the land of the children of Ammon any possession; because I have given it unto the children of Lot for a possession."
          reference="Deuteronomy 2:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ammon traces back to the same night as Moab, Lot&apos;s younger daughter this time. Two
            nations, one family, both protected from Israel by the same word God had already given.
          </p>
          <p>Then comes a second parenthetical note about giants, longer than the first.</p>
        </div>
        <VerseQuote
          text="(That also was accounted a land of giants: giants dwelt therein in old time; and the Ammonites call them Zamzummims; A people great, and many, and tall, as the Anakims; but the LORD destroyed them before them; and they succeeded them, and dwelt in their stead:"
          reference="Deuteronomy 2:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who gets credit for clearing out the giants: the LORD, not Ammon&apos;s
            own army.</strong> The Anakims are the same giants that terrified ten of the twelve spies
            in Numbers 13. This chapter treats them as plain history, not legend, and quietly reports
            that God had already taken down entire kingdoms of them east of the Jordan, for nations
            that were not even Israel.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The One King God Said to Fight: Sihon of Heshbon (verses 24 to 32)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After three straight commands to leave people alone, the instruction finally flips.</p>
        </div>
        <VerseQuote
          text="Rise ye up, take your journey, and pass over the river Arnon: behold, I have given into thine hand Sihon the Amorite, king of Heshbon, and his land: begin to possess it, and contend with him in battle. This day will I begin to put the dread of thee and the fear of thee upon the nations that are under the whole heaven, who shall hear report of thee, and shall tremble, and be in anguish because of thee."
          reference="Deuteronomy 2:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses sends the same kind of peaceful request he had already made of Edom and Moab,
            asking only to pass through on the highway, paying for food and water along the way.
          </p>
        </div>
        <VerseQuote
          text="But Sihon king of Heshbon would not let us pass by him: for the LORD thy God hardened his spirit, and made his heart obstinate, that he might deliver him into thy hand, as appeareth this day."
          reference="Deuteronomy 2:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Sihon is the only nation in this chapter that refuses even peaceful passage. Edom and
            Moab let Israel buy food and move on. Sihon would not even allow that, and the text says
            plainly that his own stubbornness became the occasion God used to hand his kingdom over.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Total Victory, and the Line Israel Would Not Cross (verses 33 to 37)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sihon marches out to fight at Jahaz, and the battle does not last long.</p>
        </div>
        <VerseQuote
          text="And we took all his cities at that time, and utterly destroyed the men, and the women, and the little ones, of every city, we left none to remain: Only the cattle we took for a prey unto ourselves, and the spoil of the cities which we took."
          reference="Deuteronomy 2:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the first time in Moses&apos; retelling that Israel is told to destroy a kingdom
            completely rather than pass through it. The contrast with everything before it in this
            same chapter is deliberate, not accidental.
          </p>
        </div>
        <VerseQuote
          text="From Aroer, which is by the brink of the river of Arnon, and from the city that is by the river, even unto Gilead, there was not one city too strong for us: the LORD our God delivered all unto us: Only unto the land of the children of Ammon thou camest not, nor unto any place of the river Jabbok, nor unto the cities in the mountains, nor unto whatsoever the LORD our God forbad us."
          reference="Deuteronomy 2:36 and 37"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Even at the height of total victory, the chapter still ends on a boundary
            Israel did not cross.</strong> Ammon&apos;s border held, exactly as God had said twenty
            verses earlier. Winning big did not change what had already been forbidden.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 2 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why could Israel fight Sihon but not Edom, Moab, or Ammon, when it had the
            strength for all four?</strong> The text never grounds the difference in military odds.
            It grounds it in ownership. Edom belonged to Esau&apos;s line, Moab and Ammon to Lot&apos;s,
            by God&apos;s own prior decision. Sihon&apos;s Amorite kingdom carried no such grant.
            Obedience here meant Israel had to tell the difference between land it was strong enough
            to take and land it was actually given permission to take, and treat those as two
            separate questions.
          </p>
          <p>
            <strong>Does Numbers 20&apos;s account of Edom refusing Israel contradict this chapter?</strong>{" "}
            <ArticleLink href="/blog/numbers-20-explained">Numbers 20</ArticleLink> records Edom&apos;s
            king flatly refusing Moses&apos; request to travel the king&apos;s own highway through the
            heart of his territory, meeting Israel with armed men. Deuteronomy 2 describes Israel
            compassing Mount Seir and buying food along its border instead, the same route implied in
            verse 29&apos;s later mention that Edom and Moab &quot;did&quot; let Israel pass that way.
            The simplest reading holds both together: the king refused the direct road through his
            cities, so Israel went around the border instead, trading with the people it met rather
            than forcing the issue.
          </p>
          <p>
            <strong>Did God really harden Sihon&apos;s heart to make sure he refused, the way He
            hardened Pharaoh?</strong> The text says exactly that, and it is worth taking seriously
            rather than softening. What Scripture does not say is that Sihon wanted to let Israel pass
            and God overrode a willing heart. Sihon&apos;s own instinct, like Pharaoh&apos;s, was
            already resistant. God&apos;s hardening confirmed the direction Sihon was already set on,
            turning his stubbornness into the occasion for his own downfall.
          </p>
          <p>
            <strong>How should Christians read the total destruction of Heshbon, including women and
            children?</strong> The text states it without excuse or elaboration: it happened, and
            Moses reports it as something the LORD delivered into Israel&apos;s hand. What the text
            does not do is universalize it into a standing rule for how God&apos;s people treat every
            future enemy. This command belonged to a specific conquest, under specific instructions,
            at a specific point in Israel&apos;s history, and nothing afterward in Scripture repeats it
            as an ongoing pattern for how Christians are to treat anyone today. Reading it honestly
            means neither pretending it did not happen nor treating it as a model to imitate outside
            that moment.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 2:5</h3>
        <VerseQuote
          text="Meddle not with them; for I will not give you of their land, no, not so much as a foot breadth; because I have given mount Seir unto Esau for a possession."
          reference="Deuteronomy 2:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A boundary stated so precisely it leaves no room for Israel to reinterpret it later. God&apos;s
          land grants were specific, not suggestions open to a stronger army&apos;s judgment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 2:7</h3>
        <VerseQuote
          text="For the LORD thy God hath blessed thee in all the works of thy hand: he knoweth thy walking through this great wilderness: these forty years the LORD thy God hath been with thee; thou hast lacked nothing."
          reference="Deuteronomy 2:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Forty years summarized in one quiet sentence, in the middle of a passage about shopping for
          food. Provision rarely looks dramatic from the inside of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 2:14</h3>
        <VerseQuote
          text="And the space in which we came from Kadeshbarnea, until we were come over the brook Zered, was thirty and eight years; until all the generation of the men of war were wasted out from among the host, as the LORD sware unto them."
          reference="Deuteronomy 2:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact length of a sentence God let run its full course, a generation at a time, until it
          was finished and nothing remained but the promise on the other side of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 2:30</h3>
        <VerseQuote
          text="But Sihon king of Heshbon would not let us pass by him: for the LORD thy God hardened his spirit, and made his heart obstinate, that he might deliver him into thy hand, as appeareth this day."
          reference="Deuteronomy 2:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The only nation in the chapter that refused Israel even peaceful passage, and the only one
          whose land Israel was told to take completely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 2:37</h3>
        <VerseQuote
          text="Only unto the land of the children of Ammon thou camest not, nor unto any place of the river Jabbok, nor unto the cities in the mountains, nor unto whatsoever the LORD our God forbad us."
          reference="Deuteronomy 2:37"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Written right after the biggest victory in the chapter, as proof that winning never gave
          Israel permission to go past what God had actually said.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 2
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 2 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 2 continues Moses&apos; retelling of Israel&apos;s journey, covering the
          thirty eight years spent compassing Edom, the command to leave Edom, Moab, and Ammon
          alone, the giants who once lived in that region, and Israel&apos;s total defeat of Sihon,
          king of the Amorites.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel have to leave Edom, Moab, and Ammon alone?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God had already given those lands to the descendants of Esau and of Lot. Edom came from
          Esau, and both Moab and Ammon came from Lot, Abraham&apos;s nephew, through his two
          daughters after the destruction of Sodom. Israel&apos;s strength never changed who those
          territories belonged to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Sihon, and why did Israel fight him when it could not fight anyone else?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Sihon was the Amorite king of Heshbon. Unlike Edom and Moab, he refused even Israel&apos;s
          peaceful request to pass through on the highway, and God had given Israel no prior
          promise protecting his land the way He had for Esau&apos;s and Lot&apos;s descendants.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the Emims and the Zamzummims?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Both were peoples described as great, many, and tall, like the Anakims, who lived east of
          the Jordan before Moab and Ammon settled there. The Moabites called one group Emims and
          the Ammonites called the other Zamzummims, different names for similar giant peoples God
          had already removed before Israel arrived.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did it take thirty eight years to cross from Kadeshbarnea to the Zered?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 2:14 says the delay lasted until the entire generation of men who had been of
          fighting age at Kadeshbarnea had died off, exactly as God had sworn after Israel&apos;s
          rebellion there.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God really harden Sihon&apos;s heart to make him refuse Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 2:30 says so directly. The text presents it as God confirming a stubbornness
          already present in Sihon, the same pattern used with Pharaoh in Exodus, not as God forcing
          a willing king into sudden resistance.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the people of Heshbon destroyed completely, including women and children?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text states it plainly as part of a specific conquest Israel was commanded to carry
          out against that kingdom. Scripture does not repeat this as an ongoing rule for how
          Israel, or anyone after, was meant to treat future enemies in general.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Deuteronomy 2 connect to the story of Lot in Genesis 19?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 19 records Lot&apos;s two daughters each bearing a son after Sodom&apos;s
          destruction, Moab and Benammi, the fathers of the Moabites and the Ammonites. Deuteronomy
          2 calls both nations &quot;the children of Lot&quot; and protects their land for that
          exact reason.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 2 contradict Numbers 20&apos;s account of Edom refusing Israel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          They describe two different requests. Numbers 20 records Edom&apos;s king refusing the
          direct route through his own territory on the king&apos;s highway. Deuteronomy 2 describes
          Israel going around the border instead, buying food and water from the people there
          without forcing passage through the king&apos;s cities.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;not so much as a foot breadth&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means not even the smallest measurable amount of land. God used that phrase to make
          clear Israel had no claim whatsoever to Edom&apos;s territory, no matter how strong
          Israel&apos;s army had become.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 2 is a quiet chapter, and that is exactly what makes it worth slowing down for.</p>
          <p>
            📌 <strong>God&apos;s sovereignty was never limited to Israel&apos;s borders.</strong> He
            had already settled Edom, Moab, and Ammon on land of their own, and named the giants He
            had already removed for nations that were not even His covenant people.
          </p>
          <p>
            📌 <strong>Obedience sometimes means leaving land on the table you are strong enough to
            take.</strong> Three times in one chapter, Israel had the power to seize territory and
            was told, specifically, not to.
          </p>
          <p>
            📌 <strong>A sentence can run its full length without God rushing it or shortening it.</strong>{" "}
            Thirty eight years ended exactly when the last man under that oath did, no sooner and no
            later.
          </p>
          <p>
            You probably are not weighing whether to invade a neighboring country this week. But you
            may be sitting on ground you have the strength to take anyway, even though it was never
            given to you.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask whether the thing you are reaching for right now is something God has actually given
            you, or just something you are strong enough to grab.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
