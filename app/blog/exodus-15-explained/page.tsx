import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-15-explained", {
  title: "Exodus 15 Explained: The Song of Moses and the Water at Marah",
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

export default function ExodusFifteenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-15-explained"
      title={<>📖 Exodus 15 Explained: The Song of Moses and the Water at Marah</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One sea just swallowed an empire&apos;s army. Israel is still on the shore, still soaked, still shaking.</p>
            <p>
              <strong>Exodus 15 explained</strong> is the chapter where that same shaking turns into
              singing, and then, only a few verses and three days later, into complaining. Moses
              leads the whole camp in the first song recorded in the Bible, Miriam answers with
              timbrels and dancing women, and then the road turns dry, the water turns bitter, and
              the same mouths that just sang &quot;the LORD is my strength&quot; are asking Moses
              what they are supposed to drink.
            </p>
            <p>Maybe you know that whiplash better than you would like to admit.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a song of worship spend so much time on drowning soldiers?</li>
            <li>❓ Who is Miriam, and why does Scripture suddenly call her a prophetess?</li>
            <li>❓ Does &quot;I am the LORD that healeth thee&quot; mean you will never get sick?</li>
            <li>❓ And why does praise this loud fade to complaining this fast?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 15 proves that a mountaintop and a near mutiny can happen inside the
              same week, in the same camp, among the same people.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the song itself, the
              uncomfortable violence inside it, the future it predicts before Israel has met a
              single enemy named in it, Miriam&apos;s answering verse, and the hard turn from
              celebration to thirst that closes the chapter at a spring called Bitter and a camp
              called Elim.
            </p>
            <p>Read slowly. This chapter has more to say about your own short memory than you might expect.</p>
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
            <ArticleLink href="/blog/exodus-14-explained">Exodus 14</ArticleLink> ended with
            Pharaoh&apos;s entire pursuing army, every chariot and horseman that drove into the
            sea after Israel, destroyed when the water returned. Israel walked out the other side
            on dry ground, already under the same pillar of fire that had led them since{" "}
            <ArticleLink href="/blog/exodus-13-explained">Exodus 13</ArticleLink>, and the chapter
            closed with a people who finally &quot;feared the LORD, and believed the LORD, and his
            servant Moses.&quot;
          </p>
          <p>
            Exodus 15 opens in that same breath, still standing on the shore with the bodies of
            Egypt&apos;s army washing up around them. Before Israel takes another step toward
            Canaan, Moses turns the whole nation&apos;s attention to what just happened, and tells
            them to sing about it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 15 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Song Begins: The LORD Is My Strength (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the whole camp finding its voice at once.</p>
        </div>
        <VerseQuote
          text="Then sang Moses and the children of Israel this song unto the LORD, and spake, saying, I will sing unto the LORD, for he hath triumphed gloriously: the horse and his rider hath he thrown into the sea."
          reference="Exodus 15:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice who is credited with singing: <strong>Moses and the children of Israel</strong>,
            together. This is not <ArticleLink href="/blog/moses">Moses</ArticleLink> performing for
            an audience. It is a whole nation, hours removed from slavery, finding the same words at
            the same time.
          </p>
        </div>
        <VerseQuote
          text="The LORD is my strength and song, and he is become my salvation: he is my God, and I will prepare him an habitation; my father's God, and I will exalt him. The LORD is a man of war: the LORD is his name."
          reference="Exodus 15:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Thousands of voices sing this in the plural, and every line is still
            singular: my strength, my salvation, my God.</strong> Corporate worship here is not a
            crowd losing itself in a feeling. It is thousands of individual people each able to say
            the same personal sentence truthfully at once.
          </p>
          <p>
            <strong>A man of war</strong> is a jarring title to put this early in a worship song.
            The rest of the chapter explains what it means, and what it does not.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. What the LORD Did to Pharaoh&apos;s Army (verses 4 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The song turns from who God is to exactly what He just did, in specific, physical detail.</p>
        </div>
        <VerseQuote
          text="Pharaoh's chariots and his host hath he cast into the sea: his chosen captains also are drowned in the Red sea. The depths have covered them: they sank into the bottom as a stone."
          reference="Exodus 15:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the song does something striking. It quotes the enemy&apos;s own confidence back at them.</p>
        </div>
        <VerseQuote
          text="The enemy said, I will pursue, I will overtake, I will divide the spoil; my lust shall be satisfied upon them; I will draw my sword, my hand shall destroy them."
          reference="Exodus 15:9"
        />
        <VerseQuote
          text="Thou didst blow with thy wind, the sea covered them: they sank as lead in the mighty waters."
          reference="Exodus 15:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Four boasts beginning with &quot;I will,&quot; answered by one verse
            beginning with &quot;thou didst.&quot;</strong> Egypt&apos;s whole plan, spoken in its
            own words, collapses against a single breath from God. The song is not inventing
            Egypt&apos;s arrogance for effect. It is repeating back exactly the kind of confidence a
            chosen strike force riding six hundred chariots would have had, right before the water
            closed over it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Who Is Like the LORD (verses 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>At its center, the song stops describing the battle and asks a question instead.</p>
        </div>
        <VerseQuote
          text="Who is like unto thee, O LORD, among the gods? who is like thee, glorious in holiness, fearful in praises, doing wonders?"
          reference="Exodus 15:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Among the gods</strong> is not Israel admitting other gods are real rivals to
            the LORD. It is the sharpest way available to say none of them compare, using the same
            language the nations around Israel already used for their own pantheons. Egypt had just
            watched its river, its sun, and its Nile-born Pharaoh all fail to protect it. This
            question has an obvious answer by the time it is asked.
          </p>
        </div>
        <VerseQuote
          text="Thou in thy mercy hast led forth the people which thou hast redeemed: thou hast guided them in thy strength unto thy holy habitation."
          reference="Exodus 15:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The tone shifts here. Judgment on Egypt gives way to mercy toward Israel, in the same
            breath, from the same hand. <strong>Redeemed</strong>, <strong>guided</strong>, and{" "}
            <strong>led</strong> are gentler verbs than anything in the first ten verses, and they
            describe the same God doing both.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Song That Already Sees the Future (verses 14 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The song then looks past the sea entirely, toward nations Israel has not even met yet.</p>
        </div>
        <VerseQuote
          text="The people shall hear, and be afraid: sorrow shall take hold on the inhabitants of Palestina. Then the dukes of Edom shall be amazed; the mighty men of Moab, trembling shall take hold upon them; all the inhabitants of Canaan shall melt away."
          reference="Exodus 15:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Palestina</strong> here names the Philistines, not a later political term.
            Philistia, Edom, Moab, and Canaan are all nations Israel has not fought, and in most
            cases has not yet encountered at all. The song predicts their fear before a single one
            of these battles happens.
          </p>
          <p>
            Years later, that prediction gets quoted back almost word for word, from an unexpected
            mouth. A woman in Jericho named Rahab tells two Israelite spies that her whole city
            already melted with fear the moment they heard what the LORD had done at this very sea.
            The song was not just poetic confidence. It reached people who were never in the camp to
            hear it sung.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt bring them in, and plant them in the mountain of thine inheritance, in the place, O LORD, which thou hast made for thee to dwell in, in the Sanctuary, O LORD, which thy hands have established. The LORD shall reign for ever and ever."
          reference="Exodus 15:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verse 18 is one of the earliest places in Scripture that simply states God&apos;s
            reign is permanent, full stop.</strong> Not a reign that depends on this victory, or the
            next one, or whether Israel ever makes it to Canaan at all. The LORD shall reign forever,
            stated as a plain fact in the middle of a song about an escape that had happened only
            hours earlier.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Miriam Answers With the Same Song (verses 19 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter steps back to summarize what just happened in the sea, then turns to a second voice leading a second round of the same song.</p>
        </div>
        <VerseQuote
          text="And Miriam the prophetess, the sister of Aaron, took a timbrel in her hand; and all the women went out after her with timbrels and with dances."
          reference="Exodus 15:20"
        />
        <VerseQuote
          text="And Miriam answered them, Sing ye to the LORD, for he hath triumphed gloriously; the horse and his rider hath he thrown into the sea."
          reference="Exodus 15:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the first time <ArticleLink href="/blog/who-was-miriam">Miriam</ArticleLink> is
            ever named in Scripture, and she is introduced with a title given to very few women in
            the entire Bible: <strong>prophetess</strong>. Her line is not a new song. It is almost
            exactly the opening line Moses already sang, handed back with a timbrel and a crowd of
            women dancing behind her.
          </p>
          <p>
            ⚠️ <strong>Worship here is not one leader performing while everyone else listens.</strong>{" "}
            It is call and answer, led by two different people, in two different ways, saying the
            same true thing about the same God.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Three Days Later: No Water (verses 22 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The song ends, and the chapter changes mood faster than almost any transition in Exodus.</p>
        </div>
        <VerseQuote
          text="So Moses brought Israel from the Red sea, and they went out into the wilderness of Shur; and they went three days in the wilderness, and found no water."
          reference="Exodus 15:22"
        />
        <VerseQuote
          text="And when they came to Marah, they could not drink of the waters of Marah, for they were bitter: therefore the name of it was called Marah."
          reference="Exodus 15:23"
        />
        <VerseQuote
          text="And the people murmured against Moses, saying, What shall we drink?"
          reference="Exodus 15:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The text itself explains the name: the water was bitter, so the place was called{" "}
            <strong>Marah</strong>, bitter. Three days is not a long time. It is roughly the gap
            between singing &quot;the LORD is my strength&quot; on a beach and standing at an
            undrinkable spring asking Moses what went wrong.
          </p>
          <p>
            📌 <strong>Thirst did what Pharaoh&apos;s entire army could not do. It made Israel
            doubt, days after they had just watched that same army destroyed.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Tree at Marah, and the Name God Gives Himself (verses 25 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses does not scold the complaint. He takes it straight to God.</p>
        </div>
        <VerseQuote
          text="And he cried unto the LORD; and the LORD shewed him a tree, which when he had cast into the waters, the waters were made sweet: there he made for them a statute and an ordinance, and there he proved them,"
          reference="Exodus 15:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The text never names the tree or explains how it worked. What it does say plainly is
            that this moment became a <strong>statute and an ordinance</strong>, Israel&apos;s first
            taste of conditional, if-then instruction, well before any of the law given at Sinai.
            God also <strong>proved them</strong> here. The testing did not wait for the wilderness
            to get harder. It started three days after the sea.
          </p>
        </div>
        <VerseQuote
          text="And said, If thou wilt diligently hearken to the voice of the LORD thy God, and wilt do that which is right in his sight, and wilt give ear to his commandments, and keep all his statutes, I will put none of these diseases upon thee, which I have brought upon the Egyptians: for I am the LORD that healeth thee."
          reference="Exodus 15:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>I am the LORD that healeth thee</strong> is one of the earliest places God
            describes Himself this specifically by what He does, the same pattern seen throughout{" "}
            <ArticleLink href="/blog/names-of-god-meanings">the names of God</ArticleLink>. Read the
            whole sentence, though, and the promise is wrapped around an &quot;if.&quot; This is a
            word to a specific people in a specific wilderness about a specific set of diseases, not
            a blank guarantee detached from the hearkening it is tied to.
          </p>
        </div>
        <VerseQuote
          text="And they came to Elim, where were twelve wells of water, and threescore and ten palm trees: and they encamped there by the waters."
          reference="Exodus 15:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter that opened at a sea and turned bitter at Marah closes at Elim, twelve wells
            and seventy palm trees, water enough to actually rest by. The test did not end in
            punishment. It ended in a camp with more water than Israel could have hoped for three
            days earlier.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 15 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Is it right to celebrate soldiers drowning the way this song does?</strong> The
            song never credits Israel with the killing. Every violent verb belongs to God: He cast
            the chariots into the sea, He blew with His wind, His right hand dashed the enemy in
            pieces. Israel did not fight this battle; they stood still and watched it, exactly as
            Exodus 14 already described. The song also comes from a people this same Pharaoh had
            previously ordered to drown their own infant sons in this same Nile delta region. What
            it praises is not bloodlust. It is relief that the specific threat trying to destroy
            them no longer can.
          </p>
          <p>
            <strong>Why does Israel complain about water only three days after singing this
            song?</strong> The text does not soften the gap or explain it away. A song this
            confident and a complaint this fast sit back to back on purpose. Fear of an army and the
            physical misery of real thirst are different kinds of pressure, and Scripture seems
            willing to let the reader sit with how quickly one kind of trust can give way under a
            different kind of discomfort, rather than pretending the first miracle should have
            settled every future doubt.
          </p>
          <p>
            <strong>Does &quot;I am the LORD that healeth thee&quot; promise a believer will never
            get sick?</strong> Exodus 15:26 attaches this statement directly to an &quot;if,&quot;
            addressed to Israel about specific diseases tied to Egypt, in a specific wilderness
            setting. Many careful readers treat it as a revelation of God&apos;s character and a
            promise bound to that setting and that obedience, not a universal legal guarantee
            covering every illness in every believer&apos;s life regardless of circumstance. The
            name describes who God is more than it issues a blanket medical contract.
          </p>
          <p>
            <strong>Is the song of Moses really one of the oldest pieces of writing in the
            Bible?</strong> Many Old Testament scholars, including conservative ones, point to
            grammar and word forms in Exodus 15 that look older and more archaic than most
            surrounding prose, and take this as a sign the song was composed very close to the event
            itself. Other scholars read the same evidence more cautiously and leave the exact date
            open. Both sides treat the poem as genuinely ancient; they differ on how precisely that
            can be pinned down.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 15:2</h3>
        <VerseQuote
          text="The LORD is my strength and song, and he is become my salvation: he is my God, and I will prepare him an habitation; my father's God, and I will exalt him."
          reference="Exodus 15:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A whole nation singing in the first person singular, each voice claiming the same
          personal strength, salvation, and God, together.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 15:11</h3>
        <VerseQuote
          text="Who is like unto thee, O LORD, among the gods? who is like thee, glorious in holiness, fearful in praises, doing wonders?"
          reference="Exodus 15:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The question the whole song turns on, asked right after Egypt&apos;s gods have just
          failed to protect anything they were supposed to protect.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 15:18</h3>
        <VerseQuote text="The LORD shall reign for ever and ever." reference="Exodus 15:18" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Eight words, stated as plain fact in the middle of a victory song, long before a throne,
          a temple, or a king named David ever existed in Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 15:26</h3>
        <VerseQuote
          text="For I am the LORD that healeth thee."
          reference="Exodus 15:26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A name God attaches to Himself at a bitter spring, three days after the sea, tied to an
          &quot;if&quot; that is easy to skip past if you only remember the ending.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Revelation 15:3 and 4</h3>
        <VerseQuote
          text="And they sing the song of Moses the servant of God, and the song of the Lamb, saying, Great and marvellous are thy works, Lord God Almighty; just and true are thy ways, thou King of saints. Who shall not fear thee, O Lord, and glorify thy name? for thou only art holy: for all nations shall come and worship before thee; for thy judgments are made manifest."
          reference="Revelation 15:3 and 4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Thousands of years after Moses and Israel first sang on that shore, John sees it sung
          again, by name, alongside a second song that had not been written yet.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses and Israel sing a song praising God for destroying Pharaoh&apos;s army at the Red
          Sea, and Miriam leads the women in an answering refrain with timbrels and dancing. The
          chapter then turns sharply: three days later Israel finds no water, complains at the
          bitter spring of Marah, and God sweetens the water while giving them their first statute
          and ordinance. The chapter ends at Elim, a camp with twelve wells and seventy palm trees.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses and Israel sing a song after crossing the Red Sea?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 15:1 says Moses and the children of Israel sang together immediately after
          watching Pharaoh&apos;s army destroyed. The song names specific details of what God had
          just done rather than offering vague thanks, turning the whole camp&apos;s response into
          worship before they took another step toward Canaan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Miriam, and why does Scripture call her a prophetess?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 15:20 names Miriam as a prophetess and the sister of Aaron, leading the women in
          song and dance. This is her first appearance by name in Scripture, carrying a title
          Scripture gives to very few women, and her refrain echoes the opening line Moses had
          already sung.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the song of Moses the oldest poem in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Many scholars point to the archaic Hebrew forms in Exodus 15 as evidence it was composed
          very near the time of the event itself, which would make it one of the oldest poems in
          the Bible. Others read the same evidence more cautiously about an exact date. Both views
          agree it is genuinely ancient.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the LORD is my strength and song&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 15:2 opens the song with a deeply personal claim sung by an entire nation at once:
          that the LORD himself, not an army or a strategy, was the strength behind what just
          happened, and the reason they had anything to sing about.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was the water at Marah bitter, and how did Moses make it sweet?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 15:23 says the water at Marah was undrinkable and bitter, which is also what the
          name means. Verse 25 says God showed Moses a tree, and once it was cast into the water,
          the water became sweet. The text never names the tree or explains the process.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;I am the LORD that healeth thee&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 15:26 ties this statement to an &quot;if,&quot; promising Israel protection from
          specific diseases on the condition of obedience, in the specific setting of the
          wilderness journey. It reveals God&apos;s character as a healer rather than issuing an
          unconditional guarantee detached from that context.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel complain about water only three days after singing praise?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 15:22 to 24 places the complaint only three days after the song at the sea, with
          no explanation bridging the two moods. Real thirst in a dry wilderness proved to be a
          different kind of pressure than the fear of an approaching army, and it surfaced doubt
          almost as fast as deliverance had produced praise.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What are the twelve wells and seventy palm trees at Elim?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 15:27 describes Elim as a camp with twelve wells of water and seventy palm trees,
          where Israel finally rested beside abundant water after the bitterness at Marah. The text
          gives the exact count without assigning it any further meaning.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 15 connect to Jesus and Revelation?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Revelation 15:3 and 4 describes the redeemed in heaven singing &quot;the song of Moses the
          servant of God, and the song of the Lamb&quot; together, naming this exact song by its
          original singer and placing it alongside the praise of Christ at the end of Scripture.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 15 is really two chapters wearing one number: a song, and the three days right after it.</p>
          <p>
            📌 <strong>Real worship names specifics.</strong> Moses and Israel did not sing a vague
            thank you. They sang about chariots, captains, a stretched out right hand, and a
            question no god of Egypt could answer.
          </p>
          <p>
            📌 <strong>A mountaintop moment does not come with immunity.</strong> The same people who
            sang &quot;the LORD is my strength&quot; were asking what they would drink three days
            later. The sea did not make Israel permanently unshakable, and your own best moments
            with God will not make you permanently unshakable either.
          </p>
          <p>
            📌 <strong>God tests before He legislates.</strong> The statute and ordinance at Marah
            came before Sinai, proof that trust gets trained in small, uncomfortable moments long
            before it is ever asked to carry something larger.
          </p>
          <p>So here is one thing to actually do with this chapter.</p>
          <p>
            Before your own next Marah shows up, say out loud, in exact detail, what God has
            already done. This song did not wait to see if the wilderness would behave first.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
