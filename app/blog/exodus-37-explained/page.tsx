import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-37-explained", {
  title: "Exodus 37 Explained: Bezaleel Builds the Ark and the Lampstand",
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

export default function ExodusThirtySevenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-37-explained"
      title={<>📖 Exodus 37 Explained: Bezaleel Builds the Ark and the Lampstand</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The last chapter had a whole camp giving more gold than a project could use. This chapter has one man, alone at his bench, turning it into the holiest objects Israel will ever own.</p>
            <p>
              <strong>Exodus 37 explained</strong> is the chapter where Bezaleel steps out of the crowd of
              craftsmen that built the tent and takes personal charge of what goes inside it: the ark, the
              mercy seat, the table for the bread, the gold lampstand, and the altar of incense. Fourteen times
              in twenty nine verses, the text says simply, &quot;he made.&quot;
            </p>
            <p>Maybe you picture the ark as a plot device from an adventure movie and have never actually read what it was built from.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does only Bezaleel get named here, when Aholiab was named right beside him last chapter?</li>
            <li>❓ Why are two cherubim hammered out of the very same piece of gold as the mercy seat itself?</li>
            <li>❓ Why is the lampstand cast as one solid piece, with no joints anywhere in it?</li>
            <li>❓ What does &quot;apothecary&quot; mean in a verse about incense, not medicine?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 37 is the chapter where a command God gave Moses alone on the mountain, back
              in Exodus 25, 30, and 31, finally becomes gold in a craftsman&apos;s hands, item for item, in the
              exact order God first listed them.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the ark built to the cubit, the mercy
              seat and its facing cherubim, the table and its gold dishes, the one piece lampstand with its
              almond shaped cups, and the incense altar with the oil and incense recipe nobody else was
              allowed to copy.
            </p>
            <p>Read slowly. This chapter is quiet work, but every measurement in it was already a promise kept.</p>
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
            <ArticleLink href="/blog/exodus-36-explained">Exodus 36</ArticleLink> ended with the tent itself
            finished: ten inner curtains, a goats&apos; hair covering, leather weatherproofing, gold covered
            boards standing on silver, and a veil and a door hanging closing off the two ends. The whole frame
            that would hold everything else now stood complete, exactly as God had described it to Moses in{" "}
            <ArticleLink href="/blog/exodus-26-explained">Exodus 26</ArticleLink>, long before any of the camp
            heard a word of the plan.
          </p>
          <p>
            A tent, though, is only a shell. God&apos;s instructions back in{" "}
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink> had never stopped at walls and
            curtains. He had named the furniture that would sit inside that shell: an ark to hold the
            testimony, a table to hold bread in His presence, a lampstand to give light, and an altar where
            incense would rise every morning and evening. Exodus 37 is Moses&apos; account of that furniture
            finally taking shape, and for the first time since the work began, the text narrows its attention
            down to one craftsman by name.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 37 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. One Man Alone Builds the Ark (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Exodus 36 kept crediting &quot;every wise hearted man&quot; before narrowing to a bare &quot;he.&quot;
            This chapter opens differently. It names its builder in the very first word.
          </p>
        </div>
        <VerseQuote
          text="And Bezaleel made the ark of shittim wood: two cubits and a half was the length of it, and a cubit and a half the breadth of it, and a cubit and a half the height of it:"
          reference="Exodus 37:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Compare that to the command God gave Moses alone on the mountain, years before this moment, at the
            start of <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink>:
          </p>
        </div>
        <VerseQuote
          text="And they shall make an ark of shittim wood: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof, and a cubit and a half the height thereof. And thou shalt overlay it with pure gold, within and without shalt thou overlay it, and shalt make upon it a crown of gold round about."
          reference="Exodus 25:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The measurements match to the half cubit.</strong> A cubit was roughly the length of a
            forearm, so this box came out to something close to four feet long and just over two feet wide and
            high, small enough for a few men to carry on poles, never meant to be a throne room sized object.
            <strong> Shittim wood</strong> is acacia, the same hard desert timber used for every piece of
            furniture in the tabernacle. Bezaleel overlays it inside and out with pure gold, casts four gold
            rings for the corners, and fits gold covered acacia staves through them so the ark could be carried
            without a single hand ever touching the wood or gold directly.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Mercy Seat and Two Golden Cherubim (verses 6 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The ark needed a lid, and the lid is where the chapter&apos;s most striking craftsmanship happens.
          </p>
        </div>
        <VerseQuote
          text="And the cherubims spread out their wings on high, and covered with their wings over the mercy seat, with their faces one to another; even to the mercy seatward were the faces of the cherubims."
          reference="Exodus 37:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Mercy seat</strong> translates a Hebrew word built on the same root behind the word
            atonement, the idea of covering over sin rather than leaving it exposed. The two cherubim were not
            separate pieces soldered onto the lid afterward. Verse 7 says they were &quot;beaten out of one
            piece&quot; with the mercy seat itself, meaning one craftsman hammered a single slab of gold until
            a lid and two facing angels emerged from it with no seam between them.
          </p>
          <p>
            💡 Notice where their faces point. Not outward toward the room, not up toward heaven, but down and
            toward each other, with their wings meeting over the exact spot where God told Moses He would
            speak with him. The New Testament later gives this same object a name that leans on exactly this
            detail.
          </p>
        </div>
        <VerseQuote
          text="Which had the golden censer, and the ark of the covenant overlaid round about with gold, wherein was the golden pot that had manna, and Aaron's rod that budded, and the tables of the covenant; And over it the cherubims of glory shadowing the mercyseat; of which we cannot now speak particularly."
          reference="Hebrews 9:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Cherubims of glory&quot; is not decoration language.</strong> Hebrews treats the
            mercy seat as the single most significant object a priest could approach, the spot where the whole
            sacrificial system pointed, and even Hebrews admits it cannot cover everything that object meant in
            one sentence.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Table for the Bread Before the Lord (verses 10 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A smaller piece of furniture follows, built with the same care but a far plainer job to do.
          </p>
        </div>
        <VerseQuote
          text="And he made the vessels which were upon the table, his dishes, and his spoons, and his bowls, and his covers to cover withal, of pure gold."
          reference="Exodus 37:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Exodus 37 never actually says what went on this table. It does not need to. Exodus 25 already
            settled that question long before this chapter begins.
          </p>
        </div>
        <VerseQuote text="And thou shalt set upon the table shewbread before me alway." reference="Exodus 25:30" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Shewbread</strong>, bread kept continually in God&apos;s presence, is the whole reason this
            table exists, and Bezaleel builds its gold dishes and bowls without the text needing to repeat the
            purpose a second time. The table itself stood two cubits long, about a cubit wide, with a gold
            border and a decorative crown running round the edge, and staves through gold rings so it could
            travel the same way the ark did.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. One Piece of Pure Gold: The Lampstand (verses 17 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter slows down for its longest single description, and the method matters as much as the
            shape.
          </p>
        </div>
        <VerseQuote
          text="And he made the candlestick of pure gold: of beaten work made he the candlestick; his shaft, and his branch, his bowls, his knops, and his flowers, were of the same:"
          reference="Exodus 37:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Beaten work&quot; means hammered from a single ingot, not cast in a mold and not
            assembled from separate parts.</strong> The central shaft, the six branches, and every almond
            shaped bowl, bud, and flower on it came out of one piece of gold under Bezaleel&apos;s hammer. There
            was no joint anywhere in the entire lampstand that could ever work loose.
          </p>
          <p>
            A talent of pure gold went into it, which by the common reckoning used in most study Bibles comes
            to somewhere around seventy five pounds, hammered into seven lamps, snuffers, and trays, all still
            of one piece. This same lampstand shape, standing for light in God&apos;s presence, is the image
            John later reaches for in Revelation.
          </p>
        </div>
        <VerseQuote
          text="And I turned to see the voice that spake with me. And being turned, I saw seven golden candlesticks; And in the midst of the seven candlesticks one like unto the Son of man, clothed with a garment down to the foot, and girt about the paps with a golden girdle."
          reference="Revelation 1:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 John sees seven lampstands rather than Bezaleel&apos;s one, but the picture carries forward: light
            standing in the middle of God&apos;s own presence, with Christ Himself standing in the middle of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Altar of Incense and the Oil No One Else Could Copy (verses 25 to 29)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with a small altar and a single verse about what would be burned on it.</p>
        </div>
        <VerseQuote
          text="And he made the holy anointing oil, and the pure incense of sweet spices, according to the work of the apothecary."
          reference="Exodus 37:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Apothecary</strong> here does not mean a pharmacist. In this older use of the word it means
            a compounder of spices and perfumes, someone whose trade was mixing scent, not medicine. The recipe
            itself had already been given to Moses privately in{" "}
            <ArticleLink href="/blog/exodus-30-explained">Exodus 30</ArticleLink>, along with a warning attached
            to no other object in the tabernacle.
          </p>
        </div>
        <VerseQuote
          text="Upon man's flesh shall it not be poured, neither shall ye make any other like it, after the composition of it: it is holy, and it shall be holy unto you."
          reference="Exodus 30:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This was not a perfume anyone else could wear or sell.</strong> The exact formula was
            reserved for this one altar alone, and copying it for ordinary use carried a direct penalty under
            the law. Nothing about the altar itself, four cubits square, overlaid in gold, with gold rings and
            staves like every other piece, was unusual. What made it holy was entirely what was burned on it,
            and who was allowed to make that.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 37 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does only Bezaleel get named building the ark, the table, and the lampstand, when
            Aholiab stood right beside him in Exodus 35 and 36?</strong> Exodus 37 never explains the gap
            directly, but the gifts each man was actually given line up with what each chapter shows them
            doing. God&apos;s original description of Bezaleel named exactly this kind of work.
          </p>
        </div>
        <VerseQuote
          text="And I have filled him with the spirit of God, in wisdom, and in understanding, and in knowledge, and in all manner of workmanship, To devise cunning works, to work in gold, and in silver, and in brass, And in cutting of stones, to set them, and in carving of timber, to work in all manner of workmanship."
          reference="Exodus 31:3 to 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Aholiab&apos;s own named skills, given later in{" "}
            <ArticleLink href="/blog/exodus-35-explained">Exodus 35</ArticleLink>, run in a different direction
            entirely: engraving, embroidery, and weaving in blue, purple, and scarlet thread. That is curtain
            and veil work, not hammered gold furniture. The text does not spell out a division of labor, but
            the skills each man is credited with elsewhere fit exactly what each chapter actually shows him
            doing.
          </p>
          <p>
            <strong>Does the Bible say what eventually happened to the ark of the covenant?</strong> No.
            Scripture&apos;s last clear references to it come from the final years before Judah went into
            exile, and the text simply never picks the story back up after that. Any claim about where the ark
            is today, hidden, destroyed, or kept somewhere specific, goes beyond anything the Bible itself
            states.
          </p>
          <p>
            <strong>Why does Exodus 37 never say what the ark, the table, or the lampstand were actually for?</strong>{" "}
            Because Exodus 25 already said it, in full, long before this chapter. The ark would hold the
            testimony and host God&apos;s presence over the mercy seat. The table would carry the shewbread. The
            lampstand would give light. This chapter is a construction report confirming the plan was carried
            out, not a second explanation of what the plan meant.
          </p>
          <p>
            <strong>Why does the text bother distinguishing cast rings from a lampstand beaten out of one
            piece?</strong> Casting poured molten gold into a mold, fast and reliable for small symmetrical
            parts like rings. Beating a whole lampstand, shaft, branches, bowls, and flowers, out of a single
            ingot with a hammer took far longer and left no seam anywhere in the finished piece. The text does
            not explain its own choice of method, but a lampstand with no joint to ever loosen reads as a
            deliberate kind of permanence, not a shortcut.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 37
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 37:1</h3>
        <VerseQuote
          text="And Bezaleel made the ark of shittim wood: two cubits and a half was the length of it, and a cubit and a half the breadth of it, and a cubit and a half the height of it:"
          reference="Exodus 37:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A command given to Moses alone, years earlier, finally measured out in real wood and gold by one
          named craftsman.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 37:9</h3>
        <VerseQuote
          text="And the cherubims spread out their wings on high, and covered with their wings over the mercy seat, with their faces one to another; even to the mercy seatward were the faces of the cherubims."
          reference="Exodus 37:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Two golden faces turned toward each other and down, framing the exact spot where God promised to
          meet with Moses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 37:17</h3>
        <VerseQuote
          text="And he made the candlestick of pure gold: of beaten work made he the candlestick; his shaft, and his branch, his bowls, his knops, and his flowers, were of the same:"
          reference="Exodus 37:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A lampstand with every branch and flower hammered from one piece of gold, with no joint anywhere in
          it to ever work loose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 37:29</h3>
        <VerseQuote
          text="And he made the holy anointing oil, and the pure incense of sweet spices, according to the work of the apothecary."
          reference="Exodus 37:29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A recipe no one outside this altar was ever legally allowed to recreate, closing a chapter built
          almost entirely on gold with something that could not be bought or copied.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 37
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 37 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 37 records Bezaleel building the tabernacle&apos;s holiest furniture: the ark of the covenant,
          the gold mercy seat with its two cherubim, the table for the shewbread, the one piece gold lampstand,
          and the altar of incense, each one matching measurements and materials God had already given Moses
          in earlier chapters.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the ark of the covenant made of?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 37:1 and 2 say the ark was built of shittim wood, acacia, overlaid inside and out with pure
          gold, with a gold crown around the top edge and gold rings and staves for carrying it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does mercy seat mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Mercy seat translates a Hebrew word built on the same root as the word for atonement, the idea of
          covering sin rather than leaving it exposed. It was the gold lid of the ark, with two cherubim
          hammered out of the same piece of gold, named in Exodus 37:6 to 9 as the exact place God said He
          would meet with Moses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did only Bezaleel build the ark, the table, and the lampstand?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 37 does not explain the shift away from Aholiab directly, but Exodus 31:3 to 5 describes
          Bezaleel&apos;s own gifting as metalwork, stonework, and woodcarving, exactly what the gold furniture
          in this chapter required. Aholiab&apos;s named skills in Exodus 35:35, engraving and embroidery, fit
          the tent&apos;s curtains and the priestly garments far more than hammered gold vessels.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is shittim wood in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Shittim wood is acacia, a hard wood native to the desert regions Israel traveled through. Exodus 37
          uses it as the base for every major piece of furniture, the ark, the table, the staves, and the
          altar frames, each one then overlaid in gold or brass.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How much gold is a talent in Exodus 37?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 37:24 says the lampstand alone used a talent of pure gold. By the common reckoning used in
          most study Bibles, a talent weighed somewhere around seventy five pounds, all of it hammered into one
          seamless lampstand rather than cast or assembled from parts.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does apothecary mean in Exodus 37:29?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In this older sense, an apothecary was a compounder of spices and perfumes, not a pharmacist. Exodus
          37:29 credits the holy anointing oil and incense to this kind of skilled trade, following the exact
          recipe God gave privately to Moses in Exodus 30.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the lampstand have six branches and seven lamps?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 37:17 and 18 describe a central shaft with six branches, three on each side, which with the
          shaft itself held seven lamps total. The text records the shape in careful detail without stating a
          symbolic reason for the number seven.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where is the ark of the covenant today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Bible does not say. Its last clear mentions come from the years before Judah&apos;s exile, and
          Scripture never records what became of it after that. Any specific claim about its current location
          goes beyond what the biblical text itself states.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 37 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 9:5 calls the cherubim over the mercy seat &quot;cherubims of glory,&quot; treating that
          object as the center of the whole sacrificial system Christ&apos;s own sacrifice later fulfilled.
          Revelation 1:12 and 13 also pictures Christ standing in the middle of golden lampstands, the same
          image Bezaleel hammers out of gold in this chapter.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 37 has no crisis in it, no sin, no argument. It is just gold becoming exactly what God already described.</p>
          <p>
            📌 <strong>A private command finally became a visible object.</strong> Everything Bezaleel builds
            in this chapter, God had already named to Moses alone, chapters earlier, long before the camp
            ever saw a single tool at work.
          </p>
          <p>
            📌 <strong>The most sacred work went to the most specifically gifted hands.</strong> Bezaleel is
            named alone here not because Aholiab stopped helping, but because this particular work, gold
            hammered without a seam, matched the exact skill God had described him having from the start.
          </p>
          <p>
            📌 <strong>Holiness was not only in the gold. It was in the limits around it.</strong> The incense
            recipe sitting at the end of this chapter could not be worn, sold, or copied by anyone else, no
            matter how skilled. Some things stay holy by staying set apart.
          </p>
          <p>
            You will probably never build anything this valuable. But you likely have one skill that fits a
            purpose other skills do not, the way Bezaleel&apos;s gift for metal fit a box no embroiderer could
            have built.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name the one thing you are actually skilled at, and ask whether you have ever offered it toward
            something holy, or only toward yourself.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
