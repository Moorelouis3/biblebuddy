import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-15-explained", {
  title: "Leviticus 15 Explained: The Law of Bodily Issues and Uncleanness",
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

export default function LeviticusFifteenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-15-explained"
      title={<>📖 Leviticus 15 Explained: The Law of Bodily Issues and Uncleanness</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Thirty three verses. No skin to examine. No house to inspect. Just ordinary bodies, doing ordinary things.</p>
            <p>
              <strong>Leviticus 15 explained</strong> is the law for every kind of bodily discharge
              an Israelite could have, from the most private and natural events of married life to
              a chronic condition that could keep a person unclean for months. It sorts four
              separate cases, a man with an ongoing issue, a brief and normal emission, a woman&apos;s
              monthly cycle, and a woman&apos;s prolonged bleeding, and gives each one its own careful
              answer.
            </p>
            <p>Maybe you have skimmed past this chapter, assuming it had nothing left to say to you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does touching someone&apos;s bed count for as much as touching the person?</li>
            <li>❓ Why does a brief, normal event only last until evening while another lasts seven full days?</li>
            <li>❓ Why does a man with a chronic issue and a woman with a chronic issue get the exact same ritual?</li>
            <li>❓ And what does any of this have to do with a woman who once reached for Jesus in a crowd?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This chapter never treats a body as shameful. It treats certain kinds of
              discharge as a reason to wait, wash, and come back later.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the man whose issue spreads
              uncleanness to anything he sits or lies on, the eighth day offering that finally
              closes it, the ordinary and brief categories that need nothing but water, the woman&apos;s
              monthly separation, her own chronic issue and its matching offering, and the one
              verse near the end that explains why any of this mattered at all.
            </p>
            <p>Read slowly. One phrase in this chapter reaches all the way into the Gospels.</p>
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
            <ArticleLink href="/blog/leviticus-14-explained">Leviticus 14</ArticleLink> spent
            fifty seven verses restoring what disease had already damaged: a healed man brought
            back into the camp, a troubled house either saved or torn down to its stones. Every
            case in that chapter started with something visibly wrong.
          </p>
          <p>
            Leviticus 15 asks a different kind of question. Nothing here is a disease to diagnose.
            Some of what this chapter covers happens to every married couple. Some of it happens to
            every woman, every month, for as long as she is able to bear children. The LORD speaks
            to Moses and Aaron once more, and this time the subject is the ordinary workings of the
            human body itself, not an illness that singles someone out.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 15 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Man&apos;s Ongoing Issue Spreads to Everything He Touches (verses 1 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming the first and most serious of its four cases.</p>
        </div>
        <VerseQuote
          text="Speak unto the children of Israel, and say unto them, When any man hath a running issue out of his flesh, because of his issue he is unclean. And this shall be his uncleanness in his issue: whether his flesh run with his issue, or his flesh be stopped from his issue, it is his uncleanness."
          reference="Leviticus 15:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Bible teachers widely read this &quot;running issue&quot; as an abnormal, ongoing
            genital discharge, something closer to a chronic infection than a single event. The
            chapter is careful to say the uncleanness covers the condition either way it shows
            itself, flowing or blocked, not one specific symptom.
          </p>
          <p>From there the law spreads outward from the man himself to everything around him.</p>
        </div>
        <VerseQuote
          text="Every bed, whereon he lieth that hath the issue, is unclean: and every thing, whereon he sitteth, shall be unclean. And whosoever toucheth his bed shall wash his clothes, and bathe himself in water, and be unclean until the even."
          reference="Leviticus 15:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A bed he lay on. A seat he sat in. A saddle he rode. Anyone who later touches
            any of them picks up the same uncleanness he carries, without ever touching him at
            all.</strong> Verses 4 through 10 repeat this rule for his bed, his seat, his saddle, and
            whatever he has merely touched with unwashed hands, and the same closing sentence
            follows almost every single case.
          </p>
        </div>
        <VerseQuote
          text="And whosoever toucheth any thing that was under him shall be unclean until the even: and he that beareth any of those things shall wash his clothes, and bathe himself in water, and be unclean until the even."
          reference="Leviticus 15:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ That one line, wash the clothes, bathe in water, unclean until the even, is not a
            one time instruction. It is the chapter&apos;s refrain. Count it carefully through these
            thirty three verses and the exact phrase &quot;unclean until the even&quot; lands
            fifteen separate times. Nothing in this chapter asks for a sacrifice just to recover
            from brushing against a contaminated bed. A wash and a wait until sundown settles it.
          </p>
          <p>Pottery gets no such second chance.</p>
        </div>
        <VerseQuote
          text="And the vessel of earth, that he toucheth which hath the issue, shall be broken: and every vessel of wood shall be rinsed in water."
          reference="Leviticus 15:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Clay pottery in the ancient Near East was cheap and porous. Unglazed earthenware
            absorbs liquid in a way wood or metal does not, so a clay jar once contaminated could
            not simply be scrubbed clean the way a wooden bowl could. The law does not treat every
            material the same because the materials themselves are not the same.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Clean Again: Seven Days and Two Birds (verses 13 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the issue itself stops, the chapter sets out exactly how long until it is truly over.</p>
        </div>
        <VerseQuote
          text="And when he that hath an issue is cleansed of his issue; then he shall number to himself seven days for his cleansing, and wash his clothes, and bathe his flesh in running water, and shall be clean."
          reference="Leviticus 15:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The man does not count his seven days from the moment he first noticed the problem. He
            counts from the moment it actually stops, the same careful habit{" "}
            <ArticleLink href="/blog/leviticus-14-explained">Leviticus 14</ArticleLink> already
            showed with a healed leper. Only once the full week has passed without a relapse does
            he bring an offering.
          </p>
        </div>
        <VerseQuote
          text="And on the eighth day he shall take to him two turtledoves, or two young pigeons, and come before the LORD unto the door of the tabernacle of the congregation, and give them unto the priest: And the priest shall offer them, the one for a sin offering, and the other for a burnt offering; and the priest shall make an atonement for him before the LORD for his issue."
          reference="Leviticus 15:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what does not happen to either bird here.</strong> Leviticus 14 killed
            one bird and dipped a living second bird in its blood before letting it fly free into
            the open field. This chapter does nothing of the kind. Both birds here are simply
            offered, one as a sin offering and one as a burnt offering, the ordinary pair brought for
            dozens of situations across this book. The man&apos;s issue needed atonement. It did not
            call for the elaborate, one of a kind ritual a healed leper walked through.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Ordinary Married Life Needs Only Water (verses 16 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            After the heaviest case in the chapter, the law turns to something every husband and
            wife would eventually encounter.
          </p>
        </div>
        <VerseQuote
          text="And if any man's seed of copulation go out from him, then he shall wash all his flesh in water, and be unclean until the even. And every garment, and every skin, whereon is the seed of copulation, shall be washed with water, and be unclean until the even. The woman also with whom man shall lie with seed of copulation, they shall both bathe themselves in water, and be unclean until the even."
          reference="Leviticus 15:16 to 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 No priest. No offering. No seven day count. Just a wash and a wait until evening, the
            same brief response already given in verse 5 to anyone who merely touched a
            contaminated bed. A completely ordinary part of married life closes out the same day it
            begins.
          </p>
          <p>
            ✅ <strong>The gap between this case and the one just before it is the whole key to
            reading this chapter.</strong> A normal bodily function gets the lightest possible
            response. A chronic, ongoing condition gets the heaviest. The length of the remedy
            always tracks how long and how serious the uncleanness actually was, never the mere fact
            that a body did something bodies do.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Woman&apos;s Monthly Separation (verses 19 to 24)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter turns next to the ordinary monthly case on the woman&apos;s side of the law.</p>
        </div>
        <VerseQuote
          text="And if a woman have an issue, and her issue in her flesh be blood, she shall be put apart seven days: and whosoever toucheth her shall be unclean until the even."
          reference="Leviticus 15:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Seven days, not until evening.</strong> A man&apos;s normal emission in verse
            16 clears by nightfall. A woman&apos;s normal cycle in this verse runs a full week, because
            the event itself lasts roughly that long. The chapter is not inventing a harsher
            standard for her. It is matching the length of the remedy to the length of the actual
            physical event, exactly the same principle already seen in the section just before this
            one.
          </p>
          <p>
            Everything she sits or lies on during that week carries the same uncleanness a man&apos;s
            bed carried earlier in the chapter.
          </p>
        </div>
        <VerseQuote
          text="And every thing that she lieth upon in her separation shall be unclean: every thing also that she sitteth upon shall be unclean. And whosoever toucheth her bed shall wash his clothes, and bathe himself in water, and be unclean until the even."
          reference="Leviticus 15:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 19 calls her condition being &quot;put apart.&quot; Verses 20, 25, and 26 switch to
            a different word, &quot;her separation,&quot; the identical term{" "}
            <ArticleLink href="/blog/leviticus-12-explained">Leviticus 12</ArticleLink> already used
            for a new mother&apos;s own purifying. The two laws are not describing the same event,
            but the shared word ties both kinds of blood into the same ceremonial category, neither
            one treated as a moral failure.
          </p>
          <p>
            One verse here adds a case none of the sections before it covered: what happens if a
            husband and wife come together during that week.
          </p>
        </div>
        <VerseQuote
          text="And if any man lie with her at all, and her flowers be upon him, he shall be unclean seven days; and all the bed whereon he lieth shall be unclean."
          reference="Leviticus 15:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ His uncleanness here lasts a full seven days, not the single evening that closed
            verse 18&apos;s ordinary case. Choosing to come near her uncleanness during that week
            meant sharing the full length of it, not the shortened version given to an isolated
            touch.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. A Woman&apos;s Prolonged Issue, and the Same Offering as the Man&apos;s (verses 25 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter&apos;s final case mirrors its very first one. A normal monthly cycle becomes
            something longer and harder to simply wait out.
          </p>
        </div>
        <VerseQuote
          text="And if a woman have an issue of her blood many days out of the time of her separation, or if it run beyond the time of her separation; all the days of the issue of her uncleanness shall be as the days of her separation: she shall be unclean."
          reference="Leviticus 15:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every day of a prolonged issue counts the same as a day of her normal
            separation, for as long as the bleeding actually continues.</strong> The law does not set
            an outer limit here. It simply keeps applying the same rule for as many days as the
            condition lasts, however long that turns out to be.
          </p>
          <p>Once it finally stops, her path back to clean matches the man&apos;s almost word for word.</p>
        </div>
        <VerseQuote
          text="But if she be cleansed of her issue, then she shall number to herself seven days, and after that she shall be clean. And on the eighth day she shall take unto her two turtles, or two young pigeons, and bring them unto the priest, to the door of the tabernacle of the congregation. And the priest shall offer the one for a sin offering, and the other for a burnt offering; and the priest shall make an atonement for her before the LORD for the issue of her uncleanness."
          reference="Leviticus 15:28 to 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Seven days counted from her healing, two birds, one sin offering and one
            burnt offering, atonement made by the priest.</strong> That is the identical sentence
            structure already used for the man&apos;s chronic issue in verses 14 and 15, almost
            phrase for phrase. A chronic condition cost the same ritual whichever body carried it.
          </p>
          <p>
            This is the exact phrase the Gospels later borrow for a woman who had been bleeding far
            longer than this chapter ever anticipates.
          </p>
        </div>
        <VerseQuote
          text="And a certain woman, which had an issue of blood twelve years, And had suffered many things of many physicians, and had spent all that she had, and was nothing bettered, but rather grew worse, When she had heard of Jesus, came in the press behind, and touched his garment."
          reference="Mark 5:25 to 27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Twelve years is not a figure this chapter ever names, but her condition is the very one
            Leviticus 15:25 describes, &quot;an issue of her blood many days out of the time of her
            separation.&quot; By this law, everyone and everything she touched in that crowd should
            have carried her uncleanness away with her. She reached for Jesus anyway.
          </p>
        </div>
        <VerseQuote
          text="And straightway the fountain of her blood was dried up; and she felt in her body that she was healed of that plague... And he said unto her, Daughter, thy faith hath made thee whole; go in peace, and be whole of thy plague."
          reference="Mark 5:29 and 34"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In this chapter, uncleanness moves outward from a person to whatever they
            touch. In Mark 5, healing moves outward from Jesus to whoever touches Him.</strong> The
            direction of contagion runs backward the moment she reaches Him, and nothing in the
            Gospel account suggests Jesus became unclean for even a moment.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The One Verse That Explains Why (verse 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Thirty verses of careful case law lead to a single sentence that finally states the
            purpose behind all of it.
          </p>
        </div>
        <VerseQuote
          text="Thus shall ye separate the children of Israel from their uncleanness; that they die not in their uncleanness, when they defile my tabernacle that is among them."
          reference="Leviticus 15:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The LORD names the stakes plainly: not shame, but His own tabernacle standing
            in the middle of the camp.</strong> A holy God was dwelling among an ordinary, bleeding,
            discharging, everyday people, and this chapter exists so that ordinary condition would
            never carelessly reach the place where He met them.
          </p>
          <p>
            The very next chapter opens by naming the two sons of Aaron who died for treating
            something holy carelessly. Leviticus 15 reads like the quiet, unglamorous reason that
            danger was taken so seriously: uncleanness was never only a private matter between one
            person and their own body.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Chapter&apos;s Own Summary (verses 32 and 33)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 15 closes the way several chapters around it do, naming everything it just covered in one breath.</p>
        </div>
        <VerseQuote
          text="This is the law of him that hath an issue, and of him whose seed goeth from him, and is defiled therewith; And of her that is sick of her flowers, and of him that hath an issue, of the man, and of the woman, and of him that lieth with her that is unclean."
          reference="Leviticus 15:32 and 33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Four cases, named in order: the man&apos;s issue, ordinary emission, the
            woman&apos;s sickness, and a man who lies with her while unclean.</strong> The closing
            summary matches the chapter exactly as it was actually taught, nothing added and nothing
            left out.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 15 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does this chapter treat a woman&apos;s body more harshly than a man&apos;s?</strong>{" "}
            Read side by side, the chapter is actually built as two matching pairs. A man&apos;s brief,
            normal emission in verses 16 through 18 and a woman&apos;s brief, normal cycle in verse
            19 both get a response sized to how long the actual event lasts, one evening against one
            week. A man&apos;s chronic issue in verses 1 through 15 and a woman&apos;s chronic issue
            in verses 25 through 30 get the identical remedy, seven days counted from healing and the
            same two birds. The law is not grading one sex as dirtier than the other. It is applying
            one consistent rule, the remedy fits the length of the condition, to both sexes alike.
          </p>
          <p>
            <strong>Did this law mean a woman was shamed or shunned every month?</strong> Nothing in
            the chapter describes banishment the way{" "}
            <ArticleLink href="/blog/leviticus-11-explained">earlier purity laws in
            Leviticus</ArticleLink> describe a leper living outside the camp. A woman in her normal
            separation still lived in her own home. The restriction named is specific: contact with
            her bed or seat passed the uncleanness on to someone else for the rest of that day. That
            is a boundary around physical contact, not a sentence of isolation.
          </p>
          <p>
            <strong>Was the woman in Mark 5 breaking this very law by touching Jesus?</strong>{" "}
            By the letter of Leviticus 15:25 and 27, yes. Her prolonged issue should have passed
            uncleanness to anyone or anything she touched, the same rule already laid out for a
            normal cycle and extended to her longer condition. She touched Him anyway, after twelve
            years of doctors who could not help her. What the text records next is not Jesus
            becoming unclean. It is her plague ending the instant she reached Him.
          </p>
          <p>
            <strong>What exactly was the &quot;running issue&quot; in verses 2 and 3?</strong> The
            text never names a specific disease, only a flesh that either runs or is stopped. Bible
            scholars widely read it as a description of an abnormal, ongoing genital discharge,
            something medical rather than moral, distinguished carefully in this same chapter from
            the brief and entirely normal events covered in verses 16 through 24.
          </p>
          <p>
            <strong>Why did touching a bed carry the same uncleanness as touching the person?</strong>{" "}
            The chapter never explains the reasoning, only the rule. What can be said plainly is
            that it treats uncleanness as something that can travel through what a person has lain
            or sat on, not only through direct contact, which is exactly why the law spends so many
            verses on beds, seats, and saddles rather than the person alone.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 15:2 and 3</h3>
        <VerseQuote
          text="When any man hath a running issue out of his flesh, because of his issue he is unclean. And this shall be his uncleanness in his issue: whether his flesh run with his issue, or his flesh be stopped from his issue, it is his uncleanness."
          reference="Leviticus 15:2 and 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s opening case, a chronic condition covered either way it actually shows
          itself in the body.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 15:13</h3>
        <VerseQuote
          text="And when he that hath an issue is cleansed of his issue; then he shall number to himself seven days for his cleansing, and wash his clothes, and bathe his flesh in running water, and shall be clean."
          reference="Leviticus 15:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The count starts the moment the condition actually ends, not the moment it was first
          noticed.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 15:19</h3>
        <VerseQuote
          text="And if a woman have an issue, and her issue in her flesh be blood, she shall be put apart seven days: and whosoever toucheth her shall be unclean until the even."
          reference="Leviticus 15:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A remedy sized to a week, because the event itself runs roughly that long, the same
          principle behind every other timetable in this chapter.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 15:25</h3>
        <VerseQuote
          text="And if a woman have an issue of her blood many days out of the time of her separation, or if it run beyond the time of her separation; all the days of the issue of her uncleanness shall be as the days of her separation: she shall be unclean."
          reference="Leviticus 15:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The exact condition behind the woman in Mark 5, named in this chapter centuries before she
          ever reached for Jesus in a crowd.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 15:31</h3>
        <VerseQuote
          text="Thus shall ye separate the children of Israel from their uncleanness; that they die not in their uncleanness, when they defile my tabernacle that is among them."
          reference="Leviticus 15:31"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one verse that finally says why any of this mattered: a holy God was dwelling in the
          middle of an ordinary camp.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 15 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 15 sets out the law for bodily discharges, a man&apos;s chronic issue, an
          ordinary emission, a woman&apos;s monthly cycle, and a woman&apos;s prolonged issue, each
          one given a remedy sized to how long the condition actually lasts.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the &quot;running issue&quot; in Leviticus 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text describes it only as flesh that runs or is stopped, without naming a specific
          illness. It is widely read as an abnormal, ongoing genital discharge, treated as a medical
          condition rather than any kind of moral failure.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did a woman&apos;s monthly cycle make her unclean for seven days?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 15:19 sets her separation at seven days because the natural event itself lasts
          roughly that long, the same principle that sets a man&apos;s brief emission at a single
          evening in verses 16 through 18.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did touching a bed or seat spread the same uncleanness as touching the person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 15:4 through 10 extend the uncleanness to anything the man lay or sat on, and
          verses 20 through 23 do the same for a woman in her separation. The text states the rule
          without explaining the underlying reason.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What offering ended a chronic issue in Leviticus 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          After seven clean days, both the man in verses 14 and 15 and the woman in verses 29 and 30
          brought two turtledoves or two young pigeons, one for a sin offering and one for a burnt
          offering, with the priest making atonement.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the woman with the issue of blood in the Gospels connected to Leviticus 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Mark 5:25 describes her as having &quot;an issue of blood twelve years,&quot; the
          same condition and the same wording Leviticus 15:25 lays out centuries earlier. She
          reached for Jesus despite the uncleanness this chapter assigns to her condition, and He
          healed her instead of becoming unclean.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Leviticus 15 treat the human body as sinful?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No verse in the chapter calls any of these four conditions a sin. Ordinary married life,
          an ordinary monthly cycle, and even a chronic medical issue are all treated as ceremonial
          uncleanness, a category about ritual readiness to approach the tabernacle, not about
          personal guilt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Leviticus 15 say the uncleanness defiles the tabernacle?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 31 states the purpose directly: the LORD was dwelling among the people, and left
          unchecked, uncleanness could reach the one place He met them. The law exists to keep that
          from happening, not to shame anyone over an ordinary bodily condition.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were clay pots really destroyed just for touching something unclean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Leviticus 15:12 commands an earthen vessel touched by the issue to be broken, while a
          wooden vessel only needed rinsing. Unglazed clay absorbs liquid in a way wood does not, so
          the two materials were never treated the same.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Christians still follow Leviticus 15 today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Christian traditions read this chapter as part of the ceremonial law tied to the
          tabernacle and its priesthood, fulfilled in Christ rather than binding on believers today.
          Mark 5 already shows that principle in motion, with Jesus reversing the very uncleanness
          this chapter describes instead of being bound by it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 15 is easy to read as a list of rules about bodies. It is really a list of rules about contact with a holy God.</p>
          <p>
            📌 <strong>The remedy always matched the length of the condition.</strong> A brief,
            normal event closed by evening. A prolonged, chronic one took a full week and an
            offering, whoever carried it.
          </p>
          <p>
            📌 <strong>Nothing here calls an ordinary body sinful.</strong> Married life, a monthly
            cycle, and even a lasting medical condition are all named uncleanness, never guilt, a
            distinction this chapter never blurs.
          </p>
          <p>
            📌 <strong>One woman&apos;s twelve years of exactly this condition ended the moment she
            reached for Jesus.</strong> The law that once sent uncleanness outward from her met a
            greater power that sent healing outward from Him instead.
          </p>
          <p>
            You may never count seven days or bring two birds to a priest. But you have likely felt
            what she felt, years of a problem nothing else could fix, and wondered if reaching out
            was even allowed.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Mark 5:25 to 34 today, and notice that she was not punished for touching Him while
            unclean. She was healed.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
