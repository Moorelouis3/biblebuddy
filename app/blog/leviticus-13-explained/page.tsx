import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-13-explained", {
  title: "Leviticus 13 Explained: Skin Disease, Leprosy, and the Priest's Test",
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

export default function LeviticusThirteenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-13-explained"
      title={<>📖 Leviticus 13 Explained: Skin Disease, Leprosy, and the Priest&apos;s Test</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Fifty nine verses. One priest. No medicine chest anywhere in sight.</p>
            <p>
              <strong>Leviticus 13 explained</strong> is the chapter that hands Aaron and his sons
              the hardest judgment call in the whole book: look at a rash, a boil, a bald patch, or
              a stain on a coat, and decide whether it is nothing at all or something that puts a
              person outside the camp.
            </p>
            <p>Maybe you have skimmed this chapter and filed it away as an ancient list of skin diseases.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a spot covering someone&apos;s entire body count as clean, while a smaller one counts as unclean?</li>
            <li>❓ Why does plain baldness get its own verse just to say it is not leprosy at all?</li>
            <li>❓ Why does the same chapter that examines a man&apos;s skin also examine a coat?</li>
            <li>❓ And why does a healed leper in the Gospels still walk straight to a priest and this exact chapter?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 13 never once tells the priest to treat the disease. It only
              teaches him how to tell what is active and spreading from what only looks that
              way.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the first test of a
              rising, a scab, or a bright spot, the strange rule that total whiteness makes a
              person clean, boils and burns that turn suspicious long after they heal, the
              exceptions carved out for ordinary baldness and freckles, the leper&apos;s own cry at
              the edge of the camp, and the same careful process run all over again on a piece of
              wool or leather.
            </p>
            <p>Read slowly. The patience built into this chapter is easy to miss under all the skin.</p>
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
            <ArticleLink href="/blog/leviticus-12-explained">Leviticus 12</ArticleLink> closed the
            shortest chapter in the book so far, eight verses settling one kind of uncleanness tied
            to one kind of blood, ending at one fixed offering on one of two fixed days, forty or
            eighty.
          </p>
          <p>
            Leviticus 13 opens onto a far less tidy problem. There is no fixed number of days here
            and no single offering that closes it. A rash, a boil gone wrong, a bald patch, even a
            stain in a coat, has to be watched, and watched again, before anyone can say what it
            really is. The LORD speaks to Moses and Aaron together this time, handing them a task no
            single glance can finish: looking carefully, more than once, before deciding.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 13 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The First Test: A Rising, a Scab, or a Bright Spot (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming the three kinds of mark that can start the whole process.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses and Aaron, saying, When a man shall have in the skin of his flesh a rising, a scab, or bright spot, and it be in the skin of his flesh like the plague of leprosy; then he shall be brought unto Aaron the priest, or unto one of his sons the priests: And the priest shall look on the plague in the skin of the flesh: and when the hair in the plague is turned white, and the plague in sight be deeper than the skin of his flesh, it is a plague of leprosy: and the priest shall look on him, and pronounce him unclean."
          reference="Leviticus 13:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Two signs together make an instant verdict: hair inside the spot turned
            white, and the spot sitting deeper than the skin around it.</strong> When both are
            present, the priest does not wait a single day. He pronounces the man unclean on the
            spot.
          </p>
          <p>When those two signs are not both clearly present, the chapter slows down.</p>
        </div>
        <VerseQuote
          text="If the bright spot be white in the skin of his flesh, and in sight be not deeper than the skin, and the hair thereof be not turned white; then the priest shall shut up him that hath the plague seven days: And the priest shall look on him the seventh day: and, behold, if the plague in his sight be at a stay, and the plague spread not in the skin; then the priest shall shut him up seven days more: And the priest shall look on him again the seventh day: and, behold, if the plague be somewhat dark, and the plague spread not in the skin, the priest shall pronounce him clean: it is but a scab: and he shall wash his clothes, and be clean."
          reference="Leviticus 13:4 to 6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Shut up&quot; here means kept apart and watched, not thrown out of the camp.
            That only happens once a verdict is actually reached. Two full weeks of watching, not
            one glance, stand between an ambiguous mark and a final answer, and the mark fading to
            &quot;somewhat dark&quot; is read as a healing sign, not a worsening one.
          </p>
          <p>Even a case the priest has already called clean can be reopened.</p>
        </div>
        <VerseQuote
          text="But if the scab spread much abroad in the skin, after that he hath been seen of the priest for his cleansing, he shall be seen of the priest again: And if the priest see that, behold, the scab spreadeth in the skin, then the priest shall pronounce him unclean: it is a leprosy."
          reference="Leviticus 13:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ A clean verdict was never treated as permanent protection against new evidence. If the
            mark spreads later, the man returns to the priest and the case is judged again, on what
            is true now, not on what was decided before.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Old Leprosy, and the Paradox of Total Whiteness (verses 9 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns to a case severe enough to skip the waiting period entirely.</p>
        </div>
        <VerseQuote
          text="When the plague of leprosy is in a man, then he shall be brought unto the priest; And the priest shall see him: and, behold, if the rising be white in the skin, and it have turned the hair white, and there be quick raw flesh in the rising; It is an old leprosy in the skin of his flesh, and the priest shall pronounce him unclean, and shall not shut him up: for he is unclean."
          reference="Leviticus 13:9 to 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Quick raw flesh&quot; means living, open tissue, not a scar. With that sign
            already present alongside white hair, there is nothing left to observe. The man is
            pronounced unclean the same day, with no seven day window at all.
          </p>
          <p>Then comes the strangest verse pair in the whole chapter.</p>
        </div>
        <VerseQuote
          text="And if a leprosy break out abroad in the skin, and the leprosy cover all the skin of him that hath the plague from his head even to his foot, wheresoever the priest looketh; Then the priest shall consider: and, behold, if the leprosy have covered all his flesh, he shall pronounce him clean that hath the plague: it is all turned white: he is clean."
          reference="Leviticus 13:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A man covered head to foot is pronounced clean, while a small partial spot
            can be pronounced unclean.</strong> The rule only sounds backward until you notice what
            this entire chapter is actually tracking. It was never how much skin is affected. It
            was always whether raw, open flesh is visible anywhere. Total, even whiteness leaves no
            raw flesh exposed for the priest to point to. A smaller spot with living, open tissue
            still inside it does.
          </p>
          <p>The very next verses confirm that raw flesh, not whiteness, is the real line.</p>
        </div>
        <VerseQuote
          text="But when raw flesh appeareth in him, he shall be unclean. And the priest shall see the raw flesh, and pronounce him to be unclean: for the raw flesh is unclean: it is a leprosy. Or if the raw flesh turn again, and be changed unto white, he shall come unto the priest; And the priest shall see him: and, behold, if the plague be turned into white; then the priest shall pronounce him clean that hath the plague: he is clean."
          reference="Leviticus 13:14 to 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A single person could move between clean and unclean more than once in this chapter, as
            raw flesh appeared and then turned white again. The verdict was never about history. It
            was always about what the skin showed right now.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Boils and Burns That Turn Suspicious Later (verses 18 to 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter now asks a question nobody has raised yet: what if a wound had already
            healed, and only later did something strange grow in its place?
          </p>
        </div>
        <VerseQuote
          text="The flesh also, in which, even in the skin thereof, was a boil, and is healed, And in the place of the boil there be a white rising, or a bright spot, white, and somewhat reddish, and it be shewed to the priest; And if, when the priest seeth it, behold, it be in sight lower than the skin, and the hair thereof be turned white; the priest shall pronounce him unclean: it is a plague of leprosy broken out of the boil."
          reference="Leviticus 13:18 to 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A wound that had already healed was never treated as permanently safe ground. The
            same two signs from verse 3, white hair and a mark sitting lower than the skin around
            it, are checked again, even inside an old scar.
          </p>
          <p>When those signs are not clearly present, the chapter allows exactly one week to watch, not two.</p>
        </div>
        <VerseQuote
          text="But if the priest look on it, and, behold, there be no white hairs therein, and if it be not lower than the skin, but be somewhat dark; then the priest shall shut him up seven days: And if it spread much abroad in the skin, then the priest shall pronounce him unclean: it is a plague. But if the bright spot stay in his place, and spread not, it is a burning boil; and the priest shall pronounce him clean."
          reference="Leviticus 13:21 to 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice this case gets only a single seven day window, not the two rounds given to the
            opening skin test. The chapter does not apply one identical timetable everywhere. It
            fits the length of watching to the kind of mark in front of the priest.
          </p>
          <p>A burn scar gets the same careful treatment, almost word for word.</p>
        </div>
        <VerseQuote
          text="Or if there be any flesh, in the skin whereof there is a hot burning, and the quick flesh that burneth have a white bright spot, somewhat reddish, or white; Then the priest shall look upon it: and, behold, if the hair in the bright spot be turned white, and it be in sight deeper than the skin; it is a leprosy broken out of the burning: wherefore the priest shall pronounce him unclean: it is the plague of leprosy. But if the priest look on it, and, behold, there be no white hair in the bright spot, and it be no lower than the other skin, but be somewhat dark; then the priest shall shut him up seven days:"
          reference="Leviticus 13:24 to 26"
        />
        <VerseQuote
          text="And the priest shall look upon him the seventh day: and if it be spread much abroad in the skin, then the priest shall pronounce him unclean: it is the plague of leprosy. And if the bright spot stay in his place, and spread not in the skin, but it be somewhat dark; it is a rising of the burning, and the priest shall pronounce him clean: for it is an inflammation of the burning."
          reference="Leviticus 13:27 and 28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The boil rule and the burn rule run the same test twice, almost in the same
            words.</strong> The law was not inventing a new standard for every possible wound. It
            was reapplying one consistent test, white hair and depth below the skin, to whatever
            case actually walked up to the priest.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Scalls on the Head, and the Exceptions for Baldness and Freckles (verses 29 to 44)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Hair itself gets involved in the diagnosis once the plague reaches the head or beard.</p>
        </div>
        <VerseQuote
          text="If a man or woman have a plague upon the head or the beard; Then the priest shall see the plague: and, behold, if it be in sight deeper than the skin; and there be in it a yellow thin hair; then the priest shall pronounce him unclean: it is a dry scall, even a leprosy upon the head or beard. And if the priest look on the plague of the scall, and, behold, it be not in sight deeper than the skin, and that there is no black hair in it; then the priest shall shut up him that hath the plague of the scall seven days:"
          reference="Leviticus 13:29 to 31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the sign changes here. On the body it was white hair. On the head or beard it
            is thin, yellow hair. The chapter does not force one test onto every part of the body.
            It tracks whatever sign actually shows up in that location.
          </p>
          <p>A detail in the watching period shows exactly how carefully the priest was meant to look.</p>
        </div>
        <VerseQuote text="He shall be shaven, but the scall shall he not shave; and the priest shall shut up him that hath the scall seven days more:" reference="Leviticus 13:33" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The man shaved everywhere except the exact patch in question, so nothing could hide or
            disguise the one spot the priest actually needed to keep watching.
          </p>
        </div>
        <VerseQuote
          text="Then the priest shall look on him: and, behold, if the scall be spread in the skin, the priest shall not seek for yellow hair; he is unclean. But if the scall be in his sight at a stay, and that there is black hair grown up therein; the scall is healed, he is clean: and the priest shall pronounce him clean."
          reference="Leviticus 13:36 and 37"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Black hair growing back is treated as proof of healing, not just the absence
            of spreading.</strong> The chapter looks for a positive sign of restoration, not only a
            lack of new damage.
          </p>
          <p>Right after the hardest cases, the chapter stops to protect two conditions from ever being mistaken for leprosy at all.</p>
        </div>
        <VerseQuote
          text="If a man also or a woman have in the skin of their flesh bright spots, even white bright spots; Then the priest shall look: and, behold, if the bright spots in the skin of their flesh be darkish white; it is a freckled spot that groweth in the skin; he is clean. And the man whose hair is fallen off his head, he is bald; yet is he clean. And he that hath his hair fallen off from the part of his head toward his face, he is forehead bald: yet is he clean."
          reference="Leviticus 13:38 to 41"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Freckles and ordinary baldness get named outright and declared clean, with no
            waiting period at all.</strong> Nobody had to wonder for a week whether losing their hair
            meant something was wrong with them. The law said so plainly, in advance.
          </p>
          <p>Even here, though, a bald head is not automatically safe from every mark.</p>
        </div>
        <VerseQuote
          text="And if there be in the bald head, or bald forehead, a white reddish sore; it is a leprosy sprung up in his bald head, or his bald forehead. Then the priest shall look upon it: and, behold, if the rising of the sore be white reddish in his bald head, or in his bald forehead, as the leprosy appeareth in the skin of the flesh; He is a leprous man, he is unclean: the priest shall pronounce him utterly unclean; his plague is in his head."
          reference="Leviticus 13:42 to 44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Baldness itself was never the problem. A new sore on a bald scalp, matching the same
            visible signs used throughout the rest of the chapter, still had to be examined on its
            own terms.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Leper&apos;s Cry, and Life Outside the Camp (verses 45 and 46)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the verdict is unclean, the chapter describes what the rest of his life looks like for as long as the plague remains.</p>
        </div>
        <VerseQuote
          text="And the leper in whom the plague is, his clothes shall be rent, and his head bare, and he shall put a covering upon his upper lip, and shall cry, Unclean, unclean. All the days wherein the plague shall be in him he shall be defiled; he is unclean: he shall dwell alone; without the camp shall his habitation be."
          reference="Leviticus 13:45 and 46"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Torn clothes and a bare head were forbidden to Aaron&apos;s own sons in{" "}
            <ArticleLink href="/blog/leviticus-10-explained">Leviticus 10</ArticleLink>, right after
            Nadab and Abihu died.</strong> Here the leper is told to wear exactly those same marks.
            The same two signs of mourning that were off limits to priests grieving a death become
            required for a man the chapter sends to live outside the camp.
          </p>
          <p>
            The cry itself was not self punishment. &quot;Unclean, unclean,&quot; shouted ahead of
            him, warned anyone nearby before they came near enough to touch him. And the sentence is
            tied to the plague, not to the man for life: &quot;all the days wherein the plague shall
            be in him.&quot; The moment the signs change, so does the verdict, as verses 6, 17, and
            37 have already shown.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. When the Plague Lives in a Garment (verses 47 to 59)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter&apos;s final move is the one easiest to miss: the same word, the same test, applied to cloth and leather.</p>
        </div>
        <VerseQuote
          text="The garment also that the plague of leprosy is in, whether it be a woollen garment, or a linen garment; Whether it be in the warp, or woof; of linen, or of woollen; whether in a skin, or in any thing made of skin; And if the plague be greenish or reddish in the garment, or in the skin, either in the warp, or in the woof, or in any thing of skin; it is a plague of leprosy, and shall be shewed unto the priest:"
          reference="Leviticus 13:47 to 49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A greenish or reddish growth spreading through wool, linen, or leather is widely
            understood as a form of mold or mildew, the closest fabric equivalent to the spreading
            skin conditions the chapter has already spent forty six verses examining.
          </p>
          <p>The same pattern of watching and re-examining returns, this time ending in fire instead of a return to the camp.</p>
        </div>
        <VerseQuote
          text="And the priest shall look upon the plague, and shut up it that hath the plague seven days: And he shall look on the plague on the seventh day: if the plague be spread in the garment, either in the warp, or in the woof, or in a skin, or in any work that is made of skin; the plague is a fretting leprosy; it is unclean. He shall therefore burn that garment, whether warp or woof, in woollen or in linen, or any thing of skin, wherein the plague is: for it is a fretting leprosy; it shall be burnt in the fire."
          reference="Leviticus 13:50 to 52"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ &quot;Fretting&quot; means eating away or corroding, matching exactly how mold or
            mildew actually behaves in cloth. Unlike a man or woman, a garment gets no second
            diagnosis once it is confirmed spreading. It is burned, in full.
          </p>
          <p>If the mark has not spread, the chapter tries something gentler first.</p>
        </div>
        <VerseQuote
          text="And if the priest shall look, and, behold, the plague be not spread in the garment, either in the warp, or in the woof, or in any thing of skin; Then the priest shall command that they wash the thing wherein the plague is, and he shall shut it up seven days more: And the priest shall look on the plague, after that it is washed: and, behold, if the plague have not changed his colour, and the plague be not spread; it is unclean; thou shalt burn it in the fire; it is fret inward, whether it be bare within or without. And if the priest look, and, behold, the plague be somewhat dark after the washing of it; then he shall rend it out of the garment, or out of the skin, or out of the warp, or out of the woof:"
          reference="Leviticus 13:53 to 56"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Somewhat dark&quot; is the chapter&apos;s own recurring word for a
            mark losing its danger.</strong> It shows up five times across Leviticus 13, in the
            first skin test, the boil case, the burn case, and twice in this garment rule, and
            every time it points toward the milder outcome, continued watching or a clean verdict,
            never a confirmed, spreading plague. Where the mark goes dark after washing here, the
            priest tears out only that one patch and saves the rest of the garment.
          </p>
        </div>
        <VerseQuote
          text="And if it appear still in the garment, either in the warp, or in the woof, or in any thing of skin; it is a spreading plague: thou shalt burn that wherein the plague is with fire. And the garment, either warp, or woof, or whatsoever thing of skin it be, which thou shalt wash, if the plague be departed from them, then it shall be washed the second time, and shall be clean. This is the law of the plague of leprosy in a garment of woollen or linen, either in the warp, or woof, or any thing of skins, to pronounce it clean, or to pronounce it unclean."
          reference="Leviticus 13:57 to 59"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The chapter&apos;s very last phrase, &quot;to pronounce it clean, or to
            pronounce it unclean,&quot; is the same job{" "}
            <ArticleLink href="/blog/leviticus-11-explained">Leviticus 11</ArticleLink> called
            making a difference between the unclean and the clean.</strong> Fifty nine verses that
            began on a man&apos;s skin end on a coat, using the exact same skill the whole book has
            been handing to the priesthood from the start.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 13 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Is the &quot;leprosy&quot; of Leviticus 13 the same disease doctors mean by
            leprosy today?</strong> Almost certainly not as one single illness. The Hebrew word
            behind &quot;leprosy&quot; in this chapter covers a broad family of visible skin and
            surface conditions, not one specific disease. The modern medical condition usually
            meant by leprosy, Hansen&apos;s disease, does not match several of the cases this
            chapter actually describes, including a mark that spreads briefly and then simply fades
            and heals within two weeks. Most Bible scholars read this word as a wider category of
            serious or spreading skin conditions, only some of which may ever have included true
            Hansen&apos;s disease.
          </p>
          <p>
            <strong>Does having one of these conditions mean the person had sinned?</strong>{" "}
            Leviticus 13 never says that. Not one verse in fifty nine ties the skin condition to a
            specific wrong the person did. The whole chapter is occupied with a different question:
            is this active and spreading, or not.{" "}
            <ArticleLink href="/blog/what-is-sin">Leviticus already treats ceremonial
            uncleanness as its own category</ArticleLink>, separate from guilt, and this chapter
            never blurs that line.
          </p>
          <p>
            <strong>Why does total whiteness count as clean while a smaller spot counts as
            unclean?</strong> The walkthrough above explains it, but it is worth stating plainly
            because it is the strangest rule in the chapter. The test running from the first verse
            to the last was never how much skin is affected. It was whether raw, open flesh is
            visible anywhere. Complete, even whiteness leaves no raw flesh exposed for the priest to
            point to. A smaller spot with living, open tissue inside it does.
          </p>
          <p>
            <strong>Was being sent outside the camp a cruel punishment?</strong> The chapter does
            not read like one. It reads like a process built to reverse itself the moment the
            evidence changes: wait a week, look again, pronounce clean the instant a scab fades or
            black hair grows back into a healed scall. The exile lasted only as long as the plague
            itself, not for life, and the many clean verdicts written into this chapter, for
            freckles, for baldness, for a faded scab, show a law working hard not to call someone
            unclean a day longer than the signs required. {" "}
            <ArticleLink href="/blog/why-does-god-allow-suffering">Why a condition like this
            existed at all</ArticleLink> is a harder question than the chapter answers, but how it
            handled the condition once it appeared is not left in doubt.
          </p>
          <p>
            <strong>Why does a priest make this call instead of a physician?</strong> Because the
            question this chapter answers was never medical. It was ceremonial: could this person
            safely come near the tabernacle and the rest of the congregation. The chapter names no
            herb, no treatment, no cure of any kind, only observation and a verdict. Whatever
            healing happens here happens on its own; the priest&apos;s entire task is deciding what
            is already true, not making anyone well.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 13:2 and 3</h3>
        <VerseQuote
          text="When a man shall have in the skin of his flesh a rising, a scab, or bright spot, and it be in the skin of his flesh like the plague of leprosy; then he shall be brought unto Aaron the priest, or unto one of his sons the priests: And the priest shall look on the plague in the skin of the flesh: and when the hair in the plague is turned white, and the plague in sight be deeper than the skin of his flesh, it is a plague of leprosy: and the priest shall look on him, and pronounce him unclean."
          reference="Leviticus 13:2 and 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The two signs that decide an instant verdict in this chapter: hair turned white inside
          the mark, and the mark sitting deeper than the skin around it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 13:6</h3>
        <VerseQuote
          text="And the priest shall look on him again the seventh day: and, behold, if the plague be somewhat dark, and the plague spread not in the skin, the priest shall pronounce him clean: it is but a scab: and he shall wash his clothes, and be clean."
          reference="Leviticus 13:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Two full weeks of watching before this verdict, and proof that the chapter was built to
          declare someone clean, not just to catch disease.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 13:12 and 13</h3>
        <VerseQuote
          text="And if a leprosy break out abroad in the skin, and the leprosy cover all the skin of him that hath the plague from his head even to his foot, wheresoever the priest looketh; Then the priest shall consider: and, behold, if the leprosy have covered all his flesh, he shall pronounce him clean that hath the plague: it is all turned white: he is clean."
          reference="Leviticus 13:12 and 13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s strangest rule: total whiteness head to foot is pronounced clean,
          because raw flesh, not the amount of skin affected, is the real sign being tracked.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 13:45 and 46</h3>
        <VerseQuote
          text="And the leper in whom the plague is, his clothes shall be rent, and his head bare, and he shall put a covering upon his upper lip, and shall cry, Unclean, unclean. All the days wherein the plague shall be in him he shall be defiled; he is unclean: he shall dwell alone; without the camp shall his habitation be."
          reference="Leviticus 13:45 and 46"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A sentence tied to the plague, not the person, lasting only as long as the condition
          itself remained.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 13:59</h3>
        <VerseQuote
          text="This is the law of the plague of leprosy in a garment of woollen or linen, either in the warp, or woof, or any thing of skins, to pronounce it clean, or to pronounce it unclean."
          reference="Leviticus 13:59"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s own closing summary, applying the same skill of making a difference
          between clean and unclean all the way down to a piece of cloth.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 13 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 13 gives the priest a detailed process for examining skin conditions, from a
          first rising or bright spot through old sores, boils, burns, scalls on the head or beard,
          and even mold-like growth in a garment, deciding in each case whether it is clean or
          unclean.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Leviticus 13 say about leprosy?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes a set of visible signs, mainly white hair inside a mark and the mark sitting
          deeper than the surrounding skin, that the priest checks before pronouncing a person
          unclean. When those signs are not clearly present, the person is watched for one or two
          weeks before any final verdict.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the leprosy in Leviticus 13 the same as leprosy today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not as one single disease. The underlying word covers a broad category of skin and
          surface conditions, and several cases in this chapter, such as a mark that fades and
          heals within two weeks, do not match Hansen&apos;s disease, the illness usually meant by
          leprosy today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did a priest examine skin conditions instead of a doctor?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because the question was ceremonial, not medical: could this person safely remain near
          the tabernacle and the camp. The chapter names no treatment or cure anywhere in its fifty
          nine verses, only observation and a verdict.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does total whiteness make a person clean in Leviticus 13?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 13:12 and 13 pronounce a person covered head to foot in white clean, because the
          chapter is tracking raw, open flesh, not the amount of skin affected. Complete whiteness
          leaves no raw flesh for the priest to point to.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;unclean, unclean&quot; mean in Leviticus 13:45?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was a warning cry a leper shouted ahead of himself so others would know not to come
          close, worn alongside torn clothes and a bare head, the same two signs forbidden to
          Aaron&apos;s own sons in Leviticus 10 while they mourned their brothers&apos; deaths.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were people with skin conditions sent to live outside the camp?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 13:46 ties the separation to the plague itself, not to the person for life:
          &quot;all the days wherein the plague shall be in him.&quot; The moment the signs changed,
          as shown throughout the chapter, so did the verdict.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Can mold or mildew in clothing really be called &quot;leprosy&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 13:47 to 59 applies the same word and nearly the same test used for skin to a
          greenish or reddish growth in wool, linen, or leather, widely understood as describing
          mold or mildew spreading through fabric.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Leviticus 13 teach that skin disease is a punishment for sin?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No verse in the chapter connects a skin condition to a specific sin. The entire text is
          occupied with whether a mark is active and spreading, never with assigning blame for how
          it got there.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 13 connect to Jesus healing lepers in the Gospels?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Gospels describe Jesus healing lepers and then sending them to show themselves to a
          priest, the same examination this chapter lays out in detail. What took the priest weeks
          of careful watching to confirm, Jesus settled with a touch and a word.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 13 is the longest chapter in Leviticus so far, and nearly all of it is the priest looking, waiting, and looking again.</p>
          <p>
            📌 <strong>Nothing in this chapter is rushed.</strong> A week of watching, then another
            week if needed, stands between an ambiguous mark and a final verdict, in case after
            case.
          </p>
          <p>
            📌 <strong>Whiteness was never the enemy. Raw, active flesh was.</strong> A person
            covered head to foot in white is called clean, because the one sign this chapter is
            actually hunting for is gone.
          </p>
          <p>
            📌 <strong>The law protected the ordinary before it ever examined the alarming.</strong>{" "}
            Freckles and plain baldness are named and cleared outright, so no one had to spend a
            single week wondering about them.
          </p>
          <p>
            You will likely never stand before a priest waiting on a seven day verdict. But this
            chapter still shows a God willing to look closely, more than once, before deciding
            anything about a person.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read how Jesus later touches exactly this kind of raw, unclean flesh and declares the
            man clean with a single word, the same verdict Leviticus 13 spent weeks of careful
            watching to reach.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
