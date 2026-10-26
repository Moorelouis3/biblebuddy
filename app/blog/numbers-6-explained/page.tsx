import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("numbers-6-explained", {
  title: "Numbers 6 Explained: The Nazarite Vow and the Priestly Blessing",
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

export default function NumbersSixExplainedPage() {
  return (
    <BlogPostShell
      slug="numbers-6-explained"
      title={<>📖 Numbers 6 Explained: The Nazarite Vow and the Priestly Blessing</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No wine. No haircut. No funerals, not even for your own mother.</p>
            <p>
              <strong>Numbers 6 explained</strong> is a chapter about a vow almost nobody was forced to take, and
              almost everybody who took it felt the cost of immediately. Any man or woman in Israel could walk up to
              the tabernacle and separate themselves to God on their own terms, and the moment they did, three strict
              rules took over their daily life until the vow was finished.
            </p>
            <p>Then, with no transition at all, the chapter ends on six of the most repeated lines in the Bible.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why ban grapes and raisins, not just wine?</li>
            <li>❓ Why was hair the one visible sign of this vow?</li>
            <li>❓ What happened if someone broke the vow by complete accident?</li>
            <li>❓ And why does a chapter about personal vows end with a public blessing over the whole nation?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Numbers 6 is the one vow in Israel&apos;s law that nobody had to take, and the one blessing
              in Israel&apos;s law that every single person received.</strong>
            </p>
            <p>
              This walkthrough goes through the chapter in order: who could become a Nazarite, the three things the
              vow forbid, what happened when the vow broke without warning, how a finished vow was closed out at the
              tabernacle door, and the blessing Aaron&apos;s sons were told to put on Israel&apos;s name forever.
            </p>
            <p>Two very different laws, twenty seven verses, and one God standing behind both of them.</p>
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
            <ArticleLink href="/blog/numbers-5-explained">Numbers 5</ArticleLink> dealt with uncleanness that came
            looking for a person uninvited: disease, discharge, contact with the dead, a husband&apos;s unproven
            suspicion. None of it was chosen. All of it still had to be addressed before someone could stand clean
            in a camp where God lived.
          </p>
          <p>
            Numbers 6 flips that completely. For the first time in this book, a law shows up that nobody is required
            to keep unless they choose it for themselves. The Levites in{" "}
            <ArticleLink href="/blog/numbers-3-explained">Numbers 3</ArticleLink> were &quot;wholly given&quot; to
            tabernacle service as a whole tribe, born into the job. The Nazarite vow worked the opposite way: one
            ordinary Israelite, man or woman, deciding on their own to live like a priest for a set stretch of time,
            with no family line or tribal assignment requiring it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Numbers 6 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Who Could Take This Vow (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming exactly who this law applies to, and the answer is wider than almost any other law in Numbers so far.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Speak unto the children of Israel, and say unto them, When either man or woman shall separate themselves to vow a vow of a Nazarite, to separate themselves unto the LORD:"
          reference="Numbers 6:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Either man or woman&quot; is doing real work in this sentence.</strong> The priesthood
            in <ArticleLink href="/blog/numbers-3-explained">Numbers 3</ArticleLink> ran through one family line, and
            the fighting men counted in{" "}
            <ArticleLink href="/blog/numbers-1-explained">Numbers 1</ArticleLink> were men only. This vow had no such
            limit. Any Israelite, from any tribe, could step into a season of consecration that otherwise belonged
            only to priests.
          </p>
          <p>
            The word &quot;Nazarite&quot; comes from a Hebrew root meaning to separate or consecrate. The vow itself
            was not a one time event. It was a decision to live a certain way for a stretch of time the person set
            for themselves, and verse 2 calls that decision &quot;to separate themselves unto the LORD,&quot; the
            same idea behind everything the priesthood already stood for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Three Things a Nazarite Could Never Touch (verses 3 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the vow started, three specific restrictions took over, and the text spells out each one in detail.</p>
        </div>
        <VerseQuote
          text="He shall separate himself from wine and strong drink, and shall drink no vinegar of wine, or vinegar of strong drink, neither shall he drink any liquor of grapes, nor eat moist grapes, or dried."
          reference="Numbers 6:3"
        />
        <VerseQuote
          text="All the days of his separation shall he eat nothing that is made of the vine tree, from the kernels even to the husk."
          reference="Numbers 6:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This was not just a ban on getting drunk. It was a ban on the entire vine.</strong> Wine,
            vinegar made from wine, fresh grapes, dried grapes, even the seeds and skins, verse 4 does not leave a
            single loophole. A Nazarite could not argue that raisins were not technically wine. The vow covered the
            whole plant, not just the drink it was famous for.
          </p>
          <p>The second restriction moved from diet to appearance.</p>
        </div>
        <VerseQuote
          text="All the days of the vow of his separation there shall no razor come upon his head: until the days be fulfilled, in the which he separateth himself unto the LORD, he shall be holy, and shall let the locks of the hair of his head grow."
          reference="Numbers 6:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Uncut hair was the one part of this vow a stranger could actually see. Everything else, the wine, the
            grapes, happened in private. Growing hair out announced the vow to every person who looked at a
            Nazarite&apos;s head, whether they wanted attention for it or not.
          </p>
          <p>The third restriction was the most severe of the three.</p>
        </div>
        <VerseQuote
          text="All the days that he separateth himself unto the LORD he shall come at no dead body. He shall not make himself unclean for his father, or for his mother, for his brother, or for his sister, when they die: because the consecration of his God is upon his head."
          reference="Numbers 6:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>An ordinary priest was allowed to mourn close family. A Nazarite, for the length of the vow,
            was not even allowed that.</strong> This put a Nazarite under a stricter rule than most priests kept day
            to day, closer to the standard the high priest himself lived under. Verse 8 sums up what all three
            restrictions were protecting:
          </p>
        </div>
        <VerseQuote text="All the days of his separation he is holy unto the LORD." reference="Numbers 6:8" />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. When the Vow Is Broken by Accident (verses 9 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The law does not pretend accidents never happen, so it covers the one that was hardest to prevent.</p>
        </div>
        <VerseQuote
          text="And if any man die very suddenly by him, and he hath defiled the head of his consecration; then he shall shave his head in the day of his cleansing, on the seventh day shall he shave it."
          reference="Numbers 6:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nobody has to intend this. Someone could simply die near a Nazarite with no warning at all, and the vow
            still broke. Verses 10 and 11 require two birds brought to the priest, a sin offering and a burnt
            offering, and then a trespass offering besides.
          </p>
        </div>
        <VerseQuote
          text="And he shall consecrate unto the LORD the days of his separation, and shall bring a lamb of the first year for a trespass offering: but the days that were before shall be lost, because his separation was defiled."
          reference="Numbers 6:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;The days that were before shall be lost&quot; is the hardest line in this whole
            section.</strong> It did not matter if someone had kept the vow faithfully for months. One sudden death
            nearby, through no fault of their own, erased all of it. The clock did not pause and resume. It reset
            completely, and the person started the whole vow over from day one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Completing the Vow (verses 13 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Assuming nothing interrupted it, the chapter now describes what finishing the vow actually looked like at the tabernacle.</p>
        </div>
        <VerseQuote
          text="And this is the law of the Nazarite, when the days of his separation are fulfilled: he shall be brought unto the door of the tabernacle of the congregation: And he shall offer his offering unto the LORD, one he lamb of the first year without blemish for a burnt offering, and one ewe lamb of the first year without blemish for a sin offering, and one ram without blemish for peace offerings, And a basket of unleavened bread, cakes of fine flour mingled with oil, and wafers of unleavened bread anointed with oil, and their meat offering, and their drink offerings."
          reference="Numbers 6:13 to 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three animals and a full basket of bread, far more than the two birds required for an accidental break.
            Finishing the vow on purpose cost noticeably more than surviving an accident inside it. Then comes the
            moment the whole chapter has been building toward.
          </p>
        </div>
        <VerseQuote
          text="And the Nazarite shall shave the head of his separation at the door of the tabernacle of the congregation, and shall take the hair of the head of his separation, and put it in the fire which is under the sacrifice of the peace offerings."
          reference="Numbers 6:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The hair itself, the one visible sign of the whole vow, went straight into the fire under the
            sacrifice. It was not kept, sold, or thrown away carelessly. The physical evidence of months of
            separation became part of the offering. Verse 20 closes the ritual with the one line that quietly undoes
            verse 3.
          </p>
        </div>
        <VerseQuote
          text="And the priest shall wave them for a wave offering before the LORD: this is holy for the priest, with the wave breast and heave shoulder: and after that the Nazarite may drink wine."
          reference="Numbers 6:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            After everything, verse 21 adds one more detail easy to miss: a Nazarite could also bring extra
            offerings beyond the minimum, &quot;beside that that his hand shall get,&quot; according to whatever
            additional vow they had personally made. The minimum closed the vow legally. It did not cap what someone
            could give in gratitude on top of it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Priestly Blessing That Closes the Chapter (verses 22 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            With no transition sentence at all, the chapter moves from one person&apos;s private vow to words every
            single Israelite would hear spoken over them.
          </p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses, saying, Speak unto Aaron and unto his sons, saying, On this wise ye shall bless the children of Israel, saying unto them,"
          reference="Numbers 6:22 and 23"
        />
        <VerseQuote
          text="The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace."
          reference="Numbers 6:24 to 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three lines, six requests, and the LORD named at the start of every single one.</strong> Keep.
            Shine. Be gracious. Lift up. Give peace. Only Aaron and his sons were authorized to speak it, but it was
            never meant to stay inside the family that said it.
          </p>
        </div>
        <VerseQuote
          text="And they shall put my name upon the children of Israel; and I will bless them."
          reference="Numbers 6:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read that last verse carefully and the blessing is not really coming from Aaron at all.</strong>{" "}
            The priests spoke the words. God put His own name on the people and did the blessing Himself. Aaron&apos;s
            sons were the voice. God was the source. This blessing has been spoken over Jewish and Christian
            congregations for roughly three thousand years since, almost unchanged from the words written here.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Numbers 6 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why ban every part of the grapevine, not just the wine?</strong> The text does not explain the
            reasoning directly, only the scope. Banning fresh grapes and raisins alongside wine and vinegar closed
            off any argument that some form of the fruit was technically allowed. Whatever the vine represented to
            this vow, it was off limits completely, not just in its fermented form.
          </p>
          <p>
            <strong>Why was hair specifically the visible sign of this vow, instead of clothing or some other
            marker?</strong> Scripture does not state a reason. What is clear is that hair grows on its own, slowly
            and visibly, over the exact length of time the vow lasted. A Nazarite could not fake finishing early or
            stretch the sign past when the vow actually ended. The marker tracked the calendar automatically.
          </p>
          <p>
            <strong>Why did an accidental defilement erase the whole vow instead of just pausing it?</strong> The
            text states the rule plainly in verse 12 without softening it. This vow measured consecrated days, not
            effort or intention. A single broken day meant the days already kept no longer counted as unbroken
            consecration, however unfair that might feel to the person it happened to.
          </p>
          <p>
            <strong>Why does only one tribe&apos;s family get to pronounce a blessing meant for every tribe?</strong>{" "}
            Numbers 3 already established that Aaron&apos;s sons alone held the priest&apos;s office, with the
            strongest penalties attached to anyone outside that line attempting it. The blessing in verses 24 to 26
            follows the same structure already set in this book: one specific family authorized to speak, on behalf
            of a God who blesses everyone listening.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Numbers 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Numbers 6:24 to 26</h3>
        <VerseQuote
          text="The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace."
          reference="Numbers 6:24 to 26"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most repeated blessing in the whole Old Testament, spoken over Israel by name and still spoken over
          congregations today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Numbers 6:2</h3>
        <VerseQuote
          text="Speak unto the children of Israel, and say unto them, When either man or woman shall separate themselves to vow a vow of a Nazarite, to separate themselves unto the LORD:"
          reference="Numbers 6:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The vow that opened priest level consecration to any Israelite, man or woman, who chose it for themselves.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Numbers 6:5</h3>
        <VerseQuote
          text="All the days of the vow of his separation there shall no razor come upon his head: until the days be fulfilled, in the which he separateth himself unto the LORD, he shall be holy, and shall let the locks of the hair of his head grow."
          reference="Numbers 6:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The visible sign of the vow, growing at its own pace and impossible to fake on a schedule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Numbers 6:12</h3>
        <VerseQuote
          text="And he shall consecrate unto the LORD the days of his separation, and shall bring a lamb of the first year for a trespass offering: but the days that were before shall be lost, because his separation was defiled."
          reference="Numbers 6:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The hard line in the chapter: an accidental defilement did not pause the vow. It erased every day already kept.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Numbers 6:27</h3>
        <VerseQuote
          text="And they shall put my name upon the children of Israel; and I will bless them."
          reference="Numbers 6:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that reveals who the blessing actually came from. Aaron&apos;s sons spoke it. God was the one
          doing the blessing.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Numbers 6
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Numbers 6 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Numbers 6 gives the law of the Nazarite vow, a voluntary season of consecration open to any Israelite, and
          then closes with the priestly blessing Aaron and his sons were told to speak over the whole nation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is a Nazarite vow in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          A Nazarite vow was a voluntary commitment any man or woman in Israel could make to separate themselves to
          the LORD for a set period, avoiding wine and anything from the grapevine, never cutting their hair, and
          never going near a dead body for the length of the vow.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t a Nazarite eat grapes or raisins, not just wine?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 3 and 4 ban the entire grapevine, from the juice to the seeds and skins, closing off any claim that
          a dried or fresh grape was technically different from wine. The restriction covered the whole plant, not
          only its fermented form.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t a Nazarite cut his hair?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 5 makes uncut hair the visible mark of the vow. It was also the one part of this vow that could not
          be sped up, faked, or hidden, since hair grows at its own pace across the exact time the vow lasted.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened if a Nazarite accidentally touched a dead body?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 9 through 12 required the Nazarite to shave their head, bring a sin offering, a burnt offering, and
          a trespass offering, and then start the entire vow over. Every day already kept before the accident no
          longer counted.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Samson a Nazarite?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Judges 13 describes Samson as a Nazarite from birth, with the same ban on cutting his hair found in this
          chapter, though his vow was announced by an angel before he was born rather than chosen by him as an
          adult the way Numbers 6 describes.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the priestly blessing in Numbers 6?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 24 through 26 record the blessing God told Aaron and his sons to speak over Israel: &quot;The LORD
          bless thee, and keep thee,&quot; make His face shine on them, be gracious, lift up His countenance, and
          give peace. It is one of the most repeated passages in the entire Bible.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did only Aaron and his sons get to speak the blessing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The priesthood established in Numbers 3 ran only through Aaron&apos;s line. Verse 23 specifically commands
          Aaron and his sons to bless Israel this way, keeping the same structure already set for every other priestly
          duty in this book.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the Nazarite vow still practiced today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not in the exact form Numbers 6 describes, since it required sacrifices at a tabernacle or temple that no
          longer stands. The New Testament shows the vow still existing in the first century, with Paul cutting his
          hair after a vow in Acts 18:18 and joining men under a vow in Acts 21:23 and 24.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Numbers 6 teach Christians today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That consecration to God was never limited to priests by birth, and that the same chapter holding Israel&apos;s
          strictest personal vow also holds one of its warmest blessings, both coming from the same God who sets the terms.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Numbers 6 holds two laws that do not look like they belong together, and both are still worth taking seriously.</p>
          <p>
            📌 <strong>Consecration in Israel was not only inherited. It could be chosen.</strong> Any man or woman
            could step into a season set apart to God, on terms stricter than most priests kept, without belonging
            to a priestly family at all.
          </p>
          <p>
            📌 <strong>A vow this serious did not bend for an accident.</strong> One sudden, unintended defilement
            erased every day already kept. God&apos;s terms for this vow were exact, not negotiable after the fact.
          </p>
          <p>
            📌 <strong>The blessing that closes the chapter did not originate with the men who spoke it.</strong>{" "}
            Aaron&apos;s sons gave the words. God put His own name on the people and blessed them Himself.
          </p>
          <p>
            You will never grow out your hair under a Nazarite vow or bring a lamb to a tabernacle door. But the
            same God who let an ordinary Israelite choose a season of separation still welcomes that same choice
            from you today.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read the blessing in Numbers 6:24 to 26 out loud, slowly, and let it land as a word spoken over you by
            name, the way it was first spoken over Israel.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
