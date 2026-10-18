import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-6-explained", {
  title: "Leviticus 6 Explained: The Trespass Offering and the Priest's Law",
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

export default function LeviticusSixExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-6-explained"
      title={<>📖 Leviticus 6 Explained: The Trespass Offering and the Priest&apos;s Law</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Five chapters of instructions for the worshipper. Then the law turns and talks to the priest instead.</p>
            <p>
              <strong>Leviticus 6 explained</strong> opens by finishing a thought from the chapter
              before it, a trespass offering for someone who lied, stole, or swore falsely against
              another person. Then, without any warning, the whole chapter changes who it is
              talking to. Aaron and his sons are told how to keep a fire burning all night, what
              they are allowed to eat, and what they are never allowed to eat, even from offerings
              they themselves handle every day.
            </p>
            <p>Maybe you assumed these laws only ever addressed the person bringing the sacrifice.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does cheating your neighbor count as trespassing against the LORD?</li>
            <li>❓ Why must a fire that never built itself never be allowed to go out?</li>
            <li>❓ Why can a priest eat the people&apos;s sin offering, but never his own?</li>
            <li>❓ And why does Leviticus explain these same offerings twice?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 6 is the chapter where the law stops describing what a
              worshipper brings and starts describing what a priest actually does with it.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the deliberate wrong
              against a neighbor that still required a ram, the fire on the altar that was never
              allowed to die out, the handful of flour the priests were allowed to eat, the one
              offering a priest brought for himself that he could never touch, and the rule that
              decided whether a sin offering ended up on a priest&apos;s plate or in the fire
              outside the camp.
            </p>
            <p>Read slowly. This is the chapter that explains the fine print behind five chapters already read.</p>
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
            <ArticleLink href="/blog/leviticus-5-explained">Leviticus 5</ArticleLink> closed with a
            trespass offering for someone who sinned against God&apos;s holy things, or against any
            of His commandments, without even knowing it. &quot;Though he wist it not, yet is he
            guilty&quot; was the last word of that chapter. Leviticus 6 opens by widening the same
            trespass offering to a very different kind of wrong, one the person committing it knew
            exactly what they were doing.
          </p>
          <p>
            Then, partway through, the chapter stops addressing an ordinary Israelite at all.
            &quot;Command Aaron and his sons&quot; becomes the new opening line, and everything
            after it is written for the men who run the altar, not the men who bring the animal to
            it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 6 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Trespass Against a Neighbor Is Still a Trespass Against the LORD (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with five specific ways a person can wrong someone else, and every one of them is deliberate.</p>
        </div>
        <VerseQuote
          text="If a soul sin, and commit a trespass against the LORD, and lie unto his neighbour in that which was delivered him to keep, or in fellowship, or in a thing taken away by violence, or hath deceived his neighbour; Or have found that which was lost, and lieth concerning it, and sweareth falsely; in any of all these that a man doeth, sinning therein:"
          reference="Leviticus 6:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every verb in these two verses describes a choice, not an accident.</strong>{" "}
            Lie, deceive, rob, swear falsely. Leviticus 4 covered sin &quot;through ignorance.&quot;
            Leviticus 5 covered sin a person &quot;wist not&quot; they had done. This section covers
            something neither of those did, a person who knows exactly what they are doing to
            someone else and does it anyway.
          </p>
          <p>
            Yet the opening line still calls it a trespass &quot;against the LORD,&quot; before it
            ever mentions the neighbor who was actually robbed. What is required next makes that
            order make sense.
          </p>
        </div>
        <VerseQuote
          text="Then it shall be, because he hath sinned, and is guilty, that he shall restore that which he took violently away, or the thing which he hath deceitfully gotten, or that which was delivered him to keep, or the lost thing which he found, Or all that about which he hath sworn falsely; he shall even restore it in the principal, and shall add the fifth part more thereto, and give it unto him to whom it appertaineth, in the day of his trespass offering."
          reference="Leviticus 6:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Full repayment, plus a fifth on top, comes before the offering, not
            after.</strong> &quot;In the day of his trespass offering&quot; sets the order plainly.
            A worshipper could not bring a ram to the altar while the person he wronged was still
            waiting to be paid back. The law refuses to let a man make things right with God before
            he has made things right with the person standing in front of him.
          </p>
          <p>The ram still comes, and it still needs a priest to finish what restitution alone could not.</p>
        </div>
        <VerseQuote
          text="And he shall bring his trespass offering unto the LORD, a ram without blemish out of the flock, with thy estimation, for a trespass offering, unto the priest: And the priest shall make an atonement for him before the LORD: and it shall be forgiven him for any thing of all that he hath done in trespassing therein."
          reference="Leviticus 6:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A nearly identical law shows up later in Numbers, stated as a general principle rather
            than a list of examples, which confirms this was never a one-off rule invented just for
            these four situations.
          </p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, When a man or woman shall commit any sin that men commit, to do a trespass against the LORD, and that person be guilty; Then they shall confess their sin which they have done: and he shall recompense his trespass with the principal thereof, and add unto it the fifth part thereof, and give it unto him against whom he hath trespassed."
          reference="Numbers 5:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Numbers adds the one word Leviticus 6 only implies: confess.</strong> A ram
            could cover the guilt, but it never replaced saying out loud what was actually done.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Law of the Burnt Offering: A Fire That Must Never Go Out (verses 8 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here the chapter turns a corner it never warns the reader is coming.</p>
        </div>
        <VerseQuote
          text="Command Aaron and his sons, saying, This is the law of the burnt offering: It is the burnt offering, because of the burning upon the altar all night unto the morning, and the fire of the altar shall be burning in it."
          reference="Leviticus 6:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>From here on, the law is spoken to the priests, not to the worshipper
            bringing the animal.</strong>{" "}
            <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink> already
            described how a burnt offering was killed and laid on the altar. This chapter never
            repeats that. Instead it describes the one detail the earlier chapter had no reason to
            mention: what happens to that fire through the night, long after the worshipper has
            gone home.
          </p>
          <p>The ashes left behind become the priest&apos;s first job of the morning.</p>
        </div>
        <VerseQuote
          text="And the priest shall put on his linen garment, and his linen breeches shall he put upon his flesh, and take up the ashes which the fire hath consumed with the burnt offering on the altar, and he shall put them beside the altar. And he shall put off his garments, and put on other garments, and carry forth the ashes without the camp unto a clean place."
          reference="Leviticus 6:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Two different sets of clothes for two different jobs. The linen garments worn at the
            altar never leave the holy ground carrying ash from a burnt offering. The priest
            changes before he ever steps outside the camp to dump it. Even the ashes of a finished
            sacrifice get carried out with some care for where they came from.
          </p>
          <p>Then the chapter names the one requirement that outlasts every single offering burned on it.</p>
        </div>
        <VerseQuote
          text="And the fire upon the altar shall be burning in it; it shall not be put out: and the priest shall burn wood on it every morning, and lay the burnt offering in order upon it; and he shall burn thereon the fat of the peace offerings. The fire shall ever be burning upon the altar; it shall never go out."
          reference="Leviticus 6:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;It shall never go out&quot; is stated twice in two verses.</strong>{" "}
            Wood had to be added every single morning, whether or not a new sacrifice was waiting.
            Israel never had a day where the altar stood cold. Something was always burning there,
            even on the mornings nobody brought anything at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Law of the Meat Offering: What the Priests Get to Eat (verses 14 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The second law addressed to the priests picks up where{" "}
            <ArticleLink href="/blog/leviticus-2-explained">Leviticus 2</ArticleLink> left off, the
            grain gift of flour, oil, and frankincense.
          </p>
        </div>
        <VerseQuote
          text="And he shall take of it his handful, of the flour of the meat offering, and of the oil thereof, and all the frankincense which is upon the meat offering, and shall burn it upon the altar for a sweet savour, even the memorial of it, unto the LORD. And the remainder thereof shall Aaron and his sons eat: with unleavened bread shall it be eaten in the holy place; in the court of the tabernacle of the congregation they shall eat it."
          reference="Leviticus 6:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Leviticus 2 already said the leftover flour belonged to the priests. This is the first
            time the law says exactly where and how they were allowed to eat it, in the holy place
            itself, unleavened, and nowhere else.
          </p>
        </div>
        <VerseQuote
          text="It shall not be baken with leaven. I have given it unto them for their portion of my offerings made by fire; it is most holy, as is the sin offering, and as the trespass offering. All the males among the children of Aaron shall eat of it. It shall be a statute for ever in your generations concerning the offerings of the LORD made by fire: every one that toucheth them shall be holy."
          reference="Leviticus 6:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;Most holy&quot; and &quot;every one that toucheth them shall be
            holy&quot; are strong words for leftover flour.</strong> This was not a meal the priests
            were simply permitted to have. It carried the same weight as the sacrifice itself,
            restricted to the men of Aaron&apos;s own family and nowhere outside the holy place.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Priest&apos;s Own Offering: Wholly Burnt, Never Eaten (verses 19 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The law then describes a meat offering that looks almost identical to the one just
            covered, except for who it belongs to.
          </p>
        </div>
        <VerseQuote
          text="This is the offering of Aaron and of his sons, which they shall offer unto the LORD in the day when he is anointed; the tenth part of an ephah of fine flour for a meat offering perpetual, half of it in the morning, and half thereof at night. In a pan it shall be made with oil; and when it is baken, thou shalt bring it in: and the baken pieces of the meat offering shalt thou offer for a sweet savour unto the LORD."
          reference="Leviticus 6:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Same flour measure as the ordinary worshipper&apos;s gift two chapters earlier. Same
            fine flour, same oil, same fire. But this one came from Aaron himself, offered every
            single day, split between morning and evening without end.
          </p>
        </div>
        <VerseQuote
          text="And the priest of his sons that is anointed in his stead shall offer it: it is a statute for ever unto the LORD; it shall be wholly burnt. For every meat offering for the priest shall be wholly burnt: it shall not be eaten."
          reference="Leviticus 6:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The same priest who just ate the people&apos;s leftover flour in verse 16
            cannot eat a single crumb of his own.</strong> Nothing in the chapter explains the
            difference directly, but the pattern already exists.{" "}
            <ArticleLink href="/blog/leviticus-4-explained">Leviticus 4</ArticleLink> required the
            anointed priest&apos;s own sin offering, a whole bullock, to be carried entirely outside
            the camp and burned, while an ordinary Israelite&apos;s sin offering never had that
            requirement at all. Whatever a priest brought for himself kept going until it was
            completely gone. Only what he handled on someone else&apos;s behalf ever reached his own
            table.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Law of the Sin Offering: Where It Is Eaten, and Where It Cannot Be (verses 24 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with the third law addressed directly to the priests, and it finally explains a question the earlier chapters left open.</p>
        </div>
        <VerseQuote
          text="Speak unto Aaron and to his sons, saying, This is the law of the sin offering: In the place where the burnt offering is killed shall the sin offering be killed before the LORD: it is most holy. The priest that offereth it for sin shall eat it: in the holy place shall it be eaten, in the court of the tabernacle of the congregation."
          reference="Leviticus 6:25 and 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Here is a sin offering a priest is actually allowed to eat, which sounds like a
            contradiction right after verse 23 said he could never eat his own. It is not. This is
            the sin offering brought by someone else, a ruler or a common Israelite, and offered on
            their behalf. What follows gets strict about exactly how careful that eating has to be.
          </p>
        </div>
        <VerseQuote
          text="Whatsoever shall touch the flesh thereof shall be holy: and when there is sprinkled of the blood thereof upon any garment, thou shalt wash that whereon it was sprinkled in the holy place. But the earthen vessel wherein it is sodden shall be broken: and if it be sodden in a brasen pot, it shall be both scoured, and rinsed in water."
          reference="Leviticus 6:27 and 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A clay pot gets smashed. A bronze pot only gets scrubbed.</strong> The
            difference is not favoritism toward better cookware. Clay absorbs whatever is cooked in
            it and has no way to be made clean again. Bronze does not, so washing is enough. The law
            matches the solution to what the material itself can actually do.
          </p>
          <p>Then the chapter gives the rule that quietly explains a question Leviticus 4 never answered outright.</p>
        </div>
        <VerseQuote
          text="All the males among the priests shall eat thereof: it is most holy. And no sin offering, whereof any of the blood is brought into the tabernacle of the congregation to reconcile withal in the holy place, shall be eaten: it shall be burnt in the fire."
          reference="Leviticus 6:29 and 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>There is the rule itself.</strong> Whenever a sin offering&apos;s blood was
            carried into the tabernacle, it was never eaten, only burned.{" "}
            <ArticleLink href="/blog/leviticus-4-explained">Leviticus 4</ArticleLink> described
            exactly that happening to the priest&apos;s own bullock and the congregation&apos;s own
            bullock, both carried whole outside the camp, while the ruler&apos;s goat and the common
            Israelite&apos;s goat or lamb were never said to leave the camp at all. Verse 30 is the
            reason stated plainly. Blood taken as far as the veil meant a body that could never end
            up on anyone&apos;s plate.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 6 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does lying to or stealing from a neighbor count as trespassing against the
            LORD, when the person actually harmed is another human being?</strong> Leviticus 6:2
            states the connection without arguing for it. What the text does make clear through the
            order of its own instructions is that God treats wrong done between people as never
            purely a private matter. The restitution in verses 4 and 5 still goes to the neighbor
            who was wronged. The atonement in verse 7 still goes through the LORD. Neither one
            replaces the other.
          </p>
          <p>
            <strong>Is the trespass offering in verses 1 to 7 for an honest mistake, or for
            something done on purpose?</strong> Every verb in verse 2 and 3, lie, deceive, rob, swear
            falsely, describes a deliberate act, unlike the &quot;through ignorance&quot; language
            that framed the sin offerings in Leviticus 4 and the first half of{" "}
            <ArticleLink href="/blog/leviticus-5-explained">Leviticus 5</ArticleLink>. This
            is the one offering in the run so far that covers a wrong the person knew they were
            doing while they did it, provided they later owned it, repaid it, and brought the ram.
          </p>
          <p>
            <strong>Why could a priest eat from the people&apos;s sin offering and meat offering,
            but never from his own?</strong> Leviticus 6:23 and 6:26 state both rules without
            explaining the gap between them. The pattern across Leviticus already points to an
            answer: Leviticus 4 required the
            priest&apos;s own bullock to be entirely burned outside the camp, never eaten by anyone,
            the same treatment his own daily meat offering gets here. Whatever a priest brought for
            himself was consumed completely. Only what belonged to someone else ever reached his
            table.
          </p>
          <p>
            <strong>Why does Leviticus explain the burnt offering, the meat offering, and the sin
            offering a second time, now addressed to the priests?</strong> Chapters 1 through 5 told
            an ordinary Israelite what to bring and why. Chapter 6 tells the priest what to do once
            it arrives, how long the fire burns, where a meal can and cannot be eaten, which pot gets
            broken. The same offerings, looked at from the other side of the altar.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 6:4 and 5</h3>
        <VerseQuote
          text="Then it shall be, because he hath sinned, and is guilty, that he shall restore that which he took violently away, or the thing which he hath deceitfully gotten, or that which was delivered him to keep, or the lost thing which he found, Or all that about which he hath sworn falsely; he shall even restore it in the principal, and shall add the fifth part more thereto, and give it unto him to whom it appertaineth, in the day of his trespass offering."
          reference="Leviticus 6:4 and 5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Full restitution plus a fifth, required before the trespass offering, not after. Making
          things right with the person wronged came first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 6:13</h3>
        <VerseQuote text="The fire shall ever be burning upon the altar; it shall never go out." reference="Leviticus 6:13" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Stated twice in two verses. Israel never had a morning where the altar stood cold, whether
          or not anyone had brought a sacrifice that day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 6:23</h3>
        <VerseQuote text="For every meat offering for the priest shall be wholly burnt: it shall not be eaten." reference="Leviticus 6:23" />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The priest who ate the people&apos;s leftover flour could never eat his own. Whatever he
          brought for himself was consumed completely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 6:26</h3>
        <VerseQuote
          text="The priest that offereth it for sin shall eat it: in the holy place shall it be eaten, in the court of the tabernacle of the congregation."
          reference="Leviticus 6:26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A sin offering a priest could actually eat, brought on someone else&apos;s behalf, bound
          to one place and no other.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 6:30</h3>
        <VerseQuote
          text="And no sin offering, whereof any of the blood is brought into the tabernacle of the congregation to reconcile withal in the holy place, shall be eaten: it shall be burnt in the fire."
          reference="Leviticus 6:30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The rule that explains why some sin offerings were burned outside the camp and others
          were not. Blood taken toward the veil meant a body that was never eaten.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 6 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 6 opens by describing a trespass offering for someone who deliberately lied,
          stole, or swore falsely against a neighbor, then shifts to address the priests directly
          with the law of the burnt offering, the meat offering, and the sin offering, covering what
          they could eat and what they could not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a trespass offering in Leviticus 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was the required sacrifice for someone who had deliberately wronged another person, by
          lying, theft, fraud, or a false oath. Leviticus 6:4 and 5 required full restitution plus a
          fifth part added, paid before the ram was ever brought to the priest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did wronging a neighbor require a sacrifice to the LORD?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 6:2 calls it a trespass against the LORD without explaining the connection
          directly, but the law never lets one payment replace the other. Restitution went to the
          neighbor who was wronged; the ram brought atonement before God. Numbers 5:7 states the same
          two part requirement again as a general rule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the fire shall never go out&quot; mean in Leviticus 6:13?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means the altar fire had to be tended every single morning, with fresh wood added
          whether or not a new sacrifice was waiting. The tabernacle never had a day where that fire
          was allowed to die out completely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t a priest eat his own meat offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 6:23 states the rule without giving the reason, but the pattern fits what
          Leviticus 4 already required of a priest&apos;s own sin offering, a bullock burned entirely
          outside the camp rather than eaten. What a priest brought on his own behalf was always
          consumed completely, never kept for a meal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was a clay pot broken but a bronze pot only washed in Leviticus 6:28?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Clay absorbs whatever is cooked in it and could not be made clean again by washing. Bronze
          does not absorb the same way, so scouring and rinsing it in water was enough to use it
          again.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were some sin offerings eaten by priests and others only burned?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 6:30 states the rule plainly. Whenever a sin offering&apos;s blood was carried
          into the tabernacle itself, the body was never eaten, only burned. This explains why
          Leviticus 4 had the priest&apos;s
          and the congregation&apos;s bullocks burned outside the camp, while the ruler&apos;s and
          the common Israelite&apos;s animals were not.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was allowed to eat the holy portions in Leviticus 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Only the males among Aaron&apos;s own family, the priests themselves, and only inside the
          holy place. Leviticus 6:18 and 6:29 both restrict it this specifically, calling the food
          &quot;most holy&quot; rather than an ordinary meal.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 6 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter does not name Jesus, but its insistence that restitution come before
          atonement, repaying a neighbor before the ram was ever offered, echoes a principle Jesus
          later teaches directly: reconcile with the person you have wronged before you bring your
          gift to the altar.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 6 never stays with the worshipper for long. It keeps turning toward the people running the altar.</p>
          <p>
            📌 <strong>A deliberate wrong against another person still had a way back.</strong> The
            trespass offering in verses 1 to 7 covers the one sin in this stretch of Leviticus that
            was never an accident, as long as it was confessed, repaid, and brought to the priest.
          </p>
          <p>
            📌 <strong>What a priest handled for someone else, he could eat. What he brought for
            himself, he could not.</strong> The same man who ate the people&apos;s leftover flour in
            verse 16 could not touch a crumb of his own in verse 23.
          </p>
          <p>
            📌 <strong>The altar was never allowed to go cold.</strong> Fresh wood every morning,
            whether or not anyone had brought anything that day. Some things were never left to run
            out on their own.
          </p>
          <p>
            You will never tend a fire on a stone altar. But this chapter still asks whether you pay
            back what you owe someone before you try to settle things with God.
          </p>
          <p>So here is your one next step.</p>
          <p>
            If there is a person you still owe an honest word, an apology, or an actual repayment,
            go to them first, the way this chapter insists on, before you consider the matter closed
            with God.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
