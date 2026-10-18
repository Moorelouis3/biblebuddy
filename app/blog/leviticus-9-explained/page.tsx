import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-9-explained", {
  title: "Leviticus 9 Explained: Aaron's First Day and the Fire From the LORD",
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

export default function LeviticusNineExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-9-explained"
      title={<>📖 Leviticus 9 Explained: Aaron&apos;s First Day and the Fire From the LORD</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Seven days of waiting end. One day of sacrifice follows. Then fire falls out of nowhere.</p>
            <p>
              <strong>Leviticus 9 explained</strong> is the chapter where Aaron finally does, with
              his own hands, everything the last two chapters only prepared him to do. Seven
              animals die in a single day, for his own sin and for the people&apos;s, before the
              LORD ever shows Himself. Then, with no warning in the text, He does.
            </p>
            <p>Maybe you have wondered what actually proves a sacrifice worked.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Aaron still need a sin offering for himself, after everything Leviticus 8 already did to him?</li>
            <li>❓ Why does this chapter promise, before a single animal dies, that the LORD will appear that same day?</li>
            <li>❓ Why does Aaron bless the people before fire ever touches the altar?</li>
            <li>❓ And what does it mean that fire came from the LORD, not from a torch in someone&apos;s hand?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 9 is the one day Israel watched God answer a sacrifice in
              front of their own eyes, instead of simply trusting that He had.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the eighth day&apos;s
              instructions, the promise that the LORD would appear before anyone had earned it,
              Aaron offering for himself before he ever offers for anyone else, the people&apos;s
              own five animals and one grain gift, the blessing Aaron speaks with his own hand
              lifted, and the fire that ends the chapter in a way no one in the camp could have
              staged.
            </p>
            <p>Read slowly. The very next chapter shows what happens when fire falls the wrong way.</p>
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
            <ArticleLink href="/blog/leviticus-8-explained">Leviticus 8</ArticleLink> ended with
            Aaron and his sons shut inside the tabernacle door for seven straight days, told
            plainly that leaving early would cost them their lives. Moses had done everything in
            that chapter himself: washing Aaron, dressing him, slaying the animals, even keeping
            the wave breast that would normally belong to a working priest, because there was no
            working priest yet to receive it.
          </p>
          <p>
            Leviticus 9 opens on the eighth day, the first morning after that week ends. Nothing in
            the text says the waiting itself finished Aaron&apos;s ordination. What finishes it is
            this chapter, the first time Aaron does the work rather than has the work done to him.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 9 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Eighth Day&apos;s Instructions (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a guest list that is new, and an instruction list that covers two different people at once.</p>
        </div>
        <VerseQuote
          text="And it came to pass on the eighth day, that Moses called Aaron and his sons, and the elders of Israel;"
          reference="Leviticus 9:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Leviticus 8 called the whole congregation to the door. This verse calls the
            elders by name.</strong> The men who represented Israel, not just the crowd itself, are
            the first witnesses named on the day Aaron actually begins his work.
          </p>
          <p>What Moses tells Aaron to bring, and what he tells the people to bring, are not the same animals.</p>
        </div>
        <VerseQuote
          text="And he said unto Aaron, Take thee a young calf for a sin offering, and a ram for a burnt offering, without blemish, and offer them before the LORD."
          reference="Leviticus 9:2"
        />
        <VerseQuote
          text="And unto the children of Israel thou shalt speak, saying, Take ye a kid of the goats for a sin offering; and a calf and a lamb, both of the first year, without blemish, for a burnt offering; Also a bullock and a ram for peace offerings, to sacrifice before the LORD; and a meat offering mingled with oil: for to day the LORD will appear unto you."
          reference="Leviticus 9:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Count what is actually being gathered. Aaron brings a calf and a ram for himself,
            two animals. The people bring a goat, a calf, a lamb, a bullock, and a ram, five more,
            plus a grain gift mixed with oil. Seven animals die on this one morning, and two of
            them, Aaron&apos;s calf and the people&apos;s calf, are easy to confuse unless the
            chapter&apos;s own wording is read closely. They are not the same animal, and they are
            not for the same person.
          </p>
          <p>
            And tucked into the end of verse 4, almost in passing, is the reason for all of it: not
            a vague hope, a stated promise. &quot;For to day the LORD will appear unto you.&quot;
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. &quot;The Glory of the LORD Shall Appear&quot; (verses 5 and 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The congregation obeys, and the promise gets repeated before anything is killed.</p>
        </div>
        <VerseQuote
          text="And they brought that which Moses commanded before the tabernacle of the congregation: and all the congregation drew near and stood before the LORD."
          reference="Leviticus 9:5"
        />
        <VerseQuote
          text="And Moses said, This is the thing which the LORD commanded that ye should do: and the glory of the LORD shall appear unto you."
          reference="Leviticus 9:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Twice now, before a single animal dies, someone states out loud that God is
            about to show up.</strong> Verse 4 promises it to the people through Moses&apos;
            instructions. Verse 6 repeats it standing in front of the whole crowd. Whatever
            happens at the end of this chapter is not a surprise ending. It is a promise kept.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Aaron Offers for Himself First (verses 7 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses gives Aaron his first order as a working priest, and the order has two parts in a specific sequence.</p>
        </div>
        <VerseQuote
          text="And Moses said unto Aaron, Go unto the altar, and offer thy sin offering, and thy burnt offering, and make an atonement for thyself, and for the people: and offer the offering of the people, and make an atonement for them; as the LORD commanded."
          reference="Leviticus 9:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Aaron&apos;s own offering comes first, and it covers both himself and the people in
            the same breath. Only after that does he move on to an offering that belongs to the
            people alone. A priest who has not dealt with his own guilt is not sent to deal with
            anyone else&apos;s.
          </p>
          <p>For the first time, Aaron is the one with the knife, not Moses.</p>
        </div>
        <VerseQuote
          text="Aaron therefore went unto the altar, and slew the calf of the sin offering, which was for himself."
          reference="Leviticus 9:8"
        />
        <VerseQuote
          text="And the sons of Aaron brought the blood unto him: and he dipped his finger in the blood, and put it upon the horns of the altar, and poured out the blood at the bottom of the altar:"
          reference="Leviticus 9:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who hands Aaron the blood.</strong> Not Moses, this time. His own
            sons. A working priesthood is already functioning as a team in this verse, each man
            doing his part, on the very first offering any of them has ever performed.
          </p>
        </div>
        <VerseQuote
          text="But the fat, and the kidneys, and the caul above the liver of the sin offering, he burnt upon the altar; as the LORD commanded Moses."
          reference="Leviticus 9:10"
        />
        <VerseQuote
          text="And the flesh and the hide he burnt with fire without the camp."
          reference="Leviticus 9:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That treatment is not new. <ArticleLink href="/blog/leviticus-4-explained">Leviticus
            4</ArticleLink> already required the anointed priest&apos;s own sin offering to be
            carried whole outside the camp and burned, never eaten by anyone. Aaron&apos;s very
            first act as priest follows the exact rule written for a priest&apos;s own guilt, long
            before he ever stood at this altar.
          </p>
          <p>The burnt offering follows the same hand-off between Aaron and his sons.</p>
        </div>
        <VerseQuote
          text="And he slew the burnt offering; and Aaron's sons presented unto him the blood, which he sprinkled round about upon the altar."
          reference="Leviticus 9:12"
        />
        <VerseQuote
          text="And they presented the burnt offering unto him, with the pieces thereof, and the head: and he burnt them upon the altar."
          reference="Leviticus 9:13"
        />
        <VerseQuote
          text="And he did wash the inwards and the legs, and burnt them upon the burnt offering on the altar."
          reference="Leviticus 9:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Sprinkled round about, not poured at the base. A sin offering&apos;s blood goes to the
            bottom of the altar. A burnt offering&apos;s blood circles it, the same distinction{" "}
            <ArticleLink href="/blog/leviticus-1-explained">Leviticus 1</ArticleLink> set up for
            the ordinary worshipper&apos;s burnt offering, now carried out by the priest himself
            on his own animal.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Aaron Offers for the People (verses 15 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Only after his own two offerings are finished does Aaron turn to the five animals and the grain gift the people brought.</p>
        </div>
        <VerseQuote
          text="And he brought the people's offering, and took the goat, which was the sin offering for the people, and slew it, and offered it for sin, as the first."
          reference="Leviticus 9:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;As the first&quot; ties this goat&apos;s procedure back to Aaron&apos;s own
            calf in verses 8 to 11. The text does not spell out whether that means the goat&apos;s
            body was also carried outside the camp and burned, the way Aaron&apos;s calf was, or
            only that the same blood procedure on the altar was repeated. Either reading is
            possible from the wording alone, and the chapter never settles it explicitly.
          </p>
          <p>The burnt offering and the grain offering follow next, each one brief.</p>
        </div>
        <VerseQuote
          text="And he brought the burnt offering, and offered it according to the manner."
          reference="Leviticus 9:16"
        />
        <VerseQuote
          text="And he brought the meat offering, and took an handful thereof, and burnt it upon the altar, beside the burnt sacrifice of the morning."
          reference="Leviticus 9:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Beside the burnt sacrifice of the morning&quot; is easy to read past,
            and it is one of the most telling phrases in the chapter.</strong> It means the regular
            daily burnt offering, the one{" "}
            <ArticleLink href="/blog/exodus-29-explained">Exodus 29</ArticleLink> already set up
            to burn every single morning without exception, was still happening on this day too.
            Everything in Leviticus 9 is extra, added on top of ordinary priestly duty that had
            already started and would never stop.
          </p>
          <p>Last comes the peace offering, with its own wave motion repeated from two chapters earlier.</p>
        </div>
        <VerseQuote
          text="He slew also the bullock and the ram for a sacrifice of peace offerings, which was for the people: and Aaron's sons presented unto him the blood, which he sprinkled upon the altar round about, And the fat of the bullock and of the ram, the rump, and that which covereth the inwards, and the kidneys, and the caul above the liver:"
          reference="Leviticus 9:18 and 19"
        />
        <VerseQuote
          text="And they put the fat upon the breasts, and he burnt the fat upon the altar: And the breasts and the right shoulder Aaron waved for a wave offering before the LORD; as Moses commanded."
          reference="Leviticus 9:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In Leviticus 8, Moses waved the breast himself, because there was no priest
            yet to receive it.</strong> Here, Aaron waves it with his own hands. The portion still
            ends up where it always belonged, with the priesthood, except now a priest is actually
            standing there to do the waving.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Aaron Blesses the People (verse 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With every animal offered, Aaron does something no one has done for Israel before.</p>
        </div>
        <VerseQuote
          text="And Aaron lifted up his hand toward the people, and blessed them, and came down from offering of the sin offering, and the burnt offering, and peace offerings."
          reference="Leviticus 9:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the first time Israel&apos;s own priesthood blesses the people, spoken by
            the man who moments earlier had been offering a sin offering for his own guilt. The
            order matters. Aaron does not bless the people first and then deal with sin. He deals
            with sin, all of it, his own included, and only then lifts his hand over them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Fire That Fell (verses 23 and 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses and Aaron step inside the tabernacle together, and what happens when they come back out is the whole chapter&apos;s answer.</p>
        </div>
        <VerseQuote
          text="And Moses and Aaron went into the tabernacle of the congregation, and came out, and blessed the people: and the glory of the LORD appeared unto all the people."
          reference="Leviticus 9:23"
        />
        <VerseQuote
          text="And there came a fire out from before the LORD, and consumed upon the altar the burnt offering and the fat: which when all the people saw, they shouted, and fell on their faces."
          reference="Leviticus 9:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The fire on this altar had already been burning. Human hands had lit it and
            fed it since Leviticus 8.</strong> What falls here is a second fire, from the LORD
            Himself, consuming what was already on the altar in a way no priest could have
            produced with wood and a spark. The people do not just witness a sacrifice. They
            witness it answered.
          </p>
          <p>
            Every promise this chapter made comes true in these two verses. Verse 4 said the LORD
            would appear. Verse 6 said His glory would appear. Verse 23 and 24 show exactly that
            happening, in front of everyone who had gathered, not behind a curtain only Aaron could
            see.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 9 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did Aaron still need a sin offering for himself, after seven days of
            consecration and blood already applied to his ear, thumb, and toe?</strong> Leviticus 9
            never explains the overlap directly, but the pattern it sets stands on its own:
            consecration set Aaron apart for the office, and it never claimed to make him sinless.
            Hebrews later makes the contrast explicit, describing a high priest &quot;who needeth
            not daily, as those high priests, to offer up sacrifice, first for his own sins, and
            then for the people&apos;s,&quot; naming exactly the pattern Aaron follows here as
            something Christ&apos;s priesthood would not require.
          </p>
          <p>
            <strong>Why does verse 21 say the wave offering was done &quot;as Moses commanded,&quot;
            instead of the &quot;as the LORD commanded Moses&quot; refrain that ran through all of
            Leviticus 8?</strong> The text states it this way without drawing attention to the
            change. What is observable is that Leviticus 8 described Moses performing every action
            himself under direct divine instruction, while Leviticus 9 shows Aaron and his sons
            doing the work, with Moses now relaying what to do rather than doing it. The wording
            shift lines up with a priesthood that has started functioning on its own.
          </p>
          <p>
            <strong>Was the people&apos;s sin offering in verse 15 eaten by the priests, the way{" "}
            <ArticleLink href="/blog/leviticus-6-explained">Leviticus 6</ArticleLink> describes for
            an ordinary sin offering, or burned outside the camp like Aaron&apos;s own calf?</strong>{" "}
            Verse 15 only says it was offered &quot;as the first,&quot; without specifying what
            happened to the body afterward. Leviticus 6:26 and 30 would normally point toward the
            priests eating a sin offering whose blood never entered the tabernacle itself, but the
            chapter does not say so outright for this particular goat, and a careful reader should
            hold that detail as genuinely unstated rather than settled either way.
          </p>
          <p>
            <strong>Why did fire fall from the LORD to consume an offering that was already
            burning?</strong> Leviticus 9:24 records the event without explaining the mechanism
            behind it. What the text does make unmistakable is the effect: a sign the people could
            see with their own eyes, not a private assurance given only to Aaron. The same kind of
            fire &quot;from before the LORD&quot; appears again in the very next chapter, with a
            far different result.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 9:4</h3>
        <VerseQuote
          text="Also a bullock and a ram for peace offerings, to sacrifice before the LORD; and a meat offering mingled with oil: for to day the LORD will appear unto you."
          reference="Leviticus 9:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The promise stated before a single animal dies. Everything that follows in the chapter
          is this one sentence being kept.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 9:7</h3>
        <VerseQuote
          text="And Moses said unto Aaron, Go unto the altar, and offer thy sin offering, and thy burnt offering, and make an atonement for thyself, and for the people: and offer the offering of the people, and make an atonement for them; as the LORD commanded."
          reference="Leviticus 9:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Aaron&apos;s first order as a working priest: deal with your own guilt before you deal
          with anyone else&apos;s.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 9:17</h3>
        <VerseQuote
          text="And he brought the meat offering, and took an handful thereof, and burnt it upon the altar, beside the burnt sacrifice of the morning."
          reference="Leviticus 9:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A quiet reminder that ordinary priestly duty, the daily burnt offering, kept running
          underneath this extraordinary day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 9:22</h3>
        <VerseQuote
          text="And Aaron lifted up his hand toward the people, and blessed them, and came down from offering of the sin offering, and the burnt offering, and peace offerings."
          reference="Leviticus 9:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first blessing spoken by Israel&apos;s own priesthood, spoken only after sin had
          already been dealt with.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 9:24</h3>
        <VerseQuote
          text="And there came a fire out from before the LORD, and consumed upon the altar the burnt offering and the fat: which when all the people saw, they shouted, and fell on their faces."
          reference="Leviticus 9:24"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The promise of verse 4 kept in full view of the whole camp, answered by fire no human
          hand lit.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 9
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 9 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 9 records the eighth day, the first day Aaron actually functions as a priest
          after the seven days of ordination in Leviticus 8. He offers a sin offering and a burnt
          offering for himself, then offers the people&apos;s sin offering, burnt offering, peace
          offerings, and grain offering, blesses the people, and fire comes from the LORD to
          consume the offering in front of everyone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the eighth day in Leviticus 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the day immediately after the seven days Aaron and his sons spent at the
          tabernacle door in Leviticus 8:33 to 35. Leviticus 9:1 opens on that eighth day as the
          first time the new priesthood actually performs its duties rather than having everything
          done for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Aaron offer a sin offering for himself?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 9:7 has Moses tell Aaron to offer for himself first, making atonement for
          himself and the people together, before offering anything for the people alone.
          Consecration had set Aaron apart for the office; it never claimed to remove his own
          ongoing need for atonement, a gap Hebrews later points to directly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What animals were sacrificed in Leviticus 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Aaron brought a calf for a sin offering and a ram for a burnt offering, for himself. The
          people brought a goat for a sin offering, a calf and a lamb for a burnt offering, and a
          bullock and a ram for peace offerings, along with a grain offering mixed with oil. Seven
          animals in total died that day, plus the grain gift.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did fire come down from the LORD in Leviticus 9?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 9:24 does not explain the mechanism, only the result. It served as visible
          proof, seen by the whole congregation, that the offerings had been accepted, fulfilling
          the promise made in verse 4 that the LORD would appear that same day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the glory of the LORD appeared&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes God making His presence visibly known to the people, not merely assumed or
          taken on faith. Leviticus 9:6 promises this appearance before the sacrifices begin, and
          verse 23 records it actually happening once Moses and Aaron came out of the tabernacle.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 9 connect to Leviticus 10?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 9 ends with fire from the LORD consuming an offering, met with shouting and
          worship. Leviticus 10 opens with two of Aaron&apos;s own sons offering unauthorized
          &quot;strange fire,&quot; and a fire from the LORD consumes them instead. The same source
          of fire produces joy in one chapter and judgment in the very next.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Aaron perform the sacrifices himself this time?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, unlike Leviticus 8, where Moses killed every animal and handled every detail because
          Aaron was still being ordained. In Leviticus 9, Aaron slays the animals himself, and his
          own sons hand him the blood, the first time the new priesthood functions as a working
          team.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was the people&apos;s sin offering eaten or burned outside the camp?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 9:15 says it was offered &quot;as the first,&quot; tying it to Aaron&apos;s own
          calf, without stating directly what happened to the body afterward. The chapter leaves
          that specific detail unstated rather than settling it plainly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 9 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Aaron offered for his own sin before he could offer for anyone else&apos;s, a pattern
          every high priest after him repeated. Hebrews 7:27 contrasts that pattern with Christ,
          who &quot;needeth not daily... to offer up sacrifice, first for his own sins,&quot;
          because He offered Himself once instead.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 9 is the day two chapters of preparation finally had to prove something.</p>
          <p>
            📌 <strong>A priest deals with his own guilt before he deals with anyone else&apos;s.</strong>{" "}
            Aaron&apos;s first act in office was a sin offering for himself, not a blessing for the
            crowd waiting on him.
          </p>
          <p>
            📌 <strong>The promise came before the proof.</strong> Verse 4 said the LORD would
            appear that day. Verse 24 shows Him keeping that word, in view of everyone who had
            gathered to watch.
          </p>
          <p>
            📌 <strong>Ordinary duty kept running underneath the extraordinary day.</strong> The
            regular morning sacrifice still burned, &quot;beside&quot; everything special
            happening around it, a reminder that a calling is carried out in the routine as much as
            in the dramatic moment.
          </p>
          <p>
            You will never stand at a bronze altar waiting for visible fire. But this chapter still
            asks whether you deal with your own sin honestly before you try to speak into anyone
            else&apos;s life.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Before you pray for someone else today, take the same order Aaron did. Bring your own
            need to God first.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
