import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-26-explained", {
  title: "Exodus 26 Explained: The Tabernacle's Walls, Coverings, and Veil",
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

export default function ExodusTwentySixExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-26-explained"
      title={<>📖 Exodus 26 Explained: The Tabernacle&apos;s Walls, Coverings, and Veil</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No furniture gets built in this chapter. Not one object you could carry out and use.</p>
            <p>
              <strong>Exodus 26 explained</strong> is the chapter where God tells Moses how to build the
              building itself: four layers of curtains stacked on top of each other, gold plated walls
              standing in silver sockets, and a single curtain thick enough to separate heaven&apos;s
              address from everyone else&apos;s.
            </p>
            <p>Maybe you have pictured the tabernacle as a tent and left it at that.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a tent need four separate layers of covering?</li>
            <li>❓ Why gold on the inside walls and brass on the outside hooks?</li>
            <li>❓ What exactly was the veil, and why did it matter so much that it had its own cherubim?</li>
            <li>❓ What happened to that same veil centuries later, on a Friday afternoon in Jerusalem?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every layer in this chapter answers the same question: how close can sinful
              people get to a holy God, and where exactly does that closeness stop.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the inner linen curtains woven
              with cherubim, the rougher coverings laid over them, the gold boards standing on a silver
              foundation, the bars that locked the walls into one structure, the veil that divided the
              tabernacle in two, and the plain hanging that marked its only door.
            </p>
            <p>From the outside, this building looked ordinary. Nothing about the outside told you what was folded inside it.</p>
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
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink> gave Moses the
            furniture list: the ark and its mercy seat, the table for the bread, and the gold lampstand,
            each one built &quot;after the pattern&quot; shown to him on the mountain. What that chapter
            never said was where any of it would actually sit, or what would keep the rain, the wind, and
            the desert sun off a wooden box covered in gold.
          </p>
          <p>
            Exodus 26 answers that. This is the architecture chapter. No gold rings, no cherubim statues,
            no bread. Just curtains, boards, bars, sockets, and one piece of fabric that mattered more than
            almost anything else in the whole tabernacle.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 26 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Inner Curtains, Woven With Cherubim (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first layer named is also the one no one outside the tabernacle would ever see.</p>
        </div>
        <VerseQuote
          text="Moreover thou shalt make the tabernacle with ten curtains of fine twined linen, and blue, and purple, and scarlet: with cherubims of cunning work shalt thou make them."
          reference="Exodus 26:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Cunning work&quot; does not mean clever trickery. It means skilled craftsmanship, the
            cherubim woven directly into the linen threads rather than stitched on afterward. Ten curtains,
            dyed blue, purple, and scarlet, each one carrying the same creatures that once stood guard at
            Eden.
          </p>
          <p>
            Two sets of five curtains were joined together, then fastened to each other with loops and
            clasps.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt make fifty taches of gold, and couple the curtains together with the taches: and it shall be one tabernacle."
          reference="Exodus 26:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Fifty gold clasps turned two separate pieces of fabric into one tabernacle.</strong>{" "}
            The seam where the two curtains met was not left loose or hidden. It was closed with gold,
            inside the one layer closest to the holy objects themselves.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Rougher Layers Laid Over It (verses 7 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Over that woven linen, God orders a second curtain made from a completely different material.</p>
        </div>
        <VerseQuote
          text="And thou shalt make curtains of goats' hair to be a covering upon the tabernacle: eleven curtains shalt thou make."
          reference="Exodus 26:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Eleven goat hair curtains, one more than the ten linen curtains underneath, so the extra length
            could hang down and cover the back of the structure. This layer was joined the same way as the
            first, with loops and clasps, except the clasps here were brass, not gold.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt make fifty taches of brass, and put the taches into the loops, and couple the tent together, that it may be one."
          reference="Exodus 26:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Gold clasps stayed inside, out of sight. Brass clasps faced the weather.</strong>{" "}
            Nothing in this chapter wastes the more costly metal on a surface nobody holy would ever touch.
          </p>
          <p>Two more layers finish the covering, named in a single short verse.</p>
        </div>
        <VerseQuote
          text="And thou shalt make a covering for the tent of rams' skins dyed red, and a covering above of badgers' skins."
          reference="Exodus 26:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The identity of the Hebrew animal behind &quot;badgers&apos; skins&quot; is genuinely
            disputed among translators, with sea cow or porpoise hide suggested as often as badger.
            Whatever the animal, its hide formed the outermost, toughest surface, the one layer actually
            exposed to sun and sand every day.
          </p>
          <p>
            A visitor walking past the camp would have seen weathered hide and nothing else. Woven linen
            and gold threaded cherubim sat three layers underneath, completely hidden from view.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Gold Covered Walls Standing on Silver (verses 15 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Curtains need something to hang on. That something turns out to be a wall of standing boards.</p>
        </div>
        <VerseQuote
          text="And thou shalt make boards for the tabernacle of shittim wood standing up. Ten cubits shall be the length of a board, and a cubit and a half shall be the breadth of one board."
          reference="Exodus 26:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 At roughly eighteen inches to a cubit, each board stood about fifteen feet tall and two and
            a quarter feet wide, cut from{" "}
            <ArticleLink href="/blog/exodus-25-explained">the same acacia wood</ArticleLink> used for the
            ark. Each board had two tenons cut into its base, like two pegs, fitted into a matching pair of
            sockets below.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt make forty sockets of silver under the twenty boards; two sockets under one board for his two tenons, and two sockets under another board for his two tenons."
          reference="Exodus 26:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Twenty boards on the south side, forty silver sockets beneath them. Verses 20 and 21 repeat the
            exact same count for the north side: twenty boards, forty sockets of silver. The west side,
            facing the back of the tabernacle, used fewer boards, six in the middle and two built
            specifically for the corners.
          </p>
        </div>
        <VerseQuote
          text="And they shall be eight boards, and their sockets of silver, sixteen sockets; two sockets under one board, and two sockets under another board."
          reference="Exodus 26:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every board in every wall stood on silver, never directly on the ground.</strong>{" "}
            Then gold covered the boards themselves.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt overlay the boards with gold, and make their rings of gold for places for the bars: and thou shalt overlay the bars with gold."
          reference="Exodus 26:29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Gold on the visible surface, silver underneath carrying the weight. A visitor standing inside
            the holy place, surrounded by walls like this, would have been looking at solid gold on every
            side, held up by a foundation they could not see.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Bars That Locked the Walls Together (verses 26 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Standing boards on their own would still sway. God orders horizontal bars to hold the whole wall rigid.</p>
        </div>
        <VerseQuote
          text="And thou shalt make bars of shittim wood; five for the boards of the one side of the tabernacle, And five bars for the boards of the other side of the tabernacle, and five bars for the boards of the side of the tabernacle, for the two sides westward."
          reference="Exodus 26:26 and 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Five bars, three separate times, for the south wall, the north wall, and the west wall: fifteen
            bars total, slid through gold rings on the outside face of the boards.
          </p>
        </div>
        <VerseQuote
          text="And the middle bar in the midst of the boards shall reach from end to end."
          reference="Exodus 26:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ The middle bar on each wall ran the whole length of the wall in one piece, not board by
            board. That one long bar was what actually kept the gold panels from leaning apart once the
            tent was raised. Then the chapter repeats a phrase it already used once in{" "}
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink>.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt rear up the tabernacle according to the fashion thereof which was shewed thee in the mount."
          reference="Exodus 26:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The wall, not only the furniture inside it, was something Moses copied, not
            something he designed.</strong> The same pattern language that framed the ark and the
            lampstand now covers the boards and bars holding the building up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Veil That Divided Holy From Most Holy (verses 31 to 35)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One more curtain gets built, and this one is not about keeping out weather.</p>
        </div>
        <VerseQuote
          text="And thou shalt make a vail of blue, and purple, and scarlet, and fine twined linen of cunning work: with cherubims shall it be made:"
          reference="Exodus 26:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Same materials as the inner curtains back in verse 1, same cherubim woven into the thread. This
            fabric hung on four pillars of gold covered acacia wood, standing in their own four sockets of
            silver, the same silver foundation used under the walls themselves.
          </p>
          <p>Then comes the verse that names exactly what this curtain was for.</p>
        </div>
        <VerseQuote
          text="And thou shalt hang up the vail under the taches, that thou mayest bring in thither within the vail the ark of the testimony: and the vail shall divide unto you between the holy place and the most holy."
          reference="Exodus 26:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>One curtain, hung in one place, split the entire tabernacle into two rooms with two
            very different levels of access.</strong> The outer room, the holy place, was where the
            priests worked daily. Past the veil, the most holy place held only the ark, and only the high
            priest entered there, and only once a year.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt put the mercy seat upon the ark of the testimony in the most holy place. And thou shalt set the table without the vail, and the candlestick over against the table on the side of the tabernacle toward the south: and thou shalt put the table on the north side."
          reference="Exodus 26:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is where{" "}
            <ArticleLink href="/blog/exodus-25-explained">the furniture from Exodus 25</ArticleLink>{" "}
            finally gets placed on a map. The ark and mercy seat go behind the veil, alone. The table sits
            on the north side of the outer room, the candlestick across from it on the south side, lighting
            a room the ark no longer shares with them.
          </p>
          <p>
            The cherubim that once guarded the way back into Eden in{" "}
            <ArticleLink href="/blog/genesis-3-explained">Genesis 3</ArticleLink> are not carved into gold
            here. They are woven into the one curtain that decides how far anyone, even a priest, is
            allowed to walk.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Door of the Tent (verses 36 and 37)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends at the only entrance the whole structure had.</p>
        </div>
        <VerseQuote
          text="And thou shalt make an hanging for the door of the tent, of blue, and purple, and scarlet, and fine twined linen, wrought with needlework."
          reference="Exodus 26:36"
        />
        <VerseQuote
          text="And thou shalt make for the hanging five pillars of shittim wood, and overlay them with gold, and their hooks shall be of gold: and thou shalt cast five sockets of brass for them."
          reference="Exodus 26:37"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Same colors as the veil. Same needlework quality. One detail is missing on purpose: no
            cherubim are named in this hanging. The creatures guarding sacred space are woven only into the
            veil deeper inside, never into the curtain the public actually walked past.
          </p>
          <p>
            ⚠️ And the five pillars holding up this door stood in sockets of brass, not silver. The
            tabernacle had exactly one door, and even its foundation was built from a lesser metal than
            everything standing further inside it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 26 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why gold near the ark and brass at the door?</strong> The text never explains its own
            reasoning in so many words, but the pattern is consistent and easy to trace: gold clasps and
            gold overlaid boards surround the most holy place, brass clasps and brass sockets sit at the
            tabernacle&apos;s outer edge. The closer an object stood to where God met with Moses, the more
            costly the metal used to build it.
          </p>
          <p>
            <strong>What happened to this veil later in Scripture?</strong> Exodus 26 only describes the
            veil&apos;s construction and its purpose, dividing the holy place from the most holy place.
            Centuries later, Matthew&apos;s Gospel records what happened to the veil standing in the
            temple that replaced this tent, at the moment Jesus died on the cross.
          </p>
        </div>
        <VerseQuote
          text="And, behold, the veil of the temple was rent in twain from the top to the bottom; and the earth did quake, and the rocks rent"
          reference="Matthew 27:51"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The text in Matthew states only what happened: the veil tore, from the top down, at the moment
            Jesus died. Matthew does not explain why or draw out what it meant. Christians have long read
            the top down direction as a sign that this was God&apos;s own act rather than a human one, and
            read the timing, at the instant Jesus died, as God opening the access that Exodus 26:33 had
            closed. The letter to the Hebrews draws that second connection explicitly, calling Jesus&apos;s
            own flesh the new way through.
          </p>
        </div>
        <VerseQuote
          text="Having therefore, brethren, boldness to enter into the holiest by the blood of Jesus, By a new and living way, which he hath consecrated for us, through the veil, that is to say, his flesh"
          reference="Hebrews 10:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why four layers of covering instead of one strong one?</strong> Scripture does not give
            a stated reason, but the layers were not redundant. Each did a different job: the linen and
            cherubim curtain gave the inside its holiness and beauty, the goat hair curtain added bulk and
            length, and the skins on top handled sun, rain, and wear that none of the finer fabric
            underneath was built to survive.
          </p>
          <p>
            <strong>Was the most holy place completely dark?</strong> The text does not say directly, but
            the candlestick is placed outside the veil, in the holy place, lighting the table of shewbread
            across from it. Exodus 26 gives the most holy place no lamp of its own, only the ark, the mercy
            seat, and whatever light came from the presence Exodus 25:22 promised would meet Moses there.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 26
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 26:33</h3>
        <VerseQuote
          text="And thou shalt hang up the vail under the taches, that thou mayest bring in thither within the vail the ark of the testimony: and the vail shall divide unto you between the holy place and the most holy."
          reference="Exodus 26:33"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that explains why this chapter matters at all. One curtain, and it is the difference
          between the room priests entered daily and the room only one man entered once a year.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 26:30</h3>
        <VerseQuote
          text="And thou shalt rear up the tabernacle according to the fashion thereof which was shewed thee in the mount."
          reference="Exodus 26:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same pattern language from Exodus 25, now applied to walls and bars instead of furniture.
          Nothing in this building, down to the bracing, came from Moses&apos; own imagination.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 26:6</h3>
        <VerseQuote
          text="And thou shalt make fifty taches of gold, and couple the curtains together with the taches: and it shall be one tabernacle."
          reference="Exodus 26:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Fifty gold clasps closing a seam nobody outside the priesthood would ever see. Even the hidden
          joints were built for the glory of God, not for an audience.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 27:51</h3>
        <VerseQuote
          text="And, behold, the veil of the temple was rent in twain from the top to the bottom; and the earth did quake, and the rocks rent"
          reference="Matthew 27:51"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The curtain Exodus 26:33 commanded to divide holy from most holy, torn top to bottom the moment
          Jesus died, in the one direction a man standing on the ground could never have torn it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Hebrews 10:19 and 20</h3>
        <VerseQuote
          text="Having therefore, brethren, boldness to enter into the holiest by the blood of Jesus, By a new and living way, which he hath consecrated for us, through the veil, that is to say, his flesh"
          reference="Hebrews 10:19 and 20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The New Testament&apos;s own reading of the veil Exodus 26 describes: a barrier Jesus&apos;s body
          replaced, so that entering the most holy place stopped being limited to one priest, one day a
          year.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 26
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 26 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 26 gives Moses the building instructions for the tabernacle itself: the inner linen
          curtains woven with cherubim, the goat hair and skin coverings over them, the gold covered boards
          standing on silver sockets, the bars locking the walls together, and the veil dividing the holy
          place from the most holy place.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many layers of covering did the tabernacle have?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Four. Ten linen curtains woven with cherubim closest to the inside, eleven goat hair curtains
          over them, a covering of rams&apos; skins dyed red, and an outer covering of badgers&apos; skins
          facing the weather.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the veil of the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A curtain of blue, purple, and scarlet linen, woven with cherubim, hung on four gold covered
          pillars. Exodus 26:33 says it divided the holy place, where priests served daily, from the most
          holy place, where only the ark of the covenant sat.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the veil tear when Jesus died?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew 27:51 records the temple veil tearing from the top to the bottom at the moment Jesus
          died. Christians read this as God opening the access to His presence that the veil had restricted
          since Exodus 26, a reading Hebrews 10:19 and 20 supports by calling Jesus&apos;s own flesh the
          new way through.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were badgers&apos; skins in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The exact animal behind the Hebrew word is disputed among translators, with sea cow or porpoise
          hide suggested as often as badger. Whatever animal it was, Exodus 26:14 uses its hide as the
          outermost, weatherproof layer of the tabernacle&apos;s covering.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the tabernacle boards covered in gold but set in silver sockets?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 26:19 to 25 commands silver sockets under every board, with the boards themselves overlaid
          in gold according to verse 29. The visible surfaces nearest the holy place were built from the
          costlier metal, while the hidden foundation underneath carried the weight in silver.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How big was the tabernacle according to Exodus 26?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Each wall board measured ten cubits tall and a cubit and a half wide, roughly fifteen feet by
          two and a quarter feet using an eighteen inch cubit. Twenty boards formed the south wall, twenty
          more the north wall, and eight boards closed the west end at the back.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Where was the ark of the covenant placed inside the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 26:34 places the ark, with the mercy seat on top of it, in the most holy place, behind the
          veil described in verse 33. No other object is named in that inner room.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the veil have cherubim woven into it but the door hanging did not?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 26:31 specifically names cherubim on the veil, the same creatures woven into the inner
          linen curtains of verse 1. Verse 36 describes the outer door hanging in the same colors and
          needlework but does not mention cherubim, leaving that detail unique to the barriers nearest the
          ark.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was allowed past the veil into the most holy place?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 26 itself only describes the veil&apos;s construction and its dividing purpose. Later
          instructions in the Law restrict entry behind it to the high priest alone, and only on the Day of
          Atonement, making the space Exodus 26:33 creates one of the most restricted in all of Israel&apos;s
          worship.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 26 never mentions God&apos;s glory directly. It still builds a whole chapter around the question of how close anyone gets to it.</p>
          <p>
            📌 <strong>Glory was hidden under plain layers.</strong> Gold thread and woven cherubim sat
            underneath goat hair, red dyed skin, and whatever tougher hide covered the outside. From a
            distance, none of it looked like anything special.
          </p>
          <p>
            📌 <strong>One curtain decided how far anyone could walk.</strong> The veil of verse 33 was not
            decoration. It was the line between the room priests worked in daily and the room only one man
            entered once a year.
          </p>
          <p>
            📌 <strong>That same curtain did not stay closed forever.</strong> Centuries later, at the
            moment Jesus died, Matthew 27:51 records it tearing top to bottom, and Hebrews 10:19 and 20
            calls His own body the new way through it.
          </p>
          <p>
            You are not Moses, building walls out of acacia wood and silver sockets. But you live on the
            other side of the same question this chapter is asking.
          </p>
          <p>So here is your one next step.</p>
          <p>Read Hebrews 10:19 and 20 today, and let it answer what Exodus 26:33 first closed off.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
