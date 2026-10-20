import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-17-explained", {
  title: "Leviticus 17 Explained: The Law Against Eating Blood",
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

export default function LeviticusSeventeenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-17-explained"
      title={<>📖 Leviticus 17 Explained: The Law Against Eating Blood</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              A family kills a goat behind their own tent, miles from the tabernacle, and eats it
              that night like any other meal. Leviticus 17 says that meal just cost them everything.
            </p>
            <p>
              <strong>Leviticus 17 explained</strong> is a short chapter with one big target. It
              shuts down private butchering of sacrificial animals, names the counterfeit worship
              that had been happening in the open field, and then bans something that sounds almost
              too ordinary to need a law: eating blood. Sixteen verses, and every one of them
              circles back to the same claim, that blood is not just food, and it is not just waste.
              It is life, and it belongs to the LORD.
            </p>
            <p>Maybe you have read past this chapter without noticing how much it is actually asking.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does killing your own animal for dinner carry the same penalty as murder language, &quot;cut off from among his people&quot;?</li>
            <li>❓ Who or what were the &quot;devils&quot; Israel had been sacrificing to in the open field?</li>
            <li>❓ Why ban eating blood specifically, when so much of Leviticus is about eating?</li>
            <li>❓ And why does this one law apply to foreigners living among Israel, when so many others did not?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 17 is not really about butchering technique. It is about who
              gets to decide what blood means.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: one door for every
              sacrifice and the counterfeit worship it was meant to end, the same rule applied to
              both Israelite and foreigner, the single verse that explains why blood was never on
              the menu, the hunter&apos;s own version of the law, and the accidental case that
              closes the chapter.
            </p>
            <p>Read slowly. One verse here is the reason every sacrifice in this book worked at all.</p>
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
            <ArticleLink href="/blog/leviticus-16-explained">Leviticus 16</ArticleLink> just showed
            blood doing the heaviest work it ever does in this book. Aaron carried it behind the
            veil, sprinkled it on the mercy seat, and used it to cleanse a whole nation&apos;s sin
            once a year. That chapter ended with Aaron doing exactly as the LORD commanded.
          </p>
          <p>
            Leviticus 17 widens the lens. If blood on the altar can cover the sin of an entire
            people, then blood is not a substance anyone gets to treat casually, not on the Day of
            Atonement and not on an ordinary Tuesday when a family wants meat for supper. This
            chapter takes the principle Leviticus 16 just demonstrated and turns it into a
            standing law for every sacrifice, every animal, every day.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 17 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. One Door for Every Sacrifice (verses 1 to 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter opens with Moses speaking to Aaron, his sons, and the whole nation at once,
            a wider audience than most chapters in this book bother to name.
          </p>
        </div>
        <VerseQuote
          text="What man soever there be of the house of Israel, that killeth an ox, or lamb, or goat, in the camp, or that killeth it out of the camp, And bringeth it not unto the door of the tabernacle of the congregation, to offer an offering unto the LORD before the tabernacle of the LORD; blood shall be imputed unto that man; he hath shed blood; and that man shall be cut off from among his people"
          reference="Leviticus 17:3 and 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Killing an animal anywhere but at the tabernacle door, for this specific
            purpose, counts in this verse as shedding blood.</strong> That is strong language for
            what sounds like an ordinary slaughter. The text is not talking about butchering an
            animal for an ordinary meal everywhere in Israel&apos;s law. It is talking about
            sacrifice, worship offered somewhere other than the one place the LORD had set apart
            for it.
          </p>
          <p>The very next verse names exactly why this mattered so much.</p>
        </div>
        <VerseQuote
          text="And they shall no more offer their sacrifices unto devils, after whom they have gone a whoring. This shall be a statute for ever unto them throughout their generations."
          reference="Leviticus 17:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ &quot;Devils&quot; here is the same word the King James translators later use in 2
            Chronicles 11:15, for the goat idols and golden calves Jeroboam set priests over
            generations after this. Israel had already shown exactly this pull toward an idol
            shaped like livestock once before, at the{" "}
            <ArticleLink href="/blog/exodus-32-explained">golden calf</ArticleLink> only months
            after leaving Egypt. Whatever exactly Israel had been offering to in the open field,
            it was not a neutral backyard barbecue. It was a rival altar, competing with the one
            the LORD had just finished building through Moses in the wilderness.
          </p>
          <p>
            A single door closes that loophole completely. Bring the animal to the priest, let the
            blood go on the altar, burn the fat, and the same meal becomes a peace offering instead
            of a sacrifice to something else entirely.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Same Rule for Native and Foreigner (verses 8 and 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The law repeats itself almost word for word, but this time it names a second group of
            people it covers.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt say unto them, Whatsoever man there be of the house of Israel, or of the strangers which sojourn among you, that offereth a burnt offering or sacrifice, And bringeth it not unto the door of the tabernacle of the congregation, to offer it unto the LORD; even that man shall be cut off from among his people."
          reference="Leviticus 17:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Strangers which sojourn among you&quot; means foreigners living inside
            Israel&apos;s camp, not Israelites themselves.</strong> Plenty of laws in this book
            apply only to native born Israel. This one does not. Whoever wants to bring an offering
            at all, Israelite or not, brings it to the same door, or it is not accepted as worship
            of the LORD at all.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Why Blood Was Never on the Menu (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 10 shifts from where sacrifices happen to something that sounds, at first, like a
            completely different subject.
          </p>
        </div>
        <VerseQuote
          text="And whatsoever man there be of the house of Israel, or of the strangers that sojourn among you, that eateth any manner of blood; I will even set my face against that soul that eateth blood, and will cut him off from among his people."
          reference="Leviticus 17:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Same audience as the verses just before it, Israelite and foreigner alike, and the
            same penalty. But this is not about sacrificing in the wrong place anymore. This is
            about what a person puts in their mouth at an ordinary meal. The very next verse is the
            reason why.
          </p>
        </div>
        <VerseQuote
          text="For the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls: for it is the blood that maketh an atonement for the soul."
          reference="Leviticus 17:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the single most important verse in the chapter, and arguably one of
            the most important in the whole book.</strong> Blood is not banned as food because it
            is unclean the way an unclean animal is unclean. It is withheld because of what it was
            given for. The life belongs to God, and He assigned blood one job, atonement on His
            altar, not a place on anyone&apos;s table.
          </p>
          <p>
            Everything in <ArticleLink href="/blog/leviticus-16-explained">Leviticus 16</ArticleLink>{" "}
            just showed this verse in action. Every sin offering and peace offering across this
            entire book has rested on this one principle without ever stopping to state it. Verse
            11 is Leviticus finally saying out loud why the blood mattered the whole time.
          </p>
          <p>The chapter restates it once more, almost as if it expects someone to miss it the first time.</p>
        </div>
        <VerseQuote
          text="Therefore I said unto the children of Israel, No soul of you shall eat blood, neither shall any stranger that sojourneth among you eat blood."
          reference="Leviticus 17:12"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Hunter&apos;s Own Version of the Law (verses 13 and 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not every animal eaten in Israel came through a priest. Deer, birds, and other wild
            game caught in the field never passed near the tabernacle at all, so the law gives them
            their own rule.
          </p>
        </div>
        <VerseQuote
          text="And whatsoever man there be of the children of Israel, or of the strangers that sojourn among you, which hunteth and catcheth any beast or fowl that may be eaten; he shall even pour out the blood thereof, and cover it with dust."
          reference="Leviticus 17:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A hunter could never bring a wild animal to the tabernacle door the way a farmer
            brought a lamb or goat raised from the flock. Wild game was never offered as a sacrifice
            in Leviticus at all. So the law does not ask for an altar here. It asks for the blood to
            be poured out and covered with dust, the same respect shown to blood on the altar, kept
            out of anyone&apos;s meal, just without a priest involved.
          </p>
        </div>
        <VerseQuote
          text="For it is the life of all flesh; the blood of it is for the life thereof: therefore I said unto the children of Israel, Ye shall eat the blood of no manner of flesh: for the life of all flesh is the blood thereof: whosoever eateth it shall be cut off."
          reference="Leviticus 17:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verse 11 grounded the rule in atonement. Verse 14 grounds the same rule in
            something even wider, that blood is simply the life of any flesh, sacrificed animal or
            hunted game alike.</strong> The reasoning changes slightly depending on where the
            animal came from. The rule itself never does.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Accidental Case: A Carcass or Something Torn (verses 15 and 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter closes with a case nobody plans for, an animal that was already dead before
            anyone got to it.
          </p>
        </div>
        <VerseQuote
          text="And every soul that eateth that which died of itself, or that which was torn with beasts, whether it be one of your own country, or a stranger, he shall both wash his clothes, and bathe himself in water, and be unclean until the even: then shall he be clean."
          reference="Leviticus 17:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Notice the gap between this penalty and every other one in the chapter. Deliberately
            eating blood meant being cut off. Eating a carcass found already dead, blood never
            properly drained the way a hunter or a priest would drain it, meant washing and waiting
            until evening, the same light remedy used throughout{" "}
            <ArticleLink href="/blog/leviticus-11-explained">Leviticus 11</ArticleLink> for lesser
            contact with something unclean. The chapter does not treat an accident the same as
            defiance.
          </p>
          <p>Even that lighter case still carried a real consequence if it was ignored.</p>
        </div>
        <VerseQuote
          text="But if he wash them not, nor bathe his flesh; then he shall bear his iniquity."
          reference="Leviticus 17:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Washing was not optional just because the uncleanness was accidental. Skipping it
            turned a small, forgivable lapse into something the person had to personally answer
            for.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 17 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Who or what were the &quot;devils&quot; in verse 7?</strong> The text does not
            give a full description. The same English word, &quot;devils,&quot; appears again in
            2 Chronicles 11:15 for the goat idols and golden calves Jeroboam later set priests over,
            which tells us this was goat shaped idol worship of some kind, carried out in open
            fields rather than at any proper altar. Beyond that connection, the exact identity of
            what Israel had been offering to is something the text leaves unnamed.
          </p>
          <p>
            <strong>What does &quot;cut off from among his people&quot; actually mean?</strong>{" "}
            Leviticus uses this phrase for several of its most serious offenses without defining it
            in one place. Bible teachers read it as excommunication from the community at minimum,
            and in some cases as the community carrying out a death sentence. The text itself leaves
            the exact mechanism unstated, only that it was severe enough to be named alongside
            murder language, &quot;he hath shed blood,&quot; in verse 4.
          </p>
          <p>
            <strong>Why extend this specific law to foreigners, when so many purity laws in
            Leviticus applied only to Israel?</strong> The text does not explain its own reasoning
            here, only the rule. What can be said plainly is that verses 8, 10, 12, and 13 all name
            the stranger who sojourns among Israel right alongside the native born, across the
            sacrifice law, the blood law, and the hunter&apos;s law, which is deliberate repetition,
            not an oversight. Whoever ate at Israel&apos;s table or worshipped at Israel&apos;s altar
            lived under this one, specifically.
          </p>
          <p>
            <strong>Does the Lord&apos;s Supper break this law, since Jesus tells believers to
            drink His blood?</strong> John 6 records Jesus using exactly that language.
          </p>
        </div>
        <VerseQuote
          text="Then Jesus said unto them, Verily, verily, I say unto you, Except ye eat the flesh of the Son of man, and drink his blood, ye have no life in you."
          reference="John 6:53"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Most Christian traditions read this as figurative language about faith in
            Christ&apos;s sacrifice, not literal blood drinking.</strong> The meal Jesus later
            institutes at the Last Supper uses wine as a symbol of His blood, never blood itself,
            which is the detail that keeps the Lord&apos;s Supper from actually crossing the line
            Leviticus 17 draws.
          </p>
          <p>
            <strong>Do Christians today still have to avoid eating blood?</strong> This is one
            place the New Testament addresses the question directly, and not everyone reads the
            answer the same way.
          </p>
        </div>
        <VerseQuote
          text="For it seemed good to the Holy Ghost, and to us, to lay upon you no greater burden than these necessary things; That ye abstain from meats offered to idols, and from blood, and from things strangled, and from fornication: from which if ye keep yourselves, ye shall do well."
          reference="Acts 15:28 and 29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That instruction to new Gentile believers names the exact same category, blood, next to
            idols and sexual sin. Some Christian traditions read this as a temporary, situational
            ruling for peace between Jewish and Gentile believers at that moment in the early
            church. Others read it as still binding. Leviticus 17 itself cannot settle a New
            Testament debate, but it is plainly the law Acts 15 is echoing.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 17
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 17:11</h3>
        <VerseQuote
          text="For the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls: for it is the blood that maketh an atonement for the soul."
          reference="Leviticus 17:11"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that explains every sacrifice in Leviticus at once. Blood was never ordinary.
          It was set apart for one purpose, atonement, before this book ever began.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 17:7</h3>
        <VerseQuote
          text="And they shall no more offer their sacrifices unto devils, after whom they have gone a whoring. This shall be a statute for ever unto them throughout their generations."
          reference="Leviticus 17:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One sentence exposing exactly what the open field sacrifices had become, worship aimed
          somewhere other than the LORD, and the permanent law written to end it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 17:14</h3>
        <VerseQuote
          text="For it is the life of all flesh; the blood of it is for the life thereof: therefore I said unto the children of Israel, Ye shall eat the blood of no manner of flesh: for the life of all flesh is the blood thereof: whosoever eateth it shall be cut off."
          reference="Leviticus 17:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The widest statement in the chapter. Not just sacrificed animals, every living creature&apos;s
          blood carries the same weight.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 17:4</h3>
        <VerseQuote
          text="And bringeth it not unto the door of the tabernacle of the congregation, to offer an offering unto the LORD before the tabernacle of the LORD; blood shall be imputed unto that man; he hath shed blood; and that man shall be cut off from among his people."
          reference="Leviticus 17:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that sets the whole chapter in motion. One door, one altar, and language as
          severe as the law ever gets for sacrificing anywhere else.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 17:13</h3>
        <VerseQuote
          text="And whatsoever man there be of the children of Israel, or of the strangers that sojourn among you, which hunteth and catcheth any beast or fowl that may be eaten; he shall even pour out the blood thereof, and cover it with dust."
          reference="Leviticus 17:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A quiet, practical rule for the one case that could never pass through a priest&apos;s
          hands, proof the principle mattered even when no altar was anywhere nearby.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 17
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 17 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 17 requires every sacrifice to be brought to the tabernacle door instead of
          offered privately, bans eating blood for both Israelites and foreigners living among
          them, sets a separate rule for hunted game, and covers the accidental case of eating an
          animal found already dead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Leviticus 17 ban eating blood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 17:11 gives the reason directly: the life of a creature is in its blood, and
          God set that blood apart for one purpose, making atonement on the altar. Eating it would
          have treated as ordinary food something specifically reserved for worship.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were the &quot;devils&quot; Israel had been sacrificing to?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not fully identify them. The same word appears in 2 Chronicles 11:15 for
          goat idols and golden calves, which points to some form of goat shaped idol worship
          carried out in open fields rather than at a proper altar.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;cut off from among his people&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus does not define the phrase in one place. It is widely read as exile from the
          community at minimum, and possibly a death sentence carried out by the community,
          depending on the offense. The text itself leaves the exact mechanism unstated.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the law for sacrifices and blood also apply to foreigners?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 17:8, 10, 12, and 13 all specifically name the stranger who sojourns among
          Israel alongside the native born. Unlike many purity laws in this book that apply only
          to native born Israel, this chapter repeats the foreigner across the sacrifice law, the
          blood law, and the hunter&apos;s law, making clear anyone eating at Israel&apos;s table
          or worshipping at Israel&apos;s altar lived under the same rule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What were hunters supposed to do with an animal&apos;s blood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 17:13 tells a hunter to pour the blood out and cover it with dust, since wild
          game was never brought to the tabernacle as a sacrifice. The blood still could not be
          eaten or treated carelessly, just without a priest or altar involved.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does the New Testament ever address this law about blood?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Acts 15:28 and 29 tells new Gentile believers to abstain from blood alongside idols
          and sexual sin. Christian traditions differ on whether that instruction was a lasting
          rule or a situational one for peace between Jewish and Gentile believers at that time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Jesus telling people to drink His blood in John 6 contradict Leviticus 17?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Christian readings take John 6:53 as figurative language about trusting in Christ&apos;s
          sacrifice, not literal blood drinking. The Lord&apos;s Supper itself uses wine as a symbol
          of His blood, never blood itself, which keeps the practice from actually crossing the
          line this chapter draws.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened if someone ate an animal that was already dead when they found it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 17:15 and 16 treat that as a lighter, accidental case. Washing clothes and
          bathing, then waiting until evening, settled it, far less severe than the penalty for
          deliberately eating blood, though ignoring the washing still left the person to answer
          for it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 17 connect to Leviticus 16?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 16 just showed blood making atonement for a whole nation on the Day of
          Atonement. Leviticus 17:11 states the principle behind that chapter directly, turning
          what the Day of Atonement demonstrated into a standing law for every sacrifice.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 17 is sixteen short verses, but it is quietly one of the hinge chapters of the whole book.</p>
          <p>
            📌 <strong>One door, one altar, nowhere else.</strong> Worship that bypassed the
            tabernacle was not a harmless shortcut. It was competing with an idol in an open field.
          </p>
          <p>
            📌 <strong>&quot;It is the blood that maketh an atonement for the soul&quot; is the
            key that unlocks the rest of Leviticus.</strong> Every offering before this chapter and
            after it rests on that one sentence, whether it ever says so or not.
          </p>
          <p>
            📌 <strong>The rule reached further than Israel alone.</strong> Foreigners living among
            them lived under the exact same law, named directly across four separate verses.
          </p>
          <p>
            You will never pour a hunted animal&apos;s blood into the dust or carry a lamb to a
            tabernacle door. But this chapter still asks whether you treat what cost something to
            purchase your atonement as ordinary, or as set apart.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Read Hebrews 9:22 today, &quot;without shedding of blood is no remission,&quot; and let
            Leviticus 17:11 be the verse standing behind it.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
