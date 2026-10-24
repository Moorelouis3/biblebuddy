import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-22-explained", {
  title: "Leviticus 22 Explained: Who Could Eat the Holy Things",
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

export default function LeviticusTwentyTwoExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-22-explained"
      title={<>📖 Leviticus 22 Explained: Who Could Eat the Holy Things</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Two questions run through this entire chapter. Who gets to eat it. What gets to be offered.</p>
            <p>
              <strong>Leviticus 22 explained</strong> is the chapter where God turns from the
              priests themselves, the subject of the whole previous chapter, to the food they
              handled and the animals they brought to the altar on everyone else&apos;s behalf. A
              priest could be perfectly healthy and still be barred from the holy bread that
              afternoon. A lamb could look fine from a distance and still be rejected at the altar
              gate.
            </p>
            <p>Maybe you have assumed holiness in this book was only ever about people.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why would touching a dead bug stop a priest from eating his own dinner?</li>
            <li>❓ Why can a priest&apos;s widowed daughter eat the holy food again, but his married daughter cannot?</li>
            <li>❓ Why does a newborn animal have to wait seven days before it can be offered?</li>
            <li>❓ And why does the chapter ban killing a mother animal and her young on the same day?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 22 applies the same unblemished standard twice over, once to
              the men who ate the holy food, and once to the animals laid on the altar.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the uncleanness that could
              shut a priest out of his own holy meal, exactly who in a priest&apos;s household was
              allowed to eat it, the blemish list for offerings that echoes the one just given for
              priests, the seven day wait before a newborn animal could be offered, the ban on
              killing a mother and her young the same day, and the short refrain that closes the
              chapter.
            </p>
            <p>Read slowly. This chapter connects two rules you might never have put side by side.</p>
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
            <ArticleLink href="/blog/leviticus-21-explained">Leviticus 21</ArticleLink> narrowed
            the lens from Israel as a whole down to the sons of Aaron, and closed with a list of
            physical blemishes that barred a priest from approaching the altar, while still
            letting him eat the holy bread at his own family&apos;s table. That chapter was about
            the man&apos;s own body.
          </p>
          <p>
            Leviticus 22 keeps the family of Aaron in view but changes what it is measuring. The
            first half asks whether a priest is clean enough, right now, to eat the food Leviticus
            21 just said he could eat. The second half takes the exact blemish language used for
            priests and applies it to the animals those priests laid on the altar. The two
            chapters are a matched pair: one governs the man who serves, the other governs the
            service itself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 22 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Clean Enough to Eat the Holy Things (verses 1 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a warning aimed squarely at the priests, not at outsiders.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Speak unto Aaron and to his sons, that they separate themselves from the holy things of the children of Israel, and that they profane not my holy name in those things which they hallow unto me: I am the LORD."
          reference="Leviticus 22:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            &quot;Separate themselves&quot; means a priest had to step back from the holy food
            whenever he was ritually unclean, rather than treating his office as a blanket
            permission to eat it whenever he pleased.
          </p>
          <p>
            📌 <strong>Being a son of Aaron by birth was never enough on its own. The next verse
            says plainly what is at stake for ignoring that.</strong>
          </p>
        </div>
        <VerseQuote
          text="Whosoever he be of all your seed among your generations, that goeth unto the holy things, which the children of Israel hallow unto the LORD, having his uncleanness upon him, that soul shall be cut off from my presence: I am the LORD."
          reference="Leviticus 22:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter then lists exactly what could make a priest unclean: leprosy, a bodily
            discharge, touching a dead body, touching a creeping thing, or any other source of
            uncleanness named elsewhere in this book. None of these were framed as sin. They were
            simply states that made a man temporarily unfit to eat holy food.
          </p>
        </div>
        <VerseQuote
          text="The soul which hath touched any such shall be unclean until even, and shall not eat of the holy things, unless he wash his flesh with water. And when the sun is down, he shall be clean, and shall afterward eat of the holy things; because it is his food."
          reference="Leviticus 22:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Notice the uncleanness was never treated as permanent. Wash, wait until evening, and
            a priest was clean again by sundown. The holy food is called plainly &quot;his
            food,&quot; the ordinary provision God had already set aside for a priest&apos;s own
            household, not a reward he had to re-earn each day.
          </p>
          <p>One more line closes this section, aimed at something outside a priest&apos;s own body entirely.</p>
        </div>
        <VerseQuote
          text="That which dieth of itself, or is torn with beasts, he shall not eat to defile himself therewith: I am the LORD."
          reference="Leviticus 22:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Meat from an animal that died on its own or was killed by a predator was off limits
            even to a priest who was otherwise perfectly clean. What went into his body mattered
            just as much as what his body had recently touched.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Who Was Allowed to Eat the Holy Things (verses 10 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            From cleanness, the chapter turns to a second question entirely: who, inside a
            priest&apos;s own household, was even allowed to eat this food in the first place.
          </p>
        </div>
        <VerseQuote
          text="There shall no stranger eat of the holy thing: a sojourner of the priest, or an hired servant, shall not eat of the holy thing."
          reference="Leviticus 22:10"
        />
        <VerseQuote
          text="But if the priest buy any soul with his money, he shall eat of it, and he that is born in his house: they shall eat of his meat."
          reference="Leviticus 22:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The line was drawn by belonging, not by proximity.</strong> A hired hand
            living on the property could not eat the holy food. A servant the priest had bought,
            or a child born into that household, counted as family for this purpose and could eat
            it freely. Nearness to the priest&apos;s table was not the test. Belonging to his
            household was.
          </p>
          <p>Then the chapter names the one case that still surprises readers, a priest&apos;s own daughter.</p>
        </div>
        <VerseQuote
          text="If the priest's daughter also be married unto a stranger, she may not eat of an offering of the holy things. But if the priest's daughter be a widow, or divorced, and have no child, and is returned unto her father's house, as in her youth, she shall eat of her father's meat: but there shall no stranger eat thereof."
          reference="Leviticus 22:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Marrying outside a priestly family moved a woman into her husband&apos;s household,
            and the holy food belonged to the household, not to her by birth. If she later became a
            widow or was divorced, with no child to provide for her, and returned to her
            father&apos;s house exactly the way she had lived before marriage, the holy food
            became hers to eat again. The rule tracks which household actually fed her, nothing
            more.
          </p>
          <p>
            <ArticleLink href="/blog/leviticus-21-explained">Leviticus 21:9</ArticleLink> already
            dealt with a priest&apos;s daughter under a very different scenario, one that carried
            the heaviest penalty in that chapter. This verse is nothing like that one. It is not a
            penalty at all, only a question of which table she belonged to that year.
          </p>
          <p>The section closes with what happens when someone eats the holy food by accident.</p>
        </div>
        <VerseQuote
          text="And if a man eat of the holy thing unwittingly, then he shall put the fifth part thereof unto it, and shall give it unto the priest with the holy thing."
          reference="Leviticus 22:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 An honest mistake still required restitution, the value of what was eaten plus a
            fifth more on top, paid back to the priest. The law did not treat an accident as
            nothing, but it also never confused an accident with the deliberate uncleanness named
            earlier in the chapter.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Offerings Must Be Whole, the Same Standard Just Given to Priests (verses 17 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Halfway through the chapter, the subject flips from the men eating the holy food to
            the animals being offered on the altar.
          </p>
        </div>
        <VerseQuote
          text="Whatsoever he be of the house of Israel, or of the strangers in Israel, that will offer his oblation for all his vows, and for all his freewill offerings, which they will offer unto the LORD for a burnt offering; Ye shall offer at your own will a male without blemish, of the beeves, of the sheep, or of the goats."
          reference="Leviticus 22:18 and 19"
        />
        <VerseQuote
          text="But whatsoever hath a blemish, that shall ye not offer: for it shall not be acceptable for you."
          reference="Leviticus 22:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Compare this to the list Leviticus 21 just gave for the priests
            themselves.</strong> A blind man, a lame man, a man with a flat nose, a man who was
            crookbackt or scurvy or scabbed could not approach the altar. Now almost the identical
            list of conditions disqualifies the animal being brought to that same altar.
          </p>
        </div>
        <VerseQuote
          text="Blind, or broken, or maimed, or having a wen, or scurvy, or scabbed, ye shall not offer these unto the LORD, nor make an offering by fire of them upon the altar unto the LORD."
          reference="Leviticus 22:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Blind and scurvy and scabbed are the same three words Leviticus 21:18 and 20 just used
            for a disqualified priest. The chapter is not inventing a new standard for animals. It
            is applying the exact standard it already applied to the men serving at the altar, this
            time to what those men carried in their arms.
          </p>
          <p>The next verses push the standard further than a simple visible defect.</p>
        </div>
        <VerseQuote
          text="Ye shall not offer unto the LORD that which is bruised, or crushed, or broken, or cut; neither shall ye make any offering thereof in your land. Neither from a stranger's hand shall ye offer the bread of your God of any of these; because their corruption is in them, and blemishes be in them: they shall not be accepted for you."
          reference="Leviticus 22:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Even an animal brought by a foreigner, as a gift on Israel&apos;s behalf, had to
            meet the same bar. No one could buy their way past the blemish requirement by hiring
            someone else to supply the animal. The standard followed the offering, not the status
            of whoever carried it in.
          </p>
          <p>One exception breaks the pattern, and the chapter states it plainly rather than hiding it.</p>
        </div>
        <VerseQuote
          text="Either a bullock or a lamb that hath any thing superfluous or lacking in his parts, that mayest thou offer for a freewill offering; but for a vow it shall not be accepted."
          reference="Leviticus 22:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A minor deformity, something extra or something slightly missing, short of the
            disqualifying list in verse 22, could still be given as a freewill offering, a gift
            with no obligation behind it. The same animal could not pay off a vow, a promise
            already made to God. A debt owed to God required the full standard. A gift beyond
            obligation had a little more room.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Seven Days With the Mother, and Never Both the Same Day (verses 26 to 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From the blemish standard, the chapter turns to the timing of an offering&apos;s life.</p>
        </div>
        <VerseQuote
          text="When a bullock, or a sheep, or a goat, is brought forth, then it shall be seven days under the dam; and from the eighth day and thenceforth it shall be accepted for an offering made by fire unto the LORD."
          reference="Leviticus 22:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A newborn animal needed a full week with its mother before it could even be
            considered for the altar.</strong> There was no rush to offer a creature before it had
            lived its first days the way every other animal in the herd did.
          </p>
          <p>The very next verse adds a second limit that has nothing to do with age at all.</p>
        </div>
        <VerseQuote
          text="And whether it be cow or ewe, ye shall not kill it and her young both in one day."
          reference="Leviticus 22:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ This is not about ritual cleanness or blemishes at all. It reads like a line of
            ordinary mercy dropped into the middle of a chapter about sacrifice, a boundary around
            unnecessary cruelty that the text never tries to explain further than stating it
            plainly.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Eaten the Same Day, and the Chapter&apos;s Closing Refrain (verses 29 to 33)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter&apos;s last practical rule returns to a timing limit named earlier in this book.</p>
        </div>
        <VerseQuote
          text="And when ye will offer a sacrifice of thanksgiving unto the LORD, offer it at your own will. On the same day it shall be eaten up; ye shall leave none of it until the morrow: I am the LORD."
          reference="Leviticus 22:29 and 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/leviticus-19-explained">Leviticus 19:6 and 7</ArticleLink>{" "}
            already allowed peace offering meat to be eaten over two days before calling it
            abominable on the third. A thanksgiving offering here gets a tighter window still, the
            same day only. Gratitude, the chapter seems to say, was not meant to be stretched out
            or stored up for later.
          </p>
          <p>The chapter ends the way most of Leviticus&apos;s holiness sections do, with a short, direct summary.</p>
        </div>
        <VerseQuote
          text="Therefore shall ye keep my commandments, and do them: I am the LORD. Neither shall ye profane my holy name; but I will be hallowed among the children of Israel: I am the LORD which hallow you, That brought you out of the land of Egypt, to be your God: I am the LORD."
          reference="Leviticus 22:31 to 33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;I am the LORD&quot; appears seven separate times across this
            chapter&apos;s thirty three verses.</strong> From who could eat a piece of bread to
            which animal could reach the altar, every rule in the chapter answers back to the
            same four words.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 22 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does this chapter repeat almost the same blemish list Leviticus 21 just
            gave for priests, now for animals?</strong> The text never states the connection in so
            many words, but the overlap is exact: blind, scurvy, and scabbed disqualify a priest
            from the altar in Leviticus 21:18 and 20, and disqualify an offering from the altar in
            Leviticus 22:22. What can be said plainly is that the man bringing the offering and the
            offering itself were held to the same visible standard of wholeness, pointing to the
            same picture from two different directions.
          </p>
          <p>
            <strong>Why could a priest&apos;s widowed or divorced daughter eat the holy food
            again, while his married daughter could not?</strong> Verses 12 and 13 state the
            reason in terms of the household, not her worth. Marriage moved her into her
            husband&apos;s household, which fed her from then on. Returning to her father&apos;s
            house without a child to provide for her put her back under his provision, and the
            holy food that came with it.
          </p>
          <p>
            <strong>Why forbid killing a mother animal and her young on the same day, when the
            chapter never explains the reasoning?</strong> Leviticus 22:28 states the rule without
            a stated motive, but it is not an isolated idea in this part of the Law. A related
            limit appears later in Deuteronomy, telling Israel not to take a mother bird along with
            her eggs or young from a nest. Scholars reasonably connect both rules to a built in
            respect for animal life, even inside a system centered on animal sacrifice, though the
            text itself stops short of spelling out the exact reason.
          </p>
          <p>
            <strong>Does any of this apply to Christians today?</strong> The New Testament picks up
            the unblemished standard this chapter applies to animals and applies it directly to
            Christ.
          </p>
        </div>
        <VerseQuote
          text="Forasmuch as ye know that ye were not redeemed with corruptible things, as silver and gold, from your vain conversation received by tradition from your fathers; But with the precious blood of Christ, as of a lamb without blemish and without spot:"
          reference="1 Peter 1:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every unblemished animal Leviticus 22 ever approved for the altar pointed
            forward to a single sacrifice good enough to never need repeating.</strong> Hebrews
            draws the same comparison between the old offerings and the one that finally worked.
          </p>
        </div>
        <VerseQuote
          text="For if the blood of bulls and of goats, and the ashes of an heifer sprinkling the unclean, sanctifieth to the purifying of the flesh: How much more shall the blood of Christ, who through the eternal Spirit offered himself without spot to God, purge your conscience from dead works to serve the living God?"
          reference="Hebrews 9:13 and 14"
        />
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 22
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 22:20</h3>
        <VerseQuote
          text="But whatsoever hath a blemish, that shall ye not offer: for it shall not be acceptable for you."
          reference="Leviticus 22:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The clearest single statement of the standard behind half this chapter, repeated in
          different words throughout the whole offering section.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 22:3</h3>
        <VerseQuote
          text="Whosoever he be of all your seed among your generations, that goeth unto the holy things, which the children of Israel hallow unto the LORD, having his uncleanness upon him, that soul shall be cut off from my presence: I am the LORD."
          reference="Leviticus 22:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The warning that opens the chapter&apos;s first half, making plain that birth into
          Aaron&apos;s family was never a blanket permission on its own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 22:12 and 13</h3>
        <VerseQuote
          text="If the priest's daughter also be married unto a stranger, she may not eat of an offering of the holy things. But if the priest's daughter be a widow, or divorced, and have no child, and is returned unto her father's house, as in her youth, she shall eat of her father's meat: but there shall no stranger eat thereof."
          reference="Leviticus 22:12 and 13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse readers most often misread as harsh, until the actual reason, which household
          fed her, is laid out plainly.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 22:28</h3>
        <VerseQuote
          text="And whether it be cow or ewe, ye shall not kill it and her young both in one day."
          reference="Leviticus 22:28"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A one line boundary of mercy, dropped into a chapter otherwise focused on sacrifice and
          ritual purity.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Peter 1:18 and 19</h3>
        <VerseQuote
          text="But with the precious blood of Christ, as of a lamb without blemish and without spot:"
          reference="1 Peter 1:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The New Testament&apos;s own answer to every blemish requirement in this chapter, naming
          Christ as the offering that finally met the standard for good.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 22
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 22 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 22 covers two subjects. The first half sets rules for when a priest was clean
          enough to eat the holy food, and who in his household could eat it at all. The second
          half applies a blemish standard to the animals offered at the altar, almost identical to
          the standard Leviticus 21 just applied to the priests themselves.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why could a priest&apos;s uncleanness stop him from eating his own food?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 3 through 7 treat the holy food as tied to a priest&apos;s ritual state, not only
          his family membership. Touching a dead body, having a running issue, or similar causes of
          uncleanness made him unfit to eat it until he washed and waited until evening.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Who was allowed to eat the holy food in a priest&apos;s household?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 10 and 11 say a hired servant could not eat it, but a servant the priest had
          bought or a child born into his house could. The line was drawn by belonging to the
          household, not simply by living nearby.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why couldn&apos;t a priest&apos;s married daughter eat the holy things?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 12 ties this to marriage moving her into a different household. Verse 13 says if
          she later returned to her father&apos;s house as a widow or divorced woman with no child,
          she could eat the holy food again, because her father&apos;s household was feeding her
          once more.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does the blemish list for offerings match the blemish list for priests in Leviticus
          21?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text never states the connection outright, but the wording overlaps closely, blind,
          scurvy, and scabbed disqualify both a priest in Leviticus 21:18 and 20 and an animal in
          Leviticus 22:22. Both the man serving and the offering being served had to meet the same
          visible standard of wholeness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Could a blemished animal ever be offered to God?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, with one narrow exception. Verse 23 allows an animal with something extra or slightly
          missing in its parts to be given as a freewill offering, though not to pay off a vow. A
          gift beyond obligation had slightly more room than a promise already made to God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why did a newborn animal have to wait seven days before it could be offered?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 27 states the rule plainly without further explanation, seven full days under its
          mother before being accepted on the eighth day and after. The offering could not come
          straight from birth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does Leviticus 22:28 forbid killing a mother animal and her young on the same day?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The verse does not explain its own reasoning. It reads as a boundary of mercy toward
          animal life, similar in spirit to a later law in Deuteronomy about not taking a mother
          bird with her young from a nest, though Leviticus 22 stops short of drawing that
          connection itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Does Leviticus 22 connect to Jesus?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          1 Peter 1:19 calls Christ a lamb &quot;without blemish and without spot,&quot; using the
          exact standard this chapter required of every acceptable offering. Hebrews 9:13 and 14
          draws the same line further, contrasting the blood of bulls and goats with the blood of
          Christ.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 22 is easy to read as two unrelated halves, but it is really one idea seen from two angles.</p>
          <p>
            📌 <strong>Who could eat the holy food was never just about family lines.</strong> A
            priest&apos;s own body had to be clean, his own household had to actually feed him,
            before the food that belonged to him by birth was his to eat that day.
          </p>
          <p>
            📌 <strong>The same unblemished standard reached both directions.</strong> A man with a
            blemish could not approach the altar in Leviticus 21. An animal with a blemish could
            not be laid on it in Leviticus 22. Wholeness was required of the offerer and the
            offering alike.
          </p>
          <p>
            📌 <strong>Even inside a system built around sacrifice, mercy still had a place.</strong>{" "}
            A mother and her young were never to die on the same day, a rule the text states and
            never explains away.
          </p>
          <p>
            You will never bring a lamb to an altar the way this chapter describes. But the
            question underneath it reaches you anyway: not just what you give God, but whether you
            are fit, today, to give it honestly.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Before you bring God anything this week, a prayer, an offering, an act of service, ask
            honestly whether you are bringing it whole, or bringing Him whatever was left over.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
