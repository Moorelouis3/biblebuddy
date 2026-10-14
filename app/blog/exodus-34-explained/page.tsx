import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-34-explained", {
  title: "Exodus 34 Explained: God Proclaims His Name and Moses' Shining Face",
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

export default function ExodusThirtyFourExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-34-explained"
      title={<>📖 Exodus 34 Explained: God Proclaims His Name and Moses&apos; Shining Face</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Moses asked to see God&apos;s glory. This chapter is where he finally gets an answer.</p>
            <p>
              <strong>Exodus 34 explained</strong> is the chapter where Moses climbs the mountain a third
              time, carrying two blank stones he had to cut himself, and comes down with something no one
              had ever seen before: a face that glowed from being near God, and a covenant written fresh
              on tables that replaced the ones his own anger had broken.
            </p>
            <p>Maybe you remember the golden calf story but never read what happened right after it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ What did God actually say when He passed in front of Moses?</li>
            <li>❓ Why does God call Himself jealous in the same breath as merciful?</li>
            <li>❓ Why did Moses have to cut new stone tables himself this time?</li>
            <li>❓ What was the veil on Moses&apos; face actually covering?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 34 is the chapter where God answers &quot;show me thy glory&quot; with words,
              not just light. He speaks His own name out loud, and that name becomes the most quoted
              description of His character in the rest of the Bible.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the new tables Moses had to carve
              himself, the proclamation of God&apos;s name on the mountain, Moses bowing and asking again, the
              covenant renewed with a hard warning about compromise, the feasts repeated one more time, and
              the glow on Moses&apos; face that would not fade and had to be covered.
            </p>
            <p>Read slowly. The words God speaks here are quoted more than almost any other verse in the Old Testament.</p>
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
            <ArticleLink href="/blog/exodus-33-explained">Exodus 33</ArticleLink> ended with a request
            that could not be granted exactly as asked. Moses had refused to move another step without
            God&apos;s own presence, and once that was settled, he pushed further still: &quot;I beseech
            thee, shew me thy glory.&quot; God answered that no living person could survive seeing His
            unveiled face, but promised something real anyway. He would hide Moses in a cleft of the rock,
            cover him with His own hand, and let Moses see His back as His glory passed by.
          </p>
          <p>
            That promise was still unfulfilled when Exodus 33 closed. The chapter ended on the mountain,
            with the sight still ahead of Moses. Exodus 34 opens by finally showing what Moses actually
            saw, and it starts with a problem left over from{" "}
            <ArticleLink href="/blog/exodus-32-explained">Exodus 32</ArticleLink>: there were no tables left
            to write on. Moses had broken the first set, written by God&apos;s own finger, when he came down
            the mountain and found the golden calf.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 34 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. New Tables for a Broken Covenant (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God tells Moses to replace what he destroyed, and this time the work is not entirely God&apos;s own.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Hew thee two tables of stone like unto the first: and I will write upon these tables the words that were in the first tables, which thou brakest."
          reference="Exodus 34:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the division of labor.</strong> Moses has to hew the stone himself this time.
            God will still do the writing, but the raw material is Moses&apos; own effort, cut by his own
            hands, the same hands that threw the first tables to the ground in anger.
          </p>
          <p>
            The instructions that follow are strict about who gets to witness this. No one else climbs the
            mountain this time, not even Joshua, who had waited at the tent of meeting back in Exodus 33.
            Not even the flocks are allowed to graze near its base.
          </p>
        </div>
        <VerseQuote
          text="And he hewed two tables of stone like unto the first; and Moses rose up early in the morning, and went up unto mount Sinai, as the LORD had commanded him, and took in his hand the two tables of stone."
          reference="Exodus 34:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Moses does not delay this time. He rises early and climbs with the stones already in his
            hand, carrying up the mountain the very thing he had smashed at the bottom of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The LORD Proclaims His Own Name (verses 5 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is the answer to the request Moses made at the end of the last chapter.</p>
        </div>
        <VerseQuote
          text="And the LORD descended in the cloud, and stood with him there, and proclaimed the name of the LORD."
          reference="Exodus 34:5"
        />
        <VerseQuote
          text="And the LORD passed by before him, and proclaimed, The LORD, The LORD God, merciful and gracious, longsuffering, and abundant in goodness and truth, Keeping mercy for thousands, forgiving iniquity and transgression and sin, and that will by no means clear the guilty; visiting the iniquity of the fathers upon the children, and upon the children's children, unto the third and to the fourth generation."
          reference="Exodus 34:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses asked to see glory. What he receives is a description of character.</strong> No
            physical detail is recorded here at all, no shape, no color, no light. What passes by Moses on
            that mountain is a list of who God is, spoken out loud in His own words.
          </p>
          <p>
            These two verses get quoted or echoed more than almost any other single passage in the Old
            Testament. Numbers 14:18 repeats the same formula almost word for word, and later writers lean
            on it again and again.
          </p>
        </div>
        <VerseQuote
          text="The LORD is longsuffering, and of great mercy, forgiving iniquity and transgression, and by no means clearing the guilty, visiting the iniquity of the fathers upon the children unto the third and fourth generation."
          reference="Numbers 14:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Mercy and justice sit in the same breath, and neither one cancels the other.</strong>{" "}
            &quot;Merciful and gracious&quot; and &quot;will by no means clear the guilty&quot; are not two
            competing gods. They are the same God, described fully, refusing to be reduced to only His
            kindness or only His holiness.
          </p>
          <p>
            💡 &quot;Keeping mercy for thousands&quot; likely means mercy extended to a thousand
            generations, not merely a thousand people. Set beside the warning about the third and fourth
            generation in the very next clause, the weight leans heavily toward mercy. Consequence reaches a
            few generations forward. Mercy reaches thousands.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Moses Worships and Asks Again (verses 8 and 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses does not respond to this proclamation with a question. He responds with his face on the ground.</p>
        </div>
        <VerseQuote
          text="And Moses made haste, and bowed his head toward the earth, and worshipped."
          reference="Exodus 34:8"
        />
        <VerseQuote
          text="And he said, If now I have found grace in thy sight, O LORD, let my LORD, I pray thee, go among us; for it is a stiffnecked people; and pardon our iniquity and our sin, and take us for thine inheritance."
          reference="Exodus 34:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses just heard God name Israel&apos;s sin in advance, then asks God to forgive the
            exact thing He just named.</strong> He does not argue that Israel deserves better. He calls them
            &quot;a stiffnecked people&quot; himself, the same word God used for them back in{" "}
            <ArticleLink href="/blog/exodus-32-explained">Exodus 32</ArticleLink>, and asks for mercy anyway,
            on the strength of the character God had just proclaimed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Covenant Renewed, With a Hard Warning About Compromise (verses 10 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God answers by renewing the covenant, and then spends more verses warning Israel about one danger than any other.</p>
        </div>
        <VerseQuote
          text="And he said, Behold, I make a covenant: before all thy people I will do marvels, such as have not been done in all the earth, nor in any nation: and all the people among which thou art shall see the work of the LORD: for it is a terrible thing that I will do with thee."
          reference="Exodus 34:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The promise of the land and the nations driven out ahead of them comes next, almost word for
            word what God had already said at the start of{" "}
            <ArticleLink href="/blog/exodus-33-explained">Exodus 33</ArticleLink>. What is new is the length
            of the warning that follows it.
          </p>
        </div>
        <VerseQuote
          text="Take heed to thyself, lest thou make a covenant with the inhabitants of the land whither thou goest, lest it be for a snare in the midst of thee: But ye shall destroy their altars, break their images, and cut down their groves: For thou shalt worship no other god: for the LORD, whose name is Jealous, is a jealous God:"
          reference="Exodus 34:12 to 14"
        />
        <VerseQuote
          text="And thou take of their daughters unto thy sons, and their daughters go a whoring after their gods, and make thy sons go a whoring after their gods. Thou shalt make thee no molten gods."
          reference="Exodus 34:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The specific danger named is not war. It is intermarriage leading to shared
            worship.</strong> The concern is never about ancestry for its own sake. It is that a daughter
            raised to worship another god does not stop worshipping that god just because she marries into
            Israel, and a household split between two altars eventually settles on one. The last line,
            &quot;thou shalt make thee no molten gods,&quot; lands exactly where it has to, one chapter after
            a molten calf nearly ended everything.
          </p>
          <p>
            📌 <strong>&quot;Jealous&quot; here is not pettiness.</strong> It describes the exclusive claim a
            husband has on a wife, the same word used elsewhere for a marriage covenant. God speaking of
            Himself as jealous for Israel is the language of a relationship, not a rival keeping score.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Appointed Times, Repeated One More Time (verses 18 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With the covenant renewed, God runs back through the calendar of feasts and offerings, most of
            it already given earlier in Exodus.
          </p>
        </div>
        <VerseQuote
          text="The feast of unleavened bread shalt thou keep. Seven days thou shalt eat unleavened bread, as I commanded thee, in the time of the month Abib: for in the month Abib thou camest out from Egypt."
          reference="Exodus 34:18"
        />
        <VerseQuote
          text="Six days thou shalt work, but on the seventh day thou shalt rest: in earing time and in harvest thou shalt rest."
          reference="Exodus 34:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Earing time&quot; is an old word for plowing, not for listening. Even at the two busiest
            points on a farmer&apos;s calendar, planting and harvest, the sabbath still holds. The same rest
            already commanded with the manna, at Sinai, and right before the tabernacle work in{" "}
            <ArticleLink href="/blog/exodus-31-explained">Exodus 31</ArticleLink> gets repeated here with no
            exception carved out for the two seasons a farmer could least afford to stop.
          </p>
        </div>
        <VerseQuote
          text="Thrice in the year shall all your menchildren appear before the LORD God, the God of Israel."
          reference="Exodus 34:23"
        />
        <VerseQuote
          text="Thou shalt not offer the blood of my sacrifice with leaven; neither shall the sacrifice of the feast of the passover be left unto the morning. The first of the firstfruits of thy land thou shalt bring unto the house of the LORD thy God. Thou shalt not seethe a kid in his mother's milk."
          reference="Exodus 34:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>None of this is new information.</strong> Every law in this section had already been
            given earlier in Exodus. Repeating it here, right after the covenant breaks and gets renewed,
            says plainly that the relationship God is restoring is the same one, with the same terms, not a
            second, lesser arrangement.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Forty Days Again, and the Words Written Down (verses 27 and 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Two short verses close out the mountain scene, and this time Moses himself does some of the writing.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Write thou these words: for after the tenor of these words I have made a covenant with thee and with Israel."
          reference="Exodus 34:27"
        />
        <VerseQuote
          text="And he was there with the LORD forty days and forty nights; he did neither eat bread, nor drink water. And he wrote upon the tables the words of the covenant, the ten commandments."
          reference="Exodus 34:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 27 has Moses writing &quot;these words,&quot; the covenant terms God had just spoken.
            Verse 1 had already promised that God Himself would write &quot;the words that were in the first
            tables&quot; onto the new stone. The chapter holds both: God restoring the ten commandments onto
            the tables exactly as before, and Moses recording the covenant renewal God spoke alongside them.
            Forty days and nights without food or water is the same length of time Moses spent on the
            mountain before, now repeated for a covenant that had to be rebuilt.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Shining Face and the Veil (verses 29 to 35)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses comes down the mountain carrying more than stone this time, and he does not know it yet.</p>
        </div>
        <VerseQuote
          text="And it came to pass, when Moses came down from mount Sinai with the two tables of testimony in Moses' hand, when he came down from the mount, that Moses wist not that the skin of his face shone while he talked with him."
          reference="Exodus 34:29"
        />
        <VerseQuote
          text="And when Aaron and all the children of Israel saw Moses, behold, the skin of his face shone; and they were afraid to come nigh him."
          reference="Exodus 34:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses has no idea his own face is glowing.</strong> The nearness he just had with God
            left a visible mark on him that he could not see on himself and could not turn off. Everyone
            else sees it before he does.
          </p>
          <p>He calls the people closer, and once the message is delivered, a new habit begins.</p>
        </div>
        <VerseQuote
          text="And till Moses had done speaking with them, he put a vail on his face."
          reference="Exodus 34:33"
        />
        <VerseQuote
          text="But when Moses went in before the LORD to speak with him, he took the vail off, until he came out. And he came out, and spake unto the children of Israel that which he was commanded."
          reference="Exodus 34:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read the order carefully.</strong> Moses goes in before the LORD unveiled, comes out
            and speaks to the people unveiled, and only then covers his face until the next time he goes
            back in. The veil was not there to hide the glow from God. It went on after the message was
            delivered, not before it.
          </p>
          <p>
            💡 Paul reads this scene centuries later and draws out what the glow itself did not say outright:
            it was fading.
          </p>
        </div>
        <VerseQuote
          text="And not as Moses, which put a vail over his face, that the children of Israel could not stedfastly look to the end of that which is abolished: But their minds were blinded: for until this day remaineth the same vail untaken away in the reading of the old testament; which vail is done away in Christ."
          reference="2 Corinthians 3:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Paul&apos;s reading is that the veil hid a glory that was already fading between visits to the
            mountain, which is also why Moses had to keep going back in. Exodus 34 itself never states that
            the glow faded. It only records the pattern repeating: in unveiled, out to speak, then veiled
            again until the next time.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 34 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does &quot;visiting the iniquity of the fathers upon the children&quot; mean children
            are punished for their parents&apos; sin?</strong> The text states it plainly in Exodus 34:7, and
            the same formula repeats in Numbers 14:18 and in the Ten Commandments themselves back in{" "}
            <ArticleLink href="/blog/exodus-20-explained">Exodus 20</ArticleLink>. A later chapter of
            Scripture states the opposite principle just as plainly.
          </p>
        </div>
        <VerseQuote
          text="The soul that sinneth, it shall die. The son shall not bear the iniquity of the father, neither shall the father bear the iniquity of the son: the righteousness of the righteous shall be upon him, and the wickedness of the wicked shall be upon him."
          reference="Ezekiel 18:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Both statements stand in Scripture without either one erasing the other. The most natural way to
            hold them together is to separate guilt before God, which Ezekiel insists is always personal and
            never inherited, from the real, visible consequences a family or a nation keeps living with for
            generations after a sin, which Exodus 34 and Numbers 14 both describe. A parent&apos;s idolatry
            does not count as a child&apos;s own sin before God. It can still shape the home, the habits, and
            the choices that child grows up inside.
          </p>
          <p>
            <strong>Why does God call Himself jealous right after describing Himself as merciful and
            gracious?</strong> Exodus 34:14 names it directly: &quot;the LORD, whose name is Jealous, is a
            jealous God.&quot; In Scripture&apos;s own vocabulary, jealousy describes the exclusive claim of
            a covenant relationship, the same word used for a husband&apos;s claim on his wife, not
            insecurity or rivalry. A God who has just bound Himself to Israel by covenant has every right to
            object when that covenant gets shared with another god.
          </p>
          <p>
            <strong>Why does the warning against intermarriage focus so heavily on the Canaanite
            nations?</strong> Exodus 34:15 and 16 name the specific danger: daughters raised to worship other
            gods who would not stop worshipping them after marrying into Israel. The text&apos;s own stated
            concern is religious compromise, a household split between two altars, not ancestry for its own
            sake. The same chapter commands destroying altars and images, never destroying people for who
            their parents were.
          </p>
          <p>
            <strong>Why did Moses have to cut the new stone tables himself, when the first ones were
            entirely God&apos;s work?</strong> Exodus 34:1 and 4 record the instruction and Moses&apos;
            obedience without explaining the reason. The text does not say. What it does make unmistakable is
            that Moses&apos; own effort and God&apos;s own writing both belong in the same renewed covenant,
            neither one replacing the other.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 34
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 34:6 and 7</h3>
        <VerseQuote
          text="The LORD, The LORD God, merciful and gracious, longsuffering, and abundant in goodness and truth, Keeping mercy for thousands, forgiving iniquity and transgression and sin, and that will by no means clear the guilty; visiting the iniquity of the fathers upon the children, and upon the children's children, unto the third and to the fourth generation."
          reference="Exodus 34:6 and 7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God&apos;s own description of His character, spoken out loud on the mountain. The most repeated
          formula for who God is anywhere in the Old Testament, echoed in Numbers, the Psalms, and the
          prophets.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 34:9</h3>
        <VerseQuote
          text="And he said, If now I have found grace in thy sight, O LORD, let my LORD, I pray thee, go among us; for it is a stiffnecked people; and pardon our iniquity and our sin, and take us for thine inheritance."
          reference="Exodus 34:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Moses names Israel&apos;s exact failure in the same breath he asks for mercy, without softening
          the charge or hiding behind an excuse.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 34:14</h3>
        <VerseQuote
          text="For thou shalt worship no other god: for the LORD, whose name is Jealous, is a jealous God:"
          reference="Exodus 34:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A jealousy rooted in covenant, the same exclusive claim a marriage carries, given right after
          Israel had already broken that claim once with a golden calf.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 34:28</h3>
        <VerseQuote
          text="And he was there with the LORD forty days and forty nights; he did neither eat bread, nor drink water. And he wrote upon the tables the words of the covenant, the ten commandments."
          reference="Exodus 34:28"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A second forty days on the mountain, for a covenant that had to be rebuilt after it was broken
          once already.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 34:29 and 30</h3>
        <VerseQuote
          text="And it came to pass, when Moses came down from mount Sinai with the two tables of testimony in Moses' hand, when he came down from the mount, that Moses wist not that the skin of his face shone while he talked with him. And when Aaron and all the children of Israel saw Moses, behold, the skin of his face shone; and they were afraid to come nigh him."
          reference="Exodus 34:29 and 30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Nearness to God left a visible mark Moses could not see on his own face. Everyone else noticed it
          before he did.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 34
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 34 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 34 records Moses cutting new stone tables after breaking the first ones, God proclaiming
          His own name and character on the mountain, Moses interceding for Israel again, the covenant
          renewed with a warning against compromise with the Canaanite nations, the feasts repeated, and
          Moses coming down with a face that shone from being with God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did God say when He proclaimed His name to Moses?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 34:6 and 7 record God describing Himself as merciful, gracious, longsuffering, abundant in
          goodness and truth, forgiving of sin, and yet never clearing the guilty without consequence. It is
          the fullest self description of God&apos;s character anywhere in the Old Testament.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses have to make new stone tables?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses had broken the first tables, written entirely by God, when he came down the mountain and
          found Israel worshipping the golden calf in Exodus 32. Exodus 34:1 records God instructing Moses to
          hew two new tables himself so the covenant words could be written on them again.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does God punish children for their parents&apos; sins?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 34:7 says God visits the iniquity of the fathers on the children to the third and fourth
          generation, describing real consequences that outlast a sin. Ezekiel 18:20 states just as plainly
          that personal guilt before God is never inherited. The two together describe lasting consequence
          without inherited guilt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God is a jealous God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In Exodus 34:14, jealousy describes the exclusive claim of a covenant relationship, the same word
          used elsewhere for a husband&apos;s claim on his wife. It is not insecurity. It is the right a
          covenant partner has to object when that covenant is shared with another god.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God warn Israel so strongly against marrying the Canaanites?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 34:15 and 16 name the specific danger as daughters raised to worship other gods who would
          not stop after marrying into Israel. The stated concern is a household split between two forms of
          worship, not ancestry, and the same passage commands destroying religious objects, not people.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses&apos; face shine after being on the mountain?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 34:29 and 30 record that the skin of Moses&apos; face shone from being with the LORD, and
          that he did not know it himself until Aaron and the people were afraid to come near him. The text
          never explains the mechanism, only that real closeness with God left a visible, physical mark.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses wear a veil?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 34:33 to 35 describe Moses removing the veil to speak with God, keeping it off while he
          delivered God&apos;s words to the people, and putting it on only afterward until his next time
          before the LORD. 2 Corinthians 3:13 adds that the glory itself was fading, which the veil covered
          up between those visits.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 34 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          2 Corinthians 3:13 to 18 reads Moses&apos; fading glory and veiled face as a picture of the old
          covenant itself, contrasted with a glory in Christ that does not need to be hidden or renewed every
          few days. Where Moses&apos; glow faded and had to be covered, Paul says believers now behold the
          Lord&apos;s glory with an open face.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 34 answers a request made in the last chapter, and the answer is bigger than a sight.</p>
          <p>
            📌 <strong>God revealed His glory as a character, not a spectacle.</strong> Moses asked to see
            something. What passed by him was a description of who God actually is, mercy and justice both
            spoken in full, neither one hiding the other.
          </p>
          <p>
            📌 <strong>Renewal after failure still looked like the same covenant.</strong> The feasts, the
            sabbath, the warnings against idolatry, all of it repeated here word for word from earlier
            chapters. God did not lower the terms for a people who had just broken them.
          </p>
          <p>
            📌 <strong>Time with God leaves a mark you may not see on yourself.</strong> Moses had no idea
            his own face was shining. The people saw it before he did.
          </p>
          <p>
            You will not come down a mountain with a glowing face. But the same pattern holds: real time
            spent close to God tends to show up in you before you notice it yourself.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Exodus 34:6 and 7 slowly today, out loud if you can, and let it be your own definition of
            who God is the next time you are tempted to shrink Him down to only one of His attributes.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
