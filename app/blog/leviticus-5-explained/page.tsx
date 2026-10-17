import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-5-explained", {
  title: "Leviticus 5 Explained: The Sliding Scale Sin Offering and the Trespass Offering",
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

export default function LeviticusFiveExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-5-explained"
      title={<>📖 Leviticus 5 Explained: The Sliding Scale Sin Offering and the Trespass Offering</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A lamb. Two birds. A handful of flour. Same guilt, three different price tags.</p>
            <p>
              <strong>Leviticus 5 explained</strong> is where the sin offering from the chapter
              before this one gets specific. It names the exact kinds of guilt it covers, a silent
              witness, an accidental touch, a careless oath, and then it does something no law
              needs to do. It builds in a cheaper option for anyone who cannot afford the first
              one, and a cheaper option still for anyone who cannot afford that.
            </p>
            <p>Maybe you have assumed forgiveness in the Old Testament always had one fixed price.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does keeping quiet as a witness count as sin at all?</li>
            <li>❓ Why does the poorest option skip the oil and frankincense every grain offering needed before?</li>
            <li>❓ Why does the chapter suddenly switch from a sin offering to a trespass offering, with no warning?</li>
            <li>❓ And can you really be guilty of something you never knew was wrong?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 5 is the chapter that proves this whole system was never built
              to keep the poor locked out of atonement.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the four specific sins
              named at the start, the required confession, the lamb a worshipper brings if he can,
              the two birds he brings if he cannot, the flour he brings if even birds are too much,
              and the different offering entirely that closes out the chapter, for sins against the
              holy things of the LORD Himself.
            </p>
            <p>Read slowly. This chapter has more mercy built into its fine print than it first looks like it does.</p>
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
            <ArticleLink href="/blog/leviticus-4-explained">Leviticus 4</ArticleLink> laid out the
            sin offering for four kinds of people who sinned through ignorance: the anointed
            priest, the whole congregation, a ruler, and an ordinary Israelite. Every case in that
            chapter ended with the same four words, it shall be forgiven him, but none of them said
            exactly which sins qualified.
          </p>
          <p>
            Leviticus 5 answers that question. It opens with a list of specific situations, then
            keeps using the same word, sin offering, that closed out the chapter before it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 5 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Four Specific Sins Named by Name (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with the first of four named situations, and it is not what most readers expect.</p>
        </div>
        <VerseQuote
          text="And if a soul sin, and hear the voice of swearing, and is a witness, whether he hath seen or known of it; if he do not utter it, then he shall bear his iniquity."
          reference="Leviticus 5:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Staying silent is the sin here, not lying.</strong> A man hears a public
            oath, a legal call for anyone with knowledge to come forward, and he knows something
            relevant. If he keeps quiet instead of testifying, the law charges him with guilt for
            what he withheld, not for anything he said.
          </p>
          <p>The next two cases both involve touching something unclean without realizing it at the time.</p>
        </div>
        <VerseQuote
          text="Or if a soul touch any unclean thing, whether it be a carcase of an unclean beast, or a carcase of unclean cattle, or the carcase of unclean creeping things, and if it be hidden from him; he also shall be unclean, and guilty."
          reference="Leviticus 5:2"
        />
        <VerseQuote
          text="Or if he touch the uncleanness of man, whatsoever uncleanness it be that a man shall be defiled withal, and it be hid from him; when he knoweth of it, then he shall be guilty."
          reference="Leviticus 5:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the phrase that appears in both verses, hid from him. The man did not set
            out to touch a carcase or another person&apos;s uncleanness. He walked through his day
            and brushed against it without noticing, and the law still calls the result guilt.
          </p>
          <p>The fourth case moves away from touch entirely, to speech.</p>
        </div>
        <VerseQuote
          text="Or if a soul swear, pronouncing with his lips to do evil, or to do good, whatsoever it be that a man shall pronounce with an oath, and it be hid from him; when he knoweth of it, then he shall be guilty in one of these."
          reference="Leviticus 5:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A careless oath counts, even a well meaning one.</strong> Swearing to do
            good is named right alongside swearing to do evil. The problem is not always the
            content of the promise. Sometimes it is the promise itself, made rashly, then
            forgotten, then broken without the person even remembering they made it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Confession, Before Any Offering (verse 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the chapter names a single animal, it names a required step that comes first.</p>
        </div>
        <VerseQuote
          text="And it shall be, when he shall be guilty in one of these things, that he shall confess that he hath sinned in that thing:"
          reference="Leviticus 5:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Confession comes before the sacrifice, not after it.</strong> None of the
            four cases above required the person to have been caught. In every one of them, he is
            the one who realizes it, hid from him, come to his knowledge, and the law assumes he
            will say so out loud before he ever brings an animal to the priest.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Lamb or a Kid, If He Has One (verse 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Only after the confession does the chapter say what to bring.</p>
        </div>
        <VerseQuote
          text="And he shall bring his trespass offering unto the LORD for his sin which he hath sinned, a female from the flock, a lamb or a kid of the goats, for a sin offering; and the priest shall make an atonement for him concerning his sin."
          reference="Leviticus 5:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A female lamb or goat, the same requirement{" "}
            <ArticleLink href="/blog/leviticus-4-explained">Leviticus 4</ArticleLink> already set
            for an ordinary Israelite&apos;s sin offering. The verse even calls it both names at
            once, trespass offering and sin offering, in the same breath, before the chapter has
            explained that those two words are not always interchangeable.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Two Birds, If a Lamb Is Too Much (verses 7 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The very next verse opens a door Leviticus 4 never did.</p>
        </div>
        <VerseQuote
          text="And if he be not able to bring a lamb, then he shall bring for his trespass, which he hath committed, two turtledoves, or two young pigeons, unto the LORD; one for a sin offering, and the other for a burnt offering."
          reference="Leviticus 5:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Not able to bring a lamb is written directly into the law.</strong> This is
            not a worshipper bending the rules because money is tight. The text itself anticipates
            the problem and provides for it. Two birds instead of one animal, because a sin
            offering here needs a pair, one for the guilt and one as a burnt offering on top of it.
          </p>
          <p>The handling of the birds gets its own careful instructions, slightly different from a burnt offering of birds alone.</p>
        </div>
        <VerseQuote
          text="And he shall bring them unto the priest, who shall offer that which is for the sin offering first, and wring off his head from his neck, but shall not divide it asunder:"
          reference="Leviticus 5:8"
        />
        <VerseQuote
          text="And he shall sprinkle of the blood of the sin offering upon the side of the altar; and the rest of the blood shall be wrung out at the bottom of the altar: it is a sin offering."
          reference="Leviticus 5:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Look closely at what the priest does not do.</strong> In{" "}
            <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink>, a burnt
            offering bird has its head wrung off completely. Here, the neck is wrung but the body
            is never divided asunder, the head stays attached. That difference keeps the bird
            whole enough for the priest to sprinkle its blood deliberately on the side of the
            altar, rather than simply draining it out. A sin offering needed blood applied with
            intention. A burnt offering did not.
          </p>
          <p>The second bird finishes the pair exactly the way an ordinary burnt offering already worked.</p>
        </div>
        <VerseQuote
          text="And he shall offer the second for a burnt offering, according to the manner: and the priest shall make an atonement for him for his sin which he hath sinned, and it shall be forgiven him."
          reference="Leviticus 5:10"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Flour Alone, If Even Two Birds Are Too Much (verses 11 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The law provides for one more level below the birds, for someone with almost nothing.</p>
        </div>
        <VerseQuote
          text="But if he be not able to bring two turtledoves, or two young pigeons, then he that sinned shall bring for his offering the tenth part of an ephah of fine flour for a sin offering; he shall put no oil upon it, neither shall he put any frankincense thereon: for it is a sin offering."
          reference="Leviticus 5:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>No oil. No frankincense. That is the detail worth stopping on.</strong>{" "}
            <ArticleLink href="/blog/leviticus-2-explained">Leviticus 2</ArticleLink> required
            every grain offering to carry both, oil poured on top and frankincense laid over it,
            as a voluntary gift brought in gladness. This flour is the same fine flour, from the
            same tenth of an ephah measure, and it skips both on purpose.
          </p>
          <p>
            ⚠️ Oil and frankincense marked a gift of joy. A sin offering, even the cheapest version
            of one, was never meant to look festive. The flour here says the same thing the lamb
            and the birds already said, guilt needs dealing with, just without anything added that
            would dress the moment up as a celebration.
          </p>
        </div>
        <VerseQuote
          text="Then shall he bring it to the priest, and the priest shall take his handful of it, even a memorial thereof, and burn it on the altar, according to the offerings made by fire unto the LORD: it is a sin offering."
          reference="Leviticus 5:12"
        />
        <VerseQuote
          text="And the priest shall make an atonement for him as touching his sin that he hath sinned in one of these, and it shall be forgiven him: and the remnant shall be the priest's, as a meat offering."
          reference="Leviticus 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The same handful and memorial pattern Leviticus 2 used for the grain offering shows up
            here too, and the leftover flour becomes the priest&apos;s own food, exactly as it did
            there. Three completely different offerings, a lamb, two birds, a handful of flour,
            and from the birds onward the chapter settles into one closing phrase it keeps
            repeating. It shall be forgiven him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. A Different Kind of Wrong: Sinning Against the Holy Things (verses 14 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter pauses, then turns a corner nobody saw coming.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying,"
          reference="Leviticus 5:14"
        />
        <VerseQuote
          text="If a soul commit a trespass, and sin through ignorance, in the holy things of the LORD; then he shall bring for his trespass unto the LORD a ram without blemish out of the flocks, with thy estimation by shekels of silver, after the shekel of the sanctuary, for a trespass offering:"
          reference="Leviticus 5:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is no longer a sin offering. The text calls it a trespass offering,
            and the animal itself changes.</strong> A ram, not a lamb or a goat or birds or flour,
            valued in actual silver, by the same sanctuary shekel standard used to price the{" "}
            <ArticleLink href="/blog/exodus-30-explained">half shekel ransom</ArticleLink> Israel
            paid at every census. &quot;The holy things of the LORD&quot; means something like a
            tithe, a firstfruits gift, or a portion set apart for the priesthood, mishandled or
            withheld by accident.
          </p>
          <p>And this offering comes with a cost none of the sin offerings in this chapter carried.</p>
        </div>
        <VerseQuote
          text="And he shall make amends for the harm that he hath done in the holy thing, and shall add the fifth part thereto, and give it unto the priest: and the priest shall make an atonement for him with the ram of the trespass offering, and it shall be forgiven him."
          reference="Leviticus 5:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Restitution, plus a fifth added on top, before the ram ever covers
            anything.</strong> A sin offering atoned for guilt. A trespass offering atoned for
            guilt and repaid the actual damage, with interest. Whatever was shorted from God&apos;s
            holy things had to be made whole again, not just forgiven on paper.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Guilty, Even Without Knowing It (verses 17 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by widening the trespass offering past holy things alone, to any of God&apos;s commands.</p>
        </div>
        <VerseQuote
          text="And if a soul sin, and commit any of these things which are forbidden to be done by the commandments of the LORD; though he wist it not, yet is he guilty, and shall bear his iniquity."
          reference="Leviticus 5:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Though he wist it not, yet is he guilty&quot; is as plain as this
            chapter gets.</strong> Wist means knew. The man did not know, and the verse states
            flatly that not knowing changes nothing about the guilt itself. It only changes what
            happens next, which is forgiveness still available, not forgiveness withheld.
          </p>
        </div>
        <VerseQuote
          text="And he shall bring a ram without blemish out of the flock, with thy estimation, for a trespass offering, unto the priest: and the priest shall make an atonement for him concerning his ignorance wherein he erred and wist it not, and it shall be forgiven him."
          reference="Leviticus 5:18"
        />
        <VerseQuote
          text="It is a trespass offering: he hath certainly trespassed against the LORD."
          reference="Leviticus 5:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter ends on that one flat sentence, no softening, no qualifier. Certainly
            trespassed, whether he meant to or not. And yet, in the very same verse that says so,
            the ram already stands ready to cover it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 5 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does the cheapest sin offering skip the oil and frankincense that
            Leviticus 2 required for every grain gift?</strong> Leviticus 5:11 states the omission
            directly without explaining it. What is observable is the contrast in purpose. Leviticus
            2&apos;s meat offering was a voluntary gift of gladness. This flour answers guilt. The
            missing oil and frankincense mark the difference between an offering brought in joy
            and one brought because something needs covering.
          </p>
          <p>
            <strong>What is the real difference between a sin offering and a trespass
            offering?</strong> Leviticus 5 uses both terms, sometimes in the same verse, which can
            make them look identical. The pattern across the chapter says otherwise. A sin offering,
            the lamb, the birds, the flour, atones for guilt alone. A trespass offering, the ram in
            verses 15 to 18, atones for guilt and requires repaying actual harm done, with a fifth
            added. One answers what a person is. The other also answers what a person owes.
          </p>
          <p>
            <strong>Why would silence count as a sin, the way verse 1 describes a witness who
            says nothing?</strong> Leviticus 5:1 states the case without arguing for it. The law
            treats withheld truth as its own kind of wrong, not a neutral choice. Centuries later,
            James describes the same principle in a different direction entirely.
          </p>
        </div>
        <VerseQuote
          text="Therefore to him that knoweth to do good, and doeth it not, to him it is sin."
          reference="James 4:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            James is not commenting on Leviticus 5 directly, but both verses land on the same
            principle from two different angles. Knowing something and doing nothing with it
            carries real moral weight, not none.
          </p>
          <p>
            <strong>How can someone be guilty of a sin they genuinely did not know they were
            committing?</strong> Leviticus 5:17 states it without softening the claim, though he
            wist it not, yet is he guilty. The chapter never argues that ignorance is the same as
            innocence. What it argues instead is that ignorance is never the end of the story,
            since the very next verse already has a ram standing ready to cover exactly this case.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 5:7</h3>
        <VerseQuote
          text="And if he be not able to bring a lamb, then he shall bring for his trespass, which he hath committed, two turtledoves, or two young pigeons, unto the LORD; one for a sin offering, and the other for a burnt offering."
          reference="Leviticus 5:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that proves this law was never designed to shut the poor out of atonement. A
          cheaper option is written directly into the text, not left to a worshipper&apos;s own
          improvising.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 5:11</h3>
        <VerseQuote
          text="But if he be not able to bring two turtledoves, or two young pigeons, then he that sinned shall bring for his offering the tenth part of an ephah of fine flour for a sin offering; he shall put no oil upon it, neither shall he put any frankincense thereon: for it is a sin offering."
          reference="Leviticus 5:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A third tier below even the birds, open to anyone with almost nothing. The missing oil
          and frankincense quietly mark the difference between a joyful gift and an offering for guilt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 5:16</h3>
        <VerseQuote
          text="And he shall make amends for the harm that he hath done in the holy thing, and shall add the fifth part thereto, and give it unto the priest: and the priest shall make an atonement for him with the ram of the trespass offering, and it shall be forgiven him."
          reference="Leviticus 5:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Forgiveness here comes with restitution attached. What was taken had to be repaid in
          full, plus a fifth more, before the sacrifice ever covered the rest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 5:17</h3>
        <VerseQuote
          text="And if a soul sin, and commit any of these things which are forbidden to be done by the commandments of the LORD; though he wist it not, yet is he guilty, and shall bear his iniquity."
          reference="Leviticus 5:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the plainest statements in Leviticus about guilt and knowledge. Not knowing never
          erased the wrong, but it also never put forgiveness out of reach.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 5:19</h3>
        <VerseQuote
          text="It is a trespass offering: he hath certainly trespassed against the LORD."
          reference="Leviticus 5:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s last word, flat and certain, closing an offering that had already
          made atonement available in the very same breath.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 5
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 5 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 5 names specific sins that require a sin offering, a silent witness, touching
          uncleanness unknowingly, a careless oath, then gives a sliding scale of offerings a lamb,
          two birds, or flour, based on what a worshipper can afford. It closes with a separate
          trespass offering for sins against God&apos;s holy things or His commandments in general.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the sliding scale sin offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 5:6 to 5:13 allows three different offerings for the same guilt, a female lamb
          or goat, two turtledoves or young pigeons, or a handful of fine flour, depending on what
          the person could afford. The law builds the poorest option directly into the text rather
          than leaving it to be assumed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was silence treated as a sin in Leviticus 5:1?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A witness who heard a public oath and had relevant knowledge was expected to speak.
          Leviticus 5:1 charges him with guilt for withholding that testimony, treating silence in
          that specific setting as its own kind of wrong, not a neutral choice.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between a sin offering and a trespass offering?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A sin offering, the lamb, birds, or flour in verses 6 to 13, atoned for guilt alone. A
          trespass offering, the ram in verses 15 to 18, atoned for guilt and required repaying any
          actual harm done, plus a fifth part added, before atonement was made.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the flour sin offering skip the oil and frankincense?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 2 required oil and frankincense on every grain offering as a voluntary gift of
          gladness. Leviticus 5:11 removes both from the sin offering version of that same flour,
          marking it as an offering for guilt rather than a joyful gift.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What counted as sinning in the holy things of the LORD?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 5:15 does not list examples, but the phrase points to things set apart for God,
          such as a tithe, a firstfruits gift, or a portion reserved for the priesthood, mishandled
          or withheld by mistake rather than on purpose.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the trespass offering require paying back a fifth more than what was taken?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 5:16 states the requirement without explaining the extra fifth, but the effect
          is clear. Simple repayment would have left the wrongdoer no worse off than if he had
          never taken it. The added fifth made restitution cost something real.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can you really be guilty of a sin you did not know you committed?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          According to Leviticus 5:17, yes. The verse states plainly that not knowing does not
          remove guilt. What it does not do is leave the matter unresolved. The same law that
          names the guilt also provides the offering that covers it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 5 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This chapter does not name Jesus, but its sliding scale shows the same heart later seen
          in the gospel, atonement made genuinely reachable rather than priced only for the wealthy.
          Luke 2:24 records Mary and Joseph bringing two turtledoves at Jesus&apos; own presentation,
          the exact offering this chapter allows for anyone who could not afford a lamb.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 5 never once lowers the bar on guilt. It lowers the bar on access.</p>
          <p>
            📌 <strong>A lamb, two birds, or a handful of flour all covered the exact same
            sin.</strong> The law named a cheaper path before anyone had to ask for one.
          </p>
          <p>
            📌 <strong>Not knowing never erased the wrong, and it never ended the story
            either.</strong> &quot;Though he wist it not, yet is he guilty&quot; sits right beside a
            ram already standing ready to cover it.
          </p>
          <p>
            📌 <strong>Some debts needed more than forgiveness. They needed repaying, with
            interest.</strong> The trespass offering made restitution part of atonement, not a
            separate step left undone.
          </p>
          <p>
            You will never bring a bird or a handful of flour to an altar. But this chapter still
            asks whether you let what you can afford decide whether you come to God at all.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Bring whatever you actually have today, honestly, the way this chapter insists is
            always enough, rather than waiting until you think you can afford a bigger gesture.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
