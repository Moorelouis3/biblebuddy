import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("leviticus-11-explained", {
  title: "Leviticus 11 Explained: Clean and Unclean Animals, and Why It Mattered",
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

export default function LeviticusElevenExplainedPage() {
  return (
    <BlogPostShell
      slug="leviticus-11-explained"
      title={<>📖 Leviticus 11 Explained: Clean and Unclean Animals, and Why It Mattered</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>No sacrifice happens in this chapter. No blood touches an altar. No priest is ordained.</p>
            <p>
              <strong>Leviticus 11 explained</strong> is the chapter where God turns His attention
              from the tabernacle to the dinner table. For the first time since the law began, the
              instructions are not for priests only. They are for every single Israelite, every
              single day, every single meal.
            </p>
            <p>Maybe you have skimmed this chapter and filed it away as an ancient grocery list.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does the hoof and the cud decide what lands on the plate?</li>
            <li>❓ Why does a rabbit get called unclean for chewing the cud when it does not actually chew the cud?</li>
            <li>❓ Why does touching a dead mouse make a whole clay pot unusable?</li>
            <li>❓ And are Christians today still bound by any of this?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Leviticus 11 never claims these animals are dirty or dangerous. It claims
              they are a daily reminder of something else entirely.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the hoof and cud rule for
              land animals, fins and scales for water creatures, the forbidden birds, the one
              exception for certain flying creeping things, how touching a carcass spreads
              uncleanness to clothing and pottery and water, and the sentence at the end that
              explains why any of it mattered at all.
            </p>
            <p>Read slowly. This chapter asks something no earlier chapter in Leviticus has asked yet.</p>
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
            <ArticleLink href="/blog/leviticus-10-explained">Leviticus 10</ArticleLink> ended with
            Moses naming the actual job a priest existed to do: &quot;put difference between holy
            and unholy, and between unclean and clean,&quot; and teach that difference to Israel.
            That sentence landed in the middle of grief, right after Nadab and Abihu died for
            bringing fire God never authorized.
          </p>
          <p>
            Leviticus 11 is that teaching, put into words for the very first time. The chapter does
            not open with a new scene or a new location. It opens with the LORD simply continuing
            to speak, and for the first time in the sacrificial section of this book, the subject
            is not an offering. It is a dinner.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Leviticus 11 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Land Animals: The Hoof and the Cud (verses 1 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens by naming who this instruction is for, and it is not a narrow audience.</p>
        </div>
        <VerseQuote
          text="And the LORD spake unto Moses and to Aaron, saying unto them, Speak unto the children of Israel, saying, These are the beasts which ye shall eat among all the beasts that are on the earth."
          reference="Leviticus 11:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every earlier chapter in Leviticus spoke to priests, or to a worshipper
            bringing an offering. This one speaks to the whole nation, about something every
            single person in it does three times a day.</strong>
          </p>
          <p>The rule for land animals is stated as one clean test with two parts.</p>
        </div>
        <VerseQuote
          text="Whatsoever parteth the hoof, and is clovenfooted, and cheweth the cud, among the beasts, that shall ye eat."
          reference="Leviticus 11:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Both conditions have to be true at once. The hoof has to be split into two parts,
            and the animal has to chew the cud, meaning it brings food back up from an earlier
            stomach and chews it a second time. Miss either half and the animal is unclean,
            whatever else it has going for it.
          </p>
          <p>The next verses name four animals that each fail the test in a different way.</p>
        </div>
        <VerseQuote
          text="Nevertheless these shall ye not eat of them that chew the cud, or of them that divide the hoof: as the camel, because he cheweth the cud, but divideth not the hoof; he is unclean unto you. And the coney, because he cheweth the cud, but divideth not the hoof; he is unclean unto you. And the hare, because he cheweth the cud, but divideth not the hoof; he is unclean unto you. And the swine, though he divide the hoof, and be clovenfooted, yet he cheweth not the cud; he is unclean to you."
          reference="Leviticus 11:4 to 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Three animals fail by hoof, one fails by cud, and the text makes sure to
            name both kinds of failure.</strong> The camel, the coney, and the hare chew something
            that looks like cud chewing but do not have a split hoof. The swine has the split hoof
            but does not chew the cud at all. Neither mistake is treated as the lesser one.
          </p>
          <p>
            <strong>Coney</strong> is an old word for a rock badger or hyrax, a small animal common
            in the hill country of the region, not the modern rabbit the word sometimes suggests in
            English. Verse 8 closes the land animal section with the plainest instruction in the
            passage.
          </p>
        </div>
        <VerseQuote
          text="Of their flesh shall ye not eat, and their carcase shall ye not touch; they are unclean to you."
          reference="Leviticus 11:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not eating was only the first half of the rule. Not touching the body was already part
            of it, long before the chapter explains later exactly what touching a carcass does to a
            person or an object.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Water Creatures: Fins and Scales (verses 9 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The sea and the rivers get their own test, simpler than the one for land animals.</p>
        </div>
        <VerseQuote
          text="These shall ye eat of all that are in the waters: whatsoever hath fins and scales in the waters, in the seas, and in the rivers, them shall ye eat."
          reference="Leviticus 11:9"
        />
        <VerseQuote
          text="And all that have not fins and scales in the seas, and in the rivers, of all that move in the waters, and of any living thing which is in the waters, they shall be an abomination unto you."
          reference="Leviticus 11:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Two features, fins and scales, both present, or the creature is unclean. This single
            test quietly rules out shellfish, eels, and catfish along with anything else in the
            water lacking either feature, without the chapter ever naming a single one of them by
            species. The rule is built to cover an entire category, not a list of specific animals.
          </p>
          <p>
            <strong>Abomination</strong> is a stronger word than &quot;unclean&quot; alone, and the
            chapter uses it on purpose here. Verse 11 repeats the warning before moving on, making
            sure no reader mistakes this for a minor preference.
          </p>
        </div>
        <VerseQuote
          text="They shall be even an abomination unto you; ye shall not eat of their flesh, but ye shall have their carcases in abomination."
          reference="Leviticus 11:11"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Birds and Flying Things: The Forbidden List (verses 13 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Unlike the land animals and the water creatures, the birds get no single test. They get
            a list, by name.
          </p>
        </div>
        <VerseQuote
          text="And these are they which ye shall have in abomination among the fowls; they shall not be eaten, they are an abomination: the eagle, and the ossifrage, and the ospray, And the vulture, and the kite after his kind; Every raven after his kind; And the owl, and the night hawk, and the cuckow, and the hawk after his kind, And the little owl, and the cormorant, and the great owl, And the swan, and the pelican, and the gier eagle, And the stork, the heron after her kind, and the lapwing, and the bat."
          reference="Leviticus 11:13 to 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Twenty names in a row, though a few of the underlying Hebrew bird names are uncertain
            in exactly which species they point to, and nearly every one shares something in
            common: birds of prey, scavengers,
            and birds that eat carrion or fish rather than grain. The bat is listed last, grouped
            here by the way it flies rather than by any modern zoological category the original
            readers were not using.
          </p>
          <p>
            The chapter then widens the category beyond birds to anything that flies close to the
            ground on legs.
          </p>
        </div>
        <VerseQuote
          text="All fowls that creep, going upon all four, shall be an abomination unto you."
          reference="Leviticus 11:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>That single verse sets up the exception that follows it, and the exception
            is easy to miss on a fast read.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The One Exception: Locusts and Their Kind (verses 21 to 23)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Right after the broadest ban in the chapter comes the only exception in it.</p>
        </div>
        <VerseQuote
          text="Yet these may ye eat of every flying creeping thing that goeth upon all four, which have legs above their feet, to leap withal upon the earth; Even these of them ye may eat; the locust after his kind, and the bald locust after his kind, and the beetle after his kind, and the grasshopper after his kind."
          reference="Leviticus 11:21 and 22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The distinguishing mark named in the text is &quot;legs above their feet,&quot;
            jointed back legs built for leaping, the feature that separates a locust or grasshopper
            from every other small creeping thing the chapter has just forbidden. Everything else
            that creeps on all four without that leaping leg stays an abomination.
          </p>
          <p>
            This is not a footnote. John the Baptist&apos;s diet centuries later, &quot;locusts and
            wild honey,&quot; was not a sign of extreme poverty breaking the law. It was ordinary
            food this exact verse had always allowed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. How Uncleanness Spreads: Touching the Dead (verses 24 to 38)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter now turns from what goes in the mouth to what happens when skin, cloth, or
            clay touches a body that is already dead.
          </p>
        </div>
        <VerseQuote
          text="And for these ye shall be unclean: whosoever toucheth the carcase of them shall be unclean until the even. And whosoever beareth ought of the carcase of them shall wash his clothes, and be unclean until the even."
          reference="Leviticus 11:24 and 25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Touching costs less than carrying. Simple contact means a person is unclean until
            evening. Actually carrying the carcase adds a requirement to wash clothes before that
            same evening arrives. The chapter grades the contact, not just names it.
          </p>
          <p>A short list of small land creatures gets named specifically before the rule widens again.</p>
        </div>
        <VerseQuote
          text="These also shall be unclean unto you among the creeping things that creep upon the earth; the weasel, and the mouse, and the tortoise after his kind, And the ferret, and the chameleon, and the lizard, and the snail, and the mole."
          reference="Leviticus 11:29 and 30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Then the chapter does something it has not done yet. It follows uncleanness off the animal and into the house.</p>
        </div>
        <VerseQuote
          text="And upon whatsoever any of them, when they are dead, doth fall, it shall be unclean; whether it be any vessel of wood, or raiment, or skin, or sack, whatsoever vessel it be, wherein any work is done, it must be put into water, and it shall be unclean until the even; so it shall be cleansed."
          reference="Leviticus 11:32"
        />
        <VerseQuote
          text="And every earthen vessel, whereinto any of them falleth, whatsoever is in it shall be unclean; and ye shall break it."
          reference="Leviticus 11:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A wooden bowl or a cloth sack can be washed and used again by evening. A clay
            pot cannot be washed clean at all. It has to be broken.</strong> The text never explains
            why clay is treated differently from wood or cloth, but the distinction is stated
            plainly and applied consistently through the rest of the section, down to ovens and
            cooking ranges in verse 35, which must be broken down the same way.
          </p>
          <p>Even water itself gets a rule, and it runs in a direction some readers expect to run the other way.</p>
        </div>
        <VerseQuote
          text="Nevertheless a fountain or pit, wherein there is plenty of water, shall be clean: but that which toucheth their carcase shall be unclean."
          reference="Leviticus 11:36"
        />
        <VerseQuote
          text="And if any part of their carcase fall upon any sowing seed which is to be sown, it shall be clean. But if any water be put upon the seed, and any part of their carcase fall thereon, it shall be unclean unto you."
          reference="Leviticus 11:37 and 38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Dry seed with a dead creature on it stays clean. The same seed becomes unclean the
            moment water has been added to it. Moisture, not the seed itself, is what lets
            uncleanness take hold. A fresh spring stays clean by its own volume and flow even though
            a carcase can make still, standing water unclean. The pattern across all of verses 32 to
            38 is the same question asked of wood, cloth, clay, ovens, seed, and water alike: can
            contact be undone, or does it have to be destroyed or washed away.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Carcasses of Clean Animals, and Creeping Things One More Time (verses 39 to 43)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter adds one more case that is easy to overlook: what happens when an animal
            that was perfectly fine to eat simply dies on its own.
          </p>
        </div>
        <VerseQuote
          text="And if any beast, of which ye may eat, die; he that toucheth the carcase thereof shall be unclean until the even."
          reference="Leviticus 11:39"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Even a clean animal, one that passed every test in verses 3 to 8, becomes a
            source of uncleanness the moment it dies outside of a proper sacrifice or a proper
            slaughter.</strong> Cleanness in this chapter was never only about species. Death itself
            carried a cost, whatever kind of creature it touched.
          </p>
          <p>
            Verses 41 to 43 then return one last time to creeping things, repeating the ban in
            slightly different words, &quot;whatsoever goeth upon the belly,&quot; &quot;whatsoever
            goeth upon all four,&quot; &quot;whatsoever hath more feet,&quot; covering every way a
            small creature can move along the ground, as if closing a door from every possible
            angle at once before the chapter turns to its final point.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Reason Behind It All: Be Holy, For I Am Holy (verses 44 to 47)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            After forty-three verses of specific animals and specific rules, the chapter finally
            says why any of it mattered.
          </p>
        </div>
        <VerseQuote
          text="For I am the LORD your God: ye shall therefore sanctify yourselves, and ye shall be holy; for I am holy: neither shall ye defile yourselves with any manner of creeping thing that creepeth upon the earth."
          reference="Leviticus 11:44"
        />
        <VerseQuote
          text="For I am the LORD that bringeth you up out of the land of Egypt, to be your God: ye shall therefore be holy, for I am holy."
          reference="Leviticus 11:45"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Verse 45 roots the whole chapter in a historical fact, not a timeless philosophy: the
            LORD who just brought Israel out of Egypt is now asking something of them. The food
            laws are tied directly to who rescued them, not to a general theory about hygiene or
            diet.
          </p>
          <p>
            📌 <strong>&quot;Be holy, for I am holy&quot; repeats twice in two verses.</strong> First
            Peter later quotes this exact line almost word for word, applying it to Christians who
            never kept a single one of these food laws.
          </p>
        </div>
        <VerseQuote
          text="But as he which hath called you is holy, so be ye holy in all manner of conversation; Because it is written, Be ye holy; for I am holy."
          reference="1 Peter 1:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Peter lifts the command straight out of Leviticus 11 and applies it to an entirely
            different kind of obedience. The call to be holy outlived the specific animals that
            first carried it.
          </p>
          <p>The chapter&apos;s closing verse states its own purpose in one sentence, almost like a summary written for the reader.</p>
        </div>
        <VerseQuote
          text="To make a difference between the unclean and the clean, and between the beast that may be eaten and the beast that may not be eaten."
          reference="Leviticus 11:47"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;To make a difference&quot; is the same phrase{" "}
            <ArticleLink href="/blog/leviticus-10-explained">Leviticus 10</ArticleLink> used to
            describe a priest&apos;s entire job.</strong> This chapter hands that same skill to every
            Israelite at every meal. Telling clean from unclean was never meant to stay inside the
            tabernacle.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Leviticus 11 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why these specific animals?</strong> Leviticus 11 never states one single
            reason, and Bible teachers genuinely disagree on why these particular categories were
            chosen. Some point to the pattern itself, that the animals rejected are disproportionately
            predators, scavengers, and creatures that eat carrion or filth, and argue the list draws
            a visible line between what consumes death and what does not. Others focus on verses 44
            to 47 and argue the specific animals matter less than the daily, repeated act of
            obedience itself, a constant reminder that Israel belonged to a holy God. The text
            supports both readings without settling between them, and no verse claims these animals
            were unsafe to eat.
          </p>
          <p>
            <strong>Do rabbits and rock badgers actually chew the cud?</strong> Not in the way a
            cow or a sheep does, chewing food brought back up from a true multi-chambered stomach.
            Verses 5 and 6 still describe the coney and the hare this way. The honest answer is that
            the Hebrew phrase describes a visible chewing motion these animals do make, a jaw
            movement that looks like cud chewing to an observer, rather than a technical claim about
            their digestive system matching a cow&apos;s. Scripture is describing what an ordinary
            Israelite could see with their own eyes, not writing a zoology manual.
          </p>
          <p>
            <strong>Are Christians today required to keep Leviticus 11&apos;s food laws?</strong>{" "}
            What the text itself says is that this was given to Israel specifically, tied to their
            identity as a people the LORD had just brought out of Egypt. How Christians have read
            that since is where real interpretation starts.{" "}
            <ArticleLink href="/blog/leviticus-10-explained">Jesus taught</ArticleLink> that nothing
            entering a person from outside can defile them, only what comes from within. Peter&apos;s
            vision in Acts 10 and the decision of the apostles in Acts 15 both moved the early church
            away from treating these food laws as binding on new believers, and Paul states plainly
            in Romans 14 that no food is unclean in itself. Most Christian traditions read Leviticus
            11 as part of a civil and ceremonial code fulfilled in Christ, not a command still in
            force, though the exact line between what carries forward and what does not is a
            question Christians have debated since the first century, not one this chapter settles
            on its own.
          </p>
          <p>
            <strong>Why is the pig named so specifically, when the chapter never names most other
            unclean land animals?</strong> Verse 7 is one of only four land animals named outright,
            alongside the camel, the coney, and the hare. The text gives no special explanation for
            why the pig gets singled out over any other unclean creature. What later history shows is
            that the pig became the most visible marker of Jewish identity against surrounding
            nations, which is why it carries far more symbolic weight in later Jewish and Christian
            memory than the text of Leviticus 11 itself assigns to it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Leviticus 11
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Leviticus 11:7 and 8</h3>
        <VerseQuote
          text="And the swine, though he divide the hoof, and be clovenfooted, yet he cheweth not the cud; he is unclean to you. Of their flesh shall ye not eat, and their carcase shall ye not touch; they are unclean to you."
          reference="Leviticus 11:7 and 8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that gave Israel its most lasting dietary marker. A split hoof alone was never
          enough; the cud test had to pass too.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Leviticus 11:9 and 10</h3>
        <VerseQuote
          text="These shall ye eat of all that are in the waters: whatsoever hath fins and scales in the waters, in the seas, and in the rivers, them shall ye eat. And all that have not fins and scales in the seas, and in the rivers, of all that move in the waters, and of any living thing which is in the waters, they shall be an abomination unto you."
          reference="Leviticus 11:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A two-part test covering an entire category of sea and river life without naming a single
          species.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Leviticus 11:44</h3>
        <VerseQuote
          text="For I am the LORD your God: ye shall therefore sanctify yourselves, and ye shall be holy; for I am holy: neither shall ye defile yourselves with any manner of creeping thing that creepeth upon the earth."
          reference="Leviticus 11:44"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason behind forty-three verses of rules, stated plainly at last, and the exact line
          Peter later quotes for Christians who never kept a single dietary law here.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Leviticus 11:45</h3>
        <VerseQuote
          text="For I am the LORD that bringeth you up out of the land of Egypt, to be your God: ye shall therefore be holy, for I am holy."
          reference="Leviticus 11:45"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The food laws tied directly to a historical rescue, not to a general theory of health or
          hygiene.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Leviticus 11:47</h3>
        <VerseQuote
          text="To make a difference between the unclean and the clean, and between the beast that may be eaten and the beast that may not be eaten."
          reference="Leviticus 11:47"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s own summary of its purpose, handing every Israelite the same skill
          Leviticus 10 named as a priest&apos;s core job.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Leviticus 11
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Leviticus 11 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 11 lists the animals Israel could and could not eat: land animals that chew the
          cud and have a split hoof, water creatures with fins and scales, a named list of forbidden
          birds, an exception for locusts and similar flying creeping things, and detailed rules
          about how touching a dead unclean animal spreads uncleanness to people, clothing, pottery,
          and water.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God forbid eating pork?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 11:7 forbids the pig because it does not chew the cud, failing one half of the
          two-part test for land animals, even though it has a split hoof. The chapter does not give
          a health reason or a hygiene reason directly; it simply states the test and applies it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do rabbits and hares really chew the cud?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not in the technical sense a cow does, with a multi-chambered stomach bringing food back
          up. Leviticus 11:6 describes a visible jaw motion these animals make that looks like cud
          chewing to an observer, which is the kind of everyday observation the text is working
          from, not a modern biological classification.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Are Christians still required to follow these food laws?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Most Christian traditions say no. Jesus taught in Mark 7 that defilement comes from within
          a person, not from food. Peter&apos;s vision in Acts 10 and the apostles&apos; decision in
          Acts 15 moved the early church away from requiring these laws of new believers, and Romans
          14:14 states that no food is unclean in itself. The debate over exactly how Old Testament
          law applies after Christ is a real one, but the specific dietary code of Leviticus 11 is
          not treated as binding by most of the church.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;unclean&quot; mean in Leviticus 11?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It describes a state that made a person unfit to approach the tabernacle or share in holy
          things until it passed, usually by evening or by washing. It is a ceremonial category in
          this chapter, not a claim about disease or physical danger, and the text never says an
          unclean animal would make someone sick.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why are shellfish considered unclean in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 11:9 and 10 require water creatures to have both fins and scales to be clean.
          Shellfish, along with eels and similar creatures, lack one or both features, placing them
          in the same forbidden category without the chapter naming them individually.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What insects could Israelites eat according to Leviticus 11?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 11:21 and 22 allow flying creeping things with jointed legs built for leaping,
          naming the locust, the bald locust, the beetle, and the grasshopper after their kind. This
          is the same food John the Baptist later ate in the wilderness alongside wild honey.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Leviticus 11 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus directly addressed the logic behind this chapter in Mark 7, teaching that nothing
          entering a person from outside can defile them, only what comes from within the heart.
          First Peter 1:15 and 16 also quotes Leviticus 11:44 word for word, applying the call to be
          holy to Christians living under an entirely different covenant.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was Peter&apos;s vision in Acts 10 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Peter saw a sheet full of animals Leviticus 11 called unclean lowered from heaven, with a
          voice telling him to kill and eat. When he objected, the voice answered, &quot;What God hath
          cleansed, that call not thou common.&quot; The vision used this exact chapter&apos;s categories to
          prepare Peter to welcome Gentiles into the church without requiring them to keep
          Israel&apos;s food laws first.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the chapter end by saying &quot;be ye holy, for I am holy&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verses 44 and 45 state the entire reason for the chapter at its close: Israel&apos;s diet was
          meant to be a daily, repeated reminder that the LORD who rescued them from Egypt was holy,
          and expected them to live differently from the nations around them because of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were these food laws about health and hygiene?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Leviticus 11 never states a health reason anywhere in the chapter. Some Bible teachers
          have suggested the animals excluded carried more disease risk in the ancient world, but
          this is an inference drawn from the pattern, not something the text itself claims. The
          reason the chapter actually gives, repeated twice in verses 44 and 45, is holiness, not
          hygiene.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Leviticus 11 looks like a list of animals. It is really a lesson about everyday life.</p>
          <p>
            📌 <strong>Holiness was never meant to live only inside the tabernacle.</strong> The
            same chapter that follows seven chapters of priestly law hands the skill of
            &quot;making a difference&quot; to every Israelite at every meal.
          </p>
          <p>
            📌 <strong>The rules were tied to a rescue, not a theory.</strong> Verse 45 grounds the
            whole chapter in the fact that the LORD had just brought Israel out of Egypt, not in a
            claim about health or danger.
          </p>
          <p>
            📌 <strong>What outlived the specific animals was the call itself.</strong> &quot;Be
            holy, for I am holy&quot; moved straight from a chapter about diet into Peter&apos;s
            letter to Christians who kept none of these rules.
          </p>
          <p>
            You will likely never worry about a hoof or a scale before your next meal. But this
            chapter still asks whether ordinary, repeated choices in your life quietly shape who you
            belong to.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Pick one ordinary habit this week and ask whether it reflects who called you, the same
            question Leviticus 11 asked Israel about something as plain as dinner.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
