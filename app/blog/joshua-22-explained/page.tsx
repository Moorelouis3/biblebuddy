import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-22-explained", {
  title: "Joshua 22 Explained: The Altar That Almost Started a Civil War",
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

export default function JoshuaTwentyTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-22-explained"
      title={<>📖 Joshua 22 Explained: The Altar That Almost Started a Civil War</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two and a half tribes go home with Joshua&apos;s blessing. Within a few verses, the rest of Israel is arming for war against them.</p>
            <p>
              <strong>Joshua 22 explained</strong> is the chapter where the conquest of Canaan ends and a different
              kind of danger starts, the danger of two groups of God&apos;s own people misreading each other across
              a river. Reuben, Gad, and the half tribe of Manasseh head home to the land Moses already gave them
              east of the Jordan. On the way, they build an altar. West of the river, the rest of Israel hears
              about it and assumes the worst.
            </p>
            <p>Maybe you know what it feels like to have your motives read as betrayal by people who never actually asked you first.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why was Israel ready to go to war over a single altar?</li>
            <li>❓ Why did the eastern tribes build it in the first place?</li>
            <li>❓ Why does the accusation bring up two old disasters that had nothing to do with an altar?</li>
            <li>❓ Why does the Jordan River itself become the real fear underneath the whole argument?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Both sides were trying to protect the same thing, faithfulness to the LORD, and it almost
              turned them against each other anyway.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: Joshua&apos;s blessing and charge to the
              tribes heading home, the altar built by the Jordan, Israel gathering at Shiloh for war, Phinehas and
              ten princes carrying the accusation east, the defense that stops a war before it starts, and the name
              given to the altar once everyone understood what it actually was.
            </p>
            <p>Thirty four verses, one almost war, and a lesson in asking before accusing that still applies now.</p>
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
            <ArticleLink href="/blog/joshua-21-explained">Joshua 21</ArticleLink> closed out the entire land
            division with a single sentence: every good thing the LORD had promised about the land had come to
            pass. Eleven tribes now held ground west of the Jordan. The twelfth, Levi, held forty eight scattered
            cities instead of a territory.
          </p>
          <p>
            Reuben, Gad, and the half tribe of Manasseh are not part of either group, because their story had
            already finished years earlier, back in <ArticleLink href="/blog/numbers-32-explained">Numbers 32</ArticleLink>.
            They had asked Moses for the good grazing land east of the Jordan, and Moses agreed on one condition.
            Their fighting men had to cross the river first and help their brothers take the rest of the land. They
            kept that promise. They fought through every campaign in the book of Joshua without once going home
            early. Joshua 22 is the chapter where that long service finally ends and they are sent back to the land
            that was already theirs.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 22 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Commendation and a Charge (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before anything else happens, Joshua gathers the eastern tribes and tells them plainly what he thinks of their service.</p>
        </div>
        <VerseQuote
          text="Then Joshua called the Reubenites, and the Gadites, and the half tribe of Manasseh, And said unto them, Ye have kept all that Moses the servant of the LORD commanded you, and have obeyed my voice in all that I commanded you: Ye have not left your brethren these many days unto this day, but have kept the charge of the commandment of the LORD your God."
          reference="Joshua 22:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what Joshua praises first. Not courage in battle, but years of not walking away from
            their brothers.</strong> &quot;These many days&quot; covers the entire conquest, campaign after
            campaign, with land of their own already waiting on the other side of the river the whole time.
          </p>
          <p>Joshua then sends them home with both a blessing and a warning.</p>
        </div>
        <VerseQuote
          text="But take diligent heed to do the commandment and the law, which Moses the servant of the LORD charged you, to love the LORD your God, and to walk in all his ways, and to keep his commandments, and to cleave unto him, and to serve him with all your heart and with all your soul."
          reference="Joshua 22:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Love the LORD, walk in his ways, keep his commandments, cleave to him, serve him with all your heart
            and soul. That list is not Joshua improvising. It echoes the same words Moses had already given Israel
            in <ArticleLink href="/blog/deuteronomy-6-explained">Deuteronomy 6</ArticleLink>, and Joshua repeats
            them here on purpose, to the one group of tribes about to live separated from the rest by a river and
            a border.
          </p>
          <p>He sends them off loaded with the plunder of every battle they helped win.</p>
        </div>
        <VerseQuote
          text="And he spake unto them, saying, Return with much riches unto your tents, and with very much cattle, with silver, and with gold, and with brass, and with iron, and with very much raiment: divide the spoil of your enemies with your brethren."
          reference="Joshua 22:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>They are not sent home quietly or emptyhanded.</strong> Joshua tells them to share the spoil
            with the family members who stayed behind on their own side of the Jordan, the ones who could not fight
            because the land itself needed defending.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. An Altar &quot;To See To&quot; by the Jordan (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>On the way home, before they ever cross into their own territory, the eastern tribes stop and build something.</p>
        </div>
        <VerseQuote
          text="And when they came unto the borders of Jordan, that are in the land of Canaan, the children of Reuben and the children of Gad and the half tribe of Manasseh built there an altar by Jordan, a great altar to see to."
          reference="Joshua 22:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;A great altar to see to&quot; means exactly what it sounds like. It was built large and
            visible on purpose, not hidden in a back field.</strong> They wanted it noticed. They just never told
            anyone what it was for before they left.
          </p>
          <p>
            That one gap, building something big enough to be seen and then walking away without an explanation,
            is the whole reason the rest of the chapter happens.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Israel Gathers for War (verses 11 and 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Word of the altar reaches the rest of Israel fast, and the reaction is not curiosity.</p>
        </div>
        <VerseQuote
          text="And the children of Israel heard say, Behold, the children of Reuben and the children of Gad and the half tribe of Manasseh have built an altar over against the land of Canaan, in the borders of Jordan, at the passage of the children of Israel. And when the children of Israel heard of it, the whole congregation of the children of Israel gathered themselves together at Shiloh, to go up to war against them."
          reference="Joshua 22:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>No one sends a question first. The whole nation musters for war on the strength of a rumor
            about a building project.</strong> That reaction only makes sense against the backdrop of what had
            already happened to Israel twice before over exactly this kind of issue.
          </p>
          <p>
            One command from the law explains the alarm better than anything else in the chapter. Israel had been
            told there was only ever supposed to be one place to offer sacrifice, the tabernacle itself. A second
            altar, built anywhere else, looked like a direct violation of that command, and a violation one tribe
            commits can bring judgment on everyone, the same way it already had at Peor and with Achan.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Phinehas Carries the Accusation East (verses 13 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Instead of marching straight into battle, Israel sends a delegation first, led by a priest with a history of acting fast against sin.</p>
        </div>
        <VerseQuote
          text="And the children of Israel sent unto the children of Reuben, and to the children of Gad, and to the half tribe of Manasseh, into the land of Gilead, Phinehas the son of Eleazar the priest, And with him ten princes, of each chief house a prince throughout all the tribes of Israel; and each one was an head of the house of their fathers among the thousands of Israel."
          reference="Joshua 22:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Sending a delegation before an army is already a better instinct than going straight to war. Phinehas
            is a deliberate choice of messenger. He is the same priest who had stopped a plague at Peor years
            earlier by killing an Israelite caught in open idolatry with his own hand, so his presence here is a
            warning in itself. When he arrives, the charge he brings is severe.
          </p>
        </div>
        <VerseQuote
          text="Thus saith the whole congregation of the LORD, What trespass is this that ye have committed against the God of Israel, to turn away this day from following the LORD, in that ye have builded you an altar, that ye might rebel this day against the LORD?"
          reference="Joshua 22:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then he reaches for precedent, and both examples he picks are about corporate guilt spreading from one failure to everyone.</p>
        </div>
        <VerseQuote
          text="Is the iniquity of Peor too little for us, from which we are not cleansed until this day, although there was a plague in the congregation of the LORD, But that ye must turn away this day from following the LORD? and it will be, seeing ye rebel to day against the LORD, that to morrow he will be wroth with the whole congregation of Israel."
          reference="Joshua 22:17 and 18"
        />
        <VerseQuote
          text="Did not Achan the son of Zerah commit a trespass in the accursed thing, and wrath fell on all the congregation of Israel? and that man perished not alone in his iniquity."
          reference="Joshua 22:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Peor was idolatry with foreign gods. Achan was one man&apos;s hidden theft from Jericho&apos;s
            ruins.</strong> Neither one actually matches what the eastern tribes had done, but Phinehas is not
            citing facts yet. He is citing the stakes. One tribe&apos;s sin had already cost the whole nation
            dearly, twice, and he is warning that it could happen a third time before he even hears their side.
          </p>
          <p>Before the accusation ends, Phinehas offers something close to an olive branch.</p>
        </div>
        <VerseQuote
          text="Notwithstanding, if the land of your possession be unclean, then pass ye over unto the land of the possession of the LORD, wherein the LORD's tabernacle dwelleth, and take possession among us: but rebel not against the LORD, nor rebel against us, in building you an altar beside the altar of the LORD our God."
          reference="Joshua 22:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 That single verse reveals what he actually suspects. He thinks the eastern tribes may believe their
            land east of the Jordan is somehow less holy, outside the reach of proper worship, and that the new
            altar is their workaround. He would rather they move than build a second altar out of that kind of
            doubt.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Defense: A Witness, Not a Rival (verses 21 to 29)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The eastern tribes answer, and their first words are a flat denial under oath before they explain anything.</p>
        </div>
        <VerseQuote
          text="The LORD God of gods, the LORD God of gods, he knoweth, and Israel he shall know; if it be in rebellion, or if in transgression against the LORD, (save us not this day,)"
          reference="Joshua 22:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>They repeat &quot;the LORD God of gods&quot; twice and invite judgment on themselves if they
            are lying.</strong> That is not the language of men caught in the act. It is the language of men who
            genuinely did not expect to be accused. Then comes the real reason, and it has nothing to do with
            sacrifice.
          </p>
        </div>
        <VerseQuote
          text="And if we have not rather done it for fear of this thing, saying, In time to come your children might speak unto our children, saying, What have ye to do with the LORD God of Israel? For the LORD hath made Jordan a border between us and you, ye children of Reuben and children of Gad; ye have no part in the LORD: so shall your children make our children cease from fearing the LORD."
          reference="Joshua 22:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Their real fear was never about this generation. It was about the grandchildren.</strong> They
            could already imagine a future where west bank Israelites point across the Jordan and tell the next
            generation of Reuben, Gad, and Manasseh that the river itself proves they were never fully part of the
            nation. So they built something permanent and visible to answer a question their own children had not
            even been born to ask yet.
          </p>
        </div>
        <VerseQuote
          text="Therefore we said, Let us now prepare to build us an altar, not for burnt offering, nor for sacrifice: But that it may be a witness between us, and you, and our generations after us, that we might do the service of the LORD before him with our burnt offerings, and with our sacrifices, and with our peace offerings; that your children may not say to our children in time to come, Ye have no part in the LORD."
          reference="Joshua 22:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The word that settles the whole dispute is &quot;witness.&quot; Not a working altar for sacrifice,
            but a monument shaped like one, a visible copy of the real altar at the tabernacle that could be pointed
            to generations later as proof that these tribes always worshipped the one true God the same way
            everyone else did.
          </p>
          <p>They close with the same kind of oath they opened with, now naming the exact sin Phinehas had accused them of and rejecting it outright.</p>
        </div>
        <VerseQuote
          text="God forbid that we should rebel against the LORD, and turn this day from following the LORD, to build an altar for burnt offerings, for meat offerings, or for sacrifices, beside the altar of the LORD our God that is before his tabernacle."
          reference="Joshua 22:29"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Peace Instead of War, and an Altar Named Ed (verses 30 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Phinehas hears the explanation, and his response is immediate relief, not stubborn suspicion.</p>
        </div>
        <VerseQuote
          text="And Phinehas the son of Eleazar the priest said unto the children of Reuben, and to the children of Gad, and to the children of Manasseh, This day we perceive that the LORD is among us, because ye have not committed this trespass against the LORD: now ye have delivered the children of Israel out of the hand of the LORD."
          reference="Joshua 22:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Phinehas does not just drop the accusation. He says the eastern tribes&apos; honesty saved the
            rest of Israel from bringing judgment on itself by attacking them wrongly.</strong> A war built on a
            wrong assumption would have been just as costly as the sin Phinehas feared in the first place.
          </p>
          <p>The delegation returns, reports what they heard, and the nation steps back from the edge of war.</p>
        </div>
        <VerseQuote
          text="And the thing pleased the children of Israel; and the children of Israel blessed God, and did not intend to go up against them in battle, to destroy the land wherein the children of Reuben and Gad dwelt."
          reference="Joshua 22:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends with the altar finally getting the one thing it never had at the start: a name that explains it.</p>
        </div>
        <VerseQuote
          text="And the children of Reuben and the children of Gad called the altar Ed: for it shall be a witness between us that the LORD is God."
          reference="Joshua 22:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ed simply means witness. The same idea appears earlier in Scripture when{" "}
            <ArticleLink href="/blog/genesis-31-explained">Jacob and Laban</ArticleLink> set up a heap of stones as a
            witness between two suspicious parties who needed something solid standing between them once words had
            run out. The eastern tribes did the same thing here, only this time the whole nation of Israel almost
            went to war before anyone asked what the stones were for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 22 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did Israel prepare for war before ever asking the eastern tribes what the altar was
            for?</strong> What the text says: verse 12 has the whole congregation gathering at Shiloh to go to war
            the moment they heard about the altar, with no mention of a question sent first. How this fits the rest
            of the chapter: Israel did eventually send Phinehas and ten princes to ask before fighting, so the
            delegation in verses 13 to 15 corrects the first instinct. The chapter does not praise the rush to war.
            It shows a dangerous first reaction followed by a wiser second one.
          </p>
          <p>
            <strong>Why did Phinehas compare a memorial altar to Peor and Achan, two sins that were nothing like
            it?</strong> What the text says: verses 17 to 20 name both incidents directly, where the first was
            idolatry with a foreign god and the second was hidden theft from a destroyed city. How this is read:
            Phinehas was not claiming the altar matched those sins in kind. He was warning what one tribe&apos;s
            unexplained departure from the single altar command could still cost everyone, since both Peor and
            Achan had already proven that one group&apos;s failure brought consequences on the whole nation.
          </p>
          <p>
            <strong>Was building a second altar actually against the law, even as a memorial?</strong> What the
            text says: the eastern tribes insist in verses 26 to 29 that it was never built for burnt offerings,
            meat offerings, or sacrifices, only as a witness shaped like the real altar at the tabernacle. How this
            is read: the law&apos;s concern was a rival place of sacrifice, which would have split true worship
            across multiple sites. A monument that performed no sacrifices and pointed back to the one legitimate
            altar did not break that command, which is exactly the distinction Phinehas accepts once he hears it.
          </p>
          <p>
            <strong>Why were the eastern tribes so afraid of being cut off, when Moses had already given them this
            exact land?</strong> What the text says: verse 25 has them naming the Jordan itself as the border their
            own descendants might one day use against them. How this fits: a legal grant of land does not erase the
            fear of being treated as outsiders. The river that protected their inheritance could just as easily
            become the line future generations used to say they never fully belonged, which is the specific fear
            the altar was built to answer before it ever had the chance to grow.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 22
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 22:5</h3>
        <VerseQuote
          text="But take diligent heed to do the commandment and the law, which Moses the servant of the LORD charged you, to love the LORD your God, and to walk in all his ways, and to keep his commandments, and to cleave unto him, and to serve him with all your heart and with all your soul."
          reference="Joshua 22:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Joshua&apos;s parting charge to the tribes about to live separated by a river, echoing the same call to
          love and obedience Moses had already given the whole nation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 22:25</h3>
        <VerseQuote
          text="For the LORD hath made Jordan a border between us and you, ye children of Reuben and children of Gad; ye have no part in the LORD: so shall your children make our children cease from fearing the LORD."
          reference="Joshua 22:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The fear underneath the whole dispute, spoken plainly at last. A border meant for land had started to feel
          like a border on belonging itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 22:29</h3>
        <VerseQuote
          text="God forbid that we should rebel against the LORD, and turn this day from following the LORD, to build an altar for burnt offerings, for meat offerings, or for sacrifices, beside the altar of the LORD our God that is before his tabernacle."
          reference="Joshua 22:29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A direct, sworn denial of the exact sin they were accused of, answered with specifics instead of
          defensiveness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 22:34</h3>
        <VerseQuote
          text="And the children of Reuben and the children of Gad called the altar Ed: for it shall be a witness between us that the LORD is God."
          reference="Joshua 22:34"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The name that finally explains everything the altar had been accused of. Not a rival place of sacrifice,
          but a permanent reminder standing between two groups who needed one.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 22
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 22?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua sent Reuben, Gad, and the half tribe of Manasseh home after years of fighting alongside the other
          tribes. On the way, they built a large altar by the Jordan. The rest of Israel assumed it was an act of
          rebellion and gathered to go to war, until a delegation led by Phinehas learned the altar was only ever
          meant as a memorial, and the two sides parted in peace.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Reuben, Gad, and Manasseh build an altar at all?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joshua 22:24 and 25 give their stated reason directly. They feared that future generations west of the
          Jordan would use the river itself as proof that the eastern tribes had &quot;no part in the LORD.&quot;
          The altar was built as permanent evidence against that exact claim, decades before anyone would actually
          make it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the altar a sin against God&apos;s law?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, once the full explanation came out. The law forbade a second site for actual sacrifice, which is what
          Phinehas initially suspected. The eastern tribes insisted, under oath, that the altar was never used for
          burnt offerings or sacrifices, only built as a witness shaped like the real altar at the tabernacle.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel almost go to war without asking first?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 12 records the whole congregation gathering at Shiloh for war on the strength of a report alone.
          Israel&apos;s recent history at Peor and with Achan had already taught them that one group&apos;s
          unfaithfulness could bring judgment on everyone, which made the rumor of a second altar feel urgent enough
          to act on immediately.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Phinehas, and why was he sent?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Phinehas was the son of Eleazar the priest, already known for ending a deadly plague at Peor by acting
          decisively against open sin. Sending him as the lead of the delegation signaled how seriously Israel was
          treating the report, and it explains why he reaches for Peor by name once he arrives.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the altar&apos;s name, Ed, mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ed means witness. Joshua 22:34 states the reason directly: it stood as a witness between the eastern
          tribes and the rest of Israel that the LORD is God, not as a place where sacrifices were actually offered.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Reuben, Gad, and Manasseh ever get a separate altar for sacrifice?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The chapter is clear that this altar was never used that way. The one legitimate place for sacrifice
          stayed the tabernacle, which at this point in Joshua stood at Shiloh, the same place the whole
          congregation gathered when they first heard the alarming report.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does this chapter matter if the whole conflict turned out to be a misunderstanding?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the near war was real even though the sin was not. Joshua 22 shows an entire nation moving toward
          battle against its own people on the strength of an assumption, and shows what it looks like to stop,
          send a question first, and listen to the answer before anyone is harmed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Joshua 22 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It closes the story that began in Numbers 32, where these same tribes first asked Moses for land east of
          the Jordan. It also echoes a pattern already seen with Jacob and Laban&apos;s witness stones in Genesis
          31, where two suspicious parties needed a physical object standing between them once an agreement was
          reached.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 22 is not really about an altar. It is about what happens between people who love the same God and still manage to assume the worst of each other.</p>
          <p>
            📌 <strong>A rumor traveled faster than a question.</strong> Israel armed for war before a single person
            asked the eastern tribes what they had actually built. The chapter corrects itself only because someone
            finally sent a delegation instead of an army.
          </p>
          <p>
            📌 <strong>The real fear was rarely the stated one.</strong> The accusation was idolatry. The actual
            fear, once spoken honestly, was belonging. Reuben, Gad, and Manasseh were not protecting a ritual. They
            were protecting their grandchildren&apos;s place in the family of God.
          </p>
          <p>
            📌 <strong>A witness standing between two sides can prevent a war a sword never will.</strong> The altar
            named Ed did more good once it was explained than it ever could have done staying silent and
            misunderstood.
          </p>
          <p>
            You probably are not building an altar by a river this week. But you have likely been on one side or
            the other of a conflict built entirely out of an assumption no one checked.
          </p>
          <p>So here is your one next step.</p>
          <p>
            The next time someone&apos;s actions look like betrayal, ask the question Phinehas eventually asked
            before the war Israel was already preparing for.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
