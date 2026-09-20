import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-15-explained", {
  title: "Genesis 15 Explained: The Covenant God Cuts Alone",
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

export default function GenesisFifteenExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-15-explained"
      title={<>📖 Genesis 15 Explained: The Covenant God Cuts Alone</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Abram just turned down a fortune. Now he is alone in the dark, arguing with God.</p>
            <p>
              <strong>Genesis 15 explained</strong> is the chapter where the promise stops being a
              general word and becomes a legal covenant, sealed the way ancient treaties were sealed,
              except God is the only one who walks through it. Abram is still childless, still
              landless, and finally says so out loud to the God who keeps promising him both.
            </p>
            <p>Maybe you have believed God for something for years and started to wonder if you misheard Him.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God tell Abram not to be afraid right after his biggest victory?</li>
            <li>❓ What does it actually mean that Abram&apos;s faith was &quot;counted for righteousness&quot;?</li>
            <li>❓ Why does God put Abram to sleep before cutting a covenant with him?</li>
            <li>❓ And why does only one party walk through the pieces of the sacrifice?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Genesis 15 is the chapter where God takes on the entire weight of a promise
              Abram cannot keep his end of anyway, and binds Himself to it alone.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the fear, the honest
              complaint, the stars, the verse the New Testament quotes more than almost any other in
              Genesis, and the strange, dark ceremony that seals it all.
            </p>
            <p>Doubt and faith show up in the very same conversation here. That might be the most honest part of the whole chapter.</p>
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
            Genesis 14 was a war chapter. Four eastern kings led by Chedorlaomer crushed a coalition
            of five local kings, including the king of Sodom, and hauled off everyone and everything
            in the city, including <ArticleLink href="/blog/genesis-13-explained">Lot</ArticleLink>,
            who had pitched his tent toward Sodom back in Genesis 13. Abram armed three hundred and
            eighteen of his own trained men, chased the raiding kings north past Damascus, and brought
            back Lot, the captives, and all the stolen goods.
          </p>
          <p>
            On the way home, two kings met him. Melchizedek, king of Salem and &quot;priest of the
            most high God,&quot; blessed Abram and brought out bread and wine, and Abram gave him a
            tenth of everything. Then the king of Sodom offered Abram a deal: keep all the recovered
            goods, just return the people. Abram refused every bit of it, down to a thread and a
            shoelace, so that no one could ever say a pagan king made Abram rich.
          </p>
          <p>
            📌 <strong>Genesis 15 opens on the heels of that refusal.</strong> Abram just walked away
            from the easiest wealth he had ever been offered, on principle, and the very next thing
            God says to him is a promise about reward. That timing is not an accident.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 15 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Fear Not, Abram (verse 1)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with a vision, and the very first word out of God&apos;s mouth addresses something Abram had not said yet.</p>
        </div>
        <VerseQuote
          text="After these things the word of the LORD came unto Abram in a vision, saying, Fear not, Abram: I am thy shield, and thy exceeding great reward."
          reference="Genesis 15:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;Fear not&quot; only makes sense if Abram was afraid of something.</strong>{" "}
            He had just refused a king&apos;s wealth and made an enemy of a chased off coalition of
            kings who might regroup. A shield is a soldier&apos;s word, fitting for a man who had just
            fought a battle. God speaks a similar word to Abram&apos;s son Isaac in Genesis 26:24, the
            same{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">command not to fear</ArticleLink>{" "}
            running through more than one generation of this family.
          </p>
          <p>
            💡 Notice what God offers is not only protection but Himself as the reward. Abram just
            turned down Sodom&apos;s goods. God&apos;s answer is that He is worth more than what
            Abram gave up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Abram&apos;s Honest Complaint (verses 2 and 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Abram does not respond with gratitude. He responds with the one thing he actually wants an answer about.</p>
        </div>
        <VerseQuote
          text="And Abram said, LORD God, what wilt thou give me, seeing I go childless, and the steward of my house is this Eliezer of Damascus?"
          reference="Genesis 15:2"
        />
        <VerseQuote
          text="And Abram said, Behold, to me thou hast given no seed: and, lo, one born in my house is mine heir."
          reference="Genesis 15:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Eliezer was Abram&apos;s chief servant, and under the customs Abram grew up with, a
            servant born in the household could legally inherit everything if there was no son. That
            was the backup plan already running in Abram&apos;s head.
          </p>
          <p>
            ⚠️ <strong>Ten years had passed since God first promised Abram a great nation in{" "}
            <ArticleLink href="/blog/genesis-13-explained">Canaan</ArticleLink>, and there was still
            no child.</strong> Abram is not being unfaithful here. He is doing something faith
            actually allows: telling God plainly that the promise and his current reality do not
            match yet.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. The Stars and the Verse That Changes Everything (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God does not correct Abram for asking. He answers with a picture and a promise that closes the loophole Abram had planned around.</p>
        </div>
        <VerseQuote
          text="And, behold, the word of the LORD came unto him, saying, This shall not be thine heir; but he that shall come forth out of thine own bowels shall be thine heir."
          reference="Genesis 15:4"
        />
        <VerseQuote
          text="And he brought him forth abroad, and said, Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be."
          reference="Genesis 15:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Eliezer is out. A son from Abram&apos;s own body is in.</strong> Then God takes
            Abram outside, under a night sky with no city light to dim it, and hands him an
            uncountable number as the size of the promise. Then comes the verse the rest of the Bible
            keeps returning to.
          </p>
        </div>
        <VerseQuote
          text="And he believed in the LORD; and he counted it to him for righteousness."
          reference="Genesis 15:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Abram is not declared righteous because he built altars, left Ur, or won a
            battle. He is declared righteous because he believed a promise he could not yet see
            fulfilled.</strong> Paul quotes this exact verse in Romans 4:3 and Galatians 3:6 to argue
            that a right standing with God has always come through faith, long before the law was
            ever given at Sinai. James 2:23 quotes the same verse to make a different but connected
            point, that real faith eventually shows itself in action.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. How Shall I Know? (verses 7 and 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God shifts from the promise of a son to the promise of land, and Abram asks a second honest question.</p>
        </div>
        <VerseQuote
          text="And he said unto him, I am the LORD that brought thee out of Ur of the Chaldees, to give thee this land to inherit it."
          reference="Genesis 15:7"
        />
        <VerseQuote
          text="And he said, LORD God, whereby shall I know that I shall inherit it?"
          reference="Genesis 15:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is not the same as doubting God&apos;s existence or His right to speak. Abram
            just believed a promise about a son with nothing to go on but God&apos;s word. Now he asks
            for something more concrete about the land, and God does not rebuke the question. He
            answers it with a ceremony.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Covenant of the Pieces (verses 9 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God tells Abram to prepare for a covenant ceremony that ancient Near Eastern treaty makers would have recognized instantly.</p>
        </div>
        <VerseQuote
          text="And he said unto him, Take me an heifer of three years old, and a she goat of three years old, and a ram of three years old, and a turtledove, and a young pigeon."
          reference="Genesis 15:9"
        />
        <VerseQuote
          text="And he took unto him all these, and divided them in the midst, and laid each piece one against another: but the birds divided he not."
          reference="Genesis 15:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>In the ancient world, two parties making a covenant would cut animals in half,
            lay the halves opposite each other, and both walk together between the pieces.</strong>{" "}
            The walk itself was the oath: it said, may what happened to these animals happen to me if
            I break this agreement. Abram prepares exactly what that ceremony required.
          </p>
        </div>
        <VerseQuote
          text="And when the fowls came down upon the carcases, Abram drove them away."
          reference="Genesis 15:11"
        />
        <VerseQuote
          text="And when the sun was going down, a deep sleep fell upon Abram; and, lo, an horror of great darkness fell upon him."
          reference="Genesis 15:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Abram spends the day guarding the pieces from scavenging birds, then falls
            into a deep sleep sent by God right as the ceremony is about to happen.</strong> This is not
            ordinary tiredness. The Hebrew word used here for this kind of sleep describes a
            supernatural trance, the same category of sleep God used on Adam before forming Eve. Abram
            is being removed as an active participant in his own covenant, on purpose.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Four Hundred Years Foretold (verses 13 to 16)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Inside the darkness, God tells Abram exactly what is coming, generations before any of it happens.</p>
        </div>
        <VerseQuote
          text="And he said unto Abram, Know of a surety that thy seed shall be a stranger in a land that is not theirs, and shall serve them; and they shall afflict them four hundred years;"
          reference="Genesis 15:13"
        />
        <VerseQuote
          text="And also that nation, whom they shall serve, will I judge: and afterward shall they come out with great substance."
          reference="Genesis 15:14"
        />
        <VerseQuote
          text="And thou shalt go to thy fathers in peace; thou shalt be buried in a good old age."
          reference="Genesis 15:15"
        />
        <VerseQuote
          text="But in the fourth generation they shall come hither again: for the iniquity of the Amorites is not yet full."
          reference="Genesis 15:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God names the slavery in Egypt centuries before Joseph is ever born, and pairs
            it with a promise that the nation enslaving them will be judged and Abram&apos;s
            descendants will leave wealthy.</strong> Exodus, when it finally happens, is not God
            improvising a rescue. It is God keeping a word spoken here, in the dark, generations
            earlier.
          </p>
          <p>
            💡 <strong>&quot;The iniquity of the Amorites is not yet full&quot; is easy to read past,
            but it says something important about how God judges nations.</strong> The land is not
            handed over the moment it looks convenient for Abram&apos;s family. It waits until the
            people already living there have run out their own measure of wickedness. God&apos;s
            timing here is tied to justice, not just to Abram&apos;s calendar.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. The Smoking Furnace and the Burning Lamp (verses 17 to 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once it is fully dark, the ceremony finally happens, and only one party takes part in it.</p>
        </div>
        <VerseQuote
          text="And it came to pass, that, when the sun went down, and it was dark, behold a smoking furnace, and a burning lamp that passed between those pieces."
          reference="Genesis 15:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>A smoking furnace and a burning lamp represent God&apos;s own presence, and
            they alone pass between the animal halves.</strong> Abram is still asleep. He never walks
            through the pieces at all. In a normal covenant, both sides would take the oath together.
            Here, God takes the entire oath by Himself, on behalf of both parties.
          </p>
        </div>
        <VerseQuote
          text="In the same day the LORD made a covenant with Abram, saying, Unto thy seed have I given this land, from the river of Egypt unto the great river, the river Euphrates:"
          reference="Genesis 15:18"
        />
        <VerseQuote
          text="The Kenites, and the Kenizzites, and the Kadmonites, And the Hittites, and the Perizzites, and the Rephaims, And the Amorites, and the Canaanites, and the Girgashites, and the Jebusites."
          reference="Genesis 15:19 to 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter ends with a list of ten peoples already living on the land God just promised,
            named specifically instead of left vague. The promise is not to empty ground. It is a
            claim laid directly over occupied territory, spoken generations before any of
            Abram&apos;s descendants would set foot there as more than travelers.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 15 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What does &quot;counted it to him for righteousness&quot; actually mean?</strong>{" "}
            The Hebrew verb behind &quot;counted&quot; is an accounting term, closer to crediting an
            account than to a feeling. Genesis 15:6 says Abram&apos;s trust in God&apos;s word was
            treated by God as righteousness, not that Abram had somehow earned a perfect moral record.
            The New Testament leans on this verse heavily: Romans 4 and Galatians 3 use it to show
            that a right standing with God has always run through faith, since it happened here
            centuries before the law was given at Sinai and even before Abram was circumcised in
            Genesis 17.
          </p>
          <p>
            <strong>Does James 2 contradict this, since it says faith without works is dead?</strong>{" "}
            James 2:23 quotes the same Genesis 15:6 verse, but in the context of Abram&apos;s later
            obedience in offering Isaac in Genesis 22. Paul is answering how a person is declared
            righteous before God: by faith. James is answering how you can tell whether someone&apos;s
            faith is real: it eventually acts. Both writers point to the same verse without
            contradicting each other, because they are answering two different questions.
          </p>
          <p>
            <strong>Why did God put Abram to sleep instead of letting him take the oath
            himself?</strong> The text does not explain the reason directly, but the pattern is
            telling. A normal treaty required both sides to walk through the pieces and accept the
            same risk. By removing Abram entirely and passing through alone as fire and smoke, God
            makes this an unconditional promise resting on His own faithfulness, not on Abram&apos;s
            ability to hold up his end. The land promise that follows is not framed as something Abram
            could forfeit by failing.
          </p>
          <p>
            <strong>Was it four hundred years in Egypt or four hundred and thirty?</strong> Genesis
            15:13 says four hundred years of affliction. Exodus 12:40 gives four hundred and thirty
            years for the total time Israel dwelt in Egypt, and Galatians 3:17 counts four hundred and
            thirty years from an earlier point, the giving of this very promise, to the law at Sinai.
            The most common way these numbers are reconciled is that the four hundred years of
            affliction did not begin the moment Jacob&apos;s family arrived in Egypt, but sometime
            after, once a new ruler who did not know Joseph rose to power, while the four hundred and
            thirty years measures the full span from the promise itself.
          </p>
          <p>
            <strong>What does &quot;the fourth generation&quot; mean if the wait was four hundred
            years?</strong> A biblical generation in this stretch of the story is not a strict twenty
            or thirty years. Lifespans in this era of Genesis still ran long, and the line from Levi
            to Moses runs Levi, Kohath, Amram, Moses, four generations covering roughly the same span
            as the four hundred years of affliction.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 15:1</h3>
        <VerseQuote
          text="After these things the word of the LORD came unto Abram in a vision, saying, Fear not, Abram: I am thy shield, and thy exceeding great reward."
          reference="Genesis 15:1"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God speaks reassurance the moment after Abram refuses a king&apos;s wealth, offering
          Himself as a better reward than anything Abram just walked away from.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 15:5 and 6</h3>
        <VerseQuote
          text="And he brought him forth abroad, and said, Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be. And he believed in the LORD; and he counted it to him for righteousness."
          reference="Genesis 15:5 and 6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The verse Paul builds his whole argument for justification by faith on, spoken to a man
          with no child and only stars for evidence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 15:13 and 14</h3>
        <VerseQuote
          text="And he said unto Abram, Know of a surety that thy seed shall be a stranger in a land that is not theirs, and shall serve them; and they shall afflict them four hundred years; And also that nation, whom they shall serve, will I judge: and afterward shall they come out with great substance."
          reference="Genesis 15:13 and 14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Egypt, slavery, and the exodus foretold centuries in advance, long before Joseph was ever
          sold into Egypt himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 15:17</h3>
        <VerseQuote
          text="And it came to pass, that, when the sun went down, and it was dark, behold a smoking furnace, and a burning lamp that passed between those pieces."
          reference="Genesis 15:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God alone walks through the covenant pieces while Abram sleeps, turning the promise into
          one God binds Himself to keep no matter what.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 15:18</h3>
        <VerseQuote
          text="In the same day the LORD made a covenant with Abram, saying, Unto thy seed have I given this land, from the river of Egypt unto the great river, the river Euphrates:"
          reference="Genesis 15:18"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The formal covenant statement, naming the exact boundaries of a land ten other nations
          were already living on when the promise was spoken.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does Genesis 15 mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It records God renewing His promise to Abram after he asks honestly about having no child
          and no land yet. Abram believes God&apos;s word about a son as countless as the stars, and
          God formally seals the land promise through a covenant ceremony while Abram sleeps.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the covenant of the pieces?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is the ancient ceremony in Genesis 15:9 to 17, where animals are cut in half and laid
          opposite each other so both parties to a covenant can walk between them as an oath. In this
          case only a smoking furnace and burning lamp, representing God, pass through, since Abram is
          asleep.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Abram fall into a deep sleep in Genesis 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 15:12 describes a deep sleep sent by God with an horror of great darkness falling on
          him, the same kind of supernatural sleep God used on Adam in Genesis 2. It removes Abram
          from actively taking the covenant oath, so the promise rests entirely on God.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;counted it to him for righteousness&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It means God credited Abram&apos;s trust in His word as righteousness, before Abram had done
          anything else to earn that standing. Romans 4 and Galatians 3 both use this verse to argue
          that people have always been made right with God through faith, not through keeping the law.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Eliezer of Damascus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 15:2 names him as the steward of Abram&apos;s house, a servant who stood to inherit
          everything under the customs of the time if Abram died without a son. God&apos;s promise of
          a son from Abram&apos;s own body directly rules out that plan.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was it 400 years or 430 years in Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 15:13 gives four hundred years of affliction, while Exodus 12:40 gives four hundred
          and thirty years for the total time in Egypt. Most readers reconcile this by placing the
          start of the harsher affliction later than Israel&apos;s arrival in Egypt, once a new
          Pharaoh who did not know Joseph came to power.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Abram walk between the pieces too?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because God put him into a deep sleep before the ceremony took place. Only the smoking
          furnace and burning lamp, representing God&apos;s presence, pass between the animal halves,
          making this an unconditional promise God binds only Himself to keep.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What land did God promise Abram in Genesis 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 15:18 to 21 describes land from the river of Egypt to the Euphrates River,
          currently occupied by ten named peoples including the Amorites, Hittites, and Canaanites.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 15:6 relate to salvation today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Paul uses this exact verse in Romans 4:3 as his central proof that righteousness has always
          come by believing God, not by earning it through obedience. He argues that if it worked
          this way for Abram before the law even existed, it still works this way for anyone who
          believes God today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God say the Amorites&apos; iniquity is not yet full?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 15:16 ties the timing of the land promise to God&apos;s patience with the people
          already living there. The land does not change hands the moment it becomes convenient for
          Abram&apos;s descendants. It waits until the wickedness of its current inhabitants has run
          its full course.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 15 connect to the rest of Abram&apos;s story?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It formalizes promises Abram first received in{" "}
          <ArticleLink href="/blog/genesis-12-explained">Genesis 12</ArticleLink> into a binding
          covenant, and it sets up the tension that drives the very next chapter, where Abram and{" "}
          <ArticleLink href="/blog/who-was-sarah">Sarai</ArticleLink> stop waiting on the promised son
          and try to produce an heir their own way.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 15 puts doubt and faith in the same conversation, and does not treat that as a contradiction.</p>
          <p>
            📌 <strong>Honest questions are not the opposite of faith.</strong> Abram asks God twice
            in this chapter what he is actually going to get, and God answers both times instead of
            rebuking him for asking.
          </p>
          <p>
            📌 <strong>Believing God is what God counts as righteousness, not a flawless
            record.</strong> Genesis 15:6 becomes one of the most quoted verses in the entire New
            Testament for exactly this reason.
          </p>
          <p>
            📌 <strong>Some promises rest entirely on God, not on you keeping up your end.</strong>{" "}
            Abram slept through the ceremony that sealed his own covenant. God walked through it
            alone.
          </p>
          <p>
            You may be holding a promise from God with no visible progress toward it yet, the way
            Abram held a promise of stars for a son he still did not have.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name the specific thing you are still waiting on God for, and tell Him honestly, the way
            Abram did, instead of pretending the wait does not bother you.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
