import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-24-explained", {
  title: "Leviticus 24 Explained: The Eternal Lamp and the Blasphemer Stoned",
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

export default function LeviticusTwentyFourExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-24-explained"
      title={<>📖 Leviticus 24 Explained: The Eternal Lamp and the Blasphemer Stoned</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A lamp that never goes dark. A table that never sits empty. Then, without warning, a fight breaks out in the camp and someone ends up dead.</p>
            <p>
              <strong>Leviticus 24 explained</strong> is really three short scenes stitched
              together. Two of them describe ordinary daily tasks inside the tabernacle. The
              third drops the reader into a real event, a curse shouted in anger, a man put under
              guard, and a law about taking an eye for an eye that still gets misquoted today.
            </p>
            <p>Maybe you have only ever heard that last part of this chapter.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a law about oil and bread sit in the same chapter as a stoning?</li>
            <li>❓ What did the man in this chapter actually say that was so serious?</li>
            <li>❓ Does &quot;eye for eye, tooth for tooth&quot; mean the Israelites really cut off eyes and teeth?</li>
            <li>❓ And why does the chapter insist the same law covers a stranger and a native alike?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every rule in this chapter, the lamp, the bread, and the punishment,
              protects the same thing: the name of the LORD, kept holy in the middle of an
              ordinary camp.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the oil that kept a lamp
              burning all night, the twelve loaves set before the LORD every week, the fight that
              turned into a curse, the sentence God handed down, and the case law about injury
              that closes the chapter.
            </p>
            <p>Read slowly. This short chapter carries more weight than its length suggests.</p>
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
            <ArticleLink href="/blog/leviticus-23-explained">Leviticus 23</ArticleLink> laid out an
            entire year of feasts, every date fixed in advance by God. That chapter moved fast,
            sweeping from Passover in the spring all the way to the booths of the seventh month.
          </p>
          <p>
            Leviticus 24 slows back down to a single day repeated over and over. Before it ever
            gets to the fight in the camp, it spends its first nine verses on two jobs that had
            nothing to do with a yearly calendar at all: a lamp that had to be tended every
            evening, and bread that had to be replaced every week. The feasts told Israel when to
            stop. This chapter tells them what never stopped.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 24 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Lamp That Never Goes Out (verses 1 to 4)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens on the smallest possible scale: a single flame.</p>
        </div>
        <VerseQuote
          text="Command the children of Israel, that they bring unto thee pure oil olive beaten for the light, to cause the lamps to burn continually."
          reference="Leviticus 24:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not just any olive oil. <strong>Beaten</strong> oil came from olives crushed and
            pressed by hand before a millstone ever touched them, the clearest, cleanest oil a
            harvest could produce. The ordinary pressed oil used for cooking was good enough for a
            kitchen. It was not good enough for this lamp.
          </p>
        </div>
        <VerseQuote
          text="Without the vail of the testimony, in the tabernacle of the congregation, shall Aaron order it from the evening unto the morning before the LORD continually: it shall be a statute for ever in your generations. He shall order the lamps upon the pure candlestick before the LORD continually."
          reference="Leviticus 24:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Without the vail</strong> means on the near side of the curtain, in the Holy
            Place where priests served daily, not inside the Most Holy Place where the ark sat.{" "}
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink> describes the
            gold candlestick itself. This chapter does not repeat how it was built. It only says
            what had to happen to it every single evening for as long as Israel existed: trimmed,
            refilled, and lit again.
          </p>
          <p>
            💡 <strong>Continually</strong> appears three times in these four verses. God was not
            asking for a lamp that burned on special occasions. He was asking for one flame in
            Israel&apos;s camp that the sun never got to put out.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Twelve Loaves Before the LORD (verses 5 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From the lamp, the chapter moves a few feet to the other piece of furniture in the same room.</p>
        </div>
        <VerseQuote
          text="And thou shalt take fine flour, and bake twelve cakes thereof: two tenth deals shall be in one cake. And thou shalt set them in two rows, six on a row, upon the pure table before the LORD."
          reference="Leviticus 24:5 and 6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Twelve loaves, one for each tribe of Israel, set in two neat rows of six on the table{" "}
            <ArticleLink href="/blog/exodus-25-explained">Exodus 25</ArticleLink> describes as
            standing right beside the lampstand. Every tribe, even the ones that never produced a
            priest, had bread resting before God every day of the week.
          </p>
          <p>
            Pure frankincense went on top of each row, not mixed into the dough but laid beside
            it, burned later as a memorial portion. Then, once a week, the bread changed hands.
          </p>
        </div>
        <VerseQuote
          text="Every sabbath he shall set it in order before the LORD continually, being taken from the children of Israel by an everlasting covenant."
          reference="Leviticus 24:8"
        />
        <VerseQuote
          text="And it shall be Aaron's and his sons'; and they shall eat it in the holy place: for it is most holy unto him of the offerings of the LORD made by fire by a perpetual statute."
          reference="Leviticus 24:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Old bread never sat on that table going stale.</strong> Every seventh day
            the loaves came down fresh, and the week old loaves became the only meal in the whole
            chapter, eaten by Aaron and his sons, in the holy place, because the text calls it
            most holy.
          </p>
          <p>
            Two quiet jobs, a lamp refilled every evening and bread replaced every week, and
            neither one ever got to rest. Then, with no transition at all, the chapter leaves the
            tabernacle and walks straight into a quarrel in the camp.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Curse Shouted in the Camp (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The scene shifts from the tabernacle to an ordinary fight, the only named incident in
            the whole book of Leviticus.
          </p>
        </div>
        <VerseQuote
          text="And the son of an Israelitish woman, whose father was an Egyptian, went out among the children of Israel: and this son of the Israelitish woman and a man of Israel strove together in the camp; And the Israelitish woman's son blasphemed the name of the Lord, and cursed. And they brought him unto Moses: (and his mother's name was Shelomith, the daughter of Dibri, of the tribe of Dan:)"
          reference="Leviticus 24:10 and 11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The man had an Israelite mother, Shelomith, and an Egyptian father, which placed him
            inside the camp but not fully inside a tribe the way a man with two Israelite parents
            would be. Whatever started the fight, it ended with him cursing, and the curse was
            aimed at the name of the LORD, not just at the man he was fighting.
          </p>
          <p>
            💡 Moses does not rule on the spot. He has no precedent for this exact offense, so he
            does the only responsible thing available to him.
          </p>
        </div>
        <VerseQuote
          text="And they put him in ward, that the mind of the LORD might be shewed them."
          reference="Leviticus 24:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Moses had already received an entire book of law by this point. He still would not
            guess at a sentence God had not actually given. The man waited in custody until the
            answer came from God Himself, not from Moses&apos;s own judgment.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Death for Cursing God&apos;s Name (verses 13 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The answer, when it comes, is immediate and severe.</p>
        </div>
        <VerseQuote
          text="Bring forth him that hath cursed without the camp; and let all that heard him lay their hands upon his head, and let all the congregation stone him."
          reference="Leviticus 24:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Not one executioner. Every single person who heard the curse had to lay a
            hand on his head before the stones ever flew.</strong> The witnesses could not just
            report what they heard and walk away. They had to be the ones who carried out the
            sentence, which made this nothing like a private act of revenge.
          </p>
        </div>
        <VerseQuote
          text="And he that blasphemeth the name of the LORD, he shall surely be put to death, and all the congregation shall certainly stone him: as well the stranger, as he that is born in the land, when he blasphemeth the name of the Lord, shall be put to death."
          reference="Leviticus 24:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That last line answers a question the story itself raises. The man had only one
            Israelite parent, yet verse 16 states plainly that the stranger and the native born
            face the exact same penalty for this exact offense. His mixed parentage changed
            nothing about how seriously God took what he said.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. One Law for Every Injury (verses 17 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before the sentence is carried out, the chapter widens from this one case into a
            general rule for any injury, not only this particular curse.
          </p>
        </div>
        <VerseQuote
          text="And he that killeth any man shall surely be put to death. And he that killeth a beast shall make it good; beast for beast."
          reference="Leviticus 24:17 and 18"
        />
        <VerseQuote
          text="And if a man cause a blemish in his neighbour; as he hath done, so shall it be done to him; Breach for breach, eye for eye, tooth for tooth: as he hath caused a blemish in a man, so shall it be done to him again."
          reference="Leviticus 24:19 and 20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/exodus-21-explained">Exodus 21</ArticleLink> already set this
            same standard once before, life for life, eye for eye, tooth for tooth. Leviticus 24
            repeats it in fewer words, almost as a reminder rather than a fresh ruling, right
            beside a case where that exact standard was about to be applied to a human life.
          </p>
          <p>
            💡 <strong>The measure is proportion, not escalation.</strong> Whatever damage was
            done, the same damage, no more, came back on the one who caused it. A law built to
            keep punishment from running away from the original injury.
          </p>
        </div>
        <VerseQuote
          text="And he that killeth a beast, he shall restore it: and he that killeth a man, he shall be put to death. Ye shall have one manner of law, as well for the stranger, as for one of your own country: for I am the LORD your God."
          reference="Leviticus 24:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 22 states outright what verse 16 already assumed: Israel did not keep one law
            for its own people and a harsher or softer one for everyone else. The same measure
            applied across the whole camp.
          </p>
          <p>Then the chapter returns to the man waiting under guard, and closes the case.</p>
        </div>
        <VerseQuote
          text="And Moses spake to the children of Israel, that they should bring forth him that had cursed out of the camp, and stone him with stones. And the children of Israel did as the LORD commanded Moses."
          reference="Leviticus 24:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter ends exactly where its case law said it would. A curse against the name of
            the LORD met the sentence verse 16 already named, carried out the way verse 14 already
            described, by the whole congregation and not one executioner acting alone.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 24 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does &quot;eye for eye, tooth for tooth&quot; mean Israel practiced literal
            mutilation as punishment?</strong> The chapter itself does not say how the penalty was
            carried out in every case, only that it had to match the injury. Jewish legal
            tradition that grew up around this exact wording consistently read it as setting the
            value of the compensation owed for an injury, not a command to physically remove an
            eye or a tooth from the one who caused the harm. Murder stood apart from this, since
            verses 17 and 21 both insist a human life can only be answered with the death penalty,
            never a payment.
          </p>
          <p>
            <strong>Was it unfair to execute a man who only had one Israelite parent?</strong>{" "}
            The text answers this directly rather than leaving it to guesswork. Verse 16 names the
            stranger and the native born in the same sentence, and verse 22 repeats the principle
            as a general rule. His Egyptian father did not earn him a lighter standard, and it did
            not earn him a harsher one either. The law he broke was the same law that bound every
            other Israelite in the camp.
          </p>
          <p>
            <strong>Why did the whole congregation have to take part in the stoning, instead of
            one trained executioner?</strong> Verse 14 ties the sentence to those who actually
            heard the curse, laying their hands on his head before anyone threw a stone. That
            detail spreads responsibility across every witness rather than letting it fall on one
            man&apos;s decision, and it keeps the punishment a judgment carried out by the
            community rather than a private act of anger.
          </p>
          <p>
            <strong>How does a law demanding death for cursing God&apos;s name square with grace
            later in Scripture?</strong> The New Testament does not soften this chapter so much as
            turn its own charge around. Centuries later, the religious leaders accused Jesus
            Himself of the very crime this chapter punishes.
          </p>
        </div>
        <VerseQuote
          text="The Jews answered him, saying, For a good work we stone thee not; but for blasphemy; and because that thou, being a man, makest thyself God."
          reference="John 10:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The charge meant to protect God&apos;s name from false witness was used
            against the one man who was not guilty of it.</strong> Jesus was not lying when He
            claimed to be God&apos;s Son. Stephen later died the same way in Acts 7, stoned on a
            blasphemy charge for telling the truth about Christ. Leviticus 24 protects the name of
            the LORD. The Gospels show that same law turned, wrongly, against the LORD Himself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 24
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 24:2</h3>
        <VerseQuote
          text="Command the children of Israel, that they bring unto thee pure oil olive beaten for the light, to cause the lamps to burn continually."
          reference="Leviticus 24:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s opening instruction, and its smallest. Nothing about this lamp was
          allowed to be ordinary, not the oil, not the schedule, not the person tending it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 24:9</h3>
        <VerseQuote
          text="And it shall be Aaron's and his sons'; and they shall eat it in the holy place: for it is most holy unto him of the offerings of the LORD made by fire by a perpetual statute."
          reference="Leviticus 24:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Bread that sat before God all week became the one meal in this entire chapter, and the
          only people who ate it did so inside the holy place itself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 24:16</h3>
        <VerseQuote
          text="And he that blasphemeth the name of the LORD, he shall surely be put to death, and all the congregation shall certainly stone him: as well the stranger, as he that is born in the land, when he blasphemeth the name of the Lord, shall be put to death."
          reference="Leviticus 24:16"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse the whole middle section of the chapter turns on, naming the sentence and
          removing any question of whether a man&apos;s ancestry could soften it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 24:20</h3>
        <VerseQuote
          text="Breach for breach, eye for eye, tooth for tooth: as he hath caused a blemish in a man, so shall it be done to him again."
          reference="Leviticus 24:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the most quoted lines in the entire Old Testament, and one of the most
          misunderstood. Its point was proportion, matching a penalty exactly to the harm done.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 24:22</h3>
        <VerseQuote
          text="Ye shall have one manner of law, as well for the stranger, as for one of your own country: for I am the LORD your God."
          reference="Leviticus 24:22"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that settles the hardest question this chapter raises. One law, applied the
          same way, no matter whose camp you were born into.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 24
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 24 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 24 covers three things: the oil and schedule for the lamp that burned in the
          tabernacle every night, the twelve loaves of bread set before the LORD and replaced each
          week, and the case of a man stoned for cursing God&apos;s name, followed by a general law
          about injury and punishment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the tabernacle lamp have to burn continually?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 2 through 4 call it a statute forever, maintained with the purest oil available
          and tended by Aaron from evening to morning. The text does not explain the symbolism
          directly, only that this one flame could never be allowed to go out on Israel&apos;s
          watch.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were the twelve loaves on the table for?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 5 through 9 describe twelve cakes, almost certainly one for each tribe of Israel,
          set in two rows and replaced every Sabbath. The old loaves became the only food in the
          chapter, eaten by Aaron and his sons inside the holy place.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was the man stoned in Leviticus 24?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 10 and 11 name his mother, Shelomith, an Israelite from the tribe of Dan, and say
          his father was Egyptian. The text never gives his own name, only his offense: cursing
          the name of the LORD during a fight in the camp.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean to blaspheme the name of the Lord?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In this chapter it means treating God&apos;s name with open contempt, cursing it the way
          the man did in verse 11. Verse 16 sets the penalty at death, applied without exception to
          anyone in the camp, Israelite or stranger.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does &quot;eye for eye, tooth for tooth&quot; mean Israel physically mutilated people as punishment?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 20 states the principle without describing exactly how every case was carried out.
          Jewish legal tradition built on this verse has long understood it as fixing fair
          compensation for an injury rather than demanding the same physical wound be inflicted in
          return, while murder specifically still required the death penalty under verses 17 and
          21.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was it fair to execute a man who was only half Israelite?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 16 and 22 both answer this directly. The same law bound the stranger and the
          native born alike, so his Egyptian father neither excused him nor made his punishment
          harsher than any full Israelite would have faced for the same offense.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the whole congregation stone him instead of one executioner?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 14 ties the stoning to everyone who actually heard the curse, requiring them to
          lay hands on his head first. That spread the responsibility across the whole community
          rather than leaving it to a single person&apos;s judgment.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does &quot;eye for eye&quot; contradict Jesus telling people to turn the other cheek?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus was addressing personal revenge between individuals, not the civil law a nation
          used to judge crimes brought before its courts. Leviticus 24 governs how Israel&apos;s
          judges answered injury with a proportional penalty. Jesus called His followers to give up
          their own right to get even, a different question entirely.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 24 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The clearest connection is painful rather than comforting. Centuries later, Jesus was
          accused of the exact crime this chapter punishes, blasphemy, recorded in John 10:33 and
          again at His trial. The law built to defend God&apos;s name from false claims was turned
          against the one man who was telling the truth about who He was.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 24 looks like three unrelated scenes until you notice what holds them together.</p>
          <p>
            📌 <strong>The name of the LORD mattered enough to guard with a flame that never went
            out, bread that never sat stale, and a penalty that never bent for anyone&apos;s
            background.</strong> A lamp, a loaf, and a law, all protecting the same thing from
            three different angles.
          </p>
          <p>
            📌 <strong>Proportion, not escalation, ran through every rule in this chapter.</strong>{" "}
            Whether the injury was to an animal or a person, the measure of justice never outran
            the damage actually done.
          </p>
          <p>
            📌 <strong>One law for the stranger and one law for the native born were always the
            same law.</strong> Verse 22 makes that explicit, right after a case that tested it on a
            real man with a foreign father.
          </p>
          <p>
            You keep no lamp burning in a literal tabernacle today. But the question under this
            chapter still reaches you, how seriously you treat God&apos;s name in your own ordinary
            words, especially the ones spoken in anger.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Notice the next time frustration makes you careless with God&apos;s name, out loud or
            under your breath, and treat that moment with the same seriousness this chapter did.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
