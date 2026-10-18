import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-7-explained", {
  title: "Leviticus 7 Explained: The Peace Offering and the Law That Closes the Code",
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

export default function LeviticusSevenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-7-explained"
      title={<>📖 Leviticus 7 Explained: The Peace Offering and the Law That Closes the Code</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Seven chapters of law. One final line that ties every one of them together.</p>
            <p>
              <strong>Leviticus 7 explained</strong> finishes the trespass offering&apos;s rules
              for the priest, finally explains the peace offering in full, forbids two things
              Israel was never allowed to eat no matter how hungry they were, and then closes the
              whole section with a single sentence that says where all seven chapters actually
              came from.
            </p>
            <p>Maybe you assumed a thanksgiving meal and a vow fulfilled were treated the same way.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why could a thank offering only be eaten the same day, while a vow offering had until the next morning?</li>
            <li>❓ Why was eating the fat of an animal forbidden, when the fat itself was the part God claimed?</li>
            <li>❓ Why does a wave and a heave sound like the same motion, but belong to different parts of the animal?</li>
            <li>❓ And why does this chapter end by naming the mountain where all of it was given?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 7 is the chapter that finally reveals this was never five
              separate laws. It was one law, given on one mountain, to one man.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the trespass offering&apos;s
              last details, what a priest got to keep for himself, the three kinds of peace
              offering and the clock each one ran on, the fat and the blood Israel could never
              touch, the wave and the heave that paid the priesthood, and the sentence that closes
              the door on the entire sacrificial code.
            </p>
            <p>Read slowly. This chapter is the fine print that makes six earlier chapters make sense.</p>
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
            <ArticleLink href="/blog/leviticus-6-explained">Leviticus 6</ArticleLink> turned from
            the worshipper to the priest partway through, laying out the law of the burnt
            offering, the meat offering, and the sin offering from Aaron&apos;s side of the altar
            instead of the worshipper&apos;s. Leviticus 7 keeps that same camera angle. It opens
            mid-thought, still explaining the trespass offering the chapter before it had only
            just introduced, then moves on to a sacrifice no one has fully explained yet, the
            peace offering first named back in{" "}
            <ArticleLink href="/blog/leviticus-3-explained">Leviticus 3</ArticleLink>.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 7 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Finishing the Trespass Offering (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter opens mid-sentence, still on the subject Leviticus 6 raised: the law of
            the trespass offering.
          </p>
        </div>
        <VerseQuote
          text="Likewise this is the law of the trespass offering: it is most holy."
          reference="Leviticus 7:1"
        />
        <VerseQuote
          text="In the place where they kill the burnt offering shall they kill the trespass offering: and the blood thereof shall he sprinkle round about upon the altar."
          reference="Leviticus 7:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice the word &quot;sprinkle round about,&quot; not &quot;pour at the
            bottom.&quot;</strong> The sin offering&apos;s blood in{" "}
            <ArticleLink href="/blog/leviticus-4-explained">Leviticus 4</ArticleLink> was poured
            out at the base of the altar. Here it is sprinkled around the altar itself, a
            different motion for a different offering, even though both deal with real guilt.
          </p>
          <p>The fat comes off next, in language already familiar from every offering before it.</p>
        </div>
        <VerseQuote
          text="And he shall offer of it all the fat thereof; the rump, and the fat that covereth the inwards, And the two kidneys, and the fat that is on them, which is by the flanks, and the caul that is above the liver, with the kidneys, it shall he take away: And the priest shall burn them upon the altar for an offering made by fire unto the LORD: it is a trespass offering."
          reference="Leviticus 7:3 to 5"
        />
        <VerseQuote
          text="Every male among the priests shall eat thereof: it shall be eaten in the holy place: it is most holy."
          reference="Leviticus 7:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then comes the one verse that ties the trespass offering directly to the sin offering
            Leviticus 4 through 6 already covered.
          </p>
        </div>
        <VerseQuote
          text="As the sin offering is, so is the trespass offering: there is one law for them: the priest that maketh atonement therewith shall have it."
          reference="Leviticus 7:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>&quot;There is one law for them&quot; is the chapter&apos;s first hint of
            where it is actually headed.</strong> Four whole chapters built up detailed, separate
            instructions for the sin offering and the trespass offering, and now the text openly
            says the two run on one shared rule. The priest who performs the atonement keeps the
            animal. That single sentence settles a question five chapters of case law never spelled
            out directly.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. What Else Belonged to the Priest (verses 8 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three short verses settle three separate questions about a priest&apos;s own pay for
            doing his job.
          </p>
        </div>
        <VerseQuote
          text="And the priest that offereth any man's burnt offering, even the priest shall have to himself the skin of the burnt offering which he hath offered."
          reference="Leviticus 7:8"
        />
        <VerseQuote
          text="And all the meat offering that is baken in the oven, and all that is dressed in the fryingpan, and in the pan, shall be the priest's that offereth it."
          reference="Leviticus 7:9"
        />
        <VerseQuote
          text="And every meat offering, mingled with oil, and dry, shall all the sons of Aaron have, one as much as another."
          reference="Leviticus 7:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Look at the difference between verse 9 and verse 10.</strong> A grain gift
            already baked in an oven or fried in a pan belongs to the specific priest who handled
            it that day. A grain gift still raw, mixed with oil, belongs to the whole priesthood
            equally, &quot;one as much as another.&quot; One reward goes to the man who did the
            work. The other is shared no matter who was on duty.
          </p>
          <p>
            The skin in verse 8 answers a practical question{" "}
            <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink> never raised.
            Every burnt offering there was described whole, laid on the altar and consumed by
            fire, but a hide does not burn the way flesh does. It was useful leather, and the text
            settles who kept it without ceremony.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Three Kinds of Peace Offering, Three Different Deadlines (verses 11 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Here the chapter finally returns to a sacrifice named four chapters ago and never
            fully explained.
          </p>
        </div>
        <VerseQuote
          text="And this is the law of the sacrifice of peace offerings, which he shall offer unto the LORD."
          reference="Leviticus 7:11"
        />
        <VerseQuote
          text="If he offer it for a thanksgiving, then he shall offer with the sacrifice of thanksgiving unleavened cakes mingled with oil, and unleavened wafers anointed with oil, and cakes mingled with oil, of fine flour, fried. Besides the cakes, he shall offer for his offering leavened bread with the sacrifice of thanksgiving of his peace offerings."
          reference="Leviticus 7:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Leaven shows up here almost nowhere else in the offering code. A thanksgiving peace
            offering came with both unleavened cakes and ordinary leavened bread on the side,
            bread that looked like what a family actually ate at home.
          </p>
          <p>The flesh of that thanksgiving meal came with a strict clock attached.</p>
        </div>
        <VerseQuote
          text="And the flesh of the sacrifice of his peace offerings for thanksgiving shall be eaten the same day that it is offered; he shall not leave any of it until the morning."
          reference="Leviticus 7:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A vow offering or a freewill offering, the second and third kinds of peace offering,
            got one extra day.
          </p>
        </div>
        <VerseQuote
          text="But if the sacrifice of his offering be a vow, or a voluntary offering, it shall be eaten the same day that he offereth his sacrifice: and on the morrow also the remainder of it shall be eaten: But the remainder of the flesh of the sacrifice on the third day shall be burnt with fire."
          reference="Leviticus 7:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Leviticus 7 never explains why a thanksgiving meal got one day and a vow
            or freewill offering got two.</strong> What the text does make plain is that the
            difference was real and enforced, not a loose guideline. Waiting past the deadline
            carried a penalty the chapter does not soften at all.
          </p>
        </div>
        <VerseQuote
          text="And if any of the flesh of the sacrifice of his peace offerings be eaten at all on the third day, it shall not be accepted, neither shall it be imputed unto him that offereth it: it shall be an abomination, and the soul that eateth of it shall bear his iniquity."
          reference="Leviticus 7:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;Abomination&quot; is a strong word for leftovers.</strong> An offering
            brought in good faith, correctly killed and correctly shared for two full days, still
            turned into something God calls detestable the moment it sat for a third. The time
            limit was not a suggestion about freshness. It was part of what made the sacrifice
            itself acceptable.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Touching Something Unclean Changes Everything (verses 19 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Two more ways the peace offering&apos;s meat could be ruined, neither one about how
            long it sat.
          </p>
        </div>
        <VerseQuote
          text="And the flesh that toucheth any unclean thing shall not be eaten; it shall be burnt with fire: and as for the flesh, all that be clean shall eat thereof."
          reference="Leviticus 7:19"
        />
        <VerseQuote
          text="But the soul that eateth of the flesh of the sacrifice of peace offerings, that pertain unto the LORD, having his uncleanness upon him, even that soul shall be cut off from his people."
          reference="Leviticus 7:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Cut off from his people&quot; is a far heavier penalty than simply
            losing a meal.</strong> Scripture uses that phrase across the law for the most serious
            breaks with the community, and here it falls on a worshipper who ate holy meat while he
            himself was unclean, not on meat that was handled carelessly by someone else. The
            uncleanness belonged to the person, and he carried the consequence personally.
          </p>
          <p>The same penalty falls on anyone who merely touches uncleanness and then eats this meat anyway.</p>
        </div>
        <VerseQuote
          text="Moreover the soul that shall touch any unclean thing, as the uncleanness of man, or any unclean beast, or any abominable unclean thing, and eat of the flesh of the sacrifice of peace offerings, which pertain unto the LORD, even that soul shall be cut off from his people."
          reference="Leviticus 7:21"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Two Things Israel Could Never Eat: Fat and Blood (verses 22 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter turns from one specific offering to a rule that reached every table in
            Israel, not only the altar.
          </p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, saying, Ye shall eat no manner of fat, of ox, or of sheep, or of goat."
          reference="Leviticus 7:23"
        />
        <VerseQuote
          text="And the fat of the beast that dieth of itself, and the fat of that which is torn with beasts, may be used in any other use: but ye shall in no wise eat of it."
          reference="Leviticus 7:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Fat from an animal that died on its own or was killed by a predator was never fit
            for the altar at all, yet even that fat still could not be eaten. It could be put to
            any other use, for tallow, for fuel, for anything but a meal. The fat itself, not just
            the altar offering made from it, was off the table.
          </p>
        </div>
        <VerseQuote
          text="For whosoever eateth the fat of the beast, of which men offer an offering made by fire unto the LORD, even the soul that eateth it shall be cut off from his people."
          reference="Leviticus 7:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The fat was never ordinary food, because it was the one part God had
            already claimed for the altar fire.</strong> The sin offering and the peace offering
            both set the fat apart from the rest of the animal and burned it on the altar as the
            LORD&apos;s own portion. Eating it was not a dietary preference. It was taking back
            something already given away.
          </p>
          <p>Blood gets the same flat prohibition, stretched even wider than fat.</p>
        </div>
        <VerseQuote
          text="Moreover ye shall eat no manner of blood, whether it be of fowl or of beast, in any of your dwellings."
          reference="Leviticus 7:26"
        />
        <VerseQuote
          text="Whatsoever soul it be that eateth any manner of blood, even that soul shall be cut off from his people."
          reference="Leviticus 7:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This was not a new rule invented for Israel alone. God had already told Noah the same
            thing, generations before Moses or the tabernacle existed.
          </p>
        </div>
        <VerseQuote text="But flesh with the life thereof, which is the blood thereof, shall ye not eat." reference="Genesis 9:4" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Blood represented life itself, so eating it was never treated as a minor
            dietary rule.</strong> The ban on blood reaches back before Sinai and outlasts it too.
            Centuries later, the apostles still asked new Gentile believers to abstain from blood,
            long after the rest of the sacrificial law had been fulfilled in Christ.
          </p>
        </div>
        <VerseQuote
          text="But that we write unto them, that they abstain from pollutions of idols, and from fornication, and from things strangled, and from blood."
          reference="Acts 15:20"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Wave and the Heave: How the Priest Got Paid (verses 28 to 34)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter returns to the peace offering one more time, to settle exactly which piece
            of the animal belonged to which priest.
          </p>
        </div>
        <VerseQuote
          text="His own hands shall bring the offerings of the LORD made by fire, the fat with the breast, it shall he bring, that the breast may be waved for a wave offering before the LORD."
          reference="Leviticus 7:30"
        />
        <VerseQuote
          text="And the priest shall burn the fat upon the altar: but the breast shall be Aaron's and his sons'."
          reference="Leviticus 7:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The worshipper carries the breast himself, with his own hands, specifically
            so it can be &quot;waved&quot; before the LORD.</strong> The word pictures the priest
            moving the offering toward the altar and back again, presenting it to God before it
            ever becomes food for anyone. Only after that motion does the breast become Aaron and
            his sons&apos; own portion, shared across the whole priesthood rather than one man
            alone.
          </p>
          <p>The shoulder works differently, and belongs to one priest specifically.</p>
        </div>
        <VerseQuote
          text="And the right shoulder shall ye give unto the priest for an heave offering of the sacrifices of your peace offerings."
          reference="Leviticus 7:32"
        />
        <VerseQuote
          text="He among the sons of Aaron, that offereth the blood of the peace offerings, and the fat, shall have the right shoulder for his part."
          reference="Leviticus 7:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A heave offering is widely understood as a portion lifted upward rather than moved
            back and forth, a different motion from the wave. The breast, waved, went to the whole
            priesthood. The shoulder, heaved, went to the one priest who actually did the work of
            offering that particular animal&apos;s blood and fat. Shared pay for the office, and
            direct pay for the labor, sitting side by side on the same animal.
          </p>
        </div>
        <VerseQuote
          text="For the wave breast and the heave shoulder have I taken of the children of Israel from off the sacrifices of their peace offerings, and have given them unto Aaron the priest and unto his sons by a statute for ever from among the children of Israel."
          reference="Leviticus 7:34"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. One Chapter, Seven Chapters, One Command From Sinai (verses 35 to 38)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter, and the whole unit it belongs to, closes with a single summarizing statement.</p>
        </div>
        <VerseQuote
          text="This is the portion of the anointing of Aaron, and of the anointing of his sons, out of the offerings of the LORD made by fire, in the day when he presented them to minister unto the LORD in the priest's office; Which the LORD commanded to be given them of the children of Israel, in the day that he anointed them, by a statute for ever throughout their generations."
          reference="Leviticus 7:35 and 36"
        />
        <VerseQuote
          text="This is the law of the burnt offering, of the meat offering, and of the sin offering, and of the trespass offering, and of the consecrations, and of the sacrifice of the peace offerings; Which the LORD commanded Moses in mount Sinai, in the day that he commanded the children of Israel to offer their oblations unto the LORD, in the wilderness of Sinai."
          reference="Leviticus 7:37 and 38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verse 37 names every offering this book has covered since chapter 1, in one
            breath, as a single law.</strong> Burnt offering, meat offering, sin offering,
            trespass offering, consecrations, peace offerings. Seven chapters that felt like five
            separate systems turn out, by the text&apos;s own final word, to be one body of
            instruction, given at one place, on one mountain.
          </p>
          <p>
            That detail, Sinai, named by name in the very last verse, answers a question a reader
            could easily lose track of across seven dense chapters. None of this was Moses&apos;
            own idea, developed over time by trial and error. It was commanded, complete, in the
            wilderness, before Israel ever reached the land these laws were meant to govern.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 7 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did a thanksgiving peace offering have to be eaten in one day, while a vow
            or freewill offering got two?</strong> Leviticus 7:15 to 17 states the two different
            deadlines without explaining the gap between them. What the text does make clear is
            that both limits were enforced the same way, by turning the meat into an abomination
            once the deadline passed. The chapter treats the difference as settled law, not as a
            detail left to a worshipper&apos;s own judgment.
          </p>
          <p>
            <strong>Why was the fat specifically forbidden to eat, when some animal fat is
            harmless to the body?</strong> Leviticus 7:23 to 25 bans it without giving a medical
            reason, and the text&apos;s own logic points elsewhere. The sin offering and the peace
            offering both burned the fat on the altar as the LORD&apos;s claimed portion. Verse 25
            frames eating it as taking back what had already been given to God, not as a concern
            about the food itself.
          </p>
          <p>
            <strong>Why does the blood prohibition in this chapter reach all the way back to
            Noah?</strong> Genesis 9:4 forbids eating blood generations before Sinai, and Leviticus
            7:26 and 27 repeat the same ban for Israel specifically. The consistency across that
            much time suggests this was never a ceremonial rule unique to the tabernacle system,
            which is also why Acts 15:20 still asks it of Gentile believers after the rest of the
            sacrificial code had been fulfilled in Christ.
          </p>
          <p>
            <strong>What exactly did &quot;cut off from his people&quot; mean for someone who ate
            holy meat while unclean?</strong> Leviticus 7:20 and 21 state the penalty without
            defining its exact form here. Elsewhere in the law the same phrase can describe
            excommunication from the community or, in the most serious cases, death, and Bible
            teachers differ on which this specific violation called for. What the text is clear
            about is the seriousness: this was never treated as a small infraction.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 7:7</h3>
        <VerseQuote
          text="As the sin offering is, so is the trespass offering: there is one law for them: the priest that maketh atonement therewith shall have it."
          reference="Leviticus 7:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that finally admits what four chapters of separate case law had been
          circling: the sin offering and trespass offering run on one shared rule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 7:18</h3>
        <VerseQuote
          text="And if any of the flesh of the sacrifice of his peace offerings be eaten at all on the third day, it shall not be accepted, neither shall it be imputed unto him that offereth it: it shall be an abomination, and the soul that eateth of it shall bear his iniquity."
          reference="Leviticus 7:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A sacrifice brought correctly and shared correctly for two full days still became
          detestable the moment it crossed into a third. The deadline was part of the offering.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 7:26 and 27</h3>
        <VerseQuote
          text="Moreover ye shall eat no manner of blood, whether it be of fowl or of beast, in any of your dwellings. Whatsoever soul it be that eateth any manner of blood, even that soul shall be cut off from his people."
          reference="Leviticus 7:26 and 27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A ban that predates Sinai by generations, going back to Noah, and outlasts the whole
          sacrificial system this chapter closes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 7:34</h3>
        <VerseQuote
          text="For the wave breast and the heave shoulder have I taken of the children of Israel from off the sacrifices of their peace offerings, and have given them unto Aaron the priest and unto his sons by a statute for ever from among the children of Israel."
          reference="Leviticus 7:34"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The priesthood&apos;s provision written directly into the peace offering itself, one
          portion shared by every priest and one portion earned by the man who did the work.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 7:37 and 38</h3>
        <VerseQuote
          text="This is the law of the burnt offering, of the meat offering, and of the sin offering, and of the trespass offering, and of the consecrations, and of the sacrifice of the peace offerings; Which the LORD commanded Moses in mount Sinai, in the day that he commanded the children of Israel to offer their oblations unto the LORD, in the wilderness of Sinai."
          reference="Leviticus 7:37 and 38"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The sentence that gathers seven chapters into one law, and names the mountain where all
          of it came from.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 7 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 7 finishes the priest&apos;s instructions for the trespass offering, explains
          what a priest was allowed to keep from various offerings, lays out the three kinds of
          peace offering and their different deadlines, bans eating fat and blood, describes the
          wave and heave offerings that paid the priesthood, and closes with a summary naming
          Mount Sinai as the source of the whole sacrificial code.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a peace offering in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A peace offering was a voluntary sacrifice shared as a meal between the worshipper, the
          priests, and God, brought either as thanksgiving, to fulfill a vow, or simply as a
          freewill gift. Leviticus 7:11 to 18 sets different deadlines for eating it depending on
          which of the three it was.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why could a thanksgiving offering only be eaten the same day?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 7:15 states the one day limit without explaining the reason behind it. A vow
          or freewill offering in verses 16 and 17 got an extra day, so the gap was real and
          enforced, even though the text does not say directly why thanksgiving carried the
          shorter window.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was eating fat forbidden in Leviticus 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 7:23 to 25 forbids it because the fat was the specific portion the sin
          offering and the peace offering both claimed for the altar fire. Eating it meant taking
          back a part of the sacrifice that belonged to God, not a concern about the food itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was blood forbidden to eat?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 9:4 forbids eating blood generations before Sinai, tying it to life itself.
          Leviticus 7:26 and 27 repeats the same ban for Israel with a serious penalty attached,
          and Acts 15:20 shows the principle still mattered to the apostles long after the rest of
          the ceremonial law had been fulfilled in Christ.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between a wave offering and a heave offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 7:30 to 34 ties the wave offering to the breast, presented before the LORD and
          then shared among all of Aaron&apos;s sons, and the heave offering to the right shoulder,
          given specifically to the one priest who performed that offering. A wave offering is
          widely understood as a back and forth motion and a heave offering as a lifting motion,
          though the chapter&apos;s focus is on who received each portion rather than the motion
          itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to be &quot;cut off from his people&quot; in Leviticus 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 7:20, 21, 25, and 27 all use this phrase for serious violations: eating holy
          meat while unclean, or eating forbidden fat or blood. The text does not spell out the
          exact penalty in this chapter, and Bible teachers differ on whether it means
          excommunication from the community or something more severe, but every use treats the
          offense as grave.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the relationship between the sin offering and the trespass offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 7:7 states it directly: &quot;there is one law for them.&quot; After four
          chapters of separate instructions, this verse confirms both offerings followed the same
          basic rule, with the priest who performed the atonement keeping the animal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 7 end by naming Mount Sinai?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 7:37 and 38 close the entire unit of offering laws, chapters 1 through 7, by
          naming where they came from. It confirms the whole sacrificial code was given as one
          command, at one place, rather than developed piece by piece over time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 7 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The thanksgiving peace offering, eaten in fellowship before the LORD, echoes forward
          into Hebrews 13:15, which calls believers to &quot;offer the sacrifice of praise to God
          continually.&quot; The peace this offering pictured, real fellowship restored between
          God and His people, is the same peace Ephesians 2:14 says Christ Himself became.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 7 spends most of its length on fine print. Its last two verses explain why the fine print mattered at all.</p>
          <p>
            📌 <strong>What looked like five separate systems turned out to be one law.</strong>{" "}
            Verse 37 names the burnt offering, the meat offering, the sin offering, the trespass
            offering, the consecrations, and the peace offerings in a single breath, as one body
            of instruction.
          </p>
          <p>
            📌 <strong>A deadline, a portion, a forbidden piece of fat, none of it was arbitrary.</strong>{" "}
            Every rule in this chapter, from a two day clock on a vow offering to who got the
            shoulder, protected something real: holiness, fair pay, or a claim God had already
            made.
          </p>
          <p>
            📌 <strong>None of it came from Moses&apos; own thinking.</strong> The final verse
            names the mountain. This was commanded, not invented.
          </p>
          <p>
            You will never wave a breast before an altar or wait out a two day clock on a vow
            offering. But this chapter still asks whether you treat what God has claimed as
            actually His, down to the details nobody else is watching.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name one thing in your own life you have quietly treated as yours to use however you
            want, the way Israel was tempted to treat the fat God had already claimed, and give it
            back to Him today.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
