import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-20-explained", {
  title: "Exodus 20 Explained: The Ten Commandments at Sinai",
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

export default function ExodusTwentyExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-20-explained"
      title={<>📖 Exodus 20 Explained: The Ten Commandments at Sinai</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Three days of washing clothes, drawing boundary lines, and waiting. Then the mountain catches fire, and a voice speaks out of it.</p>
            <p>
              <strong>Exodus 20 explained</strong> is the chapter everyone already knows a little of,
              even people who have never opened a Bible. These are the Ten Commandments, spoken
              directly to an entire trembling nation at the base of a smoking mountain, not handed
              down quietly to one man in private.
            </p>
            <p>Maybe you have heard these ten lines quoted your whole life without ever reading what sits around them.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God introduce Himself before He commands anything?</li>
            <li>❓ Does &quot;thou shalt not kill&quot; outlaw war and capital punishment too?</li>
            <li>❓ Why is honoring your parents the only commandment with a promise attached?</li>
            <li>❓ And why does the chapter end with rules about building an altar?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Every one of these ten commands grows out of the same sentence God speaks
              first: a reminder of what He already did, before He asks anything at all.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the preamble, the four
              commands about God, the hinge command about parents, the five commands about your
              neighbor, Israel&apos;s terrified request for a mediator, and the surprisingly simple
              instructions for building an altar that close out the chapter.
            </p>
            <p>Read slowly. You already know these words. This chapter asks you to actually hear them.</p>
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
            <ArticleLink href="/blog/exodus-19-explained">Exodus 19</ArticleLink> ended with Israel
            camped at the base of Sinai, having already said yes to a covenant before hearing a
            single term of it. God told Moses to sanctify the people for three days: wash their
            clothes, set a boundary around the mountain that nothing may cross, and get ready to
            meet Him. On the third morning, thunder and lightning broke over a mountain wrapped in
            thick smoke, the whole camp trembled at the sound of a trumpet, and Moses climbed up and
            down that slope one final time carrying a last warning from God before anything was
            spoken aloud.
          </p>
          <p>
            Exodus 20 opens right there, at the exact moment the voice everyone has been bracing for
            actually speaks. Nothing moves the camp forward in this chapter. It simply records what
            God says, word for word, to a whole nation standing at the foot of the fire.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 20 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Preamble: Rescue Before Rules (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Before a single command, God says who is speaking and what He has already done.</p>
        </div>
        <VerseQuote text="And God spake all these words, saying," reference="Exodus 20:1" />
        <VerseQuote
          text="I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage."
          reference="Exodus 20:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what comes before every command: an identity, and a rescue already
            finished.</strong> God does not open by saying what Israel owes Him. He opens by saying
            what He already did for them. Everything that follows in this chapter is not the price
            of being rescued. It is what a rescued people now get to live like.
          </p>
          <p>
            This is the same order <ArticleLink href="/blog/exodus-19-explained">Exodus 19</ArticleLink>{" "}
            already set up: rescue first, relationship second, and only now, instructions third. The
            Ten Commandments are not a ladder Israel climbs to earn the exodus. The exodus already
            happened.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. No Other Gods, No Graven Images (verses 3 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The first two commands are easy to blur together, but the text keeps them separate on purpose.</p>
        </div>
        <VerseQuote text="Thou shalt have no other gods before me." reference="Exodus 20:3" />
        <VerseQuote
          text="Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth: Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me;"
          reference="Exodus 20:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The first command names <strong>who</strong> may be worshipped. The second names{" "}
            <strong>how</strong> that worship may not happen. Having no other gods and refusing to
            carve one down into a statue are two different failures, which is why the text spells out
            both instead of folding them into one line. The same book later has God instruct Moses to
            make golden cherubim for the ark, so this was never a ban on images in general. It is a
            ban on bowing down to one.
          </p>
          <p>
            <strong>Jealous</strong> here is marriage language, not pettiness. A husband jealous for
            his wife is not insecure, he is protecting something exclusive. God uses the same word for
            Himself, because the relationship just offered in Exodus 19 is covenant language, closer
            to a marriage than a business contract.
          </p>
        </div>
        <VerseQuote
          text="And shewing mercy unto thousands of them that love me, and keep my commandments."
          reference="Exodus 20:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Verse 6 is easy to skip past, but it is the other half of verse 5.</strong> The
            same sentence that warns about consequences reaching to the third and fourth generation
            also promises mercy to thousands of generations of those who love God. The warning is
            real. The mercy is bigger.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Name, and the Sabbath (verses 7 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The third and fourth commands both protect something easy to treat casually: God&apos;s name, and God&apos;s rest.</p>
        </div>
        <VerseQuote
          text="Thou shalt not take the name of the LORD thy God in vain; for the LORD will not hold him guiltless that taketh his name in vain."
          reference="Exodus 20:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;In vain&quot; means empty, hollow, without weight behind it. This covers more
            than a curse word. Swearing a false oath in God&apos;s name, invoking Him to back up a lie,
            or claiming to speak for Him carelessly all empty the name out the same way. The command
            protects the weight of who God is from being used as a prop.
          </p>
        </div>
        <VerseQuote
          text="Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates:"
          reference="Exodus 20:8 to 10"
        />
        <VerseQuote
          text="For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it."
          reference="Exodus 20:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This commandment names seven different kinds of people and animals who all get
            the same rest: the head of the house, his children, his servants, and even his
            livestock.</strong> In a world where rest was a privilege of the powerful, this rule
            protected the weakest member of a household just as strongly as the one giving the orders.
          </p>
          <p>
            Exodus 20 grounds the sabbath in creation itself, the same seventh day rest{" "}
            <ArticleLink href="/blog/genesis-2-explained">Genesis 2</ArticleLink> already described
            God taking after making the world. Rest is not a modern invention for burned out people.
            It was built into the calendar before the fall ever happened.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Honor Your Father and Mother (verse 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One short verse marks the hinge of the whole chapter.</p>
        </div>
        <VerseQuote
          text="Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee."
          reference="Exodus 20:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the only one of the ten commands that comes with a stated promise
            attached to it.</strong> The first four commands are all about God directly. The next five,
            starting right after this one, are all about how Israel treats other people. Honoring
            parents sits at the exact seam between the two, the first relationship most people ever
            learn before they learn any other.
          </p>
          <p>
            💡 <strong>Honour</strong> carries weight, not just courtesy. It is the same root used
            elsewhere for giving someone their due respect and value. A command about love of God
            moving straight into a command about love of parents is not an accident of ordering.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Five Short Commands About Your Neighbor (verses 13 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From here, every command is short, direct, and aimed at how Israel treats the person standing next to them.</p>
        </div>
        <VerseQuote text="Thou shalt not kill." reference="Exodus 20:13" />
        <VerseQuote text="Thou shalt not commit adultery." reference="Exodus 20:14" />
        <VerseQuote text="Thou shalt not steal." reference="Exodus 20:15" />
        <VerseQuote text="Thou shalt not bear false witness against thy neighbour." reference="Exodus 20:16" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>&quot;Kill&quot; in verse 13 translates a specific Hebrew word that means
            unlawful killing, closer to murder than death in general.</strong> The same law that gives
            this command elsewhere permits killing in self defense, in war, and as a legal penalty for
            certain crimes, which only makes sense if the word here is narrower than taking any life
            under any circumstance. Many modern translations render it &quot;murder&quot; for exactly
            this reason.
          </p>
          <p>
            Four commands, four short sentences, no exceptions listed and none needed. Then the fifth
            one in this group changes shape entirely.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt not covet thy neighbour’s house, thou shalt not covet thy neighbour’s wife, nor his manservant, nor his maidservant, nor his ox, nor his ass, nor any thing that is thy neighbour’s."
          reference="Exodus 20:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every other command in this chapter can be broken by an action a witness could
            see. Coveting can be broken while sitting perfectly still.</strong> No court on earth could
            prosecute it, because it never leaves the heart until it does. The last commandment quietly
            reveals what the other nine were already about: this law was never only interested in
            behavior. It was always aimed at what is underneath the behavior.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Fear at the Foot of the Mountain (verses 18 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The voice stops, and the camp&apos;s reaction is immediate.</p>
        </div>
        <VerseQuote
          text="And all the people saw the thunderings, and the lightnings, and the noise of the trumpet, and the mountain smoking: and when the people saw it, they removed, and stood afar off."
          reference="Exodus 20:18"
        />
        <VerseQuote
          text="And they said unto Moses, Speak thou with us, and we will hear: but let not God speak with us, lest we die."
          reference="Exodus 20:19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Israel does not ask to leave. They ask for a go between.</strong> They just heard
            God Himself speak the Ten Commandments directly to them, and their request is not to be
            released from the relationship, only to receive the rest of it secondhand, through{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink>, rather than face God&apos;s direct
            voice again.
          </p>
        </div>
        <VerseQuote
          text="And Moses said unto the people, Fear not: for God is come to prove you, and that his fear may be before your faces, that ye sin not."
          reference="Exodus 20:20"
        />
        <VerseQuote
          text="And the people stood afar off, and Moses drew near unto the thick darkness where God was."
          reference="Exodus 20:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Moses tells them not to be afraid, and then immediately explains why some fear is
            exactly the point: a healthy fear of God is what keeps a person from sinning casually.
            Then Moses does the one thing the people just asked for. He walks toward the darkness
            they are backing away from.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Instructions for an Altar (verses 22 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with God speaking to Moses again, this time about how Israel is to worship Him going forward.</p>
        </div>
        <VerseQuote
          text="And the LORD said unto Moses, Thus thou shalt say unto the children of Israel, Ye have seen that I have talked with you from heaven."
          reference="Exodus 20:22"
        />
        <VerseQuote
          text="Ye shall not make with me gods of silver, neither shall ye make unto you gods of gold."
          reference="Exodus 20:23"
        />
        <VerseQuote
          text="An altar of earth thou shalt make unto me, and shalt sacrifice thereon thy burnt offerings, and thy peace offerings, thy sheep, and thine oxen: in all places where I record my name I will come unto thee, and I will bless thee."
          reference="Exodus 20:24"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>An altar of plain earth is about as far from an impressive monument as it gets.</strong>{" "}
            This is the first time God tells Israel exactly how to build a place of sacrifice since{" "}
            <ArticleLink href="/blog/exodus-18-explained">Jethro offered his own burnt offering
            at this same mountain</ArticleLink> back in Exodus 18. The instruction here keeps worship
            available to anyone with dirt under their feet, not reserved for whoever can afford
            something elaborate.
          </p>
        </div>
        <VerseQuote
          text="And if thou wilt make me an altar of stone, thou shalt not build it of hewn stone: for if thou lift up thy tool upon it, thou hast polluted it."
          reference="Exodus 20:25"
        />
        <VerseQuote
          text="Neither shalt thou go up by steps unto mine altar, that thy nakedness be not discovered thereon."
          reference="Exodus 20:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Even the stone version of this altar cannot be shaped by human tools.</strong>{" "}
            The point is not that cut stone is magically worse than rough stone. It is that nothing
            about approaching God is supposed to showcase human skill or craftsmanship. The steps rule
            guards something simpler: a long robe climbing a flight of stairs could expose the
            worshipper, and this altar was never meant to put anyone on display.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 20 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why do different churches number the Ten Commandments differently?</strong> Exodus
            20 itself never numbers them. Jewish tradition counts &quot;I am the LORD thy God&quot; in
            verse 2 as the first saying and combines the next two verses as the second. Catholic and
            Lutheran tradition combines no other gods and no graven images into one command, then
            splits coveting a neighbor&apos;s wife from coveting a neighbor&apos;s property into two.
            Most other Protestant and Orthodox traditions separate verse 3 and verses 4 to 6 into two
            commands and combine all of verse 17 into one. All three traditions are counting the exact
            same words. They are only dividing them differently.
          </p>
          <p>
            <strong>Does &quot;thou shalt not kill&quot; forbid war and capital punishment, which the
            law allows elsewhere?</strong> The Hebrew word behind verse 13 is a specific, narrower term
            for unlawful killing, not the general word for ending a life. The same book that records
            this command also records God permitting killing in war and prescribing death as a
            penalty for certain crimes, which only holds together if verse 13 was never meant to cover
            every kind of killing. This is why many modern translations render the word
            &quot;murder.&quot;
          </p>
          <p>
            <strong>Does Exodus 20:5 mean children are punished for their parents&apos; sins?</strong>{" "}
            The verse says God visits iniquity &quot;upon the children,&quot; which can sound that way
            on its own. Ezekiel later states the opposite directly: the son does not bear the
            father&apos;s guilt, and the soul that sins is the one that dies for it. Most careful
            readers hold both together by reading Exodus 20:5 as describing the real, natural
            consequences of a household&apos;s idolatry, habits and patterns of sin passing down
            through generations, rather than God assigning legal guilt for a parent&apos;s choice onto
            a child who never made it.
          </p>
          <p>
            <strong>Is the sabbath commandment still required for Christians today?</strong>{" "}
            Christians genuinely disagree here. Some hold that the fourth commandment still requires
            setting apart the seventh day specifically. Others hold that the church moved its day of
            rest and worship to Sunday, the day of the resurrection. Others hold that the sabbath was
            part of the law&apos;s shadow, now fulfilled in Christ, so no single day is commanded under
            the New Testament. Exodus 20 itself only states the original command, tied to creation.
            Working out its application to a believer today is a question the text leaves to the rest
            of Scripture.
          </p>
          <p>
            <strong>Why did Israel ask for a mediator instead of wanting to hear God directly
            again?</strong> Verse 19 gives their own stated reason: fear of dying. They had just
            watched a mountain shake, smoke, and burn while a voice spoke out of it, and concluded
            that hearing it again themselves was more than they could survive. The request was not
            rebellion. It was an honest admission of how overwhelming the encounter actually was.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 20:2 and 3</h3>
        <VerseQuote
          text="I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage. Thou shalt have no other gods before me."
          reference="Exodus 20:2 and 3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Every command in the chapter grows out of this one. God names Himself and what He already
          did before He asks anything of anyone.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 20:12</h3>
        <VerseQuote
          text="Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee."
          reference="Exodus 20:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The only one of the ten commands with a promise built into it, sitting right at the hinge
          between loving God and loving other people.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 20:17</h3>
        <VerseQuote
          text="Thou shalt not covet thy neighbour’s house, thou shalt not covet thy neighbour’s wife, nor his manservant, nor his maidservant, nor his ox, nor his ass, nor any thing that is thy neighbour’s."
          reference="Exodus 20:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The one command no court could ever prosecute, because it is broken entirely on the inside.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Matthew 22:37 to 39</h3>
        <VerseQuote
          text="Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment. And the second is like unto it, Thou shalt love thy neighbour as thyself."
          reference="Matthew 22:37 to 39"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The same two part shape as Exodus 20, commands about God first and commands about neighbor
          second, compressed by Jesus into two sentences.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Romans 13:9 and 10</h3>
        <VerseQuote
          text="For this, Thou shalt not commit adultery, Thou shalt not kill, Thou shalt not steal, Thou shalt not bear false witness, Thou shalt not covet; and if there be any other commandment, it is briefly comprehended in this saying, namely, Thou shalt love thy neighbour as thyself. Love worketh no ill to his neighbour: therefore love is the fulfilling of the law."
          reference="Romans 13:9 and 10"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul lists the exact same commands from this chapter and names what was underneath all of
          them the whole time.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 20
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What are the Ten Commandments in Exodus 20?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In order, they are: have no other gods, make no graven image to bow down to, do not take
          God&apos;s name in vain, keep the sabbath, honor your father and mother, do not murder, do
          not commit adultery, do not steal, do not bear false witness, and do not covet. Exodus 20
          itself never numbers them individually.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Exodus 20 mean the Ten Commandments are a checklist for earning God&apos;s favor?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Verse 2 states the rescue from Egypt as already finished before a single command is
          given in verse 3. The commandments describe how a people God already saved are meant to
          live, not a ladder they climb to be saved in the first place.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does &quot;thou shalt not kill&quot; not forbid war or capital punishment elsewhere in the law?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Hebrew word in verse 13 is a narrower term for unlawful killing rather than the general
          word for taking a life, which is why many modern translations render it &quot;murder&quot;
          instead of the older English &quot;kill.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;thou shalt not take the name of the LORD thy God in vain&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 20:7 forbids using God&apos;s name emptily, without the weight it actually carries.
          This covers more than cursing. Swearing a false oath in God&apos;s name or claiming to speak
          for Him carelessly both empty the name the same way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do Catholic, Protestant, and Jewish lists of the Ten Commandments number them differently?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 20 gives the words themselves but never assigns them numbers. Jewish tradition, Catholic
          and Lutheran tradition, and most other Protestant traditions each group the same verses into
          ten commands in slightly different ways, especially around the opening verses on God and the
          closing verse on coveting.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Exodus 20:5 mean children are punished for their parents&apos; sins?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ezekiel 18:20 states directly that a son does not bear his father&apos;s guilt. Most careful
          readers take Exodus 20:5 as describing real consequences and patterns of sin passing down
          through a household, not God charging a child with a parent&apos;s personal guilt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Is the sabbath commandment still required for Christians today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Christians hold different views on this. Some keep a seventh day sabbath, some observe
          Sunday as the Lord&apos;s day instead, and others hold that the sabbath was fulfilled in
          Christ and no single day is commanded. Exodus 20 states the original command without
          settling how later generations should apply it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Israelites ask Moses to speak to God for them?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 20:19 gives their own words: fear of dying after witnessing the thunder, lightning,
          and smoke covering the mountain. They asked for a mediator out of genuine terror, not out of
          rejecting the relationship God had just offered.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 20 end with instructions about building an altar?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Having just heard commands including a ban on graven images, Israel needed to know how
          they were still allowed to worship. Verses 22 to 26 answer with a plain altar of earth or
          unworked stone, kept simple on purpose so worship stayed available to everyone rather than
          only to whoever could build something impressive.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Jesus do away with the Ten Commandments?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew 22:37 to 40 shows Jesus summarizing the entire law, this chapter included, into
          loving God and loving your neighbor. Romans 13:9 and 10 lists several of these exact
          commandments and calls love their fulfillment, not their replacement.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 20 is the most quoted chapter in the Bible that almost nobody reads in order, start to finish.</p>
          <p>
            📌 <strong>Rescue came before a single rule was spoken.</strong> God names what He already
            did in verse 2, before verse 3 ever asks anything of Israel. Obedience here answers grace
            already given.
          </p>
          <p>
            📌 <strong>The commands move from God outward to your neighbor on purpose.</strong> Four
            commands about who God is, one hinge command about honoring parents, then five commands
            about how you treat the people around you. Love of God was never meant to stay separate
            from how you treat people.
          </p>
          <p>
            📌 <strong>The last commandment gives away what the first nine were already after.</strong>{" "}
            Coveting cannot be seen by anyone. The whole law was aimed at the heart the entire time,
            not just the visible action.
          </p>
          <p>So here is one thing to actually do with this chapter.</p>
          <p>
            Read all ten commands slowly today, and stop on the one you have quietly reduced to an
            action you avoid, rather than a heart God is actually after.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
