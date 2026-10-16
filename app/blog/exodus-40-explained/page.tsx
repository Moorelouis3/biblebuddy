import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-40-explained", {
  title: "Exodus 40 Explained: The Tabernacle Finished and the Glory of the Lord",
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

export default function ExodusFortyExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-40-explained"
      title={<>📖 Exodus 40 Explained: The Tabernacle Finished and the Glory of the Lord</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Every plank is cut. Every curtain is woven. Every piece of gold has been shaped and set in place.</p>
            <p>
              <strong>Exodus 40 explained</strong> is the chapter where it all finally gets put together. Moses sets
              up the tabernacle piece by piece, exactly on schedule, exactly in order. Then something happens that no
              amount of planning could have prepared anyone for. A cloud settles over the tent. Glory fills the
              inside of it. And Moses, the one man who had stood closer to God than anyone alive, cannot walk
              through the door.
            </p>
            <p>Maybe you have skimmed this chapter before, assuming it was just the last item on a long construction list.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the exact date matter so much that it gets stated twice?</li>
            <li>❓ Why is Aaron&apos;s anointing commanded here but never actually shown happening?</li>
            <li>❓ Why could Moses not enter a tent he had already walked through many times while building it?</li>
            <li>❓ And why does the whole book of Exodus end on a cloud instead of a celebration?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 40 is the chapter where a year of instructions stops being instructions and
              becomes a place God actually moves into.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the command naming exactly where every piece
              goes, the anointing that is spoken but not yet carried out, Moses setting up every board and curtain
              himself, and the glory that closes the book of Exodus by filling the very tent built to hold it.
            </p>
            <p>Read slowly. This chapter ends one story and quietly opens the next one.</p>
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
            <ArticleLink href="/blog/exodus-39-explained">Exodus 39</ArticleLink> ended with every piece of the
            tabernacle, boards, furniture, curtains, and Aaron&apos;s priestly garments, carried to Moses and laid out in
            front of him. He looked at all of it, confirmed it matched everything God had commanded, and blessed the
            people for it.
          </p>
          <VerseQuote
            text="And Moses did look upon all the work, and, behold, they had done it as the LORD had commanded, even so had they done it: and Moses blessed them."
            reference="Exodus 39:43"
          />
          <p>
            That verse closed the building project. It did not open the tabernacle. A pile of finished pieces,
            however faithfully made, is not the same as a tent standing upright with the ark inside it. Exodus 40 is
            where the parts finally become the place.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 40 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Command: Where Everything Goes, and When (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with God speaking, not Moses acting. Before a single board moves, a date is set.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, On the first day of the first month shalt thou set up the tabernacle of the tent of the congregation."
          reference="Exodus 40:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not a vague &quot;whenever it is ready.&quot; It is a specific day, named in advance.</strong>{" "}
            Israel had left Egypt in the first month of their very first year as a free people, the same month this
            chapter now points back to.
          </p>
          <p>
            Verses 3 through 8 then lay out exactly where each piece belongs, moving from the center outward: the ark
            behind its veil first, then the table, then the candlestick, then the altar of incense, then the altar of
            burnt offering at the door, then the laver, then the court around the whole thing.
          </p>
          <p>
            That is not a random order. It follows the same shape God gave back in{" "}
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink>, when the ark and the mercy seat
            were the very first things described. The holiest object comes first in the instructions, and it comes
            first in the setup too. Everything else gets built outward from there.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. An Anointing That Is Commanded, Not Yet Done (verses 9 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before the first board is lifted, God tells Moses what the oil will be for. The tabernacle itself, every
            vessel inside it, the altar, and the laver are all set apart by anointing, made holy before they are ever
            used for a single sacrifice.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt put upon Aaron the holy garments, and anoint him, and sanctify him; that he may minister unto me in the priest's office."
          reference="Exodus 40:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That instruction reaches back to the clothing finished in{" "}
            <ArticleLink href="/blog/exodus-28-explained">Exodus 28</ArticleLink>, the gold threaded ephod, the
            breastplate, the robe with its bells. All of it was sewn and ready. Here it is finally commanded to be
            worn.
          </p>
          <p>
            💡 Read the verbs carefully. Every one of them, &quot;put,&quot; &quot;anoint,&quot; &quot;sanctify,&quot; is future tense. This
            section tells Moses what must happen to Aaron and his sons. It does not say he did it. The actual
            anointing of Aaron as priest does not happen in this chapter at all. That ceremony is recorded later, in
            Leviticus 8. Exodus 40 commands it. It does not perform it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Moses Obeys to the Letter (verses 16 to 33)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One sentence turns the chapter from instruction to action, and it answers its own question before the
            action even starts.
          </p>
        </div>
        <VerseQuote
          text="Thus did Moses: according to all that the LORD commanded him, so did he."
          reference="Exodus 40:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the date from the opening verses returns, no longer a plan but a fact.</p>
        </div>
        <VerseQuote
          text="And it came to pass in the first month in the second year, on the first day of the month, that the tabernacle was reared up."
          reference="Exodus 40:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The first month, the second year.</strong> Israel left Egypt in the first month of year one.
            This chapter sets the tabernacle up in the first month of year two, exactly one year, almost to the day,
            after the night of the Passover. The nation that walked out of slavery now has a place for God to live in
            the middle of its camp, on the anniversary of its own freedom.
          </p>
          <p>
            From there, verses 18 through 33 walk through the setup itself: the boards and bars and pillars first,
            then the tent and its covering, then the ark carried in behind the veil, then the table, the candlestick,
            the incense altar, the altar of burnt offering, the laver, and finally the court around it all. The exact
            sentence &quot;as the LORD commanded Moses&quot; closes this section six separate times.
          </p>
        </div>
        <VerseQuote
          text="And he brought the ark into the tabernacle, and set up the vail of the covering, and covered the ark of the testimony; as the LORD commanded Moses."
          reference="Exodus 40:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two more verses say almost the exact same thing in different words, verse 16 above and verse 23 further
            on. Count every line in this section that ends by confirming the command was kept, and the chapter makes
            the same point eight separate times in thirty eight verses. Nothing here is Moses improvising. Every
            single placement traces back to a word spoken on a mountain, chapters earlier.
          </p>
        </div>
        <VerseQuote
          text="And he reared up the court round about the tabernacle and the altar, and set up the hanging of the court gate. So Moses finished the work."
          reference="Exodus 40:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One man&apos;s name carries this whole section. Exodus 39 kept crediting &quot;they,&quot; the whole community of
            craftsmen. Here it is almost entirely &quot;he,&quot; Moses alone, walking from piece to piece, setting up what an
            entire camp had spent months building.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Glory Moses Could Not Walk Into (verses 34 and 35)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two verses, and the entire shape of the chapter changes. The man who just finished every last piece of
            construction suddenly cannot get through the door.
          </p>
        </div>
        <VerseQuote
          text="Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle. And Moses was not able to enter into the tent of the congregation, because the cloud abode thereon, and the glory of the LORD filled the tabernacle."
          reference="Exodus 40:34 and 35"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the same Moses who spent forty days on the mountain in God&apos;s presence and spoke with
            Him face to face.</strong> None of that history gets him through this door. The glory filling this tent
            is not a conversation. It is a presence so full that there is no room left for anyone standing in the
            doorway, Moses included.
          </p>
          <p>
            💡 Notice the repetition. Verse 34 says the glory filled the tabernacle. Verse 35 says it again, almost
            word for word, as the reason Moses could not enter. The text is not being careless. It wants the point
            stated twice: this is not a light haze or a faint sign. The whole structure is full.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Cloud That Decided Every Departure (verses 36 to 38)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The book of Exodus closes with the cloud settling into a permanent job.</p>
        </div>
        <VerseQuote
          text="And when the cloud was taken up from over the tabernacle, the children of Israel went onward in all their journeys: But if the cloud were not taken up, then they journeyed not till the day that it was taken up. For the cloud of the LORD was upon the tabernacle by day, and fire was on it by night, in the sight of all the house of Israel, throughout all their journeys."
          reference="Exodus 40:36 to 38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>From this point on, Israel does not decide when to move. The cloud does.</strong> A nation
            that had grumbled its way across the wilderness now has its entire travel schedule set by whether a
            cloud lifts or stays put. Cloud by day, fire by night, is exactly the pattern{" "}
            <ArticleLink href="/blog/exodus-13-explained">Exodus 13</ArticleLink> introduced the night Israel first
            left Egypt. The book that opened with that pillar leading a frightened crowd out of slavery closes with
            the same pillar now resting on a finished house built for it.
          </p>
          <p>
            Exodus ends here, mid journey, with the camp watching the sky instead of celebrating. Everything this
            chapter has been building toward is a people learning to live by a presence they cannot control and
            cannot ignore.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 40 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why could Moses not enter a tent he had helped design and had already stood near many times?</strong>{" "}
            The text does not explain the mechanics, only the fact. Moses had met with God on the mountain and at a
            temporary tent of meeting outside the camp before this one existed. This is different. The glory here is
            not a visit. It is a filling, total enough that nothing else fits inside with it, not even the man who
            had been closest to God of anyone alive. The same pattern repeats centuries later when Solomon&apos;s temple
            is finished, and the priests cannot stay inside to minister because the glory of the LORD has filled the
            house.
          </p>
          <p>
            <strong>Why does the date matter enough to be stated twice, in verse 2 and again in verse 17?</strong>{" "}
            Exodus 12:2 had already marked this same month as the beginning of Israel&apos;s calendar, the month of the
            Passover and the exodus from Egypt.
          </p>
          <VerseQuote
            text="This month shall be unto you the beginning of months: it shall be the first month of the year to you."
            reference="Exodus 12:2"
          />
          <p>
            A full year after that first Passover night, on the same month, the tabernacle rises. The calendar itself
            becomes a way of saying that the God who rescued Israel from Egypt is the same God now living in the
            middle of their camp, exactly on schedule.
          </p>
          <p>
            <strong>Why does Exodus end with a cloud instead of a celebration?</strong> No feast, no song, no
            crowd shouting closes this book. It ends with a structure so full of God&apos;s presence that the one man
            who built it cannot walk inside. That ending is not an anticlimax. It is the whole point of everything
            the book has been moving toward: a people who could not survive a single plague on their own now has God
            living among them, close enough to see, too holy to simply walk up to.
          </p>
          <p>
            <strong>Does Moses ever get to go inside once the glory fills it?</strong> Exodus 40 does not say. The
            very next verse in Scripture after this chapter, the opening line of Leviticus, answers it without
            drawing attention to the answer: the LORD calls to Moses out of the tabernacle itself. Whatever kept him
            out at the end of Exodus 40 did not keep him out forever.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 40
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 40:34 and 35</h3>
        <VerseQuote
          text="Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle. And Moses was not able to enter into the tent of the congregation, because the cloud abode thereon, and the glory of the LORD filled the tabernacle."
          reference="Exodus 40:34 and 35"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The whole book of Exodus has been moving toward this moment: a tent built by human hands, now too full of
          God&apos;s presence for even Moses to enter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 40:16</h3>
        <VerseQuote
          text="Thus did Moses: according to all that the LORD commanded him, so did he."
          reference="Exodus 40:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One sentence summing up months of work. Every board, curtain, and gold fitting traced back to this single
          standard: did it match what was commanded.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 40:21</h3>
        <VerseQuote
          text="And he brought the ark into the tabernacle, and set up the vail of the covering, and covered the ark of the testimony; as the LORD commanded Moses."
          reference="Exodus 40:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The holiest object in Israel&apos;s possession, placed exactly where it was always meant to go, behind the veil
          that kept it set apart.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 40:38</h3>
        <VerseQuote
          text="For the cloud of the LORD was upon the tabernacle by day, and fire was on it by night, in the sight of all the house of Israel, throughout all their journeys."
          reference="Exodus 40:38"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The final verse of Exodus. A whole nation&apos;s travel plans, from this point forward, handed over to a cloud
          and a fire that nobody on the ground controlled.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 40
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 40 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 40 records Moses setting up the finished tabernacle on God&apos;s exact command, piece by piece, exactly
          one year after Israel left Egypt. It closes with the glory of the LORD filling the tabernacle so completely
          that Moses cannot enter it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses set up the tabernacle instead of the craftsmen who built it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not explain the choice directly, but it fits the pattern of the whole book. God gave the
          original instructions to Moses alone on the mountain, so Moses is the one who personally confirms the
          finished parts are assembled exactly as he first received them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Moses was not able to enter the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 40:35 says the cloud and the glory of the LORD filled the tabernacle so fully that Moses could not
          go in. The chapter does not describe the sensation, only the result. The presence of God left no room for
          him to stand inside with it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Aaron anointed as priest in Exodus 40?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Exodus 40:12 to 15 commands that Aaron and his sons be washed, clothed, and anointed, but the chapter
          never records it happening. That ceremony is carried out later, in Leviticus 8.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the first day of the first month matter in Exodus 40?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:2 marks that same month as the start of Israel&apos;s calendar, tied to the Passover and the exodus
          from Egypt. The tabernacle rises on that same month exactly one year later, tying the nation&apos;s freedom and
          God&apos;s presence among them to the same point on the calendar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many times does &quot;as the LORD commanded Moses&quot; appear in Exodus 40?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The exact phrase appears six times, in verses 19, 21, 25, 27, 29, and 32. Two more verses, 16 and 23, say
          nearly the same thing in slightly different words, bringing the total count of the chapter stating the
          command was kept to eight times across thirty eight verses.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the book of Exodus end with a cloud instead of Israel entering the Promised Land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus is the story of God rescuing a people and making a place to live among them, not the story of
          Israel reaching Canaan. That journey continues in Numbers. Exodus ends once its own goal, God&apos;s presence
          settled in the middle of the camp, is reached.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 40 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A tent built by human hands became too full of God&apos;s glory for anyone to enter it freely. John&apos;s Gospel
          describes the Word becoming flesh and dwelling among people in a far closer way than any tent ever could.
        </p>
        <VerseQuote
          text="And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
          reference="John 1:14"
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 40 does not end the book with a party. It ends it with a presence too big to walk into.</p>
          <p>
            📌 <strong>Obedience came before glory, not after it.</strong> Every board went exactly where it was
            commanded, long before the cloud ever appeared. The glory did not reward improvisation. It filled a
            house built to the exact measurements God gave.
          </p>
          <p>
            📌 <strong>Nearness to God and standing in God&apos;s presence are not the same thing.</strong> Moses had
            climbed the mountain and spoken with God face to face, and it still did not let him walk through this
            door. Access to God is always on God&apos;s terms, never earned by history or familiarity.
          </p>
          <p>
            📌 <strong>A people who could not keep their own direction were handed a cloud instead.</strong> Israel
            stopped deciding when to move. They watched the sky, and they moved when God moved.
          </p>
          <p>
            You will probably never build a tabernacle. But you likely know what it is to do everything right and
            still find yourself outside a door you expected to walk straight through.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Exodus 40:34 and 35 again today, and ask whether you are waiting on your own timing or God&apos;s, the
            next time a door does not open the moment you expect it to.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
