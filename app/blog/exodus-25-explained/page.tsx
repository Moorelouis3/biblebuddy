import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-25-explained", {
  title: "Exodus 25 Explained: The Ark of the Covenant and the Tabernacle",
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

export default function ExodusTwentyFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-25-explained"
      title={<>📖 Exodus 25 Explained: The Ark of the Covenant and the Tabernacle</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Moses is still in the cloud. Forty days of it. And the very first thing God tells him is not a rule.</p>
            <p>
              <strong>Exodus 25 explained</strong> is the chapter where God asks for an offering, then hands
              Moses the blueprint for a room where heaven and earth can meet: a gold covered box, two
              golden angels, a table that never runs empty, and a lamp with seven flames shaped like a
              budding almond tree.
            </p>
            <p>Maybe tabernacle chapters are the ones you skim past on your way to a story.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God forbid images of Himself, then order two gold statues for His own ark?</li>
            <li>❓ Where did a people who had just escaped slavery get enough gold to build any of this?</li>
            <li>❓ What is a &quot;mercy seat,&quot; and why does the whole chapter bend around it?</li>
            <li>❓ Why does a candlestick get almond blossoms carved into it?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every measurement in this chapter answers one line buried in the middle of it:
              God wants to dwell among His people, and He is willing to be specific about how.</strong>
            </p>
            <p>
              Here is every verse explained in sequence: the offering God asks for, the ark that will
              carry His presence, the mercy seat and the cherubim above it, the table of shewbread, and
              the gold lampstand that lit the whole room.
            </p>
            <p>None of this furniture was decoration. Every piece was a sentence in a language God was teaching Israel to read.</p>
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
            <ArticleLink href="/blog/exodus-24-explained">Exodus 24</ArticleLink> ended with Moses
            climbing past everyone else, Aaron and the elders included, into a cloud that swallowed the
            whole mountain for forty days and forty nights. The covenant had just been sealed in blood.
            The people had said yes twice. Now Moses is alone with God, inside the cloud, and chapter 25
            opens with the first words God speaks to him there.
          </p>
          <p>
            It would be easy to expect more commandments, more case law like the long list that filled{" "}
            <ArticleLink href="/blog/exodus-23-explained">Exodus 23</ArticleLink>. Instead God asks for
            gifts, and starts describing a building that does not exist yet, in Hebrew units no engineer
            in the camp had ever been asked to work with before.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 25 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. An Offering Nobody Is Forced to Give (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not open with a tax. He opens with an invitation.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Speak unto the children of Israel, that they bring me an offering: of every man that giveth it willingly with his heart ye shall take my offering."
          reference="Exodus 25:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The word &quot;willingly&quot; is doing all the work in this verse.</strong> There
            is no quota here, no tribe assigned a number of shekels. Only Moses relaying what people are
            moved to bring, and God calling that gift His own the moment it leaves someone&apos;s hand.
          </p>
        </div>
        <VerseQuote
          text="And this is the offering which ye shall take of them; gold, and silver, and brass, And blue, and purple, and scarlet, and fine linen, and goats' hair, And rams' skins dyed red, and badgers' skins, and shittim wood, Oil for the light, spices for anointing oil, and for sweet incense, Onyx stones, and stones to be set in the ephod, and in the breastplate."
          reference="Exodus 25:3 to 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Shittim wood is acacia, a hard, rot resistant tree that actually grows in the deserts
            around Sinai, so this was not an imported luxury material. The &quot;badgers&apos;
            skins&quot; are harder to pin down. Badgers never lived anywhere near this wilderness, and
            translators have long argued over what animal the Hebrew word actually names, with sea cow
            or porpoise hide suggested almost as often as badger. Scripture does not settle the question,
            so neither will this article.
          </p>
          <p>
            What is not debated is where this gold and these dyed skins came from. Israel left Egypt with
            the jewelry of the very nation that had enslaved them.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel did according to the word of Moses; and they borrowed of the Egyptians jewels of silver, and jewels of gold, and raiment: And the LORD gave the people favour in the sight of the Egyptians, so that they lent unto them such things as they required. And they spoiled the Egyptians."
          reference="Exodus 12:35 and 36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The gold in the tabernacle was Egyptian gold first.</strong> What <ArticleLink href="/blog/exodus-12-explained">Exodus 12</ArticleLink>{" "}
            recorded as a strange, almost throwaway detail about borrowed jewelry turns out to be the raw
            material for the holiest object Israel will ever carry. Nothing in Exodus was wasted,
            including what looked like a minor negotiating footnote at the time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Reason for Everything That Follows (verses 8 and 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before a single measurement is given, God states His purpose in one short line.</p>
        </div>
        <VerseQuote
          text="And let them make me a sanctuary; that I may dwell among them."
          reference="Exodus 25:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Nine words carry the whole reason the rest of Exodus looks the way it does.</strong>{" "}
            God does not ask for a sanctuary because He is confined to it, or because He needs a house the
            way people do. He asks for it so that He can dwell among the very people He just rescued,
            close enough that distance stops being the main fact of their relationship with Him.
          </p>
        </div>
        <VerseQuote
          text="According to all that I shew thee, after the pattern of the tabernacle, and the pattern of all the instruments thereof, even so shall ye make it."
          reference="Exodus 25:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Moses is not designing anything here. He is copying something he has been shown. The word
            &quot;pattern&quot; will come back at the very end of this chapter, framing everything in
            between as a replica, not an invention.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Ark of the Covenant (verses 10 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first object described is also the most important one in the whole tabernacle.</p>
        </div>
        <VerseQuote
          text="And they shall make an ark of shittim wood: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof, and a cubit and a half the height thereof."
          reference="Exodus 25:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A cubit was roughly the length of a forearm, about eighteen inches. That puts this box at
            around four and a half feet long and about two and a half feet wide and tall. Small enough for
            a few men to carry. Important enough to be overlaid in pure gold, inside and out, with a crown
            of gold running around the top edge.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt cast four rings of gold for it, and put them in the four corners thereof; and two rings shall be in the one side of it, and two rings in the other side of it."
          reference="Exodus 25:12"
        />
        <VerseQuote
          text="And thou shalt make staves of shittim wood, and overlay them with gold. And thou shalt put the staves into the rings by the sides of the ark, that the ark may be borne with them."
          reference="Exodus 25:13 and 14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The ark was built to be carried, never to sit still.</strong> Four rings, two
            matching poles, gold plated like the box itself. Whatever this object was going to hold, God
            designed it from the start to travel with His people rather than wait for them somewhere fixed.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt put into the ark the testimony which I shall give thee."
          reference="Exodus 25:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;The testimony&quot; here is the covenant God is about to write, the same tables of
            stone promised back in <ArticleLink href="/blog/exodus-24-explained">Exodus 24</ArticleLink>.
            This small gold box was built to hold the written terms of the relationship God had just
            sealed in blood.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Mercy Seat and the Cherubim (verses 17 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The ark needed a lid. What God describes is far more than a lid.</p>
        </div>
        <VerseQuote
          text="And thou shalt make a mercy seat of pure gold: two cubits and a half shall be the length thereof, and a cubit and a half the breadth thereof."
          reference="Exodus 25:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The Hebrew word behind &quot;mercy seat&quot; shares its root with the word for atonement,
            the same root behind the Day of Atonement later called Yom Kippur. The name itself is already
            pointing forward to what this gold cover will be used for: the place where judgment and mercy
            meet over the exact spot where the broken covenant is kept.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt make two cherubims of gold, of beaten work shalt thou make them, in the two ends of the mercy seat."
          reference="Exodus 25:18"
        />
        <VerseQuote
          text="And the cherubims shall stretch forth their wings on high, covering the mercy seat with their wings, and their faces shall look one to another; toward the mercy seat shall the faces of the cherubims be."
          reference="Exodus 25:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is not the first time cherubim guard something holy in Scripture.</strong>{" "}
            After Adam and Eve were driven from Eden, Cherubim were stationed at the entrance so no one
            could casually walk back in.
          </p>
        </div>
        <VerseQuote
          text="So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life."
          reference="Genesis 3:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/genesis-3-explained">Genesis 3</ArticleLink> used cherubim to keep
            people out. Exodus 25 puts two of them, facing each other, over the exact place where God says
            He will meet with Moses. The same figures that once sealed off access to God&apos;s presence
            now frame the one spot where that access is being reopened.
          </p>
        </div>
        <VerseQuote
          text="And there I will meet with thee, and I will commune with thee from above the mercy seat, from between the two cherubims which are upon the ark of the testimony, of all things which I will give thee in commandment unto the children of Israel."
          reference="Exodus 25:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This single verse names the exact spot where God promises to speak.</strong> Not
            the whole tabernacle in general. One particular space, between two particular golden figures,
            above one particular gold lid. God is not vague about where He can be found.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Table of Shewbread (verses 23 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From the ark, the instructions move to a much more ordinary piece of furniture: a table.</p>
        </div>
        <VerseQuote
          text="Thou shalt also make a table of shittim wood: two cubits shall be the length thereof, and a cubit the breadth thereof, and a cubit and a half the height thereof."
          reference="Exodus 25:23"
        />
        <VerseQuote
          text="And thou shalt make the dishes thereof, and spoons thereof, and covers thereof, and bowls thereof, to cover withal: of pure gold shalt thou make them."
          reference="Exodus 25:29"
        />
        <VerseQuote
          text="And thou shalt set upon the table shewbread before me alway."
          reference="Exodus 25:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Shewbread&quot; means bread of the presence, bread set out continually before God
            rather than offered once and gone. Later chapters fill in the details of how many loaves sat
            here and how often they were replaced. What Exodus 25 establishes first is simpler: there
            would always be bread on this table, every single day, with no gap where the table sat empty.
          </p>
          <p>
            📌 <strong>God wanted a gold covered box for His covenant and a gold covered table for His
            bread, in the same room.</strong> Presence and provision, kept a few feet apart from each
            other, both described before anything else in the tabernacle gets built.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Golden Candlestick (verses 31 to 40)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends with the most detailed single object in it: a lampstand made of one solid piece of gold.</p>
        </div>
        <VerseQuote
          text="And thou shalt make a candlestick of pure gold: of beaten work shall the candlestick be made: his shaft, and his branches, his bowls, his knops, and his flowers, shall be of the same."
          reference="Exodus 25:31"
        />
        <VerseQuote
          text="And six branches shall come out of the sides of it; three branches of the candlestick out of the one side, and three branches of the candlestick out of the other side:"
          reference="Exodus 25:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Six branches, three on each side of a central shaft, every one of them hammered out of the
            same single block of gold rather than welded together from separate parts. &quot;Beaten
            work&quot; means a craftsman shaped this entire object by striking one piece of metal, branches
            and all, until it took its final form.
          </p>
        </div>
        <VerseQuote
          text="Three bowls made like unto almonds, with a knop and a flower in one branch; and three bowls made like almonds in the other branch, with a knop and a flower: so in the six branches that come out of the candlestick."
          reference="Exodus 25:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The decoration is not random. Every branch is shaped like a flowering almond tree, buds
            and blossoms worked into solid gold. Almond trees were known in that region for blooming
            earliest in the year, ahead of every other tree. Scripture does not explain why that specific
            tree was chosen here, so this is where the text stops and speculation would begin.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt make the seven lamps thereof: and they shall light the lamps thereof, that they may give light over against it."
          reference="Exodus 25:37"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One shaft and six branches add up to seven separate lamps, all lit at once, all cut from the
            same piece of gold they stand on.
          </p>
        </div>
        <VerseQuote
          text="Of a talent of pure gold shall he make it, with all these vessels."
          reference="Exodus 25:39"
        />
        <VerseQuote
          text="And look that thou make them after their pattern, which was shewed thee in the mount."
          reference="Exodus 25:40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter opens and closes on the same word.</strong> Verse 9 told Moses to
            build after the pattern he was shown. Verse 40 repeats the command almost exactly, closing the
            whole chapter the same way it opened. Nothing described here came from Moses&apos; own
            imagination.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 25 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does God command two gold cherubim here when the second commandment forbids
            graven images?</strong> The commandment given back in Exodus 20 forbids making an image of
            God Himself, or an image meant to be worshipped as a god. The cherubim are neither. They are
            not images of the LORD, and nothing in Exodus 25 treats them as objects of worship. They mark
            and frame the place where God meets with Moses, the same role cherubim already held guarding
            Eden in Genesis 3.
          </p>
          <p>
            <strong>Where did people who had just escaped slavery get this much gold, silver, and dyed
            fabric in the middle of a wilderness?</strong> Exodus 12:35 and 36 already answered this
            before this chapter was even written. Israel left Egypt carrying jewelry borrowed from the
            Egyptians themselves, with God making the Egyptians willing to hand it over. The offering in
            Exodus 25 draws on wealth that had already left Egypt months earlier.
          </p>
          <p>
            <strong>Is the mercy seat just a lid, or something more?</strong> It is shaped and sized to
            cover the ark exactly, so in one sense it functions as a lid. But its Hebrew name, its place
            between the two cherubim, and the promise in verse 22 that God will speak from above it, all
            point to something with its own identity and purpose, not a plain cover that happens to sit on
            top of a box.
          </p>
          <p>
            <strong>Why give exact measurements for furniture almost no one outside the priesthood would
            ever see?</strong> The chapter never explains this directly, but the pattern language in
            verses 9 and 40 suggests the answer is not about human eyes at all. Moses is told to copy
            something he was shown, not to design something impressive for a crowd. The precision serves
            the pattern, not an audience.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 25
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 25:8</h3>
        <VerseQuote
          text="And let them make me a sanctuary; that I may dwell among them."
          reference="Exodus 25:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The purpose statement for the entire tabernacle, and for every chapter that follows this one
          through the rest of Exodus. God wants to be near His people, not just over them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 25:22</h3>
        <VerseQuote
          text="And there I will meet with thee, and I will commune with thee from above the mercy seat, from between the two cherubims which are upon the ark of the testimony, of all things which I will give thee in commandment unto the children of Israel."
          reference="Exodus 25:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A specific promise about a specific place. God names exactly where Moses can expect to hear
          from Him, rather than leaving that location vague.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 25:40</h3>
        <VerseQuote
          text="And look that thou make them after their pattern, which was shewed thee in the mount."
          reference="Exodus 25:40"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse Hebrews 8:5 later quotes almost word for word, treating the whole tabernacle as a
          shadow of something greater that Moses was only shown a glimpse of.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Hebrews 9:4 and 5</h3>
        <VerseQuote
          text="Which had the golden censer, and the ark of the covenant overlaid round about with gold, wherein was the golden pot that had manna, and Aaron's rod that budded, and the tables of the covenant; And over it the cherubims of glory shadowing the mercyseat; of which we cannot now speak particularly."
          reference="Hebrews 9:4 and 5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Centuries later, the ark Exodus 25 describes is still being discussed in detail, now holding
          more than just the tables of the covenant, and still too significant for the writer of Hebrews
          to fully unpack in one letter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. John 1:14</h3>
        <VerseQuote
          text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
          reference="John 1:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same desire Exodus 25:8 states plainly, to dwell among His people, shows up again centuries
          later in a way no gold box could ever fully carry.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 25
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 25 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God asks Israel for a willing offering of gold, silver, fabric, and wood, then gives Moses the
          design for the ark of the covenant, the mercy seat with its two cherubim, the table of
          shewbread, and the golden candlestick, all to be built exactly after a pattern Moses was shown
          on the mountain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the ark of the covenant used for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 25:16 says it held &quot;the testimony,&quot; the tables of the covenant God was about
          to give Moses. It also became the place where God promised to meet and speak with Moses, from
          above the mercy seat and between the two cherubim.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;mercy seat&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the gold cover for the ark of the covenant. Its Hebrew name shares the same root as the
          word for atonement, the same root behind the Day of Atonement, pointing to its role as the place
          where God&apos;s presence and Israel&apos;s covenant met.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the ark have cherubim if God forbids images?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The second commandment forbids images made to represent or worship God Himself. The cherubim on
          the ark are not images of God and were never treated as objects of worship. Cherubim already
          appear in Genesis 3:24 guarding the way to Eden, a role of marking and framing sacred space
          rather than depicting God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was inside the ark of the covenant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 25:16 names only the testimony, the tables of the covenant. Hebrews 9:4 later describes
          the ark also holding a golden pot of manna and Aaron&apos;s rod that budded, items added to it
          at later points in Israel&apos;s history.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where did the Israelites get gold for the tabernacle in the wilderness?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:35 and 36 records Israel borrowing jewels of gold and silver from the Egyptians before
          they left, with God making the Egyptians willing to give it. That wealth became the raw material
          for the offering described in Exodus 25.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is shittim wood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Acacia wood, a hard and rot resistant tree that grows naturally in the desert regions around
          Sinai. It was used for the ark, the table, and the staves that carried them, then covered in
          gold.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the shewbread?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Bread kept continually on the gold table described in Exodus 25:23 to 30, set &quot;before me
          alway&quot; according to verse 30, so that God&apos;s presence in the tabernacle was always
          paired with bread, not just law and sacrifice.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the golden candlestick have almond blossoms on it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 25:33 and 34 describe bowls shaped like almonds with knops and flowers worked into the
          branches. Scripture does not explain the specific choice of almond blossoms, so the detail is
          best read as part of the pattern Moses was shown rather than something the text itself
          interprets.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;according to the pattern&quot; mean in Exodus 25?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 9 and 40 both tell Moses to build everything exactly as he was shown on the mountain.
          Hebrews 8:5 later quotes this directly, describing the whole tabernacle as a copy of something
          greater, not a design Moses invented himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus spend so many chapters on tabernacle furniture?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 25:8 gives the reason in one line: so that God could dwell among His people. The detail
          is not about architecture for its own sake. It is about how seriously God takes the practical
          question of where and how He will be present with the people He just rescued.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 25 can read like a materials list. Read slowly, it is closer to a love letter in blueprint form.</p>
          <p>
            📌 <strong>God wanted a willing gift, not a required one.</strong> Every gold ring and dyed
            curtain in this chapter started as something someone chose to let go of, not something they
            were taxed into surrendering.
          </p>
          <p>
            📌 <strong>Every object answers verse 8.</strong> The ark, the mercy seat, the table, the
            candlestick, all of it exists so that God can dwell among His people, close enough that
            distance is no longer the main fact between them.
          </p>
          <p>
            📌 <strong>None of it was Moses&apos; own design.</strong> Twice in one chapter he is told to
            build after the pattern he was shown, a detail Hebrews later uses to call the whole tabernacle
            a shadow of something still to come.
          </p>
          <p>
            You will probably never build a gold covered box or hammer a lampstand out of a single piece
            of metal.
          </p>
          <p>
            But you can ask the same question this chapter asks of Israel: what are you willing to give,
            right now, not because you were told to, but because you want God close.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
