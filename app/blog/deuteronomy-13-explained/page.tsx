import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-13-explained", {
  title: "Deuteronomy 13 Explained: The Prophet, the Loved One, the City",
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

export default function DeuteronomyThirteenExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-13-explained"
      title={<>📖 Deuteronomy 13 Explained: The Prophet, the Loved One, the City</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A sign comes true. A brother whispers an invitation. A whole town agrees together.</p>
            <p>
              <strong>Deuteronomy 13 explained</strong> is Moses answering the question his own
              warning in the last chapter just raised. If curiosity about other gods is a snare,
              what happens when that pull does not come from curiosity at all, but from someone
              with real credibility, or someone you love, or an entire community agreeing it is
              fine?
            </p>
            <p>Maybe you assumed idolatry would always look obviously wrong when it showed up.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Moses even bring up a prophet whose sign actually comes true?</li>
            <li>❓ Why is a close family member singled out as a possible danger?</li>
            <li>❓ Can a whole city really be guilty, not just a few people in it?</li>
            <li>❓ Does this chapter really command the death penalty for a wrong belief?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 13 is not about spotting an obvious liar. It is about staying
              faithful when the pull toward other gods comes wrapped in credibility, love, or a
              crowd.</strong>
            </p>
            <p>
              Eighteen verses, and they run through three separate scenarios in order: a prophet
              whose wonder actually happens, a loved one who asks in private, and a city that
              decides together. Each one gets harder to resist than the last, and Moses treats all
              three the same way.
            </p>
            <p>Read slowly. This chapter is less about ancient law and more about what loyalty actually costs.</p>
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
            <ArticleLink href="/blog/deuteronomy-12-explained">Deuteronomy 12</ArticleLink> closed
            with a warning not to let curiosity about Canaanite worship turn into imitation.
            Moses named the danger as a kind of research, asking how the nations served their
            gods as if the answer were a method worth studying.
          </p>
          <p>
            Deuteronomy 13 takes that same danger and makes it personal. It stops talking about
            curiosity in general and starts naming exactly who might bring that pull to your own
            door: a prophet with a real following, a member of your own household, or the whole
            town you live in. The chapter that just finished warning against borrowing a method
            now spells out what to do when the method shows up wearing a familiar face.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 13 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. The Prophet Whose Sign Comes True (verses 1 to 5)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens with the hardest case in the whole chapter, on purpose.</p>
        </div>
        <VerseQuote
          text="If there arise among you a prophet, or a dreamer of dreams, and giveth thee a sign or a wonder, And the sign or the wonder come to pass, whereof he spake unto thee, saying, Let us go after other gods, which thou hast not known, and let us serve them; Thou shalt not hearken unto the words of that prophet, or that dreamer of dreams: for the LORD your God proveth you, to know whether ye love the LORD your God with all your heart and with all your soul."
          reference="Deuteronomy 13:1 to 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what Moses does not say. He does not say the sign will fail.</strong>{" "}
            The wonder actually happens, exactly as the prophet predicted. That is the whole
            difficulty of this scenario. A working miracle feels like proof, and Moses tells
            Israel outright that it is not proof of anything except that God is watching how they
            respond.
          </p>
          <p>
            <ArticleLink href="/blog/deuteronomy-6-explained">Deuteronomy 6</ArticleLink> already
            commanded Israel to love the LORD with all their heart and soul. Here that exact
            phrase comes back, but now as a test rather than a command. Loving God with everything
            you have is revealed, Moses says, by what you refuse to follow, not only by what you
            say you believe.
          </p>
          <p>The positive command sits right in the middle of the warning, easy to miss.</p>
        </div>
        <VerseQuote
          text="Ye shall walk after the LORD your God, and fear him, and keep his commandments, and obey his voice, and ye shall serve him, and cleave unto him."
          reference="Deuteronomy 13:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Moses never leaves Israel with only a prohibition. Every time this chapter says who
            not to follow, it also says, in the same breath, who to follow instead. Verse 4 is not
            filler between two warnings. It is the actual answer to the test in verses 1 to 3.
          </p>
          <p>Then comes the sentence that makes this law impossible to read casually.</p>
        </div>
        <VerseQuote
          text="And that prophet, or that dreamer of dreams, shall be put to death; because he hath spoken to turn you away from the LORD your God, which brought you out of the land of Egypt, and redeemed you out of the house of bondage, to thrust thee out of the way which the LORD thy God commanded thee to walk in. So shalt thou put the evil away from the midst of thee."
          reference="Deuteronomy 13:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The crime named here is not false prediction. It is the content of the
            message.</strong> A prophet who predicts something wrong but never points Israel
            toward other gods is a different problem, addressed later in{" "}
            <ArticleLink href="/blog/numbers-22-explained">the story of Balaam</ArticleLink>, a
            prophet hired specifically to work against Israel. This verse is narrower and sharper.
            The one thing that makes a sign worker worthy of death here is steering God&apos;s
            people away from the God who brought them out of Egypt.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. The Brother, the Wife, the Friend Who Entices You Secretly (verses 6 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The second test removes the public stage entirely and brings the danger home.</p>
        </div>
        <VerseQuote
          text="If thy brother, the son of thy mother, or thy son, or thy daughter, or the wife of thy bosom, or thy friend, which is as thine own soul, entice thee secretly, saying, Let us go and serve other gods, which thou hast not known, thou, nor thy fathers;"
          reference="Deuteronomy 13:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every name in this verse is someone you would normally protect, not
            report.</strong> A brother from your own mother, a son, a daughter, a wife described
            as of your own bosom, a friend as close as your own soul. Moses is not describing
            strangers who might lead Israel astray. He is describing the exact people a person
            would most want to excuse.
          </p>
          <p>The word &quot;secretly&quot; matters as much as who is speaking.</p>
          <p>
            💡 A prophet in verses 1 to 5 performs a public sign in front of everyone. This
            temptation happens in private, where no one else hears the invitation and no one else
            could confirm it even happened. Moses builds the law to cover exactly the kind of
            pressure that leaves no witnesses.
          </p>
        </div>
        <VerseQuote
          text="Thou shalt not consent unto him, nor hearken unto him; neither shall thine eye pity him, neither shalt thou spare, neither shalt thou conceal him: But thou shalt surely kill him; thine hand shall be first upon him to put him to death, and afterwards the hand of all the people."
          reference="Deuteronomy 13:8 and 9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The line &quot;thine hand shall be first upon him&quot; is the hardest
            sentence in the chapter.</strong> The closest relative is told not to let someone else
            carry out this law on their behalf. Moses is removing every excuse for quietly
            protecting a loved one instead of answering to God directly.
          </p>
        </div>
        <VerseQuote
          text="And thou shalt stone him with stones, that he die; because he hath sought to thrust thee away from the LORD thy God, which brought thee out of the land of Egypt, from the house of bondage."
          reference="Deuteronomy 13:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The same reason given for the prophet in verse 5 returns here almost word for word,
            brought thee out of the land of Egypt, from the house of bondage. Whether the pull
            comes from a stranger with a sign or a brother in private, Moses roots the
            punishment in the same identity: Israel belongs to the God who rescued them, and that
            claim outranks every other relationship.
          </p>
          <p>Moses states the purpose of the law plainly before moving to the next scenario.</p>
        </div>
        <VerseQuote
          text="And all Israel shall hear, and fear, and shall do no more any such wickedness as this is among you."
          reference="Deuteronomy 13:11"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Whole City Gone After Other Gods (verses 12 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The third scenario widens from one person to an entire community.</p>
        </div>
        <VerseQuote
          text="If thou shalt hear say in one of thy cities, which the LORD thy God hath given thee to dwell there, saying, Certain men, the children of Belial, are gone out from among you, and have withdrawn the inhabitants of their city, saying, Let us go and serve other gods, which ye have not known;"
          reference="Deuteronomy 13:12 and 13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>All three temptations in this chapter are worded almost identically, on
            purpose.</strong> The prophet says, let us go after other gods, which thou hast not
            known. The loved one says, let us go and serve other gods, which thou hast not known.
            The men of the city say, let us go and serve other gods, which ye have not known. The
            invitation never changes shape. Only the source does, moving from a stranger with a
            sign, to a relative in private, to a whole community speaking with one voice.
          </p>
          <p>
            Unlike the first two scenarios, Moses does not allow an immediate response here. He
            inserts an investigation first.
          </p>
        </div>
        <VerseQuote
          text="Then shalt thou enquire, and make search, and ask diligently; and, behold, if it be truth, and the thing certain, that such abomination is wrought among you;"
          reference="Deuteronomy 13:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Three different verbs for checking the facts land in one verse: enquire, search,
            ask diligently. A rumor about a whole town is not enough to act on. The scale of the
            response that follows is tied directly to how carefully the claim gets verified first.
          </p>
          <p>Once the report is confirmed true, the response is total.</p>
        </div>
        <VerseQuote
          text="Thou shalt surely smite the inhabitants of that city with the edge of the sword, destroying it utterly, and all that is therein, and the cattle thereof, with the edge of the sword. And thou shalt gather all the spoil of it into the midst of the street thereof, and shalt burn with fire the city, and all the spoil thereof every whit, for the LORD thy God: and it shall be an heap for ever; it shall not be built again."
          reference="Deuteronomy 13:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is the same language used for Canaanite cities under judgment, now
            aimed at an Israelite city that chose the same path.</strong>{" "}
            <ArticleLink href="/blog/deuteronomy-7-explained">Deuteronomy 7</ArticleLink> commands
            this kind of total destruction against the nations Israel was about to conquer. Moses
            is not giving Israel a lighter standard for its own people. A city inside Israel that
            serves other gods is judged by the exact standard set for the nations outside it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Nothing of the Cursed Thing Sticks to Your Hand (verses 17 and 18)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter closes with a detail easy to read past after the intensity of verse 16.</p>
        </div>
        <VerseQuote
          text="And there shall cleave nought of the cursed thing to thine hand: that the LORD may turn from the fierceness of his anger, and shew thee mercy, and have compassion upon thee, and multiply thee, as he hath sworn unto thy fathers; When thou shalt hearken to the voice of the LORD thy God, to keep all his commandments which I command thee this day, to do that which is right in the eyes of the LORD thy God."
          reference="Deuteronomy 13:17 and 18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Not one piece of plunder from that city can be kept.</strong> Where ordinary
            warfare in the Old Testament allowed Israel to take spoil, this judgment forbids it
            completely. The whole city, including everything of value in it, is burned rather than
            taken, so that no one can walk away from this tragedy having profited from it.
          </p>
          <p>
            ✅ <strong>The last line of the chapter turns a verse about destruction into a verse
            about mercy.</strong> Moses ends not on the burned city but on God&apos;s compassion
            and promise to multiply Israel, the same promise given to their fathers. Judgment on
            idolatry inside the nation is written as the path back to blessing, not as an end in
            itself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 13 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does this chapter really command killing someone for a wrong belief?</strong>{" "}
            The text commands the death penalty specifically for actively enticing others to
            abandon the LORD for other gods within Israel&apos;s covenant community and land, not
            for private doubt or disagreement. This was civil law for a specific nation under a
            specific covenant, carried out through Israel&apos;s own courts and community. Nowhere
            does the New Testament tell Christians to carry out this penalty themselves.
          </p>
          <p>
            <strong>Why would God let a false prophet&apos;s sign actually come true?</strong>{" "}
            Verse 3 states the reason directly: the LORD your God proveth you, to know whether ye
            love the LORD your God with all your heart and with all your soul. The text frames the
            test as a genuine proving, not a trap meant to trick anyone into sin. The standard for
            telling a true word from a false one was never going to be whether it works. It was
            always going to be whether it points toward the true God or away from him.
          </p>
          <p>
            <strong>Does this contradict the test for a true prophet given in Deuteronomy 18?</strong>{" "}
            Deuteronomy 18:22 says a prophet is false if his word does not come to pass. Deuteronomy
            13 describes the opposite case, a sign that does come to pass, and still calls the
            prophet false. Read together, the two chapters teach that fulfillment alone was never
            the full test. A true prophet&apos;s words come true and point to the LORD. A word that
            comes true but points toward other gods fails the deeper test, no matter how accurate
            it was.
          </p>
          <p>
            <strong>Why command total destruction of an Israelite city instead of punishing only
            the guilty individuals?</strong> The text does not explain this choice beyond stating
            it. What it does make clear is that the scale of response matches the scale of the sin
            described: not one household persuaded in secret, but an entire city deciding together
            to abandon the LORD. Moses treats organized, communal apostasy as a different category
            from one person&apos;s private failure.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 13:3</h3>
        <VerseQuote
          text="Thou shalt not hearken unto the words of that prophet, or that dreamer of dreams: for the LORD your God proveth you, to know whether ye love the LORD your God with all your heart and with all your soul."
          reference="Deuteronomy 13:3"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse that reframes the whole chapter. A working sign was never going to be the
          test. Loyalty was always the actual question being asked.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 13:4</h3>
        <VerseQuote
          text="Ye shall walk after the LORD your God, and fear him, and keep his commandments, and obey his voice, and ye shall serve him, and cleave unto him."
          reference="Deuteronomy 13:4"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Every warning in this chapter sits next to a positive command. Refusing a false path is
          only half the instruction. Clinging to the right one is the other half.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 13:6</h3>
        <VerseQuote
          text="If thy brother, the son of thy mother, or thy son, or thy daughter, or the wife of thy bosom, or thy friend, which is as thine own soul, entice thee secretly, saying, Let us go and serve other gods, which thou hast not known, thou, nor thy fathers;"
          reference="Deuteronomy 13:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The hardest version of this test, because the person asking is someone you love and
          trust, and the request comes where no one else is listening.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 13:14</h3>
        <VerseQuote
          text="Then shalt thou enquire, and make search, and ask diligently; and, behold, if it be truth, and the thing certain, that such abomination is wrought among you;"
          reference="Deuteronomy 13:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Before the heaviest judgment in the chapter, Moses inserts the most careful
          investigation. The size of the claim gets matched by the size of the verification.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 13:18</h3>
        <VerseQuote
          text="When thou shalt hearken to the voice of the LORD thy God, to keep all his commandments which I command thee this day, to do that which is right in the eyes of the LORD thy God."
          reference="Deuteronomy 13:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter that opens with a false sign closes with the only sign that was ever meant
          to matter: a life that simply keeps listening to God&apos;s actual voice.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 13
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 13 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 13 lays out three scenarios where someone might try to turn Israel toward
          other gods: a prophet whose sign comes true, a close relative or friend who entices in
          private, and a whole city that agrees together, commanding the same loyalty to the LORD
          in every case.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Moses mention a prophet whose sign actually comes true?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses is removing the easiest excuse first. A sign coming true can feel like proof that
          God is behind it, so Deuteronomy 13:3 states directly that the test was never whether a
          wonder works, but whether it leads toward the LORD or away from him.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 13 contradict the prophet test in Deuteronomy 18?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Deuteronomy 18:22 tests a prophet whose words fail to come true. Deuteronomy 13
          covers the opposite situation, a sign that does come true, and still calls the prophet
          false because he points Israel toward other gods. Together they teach that accuracy
          alone was never the full test of a true prophet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is a family member singled out in verses 6 to 11?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses names a brother, son, daughter, wife, and close friend specifically because these
          are the people most likely to be excused rather than confronted. The law is built for
          the hardest case, where love for a person could override loyalty to God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does this chapter really command the death penalty for false belief?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The penalty applies specifically to actively enticing others into serving other gods
          within Israel&apos;s covenant nation, carried out through Israel&apos;s own community and
          courts. It was part of the civil law of a specific nation under a specific covenant with
          God, not a command the New Testament tells Christians to carry out themselves.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does an entire city get destroyed instead of only the guilty individuals?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not give a separate explanation beyond describing the scenario itself: an
          entire city agreeing together to abandon the LORD, not one household failing in
          private. Moses treats organized, communal apostasy as a distinct and more severe case
          than individual sin.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why can no spoil be taken from the destroyed city?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 13:17 forbids keeping anything from the city specifically so that no one
          could benefit personally from its destruction. The judgment was meant to be about
          removing the sin from the nation, not about gaining wealth from carrying it out.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that God proves Israel in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 13:3 says God allows this kind of test to know whether Israel loves him with
          all their heart and soul. The proving is not God tricking anyone into sin. It is a real
          test of whether loyalty to him survives contact with something that looks convincing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 13 still apply to Christians today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The civil penalties belonged to Israel&apos;s specific covenant and nation. The principle
          underneath still applies: a working sign, a loved one&apos;s request, or a whole group&apos;s
          agreement are none of them a substitute for testing whether something points toward the
          true God or away from him.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 13 never asks whether Israel can spot an obvious liar. It asks something harder.</p>
          <p>
            📌 <strong>A sign that works is not the same as a word that is true.</strong> Verse 3
            removes the easiest shortcut for deciding who to follow, and replaces it with a
            harder, more honest one: where does this actually lead.
          </p>
          <p>
            📌 <strong>The closest relationships carry the heaviest responsibility, not an
            exemption.</strong> Moses names a brother, a child, a spouse, a friend, exactly the
            people most people would want to protect first and question last.
          </p>
          <p>
            📌 <strong>Judgment in this chapter ends on mercy, not on ashes.</strong> Verse 18
            closes the whole scenario with God&apos;s compassion and his promise to multiply
            Israel, the actual goal underneath every hard line drawn here.
          </p>
          <p>
            You are probably never going to face a burning city. But you have almost certainly
            faced a convincing argument, or a person you love asking you to go along with
            something that quietly moves you away from God.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name the one voice in your life right now, however credible or close to you, that you
            have never actually tested against whether it leads you toward God or away from him.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
