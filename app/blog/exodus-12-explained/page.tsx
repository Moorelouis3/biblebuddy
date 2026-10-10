import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-12-explained", {
  title: "Exodus 12 Explained: The Passover Lamb and the Night Egypt Let Go",
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

export default function ExodusTwelveExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-12-explained"
      title={<>📖 Exodus 12 Explained: The Passover Lamb and the Night Egypt Let Go</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One lamb. One night. Blood on a doorframe deciding who lives.</p>
            <p>
              <strong>Exodus 12 explained</strong> is the chapter where everything the last nine
              plagues built toward finally lands. God hands Israel a meal with instructions down to
              the hour, Egypt loses what it refused to give up willingly, and a people walk out of
              slavery the same night death walks through every other house in the land.
            </p>
            <p>Maybe you have wondered why a story about an ancient meal still matters to you now.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why a lamb, and why did it have to be without blemish?</li>
            <li>❓ What did the blood on the doorposts actually do?</li>
            <li>❓ Why does God say He will judge Egypt&apos;s gods, not just Egypt&apos;s people?</li>
            <li>❓ And why does this one night still get kept as a feast, generation after generation?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Exodus 12 is the chapter where mercy and judgment fall on the same night,
              through the exact same blood.</strong>
            </p>
            <p>
              This walkthrough goes through the whole chapter in order: the lamb chosen on the
              tenth day, the blood applied on the fourteenth, the midnight it was all pointing to,
              Pharaoh finally driving Israel out himself, and the rules God gives for keeping this
              night sacred long after everyone who lived through it was gone.
            </p>
            <p>Read slowly. This is the night the rest of the Bible keeps looking back at.</p>
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
            <ArticleLink href="/blog/exodus-11-explained">Exodus 11</ArticleLink> ended with the
            tenth plague named out loud but not yet sent. God told Moses exactly what was coming
            at midnight, told Israel to ask their Egyptian neighbors for silver and gold on their
            way out, and closed by explaining why none of the last nine plagues had ever softened
            Pharaoh: the LORD hardened his heart so the wonders could be multiplied in full, for
            everyone watching to see.
          </p>
          <p>
            Exodus 12 opens in the days right before that midnight, with God giving Moses and
            Aaron instructions that have nothing to do with negotiating with Pharaoh at all. For
            the first time in the whole confrontation, the instructions are aimed entirely at
            Israel.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 12 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Lamb for Every House (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with God resetting Israel&apos;s calendar before He says anything else.</p>
        </div>
        <VerseQuote
          text="This month shall be unto you the beginning of months: it shall be the first month of the year to you."
          reference="Exodus 12:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>What happens this month matters so much that it becomes the hinge Israel&apos;s
            whole year turns on from now on.</strong> Before any lamb is chosen, God tells His
            people that this night deserves its own starting point on the calendar.
          </p>
          <p>Then come the specific instructions.</p>
        </div>
        <VerseQuote
          text="Speak ye unto all the congregation of Israel, saying, In the tenth day of this month they shall take to them every man a lamb, according to the house of their fathers, a lamb for an house:"
          reference="Exodus 12:3"
        />
        <VerseQuote
          text="And if the household be too little for the lamb, let him and his neighbour next unto his house take it according to the number of the souls; every man according to his eating shall make your count for the lamb."
          reference="Exodus 12:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nobody is left out for being too small a household. A family short on numbers simply
            shares with the house next door, so the lamb is sized to the people eating it, not the
            other way around.
          </p>
        </div>
        <VerseQuote
          text="Your lamb shall be without blemish, a male of the first year: ye shall take it out from the sheep, or from the goats:"
          reference="Exodus 12:5"
        />
        <VerseQuote
          text="And ye shall keep it up until the fourteenth day of the same month: and the whole assembly of the congregation of Israel shall kill it in the evening."
          reference="Exodus 12:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Without blemish</strong> means no defect, no injury, nothing less than
            Israel&apos;s best. This is not a leftover animal handed over because it was easiest to
            spare. And the four days between choosing the lamb and killing it are not wasted time.
            Every household has to live with the animal long enough to know exactly what it is
            giving up.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Blood on the Door, a Meal Eaten Ready to Run (verses 7 to 11)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the lamb is killed, the instructions turn strange fast.</p>
        </div>
        <VerseQuote
          text="And they shall take of the blood, and strike it on the two side posts and on the upper door post of the houses, wherein they shall eat it."
          reference="Exodus 12:7"
        />
        <VerseQuote
          text="And they shall eat the flesh in that night, roast with fire, and unleavened bread; and with bitter herbs they shall eat it."
          reference="Exodus 12:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The blood goes on the frame of the door, where anyone passing can see it. The meal
            itself pairs the lamb with unleavened bread, bread with no time to rise, and bitter
            herbs, a taste that will not let anyone eating forget what this meal is marking.
          </p>
        </div>
        <VerseQuote
          text="Eat not of it raw, nor sodden at all with water, but roast with fire; his head with his legs, and with the purtenance thereof."
          reference="Exodus 12:9"
        />
        <VerseQuote
          text="And ye shall let nothing of it remain until the morning; and that which remaineth of it until the morning ye shall burn with fire."
          reference="Exodus 12:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Purtenance</strong> is an old word for the inner organs. The whole animal is
            roasted and eaten that same night, head to legs, with nothing saved for later and
            nothing left to spoil or be treated carelessly by morning.
          </p>
          <p>Then comes the detail that says more than any other in this section.</p>
        </div>
        <VerseQuote
          text="And thus shall ye eat it; with your loins girded, your shoes on your feet, and your staff in your hand; and ye shall eat it in haste: it is the LORD's passover."
          reference="Exodus 12:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is not a leisurely meal. It is dinner eaten standing up, dressed to
            walk out the door the moment it is finished.</strong> Sandals on. Belt tightened.
            Walking stick already in hand. Israel is told to eat this meal like people who believe
            they are actually leaving, before Pharaoh has said a single word about it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Judgment on Egypt&apos;s Gods, and a Feast for Every Generation After (verses 12 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God then explains what this night is actually accomplishing, on two fronts at once.</p>
        </div>
        <VerseQuote
          text="For I will pass through the land of Egypt this night, and will smite all the firstborn in the land of Egypt, both man and beast; and against all the gods of Egypt I will execute judgment: I am the LORD."
          reference="Exodus 12:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Nine plagues already struck Egypt&apos;s river, its dust, its crops, and its sky. Each
            one lined up against something or someone Egypt worshipped: the Nile, the sun, the
            animals they called sacred. This verse says plainly what the whole confrontation was
            always doing underneath the surface. It was never just a contest between Moses and a
            stubborn king. It was <strong>the LORD</strong> against every god Egypt trusted instead
            of Him, named all at once in a single sentence.
          </p>
        </div>
        <VerseQuote
          text="And the blood shall be to you for a token upon the houses where ye are: and when I see the blood, I will pass over you, and the plague shall not be upon you to destroy you, when I smite the land of Egypt."
          reference="Exodus 12:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The blood is not decoration. It is the one thing standing between a house
            and the plague.</strong> Nothing about an Israelite family&apos;s goodness, their
            ancestry, or their good behavior is mentioned here. The blood on the door is the whole
            difference.
          </p>
        </div>
        <VerseQuote
          text="And this day shall be unto you for a memorial; and ye shall keep it a feast to the LORD throughout your generations; ye shall keep it a feast by an ordinance for ever."
          reference="Exodus 12:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 God names this a permanent memorial before the night has even happened. The
            instructions that follow, seven days of unleavened bread, no leaven found in any house,
            rest on the first and seventh days, are not extra rules bolted onto a one time event.
            They are how Israel keeps telling this story accurately for every generation that never
            saw Egypt with their own eyes.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Israel Obeys, and Death Comes at Midnight (verses 21 to 30)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses passes the instructions to the elders, who pass them to every household.</p>
        </div>
        <VerseQuote
          text="Then Moses called for all the elders of Israel, and said unto them, Draw out and take you a lamb according to your families, and kill the passover."
          reference="Exodus 12:21"
        />
        <VerseQuote
          text="And ye shall take a bunch of hyssop, and dip it in the blood that is in the bason, and strike the lintel and the two side posts with the blood that is in the bason; and none of you shall go out at the door of his house until the morning."
          reference="Exodus 12:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Hyssop is a small, ordinary plant, not a priestly tool. Anyone could cut a bunch and
            dip it in a basin. The instruction is deliberately simple enough that every household,
            not just the wealthy or the religious experts among them, could follow it exactly.
          </p>
          <p>
            And the command to stay inside until morning matters as much as the blood itself.
            Having the blood on the door was not enough on its own. A family had to actually
            shelter behind it.
          </p>
        </div>
        <VerseQuote
          text="For the LORD will pass through to smite the Egyptians; and when he seeth the blood upon the lintel, and on the two side posts, the LORD will pass over the door, and will not suffer the destroyer to come in unto your houses to smite you."
          reference="Exodus 12:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then the scene jumps forward to the night itself, and to what happens the moment it
            arrives.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, that at midnight the LORD smote all the firstborn in the land of Egypt, from the firstborn of Pharaoh that sat on his throne unto the firstborn of the captive that was in the dungeon; and all the firstborn of cattle."
          reference="Exodus 12:29"
        />
        <VerseQuote
          text="And Pharaoh rose up in the night, he, and all his servants, and all the Egyptians; and there was a great cry in Egypt; for there was not a house where there was not one dead."
          reference="Exodus 12:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>The reach of this plague is total, from the throne room to a prisoner in a
            dungeon.</strong> Verse 30 does not say most houses or many houses. It says there was
            not one house in Egypt without a death that night. This was not a surprise. God named
            this exact plague to Moses back at the burning bush, long before the first sign was
            ever performed in front of Pharaoh.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Pharaoh Finally Says Go, and Egypt Hands Over Its Wealth (verses 31 to 36)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>For the first time in the entire book, Pharaoh does not wait to be asked again.</p>
        </div>
        <VerseQuote
          text="And he called for Moses and Aaron by night, and said, Rise up, and get you forth from among my people, both ye and the children of Israel; and go, serve the LORD, as ye have said."
          reference="Exodus 12:31"
        />
        <VerseQuote
          text="Also take your flocks and your herds, as ye have said, and be gone; and bless me also."
          reference="Exodus 12:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Pharaoh finally gives Israel everything he spent nine chapters refusing:
            all the people, all the animals, and he even asks for a blessing on his way out.</strong>{" "}
            Every earlier offer in this book came with a string attached, the men without the
            families, or the families without the flocks. This time there are no strings left to
            attach.
          </p>
        </div>
        <VerseQuote
          text="And the Egyptians were urgent upon the people, that they might send them out of the land in haste; for they said, We be all dead men."
          reference="Exodus 12:33"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Egypt is not reluctantly letting Israel go anymore. Egypt is pushing them out the door,
            afraid of what one more night might cost.
          </p>
        </div>
        <VerseQuote
          text="And the children of Israel did according to the word of Moses; and they borrowed of the Egyptians jewels of silver, and jewels of gold, and raiment:"
          reference="Exodus 12:35"
        />
        <VerseQuote
          text="And the LORD gave the people favour in the sight of the Egyptians, so that they lent unto them such things as they required. And they spoiled the Egyptians."
          reference="Exodus 12:36"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This was not theft. God had told <ArticleLink href="/blog/moses">Moses</ArticleLink>{" "}
            to prepare Israel for exactly this back in Exodus 11, and the promise reaches back
            further still, to what God told{" "}
            <ArticleLink href="/blog/genesis-15-explained">Abraham</ArticleLink> centuries earlier
            about his descendants leaving slavery with real wealth in hand, not empty handed.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Six Hundred Thousand Walk Out, and the Rules for Keeping Passover After (verses 37 to 51)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter steps back to describe the scale of what just happened.</p>
        </div>
        <VerseQuote
          text="And the children of Israel journeyed from Rameses to Succoth, about six hundred thousand on foot that were men, beside children."
          reference="Exodus 12:37"
        />
        <VerseQuote
          text="And a mixed multitude went up also with them; and flocks, and herds, even very much cattle."
          reference="Exodus 12:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Six hundred thousand men, not counting women and children, means this is not a small
            tribe slipping out quietly. This is a nation leaving a nation, with animals and a
            <strong> mixed multitude</strong>, likely other foreigners and the mixed households
            built up over four centuries, leaving alongside them.
          </p>
        </div>
        <VerseQuote
          text="Now the sojourning of the children of Israel, who dwelt in Egypt, was four hundred and thirty years."
          reference="Exodus 12:40"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Four hundred and thirty years is a long time to wait for a promise. The exact way
            this number fits with the four hundred years God told Abraham his descendants would be
            afflicted gets its own honest answer further down, because the text itself is specific
            enough to deserve one.
          </p>
        </div>
        <VerseQuote
          text="In one house shall it be eaten; thou shalt not carry forth ought of the flesh abroad out of the house; neither shall ye break a bone thereof."
          reference="Exodus 12:46"
        />
        <VerseQuote
          text="One law shall be to him that is homeborn, and unto the stranger that sojourneth among you."
          reference="Exodus 12:49"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The rules in these closing verses apply to native born Israelites and any
            foreigner who joins Israel&apos;s covenant the same way.</strong> A stranger who gets
            circumcised can keep Passover exactly like someone born into Israel, and no one born
            into Israel gets to skip the requirement either. The line is drawn by the covenant
            sign, not by birth.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass the selfsame day, that the LORD did bring the children of Israel out of the land of Egypt by their armies."
          reference="Exodus 12:51"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter that opened with a calendar reset closes with the exact day it pointed to
            finally arriving. Four hundred and thirty years, and it lands on the day God named.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 12 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did an ordinary Egyptian family who had nothing to do with Pharaoh&apos;s
            choices really lose a child that night?</strong> Verse 30 states plainly that there
            was not a house in Egypt without a death, from the throne to a prisoner in a dungeon.
            The warning itself was not new or hidden. God told Moses to warn Pharaoh of this exact
            plague back in Exodus 4:22 and 23, long before the confrontation even began, and named
            it again in full in Exodus 11. What the text does not say is whether any individual
            Egyptian household had a way to shelter under the same blood Israel was given. The
            instructions in this chapter are addressed to &quot;all the congregation of Israel&quot;
            specifically. Scripture does not resolve this question for the reader, and it is
            honest to say so rather than invent an answer the text does not give.
          </p>
          <p>
            <strong>What does it mean that God would execute judgment against all the gods of
            Egypt?</strong> Exodus 12:12 states it directly, in the same breath as the plague on
            the firstborn. Egypt worshipped many gods tied to the Nile, the sun, and animals the
            earlier plagues had already struck one at a time. Striking the firstborn, including
            Pharaoh&apos;s own heir, reached the one institution Egyptian religion treated as
            closest to divine itself: the royal line. The chapter frames the entire night as a
            confrontation between the LORD and every rival power Egypt trusted, not only a dispute
            between Moses and one stubborn man.
          </p>
          <p>
            <strong>Why does Exodus 12:40 say Israel was in Egypt 430 years, when Genesis 15:13
            told Abraham it would be 400?</strong> Bible believing scholars read this two main
            ways, and both take the numbers seriously rather than dismissing either one. Some hold
            that 400 years describes the period of real affliction inside Egypt, a round figure
            inside the fuller 430 year span of the whole stay. Others read the 430 years, the same
            number Paul also uses in Galatians 3:17, as counting from the promise God made Abraham
            in Genesis 15 itself, which would include years Abraham&apos;s family spent in Canaan
            before Jacob&apos;s household ever moved to Egypt. Either reading keeps every number
            in Scripture true. The disagreement is over what each number is measured from, not
            whether the numbers themselves can be trusted.
          </p>
          <p>
            <strong>Why did a stranger have to be circumcised before keeping Passover?</strong>{" "}
            Verses 43 through 49 might read as excluding outsiders, but verse 49 states the same
            law applied to &quot;him that is homeborn&quot; as much as to the stranger. No
            Israelite got to keep Passover by birth alone either. The requirement was never about
            nationality. It was about whether a person had entered the covenant God made with
            Israel, a door open to any foreigner willing to take the same sign every native
            Israelite already carried.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Exodus 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 12:13</h3>
        <VerseQuote
          text="And the blood shall be to you for a token upon the houses where ye are: and when I see the blood, I will pass over you, and the plague shall not be upon you to destroy you, when I smite the land of Egypt."
          reference="Exodus 12:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The clearest statement in the chapter of what actually saved a household that night. Not
          good behavior, not ancestry. The blood, applied.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 12:5 and 6</h3>
        <VerseQuote
          text="Your lamb shall be without blemish, a male of the first year: ye shall take it out from the sheep, or from the goats: And ye shall keep it up until the fourteenth day of the same month: and the whole assembly of the congregation of Israel shall kill it in the evening."
          reference="Exodus 12:5 and 6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A lamb without defect, kept and known for four days before it was ever killed. Nothing
          leftover or convenient about what this cost each family.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 12:29 and 30</h3>
        <VerseQuote
          text="And it came to pass, that at midnight the LORD smote all the firstborn in the land of Egypt, from the firstborn of Pharaoh that sat on his throne unto the firstborn of the captive that was in the dungeon; and all the firstborn of cattle. And Pharaoh rose up in the night, he, and all his servants, and all the Egyptians; and there was a great cry in Egypt; for there was not a house where there was not one dead."
          reference="Exodus 12:29 and 30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The night nine chapters of warnings had been pointing toward, reaching from the throne
          to a dungeon in the same hour.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 12:46</h3>
        <VerseQuote
          text="In one house shall it be eaten; thou shalt not carry forth ought of the flesh abroad out of the house; neither shall ye break a bone thereof."
          reference="Exodus 12:46"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          John 19:36 quotes this exact detail, &quot;a bone of him shall not be broken,&quot; to
          describe what happened, and did not happen, to Jesus&apos;s body on the cross.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Corinthians 5:7</h3>
        <VerseQuote
          text="Purge out therefore the old leaven, that ye may be a new lump, as ye are unleavened. For even Christ our passover is sacrificed for us:"
          reference="1 Corinthians 5:7"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Paul names Christ directly as the Passover lamb, centuries after Exodus 12, treating the
          whole chapter as a shadow of something still to come when it was first written.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 12
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 12?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          God gives Israel detailed instructions for the first Passover: choose a lamb without
          blemish, kill it on the fourteenth day, put its blood on the doorframe, and eat the meal
          ready to leave. At midnight the LORD strikes every firstborn in Egypt except where the
          blood marks the door. Pharaoh finally drives Israel out himself, and the chapter closes
          with rules for keeping Passover in every generation after.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Passover in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Passover is the meal and the night described in Exodus 12, when God judged Egypt&apos;s
          firstborn but passed over any house marked by the blood of a lamb without blemish.
          Exodus 12:14 calls Israel to keep it as a permanent memorial, and it remains a central
          Jewish feast to this day.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did the Passover lamb have to be without blemish?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:5 requires a male lamb with no defect, Israel&apos;s best rather than a
          leftover animal. 1 Peter 1:19 later describes Christ with the same language, &quot;a
          lamb without blemish and without spot,&quot; treating the requirement as a picture of
          something greater still to come.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;the blood shall be a token&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:13 says the blood on the doorframe was the sign God Himself would look for.
          Wherever He saw it, the plague would not enter that house. The token was not a charm; it
          marked which houses had obeyed the instruction to kill the lamb and apply its blood.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 12 say God would judge Egypt&apos;s gods?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:12 states it directly: the plague on the firstborn came &quot;against all the
          gods of Egypt.&quot; Nine earlier plagues had already struck specific things Egypt
          worshipped, and this one reached the royal line itself, treated as closest to divine in
          Egyptian religion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many Israelites left Egypt in the Exodus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:37 counts about six hundred thousand men on foot, not including women and
          children, plus a &quot;mixed multitude&quot; and large herds and flocks. Counting
          families, this was a departure of a full nation, not a small group.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Exodus 12 say 430 years when Genesis 15 said 400?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:40 gives 430 years for Israel&apos;s sojourn, while Genesis 15:13 told Abraham
          his descendants would be afflicted 400 years. Scholars read this either as 400 years of
          affliction inside a fuller 430 year stay, or as 430 years counted from the promise to
          Abraham himself, which would include time in Canaan before Jacob&apos;s family entered
          Egypt. Both readings keep every number in Scripture intact.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why couldn&apos;t foreigners eat the Passover unless circumcised?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:48 and 49 require circumcision for any stranger who wants to keep Passover, and
          state plainly that the same law applied to native born Israelites too. The requirement
          was never about where someone was born. It was about entering the same covenant sign
          every Israelite already carried.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Exodus 12 connect to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          1 Corinthians 5:7 calls Christ &quot;our passover,&quot; sacrificed the way the lamb was
          in Exodus 12. John 19:36 quotes Exodus 12:46&apos;s instruction that no bone of the lamb
          be broken to describe Jesus&apos;s body on the cross, and Hebrews 11:28 points back to
          this same night as an act of faith that spared Israel from the one who destroyed the
          firstborn.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is unleavened bread part of Passover?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 12:8 and 15 through 20 call for bread made without leaven, bread with no time to
          rise, eaten alongside the lamb and kept for seven days afterward. It matches the haste of
          a people who left Egypt the same night they ate, with no time to let dough work through.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 12 is long, but every verse in it is pointed at the same midnight.</p>
          <p>
            📌 <strong>The blood had to be applied, not just available.</strong> A lamb slain and
            left in a basin saved no one. Someone had to take the hyssop and actually strike it on
            the door.
          </p>
          <p>
            📌 <strong>Judgment and mercy moved through Egypt on the exact same night, through
            the exact same blood.</strong> Exodus 12:13 does not describe two separate stories
            happening side by side. It describes one plague and one escape from it, both resting
            on the same sign.
          </p>
          <p>
            📌 <strong>God kept a promise on His own timeline, down to the day.</strong> Four
            hundred and thirty years after it began, Exodus 12:41 says Israel walked out on the
            selfsame day the time was finished.
          </p>
          <p>
            You live on this side of a different Passover lamb, one 1 Corinthians 5:7 says was
            already sacrificed for you.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Ask whether you are actually sheltering behind that blood, or just aware that it
            exists, the same gap between having a lamb and applying it that this whole chapter
            insists on.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
