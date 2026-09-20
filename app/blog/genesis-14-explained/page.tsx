import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-14-explained", {
  title: "Genesis 14 Explained: The War of the Kings and Melchizedek",
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

export default function GenesisFourteenExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-14-explained"
      title={<>📖 Genesis 14 Explained: The War of the Kings and Melchizedek</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Four kings against five. A nephew dragged off in chains. A shepherd turned soldier.</p>
            <p>
              <strong>Genesis 14 explained</strong> is the first war recorded in the Bible, and it
              happens because a coalition of eastern kings crushes a rebellion near the Dead Sea and
              hauls off everything Sodom owns, including Abram&apos;s nephew Lot. Abram had already
              let Lot pick the better land in the last chapter. Now that choice comes with a price
              neither man expected.
            </p>
            <p>Maybe you have had to go rescue someone whose own choices helped put them in danger.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ How does one man with a household army beat four kings?</li>
            <li>❓ Who is Melchizedek, and why does he show up out of nowhere?</li>
            <li>❓ Why does Abram refuse a reward from one king but accept a blessing from another?</li>
            <li>❓ And what does bread, wine, and a tenth of everything have to do with you?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Genesis 14 is the chapter where Abram stops being only a man who receives
              promises and becomes a man who acts on them, rescuing a captive and refusing a bribe in
              the same day.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the war between the kings,
              Lot&apos;s capture, Abram&apos;s rescue, the strange priest who meets him on the way
              home, and the oath Abram swears rather than let a pagan king take credit for his
              blessing.
            </p>
            <p>One chapter, and Abram goes from vineyard to battlefield to altar.</p>
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
            <ArticleLink href="/blog/genesis-13-explained">Genesis 13</ArticleLink> ended with two
            men going separate directions. Abram let Lot choose first, and Lot chose the well
            watered plain of Jordan, pitching his tent toward Sodom. Abram stayed in Canaan, and God
            renewed the promise of land and descendants the moment Abram had less ground to stand
            on.
          </p>
          <p>
            That chapter already warned the reader what kind of place Lot had moved toward: &quot;the
            men of Sodom were wicked and sinners before the LORD exceedingly.&quot; Genesis 14 does
            not open with that wickedness directly. It opens with a war neither Abram nor Lot
            started, one that sweeps through the whole region and lands right on Lot&apos;s
            doorstep, in the very land God had already promised to Abram back in{" "}
            <ArticleLink href="/blog/genesis-12-explained">Genesis 12</ArticleLink>.
          </p>
          <p>
            📌 <strong>Genesis 13 showed Lot choosing the plain by sight. Genesis 14 shows what that
            plain actually cost him.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 14 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Four Kings, Five Kings, and a Rebellion (verses 1 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a list of names most readers skip past. Slow down here, because the numbers matter.</p>
        </div>
        <VerseQuote
          text="And it came to pass in the days of Amraphel king of Shinar, Arioch king of Ellasar, Chedorlaomer king of Elam, and Tidal king of nations; That these made war with Bera king of Sodom, and with Birsha king of Gomorrah, Shinab king of Admah, and Shemeber king of Zeboiim, and the king of Bela, which is Zoar."
          reference="Genesis 14:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Nine kings are named in two verses, four from the east against five from the plain
            where Sodom and Gomorrah sit. This is not a border skirmish. It is a coalition war.
          </p>
        </div>
        <VerseQuote
          text="Twelve years they served Chedorlaomer, and in the thirteenth year they rebelled. And in the fourteenth year came Chedorlaomer, and the kings that were with him, and smote the Rephaims in Ashteroth Karnaim, and the Zuzims in Ham, and the Emims in Shaveh Kiriathaim, And the Horites in their mount Seir, unto Elparan, which is by the wilderness."
          reference="Genesis 14:4 to 6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The five kings had been paying tribute to Chedorlaomer for twelve years
            before they ever rebelled.</strong> This was not a sudden attack on innocent cities.
            Sodom and its allies broke an existing arrangement, and Chedorlaomer came back a year
            later with a full campaign, crushing several peoples along the way before he even
            reaches the rebels themselves.
          </p>
          <p>
            The Rephaims and Emims show up elsewhere in the Old Testament associated with unusually
            large people; Deuteronomy later calls Og of Bashan the last of the Rephaims and
            describes the Emims as tall, like the Anakims. Chedorlaomer&apos;s army was not only
            putting down one rebellion. It was sweeping through the whole region before turning
            toward the vale of Siddim.
          </p>
        </div>
        <VerseQuote
          text="And they returned, and came to Enmishpat, which is Kadesh, and smote all the country of the Amalekites, and also the Amorites, that dwelt in Hazezontamar. And there went out the king of Sodom, and the king of Gomorrah, and the king of Admah, and the king of Zeboiim, and the king of Bela (the same is Zoar;) and they joined battle with them in the vale of Siddim; With Chedorlaomer the king of Elam, and with Tidal king of nations, and Amraphel king of Shinar, and Arioch king of Ellasar; four kings with five."
          reference="Genesis 14:7 to 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The text spells out the mismatch plainly: &quot;four kings with five.&quot; Numbers
            were not the deciding factor. Chedorlaomer&apos;s coalition had already proven itself on
            a long campaign before Sodom&apos;s kings ever met them on the field.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Vale of Siddim and Lot Taken Captive (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The battle does not last long, and the terrain itself turns against the losing side.</p>
        </div>
        <VerseQuote
          text="And the vale of Siddim was full of slimepits; and the kings of Sodom and Gomorrah fled, and fell there; and they that remained fled to the mountain."
          reference="Genesis 14:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The kings of Sodom and Gomorrah do not die in combat. They fall into pits of
            tar while running away.</strong> The same ground that made the plain look so fertile and
            well watered back in Genesis 13 turns out to be full of natural hazards once the fighting
            starts.
          </p>
        </div>
        <VerseQuote
          text="And they took all the goods of Sodom and Gomorrah, and all their victuals, and went their way. And they took Lot, Abram's brother's son, who dwelt in Sodom, and his goods, and departed."
          reference="Genesis 14:11 and 12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice exactly where the text says Lot was living: inside Sodom itself.</strong>{" "}
            Back in Genesis 13 he only pitched his tent toward the city. Some amount of time has
            passed, and Lot has moved from the outskirts to living inside the gates. That move is
            the reason the invading army sweeps him up along with everything else Sodom owns.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Abram the Hebrew Musters an Army (verses 13 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Word travels fast, and it reaches the one man with both the motive and the household to do something about it.</p>
        </div>
        <VerseQuote
          text="And there came one that had escaped, and told Abram the Hebrew; for he dwelt in the plain of Mamre the Amorite, brother of Eshcol, and brother of Aner: and these were confederate with Abram."
          reference="Genesis 14:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the first time the word &quot;Hebrew&quot; appears anywhere in the Bible,
            attached directly to Abram&apos;s name. The verse also quietly introduces three allies,
            Mamre, Eshcol, and Aner, Amorite neighbors who have formed an alliance with Abram. He is
            not an isolated wanderer. He has built real relationships in the land God promised him,
            and those relationships are about to matter.
          </p>
        </div>
        <VerseQuote
          text="And when Abram heard that his brother was taken captive, he armed his trained servants, born in his own house, three hundred and eighteen, and pursued them unto Dan."
          reference="Genesis 14:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three hundred and eighteen men, all born and trained inside Abram&apos;s own
            household, not a hired mercenary force.</strong> That single, specific{" "}
            <ArticleLink href="/blog/biblical-numbers-meanings">number in Scripture</ArticleLink>{" "}
            gives a picture of how large Abram&apos;s camp had already grown. He calls Lot &quot;his brother&quot; here,
            the same broad family language the text used for Haran back in Genesis 11. Lot is his
            nephew, but the bond the text describes is closer than a technical family chart.
          </p>
        </div>
        <VerseQuote
          text="And he divided himself against them, he and his servants, by night, and smote them, and pursued them unto Hobah, which is on the left hand of Damascus. And he brought back all the goods, and also brought again his brother Lot, and his goods, and the women also, and the people."
          reference="Genesis 14:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A night attack, splitting his forces, chasing a victorious army far north past Damascus.
            Abram wins by strategy against a coalition that had just defeated five kings. The text
            does not explain the tactics in detail, but the outcome is complete: goods, people, and
            Lot himself, all recovered.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Melchizedek, King of Salem (verses 17 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two kings come out to meet Abram on his way home, and only one of them gets named first.</p>
        </div>
        <VerseQuote
          text="And the king of Sodom went out to meet him after his return from the slaughter of Chedorlaomer, and of the kings that were with him, at the valley of Shaveh, which is the king's dale."
          reference="Genesis 14:17"
        />
        <VerseQuote
          text="And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God."
          reference="Genesis 14:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Melchizedek appears with no introduction, no genealogy, and no explanation of
            where he came from.</strong> He is simply king of Salem, a city most readers connect to
            Jerusalem, since Psalm 76:2 later places God&apos;s dwelling &quot;in Salem&quot; and
            &quot;in Zion.&quot; He is also called &quot;priest of the most high God,&quot; one of
            the earliest <ArticleLink href="/blog/names-of-god-meanings">names of God</ArticleLink>{" "}
            in Scripture, used for the same God Abram already worships, centuries before Israel has
            a temple, a priesthood, or a law telling anyone how to serve God at all.
          </p>
        </div>
        <VerseQuote
          text="And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth: And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all."
          reference="Genesis 14:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Melchizedek blesses Abram, credits the victory to God rather than to Abram&apos;s
            three hundred and eighteen men, and Abram responds by giving him a tenth of everything
            recovered. This is the first tithe recorded anywhere in the Bible, given by Abram
            himself, hundreds of years before the law of Moses ever mentions tithing.
          </p>
          <p>
            📌 <strong>Abram gives away a tenth of the spoils to a priest he has no prior recorded
            relationship with, immediately after winning a war most men would use to enrich
            themselves.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Abram Refuses the King of Sodom (verses 21 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The king of Sodom, who has been standing there the whole time, finally makes his own offer.</p>
        </div>
        <VerseQuote text="And the king of Sodom said unto Abram, Give me the persons, and take the goods to thyself." reference="Genesis 14:21" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>It is a generous sounding offer on the surface.</strong> By the customs of
            ancient warfare, whoever won the battle had every right to keep the recovered goods.
            Abram earned it. The king of Sodom is only asking for the people back.
          </p>
          <p>Abram turns it down, and explains exactly why in an oath.</p>
        </div>
        <VerseQuote
          text="And Abram said to the king of Sodom, I have lift up mine hand unto the LORD, the most high God, the possessor of heaven and earth, That I will not take from a thread even to a shoelatchet, and that I will not take any thing that is thine, lest thou shouldest say, I have made Abram rich:"
          reference="Genesis 14:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Abram borrows Melchizedek&apos;s own words, &quot;the most high God, the
            possessor of heaven and earth,&quot; and swears by them.</strong> He will not let anyone
            on earth take credit for what God has already promised to give him. A thread and a
            shoelatchet are about as small as a possession gets. Abram names the smallest items on
            purpose, refusing even the tiniest claim the king of Sodom could later make.
          </p>
        </div>
        <VerseQuote
          text="Save only that which the young men have eaten, and the portion of the men which went with me, Aner, Eshcol, and Mamre; let them take their portion."
          reference="Genesis 14:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Abram&apos;s refusal is personal, not a rule for everyone. His three allies from
            verse 13, Aner, Eshcol, and Mamre, fought in the same rescue and are free to take their
            own share. Abram only binds his own oath, and lets the men who followed him keep what
            they earned.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 14 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Who was Melchizedek?</strong> Genesis 14 says only that he was king of Salem and
            priest of the most high God. Hebrews 7:3 later describes him as &quot;without father,
            without mother, without descent, having neither beginning of days, nor end of life; but
            made like unto the Son of God,&quot; language many Christians read as pointing to a real
            historical king and priest whose lack of any recorded genealogy in the text makes him a
            fitting picture, or type, of Christ&apos;s eternal priesthood. Others read Hebrews more
            simply, that the silence of Scripture about his origins is itself the point being made,
            without Melchizedek being anything more than a real Canaanite king who worshiped the
            true God. Genesis 14 itself gives no more detail than his title and his actions.
          </p>
          <p>
            <strong>Was Melchizedek an appearance of Christ before His birth?</strong> Some Christians
            hold this view, called a Christophany, pointing to how closely Melchizedek&apos;s
            priesthood is tied to Jesus in Hebrews 7 and Psalm 110:4, which says, &quot;Thou art a
            priest for ever after the order of Melchizedek.&quot; Others hold that he was a human
            king and priest whose office simply foreshadowed Christ&apos;s, the same way a sacrifice
            or a Passover lamb points forward without being a literal appearance of Jesus. Both views
            take the text seriously, and Genesis 14 does not settle which one is correct.
          </p>
          <p>
            <strong>Does the bread and wine point to communion?</strong> Genesis 14 records
            Melchizedek bringing out bread and wine as a meal for Abram after the battle, without
            explaining any deeper meaning at the time. Many Christians later see it as an early
            picture that anticipates the Lord&apos;s Supper, especially given Melchizedek&apos;s
            connection to Christ&apos;s priesthood in Hebrews. That reading is a later theological
            connection drawn from the whole of Scripture, not something Genesis 14 states outright.
          </p>
          <p>
            <strong>How could Abram pursue the enemy &quot;unto Dan&quot; if the tribe of Dan did
            not exist yet?</strong> Dan was one of Jacob&apos;s sons, born generations after Abram,
            and the territory named for the tribe of Dan is described later in Joshua and Judges.
            Most readers understand &quot;Dan&quot; in Genesis 14:14 as a later scribal update, where
            a copyist replaced an older place name with the name readers of that later time would
            recognize, the same way a modern map might label an ancient site by its current name for
            clarity. It does not change what happened, only how the location is labeled in the text
            we have.
          </p>
          <p>
            <strong>Why did Abram tithe to Melchizedek but refuse anything from the king of
            Sodom?</strong> The text does not explain Abram&apos;s reasoning directly, but the
            contrast is plain from what each man represents. Melchizedek blesses Abram in the name
            of the most high God and credits the victory to Him. The king of Sodom offers a deal
            that would let him later claim some credit for Abram&apos;s wealth. Abram gives freely to
            the one who points to God, and refuses anything from the one who might point to himself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 14
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 14:14</h3>
        <VerseQuote
          text="And when Abram heard that his brother was taken captive, he armed his trained servants, born in his own house, three hundred and eighteen, and pursued them unto Dan."
          reference="Genesis 14:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment Abram stops being only a man who receives promises and becomes a man who acts,
          gathering a household army to go rescue his nephew.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 14:18</h3>
        <VerseQuote text="And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God." reference="Genesis 14:18" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the most debated figures in the Bible, introduced in a single quiet sentence with
          no explanation of where he came from.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 14:19 and 20</h3>
        <VerseQuote
          text="And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth: And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all."
          reference="Genesis 14:19 and 20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first tithe in the Bible, given freely by Abram himself, centuries before the law of
          Moses ever commands one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 14:22 and 23</h3>
        <VerseQuote
          text="And Abram said to the king of Sodom, I have lift up mine hand unto the LORD, the most high God, the possessor of heaven and earth, That I will not take from a thread even to a shoelatchet, and that I will not take any thing that is thine, lest thou shouldest say, I have made Abram rich:"
          reference="Genesis 14:22 and 23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Abram refuses even the smallest possible claim, unwilling to let anyone but God take
          credit for his blessing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 14:16</h3>
        <VerseQuote
          text="And he brought back all the goods, and also brought again his brother Lot, and his goods, and the women also, and the people."
          reference="Genesis 14:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The rescue completed in full, nothing left behind, after a night attack against a coalition
          that had just defeated five kings.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 14
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 14 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records the first war in the Bible, a coalition of four eastern kings defeating five
          kings near the Dead Sea and capturing Lot along with Sodom&apos;s goods. Abram rescues Lot
          with a household army of three hundred and eighteen men, then meets Melchizedek, king of
          Salem, and refuses a reward from the king of Sodom.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Melchizedek in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 14:18 calls him king of Salem and priest of the most high God, with no genealogy
          or backstory given. He blesses Abram, receives a tenth of the recovered spoils, and later
          becomes central to Hebrews 7&apos;s argument about Christ&apos;s priesthood.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Melchizedek Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Christians disagree. Some see Melchizedek as a pre incarnate appearance of Christ himself.
          Others see him as a real human king and priest whose office and lack of recorded genealogy
          simply foreshadow Jesus, the way many Old Testament figures and rituals do. Genesis 14 does
          not state which view is correct.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where is Salem in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most readers identify it with Jerusalem. Psalm 76:2 places God&apos;s dwelling &quot;in
          Salem&quot; and &quot;in Zion&quot; in the same verse, tying the two names to the same
          location.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Abram rescue Lot after Lot chose the better land for himself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 14 does not record any hesitation or resentment on Abram&apos;s part. The moment he
          hears his relative is taken captive, he arms his household and goes. The text presents it
          as loyalty to family, not a settling of accounts from the land split in Genesis 13.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many men did Abram have when he rescued Lot?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Three hundred and eighteen, all trained servants born inside his own household, according
          to Genesis 14:14. That number alone shows how large Abram&apos;s camp had grown by this
          point in Genesis.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the most high God&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the title Melchizedek uses for God in Genesis 14:18 to 20, and Abram repeats it back
          in his own oath in verse 22. It identifies the LORD as supreme over every other claimed
          god or power, fitting for a chapter about kings and kingdoms colliding.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Abram refuse the king of Sodom&apos;s offer?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 14:23 gives his own reason: so the king of Sodom could never say, &quot;I have made
          Abram rich.&quot; Abram had already sworn an oath by the most high God and would not let a
          pagan king claim any credit for a blessing that belonged to God alone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is Genesis 14 the first war in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. It is the first recorded military conflict in Scripture, complete with named kings,
          alliances, and a described battle, making it the earliest war account in the Bible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Abram called &quot;the Hebrew&quot; in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 14:13 is the first time the word &quot;Hebrew&quot; appears in the Bible, attached
          to Abram by name. The chapter does not explain the origin of the term, only that it already
          identifies him among the people of the land.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 14 takes Abram from vineyard to battlefield to altar in the space of one chapter.</p>
          <p>
            📌 <strong>Loyalty acted on a promise is not the same as loyalty that waits to feel
            deserved.</strong> Abram rescues Lot without a word of blame for the choice that put him
            in Sodom in the first place.
          </p>
          <p>
            📌 <strong>A blessing worth having is not one you let someone else take credit
            for.</strong> Abram tithes freely to a priest who points to God, and refuses even a
            thread from a king who might later point to himself.
          </p>
          <p>
            📌 <strong>God can put the right person in your path before you even know you need
            him.</strong> Melchizedek meets Abram once, blesses him, and disappears from Genesis as
            quickly as he arrived, yet Scripture never stops talking about him.
          </p>
          <p>
            You may have someone in your life whose own choices helped lead them into trouble.
            Genesis 14 does not ask Abram to decide whether Lot deserved rescuing. It only shows him
            going.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Think of who God may be calling you to go after, whatever led them into their own
            trouble, and go anyway.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
