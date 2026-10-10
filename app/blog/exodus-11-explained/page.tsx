import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-11-explained", {
  title: "Exodus 11 Explained: The Last Warning Before the Final Plague",
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

export default function ExodusElevenExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-11-explained"
      title={<>📖 Exodus 11 Explained: The Last Warning Before the Final Plague</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Ten chapters of plagues, and only one is left. This one is the worst by far.</p>
            <p>
              <strong>Exodus 11 explained</strong> is a short chapter, only ten verses, but it is
              the hinge the whole book turns on. God tells Moses exactly what is coming at
              midnight, tells Israel to ask Egypt for silver and gold on their way out, and tells
              Pharaoh nothing at all. The warning this time goes straight past the throne room.
            </p>
            <p>Maybe you have watched a warning get ignored right up until the moment it stopped being a warning.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God tell Israel to borrow jewels from the Egyptians right before they leave?</li>
            <li>❓ Why does this plague finally target something nine plagues never touched?</li>
            <li>❓ What does it mean that not a dog will move its tongue against Israel?</li>
            <li>❓ And why does Moses leave Pharaoh in great anger this time?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 11 does not describe a plague happening. It describes one being
              named in full, days before it falls.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the strange instruction to
              ask Egypt for its own gold, the horror coming at midnight, the line drawn between two
              households living side by side, Moses&apos;s anger on his way out of the palace, and
              the verse that explains why none of the last nine chapters ever softened Pharaoh at
              all.
            </p>
            <p>Ten verses, and every one of them is pointed at what happens next.</p>
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
            <ArticleLink href="/blog/exodus-10-explained">Exodus 10</ArticleLink> ended with
            Pharaoh threatening to kill Moses the next time he saw his face, and Moses agreeing to
            exactly that. Nine plagues had already struck Egypt&apos;s water, its dust, its skin,
            its crops, and its sky. Pharaoh had said &quot;I have sinned&quot; twice and hardened
            his heart again both times. The back and forth negotiating that filled chapters 7
            through 10 was over. Whatever came next would not arrive through another meeting in
            that throne room.
          </p>
          <p>
            Exodus 11 opens in the space right after that door closes, with God telling Moses what
            the tenth plague will actually be, and what Israel needs to do before it happens.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 11 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. One More Plague, and a Strange Command to Borrow (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with God speaking to Moses alone, not to Pharaoh.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Yet will I bring one plague more upon Pharaoh, and upon Egypt; afterwards he will let you go hence: when he shall let you go, he shall surely thrust you out hence altogether."
          reference="Exodus 11:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God tells Moses the ending before it happens.</strong> Not &quot;if he lets
            you go.&quot; Pharaoh will let Israel go, and he will not do it reluctantly. He will
            drive them out himself. Nine plagues of stalling are about to end in the opposite of
            stalling.
          </p>
          <p>Then comes an instruction that has nothing to do with plagues at all.</p>
        </div>
        <VerseQuote
          text="Speak now in the ears of the people, and let every man borrow of his neighbour, and every woman of her neighbour, jewels of silver, and jewels of gold."
          reference="Exodus 11:2"
        />
        <VerseQuote
          text="And the LORD gave the people favour in the sight of the Egyptians. Moreover the man Moses was very great in the land of Egypt, in the sight of Pharaoh's servants, and in the sight of the people."
          reference="Exodus 11:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This was not a new idea. God told Moses the exact same thing back at the burning bush,
            long before the first plague ever fell.
          </p>
        </div>
        <VerseQuote
          text="But every woman shall borrow of her neighbour, and of her that sojourneth in her house, jewels of silver, and jewels of gold, and raiment: and ye shall put them upon your sons, and upon your daughters; and ye shall spoil the Egyptians."
          reference="Exodus 3:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Centuries earlier, God had already told{" "}
            <ArticleLink href="/blog/genesis-15-explained">Abraham</ArticleLink> that his
            descendants would leave their four hundred years of slavery &quot;with great
            substance.&quot; Exodus 11 is that promise finally about to cash out, one Egyptian
            neighbor&apos;s jewelry box at a time.
          </p>
          <p>
            📌 <strong>Israel does not sneak out poor. Egypt hands its own wealth over
            willingly.</strong> Verse 3 says plainly that the favor came from the LORD, and that
            Moses himself, the man Pharaoh once refused to even recognize, had become genuinely
            respected across Egypt. The slave nation leaves rich, and the man who demanded their
            freedom leaves honored, not hated, by the ordinary people watching it happen.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Midnight, and the Death That Is Coming (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses turns from God&apos;s instructions to Pharaoh himself, and names the plague in full.</p>
        </div>
        <VerseQuote
          text="And Moses said, Thus saith the LORD, About midnight will I go out into the midst of Egypt:"
          reference="Exodus 11:4"
        />
        <VerseQuote
          text="And all the firstborn in the land of Egypt shall die, from the first born of Pharaoh that sitteth upon his throne, even unto the firstborn of the maidservant that is behind the mill; and all the firstborn of beasts."
          reference="Exodus 11:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nine plagues hit water, animals, crops, skin, and sky. This is the first one that hits
            a person directly, by name of birth order, in every single household in the land.
            Verse 5 spans the entire social ladder on purpose: the king on his throne and a
            servant girl grinding grain at a hand mill both lose the same thing the same night.
            Wealth and rank buy no protection here.
          </p>
          <p>
            This was also not a surprise threat invented in this chapter. God had told Moses to
            warn Pharaoh of exactly this, back before Moses ever returned to Egypt.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt say unto Pharaoh, Thus saith the LORD, Israel is my son, even my firstborn: And I say unto thee, Let my son go, that he may serve me: and if thou refuse to let him go, behold, I will slay thy son, even thy firstborn."
          reference="Exodus 4:22 and 23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Pharaoh had years, really the whole span of chapters 5 through 10, to connect that
            early warning to what is now about to happen at midnight. He never did. Exodus 11 is
            not God changing the terms. It is God following through on terms He stated before the
            confrontation even began.
          </p>
        </div>
        <VerseQuote
          text="And there shall be a great cry throughout all the land of Egypt, such as there was none like it, nor shall be like it any more."
          reference="Exodus 11:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The text does not soften this.</strong> It calls it a cry unlike any before
            or after. Every earlier plague was described by what it destroyed. This one is
            described by the sound it will cause, grief in nearly every Egyptian home on the same
            night.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Not a Dog Will Move Its Tongue (verse 7)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>In the middle of announcing the worst plague yet, Moses draws the sharpest line of the whole book.</p>
        </div>
        <VerseQuote
          text="But against any of the children of Israel shall not a dog move his tongue, against man or beast: that ye may know how that the LORD doth put a difference between the Egyptians and Israel."
          reference="Exodus 11:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Earlier plagues drew their line at a border. Flies and hail stopped at the edge of{" "}
            <ArticleLink href="/blog/exodus-9-explained">Goshen</ArticleLink>, while the rest of
            Egypt suffered. This line runs straight through mixed neighborhoods and shared streets.
            An Egyptian household and a Hebrew household could live right beside each other, and
            one would wake to silence while the other buried a child.
          </p>
          <p>
            📌 <strong>Not even a dog barking marks the difference as small.</strong> It is total.
            Nothing in an Israelite home, not a person, not an animal, is touched by what is about
            to happen one wall over.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Bowing Down, and Moses Walks Out in Great Anger (verse 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses finishes the warning with a prediction about what Pharaoh&apos;s own court will do.</p>
        </div>
        <VerseQuote
          text="And all these thy servants shall come down unto me, and bow down themselves unto me, saying, Get thee out, and all the people that follow thee: and after that I will go out. And he went out from Pharaoh in a great anger."
          reference="Exodus 11:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The man who once begged God not to send him back to Egypt because he could not speak
            well is now the one Pharaoh&apos;s own officials will beg to leave. The reversal is
            complete. The servants who once watched their king negotiate with Moses will soon be
            the ones pleading with Moses to go, and to take everyone with him.
          </p>
          <p>
            📌 <strong>This is the only place in the book where Moses himself is described as
            angry.</strong> Not Pharaoh this time. Moses. After nine plagues of patient returns to
            the palace, delivering God&apos;s exact words every time, he finally walks out burning.
            The text does not explain the anger directly, but it comes right after Pharaoh&apos;s
            death threat at the end of{" "}
            <ArticleLink href="/blog/exodus-10-explained">Exodus 10</ArticleLink>, and right before
            the worst plague Egypt will ever see. A man carrying news this heavy, to a king who
            just threatened to kill him for showing up again, has every reason to leave that room
            differently than he entered every room before it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Why Pharaoh Could Not Hear It (verses 9 and 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes by stepping back and naming the pattern that has run through the whole book so far.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Pharaoh shall not hearken unto you; that my wonders may be multiplied in the land of Egypt."
          reference="Exodus 11:9"
        />
        <VerseQuote
          text="And Moses and Aaron did all these wonders before Pharaoh: and the LORD hardened Pharaoh's heart, so that he would not let the children of Israel go out of his land."
          reference="Exodus 11:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 These two verses are a summary, not a new event. They look back over everything from{" "}
            <ArticleLink href="/blog/exodus-7-explained">Exodus 7</ArticleLink> to this point and
            state plainly why none of it moved Pharaoh. God had already told Moses this would
            happen before Moses ever set foot back in Egypt, warning him plainly that Pharaoh&apos;s
            heart would be hardened against the very wonders meant to convince him.
          </p>
          <p>
            📌 <strong>Nine plagues were never a failed attempt to change Pharaoh&apos;s mind.</strong>{" "}
            Verse 9 says the wonders multiplied for a reason, and the reason was never really
            persuasion. It was display. Egypt, Israel, and everyone who would ever read this book
            afterward needed to see exactly what God had said He would do, happen in full, with
            nothing left out.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 11 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why did God tell Israel to ask the Egyptians for jewels of silver and gold
            right before the final plague?</strong> This instruction goes back to Exodus 3:22,
            long before any plague had fallen, and further back still to the promise God made
            Abraham in Genesis 15:14 that his descendants would leave slavery &quot;with great
            substance.&quot; The text frames it as
            God giving Israel favor in Egypt&apos;s eyes, not as Israel taking anything by force or
            deception. The Egyptians hand the jewelry over willingly.
          </p>
          <p>
            <strong>Why does the tenth plague target firstborn sons and not something else?</strong>{" "}
            Exodus 11 does not explain the choice directly, but Exodus 4:22 and 23 already called
            Israel &quot;my son, even my firstborn&quot; and threatened Egypt&apos;s firstborn in
            response to Pharaoh&apos;s refusal to let that firstborn go. The plague answers
            Pharaoh&apos;s own specific sin, holding his people&apos;s firstborn in bondage, with a
            judgment aimed at the same category he refused to release.
          </p>
          <p>
            <strong>Did God harden Pharaoh&apos;s heart, or did Pharaoh harden it himself?</strong>{" "}
            Verse 10 says the LORD hardened it. Earlier chapters in Exodus also describe Pharaoh
            hardening his own heart, and still others simply say his heart was hardened without
            naming who did it. Exodus never flattens these into one explanation. It holds God&apos;s
            active role and Pharaoh&apos;s own stubborn choice as both true, without picking one
            over the other.
          </p>
          <p>
            <strong>Why does Moses leave in great anger here, when he stayed calm through nine
            earlier plagues?</strong> The text states the anger as a fact in verse 8 without
            explaining its cause. What is clear from the surrounding chapters is the weight of the
            moment: Pharaoh had just threatened Moses with death at the end of Exodus 10, and
            Moses is now carrying news of the worst judgment yet to a king who refuses, every
            time, to listen.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 11
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 11:7</h3>
        <VerseQuote
          text="But against any of the children of Israel shall not a dog move his tongue, against man or beast: that ye may know how that the LORD doth put a difference between the Egyptians and Israel."
          reference="Exodus 11:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The sharpest line drawn in the whole book of plagues, running not along a border but
          straight between neighboring houses on the very same street.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 11:3</h3>
        <VerseQuote
          text="And the LORD gave the people favour in the sight of the Egyptians. Moreover the man Moses was very great in the land of Egypt, in the sight of Pharaoh's servants, and in the sight of the people."
          reference="Exodus 11:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The man who once could not speak well enough to argue with God at the burning bush is
          now the most respected figure in Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 11:5</h3>
        <VerseQuote
          text="And all the firstborn in the land of Egypt shall die, from the first born of Pharaoh that sitteth upon his throne, even unto the firstborn of the maidservant that is behind the mill; and all the firstborn of beasts."
          reference="Exodus 11:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A plague that reaches from the throne to the servant grinding grain, proving that rank
          buys no protection from this one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 11:9</h3>
        <VerseQuote
          text="And the LORD said unto Moses, Pharaoh shall not hearken unto you; that my wonders may be multiplied in the land of Egypt."
          reference="Exodus 11:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A verse that reframes everything before it. The plagues were never a failed attempt to
          change Pharaoh&apos;s mind.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 15:14</h3>
        <VerseQuote
          text="And also that nation, whom they shall serve, will I judge: and afterward shall they come out with great substance."
          reference="Genesis 15:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A promise made to Abraham centuries earlier, finally about to come true in the jewelry
          Israel carries out of Egypt.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 11
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 11?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God tells Moses that one plague remains, and that it will finally end Pharaoh&apos;s
          resistance. Israel is told to ask the Egyptians for jewels of silver and gold before they
          leave. Moses warns Pharaoh that every firstborn in Egypt will die at midnight, that
          Israel will be completely untouched, and walks out of the palace in great anger. The
          chapter closes by explaining that Pharaoh never listened because the LORD hardened his
          heart so the wonders could be multiplied.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the plague in Exodus 11?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 11 announces the tenth and final plague, the death of every firstborn son in
          Egypt, from Pharaoh&apos;s own heir to the firstborn of a servant, along with the
          firstborn of Egypt&apos;s animals. The plague itself does not fall until Exodus 12.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Israel ask the Egyptians for gold and silver?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 11:2 and 3 say the LORD gave Israel favor in Egypt&apos;s eyes, so the Egyptians
          handed over jewelry willingly. This fulfilled a promise God made back in Exodus 3:22 and
          an even older one made to Abraham in Genesis 15:14, that his descendants would leave
          slavery with great wealth.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does this plague target firstborn sons specifically?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 4:22 and 23 already called Israel God&apos;s own firstborn son and warned that
          Egypt&apos;s firstborn would die if Pharaoh refused to let that son go. The tenth plague
          carries out a warning God gave long before the confrontation in Egypt even began.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;not a dog shall move his tongue&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 11:7 uses it to say that nothing in Israel&apos;s homes, not even an animal, would
          be disturbed by the coming plague. It marks a total difference between Egyptian and
          Israelite households living right next to each other, not a difference of distance or
          border.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why was Moses angry when he left Pharaoh in Exodus 11:8?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text states the anger without explaining it. It follows directly after Pharaoh
          threatened to kill Moses at the end of Exodus 10, and comes as Moses delivers the news of
          the worst plague yet to a king who has refused every single warning before it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Exodus 11 say God or Pharaoh hardened Pharaoh&apos;s heart?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 11:10 says the LORD hardened it. Other chapters in Exodus say Pharaoh hardened his
          own heart, and still others simply state that it was hardened. Scripture holds both
          God&apos;s active role and Pharaoh&apos;s own choice as real, without resolving them into
          a single explanation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God&apos;s wonders were &quot;multiplied&quot;?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 11:9 says Pharaoh would not listen specifically so that the wonders could be
          multiplied in Egypt. It reframes the nine plagues already finished as something other
          than a failed attempt at persuasion. The point was always to show, in full, exactly what
          God said He would do.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is Exodus 11 so short compared to the chapters around it?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It functions as a hinge rather than a full scene. It names the plague, gives Israel
          instructions for leaving, and summarizes the pattern of hardening behind every chapter
          since Exodus 7, before Exodus 12 slows down to describe the Passover itself in detail.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 11 connect to the Passover in Exodus 12?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 11 announces the death that is coming. Exodus 12 explains how any household,
          Egyptian or Israelite, could be protected from it through the blood of a lamb on the
          doorframe, the meal that becomes the Passover Christians still trace all the way to the
          cross.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 11 is short, but nothing in it is wasted.</p>
          <p>
            📌 <strong>A warning named in advance is not a threat. It is mercy with a
            deadline.</strong> God told Moses, and told Pharaoh through Moses, exactly what was
            coming before it fell. Nobody in Egypt could say afterward that they had no chance to
            see it.
          </p>
          <p>
            📌 <strong>God keeps old promises on His own timeline, not yours.</strong> The jewelry
            Israel carried out of Egypt was promised to Abraham centuries earlier, in a chapter
            none of these slaves ever read, long before any of them were born.
          </p>
          <p>
            📌 <strong>Even the hardest heart in Scripture was never outside God&apos;s plan.</strong>{" "}
            Verse 9 says Pharaoh&apos;s refusal served a purpose larger than Pharaoh himself, making
            room for wonders the whole world would eventually hear about.
          </p>
          <p>
            You may be living in the space this chapter describes right now, after the warning,
            before the thing it warned about.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask what warning you have already been given plainly, the way Pharaoh was, and whether
            you are using the time before it like Moses did or wasting it the way Pharaoh always
            did.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
