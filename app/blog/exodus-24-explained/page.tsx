import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-24-explained", {
  title: "Exodus 24 Explained: Sealing the Covenant in Blood",
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

export default function ExodusTwentyFourExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-24-explained"
      title={<>📖 Exodus 24 Explained: Sealing the Covenant in Blood</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>The law has been given. Now it has to be signed.</p>
            <p>
              <strong>Exodus 24 explained</strong> is the chapter where Israel stops only hearing God&apos;s
              word and starts under it, sealed by blood thrown on an altar and sprinkled on a whole nation.
              Seventy elders climb partway up a mountain and see something no crowd had ever been allowed to
              see. Then Moses keeps climbing, alone, into a cloud that swallows him for forty days.
            </p>
            <p>Maybe you have read past this chapter on your way to the tabernacle instructions that follow it.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does a covenant need blood thrown on it at all?</li>
            <li>❓ How did the elders see God and not die on the spot?</li>
            <li>❓ Why does Moses write the law down in verse 4 and then go get stone tables in verse 12?</li>
            <li>❓ And why forty days, exactly?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 24 is the hinge between hearing God&apos;s law and belonging to God&apos;s
              covenant, and the hinge turns on blood, a meal, and a mountain nobody is allowed to climb all
              the way.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the tiered invitation up the mountain,
              the people&apos;s second yes, the blood that ratifies the covenant, the vision of God the
              elders are given, and the forty days Moses spends in the cloud above them.
            </p>
            <p>Short chapter. Eighteen verses. More packed into them than almost anything else in Exodus.</p>
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
            <ArticleLink href="/blog/exodus-23-explained">Exodus 23</ArticleLink> closed out the case law
            that began back in <ArticleLink href="/blog/exodus-21-explained">Exodus 21</ArticleLink>, ending
            on a long promise about the Angel who would lead Israel into Canaan and a warning not to make
            any covenant with the nations already living there.
          </p>
          <p>
            Exodus 24 picks up with that same body of law, the Ten Commandments plus the case law of
            chapters 21 through 23, now needing a response. God has spoken. Moses has relayed it. What
            happens next is the moment Israel either walks into this covenant or walks away from it, and the
            chapter answers that question with blood, a meal, and a mountain.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 24 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Called Up the Mountain, But Not All the Way (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with an invitation that is really a set of boundaries.</p>
        </div>
        <VerseQuote
          text="And he said unto Moses, Come up unto the LORD, thou, and Aaron, Nadab, and Abihu, and seventy of the elders of Israel; and worship ye afar off."
          reference="Exodus 24:1"
        />
        <VerseQuote
          text="And Moses alone shall come near the LORD: but they shall not come nigh; neither shall the people go up with him."
          reference="Exodus 24:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Three different distances are set in two verses.</strong> The people stay at the foot
            of the mountain. Aaron, his two sons Nadab and Abihu, and seventy elders go partway up and
            worship from there, afar off. Moses alone comes near. Nobody gets to choose their own distance
            here, and the chapter does not explain why these names were picked over others. It simply states
            the order and moves on.
          </p>
          <p>
            📌 <strong>Nadab and Abihu are named here for the first time in Scripture, and it will not be the
            last.</strong> These same two men show up again in Leviticus 10, where their own careless
            approach to God&apos;s presence costs them their lives. Nothing in Exodus 24 faults them. The
            text simply lists who was invited. What they do with access later is a different story entirely.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The People Say Yes a Second Time (verse 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before any blood is involved, Moses comes back down and reports in full.</p>
        </div>
        <VerseQuote
          text="And Moses came and told the people all the words of the LORD, and all the judgments: and all the people answered with one voice, and said, All the words which the LORD hath said will we do."
          reference="Exodus 24:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>This is the second time Israel says yes to the same covenant.</strong>{" "}
            <ArticleLink href="/blog/exodus-19-explained">Exodus 19</ArticleLink> already recorded the
            people answering with one voice before the Ten Commandments were even spoken. Now, with the
            commandments and the case law both delivered, they say it again, &quot;the words&quot; being the
            Ten Commandments and &quot;the judgments&quot; being the rulings that filled chapters 21 through
            23. A single yes at the start would have been easy to say without fully understanding what it
            cost. Saying it again, after hearing the specifics, carries more weight.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. An Altar, Twelve Pillars, and the Blood of the Covenant (verses 4 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Agreement in words is not where this covenant gets sealed. That happens next, in blood.</p>
        </div>
        <VerseQuote
          text="And Moses wrote all the words of the LORD, and rose up early in the morning, and builded an altar under the hill, and twelve pillars, according to the twelve tribes of Israel."
          reference="Exodus 24:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Moses writes something down here, and it matters what.</strong> This is not yet the
            tables of stone. It is Moses&apos; own record of the Ten Commandments and the case law just given,
            the same body of instruction the next verse calls{" "}
            <ArticleLink href="/blog/exodus-21-explained">the book of the covenant</ArticleLink>. The twelve
            pillars standing beside the altar put each of Israel&apos;s twelve tribes physically present at
            their own covenant, whether every individual Israelite could see the mountain or not.
          </p>
        </div>
        <VerseQuote
          text="And he sent young men of the children of Israel, which offered burnt offerings, and sacrificed peace offerings of oxen unto the LORD."
          reference="Exodus 24:5"
        />
        <VerseQuote
          text="And Moses took half of the blood, and put it in basons; and half of the blood he sprinkled on the altar."
          reference="Exodus 24:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Splitting the blood in half is the whole point.</strong> Half goes on the altar,
            representing God&apos;s side of the agreement. The other half waits in basins for what comes
            next. Ancient covenants between two parties were often sealed this way, the same blood touching
            both sides to bind them together. This was not Israel inventing a ritual. It was Israel entering
            a covenant the way covenants were actually made.
          </p>
        </div>
        <VerseQuote
          text="And he took the book of the covenant, and read in the audience of the people: and they said, All that the LORD hath said will we do, and be obedient."
          reference="Exodus 24:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is the first time Scripture uses the exact phrase &quot;the book of the covenant,&quot;
            naming out loud the written record of everything from the Ten Commandments through the case law
            on servants, restitution, and the stranger. The people&apos;s answer grows too. The first yes in
            verse 3 said they would do it. This yes adds a second word: obedient.
          </p>
        </div>
        <VerseQuote
          text="And Moses took the blood, and sprinkled it on the people, and said, Behold the blood of the covenant, which the LORD hath made with you concerning all these words."
          reference="Exodus 24:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The second half of the blood lands on the people themselves.</strong> Centuries
            later, at the Last Supper, Jesus takes the cup and calls it &quot;my blood of the new
            testament&quot; in Matthew 26:28, the same Greek word behind both &quot;testament&quot; and
            &quot;covenant&quot; that Moses uses here. He is not choosing random language. He is pointing
            straight back to this moment at Sinai, where a covenant was first sealed this same way, and
            announcing that His own blood now does for a new
            covenant what this blood did for the old one.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. They Saw the God of Israel (verses 9 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the covenant sealed, the seventy elders finally go up to the distance they were given.</p>
        </div>
        <VerseQuote text="Then went up Moses, and Aaron, Nadab, and Abihu, and seventy of the elders of Israel:" reference="Exodus 24:9" />
        <VerseQuote
          text="And they saw the God of Israel: and there was under his feet as it were a paved work of a sapphire stone, and as it were the body of heaven in his clearness."
          reference="Exodus 24:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Notice how carefully this verse is worded.</strong> It does not describe God&apos;s
            face or form. It describes what was under His feet, a pavement like clear sapphire, as blue and
            open as the sky itself. Scripture is reaching for a way to describe something it will not fully
            describe, giving the elders, and the reader, an edge of the vision rather than the whole of it.
          </p>
        </div>
        <VerseQuote
          text="And upon the nobles of the children of Israel he laid not his hand: also they saw God, and did eat and drink."
          reference="Exodus 24:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>They saw God, and instead of dying, they ate a meal.</strong> Sharing food after
            sealing a covenant was the ordinary way ancient treaties were confirmed, both sides eating
            together as proof the agreement was real. Here it carries even more weight. The God who had
            just been sealed to Israel by blood now sits, in effect, at the same table with the people He
            bound Himself to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Moses Called Higher Still (verses 12 to 14)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The covenant meal ends, and Moses alone is called even further up than before.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Come up to me into the mount, and be there: and I will give thee tables of stone, and a law, and commandments which I have written; that thou mayest teach them."
          reference="Exodus 24:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>This is a different document than the one Moses wrote in verse 4.</strong> That was
            Moses recording what God had already spoken. These tables of stone are something God Himself
            writes, carried down the mountain later for Israel to keep. The book of the covenant and the
            tables of stone are not the same object told twice. They are two separate steps in how the
            covenant gets permanently recorded.
          </p>
        </div>
        <VerseQuote text="And Moses rose up, and his minister Joshua: and Moses went up into the mount of God." reference="Exodus 24:13" />
        <VerseQuote
          text="And he said unto the elders, Tarry ye here for us, until we come again unto you: and, behold, Aaron and Hur are with you: if any man have any matters to do, let him come unto them."
          reference="Exodus 24:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Moses does not leave the camp without leadership.</strong> Joshua goes with him part
            of the way, the same Joshua who will eventually lead Israel into the promised land. Aaron and
            Hur stay behind in charge, the same pair{" "}
            <ArticleLink href="/blog/exodus-17-explained">who once held up Moses&apos; own hands</ArticleLink>{" "}
            during the battle with Amalek. Whatever disputes come up while Moses is gone, the elders know
            exactly who to bring them to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Cloud, the Fire, and Forty Days (verses 15 to 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends with Moses disappearing into something no one below can follow him into.</p>
        </div>
        <VerseQuote text="And Moses went up into the mount, and a cloud covered the mount." reference="Exodus 24:15" />
        <VerseQuote
          text="And the glory of the LORD abode upon mount Sinai, and the cloud covered it six days: and the seventh day he called unto Moses out of the midst of the cloud."
          reference="Exodus 24:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Moses waits six full days before God even calls him in.</strong> The cloud alone,
            without a voice yet, covers the mountain for nearly a week. Only on the seventh day does God
            call him into it. Even the man who had just eaten in God&apos;s presence does not get to rush
            his own access.
          </p>
        </div>
        <VerseQuote
          text="And the sight of the glory of the LORD was like devouring fire on the top of the mount in the eyes of the children of Israel."
          reference="Exodus 24:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ From below, the people watching see something closer to a wildfire than a cloud, fire that
            devours whatever it touches, sitting on top of the mountain for nearly six weeks straight. There
            is nothing gentle about the image Scripture chooses here.
          </p>
        </div>
        <VerseQuote
          text="And Moses went into the midst of the cloud, and gat him up into the mount: and Moses was in the mount forty days and forty nights."
          reference="Exodus 24:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Forty days and nights shows up again and again in Scripture, and never by accident.</strong>{" "}
            The flood lasted forty days. Israel&apos;s unbelief over the promised land cost them forty years
            in the wilderness. Jesus fasts forty days before His own temptation in Matthew 4. Scripture keeps
            reaching for the same number whenever something has to be tested, prepared, or set apart before
            it is ready. Moses on this mountain is the pattern many of those later moments are measured
            against.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 24 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>How did the elders see God and live, when Exodus 33:20 says no one can see God&apos;s
            face and live?</strong> The two passages are not describing the same thing. Exodus 24:10
            carefully describes what was under God&apos;s feet, not His face or full glory, and later
            Scripture consistently treats seeing God&apos;s unveiled glory as fatal while treating a
            limited, granted vision of His presence as survivable. The elders were given exactly as much
            as they could bear, no more.
          </p>
          <p>
            <strong>Why does Moses write the words of the Lord down in verse 4, and then go get tables of
            stone from God in verse 12?</strong> These are two different records. Verse 4 is Moses writing
            down what God had already spoken through him, the Ten Commandments and the case law of chapters
            21 through 23, later called the book of the covenant. Verses 12 onward describe tables of stone
            that God Himself writes, a separate, permanent copy Moses receives directly rather than
            transcribes.
          </p>
          <p>
            <strong>Why does a covenant need blood at all?</strong> In the ancient world, a covenant between
            two parties was not considered binding on words alone. Blood, from a sacrificed animal, marked
            the agreement as a matter of life and death rather than a casual promise. Hebrews 9:18 to 20
            points directly back to this chapter to make the same point: without blood, this covenant,
            like the one that follows it, was never ratified.
          </p>
          <p>
            <strong>Were Nadab and Abihu already unfit to be invited up the mountain in verse 1?</strong> The
            text gives no hint of that here. They are named simply as Aaron&apos;s sons, included among the
            leaders summoned up. Their failure in Leviticus 10, offering fire God had not commanded, happens
            later and is judged on its own terms. Exodus 24 does not read backward from that event to
            question their presence here.
          </p>
          <p>
            <strong>Why does God make Moses wait six days before calling him into the cloud?</strong> The
            chapter does not explain the delay directly, but the pattern fits everything else in it. Access
            to God here is consistently graduated: the people at the base, the elders partway up, Moses
            near, and even Moses himself waiting on God&apos;s timing rather than his own before going
            further in.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 24
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 24:8</h3>
        <VerseQuote
          text="And Moses took the blood, and sprinkled it on the people, and said, Behold the blood of the covenant, which the LORD hath made with you concerning all these words."
          reference="Exodus 24:8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same covenant sealing language Jesus reaches for over the cup at the Last Supper, pointing
          straight back to this moment while announcing that His own blood now ratifies a new covenant.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 24:7</h3>
        <VerseQuote
          text="And he took the book of the covenant, and read in the audience of the people: and they said, All that the LORD hath said will we do, and be obedient."
          reference="Exodus 24:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first time Scripture names &quot;the book of the covenant&quot; outright, and the moment
          Israel&apos;s yes grows from doing to doing and obeying.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 24:10</h3>
        <VerseQuote
          text="And they saw the God of Israel: and there was under his feet as it were a paved work of a sapphire stone, and as it were the body of heaven in his clearness."
          reference="Exodus 24:10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          One of the most restrained descriptions of a vision of God anywhere in Scripture, giving an
          edge of glory without claiming to capture the whole of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 24:12</h3>
        <VerseQuote
          text="And the LORD said unto Moses, Come up to me into the mount, and be there: and I will give thee tables of stone, and a law, and commandments which I have written; that thou mayest teach them."
          reference="Exodus 24:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The call up to a second, higher level of the mountain, and the first mention of the stone
          tables Moses will carry down later in Exodus.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 24:18</h3>
        <VerseQuote
          text="And Moses went into the midst of the cloud, and gat him up into the mount: and Moses was in the mount forty days and forty nights."
          reference="Exodus 24:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same forty days Scripture keeps returning to, from the flood to Israel&apos;s wilderness
          years to Jesus&apos; own fast, each one a season of testing before something is ready.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 24
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 24?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses, Aaron, Nadab, Abihu, and seventy elders are called partway up Mount Sinai while the people
          stay below. Moses builds an altar, offers sacrifices, and seals the covenant by splitting the
          blood between the altar and the people. The elders then see a vision of God and eat a covenant
          meal, after which Moses alone goes further up the mountain and stays in a cloud for forty days and
          forty nights.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the book of the covenant in Exodus 24?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is Moses&apos; written record of the Ten Commandments and the case law given in Exodus 21
          through 23, read aloud to the people in verse 7 right before the blood of the covenant is
          sprinkled on them.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does the blood of the covenant mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It refers to the blood from the peace offerings in Exodus 24:5 and 6, split in half and used to
          seal the agreement between God and Israel, half on the altar and half sprinkled on the people
          themselves.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 24 connect to the Lord&apos;s Supper?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus calls the cup &quot;my blood of the new testament&quot; in Matthew 26:28, the same word Moses
          uses for &quot;covenant&quot; in Exodus 24:8, directly linking His own sacrifice to the covenant
          sealed at Sinai.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Israel&apos;s elders really see God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 24:10 and 11 say plainly that they did, describing what was under His feet rather than His
          full glory or face, and the nobles were not harmed. The text treats this as a real, granted
          vision rather than a figure of speech.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who were Nadab and Abihu?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Aaron&apos;s two oldest sons, named here among the leaders called up the mountain. They later die
          in Leviticus 10 after offering fire God had not commanded, a separate event this chapter does not
          foreshadow or explain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses stay on the mountain for forty days?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 24:18 states the length without fully explaining it, but the number forty recurs throughout
          Scripture at moments of testing or preparation, including the flood, Israel&apos;s years in the
          wilderness, and Jesus&apos; own forty day fast.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Hur, mentioned in Exodus 24:14?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The same man who helped Aaron hold up Moses&apos; hands during the battle with Amalek in Exodus
          17. Here he is left in charge of the camp alongside Aaron while Moses is on the mountain.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between the book of the covenant and the tables of stone?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The book of the covenant in verse 7 is Moses&apos; own written record of what God had already
          spoken. The tables of stone in verse 12 are a separate document, written by God Himself and given
          to Moses later in the chapters that follow.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 24 connect to the rest of the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Hebrews 9:18 to 20 points back to this chapter to explain why a covenant required blood, and
          Matthew 26:28 echoes Moses&apos; own words over the cup at the Last Supper, tying the blood of
          Sinai directly to the blood of the cross.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 24 is short, but almost every verse in it is doing real work.</p>
          <p>
            📌 <strong>Access to God here is never flat.</strong> The people stay at the base, the elders
            go partway, Moses goes near, and Moses alone goes further still, waiting even then for God&apos;s
            own timing before the cloud opens to him.
          </p>
          <p>
            📌 <strong>A covenant said with words still had to be sealed with blood.</strong> Israel said yes
            twice before any blood touched them, and neither yes alone was treated as enough to bind the
            agreement. The sprinkled blood is what made it final, the same covenant language Jesus later
            reaches for over the cup to describe what His own blood would do.
          </p>
          <p>
            📌 <strong>The vision and the waiting both matter.</strong> The elders are given a real, limited
            glimpse of God and a shared meal in His presence. Moses is given far more access and far more
            waiting, six days of silence before God even calls him by name into the cloud.
          </p>
          <p>
            You probably will not see a paved sapphire floor this week, and you will not wait forty days on
            a mountain either.
          </p>
          <p>
            But you have made promises to God before, the way Israel did twice in this chapter. Go back to
            one of them today, and ask whether your life has actually been sealed to it, or only spoken.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
