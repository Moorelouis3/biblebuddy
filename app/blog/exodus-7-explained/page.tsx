import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-7-explained", {
  title: "Exodus 7 Explained: Serpents, Blood, and a Hardened Heart",
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

export default function ExodusSevenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-7-explained"
      title={<>📖 Exodus 7 Explained: Serpents, Blood, and a Hardened Heart</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A staff hits the ground. A river turns red. And Pharaoh still will not bend.</p>
            <p>
              <strong>Exodus 7 explained</strong> is the chapter where the long argument at the
              burning bush finally turns into action. Moses and Aaron stand in front of Pharaoh for
              the first real confrontation of the book, carrying nothing but a shepherd&apos;s rod
              and a message Pharaoh has already dismissed once.
            </p>
            <p>Maybe you have done everything right and still watched nothing change.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ What does it mean that God made Moses &quot;a god&quot; to Pharaoh?</li>
            <li>❓ Why can Pharaoh&apos;s own magicians copy a miracle?</li>
            <li>❓ Why does Aaron&apos;s rod swallowing theirs not change Pharaoh&apos;s mind?</li>
            <li>❓ And why does God say He will harden the very heart that keeps refusing Him?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>This chapter is not really about who can perform the better sign. It is
              about what evidence can and cannot do to a heart that has already decided not to
              listen.</strong>
            </p>
            <p>
              This walkthrough goes through Exodus 7 in order: God&apos;s new title for Moses, the
              ages of the two brothers who finally walk into Pharaoh&apos;s court, the sign of the
              serpent repeated in public, the first plague turning the Nile to blood, and the
              magicians who can copy a miracle but never undo one.
            </p>
            <p>Watch how much proof it takes to move a heart that does not want to move.</p>
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
            <ArticleLink href="/blog/exodus-6-explained">Exodus 6</ArticleLink> answered
            Moses&apos;s raw accusation from the end of Exodus 5 with a covenant renewed and a name
            revealed in full, JEHOVAH, backed by seven stacked promises. Moses delivered that
            message, and the people were too worn down by cruel bondage to receive it. God sent him
            back to Pharaoh anyway, and Moses raised the same objection twice, calling himself a man
            &quot;of uncircumcised lips.&quot; A genealogy then traced Moses and Aaron three
            generations back through Levi, establishing exactly who these two men were before
            either of them ever stood in front of a king.
          </p>
          <p>
            Exodus 6 ended with that objection still hanging, unanswered. Exodus 7 opens as
            God&apos;s direct reply, and it is not a reply made of words alone.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 7 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. God Makes Moses &quot;a God&quot; to Pharaoh (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God answers Moses&apos;s objection about his own unfit speech with a title, not a correction.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, See, I have made thee a god to Pharaoh: and Aaron thy brother shall be thy prophet."
          reference="Exodus 7:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God does not promise Moses will suddenly speak well enough. He says Moses
            will stand to Pharaoh the way God Himself stands to Moses.</strong> Aaron becomes the
            prophet who carries that word to Pharaoh&apos;s ears, exactly the arrangement God set up
            back in <ArticleLink href="/blog/exodus-4-explained">Exodus 4</ArticleLink> when Moses
            first complained about his own speech.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt speak all that I command thee: and Aaron thy brother shall speak unto Pharaoh, that he send the children of Israel out of his land."
          reference="Exodus 7:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The plan is laid out before anything happens, including the hardest part of it.</p>
        </div>
        <VerseQuote
          text="And I will harden Pharaoh's heart, and multiply my signs and my wonders in the land of Egypt."
          reference="Exodus 7:3"
        />
        <VerseQuote
          text="But Pharaoh shall not hearken unto you, that I may lay my hand upon Egypt, and bring forth mine armies, and my people the children of Israel, out of the land of Egypt by great judgments."
          reference="Exodus 7:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ God tells Moses in advance that this will not go smoothly, and that the resistance
            itself is part of how the judgments will multiply. He is not promising an easy case. He
            is naming exactly how hard it will be, before the first word is ever spoken to Pharaoh.
          </p>
          <p>Then comes the actual point of all of it, stated plainly.</p>
        </div>
        <VerseQuote
          text="And the Egyptians shall know that I am the LORD, when I stretch forth mine hand upon Egypt, and bring out the children of Israel from among them."
          reference="Exodus 7:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The goal was never only Israel&apos;s freedom. It was Egypt knowing exactly who the
            LORD is, the same phrase that framed the seven promises of{" "}
            <ArticleLink href="/blog/exodus-6-explained">Exodus 6</ArticleLink>.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Two Old Men, Fourscore Years in the Making (verses 6 and 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before the confrontation begins, the text pauses on two plain facts.</p>
        </div>
        <VerseQuote
          text="And Moses and Aaron did as the LORD commanded them, so did they. And Moses was fourscore years old, and Aaron fourscore and three years old, when they spake unto Pharaoh."
          reference="Exodus 7:6 and 7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Fourscore means eighty. Moses is eighty years old walking into the biggest
            confrontation of his life, and Aaron is eighty three.</strong> Neither man is a young,
            ambitious hero. Both are near the far end of an ordinary lifespan, with decades spent
            tending sheep and raising a family rather than preparing for a throne room.
          </p>
          <p>
            Whatever qualifies <ArticleLink href="/blog/moses">Moses</ArticleLink> for this moment,
            it is not youth, confidence, or a lifetime of training for exactly this. It is only the
            fact that God sent him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Sign of the Serpent, in Public This Time (verses 8 to 13)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God gives Moses and Aaron a script before they ever reach the palace.</p>
        </div>
        <VerseQuote
          text="When Pharaoh shall speak unto you, saying, Shew a miracle for you: then thou shalt say unto Aaron, Take thy rod, and cast it before Pharaoh, and it shall become a serpent."
          reference="Exodus 7:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the same sign Moses first received alone at the burning bush in{" "}
            <ArticleLink href="/blog/exodus-4-explained">Exodus 4</ArticleLink>, where he ran from
            his own staff before God told him to pick it back up. Here it happens in front of a king
            instead of in an empty wilderness.
          </p>
        </div>
        <VerseQuote
          text="And Moses and Aaron went in unto Pharaoh, and they did so as the LORD had commanded: and Aaron cast down his rod before Pharaoh, and before his servants, and it became a serpent."
          reference="Exodus 7:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Pharaoh&apos;s answer is not fear. It is a competition.</p>
        </div>
        <VerseQuote
          text="Then Pharaoh also called the wise men and the sorcerers: now the magicians of Egypt, they also did in like manner with their enchantments."
          reference="Exodus 7:11"
        />
        <VerseQuote
          text="For they cast down every man his rod, and they became serpents: but Aaron's rod swallowed up their rods."
          reference="Exodus 7:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Egypt&apos;s own magicians can apparently do the same trick, and the text
            does not pretend otherwise.</strong> What settles the contest is not that Aaron
            performed a sign no one else could copy. It is that Aaron&apos;s rod swallowed theirs.
            A serpent that showed up the same way everywhere else in Egypt now disappears into the
            one sign God sent.
          </p>
          <p>
            ⚠️ The same serpent that opened{" "}
            <ArticleLink href="/blog/genesis-3-explained">the story of sin in Genesis 3</ArticleLink>{" "}
            shows up again here, this time only as a sign of power that answers to God alone, with
            no voice of temptation attached to it at all.
          </p>
        </div>
        <VerseQuote
          text="And he hardened Pharaoh's heart, that he hearkened not unto them; as the LORD had said."
          reference="Exodus 7:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verse 3 said this would happen. Verse 13 records that it did, in exactly the order God
            told Moses to expect.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The First Plague: the River Becomes Blood (verses 14 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not wait long after the first sign fails to move Pharaoh.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Pharaoh's heart is hardened, he refuseth to let the people go."
          reference="Exodus 7:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The next sign is not a private trick for a palace audience. It is aimed at the one
            thing all of Egypt depends on.
          </p>
        </div>
        <VerseQuote
          text="Thus saith the LORD, In this thou shalt know that I am the LORD: behold, I will smite with the rod that is in mine hand upon the waters which are in the river, and they shall be turned to blood."
          reference="Exodus 7:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The Nile was Egypt&apos;s water supply, its food source through fish, and a center of
            worship for more than one Egyptian god. Striking it was not a random miracle picked out
            of many options. It struck the exact thing Egypt trusted most for its own life.
          </p>
        </div>
        <VerseQuote
          text="And Moses and Aaron did so, as the LORD commanded; and he lifted up the rod, and smote the waters that were in the river, in the sight of Pharaoh, and in the sight of his servants; and all the waters that were in the river were turned to blood."
          reference="Exodus 7:20"
        />
        <VerseQuote
          text="And the fish that was in the river died; and the river stank, and the Egyptians could not drink of the water of the river; and there was blood throughout all the land of Egypt."
          reference="Exodus 7:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Every fish died, the water itself became unusable, and the smell alone would have
            made the disaster impossible to ignore. This did not happen somewhere out of sight. It
            touched every household in Egypt that depended on that one river.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Magicians Copy It Again, and Pharaoh Still Does Not Bend (verses 22 to 25)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Egypt&apos;s wise men answer the second sign exactly the way they answered the first.</p>
        </div>
        <VerseQuote
          text="And the magicians of Egypt did so with their enchantments: and Pharaoh's heart was hardened, neither did he hearken unto them; as the LORD had said."
          reference="Exodus 7:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what the magicians never do. They can apparently turn more water to
            blood. They cannot turn the blood back to water.</strong> Egypt already has a water
            crisis, and its own wise men respond by multiplying the damage rather than fixing
            anything. Copying a disaster is not the same as answering one.
          </p>
        </div>
        <VerseQuote
          text="And Pharaoh turned and went into his house, neither did he set his heart to this also."
          reference="Exodus 7:23"
        />
        <VerseQuote
          text="And all the Egyptians digged round about the river for water to drink; for they could not drink of the water of the river."
          reference="Exodus 7:24"
        />
        <VerseQuote
          text="And seven days were fulfilled, after that the LORD had smitten the river."
          reference="Exodus 7:25"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 A full week passes with the whole nation digging into the ground for drinkable water,
            and the chapter ends right there, on that number. Pharaoh does not reverse course. He
            simply waits it out, calm inside his own house, while the next plague is already waiting
            on the other side of those seven days.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 7 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What does it mean that God made Moses &quot;a god&quot; to Pharaoh?</strong>{" "}
            Exodus 7:1 is not claiming Moses became divine. The same Hebrew word rendered
            &quot;god&quot; here is used elsewhere in the Old Testament for human judges and
            authorities carrying real delegated power on God&apos;s behalf. Moses would stand to
            Pharaoh the way God stands to Moses, as the source of the command, with Aaron relaying
            it exactly the way a prophet relays God&apos;s own words.
          </p>
          <p>
            <strong>Did God take away Pharaoh&apos;s own choice by hardening his heart?</strong>{" "}
            Exodus 7:3 states plainly that God will harden it. The chapter never shows Pharaoh
            resisting against his will, either. He calls his own magicians into a direct contest,
            watches them lose it, and still turns calmly back to his house. Scripture lays both
            truths side by side across the book rather than resolving the tension: God&apos;s
            stated intention and Pharaoh&apos;s own unforced stubbornness are both treated as real,
            not as a contradiction that needs explaining away.
          </p>
          <p>
            <strong>Were the Egyptian magicians doing real miracles, or tricks?</strong> The text
            calls what they did &quot;enchantments,&quot; the same word used elsewhere in the Old
            Testament for occult practice, and never explains the mechanism behind it. What the
            chapter is confident about is the limit of it. Whatever power or skill the magicians
            had, it could copy a sign but never reverse one, and that same power fails them
            completely once the plagues move further.
          </p>
          <p>
            <strong>If the magicians could copy the sign, why did it still prove anything?</strong>{" "}
            Exodus 7:12 answers this inside the text itself: Aaron&apos;s rod swallowed theirs. The
            proof was never going to be who could perform a wonder first. It was which power
            overtook the other once both were placed side by side in the same room.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Exodus 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 7:1</h3>
        <VerseQuote
          text="And the LORD said unto Moses, See, I have made thee a god to Pharaoh: and Aaron thy brother shall be thy prophet."
          reference="Exodus 7:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God answers Moses&apos;s fear about his own unfit speech not by fixing his tongue, but by
          giving him a position that never depended on eloquence in the first place.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 7:3</h3>
        <VerseQuote
          text="And I will harden Pharaoh's heart, and multiply my signs and my wonders in the land of Egypt."
          reference="Exodus 7:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God names the hardest part of the mission before Moses ever faces it, refusing to let
          Pharaoh&apos;s resistance come as a surprise later.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 7:12</h3>
        <VerseQuote
          text="For they cast down every man his rod, and they became serpents: but Aaron's rod swallowed up their rods."
          reference="Exodus 7:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Egypt&apos;s magicians can copy the sign. They cannot survive being placed next to it,
          which is the entire point of the contest.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 7:17</h3>
        <VerseQuote
          text="Thus saith the LORD, In this thou shalt know that I am the LORD: behold, I will smite with the rod that is in mine hand upon the waters which are in the river, and they shall be turned to blood."
          reference="Exodus 7:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The first plague strikes the one resource all of Egypt depended on for food, water, and
          worship, named in advance so that no one can call it a coincidence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 7:5</h3>
        <VerseQuote
          text="And the Egyptians shall know that I am the LORD, when I stretch forth mine hand upon Egypt, and bring out the children of Israel from among them."
          reference="Exodus 7:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The real goal of every plague that follows was never only rescue. It was an entire nation
          learning exactly who the LORD is.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 7
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 7?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God tells Moses He has made him &quot;a god&quot; to Pharaoh with Aaron as his prophet,
          then sends the two eighty year old brothers into Pharaoh&apos;s court. Aaron&apos;s rod
          becomes a serpent and swallows the serpents made by Pharaoh&apos;s own magicians, but
          Pharaoh&apos;s heart stays hardened. God then strikes the Nile, turning it to blood, which
          the magicians also copy, and the chapter ends with Egypt digging for water for seven days.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God made Moses &quot;a god&quot; to Pharaoh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7:1 is describing delegated authority, not divinity. Moses would carry God&apos;s
          own commands to Pharaoh the same way God&apos;s words come to Moses, with Aaron serving as
          the prophet who speaks that word out loud.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How old were Moses and Aaron when they confronted Pharaoh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7:7 gives their exact ages: Moses was eighty years old, and Aaron was eighty three.
          Both men were near the end of an ordinary lifespan, not young men beginning a career.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Aaron&apos;s rod swallow the magicians&apos; rods?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7:12 records it as the detail that settled the contest. The magicians could produce
          the same sign, but Aaron&apos;s rod overtook theirs, showing which power was actually
          greater rather than only which one could be copied.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the Egyptian magicians using real power or tricks?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7:11 and 22 call it &quot;enchantments&quot; without explaining the mechanism
          behind it. The text focuses less on what the magicians could do and more on what they
          could not: reverse a single sign they imitated.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God say He would harden Pharaoh&apos;s heart?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7:3 states it plainly as part of the plan, and later verses in the chapter show
          Pharaoh making his own calm, unforced choices at the same time. Scripture holds both
          God&apos;s stated intention and Pharaoh&apos;s own stubbornness as true together.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the first plague turn the Nile to blood specifically?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7:17 and 18 target the river Egypt depended on for drinking water, fish, and
          religious life. Striking it hit the exact resource the nation trusted most, rather than a
          smaller or less central target.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did the plague of blood affect the Israelites too?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7 does not say the Israelites were spared this particular plague, unlike some later
          ones. The chapter describes the disaster covering &quot;all the land of Egypt&quot; without
          drawing a line excluding Goshen here.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Pharaoh believe even after watching Aaron&apos;s rod swallow the other rods?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 7:13 says simply that his heart was hardened and he would not listen, exactly as
          God had already told Moses to expect in verse 3. The chapter treats this as the planned
          pattern for the whole confrontation, not a one time failure to notice the evidence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 7 connect to the rest of the plagues?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It sets the shape every plague after it will follow: a sign, a refusal, a result the
          magicians can imitate but not reverse, and a heart that stays hardened anyway. The seven
          days at the end of this chapter also mark the rhythm the rest of the plagues will keep.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 7 is the chapter where talking is finally over and proof starts arriving, and the proof still does not win by itself.</p>
          <p>
            📌 <strong>God names the hardest part of the fight before it even starts.</strong> He
            told Moses in advance that Pharaoh would refuse and that the refusal itself was part of
            the plan, so nothing that happens in this chapter catches God off guard.
          </p>
          <p>
            📌 <strong>A copied miracle is not the same as an equal power.</strong> Pharaoh&apos;s
            magicians could reproduce a serpent and reproduce blood, but they could never undo
            either one. Imitation has a ceiling that the real thing does not.
          </p>
          <p>
            📌 <strong>Evidence alone does not change a heart that has already decided.</strong>{" "}
            Pharaoh watched his own experts lose a direct contest and still walked calmly back into
            his house. Proof convinces an open mind. It rarely moves a closed one by itself.
          </p>
          <p>
            You may be waiting on evidence to finally be enough for someone you love, the way Moses
            might have hoped one sign would be enough for Pharaoh.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Keep doing what God actually told you to do, the way Moses kept returning to Pharaoh,
            and let the hardened heart you cannot control stay God&apos;s problem instead of yours.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
