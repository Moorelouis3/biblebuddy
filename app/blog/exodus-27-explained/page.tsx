import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-27-explained", {
  title: "Exodus 27 Explained: The Bronze Altar and the Court of the Tabernacle",
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

export default function ExodusTwentySevenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-27-explained"
      title={<>📖 Exodus 27 Explained: The Bronze Altar and the Court of the Tabernacle</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The gold stops here. Everything in this chapter is covered in brass instead.</p>
            <p>
              <strong>Exodus 27 explained</strong> is the chapter where God moves Moses out of the tent and
              into the open yard around it: an altar built to carry fire and blood every single day, a
              fenced court marking off how far an ordinary Israelite could walk, and a lamp that was never
              allowed to go dark.
            </p>
            <p>Maybe you have pictured the tabernacle as one tent and stopped there.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the altar get brass instead of the gold used just one chapter earlier?</li>
            <li>❓ What were the horns on the corners of the altar actually for?</li>
            <li>❓ Why did the altar have no steps leading up to it?</li>
            <li>❓ And why did one lamp have to stay burning every night without exception?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This chapter builds the parts of the tabernacle that ordinary people actually saw
              and used, not only the priests who worked behind the veil.</strong>
            </p>
            <p>
              Here is the whole chapter in order: the altar of burnt offering and its brass vessels, the
              staves built to carry it, the linen fence enclosing the whole courtyard on all four sides, the
              one gate cut into that fence, and the standing order to keep a lamp burning that the chapter
              closes on.
            </p>
            <p>None of it was decoration. Every measurement marked out exactly how far a sinful person could come near a holy God, and what it cost to come that far.</p>
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
            <ArticleLink href="/blog/exodus-26-explained">Exodus 26</ArticleLink> built the tabernacle
            itself: the linen curtains woven with cherubim, the goat hair and skin coverings over them, the
            gold covered walls standing on silver, and the veil marking off the most holy place where the
            ark would sit. By the end of that chapter, the building was finished, at least on paper. Moses
            still had nowhere planned for Israel to actually bring an offering, and no boundary marking
            where the sacred ground began.
          </p>
          <p>
            Exodus 27 answers both. This is the chapter that steps outside the tent and builds the yard
            around it: the altar where sacrifices would actually burn, and the fence that told an ordinary
            Israelite exactly how far he could walk and no further.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 27 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Altar of Burnt Offering (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the object every sacrifice in Israel would eventually pass over.</p>
        </div>
        <VerseQuote
          text="And thou shalt make an altar of shittim wood, five cubits long, and five cubits broad; the altar shall be foursquare: and the height thereof shall be three cubits. And thou shalt make the horns of it upon the four corners thereof: his horns shall be of the same: and thou shalt overlay it with brass."
          reference="Exodus 27:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Five cubits square and three cubits tall, roughly seven and a half feet wide and four and a
            half feet high using an eighteen inch cubit. Built from the same{" "}
            <ArticleLink href="/blog/exodus-25-explained">shittim wood</ArticleLink> as the ark, but covered
            in brass, not gold. This is the altar of burnt offering, the first object anyone walking into
            the court would meet.
          </p>
          <p>
            📌 <strong>Gold covered the objects nearest the ark. Brass covered the one object that met fire
            and blood every single day.</strong> The costlier metal never goes where it would melt or burn
            away. Brass can take the heat that gold cannot.
          </p>
          <p>Four horns rose from the corners, cast as one piece with the altar rather than attached afterward. The text does not explain their purpose here, only that they existed and that they were brass, like everything else on this altar.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Vessels and the Brass Grate (verses 3 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>An altar that burns constantly needs tools to clean it, and this one gets a full set.</p>
        </div>
        <VerseQuote
          text="And thou shalt make his pans to receive his ashes, and his shovels, and his basons, and his fleshhooks, and his firepans: all the vessels thereof thou shalt make of brass. And thou shalt make for it a grate of network of brass; and upon the net shalt thou make four brasen rings in the four corners thereof."
          reference="Exodus 27:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Five kinds of tool, named one after another: pans for ash, shovels, basins, hooks for handling
            meat, and firepans. Every one of them brass, with no exception written in. Then comes a detail
            easy to read past.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt put it under the compass of the altar beneath, that the net may be even to the midst of the altar."
          reference="Exodus 27:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The network sat halfway up inside the altar&apos;s hollow frame, not underneath it on the
            ground. The altar was built hollow, and this brass grate likely held the fire and the offering
            up off the ground inside that hollow space, with the four rings giving the staves something
            solid to pass through when the altar had to move.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Staves to Carry It, Built the Same Way (verses 6 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Israel was still traveling. Nothing in the tabernacle, not even the heaviest piece, could stay fixed to one spot.</p>
        </div>
        <VerseQuote
          text="And thou shalt make staves for the altar, staves of shittim wood, and overlay them with brass. And the staves shall be put into the rings, and the staves shall be upon the two sides of the altar, to bear it."
          reference="Exodus 27:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Same wood, same brass covering as the altar itself. The staves slid through the four rings from
            the grate, one on each side, so the priests carrying it never had to touch the altar directly.
          </p>
          <p>Then the chapter repeats a phrase it has used for furniture before.</p>
        </div>
        <VerseQuote
          text="Hollow with boards shalt thou make it: as it was shewed thee in the mount, so shall they make it."
          reference="Exodus 27:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The altar standing outside in the open yard was copied from the same pattern as the
            ark hidden behind the veil.</strong> Nothing in this courtyard was any less designed by God than
            what sat in the most holy place. It was simply built from a different metal for a different job.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Fencing the Court: South and North (verses 9 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the altar built, the chapter turns to marking off the ground around it.</p>
        </div>
        <VerseQuote
          text="And thou shalt make the court of the tabernacle: for the south side southward there shall be hangings for the court of fine twined linen of an hundred cubits long for one side: And the twenty pillars thereof and their twenty sockets shall be of brass; the hooks of the pillars and their fillets shall be of silver."
          reference="Exodus 27:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            An hundred cubits of plain white linen, about a hundred and fifty feet, hung on twenty pillars
            standing in brass sockets. Verse 11 repeats the same count for the north side, word for word:
            twenty pillars, twenty sockets of brass, hooks and fillets of silver. No blue, purple, or
            scarlet here, and no cherubim woven in anywhere. Just plain linen marking a boundary.
          </p>
          <p>
            💡 Silver appears again in the hooks and fillets, the same metal that held up the gold boards
            inside the tent one chapter earlier. Even out here, at the outer edge of the whole
            tabernacle, silver still carries something that touches the structure.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. West, East, and the One Gate In (verses 12 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The shorter sides get less linen, and the east side gets something the other three do not.</p>
        </div>
        <VerseQuote
          text="And for the breadth of the court on the west side shall be hangings of fifty cubits: their pillars ten, and their sockets ten. And the breadth of the court on the east side eastward shall be fifty cubits."
          reference="Exodus 27:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Fifty cubits wide on the west end, ten pillars, ten sockets, half the length of the south and
            north sides. The east side matches that same fifty cubit width, but it does not get one long
            stretch of hanging. It gets split into three pieces: fifteen cubits of plain linen on either
            side of a gate, and the gate itself in the middle.
          </p>
        </div>
        <VerseQuote
          text="And for the gate of the court shall be an hanging of twenty cubits, of blue, and purple, and scarlet, and fine twined linen, wrought with needlework: and their pillars shall be four, and their sockets four."
          reference="Exodus 27:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every other hanging around the court was plain white linen. Only the gate carried
            color.</strong> The same blue, purple, and scarlet used on the veil and the door of the tent in{" "}
            <ArticleLink href="/blog/exodus-26-explained">Exodus 26</ArticleLink> marked the one way in,
            long before anyone reached the tent itself.
          </p>
          <p>
            There was exactly one gate for the entire court. No back entrance, no side door. Whoever came
            to offer anything came through that one marked opening or did not come in at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Numbers Add Up to One Brass Yard (verses 17 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter pauses to total what it has just described.</p>
        </div>
        <VerseQuote
          text="All the pillars round about the court shall be filleted with silver; their hooks shall be of silver, and their sockets of brass. The length of the court shall be an hundred cubits, and the breadth fifty every where, and the height five cubits of fine twined linen, and their sockets of brass."
          reference="Exodus 27:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            An hundred cubits long, fifty cubits wide, about a hundred and fifty feet by seventy five feet,
            roughly half the size of a football field. Five cubits high, about seven and a half feet, tall
            enough to block the view in but not so tall it needed to compete with the tent rising behind it.
          </p>
        </div>
        <VerseQuote
          text="All the vessels of the tabernacle in all the service thereof, and all the pins thereof, and all the pins of the court, shall be of brass."
          reference="Exodus 27:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every pin, every tool, everything touching the ground in this courtyard is brass,
            without one exception named.</strong> Silver shows up in the hooks and fillets above the
            ground. Gold never shows up out here at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Lamp That Was Never Allowed to Go Out (verses 20 and 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends away from brass and measurements, on a single standing order.</p>
        </div>
        <VerseQuote
          text="And thou shalt command the children of Israel, that they bring thee pure oil olive beaten for the light, to cause the lamp to burn always."
          reference="Exodus 27:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Beaten&quot; oil means olives crushed by hand in a mortar rather than run through a heavy
            press. That first crushing produced a clearer, purer oil than anything squeezed out afterward,
            and this verse asks for exactly that grade, not whatever oil was easiest to get.
          </p>
        </div>
        <VerseQuote
          text="In the tabernacle of the congregation without the vail, which is before the testimony, Aaron and his sons shall order it from evening to morning before the LORD: it shall be a statute for ever unto their generations on the behalf of the children of Israel."
          reference="Exodus 27:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This was not a one time instruction for building a lamp. It was a standing law for
            every generation after Moses.</strong> Aaron and his sons were responsible for tending it every
            single evening, with no mention of a night off.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 27 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why brass on the altar instead of the gold used one chapter earlier?</strong> Exodus 27
            never states its own reasoning, but the pattern already set in{" "}
            <ArticleLink href="/blog/exodus-26-explained">Exodus 26</ArticleLink> holds here too: the metal
            gets more costly the closer an object stands to the ark. The altar of burnt offering stood at
            the far outer edge of that pattern, built to carry fire and the blood of{" "}
            <ArticleLink href="/blog/exodus-24-explained">the sacrifices that sealed Israel&apos;s covenant</ArticleLink>{" "}
            every day, a job brass could survive and gold could not.
          </p>
          <p>
            <strong>Why did the altar have no steps?</strong> Exodus 27 gives the altar&apos;s height as
            three cubits, roughly four and a half feet, low enough for a priest to work at without climbing.
            That height matches a rule God had already given in{" "}
            <ArticleLink href="/blog/exodus-20-explained">Exodus 20</ArticleLink>.
          </p>
        </div>
        <VerseQuote
          text="Neither shalt thou go up by steps unto mine altar, that thy nakedness be not discovered thereon."
          reference="Exodus 20:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A staircase would have exposed the priest climbing it from below. Keeping the altar low enough
            to approach without steps protected that dignity, and the height this chapter sets fits that
            rule exactly.
          </p>
          <p>
            <strong>What were the horns of the altar for?</strong> Exodus 27 only says they were there, cast
            as one piece with the altar and covered in brass. Later Scripture shows what they came to mean.
          </p>
        </div>
        <VerseQuote
          text="And Adonijah feared because of Solomon, and arose, and went, and caught hold on the horns of the altar."
          reference="1 Kings 1:50"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Centuries after this chapter, a man running for his life grabbed those same horns as a place of
            refuge. Leviticus later has the priest apply sacrificial blood directly to the horns during sin
            offerings, making them the point where the altar&apos;s purpose was most concentrated.
          </p>
          <p>
            <strong>Was this really the only lamp law God gave, or did it come up again?</strong> Exodus 27
            states the command once. Leviticus restates the identical instruction almost word for word.
          </p>
        </div>
        <VerseQuote
          text="Command the children of Israel, that they bring unto thee pure oil olive beaten for the light, to cause the lamps to burn continually."
          reference="Leviticus 24:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The repetition across two books shows this was never treated as a minor detail Moses could
            quietly drop. It was law before the tabernacle was even built, and it stayed law long after.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 27
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 27:1 and 2</h3>
        <VerseQuote
          text="And thou shalt make an altar of shittim wood, five cubits long, and five cubits broad; the altar shall be foursquare: and the height thereof shall be three cubits. And thou shalt make the horns of it upon the four corners thereof: his horns shall be of the same: and thou shalt overlay it with brass."
          reference="Exodus 27:1 and 2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The altar that stood between every Israelite and the tent behind it, built from the same wood as
          the ark but covered in a metal strong enough to carry fire every day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 27:8</h3>
        <VerseQuote
          text="Hollow with boards shalt thou make it: as it was shewed thee in the mount, so shall they make it."
          reference="Exodus 27:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The altar standing in the open yard came from the exact same pattern as the furniture hidden
          behind the veil. Brass or gold, nothing here was Moses&apos; own design.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 27:20 and 21</h3>
        <VerseQuote
          text="And thou shalt command the children of Israel, that they bring thee pure oil olive beaten for the light, to cause the lamp to burn always. In the tabernacle of the congregation without the vail, which is before the testimony, Aaron and his sons shall order it from evening to morning before the LORD: it shall be a statute for ever unto their generations on the behalf of the children of Israel."
          reference="Exodus 27:20 and 21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s last word is a light that must never go dark, tended night after night by men
          who had no permission to let it fail even once.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 20:26</h3>
        <VerseQuote
          text="Neither shalt thou go up by steps unto mine altar, that thy nakedness be not discovered thereon."
          reference="Exodus 20:26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A law given before the tabernacle existed, quietly fulfilled by the modest height Exodus 27 sets
          for the altar it finally builds.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Kings 1:50</h3>
        <VerseQuote
          text="And Adonijah feared because of Solomon, and arose, and went, and caught hold on the horns of the altar."
          reference="1 Kings 1:50"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Generations after Exodus 27 built them, the altar&apos;s horns had become a known place to run to,
          proof that nothing in this chapter was built just to be forgotten.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 27
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 27 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 27 gives Moses the instructions for the altar of burnt offering and its brass vessels, the
          staves used to carry it, and the linen court enclosing the whole tabernacle, ending with a
          standing command to keep a lamp burning every night.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was the altar of burnt offering made of brass instead of gold?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 27:2 commands brass for the altar itself and for every vessel used with it. The tabernacle
          followed a consistent pattern where gold covered objects nearest the ark and brass covered
          whatever stood at the outer edge of the courtyard, exposed to daily fire.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the horns of the altar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Four projections cast as one piece with the altar at its corners, named in Exodus 27:2 but not
          explained there. Later in Scripture, sacrificial blood was applied to them during sin offerings,
          and 1 Kings 1:50 shows a man grasping them as a place of refuge.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How big was the altar of burnt offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Five cubits long and five cubits broad, with a height of three cubits, close to seven and a half
          feet square and four and a half feet tall using an eighteen inch cubit.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the court of the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A rectangle of linen hangings on brass sockets enclosing the tabernacle and its altar, a hundred
          cubits long and fifty cubits wide according to Exodus 27:18, with one gate on the east side as the
          only way in.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the altar have no steps leading up to it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 20:26 forbids approaching God&apos;s altar by steps, to protect the dignity of the priest
          climbing them. The modest three cubit height Exodus 27 sets for the altar kept it low enough to
          work at without needing any.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does oil olive beaten mean in Exodus 27?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It refers to the clearest oil, pressed out by crushing olives in a mortar rather than a heavy
          press. Exodus 27:20 asks for this purer grade specifically for the lamp, not whatever oil was most
          convenient.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the lamp have to burn continually?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 27:21 calls this a statute forever for Israel&apos;s generations, not a temporary
          instruction. Leviticus 24:2 to 4 repeats the same command almost word for word, confirming it was
          treated as a lasting law rather than a one time detail.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was responsible for the lamp in the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 27:21 names Aaron and his sons, ordering it from evening to morning before the Lord. The
          responsibility sat with the priesthood specifically, not with the people who brought the oil.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did only the gate of the court have color?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 27:16 commands blue, purple, and scarlet for the gate hanging, while every other side of
          the court used plain white linen. The same colors marked the veil and the door of the tent in
          Exodus 26, making color itself a signal of where the one way in actually was.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 27 never leaves the courtyard. It still says something enormous by staying there.</p>
          <p>
            📌 <strong>The altar carried the hardest job and got the hardest wearing metal.</strong> Brass,
            not gold, stood where fire burned and blood was poured out every day without a break.
          </p>
          <p>
            📌 <strong>There was exactly one gate in, and no steps up.</strong> Access to God was never
            careless in this courtyard, but it was also never needlessly complicated for the person walking
            through it.
          </p>
          <p>
            📌 <strong>A lamp that could not be allowed to fail became a law for every generation.</strong>{" "}
            Aaron and his sons answered for it nightly, and Leviticus 24 shows Israel never let that
            responsibility quietly disappear.
          </p>
          <p>
            You will likely never stand in a linen court or carry oil to a brass lamp. But you live on the
            other side of a gate this chapter helped build the first outline of.
          </p>
          <p>So here is your one next step.</p>
          <p>Read Exodus 20:26 and Exodus 27:1 and 2 side by side today, and notice how one quiet law from Sinai was already being kept before the altar was even built.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
