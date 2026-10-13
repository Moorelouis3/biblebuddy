import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-30-explained", {
  title: "Exodus 30 Explained: Incense, Ransom Money, and Anointing Oil",
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

export default function ExodusThirtyExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-30-explained"
      title={<>📖 Exodus 30 Explained: Incense, Ransom Money, and Anointing Oil</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>An altar nobody ever brings a sacrifice to. A tax that costs the rich man and the poor man the exact same coin. A perfume no one else on earth is allowed to wear.</p>
            <p>
              <strong>Exodus 30 explained</strong> is the chapter that closes out God&apos;s instructions for the
              tabernacle with four pieces that do not fit neatly together at first glance: a gold altar built only
              for smoke, a half shekel collected whenever Israel is counted, a bronze basin for washing, and two
              recipes, one oil and one incense, that it is a crime for anyone else to copy.
            </p>
            <p>Maybe you have skimmed past this chapter assuming it was just more furniture.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does lighting a lamp require burning incense right alongside it, every single morning and evening?</li>
            <li>❓ What does counting the population have to do with a ransom for your soul?</li>
            <li>❓ Why would washing your hands and feet be a matter of life and death for a priest?</li>
            <li>❓ And why does God care if someone else wants to smell like the tabernacle?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every law in Exodus 30 protects the same thing: a holiness that cannot be casual,
              borrowed, or bought at a discount.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the altar of incense and its daily
              rhythm, the atonement money collected at every census, the bronze laver that stood between the
              altar and the tent, the holy anointing oil poured on everything that would serve God, and the holy
              incense that no one outside the tabernacle was permitted to make for themselves.
            </p>
            <p>None of these four pieces are filler before the next big story. Each one answers a question Israel would have actually asked.</p>
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
            <ArticleLink href="/blog/exodus-29-explained">Exodus 29</ArticleLink> ordained Aaron and his sons:
            washed, dressed, anointed, marked with blood on the ear, the thumb, and the toe, and set apart across
            seven straight days. By the end of that chapter, Israel finally had priests who were qualified to
            serve.
          </p>
          <p>
            Qualified priests still needed the rest of the furniture finished and a few questions answered before
            daily worship could actually begin. What do you burn to fill the tent with a pleasing smell twice a
            day? What happens when the whole camp gets counted, the way armies and nations always eventually get
            counted? Where do Aaron and his sons wash before they walk toward the altar God described back in{" "}
            <ArticleLink href="/blog/exodus-27-explained">Exodus 27</ArticleLink>? Exodus 30 answers each one, then
            closes with two formulas, oil and incense, that only the tabernacle was ever allowed to use.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 30 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Altar of Incense (verses 1 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a small altar, a cubit square and two cubits tall, built for a job none of the other furniture does.</p>
        </div>
        <VerseQuote
          text="And thou shalt make an altar to burn incense upon: of shittim wood shalt thou make it."
          reference="Exodus 30:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Wood covered in gold, with horns on its corners like the bronze altar outside, but this one never
            touches blood or carries a carcass. It has one job, and the chapter says exactly where it stands.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt put it before the vail that is by the ark of the testimony, before the mercy seat that is over the testimony, where I will meet with thee."
          reference="Exodus 30:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            As close to the <ArticleLink href="/blog/exodus-25-explained">ark and the mercy seat</ArticleLink> as
            anything could get without actually being inside the veil. Then comes the rhythm this altar runs on.
          </p>
        </div>
        <VerseQuote
          text="And Aaron shall burn thereon sweet incense every morning: when he dresseth the lamps, he shall burn incense upon it."
          reference="Exodus 30:7"
        />
        <VerseQuote
          text="Ye shall offer no strange incense thereon, nor burnt sacrifice, nor meat offering; neither shall ye pour drink offering thereon."
          reference="Exodus 30:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Lighting the lamps and burning incense happen together, morning and evening, for as long as
            the tabernacle stands.</strong> And verse 9 is specific about what this altar is not for. No sacrifice,
            no grain offering, no drink offering, nothing but the one incense formula God names later in the
            chapter. Once a year it gets its own atonement.
          </p>
        </div>
        <VerseQuote
          text="And Aaron shall make an atonement upon the horns of it once in a year with the blood of the sin offering of atonements: once in the year shall he make atonement upon it throughout your generations: it is most holy unto the LORD."
          reference="Exodus 30:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That yearly atonement is the day later generations would call the Day of Atonement. Even an altar that
            never touches blood the rest of the year still needs cleansing once, because nothing holy stays
            untouched by sin just by standing in a holy place.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Atonement Money: A Ransom Counted in Half Shekels (verses 11 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The scene shifts from the tent to the whole camp, and from incense to a number no one in Israel could avoid.</p>
        </div>
        <VerseQuote
          text="When thou takest the sum of the children of Israel after their number, then shall they give every man a ransom for his soul unto the LORD, when thou numberest them; that there be no plague among them, when thou numberest them."
          reference="Exodus 30:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A census was never going to be a neutral headcount in Israel. The text ties numbering the people
            directly to the danger of a plague, and it names the fix before the counting even starts.
          </p>
        </div>
        <VerseQuote
          text="The rich shall not give more, and the poor shall not give less than half a shekel, when they give an offering unto the LORD, to make an atonement for your souls."
          reference="Exodus 30:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>One flat price, for every man twenty years old and up, rich or poor.</strong> A ransom for a
            soul was never going to be sold on a sliding scale. The money itself became a memorial, folded into
            the service of the tabernacle rather than spent and forgotten.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Bronze Laver: Washing Before Serving (verses 17 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Next comes a basin, placed in one exact spot for one exact reason.</p>
        </div>
        <VerseQuote
          text="Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar, and thou shalt put water therein."
          reference="Exodus 30:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Between the tent and the altar means Aaron and his sons pass it every time they move from one to the
            other. The chapter is blunt about what happens if they skip it.
          </p>
        </div>
        <VerseQuote
          text="When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations."
          reference="Exodus 30:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Twice in two verses the text repeats the same stakes: that they die not.</strong> This was
            never a hygiene rule about dusty feet. Approaching a holy God unwashed was dangerous, and the laver
            stood as the one checkpoint no priest, not even Aaron himself, was allowed to walk past.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Holy Anointing Oil (verses 22 to 33)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God hands Moses a recipe next, and it is specific down to the shekel.</p>
        </div>
        <VerseQuote
          text="Take thou also unto thee principal spices, of pure myrrh five hundred shekels, and of sweet cinnamon half so much, even two hundred and fifty shekels, and of sweet calamus two hundred and fifty shekels, And of cassia five hundred shekels, after the shekel of the sanctuary, and of oil olive an hin."
          reference="Exodus 30:23 and 24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Myrrh, cinnamon, calamus, cassia, and a full hin of olive oil, measured out and mixed into one formula. Then this one oil touches nearly everything in the tent.</p>
        </div>
        <VerseQuote
          text="And thou shalt anoint the tabernacle of the congregation therewith, and the ark of the testimony, And the table and all his vessels, and the candlestick and his vessels, and the altar of incense, And the altar of burnt offering with all his vessels, and the laver and his foot."
          reference="Exodus 30:26 to 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Every single piece this chapter and the ones before it described gets touched by the same oil before it counts as holy. Then the oil moves from furniture to men.</p>
        </div>
        <VerseQuote
          text="And thou shalt anoint Aaron and his sons, and consecrate them, that they may minister unto me in the priest’s office."
          reference="Exodus 30:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>One oil, poured on the ark, the altar, the laver, and Aaron himself, puts the furniture and
            the man under the exact same word: holy.</strong> Then God draws a hard line around that formula.
          </p>
        </div>
        <VerseQuote
          text="Upon man’s flesh shall it not be poured, neither shall ye make any other like it, after the composition of it: it is holy, and it shall be holy unto you."
          reference="Exodus 30:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ordinary skin never gets this oil, and the recipe itself is off limits to copy. The penalty for ignoring that line is stated plainly a verse later: being cut off from the people.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Holy Incense, Off Limits to Everyone Else (verses 34 to 38)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends the same way it opened, back at the altar of incense, this time with the formula that goes on top of it.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Take unto thee sweet spices, stacte, and onycha, and galbanum; these sweet spices with pure frankincense: of each shall there be a like weight:"
          reference="Exodus 30:34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four spices in equal weight, ground fine and placed before the ark, and the chapter repeats the same restriction it just placed on the oil.</p>
        </div>
        <VerseQuote
          text="And as for the perfume which thou shalt make, ye shall not make to yourselves according to the composition thereof: it shall be unto thee holy for the LORD."
          reference="Exodus 30:37"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>The last word of the chapter is the same penalty as the oil: cut off from his people.</strong>{" "}
            Something made to sit before the Lord alone was never meant to double as a personal fragrance. Holiness
            in this chapter is never only about what something is made of. It is about what it is kept for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 30 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why would a simple headcount of the population need a ransom to avoid a plague?</strong> The
            text does not explain the mechanism, only the command. Scripture later shows exactly how seriously
            that connection was taken. Years afterward, David took a census of Israel without this kind of
            atonement in view, and the result was devastating.
          </p>
        </div>
        <VerseQuote
          text="And again the anger of the LORD was kindled against Israel, and he moved David against them to say, Go, number Israel and Judah."
          reference="2 Samuel 24:1"
        />
        <VerseQuote
          text="So the LORD sent a pestilence upon Israel from the morning even to the time appointed: and there died of the people from Dan even to Beersheba seventy thousand men."
          reference="2 Samuel 24:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Exodus 30:12 names the exact danger a census carried and gives Moses a way to meet it. That danger was
            not hypothetical, as David&apos;s own census centuries later shows in painful detail.
          </p>
          <p>
            <strong>Why were the oil and the incense so strictly off limits to copy?</strong> Exodus 30:9 already
            warned against &quot;strange incense,&quot; and the warning was not decoration. Leviticus records what
            happened the very first time two priests ignored it.
          </p>
        </div>
        <VerseQuote
          text="And Nadab and Abihu, the sons of Aaron, took either of them his censer, and put fire therein, and put incense thereon, and offered strange fire before the LORD, which he commanded them not."
          reference="Leviticus 10:1"
        />
        <VerseQuote
          text="And there went out fire from the LORD, and devoured them, and they died before the LORD."
          reference="Leviticus 10:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two of Aaron&apos;s own sons, the same men consecrated in{" "}
            <ArticleLink href="/blog/exodus-29-explained">Exodus 29</ArticleLink>, died for exactly the kind of
            substitution Exodus 30 had already forbidden. The strict line around the recipe was never about
            keeping a secret. It was about keeping something set apart from being treated as ordinary.
          </p>
          <p>
            <strong>Does the half shekel ransom connect to anything in the New Testament?</strong> It likely sits
            behind a story much later in Israel&apos;s history, the annual temple tax collected from Jewish men,
            which Jesus addresses directly in Matthew&apos;s Gospel.
          </p>
        </div>
        <VerseQuote
          text="And when they were come to Capernaum, they that received tribute money came to Peter, and said, Doth not your master pay tribute?"
          reference="Matthew 17:24"
        />
        <VerseQuote
          text="Notwithstanding, lest we should offend them, go thou to the sea, and cast an hook, and take up the fish that first cometh up; and when thou hast opened his mouth, thou shalt find a piece of money: that take, and give unto them for me and thee."
          reference="Matthew 17:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus pays it rather than disputing it, even while making the larger point that He, as the Son, owed
            nothing. The one time flat ransom of Exodus 30 had grown by Jesus&apos; day into a yearly expectation,
            and He meets it without making a scene.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 30
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 30:12</h3>
        <VerseQuote
          text="When thou takest the sum of the children of Israel after their number, then shall they give every man a ransom for his soul unto the LORD, when thou numberest them; that there be no plague among them, when thou numberest them."
          reference="Exodus 30:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that ties a census directly to a ransom for the soul, a connection 2 Samuel 24 shows was
          anything but symbolic.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 30:15</h3>
        <VerseQuote
          text="The rich shall not give more, and the poor shall not give less than half a shekel, when they give an offering unto the LORD, to make an atonement for your souls."
          reference="Exodus 30:15"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A flat price for every soul, with no discount for poverty and no premium for wealth. Atonement in this
          chapter was never for sale by the size of a bank account.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 30:20 and 21</h3>
        <VerseQuote
          text="When they go into the tabernacle of the congregation, they shall wash with water, that they die not; or when they come near to the altar to minister, to burn offering made by fire unto the LORD: So they shall wash their hands and their feet, that they die not: and it shall be a statute for ever to them, even to him and to his seed throughout their generations."
          reference="Exodus 30:20 and 21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The clearest statement in the chapter that approaching God was never casual. The same warning repeats
          twice in two verses: that they die not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 30:32</h3>
        <VerseQuote
          text="Upon man’s flesh shall it not be poured, neither shall ye make any other like it, after the composition of it: it is holy, and it shall be holy unto you."
          reference="Exodus 30:32"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The line drawn around the anointing oil, a line Leviticus 10 shows was not a bluff when Aaron&apos;s own
          sons crossed something similar with the incense.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Mark 10:45</h3>
        <VerseQuote
          text="For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many."
          reference="Mark 10:45"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same word Exodus 30 uses for the half shekel, ransom, reappears centuries later in Jesus&apos; own
          description of why He came, this time paid in full rather than collected once a census.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 30
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Exodus 30 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 30 covers four separate instructions: the gold altar of incense and its morning and evening
          rhythm, the half shekel atonement money collected whenever Israel was counted, the bronze laver Aaron and
          his sons washed at before serving, and the exact recipes for the holy anointing oil and the holy incense,
          both of which no one outside the tabernacle was permitted to copy.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the altar of incense used for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It stood just outside the veil, nearest the ark and the mercy seat, and carried only one offering: sweet
          incense burned by Aaron every morning and evening. Exodus 30:9 forbids any sacrifice, grain offering, or
          drink offering on it, keeping its one purpose from ever being blurred.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the atonement money in Exodus 30?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A half shekel collected from every Israelite man twenty years old and up whenever the nation was
          numbered, described in Exodus 30:12 to 16 as a ransom for the soul meant to prevent a plague. The money
          itself went toward the service of the tabernacle.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the rich and the poor pay the same amount?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 30:15 states it directly: the rich were not to give more, and the poor were not to give less. A
          ransom for a soul was priced the same for every soul, regardless of what a person could afford.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the bronze laver for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A basin of water placed between the tabernacle and the altar where Aaron and his sons washed their hands
          and feet before entering the tent or approaching the altar. Exodus 30:20 and 21 ties skipping this wash
          directly to death, making it a required step rather than a suggestion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What spices were in the holy anointing oil?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Myrrh, sweet cinnamon, sweet calamus, and cassia, mixed into a full hin of olive oil according to Exodus
          30:23 and 24. This same oil anointed the tabernacle, its furniture, and Aaron and his sons.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t anyone else use the holy anointing oil or incense?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 30:32 and 37 both forbid copying the formulas or putting the oil on ordinary skin, with the
          penalty of being cut off from the people. Leviticus 10 shows the seriousness behind that line when two of
          Aaron&apos;s own sons offered incense God had not commanded and died for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the atonement money related to the temple tax in the New Testament?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It likely stands behind it. By the time of Matthew 17:24 to 27, Jewish men paid an annual tribute that
          traces back to this same half shekel principle. Jesus pays it rather than disputing the custom, even
          while making clear He personally owed nothing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Day of Atonement mentioned in Exodus 30?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 30:10 commands a yearly atonement on the horns of the incense altar using the blood of a sin
          offering, the earliest mention of the day Israel would later observe as the Day of Atonement.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 30 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Mark 10:45 uses the same word Exodus 30 uses for the half shekel, ransom, to describe why Jesus came.
          Psalm 141:2 and Revelation 5:8 both later picture incense as prayer rising to God, the same image this
          chapter attaches to Aaron&apos;s morning and evening offering.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 30 reads like a list of loose ends. Underneath the list, every piece is protecting the same thing.</p>
          <p>
            📌 <strong>Holiness in this chapter is never about what something is made of.</strong> Gold, spices,
            and olive oil are ordinary materials. What made the altar, the oil, and the incense holy was that God
            set them apart for one use only.
          </p>
          <p>
            📌 <strong>A ransom for a soul was never priced by income.</strong> Rich and poor paid the exact same
            half shekel, because what the money bought was never for sale on a sliding scale to begin with.
          </p>
          <p>
            📌 <strong>Nothing in this chapter was casual, and Leviticus 10 shows what happened when two priests
            treated it that way.</strong> Washing before entering, burning only the commanded incense, keeping the
            holy oil off ordinary skin, every rule protected the same line between common and set apart.
          </p>
          <p>
            You will never carry a half shekel to a census or wash at a bronze laver. But you live after a ransom
            that was paid once, for everyone, by a Savior who met the full cost Himself rather than asking you to.
          </p>
          <p>So here is your one next step.</p>
          <p>Next time you are tempted to treat something holy as ordinary, a habit, a convenience, a shortcut, stop and ask what line you might be stepping over without even noticing.</p>
          <p>Aaron&apos;s sons found out the hard way that the line was real. You get to take it seriously before you ever have to find out the same way.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
